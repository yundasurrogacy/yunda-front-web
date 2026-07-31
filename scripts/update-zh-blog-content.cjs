#!/usr/bin/env node
const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const ROOT = process.cwd()
const API_BASE = (process.env.BLOG_API_BASE || 'https://yunda-admin-system.yundasurrogacy.com').replace(/\/+$/, '')
const args = process.argv.slice(2)
const configArgumentIndex = args.indexOf('--config')
if (configArgumentIndex !== -1 && !args[configArgumentIndex + 1])
  throw new Error('--config requires a JSON file path')
const CONFIG_PATH = path.resolve(
  ROOT,
  configArgumentIndex === -1
    ? path.join('data', 'zh-blog-content-batch-1.json')
    : args[configArgumentIndex + 1],
)
const initialConfig = fs.existsSync(CONFIG_PATH)
  ? JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
  : null
const BATCH = String(initialConfig?.batch ?? 'unknown')
const ARTIFACT_DATE = String(initialConfig?.preparedAt || '2026-07-30')
const REVIEW_DATE = String(initialConfig?.reviewDate || '2026年7月30日')
const artifact = (...segments) => path.join(ROOT, ...segments)
const BEFORE_PATH = artifact('seo-project', '05-content', 'source-snapshots', `${ARTIFACT_DATE}-zh-blog-content-batch-${BATCH}-before.json`)
const PREVIEW_PATH = artifact('seo-project', '05-content', 'drafts', 'zh-blog-content', `${ARTIFACT_DATE}-batch-${BATCH}-preview.json`)
const AFTER_PATH = artifact('seo-project', '05-content', 'publication-records', `${ARTIFACT_DATE}-zh-blog-content-batch-${BATCH}-after.json`)
const PROGRESS_PATH = artifact('seo-project', '05-content', 'publication-records', `${ARTIFACT_DATE}-zh-blog-content-batch-${BATCH}-progress.json`)
const FAILURE_PATH = artifact('seo-project', '05-content', 'publication-records', `${ARTIFACT_DATE}-zh-blog-content-batch-${BATCH}-failure.json`)
const BUILD_VERIFICATION_PATH = artifact('seo-project', '06-technical', 'release-checks', `${ARTIFACT_DATE}-zh-blog-content-batch-${BATCH}-build-verification.json`)

const mode = args.includes('--snapshot')
  ? 'snapshot'
  : args.includes('--apply')
    ? 'apply'
    : args.includes('--verify')
      ? 'verify'
      : args.includes('--verify-build')
        ? 'verify-build'
        : args.includes('--rollback')
          ? 'rollback'
          : 'dry-run'

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const temporary = `${file}.tmp-${process.pid}`
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, 'utf8')
  fs.renameSync(temporary, file)
}

function sha256(value) {
  return crypto.createHash('sha256').update(String(value ?? ''), 'utf8').digest('hex')
}

function canonicalJson(value) {
  if (Array.isArray(value))
    return `[${value.map(canonicalJson).join(',')}]`
  if (value && typeof value === 'object') {
    return `{${Object.keys(value).sort().map(key =>
      `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`
  }
  return JSON.stringify(value)
}

function stableSnapshotHash(snapshot) {
  return sha256(canonicalJson(
    snapshot.blogs
      .map(blog => ({ ...blog }))
      .sort((a, b) => a.route_id.localeCompare(b.route_id)),
  ))
}

function visibleText(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function derivedExcerpt(html) {
  const characters = Array.from(visibleText(html))
  return `${characters.slice(0, 180).join('')}${characters.length > 180 ? '...' : ''}`
}

function extractLinks(html) {
  return [...String(html || '').matchAll(/<a\b[^>]*href=["']([^"']+)["'][^>]*>/gi)]
    .map(match => ({
      href: match[1].replace(/&amp;/gi, '&'),
      tag: match[0],
    }))
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function readDraft(update) {
  const file = path.resolve(ROOT, update.draftFile)
  if (!fs.existsSync(file))
    throw new Error(`${update.route_id}: missing draft ${file}`)
  return fs.readFileSync(file, 'utf8').trim()
}

function assertDraft(update, html) {
  const text = visibleText(html)
  const cjkCount = (text.match(/[\u3400-\u9fff]/g) || []).length
  const links = extractLinks(html)
  const internalLinks = links.filter(link => link.href.startsWith('/')).map(link => link.href)
  const externalLinks = links.filter(link => /^https:\/\//.test(link.href))
  const forbidden = [
    '代孕文章：',
    '刘爱玲',
    '刘亦菲',
    '保证成功',
    '百分百覆盖',
    '100%承担',
    '全部覆盖',
    '专家审核',
    '医生审核',
    '律师审核',
  ]
  if (cjkCount < 800)
    throw new Error(`${update.route_id}: draft has only ${cjkCount} CJK characters`)
  if (/<h1\b/i.test(html))
    throw new Error(`${update.route_id}: CMS body must not contain an h1`)
  if (/<(?:script|style|iframe)\b/i.test(html))
    throw new Error(`${update.route_id}: unsafe embedded element found`)
  if (/<h[2-6][^>]*>\s*<\/h[2-6]>/i.test(html))
    throw new Error(`${update.route_id}: empty heading found`)
  if (!html.startsWith('<p data-content-summary="true">'))
    throw new Error(`${update.route_id}: answer-first summary marker is missing`)
  if (!html.includes(`<p data-content-review-date="true">资料核查日期：${REVIEW_DATE}。`))
    throw new Error(`${update.route_id}: review date is missing`)
  if (!html.includes(update.marker))
    throw new Error(`${update.route_id}: unique verification marker is missing`)
  for (const phrase of forbidden) {
    if (text.includes(phrase))
      throw new Error(`${update.route_id}: forbidden or unverified phrase found: ${phrase}`)
  }
  if (internalLinks.length < 2 || internalLinks.length > 4)
    throw new Error(`${update.route_id}: expected 2-4 internal links, found ${internalLinks.length}`)
  if (new Set(internalLinks).size !== internalLinks.length)
    throw new Error(`${update.route_id}: duplicate internal links found`)
  if (JSON.stringify([...internalLinks].sort()) !== JSON.stringify([...update.internalLinks].sort()))
    throw new Error(`${update.route_id}: internal links do not match the approved specification`)
  for (const source of update.sources) {
    if (!externalLinks.some(link => link.href === source))
      throw new Error(`${update.route_id}: approved source is not linked: ${source}`)
  }
  for (const link of externalLinks) {
    if (!/\brel=["'][^"']*\bnoopener\b[^"']*\bnoreferrer\b[^"']*["']/i.test(link.tag)
      && !/\brel=["'][^"']*\bnoreferrer\b[^"']*\bnoopener\b[^"']*["']/i.test(link.tag))
      throw new Error(`${update.route_id}: external link lacks rel="noopener noreferrer": ${link.href}`)
  }
  return {
    content_sha256: sha256(html),
    visible_characters: Array.from(text).length,
    cjk_characters: cjkCount,
    heading_count: (html.match(/<h[2-6]\b/gi) || []).length,
    internal_links: internalLinks,
    external_links: externalLinks.map(link => link.href),
  }
}

function loadConfig({ requireDrafts = true } = {}) {
  const config = readJson(CONFIG_PATH)
  if (!Array.isArray(config.updates) || config.updates.length === 0)
    throw new Error(`Batch ${BATCH} must contain at least one update`)
  if (config.updates.length !== Number(config.expectedCount))
    throw new Error(`Batch ${BATCH} count does not match expectedCount`)
  const slugs = config.updates.map(update => update.route_id)
  if (new Set(slugs).size !== slugs.length)
    throw new Error('Duplicate route_id values found')
  for (const update of config.updates) {
    if (!update.route_id || !update.intent || !update.draftFile || !update.marker)
      throw new Error('Content specification is missing required fields')
    if (typeof update.publishEligible !== 'boolean')
      throw new Error(`${update.route_id}: publishEligible must be explicitly true or false`)
    if (!update.reviewStatus)
      throw new Error(`${update.route_id}: reviewStatus is required`)
    if (!Array.isArray(update.sources) || update.sources.length < 2)
      throw new Error(`${update.route_id}: at least two sources are required`)
    if (!Array.isArray(update.internalLinks))
      throw new Error(`${update.route_id}: internalLinks must be an array`)
    if (requireDrafts)
      assertDraft(update, readDraft(update))
  }
  return config
}

async function fetchJson(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
      ...(options.headers || {}),
    },
  })
  const body = await response.json()
  if (!response.ok)
    throw new Error(`${options.method || 'GET'} ${url}: ${response.status} ${JSON.stringify(body)}`)
  return body
}

async function fetchBlog(slug) {
  const blog = await fetchJson(
    `${API_BASE}/api/blog?route_id=${encodeURIComponent(slug)}&lang=zh&cache_bust=${Date.now()}`,
  )
  if (!blog?.id || blog.route_id !== slug)
    throw new Error(`${slug}: unexpected API response`)
  return blog
}

async function putBlog(payload) {
  return fetchJson(`${API_BASE}/api/blog`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

function assertFullRecordMatches(current, expected, label) {
  const keys = new Set([...Object.keys(current), ...Object.keys(expected)])
  for (const field of keys) {
    if (field === 'updated_at')
      continue
    if (JSON.stringify(current[field] ?? null) !== JSON.stringify(expected[field] ?? null))
      throw new Error(`${current.route_id}: field ${field} no longer matches ${label}`)
  }
}

function assertUntouchedFieldsUnchanged(before, after, label) {
  const ignored = new Set(['content', 'excerpt', 'updated_at'])
  const keys = new Set([...Object.keys(before), ...Object.keys(after)])
  for (const field of keys) {
    if (ignored.has(field))
      continue
    if (JSON.stringify(before[field] ?? null) !== JSON.stringify(after[field] ?? null))
      throw new Error(`${before.route_id}: untouched field ${field} changed during ${label}`)
  }
  if (String(after.excerpt ?? '') !== derivedExcerpt(after.content))
    throw new Error(`${before.route_id}: CMS-derived excerpt does not match the updated body during ${label}`)
}

function loadState() {
  if (!fs.existsSync(BEFORE_PATH))
    throw new Error(`Missing before snapshot: ${BEFORE_PATH}. Run --snapshot first.`)
  const config = loadConfig()
  const snapshot = readJson(BEFORE_PATH)
  if (snapshot.snapshot_sha256 !== stableSnapshotHash(snapshot))
    throw new Error('Before snapshot hash mismatch; raw evidence may have changed')
  if (snapshot.blogs.length !== config.updates.length)
    throw new Error('Spec/snapshot count mismatch')
  return {
    config,
    snapshot,
    beforeBySlug: new Map(snapshot.blogs.map(blog => [blog.route_id, blog])),
  }
}

async function snapshot() {
  if (fs.existsSync(BEFORE_PATH))
    throw new Error(`Refusing to overwrite raw snapshot: ${BEFORE_PATH}`)
  const config = loadConfig({ requireDrafts: false })
  const blogs = []
  for (const update of config.updates) {
    const blog = await fetchBlog(update.route_id)
    if ((visibleText(blog.content).match(/[\u3400-\u9fff]/g) || []).length < 500)
      throw new Error(`${update.route_id}: expected an existing Chinese body`)
    blogs.push(blog)
  }
  const value = {
    snapshot_type: `zh-blog-content-batch-${BATCH}-before`,
    collected_at: new Date().toISOString(),
    source: `${API_BASE}/api/blog`,
    count: blogs.length,
    blogs,
  }
  value.snapshot_sha256 = stableSnapshotHash(value)
  writeJson(BEFORE_PATH, value)
  console.log(`Saved immutable before snapshot for ${blogs.length} Chinese blogs.`)
}

function dryRun() {
  const { config, snapshot, beforeBySlug } = loadState()
  const updates = config.updates.map((update) => {
    const before = beforeBySlug.get(update.route_id)
    const draft = readDraft(update)
    return {
      route_id: update.route_id,
      intent: update.intent,
      before_content_sha256: sha256(before.content),
      after: assertDraft(update, draft),
      cms_derived_excerpt: derivedExcerpt(draft),
      untouched: {
        title: before.title,
        seo_title: before.seo_title,
        seo_description: before.seo_description,
        meta_description: before.meta_description,
      },
    }
  })
  writeJson(PREVIEW_PATH, {
    preview_type: `zh-blog-content-batch-${BATCH}`,
    generated_at: new Date().toISOString(),
    source_snapshot_sha256: snapshot.snapshot_sha256,
    count: updates.length,
    updates,
  })
  console.log(`Dry run passed for ${updates.length} drafts. Preview: ${PREVIEW_PATH}`)
}

async function apply() {
  const { config, snapshot, beforeBySlug } = loadState()
  const blocked = config.updates.filter(update => !update.publishEligible)
  if (blocked.length) {
    throw new Error(
      `Batch ${BATCH} is review-gated and cannot be published: ${blocked.map(update => update.route_id).join(', ')}`,
    )
  }
  const intendedBySlug = new Map(config.updates.map(update => [update.route_id, readDraft(update)]))
  for (const update of config.updates) {
    const current = await fetchBlog(update.route_id)
    const before = beforeBySlug.get(update.route_id)
    const intended = intendedBySlug.get(update.route_id)
    if (current.content === intended)
      assertUntouchedFieldsUnchanged(before, current, 'resume preflight')
    else
      assertFullRecordMatches(current, before, 'the before snapshot')
  }
  console.log(`Preflight passed for all ${config.updates.length} records.`)

  const applied = []
  let pending = null
  try {
    for (const update of config.updates) {
      const before = beforeBySlug.get(update.route_id)
      const intended = intendedBySlug.get(update.route_id)
      const current = await fetchBlog(update.route_id)
      if (current.content === intended) {
        assertUntouchedFieldsUnchanged(before, current, 'resume check')
        applied.push({ route_id: update.route_id, content_sha256: sha256(intended), resumed: true })
        continue
      }
      assertFullRecordMatches(current, before, 'the before snapshot immediately before PUT')
      pending = update.route_id
      writeJson(PROGRESS_PATH, {
        action: 'write-ahead',
        updated_at: new Date().toISOString(),
        source_snapshot_sha256: snapshot.snapshot_sha256,
        applied,
        pending,
      })
      await putBlog({ id: before.id, route_id: before.route_id, content: intended })
      const readBack = await fetchBlog(update.route_id)
      if (readBack.content !== intended)
        throw new Error(`${update.route_id}: content read-back mismatch`)
      assertUntouchedFieldsUnchanged(before, readBack, 'Chinese body update')
      applied.push({ route_id: update.route_id, content_sha256: sha256(readBack.content) })
      pending = null
      writeJson(PROGRESS_PATH, {
        action: 'apply-progress',
        updated_at: new Date().toISOString(),
        source_snapshot_sha256: snapshot.snapshot_sha256,
        applied,
      })
      console.log(`Updated and read-back verified ${update.route_id}`)
    }
  }
  catch (error) {
    const candidates = [...new Set([pending, ...applied.map(item => item.route_id)].filter(Boolean))].reverse()
    const rollback = { restored: [], already_before: [], unresolved: [] }
    for (const slug of candidates) {
      const before = beforeBySlug.get(slug)
      const intended = intendedBySlug.get(slug)
      try {
        const current = await fetchBlog(slug)
        if (current.content === before.content) {
          assertUntouchedFieldsUnchanged(before, current, 'rollback before-state check')
          rollback.already_before.push(slug)
          continue
        }
        if (current.content !== intended)
          throw new Error('content is neither this batch before nor intended state')
        assertUntouchedFieldsUnchanged(before, current, 'rollback preflight')
        await putBlog({ id: before.id, route_id: before.route_id, content: before.content })
        const restored = await fetchBlog(slug)
        assertFullRecordMatches(restored, before, 'the rollback state')
        rollback.restored.push(slug)
      }
      catch (rollbackError) {
        rollback.unresolved.push({ route_id: slug, error: rollbackError.message })
      }
    }
    writeJson(FAILURE_PATH, {
      action: 'failed',
      failed_at: new Date().toISOString(),
      error: error.message,
      rollback,
    })
    throw error
  }
  console.log(`Applied and read-back verified ${applied.length} Chinese body updates.`)
}

async function verify() {
  const { config, snapshot, beforeBySlug } = loadState()
  const blocked = config.updates.filter(update => !update.publishEligible)
  if (blocked.length)
    throw new Error(`Batch ${BATCH} is review-gated and has no approved live state to verify`)
  const blogs = []
  const checks = []
  for (const update of config.updates) {
    const current = await fetchBlog(update.route_id)
    const intended = readDraft(update)
    if (current.content !== intended)
      throw new Error(`${update.route_id}: live content does not match the approved draft`)
    assertUntouchedFieldsUnchanged(beforeBySlug.get(update.route_id), current, 'verification')
    checks.push({ route_id: update.route_id, ...assertDraft(update, current.content) })
    blogs.push(current)
  }
  writeJson(AFTER_PATH, {
    snapshot_type: `zh-blog-content-batch-${BATCH}-after`,
    collected_at: new Date().toISOString(),
    source: `${API_BASE}/api/blog`,
    source_snapshot_sha256: snapshot.snapshot_sha256,
    count: blogs.length,
    blogs,
    verification: {
      content_matches_approved_drafts: true,
      excerpt_matches_cms_derivation: true,
      title_and_metadata_unchanged: true,
      quality_checks: checks,
    },
  })
  console.log(`Verified ${blogs.length} live records; titles and metadata are unchanged.`)
}

async function rollback() {
  const { config, beforeBySlug } = loadState()
  const restored = []
  for (const update of [...config.updates].reverse()) {
    const before = beforeBySlug.get(update.route_id)
    const intended = readDraft(update)
    const current = await fetchBlog(update.route_id)
    if (current.content === before.content) {
      assertUntouchedFieldsUnchanged(before, current, 'rollback before-state check')
      continue
    }
    if (current.content !== intended)
      throw new Error(`${update.route_id}: refusing rollback from an unknown content state`)
    assertUntouchedFieldsUnchanged(before, current, 'rollback preflight')
    await putBlog({ id: before.id, route_id: before.route_id, content: before.content })
    const readBack = await fetchBlog(update.route_id)
    assertFullRecordMatches(readBack, before, 'the rollback state')
    restored.push(update.route_id)
  }
  console.log(`Rollback completed; restored ${restored.length} records.`)
}

function verifyBuild() {
  const { config, beforeBySlug } = loadState()
  const blocked = config.updates.filter(update => !update.publishEligible)
  if (blocked.length)
    throw new Error(`Batch ${BATCH} is review-gated and cannot enter release verification`)
  if (!fs.existsSync(AFTER_PATH))
    throw new Error(`Missing CMS after snapshot: ${AFTER_PATH}`)
  const after = readJson(AFTER_PATH)
  if (!after.verification?.content_matches_approved_drafts
    || !after.verification?.excerpt_matches_cms_derivation
    || !after.verification?.title_and_metadata_unchanged)
    throw new Error('CMS after snapshot is missing required verification')

  const pages = []
  const failures = []
  for (const update of config.updates) {
    const file = artifact('.output', 'public', 'zh', 'blog', update.route_id, 'index.html')
    if (!fs.existsSync(file)) {
      failures.push(`${update.route_id}: generated HTML missing`)
      continue
    }
    const html = fs.readFileSync(file, 'utf8')
    const draft = readDraft(update)
    const before = beforeBySlug.get(update.route_id)
    const canonical = `https://www.yundasurrogacy.com/zh/blog/${update.route_id}`
    const english = `https://www.yundasurrogacy.com/blog/${update.route_id}`
    const checks = {
      content_marker: html.includes(update.marker),
      internal_links: update.internalLinks.every(href => html.includes(`href="${href}"`)),
      source_links: update.sources.every(href => html.includes(escapeHtml(href))),
      exact_title: html.includes(`<title>${escapeHtml(before.seo_title)}</title>`),
      exact_description: html.includes(`<meta name="description" content="${escapeHtml(before.seo_description)}">`),
      canonical: html.includes(`<link rel="canonical" href="${canonical}">`),
      english_hreflang: html.includes(`<link rel="alternate" hreflang="en-US" href="${english}">`),
      chinese_hreflang: html.includes(`<link rel="alternate" hreflang="zh-CN" href="${canonical}">`),
      article_schema: /"@type":"(?:Article|BlogPosting)"/.test(html),
      indexable: !/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html),
      mobile_safe_structure: !/<(?:table|img|pre|iframe)\b/i.test(draft)
        && !/\b(?:width|height)\s*=/i.test(draft),
    }
    const failed = Object.entries(checks).filter(([, passed]) => !passed).map(([name]) => name)
    if (failed.length)
      failures.push(`${update.route_id}: ${failed.join(', ')}`)
    pages.push({ route_id: update.route_id, checks })
  }

  const missingManifest = readJson(artifact('data', 'zh-missing-blogs.json'))
  const generatedMissingRoutes = missingManifest.routes.filter((route) => {
    const relative = decodeURIComponent(new URL(route, 'https://www.yundasurrogacy.com').pathname).replace(/^\/+/, '')
    return fs.existsSync(artifact('.output', 'public', relative, 'index.html'))
  })
  if (generatedMissingRoutes.length)
    failures.push(`${generatedMissingRoutes.length} Chinese-missing routes were generated`)
  const fallback200 = fs.existsSync(artifact('.output', 'public', '200.html'))
  const fallback404Path = artifact('.output', 'public', '404.html')
  const fallback404Noindex = fs.existsSync(fallback404Path)
    && /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(fs.readFileSync(fallback404Path, 'utf8'))
  if (fallback200)
    failures.push('200.html fallback still exists')
  if (!fallback404Noindex)
    failures.push('404.html is missing noindex')

  writeJson(BUILD_VERIFICATION_PATH, {
    verification_type: `zh-blog-content-batch-${BATCH}-build`,
    verified_at: new Date().toISOString(),
    pages_checked: pages.length,
    chinese_missing_routes_checked: missingManifest.routes.length,
    chinese_missing_routes_generated: generatedMissingRoutes,
    fallback_200_absent: !fallback200,
    fallback_404_noindex: fallback404Noindex,
    pages,
    failures,
  })
  if (failures.length)
    throw new Error(`Build verification failed: ${failures.join('; ')}`)
  console.log(`Build verification passed for ${pages.length} Chinese content pages.`)
}

async function main() {
  if (!API_BASE.startsWith('https://'))
    throw new Error(`Refusing non-HTTPS API base: ${API_BASE}`)
  if (!fs.existsSync(CONFIG_PATH))
    throw new Error(`Missing config: ${CONFIG_PATH}`)
  if (mode === 'snapshot')
    return snapshot()
  if (mode === 'dry-run')
    return dryRun()
  if (mode === 'apply')
    return apply()
  if (mode === 'verify')
    return verify()
  if (mode === 'verify-build')
    return verifyBuild()
  return rollback()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

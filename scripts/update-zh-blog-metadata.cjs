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
    ? path.join('data', 'zh-blog-metadata-batch-1.json')
    : args[configArgumentIndex + 1],
)
const initialConfig = fs.existsSync(CONFIG_PATH)
  ? JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
  : null
const configBatchMatch = path.basename(CONFIG_PATH).match(/batch-(\d+)/)
const BATCH = String(initialConfig?.batch ?? configBatchMatch?.[1] ?? 'unknown')
const ARTIFACT_DATE = String(initialConfig?.preparedAt || '2026-07-30')
const BEFORE_PATH = path.join(
  ROOT,
  'seo-project',
  '05-content',
  'source-snapshots',
  `${ARTIFACT_DATE}-zh-blog-metadata-batch-${BATCH}-before.json`,
)
const PREVIEW_PATH = path.join(
  ROOT,
  'seo-project',
  '05-content',
  'drafts',
  'zh-blog-metadata',
  `${ARTIFACT_DATE}-batch-${BATCH}-preview.json`,
)
const AFTER_PATH = path.join(
  ROOT,
  'seo-project',
  '05-content',
  'publication-records',
  `${ARTIFACT_DATE}-zh-blog-metadata-batch-${BATCH}-after.json`,
)
const PROGRESS_PATH = path.join(
  ROOT,
  'seo-project',
  '05-content',
  'publication-records',
  `${ARTIFACT_DATE}-zh-blog-metadata-batch-${BATCH}-progress.json`,
)
const FAILURE_PATH = path.join(
  ROOT,
  'seo-project',
  '05-content',
  'publication-records',
  `${ARTIFACT_DATE}-zh-blog-metadata-batch-${BATCH}-failure.json`,
)
const BUILD_VERIFICATION_PATH = path.join(
  ROOT,
  'seo-project',
  '06-technical',
  'release-checks',
  `${ARTIFACT_DATE}-zh-blog-metadata-batch-${BATCH}-build-verification.json`,
)

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
  const serialized = `${JSON.stringify(value, null, 2)}\n`
  const temporary = `${file}.tmp-${process.pid}`
  fs.writeFileSync(temporary, serialized, 'utf8')
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function assertSpec(update) {
  const titleLength = Array.from(update.seo_title || '').length
  const descriptionLength = Array.from(update.seo_description || '').length
  if (!update.route_id || !update.intent)
    throw new Error('Metadata specification is missing route_id or intent')
  if (!/[\u3400-\u9fff]/.test(update.seo_title || ''))
    throw new Error(`${update.route_id}: SEO title is not localized`)
  if (!/[\u3400-\u9fff]/.test(update.seo_description || ''))
    throw new Error(`${update.route_id}: SEO description is not localized`)
  if ((update.seo_title || '').includes('代孕文章：'))
    throw new Error(`${update.route_id}: mechanical title prefix is forbidden`)
  if (titleLength > 65)
    throw new Error(`${update.route_id}: SEO title length ${titleLength} exceeds 65`)
  if (descriptionLength < 45 || descriptionLength > 155)
    throw new Error(`${update.route_id}: SEO description length ${descriptionLength} is outside 45-155`)
}

function loadConfig() {
  const config = readJson(CONFIG_PATH)
  if (!Array.isArray(config.updates) || config.updates.length === 0)
    throw new Error(`Batch ${BATCH} must contain at least one update`)
  const expectedCount = Number(config.expectedCount ?? config.updates.length)
  if (!Number.isInteger(expectedCount) || config.updates.length !== expectedCount)
    throw new Error(
      `Batch ${BATCH} expected ${expectedCount} updates but contains ${config.updates.length}`,
    )
  if (String(config.batch ?? BATCH) !== BATCH)
    throw new Error(`Config batch ${config.batch} does not match file batch ${BATCH}`)
  config.updates.forEach(assertSpec)
  const slugs = config.updates.map(update => update.route_id)
  if (new Set(slugs).size !== slugs.length)
    throw new Error('Metadata specification contains duplicate route_id values')
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
  const ignored = new Set(['seo_title', 'seo_description', 'meta_description', 'updated_at'])
  const keys = new Set([...Object.keys(before), ...Object.keys(after)])
  for (const field of keys) {
    if (ignored.has(field))
      continue
    if (JSON.stringify(before[field] ?? null) !== JSON.stringify(after[field] ?? null))
      throw new Error(`${before.route_id}: untouched field ${field} changed during ${label}`)
  }
}

function intendedFields(update) {
  return {
    seo_title: update.seo_title,
    seo_description: update.seo_description,
  }
}

function assertIntendedFields(current, update, label) {
  for (const [field, expected] of Object.entries(intendedFields(update))) {
    if (String(current[field] ?? '') !== expected)
      throw new Error(`${current.route_id}: ${field} does not match ${label}`)
  }
  if (String(current.meta_description ?? '') !== update.seo_description)
    throw new Error(`${current.route_id}: meta_description does not mirror ${label}`)
}

function isIntendedState(current, update) {
  return Object.entries(intendedFields(update))
    .every(([field, expected]) => String(current[field] ?? '') === expected)
    && String(current.meta_description ?? '') === update.seo_description
}

function loadState() {
  if (!fs.existsSync(BEFORE_PATH))
    throw new Error(`Missing before snapshot: ${BEFORE_PATH}. Run --snapshot first.`)
  const config = loadConfig()
  const snapshot = readJson(BEFORE_PATH)
  if (snapshot.snapshot_sha256 !== stableSnapshotHash(snapshot))
    throw new Error('Before snapshot hash mismatch; raw evidence may have changed')
  if (snapshot.blogs.length !== config.updates.length)
    throw new Error(`Spec/snapshot count mismatch: ${config.updates.length}/${snapshot.blogs.length}`)
  return {
    config,
    snapshot,
    beforeBySlug: new Map(snapshot.blogs.map(blog => [blog.route_id, blog])),
  }
}

async function snapshot() {
  if (fs.existsSync(BEFORE_PATH))
    throw new Error(`Refusing to overwrite raw snapshot: ${BEFORE_PATH}`)
  const config = loadConfig()
  const blogs = []
  for (const update of config.updates) {
    const blog = await fetchBlog(update.route_id)
    const body = visibleText(blog.content)
    if ((body.match(/[\u3400-\u9fff]/g) || []).length < 500)
      throw new Error(`${update.route_id}: expected a real Chinese body before metadata work`)
    blogs.push(blog)
  }
  const value = {
    snapshot_type: `zh-blog-metadata-batch-${BATCH}-before`,
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
  const preview = {
    preview_type: `zh-blog-metadata-batch-${BATCH}`,
    generated_at: new Date().toISOString(),
    source_snapshot_sha256: snapshot.snapshot_sha256,
    count: config.updates.length,
    updates: config.updates.map((update) => {
      const before = beforeBySlug.get(update.route_id)
      if (!before)
        throw new Error(`${update.route_id}: missing from before snapshot`)
      return {
        route_id: update.route_id,
        intent: update.intent,
        gsc: {
          clicks: update.gscClicks,
          impressions: update.gscImpressions,
        },
        before: intendedFields(before),
        after: intendedFields(update),
        title_length: Array.from(update.seo_title).length,
        description_length: Array.from(update.seo_description).length,
        title_unchanged: true,
        content_sha256: sha256(before.content),
      }
    }),
  }
  writeJson(PREVIEW_PATH, preview)
  console.log(`Dry run passed for ${preview.count} blogs. Preview: ${PREVIEW_PATH}`)
  for (const update of preview.updates)
    console.log(`${update.route_id}: title ${update.title_length}, description ${update.description_length}`)
}

async function apply() {
  const { config, snapshot, beforeBySlug } = loadState()
  for (const update of config.updates) {
    const current = await fetchBlog(update.route_id)
    const before = beforeBySlug.get(update.route_id)
    if (isIntendedState(current, update))
      assertUntouchedFieldsUnchanged(before, current, 'resume preflight')
    else
      assertFullRecordMatches(current, before, 'the before snapshot')
  }
  console.log(`Preflight passed: all ${config.updates.length} records match the before or intended state.`)

  const applied = []
  let pending = null
  try {
    for (const update of config.updates) {
      const before = beforeBySlug.get(update.route_id)
      const current = await fetchBlog(update.route_id)
      if (isIntendedState(current, update)) {
        assertUntouchedFieldsUnchanged(before, current, 'resume check')
        applied.push({
          id: before.id,
          route_id: before.route_id,
          before: intendedFields(before),
          after: intendedFields(update),
          title_sha256: sha256(current.title),
          content_sha256: sha256(current.content),
          resumed: true,
        })
        console.log(`Already updated and verified ${update.route_id}`)
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
      await putBlog({
        id: before.id,
        route_id: before.route_id,
        ...intendedFields(update),
      })
      const readBack = await fetchBlog(update.route_id)
      assertIntendedFields(readBack, update, 'the intended after state')
      assertUntouchedFieldsUnchanged(current, readBack, 'Chinese metadata update')
      applied.push({
        id: before.id,
        route_id: before.route_id,
        before: intendedFields(before),
        after: intendedFields(update),
        title_sha256: sha256(readBack.title),
        content_sha256: sha256(readBack.content),
      })
      pending = null
      writeJson(PROGRESS_PATH, {
        action: 'apply-progress',
        updated_at: new Date().toISOString(),
        source_snapshot_sha256: snapshot.snapshot_sha256,
        applied,
      })
      console.log(`Updated and verified ${update.route_id}`)
    }
  }
  catch (error) {
    const candidates = [...new Set([pending, ...applied.map(item => item.route_id)].filter(Boolean))].reverse()
    const rollback = { restored: [], already_before: [], unresolved: [] }
    console.error(`Apply failed; checking ${candidates.length} written or possibly-written record(s) for rollback.`)
    for (const slug of candidates) {
      const before = beforeBySlug.get(slug)
      const update = config.updates.find(item => item.route_id === slug)
      try {
        const current = await fetchBlog(slug)
        const isBefore = Object.entries(intendedFields(before))
          .every(([field, value]) => String(current[field] ?? '') === String(value ?? ''))
        if (isBefore) {
          assertUntouchedFieldsUnchanged(before, current, 'rollback before-state check')
          rollback.already_before.push(slug)
          continue
        }
        assertIntendedFields(current, update, 'this batch after state')
        assertUntouchedFieldsUnchanged(before, current, 'rollback preflight')
        await putBlog({
          id: before.id,
          route_id: before.route_id,
          meta_description: before.meta_description,
          ...intendedFields(before),
        })
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
    if (rollback.unresolved.length)
      console.error(`${rollback.unresolved.length} record(s) require manual resolution.`)
    throw error
  }
  console.log(`Applied and read-back verified ${applied.length} Chinese metadata updates.`)
}

async function verify() {
  const { config, snapshot, beforeBySlug } = loadState()
  const blogs = []
  for (const update of config.updates) {
    const current = await fetchBlog(update.route_id)
    assertIntendedFields(current, update, 'the intended after state')
    assertUntouchedFieldsUnchanged(beforeBySlug.get(update.route_id), current, 'verification')
    blogs.push(current)
  }
  const value = {
    snapshot_type: `zh-blog-metadata-batch-${BATCH}-after`,
    collected_at: new Date().toISOString(),
    source: `${API_BASE}/api/blog`,
    source_snapshot_sha256: snapshot.snapshot_sha256,
    count: blogs.length,
    blogs,
    verification: {
      metadata_localized: true,
      forbidden_prefix_count: blogs.filter(blog => String(blog.seo_title).includes('代孕文章：')).length,
      title_and_content_unchanged: true,
    },
  }
  writeJson(AFTER_PATH, value)
  console.log(`Verified ${blogs.length} records; titles and bodies are unchanged.`)
}

async function rollback() {
  const { config, beforeBySlug } = loadState()
  const restored = []
  for (const update of [...config.updates].reverse()) {
    const before = beforeBySlug.get(update.route_id)
    const current = await fetchBlog(update.route_id)
    const isBefore = Object.entries(intendedFields(before))
      .every(([field, value]) => String(current[field] ?? '') === String(value ?? ''))
    if (isBefore) {
      assertUntouchedFieldsUnchanged(before, current, 'rollback before-state check')
      continue
    }
    assertIntendedFields(current, update, 'the intended after state')
    assertUntouchedFieldsUnchanged(before, current, 'rollback preflight')
    await putBlog({
      id: before.id,
      route_id: before.route_id,
      meta_description: before.meta_description,
      ...intendedFields(before),
    })
    const readBack = await fetchBlog(update.route_id)
    assertFullRecordMatches(readBack, before, 'the rollback state')
    restored.push(update.route_id)
    console.log(`Restored ${update.route_id}`)
  }
  console.log(`Rollback completed; restored ${restored.length} records.`)
}

function verifyBuild() {
  const { config } = loadState()
  if (!fs.existsSync(AFTER_PATH))
    throw new Error(`Missing CMS after snapshot: ${AFTER_PATH}. Run --verify first.`)
  const after = readJson(AFTER_PATH)
  if (after.count !== config.updates.length || !after.verification?.title_and_content_unchanged)
    throw new Error('CMS after snapshot does not contain the required unchanged-content verification')

  const failures = []
  const pages = []
  for (const update of config.updates) {
    const file = path.join(
      ROOT,
      '.output',
      'public',
      'zh',
      'blog',
      update.route_id,
      'index.html',
    )
    if (!fs.existsSync(file)) {
      failures.push(`${update.route_id}: generated HTML missing`)
      continue
    }
    const html = fs.readFileSync(file, 'utf8')
    const canonical = `https://www.yundasurrogacy.com/zh/blog/${update.route_id}`
    const english = `https://www.yundasurrogacy.com/blog/${update.route_id}`
    const checks = {
      exact_title: html.includes(`<title>${escapeHtml(update.seo_title)}</title>`),
      exact_description: html.includes(
        `<meta name="description" content="${escapeHtml(update.seo_description)}">`,
      ),
      exact_og_title: html.includes(
        `<meta property="og:title" content="${escapeHtml(update.seo_title)}">`,
      ),
      exact_og_description: html.includes(
        `<meta property="og:description" content="${escapeHtml(update.seo_description)}">`,
      ),
      canonical: html.includes(`<link rel="canonical" href="${canonical}">`),
      english_hreflang: html.includes(`<link rel="alternate" hreflang="en-US" href="${english}">`),
      chinese_hreflang: html.includes(`<link rel="alternate" hreflang="zh-CN" href="${canonical}">`),
      indexable: !/<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html),
      forbidden_prefix_absent: !html.includes('代孕文章：'),
    }
    const failed = Object.entries(checks).filter(([, passed]) => !passed).map(([name]) => name)
    if (failed.length)
      failures.push(`${update.route_id}: ${failed.join(', ')}`)
    pages.push({
      route_id: update.route_id,
      title_length: Array.from(update.seo_title).length,
      description_length: Array.from(update.seo_description).length,
      checks,
    })
  }

  const missingManifest = readJson(path.join(ROOT, 'data', 'zh-missing-blogs.json'))
  const generatedMissingRoutes = missingManifest.routes.filter((route) => {
    const relative = decodeURIComponent(new URL(route, 'https://www.yundasurrogacy.com').pathname)
      .replace(/^\/+/, '')
    return fs.existsSync(path.join(ROOT, '.output', 'public', relative, 'index.html'))
  })
  if (generatedMissingRoutes.length)
    failures.push(`${generatedMissingRoutes.length} Chinese-missing routes were generated`)

  const fallback200 = fs.existsSync(path.join(ROOT, '.output', 'public', '200.html'))
  const fallback404Path = path.join(ROOT, '.output', 'public', '404.html')
  const fallback404Noindex = fs.existsSync(fallback404Path)
    && /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(fs.readFileSync(fallback404Path, 'utf8'))
  if (fallback200)
    failures.push('200.html fallback still exists')
  if (!fallback404Noindex)
    failures.push('404.html is missing noindex')

  const evidence = {
    verification_type: `zh-blog-metadata-batch-${BATCH}-build`,
    verified_at: new Date().toISOString(),
    pages_checked: pages.length,
    title_length_range: [
      Math.min(...pages.map(page => page.title_length)),
      Math.max(...pages.map(page => page.title_length)),
    ],
    description_length_range: [
      Math.min(...pages.map(page => page.description_length)),
      Math.max(...pages.map(page => page.description_length)),
    ],
    forbidden_prefix_count: pages.filter(page => !page.checks.forbidden_prefix_absent).length,
    indexable_pages: pages.filter(page => page.checks.indexable).length,
    chinese_missing_routes_checked: missingManifest.routes.length,
    chinese_missing_routes_generated: generatedMissingRoutes,
    fallback_200_absent: !fallback200,
    fallback_404_noindex: fallback404Noindex,
    pages,
    failures,
  }
  writeJson(BUILD_VERIFICATION_PATH, evidence)
  if (failures.length)
    throw new Error(`Build verification failed: ${failures.join('; ')}`)
  console.log(`Build verification passed for ${pages.length} Chinese metadata pages.`)
  console.log(`All pages are indexable; exact title/description/canonical/hreflang checks passed.`)
  console.log(`${missingManifest.routes.length} Chinese-missing routes remain excluded from generated HTML.`)
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

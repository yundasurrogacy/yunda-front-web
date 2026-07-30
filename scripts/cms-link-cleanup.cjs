#!/usr/bin/env node
const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const ROOT = process.cwd()
const API_BASE = (process.env.BLOG_API_BASE || 'https://yunda-admin-system.yundasurrogacy.com').replace(/\/+$/, '')
const CONFIG_PATH = path.join(ROOT, 'data', 'cms-link-cleanup-map.json')
const ZH_SITEMAP_PATH = path.join(ROOT, 'public', 'sitemap-zh.xml')
const EVIDENCE_DIR = path.join(ROOT, 'seo-project', '06-technical', 'release-checks')
const SNAPSHOT_PATH = path.join(EVIDENCE_DIR, '2026-07-29-cms-links-before.json')
const PLAN_PATH = path.join(EVIDENCE_DIR, '2026-07-29-cms-link-cleanup-plan.json')
const DEFAULT_BATCH_SIZE = 4
const FETCH_CONCURRENCY = 6
const API_TIMEOUT_MS = Number.parseInt(process.env.CMS_API_TIMEOUT_MS || '90000', 10)

const args = process.argv.slice(2)
let mode = 'dry-run'
if (args.includes('--snapshot'))
  mode = 'snapshot'
else if (args.includes('--verify-all'))
  mode = 'verify-all'
else if (args.includes('--apply'))
  mode = 'apply'
else if (args.includes('--rollback'))
  mode = 'rollback'
else if (args.includes('--verify'))
  mode = 'verify'

function argValue(flag, fallback) {
  const index = args.indexOf(flag)
  return index !== -1 && args[index + 1] ? args[index + 1] : fallback
}

const batchSize = Number.parseInt(argValue('--batch-size', String(DEFAULT_BATCH_SIZE)), 10)
const batchNumber = Number.parseInt(argValue('--batch', '0'), 10)

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function writeJson(file, value) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  const serialized = `${JSON.stringify(value, null, 2)}\n`
  const temporary = `${file}.tmp-${process.pid}`
  fs.writeFileSync(temporary, serialized, 'utf8')
  fs.renameSync(temporary, file)
  if (file === SNAPSHOT_PATH)
    fs.writeFileSync(`${file}.sha256`, `${sha256(serialized)}  ${path.basename(file)}\n`, 'utf8')
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
  const records = snapshot.blogs
    .map(blog => ({ ...blog }))
    .sort((a, b) => a.route_id.localeCompare(b.route_id))
  return sha256(canonicalJson(records))
}

function stablePlanHash(plan) {
  const copy = { ...plan }
  delete copy.plan_sha256
  return sha256(canonicalJson(copy))
}

function decodeHref(value) {
  return String(value).replace(/&amp;/gi, '&')
}

function encodeHref(value, source) {
  return /&amp;/i.test(source) ? value.replace(/&/g, '&amp;') : value
}

function normalizePathname(value) {
  if (!value)
    return '/'
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`
  return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, '') : withLeadingSlash
}

function readZhIndexablePaths() {
  const xml = fs.readFileSync(ZH_SITEMAP_PATH, 'utf8')
  return new Set(
    [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map(match => normalizePathname(new URL(match[1]).pathname)),
  )
}

function maskHrefValues(html) {
  return String(html || '').replace(
    /(<a\b[^>]*\shref\s*=\s*)(["']).*?\2/gi,
    '$1$2__YUNDA_HREF__$2',
  )
}

function countAnchors(html) {
  return (String(html || '').match(/<a\b/gi) || []).length
}

function extractHrefs(html) {
  return [...String(html || '').matchAll(/<a\b[^>]*\shref\s*=\s*(["'])(.*?)\1/gi)]
    .map(match => decodeHref(match[2]).trim())
}

function selectedHrefMultiset(blogs, config, predicate) {
  const internalHosts = new Set(config.internalHosts.map(host => host.toLowerCase()))
  const output = []
  for (const blog of blogs) {
    for (const field of ['content', 'en_content']) {
      for (const href of extractHrefs(blog[field])) {
        if (!href || href.startsWith('#') || /^(?:mailto|tel|javascript|data):/i.test(href))
          continue
        let parsed
        try {
          parsed = new URL(href, config.siteOrigin)
        }
        catch {
          continue
        }
        const context = {
          route_id: blog.route_id,
          field,
          href,
          internal: internalHosts.has(parsed.hostname.toLowerCase()),
          pathname: normalizePathname(parsed.pathname),
        }
        if (predicate(context))
          output.push(`${blog.route_id}\t${field}\t${href}`)
      }
    }
  }
  return output.sort()
}

function linkOutput(url, originalHref, siteOrigin) {
  const emptyQuery = originalHref.endsWith('?') && !url.search ? '?' : ''
  const emptyHash = originalHref.endsWith('#') && !url.hash ? '#' : ''
  const suffix = `${url.search}${emptyQuery}${url.hash}${emptyHash}`
  const pathAndSuffix = `${url.pathname}${suffix}`
  if (originalHref.startsWith('/'))
    return pathAndSuffix
  if (originalHref.startsWith('//'))
    return `//${new URL(siteOrigin).host}${pathAndSuffix}`
  return `${siteOrigin}${pathAndSuffix}`
}

function transformHtml(html, field, config, zhIndexablePaths, routeId) {
  const source = String(html || '')
  const changes = []
  const siteOrigin = config.siteOrigin.replace(/\/+$/, '')
  const internalHosts = new Set(config.internalHosts.map(host => host.toLowerCase()))
  const pathMap = new Map(
    Object.entries(config.legacyPathMap).map(([from, to]) => [
      normalizePathname(decodeURIComponent(from)),
      normalizePathname(to),
    ]),
  )
  for (const override of config.recordPathOverrides || []) {
    if (override.route_id === routeId && override.field === field)
      pathMap.set(normalizePathname(override.from), normalizePathname(override.to))
  }

  const output = source.replace(
    /(<a\b[^>]*\shref\s*=\s*)(["'])(.*?)\2/gi,
    (full, prefix, quote, rawHref) => {
      const href = decodeHref(rawHref).trim()
      if (!href || href.startsWith('#') || /^(?:mailto|tel|javascript|data):/i.test(href))
        return full
      if (!href.startsWith('/') && !/^https?:\/\//i.test(href) && !href.startsWith('//'))
        return full

      let parsed
      try {
        parsed = new URL(href, siteOrigin)
      }
      catch {
        return full
      }
      if (!internalHosts.has(parsed.hostname.toLowerCase()))
        return full

      let decodedPath
      try {
        decodedPath = decodeURIComponent(parsed.pathname)
      }
      catch {
        return full
      }
      const originalPath = normalizePathname(decodedPath)
      let nextPath = pathMap.get(originalPath) || originalPath
      const reasons = []
      if (nextPath !== originalPath)
        reasons.push('legacy-canonical')

      if (field === 'content' && !nextPath.startsWith('/zh') && !nextPath.startsWith('/blog/')) {
        const zhCandidate = nextPath === '/' ? '/zh' : `/zh${nextPath}`
        if (zhIndexablePaths.has(normalizePathname(zhCandidate))) {
          nextPath = normalizePathname(zhCandidate)
          reasons.push('localized-zh')
        }
      }

      if (!reasons.length)
        return full

      parsed.pathname = nextPath
      const rewritten = encodeHref(linkOutput(parsed, href, siteOrigin), rawHref)
      changes.push({
        from: rawHref,
        to: rewritten,
        reasons,
      })
      return `${prefix}${quote}${rewritten}${quote}`
    },
  )

  if (changes.length) {
    if (maskHrefValues(source) !== maskHrefValues(output))
      throw new Error(`${field}: transformation changed HTML outside href values`)
    if (countAnchors(source) !== countAnchors(output))
      throw new Error(`${field}: anchor count changed`)
    const secondPass = transformHtml(output, field, config, zhIndexablePaths, routeId)
    if (secondPass.html !== output)
      throw new Error(`${field}: transformation is not idempotent`)
  }

  return { html: output, changes }
}

async function fetchJson(url, options = {}) {
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), API_TIMEOUT_MS)
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache',
        ...(options.headers || {}),
      },
    })
    const body = await response.json()
    if (!response.ok)
      throw new Error(`${options.method || 'GET'} ${url}: ${response.status} ${JSON.stringify(body)}`)
    return body
  }
  finally {
    clearTimeout(timeout)
  }
}

async function fetchBlog(slug) {
  const url = `${API_BASE}/api/blog?route_id=${encodeURIComponent(slug)}&cache_bust=${Date.now()}`
  const blog = await fetchJson(url)
  if (!blog?.id || blog.route_id !== slug)
    throw new Error(`${slug}: unexpected API response`)
  return blog
}

async function fetchAllBlogs() {
  const listing = await fetchJson(`${API_BASE}/api/blog/slugs?page=1&limit=200&cache_bust=${Date.now()}`)
  const rows = Array.isArray(listing.blogs) ? listing.blogs : []
  if (!rows.length)
    throw new Error('Blog listing returned no records')
  const slugs = rows.map(row => String(row.route_id || '').trim()).filter(Boolean)
  if (new Set(slugs).size !== slugs.length)
    throw new Error('Blog listing contains duplicate route_id values')

  const output = Array.from({ length: slugs.length })
  let cursor = 0
  const workers = Array.from({ length: Math.min(FETCH_CONCURRENCY, slugs.length) }, async () => {
    while (cursor < slugs.length) {
      const index = cursor++
      output[index] = await fetchBlog(slugs[index])
    }
  })
  await Promise.all(workers)
  return output.sort((a, b) => a.route_id.localeCompare(b.route_id))
}

async function putBlog(payload) {
  return fetchJson(`${API_BASE}/api/blog`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

function buildPlan(snapshot, config, zhIndexablePaths) {
  const changes = []
  for (const blog of snapshot.blogs) {
    const fields = {}
    for (const field of ['content', 'en_content']) {
      const transformed = transformHtml(blog[field], field, config, zhIndexablePaths, blog.route_id)
      if (transformed.changes.length) {
        fields[field] = {
          before_sha256: sha256(blog[field]),
          after_sha256: sha256(transformed.html),
          before_length: String(blog[field] || '').length,
          after_length: transformed.html.length,
          link_changes: transformed.changes,
        }
      }
    }
    if (Object.keys(fields).length)
      changes.push({ id: blog.id, route_id: blog.route_id, fields })
  }

  const batches = []
  for (let index = 0; index < changes.length; index += batchSize) {
    batches.push({
      number: batches.length + 1,
      routes: changes.slice(index, index + batchSize).map(change => change.route_id),
    })
  }
  return {
    plan_type: 'cms-internal-link-cleanup',
    generated_at: new Date().toISOString(),
    source_snapshot: path.relative(ROOT, SNAPSHOT_PATH),
    source_snapshot_sha256: stableSnapshotHash(snapshot),
    config: path.relative(ROOT, CONFIG_PATH),
    batch_size: batchSize,
    changed_records: changes.length,
    changed_fields: changes.reduce((sum, change) => sum + Object.keys(change.fields).length, 0),
    changed_links: changes.reduce(
      (sum, change) => sum + Object.values(change.fields).reduce((fieldSum, field) => fieldSum + field.link_changes.length, 0),
      0,
    ),
    changes,
    batches,
  }
}

function routesForBatch(plan) {
  if (!batchNumber)
    throw new Error('Specify a positive --batch number for apply, rollback, or verify')
  const batch = plan.batches.find(item => item.number === batchNumber)
  if (!batch)
    throw new Error(`Batch ${batchNumber} does not exist; available batches: 1-${plan.batches.length}`)
  return batch.routes
}

function resultPath(action) {
  return path.join(EVIDENCE_DIR, `2026-07-29-cms-link-cleanup-${action}-batch-${batchNumber}.json`)
}

async function snapshot() {
  if (fs.existsSync(SNAPSHOT_PATH) && !args.includes('--force'))
    throw new Error(`Snapshot already exists: ${SNAPSHOT_PATH}. Refusing to overwrite raw evidence.`)
  const blogs = await fetchAllBlogs()
  const value = {
    snapshot_type: 'cms-internal-links-before-cleanup',
    collected_at: new Date().toISOString(),
    source: `${API_BASE}/api/blog`,
    count: blogs.length,
    blogs,
  }
  value.snapshot_sha256 = stableSnapshotHash(value)
  writeJson(SNAPSHOT_PATH, value)
  console.log(`Saved ${blogs.length} CMS records to ${SNAPSHOT_PATH}`)
}

function loadState() {
  if (!fs.existsSync(SNAPSHOT_PATH))
    throw new Error(`Missing snapshot: ${SNAPSHOT_PATH}. Run with --snapshot first.`)
  const config = readJson(CONFIG_PATH)
  const snapshotValue = readJson(SNAPSHOT_PATH)
  if (snapshotValue.snapshot_sha256 !== stableSnapshotHash(snapshotValue))
    throw new Error('Before snapshot hash mismatch; raw evidence may have changed')
  const zhIndexablePaths = readZhIndexablePaths()
  const plan = buildPlan(snapshotValue, config, zhIndexablePaths)
  return { config, snapshot: snapshotValue, zhIndexablePaths, plan }
}

async function dryRun() {
  const { plan } = loadState()
  plan.config_sha256 = sha256(fs.readFileSync(CONFIG_PATH))
  plan.zh_sitemap_sha256 = sha256(fs.readFileSync(ZH_SITEMAP_PATH))
  plan.plan_sha256 = stablePlanHash(plan)
  writeJson(PLAN_PATH, plan)
  console.log(`Dry run: ${plan.changed_links} href changes across ${plan.changed_fields} fields in ${plan.changed_records} records.`)
  console.log(`Batches: ${plan.batches.length} x up to ${plan.batch_size} records. Plan: ${PLAN_PATH}`)
}

function loadFrozenState() {
  if (!fs.existsSync(PLAN_PATH))
    throw new Error(`Missing approved dry-run plan: ${PLAN_PATH}`)
  const config = readJson(CONFIG_PATH)
  const snapshotValue = readJson(SNAPSHOT_PATH)
  const plan = readJson(PLAN_PATH)
  if (snapshotValue.snapshot_sha256 !== stableSnapshotHash(snapshotValue))
    throw new Error('Before snapshot hash mismatch; raw evidence may have changed')
  if (plan.source_snapshot_sha256 !== snapshotValue.snapshot_sha256)
    throw new Error('Plan does not match the before snapshot')
  if (plan.config_sha256 !== sha256(fs.readFileSync(CONFIG_PATH)))
    throw new Error('Cleanup config changed after dry-run; generate and inspect a new plan')
  if (plan.zh_sitemap_sha256 !== sha256(fs.readFileSync(ZH_SITEMAP_PATH)))
    throw new Error('Chinese sitemap changed after dry-run; generate and inspect a new plan')
  if (plan.plan_sha256 !== stablePlanHash(plan))
    throw new Error('Dry-run plan hash mismatch')
  const zhIndexablePaths = readZhIndexablePaths()
  const rebuilt = buildPlan(snapshotValue, config, zhIndexablePaths)
  if (rebuilt.changed_records !== plan.changed_records
    || rebuilt.changed_fields !== plan.changed_fields
    || rebuilt.changed_links !== plan.changed_links) {
    throw new Error('Rebuilt plan summary differs from the frozen dry-run')
  }
  for (const planned of plan.changes) {
    const current = rebuilt.changes.find(change => change.route_id === planned.route_id)
    if (!current || canonicalJson(current.fields) !== canonicalJson(planned.fields))
      throw new Error(`${planned.route_id}: rebuilt changes differ from the frozen dry-run`)
  }
  return { config, snapshot: snapshotValue, zhIndexablePaths, plan }
}

async function assertCurrentMatches(current, expected, fields, label) {
  for (const field of fields) {
    if (String(current[field] ?? '') !== String(expected[field] ?? ''))
      throw new Error(`${current.route_id}: ${field} no longer matches ${label}; aborting`)
  }
}

function assertUntouchedFieldsUnchanged(before, after, touchedFields, label) {
  const ignored = new Set([...touchedFields, 'updated_at'])
  const keys = new Set([...Object.keys(before), ...Object.keys(after)])
  for (const field of keys) {
    if (ignored.has(field))
      continue
    if (JSON.stringify(before[field] ?? null) !== JSON.stringify(after[field] ?? null))
      throw new Error(`${before.route_id}: untouched field ${field} changed during ${label}`)
  }
}

function assertFullRecordMatches(current, expected, label) {
  const keys = new Set([...Object.keys(current), ...Object.keys(expected)])
  for (const field of keys) {
    if (field === 'updated_at')
      continue
    if (JSON.stringify(current[field] ?? null) !== JSON.stringify(expected[field] ?? null))
      throw new Error(`${current.route_id}: field ${field} no longer matches ${label}; aborting`)
  }
}

async function applyBatch() {
  const { config, snapshot: snapshotValue, zhIndexablePaths, plan } = loadFrozenState()
  const routes = routesForBatch(plan)
  const beforeBySlug = new Map(snapshotValue.blogs.map(blog => [blog.route_id, blog]))
  const planBySlug = new Map(plan.changes.map(change => [change.route_id, change]))

  for (const route of routes) {
    const before = beforeBySlug.get(route)
    const current = await fetchBlog(route)
    assertFullRecordMatches(current, before, 'the before snapshot')
  }
  console.log(`Preflight passed for batch ${batchNumber}: ${routes.length} records unchanged since snapshot.`)

  const applied = []
  let inFlight = null
  try {
    for (const route of routes) {
      const before = beforeBySlug.get(route)
      const change = planBySlug.get(route)
      const fields = Object.keys(change.fields)
      const immediateCurrent = await fetchBlog(route)
      assertFullRecordMatches(immediateCurrent, before, 'the before snapshot immediately before PUT')
      const payload = { id: before.id, route_id: route }
      for (const field of fields)
        payload[field] = transformHtml(before[field], field, config, zhIndexablePaths, route).html

      inFlight = { route_id: route, fields, payload }
      writeJson(resultPath('write-ahead'), {
        action: 'write-ahead',
        batch: batchNumber,
        updated_at: new Date().toISOString(),
        source_snapshot_sha256: plan.source_snapshot_sha256,
        applied,
        pending: {
          route_id: route,
          fields: Object.fromEntries(fields.map(field => [
            field,
            { before_sha256: sha256(before[field]), after_sha256: sha256(payload[field]) },
          ])),
        },
      })
      const response = await putBlog(payload)
      for (const field of fields) {
        if (String(response[field] ?? '') !== payload[field])
          throw new Error(`${route}: PUT response mismatch for ${field}`)
      }
      const readBack = await fetchBlog(route)
      await assertCurrentMatches(readBack, payload, fields, 'the intended after state')
      assertUntouchedFieldsUnchanged(immediateCurrent, readBack, fields, 'link cleanup')
      applied.push({
        id: before.id,
        route_id: route,
        fields: Object.fromEntries(fields.map(field => [
          field,
          { before_sha256: sha256(before[field]), after_sha256: sha256(payload[field]) },
        ])),
      })
      inFlight = null
      writeJson(resultPath('apply-progress'), {
        action: 'apply-progress',
        batch: batchNumber,
        updated_at: new Date().toISOString(),
        source_snapshot_sha256: plan.source_snapshot_sha256,
        applied,
      })
      console.log(`Updated and verified ${route}`)
    }
  }
  catch (error) {
    const candidates = [
      ...(inFlight ? [{ route_id: inFlight.route_id, fields: Object.fromEntries(inFlight.fields.map(field => [field, {}])) }] : []),
      ...[...applied].reverse(),
    ].filter((item, index, items) => items.findIndex(other => other.route_id === item.route_id) === index)
    console.error(`Batch ${batchNumber} failed; checking ${candidates.length} written or possibly-written record(s) for rollback.`)
    const rollback = { restored: [], already_before: [], unresolved: [] }
    for (const item of candidates) {
      const before = beforeBySlug.get(item.route_id)
      const fields = Object.keys(item.fields)
      try {
        const current = await fetchBlog(item.route_id)
        const isBefore = fields.every(field => String(current[field] ?? '') === String(before[field] ?? ''))
        if (isBefore) {
          rollback.already_before.push(item.route_id)
          continue
        }
        const expectedAfter = {}
        for (const field of fields)
          expectedAfter[field] = transformHtml(before[field], field, config, zhIndexablePaths, item.route_id).html
        await assertCurrentMatches(current, expectedAfter, fields, 'this batch after state')
        assertUntouchedFieldsUnchanged(before, current, fields, 'failed-batch rollback preflight')
        const payload = { id: before.id, route_id: before.route_id }
        for (const field of fields)
          payload[field] = before[field]
        await putBlog(payload)
        const restored = await fetchBlog(item.route_id)
        await assertCurrentMatches(restored, before, fields, 'the rollback state')
        assertUntouchedFieldsUnchanged(current, restored, fields, 'failed-batch rollback')
        rollback.restored.push(item.route_id)
        console.warn(`Rolled back ${item.route_id}`)
      }
      catch (rollbackError) {
        rollback.unresolved.push({ route_id: item.route_id, error: rollbackError.message })
        console.error(`Could not safely roll back ${item.route_id}: ${rollbackError.message}`)
      }
    }
    writeJson(resultPath('failed'), {
      action: 'failed',
      batch: batchNumber,
      failed_at: new Date().toISOString(),
      error: error.message,
      rollback,
    })
    if (rollback.unresolved.length)
      console.error(`${rollback.unresolved.length} record(s) require manual conflict resolution; see failure evidence.`)
    throw error
  }

  writeJson(resultPath('applied'), {
    action: 'applied',
    batch: batchNumber,
    completed_at: new Date().toISOString(),
    source_snapshot_sha256: plan.source_snapshot_sha256,
    applied,
  })
  console.log(`Batch ${batchNumber} applied and read-back verified: ${applied.length} records.`)
}

async function verifyBatch() {
  const { config, snapshot: snapshotValue, zhIndexablePaths, plan } = loadFrozenState()
  const routes = routesForBatch(plan)
  const beforeBySlug = new Map(snapshotValue.blogs.map(blog => [blog.route_id, blog]))
  const planBySlug = new Map(plan.changes.map(change => [change.route_id, change]))
  const verified = []
  for (const route of routes) {
    const before = beforeBySlug.get(route)
    const fields = Object.keys(planBySlug.get(route).fields)
    const expected = {}
    for (const field of fields)
      expected[field] = transformHtml(before[field], field, config, zhIndexablePaths, route).html
    const current = await fetchBlog(route)
    await assertCurrentMatches(current, expected, fields, 'the intended after state')
    assertUntouchedFieldsUnchanged(before, current, fields, 'verification')
    verified.push({
      route_id: route,
      fields: Object.fromEntries(fields.map(field => [field, sha256(current[field])])),
    })
  }
  writeJson(resultPath('verified'), {
    action: 'verified',
    batch: batchNumber,
    verified_at: new Date().toISOString(),
    source_snapshot_sha256: plan.source_snapshot_sha256,
    verified,
  })
  console.log(`Batch ${batchNumber} verified: ${verified.length} records match intended after state.`)
}

async function verifyAll() {
  const { config, snapshot: snapshotValue, zhIndexablePaths, plan } = loadFrozenState()
  const currentBlogs = await fetchAllBlogs()
  const beforeBySlug = new Map(snapshotValue.blogs.map(blog => [blog.route_id, blog]))
  const planBySlug = new Map(plan.changes.map(change => [change.route_id, change]))
  const failures = []
  let remainingPlannedChanges = 0

  for (const current of currentBlogs) {
    const before = beforeBySlug.get(current.route_id)
    if (!before) {
      failures.push(`${current.route_id}: missing from before snapshot`)
      continue
    }
    const change = planBySlug.get(current.route_id)
    try {
      if (!change) {
        assertFullRecordMatches(current, before, 'the unchanged before state')
      }
      else {
        const fields = Object.keys(change.fields)
        const expected = {}
        for (const field of fields)
          expected[field] = transformHtml(before[field], field, config, zhIndexablePaths, current.route_id).html
        await assertCurrentMatches(current, expected, fields, 'the final intended state')
        assertUntouchedFieldsUnchanged(before, current, fields, 'full verification')
      }
      for (const field of ['content', 'en_content'])
        remainingPlannedChanges += transformHtml(current[field], field, config, zhIndexablePaths, current.route_id).changes.length
    }
    catch (error) {
      failures.push(error.message)
    }
  }

  const externalBefore = selectedHrefMultiset(snapshotValue.blogs, config, context => !context.internal)
  const externalAfter = selectedHrefMultiset(currentBlogs, config, context => !context.internal)
  if (canonicalJson(externalBefore) !== canonicalJson(externalAfter))
    failures.push('External href multiset changed')

  const blogBefore = selectedHrefMultiset(
    snapshotValue.blogs,
    config,
    context => context.internal && context.pathname.startsWith('/blog/'),
  )
  const blogAfter = selectedHrefMultiset(
    currentBlogs,
    config,
    context => context.internal && context.pathname.startsWith('/blog/'),
  )
  if (canonicalJson(blogBefore) !== canonicalJson(blogAfter))
    failures.push('Internal /blog/* href multiset changed')

  if (remainingPlannedChanges)
    failures.push(`${remainingPlannedChanges} href(s) still match the cleanup rules`)

  const vercel = readJson(path.join(ROOT, 'vercel.json'))
  const redirectSources = new Set((vercel.redirects || []).map(redirect => redirect.source))
  const requiredRedirects = Object.keys(config.legacyPathMap)
  const missingRedirects = requiredRedirects.filter(source =>
    !redirectSources.has(source) && !redirectSources.has(decodeURIComponent(source)))
  if (missingRedirects.length)
    failures.push(`Legacy redirects missing from vercel.json: ${missingRedirects.join(', ')}`)

  const evidence = {
    verification_type: 'cms-internal-link-cleanup-final',
    verified_at: new Date().toISOString(),
    source_snapshot_sha256: plan.source_snapshot_sha256,
    plan_sha256: plan.plan_sha256,
    cms_records: currentBlogs.length,
    changed_records: plan.changed_records,
    changed_fields: plan.changed_fields,
    changed_links: plan.changed_links,
    remaining_planned_changes: remainingPlannedChanges,
    external_hrefs_before: externalBefore.length,
    external_hrefs_after: externalAfter.length,
    blog_hrefs_before: blogBefore.length,
    blog_hrefs_after: blogAfter.length,
    legacy_redirects_preserved: requiredRedirects.length - missingRedirects.length,
    failures,
  }
  writeJson(path.join(EVIDENCE_DIR, '2026-07-29-cms-link-cleanup-final-verification.json'), evidence)
  if (failures.length)
    throw new Error(`Full verification failed: ${failures.join('; ')}`)
  console.log(`Full verification passed: ${currentBlogs.length} CMS records, ${plan.changed_links} href changes, 0 remaining.`)
  console.log(`External hrefs unchanged (${externalAfter.length}); internal /blog/* hrefs unchanged (${blogAfter.length}).`)
}

async function rollbackBatch() {
  const { config, snapshot: snapshotValue, zhIndexablePaths, plan } = loadFrozenState()
  const routes = routesForBatch(plan)
  const beforeBySlug = new Map(snapshotValue.blogs.map(blog => [blog.route_id, blog]))
  const planBySlug = new Map(plan.changes.map(change => [change.route_id, change]))
  const rollback = { restored: [], already_before: [], unresolved: [] }
  for (const route of [...routes].reverse()) {
    const before = beforeBySlug.get(route)
    const fields = Object.keys(planBySlug.get(route).fields)
    try {
      const current = await fetchBlog(route)
      const isBefore = fields.every(field => String(current[field] ?? '') === String(before[field] ?? ''))
      if (isBefore) {
        assertUntouchedFieldsUnchanged(before, current, fields, 'rollback already-before check')
        rollback.already_before.push(route)
        console.log(`Already at before state: ${route}`)
        continue
      }
      const expectedAfter = {}
      for (const field of fields)
        expectedAfter[field] = transformHtml(before[field], field, config, zhIndexablePaths, route).html
      await assertCurrentMatches(current, expectedAfter, fields, 'the intended after state')
      assertUntouchedFieldsUnchanged(before, current, fields, 'rollback preflight')
      const payload = { id: before.id, route_id: route }
      for (const field of fields)
        payload[field] = before[field]
      await putBlog(payload)
      const readBack = await fetchBlog(route)
      await assertCurrentMatches(readBack, before, fields, 'the before snapshot')
      assertUntouchedFieldsUnchanged(current, readBack, fields, 'rollback')
      rollback.restored.push(route)
      console.log(`Restored ${route}`)
    }
    catch (error) {
      rollback.unresolved.push({ route_id: route, error: error.message })
      console.error(`Could not safely restore ${route}: ${error.message}`)
    }
  }
  writeJson(resultPath('rolled-back'), {
    action: 'rolled-back',
    batch: batchNumber,
    completed_at: new Date().toISOString(),
    source_snapshot_sha256: plan.source_snapshot_sha256,
    ...rollback,
  })
  if (rollback.unresolved.length)
    throw new Error(`Rollback batch ${batchNumber} left ${rollback.unresolved.length} unresolved record(s)`)
}

async function main() {
  if (!API_BASE.startsWith('https://'))
    throw new Error(`Refusing non-HTTPS API base: ${API_BASE}`)
  if (!Number.isInteger(batchSize) || batchSize < 1)
    throw new Error(`Invalid --batch-size: ${batchSize}`)
  if (!fs.existsSync(CONFIG_PATH))
    throw new Error(`Missing config: ${CONFIG_PATH}`)
  if (!fs.existsSync(ZH_SITEMAP_PATH))
    throw new Error(`Missing Chinese sitemap: ${ZH_SITEMAP_PATH}`)

  if (mode === 'snapshot')
    await snapshot()
  else if (mode === 'verify-all')
    await verifyAll()
  else if (mode === 'apply')
    await applyBatch()
  else if (mode === 'verify')
    await verifyBatch()
  else if (mode === 'rollback')
    await rollbackBatch()
  else
    await dryRun()
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

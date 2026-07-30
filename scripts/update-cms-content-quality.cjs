#!/usr/bin/env node
const crypto = require('node:crypto')
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const ROOT = process.cwd()
const API_BASE = (process.env.BLOG_API_BASE || 'https://yunda-admin-system.yundasurrogacy.com').replace(/\/+$/, '')
const CONFIG_PATH = path.join(ROOT, 'data', 'cms-content-quality-map.json')
const ROUTE_PLAN_PATH = path.join(ROOT, 'seo-project', '06-technical', 'release-checks', '2026-07-29-cms-link-cleanup-plan.json')
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'))
const ARTIFACT_DATE = config.artifactDate
const BEFORE_PATH = path.join(ROOT, 'seo-project', '05-content', 'source-snapshots', `${ARTIFACT_DATE}-cms-content-quality-before.json`)
const PLAN_PATH = path.join(ROOT, 'seo-project', '05-content', 'drafts', 'cms-content-quality', `${ARTIFACT_DATE}-plan.json`)
const AFTER_PATH = path.join(ROOT, 'seo-project', '05-content', 'publication-records', `${ARTIFACT_DATE}-cms-content-quality-after.json`)
const PROGRESS_PATH = path.join(ROOT, 'seo-project', '05-content', 'publication-records', `${ARTIFACT_DATE}-cms-content-quality-progress.json`)
const FAILURE_PATH = path.join(ROOT, 'seo-project', '05-content', 'publication-records', `${ARTIFACT_DATE}-cms-content-quality-failure.json`)
const EXTERNAL_AUDIT_PATH = path.join(ROOT, 'seo-project', '06-technical', 'release-checks', `${ARTIFACT_DATE}-cms-external-link-audit.json`)
const args = process.argv.slice(2)
const mode = args.includes('--snapshot')
  ? 'snapshot'
  : args.includes('--apply')
    ? 'apply'
    : args.includes('--verify')
      ? 'verify'
      : args.includes('--rollback')
        ? 'rollback'
        : args.includes('--audit-external')
          ? 'audit-external'
          : 'dry-run'
const batchIndex = args.indexOf('--batch')
const requestedBatch = batchIndex >= 0 ? Number.parseInt(args[batchIndex + 1], 10) : 0
const TIMEOUT_MS = 90000

function sha256(value) {
  return crypto.createHash('sha256').update(String(value ?? ''), 'utf8').digest('hex')
}

function canonicalJson(value) {
  if (Array.isArray(value))
    return `[${value.map(canonicalJson).join(',')}]`
  if (value && typeof value === 'object')
    return `{${Object.keys(value).sort().map(key => `${JSON.stringify(key)}:${canonicalJson(value[key])}`).join(',')}}`
  return JSON.stringify(value)
}

function stableBlogsHash(blogs) {
  return sha256(canonicalJson(
    blogs.map(blog => ({ ...blog })).sort((a, b) => a.route_id.localeCompare(b.route_id)),
  ))
}

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

function visibleText(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&#39;|&apos;/gi, '\'')
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

function escapeAttribute(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function escapeHtml(value) {
  return escapeAttribute(value).replace(/'/g, '&#39;')
}

function decodeAttribute(value) {
  return String(value).replace(/&amp;/gi, '&').replace(/&quot;/gi, '"').replace(/&#39;|&apos;/gi, '\'')
}

function attributes(tag) {
  return Object.fromEntries(
    [...String(tag).matchAll(/([:\w-]+)\s*=\s*(["'])(.*?)\2/g)]
      .map(match => [match[1].toLowerCase(), decodeAttribute(match[3])]),
  )
}

function setAttribute(tag, name, value) {
  const pattern = new RegExp(`\\s${name}\\s*=\\s*(["']).*?\\1`, 'i')
  const attribute = ` ${name}="${escapeAttribute(value)}"`
  if (pattern.test(tag))
    return tag.replace(pattern, attribute)
  return tag.replace(/\s*\/?>$/, match => `${attribute}${match}`)
}

function removeAttribute(tag, name) {
  return tag.replace(new RegExp(`\\s${name}\\s*=\\s*([\"']).*?\\1`, 'gi'), '')
}

function normalizePathname(value) {
  const withLeadingSlash = String(value || '/').startsWith('/') ? String(value || '/') : `/${value}`
  return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, '') : withLeadingSlash
}

function routeIds() {
  const routePlan = readJson(ROUTE_PLAN_PATH)
  const ids = routePlan.changes.map(change => change.route_id)
  if (ids.length !== 50 || new Set(ids).size !== 50)
    throw new Error(`Expected 50 unique CMS routes, found ${ids.length}/${new Set(ids).size}`)
  return ids.sort()
}

async function fetchJson(url, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
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
    clearTimeout(timer)
  }
}

async function fetchBlog(slug) {
  const blog = await fetchJson(
    `${API_BASE}/api/blog?route_id=${encodeURIComponent(slug)}&cache_bust=${Date.now()}-${Math.random()}`,
  )
  if (!blog?.id || blog.route_id !== slug)
    throw new Error(`${slug}: unexpected API response`)
  return blog
}

async function fetchBlogs(ids) {
  const output = Array.from({ length: ids.length })
  let cursor = 0
  const workers = Array.from({ length: 6 }, async () => {
    while (cursor < ids.length) {
      const index = cursor++
      output[index] = await fetchBlog(ids[index])
    }
  })
  await Promise.all(workers)
  return output.sort((a, b) => a.route_id.localeCompare(b.route_id))
}

async function fetchAllBlogs() {
  const listing = await fetchJson(`${API_BASE}/api/blog?includeContent=true&limit=200&cache_bust=${Date.now()}`)
  const rows = Array.isArray(listing) ? listing : listing.blogs
  if (!Array.isArray(rows) || rows.length < 50)
    throw new Error('CMS full listing did not return the expected records')
  return rows
}

async function putBlog(payload) {
  const result = await fetchJson(`${API_BASE}/api/blog`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!result?.id)
    throw new Error(`${payload.route_id}: PUT response did not contain an id`)
  return result
}

function cleanExternalHref(href) {
  let url
  try {
    url = new URL(decodeAttribute(href))
  }
  catch {
    return href
  }
  for (const key of [...url.searchParams.keys()]) {
    if (/^utm_/i.test(key) || ['igsh', 'si'].includes(key))
      url.searchParams.delete(key)
  }
  return url.toString()
}

function isInternalHref(href) {
  try {
    const url = new URL(decodeAttribute(href), 'https://www.yundasurrogacy.com')
    return /(?:^|\.)yundasurrogacy\.com$/i.test(url.hostname)
  }
  catch {
    return false
  }
}

function localizeBlogHref(href, zhTargets) {
  let url
  try {
    url = new URL(decodeAttribute(href), 'https://www.yundasurrogacy.com')
  }
  catch {
    return href
  }
  if (!/(?:^|\.)yundasurrogacy\.com$/i.test(url.hostname))
    return href
  const match = normalizePathname(url.pathname).match(/^\/blog\/(.+)$/)
  if (!match || !zhTargets.has(decodeURIComponent(match[1])))
    return href
  const localizedPath = `/zh/blog/${match[1]}`
  if (String(href).startsWith('/'))
    return `${localizedPath}${url.search}${url.hash}`
  url.pathname = localizedPath
  return url.toString()
}

function transformTextNodes(html, replacements, stats) {
  if (!replacements?.length)
    return html
  let output = String(html)
  for (const [from, to] of replacements) {
    const parts = output.split(/(<[^>]+>)/g)
    let matches = 0
    for (let index = 0; index < parts.length; index += 2) {
      if (!parts[index].includes(from))
        continue
      const count = parts[index].split(from).length - 1
      parts[index] = parts[index].split(from).join(to)
      matches += count
    }
    output = parts.join('')
    if (!matches) {
      const flexiblePattern = from
        .trim()
        .split(/\s+/)
        .map(part => part
          .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
          .replace(/&/g, '(?:&|&amp;)'))
        .join('(?:\\s|&nbsp;|&#160;|<[^>]+>)+')
      output = output.replace(new RegExp(flexiblePattern, 'g'), (matched) => {
        if (/<(?:a|img)\b/i.test(matched))
          throw new Error(`Refusing to replace linked or image content: ${from}`)
        matches += 1
        return escapeHtml(to)
      })
    }
    if (!matches)
      throw new Error(`Expected text was not found: ${from}`)
    stats.paragraph_text_replacements += matches
  }
  return output
}

function applyAnchorTextOverrides(html, routeId, field, stats) {
  const overrides = config.anchorTextOverrides.filter(item => item.route_id === routeId && item.field === field)
  let output = html
  for (const override of overrides) {
    let matches = 0
    output = output.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (full, rawAttributes, inner) => {
      const attrs = attributes(`<a${rawAttributes}>`)
      if (!String(attrs.href || '').includes(override.hrefContains) || visibleText(inner) !== override.from)
        return full
      matches += 1
      return `<a${rawAttributes}>${escapeHtml(override.to)}</a>`
    })
    if (!matches)
      throw new Error(`${routeId}/${field}: anchor override did not match "${override.from}"`)
    stats.anchor_text_replacements += matches
  }
  return output
}

function transformImagesAndHeadings(html, pageTitle, stats) {
  let lastHeading = ''
  const source = String(html)
  const tokenPattern = /<h([2-6])\b[^>]*>[\s\S]*?<\/h\1>|<img\b[^>]*>/gi
  const output = []
  let cursor = 0
  for (const match of source.matchAll(tokenPattern)) {
    output.push(source.slice(cursor, match.index))
    const token = match[0]
    cursor = match.index + token.length
    if (/^<h/i.test(token)) {
      const innerMatch = token.match(/^<h[2-6]\b[^>]*>([\s\S]*?)<\/h[2-6]>$/i)
      const text = visibleText(innerMatch?.[1] || '')
      if (text) {
        lastHeading = text
        if (/<img\b/i.test(innerMatch?.[1] || '')) {
          const images = [...innerMatch[1].matchAll(/<img\b[^>]*>/gi)].map(match => match[0]).join('')
          const headingWithoutImages = token.replace(
            innerMatch[1],
            innerMatch[1].replace(/<img\b[^>]*>/gi, ''),
          )
          output.push(headingWithoutImages)
          output.push(transformImagesAndHeadings(images, text, stats))
          stats.image_headings_unwrapped += 1
        }
        else {
          output.push(token)
        }
      }
      else if (/<img\b/i.test(innerMatch?.[1] || '')) {
        output.push(transformImagesAndHeadings(innerMatch[1], lastHeading || pageTitle, stats))
        stats.image_headings_unwrapped += 1
      }
      else {
        stats.empty_headings_removed += 1
      }
      continue
    }
    let image = token
    const attrs = attributes(image)
    if (!Object.hasOwn(attrs, 'alt') || !String(attrs.alt).trim()) {
      const context = (lastHeading || pageTitle || 'Surrogacy information').replace(/\s+/g, ' ').trim()
      image = setAttribute(image, 'alt', context)
      stats.image_alts_added += 1
    }
    if (!Object.hasOwn(attrs, 'loading')) {
      image = setAttribute(image, 'loading', 'lazy')
      stats.image_loading_added += 1
    }
    if (!Object.hasOwn(attrs, 'decoding')) {
      image = setAttribute(image, 'decoding', 'async')
      stats.image_decoding_added += 1
    }
    output.push(image)
  }
  output.push(source.slice(cursor))
  return output.join('')
}

function transformAnchors(html, field, zhTargets, stats) {
  return String(html).replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (full, rawAttributes, inner) => {
    const tag = `<a${rawAttributes}>`
    const attrs = attributes(tag)
    const href = String(attrs.href || '').trim()
    const text = visibleText(inner)
    const imageMatch = inner.match(/<img\b[^>]*>/i)

    if (!text && !imageMatch) {
      stats.empty_anchors_removed += 1
      return ''
    }

    if (imageMatch && !text && decodeAttribute(href) === decodeAttribute(attributes(imageMatch[0]).src || '')) {
      stats.image_link_wrappers_removed += 1
      return inner
    }

    if (!href)
      return full

    let nextHref = href
    if (field === 'content') {
      const localized = localizeBlogHref(nextHref, zhTargets)
      if (localized !== nextHref) {
        nextHref = localized
        stats.zh_blog_links_localized += 1
      }
    }

    let nextTag = tag
    if (/^https?:\/\//i.test(decodeAttribute(nextHref)) && !isInternalHref(nextHref)) {
      const cleaned = cleanExternalHref(nextHref)
      if (cleaned !== decodeAttribute(nextHref)) {
        nextHref = cleaned
        stats.external_tracking_parameters_removed += 1
      }
      nextTag = setAttribute(nextTag, 'target', '_blank')
      const rel = new Set(String(attributes(nextTag).rel || '').split(/\s+/).filter(Boolean))
      rel.add('noopener')
      rel.add('noreferrer')
      nextTag = setAttribute(nextTag, 'rel', [...rel].join(' '))
    }
    else if (isInternalHref(nextHref)) {
      const before = nextTag
      nextTag = removeAttribute(nextTag, 'target')
      if (before !== nextTag)
        stats.internal_blank_targets_removed += 1
    }
    nextTag = setAttribute(nextTag, 'href', nextHref)
    return `${nextTag}${inner}</a>`
  })
}

function normalizeHtml(html, routeId, field, title, zhTargets) {
  const stats = {
    empty_anchors_removed: 0,
    image_link_wrappers_removed: 0,
    empty_headings_removed: 0,
    image_headings_unwrapped: 0,
    image_alts_added: 0,
    image_loading_added: 0,
    image_decoding_added: 0,
    zh_blog_links_localized: 0,
    external_tracking_parameters_removed: 0,
    internal_blank_targets_removed: 0,
    anchor_text_replacements: 0,
    paragraph_text_replacements: 0,
  }
  let output = transformTextNodes(
    String(html || ''),
    config.textReplacements?.[routeId]?.[field],
    stats,
  )
  output = applyAnchorTextOverrides(output, routeId, field, stats)
  output = transformImagesAndHeadings(output, title, stats)
  output = transformAnchors(output, field, zhTargets, stats)
  if (/<h[2-6]\b[^>]*>\s*(?:<[^>]+>\s*)*<\/h[2-6]>/i.test(output))
    throw new Error(`${routeId}/${field}: empty heading remained after transformation`)
  const trulyEmptyAnchors = [...output.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)]
    .filter(match => !visibleText(match[1]) && !/<img\b/i.test(match[1]))
  if (trulyEmptyAnchors.length)
    throw new Error(`${routeId}/${field}: ${trulyEmptyAnchors.length} empty anchor(s) remained`)
  const imageWithoutAlt = [...output.matchAll(/<img\b[^>]*>/gi)]
    .find(match => !Object.hasOwn(attributes(match[0]), 'alt'))
  if (imageWithoutAlt)
    throw new Error(`${routeId}/${field}: image without alt remained: ${imageWithoutAlt[0]}`)
  return { html: output, stats }
}

function buildPlan(snapshot, zhTargets) {
  const changes = []
  for (const before of snapshot.blogs) {
    const fields = {}
    const transformed = {}
    for (const field of ['title', 'en_title']) {
      const next = config.titleOverrides?.[before.route_id]?.[field]
      if (next && next !== before[field]) {
        fields[field] = {
          before_sha256: sha256(before[field]),
          after_sha256: sha256(next),
          before: before[field],
          after: next,
          stats: { title_updated: 1 },
        }
        transformed[field] = next
      }
    }
    for (const field of ['content', 'en_content']) {
      if (!before[field])
        continue
      const title = transformed[field === 'content' ? 'title' : 'en_title']
        || before[field === 'content' ? 'title' : 'en_title']
      const result = normalizeHtml(before[field], before.route_id, field, title, zhTargets)
      if (result.html !== before[field]) {
        fields[field] = {
          before_sha256: sha256(before[field]),
          after_sha256: sha256(result.html),
          before_length: before[field].length,
          after_length: result.html.length,
          stats: result.stats,
        }
        transformed[field] = result.html
      }
    }
    if (Object.keys(fields).length)
      changes.push({ id: before.id, route_id: before.route_id, fields })
  }
  const batches = []
  for (let index = 0; index < changes.length; index += config.batchSize)
    batches.push({ number: batches.length + 1, routes: changes.slice(index, index + config.batchSize).map(change => change.route_id) })
  const totals = {}
  for (const change of changes) {
    for (const field of Object.values(change.fields)) {
      for (const [name, count] of Object.entries(field.stats || {}))
        totals[name] = (totals[name] || 0) + count
    }
  }
  return {
    plan_type: 'cms-content-quality-update',
    generated_at: new Date().toISOString(),
    source_snapshot: path.relative(ROOT, BEFORE_PATH),
    source_snapshot_sha256: snapshot.snapshot_sha256,
    config: path.relative(ROOT, CONFIG_PATH),
    config_sha256: sha256(fs.readFileSync(CONFIG_PATH)),
    selected_records: snapshot.blogs.length,
    changed_records: changes.length,
    changed_fields: changes.reduce((sum, change) => sum + Object.keys(change.fields).length, 0),
    totals,
    zh_targets_with_content: [...zhTargets].sort(),
    changes,
    batches,
  }
}

function loadBefore() {
  if (!fs.existsSync(BEFORE_PATH))
    throw new Error(`Missing snapshot: ${BEFORE_PATH}`)
  const snapshot = readJson(BEFORE_PATH)
  if (snapshot.snapshot_sha256 !== stableBlogsHash(snapshot.blogs))
    throw new Error('Before snapshot hash mismatch')
  return snapshot
}

function loadPlan() {
  if (!fs.existsSync(PLAN_PATH))
    throw new Error(`Missing plan: ${PLAN_PATH}`)
  const plan = readJson(PLAN_PATH)
  if (plan.config_sha256 !== sha256(fs.readFileSync(CONFIG_PATH)))
    throw new Error('Config changed after plan generation')
  return plan
}

function fieldsForChange(change) {
  return Object.keys(change.fields)
}

function buildPayload(before, change, zhTargets, state) {
  const payload = { id: before.id, route_id: before.route_id }
  for (const field of fieldsForChange(change)) {
    if (field === 'content' || field === 'en_content') {
      const title = state[field === 'content' ? 'title' : 'en_title']
        || before[field === 'content' ? 'title' : 'en_title']
      payload[field] = normalizeHtml(before[field], before.route_id, field, title, zhTargets).html
    }
    else {
      payload[field] = config.titleOverrides[before.route_id][field]
    }
  }
  return payload
}

function selectedChanges(plan) {
  if (!requestedBatch)
    throw new Error('Specify --batch N')
  const batch = plan.batches.find(item => item.number === requestedBatch)
  if (!batch)
    throw new Error(`Batch ${requestedBatch} does not exist`)
  const routes = new Set(batch.routes)
  return plan.changes.filter(change => routes.has(change.route_id))
}

async function snapshotMode() {
  if (fs.existsSync(BEFORE_PATH) && !args.includes('--force'))
    throw new Error(`Refusing to overwrite existing snapshot: ${BEFORE_PATH}`)
  const blogs = await fetchBlogs(routeIds())
  const snapshot = {
    snapshot_type: 'cms-content-quality-before',
    collected_at: new Date().toISOString(),
    source: `${API_BASE}/api/blog`,
    count: blogs.length,
    blogs,
  }
  snapshot.snapshot_sha256 = stableBlogsHash(snapshot.blogs)
  writeJson(BEFORE_PATH, snapshot)
  fs.writeFileSync(`${BEFORE_PATH}.sha256`, `${snapshot.snapshot_sha256}  ${path.basename(BEFORE_PATH)}\n`)
  console.log(`Saved ${blogs.length} current CMS records to ${BEFORE_PATH}`)
}

async function dryRunMode() {
  const snapshot = loadBefore()
  const allBlogs = await fetchAllBlogs()
  const zhTargets = new Set(allBlogs.filter(blog => visibleText(blog.content)).map(blog => blog.route_id))
  const plan = buildPlan(snapshot, zhTargets)
  plan.plan_sha256 = sha256(canonicalJson({ ...plan, plan_sha256: undefined }))
  writeJson(PLAN_PATH, plan)
  console.log(JSON.stringify({
    plan: PLAN_PATH,
    selected_records: plan.selected_records,
    changed_records: plan.changed_records,
    changed_fields: plan.changed_fields,
    batches: plan.batches.length,
    totals: plan.totals,
  }, null, 2))
}

async function applyOrVerify() {
  const snapshot = loadBefore()
  const plan = loadPlan()
  const changes = selectedChanges(plan)
  const beforeByRoute = new Map(snapshot.blogs.map(blog => [blog.route_id, blog]))
  const zhTargets = new Set(plan.zh_targets_with_content)
  const results = []
  for (const change of changes) {
    const before = beforeByRoute.get(change.route_id)
    const expected = buildPayload(before, change, zhTargets, {
      title: config.titleOverrides?.[change.route_id]?.title || before.title,
      en_title: config.titleOverrides?.[change.route_id]?.en_title || before.en_title,
    })
    const current = await fetchBlog(change.route_id)
    if (mode === 'apply') {
      const fields = fieldsForChange(change)
      const alreadyExpected = fields.every(field => current[field] === expected[field])
      if (alreadyExpected) {
        console.log(`Already updated ${change.route_id}`)
      }
      else {
        for (const field of fields) {
          if (sha256(current[field]) !== change.fields[field].before_sha256)
            throw new Error(`${change.route_id}: ${field} changed after snapshot; refusing write`)
        }
        await putBlog(expected)
      }
    }
    const readBack = mode === 'apply' ? await fetchBlog(change.route_id) : current
    for (const field of fieldsForChange(change)) {
      if (readBack[field] !== expected[field])
        throw new Error(`${change.route_id}: ${field} read-back mismatch`)
    }
    results.push({
      route_id: change.route_id,
      fields: fieldsForChange(change),
      hashes: Object.fromEntries(fieldsForChange(change).map(field => [field, sha256(readBack[field])])),
    })
    console.log(`${mode === 'apply' ? 'Updated' : 'Verified'} ${change.route_id}`)
  }
  const progress = fs.existsSync(PROGRESS_PATH) ? readJson(PROGRESS_PATH) : { completed_batches: [] }
  progress.updated_at = new Date().toISOString()
  progress.action = mode
  progress.completed_batches = [...new Set([...progress.completed_batches, requestedBatch])].sort((a, b) => a - b)
  progress.results = [...(progress.results || []).filter(item => !results.some(result => result.route_id === item.route_id)), ...results]
  writeJson(PROGRESS_PATH, progress)
}

async function rollbackMode() {
  const snapshot = loadBefore()
  const plan = loadPlan()
  const changes = selectedChanges(plan)
  const beforeByRoute = new Map(snapshot.blogs.map(blog => [blog.route_id, blog]))
  const zhTargets = new Set(plan.zh_targets_with_content)
  for (const change of [...changes].reverse()) {
    const before = beforeByRoute.get(change.route_id)
    const expectedAfter = buildPayload(before, change, zhTargets, {
      title: config.titleOverrides?.[change.route_id]?.title || before.title,
      en_title: config.titleOverrides?.[change.route_id]?.en_title || before.en_title,
    })
    const current = await fetchBlog(change.route_id)
    for (const field of fieldsForChange(change)) {
      if (current[field] !== expectedAfter[field] && current[field] !== before[field])
        throw new Error(`${change.route_id}: ${field} is neither expected before nor after state`)
    }
    const payload = { id: before.id, route_id: before.route_id }
    for (const field of fieldsForChange(change))
      payload[field] = before[field]
    await putBlog(payload)
    const readBack = await fetchBlog(change.route_id)
    for (const field of fieldsForChange(change)) {
      if (readBack[field] !== before[field])
        throw new Error(`${change.route_id}: rollback mismatch for ${field}`)
    }
    console.log(`Restored ${change.route_id}`)
  }
}

function extractExternalLinks(blogs) {
  const links = new Map()
  for (const blog of blogs) {
    for (const field of ['content', 'en_content']) {
      for (const match of String(blog[field] || '').matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/gi)) {
        const href = String(attributes(match[0]).href || '')
        if (!/^https?:\/\//i.test(href) || isInternalHref(href) || new URL(href).hostname === 'images.unsplash.com')
          continue
        if (!links.has(href))
          links.set(href, [])
        links.get(href).push({ route_id: blog.route_id, field, anchor_text: visibleText(match[1]) })
      }
    }
  }
  return links
}

async function checkExternal(url) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 20000)
  try {
    let response = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual',
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 YundaContentQA/1.0' },
    })
    if ([403, 405, 429].includes(response.status)) {
      response = await fetch(url, {
        method: 'GET',
        redirect: 'manual',
        signal: controller.signal,
        headers: { 'User-Agent': 'Mozilla/5.0 YundaContentQA/1.0', 'Range': 'bytes=0-2048' },
      })
    }
    return {
      status: response.status,
      location: response.headers.get('location') || '',
      content_type: response.headers.get('content-type') || '',
    }
  }
  catch (error) {
    return { status: 0, error: `${error.name}: ${error.message}` }
  }
  finally {
    clearTimeout(timer)
  }
}

async function auditExternalMode() {
  const current = await fetchBlogs(routeIds())
  const links = [...extractExternalLinks(current)]
  const results = Array.from({ length: links.length })
  let cursor = 0
  const workers = Array.from({ length: 6 }, async () => {
    while (cursor < links.length) {
      const index = cursor++
      const [url, contexts] = links[index]
      results[index] = { url, contexts, ...await checkExternal(url) }
    }
  })
  await Promise.all(workers)
  const statusCounts = {}
  for (const result of results)
    statusCounts[result.status] = (statusCounts[result.status] || 0) + 1
  writeJson(EXTERNAL_AUDIT_PATH, {
    audit_type: 'cms-external-links',
    checked_at: new Date().toISOString(),
    selected_records: current.length,
    unique_links: results.length,
    status_counts: statusCounts,
    results,
  })
  console.log(JSON.stringify({ audit: EXTERNAL_AUDIT_PATH, unique_links: results.length, status_counts: statusCounts }, null, 2))
}

async function finalAfterSnapshot() {
  const current = await fetchBlogs(routeIds())
  const plan = loadPlan()
  const after = {
    snapshot_type: 'cms-content-quality-after',
    collected_at: new Date().toISOString(),
    source: `${API_BASE}/api/blog`,
    count: current.length,
    source_snapshot_sha256: plan.source_snapshot_sha256,
    blogs: current,
  }
  after.snapshot_sha256 = stableBlogsHash(after.blogs)
  writeJson(AFTER_PATH, after)
}

async function main() {
  if (!API_BASE.startsWith('https://'))
    throw new Error(`Refusing non-HTTPS API base: ${API_BASE}`)
  if (mode === 'snapshot')
    await snapshotMode()
  else if (mode === 'dry-run')
    await dryRunMode()
  else if (mode === 'apply' || mode === 'verify')
    await applyOrVerify()
  else if (mode === 'rollback')
    await rollbackMode()
  else if (mode === 'audit-external')
    await auditExternalMode()

  if (args.includes('--final-snapshot'))
    await finalAfterSnapshot()
}

main().catch((error) => {
  writeJson(FAILURE_PATH, {
    failed_at: new Date().toISOString(),
    mode,
    batch: requestedBatch || null,
    error: error.stack || error.message,
  })
  console.error(error)
  process.exit(1)
})

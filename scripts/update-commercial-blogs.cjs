const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const API_BASE = (process.env.BLOG_API_BASE || 'https://yunda-admin-system.yundasurrogacy.com').replace(/\/$/, '')
const BEFORE_PATH = path.resolve(
  process.env.BLOG_BACKUP_PATH
  || 'seo-project/05-content/source-snapshots/2026-07-29-commercial-blogs-before.json',
)
const SPEC_PATH = path.resolve('data/blog-commercial-content-updates.json')
const PREVIEW_PATH = path.resolve('seo-project/05-content/drafts/commercial-blog-updates/2026-07-29-update-preview.json')
const AFTER_PATH = path.resolve('seo-project/05-content/publication-records/2026-07-29-commercial-blogs-after.json')
const mode = process.argv.includes('--apply')
  ? 'apply'
  : process.argv.includes('--rollback')
    ? 'rollback'
    : 'dry-run'

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function canonicalizeInternalLinks(html) {
  return String(html || '')
    .replaceAll('https://www.yundasurrogacy.com/surrogacy-price', 'https://www.yundasurrogacy.com/surrogacy-cost')
    .replaceAll('https://www.yundasurrogacy.com/become-a-surrogate-mother', 'https://www.yundasurrogacy.com/become-a-surrogate')
    .replaceAll('https://www.yundasurrogacy.com/become-a-surrogay-mother', 'https://www.yundasurrogacy.com/become-a-surrogate')
    .replaceAll('https://www.yundasurrogacy.com/surrogate-journey', 'https://www.yundasurrogacy.com/journey')
}

function buildRoleSection(spec) {
  const keywordList = spec.secondaryKeywords.map(escapeHtml).join(', ')
  return [
    `<section data-yunda-seo-role="commercial-supporting-page" data-updated="2026-07-29">`,
    `<h2>${escapeHtml(spec.sectionHeading)}</h2>`,
    `<p><strong>Direct answer:</strong> ${escapeHtml(spec.directAnswer)}</p>`,
    `<p>${escapeHtml(spec.positioning)} Continue with the <a href="https://www.yundasurrogacy.com${escapeHtml(spec.targetUrl)}">${escapeHtml(spec.targetAnchor)}</a>.</p>`,
    `<p><strong>Questions covered here:</strong> ${keywordList}.</p>`,
    `</section>`,
  ].join('')
}

function updateContent(html, spec) {
  const withoutPriorRole = canonicalizeInternalLinks(html)
    .replace(/<section\b[^>]*data-yunda-seo-role=["']commercial-supporting-page["'][\s\S]*?<\/section>/gi, '')
    .replace(/<h[2-4]\b[^>]*>\s*(?:&nbsp;)?\s*<\/h[2-4]>/gi, '')
  const roleSection = buildRoleSection(spec)
  const firstParagraphEnd = withoutPriorRole.search(/<\/p>/i)

  if (firstParagraphEnd >= 0) {
    const insertAt = firstParagraphEnd + withoutPriorRole.slice(firstParagraphEnd).match(/<\/p>/i)[0].length
    return `${withoutPriorRole.slice(0, insertAt)}${roleSection}${withoutPriorRole.slice(insertAt)}`
  }

  return `${roleSection}${withoutPriorRole}`
}

async function fetchBlog(slug) {
  const response = await fetch(
    `${API_BASE}/api/blog?route_id=${encodeURIComponent(slug)}&cache_bust=${Date.now()}`,
    { headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' } },
  )
  if (!response.ok)
    throw new Error(`${slug}: GET ${response.status}`)
  return response.json()
}

async function putBlog(payload) {
  const response = await fetch(`${API_BASE}/api/blog`, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
  const result = await response.json()
  if (!response.ok || !result?.id)
    throw new Error(`PUT ${payload.id}: ${response.status} ${JSON.stringify(result)}`)
  return result
}

function buildUpdate(blog, spec) {
  return {
    id: blog.id,
    route_id: blog.route_id,
    en_title: spec.title,
    en_seo_title: spec.seoTitle,
    en_seo_description: spec.seoDescription,
    en_content: updateContent(blog.en_content, spec),
  }
}

function assertSpec(slug, spec) {
  if (!spec.primaryKeyword || !spec.targetUrl || !spec.title || !spec.seoTitle || !spec.seoDescription)
    throw new Error(`${slug}: incomplete update specification`)
  if (Array.from(spec.seoTitle).length > 60)
    throw new Error(`${slug}: SEO title exceeds 60 characters`)
  const descriptionLength = Array.from(spec.seoDescription).length
  if (descriptionLength < 120 || descriptionLength > 160)
    throw new Error(`${slug}: SEO description length ${descriptionLength} is outside 120-160`)
}

async function main() {
  if (!fs.existsSync(BEFORE_PATH))
    throw new Error(`Missing backup: ${BEFORE_PATH}`)
  if (!API_BASE.startsWith('https://'))
    throw new Error(`Refusing non-HTTPS API base: ${API_BASE}`)

  const before = JSON.parse(fs.readFileSync(BEFORE_PATH, 'utf8'))
  const specs = JSON.parse(fs.readFileSync(SPEC_PATH, 'utf8')).updates
  const beforeBySlug = new Map(before.blogs.map(blog => [blog.route_id, blog]))
  const slugs = Object.keys(specs)
  if (slugs.length !== before.blogs.length)
    throw new Error(`Spec/backup count mismatch: ${slugs.length}/${before.blogs.length}`)

  const updates = slugs.map((slug) => {
    const blog = beforeBySlug.get(slug)
    if (!blog)
      throw new Error(`${slug}: missing from backup`)
    assertSpec(slug, specs[slug])
    return buildUpdate(blog, specs[slug])
  })

  const preview = {
    preview_type: 'commercial-blog-content-update',
    generated_at: new Date().toISOString(),
    mode,
    api_base: API_BASE,
    count: updates.length,
    updates: updates.map((update) => ({
      id: update.id,
      route_id: update.route_id,
      en_title: update.en_title,
      en_seo_title: update.en_seo_title,
      en_seo_description: update.en_seo_description,
      content_changed: update.en_content !== beforeBySlug.get(update.route_id).en_content,
      before_content_length: String(beforeBySlug.get(update.route_id).en_content || '').length,
      after_content_length: update.en_content.length,
    })),
  }
  fs.mkdirSync(path.dirname(PREVIEW_PATH), { recursive: true })
  fs.writeFileSync(PREVIEW_PATH, `${JSON.stringify(preview, null, 2)}\n`)

  if (mode === 'dry-run') {
    console.log(`Dry run passed for ${updates.length} blogs. Preview: ${PREVIEW_PATH}`)
    return
  }

  if (mode === 'apply') {
    for (const slug of slugs) {
      const current = await fetchBlog(slug)
      const backedUp = beforeBySlug.get(slug)
      for (const field of ['route_id', 'en_title', 'en_seo_title', 'en_seo_description', 'en_content']) {
        if ((current[field] ?? null) !== (backedUp[field] ?? null))
          throw new Error(`${slug}: backend changed after backup; aborting before writes (${field})`)
      }
    }
    console.log(`Preflight passed: all ${slugs.length} backend records still match the backup.`)
  }

  const payloads = mode === 'rollback'
    ? before.blogs.map(blog => ({
        id: blog.id,
        route_id: blog.route_id,
        en_title: blog.en_title,
        en_seo_title: blog.en_seo_title,
        en_seo_description: blog.en_seo_description,
        en_content: blog.en_content,
      }))
    : updates

  const results = []
  for (const payload of payloads) {
    const result = await putBlog(payload)
    for (const field of ['route_id', 'en_title', 'en_seo_title', 'en_seo_description', 'en_content']) {
      if ((result[field] ?? null) !== (payload[field] ?? null))
        throw new Error(`${payload.route_id}: PUT response mismatch for ${field}`)
    }
    results.push(result)
    console.log(`${mode === 'rollback' ? 'Restored' : 'Updated'} ${payload.route_id}`)
  }

  const verified = []
  for (const payload of payloads) {
    const blog = await fetchBlog(payload.route_id)
    for (const field of ['route_id', 'en_title', 'en_seo_title', 'en_seo_description', 'en_content']) {
      if ((blog[field] ?? null) !== (payload[field] ?? null))
        throw new Error(`${payload.route_id}: read-back mismatch for ${field}`)
    }
    verified.push(blog)
  }

  const after = {
    snapshot_type: mode === 'rollback' ? 'commercial-blog-content-rollback' : 'commercial-blog-content-after-update',
    collected_at: new Date().toISOString(),
    source: `${API_BASE}/api/blog`,
    count: verified.length,
    blogs: verified,
  }
  fs.mkdirSync(path.dirname(AFTER_PATH), { recursive: true })
  fs.writeFileSync(AFTER_PATH, `${JSON.stringify(after, null, 2)}\n`)
  console.log(`${mode} and read-back verification completed for ${verified.length} blogs.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

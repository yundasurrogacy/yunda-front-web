const fs = require('node:fs')
const https = require('node:https')
const path = require('node:path')
const process = require('node:process')

const SITE_URL = (process.env.SITE_URL || 'https://www.yundasurrogacy.com').replace(/\/+$/, '')
const BLOG_API_URL = process.env.BLOG_API_URL || 'https://yunda-admin-system.yundasurrogacy.com/api/blog/slugs'
const BLOG_API_FALLBACK_URL = process.env.BLOG_API_FALLBACK_URL || 'https://yunda-admin-system.yundasurrogacy.com/api/blog'
const BLOG_DETAIL_API_URL = process.env.BLOG_DETAIL_API_URL || BLOG_API_FALLBACK_URL
const BLOG_API_LIMIT = Number.parseInt(process.env.BLOG_API_LIMIT || '200', 10)
const BLOG_DETAIL_CONCURRENCY = Number.parseInt(process.env.BLOG_DETAIL_CONCURRENCY || '8', 10)
const BLOG_API_TIMEOUT_MS = Number.parseInt(process.env.BLOG_API_TIMEOUT_MS || '30000', 10)

const OUTPUT_INDEX_PATH = path.join(process.cwd(), 'public', 'sitemap.xml')
const OUTPUT_EN_PATH = path.join(process.cwd(), 'public', 'sitemap-en.xml')
const OUTPUT_ZH_PATH = path.join(process.cwd(), 'public', 'sitemap-zh.xml')
const OUTPUT_AI_PATH = path.join(process.cwd(), 'public', 'sitemap-ai.xml')
const ZH_MISSING_OUTPUT_PATH = path.join(process.cwd(), 'data', 'zh-missing-blogs.json')
const SEO_ROUTES_PATH = path.join(process.cwd(), 'data', 'seo-routes.json')

const STATIC_PAGES = JSON.parse(fs.readFileSync(SEO_ROUTES_PATH, 'utf8')).staticPages
const EN_MACHINE_READABLE_FILES = [
  '/services.md',
  '/site-architecture.md',
  '/surrogacy-cost.md',
  '/surrogacy-process.md',
  '/california-surrogacy-consultation.md',
  '/partner-ivf-clinics.md',
  '/egg-donation.md',
  '/single-parents-lgbtq.md',
  '/surrogate-requirements.md',
  '/surrogate-journey.md',
  '/surrogate-screening.md',
  '/surrogate-benefits.md',
  '/surrogate-compensation.md',
  '/surrogacy-protection-california.md',
  '/third-party-professionals.md',
]
const ZH_MACHINE_READABLE_FILES = [
  '/zh/services.md',
  '/zh/site-architecture.md',
  '/zh/surrogacy-cost.md',
  '/zh/surrogacy-process.md',
  '/zh/california-surrogacy-consultation.md',
  '/zh/partner-ivf-clinics.md',
  '/zh/egg-donation.md',
  '/zh/single-parents-lgbtq.md',
  '/zh/surrogate-requirements.md',
  '/zh/surrogate-journey.md',
  '/zh/surrogate-screening.md',
  '/zh/surrogate-benefits.md',
  '/zh/surrogate-compensation.md',
  '/zh/surrogacy-protection-california.md',
  '/zh/third-party-professionals.md',
]
const AI_MACHINE_READABLE_FILES = [
  '/llms.txt',
  ...EN_MACHINE_READABLE_FILES,
  ...ZH_MACHINE_READABLE_FILES,
]

function toZhPath(loc) {
  return loc === '/' ? '/zh' : `/zh${loc}`
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toAbsoluteUrl(loc) {
  return new URL(loc, `${SITE_URL}/`).toString()
}

function toBasePath(loc) {
  return loc.replace(/^\/zh(?=\/|$)/, '') || '/'
}

function createAlternateLinks(loc, includeZh = true) {
  const basePath = toBasePath(loc)
  const enLoc = basePath
  const zhLoc = toZhPath(basePath)

  // When a blog post has no Chinese body content its /zh/ URL is temporarily redirected
  // to English and excluded from sitemap-zh.xml. Declaring a zh-CN alternate
  // for such a URL contradicts those signals, so omit it. hreflang must only
  // point at indexable canonical URLs.
  return [
    { hreflang: 'en-US', href: toAbsoluteUrl(enLoc) },
    ...(includeZh ? [{ hreflang: 'zh-CN', href: toAbsoluteUrl(zhLoc) }] : []),
    { hreflang: 'x-default', href: toAbsoluteUrl(enLoc) },
  ]
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(url, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        if (res.statusCode && res.statusCode >= 400) {
          reject(new Error(`Request failed: ${res.statusCode} ${res.statusMessage || ''}`.trim()))
          return
        }
        try {
          resolve(JSON.parse(data))
        }
        catch (error) {
          reject(error)
        }
      })
    })
    request.setTimeout(BLOG_API_TIMEOUT_MS, () => {
      request.destroy(new Error(`Request timed out after ${BLOG_API_TIMEOUT_MS}ms: ${url}`))
    })
    request.on('error', reject)
  })
}

function withQuery(input, params) {
  const url = new URL(input)
  for (const [key, value] of Object.entries(params))
    url.searchParams.set(key, String(value))
  return url.toString()
}

async function mapLimit(items, limit, fn) {
  if (!Number.isInteger(limit) || limit < 1)
    throw new Error(`BLOG_DETAIL_CONCURRENCY must be a positive integer; received "${limit}".`)

  const output = Array.from({ length: items.length })
  let cursor = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++
      output[index] = await fn(items[index], index)
    }
  })
  await Promise.all(workers)
  return output
}

async function fetchAllBlogs() {
  const endpoints = [BLOG_API_URL, BLOG_API_FALLBACK_URL]
  const allBlogs = []

  for (const endpoint of endpoints) {
    allBlogs.length = 0
    let page = 1
    let totalPages = 1

    try {
      do {
        const url = withQuery(endpoint, { page, limit: BLOG_API_LIMIT })
        const response = await fetchJson(url)
        const blogs = Array.isArray(response?.blogs) ? response.blogs : []
        allBlogs.push(...blogs)

        const pagination = response?.pagination || {}
        totalPages = Number.parseInt(pagination.totalPages || totalPages, 10)
        if (pagination.hasNextPage === false) {
          break
        }
        page += 1
      } while (page <= totalPages)

      return allBlogs
    }
    catch (error) {
      if (endpoint === endpoints[endpoints.length - 1])
        throw error
    }
  }

  return allBlogs
}

function assertSafeBlogSlug(slug) {
  if (!/^[a-z0-9~-]+$/i.test(slug)) {
    throw new Error(
      `Unsafe blog route_id "${slug}". Blog slugs must contain only ASCII letters, numbers, hyphens, or tildes. `
      + 'Fix the CMS slug before deploying so sitemap URLs, Nuxt routes, and Vercel redirects cannot diverge.',
    )
  }
}

function uniqueByLoc(entries) {
  const seen = new Set()
  return entries.filter((item) => {
    if (!item.loc || seen.has(item.loc)) {
      return false
    }
    seen.add(item.loc)
    return true
  })
}

async function getBlogEntriesFromApi(blogs) {
  const entries = blogs
    .map((blog) => {
      const slugValue = blog?.route_id || blog?.id
      const slug = String(slugValue || '').trim()
      if (!slug) {
        return null
      }
      assertSafeBlogSlug(slug)
      return {
        blog,
        slug,
        loc: `/blog/${slug}`,
        lastmod: blog?.updated_at || blog?.created_at || undefined,
      }
    })
    .filter(Boolean)

  const locs = new Set()
  for (const entry of entries) {
    if (locs.has(entry.loc))
      throw new Error(`Duplicate blog route detected: ${entry.loc}`)
    locs.add(entry.loc)
  }

  // The current /api/blog/slugs response does not expose has_zh_content.
  // Query each zh detail record and inspect the actual Chinese body so the
  // indexability decision cannot silently diverge from content availability.
  return mapLimit(entries, BLOG_DETAIL_CONCURRENCY, async (entry) => {
    if (typeof entry.blog?.has_zh_content === 'boolean') {
      return {
        loc: entry.loc,
        lastmod: entry.lastmod,
        hasZhContent: entry.blog.has_zh_content,
        signalSource: 'flag',
      }
    }

    const detailUrl = withQuery(BLOG_DETAIL_API_URL, {
      route_id: entry.slug,
      lang: 'zh',
    })
    const detail = await fetchJson(detailUrl)
    if (!detail || typeof detail !== 'object' || !Object.prototype.hasOwnProperty.call(detail, 'content')) {
      throw new Error(`Chinese detail API did not return a content field for ${entry.loc}`)
    }
    if (String(detail.route_id || '') !== entry.slug) {
      throw new Error(`Chinese detail API route mismatch for ${entry.loc}: received "${detail.route_id || ''}"`)
    }

    return {
      loc: entry.loc,
      lastmod: entry.lastmod,
      hasZhContent: Boolean(String(detail.content || '').trim()),
      signalSource: 'zh-detail-content',
    }
  })
}

function formatLastmod(value, nowIsoDate) {
  if (!value) {
    return nowIsoDate
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return nowIsoDate
  }
  return date.toISOString().slice(0, 10)
}

function buildLocaleEntries(locale, blogEntries, nowIsoDate) {
  const localize = locale === 'zh' ? toZhPath : loc => loc
  const pageEntries = STATIC_PAGES.map(page => ({
    loc: localize(page.loc),
    priority: page.priority,
    changefreq: 'weekly',
    lastmod: nowIsoDate,
  }))
  // For zh sitemap, only include blog posts that have Chinese content.
  // Posts with hasZhContent === false have an empty Chinese body (placeholder)
  // and should be excluded so Google does not see them as indexable content.
  const filteredBlogEntries = locale === 'zh'
    ? blogEntries.filter(b => b.hasZhContent !== false)
    : blogEntries
  const blogLocaleEntries = filteredBlogEntries.map(blog => ({
    loc: localize(blog.loc),
    priority: 0.6,
    changefreq: 'daily',
    lastmod: formatLastmod(blog.lastmod, nowIsoDate),
    // Drives hreflang: omit the zh-CN alternate when the Chinese body is empty.
    includeZhAlternate: blog.hasZhContent !== false,
  }))
  return {
    pages: uniqueByLoc(pageEntries),
    blog: uniqueByLoc(blogLocaleEntries),
  }
}

function buildAiEntries(nowIsoDate) {
  return uniqueByLoc(AI_MACHINE_READABLE_FILES.map(loc => ({
    loc,
    priority: 0.4,
    changefreq: 'weekly',
    lastmod: nowIsoDate,
    alternates: false,
  })))
}

function createUrlNode(entry) {
  const alternateLinks = entry.alternates === false
    ? []
    : createAlternateLinks(entry.loc, entry.includeZhAlternate !== false)
  const lines = [
    '  <url>',
    `    <loc>${escapeXml(toAbsoluteUrl(entry.loc))}</loc>`,
    ...alternateLinks.map(alternate =>
      `    <xhtml:link rel="alternate" hreflang="${escapeXml(alternate.hreflang)}" href="${escapeXml(alternate.href)}" />`,
    ),
    `    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`,
    `    <changefreq>${escapeXml(entry.changefreq)}</changefreq>`,
    `    <priority>${entry.priority.toFixed(1)}</priority>`,
    '  </url>',
  ]
  return lines.join('\n')
}

function createUrlSetXml(localeEntries) {
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    '  <!-- Pages -->',
    ...localeEntries.pages.map(createUrlNode),
    '  <!-- Blog -->',
    ...localeEntries.blog.map(createUrlNode),
    '</urlset>',
  ]
  return `${xmlLines.join('\n')}\n`
}

function createAiUrlSetXml(aiEntries) {
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    '  <!-- AI and machine-readable files -->',
    ...aiEntries.map(createUrlNode),
    '</urlset>',
  ]
  return `${xmlLines.join('\n')}\n`
}

function createIndexXml() {
  const now = new Date().toISOString().slice(0, 10)
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <sitemap>',
    `    <loc>${escapeXml(toAbsoluteUrl('/sitemap-en.xml'))}</loc>`,
    `    <lastmod>${escapeXml(now)}</lastmod>`,
    '  </sitemap>',
    '  <sitemap>',
    `    <loc>${escapeXml(toAbsoluteUrl('/sitemap-zh.xml'))}</loc>`,
    `    <lastmod>${escapeXml(now)}</lastmod>`,
    '  </sitemap>',
    '  <sitemap>',
    `    <loc>${escapeXml(toAbsoluteUrl('/sitemap-ai.xml'))}</loc>`,
    `    <lastmod>${escapeXml(now)}</lastmod>`,
    '  </sitemap>',
    '</sitemapindex>',
  ]
  return `${xmlLines.join('\n')}\n`
}

/**
 * Write data/zh-missing-blogs.json describing which /zh/blog/* URLs have no
 * Chinese body content. Consumed by scripts/sync-vercel-zh-redirects.cjs to
 * generate temporary redirects and by scripts/verify-zh-seo.cjs to verify a deploy.
 *
 * `signalReliable` is false when the blog API could not be reached, in which
 * case hasZhContent is unknown. Downstream consumers must refuse to generate
 * redirects in that case rather than risk redirecting healthy pages.
 */
function writeZhMissingManifest(blogEntries, signalReliable) {
  const routes = signalReliable
    ? blogEntries.filter(b => b.hasZhContent === false).map(b => toZhPath(b.loc)).sort()
    : []

  const manifest = {
    generatedAt: new Date().toISOString(),
    signalReliable,
    signal: blogEntries.every(b => b.signalSource === 'flag')
      ? 'has_zh_content flag from /api/blog/slugs (authoritative)'
      : blogEntries.every(b => b.signalSource === 'zh-detail-content')
        ? 'Chinese detail content field from /api/blog?route_id=...&lang=zh (authoritative)'
        : 'mixed authoritative has_zh_content flag and Chinese detail content checks',
    totalBlogPosts: blogEntries.length,
    zhMissingCount: routes.length,
    routes,
  }
  fs.writeFileSync(ZH_MISSING_OUTPUT_PATH, `${JSON.stringify(manifest, null, 2)}\n`, 'utf8')

  if (!signalReliable)
    console.warn('Sitemap XML: WARNING blog API unavailable, zh-missing manifest written empty. No temporary redirects will be generated.')
  else
    console.warn(`Sitemap XML: ${routes.length} of ${blogEntries.length} blog posts have no Chinese content.`)
}

async function run() {
  const nowIsoDate = new Date().toISOString().slice(0, 10)
  let blogEntries = []
  const signalReliable = true

  try {
    const blogs = await fetchAllBlogs()
    if (!blogs.length)
      throw new Error('Blog API returned zero posts; refusing to publish empty blog sitemaps.')
    blogEntries = await getBlogEntriesFromApi(blogs)
    console.warn(`Sitemap XML: fetched ${blogEntries.length} blog items from API.`)
  }
  catch (error) {
    console.error('Sitemap XML: authoritative blog content check failed.', error?.message || error)
    console.error('Sitemap XML: refusing to overwrite indexability signals with stale fallback data.')
    throw error
  }

  writeZhMissingManifest(blogEntries, signalReliable)

  const enEntries = buildLocaleEntries('en', blogEntries, nowIsoDate)
  const zhEntries = buildLocaleEntries('zh', blogEntries, nowIsoDate)
  const aiEntries = buildAiEntries(nowIsoDate)

  fs.writeFileSync(OUTPUT_EN_PATH, createUrlSetXml(enEntries), 'utf8')
  fs.writeFileSync(OUTPUT_ZH_PATH, createUrlSetXml(zhEntries), 'utf8')
  fs.writeFileSync(OUTPUT_AI_PATH, createAiUrlSetXml(aiEntries), 'utf8')
  fs.writeFileSync(OUTPUT_INDEX_PATH, createIndexXml(), 'utf8')

  console.warn(`Sitemap XML generated:
- ${OUTPUT_INDEX_PATH}
- ${OUTPUT_EN_PATH}
- ${OUTPUT_ZH_PATH}
- ${OUTPUT_AI_PATH}`)
}

run().catch((error) => {
  console.error('Failed to generate XML sitemaps:', error)
  process.exit(1)
})

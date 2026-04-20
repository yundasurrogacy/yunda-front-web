const fs = require('node:fs')
const https = require('node:https')
const path = require('node:path')
const process = require('node:process')

const SITE_URL = (process.env.SITE_URL || 'https://www.yundasurrogacy.com').replace(/\/+$/, '')
const BLOG_API_URL = process.env.BLOG_API_URL || 'https://yunda-admin-system.yundasurrogacy.com/api/blog'
const BLOG_API_LIMIT = Number.parseInt(process.env.BLOG_API_LIMIT || '200', 10)

const OUTPUT_INDEX_PATH = path.join(process.cwd(), 'public', 'sitemap.xml')
const OUTPUT_EN_PATH = path.join(process.cwd(), 'public', 'sitemap-en.xml')
const OUTPUT_ZH_PATH = path.join(process.cwd(), 'public', 'sitemap-zh.xml')
const HTML_SITEMAP_DATA_PATH = path.join(process.cwd(), 'data', 'sitemap-data.json')

const STATIC_PAGES = [
  { loc: '/', priority: 1 },
  { loc: '/about', priority: 0.9 },
  { loc: '/be-parents', priority: 0.9 },
  { loc: '/be-surrogate', priority: 0.9 },
  { loc: '/surrogate-requirements', priority: 0.8 },
  { loc: '/surrogate-process', priority: 0.8 },
  { loc: '/surrogate-compensation', priority: 0.8 },
  { loc: '/become-a-surrogate', priority: 0.8 },
  { loc: '/become-surrogate-california', priority: 0.8 },
  { loc: '/blog', priority: 0.7 },
  { loc: '/be-surrogate/success', priority: 0.7 },
  { loc: '/egg-donation', priority: 0.7 },
  { loc: '/partner-ivf-clinics', priority: 0.7 },
  { loc: '/single-parents-lgbtq', priority: 0.7 },
  { loc: '/surrogacy-cost', priority: 0.8 },
  { loc: '/surrogacy-process', priority: 0.8 },
  { loc: '/california-surrogacy-consultation', priority: 0.7 },
  { loc: '/surrogacy-protection-california', priority: 0.7 },
  { loc: '/benefit', priority: 0.7 },
  { loc: '/eligibility', priority: 0.7 },
  { loc: '/journey', priority: 0.7 },
  { loc: '/referral', priority: 0.7 },
  { loc: '/screening', priority: 0.7 },
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

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
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
      .on('error', reject)
  })
}

async function fetchAllBlogs() {
  const allBlogs = []
  let page = 1
  let totalPages = 1

  do {
    const url = `${BLOG_API_URL}?page=${page}&limit=${BLOG_API_LIMIT}`
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

function normalizeBlogPath(input) {
  if (typeof input !== 'string') {
    return ''
  }
  const value = input.trim()
  if (!value) {
    return ''
  }
  if (value.startsWith('/blog/')) {
    return value
  }
  if (value.startsWith('blog/')) {
    return `/${value}`
  }
  return ''
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

function getBlogEntriesFromApi(blogs) {
  const entries = blogs
    .map((blog) => {
      const slugValue = blog?.route_id || blog?.id
      const slug = String(slugValue || '').trim()
      if (!slug) {
        return null
      }
      return {
        loc: `/blog/${slug}`,
        lastmod: blog?.updated_at || blog?.created_at || undefined,
      }
    })
    .filter(Boolean)
  return uniqueByLoc(entries)
}

function getBlogEntriesFromFallback() {
  if (!fs.existsSync(HTML_SITEMAP_DATA_PATH)) {
    return []
  }
  try {
    const raw = fs.readFileSync(HTML_SITEMAP_DATA_PATH, 'utf8')
    const data = JSON.parse(raw)
    const enSections = Array.isArray(data?.sections?.en) ? data.sections.en : []
    const blogSection = enSections.find(section => section?.title === 'Blog')
    const blogLinks = Array.isArray(blogSection?.links) ? blogSection.links : []
    const entries = blogLinks
      .map(link => normalizeBlogPath(link?.href))
      .filter(Boolean)
      .map(loc => ({ loc }))
    return uniqueByLoc(entries)
  }
  catch (error) {
    console.error('Failed to load fallback blog entries from data/sitemap-data.json:', error)
    return []
  }
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
  const blogLocaleEntries = blogEntries.map(blog => ({
    loc: localize(blog.loc),
    priority: 0.6,
    changefreq: 'daily',
    lastmod: formatLastmod(blog.lastmod, nowIsoDate),
  }))
  return {
    pages: uniqueByLoc(pageEntries),
    blog: uniqueByLoc(blogLocaleEntries),
  }
}

function createUrlNode(entry) {
  const lines = [
    '  <url>',
    `    <loc>${escapeXml(toAbsoluteUrl(entry.loc))}</loc>`,
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
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <!-- Pages -->',
    ...localeEntries.pages.map(createUrlNode),
    '  <!-- Blog -->',
    ...localeEntries.blog.map(createUrlNode),
    '</urlset>',
  ]
  return `${xmlLines.join('\n')}\n`
}

function createIndexXml() {
  const now = new Date().toISOString().slice(0, 10)
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '  <sitemap>',
    `    <loc>${escapeXml(toAbsoluteUrl('/sitemap-en.xml'))}</loc>`,
    `    <lastmod>${escapeXml(now)}</lastmod>`,
    '  </sitemap>',
    '  <sitemap>',
    `    <loc>${escapeXml(toAbsoluteUrl('/sitemap-zh.xml'))}</loc>`,
    `    <lastmod>${escapeXml(now)}</lastmod>`,
    '  </sitemap>',
    '</sitemapindex>',
  ]
  return `${xmlLines.join('\n')}\n`
}

async function run() {
  const nowIsoDate = new Date().toISOString().slice(0, 10)
  let blogEntries = []

  try {
    const blogs = await fetchAllBlogs()
    blogEntries = getBlogEntriesFromApi(blogs)
    console.warn(`Sitemap XML: fetched ${blogEntries.length} blog items from API.`)
  }
  catch (error) {
    console.error('Sitemap XML: failed to fetch blog API, fallback to data/sitemap-data.json.', error?.message || error)
    blogEntries = getBlogEntriesFromFallback()
    console.warn(`Sitemap XML: loaded ${blogEntries.length} blog items from fallback data.`)
  }

  const enEntries = buildLocaleEntries('en', blogEntries, nowIsoDate)
  const zhEntries = buildLocaleEntries('zh', blogEntries, nowIsoDate)

  fs.writeFileSync(OUTPUT_EN_PATH, createUrlSetXml(enEntries), 'utf8')
  fs.writeFileSync(OUTPUT_ZH_PATH, createUrlSetXml(zhEntries), 'utf8')
  fs.writeFileSync(OUTPUT_INDEX_PATH, createIndexXml(), 'utf8')

  console.warn(`Sitemap XML generated:
- ${OUTPUT_INDEX_PATH}
- ${OUTPUT_EN_PATH}
- ${OUTPUT_ZH_PATH}`)
}

run().catch((error) => {
  console.error('Failed to generate XML sitemaps:', error)
  process.exit(1)
})

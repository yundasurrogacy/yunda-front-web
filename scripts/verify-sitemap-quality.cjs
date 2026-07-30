const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const ROOT = process.cwd()
const SITE_URL = 'https://www.yundasurrogacy.com'
const sitemapPaths = [
  'public/sitemap.xml',
  'public/sitemap-en.xml',
  'public/sitemap-zh.xml',
  'public/sitemap-ai.xml',
]

function read(relativePath) {
  const absolutePath = path.join(ROOT, relativePath)
  if (!fs.existsSync(absolutePath))
    throw new Error(`Missing sitemap file: ${relativePath}`)
  return fs.readFileSync(absolutePath, 'utf8')
}

function toZhPath(loc) {
  return loc === '/' ? '/zh' : `/zh${loc}`
}

function findUrlBlock(xml, loc) {
  const absoluteUrl = new URL(loc, `${SITE_URL}/`).toString()
  const block = (xml.match(/<url>[\s\S]*?<\/url>/g) || [])
    .find(entry => entry.includes(`<loc>${absoluteUrl}</loc>`))
  if (!block)
    throw new Error(`Sitemap entry not found for ${absoluteUrl}`)
  return block
}

const xmlByPath = Object.fromEntries(sitemapPaths.map(relativePath => [relativePath, read(relativePath)]))
const combinedXml = Object.values(xmlByPath).join('\n')

if (/<changefreq>/i.test(combinedXml))
  throw new Error('Sitemaps must not emit mechanical changefreq values.')

if (/\b(?:undefined|null|Invalid Date)\b/.test(combinedXml))
  throw new Error('Sitemaps contain an invalid generated value.')

for (const match of combinedXml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(match[1]))
    throw new Error(`Invalid lastmod value: ${match[1]}`)
}

const seoRoutes = JSON.parse(read('data/seo-routes.json'))
const enXml = xmlByPath['public/sitemap-en.xml']
const zhXml = xmlByPath['public/sitemap-zh.xml']

for (const page of seoRoutes.staticPages || []) {
  const sourceLastmod = page.lastmod || page.updated_at || page.updatedAt
  for (const [xml, loc] of [[enXml, page.loc], [zhXml, toZhPath(page.loc)]]) {
    const block = findUrlBlock(xml, loc)
    if (!sourceLastmod && /<lastmod>/.test(block)) {
      throw new Error(`Static page ${loc} received a lastmod without a durable content date.`)
    }
  }
}

if (/<lastmod>/.test(xmlByPath['public/sitemap-ai.xml']))
  throw new Error('Machine-readable files must not use build time as lastmod.')

console.warn('Sitemap quality verification passed: no changefreq, valid dates, and no build-time lastmod fallback.')

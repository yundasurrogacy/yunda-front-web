const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const root = process.cwd()
const failures = []

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), 'utf8')
}

function assert(condition, message) {
  if (!condition)
    failures.push(message)
}

const intentMap = JSON.parse(read('data/seo-commercial-intent-map.json'))
const seoRoutes = JSON.parse(read('data/seo-routes.json'))
const vercel = JSON.parse(read('vercel.json'))

const assignments = Object.entries(intentMap.assignments || {})
assert(assignments.length >= 13, 'Commercial intent map must include the initial 13 supporting blogs.')
assert(
  assignments.every(([, assignment]) =>
    ['/surrogacy-cost', '/benefit', '/surrogate-compensation'].includes(assignment.primaryUrl),
  ),
  'Every mapped blog must point to an approved primary commercial URL.',
)

const staticPaths = new Set(seoRoutes.staticPages.map(page => page.loc))
assert(staticPaths.has('/benefit'), '/benefit must remain in static sitemap routes.')
assert(staticPaths.has('/surrogate-compensation'), '/surrogate-compensation must remain in static sitemap routes.')
assert(
  seoRoutes.staticPages.find(page => page.loc === '/benefit')?.priority === 0.9,
  '/benefit sitemap priority must be 0.9.',
)
assert(
  seoRoutes.staticPages.find(page => page.loc === '/surrogate-compensation')?.priority === 0.7,
  '/surrogate-compensation sitemap priority must be 0.7.',
)
assert(
  !vercel.redirects.some(item => item.source === '/benefit' || item.source === '/zh/benefit'),
  'Benefit pages must not be redirected.',
)

const sitemapIndex = read('public/sitemap.xml')
assert(
  sitemapIndex.includes('<loc>https://www.yundasurrogacy.com/sitemap-en.xml</loc>'),
  'public/sitemap.xml is missing the English child sitemap.',
)
assert(
  sitemapIndex.includes('<loc>https://www.yundasurrogacy.com/sitemap-zh.xml</loc>'),
  'public/sitemap.xml is missing the Chinese child sitemap.',
)

for (const sitemapPath of ['public/sitemap-en.xml', 'public/sitemap-zh.xml']) {
  const sitemap = read(sitemapPath)
  const isZhSitemap = sitemapPath.endsWith('sitemap-zh.xml')
  const expectedLoc = isZhSitemap
    ? '<loc>https://www.yundasurrogacy.com/zh/benefit</loc>'
    : '<loc>https://www.yundasurrogacy.com/benefit</loc>'
  assert(sitemap.includes(expectedLoc), `${sitemapPath} is missing its benefit URL.`)
}

const htmlSitemap = JSON.parse(read('data/sitemap-data.json'))
const htmlSitemapLinks = Object.values(htmlSitemap.sections || {})
  .flatMap(sections => sections)
  .flatMap(section => section.links || [])
assert(
  htmlSitemapLinks.some(link => link.href === '/benefit'),
  'HTML sitemap data is missing /benefit.',
)

const mainBenefitLinkFiles = [
  'components/base/AppFooter.vue',
  'components/base/SideMenu.vue',
  'components/be-surrogate/BeSurrogateApplyView.vue',
  'pages/be-surrogate/index.vue',
  'pages/surrogates.vue',
  'pages/(surrogacy)/journey.vue',
  'pages/(surrogacy)/referral.vue',
  'scripts/generate-html-sitemap.cjs',
]
for (const relativePath of mainBenefitLinkFiles) {
  assert(/['"]\/benefit['"]/.test(read(relativePath)), `${relativePath} must link to /benefit.`)
}

const outputRoot = path.join(root, '.output', 'public')
if (fs.existsSync(outputRoot)) {
  assert(fs.existsSync(path.join(outputRoot, 'benefit', 'index.html')), 'Missing prerendered /benefit.')
  assert(fs.existsSync(path.join(outputRoot, 'zh', 'benefit', 'index.html')), 'Missing prerendered /zh/benefit.')
  for (const [slug, assignment] of assignments) {
    const htmlPath = path.join(outputRoot, 'blog', slug, 'index.html')
    assert(fs.existsSync(htmlPath), `Missing prerendered mapped blog: /blog/${slug}`)
    if (!fs.existsSync(htmlPath))
      continue

    const html = fs.readFileSync(htmlPath, 'utf8')
    assert(html.includes('data-seo-commercial-intent'), `/blog/${slug} is missing the commercial-intent guide block.`)
    assert(html.includes(`href="${assignment.primaryUrl}"`), `/blog/${slug} does not link to ${assignment.primaryUrl}.`)
  }
}

if (failures.length) {
  console.error('Commercial cannibalization verification failed:')
  for (const failure of failures)
    console.error(`- ${failure}`)
  process.exit(1)
}

console.log(`Commercial cannibalization verification passed (${assignments.length} mapped blogs).`)

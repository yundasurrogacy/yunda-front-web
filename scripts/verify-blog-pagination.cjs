const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const OUTPUT_DIR = path.join(process.cwd(), '.output', 'public')

function readRoute(routePath) {
  const relativePath = routePath === '/'
    ? 'index.html'
    : path.join(routePath.replace(/^\/+|\/+$/g, ''), 'index.html')
  const absolutePath = path.join(OUTPUT_DIR, relativePath)
  if (!fs.existsSync(absolutePath))
    throw new Error(`Missing prerendered pagination route: ${routePath}`)
  return fs.readFileSync(absolutePath, 'utf8')
}

function assertIncludes(html, expected, routePath) {
  if (!html.includes(expected))
    throw new Error(`${routePath} is missing ${expected}`)
}

const checks = [
  {
    route: '/blog',
    canonical: 'https://www.yundasurrogacy.com/blog',
    link: 'href="/blog/page/2"',
  },
  {
    route: '/blog/page/2',
    canonical: 'https://www.yundasurrogacy.com/blog/page/2',
    link: 'href="/blog/page/3"',
  },
  {
    route: '/zh/blog',
    canonical: 'https://www.yundasurrogacy.com/zh/blog',
    link: 'href="/zh/blog/page/2"',
  },
  {
    route: '/zh/blog/page/2',
    canonical: 'https://www.yundasurrogacy.com/zh/blog/page/2',
    link: 'href="/zh/blog/page/3"',
  },
]

for (const check of checks) {
  const html = readRoute(check.route)
  assertIncludes(html, `rel="canonical" href="${check.canonical}"`, check.route)
  assertIncludes(html, check.link, check.route)
}

console.warn('Blog pagination verification passed: canonical deep routes and crawlable anchors are prerendered.')

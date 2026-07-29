const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const API_BASE = (process.env.BLOG_API_BASE || 'https://yunda-admin-system.yundasurrogacy.com').replace(/\/$/, '')
const intentMap = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data/seo-commercial-intent-map.json'), 'utf8'))
const slugs = Object.keys(intentMap.assignments || {})
const outputPath = path.resolve(
  process.argv[2]
  || 'seo-project/05-content/source-snapshots/2026-07-29-commercial-blogs-before.json',
)

async function fetchBlog(slug) {
  const url = `${API_BASE}/api/blog?route_id=${encodeURIComponent(slug)}`
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    },
  })
  if (!response.ok)
    throw new Error(`${slug}: GET ${response.status}`)

  const blog = await response.json()
  if (!blog?.id || blog.route_id !== slug)
    throw new Error(`${slug}: unexpected API response`)

  return blog
}

async function main() {
  const blogs = []
  for (const slug of slugs)
    blogs.push(await fetchBlog(slug))

  const snapshot = {
    snapshot_type: 'commercial-blog-content-before-update',
    collected_at: new Date().toISOString(),
    source: `${API_BASE}/api/blog`,
    count: blogs.length,
    blogs,
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`)
  console.log(`Saved ${blogs.length} blogs to ${outputPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

/* eslint-disable no-console */
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const SITE_URL = process.env.SITE_URL || 'https://www.yundasurrogacy.com'
const HOST = new URL(SITE_URL).host
const INDEXNOW_KEY = process.env.INDEXNOW_KEY || 'rhc3yhen5dk1ddb7znk9fptq757jw9dh'
const KEY_LOCATION = `${SITE_URL.replace(/\/$/, '')}/${INDEXNOW_KEY}.txt`
const ENDPOINT = process.env.INDEXNOW_ENDPOINT || 'https://api.indexnow.org/indexnow'
const BATCH_SIZE = Number(process.env.INDEXNOW_BATCH_SIZE || 100)
const DRY_RUN = process.env.INDEXNOW_DRY_RUN === '1' || process.argv.includes('--dry-run')

function readUrlsFromSitemap(filePath) {
  const xml = fs.readFileSync(filePath, 'utf8')
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map(match => match[1].trim())
    .filter(url => url.startsWith(SITE_URL))
}

function collectUrls() {
  const sitemapFiles = [
    'public/sitemap-en.xml',
    'public/sitemap-zh.xml',
  ]

  return Array.from(new Set(sitemapFiles.flatMap((file) => {
    const absolutePath = path.resolve(file)
    return fs.existsSync(absolutePath) ? readUrlsFromSitemap(absolutePath) : []
  })))
}

async function submitBatch(urlList) {
  const response = await fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'content-type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  })

  const text = await response.text()
  if (!response.ok) {
    throw new Error(`IndexNow ${response.status}: ${text}`)
  }

  return { status: response.status, text }
}

async function main() {
  const urls = collectUrls()
  if (!urls.length) {
    throw new Error('No sitemap URLs found for IndexNow submission.')
  }

  if (DRY_RUN) {
    console.log(`IndexNow dry run for ${HOST}`)
    console.log(`Key location: ${KEY_LOCATION}`)
    console.log(`URLs: ${urls.length}`)
    console.log(`Batches: ${Math.ceil(urls.length / BATCH_SIZE)}`)
    urls.slice(0, 10).forEach(url => console.log(url))
    return
  }

  console.log(`Submitting ${urls.length} URLs to IndexNow for ${HOST}`)
  for (let index = 0; index < urls.length; index += BATCH_SIZE) {
    const batch = urls.slice(index, index + BATCH_SIZE)
    const result = await submitBatch(batch)
    console.log(`Submitted ${index + 1}-${index + batch.length}: HTTP ${result.status}`)
  }
}

main().catch((error) => {
  console.error(error.message)
  process.exit(1)
})

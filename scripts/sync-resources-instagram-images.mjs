#!/usr/bin/env node
/**
 * 同步 Resources 页 Instagram 封面。
 * Instagram `/media/?size=l` 常超时，优先走 embed 页里的 EmbeddedMediaImage。
 * 用法：node scripts/sync-resources-instagram-images.mjs
 */
import { writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public/images/pages/resources')
const ua = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'

/** @type {Array<[string, string, 'p' | 'reel']>} */
const posts = [
  ['instagram-update-01.jpg', 'DdXw7XeH0fR', 'p'],
  ['instagram-update-02.jpg', 'DdVO8ZOn4OO', 'p'],
  ['instagram-update-03.jpg', 'Dck_HL7n3bl', 'p'],
  ['instagram-update-04.jpg', 'Db5AzZ-H7I4', 'p'],
  ['instagram-event-01.jpg', 'Dd3LC0AzLEt', 'reel'],
  ['instagram-event-02.jpg', 'Ddwee_8kkBP', 'p'],
  ['instagram-event-03.jpg', 'Ddie2t3Hx3d', 'p'],
  ['instagram-event-04.jpg', 'DcKh1O2HyCn', 'p'],
]

function extractMediaUrl(html) {
  const match = html.match(/class="EmbeddedMediaImage"[^>]*src="([^"]+)"/)
    || html.match(/src="(https:[^"]+\.jpg[^"]*)"[^>]*class="EmbeddedMediaImage"/)
  if (!match)
    return null
  return match[1]
    .replace(/&amp;/g, '&')
    .replace(/\\u0026/g, '&')
}

for (const [filename, shortcode, kind] of posts) {
  const embedUrl = `https://www.instagram.com/${kind}/${shortcode}/embed/captioned/`
  try {
    const embedRes = await fetch(embedUrl, {
      headers: { 'User-Agent': ua },
      redirect: 'follow',
    })
    if (!embedRes.ok) {
      console.error(`FAIL ${filename}: embed HTTP ${embedRes.status}`)
      continue
    }
    const html = await embedRes.text()
    const mediaUrl = extractMediaUrl(html)
    if (!mediaUrl) {
      console.error(`FAIL ${filename}: no EmbeddedMediaImage in embed`)
      continue
    }
    const mediaRes = await fetch(mediaUrl, {
      headers: { 'User-Agent': ua, Referer: 'https://www.instagram.com/' },
      redirect: 'follow',
    })
    if (!mediaRes.ok) {
      console.error(`FAIL ${filename}: media HTTP ${mediaRes.status}`)
      continue
    }
    const buf = Buffer.from(await mediaRes.arrayBuffer())
    await writeFile(join(outDir, filename), buf)
    console.log(`OK ${filename} (${buf.length} bytes)`)
  }
  catch (error) {
    console.error(`FAIL ${filename}:`, error instanceof Error ? error.message : error)
  }
}

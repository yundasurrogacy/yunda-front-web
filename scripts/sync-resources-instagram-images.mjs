#!/usr/bin/env node
/**
 * 从 Instagram `/p/{shortcode}/media/?size=l` 同步 Resources 页 8 张封面原图。
 * 用法：node scripts/sync-resources-instagram-images.mjs
 */
import { createWriteStream } from 'node:fs'
import { mkdir } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { pipeline } from 'node:stream/promises'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const outDir = join(root, 'public/images/pages/resources')

const posts = [
  ['instagram-update-01.jpg', 'DYdqwe7FCMw'],
  ['instagram-update-02.jpg', 'DYDslbgH5nG'],
  ['instagram-update-03.jpg', 'DX61gSODn4H'],
  ['instagram-update-04.jpg', 'DWz-B57ASED'],
  ['instagram-event-01.jpg', 'DYWFOI5lGRC'],
  ['instagram-event-02.jpg', 'DXrY2MCDDtR'],
  ['instagram-event-03.jpg', 'DXYIj9BgTZo'],
  ['instagram-event-04.jpg', 'DWpqnN4Ex3v'],
]

await mkdir(outDir, { recursive: true })

for (const [filename, shortcode] of posts) {
  const endpoint = `https://www.instagram.com/p/${shortcode}/media/?size=l`
  const response = await fetch(endpoint, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    },
    redirect: 'follow',
  })

  if (!response.ok) {
    console.error(`FAIL ${filename}: HTTP ${response.status}`)
    continue
  }

  const dest = join(outDir, filename)
  await pipeline(response.body, createWriteStream(dest))
  console.log(`OK ${filename} <- ${response.url.slice(0, 80)}...`)
}

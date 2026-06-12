import { readFile } from 'node:fs/promises'
import { join } from 'node:path'
import { extractInstagramShortcode, getInstagramMediaEndpoint } from '../../../../utils/fetch-instagram-thumbnail'
import { RESOURCES_INSTAGRAM_POSTS } from '../../../../../utils/resources-instagram-posts'

const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
} as const

async function readFallbackImage(fallbackImage: string) {
  const filePath = join(process.cwd(), 'public', fallbackImage.replace(/^\//, ''))
  return readFile(filePath)
}

export default defineCachedEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')
  const post = RESOURCES_INSTAGRAM_POSTS.find(item => item.id === id)

  if (!post) {
    throw createError({ statusCode: 404, statusMessage: 'Instagram post not found' })
  }

  const mediaEndpoint = getInstagramMediaEndpoint(post.url)
  const shortcode = extractInstagramShortcode(post.url)

  if (!mediaEndpoint || !shortcode) {
    const buffer = await readFallbackImage(post.fallbackImage)
    setHeader(event, 'content-type', 'image/jpeg')
    setHeader(event, 'cache-control', 'public, max-age=86400')
    return buffer
  }

  try {
    const response = await fetch(mediaEndpoint, {
      headers: FETCH_HEADERS,
      redirect: 'follow',
      signal: AbortSignal.timeout(20_000),
    })

    if (!response.ok) {
      const buffer = await readFallbackImage(post.fallbackImage)
      setHeader(event, 'content-type', 'image/jpeg')
      setHeader(event, 'cache-control', 'public, max-age=86400')
      return buffer
    }

    const buffer = Buffer.from(await response.arrayBuffer())
    setHeader(event, 'content-type', response.headers.get('content-type') || 'image/jpeg')
    setHeader(event, 'cache-control', 'public, max-age=3600')
    return buffer
  }
  catch {
    const buffer = await readFallbackImage(post.fallbackImage)
    setHeader(event, 'content-type', 'image/jpeg')
    setHeader(event, 'cache-control', 'public, max-age=86400')
    return buffer
  }
}, {
  maxAge: 60 * 60,
  name: 'resources-instagram-media-v2',
  swr: true,
})

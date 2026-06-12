const FETCH_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  'Accept': 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
} as const

export function extractInstagramShortcode(postUrl: string) {
  const match = postUrl.match(/instagram\.com\/p\/([^/?#]+)/i)
  return match?.[1] ?? null
}

/** Instagram 公开帖 `/media/?size=l` 会 302 到未裁切的 1080 宽原图 */
export function getInstagramMediaEndpoint(postUrl: string) {
  const shortcode = extractInstagramShortcode(postUrl)
  if (!shortcode)
    return null

  return `https://www.instagram.com/p/${shortcode}/media/?size=l`
}

/**
 * 返回重定向后的 CDN 地址（会过期，仅适合短期缓存）。
 * 页面展示请使用 utils/resources-instagram-posts 中的 fallbackImage 静态资源。
 */
export async function fetchInstagramThumbnail(postUrl: string): Promise<string | null> {
  const mediaEndpoint = getInstagramMediaEndpoint(postUrl)
  if (!mediaEndpoint)
    return null

  try {
    const response = await fetch(mediaEndpoint, {
      headers: FETCH_HEADERS,
      redirect: 'follow',
      signal: AbortSignal.timeout(20_000),
    })

    if (!response.ok)
      return null

    const finalUrl = response.url
    if (finalUrl.includes('cdninstagram.com'))
      return finalUrl

    return null
  }
  catch {
    return null
  }
}

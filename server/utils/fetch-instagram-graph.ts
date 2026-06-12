import { extractInstagramShortcode } from './fetch-instagram-thumbnail'

export interface InstagramGraphMedia {
  id: string
  caption?: string
  media_type?: string
  media_url?: string
  thumbnail_url?: string
  permalink: string
  timestamp?: string
  like_count?: number
  comments_count?: number
}

interface InstagramGraphMediaResponse {
  data?: InstagramGraphMedia[]
}

export async function fetchInstagramGraphMedia(accessToken: string, userId: string) {
  const response = await $fetch<InstagramGraphMediaResponse>(`https://graph.instagram.com/${userId}/media`, {
    query: {
      fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count',
      access_token: accessToken,
      limit: 30,
    },
    timeout: 12_000,
  })

  return response.data ?? []
}

export function indexInstagramGraphMediaByShortcode(items: InstagramGraphMedia[]) {
  const map = new Map<string, InstagramGraphMedia>()

  for (const item of items) {
    const shortcode = extractInstagramShortcode(item.permalink)
    if (shortcode)
      map.set(shortcode, item)
  }

  return map
}

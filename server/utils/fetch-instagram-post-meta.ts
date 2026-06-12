import { extractInstagramShortcode } from './fetch-instagram-thumbnail'

const EMBED_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
  Accept: 'text/html,application/xhtml+xml',
} as const

export interface InstagramEmbedMeta {
  shortcode: string
  likes: number | null
  comments: number | null
}

function unescapeEmbedJson(html: string) {
  return html.replace(/\\"/g, '"').replace(/\\\//g, '/')
}

function parseCount(text: string, patterns: RegExp[]) {
  for (const pattern of patterns) {
    const match = text.match(pattern)
    if (match?.[1])
      return Number.parseInt(match[1], 10)
  }
  return null
}

const LIKE_PATTERNS = [
  /"edge_media_preview_like":\{"count":(\d+)\}/,
  /"edge_liked_by":\{"count":(\d+)\}/,
  /"like_count":(\d+)/,
  /(\d+)\s*(?:likes|次赞)/i,
]

const COMMENT_PATTERNS = [
  /"edge_media_to_comment":\{"count":(\d+)\}/,
  /"edge_media_to_parent_comment":\{"count":(\d+)\}/,
  /"comments_count":(\d+)/,
  /(\d+)\s*(?:comments|条评论)/i,
]

export async function fetchInstagramEmbedMeta(postUrl: string): Promise<InstagramEmbedMeta | null> {
  const shortcode = extractInstagramShortcode(postUrl)
  if (!shortcode)
    return null

  try {
    const embedUrl = `https://www.instagram.com/p/${shortcode}/embed/captioned/`
    const response = await fetch(embedUrl, {
      headers: EMBED_HEADERS,
      redirect: 'follow',
      signal: AbortSignal.timeout(6_000),
    })

    if (!response.ok)
      return null

    const html = unescapeEmbedJson(await response.text())
    const likes = parseCount(html, LIKE_PATTERNS)
    const comments = parseCount(html, COMMENT_PATTERNS)

    return {
      shortcode,
      likes,
      comments: comments ?? (likes != null ? 0 : null),
    }
  }
  catch {
    return null
  }
}

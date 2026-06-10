export interface SubstackFeedPost {
  title: string
  url: string
  image: string | null
  excerpt: string
  publishedAt: string | null
}

export interface SubstackFeedData {
  channelTitle: string
  channelUrl: string
  channelImage: string | null
  posts: SubstackFeedPost[]
}

function decodeXmlEntities(value: string) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/&#8217;/g, '\'')
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8230;/g, '…')
}

function extractTag(block: string, tag: string) {
  const cdata = block.match(new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`, 'i'))
  if (cdata?.[1])
    return decodeXmlEntities(cdata[1].trim())

  const plain = block.match(new RegExp(`<${tag}[^>]*>([^<]*)<\\/${tag}>`, 'i'))
  return plain?.[1] ? decodeXmlEntities(plain[1].trim()) : ''
}

function stripHtml(html: string) {
  return decodeXmlEntities(html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim())
}

function normalizePostUrl(url: string) {
  return url.replace(/\/$/, '').split('?')[0]
}

export function parseSubstackFeed(xml: string): SubstackFeedData {
  const channelBlock = xml.match(/<channel>([\s\S]*?)<item>/i)?.[1] ?? xml

  const channelImage =
    channelBlock.match(/<image>[\s\S]*?<url>([^<]+)<\/url>/i)?.[1]?.trim()
    ?? channelBlock.match(/<itunes:image[^>]+href="([^"]+)"/i)?.[1]?.trim()
    ?? null

  const posts: SubstackFeedPost[] = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/gi
  let match: RegExpExecArray | null

  while ((match = itemRegex.exec(xml)) !== null) {
    const block = match[1]
    const url = extractTag(block, 'link')
    if (!url)
      continue

    const contentHtml = extractTag(block, 'content:encoded') || extractTag(block, 'description')

    const enclosure =
      block.match(/<enclosure[^>]+url="([^"]+)"/i)?.[1]
      ?? block.match(/<media:content[^>]+url="([^"]+)"/i)?.[1]
      ?? contentHtml.match(/<img[^>]+src="([^"]+)"/i)?.[1]
      ?? null

    const description = contentHtml
    const excerpt = stripHtml(description).slice(0, 220)

    posts.push({
      title: extractTag(block, 'title'),
      url: normalizePostUrl(url),
      image: enclosure,
      excerpt,
      publishedAt: extractTag(block, 'pubDate') || null,
    })
  }

  return {
    channelTitle: extractTag(channelBlock, 'title'),
    channelUrl: normalizePostUrl(extractTag(channelBlock, 'link') || 'https://yundasurrogacy.substack.com'),
    channelImage,
    posts,
  }
}

export function findSubstackPost(feed: SubstackFeedData, url: string) {
  const normalized = normalizePostUrl(url)
  return feed.posts.find(post => normalizePostUrl(post.url) === normalized) ?? null
}

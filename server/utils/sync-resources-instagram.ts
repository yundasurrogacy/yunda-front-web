import { extractInstagramShortcode } from './fetch-instagram-thumbnail'
import { fetchInstagramEmbedMeta } from './fetch-instagram-post-meta'
import { fetchInstagramGraphMedia, indexInstagramGraphMediaByShortcode, type InstagramGraphMedia } from './fetch-instagram-graph'
import { RESOURCES_INSTAGRAM_POSTS } from '../../utils/resources-instagram-posts'
import type { ResourcesInstagramPostPreview, ResourcesInstagramResponse } from './resources-instagram-types'

function buildPostPreview(
  post: (typeof RESOURCES_INSTAGRAM_POSTS)[number],
  graphByShortcode: Map<string, InstagramGraphMedia>,
  embedById: Map<string, Awaited<ReturnType<typeof fetchInstagramEmbedMeta>>>,
): ResourcesInstagramPostPreview {
  const shortcode = extractInstagramShortcode(post.url)
  const graphItem = shortcode ? graphByShortcode.get(shortcode) : undefined
  const embedMeta = graphItem ? null : embedById.get(post.id)

  return {
    id: post.id,
    url: graphItem?.permalink ?? post.url,
    image: post.fallbackImage,
    likes: graphItem?.like_count ?? embedMeta?.likes ?? post.fallbackLikes,
    comments: graphItem?.comments_count ?? embedMeta?.comments ?? post.fallbackComments,
    syncedAt: new Date().toISOString(),
  }
}

export async function syncResourcesInstagramPosts(): Promise<ResourcesInstagramResponse> {
  const config = useRuntimeConfig()
  const token = config.instagramAccessToken as string
  const userId = config.instagramUserId as string
  const fetchEmbed = config.instagramFetchEmbed === true || config.instagramFetchEmbed === 'true'

  let graphByShortcode = new Map<string, InstagramGraphMedia>()

  if (token && userId) {
    try {
      const graphItems = await fetchInstagramGraphMedia(token, userId)
      graphByShortcode = indexInstagramGraphMediaByShortcode(graphItems)
    }
    catch (error) {
      console.warn('[instagram-graph] unavailable, falling back to embed metadata:', error)
    }
  }

  const embedById = new Map<string, Awaited<ReturnType<typeof fetchInstagramEmbedMeta>>>()

  if (fetchEmbed && graphByShortcode.size === 0) {
    const embedResults = await Promise.all(
      RESOURCES_INSTAGRAM_POSTS.map(async (post) => {
        const meta = await fetchInstagramEmbedMeta(post.url)
        return [post.id, meta] as const
      }),
    )
    for (const [id, meta] of embedResults)
      embedById.set(id, meta)
  }

  const updates: ResourcesInstagramPostPreview[] = []
  const events: ResourcesInstagramPostPreview[] = []

  for (const post of RESOURCES_INSTAGRAM_POSTS) {
    const preview = buildPostPreview(post, graphByShortcode, embedById)
    if (post.section === 'updates')
      updates.push(preview)
    else
      events.push(preview)
  }

  return {
    updates,
    events,
    source: graphByShortcode.size > 0 ? 'graph' : 'embed',
  }
}

export function getResourcesInstagramFallback(): ResourcesInstagramResponse {
  const updates: ResourcesInstagramPostPreview[] = []
  const events: ResourcesInstagramPostPreview[] = []

  for (const post of RESOURCES_INSTAGRAM_POSTS) {
    const preview = {
      id: post.id,
      url: post.url,
      image: post.fallbackImage,
      likes: post.fallbackLikes,
      comments: post.fallbackComments,
      syncedAt: null,
    }

    if (post.section === 'updates')
      updates.push(preview)
    else
      events.push(preview)
  }

  return {
    updates,
    events,
    source: 'static',
  }
}

import { parseSubstackFeed } from '../utils/parse-substack-feed'
import { RESOURCES_SUBSTACK_FEED_FALLBACK } from '../../utils/resources-substack-posts'

const SUBSTACK_FEED_URL = 'https://yundasurrogacy.substack.com/feed'

export default defineCachedEventHandler(async () => {
  try {
    const xml = await $fetch<string>(SUBSTACK_FEED_URL, {
      headers: {
        'User-Agent': 'YundaSurrogacy/1.0 (+https://yundasurrogacy.com)',
        Accept: 'application/rss+xml, application/xml, text/xml, */*',
      },
      timeout: 8_000,
    })

    const feed = parseSubstackFeed(xml)

    return {
      ...feed,
      channelImage: feed.channelImage ?? RESOURCES_SUBSTACK_FEED_FALLBACK.channelImage,
      posts: feed.posts.map((post) => {
        const fallback = RESOURCES_SUBSTACK_FEED_FALLBACK.posts.find(
          item => item.url.replace(/\/$/, '') === post.url.replace(/\/$/, ''),
        )

        return {
          ...post,
          image: post.image ?? fallback?.image ?? null,
        }
      }),
    }
  }
  catch (error) {
    console.warn('[substack-feed] RSS unavailable, using static fallback:', error)
    return RESOURCES_SUBSTACK_FEED_FALLBACK
  }
}, {
  maxAge: 60 * 60,
  name: 'substack-feed',
  swr: true,
})

import type { SubstackFeedData } from '~/server/utils/parse-substack-feed'

export const SUBSTACK_HOME = 'https://yundasurrogacy.substack.com/'

export interface ResourcesSubstackPost {
  id: string
  kind: 'article' | 'channel'
  url: string
  fallbackImage: string
}

/** 对照 docx：第二屏 Surrogate 101 Substack 三栏卡片 */
export const RESOURCES_SUBSTACK_POSTS: ResourcesSubstackPost[] = [
  {
    id: 's1',
    kind: 'article',
    url: 'https://yundasurrogacy.substack.com/p/yunda-surrogate-101-common-questions',
    fallbackImage: '/images/resources-media/substack-01.jpg',
  },
  {
    id: 's2',
    kind: 'article',
    url: 'https://yundasurrogacy.substack.com/p/yunda-surrogate-101-what-does-it',
    fallbackImage: '/images/resources-media/substack-02.jpg',
  },
  {
    id: 's3',
    kind: 'channel',
    url: SUBSTACK_HOME,
    fallbackImage: '/images/resources-media/substack-channel.jpg',
  },
]

/** RSS 拉取失败时供 /api/substack.posts 与页面回退 */
export const RESOURCES_SUBSTACK_FEED_FALLBACK: SubstackFeedData = {
  channelTitle: 'Yunda\'s Substack',
  channelUrl: SUBSTACK_HOME.replace(/\/$/, ''),
  channelImage: '/images/resources-media/substack-channel.jpg',
  posts: RESOURCES_SUBSTACK_POSTS
    .filter(post => post.kind === 'article')
    .map(post => ({
      title: '',
      url: post.url,
      image: post.fallbackImage,
      excerpt: '',
      publishedAt: null,
    })),
}

export function normalizeSubstackPostUrl(url: string) {
  return url.replace(/\/$/, '').split('?')[0]
}

export function getSubstackFallbackImage(postUrl: string) {
  const normalized = normalizeSubstackPostUrl(postUrl)
  const matched = RESOURCES_SUBSTACK_POSTS.find(
    post => normalizeSubstackPostUrl(post.url) === normalized,
  )
  return matched?.fallbackImage ?? '/images/resources-media/substack-card.png'
}

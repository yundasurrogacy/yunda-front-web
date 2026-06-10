export interface ResourcesInstagramPost {
  id: string
  url: string
  section: 'updates' | 'events'
  /** 从 `/p/{code}/media/?size=l` 导出的 1080×1350 原图（非 og:image 方图裁切） */
  fallbackImage: string
  /** embed / Graph API 不可用时的赞评兜底（可用 scripts/sync-resources-instagram-stats.mjs 更新） */
  fallbackLikes: number
  fallbackComments: number
}

/**
 * 对照 docx：第三屏 Surrogates Updates + 第四屏 Events
 *
 * 服务端 `/api/resources/instagram` 会按这些链接自动同步：
 * - 封面图（经 `/api/resources/instagram/media/:id` 代理）
 * - 点赞 / 评论数（embed 解析；若配置 Graph API 则优先官方数据）
 *
 * 可选环境变量（生产 .env）：
 * - INSTAGRAM_GRAPH_ACCESS_TOKEN
 * - INSTAGRAM_USER_ID
 */
export const RESOURCES_INSTAGRAM_POSTS: ResourcesInstagramPost[] = [
  { id: 'u1', section: 'updates', url: 'https://www.instagram.com/p/DYdqwe7FCMw/?img_index=1', fallbackImage: '/images/resources-media/ig-updates-01.jpg', fallbackLikes: 4, fallbackComments: 0 },
  { id: 'u2', section: 'updates', url: 'https://www.instagram.com/p/DYDslbgH5nG/', fallbackImage: '/images/resources-media/ig-updates-02.jpg', fallbackLikes: 2, fallbackComments: 0 },
  { id: 'u3', section: 'updates', url: 'https://www.instagram.com/p/DX61gSODn4H/?img_index=1', fallbackImage: '/images/resources-media/ig-updates-03.jpg', fallbackLikes: 5, fallbackComments: 0 },
  { id: 'u4', section: 'updates', url: 'https://www.instagram.com/p/DWz-B57ASED/?img_index=1', fallbackImage: '/images/resources-media/ig-updates-04.jpg', fallbackLikes: 7, fallbackComments: 0 },
  { id: 'e1', section: 'events', url: 'https://www.instagram.com/p/DYWFOI5lGRC/?img_index=1', fallbackImage: '/images/resources-media/ig-events-01.jpg', fallbackLikes: 13, fallbackComments: 0 },
  { id: 'e2', section: 'events', url: 'https://www.instagram.com/p/DXrY2MCDDtR/?img_index=1', fallbackImage: '/images/resources-media/ig-events-02.jpg', fallbackLikes: 5, fallbackComments: 0 },
  { id: 'e3', section: 'events', url: 'https://www.instagram.com/p/DXYIj9BgTZo/?img_index=1', fallbackImage: '/images/resources-media/ig-events-03.jpg', fallbackLikes: 10, fallbackComments: 0 },
  { id: 'e4', section: 'events', url: 'https://www.instagram.com/p/DWpqnN4Ex3v/', fallbackImage: '/images/resources-media/ig-events-04.jpg', fallbackLikes: 3, fallbackComments: 0 },
]

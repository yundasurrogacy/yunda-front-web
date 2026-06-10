export interface ResourcesInstagramPostPreview {
  id: string
  url: string
  image: string
  likes: number | null
  comments: number | null
  syncedAt: string | null
}

export interface ResourcesInstagramResponse {
  updates: ResourcesInstagramPostPreview[]
  events: ResourcesInstagramPostPreview[]
  source: 'graph' | 'embed' | 'static'
}

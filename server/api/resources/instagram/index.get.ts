import { getResourcesInstagramFallback, syncResourcesInstagramPosts } from '../../../utils/sync-resources-instagram'

export default defineCachedEventHandler(async () => {
  try {
    return await syncResourcesInstagramPosts()
  }
  catch (error) {
    console.warn('[resources-instagram] sync failed, using static fallback:', error)
    return getResourcesInstagramFallback()
  }
}, {
  maxAge: 60 * 30,
  name: 'resources-instagram-v2',
  swr: true,
})

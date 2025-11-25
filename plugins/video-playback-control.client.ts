export default defineNuxtPlugin(() => {
  if (!import.meta.client)
    return

  const pauseOtherVideos = (event: Event) => {
    const target = event.target
    if (!(target instanceof HTMLVideoElement))
      return

    const videos = document.querySelectorAll<HTMLVideoElement>('video')
    videos.forEach((video) => {
      if (video !== target && !video.paused)
        video.pause()
    })
  }

  document.addEventListener('play', pauseOtherVideos, true)

  window.addEventListener('pagehide', () => {
    document.removeEventListener('play', pauseOtherVideos, true)
  })
})

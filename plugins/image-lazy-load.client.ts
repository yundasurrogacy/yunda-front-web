// 图片懒加载插件 - 为未设置 loading 的图片添加 loading="lazy"
function setLazyIfBelowFold(img: HTMLImageElement) {
  const rect = img.getBoundingClientRect()
  const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
  if (!isInViewport) {
    img.setAttribute('loading', 'lazy')
    img.setAttribute('decoding', 'async')
  }
}

export default defineNuxtPlugin(() => {
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType !== 1)
          continue
        const el = node as Element
        const imgs: HTMLImageElement[] = el.tagName === 'IMG'
          ? (el.hasAttribute('loading') ? [] : [el as HTMLImageElement])
          : Array.from(el.querySelectorAll?.('img:not([loading])') || []) as HTMLImageElement[]
        imgs.forEach(setLazyIfBelowFold)
      }
    }
  })

  const processImages = () => {
    const imgs = document.querySelectorAll<HTMLImageElement>('img:not([loading])')
    imgs.forEach(setLazyIfBelowFold)
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      if ('requestIdleCallback' in window) {
        (window as any).requestIdleCallback(processImages, { timeout: 500 })
      }
      else {
        processImages()
      }
    })
  }
  else if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(processImages, { timeout: 500 })
  }
  else {
    processImages()
  }

  observer.observe(document.body, { childList: true, subtree: true })
})

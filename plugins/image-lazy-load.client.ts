// 图片懒加载插件 - 为所有图片添加 loading="lazy" 属性
export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    // 使用 MutationObserver 监听新添加的图片
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) { // Element node
            const element = node as Element
            // 查找所有没有 loading 属性的 img 标签
            const images = element.querySelectorAll?.('img:not([loading])') || []
            images.forEach((img) => {
              // 跳过首屏关键图片（已在视口内的图片）
              const rect = img.getBoundingClientRect()
              const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
              if (!isInViewport) {
                img.setAttribute('loading', 'lazy')
                img.setAttribute('decoding', 'async')
              }
            })
            // 如果节点本身是 img 标签
            if (element.tagName === 'IMG' && !element.hasAttribute('loading')) {
              const rect = element.getBoundingClientRect()
              const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
              if (!isInViewport) {
                element.setAttribute('loading', 'lazy')
                element.setAttribute('decoding', 'async')
              }
            }
          }
        })
      })
    })

    // 初始处理页面加载时的图片
    const processImages = () => {
      const images = document.querySelectorAll('img:not([loading])')
      images.forEach((img) => {
        const rect = img.getBoundingClientRect()
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0
        // 首屏图片不添加懒加载，其他图片添加懒加载
        if (!isInViewport) {
          img.setAttribute('loading', 'lazy')
          img.setAttribute('decoding', 'async')
        }
      })
    }

    // 页面加载完成后处理
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', processImages)
    }
    else {
      processImages()
    }

    // 监听 DOM 变化
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  }
})

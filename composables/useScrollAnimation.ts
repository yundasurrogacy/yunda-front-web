let observer: IntersectionObserver | null = null
const seen = new WeakSet<Element>()
let pageFinishHooked = false

function ensureObserver() {
  if (observer || !import.meta.client)
    return

  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const target = entry.target
      if (!entry.isIntersecting || seen.has(target))
        return
      target.classList.add('animate-in')
      seen.add(target)
      observer?.unobserve(target)
    })
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15,
  })
}

function observeGroup(selector: string, initClass: string) {
  document.querySelectorAll(selector).forEach((element) => {
    if (element.classList.contains('animate-in') || element.classList.contains(initClass))
      return
    element.classList.add(initClass)
    observer?.observe(element)
  })
}

export function initScrollAnimation() {
  if (!import.meta.client)
    return
  ensureObserver()
  observeGroup('.scroll-animate', 'scroll-animate-init')
  observeGroup('.slide-left', 'slide-left-init')
  observeGroup('.slide-right', 'slide-right-init')
}

export function useScrollAnimation() {
  onMounted(() => {
    setTimeout(() => {
      initScrollAnimation()
    }, 100)
  })

  // 切页后页面是新的 DOM，需要再扫一次。hook 只注册一次。
  if (import.meta.client && !pageFinishHooked) {
    pageFinishHooked = true
    useNuxtApp().hook('page:finish', () => {
      setTimeout(() => {
        initScrollAnimation()
      }, 50)
    })
  }

  return {
    initScrollAnimation,
  }
}

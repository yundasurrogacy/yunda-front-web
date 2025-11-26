import { defineNuxtPlugin, useRouter } from '#app'

const FACEBOOK_PIXEL_ID = '795952583356142'
let pixelLoadingPromise: Promise<void> | null = null
let pixelInitialized = false

function loadPixelScript() {
  if (!import.meta.client)
    return Promise.resolve()

  if (typeof (window as any).fbq === 'function')
    return Promise.resolve()

  if (!pixelLoadingPromise) {
    pixelLoadingPromise = new Promise<void>((resolve) => {
      const w = window as any
      const d = document

      if (typeof w.fbq === 'function') {
        resolve()
        return
      }

      const fbq: any = function (...args: any[]) {
        fbq.callMethod ? fbq.callMethod(...args) : fbq.queue.push(args)
      }
      fbq.push = fbq
      fbq.loaded = true
      fbq.version = '2.0'
      fbq.queue = []
      w._fbq = w.fbq = fbq

      const script = d.createElement('script')
      script.async = true
      script.src = 'https://connect.facebook.net/en_US/fbevents.js'
      script.onload = () => resolve()
      script.onerror = () => resolve()

      const firstScript = d.getElementsByTagName('script')[0]
      firstScript?.parentNode?.insertBefore(script, firstScript)
    })
  }

  return pixelLoadingPromise
}

async function ensurePixelInitialized(): Promise<boolean> {
  if (!import.meta.client)
    return false

  if (pixelInitialized)
    return true

  await loadPixelScript()

  if (typeof (window as any).fbq === 'function') {
    const fbq = (window as any).fbq
    // 禁用自动事件追踪，避免误触发
    // 必须在 init 之前设置
    fbq('set', 'autoConfig', 'false', FACEBOOK_PIXEL_ID)
    fbq('set', 'allowAutomaticEvents', false)
    // 禁用自动表单提交检测
    fbq('set', 'agent', 'pl', FACEBOOK_PIXEL_ID)
    fbq('init', FACEBOOK_PIXEL_ID, {
      autoConfig: false,
      debug: false,
    })
    pixelInitialized = true
    return true
  }
  return false
}

async function trackEvent(eventName: string, data?: Record<string, any>) {
  if (!import.meta.client)
    return

  const initialized = await ensurePixelInitialized()
  if (initialized && typeof (window as any).fbq === 'function') {
    // Facebook Pixel 会将传入的数据作为事件参数
    // 确保数据格式正确传递
    if (data) {
      (window as any).fbq('track', eventName, data)
    }
    else {
      (window as any).fbq('track', eventName)
    }
  }
}

export default defineNuxtPlugin((_nuxtApp) => {
  if (!import.meta.client)
    return

  const router = useRouter()
  const trackPageView = (data?: Record<string, any>) => trackEvent('PageView', data)
  const trackCompleteRegistration = (data?: Record<string, any>) => trackEvent('CompleteRegistration', data)

  // 初始页面加载后追踪 PageView
  router.isReady().then(() => {
    trackPageView({ path: router.currentRoute.value.fullPath })
  })

  // 路由变化时追踪 PageView
  router.afterEach((to) => {
    trackPageView({ path: to.fullPath })
  })

  return {
    provide: {
      fbPixel: {
        ensureInitialized: ensurePixelInitialized,
        trackEvent,
        trackPageView,
        trackCompleteRegistration,
      },
    },
  }
})

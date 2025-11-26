import { defineNuxtPlugin, useRouter } from '#app'

const FACEBOOK_PIXEL_ID = '795952583356142'
let pixelLoadingPromise: Promise<void> | null = null

// 使用全局标志防止重复初始化（即使在热重载时也能保持）
function getGlobalInitFlag(): boolean {
  if (import.meta.client) {
    const w = window as any
    return w.__FB_PIXEL_INITIALIZED__?.[FACEBOOK_PIXEL_ID] === true
  }
  return false
}

function setGlobalInitFlag(value: boolean) {
  if (import.meta.client) {
    const w = window as any
    if (!w.__FB_PIXEL_INITIALIZED__) {
      w.__FB_PIXEL_INITIALIZED__ = {}
    }
    w.__FB_PIXEL_INITIALIZED__[FACEBOOK_PIXEL_ID] = value
  }
}

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

  // 首先检查全局标志（最快）
  if (getGlobalInitFlag()) {
    return true
  }

  await loadPixelScript()

  if (typeof (window as any).fbq === 'function') {
    const fbq = (window as any).fbq
    const w = window as any

    // 再次检查全局标志（防止并发初始化）
    if (getGlobalInitFlag()) {
      return true
    }

    // 检查 Facebook Pixel 内部是否已经初始化
    if (w.fbq?._initialized?.[FACEBOOK_PIXEL_ID]) {
      setGlobalInitFlag(true)
      return true
    }

    // 检查 fbq 的调用队列，看是否已经有 init 调用
    if (w.fbq?.queue && Array.isArray(w.fbq.queue)) {
      const hasInitCall = w.fbq.queue.some((call: any[]) => {
        return Array.isArray(call) && call[0] === 'init' && call[1] === FACEBOOK_PIXEL_ID
      })
      if (hasInitCall) {
        setGlobalInitFlag(true)
        return true
      }
    }

    // 检查是否已经通过其他方式初始化
    if (w.fbq?._pixelIds && Array.isArray(w.fbq._pixelIds) && w.fbq._pixelIds.includes(FACEBOOK_PIXEL_ID)) {
      setGlobalInitFlag(true)
      return true
    }

    // 在初始化之前设置全局标志，防止并发初始化
    setGlobalInitFlag(true)

    // 初始化 Pixel
    // 使用 autoConfig: false 禁用自动事件追踪
    fbq('init', FACEBOOK_PIXEL_ID, {
      autoConfig: false,
      debug: false,
    })

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

  // 防止插件被多次执行（在开发模式下可能发生）
  const w = window as any
  if (w.__FB_PIXEL_PLUGIN_LOADED__) {
    return
  }
  w.__FB_PIXEL_PLUGIN_LOADED__ = true

  const router = useRouter()
  const trackPageView = (data?: Record<string, any>) => trackEvent('PageView', data)
  const trackSubmitApplication = (data?: Record<string, any>) => trackEvent('CompleteRegistration', data)

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
        trackSubmitApplication,
      },
    },
  }
})

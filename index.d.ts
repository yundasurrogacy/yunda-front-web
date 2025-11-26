declare module 'nuxt/schema' {
  interface AppConfigInput {
    /** Sidebar configuration */
    sidebar: {
      collapsible: 'offcanvas' | 'icon' | 'none'
      side: 'left' | 'right'
      variant: 'sidebar' | 'floating' | 'inset'
    }
  }
}

declare module '#app' {
  interface FbPixelClient {
    ensureInitialized: () => Promise<boolean>
    trackEvent: (eventName: string, data?: Record<string, any>) => Promise<void>
    trackPageView: (data?: Record<string, any>) => Promise<void>
    trackSubmitApplication: (data?: Record<string, any>) => Promise<void>
  }

  interface NuxtApp {
    $fbPixel?: FbPixelClient
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {}

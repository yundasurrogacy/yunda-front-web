// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },

  ssr: false,
  nitro: {
    preset: 'static',
  },

  app: {
    head: {
      link: [
        {
          rel: 'preload',
          href: '/fonts/Cormorant-Regular.ttf',
          as: 'font',
          type: 'font/ttf',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          href: '/fonts/Cormorant-SemiBold.ttf',
          as: 'font',
          type: 'font/ttf',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          href: '/fonts/SourceSerif4[opsz,wght].ttf',
          as: 'font',
          type: 'font/ttf',
          crossorigin: 'anonymous'
        }
      ]
    }
  },

  modules: [
    '@unocss/nuxt',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
  ],
  i18n: {
    defaultLocale: "en",
    strategy: "no_prefix",
    locales: [
      { code: "zh", iso: "zh-CN", name: "简体中文", file: "zh.json" },
      { code: "en", iso: "en-US", name: "English", file: "en.json" },
    ],
    langDir: "locales/",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en'
    },
  },

  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/css/fonts.css',
    '@/assets/css/colors.css',
    '@/assets/css/animations.css',
  ],

  colorMode: {
    classSuffix: '',
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  imports: {
    dirs: [
    ],
  },

  compatibilityDate: '2024-12-14',
})

// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  // devServer: {
  //   port: 3000, // 你想要的端口号
  // },
  vite: {
    server: {
      // port: 3000,
      proxy: {
        '/api': {
          target: 'https://yunda-admin-system.yundasurrogacy.com/api',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    }
  },

  ssr: true,
  nitro: {
    preset: 'static',
  },

  app: {
    head: {
      title: 'Yunda Surrogacy - Professional Cross-Border Surrogacy Agency',
      titleTemplate: '%s | Yunda Surrogacy',
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
      ],
      meta: [
        { name: 'google-site-verification', content: 'Uh2lsMPqkFF5_9oUi4wbwUDFB8Csx48Z7v3z2RdMqcQ' },
        { name: 'description', content: 'Yunda Surrogacy is a professional cross-border surrogacy agency providing comprehensive US surrogacy services. Expert team, transparent costs, warm support to help you achieve your parenthood dreams.' },
        { name: 'keywords', content: 'surrogacy,US surrogacy,cross-border surrogacy,surrogacy agency,IVF,intended parents,surrogate mother,surrogacy costs,surrogacy process' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:site_name', content: 'Yunda Surrogacy' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@YundaSurrogacy' }
      ],
      script: [
        {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-W6MHCNTV');`
        },
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-H03SG1NBFP', async: true },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-H03SG1NBFP');
                        `
        },

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

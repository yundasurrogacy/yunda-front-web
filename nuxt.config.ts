// https://nuxt.com/docs/api/configuration/nuxt-config

async function fetchBlogEntries() {
  try {
    const response = await fetch('https://yunda-admin-system.yundasurrogacy.com/api/blog?limit=2000')
    const data = await response.json()

    if (data?.blogs && Array.isArray(data.blogs)) {
      return data.blogs
        .map((blog: any) => ({
          loc: `/blog/${blog?.route_id || blog?.id}`,
          lastmod: blog?.updated_at || blog?.created_at,
          priority: 0.6,
        }))
        .filter((blog: { loc: string }) => blog.loc)
    }
  }
  catch (error) {
    console.error('Error fetching blog entries for prerender/sitemap:', error)
  }

  return []
}

const staticPages: Array<{ loc: string, priority: 1 | 0.9 | 0.8 | 0.7 }> = [
  { loc: '/', priority: 1 },
  { loc: '/about', priority: 0.9 },
  { loc: '/be-parents', priority: 0.9 },
  { loc: '/be-surrogate', priority: 0.9 },
  { loc: '/surrogate-qualification', priority: 0.8 },
  { loc: '/surrogate-requirements', priority: 0.8 },
  { loc: '/surrogate-process', priority: 0.8 },
  { loc: '/surrogate-compensation', priority: 0.8 },
  { loc: '/become-a-surrogate', priority: 0.8 },
  { loc: '/become-surrogate-california', priority: 0.8 },
  { loc: '/blog', priority: 0.7 },
  // 父母相关页面
  { loc: '/egg-donation', priority: 0.7 },
  { loc: '/partner-ivf-clinics', priority: 0.7 },
  { loc: '/single-parents-lgbtq', priority: 0.7 },
  { loc: '/surrogacy-price', priority: 0.8 },
  { loc: '/surrogacy-process', priority: 0.8 },
  // 代孕者相关页面
  { loc: '/benefit', priority: 0.7 },
  { loc: '/eligibility', priority: 0.7 },
  { loc: '/journey', priority: 0.7 },
  { loc: '/referral', priority: 0.7 },
  { loc: '/screening', priority: 0.7 },
]

function toZhPath(loc: string) {
  return loc === '/' ? '/zh' : `/zh${loc}`
}

function buildAlternatives(loc: string) {
  return [
    { href: loc, hreflang: 'en' },
    { href: toZhPath(loc), hreflang: 'zh' },
    { href: loc, hreflang: 'x-default' },
  ]
}

const sitemapDefaults = {
  changefreq: 'weekly' as const,
  priority: 0.8 as const,
}

// 预获取博客条目用于 prerender
const blogEntries = await fetchBlogEntries()
const blogRoutes = blogEntries.map((blog: { loc: string }) => blog.loc)

// 生成英文路由（默认语言，无前缀）
const englishRoutes = [
  ...staticPages.map(page => page.loc),
  '/become-a-surrogate-mother', // legacy URL redirect
  '/become-surrogate', // legacy URL redirect
  ...blogRoutes,
]
// 生成中文路由（带 /zh 前缀）
// 处理首页路径：/ 应该映射到 /zh 而不是 /zh/
const chineseRoutes = [
  ...staticPages.map(page => toZhPath(page.loc)),
  ...blogRoutes.map((route: string) => toZhPath(route)),
]
const prerenderRoutes = Array.from(new Set([
  ...englishRoutes,
  ...chineseRoutes,
]))

export default defineNuxtConfig({
  // devtools: { enabled: false }, // 生产环境关闭开发工具以提升性能
  // devServer: {
  //   host: '127.0.0.1',
  //   port: 3000,
  //   url: 'http://127.0.0.1:3000/',
  // },
  vite: {
    server: {
      // port: 3000,
      proxy: {
        '/api': {
          target: 'https://yunda-admin-system.yundasurrogacy.com/api',
          changeOrigin: true,
          rewrite: (path: string) => path.replace(/^\/api/, '/api'),
        },
      },
    },
    build: {
      // 启用 CSS 代码分割
      cssCodeSplit: true,
      // 优化 chunk 大小警告阈值
      chunkSizeWarningLimit: 1000,
    },
  },

  ssr: true,
  router: {},
  routeRules: {
    '/surrogate-journey': {
      redirect: {
        to: '/surrogate-process',
        statusCode: 301,
      },
    },
    '/become-surrogate': {
      redirect: {
        to: '/become-a-surrogate',
        statusCode: 301,
      },
    },
    '/become-a-surrogate-mother': {
      redirect: {
        to: '/become-a-surrogate',
        statusCode: 301,
      },
    },
  },
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      routes: [
        ...prerenderRoutes,
        '/sitemap.xml',
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://www.yundasurrogacy.com',
    },
  },

  app: {
    head: {
      title: 'Professional Surrogacy Agency in California',
      titleTemplate: '%s',
      link: [
        // 只 preload 首屏关键字体
        {
          rel: 'preload',
          href: '/fonts/Cormorant-Regular.ttf',
          as: 'font',
          type: 'font/ttf',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: '/images/base/logo.webp',
          as: 'image',
          type: 'image/webp',
          fetchpriority: 'high',
        },
        {
          rel: 'prefetch',
          href: '/images/blog-hero.webp',
          as: 'image',
          type: 'image/webp',
        },
      ],
      meta: [
        { name: 'google-site-verification', content: 'Uh2lsMPqkFF5_9oUi4wbwUDFB8Csx48Z7v3z2RdMqcQ' },
        { name: 'description', content: 'Yunda Surrogacy is a professional cross-border surrogacy agency providing comprehensive US surrogacy services. Expert team, transparent costs, warm support to help you achieve your parenthood dreams.' },
        { name: 'keywords', content: 'surrogacy,US surrogacy,cross-border surrogacy,surrogacy agency,IVF,intended parents,surrogate mother,surrogacy costs,surrogacy process' },
        { property: 'og:type', content: 'website' },
        { property: 'og:locale', content: 'en_US' },
        { property: 'og:site_name', content: 'Yunda Surrogacy' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@YundaSurrogacy' },
      ],
      script: [
        // 延迟加载第三方脚本，避免阻塞渲染
        {
          innerHTML: `window.addEventListener('load', function() {
              // Google Tag Manager
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-W6MHCNTV');
              
              // Google Analytics
              var gtagScript = document.createElement('script');
              gtagScript.async = true;
              gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-H03SG1NBFP';
              document.head.appendChild(gtagScript);
              gtagScript.onload = function() {
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-H03SG1NBFP');
              };
              
              // Facebook Meta Pixel - 已移至插件管理，此处不再初始化
              // Pixel 初始化由 plugins/fb-pixel.client.ts 统一管理
            });`,
          defer: true,
        },
      ],
      noscript: [
        // Facebook Meta Pixel noscript
        { innerHTML: '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=795952583356142&ev=PageView&noscript=1" />' },
      ],

    },
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
    '@nuxtjs/sitemap',
  ],

  // Sitemap 配置
  site: {
    url: 'https://www.yundasurrogacy.com', // 替换为您的实际域名
  },

  sitemap: {
    // 强制关闭模块自动分语种 sitemap/index，采用单一 sitemap.xml
    autoI18n: false,
    defaults: sitemapDefaults,
    // 单一 sitemap.xml，包含多语言 alternatives
    urls: async () => {
      const staticUrls = staticPages.flatMap(page => ([
        {
          loc: page.loc,
          priority: page.priority,
          alternatives: buildAlternatives(page.loc),
        },
        {
          loc: toZhPath(page.loc),
          priority: page.priority,
          alternatives: buildAlternatives(page.loc),
        },
      ]))

      const blogUrls = blogEntries.flatMap((blog: { loc: string, lastmod?: string, priority: number }) => ([
        {
          ...blog,
          alternatives: buildAlternatives(blog.loc),
        },
        {
          ...blog,
          loc: toZhPath(blog.loc),
          alternatives: buildAlternatives(blog.loc),
        },
      ]))

      return [...staticUrls, ...blogUrls]
    },
  },
  i18n: {
    lazy: true,
    defaultLocale: 'en',
    strategy: 'prefix_except_default', // 默认语言（en）无前缀，其他语言（zh）有前缀
    locales: [
      { code: 'zh', iso: 'zh-CN', name: '简体中文', file: 'zh.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
    ],
    langDir: 'locales/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // 只在根路径时检测和重定向
      alwaysRedirect: false,
      fallbackLocale: 'en',
    },
    // 禁用翻译指令优化，避免问题并在未来版本中被移除
    bundle: {
      optimizeTranslationDirective: false,
    },
  },

  css: [
    '@unocss/reset/tailwind.css',
    '@/assets/css/fonts.css',
    '@/assets/css/colors.css',
    '@/assets/css/animations.css',
    '@/assets/css/layout.css',
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

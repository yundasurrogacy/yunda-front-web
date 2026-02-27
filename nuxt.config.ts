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
  { loc: '/surrogacy-cost', priority: 0.8 },
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
    { href: loc, hreflang: 'en-US' },
    { href: toZhPath(loc), hreflang: 'zh-CN' },
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

// 本地调试：网站端 3000，后台 3002；设置 API_PROXY_TARGET=http://localhost:3002 时代理到本地后台
/* eslint-disable node/prefer-global/process -- Nuxt 中 process.env 为标准用法 */
const apiProxyTarget = process.env.API_PROXY_TARGET || process.env.NUXT_PUBLIC_API_BASE || 'https://yunda-admin-system.yundasurrogacy.com'

export default defineNuxtConfig({
  // 修复 prerender 时 vite-node-shared 中 baseURL 为 undefined 导致的 "Cannot read properties of undefined (reading 'startsWith')" 错误
  // 参见 https://github.com/nuxt/nuxt/issues/30367
  experimental: {
    appManifest: false,
  },
  devServer: {
    port: 3000,
  },
  vite: {
    server: {
      proxy: {
        '/api': {
          target: apiProxyTarget,
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
    '/sitemap.html': {
      redirect: {
        to: '/sitemap',
        statusCode: 301,
      },
    },
    '/zh/sitemap.html': {
      redirect: {
        to: '/zh/sitemap',
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
      // 约定：页面下非页面文件（多语言、composable 等）统一放在 _ 目录，prerender 忽略所有 /_/ 路径
      ignore: [
        (path: string) => path.includes('/_/'),
      ],
    },
  },

  runtimeConfig: {
    public: {
      siteUrl: 'https://www.yundasurrogacy.com',
      // 本地调试留空则用相对路径 /api（走 vite 代理）；生产可设 NUXT_PUBLIC_API_BASE 为后台完整地址
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '',
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
        // 延迟加载第三方脚本，避免阻塞渲染；使用 requestIdleCallback 延后到浏览器空闲时加载，
        // 避免 GTM/GA 的 ccm/collect 等请求挂起时导致地址栏持续转圈
        {
          innerHTML: `window.addEventListener('load', function() {
              function loadAnalytics() {
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
              }
              if ('requestIdleCallback' in window) {
                requestIdleCallback(loadAnalytics, { timeout: 2000 });
              } else {
                setTimeout(loadAnalytics, 500);
              }
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

  icon: {
    // Avoid Nitro prerender module-resolution issues with bundled JSON chunks.
    // Keep icon collections as JSON modules loaded directly from node_modules.
    serverBundle: {
      externalizeIconsJson: true,
    },
  },

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
    // 完全禁用自动语言检测和重定向，让用户自主选择语言
    detectBrowserLanguage: false,
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

// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'
import seoRoutes from './data/seo-routes.json'
import zhMissingBlogs from './data/zh-missing-blogs.json'

const zhMissingManifest = zhMissingBlogs as {
  signalReliable?: boolean
  totalBlogPosts?: number
  routes?: string[]
}

if (zhMissingManifest.signalReliable === false)
  throw new Error('data/zh-missing-blogs.json is not authoritative. Run npm run sitemap:xml before building.')

const zhMissingBlogRouteSet = new Set(zhMissingManifest.routes ?? [])

async function fetchBlogEntries() {
  const urls = [
    process.env.BLOG_SLUGS_API_URL || 'https://yunda-admin-system.yundasurrogacy.com/api/blog/slugs?limit=2000',
    'https://yunda-admin-system.yundasurrogacy.com/api/blog?limit=2000',
  ]

  try {
    let data: any = null

    for (const url of urls) {
      const response = await fetch(url)
      if (!response.ok)
        continue

      data = await response.json()
      if (data?.blogs && Array.isArray(data.blogs))
        break
    }

    if (data?.blogs && Array.isArray(data.blogs)) {
      return data.blogs
        .map((blog: any) => {
          const slug = String(blog?.route_id || blog?.id || '').trim()
          if (!slug)
            return null
          if (!/^[a-z0-9~-]+$/i.test(slug))
            throw new Error(`Unsafe blog route_id "${slug}". Fix it in the CMS before building.`)
          const loc = `/blog/${slug}`
          return {
            loc,
            lastmod: blog?.updated_at || blog?.created_at,
            priority: 0.6,
            hasZhContent: !zhMissingBlogRouteSet.has(`/zh${loc}`),
          }
        })
        .filter(Boolean)
    }
  }
  catch (error) {
    console.error('Error fetching blog entries for prerender/sitemap:', error)
    throw error
  }

  throw new Error('Blog API returned no usable blog list; refusing to build incomplete routes.')
}

const staticPages = seoRoutes.staticPages

function toZhPath(loc: string) {
  return loc === '/' ? '/zh' : `/zh${loc}`
}

// 预获取博客条目用于 prerender
const blogEntries = await fetchBlogEntries()
if (
  typeof zhMissingManifest.totalBlogPosts === 'number'
  && zhMissingManifest.totalBlogPosts !== blogEntries.length
) {
  throw new Error(
    `Blog manifest/API count mismatch: manifest=${zhMissingManifest.totalBlogPosts}, API=${blogEntries.length}. `
    + 'Run npm run sitemap:xml and rebuild.',
  )
}
const blogRoutes = blogEntries.map((blog: { loc: string }) => blog.loc)

const legacyRedirectPaths = new Set([
  '/become-a-surrogate-mother',
  '/become-a-surrogay-mother',
  '/become-surrogate',
  '/surrogate-journey',
  '/surrogate-qualification',
  '/surrogacy-price',
  '/zh/become-a-surrogate-mother',
  '/zh/become-a-surrogay-mother',
  '/zh/become-surrogate',
  '/zh/surrogate-journey',
  '/zh/surrogate-qualification',
  '/zh/surrogacy-price',
  '/sitemap.html',
  '/zh/sitemap.html',
  '/be-surrogate-v2',
  '/zh/be-surrogate-v2',
  '/about）',
  '/about%EF%BC%89',
  '/how-much-do-surrogates-make.html',
  '/for-surrogates.html',
  '/parents.html',
  '/services',
  '/zh/services',
])

// 生成英文路由（默认语言，无前缀）
const englishRoutes = [
  ...staticPages.map(page => page.loc),
  ...blogRoutes,
]
// 生成中文路由（带 /zh 前缀）
// 只预渲染有中文内容的博客页；无中文内容的页面由 vercel.json 临时重定向到英文版
const chineseRoutes = [
  ...staticPages.map(page => toZhPath(page.loc)),
  ...blogEntries
    .filter((entry: any) => entry.hasZhContent)
    .map((entry: any) => toZhPath(entry.loc)),
]
const prerenderRoutes = Array.from(new Set([
  ...englishRoutes,
  ...chineseRoutes,
]))

// 本地调试：网站端 3000，后台 3002；设置 API_PROXY_TARGET=http://localhost:3002 时代理到本地后台
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
          bypass: (req) => {
            const url = req.url || ''
            // 由 Nuxt Nitro 提供的本地 server routes，不走后台代理
            if (url.startsWith('/api/resources/instagram') || url.startsWith('/api/substack.posts'))
              return url
          },
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
    '/services': {
      redirect: { to: '/intended-parents', statusCode: 301 },
    },
    '/zh/services': {
      redirect: { to: '/zh/intended-parents', statusCode: 301 },
    },
    '/success': {
      redirect: { to: '/be-surrogate/success', statusCode: 301 },
    },
    '/zh/success': {
      redirect: { to: '/zh/be-surrogate/success', statusCode: 301 },
    },
    '/surrogate-qualification': {
      redirect: { to: '/be-surrogate', statusCode: 301 },
    },
    '/zh/surrogate-qualification': {
      redirect: { to: '/zh/be-surrogate', statusCode: 301 },
    },
    '/surrogate-journey': {
      redirect: {
        to: '/surrogate-process',
        statusCode: 301,
      },
    },
    '/zh/surrogate-journey': {
      redirect: {
        to: '/zh/surrogate-process',
        statusCode: 301,
      },
    },
    '/surrogacy-price': {
      redirect: {
        to: '/surrogacy-cost',
        statusCode: 301,
      },
    },
    '/zh/surrogacy-price': {
      redirect: {
        to: '/zh/surrogacy-cost',
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
    '/about）': {
      redirect: {
        to: '/about',
        statusCode: 301,
      },
    },
    '/about%EF%BC%89': {
      redirect: {
        to: '/about',
        statusCode: 301,
      },
    },
    '/how-much-do-surrogates-make.html': {
      redirect: {
        to: '/surrogate-compensation',
        statusCode: 301,
      },
    },
    '/for-surrogates.html': {
      redirect: {
        to: '/be-surrogate',
        statusCode: 301,
      },
    },
    '/parents.html': {
      redirect: {
        to: '/intended-parents',
        statusCode: 301,
      },
    },
    '/become-surrogate': {
      redirect: {
        to: '/become-a-surrogate',
        statusCode: 301,
      },
    },
    '/zh/become-surrogate': {
      redirect: {
        to: '/zh/become-a-surrogate',
        statusCode: 301,
      },
    },
    '/become-a-surrogate-mother': {
      redirect: {
        to: '/become-a-surrogate',
        statusCode: 301,
      },
    },
    '/zh/become-a-surrogate-mother': {
      redirect: {
        to: '/zh/become-a-surrogate',
        statusCode: 301,
      },
    },
    '/become-a-surrogay-mother': {
      redirect: {
        to: '/become-a-surrogate',
        statusCode: 301,
      },
    },
    '/zh/become-a-surrogay-mother': {
      redirect: {
        to: '/zh/become-a-surrogate',
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
      ],
      // 约定：页面下非页面文件（多语言、composable 等）统一放在 _ 目录，prerender 忽略所有 /_/ 路径
      ignore: [
        (path: string) => path.includes('/_/'),
        // CMS legacy slugs containing ":" are covered by permanent Vercel
        // redirects. They are never valid current route_ids, so do not let the
        // link crawler recreate their obsolete HTML.
        (path: string) => path.includes(':'),
        (path: string) => zhMissingBlogRouteSet.has(path.replace(/\/+$/, '')),
        (path: string) => legacyRedirectPaths.has(path),
        (path: string) => path === '/be-surrogate/success' || path === '/zh/be-surrogate/success',
      ],
    },
  },

  runtimeConfig: {
    // Instagram Graph API（可选）：配置后可从官方接口同步点赞/评论；见 utils/resources-instagram-posts.ts
    instagramAccessToken: process.env.INSTAGRAM_GRAPH_ACCESS_TOKEN || '',
    instagramUserId: process.env.INSTAGRAM_USER_ID || '',
    instagramFetchEmbed: process.env.INSTAGRAM_FETCH_EMBED === 'true',
    public: {
      siteUrl: 'https://www.yundasurrogacy.com',
      // 本地调试留空则用相对路径 /api（走 vite 代理）；生产需指向后台，未配置时默认 yunda-admin-system
      apiBase: process.env.NUXT_PUBLIC_API_BASE || (process.env.NODE_ENV === 'production' ? 'https://yunda-admin-system.yundasurrogacy.com' : ''),
    },
  },

  app: {
    head: {
      title: 'Yunda Surrogacy ｜California Surrogacy Agency for Intended Parents',
      titleTemplate: '%s',
      link: [
        // 只 preload 首屏关键字体
        {
          rel: 'preload',
          href: '/fonts/Cormorant-Regular.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: '/images/shared/brand/logo.webp',
          as: 'image',
          type: 'image/webp',
          fetchpriority: 'high',
        },
      ],
      meta: [
        { name: 'google-site-verification', content: 'Uh2lsMPqkFF5_9oUi4wbwUDFB8Csx48Z7v3z2RdMqcQ' },
        { name: 'description', content: 'Yunda Surrogacy is a professional cross-border surrogacy agency providing comprehensive US surrogacy services. Expert team, transparent costs, warm support to help you achieve your parenthood dreams.' },
        { name: 'keywords', content: 'surrogacy,US surrogacy,cross-border surrogacy,surrogacy agency,IVF,intended parents,surrogate mother,surrogacy costs,surrogacy process' },
        { name: 'twitter:site', content: '@YundaSurrogacy' },
      ],
      script: [
        // 延迟加载第三方脚本，避免阻塞渲染；使用 requestIdleCallback 延后到浏览器空闲时加载，
        // 避免 GTM/GA 的 ccm/collect 等请求挂起时导致地址栏持续转圈
        {
          innerHTML: `window.addEventListener('load', function() {
              function loadAnalytics() {
                // Ahrefs Analytics
                var ahrefsScript = document.createElement('script');
                ahrefsScript.async = true;
                ahrefsScript.src = 'https://analytics.ahrefs.com/analytics.js';
                ahrefsScript.setAttribute('data-key', '+XByroCnWa6wxoZnMUVpYg');
                document.head.appendChild(ahrefsScript);
                // Google Tag Manager
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-W6MHCNTV');
                // Google Analytics + Google Ads
                var gtagScript = document.createElement('script');
                gtagScript.async = true;
                gtagScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-H03SG1NBFP';
                document.head.appendChild(gtagScript);
                gtagScript.onload = function() {
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-H03SG1NBFP');
                  gtag('config', 'AW-17913743847');
                };
              }
              if ('requestIdleCallback' in window) {
                requestIdleCallback(loadAnalytics, { timeout: 4000 });
              } else {
                setTimeout(loadAnalytics, 2000);
              }
            });`,
          defer: true,
        },
      ],
      noscript: [
        // Facebook Meta Pixel noscript
        { innerHTML: '<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=795952583356142&ev=PageView&noscript=1" alt="" aria-hidden="true" />' },
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
  ],

  icon: {
    // Bundle icon JSON for Node versions that require JSON import attributes.
    serverBundle: {
      externalizeIconsJson: false,
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
    '@/assets/css/yunda-typography.css',
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

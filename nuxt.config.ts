// https://nuxt.com/docs/api/configuration/nuxt-config

async function fetchBlogRoutes() {
  try {
    const response = await fetch('https://yunda-admin-system.yundasurrogacy.com/api/blog?limit=2000')
    const data = await response.json()

    if (data?.blogs && Array.isArray(data.blogs)) {
      return data.blogs
        .map((blog: any) => blog?.route_id || blog?.id)
        .filter(Boolean)
        .map((id: string | number) => `/blog/${id}`)
    }
  }
  catch (error) {
    console.error('Error fetching blog routes for prerender:', error)
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

const blogRoutes = await fetchBlogRoutes()
// 生成英文路由（默认语言，无前缀）
const englishRoutes = [
  ...staticPages.map(page => page.loc),
  '/become-a-surrogate-mother', // legacy URL redirect
  '/become-surrogate', // legacy URL redirect
  ...blogRoutes,
]
// 生成中文路由（带 /zh 前缀）
const chineseRoutes = [
  ...staticPages.map(page => `/zh${page.loc}`),
  ...blogRoutes.map((route: string) => `/zh${route}`),
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
      routes: prerenderRoutes,
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
    // 排除不需要索引的页面
    exclude: [
    ],
    // 设置更新频率和优先级
    defaults: {
      changefreq: 'weekly',
      priority: 0.8,
    },
    // URLs 配置 - 为每个页面添加多语言标签（hreflang）
    urls: async () => {
      // 主要页面列表（需要包含所有预渲染的页面）
      const pages = staticPages
      // 获取所有博客文章
      const blogUrls = []
      try {
        const blogResponse = await fetch('https://yunda-admin-system.yundasurrogacy.com/api/blog?limit=1000')
        const blogData = await blogResponse.json()

        if (blogData && blogData.blogs && Array.isArray(blogData.blogs)) {
          blogUrls.push(...blogData.blogs.map((blog: any) => ({
            loc: `/blog/${blog.route_id || blog.id}`,
            priority: 0.6,
            lastmod: blog.updated_at || blog.created_at,
          })))
        }
      }
      catch (error) {
        console.error('Error fetching blog URLs for sitemap:', error)
      }

      // 为每个页面添加 hreflang 标签（多语言支持）
      // 英文版本（无前缀）和中文版本（/zh 前缀）
      const staticUrls = pages.flatMap(page => [
        {
          loc: page.loc, // 英文版本
          priority: page.priority,
          alternatives: [
            { href: page.loc, hreflang: 'en' },
            { href: `/zh${page.loc}`, hreflang: 'zh' },
            { href: page.loc, hreflang: 'x-default' }, // 默认语言（英文）
          ],
        },
        {
          loc: `/zh${page.loc}`, // 中文版本
          priority: page.priority,
          alternatives: [
            { href: page.loc, hreflang: 'en' },
            { href: `/zh${page.loc}`, hreflang: 'zh' },
            { href: page.loc, hreflang: 'x-default' }, // 默认语言（英文）
          ],
        },
      ])
      // 为博客文章添加 hreflang 标签
      const blogUrlsWithHreflang = blogUrls.flatMap(blog => [
        {
          loc: blog.loc, // 英文版本
          priority: blog.priority,
          lastmod: blog.lastmod,
          alternatives: [
            { href: blog.loc, hreflang: 'en' },
            { href: `/zh${blog.loc}`, hreflang: 'zh' },
            { href: blog.loc, hreflang: 'x-default' },
          ],
        },
        {
          loc: `/zh${blog.loc}`, // 中文版本
          priority: blog.priority,
          lastmod: blog.lastmod,
          alternatives: [
            { href: blog.loc, hreflang: 'en' },
            { href: `/zh${blog.loc}`, hreflang: 'zh' },
            { href: blog.loc, hreflang: 'x-default' },
          ],
        },
      ])

      return [...staticUrls, ...blogUrlsWithHreflang]
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

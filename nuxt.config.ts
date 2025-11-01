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
          rewrite: path => path.replace(/^\/api/, '/api'),
        },
      },
    },
  },

  ssr: true,
  routeRules: {
    '/surrogate-journey': {
      redirect: {
        to: '/surrogate-process',
        statusCode: 301,
      },
    },
    '/become-surrogate': {
      redirect: {
        to: '/https://www.yundasurrogacy.com/become-a-surrogate-mother',
        statusCode: 301,
      },
  },
  nitro: {
    preset: 'static',
    prerender: {
      crawlLinks: true,
      // 排除 blog 相关页面，让它们动态渲染
      ignore: [
        '/blog',
        '/blog/*',
      ],
      // 明确指定要预渲染的页面（除了 blog）
      routes: [
        '/',
        '/about',
        '/be-parents',
        '/be-surrogate',
        '/surrogate-qualification',
        '/surrogate-process',
        '/surrogate-compensation',
        '/surrogate-requirements',
        '/become-a-surrogate-mother',
        '/become-surrogate-california',
        '/benefit',
        '/eligibility',
        '/journey',
        '/referral',
        '/screening',
        '/egg-donation',
        '/partner-ivf-clinics',
        '/single-parents-lgbtq',
        '/surrogacy-price',
        '/surrogacy-process',
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
      title: 'Yunda Surrogacy - Professional Cross-Border Surrogacy Agency',
      titleTemplate: '%s',
      link: [
        {
          rel: 'preload',
          href: '/fonts/Cormorant-Regular.ttf',
          as: 'font',
          type: 'font/ttf',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: '/fonts/Cormorant-SemiBold.ttf',
          as: 'font',
          type: 'font/ttf',
          crossorigin: 'anonymous',
        },
        {
          rel: 'preload',
          href: '/fonts/SourceSerif4[opsz,wght].ttf',
          as: 'font',
          type: 'font/ttf',
          crossorigin: 'anonymous',
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
        {
          innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-W6MHCNTV');`,
        },
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-H03SG1NBFP', async: true },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-H03SG1NBFP');
                        `,
        },
        // Facebook Meta Pixel Code
        {
          innerHTML: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '795952583356142');
fbq('track', 'PageView');
fbq('track', 'SubmitApplication');
`,
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
      const pages: Array<{ loc: string, priority: 1 | 0.9 | 0.8 | 0.7 }> = [
        { loc: '/', priority: 1 },
        { loc: '/about', priority: 0.9 },
        { loc: '/be-parents', priority: 0.9 },
        { loc: '/be-surrogate', priority: 0.9 },
        { loc: '/surrogate-qualification', priority: 0.8 },
        { loc: '/surrogate-requirements', priority: 0.8 },
        { loc: '/surrogate-process', priority: 0.8 },
        { loc: '/surrogate-compensation', priority: 0.8 },
        { loc: '/become-a-surrogate-mother', priority: 0.8 },
        { loc: '/become-surrogate-california', priority: 0.8 },
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
        // 注意：blog 相关页面不在静态页面列表中，它们会在构建时动态获取并添加到 sitemap
      ]
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
      const staticUrls = pages.map(page => ({
        loc: page.loc,
        priority: page.priority,
        alternatives: [
          { href: page.loc, hreflang: 'en' },
          { href: page.loc, hreflang: 'zh' },
          { href: page.loc, hreflang: 'x-default' }, // 默认语言
        ],
      }))
      // 为博客文章添加 hreflang 标签
      const blogUrlsWithHreflang = blogUrls.map(blog => ({
        loc: blog.loc,
        priority: blog.priority,
        lastmod: blog.lastmod,
        alternatives: [
          { href: blog.loc, hreflang: 'en' },
          { href: blog.loc, hreflang: 'zh' },
          { href: blog.loc, hreflang: 'x-default' },
        ],
      }))

      return [...staticUrls, ...blogUrlsWithHreflang]
    },
  },
  i18n: {
    defaultLocale: 'en',
    strategy: 'no_prefix',
    locales: [
      { code: 'zh', iso: 'zh-CN', name: '简体中文', file: 'zh.json' },
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
    ],
    langDir: 'locales/',
    detectBrowserLanguage: false, // 完全禁用浏览器语言检测
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

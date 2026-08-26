const fs = require('node:fs')
const https = require('node:https')
const path = require('node:path')
const process = require('node:process')

const BLOG_API_URL = process.env.BLOG_API_URL || 'https://yunda-admin-system.yundasurrogacy.com/api/blog/slugs'
const BLOG_API_FALLBACK_URL = process.env.BLOG_API_FALLBACK_URL || 'https://yunda-admin-system.yundasurrogacy.com/api/blog'
const BLOG_API_LIMIT = Number.parseInt(process.env.BLOG_API_LIMIT || '100', 10)
const OUTPUT_DATA_PATH = path.join(process.cwd(), 'data', 'sitemap-data.json')

const STATIC_SECTIONS_EN = [
  {
    title: 'Core Paths',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About Yunda' },
      { href: '/be-parents', label: 'Start Consultation' },
      { href: '/be-surrogate', label: 'Apply as a Surrogate' },
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service', label: 'Terms of Service' },
      { href: '/disclaimer', label: 'Disclaimer' },
    ],
  },
  {
    title: 'Intended Parents',
    links: [
      { href: '/intended-parents', label: 'Intended Parents Overview' },
      { href: '/be-parents', label: 'Start Consultation' },
      { href: '/surrogacy-cost', label: 'Cost Guide' },
      { href: '/surrogacy-process', label: 'Process Guide' },
      { href: '/surrogacy-protection-california', label: 'Legal, Insurance & Escrow' },
      { href: '/california-surrogacy-consultation', label: 'California Consultation Guidance' },
      { href: '/egg-donation', label: 'Egg Donation Guide' },
      { href: '/partner-ivf-clinics', label: 'IVF Clinic Partners' },
      { href: '/single-parents-lgbtq', label: 'LGBTQ+ & Single Parents' },
    ],
  },
  {
    title: 'Surrogates',
    links: [
      { href: '/surrogates', label: 'Surrogate Overview' },
      { href: '/be-surrogate', label: 'Apply as a Surrogate' },
      { href: '/surrogate-requirements', label: 'Requirements' },
      { href: '/journey', label: 'Journey Guide' },
      { href: '/benefit', label: 'Compensation & Benefits' },
      { href: '/screening', label: 'Screening' },
      { href: '/referral', label: 'Referral Program' },
    ],
  },
  {
    title: 'Detailed Surrogate Guides',
    links: [
      { href: '/surrogate-process', label: 'Transfer & Legal Steps' },
      { href: '/surrogate-compensation', label: 'Payment & Escrow Details' },
      { href: '/become-a-surrogate', label: 'Before You Apply' },
      { href: '/become-surrogate-california', label: 'California Requirements' },
      { href: '/eligibility', label: 'Quick Eligibility Check' },
    ],
  },
  {
    title: 'Resources / Blog',
    links: [
      { href: '/resources', label: 'Resources & Media Center' },
      { href: '/resources/mhb-new-york-2026', label: 'MHB New York 2026 Event Guide' },
      { href: '/blog', label: 'Blog Index' },
    ],
  },
]

const STATIC_SECTIONS_ZH = [
  {
    title: '核心路径',
    links: [
      { href: '/', label: '首页' },
      { href: '/about', label: '关于孕达' },
      { href: '/be-parents', label: '预约咨询' },
      { href: '/be-surrogate', label: '申请成为代孕妈妈' },
      { href: '/privacy-policy', label: '隐私政策' },
      { href: '/terms-of-service', label: '服务条款' },
      { href: '/disclaimer', label: '免责声明' },
    ],
  },
  {
    title: '准父母',
    links: [
      { href: '/intended-parents', label: '准父母总览' },
      { href: '/be-parents', label: '预约咨询' },
      { href: '/surrogacy-cost', label: '费用指南' },
      { href: '/surrogacy-process', label: '流程指南' },
      { href: '/surrogacy-protection-california', label: '法律、保险与托管' },
      { href: '/california-surrogacy-consultation', label: '加州咨询指导' },
      { href: '/egg-donation', label: '卵子捐赠指南' },
      { href: '/partner-ivf-clinics', label: '合作 IVF 诊所' },
      { href: '/single-parents-lgbtq', label: '单身父母与 LGBTQ+ 准父母' },
    ],
  },
  {
    title: '代孕妈妈',
    links: [
      { href: '/surrogates', label: '代孕妈妈总览' },
      { href: '/be-surrogate', label: '申请成为代孕妈妈' },
      { href: '/surrogate-requirements', label: '资格要求' },
      { href: '/journey', label: '旅程指南' },
      { href: '/benefit', label: '补偿与福利' },
      { href: '/screening', label: '筛查流程' },
      { href: '/referral', label: '推荐计划' },
    ],
  },
  {
    title: '代孕妈妈补充指南',
    links: [
      { href: '/surrogate-process', label: '移植与法律步骤' },
      { href: '/surrogate-compensation', label: '付款与托管说明' },
      { href: '/become-a-surrogate', label: '申请前准备' },
      { href: '/become-surrogate-california', label: '加州代孕妈妈要求' },
      { href: '/eligibility', label: '快速资格自查' },
    ],
  },
  {
    title: '资源 / 博客',
    links: [
      { href: '/resources', label: '资源与媒体中心' },
      { href: '/resources/mhb-new-york-2026', label: 'MHB New York 2026 活动指南' },
      { href: '/blog', label: '博客首页' },
    ],
  },
]

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = ''
        res.on('data', (chunk) => {
          data += chunk
        })
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`Request failed: ${res.statusCode} ${res.statusMessage || ''}`.trim()))
            return
          }
          try {
            resolve(JSON.parse(data))
          }
          catch (error) {
            reject(error)
          }
        })
      })
      .on('error', reject)
  })
}

async function fetchAllBlogs() {
  const endpoints = [BLOG_API_URL, BLOG_API_FALLBACK_URL]
  const allBlogs = []

  for (const endpoint of endpoints) {
    allBlogs.length = 0
    let page = 1
    let totalPages = 1

    try {
      do {
        const url = `${endpoint}?page=${page}&limit=${BLOG_API_LIMIT}`
        const response = await fetchJson(url)
        const blogs = Array.isArray(response?.blogs) ? response.blogs : []
        allBlogs.push(...blogs)

        const pagination = response?.pagination || {}
        totalPages = Number.parseInt(pagination.totalPages || totalPages, 10)

        if (pagination.hasNextPage === false) {
          break
        }

        page += 1
      } while (page <= totalPages)

      return allBlogs
    }
    catch (error) {
      if (endpoint === endpoints[endpoints.length - 1])
        throw error
    }
  }

  return allBlogs
}

async function run() {
  const blogs = await fetchAllBlogs()
  const zhMissingManifest = JSON.parse(fs.readFileSync(
    path.join(process.cwd(), 'data', 'zh-missing-blogs.json'),
    'utf8',
  ))
  if (zhMissingManifest.signalReliable === false)
    throw new Error('Chinese-content manifest is not authoritative. Run sitemap:xml successfully first.')
  if (zhMissingManifest.totalBlogPosts !== blogs.length) {
    throw new Error(
      `Blog manifest/API count mismatch: manifest=${zhMissingManifest.totalBlogPosts}, API=${blogs.length}.`,
    )
  }
  const zhMissingRoutes = new Set(zhMissingManifest.routes || [])

  const blogLinksEn = blogs.map((blog) => {
    const slugValue = blog.route_id || blog.id
    const slug = String(slugValue).trim()
    if (!/^[a-z0-9~-]+$/i.test(slug))
      throw new Error(`Unsafe blog route_id "${slug}". Fix it in the CMS before building.`)
    const label = String(blog.en_title || blog.title || `Blog ${slug}`).trim()
    return { href: `/blog/${slug}`, label }
  })
  // Only list posts that actually have Chinese content. Posts with an empty
  // Chinese body are temporarily redirected to English, so linking them here would
  // create internal links pointing at redirects and send Chinese readers
  // through a hop. Use the same authoritative manifest as sitemap generation,
  // prerendering, hreflang, and Vercel redirects.
  const blogLinksZh = blogs
    .filter((blog) => {
      const slug = String(blog.route_id || blog.id || '').trim()
      return slug && !zhMissingRoutes.has(`/zh/blog/${slug}`)
    })
    .map((blog) => {
      const slugValue = blog.route_id || blog.id
      const slug = String(slugValue).trim()
      const label = String(blog.title || blog.en_title || `博客 ${slug}`).trim()
      return { href: `/blog/${slug}`, label }
    })

  const blogSectionEn = {
    title: 'Blog Articles',
    links: [{ href: '/blog', label: 'Blog Index' }, ...blogLinksEn],
    note: `Posts fetched from API: ${blogLinksEn.length} items.`,
    className: 'section-blog',
  }
  const blogSectionZh = {
    title: '博客文章',
    links: [{ href: '/blog', label: '博客列表' }, ...blogLinksZh],
    note: `从接口获取文章：${blogLinksZh.length}篇。`,
    className: 'section-blog',
  }

  const withZhPrefix = section => ({
    ...section,
    links: section.links.map((link) => {
      if (!link.href || typeof link.href !== 'string') {
        return link
      }
      if (link.href.startsWith('http')) {
        return link
      }
      if (link.href === '/') {
        return { ...link, href: '/zh' }
      }
      if (link.href.startsWith('/zh')) {
        return link
      }
      return { ...link, href: `/zh${link.href}` }
    }),
  })

  const sectionsEn = [
    STATIC_SECTIONS_EN[0],
    STATIC_SECTIONS_EN[1],
    STATIC_SECTIONS_EN[2],
    STATIC_SECTIONS_EN[3],
    STATIC_SECTIONS_EN[4],
    blogSectionEn,
  ]
  const sectionsZh = [
    STATIC_SECTIONS_ZH[0],
    STATIC_SECTIONS_ZH[1],
    STATIC_SECTIONS_ZH[2],
    STATIC_SECTIONS_ZH[3],
    STATIC_SECTIONS_ZH[4],
    blogSectionZh,
  ].map(withZhPrefix)

  const sitemapData = {
    generatedAt: new Date().toISOString(),
    sections: {
      en: sectionsEn,
      zh: sectionsZh,
    },
  }

  fs.writeFileSync(OUTPUT_DATA_PATH, JSON.stringify(sitemapData, null, 2), 'utf8')
  console.warn(`Sitemap data updated: ${OUTPUT_DATA_PATH}`)
}

run().catch((error) => {
  console.error('Failed to generate HTML sitemap:', error)
  process.exit(1)
})

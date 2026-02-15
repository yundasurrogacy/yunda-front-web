const fs = require('node:fs')
const https = require('node:https')
const path = require('node:path')
const process = require('node:process')

const BLOG_API_URL = process.env.BLOG_API_URL || 'https://yunda-admin-system.yundasurrogacy.com/api/blog'
const BLOG_API_LIMIT = Number.parseInt(process.env.BLOG_API_LIMIT || '100', 10)
const OUTPUT_DATA_PATH = path.join(process.cwd(), 'data', 'sitemap-data.json')

const STATIC_SECTIONS_EN = [
  {
    title: 'General',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/surrogacy-cost', label: 'Surrogacy Cost' },
      { href: '/surrogacy-protection-california', label: 'Surrogacy Protection California' },
    ],
  },
  {
    title: 'Intended Parents',
    links: [
      { href: '/be-parents', label: 'Become a Parent' },
      { href: '/single-parents-lgbtq', label: 'Single Parents LGBTQ' },
      { href: '/surrogacy-cost', label: 'Surrogacy Cost' },
      { href: '/partner-ivf-clinics', label: 'Partner IVF Clinics' },
      { href: '/surrogacy-process', label: 'Surrogacy Process' },
      { href: '/egg-donation', label: 'Egg Donation' },
    ],
  },
  {
    title: 'Surrogacy Program',
    links: [
      { href: '/be-surrogate', label: 'Be a Surrogate' },
      { href: '/surrogate-qualification', label: 'Surrogate Qualification' },
      { href: '/benefit', label: 'Benefit' },
      { href: '/screening', label: 'Screening' },
      { href: '/eligibility', label: 'Eligibility' },
      { href: '/referral', label: 'Referral' },
      { href: '/journey', label: 'Journey' },
    ],
  },
  {
    title: 'Surrogate Resources',
    links: [
      { href: '/surrogate-requirements', label: 'Surrogate Requirements' },
      { href: '/surrogate-process', label: 'Surrogate Process' },
      { href: '/become-a-surrogate', label: 'Become a Surrogate' },
      { href: '/surrogate-compensation', label: 'Surrogate Compensation' },
      { href: '/become-surrogate-california', label: 'Become Surrogate California' },
      { href: '/california-surrogacy-consultation', label: 'California Surrogacy Consultation' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service', label: 'Terms of Service' },
      { href: '/disclaimer', label: 'Disclaimer' },
    ],
  },
]

const STATIC_SECTIONS_ZH = [
  {
    title: '常规',
    links: [
      { href: '/', label: '首页' },
      { href: '/about', label: '关于我们' },
      { href: '/surrogacy-cost', label: '代孕费用' },
      { href: '/surrogacy-protection-california', label: '加州代孕保障' },
    ],
  },
  {
    title: '准父母',
    links: [
      { href: '/be-parents', label: '成为父母' },
      { href: '/single-parents-lgbtq', label: '单亲与 LGBTQ 准父母' },
      { href: '/surrogacy-cost', label: '代孕费用' },
      { href: '/partner-ivf-clinics', label: '合作 IVF 诊所' },
      { href: '/surrogacy-process', label: '代孕流程' },
      { href: '/egg-donation', label: '捐卵' },
    ],
  },
  {
    title: '代孕项目',
    links: [
      { href: '/be-surrogate', label: '成为代孕妈妈' },
      { href: '/surrogate-qualification', label: '代孕妈妈资格' },
      { href: '/benefit', label: '福利' },
      { href: '/screening', label: '筛选' },
      { href: '/eligibility', label: '资格条件' },
      { href: '/referral', label: '推荐计划' },
      { href: '/journey', label: '代孕旅程' },
    ],
  },
  {
    title: '代孕资源',
    links: [
      { href: '/surrogate-requirements', label: '代孕要求' },
      { href: '/surrogate-process', label: '代孕流程（妈妈端）' },
      { href: '/become-a-surrogate', label: '成为代孕妈妈' },
      { href: '/surrogate-compensation', label: '代孕补偿' },
      { href: '/become-surrogate-california', label: '加州成为代孕妈妈' },
      { href: '/california-surrogacy-consultation', label: '加州代孕咨询' },
    ],
  },
  {
    title: '法律',
    links: [
      { href: '/privacy-policy', label: '隐私政策' },
      { href: '/terms-of-service', label: '服务条款' },
      { href: '/disclaimer', label: '免责声明' },
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
  const allBlogs = []
  let page = 1
  let totalPages = 1

  do {
    const url = `${BLOG_API_URL}?page=${page}&limit=${BLOG_API_LIMIT}`
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

async function run() {
  const blogs = await fetchAllBlogs()
  const blogLinksEn = blogs.map((blog) => {
    const slugValue = blog.route_id || blog.id
    const slug = String(slugValue).trim()
    const label = String(blog.en_title || blog.title || `Blog ${slug}`).trim()
    return { href: `/blog/${slug}`, label }
  })
  const blogLinksZh = blogs.map((blog) => {
    const slugValue = blog.route_id || blog.id
    const slug = String(slugValue).trim()
    const label = String(blog.title || blog.en_title || `博客 ${slug}`).trim()
    return { href: `/blog/${slug}`, label }
  })

  const blogSectionEn = {
    title: 'Blog',
    links: [{ href: '/blog', label: 'Blog Index' }, ...blogLinksEn],
    note: `Posts fetched from API: ${blogLinksEn.length} items.`,
    className: 'section-blog',
  }
  const blogSectionZh = {
    title: '博客',
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

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import zhMissingBlogs from '~/data/zh-missing-blogs.json'
import { buildBlogListSchema, buildWebPageSchema } from '~/utils/schema'
import AppFooter from '../../components/base/AppFooter.vue'
import AppHeader from '../../components/base/AppHeader.vue'
import SeoTrustNote from '../../components/base/SeoTrustNote.vue'

const { locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const apiBase = computed(() => (runtimeConfig.public.apiBase || 'https://yunda-admin-system.yundasurrogacy.com').replace(/\/$/, ''))
const dateModified = '2026-06-30'
const reviewerId = computed(() => `${siteUrl.value || 'https://www.yundasurrogacy.com'}/about#kayla-luo`)
const blogCopyEn = {
  meta: {
    title: 'Surrogacy Blog | Yunda Surrogacy Knowledge Center',
    description: 'Read Yunda Surrogacy guides on surrogacy process, costs, legal basics, medical topics, and real family-building stories.',
  },
  title: 'Blog',
  directAnswerTitle: 'How to use the Yunda Surrogacy blog',
  directAnswer: 'The Yunda Surrogacy blog is an education library for intended parents, surrogate candidates, and families comparing U.S. surrogacy options. Use it to research common questions about process, cost, eligibility, screening, compensation, legal coordination, insurance review, IVF, donor eggs, LGBTQ+ and single-parent paths, and emotional support. Blog posts are designed to help readers understand vocabulary, compare next steps, and prepare better consultation questions. They are not legal, medical, insurance, escrow, or financial advice; high-stakes decisions should be confirmed with the relevant qualified professional and the matching Yunda service guide.',
  trustCards: [
    {
      title: 'Start with intent',
      body: 'Use categories to separate surrogate, intended parent, process, legal, medical, emotional, and brand topics before reading deeper.',
    },
    {
      title: 'Check freshness',
      body: 'For fast-changing legal, insurance, and medical topics, read the post date and look for reviewed-by and source context inside the article.',
    },
    {
      title: 'Move from article to action',
      body: 'When a post matches your situation, continue to the related service page or contact the team for case-specific guidance.',
    },
  ],
  search: {
    title: 'Blog Search',
    placeholder: 'Search',
  },
  categories: {
    all: 'All Blogs',
    categoryRelatedToSurrogate: 'Surrogates',
    categoryRelatedToParents: 'Parent',
    categoryRelatedToBrand: 'Yunda Brand Related',
    categoryRelatedToProcess: 'Surrogacy Process Related',
    categoryRelatedToLaw: 'Legal & Regulatory Related',
    categoryRelatedToIndustry: 'Industry News Related',
    categoryRelatedToMedical: 'Medical & Health Related',
    categoryRelatedToEducation: 'Educational & Informative',
    categoryRelatedToSuccess: 'Success Stories Related',
    categoryRelatedToPsychology: 'Psychology & Emotional Related',
  },
  authorDefault: 'Yunda Team',
  readMore: 'Read More',
  seeAll: 'See all',
  showLess: 'Show less',
  tagsTitle: 'Related Tags',
  loading: 'Loading...',
  retry: 'Retry',
  clearFilters: 'Clear Filters',
  pagination: {
    previous: 'Previous',
    next: 'Next',
    first: 'First',
    last: 'Last',
    showing: 'Showing',
    of: 'of',
    results: 'results',
    goTo: 'Go to',
    go: 'Go',
  },
  noResults: {
    title: 'No articles found',
    description: 'Please try different search terms or clear the filters',
  },
  detailNoContent: 'No content available',
  backToList: 'Back to Blog List',
}

const blogCopyZh = {
  meta: {
    title: '代孕知识博客 - 孕达代孕 | 专业代孕资讯与经验分享',
    description: '孕达代孕知识博客，分享专业的代孕资讯、成功案例、医学知识、法律法规等，帮助准父母和代孕妈妈了解更多代孕相关信息。',
  },
  title: '博客',
  directAnswerTitle: '如何使用孕达代孕博客',
  directAnswer: '孕达代孕博客是面向准父母、代孕候选人和正在比较美国代孕方案家庭的教育资料库。你可以用它研究流程、费用、资格、筛查、补偿、法律协调、保险审核、IVF、捐卵、LGBTQ+ 与单身父母路径以及情绪支持等常见问题。博客文章用于帮助读者理解术语、比较下一步，并为咨询准备更具体的问题。它们不是法律、医疗、保险、托管或财务建议；高风险决定应由对应合格专业人士确认，并结合孕达相关服务专题页继续阅读。',
  trustCards: [
    {
      title: '先按意图筛选',
      body: '通过分类区分代孕妈妈、准父母、流程、法律、医学、情绪和品牌主题，再进入深度阅读。',
    },
    {
      title: '注意更新时间',
      body: '法律、保险和医学主题变化较快，阅读时应查看发布日期，并留意文章中的审阅人与来源说明。',
    },
    {
      title: '从文章进入行动',
      body: '当文章与你的情况相关时，继续阅读对应服务页，或联系团队确认个案化下一步。',
    },
  ],
  search: {
    title: '博客搜索',
    placeholder: '搜索',
  },
  categories: {
    all: '全部博客',
    categoryRelatedToSurrogate: '代孕妈妈',
    categoryRelatedToParents: '准父母',
    categoryRelatedToBrand: '孕达品牌相关',
    categoryRelatedToProcess: '代孕流程相关',
    categoryRelatedToLaw: '法律法规相关',
    categoryRelatedToIndustry: '行业动态相关',
    categoryRelatedToMedical: '医学健康相关',
    categoryRelatedToEducation: '教育科普相关',
    categoryRelatedToSuccess: '成功案例相关',
    categoryRelatedToPsychology: '心理情绪相关',
  },
  authorDefault: '孕达团队',
  readMore: '阅读更多',
  seeAll: '查看更多',
  showLess: '收起',
  tagsTitle: '相关标签',
  loading: '加载中...',
  retry: '重试',
  clearFilters: '清除筛选',
  pagination: {
    previous: '上一页',
    next: '下一页',
    first: '首页',
    last: '末页',
    showing: '显示',
    of: '共',
    results: '条结果',
    goTo: '跳转到',
    go: '跳转',
  },
  noResults: {
    title: '未找到相关文章',
    description: '请尝试其他搜索词或清除筛选条件',
  },
  detailNoContent: '暂无内容',
  backToList: '返回博客列表',
}

const blogCopy = computed(() => (locale.value === 'zh' ? blogCopyZh : blogCopyEn))
const ctaCopy = computed(() => ({
  parent: locale.value === 'zh' ? '开启您的育儿之旅' : 'Become a Intended Parent',
  surrogate: locale.value === 'zh' ? '开启代孕之旅' : 'Become a Surrogate',
}))

function getUiCategoryLabel(key: keyof typeof blogCopyZh.categories | string) {
  // typesafe category lookup, fallback to key if not found
  const categories = blogCopy.value.categories as Record<string, string>
  return categories[key] ?? key
}

// 根据当前语言获取博客标题
function getBlogTitle(blog: Blog | null): string {
  if (!blog)
    return ''

  const currentLocale = locale.value

  if (currentLocale === 'zh') {
    // 中文时：优先中文，再是英文
    return blog.title || blog.en_title || ''
  }
  else {
    // 英文时：优先英文，再是中文
    return blog.en_title || blog.title || ''
  }
}

// 根据当前语言获取博客内容
function getBlogContent(blog: Blog | null): string {
  if (!blog)
    return ''

  const currentLocale = locale.value

  if (currentLocale === 'zh') {
    // 中文时：优先中文，再是英文
    return blog.content || blog.en_content || ''
  }
  else {
    // 英文时：优先英文，再是中文
    return blog.en_content || blog.content || ''
  }
}

// 提取纯文本摘要（去除HTML标签）
function getBlogExcerpt(blog: Blog | null, maxLength: number = 120): string {
  if (blog) {
    const currentLocale = locale.value
    const sourceExcerpt = currentLocale === 'zh'
      ? blog.excerpt || blog.meta_description
      : blog.en_excerpt || blog.en_meta_description || blog.excerpt || blog.meta_description

    if (sourceExcerpt) {
      const cleanedExcerpt = sourceExcerpt.replace(/\s+/g, ' ').trim()
      return cleanedExcerpt.length > maxLength ? `${cleanedExcerpt.substring(0, maxLength)}...` : cleanedExcerpt
    }
  }

  const content = getBlogContent(blog)
  if (!content)
    return ''

  const cleaned = content
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, '\'')
    .replace(/\s+/g, ' ')
    .trim()

  // 截取指定长度
  if (cleaned.length > maxLength) {
    return `${cleaned.substring(0, maxLength)}...`
  }
  if (cleaned)
    return cleaned

  const title = blog ? getBlogTitle(blog) : ''
  if (locale.value === 'zh' && title) {
    const fallback = `阅读孕达代孕关于「${title}」的中文代孕指南，了解流程、费用、法律、筛查与家庭规划重点。`
    return fallback.length > maxLength ? `${fallback.substring(0, maxLength)}...` : fallback
  }

  return cleaned
}

function getDisplayBlogTitle(blog: Blog | null): string {
  return getBlogTitle(blog).trim()
}

function parseRoutePage(value: unknown): number {
  if (value === undefined)
    return 1

  const rawValue = Array.isArray(value) ? value[0] : value
  const parsed = Number.parseInt(String(rawValue), 10)
  if (!Number.isInteger(parsed) || parsed < 2 || String(parsed) !== String(rawValue)) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Blog page not found',
    })
  }
  return parsed
}

const initialPage = parseRoutePage(route.params.page)
const currentPage = ref(initialPage)
const currentBlogPath = computed(() =>
  currentPage.value > 1 ? `/blog/page/${currentPage.value}` : '/blog',
)
const canonicalUrl = computed(() => `${siteUrl.value}${localePath(currentBlogPath.value)}`)
const pageMetaTitle = computed(() => {
  if (currentPage.value === 1)
    return blogCopy.value.meta.title
  return locale.value === 'zh'
    ? `${blogCopy.value.meta.title} - 第 ${currentPage.value} 页`
    : `${blogCopy.value.meta.title} - Page ${currentPage.value}`
})

// SEO 配置
useHead(() => ({
  title: pageMetaTitle.value,
  meta: [
    {
      name: 'description',
      content: truncateMetaDescription(blogCopy.value.meta.description),
    },
    {
      property: 'og:title',
      content: pageMetaTitle.value,
    },
    {
      property: 'og:description',
      content: truncateMetaDescription(blogCopy.value.meta.description),
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      property: 'og:url',
      content: canonicalUrl.value,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value,
    },
    ...(currentPage.value > 1
      ? [{
          rel: 'prev',
          href: `${siteUrl.value}${localePath(currentPage.value === 2 ? '/blog' : `/blog/page/${currentPage.value - 1}`)}`,
        }]
      : []),
  ],
}))

function truncateMetaDescription(text: string, maxLength: number = 155) {
  if (!text)
    return ''
  const cleaned = text.replace(/\s+/g, ' ').trim()
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) : cleaned
}

interface Blog {
  id: number
  route_id?: string
  title: string
  content?: string
  en_title?: string
  en_content?: string
  excerpt?: string
  en_excerpt?: string
  meta_description?: string
  en_meta_description?: string
  category: string
  cover_img_url: string
  tags: string
  reference_author: string
  created_at: string
  updated_at: string
}

interface BlogListResponse {
  blogs: Blog[]
  pagination?: {
    currentPage?: number
    totalPages?: number
    totalCount?: number
    limit?: number
    hasNextPage?: boolean
    hasPrevPage?: boolean
  }
}

interface DisplayBlog {
  id: number
  title: string
  excerpt: string
  featuredExcerpt: string
  categoryLabel: string
  coverImgUrl: string
  author: string
  dateShort: string
  detailPath: string
  raw: Blog
}

const searchQuery = ref('')
const blogApiUrl = computed(() => `${apiBase.value}/api/blog`)
const blogCategoriesApiUrl = computed(() => `${apiBase.value}/api/blog/categories`)
const blogApiLang = computed(() => (locale.value === 'zh' ? 'zh' : 'en'))
const selectedCategory = ref('all')
const jumpToPage = ref(1)
const itemsPerPage = 10
let searchDebounceTimer: ReturnType<typeof setTimeout> | null = null

// 分类选项配置
const categoryOptions = [
  { key: 'categoryRelatedToSurrogate', value: '代孕妈妈相关' },
  { key: 'categoryRelatedToParents', value: '准父母相关' },
  { key: 'categoryRelatedToBrand', value: '孕达品牌相关' },
  { key: 'categoryRelatedToProcess', value: '代孕流程相关' },
  { key: 'categoryRelatedToLaw', value: '法律法规相关' },
  { key: 'categoryRelatedToIndustry', value: '行业动态相关' },
  { key: 'categoryRelatedToMedical', value: '医学健康相关' },
  { key: 'categoryRelatedToEducation', value: '教育科普相关' },
  { key: 'categoryRelatedToSuccess', value: '成功案例相关' },
  { key: 'categoryRelatedToPsychology', value: '心理情绪相关' },
]

const zhMissingBlogRouteSet = new Set(
  ((zhMissingBlogs as { routes?: string[] }).routes ?? []).map(routePath => routePath.replace(/\/+$/, '')),
)

function isAvailableInCurrentLocale(blog: Blog): boolean {
  if (locale.value !== 'zh')
    return true
  const slug = String(blog.route_id || blog.id || '').trim()
  return !zhMissingBlogRouteSet.has(`/zh/blog/${slug}`)
}

async function fetchBlogPageData(): Promise<BlogListResponse> {
  const params = new URLSearchParams({
    page: '1',
    limit: '2000',
    lang: blogApiLang.value,
  })

  if (searchQuery.value.trim())
    params.append('search', searchQuery.value.trim())

  if (selectedCategory.value && selectedCategory.value !== 'all') {
    const categoryOption = categoryOptions.find(option => option.key === selectedCategory.value)
    if (categoryOption)
      params.append('category', categoryOption.value)
  }

  const response = await $fetch<BlogListResponse>(`${blogApiUrl.value}?${params.toString()}`)
  const eligibleBlogs = (response?.blogs || []).filter(isAvailableInCurrentLocale)
  const totalCount = eligibleBlogs.length
  const totalPages = Math.max(1, Math.ceil(totalCount / itemsPerPage))

  if (currentPage.value > totalPages) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Blog page not found',
    })
  }

  const start = (currentPage.value - 1) * itemsPerPage
  return {
    blogs: eligibleBlogs.slice(start, start + itemsPerPage),
    pagination: {
      currentPage: currentPage.value,
      totalPages,
      totalCount,
      limit: itemsPerPage,
      hasNextPage: currentPage.value < totalPages,
      hasPrevPage: currentPage.value > 1,
    },
  }
}

// 每个分页 URL 在 SSR/预渲染阶段取得自己的文章切片，保证深层文章可由普通链接抓取。
const {
  data: blogsData,
  pending: loading,
  error,
  refresh: refreshBlogs,
} = await useAsyncData<BlogListResponse>(
  `blogs-page-v4-${blogApiLang.value}-${initialPage}`,
  fetchBlogPageData,
  {
    default: () => ({ blogs: [], pagination: { totalPages: 1, totalCount: 0 } }),
  },
)

const blogs = computed(() => blogsData.value?.blogs || [])
const pagination = computed(() => blogsData.value?.pagination || { totalPages: 1, totalCount: 0 })
const totalPages = computed(() => pagination.value?.totalPages || 1)

// 根据当前语言获取分类名称
function getCategoryName(categoryValue: string): string {
  // 根据中文分类值找到对应的翻译key
  const categoryOption = categoryOptions.find(option => option.value === categoryValue)
  if (categoryOption) {
    // 使用i18n翻译
    return getUiCategoryLabel(categoryOption.key)
  }
  // 如果找不到对应的翻译，直接返回原值
  return categoryValue
}

// 获取博客详情页路径
function getBlogDetailPath(blog: Blog): string {
  // 使用 localePath 确保路径包含正确的语言前缀
  // 只有当route_id存在时才使用route_id跳转，否则使用id
  const path = blog.route_id ? `/blog/${blog.route_id}` : `/blog/${blog.id}`
  return localePath(path)
}

const { data: categoriesData } = await useFetch(blogCategoriesApiUrl, {
  key: 'blog-categories-v2',
  default: () => ({ categories: [], categoryCounts: {} }),
  transform: (data: any) => data,
  // 添加缓存，10分钟内不重复请求（分类数据变化较少）
  getCachedData: (key, nuxtApp) => {
    const payloadData = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (payloadData)
      return payloadData

    if (import.meta.client) {
      const cached = sessionStorage.getItem(key)
      if (cached) {
        try {
          const { data, timestamp } = JSON.parse(cached)
          // 10分钟缓存
          if (Date.now() - timestamp < 10 * 60 * 1000) {
            return data
          }
        }
        catch {
          // 忽略缓存解析错误
        }
      }
    }
    return undefined
  },
  onResponse({ response }) {
    // 缓存响应数据
    if (import.meta.client && response._data) {
      try {
        sessionStorage.setItem('blog-categories-v2', JSON.stringify({
          data: response._data,
          timestamp: Date.now(),
        }))
      }
      catch {
        // 忽略存储错误
      }
    }
  },
})

// 分类列表
const categories = computed(() => {
  const apiCategories = categoriesData.value?.categories || []
  const validCategories = ['all'] // 先添加'全部'选项

  // 遍历API返回的分类，找到对应的key并添加到列表中
  if (Array.isArray(apiCategories)) {
    apiCategories.forEach((categoryValue: string) => {
      // 根据中文值找到对应的key
      const categoryOption = categoryOptions.find(option => option.value === categoryValue)
      if (categoryOption) {
        validCategories.push(categoryOption.key)
      }
    })
  }

  return validCategories
})

function toDisplayBlog(blog: Blog): DisplayBlog {
  return {
    id: blog.id,
    title: getDisplayBlogTitle(blog),
    excerpt: getBlogExcerpt(blog, 120),
    featuredExcerpt: getBlogExcerpt(blog, 180),
    categoryLabel: getCategoryName(blog.category),
    coverImgUrl: blog.cover_img_url,
    author: blog.reference_author || blogCopy.value.authorDefault,
    dateShort: formatDateShort(blog.created_at),
    detailPath: getBlogDetailPath(blog),
    raw: blog,
  }
}

const displayBlogs = computed(() => blogs.value.map(blog => toDisplayBlog(blog)))
const featuredBlog = computed(() => displayBlogs.value[0] || null)
const articleBlogs = computed(() => displayBlogs.value.slice(1))

async function refreshBlogData() {
  try {
    await refreshBlogs()
  }
  catch (err) {
    console.error('Error refreshing blogs:', err)
  }
}

function scrollToContent() {
  if (!import.meta.client)
    return

  const blogContent = document.querySelector('.blog-content-area') as HTMLElement | null
  if (!blogContent)
    return

  window.scrollTo({
    top: Math.max(blogContent.offsetTop - 100, 0),
    behavior: 'smooth',
  })
}

function selectCategory(category: string) {
  selectedCategory.value = category
}

function getPaginationPath(page: number): string {
  return localePath(page <= 1 ? '/blog' : `/blog/page/${page}`)
}

const visiblePaginationPages = computed(() =>
  Array.from(
    { length: Math.min(totalPages.value, 7) },
    (_, index) => index + Math.max(1, Math.min(currentPage.value - 3, Math.max(totalPages.value - 6, 1))),
  ),
)

async function navigateToPage(page: number) {
  const targetPage = Math.max(1, Math.min(totalPages.value, page))
  jumpToPage.value = targetPage
  if (targetPage === currentPage.value)
    return
  await navigateTo(getPaginationPath(targetPage))
}

async function jumpToPageHandler() {
  const page = Math.max(1, Math.min(totalPages.value, jumpToPage.value))
  await navigateToPage(page)
}

const blogListSchema = computed(() => {
  const list = blogs.value
  if (!Array.isArray(list) || list.length === 0)
    return null

  return buildBlogListSchema({
    name: blogCopy.value.meta.title,
    description: blogCopy.value.meta.description,
    baseUrl: siteUrl.value || undefined,
    locale: locale.value,
    path: currentBlogPath.value,
    items: list.slice(0, 10).map((blogItem, index) => ({
      name: getDisplayBlogTitle(blogItem),
      url: getBlogDetailPath(blogItem),
      position: (currentPage.value - 1) * itemsPerPage + index + 1,
      description: getBlogExcerpt(blogItem, 155),
      image: blogItem.cover_img_url,
      datePublished: blogItem.created_at,
    })),
  })
})

const blogPageSchema = computed(() => buildWebPageSchema({
  baseUrl: siteUrl.value || undefined,
  url: currentBlogPath.value,
  name: pageMetaTitle.value,
  description: blogCopy.value.meta.description,
  about: blogCopy.value.directAnswer,
  audience: locale.value === 'zh'
    ? ['准父母', '代孕妈妈', '代孕资讯读者']
    : ['Intended parents', 'Surrogate candidates', 'Surrogacy information readers'],
  dateModified,
  reviewedBy: { '@id': reviewerId.value },
  locale: locale.value,
}))

useHead(() => ({
  script: [
    {
      key: 'schema-blog-page',
      type: 'application/ld+json',
      children: JSON.stringify(blogPageSchema.value),
    },
    ...(blogListSchema.value
      ? [
          {
            key: 'schema-blog-list',
            type: 'application/ld+json',
            children: JSON.stringify(blogListSchema.value),
          },
        ]
      : []),
  ],
}))

// 清除筛选
function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'all'
  scrollToContent()
}

watch(searchQuery, () => {
  if (searchDebounceTimer)
    clearTimeout(searchDebounceTimer)

  searchDebounceTimer = setTimeout(async () => {
    jumpToPage.value = 1
    if (currentPage.value !== 1)
      await navigateTo(getPaginationPath(1))
    else
      await refreshBlogData()
    scrollToContent()
  }, 300)
})

watch(selectedCategory, async () => {
  jumpToPage.value = 1
  if (currentPage.value !== 1)
    await navigateTo(getPaginationPath(1))
  else
    await refreshBlogData()
  scrollToContent()
})

watch(() => route.params.page, async (pageParam) => {
  currentPage.value = parseRoutePage(pageParam)
  jumpToPage.value = currentPage.value
  await refreshBlogData()
  scrollToContent()
})

onBeforeUnmount(() => {
  if (searchDebounceTimer)
    clearTimeout(searchDebounceTimer)
})

// 格式化短日期
function formatDateShort(dateString: string) {
  if (!dateString)
    return ''

  const date = new Date(dateString)

  // 服务端统一使用英文格式，客户端根据语言选择格式
  // 这样可以避免 hydration 错误
  const currentLocale = import.meta.client ? locale.value : 'en'

  if (currentLocale === 'en') {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    })
  }
  else {
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
    })
  }
}
</script>

<template>
  <div>
    <AppHeader />

    <!-- 博客页面主体 -->
    <div class="min-h-screen bg-[var(--yunda-petal)] pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <!-- 顶部：标题说明 + 分类 tabs + 搜索 -->
      <section class="blog-content-area mx-auto max-w-[1400px] px-5 pb-8 pt-14 lg:px-8 lg:pb-12 lg:pt-20">
        <div class="max-w-[1200px]">
          <h1 class="mb-5 text-[48px] text-[var(--yunda-bark)] font-extrabold leading-none tracking-normal md:text-[56px]" style="font-family: var(--font-text)">
            {{ blogCopy.title }}
          </h1>
        </div>

        <div class="mt-8 rounded-[18px] border border-[var(--yunda-bark)]/10 bg-white/78 p-5 shadow-[0_12px_30px_rgba(55,40,25,0.06)] lg:p-7">
          <p class="mb-3 text-xs text-[var(--yunda-maple)] font-extrabold uppercase tracking-[0.16em]">
            {{ locale === 'zh' ? '直接答案' : 'Direct answer' }}
          </p>
          <h2 class="font-display text-[28px] text-[var(--yunda-bark)] font-semibold leading-[1.12] lg:text-[36px]">
            {{ blogCopy.directAnswerTitle }}
          </h2>
          <p class="mt-4 max-w-5xl text-base text-[var(--yunda-bark)]/82 leading-[1.75]" style="font-family: var(--font-text)">
            {{ blogCopy.directAnswer }}
          </p>
        </div>

        <div class="mt-5 grid gap-4 md:grid-cols-3">
          <article
            v-for="item in blogCopy.trustCards"
            :key="item.title"
            class="rounded-[16px] border border-[var(--yunda-bark)]/10 bg-white/72 p-5 shadow-[0_8px_24px_rgba(55,40,25,0.05)]"
          >
            <h3 class="font-display text-[22px] text-[var(--yunda-bark)] font-semibold leading-snug">
              {{ item.title }}
            </h3>
            <p class="mt-3 text-sm text-[var(--yunda-bark)]/78 leading-[1.75]" style="font-family: var(--font-text)">
              {{ item.body }}
            </p>
          </article>
        </div>

        <div class="mt-8">
          <SeoTrustNote
            :updated="locale === 'zh' ? '最后更新：2026年6月30日' : 'Last updated: June 30, 2026'"
            :reviewed-by="locale === 'zh' ? 'Kayla Luo（北美区副总裁）审阅' : 'Reviewed by Kayla Luo, Vice President, North America'"
            :note="locale === 'zh' ? '博客内容用于教育和准备咨询问题。涉及法律、医疗、保险、托管或 IVF 决定时，请阅读对应专题页并咨询合格专业人士。' : 'Blog content is for education and consultation preparation. For legal, medical, insurance, escrow, or IVF decisions, read the relevant topic guide and consult qualified professionals.'"
            :sources="[
              { label: locale === 'zh' ? '准父母指南' : 'Intended parent hub', href: localePath('/intended-parents') },
              { label: locale === 'zh' ? '代孕妈妈指南' : 'Surrogate hub', href: localePath('/surrogates') },
              { label: locale === 'zh' ? '关于团队' : 'About Yunda', href: localePath('/about') },
              { label: locale === 'zh' ? '免责声明' : 'Disclaimer', href: localePath('/disclaimer') },
            ]"
          />
        </div>

        <div class="mt-16 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-[4fr_1fr] lg:items-start xl:grid-cols-[5fr_1fr]">
          <div class="min-w-0">
            <div class="flex gap-x-4 gap-y-6 overflow-x-auto pb-2 -mx-5 px-5 lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0 xl:gap-x-6">
              <button
                v-for="category in categories"
                :key="category"
                class="min-h-[64px] shrink-0 touch-manipulation border-b px-3 text-lg font-extrabold leading-tight transition-colors md:px-4 lg:min-w-[0]"
                :class="[
                  selectedCategory === category
                    ? 'border-[var(--yunda-bark)] bg-[var(--yunda-bark)] text-[var(--yunda-petal)]'
                    : 'border-[var(--yunda-maple)] bg-transparent text-[var(--yunda-bark)]/80 active:text-[var(--yunda-maple)] lg:hover:text-[var(--yunda-maple)]',
                ]"
                style="font-family: var(--font-text)"
                @click="selectCategory(category)"
              >
                {{ getUiCategoryLabel(category) }}
              </button>
            </div>

            <div
              v-if="searchQuery || selectedCategory !== 'all'"
              class="pt-4"
            >
              <button
                class="rounded-md px-3 py-2 text-sm text-[var(--yunda-maple)] font-semibold transition-colors active:bg-white/70 lg:hover:bg-white/70"
                @click="clearFilters"
              >
                {{ blogCopy.clearFilters }}
              </button>
            </div>
          </div>

          <div class="w-full">
            <label class="sr-only" for="blog-search-input">{{ blogCopy.search.title }}</label>
            <div class="relative">
              <input
                id="blog-search-input"
                v-model="searchQuery"
                type="text"
                :placeholder="blogCopy.search.placeholder"
                class="h-[58px] w-full rounded-full border border-[var(--yunda-bark)]/20 bg-white py-4 pl-6 pr-14 text-base text-[var(--yunda-bark)] outline-none transition placeholder:text-[var(--yunda-bark)]/35 focus:border-[var(--yunda-maple)] focus:ring-4 focus:ring-[var(--yunda-maple)]/10"
                style="font-family: var(--font-text)"
              >
              <svg
                class="pointer-events-none absolute right-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--yunda-bark)]/35"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="3"
                  d="M21 21l-5.2-5.2m1.7-5.1a6.8 6.8 0 11-13.6 0 6.8 6.8 0 0113.6 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      <!-- 内容：Featured + 文章网格 -->
      <div class="mx-auto max-w-[1400px] px-5 py-7 lg:px-8 lg:py-10">
        <div>
          <div v-if="loading" class="py-12 text-center">
            <div class="inline-block h-8 w-8 animate-spin border-b-2 border-[var(--yunda-bark)] rounded-full" />
            <p class="mt-4 text-[var(--yunda-bark)]/75">
              {{ blogCopy.loading }}
            </p>
          </div>

          <div v-else-if="error" class="py-12 text-center">
            <div class="text-lg text-red-500">
              {{ error }}
            </div>
            <button
              class="mt-4 rounded-lg bg-[var(--yunda-bark)] px-6 py-2 text-[var(--yunda-petal)] transition-opacity hover:opacity-95"
              @click="refreshBlogData"
            >
              {{ blogCopy.retry }}
            </button>
          </div>

          <div v-else-if="displayBlogs.length" class="space-y-10">
            <article
              v-if="featuredBlog"
              class="group overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
            >
              <NuxtLink
                :to="featuredBlog.detailPath"
                prefetch
                class="grid cursor-pointer lg:grid-cols-[1.05fr_0.95fr]"
              >
                <div class="aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[330px]">
                  <img
                    v-if="featuredBlog.coverImgUrl"
                    :src="featuredBlog.coverImgUrl"
                    :alt="featuredBlog.title"
                    class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    width="760"
                    height="480"
                    sizes="(min-width: 1024px) 52vw, 100vw"
                    loading="eager"
                    fetchpriority="high"
                    decoding="async"
                  >
                  <div
                    v-else
                    class="h-full min-h-[260px] w-full from-[var(--yunda-bark)]/20 to-[var(--yunda-harvest)]/20 bg-gradient-to-br"
                  />
                </div>

                <div class="flex flex-col justify-center p-5 lg:p-8">
                  <div class="mb-3">
                    <span class="inline-block rounded-full bg-[var(--yunda-petal)] px-3 py-1 text-xs text-[var(--yunda-maple)] font-semibold" style="font-family: var(--font-text)">
                      {{ featuredBlog.categoryLabel }}
                    </span>
                  </div>
                  <div class="mb-3 text-sm text-[var(--yunda-bark)]/65 font-semibold" style="font-family: var(--font-text)">
                    {{ featuredBlog.dateShort }}
                  </div>
                  <h2 class="line-clamp-3 mb-4 text-[22px] text-[var(--yunda-bark)] font-bold leading-tight transition-colors group-hover:text-[var(--yunda-maple)]" style="font-family: var(--font-display)">
                    {{ featuredBlog.title }}
                  </h2>
                  <p class="line-clamp-3 mb-5 text-[15px] text-[var(--yunda-bark)]/78 leading-[1.7]" style="font-family: var(--font-text)">
                    {{ featuredBlog.featuredExcerpt }}
                  </p>
                  <div class="text-[var(--yunda-maple)] font-bold" style="font-family: var(--font-text)">
                    {{ blogCopy.readMore }}
                  </div>
                </div>
              </NuxtLink>
            </article>

            <div
              v-if="articleBlogs.length"
              class="grid grid-cols-1 gap-5 lg:grid-cols-3 md:grid-cols-2"
            >
              <article
                v-for="blog in articleBlogs"
                :key="blog.id"
                class="group overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
              >
                <NuxtLink
                  :to="blog.detailPath"
                  prefetch
                  class="h-full flex flex-col cursor-pointer"
                >
                  <div class="aspect-[16/11] overflow-hidden">
                    <img
                      v-if="blog.coverImgUrl"
                      :src="blog.coverImgUrl"
                      :alt="blog.title"
                      class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      width="420"
                      height="315"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      loading="lazy"
                      decoding="async"
                    >
                    <div
                      v-else
                      class="h-full w-full from-[var(--yunda-bark)]/20 to-[var(--yunda-harvest)]/20 bg-gradient-to-br"
                    />
                  </div>

                  <div class="flex flex-1 flex-col p-4">
                    <div class="mb-2">
                      <span class="inline-block rounded-full bg-[var(--yunda-petal)] px-3 py-1 text-xs text-[var(--yunda-maple)] font-semibold" style="font-family: var(--font-text)">
                        {{ blog.categoryLabel }}
                      </span>
                    </div>
                    <div class="mb-2 text-xs text-[var(--yunda-bark)]/70 font-semibold" style="font-family: var(--font-text)">
                      {{ blog.dateShort }}
                    </div>
                    <h2 class="line-clamp-2 mb-3 text-[22px] text-[var(--yunda-bark)] font-bold leading-snug transition-colors group-hover:text-[var(--yunda-maple)]" style="font-family: var(--font-display)">
                      {{ blog.title }}
                    </h2>
                    <p class="line-clamp-3 mb-4 text-[15px] text-[var(--yunda-bark)]/78 leading-[1.7]" style="font-family: var(--font-text)">
                      {{ blog.excerpt }}
                    </p>
                    <div class="mt-auto flex items-center justify-between text-xs text-[var(--yunda-bark)]/60">
                      <span>{{ blog.author }}</span>
                      <span class="text-[var(--yunda-maple)] font-bold">{{ blogCopy.readMore }}</span>
                    </div>
                  </div>
                </NuxtLink>
              </article>
            </div>

            <div
              v-if="totalPages > 1"
              class="mt-12 flex flex-col items-center space-y-4"
            >
              <div class="text-sm text-[var(--yunda-bark)]/75">
                {{ blogCopy.pagination.showing }} {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, pagination?.totalCount || 0) }} {{ blogCopy.pagination.of }} {{ pagination?.totalCount || 0 }} {{ blogCopy.pagination.results }}
              </div>

              <nav class="flex items-center space-x-1" :aria-label="blogCopy.pagination.goTo">
                <NuxtLink
                  :to="getPaginationPath(1)"
                  class="border border-[var(--yunda-bark)]/25 rounded-l-lg bg-white px-3 py-2 text-sm text-[var(--yunda-bark)]/60 font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--yunda-maple)_8%,var(--yunda-petal)_92%)] hover:text-[var(--yunda-bark)]"
                  :class="{ 'pointer-events-none opacity-50': currentPage === 1 }"
                  :aria-disabled="currentPage === 1"
                >
                  {{ blogCopy.pagination.first }}
                </NuxtLink>
                <NuxtLink
                  :to="getPaginationPath(Math.max(1, currentPage - 1))"
                  :rel="currentPage > 1 ? 'prev' : undefined"
                  class="border-b border-t border-[var(--yunda-bark)]/25 bg-white px-3 py-2 text-sm text-[var(--yunda-bark)]/60 font-medium transition-colors disabled:cursor-not-allowed hover:bg-[color-mix(in_srgb,var(--yunda-maple)_8%,var(--yunda-petal)_92%)] hover:text-[var(--yunda-bark)] disabled:opacity-50"
                  :class="{ 'pointer-events-none opacity-50': currentPage === 1 }"
                  :aria-disabled="currentPage === 1"
                >
                  ‹
                </NuxtLink>
                <NuxtLink
                  v-for="page in visiblePaginationPages"
                  :key="page"
                  :to="getPaginationPath(page)"
                  class="border-b border-t px-3 py-2 text-sm font-medium transition-colors"
                  :class="[
                    currentPage === page
                      ? 'border-[var(--yunda-bark)] bg-[var(--yunda-bark)] text-[var(--yunda-petal)]'
                      : 'border-[var(--yunda-bark)]/25 bg-white text-[var(--yunda-bark)]/60 hover:bg-[color-mix(in_srgb,var(--yunda-maple)_8%,var(--yunda-petal)_92%)] hover:text-[var(--yunda-bark)]',
                  ]"
                  :aria-current="currentPage === page ? 'page' : undefined"
                >
                  {{ page }}
                </NuxtLink>
                <NuxtLink
                  :to="getPaginationPath(Math.min(totalPages, currentPage + 1))"
                  :rel="currentPage < totalPages ? 'next' : undefined"
                  class="border-b border-t border-[var(--yunda-bark)]/25 bg-white px-3 py-2 text-sm text-[var(--yunda-bark)]/60 font-medium transition-colors disabled:cursor-not-allowed hover:bg-[color-mix(in_srgb,var(--yunda-maple)_8%,var(--yunda-petal)_92%)] hover:text-[var(--yunda-bark)] disabled:opacity-50"
                  :class="{ 'pointer-events-none opacity-50': currentPage === totalPages }"
                  :aria-disabled="currentPage === totalPages"
                >
                  ›
                </NuxtLink>
                <NuxtLink
                  :to="getPaginationPath(totalPages)"
                  class="border border-[var(--yunda-bark)]/25 rounded-r-lg bg-white px-3 py-2 text-sm text-[var(--yunda-bark)]/60 font-medium transition-colors disabled:cursor-not-allowed hover:bg-[color-mix(in_srgb,var(--yunda-maple)_8%,var(--yunda-petal)_92%)] hover:text-[var(--yunda-bark)] disabled:opacity-50"
                  :class="{ 'pointer-events-none opacity-50': currentPage === totalPages }"
                  :aria-disabled="currentPage === totalPages"
                >
                  {{ blogCopy.pagination.last }}
                </NuxtLink>
              </nav>

              <div class="flex items-center text-sm space-x-2">
                <span class="text-[var(--yunda-bark)]/75">{{ blogCopy.pagination.goTo }}</span>
                <input
                  v-model.number="jumpToPage"
                  type="number"
                  :min="1"
                  :max="totalPages"
                  class="w-16 border border-[var(--yunda-bark)]/25 rounded px-2 py-1 text-center focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[var(--yunda-bark)]"
                  @keyup.enter="jumpToPageHandler"
                >
                <button
                  class="rounded bg-[var(--yunda-bark)] px-3 py-1 text-sm text-[var(--yunda-petal)] transition-opacity hover:opacity-95"
                  @click="jumpToPageHandler"
                >
                  {{ blogCopy.pagination.go }}
                </button>
              </div>
            </div>
          </div>

          <div v-else class="py-12 text-center">
            <div class="mb-4 text-6xl">
              📭
            </div>
            <h3 class="mb-2 text-xl text-[var(--yunda-bark)] font-bold font-sans" style="font-family: var(--font-text)">
              {{ blogCopy.noResults.title }}
            </h3>
            <p class="text-[var(--yunda-bark)]/75">
              {{ blogCopy.noResults.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Desktop Bottom CTA -->
      <section class="hidden px-4 pb-12 md:block">
        <div class="mx-auto max-w-[1400px]">
          <div class="grid grid-cols-2 gap-4">
            <NuxtLink
              :to="localePath('/be-parents')"
              class="yunda-type-button inline-flex items-center justify-center rounded-xl bg-[var(--yunda-bark)] px-6 py-4 text-center text-[var(--yunda-petal)] tracking-[0.02em] transition hover:opacity-90"
            >
              {{ ctaCopy.parent }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/be-surrogate')"
              class="yunda-type-button inline-flex items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--yunda-harvest)_70%,var(--yunda-petal)_30%)] px-6 py-4 text-center text-[var(--yunda-bark)] tracking-[0.02em] transition hover:opacity-95"
            >
              {{ ctaCopy.surrogate }}
            </NuxtLink>
          </div>
        </div>
      </section>
    </div>

    <!-- Mobile Fixed Bottom CTA -->
    <div class="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--yunda-bark)]/15 bg-[var(--yunda-petal)] pb-[env(safe-area-inset-bottom)] md:hidden">
      <div class="grid grid-cols-2 gap-px bg-[var(--yunda-bark)]/10">
        <NuxtLink
          :to="localePath('/be-parents')"
          class="yunda-type-button flex items-center justify-center bg-[var(--yunda-bark)] px-3 py-3 text-center text-[var(--yunda-petal)]"
        >
          {{ ctaCopy.parent }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/be-surrogate')"
          class="yunda-type-button flex items-center justify-center bg-[color-mix(in_srgb,var(--yunda-harvest)_70%,var(--yunda-petal)_30%)] px-3 py-3 text-center text-[var(--yunda-bark)]"
        >
          {{ ctaCopy.surrogate }}
        </NuxtLink>
      </div>
    </div>

    <div class="pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <AppFooter />
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { buildBlogPostingSchema, buildBreadcrumbListSchema, buildFAQPageSchema, buildWebPageSchema } from '~/utils/schema'
import AppFooter from '../../components/base/AppFooter.vue'
import AppHeader from '../../components/base/AppHeader.vue'

const { locale } = useI18n()
const route = useRoute()
const router = useRouter()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const nuxtApp = useNuxtApp()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const resolvedSiteUrl = computed(() => siteUrl.value || 'https://www.yundasurrogacy.com')
const apiBase = computed(() => (runtimeConfig.public.apiBase || 'https://yunda-admin-system.yundasurrogacy.com').replace(/\/$/, ''))

const blogCopyEn = {
  meta: {
    title: 'Surrogacy Knowledge Blog - Yunda Surrogacy | Professional Surrogacy Information & Experience Sharing',
    description: 'Yunda Surrogacy knowledge blog sharing professional surrogacy information, success stories, medical knowledge, legal regulations, and more to help intended parents and surrogate mothers learn about surrogacy.',
  },
  categories: {
    all: 'All',
    categoryRelatedToSurrogate: 'Surrogate Related',
    categoryRelatedToParents: 'Intended Parents Related',
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
  tagsTitle: 'Related Tags',
  loading: 'Loading...',
  backToList: 'Back to Blog List',
  detailNoContent: 'No content available',
}

const blogCopyZh = {
  meta: {
    title: '代孕知识博客 - 孕达代孕 | 专业代孕资讯与经验分享',
    description: '孕达代孕知识博客，分享专业的代孕资讯、成功案例、医学知识、法律法规等，帮助准父母和代孕妈妈了解更多代孕相关信息。',
  },
  categories: {
    all: '全部',
    categoryRelatedToSurrogate: '代孕妈妈相关',
    categoryRelatedToParents: '准父母相关',
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
  tagsTitle: '相关标签',
  loading: '加载中...',
  backToList: '返回博客列表',
  detailNoContent: '暂无内容',
}

const blogCopy = computed(() => (locale.value === 'zh' ? blogCopyZh : blogCopyEn))
const ctaCopy = computed(() => ({
  parent: locale.value === 'zh' ? '开启您的育儿之旅' : 'Become a Intended Parent',
  surrogate: locale.value === 'zh' ? '开启代孕之旅' : 'Become a Surrogate',
}))

function getUiCategoryLabel(key: keyof typeof blogCopyEn.categories | string) {
  // Explicitly check if the key exists in the categories object to fix TS error
  return Object.prototype.hasOwnProperty.call(blogCopy.value.categories, key)
    ? blogCopy.value.categories[key as keyof typeof blogCopyEn.categories]
    : key
}

interface Blog {
  id: number
  route_id?: string
  title: string
  content?: string
  en_title?: string
  en_content?: string
  category: string
  cover_img_url: string
  tags: string
  reference_author: string
  created_at: string
  updated_at: string
}

const blogApiLang = computed(() => (locale.value === 'zh' ? 'zh' : 'en'))
const blogCacheKey = computed(() => `blog-${route.params.id}-${blogApiLang.value}`)
const blogApiUrl = computed(() => {
  const routeId = encodeURIComponent(String(route.params.id))
  return `${apiBase.value}/api/blog?route_id=${routeId}&lang=${blogApiLang.value}`
})

// 获取博客详情数据，支持缓存和预加载
// 首先尝试通过route_id查询，如果失败则通过id查询
const { data: blog, pending: loading, error } = await useFetch(blogApiUrl, {
  key: blogCacheKey.value,
  server: true, // 保持服务端渲染以支持 SEO
  default: () => null,
  // 添加客户端缓存，10分钟内不重复请求
  getCachedData: (key) => {
    const payloadData = nuxtApp.payload.data[key] || nuxtApp.static.data[key]
    if (payloadData) {
      return payloadData
    }

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
        sessionStorage.setItem(blogCacheKey.value, JSON.stringify({
          data: response._data,
          timestamp: Date.now(),
        }))
      }
      catch {
        // 忽略存储错误
      }
    }
  },
  transform: async (data: any) => {
    if (data && typeof data === 'object' && 'id' in data && 'title' in data) {
      return data as Blog
    }
    // 如果通过route_id查询失败，尝试通过id查询
    try {
      const fallbackResponse = await $fetch(`${apiBase.value}/api/blog?id=${encodeURIComponent(String(route.params.id))}&lang=${blogApiLang.value}`)
      if (fallbackResponse && typeof fallbackResponse === 'object' && 'id' in fallbackResponse && 'title' in fallbackResponse) {
        return fallbackResponse as Blog
      }
    }
    catch (e) {
      console.error('Fallback query failed:', e)
    }
    return null
  },
})

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

// 根据当前语言获取博客标题
function getBlogTitle(blogData: Blog | null): string {
  if (!blogData)
    return ''

  if (locale.value === 'zh') {
    // 中文时：优先中文，再是英文
    return blogData.title || blogData.en_title || ''
  }
  else {
    // 英文时：优先英文，再是中文
    return blogData.en_title || blogData.title || ''
  }
}

// 根据当前语言获取博客内容
function getBlogContent(blogData: Blog | null): string {
  if (!blogData)
    return ''

  if (locale.value === 'zh') {
    // 中文时：优先中文，再是英文
    return blogData.content || blogData.en_content || ''
  }
  else {
    // 英文时：优先英文，再是中文
    return blogData.en_content || blogData.content || ''
  }
}

function escapeHtmlAttribute(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function addMissingImageAlt(html: string, title: string): string {
  if (!html)
    return ''

  let imageIndex = 0
  const baseAlt = title
    ? `${locale.value === 'zh' ? '代孕文章配图' : 'Surrogacy article image'}: ${title}`
    : (locale.value === 'zh' ? '代孕文章配图' : 'Surrogacy article image')

  return html.replace(/<img\b([^>]*)>/gi, (tag, attrs: string) => {
    const altMatch = attrs.match(/\salt\s*=\s*(['"])([\s\S]*?)\1/i)
    let nextAttrs = attrs

    if (!altMatch?.[2]?.trim()) {
      imageIndex += 1
      const alt = imageIndex > 1 ? `${baseAlt} ${imageIndex}` : baseAlt
      nextAttrs = altMatch
        ? attrs.replace(altMatch[0], ` alt="${escapeHtmlAttribute(alt)}"`)
        : `${attrs} alt="${escapeHtmlAttribute(alt)}"`
    }

    return `<img${ensureImagePerformanceAttrs(nextAttrs)}>`
  })
}

function ensureAttribute(attrs: string, name: string, value: string): string {
  const attrPattern = new RegExp(`\\s${name}\\s*=`, 'i')
  return attrPattern.test(attrs) ? attrs : `${attrs} ${name}="${value}"`
}

function ensureImagePerformanceAttrs(attrs: string): string {
  return [
    ['loading', 'lazy'],
    ['decoding', 'async'],
    ['referrerpolicy', 'no-referrer-when-downgrade'],
  ].reduce((nextAttrs, [name, value]) => ensureAttribute(nextAttrs, name, value), attrs)
}

function sanitizeBlogHtml(html: string): string {
  if (!html)
    return ''

  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s(?:href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\1/gi, '')
}

const renderedBlogContent = computed(() =>
  blog.value
    ? addMissingImageAlt(sanitizeBlogHtml(getBlogContent(blog.value)), getBlogTitle(blog.value))
    : '',
)

interface ExtractedFAQ {
  question: string
  answer: string
}

interface StructuredBlogContent {
  bodyText: string
  articleBody: string
  summary: string
  wordCount: number
  images: string[]
  headings: string[]
  faqs: ExtractedFAQ[]
}

function decodeHtmlEntities(value: string): string {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&rsquo;/g, '’')
    .replace(/&lsquo;/g, '‘')
    .replace(/&rdquo;/g, '”')
    .replace(/&ldquo;/g, '“')
    .replace(/&mdash;/g, '—')
    .replace(/&ndash;/g, '–')
}

function htmlToPlainText(html: string): string {
  if (!html)
    return ''

  return decodeHtmlEntities(html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<(br|\/p|\/li|\/h[1-6]|\/div|\/section)\b[^>]*>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim())
}

function truncateText(text: string, maxLength: number): string {
  const chars = Array.from(text.replace(/\s+/g, ' ').trim())
  if (chars.length <= maxLength)
    return chars.join('')

  return chars.slice(0, maxLength).join('').trim()
}

function getHtmlAttribute(attrs: string, name: string): string {
  const match = attrs.match(new RegExp(`\\s${name}\\s*=\\s*(['"])([\\s\\S]*?)\\1`, 'i'))
  return match?.[2] ? decodeHtmlEntities(match[2]).trim() : ''
}

function uniqueValues(values: string[]): string[] {
  return Array.from(new Set(values.filter(Boolean)))
}

function extractImagesFromHtml(html: string): string[] {
  return uniqueValues([...html.matchAll(/<img\b([^>]*)>/gi)]
    .map(match => getHtmlAttribute(match[1], 'src'))
    .filter(src => /^https?:\/\//i.test(src)))
}

function extractHeadingsFromHtml(html: string): string[] {
  return uniqueValues([...html.matchAll(/<h([2-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .map(match => htmlToPlainText(match[2]))
    .filter(heading => heading.length >= 3 && !/^(faq|常见问题|问答)$/i.test(heading))
    .slice(0, 8))
}

function isFaqHeading(text: string): boolean {
  return /\bfaq\b|frequently asked questions|常见问题|问答/i.test(text)
}

function looksLikeQuestion(text: string): boolean {
  return /[?？]$/.test(text)
    || /^(do|does|did|can|could|is|are|was|were|will|would|should|what|when|where|why|how)\b/i.test(text)
    || /^(什么|如何|怎么|为什么|是否|能否|可以|需要|多久|多少)/.test(text)
}

function extractFaqsFromHtml(html: string): ExtractedFAQ[] {
  const faqHeadingMatch = [...html.matchAll(/<h([2-4])\b[^>]*>([\s\S]*?)<\/h\1>/gi)]
    .find(match => isFaqHeading(htmlToPlainText(match[2])))

  if (faqHeadingMatch?.index === undefined)
    return []

  const afterFaqHeading = html.slice(faqHeadingMatch.index + faqHeadingMatch[0].length)
  const nextMajorHeadingIndex = afterFaqHeading.search(/<h[12]\b[^>]*>/i)
  const faqHtml = nextMajorHeadingIndex >= 0 ? afterFaqHeading.slice(0, nextMajorHeadingIndex) : afterFaqHeading
  const blocks = [...faqHtml.matchAll(/<(h[3-5]|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map(match => ({
      tag: match[1].toLowerCase(),
      text: htmlToPlainText(match[2]),
    }))
    .filter(block => block.text)

  const faqs: ExtractedFAQ[] = []
  let currentQuestion = ''
  let answerParts: string[] = []

  function pushCurrentFaq() {
    const answer = answerParts.join(' ').replace(/\s+/g, ' ').trim()
    if (currentQuestion && answer.length >= 8) {
      faqs.push({
        question: currentQuestion,
        answer: truncateText(answer, 500),
      })
    }
    currentQuestion = ''
    answerParts = []
  }

  blocks.forEach((block) => {
    const isQuestionBlock = /^h[3-5]$/.test(block.tag) || looksLikeQuestion(block.text)
    if (isQuestionBlock) {
      pushCurrentFaq()
      currentQuestion = block.text
      return
    }

    if (currentQuestion)
      answerParts.push(block.text)
  })

  pushCurrentFaq()

  return faqs
    .filter(faq => faq.question.length >= 8 && faq.answer.length >= 8)
    .slice(0, 6)
}

function extractStructuredBlogContent(html: string): StructuredBlogContent {
  const bodyText = htmlToPlainText(html)
  const words = bodyText.match(/[\p{L}\p{N}]+/gu) || []

  return {
    bodyText,
    articleBody: truncateText(bodyText, 1200),
    summary: truncateText(bodyText, 155),
    wordCount: words.length,
    images: extractImagesFromHtml(html),
    headings: extractHeadingsFromHtml(html),
    faqs: extractFaqsFromHtml(html),
  }
}

const structuredBlogContent = computed(() =>
  extractStructuredBlogContent(renderedBlogContent.value),
)

// 提取纯文本摘要（去除HTML标签）
function getBlogExcerpt(blogData: Blog | null, maxLength: number = 155): string {
  const content = blogData === blog.value ? structuredBlogContent.value.bodyText : htmlToPlainText(getBlogContent(blogData))

  // 截取指定长度
  return truncateText(content, maxLength)
}
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

// 格式化日期
function formatDate(dateString: string) {
  if (!dateString)
    return ''
  const date = new Date(dateString)

  // 根据当前语言选择日期格式
  if (locale.value === 'en') {
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
  else {
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
}

// 返回博客列表
function goBack() {
  router.push(localePath('/blog'))
}

const blogPostingSchema = computed(() => {
  if (!blog.value)
    return null

  const blogUrl = blog.value.route_id ? `/blog/${blog.value.route_id}` : `/blog/${blog.value.id}`
  const localizedBlogUrl = localePath(blogUrl)
  const baseUrl = resolvedSiteUrl.value
  const pageUrl = currentBlogUrl.value
  const pageId = `${pageUrl}#webpage`
  const articleId = `${pageUrl}#article`
  const blogId = `${resolvedSiteUrl.value}${localePath('/blog')}#blog`
  const organizationId = `${resolvedSiteUrl.value}/#organization`
  const websiteId = `${resolvedSiteUrl.value}/#website`
  const authorName = blog.value.reference_author || blogCopy.value.authorDefault

  return buildBlogPostingSchema({
    title: getBlogTitle(blog.value),
    description: structuredBlogContent.value.summary,
    articleBody: structuredBlogContent.value.articleBody,
    image: uniqueValues([blog.value.cover_img_url, ...structuredBlogContent.value.images]).slice(0, 6),
    url: localizedBlogUrl,
    baseUrl,
    locale: locale.value,
    author: authorName,
    authorType: authorName === blogCopy.value.authorDefault ? 'Organization' : 'Person',
    datePublished: blog.value.created_at,
    dateModified: blog.value.updated_at,
    keywords: uniqueValues([
      ...(blog.value.tags ? blog.value.tags.split('|').map(tag => tag.trim()).filter(Boolean) : []),
      ...structuredBlogContent.value.headings.slice(0, 4),
    ]),
    category: getCategoryName(blog.value.category),
    wordCount: structuredBlogContent.value.wordCount,
    articleId,
    pageId,
    blogId,
    organizationId,
    websiteId,
    includeContext: false,
  })
})

const currentBlogUrl = computed(() => {
  if (!blog.value)
    return `${resolvedSiteUrl.value}${localePath('/blog')}`

  const blogPath = blog.value.route_id ? `/blog/${blog.value.route_id}` : `/blog/${blog.value.id}`
  return `${resolvedSiteUrl.value}${localePath(blogPath)}`
})

const currentBlogTitle = computed(() => blog.value ? getBlogTitle(blog.value) : blogCopy.value.meta.title)
const currentBlogDescription = computed(() =>
  blog.value ? getBlogExcerpt(blog.value, 155) : truncateMetaDescription(blogCopy.value.meta.description),
)
const currentBlogImage = computed(() => blog.value?.cover_img_url || `${resolvedSiteUrl.value}/images/home/index-bg.webp`)

const blogStructuredData = computed(() => {
  if (!blog.value || !blogPostingSchema.value)
    return null

  const blogPath = blog.value.route_id ? `/blog/${blog.value.route_id}` : `/blog/${blog.value.id}`
  const baseUrl = resolvedSiteUrl.value
  const pageUrl = currentBlogUrl.value
  const pageId = `${pageUrl}#webpage`
  const organizationId = `${resolvedSiteUrl.value}/#organization`
  const websiteId = `${resolvedSiteUrl.value}/#website`
  const breadcrumbSchema = buildBreadcrumbListSchema({
    baseUrl,
    includeContext: false,
    items: [
      { name: locale.value === 'zh' ? '首页' : 'Home', url: localePath('/') },
      { name: locale.value === 'zh' ? '博客' : 'Blog', url: localePath('/blog') },
      { name: getBlogTitle(blog.value), url: localePath(blogPath) },
    ],
  })
  const webpageSchema = buildWebPageSchema({
    baseUrl,
    url: localePath(blogPath),
    pageId,
    organizationId,
    websiteId,
    name: getBlogTitle(blog.value),
    description: getBlogExcerpt(blog.value, 155),
    about: getCategoryName(blog.value.category),
    audience: locale.value === 'zh'
      ? ['准父母', '代孕妈妈', '代孕资讯读者']
      : ['Intended parents', 'Surrogates', 'Surrogacy information readers'],
    locale: locale.value,
  })
  const { '@context': _webpageContext, ...webpageNode } = webpageSchema
  const graphNodes = [
    webpageNode,
    blogPostingSchema.value,
    breadcrumbSchema,
  ]

  if (structuredBlogContent.value.faqs.length >= 2) {
    const faqSchema = buildFAQPageSchema({
      baseUrl,
      url: localePath(blogPath),
      name: `${getBlogTitle(blog.value)} FAQ`,
      description: structuredBlogContent.value.summary,
      faqs: structuredBlogContent.value.faqs,
      locale: locale.value,
    })
    const { '@context': _faqContext, ...faqNode } = faqSchema
    graphNodes.push(faqNode)
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  }
})

// SEO 配置
useHead(() => ({
  title: currentBlogTitle.value,
  meta: [
    {
      name: 'description',
      content: currentBlogDescription.value,
    },
    {
      property: 'og:title',
      content: currentBlogTitle.value,
    },
    {
      property: 'og:description',
      content: currentBlogDescription.value,
    },
    {
      property: 'og:type',
      content: 'article',
    },
    {
      property: 'og:url',
      content: currentBlogUrl.value,
    },
    {
      property: 'og:image',
      content: currentBlogImage.value,
    },
    {
      property: 'article:published_time',
      content: blog.value?.created_at || '',
    },
    {
      property: 'article:modified_time',
      content: blog.value?.updated_at || blog.value?.created_at || '',
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      name: 'twitter:title',
      content: currentBlogTitle.value,
    },
    {
      name: 'twitter:description',
      content: currentBlogDescription.value,
    },
    {
      name: 'twitter:image',
      content: currentBlogImage.value,
    },
  ],
  link: [
    {
      rel: 'canonical',
      href: currentBlogUrl.value,
    },
  ],
}))

function truncateMetaDescription(text: string, maxLength: number = 155) {
  if (!text)
    return ''
  const cleaned = text.replace(/\s+/g, ' ').trim()
  return cleaned.length > maxLength ? cleaned.slice(0, maxLength) : cleaned
}

useHead(() => (blogStructuredData.value
  ? {
      script: [
        {
          key: 'schema-blog-post-graph',
          type: 'application/ld+json',
          children: JSON.stringify(blogStructuredData.value),
        },
      ],
    }
  : {}))
</script>

<template>
  <div>
    <AppHeader />

    <!-- 博客详情页面主体 -->
    <div class="min-h-screen bg-[var(--yunda-petal)] pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <!-- 加载状态 -->
      <div v-if="loading" class="flex items-center justify-center py-24">
        <div class="inline-block size-12 animate-spin border-4 border-[var(--yunda-bark)] border-b-transparent rounded-full" />
        <p class="ml-4 text-lg text-[var(--yunda-bark)]/75">
          {{ blogCopy.loading }}
        </p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="py-24 text-center">
        <div class="text-lg text-red-500">
          {{ error }}
        </div>
        <button
          class="yunda-type-button mt-6 rounded-lg bg-[var(--yunda-bark)] px-6 py-3 text-[var(--yunda-petal)] transition-opacity hover:opacity-95"
          @click="goBack"
        >
          {{ blogCopy.backToList }}
        </button>
      </div>

      <!-- 博客详情内容 -->
      <div v-else-if="blog" class="mx-auto max-w-4xl px-4 py-6">
        <!-- 返回按钮 -->
        <button
          class="mb-6 flex items-center text-sm text-[var(--yunda-bark)] font-semibold transition-colors hover:text-[var(--yunda-maple)]" style="font-family: var(--font-text)"
          @click="goBack"
        >
          <svg class="mr-2 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ blogCopy.backToList }}
        </button>

        <!-- 博客内容卡片 -->
        <article class="overflow-hidden rounded-2xl bg-white shadow-xl">
          <!-- 封面图片 -->
          <div
            v-if="blog.cover_img_url"
            class="aspect-[2/1] w-full overflow-hidden"
          >
            <img
              :src="blog.cover_img_url"
              :alt="getBlogTitle(blog)"
              class="size-full object-cover"
              width="896"
              height="448"
              sizes="(min-width: 1024px) 896px, 100vw"
              loading="eager"
              fetchpriority="high"
              decoding="async"
            >
          </div>

          <!-- 文章头部 -->
          <div class="from-[#A9A67D]/5 to-[#8B9A7D]/5 bg-gradient-to-r p-6">
            <div class="mb-4">
              <span class="inline-flex items-center rounded-full bg-[var(--yunda-petal)] px-4 py-1.5 text-xs text-[var(--yunda-maple)] font-bold shadow-sm lg:text-[13px]" style="font-family: var(--font-text)">
                {{ getCategoryName(blog.category) }}
              </span>
            </div>
            <h1 class="mb-4 yunda-type-blog-article-h1">
              {{ getBlogTitle(blog) }}
            </h1>
            <div class="yunda-type-blog-meta flex flex-wrap items-center gap-4">
              <div class="flex items-center">
                <svg class="mr-2 size-5 text-[var(--yunda-bark)]/50" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium">{{ blog.reference_author || blogCopy.authorDefault }}</span>
              </div>
              <div class="flex items-center">
                <svg class="mr-2 size-5 text-[var(--yunda-bark)]/50" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                <span>{{ blog.created_at ? formatDate(blog.created_at) : '' }}</span>
              </div>
            </div>
          </div>

          <!-- 文章内容 -->
          <div class="p-6 md:p-8">
            <div class="max-w-none overflow-x-auto prose prose-gray prose-lg">
              <div
                v-if="renderedBlogContent"
                class="min-w-0 whitespace-pre-wrap text-[var(--yunda-bark)] leading-[1.8]" style="font-family: var(--font-text)"
                v-html="renderedBlogContent"
              />
              <div v-else class="text-[var(--yunda-bark)]/60">
                {{ blogCopy.detailNoContent }}
              </div>
            </div>

            <!-- 标签区域 -->
            <div
              v-if="blog.tags"
              class="mt-12 border-t border-[var(--yunda-bark)]/15 pt-8"
            >
              <div class="mb-4 flex items-center">
                <svg class="mr-2 size-5 text-[var(--yunda-bark)]/50" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
                <h4 class="text-sm text-[var(--yunda-bark)] font-medium">
                  {{ blogCopy.tagsTitle }}
                </h4>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in blog.tags.split('|')"
                  :key="tag"
                  class="inline-flex items-center border border-[var(--yunda-bark)]/15 rounded-full bg-white px-3 py-1.5 text-xs text-[var(--yunda-bark)] font-medium shadow-sm transition-all duration-200 hover:border-[var(--yunda-bark)]/25 hover:bg-[color-mix(in_srgb,var(--yunda-maple)_8%,var(--yunda-petal)_92%)]"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- 返回按钮 -->
            <div class="mt-12 border-t border-[var(--yunda-bark)]/15 pt-8">
              <button
                class="yunda-type-button flex items-center rounded-lg bg-[var(--yunda-bark)] px-6 py-3 text-[var(--yunda-petal)] transition-opacity hover:opacity-95"
                @click="goBack"
              >
                <svg class="mr-2 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {{ blogCopy.backToList }}
              </button>
            </div>
          </div>
        </article>
      </div>

      <!-- Desktop Bottom CTA -->
      <section class="hidden px-4 pb-12 md:block">
        <div class="mx-auto max-w-4xl">
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
/* 文章内容样式优化 */
.prose {
  max-width: none;
}

.prose p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-family: var(--font-text);
  font-size: 1rem;
  color: var(--yunda-bark);
}

@media (min-width: 1024px) {
  .prose p {
    font-size: 1.125rem;
  }
}

:deep(.prose h1),
:deep(.prose h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-family: var(--font-display);
  font-weight: 500;
  color: var(--yunda-bark);
  line-height: 1.15;
}

:deep(.prose h3),
:deep(.prose h4),
:deep(.prose h5),
:deep(.prose h6) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-family: var(--font-text);
  font-weight: 700;
  color: var(--yunda-bark);
  line-height: 1.25;
}

:deep(.prose h1) {
  font-size: 2.25rem;
}

:deep(.prose h2) {
  font-size: 1.75rem;
}

@media (min-width: 1024px) {
  :deep(.prose h2) {
    font-size: 2.125rem;
  }
}

:deep(.prose h3) {
  font-size: 1.25rem;
}

@media (min-width: 1024px) {
  :deep(.prose h3) {
    font-size: 1.5rem;
  }
}

.prose ul,
.prose ol {
  margin: 1.5rem 0;
  padding-left: 2rem;
}

.prose li {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

.prose strong {
  font-weight: 600;
  color: var(--yunda-bark);
}

.prose em {
  font-style: italic;
  color: color-mix(in srgb, var(--yunda-bark) 75%, transparent);
}

:deep(.prose a) {
  color: var(--yunda-bark);
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 600;
}

:deep(.prose a:hover) {
  color: var(--yunda-maple);
}
</style>

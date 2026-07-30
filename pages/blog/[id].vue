<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { buildBlogPostingSchema, buildBreadcrumbListSchema, buildFAQPageSchema, buildWebPageSchema } from '~/utils/schema'
import commercialIntentMap from '~/data/seo-commercial-intent-map.json'
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
const fallbackBlogImage = '/images/pages/blog/fallback-hero.jpg'

const blogCopyEn = {
  meta: {
    title: 'Surrogacy Blog | Yunda Surrogacy Knowledge Center',
    description: 'Read Yunda Surrogacy guides on surrogacy process, costs, legal basics, medical topics, and real family-building stories.',
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
  quickAnswersTitle: 'Quick answers',
  reviewedByLabel: 'Reviewed by',
  lastUpdatedLabel: 'Updated',
  relatedPostsEyebrow: 'Keep reading',
  relatedPostsTitle: 'Related Posts',
  relatedPostsIntro: 'Continue with related Yunda guides that answer nearby questions and help you compare next steps.',
  readRelatedPost: 'Read article',
  backToTop: 'Back to top',
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
  quickAnswersTitle: '快速答案',
  reviewedByLabel: '审阅人',
  lastUpdatedLabel: '更新于',
  relatedPostsEyebrow: '继续阅读',
  relatedPostsTitle: '相关文章',
  relatedPostsIntro: '继续阅读孕达相关指南，了解相近问题并比较下一步选择。',
  readRelatedPost: '阅读文章',
  backToTop: '返回顶部',
  loading: '加载中...',
  backToList: '返回博客列表',
  detailNoContent: '暂无内容',
}

const blogCopy = computed(() => (locale.value === 'zh' ? blogCopyZh : blogCopyEn))
const ctaCopy = computed(() => ({
  parent: locale.value === 'zh' ? '准父母提交询盘' : 'Intended Parent Inquiry',
  surrogate: locale.value === 'zh' ? '代孕妈妈提交询盘' : 'Surrogate Candidate Inquiry',
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
  seo_title?: string
  seo_description?: string
  en_seo_title?: string
  en_seo_description?: string
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
  }
}

const blogApiLang = computed(() => (locale.value === 'zh' ? 'zh' : 'en'))
const blogCacheKey = computed(() => `blog-${route.params.id}-${blogApiLang.value}`)
const blogApiUrl = computed(() => {
  const routeId = encodeURIComponent(String(route.params.id))
  return `${apiBase.value}/api/blog?route_id=${routeId}&lang=${blogApiLang.value}`
})

// 鑾峰彇鍗氬璇︽儏鏁版嵁锛屾敮鎸佺紦瀛樺拰棰勫姞杞?
// 棣栧厛灏濊瘯閫氳繃route_id鏌ヨ锛屽鏋滃け璐ュ垯閫氳繃id鏌ヨ
const { data: blog, pending: loading, error } = await useFetch(blogApiUrl, {
  key: blogCacheKey.value,
  server: true, // 淇濇寔鏈嶅姟绔覆鏌撲互鏀寔 SEO
  default: () => null,
  // 娣诲姞瀹㈡埛绔紦瀛橈紝10鍒嗛挓鍐呬笉閲嶅璇锋眰
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
          // 10鍒嗛挓缂撳瓨
          if (Date.now() - timestamp < 10 * 60 * 1000) {
            return data
          }
        }
        catch {
          // 蹇界暐缂撳瓨瑙ｆ瀽閿欒
        }
      }
    }
    return undefined
  },
  onResponse({ response }) {
    // 缂撳瓨鍝嶅簲鏁版嵁
    if (import.meta.client && response._data) {
      try {
        sessionStorage.setItem(blogCacheKey.value, JSON.stringify({
          data: response._data,
          timestamp: Date.now(),
        }))
      }
      catch {
        // 蹇界暐瀛樺偍閿欒
      }
    }
  },
  transform: async (data: any) => {
    if (data && typeof data === 'object' && 'id' in data && 'title' in data) {
      return data as Blog
    }
    // 濡傛灉閫氳繃route_id鏌ヨ澶辫触锛屽皾璇曢€氳繃id鏌ヨ
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

async function refreshBlogFromApi() {
  if (!import.meta.client)
    return

  try {
    const routeId = encodeURIComponent(String(route.params.id))
    const refreshed = await $fetch<Blog | null>(`${apiBase.value}/api/blog?route_id=${routeId}&lang=${blogApiLang.value}`, {
      cache: 'no-store',
    })

    if (refreshed && typeof refreshed === 'object' && 'id' in refreshed)
      blog.value = refreshed
  }
  catch (routeError) {
    try {
      const refreshed = await $fetch<Blog | null>(`${apiBase.value}/api/blog?id=${encodeURIComponent(String(route.params.id))}&lang=${blogApiLang.value}`, {
        cache: 'no-store',
      })

      if (refreshed && typeof refreshed === 'object' && 'id' in refreshed)
        blog.value = refreshed
    }
    catch (idError) {
      console.error('Fresh blog refresh failed:', routeError, idError)
    }
  }
}

const relatedPostsCacheKey = computed(() => `related-posts-${route.params.id}-${blogApiLang.value}-${blog.value?.category || 'all'}`)
const relatedPostsQuery = computed(() => ({
  page: 1,
  limit: 8,
  lang: blogApiLang.value,
  ...(blog.value?.category ? { category: blog.value.category } : {}),
}))

const { data: relatedPostsData } = await useFetch<BlogListResponse>(computed(() => `${apiBase.value}/api/blog`), {
  key: relatedPostsCacheKey.value,
  query: relatedPostsQuery,
  server: true,
  default: () => ({ blogs: [], pagination: { totalPages: 1, totalCount: 0 } }),
  transform: (data: any) => data,
})

// 鍒嗙被閫夐」閰嶇疆
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
// 鏍规嵁褰撳墠璇█鑾峰彇鍗氬鏍囬
function getBlogTitle(blogData: Blog | null): string {
  if (!blogData)
    return ''

  if (locale.value === 'zh') {
    // 涓枃鏃讹細浼樺厛涓枃锛屽啀鏄嫳鏂?
    return blogData.title || blogData.en_title || ''
  }
  else {
    // 鑻辨枃鏃讹細浼樺厛鑻辨枃锛屽啀鏄腑鏂?
    return blogData.en_title || blogData.title || ''
  }
}

// 鏍规嵁褰撳墠璇█鑾峰彇鍗氬鍐呭
function getBlogContent(blogData: Blog | null): string {
  if (!blogData)
    return ''

  if (locale.value === 'zh') {
    // 涓枃鏃讹細浼樺厛涓枃锛屽啀鏄嫳鏂?
    return blogData.content || blogData.en_content || ''
  }
  else {
    // 鑻辨枃鏃讹細浼樺厛鑻辨枃锛屽啀鏄腑鏂?
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

function sanitizeInlineSpacingStyles(html: string): string {
  return html.replace(/\sstyle\s*=\s*(['"])([\s\S]*?)\1/gi, (_match, quote, style) => {
    const cleanStyle = String(style)
      .split(';')
      .map(rule => rule.trim())
      .filter(Boolean)
      .filter((rule) => {
        const prop = rule.split(':')[0]?.trim().toLowerCase()
        return prop && !/^(?:margin(?:-.+)?|padding(?:-.+)?|height|min-height|max-height|line-height)$/.test(prop)
      })
      .join('; ')

    return cleanStyle ? ` style=${quote}${cleanStyle}${quote}` : ''
  })
}

function sanitizeBlogHtml(html: string): string {
  if (!html)
    return ''

  return sanitizeInlineSpacingStyles(html)
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<(?:iframe|object|embed|link|meta)\b[\s\S]*?<\/(?:iframe|object|embed|link|meta)>/gi, '')
    .replace(/<(?:iframe|object|embed|link|meta)\b[^>]*>/gi, '')
    .replace(/<h1\b/gi, '<h2')
    .replace(/<\/h1>/gi, '</h2>')
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, '')
    .replace(/\s(?:href|src)\s*=\s*(['"])\s*javascript:[\s\S]*?\1/gi, '')
}

function slugifyHeading(text: string, index: number): string {
  const slug = decodeHtmlEntities(text)
    .toLowerCase()
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72)

  return slug || `section-${index + 1}`
}

function getExistingId(attrs: string): string {
  return getHtmlAttribute(attrs, 'id')
}

function addHeadingIdsToHtml(html: string): string {
  const usedIds = new Set<string>()
  let headingIndex = 0

  return html.replace(/<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi, (match, level: string, attrs: string, innerHtml: string) => {
    const existingId = getExistingId(attrs)
    if (existingId) {
      usedIds.add(existingId)
      return match
    }

    const headingText = htmlToPlainText(innerHtml)
    const baseId = slugifyHeading(headingText, headingIndex)
    let nextId = baseId
    let suffix = 2

    while (usedIds.has(nextId)) {
      nextId = `${baseId}-${suffix}`
      suffix += 1
    }

    usedIds.add(nextId)
    headingIndex += 1

    return `<h${level}${attrs} id="${escapeHtmlAttribute(nextId)}">${innerHtml}</h${level}>`
  })
}

const renderedBlogContent = computed(() =>
  blog.value
    ? addMissingImageAlt(addHeadingIdsToHtml(sanitizeBlogHtml(getBlogContent(blog.value))), getBlogTitle(blog.value))
    : '',
)

/**
 * True when:
 *   - current locale is zh, AND
 *   - the blog record exists, AND
 *   - the Chinese body content (`content` field) is absent or empty.
 *
 * Used to suppress indexing and structured data for placeholder zh pages.
 * When Chinese content is later published, this automatically becomes false
 * on the next deploy without any further code change.
 */
const isZhContentEmpty = computed(() => {
  if (locale.value !== 'zh')
    return false
  if (!blog.value)
    return false
  return !blog.value.content?.trim()
})

interface ExtractedFAQ {
  question: string
  answer: string
}

interface BlogTocItem {
  id: string
  text: string
  level: number
}

interface StructuredBlogContent {
  bodyText: string
  articleBody: string
  summary: string
  wordCount: number
  images: string[]
  citations: string[]
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
    .replace(/&#39;/g, '\'')
    .replace(/&rsquo;/g, '\u2019')
    .replace(/&lsquo;/g, '\u2018')
    .replace(/&rdquo;/g, '\u201D')
    .replace(/&ldquo;/g, '\u201C')
    .replace(/&mdash;/g, '\u2014')
    .replace(/&ndash;/g, '\u2013')
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

function hasCjkText(text: string): boolean {
  return /[\u3400-\u9FFF]/.test(text)
}

function buildLocalizedBlogTitle(blogData: Blog | null): string {
  const title = blogData ? getBlogTitle(blogData).trim() : blogCopy.value.meta.title
  if (!title)
    return blogCopy.value.meta.title

  if (locale.value === 'zh') {
    const localizedTitle = hasCjkText(title) ? title : `代孕文章：${title}`
    return localizedTitle.includes('孕达') ? localizedTitle : `${localizedTitle} | 孕达代孕博客`
  }

  return title
}

function getBlogSeoTitle(blogData: Blog | null): string {
  if (!blogData)
    return ''

  if (locale.value === 'zh') {
    return blogData.seo_title
      || blogData.en_seo_title
      || ''
  }

  return blogData.en_seo_title
    || blogData.seo_title
    || ''
}

function buildLocalizedSeoTitle(blogData: Blog | null): string {
  const seoTitle = getBlogSeoTitle(blogData).trim()
  if (seoTitle)
    return seoTitle

  return buildLocalizedBlogTitle(blogData)
}

function getBlogMetaSource(blogData: Blog | null): string {
  if (!blogData)
    return ''

  if (locale.value === 'zh') {
    return blogData.seo_description
      || blogData.en_seo_description
      || blogData.meta_description
      || blogData.excerpt
      || htmlToPlainText(blogData.content || '')
      || ''
  }

  return blogData.en_seo_description
    || blogData.seo_description
    || blogData.en_meta_description
    || blogData.en_excerpt
    || htmlToPlainText(blogData.en_content || '')
    || blogData.meta_description
    || blogData.excerpt
    || htmlToPlainText(blogData.content || '')
    || ''
}

function buildLocalizedBlogDescription(blogData: Blog | null, maxLength: number = 155): string {
  if (!blogData)
    return truncateMetaDescription(blogCopy.value.meta.description, maxLength)

  const metaSource = getBlogMetaSource(blogData)
  if (metaSource)
    return truncateText(metaSource, maxLength)

  const title = getBlogTitle(blogData).trim()
  if (locale.value === 'zh') {
    return truncateText(
      `阅读孕达代孕关于「${title}」的中文代孕指南，了解流程、费用、法律、筛查与家庭规划重点。`,
      maxLength,
    )
  }

  return truncateText(
    `Read Yunda Surrogacy's guide to ${title}, including practical surrogacy process, cost, legal, screening, and family-building insights.`,
    maxLength,
  )
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

function extractExternalLinksFromHtml(html: string): string[] {
  return uniqueValues([...html.matchAll(/<a\b([^>]*)>/gi)]
    .map(match => getHtmlAttribute(match[1], 'href'))
    .filter(href => /^https?:\/\//i.test(href))
    .filter(href => !href.includes('yundasurrogacy.com'))
    .slice(0, 10))
}

function extractHeadingsFromHtml(html: string): string[] {
  return uniqueValues([...html.matchAll(/<h[2-4]\b[^>]*>([\s\S]*?)<\/h[2-4]>/gi)]
    .map(match => htmlToPlainText(match[1]))
    .filter(heading => heading.length >= 3 && !/^(?:faq|常见问题|问答)$/i.test(heading))
    .slice(0, 8))
}

function extractTocItemsFromHtml(html: string): BlogTocItem[] {
  return [...html.matchAll(/<h([23])\b([^>]*)>([\s\S]*?)<\/h\1>/gi)]
    .map((match, index) => {
      const text = htmlToPlainText(match[3])
      const id = getExistingId(match[2]) || slugifyHeading(text, index)

      return {
        id,
        text,
        level: Number(match[1]),
      }
    })
    .filter(item => item.id && item.text.length >= 3)
    .slice(0, 14)
}

function isFaqHeading(text: string): boolean {
  return /\bfaq\b|frequently asked questions|常见问题|问答/i.test(text)
}

function looksLikeQuestion(text: string): boolean {
  return /[?？]$/.test(text)
    || /^(?:do|does|did|can|could|is|are|was|were|will|would|should|what|when|where|why|how)\b/i.test(text)
    || /^(?:什么|如何|怎么|为什么|是否|能否|可以|需要|多久|多少)/.test(text)
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
    citations: extractExternalLinksFromHtml(html),
    headings: extractHeadingsFromHtml(html),
    faqs: extractFaqsFromHtml(html),
  }
}

const structuredBlogContent = computed(() =>
  extractStructuredBlogContent(renderedBlogContent.value),
)

const citableFaqs = computed(() =>
  structuredBlogContent.value.faqs
    .filter(faq => faq.question && faq.answer.length >= 40)
    .slice(0, 4),
)

const blogTocItems = computed(() => extractTocItemsFromHtml(renderedBlogContent.value))

const blogTags = computed(() =>
  blog.value?.tags
    ? blog.value.tags.split('|').map(tag => tag.trim()).filter(Boolean)
    : [],
)

function getBlogDetailPath(blogData: Blog): string {
  const path = blogData.route_id ? `/blog/${blogData.route_id}` : `/blog/${blogData.id}`
  return localePath(path)
}

function isCurrentBlogPost(blogData: Blog): boolean {
  if (!blog.value)
    return false

  return blogData.id === blog.value.id
    || (!!blogData.route_id && blogData.route_id === blog.value.route_id)
    || String(blogData.route_id || blogData.id) === String(route.params.id)
}

const relatedPosts = computed(() =>
  (relatedPostsData.value?.blogs || [])
    .filter(post => !isCurrentBlogPost(post))
    .map(post => ({
      id: post.id,
      title: getBlogTitle(post),
      excerpt: getBlogExcerpt(post, 120),
      categoryLabel: getCategoryName(post.category),
      coverImgUrl: post.cover_img_url,
      date: formatDate(post.created_at || post.updated_at),
      detailPath: getBlogDetailPath(post),
    }))
    .filter(post => post.title && post.detailPath)
    .slice(0, 3),
)

const readingTimeLabel = computed(() => {
  const minutes = Math.max(1, Math.ceil(structuredBlogContent.value.wordCount / (locale.value === 'zh' ? 420 : 220)))
  return `${minutes} min read`
})

const quickAnswerText = computed(() => {
  if (!blog.value)
    return ''

  return buildLocalizedBlogDescription(blog.value, 155)
})

const conversionCopy = computed(() => ({
  breadcrumbHome: 'Home',
  breadcrumbBlog: 'Blog',
  quickAnswerEyebrow: 'Quick Answer',
  keyTakeawaysEyebrow: 'Questions this guide helps answer',
  tocTitle: 'In this guide',
  ctaTitle: 'Have questions about your case?',
  ctaBody: 'Choose the inquiry path that matches your current journey.',
  ctaButton: 'Intended Parent Inquiry',
  ctaSecondary: 'Surrogate Candidate Inquiry',
  relatedTitle: 'Related guides',
  trustTitle: 'Why readers contact Yunda',
  finalCtaTitle: 'Ready to send your inquiry?',
  finalCtaBody: 'Use this guide to prepare better questions, then submit the intended parent or surrogate candidate inquiry form so Yunda can understand your situation and follow up with the right next step.',
  reviewedTitle: 'Reviewed for Yunda readers',
  reviewedBody: 'Yunda reviews educational content so intended parents and surrogate candidates can prepare clearer consultation questions.',
  noToc: 'Sections will appear when the article uses headings.',
}))

const isParentFocusedBlog = computed(() => {
  const category = blog.value?.category || ''
  const tags = blogTags.value.join('|')

  return /parent|intended|准父母/i.test(`${category}|${tags}`)
})

interface LocalizedCommercialCopy {
  en: string
  zh: string
}

interface CommercialIntentAssignment {
  cluster: string
  role: string
  primaryUrl: string
  heading: LocalizedCommercialCopy
  body: LocalizedCommercialCopy
  cta: LocalizedCommercialCopy
}

const commercialIntentAssignment = computed<CommercialIntentAssignment | null>(() => {
  const slug = String(blog.value?.route_id || route.params.id || '').trim()
  const assignments = commercialIntentMap.assignments as Record<string, CommercialIntentAssignment>
  return assignments[slug] || null
})

const commercialIntentGuide = computed(() => {
  const assignment = commercialIntentAssignment.value
  if (!assignment)
    return null

  const lang = locale.value === 'zh' ? 'zh' : 'en'
  return {
    cluster: assignment.cluster,
    role: assignment.role,
    to: localePath(assignment.primaryUrl),
    heading: assignment.heading[lang],
    body: assignment.body[lang],
    cta: assignment.cta[lang],
  }
})

const relatedGuideLinks = computed(() => {
  const primaryGuide = commercialIntentGuide.value
    ? [{ to: commercialIntentGuide.value.to, label: commercialIntentGuide.value.cta }]
    : []

  if (isParentFocusedBlog.value) {
    return [
      ...primaryGuide,
      { to: localePath('/intended-parents'), label: locale.value === 'zh' ? '准父母指南' : 'Intended Parent Guide' },
      { to: localePath('/surrogacy-process'), label: locale.value === 'zh' ? '准父母代孕流程' : 'Intended Parent Process' },
      { to: localePath('/surrogacy-cost'), label: locale.value === 'zh' ? '代孕费用指南' : 'Surrogacy Cost Guide' },
      { to: localePath('/be-parents'), label: locale.value === 'zh' ? '准父母提交询盘' : 'Intended Parent Inquiry' },
    ].filter((guide, index, guides) => guides.findIndex(item => item.to === guide.to) === index)
  }

  return [
    ...primaryGuide,
    { to: localePath('/surrogates'), label: locale.value === 'zh' ? '代孕妈妈指南' : 'Surrogate Guide' },
    { to: localePath('/surrogate-process'), label: locale.value === 'zh' ? '代孕妈妈流程' : 'Surrogate Process' },
    { to: localePath('/surrogate-compensation'), label: locale.value === 'zh' ? '代孕妈妈费用与补偿' : 'Surrogate Compensation' },
    { to: localePath('/surrogate-requirements'), label: locale.value === 'zh' ? '代孕妈妈要求' : 'Surrogate Requirements' },
  ].filter((guide, index, guides) => guides.findIndex(item => item.to === guide.to) === index)
})

const trustPoints = computed(() => [
  'Bilingual guidance for international families',
  'Process, screening, legal, and insurance coordination',
  'Consultation focused on your current stage',
])

const sideRailRef = ref<HTMLElement | null>(null)
const sideRailStickyTop = ref('6rem')
let sideRailResizeObserver: ResizeObserver | null = null

function updateSideRailStickyTop() {
  if (!import.meta.client)
    return

  const rail = sideRailRef.value
  if (!rail || window.innerWidth < 1024) {
    sideRailStickyTop.value = '6rem'
    return
  }

  const bottomGap = 32
  const preferredTop = 96
  const railHeight = rail.offsetHeight
  const computedTop = window.innerHeight - railHeight - bottomGap

  sideRailStickyTop.value = `${Math.round(Math.min(preferredTop, computedTop))}px`
}

onMounted(() => {
  refreshBlogFromApi().finally(() => nextTick(updateSideRailStickyTop))
  nextTick(updateSideRailStickyTop)
  window.addEventListener('resize', updateSideRailStickyTop)

  const sideRailElement = sideRailRef.value as unknown as Element | null
  if (sideRailElement && 'ResizeObserver' in window) {
    sideRailResizeObserver = new ResizeObserver(() => updateSideRailStickyTop())
    sideRailResizeObserver.observe(sideRailElement)
  }
})

onBeforeUnmount(() => {
  if (!import.meta.client)
    return

  window.removeEventListener('resize', updateSideRailStickyTop)
  sideRailResizeObserver?.disconnect()
  sideRailResizeObserver = null
})

watch(
  () => [blogTocItems.value.length, citableFaqs.value.length, relatedGuideLinks.value.length],
  () => nextTick(updateSideRailStickyTop),
  { flush: 'post' },
)

const blogReviewer = computed(() => ({
  '@type': 'Person',
  '@id': `${resolvedSiteUrl.value}/about#kayla-luo`,
  'name': 'Kayla Luo',
  'url': `${resolvedSiteUrl.value}${localePath('/about')}`,
  'worksFor': {
    '@id': `${resolvedSiteUrl.value}/#organization`,
  },
}))

// 鎻愬彇绾枃鏈憳瑕侊紙鍘婚櫎HTML鏍囩锛?
function getBlogExcerpt(blogData: Blog | null, maxLength: number = 155): string {
  const content = blogData === blog.value
    ? structuredBlogContent.value.bodyText
    : getBlogMetaSource(blogData) || htmlToPlainText(getBlogContent(blogData))

  // 鎴彇鎸囧畾闀垮害
  return content ? truncateText(content, maxLength) : buildLocalizedBlogDescription(blogData, maxLength)
}
// 鏍规嵁褰撳墠璇█鑾峰彇鍒嗙被鍚嶇О
function getCategoryName(categoryValue: string): string {
  // 鏍规嵁涓枃鍒嗙被鍊兼壘鍒板搴旂殑缈昏瘧key
  const categoryOption = categoryOptions.find(option => option.value === categoryValue)
  if (categoryOption) {
    // 浣跨敤i18n缈昏瘧
    return getUiCategoryLabel(categoryOption.key)
  }
  // 濡傛灉鎵句笉鍒板搴旂殑缈昏瘧锛岀洿鎺ヨ繑鍥炲師鍊?
  return categoryValue
}

// 鏍煎紡鍖栨棩鏈?
function formatDate(dateString: string) {
  if (!dateString)
    return ''
  const date = new Date(dateString)

  // 鏍规嵁褰撳墠璇█閫夋嫨鏃ユ湡鏍煎紡
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

// 杩斿洖鍗氬鍒楄〃
function goBack() {
  router.push(localePath('/blog'))
}

function scrollToTop() {
  if (!import.meta.client)
    return

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const currentBlogUrl = computed(() => {
  if (!blog.value)
    return `${resolvedSiteUrl.value}${localePath('/blog')}`

  const blogPath = blog.value.route_id ? `/blog/${blog.value.route_id}` : `/blog/${blog.value.id}`
  return `${resolvedSiteUrl.value}${localePath(blogPath)}`
})
const currentBlogImage = computed(() => blog.value?.cover_img_url || `${resolvedSiteUrl.value}${fallbackBlogImage}`)

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
    title: buildLocalizedBlogTitle(blog.value),
    description: buildLocalizedBlogDescription(blog.value, 155),
    articleBody: structuredBlogContent.value.articleBody,
    image: uniqueValues([currentBlogImage.value, ...structuredBlogContent.value.images]).slice(0, 6),
    url: localizedBlogUrl,
    baseUrl,
    locale: locale.value,
    author: authorName,
    authorType: authorName === blogCopy.value.authorDefault ? 'Organization' : 'Person',
    datePublished: blog.value.created_at,
    dateModified: blog.value.updated_at,
    reviewedBy: blogReviewer.value,
    citation: structuredBlogContent.value.citations,
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

const currentBlogTitle = computed(() => buildLocalizedSeoTitle(blog.value))
const currentBlogDescription = computed(() =>
  buildLocalizedBlogDescription(blog.value, 155),
)
const currentBlogHeroImage = computed(() => blog.value?.cover_img_url || fallbackBlogImage)
const fallbackBlogAvifSrcset = [
  '/images/pages/blog/fallback-hero-640.avif 640w',
  '/images/pages/blog/fallback-hero-960.avif 960w',
  '/images/pages/blog/fallback-hero-1600.avif 1600w',
].join(', ')
const fallbackBlogJpegSrcset = [
  '/images/pages/blog/fallback-hero-640.jpg 640w',
  '/images/pages/blog/fallback-hero-960.jpg 960w',
  '/images/pages/blog/fallback-hero.jpg 1600w',
].join(', ')

const blogStructuredData = computed(() => {
  // Do not emit structured data for Chinese pages with no Chinese body content.
  // A BlogPosting claiming inLanguage: zh-CN with empty content is misleading
  // for search engines and validation tools.
  if (isZhContentEmpty.value)
    return null

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
      { name: buildLocalizedBlogTitle(blog.value), url: localePath(blogPath) },
    ],
  })
  const webpageSchema = buildWebPageSchema({
    baseUrl,
    url: localePath(blogPath),
    pageId,
    organizationId,
    websiteId,
    name: buildLocalizedBlogTitle(blog.value),
    description: buildLocalizedBlogDescription(blog.value, 155),
    about: getCategoryName(blog.value.category),
    audience: locale.value === 'zh'
      ? ['准父母', '代孕妈妈', '代孕资讯读者']
      : ['Intended parents', 'Surrogates', 'Surrogacy information readers'],
    mainEntity: {
      '@id': `${pageUrl}#article`,
    },
    dateModified: blog.value.updated_at,
    reviewedBy: blogReviewer.value,
    locale: locale.value,
  })
  const { '@context': _webpageContext, ...webpageNode } = webpageSchema
  const faqSchema = citableFaqs.value.length
    ? buildFAQPageSchema({
        baseUrl,
        url: localePath(blogPath),
        faqPageId: `${pageUrl}#faq`,
        name: `${buildLocalizedBlogTitle(blog.value)} FAQ`,
        description: buildLocalizedBlogDescription(blog.value, 155),
        faqs: citableFaqs.value,
        locale: locale.value,
      })
    : null
  const { '@context': _faqContext, ...faqNode } = faqSchema || {}
  const graphNodes = [
    webpageNode,
    blogPostingSchema.value,
    breadcrumbSchema,
  ]

  if (faqSchema)
    graphNodes.push(faqNode)

  return {
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  }
})

// SEO 配置
useHead(() => ({
  title: currentBlogTitle.value,
  meta: [
    // noindex for Chinese blog pages that have no Chinese body content yet.
    // Removed automatically once `blog.value.content` is non-empty on next deploy.
    ...(isZhContentEmpty.value
      ? [{ name: 'robots', content: 'noindex,follow' }]
      : []),
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

    <!-- 鍗氬璇︽儏椤甸潰涓讳綋 -->
    <div class="blog-page-shell min-h-screen bg-white pb-[calc(4.5rem+env(safe-area-inset-bottom))] md:pb-0">
      <!-- 鍔犺浇鐘舵€?-->
      <div v-if="loading" class="flex items-center justify-center py-24">
        <div class="inline-block size-12 animate-spin border-4 border-[var(--yunda-bark)] border-b-transparent rounded-full" />
        <p class="ml-4 text-lg text-[var(--yunda-bark)]/75">
          {{ blogCopy.loading }}
        </p>
      </div>

      <!-- 閿欒鐘舵€?-->
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

      <!-- 鍗氬璇︽儏鍐呭 -->
      <div v-else-if="blog" class="blog-detail-shell mx-auto w-full max-w-[1440px] px-4 py-6 lg:px-8 lg:py-10">
        <nav class="mb-5 flex flex-wrap items-center gap-2 text-sm text-[var(--yunda-bark)]/65" aria-label="Breadcrumb">
          <NuxtLink :to="localePath('/')" class="transition hover:text-[var(--yunda-maple)]">
            {{ conversionCopy.breadcrumbHome }}
          </NuxtLink>
          <span>/</span>
          <NuxtLink :to="localePath('/blog')" class="transition hover:text-[var(--yunda-maple)]">
            {{ conversionCopy.breadcrumbBlog }}
          </NuxtLink>
          <span>/</span>
          <span class="min-w-0 flex-1 truncate text-[var(--yunda-bark)]/80">{{ getBlogTitle(blog) }}</span>
        </nav>

        <header class="mb-8">
          <div class="mb-6 aspect-[16/8.5] max-h-[520px] w-full overflow-hidden rounded-[8px] bg-white shadow-[0_20px_55px_rgba(65,45,30,0.12)]">
            <picture class="contents">
              <source
                v-if="!blog.cover_img_url"
                :srcset="fallbackBlogAvifSrcset"
                sizes="(min-width: 1440px) 1376px, 100vw"
                type="image/avif"
              >
              <img
                :src="currentBlogHeroImage"
                :srcset="blog.cover_img_url ? undefined : fallbackBlogJpegSrcset"
                :alt="getBlogTitle(blog)"
                class="size-full object-cover"
                width="1600"
                height="1066"
                sizes="(min-width: 1440px) 1376px, 100vw"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              >
            </picture>
          </div>

          <div class="max-w-4xl">
            <div class="mb-4 flex flex-wrap items-center gap-2">
              <span class="inline-flex items-center border border-[var(--yunda-maple)]/25 rounded-full bg-[var(--yunda-petal)] px-3 py-1.5 text-xs text-[var(--yunda-maple)] font-bold shadow-sm">
                {{ getCategoryName(blog.category) }}
              </span>
              <span class="inline-flex items-center gap-1.5 border border-[var(--yunda-bark)]/8 rounded-full bg-[var(--yunda-petal)]/50 px-3 py-1.5 text-xs text-[var(--yunda-bark)]/70 font-semibold">
                <Icon name="lucide:clock-3" class="h-3.5 w-3.5" />
                {{ readingTimeLabel }}
              </span>
              <span v-if="blog.updated_at" class="inline-flex items-center gap-1.5 border border-[var(--yunda-bark)]/8 rounded-full bg-[var(--yunda-petal)]/50 px-3 py-1.5 text-xs text-[var(--yunda-bark)]/70 font-semibold">
                <Icon name="lucide:refresh-cw" class="h-3.5 w-3.5" />
                {{ blogCopy.lastUpdatedLabel }} {{ formatDate(blog.updated_at) }}
              </span>
            </div>

            <h1 class="yunda-type-blog-article-h1 max-w-4xl text-balance">
              {{ getBlogTitle(blog) }}
            </h1>

            <div class="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[var(--yunda-bark)]/72">
              <span class="inline-flex items-center gap-2">
                <Icon name="lucide:user-round" class="h-4 w-4 text-[var(--yunda-maple)]" />
                {{ blog.reference_author || blogCopy.authorDefault }}
              </span>
              <span v-if="blog.created_at" class="inline-flex items-center gap-2">
                <Icon name="lucide:calendar-days" class="h-4 w-4 text-[var(--yunda-maple)]" />
                {{ formatDate(blog.created_at) }}
              </span>
              <span class="inline-flex items-center gap-2">
                <Icon name="lucide:shield-check" class="h-4 w-4 text-[var(--yunda-maple)]" />
                {{ blogCopy.reviewedByLabel }} Kayla Luo
              </span>
            </div>
          </div>
        </header>

        <div class="grid gap-8 lg:grid-cols-[minmax(0,860px)_360px] lg:items-stretch xl:gap-10">
          <article id="article" class="min-w-0">
            <section
              v-if="quickAnswerText"
              class="brand-card quick-answer-card mb-6 border rounded-[8px] p-5 shadow-[0_14px_36px_rgba(65,45,30,0.07)] md:p-6"
            >
              <p class="mb-3 text-xs text-[var(--yunda-maple)] font-bold uppercase tracking-[0.14em]">
                {{ conversionCopy.quickAnswerEyebrow }}
              </p>
              <p class="text-base text-[var(--yunda-bark)] leading-8 md:text-lg">
                {{ quickAnswerText }}
              </p>
            </section>

            <section
              v-if="citableFaqs.length"
              class="brand-card key-questions-card mb-6 border rounded-[8px] p-5 md:p-6"
              aria-labelledby="blog-key-questions"
            >
              <h2 id="blog-key-questions" class="module-heading mb-4 font-display text-2xl text-[var(--yunda-bark)] font-medium leading-tight">
                {{ conversionCopy.keyTakeawaysEyebrow }}
              </h2>
              <div class="space-y-4">
                <article
                  v-for="faq in citableFaqs"
                  :key="faq.question"
                  class="border-l-3 border-[var(--yunda-maple)] pl-4"
                >
                  <h3 class="text-base text-[var(--yunda-bark)] font-semibold leading-snug">
                    {{ faq.question }}
                  </h3>
                  <p class="mt-1.5 text-sm text-[var(--yunda-bark)]/78 leading-7">
                    {{ faq.answer }}
                  </p>
                </article>
              </div>
            </section>

            <section
              v-if="commercialIntentGuide"
              class="brand-card mb-6 border border-[var(--yunda-maple)]/25 rounded-[8px] bg-[var(--yunda-petal)]/45 p-5 md:p-6"
              data-seo-commercial-intent
              :data-seo-cluster="commercialIntentGuide.cluster"
              :data-seo-role="commercialIntentGuide.role"
            >
              <p class="mb-2 text-xs text-[var(--yunda-maple)] font-bold uppercase tracking-[0.14em]">
                {{ locale === 'zh' ? '主指南' : 'Primary guide' }}
              </p>
              <h2 class="font-display text-2xl text-[var(--yunda-bark)] font-medium leading-tight">
                {{ commercialIntentGuide.heading }}
              </h2>
              <p class="mt-3 text-base text-[var(--yunda-bark)]/80 leading-7">
                {{ commercialIntentGuide.body }}
              </p>
              <NuxtLink
                :to="commercialIntentGuide.to"
                class="yunda-type-button mt-4 inline-flex items-center gap-2 rounded-[8px] bg-[var(--yunda-bark)] px-5 py-3 text-[var(--yunda-petal)] transition hover:opacity-90"
              >
                {{ commercialIntentGuide.cta }}
                <Icon name="lucide:arrow-right" class="h-4 w-4" />
              </NuxtLink>
            </section>

            <div class="article-surface rounded-[8px] bg-white px-5 py-6 shadow-[0_18px_48px_rgba(65,45,30,0.08)] md:px-8 md:py-8">
              <div class="max-w-none overflow-x-auto prose prose-gray prose-lg">
                <div
                  v-if="renderedBlogContent"
                  class="blog-rich-content min-w-0 text-[var(--yunda-bark)] leading-[1.8]" style="font-family: var(--font-text)"
                  v-html="renderedBlogContent"
                />
                <div v-else class="text-[var(--yunda-bark)]/60">
                  {{ blogCopy.detailNoContent }}
                </div>
              </div>

              <section class="mt-10 rounded-[8px] bg-[var(--yunda-bark)] p-5 text-[var(--yunda-petal)] md:p-7">
                <p class="font-display text-2xl font-medium leading-tight">
                  {{ conversionCopy.finalCtaTitle }}
                </p>
                <p class="mt-3 text-sm text-[var(--yunda-petal)]/82 leading-7 md:text-base">
                  {{ conversionCopy.finalCtaBody }}
                </p>
                <div class="mt-5 flex flex-col gap-3 sm:flex-row">
                  <NuxtLink
                    :to="localePath('/be-parents')"
                    class="yunda-type-button inline-flex items-center justify-center gap-2 rounded-[8px] bg-[var(--yunda-petal)] px-5 py-3 text-center text-[var(--yunda-bark)] transition hover:opacity-90"
                  >
                    <Icon name="lucide:users" class="h-4 w-4" />
                    {{ conversionCopy.ctaButton }}
                  </NuxtLink>
                  <NuxtLink
                    :to="localePath('/be-surrogate')"
                    class="yunda-type-button inline-flex items-center justify-center gap-2 rounded-[8px] border border-[var(--yunda-petal)]/35 px-5 py-3 text-center text-[var(--yunda-petal)] transition hover:bg-white/10"
                  >
                    <Icon name="lucide:heart-handshake" class="h-4 w-4" />
                    {{ conversionCopy.ctaSecondary }}
                  </NuxtLink>
                </div>
              </section>

              <section class="reviewed-card mt-8 border rounded-[8px] p-5">
                <div class="flex gap-4">
                  <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--yunda-petal)] text-[var(--yunda-maple)] shadow-sm">
                    <Icon name="lucide:badge-check" class="h-5 w-5" />
                  </div>
                  <div>
                    <h2 class="text-lg text-[var(--yunda-bark)] font-semibold leading-tight">
                      {{ conversionCopy.reviewedTitle }}
                    </h2>
                    <p class="mt-2 text-sm text-[var(--yunda-bark)]/75 leading-7">
                      {{ conversionCopy.reviewedBody }}
                    </p>
                    <p class="mt-3 text-sm text-[var(--yunda-bark)] font-semibold">
                      Kayla Luo · {{ blogCopy.reviewedByLabel }}
                    </p>
                  </div>
                </div>
              </section>

              <div
                v-if="blogTags.length"
                class="mt-8 border-t border-[var(--yunda-bark)]/12 pt-6"
              >
                <div class="mb-4 flex items-center gap-2 text-sm text-[var(--yunda-bark)] font-semibold">
                  <Icon name="lucide:tags" class="h-4 w-4 text-[var(--yunda-maple)]" />
                  {{ blogCopy.tagsTitle }}
                </div>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in blogTags"
                    :key="tag"
                    class="inline-flex items-center border border-[var(--yunda-maple)]/22 rounded-full bg-[var(--yunda-petal)]/65 px-3 py-1.5 text-xs text-[var(--yunda-bark)] font-medium"
                  >
                    {{ tag }}
                  </span>
                </div>
              </div>
            </div>

            <section
              v-if="relatedPosts.length"
              class="related-posts-section mt-8 rounded-[8px] bg-white p-5 shadow-[0_18px_48px_rgba(65,45,30,0.08)] md:p-6"
              aria-labelledby="related-posts-title"
            >
              <div class="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <div>
                  <p class="mb-2 text-xs text-[var(--yunda-maple)] font-bold uppercase tracking-[0.14em]">
                    {{ blogCopy.relatedPostsEyebrow }}
                  </p>
                  <h2 id="related-posts-title" class="font-display text-2xl text-[var(--yunda-bark)] font-medium leading-tight md:text-3xl">
                    {{ blogCopy.relatedPostsTitle }}
                  </h2>
                </div>
                <p class="max-w-xl text-sm text-[var(--yunda-bark)]/72 leading-6">
                  {{ blogCopy.relatedPostsIntro }}
                </p>
              </div>

              <div class="grid gap-4 md:grid-cols-3">
                <article
                  v-for="post in relatedPosts"
                  :key="post.id"
                  class="group min-w-0 overflow-hidden border border-[var(--yunda-maple)]/18 rounded-[8px] bg-white shadow-[0_10px_26px_rgba(65,45,30,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(65,45,30,0.10)]"
                >
                  <NuxtLink :to="post.detailPath" class="flex h-full flex-col">
                    <div class="aspect-[16/10] overflow-hidden bg-[var(--yunda-petal)]">
                      <img
                        v-if="post.coverImgUrl"
                        :src="post.coverImgUrl"
                        :alt="post.title"
                        class="size-full object-cover transition duration-300 group-hover:scale-105"
                        width="420"
                        height="263"
                        loading="lazy"
                        decoding="async"
                      >
                    </div>
                    <div class="flex flex-1 flex-col p-4">
                      <div class="mb-3 flex flex-wrap items-center gap-2 text-xs">
                        <span class="inline-flex items-center border border-[var(--yunda-maple)]/22 rounded-full bg-[var(--yunda-petal)]/70 px-2.5 py-1 text-[var(--yunda-maple)] font-bold">
                          {{ post.categoryLabel }}
                        </span>
                        <span v-if="post.date" class="text-[var(--yunda-bark)]/55 font-semibold">
                          {{ post.date }}
                        </span>
                      </div>
                      <h3 class="line-clamp-2 text-lg text-[var(--yunda-bark)] font-semibold leading-snug transition group-hover:text-[var(--yunda-maple)]">
                        {{ post.title }}
                      </h3>
                      <p class="mt-3 line-clamp-3 text-sm text-[var(--yunda-bark)]/74 leading-6">
                        {{ post.excerpt }}
                      </p>
                      <div class="mt-auto pt-4 text-sm text-[var(--yunda-maple)] font-bold">
                        {{ blogCopy.readRelatedPost }}
                      </div>
                    </div>
                  </NuxtLink>
                </article>
              </div>
            </section>

            <button
              class="yunda-type-button mt-8 inline-flex items-center gap-2 rounded-[8px] bg-white px-5 py-3 text-[var(--yunda-bark)] shadow-sm transition hover:text-[var(--yunda-maple)]"
              @click="goBack"
            >
              <Icon name="lucide:arrow-left" class="h-4 w-4" />
              {{ blogCopy.backToList }}
            </button>
          </article>

          <aside class="relative hidden self-stretch lg:block">
            <div
              ref="sideRailRef"
              class="blog-side-rail sticky space-y-4"
              :style="{ top: sideRailStickyTop }"
            >
              <section class="side-card rounded-[8px] border bg-white p-5 shadow-[0_14px_36px_rgba(65,45,30,0.07)]">
                <h2 class="mb-4 flex items-center gap-2 text-sm text-[var(--yunda-bark)] font-bold uppercase tracking-[0.12em]">
                  <Icon name="lucide:list" class="h-4 w-4 text-[var(--yunda-maple)]" />
                  {{ conversionCopy.tocTitle }}
                </h2>
                <nav v-if="blogTocItems.length" class="space-y-2" aria-label="Table of contents">
                  <a
                    v-for="item in blogTocItems"
                    :key="item.id"
                    :href="`#${item.id}`"
                    class="block border-l-2 border-transparent py-1 text-sm text-[var(--yunda-bark)]/70 leading-5 transition hover:border-[var(--yunda-maple)] hover:pl-2 hover:text-[var(--yunda-bark)]"
                    :class="item.level === 3 ? 'ml-3' : ''"
                  >
                    {{ item.text }}
                  </a>
                </nav>
                <p v-else class="text-sm text-[var(--yunda-bark)]/58 leading-6">
                  {{ conversionCopy.noToc }}
                </p>
              </section>

              <section class="rounded-[8px] bg-[var(--yunda-bark)] p-5 text-[var(--yunda-petal)] shadow-[0_18px_42px_rgba(65,45,30,0.18)]">
                <h2 class="font-display text-2xl font-medium leading-tight">
                  {{ conversionCopy.ctaTitle }}
                </h2>
                <p class="mt-3 text-sm text-[var(--yunda-petal)]/78 leading-6">
                  {{ conversionCopy.ctaBody }}
                </p>
                <NuxtLink
                  :to="localePath('/be-parents')"
                  class="yunda-type-button mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[8px] bg-[var(--yunda-petal)] px-4 py-3 text-center text-[var(--yunda-bark)] transition hover:opacity-90"
                >
                  <Icon name="lucide:users" class="h-4 w-4" />
                  {{ conversionCopy.ctaButton }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/be-surrogate')"
                  class="yunda-type-button mt-3 inline-flex w-full items-center justify-center gap-2 rounded-[8px] border border-[var(--yunda-petal)]/35 px-4 py-3 text-center text-[var(--yunda-petal)] transition hover:bg-white/10"
                >
                  <Icon name="lucide:heart-handshake" class="h-4 w-4" />
                  {{ conversionCopy.ctaSecondary }}
                </NuxtLink>
              </section>

              <section class="side-card rounded-[8px] border bg-white p-5">
                <h2 class="mb-4 flex items-center gap-2 text-sm text-[var(--yunda-bark)] font-bold uppercase tracking-[0.12em]">
                  <Icon name="lucide:book-open" class="h-4 w-4 text-[var(--yunda-maple)]" />
                  {{ conversionCopy.relatedTitle }}
                </h2>
                <div class="space-y-2">
                  <NuxtLink
                    v-for="guide in relatedGuideLinks"
                    :key="guide.to"
                    :to="guide.to"
                    class="flex items-center justify-between gap-3 rounded-[8px] px-3 py-2 text-sm text-[var(--yunda-bark)]/75 transition hover:bg-[var(--yunda-petal)] hover:text-[var(--yunda-bark)]"
                  >
                    <span>{{ guide.label }}</span>
                    <Icon name="lucide:arrow-up-right" class="h-3.5 w-3.5 shrink-0" />
                  </NuxtLink>
                </div>
              </section>

              <section class="side-card trust-side-card rounded-[8px] border bg-white p-5">
                <h2 class="mb-4 flex items-center gap-2 text-sm text-[var(--yunda-bark)] font-bold uppercase tracking-[0.12em]">
                  <Icon name="lucide:shield-check" class="h-4 w-4 text-[var(--yunda-maple)]" />
                  {{ conversionCopy.trustTitle }}
                </h2>
                <ul class="space-y-3">
                  <li v-for="point in trustPoints" :key="point" class="flex gap-2 text-sm text-[var(--yunda-bark)]/78 leading-6">
                    <Icon name="lucide:check" class="mt-1 h-3.5 w-3.5 shrink-0 text-[var(--yunda-maple)]" />
                    <span>{{ point }}</span>
                  </li>
                </ul>
              </section>

              <button
                type="button"
                class="yunda-type-button group flex w-full items-center justify-center gap-2 border border-[var(--yunda-maple)]/28 rounded-[8px] bg-white px-4 py-3 text-sm text-[var(--yunda-bark)] font-semibold shadow-[0_10px_24px_rgba(65,45,30,0.06)] transition hover:border-[var(--yunda-maple)]/45 hover:bg-[var(--yunda-petal)] hover:text-[var(--yunda-maple)]"
                @click="scrollToTop"
              >
                <Icon name="lucide:arrow-up" class="h-4 w-4 transition group-hover:-translate-y-0.5" />
                {{ blogCopy.backToTop }}
              </button>
            </div>
          </aside>
        </div>
      </div>

    </div>

    <!-- Mobile Fixed Bottom CTA -->
    <div class="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--yunda-bark)]/15 bg-white pb-[env(safe-area-inset-bottom)] md:hidden">
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
/* 鏂囩珷鍐呭鏍峰紡浼樺寲 */
.prose {
  max-width: none;
}

.blog-page-shell {
  overflow-x: clip;
}

.article-surface {
  min-width: 0;
  border: 1px solid color-mix(in srgb, var(--yunda-maple) 14%, transparent);
}

.blog-detail-shell {
  overflow-wrap: anywhere;
}

.brand-card,
.side-card,
.reviewed-card {
  position: relative;
  overflow: hidden;
  border-color: color-mix(in srgb, var(--yunda-maple) 26%, transparent);
}

.brand-card::before,
.side-card::before {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: linear-gradient(90deg, var(--yunda-maple), color-mix(in srgb, var(--yunda-harvest) 70%, var(--yunda-petal)));
  content: "";
}

.quick-answer-card {
  background: linear-gradient(180deg, color-mix(in srgb, var(--yunda-petal) 58%, white), white 82%);
}

.key-questions-card,
.reviewed-card,
.trust-side-card {
  background: color-mix(in srgb, var(--yunda-petal) 34%, white);
}

.module-heading {
  position: relative;
  padding-left: 1rem;
}

.module-heading::before {
  position: absolute;
  top: 0.16em;
  bottom: 0.12em;
  left: 0;
  width: 4px;
  border-radius: 999px;
  background: var(--yunda-maple);
  content: "";
}

.blog-detail-shell :deep(.yunda-type-blog-article-h1) {
  position: relative;
  padding-bottom: 1.1rem;
  font-family: var(--font-display);
  font-size: clamp(2.35rem, 4.2vw, 4rem);
  font-weight: 500;
  line-height: 1.08;
  letter-spacing: 0;
  color: var(--yunda-bark);
}

.blog-detail-shell :deep(.yunda-type-blog-article-h1)::after {
  position: absolute;
  bottom: 0;
  left: 0;
  width: min(9rem, 42%);
  height: 5px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--yunda-maple), color-mix(in srgb, var(--yunda-harvest) 70%, white));
  content: "";
}

:deep(.blog-rich-content) {
  white-space: normal;
  overflow-wrap: anywhere;
}

:deep(.blog-rich-content h2[id]),
:deep(.blog-rich-content h3[id]) {
  scroll-margin-top: 7rem;
}

:deep(.prose p) {
  margin-bottom: 1.35rem;
  line-height: 1.76;
  font-family: var(--font-text);
  font-size: 1.04rem;
  font-weight: 400;
  color: var(--yunda-bark);
}

:deep(.prose p:empty),
:deep(.prose p:has(> br:only-child)) {
  display: none;
}

@media (min-width: 1024px) {
  :deep(.prose p) {
    font-size: 1.1rem;
  }
}

:deep(.prose h1),
:deep(.prose h2) {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-family: var(--font-display);
  font-weight: 600;
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
  font-size: 2.35rem;
}

:deep(.prose h2) {
  position: relative;
  padding-left: 1rem;
  border-left: 5px solid var(--yunda-maple);
  font-size: 1.75rem;
}

@media (min-width: 1024px) {
  :deep(.prose h2) {
    font-size: 2rem;
  }
}

:deep(.prose h3) {
  position: relative;
  padding-left: 1rem;
  font-size: 1.2rem;
  color: color-mix(in srgb, var(--yunda-bark) 86%, var(--yunda-maple));
}

:deep(.prose h3)::before {
  position: absolute;
  top: 0.58em;
  left: 0;
  width: 0.42rem;
  height: 0.42rem;
  border-radius: 999px;
  background: var(--yunda-maple);
  content: "";
}

@media (min-width: 1024px) {
  :deep(.prose h3) {
    font-size: 1.35rem;
  }
}

:deep(.prose ul),
:deep(.prose ol) {
  margin: 1.5rem 0;
  padding-left: 2rem;
}

:deep(.prose li) {
  margin-bottom: 0.75rem;
  line-height: 1.6;
}

:deep(.prose li > p) {
  display: inline;
  margin: 0;
  font-size: inherit;
  line-height: inherit;
}

:deep(.prose li > p + p) {
  display: block;
  margin-top: 0.5rem;
}

:deep(.prose strong) {
  font-weight: 600;
  color: var(--yunda-bark);
}

:deep(.prose em) {
  font-style: italic;
  color: color-mix(in srgb, var(--yunda-bark) 75%, transparent);
}

:deep(.prose blockquote) {
  margin: 2rem 0;
  padding: 1rem 1.25rem;
  border-left: 4px solid var(--yunda-maple);
  background: color-mix(in srgb, var(--yunda-petal) 72%, white);
  color: var(--yunda-bark);
  font-family: var(--font-text);
}

:deep(.prose table) {
  width: 100%;
  min-width: 640px;
  margin: 1.75rem 0;
  border-collapse: collapse;
  border: 1px solid color-mix(in srgb, var(--yunda-bark) 18%, transparent);
  font-family: var(--font-text);
  font-size: 0.95rem;
  line-height: 1.55;
}

:deep(.prose th),
:deep(.prose td) {
  border: 1px solid color-mix(in srgb, var(--yunda-bark) 16%, transparent);
  padding: 0.75rem 0.9rem;
  text-align: left;
  vertical-align: top;
}

:deep(.prose th) {
  background: color-mix(in srgb, var(--yunda-maple) 12%, var(--yunda-petal));
  font-weight: 700;
  color: var(--yunda-bark);
}

:deep(.prose tr:nth-child(even) td) {
  background: color-mix(in srgb, var(--yunda-petal) 70%, transparent);
}

:deep(.prose caption),
:deep(.prose figcaption) {
  margin-top: 0.75rem;
  color: color-mix(in srgb, var(--yunda-bark) 65%, transparent);
  font-family: var(--font-text);
  font-size: 0.9rem;
  text-align: center;
}

:deep(.prose figure) {
  margin: 1.75rem 0;
}

:deep(.prose pre) {
  margin: 1.75rem 0;
  padding: 1rem;
  overflow-x: auto;
  border: 1px solid color-mix(in srgb, var(--yunda-bark) 14%, transparent);
  border-radius: 8px;
  background: color-mix(in srgb, var(--yunda-bark) 6%, white);
  white-space: pre-wrap;
}

:deep(.prose code) {
  padding: 0.1rem 0.3rem;
  border-radius: 4px;
  background: color-mix(in srgb, var(--yunda-bark) 7%, white);
  font-size: 0.9em;
}

:deep(.prose pre code) {
  padding: 0;
  background: transparent;
}

:deep(.prose hr) {
  margin: 2.25rem 0;
  border: 0;
  border-top: 1px solid color-mix(in srgb, var(--yunda-bark) 14%, transparent);
}

:deep(.prose a) {
  color: color-mix(in srgb, var(--yunda-maple) 72%, var(--yunda-bark));
  text-decoration: underline;
  text-underline-offset: 3px;
  font-weight: 600;
}

:deep(.prose a:hover) {
  color: var(--yunda-maple);
}
</style>

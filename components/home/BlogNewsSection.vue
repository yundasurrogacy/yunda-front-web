<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

const { locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const apiBase = computed(() => (runtimeConfig.public.apiBase || 'https://yunda-admin-system.yundasurrogacy.com').replace(/\/$/, ''))
const blogApiLang = computed(() => (locale.value === 'zh' ? 'zh' : 'en'))

interface BlogItem {
  id?: number
  route_id?: string
  title?: string
  content?: string
  excerpt?: string
  en_title?: string
  en_content?: string
  en_excerpt?: string
  meta_description?: string
  en_meta_description?: string
  category?: string
  cover_img_url?: string
  created_at?: string
}

interface BlogApiResponse {
  blogs?: BlogItem[]
}

const copy = computed(() => (locale.value === 'zh'
  ? {
      label: 'BLOG & NEWS',
      title: '最新博客与行业动态',
      subtitle: '浏览孕达最新发布的代孕知识、流程指南与真实案例。',
      allCategory: '全部',
      readMore: '阅读文章',
      viewAll: '查看全部博客',
      fallbackDate: '最近更新',
      emptyTitle: '内容正在更新中',
      emptyDesc: '点击进入博客列表查看全部文章。',
    }
  : {
      label: 'BLOG & NEWS',
      title: 'Latest Blog & News',
      subtitle: 'Explore fresh surrogacy insights, practical guides, and real stories from our team.',
      allCategory: 'All',
      readMore: 'Read Article',
      viewAll: 'View All Blogs',
      fallbackDate: 'Recently updated',
      emptyTitle: 'New stories are coming soon',
      emptyDesc: 'Visit our blog page to explore all published articles.',
    }))

const categoryMapEn: Record<string, string> = {
  代孕妈妈相关: 'Surrogate Related',
  准父母相关: 'Intended Parents',
  孕达品牌相关: 'Yunda Brand',
  代孕流程相关: 'Process',
  法律法规相关: 'Legal & Policy',
  行业动态相关: 'Industry News',
  医学健康相关: 'Medical & Health',
  教育科普相关: 'Education',
  成功案例相关: 'Success Stories',
  心理情绪相关: 'Mental Wellness',
}

// 与 blog 页面一致的分类配置（key + 中文值）
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

const defaultCards: BlogItem[] = [
  {
    title: '代孕流程如何更稳妥地开始',
    en_title: 'How to Start the Surrogacy Journey with Confidence',
    content: '了解代孕流程的关键节点、沟通重点与准备清单。',
    en_content: 'A practical breakdown of key milestones, communication checkpoints, and prep steps.',
    category: '代孕流程相关',
    cover_img_url: '/images/pages/home/surrogate-gallery-10.jpeg',
  },
  {
    title: '代孕妈妈筛选：我们看重什么',
    en_title: 'Surrogate Screening: What Matters Most',
    content: '从健康记录到支持系统，系统讲解筛选标准。',
    en_content: 'From health history to support systems, here is how screening works in practice.',
    category: '代孕妈妈相关',
    cover_img_url: '/images/pages/home/surrogate-gallery-11.webp',
  },
  {
    title: '费用结构与预算规划建议',
    en_title: 'Surrogacy Cost Structure and Budget Planning Tips',
    content: '明确主要费用模块，减少流程中的不确定性。',
    en_content: 'Understand core cost modules and reduce surprises throughout the journey.',
    category: '行业动态相关',
    cover_img_url: '/images/pages/home/surrogate-gallery-12.webp',
  },
  {
    title: '代孕法律流程中需要重点关注什么',
    en_title: 'Key Legal Points to Watch in a Surrogacy Journey',
    content: '从合同、亲权判令到关键时间节点，帮助你提前准备法律环节。',
    en_content: 'From contracts to parentage orders, understand the legal checkpoints before you start.',
    category: '法律法规相关',
    cover_img_url: '/images/pages/home/surrogate-gallery-13.webp',
  },
]

const activeCategory = ref('all')
const categoryFixedOrder = categoryOptions.map(option => option.value)
const postsData = ref<BlogItem[]>([])
const isLoading = ref(false)
const inMemoryCategoryCache = new Map<string, BlogItem[]>()
let activeRequestId = 0
const CACHE_TTL_MS = 5 * 60 * 1000

function getCategoryCacheKey(category: string) {
  return `home-blog-news:${blogApiLang.value}:${category}`
}

function readCategoryCache(category: string): BlogItem[] | null {
  if (!import.meta.client)
    return null
  try {
    const raw = sessionStorage.getItem(getCategoryCacheKey(category))
    if (!raw)
      return null
    const parsed = JSON.parse(raw) as { timestamp?: number, data?: BlogItem[] }
    if (!parsed?.timestamp || !Array.isArray(parsed?.data))
      return null
    if (Date.now() - parsed.timestamp > CACHE_TTL_MS) {
      sessionStorage.removeItem(getCategoryCacheKey(category))
      return null
    }
    return parsed.data
  }
  catch {
    return null
  }
}

function writeCategoryCache(category: string, data: BlogItem[]) {
  if (!import.meta.client)
    return
  try {
    sessionStorage.setItem(getCategoryCacheKey(category), JSON.stringify({
      timestamp: Date.now(),
      data,
    }))
  }
  catch {
    // ignore cache write errors
  }
}

async function fetchCategoryPosts(category: string): Promise<BlogItem[]> {
  const response = await $fetch<BlogApiResponse>(`${apiBase.value}/api/blog`, {
    query: {
      page: 1,
      limit: 8,
      lang: blogApiLang.value,
      ...(category === 'all' ? {} : { category }),
    },
  })
  return Array.isArray(response?.blogs) ? response.blogs.slice(0, 8) : []
}

async function loadPostsByCategory(category: string) {
  const fromMemory = inMemoryCategoryCache.get(category)
  if (fromMemory) {
    postsData.value = fromMemory
    isLoading.value = false
    return
  }

  const fromSession = readCategoryCache(category)
  if (fromSession) {
    inMemoryCategoryCache.set(category, fromSession)
    postsData.value = fromSession
    isLoading.value = false
    return
  }

  const requestId = ++activeRequestId
  isLoading.value = true
  try {
    const list = await fetchCategoryPosts(category)
    inMemoryCategoryCache.set(category, list)
    writeCategoryCache(category, list)
    if (activeCategory.value === category)
      postsData.value = list
  }
  catch {
    if (activeCategory.value === category)
      postsData.value = []
  }
  finally {
    if (activeRequestId === requestId)
      isLoading.value = false
  }
}

async function prefetchOtherCategories() {
  for (const category of categoryFixedOrder) {
    if (category === activeCategory.value)
      continue
    if (inMemoryCategoryCache.has(category))
      continue
    const fromSession = readCategoryCache(category)
    if (fromSession) {
      inMemoryCategoryCache.set(category, fromSession)
      continue
    }
    try {
      const list = await fetchCategoryPosts(category)
      inMemoryCategoryCache.set(category, list)
      writeCategoryCache(category, list)
    }
    catch {
      // ignore prefetch failures
    }
  }
}

function selectCategory(category: string) {
  if (activeCategory.value === category)
    return
  activeCategory.value = category
  void loadPostsByCategory(category)
}

onMounted(() => {
  void loadPostsByCategory(activeCategory.value)
  if (import.meta.client) {
    window.setTimeout(() => {
      void prefetchOtherCategories()
    }, 600)
  }
})

watch(blogApiLang, () => {
  inMemoryCategoryCache.clear()
  postsData.value = []
  void loadPostsByCategory(activeCategory.value)
})

const posts = computed(() => {
  if (postsData.value.length)
    return postsData.value
  return activeCategory.value === 'all' ? defaultCards : []
})

function stripHtml(content?: string): string {
  if (!content)
    return ''
  return content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
}

function hasLocalizedContent(post: BlogItem): boolean {
  const localizedSummary = getLocalizedSummary(post)
  if (locale.value === 'zh') {
    return Boolean((post.title || post.en_title || '').trim()) && localizedSummary.length > 0
  }
  return Boolean((post.en_title || post.title || '').trim()) && localizedSummary.length > 0
}

const localizedPosts = computed(() => posts.value
  .filter(hasLocalizedContent)
  .filter((item) => {
    if (activeCategory.value === 'all')
      return true
    return (item.category || '').trim() === activeCategory.value
  }))

const categories = computed(() => ['all', ...categoryFixedOrder])

const displayPosts = computed(() => localizedPosts.value.slice(0, 4))

function getTitle(post: BlogItem): string {
  if (locale.value === 'zh')
    return (post.title || post.en_title || '').trim()
  return (post.en_title || post.title || '').trim()
}

/** 列表接口通常只返回 excerpt/meta description，详情接口才返回完整 content。 */
function getLocalizedSummary(post: BlogItem): string {
  const source = locale.value === 'zh'
    ? post.excerpt || post.meta_description || post.content || post.en_excerpt || post.en_meta_description || post.en_content
    : post.en_excerpt || post.en_meta_description || post.en_content || post.excerpt || post.meta_description || post.content

  return stripHtml(source)
}

function getExcerpt(post: BlogItem, maxLength: number): string {
  const plain = getLocalizedSummary(post)
  if (!plain)
    return copy.value.emptyDesc
  if (plain.length <= maxLength)
    return plain
  return `${plain.slice(0, maxLength)}...`
}

function getCategoryLabel(category?: string): string {
  if (!category)
    return copy.value.allCategory
  if (locale.value === 'zh')
    return category
  return categoryMapEn[category] || category
}

function getDateText(post: BlogItem): string {
  if (!post.created_at)
    return copy.value.fallbackDate
  const date = new Date(post.created_at)
  if (Number.isNaN(date.getTime()))
    return copy.value.fallbackDate
  return date.toLocaleDateString(locale.value === 'zh' ? 'zh-CN' : 'en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function getDetailPath(post: BlogItem): string {
  if (post.route_id)
    return localePath(`/blog/${post.route_id}`)
  if (post.id != null)
    return localePath(`/blog/${post.id}`)
  return localePath('/blog')
}
</script>

<template>
  <section class="relative overflow-hidden bg-[var(--yunda-petal)] px-4 py-12 md:px-20 md:py-16">
    <div class="pointer-events-none absolute h-60 w-60 rounded-full bg-[color-mix(in_srgb,var(--yunda-maple)_18%,transparent)] blur-3xl -left-16 -top-20" />
    <div class="pointer-events-none absolute h-68 w-68 rounded-full bg-[color-mix(in_srgb,var(--yunda-harvest)_25%,transparent)] blur-3xl -bottom-16 -right-18" />

    <div class="relative z-10 mx-auto max-w-[1320px]">
      <div class="scroll-animate flex flex-wrap items-end justify-between gap-5">
        <div>
          <p class="mb-3 inline-flex items-center rounded-full border border-[var(--yunda-bark)]/12 bg-white/80 px-4 py-1.5 text-3.2 text-[var(--yunda-maple)] font-semibold tracking-[0.2em] uppercase">
            {{ copy.label }}
          </p>
          <h2 class="font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:text-[42px]">
            {{ copy.title }}
          </h2>
          <p class="mt-3 max-w-3xl font-sans text-base text-[var(--yunda-bark)]/90 leading-[1.75] md:text-[17px]" style="font-family: var(--font-text)">
            {{ copy.subtitle }}
          </p>
        </div>

        <NuxtLink :to="localePath('/blog')" class="yunda-type-button inline-flex transform items-center gap-2 rounded-3 bg-[var(--yunda-bark)] px-5 py-3 text-[var(--yunda-petal)] tracking-[0.02em] shadow-[0_10px_24px_rgba(60,36,21,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95" style="font-family: var(--font-text)">
          <span>{{ copy.viewAll }}</span>
          <span class="text-4.5 leading-none">→</span>
        </NuxtLink>
      </div>

      <div class="scroll-animate scroll-animate-delay-100 mt-8 flex gap-2.5 overflow-x-auto pb-1">
        <button
          v-for="category in categories"
          :key="category"
          type="button"
          class="whitespace-nowrap border rounded-full px-3.5 py-1.8 text-3.2 font-semibold transition-all duration-300"
          :class="activeCategory === category
            ? 'border-[var(--yunda-bark)] bg-[var(--yunda-bark)] text-[var(--yunda-petal)] shadow-[0_8px_18px_rgba(60,36,21,0.2)]'
            : 'border-[var(--yunda-bark)]/20 bg-white/70 text-[var(--yunda-bark)] hover:border-[var(--yunda-maple)] hover:text-[var(--yunda-maple)]'"
          @click="selectCategory(category)"
        >
          {{ category === 'all' ? copy.allCategory : getCategoryLabel(category) }}
        </button>
      </div>

      <div class="grid grid-cols-1 mt-8 gap-5 lg:grid-cols-4 md:grid-cols-2">
        <article
          v-for="(post, idx) in displayPosts"
          :key="post.route_id || post.id || idx"
          class="scroll-animate group overflow-hidden rounded-5 bg-white shadow-[0_14px_34px_rgba(46,38,31,0.1)] transition-all duration-300 hover:shadow-[0_20px_40px_rgba(46,38,31,0.18)] hover:-translate-y-1"
          :class="[
            idx === 0 ? 'scroll-animate-delay-200' : '',
            idx === 1 ? 'scroll-animate-delay-300' : '',
            idx >= 2 ? 'scroll-animate-delay-400' : '',
          ]"
        >
          <NuxtLink :to="getDetailPath(post)" class="block h-full">
            <div class="h-58 overflow-hidden">
              <img
                :src="post.cover_img_url || '/images/pages/home/surrogate-gallery-02.jpeg'"
                :alt="getTitle(post) || copy.emptyTitle"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                width="640"
                height="853"
                loading="lazy"
                decoding="async"
              >
            </div>
            <div class="flex flex-col p-5">
              <div class="mb-2 flex flex-wrap items-center gap-2">
                <span class="rounded-full bg-[var(--yunda-petal)] px-2.5 py-1 text-2.9 text-[var(--yunda-maple)] font-semibold">{{ getCategoryLabel(post.category) }}</span>
                <span class="text-3 text-[var(--yunda-bark)]/65">{{ getDateText(post) }}</span>
              </div>
              <h3 class="line-clamp-2 font-sans text-[22px] text-[var(--yunda-bark)] font-bold leading-snug md:text-[26px]" style="font-family: var(--font-text)">
                {{ getTitle(post) || copy.emptyTitle }}
              </h3>
              <p class="line-clamp-3 mt-2 font-sans text-base text-[var(--yunda-bark)]/85 leading-[1.75]" style="font-family: var(--font-text)">
                {{ getExcerpt(post, 108) }}
              </p>
              <div class="mt-4 inline-flex items-center gap-2 text-3.3 text-[var(--yunda-bark)] font-semibold transition-colors group-hover:text-[var(--yunda-maple)]">
                <span>{{ copy.readMore }}</span>
                <span class="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </div>
            </div>
          </NuxtLink>
        </article>

        <article
          v-if="!displayPosts.length && !isLoading"
          class="scroll-animate scroll-animate-delay-300 border border-[var(--yunda-bark)]/14 rounded-5 bg-white/75 p-6 lg:col-span-4 md:col-span-2"
        >
          <h3 class="font-sans text-5 text-[var(--yunda-bark)] font-bold" style="font-family: var(--font-text)">
            {{ copy.emptyTitle }}
          </h3>
          <p class="mt-2 font-sans text-3.7 text-[var(--yunda-bark)]/85" style="font-family: var(--font-text)">
            {{ copy.emptyDesc }}
          </p>
          <NuxtLink :to="localePath('/blog')" class="mt-4 inline-flex items-center text-3.5 text-[var(--yunda-bark)] font-semibold transition-colors hover:text-[var(--yunda-maple)]">
            {{ copy.viewAll }}
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

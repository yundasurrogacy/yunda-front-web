<script setup lang="ts">
import AppFooter from '../../components/base/AppFooter.vue'
import AppHeader from '../../components/base/AppHeader.vue'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

interface Blog {
  id: number
  route_id?: string
  title: string
  content: string
  en_title?: string
  en_content?: string
  category: string
  cover_img_url: string
  tags: string
  reference_author: string
  created_at: string
  updated_at: string
}

// 使用服务端渲染获取博客详情数据
// 首先尝试通过route_id查询，如果失败则通过id查询
const { data: blog, pending: loading, error } = await useFetch(`https://yunda-admin-system.yundasurrogacy.com/api/blog?route_id=${route.params.id}`, {
  key: `blog-${route.params.id}`,
  server: true,
  default: () => null,
  transform: async (data: any) => {
    if (data && typeof data === 'object' && 'id' in data && 'title' in data) {
      return data as Blog
    }
    // 如果通过route_id查询失败，尝试通过id查询
    try {
      const fallbackResponse = await $fetch(`https://yunda-admin-system.yundasurrogacy.com/api/blog?id=${route.params.id}`)
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
// 提取纯文本摘要（去除HTML标签）
function getBlogExcerpt(blogData: Blog | null, maxLength: number = 159): string {
  const content = getBlogContent(blogData)
  if (!content)
    return ''

  // 移除 HTML 标签
  const plainText = content.replace(/<[^>]*>/g, '')
  // 移除多余的空白字符
  const cleaned = plainText.replace(/\s+/g, ' ').trim()

  // 截取指定长度
  if (cleaned.length > maxLength) {
    return `${cleaned.substring(0, maxLength)}...`
  }
  return cleaned
}
// 根据当前语言获取分类名称
function getCategoryName(categoryValue: string): string {
  // 根据中文分类值找到对应的翻译key
  const categoryOption = categoryOptions.find(option => option.value === categoryValue)
  if (categoryOption) {
    // 使用i18n翻译
    return t(`blog.categories.${categoryOption.key}`)
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
  router.push('/blog')
}

// SEO 配置
useHead(() => ({
  title: blog.value ? getBlogTitle(blog.value) : t('blog.meta.title'),
  meta: [
    {
      name: 'description',
      content: blog.value ? getBlogExcerpt(blog.value, 159) : t('blog.meta.description'),
    },
    {
      property: 'og:title',
      content: blog.value ? getBlogTitle(blog.value) : t('blog.meta.title'),
    },
    {
      property: 'og:description',
      content: blog.value ? getBlogExcerpt(blog.value, 159) : t('blog.meta.description'),
    },
    {
      property: 'og:type',
      content: 'article',
    },
    {
      property: 'og:image',
      content: blog.value?.cover_img_url || '',
    },
  ],
}))
</script>

<template>
  <div>
    <AppHeader />

    <!-- 博客详情页面主体 -->
    <div class="min-h-screen bg-[#F7F7F2]">
      <!-- 加载状态 -->
      <div v-if="loading" class="flex items-center justify-center py-24">
        <div class="inline-block size-12 animate-spin border-4 border-[#A9A67D] border-b-transparent rounded-full" />
        <p class="ml-4 text-lg text-gray-600">
          {{ $t('blog.loading') }}
        </p>
      </div>

      <!-- 错误状态 -->
      <div v-else-if="error" class="py-24 text-center">
        <div class="text-lg text-red-500">
          {{ error }}
        </div>
        <button
          class="mt-6 rounded-lg bg-[#A9A67D] px-6 py-3 text-white transition-colors hover:bg-[#9A8F6D]"
          @click="goBack"
        >
          {{ $t('blog.backToList') }}
        </button>
      </div>

      <!-- 博客详情内容 -->
      <div v-else-if="blog" class="mx-auto max-w-4xl px-4 py-12">
        <!-- 返回按钮 -->
        <button
          class="mb-6 flex items-center text-[#A9A67D] transition-colors hover:text-[#9A8F6D]"
          @click="goBack"
        >
          <svg class="mr-2 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {{ $t('blog.backToList') }}
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
            >
          </div>

          <!-- 文章头部 -->
          <div class="from-[#A9A67D]/5 to-[#8B9A7D]/5 bg-gradient-to-r p-8">
            <div class="mb-4">
              <span class="inline-flex items-center rounded-full bg-[#A9A67D] px-4 py-1.5 text-sm text-white font-medium shadow-sm">
                {{ getCategoryName(blog.category) }}
              </span>
            </div>
            <h1 class="mb-6 text-4xl text-gray-900 font-bold leading-tight font-[Cormorant,serif] md:text-5xl">
              {{ getBlogTitle(blog) }}
            </h1>
            <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <div class="flex items-center">
                <svg class="mr-2 size-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                </svg>
                <span class="font-medium">{{ blog.reference_author || $t('blog.author.default') }}</span>
              </div>
              <div class="flex items-center">
                <svg class="mr-2 size-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                </svg>
                <span>{{ blog.created_at ? formatDate(blog.created_at) : '' }}</span>
              </div>
            </div>
          </div>

          <!-- 文章内容 -->
          <div class="p-8 md:p-12">
            <div class="max-w-none prose prose-gray prose-lg">
              <div
                v-if="getBlogContent(blog)"
                class="whitespace-pre-wrap text-gray-700 leading-relaxed"
                v-html="getBlogContent(blog)"
              />
              <div v-else class="text-gray-500">
                {{ $t('blog.detail.noContent') }}
              </div>
            </div>

            <!-- 标签区域 -->
            <div
              v-if="blog.tags"
              class="mt-12 border-t border-gray-200 pt-8"
            >
              <div class="mb-4 flex items-center">
                <svg class="mr-2 size-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
                <h4 class="text-sm text-gray-700 font-medium">
                  {{ $t('blog.tags.title') }}
                </h4>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in blog.tags.split('|')"
                  :key="tag"
                  class="inline-flex items-center border border-gray-200 rounded-full bg-white px-3 py-1.5 text-xs text-gray-700 font-medium shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- 返回按钮 -->
            <div class="mt-12 border-t border-gray-200 pt-8">
              <button
                class="flex items-center rounded-lg bg-[#A9A67D] px-6 py-3 text-white transition-colors hover:bg-[#9A8F6D]"
                @click="goBack"
              >
                <svg class="mr-2 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                {{ $t('blog.backToList') }}
              </button>
            </div>
          </div>
        </article>
      </div>
    </div>

    <AppFooter />
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
  color: #374151;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-weight: 700;
  color: #111827;
  line-height: 1.3;
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
  color: #111827;
}

.prose em {
  font-style: italic;
  color: #6b7280;
}
</style>

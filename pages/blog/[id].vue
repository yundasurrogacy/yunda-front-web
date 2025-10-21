<script setup lang="ts">
import { onMounted, ref } from 'vue'
import AppFooter from '../../components/base/AppFooter.vue'
import AppHeader from '../../components/base/AppHeader.vue'

const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()

interface Blog {
  id: number
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

const blog = ref<Blog | null>(null)
const loading = ref(true)
const error = ref('')

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
  // 如果当前语言是英文且有英文标题，则返回英文标题
  if (locale.value === 'en' && blogData.en_title)
    return blogData.en_title

  // 否则返回中文标题
  return blogData.title
}

// 根据当前语言获取博客内容
function getBlogContent(blogData: Blog | null): string {
  if (!blogData)
    return ''
  // 如果当前语言是英文且有英文内容，则返回英文内容
  if (locale.value === 'en' && blogData.en_content)
    return blogData.en_content

  // 否则返回中文内容
  return blogData.content
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
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// 获取博客详情
async function fetchBlogDetail() {
  try {
    loading.value = true
    error.value = ''

    const blogId = route.params.id

    if (!blogId) {
      error.value = t('blog.error.invalidId')
      return
    }

    // 使用博客 API 接口获取详情
    const response = await $fetch(`https://yunda-admin-system.yundasurrogacy.com/api/blog?id=${blogId}`, {
      method: 'GET',
    })

    if (response && typeof response === 'object') {
      // 检查响应是否包含必要的字段
      if ('id' in response && 'title' in response) {
        blog.value = response as Blog
      }
      else {
        console.error('响应数据格式不正确:', response)
        throw new Error('Invalid blog data format')
      }
    }
    else {
      console.error('API 返回空数据或格式错误')
      throw new Error('Failed to fetch blog detail')
    }
  }
  catch (err) {
    console.error('获取博客详情错误:', err)
    error.value = t('blog.error.fetchFailed')
  }
  finally {
    loading.value = false
  }
}

// 返回博客列表
function goBack() {
  router.push('/blog')
}

// SEO 配置
useHead(() => ({
  title: blog.value ? `${getBlogTitle(blog.value)} - ${t('blog.meta.title')}` : t('blog.meta.title'),
  meta: [
    {
      name: 'description',
      content: blog.value ? getBlogContent(blog.value).substring(0, 160) : t('blog.meta.description'),
    },
    {
      property: 'og:title',
      content: blog.value ? getBlogTitle(blog.value) : t('blog.meta.title'),
    },
    {
      property: 'og:description',
      content: blog.value ? getBlogContent(blog.value).substring(0, 160) : t('blog.meta.description'),
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

onMounted(() => {
  fetchBlogDetail()
})
</script>

<template>
  <div>
    <AppHeader />

    <!-- 博客详情页面主体 -->
    <div class="min-h-screen bg-[#F7F7F2]">
      <!-- 加载状态 -->
      <div v-if="loading" class="flex items-center justify-center py-24">
        <div class="inline-block size-12 animate-spin rounded-full border-4 border-[#A9A67D] border-b-transparent" />
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
          <div class="bg-gradient-to-r from-[#A9A67D]/5 to-[#8B9A7D]/5 p-8">
            <div class="mb-4">
              <span class="inline-flex items-center rounded-full bg-[#A9A67D] px-4 py-1.5 text-sm font-medium text-white shadow-sm">
                {{ getCategoryName(blog.category) }}
              </span>
            </div>
            <h1 class="mb-6 font-[Cormorant,serif] text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
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
            <div class="prose prose-gray prose-lg max-w-none">
              <div class="whitespace-pre-wrap leading-relaxed text-gray-700">
                {{ getBlogContent(blog) || $t('blog.detail.noContent') }}
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
                <h4 class="text-sm font-medium text-gray-700">
                  {{ $t('blog.tags.title') }}
                </h4>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in blog.tags.split('|')"
                  :key="tag"
                  class="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:bg-gray-50"
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

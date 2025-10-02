<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import AppFooter from '../components/base/AppFooter.vue'
import AppHeader from '../components/base/AppHeader.vue'

const { t } = useI18n()

// SEO 配置
useHead({
  title: t('blog.meta.title'),
  meta: [
    {
      name: 'description',
      content: t('blog.meta.description'),
    },
    {
      property: 'og:title',
      content: t('blog.meta.title'),
    },
    {
      property: 'og:description',
      content: t('blog.meta.description'),
    },
    {
      property: 'og:type',
      content: 'website',
    },
  ],
})

interface Blog {
  id: number
  title: string
  content: string
  category: string
  cover_img_url: string
  tags: string
  reference_author: string
  created_at: string
  updated_at: string
}

const blogs = ref<Blog[]>([])
const loading = ref(true)
const error = ref('')
const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const itemsPerPage = 9

// 详情弹窗
const showDetail = ref(false)
const selectedBlog = ref<Blog | null>(null)

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

// 分类列表
const categories = ref<string[]>([])

// 分类统计
const categoryCounts = ref<Record<string, number>>({})

// 分页相关
const totalPages = ref(1)
const pagination = ref<any>(null)
const jumpToPage = ref(1)

// 打开博客详情
function viewBlogDetail(blog: Blog) {
  selectedBlog.value = blog
  showDetail.value = true
  // 禁用背景页面滚动
  disableBodyScroll()
}

// 关闭博客详情
function closeDetail() {
  showDetail.value = false
  selectedBlog.value = null
  // 恢复背景页面滚动
  enableBodyScroll()
}

// 禁用页面滚动
function disableBodyScroll() {
  document.body.style.overflow = 'hidden'
}

// 恢复页面滚动
function enableBodyScroll() {
  document.body.style.overflow = ''
}

// 清除筛选
function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'all'  // 使用 key 而不是翻译文本
  currentPage.value = 1
  // 清除筛选后滚动到内容区域
  scrollToTop()
}

// 快速跳转处理
function jumpToPageHandler() {
  const page = Math.max(1, Math.min(totalPages.value, jumpToPage.value))
  if (page !== currentPage.value) {
    currentPage.value = page
    // 跳转后滚动到顶部
    scrollToTop()
  }
  jumpToPage.value = page
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

// 格式化短日期
function formatDateShort(dateString: string) {
  if (!dateString)
    return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  })
}

// 获取博客数据
async function fetchBlogs() {
  try {
    loading.value = true
    error.value = ''

    // 构建查询参数
    const params = new URLSearchParams({
      page: currentPage.value.toString(),
      limit: itemsPerPage.toString(),
    })

    // 添加搜索参数
    if (searchQuery.value.trim()) {
      params.append('search', searchQuery.value.trim())
    }

    // 添加分类参数
    if (selectedCategory.value && selectedCategory.value !== 'all') {
      // 将分类 key 转换为对应的中文值发送给 API
      const categoryOption = categoryOptions.find(option => option.key === selectedCategory.value)
      if (categoryOption) {
        params.append('category', categoryOption.value)
      }
    }

    // 使用新的博客 API 接口
    const response = await $fetch(`https://yunda-admin-system.yundasurrogacy.com/api/blog?${params.toString()}`, {
      method: 'GET',
    })

    if (response && (response as any).blogs) {
      blogs.value = (response as any).blogs
      // 更新分页信息
      const paginationData = (response as any).pagination
      if (paginationData) {
        pagination.value = paginationData
        totalPages.value = paginationData.totalPages
      }
    }
    else {
      throw new Error('Failed to fetch blogs')
    }
  }
  catch (err) {
    console.error('Error fetching blogs:', err)
    error.value = t('blog.error.fetchFailed')
  }
  finally {
    loading.value = false
  }
}

// 获取分类统计
async function fetchCategories() {
  try {
    const response = await $fetch('https://yunda-admin-system.yundasurrogacy.com/api/blog/categories', {
      method: 'GET',
    })

    if (response && (response as any).categories) {
      // 更新分类列表和统计
      const { categories: apiCategories, categoryCounts: apiCategoryCounts } = response as any

      // 只显示API返回的有数据的分类，并添加'全部'选项
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
      
      categories.value = validCategories

      // 更新分类统计（需要将中文分类名映射为key）
      if (apiCategoryCounts) {
        const mappedCounts: Record<string, number> = {}
        Object.entries(apiCategoryCounts).forEach(([categoryValue, count]) => {
          const categoryOption = categoryOptions.find(option => option.value === categoryValue)
          if (categoryOption) {
            mappedCounts[categoryOption.key] = count as number
          }
        })
        categoryCounts.value = mappedCounts
      }
    }
  }
  catch (err) {
    console.error('Error fetching categories:', err)
    // API失败时只显示'全部'选项
    categories.value = ['all']
  }
}

// 监听筛选条件变化，重置页码并重新获取数据
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
  fetchBlogs()
  // 搜索/筛选后也滚动到内容区域
  scrollToTop()
})

// 监听页码变化，重新获取数据并滚动到顶部
watch(currentPage, () => {
  fetchBlogs()
  // 滚动到页面顶部
  scrollToTop()
})

// 滚动到博客内容区域顶部
function scrollToTop() {
  // 滚动到博客内容区域的开始位置，留出一些空间给sticky导航
  const blogContent = document.querySelector('.blog-content-area') as HTMLElement
  if (blogContent) {
    const elementPosition = blogContent.offsetTop
    const offsetPosition = elementPosition - 100 // 留出100px的空间

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
  else {
    // 如果没有找到博客内容区域，则滚动到页面顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }
}

onMounted(() => {
  // 初始化默认分类
  selectedCategory.value = 'all'  // 使用 key 而不是翻译文本
  fetchCategories()
  fetchBlogs()
})

// 组件卸载时恢复页面滚动
onUnmounted(() => {
  enableBodyScroll()
})
</script>

<template>
  <div>
    <AppHeader />

    <!-- 博客页面主体 -->
    <div class="min-h-screen bg-[#F7F7F2]">
      <!-- 第一屏：图片和搜索区域 -->
      <div class="min-h-[500px] flex items-center from-[#A9A67D] to-[#8B9A7D] bg-gradient-to-r">
        <div class="mx-auto max-w-7xl w-full px-4">
          <div class="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <!-- 左侧：大图 -->
            <div class="order-2 lg:order-1">
              <div class="relative">
                <img
                  src="/images/blog-hero.jpg"
                  :alt="$t('blog.heroAlt')"
                  class="h-[400px] w-full rounded-2xl object-cover shadow-2xl"
                  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
                >
                <div
                  class="h-[400px] w-full flex items-center justify-center rounded-2xl from-[#A9A67D]/20 to-[#8B9A7D]/20 bg-gradient-to-br shadow-2xl"
                  style="display: none;"
                >
                  <div class="text-center text-white">
                    <div class="mb-4 text-6xl">
                      🤱
                    </div>
                    <p class="text-xl font-medium">
                      {{ $t('blog.heroAlt') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 右侧：搜索区域 -->
            <div class="order-1 text-center lg:order-2 lg:text-left">
              <h1 class="mb-6 text-4xl text-white font-bold md:text-5xl">
                {{ $t('blog.title') }}
              </h1>
              <p class="mb-8 text-xl text-white/90">
                {{ $t('blog.meta.description') }}
              </p>

              <!-- 搜索框 -->
              <div class="relative mx-auto max-w-md lg:mx-0">
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="$t('blog.search.placeholder')"
                  class="w-full border-0 rounded-xl py-4 pl-12 pr-4 text-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    class="h-6 w-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
      </div>
          </div>
        </div>
      </div>
    </div>

      <!-- 第二屏：分类列表 + 内容展示 -->
      <div class="blog-content-area mx-auto max-w-7xl px-4 py-12">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <!-- 左侧：分类列表 -->
          <div class="lg:col-span-1">
            <div class="sticky top-24 rounded-xl bg-white p-6 shadow-lg">
              <div class="space-y-2">
                <button
                  v-for="category in categories"
                  :key="category"
                  class="w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors"
                  :class="[
                    selectedCategory === category
                      ? 'bg-[#A9A67D] text-white'
                      : 'text-gray-700 hover:bg-gray-100',
                  ]"
                  @click="selectedCategory = category"
                >
                  {{ $t(`blog.categories.${category}`) }}
                  <span
                    v-if="categoryCounts[category]"
                    class="ml-2 opacity-75"
                  >
                    ({{ categoryCounts[category] }})
                  </span>
                </button>
              </div>

              <!-- 清除筛选按钮 -->
              <button
                v-if="searchQuery || selectedCategory !== 'all'"
                class="mt-4 w-full rounded-lg px-4 py-2 text-sm text-red-600 font-medium transition-colors hover:bg-red-50 hover:text-red-700"
                @click="clearFilters"
              >
                {{ $t('blog.clearFilters') }}
              </button>
        </div>
      </div>

          <!-- 右侧：博客内容展示 -->
          <div class="lg:col-span-3">
            <!-- 加载状态 -->
            <div v-if="loading" class="py-12 text-center">
              <div class="inline-block h-8 w-8 animate-spin border-b-2 border-[#A9A67D] rounded-full" />
              <p class="mt-4 text-gray-600">
                {{ $t('blog.loading') }}
              </p>
            </div>

            <!-- 错误状态 -->
            <div v-else-if="error" class="py-12 text-center">
              <div class="text-lg text-red-500">
                {{ error }}
              </div>
              <button
                class="mt-4 rounded-lg bg-[#A9A67D] px-6 py-2 text-white transition-colors hover:bg-[#9A8F6D]"
                @click="fetchBlogs"
              >
                {{ $t('blog.retry') }}
              </button>
              </div>

            <!-- 博客列表 - 最多三列 -->
            <div
              v-else-if="blogs.length"
              class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              <article
                v-for="blog in blogs"
                :key="blog.id"
                class="group cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-xl"
                @click="viewBlogDetail(blog)"
              >
                <!-- 博客封面图片 - 正方形 -->
                <div class="aspect-square overflow-hidden">
                  <img
                    v-if="blog.cover_img_url"
                    :src="blog.cover_img_url"
                    :alt="blog.title"
                    class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  >
                  <div
                    v-else
                    class="h-full w-full flex items-center justify-center from-[#A9A67D]/20 to-[#8B9A7D]/20 bg-gradient-to-br"
                  >
                    <div class="text-6xl text-[#A9A67D]/30">
                      🤱
            </div>
          </div>
        </div>

                <!-- 博客内容 -->
                <div class="p-5">
                  <!-- 分类标签 -->
                  <div class="mb-2">
                    <span class="inline-block rounded-full bg-[#A9A67D]/10 px-3 py-1 text-xs text-[#A9A67D] font-medium">
                      {{ blog.category }}
                    </span>
                  </div>

                  <!-- 日期 -->
                  <div class="mb-2 text-xs text-gray-500">
                    {{ formatDateShort(blog.created_at) }}
                  </div>

                  <!-- 标题 -->
                  <h2 class="line-clamp-2 mb-3 text-lg text-gray-900 font-bold transition-colors group-hover:text-[#A9A67D]">
                    {{ blog.title }}
                  </h2>

                  <!-- 内容摘要 -->
                  <p class="line-clamp-3 mb-4 text-sm text-gray-600">
                    {{ blog.content.substring(0, 120) }}{{ blog.content.length > 120 ? '...' : '' }}
                  </p>

                  <!-- 作者 -->
                  <div class="flex items-center text-xs text-gray-500">
                    <span>{{ blog.reference_author || $t('blog.author.default') }}</span>
                  </div>
                </div>
              </article>
            </div>

            <!-- 空状态 -->
            <div v-else class="py-12 text-center">
              <div class="mb-4 text-6xl">
                📭
              </div>
              <h3 class="mb-2 text-2xl text-gray-900 font-bold">
                {{ $t('blog.noResults.title') }}
              </h3>
              <p class="text-gray-600">
                {{ $t('blog.noResults.description') }}
              </p>
            </div>

            <!-- 分页 -->
            <div
              v-if="totalPages > 1"
              class="mt-12 flex flex-col items-center space-y-4"
            >
              <!-- 分页信息 -->
              <div class="text-sm text-gray-600">
                {{ $t('blog.pagination.showing') }} {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, (pagination?.totalCount || 0)) }} {{ $t('blog.pagination.of') }} {{ pagination?.totalCount || 0 }} {{ $t('blog.pagination.results') }}
              </div>

              <!-- 分页导航 -->
              <nav class="flex items-center space-x-1">
                <!-- 首页按钮 -->
                <button
                  :disabled="currentPage === 1"
                  class="border border-gray-300 rounded-l-lg bg-white px-3 py-2 text-sm text-gray-500 font-medium transition-colors disabled:cursor-not-allowed hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50"
                  @click="currentPage = 1"
                >
                  {{ $t('blog.pagination.first') }}
                </button>

                <!-- 上一页按钮 -->
                <button
                  :disabled="currentPage === 1"
                  class="border-b border-t border-gray-300 bg-white px-3 py-2 text-sm text-gray-500 font-medium transition-colors disabled:cursor-not-allowed hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50"
                  @click="currentPage--"
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>

                <!-- 页码按钮 -->
                <template v-if="totalPages <= 7">
                  <!-- 总页数少于等于7时，显示所有页码 -->
                  <button
                    v-for="page in Array.from({ length: totalPages }, (_, i) => i + 1)"
                    :key="page"
                    class="border-b border-t px-3 py-2 text-sm font-medium transition-colors"
                    :class="[
                      currentPage === page
                        ? 'text-white bg-[#A9A67D] border-[#A9A67D]'
                        : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-700',
                    ]"
                    @click="currentPage = page"
                  >
                    {{ page }}
                  </button>
                </template>
                <template v-else>
                  <!-- 总页数大于7时，显示省略号 -->
                  <template v-if="currentPage <= 4">
                    <!-- 当前页在前4页时 -->
                    <button
                      v-for="page in [1, 2, 3, 4, 5]"
                      :key="page"
                      class="border-b border-t px-3 py-2 text-sm font-medium transition-colors"
                      :class="[
                        currentPage === page
                          ? 'text-white bg-[#A9A67D] border-[#A9A67D]'
                          : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-700',
                      ]"
                      @click="currentPage = page"
                    >
                      {{ page }}
                    </button>
                    <span class="px-3 py-2 text-sm text-gray-500">...</span>
                    <button
                      class="border-b border-t border-gray-300 bg-white px-3 py-2 text-sm text-gray-500 font-medium transition-colors hover:bg-gray-50 hover:text-gray-700"
                      @click="currentPage = totalPages"
                    >
                      {{ totalPages }}
                    </button>
                  </template>
                  <template v-else-if="currentPage >= totalPages - 3">
                    <!-- 当前页在后4页时 -->
                    <button
                      class="border-b border-t border-gray-300 bg-white px-3 py-2 text-sm text-gray-500 font-medium transition-colors hover:bg-gray-50 hover:text-gray-700"
                      @click="currentPage = 1"
                    >
                      1
                    </button>
                    <span class="px-3 py-2 text-sm text-gray-500">...</span>
                    <button
                      v-for="page in [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]"
                      :key="page"
                      class="border-b border-t px-3 py-2 text-sm font-medium transition-colors"
                      :class="[
                        currentPage === page
                          ? 'text-white bg-[#A9A67D] border-[#A9A67D]'
                          : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-700',
                      ]"
                      @click="currentPage = page"
                    >
                      {{ page }}
                    </button>
                  </template>
                  <template v-else>
                    <!-- 当前页在中间时 -->
                    <button
                      class="border-b border-t border-gray-300 bg-white px-3 py-2 text-sm text-gray-500 font-medium transition-colors hover:bg-gray-50 hover:text-gray-700"
                      @click="currentPage = 1"
                    >
                      1
                    </button>
                    <span class="px-3 py-2 text-sm text-gray-500">...</span>
                    <button
                      v-for="page in [currentPage - 1, currentPage, currentPage + 1]"
                      :key="page"
                      class="border-b border-t px-3 py-2 text-sm font-medium transition-colors"
                      :class="[
                        currentPage === page
                          ? 'text-white bg-[#A9A67D] border-[#A9A67D]'
                          : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-50 hover:text-gray-700',
                      ]"
                      @click="currentPage = page"
                    >
                      {{ page }}
                    </button>
                    <span class="px-3 py-2 text-sm text-gray-500">...</span>
                    <button
                      class="border-b border-t border-gray-300 bg-white px-3 py-2 text-sm text-gray-500 font-medium transition-colors hover:bg-gray-50 hover:text-gray-700"
                      @click="currentPage = totalPages"
                    >
                      {{ totalPages }}
                    </button>
                  </template>
                </template>

                <!-- 下一页按钮 -->
                <button
                  :disabled="currentPage === totalPages"
                  class="border-b border-t border-gray-300 bg-white px-3 py-2 text-sm text-gray-500 font-medium transition-colors disabled:cursor-not-allowed hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50"
                  @click="currentPage++"
                >
                  <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>

                <!-- 末页按钮 -->
                <button
                  :disabled="currentPage === totalPages"
                  class="border border-gray-300 rounded-r-lg bg-white px-3 py-2 text-sm text-gray-500 font-medium transition-colors disabled:cursor-not-allowed hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50"
                  @click="currentPage = totalPages"
                >
                  {{ $t('blog.pagination.last') }}
                </button>
              </nav>

              <!-- 快速跳转 -->
              <div class="flex items-center text-sm space-x-2">
                <span class="text-gray-600">{{ $t('blog.pagination.goTo') }}</span>
                <input
                  v-model.number="jumpToPage"
                  type="number"
                  :min="1"
                  :max="totalPages"
                  class="w-16 border border-gray-300 rounded px-2 py-1 text-center focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#A9A67D]"
                  @keyup.enter="jumpToPageHandler"
                >
                <button
                  class="rounded bg-[#A9A67D] px-3 py-1 text-sm text-white transition-colors hover:bg-[#9A8F6D]"
                  @click="jumpToPageHandler"
                >
                  {{ $t('blog.pagination.go') }}
          </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />

    <!-- 博客详情弹窗 -->
    <div
      v-if="showDetail"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      @click.self="closeDetail"
    >
      <div class="max-h-[90vh] max-w-4xl w-full flex flex-col rounded-2xl bg-white shadow-2xl border border-gray-100 overflow-hidden">
        <!-- 封面图片 -->
        <div
          v-if="selectedBlog?.cover_img_url"
          class="aspect-square max-h-64 overflow-hidden"
        >
          <img
            :src="selectedBlog.cover_img_url"
            :alt="selectedBlog.title"
            class="h-full w-full object-cover"
          >
        </div>
        <!-- 弹窗头部 -->
        <div class="flex-shrink-0 bg-gradient-to-r from-[#A9A67D]/5 to-[#8B9A7D]/5 p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1 pr-6">
              <div class="mb-4">
                <span class="inline-flex items-center rounded-full bg-[#A9A67D] px-3 py-1 text-xs font-medium text-white shadow-sm">
                  {{ selectedBlog?.category }}
                </span>
              </div>
              <h1 class="text-3xl font-bold text-gray-900 leading-tight mb-4">
                {{ selectedBlog?.title }}
              </h1>
              <div class="flex items-center space-x-4 text-sm text-gray-600">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
                  </svg>
                  <span class="font-medium">{{ selectedBlog?.reference_author || $t('blog.author.default') }}</span>
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                  </svg>
                  <span>{{ selectedBlog?.created_at ? formatDate(selectedBlog.created_at) : '' }}</span>
                </div>
              </div>
            </div>
            <button
              class="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-200"
              @click="closeDetail"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <!-- 弹窗内容区域 -->
        <div class="flex-1 overflow-y-auto bg-gray-50/30">
          <div class="p-6">
            <div class="prose prose-gray max-w-none">
              <div class="whitespace-pre-wrap text-gray-700 leading-relaxed text-base">
                {{ selectedBlog?.content || $t('blog.detail.noContent') }}
              </div>
            </div>

            <!-- 标签区域 -->
            <div
              v-if="selectedBlog?.tags"
              class="mt-8 pt-6 border-t border-gray-200"
            >
              <div class="flex items-center mb-4">
                <svg class="w-5 h-5 mr-2 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
                </svg>
                <h4 class="text-sm text-gray-700 font-medium">
                  {{ $t('blog.tags.title') }}
                </h4>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in selectedBlog.tags.split('|')"
                  :key="tag"
                  class="inline-flex items-center rounded-full bg-white border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
        </div>
        </div>
      </div>
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

/* 弹窗内容样式优化 */
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

/* 弹窗滚动条样式 */
.overflow-y-auto::-webkit-scrollbar {
  width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 4px;
  border: 2px solid #f8fafc;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* 弹窗动画效果 */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* 弹窗内容动画 */
.content-enter-active {
  transition: all 0.4s ease;
}

.content-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
</style>

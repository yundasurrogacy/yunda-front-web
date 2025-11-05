<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import AppFooter from '../../components/base/AppFooter.vue'
import AppHeader from '../../components/base/AppHeader.vue'

const { t, locale } = useI18n()

// 根据当前语言获取博客标题
function getBlogTitle(blog: Blog | null): string {
  if (!blog)
    return ''

  if (locale.value === 'zh') {
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

  if (locale.value === 'zh') {
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
  const content = getBlogContent(blog)
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

const searchQuery = ref('')
const selectedCategory = ref('')
const currentPage = ref(1)
const itemsPerPage = 9
const router = useRouter()

// 使用服务端渲染获取博客数据
const { data: blogsData, pending: loading, error } = await useFetch('https://yunda-admin-system.yundasurrogacy.com/api/blog', {
  key: 'blogs',
  server: true,
  default: () => ({ blogs: [], pagination: { totalPages: 1 } }),
  transform: (data: any) => data,
})

const blogs = computed(() => blogsData.value?.blogs || [])
const pagination = computed(() => blogsData.value?.pagination || { totalPages: 1 })
const totalPages = computed(() => pagination.value?.totalPages || 1)

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

// 使用服务端渲染获取分类数据
const { data: categoriesData } = await useFetch('https://yunda-admin-system.yundasurrogacy.com/api/blog/categories', {
  key: 'blog-categories',
  server: true,
  default: () => ({ categories: [], categoryCounts: {} }),
  transform: (data: any) => data,
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

// 分类统计
const categoryCounts = computed(() => {
  const apiCategoryCounts = categoriesData.value?.categoryCounts || {}
  const mappedCounts: Record<string, number> = {}

  Object.entries(apiCategoryCounts).forEach(([categoryValue, count]) => {
    const categoryOption = categoryOptions.find(option => option.value === categoryValue)
    if (categoryOption) {
      mappedCounts[categoryOption.key] = count as number
    }
  })

  return mappedCounts
})

const jumpToPage = ref(1)

// 跳转到博客详情页
function viewBlogDetail(blog: Blog) {
  // 只有当route_id存在时才使用route_id跳转，否则使用id
  if (blog.route_id) {
    router.push(`/blog/${blog.route_id}`)
  }
  else {
    router.push(`/blog/${blog.id}`)
  }
}

// 清除筛选
function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = 'all' // 使用 key 而不是翻译文本
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

// 格式化短日期
function formatDateShort(dateString: string) {
  if (!dateString)
    return ''
  const date = new Date(dateString)

  // 根据当前语言选择日期格式
  if (locale.value === 'en') {
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

// 刷新博客数据（用于筛选和分页）
async function refreshBlogData() {
  try {
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

    // 使用 $fetch 重新获取数据
    const response = await $fetch(`https://yunda-admin-system.yundasurrogacy.com/api/blog?${params.toString()}`)

    if (response && (response as any).blogs) {
      blogsData.value = response as any
    }
  }
  catch (err) {
    console.error('Error refreshing blogs:', err)
  }
}

// 监听筛选条件变化，重置页码并重新获取数据
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
  refreshBlogData()
  // 搜索/筛选后也滚动到内容区域
  scrollToTop()
})

// 监听页码变化，重新获取数据并滚动到顶部
watch(currentPage, () => {
  refreshBlogData()
  // 滚动到页面顶部
  scrollToTop()
})

// 滚动到博客内容区域顶部
function scrollToTop() {
  // 滚动到博客内容区域的开始位置，留出一些空间给sticky导航
  const blogContent = document.querySelector('.blog-content-area') as HTMLElement
  if (blogContent) {
    // const elementPosition = blogContent.offsetTop
    // const offsetPosition = elementPosition - 100 // 留出100px的空间

    // window.scrollTo({
    //   top: offsetPosition,
    //   behavior: 'smooth',
    // })
    window.scrollTo({
      top: 0,
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
  selectedCategory.value = 'all' // 使用 key 而不是翻译文本
})
</script>

<template>
  <div>
    <AppHeader />

    <!-- 博客页面主体 -->
    <div class="min-h-screen bg-[#F7F7F2]">
      <!-- 第一屏：图片与内容分栏，左图右内容，背景分色 -->
      <div class="w-full flex flex-col lg:flex-row">
        <!-- 左侧图片区域：宽度一半，高度自适应，图片等比例显示 -->
        <div class="w-full flex items-center justify-center bg-white p-0 lg:w-1/2" style="aspect-ratio: 16/9;">
          <img
            src="/images/blog-hero.jpg"
            :alt="$t('blog.heroAlt')"
            class="m-0 h-full w-full rounded-none object-cover"
            style="display:block;"
          >
        </div>
        <!-- 右侧内容区域：背景色#FAF1E0，搜索卡片白色，输入框#CAD3D0 -->
        <div class="w-full flex flex-col items-center justify-center bg-[#FAF1E0] px-8 py-16 lg:w-1/2">
          <div class="mx-auto max-w-md w-full flex flex-col items-center">
            <h1 class="mb-10 text-center text-5xl text-gray-900 font-bold font-[Cormorant,serif]">
              {{ $t('blog.title') }}
            </h1>
            <!-- 搜索卡片区域 -->
            <div class="w-full flex flex-col items-center rounded-xl bg-white px-8 py-6 shadow-lg">
              <div class="mb-3 w-full text-left text-base text-gray-700 font-medium">
                {{ $t('blog.search.title') }}
              </div>
              <div class="relative w-full">
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="$t('blog.search.placeholder')"
                  class="w-full border border-gray-300 rounded-xl py-4 pl-12 pr-4 text-lg focus:outline-none focus:ring-2 focus:ring-[#A9A67D]/30"
                  style="background-color: #CAD3D0;"
                >
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg
                    class="h-6 w-6 text-gray-500"
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
                @click="refreshBlogData"
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
                    :alt="getBlogTitle(blog)"
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
                      {{ getCategoryName(blog.category) }}
                    </span>
                  </div>

                  <!-- 日期 -->
                  <div class="mb-2 text-xs text-gray-500">
                    {{ formatDateShort(blog.created_at) }}
                  </div>

                  <!-- 标题 -->
                  <h2 class="line-clamp-2 mb-3 text-lg text-gray-900 font-bold transition-colors group-hover:text-[#A9A67D]">
                    {{ getBlogTitle(blog) }}
                  </h2>

                  <!-- 内容摘要 -->
                  <p class="line-clamp-3 mb-4 text-sm text-gray-600">
                    {{ getBlogExcerpt(blog, 120) }}
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

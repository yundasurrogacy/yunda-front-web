<template>
  <div>
    <AppHeader />

    <!-- 博客页面主体 -->
    <div class="bg-[#F7F7F2] min-h-screen">
      <!-- 页面头部横幅 -->
      <div class="bg-gradient-to-r from-[#A9A67D] to-[#8B9A7D] py-16">
        <div class="max-w-6xl mx-auto px-4 text-center">
          <h1 class="text-4xl md:text-5xl font-bold text-white mb-4">
            {{ $t('blog.meta.title') }}
          </h1>
          <p class="text-xl text-white/90 max-w-3xl mx-auto">
            {{ $t('blog.meta.description') }}
          </p>
        </div>
      </div>

      <!-- 搜索和筛选区域 -->
      <div class="bg-white border-b border-gray-200 py-8">
        <div class="max-w-6xl mx-auto px-4">
          <div class="flex flex-col md:flex-row gap-6 items-center justify-between">
            <!-- 搜索框 -->
            <div class="w-full md:w-96">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  :placeholder="$t('blog.search.placeholder')"
                  class="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A9A67D] focus:border-transparent"
                />
                <div class="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>

            <!-- 分类筛选 -->
            <div class="flex flex-wrap gap-2">
              <button
                v-for="category in categories"
                :key="category"
                @click="selectedCategory = category"
                :class="[
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  selectedCategory === category
                    ? 'bg-[#A9A67D] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                ]"
              >
                {{ category }}
                <span v-if="categoryCounts[category]" class="ml-1 opacity-75">
                  ({{ categoryCounts[category] }})
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- 博客内容区域 -->
      <div class="max-w-6xl mx-auto px-4 py-12">
        <!-- 加载状态 -->
        <div v-if="loading" class="text-center py-12">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#A9A67D]"></div>
          <p class="mt-4 text-gray-600">{{ $t('blog.loading') }}</p>
        </div>

        <!-- 错误状态 -->
        <div v-else-if="error" class="text-center py-12">
          <div class="text-red-500 text-lg">{{ error }}</div>
          <button
            @click="fetchBlogs"
            class="mt-4 px-6 py-2 bg-[#A9A67D] text-white rounded-lg hover:bg-[#9A8F6D] transition-colors"
          >
            {{ $t('blog.retry') }}
          </button>
        </div>

        <!-- 博客列表 -->
        <div v-else-if="filteredBlogs.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="blog in paginatedBlogs"
            :key="blog.id"
            class="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer"
            @click="viewBlogDetail(blog)"
          >
            <!-- 博客封面图片 -->
            <div class="aspect-[16/9] overflow-hidden">
              <img
                v-if="blog.cover_img_url"
                :src="blog.cover_img_url"
                :alt="blog.title"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                v-else
                class="w-full h-full bg-gradient-to-br from-[#A9A67D]/20 to-[#8B9A7D]/20 flex items-center justify-center"
              >
                <div class="text-6xl text-[#A9A67D]/30">
                  📝
                </div>
              </div>
            </div>

            <!-- 博客内容 -->
            <div class="p-6">
              <!-- 分类标签 -->
              <div class="mb-3">
                <span class="inline-block px-3 py-1 bg-[#A9A67D]/10 text-[#A9A67D] text-sm font-medium rounded-full">
                  {{ blog.category }}
                </span>
              </div>

              <!-- 标题 -->
              <h2 class="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#A9A67D] transition-colors line-clamp-2">
                {{ blog.title }}
              </h2>

              <!-- 作者和时间 -->
              <div class="flex items-center text-sm text-gray-500 mb-4">
                <span class="mr-4">{{ blog.reference_author || '孕达团队' }}</span>
                <span>{{ formatDate(blog.created_at) }}</span>
              </div>

              <!-- 标签 -->
              <div v-if="blog.tags" class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in blog.tags.split('|')"
                  :key="tag"
                  class="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                >
                  {{ tag }}
                </span>
              </div>

              <!-- 阅读更多按钮 -->
              <div class="flex items-center text-[#A9A67D] font-medium group-hover:text-[#9A8F6D] transition-colors">
                <span>{{ $t('blog.readMore') }}</span>
                <svg class="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </article>
        </div>

        <!-- 空状态 -->
        <div v-else class="text-center py-12">
          <div class="text-6xl mb-4">📭</div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ $t('blog.noResults.title') }}</h3>
          <p class="text-gray-600 mb-6">{{ $t('blog.noResults.description') }}</p>
          <button
            @click="clearFilters"
            class="px-6 py-2 bg-[#A9A67D] text-white rounded-lg hover:bg-[#9A8F6D] transition-colors"
          >
            {{ $t('blog.clearFilters') }}
          </button>
        </div>

        <!-- 分页 -->
        <div v-if="totalPages > 1" class="mt-12 flex justify-center">
          <nav class="flex items-center space-x-2">
            <button
              @click="currentPage = Math.max(1, currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ $t('blog.pagination.previous') }}
            </button>
            
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="currentPage = page"
              :class="[
                'px-4 py-2 border rounded-lg',
                currentPage === page
                  ? 'bg-[#A9A67D] text-white border-[#A9A67D]'
                  : 'border-gray-300 hover:bg-gray-50',
              ]"
            >
              {{ page }}
            </button>
            
            <button
              @click="currentPage = Math.min(totalPages, currentPage + 1)"
              :disabled="currentPage === totalPages"
              class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ $t('blog.pagination.next') }}
            </button>
          </nav>
        </div>
      </div>
    </div>

    <!-- 博客详情弹窗 -->
    <div
      v-if="showDetail"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      @click.self="closeDetail"
    >
      <div class="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <!-- 封面图片 -->
        <div v-if="selectedBlog?.cover_img_url" class="aspect-[16/9] overflow-hidden">
          <img
            :src="selectedBlog.cover_img_url"
            :alt="selectedBlog.title"
            class="w-full h-full object-cover"
          />
        </div>
        
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-start">
            <div>
              <span class="inline-block px-3 py-1 bg-[#A9A67D]/10 text-[#A9A67D] text-sm font-medium rounded-full mb-3">
                {{ selectedBlog?.category }}
              </span>
              <h2 class="text-2xl font-bold text-gray-900">{{ selectedBlog?.title }}</h2>
              <div class="flex items-center text-sm text-gray-500 mt-2">
                <span class="mr-4">{{ selectedBlog?.reference_author || '孕达团队' }}</span>
                <span>{{ formatDate(selectedBlog?.created_at) }}</span>
              </div>
            </div>
            <button
              @click="closeDetail"
              class="text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div v-if="selectedBlog?.tags" class="flex flex-wrap gap-2 mb-6">
            <span
              v-for="tag in selectedBlog.tags.split('|')"
              :key="tag"
              class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-md"
            >
              {{ tag }}
            </span>
          </div>
          
          <!-- 博客详细内容 -->
          <div class="prose max-w-none">
            <div class="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {{ selectedBlog?.content || $t('blog.detail.noContent') }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
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

// 响应式数据
const blogs = ref<any[]>([])
const loading = ref(true)
const error = ref('')
const searchQuery = ref('')
const selectedCategory = ref('全部')
const currentPage = ref(1)
const pageSize = 9

// 详情弹窗
const showDetail = ref(false)
const selectedBlog = ref<any>(null)

// 分类列表
const categories = computed(() => {
  const cats = ['全部']
  const uniqueCategories = [...new Set(blogs.value.map((blog) => blog.category))]
  return [...cats, ...uniqueCategories]
})

// 分类统计
const categoryCounts = computed(() => {
  const counts: Record<string, number> = {}
  blogs.value.forEach((blog) => {
    counts[blog.category] = (counts[blog.category] || 0) + 1
  })
  return counts
})

// 过滤后的博客
const filteredBlogs = computed(() => {
  let filtered = blogs.value

  // 按分类筛选
  if (selectedCategory.value !== '全部') {
    filtered = filtered.filter((blog) => blog.category === selectedCategory.value)
  }

  // 按标题搜索
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.trim().toLowerCase()
    filtered = filtered.filter((blog) =>
      blog.title.toLowerCase().includes(query),
    )
  }

  return filtered
})

// 分页相关
const totalPages = computed(() => Math.ceil(filteredBlogs.value.length / pageSize))

const paginatedBlogs = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  const end = start + pageSize
  return filteredBlogs.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// 方法
function viewBlogDetail(blog: any) {
  selectedBlog.value = blog
  showDetail.value = true
}

function closeDetail() {
  showDetail.value = false
  selectedBlog.value = null
}

function clearFilters() {
  searchQuery.value = ''
  selectedCategory.value = '全部'
  currentPage.value = 1
}

function formatDate(dateString: string) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// 获取博客数据
async function fetchBlogs() {
  try {
    loading.value = true
    error.value = ''
    
    // 使用现有的博客 API 接口
    const response = await $fetch('https://yunda-admin-system.yundasurrogacy.com/api/blog', {
      method: 'GET',
    })
    
    if (response && (response as any).blogs) {
      blogs.value = (response as any).blogs
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

// 监听筛选条件变化，重置页码
watch([searchQuery, selectedCategory], () => {
  currentPage.value = 1
})

onMounted(() => {
  fetchBlogs()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
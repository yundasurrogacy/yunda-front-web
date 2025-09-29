<template>
  <div class="bg-[#F7F7F2] min-h-screen pb-16">
    <!-- 顶部分栏区域 -->
    <div class="max-w-6xl mx-auto pt-10 pb-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-0 items-center">
      <div class="flex justify-center items-center h-full">
        <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Blog Banner" class="rounded-lg object-cover w-full h-56 md:h-72" />
      </div>
      <div class="flex flex-col items-center justify-center bg-[#F7F7F2] h-full">
        <h1 class="text-4xl font-bold text-[#271F18] mb-6 text-center">Blog</h1>
        <div class="w-full max-w-md">
          <label class="block text-[#271F18] text-base font-semibold mb-2">博客搜索</label>
          <div class="relative">
            <input v-model="search" type="text" class="w-full border rounded px-4 py-2 bg-[#EAF2EA] text-[#271F18] placeholder-[#6B6656]" placeholder="输入关键词。" />
            <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6656]">
              <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 主体区：分类+三列九组卡片 -->
    <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-0">
      <!-- 分类区 -->
      <div class="pt-2 md:pt-0 md:col-span-1">
        <h2 class="text-lg font-bold text-[#271F18] mb-4">Categories</h2>
        <ul class="space-y-2">
          <li v-for="cat in categories" :key="cat.name" class="flex justify-between items-center text-[#271F18] cursor-pointer"
              :class="cat.name===activeCategory ? 'font-bold text-[#A9A67D]' : ''"
              @click="selectCategory(cat.name)">
            <span>{{cat.name}}</span>
            <span class="text-[#A9A67D]">({{cat.count}})</span>
          </li>
        </ul>
        <div class="mt-6">
          <button class="bg-[#EAF2EA] text-[#271F18] px-4 py-2 rounded font-semibold shadow"
                  :class="activeCategory==='全部' ? 'border border-[#A9A67D]' : ''"
                  @click="selectCategory('全部')">所有blog {{blogs.length}}</button>
        </div>
      </div>
      <!-- 三列九组 Blog 卡片 -->
      <div class="md:col-span-3">
        <div v-if="pagedBlogs.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div v-for="blog in pagedBlogs" :key="blog.id" class="bg-white rounded-xl shadow border border-gray-200 overflow-hidden flex flex-col">
            <img v-if="blog.cover" :src="blog.cover" class="w-full h-48 object-cover" />
            <div class="p-5 flex-1 flex flex-col">
              <h2 class="text-lg font-bold text-[#271F18] mb-2">{{blog.title}}</h2>
              <div class="flex items-center gap-2 text-xs text-[#A9A67D] mb-2">
                <span>{{blog.author || 'Admin'}}</span>
                <span>·</span>
                <span>{{blog.date}}</span>
              </div>
              <div class="mb-2 text-[#6B6656] line-clamp-3">{{blog.content}}</div>
              <div class="flex flex-wrap gap-2 mb-2">
                <span v-for="tag in blog.tags" :key="tag" class="bg-[#F7F7F2] border border-[#A9A67D] text-[#A9A67D] px-2 py-1 rounded text-xs">{{tag}}</span>
              </div>
              <button class="text-[#A9A67D] underline mt-auto" @click="viewBlog(blog)">阅读全文</button>
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-400 py-12">暂无博客内容</div>

        <!-- 分页区始终显示 -->
        <div class="flex justify-center mt-8 gap-2 items-center">
          <span class="text-[#6B6656] font-semibold mr-2">分页</span>
          <button @click="goPage(1)" :disabled="page===1" class="px-2 py-1 rounded border bg-white text-[#271F18] border-gray-300 disabled:opacity-40">&lt;&lt;</button>
          <button @click="goPage(page-1)" :disabled="page===1" class="px-2 py-1 rounded border bg-white text-[#271F18] border-gray-300 disabled:opacity-40">&lt;</button>
          <button v-for="p in totalPages" :key="p" @click="goPage(p)"
            :class="['px-3 py-1 rounded border', p===page ? 'bg-[#A9A67D] text-white border-[#A9A67D]' : 'bg-white text-[#271F18] border-gray-300']">
            {{p}}
          </button>
          <button @click="goPage(page+1)" :disabled="page===totalPages" class="px-2 py-1 rounded border bg-white text-[#271F18] border-gray-300 disabled:opacity-40">&gt;</button>
          <button @click="goPage(totalPages)" :disabled="page===totalPages" class="px-2 py-1 rounded border bg-white text-[#271F18] border-gray-300 disabled:opacity-40">&gt;&gt;</button>
        </div>
      </div>
    </div>

    <!-- 详情弹窗 -->
    <div v-if="showDetail" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 w-full max-w-2xl shadow-lg relative">
        <button class="absolute top-3 right-3 text-gray-400 text-2xl" @click="showDetail = false">×</button>
        <img v-if="detail.cover" :src="detail.cover" class="w-full h-72 object-cover rounded mb-3" />
        <h2 class="text-3xl font-bold mb-2 text-[#271F18]">{{detail.title}}</h2>
        <div class="flex items-center gap-2 text-xs text-[#A9A67D] mb-2">
          <span>{{detail.author || 'Admin'}}</span>
          <span>·</span>
          <span>{{detail.date}}</span>
        </div>
        <div class="mb-4 text-[#6B6656]">{{detail.content}}</div>
        <div class="flex flex-wrap gap-2 mb-2">
          <span v-for="tag in detail.tags" :key="tag" class="bg-[#F7F7F2] border border-[#A9A67D] text-[#A9A67D] px-2 py-1 rounded text-xs">{{tag}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';

const blogs = ref<any[]>([]);
const loading = ref(true);
const error = ref('');

// 分类相关
const categoryNames = [
  '代孕妈妈相关',
  '准父母相关',
  '孕达品牌相关',
  '代孕流程相关',
  '法律法规相关',
  '行业动态相关',
  '医学健康相关',
  '教育科普相关',
  '成功案例相关',
  '心理情绪相关',
];
const categories = computed(() => {
  return categoryNames.map(name => ({
    name,
    count: blogs.value.filter(b => b.category === name).length
  }));
});

const activeCategory = ref('全部');
function selectCategory(name: string) {
  activeCategory.value = name;
  page.value = 1;
}

// 搜索和分类过滤
const search = ref('');
const filteredBlogs = computed(() => {
  let arr = blogs.value;
  if (activeCategory.value !== '全部') {
    arr = arr.filter(b => b.category === activeCategory.value);
  }
  if (search.value.trim()) {
    const kw = search.value.trim().toLowerCase();
    arr = arr.filter(b => b.title.toLowerCase().includes(kw) || b.content.toLowerCase().includes(kw));
  }
  return arr;
});

// 分页
const pageSize = 9;
const page = ref(1);
const totalPages = computed(() => Math.max(1, Math.ceil(filteredBlogs.value.length / pageSize)));
const pagedBlogs = computed(() => filteredBlogs.value.slice((page.value-1)*pageSize, page.value*pageSize));
function goPage(p: number) {
  if (p < 1 || p > totalPages.value) return;
  page.value = p;
}

const showDetail = ref(false);
const detail = ref<any>({});
function viewBlog(blog: any) {
  detail.value = blog;
  showDetail.value = true;
}

// 获取接口数据
async function fetchBlogs() {
  loading.value = true;
  error.value = '';
  try {
    const res = await fetch('https://yunda-admin-system.yundasurrogacy.com/api/blog');
    const data = await res.json();
    console.log(data);
    blogs.value = (data.blogs || []).map((b: { id: any; title: any; content: any; category: any; cover_img_url: any; created_at: string | any[]; }) => ({
      id: b.id,
      title: b.title,
      content: b.content,
      category: b.category,
      cover: b.cover_img_url,
      // author: '',
      date: b.created_at ? b.created_at.slice(0, 10) : '',
      // 其它字段可扩展
    }));
  } catch (e) {
    error.value = '博客数据获取失败';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchBlogs();
});
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  line-clamp: 3;
}
</style>

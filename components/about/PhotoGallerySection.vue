<script setup lang="ts">
import { computed, ref } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

// 照片分类
type PhotoCategory = 'all' | 'our-team' | 'asrm' | 'seeds'

interface Photo {
  id: string
  url: string
  thumbnail: string
  category: PhotoCategory[]
  alt: string
}

// 照片数据 - 使用真实图片链接
const baseUrl = 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/about-us'

const photos = ref<Photo[]>([
  // Our Team 照片 (1-4)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `ourteam-${i + 1}`,
    url: `${baseUrl}/ourteam-${i + 1}.jpg`,
    thumbnail: `${baseUrl}/ourteam-${i + 1}.jpg`,
    category: ['all', 'our-team'] as PhotoCategory[],
    alt: `Our Team ${i + 1}`,
  })),
  // ASRM 照片 (1-13)
  ...Array.from({ length: 13 }, (_, i) => ({
    id: `asrm-${i + 1}`,
    url: `${baseUrl}/asrm-${i + 1}.jpg`,
    thumbnail: `${baseUrl}/asrm-${i + 1}.jpg`,
    category: ['all', 'asrm'] as PhotoCategory[],
    alt: `ASRM Conference ${i + 1}`,
  })),
  // SEEDS 照片 (1-6)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `seeds-${i + 1}`,
    url: `${baseUrl}/seeds-${i + 1}.jpg`,
    thumbnail: `${baseUrl}/seeds-${i + 1}.jpg`,
    category: ['all', 'seeds'] as PhotoCategory[],
    alt: `SEEDS Event ${i + 1}`,
  })),
])

const activeCategory = ref<PhotoCategory>('all')

const filteredPhotos = computed(() => {
  if (activeCategory.value === 'all')
    return photos.value
  return photos.value.filter(photo => photo.category.includes(activeCategory.value))
})

const categories: Array<{ key: PhotoCategory, label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'our-team', label: 'Our Team' },
  { key: 'asrm', label: 'ASRM' },
  { key: 'seeds', label: 'SEEDS' },
]

const currentIndex = ref(0)
const showCarousel = ref(false)
const carouselPhotos = ref<Photo[]>([])

function openCarousel(startIndex: number) {
  carouselPhotos.value = filteredPhotos.value
  currentIndex.value = startIndex
  showCarousel.value = true
  document.body.style.overflow = 'hidden'
}

function closeCarousel() {
  showCarousel.value = false
  document.body.style.overflow = ''
}

function nextPhoto() {
  currentIndex.value = (currentIndex.value + 1) % carouselPhotos.value.length
}

function prevPhoto() {
  currentIndex.value = (currentIndex.value - 1 + carouselPhotos.value.length) % carouselPhotos.value.length
}

function handleKeydown(e: KeyboardEvent) {
  if (!showCarousel.value)
    return
  if (e.key === 'Escape')
    closeCarousel()
  else if (e.key === 'ArrowRight')
    nextPhoto()
  else if (e.key === 'ArrowLeft')
    prevPhoto()
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <section class="relative overflow-hidden bg-[rgba(234,232,208,0.2)] px-4 py-20 md:px-20 md:py-25">
    <!-- 装饰性背景元素 -->
    <div class="pointer-events-none absolute inset-0 opacity-5">
      <div class="absolute h-96 w-96 rounded-full bg-[var(--grayish-green)] blur-3xl -left-20 -top-20" />
      <div class="absolute h-96 w-96 rounded-full bg-[var(--primary-brown)] blur-3xl -bottom-20 -right-20" />
    </div>

    <div class="relative mx-auto max-w-320">
      <!-- 标题区域 -->
      <div class="scroll-animate mb-10 text-center md:mb-16">
        <h2 class="mb-6 text-7.5 font-semibold md:text-10" style="font-family: var(--font-primary)">
          {{ $t('about.photoGallery.title') }}
        </h2>
        <p class="mx-auto max-w-235 text-3.5 text-gray-700 leading-relaxed md:text-4.5">
          {{ $t('about.photoGallery.description') }}
        </p>
      </div>

      <!-- 分类标签 -->
      <div class="scroll-animate scroll-animate-delay-100 mb-12 flex flex-wrap justify-center gap-3 md:mb-16 md:gap-4">
        <button
          v-for="cat in categories"
          :key="cat.key"
          class="relative rounded-full px-6 py-2.5 text-4 font-medium transition-all duration-300 md:px-8 md:py-3 md:text-5"
          :class="activeCategory === cat.key
            ? 'bg-[var(--grayish-green)] text-white shadow-lg shadow-[var(--grayish-green)]/30 scale-105'
            : 'bg-white/80 text-gray-700 backdrop-blur-sm hover:bg-white hover:shadow-md hover:scale-105'"
          @click="activeCategory = cat.key"
        >
          {{ $t(`about.photoGallery.categories.${cat.key}`) }}
        </button>
      </div>

      <!-- 照片网格 - 只显示前4张 -->
      <div class="scroll-animate scroll-animate-delay-200 relative">
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3 md:gap-6">
          <div
            v-for="(photo, index) in filteredPhotos.slice(0, 4)"
            :key="photo.id"
            class="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-200 pb-[100%] shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            @click="openCarousel(index)"
          >
            <img
              :src="photo.thumbnail || photo.url"
              :alt="photo.alt"
              class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            >
            <!-- 悬停遮罩 -->
            <div class="absolute inset-0 from-black/40 via-transparent to-transparent bg-gradient-to-t opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>

        <!-- 如果照片超过4张，显示右滑按钮 - 垂直居中且不遮挡图片 -->
        <button
          v-if="filteredPhotos.length > 4"
          :aria-label="$t('about.photoGallery.viewMore')"
          class="absolute right-0 top-1/2 z-10 h-14 w-14 flex items-center justify-center rounded-full bg-[var(--grayish-green)] text-white shadow-xl transition-all duration-300 lg:right-4 md:h-16 md:w-16 -translate-y-1/2 hover:scale-110 hover:bg-[var(--grayish-green)] hover:shadow-2xl"
          @click="openCarousel(4)"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="md:h-8 md:w-8">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <!-- 照片数量提示 -->
      <div v-if="filteredPhotos.length > 4" class="mt-8 text-center">
        <p class="text-3.5 text-gray-600 md:text-4">
          {{ $t('about.photoGallery.viewing') }} {{ filteredPhotos.slice(0, 4).length }} / {{ filteredPhotos.length }} {{ $t('about.photoGallery.photos') }}
        </p>
      </div>
    </div>

    <!-- 轮播模态框 -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showCarousel"
          class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          @click.self="closeCarousel"
        >
          <!-- 关闭按钮 -->
          <button
            class="absolute right-4 top-4 z-20 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition-all duration-300 md:right-8 md:top-8 hover:scale-110 hover:bg-white/20"
            @click="closeCarousel"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <!-- 上一张按钮 -->
          <button
            v-if="carouselPhotos.length > 1"
            class="absolute left-4 z-20 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-all duration-300 md:left-8 hover:scale-110 hover:bg-white/20"
            @click="prevPhoto"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <!-- 照片容器 -->
          <div class="relative max-h-[90vh] max-w-[90vw] px-16 md:px-20">
            <img
              :src="carouselPhotos[currentIndex]?.url"
              :alt="carouselPhotos[currentIndex]?.alt"
              class="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
            >
          </div>

          <!-- 下一张按钮 -->
          <button
            v-if="carouselPhotos.length > 1"
            class="absolute right-4 z-20 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-all duration-300 md:right-8 hover:scale-110 hover:bg-white/20"
            @click="nextPhoto"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <!-- 照片计数器 -->
          <div v-if="carouselPhotos.length > 1" class="absolute bottom-6 left-1/2 rounded-full bg-black/60 px-6 py-2.5 text-white backdrop-blur-md -translate-x-1/2">
            <span class="text-4 font-medium md:text-5">{{ currentIndex + 1 }} / {{ carouselPhotos.length }}</span>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
/* 轮播模态框动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

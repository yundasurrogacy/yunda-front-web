<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

// 照片分类
type PhotoCategory = 'all' | 'our-team' | 'asrm' | 'seeds' | 'mhb'

interface Photo {
  id: string
  url: string
  thumbnail: string
  category: PhotoCategory[]
  alt: string
}

// 照片数据 - 使用本地处理后的图片
const baseUrl = '/images/pages/about'

const photos = ref<Photo[]>([
  // Our Team 照片 (1-4)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `ourteam-${i + 1}`,
    url: `${baseUrl}/team/team-${i + 1}.jpg`,
    thumbnail: `${baseUrl}/team/team-${i + 1}.jpg`,
    category: ['all', 'our-team'] as PhotoCategory[],
    alt: `Our Team ${i + 1}`,
  })),
  // ASRM 照片 (1-13)
  ...Array.from({ length: 13 }, (_, i) => ({
    id: `asrm-${i + 1}`,
    url: `${baseUrl}/asrm/asrm-${i + 1}.jpg`,
    thumbnail: `${baseUrl}/asrm/asrm-${i + 1}.jpg`,
    category: ['all', 'asrm'] as PhotoCategory[],
    alt: `ASRM Conference ${i + 1}`,
  })),
  // SEEDS 照片 (1-6)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `seeds-${i + 1}`,
    url: `${baseUrl}/seeds/seeds-${i + 1}.jpg`,
    thumbnail: `${baseUrl}/seeds/seeds-${i + 1}.jpg`,
    category: ['all', 'seeds'] as PhotoCategory[],
    alt: `SEEDS Event ${i + 1}`,
  })),
  // MHB 照片 (1-6)
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `mhb-${i + 1}`,
    url: `/images/pages/about/mhb/mhb-${i + 1}.jpg`,
    thumbnail: `/images/pages/about/mhb/mhb-${i + 1}.jpg`,
    category: ['all', 'mhb'] as PhotoCategory[],
    alt: `MHB Event ${i + 1}`,
  })),
  {
    id: 'ourteam-surrogate-12',
    url: '/images/pages/home/surrogate-gallery-12.webp',
    thumbnail: '/images/pages/home/surrogate-gallery-12.webp',
    category: ['all', 'our-team'],
    alt: 'Team Highlight Surrogate 12',
  },
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
  { key: 'mhb', label: 'MHB' },
]

// 滑块相关状态
const visibleStartIndex = ref(0)
const photosPerView = ref(4) // 默认显示4张
const photoGridRef = ref<HTMLElement | null>(null)

// 计算当前可见的照片范围
const visiblePhotos = computed(() => {
  return filteredPhotos.value.slice(visibleStartIndex.value, visibleStartIndex.value + photosPerView.value)
})

// 是否可以向左滑动
const canScrollLeft = computed(() => visibleStartIndex.value > 0)

// 是否可以向右滑动
const canScrollRight = computed(() => visibleStartIndex.value + photosPerView.value < filteredPhotos.value.length)

// 向左滑动
function scrollLeft() {
  if (canScrollLeft.value) {
    visibleStartIndex.value = Math.max(0, visibleStartIndex.value - photosPerView.value)
  }
}

// 向右滑动
function scrollRight() {
  if (canScrollRight.value) {
    visibleStartIndex.value = Math.min(
      filteredPhotos.value.length - photosPerView.value,
      visibleStartIndex.value + photosPerView.value,
    )
  }
}

// 监听窗口大小变化，调整每屏显示的照片数量
function updatePhotosPerView() {
  if (typeof window === 'undefined')
    return

  if (window.innerWidth >= 1280) {
    // xl: 4列
    photosPerView.value = 4
  }
  else if (window.innerWidth >= 768) {
    // md: 3列
    photosPerView.value = 3
  }
  else {
    // 移动端: 2列
    photosPerView.value = 2
  }

  // 确保起始索引不超出范围
  if (visibleStartIndex.value + photosPerView.value > filteredPhotos.value.length) {
    visibleStartIndex.value = Math.max(0, filteredPhotos.value.length - photosPerView.value)
  }
}

// 轮播模态框相关（保留用于点击图片放大查看）
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
  window.addEventListener('resize', updatePhotosPerView)
  updatePhotosPerView()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeydown)
  window.removeEventListener('resize', updatePhotosPerView)
  document.body.style.overflow = ''
})

// 监听分类变化，重置滑块位置
watch(activeCategory, () => {
  visibleStartIndex.value = 0
})
</script>

<template>
  <section class="relative overflow-hidden bg-[var(--yunda-petal)] px-4 py-20 md:px-20 md:py-25">
    <!-- 装饰性背景元素 -->
    <div class="pointer-events-none absolute inset-0 opacity-5">
      <div class="absolute h-96 w-96 rounded-full bg-[color-mix(in_srgb,var(--yunda-sky)_40%,transparent)] blur-3xl -left-20 -top-20" />
      <div class="absolute h-96 w-96 rounded-full bg-[color-mix(in_srgb,var(--yunda-maple)_25%,transparent)] blur-3xl -bottom-20 -right-20" />
    </div>

    <div class="relative mx-auto max-w-320">
      <!-- 标题区域 -->
      <div class="scroll-animate mb-10 text-center md:mb-16">
        <h2 class="mb-6 font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:text-[42px]">
          {{ $t('about.photoGallery.title') }}
        </h2>
        <p class="mx-auto max-w-235 font-sans text-base text-[var(--yunda-bark)]/90 leading-[1.75] md:text-[17px]" style="font-family: var(--font-text)">
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
            ? 'bg-[var(--yunda-bark)] text-[var(--yunda-petal)] shadow-lg shadow-[rgba(60,36,21,0.2)] scale-105'
            : 'bg-white/80 text-[var(--yunda-bark)] backdrop-blur-sm hover:border-[var(--yunda-maple)] hover:text-[var(--yunda-maple)] hover:shadow-md hover:scale-105'"
          @click="activeCategory = cat.key"
        >
          {{ $t(`about.photoGallery.categories.${cat.key}`) }}
        </button>
      </div>

      <!-- 照片网格 - 滑块交互 -->
      <div class="scroll-animate scroll-animate-delay-200 relative">
        <!-- 左滑按钮 -->
        <button
          v-if="canScrollLeft"
          :aria-label="$t('about.photoGallery.viewMore')"
          class="absolute left-0 top-1/2 z-10 h-14 w-14 flex items-center justify-center rounded-full bg-[var(--yunda-bark)] text-[var(--yunda-petal)] shadow-xl transition-all duration-300 lg:left-4 md:h-16 md:w-16 -translate-y-1/2 hover:scale-110 hover:opacity-95 hover:shadow-2xl"
          @click="scrollLeft"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="md:h-8 md:w-8">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <!-- 照片网格 -->
        <div ref="photoGridRef" class="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3 md:gap-6">
          <div
            v-for="(photo, index) in visiblePhotos"
            :key="photo.id"
            class="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-200 pb-[100%] shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            @click="openCarousel(visibleStartIndex + index)"
          >
            <img
              :src="photo.thumbnail || photo.url"
              :alt="photo.alt"
              class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              width="1200"
              height="1200"
              loading="lazy"
              decoding="async"
            >
            <!-- 悬停遮罩 -->
            <div class="absolute inset-0 from-black/40 via-transparent to-transparent bg-gradient-to-t opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>

        <!-- 右滑按钮 -->
        <button
          v-if="canScrollRight"
          :aria-label="$t('about.photoGallery.viewMore')"
          class="absolute right-0 top-1/2 z-10 h-14 w-14 flex items-center justify-center rounded-full bg-[var(--yunda-bark)] text-[var(--yunda-petal)] shadow-xl transition-all duration-300 lg:right-4 md:h-16 md:w-16 -translate-y-1/2 hover:scale-110 hover:opacity-95 hover:shadow-2xl"
          @click="scrollRight"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="md:h-8 md:w-8">
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <!-- 照片数量提示 -->
      <div v-if="filteredPhotos.length > photosPerView" class="mt-8 text-center">
        <p class="font-sans text-3.5 text-[var(--yunda-bark)]/70 md:text-4" style="font-family: var(--font-text)">
          {{ $t('about.photoGallery.viewing') }} {{ visibleStartIndex + 1 }}-{{ Math.min(visibleStartIndex + photosPerView, filteredPhotos.length) }} / {{ filteredPhotos.length }} {{ $t('about.photoGallery.photos') }}
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
              width="1200"
              height="1200"
              decoding="async"
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

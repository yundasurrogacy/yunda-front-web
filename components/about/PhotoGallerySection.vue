<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { aboutGalleryPhotos } from '~/data/about-gallery-photos'

useScrollAnimation()

const { locale } = useI18n()
const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en: string, zh: string) => (isZh.value ? zh : en)

// 照片分类
type PhotoCategory = 'all' | 'our-team' | 'asrm' | 'seeds' | 'mhb' | 'families-out-loud'

interface Photo {
  id: string
  url: string
  thumbnail: string
  category: PhotoCategory[]
  alt: string
  srcSet?: string
  width?: number
  height?: number
  fit?: 'contain' | 'cover'
}

// 照片数据 - 使用本地处理后的图片
const baseUrl = '/images/pages/about'

const photos = computed<Photo[]>(() => [
  // Existing team and industry photos; event dates have not been supplied.
  ...Array.from({ length: 6 }, (_, i) => ({
    id: `ourteam-activity-${i + 1}`,
    url: `${baseUrl}/team/activity-${i + 1}.jpg`,
    thumbnail: `${baseUrl}/team/activity-${i + 1}.jpg`,
    category: ['all', 'our-team'] as PhotoCategory[],
    alt: tt(`Yunda Surrogacy team and industry activity, photo ${i + 1}`, `Yunda Surrogacy 团队与行业活动照片 ${i + 1}`),
  })),
  // Our Team 照片 (1-4)
  ...Array.from({ length: 4 }, (_, i) => ({
    id: `ourteam-${i + 1}`,
    url: `${baseUrl}/team/team-${i + 1}.jpg`,
    thumbnail: `${baseUrl}/team/team-${i + 1}.jpg`,
    category: ['all', 'our-team'] as PhotoCategory[],
    alt: tt(`Yunda Surrogacy team, photo ${i + 1}`, `Yunda Surrogacy 团队照片 ${i + 1}`),
  })),
  // ASRM 照片 (1-13)
  ...Array.from({ length: 13 }, (_, i) => ({
    id: `asrm-${i + 1}`,
    url: `${baseUrl}/asrm/asrm-${i + 1}.jpg`,
    thumbnail: `${baseUrl}/asrm/asrm-${i + 1}.jpg`,
    category: ['all', 'asrm'] as PhotoCategory[],
    alt: tt(`ASRM Conference, photo ${i + 1}`, `ASRM 会议照片 ${i + 1}`),
  })),
  // SEEDS：2026-10-21 客户提供的活动图
  ...Array.from({ length: 12 }, (_, i) => ({
    id: `seeds-ig-2026-${i + 1}`,
    url: `${baseUrl}/seeds/seeds-ig-2026-${i + 1}.jpg`,
    thumbnail: `${baseUrl}/seeds/seeds-ig-2026-${i + 1}.jpg`,
    category: ['all', 'seeds'] as PhotoCategory[],
    alt: tt(`SEEDS Event, photo ${i + 1}`, `SEEDS 活动照片 ${i + 1}`),
  })),
  // MHB New York
  ...Array.from({ length: 15 }, (_, i) => ({
    id: `mhb-ig-2026-${i + 1}`,
    url: `${baseUrl}/mhb/mhb-ig-2026-${i + 1}.jpg`,
    thumbnail: `${baseUrl}/mhb/mhb-ig-2026-${i + 1}.jpg`,
    category: ['all', 'mhb'] as PhotoCategory[],
    alt: tt(`MHB Event, photo ${i + 1}`, `MHB 活动照片 ${i + 1}`),
  })),
  // Families Out Loud Chicago：放在 MHB 后面
  ...Array.from({ length: 10 }, (_, i) => ({
    id: `fol-ig-2026-${i + 1}`,
    url: `${baseUrl}/families-out-loud/fol-ig-2026-${i + 1}.jpg`,
    thumbnail: `${baseUrl}/families-out-loud/fol-ig-2026-${i + 1}.jpg`,
    category: ['all', 'families-out-loud'] as PhotoCategory[],
    alt: tt(`Families Out Loud, photo ${i + 1}`, `Families Out Loud 活动照片 ${i + 1}`),
  })),
  {
    id: 'ourteam-surrogate-12',
    url: '/images/pages/home/surrogate-gallery-12.webp',
    thumbnail: '/images/pages/home/surrogate-gallery-12.webp',
    category: ['all', 'our-team'],
    alt: tt('Yunda Surrogacy team and surrogate gallery photo', 'Yunda Surrogacy 团队与代孕妈妈图库照片'),
  },
])

// All uses the client-supplied collection. Event tabs retain their existing albums.
const allPhotos = computed<Photo[]>(() => aboutGalleryPhotos.map<Photo>((photo) => {
  const path = `${baseUrl}/all-20261117/${photo.id}`
  return {
    id: `all-${photo.id}`,
    url: `${path}.webp`,
    thumbnail: `${path}-640.webp`,
    srcSet: `${path}-360.webp 360w, ${path}-640.webp 640w`,
    category: photo.category ? ['all', photo.category] : ['all'],
    alt: tt(photo.altEn, photo.altZh),
    width: photo.width,
    height: photo.height,
    fit: 'contain',
  }
}))
const activeCategory = ref<PhotoCategory>('all')

const filteredPhotos = computed(() => {
  if (activeCategory.value === 'all')
    return allPhotos.value
  return photos.value.filter(photo => photo.category.includes(activeCategory.value))
})

const categories = computed<Array<{ key: PhotoCategory, label: string }>>(() => [
  { key: 'all', label: tt('All', '全部') },
  { key: 'our-team', label: tt('Our team', '我们的团队') },
  { key: 'asrm', label: 'ASRM' },
  { key: 'seeds', label: 'SEEDS' },
  { key: 'mhb', label: 'MHB' },
  { key: 'families-out-loud', label: 'Families Out Loud' },
])

function categoryLabel(photo: Photo) {
  return categories.value.find(category => category.key !== 'all' && photo.category.includes(category.key))?.label
    || tt('Team & community', '团队与社群')
}

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

  if (window.innerWidth >= 1024) {
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
const dialogRef = ref<HTMLElement | null>(null)
const closeButtonRef = ref<HTMLButtonElement | null>(null)
let previousFocus: HTMLElement | null = null
let previousOverflow = ''

async function openCarousel(startIndex: number) {
  previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
  previousOverflow = document.body.style.overflow
  carouselPhotos.value = filteredPhotos.value
  currentIndex.value = startIndex
  showCarousel.value = true
  document.body.style.overflow = 'hidden'
  await nextTick()
  closeButtonRef.value?.focus()
}

function closeCarousel() {
  showCarousel.value = false
  document.body.style.overflow = previousOverflow
  previousFocus?.focus()
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
  if (e.key === 'Tab') {
    const controls = dialogRef.value?.querySelectorAll<HTMLButtonElement>('button')
    if (!controls?.length)
      return
    const first = controls[0]
    const last = controls[controls.length - 1]
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault()
      last?.focus()
    }
    else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault()
      first?.focus()
    }
    return
  }
  if (['Escape', 'ArrowRight', 'ArrowLeft'].includes(e.key))
    e.preventDefault()
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
  if (showCarousel.value)
    document.body.style.overflow = previousOverflow
})

// 监听分类变化，重置滑块位置
watch(activeCategory, () => {
  visibleStartIndex.value = 0
})
</script>

<template>
  <section id="about-gallery" class="relative scroll-mt-28 overflow-hidden bg-[var(--yunda-petal)] px-4 py-20 md:px-20 md:py-25">
    <!-- 装饰性背景元素 -->
    <div class="pointer-events-none absolute inset-0 opacity-5">
      <div class="absolute h-96 w-96 rounded-full bg-[color-mix(in_srgb,var(--yunda-sky)_40%,transparent)] blur-3xl -left-20 -top-20" />
      <div class="absolute h-96 w-96 rounded-full bg-[color-mix(in_srgb,var(--yunda-maple)_25%,transparent)] blur-3xl -bottom-20 -right-20" />
    </div>

    <div class="relative mx-auto max-w-320">
      <!-- 标题区域 -->
      <div class="scroll-animate mb-10 text-center md:mb-16">
        <h2 class="mb-6 text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] font-display md:text-[42px]">
          {{ tt('Industry events & team highlights', '行业活动与团队风采') }}
        </h2>
        <p class="mx-auto max-w-235 text-base text-[var(--yunda-bark)]/90 leading-[1.75] font-sans md:text-[17px]" style="font-family: var(--font-text)">
          {{ tt('Meet the people behind Yunda Surrogacy through moments from our team, industry events, and community gatherings.', '通过团队日常、行业活动与社群聚会中的真实瞬间，认识 Yunda Surrogacy 背后的伙伴。') }}
        </p>
      </div>

      <!-- 分类标签 -->
      <div class="scroll-animate scroll-animate-delay-100 mb-12 flex flex-wrap justify-center gap-3 md:mb-16 md:gap-4">
        <button
          v-for="cat in categories"
          :key="cat.key"
          type="button"
          :aria-pressed="activeCategory === cat.key"
          class="relative rounded-full px-6 py-2.5 text-4 font-medium transition-all duration-300 md:px-8 md:py-3 md:text-5"
          :class="activeCategory === cat.key
            ? 'bg-[var(--yunda-bark)] text-[var(--yunda-petal)] shadow-lg shadow-[rgba(60,36,21,0.2)] scale-105'
            : 'bg-white/80 text-[var(--yunda-bark)] backdrop-blur-sm hover:border-[var(--yunda-maple)] hover:text-[var(--yunda-maple)] hover:shadow-md hover:scale-105'"
          @click="activeCategory = cat.key"
        >
          {{ cat.label }}
        </button>
      </div>

      <!-- 照片网格 - 滑块交互 -->
      <div class="scroll-animate scroll-animate-delay-200 relative">
        <!-- 左滑按钮 -->
        <button
          v-if="canScrollLeft"
          :aria-label="tt('Previous photos', '上一组照片')"
          class="absolute left-0 top-1/2 z-10 h-14 w-14 flex items-center justify-center rounded-full bg-[var(--yunda-bark)] text-[var(--yunda-petal)] shadow-xl transition-all duration-300 lg:left-4 md:h-16 md:w-16 -translate-y-1/2 hover:scale-110 hover:opacity-95 hover:shadow-2xl"
          @click="scrollLeft"
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="md:h-8 md:w-8">
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <!-- 照片网格 -->
        <div ref="photoGridRef" class="grid grid-cols-2 gap-4 lg:grid-cols-4 md:grid-cols-3 md:gap-6">
          <button
            v-for="(photo, index) in visiblePhotos"
            :key="photo.id"
            type="button"
            :aria-label="tt('Open photo: ', '查看照片：') + photo.alt"
            class="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-200 pb-[100%] shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            @click="openCarousel(visibleStartIndex + index)"
          >
            <img
              :src="photo.thumbnail || photo.url"
              :srcset="photo.srcSet"
              :sizes="photo.srcSet ? '(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw' : undefined"
              :alt="photo.alt"
              class="absolute inset-0 h-full w-full transition-transform duration-500"
              :class="photo.fit === 'contain' ? 'bg-[#f5f2ec] object-contain' : 'object-cover group-hover:scale-110'"
              :width="photo.width || 1200"
              :height="photo.height || 1200"
              loading="lazy"
              decoding="async"
            >
            <span class="absolute bottom-3 left-3 rounded-md bg-white/95 px-3 py-1 text-sm text-[var(--yunda-bark)] font-medium">
              {{ categoryLabel(photo) }}
            </span>
          </button>
        </div>

        <!-- 右滑按钮 -->
        <button
          v-if="canScrollRight"
          :aria-label="tt('Next photos', '下一组照片')"
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
        <p class="text-3.5 text-[var(--yunda-bark)]/70 font-sans md:text-4" style="font-family: var(--font-text)">
          {{ tt('Viewing', '正在查看') }} {{ visibleStartIndex + 1 }}-{{ Math.min(visibleStartIndex + photosPerView, filteredPhotos.length) }} / {{ filteredPhotos.length }} {{ tt('photos', '张照片') }}
        </p>
      </div>
    </div>

    <!-- 轮播模态框 -->
    <Teleport to="body">
      <Transition name="fade">
        <div
          v-if="showCarousel"
          ref="dialogRef"
          role="dialog"
          aria-modal="true"
          :aria-label="tt('Event and team photographs', '活动与团队照片')"
          class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          @click.self="closeCarousel"
        >
          <!-- 关闭按钮 -->
          <button
            ref="closeButtonRef"
            type="button"
            :aria-label="tt('Close photo', '关闭照片')"
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
            type="button"
            :aria-label="tt('Previous photo', '上一张照片')"
            class="absolute bottom-20 left-4 z-20 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-all duration-300 sm:bottom-auto sm:top-1/2 md:left-8 hover:scale-110 hover:bg-white/20 sm:-translate-y-1/2"
            @click="prevPhoto"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>

          <!-- 照片容器 -->
          <div class="relative max-h-[90vh] max-w-full px-4 sm:max-w-[90vw] sm:px-16 md:px-20">
            <img
              :src="carouselPhotos[currentIndex]?.url"
              :alt="carouselPhotos[currentIndex]?.alt"
              class="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl"
              :width="carouselPhotos[currentIndex]?.width || 1200"
              :height="carouselPhotos[currentIndex]?.height || 1200"
              decoding="async"
            >
          </div>

          <!-- 下一张按钮 -->
          <button
            v-if="carouselPhotos.length > 1"
            type="button"
            :aria-label="tt('Next photo', '下一张照片')"
            class="absolute bottom-20 right-4 z-20 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition-all duration-300 sm:bottom-auto sm:top-1/2 md:right-8 hover:scale-110 hover:bg-white/20 sm:-translate-y-1/2"
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
button:focus-visible {
  outline: 2px solid var(--yunda-maple);
  outline-offset: 4px;
}

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

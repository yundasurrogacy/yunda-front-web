<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

export interface SurrogateGallerySlide { src: string, alt: string }

const props = withDefaults(
  defineProps<{
    title?: string
    subtitle?: string
    slides?: SurrogateGallerySlide[]
    variant?: 'default' | 'plain'
    /** 版块顶部横幅图（可选） */
    bannerSrc?: string
  }>(),
  { title: undefined, subtitle: undefined, slides: undefined, variant: 'default', bannerSrc: undefined },
)

const { t } = useI18n()
const heading = computed(() => props.title ?? t('home.surrogateGallerySection.title'))
const subheading = computed(() => props.subtitle ?? t('home.surrogateGallerySection.subtitle'))

useScrollAnimation()

const defaultSlides: SurrogateGallerySlide[] = [
  { src: '/images/home/surrogate-1.jpeg', alt: 'Surrogate mother with newborn in hospital' },
  { src: '/images/home/surrogate-3.png', alt: 'Surrogate mother in delivery room' },
  { src: '/images/home/surrogate-4.png', alt: 'Expectant surrogate mother mirror selfie' },
  { src: '/images/home/surrogate-5.png', alt: 'Surrogate mother taking a mirror selfie' },
  { src: '/images/home/surrogate-6.png', alt: 'Surrogate mother outdoors' },
  { src: '/images/home/surrogate-7.png', alt: 'Surrogate mother taking a mirror selfie' },
  { src: '/images/home/surrogate-8.png', alt: 'Surrogate mother outdoors' },
  { src: '/images/home/surrogate-9.png', alt: 'Surrogate mother taking a mirror selfie' },
  { src: '/images/home/surrogate-10.jpeg', alt: 'Surrogate mother holding baby' },
  { src: '/images/home/surrogate-11.png', alt: 'Surrogate mother portrait' },
  { src: '/images/home/surrogate-12.png', alt: 'Surrogate mother smiling' },
  { src: '/images/home/surrogate-13.png', alt: 'Surrogate mother with family' },
]

const slides = computed(() =>
  props.slides?.length ? props.slides : defaultSlides,
)

const slideGap = 18
const slidesPerView = ref(4)
const trackRef = ref<HTMLElement | null>(null)
const slideWidthWithGap = ref(0)
const currentIndex = ref(0)
const enableTransition = ref(true)
let stopResize: (() => void) | undefined

const maxStartIndex = computed(() => Math.max(0, slides.value.length - slidesPerView.value))
const canGoPrev = computed(() => currentIndex.value > 0)
const canGoNext = computed(() => currentIndex.value < maxStartIndex.value)

const trackStyle = computed(() => ({
  transform: `translateX(-${currentIndex.value * slideWidthWithGap.value}px)`,
  transition: enableTransition.value ? 'transform 0.8s ease-in-out' : 'none',
  gap: `${slideGap}px`,
}))

const slideStyle = computed(() => ({
  flexBasis: slidesPerView.value === 4
    ? `calc((100% - ${slideGap * 3}px) / 4)`
    : `calc((100% - ${slideGap}px) / 2)`,
}))

function updateSlideMetrics() {
  slidesPerView.value = window.innerWidth < 1024 ? 2 : 4
  nextTick(() => {
    if (!trackRef.value)
      return
    const firstSlide = trackRef.value.querySelector<HTMLElement>('.surrogate-slide')
    if (!firstSlide)
      return
    const { width } = firstSlide.getBoundingClientRect()
    slideWidthWithGap.value = width + slideGap
  })
}

function goToNext() {
  if (slideWidthWithGap.value === 0 || !canGoNext.value)
    return
  currentIndex.value = Math.min(maxStartIndex.value, currentIndex.value + slidesPerView.value)
}

function goToPrev() {
  if (slideWidthWithGap.value === 0 || !canGoPrev.value)
    return
  currentIndex.value = Math.max(0, currentIndex.value - slidesPerView.value)
}

watch(slideWidthWithGap, (val) => {
  if (!val)
    return
  enableTransition.value = false
  currentIndex.value = 0
  nextTick(() => {
    enableTransition.value = true
  })
})

watch(slides, () => {
  enableTransition.value = false
  currentIndex.value = 0
  nextTick(() => {
    updateSlideMetrics()
    enableTransition.value = true
  })
})

onMounted(() => {
  nextTick(() => {
    updateSlideMetrics()
    const resizeObserver = useResizeObserver(trackRef as import('vue').Ref<HTMLElement | null>, () => {
      nextTick(() => updateSlideMetrics())
    })
    stopResize = resizeObserver.stop
  })
})

onBeforeUnmount(() => {
  if (stopResize)
    stopResize()
})
</script>

<template>
  <section
    class="px-4 py-12 md:px-20 md:py-16"
    :class="
      props.variant === 'plain'
        ? 'bg-[var(--head-bg)]'
        : 'bg-[var(--head-bg)]'
    "
  >
    <div class="mx-auto max-w-[1400px]">
      <div v-if="props.bannerSrc" class="scroll-animate mb-12 overflow-hidden rounded-[26px] md:mb-16">
        <img
          :src="props.bannerSrc"
          alt=""
          class="h-auto max-h-[min(70vh,520px)] w-full object-cover object-[center_20%]"
          loading="lazy"
        >
      </div>
      <div class="scroll-animate text-center">
        <h2 class="text-7 text-black font-semibold md:text-9" style="font-family: var(--font-primary)">
          {{ heading }}
        </h2>
        <p class="mt-4 text-4 text-[var(--dark-brown)] md:text-4.5" style="font-family: var(--font-secondary)">
          {{ subheading }}
        </p>
      </div>

      <div class="scroll-animate scroll-animate-delay-100 relative mt-12 overflow-hidden rounded-[26px] bg-white/80 px-3 py-4 shadow-[0_18px_40px_rgba(64,84,120,0.12)]">
        <button
          type="button"
          aria-label="Previous slide"
          class="absolute left-3 top-1/2 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-white/90 text-[var(--primary-brown)] shadow-[0_10px_22px_rgba(39,31,24,0.16)] transition-all hover:bg-white hover:-translate-y-0.5"
          :class="!canGoPrev ? 'cursor-not-allowed opacity-35 hover:translate-y-0' : ''"
          :disabled="!canGoPrev"
          @click="goToPrev"
        >
          <span class="text-xl">‹</span>
        </button>
        <button
          type="button"
          aria-label="Next slide"
          class="absolute right-3 top-1/2 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-white/90 text-[var(--primary-brown)] shadow-[0_10px_22px_rgba(39,31,24,0.16)] transition-all hover:bg-white hover:-translate-y-0.5"
          :class="!canGoNext ? 'cursor-not-allowed opacity-35 hover:translate-y-0' : ''"
          :disabled="!canGoNext"
          @click="goToNext"
        >
          <span class="text-xl">›</span>
        </button>
        <div
          ref="trackRef"
          class="flex items-stretch"
          :style="trackStyle"
        >
          <article
            v-for="(slide, index) in slides"
            :key="`${slide.src}-${index}`"
            class="surrogate-slide flex-shrink-0"
            :style="slideStyle"
          >
            <div class="h-full overflow-hidden rounded-4 bg-white shadow-[0_12px_32px_rgba(64,84,120,0.12)]">
              <img
                :src="slide.src"
                :alt="slide.alt"
                class="h-full w-full object-cover"
                loading="lazy"
              >
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.surrogate-slide {
  min-width: 0;
}
</style>

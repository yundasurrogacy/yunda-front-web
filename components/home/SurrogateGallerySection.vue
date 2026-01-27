<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

const slides = [
  { src: '/images/home/surrogate-1.jpeg', alt: 'Surrogate mother with newborn in hospital' },
  { src: '/images/home/surrogate-2.jpeg', alt: 'Surrogate mother holding baby' },
  { src: '/images/home/surrogate-3.png', alt: 'Surrogate mother in delivery room' },
  { src: '/images/home/surrogate-4.png', alt: 'Expectant surrogate mother mirror selfie' },
  { src: '/images/home/surrogate-5.png', alt: 'Surrogate mother taking a mirror selfie' },
  { src: '/images/home/surrogate-6.png', alt: 'Surrogate mother outdoors' },
]

const duplicatedSlides = computed(() => [...slides, ...slides])

const slideGap = 18
const slidesPerView = ref(4)
const trackRef = ref<HTMLElement | null>(null)
const slideWidthWithGap = ref(0)
const currentIndex = ref(0)
const enableTransition = ref(true)
const timer = ref<number | null>(null)
let stopResize: (() => void) | undefined

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

function resetToStart() {
  enableTransition.value = false
  currentIndex.value = 0
  requestAnimationFrame(() => {
    enableTransition.value = true
  })
}

function handleTransitionEnd() {
  if (currentIndex.value >= slides.length) {
    resetToStart()
  }
}

function goToNext() {
  if (slideWidthWithGap.value === 0)
    return
  currentIndex.value += slidesPerView.value
}

function startAutoPlay() {
  stopAutoPlay()
  timer.value = window.setInterval(() => {
    goToNext()
  }, 3200)
}

function stopAutoPlay() {
  if (timer.value) {
    clearInterval(timer.value)
    timer.value = null
  }
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

onMounted(() => {
  nextTick(() => {
    updateSlideMetrics()
    const resizeObserver = useResizeObserver(trackRef, () => {
      nextTick(() => updateSlideMetrics())
    })
    stopResize = resizeObserver.stop
    startAutoPlay()
  })
})

onBeforeUnmount(() => {
  stopAutoPlay()
  if (stopResize)
    stopResize()
})
</script>

<template>
  <section class="border-b border-t border-[var(--primary-brown)]/18 from-[var(--foot-bg)] via-white to-[var(--foot-bg)] bg-gradient-to-b px-4 py-16 md:px-20 md:py-24">
    <div class="mx-auto max-w-[1400px]">
      <div class="scroll-animate text-center">
        <h2 class="text-7 text-black font-semibold md:text-9" style="font-family: var(--font-primary)">
          {{ $t('home.surrogateGallerySection.title') }}
        </h2>
        <p class="mt-4 text-4 text-[var(--dark-brown)] md:text-4.5" style="font-family: var(--font-secondary)">
          {{ $t('home.surrogateGallerySection.subtitle') }}
        </p>
      </div>

      <div class="scroll-animate scroll-animate-delay-100 mt-12 overflow-hidden rounded-[26px] bg-white/80 px-3 py-4 shadow-[0_18px_40px_rgba(64,84,120,0.12)]">
        <div
          ref="trackRef"
          class="flex items-stretch"
          :style="trackStyle"
          @transitionend="handleTransitionEnd"
          @mouseenter="stopAutoPlay"
          @mouseleave="startAutoPlay"
        >
          <article
            v-for="(slide, index) in duplicatedSlides"
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

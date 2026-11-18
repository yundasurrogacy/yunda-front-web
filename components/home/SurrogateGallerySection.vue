<script setup lang="ts">
import { usePreferredReducedMotion, useResizeObserver } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { surrogateGalleryMoments } from '~/data/surrogate-gallery-moments'

export interface SurrogateGallerySlide { src: string, alt: string, title?: string, description?: string }

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

const { t, locale } = useI18n()
const localePath = useLocalePath()
const reducedMotion = usePreferredReducedMotion()
const isZh = computed(() => locale.value.startsWith('zh'))
const tt = (en: string, zh: string) => isZh.value ? zh : en
const heading = computed(() => props.title ?? t('home.surrogateGallerySection.title'))
const subheading = computed(() => props.subtitle ?? tt('Moments of care, connection, and support with the Yunda Surrogacy team.', '与 Yunda Surrogacy 团队一起经历的陪伴、交流与支持。'))

useScrollAnimation()

const defaultSlides = computed<SurrogateGallerySlide[]>(() => surrogateGalleryMoments.map(moment => ({
  src: moment.src,
  ...(isZh.value ? moment.zh : moment.en),
})))

const slides = computed(() =>
  props.slides?.length ? props.slides : defaultSlides.value,
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
  transition: enableTransition.value && reducedMotion.value !== 'reduce' ? 'transform 0.35s ease-in-out' : 'none',
  gap: `${slideGap}px`,
}))

const slideStyle = computed(() => ({
  flexBasis: `calc((100% - ${slideGap * (slidesPerView.value - 1)}px) / ${slidesPerView.value})`,
}))

function updateSlideMetrics() {
  slidesPerView.value = window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 4
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
        ? 'bg-[var(--yunda-petal)]'
        : 'bg-[color-mix(in_srgb,var(--yunda-harvest)_18%,var(--yunda-petal))]'
    "
  >
    <div class="mx-auto max-w-[1400px]">
      <div v-if="props.bannerSrc" class="scroll-animate mb-12 overflow-hidden rounded-[26px] md:mb-16">
        <img
          :src="props.bannerSrc"
          :alt="heading"
          class="h-auto max-h-[min(70vh,520px)] w-full object-cover object-[center_20%]"
          loading="lazy"
        >
      </div>
      <div class="scroll-animate text-center">
        <h2 class="font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:text-[42px]">
          {{ heading }}
        </h2>
        <p class="mt-4 font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:text-[17px]" style="font-family: var(--font-text)">
          {{ subheading }}
        </p>
      </div>

      <div class="scroll-animate scroll-animate-delay-100 mt-8 flex items-center justify-between gap-4">
        <p class="text-sm text-[var(--yunda-bark)]/75" role="status" aria-live="polite" aria-atomic="true">
          {{ tt(`${currentIndex + 1}–${Math.min(currentIndex + slidesPerView, slides.length)} of ${slides.length} moments`, `${currentIndex + 1}–${Math.min(currentIndex + slidesPerView, slides.length)} / ${slides.length} 个旅程片段`) }}
        </p>
        <div class="flex gap-2">
          <button
            type="button"
            :aria-label="tt('Previous journey moments', '上一组旅程片段')"
            class="gallery-control"
            :class="!canGoPrev ? 'cursor-not-allowed opacity-35 hover:translate-y-0' : ''"
            :disabled="!canGoPrev"
            @click="goToPrev"
          >
            <span class="text-xl">‹</span>
          </button>
          <button
            type="button"
            :aria-label="tt('Next journey moments', '下一组旅程片段')"
            class="gallery-control"
            :class="!canGoNext ? 'cursor-not-allowed opacity-35 hover:translate-y-0' : ''"
            :disabled="!canGoNext"
            @click="goToNext"
          >
            <span class="text-xl">›</span>
          </button>
        </div>
      </div>
      <div class="mt-5 overflow-hidden" role="region" :aria-label="heading" aria-roledescription="carousel">
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
            <div class="h-full overflow-hidden rounded-4 bg-[var(--yunda-petal)] shadow-[0_8px_24px_rgba(60,36,21,0.06)]">
              <img
                :src="slide.src"
                :alt="slide.alt"
                class="aspect-[4/5] w-full object-cover object-top"
                width="640"
                height="800"
                loading="lazy"
                decoding="async"
              >
              <div v-if="slide.title || slide.description" class="px-5 pb-6 pt-5">
                <h3 v-if="slide.title" class="font-display text-[24px] text-[var(--yunda-bark)] font-semibold leading-tight">
                  {{ slide.title }}
                </h3>
                <p v-if="slide.description" class="mt-2 text-[15px] text-[var(--yunda-bark)]/80 leading-relaxed">
                  {{ slide.description }}
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--yunda-bark)]/15 pt-6">
        <p class="max-w-2xl text-sm text-[var(--yunda-bark)]/75 leading-relaxed">
          {{ tt('See more moments and community updates in our Resources & Media Center.', '在资源与媒体中心查看旅程片段和社群动态。') }}
        </p>
        <NuxtLink :to="`${localePath('/resources')}#surrogates-updates`" class="gallery-updates-link">
          {{ tt('Explore journey updates', '查看旅程动态') }} <span aria-hidden="true">↗</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.surrogate-slide {
  min-width: 0;
}
.gallery-control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid color-mix(in srgb, var(--yunda-bark) 25%, transparent);
  border-radius: 50%;
  color: var(--yunda-bark);
  background: var(--yunda-petal);
}
.gallery-control:hover:not(:disabled) {
  background: color-mix(in srgb, var(--yunda-harvest) 30%, var(--yunda-petal));
}
.gallery-control:focus-visible,
.gallery-updates-link:focus-visible {
  outline: 2px solid var(--yunda-bark);
  outline-offset: 4px;
}
.gallery-updates-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  min-height: 2.75rem;
  color: var(--yunda-bark);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.3em;
}
</style>

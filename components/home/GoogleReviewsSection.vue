<script setup>
import { useResizeObserver } from '@vueuse/core'
import { computed, onMounted, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { googleReviewExcerpts } from '~/data/google-reviews'

useScrollAnimation()

const { locale } = useI18n()
const sectionId = useId()
const reviewTrack = ref(null)
const canGoPrev = ref(false)
const canGoNext = ref(true)
const firstVisible = ref(1)
const lastVisible = ref(1)

const reviews = computed(() => {
  const language = locale.value.startsWith('zh') ? 'zh' : 'en'
  return googleReviewExcerpts.map(item => ({
    author: item.author,
    href: item.href,
    content: item[language],
  }))
})

const tt = computed(() => locale.value.startsWith('zh')
  ? {
      subtitle: '精选自 Yunda Surrogacy 的 Google 评价，中文为原评摘录的翻译。',
      previous: '查看上一条评价',
      next: '查看下一条评价',
      browse: '客户评价，可使用左右方向键浏览',
      range: `精选评价 ${firstVisible.value}–${lastVisible.value} / ${reviews.value.length}`,
      badge: 'Google Review',
      readOriginal: '在 Google 查看完整评价',
    }
  : {
      subtitle: 'Selected excerpts from Yunda Surrogacy reviews on Google.',
      previous: 'Previous review',
      next: 'Next review',
      browse: 'Client reviews. Use the left and right arrow keys to browse.',
      range: `Selected reviews ${firstVisible.value}–${lastVisible.value} of ${reviews.value.length}`,
      badge: 'Google Review',
      readOriginal: 'Read full review on Google',
    })

function updatePosition() {
  const track = reviewTrack.value
  const card = track?.firstElementChild
  if (!card)
    return
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
  const stride = card.getBoundingClientRect().width + gap
  const start = Math.round(track.scrollLeft / stride)
  const visibleCount = Math.max(1, Math.round((track.clientWidth + gap) / stride))
  firstVisible.value = Math.min(reviews.value.length, start + 1)
  lastVisible.value = Math.min(reviews.value.length, start + visibleCount)
  canGoPrev.value = track.scrollLeft > 2
  canGoNext.value = track.scrollLeft + track.clientWidth < track.scrollWidth - 2
}

function moveReview(direction) {
  const track = reviewTrack.value
  const card = track?.firstElementChild
  if (!card)
    return
  const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0
  track.scrollBy({
    left: direction * (card.getBoundingClientRect().width + gap),
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
  })
}

function moveToEdge(end) {
  const track = reviewTrack.value
  if (track)
    track.scrollTo({ left: end ? track.scrollWidth : 0, behavior: 'instant' })
}

onMounted(updatePosition)
useResizeObserver(reviewTrack, updatePosition)
</script>

<template>
  <section :aria-labelledby="`${sectionId}-heading`" class="bg-[color-mix(in_srgb,var(--yunda-sky)_22%,var(--yunda-petal))] px-4 py-12 md:px-20 md:py-16">
    <div class="mx-auto max-w-300">
      <h2
        :id="`${sectionId}-heading`"
        class="scroll-animate text-center text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] font-display md:text-[42px]"
      >
        {{ $t('home.googleReviewsSection.title') }}
      </h2>
      <p class="mx-auto mt-4 max-w-2xl text-center text-base text-[var(--yunda-bark)] leading-relaxed font-sans">
        {{ tt.subtitle }}
      </p>
      <div class="mt-8 flex items-center justify-end gap-3">
        <span class="mr-auto text-sm text-[var(--yunda-bark)]" role="status" aria-live="polite" aria-atomic="true">{{ tt.range }}</span>
        <button
          type="button"
          class="review-control"
          :aria-label="tt.previous"
          :aria-controls="`${sectionId}-track`"
          :disabled="!canGoPrev"
          @click="moveReview(-1)"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m14 6-6 6 6 6" />
          </svg>
        </button>
        <button
          type="button"
          class="review-control"
          :aria-label="tt.next"
          :aria-controls="`${sectionId}-track`"
          :disabled="!canGoNext"
          @click="moveReview(1)"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="m10 6 6 6-6 6" />
          </svg>
        </button>
      </div>
      <div
        :id="`${sectionId}-track`"
        ref="reviewTrack"
        class="review-track mt-4"
        role="region"
        :aria-label="tt.browse"
        tabindex="0"
        @scroll.passive="updatePosition"
        @keydown.left.self.prevent="moveReview(-1)"
        @keydown.right.self.prevent="moveReview(1)"
        @keydown.home.self.prevent="moveToEdge(false)"
        @keydown.end.self.prevent="moveToEdge(true)"
      >
        <article
          v-for="item in reviews"
          :key="item.href"
          class="review-card flex flex-col border border-[var(--yunda-bark)]/20 rounded-2xl bg-[var(--yunda-petal)] p-6 md:p-8"
        >
          <div class="mb-6">
            <div class="inline-flex items-center gap-2 text-sm text-[var(--yunda-bark)] font-semibold">
              <svg class="google-mark" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M21.35 12.27c0-.79-.07-1.54-.23-2.27H12v4.3h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.14c1.84-1.69 2.91-4.18 2.91-7.42Z" />
                <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.45c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.53A9.75 9.75 0 0 0 12 21.5Z" />
                <path fill="#FBBC05" d="M6.53 13.59A5.86 5.86 0 0 1 6.22 12c0-.55.11-1.09.31-1.59V7.88H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.06 1.04 4.12l3.24-2.53Z" />
                <path fill="#EA4335" d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.83 3.47 14.63 2.5 12 2.5a9.75 9.75 0 0 0-8.71 5.38l3.24 2.53c.77-2.31 2.93-4.03 5.47-4.03Z" />
              </svg>
              <span>{{ tt.badge }}</span>
            </div>
          </div>
          <blockquote class="flex-1 whitespace-pre-line text-base text-[var(--yunda-bark)] leading-[1.75] font-sans md:text-[17px]" style="font-family: var(--font-text)">
            “{{ item.content }}”
          </blockquote>
          <p class="mt-6 text-sm text-[var(--yunda-maple)] font-semibold md:text-base">
            {{ item.author }}
          </p>
          <a
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            class="review-source mt-4 inline-flex items-center self-start gap-2 text-sm text-[var(--yunda-bark)] font-semibold underline underline-offset-4 transition-colors hover:text-[var(--yunda-maple)]"
          >
            {{ tt.readOriginal }}
            <span aria-hidden="true">↗</span>
          </a>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.review-track {
  display: flex;
  gap: 24px;
  overflow-x: auto;
  overscroll-behavior-x: contain;
  scroll-snap-type: x mandatory;
  padding: 4px 4px 16px;
  color: var(--yunda-bark);
}

.review-card {
  flex: 0 0 100%;
  min-width: 0;
  scroll-snap-align: start;
  overflow-wrap: anywhere;
}

.google-mark {
  width: 1.35rem;
  height: 1.35rem;
  flex: none;
}

.review-control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border: 1px solid currentColor;
  border-radius: 50%;
  color: var(--yunda-bark);
  background: var(--yunda-petal);
  transition: background-color 160ms;
}

.review-control:hover:not(:disabled) {
  background: color-mix(in srgb, var(--yunda-harvest) 24%, var(--yunda-petal));
}

.review-control:disabled {
  opacity: 0.4;
  cursor: default;
}

.review-control:focus-visible,
.review-source:focus-visible,
.review-track:focus-visible {
  outline: 2px solid var(--yunda-maple);
  outline-offset: 3px;
}

.review-track:focus-visible {
  outline-offset: -2px;
}

@media (min-width: 768px) {
  .review-card {
    flex-basis: calc((100% - 24px) / 2);
  }
}

@media (prefers-reduced-motion: reduce) {
  .review-control {
    transition: none;
  }
}
</style>

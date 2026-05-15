<script setup>
import { computed } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

const reviews = computed(() => [
  {
    type: 'history',
    textKey: 'home.googleReviewsSection.historyReview1',
    authorKey: 'home.googleReviewsSection.historyReview1Author',
    href: '',
  },
  {
    type: 'google',
    textKey: 'home.googleReviewsSection.review1',
    authorKey: 'home.googleReviewsSection.review1Author',
    href: 'https://maps.app.goo.gl/UUzr5ohpkzXMDNDZ6',
  },
  {
    type: 'history',
    textKey: 'home.googleReviewsSection.historyReview2',
    authorKey: 'home.googleReviewsSection.historyReview2Author',
    href: '',
  },
  {
    type: 'google',
    textKey: 'home.googleReviewsSection.review2',
    authorKey: 'home.googleReviewsSection.review2Author',
    href: 'https://maps.app.goo.gl/boLbmqr1qaFA4aBB6',
  },
])
</script>

<template>
  <section class="bg-[color-mix(in_srgb,var(--yunda-sky)_22%,var(--yunda-petal))] px-4 py-12 md:px-20 md:py-16">
    <div class="mx-auto max-w-300">
      <h2
        class="scroll-animate mb-12 text-center font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:mb-16 md:text-[42px]"
      >
        {{ $t('home.googleReviewsSection.title') }}
      </h2>
      <div class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
        <article
          v-for="(item, idx) in reviews"
          :key="idx"
          class="scroll-animate flex flex-col border-2 border-[var(--yunda-bark)]/15 rounded-2xl bg-[var(--yunda-petal)] p-8 shadow-[0_12px_32px_rgba(60,36,21,0.08)]"
          :class="idx % 2 ? 'scroll-animate-delay-100' : ''"
        >
          <p class="flex-1 font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:text-[17px]" style="font-family: var(--font-text)">
            “{{ $t(item.textKey) }}”
          </p>
          <p class="mt-6 text-sm text-[var(--yunda-maple)] font-semibold md:text-base">
            {{ $t(item.authorKey) }}
          </p>
          <a
            v-if="item.type === 'google'"
            :href="item.href"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-4 inline-flex items-center gap-2 text-4 text-[var(--yunda-bark)] font-semibold underline-offset-4 transition-colors hover:text-[var(--yunda-maple)] hover:underline"
          >
            {{ $t('home.googleReviewsSection.readOnGoogle') }}
            <span aria-hidden="true">↗</span>
          </a>
          <p
            v-else
            class="mt-4 text-4 text-[var(--yunda-bark)] font-semibold"
          >
            {{ $t('home.googleReviewsSection.historyLabel') }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

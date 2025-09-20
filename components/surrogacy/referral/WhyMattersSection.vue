<template>
  <section class="w-full bg-gradient-to-b from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] py-8 lg:py-12 px-4 lg:px-20">
    <div class="max-w-300 mx-auto scroll-animate">
      <h2 class="text-7.5 lg:text-10 font-semibold mb-6 lg:mb-8 text-center lg:text-left" style="font-family: var(--font-primary)">
        {{ $t('surrogacyReferral.whyMattersSection.title') }}
      </h2>
      <p class="leading-relaxed whitespace-pre-line">
        {{ $t('surrogacyReferral.whyMattersSection.description') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
</script>

<style scoped>
</style>
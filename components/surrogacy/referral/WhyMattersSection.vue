<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <section class="w-full from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] bg-gradient-to-b px-4 py-8 lg:px-20 lg:py-12">
    <div class="scroll-animate mx-auto max-w-300">
      <h2 class="mb-6 text-center text-7.5 font-semibold lg:mb-8 lg:text-left lg:text-10" style="font-family: var(--font-primary)">
        {{ $t('surrogacyReferral.whyMattersSection.title') }}
      </h2>
      <p class="whitespace-pre-line leading-relaxed">
        {{ $t('surrogacyReferral.whyMattersSection.description') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
</style>

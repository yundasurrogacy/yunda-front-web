<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b px-4 py-8 lg:px-20 lg:py-12">
    <div class="scroll-animate mx-auto max-w-300">
      <h2 class="mb-6 text-center font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:mb-8 lg:text-left lg:text-[36px]">
        {{ $t('surrogacyReferral.whyMattersSection.title') }}
      </h2>
      <p class="whitespace-pre-line text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[17px]" style="font-family: var(--font-text)">
        {{ $t('surrogacyReferral.whyMattersSection.description') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
</style>

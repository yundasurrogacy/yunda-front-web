<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <div class="career-section bg-[var(--yunda-bark)] px-6 py-20 text-[var(--yunda-petal)] lg:px-20">
    <div class="scroll-animate container mx-auto text-center">
      <h2 class="mx-auto mb-8 max-w-4xl font-display text-[32px] font-medium leading-[1.15] lg:text-[42px]">
        {{ $t('about.careers.title') }}
      </h2>
      <p class="mx-auto mb-12 max-w-4xl font-sans text-base leading-[1.75] lg:text-[19px]" style="font-family: var(--font-text)" v-html="$t('about.careers.description')" />
      <a href="https://www.indeed.com/cmp/Yunda-Surrogacy" class="yunda-type-button inline-flex transform items-center justify-center rounded-[10px] bg-[var(--yunda-petal)] px-5 py-3 text-[var(--yunda-bark)] tracking-[0.02em] transition-all duration-300 ease-in-out active:translate-y-0 hover:-translate-y-0.5 hover:opacity-95 lg:text-base" style="font-family: var(--font-text)">
        {{ $t('about.careers.button') }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.shadow-inner-white-soft {
  box-shadow: -2px -2px 1px rgba(255, 255, 255, 0.5) inset;
}
</style>

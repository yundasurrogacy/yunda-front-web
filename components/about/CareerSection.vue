<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <div class="career-section bg-[#A9A67D] px-6 py-20 lg:px-20">
    <div class="scroll-animate container mx-auto text-center">
      <h2 class="mx-auto mb-8 max-w-4xl text-3xl font-semibold lg:text-5xl" style="font-family: var(--font-primary)">
        {{ $t('about.careers.title') }}
      </h2>
      <p class="mx-auto mb-12 max-w-4xl text-base lg:text-xl" v-html="$t('about.careers.description')" />
      <a href="https://www.indeed.com/cmp/Yunda-Surrogacy" class="shadow-inner-white-soft inline-flex transform items-center justify-center rounded-[10px] bg-[var(--light-cream)] px-4 py-3 uppercase transition-all duration-300 ease-in-out active:translate-y-0 hover:bg-[var(--head-bg)] lg:text-4 hover:-translate-y-0.5">
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

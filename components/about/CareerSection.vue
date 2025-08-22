<template>
  <div class="career-section bg-[#A9A67D] py-20 px-6 lg:px-20">
    <div class="container mx-auto text-center">
      <h2 class="text-3xl lg:text-5xl font-semibold mb-8 max-w-4xl mx-auto" style="font-family: var(--font-primary)">
        {{ $t('about.careers.title') }}
      </h2>
      <p class="text-base lg:text-xl max-w-4xl mx-auto mb-12" v-html="$t('about.careers.description')">
      </p>
      <a href="https://www.indeed.com/cmp/Yunda-Surrogacy" class="inline-flex items-center justify-center bg-[var(--light-cream)] lg:text-4 uppercase py-3 px-4 rounded-[10px] shadow-inner-white-soft hover:bg-[var(--head-bg)] transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0">
        {{ $t('about.careers.button') }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.shadow-inner-white-soft {
  box-shadow: -2px -2px 1px rgba(255, 255, 255, 0.5) inset;
}
</style>
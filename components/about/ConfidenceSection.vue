<script setup lang="ts">
</script>

<template>
  <div class="confidence-section bg-[#A9A67D] px-4 py-16">
    <div class="container mx-auto text-center">
      <h2 class="mb-6 text-7.5 text-[#271F18] font-bold font-['Cormorant'] lg:text-10">
        {{ $t('parentsProcess.confidenceSection.title') }}<br class="lg:hidden">
      </h2>
      <p class="mx-auto mb-8 max-w-300 text-sm text-[#271F18] font-['SourceSerif4'] lg:text-xl">
        {{ $t('parentsProcess.confidenceSection.description1') }}
        {{ $t('parentsProcess.confidenceSection.description2') }}
      </p>
      <button class="shadow-inner-white-soft rounded-lg bg-[#FBF0DA] px-4 py-3 text-xs text-[#271F18] font-['SourceSerif4'] uppercase backdrop-blur-lg lg:text-base">
        {{ $t('home.processHeroSection.button') }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.shadow-inner-white-soft {
  box-shadow: -2px -2px 1px rgba(255, 255, 255, 0.5) inset;
}
</style>

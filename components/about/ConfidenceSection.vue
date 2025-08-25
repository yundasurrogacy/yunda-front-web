<template>
  <div class="confidence-section bg-[#A9A67D] py-16 px-4">
    <div class="container mx-auto text-center">
      <h2 class="text-7.5 lg:text-10 font-bold font-['Cormorant'] text-[#271F18] mb-6">{{ $t('parentsProcess.confidenceSection.title') }}<br class="lg:hidden"></h2>
      <p class="text-sm lg:text-xl text-[#271F18] font-['SourceSerif4'] max-w-300 mx-auto mb-8">
        {{ $t('parentsProcess.confidenceSection.description1') }}
        {{ $t('parentsProcess.confidenceSection.description2') }}
      </p>
      <button class="bg-[#FBF0DA] text-[#271F18] font-['SourceSerif4'] text-xs lg:text-base uppercase py-3 px-4 rounded-lg shadow-inner-white-soft backdrop-blur-lg">
        {{ $t('home.processHeroSection.button') }}
      </button>
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

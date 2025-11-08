<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <div class="w-full flex justify-center">
    <section
      class="relative h-auto w-full overflow-hidden bg-transparent px-4 py-20 md:h-[600px] md:px-20 md:py-25"
    >
      <!-- Background Image - 在所有屏幕尺寸下都显示 -->
      <div class="absolute left-0 top-0 h-full w-full">
        <picture class="block h-full w-full">
          <source srcset="/images/home/index-content.webp" type="image/webp">
          <img src="/images/home/index-content.png" alt="Support Background" class="h-full w-full object-cover">
        </picture>
      </div>

      <div class="relative z-10 mx-auto max-w-300 pt-10 text-center md:pt-10">
        <h2 class="scroll-animate mb-6 text-7.5 font-semibold md:mb-8 md:text-10" style="font-family: var(--font-primary)">
          {{ $t('home.globalSupportSection.title') }}
        </h2>
        <p class="scroll-animate scroll-animate-delay-100">
          {{ $t('home.globalSupportSection.description') }}
        </p>

        <!-- CTA Button -->
        <div class="scroll-animate scroll-animate-delay-200 mt-8 md:mt-12">
          <a href="/be-parents" class="rounded-2.5 bg-[var(--light-cream)] px-4 py-3 leading-relaxed shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] backdrop-blur-5 transition-opacity hover:opacity-90">
            {{ $t('home.globalSupportSection.button') }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>

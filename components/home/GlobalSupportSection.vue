<template>
  <div class="flex justify-center w-full">
    <section
      class="py-20 md:py-25 px-4 md:px-20 bg-transparent relative h-auto md:h-[600px] overflow-hidden w-full">
      <!-- Background Image - 在所有屏幕尺寸下都显示 -->
      <div class="absolute left-0 top-0 w-full h-full">
        <img src="~/public/images/home/index-content.png" alt="Support Background" class="w-full h-full object-cover">
      </div>

      <div class="relative z-10 text-center max-w-300 mx-auto pt-10 md:pt-10">
        <h2 class="text-7.5 md:text-10 font-semibold mb-6 md:mb-8 scroll-animate" style="font-family: var(--font-primary)">
          {{ $t('home.globalSupportSection.title') }}
        </h2>
        <p class="scroll-animate scroll-animate-delay-100">
          {{ $t('home.globalSupportSection.description') }}
        </p>

        <!-- CTA Button -->
        <div class="mt-8 md:mt-12 scroll-animate scroll-animate-delay-200">
          <a href="/be-parents" class="leading-relaxed px-4 py-3 bg-[var(--light-cream)] rounded-2.5 shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] backdrop-blur-5 hover:opacity-90 transition-opacity">
            {{ $t('home.globalSupportSection.button') }}
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
</script>

<style scoped></style>
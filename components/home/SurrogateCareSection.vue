<template>
  <section class="py-20 md:py-25 px-4 md:px-20 bg-[var(--olive-green)]">
    <div class="max-w-320 mx-auto z-10 text-center">
      <h2 class="text-7.5 md:text-10 font-semibold text-center mb-12 md:mb-16 scroll-animate" style="font-family: var(--font-primary)">
        {{ $t('home.surrogateCareSection.title') }}
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 text-6 md:text-8">
        <!-- Care Item 1 -->
        <div class="flex flex-col items-center text-center scroll-animate scroll-animate-delay-100">
          <img src="~/public/images/home/p-2.png" alt="Case Coordinator" class="w-59 h-59 rounded-full mb-5">
          <h3>
            {{ $t('home.surrogateCareSection.item1') }}
          </h3>
        </div>

        <!-- Care Item 2 -->
        <div class="flex flex-col items-center text-center scroll-animate scroll-animate-delay-200">
          <img src="~/public/images/home/p-3.png" alt="Nutrition & Counseling" class="w-59 h-59 rounded-full mb-5">
          <h3>
            {{ $t('home.surrogateCareSection.item2') }}
          </h3>
        </div>

        <!-- Care Item 3 -->
        <div class="flex flex-col items-center text-center scroll-animate scroll-animate-delay-300">
          <img src="~/public/images/home/p-4.png" alt="Daily Check-in" class="w-59 h-59 rounded-full mb-5">
          <h3>
            {{ $t('home.surrogateCareSection.item3') }}
          </h3>
        </div>
      </div>

      <div class="mt-12 md:mt-16 scroll-animate scroll-animate-delay-300">
        <a href="/surrogate-qualification" class="inline-flex items-center justify-center bg-[var(--light-cream)] uppercase py-3 px-4 rounded-[10px] shadow-inner-white-soft hover:bg-[var(--head-bg)] transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0">
          {{ $t('home.surrogateCareSection.button') }}
        </a>
      </div>
      
    </div>
  </section>
</template>

<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
</script>

<style scoped>
</style>
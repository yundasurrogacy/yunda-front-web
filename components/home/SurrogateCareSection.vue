<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <section class="bg-[var(--olive-green)] px-4 py-20 md:px-20 md:py-25">
    <div class="z-10 mx-auto max-w-320 text-center">
      <h2 class="scroll-animate mb-12 text-center text-7.5 font-semibold md:mb-16 md:text-10" style="font-family: var(--font-primary)">
        {{ $t('home.surrogateCareSection.title') }}
      </h2>

      <div class="grid grid-cols-1 gap-12 text-6 lg:grid-cols-3 lg:gap-16 md:text-8">
        <!-- Care Item 1 -->
        <div class="scroll-animate scroll-animate-delay-100 flex flex-col items-center text-center">
          <picture class="mb-5 h-59 w-59 overflow-hidden rounded-full">
            <source srcset="/images/home/p-2.webp" type="image/webp">
            <img src="/images/home/p-2.png" alt="Case Coordinator" class="h-full w-full object-cover">
          </picture>
          <h3>
            {{ $t('home.surrogateCareSection.item1') }}
          </h3>
        </div>

        <!-- Care Item 2 -->
        <div class="scroll-animate scroll-animate-delay-200 flex flex-col items-center text-center">
          <picture class="mb-5 h-59 w-59 overflow-hidden rounded-full">
            <source srcset="/images/home/p-3.webp" type="image/webp">
            <img src="/images/home/p-3.png" alt="Nutrition & Counseling" class="h-full w-full object-cover">
          </picture>
          <h3>
            {{ $t('home.surrogateCareSection.item2') }}
          </h3>
        </div>

        <!-- Care Item 3 -->
        <div class="scroll-animate scroll-animate-delay-300 flex flex-col items-center text-center">
          <picture class="mb-5 h-59 w-59 overflow-hidden rounded-full">
            <source srcset="/images/home/p-4.webp" type="image/webp">
            <img src="/images/home/p-4.png" alt="Daily Check-in" class="h-full w-full object-cover">
          </picture>
          <h3>
            {{ $t('home.surrogateCareSection.item3') }}
          </h3>
        </div>
      </div>

      <div class="scroll-animate scroll-animate-delay-300 mt-12 md:mt-16">
        <a href="/surrogate-qualification" class="shadow-inner-white-soft inline-flex transform items-center justify-center rounded-[10px] bg-[var(--light-cream)] px-4 py-3 uppercase transition-all duration-300 ease-in-out active:translate-y-0 hover:bg-[var(--head-bg)] hover:-translate-y-0.5">
          {{ $t('home.surrogateCareSection.button') }}
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>

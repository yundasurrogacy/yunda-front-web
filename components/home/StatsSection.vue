<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <section class="bg-[var(--head-bg)] px-4 py-20 md:px-20 md:py-25">
    <div class="mx-auto mb-16 max-w-280 text-center md:mb-20">
      <h2 class="scroll-animate text-7.5 font-semibold md:text-10" style="font-family: var(--font-primary)">
        {{ $t('home.statsSection.chooseUsTitle') }}
      </h2>
      <p
        class="scroll-animate scroll-animate-delay-100 mx-auto mt-6 max-w-260 text-4.5 leading-relaxed text-[var(--dark-brown)] md:text-5"
        style="font-family: var(--font-secondary)"
      >
        {{ $t('home.statsSection.chooseUsDescription') }}
      </p>
      <h3
        class="scroll-animate scroll-animate-delay-150 mt-12 text-6 font-semibold md:mt-16 md:text-8"
        style="font-family: var(--font-primary)"
      >
        {{ $t('home.statsSection.advantagesTitle') }}
      </h3>
    </div>
    <div class="grid grid-cols-1 mx-auto max-w-320 gap-20 lg:grid-cols-4 md:grid-cols-2 md:max-w-full md:gap-27.5">
      <!-- Stat 1 -->
      <div class="scroll-animate flex flex-col items-center text-center">
        <div
          class="relative mb-5 h-59 w-59 overflow-hidden rounded-full"
          style="background: radial-gradient(circle at center, #ffffff 0%, #F7F7F5 40%, #E5E8E3 80%, #DADDD9 100%);"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-16 font-semibold font-['Cormorant'] italic md:text-16">10+</span>
          </div>
        </div>
        <p class="text-center leading-relaxed">
          {{ $t('home.statsSection.stat1') }}
        </p>
      </div>

      <!-- Stat 2 -->
      <div class="scroll-animate scroll-animate-delay-100 flex flex-col items-center text-center">
        <div
          class="relative mb-5 h-59 w-59 overflow-hidden rounded-full"
          style="background: radial-gradient(circle at center, #ffffff 0%, #F7F7F5 40%, #E5E8E3 80%, #DADDD9 100%);"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-16 font-semibold font-['Cormorant'] italic md:text-16">400+</span>
          </div>
        </div>
        <p class="text-center leading-relaxed">
          {{ $t('home.statsSection.stat2') }}
        </p>
      </div>

      <!-- Stat 3 -->
      <div class="scroll-animate scroll-animate-delay-200 flex flex-col items-center text-center">
        <div
          class="relative mb-5 h-59 w-59 overflow-hidden rounded-full"
          style="background: radial-gradient(circle at center, #ffffff 0%, #F7F7F5 40%, #E5E8E3 80%, #DADDD9 100%);"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-16 font-semibold font-['Cormorant'] italic md:text-16">300+</span>
          </div>
        </div>
        <p class="text-center leading-relaxed">
          {{ $t('home.statsSection.stat3') }}
        </p>
      </div>

      <!-- Stat 4 -->
      <div class="scroll-animate scroll-animate-delay-300 flex flex-col items-center text-center">
        <div
          class="relative mb-5 h-59 w-59 overflow-hidden rounded-full"
          style="background: radial-gradient(circle at center, #ffffff 0%, #F7F7F5 40%, #E5E8E3 80%, #DADDD9 100%);"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-16 font-semibold font-['Cormorant'] italic md:text-16">95%+</span>
          </div>
        </div>
        <p class="text-center leading-relaxed">
          {{ $t('home.statsSection.stat4') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ball {
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.9) 0%,
    /* 中心亮 */ var(--grayish-green) 60%,
    /* 中段本色 */ rgba(100, 100, 100, 0.25) 100% /* 边缘暗 */
  );
  box-shadow:
    inset 0 2px 8px rgba(255, 255, 255, 0.6),
    /* 顶部高光 */ inset 0 -2px 12px rgba(0, 0, 0, 0.15); /* 底部阴影 */
}
</style>

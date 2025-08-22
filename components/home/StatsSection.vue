<template>
  <section class="py-20 md:py-25 px-4 md:px-20 bg-[var(--head-bg)]">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20 md:gap-27.5 max-w-320 md:max-w-full mx-auto">
      <!-- Stat 1 -->
      <div class="flex flex-col items-center text-center scroll-animate">
        <div class="relative w-59 h-59 mb-5 rounded-full overflow-hidden"
            style="background: radial-gradient(circle at center, #ffffff 0%, #F7F7F5 40%, #E5E8E3 80%, #DADDD9 100%);">
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-16 md:text-16 font-['Cormorant'] italic font-semibold">10+</span>
          </div>
        </div>
        <p class=" text-center leading-relaxed" v-html="$t('home.statsSection.stat1')"></p>
      </div>

      <!-- Stat 2 -->
      <div class="flex flex-col items-center text-center scroll-animate scroll-animate-delay-100">
        <div class="relative w-59 h-59 mb-5 rounded-full overflow-hidden"
            style="background: radial-gradient(circle at center, #ffffff 0%, #F7F7F5 40%, #E5E8E3 80%, #DADDD9 100%);">
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-16 md:text-16 font-['Cormorant'] italic font-semibold">400+</span>
          </div>
        </div>
        <p class=" text-center">{{ $t('home.statsSection.stat2') }}</p>
      </div>

      <!-- Stat 3 -->
      <div class="flex flex-col items-center text-center scroll-animate scroll-animate-delay-200">
        <div class="relative w-59 h-59 mb-5 rounded-full overflow-hidden"
            style="background: radial-gradient(circle at center, #ffffff 0%, #F7F7F5 40%, #E5E8E3 80%, #DADDD9 100%);">
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-16 md:text-16 font-['Cormorant'] italic font-semibold">300+</span>
          </div>
        </div>
        <p class=" text-center leading-relaxed" v-html="$t('home.statsSection.stat3')"></p>
      </div>

      <!-- Stat 4 -->
      <div class="flex flex-col items-center text-center scroll-animate scroll-animate-delay-300">
        <div class="relative w-59 h-59 mb-5 rounded-full overflow-hidden"
            style="background: radial-gradient(circle at center, #ffffff 0%, #F7F7F5 40%, #E5E8E3 80%, #DADDD9 100%);">
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="text-16 md:text-16 font-['Cormorant'] italic font-semibold">95%+</span>
          </div>
        </div>
        <p class=" text-center leading-relaxed" v-html="$t('home.statsSection.stat4')"></p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
</script>

<style scoped>
.ball {
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.9) 0%,             /* 中心亮 */
    var(--grayish-green) 60%,               /* 中段本色 */
    rgba(100, 100, 100, 0.25) 100%           /* 边缘暗 */
  );
  box-shadow:
    inset 0 2px 8px rgba(255, 255, 255, 0.6),    /* 顶部高光 */
    inset 0 -2px 12px rgba(0, 0, 0, 0.15);       /* 底部阴影 */
}

</style>
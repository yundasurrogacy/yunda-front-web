<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { initScrollAnimation } = useScrollAnimation()

onMounted(() => {
  initScrollAnimation()
})
</script>

<template>
  <div
    class="team-section bg-[var(--yunda-petal)] px-4 py-8 lg:px-20 lg:py-20"
  >
    <div class="container mx-auto w-full md:max-w-300">
      <!-- Kayla Luo -->
      <div id="kayla-luo" class="team-member mb-16 flex flex-col gap-8 py-4 lg:flex-row lg:items-center">
        <!-- 移动端标题在图片上方 -->
        <div class="text-center lg:hidden">
          <h2 class="mb-2 font-display text-[30px] text-[var(--yunda-bark)] font-medium lg:text-[38px]">
            {{ $t('about.team.kaylaLuo.name') }}
          </h2>
          <p class="font-sans text-base text-[var(--yunda-maple)] font-semibold lg:text-[18px]" style="font-family: var(--font-text)">
            {{ $t('about.team.kaylaLuo.title') }}
          </p>
        </div>

        <div class="slide-left w-full flex flex-shrink-0 justify-center lg:w-[215px]">
          <picture class="block h-60 w-40 overflow-hidden rounded-lg lg:h-72 lg:w-48">
            <source srcset="/images/pages/about/kayla-luo.avif" type="image/avif">
            <source srcset="/images/pages/about/kayla-luo.webp" type="image/webp">
            <img
              src="/images/pages/about/kayla-luo.png" alt="Kayla Luo"
              class="h-full w-full object-cover"
              width="3024"
              height="4032"
              loading="lazy"
              decoding="async"
            >
          </picture>
        </div>

        <div class="slide-right flex-1 text-center lg:text-left">
          <!-- 桌面端标题在图片旁边 -->
          <h2 class="mb-2 hidden font-display text-[30px] text-[var(--yunda-bark)] font-medium lg:block lg:text-[38px]">
            {{ $t('about.team.kaylaLuo.name') }}
          </h2>
          <p class="mb-6 hidden font-sans text-base text-[var(--yunda-maple)] font-semibold lg:mb-4 lg:block lg:text-[18px]" style="font-family: var(--font-text)">
            {{ $t('about.team.kaylaLuo.title') }}
          </p>
          <div class="space-y-4 font-sans text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[17px]" style="font-family: var(--font-text)">
            <p>
              {{ $t('about.team.kaylaLuo.bio.paragraph1') }}
            </p>
            <p>
              {{ $t('about.team.kaylaLuo.bio.paragraph2') }}
            </p>
            <p>
              {{ $t('about.team.kaylaLuo.bio.paragraph3') }}
            </p>
            <p>
              {{ $t('about.team.kaylaLuo.bio.paragraph4') }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped></style>

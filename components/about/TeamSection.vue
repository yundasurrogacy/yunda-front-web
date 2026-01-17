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
    class="team-section from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] bg-gradient-to-b px-4 py-8 lg:px-20 lg:py-20"
  >
    <div class="container mx-auto w-full md:max-w-300">
      <!-- Kayla Luo -->
      <div class="team-member mb-16 flex flex-col gap-8 py-4 lg:flex-row lg:items-center">
        <!-- 移动端标题在图片上方 -->
        <div class="text-center lg:hidden">
          <h2 class="mb-2 text-30px font-semibold" style="font-family: var(--font-primary)">
            {{ $t('about.team.kaylaLuo.name') }}
          </h2>
          <p class="text-16px">
            {{ $t('about.team.kaylaLuo.title') }}
          </p>
        </div>

        <div class="slide-left w-full flex flex-shrink-0 justify-center lg:w-[215px]">
          <picture class="block h-60 w-40 overflow-hidden rounded-lg lg:h-72 lg:w-48">
            <source srcset="/images/base/kayla-luo.webp" type="image/webp">
            <img
              src="/images/base/kayla-luo.png" alt="Kayla Luo"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            >
          </picture>
        </div>

        <div class="slide-right flex-1 text-center lg:text-left">
          <!-- 桌面端标题在图片旁边 -->
          <h2 class="mb-2 hidden text-30px text-[#271F18] font-semibold lg:block lg:text-3xl" style="font-family: var(--font-primary)">
            {{ $t('about.team.kaylaLuo.name') }}
          </h2>
          <p class="mb-6 hidden text-16px lg:mb-4 lg:block lg:text-xl">
            {{ $t('about.team.kaylaLuo.title') }}
          </p>
          <div class="text-14px space-y-4 lg:text-lg">
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

      <!-- Clara Chen -->
      <div class="team-member mb-16 flex flex-col gap-8 py-4 lg:flex-row-reverse lg:items-center">
        <!-- 移动端标题在图片上方 -->
        <div class="text-center lg:hidden">
          <h2 class="mb-2 text-30px font-semibold" style="font-family: var(--font-primary)">
            {{ $t('about.team.claraChen.name') }}
          </h2>
          <p class="text-16px">
            {{ $t('about.team.claraChen.title') }}
          </p>
        </div>

        <div class="slide-right w-full flex flex-shrink-0 justify-center lg:w-[215px]">
          <picture class="block h-60 w-40 overflow-hidden rounded-lg lg:h-72 lg:w-48">
            <img
              src="https://qiniu-resources.weweknow.com/yundasurrogacy-1/static/about-us/EmilyChen.png"
              alt="Clara Chen"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            >
          </picture>
        </div>

        <div class="slide-left flex-1 text-center lg:text-left">
          <!-- 桌面端标题在图片旁边 -->
          <h2 class="mb-2 hidden text-30px text-[#271F18] font-semibold lg:block lg:text-3xl" style="font-family: var(--font-primary)">
            {{ $t('about.team.claraChen.name') }}
          </h2>
          <p class="mb-6 hidden text-16px lg:mb-4 lg:block lg:text-xl">
            {{ $t('about.team.claraChen.title') }}
          </p>
          <div class="text-14px space-y-4 lg:text-lg">
            <p>
              {{ $t('about.team.claraChen.bio.paragraph1') }}
            </p>
            <p>
              {{ $t('about.team.claraChen.bio.paragraph2') }}
            </p>
            <p>
              {{ $t('about.team.claraChen.bio.paragraph3') }}
            </p>
            <p>
              {{ $t('about.team.claraChen.bio.paragraph4') }}
            </p>
          </div>
        </div>
      </div>

      <!-- Daniel Whitaker -->
      <div class="team-member mb-16 flex flex-col gap-8 py-4 lg:flex-row lg:items-center">
        <!-- 移动端标题在图片上方 -->
        <div class="text-center lg:hidden">
          <h2 class="mb-2 text-30px font-semibold" style="font-family: var(--font-primary)">
            {{ $t('about.team.danielWhitaker.name') }}
          </h2>
          <p class="text-16px">
            {{ $t('about.team.danielWhitaker.title') }}
          </p>
        </div>

        <div class="slide-left w-full flex flex-shrink-0 justify-center lg:w-[215px]">
          <picture class="block h-60 w-40 overflow-hidden rounded-lg lg:h-72 lg:w-48">
            <img
              src="https://qiniu-resources.weweknow.com/yundasurrogacy-1/static/about-us/DanielWhitaker.png"
              alt="Daniel Whitaker"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            >
          </picture>
        </div>

        <div class="slide-right flex-1 text-center lg:text-left">
          <!-- 桌面端标题在图片旁边 -->
          <h2 class="mb-2 hidden text-30px text-[#271F18] font-semibold lg:block lg:text-3xl" style="font-family: var(--font-primary)">
            {{ $t('about.team.danielWhitaker.name') }}
          </h2>
          <p class="mb-6 hidden text-16px lg:mb-4 lg:block lg:text-xl">
            {{ $t('about.team.danielWhitaker.title') }}
          </p>
          <div class="text-14px space-y-4 lg:text-lg">
            <p>
              {{ $t('about.team.danielWhitaker.bio.paragraph1') }}
            </p>
            <p>
              {{ $t('about.team.danielWhitaker.bio.paragraph2') }}
            </p>
            <p>
              {{ $t('about.team.danielWhitaker.bio.paragraph3') }}
            </p>
            <p>
              {{ $t('about.team.danielWhitaker.bio.paragraph4') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

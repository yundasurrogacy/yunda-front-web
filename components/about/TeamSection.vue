<template>
  <div
    class="team-section bg-gradient-to-b from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] py-8 lg:py-12 px-4 lg:px-20">
    <div class="container w-full md:max-w-300 mx-auto">
      <!-- Kayla Luo -->
      <div class="team-member flex flex-col lg:flex-row gap-8 mb-16 lg:items-center">
        <!-- 移动端标题在图片上方 -->
        <div class="lg:hidden text-center">
          <h2 class="text-30px font-semibold mb-2" style="font-family: var(--font-primary)">{{ $t('about.team.kaylaLuo.name') }}</h2>
          <p class="text-16px">{{ $t('about.team.kaylaLuo.title') }}</p>
        </div>

        <div class="w-full lg:w-[215px] flex-shrink-0 flex justify-center">
          <img src="~/public/images/base/kayla-luo.png" alt="Kayla Luo"
            class="w-40 h-60 lg:w-48 lg:h-72 object-cover" />
        </div>

        <div class="flex-1 text-center lg:text-left">
          <!-- 桌面端标题在图片旁边 -->
          <h2 class="hidden lg:block text-30px lg:text-3xl font-semibold text-[#271F18] mb-2" style="font-family: var(--font-primary)">{{ $t('about.team.kaylaLuo.name') }}</h2>
          <p class="hidden lg:block text-16px lg:text-xl mb-6 lg:mb-4">{{ $t('about.team.kaylaLuo.title') }}</p>
          <div class="text-14px lg:text-lg">
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

      <!-- Zoe Fang Boyd -->
      <div class="team-member flex flex-col lg:flex-row-reverse gap-8 lg:items-center">
        <!-- 移动端标题在图片上方 -->
        <div class="lg:hidden text-center">
          <h2 class="text-30px font-semibold mb-2" style="font-family: var(--font-primary)">{{ $t('about.team.zoeBoyd.name') }}</h2>
          <p class="text-16px">{{ $t('about.team.zoeBoyd.title') }}</p>
        </div>

        <div class="w-full lg:w-[215px] flex-shrink-0 flex justify-center">
          <img src="~/public/images/base/zoe-fang-boyd.png" alt="Zoe Fang Boyd"
            class="w-40 h-60 lg:w-48 lg:h-72 object-cover" />
        </div>

        <div class="flex-1 text-center lg:text-left">
          <!-- 桌面端标题在图片旁边 -->
          <h2 class="hidden lg:block text-30px lg:text-3xl font-semibold mb-2" style="font-family: var(--font-primary)">{{ $t('about.team.zoeBoyd.name') }}</h2>
          <p class="hidden lg:block text-16px lg:text-xl mb-6 lg:mb-4">{{ $t('about.team.zoeBoyd.title') }}</p>
          <div class="text-14px lg:text-18px">
            <p>
              {{ $t('about.team.zoeBoyd.bio.paragraph1') }}
            </p>
            <p>
              {{ $t('about.team.zoeBoyd.bio.paragraph2') }}
            </p>
            <p>
              {{ $t('about.team.zoeBoyd.bio.paragraph3') }}
            </p>
            <p>
              {{ $t('about.team.zoeBoyd.bio.paragraph4') }}
            </p>
            <p>
              {{ $t('about.team.zoeBoyd.bio.paragraph5') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped></style>
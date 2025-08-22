<template>
  <section class="py-20 md:py-25 px-4 md:px-20 bg-[var(--grayish-green)]">
    <div class="max-w-300 mx-auto">
      <!-- 标题部分 - 居中对齐 -->
      <div class="text-center mb-8 md:mb-10" style="font-family: var(--font-primary)">
        <h2 class=" text-7.5 md:text-10 font-semibold mb-2 md:mb-3 scroll-animate">
          {{ $t('home.costSection.title1') }}
        </h2>
        <p class=" text-6 md:text-8 scroll-animate scroll-animate-delay-100">
          {{ $t('home.costSection.title2') }}
        </p>
      </div>

      <!-- 描述部分 - 居中对齐 -->
      <p class="mb-8 md:mb-10 max-w-244 md:max-w-2xl mx-auto text-center scroll-animate scroll-animate-delay-200">
        {{ $t('home.costSection.description1') }}
      </p>

      <!-- 费用部分 - 居中对齐标题，左对齐列表 -->
      <div class="mb-8 md:mb-10 scroll-animate scroll-animate-delay-300">
        <p class="uppercase mb-6 md:mb-8 text-center">
          {{ $t('home.costSection.description2') }}
        </p>

        <!-- 费用项目列表 - 左对齐带项目符号 -->
        <ul
          class="space-y-4 md:space-y-5 max-w-md md:max-w-2xl mx-auto pl-6 md:pl-10">
          <li class="flex items-start">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-[var(--black)] mt-2.5 mr-3 flex-shrink-0"></span>
            <span>{{ $t('home.costSection.item1') }}</span>
          </li>
          <li class="flex items-start">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-[var(--black)] mt-2.5 mr-3 flex-shrink-0"></span>
            <span>{{ $t('home.costSection.item2') }}</span>
          </li>
          <li class="flex items-start">
            <span class="inline-block w-1.5 h-1.5 rounded-full bg-[var(--black)] mt-2.5 mr-3 flex-shrink-0"></span>
            <span>{{ $t('home.costSection.item3') }}</span>
          </li>
        </ul>
      </div>

      <!-- 结尾描述 - 居中对齐 -->
      <p class="font-normal max-w-310 md:max-w-2xl mx-auto text-center scroll-animate scroll-animate-delay-300">
        {{ $t('home.costSection.description4') }}
      </p>
    </div>
  </section>
</template>

<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
</script>

<style scoped></style>
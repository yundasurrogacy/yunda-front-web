<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <section class="bg-[var(--grayish-green)] px-4 py-20 md:px-20 md:py-25">
    <div class="mx-auto max-w-300">
      <!-- 标题部分 - 居中对齐 -->
      <div class="mb-8 text-center md:mb-10" style="font-family: var(--font-primary)">
        <h2 class="scroll-animate mb-2 text-7.5 font-semibold md:mb-3 md:text-10">
          {{ $t('home.costSection.title1') }}
        </h2>
        <p class="scroll-animate scroll-animate-delay-100 text-6 md:text-8">
          {{ $t('home.costSection.title2') }}
        </p>
      </div>

      <!-- 描述部分 - 居中对齐 -->
      <p class="scroll-animate scroll-animate-delay-200 mx-auto mb-8 max-w-244 text-center md:mb-10 md:max-w-2xl">
        {{ $t('home.costSection.description1') }}
      </p>

      <!-- 费用部分 - 居中对齐标题，左对齐列表 -->
      <div class="scroll-animate scroll-animate-delay-300 mb-8 md:mb-10">
        <p class="mb-6 text-center uppercase md:mb-8">
          {{ $t('home.costSection.description2') }}
        </p>

        <!-- 费用项目列表 - 左对齐带项目符号 -->
        <ul
          class="mx-auto max-w-md pl-6 md:max-w-2xl space-y-4 md:pl-10 md:space-y-5"
        >
          <li class="flex items-start">
            <span class="mr-3 mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--black)]" />
            <span>{{ $t('home.costSection.item1') }}</span>
          </li>
          <li class="flex items-start">
            <span class="mr-3 mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--black)]" />
            <span>{{ $t('home.costSection.item2') }}</span>
          </li>
          <li class="flex items-start">
            <span class="mr-3 mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--black)]" />
            <span>{{ $t('home.costSection.item3') }}</span>
          </li>
        </ul>
      </div>

      <!-- 结尾描述 - 居中对齐 -->
      <p class="scroll-animate scroll-animate-delay-300 mx-auto max-w-310 text-center font-normal md:max-w-2xl">
        {{ $t('home.costSection.description4') }}
      </p>
    </div>
  </section>
</template>

<style scoped></style>

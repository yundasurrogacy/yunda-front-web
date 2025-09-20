<template>
  <div class="relative w-full min-h-50 lg:min-h-100 bg-[var(--olive-green)] py-20 lg:py-40 px-8 lg:px-40">
    <div class="container lg:max-w-320 mx-auto text-center text-3.5 lg:text-5 scroll-animate">
      <h2 class="text-7.5 lg:text-10 font-semibold mb-6" style="font-family: var(--font-primary)">
        {{ title }}
      </h2>
      <p class="mb-8 whitespace-pre-line">
        {{ description }}
      </p>
      <a
        :href="'mailto:kayla@yundasurrogacy.com'"
        class="inline-flex items-center justify-center bg-[var(--light-cream)] uppercase py-3 px-4 rounded-[10px] shadow-inner-white-soft hover:bg-[var(--head-bg)] transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0"
      >
        {{ buttonText }}
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
// 定义 props 接收外部传入的文字内容
interface Props {
  title: string
  description: string
  buttonText: string
}

defineProps<Props>()
</script>

<style scoped>
.shadow-inner-white-soft {
  box-shadow: -2px -2px 1px rgba(255, 255, 255, 0.5) inset;
}
</style>

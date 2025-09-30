<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

defineProps<Props>()
useScrollAnimation()
// 定义 props 接收外部传入的文字内容
interface Props {
  title: string
  description: string
  buttonText: string
}
</script>

<template>
  <div class="relative min-h-50 w-full bg-[var(--olive-green)] px-8 py-20 lg:min-h-100 lg:px-40 lg:py-40">
    <div class="scroll-animate container mx-auto text-center text-3.5 lg:max-w-320 lg:text-5">
      <h2 class="mb-6 text-7.5 font-semibold lg:text-10" style="font-family: var(--font-primary)">
        {{ title }}
      </h2>
      <p class="mb-8 whitespace-pre-line">
        {{ description }}
      </p>
      <a
        href="mailto:kayla@yundasurrogacy.com"
        class="shadow-inner-white-soft inline-flex transform items-center justify-center rounded-[10px] bg-[var(--light-cream)] px-4 py-3 uppercase transition-all duration-300 ease-in-out active:translate-y-0 hover:bg-[var(--head-bg)] hover:-translate-y-0.5"
      >
        {{ buttonText }}
      </a>
    </div>
  </div>
</template>

<style scoped>
.shadow-inner-white-soft {
  box-shadow: -2px -2px 1px rgba(255, 255, 255, 0.5) inset;
}
</style>

<template>
  <section class="su-hero-section relative w-full min-h-50 lg:min-h-100 py-20 lg:py-40 px-8 lg:px-40 bg-gradient-to-b from-[var(--head-bg)] to-[var(--hero-center)]">
    <!-- Hero Background with Gradient -->
      <div class="lg:max-w-320 mx-auto text-center text-3 lg:text-5 scroll-animate">
        <!-- Title -->
        <h1 class="text-7.5 lg:text-10 font-semibold mb-6 lg:mb-8 leading-tight" style="font-family: var(--font-primary)">
          {{ title }}
        </h1>

        <!-- Description -->
        <div class="leading-relaxed mb-8 lg:mb-12">
          <p class="whitespace-pre-line">
            {{ description }}
          </p>
        </div>
        <!-- CTA Button -->
        <a href="/surrogate-qualification" class="inline-flex items-center justify-center bg-[var(--light-cream)] uppercase py-3 px-4 rounded-[10px] shadow-inner-white-soft backdrop-blur-20 hover:bg-[var(--head-bg)] transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 active:translate-y-0">
          {{ buttonText }}
        </a>
      </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

// 定义 props 接收外部传入的文字内容
interface Props {
  title: string
  description: string
  buttonText: string
}

defineProps<Props>()

// SUHeroSection 专用动画：刷新时立即播放
onMounted(() => {
  // 查找当前组件内的 scroll-animate 元素
  const currentComponent = document.querySelector('.su-hero-section')
  if (currentComponent) {
    const element = currentComponent.querySelector('.scroll-animate')
    if (element) {
      // 初始状态
      element.classList.add('scroll-animate-init')
      
      // 稍后触发动画
      setTimeout(() => {
        element.classList.add('animate-in')
      }, 300)
    }
  }
})
</script>

<style scoped>
.shadow-inner-white-soft {
  box-shadow: -2px -2px 1px rgba(255, 255, 255, 0.50) inset;
}

.backdrop-blur-20 {
  backdrop-filter: blur(20px);
}
</style>
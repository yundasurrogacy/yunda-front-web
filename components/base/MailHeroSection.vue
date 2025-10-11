<script setup lang="ts">
import { onMounted } from 'vue'

// 定义 props 接收外部传入的文字内容
interface Props {
  title: string
  description: string
  buttonText: string
}

defineProps<Props>()

// MailHeroSection 专用动画：刷新时立即播放
onMounted(() => {
  // 查找当前组件内的 scroll-animate 元素
  const currentComponent = document.querySelector('.mail-hero-section')
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

<template>
  <section class="mail-hero-section relative min-h-50 w-full from-[var(--head-bg)] via-[var(--hero-center)] to-[var(--head-bg)] bg-gradient-to-b px-8 py-20 lg:min-h-100 lg:px-40 lg:py-40">
    <!-- Hero Background with Gradient -->
    <div class="scroll-animate mx-auto text-center text-3 lg:max-w-320 lg:text-5">
      <!-- Title -->
      <h1 class="mb-6 text-7.5 font-semibold leading-tight lg:mb-8 lg:text-10" style="font-family: var(--font-primary)">
        {{ title }}
      </h1>

      <!-- Description -->
      <div class="mb-8 leading-relaxed lg:mb-12">
        <p class="whitespace-pre-line">
          {{ description }}
        </p>
      </div>
      <!-- CTA Button -->
      <a
        href="mailto:kayla@yundasurrogacy.com"
        class="shadow-inner-white-soft inline-flex transform items-center justify-center rounded-[10px] bg-[var(--light-cream)] px-4 py-3 uppercase backdrop-blur-20 transition-all duration-300 ease-in-out active:translate-y-0 hover:bg-[var(--head-bg)] lg:text-4 hover:-translate-y-0.5"
      >
        {{ buttonText }}
      </a>
    </div>
  </section>
</template>

<style scoped>
.shadow-inner-white-soft {
  box-shadow: -2px -2px 1px rgba(255, 255, 255, 0.5) inset;
}

.backdrop-blur-20 {
  backdrop-filter: blur(20px);
}
</style>

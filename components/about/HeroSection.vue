<script setup lang="ts">
import { onMounted } from 'vue'

// HeroSection 专用动画：刷新时立即播放
onMounted(() => {
  // 查找当前组件内的 scroll-animate 元素
  const currentComponent = document.querySelector('.about-hero-section')
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
  <div class="about-hero-section relative min-h-50 w-full from-[var(--head-bg)] to-[var(--hero-center)] bg-gradient-to-b px-8 py-12 lg:min-h-100 lg:px-12 lg:py-20">
    <!-- Hero Background with Gradient -->
    <div class="scroll-animate mx-auto text-center text-3 lg:max-w-320 lg:text-5">
      <!-- Title -->
      <h1 class="mb-6 text-7.5 font-semibold leading-tight lg:mb-8 lg:text-10" style="font-family: var(--font-primary)">
        {{ $t('about.hero.title') }}
      </h1>
      <div class="mx-auto max-w-5xl text-base leading-relaxed lg:text-xl">
        <p class="mb-4 whitespace-pre-line">
          {{ $t('about.hero.paragraph1') }}
        </p>
        <p class="mb-4 whitespace-pre-line">
          {{ $t('about.hero.paragraph2') }}
        </p>
        <p class="mb-4 whitespace-pre-line">
          {{ $t('about.hero.paragraph3') }}
          <span class="font-semibold"> {{ $t('about.hero.highlight') }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-gradient {
  height: 667px;
  top: 91px;
}
</style>

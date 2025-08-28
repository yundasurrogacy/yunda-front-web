<template>
  <div class="about-hero-section relative w-full min-h-50 lg:min-h-100 py-12 lg:py-20 px-8 lg:px-12 bg-gradient-to-b from-[var(--head-bg)] to-[var(--hero-center)]">
    <!-- Hero Background with Gradient -->
      <div class="lg:max-w-320 mx-auto text-center text-3 lg:text-5 scroll-animate">
        <!-- Title -->
        <h1 class="text-7.5 lg:text-10 font-semibold mb-6 lg:mb-8 leading-tight" style="font-family: var(--font-primary)">
          {{ $t('about.hero.title') }}
        </h1>
        <div class="text-base lg:text-xl max-w-5xl mx-auto leading-relaxed">
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

<script setup lang="ts">
import { onMounted } from 'vue';

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

<style scoped>
.hero-gradient {
  height: 667px;
  top: 91px;
}
</style>
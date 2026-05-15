<script setup lang="ts">
import { onMounted } from 'vue'

// HeroSection 专用动画：刷新时立即播放
onMounted(() => {
  const currentComponent = document.querySelector('.about-hero-section')
  if (currentComponent) {
    const element = currentComponent.querySelector('.scroll-animate')
    if (element) {
      element.classList.add('scroll-animate-init')
      setTimeout(() => {
        element.classList.add('animate-in')
      }, 300)
    }
  }
})
</script>

<template>
  <div class="about-hero-section relative min-h-50 w-full bg-[var(--yunda-petal)] px-8 py-12 lg:min-h-100 lg:px-12 lg:py-20">
    <div class="scroll-animate mx-auto max-w-5xl text-center text-[var(--yunda-bark)]">
      <h1 class="mb-6 font-display text-[38px] font-semibold leading-[1.1] lg:mb-8 lg:text-[52px]">
        {{ $t('about.hero.title') }}
      </h1>
      <div class="mx-auto max-w-5xl font-sans text-base leading-[1.75] lg:text-[19px]" style="font-family: var(--font-text)">
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

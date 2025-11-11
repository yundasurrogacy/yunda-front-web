<script setup>
import { defineAsyncComponent, ref } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

const SideMenu = defineAsyncComponent(() => import('./SideMenu.vue'))
const RightMenu = defineAsyncComponent(() => import('./RightMenu.vue'))

const isMenuOpen = ref(false)
const isRightMenuOpen = ref(false)
</script>

<template>
  <!-- 占位元素，防止内容被固定的 header 遮挡 -->
  <div class="h-20 w-full md:h-25" />

  <header class="fixed left-0 top-0 z-50 h-20 w-full flex items-center justify-between bg-[var(--head-bg)] px-4.5 md:h-25 md:px-20">
    <!-- Left Menu Button (always visible) -->
    <button class="h-10 w-10 flex items-center justify-center" @click="isMenuOpen = !isMenuOpen">
      <img src="/images/base/left_icon.svg" alt="Menu" class="h-10 w-10">
    </button>

    <!-- Logo -->
    <div class="flex flex-1 justify-center md:flex-none md:justify-start">
      <NuxtLink to="/" class="inline-block">
        <picture>
          <source srcset="/images/base/logo.webp" type="image/webp">
          <img src="/images/base/logo.png" alt="Yunda Logo" class="w-20" loading="lazy" decoding="async">
        </picture>
      </NuxtLink>
    </div>

    <!-- Desktop Navigation -->
    <nav class="hidden items-center md:flex space-x-8">
      <!-- <a href="#" class="text-[#271F18] text-lg font-normal uppercase hover:opacity-75 transition-opacity">Log in</a> -->
      <LanguageSwitcher />
    </nav>

    <!-- Right Menu Button (mobile only) -->
    <button class="h-10 w-10 flex items-center justify-center md:hidden" @click="isRightMenuOpen = !isRightMenuOpen">
      <img src="/images/base/right_icon.svg" alt="Menu" class="h-10 w-10">
    </button>
  </header>

  <!-- SideMenu Component -->
  <SideMenu v-model:is-open="isMenuOpen" />

  <!-- RightMenu Component -->
  <RightMenu v-model:is-open="isRightMenuOpen" />
</template>

<style scoped>
/* Styles specific to AppHeader */
header {
  /* 添加阴影效果，使吸顶导航更加明显 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>

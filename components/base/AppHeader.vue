<template>
  <!-- 占位元素，防止内容被固定的 header 遮挡 -->
  <div class="w-full h-20 md:h-25"></div>
  
  <header class="fixed top-0 left-0 z-50 w-full h-20 md:h-25 bg-[var(--head-bg)] flex items-center justify-between px-4.5 md:px-20">
    <!-- Left Menu Button (always visible) -->
    <button class="w-10 h-10 flex items-center justify-center" @click="isMenuOpen = !isMenuOpen">
      <img src="~/public/images/base/left_icon.svg" alt="Menu" class="w-10 h-10">
    </button>

    <!-- Logo -->
    <div class="flex-1 md:flex-none flex justify-center md:justify-start">
      <NuxtLink to="/" class="inline-block">
        <img src="~/public/images/base/logo.png" alt="Yunda Logo" class="w-20" />
      </NuxtLink>

    </div>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center space-x-8">
      <!--<a href="#" class="text-[#271F18] text-lg font-normal uppercase hover:opacity-75 transition-opacity">Log in</a>-->
      <LanguageSwitcher />
    </nav>

    <!-- Right Menu Button (mobile only) -->
    <button class="md:hidden w-10 h-10 flex items-center justify-center" @click="isRightMenuOpen = !isRightMenuOpen">
      <img src="~/public/images/base/right_icon.svg" alt="Menu" class="w-10 h-10">
    </button>
  </header>

  <!-- SideMenu Component -->
  <SideMenu v-model:isOpen="isMenuOpen" />

  <!-- RightMenu Component -->
  <RightMenu v-model:isOpen="isRightMenuOpen" />
</template>

<script setup>
import { ref } from 'vue';
import SideMenu from './SideMenu.vue';
import RightMenu from './RightMenu.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';

const isMenuOpen = ref(false);
const isRightMenuOpen = ref(false);
</script>

<style scoped>
/* Styles specific to AppHeader */
header {
  /* 添加阴影效果，使吸顶导航更加明显 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
</style>
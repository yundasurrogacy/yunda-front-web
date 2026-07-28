<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'

const SideMenu = defineAsyncComponent(() => import('./SideMenu.vue'))

const localePath = useLocalePath()
const route = useRoute()
const isMenuOpen = ref(false)
const homePath = computed(() => localePath('/'))
const isHomePage = computed(() => route.path === homePath.value)
</script>

<template>
  <!-- 占位元素，防止内容被固定的 header 遮挡 -->
  <div class="h-20 w-full md:h-25" />

  <header class="fixed left-0 top-0 z-50 h-20 w-full flex items-center justify-between bg-[var(--yunda-petal)] px-4.5 md:h-25 md:px-20">
    <!-- Left Menu Button (always visible) -->
    <button class="h-10 w-10 flex items-center justify-center" @click="isMenuOpen = !isMenuOpen">
      <img src="/images/shared/ui/menu.svg" alt="Menu" class="h-10 w-10">
    </button>

    <!-- Logo -->
    <div class="absolute left-1/2 -translate-x-1/2 transform">
      <h1 v-if="isHomePage" class="m-0">
        <NuxtLink :to="homePath" class="inline-block" aria-label="Yunda Surrogacy">
          <span class="sr-only">Yunda Surrogacy</span>
          <picture>
            <source srcset="/images/shared/brand/logo.webp" type="image/webp">
            <img src="/images/shared/brand/logo.png" alt="Yunda Logo" class="w-20" loading="lazy" decoding="async">
          </picture>
        </NuxtLink>
      </h1>
      <NuxtLink v-else :to="homePath" class="inline-block" aria-label="Yunda Surrogacy">
        <picture>
          <source srcset="/images/shared/brand/logo.webp" type="image/webp">
          <img src="/images/shared/brand/logo.png" alt="Yunda Logo" class="w-20" loading="lazy" decoding="async">
        </picture>
      </NuxtLink>
    </div>

    <!-- 暂时在全站隐藏语言切换入口，保留占位以维持 Logo 居中。 -->
    <div class="h-10 w-10 shrink-0" aria-hidden="true" />
  </header>

  <!-- SideMenu Component -->
  <SideMenu v-model:is-open="isMenuOpen" />
</template>

<style scoped>
/* Styles specific to AppHeader */
header {
  /* 添加阴影效果，使吸顶导航更加明显 */
  box-shadow: 0 2px 10px rgba(60, 36, 21, 0.08);
}
</style>

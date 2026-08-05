<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import LanguageSwitcher from './LanguageSwitcher.vue'

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

  <header class="fixed left-0 top-0 z-50 h-20 w-full flex items-center justify-between overflow-hidden bg-[var(--yunda-petal)] px-4.5 md:h-25 md:px-20">
    <!-- 左右等宽槽位，避免语言切换比菜单宽时视觉上把 Logo「挤歪」 -->
    <div class="z-10 w-28 flex shrink-0 items-center justify-start">
      <button class="h-10 w-10 flex items-center justify-center" @click="isMenuOpen = !isMenuOpen">
        <img src="/images/shared/ui/menu.svg" alt="Menu" class="h-10 w-10" width="40" height="40">
      </button>
    </div>

    <!-- Logo：相对 header 真正水平+垂直居中，并限制高度防止溢出 -->
    <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
      <h1 v-if="isHomePage" class="pointer-events-auto m-0 leading-none">
        <NuxtLink :to="homePath" class="inline-flex items-center justify-center" aria-label="Yunda Surrogacy">
          <span class="sr-only">Yunda Surrogacy</span>
          <picture>
            <source srcset="/images/shared/brand/logo.webp" type="image/webp">
            <img
              src="/images/shared/brand/logo.png"
              alt="Yunda Logo"
              width="80"
              height="73"
              class="block h-14 w-auto max-h-14 object-contain md:h-16 md:max-h-16"
              decoding="async"
            >
          </picture>
        </NuxtLink>
      </h1>
      <NuxtLink
        v-else
        :to="homePath"
        class="pointer-events-auto inline-flex items-center justify-center"
        aria-label="Yunda Surrogacy"
      >
        <picture>
          <source srcset="/images/shared/brand/logo.webp" type="image/webp">
          <img
            src="/images/shared/brand/logo.png"
            alt="Yunda Logo"
            width="80"
            height="73"
            class="block h-14 w-auto max-h-14 object-contain md:h-16 md:max-h-16"
            decoding="async"
          >
        </picture>
      </NuxtLink>
    </div>

    <nav class="app-header-lang z-10 w-28 flex shrink-0 items-center justify-end" aria-label="Language">
      <LanguageSwitcher />
    </nav>
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

/* 语言切换：正文 Text + Bark，悬停 Maple（不改动 LanguageSwitcher 组件文件） */
.app-header-lang :deep(button) {
  font-family: var(--font-text);
  color: var(--yunda-bark);
}

.app-header-lang :deep(button:hover) {
  color: var(--yunda-maple);
}

.app-header-lang :deep(span[aria-hidden='true']) {
  color: color-mix(in srgb, var(--yunda-bark) 38%, transparent);
}
</style>

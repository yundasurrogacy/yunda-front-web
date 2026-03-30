<script setup>
const { locale, setLocale } = useI18n()

// 确保响应式更新
const currentLocale = computed(() => locale.value)
</script>

<template>
  <div
    class="flex items-center gap-1.5 px-2 py-1 text-base text-[#271F18] md:gap-2 md:px-2.5 md:py-1.5 md:text-lg"
  >
    <button
      type="button"
      class="transition-opacity hover:opacity-80"
      :class="{ 'font-bold': currentLocale === 'en' }"
      @click="setLocale('en')"
    >
      EN
    </button>
    <span class="text-black/35" aria-hidden="true">/</span>
    <button
      type="button"
      class="font-['SourceHanSerifCN'] transition-opacity hover:opacity-80"
      :class="{ 'font-bold': currentLocale === 'zh' }"
      @click="setLocale('zh')"
    >
      中文
    </button>
  </div>
</template>

<script setup>
const { locale, setLocale } = useI18n()

// 确保响应式更新
const currentLocale = computed(() => locale.value)
</script>

<template>
  <div class="flex items-center gap-2">
    <button :class="{ 'font-bold': currentLocale === 'en' }" @click="setLocale('en')">
      EN
    </button>
    <span>/</span>
    <button :class="{ 'font-bold': currentLocale === 'zh' }" class="font-['SourceHanSerifCN']" @click="setLocale('zh')">
      中文
    </button>
  </div>
</template>

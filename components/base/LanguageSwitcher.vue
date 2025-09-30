<script setup>
const { locale, setLocale } = useI18n()
</script>

<template>
  <div class="flex items-center gap-2">
    <button :class="{ 'font-bold': locale === 'en' }" @click="setLocale('en')">
      EN
    </button>
    <span>/</span>
    <button :class="{ 'font-bold': locale === 'zh' }" class="font-['SourceHanSerifCN']" @click="setLocale('zh')">
      中文
    </button>
  </div>
</template>

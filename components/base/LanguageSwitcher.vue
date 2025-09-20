<template>
  <div class="flex items-center gap-2">
    <button @click="setLocale('en')" :class="{ 'font-bold': locale === 'en' }">EN</button>
    <span>/</span>
    <button @click="setLocale('zh')" :class="{ 'font-bold': locale === 'zh' }" class="font-['SourceHanSerifCN']">中文</button>
  </div>
</template>

<script setup>
const { locale, setLocale } = useI18n()
</script>

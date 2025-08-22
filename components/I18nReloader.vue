<script setup>
import { watch } from 'vue'

const { locale, setLocaleMessage } = useI18n()

async function loadTranslations(newLocale) {
  try {
    const messages = await import(`../i18n/locales/${newLocale}.json`)
    setLocaleMessage(newLocale, messages.default)
  }
  catch (error) {
    console.error(`Failed to load translations for ${newLocale}:`, error)
  }
}

watch(locale, (newLocale) => {
  loadTranslations(newLocale)
}, { immediate: true })
</script>

<template>
  <div class="hidden" />
</template>

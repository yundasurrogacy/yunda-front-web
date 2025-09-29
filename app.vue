<script setup lang="ts">
const { locale } = useI18n()

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
  ],
  htmlAttrs: {
    lang: computed(() => locale.value),
    class: computed(() => `lang-${locale.value}`),
  },
})
</script>

<template>
  <div style="font-family: var(--font-secondary)" class="text-[var(--dark-brown)] text-3.5 lg:text-5">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

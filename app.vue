<script setup lang="ts">
const { locale } = useI18n()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const baseUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const canonicalUrl = computed(() => {
  const path = route.path || '/'
  if (!baseUrl.value)
    return path

  if (path === '/')
    return `${baseUrl.value}/`

  return `${baseUrl.value}${path.replace(/\/$/, '')}`
})

// 创建一个响应式的 lang 值
const htmlLang = computed(() => locale.value)
const htmlClass = computed(() => `lang-${locale.value}`)

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'canonical', href: canonicalUrl },
  ],
  htmlAttrs: {
    lang: htmlLang,
    class: htmlClass,
  },
})
</script>

<template>
  <div style="font-family: var(--font-secondary)" class="text-3.5 text-[var(--dark-brown)] lg:text-5">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

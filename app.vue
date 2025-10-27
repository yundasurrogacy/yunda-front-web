<script setup lang="ts">
const { locale, setLocale } = useI18n()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

// 在客户端检测浏览器语言，如果不在 zh 和 en 范围内，则使用 en
if (import.meta.client) {
  const browserLang = navigator.language || (navigator as any).userLanguage
  const isChinese = browserLang.toLowerCase().startsWith('zh')
  const isEnglish = browserLang.toLowerCase().startsWith('en')

  // 如果浏览器语言既不是中文也不是英文，则使用英文
  if (!isChinese && !isEnglish) {
    setLocale('en')
  }
}

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

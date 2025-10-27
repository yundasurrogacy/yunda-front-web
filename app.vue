<script setup lang="ts">
const { locale, setLocale } = useI18n()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

// 在客户端检查 cookie，确保默认语言为英文
if (import.meta.client) {
  onMounted(() => {
    const cookie = useCookie('i18n_redirected')
    // 如果 cookie 不存在，设置为英文
    if (!cookie.value) {
      setLocale('en')
    }
    // 如果 cookie 存在但不是有效的语言代码（'en' 或 'zh'），也设置为英文
    else if (cookie.value !== 'en' && cookie.value !== 'zh') {
      setLocale('en')
    }
  })
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

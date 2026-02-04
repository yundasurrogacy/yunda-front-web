<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { buildOrganizationSchema, buildWebsiteSchema } from '~/utils/schema'

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

// 生成 hreflang 标签，用于多语言 SEO
const hreflangLinks = computed(() => {
  if (!baseUrl.value)
    return []

  const path = route.path || '/'
  // 移除语言前缀，获取基础路径
  const basePath = path.replace(/^\/zh/, '') || '/'

  // 生成英文和中文版本的 URL
  const enUrl = `${baseUrl.value}${basePath}`
  const zhPath = basePath === '/' ? '/zh' : `/zh${basePath}`
  const zhUrl = `${baseUrl.value}${zhPath}`

  return [
    { rel: 'alternate', hreflang: 'en-US', href: enUrl },
    { rel: 'alternate', hreflang: 'zh-CN', href: zhUrl },
    { rel: 'alternate', hreflang: 'x-default', href: enUrl }, // 默认语言（英文）
  ]
})

// 使用具体 locale 便于浏览器日期等控件显示对应格式（en-US / zh-CN）
const htmlLang = computed(() => (locale.value === 'zh' ? 'zh-CN' : 'en-US'))
const htmlClass = computed(() => `lang-${locale.value}`)
const resolvedSiteUrl = computed(() => baseUrl.value || 'https://www.yundasurrogacy.com')

const organizationSchema = computed(() =>
  buildOrganizationSchema({
    url: resolvedSiteUrl.value,
  }),
)

const websiteSchema = computed(() =>
  buildWebsiteSchema({
    url: resolvedSiteUrl.value,
    locale: locale.value,
    searchPath: '/blog?keyword={search_term_string}',
  }),
)

useHead(() => ({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'canonical', href: canonicalUrl.value },
    ...hreflangLinks.value,
  ],
  htmlAttrs: {
    lang: htmlLang.value,
    class: htmlClass.value,
  },
  script: [
    {
      key: 'schema-org-website',
      type: 'application/ld+json',
      children: JSON.stringify(websiteSchema.value),
    },
    {
      key: 'schema-org-organization',
      type: 'application/ld+json',
      children: JSON.stringify(organizationSchema.value),
    },
  ],
}))
</script>

<template>
  <div style="font-family: var(--font-secondary)" class="text-3.5 text-[var(--dark-brown)] lg:text-5">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

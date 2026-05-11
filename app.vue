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
const defaultOgTitle = computed(() =>
  locale.value === 'zh'
    ? '云达代孕｜加州准父母代孕机构'
    : 'Yunda Surrogacy ｜California Surrogacy Agency for Intended Parents',
)
const defaultOgDescription = computed(() =>
  locale.value === 'zh'
    ? 'Yunda Surrogacy 为准父母和代孕妈妈提供美国代孕、IVF、法律与保险协调服务。'
    : 'Yunda Surrogacy is a California surrogacy agency supporting intended parents and surrogates with IVF, legal, and insurance coordination.',
)
const defaultOgImage = computed(() =>
  baseUrl.value
    ? `${baseUrl.value}/images/home/index-bg.webp`
    : '/images/home/index-bg.webp',
)

// 生成 hreflang 标签，用于多语言 SEO
const hreflangLinks = computed(() => {
  if (!baseUrl.value)
    return []

  const path = route.path || '/'
  // 仅移除严格的 /zh 语言前缀，避免误匹配 /zhejiang 等路径
  const basePath = path.replace(/^\/zh(?=\/|$)/, '') || '/'

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
    { property: 'og:title', content: defaultOgTitle.value },
    { property: 'og:description', content: defaultOgDescription.value },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:image', content: defaultOgImage.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Yunda Surrogacy' },
    { property: 'og:locale', content: locale.value === 'zh' ? 'zh_CN' : 'en_US' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: defaultOgTitle.value },
    { name: 'twitter:description', content: defaultOgDescription.value },
    { name: 'twitter:image', content: defaultOgImage.value },
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

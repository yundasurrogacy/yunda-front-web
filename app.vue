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

// 创建一个响应式的 lang 值
const htmlLang = computed(() => locale.value)
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

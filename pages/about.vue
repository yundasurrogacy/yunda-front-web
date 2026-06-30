<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { buildBreadcrumbListSchema, buildProfilePageSchema, buildWebPageSchema } from '~/utils/schema'
import AboutCareerSection from '../components/about/CareerSection.vue'
import AboutHeroSection from '../components/about/HeroSection.vue'
import PhotoGallerySection from '../components/about/PhotoGallerySection.vue'
import AboutTeamSection from '../components/about/TeamSection.vue'
import AppFooter from '../components/base/AppFooter.vue'
import AppHeader from '../components/base/AppHeader.vue'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

useHead({
  title: t('about.meta.title'),
  meta: [
    {
      name: 'description',
      content: t('about.meta.description'),
    },
  ],
})

const heroParagraphs = computed(() => [
  t('about.hero.paragraph1'),
  t('about.hero.paragraph2'),
  t('about.hero.paragraph3'),
  t('about.hero.highlight'),
].filter(Boolean))

function teamBio(nameKey) {
  const paragraphs = []
  let index = 1
  while (true) {
    const value = t(`about.team.${nameKey}.bio.paragraph${index}`)
    if (!value || value.startsWith(`about.team.${nameKey}.bio.paragraph`))
      break
    paragraphs.push(value)
    index++
  }
  return paragraphs
}

const teamMembers = computed(() => [
  {
    title: t('about.team.kaylaLuo.name'),
    jobTitle: t('about.team.kaylaLuo.title'),
    text: teamBio('kaylaLuo').join(' '),
  },
])

const aboutPageSchema = computed(() => buildWebPageSchema({
  baseUrl: siteUrl.value || undefined,
  url: '/about',
  name: t('about.meta.title'),
  description: t('about.meta.description'),
  about: heroParagraphs.value.join(' '),
  audience: locale.value === 'zh'
    ? ['准父母', '代孕妈妈', '国际家庭']
    : ['Intended parents', 'Surrogates', 'International families'],
  locale: locale.value,
}))

const aboutBreadcrumbSchema = computed(() => buildBreadcrumbListSchema({
  baseUrl: siteUrl.value || undefined,
  locale: locale.value,
  items: [
    { name: locale.value === 'zh' ? '首页' : 'Home', url: '/' },
    { name: locale.value === 'zh' ? '关于我们' : 'About', url: '/about' },
  ],
}))

const founderSchema = computed(() => {
  const baseUrl = siteUrl.value || 'https://www.yundasurrogacy.com'
  const aboutPath = locale.value === 'zh' ? '/zh/about' : '/about'

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/about#kayla-luo`,
    'name': teamMembers.value[0]?.title,
    'jobTitle': teamMembers.value[0]?.jobTitle,
    'description': teamMembers.value[0]?.text,
    'url': `${baseUrl}${aboutPath}`,
    'worksFor': {
      '@id': `${baseUrl}/#organization`,
    },
  }
})

const founderProfileSchema = computed(() => buildProfilePageSchema({
  baseUrl: siteUrl.value || undefined,
  url: '/about',
  name: teamMembers.value[0]?.title
    ? `${teamMembers.value[0].title} Profile`
    : 'Kayla Luo Profile',
  description: teamMembers.value[0]?.text,
  person: founderSchema.value,
  locale: locale.value,
}))

useHead(() => ({
  script: [
    {
      key: 'schema-about-page',
      type: 'application/ld+json',
      children: JSON.stringify(aboutPageSchema.value),
    },
    {
      key: 'schema-about-breadcrumb',
      type: 'application/ld+json',
      children: JSON.stringify(aboutBreadcrumbSchema.value),
    },
    {
      key: 'schema-about-founder',
      type: 'application/ld+json',
      children: JSON.stringify(founderSchema.value),
    },
    {
      key: 'schema-about-founder-profile',
      type: 'application/ld+json',
      children: JSON.stringify(founderProfileSchema.value),
    },
  ],
}))
</script>

<template>
  <div class="bg-[var(--yunda-petal)]">
    <AppHeader />
    <AboutHeroSection />
    <AboutTeamSection />
    <PhotoGallerySection />
    <AboutCareerSection />
    <AppFooter />
  </div>
</template>

<style scoped></style>

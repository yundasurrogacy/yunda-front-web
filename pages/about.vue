<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'
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
    text: teamBio('kaylaLuo').join(' '),
  },
  {
    title: t('about.team.emilyChen.name'),
    text: teamBio('emilyChen').join(' '),
  },
  {
    title: t('about.team.danielWhitaker.name'),
    text: teamBio('danielWhitaker').join(' '),
  },
])

const howToSchema = computed(() => buildHowToSchema({
  name: t('about.meta.title'),
  description: t('about.meta.description'),
  steps: [
    {
      title: t('about.hero.title'),
      text: heroParagraphs.value.join(' '),
    },
    ...teamMembers.value,
  ],
  baseUrl: siteUrl.value || undefined,
  url: '/about',
  locale: locale.value,
}))

const faqSchema = computed(() => buildFAQPageSchema({
  name: 'About Yunda FAQ',
  description: t('about.careers.description'),
  faqs: [
    {
      question: t('about.team.kaylaLuo.title'),
      answer: teamMembers.value[0]?.text || '',
    },
    {
      question: t('about.team.emilyChen.title'),
      answer: teamMembers.value[1]?.text || '',
    },
    {
      question: t('about.team.danielWhitaker.title'),
      answer: teamMembers.value[2]?.text || '',
    },
    {
      question: t('about.careers.title'),
      answer: t('about.careers.description'),
    },
    {
      question: t('about.photoGallery.title'),
      answer: t('about.photoGallery.description'),
    },
  ],
  baseUrl: siteUrl.value || undefined,
  url: '/about',
  locale: locale.value,
}))

useHead(() => ({
  script: [
    {
      key: 'schema-about-howto',
      type: 'application/ld+json',
      children: JSON.stringify(howToSchema.value),
    },
    {
      key: 'schema-about-faq',
      type: 'application/ld+json',
      children: JSON.stringify(faqSchema.value),
    },
  ],
}))
</script>

<template>
  <div>
    <AppHeader />
    <AboutHeroSection />
    <AboutTeamSection />
    <PhotoGallerySection />
    <AboutCareerSection />
    <AppFooter />
  </div>
</template>

<style scoped></style>

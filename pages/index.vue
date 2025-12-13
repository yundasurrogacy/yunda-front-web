<script setup>
import { computed } from 'vue'
import { buildHowToSchema, buildServiceSchema } from '~/utils/schema'
import AppFooter from '../components/base/AppFooter.vue'
import AppHeader from '../components/base/AppHeader.vue'
import AssociationSection from '../components/home/AssociationSection.vue'
import CommitmentSection from '../components/home/CommitmentSection.vue'
import CostSection from '../components/home/CostSection.vue'
import GlobalSupportSection from '../components/home/GlobalSupportSection.vue'
import HeroSection from '../components/home/HeroSection.vue'
import IntroVideoSection from '../components/home/IntroVideoSection.vue'
import JourneySection from '../components/home/JourneySection.vue'
// import LegalExpertiseSection from '../components/home/LegalExpertiseSection.vue'
import StatsSection from '../components/home/StatsSection.vue'
import SurrogateCareSection from '../components/home/SurrogateCareSection.vue'
import TestimonialsSection from '../components/home/TestimonialsSection.vue'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const journeySteps = computed(() => [
  {
    title: t('home.journeySection.step1.title'),
    text: t('home.journeySection.step1.description'),
  },
  {
    title: t('home.journeySection.step2.title'),
    text: t('home.journeySection.step2.description'),
  },
  {
    title: t('home.journeySection.step3.title'),
    text: t('home.journeySection.step3.description'),
  },
  {
    title: t('home.journeySection.step4.title'),
    text: t('home.journeySection.step4.description'),
  },
])

const serviceSchema = computed(() => buildServiceSchema({
  name: t('home.meta.title'),
  description: t('home.meta.description'),
  serviceType: 'Surrogacy Agency Services',
  providerName: 'Yunda Surrogacy',
  areaServed: ['United States', 'China'],
  audience: ['Intended Parents', 'Surrogates'],
  baseUrl: siteUrl.value || undefined,
  url: '/',
  locale: locale.value,
  offers: [
    {
      name: t('home.globalSupportSection.title'),
      description: t('home.globalSupportSection.description'),
      url: '/be-parents',
    },
    {
      name: t('home.costSection.title2'),
      description: t('home.costSection.description1'),
      url: '/surrogacy-price',
    },
    {
      name: t('home.surrogateCareSection.title'),
      description: t('home.surrogateCareSection.item1'),
      url: '/be-surrogate',
    },
  ],
}))

const howToSchema = computed(() => buildHowToSchema({
  name: `${t('home.journeySection.title1')} ${t('home.journeySection.title2')}`,
  description: t('home.journeySection.description'),
  steps: journeySteps.value,
  baseUrl: siteUrl.value || undefined,
  url: '/',
  locale: locale.value,
}))

// SEO 配置
useHead({
  title: t('home.meta.title'),
  meta: [
    {
      name: 'description',
      content: t('home.meta.description'),
    },
    {
      property: 'og:title',
      content: t('home.meta.title'),
    },
    {
      property: 'og:description',
      content: t('home.meta.description'),
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'keywords',
      content: t('home.meta.keywords'),
    },
  ],
})

useHead(() => {
  const scripts = []
  if (serviceSchema.value) {
    scripts.push({
      key: 'schema-home-service',
      type: 'application/ld+json',
      children: JSON.stringify(serviceSchema.value),
    })
  }
  if (howToSchema.value) {
    scripts.push({
      key: 'schema-home-howto',
      type: 'application/ld+json',
      children: JSON.stringify(howToSchema.value),
    })
  }
  return scripts.length ? { script: scripts } : {}
})
</script>

<template>
  <div>
    <AppHeader />
    <HeroSection />
    <StatsSection />
    <GlobalSupportSection />
    <IntroVideoSection />
    <!-- <LegalExpertiseSection /> -->
    <SurrogateCareSection />
    <CommitmentSection />
    <!-- <VideoPlayer
      :video-src="'/videos/video1.mp4'"
      :background-color="'#A9A67D'"
      :controls="true"
      :autoplay="false"
     /> -->
    <JourneySection />
    <AssociationSection />
    <TestimonialsSection />
    <CostSection />
    <AppFooter />
  </div>
</template>

<style scoped>
</style>

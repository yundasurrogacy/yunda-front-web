<script setup>
import { computed } from 'vue'
import { buildHowToSchema, buildServiceSchema } from '~/utils/schema'
import AppFooter from '../components/base/AppFooter.vue'
import AppHeader from '../components/base/AppHeader.vue'
import BlogNewsSection from '../components/home/BlogNewsSection.vue'
import CommitmentSection from '../components/home/CommitmentSection.vue'
import GoogleReviewsSection from '../components/home/GoogleReviewsSection.vue'
import HeroSection from '../components/home/HeroSection.vue'
import OurServicesSection from '../components/home/OurServicesSection.vue'
import StatsSection from '../components/home/StatsSection.vue'
import SurrogateGallerySection from '../components/home/SurrogateGallerySection.vue'
import WhatSetsUsApartSection from '../components/home/WhatSetsUsApartSection.vue'

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
      name: t('home.ourServicesSection.title'),
      description: t('home.ourServicesSection.description'),
      url: '/be-parents',
    },
    {
      name: t('home.costSection.title2'),
      description: t('home.costSection.description2'),
      url: '/surrogacy-cost',
    },
    {
      name: t('home.parentsSurrogatesSection.surrogateSubtitle'),
      description: t('home.parentsSurrogatesSection.surrogateIntro'),
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

const homeSurrogateSlides = [
  { src: '/images/be-surrogate/gallery-1.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-2.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-4.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-6.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-9.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-10.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-3.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-5.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-7.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-8.jpg', alt: 'Yunda surrogate' },
]

// SEO 配置
useHead(() => ({
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
}))

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
  <div class="bg-[var(--yunda-petal)]">
    <AppHeader />
    <HeroSection />
    <StatsSection />
    <WhatSetsUsApartSection />
    <OurServicesSection />
    <CommitmentSection />
    <section class="bg-[var(--yunda-petal)] px-4 py-[60px] md:px-20">
      <div class="mx-auto max-w-[1400px]">
        <div class="grid gap-8 py-2 md:min-h-[500px] md:grid-cols-10 md:items-center md:gap-10">
          <div class="text-[var(--yunda-bark)] md:col-span-4">
            <h2 class="font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[42px]">
              Yunda Surrogacy - Building families. Creating futures.
            </h2>
            <p class="mt-8 font-sans text-base leading-[1.75] md:text-[17px]" style="font-family: var(--font-text)">
              At Yunda Surrogacy, we believe that every journey to parenthood deserves care, professionalism, and respect.
            </p>
            <p class="mt-2 font-sans text-base leading-[1.75] md:text-[17px]" style="font-family: var(--font-text)">
              Yunda Surrogacy is more than a bridge between families - we are a partner built on integrity, compassion, and commitment to creating life with love.
            </p>
          </div>
          <div class="relative overflow-hidden rounded-[20px] shadow-[0_12px_34px_rgba(39,31,24,0.16)] aspect-video md:col-span-6 md:h-[500px] md:aspect-auto">
            <iframe
              class="absolute left-1/2 top-1/2 h-full w-full max-w-none -translate-x-1/2 -translate-y-1/2 border-0 md:w-[108%]"
              src="https://www.youtube.com/embed/SMSpodH686I?rel=0&modestbranding=1"
              title="Yunda Surrogacy Introduction"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            />
          </div>
        </div>
      </div>
    </section>
    <SurrogateGallerySection
      :slides="homeSurrogateSlides"
    />
    <GoogleReviewsSection />
    <BlogNewsSection />
    <AppFooter />
  </div>
</template>

<style scoped>
</style>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ConfidenceSection from '@/components/base/SUConfidenceSection.vue'
import HeroSection from '@/components/base/SUHeroSection.vue'
import IntroVideoSection from '@/components/surrogacy/IntroVideoSection.vue'
import JourneyStepsTimeline from '@/components/surrogacy/journey/StepsTimeline.vue'
import JourneyTestimonialsSection from '@/components/surrogacy/journey/TestimonialsSection.vue'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const stepsKeys = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6', 'step7', 'step8'] as const

const journeySteps = computed(() => stepsKeys.map(key => ({
  title: t(`surrogacyJourney.stepsTimeline.${key}.title`),
  text: t(`surrogacyJourney.stepsTimeline.${key}.subtitle`),
})))

const testimonialsFaq = computed(() => [
  'testimonial1',
  'testimonial2',
  'testimonial3',
  'testimonial4',
].map(key => ({
  question: t(`surrogacyJourney.testimonials.${key}.name`),
  answer: t(`surrogacyJourney.testimonials.${key}.quote`),
})))

const howToSchema = computed(() => buildHowToSchema({
  name: t('surrogacyJourney.heroSection.title'),
  description: t('surrogacyJourney.heroSection.description'),
  steps: journeySteps.value,
  baseUrl: siteUrl.value || undefined,
  url: '/surrogacy/journey',
  locale: locale.value,
}))

const faqSchema = computed(() => buildFAQPageSchema({
  name: 'Surrogacy Journey FAQ',
  description: t('surrogacyJourney.stepsTimeline.title'),
  faqs: testimonialsFaq.value,
  baseUrl: siteUrl.value || undefined,
  url: '/surrogacy/journey',
  locale: locale.value,
}))

useHead(() => ({
  script: [
    {
      key: 'schema-surrogacy-journey-howto',
      type: 'application/ld+json',
      children: JSON.stringify(howToSchema.value),
    },
    {
      key: 'schema-surrogacy-journey-faq',
      type: 'application/ld+json',
      children: JSON.stringify(faqSchema.value),
    },
  ],
}))
</script>

<template>
  <div>
    <AppHeader />
    <HeroSection
      :title="$t('surrogacyJourney.heroSection.title')"
      :description="$t('surrogacyJourney.heroSection.description')"
      :button-text="$t('surrogacyJourney.heroSection.button')"
    />
    <IntroVideoSection />
    <!-- <VideoPlayer
      :video-src="'/videos/video1.mp4'"
      :background-color="'#FAF7F2'"
      :controls="true"
      :autoplay="false"
     /> -->
    <JourneyStepsTimeline />
    <JourneyTestimonialsSection />
    <ConfidenceSection
      :title="$t('surrogacyJourney.confidenceSection.title')"
      :description="$t('surrogacyJourney.confidenceSection.description')"
      :button-text="$t('surrogacyJourney.confidenceSection.button')"
    />
    <AppFooter />
  </div>
</template>

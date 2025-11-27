<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ConfidenceSection from '@/components/base/ConfidenceSection.vue'
import HeroSection from '@/components/base/HeroSection.vue'
import SingleFAQSection from '@/components/parents/single/FAQSection.vue'
import SingleOfferSection from '@/components/parents/single/OfferSection.vue'
import SingleTestimonialSection from '@/components/parents/single/TestimonialSection.vue'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const offerKeys = ['inclusive', 'matching', 'legal', 'global', 'multilingual', 'personalized'] as const

const offerItems = computed(() => offerKeys.map(key => ({
  title: t(`parentsSingle.offerSection.items.${key}.title`),
  text: t(`parentsSingle.offerSection.items.${key}.description`),
})))

const faqKeys = ['sameSexLegal', 'singleParent', 'coupleInChina', 'bringBabyBack', 'bothNames'] as const

const faqItems = computed(() => faqKeys.map(key => ({
  question: t(`parentsSingle.faqSection.items.${key}.question`),
  answer: t(`parentsSingle.faqSection.items.${key}.answer`),
})))

const howToSchema = computed(() => buildHowToSchema({
  name: t('parentsSingle.heroSection.title'),
  description: t('parentsSingle.heroSection.description'),
  steps: offerItems.value,
  baseUrl: siteUrl.value || undefined,
  url: '/parents/single-parents-lgbtq',
  locale: locale.value,
}))

const faqSchema = computed(() => buildFAQPageSchema({
  name: 'LGBTQ+ & Single Parent Surrogacy FAQ',
  description: t('parentsSingle.testimonialSection.quote'),
  faqs: faqItems.value,
  baseUrl: siteUrl.value || undefined,
  url: '/parents/single-parents-lgbtq',
  locale: locale.value,
}))

useHead(() => ({
  script: [
    {
      key: 'schema-parents-single-howto',
      type: 'application/ld+json',
      children: JSON.stringify(howToSchema.value),
    },
    {
      key: 'schema-parents-single-faq',
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
      :title="$t('parentsSingle.heroSection.title')"
      :description="$t('parentsSingle.heroSection.description')"
      :button-text="$t('parentsSingle.heroSection.button')"
    />
    <SingleTestimonialSection />
    <SingleOfferSection />
    <SingleFAQSection />
    <ConfidenceSection
      :title="$t('parentsSingle.confidenceSection.title')"
      :description="$t('parentsSingle.confidenceSection.description')"
      :button-text="$t('parentsSingle.confidenceSection.button')"
    />
    <AppFooter />
  </div>
</template>

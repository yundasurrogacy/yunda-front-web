<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ConfidenceSection from '@/components/base/SUConfidenceSection.vue'
import HeroSection from '@/components/base/SUHeroSection.vue'
import EligibilityQualificationsSection from '@/components/surrogacy/eligibility/QualificationsSection.vue'
import IntroVideoSection from '@/components/surrogacy/IntroVideoSection.vue'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const qualificationItems = computed(() => [
  t('surrogacyEligibility.qualificationsSection.items.item1'),
  t('surrogacyEligibility.qualificationsSection.items.item2'),
  t('surrogacyEligibility.qualificationsSection.items.item3'),
  t('surrogacyEligibility.qualificationsSection.items.item4'),
  t('surrogacyEligibility.qualificationsSection.items.item5'),
  t('surrogacyEligibility.qualificationsSection.items.item6'),
].filter(Boolean))

const disqualifyingItems = computed(() => [
  t('surrogacyEligibility.disqualifyingFactors.items.item1'),
  t('surrogacyEligibility.disqualifyingFactors.items.item2'),
  t('surrogacyEligibility.disqualifyingFactors.items.item3'),
  t('surrogacyEligibility.disqualifyingFactors.items.item4'),
  t('surrogacyEligibility.disqualifyingFactors.items.item5'),
  t('surrogacyEligibility.disqualifyingFactors.items.item6'),
].filter(Boolean))

const howToSteps = computed(() => [
  {
    title: t('surrogacyEligibility.qualificationsSection.title'),
    text: `${t('surrogacyEligibility.qualificationsSection.introduction')} ${qualificationItems.value.join(' ')}`,
  },
  {
    title: t('surrogacyEligibility.disqualifyingFactors.title'),
    text: `${t('surrogacyEligibility.disqualifyingFactors.introduction')} ${disqualifyingItems.value.join(' ')}`,
  },
  {
    title: t('surrogacyEligibility.gentleNote.title'),
    text: t('surrogacyEligibility.gentleNote.description'),
  },
])

const faqItems = computed(() => [
  {
    question: t('surrogacyEligibility.qualificationsSection.title'),
    answer: qualificationItems.value.join(' '),
  },
  {
    question: t('surrogacyEligibility.disqualifyingFactors.title'),
    answer: disqualifyingItems.value.join(' '),
  },
  {
    question: t('surrogacyEligibility.gentleNote.title'),
    answer: t('surrogacyEligibility.gentleNote.description'),
  },
])

const howToSchema = computed(() => buildHowToSchema({
  name: t('surrogacyEligibility.heroSection.title'),
  description: t('surrogacyEligibility.heroSection.description'),
  steps: howToSteps.value,
  baseUrl: siteUrl.value || undefined,
  url: '/surrogacy/eligibility',
  locale: locale.value,
}))

const faqSchema = computed(() => buildFAQPageSchema({
  name: 'Surrogate Eligibility FAQ',
  description: t('surrogacyEligibility.qualificationsSection.introduction'),
  faqs: faqItems.value,
  baseUrl: siteUrl.value || undefined,
  url: '/surrogacy/eligibility',
  locale: locale.value,
}))

useHead(() => ({
  script: [
    {
      key: 'schema-surrogacy-eligibility-howto',
      type: 'application/ld+json',
      children: JSON.stringify(howToSchema.value),
    },
    {
      key: 'schema-surrogacy-eligibility-faq',
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
      :title="$t('surrogacyEligibility.heroSection.title')"
      :description="$t('surrogacyEligibility.heroSection.description')"
      :button-text="$t('surrogacyEligibility.heroSection.button')"
    />
    <IntroVideoSection />
    <EligibilityQualificationsSection />
    <ConfidenceSection
      :title="$t('surrogacyEligibility.confidenceSection.title')"
      :description="$t('surrogacyEligibility.confidenceSection.description')"
      :button-text="$t('surrogacyEligibility.confidenceSection.button')"
    />
    <AppFooter />
  </div>
</template>

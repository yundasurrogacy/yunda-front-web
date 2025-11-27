<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ConfidenceSection from '@/components/base/SUConfidenceSection.vue'
import HeroSection from '@/components/base/SUHeroSection.vue'
import IntroVideoSection from '@/components/surrogacy/IntroVideoSection.vue'
import ScreeningProcessSection from '@/components/surrogacy/screening/ProcessSection.vue'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const includesList = computed(() => [
  t('surrogacyScreening.processSection.includesList.item1'),
  t('surrogacyScreening.processSection.includesList.item2'),
  t('surrogacyScreening.processSection.includesList.item3'),
  t('surrogacyScreening.processSection.includesList.item4'),
  t('surrogacyScreening.processSection.includesList.item5'),
  t('surrogacyScreening.processSection.includesList.item6'),
  t('surrogacyScreening.processSection.includesList.item7'),
  t('surrogacyScreening.processSection.includesList.item8'),
].filter(Boolean))

const candidateList = computed(() => [
  t('surrogacyScreening.processSection.candidateList.item1'),
  t('surrogacyScreening.processSection.candidateList.item2'),
  t('surrogacyScreening.processSection.candidateList.item3'),
  t('surrogacyScreening.processSection.candidateList.item4'),
  t('surrogacyScreening.processSection.candidateList.item5'),
  t('surrogacyScreening.processSection.candidateList.item6'),
  t('surrogacyScreening.processSection.candidateList.item7'),
  t('surrogacyScreening.processSection.candidateList.item8'),
  t('surrogacyScreening.processSection.candidateList.item9'),
  t('surrogacyScreening.processSection.candidateList.item10'),
].filter(Boolean))

const howToSteps = computed(() => includesList.value.map((item, index) => ({
  title: `${t('surrogacyScreening.processSection.includesTitle')} - ${index + 1}`,
  text: item,
})))

const faqItems = computed(() => [
  {
    question: t('surrogacyScreening.processSection.includesTitle'),
    answer: `${includesList.value.join(' ')}`,
  },
  {
    question: t('surrogacyScreening.processSection.candidateTitle'),
    answer: `${t('surrogacyScreening.processSection.candidateIntro')} ${candidateList.value.join(' ')}`,
  },
])

const howToSchema = computed(() => buildHowToSchema({
  name: t('surrogacyScreening.heroSection.title'),
  description: t('surrogacyScreening.heroSection.description'),
  steps: howToSteps.value,
  baseUrl: siteUrl.value || undefined,
  url: '/surrogacy/screening',
  locale: locale.value,
}))

const faqSchema = computed(() => buildFAQPageSchema({
  name: 'Surrogate Screening FAQ',
  description: t('surrogacyScreening.processSection.includesNote'),
  faqs: faqItems.value,
  baseUrl: siteUrl.value || undefined,
  url: '/surrogacy/screening',
  locale: locale.value,
}))

useHead(() => ({
  script: [
    {
      key: 'schema-surrogacy-screening-howto',
      type: 'application/ld+json',
      children: JSON.stringify(howToSchema.value),
    },
    {
      key: 'schema-surrogacy-screening-faq',
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
      :title="$t('surrogacyScreening.heroSection.title')"
      :description="$t('surrogacyScreening.heroSection.description')"
      :button-text="$t('surrogacyScreening.heroSection.button')"
    />
    <IntroVideoSection />
    <ScreeningProcessSection />
    <ConfidenceSection
      :title="$t('surrogacyScreening.confidenceSection.title')"
      :description="$t('surrogacyScreening.confidenceSection.description')"
      :button-text="$t('surrogacyScreening.confidenceSection.button')"
    />
    <AppFooter />
  </div>
</template>

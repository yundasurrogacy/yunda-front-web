<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ConfidenceSection from '@/components/base/ConfidenceSection.vue'
import HeroSection from '@/components/base/HeroSection.vue'
import FrozenEggs from '@/components/parents/egg/FrozenEggs.vue'
import StepsTimeline from '@/components/parents/egg/StepsTimeline.vue'
import UsProcess from '@/components/parents/egg/UsProcess.vue'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const eggSteps = computed(() => ['step1', 'step2', 'step3'].map((step) => {
  const subtitles = []
  let index = 1
  while (true) {
    const text = t(`eggDonation.stepsTimeline.${step}.subtitle${index}`)
    if (!text || text.startsWith('eggDonation.stepsTimeline'))
      break
    subtitles.push(text)
    index++
  }
  return {
    title: t(`eggDonation.stepsTimeline.${step}.title`),
    text: subtitles.join(' '),
  }
}))

const frozenVsFreshFaqs = computed(() => [
  {
    question: t('eggDonation.frozenEggsSection.title'),
    answer: t('eggDonation.frozenEggsSection.description'),
  },
  {
    question: t('eggDonation.frozenEggsSection.freshEggs'),
    answer: [
      t('eggDonation.frozenEggsSection.freshEggsDetails.timeline'),
      t('eggDonation.frozenEggsSection.freshEggsDetails.successRate'),
      t('eggDonation.frozenEggsSection.freshEggsDetails.embryoYield'),
      t('eggDonation.frozenEggsSection.freshEggsDetails.cost'),
      t('eggDonation.frozenEggsSection.freshEggsDetails.donorAccess'),
    ].join(' '),
  },
  {
    question: t('eggDonation.frozenEggsSection.frozenEggs'),
    answer: [
      t('eggDonation.frozenEggsSection.frozenEggsDetails.timeline'),
      t('eggDonation.frozenEggsSection.frozenEggsDetails.successRate'),
      t('eggDonation.frozenEggsSection.frozenEggsDetails.embryoYield'),
      t('eggDonation.frozenEggsSection.frozenEggsDetails.cost'),
      t('eggDonation.frozenEggsSection.frozenEggsDetails.donorAccess'),
    ].join(' '),
  },
])

const processFaqs = computed(() => [
  {
    question: t('eggDonation.usProcessSection.title'),
    answer: [
      `${t('eggDonation.usProcessSection.usingDonor')}: ${t('eggDonation.usProcessSection.usingDonorDesc')}`,
      `${t('eggDonation.usProcessSection.providingSperm')}: ${t('eggDonation.usProcessSection.providingSpermDesc')}`,
      `${t('eggDonation.usProcessSection.providingEggs')}: ${t('eggDonation.usProcessSection.providingEggsDesc')}`,
      t('eggDonation.usProcessSection.conclusion'),
    ].join(' '),
  },
])

const howToSchema = computed(() => buildHowToSchema({
  name: t('eggDonation.heroSection.title'),
  description: `${t('eggDonation.heroSection.description1')} ${t('eggDonation.heroSection.description2')}`,
  steps: eggSteps.value,
  baseUrl: siteUrl.value || undefined,
  url: '/parents/egg-donation',
  locale: locale.value,
}))

const faqSchema = computed(() => buildFAQPageSchema({
  name: 'Egg Donation FAQ',
  description: t('eggDonation.frozenEggsSection.description'),
  faqs: [...frozenVsFreshFaqs.value, ...processFaqs.value],
  baseUrl: siteUrl.value || undefined,
  url: '/parents/egg-donation',
  locale: locale.value,
}))

useHead(() => ({
  script: [
    {
      key: 'schema-egg-donation-howto',
      type: 'application/ld+json',
      children: JSON.stringify(howToSchema.value),
    },
    {
      key: 'schema-egg-donation-faq',
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
      :title="$t('eggDonation.heroSection.title')"
      :description="`${$t('eggDonation.heroSection.description1')} ${$t('eggDonation.heroSection.description2')}`"
      :button-text="$t('eggDonation.heroSection.button')"
    />
    <StepsTimeline />
    <UsProcess />
    <FrozenEggs />
    <ConfidenceSection
      :title="$t('eggDonation.confidenceSection.title')"
      :description="$t('eggDonation.confidenceSection.description')"
      :button-text="$t('eggDonation.confidenceSection.button')"
    />
    <AppFooter />
  </div>
</template>

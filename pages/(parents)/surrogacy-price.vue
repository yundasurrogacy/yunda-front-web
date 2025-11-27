<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ConfidenceSection from '@/components/base/ConfidenceSection.vue'
import HeroSection from '@/components/base/HeroSection.vue'
import PriceAdditionalTerms from '@/components/parents/price/AdditionalTerms.vue'
import PriceCostOverview from '@/components/parents/price/CostOverview.vue'
import PriceDetailedBreakdown from '@/components/parents/price/DetailedBreakdown.vue'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const priceStepsKeys = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6'] as const

const priceSteps = computed(() => priceStepsKeys.map(key => ({
  title: t(`parentsPrice.stepsTimeline.${key}.title`),
  text: t(`parentsPrice.stepsTimeline.${key}.subtitle`),
})))

const costItems = computed(() => {
  const categories = ['agencyFees', 'screeningAdmin', 'surrogateCompensation', 'legalFees', 'insuranceSupport', 'additionalCosts'] as const
  return categories.map((category) => {
    const basePath = `parentsPrice.detailedBreakdown.${category}`
    const descriptions = [
      t(`${basePath}.description1`),
      t(`${basePath}.description2`),
      t(`${basePath}.description3`),
      t(`${basePath}.description4`),
      t(`${basePath}.description5`),
      t(`${basePath}.description6`),
    ].filter(Boolean)
    return {
      question: t(`${basePath}.title`),
      answer: `${t(`${basePath}.amount`)} ${descriptions.join(' ')}`,
    }
  })
})

const additionalFaqs = computed(() => [
  {
    question: t('parentsPrice.additionalTerms.surrogateBenefits.title'),
    answer: Object.values({
      bedrest: t('parentsPrice.additionalTerms.surrogateBenefits.bedrest'),
      twinPregnancy: t('parentsPrice.additionalTerms.surrogateBenefits.twinPregnancy'),
      csection: t('parentsPrice.additionalTerms.surrogateBenefits.csection'),
      communicableDisease: t('parentsPrice.additionalTerms.surrogateBenefits.communicableDisease'),
      childcare: t('parentsPrice.additionalTerms.surrogateBenefits.childcare'),
      housekeeping: t('parentsPrice.additionalTerms.surrogateBenefits.housekeeping'),
      lostWages: t('parentsPrice.additionalTerms.surrogateBenefits.lostWages'),
      breastMilk: t('parentsPrice.additionalTerms.surrogateBenefits.breastMilk'),
      uterineLoss: t('parentsPrice.additionalTerms.surrogateBenefits.uterineLoss'),
    }).join(' '),
  },
  {
    question: t('parentsPrice.additionalTerms.notIncluded.title'),
    answer: [
      t('parentsPrice.additionalTerms.notIncluded.ivfCosts'),
      t('parentsPrice.additionalTerms.notIncluded.newbornExpenses'),
      t('parentsPrice.additionalTerms.notIncluded.clientTravel'),
    ].join(' '),
  },
  {
    question: t('parentsPrice.additionalTerms.insuranceNotes.title'),
    answer: [
      t('parentsPrice.additionalTerms.insuranceNotes.description1'),
      t('parentsPrice.additionalTerms.insuranceNotes.description2'),
      t('parentsPrice.additionalTerms.insuranceNotes.description3'),
      t('parentsPrice.additionalTerms.insuranceNotes.description4'),
    ].join(' '),
  },
])

const howToSchema = computed(() => buildHowToSchema({
  name: t('parentsPrice.heroSection.title'),
  description: t('parentsPrice.heroSection.description'),
  steps: priceSteps.value,
  baseUrl: siteUrl.value || undefined,
  url: '/parents/surrogacy-price',
  locale: locale.value,
}))

const faqSchema = computed(() => buildFAQPageSchema({
  name: 'Surrogacy Cost FAQ',
  description: t('parentsPrice.additionalTerms.description'),
  faqs: [...costItems.value, ...additionalFaqs.value],
  baseUrl: siteUrl.value || undefined,
  url: '/parents/surrogacy-price',
  locale: locale.value,
}))

useHead(() => ({
  script: [
    {
      key: 'schema-parents-price-howto',
      type: 'application/ld+json',
      children: JSON.stringify(howToSchema.value),
    },
    {
      key: 'schema-parents-price-faq',
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
      :title="$t('parentsPrice.heroSection.title')"
      :description="$t('parentsPrice.heroSection.description')"
      :button-text="$t('menu.becomeAParent')"
    />
    <PriceCostOverview />
    <PriceDetailedBreakdown />
    <PriceAdditionalTerms />
    <ConfidenceSection
      :title="$t('parentsPrice.confidenceSection.title')"
      :description="$t('parentsPrice.confidenceSection.description')"
      :button-text="$t('menu.becomeAParent')"
    />
    <AppFooter />
  </div>
</template>

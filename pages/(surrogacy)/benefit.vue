<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ConfidenceSection from '@/components/base/SUConfidenceSection.vue'
import HeroSection from '@/components/base/SUHeroSection.vue'
import BenefitCompensationSection from '@/components/surrogacy/benefit/CompensationSection.vue'
import BenefitFamilySupportSection from '@/components/surrogacy/benefit/FamilySupportSection.vue'
import BenefitPaymentScheduleSection from '@/components/surrogacy/benefit/PaymentScheduleSection.vue'
import BenefitProtectionSection from '@/components/surrogacy/benefit/ProtectionSection.vue'
import IntroVideoSection from '@/components/surrogacy/IntroVideoSection.vue'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const familySupportItems = computed(() => [
  t('surrogacyBenefit.familySupportSection.items.item1'),
  t('surrogacyBenefit.familySupportSection.items.item2'),
  t('surrogacyBenefit.familySupportSection.items.item3'),
  t('surrogacyBenefit.familySupportSection.items.item4'),
].filter(Boolean))

const compensationItems = computed(() => [
  t('surrogacyBenefit.compensationSection.items.item1'),
  t('surrogacyBenefit.compensationSection.items.item2'),
  t('surrogacyBenefit.compensationSection.items.item3'),
  t('surrogacyBenefit.compensationSection.items.item4'),
  t('surrogacyBenefit.compensationSection.items.item5'),
  t('surrogacyBenefit.compensationSection.items.item6'),
  t('surrogacyBenefit.compensationSection.items.item7'),
  t('surrogacyBenefit.compensationSection.items.item8'),
  t('surrogacyBenefit.compensationSection.items.item9'),
  t('surrogacyBenefit.compensationSection.items.item10'),
  t('surrogacyBenefit.compensationSection.items.item11'),
  t('surrogacyBenefit.compensationSection.items.item12'),
  t('surrogacyBenefit.compensationSection.items.item13'),
].filter(Boolean))

const paymentScheduleItems = computed(() => [
  t('surrogacyBenefit.paymentScheduleSection.items.item1'),
  t('surrogacyBenefit.paymentScheduleSection.items.item2'),
  t('surrogacyBenefit.paymentScheduleSection.items.item3'),
  t('surrogacyBenefit.paymentScheduleSection.items.item4'),
].filter(Boolean))

const protectionItems = computed(() => [
  t('surrogacyBenefit.protectionSection.items.item1'),
  t('surrogacyBenefit.protectionSection.items.item2'),
  t('surrogacyBenefit.protectionSection.items.item3'),
].filter(Boolean))

const howToSteps = computed(() => [
  {
    title: t('surrogacyBenefit.familySupportSection.title'),
    text: `${t('surrogacyBenefit.familySupportSection.description')} ${familySupportItems.value.join(' ')}`,
  },
  {
    title: t('surrogacyBenefit.compensationSection.title'),
    text: compensationItems.value.join(' '),
  },
  {
    title: t('surrogacyBenefit.paymentScheduleSection.title'),
    text: paymentScheduleItems.value.join(' '),
  },
  {
    title: t('surrogacyBenefit.protectionSection.title'),
    text: protectionItems.value.join(' '),
  },
])

const faqItems = computed(() => [
  {
    question: t('surrogacyBenefit.familySupportSection.title'),
    answer: familySupportItems.value.join(' '),
  },
  {
    question: t('surrogacyBenefit.compensationSection.title'),
    answer: compensationItems.value.join(' '),
  },
  {
    question: t('surrogacyBenefit.paymentScheduleSection.title'),
    answer: paymentScheduleItems.value.join(' '),
  },
  {
    question: t('surrogacyBenefit.protectionSection.title'),
    answer: protectionItems.value.join(' '),
  },
])

const howToSchema = computed(() => buildHowToSchema({
  name: t('surrogacyBenefit.heroSection.title'),
  description: t('surrogacyBenefit.heroSection.description'),
  steps: howToSteps.value,
  baseUrl: siteUrl.value || undefined,
  url: '/surrogacy/benefit',
  locale: locale.value,
}))

const faqSchema = computed(() => buildFAQPageSchema({
  name: 'Surrogate Benefits FAQ',
  description: t('surrogacyBenefit.conclusionText'),
  faqs: faqItems.value,
  baseUrl: siteUrl.value || undefined,
  url: '/surrogacy/benefit',
  locale: locale.value,
}))

useHead(() => ({
  script: [
    {
      key: 'schema-surrogacy-benefit-howto',
      type: 'application/ld+json',
      children: JSON.stringify(howToSchema.value),
    },
    {
      key: 'schema-surrogacy-benefit-faq',
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
      :title="$t('surrogacyBenefit.heroSection.title')"
      :description="$t('surrogacyBenefit.heroSection.description')"
      :button-text="$t('surrogacyBenefit.heroSection.button')"
    />
    <IntroVideoSection />
    <BenefitFamilySupportSection />
    <BenefitCompensationSection />
    <BenefitPaymentScheduleSection />
    <BenefitProtectionSection />
    <ConfidenceSection
      :title="$t('surrogacyBenefit.confidenceSection.title')"
      :description="$t('surrogacyBenefit.confidenceSection.description')"
      :button-text="$t('surrogacyBenefit.confidenceSection.button')"
    />
    <AppFooter />
  </div>
</template>

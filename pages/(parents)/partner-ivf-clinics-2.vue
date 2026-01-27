<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ConfidenceSection from '@/components/base/ConfidenceSection.vue'
import IvfClinicsSection from '@/components/parents/ivf/ClinicsSection.vue'
import IvfFAQSection from '@/components/parents/ivf/FAQSection.vue'
import IvfMedicalServicesSection from '@/components/parents/ivf/MedicalServicesSection.vue'
import IvfSupportSection from '@/components/parents/ivf/SupportSection.vue'
import HeroSection from '~/components/base/HeroSection.vue'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const supportItems = computed(() => {
  const keys = ['recommendClinics', 'coordinateConsultations', 'handleShipping', 'prepareDocuments', 'workWithChosen'] as const
  return keys.map(key => ({
    title: t(`parentsIvf.supportSection.items.${key}.title`),
    description: t(`parentsIvf.supportSection.items.${key}.description`),
  }))
})

const medicalServices = computed(() => {
  const keys = ['eggDonation', 'embryoCreation', 'embryoShipping', 'embryoTransfer', 'geneticTesting', 'embryoThawing'] as const
  return keys.map(key => ({
    question: t(`parentsIvf.medicalServices.items.${key}.title`),
    answer: t(`parentsIvf.medicalServices.items.${key}.description`),
  }))
})

const faqItems = computed(() => {
  const entries = ['chooseClinic', 'embryoShipping', 'frozenEmbryos', 'eggDonationCreation', 'medicalCosts'] as const
  return entries.map(key => ({
    question: t(`parentsIvf.faqSection.items.${key}.question`),
    answer: t(`parentsIvf.faqSection.items.${key}.answer`),
  }))
})

const howToSchema = computed(() => buildHowToSchema({
  name: t('parentsIvf.heroSection.title'),
  description: t('parentsIvf.heroSection.description'),
  steps: supportItems.value.map(item => ({
    title: item.title,
    text: item.description,
  })),
  baseUrl: siteUrl.value || undefined,
  url: '/parents/partner-ivf-clinics',
  locale: locale.value,
}))

const faqSchema = computed(() => buildFAQPageSchema({
  name: 'IVF Clinic Support FAQ',
  description: t('parentsIvf.medicalServices.title'),
  faqs: [...medicalServices.value, ...faqItems.value],
  baseUrl: siteUrl.value || undefined,
  url: '/parents/partner-ivf-clinics',
  locale: locale.value,
}))

useHead(() => ({
  script: [
    {
      key: 'schema-parents-ivf-howto',
      type: 'application/ld+json',
      children: JSON.stringify(howToSchema.value),
    },
    {
      key: 'schema-parents-ivf-faq',
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
      :title="$t('parentsIvf.heroSection.title')"
      :description="$t('parentsIvf.heroSection.description')"
      :button-text="$t('parentsIvf.heroSection.button')"
    />
    <IvfSupportSection />
    <IvfMedicalServicesSection />
    <IvfClinicsSection />
    <IvfFAQSection />
    <ConfidenceSection
      :title="$t('parentsIvf.confidenceSection.title')"
      :description="$t('parentsIvf.confidenceSection.description')"
      :button-text="$t('parentsIvf.confidenceSection.button')"
    />
    <AppFooter />
  </div>
</template>

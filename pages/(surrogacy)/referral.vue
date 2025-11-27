<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ConfidenceSection from '@/components/base/USConfidenceSection.vue'
import IntroVideoSection from '@/components/surrogacy/IntroVideoSection.vue'
import ReferralCompensationSection from '@/components/surrogacy/referral/CompensationSection.vue'
import ReferralEarningsSection from '@/components/surrogacy/referral/EarningsSection.vue'
import ReferralEligibilitySection from '@/components/surrogacy/referral/EligibilitySection.vue'
import ReferralWhyMattersSection from '@/components/surrogacy/referral/WhyMattersSection.vue'
import HeroSection from '~/components/base/MailHeroSection.vue'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const referralMilestones = computed(() => [
  t('surrogacyReferral.earningsSection.milestones.accepted'),
  t('surrogacyReferral.earningsSection.milestones.screening'),
  t('surrogacyReferral.earningsSection.milestones.matching'),
  t('surrogacyReferral.earningsSection.milestones.transfer'),
  t('surrogacyReferral.earningsSection.milestones.pregnancy'),
].filter(Boolean))

const referralBonuses = computed(() => [
  t('surrogacyReferral.earningsSection.bonuses.accepted'),
  t('surrogacyReferral.earningsSection.bonuses.screening'),
  t('surrogacyReferral.earningsSection.bonuses.matching'),
  t('surrogacyReferral.earningsSection.bonuses.transfer'),
  t('surrogacyReferral.earningsSection.bonuses.pregnancy'),
])

const eligibilityRequirements = computed(() => Object.values({
  age: t('surrogacyReferral.eligibilitySection.requirements.age'),
  residence: t('surrogacyReferral.eligibilitySection.requirements.residence'),
  pregnancy: t('surrogacyReferral.eligibilitySection.requirements.pregnancy'),
  bmi: t('surrogacyReferral.eligibilitySection.requirements.bmi'),
  lifestyle: t('surrogacyReferral.eligibilitySection.requirements.lifestyle'),
  support: t('surrogacyReferral.eligibilitySection.requirements.support'),
  health: t('surrogacyReferral.eligibilitySection.requirements.health'),
}))

const friendBenefits = computed(() => Object.values({
  base: t('surrogacyReferral.compensationSection.benefits.base'),
  allowances: t('surrogacyReferral.compensationSection.benefits.allowances'),
  medication: t('surrogacyReferral.compensationSection.benefits.medication'),
  surgery: t('surrogacyReferral.compensationSection.benefits.surgery'),
  breastmilk: t('surrogacyReferral.compensationSection.benefits.breastmilk'),
  bedrest: t('surrogacyReferral.compensationSection.benefits.bedrest'),
  insurance: t('surrogacyReferral.compensationSection.benefits.insurance'),
  lifeInsurance: t('surrogacyReferral.compensationSection.benefits.lifeInsurance'),
  support: t('surrogacyReferral.compensationSection.benefits.support'),
  processing: t('surrogacyReferral.compensationSection.benefits.processing'),
}))

const howToSteps = computed(() => referralMilestones.value.map((milestone, index) => ({
  title: `${milestone}`,
  text: `${t('surrogacyReferral.earningsSection.tableHeaders.bonus')}: ${referralBonuses.value[index] ?? ''}`,
})))

const faqItems = computed(() => [
  {
    question: t('surrogacyReferral.whyMattersSection.title'),
    answer: t('surrogacyReferral.whyMattersSection.description'),
  },
  {
    question: t('surrogacyReferral.eligibilitySection.title'),
    answer: `${t('surrogacyReferral.eligibilitySection.intro')} ${eligibilityRequirements.value.join(' ')}`,
  },
  {
    question: t('surrogacyReferral.compensationSection.title'),
    answer: friendBenefits.value.join(' '),
  },
])

const howToSchema = computed(() => buildHowToSchema({
  name: t('surrogacyReferral.heroSection.title'),
  description: t('surrogacyReferral.heroSection.description'),
  steps: howToSteps.value,
  baseUrl: siteUrl.value || undefined,
  url: '/surrogacy/referral',
  locale: locale.value,
}))

const faqSchema = computed(() => buildFAQPageSchema({
  name: 'Surrogate Referral FAQ',
  description: t('surrogacyReferral.earningsSection.terms1'),
  faqs: faqItems.value,
  baseUrl: siteUrl.value || undefined,
  url: '/surrogacy/referral',
  locale: locale.value,
}))

useHead(() => ({
  script: [
    {
      key: 'schema-surrogacy-referral-howto',
      type: 'application/ld+json',
      children: JSON.stringify(howToSchema.value),
    },
    {
      key: 'schema-surrogacy-referral-faq',
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
      :title="$t('surrogacyReferral.heroSection.title')"
      :description="$t('surrogacyReferral.heroSection.description')"
      :button-text="$t('surrogacyReferral.heroSection.button')"
    />
    <IntroVideoSection />
    <ReferralWhyMattersSection />
    <ReferralEarningsSection />
    <ReferralEligibilitySection />
    <ReferralCompensationSection />
    <ConfidenceSection
      :title="$t('surrogacyReferral.confidenceSection.title')"
      :description="$t('surrogacyReferral.confidenceSection.description')"
      :button-text="$t('surrogacyReferral.confidenceSection.button')"
    />
    <AppFooter />
  </div>
</template>

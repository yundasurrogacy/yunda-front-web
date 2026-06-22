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
import { buildCoreServicePageSchemas } from '~/utils/schema'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const pagePath = '/referral'

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

const schemaReferralItems = computed(() => referralMilestones.value.map((milestone, index) => ({
  position: index + 1,
  name: milestone,
  description: `${t('surrogacyReferral.earningsSection.tableHeaders.bonus')}: ${referralBonuses.value[index] ?? ''}`,
  url: pagePath,
})))

const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: t('surrogacyReferral.heroSection.title'),
  description: t('surrogacyReferral.heroSection.description'),
  about: 'Gestational carrier referral program',
  audience: 'Referral partners, friends or family of potential gestational carriers',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'For Surrogates', url: '/surrogates' },
    { name: 'Surrogate Referral', url: pagePath },
  ],
  itemList: {
    name: 'Referral Reward Milestones',
    description: t('surrogacyReferral.earningsSection.terms1'),
    items: schemaReferralItems.value,
  },
}))

useHead(() => ({
  title: t('surrogacyReferral.heroSection.title'),
  meta: [
    {
      name: 'description',
      content: t('surrogacyReferral.heroSection.description'),
    },
  ],
  script: [
    ...coreServicePageSchemas.value.map((schema, index) => ({
      key: `schema-referral-${index}`,
      type: 'application/ld+json',
      children: JSON.stringify(schema),
    })),
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

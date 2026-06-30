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
import SeoTrustNote from '~/components/base/SeoTrustNote.vue'
import { buildCoreServicePageSchemas } from '~/utils/schema'

const { t, locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const pagePath = '/referral'
const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en: string, zh: string) => (isZh.value ? zh : en)
const dateModified = '2026-06-30'
const reviewerId = computed(() => `${siteUrl.value || 'https://www.yundasurrogacy.com'}/about#kayla-luo`)

const referralAnswer = computed(() => tt(
  'Yunda\'s surrogate referral program is for people who know a woman who may be interested in becoming a gestational surrogate and wants a respectful, transparent review process. A referral is not treated as a guaranteed approval or guaranteed payment. Yunda first reviews whether the candidate may meet basic program expectations, then later steps can include medical records review, clinic clearance, psychological screening, legal review, insurance review, matching, transfer milestones, and pregnancy milestones. Referral rewards depend on the candidate reaching defined program stages and meeting the program terms. The best referral is someone who understands the journey, has a support system, and is willing to complete screening before any match moves forward.',
  '孕达代孕妈妈推荐计划适合认识潜在代孕候选人的朋友或家人，希望对方进入一个尊重、透明的审核流程。推荐不等于保证批准，也不等于保证付款。孕达会先评估候选人是否可能符合基础项目要求，后续可能包括病历审核、诊所清关、心理筛查、法律审核、保险审核、匹配、移植节点和孕期节点。推荐奖励取决于候选人是否达到明确项目阶段并符合计划条款。最适合推荐的人，是理解这段旅程、有支持系统，并愿意在任何匹配推进前完成筛查的人。',
))

const referralTrustCards = computed(() => [
  {
    title: tt('Candidate care comes first', '候选人关怀优先'),
    body: tt('The referral path should help a potential surrogate understand requirements, pay, screening, and support before she decides whether to continue.', '推荐流程应先帮助潜在代孕妈妈了解资格、补偿、筛查和支持，再决定是否继续。'),
  },
  {
    title: tt('Rewards are milestone-based', '奖励按节点计算'),
    body: tt('Bonus language is tied to defined review and journey stages, so referrers know why a payment may happen later rather than immediately.', '奖金与明确审核和旅程节点相关，因此推荐人能理解为什么奖励不会在提交后立即发生。'),
  },
  {
    title: tt('Screening protects everyone', '筛查保护所有人'),
    body: tt('A respectful referral still requires professional screening, legal review, insurance review, and candidate consent before a match can move forward.', '即使是友好推荐，也仍需专业筛查、法律审核、保险审核和候选人本人同意后才能推进匹配。'),
  },
])

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
  dateModified,
  reviewedBy: { '@id': reviewerId.value },
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
    <SeoTrustNote
      :updated="tt('Last updated: June 30, 2026', '最后更新：2026年6月30日')"
      :reviewed-by="tt('Reviewed by Kayla Luo, Vice President, North America', 'Kayla Luo（北美区副总裁）审阅')"
      :note="tt('This page explains the referral program for potential surrogate candidates. A referral does not guarantee candidate approval or a reward; eligibility, milestones, and payments depend on program review and professional screening.', '本页说明潜在代孕候选人的推荐计划。推荐不代表候选人一定获批或一定获得奖励；资格、节点和付款取决于项目审核与专业筛查。')"
      :sources="[
        { label: tt('Surrogate requirements', '代孕妈妈要求'), href: localePath('/surrogate-requirements') },
        { label: tt('Pay and benefits', '补偿与福利'), href: localePath('/benefit') },
        { label: tt('Screening guide', '筛查指南'), href: localePath('/screening') },
        { label: tt('Disclaimer', '免责声明'), href: localePath('/disclaimer') },
      ]"
    />
    <section class="referral-answer bg-[var(--yunda-petal)] px-5 py-14 lg:px-10 lg:py-18">
      <div class="mx-auto max-w-300">
        <div class="rounded-[22px] border border-[var(--yunda-bark)]/10 bg-white/82 p-6 shadow-[0_16px_40px_rgba(61,42,31,0.08)] lg:p-8">
          <p class="mb-3 text-xs text-[var(--yunda-maple)] font-extrabold uppercase tracking-[0.16em]">
            {{ tt('Direct answer', '直接答案') }}
          </p>
          <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-semibold leading-[1.15] lg:text-[42px]">
            {{ tt('What makes a strong surrogate referral?', '什么样的代孕妈妈推荐更适合推进？') }}
          </h2>
          <p class="mt-5 max-w-5xl text-base text-[var(--yunda-bark)]/82 leading-[1.8] lg:text-[18px]" style="font-family: var(--font-text)">
            {{ referralAnswer }}
          </p>
        </div>
        <div class="mt-5 grid gap-4 md:grid-cols-3">
          <article
            v-for="item in referralTrustCards"
            :key="item.title"
            class="rounded-[18px] border border-[var(--yunda-bark)]/10 bg-white/74 p-5 shadow-[0_10px_28px_rgba(61,42,31,0.05)]"
          >
            <h3 class="font-display text-[22px] text-[var(--yunda-bark)] font-semibold leading-snug">
              {{ item.title }}
            </h3>
            <p class="mt-3 text-sm text-[var(--yunda-bark)]/78 leading-[1.75]" style="font-family: var(--font-text)">
              {{ item.body }}
            </p>
          </article>
        </div>
      </div>
    </section>
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

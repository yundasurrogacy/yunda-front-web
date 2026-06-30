<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { buildBreadcrumbListSchema, buildProfilePageSchema, buildWebPageSchema } from '~/utils/schema'
import AboutCareerSection from '../components/about/CareerSection.vue'
import AboutHeroSection from '../components/about/HeroSection.vue'
import PhotoGallerySection from '../components/about/PhotoGallerySection.vue'
import AboutTeamSection from '../components/about/TeamSection.vue'
import AppFooter from '../components/base/AppFooter.vue'
import AppHeader from '../components/base/AppHeader.vue'
import SeoTrustNote from '../components/base/SeoTrustNote.vue'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const localePath = useLocalePath()
const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en, zh) => (isZh.value ? zh : en)
const dateModified = '2026-06-30'
const reviewerId = computed(() => `${siteUrl.value || 'https://www.yundasurrogacy.com'}/about#kayla-luo`)

const trustStandards = computed(() => [
  {
    title: tt('Whole-journey coordination', '全旅程协调'),
    body: tt('Yunda supports consultation, matching, clinic communication, screening coordination, legal timing, insurance review, escrow planning, pregnancy updates, and bilingual communication.', '孕达支持咨询、匹配、诊所沟通、筛查协调、法律时间线、保险审核、托管规划、孕期沟通和双语协作。'),
  },
  {
    title: tt('Professional boundaries', '专业边界清晰'),
    body: tt('The team explains process and coordination, while attorneys, physicians, clinics, insurance reviewers, and escrow professionals confirm their own decisions.', '团队负责解释流程和协调事项；律师、医生、诊所、保险审核方和托管专业人士分别确认各自专业决定。'),
  },
  {
    title: tt('Respect for both sides', '尊重双方'),
    body: tt('Content and consultations should protect both intended parents and surrogate candidates with clear expectations, privacy, consent, and transparent next steps.', '内容和咨询都应通过清晰预期、隐私、同意和透明下一步，保护准父母与代孕候选人双方。'),
  },
])

useHead({
  title: t('about.meta.title'),
  meta: [
    {
      name: 'description',
      content: t('about.meta.description'),
    },
  ],
})

const heroParagraphs = computed(() => [
  t('about.hero.paragraph1'),
  t('about.hero.paragraph2'),
  t('about.hero.paragraph3'),
  t('about.hero.highlight'),
].filter(Boolean))

function teamBio(nameKey) {
  const paragraphs = []
  let index = 1
  while (true) {
    const value = t(`about.team.${nameKey}.bio.paragraph${index}`)
    if (!value || value.startsWith(`about.team.${nameKey}.bio.paragraph`))
      break
    paragraphs.push(value)
    index++
  }
  return paragraphs
}

const teamMembers = computed(() => [
  {
    title: t('about.team.kaylaLuo.name'),
    jobTitle: t('about.team.kaylaLuo.title'),
    text: teamBio('kaylaLuo').join(' '),
  },
])

const aboutPageSchema = computed(() => buildWebPageSchema({
  baseUrl: siteUrl.value || undefined,
  url: '/about',
  name: t('about.meta.title'),
  description: t('about.meta.description'),
  about: heroParagraphs.value.join(' '),
  audience: locale.value === 'zh'
    ? ['准父母', '代孕妈妈', '国际家庭']
    : ['Intended parents', 'Surrogates', 'International families'],
  dateModified,
  reviewedBy: { '@id': reviewerId.value },
  locale: locale.value,
}))

const aboutBreadcrumbSchema = computed(() => buildBreadcrumbListSchema({
  baseUrl: siteUrl.value || undefined,
  locale: locale.value,
  items: [
    { name: locale.value === 'zh' ? '首页' : 'Home', url: '/' },
    { name: locale.value === 'zh' ? '关于我们' : 'About', url: '/about' },
  ],
}))

const founderSchema = computed(() => {
  const baseUrl = siteUrl.value || 'https://www.yundasurrogacy.com'
  const aboutPath = locale.value === 'zh' ? '/zh/about' : '/about'

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/about#kayla-luo`,
    'name': teamMembers.value[0]?.title,
    'jobTitle': teamMembers.value[0]?.jobTitle,
    'description': teamMembers.value[0]?.text,
    'url': `${baseUrl}${aboutPath}`,
    'worksFor': {
      '@id': `${baseUrl}/#organization`,
    },
  }
})

const founderProfileSchema = computed(() => buildProfilePageSchema({
  baseUrl: siteUrl.value || undefined,
  url: '/about',
  name: teamMembers.value[0]?.title
    ? `${teamMembers.value[0].title} Profile`
    : 'Kayla Luo Profile',
  description: teamMembers.value[0]?.text,
  person: founderSchema.value,
  locale: locale.value,
}))

useHead(() => ({
  script: [
    {
      key: 'schema-about-page',
      type: 'application/ld+json',
      children: JSON.stringify(aboutPageSchema.value),
    },
    {
      key: 'schema-about-breadcrumb',
      type: 'application/ld+json',
      children: JSON.stringify(aboutBreadcrumbSchema.value),
    },
    {
      key: 'schema-about-founder',
      type: 'application/ld+json',
      children: JSON.stringify(founderSchema.value),
    },
    {
      key: 'schema-about-founder-profile',
      type: 'application/ld+json',
      children: JSON.stringify(founderProfileSchema.value),
    },
  ],
}))
</script>

<template>
  <div class="bg-[var(--yunda-petal)]">
    <AppHeader />
    <AboutHeroSection />
    <SeoTrustNote
      :updated="tt('Last updated: June 30, 2026', '最后更新：2026年6月30日')"
      :reviewed-by="tt('Reviewed by Kayla Luo, Vice President, North America', 'Kayla Luo（北美区副总裁）审阅')"
      :note="tt('This page identifies the Yunda team and how the agency approaches high-stakes surrogacy decisions. Yunda provides coordination and education, not legal, medical, insurance, escrow, or IVF treatment advice.', '本页说明孕达团队以及机构如何处理高风险代孕决策。孕达提供协调与教育说明，不提供法律、医疗、保险、托管或 IVF 治疗建议。')"
      :sources="[
        { label: tt('Intended parent hub', '准父母指南'), href: localePath('/intended-parents') },
        { label: tt('Surrogate hub', '代孕妈妈指南'), href: localePath('/surrogates') },
        { label: tt('Disclaimer', '免责声明'), href: localePath('/disclaimer') },
        { label: tt('Terms', '服务条款'), href: localePath('/terms-of-service') },
      ]"
    />
    <section class="bg-[var(--yunda-petal)] px-5 py-12 lg:px-20 lg:py-16">
      <div class="mx-auto max-w-300">
        <div class="max-w-4xl">
          <p class="mb-3 text-xs text-[var(--yunda-maple)] font-extrabold uppercase tracking-[0.16em]">
            {{ tt('Trust standards', '信任标准') }}
          </p>
          <h2 class="font-display text-[32px] text-[var(--yunda-bark)] font-semibold leading-[1.12] lg:text-[44px]">
            {{ tt('How Yunda earns trust in a YMYL journey', '孕达如何在 YMYL 决策中建立信任') }}
          </h2>
          <p class="mt-5 text-base text-[var(--yunda-bark)]/82 leading-[1.8] lg:text-[18px]" style="font-family: var(--font-text)">
            {{ tt('Surrogacy involves family, health, legal identity, insurance, and significant financial planning. Our content and consultations are written to help people understand the path, ask better questions, and involve the right professionals before making irreversible decisions.', '代孕涉及家庭、健康、法律身份、保险和重要财务规划。我们的内容和咨询旨在帮助用户理解路径、提出更好的问题，并在做出重大决定前让合适专业人士参与。') }}
          </p>
        </div>
        <div class="mt-7 grid gap-4 md:grid-cols-3">
          <article
            v-for="item in trustStandards"
            :key="item.title"
            class="rounded-[18px] border border-[var(--yunda-bark)]/10 bg-white/76 p-5 shadow-[0_10px_28px_rgba(61,42,31,0.05)]"
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
    <AboutTeamSection />
    <PhotoGallerySection />
    <AboutCareerSection />
    <AppFooter />
  </div>
</template>

<style scoped></style>

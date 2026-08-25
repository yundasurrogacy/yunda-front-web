<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { buildBreadcrumbListSchema, buildWebPageSchema } from '~/utils/schema'
import AboutCareerSection from '../components/about/CareerSection.vue'
import AboutHeroSection from '../components/about/HeroSection.vue'
import PhotoGallerySection from '../components/about/PhotoGallerySection.vue'
import AboutTeamSection from '../components/about/TeamSection.vue'
import AppFooter from '../components/base/AppFooter.vue'
import AppHeader from '../components/base/AppHeader.vue'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en, zh) => (isZh.value ? zh : en)
const dateModified = '2026-08-24'

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

function teamBio(nameKey, paragraphCount) {
  return Array.from(
    { length: paragraphCount },
    (_, index) => t(`about.team.${nameKey}.bio.paragraph${index + 1}`),
  )
}

const teamMemberDefinitions = [
  { key: 'kareZhang', id: 'kare-zhang', paragraphCount: 4 },
  { key: 'kaylaLuo', id: 'kayla-luo', paragraphCount: 4, image: '/images/pages/about/kayla-luo-square-2026.jpg' },
  { key: 'michaelSim', id: 'michael-sim', paragraphCount: 4, image: '/images/pages/about/michael-sim-square-2026.jpg' },
  { key: 'claraChen', id: 'clara-chen', paragraphCount: 3 },
  { key: 'moonLiang', id: 'moon-liang', paragraphCount: 3, image: '/images/pages/about/moon-liang-square-2026.jpg' },
  { key: 'celiaChen', id: 'celia-chen', paragraphCount: 3, image: '/images/pages/about/celia-chen-square-2026.jpg' },
]

const teamMembers = computed(() => teamMemberDefinitions.map(member => ({
  ...member,
  title: t(`about.team.${member.key}.name`),
  jobTitle: t(`about.team.${member.key}.title`),
  text: teamBio(member.key, member.paragraphCount).join(' '),
})))

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

const teamPersonSchemas = computed(() => {
  const baseUrl = siteUrl.value || 'https://www.yundasurrogacy.com'
  const aboutPath = locale.value === 'zh' ? '/zh/about' : '/about'

  return teamMembers.value.map(member => ({
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${baseUrl}/about#${member.id}`,
    'name': member.title,
    'jobTitle': member.jobTitle,
    'description': member.text,
    'url': `${baseUrl}${aboutPath}#${member.id}`,
    ...(member.image ? { image: `${baseUrl}${member.image}` } : {}),
    'worksFor': {
      '@id': `${baseUrl}/#organization`,
    },
  }))
})

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
      key: 'schema-about-team',
      type: 'application/ld+json',
      children: JSON.stringify(teamPersonSchemas.value),
    },
  ],
}))
</script>

<template>
  <div class="bg-[var(--yunda-petal)]">
    <AppHeader />
    <AboutHeroSection />
    <AboutTeamSection />
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
    <PhotoGallerySection />
    <AboutCareerSection />
    <AppFooter />
  </div>
</template>

<style scoped></style>

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
const dateModified = '2026-11-17'
const heroContent = computed(() => ({
  title: tt('Where professional commitment meets heartfelt care', '专业之上，更有温度'),
  description: tt('Yunda Surrogacy supports intended parents and surrogates with education, coordination, and case management. From the first conversation through the journey ahead, we help you understand each step and stay connected with the professionals involved.', 'Yunda Surrogacy（孕达代孕）为准父母与代孕妈妈提供信息教育、流程协调和个案管理。从初次咨询到旅程中的各个阶段，我们帮助您理解每一步，并与相关专业人士保持沟通。'),
}))
const teamSummaries = computed(() => ({
  kareZhang: tt('After becoming a father through surrogacy, Kare founded Yunda Surrogacy. He leads company strategy, partnerships, and technology, drawing on his software development experience to make communication and case information clearer for families.', '通过代孕成为父亲后，Kare 创立了 Yunda Surrogacy。他负责公司战略、合作伙伴关系与技术创新，结合软件开发经验，让家庭更清楚地了解沟通进展与个案信息。'),
  kaylaLuo: tt('Kayla leads operations, technology development, and cross-border initiatives at Yunda Surrogacy. With a background in public administration and data science, she focuses on clearer processes and communication for intended parents, surrogates, and partners.', 'Kayla 负责 Yunda Surrogacy 的运营、技术研发与跨境协作。结合公共管理和数据科学背景，她致力于让准父母、代孕妈妈与合作伙伴之间的流程和沟通更加清晰。'),
  michaelSim: tt('Michael leads Asia-Pacific strategy and partnerships at Yunda Surrogacy. Working in assisted reproductive services since 2018, he connects intended parents with fertility professionals and supports communication across countries and cultures.', 'Michael 负责 Yunda Surrogacy 的亚太战略与合作伙伴关系。自 2018 年进入辅助生殖行业以来，他持续连接准父母与生殖领域专业人士，支持跨国家、跨文化的沟通协作。'),
}))

const teamDetails = computed(() => ({
  kareZhang: {
    responsibility: tt('After becoming a father through surrogacy, Kare founded Yunda Surrogacy and now leads its strategy, partnerships, and technology innovation.', '通过代孕成为父亲后，Kare 创立了 Yunda Surrogacy，现负责公司战略、合作伙伴关系与技术创新。'),
    expertise: tt('His software development and digital media background informs the company’s bilingual CRM and case-management tools.', '他将软件开发与数字媒体经验运用于公司的双语 CRM 平台及个案管理工具。'),
    clientValue: tt('He focuses on clearer communication and case visibility so intended parents can stay informed and connected throughout their journey.', '他关注清晰沟通与个案进度透明，帮助准父母在旅程中及时了解信息，并与团队保持联系。'),
  },
  kaylaLuo: {
    responsibility: tt('Kayla oversees operations, technology development, business strategy, and cross-border initiatives at Yunda Surrogacy.', 'Kayla 负责 Yunda Surrogacy 的运营管理、技术研发、业务战略与跨境协作。'),
    expertise: tt('She combines public administration and data science training with English, Mandarin, and German language skills.', '她结合公共管理与数据科学的专业背景，以及英语、中文和德语能力开展工作。'),
    clientValue: tt('She works to simplify complex processes and improve communication for intended parents, surrogates, and international partners.', '她致力于简化复杂流程，改善准父母、代孕妈妈与国际合作伙伴之间的沟通。'),
  },
  michaelSim: {
    responsibility: tt('Michael leads Asia-Pacific strategy, business development, and partnerships for Yunda Surrogacy.', 'Michael 负责 Yunda Surrogacy 在亚太地区的战略、业务拓展与合作伙伴关系。'),
    expertise: tt('He has worked in assisted reproductive services since 2018, building relationships with fertility clinics, physicians, and industry partners.', '自 2018 年进入辅助生殖行业以来，他持续与生殖中心、医生和行业伙伴建立合作关系。'),
    clientValue: tt('He connects intended parents with reproductive resources and helps simplify communication across countries and cultures.', '他为准父母连接生殖领域资源，帮助跨国家、跨文化的沟通更加清晰。'),
  },
}))

const trustStandards = computed(() => [
  {
    title: tt('Whole-journey coordination', '全旅程协调'),
    body: tt('Yunda Surrogacy supports consultation, matching, clinic communication, screening coordination, legal timing, insurance review, escrow planning, pregnancy updates, and bilingual communication.', 'Yunda Surrogacy（孕达代孕）支持咨询、匹配、诊所沟通、筛查协调、法律时间线、保险审核、托管规划、孕期沟通和双语协作。'),
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

useHead(() => ({
  title: tt('About Us - Yunda Surrogacy', '关于我们 - Yunda Surrogacy（孕达代孕）'),
  meta: [
    {
      name: 'description',
      content: heroContent.value.description,
    },
  ],
}))

function teamBio(nameKey, paragraphCount) {
  return Array.from(
    { length: paragraphCount },
    (_, index) => t(`about.team.${nameKey}.bio.paragraph${index + 1}`).replace(/\bYunda(?! Surrogacy)\b/g, 'Yunda Surrogacy'),
  )
}

const teamMemberDefinitions = [
  { key: 'kareZhang', id: 'kare-zhang', paragraphCount: 4 },
  { key: 'kaylaLuo', id: 'kayla-luo', paragraphCount: 4, image: '/images/pages/about/kayla-luo-square-2026.jpg' },
  { key: 'michaelSim', id: 'michael-sim', paragraphCount: 4, image: '/images/pages/about/michael-sim-square-2026.jpg' },
]

const teamMembers = computed(() => teamMemberDefinitions.map(member => ({
  ...member,
  title: t(`about.team.${member.key}.name`),
  jobTitle: t(`about.team.${member.key}.title`),
  summary: teamSummaries.value[member.key],
  ...teamDetails.value[member.key],
  paragraphs: teamBio(member.key, member.paragraphCount),
  imageAlt: tt(`Portrait of ${t(`about.team.${member.key}.name`)} at Yunda Surrogacy`, `Yunda Surrogacy 团队成员 ${t(`about.team.${member.key}.name`)} 的肖像`),
})))

const aboutPageSchema = computed(() => buildWebPageSchema({
  baseUrl: siteUrl.value || undefined,
  url: '/about',
  name: tt('About Us - Yunda Surrogacy', '关于我们 - Yunda Surrogacy（孕达代孕）'),
  description: heroContent.value.description,
  about: heroContent.value.description,
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
    'description': member.summary,
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
    <AboutHeroSection :title="heroContent.title" :description="heroContent.description" />
    <AboutTeamSection :members="teamMembers" />
    <section class="bg-[var(--yunda-petal)] px-5 py-12 lg:px-20 lg:py-16">
      <div class="mx-auto max-w-300">
        <div class="max-w-4xl">
          <p class="mb-3 text-xs text-[var(--yunda-maple)] font-extrabold tracking-[0.16em] uppercase">
            {{ tt('Trust standards', '信任标准') }}
          </p>
          <h2 class="text-[32px] text-[var(--yunda-bark)] font-semibold leading-[1.12] font-display lg:text-[44px]">
            {{ tt('Clear guidance, thoughtful support', '清晰指引，细致支持') }}
          </h2>
          <p class="mt-5 text-base text-[var(--yunda-bark)]/82 leading-[1.8] lg:text-[18px]" style="font-family: var(--font-text)">
            {{ tt('Surrogacy involves family, health, legal identity, insurance, and significant financial planning. Our content and consultations are written to help people understand the path, ask better questions, and involve the right professionals before making irreversible decisions.', '代孕涉及家庭、健康、法律身份、保险和重要财务规划。我们的内容和咨询旨在帮助用户理解路径、提出更好的问题，并在做出重大决定前让合适专业人士参与。') }}
          </p>
        </div>
        <div class="grid mt-7 gap-4 md:grid-cols-3">
          <article
            v-for="item in trustStandards"
            :key="item.title"
            class="border border-[var(--yunda-bark)]/10 rounded-[18px] bg-white/76 p-5 shadow-[0_10px_28px_rgba(61,42,31,0.05)]"
          >
            <h3 class="text-[22px] text-[var(--yunda-bark)] font-semibold leading-snug font-display">
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

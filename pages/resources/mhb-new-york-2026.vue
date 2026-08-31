<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import BreadcrumbNav from '@/components/base/BreadcrumbNav.vue'
import OptimizedPicture from '@/components/base/OptimizedPicture.vue'
import {
  buildBreadcrumbListSchema,
  buildEventSchema,
  buildFAQPageSchema,
  buildWebPageSchema,
} from '~/utils/schema'

const PAGE_PATH = '/resources/mhb-new-york-2026'
const OFFICIAL_EVENT_URL = 'https://menhavingbabies.org/surrogacy-seminars/ny/'
const EVENT_STATE: 'upcoming' | 'past' = 'upcoming'
const EVENT_START = '2026-09-25'
const EVENT_END = '2026-09-27'
const EVENT_IMAGES = Array.from({ length: 6 }, (_, index) => `/images/pages/about/mhb/mhb-${index + 1}.jpg`)

const translations = {
  en: {
    metaTitle: 'Yunda at MHB New York 2026 | Surrogacy Event',
    metaDescription: 'Find verified MHB New York 2026 event facts, Yunda’s Silver Sponsor role, official event details, and links for intended-parent preparation.',
    eyebrow: 'September 25-27, 2026 | New York',
    heroTitle: 'Meet Yunda at MHB New York 2026',
    heroBody: 'Review verified event facts, Yunda’s Silver Sponsor role, and practical preparation resources before the conference.',
    primaryCta: 'Plan My Private Consultation',
    officialCta: 'Official Event Details',
    previousPhotoLabel: 'Photo from a previous MHB event',
    directTitle: 'What is MHB New York 2026?',
    directAnswer: 'MHB New York 2026 is a three-day surrogacy conference and expo organized by Men Having Babies in New York from September 25-27, 2026. Yunda Surrogacy is participating as one of the Silver Sponsors, not as the organizer or co-organizer. This page is the source for Yunda’s verified event facts, official event link, participation context, and pre-event resource paths. Booth details, attending team members, and event-specific consultation availability will appear only if they are confirmed for public use. For a detailed provider-comparison framework, use the separate checklist for questions gay intended parents can ask a surrogacy agency at MHB New York 2026.',
    factsTitle: 'Event facts at a glance',
    facts: [
      { label: 'Dates', value: 'September 25-27, 2026' },
      { label: 'City', value: 'New York, United States' },
      { label: 'Organizer', value: 'Men Having Babies (MHB)' },
      { label: 'Yunda role', value: 'SILVER SPONSORS' },
    ],
    factsNote: 'Venue, booth number, and attending team members will appear only after those details are confirmed for public use.',
    audienceTitle: 'Who this event guide is for',
    audiences: [
      { title: 'Gay couples and intended fathers', body: 'Prepare donor, embryo, parentage, matching, and birth-planning questions before speaking with providers.' },
      { title: 'LGBTQ+ families', body: 'Compare inclusive support, communication expectations, professional coordination, and the boundaries of each provider’s role.' },
      { title: 'Single intended parents', body: 'Clarify donor needs, support planning, costs, timing, and the professionals required for your individual path.' },
      { title: 'International intended parents', body: 'Organize cross-border questions about clinics, travel, translation, documents, time zones, and case communication.' },
    ],
    prepareTitle: 'Prepare five decisions before MHB',
    prepareIntro: 'Use these guides to form specific questions. Each linked page remains the source of truth for its full topic.',
    prepareCards: [
      { number: '01', title: 'Process', question: 'Where are we starting, and what must happen before matching?', body: 'Map embryo status, donor needs, clinic readiness, screening, legal coordination, transfer, pregnancy, and birth planning.', to: '/surrogacy-process', link: 'Review the process' },
      { number: '02', title: 'Cost', question: 'Which costs are predictable, variable, or paid to third parties?', body: 'Separate agency coordination from surrogate-related, medical, legal, insurance, escrow, travel, and donor expenses.', to: '/surrogacy-cost', link: 'Review cost planning' },
      { number: '03', title: 'Egg donation', question: 'Do we need donor eggs, and how should clinic timing align?', body: 'Clarify donor selection, screening, embryo creation, clinic coordination, and what should be ready before a match.', to: '/egg-donation', link: 'Review egg donation' },
      { number: '04', title: 'Provider checklist', question: 'Which questions will help us compare providers consistently?', body: 'Use one written checklist for agency scope, screening, matching, costs, professional handoffs, communication, and support.', to: '/blog/mhb-new-york-2026-guide-gay-intended-parents', link: 'Use the provider checklist' },
      { number: '05', title: 'Consultation', question: 'What should a private planning call resolve first?', body: 'Bring your family structure, residence, embryo status, donor needs, preferred timing, and highest-priority questions.', to: '/be-parents', link: 'Plan a consultation' },
    ],
    journeyTitle: 'Build your pre-conference journey',
    journeyIntro: 'Start with your family structure, then move through process, cost, donor planning, and a private consultation.',
    journey: [
      { label: 'Family path', title: 'Gay and LGBTQ+ surrogacy', body: 'Use the dedicated guide for gay couples, LGBTQ+ families, and single intended parents before comparing donor planning, parentage coordination, matching, and communication.', to: '/single-parents-lgbtq' },
      { label: 'Sequence', title: 'Surrogacy process', body: 'Understand how the major stages connect without treating one conference conversation as a full plan.', to: '/surrogacy-process' },
      { label: 'Budget', title: 'Surrogacy cost', body: 'Prepare questions about included services, variables, third-party fees, and timing of funds.', to: '/surrogacy-cost' },
      { label: 'Embryos', title: 'Egg donation', body: 'Review donor and IVF clinic coordination if your path requires donor eggs.', to: '/egg-donation' },
      { label: 'Next step', title: 'Private consultation', body: 'Turn the questions you gathered into a case-specific planning conversation with Yunda.', to: '/be-parents' },
    ],
    galleryTitle: 'Previous MHB moments with Yunda',
    galleryIntro: 'These photographs document Yunda at past MHB events.',
    galleryAlts: [
      'Yunda team booth at a previous Men Having Babies event',
      'Yunda representatives speaking with attendees at a previous MHB event',
      'Yunda display and materials at a previous Men Having Babies event',
      'Conversation at a previous MHB conference attended by Yunda',
      'Yunda team presence at a past Men Having Babies gathering',
      'Previous MHB community event moment with Yunda',
    ],
    faqTitle: 'MHB New York 2026 FAQs',
    faqs: [
      { q: 'Who organizes MHB New York 2026?', a: 'Men Having Babies is the event organizer. Yunda is participating as part of the SILVER SPONSORS.' },
      { q: 'What information should I review before attending?', a: 'Review the event facts and official event page, then note your current embryo, donor, clinic, travel, and communication status. Use the separate provider checklist for detailed agency-comparison questions.' },
      { q: 'Where can I find the complete provider-question checklist?', a: 'Use Yunda’s dedicated MHB New York 2026 provider checklist. It keeps detailed agency, screening, matching, cost, legal, insurance, escrow, and communication questions separate from this event page.' },
      { q: 'Can Yunda provide legal, medical, insurance, IVF, or escrow advice at the event?', a: 'Yunda provides education, coordination, bilingual communication, and case-management support. Final legal, medical, insurance, IVF, and escrow decisions belong with the relevant qualified professionals.' },
      { q: 'How can I contact Yunda before the event?', a: 'Use Yunda’s general intended-parent consultation form to share your starting point and questions. Submitting the form does not promise an event appointment or on-site consultation slot.' },
      { q: 'What happens to this page after the event?', a: 'The URL remains active. After the conference, the page can be updated with verified recap notes, common questions, interviews, or video resources while keeping the same canonical event URL.' },
    ],
    trustTitle: 'Understand the service boundary',
    trustBody: 'Yunda offers education, coordination, bilingual communication, and case-management support. Yunda is not a law firm, medical provider, IVF clinic, insurance company, or escrow company. Individual outcomes, timelines, eligibility, costs, and professional decisions vary by case.',
    finalTitle: 'Turn conference questions into a private plan',
    finalBody: 'Tell us where you are starting, what is still unclear, and which decisions you want to prepare before New York.',
    statusUpcoming: 'Upcoming event guide',
    statusPast: 'Event recap and resource guide',
    breadcrumb: 'MHB New York 2026',
  },
  zh: {
    metaTitle: '孕达参展 MHB New York 2026｜活动指南',
    metaDescription: '查看 MHB New York 2026 已核实的活动事实、孕达 Silver Sponsor 身份、官方活动入口与准父母会前准备资源。',
    eyebrow: '2026 年 9 月 25-27 日 | 纽约',
    heroTitle: '在 MHB New York 2026 与孕达见面',
    heroBody: '会前查看已核实的活动事实、孕达 Silver Sponsor 身份与实用准备资源。',
    primaryCta: '预约私密咨询',
    officialCta: '查看官方活动信息',
    previousPhotoLabel: '过往 MHB 活动照片',
    directTitle: 'MHB New York 2026 是什么？',
    directAnswer: 'MHB New York 2026 是由 Men Having Babies 主办的三天代孕会议与展会，活动于 2026 年 9 月 25-27 日在纽约举行。孕达代孕是 Silver Sponsors 之一，不是活动组织方或共同组织方。本页统一承接孕达已经核实的活动事实、官方活动入口、参会身份说明与会前资源路径。展位信息、参会团队和活动专属咨询安排只会在确认可公开后显示。需要深入比较服务方时，请使用独立的 MHB New York 2026 机构提问清单；该清单负责机构职责、筛查、匹配、费用、专业方交接、沟通与支持等详细问题，本活动页不重复展开。',
    factsTitle: '活动事实',
    facts: [
      { label: '日期', value: '2026 年 9 月 25-27 日' },
      { label: '城市', value: '美国纽约' },
      { label: '组织方', value: 'Men Having Babies (MHB)' },
      { label: '孕达身份', value: 'SILVER SPONSORS' },
    ],
    factsNote: '场馆、展位号和到场团队仅在信息确认且允许公开后显示。',
    audienceTitle: '这份活动指南适合谁',
    audiences: [
      { title: '男同志伴侣与准爸爸', body: '会前准备供卵、胚胎、亲权、匹配与出生规划问题。' },
      { title: 'LGBTQ+ 家庭', body: '比较包容性支持、沟通预期、专业协调方式和各服务方的职责边界。' },
      { title: '单身准父母', body: '梳理供体需求、支持计划、费用、时间和个案所需的专业人员。' },
      { title: '国际准父母', body: '提前整理诊所、旅行、翻译、文件、时区和跨境个案沟通问题。' },
    ],
    prepareTitle: '会前先准备五项决定',
    prepareIntro: '用这些指南形成具体问题。每个链接页面仍是对应完整主题的主要信息源。',
    prepareCards: [
      { number: '01', title: '流程', question: '我们从哪里开始，匹配前必须完成什么？', body: '梳理胚胎、供体、诊所、筛查、法律协调、移植、孕期和出生规划。', to: '/surrogacy-process', link: '查看完整流程' },
      { number: '02', title: '费用', question: '哪些费用可预估，哪些会变化，哪些支付给第三方？', body: '区分机构协调、代孕妈妈、医疗、法律、保险、托管、旅行和供体费用。', to: '/surrogacy-cost', link: '查看费用规划' },
      { number: '03', title: '供卵', question: '我们是否需要供卵，诊所时间如何衔接？', body: '确认供卵选择、筛查、胚胎建立、诊所协调和匹配前准备。', to: '/egg-donation', link: '查看供卵指南' },
      { number: '04', title: '机构提问清单', question: '哪些问题能帮助我们用同一标准比较服务方？', body: '用一份书面清单核对机构职责、筛查、匹配、费用、专业方交接、沟通和支持。', to: '/blog/mhb-new-york-2026-guide-gay-intended-parents', link: '使用机构提问清单' },
      { number: '05', title: '咨询', question: '私密规划沟通首先应该解决什么？', body: '准备家庭结构、居住地、胚胎状态、供体需求、希望时间和优先问题。', to: '/be-parents', link: '提交咨询信息' },
    ],
    journeyTitle: '建立你的会前阅读路径',
    journeyIntro: '从家庭结构开始，依次了解流程、费用、供体规划和私密咨询。',
    journey: [
      { label: '家庭路径', title: '男同志与 LGBTQ+ 代孕', body: '先通过专题指南了解男同志伴侣、LGBTQ+ 家庭与单身准父母在供体规划、亲权协调、匹配和沟通方面的常见差异。', to: '/single-parents-lgbtq' },
      { label: '步骤', title: '代孕流程', body: '理解主要阶段如何连接，不把一次会议沟通当作完整个案方案。', to: '/surrogacy-process' },
      { label: '预算', title: '代孕费用', body: '准备服务范围、费用变量、第三方费用和资金时间问题。', to: '/surrogacy-cost' },
      { label: '胚胎', title: '供卵规划', body: '如需供卵，先了解供体与 IVF 诊所协调事项。', to: '/egg-donation' },
      { label: '下一步', title: '私密咨询', body: '把会前整理的问题带入与你个案相关的孕达规划沟通。', to: '/be-parents' },
    ],
    galleryTitle: '孕达过往 MHB 活动瞬间',
    galleryIntro: '这些照片记录孕达参加过往 MHB 活动的经历。',
    galleryAlts: [
      '孕达团队在过往 Men Having Babies 活动的展位',
      '孕达代表在过往 MHB 活动与参与者沟通',
      '孕达在过往 Men Having Babies 活动的展示资料',
      '孕达参与过往 MHB 会议的沟通场景',
      '孕达团队在过往 Men Having Babies 活动现场',
      '孕达参与过往 MHB 社区活动的瞬间',
    ],
    faqTitle: 'MHB New York 2026 常见问题',
    faqs: [
      { q: 'MHB New York 2026 由谁组织？', a: 'Men Having Babies 是本次活动的主办方。孕达将以 SILVER SPONSORS 的身份参与活动。' },
      { q: '参会前应该先查看哪些信息？', a: '先查看本页活动事实与 MHB 官方活动页，再记录胚胎、供卵、诊所、出行和沟通现状。详细机构比较问题请使用独立的服务方提问清单。' },
      { q: '在哪里查看完整的机构提问清单？', a: '请使用孕达独立的 MHB New York 2026 机构提问清单。机构职责、筛查、匹配、费用、法律、保险、托管和沟通等详细问题均由该清单承接。' },
      { q: '孕达能否在活动上直接提供法律、医疗、保险、IVF 或托管意见？', a: '孕达提供教育、协调、双语沟通和个案管理支持。最终法律、医疗、保险、IVF 和托管决定应由相应的合格专业人士作出。' },
      { q: '活动前如何联系孕达？', a: '可通过孕达通用准父母咨询表单说明起点和问题。提交表单不代表已获得活动预约或现场咨询名额。' },
      { q: '活动结束后这个页面如何处理？', a: '页面 URL 会继续保留。活动结束后可在同一 canonical URL 更新经核实的回顾、常见问题、采访或视频资料。' },
    ],
    trustTitle: '了解服务边界',
    trustBody: '孕达提供教育、协调、双语沟通和个案管理支持。孕达不是律师事务所、医疗机构、IVF 诊所、保险公司或托管公司。个案结果、时间、资格、费用和专业决定均可能不同。',
    finalTitle: '把会前问题转化为私密规划',
    finalBody: '告诉我们你的起点、尚未明确的问题，以及希望在纽约活动前准备的决定。',
    statusUpcoming: '即将举行的活动指南',
    statusPast: '活动回顾与资源指南',
    breadcrumb: 'MHB New York 2026',
  },
} as const

const { locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || 'https://www.yundasurrogacy.com').replace(/\/$/, ''))
const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)
const inLanguage = computed(() => locale.value === 'zh' ? 'zh-CN' : 'en-US')
const pageUrl = computed(() => `${siteUrl.value}${localePath(PAGE_PATH)}`)
const heroImageUrl = computed(() => `${siteUrl.value}${EVENT_IMAGES[0]}`)
const statusLabel = computed(() => EVENT_STATE === 'upcoming' ? c.value.statusUpcoming : c.value.statusPast)

const breadcrumbItems = computed(() => [
  { label: locale.value === 'zh' ? '资源与媒体中心' : 'Resources & Media', to: '/resources' },
  { label: c.value.breadcrumb },
])

const pageSchema = computed(() => buildWebPageSchema({
  baseUrl: siteUrl.value,
  url: PAGE_PATH,
  pageId: `${pageUrl.value}#webpage`,
  name: c.value.heroTitle,
  description: c.value.metaDescription,
  about: c.value.directAnswer,
  audience: locale.value === 'zh'
    ? ['男同志准父母', 'LGBTQ+ 准父母', '单身准父母', '国际准父母']
    : ['Gay intended parents', 'LGBTQ+ intended parents', 'Single intended parents', 'International intended parents'],
  dateModified: '2026-08-12',
  inLanguage: inLanguage.value,
}))

const eventSchema = computed(() => buildEventSchema({
  baseUrl: siteUrl.value,
  pageUrl: PAGE_PATH,
  pageEntityId: `${pageUrl.value}#webpage`,
  eventId: `${pageUrl.value}#event`,
  name: 'Men Having Babies 2026 New York Surrogacy Conference & Expo',
  description: c.value.metaDescription,
  startDate: EVENT_START,
  endDate: EVENT_END,
  eventStatus: EVENT_STATE === 'upcoming' ? 'scheduled' : 'completed',
  eventAttendanceMode: 'offline',
  location: {
    name: 'New York',
    address: {
      addressLocality: 'New York',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
  },
  organizer: {
    name: 'Men Having Babies',
    url: 'https://menhavingbabies.org/',
  },
  attendeeOrganization: {
    name: 'Yunda Surrogacy',
    id: `${siteUrl.value}/#organization`,
    url: siteUrl.value,
  },
  officialUrl: OFFICIAL_EVENT_URL,
  image: EVENT_IMAGES,
  inLanguage: inLanguage.value,
}))

const breadcrumbSchema = computed(() => buildBreadcrumbListSchema({
  baseUrl: siteUrl.value,
  inLanguage: inLanguage.value,
  items: [
    { name: locale.value === 'zh' ? '首页' : 'Home', url: '/' },
    { name: locale.value === 'zh' ? '资源与媒体中心' : 'Resources & Media', url: '/resources' },
    { name: c.value.breadcrumb, url: PAGE_PATH },
  ],
}))

const faqSchema = computed(() => buildFAQPageSchema({
  baseUrl: siteUrl.value,
  url: PAGE_PATH,
  name: `${c.value.heroTitle} FAQ`,
  description: c.value.metaDescription,
  faqs: c.value.faqs.map(item => ({ question: item.q, answer: item.a })),
  inLanguage: inLanguage.value,
}))

useHead(() => ({
  title: c.value.metaTitle,
  meta: [
    { name: 'description', content: c.value.metaDescription },
    { property: 'og:title', content: c.value.metaTitle },
    { property: 'og:description', content: c.value.metaDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: heroImageUrl.value },
    { name: 'twitter:title', content: c.value.metaTitle },
    { name: 'twitter:description', content: c.value.metaDescription },
    { name: 'twitter:image', content: heroImageUrl.value },
  ],
  link: [{ rel: 'preload', as: 'image', href: EVENT_IMAGES[0], fetchpriority: 'high' }],
  script: [pageSchema.value, eventSchema.value, breadcrumbSchema.value, faqSchema.value].map((schema, index) => ({
    key: `schema-mhb-new-york-2026-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div class="mhb-page min-h-screen overflow-x-clip bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />
    <BreadcrumbNav :items="breadcrumbItems" />

    <main>
      <section class="relative isolate overflow-hidden bg-[var(--yunda-petal)]">
        <div class="mx-auto grid min-h-[calc(100dvh-118px)] max-w-[1440px] items-center gap-8 px-6 py-12 md:grid-cols-[0.92fr_1.08fr] md:px-10 lg:gap-14 lg:px-14 lg:py-16">
          <div class="relative z-[1] max-w-[650px]">
            <p class="text-[12px] text-[var(--yunda-maple)] font-extrabold uppercase tracking-[0.15em]">
              {{ c.eyebrow }}
            </p>
            <h1 class="mt-5 max-w-[18ch] font-display text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] sm:text-[52px] lg:text-[66px]">
              {{ c.heroTitle }}
            </h1>
            <p class="mt-6 max-w-[540px] text-base text-[var(--yunda-bark)]/82 leading-[1.7] sm:text-lg">
              {{ c.heroBody }}
            </p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <NuxtLink :to="localePath('/be-parents')" class="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-[10px] bg-[var(--yunda-maple)] px-6 py-3 text-sm text-white font-bold transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(169,82,36,0.24)] active:translate-y-px focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--yunda-bark)]">
                {{ c.primaryCta }}
              </NuxtLink>
              <a :href="OFFICIAL_EVENT_URL" target="_blank" rel="noopener noreferrer" class="inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-[10px] border-2 border-[var(--yunda-bark)] bg-transparent px-6 py-3 text-sm text-[var(--yunda-bark)] font-bold transition-colors hover:border-[var(--yunda-maple)] hover:text-[var(--yunda-maple)] active:translate-y-px focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--yunda-maple)]">
                {{ c.officialCta }}
              </a>
            </div>
          </div>

          <figure class="relative mx-auto w-full max-w-[690px] pb-10 md:pb-0">
            <div class="grid grid-cols-[1.32fr_0.68fr] gap-3 sm:gap-4">
              <OptimizedPicture :src="EVENT_IMAGES[0]" :alt="c.galleryAlts[0]" width="1200" height="1200" loading="eager" fetchpriority="high" picture-class="block overflow-hidden rounded-[16px] bg-white" img-class="aspect-[4/5] h-full w-full object-cover" />
              <div class="grid gap-3 sm:gap-4">
                <OptimizedPicture :src="EVENT_IMAGES[1]" :alt="c.galleryAlts[1]" width="1200" height="1200" loading="eager" picture-class="block overflow-hidden rounded-[16px] bg-white" img-class="aspect-square h-full w-full object-cover" />
                <div class="flex min-h-[150px] flex-col justify-between rounded-[16px] bg-[var(--yunda-bark)] p-5 text-[var(--yunda-petal)] sm:p-6">
                  <span class="text-xs font-bold uppercase tracking-[0.13em]">{{ statusLabel }}</span>
                  <time :datetime="EVENT_START" class="font-display text-[27px] font-semibold leading-[1.05] sm:text-[34px]">{{ locale === 'zh' ? '9月25-27日' : 'Sep 25-27' }}<br>2026</time>
                </div>
              </div>
            </div>
            <figcaption class="mt-3 text-sm text-[var(--yunda-bark)]/65">
              {{ c.previousPhotoLabel }}
            </figcaption>
          </figure>
        </div>
      </section>

      <section class="bg-white py-16 lg:py-24">
        <div class="mx-auto grid max-w-[1180px] gap-10 px-6 md:grid-cols-[0.78fr_1.22fr] md:px-10 lg:gap-16">
          <h2 class="max-w-[14ch] font-display text-[34px] font-semibold leading-[1.12] tracking-[-0.025em] lg:text-[46px]">
            {{ c.directTitle }}
          </h2>
          <p class="text-[17px] text-[var(--yunda-bark)]/82 leading-[1.9] lg:text-lg">
            {{ c.directAnswer }}
          </p>
        </div>
      </section>

      <section class="bg-[color-mix(in_srgb,var(--yunda-sky)_26%,var(--yunda-petal)_74%)] py-16 lg:py-22">
        <div class="mx-auto max-w-[1180px] px-6 md:px-10">
          <h2 class="font-display text-[34px] font-semibold leading-tight lg:text-[44px]">{{ c.factsTitle }}</h2>
          <dl class="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div v-for="fact in c.facts" :key="fact.label" class="rounded-[14px] border border-[var(--yunda-bark)]/12 bg-white/80 p-5 lg:p-6">
              <dt class="text-xs text-[var(--yunda-maple)] font-extrabold uppercase tracking-[0.12em]">{{ fact.label }}</dt>
              <dd class="mt-3 text-lg font-bold leading-snug">{{ fact.value }}</dd>
            </div>
          </dl>
          <p class="mt-5 max-w-3xl text-sm text-[var(--yunda-bark)]/70 leading-relaxed">{{ c.factsNote }}</p>
        </div>
      </section>

      <section class="bg-[var(--yunda-petal)] py-16 lg:py-24">
        <div class="mx-auto max-w-[1180px] px-6 md:px-10">
          <h2 class="max-w-[16ch] font-display text-[34px] font-semibold leading-tight lg:text-[44px]">{{ c.audienceTitle }}</h2>
          <div class="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2">
            <article v-for="(item, index) in c.audiences" :key="item.title" class="grid grid-cols-[42px_1fr] gap-4 border-t border-[var(--yunda-bark)]/18 pt-5">
              <span class="font-display text-2xl text-[var(--yunda-maple)] font-semibold">{{ String(index + 1).padStart(2, '0') }}</span>
              <div>
                <h3 class="font-display text-[24px] font-semibold leading-snug">{{ item.title }}</h3>
                <p class="mt-3 text-[15px] text-[var(--yunda-bark)]/78 leading-[1.75]">{{ item.body }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="bg-[var(--yunda-petal)] py-16 lg:py-24">
        <div class="mx-auto max-w-[1240px] px-6 md:px-10">
          <h2 class="font-display text-[34px] font-semibold leading-tight lg:text-[44px]">{{ c.galleryTitle }}</h2>
          <p class="mt-4 max-w-[65ch] text-base text-[var(--yunda-bark)]/75 leading-relaxed">{{ c.galleryIntro }}</p>
          <div class="mt-10 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
            <figure v-for="(image, index) in EVENT_IMAGES" :key="image" class="overflow-hidden rounded-[14px] bg-white" :class="index === 0 || index === 5 ? 'md:col-span-5' : 'md:col-span-3'">
              <OptimizedPicture :src="image" :alt="c.galleryAlts[index]" width="1200" height="1200" loading="lazy" picture-class="block h-full" img-class="aspect-square h-full w-full object-cover transition-transform duration-300 hover:scale-[1.025]" />
            </figure>
          </div>
        </div>
      </section>

      <section class="bg-white py-16 lg:py-24">
        <div class="mx-auto max-w-[1240px] px-6 md:px-10">
          <h2 class="font-display text-[34px] font-semibold leading-tight lg:text-[44px]">{{ c.prepareTitle }}</h2>
          <p class="mt-4 max-w-[65ch] text-base text-[var(--yunda-bark)]/75 leading-relaxed">{{ c.prepareIntro }}</p>
          <div class="mt-10 grid gap-5 md:grid-cols-2">
            <article v-for="(card, index) in c.prepareCards" :key="card.title" class="group rounded-[16px] border border-[var(--yunda-bark)]/12 p-6 transition-[transform,border-color] hover:-translate-y-1 hover:border-[var(--yunda-maple)]/65 lg:p-8" :class="index === 1 ? 'bg-[color-mix(in_srgb,var(--yunda-harvest)_22%,white_78%)]' : index === 2 ? 'bg-[color-mix(in_srgb,var(--yunda-sky)_28%,white_72%)]' : 'bg-[var(--yunda-petal)]/45'">
              <div class="flex items-start justify-between gap-6">
                <h3 class="font-display text-[28px] font-semibold">{{ card.title }}</h3>
                <span class="font-display text-lg text-[var(--yunda-maple)] font-semibold">{{ card.number }}</span>
              </div>
              <p class="mt-5 text-lg font-bold leading-snug">{{ card.question }}</p>
              <p class="mt-3 text-[15px] text-[var(--yunda-bark)]/76 leading-[1.75]">{{ card.body }}</p>
              <NuxtLink :to="localePath(card.to)" class="mt-6 inline-flex items-center gap-2 text-sm text-[var(--yunda-maple)] font-bold underline decoration-2 underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--yunda-maple)]">
                {{ card.link }} <span aria-hidden="true">→</span>
              </NuxtLink>
            </article>
          </div>
        </div>
      </section>

      <section class="bg-[var(--yunda-bark)] py-16 text-[var(--yunda-petal)] lg:py-24">
        <div class="mx-auto max-w-[1180px] px-6 md:px-10">
          <h2 class="font-display text-[34px] font-semibold leading-tight lg:text-[44px]">{{ c.journeyTitle }}</h2>
          <p class="mt-4 max-w-[65ch] text-base text-[var(--yunda-petal)]/78 leading-relaxed">{{ c.journeyIntro }}</p>
          <ol class="mt-10 grid gap-4 lg:grid-cols-5">
            <li v-for="item in c.journey" :key="item.to" class="relative rounded-[14px] border border-[var(--yunda-petal)]/18 p-5 lg:min-h-[265px]">
              <div class="flex items-center justify-between gap-3">
                <span class="text-xs text-[var(--yunda-harvest)] font-extrabold uppercase tracking-[0.11em]">{{ item.label }}</span>
              </div>
              <h3 class="mt-5 font-display text-[22px] font-semibold leading-tight">{{ item.title }}</h3>
              <p class="mt-3 text-sm text-[var(--yunda-petal)]/74 leading-[1.7]">{{ item.body }}</p>
              <NuxtLink :to="localePath(item.to)" class="mt-5 inline-flex text-sm text-[var(--yunda-harvest)] font-bold underline underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--yunda-harvest)]">
                {{ locale === 'zh' ? '继续阅读' : 'Continue reading' }}
              </NuxtLink>
            </li>
          </ol>
        </div>
      </section>

      <section class="bg-white py-16 lg:py-24">
        <div class="mx-auto grid max-w-[1180px] gap-12 px-6 md:grid-cols-[1.2fr_0.8fr] md:px-10 lg:gap-16">
          <div>
            <h2 class="font-display text-[34px] font-semibold leading-tight lg:text-[44px]">{{ c.faqTitle }}</h2>
            <div class="mt-8 space-y-3">
              <details v-for="item in c.faqs" :key="item.q" class="group rounded-[12px] border border-[var(--yunda-bark)]/13 bg-[var(--yunda-petal)]/38">
                <summary class="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-base font-bold leading-snug focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--yunda-maple)] lg:px-6">
                  {{ item.q }}
                  <Icon name="radix-icons:chevron-down" class="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p class="px-5 pb-5 text-[15px] text-[var(--yunda-bark)]/78 leading-[1.8] lg:px-6">{{ item.a }}</p>
              </details>
            </div>
          </div>
          <aside class="self-start rounded-[16px] bg-[color-mix(in_srgb,var(--yunda-sky)_42%,var(--yunda-petal)_58%)] p-7 lg:sticky lg:top-28 lg:p-8">
            <h2 class="font-display text-[28px] font-semibold leading-tight">{{ c.trustTitle }}</h2>
            <p class="mt-5 text-[15px] text-[var(--yunda-bark)]/82 leading-[1.85]">{{ c.trustBody }}</p>
            <a :href="OFFICIAL_EVENT_URL" target="_blank" rel="noopener noreferrer" class="mt-6 inline-flex text-sm text-[var(--yunda-maple)] font-bold underline decoration-2 underline-offset-4 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--yunda-maple)]">
              {{ c.officialCta }}
            </a>
          </aside>
        </div>
      </section>

      <section class="bg-[var(--yunda-petal)] px-6 py-16 md:px-10 lg:py-24">
        <div class="mx-auto max-w-[1120px] rounded-[16px] bg-[var(--yunda-maple)] px-6 py-12 text-center text-white sm:px-10 lg:px-16 lg:py-16">
          <h2 class="mx-auto max-w-[18ch] font-display text-[34px] font-semibold leading-tight lg:text-[46px]">{{ c.finalTitle }}</h2>
          <p class="mx-auto mt-5 max-w-[60ch] text-base text-white/90 leading-relaxed">{{ c.finalBody }}</p>
          <NuxtLink :to="localePath('/be-parents')" class="mt-8 inline-flex min-h-12 items-center justify-center whitespace-nowrap rounded-[10px] bg-[var(--yunda-bark)] px-7 py-3 text-sm text-[var(--yunda-petal)] font-bold transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(61,42,31,0.28)] active:translate-y-px focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-white">
            {{ c.primaryCta }}
          </NuxtLink>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.mhb-page {
  --mhb-focus: color-mix(in srgb, var(--yunda-maple) 80%, white 20%);
}

@media (prefers-reduced-motion: reduce) {
  .mhb-page *,
  .mhb-page *::before,
  .mhb-page *::after {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
</style>

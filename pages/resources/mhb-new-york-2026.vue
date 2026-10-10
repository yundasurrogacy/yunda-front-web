<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import OptimizedPicture from '@/components/base/OptimizedPicture.vue'
import {
  buildEventSchema,
  buildFAQPageSchema,
  buildWebPageSchema,
} from '~/utils/schema'

const PAGE_PATH = '/resources/mhb-new-york-2026'
const OFFICIAL_EVENT_URL = 'https://menhavingbabies.org/surrogacy-seminars/ny/'
const OFFICIAL_REGISTRATION_URL = 'https://menhavingbabies.org/surrogacy-seminars/ny/registration/'
const EVENT_STATE: 'upcoming' | 'past' = 'past'
const EVENT_START = '2026-09-25'
const EVENT_END = '2026-09-27'
const EVENT_IMAGES = [
  '/images/events/mhb-new-york-2026/yunda-mhb-introduction.webp',
  '/images/events/mhb-new-york-2026/conference-room.webp',
  '/images/events/mhb-new-york-2026/yunda-booth.webp',
  '/images/events/mhb-new-york-2026/booth-conversation.webp',
  '/images/events/mhb-new-york-2026/yunda-team-introduction.webp',
  '/images/events/mhb-new-york-2026/yunda-display.webp',
  '/images/events/mhb-new-york-2026/yunda-brochures.webp',
]
const EVENT_VIDEOS = {
  en: '/videos/mhb-new-york-2026/introduction-en.webm',
  zh: '/videos/mhb-new-york-2026/introduction-zh.webm',
  overview: '/videos/mhb-new-york-2026/event-overview.webm',
  expo: '/videos/mhb-new-york-2026/expo-floor.webm',
  conversation: '/videos/mhb-new-york-2026/booth-conversation.webm',
}
const { locale } = useI18n()
const galleryOrder = [9, 10, 11, 21, 23, 15, 1, 7, 2, 3, 4, 5, 6, 8, 12, 13, 14, 16, 17, 18, 19, 20, 22]
const galleryDescriptions = [
  ['Conference room', '会议现场'],
  ['Conversations in the expo hall', '展区交流'],
  ['Exhibitors and attendees', '参展方与参会者'],
  ['Conversation at Yunda’s booth', '孕达展位交流'],
  ['On-site discussion', '现场讨论'],
  ['Yunda team at the booth', '孕达展位团队'],
  ['Yunda representative with Dr. Diana Chavkin at SCRC’s booth', '孕达代表与 Diana Chavkin 医生在 SCRC 展位合影'],
  ['Yunda booth and display', '孕达展位与展示物料'],
  ['Yunda printed materials', '孕达印刷资料'],
  ['Yunda brochures and rainbow giveaways', '孕达折页与彩虹纪念品'],
  ['Yunda brochures', '孕达宣传折页'],
  ['Yunda branded giveaways', '孕达品牌纪念品'],
  ['Brochures on the display table', '展示桌上的宣传折页'],
  ['MHB sponsor badge and event agenda', 'MHB 赞助商胸牌与活动日程'],
  ['Yunda representative at the MHB backdrop', '孕达代表在 MHB 背景板前'],
  ['Yunda sponsor badge', '孕达赞助商胸牌'],
  ['Yunda representative in the expo hall', '孕达代表在展区'],
  ['On-site introduction', '现场介绍'],
  ['Yunda representative speaking at the event', '孕达代表介绍活动'],
  ['Yunda representative in the event reception area', '孕达代表在活动接待区'],
  ['Yunda representative outside the conference room', '孕达代表在会议室外'],
  ['Yunda representative near exhibitor displays', '孕达代表在参展展示区'],
  ['Visitors in the expo hall', '展区参观者'],
]
const galleryIndex = ref(0)
const showAllPhotos = ref(false)
const selectedVideoIndex = ref(0)
const sidebarVideoIndices = ref([1, 2, 3])
const hasSelectedVideo = ref(false)
function selectVideo(index: number) {
  const slot = sidebarVideoIndices.value.indexOf(index)
  if (slot < 0)
    return
  sidebarVideoIndices.value[slot] = selectedVideoIndex.value
  selectedVideoIndex.value = index
  hasSelectedVideo.value = true
}
let galleryTimer: ReturnType<typeof setInterval> | undefined
const galleryPhotos = computed(() => galleryOrder.map((number, index) => ({
  src: `/images/events/mhb-new-york-2026/gallery/photo-${String(number).padStart(2, '0')}.webp`,
  alt: `${galleryDescriptions[index]?.[locale.value === 'zh' ? 1 : 0]} · MHB New York 2026`,
})))
const visiblePhotos = computed(() => [0, 1, 2].map(offset => galleryPhotos.value[(galleryIndex.value + offset) % galleryPhotos.value.length]))
const factIcons = ['lucide:award', 'lucide:calendar-days', 'lucide:users-round', 'lucide:users-round']
function moveGallery(direction: number) {
  galleryIndex.value = (galleryIndex.value + direction + galleryOrder.length) % galleryOrder.length
}
onMounted(() => {
  galleryTimer = setInterval(() => moveGallery(1), 5000)
})
onBeforeUnmount(() => {
  if (galleryTimer)
    clearInterval(galleryTimer)
})

const translations = {
  en: {
    metaTitle: 'Yunda at MHB New York 2026 | Event Recap',
    metaDescription: 'See Yunda Surrogacy’s MHB New York 2026 event recap, on-site photos and videos, Silver Sponsor role, and resources for intended parents.',
    eyebrow: 'September 25-27, 2026 | New York',
    heroTitle: 'Yunda at MHB New York 2026',
    heroBody: 'A look back at Yunda’s Silver Sponsor presence, on-site conversations, photos, and videos from the September 2026 conference.',
    primaryCta: 'Plan My Private Consultation',
    officialCta: 'Official Event Details',
    previousPhotoLabel: 'Yunda at MHB New York 2026, September 25–27, 2026.',
    directTitle: 'What is MHB New York 2026?',
    directAnswer: 'MHB New York 2026 was a three-day surrogacy conference and expo organized by Men Having Babies on September 25–27, 2026, at The Westin New York at Times Square. Yunda Surrogacy participated as a Silver Sponsor and exhibitor, with conversations and a display booth throughout the event.',
    factsTitle: 'Event facts at a glance',
    facts: [
      { label: 'Location', value: 'New York, NY\nUnited States' },
      { label: 'Dates', value: 'September 25–27,\n2026' },
      { label: 'Our role', value: 'Silver Sponsor' },
      { label: 'Focus', value: 'Connect · Support ·\nBuild Families' },
    ],
    factsNote: '',
    registrationName: 'Standard prospective-parent registration',
    registrationNote: 'Historical registration information: MHB listed the standard fee as USD 75 per prospective parent, including meals and receptions, with member discounts available. The September 25-27, 2026 event has ended; this is not a current ticket offer.',
    registrationLink: 'Official registration information',
    audienceTitle: 'Who these resources are for',
    audiences: [
      { title: 'Gay couples and intended fathers', body: 'Prepare donor, embryo, parentage, matching, and birth-planning questions before speaking with providers.' },
      { title: 'LGBTQ+ families', body: 'Compare inclusive support, communication expectations, professional coordination, and the boundaries of each provider’s role.' },
      { title: 'Single intended parents', body: 'Clarify donor needs, support planning, costs, timing, and the professionals required for your individual path.' },
      { title: 'International intended parents', body: 'Organize cross-border questions about clinics, travel, translation, documents, time zones, and case communication.' },
    ],
    prepareTitle: 'Continue your research after MHB',
    prepareIntro: 'Use these guides to turn event conversations into specific next-step questions. Each linked page covers its topic in more detail.',
    prepareCards: [
      { number: '01', title: 'Process', question: 'Where are we starting, and what must happen before matching?', body: 'Map embryo status, donor needs, clinic readiness, screening, legal coordination, transfer, pregnancy, and birth planning.', to: '/surrogacy-process', link: 'Review the process' },
      { number: '02', title: 'Cost', question: 'Which costs are predictable, variable, or paid to third parties?', body: 'Separate agency coordination from surrogate-related, medical, legal, insurance, escrow, travel, and donor expenses.', to: '/surrogacy-cost', link: 'Review cost planning' },
      { number: '03', title: 'Egg donation', question: 'Do we need donor eggs, and how should clinic timing align?', body: 'Clarify donor selection, screening, embryo creation, clinic coordination, and what should be ready before a match.', to: '/egg-donation', link: 'Review egg donation' },
      { number: '04', title: 'Provider checklist', question: 'Which questions will help us compare providers consistently?', body: 'Use one written checklist for agency scope, screening, matching, costs, professional handoffs, communication, and support.', to: '/blog/mhb-new-york-2026-guide-gay-intended-parents', link: 'Use the provider checklist' },
      { number: '05', title: 'Consultation', question: 'What should a private planning call resolve first?', body: 'Bring your family structure, residence, embryo status, donor needs, preferred timing, and highest-priority questions.', to: '/be-parents', link: 'Plan a consultation' },
    ],
    journeyTitle: 'Build your next-step journey',
    journeyIntro: 'Use what you learned at the event to review family structure, process, cost, donor planning, and a private consultation.',
    journey: [
      { label: 'Family path', title: 'Gay and LGBTQ+ surrogacy', body: 'Use the dedicated guide for gay couples, LGBTQ+ families, and single intended parents when comparing donor planning, parentage coordination, matching, and communication.', to: '/single-parents-lgbtq' },
      { label: 'Sequence', title: 'Surrogacy process', body: 'Understand how the major stages connect without treating one conference conversation as a full plan.', to: '/surrogacy-process' },
      { label: 'Budget', title: 'Surrogacy cost', body: 'Prepare questions about included services, variables, third-party fees, and timing of funds.', to: '/surrogacy-cost' },
      { label: 'Embryos', title: 'Egg donation', body: 'Review donor and IVF clinic coordination if your path requires donor eggs.', to: '/egg-donation' },
      { label: 'Next step', title: 'Private consultation', body: 'Turn the questions you gathered into a case-specific planning conversation with Yunda.', to: '/be-parents' },
    ],
    galleryTitle: 'Yunda at MHB New York 2026',
    galleryIntro: 'Scenes from the conference, Yunda’s display, and on-site conversations.',
    galleryAlts: [
      'Yunda representative speaking in front of the MHB New York backdrop',
      'Conference room at MHB New York 2026',
      'Yunda Surrogacy display at MHB New York 2026',
      'Conversation at the Yunda display during MHB New York 2026',
      'Yunda representative introducing the event on site',
      'Yunda event display and printed materials',
      'Yunda Surrogacy brochures at the event',
    ],
    videoTitle: 'Watch the event footage',
    videoIntro: 'Play the introduction in English or Chinese, or browse three short on-site clips. Videos load only when you choose to play them.',
    videoLabels: ['English introduction', 'Chinese introduction', 'Conference overview', 'Expo floor', 'On-site conversation'],
    faqTitle: 'MHB New York 2026 FAQs',
    faqs: [
      { q: 'Who organized MHB New York 2026?', a: 'Men Having Babies organized the conference. Yunda participated as a Silver Sponsor.' },
      { q: 'What can I review after the event?', a: 'Watch the event videos, browse the on-site photographs, and use the provider checklist to organize questions about process, costs, coordination, and support.' },
      { q: 'Where can I find the complete provider-question checklist?', a: 'Use Yunda’s dedicated MHB New York 2026 provider checklist. It keeps detailed agency, screening, matching, cost, legal, insurance, escrow, and communication questions separate from this event page.' },
      { q: 'How can I contact Yunda after the event?', a: 'Use Yunda’s intended-parent consultation form to share your starting point and questions. The conference has ended, so this is a general consultation request rather than an event booking.' },
      { q: 'Are the photographs and videos from the 2026 New York event?', a: 'Yes. Yunda supplied these photographs and videos as material captured during the September 25–27, 2026 event.' },
    ],
    finalTitle: 'Turn conference questions into a private plan',
    finalBody: 'Tell us where you are starting, what is still unclear, and which decisions you want to make after the event.',
    statusUpcoming: 'Upcoming event guide',
    statusPast: 'Event recap and resource guide',
    breadcrumb: 'MHB New York 2026',
  },
  zh: {
    metaTitle: '孕达参展 MHB New York 2026｜活动回顾',
    metaDescription: '查看孕达在 MHB New York 2026 的活动回顾、现场照片与视频、银级赞助商身份及准父母后续阅读资源。',
    eyebrow: '2026 年 9 月 25-27 日 | 纽约',
    heroTitle: '孕达参加 MHB New York 2026',
    heroBody: '回顾孕达以银级赞助商身份参会的现场交流、照片与视频，继续整理成家规划问题。',
    primaryCta: '预约私密咨询',
    officialCta: '查看官方活动信息',
    previousPhotoLabel: '孕达参加 2026 年 9 月 25–27 日 MHB New York 活动的现场照片。',
    directTitle: 'MHB New York 2026 是什么？',
    directAnswer: 'MHB New York 2026 是由 Men Having Babies 主办的三天代孕会议与展会，于 2026 年 9 月 25–27 日在纽约时代广场威斯汀酒店举行。孕达以银级赞助商及参展方身份参加活动，现场设有展示区并参与交流。',
    factsTitle: '活动事实',
    facts: [
      { label: '地点', value: '美国纽约\nNew York, NY' },
      { label: '日期', value: '2026 年\n9 月 25–27 日' },
      { label: '我们的身份', value: '银级赞助商' },
      { label: '活动主题', value: '连接 · 支持 ·\n共建家庭' },
    ],
    factsNote: '',
    registrationName: '准父母标准报名',
    registrationNote: '历史报名信息：MHB 公布的准父母标准报名费为每人 75 美元，包含餐食和招待会，会员另有折扣。2026 年 9 月 25–27 日的活动已结束，此处记录历史费用，不代表当前仍可购票。',
    registrationLink: '官方报名信息',
    audienceTitle: '这些资源适合谁',
    audiences: [
      { title: '男同志伴侣与准爸爸', body: '继续梳理供卵、胚胎、亲权、匹配与出生规划问题。' },
      { title: 'LGBTQ+ 家庭', body: '比较包容性支持、沟通预期、专业协调方式和各服务方的职责边界。' },
      { title: '单身准父母', body: '梳理供体需求、支持计划、费用、时间和个案所需的专业人员。' },
      { title: '国际准父母', body: '提前整理诊所、旅行、翻译、文件、时区和跨境个案沟通问题。' },
    ],
    prepareTitle: '活动后继续梳理五项问题',
    prepareIntro: '把活动现场的交流整理成下一步问题。每个链接页面提供对应主题的更完整说明。',
    prepareCards: [
      { number: '01', title: '流程', question: '我们从哪里开始，匹配前必须完成什么？', body: '梳理胚胎、供体、诊所、筛查、法律协调、移植、孕期和出生规划。', to: '/surrogacy-process', link: '查看完整流程' },
      { number: '02', title: '费用', question: '哪些费用可预估，哪些会变化，哪些支付给第三方？', body: '区分机构协调、代孕妈妈、医疗、法律、保险、托管、旅行和供体费用。', to: '/surrogacy-cost', link: '查看费用规划' },
      { number: '03', title: '供卵', question: '我们是否需要供卵，诊所时间如何衔接？', body: '确认供卵选择、筛查、胚胎建立、诊所协调和匹配前准备。', to: '/egg-donation', link: '查看供卵指南' },
      { number: '04', title: '机构提问清单', question: '哪些问题能帮助我们用同一标准比较服务方？', body: '用一份书面清单核对机构职责、筛查、匹配、费用、专业方交接、沟通和支持。', to: '/blog/mhb-new-york-2026-guide-gay-intended-parents', link: '使用机构提问清单' },
      { number: '05', title: '咨询', question: '私密规划沟通首先应该解决什么？', body: '准备家庭结构、居住地、胚胎状态、供体需求、希望时间和优先问题。', to: '/be-parents', link: '提交咨询信息' },
    ],
    journeyTitle: '建立下一步阅读路径',
    journeyIntro: '结合活动收获，依次了解家庭结构、流程、费用、供体规划和私密咨询。',
    journey: [
      { label: '家庭路径', title: '男同志与 LGBTQ+ 代孕', body: '通过专题指南了解男同志伴侣、LGBTQ+ 家庭与单身准父母在供体规划、亲权协调、匹配和沟通方面的常见差异。', to: '/single-parents-lgbtq' },
      { label: '步骤', title: '代孕流程', body: '理解主要阶段如何连接，不把一次会议沟通当作完整个案方案。', to: '/surrogacy-process' },
      { label: '预算', title: '代孕费用', body: '准备服务范围、费用变量、第三方费用和资金时间问题。', to: '/surrogacy-cost' },
      { label: '胚胎', title: '供卵规划', body: '如需供卵，先了解供体与 IVF 诊所协调事项。', to: '/egg-donation' },
      { label: '下一步', title: '私密咨询', body: '把活动后整理的问题带入与你个案相关的孕达规划沟通。', to: '/be-parents' },
    ],
    galleryTitle: '孕达在 MHB New York 2026 的现场',
    galleryIntro: '这些照片记录会议、孕达展示区与现场交流。',
    galleryAlts: [
      '孕达代表在 MHB 活动背景板前介绍现场',
      'MHB New York 2026 会议现场',
      '孕达在 MHB New York 2026 的展示区',
      '孕达展示区的现场交流',
      '孕达代表在活动现场介绍展会',
      '孕达活动展示区和印刷资料',
      '活动现场的孕达宣传折页',
    ],
    videoTitle: '观看现场视频',
    videoIntro: '可选择中文或英文介绍视频，也可观看三段现场短片；点击播放时才加载视频。',
    videoLabels: ['英文介绍', '中文介绍', '会议概览', '展区现场', '现场交流'],
    faqTitle: 'MHB New York 2026 常见问题',
    faqs: [
      { q: 'MHB New York 2026 由谁组织？', a: 'Men Having Babies 是本次活动的主办方。孕达以银级赞助商身份参加了活动。' },
      { q: '活动结束后可以查看什么？', a: '可以观看现场视频、浏览照片，并使用机构提问清单继续整理流程、费用、协调与支持方面的问题。' },
      { q: '在哪里查看完整的机构提问清单？', a: '请使用孕达独立的 MHB New York 2026 机构提问清单。机构职责、筛查、匹配、费用、法律、保险、托管和沟通等详细问题均由该清单承接。' },
      { q: '活动后如何联系孕达？', a: '可通过孕达的准父母咨询表单说明起点和问题。活动已经结束，该表单用于一般咨询，而非活动现场预约。' },
      { q: '页面上的照片和视频来自 2026 年纽约活动吗？', a: '是。孕达提供并确认这些照片和视频均拍摄于 2026 年 9 月 25–27 日活动期间。' },
    ],
    finalTitle: '把活动后的问题转化为私密规划',
    finalBody: '告诉我们你的起点、尚未明确的问题，以及活动后希望继续梳理的决定。',
    statusUpcoming: '即将举行的活动指南',
    statusPast: '活动回顾与资源指南',
    breadcrumb: 'MHB New York 2026',
  },
} as const

const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || 'https://www.yundasurrogacy.com').replace(/\/$/, ''))
const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)
const inLanguage = computed(() => locale.value === 'zh' ? 'zh-CN' : 'en-US')
const pageUrl = computed(() => `${siteUrl.value}${localePath(PAGE_PATH)}`)
const heroImageUrl = computed(() => `${siteUrl.value}${EVENT_IMAGES[0]}`)
const eventVideoItems = computed(() => [
  { src: locale.value === 'zh' ? EVENT_VIDEOS.zh : EVENT_VIDEOS.en, poster: EVENT_IMAGES[0], label: c.value.videoLabels[locale.value === 'zh' ? 1 : 0] },
  { src: EVENT_VIDEOS.overview, poster: EVENT_IMAGES[1], label: c.value.videoLabels[2] },
  { src: EVENT_VIDEOS.expo, poster: EVENT_IMAGES[1], label: c.value.videoLabels[3] },
  { src: EVENT_VIDEOS.conversation, poster: EVENT_IMAGES[3], label: c.value.videoLabels[4] },
])
const selectedVideo = computed(() => eventVideoItems.value[selectedVideoIndex.value] || eventVideoItems.value[0])
const sidebarVideos = computed(() => sidebarVideoIndices.value.map(index => ({ ...eventVideoItems.value[index], index })))

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
  dateModified: '2026-10-09',
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
  eventStatus: EVENT_STATE === 'past' ? 'completed' : 'scheduled',
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
  // Official price checked on 2026-10-08; retain it as an expired historical offer.
  offers: [{
    name: c.value.registrationName,
    description: c.value.registrationNote,
    url: OFFICIAL_REGISTRATION_URL,
    price: 75,
    priceCurrency: 'USD',
    validThrough: EVENT_END,
  }],
  image: EVENT_IMAGES,
  inLanguage: inLanguage.value,
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
  script: [pageSchema.value, eventSchema.value, faqSchema.value].map((schema, index) => ({
    key: `schema-mhb-new-york-2026-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div class="mhb-page min-h-screen overflow-x-clip bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />

    <main>
      <section class="relative isolate overflow-hidden bg-[var(--yunda-petal)]">
        <div class="grid mx-auto max-w-[1240px] items-center gap-8 px-6 py-10 md:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-14 md:px-10">
          <div class="relative z-[1] max-w-[650px]">
            <NuxtLink :to="localePath('/resources')" class="mb-8 inline-flex items-center gap-2 text-sm text-[var(--yunda-maple)] underline underline-offset-4">
              <Icon name="radix-icons:arrow-left" />{{ locale === 'zh' ? '返回资源中心' : 'Back to Resources' }}
            </NuxtLink>
            <p class="text-[12px] text-[var(--yunda-maple)] font-extrabold tracking-[0.15em] uppercase">
              {{ c.eyebrow }}
            </p>
            <h1 class="mt-5 max-w-[18ch] text-[42px] font-semibold leading-[1.02] tracking-[-0.035em] font-display lg:text-[66px] sm:text-[52px]">
              {{ c.heroTitle }}
            </h1>
            <div class="mt-6 flex flex-wrap items-center gap-5 text-sm font-semibold">
              <span class="inline-flex items-center gap-2"><Icon name="lucide:calendar-days" class="h-5 w-5 text-[var(--yunda-maple)]" />{{ c.facts[1].value }}</span>
              <span class="inline-flex items-center gap-2"><Icon name="lucide:award" class="h-5 w-5 text-[var(--yunda-maple)]" />{{ c.facts[2].value }}</span>
            </div>
            <p class="mt-6 max-w-[540px] text-base text-[var(--yunda-bark)]/82 leading-[1.7] sm:text-lg">
              {{ c.heroBody }}
            </p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <NuxtLink :to="localePath('/be-parents')" class="min-h-12 inline-flex items-center justify-center whitespace-nowrap rounded-[10px] bg-[var(--yunda-maple)] px-6 py-3 text-sm text-white font-bold transition-[transform,box-shadow] active:translate-y-px hover:shadow-[0_12px_28px_rgba(169,82,36,0.24)] focus-visible:outline-3 focus-visible:outline-[var(--yunda-bark)] focus-visible:outline-offset-3 hover:-translate-y-0.5">
                {{ c.primaryCta }}
              </NuxtLink>
              <a :href="OFFICIAL_EVENT_URL" target="_blank" rel="noopener noreferrer" class="min-h-12 inline-flex items-center justify-center whitespace-nowrap border-2 border-[var(--yunda-bark)] rounded-[10px] bg-transparent px-6 py-3 text-sm text-[var(--yunda-bark)] font-bold transition-colors active:translate-y-px hover:border-[var(--yunda-maple)] hover:text-[var(--yunda-maple)] focus-visible:outline-3 focus-visible:outline-[var(--yunda-maple)] focus-visible:outline-offset-3">
                {{ c.officialCta }}
              </a>
            </div>
          </div>

          <figure class="mx-auto max-w-[690px] w-full">
            <OptimizedPicture src="/images/events/mhb-new-york-2026/gallery/photo-07.webp" :alt="c.galleryAlts[2]" width="1368" height="1824" loading="eager" fetchpriority="high" picture-class="block overflow-hidden rounded-[12px]" img-class="mhb-hero-photo w-full object-cover" />
          </figure>
        </div>
      </section>

      <section class="bg-[var(--yunda-petal)] py-16 lg:py-24">
        <div class="grid mx-auto max-w-[1180px] gap-10 px-6 md:grid-cols-[0.78fr_1.22fr] lg:gap-16 md:px-10">
          <h2 class="max-w-[14ch] text-[34px] font-semibold leading-[1.12] tracking-[-0.025em] font-display lg:text-[46px]">
            {{ c.directTitle }}
          </h2>
          <p class="text-[17px] text-[var(--yunda-bark)]/82 leading-[1.9] lg:text-lg">
            {{ c.directAnswer }}
          </p>
        </div>
      </section>

      <section class="bg-white py-16 lg:py-22">
        <div class="mx-auto max-w-[1180px] px-6 md:px-10">
          <h2 class="text-[34px] font-semibold leading-tight font-display lg:text-[44px]">
            {{ c.factsTitle }}
          </h2>
          <dl class="mhb-facts-strip mt-9">
            <div v-for="(fact, index) in c.facts" :key="fact.label">
              <Icon :name="factIcons[index]" class="mhb-fact-icon" aria-hidden="true" />
              <dt class="text-xs text-[var(--yunda-maple)] font-extrabold tracking-[0.12em] uppercase">
                {{ fact.label }}
              </dt>
              <dd class="mt-3 text-lg font-bold leading-snug">
                {{ fact.value }}
              </dd>
            </div>
          </dl>
        </div>
      </section>

      <section class="bg-[var(--yunda-petal)] py-16 lg:py-24">
        <div class="mx-auto max-w-[1180px] px-6 md:px-10">
          <h2 class="text-[34px] font-semibold leading-tight font-display md:whitespace-nowrap lg:text-[44px]">
            {{ c.audienceTitle }}
          </h2>
          <div class="grid mt-10 gap-x-8 gap-y-10 md:grid-cols-2">
            <article v-for="(item, index) in c.audiences" :key="item.title" class="grid grid-cols-[42px_1fr] gap-4 border-t border-[var(--yunda-bark)]/18 pt-5">
              <span class="text-2xl text-[var(--yunda-maple)] font-semibold font-display">{{ String(index + 1).padStart(2, '0') }}</span>
              <div>
                <h3 class="text-[24px] font-semibold leading-snug font-display">
                  {{ item.title }}
                </h3>
                <p class="mt-3 text-[15px] text-[var(--yunda-bark)]/78 leading-[1.75]">
                  {{ item.body }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="bg-[var(--yunda-petal)] py-16 lg:py-24">
        <div class="mx-auto max-w-[1240px] px-6 md:px-10">
          <div class="flex flex-wrap items-center justify-between gap-4">
            <h2 class="text-[34px] font-semibold leading-tight font-display lg:text-[44px]">
              {{ locale === 'zh' ? '活动精彩瞬间' : 'Event Highlights' }}
            </h2>
            <button type="button" :aria-expanded="showAllPhotos" aria-controls="mhb-all-photos" class="mhb-text-button" @click="showAllPhotos = !showAllPhotos">
              {{ showAllPhotos ? (locale === 'zh' ? '收起照片' : 'Hide all photos') : (locale === 'zh' ? '查看全部照片' : 'View all photos') }} <span aria-hidden="true">→</span>
            </button>
          </div>
          <p class="mt-4 max-w-[65ch] text-base text-[var(--yunda-bark)]/75 leading-relaxed">
            {{ c.galleryIntro }}
          </p>
          <div class="mhb-carousel mt-8" role="region" aria-roledescription="carousel" :aria-label="c.galleryTitle" tabindex="0" @keydown.left.prevent="moveGallery(-1)" @keydown.right.prevent="moveGallery(1)">
            <div class="mhb-gallery-pair">
              <figure v-for="(photo, slot) in visiblePhotos" :key="slot" :class="{ 'mhb-second-photo': slot === 1 }">
                <OptimizedPicture v-if="photo" :src="photo.src" :alt="photo.alt" width="1200" height="1200" loading="lazy" picture-class="block overflow-hidden rounded-[12px] bg-white" img-class="mhb-gallery-image w-full object-cover" />
              </figure>
            </div>
            <div class="mhb-gallery-controls">
              <button type="button" class="mhb-arrow" :aria-label="locale === 'zh' ? '上一张照片' : 'Previous photo'" @click="moveGallery(-1)">
                <Icon name="radix-icons:chevron-left" />
              </button>
              <span aria-live="polite" aria-atomic="true">{{ String(galleryIndex + 1).padStart(2, '0') }} / {{ galleryPhotos.length }}</span>
              <button type="button" class="mhb-arrow" :aria-label="locale === 'zh' ? '下一张照片' : 'Next photo'" @click="moveGallery(1)">
                <Icon name="radix-icons:chevron-right" />
              </button>
            </div>
          </div>
          <div v-if="showAllPhotos" id="mhb-all-photos" class="mhb-all-photos mt-8">
            <figure v-for="photo in galleryPhotos" :key="photo.src">
              <OptimizedPicture :src="photo.src" :alt="photo.alt" width="1200" height="900" loading="lazy" picture-class="block overflow-hidden rounded-[12px]" img-class="aspect-[4/3] w-full object-cover" />
            </figure>
          </div>
        </div>
      </section>

      <section class="bg-[var(--yunda-petal)] py-16 lg:py-24">
        <div class="mx-auto max-w-[1240px] px-6 md:px-10">
          <h2 class="text-[34px] font-semibold leading-tight font-display lg:text-[44px]">
            {{ c.videoTitle }}
          </h2>
          <p class="mt-4 max-w-[65ch] text-base text-[var(--yunda-bark)]/75 leading-relaxed">
            {{ locale === 'zh' ? '观看中文介绍与 MHB 纽约活动的现场短片。' : 'Watch our English introduction and short clips from MHB New York 2026.' }}
          </p>
          <div class="mhb-video-layout mt-8">
            <Transition name="mhb-featured" mode="out-in">
              <figure v-if="selectedVideo" :key="selectedVideo.src" class="mhb-video mhb-featured-video">
                <video :poster="selectedVideo.poster" :aria-label="selectedVideo.label" :autoplay="hasSelectedVideo" controls preload="none" playsinline class="w-full object-contain">
                  <source :src="selectedVideo.src" type="video/webm">
                </video>
                <figcaption class="px-5 py-3 text-sm font-bold">
                  {{ selectedVideo.label }}
                </figcaption>
              </figure>
            </Transition>
            <div class="mhb-video-list">
              <h3 class="mhb-video-list-title">
                {{ locale === 'zh' ? '更多现场瞬间' : 'More onsite moments' }}
              </h3>
              <TransitionGroup name="mhb-sidebar">
                <button v-for="video in sidebarVideos" :key="video.src" type="button" class="mhb-video-item" :aria-label="`${locale === 'zh' ? '播放' : 'Play'} ${video.label}`" @click="selectVideo(video.index)">
                  <span class="mhb-video-thumbnail">
                    <img :src="video.poster" alt="" loading="lazy" width="320" height="180">
                    <span class="mhb-video-play"><Icon name="lucide:play" aria-hidden="true" /></span>
                  </span>
                  <span class="mhb-video-label">{{ video.label }}</span>
                </button>
              </TransitionGroup>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-[var(--yunda-bark)] py-16 text-[var(--yunda-petal)] lg:py-24">
        <div class="mx-auto max-w-[1180px] px-6 md:px-10">
          <h2 class="text-[34px] font-semibold leading-tight font-display lg:text-[44px]">
            {{ c.journeyTitle }}
          </h2>
          <p class="mt-4 max-w-[65ch] text-base text-[var(--yunda-petal)]/78 leading-relaxed">
            {{ c.journeyIntro }}
          </p>
          <ol class="mhb-journey-grid mt-10">
            <li v-for="(item, index) in c.journey" :key="item.to" class="mhb-journey-card">
              <div class="flex items-center justify-between gap-3">
                <span class="text-xs text-[var(--yunda-harvest)] font-extrabold tracking-[0.11em] uppercase">{{ String(index + 1).padStart(2, '0') }} · {{ item.label }}</span>
              </div>
              <h3 class="mt-5 text-[22px] font-semibold leading-tight font-display">
                {{ item.title }}
              </h3>
              <p class="mt-3 text-sm text-[var(--yunda-petal)]/74 leading-[1.7]">
                {{ item.body }}
              </p>
              <NuxtLink :to="localePath(item.to)" class="mt-5 inline-flex text-sm text-[var(--yunda-harvest)] font-bold underline underline-offset-4 focus-visible:outline-3 focus-visible:outline-[var(--yunda-harvest)] focus-visible:outline-offset-3">
                {{ locale === 'zh' ? '继续阅读' : 'Continue reading' }}
              </NuxtLink>
            </li>
          </ol>
        </div>
      </section>

      <section class="bg-[var(--yunda-petal)] py-16 lg:py-24">
        <div class="mx-auto max-w-[1180px] px-6 md:px-10">
          <div>
            <h2 class="text-[34px] font-semibold leading-tight font-display lg:text-[44px]">
              {{ c.faqTitle }}
            </h2>
            <div class="mt-8 space-y-3">
              <details v-for="item in c.faqs" :key="item.q" class="group border border-[var(--yunda-bark)]/13 rounded-[12px] bg-[var(--yunda-petal)]/38">
                <summary class="flex cursor-pointer list-none items-center justify-between gap-5 px-5 py-5 text-base font-bold leading-snug lg:px-6 focus-visible:outline-3 focus-visible:outline-[var(--yunda-maple)] focus-visible:outline-offset-2">
                  {{ item.q }}
                  <Icon name="radix-icons:chevron-down" class="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                </summary>
                <p class="px-5 pb-5 text-[15px] text-[var(--yunda-bark)]/78 leading-[1.8] lg:px-6">
                  {{ item.a }}
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <section class="mhb-final-cta px-6 py-14 lg:py-20 md:px-10">
        <div class="mhb-final-inner mx-auto max-w-[1120px] text-center">
          <p class="mhb-final-kicker">
            {{ locale === 'zh' ? '下一步' : 'TAKE THE NEXT STEP' }}
          </p>
          <h2 class="mx-auto max-w-[24ch] text-[34px] font-semibold leading-tight font-display lg:text-[46px]">
            {{ locale === 'zh' ? '自信地规划你的家庭' : 'Plan your family with confidence' }}
          </h2>
          <p class="mx-auto mt-4 max-w-[60ch] text-base leading-relaxed">
            {{ c.finalBody }}
          </p>
          <NuxtLink :to="localePath('/be-parents')" class="mhb-final-button mt-7 min-h-12 inline-flex items-center justify-center whitespace-nowrap rounded-[10px] px-7 py-3 text-sm font-bold transition-transform focus-visible:outline-3 focus-visible:outline-offset-3 hover:-translate-y-0.5">
            {{ c.primaryCta }} <span aria-hidden="true">→</span>
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
  --yunda-bark: #3c2415;
  --yunda-petal: #ffffff;
  --yunda-maple: #c17c45;
}

.mhb-hero-photo {
  aspect-ratio: 4 / 3;
  max-height: 560px;
  object-fit: cover;
  object-position: center;
}

.mhb-text-button {
  color: var(--yunda-maple);
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: underline;
  text-underline-offset: 0.25rem;
}

.mhb-carousel {
  position: relative;
}

.mhb-gallery-pair {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1rem;
}

.mhb-gallery-pair img {
  background: #ffffff;
  object-fit: cover;
}

.mhb-gallery-pair :deep(.mhb-gallery-image) {
  aspect-ratio: 1;
  height: auto;
  display: block;
}

.mhb-facts-strip {
  background: #faf0e8;
  border: 0;
  border-radius: 8px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  overflow: hidden;
  padding: 1.5rem 0;
  font-family: sans-serif;
}

.mhb-facts-strip > div {
  align-items: flex-start;
  display: grid;
  grid-template-columns: 2rem 1fr;
  column-gap: 1rem;
  padding: 0 1.75rem;
}

.mhb-fact-icon {
  color: #c65537;
  height: 2rem;
  margin-top: 0.1rem;
  width: 2rem;
  grid-row: span 2;
}

.mhb-facts-strip dt,
.mhb-facts-strip dd {
  grid-column: 2;
}

.mhb-facts-strip > div + div {
  border-left: 1px solid color-mix(in srgb, var(--yunda-maple) 24%, transparent);
}

.mhb-facts-strip dt {
  color: #c65537;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.mhb-facts-strip dd {
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.35;
  margin-top: 0.35rem;
  white-space: pre-line;
  color: #414141;
  font-weight: 500;
}

.mhb-gallery-controls {
  align-items: center;
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  margin-top: 1rem;
}

.mhb-arrow {
  align-items: center;
  background: var(--yunda-maple);
  border-radius: 999px;
  color: white;
  display: inline-flex;
  height: 2.2rem;
  justify-content: center;
  transition:
    transform 180ms ease,
    background-color 180ms ease;
  width: 2.2rem;
}

.mhb-arrow:hover {
  background: var(--yunda-bark);
  transform: translateY(-1px);
}
.mhb-arrow:focus-visible,
.mhb-text-button:focus-visible {
  outline: 3px solid var(--mhb-focus);
  outline-offset: 3px;
}

.mhb-all-photos {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.mhb-video-layout {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
  align-items: stretch;
}

.mhb-video-list {
  display: grid;
  gap: 1rem;
  grid-template-rows: auto repeat(3, minmax(0, 1fr));
  position: relative;
}

.mhb-video {
  background: var(--yunda-petal);
  border: 1px solid color-mix(in srgb, var(--yunda-bark) 14%, transparent);
  border-radius: 0.75rem;
  overflow: hidden;
}

.mhb-featured-video video {
  aspect-ratio: 16 / 10;
  display: block;
  background: #171717;
}

.mhb-video-item {
  align-items: center;
  background: #ffffff;
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  gap: 1rem;
  min-height: 0;
  text-align: left;
  border: 0;
  padding: 0;
  cursor: pointer;
}

.mhb-video-thumbnail {
  align-self: stretch;
  min-height: 6rem;
  position: relative;
  overflow: hidden;
  border-radius: 6px;
}

.mhb-video-thumbnail img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mhb-video-play {
  position: absolute;
  inset: 0;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  background: white;
  color: var(--yunda-bark);
}

.mhb-video-play :deep(svg) {
  width: 1rem;
  height: 1rem;
  fill: currentColor;
}

.mhb-video-label,
.mhb-video-list-title {
  font-family: sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5;
}

.mhb-video-item:hover .mhb-video-play {
  color: var(--yunda-maple);
}

.mhb-video-item:focus-visible {
  outline: 3px solid var(--mhb-focus);
  outline-offset: 4px;
}

.mhb-featured-enter-active,
.mhb-featured-leave-active,
.mhb-sidebar-enter-active,
.mhb-sidebar-leave-active,
.mhb-sidebar-move {
  transition:
    opacity 220ms ease,
    transform 220ms ease;
}

.mhb-featured-enter-from,
.mhb-featured-leave-to {
  opacity: 0;
  transform: translateX(-12px);
}

.mhb-sidebar-enter-from,
.mhb-sidebar-leave-to {
  opacity: 0;
  transform: translateX(12px);
}

.mhb-sidebar-leave-active {
  position: absolute;
}

@media (prefers-reduced-motion: reduce) {
  .mhb-featured-enter-active,
  .mhb-featured-leave-active,
  .mhb-sidebar-enter-active,
  .mhb-sidebar-leave-active,
  .mhb-sidebar-move {
    transition: none;
  }
}

.mhb-research {
  display: grid;
  gap: 3rem;
  grid-template-columns: minmax(220px, 0.7fr) minmax(0, 1.3fr);
}

.mhb-resource-list {
  display: grid;
  gap: 0.65rem;
}
.mhb-resource-row {
  border: 1px solid color-mix(in srgb, var(--yunda-bark) 15%, transparent);
  border-radius: 0.75rem;
  display: grid;
  gap: 0.45rem;
  grid-template-columns: 7rem 13rem minmax(0, 1fr) auto;
  padding: 1rem 1.25rem;
  transition:
    border-color 180ms ease,
    transform 180ms ease;
}
.mhb-resource-row:hover {
  border-color: var(--yunda-maple);
  transform: translateX(2px);
}
.mhb-resource-row h3 {
  font-size: 1rem;
}
.mhb-resource-row p {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
}
.mhb-resource-row p:first-of-type {
  font-weight: 700;
}
.mhb-resource-row a {
  align-self: center;
  white-space: nowrap;
}

.mhb-journey-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(6, minmax(0, 1fr));
}
.mhb-journey-card {
  border: 1px solid color-mix(in srgb, var(--yunda-petal) 35%, transparent);
  border-radius: 0.75rem;
  display: flex;
  flex-direction: column;
  min-height: 230px;
  padding: 1.35rem;
}
.mhb-journey-card:nth-child(-n + 3) {
  grid-column: span 2;
}
.mhb-journey-card:nth-child(n + 4) {
  grid-column: span 3;
}
.mhb-journey-card a {
  margin-top: auto;
}

.mhb-final-cta {
  background: #f8ede2;
  overflow: hidden;
  position: relative;
}

.mhb-final-cta::before,
.mhb-final-cta::after {
  background: #e8b99f;
  border-radius: 58% 42% 62% 38%;
  content: '';
  height: 10rem;
  opacity: 0.55;
  position: absolute;
  width: 15rem;
}

.mhb-final-cta::before {
  left: -4rem;
  top: 2rem;
  transform: rotate(25deg);
}

.mhb-final-cta::after {
  bottom: -3rem;
  right: -3rem;
  transform: rotate(-25deg);
}

.mhb-final-inner {
  position: relative;
  z-index: 1;
}

.mhb-final-kicker {
  color: var(--yunda-maple);
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.mhb-final-button {
  background: var(--yunda-maple);
  color: white;
  gap: 0.6rem;
}

@media (max-width: 767px) {
  .mhb-gallery-pair,
  .mhb-video-layout,
  .mhb-research {
    grid-template-columns: 1fr;
  }
  .mhb-video-item {
    grid-template-columns: 9rem 1fr;
  }
  .mhb-gallery-pair {
    grid-template-columns: 1fr;
  }
  .mhb-gallery-pair figure:not(:first-child) {
    display: none;
  }
  .mhb-all-photos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .mhb-facts-strip {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .mhb-facts-strip > div:nth-child(odd) {
    border-left: 0;
  }
  .mhb-facts-strip > div:nth-child(n + 3) {
    border-top: 1px solid color-mix(in srgb, var(--yunda-maple) 24%, transparent);
  }
  .mhb-resource-row {
    grid-template-columns: 4.5rem 1fr;
  }
  .mhb-resource-row a {
    grid-column: 2;
  }
  .mhb-journey-grid {
    grid-template-columns: 1fr;
  }
  .mhb-journey-card:nth-child(n) {
    grid-column: span 1;
    min-height: 0;
  }
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

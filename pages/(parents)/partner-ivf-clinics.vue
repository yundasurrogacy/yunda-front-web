<script setup lang="ts">
import type { ResourcesInstagramResponse } from '~/server/utils/resources-instagram-types'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import BreadcrumbNav from '@/components/base/BreadcrumbNav.vue'
import OptimizedPicture from '@/components/base/OptimizedPicture.vue'
import SeoTrustNote from '@/components/base/SeoTrustNote.vue'
import { RESOURCES_INSTAGRAM_POSTS } from '~/utils/resources-instagram-posts'
import { buildCoreServicePageSchemas } from '~/utils/schema'

const localePath = useLocalePath()
const { locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const dateModified = '2026-07-23'
const reviewerId = computed(() => `${siteUrl.value || 'https://www.yundasurrogacy.com'}/about#kayla-luo`)

interface SurrogateUpdateCard {
  id: string
  url: string
  image: string
  likes: number | null
  comments: number | null
}

const surrogateUpdatesBase: SurrogateUpdateCard[] = RESOURCES_INSTAGRAM_POSTS
  .filter(post => post.section === 'updates')
  .map(post => ({
    id: post.id,
    url: post.url,
    image: post.fallbackImage,
    likes: post.fallbackLikes,
    comments: post.fallbackComments,
  }))

const { data: instagramFeed } = useFetch<ResourcesInstagramResponse>('/api/resources/instagram', {
  lazy: true,
})

const translations = {
  en: {
    seoTitle: 'IVF Clinic Coordination for Surrogacy | Yunda',
    seoDescription:
      'Already have an IVF clinic—or need help evaluating one? See how Yunda coordinates clinic records, surrogate screening, legal clearance, and transfer timing.',
    breadcrumbParent: 'For Intended Parents',
    breadcrumbCurrent: 'IVF Clinic Coordination',
    eyebrow: 'For intended parents',
    heroTitle: 'IVF Clinic Coordination for Your Surrogacy Journey',
    heroDescription:
      'Already have embryos or an IVF team? Yunda connects clinic requirements with surrogate screening, legal clearance, and the transfer plan. Still choosing a clinic? We help you prepare the right questions and understand how each clinic works with gestational carriers—while licensed fertility specialists make every medical decision.',
    ctaPrimary: 'Plan My Clinic Coordination',
    ctaSecondary: 'See the Coordination Steps',
    heroImgAlt: 'Yunda team members visiting HRC Fertility with a client',
    pathsTitle: 'Start From Where You Are',
    pathsIntro:
      'You do not need to restart your fertility plan to begin a surrogacy conversation. We first document what is already in place, then identify the handoffs that still need owners.',
    paths: [
      {
        label: 'Path 1',
        title: 'I already have a clinic or embryos',
        body: 'Keep your existing medical team when the clinic accepts gestational-carrier cases and its current requirements can be met.',
        items: [
          'Share your clinic contact, embryo status, and available records.',
          'Confirm the clinic’s gestational-carrier criteria and screening workflow.',
          'Align surrogate matching, medical review, legal clearance, and transfer scheduling.',
        ],
      },
      {
        label: 'Path 2',
        title: 'I still need a clinic or embryos',
        body: 'Clarify the medical services you need before comparing location, timing, communication, and third-party reproduction experience.',
        items: [
          'Identify whether you need embryo creation, donor eggs, or transfer-only care.',
          'Compare services, gestational-carrier experience, scheduling, and communication.',
          'Ask each clinic to confirm availability, fees, medical requirements, and next steps.',
        ],
      },
    ],
    clinicsEyebrow: 'Clinic collaboration',
    clinicsTitle: 'How Yunda Works With IVF Clinics',
    clinicsIntro:
      'Whether you bring an existing IVF clinic or are still evaluating your options, Yunda helps organize the non-medical work around the clinic’s requirements. The clinic remains responsible for medical review, treatment, and clinical decisions.',
    clinicSupport: [
      {
        title: 'Prepare records for clinic review',
        body: 'We organize available case records, confirm requested documents, and coordinate secure handoffs so the clinic can complete its own review.',
      },
      {
        title: 'Coordinate screenings and appointments',
        body: 'We help align scheduling, local monitoring, travel, and record delivery according to the clinic’s current protocol.',
      },
      {
        title: 'Keep time-sensitive communication moving',
        body: 'We follow open questions and milestone updates across intended parents, the surrogate, the clinic, and independent professionals.',
      },
      {
        title: 'Support the transfer handoff',
        body: 'We track non-medical readiness, legal-clearance communication, logistics, and outstanding confirmations while the clinic directs medical care.',
      },
    ],
    clinicsBoundary:
      'Yunda does not publish or imply a clinic ranking on this page. Each clinic confirms its own availability, services, requirements, fees, medical decisions, and reported outcomes.',
    rolesTitle: 'Who Decides What?',
    rolesIntro:
      'Clear ownership helps prevent medical, legal, and case-management decisions from being confused or delayed.',
    roles: [
      {
        title: 'IVF clinic',
        items: [
          'Medical eligibility and testing',
          'Treatment protocol and medication',
          'Embryo transfer and clinical advice',
        ],
      },
      {
        title: 'Yunda Surrogacy',
        items: [
          'Records and appointment coordination',
          'Communication and case milestones',
          'Travel, logistics, and team handoffs',
        ],
      },
      {
        title: 'Independent professionals',
        items: [
          'Attorneys confirm legal advice and clearance',
          'Insurance professionals confirm reviews and coverage',
          'Escrow professionals confirm payment processes',
        ],
      },
    ],
    workflowEyebrow: 'Coordination workflow',
    workflowTitle: 'How IVF Clinic Coordination Works',
    workflowIntro:
      'The exact sequence depends on your clinic and case, but these four handoffs keep the medical and non-medical work connected.',
    workflowSteps: [
      {
        title: 'Clarify your starting point',
        body: 'We document your clinic, embryo, donor, location, and timing status so the next team does not have to guess.',
      },
      {
        title: 'Confirm clinic requirements',
        body: 'The clinic identifies the records, carrier screening, medical review, and scheduling requirements it uses for your case.',
      },
      {
        title: 'Align matching and clearance',
        body: 'Yunda coordinates records and milestones across surrogate matching, clinic review, independent legal work, and related case planning.',
      },
      {
        title: 'Prepare the transfer handoff',
        body: 'We help keep appointments, documents, travel, and communication organized while the clinic directs medical care.',
      },
    ],
    checklistTitle: 'Questions to Ask an IVF Clinic About Surrogacy',
    checklist: [
      'How often does the clinic work with gestational carriers and third-party reproduction?',
      'What records and screening does the clinic require before it will review a carrier?',
      'Does it provide the embryo creation, donor-egg coordination, genetic-testing coordination, cryostorage, or transfer-only care you need?',
      'Can monitoring happen near the surrogate, and how will records be shared?',
      'What are the current scheduling windows, fees, medication process, and cancellation policy?',
      'Who is the day-to-day contact for intended parents, the surrogate, and the agency?',
      'How does the clinic report ART outcomes, and which patient group or treatment definition applies to the number you are reviewing?',
    ],
    dataTitle: 'Put success-rate data in context',
    dataBody:
      'CDC publishes clinic-specific and national ART data, and SART provides patient-facing success-rate tools. Patient populations, treatment methods, egg or embryo sources, and reporting definitions differ, so published rates do not predict one person’s outcome. Ask the clinic to explain which data applies to your plan.',
    cdcLink: 'Review CDC ART data',
    sartLink: 'Review SART success-rate guidance',
    updatesTitle: 'Surrogates Updates',
    updatesIntro:
      'Follow our surrogates through checkups, appointments, and special milestones as each journey moves forward.',
    igViewPost: 'View on Instagram',
    internationalTitle: 'International or Donor-Assisted Journey?',
    internationalBody:
      'Ask early about time-zone communication, translated records, embryo or donor-tissue transport, local monitoring, travel, and who can receive clinical instructions.',
    internationalLinkPrefix: 'If you still need donor eggs or embryo creation, review our ',
    internationalLink: 'donor egg and IVF planning guide',
    internationalLinkSuffix: ' before the clinic handoff.',
    relatedTitle: 'Keep each decision with its source-of-truth page',
    relatedLinks: [
      { label: 'Full surrogacy process', to: '/surrogacy-process' },
      { label: 'Legal, insurance, and escrow coordination', to: '/surrogacy-protection-california' },
      { label: 'Surrogacy cost categories', to: '/surrogacy-cost' },
    ],
    trustUpdated: 'Last updated: July 23, 2026',
    trustReviewed: 'Reviewed by Kayla Luo, Vice President, North America',
    trustNote:
      'Yunda provides education, coordination, and case-management support. Yunda is not an IVF clinic, medical provider, law firm, insurance company, or escrow company. Clinics and licensed professionals make their own medical, legal, insurance, and financial determinations.',
    sourceAsrm: 'ASRM gestational-carrier guidance',
    sourceCdc: 'CDC ART Success Rates',
    sourceCdcInterpret: 'CDC: interpret ART rates',
    sourceSart: 'SART Success Rates',
    faqTitle: 'IVF Clinic Coordination FAQ',
    faqs: [
      {
        q: 'Can I keep my current IVF clinic for surrogacy?',
        a: 'Often, yes, if the clinic currently accepts gestational-carrier cases and its requirements can be met. The clinic must confirm medical eligibility, records, screening, services, and timing.',
      },
      {
        q: 'What if I have embryos but no surrogate?',
        a: 'Yunda can begin intended-parent intake and surrogate matching while coordinating with your clinic on its carrier criteria and record requirements.',
      },
      {
        q: 'What if I do not have embryos yet?',
        a: 'Start by confirming whether you will use your own eggs, donor eggs, or existing embryos. A licensed fertility clinic will advise on treatment; Yunda can coordinate the surrounding surrogacy plan.',
      },
      {
        q: 'Does Yunda choose my medical treatment or guarantee a clinic result?',
        a: 'No. Clinics and licensed physicians make medical decisions. Yunda coordinates communication and case milestones and does not guarantee acceptance, timing, pregnancy, or outcomes.',
      },
      {
        q: 'How should I compare clinic success rates?',
        a: 'Review CDC or SART data, then ask the clinic which patient population, egg or embryo source, cycle type, and reporting definition apply. Published rates do not predict one person’s outcome.',
      },
      {
        q: 'When should the IVF clinic and surrogacy agency start coordinating?',
        a: 'As early as possible—especially before surrogate medical screening—so records, clinic criteria, legal timing, travel, and transfer planning can be aligned.',
      },
    ],
    finalTitle: 'Bring Your Clinic Plan Into One Coordinated Journey',
    finalBody:
      'Tell us whether you already have a clinic and embryos, still need to create embryos, or need help organizing the next handoffs.',
    finalCta: 'Plan My Next Steps',
  },
  zh: {
    seoTitle: '代孕 IVF 诊所协调与合作诊所｜孕达代孕',
    seoDescription: '已有 IVF 诊所，或仍在选择诊所？了解孕达如何衔接诊所资料、代孕妈妈筛查、法律放行与移植排期。',
    breadcrumbParent: '准父母指南',
    breadcrumbCurrent: 'IVF 诊所协调',
    eyebrow: '准父母服务',
    heroTitle: '为你的代孕旅程协调 IVF 诊所',
    heroDescription:
      '已有胚胎或 IVF 团队？孕达会衔接诊所要求、代孕妈妈筛查、法律放行与移植计划。仍在选择诊所？我们帮助你整理关键问题，了解各诊所如何处理妊娠代孕个案；所有医疗决定仍由持牌生殖专家作出。',
    ctaPrimary: '规划我的诊所协调',
    ctaSecondary: '查看协调步骤',
    heroImgAlt: '孕达团队陪同客户到访 HRC Fertility',
    pathsTitle: '从你现在的阶段开始',
    pathsIntro: '开始代孕咨询，并不意味着要推翻已有的生育计划。我们会先梳理已完成事项，再确认后续交接由谁负责。',
    paths: [
      {
        label: '路径 1',
        title: '我已有诊所或胚胎',
        body: '如果原诊所接收妊娠代孕个案，并且可以满足其现行要求，你通常可以继续使用原医疗团队。',
        items: [
          '提供诊所联系人、胚胎状态和现有资料。',
          '确认诊所对妊娠代孕妈妈的标准和筛查流程。',
          '衔接代孕妈妈匹配、医学审核、法律放行和移植排期。',
        ],
      },
      {
        label: '路径 2',
        title: '我仍需选择诊所或创建胚胎',
        body: '先明确所需医疗服务，再比较地点、时间、沟通方式和第三方生殖经验。',
        items: [
          '确认需要建胚、供卵，还是只需移植服务。',
          '比较服务范围、妊娠代孕经验、排期和沟通方式。',
          '由各诊所直接确认接收情况、费用、医学要求和下一步。',
        ],
      },
    ],
    clinicsEyebrow: '诊所协作',
    clinicsTitle: '孕达如何与 IVF 诊所协作',
    clinicsIntro: '无论你已有 IVF 诊所，还是仍在比较选择，孕达都会围绕诊所要求协调非医疗工作。医学审核、治疗和临床决定仍由诊所负责。',
    clinicSupport: [
      {
        title: '准备诊所审核资料',
        body: '我们整理现有个案资料、确认诊所要求的文件，并协调安全交接，由诊所完成独立审核。',
      },
      {
        title: '协调筛查与预约',
        body: '根据诊所现行流程，协助衔接排期、当地监测、出行与资料传递。',
      },
      {
        title: '推进时效性沟通',
        body: '跟进准父母、代孕妈妈、诊所与独立专业方之间的待确认问题和关键节点。',
      },
      {
        title: '支持移植前交接',
        body: '跟进非医疗准备、法律放行沟通、后勤及未完成确认事项；医疗照护仍由诊所负责。',
      },
    ],
    clinicsBoundary: '本页不发布或暗示任何诊所排名。诊所会自行确认接收情况、服务、要求、费用、医疗决定与公开结果。',
    rolesTitle: '谁负责哪些决定？',
    rolesIntro: '明确职责，有助于避免医疗、法律与个案管理决定混淆或延误。',
    roles: [
      {
        title: 'IVF 诊所',
        items: ['医学资格与检查', '治疗方案与用药', '胚胎移植与临床建议'],
      },
      {
        title: '孕达代孕',
        items: ['资料与预约协调', '沟通与个案节点', '出行、后勤与团队交接'],
      },
      {
        title: '独立专业方',
        items: ['律师确认法律意见与放行', '保险专业方确认审核与保障', '托管专业方确认付款流程'],
      },
    ],
    workflowEyebrow: '协调流程',
    workflowTitle: 'IVF 诊所协调如何进行',
    workflowIntro: '具体顺序会因诊所和个案而异，但以下四次交接能让医疗与非医疗工作保持衔接。',
    workflowSteps: [
      {
        title: '确认你的起点',
        body: '梳理诊所、胚胎、供体、地点和时间状态，让后续团队不必猜测。',
      },
      {
        title: '确认诊所要求',
        body: '由诊所说明个案所需资料、代孕妈妈筛查、医学审核和排期要求。',
      },
      {
        title: '衔接匹配与放行',
        body: '孕达围绕代孕妈妈匹配、诊所审核、独立法律工作及相关个案规划协调资料与节点。',
      },
      {
        title: '准备移植交接',
        body: '我们协助管理预约、文件、出行和沟通；医疗照护由诊所负责。',
      },
    ],
    checklistTitle: '向 IVF 诊所询问的代孕问题',
    checklist: [
      '诊所处理妊娠代孕和第三方生殖个案的频率如何？',
      '审核代孕妈妈前需要哪些资料和筛查？',
      '是否提供你需要的建胚、供卵协调、遗传检测协调、冷冻保存或单纯移植服务？',
      '代孕妈妈能否在当地监测？资料如何传递？',
      '当前排期、费用、用药流程和取消政策是什么？',
      '谁负责与准父母、代孕妈妈和机构进行日常沟通？',
      '诊所如何报告 ART 结果？你看到的数据对应哪类患者或治疗口径？',
    ],
    dataTitle: '把成功率数据放回具体语境',
    dataBody:
      'CDC 提供美国诊所级与全国 ART 数据，SART 提供面向患者的成功率工具。患者构成、治疗方法、卵子或胚胎来源和统计口径不同，因此公开数据不能预测个人结果。请让诊所说明哪些数据与你的方案相关。',
    cdcLink: '查看 CDC ART 数据',
    sartLink: '查看 SART 成功率说明',
    updatesTitle: '代孕妈妈动态',
    updatesIntro: '跟随代孕妈妈的产检、预约与重要里程碑，了解每一段旅程的进展。',
    igViewPost: '在 Instagram 查看',
    internationalTitle: '国际家庭或需要供卵？',
    internationalBody: '尽早确认跨时区沟通、翻译资料、胚胎或供体组织运输、当地监测、出行安排，以及谁可以接收临床指示。',
    internationalLinkPrefix: '若仍需供卵或建胚，请在诊所交接前查看我们的',
    internationalLink: '供卵与 IVF 规划指南',
    internationalLinkSuffix: '。',
    relatedTitle: '让每项决策回到对应的权威页面',
    relatedLinks: [
      { label: '完整代孕流程', to: '/surrogacy-process' },
      { label: '法律、保险与托管协调', to: '/surrogacy-protection-california' },
      { label: '代孕费用类别', to: '/surrogacy-cost' },
    ],
    trustUpdated: '最后更新：2026年7月23日',
    trustReviewed: 'Kayla Luo（北美区副总裁）审阅',
    trustNote: '孕达提供教育说明、协调与个案管理支持。孕达不是 IVF 诊所、医疗机构、律师事务所、保险公司或托管机构。医疗、法律、保险与财务决定由相应诊所和持牌专业人士作出。',
    sourceAsrm: 'ASRM 妊娠代孕指南',
    sourceCdc: 'CDC ART 成功率',
    sourceCdcInterpret: 'CDC：解读 ART 数据',
    sourceSart: 'SART 成功率',
    faqTitle: 'IVF 诊所协调常见问题',
    faqs: [
      {
        q: '代孕时可以继续使用我现在的 IVF 诊所吗？',
        a: '通常可以，前提是诊所目前接收妊娠代孕个案，并且能够满足其要求。医学资格、资料、筛查、服务和时间安排均须由诊所确认。',
      },
      {
        q: '我已有胚胎，但还没有代孕妈妈怎么办？',
        a: '孕达可以启动准父母沟通和代孕妈妈匹配，同时与诊所确认代孕妈妈标准和资料要求。',
      },
      {
        q: '我还没有胚胎怎么办？',
        a: '先确认使用自有卵子、供卵还是已有胚胎。持牌生殖诊所负责治疗建议；孕达可以协调外围的代孕计划。',
      },
      {
        q: '孕达会选择医疗方案或保证诊所结果吗？',
        a: '不会。医疗决定由诊所和持牌医生作出。孕达负责沟通和个案节点协调，不保证接收、时间、妊娠或结果。',
      },
      {
        q: '如何比较诊所成功率？',
        a: '先查看 CDC 或 SART 数据，再询问诊所这些数字对应的患者构成、卵子或胚胎来源、周期类型和统计口径。公开成功率不能预测个人结果。',
      },
      {
        q: 'IVF 诊所和代孕机构应何时开始协调？',
        a: '越早越好，尤其应在代孕妈妈医学筛查前开始，以便衔接资料、诊所标准、法律时间、出行和移植计划。',
      },
    ],
    finalTitle: '把诊所计划衔接成一条清晰的代孕旅程',
    finalBody: '告诉我们你是否已有诊所和胚胎、仍需建胚，或需要协助安排下一步交接。',
    finalCta: '规划我的下一步',
  },
}

const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)

const surrogateUpdateCards = computed(() => {
  const livePosts = instagramFeed.value?.updates ?? []

  return surrogateUpdatesBase.map((card, index) => {
    const live = livePosts.find(item => item.id === card.id)

    return {
      ...card,
      url: live?.url || card.url,
      likes: live?.likes ?? card.likes,
      comments: live?.comments ?? card.comments,
      alt: locale.value === 'zh'
        ? `孕达代孕妈妈旅程动态 ${index + 1}`
        : `Yunda surrogate journey update ${index + 1}`,
    }
  })
})

function formatIgCount(value: number | null) {
  if (value == null)
    return '—'

  return value.toLocaleString(locale.value === 'zh' ? 'zh-CN' : 'en-US')
}

function trackCtaClick(buttonText: string, ctaLocation: 'hero_primary' | 'hero_secondary' | 'final') {
  if (!import.meta.client)
    return

  const analyticsWindow = window as typeof window & {
    dataLayer?: Array<Record<string, string>>
  }
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || []
  analyticsWindow.dataLayer.push({
    event: 'cta_clicked',
    button_text: buttonText,
    cta_location: ctaLocation,
    page: locale.value === 'zh' ? '/zh/partner-ivf-clinics' : '/partner-ivf-clinics',
    content_group: 'intended_parent_ivf_coordination',
  })
}

const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: '/partner-ivf-clinics',
  name: c.value.seoTitle,
  description: c.value.seoDescription,
  about: locale.value === 'zh'
    ? '为准父母提供代孕 IVF 诊所选择准备、资料衔接、筛查与移植节点协调'
    : 'IVF clinic evaluation preparation, records handoffs, screening, and transfer milestone coordination for intended parents',
  audience: locale.value === 'zh'
    ? ['准父母', '国际准父母', '已有胚胎或正在选择 IVF 诊所的家庭']
    : ['Intended parents', 'International intended parents', 'Families with embryos or evaluating an IVF clinic'],
  service: {
    name: locale.value === 'zh' ? '代孕 IVF 诊所协调' : 'IVF Clinic Coordination for Surrogacy',
    description: c.value.heroDescription,
    serviceType: locale.value === 'zh' ? 'IVF 诊所与代孕个案协调' : 'IVF clinic and surrogacy case coordination',
    areaServed: ['California', 'United States', 'International intended parents'],
  },
  breadcrumbs: [
    { name: locale.value === 'zh' ? '首页' : 'Home', url: '/' },
    { name: c.value.breadcrumbParent, url: '/intended-parents' },
    { name: c.value.breadcrumbCurrent, url: '/partner-ivf-clinics' },
  ],
  locale: locale.value,
  dateModified,
  reviewedBy: { '@id': reviewerId.value },
}))

useHead(() => ({
  title: c.value.seoTitle,
  meta: [
    {
      name: 'description',
      content: c.value.seoDescription,
    },
  ],
  script: coreServicePageSchemas.value.map((schema, index) => ({
    key: `schema-partner-ivf-clinics-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />
    <BreadcrumbNav
      :items="[
        { label: c.breadcrumbParent, to: '/intended-parents' },
        { label: c.breadcrumbCurrent },
      ]"
    />

    <main>
      <section class="relative overflow-hidden from-[var(--yunda-petal)] via-white to-[var(--yunda-petal)] bg-gradient-to-br">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-8%] top-[-35%] h-96 w-96 rounded-full bg-white/80 blur-3xl" />
          <div class="absolute bottom-[-45%] right-[-8%] h-[520px] w-[520px] rounded-full bg-[var(--yunda-sky)]/20 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-[1240px] px-6 py-14 lg:px-10 lg:py-20">
          <div class="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(360px,0.92fr)] lg:items-center">
            <div>
              <p class="text-xs text-[var(--yunda-maple)] font-extrabold uppercase tracking-[0.18em]">
                {{ c.eyebrow }}
              </p>
              <h1 class="mt-4 max-w-4xl font-display text-[40px] font-semibold leading-[1.08] sm:text-[48px] lg:text-[58px]">
                {{ c.heroTitle }}
              </h1>
              <p class="mt-6 max-w-3xl text-base text-[var(--yunda-bark)]/82 leading-[1.8] lg:text-[18px]" style="font-family: var(--font-text)">
                {{ c.heroDescription }}
              </p>
              <div class="mt-8 flex flex-wrap gap-3">
                <NuxtLink
                  :to="localePath('/be-parents')"
                  class="inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--yunda-bark)] px-6 py-3 text-sm text-[var(--yunda-petal)] font-bold shadow-[0_14px_30px_rgba(39,31,24,0.16)] transition hover:-translate-y-0.5"
                  @click="trackCtaClick(c.ctaPrimary, 'hero_primary')"
                >
                  {{ c.ctaPrimary }}
                </NuxtLink>
                <a
                  href="#coordination-steps"
                  class="inline-flex min-h-12 items-center justify-center border border-[var(--yunda-bark)]/18 rounded-xl bg-white/75 px-6 py-3 text-sm text-[var(--yunda-bark)] font-bold transition hover:border-[var(--yunda-maple)]/50 hover:text-[var(--yunda-maple)]"
                  @click="trackCtaClick(c.ctaSecondary, 'hero_secondary')"
                >
                  {{ c.ctaSecondary }}
                </a>
              </div>
            </div>

            <div class="overflow-hidden border border-white/80 rounded-[28px] bg-white/80 shadow-[0_24px_60px_rgba(64,84,120,0.12)]">
              <picture class="contents">
                <source
                  srcset="/images/replacements/2026-07-28/partner-ivf-clinics-hero-640.avif 640w, /images/replacements/2026-07-28/partner-ivf-clinics-hero-1280.avif 1280w"
                  sizes="(max-width: 1024px) 100vw, 520px"
                  type="image/avif"
                >
                <source
                  srcset="/images/replacements/2026-07-28/partner-ivf-clinics-hero-640.webp 640w, /images/replacements/2026-07-28/partner-ivf-clinics-hero-1280.webp 1280w"
                  sizes="(max-width: 1024px) 100vw, 520px"
                  type="image/webp"
                >
                <img
                  src="/images/replacements/2026-07-28/partner-ivf-clinics-hero.jpg"
                  :alt="c.heroImgAlt"
                  width="1280"
                  height="1280"
                  sizes="(max-width: 1024px) 100vw, 520px"
                  class="h-[340px] w-full object-cover lg:h-[430px]"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                >
              </picture>
            </div>
          </div>
        </div>
      </section>

      <section class="px-6 py-14 lg:px-10 lg:py-20">
        <div class="mx-auto max-w-[1240px]">
          <div class="max-w-4xl">
            <h2 class="font-display text-[32px] font-semibold leading-tight lg:text-[44px]">
              {{ c.pathsTitle }}
            </h2>
            <p class="mt-4 text-base text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-[18px]" style="font-family: var(--font-text)">
              {{ c.pathsIntro }}
            </p>
          </div>
          <div class="mt-8 grid gap-5 lg:grid-cols-2">
            <article
              v-for="(path, index) in c.paths"
              :key="path.title"
              class="border border-[var(--yunda-bark)]/10 rounded-[24px] p-6 shadow-[0_14px_36px_rgba(61,42,31,0.06)] lg:p-8"
              :class="index === 0 ? 'bg-white/82' : 'bg-[color-mix(in_srgb,var(--yunda-sky)_14%,white_86%)]'"
            >
              <p class="text-xs text-[var(--yunda-maple)] font-extrabold uppercase tracking-[0.16em]">
                {{ path.label }}
              </p>
              <h3 class="mt-3 font-display text-[25px] font-semibold leading-tight lg:text-[30px]">
                {{ path.title }}
              </h3>
              <p class="mt-4 text-sm text-[var(--yunda-bark)]/76 leading-[1.75] lg:text-base" style="font-family: var(--font-text)">
                {{ path.body }}
              </p>
              <ul class="mt-5 list-disc space-y-3 pl-5 text-sm text-[var(--yunda-bark)]/84 leading-[1.7] marker:text-[var(--yunda-maple)] lg:text-base" style="font-family: var(--font-text)">
                <li v-for="item in path.items" :key="item">
                  {{ item }}
                </li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section id="clinic-references" class="bg-white/58 px-6 py-14 lg:px-10 lg:py-20">
        <div class="mx-auto max-w-[1240px]">
          <p class="text-xs text-[var(--yunda-maple)] font-extrabold uppercase tracking-[0.16em]">
            {{ c.clinicsEyebrow }}
          </p>
          <h2 class="mt-3 max-w-4xl font-display text-[32px] font-semibold leading-tight lg:text-[44px]">
            {{ c.clinicsTitle }}
          </h2>
          <p class="mt-5 max-w-4xl text-base text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-[18px]" style="font-family: var(--font-text)">
            {{ c.clinicsIntro }}
          </p>

          <div class="mt-8 grid gap-4 md:grid-cols-2">
            <article
              v-for="item in c.clinicSupport"
              :key="item.title"
              class="border border-[var(--yunda-maple)]/14 rounded-[20px] bg-[var(--yunda-petal)] p-6 shadow-[0_10px_24px_rgba(61,42,31,0.05)]"
            >
              <h3 class="font-display text-[23px] font-semibold leading-tight">
                {{ item.title }}
              </h3>
              <p class="mt-3 text-sm text-[var(--yunda-bark)]/76 leading-[1.75] lg:text-base" style="font-family: var(--font-text)">
                {{ item.body }}
              </p>
            </article>
          </div>

          <p class="mt-6 border border-[var(--yunda-bark)]/10 rounded-[16px] bg-white/78 px-5 py-4 text-sm text-[var(--yunda-bark)]/72 leading-[1.75]" style="font-family: var(--font-text)">
            {{ c.clinicsBoundary }}
          </p>
        </div>
      </section>

      <section class="px-6 py-14 lg:px-10 lg:py-20">
        <div class="mx-auto max-w-[1240px]">
          <h2 class="font-display text-[32px] font-semibold leading-tight lg:text-[44px]">
            {{ c.rolesTitle }}
          </h2>
          <p class="mt-4 max-w-4xl text-base text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-[18px]" style="font-family: var(--font-text)">
            {{ c.rolesIntro }}
          </p>

          <div class="mt-8 overflow-x-auto border border-[var(--yunda-bark)]/10 rounded-[22px] bg-white/82 shadow-[0_14px_36px_rgba(61,42,31,0.06)]">
            <table class="min-w-[760px] w-full table-fixed text-left">
              <thead class="bg-[color-mix(in_srgb,var(--yunda-sky)_16%,var(--yunda-petal)_84%)]">
                <tr>
                  <th v-for="role in c.roles" :key="role.title" scope="col" class="border-b border-[var(--yunda-bark)]/10 px-6 py-4 font-display text-[21px] font-semibold">
                    {{ role.title }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td v-for="role in c.roles" :key="role.title" class="align-top border-r border-[var(--yunda-bark)]/8 px-6 py-5 last:border-r-0">
                    <ul class="list-disc space-y-3 pl-5 text-sm text-[var(--yunda-bark)]/82 leading-[1.7] marker:text-[var(--yunda-maple)] lg:text-base" style="font-family: var(--font-text)">
                      <li v-for="item in role.items" :key="item">
                        {{ item }}
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="coordination-steps" class="scroll-mt-28 bg-[color-mix(in_srgb,var(--yunda-sky)_12%,white_88%)] px-6 py-14 lg:px-10 lg:py-20">
        <div class="mx-auto max-w-[1240px]">
          <p class="text-xs text-[var(--yunda-maple)] font-extrabold uppercase tracking-[0.16em]">
            {{ c.workflowEyebrow }}
          </p>
          <h2 class="mt-3 font-display text-[32px] font-semibold leading-tight lg:text-[44px]">
            {{ c.workflowTitle }}
          </h2>
          <p class="mt-4 max-w-4xl text-base text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-[18px]" style="font-family: var(--font-text)">
            {{ c.workflowIntro }}
          </p>

          <ol class="mt-8 grid gap-4 md:grid-cols-2">
            <li
              v-for="(step, index) in c.workflowSteps"
              :key="step.title"
              class="border border-[var(--yunda-bark)]/10 rounded-[20px] bg-white/82 p-6 shadow-[0_12px_30px_rgba(61,42,31,0.05)]"
            >
              <div class="h-9 w-9 flex items-center justify-center rounded-full bg-[var(--yunda-bark)] text-sm text-[var(--yunda-petal)] font-bold">
                {{ index + 1 }}
              </div>
              <h3 class="mt-4 font-display text-[24px] font-semibold leading-tight">
                {{ step.title }}
              </h3>
              <p class="mt-3 text-sm text-[var(--yunda-bark)]/76 leading-[1.75] lg:text-base" style="font-family: var(--font-text)">
                {{ step.body }}
              </p>
            </li>
          </ol>
        </div>
      </section>

      <section id="clinic-checklist" class="scroll-mt-28 px-6 py-14 lg:px-10 lg:py-20">
        <div class="mx-auto max-w-[1240px]">
          <div class="grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(330px,0.88fr)]">
            <div>
              <h2 class="font-display text-[32px] font-semibold leading-tight lg:text-[44px]">
                {{ c.checklistTitle }}
              </h2>
              <ol class="mt-7 space-y-3">
                <li
                  v-for="(item, index) in c.checklist"
                  :key="item"
                  class="flex gap-4 border border-[var(--yunda-bark)]/9 rounded-[16px] bg-white/74 p-4"
                >
                  <span class="h-7 w-7 flex shrink-0 items-center justify-center rounded-full bg-[var(--yunda-maple)] text-xs text-white font-bold">
                    {{ index + 1 }}
                  </span>
                  <span class="text-sm text-[var(--yunda-bark)]/82 leading-[1.7] lg:text-base" style="font-family: var(--font-text)">{{ item }}</span>
                </li>
              </ol>
            </div>

            <aside class="self-start border border-[var(--yunda-maple)]/18 rounded-[22px] bg-[color-mix(in_srgb,var(--yunda-petal)_82%,white_18%)] p-6 shadow-[0_14px_34px_rgba(61,42,31,0.06)] lg:sticky lg:top-28">
              <h3 class="font-display text-[26px] font-semibold leading-tight">
                {{ c.dataTitle }}
              </h3>
              <p class="mt-4 text-sm text-[var(--yunda-bark)]/76 leading-[1.75] lg:text-base" style="font-family: var(--font-text)">
                {{ c.dataBody }}
              </p>
              <div class="mt-5 flex flex-col gap-2">
                <a
                  href="https://www.cdc.gov/art/success-rates/index.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-[var(--yunda-maple)] font-bold underline underline-offset-4"
                >
                  {{ c.cdcLink }}
                </a>
                <a
                  href="https://www.sart.org/patients/a-patients-guide-to-assisted-reproductive-technology/general-information/success-rates/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-sm text-[var(--yunda-maple)] font-bold underline underline-offset-4"
                >
                  {{ c.sartLink }}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section class="w-full bg-[color-mix(in_srgb,var(--yunda-petal)_90%,var(--yunda-sky)_10%)] py-14 lg:py-20">
        <div id="surrogates-updates" class="mx-auto max-w-[1240px] scroll-mt-28 px-6 lg:px-10">
          <h2 class="font-display text-[30px] font-semibold leading-[1.12] lg:text-[36px]">
            {{ c.updatesTitle }}
          </h2>
          <p class="mt-4 max-w-3xl text-base text-[var(--yunda-bark)]/88 leading-[1.8] lg:text-[17px]" style="font-family: var(--font-text)">
            {{ c.updatesIntro }}
          </p>
          <div class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
            <a
              v-for="post in surrogateUpdateCards"
              :key="post.id"
              :href="post.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group relative block overflow-hidden rounded-2xl bg-[var(--yunda-petal)] shadow-[0_6px_22px_rgba(55,40,25,0.06)] ring-1 ring-[#ebe4d8]/80 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(55,40,25,0.12)]"
              :aria-label="`${c.igViewPost}: ${post.alt}`"
            >
              <OptimizedPicture
                :src="post.image"
                :alt="post.alt"
                picture-class="block"
                img-class="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
                width="1080"
                height="1350"
                loading="lazy"
                decoding="async"
              />
              <div
                class="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/78 via-black/45 to-transparent px-3 pt-10 pb-3 text-xs text-white sm:text-sm"
                style="font-family: var(--font-text)"
              >
                <div class="flex items-center gap-3 font-semibold">
                  <span class="inline-flex items-center gap-1.5">
                    <Icon name="radix-icons:heart-filled" class="h-3.5 w-3.5 shrink-0" />
                    {{ formatIgCount(post.likes) }}
                  </span>
                  <span class="inline-flex items-center gap-1.5">
                    <Icon name="radix-icons:chat-bubble" class="h-3.5 w-3.5 shrink-0" />
                    {{ formatIgCount(post.comments) }}
                  </span>
                </div>
                <span class="font-semibold opacity-90">{{ c.igViewPost }}</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section class="bg-white/58 px-6 py-14 lg:px-10 lg:py-20">
        <div class="mx-auto max-w-[1240px] grid gap-5 lg:grid-cols-2">
          <article class="border border-[var(--yunda-bark)]/10 rounded-[22px] bg-white/82 p-6 shadow-[0_12px_30px_rgba(61,42,31,0.05)] lg:p-8">
            <h2 class="font-display text-[28px] font-semibold leading-tight lg:text-[34px]">
              {{ c.internationalTitle }}
            </h2>
            <p class="mt-4 text-sm text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-base" style="font-family: var(--font-text)">
              {{ c.internationalBody }}
            </p>
            <p class="mt-4 text-sm text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-base" style="font-family: var(--font-text)">
              {{ c.internationalLinkPrefix }}
              <NuxtLink :to="localePath('/egg-donation')" class="text-[var(--yunda-maple)] font-bold underline underline-offset-4">
                {{ c.internationalLink }}
              </NuxtLink>
              {{ c.internationalLinkSuffix }}
            </p>
          </article>

          <article class="border border-[var(--yunda-bark)]/10 rounded-[22px] bg-[var(--yunda-petal)] p-6 shadow-[0_12px_30px_rgba(61,42,31,0.05)] lg:p-8">
            <h2 class="font-display text-[28px] font-semibold leading-tight lg:text-[34px]">
              {{ c.relatedTitle }}
            </h2>
            <ul class="mt-5 space-y-3">
              <li v-for="link in c.relatedLinks" :key="link.to">
                <NuxtLink
                  :to="localePath(link.to)"
                  class="inline-flex text-sm text-[var(--yunda-maple)] font-bold underline underline-offset-4 lg:text-base"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <SeoTrustNote
        :updated="c.trustUpdated"
        :reviewed-by="c.trustReviewed"
        :note="c.trustNote"
        :sources="[
          {
            label: c.sourceAsrm,
            href: 'https://www.asrm.org/practice-guidance/practice-committee-documents/recommendations-for-practices-using-gestational-carriers-a-committee-opinion-2022/',
          },
          { label: c.sourceCdc, href: 'https://www.cdc.gov/art/success-rates/index.html' },
          { label: c.sourceCdcInterpret, href: 'https://www.cdc.gov/art/success-rates/interpret.html' },
          {
            label: c.sourceSart,
            href: 'https://www.sart.org/patients/a-patients-guide-to-assisted-reproductive-technology/general-information/success-rates/',
          },
        ]"
      />

      <section class="px-6 py-14 lg:px-10 lg:py-20">
        <div class="mx-auto max-w-[980px]">
          <h2 class="font-display text-[32px] font-semibold leading-tight lg:text-[44px]">
            {{ c.faqTitle }}
          </h2>
          <div class="mt-7 space-y-3">
            <details
              v-for="(faq, index) in c.faqs"
              :key="faq.q"
              class="group border border-[var(--yunda-bark)]/10 rounded-[16px] p-5"
              :class="index % 2 === 0 ? 'bg-white/78' : 'bg-[color-mix(in_srgb,var(--yunda-sky)_10%,white_90%)]'"
            >
              <summary class="flex cursor-pointer list-none items-start justify-between gap-5 font-display text-[20px] font-semibold leading-snug">
                <span>{{ faq.q }}</span>
                <span class="mt-0.5 text-[var(--yunda-maple)] transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <p class="mt-4 text-sm text-[var(--yunda-bark)]/76 leading-[1.8] lg:text-base" style="font-family: var(--font-text)">
                {{ faq.a }}
              </p>
            </details>
          </div>
        </div>
      </section>

      <section class="px-6 pb-16 lg:px-10 lg:pb-24">
        <div class="mx-auto max-w-[1120px] overflow-hidden rounded-[28px] bg-[var(--yunda-bark)] px-7 py-10 text-[var(--yunda-petal)] shadow-[0_22px_54px_rgba(39,31,24,0.16)] lg:px-12 lg:py-14">
          <h2 class="max-w-3xl font-display text-[32px] font-semibold leading-tight lg:text-[44px]">
            {{ c.finalTitle }}
          </h2>
          <p class="mt-4 max-w-3xl text-sm text-[var(--yunda-petal)]/78 leading-[1.8] lg:text-base" style="font-family: var(--font-text)">
            {{ c.finalBody }}
          </p>
          <NuxtLink
            :to="localePath('/be-parents')"
            class="mt-7 inline-flex min-h-12 items-center justify-center rounded-xl bg-[var(--yunda-petal)] px-6 py-3 text-sm text-[var(--yunda-bark)] font-bold transition hover:-translate-y-0.5"
            @click="trackCtaClick(c.finalCta, 'final')"
          >
            {{ c.finalCta }}
          </NuxtLink>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

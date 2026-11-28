<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import BreadcrumbNav from '@/components/base/BreadcrumbNav.vue'
import OptimizedPicture from '@/components/base/OptimizedPicture.vue'
import SeoTrustNote from '@/components/base/SeoTrustNote.vue'
import { buildCoreServicePageSchemas } from '~/utils/schema'

const { locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const pagePath = '/egg-donor-requirements'

const translations = {
  en: {
    seoTitle: 'Egg Donor Requirements: Do You Qualify? | Yunda Surrogacy',
    seoDescription: 'Review common egg donor requirements, screening questions, time commitments, and what to confirm before you apply to donate eggs.',
    breadcrumbParent: 'For Donors',
    breadcrumbCurrent: 'Egg Donor Requirements',
    eyebrow: 'Egg donor eligibility guide',
    title: 'Egg Donor Requirements: Do You Qualify to Donate Eggs?',
    lead: 'Use this guide to understand the questions an egg donor program may ask before medical screening. Requirements vary, so the responsible program and clinic make the final decision.',
    body: 'If you are asking, “Can I donate my eggs?” start with the areas below. They can help you prepare honest information and better questions before you share sensitive records or agree to a donation cycle.',
    primaryCta: 'Ask About Eligibility',
    secondaryCta: 'See the Screening Guide',
    heroAlt: 'Potential egg donor speaking with a fertility coordinator about eligibility questions',
    answerTitle: 'What are the requirements for egg donation?',
    answerBody: 'Common egg donor requirements may cover your age, general health, medical and family history, reproductive history, lifestyle, genetic and infectious-disease screening, counseling, and ability to attend required appointments. Each program sets its own preliminary criteria, and a fertility clinic makes the medical determination for a specific case.',
    requirementsTitle: 'Requirements for Egg Donors: What Programs May Review',
    requirementsIntro: 'These categories are a preparation guide. They are not a promise that you will be accepted or a substitute for a clinic evaluation.',
    requirements: [
      { title: 'Age and health history', body: 'Programs may set an age range and ask about current health, past diagnoses, medications, surgeries, allergies, and ongoing care.' },
      { title: 'Family and genetic history', body: 'You may be asked for information about biological relatives, inherited conditions, and records that help a qualified professional assess genetic risk.' },
      { title: 'Reproductive history', body: 'Questions may cover menstrual history, pregnancies, fertility treatment, contraception, and other information relevant to the clinic’s evaluation.' },
      { title: 'Lifestyle and substance use', body: 'Programs may ask about smoking, vaping, recreational drugs, alcohol, supplements, tattoos, travel, and other factors that affect screening.' },
      { title: 'Screening and counseling', body: 'A clinic may require medical, infectious-disease, genetic, psychological, or psychoeducational screening before approval.' },
      { title: 'Appointments and follow-through', body: 'You may need to attend time-sensitive monitoring visits, follow medication instructions, complete consent documents, and arrange support for recovery.' },
    ],
    questionsTitle: 'Could I donate eggs if…',
    questions: [
      { q: 'I have never been pregnant?', a: 'There is no single answer for every program. Some programs do not require a previous pregnancy, while another clinic may apply its own policy. Ask the program to explain the current requirement.' },
      { q: 'I have a health condition or take medication?', a: 'Share accurate information during the initial review. The responsible medical team decides whether the condition or medication affects eligibility or requires additional review.' },
      { q: 'I use or previously used birth control?', a: 'Birth-control requirements can vary by method, timing, and clinic protocol. Provide the method and dates so the medical team can give case-specific guidance.' },
      { q: 'I do not live near a clinic?', a: 'Ask where screening and monitoring must occur, whether local appointments are possible, and what travel or scheduling commitments the program expects.' },
      { q: 'I do not have health insurance?', a: 'Ask in writing who covers screening, treatment-related care, travel, and evaluation of a possible complication before agreeing to a cycle.' },
      { q: 'I have questions about privacy or future contact?', a: 'Raise those questions before sharing records or signing documents. Ask how medical and genetic information is handled and what identity or contact expectations apply.' },
    ],
    prepareTitle: 'What to prepare before you apply',
    preparationProgress: 'Preparation checklist',
    preparationProgressLabel: '{count} of {total} items reviewed',
    preparationComplete: 'You have a focused starting point for your first conversation.',
    preparationNote: 'Use this checklist privately. Checking an item does not submit information or start an application.',
    markReady: 'Mark as ready',
    markUnready: 'Mark as not ready',
    prepareAlt: 'Notebook and calendar prepared for egg donor questions and appointments',
    prepareItems: [
      'A current list of medications, supplements, and relevant medical history',
      'Available family medical history and information about biological relatives',
      'Reproductive, menstrual, pregnancy, and fertility-treatment history',
      'Your work schedule, travel limits, support plan, and appointment availability',
      'Questions about screening, privacy, insurance, expenses, payment terms, and cancellation',
      'A request for the current written program terms before making a decision',
    ],
    screeningTitle: 'How requirements connect to screening',
    screeningBody: 'Eligibility questions are only the starting point. The next stage may involve medical records, physical examination, infectious-disease testing, genetic review, counseling, and clinic-specific assessments. Read the screening overview on the main donor page for the broader path.',
    screeningCta: 'Read egg donor screening guidance',
    nextStepAlt: 'Potential egg donor arriving for a private program consultation',
    questionsToAskTitle: 'Questions to ask the donor program',
    questionsToAsk: [
      'Which requirements are preliminary, and who makes the final medical decision?',
      'Which records and tests are required before a donor can be approved?',
      'How are medical, genetic, and identity records stored and shared?',
      'Which screening, treatment, travel, and complication-related expenses are covered?',
      'What happens if a cycle is delayed, cancelled, or stopped before retrieval?',
      'When can I pause or withdraw, and which decisions become difficult to reverse?',
    ],
    faqTitle: 'Egg donor requirements FAQ',
    faqs: [
      { q: 'What are the basic requirements to donate eggs?', a: 'Programs commonly review age, health, medical and family history, reproductive history, lifestyle, screening results, counseling, and appointment availability. Exact requirements vary by program and clinic.' },
      { q: 'What are the requirements for egg donors?', a: 'Requirements for egg donors may include health and family-history review, screening, counseling, and the ability to attend time-sensitive appointments. The program and clinic confirm the current criteria.' },
      { q: 'What are the requirements to donate an egg?', a: 'Requirements to donate an egg depend on the program, clinic, donor relationship, and applicable rules. Ask which preliminary records and medical evaluations are required before you apply.' },
      { q: 'How can I donate my eggs?', a: 'Start by contacting an egg donor program, asking about its current requirements, and completing the initial review if you choose to continue. The responsible clinic determines medical eligibility.' },
      { q: 'Where can I donate my eggs?', a: 'Ask which program and clinic would manage your screening, monitoring, and retrieval, and whether appointments must take place in a specific location. Availability and travel requirements vary.' },
      { q: 'Who can donate eggs?', a: 'A potential donor must meet the preliminary requirements of the program and pass the medical evaluation required by the responsible clinic. A public page cannot determine individual eligibility.' },
      { q: 'How do I know if I qualify to become an egg donor?', a: 'Start with an initial inquiry and provide accurate information for a preliminary review. Ask which requirements apply, what screening is required, and who will make the final decision.' },
      { q: 'Can I donate my frozen eggs?', a: 'That depends on the program, the source and history of the eggs, and the receiving clinic’s requirements. Ask the responsible clinic to review the specific situation.' },
      { q: 'Does egg donation require a medical or psychological evaluation?', a: 'Many programs include medical and psychological or psychoeducational screening. The required evaluation depends on the program, clinic, donor relationship, and applicable rules.' },
      { q: 'Are egg donor requirements the same everywhere?', a: 'No. Programs and clinics may use different preliminary criteria, locations, scheduling rules, screening protocols, privacy terms, and payment agreements.' },
    ],
    trustUpdated: 'Last updated: November 27, 2026',
    trustReviewed: 'Reviewed for Yunda Surrogacy coordination scope',
    trustNote: 'Yunda Surrogacy provides education and coordination. It does not make medical eligibility decisions, provide fertility treatment, provide genetic counseling, provide legal advice, or guarantee acceptance, compensation, medical outcomes, or donation results.',
    finalTitle: 'Want to understand your next step?',
    finalBody: 'Send your questions about egg donor requirements, screening, timing, privacy, or program terms. Start with the information you are comfortable sharing.',
    finalCta: 'Ask About the Donor Program',
    sourceFda: 'FDA: Reproductive tissue donation',
    sourceAsrm: 'ASRM: Gamete and embryo donation guidance',
  },
  zh: {
    seoTitle: '捐卵资格要求：你是否符合条件？｜Yunda Surrogacy',
    seoDescription: '了解常见捐卵资格要求、筛查问题、时间投入，以及申请捐卵前需要确认的事项。',
    breadcrumbParent: '捐赠者指南',
    breadcrumbCurrent: '捐卵资格要求',
    eyebrow: '捐卵资格指南',
    title: '捐卵资格要求：你是否符合捐卵条件？',
    lead: '这份指南帮助你了解供卵项目在医疗筛查前可能询问哪些内容。具体要求因项目而异，最终判断由负责的项目和诊所作出。',
    body: '如果你在问“我可以捐卵吗”，可以先从下面几个方面准备。这样有助于你在提供敏感病历或同意进入捐赠周期前，准备准确的信息和更具体的问题。',
    primaryCta: '咨询资格要求',
    secondaryCta: '查看筛查指南',
    heroAlt: '潜在捐卵者与生殖协调人员讨论资格问题',
    answerTitle: '捐卵需要满足什么要求？',
    answerBody: '常见捐卵资格要求可能涉及年龄、基本健康状况、个人与家族病史、生育史、生活方式、遗传与传染病筛查、咨询，以及参加必要就诊的能力。每个项目会设置自己的初步标准，具体医疗资格由生殖诊所结合个案判断。',
    requirementsTitle: '可以先了解的常见捐卵要求',
    requirementsIntro: '以下内容用于帮助你准备问题，不代表一定会被项目接受，也不能替代诊所评估。',
    requirements: [
      { title: '年龄与健康史', body: '项目可能设置年龄范围，并询问当前健康状况、既往诊断、用药、手术、过敏和持续治疗情况。' },
      { title: '家族与遗传史', body: '项目可能询问生物学亲属、遗传性疾病和相关病历，以便由合格专业人士评估遗传风险。' },
      { title: '生育史', body: '问题可能涉及月经史、妊娠经历、生育治疗、避孕方式，以及诊所评估需要的其他信息。' },
      { title: '生活方式与物质使用', body: '项目可能询问吸烟、电子烟、娱乐性药物、酒精、补充剂、纹身、旅行和其他影响筛查的因素。' },
      { title: '筛查与咨询', body: '诊所可能要求在批准前完成医疗、传染病、遗传、心理或心理教育评估。' },
      { title: '就诊与配合能力', body: '你可能需要参加有时间要求的监测就诊、遵循用药指导、完成同意文件，并安排取卵后的恢复支持。' },
    ],
    questionsTitle: '如果出现这些情况，还能捐卵吗？',
    questions: [
      { q: '我从未怀孕过？', a: '不同项目的要求并不完全相同。有些项目不要求既往妊娠经历，也有诊所可能采用自己的政策。应向项目方确认当前要求。' },
      { q: '我有健康问题或正在用药？', a: '初步审核时应如实提供信息。是否需要进一步审核，以及健康状况或药物是否影响资格，由负责的医疗团队判断。' },
      { q: '我正在或曾经使用避孕方式？', a: '不同避孕方式、使用时间和诊所流程可能对应不同要求。提供具体方式和时间，由医疗团队给出个案建议。' },
      { q: '我不住在诊所附近？', a: '应询问筛查和监测必须在哪里完成，是否可以安排本地就诊，以及项目对旅行和时间的要求。' },
      { q: '我没有医疗保险？', a: '同意进入周期前，应书面确认谁承担筛查、治疗相关医疗、旅行和可能并发症评估的费用。' },
      { q: '我对隐私或未来联系有疑问？', a: '在提交资料或签署文件前提出这些问题。询问医疗与遗传信息如何处理，以及身份和未来联系有哪些预期。' },
    ],
    prepareTitle: '申请前可以准备什么',
    preparationProgress: '申请准备清单',
    preparationProgressLabel: '已查看 {count} / {total} 项',
    preparationComplete: '你已经为第一次沟通整理出清晰的起点。',
    preparationNote: '这份清单仅供你自己整理。勾选不会提交资料，也不会启动申请。',
    markReady: '标记为已准备',
    markUnready: '标记为未准备',
    prepareAlt: '为准备捐卵问题和就诊安排而摆放的笔记本与日历',
    prepareItems: [
      '当前用药、补充剂和相关医疗史清单',
      '可获得的家族病史和生物学亲属信息',
      '生育、月经、妊娠和生育治疗经历',
      '工作安排、旅行限制、支持计划和可就诊时间',
      '关于筛查、隐私、保险、费用、支付和取消的问题',
      '在决定前要求查看当前书面项目条款',
    ],
    screeningTitle: '资格要求与筛查的关系',
    screeningBody: '资格问题只是开始。下一阶段可能涉及医疗记录、体检、传染病检测、遗传审核、咨询和诊所特定评估。你可以在捐卵主页面查看更完整的筛查流程。',
    screeningCta: '查看捐卵筛查指南',
    nextStepAlt: '潜在捐卵者携带资料前往私密项目咨询',
    questionsToAskTitle: '可以向供卵项目询问什么',
    questionsToAsk: [
      '哪些是初步要求，最终医疗决定由谁作出？',
      '供体获批前需要提交哪些病历和检测结果？',
      '医疗、遗传和身份资料如何保存与共享？',
      '筛查、治疗、旅行和并发症相关费用由谁承担？',
      '周期延迟、取消或取卵前停止时如何处理？',
      '什么时候可以暂停或退出，哪些后续决定可能难以逆转？',
    ],
    faqTitle: '捐卵资格要求常见问题',
    faqs: [
      { q: '捐卵的基本要求是什么？', a: '项目通常会审核年龄、健康状况、个人与家族病史、生育史、生活方式、筛查结果、咨询和就诊安排。具体要求因项目和诊所而异。' },
      { q: '捐卵者需要满足哪些要求？', a: '捐卵者要求可能包括健康与家族史审核、筛查、咨询以及参加有时间要求的就诊。具体标准由项目和诊所确认。' },
      { q: '捐一颗卵子需要满足什么要求？', a: '捐卵要求取决于项目、诊所、供体关系和适用规则。申请前应询问需要提交哪些初步资料和完成哪些医疗评估。' },
      { q: '我该如何捐卵？', a: '可以先联系供卵项目，询问当前要求，并在愿意继续时完成初步审核。是否符合医疗资格，由负责诊所判断。' },
      { q: '在哪里可以捐卵？', a: '应询问由哪家项目和诊所负责筛查、监测和取卵，以及就诊是否必须在指定地点完成。地点和旅行要求因项目而异。' },
      { q: '什么人可以捐卵？', a: '潜在供体需要满足项目的初步要求，并通过负责诊所要求的医疗评估。公开页面不能判断个人最终资格。' },
      { q: '怎么知道自己是否符合捐卵资格？', a: '可以先进行初步咨询，并提供准确资料供项目审核。询问适用要求、所需筛查和最终决定人。' },
      { q: '冷冻卵子可以捐赠吗？', a: '这取决于项目、卵子的来源与历史，以及接收诊所的要求。应由负责诊所审核具体情况。' },
      { q: '捐卵需要医疗或心理评估吗？', a: '许多项目会安排医疗以及心理或心理教育筛查。具体评估取决于项目、诊所、供体关系和适用规则。' },
      { q: '不同地方的捐卵要求一样吗？', a: '不一样。项目和诊所可能采用不同的初步标准、地点、排期规则、筛查流程、隐私条款和支付协议。' },
    ],
    trustUpdated: '最后更新：2026年11月27日',
    trustReviewed: '按 Yunda Surrogacy 协调服务范围审阅',
    trustNote: '孕达提供教育与协调，不作医疗资格判断，不提供生殖治疗、遗传咨询或法律建议，也不保证接受、补偿、医疗结果或捐赠结果。',
    finalTitle: '想了解自己的下一步？',
    finalBody: '你可以询问捐卵资格、筛查、时间、隐私或项目条款。只需先分享你愿意提供的信息。',
    finalCta: '咨询供卵项目',
    sourceFda: 'FDA：生殖组织捐赠',
    sourceAsrm: 'ASRM：配子与胚胎捐赠指南',
  },
}

const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)
const completedPreparation = ref<boolean[]>([])
const completedPreparationCount = computed(() => completedPreparation.value.filter(Boolean).length)

function togglePreparation(index: number) {
  completedPreparation.value[index] = !completedPreparation.value[index]
}

const breadcrumbItems = computed(() => [
  { label: c.value.breadcrumbParent, to: '/surrogates' },
  { label: c.value.breadcrumbCurrent },
])

const pageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: c.value.title,
  description: c.value.seoDescription,
  about: 'Egg donor eligibility requirements and screening preparation',
  audience: 'Potential egg donors',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  dateModified: '2026-11-27',
  breadcrumbs: [
    { name: locale.value === 'zh' ? '首页' : 'Home', url: '/' },
    { name: c.value.breadcrumbParent, url: '/surrogates' },
    { name: c.value.breadcrumbCurrent, url: pagePath },
  ],
  service: {
    name: locale.value === 'zh' ? '捐卵资格与筛查准备支持' : 'Egg donor eligibility and screening preparation support',
    serviceType: locale.value === 'zh' ? '捐卵资格说明' : 'Egg donor eligibility guidance',
    audience: 'Potential egg donors',
    description: c.value.answerBody,
  },
}))

useHead(() => ({
  title: c.value.seoTitle,
  meta: [
    { name: 'description', content: c.value.seoDescription },
    { property: 'og:title', content: c.value.seoTitle },
    { property: 'og:description', content: c.value.seoDescription },
    { property: 'og:image', content: `${siteUrl.value}/images/pages/egg-donor-requirements/hero.jpg` },
    { name: 'twitter:title', content: c.value.seoTitle },
    { name: 'twitter:description', content: c.value.seoDescription },
    { name: 'twitter:image', content: `${siteUrl.value}/images/pages/egg-donor-requirements/hero.jpg` },
  ],
  script: pageSchemas.value.map((schema, index) => ({
    key: `schema-egg-donor-requirements-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />
    <BreadcrumbNav :items="breadcrumbItems" />

    <main>
      <section class="relative overflow-hidden from-[var(--yunda-petal)] via-[#fff7ef] to-white bg-gradient-to-br">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-12%] top-[-25%] h-100 w-100 rounded-full bg-white/75 blur-3xl" />
          <div class="absolute right-[-12%] top-[-10%] h-120 w-120 rounded-full bg-[var(--yunda-sky)]/18 blur-3xl" />
        </div>
        <div class="relative grid mx-auto max-w-320 gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-22">
          <div class="relative">
            <div class="mb-6 inline-flex items-center gap-3 border-b border-[var(--yunda-maple)]/35 pb-3 text-xs text-[var(--yunda-bark)]/65 font-bold tracking-[0.16em] uppercase">
              <span class="text-[var(--yunda-maple)]">01</span>
              <span>{{ locale === 'zh' ? '先了解，再决定' : 'Understand before you decide' }}</span>
            </div>
            <p class="text-xs text-[var(--yunda-maple)] font-extrabold tracking-[0.18em] uppercase">
              {{ c.eyebrow }}
            </p>
            <h1 class="mt-4 max-w-5xl text-10.5 text-[var(--yunda-bark)] font-semibold leading-[1.08] font-display lg:text-14">
              {{ c.title }}
            </h1>
            <p class="mt-6 max-w-4xl text-lg text-[var(--yunda-bark)]/88 font-medium leading-[1.75] lg:text-xl">
              {{ c.lead }}
            </p>
            <p class="mt-4 max-w-4xl text-base text-[var(--yunda-bark)]/76 leading-[1.8] lg:text-lg">
              {{ c.body }}
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a href="mailto:kaylal@yundasurrogacy.com" class="inline-flex items-center justify-center rounded-3 bg-[var(--yunda-bark)] px-6 py-3.5 text-sm text-white font-bold shadow-[0_16px_34px_rgba(61,42,31,0.2)] transition hover:-translate-y-0.5">{{ c.primaryCta }}</a>
              <a :href="`${localePath('/egg-donors')}#screening`" class="inline-flex items-center justify-center border border-[var(--yunda-maple)]/35 rounded-3 bg-white/80 px-6 py-3.5 text-sm text-[var(--yunda-bark)] font-bold transition hover:border-[var(--yunda-maple)] hover:-translate-y-0.5">{{ c.secondaryCta }}</a>
            </div>
          </div>
          <div class="overflow-hidden border border-[var(--yunda-maple)]/20 rounded-7 bg-white shadow-[0_28px_70px_rgba(61,42,31,0.16)]">
            <OptimizedPicture src="/images/pages/egg-donor-requirements/hero.jpg" :alt="c.heroAlt" width="1600" height="1200" sizes="(max-width: 1024px) 100vw, 48vw" loading="eager" decoding="async" fetchpriority="high" picture-class="contents" img-class="aspect-[4/3] h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section class="bg-white px-6 py-12 lg:px-10 lg:py-16">
        <div class="mx-auto max-w-320 border border-[var(--yunda-maple)]/20 rounded-6 bg-[var(--yunda-petal)]/55 p-6 shadow-[0_14px_38px_rgba(61,42,31,0.06)] lg:p-8">
          <h2 class="text-7 font-semibold leading-tight font-display lg:text-9">
            {{ c.answerTitle }}
          </h2>
          <p class="mt-4 max-w-5xl text-base text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-lg">
            {{ c.answerBody }}
          </p>
        </div>
      </section>

      <section class="px-6 py-16 lg:px-10 lg:py-22">
        <div class="mx-auto max-w-320">
          <div class="max-w-4xl">
            <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">
              {{ c.requirementsTitle }}
            </h2>
            <p class="mt-5 text-base text-[var(--yunda-bark)]/76 leading-[1.8] lg:text-lg">
              {{ c.requirementsIntro }}
            </p>
          </div>
          <div class="grid mt-10 gap-px overflow-hidden border border-[var(--yunda-bark)]/12 rounded-6 bg-[var(--yunda-bark)]/12 lg:grid-cols-3 md:grid-cols-2">
            <article v-for="(item, index) in c.requirements" :key="item.title" class="group relative bg-white p-6 transition duration-500 hover:bg-[#fff8f1] lg:p-7 hover:-translate-y-1">
              <div class="flex items-start justify-between gap-4">
                <span class="text-sm text-[var(--yunda-maple)] font-bold tracking-[0.14em]">{{ String(index + 1).padStart(2, '0') }}</span>
                <span class="h-2.5 w-2.5 rounded-full bg-[var(--yunda-maple)]/30 transition duration-500 group-hover:scale-150 group-hover:bg-[var(--yunda-maple)]" aria-hidden="true" />
              </div>
              <h3 class="mt-10 text-xl font-bold leading-snug">
                {{ item.title }}
              </h3>
              <p class="mt-3 text-sm text-[var(--yunda-bark)]/76 leading-7">
                {{ item.body }}
              </p>
              <span class="pointer-events-none absolute bottom-0 left-0 h-0.75 w-0 bg-[var(--yunda-maple)] transition-all duration-500 group-hover:w-full" aria-hidden="true" />
            </article>
          </div>
        </div>
      </section>

      <section id="preparation" class="bg-white px-6 py-12 lg:px-10 lg:py-16">
        <div class="grid mx-auto max-w-320 gap-8 overflow-hidden border border-[var(--yunda-maple)]/18 rounded-6 bg-[var(--yunda-petal)]/45 lg:grid-cols-[0.82fr_1.18fr] lg:items-stretch">
          <OptimizedPicture src="/images/pages/egg-donor-requirements/prepare.jpg" :alt="c.prepareAlt" width="1600" height="1066" sizes="(max-width: 1024px) 100vw, 42vw" loading="lazy" decoding="async" picture-class="contents" img-class="h-full min-h-64 w-full object-cover lg:min-h-80" />
          <div class="p-7 lg:p-10">
            <div class="flex flex-wrap items-end justify-between gap-4">
              <p class="text-xs text-[var(--yunda-maple)] font-extrabold tracking-[0.16em] uppercase">
                {{ c.prepareTitle }}
              </p>
              <span class="text-sm text-[var(--yunda-bark)]/60 font-bold tabular-nums">{{ completedPreparationCount }}/{{ c.prepareItems.length }}</span>
            </div>
            <p class="mt-3 max-w-xl text-base text-[var(--yunda-bark)]/76 leading-[1.8]">
              {{ c.preparationNote }}
            </p>
            <div class="mt-6 h-1.5 overflow-hidden rounded-full bg-[var(--yunda-bark)]/10" role="progressbar" :aria-valuenow="completedPreparationCount" aria-valuemin="0" :aria-valuemax="c.prepareItems.length" :aria-label="c.preparationProgress">
              <div class="h-full rounded-full bg-[var(--yunda-maple)] transition-all duration-500" :style="{ width: `${(completedPreparationCount / c.prepareItems.length) * 100}%` }" />
            </div>
            <ul class="grid mt-6 gap-2">
              <li v-for="(item, index) in c.prepareItems" :key="item">
                <button type="button" class="group w-full flex items-start gap-3 rounded-3 px-3 py-3 text-left transition hover:bg-white/80" :aria-pressed="completedPreparation[index] || false" :aria-label="`${completedPreparation[index] ? c.markUnready : c.markReady}: ${item}`" @click="togglePreparation(index)">
                  <span class="mt-0.5 h-5 w-5 flex shrink-0 items-center justify-center border border-[var(--yunda-maple)]/50 rounded-full text-xs text-white transition duration-300" :class="completedPreparation[index] ? 'bg-[var(--yunda-maple)]' : 'bg-transparent group-hover:border-[var(--yunda-maple)]'" aria-hidden="true">{{ completedPreparation[index] ? '✓' : '' }}</span>
                  <span class="text-sm text-[var(--yunda-bark)]/78 leading-6 transition" :class="completedPreparation[index] ? 'text-[var(--yunda-bark)]/45 line-through' : ''">{{ item }}</span>
                </button>
              </li>
            </ul>
            <p v-if="completedPreparationCount === c.prepareItems.length" class="mt-4 text-sm text-[var(--yunda-bark)]/70" aria-live="polite">
              {{ c.preparationComplete }}
            </p>
          </div>
        </div>
      </section>

      <section class="bg-[var(--yunda-bark)] px-6 py-16 text-white lg:px-10 lg:py-24">
        <div class="mx-auto max-w-320">
          <div class="mx-auto max-w-4xl text-center">
            <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">
              {{ c.questionsTitle }}
            </h2>
            <p class="mt-5 text-base text-white/72 leading-[1.8] lg:text-lg">
              {{ c.requirementsIntro }}
            </p>
          </div>
          <div class="grid mt-12 gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-14">
            <div class="border-t border-white/25">
              <details v-for="(item, index) in c.questions" :key="item.q" class="group border-b border-white/25 py-6 lg:py-7">
                <summary class="flex cursor-pointer list-none gap-5">
                  <span class="pt-1 text-sm text-[var(--yunda-maple)] font-bold tracking-[0.12em]" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
                  <span class="flex flex-1 items-start justify-between gap-6">
                    <span class="text-xl font-bold leading-snug lg:text-2xl">{{ item.q }}</span>
                    <span class="mt-1 text-2xl text-[var(--yunda-maple)] leading-none transition duration-300 group-open:rotate-45" aria-hidden="true">+</span>
                  </span>
                </summary>
                <p class="mt-4 max-w-2xl pl-9 text-sm text-white/72 leading-7 lg:text-base">
                  {{ item.a }}
                </p>
              </details>
            </div>
            <div class="lg:sticky lg:top-24">
              <div class="relative overflow-hidden rounded-5 bg-white/8 p-3">
                <span class="pointer-events-none absolute left-0 top-0 z-1 h-12 w-12 border-l-4 border-t-4 border-[var(--yunda-maple)]" aria-hidden="true" />
                <span class="pointer-events-none absolute bottom-0 right-0 z-1 h-12 w-12 border-b-4 border-r-4 border-[var(--yunda-maple)]" aria-hidden="true" />
                <OptimizedPicture src="/images/pages/egg-donor-requirements/next-step.jpg" :alt="c.nextStepAlt" width="1600" height="900" sizes="(max-width: 1024px) 100vw, 42vw" loading="lazy" decoding="async" picture-class="contents" img-class="aspect-[16/9] w-full rounded-3 object-cover lg:aspect-[4/5]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="px-6 py-16 lg:px-10 lg:py-22">
        <div class="grid mx-auto max-w-320 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">
              {{ c.prepareTitle }}
            </h2>
            <ul class="grid mt-7 gap-4">
              <li v-for="item in c.prepareItems" :key="item" class="flex gap-3 text-base text-[var(--yunda-bark)]/78 leading-7">
                <span class="mt-0.5 text-[var(--yunda-maple)] font-black" aria-hidden="true">✓</span><span>{{ item }}</span>
              </li>
            </ul>
          </div>
          <div class="rounded-6 bg-[var(--yunda-bark)] p-7 text-white lg:p-9">
            <h2 class="text-7 font-semibold leading-tight font-display lg:text-9">
              {{ c.questionsToAskTitle }}
            </h2>
            <ul class="grid mt-6 gap-4">
              <li v-for="item in c.questionsToAsk" :key="item" class="border-b border-white/15 pb-4 text-sm text-white/82 leading-7 last:border-b-0 last:pb-0">
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section class="bg-white px-6 py-16 lg:px-10 lg:py-22">
        <div class="grid mx-auto max-w-320 gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">
              {{ c.screeningTitle }}
            </h2>
            <p class="mt-5 max-w-4xl text-base text-[var(--yunda-bark)]/76 leading-[1.8] lg:text-lg">
              {{ c.screeningBody }}
            </p>
          </div>
          <div class="grid gap-5">
            <a :href="`${localePath('/egg-donors')}#screening`" class="inline-flex items-center justify-center rounded-3 bg-[var(--yunda-bark)] px-6 py-4 text-sm text-white font-bold transition hover:-translate-y-0.5">{{ c.screeningCta }} →</a>
            <div class="mt-5 flex flex-wrap gap-4 text-sm font-bold">
              <a :href="localePath('/egg-donor-process')" class="text-[var(--yunda-maple)] underline underline-offset-4">{{ locale === 'zh' ? '查看完整捐卵流程' : 'Read the full donation process' }} →</a>
              <a :href="localePath('/egg-donor-compensation')" class="text-[var(--yunda-maple)] underline underline-offset-4">{{ locale === 'zh' ? '了解补偿与费用' : 'Review compensation and expenses' }} →</a>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-white px-6 py-16 lg:px-10 lg:py-22">
        <div class="mx-auto max-w-320">
          <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">
            {{ c.faqTitle }}
          </h2>
          <div class="grid mt-9 gap-4 lg:grid-cols-2">
            <details v-for="faq in c.faqs" :key="faq.q" class="group border border-[var(--yunda-bark)]/10 rounded-4 bg-white px-5 py-4 shadow-[0_10px_30px_rgba(61,42,31,0.05)]">
              <summary class="cursor-pointer list-none text-base font-bold leading-7">
                <span class="flex items-start justify-between gap-4"><span>{{ faq.q }}</span><span class="text-[var(--yunda-maple)] transition group-open:rotate-45" aria-hidden="true">+</span></span>
              </summary>
              <p class="mt-3 text-sm text-[var(--yunda-bark)]/74 leading-7">
                {{ faq.a }}
              </p>
            </details>
          </div>
        </div>
      </section>

      <SeoTrustNote
        :updated="c.trustUpdated" :reviewed-by="c.trustReviewed" :note="c.trustNote" :sources="[
          { label: c.sourceFda, href: 'https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/what-you-should-know-reproductive-tissue-donation' },
          { label: c.sourceAsrm, href: 'https://www.asrm.org/practice-guidance/practice-committee-documents/guidance-regarding-gamete-and-embryo-donation' },
        ]"
      />

      <section class="from-[#f6d7b8] via-[var(--yunda-petal)] to-[#dce9ef] bg-gradient-to-r px-6 py-16 lg:px-10 lg:py-20">
        <div class="mx-auto max-w-4xl text-center">
          <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">
            {{ c.finalTitle }}
          </h2>
          <p class="mx-auto mt-5 max-w-3xl text-base text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-lg">
            {{ c.finalBody }}
          </p>
          <a href="mailto:kaylal@yundasurrogacy.com" class="mt-8 inline-flex items-center justify-center rounded-3 bg-[var(--yunda-bark)] px-7 py-4 text-sm text-white font-bold shadow-[0_16px_34px_rgba(61,42,31,0.2)]">{{ c.finalCta }}</a>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

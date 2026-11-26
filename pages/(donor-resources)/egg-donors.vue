<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import BreadcrumbNav from '@/components/base/BreadcrumbNav.vue'
import OptimizedPicture from '@/components/base/OptimizedPicture.vue'
import SeoTrustNote from '@/components/base/SeoTrustNote.vue'
import { buildCoreServicePageSchemas } from '~/utils/schema'

const { locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const pagePath = '/egg-donors'

const translations = {
  en: {
    seoTitle: 'Donating Eggs: How to Become an Egg Donor | Yunda Surrogacy',
    seoDescription: 'Learn how to donate eggs, what screening may involve, what to prepare, and how an egg donor program can guide your next step.',
    breadcrumbParent: 'For Donors',
    breadcrumbCurrent: 'Egg Donors',
    eyebrow: 'Egg donor program guidance',
    title: 'Donating Eggs: How to Become an Egg Donor',
    lead: 'If you are thinking about donating eggs, start with a clear view of the process, screening, time commitment, and questions to ask before you apply.',
    body: 'Yunda Surrogacy provides education and coordination for people exploring an egg donor program. A private conversation can help you understand the next step. The fertility clinic and qualified medical professionals decide whether you meet medical and donor-eligibility requirements.',
    primaryCta: 'Ask About the Donor Program',
    secondaryCta: 'Review Donor Requirements',
    answerTitle: 'How to donate eggs in five stages',
    answerIntro: 'The exact egg donation process depends on the donor program and fertility clinic. Most programs move through an initial inquiry, records review, medical and genetic screening, an approved donation cycle, and recovery follow-up.',
    quickFactsTitle: 'What you can confirm before applying',
    quickFacts: [
      { title: 'Eligibility varies', body: 'Programs and clinics may set their own limits for age, health history, reproductive history, lifestyle, location, and appointment availability.' },
      { title: 'Screening is more than one test', body: 'A program may coordinate medical, infectious-disease, genetic, and psychological or psychoeducational evaluation before approval.' },
      { title: 'The clinic owns medical decisions', body: 'Ask which physician or clinic reviews your records, explains risks, and decides whether you can enter a donation cycle.' },
      { title: 'Ask for written terms', body: 'Before deciding, request clear terms for privacy, expenses, medical-cost coverage, payment timing, cancellation, and follow-up.' },
    ],
    stages: [
      { label: 'Stage 1', title: 'Share your starting questions', body: 'Tell the program what you want to understand first, including eligibility, privacy, timing, location, and what information you would need before deciding whether to continue.', img: '/images/pages/surrogacy-process/step-01.png', avif: '/images/pages/surrogacy-process/step-01.avif', alt: 'A potential egg donor discussing her questions with a coordinator' },
      { label: 'Stage 2', title: 'Complete an initial records review', body: 'The program may ask for basic health, family, reproductive, medication, and lifestyle information. This first review helps identify which records or questions need professional follow-up.', img: '/images/pages/surrogacy-process/step-02.png', avif: '/images/pages/surrogacy-process/step-02.avif', alt: 'A fertility clinician explaining donor screening and treatment planning' },
      { label: 'Stage 3', title: 'Take part in screening', body: 'Depending on the program and clinic, screening may include a physical examination, infectious-disease testing, family and genetic history review, genetic screening, and counseling. The responsible clinic determines the required evaluation.', img: '/images/pages/surrogacy-process/step-03.png', avif: '/images/pages/surrogacy-process/step-03.avif', alt: 'A coordinator meeting with a potential egg donor' },
      { label: 'Stage 4', title: 'Follow the clinic cycle plan', body: 'If the clinic approves the donation path, it explains monitoring appointments, medication instructions, retrieval planning, consent documents, and the people to contact with medical questions.', img: '/images/pages/surrogacy-process/step-04.png', avif: '/images/pages/surrogacy-process/step-04.avif', alt: 'A clinician reviewing a fertility treatment plan with a patient' },
      { label: 'Stage 5', title: 'Plan recovery and follow-up', body: 'Ask in advance how the program handles post-retrieval follow-up, questions, travel, missed work, and any concern that needs urgent clinical attention. Your clinic should provide medical instructions for your case.', img: '/images/pages/surrogacy-process/step-05.png', avif: '/images/pages/surrogacy-process/step-05.avif', alt: 'A family reviewing documents and next steps with a coordinator' },
    ],
    programTitle: 'What an egg donor program should explain',
    programIntro: 'Before you share sensitive information or agree to a cycle, ask for clear answers about the program, clinic, records, consent, and communication process.',
    programCards: [
      { title: 'Eligibility and screening', body: 'Ask which baseline requirements apply, who makes the final medical decision, which records are needed, and when a genetic counselor or physician is involved.' },
      { title: 'Time and appointments', body: 'Ask how many monitoring visits may be expected, where appointments happen, how the cycle is scheduled, and what may cause a delay or cancellation.' },
      { title: 'Privacy and identity', body: 'Ask how your personal, medical, and genetic information is handled, what identity or contact expectations apply, and which records may be retained.' },
      { title: 'Costs and payment terms', body: 'Ask which expenses are covered, how payment terms are documented, what happens if a cycle is cancelled, and who explains the agreement before you sign.' },
    ],
    checklistTitle: 'What to prepare before you ask to donate eggs',
    checklist: [
      'Your current contact details and preferred communication method',
      'Basic medical, reproductive, medication, and family history',
      'Questions about screening, genetic testing, privacy, and future contact',
      'Your available dates, travel limits, work schedule, and support plan',
      'Questions about clinic location, monitoring visits, retrieval, and recovery',
      'A request for written program terms before making a decision',
    ],
    screeningTitle: 'What screening may include',
    screeningBody: 'U.S. reproductive tissue programs follow applicable FDA requirements for donor screening and testing. Professional guidance may also address medical history, genetic risk, infectious-disease testing, counseling, and informed consent. The required steps depend on the donor relationship, program, clinic, and applicable rules.',
    screeningLink: 'Read FDA donor information',
    processLink: 'Read ASRM donation guidance',
    faqTitle: 'Egg donor questions',
    faqs: [
      { q: 'How do I donate my eggs?', a: 'Start by contacting a real egg donor program and asking about its requirements, screening, clinic relationship, privacy terms, and next step. The clinic decides whether you are medically eligible before any donation cycle.' },
      { q: 'What are the requirements for egg donation?', a: 'Requirements vary by program and clinic. They may include age, health history, reproductive history, lifestyle, infectious-disease testing, genetic review, counseling, and the ability to attend required appointments. A public guide cannot make a final eligibility decision.' },
      { q: 'What happens during the egg donation process?', a: 'The process commonly includes an initial inquiry, records review, medical and genetic screening, clinic approval, a monitored treatment cycle, egg retrieval, and follow-up. Your clinic should explain the medical steps for your case.' },
      { q: 'How long does egg donation take?', a: 'Timing varies with records, screening, clinic scheduling, donor availability, and whether a cycle is delayed or cancelled. Ask the program for a case-specific estimate after the initial review.' },
      { q: 'Are egg donors paid?', a: 'Payment or compensation terms vary by program, location, agreement, and cycle conditions. Ask for the current written terms and review them with the appropriate professional before deciding. This page does not publish an amount because the project terms have not been confirmed.' },
      { q: 'Can I donate my eggs if I have questions or concerns?', a: 'Yes. Questions are part of the initial review. You can ask about privacy, screening, medical risks, scheduling, payment terms, and the right to pause before deciding whether to continue.' },
      { q: 'Do I need to have had a child before donating eggs?', a: 'There is no single answer for every program. Some clinics or programs may apply their own requirements, so ask the program to explain its current policy and the reason for it.' },
      { q: 'Do I need health insurance to donate eggs?', a: 'Requirements vary. Ask who pays for screening, treatment-related care, travel, and evaluation of a possible complication before you agree to a cycle.' },
      { q: 'Can I change my mind about donating eggs?', a: 'Ask the program and attorney when you can pause or withdraw, what happens after consent or contract signing, and which decisions become difficult to reverse later in the process.' },
      { q: 'Could egg donation affect my future fertility?', a: 'A reproductive physician should discuss the potential risks and your personal medical history. A public page cannot predict an individual outcome or replace clinical counseling.' },
    ],
    trustUpdated: 'Last updated: November 25, 2026',
    trustReviewed: 'Reviewed for Yunda Surrogacy coordination scope',
    trustNote: 'Yunda Surrogacy provides education and coordination. It does not make medical eligibility decisions, provide fertility treatment, provide genetic counseling, provide legal advice, or guarantee acceptance, compensation, medical outcomes, or donation results.',
    finalTitle: 'Have questions before you apply to donate eggs?',
    finalBody: 'Send your questions about the donor program, screening, timing, privacy, or next steps. Start with the information you are comfortable sharing.',
    finalCta: 'Email the Donor Program Team',
    sourceFda: 'FDA: Reproductive tissue donation',
    sourceAsrm: 'ASRM: Gamete and embryo donation guidance',
  },
  zh: {
    seoTitle: '捐卵流程：如何成为卵子捐赠者｜Yunda Surrogacy',
    seoDescription: '了解如何捐卵、筛查可能包括哪些内容、申请前需要准备什么，以及供卵项目如何帮助你了解下一步。',
    breadcrumbParent: '捐赠者指南',
    breadcrumbCurrent: '捐卵者',
    eyebrow: '供卵项目说明',
    title: '捐卵流程：如何成为卵子捐赠者',
    lead: '如果你正在考虑捐卵，可以先了解整体流程、筛查、时间投入，以及在申请前应该向项目方提出哪些问题。',
    body: 'Yunda Surrogacy 为正在了解供卵项目的人提供教育与协调支持。你可以先进行私密沟通，了解下一步。是否符合医疗和供体资格要求，由负责的生殖诊所及合格医疗专业人士判断。',
    primaryCta: '咨询供卵项目',
    secondaryCta: '查看捐卵要求',
    answerTitle: '捐卵流程通常包括五个阶段',
    answerIntro: '具体流程取决于供卵项目和生殖诊所。多数项目会经过初步咨询、资料审核、医疗与遗传筛查、获批后的捐赠周期以及取卵后的恢复与跟进。',
    quickFactsTitle: '申请前可以先确认什么',
    quickFacts: [
      { title: '资格因项目而异', body: '项目和诊所可能分别设置年龄、健康史、生育史、生活方式、所在地和就诊安排要求。' },
      { title: '筛查不止一项检查', body: '获批前可能需要医疗、传染病、遗传以及心理或心理教育评估。' },
      { title: '医疗决定由诊所负责', body: '询问由哪位医生或哪家诊所审核病历、解释风险，并判断是否可以进入捐赠周期。' },
      { title: '要求查看书面条款', body: '决定前应了解隐私、费用承担、支付节点、周期取消和后续跟进等条款。' },
    ],
    stages: [
      { label: '阶段 1', title: '先提出你的问题', body: '先告诉项目方你最想了解什么，包括资格、隐私、时间、地点，以及在决定是否继续前需要哪些信息。', img: '/images/pages/surrogacy-process/step-01.png', avif: '/images/pages/surrogacy-process/step-01.avif', alt: '潜在捐卵者与协调人员沟通问题' },
      { label: '阶段 2', title: '完成初步资料审核', body: '项目方可能会询问基本健康、生育、用药、家族史和生活方式信息。初步审核有助于确定哪些记录或问题需要专业人士进一步确认。', img: '/images/pages/surrogacy-process/step-02.png', avif: '/images/pages/surrogacy-process/step-02.avif', alt: '生殖医生向潜在捐卵者解释筛查与治疗规划' },
      { label: '阶段 3', title: '参与筛查', body: '根据项目和诊所要求，筛查可能包括体检、传染病检测、家族与遗传史审核、遗传筛查及咨询。具体评估由负责的诊所确定。', img: '/images/pages/surrogacy-process/step-03.png', avif: '/images/pages/surrogacy-process/step-03.avif', alt: '协调人员与潜在捐卵者进行沟通' },
      { label: '阶段 4', title: '按照诊所方案完成周期', body: '如果诊所批准捐赠路径，诊所会说明监测就诊、用药指导、取卵安排、同意文件，以及遇到医疗问题时应联系的专业人士。', img: '/images/pages/surrogacy-process/step-04.png', avif: '/images/pages/surrogacy-process/step-04.avif', alt: '医生向患者说明生殖治疗方案' },
      { label: '阶段 5', title: '安排恢复与后续沟通', body: '提前询问取卵后的跟进、问题咨询、旅行、工作安排，以及需要紧急联系诊所的情况。具体医疗指导应由诊所针对你的情况提供。', img: '/images/pages/surrogacy-process/step-05.png', avif: '/images/pages/surrogacy-process/step-05.avif', alt: '家庭与协调人员查看文件和下一步安排' },
    ],
    programTitle: '供卵项目应该说明什么',
    programIntro: '在提交敏感信息或同意进入周期前，应先了解项目、诊所、资料、同意和沟通方式。',
    programCards: [
      { title: '资格与筛查', body: '询问基础要求由谁确认、最终医疗决定由谁作出、需要哪些记录，以及何时会由遗传咨询师或医生参与。' },
      { title: '时间与就诊', body: '询问可能需要多少次监测、就诊地点、周期如何排期，以及哪些情况可能导致延迟或取消。' },
      { title: '隐私与身份', body: '询问个人、医疗和遗传信息如何保存，身份或未来联系预期是什么，哪些记录可能被长期保留。' },
      { title: '费用与支付条款', body: '询问哪些支出会被覆盖、支付条款如何记录、周期取消时如何处理，以及签署前由谁解释协议。' },
    ],
    checklistTitle: '咨询捐卵前可以准备什么',
    checklist: [
      '你的联系方式和偏好的沟通方式',
      '基本医疗、生育、用药和家族史',
      '关于筛查、遗传检测、隐私和未来联系的问题',
      '可用日期、旅行限制、工作安排和支持计划',
      '关于诊所地点、监测就诊、取卵和恢复的问题',
      '在决定前要求查看书面项目条款',
    ],
    screeningTitle: '筛查可能包括哪些内容',
    screeningBody: '美国生殖组织项目需要遵循适用的 FDA 供体筛查与检测要求。专业指南也可能涉及病史、遗传风险、传染病检测、咨询和知情同意。具体步骤取决于供体关系、项目、诊所和适用规则。',
    screeningLink: '阅读 FDA 供体说明',
    processLink: '阅读 ASRM 捐赠指南',
    faqTitle: '捐卵常见问题',
    faqs: [
      { q: '如何捐卵？', a: '可以先联系真实的供卵项目，询问要求、筛查、合作诊所、隐私条款和下一步。是否适合进入捐赠周期，由诊所在医疗审核后判断。' },
      { q: '捐卵需要满足什么要求？', a: '要求因项目和诊所而异，可能包括年龄、健康史、生育史、生活方式、传染病检测、遗传审核、咨询和按时就诊能力。公开页面不能替代最终资格判断。' },
      { q: '捐卵流程包括什么？', a: '通常包括初步咨询、资料审核、医疗与遗传筛查、诊所批准、监测治疗周期、取卵和后续跟进。具体医疗步骤应由诊所说明。' },
      { q: '捐卵需要多长时间？', a: '时间会受资料、筛查、诊所排期、供体安排，以及周期延迟或取消影响。完成初步审核后，可以向项目方询问个案时间估计。' },
      { q: '捐卵有补偿吗？', a: '补偿或支付条款会因项目、地区、协议和周期条件而异。决定前应索取当前书面条款，并向相应专业人士确认。本页不填写金额，因为项目条款尚未确认。' },
      { q: '有疑问还能咨询捐卵吗？', a: '可以。隐私、筛查、医疗风险、排期、支付条款和是否可以暂停，都是初步沟通时可以提出的问题。' },
      { q: '捐卵前必须生过孩子吗？', a: '并不是所有项目都采用相同要求。部分诊所或项目可能有自己的标准，应向项目方确认当前政策和适用原因。' },
      { q: '捐卵需要自己有医疗保险吗？', a: '要求因项目而异。进入周期前，应询问谁承担筛查、治疗相关医疗、旅行和可能并发症评估的费用。' },
      { q: '决定捐卵后还能改变主意吗？', a: '应向项目方和律师确认什么时候可以暂停或退出、签署同意或合同后会发生什么，以及哪些后续决定可能难以逆转。' },
      { q: '捐卵会影响未来生育吗？', a: '应由生殖医生结合你的个人病史说明潜在风险。公开页面不能预测个人结果，也不能替代临床咨询。' },
    ],
    trustUpdated: '最后更新：2026年11月25日',
    trustReviewed: '按 Yunda Surrogacy 协调服务范围审阅',
    trustNote: '孕达提供教育与协调，不作医疗资格判断，不提供生殖治疗、遗传咨询或法律建议，也不保证接受、补偿、医疗结果或捐赠结果。',
    finalTitle: '申请捐卵前还有问题？',
    finalBody: '你可以先询问供卵项目、筛查、时间、隐私或下一步。只需分享你愿意提供的信息。',
    finalCta: '邮件咨询供卵项目',
    sourceFda: 'FDA：生殖组织捐赠',
    sourceAsrm: 'ASRM：配子与胚胎捐赠指南',
  },
}

const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)
const breadcrumbItems = computed(() => [
  { label: c.value.breadcrumbParent, to: '/surrogates' },
  { label: c.value.breadcrumbCurrent },
])

const pageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: c.value.title,
  description: c.value.seoDescription,
  about: 'Egg donor recruitment, screening preparation, and donor program guidance',
  audience: 'Potential egg donors',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  dateModified: '2026-11-25',
  breadcrumbs: [
    { name: locale.value === 'zh' ? '首页' : 'Home', url: '/' },
    { name: c.value.breadcrumbParent, url: '/surrogates' },
    { name: c.value.breadcrumbCurrent, url: pagePath },
  ],
  service: {
    name: locale.value === 'zh' ? '供卵项目教育与协调支持' : 'Egg donor program education and coordination support',
    serviceType: locale.value === 'zh' ? '卵子捐赠者招募支持' : 'Egg donor recruitment support',
    audience: 'Potential egg donors',
    description: c.value.body,
  },
  itemList: {
    name: c.value.answerTitle,
    description: c.value.answerIntro,
    items: c.value.stages.map((stage, index) => ({
      position: index + 1,
      name: stage.title,
      description: stage.body,
      url: pagePath,
    })),
  },
}))

useHead(() => ({
  title: c.value.seoTitle,
  meta: [
    { name: 'description', content: c.value.seoDescription },
    { property: 'og:title', content: c.value.seoTitle },
    { property: 'og:description', content: c.value.seoDescription },
    { property: 'og:image', content: `${siteUrl.value}/images/pages/surrogacy-process/hero.jpg` },
    { name: 'twitter:title', content: c.value.seoTitle },
    { name: 'twitter:description', content: c.value.seoDescription },
    { name: 'twitter:image', content: `${siteUrl.value}/images/pages/surrogacy-process/hero.jpg` },
  ],
  script: pageSchemas.value.map((schema, index) => ({
    key: `schema-egg-donors-${index}`,
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
      <section class="relative overflow-hidden bg-gradient-to-br from-[var(--yunda-petal)] via-[#fff7ef] to-white">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-12%] top-[-25%] h-100 w-100 rounded-full bg-white/75 blur-3xl" />
          <div class="absolute right-[-12%] top-[-10%] h-120 w-120 rounded-full bg-[var(--yunda-sky)]/18 blur-3xl" />
        </div>
        <div class="relative grid mx-auto max-w-320 gap-10 px-6 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-10 lg:py-20">
          <div>
            <p class="text-xs text-[var(--yunda-maple)] font-extrabold tracking-[0.18em] uppercase">{{ c.eyebrow }}</p>
            <h1 class="mt-4 text-10.5 text-[var(--yunda-bark)] font-semibold leading-[1.08] font-display lg:text-14">{{ c.title }}</h1>
            <p class="mt-6 text-lg text-[var(--yunda-bark)]/88 font-medium leading-[1.75]">{{ c.lead }}</p>
            <p class="mt-4 text-base text-[var(--yunda-bark)]/76 leading-[1.8] lg:text-lg">{{ c.body }}</p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a href="mailto:kaylal@yundasurrogacy.com" class="inline-flex items-center justify-center rounded-3 bg-[var(--yunda-bark)] px-6 py-3.5 text-sm text-white font-bold shadow-[0_16px_34px_rgba(61,42,31,0.2)] transition hover:-translate-y-0.5">{{ c.primaryCta }}</a>
              <a href="#screening" class="inline-flex items-center justify-center border border-[var(--yunda-maple)]/35 rounded-3 bg-white/80 px-6 py-3.5 text-sm text-[var(--yunda-bark)] font-bold transition hover:border-[var(--yunda-maple)] hover:-translate-y-0.5">{{ c.secondaryCta }}</a>
            </div>
          </div>
          <div class="relative overflow-hidden border border-[var(--yunda-maple)]/20 rounded-7 bg-white shadow-[0_28px_70px_rgba(61,42,31,0.16)]">
            <OptimizedPicture src="/images/pages/surrogacy-process/hero.jpg" avif-src="/images/pages/surrogacy-process/hero.avif" :alt="c.title" width="1024" height="683" sizes="(max-width: 1024px) 100vw, 48vw" loading="eager" decoding="async" fetchpriority="high" picture-class="contents" img-class="aspect-[4/3] h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section class="bg-white px-6 py-12 lg:px-10 lg:py-16">
        <div class="mx-auto max-w-320 border border-[var(--yunda-maple)]/20 rounded-6 bg-[var(--yunda-petal)]/55 p-6 shadow-[0_14px_38px_rgba(61,42,31,0.06)] lg:p-8">
          <h2 class="text-7 font-semibold leading-tight font-display lg:text-9">{{ c.answerTitle }}</h2>
          <p class="mt-4 max-w-4xl text-base text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-lg">{{ c.answerIntro }}</p>
        </div>
      </section>

      <section class="px-6 py-14 lg:px-10 lg:py-18">
        <div class="mx-auto max-w-320">
          <h2 class="text-8 font-semibold leading-tight font-display lg:text-10">{{ c.quickFactsTitle }}</h2>
          <div class="grid mt-8 gap-4 md:grid-cols-2 lg:grid-cols-4">
            <article v-for="fact in c.quickFacts" :key="fact.title" class="border border-[var(--yunda-maple)]/18 rounded-5 bg-white p-5 shadow-[0_12px_30px_rgba(61,42,31,0.05)]">
              <h3 class="text-lg font-bold leading-snug">{{ fact.title }}</h3>
              <p class="mt-3 text-sm text-[var(--yunda-bark)]/74 leading-7">{{ fact.body }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="bg-white/70 px-6 py-16 lg:px-10 lg:py-22">
        <div class="mx-auto max-w-320">
          <div class="grid gap-5 lg:grid-cols-2">
            <article v-for="stage in c.stages" :key="stage.title" class="overflow-hidden border border-[var(--yunda-bark)]/10 rounded-6 bg-white shadow-[0_14px_40px_rgba(61,42,31,0.06)]">
              <OptimizedPicture :src="stage.img" :avif-src="stage.avif" :alt="stage.alt" width="1536" height="1024" sizes="(max-width: 1024px) 100vw, 50vw" loading="lazy" decoding="async" picture-class="contents" img-class="aspect-[16/9] w-full object-cover" />
              <div class="p-6 lg:p-7">
                <p class="text-xs text-[var(--yunda-maple)] font-extrabold tracking-[0.16em] uppercase">{{ stage.label }}</p>
                <h2 class="mt-2 text-xl font-bold leading-snug lg:text-2xl">{{ stage.title }}</h2>
                <p class="mt-3 text-base text-[var(--yunda-bark)]/76 leading-[1.75]">{{ stage.body }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="px-6 py-16 lg:px-10 lg:py-22">
        <div class="mx-auto max-w-320">
          <div class="max-w-4xl">
            <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">{{ c.programTitle }}</h2>
            <p class="mt-5 text-base text-[var(--yunda-bark)]/76 leading-[1.8] lg:text-lg">{{ c.programIntro }}</p>
          </div>
          <div class="grid mt-10 gap-5 md:grid-cols-2">
            <article v-for="card in c.programCards" :key="card.title" class="border border-[var(--yunda-bark)]/10 rounded-5 bg-white p-6 shadow-[0_14px_38px_rgba(61,42,31,0.05)]">
              <h3 class="text-xl font-bold">{{ card.title }}</h3>
              <p class="mt-3 text-sm text-[var(--yunda-bark)]/76 leading-7">{{ card.body }}</p>
            </article>
          </div>
        </div>
      </section>

      <section id="screening" class="bg-[var(--yunda-bark)] px-6 py-16 text-white lg:px-10 lg:py-22">
        <div class="mx-auto grid max-w-320 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">{{ c.screeningTitle }}</h2>
            <p class="mt-5 text-base text-white/76 leading-[1.8] lg:text-lg">{{ c.screeningBody }}</p>
            <div class="mt-6 flex flex-wrap gap-4 text-sm font-bold">
              <a href="https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/what-you-should-know-reproductive-tissue-donation" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">{{ c.screeningLink }} →</a>
              <a href="https://www.asrm.org/practice-guidance/practice-committee-documents/guidance-regarding-gamete-and-embryo-donation" target="_blank" rel="noopener noreferrer" class="underline underline-offset-4">{{ c.processLink }} →</a>
            </div>
          </div>
          <div class="rounded-6 bg-white/8 p-6 lg:p-8">
            <h3 class="text-2xl font-bold">{{ c.checklistTitle }}</h3>
            <ul class="mt-6 grid gap-3 sm:grid-cols-2">
              <li v-for="item in c.checklist" :key="item" class="flex gap-3 text-sm text-white/84 leading-6"><span class="mt-0.5 text-[var(--yunda-sky)] font-black" aria-hidden="true">✓</span><span>{{ item }}</span></li>
            </ul>
          </div>
        </div>
      </section>

      <SeoTrustNote :updated="c.trustUpdated" :reviewed-by="c.trustReviewed" :note="c.trustNote" :sources="[
        { label: c.sourceFda, href: 'https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/what-you-should-know-reproductive-tissue-donation' },
        { label: c.sourceAsrm, href: 'https://www.asrm.org/practice-guidance/practice-committee-documents/guidance-regarding-gamete-and-embryo-donation' },
      ]" />

      <section class="px-6 py-16 lg:px-10 lg:py-22">
        <div class="mx-auto max-w-320">
          <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">{{ c.faqTitle }}</h2>
          <div class="grid mt-9 gap-4 lg:grid-cols-2">
            <details v-for="faq in c.faqs" :key="faq.q" class="group border border-[var(--yunda-bark)]/10 rounded-4 bg-white px-5 py-4 shadow-[0_10px_30px_rgba(61,42,31,0.05)]">
              <summary class="cursor-pointer list-none text-base font-bold leading-7"><span class="flex items-start justify-between gap-4"><span>{{ faq.q }}</span><span class="text-[var(--yunda-maple)] transition group-open:rotate-45" aria-hidden="true">+</span></span></summary>
              <p class="mt-3 text-sm text-[var(--yunda-bark)]/74 leading-7">{{ faq.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <section class="from-[#f6d7b8] via-[var(--yunda-petal)] to-[#dce9ef] bg-gradient-to-r px-6 py-16 lg:px-10 lg:py-20">
        <div class="mx-auto max-w-4xl text-center">
          <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">{{ c.finalTitle }}</h2>
          <p class="mx-auto mt-5 max-w-3xl text-base text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-lg">{{ c.finalBody }}</p>
          <a href="mailto:kaylal@yundasurrogacy.com" class="mt-8 inline-flex items-center justify-center rounded-3 bg-[var(--yunda-bark)] px-7 py-4 text-sm text-white font-bold shadow-[0_16px_34px_rgba(61,42,31,0.2)]">{{ c.finalCta }}</a>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

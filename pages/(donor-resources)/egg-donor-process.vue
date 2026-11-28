<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
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
const pagePath = '/egg-donor-process'

const translations = {
  en: {
    seoTitle: 'Egg Donation Process: Screening to Retrieval | Yunda Surrogacy',
    seoDescription: 'Understand the egg donation process, including initial review, screening, matching, medication, egg retrieval, recovery, and timing questions.',
    breadcrumbParent: 'For Donors',
    breadcrumbCurrent: 'Egg Donation Process',
    eyebrow: 'Egg donor process guide',
    title: 'Egg Donation Process: What to Expect From Screening to Recovery',
    lead: 'The egg donation process can involve several stages before and after a retrieval. This guide helps you understand the sequence, questions, and time commitments to discuss with the program and fertility clinic.',
    body: 'Yunda Surrogacy provides education and coordination for people exploring an egg donor program. The responsible clinic makes medical decisions, explains treatment risks, and confirms the steps that apply to your case.',
    primaryCta: 'Ask About the Process',
    secondaryCta: 'Review Donor Requirements',
    answerTitle: 'What is the egg donation process?',
    answerBody: 'The egg donation process commonly moves from an initial inquiry and records review to medical, genetic, and psychological screening, program approval, a monitored treatment cycle, egg retrieval, and post-retrieval follow-up. The sequence and timing can change with the program, clinic, donor relationship, scheduling, and applicable requirements.',
    stepsTitle: 'Egg donor process step by step',
    steps: [
      { label: 'Step 1', title: 'Initial inquiry and records review', body: 'You share the information needed for a preliminary review and ask about requirements, privacy, locations, appointment availability, and the next decision point.' },
      { label: 'Step 2', title: 'Medical, genetic, and psychological screening', body: 'Depending on the program and clinic, screening may include medical history, physical examination, infectious-disease testing, genetic review, genetic testing, counseling, and a psychological or psychoeducational assessment.' },
      { label: 'Step 3', title: 'Approval and donor program coordination', body: 'If the program and clinic determine that you can continue, the coordinator explains the cycle plan, consent documents, communication process, and appointments that must be completed before treatment.' },
      { label: 'Step 4', title: 'Medication and monitoring', body: 'The fertility clinic explains any medication protocol and monitoring schedule for your case. Monitoring may involve blood tests, ultrasound visits, medication adjustments, and instructions about what to do when questions or concerns arise.' },
      { label: 'Step 5', title: 'Egg retrieval', body: 'Egg retrieval is performed by the fertility clinic under the medical plan it has explained to you. Ask about the appointment, transportation, anesthesia or sedation, recovery instructions, and who to contact after the procedure.' },
      { label: 'Step 6', title: 'Recovery and follow-up', body: 'The program and clinic should explain post-retrieval follow-up, symptoms that require medical attention, work and travel planning, future contact questions, and any remaining documents or payment terms.' },
    ],
    timingTitle: 'How long does the egg donation process take?',
    timingBody: 'There is no single timeline for every donor. Timing may depend on the initial review, screening appointments, clinic availability, matching or cycle planning, medication instructions, monitoring, retrieval scheduling, and follow-up. Ask for a case-specific estimate after the program confirms which steps apply.',
    timingStampTop: 'ASK',
    timingStampBottom: 'YOUR CLINIC',
    timingItems: [
      'Pre-screening and records review may happen before a clinic appointment is scheduled.',
      'Medical and counseling appointments may be spread across several visits.',
      'A treatment cycle can require time-sensitive monitoring and schedule flexibility.',
      'A cycle may be delayed, changed, or cancelled if the clinic identifies a medical or logistical reason.',
      'Recovery and follow-up should be planned before the retrieval appointment.',
    ],
    freshFrozenTitle: 'Fresh and frozen egg donation paths',
    freshFrozenIntro: 'Fresh and frozen pathways involve different scheduling and coordination questions. The responsible clinic or donor program should explain which path is available and what it means for your participation.',
    fresh: { title: 'Fresh donation cycle', body: 'A fresh cycle may require coordination between the donor, clinic, and recipient-side treatment plan. Ask how synchronization, monitoring, retrieval scheduling, and a possible delay would be handled.' },
    frozen: { title: 'Frozen donor eggs', body: 'Frozen donor eggs have already been retrieved and stored according to the donor program or clinic process. If you are considering donating eggs that were previously frozen, ask the receiving clinic to review the specific source and documentation.' },
    questionsTitle: 'Questions to ask before you start',
    questionsExpandAll: 'Expand all',
    questionsCollapseAll: 'Collapse all',
    questions: [
      'Who makes the medical decision about whether I can enter a donation cycle?',
      'Which screening visits, tests, and counseling sessions are required?',
      'How many monitoring appointments may be needed, and where will they take place?',
      'What happens if the cycle is delayed, cancelled, or stopped before retrieval?',
      'What should I arrange for transportation, work, travel, and recovery?',
      'How are privacy, identity, genetic records, and future contact handled?',
    ],
    faqTitle: 'Egg donation process FAQ',
    faqs: [
      { q: 'What is the process of egg donation?', a: 'It commonly includes an initial inquiry, records review, medical and genetic screening, counseling, program and clinic approval, a monitored treatment cycle, egg retrieval, and follow-up. The required steps vary by case.' },
      { q: 'What is egg donor process?', a: 'The egg donor process is the sequence of review, screening, clinic planning, treatment monitoring, retrieval, and follow-up that may apply to a donor. The responsible program and clinic confirm the details.' },
      { q: 'What is the egg donation procedure?', a: 'The egg donation procedure usually refers to the monitored treatment cycle and egg retrieval, together with the screening and recovery steps around it. A fertility clinic should explain the procedure for your case.' },
      { q: 'What is the procedure for donating your eggs?', a: 'The procedure for donating your eggs may include screening, consent, medication, monitoring, retrieval, and recovery. The clinic explains the medical instructions, risks, and appointments before treatment.' },
      { q: 'What is the process to donate eggs?', a: 'Start with an initial review, then complete the screening and clinic steps required by the program. If approved, the clinic explains the treatment cycle, retrieval, and follow-up.' },
      { q: 'How long does egg donation process take?', a: 'The timeline varies with screening, clinic scheduling, matching or cycle planning, monitoring, retrieval, and follow-up. Ask the program for a case-specific estimate.' },
      { q: 'What happens when you donate your eggs?', a: 'You may complete screening, follow a clinic treatment plan, attend monitoring appointments, undergo an egg retrieval, and receive recovery instructions and follow-up. Your clinic should explain the medical details and risks.' },
      { q: 'How long is the egg donation process?', a: 'Timing varies. Ask for a case-specific estimate after the program reviews your records and confirms the screening, clinic, matching, treatment, retrieval, and follow-up steps that apply.' },
      { q: 'Is egg donation the same as IVF?', a: 'The donor cycle uses some of the same early treatment concepts as IVF, but the donor’s role, treatment plan, retrieval, consent, and follow-up are specific to egg donation. A fertility clinic should explain the differences.' },
      { q: 'What happens after egg retrieval?', a: 'The clinic should provide recovery instructions, follow-up contacts, and guidance about symptoms, work, travel, and future care. Ask who manages medical questions after you leave the clinic.' },
      { q: 'Can I stop during the egg donation process?', a: 'Ask the program and appropriate legal or medical professionals when you can pause or withdraw, what happens after consent or contract signing, and which decisions may become difficult to reverse.' },
      { q: 'Does the egg donation process affect future fertility?', a: 'A reproductive physician should discuss potential risks and your personal medical history. A public guide cannot predict an individual outcome or replace clinical counseling.' },
    ],
    trustUpdated: 'Last updated: November 27, 2026',
    trustReviewed: 'Reviewed for Yunda Surrogacy coordination scope',
    trustNote: 'Yunda Surrogacy provides education and coordination. It does not provide fertility treatment, make medical eligibility decisions, provide genetic counseling, provide legal advice, or guarantee acceptance, compensation, medical outcomes, or donation results.',
    finalTitle: 'Have questions about the egg donation process?',
    finalBody: 'Send your questions about screening, appointments, timing, privacy, recovery, or the next step. Start with the information you are comfortable sharing.',
    finalCta: 'Ask About the Donor Program',
    sourceFda: 'FDA: Reproductive tissue donation',
    sourceAsrm: 'ASRM: Gamete and embryo donation guidance',
    heroAlt: 'Potential egg donor reviewing a treatment timeline with a fertility coordinator',
  },
  zh: {
    seoTitle: '捐卵流程：从筛查到取卵恢复｜Yunda Surrogacy',
    seoDescription: '了解捐卵流程，包括初步审核、筛查、匹配、用药、取卵、恢复和时间安排问题。',
    breadcrumbParent: '捐赠者指南',
    breadcrumbCurrent: '捐卵流程',
    eyebrow: '捐卵流程指南',
    title: '捐卵流程：从筛查到取卵恢复需要经历什么？',
    lead: '捐卵流程通常包括取卵前后的多个阶段。这份指南帮助你了解流程顺序、需要提出的问题和可能涉及的时间投入，再与项目方和生殖诊所确认个案安排。',
    body: 'Yunda Surrogacy 为正在了解供卵项目的人提供教育与协调支持。是否适合进入周期、医疗风险和具体流程，由负责的生殖诊所结合个案说明和判断。',
    primaryCta: '咨询捐卵流程',
    secondaryCta: '查看捐卵资格要求',
    answerTitle: '捐卵流程包括哪些步骤？',
    answerBody: '捐卵流程通常从初步咨询和资料审核开始，经过医疗、遗传和心理筛查、项目批准、监测治疗周期、取卵和取卵后的跟进。具体顺序和时间会受项目、诊所、供体关系、排期和适用要求影响。',
    stepsTitle: '捐卵流程分步说明',
    steps: [
      { label: '步骤 1', title: '初步咨询与资料审核', body: '你需要提供初步审核所需的信息，并询问资格要求、隐私、就诊地点、预约安排和下一步判断节点。' },
      { label: '步骤 2', title: '医疗、遗传与心理筛查', body: '根据项目和诊所要求，筛查可能包括病史、体检、传染病检测、遗传史审核、遗传检测、咨询以及心理或心理教育评估。' },
      { label: '步骤 3', title: '项目批准与协调安排', body: '如果项目和诊所确认可以继续，协调人员会说明周期计划、同意文件、沟通方式，以及治疗前必须完成的就诊。' },
      { label: '步骤 4', title: '用药与监测', body: '生殖诊所会针对你的情况说明用药方案和监测安排。监测可能包括抽血、超声、用药调整，以及出现疑问或不适时的联系方法。' },
      { label: '步骤 5', title: '取卵', body: '取卵由生殖诊所按照医疗方案完成。应提前了解就诊安排、交通、麻醉或镇静、恢复要求，以及术后联系人员。' },
      { label: '步骤 6', title: '恢复与后续跟进', body: '项目方和诊所应说明取卵后的跟进、需要医疗关注的症状、工作与旅行安排、未来联系问题，以及剩余文件或支付条款。' },
    ],
    timingTitle: '捐卵流程需要多长时间？',
    timingBody: '每位供体的时间安排并不完全相同。时间可能受初步审核、筛查就诊、诊所排期、匹配或周期计划、用药指导、监测、取卵安排和后续跟进影响。项目确认适用步骤后，可以询问个案时间估计。',
    timingStampTop: '可以询问',
    timingStampBottom: '项目与诊所',
    timingItems: [
      '初步筛查和资料审核可能早于诊所预约。',
      '医疗和咨询就诊可能分布在多次预约中。',
      '治疗周期可能需要按时间参加监测，并保留一定排期弹性。',
      '如果诊所发现医疗或实际安排问题，周期可能延迟、调整或取消。',
      '取卵前应提前安排恢复、工作和交通计划。',
    ],
    freshFrozenTitle: '新鲜卵子与冷冻卵子路径',
    freshFrozenIntro: '新鲜和冷冻路径涉及不同的排期与协调问题。具体项目或诊所应说明你可以参与哪种路径，以及这对你的安排意味着什么。',
    fresh: { title: '新鲜卵子周期', body: '新鲜周期可能需要供体、诊所和接受方治疗计划之间进行协调。应询问周期同步、监测、取卵排期和周期延迟时如何处理。' },
    frozen: { title: '冷冻供卵', body: '冷冻卵子已经按照供卵项目或诊所流程完成取卵和保存。如果你考虑捐赠此前冷冻的卵子，应由接收诊所审核具体来源和相关记录。' },
    questionsTitle: '开始前可以向项目方询问什么',
    questionsExpandAll: '展开全部',
    questionsCollapseAll: '收起全部',
    questions: [
      '谁负责判断我是否可以进入捐赠周期？',
      '需要完成哪些筛查、检测和咨询？',
      '可能需要多少次监测，就诊地点在哪里？',
      '周期延迟、取消或取卵前停止时如何处理？',
      '交通、工作、旅行和恢复需要提前安排什么？',
      '隐私、身份、遗传记录和未来联系如何处理？',
    ],
    faqTitle: '捐卵流程常见问题',
    faqs: [
      { q: '捐卵的流程是什么？', a: '通常包括初步咨询、资料审核、医疗与遗传筛查、咨询、项目和诊所批准、监测治疗周期、取卵和后续跟进。具体步骤会因个案而异。' },
      { q: '什么是捐卵流程？', a: '捐卵流程是从资料审核、筛查、诊所安排到监测治疗、取卵和后续跟进的一系列步骤。具体内容由负责项目和诊所确认。' },
      { q: '捐卵手术流程包括什么？', a: '这里的流程通常指取卵前后的筛查、同意、用药、监测、取卵和恢复安排。具体医疗步骤应由生殖诊所说明。' },
      { q: '捐卵具体怎么进行？', a: '通常先进行初步审核，再完成项目和诊所要求的筛查。获批后，诊所会说明治疗周期、取卵和后续跟进。' },
      { q: '捐卵需要经过哪些流程？', a: '一般会经过初步咨询、资料审核、医疗与遗传筛查、诊所批准、监测周期、取卵和恢复跟进。每个项目的要求可能不同。' },
      { q: '捐卵流程需要多长时间？', a: '时间会受筛查、诊所排期、匹配或周期计划、监测、取卵和后续跟进影响。可以在项目审核资料后询问个案时间估计。' },
      { q: '捐卵时会经历什么？', a: '你可能需要完成筛查、遵循诊所治疗方案、参加监测就诊、完成取卵，并接受恢复指导和后续跟进。具体医疗细节和风险应由诊所说明。' },
      { q: '捐卵流程需要多长时间？', a: '时间因人而异。项目审核资料并确认筛查、诊所、匹配、治疗、取卵和跟进步骤后，可以询问个案时间估计。' },
      { q: '捐卵流程和 IVF 一样吗？', a: '供体周期会涉及部分与 IVF 早期治疗相似的内容，但供体角色、治疗安排、取卵、同意和后续跟进具有捐卵流程的具体要求。应由生殖诊所说明区别。' },
      { q: '取卵后会发生什么？', a: '诊所应提供恢复指导、后续联系人员，以及关于症状、工作、旅行和后续医疗的说明。应提前确认离开诊所后由谁处理医疗问题。' },
      { q: '捐卵过程中可以停止吗？', a: '应向项目方和相应的法律或医疗专业人士确认什么时候可以暂停或退出、签署同意或合同后会发生什么，以及哪些决定可能难以逆转。' },
      { q: '捐卵会影响未来生育吗？', a: '应由生殖医生结合你的个人病史说明潜在风险。公开指南不能预测个人结果，也不能替代临床咨询。' },
    ],
    trustUpdated: '最后更新：2026年11月27日',
    trustReviewed: '按 Yunda Surrogacy 协调服务范围审阅',
    trustNote: '孕达提供教育与协调，不提供生殖治疗，不作医疗资格判断，不提供遗传咨询或法律建议，也不保证接受、补偿、医疗结果或捐赠结果。',
    finalTitle: '对捐卵流程还有问题？',
    finalBody: '你可以询问筛查、就诊、时间、隐私、恢复或下一步安排。只需先分享你愿意提供的信息。',
    finalCta: '咨询供卵项目',
    sourceFda: 'FDA：生殖组织捐赠',
    sourceAsrm: 'ASRM：配子与胚胎捐赠指南',
    heroAlt: '潜在捐卵者与生殖协调人员查看治疗时间安排',
  },
}

const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)
const activeStep = ref(0)
const processRoot = ref<HTMLElement | null>(null)
const motionReady = ref(false)
const allQuestionsOpen = ref(false)
let stepObserver: IntersectionObserver | null = null
let revealObserver: IntersectionObserver | null = null

onMounted(() => {
  if (!processRoot.value)
    return

  const revealItems = Array.from(processRoot.value.querySelectorAll<HTMLElement>('.reveal'))
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    revealItems.forEach(item => item.classList.add('is-visible'))
    return
  }

  motionReady.value = true
  revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting)
        return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 })
  revealItems.forEach(item => revealObserver?.observe(item))
  requestAnimationFrame(() => {
    revealItems.forEach((item) => {
      const rect = item.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0)
        item.classList.add('is-visible')
    })
  })

  const steps = Array.from(processRoot.value.querySelectorAll<HTMLElement>('[data-process-step]'))
  stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting)
        activeStep.value = Number(entry.target.getAttribute('data-process-step'))
    })
  }, { rootMargin: '-30% 0px -55% 0px', threshold: 0 })

  steps.forEach(step => stepObserver?.observe(step))
})

onBeforeUnmount(() => {
  stepObserver?.disconnect()
  revealObserver?.disconnect()
})

function syncQuestionsState() {
  if (!processRoot.value)
    return
  const questions = Array.from(processRoot.value.querySelectorAll<HTMLDetailsElement>('.question-item'))
  allQuestionsOpen.value = questions.length > 0 && questions.every(question => question.open)
}

function toggleAllQuestions() {
  if (!processRoot.value)
    return
  const nextState = !allQuestionsOpen.value
  processRoot.value.querySelectorAll<HTMLDetailsElement>('.question-item').forEach((question) => {
    question.open = nextState
  })
  allQuestionsOpen.value = nextState
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
  about: 'Egg donation process, screening, retrieval, recovery, and donor coordination',
  audience: 'Potential egg donors',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  dateModified: '2026-11-27',
  breadcrumbs: [
    { name: locale.value === 'zh' ? '首页' : 'Home', url: '/' },
    { name: c.value.breadcrumbParent, url: '/surrogates' },
    { name: c.value.breadcrumbCurrent, url: pagePath },
  ],
  service: {
    name: locale.value === 'zh' ? '捐卵流程教育与协调支持' : 'Egg donation process education and coordination support',
    serviceType: locale.value === 'zh' ? '捐卵流程说明' : 'Egg donation process guidance',
    audience: 'Potential egg donors',
    description: c.value.answerBody,
  },
  itemList: {
    name: c.value.stepsTitle,
    description: c.value.answerBody,
    items: c.value.steps.map((step, index) => ({
      position: index + 1,
      name: step.title,
      description: step.body,
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
    { property: 'og:image', content: `${siteUrl.value}/images/pages/egg-donor-process/hero.jpg` },
    { name: 'twitter:title', content: c.value.seoTitle },
    { name: 'twitter:description', content: c.value.seoDescription },
    { name: 'twitter:image', content: `${siteUrl.value}/images/pages/egg-donor-process/hero.jpg` },
  ],
  script: pageSchemas.value.map((schema, index) => ({
    key: `schema-egg-donor-process-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div ref="processRoot" class="process-page min-h-screen bg-[var(--yunda-petal)] text-[var(--yunda-bark)]" :class="{ 'motion-ready': motionReady }">
    <AppHeader />
    <BreadcrumbNav :items="breadcrumbItems" />

    <main>
      <section class="process-hero relative overflow-hidden bg-[var(--yunda-bark)] text-white">
        <div class="process-hero-glow process-hero-glow-one" />
        <div class="process-hero-glow process-hero-glow-two" />
        <div class="relative grid mx-auto max-w-320 gap-10 px-6 py-16 lg:grid-cols-[1.08fr_0.92fr] lg:items-end lg:gap-20 lg:px-10 lg:py-24">
          <div class="reveal reveal-left">
            <p class="text-xs text-[var(--yunda-maple)] font-extrabold tracking-[0.18em] uppercase">
              {{ c.eyebrow }}
            </p>
            <h1 class="mt-5 max-w-5xl text-10.5 font-semibold leading-[1.06] font-display lg:text-15">
              {{ c.title }}
            </h1>
            <p class="mt-7 max-w-3xl text-lg text-white/78 leading-[1.75] lg:text-xl">
              {{ c.lead }}
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a href="mailto:kaylal@yundasurrogacy.com" class="magnetic-link inline-flex items-center justify-center rounded-3 bg-[var(--yunda-maple)] px-6 py-3.5 text-sm text-white font-bold transition hover:bg-[#c67d48] hover:-translate-y-1">{{ c.primaryCta }}</a>
              <a :href="localePath('/egg-donor-requirements')" class="inline-flex items-center justify-center border border-white/30 rounded-3 px-6 py-3.5 text-sm text-white font-bold transition hover:border-white hover:-translate-y-1">{{ c.secondaryCta }}</a>
              <a :href="localePath('/egg-donor-compensation')" class="inline-flex items-center justify-center border border-white/30 rounded-3 px-6 py-3.5 text-sm text-white/85 font-bold transition hover:border-white hover:text-white hover:-translate-y-1">{{ locale === 'zh' ? '查看补偿与费用' : 'Review compensation and expenses' }}</a>
              <a :href="localePath('/egg-donors')" class="basis-full text-sm text-white/65 underline underline-offset-4 transition hover:text-white">{{ locale === 'zh' ? '返回捐卵项目总览' : 'Back to the egg donor program' }} →</a>
            </div>
          </div>
          <div class="reveal reveal-right relative min-h-0 self-end">
            <div class="hero-number" aria-hidden="true">
              01
            </div>
            <div class="hero-image-frame relative aspect-[16/10] overflow-hidden border border-white/25 rounded-b-4 rounded-t-[4rem] bg-white/10 lg:aspect-[16/9] lg:rounded-t-[6rem]">
              <OptimizedPicture src="/images/pages/egg-donor-process/hero.jpg" :alt="c.heroAlt" width="1672" height="941" sizes="(max-width: 1024px) 100vw, 42vw" loading="eager" decoding="async" fetchpriority="high" picture-class="contents" img-class="h-full w-full object-cover" />
            </div>
            <span class="hero-caption absolute bottom-5 left-0 rounded-full bg-white px-4 py-2 text-xs text-[var(--yunda-bark)] font-bold tracking-wide">{{ c.eyebrow }}</span>
          </div>
        </div>
      </section>

      <section class="answer-section bg-white px-6 py-16 lg:px-10 lg:py-24">
        <div class="grid mx-auto max-w-320 gap-10 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
          <div class="reveal">
            <span class="section-kicker">01 / {{ c.eyebrow }}</span>
            <h2 class="mt-4 text-8 font-semibold leading-tight font-display lg:text-11">
              {{ c.answerTitle }}
            </h2>
          </div>
          <div class="reveal reveal-delay-1 border-t border-[var(--yunda-bark)]/20 pt-6 lg:pt-8">
            <p class="max-w-5xl text-xl text-[var(--yunda-bark)]/82 leading-[1.75] lg:text-2xl">
              {{ c.answerBody }}
            </p>
          </div>
        </div>
      </section>

      <section class="process-track-section bg-[var(--yunda-bark)] px-6 py-18 text-white lg:px-10 lg:py-28">
        <div class="mx-auto max-w-320">
          <div class="reveal max-w-3xl">
            <span class="section-kicker section-kicker-light">02 / {{ c.stepsTitle }}</span>
            <h2 class="mt-4 text-8 font-semibold leading-tight font-display lg:text-12">
              {{ c.stepsTitle }}
            </h2>
            <p class="mt-5 text-base text-white/65 leading-[1.8] lg:text-lg">
              {{ c.answerBody }}
            </p>
          </div>

          <div class="process-track grid mt-14 gap-12 lg:grid-cols-[0.28fr_0.72fr] lg:mt-20 lg:gap-16">
            <nav class="process-nav hidden lg:block" aria-label="Egg donation process stages">
              <div class="process-nav-line" />
              <div class="process-nav-progress" :style="{ '--progress-height': `${((activeStep + 1) / c.steps.length) * 100}%` }" />
              <a v-for="(step, index) in c.steps" :key="`nav-${step.title}`" :href="`#process-step-${index}`" class="process-nav-item" :class="{ 'is-active': activeStep === index }">
                <span class="process-nav-dot">{{ String(index + 1).padStart(2, '0') }}</span>
                <span>{{ step.title }}</span>
              </a>
            </nav>

            <div class="process-steps">
              <article v-for="(step, index) in c.steps" :id="`process-step-${index}`" :key="step.title" :data-process-step="index" class="process-step reveal" :class="{ 'is-active': activeStep === index }" :style="{ '--step-delay': `${index * 80}ms` }">
                <div class="process-step-number">
                  {{ step.label }}
                </div>
                <div class="process-step-copy">
                  <div class="mb-5 flex items-center gap-3 lg:hidden">
                    <span class="process-mobile-dot" /> <span class="text-xs text-[var(--yunda-maple)] font-bold tracking-[0.16em] uppercase">{{ String(index + 1).padStart(2, '0') }} / 06</span>
                  </div>
                  <h3 class="text-3xl font-semibold leading-tight font-display lg:text-5">
                    {{ step.title }}
                  </h3>
                  <p class="mt-5 max-w-2xl text-base text-white/70 leading-[1.85] lg:text-lg">
                    {{ step.body }}
                  </p>
                </div>
                <span class="process-step-arrow" aria-hidden="true">↗</span>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="timing-section overflow-hidden px-6 py-18 lg:px-10 lg:py-28">
        <div class="grid mx-auto max-w-320 gap-12 lg:grid-cols-[0.72fr_0.28fr] lg:items-start">
          <div class="reveal reveal-left">
            <span class="section-kicker">03 / {{ c.timingTitle }}</span>
            <h2 class="mt-4 max-w-4xl text-8 font-semibold leading-tight font-display lg:text-12">
              {{ c.timingTitle }}
            </h2>
            <p class="mt-6 max-w-3xl text-lg text-[var(--yunda-bark)]/75 leading-[1.8] lg:text-xl">
              {{ c.timingBody }}
            </p>
          </div>
          <div class="timing-stamp reveal reveal-right">
            {{ c.timingStampTop }}<br><span>{{ c.timingStampBottom }}</span>
          </div>
        </div>
        <div class="relative mx-auto mt-14 max-w-320 border-t border-[var(--yunda-bark)]/20 lg:mt-20">
          <div class="timing-rail" />
          <ol class="grid gap-0 lg:grid-cols-5">
            <li v-for="(item, index) in c.timingItems" :key="item" class="timing-item reveal" :style="{ '--step-delay': `${index * 100}ms` }">
              <span class="timing-dot">{{ String(index + 1).padStart(2, '0') }}</span><p>{{ item }}</p>
            </li>
          </ol>
        </div>
      </section>

      <section class="pathways-section bg-white px-6 py-18 lg:px-10 lg:py-28">
        <div class="mx-auto max-w-320">
          <div class="reveal max-w-3xl">
            <span class="section-kicker">04 / {{ c.freshFrozenTitle }}</span><h2 class="mt-4 text-8 font-semibold leading-tight font-display lg:text-12">
              {{ c.freshFrozenTitle }}
            </h2><p class="mt-5 text-lg text-[var(--yunda-bark)]/75 leading-[1.8] lg:text-xl">
              {{ c.freshFrozenIntro }}
            </p>
          </div>
          <div class="pathways-grid grid mt-14 gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:mt-20 lg:items-end">
            <article class="pathway pathway-fresh reveal reveal-left">
              <span class="pathway-index">A</span><h3 class="mt-20 max-w-md text-4xl font-semibold leading-tight font-display lg:text-6">
                {{ c.fresh.title }}
              </h3><p class="mt-5 max-w-xl text-base text-white/75 leading-[1.8] lg:text-lg">
                {{ c.fresh.body }}
              </p>
            </article>
            <article class="pathway pathway-frozen reveal reveal-right">
              <span class="pathway-index">B</span><h3 class="mt-16 max-w-md text-3xl font-semibold leading-tight font-display lg:text-5">
                {{ c.frozen.title }}
              </h3><p class="mt-5 max-w-xl text-base text-[var(--yunda-bark)]/75 leading-[1.8] lg:text-lg">
                {{ c.frozen.body }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section class="questions-section px-6 py-18 lg:px-10 lg:py-28">
        <div class="grid mx-auto max-w-320 gap-12 lg:grid-cols-[0.4fr_0.6fr] lg:gap-20">
          <div class="reveal reveal-left">
            <span class="section-kicker">05 / {{ c.questionsTitle }}</span><h2 class="mt-4 text-8 font-semibold leading-tight font-display lg:text-12">
              {{ c.questionsTitle }}
            </h2>
          </div>
          <div class="question-list border-t border-[var(--yunda-bark)]/20">
            <div class="question-toolbar reveal">
              <button type="button" class="question-toggle" :aria-expanded="allQuestionsOpen" @click="toggleAllQuestions">
                <span>{{ allQuestionsOpen ? c.questionsCollapseAll : c.questionsExpandAll }}</span><span class="question-toggle-icon" :class="{ 'is-open': allQuestionsOpen }" aria-hidden="true">+</span>
              </button>
            </div>
            <details v-for="(item, index) in c.questions" :key="item" class="question-item reveal" :style="{ '--step-delay': `${index * 70}ms` }" @toggle="syncQuestionsState">
              <summary><span class="question-index">{{ String(index + 1).padStart(2, '0') }}</span><span class="question-text">{{ item }}</span><span class="question-plus" aria-hidden="true">+</span></summary><p>{{ item }}</p>
            </details>
          </div>
        </div>
      </section>

      <section class="faq-section bg-white px-6 py-18 lg:px-10 lg:py-28">
        <div class="mx-auto max-w-320">
          <div class="reveal">
            <span class="section-kicker">06 / {{ c.faqTitle }}</span><h2 class="mt-4 text-8 font-semibold leading-tight font-display lg:text-12">
              {{ c.faqTitle }}
            </h2>
          </div><div class="faq-list grid mt-12 gap-x-12 lg:grid-cols-2 lg:mt-18">
            <details v-for="faq in c.faqs" :key="faq.q" class="faq-item reveal">
              <summary><span>{{ faq.q }}</span><span class="faq-plus" aria-hidden="true">+</span></summary><p>{{ faq.a }}</p>
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

      <section class="final-section relative overflow-hidden px-6 py-20 lg:px-10 lg:py-32">
        <div class="final-orb" /><div class="reveal relative mx-auto max-w-4xl text-center">
          <span class="section-kicker">07 / {{ c.finalTitle }}</span><h2 class="mt-4 text-8 font-semibold leading-tight font-display lg:text-12">
            {{ c.finalTitle }}
          </h2><p class="mx-auto mt-5 max-w-3xl text-lg text-[var(--yunda-bark)]/75 leading-[1.8] lg:text-xl">
            {{ c.finalBody }}
          </p><a href="mailto:kaylal@yundasurrogacy.com" class="magnetic-link mt-8 inline-flex items-center justify-center rounded-3 bg-[var(--yunda-bark)] px-7 py-4 text-sm text-white font-bold shadow-[0_16px_34px_rgba(61,42,31,0.2)] transition hover:-translate-y-1">{{ c.finalCta }}</a>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.process-page {
  --process-line: rgba(255, 255, 255, 0.22);
}
.section-kicker {
  color: var(--yunda-maple);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.section-kicker-light {
  color: #f6b987;
}
.process-track-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}
.process-track-section::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 4rem 4rem;
  content: '';
  mask-image: linear-gradient(90deg, transparent, black 18%, black 82%, transparent);
}
.process-track-section::after {
  position: absolute;
  top: 18%;
  right: -6rem;
  z-index: -1;
  width: 22rem;
  height: 22rem;
  border: 1px solid rgba(246, 185, 135, 0.28);
  border-radius: 50%;
  content: '';
  animation: drift 14s ease-in-out infinite alternate;
}
.process-hero {
  min-height: clamp(620px, 78vh, 800px);
}
.process-hero-glow {
  position: absolute;
  border-radius: 999px;
  filter: blur(70px);
  opacity: 0.24;
  pointer-events: none;
}
.process-hero-glow-one {
  width: 24rem;
  height: 24rem;
  right: 8%;
  top: -9rem;
  background: #b9d5dc;
}
.process-hero-glow-two {
  width: 18rem;
  height: 18rem;
  left: -7rem;
  bottom: -8rem;
  background: #c9804a;
}
.hero-number {
  position: absolute;
  right: -1.5rem;
  top: -2rem;
  color: rgba(255, 255, 255, 0.11);
  font: 800 clamp(9rem, 20vw, 19rem) / 0.75 var(--font-display);
  letter-spacing: -0.08em;
}
.hero-image-frame {
  transform: rotate(1.5deg);
  box-shadow: 0 24px 54px rgba(0, 0, 0, 0.22);
  transition: transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  will-change: transform;
}
.hero-image-frame:hover {
  transform: rotate(0) scale(1.018);
}
.hero-caption {
  transform: rotate(-3deg);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.16);
}
.process-nav {
  position: sticky;
  top: 7rem;
  height: max-content;
}
.process-nav-line {
  position: absolute;
  left: 1.05rem;
  top: 1.1rem;
  bottom: 1.1rem;
  width: 1px;
  background: var(--process-line);
}
.process-nav-progress {
  position: absolute;
  left: 1.05rem;
  top: 1.1rem;
  width: 2px;
  height: var(--progress-height, 16.67%);
  border-radius: 999px;
  background: var(--yunda-maple);
  transform-origin: top;
  transition: height 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.process-nav-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.85rem 0;
  color: rgba(255, 255, 255, 0.46);
  font-size: 0.9rem;
  line-height: 1.35;
  transition:
    color 0.35s ease,
    transform 0.35s ease;
}
.process-nav-item:hover,
.process-nav-item.is-active {
  color: white;
  transform: translateX(0.35rem);
}
.process-nav-dot {
  position: relative;
  z-index: 1;
  display: grid;
  width: 2.15rem;
  height: 2.15rem;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  background: var(--yunda-bark);
  color: var(--yunda-maple);
  font-size: 0.68rem;
  font-weight: 800;
  transition:
    background 0.35s ease,
    color 0.35s ease,
    border-color 0.35s ease;
}
.process-nav-item.is-active .process-nav-dot {
  border-color: var(--yunda-maple);
  background: var(--yunda-maple);
  color: white;
}
.process-step {
  position: relative;
  display: grid;
  grid-template-columns: 6rem 1fr auto;
  gap: 1.5rem;
  border-top: 1px solid var(--process-line);
  padding: 2.8rem 0 3.2rem;
  scroll-margin-top: 6rem;
  transition:
    opacity 0.45s ease,
    transform 0.45s ease,
    border-color 0.35s ease,
    background-color 0.35s ease;
}
.process-step:hover,
.process-step.is-active {
  border-color: rgba(246, 185, 135, 0.55);
  background: linear-gradient(90deg, rgba(255, 255, 255, 0.06), transparent 82%);
}
.process-step:hover {
  transform: translateX(0.35rem);
}
.process-step:first-child {
  padding-top: 0;
  border-top: 0;
}
.process-step-number {
  color: var(--yunda-maple);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: color 0.35s ease;
}
.process-step:hover .process-step-number,
.process-step.is-active .process-step-number {
  color: #f6b987;
}
.process-step-arrow {
  color: var(--yunda-maple);
  font-size: 2rem;
  transition: transform 0.35s ease;
}
.process-step:hover .process-step-arrow {
  transform: translate(5px, -5px);
}
.process-mobile-dot {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 999px;
  background: var(--yunda-maple);
}
.timing-section {
  position: relative;
  isolation: isolate;
  background: linear-gradient(135deg, #f8e9dc, var(--yunda-petal) 55%, #e4eff1);
}
.timing-section::before {
  position: absolute;
  top: -11rem;
  left: -5rem;
  z-index: -1;
  width: 25rem;
  height: 25rem;
  border: 1px solid rgba(191, 117, 67, 0.2);
  border-radius: 50%;
  content: '';
  animation: drift 16s ease-in-out infinite alternate-reverse;
}
.timing-stamp {
  width: 9.5rem;
  height: 9.5rem;
  display: grid;
  place-content: center;
  border: 1px solid var(--yunda-maple);
  border-radius: 50%;
  color: var(--yunda-maple);
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  line-height: 1.3;
  text-align: center;
  transform: rotate(9deg);
}
.timing-stamp span {
  color: var(--yunda-bark);
}
.timing-rail {
  position: absolute;
  top: 1.25rem;
  right: 0;
  left: 0;
  display: block;
  height: 1px;
  background: linear-gradient(90deg, var(--yunda-maple), rgba(191, 117, 67, 0.12));
}
.timing-item {
  position: relative;
  padding: 1.5rem 1rem 0 0;
}
.timing-item::after {
  position: absolute;
  top: 1rem;
  left: 2.5rem;
  width: 0.5rem;
  height: 0.5rem;
  border: 2px solid var(--yunda-maple);
  border-radius: 50%;
  background: var(--yunda-petal);
  content: '';
  transform: translateX(-50%);
}
.timing-dot {
  display: grid;
  width: 2.5rem;
  height: 2.5rem;
  place-items: center;
  border: 1px solid var(--yunda-maple);
  border-radius: 999px;
  color: var(--yunda-maple);
  font-size: 0.7rem;
  font-weight: 800;
}
.timing-item p {
  margin-top: 1rem;
  max-width: 15rem;
  color: rgba(61, 42, 31, 0.72);
  font-size: 0.95rem;
  line-height: 1.7;
}
.pathway {
  min-height: 25rem;
  padding: 2rem;
  border-radius: 1.25rem;
  transition:
    transform 0.45s ease,
    box-shadow 0.45s ease;
}
.pathway:hover {
  transform: translateY(-0.5rem);
  box-shadow: 0 24px 50px rgba(61, 42, 31, 0.13);
}
.pathway-fresh {
  background: var(--yunda-bark);
  color: white;
}
.pathway-frozen {
  background: #dcebef;
  color: var(--yunda-bark);
}
.pathway-index {
  display: grid;
  width: 2.8rem;
  height: 2.8rem;
  place-items: center;
  border: 1px solid currentColor;
  border-radius: 999px;
  font-size: 0.8rem;
  font-weight: 800;
}
.question-item,
.faq-item {
  border-bottom: 1px solid rgba(61, 42, 31, 0.2);
}
.question-item summary,
.faq-item summary {
  transition:
    padding-left 0.3s ease,
    color 0.3s ease;
}
.question-item summary:hover,
.faq-item summary:hover {
  padding-left: 0.7rem;
  color: var(--yunda-maple);
}
.question-toolbar {
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem 0;
}
.question-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid rgba(61, 42, 31, 0.24);
  border-radius: 999px;
  padding: 0.6rem 0.85rem 0.6rem 1rem;
  color: var(--yunda-bark);
  font-size: 0.78rem;
  font-weight: 800;
  transition:
    border-color 0.3s ease,
    background-color 0.3s ease,
    transform 0.3s ease;
}
.question-toggle:hover,
.question-toggle:focus-visible {
  border-color: var(--yunda-maple);
  background: rgba(255, 255, 255, 0.65);
  transform: translateY(-2px);
}
.question-toggle-icon {
  display: grid;
  width: 1.6rem;
  height: 1.6rem;
  place-items: center;
  border: 1px solid var(--yunda-maple);
  border-radius: 999px;
  color: var(--yunda-maple);
  font-size: 1.15rem;
  font-weight: 400;
  line-height: 1;
  transition: transform 0.35s ease;
}
.question-toggle-icon.is-open {
  transform: rotate(45deg);
}
.question-item summary,
.faq-item summary {
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  list-style: none;
  padding: 1.35rem 0;
  font-weight: 700;
  line-height: 1.5;
}
.question-item summary::-webkit-details-marker,
.faq-item summary::-webkit-details-marker {
  display: none;
}
.question-index {
  color: var(--yunda-maple);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}
.question-text {
  flex: 1;
}
.question-plus,
.faq-plus {
  color: var(--yunda-maple);
  font-size: 1.45rem;
  font-weight: 400;
  transition: transform 0.35s ease;
}
.question-item[open] .question-plus,
.faq-item[open] .faq-plus {
  transform: rotate(45deg);
}
.question-item p,
.faq-item p {
  max-width: 48rem;
  padding: 0 2rem 1.5rem 2.3rem;
  color: rgba(61, 42, 31, 0.7);
  line-height: 1.8;
  animation: answer-in 0.35s ease both;
}
.faq-item summary {
  justify-content: space-between;
}
.faq-item summary span:first-child {
  max-width: 34rem;
}
.final-section {
  background: linear-gradient(125deg, #f2c9a8, var(--yunda-petal) 50%, #d6e8ec);
}
.final-orb {
  position: absolute;
  right: 10%;
  top: -5rem;
  width: 22rem;
  height: 22rem;
  border: 1px solid rgba(61, 42, 31, 0.18);
  border-radius: 50%;
  animation: drift 10s ease-in-out infinite alternate;
}
.motion-ready .reveal {
  opacity: 0;
  transform: translateY(2rem);
  transition:
    opacity 0.8s ease,
    transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: var(--step-delay, 0ms);
}
.reveal-left {
  transform: translateX(-2rem);
}
.reveal-right {
  transform: translateX(2rem);
}
.reveal-delay-1 {
  transition-delay: 120ms;
}
.reveal.is-visible {
  opacity: 1;
  transform: translate(0);
}
@keyframes answer-in {
  from {
    opacity: 0;
    transform: translateY(-0.4rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes drift {
  from {
    transform: translate3d(0, 0, 0) rotate(0deg);
  }
  to {
    transform: translate3d(-1.5rem, 1rem, 0) rotate(12deg);
  }
}
@media (max-width: 1023px) {
  .process-nav-progress {
    display: none;
  }
  .process-step {
    grid-template-columns: 1fr auto;
    gap: 0.75rem;
  }
  .process-step-number {
    grid-column: 1 / -1;
  }
  .timing-item {
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(61, 42, 31, 0.16);
  }
  .timing-rail,
  .timing-item::after {
    display: none;
  }
  .pathway {
    min-height: 21rem;
  }
}
@media (max-width: 639px) {
  .process-hero {
    min-height: auto;
  }
  .hero-image-frame {
    transform: rotate(0.8deg);
  }
  .hero-number {
    right: -0.5rem;
    top: -1rem;
    font-size: 8rem;
  }
  .process-step {
    padding: 2.2rem 0 2.5rem;
  }
  .process-step:hover {
    transform: none;
  }
  .process-step.is-active {
    padding-left: 0.75rem;
    border-left: 2px solid var(--yunda-maple);
  }
  .process-step-arrow {
    font-size: 1.5rem;
  }
  .timing-stamp {
    width: 7rem;
    height: 7rem;
    margin-top: -1rem;
  }
  .pathway {
    min-height: 0;
    padding: 1.5rem;
  }
  .pathway h3 {
    margin-top: 4rem;
  }
  .final-orb {
    right: -5rem;
    width: 15rem;
    height: 15rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  .reveal,
  .reveal-left,
  .reveal-right {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .hero-image-frame,
  .pathway,
  .final-orb,
  .process-track-section::after,
  .timing-section::before {
    animation: none;
    transition: none;
    transform: none;
  }
  .question-item p,
  .faq-item p {
    animation: none;
  }
}
</style>

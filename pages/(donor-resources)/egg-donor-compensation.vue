<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import BreadcrumbNav from '@/components/base/BreadcrumbNav.vue'
import SeoTrustNote from '@/components/base/SeoTrustNote.vue'
import { buildCoreServicePageSchemas } from '~/utils/schema'

const { locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const pagePath = '/egg-donor-compensation'

type Copy = typeof translations.en

const translations = {
  en: {
    seoTitle: 'Egg Donor Compensation: How Payment and Expenses Work | Yunda Surrogacy',
    seoDescription: 'Learn how egg donor compensation, reimbursed expenses, payment timing, and written program terms may work before you apply.',
    breadcrumbParent: 'For Donors',
    breadcrumbCurrent: 'Egg Donor Compensation',
    eyebrow: 'Egg donor compensation guide',
    title: 'Egg Donor Compensation: Understand Payment and Expenses Before You Apply',
    lead: 'If you are asking whether egg donors are paid, start by separating compensation for your time and effort from expenses connected with screening, appointments, travel, and the donation cycle.',
    body: 'This guide explains the questions to ask before you rely on an advertised egg donor pay figure. Current terms can vary by program, location, donor path, clinic, written agreement, and the circumstances of a cycle.',
    primaryCta: 'Ask About Current Terms',
    secondaryCta: 'Review Donor Requirements',
    answerTitle: 'Are egg donors paid?',
    answerBody: 'Many egg donor programs describe compensation for a donor’s time, effort, and participation in a completed donation cycle. A program may also address approved expenses separately. Whether egg donors are paid, how payment is calculated, and when it is issued depend on the current written program terms and the professionals responsible for the arrangement.',
    distinctionTitle: 'Compensation and expenses are different questions',
    distinctionIntro: 'A clear conversation should separate the amount described as compensation from costs that may be covered, reimbursed, or subject to approval.',
    distinctions: [
      { label: 'Compensation', body: 'A program may describe compensation for time, effort, inconvenience, and participation. The amount and conditions should appear in the current written terms.' },
      { label: 'Approved expenses', body: 'Travel, lodging, transportation, meals, or other expenses may be handled separately. Ask which costs are covered, which need receipts, and which limits apply.' },
      { label: 'Medical cycle costs', body: 'Ask who coordinates or pays for screening, monitoring, medication, retrieval-related care, and evaluation of a possible complication.' },
    ],
    factorsTitle: 'Why does egg donor compensation vary?',
    factorsIntro: 'There is no universal average egg donor compensation figure that applies to every program. A quoted amount can reflect several conditions that need to be explained in writing.',
    factors: [
      'The program’s current compensation policy and donor agreement',
      'The location of screening, monitoring, and retrieval appointments',
      'Whether the path uses a fresh cycle, frozen donor eggs, or another program structure',
      'The time commitment, travel requirements, and appointment schedule',
      'Whether payment depends on completing specified steps in the cycle',
      'Approved reimbursements, documentation, and case-specific arrangements',
    ],
    timingTitle: 'When is egg donor payment issued?',
    timingBody: 'Payment timing is a term to confirm before starting. Ask the program to describe each point that matters, including approval, consent, medication, monitoring, retrieval, recovery, cancellation, and any follow-up requirement. Do not assume that a headline egg donor pay amount explains the full payment schedule.',
    timingSteps: [
      { label: '01', title: 'Before the cycle', body: 'Confirm the current written terms, eligibility conditions, covered expenses, and the person who answers payment questions.' },
      { label: '02', title: 'During treatment', body: 'Ask how schedule changes, missed appointments, medication changes, or a cycle pause affect expenses and payment.' },
      { label: '03', title: 'After retrieval', body: 'Confirm when compensation is issued, how approved reimbursements are submitted, and who handles follow-up questions.' },
    ],
    questionsTitle: 'Questions to ask before you accept an offer',
    questions: [
      'What is the current compensation amount, and what does it cover?',
      'Is the amount compensation, expense reimbursement, or a combination of both?',
      'When is payment issued, and are there conditions tied to each payment step?',
      'Which screening, medication, monitoring, retrieval, travel, and recovery expenses are covered?',
      'Do I need receipts or prior approval for reimbursement?',
      'What happens to payment and expenses if the cycle is delayed, cancelled, or stopped?',
      'Who should I contact about tax questions, legal terms, or medical questions?',
      'Can I review the current written agreement before deciding whether to continue?',
    ],
    faqTitle: 'Egg donor compensation FAQ',
    faqs: [
      { q: 'Do egg donors get paid?', a: 'Many programs provide compensation for a donor’s time and effort, but the amount, eligibility conditions, payment timing, and expense rules vary. Ask for the current written terms before making a decision.' },
      { q: 'How much do egg donors get paid?', a: 'There is no single amount that applies to every program. Compensation can vary by location, program, donor path, cycle requirements, travel, and written agreement. A program should explain the current figure and its conditions directly.' },
      { q: 'What is the average egg donor compensation?', a: 'A public average may not describe the terms that apply to your program. Compare the complete written package, including compensation, reimbursements, covered costs, payment timing, and cancellation terms.' },
      { q: 'Are egg donor expenses covered?', a: 'Some programs may cover or reimburse approved expenses, while limits and documentation requirements vary. Ask specifically about screening, medication, monitoring, retrieval, travel, lodging, meals, and recovery-related costs.' },
      { q: 'Do I have to pay to donate eggs?', a: 'Ask the program in writing which screening and cycle-related costs it covers and whether any expense could become your responsibility. Do not rely on a general statement that expenses are covered without reviewing the details.' },
      { q: 'Can I donate eggs for money?', a: 'Egg donation programs may describe compensation for time and effort. Before deciding, review the medical process, risks, screening, privacy, agreement, payment conditions, and expenses with the appropriate professionals.' },
      { q: 'What happens if I do not complete the egg donation cycle?', a: 'The answer depends on the program terms and the point at which the cycle changes or stops. Ask before starting how cancellation, medical changes, missed appointments, and approved expenses are handled.' },
      { q: 'Is egg donor compensation taxable?', a: 'Tax treatment can depend on your circumstances and applicable rules. Ask a qualified tax professional about your situation and ask the program what tax documentation it provides.' },
      { q: 'Does Yunda Surrogacy guarantee an egg donor payment amount?', a: 'No public guide can guarantee a payment amount. Yunda Surrogacy provides education and coordination, while current compensation and expense terms must be confirmed with the responsible program and written agreement.' },
    ],
    relatedTitle: 'Continue with the donor guides',
    related: [
      { title: 'Egg donor requirements', body: 'Review preliminary requirements and questions before screening.', href: '/egg-donor-requirements', label: 'Review requirements' },
      { title: 'Egg donation process', body: 'Understand screening, monitoring, retrieval, recovery, and timing.', href: '/egg-donor-process', label: 'Read the process guide' },
      { title: 'Egg donor program', body: 'Start with the broader donor education and application path.', href: '/egg-donors', label: 'Explore the donor program' },
    ],
    trustUpdated: 'Last updated: November 27, 2026',
    trustReviewed: 'Reviewed for Yunda Surrogacy coordination scope',
    trustNote: 'Yunda Surrogacy provides education and coordination. It does not set medical eligibility, provide fertility treatment, provide legal or tax advice, or guarantee acceptance, compensation, reimbursement, payment timing, or donation results.',
    finalTitle: 'Want to review the current donor terms?',
    finalBody: 'Ask about compensation, payment timing, covered expenses, screening, privacy, and the next step. Share only the information you are comfortable providing.',
    finalCta: 'Ask About Donor Terms',
    sourceFda: 'FDA: Reproductive tissue donation',
    sourceAsrm: 'ASRM: Gamete and embryo donation guidance',
  },
  zh: {
    seoTitle: '捐卵补偿与支付：费用如何安排？｜Yunda Surrogacy',
    seoDescription: '了解捐卵补偿、费用报销、支付时间和申请前需要确认的书面项目条款。',
    breadcrumbParent: '捐赠者指南',
    breadcrumbCurrent: '捐卵补偿',
    eyebrow: '捐卵补偿指南',
    title: '捐卵补偿与支付：申请前先了解费用如何安排',
    lead: '如果你想知道捐卵者是否有补偿，应先区分时间和精力补偿，以及筛查、就诊、旅行和捐赠周期相关的费用。',
    body: '这份指南帮助你理解宣传中的捐卵补偿金额应该如何核对。具体条款可能受项目、地点、供卵路径、诊所、书面协议和周期情况影响。',
    primaryCta: '咨询当前项目条款',
    secondaryCta: '查看捐卵资格要求',
    answerTitle: '捐卵者有补偿吗？',
    answerBody: '许多供卵项目会将补偿描述为对供体时间、精力和完成捐赠周期参与的补偿。项目也可能单独说明获批费用。是否有补偿、如何计算以及何时支付，需要以当前书面项目条款和负责安排的专业人员说明为准。',
    distinctionTitle: '补偿与费用报销需要分开确认',
    distinctionIntro: '与项目方沟通时，应把补偿金额和可能由项目承担、报销或需要审批的费用分别问清楚。',
    distinctions: [
      { label: '补偿', body: '项目可能将补偿描述为对时间、精力、不便和参与周期的安排。金额和条件应写入当前书面条款。' },
      { label: '获批费用', body: '交通、住宿、餐费或其他费用可能单独处理。应询问哪些费用可以承担、哪些需要凭证以及是否有额度限制。' },
      { label: '医疗周期费用', body: '应确认筛查、监测、用药、取卵相关医疗和可能并发症评估由谁协调或承担。' },
    ],
    factorsTitle: '为什么捐卵补偿会有差异？',
    factorsIntro: '不存在适用于所有项目的统一捐卵平均补偿金额。项目报价可能反映多项条件，这些条件应在书面材料中解释清楚。',
    factors: [
      '项目当前的补偿政策和供体协议',
      '筛查、监测和取卵就诊地点',
      '新鲜周期、冷冻供卵或其他项目路径',
      '时间投入、旅行要求和预约安排',
      '支付是否与完成周期中的指定步骤有关',
      '获批报销、凭证要求和个案安排',
    ],
    timingTitle: '捐卵补偿什么时候支付？',
    timingBody: '支付时间应在开始前确认。可以请项目方说明批准、同意、用药、监测、取卵、恢复、取消和后续跟进等节点。不要认为宣传中的捐卵补偿金额已经说明了完整支付安排。',
    timingSteps: [
      { label: '01', title: '进入周期前', body: '确认当前书面条款、资格条件、可承担费用，以及负责回答支付问题的人。' },
      { label: '02', title: '治疗期间', body: '询问排期变化、漏约、用药调整或周期暂停会如何影响费用和补偿。' },
      { label: '03', title: '取卵之后', body: '确认补偿何时支付、获批费用如何提交，以及后续问题由谁处理。' },
    ],
    questionsTitle: '接受项目安排前可以问什么',
    questions: [
      '当前补偿金额是多少，具体覆盖什么？',
      '这笔金额属于补偿、费用报销，还是两者的组合？',
      '什么时候支付，是否与每个流程节点相关？',
      '筛查、用药、监测、取卵、旅行和恢复费用由谁承担？',
      '费用报销是否需要凭证或提前审批？',
      '周期延迟、取消或停止时，补偿和费用如何处理？',
      '税务、法律条款和医疗问题分别应该联系谁？',
      '决定继续前，是否可以查看当前书面协议？',
    ],
    faqTitle: '捐卵补偿常见问题',
    faqs: [
      { q: '捐卵者有补偿吗？', a: '许多项目会对供体的时间和精力提供补偿，但金额、资格条件、支付时间和费用规则各不相同。决定前应要求查看当前书面条款。' },
      { q: '捐卵者一般能获得多少补偿？', a: '没有适用于所有项目的统一金额。补偿可能受地点、项目、供卵路径、周期要求、旅行和书面协议影响。项目方应直接说明当前金额及其条件。' },
      { q: '捐卵平均补偿是多少？', a: '公开平均值未必代表你所在项目的具体条款。比较时应同时查看补偿、报销、承担费用、支付时间和取消条款。' },
      { q: '捐卵相关费用由谁承担？', a: '部分项目可能承担或报销获批费用，但额度和凭证要求各不相同。应具体询问筛查、用药、监测、取卵、旅行、住宿、餐费和恢复相关费用。' },
      { q: '捐卵需要自己付钱吗？', a: '应向项目方书面确认筛查和周期相关费用由谁承担，以及哪些费用可能由你负责。不要只根据“费用全包”等概括说法作决定。' },
      { q: '可以为了钱捐卵吗？', a: '供卵项目可能会提供针对时间和精力的补偿。决定前，应与相关专业人员了解医疗流程、风险、筛查、隐私、协议、支付条件和费用。' },
      { q: '如果没有完成捐卵周期会怎样？', a: '这取决于周期在哪个阶段发生变化或停止，以及项目条款如何规定。开始前应询问取消、医疗变化、漏约和获批费用如何处理。' },
      { q: '捐卵补偿需要缴税吗？', a: '税务处理取决于个人情况和适用规则。应向合格税务专业人士咨询，并询问项目方能提供哪些税务文件。' },
      { q: 'Yunda Surrogacy 会保证捐卵补偿金额吗？', a: '公开指南不能保证具体金额。Yunda Surrogacy 提供教育和协调，当前补偿与费用条款需要由负责项目和书面协议确认。' },
    ],
    relatedTitle: '继续查看捐卵指南',
    related: [
      { title: '捐卵资格要求', body: '了解筛查前常见要求和需要准备的问题。', href: '/egg-donor-requirements', label: '查看资格要求' },
      { title: '捐卵流程', body: '了解筛查、监测、取卵、恢复和时间安排。', href: '/egg-donor-process', label: '查看流程指南' },
      { title: '捐卵项目', body: '从更完整的捐卵教育和申请路径开始了解。', href: '/egg-donors', label: '查看捐卵项目' },
    ],
    trustUpdated: '最后更新：2026年11月27日',
    trustReviewed: '按 Yunda Surrogacy 协调服务范围审阅',
    trustNote: '孕达提供教育与协调，不设定医疗资格，不提供生殖治疗、法律或税务建议，也不保证接受、补偿、费用报销、支付时间或捐赠结果。',
    finalTitle: '想了解当前捐卵项目条款？',
    finalBody: '你可以询问补偿、支付时间、费用承担、筛查、隐私和下一步安排。只需先分享你愿意提供的信息。',
    finalCta: '咨询捐卵项目条款',
    sourceFda: 'FDA：生殖组织捐赠',
    sourceAsrm: 'ASRM：配子与胚胎捐赠指南',
  },
} satisfies Record<'en' | 'zh', Record<string, any>>

const c = computed(() => translations[locale.value as 'en' | 'zh'] as Copy || translations.en)
const visualRoot = ref<HTMLElement | null>(null)
const motionReady = ref(false)
let visualObserver: IntersectionObserver | null = null

onMounted(() => {
  if (!visualRoot.value)
    return
  const items = Array.from(visualRoot.value.querySelectorAll<HTMLElement>('[data-reveal]'))
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    items.forEach(item => item.classList.add('is-visible'))
    return
  }
  motionReady.value = true
  visualObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting)
        return
      entry.target.classList.add('is-visible')
      observer.unobserve(entry.target)
    })
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 })
  items.forEach(item => visualObserver?.observe(item))
})

onBeforeUnmount(() => visualObserver?.disconnect())
const breadcrumbItems = computed(() => [
  { label: c.value.breadcrumbParent, to: '/surrogates' },
  { label: c.value.breadcrumbCurrent },
])
const pageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: c.value.title,
  description: c.value.seoDescription,
  about: 'Egg donor compensation, payment timing, reimbursed expenses, and donor program terms',
  audience: 'Potential egg donors',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  dateModified: '2026-11-27',
  breadcrumbs: [
    { name: locale.value === 'zh' ? '首页' : 'Home', url: '/' },
    { name: c.value.breadcrumbParent, url: '/surrogates' },
    { name: c.value.breadcrumbCurrent, url: pagePath },
  ],
  service: {
    name: locale.value === 'zh' ? '捐卵补偿教育与协调支持' : 'Egg donor compensation education and coordination support',
    serviceType: locale.value === 'zh' ? '捐卵补偿说明' : 'Egg donor compensation guidance',
    audience: 'Potential egg donors',
    description: c.value.answerBody,
  },
  itemList: {
    name: c.value.distinctionTitle,
    description: c.value.distinctionIntro,
    items: c.value.distinctions.map((item, index) => ({ position: index + 1, name: item.label, description: item.body, url: pagePath })),
  },
}))

useHead(() => ({
  title: c.value.seoTitle,
  meta: [
    { name: 'description', content: c.value.seoDescription },
    { property: 'og:title', content: c.value.seoTitle },
    { property: 'og:description', content: c.value.seoDescription },
    { name: 'twitter:title', content: c.value.seoTitle },
    { name: 'twitter:description', content: c.value.seoDescription },
  ],
  script: pageSchemas.value.map((schema, index) => ({ key: `schema-egg-donor-compensation-${index}`, type: 'application/ld+json', children: JSON.stringify(schema) })),
}))
</script>

<template>
  <div ref="visualRoot" class="comp-page min-h-screen bg-[var(--yunda-petal)] text-[var(--yunda-bark)]" :class="{ 'motion-ready': motionReady }">
    <AppHeader />
    <BreadcrumbNav :items="breadcrumbItems" />
    <main>
      <section class="comp-hero relative overflow-hidden">
        <img src="/images/pages/egg-donor-compensation/hero.png" :alt="c.eyebrow" class="comp-hero-image" width="1600" height="900" fetchpriority="high">
        <div class="comp-hero-shade" />
        <div class="relative grid mx-auto max-w-320 min-h-160 items-end gap-10 px-6 py-16 lg:grid-cols-[0.8fr_0.2fr] lg:px-10 lg:py-24">
          <div data-reveal class="comp-hero-copy">
            <p class="comp-kicker">
              {{ c.eyebrow }}
            </p>
            <h1 class="mt-5 max-w-4xl text-10.5 text-white font-semibold leading-[1.03] font-display lg:text-16">
              {{ c.title }}
            </h1>
            <p class="mt-7 max-w-3xl text-lg text-white/85 leading-[1.8] lg:text-xl">
              {{ c.lead }}
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <a href="mailto:kaylal@yundasurrogacy.com" class="comp-button comp-button-solid">{{ c.primaryCta }}</a><a :href="localePath('/egg-donor-requirements')" class="comp-button comp-button-outline">{{ c.secondaryCta }}</a>
            </div>
          </div>
          <div data-reveal class="hero-side-note">
            <span>01</span><p>{{ c.distinctionTitle }}</p>
          </div>
        </div>
      </section>

      <section class="answer-panel-wrap">
        <div data-reveal class="answer-panel mx-auto max-w-320">
          <div class="answer-panel-mark">
            $
          </div><div>
            <p class="comp-kicker">
              {{ c.answerTitle }}
            </p><p class="mt-4 max-w-4xl text-xl leading-[1.75] lg:text-3xl">
              {{ c.answerBody }}
            </p>
          </div>
        </div>
      </section>

      <section class="px-6 py-18 lg:px-10 lg:py-28">
        <div class="mx-auto max-w-320">
          <div data-reveal class="section-intro grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
            <div>
              <p class="comp-kicker">
                02 / {{ c.distinctionTitle }}
              </p><h2 class="mt-4 text-8 font-semibold leading-tight font-display lg:text-12">
                {{ c.distinctionTitle }}
              </h2>
            </div><p class="section-intro-copy text-lg text-[var(--yunda-bark)]/72 leading-[1.8] lg:text-xl">
              {{ c.distinctionIntro }}
            </p>
          </div><div class="distinction-grid mt-14">
            <article v-for="(item, index) in c.distinctions" :key="item.label" data-reveal class="distinction-item" :style="{ '--reveal-delay': `${index * 100}ms` }">
              <span class="distinction-number">0{{ index + 1 }}</span><h3>{{ item.label }}</h3><p>{{ item.body }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="factor-section overflow-hidden bg-[var(--yunda-bark)] px-6 py-18 text-white lg:px-10 lg:py-28">
        <div class="mx-auto max-w-320">
          <div data-reveal class="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
            <div>
              <p class="comp-kicker">
                03 / {{ c.factorsTitle }}
              </p><h2 class="mt-4 text-8 font-semibold leading-tight font-display lg:text-12">
                {{ c.factorsTitle }}
              </h2>
            </div><p class="section-intro-copy text-lg text-white/68 leading-[1.8] lg:text-xl">
              {{ c.factorsIntro }}
            </p>
          </div><div class="factor-track mt-14" data-reveal>
            <article v-for="(item, index) in c.factors" :key="item" class="factor-item" :style="{ '--reveal-delay': `${index * 80}ms` }">
              <span>{{ String(index + 1).padStart(2, '0') }}</span><p>{{ item }}</p>
            </article>
          </div>
        </div>
      </section>

      <section class="timing-panel px-6 py-18 lg:px-10 lg:py-28">
        <div class="mx-auto max-w-320">
          <div data-reveal class="grid gap-8 lg:grid-cols-[0.35fr_0.65fr]">
            <div>
              <p class="comp-kicker">
                04 / {{ c.timingTitle }}
              </p><h2 class="mt-4 text-8 font-semibold leading-tight font-display lg:text-12">
                {{ c.timingTitle }}
              </h2>
            </div><p class="section-intro-copy text-lg text-[var(--yunda-bark)]/72 leading-[1.8] lg:text-xl">
              {{ c.timingBody }}
            </p>
          </div><div class="timing-path mt-14">
            <article v-for="step in c.timingSteps" :key="step.label" data-reveal class="timing-step">
              <span>{{ step.label }}</span><div><h3>{{ step.title }}</h3><p>{{ step.body }}</p></div>
            </article>
          </div>
        </div>
      </section>

      <section class="questions-panel bg-white px-6 py-18 lg:px-10 lg:py-28">
        <div class="grid mx-auto max-w-320 gap-12 lg:grid-cols-[0.35fr_0.65fr] lg:gap-20">
          <div data-reveal>
            <p class="comp-kicker">
              05 / {{ c.questionsTitle }}
            </p><h2 class="mt-4 text-8 font-semibold leading-tight font-display lg:text-12">
              {{ c.questionsTitle }}
            </h2><p class="mt-5 text-base text-[var(--yunda-bark)]/68 leading-7">
              {{ c.body }}
            </p>
          </div><div class="question-list" data-reveal>
            <details v-for="(item, index) in c.questions" :key="item" class="question-row">
              <summary><span>{{ String(index + 1).padStart(2, '0') }}</span><b>{{ item }}</b><i>+</i></summary><p>{{ item }}</p>
            </details>
          </div>
        </div>
      </section>

      <section class="faq-panel px-6 py-18 lg:px-10 lg:py-28">
        <div class="mx-auto max-w-320">
          <div data-reveal>
            <p class="comp-kicker">
              06 / {{ c.faqTitle }}
            </p><h2 class="mt-4 text-8 font-semibold leading-tight font-display lg:text-12">
              {{ c.faqTitle }}
            </h2>
          </div><div class="faq-grid mt-12" data-reveal>
            <details v-for="faq in c.faqs" :key="faq.q" class="faq-row">
              <summary><span>{{ faq.q }}</span><i>+</i></summary><p>{{ faq.a }}</p>
            </details>
          </div>
        </div>
      </section>

      <section class="related-panel bg-white px-6 py-18 lg:px-10 lg:py-28">
        <div class="mx-auto max-w-320">
          <p class="comp-kicker">
            07 / {{ c.relatedTitle }}
          </p><h2 class="mt-4 text-8 font-semibold leading-tight font-display lg:text-12">
            {{ c.relatedTitle }}
          </h2><div class="related-list mt-12">
            <a v-for="item in c.related" :key="item.href" :href="localePath(item.href)" class="related-item"><span>{{ item.title }}</span><small>{{ item.body }}</small><b>↗</b></a>
          </div>
        </div>
      </section>

      <SeoTrustNote :updated="c.trustUpdated" :reviewed-by="c.trustReviewed" :note="c.trustNote" :sources="[{ label: c.sourceFda, href: 'https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/what-you-should-know-reproductive-tissue-donation' }, { label: c.sourceAsrm, href: 'https://www.asrm.org/practice-guidance/practice-committee-documents/guidance-regarding-gamete-and-embryo-donation' }]" />
      <section class="comp-cta relative overflow-hidden px-6 py-20 lg:px-10 lg:py-32">
        <div class="cta-ring" /><div data-reveal class="relative mx-auto max-w-4xl text-center">
          <p class="comp-kicker">
            08 / {{ c.finalTitle }}
          </p><h2 class="mt-4 text-8 font-semibold leading-tight font-display lg:text-12">
            {{ c.finalTitle }}
          </h2><p class="mx-auto mt-5 max-w-3xl text-lg text-[var(--yunda-bark)]/72 leading-[1.8] lg:text-xl">
            {{ c.finalBody }}
          </p><a href="mailto:kaylal@yundasurrogacy.com" class="comp-button comp-button-dark mt-8">{{ c.finalCta }}</a>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.comp-page {
  --line: rgba(61, 42, 31, 0.18);
}
.comp-hero {
  min-height: min(850px, 88vh);
  background: var(--yunda-bark);
}
.comp-hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.comp-hero-shade {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(33, 24, 19, 0.92) 0%,
    rgba(33, 24, 19, 0.62) 45%,
    rgba(33, 24, 19, 0.12) 100%
  );
}
.comp-kicker {
  color: var(--yunda-maple);
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.section-intro-copy {
  padding-top: 3.45rem;
}
.comp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  padding: 0.9rem 1.4rem;
  font-size: 0.85rem;
  font-weight: 800;
  transition:
    transform 0.3s ease,
    background-color 0.3s ease,
    border-color 0.3s ease;
}
.comp-button:hover {
  transform: translateY(-0.25rem);
}
.comp-button-solid {
  background: var(--yunda-maple);
  color: white;
}
.comp-button-outline {
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: white;
}
.comp-button-dark {
  background: var(--yunda-bark);
  color: white;
}
.hero-side-note {
  align-self: end;
  border-left: 1px solid rgba(255, 255, 255, 0.4);
  padding-left: 1.25rem;
  color: white;
}
.hero-side-note span {
  color: var(--yunda-maple);
  font-size: 4rem;
  font-weight: 700;
  line-height: 0.9;
}
.hero-side-note p {
  max-width: 10rem;
  margin-top: 1rem;
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.8rem;
  line-height: 1.5;
}
.answer-panel-wrap {
  position: relative;
  margin-top: -4rem;
  padding: 0 1.5rem;
}
.answer-panel {
  position: relative;
  display: grid;
  grid-template-columns: 5rem 1fr;
  gap: 1.5rem;
  align-items: start;
  border: 1px solid rgba(61, 42, 31, 0.1);
  border-radius: 1.25rem;
  background: white;
  padding: 2rem;
  box-shadow: 0 24px 60px rgba(61, 42, 31, 0.13);
}
.answer-panel::after {
  position: absolute;
  right: 2rem;
  bottom: -0.5rem;
  width: 5rem;
  height: 1px;
  background: var(--yunda-maple);
  box-shadow:
    1.5rem 0 0 rgba(191, 117, 67, 0.35),
    3rem 0 0 rgba(191, 117, 67, 0.18);
  content: '';
}
.answer-panel-mark {
  display: grid;
  width: 3.5rem;
  height: 3.5rem;
  place-items: center;
  border-radius: 50%;
  background: var(--yunda-maple);
  color: white;
  font-size: 1.8rem;
  font-weight: 700;
  animation: mark-pulse 4s ease-in-out infinite;
}
.distinction-grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr 1fr;
  border-top: 1px solid var(--line);
  position: relative;
}
.distinction-grid::before {
  position: absolute;
  top: -0.35rem;
  left: 0;
  width: 4rem;
  height: 0.7rem;
  background: repeating-linear-gradient(90deg, var(--yunda-maple) 0 0.35rem, transparent 0.35rem 0.7rem);
  content: '';
}
.distinction-item {
  min-height: 18rem;
  border-right: 1px solid var(--line);
  padding: 1.5rem 2rem 1.5rem 0;
}
.distinction-item + .distinction-item {
  padding-left: 2rem;
}
.distinction-item:last-child {
  border-right: 0;
}
.distinction-number {
  color: var(--yunda-maple);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.12em;
}
.distinction-item h3 {
  margin-top: 5rem;
  font: 600 2rem/1.08 var(--font-display);
}
.distinction-item p {
  margin-top: 1rem;
  color: rgba(61, 42, 31, 0.7);
  line-height: 1.75;
}
.factor-section {
  position: relative;
  isolation: isolate;
}
.factor-section::before {
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: radial-gradient(rgba(255, 255, 255, 0.18) 1px, transparent 1px);
  background-size: 1.1rem 1.1rem;
  content: '';
  mask-image: linear-gradient(90deg, transparent, black 25%, black 75%, transparent);
  opacity: 0.35;
}
.factor-section::after {
  position: absolute;
  top: 12%;
  right: 8%;
  z-index: -1;
  width: 16rem;
  height: 16rem;
  border: 1px solid rgba(229, 160, 109, 0.35);
  border-radius: 50%;
  content: '';
  animation: orbit-float 14s ease-in-out infinite alternate;
}
.factor-track {
  display: flex;
  gap: 1px;
  overflow-x: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.25);
  scrollbar-width: thin;
}
.factor-item {
  flex: 0 0 18rem;
  min-height: 15rem;
  border-right: 1px solid rgba(255, 255, 255, 0.18);
  padding: 1.5rem 1.5rem 1.5rem 0;
}
.factor-item + .factor-item {
  padding-left: 1.5rem;
}
.factor-item span {
  color: var(--yunda-maple);
  font-size: 0.75rem;
  font-weight: 800;
}
.factor-item p {
  margin-top: 5rem;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
}
.timing-panel {
  position: relative;
  overflow: hidden;
  background: linear-gradient(125deg, #f5e2d2, var(--yunda-petal) 55%, #dbecee);
}
.timing-panel::before {
  position: absolute;
  top: -8rem;
  left: 4%;
  width: 24rem;
  height: 24rem;
  border: 1px solid rgba(191, 117, 67, 0.2);
  border-radius: 50%;
  content: '';
  animation: orbit-float 16s ease-in-out infinite alternate-reverse;
}
.timing-path {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--line);
}
.timing-step {
  display: grid;
  grid-template-columns: 3rem 1fr;
  gap: 1rem;
  border-right: 1px solid var(--line);
  padding: 2rem 2rem 1rem 0;
  position: relative;
}
.timing-step::before {
  position: absolute;
  top: -0.3rem;
  left: 0;
  width: 0.6rem;
  height: 0.6rem;
  border: 2px solid var(--yunda-maple);
  border-radius: 50%;
  background: var(--yunda-petal);
  content: '';
}
.timing-step + .timing-step {
  padding-left: 2rem;
}
.timing-step:last-child {
  border-right: 0;
}
.timing-step > span {
  color: var(--yunda-maple);
  font-size: 0.75rem;
  font-weight: 800;
}
.timing-step h3 {
  font: 600 1.7rem/1.1 var(--font-display);
}
.timing-step p {
  margin-top: 1rem;
  color: rgba(61, 42, 31, 0.7);
  line-height: 1.7;
}
.question-list,
.faq-grid {
  border-top: 1px solid var(--line);
}
.question-row,
.faq-row {
  border-bottom: 1px solid var(--line);
}
.question-row summary,
.faq-row summary {
  display: flex;
  align-items: start;
  gap: 1rem;
  cursor: pointer;
  list-style: none;
  padding: 1.3rem 0;
  font-weight: 700;
  line-height: 1.55;
  transition:
    padding-left 0.3s ease,
    color 0.3s ease;
}
.question-row summary:hover,
.faq-row summary:hover {
  padding-left: 0.65rem;
  color: var(--yunda-maple);
}
.question-row summary::-webkit-details-marker,
.faq-row summary::-webkit-details-marker {
  display: none;
}
.question-row summary > span:first-child {
  color: var(--yunda-maple);
  font-size: 0.75rem;
}
.question-row summary b,
.faq-row summary span {
  flex: 1;
}
.question-row i,
.faq-row i {
  color: var(--yunda-maple);
  font-size: 1.4rem;
  font-style: normal;
  transition: transform 0.3s ease;
}
.question-row[open] i,
.faq-row[open] i {
  transform: rotate(45deg);
}
.question-row p,
.faq-row p {
  padding: 0 2rem 1.5rem 2.1rem;
  color: rgba(61, 42, 31, 0.7);
  line-height: 1.8;
  animation: expand-in 0.35s ease both;
}
.faq-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 3rem;
}
.related-list {
  border-top: 1px solid var(--line);
}
.related-item {
  display: grid;
  grid-template-columns: 0.9fr 1fr 2rem;
  gap: 1rem;
  align-items: center;
  border-bottom: 1px solid var(--line);
  padding: 1.4rem 0;
  transition:
    padding 0.35s ease,
    color 0.35s ease;
}
.related-item:hover {
  padding-left: 1rem;
  color: var(--yunda-maple);
}
.related-item span {
  font: 600 1.5rem/1.1 var(--font-display);
}
.related-item small {
  color: rgba(61, 42, 31, 0.68);
  font-size: 0.9rem;
  line-height: 1.6;
}
.related-item b {
  color: var(--yunda-maple);
  font-size: 1.5rem;
  text-align: right;
}
.comp-cta {
  background: linear-gradient(125deg, #f0c19d, var(--yunda-petal) 50%, #d5e8ec);
}
.cta-ring {
  position: absolute;
  top: -8rem;
  right: 8%;
  width: 25rem;
  height: 25rem;
  border: 1px solid rgba(61, 42, 31, 0.18);
  border-radius: 50%;
  animation: drift 12s ease-in-out infinite alternate;
}
.motion-ready [data-reveal] {
  opacity: 0;
  transform: translateY(2rem);
  transition:
    opacity 0.8s ease,
    transform 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
  transition-delay: var(--reveal-delay, 0ms);
}
.motion-ready [data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}
@keyframes expand-in {
  from {
    opacity: 0;
    transform: translateY(-0.35rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes drift {
  from {
    transform: translate3d(0, 0, 0) rotate(0);
  }
  to {
    transform: translate3d(-1rem, 1rem, 0) rotate(10deg);
  }
}
@keyframes orbit-float {
  from {
    transform: translate3d(0, 0, 0) rotate(-6deg);
  }
  to {
    transform: translate3d(-1.5rem, 1.2rem, 0) rotate(8deg);
  }
}
@keyframes mark-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgba(191, 117, 67, 0.22);
  }
  50% {
    box-shadow: 0 0 0 0.7rem rgba(191, 117, 67, 0);
  }
}
@media (max-width: 1023px) {
  .section-intro-copy {
    padding-top: 0;
  }
  .comp-hero {
    min-height: 720px;
  }
  .distinction-grid,
  .timing-path {
    grid-template-columns: 1fr;
  }
  .distinction-item,
  .distinction-item + .distinction-item,
  .timing-step,
  .timing-step + .timing-step {
    min-height: auto;
    border-right: 0;
    border-bottom: 1px solid var(--line);
    padding: 1.5rem 0;
  }
  .distinction-item h3 {
    margin-top: 2.5rem;
  }
  .timing-step:last-child,
  .distinction-item:last-child {
    border-bottom: 0;
  }
  .faq-grid {
    grid-template-columns: 1fr;
  }
}
@media (max-width: 639px) {
  .comp-hero {
    min-height: 700px;
  }
  .comp-hero-image {
    object-position: 62% center;
  }
  .comp-hero-shade {
    background: linear-gradient(180deg, rgba(33, 24, 19, 0.32), rgba(33, 24, 19, 0.92) 72%);
  }
  .answer-panel-wrap {
    margin-top: -2rem;
  }
  .answer-panel {
    grid-template-columns: 1fr;
    padding: 1.5rem;
  }
  .factor-item {
    flex-basis: 15rem;
    min-height: 13rem;
  }
  .factor-item p {
    margin-top: 3rem;
  }
  .related-item {
    grid-template-columns: 1fr 2rem;
  }
  .related-item small {
    grid-column: 1 / -1;
    grid-row: 2;
  }
  .cta-ring {
    right: -7rem;
    width: 17rem;
    height: 17rem;
  }
}
@media (prefers-reduced-motion: reduce) {
  .motion-ready [data-reveal] {
    opacity: 1;
    transform: none;
    transition: none;
  }
  .cta-ring {
    animation: none;
  }
  .factor-section::after,
  .timing-panel::before,
  .answer-panel-mark {
    animation: none;
  }
  .question-row p,
  .faq-row p {
    animation: none;
  }
}
</style>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { buildCoreServicePageSchemas } from '~/utils/schema'

/**
 * 改版说明：`修改/2026-06-16/benefit页面改版/benefit页面优化.docx`
 * 静态素材：`public/images/benefit/redesign/`
 */
const PAGE_ASSETS = {
  hero: '/images/benefit/redesign/hero.jpg',
  cta: '/images/benefit/redesign/cta.jpg',
  heroFeatures: [
    '/images/benefit/redesign/hero-feature-01.jpg',
    '/images/benefit/redesign/hero-feature-02.jpg',
    '/images/benefit/redesign/hero-feature-03.jpg',
  ],
  overview: [
    '/images/benefit/redesign/overview-01.png',
    '/images/benefit/redesign/overview-02.png',
    '/images/benefit/redesign/overview-03.png',
    '/images/benefit/redesign/overview-04.png',
  ],
  paymentSteps: [
    '/images/benefit/redesign/payment-step-01.png',
    '/images/benefit/redesign/payment-step-02.png',
    '/images/benefit/redesign/payment-step-03.png',
  ],
  benefits: [
    '/images/benefit/redesign/benefit-01.png',
    '/images/benefit/redesign/benefit-02.png',
    '/images/benefit/redesign/benefit-03.png',
    '/images/benefit/redesign/benefit-04.png',
    '/images/benefit/redesign/benefit-05.png',
    '/images/benefit/redesign/benefit-06.png',
    '/images/benefit/redesign/benefit-07.png',
  ],
  timeline: [
    '/images/benefit/redesign/timeline-01.png',
    '/images/benefit/redesign/timeline-02.png',
    '/images/benefit/redesign/timeline-03.png',
    '/images/benefit/redesign/timeline-04.png',
    '/images/benefit/redesign/timeline-05.png',
    '/images/benefit/redesign/timeline-06.png',
    '/images/benefit/redesign/timeline-07.png',
  ],
  states: [
    '/images/benefit/redesign/state-01.png',
    '/images/benefit/redesign/state-02.png',
    '/images/benefit/redesign/state-03.png',
    '/images/benefit/redesign/state-04.png',
    '/images/benefit/redesign/state-05.png',
  ],
} as const

const { locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const translations = {
  en: {
    seoTitle: 'Surrogate Compensation: Pay, Benefits & Support | Yunda Surrogacy',
    seoDescription: 'Understand surrogate compensation in California and the U.S., including base pay, milestones, and support. Get a clear, private pay overview.',
    heroTitle: 'Surrogate Pay and Compensation, Clearly Explained',
    heroSubtitle: 'Understand how surrogate compensation works, including base pay, milestone payments, and ongoing support—so you can feel informed and confident every step of the way.',
    heroPayLabelLine1: 'Average surrogate',
    heroPayLabelLine2: 'pay',
    heroPayAmount: '$61,000+',
    features: [
      'Clear and transparent pay structure',
      'Supportive guidance from start to finish',
      'Private, respectful conversations',
    ],
    primaryCta: 'View Compensation Details',
    secondaryCta: 'Start Your Surrogate Application',
    onPageTitle: 'On this page, you’ll learn',
    onPageTitleLine1: 'On this page,',
    onPageTitleLine2: 'you’ll learn',
    onPageItems: [
      'How surrogate compensation is structured',
      'What’s included in your compensation package',
      'When and how payments are made',
      'State-by-state pay comparisons and key FAQs',
    ],
    overviewTitle: 'Compensation Overview',
    overviewIntro: 'Surrogates are generously compensated for the time, commitment, and incredible gift they provide.',
    overviewCards: [
      { title: 'Average Surrogate Pay', amount: '$61,000+', text: 'The average total compensation surrogates earn across the U.S.' },
      { title: 'Personalized Base Compensation', amount: '$61,000 – $70,000+', text: 'Base pay varies based on your experience, location, and the program you choose.' },
      { title: 'Monthly Allowance', amount: '$300+ /month', text: 'Non-reimbursable allowance for the duration of your pregnancy.' },
      { title: 'Estimated Benefits Total', amount: '$11,000', text: 'Total of stipends, allowances, and reimbursements beyond base compensation.' },
    ],
    paymentTitle: 'How Surrogate Payment Works',
    paymentSteps: [
      { title: 'Base Compensation', text: 'Your base pay is paid in installments throughout your journey, starting when a heartbeat is confirmed.' },
      { title: 'Reimbursements & Allowances', text: 'You’ll receive additional payments for expenses and monthly support to help make your journey easier.' },
      { title: 'Escrow Payment Management', text: 'All payments are securely managed through an escrow account for protection and peace of mind.' },
    ],
    packageTitle: 'Surrogate Compensation Package',
    packageIntro: 'Your compensation package includes the following benefits and support.',
    packageBenefits: [
      { title: 'Embryo Transfer Stipend', subtitle: 'Per Transfer', amount: '$2,000' },
      { title: 'Signing Bonus', subtitle: 'Upon Contract Signing', amount: '$1,000' },
      { title: 'Injection Medication Stipend', subtitle: 'Per Cycle', amount: '$1,200' },
      { title: 'Monthly Non-Reimbursable Allowance', subtitle: 'Throughout Pregnancy', amount: '$300 /month' },
      { title: 'Maternity Clothing Stipend', subtitle: 'During Pregnancy', amount: '$1,000' },
      { title: 'Surrogate Health Support', subtitle: 'Wellness & Self-Care', amount: '$1,000' },
      { title: 'Housekeeping / Cleaning Stipend', subtitle: 'During Pregnancy', amount: '$1,200' },
    ],
    timelineTitle: 'Payment Timeline: Do Surrogates Get Paid Monthly and When Does Pay Start?',
    timelineItems: [
      { title: 'Legal Contract Signed', lines: ['Signing bonus: $1,000', 'Monthly allowance: $300/month'] },
      { title: 'Medication Start', lines: ['Injection medication stipend: $1,200'] },
      { title: 'Embryo Transfer', lines: ['$2,000 (per transfer)'] },
      { title: 'Heartbeat Confirmed', lines: ['Base compensation: $61,000 begins monthly over 10 months', 'Health support: $1,000 (one-time)'] },
      { title: '15 Weeks', lines: ['Maternity clothing stipend: $1,000 (+$200 for multiples)'] },
      { title: '28 Weeks', lines: ['Housekeeping support: $1,200'] },
      { title: 'Delivery + Postpartum', lines: ['Remaining scheduled payments and approved reimbursements are completed through escrow per the agreement.'] },
    ],
    timelineCta: 'BECOME A SURROGATE',
    stateTitle: 'State-by-State Surrogate Pay',
    stateIntro: 'Compensation can vary by state. Here’s how key states compare.',
    stateCards: [
      { title: 'U.S. Overall', amount: '$61,000+', text: 'National average total compensation.' },
      { title: 'California', amount: '$70,000+', text: 'Among the highest compensation in the country.' },
      { title: 'Florida', amount: '$58,000+', text: 'Competitive pay with strong intended parent programs.' },
      { title: 'Washington', amount: '$64,000+', text: 'High compensation with excellent legal protections.' },
      { title: 'Texas', amount: '$55,000+', text: 'Strong programs with competitive compensation options.' },
    ],
    faqTitle: 'Surrogate Pay FAQ: Miscarriage Pay, Eligibility, and Common Questions',
    faqItems: [
      { q: 'Do surrogates get paid?', a: 'Yes. In most U.S. journeys, surrogates receive structured surrogate compensation and reimbursements. The terms are written into a legal agreement and paid on a set timeline.' },
      { q: 'Do surrogate mothers get paid, or is it a "salary"?', a: 'Surrogates are typically paid as compensation, not a traditional salary. That means payments follow milestones and agreed support items, rather than hourly wages.' },
      { q: 'Can surrogates get paid monthly?', a: 'Often, yes. Many programs use milestone-based payments, and base compensation is commonly paid in monthly installments after key pregnancy confirmation steps.' },
      { q: 'Do surrogates get paid if they miscarry?', a: 'It depends on the stage of pregnancy and what the agreement states. Many arrangements include clear terms for compensation already earned and for what happens if a pregnancy ends early.' },
      { q: 'How much do surrogate mothers get paid?', a: 'It varies by experience, state, and medical factors. The best way to understand compensation is to look at the full package: base pay, allowances, benefits, and reimbursements.' },
      { q: 'How much do surrogates make a year?', a: 'Surrogacy compensation is not guaranteed annual income because the timeline can span many months and varies by matching and clinic schedules. We usually explain expected totals over the journey instead.' },
      { q: 'How much do surrogates make overall?', a: 'If you are asking what surrogates get paid, the total depends on base compensation plus milestone benefits and any situation-based add-ons defined in the agreement.' },
      { q: 'What does a surrogate make in California compared to other states?', a: 'California often trends higher because of cost of living, clinic access, and local demand. Still, the real number depends on insurance, location, and your specific journey plan.' },
      { q: 'How much can I make as a surrogate?', a: 'It depends on whether you are first-time or experienced, your state, and your medical and insurance profile. It also depends on whether you qualify smoothly for screening and matching.' },
      { q: 'How much can you make as a surrogate if you are eligible and ready?', a: 'If you are eligible, the fastest path is getting screened, confirming insurance fit, and moving into matching. From there, compensation is clearer because it is written, scheduled, and tied to specific milestones.' },
    ],
    ctaTitle: 'Ready to Talk Through Compensation With Confidence?',
    ctaBody: 'We’re here to answer your questions and walk you through every detail—so you always feel informed and supported.',
    ctaButton: 'Start Your Surrogate Application',
  },
  zh: {
    seoTitle: '代孕妈妈补偿：报酬、福利与支持 | Yunda',
    seoDescription: '了解加州和美国的代孕妈妈补偿，包括基础报酬、里程碑付款和支持。获得清晰、私密的报酬概览。',
    heroTitle: '代母补偿与报酬，清晰说明',
    heroSubtitle: '了解代母补偿如何运作，包括基础补偿、里程碑付款与持续支持，让你在每一步都更安心、更有把握。',
    heroPayLabelLine1: '平均代孕',
    heroPayLabelLine2: '补偿',
    heroPayAmount: '$61,000+',
    features: [
      '清晰透明的报酬结构',
      '从始至终的贴心引导',
      '私密、尊重的沟通方式',
    ],
    primaryCta: '查看补偿详情',
    secondaryCta: '开始代孕申请',
    onPageTitle: '本页你将了解',
    onPageTitleLine1: '本页',
    onPageTitleLine2: '你将了解',
    onPageItems: [
      '代母补偿通常如何构成',
      '补偿方案包含哪些内容',
      '付款何时、如何发放',
      '各州补偿对比与常见问题',
    ],
    overviewTitle: '补偿总览',
    overviewIntro: '代孕妈妈因其投入的时间、承诺与非凡的付出，将获得丰厚且结构清晰的补偿。',
    overviewCards: [
      { title: '平均代孕补偿', amount: '$61,000+', text: '美国范围内代孕妈妈获得的平均总补偿。' },
      { title: '个性化基础补偿', amount: '$61,000 – $70,000+', text: '基础补偿因经验、所在地与所选项目而有所不同。' },
      { title: '月度津贴', amount: '$300+ /月', text: '孕期全程发放的非报销类津贴。' },
      { title: '福利预计总额', amount: '$11,000', text: '除基础补偿外的津贴、补贴与报销合计。' },
    ],
    paymentTitle: '代孕付款如何运作',
    paymentSteps: [
      { title: '基础补偿', text: '基础报酬在旅程中分期发放，通常在确认胎心后开始。' },
      { title: '报销与津贴', text: '你还会收到额外费用报销与月度支持，让旅程更从容。' },
      { title: '托管支付管理', text: '所有款项通过第三方托管账户安全管理，保障发放有序、安心可控。' },
    ],
    packageTitle: '代孕补偿方案',
    packageIntro: '你的补偿方案包含以下福利与支持项目。',
    packageBenefits: [
      { title: '胚胎移植津贴', subtitle: '每次移植', amount: '$2,000' },
      { title: '签约奖金', subtitle: '合同签署后', amount: '$1,000' },
      { title: '注射用药津贴', subtitle: '每个周期', amount: '$1,200' },
      { title: '月度非报销津贴', subtitle: '整个孕期', amount: '$300 /月' },
      { title: '孕期服装津贴', subtitle: '孕期期间', amount: '$1,000' },
      { title: '代孕健康支持', subtitle: '身心照护', amount: '$1,000' },
      { title: '家政/清洁津贴', subtitle: '孕期期间', amount: '$1,200' },
    ],
    timelineTitle: '付款时间线：代孕妈妈是否按月领取报酬？何时开始发放？',
    timelineItems: [
      { title: '法律合同签署', lines: ['签约奖金：$1,000', '月度津贴：$300/月'] },
      { title: '开始用药', lines: ['注射用药津贴：$1,200'] },
      { title: '胚胎移植', lines: ['$2,000（每次移植）'] },
      { title: '确认胎心', lines: ['基础补偿：$61,000 在 10 个月内按月发放', '健康支持津贴：$1,000（一次性）'] },
      { title: '孕 15 周', lines: ['孕期服装津贴：$1,000（多胎 +$200）'] },
      { title: '孕 28 周', lines: ['家政支持：$1,200'] },
      { title: '分娩 + 产后', lines: ['剩余计划付款与获批报销将按协议通过托管完成结算。'] },
    ],
    timelineCta: '成为代孕妈妈',
    stateTitle: '各州代孕补偿对比',
    stateIntro: '补偿因州而异，以下是主要州的参考对比。',
    stateCards: [
      { title: '美国整体', amount: '$61,000+', text: '全国平均总补偿参考值。' },
      { title: '加州', amount: '$70,000+', text: '全美补偿水平较高的地区之一。' },
      { title: '佛罗里达', amount: '$58,000+', text: '补偿具竞争力，意向父母项目成熟。' },
      { title: '华盛顿州', amount: '$64,000+', text: '补偿较高，法律保障完善。' },
      { title: '德州', amount: '$55,000+', text: '项目成熟，补偿方案具竞争力。' },
    ],
    faqTitle: '代孕补偿 FAQ：流产补偿、资格与常见问题',
    faqItems: [
      { q: '代孕妈妈会获得补偿吗？', a: '会。在美国大多数代孕项目中，代孕妈妈会获得结构化补偿与报销。条款会写入法律协议，并按明确时间线执行发放。' },
      { q: '代孕妈妈获得的是“工资”吗？', a: '通常不是传统工资，而是补偿方案。也就是说，付款依据里程碑和约定支持项目执行，而不是按小时计薪。' },
      { q: '代孕补偿可以按月发放吗？', a: '多数情况下可以。很多项目采用里程碑付款机制，基础补偿通常在关键妊娠确认后按月分期发放。' },
      { q: '如果发生流产，代孕妈妈还能拿到补偿吗？', a: '取决于妊娠阶段和合同条款。很多协议会明确已产生补偿如何处理，以及妊娠提前结束时的发放规则。' },
      { q: '代孕妈妈一般能拿多少补偿？', a: '金额会因经验、所在州和医疗因素而变化。最可靠的方式是看完整补偿包：基础补偿、津贴、福利和报销。' },
      { q: '代孕妈妈一年能赚多少？', a: '代孕补偿通常不是“固定年收入”，因为时间线会跨越多个月，且受匹配和诊所排期影响。更建议看整段旅程的预计总额。' },
      { q: '代孕整体能拿到多少？', a: '总体金额通常由基础补偿、里程碑福利以及合同约定的情境附加项共同组成。' },
      { q: '加州与其他州相比，补偿差异大吗？', a: '加州通常偏高，常见原因包括生活成本、诊所可及性和本地需求。但具体金额仍取决于保险、所在地和个人旅程方案。' },
      { q: '我作为代孕妈妈大概能拿多少？', a: '取决于你是首次还是有经验代孕、所在州、以及医疗和保险档案情况，也与是否顺利通过筛查和匹配有关。' },
      { q: '如果我符合资格并准备好了，补偿怎么更快明确？', a: '最快路径通常是先完成筛查、确认保险适配并进入匹配。进入匹配后，补偿会通过书面协议与里程碑时间表变得更清晰。' },
    ],
    ctaTitle: '准备好安心了解补偿细节了吗？',
    ctaBody: '我们随时解答你的疑问，陪你理清每一步，让你始终感到被支持与尊重。',
    ctaButton: '开始代孕申请',
  },
}

const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)
const pagePath = '/benefit'

const schemaCompensationItems = computed(() => [
  ...c.value.timelineItems.map((item, index) => ({
    position: index + 1,
    name: item.title,
    description: item.lines.join(' '),
    url: pagePath,
  })),
  ...c.value.packageBenefits.map((item, index) => ({
    position: c.value.timelineItems.length + index + 1,
    name: item.title,
    description: `${item.amount} ${item.subtitle}`.trim(),
    url: pagePath,
  })),
])

const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: c.value.heroTitle,
  description: c.value.seoDescription,
  about: 'Gestational carrier compensation, pay structure, and benefits',
  audience: 'Potential gestational carriers / surrogate applicants',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  service: {
    name: 'Gestational Carrier Compensation and Benefits Guidance',
    serviceType: 'Gestational carrier compensation guidance',
    areaServed: ['California', 'United States'],
    audience: 'Potential gestational carriers / surrogate applicants',
    description: 'Compensation and benefits guidance for gestational carriers, including base compensation, monthly allowance, milestone payments, escrow payment management, pregnancy-related benefits, reimbursements, and postpartum payment support.',
  },
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Surrogates', url: '/be-surrogate' },
    { name: 'Compensation & Benefits', url: pagePath },
  ],
  faqs: c.value.faqItems.map(item => ({
    question: item.q,
    answer: item.a,
  })),
  itemList: {
    name: 'Payment Timeline and Benefits List',
    description: c.value.timelineTitle,
    items: schemaCompensationItems.value,
  },
}))

function highlightAmounts(line: string) {
  return line.replace(/\$\d[\d,]*(\+)?(\/[a-z\u4E00-\u9FFF]+)?/gi, '<span class="benefit-amount">$&</span>')
}

const openFaqSet = ref(new Set<number>())

function toggleFaq(index: number) {
  const next = new Set(openFaqSet.value)
  if (next.has(index))
    next.delete(index)
  else
    next.add(index)
  openFaqSet.value = next
}

function isFaqOpen(index: number) {
  return openFaqSet.value.has(index)
}

useHead(() => ({
  title: c.value.seoTitle,
  meta: [{ name: 'description', content: c.value.seoDescription }],
  link: [{ rel: 'preload', as: 'image', href: PAGE_ASSETS.hero, fetchpriority: 'high' }],
}))

useHead(() => ({
  script: coreServicePageSchemas.value.map((schema, index) => ({
    key: `schema-benefit-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div class="benefit-page min-h-screen text-[var(--yunda-bark)]">
    <AppHeader />

    <main>
      <!-- 第一屏：对照 docx + 设计稿 -->
      <section class="benefit-hero benefit-section-spacing relative isolate w-full overflow-hidden">
        <div class="benefit-section-inner relative z-10 mx-auto max-w-[1400px]">
          <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-10 xl:gap-14">
            <div class="lg:pr-2">
              <h1 class="benefit-type-h1 max-w-[620px]">
                {{ c.heroTitle }}
              </h1>
              <p class="benefit-type-hero-lead mt-5 max-w-[600px] text-[var(--yunda-bark)]/90 lg:mt-6">
                {{ c.heroSubtitle }}
              </p>

              <div class="mt-8 grid grid-cols-3 gap-3 sm:gap-5">
                <div
                  v-for="(feature, index) in c.features"
                  :key="`feature-${index}`"
                  class="flex flex-col items-center text-center"
                >
                  <img
                    :src="PAGE_ASSETS.heroFeatures[index]"
                    alt=""
                    class="h-14 w-14 object-contain sm:h-16 sm:w-16 lg:h-[4.5rem] lg:w-[4.5rem]"
                    loading="lazy"
                  >
                  <p class="benefit-type-caption mt-4 text-[var(--yunda-bark)]">
                    {{ feature }}
                  </p>
                </div>
              </div>

              <div class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
                <a
                  href="#compensation-overview"
                  class="benefit-hero-cta-primary yunda-type-button inline-flex min-h-[52px] w-full items-center justify-center rounded-[6px] px-6 py-3.5 shadow-sm transition-opacity hover:opacity-95 sm:min-w-[220px] sm:w-auto lg:min-w-[240px]"
                >
                  {{ c.primaryCta }}
                </a>
                <NuxtLink
                  :to="localePath('/be-surrogate')"
                  class="benefit-hero-cta-secondary yunda-type-button inline-flex min-h-[52px] w-full items-center justify-center rounded-[6px] border-2 px-6 py-3.5 transition-colors hover:opacity-90 sm:min-w-[220px] sm:w-auto lg:min-w-[260px]"
                >
                  {{ c.secondaryCta }}
                </NuxtLink>
              </div>
            </div>

            <div class="benefit-hero-visual relative min-h-[360px] sm:min-h-[420px] lg:min-h-[500px]">
              <div aria-hidden="true" class="benefit-hero-arch pointer-events-none absolute inset-y-0 right-0 w-[88%] max-w-[520px]" />
              <img
                :src="PAGE_ASSETS.hero"
                :alt="c.heroTitle"
                class="benefit-hero-photo relative z-[1] ml-auto h-full w-[92%] max-w-[540px] object-cover object-[center_28%] sm:w-[88%]"
                loading="eager"
                fetchpriority="high"
                decoding="async"
              >
              <div class="benefit-hero-pay-card absolute bottom-4 right-2 z-[2] sm:bottom-6 sm:right-4">
                <p class="benefit-hero-pay-label">
                  {{ c.heroPayLabelLine1 }}<br>{{ c.heroPayLabelLine2 }}
                </p>
                <p class="benefit-hero-pay-amount">
                  {{ c.heroPayAmount }}
                </p>
              </div>
            </div>
          </div>

          <div class="benefit-onpage mt-6 overflow-hidden rounded-[16px] lg:mt-8 lg:rounded-[18px]">
            <div class="benefit-onpage-grid">
              <div class="benefit-onpage-heading px-5 py-6 sm:px-6 lg:px-8 lg:py-7">
                <p class="benefit-type-onpage-heading">
                  {{ c.onPageTitleLine1 }}<br>{{ c.onPageTitleLine2 }}
                </p>
              </div>
              <div
                v-for="(item, index) in c.onPageItems"
                :key="`onpage-${index}`"
                class="benefit-onpage-item flex flex-col items-center px-4 py-6 text-center sm:px-5 lg:px-6 lg:py-7"
              >
                <span class="benefit-onpage-check inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full sm:h-9 sm:w-9">
                  <Icon name="radix-icons:check" class="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </span>
                <p class="benefit-type-caption mt-3.5 text-[var(--yunda-bark)]">
                  {{ item }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第二屏：对照 docx image3 + image4 -->
      <section id="compensation-overview" class="benefit-section benefit-section-after-hero scroll-mt-28 w-full">
        <div class="benefit-overview-panel">
          <div class="benefit-section-inner mx-auto max-w-[1400px]">
            <div class="benefit-overview-block text-center">
              <h2 class="benefit-section-title">
                {{ c.overviewTitle }}
              </h2>
              <p class="benefit-type-intro mx-auto mt-4 max-w-3xl lg:mt-5">
                {{ c.overviewIntro }}
              </p>

              <div class="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-5">
                <article
                  v-for="(card, index) in c.overviewCards"
                  :key="`overview-${index}`"
                  class="benefit-overview-card flex h-full flex-col items-center rounded-[20px] px-5 py-7 text-center sm:px-6 sm:py-8"
                >
                  <img
                    :src="PAGE_ASSETS.overview[index]"
                    alt=""
                    class="benefit-overview-icon h-[3.75rem] w-[3.75rem] object-contain lg:h-[4.5rem] lg:w-[4.5rem]"
                    loading="lazy"
                  >
                  <h3 class="benefit-type-card-title mt-5">
                    {{ card.title }}
                  </h3>
                  <p class="benefit-type-amount mt-3 text-[28px] lg:text-[32px]">
                    {{ card.amount }}
                  </p>
                  <p class="benefit-type-card-body mt-3 text-[var(--yunda-bark)]/84">
                    {{ card.text }}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>

        <div class="benefit-payment-panel">
          <div class="benefit-section-inner mx-auto max-w-[1400px]">
            <div class="benefit-payment-block text-center">
              <h3 class="benefit-type-subsection-title">
                {{ c.paymentTitle }}
              </h3>
              <div class="mt-6 grid gap-4 text-left lg:mt-8 lg:grid-cols-3 lg:gap-5">
                <article
                  v-for="(step, index) in c.paymentSteps"
                  :key="`payment-${index}`"
                  class="benefit-payment-step rounded-[20px] px-5 py-5 sm:px-6 sm:py-6"
                >
                  <div class="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-x-3 gap-y-2 sm:gap-x-4 sm:gap-y-2.5">
                    <span class="benefit-payment-step-badge col-start-1 row-start-1 inline-flex h-7 w-7 items-center justify-center rounded-full font-bold leading-none text-white sm:h-8 sm:w-8">
                      {{ index + 1 }}
                    </span>
                    <img
                      :src="PAGE_ASSETS.paymentSteps[index]"
                      alt=""
                      class="benefit-payment-icon col-start-1 row-start-2 h-11 w-11 object-contain sm:h-12 sm:w-12 lg:h-[3.25rem] lg:w-[3.25rem]"
                      loading="lazy"
                    >
                    <div class="col-start-2 row-span-2 row-start-1 min-w-0 self-center sm:self-start sm:pt-1">
                      <h4 class="benefit-type-card-title">
                        {{ step.title }}
                      </h4>
                      <p class="benefit-type-card-body mt-2 text-[var(--yunda-bark)]/86">
                        {{ step.text }}
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第三屏：对照 docx image5 -->
      <section id="compensation-package" class="benefit-section benefit-package-section w-full">
        <div class="benefit-section-inner mx-auto max-w-[1400px]">
          <div class="benefit-package-block text-center">
            <h2 class="benefit-section-title">
              {{ c.packageTitle }}
            </h2>
            <p class="benefit-type-intro mx-auto mt-4 max-w-3xl lg:mt-5">
              {{ c.packageIntro }}
            </p>

            <div class="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-12 lg:gap-5">
              <article
                v-for="(item, index) in c.packageBenefits"
                :key="`benefit-${index}`"
                class="benefit-package-card flex h-full flex-col items-center rounded-[20px] px-5 py-7 text-center sm:px-6 sm:py-8 lg:col-span-3"
                :class="index === 4 ? 'lg:col-start-2' : ''"
              >
                <img
                  :src="PAGE_ASSETS.benefits[index]"
                  alt=""
                  class="benefit-package-icon h-[3.75rem] w-[3.75rem] object-contain lg:h-[4.5rem] lg:w-[4.5rem]"
                  loading="lazy"
                >
                <h3 class="benefit-type-card-title mt-5">
                  {{ item.title }}
                </h3>
                <p class="benefit-type-card-body mt-2 text-[var(--yunda-bark)]/72">
                  {{ item.subtitle }}
                </p>
                <p class="benefit-type-amount mt-3 text-[26px] lg:text-[30px]">
                  {{ item.amount }}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- 第四屏：对照 docx image6 -->
      <section id="payment-timeline" class="benefit-section benefit-timeline-section w-full">
        <div class="benefit-section-inner mx-auto max-w-[1400px]">
          <div class="benefit-timeline-panel overflow-hidden rounded-[24px] px-4 py-8 sm:px-6 sm:py-10 lg:rounded-[28px] lg:px-10 lg:py-12">
            <!-- docx 第四屏无可见 H2，标题保留给 SEO / 读屏 -->
            <h2 class="sr-only">
              {{ c.timelineTitle }}
            </h2>

            <div class="benefit-timeline-track relative lg:mt-2">
              <div class="benefit-timeline-rail hidden lg:block" aria-hidden="true">
                <div class="benefit-timeline-line" />
              </div>

              <div class="benefit-timeline-steps grid grid-cols-1 gap-5 lg:grid-cols-7 lg:gap-3">
                <article
                  v-for="(item, index) in c.timelineItems"
                  :key="`timeline-${index}`"
                  class="benefit-timeline-step relative flex flex-col items-center text-center lg:items-center"
                >
                  <div class="benefit-timeline-node-wrap flex w-full items-center justify-center">
                    <div
                      class="benefit-timeline-node relative z-[2] flex items-center justify-center rounded-full"
                      :class="index === 3 ? 'benefit-timeline-node--featured' : ''"
                    >
                      <img
                        :src="PAGE_ASSETS.timeline[index]"
                        alt=""
                        class="benefit-timeline-icon object-contain"
                        :class="index === 3 ? 'h-10 w-10 lg:h-12 lg:w-12' : 'h-8 w-8 lg:h-10 lg:w-10'"
                        loading="lazy"
                      >
                    </div>
                  </div>
                  <h3 class="benefit-type-card-title benefit-type-card-title--compact mt-4 lg:mt-5">
                    {{ item.title }}
                  </h3>
                  <div class="mt-2 grid w-full max-w-[220px] gap-1.5 px-1 lg:max-w-none">
                    <p
                      v-for="(line, lineIndex) in item.lines"
                      :key="`timeline-line-${index}-${lineIndex}`"
                      class="benefit-type-caption text-[var(--yunda-bark)]/88"
                      v-html="highlightAmounts(line)"
                    />
                  </div>
                  <span
                    v-if="index < c.timelineItems.length - 1"
                    class="benefit-timeline-mobile-connector mt-5 block h-8 w-px bg-[color-mix(in_srgb,var(--benefit-timeline-gold)_70%,transparent)] lg:hidden"
                    aria-hidden="true"
                  />
                </article>
              </div>
            </div>

            <div class="mt-9 flex justify-center lg:mt-11">
              <NuxtLink
                :to="localePath('/be-surrogate')"
                class="benefit-timeline-cta yunda-type-button inline-flex min-h-[52px] items-center justify-center rounded-[8px] px-10 py-3.5 uppercase shadow-sm transition-opacity hover:opacity-95 lg:min-h-[56px] lg:px-14"
              >
                {{ c.timelineCta }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <!-- 第五屏：对照 docx image7 -->
      <section id="state-pay" class="benefit-section benefit-state-section w-full">
        <div class="benefit-section-inner mx-auto max-w-[1400px]">
          <div class="benefit-state-block text-center">
            <h2 class="benefit-section-title">
              {{ c.stateTitle }}
            </h2>
            <p class="benefit-type-intro mx-auto mt-4 max-w-3xl lg:mt-5">
              {{ c.stateIntro }}
            </p>

            <div class="mt-8 grid items-stretch gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-5 lg:gap-5">
              <article
                v-for="(card, index) in c.stateCards"
                :key="`state-${index}`"
                class="benefit-state-card relative flex h-full flex-col items-center rounded-[20px] px-5 py-7 text-center sm:px-6 sm:py-8"
              >
                <span
                  v-if="index === 1"
                  class="benefit-state-badge absolute right-4 top-4 inline-flex h-7 w-7 items-center justify-center rounded-full"
                  aria-hidden="true"
                >
                  <Icon name="radix-icons:star-filled" class="h-3.5 w-3.5 text-white" />
                </span>
                <img
                  :src="PAGE_ASSETS.states[index]"
                  alt=""
                  class="benefit-state-icon h-16 w-16 object-contain lg:h-[4.5rem] lg:w-[4.5rem]"
                  loading="lazy"
                >
                <h3 class="benefit-type-card-title mt-5">
                  {{ card.title }}
                </h3>
                <p class="benefit-type-state-amount mt-3">
                  {{ card.amount }}
                </p>
                <p class="benefit-type-card-body mt-3 text-[var(--yunda-bark)]/84">
                  {{ card.text }}
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- 第六屏：对照 docx image8 -->
      <section id="faq" class="benefit-section benefit-faq-section w-full">
        <div class="benefit-section-inner mx-auto max-w-[1400px]">
          <div class="benefit-faq-block text-center">
            <h2 class="benefit-section-title benefit-section-title--faq mx-auto max-w-5xl">
              {{ c.faqTitle }}
            </h2>

            <div class="mt-8 grid grid-cols-1 gap-3 text-left sm:grid-cols-2 lg:mt-10 lg:gap-4">
              <article
                v-for="(item, index) in c.faqItems"
                :key="`faq-${index}`"
                class="benefit-faq-item rounded-[16px]"
              >
                <button
                  type="button"
                  class="benefit-faq-trigger flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-[1.125rem]"
                  :aria-expanded="isFaqOpen(index)"
                  @click="toggleFaq(index)"
                >
                  <h3 class="benefit-type-faq-question">
                    {{ item.q }}
                  </h3>
                  <span class="benefit-faq-toggle shrink-0 leading-none" aria-hidden="true">
                    {{ isFaqOpen(index) ? '−' : '+' }}
                  </span>
                </button>
                <div
                  v-show="isFaqOpen(index)"
                  class="benefit-faq-answer border-t border-[color-mix(in_srgb,var(--yunda-bark)_10%,transparent)] px-5 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4"
                >
                  <p class="benefit-type-faq-answer">
                    {{ item.a }}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- 第七屏：对照 docx image10 -->
      <section class="benefit-section benefit-cta-section benefit-section--last w-full">
        <div class="benefit-section-inner mx-auto max-w-[1400px]">
          <div class="benefit-cta overflow-hidden rounded-[24px] lg:rounded-[28px]">
            <div class="grid lg:grid-cols-2 lg:items-stretch">
              <div class="benefit-cta-copy flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14 xl:px-14">
                <h2 class="benefit-section-title benefit-section-title--faq max-w-xl">
                  {{ c.ctaTitle }}
                </h2>
                <p class="benefit-type-intro mt-4 max-w-lg lg:mt-5">
                  {{ c.ctaBody }}
                </p>
                <NuxtLink
                  :to="localePath('/be-surrogate')"
                  class="benefit-cta-button yunda-type-button mt-8 inline-flex w-full min-h-[52px] items-center justify-center gap-2 rounded-[8px] px-8 py-3.5 shadow-sm transition-opacity hover:opacity-95 sm:w-fit lg:min-h-[56px]"
                >
                  <span>{{ c.ctaButton }}</span>
                  <Icon name="radix-icons:arrow-right" class="h-4 w-4" />
                </NuxtLink>
              </div>

              <div class="benefit-cta-visual relative min-h-[260px] overflow-hidden sm:min-h-[300px] lg:min-h-[360px]">
                <img
                  :src="PAGE_ASSETS.cta"
                  :alt="c.ctaTitle"
                  class="benefit-cta-photo-base absolute inset-0 h-full w-full scale-[1.06] object-cover object-[58%_center]"
                  loading="lazy"
                  decoding="async"
                >
                <img
                  :src="PAGE_ASSETS.cta"
                  alt=""
                  aria-hidden="true"
                  class="benefit-cta-photo-blur pointer-events-none absolute inset-0 h-full w-full scale-[1.06] object-cover object-[58%_center]"
                  loading="lazy"
                  decoding="async"
                >
                <div aria-hidden="true" class="benefit-cta-photo-fade pointer-events-none absolute inset-0" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.benefit-page {
  --benefit-px: 1.5rem;
  --benefit-px-lg: 2.5rem;
  --benefit-hero-pt: 1.5rem;
  --benefit-hero-pt-lg: 2rem;
  --benefit-hero-pb: 0;
  --benefit-hero-pb-lg: 0;
  --benefit-gap-after-hero: 2.5rem;
  --benefit-gap-after-hero-lg: 3.5rem;
  --benefit-gap: 2.5rem;
  --benefit-gap-lg: 3.5rem;
  --benefit-title-gap: 0;
  --benefit-last-pb: 2.5rem;
  --benefit-last-pb-lg: 3.5rem;
  --benefit-cream: #f9f1e7;
  --benefit-cream-soft: #fdf8f1;
  --benefit-cream-card: #faf4ea;
  --benefit-payment-badge: #b5ad96;
  --benefit-timeline-gold: #c4a86c;
  --benefit-timeline-cta: #a8946a;
  --benefit-sage: #d4ddd6;
  --benefit-sage-deep: #c8d3cb;
  --benefit-panel: #e8ece9;
  background: #fff;
}

.benefit-section-inner {
  padding-left: var(--benefit-px);
  padding-right: var(--benefit-px);
}

.benefit-hero {
  background: #fff;
}

.benefit-section-spacing {
  padding-top: var(--benefit-hero-pt);
  padding-bottom: var(--benefit-hero-pb);
}

.benefit-section {
  padding-top: var(--benefit-gap);
}

.benefit-section.benefit-section-after-hero {
  padding-top: var(--benefit-gap-after-hero);
}

.benefit-section--last {
  padding-bottom: var(--benefit-last-pb);
}

/* 排版对齐：PDF 专题落地页 Token（/surrogacy-process 同级）+ 全局字号 */
.benefit-type-h1 {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 2.375rem;
  line-height: 1.1;
  color: var(--yunda-bark);
}

.benefit-type-hero-lead {
  font-family: var(--font-text);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--yunda-bark);
}

.benefit-section-title {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 1.875rem;
  line-height: 1.15;
  color: var(--yunda-bark);
}

.benefit-section-title--long,
.benefit-section-title--faq {
  /* 语义修饰类：字号与 .benefit-section-title 相同 */
  font-size: inherit;
  line-height: inherit;
}

.benefit-type-intro {
  font-family: var(--font-text);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.7;
  color: color-mix(in srgb, var(--yunda-bark) 88%, transparent);
}

.benefit-type-card-title {
  font-family: var(--font-text);
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.25;
  color: var(--yunda-bark);
}

.benefit-type-card-title--compact {
  font-size: 1rem;
  line-height: 1.25;
}

.benefit-type-card-body {
  font-family: var(--font-text);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.7;
  color: var(--yunda-bark);
}

.benefit-type-subsection-title {
  font-family: var(--font-text);
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.25;
  color: var(--yunda-bark);
}

.benefit-type-caption {
  font-family: var(--font-text);
  font-weight: 400;
  font-size: 0.8125rem;
  line-height: 1.5;
  color: var(--yunda-bark);
}

.benefit-type-onpage-heading {
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.25;
  color: var(--yunda-bark);
}

.benefit-type-amount {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1;
  color: var(--yunda-maple);
}

.benefit-type-faq-question {
  font-family: var(--font-text);
  font-weight: 700;
  font-size: 1rem;
  line-height: 1.25;
  color: var(--yunda-bark);
}

.benefit-type-faq-answer {
  font-family: var(--font-text);
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.7;
  color: color-mix(in srgb, var(--yunda-bark) 86%, transparent);
}

.benefit-section-warm {
  background: var(--benefit-cream-soft);
}

.benefit-overview-panel {
  background: #fff;
  padding-bottom: 2.5rem;
}

.benefit-payment-panel {
  background: #fff;
  padding-top: 0;
  padding-bottom: 0;
}

.benefit-package-section {
  background: #fff;
}

.benefit-timeline-section {
  background: #fff;
}

.benefit-timeline-panel {
  background: var(--benefit-sage);
}

.benefit-timeline-rail {
  position: absolute;
  top: 0;
  left: 7.5%;
  right: 7.5%;
  z-index: 0;
  height: var(--benefit-timeline-node-row);
  pointer-events: none;
}

.benefit-timeline-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  transform: translateY(-50%);
  background: color-mix(in srgb, var(--benefit-timeline-gold) 82%, #fff 18%);
}

.benefit-timeline-line::before {
  content: '';
  position: absolute;
  inset: -4px 0;
  background-image: radial-gradient(circle, color-mix(in srgb, var(--benefit-timeline-gold) 90%, #fff 10%) 2.5px, transparent 2.6px);
  background-size: calc(100% / 6) 100%;
  background-repeat: repeat-x;
  background-position: center;
}

.benefit-timeline-track {
  --benefit-timeline-node-row: 5rem;
}

.benefit-timeline-node-wrap {
  height: var(--benefit-timeline-node-row);
}

@media (max-width: 1023px) {
  .benefit-timeline-node-wrap {
    height: auto;
    min-height: 4.75rem;
  }

  .benefit-timeline-node--featured {
    width: 5.5rem;
    height: 5.5rem;
  }
}

.benefit-timeline-steps {
  position: relative;
  z-index: 1;
}

.benefit-timeline-node {
  width: 4.75rem;
  height: 4.75rem;
  background: var(--benefit-cream-card);
  border: 1.5px solid color-mix(in srgb, var(--benefit-timeline-gold) 88%, #fff 12%);
  box-shadow: none;
}

.benefit-timeline-node--featured {
  width: 6.5rem;
  height: 6.5rem;
}

.benefit-timeline-cta {
  background: var(--benefit-timeline-cta);
  color: #fff;
}

@media (min-width: 1024px) {
  .benefit-timeline-track {
    --benefit-timeline-node-row: 7.25rem;
  }

  .benefit-timeline-node {
    width: 5.5rem;
    height: 5.5rem;
  }

  .benefit-timeline-node--featured {
    width: 7.25rem;
    height: 7.25rem;
  }
}

@media (min-width: 1024px) {
  .benefit-overview-panel {
    padding-bottom: 3.5rem;
  }
}

.benefit-onpage {
  background: var(--benefit-sage);
  border: 1px solid color-mix(in srgb, var(--yunda-bark) 8%, transparent);
}

.benefit-onpage-grid {
  display: grid;
  grid-template-columns: 1fr;
}

.benefit-onpage-heading,
.benefit-onpage-item {
  border-bottom: 1px solid color-mix(in srgb, var(--yunda-bark) 14%, transparent);
}

.benefit-onpage-item:last-child {
  border-bottom: none;
}

.benefit-onpage-check {
  background: var(--yunda-maple);
}

.benefit-hero-visual {
  isolation: isolate;
}

.benefit-hero-arch {
  border-radius: 999px 0 0 999px;
  background: var(--benefit-sage);
}

.benefit-hero-photo {
  min-height: 360px;
  border-radius: 0;
  -webkit-mask-image: linear-gradient(to right, transparent 0%, #000 18%, #000 100%);
  mask-image: linear-gradient(to right, transparent 0%, #000 18%, #000 100%);
}

.benefit-hero-pay-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 9.75rem;
  min-height: 9.75rem;
  padding: 1rem 0.75rem;
  border-radius: 14px;
  background: var(--benefit-sage);
  border: none;
  box-shadow: 0 6px 20px rgba(55, 40, 25, 0.1);
  text-align: center;
}

.benefit-hero-pay-label {
  font-family: var(--font-text);
  font-weight: 500;
  font-size: 0.75rem;
  line-height: 1.35;
  color: var(--yunda-bark);
}

.benefit-hero-pay-amount {
  margin-top: 0.5rem;
  font-family: var(--font-text);
  font-weight: 700;
  font-size: 1.625rem;
  line-height: 1;
  color: var(--yunda-maple);
}

@media (min-width: 640px) {
  .benefit-hero-pay-card {
    width: 10.5rem;
    min-height: 10.5rem;
    padding: 1.125rem 0.875rem;
    border-radius: 16px;
  }

  .benefit-hero-pay-label {
    font-size: 0.8125rem;
    line-height: 1.4;
  }

  .benefit-hero-pay-amount {
    margin-top: 0.625rem;
    font-size: 1.875rem;
  }
}

.benefit-hero-cta-primary {
  background: var(--yunda-maple);
  color: #fff;
}

.benefit-hero-cta-secondary {
  border-color: var(--yunda-maple);
  background: #fff;
  color: var(--yunda-maple);
}

.benefit-overview-icon,
.benefit-payment-icon,
.benefit-package-icon,
.benefit-timeline-icon {
  display: block;
  mix-blend-mode: darken;
}

.benefit-overview-card {
  background: var(--benefit-cream-card);
  border: 1px solid color-mix(in srgb, var(--benefit-timeline-gold) 28%, #ebe4d8);
  box-shadow: none;
}

.benefit-payment-step {
  background: var(--benefit-cream-card);
  border: none;
  box-shadow: none;
}

.benefit-payment-step-badge {
  background: var(--benefit-payment-badge);
  font-family: var(--font-text);
  font-size: 0.8125rem;
}

.benefit-package-card {
  background: var(--benefit-cream-card);
  border: 1px solid color-mix(in srgb, var(--benefit-timeline-gold) 28%, #ebe4d8);
  box-shadow: none;
}

.benefit-state-section {
  background: #fff;
}

.benefit-faq-section {
  background: #fff;
}

.benefit-faq-item {
  background: var(--benefit-cream-card);
  border: 1px solid color-mix(in srgb, var(--benefit-timeline-gold) 32%, #ebe4d8);
  box-shadow: none;
}

.benefit-faq-trigger {
  background: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
}

.benefit-faq-item {
  overflow: hidden;
}

.benefit-faq-toggle {
  width: 1.75rem;
  font-family: var(--font-text);
  font-size: 1.375rem;
  font-weight: 300;
  color: color-mix(in srgb, var(--yunda-bark) 72%, transparent);
  text-align: center;
}

.benefit-state-card {
  background: var(--benefit-cream-card);
  border: none;
  box-shadow: none;
}

.benefit-type-state-amount {
  font-family: var(--font-text);
  font-weight: 700;
  font-size: 1.625rem;
  line-height: 1;
  color: var(--yunda-bark);
}

@media (min-width: 1024px) {
  .benefit-type-state-amount {
    font-size: 1.875rem;
  }
}

.benefit-state-badge {
  background: var(--benefit-timeline-gold);
}

.benefit-state-icon {
  display: block;
  mix-blend-mode: darken;
}

.benefit-cta-section {
  background: #fff;
}

.benefit-cta {
  background: var(--benefit-cream-card);
  border: none;
  box-shadow: 0 10px 32px rgba(55, 40, 25, 0.07);
}

.benefit-cta-button {
  background: var(--yunda-maple);
  color: #fff;
}

.benefit-cta-photo-blur {
  filter: blur(12px);
  -webkit-mask-image: linear-gradient(
    to right,
    #000 0%,
    rgba(0, 0, 0, 0.88) 18%,
    rgba(0, 0, 0, 0.45) 34%,
    transparent 52%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    #000 0%,
    rgba(0, 0, 0, 0.88) 18%,
    rgba(0, 0, 0, 0.45) 34%,
    transparent 52%,
    transparent 100%
  );
}

.benefit-cta-photo-fade {
  background: linear-gradient(
    to right,
    var(--benefit-cream-card) 0%,
    color-mix(in srgb, var(--benefit-cream-card) 94%, transparent) 12%,
    color-mix(in srgb, var(--benefit-cream-card) 55%, transparent) 22%,
    color-mix(in srgb, var(--benefit-cream-card) 12%, transparent) 36%,
    transparent 48%,
    transparent 100%
  );
}

@media (max-width: 1023px) {
  .benefit-cta-photo-blur {
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.35) 55%,
      rgba(0, 0, 0, 0.75) 78%,
      #000 100%
    );
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      rgba(0, 0, 0, 0.35) 55%,
      rgba(0, 0, 0, 0.75) 78%,
      #000 100%
    );
  }

  .benefit-cta-photo-fade {
    background: linear-gradient(
      to bottom,
      transparent 0%,
      color-mix(in srgb, var(--benefit-cream-card) 18%, transparent) 58%,
      color-mix(in srgb, var(--benefit-cream-card) 72%, transparent) 78%,
      var(--benefit-cream-card) 100%
    );
  }
}

:deep(.benefit-amount) {
  color: var(--yunda-maple);
  font-weight: 600;
}

@media (min-width: 1024px) {
  .benefit-section-inner {
    padding-left: var(--benefit-px-lg);
    padding-right: var(--benefit-px-lg);
  }

  .benefit-section-spacing {
    padding-top: var(--benefit-hero-pt-lg);
    padding-bottom: var(--benefit-hero-pb-lg);
  }

  .benefit-section.benefit-section-after-hero {
    padding-top: var(--benefit-gap-after-hero-lg);
  }

  .benefit-section {
    padding-top: var(--benefit-gap-lg);
  }

  .benefit-section--last {
    padding-bottom: var(--benefit-last-pb-lg);
  }

  .benefit-type-h1 {
    font-size: 3.125rem;
  }

  .benefit-type-hero-lead {
    font-size: 1.125rem;
    line-height: 1.75;
  }

  .benefit-section-title {
    font-size: 2.25rem;
    line-height: 1.15;
  }

  .benefit-type-intro,
  .benefit-type-card-body,
  .benefit-type-faq-answer {
    font-size: 1.0625rem;
    line-height: 1.75;
  }

  .benefit-type-card-title,
  .benefit-type-subsection-title {
    font-size: 1.5rem;
  }

  .benefit-type-card-title--compact {
    font-size: 1.0625rem;
  }

  .benefit-type-caption {
    font-size: 0.875rem;
    line-height: 1.6;
  }

  .benefit-type-onpage-heading {
    font-size: 1.5rem;
    line-height: 1.25;
  }

  .benefit-type-faq-question {
    font-size: 1.0625rem;
  }

  .benefit-payment-step-badge {
    font-size: 0.875rem;
  }

  .benefit-onpage-grid {
    grid-template-columns: minmax(190px, 0.95fr) repeat(4, minmax(0, 1fr));
  }

  .benefit-onpage-heading,
  .benefit-onpage-item {
    border-bottom: none;
    border-right: 1px solid color-mix(in srgb, var(--yunda-bark) 14%, transparent);
  }

  .benefit-onpage-item:last-child {
    border-right: none;
  }

  .benefit-onpage-heading {
    align-content: center;
  }

  .benefit-hero-photo {
    min-height: 500px;
  }
}
</style>

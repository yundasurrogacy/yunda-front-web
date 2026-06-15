<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { buildCoreServicePageSchemas } from '~/utils/schema'

/**
 * 改版说明与素材：`修改/2026-06-05-2/Screening页面改版/`
 * 静态文件：`public/images/screening/redesign/`
 */
/** 仅第一屏人物图为实拍素材；screen-05~07 为配色/排版稿，非页面插图 */
const PAGE_ASSETS = {
  hero: '/images/screening/redesign/hero.jpg',
} as const

interface AfterApplyCard {
  num: string
  tone: 'sage' | 'cream'
  title: string
  paragraphs: string[]
  expandable?: boolean
  bulletsLabel?: string
  bullets?: string[]
}

const { locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const translations = {
  en: {
    seoTitle: 'Surrogate Screening Process: What Happens After You Apply | Yunda Surrogacy',
    seoDescription:
      'Learn what happens after you apply to become a surrogate, including medical screening, psychological evaluation, background check, and clinic clearance—with guidance designed to protect your health and confidence.',
    heroTitle: 'Surrogate Screening Process: What Happens After You Apply',
    heroSubtitle:
      'Learn what to expect after your surrogate application, including medical screening, psychological evaluation, background check, and clinic clearance, with guidance designed to protect your health and confidence.',
    onPageTitle: 'On this page, you’ll learn:',
    onPageItems: [
      'what happens after you apply to become a surrogate',
      'what the surrogate screening process includes',
      'how medical screening and psychological evaluation work',
      'why background checks and clinic clearance matter',
    ],
    heroSteps: [
      { num: '01', label: 'Application Review' },
      { num: '02', label: 'Medical Screening' },
      { num: '03', label: 'Psychological Evaluation' },
    ],
    primaryCta: 'Surrogate Application',
    secondaryCta: 'See the Surrogate Journey',
    afterApplyTitle: 'What Happens After You Apply to Become a Surrogate?',
    afterApplySections: [
      {
        num: '01',
        tone: 'sage',
        expandable: true,
        title: 'We Review Your Application First',
        paragraphs: [
          'After you apply to become a surrogate, our team starts by reviewing the information you shared. We look at your pregnancy history, general health background, lifestyle, and basic surrogate criteria.',
          'This first step helps us understand whether you may be ready to continue into the surrogate screening process.',
        ],
        bulletsLabel: 'We may review:',
        bullets: [
          'Previous pregnancy and delivery history',
          'General health information',
          'Lifestyle and support system',
          'Any details that need clarification',
        ],
      },
      {
        num: '02',
        tone: 'sage',
        expandable: true,
        title: 'Screening Helps Protect Your Health and Readiness',
        paragraphs: [
          'Surrogate screening is not meant to feel intimidating. It is a careful review that helps make sure surrogacy is safe and appropriate for you before moving forward.',
          'After the first review, the next steps may include surrogate medical screening, psychological evaluation, and a background check.',
        ],
        bulletsLabel: 'These steps help confirm:',
        bullets: [
          'Your body may be ready for a surrogate pregnancy',
          'You understand the emotional side of the journey',
          'You have the support needed to move forward',
          'The process is safe and transparent for everyone',
        ],
      },
      {
        num: '03',
        tone: 'cream',
        title: 'We Help You Move Toward Clinic Clearance',
        paragraphs: [
          'Once the screening steps are completed, a fertility clinic reviews your medical information and decides.',
          'Sometimes, the clinic may ask for additional records or follow-up testing. Yunda Surrogacy helps you understand what is needed and how to prepare.',
        ],
      },
      {
        num: '04',
        tone: 'cream',
        title: 'Psychological Evaluation and Emotional Readiness',
        paragraphs: [
          'A licensed mental health professional may talk with you about your motivation, family support, boundaries, communication style, and comfort with the journey.',
        ],
      },
      {
        num: '05',
        tone: 'cream',
        title: 'Background Check and Clinic Clearance',
        paragraphs: [
          'A background check supports a safe and responsible journey, Clinic clearance comes from the fertility clinic after reviewing medical records, exams, lab results, and follow-up details.',
        ],
      },
    ] as AfterApplyCard[],
    protectEyebrow: 'Designed to Protect You',
    protectTitle: 'A Careful Screening Process',
    protectBody:
      'Screening is not about judging you or making the process feel stressful. It is a careful review designed to help protect your health, your time, and your emotional well-being.',
    protectListTitle: 'What we look at',
    protectList: [
      'Your health and pregnancy history',
      'Your emotional readiness',
      'Your support system',
      'Your comfort with the journey',
      'Any questions or concerns you may have',
    ],
    medicalEyebrow: 'Medical Screening',
    medicalTitle: 'We Review Your Health and Pregnancy History',
    medicalBody:
      'The fertility clinic may review your previous pregnancy records, delivery history, general health background, and any medical details before clinic clearance.',
    medicalList: [
      'OB/GYN records',
      'Uterus and reproductive health review',
      'Bloodwork and infectious disease testing',
      'Medication or hormone readiness review',
      'Additional records if something needs clarification',
    ],
    testingEyebrow: 'Request Testing',
    testingTitle: 'The Fertility Clinic May Request Exams or Lab Work',
    testingBody:
      'Surrogate medical screening usually includes a closer review by a fertility clinic. The clinic may ask for lab work, a physical exam, or other testing based on your medical history.',
    testingListTitle: 'Screening may include:',
    testingList: [
      'Bloodwork and infectious disease testing',
      'A physical exam',
      'A review of your uterus and reproductive health',
      'Medication or hormone readiness review',
      'Additional records if something needs clarification',
    ],
    helpEyebrow: 'Help Each Step',
    helpTitle: 'We Help You Understand Each Step',
    helpBody:
      'We know medical screening can feel unfamiliar. Our role is to help you understand what the clinic needs, why it matters, and how to prepare.',
    helpListTitle: 'We will help you:',
    helpList: [
      'Know what documents may be needed',
      'Prepare for clinic requests',
      'Understand follow-up steps',
      'Communicate clearly with the care team',
      'Feel supported before clinic clearance',
    ],
    faqTitle: 'Frequently Asked Questions',
    faqItems: [
      {
        q: 'What happens after I apply to become a surrogate?',
        a: 'After you apply, we review your basic information, pregnancy history, and health background. If you may be a good fit, we guide you into the next steps of the surrogate screening process.',
      },
      {
        q: 'What is included in the surrogate screening process?',
        a: 'The surrogate screening process may include application review, medical screening, psychological evaluation, background check, and clinic clearance before you move forward.',
      },
      {
        q: 'What does surrogate medical screening include?',
        a: 'Surrogate medical screening may include medical record review, lab work, physical exam, and reproductive health checks. The fertility clinic uses this information to decide whether moving forward is medically appropriate.',
      },
      {
        q: 'Do surrogates need a psychological evaluation?',
        a: 'Yes. A psychological evaluation helps confirm that you understand the emotional side of surrogacy and feel prepared for the journey.',
      },
      {
        q: 'Why is a background check required for surrogacy?',
        a: 'A background check helps create a safe and transparent process for you, the intended parents, and the professional team. It is a normal part of responsible surrogacy screening.',
      },
      {
        q: 'What is clinic clearance for surrogacy?',
        a: 'Clinic clearance means the fertility clinic has reviewed your medical information and feels comfortable moving forward from a medical perspective.',
      },
      {
        q: 'What if the clinic asks for more records or follow-up testing?',
        a: 'Follow-up requests are common and do not always mean something is wrong. Yunda Surrogacy helps you understand what is needed and how to prepare.',
      },
      {
        q: 'How long does the surrogate screening process take?',
        a: 'The timeline can vary based on your medical records, clinic requirements, appointments, and follow-up needs. Our team helps keep the process clear and organized.',
      },
    ],
  },
  zh: {
    seoTitle: '代孕筛查流程：申请之后会发生什么 | 孕达代孕',
    seoDescription:
      '了解申请成为代孕妈妈后的流程，包括医学筛查、心理评估、背景调查与诊所放行，全程以保护你的健康与信心为设计导向。',
    heroTitle: '代孕筛查流程：申请之后会发生什么',
    heroSubtitle:
      '了解申请成为代孕妈妈后的安排，包括医学筛查、心理评估、背景调查与诊所放行，全程以保护你的健康与信心为设计导向。',
    onPageTitle: '本页你将了解：',
    onPageItems: [
      '申请成为代孕妈妈之后会发生什么',
      '代孕筛查流程通常包含哪些内容',
      '医学筛查与心理评估如何推进',
      '背景调查与诊所放行为何重要',
    ],
    heroSteps: [
      { num: '01', label: '申请审核' },
      { num: '02', label: '医学筛查' },
      { num: '03', label: '心理评估' },
    ],
    primaryCta: '代孕申请',
    secondaryCta: '查看代孕旅程',
    afterApplyTitle: '申请成为代孕妈妈之后会发生什么？',
    afterApplySections: [
      {
        num: '01',
        tone: 'sage',
        expandable: true,
        title: '我们先审核你的申请',
        paragraphs: [
          '在你提交代孕申请后，团队会先审阅你提供的信息，包括妊娠史、整体健康状况、生活方式以及基础代孕条件。',
          '这一步帮助我们判断你是否适合进入正式筛查流程。',
        ],
        bulletsLabel: '我们可能会审阅：',
        bullets: [
          '既往妊娠与分娩记录',
          '整体健康信息',
          '生活方式与支持系统',
          '需要进一步说明的细节',
        ],
      },
      {
        num: '02',
        tone: 'sage',
        expandable: true,
        title: '筛查旨在保护你的健康与准备度',
        paragraphs: [
          '代孕筛查并非为了让你感到压力，而是一次审慎评估，确保在继续推进前，代孕对你而言是安全且合适的。',
          '初审之后，可能包括医学筛查、心理评估与背景调查。',
        ],
        bulletsLabel: '这些步骤有助于确认：',
        bullets: [
          '身体可能适合承担代孕妊娠',
          '你理解旅程中的情感层面',
          '你具备继续推进所需的支持',
          '流程对你与相关各方都安全透明',
        ],
      },
      {
        num: '03',
        tone: 'cream',
        title: '我们协助你走向诊所放行',
        paragraphs: [
          '完成各项筛查后，生殖诊所会审阅你的医学资料并作出判断。',
          '有时诊所会要求补充病历或随访检查，孕达会说明所需内容并协助你做好准备。',
        ],
      },
      {
        num: '04',
        tone: 'cream',
        title: '心理评估与情感准备',
        paragraphs: [
          '持证心理健康专业人士可能会与你讨论动机、家庭支持、边界、沟通方式，以及对整个旅程的舒适度。',
        ],
      },
      {
        num: '05',
        tone: 'cream',
        title: '背景调查与诊所放行',
        paragraphs: [
          '背景调查有助于营造安全、负责任的旅程环境。诊所放行则来自生殖诊所在审阅病历、体检、化验与随访结果后的医学确认。',
        ],
      },
    ] as AfterApplyCard[],
    protectEyebrow: '为你而设',
    protectTitle: '审慎的筛查流程',
    protectBody:
      '筛查不是为了评判你，也不是为了让流程变得紧张。它是一次审慎评估，旨在保护你的健康、时间与情绪安定。',
    protectListTitle: '我们会关注',
    protectList: [
      '你的健康与妊娠史',
      '你的情感准备度',
      '你的支持系统',
      '你对旅程的舒适度',
      '你可能有的疑问或顾虑',
    ],
    medicalEyebrow: '医学筛查',
    medicalTitle: '我们审阅你的健康与妊娠史',
    medicalBody:
      '生殖诊所可能在放行前审阅你的既往妊娠记录、分娩史、整体健康背景及其他医学信息。',
    medicalList: [
      '妇产科病历',
      '子宫与生殖健康评估',
      '血液检查与传染病筛查',
      '用药或激素准备评估',
      '如需补充的其他记录',
    ],
    testingEyebrow: '检查安排',
    testingTitle: '生殖诊所可能要求体检或化验',
    testingBody:
      '代孕医学筛查通常由生殖诊所进行更深入评估，并可能根据你的病史要求化验、体格检查或其他项目。',
    testingListTitle: '筛查可能包括：',
    testingList: [
      '血液检查与传染病筛查',
      '体格检查',
      '子宫与生殖健康评估',
      '用药或激素准备评估',
      '如需补充的其他记录',
    ],
    helpEyebrow: '步步陪同',
    helpTitle: '我们帮你理解每一步',
    helpBody:
      '医学筛查可能让你感到陌生。我们的角色是帮你理解诊所需要什么、为何重要，以及如何做好准备。',
    helpListTitle: '我们会协助你：',
    helpList: [
      '了解可能需要哪些文件',
      '为诊所要求做好准备',
      '理解随访与补充检查',
      '与医疗团队清晰沟通',
      '在诊所放行前感到被支持',
    ],
    faqTitle: '常见问题',
    faqItems: [
      {
        q: '申请成为代孕妈妈之后会发生什么？',
        a: '提交申请后，我们会审阅你的基本信息、妊娠史与健康背景。若初步判断可能适合，我们会引导你进入代孕筛查的下一步。',
      },
      {
        q: '代孕筛查流程包含哪些内容？',
        a: '可能包括申请审核、医学筛查、心理评估、背景调查，以及在继续推进前的诊所医学放行。',
      },
      {
        q: '代孕医学筛查包括什么？',
        a: '可能包括病历审阅、化验、体格检查与生殖健康评估。生殖诊所据此判断从医学角度继续推进是否合适。',
      },
      {
        q: '代孕妈妈需要做心理评估吗？',
        a: '需要。心理评估有助于确认你理解代孕的情感层面，并对旅程有充分准备。',
      },
      {
        q: '为什么代孕需要背景调查？',
        a: '背景调查有助于为你、意向父母与专业团队营造安全、透明的流程，是负责任的代孕筛查中的常规环节。',
      },
      {
        q: '什么是代孕中的诊所放行？',
        a: '诊所放行指生殖诊所在审阅你的医学资料后，从医学角度认为可以继续推进。',
      },
      {
        q: '如果诊所要求补充病历或随访检查怎么办？',
        a: '补充要求很常见，并不一定代表有问题。孕达会说明所需内容并协助你做好准备。',
      },
      {
        q: '代孕筛查流程一般需要多久？',
        a: '时间因病历完整性、诊所要求、预约与随访需求而异。我们的团队会帮助你保持流程清晰、有条理。',
      },
    ],
  },
}

const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)
const pagePath = '/screening'

const schemaScreeningItems = computed(() =>
  c.value.heroSteps.map((step, index) => ({
    position: index + 1,
    name: step.label,
    description: c.value.heroSubtitle,
    url: pagePath,
  })),
)

const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: c.value.heroTitle,
  description: c.value.seoDescription,
  about: 'Gestational carrier screening after application',
  audience: 'Potential gestational carriers / surrogate applicants',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  service: {
    name: 'Gestational Carrier Screening Coordination',
    serviceType: 'Gestational carrier screening coordination',
    areaServed: ['California', 'United States'],
    audience: 'Potential gestational carriers / surrogate applicants',
    description:
      'Support for gestational carrier screening after application, including application review, medical screening, psychological evaluation, background check, and fertility clinic clearance.',
  },
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Surrogates', url: '/be-surrogate' },
    { name: 'Our Screening Process', url: pagePath },
  ],
  faqs: c.value.faqItems.map(item => ({
    question: item.q,
    answer: item.a,
  })),
  itemList: {
    name: 'Surrogate Screening Process',
    description: c.value.heroSubtitle,
    items: schemaScreeningItems.value,
  },
}))

const afterApplyExpanded = ref([true, true])

const afterApplyTopCards = computed(() => c.value.afterApplySections.slice(0, 2))
const afterApplyBottomCards = computed(() => c.value.afterApplySections.slice(2, 5))

const faqRows = computed(() => {
  const rows: typeof c.value.faqItems[] = []
  const items = c.value.faqItems
  for (let i = 0; i < items.length; i += 2)
    rows.push(items.slice(i, i + 2))
  return rows
})

function toggleAfterApplyCard(index: number) {
  afterApplyExpanded.value[index] = !afterApplyExpanded.value[index]
}

useHead(() => ({
  title: c.value.seoTitle,
  meta: [{ name: 'description', content: c.value.seoDescription }],
  link: [{ rel: 'preload', as: 'image', href: PAGE_ASSETS.hero, fetchpriority: 'high' }],
}))

useHead(() => ({
  script: coreServicePageSchemas.value.map((schema, index) => ({
    key: `schema-screening-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div class="screening-page min-h-screen text-[var(--yunda-bark)]">
    <AppHeader />

    <main>
      <!-- 第一屏：左文案 + 右灰蓝面板（照片与 01/02/03 白卡同在面板内，对照 screen-01 稿） -->
      <section class="screening-hero screening-hero-spacing relative isolate w-full overflow-hidden">
        <div aria-hidden="true" class="screening-hero-blob screening-hero-blob--left pointer-events-none absolute blur-3xl" />
        <div aria-hidden="true" class="screening-hero-blob screening-hero-blob--right pointer-events-none absolute blur-3xl" />

        <div class="screening-section-inner relative z-10 mx-auto max-w-[1400px]">
          <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-12 xl:gap-16">
            <div class="lg:pr-4">
              <h1 class="max-w-[620px] font-display text-[36px] font-semibold leading-[1.08] lg:text-[50px]">
                  {{ c.heroTitle }}
                </h1>
              <p class="mt-5 max-w-[600px] text-[16px] text-[var(--yunda-bark)]/90 leading-[1.8] lg:mt-6 lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ c.heroSubtitle }}
                </p>
              <div class="screening-hero-onpage mt-7 max-w-[600px] rounded-[20px] px-5 py-5 lg:mt-8 lg:px-6 lg:py-6">
                <p class="text-[17px] font-bold lg:text-[19px]" style="font-family: var(--font-text)">
                    {{ c.onPageTitle }}
                  </p>
                <ul class="mt-3.5 grid gap-3">
                    <li
                      v-for="(item, index) in c.onPageItems"
                    :key="`onpage-${index}`"
                    class="flex items-start gap-3 text-[15px] text-[var(--yunda-bark)] leading-[1.72] lg:text-[16px]"
                      style="font-family: var(--font-text)"
                  >
                    <span class="screening-hero-check mt-0.5 inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full">
                      <Icon name="radix-icons:check" class="h-3 w-3 text-white" />
                    </span>
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>

            <div class="screening-hero-panel w-full rounded-[24px] px-4 py-4 sm:px-5 sm:py-5 lg:px-6 lg:py-6">
                  <img
                :src="PAGE_ASSETS.hero"
                    :alt="c.heroTitle"
                class="w-full rounded-[18px] object-cover object-[center_32%] aspect-[5/6] sm:aspect-[6/7]"
                    loading="eager"
                fetchpriority="high"
                    decoding="async"
              >
              <div class="mt-4 grid grid-cols-3 gap-2.5 sm:mt-5 sm:gap-3">
                <div
                  v-for="step in c.heroSteps"
                  :key="step.num"
                  class="screening-hero-step rounded-[14px] px-2 py-3.5 text-center sm:px-3 sm:py-4"
                >
                  <p class="screening-step-num font-display text-[30px] font-semibold leading-none sm:text-[36px]">
                    {{ step.num }}
                  </p>
                  <p class="mt-2 text-[11px] font-semibold leading-[1.35] text-[var(--yunda-bark)] sm:text-[12px] lg:text-[13px]" style="font-family: var(--font-text)">
                    {{ step.label }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第二屏：screen-02/03 稿 — 上 2 灰绿大卡 + 下 3 米色小卡；01/02 列表默认展开 -->
      <section id="after-apply" class="screening-section screening-section-warm scroll-mt-28 w-full">
        <div class="screening-section-inner mx-auto max-w-[1400px]">
          <h2 class="screening-section-title font-display text-[32px] font-semibold leading-[1.1] lg:text-[42px]">
            {{ c.afterApplyTitle }}
          </h2>

          <div class="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
            <article
              v-for="(card, index) in afterApplyTopCards"
              :key="`after-top-${card.num}`"
              class="screening-after-card screening-after-card--sage flex min-h-[460px] flex-col rounded-[24px] px-6 py-7 sm:px-7 sm:py-8"
            >
              <span class="screening-after-num inline-flex h-[34px] w-[34px] items-center justify-center rounded-full text-[12px] font-bold tracking-wide text-white">
                {{ card.num }}
              </span>
              <h3 class="mt-4 font-display text-[24px] font-semibold leading-[1.2] lg:text-[28px]">
                {{ card.title }}
              </h3>
              <div class="mt-4 space-y-4">
                <p
                  v-for="(paragraph, pi) in card.paragraphs"
                  :key="`after-top-p-${card.num}-${pi}`"
                  class="font-display text-[15px] leading-[1.78] text-[var(--yunda-bark)] lg:text-[16px]"
                >
                  {{ paragraph }}
                </p>
            </div>

              <div v-if="card.expandable" class="mt-auto flex flex-col pt-6">
                <template v-if="afterApplyExpanded[index]">
                  <p class="font-display text-[16px] font-semibold text-[var(--yunda-bark)] lg:text-[17px]">
                    {{ card.bulletsLabel }}
                  </p>
                  <ul class="mt-3 grid gap-2.5">
                    <li
                      v-for="(bullet, bi) in card.bullets"
                      :key="`after-top-bullet-${index}-${bi}`"
                      class="flex items-start gap-2.5 font-display text-[14px] leading-[1.7] text-[var(--yunda-bark)] lg:text-[15px]"
                    >
                      <span class="mt-[9px] h-[5px] w-[5px] shrink-0 rounded-full bg-[var(--yunda-bark)]/45" />
                      <span>{{ bullet }}</span>
                    </li>
                  </ul>
                </template>

                <div class="relative mt-5 border-t border-[var(--yunda-bark)]/18">
                      <button
                    v-if="afterApplyExpanded[index]"
                        type="button"
                    class="absolute -top-3.5 right-0 inline-flex h-7 w-7 items-center justify-center font-display text-[20px] leading-none text-[var(--yunda-bark)]/65"
                    :aria-label="card.bulletsLabel"
                    @click="toggleAfterApplyCard(index)"
                  >
                    −
                  </button>
                  <button
                    v-else
                    type="button"
                    class="flex w-full items-center justify-between gap-4 pt-4 text-left"
                    :aria-expanded="false"
                    @click="toggleAfterApplyCard(index)"
                  >
                    <span class="font-display text-[16px] font-semibold text-[var(--yunda-bark)]">
                      {{ card.bulletsLabel }}
                        </span>
                    <span class="font-display text-[22px] leading-none text-[var(--yunda-bark)]/65">+</span>
                      </button>
                    </div>
              </div>
                      </article>
            </div>

          <div class="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
                    <article
              v-for="card in afterApplyBottomCards"
              :key="`after-bottom-${card.num}`"
              class="screening-after-card screening-after-card--cream rounded-[24px] px-6 py-7 sm:px-7 sm:py-8"
            >
              <span class="screening-after-num inline-flex h-[34px] w-[34px] items-center justify-center rounded-full text-[12px] font-bold tracking-wide text-white">
                {{ card.num }}
              </span>
              <h3 class="mt-4 font-display text-[22px] font-semibold leading-[1.2] lg:text-[26px]">
                          {{ card.title }}
              </h3>
              <div class="mt-4 space-y-4">
                <p
                  v-for="(paragraph, pi) in card.paragraphs"
                  :key="`after-bottom-p-${card.num}-${pi}`"
                  class="font-display text-[15px] leading-[1.78] text-[var(--yunda-bark)] lg:text-[16px]"
                >
                  {{ paragraph }}
                        </p>
                      </div>
                    </article>
                  </div>
                  </div>
      </section>

      <!-- 第三屏：screen-04 稿 — 左灰绿文案卡 + 右米色「What we look at」白条列表，无配图 -->
      <section class="screening-section w-full bg-white">
        <div class="screening-section-inner mx-auto max-w-[1400px]">
          <div class="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
            <article class="screening-protect-left flex flex-col rounded-[24px] px-7 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <p class="screening-eyebrow text-[11px] font-bold tracking-[0.24em] uppercase lg:text-[12px]" style="font-family: var(--font-text)">
                {{ c.protectEyebrow }}
              </p>
              <h2 class="mt-4 font-display text-[28px] font-semibold leading-[1.12] lg:text-[36px]">
                {{ c.protectTitle }}
              </h2>
              <p class="mt-5 font-display text-[15px] leading-[1.8] text-[var(--yunda-bark)] lg:mt-6 lg:text-[17px]">
                {{ c.protectBody }}
                    </p>
                  </article>

            <article class="screening-protect-right flex flex-col rounded-[24px] px-7 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <h2 class="font-display text-[28px] font-semibold leading-[1.12] lg:text-[36px]">
                {{ c.protectListTitle }}
              </h2>
              <ul class="mt-6 grid flex-1 gap-3 lg:mt-8 lg:gap-3.5">
                <li
                  v-for="(item, index) in c.protectList"
                  :key="`protect-${index}`"
                  class="rounded-[14px] bg-white px-5 py-4 font-display text-[15px] leading-[1.55] text-[var(--yunda-bark)] lg:px-6 lg:py-[18px] lg:text-[16px]"
                >
                  {{ item }}
                </li>
              </ul>
                </article>
              </div>
            </div>
      </section>

      <!-- 第四屏：screen-05 稿 — 左奶油文案 + 右陶土橙列表 -->
      <section class="screening-section screening-section-warm w-full">
        <div class="screening-section-inner mx-auto max-w-[1400px]">
          <div class="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
            <article class="screening-medical-left flex flex-col rounded-[24px] px-7 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <p class="screening-eyebrow text-[11px] font-bold tracking-[0.24em] uppercase lg:text-[12px]" style="font-family: var(--font-text)">
                {{ c.medicalEyebrow }}
              </p>
              <h2 class="mt-4 font-display text-[28px] font-semibold leading-[1.12] lg:text-[36px]">
                {{ c.medicalTitle }}
                </h2>
              <p class="mt-5 font-display text-[15px] leading-[1.8] lg:mt-6 lg:text-[17px]">
                {{ c.medicalBody }}
              </p>
            </article>
            <article class="screening-medical-right flex flex-col rounded-[24px] px-7 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <h2 class="font-display text-[28px] font-semibold leading-[1.12] text-white lg:text-[36px]">
                {{ c.protectListTitle }}
              </h2>
              <ul class="mt-6 grid flex-1 gap-3 lg:mt-8 lg:gap-3.5">
                <li
                  v-for="(item, index) in c.medicalList"
                  :key="`medical-${index}`"
                  class="screening-orange-pill rounded-[14px] px-5 py-4 font-display text-[15px] leading-[1.55] lg:px-6 lg:py-[18px] lg:text-[16px]"
                >
                      {{ item }}
                </li>
              </ul>
                  </article>
                </div>
              </div>
      </section>

      <!-- 第五屏：screen-06 稿 — 左橄榄卡文案 + 右奶油白条列表 -->
      <section class="screening-section w-full bg-white">
        <div class="screening-section-inner mx-auto max-w-[1400px]">
          <div class="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
            <article class="screening-testing-left flex flex-col rounded-[24px] px-7 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <p class="screening-eyebrow screening-eyebrow--on-dark text-[11px] font-bold tracking-[0.24em] uppercase lg:text-[12px]" style="font-family: var(--font-text)">
                {{ c.testingEyebrow }}
              </p>
              <h2 class="mt-4 font-display text-[28px] font-semibold leading-[1.12] lg:text-[36px]">
                {{ c.testingTitle }}
                </h2>
              <p class="mt-5 font-display text-[15px] leading-[1.8] lg:mt-6 lg:text-[17px]">
                {{ c.testingBody }}
                    </p>
                  </article>
            <article class="screening-testing-right flex flex-col rounded-[24px] px-7 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <h2 class="font-display text-[28px] font-semibold leading-[1.12] lg:text-[36px]">
                {{ c.testingListTitle }}
              </h2>
              <ul class="mt-6 grid flex-1 gap-3 lg:mt-8 lg:gap-3.5">
                <li
                  v-for="(item, index) in c.testingList"
                  :key="`testing-${index}`"
                  class="rounded-[14px] bg-white px-5 py-4 font-display text-[15px] leading-[1.55] lg:px-6 lg:py-[18px] lg:text-[16px]"
                >
                  {{ item }}
                </li>
              </ul>
            </article>
                </div>
              </div>
      </section>

      <!-- 第六 + 第七屏：screen-07/08 稿 — 同暖色底；FAQ 为圆角深棕卡（非全宽通栏） -->
      <section class="screening-section screening-section-warm screening-section--last scroll-mt-28 w-full">
        <div class="screening-section-inner mx-auto max-w-[1400px]">
          <div class="grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6">
            <article class="screening-help-left flex flex-col rounded-[24px] px-7 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <p class="screening-eyebrow text-[11px] font-bold tracking-[0.24em] uppercase lg:text-[12px]" style="font-family: var(--font-text)">
                {{ c.helpEyebrow }}
              </p>
              <h2 class="mt-4 font-display text-[28px] font-semibold leading-[1.12] lg:text-[36px]">
                {{ c.helpTitle }}
                </h2>
              <p class="mt-5 font-display text-[15px] leading-[1.8] lg:mt-6 lg:text-[17px]">
                {{ c.helpBody }}
                      </p>
                    </article>
            <article class="screening-help-right flex flex-col rounded-[24px] px-7 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <h2 class="font-display text-[28px] font-semibold leading-[1.12] text-white lg:text-[36px]">
                {{ c.helpListTitle }}
              </h2>
              <ul class="mt-6 grid flex-1 gap-3 lg:mt-8 lg:gap-3.5">
                <li
                  v-for="(item, index) in c.helpList"
                  :key="`help-${index}`"
                  class="screening-orange-pill screening-orange-pill--help rounded-[14px] px-5 py-4 font-display text-[15px] leading-[1.55] lg:px-6 lg:py-[18px] lg:text-[16px]"
                >
                          {{ item }}
                      </li>
              </ul>
            </article>
            </div>

          <article
            id="faq"
            class="screening-faq-card mt-10 rounded-[24px] px-7 py-8 sm:px-8 sm:py-9 lg:mt-12 lg:px-10 lg:py-10"
          >
            <h2 class="screening-faq-title font-display text-[32px] font-semibold leading-[1.1] lg:text-[42px]">
                  {{ c.faqTitle }}
                </h2>
            <div class="mt-6 lg:mt-8">
              <template
                v-for="(row, rowIndex) in faqRows"
                :key="`faq-row-${rowIndex}`"
              >
                <div
                  v-if="rowIndex > 0"
                  class="screening-faq-divider"
                          aria-hidden="true"
                />
                <div class="grid gap-10 py-8 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0 lg:py-10 xl:gap-x-20">
                  <article
                    v-for="(item, colIndex) in row"
                    :key="`faq-${rowIndex}-${colIndex}`"
                    class="max-w-[640px]"
                  >
                    <h3 class="font-display text-[18px] font-semibold leading-[1.35] lg:text-[22px]">
                      {{ item.q }}
                    </h3>
                    <p class="mt-3 font-display text-[15px] leading-[1.78] opacity-92 lg:mt-4 lg:text-[16px]">
                      {{ item.a }}
                    </p>
                  </article>
                </div>
              </template>
              </div>
          </article>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
/*
 * Screening 改版配色（对照 screen-01~07 稿）
 * 与全站 --yunda-* 并存，本页优先用 --screen-* 避免和 Petal/Maple 偏差
 */
.screening-page {
  /*
   * 屏间间距：对齐 journey/resources 的 py-14 lg:py-20 节奏，
   * 但仅用单边 padding-top 叠放，避免两屏各写一遍 pb+pt 导致中间过空。
   */
  --screen-px: 1.5rem;
  --screen-px-lg: 3rem;
  /* AppHeader 固定栏已有 h-20/h-25 占位，勿再叠 pt-24 量级 */
  --screen-hero-pt: 1.5rem;
  --screen-hero-pt-lg: 2rem;
  --screen-gap: 2.5rem;
  --screen-gap-lg: 3.5rem;
  --screen-faq-pb: 2.5rem;
  --screen-faq-pb-lg: 3.5rem;
  --screen-title-gap: 1.75rem;
  --screen-title-gap-lg: 2.25rem;
  --screen-bg: #ffffff;
  --screen-bg-warm: #fdfbf7;
  --screen-cream: #f9f1e7;
  --screen-cream-step: #fff5eb;
  --screen-cream-pale: #fef5e7;
  --screen-cream-soft: #fdf2e6;
  --screen-cream-help: #fdf5e9;
  --screen-panel: #e1e8e8;
  --screen-sage: #cbd5d0;
  --screen-olive-protect: #b5bdb5;
  --screen-olive-testing: #b5b38f;
  --screen-accent: #d27d46;
  --screen-accent-deep: #d47b41;
  --screen-accent-step: #c88a54;
  --screen-accent-eyebrow: #c88e5d;
  --screen-accent-pill: #e09b6c;
  --screen-accent-pill-help: #e29b6e;
  --screen-check: #b5c09b;
  background: var(--screen-bg);
}

.screening-hero {
  background: var(--screen-bg);
}

.screening-hero-spacing {
  padding-top: var(--screen-hero-pt);
  padding-bottom: 0;
}

.screening-section-inner {
  padding-left: var(--screen-px);
  padding-right: var(--screen-px);
}

/* 自第二屏起：仅 top 留白，屏与屏之间只计一次 gap */
.screening-section {
  padding-top: var(--screen-gap);
  padding-bottom: 0;
}

.screening-section-title {
  margin-bottom: var(--screen-title-gap);
}

.screening-section--last {
  padding-bottom: var(--screen-faq-pb);
}

.screening-faq-card {
  background: var(--yunda-bark);
  color: var(--yunda-petal);
}

@media (min-width: 1024px) {
  .screening-hero-spacing {
    padding-top: var(--screen-hero-pt-lg);
  }

  .screening-section-inner {
    padding-left: var(--screen-px-lg);
    padding-right: var(--screen-px-lg);
  }

  .screening-section {
    padding-top: var(--screen-gap-lg);
  }

  .screening-section-title {
    margin-bottom: var(--screen-title-gap-lg);
  }

  .screening-section--last {
    padding-bottom: var(--screen-faq-pb-lg);
  }
}

.screening-hero-blob {
  border-radius: 9999px;
  background: color-mix(in srgb, var(--screen-cream) 88%, transparent);
}

.screening-hero-blob--left {
  top: -5rem;
  left: -6rem;
  height: 220px;
  width: 220px;
}

.screening-hero-blob--right {
  top: 0;
  right: -5rem;
  height: 260px;
  width: 260px;
}

.screening-section-warm {
  background: var(--screen-bg-warm);
}

.screening-hero-onpage {
  background: var(--screen-cream);
}

.screening-hero-check {
  background: var(--screen-check);
}

.screening-hero-panel {
  background: var(--screen-panel);
  box-shadow: 0 16px 40px rgba(46, 38, 31, 0.07);
}

.screening-hero-step {
  background: var(--screen-cream-step);
  box-shadow: 0 6px 16px rgba(46, 38, 31, 0.05);
}

.screening-step-num {
  color: var(--screen-accent-step);
}

.screening-eyebrow {
  color: var(--screen-accent);
}

.screening-eyebrow--on-dark {
  color: var(--screen-accent-step);
}

.screening-after-card--sage {
  background: var(--screen-sage);
}

.screening-after-card--cream {
  background: var(--screen-cream);
}

.screening-after-num {
  background: var(--screen-accent);
}

.screening-protect-left {
  background: var(--screen-olive-protect);
}

.screening-protect-right {
  background: var(--screen-cream-pale);
}

.screening-medical-left {
  background: var(--screen-cream-pale);
}

.screening-medical-right {
  background: var(--screen-accent);
}

.screening-orange-pill {
  background: var(--screen-accent-pill);
  color: #ffffff;
}

.screening-testing-left {
  background: var(--screen-olive-testing);
}

.screening-testing-right {
  background: var(--screen-cream-soft);
}

.screening-help-left {
  background: var(--screen-cream-help);
}

.screening-help-right {
  background: var(--screen-accent-deep);
}

.screening-orange-pill--help {
  background: var(--screen-accent-pill-help);
}

.screening-faq-title {
  margin-bottom: 0;
  color: var(--yunda-petal);
}

.screening-faq-divider {
  height: 1px;
  width: 100%;
  background: color-mix(in srgb, var(--yunda-petal) 28%, transparent);
}
</style>

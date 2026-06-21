<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { buildCoreServicePageSchemas } from '~/utils/schema'

/**
 * 改版说明与素材：`修改/2026-05-27/journey页面改版`（含 docx）。
 * 静态文件：`public/images/journey/redesign/`。
 */
const PAGE_ASSETS = {
  heroScene: '/images/journey/redesign/hero-scene.png',
  processBadge: '/images/journey/redesign/screen-02-badge.png',
  stepIllustrations: [
    // 透明底 160px，源：journey页面改版/第三屏/ (1)~(8).png
    '/images/journey/redesign/screen-03-step-01.png',
    '/images/journey/redesign/screen-03-step-02.png',
    '/images/journey/redesign/screen-03-step-03.png',
    '/images/journey/redesign/screen-03-step-04.png',
    '/images/journey/redesign/screen-03-step-05.png',
    '/images/journey/redesign/screen-03-step-06.png',
    '/images/journey/redesign/screen-03-step-07.png',
    '/images/journey/redesign/screen-03-step-08.png',
  ],
  /**
   * 第四屏线稿（透明底 128px，源：journey页面改版/第四屏/）
   * - gestational ← …09_15_41 AM (2).png 抱婴
   * - traditional ← …09_15_41 AM (3).png 子宫
   * - takeaway    ← …09_15_40 AM (1).png 灯泡
   */
  dnaGestational: '/images/journey/redesign/screen-04-gestational.png',
  dnaTraditional: '/images/journey/redesign/screen-04-traditional.png',
  dnaTakeaway: '/images/journey/redesign/screen-04-takeaway.png',
  supportIcons: [
    '/images/journey/redesign/screen-05-support-1.png',
    '/images/journey/redesign/screen-05-support-2.png',
    '/images/journey/redesign/screen-05-support-3.png',
    '/images/journey/redesign/screen-05-support-4.png',
  ],
} as const

function stepIllustrationSrc(stepId: number) {
  return PAGE_ASSETS.stepIllustrations[stepId - 1] ?? PAGE_ASSETS.stepIllustrations[0]
}

function stepShortTitle(full: string) {
  return full.replace(/^Step\s+\d+\s*[—–-]\s*/i, '').replace(/^步骤\s*\d+\s*[—–-]\s*/, '').trim()
}

interface TextSeg {
  type: 'text' | 'link'
  text: string
  to?: string
}

interface StepDetail {
  id: number
  title: string
  you: TextSeg[]
  we: TextSeg[]
  outputs: TextSeg[]
}

interface CompareCard {
  title: string
  bullets: string[]
  icon: string
}

interface SupportCard {
  title: string
  body: string
}

interface FaqItem {
  q: string
  a: string
}

interface LocaleBlock {
  seoTitle: string
  seoDescription: string
  heroTitle: string
  heroSubtitle: string
  primaryCta: string
  secondaryCta: string
  heroImageAlt: string
  onPageItems: string[]
  processTitle: string
  processIntro: string
  processListLead: string
  processBullets: string[]
  stepsTitle: string
  stepsIntro: string
  stepsInfographicAlt: string
  stepAccordionLabel: string
  whatYouDoLabel: string
  whatWeDoLabel: string
  outputsLabel: string
  steps: StepDetail[]
  dnaTitle: string
  compareGestational: CompareCard
  compareTraditional: CompareCard
  dnaTakeawayLabel: string
  dnaTakeaway: string
  supportTitle: string
  supportCards: SupportCard[]
  faqTitle: string
  faqItems: FaqItem[]
  ctaTitle: string
  ctaBody: string
  ctaPrimary: string
}

const translations: Record<'en' | 'zh', LocaleBlock> = {
  en: {
    seoTitle: 'Surrogate Process Step by Step: From Application to Birth | Yunda Surrogacy',
    seoDescription:
      'See how the surrogate journey works—from application and screening to matching, embryo transfer, pregnancy, delivery, and postpartum support.',
    heroTitle: 'The Surrogate Process Step by Step: From Application to Birth',
    heroSubtitle:
      'See how the surrogate journey works—from application and screening to matching, embryo transfer, pregnancy, delivery, and postpartum support.',
    primaryCta: 'Surrogate Application',
    secondaryCta: 'View Process Steps',
    heroImageAlt: 'Pregnant surrogate journey support scene',
    onPageItems: [
      'How the journey begins and what happens first',
      'What to expect during screening and matching',
      'How transfer, pregnancy, and delivery are supported',
      'What postpartum care and follow-up can look like',
    ],
    processTitle: 'What Is the Surrogate Mother Process?',
    processIntro:
      'At Yunda Surrogacy, we guide each surrogate through the process with clear communication, professional coordination, and respectful support.',
    processListLead: 'A typical surrogate process includes:',
    processBullets: [
      'Application and Pre-Qualification',
      'Legal Agreements and Medical Clearance',
      'Medical, Psychological, and Background Screening',
      'Embryo Transfer and Pregnancy Support',
      'Matching With Intended Parents',
      'Birth and Postpartum Support',
    ],
    stepsTitle: 'Surrogacy Process Step by Step: 8 Key Stages for Surrogates',
    stepsIntro:
      'There are many surrogacy steps in between application and embryo transfer. Our goal is to ensure you understand what the process entails, and what you can expect during each milestone, as well as approximate timing. Remember, the surrogacy process is unique for everyone, so timing may not be exact for your journey.',
    stepsInfographicAlt: 'Eight illustrated stages of the surrogate journey',
    stepAccordionLabel: 'What happens in this step?',
    whatYouDoLabel: 'What You Do',
    whatWeDoLabel: 'What Yunda Does',
    outputsLabel: 'What You’ll Receive',
    steps: [
      {
        id: 1,
        title: 'Step 1 — Apply and Start the Conversation',
        you: [
          { type: 'text', text: 'Share your family-building goals, health background, pregnancy history, lifestyle, and reasons for becoming a surrogate (' },
          { type: 'link', text: 'start your application', to: '/be-surrogate?step=1' },
          { type: 'text', text: ').' },
        ],
        we: [
          { type: 'text', text: 'Our team reviews your information, answers your early questions, and helps you understand whether surrogacy is the right fit for you.' },
        ],
        outputs: [
          { type: 'text', text: 'A clear first step, basic guidance, and a better understanding of what comes next.' },
        ],
      },
      {
        id: 2,
        title: 'Step 2 — Complete Surrogate Screening',
        you: [
          { type: 'text', text: 'Complete medical, pregnancy history, psychological, background, insurance, and clinic-related ' },
          { type: 'link', text: 'screening', to: '/screening' },
          { type: 'text', text: ' steps.' },
        ],
        we: [
          { type: 'text', text: 'We help you stay organized, explain each requirement, and coordinate the screening process with care.' },
        ],
        outputs: [
          { type: 'text', text: 'A safer, clearer path forward before moving into the next stage of the surrogacy journey.' },
        ],
      },
      {
        id: 3,
        title: 'Step 3 — Match With Intended Parents',
        you: [
          { type: 'text', text: 'Review potential intended parent matches and decide whether the connection feels comfortable and respectful.' },
        ],
        we: [
          { type: 'text', text: 'We help guide the matching process, support communication, and make sure expectations are clear on both sides.' },
        ],
        outputs: [
          { type: 'text', text: 'A trusted match with intended parents who align with your comfort level, values, and journey expectations.' },
        ],
      },
      {
        id: 4,
        title: 'Step 4 — Complete Legal Agreements',
        you: [
          { type: 'text', text: 'Review and complete your surrogacy agreement with an independent legal professional.' },
        ],
        we: [
          { type: 'text', text: 'We help coordinate the legal timeline and keep communication clear between everyone involved.' },
        ],
        outputs: [
          { type: 'text', text: 'Clear expectations around rights, responsibilities, compensation, and important decisions before embryo transfer.' },
        ],
      },
      {
        id: 5,
        title: 'Step 5 — Prepare for Embryo Transfer',
        you: [
          { type: 'text', text: 'Follow your medication calendar, attend monitoring appointments, and complete clinic instructions before embryo transfer.' },
        ],
        we: [
          { type: 'text', text: 'We help keep the timeline organized and support communication with the ' },
          { type: 'link', text: 'fertility clinic', to: '/partner-ivf-clinics' },
          { type: 'text', text: ' and intended parents.' },
        ],
        outputs: [
          { type: 'text', text: 'A clear preparation plan before embryo transfer and support through each clinic requirement.' },
        ],
      },
      {
        id: 6,
        title: 'Step 6 — Complete the Embryo Transfer',
        you: [
          { type: 'text', text: 'Attend the embryo transfer appointment and complete follow-up testing as instructed by the fertility clinic.' },
        ],
        we: [
          { type: 'text', text: 'We help coordinate communication and support you through the transfer and follow-up process.' },
        ],
        outputs: [
          { type: 'text', text: 'A clearer understanding of the next steps and pregnancy confirmation after the transfer.' },
        ],
      },
      {
        id: 7,
        title: 'Step 7 — Continue the Surrogate Pregnancy',
        you: [
          { type: 'text', text: 'Attend prenatal visits, ultrasounds, medical appointments, and regular check-ins throughout pregnancy.' },
        ],
        we: [
          { type: 'text', text: 'We help support communication with the intended parents and stay connected with you during the journey.' },
        ],
        outputs: [
          { type: 'text', text: 'Steady coordination, appointment support, and a clearer sense of how the pregnancy is progressing.' },
        ],
      },
      {
        id: 8,
        title: 'Step 8 — Prepare for Birth and Postpartum Support',
        you: [
          { type: 'text', text: 'Prepare for delivery, follow your medical provider’s guidance, and stay connected with the care team.' },
        ],
        we: [
          { type: 'text', text: 'We help coordinate communication between you, the intended parents, medical providers, and the hospital team.' },
        ],
        outputs: [
          { type: 'text', text: 'Continued support through birth, postpartum recovery, and journey wrap-up.' },
        ],
      },
    ],
    dnaTitle: 'Does a Surrogate Share DNA With the Baby?',
    compareGestational: {
      title: 'Gestational Carrier',
      bullets: [
        'No genetic link to the baby',
        'Embryo created with intended parents’ (or donor’s)',
        'Most common type of surrogacy today',
      ],
      icon: PAGE_ASSETS.dnaGestational,
    },
    compareTraditional: {
      title: 'Traditional Surrogate',
      bullets: [
        'Uses the surrogate’s own eggs',
        'Genetically related to the baby',
        'Less common today',
      ],
      icon: PAGE_ASSETS.dnaTraditional,
    },
    dnaTakeawayLabel: 'Key takeaway:',
    dnaTakeaway: 'Most modern journeys are gestational surrogacy: no genetic link from surrogate to baby.',
    supportTitle: 'Support Throughout the Surrogate Journey',
    supportCards: [
      {
        title: 'Clear Guidance',
        body: 'We help create clear, respectful communication between you and the intended parents.',
      },
      {
        title: 'Reimbursements & Allowances',
        body: 'You receive reimbursements for approved expenses and compensation as outlined in your legal agreement.',
      },
      {
        title: 'Postpartum Recovery',
        body: 'Your recovery matters. We provide resources and support as you heal and transition into the next chapter.',
      },
      {
        title: 'Your Well-Being Comes First',
        body: 'Physical, emotional, and mental well-being are always a priority at Yunda Surrogacy.',
      },
    ],
    faqTitle: 'Frequently Asked Questions',
    faqItems: [
      {
        q: 'How does the surrogate process work?',
        a: 'The surrogate process works through a clear step-by-step journey. You apply, complete screening, match with intended parents, finish legal agreements, prepare for embryo transfer, carry the pregnancy, and receive support through birth and postpartum recovery. Yunda Surrogacy helps coordinate each stage so you know what comes next.',
      },
      {
        q: 'What is the process of being a surrogate mother?',
        a: 'The process of being a surrogate mother usually includes application, medical and psychological screening, matching, legal clearance, embryo transfer, surrogate pregnancy, delivery, and postpartum support. Each step helps protect your health, clarify expectations, and create a safer journey for you and the intended parents.',
      },
      {
        q: 'How does a surrogate get pregnant?',
        a: 'A surrogate becomes pregnant through embryo transfer at a fertility clinic. In gestational surrogacy, the embryo is created through IVF and transferred into the surrogate’s uterus. The fertility clinic manages the medical preparation, transfer procedure, and early pregnancy testing.',
      },
      {
        q: 'What happens during the surrogate pregnancy process?',
        a: 'During the surrogate pregnancy process, you attend prenatal appointments, ultrasounds, medical check-ins, and pregnancy milestone visits. Yunda helps support communication with the intended parents and coordinates important updates so the journey feels organized and supported.',
      },
      {
        q: 'What happens during surrogate labor and birth?',
        a: 'As delivery gets closer, Yunda helps coordinate the surrogate birth process with you, the intended parents, medical providers, and the hospital team. A birth plan helps everyone understand expectations for labor, delivery, and the first moments after birth.',
      },
      {
        q: 'How long does the surrogate mother process take?',
        a: 'The surrogate mother process timeline can vary based on screening, matching, legal clearance, clinic schedules, embryo transfer timing, and pregnancy. In general, the full surrogate journey may take more than a year from application to birth and postpartum follow-up.',
      },
      {
        q: 'What support do surrogate mothers receive?',
        a: 'Surrogate mothers receive support with process guidance, clinic coordination, legal timing, appointment reminders, intended parent communication, pregnancy updates, birth planning, and postpartum follow-up. Yunda Surrogacy provides end-to-end surrogacy coordination so you do not have to manage the journey alone.',
      },
      {
        q: 'What is the next step after contacting a surrogacy agency?',
        a: 'After contacting a surrogacy agency, the next step is usually a conversation or application review. Yunda will learn more about your health history, pregnancy background, and goals, then explain whether the surrogate process may be a good fit for you.',
      },
    ],
    ctaTitle: 'Ready to Take the First Step?',
    ctaBody: 'We’re here to guide you with care, clarity, and respect.',
    ctaPrimary: 'Apply to Become a Surrogate',
  },
  zh: {
    seoTitle: '代孕流程分步指南：从申请到分娩 | Yunda',
    seoDescription:
      '了解代孕妈妈旅程如何运作——从申请与筛查到匹配、胚胎移植、孕期、分娩与产后支持。',
    heroTitle: '代孕流程分步指南：从申请到分娩',
    heroSubtitle:
      '我们将说明代孕妈妈旅程如何运作——从申请与筛查到匹配、胚胎移植、孕期、分娩与产后支持。',
    primaryCta: '代孕申请',
    secondaryCta: '查看流程步骤',
    heroImageAlt: '代孕旅程支持场景照片',
    onPageItems: [
      '旅程如何开始，以及第一步是什么',
      '筛查与匹配阶段通常会经历什么',
      '移植、孕期与分娩如何被支持',
      '产后支持与随访通常如何安排',
    ],
    processTitle: '什么是代孕妈妈流程？',
    processIntro:
      '在 Yunda，我们以清晰沟通、专业协调和尊重支持，陪伴每位代孕妈妈完成整个流程。',
    processListLead: '典型的代孕流程包括：',
    processBullets: [
      '申请与预评估',
      '法律协议与医疗合格',
      '医学、心理与背景筛查',
      '胚胎移植与孕期支持',
      '与意向父母匹配',
      '分娩与产后支持',
    ],
    stepsTitle: '代孕流程分步说明：代孕妈妈的 8 个关键阶段',
    stepsIntro:
      '从申请到胚胎移植之间还有许多步骤。我们的目标是让你清楚了解流程内容、每个里程碑的预期，以及大致时间安排。请记住，每位代孕妈妈的旅程都是独特的，具体时间可能因人而异。',
    stepsInfographicAlt: '代孕旅程八个阶段插画',
    stepAccordionLabel: '这一步会发生什么？',
    whatYouDoLabel: '你需要做什么',
    whatWeDoLabel: 'Yunda 会做什么',
    outputsLabel: '你将获得什么',
    steps: [
      {
        id: 1,
        title: '步骤 1 — 提交申请并开始沟通',
        you: [
          { type: 'text', text: '分享你的家庭愿景、健康背景、妊娠史、生活方式以及成为代孕妈妈的动机（' },
          { type: 'link', text: '开始申请', to: '/be-surrogate?step=1' },
          { type: 'text', text: '）。' },
        ],
        we: [
          { type: 'text', text: '团队会审核你的信息、解答早期问题，并帮助你判断代孕是否适合你。' },
        ],
        outputs: [
          { type: 'text', text: '清晰的第一步、基础指引，以及对后续流程的更好理解。' },
        ],
      },
      {
        id: 2,
        title: '步骤 2 — 完成代孕筛查',
        you: [
          { type: 'text', text: '完成医学、妊娠史、心理、背景、保险及诊所相关的' },
          { type: 'link', text: '筛查', to: '/screening' },
          { type: 'text', text: '步骤。' },
        ],
        we: [
          { type: 'text', text: '我们帮助你保持条理、解释每项要求，并以细致方式协调筛查流程。' },
        ],
        outputs: [
          { type: 'text', text: '在进入下一阶段前，更安全、更清晰的推进路径。' },
        ],
      },
      {
        id: 3,
        title: '步骤 3 — 与意向父母匹配',
        you: [
          { type: 'text', text: '了解潜在意向父母匹配方案，并判断彼此是否舒适、尊重且合拍。' },
        ],
        we: [
          { type: 'text', text: '我们协助匹配流程、支持沟通，并确保双方预期清晰一致。' },
        ],
        outputs: [
          { type: 'text', text: '与你在舒适度、价值观和旅程预期上契合的可信匹配。' },
        ],
      },
      {
        id: 4,
        title: '步骤 4 — 完成法律协议',
        you: [
          { type: 'text', text: '在独立法律专业人士协助下审阅并完成代孕协议。' },
        ],
        we: [
          { type: 'text', text: '我们协助协调法律时间线，并保持各方沟通清晰顺畅。' },
        ],
        outputs: [
          { type: 'text', text: '在胚胎移植前，对权利、责任、补偿与重要决策有清晰预期。' },
        ],
      },
      {
        id: 5,
        title: '步骤 5 — 准备胚胎移植',
        you: [
          { type: 'text', text: '遵循用药计划、参加监测预约，并在移植前完成诊所要求。' },
        ],
        we: [
          { type: 'text', text: '我们协助保持时间线有序，并支持与' },
          { type: 'link', text: '生殖诊所', to: '/partner-ivf-clinics' },
          { type: 'text', text: '及意向父母的沟通。' },
        ],
        outputs: [
          { type: 'text', text: '移植前的清晰准备计划，以及每项诊所要求的支持。' },
        ],
      },
      {
        id: 6,
        title: '步骤 6 — 完成胚胎移植',
        you: [
          { type: 'text', text: '参加胚胎移植预约，并按诊所指示完成后续检测。' },
        ],
        we: [
          { type: 'text', text: '我们协助协调沟通，并在移植与随访过程中提供支持。' },
        ],
        outputs: [
          { type: 'text', text: '对后续步骤及移植后妊娠确认的更清晰理解。' },
        ],
      },
      {
        id: 7,
        title: '步骤 7 — 继续代孕妊娠',
        you: [
          { type: 'text', text: '参加产检、超声、医疗预约，并在整个孕期保持定期沟通。' },
        ],
        we: [
          { type: 'text', text: '我们支持与意向父母的沟通，并在旅程中与你保持联系。' },
        ],
        outputs: [
          { type: 'text', text: '稳定的协调支持、预约协助，以及对妊娠进展的清晰感知。' },
        ],
      },
      {
        id: 8,
        title: '步骤 8 — 准备分娩与产后支持',
        you: [
          { type: 'text', text: '为分娩做准备，遵循医疗团队指导，并与照护团队保持联系。' },
        ],
        we: [
          { type: 'text', text: '我们协助协调你、意向父母、医疗团队与医院之间的沟通。' },
        ],
        outputs: [
          { type: 'text', text: '贯穿分娩、产后恢复与旅程收尾的持续支持。' },
        ],
      },
    ],
    dnaTitle: '代母会与宝宝共享 DNA 吗？',
    compareGestational: {
      title: '妊娠代母（Gestational Carrier）',
      bullets: [
        '与宝宝没有遗传关联',
        '胚胎由意向父母（或捐赠方）的卵子与精子形成',
        '当今最常见的代孕类型',
      ],
      icon: PAGE_ASSETS.dnaGestational,
    },
    compareTraditional: {
      title: '传统代母（Traditional Surrogate）',
      bullets: [
        '使用代母自己的卵子',
        '与宝宝存在遗传关联',
        '如今较为少见',
      ],
      icon: PAGE_ASSETS.dnaTraditional,
    },
    dnaTakeawayLabel: '要点：',
    dnaTakeaway: '大多数现代旅程属于妊娠代孕：代母与宝宝通常没有遗传关联。',
    supportTitle: '贯穿代孕旅程的支持',
    supportCards: [
      {
        title: '清晰指引',
        body: '我们帮助你与意向父母建立清晰、尊重的沟通方式。',
      },
      {
        title: '报销与补贴',
        body: '根据法律协议，你可获得获批费用的报销以及相应补偿安排。',
      },
      {
        title: '产后恢复',
        body: '你的恢复很重要。我们在你疗愈并进入下一阶段时提供资源与支持。',
      },
      {
        title: '你的身心健康优先',
        body: '在 Yunda，身体、情绪与心理健康始终是首要考量。',
      },
    ],
    faqTitle: '常见问题',
    faqItems: [
      {
        q: '代孕流程是如何运作的？',
        a: '代孕流程是一条清晰的分步旅程：申请、完成筛查、与意向父母匹配、完成法律协议、准备胚胎移植、承载妊娠，并在分娩与产后恢复中获得支持。Yunda 协调每个阶段，让你清楚知道下一步是什么。',
      },
      {
        q: '成为代孕妈妈的流程是什么？',
        a: '成为代孕妈妈的流程通常包括申请、医学与心理筛查、匹配、法律合格、胚胎移植、代孕妊娠、分娩与产后支持。每一步都有助于保护你的健康、明确预期，并为你与意向父母创造更安全的旅程。',
      },
      {
        q: '代母是如何怀孕的？',
        a: '代母通过生殖诊所的胚胎移植怀孕。在妊娠代孕中，胚胎由 IVF 形成并移植到代母子宫。诊所负责医学准备、移植程序及早期妊娠检测。',
      },
      {
        q: '代孕妊娠过程中会发生什么？',
        a: '在代孕妊娠过程中，你会参加产检、超声、医疗随访与里程碑检查。Yunda 支持你与意向父母的沟通，并协调重要进展，让旅程更有序、更被支持。',
      },
      {
        q: '代母分娩过程中会发生什么？',
        a: '临近分娩时，Yunda 会协助协调你、意向父母、医疗团队与医院之间的分娩安排。分娩计划帮助所有人理解临产、分娩及产后最初阶段的预期。',
      },
      {
        q: '整个代母流程需要多久？',
        a: '时间线会因筛查、匹配、法律合格、诊所排期、移植时机与妊娠而有所不同。一般而言，从申请到分娩及产后随访，完整旅程可能超过一年。',
      },
      {
        q: '代孕妈妈会获得哪些支持？',
        a: '代孕妈妈会获得流程指引、诊所协调、法律时间线、预约提醒、与意向父母沟通、妊娠更新、分娩规划及产后随访等支持。Yunda 提供端到端协调，你无需独自应对整个旅程。',
      },
      {
        q: '联系代孕机构后的下一步是什么？',
        a: '联系代孕机构后，下一步通常是沟通或申请审核。Yunda 会了解你的健康史、妊娠背景与目标，并说明代孕流程是否可能适合你。',
      },
    ],
    ctaTitle: '准备好迈出第一步了吗？',
    ctaBody: '我们以关怀、清晰与尊重，陪伴你开启这段旅程。',
    ctaPrimary: '申请成为代孕妈妈',
  },
}

const { locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const c = computed(() => ((locale.value || '').startsWith('zh') ? translations.zh : translations.en))
const pagePath = '/journey'

const stepsTimelineRows = computed(() => {
  const items = c.value.steps
  return [items.slice(0, 4), items.slice(4, 8)]
})

/** 第二屏列表：按设计稿双列纵向阅读（左列 1/3/5，右列 2/4/6） */
const processBulletColumns = computed(() => {
  const items = c.value.processBullets
  return [
    [items[0], items[2], items[4]].filter(Boolean),
    [items[1], items[3], items[5]].filter(Boolean),
  ]
})

/** 第六屏 FAQ：按设计稿双列纵向阅读（左列 1/3/5/7，右列 2/4/6/8） */
const faqColumns = computed(() => {
  const items = c.value.faqItems
  return [
    [items[0], items[2], items[4], items[6]].filter(Boolean),
    [items[1], items[3], items[5], items[7]].filter(Boolean),
  ]
})

const schemaJourneySteps = computed(() =>
  c.value.steps.map(step => ({
    position: step.id,
    name: step.title.replace(/^Step\s+\d+\s*[—–-]\s*|^步骤\s*\d+\s*[—–-]\s*/, '').trim(),
    description: step.outputs.map(seg => seg.text).join(''),
    url: `${pagePath}#journey-step-${step.id}`,
  })),
)

const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: c.value.heroTitle,
  description: c.value.seoDescription,
  about: 'Gestational carrier journey and surrogate process',
  audience: 'Gestational carriers / surrogates',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  service: {
    name: 'Gestational Carrier Journey Support',
    serviceType: 'Gestational carrier process coordination',
    areaServed: ['California', 'United States'],
    audience: 'Gestational carriers / surrogates',
    description: 'Support for gestational carriers through application, screening, matching, legal contract review, embryo transfer, pregnancy care, delivery coordination, and postpartum follow-up.',
  },
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'For Surrogates', url: '/surrogates' },
    { name: 'Surrogate Journey', url: pagePath },
  ],
  faqs: c.value.faqItems.map(item => ({
    question: item.q,
    answer: item.a,
  })),
  itemList: {
    name: '8-Step Surrogate Journey',
    description: c.value.stepsIntro,
    items: schemaJourneySteps.value,
  },
}))

useHead(() => ({
  title: c.value.seoTitle,
  meta: [{ name: 'description', content: c.value.seoDescription }],
}))

useHead(() => ({
  script: coreServicePageSchemas.value.map((schema, index) => ({
    key: `schema-journey-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div class="bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />
    <main>
      <!-- 第一屏（对照 docx image1：左文案+勾选列表+双 CTA；右实景+「8 Guided Stages」角标） -->
      <section class="relative isolate w-full overflow-hidden bg-[var(--yunda-petal)] pb-14 pt-24 lg:pb-20 lg:pt-28">
        <div class="relative mx-auto max-w-[1760px] px-6 lg:px-16">
          <div class="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div class="max-w-[780px]">
              <h1 class="font-display text-[38px] font-semibold leading-[1.1] lg:text-[50px]">
                {{ c.heroTitle }}
              </h1>
              <p class="mt-4 text-base text-[var(--yunda-bark)]/90 leading-[1.75] lg:mt-5 lg:text-[18px]" style="font-family: var(--font-text)">
                {{ c.heroSubtitle }}
              </p>
              <ul class="mt-6 list-none space-y-3 lg:mt-7" style="font-family: var(--font-text)">
                <li
                  v-for="(item, index) in c.onPageItems"
                  :key="`journey-onpage-${index}`"
                  class="flex items-start gap-3 text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[17px]"
                >
                  <Icon name="radix-icons:check-circled" class="mt-0.5 h-5 w-5 shrink-0 text-[var(--yunda-maple)]" />
                  <span>{{ item }}</span>
                </li>
              </ul>
              <div class="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                <NuxtLink
                  :to="localePath('/be-surrogate')"
                  class="yunda-type-button inline-flex min-h-[56px] w-full items-center justify-center rounded-[6px] bg-[var(--yunda-bark)] px-8 py-3.5 text-[var(--yunda-petal)] tracking-[0.02em] shadow-sm transition-opacity hover:opacity-95 sm:min-w-[240px] sm:w-auto"
                  style="font-family: var(--font-text)"
                >
                  {{ c.primaryCta }}
                </NuxtLink>
                <a
                  href="#journey-step-1"
                  class="yunda-type-button inline-flex min-h-[56px] w-full items-center justify-center border-2 border-[var(--yunda-bark)] rounded-[6px] bg-white px-8 py-3.5 text-[var(--yunda-bark)] tracking-[0.02em] transition-colors hover:border-[var(--yunda-maple)] hover:bg-[color-mix(in_srgb,var(--yunda-maple)_14%,var(--yunda-petal)_86%)] sm:min-w-[240px] sm:w-auto"
                  style="font-family: var(--font-text)"
                >
                  {{ c.secondaryCta }}
                </a>
              </div>
            </div>
            <div class="flex items-center justify-center lg:justify-end">
              <div class="relative max-w-[540px] w-full">
                <img
                  :src="PAGE_ASSETS.heroScene"
                  :alt="c.heroImageAlt"
                  width="540"
                  height="420"
                  class="aspect-[4/3] w-full rounded-[20px] object-cover object-center shadow-[0_16px_40px_rgba(60,36,21,0.12)]"
                  loading="eager"
                  decoding="async"
                >
                <img
                  :src="PAGE_ASSETS.processBadge"
                  alt=""
                  class="absolute bottom-4 right-4 w-[min(38%,168px)] rounded-[14px] object-contain shadow-[0_8px_24px_rgba(60,36,21,0.1)] sm:bottom-6 sm:right-6"
                  width="168"
                  height="168"
                  loading="eager"
                  decoding="async"
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第二屏（对照 docx image2：左标题+导语；右双列纵向列表） -->
      <section class="w-full bg-white py-14 lg:py-20">
        <div class="mx-auto max-w-[1280px] w-full px-6 lg:px-10">
          <div class="grid gap-10 lg:grid-cols-[minmax(0,0.46fr)_minmax(0,0.54fr)] lg:items-start lg:gap-x-12 xl:gap-x-16">
            <div class="lg:max-w-[520px]">
              <h2 class="font-display text-[32px] font-semibold leading-[1.12] lg:text-[38px]">
                {{ c.processTitle }}
              </h2>
              <p class="mt-5 text-[17px] text-[var(--yunda-bark)]/88 leading-[1.8] lg:mt-6 lg:text-[18px]" style="font-family: var(--font-text)">
                {{ c.processIntro }}
              </p>
            </div>
            <div class="lg:pt-0.5">
              <p class="font-display text-[20px] font-medium leading-[1.2] lg:text-[22px]">
                {{ c.processListLead }}
              </p>
              <div class="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-x-10 lg:gap-x-12">
                <ul
                  v-for="(column, colIndex) in processBulletColumns"
                  :key="`process-col-${colIndex}`"
                  class="m-0 list-none space-y-5 p-0"
                >
                  <li
                    v-for="(item, rowIndex) in column"
                    :key="`process-bullet-${colIndex}-${rowIndex}`"
                    class="flex items-start gap-3.5"
                  >
                    <span class="mt-0.5 h-8 w-8 flex shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--yunda-harvest)_82%,var(--yunda-maple)_18%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]">
                      <Icon name="radix-icons:check" class="h-[18px] w-[18px] text-[var(--yunda-petal)]" />
                    </span>
                    <span class="pt-0.5 text-[16px] text-[var(--yunda-bark)] leading-[1.65] lg:text-[17px]" style="font-family: var(--font-text)">
                      {{ item }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第三屏（对照 docx image3：2×4 时间轴 + 手风琴详情） -->
      <section class="relative isolate w-full overflow-hidden bg-[color-mix(in_srgb,var(--yunda-petal)_90%,var(--yunda-sky)_10%)] py-14 lg:py-20">
        <div class="mx-auto max-w-[1320px] px-6 lg:px-10">
          <div class="mx-auto max-w-4xl text-center">
            <h2 class="font-display text-[30px] font-semibold leading-[1.12] lg:text-[36px]">
              {{ c.stepsTitle }}
            </h2>
            <p class="mt-5 text-base text-[var(--yunda-bark)]/88 leading-[1.8] lg:text-[17px]" style="font-family: var(--font-text)">
              {{ c.stepsIntro }}
            </p>
          </div>
          <p class="sr-only">
            {{ c.stepsInfographicAlt }}
          </p>

          <div class="mt-12 space-y-12 lg:mt-14 lg:space-y-14">
            <div
              v-for="(rowSteps, rowIndex) in stepsTimelineRows"
              :key="`steps-row-${rowIndex}`"
              class="grid grid-cols-1 items-stretch gap-10 sm:grid-cols-2 sm:gap-x-5 lg:grid-cols-4 lg:gap-x-3"
            >
              <div
                v-for="(step, stepIndex) in rowSteps"
                :id="`journey-step-${step.id}`"
                :key="`journey-step-${step.id}`"
                class="journey-step-tile scroll-mt-28 relative mx-auto flex h-full w-full max-w-[300px] flex-col items-center text-center sm:max-w-none lg:mx-0"
                :class="{ 'journey-step-tile--connector': stepIndex < rowSteps.length - 1 }"
              >
                  <span class="font-display inline-flex h-8 w-8 items-center justify-center rounded-full bg-[var(--yunda-maple)] text-sm text-[var(--yunda-petal)] font-semibold">
                    {{ step.id }}
                  </span>

                  <div class="relative mt-3 h-[108px] w-[108px] flex items-center justify-center rounded-full border-2 border-[color-mix(in_srgb,var(--yunda-harvest)_70%,var(--yunda-bark)_30%)] bg-[var(--yunda-petal)] p-4 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.65)] sm:h-[116px] sm:w-[116px]">
                    <img
                      :src="stepIllustrationSrc(step.id)"
                      :alt="`${c.stepsInfographicAlt} — ${stepShortTitle(step.title)}`"
                      class="max-h-full max-w-full object-contain"
                      width="88"
                      height="88"
                      loading="lazy"
                      decoding="async"
                    >
                  </div>

                  <h3 class="mt-4 px-1 text-[15px] font-bold leading-snug sm:text-[16px] lg:min-h-[2.75rem] lg:text-[17px]" style="font-family: var(--font-text)">
                    {{ stepShortTitle(step.title) }}
                  </h3>

                  <details class="journey-step-details group mt-4 w-full border border-[#e0dbd4] rounded-xl bg-[#faf8f5] text-left shadow-[0_2px_10px_rgba(60,36,21,0.04)]">
                    <summary class="flex shrink-0 cursor-pointer list-none items-center gap-2.5 px-3 py-2.5 text-left text-sm text-[var(--yunda-bark)] leading-snug marker:content-none sm:px-3.5" style="font-family: var(--font-text)">
                      <span class="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--yunda-maple)_18%,var(--yunda-petal)_82%)] text-xs text-[var(--yunda-maple)] font-bold">
                        ?
                      </span>
                      <span class="min-w-0 flex-1">{{ c.stepAccordionLabel }}</span>
                      <span class="shrink-0 text-lg text-[var(--yunda-maple)] leading-none transition-transform duration-200 group-open:rotate-45">+</span>
                    </summary>
                    <div class="journey-step-details-body space-y-3.5 border-t border-[#e8e3dc] bg-white px-3.5 py-3.5 sm:px-4 sm:py-4">
                      <div
                        v-for="row in ([
                          { key: 'you', label: c.whatYouDoLabel, segments: step.you },
                          { key: 'we', label: c.whatWeDoLabel, segments: step.we },
                          { key: 'out', label: c.outputsLabel, segments: step.outputs },
                        ] as const)"
                        :key="`${step.id}-detail-${row.key}`"
                      >
                        <p class="text-xs text-[var(--yunda-bark)] font-bold tracking-wide uppercase" style="font-family: var(--font-text)">
                          {{ row.label }}
                        </p>
                        <p class="mt-1 text-sm text-[var(--yunda-bark)]/88 leading-[1.7]" style="font-family: var(--font-text)">
                          <template v-for="(seg, segIndex) in row.segments" :key="`${step.id}-${row.key}-${segIndex}`">
                            <NuxtLink
                              v-if="seg.type === 'link'"
                              :to="localePath(seg.to || '/')"
                              class="text-[var(--yunda-maple)] underline decoration-[var(--yunda-maple)]/50 underline-offset-2 hover:text-[var(--yunda-bark)]"
                            >
                              {{ seg.text }}
                            </NuxtLink>
                            <template v-else>
                              {{ seg.text }}
                            </template>
                          </template>
                        </p>
                      </div>
                    </div>
                  </details>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 第四屏（对照 docx image5：Sage 底、双卡 VS、Harvest 要点条） -->
      <section class="w-full bg-[var(--yunda-sky)] py-14 lg:py-20">
        <div class="mx-auto max-w-[1200px] px-6 lg:px-10">
          <h2 class="text-center font-display text-[30px] font-semibold leading-[1.12] text-[var(--yunda-bark)] lg:text-[38px]">
            {{ c.dnaTitle }}
          </h2>

          <div class="relative mt-10 lg:mt-12">
            <div class="grid gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-8 xl:gap-10">
              <article
                v-for="card in [c.compareGestational, c.compareTraditional]"
                :key="card.title"
                class="flex h-full items-start gap-5 rounded-[20px] bg-[var(--yunda-petal)] px-6 py-7 sm:gap-6 sm:px-7 sm:py-8 lg:gap-7 lg:px-8 lg:py-9"
              >
                <img
                  :src="card.icon"
                  alt=""
                  class="journey-dna-card-icon h-[88px] w-[88px] shrink-0 object-contain sm:h-[96px] sm:w-[96px] lg:h-[104px] lg:w-[104px]"
                  width="104"
                  height="104"
                  loading="lazy"
                  decoding="async"
                >
                <div class="min-w-0 flex-1 pt-1 text-left">
                  <h3 class="font-display text-[22px] font-semibold leading-snug text-[var(--yunda-bark)] lg:text-[26px]">
                    {{ card.title }}
                  </h3>
                  <ul class="mt-4 list-disc space-y-2.5 pl-5 marker:text-[var(--yunda-harvest)]">
                    <li
                      v-for="(bullet, bi) in card.bullets"
                      :key="`${card.title}-${bi}`"
                      class="pl-0.5 text-[15px] text-[var(--yunda-bark)] leading-[1.7] lg:text-[16px]"
                      style="font-family: var(--font-text)"
                    >
                      {{ bullet }}
                    </li>
                  </ul>
                </div>
              </article>
            </div>
            <span
              class="pointer-events-none absolute left-1/2 top-1/2 z-10 hidden h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--yunda-bark)] text-xs text-[var(--yunda-petal)] font-bold tracking-[0.14em] sm:flex sm:h-11 sm:w-11 sm:text-sm"
              style="font-family: var(--font-text)"
              aria-hidden="true"
            >
              VS
            </span>
          </div>

          <div class="relative mx-auto mt-8 flex max-w-[960px] items-center gap-4 rounded-[16px] bg-[var(--yunda-harvest)] px-5 py-4 sm:gap-5 sm:px-7 sm:py-5 lg:mt-10 lg:px-8">
            <img
              :src="PAGE_ASSETS.dnaTakeaway"
              alt=""
              class="journey-dna-takeaway-icon h-9 w-9 shrink-0 object-contain sm:h-10 sm:w-10"
              width="40"
              height="40"
              loading="lazy"
              decoding="async"
            >
            <p class="flex-1 text-center font-display text-[16px] text-[var(--yunda-bark)] leading-[1.65] sm:text-[17px] lg:text-[18px]">
              <span class="font-semibold">{{ c.dnaTakeawayLabel }}</span>
              {{ c.dnaTakeaway }}
            </p>
          </div>
        </div>
      </section>

      <!-- 第五屏（对照 docx image6：横向四列 + 竖分割线） -->
      <section class="w-full bg-white py-14 lg:py-20">
        <div class="mx-auto max-w-[1320px] px-6 lg:px-10">
          <h2 class="text-center font-display text-[30px] font-semibold leading-[1.12] text-[var(--yunda-bark)] lg:text-[37px]">
            {{ c.supportTitle }}
          </h2>
          <div class="mx-auto mt-10 grid max-w-[1200px] gap-y-5 sm:grid-cols-2 sm:gap-x-8 lg:mt-11 lg:grid-cols-4 lg:gap-x-0">
            <article
              v-for="(card, index) in c.supportCards"
              :key="card.title"
              class="journey-support-item relative flex h-full items-start gap-3.5 px-0 py-1 sm:px-1 lg:gap-4 lg:px-5 lg:py-0"
            >
              <img
                :src="PAGE_ASSETS.supportIcons[index]"
                alt=""
                class="h-[44px] w-[44px] shrink-0 object-contain lg:h-[46px] lg:w-[46px]"
                width="46"
                height="46"
                loading="lazy"
                decoding="async"
              >
              <div class="min-w-0 flex-1">
                <h3 class="font-display text-[23px] font-semibold leading-[1.1] text-[var(--yunda-bark)] lg:text-[24px]">
                  {{ card.title }}
                </h3>
                <p class="mt-1.5 text-[15px] text-[var(--yunda-bark)]/88 leading-[1.62] lg:mt-2 lg:text-[16px]" style="font-family: var(--font-text)">
                  {{ card.body }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- 第六屏 FAQ（对照 docx image7：白底、双列问答条、右侧 +） -->
      <section class="w-full bg-white py-14 lg:py-20">
        <div class="mx-auto max-w-[1320px] px-6 lg:px-10">
          <h2 class="text-center font-display text-[30px] font-semibold leading-[1.12] lg:text-[38px]">
            {{ c.faqTitle }}
          </h2>
          <div class="mx-auto mt-8 grid max-w-[1280px] gap-5 lg:mt-10 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-3">
            <div
              v-for="(column, colIndex) in faqColumns"
              :key="`faq-col-${colIndex}`"
              class="space-y-3"
            >
              <details
                v-for="item in column"
                :key="item.q"
                class="group overflow-hidden rounded-[8px] border border-[color-mix(in_srgb,var(--yunda-maple)_48%,white_52%)] bg-[var(--yunda-petal)]"
              >
                <summary
                  class="flex cursor-pointer list-none items-center gap-3 px-4 py-2.5 text-left leading-[1.35] marker:content-none lg:px-4.5 lg:py-2.5"
                  style="font-family: var(--font-text)"
                >
                  <span class="min-w-0 flex-1 text-[14px] font-semibold text-[var(--yunda-bark)] sm:text-[15px] lg:text-[16px]">
                    {{ item.q }}
                  </span>
                  <span class="shrink-0 text-[24px] text-[var(--yunda-bark)]/90 leading-none transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p class="border-t border-[color-mix(in_srgb,var(--yunda-maple)_35%,white_65%)] bg-white px-4 py-3 text-[15px] text-[var(--yunda-bark)]/84 leading-[1.7] lg:text-[16px]" style="font-family: var(--font-text)">
                  {{ item.a }}
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <!-- 第七屏 CTA -->
      <section class="w-full bg-[var(--yunda-maple)] py-14 lg:py-20">
        <div class="mx-auto max-w-[900px] px-6 text-center lg:px-8">
          <h2 class="font-display text-[30px] font-semibold leading-[1.12] text-white lg:text-[42px]">
            {{ c.ctaTitle }}
          </h2>
          <p class="mx-auto mt-3 max-w-2xl text-base leading-[1.7] text-white/90 lg:text-[17px]" style="font-family: var(--font-text)">
            {{ c.ctaBody }}
          </p>
          <NuxtLink
            :to="localePath('/be-surrogate')"
            class="mt-8 inline-flex items-center justify-center rounded-[6px] border border-white/35 bg-[var(--yunda-petal)] px-8 py-3 text-[var(--yunda-bark)] shadow-sm transition-opacity hover:opacity-95"
            style="font-family: var(--font-text)"
          >
            {{ c.ctaPrimary }}
          </NuxtLink>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.journey-dna-takeaway-icon {
  filter: brightness(0) invert(1);
}

@media (min-width: 1024px) {
  .journey-support-item:not(:last-child)::after {
    content: '';
    position: absolute;
    right: -0.125rem;
    top: 0.25rem;
    bottom: 0.25rem;
    width: 1px;
    background: color-mix(in srgb, var(--yunda-harvest) 58%, transparent);
    pointer-events: none;
  }
}

/* 同行步骤卡展开后底部详情区等高（Grid 拉齐列高 + details 区域 flex 撑满） */
@media (min-width: 640px) {
  .journey-step-details {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    min-height: 0;
    width: 100%;
  }

  .journey-step-details-body {
    flex: 1 1 auto;
  }
}

@media (min-width: 1024px) {
  .journey-step-tile--connector::after {
    content: '';
    position: absolute;
    top: 3.65rem;
    left: calc(50% + 3.75rem);
    width: calc(50% - 3.75rem + 0.65rem);
    height: 1px;
    background: color-mix(in srgb, var(--yunda-harvest) 55%, transparent);
    pointer-events: none;
  }

  .journey-step-tile--connector::before {
    content: '';
    position: absolute;
    top: calc(3.65rem - 3px);
    left: calc(100% - 0.35rem);
    width: 7px;
    height: 7px;
    border-radius: 9999px;
    background: var(--yunda-harvest);
    pointer-events: none;
  }
}
</style>

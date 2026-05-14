<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'

/**
 * 改版说明与素材：`修改/2026-05-09/surrogacy-process页面改版`（含 docx）。
 * 静态文件统一放在 `public/images/process/redesign/`。
 *
 * `修改/2026-05-09/期望的结果样式` 为**原型图**，用来对齐版式；第二屏左侧主图使用改版目录 `第二屏.png`（见 `screen-02-timeline.png`）。
 */
const PAGE_ASSETS = {
  /** 同改版目录 `第一屏.png`，竖版实景 */
  heroScene: '/images/process/redesign/hero-scene.png',
  /** 改版目录 `第二屏.png`：8 步蜿蜒插画长图，置于第二屏左侧 */
  stepsTimelineIllustration: '/images/process/redesign/screen-02-timeline.png',
  /** 改版 `第六屏.png`（CTA 条右侧主图） */
  ctaBandPhoto: '/images/process/redesign/screen-06-cta.png',
  stickyFourth: '/images/process/redesign/screen-sticky-4.png',
} as const

/** 与期望稿第一屏一致：步骤 1/4/7 深棕，2/5/8 橄榄绿，3/6 橙 */
function timelineBadgeClass(index: number) {
  const step = index + 1
  if (step === 1 || step === 4 || step === 7)
    return 'bg-[#3d2b1f] text-white'
  if (step === 2 || step === 5 || step === 8)
    return 'bg-[#8a9b7d] text-white'
  return 'bg-[#c68653] text-white'
}

const { locale } = useI18n()
const localePath = useLocalePath()

/** 第二屏右侧卡头：英文 `Step 1 — Title | duration`；中文 `步骤 1 — 标题（时长）` */
function splitStepCardTitle(full: string) {
  const pipe = full.indexOf('|')
  if (pipe !== -1) {
    const left = full.slice(0, pipe).trim()
    const duration = full.slice(pipe + 1).trim()
    const titleOnly = left.replace(/^Step\s+\d+\s*[—–-]\s*/i, '').trim()
    return { title: titleOnly || left, duration }
  }
  const openIdx = full.lastIndexOf('（')
  const closeIdx = full.lastIndexOf('）')
  if (openIdx !== -1 && closeIdx > openIdx && closeIdx === full.length - 1) {
    const duration = full.slice(openIdx + 1, closeIdx).trim()
    const left = full.slice(0, openIdx).trim()
    const titleOnly = left.replace(/^步骤\s*\d+\s*[—–-]\s*/, '').trim()
    return { title: titleOnly || left, duration }
  }
  return { title: full.trim(), duration: '' }
}

interface DurationPart {
  text: string
  isEmphasis: boolean
}

/** Emphasize numeric durations (months, weeks, days) in body copy. */
function splitDurationEmphasis(text: string): DurationPart[] {
  const parts: DurationPart[] = []
  const regex = /\d+(?:\.\d+)?(?:[-–]\d+(?:\.\d+)?)?\s*(?:months?|weeks?|days?)(?:\s+after\s+transfer)?|\d+(?:\.\d+)?(?:[-–]\d+(?:\.\d+)?)?\s*(?:个月|周|天)/g
  let lastIndex = 0
  let match = regex.exec(text)

  while (match) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), isEmphasis: false })
    }
    parts.push({ text: match[0], isEmphasis: true })
    lastIndex = match.index + match[0].length
    match = regex.exec(text)
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isEmphasis: false })
  }

  return parts.length ? parts : [{ text, isEmphasis: false }]
}

interface HeroTimelineItem {
  title: string
  duration: string
}

interface GuideCard {
  icon: 'cost' | 'legal' | 'timeline'
  title: string
  body: string
  cta: string
  to: string
}

interface WhyCard {
  title: string
  body: string
}

interface StepDetail {
  id: number
  title: string
  you: string[]
  we: string[]
  outputs: string[]
}

interface FaqAnswerSeg {
  type: 'text' | 'link'
  text: string
  to?: string
}

interface FaqItem {
  q: string
  answer: FaqAnswerSeg[]
}

interface LocaleBlock {
  metaTitle: string
  metaDesc: string
  heroTitle: string
  heroSubtitle: string
  heroTrustBullets: string[]
  heroTimelineItems: HeroTimelineItem[]
  ctaPrimary: string
  ctaSecondary: string
  timelineLabel: string
  whatYouDoLabel: string
  whatWeDoLabel: string
  outputsLabel: string
  timelineTitle: string
  stepsInfographicAlt: string
  timelineSteps: { number: string, title: string, duration: string, accent: string }[]
  stepsTitle: string
  stepsIntro: string
  steps: StepDetail[]
  guidesTitle: string
  helpfulGuides: GuideCard[]
  changeTitle: string
  changeIntro: string
  changeCards: { title: string, body: string, icon: 'people' | 'calendar' | 'legal' }[]
  changeCtaLine: string
  changePrimary: string
  changeSecondary: string
  whyYundaTitle: string
  whyIllustrationAlt: string
  whyYunda: WhyCard[]
  ctaBandTitle: string
  ctaBandBody: string
  ctaBandPrimary: string
  ctaBandSecondary: string
  faqTitle: string
  faq: FaqItem[]
}

const translations: Record<'en' | 'zh', LocaleBlock> = {
  en: {
    metaTitle: 'Surrogacy Process & Timeline for Intended Parents | Yunda Surrogacy',
    metaDesc:
      'See the surrogacy process step by step for intended parents: consultation, IVF coordination, matching, screening, legal and escrow, transfer, pregnancy milestones, and delivery—with clear timelines.',
    heroTitle: 'Surrogacy Process & Timeline for Intended Parents: How Does Surrogacy Work?',
    heroSubtitle:
      'Learn how the surrogacy process works, from consultation and surrogate matching to IVF coordination, legal clearance, embryo transfer, pregnancy, and delivery.',
    heroTrustBullets: [
      'Step-by-step guidance from consultation to birth',
      'Surrogate matching, IVF, legal, escrow, and insurance coordination',
      'Personalized timeline planning for intended parents',
    ],
    heroTimelineItems: [
      { title: 'Consultation & Planning', duration: '1–3 weeks' },
      { title: 'IVF Clinic Coordination', duration: '2–3 months' },
      { title: 'Surrogate Matching Process', duration: 'Timeline varies' },
      { title: 'Medical Screening & Clearance', duration: 'About 2 months' },
      { title: 'Surrogacy Legal Process & Escrow', duration: '1–1.5 months' },
      { title: 'Embryo Transfer Preparation', duration: '4–6 weeks' },
      { title: 'Pregnancy Test & Early Milestones', duration: '10–14 days after transfer' },
      { title: 'Pregnancy Monitoring & Delivery', duration: 'About 9 months' },
    ],
    ctaPrimary: 'Start Your Surrogacy Journey',
    ctaSecondary: 'Book a Free Consultation',
    timelineLabel: 'Step',
    whatYouDoLabel: 'What You Do',
    whatWeDoLabel: 'What Yunda Does',
    outputsLabel: 'What You’ll Receive',
    timelineTitle: 'The 8-Step Surrogacy Timeline at a Glance',
    stepsInfographicAlt: 'Illustrated overview of the eight surrogacy steps from consultation through delivery.',
    timelineSteps: [
      { number: '1', title: 'Consultation & Planning', duration: '1–3 weeks', accent: 'from-[#8abff2] to-[#6ca5df]' },
      { number: '2', title: 'IVF Clinic Coordination', duration: '2–3 months', accent: 'from-[#96c38a] to-[#7ba86e]' },
      { number: '3', title: 'Surrogate Matching Process', duration: 'Timeline varies', accent: 'from-[#d9b167] to-[#c68d38]' },
      { number: '4', title: 'Medical Screening & Clearance', duration: 'About 2 months', accent: 'from-[#f0a39f] to-[#d77770]' },
      { number: '5', title: 'California Surrogacy Legal Process & Escrow', duration: '1–1.5 months', accent: 'from-[#f4b0a1] to-[#d88877]' },
      { number: '6', title: 'Embryo Transfer Preparation', duration: '4–6 weeks', accent: 'from-[#e8b8d8] to-[#c77aab]' },
      { number: '7', title: 'Pregnancy Test & Early Milestones', duration: '10–14 days after transfer', accent: 'from-[#cbb7ef] to-[#a489d9]' },
      { number: '8', title: 'Pregnancy Monitoring, Delivery & Parentage', duration: 'About 9 months', accent: 'from-[#9fd4cf] to-[#6fb3ad]' },
    ],
    stepsTitle: 'Surrogacy Process Step by Step: From Consultation to Birth',
    stepsIntro:
      'The surrogacy process for intended parents includes consultation, IVF coordination, surrogate matching, medical screening, legal clearance, embryo transfer, pregnancy monitoring, and delivery support. Yunda Surrogacy helps guide each step with clear communication and coordinated care from start to finish. Most journeys take about 12–16 months overall, but pacing differs by family. This overview moves from consultation through matching, screening, legal clearance, transfer, early pregnancy milestones, and ongoing pregnancy support—so you know what comes next.',
    steps: [
      {
        id: 1,
        title: 'Step 1 — Consultation & Planning | 1–3 Weeks',
        you: [
          'Share your family-building goals, timeline expectations, fertility background, and any clinic or embryo information you already have.',
        ],
        we: [
          'We explain how the surrogacy process works, review your situation, answer your early questions, and help you understand the next steps for your journey.',
        ],
        outputs: [
          'A clear starting plan, an estimated surrogacy timeline, and guidance on what to prepare before moving forward.',
        ],
      },
      {
        id: 2,
        title: 'Step 2 — IVF Clinic Coordination | 2–3 Months',
        you: [
          'Connect your IVF clinic with our team, share medical updates, and confirm whether embryos are ready or still need to be created.',
        ],
        we: [
          'We coordinate with your clinic, help track important medical steps, and make sure your IVF plan aligns with the surrogacy timeline.',
        ],
        outputs: [
          'A clearer medical roadmap, clinic coordination support, and a better understanding of how IVF fits into the gestational surrogacy process.',
        ],
      },
      {
        id: 3,
        title: 'Step 3 — Surrogate Matching Process | Timeline Varies',
        you: [
          'Review surrogate preferences such as location, communication style, experience, timeline, and overall fit.',
        ],
        we: [
          'We help identify a qualified gestational surrogate, review matching details, coordinate introductions, and support both sides through the matching process.',
        ],
        outputs: [
          'A potential surrogate match who aligns with your goals, expectations, and medical journey.',
        ],
      },
      {
        id: 4,
        title: 'Step 4 — Medical Screening & Clearance | About 2 Months',
        you: [
          'Wait for the surrogate to complete clinic-required medical screening and provide any requested updates from your IVF clinic.',
        ],
        we: [
          'We help coordinate appointments, track screening progress, communicate with the clinic, and keep you updated on important milestones.',
        ],
        outputs: [
          'Medical clearance confirmation before moving into the legal stage of the surrogacy process.',
        ],
      },
      {
        id: 5,
        title: 'Step 5 — California Surrogacy Legal Process & Escrow | 1–1.5 Months',
        you: [
          'Work with your attorney to review the surrogacy agreement and complete required legal and financial steps.',
        ],
        we: [
          'We help coordinate the contract timeline, escrow setup, legal clearance process, and communication between key professionals.',
        ],
        outputs: [
          'A completed surrogacy agreement, escrow coordination, and legal clearance before embryo transfer.',
        ],
      },
      {
        id: 6,
        title: 'Step 6 — Embryo Transfer Preparation | 4–6 Weeks',
        you: [
          'Stay aligned with your clinic’s transfer plan and prepare for the next medical milestone.',
        ],
        we: [
          'We help coordinate the medication calendar, monitoring appointments, transfer schedule, and communication between your clinic and surrogate.',
        ],
        outputs: [
          'A confirmed embryo transfer plan and a clear understanding of what happens before transfer day.',
        ],
      },
      {
        id: 7,
        title: 'Step 7 — Pregnancy Test & Early Milestones | 10–14 Days After Transfer',
        you: [
          'Wait for pregnancy test results and follow early updates from the clinic.',
        ],
        we: [
          'We help track beta testing, early pregnancy monitoring, ultrasound milestones, and communication between all parties.',
        ],
        outputs: [
          'Pregnancy confirmation updates, early milestone guidance, and continued support as the journey moves into pregnancy care.',
        ],
      },
      {
        id: 8,
        title: 'Step 8 — Pregnancy Monitoring, Delivery & Parentage Support | About 9 Months',
        you: [
          'Prepare for pregnancy updates, delivery planning, newborn arrangements, and parentage-related steps with your legal and medical team.',
        ],
        we: [
          'We help coordinate pregnancy milestones, OB care updates, delivery planning, parentage support, and post-birth guidance.',
        ],
        outputs: [
          'Support through pregnancy, birth planning, delivery coordination, and the final steps of your surrogacy journey.',
        ],
      },
    ],
    guidesTitle: 'Helpful Guides for Intended Parents',
    helpfulGuides: [
      {
        icon: 'cost',
        title: 'Surrogacy Costs in California',
        body:
          'Understand the main expenses intended parents should plan for, including agency coordination, surrogate compensation, IVF, legal, escrow, and insurance.',
        cta: 'View Cost Guide',
        to: '/surrogacy-cost',
      },
      {
        icon: 'legal',
        title: 'California Surrogacy Legal Process',
        body:
          'Learn how contracts, independent legal counsel, escrow setup, legal clearance, and parentage orders fit into the surrogacy process.',
        cta: 'Read Legal Guide',
        to: '/surrogacy-protection-california',
      },
      {
        icon: 'timeline',
        title: 'Surrogacy Timeline Checklist',
        body:
          'See what happens from consultation and matching to embryo transfer, pregnancy, delivery, and post-birth support.',
        cta: 'Get the Checklist',
        to: '/be-parents',
      },
    ],
    changeTitle: 'What Can Change Your Surrogacy Timeline?',
    changeIntro:
      'Every surrogacy timeline is different. These key factors may affect how long the surrogacy process takes for intended parents.',
    changeCards: [
      {
        icon: 'people',
        title: 'Surrogate Matching Preferences',
        body:
          'Specific location/experience needs can extend matching time. Broader preferences often move faster.',
      },
      {
        icon: 'calendar',
        title: 'Medical Screening and Clinic Clearance',
        body:
          'A gestational surrogate must complete medical screening and clinic clearance before embryo transfer, which can affect how long surrogacy takes.',
      },
      {
        icon: 'legal',
        title: 'Surrogacy Legal Process and Escrow',
        body:
          'Contracts, escrow setup, and legal clearance are required before embryo transfer. This is a key step in the California surrogacy process.',
      },
    ],
    changeCtaLine: 'Ready to keep your timeline on track? Start with a clear plan and a cost range you can trust.',
    changePrimary: 'Start Your Surrogacy Process',
    changeSecondary: 'Get a Free Timeline & Cost Estimate',
    whyYundaTitle: 'Why Intended Parents Choose Yunda Surrogacy',
    whyIllustrationAlt: 'Six reasons intended parents choose Yunda Surrogacy.',
    whyYunda: [
      {
        title: 'End-to-End Surrogacy Coordination',
        body:
          'Yunda Surrogacy helps intended parents manage the full surrogacy process, including matching, clinic communication, legal steps, escrow, and pregnancy milestones.',
      },
      {
        title: 'Clear Surrogacy Timeline Guidance',
        body:
          'Every journey is different. We help you understand your surrogacy timeline, key milestones, possible delays, and what to expect from consultation to birth.',
      },
      {
        title: 'Surrogate Matching Support',
        body:
          'Finding the right gestational surrogate is one of the most important steps. Yunda helps guide the surrogate matching process based on fit, timing, and shared expectations.',
      },
      {
        title: 'California Surrogacy Process Experience',
        body:
          'Yunda supports intended parents through the California surrogacy process, including legal coordination, parentage planning, escrow setup, and professional guidance.',
      },
      {
        title: 'IVF and Embryo Transfer Coordination',
        body:
          'We help coordinate with your IVF clinic so medical screening, embryo transfer preparation, and important updates stay connected to your overall surrogacy timeline.',
      },
      {
        title: 'Warm, Responsive Support',
        body:
          'Surrogacy can feel complex, but you do not have to manage it alone. Our team provides clear communication and compassionate support throughout your journey.',
      },
    ],
    ctaBandTitle: 'You Don’t Have to Do This Alone',
    ctaBandBody:
      'We’ll guide you with clarity, conciseness, and expertise—so you can focus on the joy of building your family.',
    ctaBandPrimary: 'Start Your Surrogacy Process',
    ctaBandSecondary: 'Get a Free Timeline & Cost Estimate',
    faqTitle: 'FAQ',
    faq: [
      {
        q: 'What is IVF surrogacy?',
        answer: [{ type: 'text', text: 'IVF surrogacy (gestational surrogacy) means an embryo is created via IVF and transferred to a surrogate who is not genetically related to the baby.' }],
      },
      {
        q: 'How does IVF work with surrogacy?',
        answer: [
          { type: 'text', text: 'IVF creates or uses an embryo, then the surrogate completes a transfer cycle. Key milestones: screening → legal clearance → transfer → pregnancy test. See the full ' },
          { type: 'link', text: 'surrogacy process', to: '/surrogacy-process' },
          { type: 'text', text: ' for the step-by-step view.' },
        ],
      },
      {
        q: 'Do intended parents need IVF for surrogacy?',
        answer: [{ type: 'text', text: 'For gestational surrogacy, yes—an embryo is needed for transfer. You can use your own embryos or create embryos with IVF (with or without donor eggs).' }],
      },
      {
        q: 'How do you choose an IVF clinic for surrogacy?',
        answer: [
          { type: 'text', text: 'Compare: lab quality, donor-egg options, PGT-A availability, international support, scheduling speed, and fee transparency. Start with our ' },
          { type: 'link', text: 'partner IVF clinic list', to: '/partner-ivf-clinics' },
          { type: 'text', text: ' if you want vetted options.' },
        ],
      },
      {
        q: 'Who pays for what: IVF clinic vs agency vs legal/escrow?',
        answer: [{ type: 'text', text: 'The IVF clinic bills medical care. Agency fees cover coordination and support. Legal + escrow handle contracts, parentage filings, and organized payments.' }],
      },
      {
        q: 'How much does IVF and surrogacy cost?',
        answer: [
          { type: 'text', text: 'Costs vary, but it’s easiest to estimate by buckets: IVF clinic fees + surrogacy program fees + legal/escrow + insurance-related items. See our ' },
          { type: 'link', text: 'surrogacy cost breakdown', to: '/surrogacy-cost' },
          { type: 'text', text: ' to plan ranges clearly.' },
        ],
      },
      {
        q: 'Does insurance cover surrogacy?',
        answer: [
          { type: 'text', text: 'Usually, insurance may cover parts of pregnancy-related medical care, but it rarely covers agency fees or legal work. Coverage depends on the plan. Review ' },
          { type: 'link', text: 'insurance planning guidance', to: '/surrogacy-protection-california' },
          { type: 'text', text: ' early.' },
        ],
      },
      {
        q: 'What does surrogacy insurance typically cover—and how much is surrogacy insurance?',
        answer: [
          { type: 'text', text: 'Typical coverage focuses on maternity care, complications, denial/claims support, life insurance, and newborn coverage planning. How much is surrogacy insurance depends on the surrogate’s existing plan and whether extra policies are needed.' },
        ],
      },
      {
        q: 'What is escrow in surrogacy?',
        answer: [{ type: 'text', text: 'Escrow is a neutral account used to pay approved items on schedule (compensation, reimbursements, insurance premiums), with clear records.' }],
      },
      {
        q: 'What legal steps are required under California surrogacy laws?',
        answer: [
          { type: 'text', text: 'Most cases follow: contract signed before transfer, then parentage steps (often via a pre-birth process) to establish legal parents at delivery. Learn more in ' },
          { type: 'link', text: 'California surrogacy legal guidance', to: '/surrogacy-protection-california' },
          { type: 'text', text: '.' },
        ],
      },
    ],
  },
  zh: {
    metaTitle: '准父母代孕流程与时间线：代孕如何运作？| Yunda',
    metaDesc:
      '为准父母梳理代孕全流程：咨询、IVF 协调、匹配、体检、法律与托管、移植、早孕里程碑到孕期与分娩支持，并了解影响时间线的关键因素。',
    heroTitle: '准父母的代孕流程与时间线：代孕如何运作？',
    heroSubtitle:
      '从咨询与匹配代孕妈妈，到 IVF 协调、法律放行、胚胎移植、孕期监测与分娩，了解代孕如何一步步推进。',
    heroTrustBullets: [
      '从咨询到分娩的分步指引',
      '匹配、IVF、法律、托管与保险协调支持',
      '为准父母量身定制的时间线规划',
    ],
    heroTimelineItems: [
      { title: '咨询与规划', duration: '1–3 周' },
      { title: 'IVF 诊所协调', duration: '2–3 个月' },
      { title: '代孕妈妈匹配', duration: '时间因人而异' },
      { title: '医学筛查与合格', duration: '约 2 个月' },
      { title: '法律流程与托管', duration: '1–1.5 个月' },
      { title: '胚胎移植准备', duration: '4–6 周' },
      { title: '验孕与早孕里程碑', duration: '移植后 10–14 天' },
      { title: '孕期监测与分娩', duration: '约 9 个月' },
    ],
    ctaPrimary: '开启你的代孕之旅',
    ctaSecondary: '预约免费咨询',
    timelineLabel: '步骤',
    whatYouDoLabel: '你要做什么',
    whatWeDoLabel: 'Yunda 的工作',
    outputsLabel: '你将获得',
    timelineTitle: '8 步代孕时间线一览',
    stepsInfographicAlt: '从咨询到分娩的八个代孕步骤配图式总览。',
    timelineSteps: [
      { number: '1', title: '咨询与规划', duration: '1–3 周', accent: 'from-[#8abff2] to-[#6ca5df]' },
      { number: '2', title: 'IVF 诊所协调', duration: '2–3 个月', accent: 'from-[#96c38a] to-[#7ba86e]' },
      { number: '3', title: '代孕妈妈匹配', duration: '时间因人而异', accent: 'from-[#d9b167] to-[#c68d38]' },
      { number: '4', title: '医学筛查与合格', duration: '约 2 个月', accent: 'from-[#f0a39f] to-[#d77770]' },
      { number: '5', title: '加州代孕法律流程与托管', duration: '1–1.5 个月', accent: 'from-[#f4b0a1] to-[#d88877]' },
      { number: '6', title: '胚胎移植准备', duration: '4–6 周', accent: 'from-[#e8b8d8] to-[#c77aab]' },
      { number: '7', title: '验孕与早孕里程碑', duration: '移植后 10–14 天', accent: 'from-[#cbb7ef] to-[#a489d9]' },
      { number: '8', title: '孕期监测、分娩与亲子安排', duration: '约 9 个月', accent: 'from-[#9fd4cf] to-[#6fb3ad]' },
    ],
    stepsTitle: '代孕流程分步说明：从咨询到分娩',
    stepsIntro:
      '对准父母而言，代孕通常包括咨询、IVF 协调、匹配代孕妈妈、医学筛查、法律放行、胚胎移植、孕期监测与分娩支持。Yunda 在整个过程中提供清晰沟通与协同照护。多数家庭整体周期约 12–16 个月，但节奏因家庭而异。以下从咨询、匹配、体检、法律放行、移植、早孕到持续孕期支持，帮助你了解下一步。',
    steps: [
      {
        id: 1,
        title: '步骤 1 — 咨询与规划（1–3 周）',
        you: ['分享家庭计划目标、时间预期、生育背景，以及你已有的诊所或胚胎信息。'],
        we: ['说明代孕如何运作、评估你的情况、解答早期疑问，并帮助你了解后续步骤。'],
        outputs: ['清晰的起步计划、预估时间线，以及进入下一阶段前的准备指引。'],
      },
      {
        id: 2,
        title: '步骤 2 — IVF 诊所协调（2–3 个月）',
        you: ['将你的 IVF 诊所与团队对接，同步医疗进展，并确认胚胎是否已就绪或仍需建库。'],
        we: ['与诊所协调排期与信息，跟踪关键医疗节点，使 IVF 计划与代孕时间线一致。'],
        outputs: ['更清晰的医疗路线图、诊所协调支持，以及 IVF 在妊娠代孕中的角色说明。'],
      },
      {
        id: 3,
        title: '步骤 3 — 代孕妈妈匹配（时间因人而异）',
        you: ['梳理匹配偏好，例如地区、沟通方式、经验、时间与整体契合度。'],
        we: ['协助筛选合格妊娠代孕者、整理匹配资料、安排见面，并在匹配阶段提供支持。'],
        outputs: ['与目标与医疗路径更契合的潜在匹配对象。'],
      },
      {
        id: 4,
        title: '步骤 4 — 医学筛查与合格（约 2 个月）',
        you: ['等待代孕妈妈完成诊所要求的医学筛查，并按需提供你方 IVF 诊所的补充信息。'],
        we: ['协助预约与记录、跟踪筛查进度、与诊所沟通，并及时同步关键节点。'],
        outputs: ['在进入法律阶段前获得医学合格/放行确认。'],
      },
      {
        id: 5,
        title: '步骤 5 — 加州代孕法律流程与托管（1–1.5 个月）',
        you: ['在律师协助下审阅并签署代孕协议，完成所需的法律与资金安排。'],
        we: ['协调合同节奏、托管设立、法律放行流程，以及各专业人士之间的沟通。'],
        outputs: ['完成的代孕协议、托管安排，以及移植前的法律放行。'],
      },
      {
        id: 6,
        title: '步骤 6 — 胚胎移植准备（4–6 周）',
        you: ['与诊所移植计划保持一致，为下一医疗节点做好准备。'],
        we: ['协调用药方案、监测预约、移植日程，以及诊所与代孕妈妈之间的信息同步。'],
        outputs: ['确认的胚胎移植计划，以及对移植日前流程的清晰理解。'],
      },
      {
        id: 7,
        title: '步骤 7 — 验孕与早孕里程碑（移植后 10–14 天）',
        you: ['等待验孕结果，并关注诊所的早期更新。'],
        we: ['协助跟踪 β 血值、早孕监测、超声等里程碑，并协调各方沟通。'],
        outputs: ['妊娠确认相关更新、早期节点指引，以及进入孕期照护后的持续支持。'],
      },
      {
        id: 8,
        title: '步骤 8 — 孕期监测、分娩与亲子支持（约 9 个月）',
        you: ['为孕期更新、分娩计划、新生儿安排，以及与律师/医疗团队的亲子相关步骤做好准备。'],
        we: ['协助协调孕期节点、产科随访、分娩计划、亲子支持及产后指引。'],
        outputs: ['贯穿孕期与分娩的协调支持，以及旅程收尾阶段的专业协助。'],
      },
    ],
    guidesTitle: '对准父母有用的指南',
    helpfulGuides: [
      {
        icon: 'cost',
        title: '加州代孕费用',
        body: '了解准父母需规划的主要支出：机构协调、代孕妈妈补偿、IVF、法律、托管与保险等。',
        cta: '查看费用指南',
        to: '/surrogacy-cost',
      },
      {
        icon: 'legal',
        title: '加州代孕法律流程',
        body: '了解合同、独立法律顾问、托管、法律放行与亲子裁定在流程中的位置。',
        cta: '阅读法律指南',
        to: '/surrogacy-protection-california',
      },
      {
        icon: 'timeline',
        title: '代孕时间线清单',
        body: '从咨询与匹配到胚胎移植、孕期、分娩与产后支持，梳理关键节点。',
        cta: '获取清单',
        to: '/be-parents',
      },
    ],
    changeTitle: '哪些因素会影响你的代孕时间线？',
    changeIntro: '每段代孕旅程都不同。以下因素可能改变准父母完成流程所需的时间。',
    changeCards: [
      {
        icon: 'people',
        title: '匹配偏好',
        body: '地点与经验等要求越具体，匹配往往越久；适度放宽非核心条件通常更快。',
      },
      {
        icon: 'calendar',
        title: '医学筛查与诊所放行',
        body: '妊娠代孕妈妈须完成医学筛查与诊所放行后才能移植，这会直接影响整体时长。',
      },
      {
        icon: 'legal',
        title: '法律流程与托管',
        body: '合同、托管与法律放行是移植前的必要步骤，也是加州代孕流程中的关键环节。',
      },
    ],
    changeCtaLine: '想让时间线更可控？先厘清计划与预算区间，再迈出下一步。',
    changePrimary: '开始你的代孕流程',
    changeSecondary: '获取免费时间线与费用估算',
    whyYundaTitle: '准父母为何选择 Yunda',
    whyIllustrationAlt: '准父母选择 Yunda 的六大理由示意。',
    whyYunda: [
      {
        title: '全流程协调',
        body: '从匹配、诊所沟通、法律与托管，到孕期里程碑，Yunda 协助准父母统筹整个代孕流程。',
      },
      {
        title: '清晰的时间线指引',
        body: '每段旅程不同。我们帮助你理解关键节点、可能的延误，以及从咨询到分娩的大致预期。',
      },
      {
        title: '匹配支持',
        body: '找到合适的妊娠代孕者至关重要。我们基于契合度、时间与共同预期协助推进匹配。',
      },
      {
        title: '加州代孕经验',
        body: '在加州代孕路径中，我们协助法律协调、亲子规划、托管安排与专业指引。',
      },
      {
        title: 'IVF 与移植协调',
        body: '与 IVF 诊所协同，使医学筛查、移植准备与重要更新始终对齐你的时间线。',
      },
      {
        title: '有温度的响应式支持',
        body: '代孕流程可能显得复杂，但你不必独自面对。我们提供清晰沟通与全程陪伴。',
      },
    ],
    ctaBandTitle: '你不必独自完成这一切',
    ctaBandBody: '我们以清晰、简洁与专业陪伴你，让你更专注于迎接新生命的喜悦。',
    ctaBandPrimary: '开始你的代孕流程',
    ctaBandSecondary: '获取免费时间线与费用估算',
    faqTitle: '常见问答',
    faq: [
      {
        q: '什么是 IVF 代孕？',
        answer: [{ type: 'text', text: 'IVF 代孕（妊娠代孕）指通过 IVF 形成胚胎并移植给与宝宝无血缘关系的代孕妈妈。' }],
      },
      {
        q: 'IVF 在代孕中怎么运作？',
        answer: [
          { type: 'text', text: 'IVF 生成或使用胚胎，代孕妈妈完成移植周期。关键节点：体检 → 法律放行 → 移植 → 验孕。查看 ' },
          { type: 'link', text: '代孕流程', to: '/surrogacy-process' },
          { type: 'text', text: ' 了解完整步骤。' },
        ],
      },
      {
        q: '做代孕一定要 IVF 吗？',
        answer: [{ type: 'text', text: '妊娠代孕需要胚胎才能移植。你可以用自有胚胎，或通过 IVF（可含供卵）来建库。' }],
      },
      {
        q: '如何选择代孕用的 IVF 诊所？',
        answer: [
          { type: 'text', text: '对比：实验室质量、供卵选项、PGT-A、国际支持、排期速度、费用透明度。可先看我们的 ' },
          { type: 'link', text: '合作 IVF 诊所名单', to: '/partner-ivf-clinics' },
          { type: 'text', text: ' 获取 vetted 选项。' },
        ],
      },
      {
        q: 'IVF 诊所、机构、法律/托管谁承担哪些费用？',
        answer: [{ type: 'text', text: 'IVF 诊所收取医疗费用；机构费覆盖协调与支持；法律+托管负责合同、亲子关系、按计划支付。' }],
      },
      {
        q: 'IVF 与代孕要花多少钱？',
        answer: [
          { type: 'text', text: '可按模块估算：IVF 诊所费 + 代孕项目费 + 法律/托管 + 保险相关。查看 ' },
          { type: 'link', text: '代孕费用拆解', to: '/surrogacy-cost' },
          { type: 'text', text: ' 以便清晰规划区间。' },
        ],
      },
      {
        q: '保险会覆盖代孕吗？',
        answer: [
          { type: 'text', text: '通常保险可覆盖部分孕期医疗，但很少覆盖机构或法律费用，具体取决于计划。建议提前阅读 ' },
          { type: 'link', text: '保险规划指南', to: '/surrogacy-protection-california' },
          { type: 'text', text: '。' },
        ],
      },
      {
        q: '代孕保险一般覆盖什么？费用多少？',
        answer: [
          { type: 'text', text: '典型覆盖：孕产护理、并发症、拒赔/理赔支持、人寿保险、新生儿保障规划。费用取决于代孕妈妈现有保单及是否需额外保单。' },
        ],
      },
      {
        q: '代孕中的托管（Escrow）是什么？',
        answer: [{ type: 'text', text: '托管是中立账户，按计划支付约定项目（补偿、报销、保险费），并保留清晰记录。' }],
      },
      {
        q: '加州代孕法律下需要哪些步骤？',
        answer: [
          { type: 'text', text: '通常：移植前签合同，随后办理亲子关系（常见为预产前裁定）以在分娩时确立法定父母。详见 ' },
          { type: 'link', text: '加州代孕法律指南', to: '/surrogacy-protection-california' },
          { type: 'text', text: '。' },
        ],
      },
    ],
  },
}

const t = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)
const heroTitle = computed(() => t.value.heroTitle)
const heroSubtitle = computed(() => t.value.heroSubtitle)
const heroTrustBullets = computed(() => t.value.heroTrustBullets)
const heroTimelineItems = computed(() => t.value.heroTimelineItems)
const ctaPrimary = computed(() => t.value.ctaPrimary)
const ctaSecondary = computed(() => t.value.ctaSecondary)
const whatYouDoLabel = computed(() => t.value.whatYouDoLabel)
const whatWeDoLabel = computed(() => t.value.whatWeDoLabel)
const outputsLabel = computed(() => t.value.outputsLabel)
const timelineTitle = computed(() => t.value.timelineTitle)
const stepsInfographicAlt = computed(() => t.value.stepsInfographicAlt)
const stepDetails = computed(() =>
  t.value.steps.map((step) => {
    const { title, duration } = splitStepCardTitle(step.title)
    return { ...step, cardTitle: title, cardDuration: duration }
  }),
)
const stepsTitle = computed(() => t.value.stepsTitle)
const stepsIntro = computed(() => t.value.stepsIntro)
const guidesTitle = computed(() => t.value.guidesTitle)
const helpfulGuides = computed(() => t.value.helpfulGuides)
const changeTitle = computed(() => t.value.changeTitle)
const changeIntro = computed(() => t.value.changeIntro)
const changeCards = computed(() => t.value.changeCards)
const changeCtaLine = computed(() => t.value.changeCtaLine)
const changePrimary = computed(() => t.value.changePrimary)
const changeSecondary = computed(() => t.value.changeSecondary)
const whyYundaTitle = computed(() => t.value.whyYundaTitle)
const whyIllustrationAlt = computed(() => t.value.whyIllustrationAlt)
const whyYundaCards = computed(() => t.value.whyYunda)
const ctaBandTitle = computed(() => t.value.ctaBandTitle)
const ctaBandBody = computed(() => t.value.ctaBandBody)
const ctaBandPrimary = computed(() => t.value.ctaBandPrimary)
const ctaBandSecondary = computed(() => t.value.ctaBandSecondary)
const faqTitle = computed(() => t.value.faqTitle)
const faqList = computed(() => t.value.faq)

useHead(() => ({
  title: t.value.metaTitle,
  meta: [{ name: 'description', content: t.value.metaDesc }],
}))
</script>

<template>
  <div class="bg-[var(--head-bg)] text-[var(--dark-brown)]">
    <AppHeader />

    <main>
      <!-- Hero：整段 `bg-cover` 铺改版实景；渐变把文案区与右侧人物衔接（对标原型，非贴原型 PNG） -->
      <section class="relative isolate w-full overflow-hidden bg-white pb-16 pt-12 lg:min-h-[min(88vh,820px)] lg:pb-24 lg:pt-20">
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 bg-cover bg-center bg-no-repeat max-lg:bg-[position:center_22%] lg:bg-right"
          :style="{ backgroundImage: `url('${PAGE_ASSETS.heroScene}')` }"
        />
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 lg:hidden"
          style="background: linear-gradient(to bottom, #ffffff 0%, #ffffff 7%, rgba(255,255,255,0.98) 16%, rgba(255,255,255,0.9) 28%, rgba(255,255,255,0.62) 44%, rgba(255,255,255,0.28) 62%, rgba(255,255,255,0.08) 78%, transparent 100%)"
        />
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-0 hidden lg:block"
          style="background: linear-gradient(to right, #ffffff 0%, #ffffff 22%, rgba(255,255,255,0.98) 32%, rgba(255,255,255,0.92) 40%, rgba(255,255,255,0.78) 48%, rgba(255,255,255,0.48) 60%, rgba(255,255,255,0.2) 74%, rgba(255,255,255,0.04) 86%, transparent 100%)"
        />

        <div class="relative z-10 mx-auto max-w-[1920px] px-6 lg:px-14 xl:px-20">
          <div class="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:gap-y-10">
            <!-- 左：文案 + 桌面 CTA -->
            <div class="relative max-w-xl lg:col-span-5 lg:max-w-none">
              <h1 class="relative text-4xl text-[var(--dark-brown)] font-semibold leading-tight lg:text-[52px] sm:text-5xl" style="font-family: var(--font-primary)">
                {{ heroTitle }}
              </h1>
              <p class="relative mt-6 text-lg text-[var(--dark-brown)]/90 leading-relaxed lg:text-xl" style="font-family: var(--font-secondary)">
                {{ heroSubtitle }}
              </p>
              <ul class="relative mt-6 list-none space-y-3" style="font-family: var(--font-secondary)">
                <li
                  v-for="(bullet, bi) in heroTrustBullets"
                  :key="bi"
                  class="flex gap-3 text-base text-[var(--dark-brown)]/90 leading-relaxed"
                >
                  <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary-brown)]/80" />
                  <span>{{ bullet }}</span>
                </li>
              </ul>
              <div class="relative mt-8 hidden flex-wrap gap-4 lg:flex">
                <NuxtLink
                  :to="localePath('/be-parents')"
                  class="inline-flex items-center justify-center rounded-[6px] bg-[#c68653] px-6 py-3 text-base text-white font-semibold shadow-sm transition-opacity hover:opacity-95"
                  style="font-family: var(--font-secondary)"
                >
                  {{ ctaPrimary }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/be-parents')"
                  class="inline-flex items-center justify-center border-2 border-[#c68653] rounded-[6px] bg-white px-6 py-3 text-base text-[#c68653] font-semibold transition-colors hover:bg-[#c68653]/5"
                  style="font-family: var(--font-secondary)"
                >
                  {{ ctaSecondary }}
                </NuxtLink>
              </div>
            </div>

            <!-- 中：时间线（PC 与左文同属渐变白区；移动轻玻璃） -->
            <div class="relative flex flex-col lg:col-span-4">
              <div class="relative overflow-hidden rounded-2xl bg-white/45 px-4 py-6 shadow-none ring-1 ring-white/40 backdrop-blur-md lg:rounded-none lg:bg-transparent lg:px-0 lg:py-0 sm:px-5 lg:shadow-none lg:ring-0 lg:backdrop-blur-none">
                <div class="relative">
                  <h2 class="text-center text-2xl text-[var(--dark-brown)] font-semibold leading-snug lg:text-left lg:text-[26px] sm:text-3xl xl:text-3xl" style="font-family: var(--font-primary)">
                    {{ timelineTitle }}
                  </h2>
                  <div class="relative mt-6 pl-1">
                    <div class="pointer-events-none absolute bottom-2 left-[14px] top-2 w-6 sm:left-4" aria-hidden="true">
                      <svg class="h-full w-full text-[#a67c52]" fill="none" preserveAspectRatio="none" viewBox="0 0 24 520" xmlns="http://www.w3.org/2000/svg">
                        <path
                          vector-effect="non-scaling-stroke"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2.25"
                          d="M 14 8 C 22 48 6 88 14 128 S 22 168 14 208 S 6 248 14 288 S 22 328 14 368 S 6 408 14 448 S 22 488 14 512"
                        />
                      </svg>
                    </div>
                    <ul class="relative list-none space-y-0" style="font-family: var(--font-secondary)">
                      <li
                        v-for="(row, ri) in heroTimelineItems"
                        :key="ri"
                        class="relative flex gap-4 pb-6 pl-0 last:pb-0"
                      >
                        <div
                          class="ring-[3px] relative z-10 mt-0.5 h-8 w-8 flex shrink-0 items-center justify-center rounded-full text-xs font-semibold shadow-sm ring-white/95 sm:h-9 sm:w-9 sm:text-sm"
                          :class="timelineBadgeClass(ri)"
                          style="font-family: var(--font-primary)"
                        >
                          {{ ri + 1 }}
                        </div>
                        <div class="min-w-0 pt-0.5">
                          <p class="text-[15px] text-[var(--dark-brown)] font-semibold leading-snug sm:text-base" style="font-family: var(--font-primary)">
                            {{ row.title }}
                          </p>
                          <p class="mt-0.5 text-sm text-[var(--dark-brown)]/75">
                            {{ row.duration }}
                          </p>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="mt-8 flex flex-wrap gap-4 lg:hidden">
                <NuxtLink
                  :to="localePath('/be-parents')"
                  class="inline-flex flex-1 items-center justify-center rounded-[6px] bg-[#c68653] px-4 py-3 text-sm text-white font-semibold sm:flex-none sm:px-6 sm:text-base"
                  style="font-family: var(--font-secondary)"
                >
                  {{ ctaPrimary }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/be-parents')"
                  class="inline-flex flex-1 items-center justify-center border-2 border-[#c68653] rounded-[6px] bg-white px-4 py-3 text-sm text-[#c68653] font-semibold sm:flex-none sm:px-6 sm:text-base"
                  style="font-family: var(--font-secondary)"
                >
                  {{ ctaSecondary }}
                </NuxtLink>
              </div>
            </div>
            <!-- 右：留白给背景人物（对标原型三栏节奏） -->
            <div class="hidden min-h-[1px] lg:col-span-3 lg:block" aria-hidden="true" />
          </div>
        </div>
      </section>

      <!-- 第二屏：左改版 `第二屏.png` 整幅长图；右 8 步说明卡（对齐期望稿版式） -->
      <section class="relative isolate w-full overflow-hidden from-[#f7ecde] via-[#f9f5ee] to-[var(--head-bg)] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-14%] top-[-20%] h-[320px] w-[360px] rounded-full bg-white/60 blur-3xl" />
          <div class="absolute bottom-[-24%] right-[-10%] h-[420px] w-[460px] rounded-full bg-[#efe2d3]/60 blur-3xl" />
        </div>
        <div class="relative mx-auto max-w-[1960px] px-6 py-16 lg:px-16 xl:px-24">
          <h2 class="text-center text-3xl text-[var(--dark-brown)] font-semibold leading-tight lg:text-[44px] sm:text-4xl" style="font-family: var(--font-primary)">
            {{ stepsTitle }}
          </h2>
          <p class="mx-auto mt-6 max-w-4xl text-center text-lg text-[var(--dark-brown)]/85 leading-relaxed" style="font-family: var(--font-secondary)">
            <span v-for="(part, index) in splitDurationEmphasis(stepsIntro)" :key="`steps2-intro-${index}`" :class="part.isEmphasis ? 'duration-emphasis' : ''">
              {{ part.text }}
            </span>
          </p>
          <p class="sr-only">
            {{ stepsInfographicAlt }}
          </p>

          <div class="mt-12 flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(260px,0.4fr)_minmax(0,1fr)] lg:items-start lg:gap-12 xl:gap-16">
            <!-- 左：改版竖版 8 步插画整图（与右侧步骤一一对应） -->
            <aside class="order-1 lg:order-none">
              <div class="overflow-hidden border border-[#dcd6cc] rounded-2xl bg-[#faf9f6] p-3 shadow-[0_12px_40px_rgba(64,84,120,0.06)] sm:p-4">
                <img
                  :src="PAGE_ASSETS.stepsTimelineIllustration"
                  :alt="stepsInfographicAlt"
                  class="mx-auto block max-w-[min(100%,420px)] w-full select-none object-contain lg:max-w-none"
                  width="472"
                  height="1110"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                >
              </div>
            </aside>

            <!-- 右：8 步卡 — 顶栏灰圈白字 + 标题 + 时长与 chevron；正文为三「行」：左色块标签 + 右说明（对齐期望稿） -->
            <div class="order-2 lg:order-none space-y-4 lg:space-y-5">
              <article
                v-for="step in stepDetails"
                :key="`step-card-${step.id}`"
                class="overflow-hidden border border-[#e0dbd4] rounded-2xl bg-[#faf8f5] shadow-[0_6px_24px_rgba(64,52,40,0.05)]"
              >
                <div class="flex items-start justify-between gap-3 border-b border-[#e5e0d9] bg-[#f5f2ed] px-4 py-4 sm:gap-4 sm:px-5 sm:py-4">
                  <div class="min-w-0 flex flex-1 items-start gap-3 sm:gap-3.5">
                    <div class="h-10 w-10 flex shrink-0 items-center justify-center rounded-full bg-[#8e8e8e] text-sm text-white font-semibold sm:h-11 sm:w-11" style="font-family: var(--font-primary)">
                      {{ step.id }}
                    </div>
                    <h3 class="min-w-0 pt-0.5 text-left text-base text-[var(--dark-brown)] font-semibold leading-snug sm:text-lg" style="font-family: var(--font-primary)">
                      {{ step.cardTitle }}
                    </h3>
                  </div>
                  <div class="flex shrink-0 items-center gap-1.5 pt-0.5 sm:gap-2">
                    <span v-if="step.cardDuration" class="whitespace-nowrap text-right text-xs text-[var(--dark-brown)]/75 leading-snug sm:text-sm" style="font-family: var(--font-secondary)">
                      {{ step.cardDuration }}
                    </span>
                    <span class="shrink-0 text-[var(--dark-brown)]/30" aria-hidden="true">
                      <svg class="h-4 w-4 sm:h-5 sm:w-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
                <div class="bg-white px-4 py-0.5 divide-y divide-[#e8e3dc] sm:px-5">
                  <div class="flex items-start gap-3 py-3.5 sm:gap-4 sm:py-4">
                    <div
                      class="w-40 flex shrink-0 flex-col self-start justify-center rounded-lg bg-[#8e8e8e] px-2 py-2.5 text-center text-[11px] text-white font-semibold leading-snug sm:w-44 sm:py-3 sm:text-xs"
                      style="font-family: var(--font-secondary)"
                    >
                      {{ whatYouDoLabel }}
                    </div>
                    <div class="min-w-0 flex-1 pt-0.5">
                      <ul class="m-0 list-none p-0 text-sm text-[var(--dark-brown)]/90 leading-relaxed space-y-1.5" style="font-family: var(--font-secondary)">
                        <li v-for="item in step.you" :key="item">
                          {{ item }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="flex items-start gap-3 py-3.5 sm:gap-4 sm:py-4">
                    <div
                      class="w-40 flex shrink-0 flex-col self-start justify-center rounded-lg bg-[#8b9dad] px-2 py-2.5 text-center text-[11px] text-white font-semibold leading-snug sm:w-44 sm:py-3 sm:text-xs"
                      style="font-family: var(--font-secondary)"
                    >
                      {{ whatWeDoLabel }}
                    </div>
                    <div class="min-w-0 flex-1 pt-0.5">
                      <ul class="m-0 list-none p-0 text-sm text-[var(--dark-brown)]/90 leading-relaxed space-y-1.5" style="font-family: var(--font-secondary)">
                        <li v-for="item in step.we" :key="item">
                          {{ item }}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div class="flex items-start gap-3 py-3.5 sm:gap-4 sm:py-4">
                    <div
                      class="w-40 flex shrink-0 flex-col self-start justify-center rounded-lg bg-[#b8926e] px-2 py-2.5 text-center text-[11px] text-white font-semibold leading-snug sm:w-44 sm:py-3 sm:text-xs"
                      style="font-family: var(--font-secondary)"
                    >
                      {{ outputsLabel }}
                    </div>
                    <div class="min-w-0 flex-1 pt-0.5">
                      <ul class="m-0 list-none p-0 text-sm text-[var(--dark-brown)]/90 leading-relaxed space-y-1.5" style="font-family: var(--font-secondary)">
                        <li v-for="item in step.outputs" :key="item">
                          {{ item }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <!-- Helpful guides：期望稿第三屏 — 三列等高铁卡（圆陶土图标 + 衬线标题/正文 + 底通宽 CTA） -->
      <section class="relative isolate w-full bg-[#fdf9f3]">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute right-[-12%] top-[-16%] h-[320px] w-[360px] rounded-full bg-white/70 blur-3xl" />
        </div>
        <div class="relative mx-auto max-w-[1960px] px-6 py-16 lg:px-16 xl:px-24">
          <h2 class="text-center text-3xl text-[var(--dark-brown)] font-semibold leading-tight lg:text-[44px] sm:text-4xl" style="font-family: var(--font-primary)">
            {{ guidesTitle }}
          </h2>
          <div class="grid mx-auto mt-12 max-w-6xl gap-6 lg:grid-cols-3 sm:grid-cols-2 lg:mt-14 lg:gap-8">
            <article
              v-for="card in helpfulGuides"
              :key="card.title"
              class="h-full min-h-0 flex flex-col overflow-hidden border border-[#f0e4d6] rounded-2xl bg-[#fff5e9] shadow-[0_8px_28px_rgba(90,60,40,0.06)]"
            >
              <div class="flex flex-1 flex-col items-center px-6 pb-6 pt-8 text-center">
                <div class="h-[72px] w-[72px] flex shrink-0 items-center justify-center rounded-full bg-[#d37b3f] text-white shadow-sm" aria-hidden="true">
                  <!-- 费用：钞票 + 计算器示意 -->
                  <svg v-if="card.icon === 'cost'" class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 10h8v10H4V10z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 13h4M6 16h4" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14 8h6v12h-6V8z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 11h2M16 14h2M16 17h2" />
                  </svg>
                  <!-- 法律：文书 + 天平 -->
                  <svg v-else-if="card.icon === 'legal'" class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 4h10v14H7V4z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 8h6M9 11h6M9 14h4" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 20h18" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 20l1.5-3h5L16 20" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M11.5 14h1" />
                  </svg>
                  <!-- 时间线：清单 + 时钟 -->
                  <svg v-else class="h-9 w-9" fill="none" stroke="currentColor" stroke-width="1.4" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 3h6l1 2h3a1 1 0 011 1v13a2 2 0 01-2 2H7a2 2 0 01-2-2V6a1 1 0 011-1h3l1-2z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8 10h8M8 13h6M8 16h5" />
                    <circle cx="17" cy="7" r="2.25" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17 5.75v1.5M17 6.25h1" />
                  </svg>
                </div>
                <h3 class="mt-5 text-lg text-[var(--dark-brown)] font-semibold leading-snug sm:text-xl" style="font-family: var(--font-primary)">
                  {{ card.title }}
                </h3>
                <p class="mt-3 max-w-sm flex-1 text-sm text-[var(--dark-brown)]/90 leading-relaxed sm:text-base" style="font-family: var(--font-primary)">
                  {{ card.body }}
                </p>
              </div>
              <NuxtLink
                :to="localePath(card.to)"
                class="block w-full bg-[#d37b3f] py-3.5 text-center text-sm text-white font-semibold tracking-wide transition-colors hover:bg-[#c26d36] sm:py-4 sm:text-base"
                style="font-family: var(--font-secondary)"
              >
                {{ card.cta }}
              </NuxtLink>
            </article>
          </div>
        </div>
      </section>

      <!-- What can change：期望稿第四屏 — 白底、居中标题与导语、三枚等高奶油色圆角卡（蓝 / 青 / 紫线描图标）+ CTA（不再叠放与卡内重复的第四屏整图） -->
      <section class="relative isolate w-full overflow-hidden bg-white">
        <div class="relative mx-auto max-w-[1960px] px-6 py-16 lg:px-16 lg:py-20 xl:px-24">
          <div class="mx-auto max-w-3xl text-center">
            <h2 class="text-3xl text-[var(--dark-brown)] font-semibold leading-tight lg:text-[44px] sm:text-4xl" style="font-family: var(--font-primary)">
              {{ changeTitle }}
            </h2>
            <p class="mt-5 text-base text-[var(--dark-brown)]/85 leading-relaxed sm:text-lg" style="font-family: var(--font-secondary)">
              {{ changeIntro }}
            </p>
          </div>
          <div class="grid grid-cols-1 mx-auto mt-12 max-w-6xl gap-6 md:grid-cols-3 md:mt-14 md:gap-8">
            <div
              v-for="card in changeCards"
              :key="card.title"
              class="h-full min-h-0 flex flex-col items-center rounded-[20px] bg-[#fdf5e6] px-6 py-10 text-center shadow-[0_4px_24px_rgba(55,40,25,0.06)] ring-1 ring-[#f0e6d4]/80"
            >
              <div class="mb-5 h-14 w-14 flex shrink-0 items-center justify-center" aria-hidden="true">
                <svg v-if="card.icon === 'people'" class="h-11 w-11 text-[#2563eb]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.433-2.127M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <svg v-else-if="card.icon === 'calendar'" class="h-11 w-11 text-[#0d9488]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5a2.25 2.25 0 002.25-2.25m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5a2.25 2.25 0 012.25 2.25v7.5" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="m9 12.75 2.25 2.25L15.75 11.25" />
                </svg>
                <svg v-else-if="card.icon === 'legal'" class="h-11 w-11 text-[#7c3aed]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 5v15M5 10h14" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 10l-2 7h4l-2-7" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M16 10l2 7h-4l2-7" />
                </svg>
              </div>
              <h3 class="text-lg text-[var(--dark-brown)] font-semibold leading-snug sm:text-xl" style="font-family: var(--font-primary)">
                {{ card.title }}
              </h3>
              <p class="mt-4 max-w-sm text-sm text-[var(--dark-brown)]/88 leading-relaxed sm:text-base" style="font-family: var(--font-secondary)">
                {{ card.body }}
              </p>
            </div>
          </div>
          <p class="mx-auto mt-14 max-w-3xl text-center text-base text-[var(--dark-brown)]/82 leading-relaxed md:mt-16 sm:text-lg" style="font-family: var(--font-secondary)">
            {{ changeCtaLine }}
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <NuxtLink
              :to="localePath('/be-parents')"
              class="inline-flex items-center justify-center rounded-[6px] bg-[#c68653] px-6 py-3 text-base text-white font-semibold shadow-sm transition-opacity hover:opacity-95"
              style="font-family: var(--font-secondary)"
            >
              {{ changePrimary }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/surrogacy-cost')"
              class="inline-flex items-center justify-center border-2 border-[#c68653] rounded-[6px] bg-white px-6 py-3 text-base text-[#c68653] font-semibold transition-colors hover:bg-[#c68653]/5"
              style="font-family: var(--font-secondary)"
            >
              {{ changeSecondary }}
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Why Yunda：六卡（改版未提供整幅第五屏切片，此处不贴原型整图） -->
      <section class="relative isolate w-full bg-white">
        <div class="relative mx-auto max-w-[1960px] px-6 py-16 lg:px-16 xl:px-24">
          <h2 class="text-center text-4xl text-[var(--dark-brown)] font-semibold leading-tight lg:text-[44px]" style="font-family: var(--font-primary)">
            {{ whyYundaTitle }}
          </h2>
          <p class="sr-only">
            {{ whyIllustrationAlt }}
          </p>
          <div class="grid mx-auto mt-10 max-w-6xl gap-5 lg:grid-cols-3 sm:grid-cols-2">
            <div
              v-for="card in whyYundaCards"
              :key="card.title"
              class="bg-[#fdf5e6] px-6 py-8 text-center shadow-none"
              style="font-family: var(--font-primary)"
            >
              <h3 class="text-lg text-[var(--dark-brown)] font-semibold leading-snug">
                {{ card.title }}
              </h3>
              <p class="mt-3 text-sm text-[var(--dark-brown)]/85 leading-relaxed" style="font-family: var(--font-secondary)">
                {{ card.body }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA：左文右图（右侧用改版第六屏切片） -->
      <section class="relative isolate w-full overflow-hidden bg-white">
        <div class="relative mx-auto max-w-[1960px] px-0 lg:px-16 xl:px-24">
          <div class="grid items-stretch lg:grid-cols-2">
            <div class="flex flex-col justify-center px-6 py-14 lg:px-12 lg:py-20">
              <h2 class="text-left text-3xl text-[var(--dark-brown)] font-semibold leading-tight sm:text-4xl" style="font-family: var(--font-primary)">
                {{ ctaBandTitle }}
              </h2>
              <p class="mt-4 max-w-xl text-left text-base text-[var(--dark-brown)]/85 leading-relaxed sm:text-lg" style="font-family: var(--font-secondary)">
                {{ ctaBandBody }}
              </p>
              <div class="mt-8 flex flex-wrap gap-4">
                <NuxtLink
                  :to="localePath('/be-parents')"
                  class="inline-flex items-center justify-center rounded-[6px] bg-[#c68653] px-6 py-3 text-base text-white font-semibold shadow-sm transition-opacity hover:opacity-95"
                  style="font-family: var(--font-secondary)"
                >
                  {{ ctaBandPrimary }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/surrogacy-cost')"
                  class="inline-flex items-center justify-center border-2 border-[#c68653] rounded-[6px] bg-white px-6 py-3 text-base text-[#c68653] font-semibold transition-colors hover:bg-[#c68653]/5"
                  style="font-family: var(--font-secondary)"
                >
                  {{ ctaBandSecondary }}
                </NuxtLink>
              </div>
            </div>
            <div class="relative min-h-[280px] lg:min-h-[360px]">
              <img
                :src="PAGE_ASSETS.ctaBandPhoto"
                alt=""
                class="h-full w-full object-cover object-center lg:absolute lg:inset-0 lg:min-h-full"
                loading="lazy"
                decoding="async"
              >
            </div>
          </div>
        </div>
      </section>

      <!-- FAQ：浅底白卡片条（对标原型第七屏层次） -->
      <section class="relative isolate w-full bg-[#faf8f5] py-16">
        <div class="relative mx-auto max-w-[960px] px-6 lg:px-8">
          <h2 class="text-4xl text-[var(--dark-brown)] font-semibold leading-tight lg:text-[40px]" style="font-family: var(--font-primary)">
            {{ faqTitle }}
          </h2>
          <div class="mt-8 space-y-3">
            <details
              v-for="(faq, index) in faqList"
              :key="faq.q"
              class="group rounded-[10px] bg-white px-5 py-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              <summary class="cursor-pointer list-none text-base text-[var(--dark-brown)] font-medium" style="font-family: var(--font-secondary)">
                {{ index + 1 }}) {{ faq.q }}
              </summary>
              <p class="mt-3 text-sm text-[var(--dark-brown)]/80 leading-relaxed" style="font-family: var(--font-secondary)">
                <template v-for="(seg, segIndex) in faq.answer" :key="`faq-${index}-seg-${segIndex}`">
                  <NuxtLink
                    v-if="seg.type === 'link'"
                    :to="localePath(seg.to || '/')"
                    class="text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/50 underline-offset-2 hover:text-[var(--dark-brown)]"
                  >
                    {{ seg.text }}
                  </NuxtLink>
                  <template v-else>
                    {{ seg.text }}
                  </template>
                </template>
              </p>
            </details>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.duration-emphasis {
  font-size: 1.15em;
  font-weight: 600;
}
</style>

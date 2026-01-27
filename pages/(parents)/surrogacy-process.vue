<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'

const localePath = useLocalePath()
const { locale } = useI18n()
const stickySection = ref<HTMLElement | null>(null)
const stickyColumn = ref<HTMLElement | null>(null)
const stickyPanel = ref<HTMLElement | null>(null)
const stepsColumn = ref<HTMLElement | null>(null)

let rafId: number | null = null

interface MonthPart {
  text: string
  isMonth: boolean
}

function splitMonths(text: string): MonthPart[] {
  const parts: MonthPart[] = []
  const regex = /\d+(?:\.\d+)?(?:[-–]\d+(?:\.\d+)?)?\s*months/gi
  let lastIndex = 0
  let match = regex.exec(text)

  while (match) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), isMonth: false })
    }
    parts.push({ text: match[0], isMonth: true })
    lastIndex = match.index + match[0].length
    match = regex.exec(text)
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isMonth: false })
  }

  return parts.length ? parts : [{ text, isMonth: false }]
}

function getStickyOffset() {
  const header = document.querySelector('header')
  const headerHeight = header ? header.getBoundingClientRect().height : 80
  return Math.round(headerHeight + 16)
}

function setStatic(panel: HTMLElement, column: HTMLElement) {
  column.style.position = 'relative'
  panel.style.position = 'relative'
  panel.style.top = '0'
  panel.style.left = '0'
  panel.style.width = 'auto'
  panel.style.bottom = 'auto'
  column.style.minHeight = '0'
}

function setFixed(panel: HTMLElement, column: HTMLElement, offset: number, left: number, width: number) {
  column.style.position = 'relative'
  panel.style.position = 'fixed'
  panel.style.top = `${offset}px`
  panel.style.left = `${left}px`
  panel.style.width = `${width}px`
  panel.style.bottom = 'auto'
  column.style.minHeight = column.style.minHeight || '0'
}

function setAbsolute(panel: HTMLElement, column: HTMLElement, top: number, width: number) {
  column.style.position = 'relative'
  panel.style.position = 'absolute'
  panel.style.top = `${top}px`
  panel.style.left = '0'
  panel.style.width = `${width}px`
  panel.style.bottom = 'auto'
  column.style.minHeight = column.style.minHeight || '0'
}

function updateSticky() {
  const section = stickySection.value
  const column = stickyColumn.value
  const panel = stickyPanel.value
  const steps = stepsColumn.value

  if (!section || !column || !panel || !steps)
    return

  if (window.innerWidth < 1024) {
    setStatic(panel, column)
    return
  }

  const offset = getStickyOffset()
  const sectionRect = section.getBoundingClientRect()
  const stepsRect = steps.getBoundingClientRect()
  const columnRect = column.getBoundingClientRect()
  const panelHeight = panel.offsetHeight
  const stepsHeight = stepsRect.height

  column.style.minHeight = `${stepsHeight}px`

  const start = sectionRect.top - offset
  const end = stepsRect.bottom - offset - panelHeight

  if (start > 0) {
    setStatic(panel, column)
    return
  }

  if (end <= 0) {
    setAbsolute(panel, column, Math.max(stepsHeight - panelHeight, 0), columnRect.width)
    return
  }

  setFixed(panel, column, offset, columnRect.left, columnRect.width)
}

function handleScroll() {
  if (rafId !== null)
    return
  rafId = window.requestAnimationFrame(() => {
    rafId = null
    updateSticky()
  })
}

onMounted(() => {
  updateSticky()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll)
  window.addEventListener('load', updateSticky)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
  window.removeEventListener('load', updateSticky)
  if (rafId !== null) {
    window.cancelAnimationFrame(rafId)
    rafId = null
  }
})

const translations = {
  en: {
    heroTitle: 'Surrogacy Process & Procedure: How Does Surrogacy Work? | Yunda',
    heroTimeline: 'Most families complete the surrogacy process in about 12–16 months.',
    heroDescription:
      'This page explains how surrogacy works from start to finish—your surrogacy procedure step by step, including matching, medical screening, the surrogacy legal process, and key timeline factors. Matching time can vary based on your preferences and availability.',
    heroCards: [
      { title: 'Matching', body: 'Preferences, availability, clinic fit.' },
      { title: 'Screening', body: 'Medical + psychological clearance.' },
      { title: 'Legal & Parentage', body: 'Agreement drafting, PBO timing, escrow alignment.' },
    ],
    ctaPrimary: 'Start Your Surrogacy Process',
    ctaSecondary: 'Get a Free Timeline & Cost Estimate',
    timelineLabel: 'What you Do',
    whatYouDoLabel: 'What you do',
    whatWeDoLabel: 'What we do',
    outputsLabel: 'Outputs',
    timelineTitle: 'The 6-Step Surrogacy Timeline at a Glance',
    timelineIntro:
      'Most families complete the surrogacy process in about 12–16 months. As a quick overview of how surrogacy works, the timeline typically moves from consultation & sign-up (1–3 weeks) to IVF clinic coordination (2–3 months), then matching with a gestational carrier (time varies), followed by medical screening and clearance (about 2 months), legal contract + escrow setup (1–1.5 months), and finally transfer preparation and transfer (4–6 weeks) with a pregnancy test 10–14 days after transfer.',
    timelineSteps: [
      { number: '1', title: 'Consultation & Eligibility Fit', duration: '1–3 weeks', accent: 'from-[#8abff2] to-[#6ca5df]' },
      { number: '2', title: 'IVF Clinic Coordination', duration: '2–3 months', accent: 'from-[#96c38a] to-[#7ba86e]' },
      { number: '3', title: 'Matching With a Gestational Carrier', duration: 'Time varies', accent: 'from-[#d9b167] to-[#c68d38]' },
      { number: '4', title: 'Medical Screening & Clearance', duration: 'about 2 months', accent: 'from-[#f0a39f] to-[#d77770]' },
      { number: '5', title: 'Surrogacy Legal Process, Contract & Escrow', duration: '1–1.5 months', accent: 'from-[#f4b0a1] to-[#d88877]' },
      {
        number: '6',
        title: 'Transfer Prep → Transfer → Pregnancy Milestones',
        duration: '4–6 weeks + 10–14 days test',
        accent: 'from-[#cbb7ef] to-[#a489d9]',
      },
    ],
    stepsTitle: 'Step-by-Step Surrogacy Process: What You Do, What We Do, and What You’ll Receive',
    stepsIntro:
      'Below is the surrogacy process (also called the surrogacy procedure) broken into 6 steps—so you can clearly see how surrogacy works, what’s required, and what you get at each milestone in a gestational surrogacy process.',
    steps: [
      {
        id: 1,
        title: 'Step 1 — Consultation & Eligibility Fit (1–3 weeks)',
        you: ['Share your goals, timeline, and background (embryos ready vs need IVF).', 'Confirm basic criteria for surrogacy (medical/logistical fit).'],
        we: ['Explain what is surrogacy process and how it works step by step.', 'Build a clear plan for your next milestones and expected timing.'],
        outputs: ['Personalized roadmap + checklist', 'Initial timeline estimate and next-step plan'],
      },
      {
        id: 2,
        title: 'Step 2 — IVF Clinic Coordination (2–3 months)',
        you: ['Choose your IVF clinic (or ask for partner clinic options).', 'Provide embryo/IVF records and confirm embryo creation plan if needed.'],
        we: ['Help you choose and coordinate an IVF clinic for surrogacy.', 'Align clinic scheduling with the gestational carrier workflow and transfer targets.'],
        outputs: ['Confirmed clinic plan + key dates', 'Embryo status and transfer readiness timeline'],
      },
      {
        id: 3,
        title: 'Step 3 — Matching With a Gestational Carrier (Time varies)',
        you: ['Set matching preferences (location, experience, availability, timeline).', 'Review profiles, meet candidates, and select your match.'],
        we: ['Source and pre-screen candidates for gestational carrier surrogacy.', 'Present qualified matches and guide expectations for a smooth match decision.'],
        outputs: ['Confirmed match + match summary', 'Next-step schedule (medical + legal)'],
      },
      {
        id: 4,
        title: 'Step 4 — Medical Screening & Clearance (about 2 months)',
        you: ['Approve screening appointments and required tests.', 'Confirm insurance approach and any clinic requirements.'],
        we: ['Coordinate surrogate medical screening, records, and clinic reviews.', 'Track medical clearances and keep the process moving toward transfer.'],
        outputs: ['Medical clearance / “green light” for transfer', 'Finalized transfer plan and readiness confirmation'],
      },
      {
        id: 5,
        title: 'Step 5 — Surrogacy Legal Process, Contract & Escrow (1–1.5 months)',
        you: ['Work with legal counsel to review and sign the gestational surrogacy agreement.', 'Fund escrow/trust per the payment schedule.'],
        we: [
          'Coordinate the contract workflow and escrow setup.',
          'Help you plan a compliant path based on surrogacy laws in the US, including California surrogacy laws as a common framework (and where relevant).',
        ],
        outputs: ['Fully executed surrogacy contract', 'Escrow/trust active + payment schedule confirmed', 'Parentage/filing plan outline'],
      },
      {
        id: 6,
        title: 'Step 6 — Transfer Prep → Transfer → Pregnancy Milestones (4–6 weeks + 10–14 days test)',
        you: ['Confirm embryo selection/shipping (if needed) and follow the clinic calendar.', 'Plan travel/logistics if required and stay responsive during monitoring.'],
        we: ['Coordinate meds calendar, monitoring, and transfer date with the clinic.', 'Support early milestones: beta test 10–14 days post-transfer and follow-up tracking.'],
        outputs: ['Embryo transfer completed', 'Pregnancy test result (10–14 days)', 'Early pregnancy milestone plan (next appointments + ongoing support)'],
      },
    ],
    changeTitle: 'What Can Change Your Surrogacy Timeline?',
    changeCards: [
      {
        title: 'Matching preferences',
        body: 'Specific location/experience needs can extend matching time. Broader preferences often move faster.',
      },
      {
        title: 'Medical & clinic calendars',
        body: 'Clinic availability and screening speed affect clearance and transfer prep. Align early with your clinic plan.',
      },
      {
        title: 'Legal & insurance steps',
        body: 'Contract review, escrow setup, and insurance design can shift timing. Start legal early to keep transfer dates on track.',
      },
    ],
    changeCtaLine: 'Ready to keep your timeline on track? Start with a clear plan and a cost range you can trust.',
    changePrimary: 'Start Your Surrogacy Process',
    changeSecondary: 'Get a Free Timeline & Cost Estimate',
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
    heroTitle: '代孕流程与步骤：代孕如何运作？| Yunda',
    heroTimeline: '大多数家庭在约 12–16 个月内完成代孕流程。',
    heroDescription:
      '本页从头到尾解释代孕如何运作——按步骤展示代孕流程，包括匹配、体检、法律流程和时间线关键因素。匹配时间取决于你的偏好与可用性。',
    heroCards: [
      { title: '匹配', body: '偏好、时间可用性、诊所匹配度。' },
      { title: '筛查', body: '医学与心理筛查、合格确认。' },
      { title: '法律与亲子关系', body: '协议起草、PBO（预产前亲子裁定）时间、托管对齐。' },
    ],
    ctaPrimary: '开始你的代孕流程',
    ctaSecondary: '获取免费时间线与费用估算',
    timelineLabel: '你要做什么',
    whatYouDoLabel: '你要做什么',
    whatWeDoLabel: '我们要做什么',
    outputsLabel: '输出',
    timelineTitle: '6 步代孕时间线一览',
    timelineIntro:
      '大多数家庭在约 12–16 个月内完成代孕。时间线通常是：咨询与登记（1–3 周）→ IVF 诊所协调（2–3 个月）→ 匹配代孕妈妈（时间不定）→ 体检与合格（约 2 个月）→ 法律合同+托管（1–1.5 个月）→ 移植准备与移植（4–6 周，移植后 10–14 天测孕）。',
    timelineSteps: [
      { number: '1', title: '咨询与资格匹配', duration: '1–3 周', accent: 'from-[#8abff2] to-[#6ca5df]' },
      { number: '2', title: 'IVF 诊所协调', duration: '2–3 个月', accent: 'from-[#96c38a] to-[#7ba86e]' },
      { number: '3', title: '匹配代孕妈妈', duration: '时间因人而异', accent: 'from-[#d9b167] to-[#c68d38]' },
      { number: '4', title: '医学筛查与合格', duration: '约 2 个月', accent: 'from-[#f0a39f] to-[#d77770]' },
      { number: '5', title: '法律流程、合同与托管', duration: '1–1.5 个月', accent: 'from-[#f4b0a1] to-[#d88877]' },
      { number: '6', title: '移植准备 → 移植 → 早孕里程碑', duration: '4–6 周 + 移植后 10–14 天测孕', accent: 'from-[#cbb7ef] to-[#a489d9]' },
    ],
    stepsTitle: '代孕流程分步说明：你要做的、我们要做的、你将获得的',
    stepsIntro:
      '以下将代孕流程（代孕步骤）拆成 6 步，让你清楚看到代孕如何运作、需要什么，以及每个节点能得到什么。',
    steps: [
      {
        id: 1,
        title: '步骤 1 — 咨询与资格匹配（1–3 周）',
        you: ['分享目标、时间表和背景（是否已有胚胎或需 IVF）。', '确认代孕的基本标准（医疗/后勤匹配）。'],
        we: ['解释代孕流程与步骤。', '为后续里程碑和预估时间制作计划。'],
        outputs: ['个性化路线图与清单', '初步时间估算与下一步计划'],
      },
      {
        id: 2,
        title: '步骤 2 — IVF 诊所协调（2–3 个月）',
        you: ['选择或咨询 IVF 诊所。', '如需建库，提供胚胎/IVF 记录并确认胚胎计划。'],
        we: ['帮助选择并协调 IVF 诊所。', '让诊所排期与代孕流程/移植目标一致。'],
        outputs: ['确认的诊所计划与关键日期', '胚胎状态与移植准备时间线'],
      },
      {
        id: 3,
        title: '步骤 3 — 匹配合适的代孕妈妈（时间不定）',
        you: ['设定匹配偏好（地点、经验、可用性、时间表）。', '查看资料、见面沟通并确认匹配。'],
        we: ['寻找并预筛选代孕候选人。', '呈现合格候选并引导预期，帮助顺利决策。'],
        outputs: ['确认的匹配与摘要', '后续体检 + 法律安排时间表'],
      },
      {
        id: 4,
        title: '步骤 4 — 体检与合格（约 2 个月）',
        you: ['确认筛查预约与所需检查。', '确认保险方案及诊所要求。'],
        we: ['协调代孕体检、病历与诊所审核。', '跟踪体检合格，推进移植准备。'],
        outputs: ['体检合格 / 绿灯', '最终移植计划与准备确认'],
      },
      {
        id: 5,
        title: '步骤 5 — 法律流程、合同与托管（1–1.5 个月）',
        you: ['与律师审阅并签署代孕协议。', '按付款计划注资托管/信托。'],
        we: ['协调合同流程与托管设置。', '按美国（含加州）代孕法规规划合规路径。'],
        outputs: ['正式执行的代孕合同', '托管/信托启用 + 付款时间表确认', '亲子关系/备案计划'],
      },
      {
        id: 6,
        title: '步骤 6 — 移植准备 → 移植 → 早孕里程碑（4–6 周 + 移植后 10–14 天测孕）',
        you: ['确认胚胎选择/运输并遵循诊所日程。', '如需出行做好行程，并在监测期保持响应。'],
        we: ['协调用药表、监测与移植日期。', '支持早期里程碑：移植后 10–14 天验孕并持续跟踪。'],
        outputs: ['完成胚胎移植', '妊娠测试结果（10–14 天）', '早孕里程碑计划（下次预约与持续支持）'],
      },
    ],
    changeTitle: '哪些因素会影响你的代孕时间线？',
    changeCards: [
      { title: '匹配偏好', body: '地点/经验/可用性/保险/生活方式要求越具体，匹配可能越久；保持必要条件，其他适度灵活会更快。' },
      { title: '医疗排期与诊所准备', body: '诊所日程、筛查预约、化验结果、移植周期都会影响进度；若仍需建库会拉长时间。' },
      { title: '法律、跨州与旅行文件', body: '合同、公证、托管、亲子关系以及跨州/国际旅行文件都会影响速度。尽早规划法律与文件以避免延误。' },
    ],
    changeCtaLine: '想让时间线更可控？先把计划和预算区间看清楚，再开始行动。',
    changePrimary: '开始你的代孕流程',
    changeSecondary: '获取免费时间线与费用估算',
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
const heroTimeline = computed(() => t.value.heroTimeline)
const heroDescription = computed(() => t.value.heroDescription)
const heroCards = computed(() => t.value.heroCards)
const ctaPrimary = computed(() => t.value.ctaPrimary)
const ctaSecondary = computed(() => t.value.ctaSecondary)
const timelineLabel = computed(() => t.value.timelineLabel)
const whatYouDoLabel = computed(() => t.value.whatYouDoLabel)
const whatWeDoLabel = computed(() => t.value.whatWeDoLabel)
const outputsLabel = computed(() => t.value.outputsLabel)
const timelineTitle = computed(() => t.value.timelineTitle)
const timelineIntro = computed(() => t.value.timelineIntro)
const timelineSteps = computed(() => t.value.timelineSteps)
const stepDetails = computed(() => t.value.steps)
const stepsTitle = computed(() => t.value.stepsTitle)
const stepsIntro = computed(() => t.value.stepsIntro)
const changeTitle = computed(() => t.value.changeTitle)
const changeCards = computed(() => t.value.changeCards)
const changeCtaLine = computed(() => t.value.changeCtaLine)
const changePrimary = computed(() => t.value.changePrimary)
const changeSecondary = computed(() => t.value.changeSecondary)
const faqTitle = computed(() => t.value.faqTitle)
const faqList = computed(() => t.value.faq)

useHead(() => ({
  title: 'Surrogacy Process & Procedure: How Does Surrogacy Work? | Yunda Surrogacy',
  meta: [
    {
      name: 'description',
      content: 'See how surrogacy works, step by step—the surrogacy procedure, criteria, matching, legal process and timeline. Basics on California surrogacy laws.',
    },
  ],
}))
</script>

<template>
  <div class="bg-[var(--head-bg)] text-[var(--dark-brown)]">
    <AppHeader />

    <main>
      <section class="relative isolate w-full overflow-hidden from-[var(--head-bg)] via-[#fbf0da] to-[#f4e8d8] bg-gradient-to-br">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-18%] top-[-24%] h-[320px] w-[320px] rounded-full bg-white/60 blur-3xl" />
          <div class="absolute right-[-12%] top-[-30%] h-[420px] w-[420px] rounded-full bg-[#f2e6d8]/60 blur-3xl" />
          <div class="absolute bottom-[-26%] left-[-20%] h-[420px] w-[520px] rounded-[55%] bg-white/55 blur-3xl" />
          <div class="absolute bottom-[-32%] right-[-18%] h-[460px] w-[560px] rounded-[60%] bg-[#f7ebde]/65 blur-3xl" />
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(255,255,255,0.6),rgba(255,255,255,0)),radial-gradient(circle_at_85%_20%,rgba(251,240,218,0.42),rgba(255,255,255,0)),radial-gradient(circle_at_60%_85%,rgba(244,232,216,0.45),rgba(255,255,255,0))]" />
        </div>

        <div class="relative mx-auto max-w-[1960px] flex flex-col-reverse items-stretch gap-10 px-6 pb-16 pt-12 lg:flex-row lg:items-center lg:gap-16 lg:px-16 xl:px-24 lg:pb-24 lg:pt-20">
          <div class="relative flex-1">
            <div class="max-w-3xl rounded-3xl bg-white/65 p-8 shadow-[0_24px_60px_rgba(64,84,120,0.10)] ring-1 ring-white/50 backdrop-blur-lg lg:p-12">
              <div class="absolute left-4 top-4 h-12 w-12 rounded-full bg-white/60 blur-xl" />
              <h1 class="relative text-4xl text-[var(--dark-brown)] font-semibold leading-tight lg:text-[52px] sm:text-5xl" style="font-family: var(--font-primary)">
                {{ heroTitle }}
              </h1>
              <p class="relative mt-6 text-xl text-[var(--dark-brown)]/90 font-semibold" style="font-family: var(--font-primary)">
                <span v-for="(part, index) in splitMonths(heroTimeline)" :key="`hero-month-${index}`" :class="part.isMonth ? 'month-emphasis' : ''">
                  {{ part.text }}
                </span>
              </p>
              <p class="relative mt-4 text-lg text-[var(--dark-brown)]/80 leading-relaxed" style="font-family: var(--font-secondary)">
                {{ heroDescription }}
              </p>
              <div class="relative mt-8 flex flex-wrap gap-4">
                <NuxtLink
                  :to="localePath('/be-parents')"
                  class="inline-flex items-center justify-center rounded-[14px] from-[var(--primary-brown)] to-[#7d5535] bg-gradient-to-r px-6 py-3 text-base text-white font-semibold shadow-[0_16px_38px_rgba(121,92,64,0.25)] transition-transform duration-200 hover:shadow-[0_20px_42px_rgba(121,92,64,0.35)] hover:-translate-y-0.5"
                  style="font-family: var(--font-secondary)"
                >
                  {{ ctaPrimary }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/surrogacy-cost')"
                  class="inline-flex items-center justify-center border border-[var(--primary-brown)]/35 rounded-[14px] bg-white/75 px-6 py-3 text-base text-[var(--dark-brown)] font-semibold shadow-[0_14px_32px_rgba(48,58,72,0.10)] backdrop-blur-sm transition-transform duration-200 hover:bg-white hover:shadow-[0_18px_38px_rgba(48,58,72,0.18)] hover:-translate-y-0.5"
                  style="font-family: var(--font-secondary)"
                >
                  {{ ctaSecondary }}
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="relative flex flex-1 items-center justify-center">
            <div class="absolute right-8 top-6 h-16 w-16 rounded-full bg-white/60 blur-2xl md:right-14 md:top-2" />
            <div class="absolute h-28 w-28 rounded-full bg-white/45 blur-2xl -bottom-10 -left-6 md:-left-12" />
            <div class="relative max-w-[560px] w-full rounded-[28px] bg-white/75 p-6 shadow-[0_24px_60px_rgba(64,84,120,0.12)] ring-1 ring-white/50 backdrop-blur-lg">
              <div class="rounded-2xl from-[#f7f0e5] via-white to-[#f2e7d8] bg-gradient-to-br p-5 shadow-inner">
                <div class="mb-4 flex items-center justify-between gap-3" />
                <picture>
                  <source srcset="/images/process/surrogacy-process-banner.png" type="image/webp">
                  <img src="/images/process/surrogacy-process-banner.png" alt="Illustration of surrogacy process timeline" class="h-64 w-full rounded-xl object-cover shadow-[0_12px_28px_rgba(64,84,120,0.12)]" loading="lazy" decoding="async">
                </picture>
                <div class="grid grid-cols-2 mt-5 gap-3">
                  <div
                    v-for="(card, idx) in heroCards"
                    :key="card.title"
                    class="rounded-xl bg-white/80 ring-1 ring-white/40" :class="[idx === heroCards.length - 1 ? 'col-span-2' : '', idx === heroCards.length - 1 ? 'px-4 py-3 shadow-[0_12px_26px_rgba(64,84,120,0.10)]' : 'px-3 py-3 shadow-[0_10px_20px_rgba(64,84,120,0.10)]']"
                  >
                    <p class="text-xs text-[var(--dark-brown)]/60 font-semibold tracking-wide uppercase">
                      {{ card.title }}
                    </p>
                    <p class="mt-1 text-sm text-[var(--dark-brown)]/85" style="font-family: var(--font-secondary)">
                      {{ card.body }}
                    </p>
                  </div>
                </div>
                <div class="mt-5 space-y-2">
                  <div class="h-3 w-full rounded-full bg-[var(--dark-brown)]/10" />
                  <div class="h-3 w-11/12 rounded-full bg-[var(--dark-brown)]/8" />
                  <div class="h-3 w-9/12 rounded-full bg-[var(--dark-brown)]/9" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative isolate w-full overflow-hidden from-[#f7ecde] via-[#f9f5ee] to-[var(--head-bg)] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-14%] top-[-20%] h-[320px] w-[360px] rounded-full bg-white/60 blur-3xl" />
          <div class="absolute bottom-[-24%] right-[-10%] h-[420px] w-[460px] rounded-full bg-[#efe2d3]/60 blur-3xl" />
        </div>
        <div class="relative mx-auto max-w-[1960px] px-6 py-16 lg:px-16 xl:px-24">
          <div class="text-center">
            <h2 class="text-4xl text-[var(--dark-brown)] font-semibold leading-tight lg:text-[44px]" style="font-family: var(--font-primary)">
              {{ timelineTitle }}
            </h2>
            <p class="mt-3 text-lg text-[var(--dark-brown)]/80 leading-relaxed" style="font-family: var(--font-secondary)">
              <span v-for="(part, index) in splitMonths(timelineIntro)" :key="`timeline-month-${index}`" :class="part.isMonth ? 'month-emphasis' : ''">
                {{ part.text }}
              </span>
            </p>
          </div>

          <div class="mt-10 overflow-hidden border border-white/50 rounded-[24px] bg-white/70 p-4 shadow-[0_24px_60px_rgba(64,84,120,0.10)] backdrop-blur">
            <div class="grid gap-4 lg:grid-cols-6">
              <div
                v-for="step in timelineSteps"
                :key="step.number"
                class="group flex flex-col gap-3 rounded-[18px] from-white/85 to-white/70 bg-gradient-to-b p-4 shadow-[0_16px_30px_rgba(64,84,120,0.08)] ring-1 ring-white/60"
              >
                <div class="flex items-center gap-3">
                  <div class="h-10 w-10 rounded-full bg-gradient-to-r text-white shadow-[0_10px_24px_rgba(64,84,120,0.20)]" :class="step.accent">
                    <div class="h-full w-full flex items-center justify-center text-lg font-semibold" style="font-family: var(--font-primary)">
                      {{ step.number }}
                    </div>
                  </div>
                  <p class="text-sm text-[var(--dark-brown)]/70 font-semibold tracking-wide uppercase" style="font-family: var(--font-secondary)">
                    {{ timelineLabel }}
                  </p>
                </div>
                <h3 class="text-xl text-[var(--dark-brown)] font-semibold leading-tight" style="font-family: var(--font-primary)">
                  <span v-for="(part, index) in splitMonths(step.title)" :key="`title-month-${step.number}-${index}`" :class="part.isMonth ? 'month-emphasis' : ''">
                    {{ part.text }}
                  </span>
                </h3>
                <p class="text-sm text-[var(--dark-brown)]/75 font-semibold" style="font-family: var(--font-secondary)">
                  <span v-for="(part, index) in splitMonths(step.duration)" :key="`duration-month-${step.number}-${index}`" :class="part.isMonth ? 'month-emphasis' : ''">
                    {{ part.text }}
                  </span>
                </p>
                <div class="mt-auto h-2 w-full rounded-full bg-gradient-to-r" :class="step.accent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section ref="stickySection" class="relative isolate w-full from-[var(--head-bg)] via-[#fbf0da] to-[#f4e8d8] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="absolute bottom-[-18%] left-[-12%] h-[340px] w-[380px] rounded-full bg-white/60 blur-3xl" />
          <div class="absolute right-[-12%] top-[-18%] h-[420px] w-[460px] rounded-full bg-[#f6e9db]/60 blur-3xl" />
        </div>
        <div class="relative mx-auto max-w-[1960px] px-6 py-16 lg:px-16 xl:px-24">
          <div class="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div ref="stickyColumn" class="relative">
              <div ref="stickyPanel" class="space-y-6">
                <div class="max-w-5xl">
                  <h2 class="text-4xl text-[var(--dark-brown)] font-semibold leading-tight lg:text-[44px]" style="font-family: var(--font-primary)">
                    {{ stepsTitle }}
                  </h2>
                  <p class="mt-4 text-lg text-[var(--dark-brown)]/80 leading-relaxed" style="font-family: var(--font-secondary)">
                    {{ stepsIntro }}
                  </p>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                  <picture>
                    <img src="/images/process/surrogacy-process-1.png" alt="Intended parent with clinician at surrogacy consultation" class="h-full w-full rounded-[18px] object-cover shadow-[0_14px_32px_rgba(64,84,120,0.12)]" loading="lazy" decoding="async">
                  </picture>
                  <picture>
                    <img src="/images/process/surrogacy-process-2.png" alt="Surrogate support moment during journey" class="h-full w-full rounded-[18px] object-cover shadow-[0_14px_32px_rgba(64,84,120,0.12)]" loading="lazy" decoding="async">
                  </picture>
                  <picture>
                    <img src="/images/process/surrogacy-process-3.png" alt="Surrogacy medical check and monitoring" class="h-full w-full rounded-[18px] object-cover shadow-[0_14px_32px_rgba(64,84,120,0.12)]" loading="lazy" decoding="async">
                  </picture>
                  <picture>
                    <img src="/images/process/surrogacy-process-4.png" alt="Doctor and intended parent reviewing embryo image" class="h-full w-full rounded-[18px] object-cover shadow-[0_14px_32px_rgba(64,84,120,0.12)]" loading="lazy" decoding="async">
                  </picture>
                </div>
              </div>
            </div>

            <div ref="stepsColumn" class="space-y-6">
              <div
                v-for="step in stepDetails"
                :key="step.id"
                class="relative overflow-hidden border border-white/70 rounded-[22px] from-[#f8efe3] via-[#fbf6ef] to-white bg-gradient-to-br shadow-[0_18px_40px_rgba(64,84,120,0.10)] transition-transform duration-300 hover:-translate-y-1"
              >
                <div class="absolute left-[-6%] top-[-10%] h-32 w-32 rounded-full bg-white/50 blur-3xl" />
                <div class="relative flex flex-col gap-4 p-6 md:p-8">
                  <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                    <div class="flex items-center gap-4">
                      <div class="h-12 w-12 flex items-center justify-center rounded-full bg-[var(--primary-brown)]/70 text-lg text-white shadow-[0_10px_22px_rgba(64,84,120,0.18)]" style="font-family: var(--font-primary)">
                        {{ step.id }}
                      </div>
                      <h3 class="text-xl text-[var(--dark-brown)] font-semibold leading-tight md:text-2xl" style="font-family: var(--font-primary)">
                        <span v-for="(part, index) in splitMonths(step.title)" :key="`detail-title-month-${step.id}-${index}`" :class="part.isMonth ? 'month-emphasis' : ''">
                          {{ part.text }}
                        </span>
                      </h3>
                    </div>
                  </div>
                  <div class="grid gap-4 md:grid-cols-[1.05fr_1.05fr_0.9fr]">
                    <div class="rounded-[14px] bg-[#f7ecde] p-4 shadow-[0_12px_24px_rgba(64,84,120,0.08)]">
                      <p class="text-xs text-[var(--dark-brown)]/70 font-semibold tracking-wide uppercase">
                        {{ whatYouDoLabel }}
                      </p>
                      <ul class="mt-2 text-sm text-[var(--dark-brown)]/85 leading-relaxed space-y-2" style="font-family: var(--font-secondary)">
                        <li v-for="item in step.you" :key="item">
                          - {{ item }}
                        </li>
                      </ul>
                    </div>
                    <div class="rounded-[14px] bg-white p-4 shadow-[0_12px_24px_rgba(64,84,120,0.08)] ring-1 ring-white/65">
                      <p class="text-xs text-[var(--dark-brown)]/70 font-semibold tracking-wide uppercase">
                        {{ whatWeDoLabel }}
                      </p>
                      <ul class="mt-2 text-sm text-[var(--dark-brown)]/85 leading-relaxed space-y-2" style="font-family: var(--font-secondary)">
                        <li v-for="item in step.we" :key="item">
                          - {{ item }}
                        </li>
                      </ul>
                    </div>
                    <div class="rounded-[14px] bg-white p-4 shadow-[0_12px_24px_rgba(64,84,120,0.08)] ring-1 ring-white/70">
                      <p class="text-xs text-[var(--dark-brown)]/70 font-semibold tracking-wide uppercase">
                        {{ outputsLabel }}
                      </p>
                      <ul class="mt-2 text-sm text-[var(--dark-brown)]/85 leading-relaxed space-y-2" style="font-family: var(--font-secondary)">
                        <li v-for="item in step.outputs" :key="item">
                          - {{ item }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative isolate w-full overflow-hidden from-[#f9f5ee] to-[var(--head-bg)] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute right-[-12%] top-[-16%] h-[320px] w-[360px] rounded-full bg-white/60 blur-3xl" />
          <div class="absolute bottom-[-18%] left-[-14%] h-[380px] w-[420px] rounded-full bg-[#efe2d3]/60 blur-3xl" />
        </div>
        <div class="relative mx-auto max-w-[1960px] px-6 py-16 lg:px-16 xl:px-24">
          <div class="border border-white/60 rounded-[22px] bg-white/75 p-8 shadow-[0_22px_48px_rgba(64,84,120,0.10)] backdrop-blur">
            <h2 class="text-4xl text-[var(--dark-brown)] font-semibold leading-tight lg:text-[44px]" style="font-family: var(--font-primary)">
              {{ changeTitle }}
            </h2>
            <p class="mt-3 text-base text-[var(--dark-brown)]/80 leading-relaxed" style="font-family: var(--font-secondary)">
              {{ changeCtaLine }}
            </p>
            <div class="grid mt-4 gap-6 lg:grid-cols-3">
              <div class="rounded-[16px] bg-white/85 p-5 shadow-[0_14px_30px_rgba(64,84,120,0.08)] ring-1 ring-white/55">
                <h3 class="text-lg text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
                  {{ changeCards[0].title }}
                </h3>
                <p class="mt-3 text-sm text-[var(--dark-brown)]/80 leading-relaxed" style="font-family: var(--font-secondary)">
                  {{ changeCards[0].body }}
                </p>
              </div>
              <div class="rounded-[16px] bg-white/85 p-5 shadow-[0_14px_30px_rgba(64,84,120,0.08)] ring-1 ring-white/55">
                <h3 class="text-lg text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
                  {{ changeCards[1].title }}
                </h3>
                <p class="mt-3 text-sm text-[var(--dark-brown)]/80 leading-relaxed" style="font-family: var(--font-secondary)">
                  {{ changeCards[1].body }}
                </p>
              </div>
              <div class="rounded-[16px] bg-white/85 p-5 shadow-[0_14px_30px_rgba(64,84,120,0.08)] ring-1 ring-white/55">
                <h3 class="text-lg text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
                  {{ changeCards[2].title }}
                </h3>
                <p class="mt-3 text-sm text-[var(--dark-brown)]/80 leading-relaxed" style="font-family: var(--font-secondary)">
                  {{ changeCards[2].body }}
                </p>
              </div>
            </div>
            <div class="mt-6 flex flex-wrap gap-4">
              <NuxtLink
                :to="localePath('/be-parents')"
                class="inline-flex items-center justify-center rounded-[14px] from-[var(--primary-brown)] to-[#7d5535] bg-gradient-to-r px-6 py-3 text-base text-white font-semibold shadow-[0_16px_38px_rgba(121,92,64,0.25)] transition-transform duration-200 hover:shadow-[0_20px_42px_rgba(121,92,64,0.35)] hover:-translate-y-0.5"
                style="font-family: var(--font-secondary)"
              >
                {{ changePrimary }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/surrogacy-cost')"
                class="inline-flex items-center justify-center border border-[var(--primary-brown)]/35 rounded-[14px] bg-white/75 px-6 py-3 text-base text-[var(--dark-brown)] font-semibold shadow-[0_14px_32px_rgba(48,58,72,0.10)] backdrop-blur-sm transition-transform duration-200 hover:bg-white hover:shadow-[0_18px_38px_rgba(48,58,72,0.18)] hover:-translate-y-0.5"
                style="font-family: var(--font-secondary)"
              >
                {{ changeSecondary }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <section class="relative isolate w-full from-[var(--head-bg)] via-[#fbf0da] to-[#f4e8d8] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0 overflow-hidden">
          <div class="absolute left-[-10%] top-[-18%] h-[320px] w-[360px] rounded-full bg-white/60 blur-3xl" />
          <div class="absolute bottom-[-20%] right-[-12%] h-[380px] w-[420px] rounded-full bg-[#f1e4d6]/60 blur-3xl" />
        </div>
        <div class="relative mx-auto max-w-[1960px] px-6 py-16 lg:px-16 xl:px-24">
          <div class="border border-white/60 rounded-[26px] bg-white/80 p-8 shadow-[0_22px_48px_rgba(64,84,120,0.10)] backdrop-blur">
            <h2 class="text-4xl text-[var(--dark-brown)] font-semibold leading-tight lg:text-[44px]" style="font-family: var(--font-primary)">
              {{ faqTitle }}
            </h2>
            <div class="mt-6 space-y-4">
              <details
                v-for="(faq, index) in faqList"
                :key="faq.q"
                class="group border border-white/60 rounded-[16px] bg-white/90 p-5 shadow-[0_12px_26px_rgba(64,84,120,0.08)]"
              >
                <summary class="cursor-pointer list-none text-lg text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
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
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
.month-emphasis {
  font-size: 1.3em;
  font-weight: 600;
}
</style>

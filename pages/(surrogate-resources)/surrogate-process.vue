<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import SurrogateStepsComponent from '@/components/surrogacy/process/SurrogateStepsComponent.vue'
import { buildCoreServicePageSchemas } from '~/utils/schema'

const { locale } = useI18n()
const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en: string, zh: string) => (isZh.value ? zh : en)

const pageTitle = computed(() =>
  tt(
    'Surrogacy Process Step by Step | IVF, Legal & Timeline Guide',
    '代孕流程分步指南｜IVF、法律与时间线',
  ),
)
const pageDescription = computed(() =>
  tt(
    'Learn the surrogacy process step by step: screening, legal contracts, IVF, pregnancy, and birth for intended parents and surrogates.',
    '了解代孕流程的每一步——从筛查与法律合同到 IVF、妊娠与分娩。本指南说明代孕在加州及全美如何为意向父母与代孕妈妈运作。',
  ),
)

useHead(() => ({
  title: pageTitle.value,
  meta: [
    {
      name: 'description',
      content: pageDescription.value,
    },
    {
      property: 'og:title',
      content: pageTitle.value,
    },
    {
      property: 'og:description',
      content: pageDescription.value,
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'keywords',
      content: tt(
        'surrogate mother, gestational surrogacy, Surrogate process, IVF, embryo transfer, surrogacy requirements, become a surrogate',
        '代孕妈妈, 妊娠代孕, 代孕流程, IVF, 胚胎移植, 代孕要求, 成为代孕妈妈',
      ),
    },
  ],
}))
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const readinessPillars = computed(() => [
  {
    title: tt('Legal clarity & consent', '法律清晰与同意机制'),
    body: tt(
      'Law comes first. Independent attorneys explain consent, risks, privacy, and parentage. California courts support gestational surrogacy well. Many families choose a pre-birth order. That choice keeps delivery clean. This answers what is the surrogacy process on the legal side.',
      '法律优先。独立律师会解释同意、风险、隐私与亲权。加州法院对妊娠代孕支持充分，许多家庭选择产前亲权裁定，使分娩更清晰顺畅。这回答了代孕流程的法律部分。',
    ),
  },
  {
    title: tt('Financial transparency & safety', '财务透明与安全'),
    body: tt(
      'Money and safety matter too. SeedTrust runs escrow. The team releases funds by milestones. ART Risk guides insurance. That keeps the surrogacy steps transparent and fair.',
      '资金与安全同样重要。SeedTrust 负责托管，团队按里程碑拨款，ART Risk 指导保险，让代孕流程透明且公平。',
    ),
  },
  {
    title: tt('Medical & lab planning', '医疗与实验室规划'),
    body: tt(
      'Now the clinic plan. Doctors and nurses show how is surrogacy performed in modern care. They design meds and timing. Labs build embryos. The ivf surrogacy process covers stimulation (if needed), retrieval, fertilization, and culture. The ivf surrogacy procedure sets transfer day. That is how does a surrogate mother get pregnant in a clinical sense—through embryo transfer, not intercourse.',
      '进入诊所计划。医生与护士说明现代代孕如何进行，制定用药与时间表，实验室完成胚胎培养。IVF 代孕流程包含促排（如需）、取卵、受精与培养，最终确定移植日。临床上代孕妈妈通过胚胎移植怀孕，而非自然受孕。',
    ),
  },
  {
    title: tt('Emotional readiness & support', '情感准备与支持'),
    body: tt(
      'Emotions shape the journey. A counselor teaches tools for boundaries, stress, and family talk. A case manager sends weekly updates. Everyone knows the next surrogacy step and the owner. That’s how surrogacy works in real life: clear roles, short checklists and kind support',
      '情绪影响整个旅程。咨询师会提供边界、压力与家庭沟通的工具；项目经理每周更新，让每个人都清楚下一步与负责人。这就是现实中的代孕：角色清晰、清单简洁、支持温和。',
    ),
  },
])

const softCtas = computed(() => [
  {
    label: tt('See the surrogacy process for intended parents', '查看意向父母的代孕流程'),
    description: tt('Book a consult and map the surrogacy process step by step for your timeline.', '预约咨询，按你的时间线梳理代孕流程。'),
    link: '/be-parents',
  },
  {
    label: tt('See the surrogacy process from the surrogate’s side (U.S. citizens, California preferred)', '从代孕妈妈角度了解流程（美国公民优先、加州优先）'),
    description: tt('Check eligibility and see what is the process for surrogacy from your side.', '查看资格并了解你这边的代孕流程。'),
    link: '/be-surrogate',
  },
])

const timelinePhases = computed(() => [
  {
    id: 1,
    label: tt('Week 1–3', '第 1–3 周'),
    title: tt('Intro & Pre-Screen', '介绍与初筛'),
    summary: tt(
      'Share goals, OB records, and clinic options. Pick a path for the surrogacy process for intended parents.',
      '分享目标、产科记录与诊所选择，为意向父母确定代孕路径。',
    ),
  },
  {
    id: 2,
    label: tt('Month 1–3', '第 1–3 个月'),
    title: tt('Full Screening & Matching', '全面筛查与匹配'),
    summary: tt(
      'Labs, ultrasound, and psych consult for the surrogate mother. Values and birth plan align.',
      '完成化验、超声与心理咨询，匹配价值观与分娩计划。',
    ),
  },
  {
    id: 3,
    label: tt('Month 2–4', '第 2–4 个月'),
    title: tt('Legal & Escrow', '法律与托管'),
    summary: tt(
      'Independent counsel drafts and signs. SeedTrust funds the account. Attorneys prep parentage orders.',
      '独立律师起草并签署合同，SeedTrust 托管资金，律师准备亲权裁定。',
    ),
  },
  {
    id: 4,
    label: tt('Month 3–5', '第 3–5 个月'),
    title: tt('IVF Build & Transfer', 'IVF 方案与移植'),
    summary: tt(
      'The lab runs the ivf Surrogate process. Doctors schedule lining checks and the ivf surrogacy procedure for transfer.',
      '实验室开展 IVF 代孕流程，医生安排内膜检查与移植流程。',
    ),
  },
  {
    id: 5,
    label: tt('Month 5–14', '第 5–14 个月'),
    title: tt('Pregnancy Care', '孕期照护'),
    summary: tt(
      'OB visits and ultrasound milestones. Case manager sends weekly notes. Insurance team supports claims.',
      '产检与超声里程碑，项目经理每周更新，保险团队协助理赔。',
    ),
  },
  {
    id: 6,
    label: tt('Birth + 2–6 Weeks', '分娩 + 2–6 周'),
    title: tt('Post-Birth Legal', '产后法律流程'),
    summary: tt(
      'Hospital follows the plan. Lawyers complete orders and the birth certificate. Family travels home.',
      '医院按计划执行，律师完成裁定与出生证明，家庭回家。',
    ),
  },
])

const flowchartStages = computed(() => [
  {
    id: 1,
    title: tt('Inquiry → Pre-screen', '咨询 → 预筛'),
    parents: tt('Parents share goals and clinic choices.', '意向父母分享目标与诊所选择。'),
    surrogates: tt('The surrogate mother shares OB records and lifestyle notes.', '代孕妈妈提供产科记录与生活方式信息。'),
    summary: tt('Team sets the surrogacy steps and timing.', '团队明确代孕步骤与时间线。'),
  },
  {
    id: 2,
    title: tt('Screening → Matching', '筛查 → 匹配'),
    parents: tt('Labs, ultrasound, and psych consults.', '化验、超声与心理咨询。'),
    surrogates: tt('Values and birth plan align.', '匹配价值观与分娩计划。'),
    summary: tt('Gestational carrier process.', '妊娠代孕流程。'),
  },
  {
    id: 3,
    title: tt('Legal → Escrow', '法律 → 托管'),
    parents: tt('Independent attorneys draft and sign.', '独立律师起草并签署。'),
    surrogates: tt('SeedTrust opens escrow with milestone releases.', 'SeedTrust 开设托管并按里程碑支付。'),
    summary: tt('Surrogacy legal process in place.', '代孕法律流程完成。'),
  },
  {
    id: 4,
    title: tt('IVF build → Transfer', 'IVF 方案 → 移植'),
    parents: tt('The lab runs surrogacy in vitro fertilization.', '实验室完成 IVF 代孕流程。'),
    surrogates: tt('Doctors schedule the ivf surrogacy procedure.', '医生安排 IVF 代孕移植流程。'),
    summary: tt('This is how surrogacy is performed in real clinics.', '这是代孕在临床中的实际执行方式。'),
  },
  {
    id: 5,
    title: tt('Pregnancy care → Updates', '孕期照护 → 更新'),
    parents: tt('OB visits and ultrasound milestones.', '产检与超声里程碑。'),
    surrogates: tt('Case manager sends weekly notes.', '项目经理每周更新。'),
    summary: tt('Steady surrogate pregnancy process, steady smiles.', '稳定的孕期流程，稳定的微笑。'),
  },
  {
    id: 6,
    title: tt('Delivery → Parentage → Home', '分娩 → 亲权 → 回家'),
    parents: tt('Hospital follows the plan.', '医院按计划执行。'),
    surrogates: tt('Attorneys finish orders and the birth certificate.', '律师完成裁定与出生证明。'),
    summary: tt('Family goes home. The surrogate mother rests with support.', '家庭回家，代孕妈妈得到支持与休息。'),
  },
])

const checklistItems = computed(() => [
  tt('Send records; confirm clinic; map the surrogacy process step by step', '提交病历；确认诊所；梳理代孕步骤'),
  tt('Complete labs, ultrasound, psych consult', '完成化验、超声与心理咨询'),
  tt('Match meeting; confirm values and birth plan', '匹配沟通；确认价值观与分娩计划'),
  tt('Sign contracts; fund escrow; file parentage plan', '签署合同；托管资金；提交亲权方案'),
  tt('Meds delivered; monitoring set for surrogate IVF', '药物到位；设置 IVF 监测'),
  tt('Transfer day; beta test; first heartbeat scan', '移植日；血检；首次心跳'),
  tt('OB calendar saved; insurance claims ready', '产检日历确认；保险理赔准备'),
  tt('Hospital tour; delivery preferences on file', '医院参观；分娩偏好备案'),
  tt('Birth; order complete; documents stored', '分娩；裁定完成；文件归档'),
])

const faqItems = computed(() => [
  {
    question: tt('How does surrogacy work?', '代孕是如何进行的？'),
    answer: tt(
      'In surrogacy, intended parents work with a fertility clinic and a surrogate mother. The surrogacy process includes screening, matching, legal contracts, IVF, pregnancy and birth. Everyone has clear roles and protections at each step.',
      '代孕中，意向父母与生殖诊所和代孕妈妈合作。流程包含筛查、匹配、法律合同、IVF、妊娠与分娩。每一步都有清晰角色与保障。',
    ),
  },
  {
    question: tt('What is the surrogacy process, step by step?', '代孕流程具体分几步？'),
    answer: tt(
      'The surrogacy process step by step is simple to follow. First comes screening and matching. Then you sign contracts, complete IVF surrogacy treatment, go through pregnancy and delivery, and finish parentage paperwork.',
      '代孕流程清晰易懂：先筛查与匹配，然后签署合同、完成 IVF 治疗、经历妊娠与分娩，最后完成亲权文件。',
    ),
  },
  {
    question: tt('What does a surrogate mother do?', '代孕妈妈需要做什么？'),
    answer: tt(
      'A surrogate mother carries a baby for intended parents who cannot carry a pregnancy. She follows medical advice, takes medications for IVF and surrogacy, and attends all key appointments. She does not use her own eggs in a gestational surrogacy program.',
      '代孕妈妈为无法自行怀孕的意向父母孕育孩子。她遵循医疗建议，进行 IVF 与代孕相关用药并参加关键就诊。在妊娠代孕中，她不使用自己的卵子。',
    ),
  },
  {
    question: tt('How does a surrogate mother get pregnant?', '代孕妈妈如何怀孕？'),
    answer: tt(
      'In modern care, a surrogate mother gets pregnant through embryo transfer, not intercourse. Doctors place an embryo created in the lab into the surrogate’s uterus during the IVF surrogate process. Hormone medications help prepare her body for pregnancy.',
      '现代代孕通过胚胎移植实现怀孕，而非自然受孕。医生在 IVF 过程中将实验室形成的胚胎移植入子宫，激素用药帮助身体准备妊娠。',
    ),
  },
  {
    question: tt('How much does a gestational carrier cost?', '妊娠代孕费用大概多少？'),
    answer: tt(
      'The cost of a gestational carrier and surrogate mother cost in USA varies by state, clinic, agency and insurance. Total costs include base compensation, medical fees, legal work and program support. We walk through typical ranges and budget tips in our separate surrogacy cost guide.',
      '妊娠代孕费用因州、诊所、机构与保险而异。总成本包含基础补偿、医疗费用、法律与项目支持。我们在代孕费用指南中提供常见区间与预算建议。',
    ),
  },
])

const surrogateProcessItemNames = [
  'Initial Consultation & Eligibility Review',
  'Legal Consultation & Contract Formation',
  'Medical Screening & IVF Preparation',
  'Embryo Transfer & Confirmation of Pregnancy',
  'Pregnancy Monitoring & Emotional Support',
  'Delivery & Post-Birth Legal Steps',
]

const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: '/surrogate-process',
  name: 'Surrogacy Process: Step-by-Step Guide for Parents and Surrogates',
  description: pageDescription.value,
  about: 'Gestational surrogacy process for parents and gestational carriers',
  audience: 'Intended parents and prospective gestational carriers',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  service: {
    name: 'Gestational Surrogacy Process Guidance',
    serviceType: 'Gestational surrogacy process education and coordination',
    areaServed: ['California', 'United States', 'International intended parents'],
    audience: 'Intended parents and prospective gestational carriers',
    description: 'Step-by-step guidance for the gestational surrogacy process, including consultation, eligibility review, legal contracts, medical screening, IVF preparation, embryo transfer, pregnancy monitoring, delivery planning, and post-birth legal steps.',
  },
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'For Surrogates', url: '/surrogates' },
    { name: 'Detailed Surrogate Guides', url: '/surrogates' },
    { name: 'Transfer & Legal Steps', url: '/surrogate-process' },
  ],
  faqs: faqItems.value,
  itemList: {
    name: '6 Steps in the Surrogate Process',
    items: surrogateProcessItemNames.map((name, index) => ({
      position: index + 1,
      name,
      description: timelinePhases.value[index]?.summary,
      url: '/surrogate-process',
    })),
  },
}))

useHead(() => ({
  script: coreServicePageSchemas.value.map((schema, index) => ({
    key: `schema-surrogate-process-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))

const expandedFaq = ref<number | null>(0)

function toggleFaq(index: number) {
  expandedFaq.value = expandedFaq.value === index ? null : index
}

const resourceCategories = computed(() => [
  {
    title: tt('Medical & Legal Guides', '医疗与法律指南'),
    items: [
      tt('Medical guidance on IVF and pregnancy care.', 'IVF 与孕期照护的医疗指引。'),
      tt('Legal primers on parentage orders and documents.', '亲权裁定与法律文件的基础说明。'),
      tt('Plain-language answers to what is the process of surrogacy and the gestational carrier process.', '用通俗语言解释代孕流程与妊娠代孕流程。'),
    ],
  },
  {
    title: tt('Language & Access', '术语与快速入口'),
    items: [
      tt('Download short guides: how is surrogacy performed, the surrogacy process step by step, and the surrogacy legal process. See who does what at each step.', '下载简明指南：代孕如何进行、代孕步骤、代孕法律流程，清楚了解每一步谁负责什么。'),
      tt('Quick definitions for what is gestational carrier, whose eggs are used in surrogacy, and in surrogacy who is the biological father. Each term links to the right step.', '快速了解：什么是妊娠代孕、代孕使用的卵子来源、代孕中生物学父亲是谁，并链接到相应步骤。'),
    ],
  },
])

const yundaHighlights = computed(() => [
  {
    title: tt('A Trusted U.S. Surrogacy Partner Based in California', '值得信赖的加州代孕伙伴'),
    body: tt(
      'We know the courts and clinics. We guide families and surrogate mothers through the surrogacy steps with calm, clear updates.',
      '我们熟悉法院与诊所，以清晰更新引导意向父母与代孕妈妈完成每一步。',
    ),
  },
  {
    title: tt('Medical & Legal Excellence Under One Roof', '医疗与法律一站式支持'),
    body: tt(
      'We work with respected fertility centers and seasoned attorneys. We stand beside you during screening, the ivf surrogacy process, and delivery. We show how is surrogacy performed in real life, not just on paper.',
      '我们与优质生殖中心及资深律师合作，从筛查到 IVF 再到分娩全程陪伴，让流程落实到真实执行。',
    ),
  },
  {
    title: tt('Transparent Process & Escrow Security', '流程透明与托管安全'),
    body: tt(
      'SeedTrust manages escrow. ART Risk supports insurance. Milestones stay on time. Payments stay clear. The surrogacy process stays fair.',
      'SeedTrust 管理托管，ART Risk 支持保险，里程碑按时推进，支付清晰透明，流程公平可靠。',
    ),
  },
  {
    title: tt('Dedicated Project Managers & Weekly Updates', '专属项目经理与周更新'),
    body: tt(
      'One case manager owns your file. We send weekly notes. We keep the surrogacy process step by step on track for intended parents and for the surrogate mother.',
      '专属项目经理负责你的档案，每周更新，确保意向父母与代孕妈妈按步骤推进。',
    ),
  },
])

const journeyInvites = computed(() => [
  tt('Intended Parents: Get your plan for the surrogacy process for intended parents.', '意向父母：获取专属代孕流程计划。'),
  tt('Surrogates (U.S. citizens, California preferred): Join a respectful surrogate program. Learn what does a surrogate do to get pregnant in IVF. See real support, not hype.', '代孕妈妈（美国公民、加州优先）：加入尊重与支持并重的项目，了解 IVF 中代孕妈妈需要做什么。'),
])

const surrogacySteps = computed(() => [
  {
    id: 1,
    title: tt('Initial Consultation & Eligibility Review', '初次咨询与资格评估'),
    duration: tt('Week 1–3', '第 1–3 周'),
    description: tt(
      'A coordinator opens the file and sets goals. The team listens first. We review timelines, clinics, and legal paths in the surrogacy in the United States context. For the surrogate mother, we outline the process to become a surrogate mother in plain steps. We welcome U.S. citizens and prefer California residents for fast access to care.',
      '协调员建立档案并设定目标，团队先倾听后规划。我们在美国代孕背景下梳理时间线、诊所与法律路径。对于代孕妈妈，我们以清晰步骤说明如何成为代孕妈妈。我们欢迎美国公民，并优先加州居民以便快速就医。',
    ),
    activities: [
      tt('Align goals and timelines for parents and surrogate mother.', '统一意向父母与代孕妈妈的目标与时间线。'),
      tt('Outline clinics, legal paths, and program expectations in calm language.', '用清晰语言说明诊所、法律路径与项目期望。'),
      tt('Review pre-screen records and ensure both tracks feel supported.', '审核初筛资料，确保双方都被支持。'),
    ],
    details: tt(
      'Focus of this step: align values, set expectations, and answer what is the process for surrogacy without stress.',
      '本步骤重点：对齐价值观、设定预期、无压力解释代孕流程。',
    ),
    sections: [
      {
        heading: tt('Surrogate eligibility (US citizens, California preferred)', '代孕资格（美国公民、加州优先）'),
        items: [
          tt('Prior healthy birth, steady home, and supportive partner or family.', '有健康分娩史、稳定家庭与支持系统。'),
          tt('Clean medical history and healthy BMI.', '病史清晰、BMI 健康。'),
          tt('Clear consent to the surrogate program terms and calendar.', '明确同意项目条款与时间表。'),
        ],
      },
      {
        heading: tt('Intended parent profile & expectations', '意向父母画像与期望'),
        items: [
          tt('Fertility history, embryo status, donor needs, and clinic choice.', '生育史、胚胎状态、供卵/供精需求与诊所选择。'),
          tt('Budget windows and escrow plan.', '预算范围与托管计划。'),
          tt('Early view of the surrogacy process for intended parents.', '提前了解意向父母端的代孕流程。'),
        ],
      },
    ],
    softCtas: [
      tt('Surrogates: Start the surrogate mother program pre-screen.', '代孕妈妈：开始项目预筛。'),
      tt('Parents: Book a consult to see the surrogacy process step by step.', '意向父母：预约咨询了解流程。'),
    ],
  },
  {
    id: 2,
    title: tt('Legal Consultation & Contract Formation', '法律咨询与合同制定'),
    duration: tt('Month 2–4', '第 2–4 个月'),
    description: tt(
      'Independent attorneys guide every talk. They protect privacy, consent, and hospital plans. They also map parentage for California and other states. Clear contracts keep the surrogacy steps safe and fair.',
      '独立律师引导所有沟通，保护隐私、同意与医院计划，并规划加州及其他州的亲权路径。清晰合同保障流程安全公平。',
    ),
    activities: [
      tt('Host legal briefings with independent counsel for all parties.', '为各方安排独立法律说明会。'),
      tt('Document consent, hospital plans, and confidentiality expectations.', '记录同意事项、医院计划与保密要求。'),
      tt('Launch parentage strategy tailored to state requirements.', '启动符合州要求的亲权策略。'),
    ],
    details: tt('Legal agreements outline rights, confidentiality, and obligations.', '法律协议明确权利、保密与义务。'),
    sections: [
      {
        heading: tt('Legal agreements outline rights, confidentiality, and obligations', '法律协议明确权利、保密与义务'),
        items: [
          tt('Decision authority for pregnancy care and delivery.', '妊娠与分娩的决策权。'),
          tt('Travel, bed rest, multiples, and C-section plans.', '出行、卧床、多胎与剖宫产计划。'),
          tt('Clear support for wellness and time off.', '健康支持与休息安排。'),
        ],
      },
      {
        heading: tt('Parentage order preparation (U.S. state-specific overview)', '亲权裁定准备（美国州别说明）'),
        items: [
          tt('Attorneys draft filings early.', '律师提前准备文件。'),
          tt('Many California cases use a pre-birth order.', '加州多采用产前裁定。'),
          tt('Orders help families becoming a parent through surrogacy without delays.', '裁定可帮助家庭顺利成为父母，减少延误。'),
        ],
      },
    ],
    softCtas: [
      tt('Surrogates: Meet an attorney for a friendly walk-through of the surrogacy legal process.', '代孕妈妈：与律师沟通，了解代孕法律流程。'),
      tt('Parents: Ask about surrogacy laws United States that fit your case.', '意向父母：咨询适用的美国代孕法律。'),
    ],
  },
  {
    id: 3,
    title: tt('Medical Screening & IVF Preparation', '医学筛查与 IVF 准备'),
    duration: tt('Month 1–3', '第 1–3 个月'),
    description: tt(
      'Clinics run full screening before any cycle. Doctors check labs and uterine health. A psychologist meets the surrogate mother to confirm readiness and support. Counselors explain what does a surrogate mother do in day-to-day life during treatment.',
      '诊所在进入周期前完成全面筛查，医生检查化验与子宫健康。心理师评估代孕妈妈的准备情况并提供支持，咨询师说明治疗期间的日常事项。',
    ),
    activities: [
      tt('Complete health, lab, and psychological evaluations for the surrogate mother.', '完成代孕妈妈的健康、化验与心理评估。'),
      tt('Coordinate insurance review for surrogate mother health insurance options.', '协调代孕妈妈保险方案审核。'),
      tt('Finalize IVF medication calendar and embryo creation plan.', '确定 IVF 用药日历与胚胎创建计划。'),
    ],
    details: tt('Health, lab, and psychological evaluations.', '健康、化验与心理评估。'),
    sections: [
      {
        heading: tt('Health, lab, and psychological evaluations', '健康、化验与心理评估'),
        items: [
          tt('OB records review, infectious-disease panel, ultrasound.', '产科记录审核、传染病筛查与超声。'),
          tt('Mental health consult and lifestyle check.', '心理咨询与生活方式评估。'),
          tt('Insurance advisors review surrogate mother health insurance options.', '保险顾问评估代孕妈妈保险方案。'),
        ],
      },
      {
        heading: tt('IVF and embryo creation (donor egg/sperm if needed)', 'IVF 与胚胎创建（必要时供卵/供精）'),
        items: [
          tt('Teams plan the ivf and surrogacy calendar with clear meds and monitoring.', '团队制定 IVF 与代孕日历，明确用药与监测。'),
          tt('The lab builds embryos: parental gametes first; surrogacy with donor egg when needed.', '实验室优先使用意向父母配子，必要时使用供卵。'),
          tt('Doctors answer whose eggs are used in surrogacy, then align on consent and next steps.', '医生解释卵子来源，确认同意与下一步。'),
          tt('This forms the core gestational surrogacy procedure and surrogacy in vitro fertilization plan.', '构成妊娠代孕与 IVF 核心流程。'),
        ],
      },
    ],
    softCtas: [
      tt('Surrogates: Confirm coverage and travel timing with a coordinator.', '代孕妈妈：与协调员确认保险与出行安排。'),
      tt('Parents: Lock your clinic and embryo plan for a clean handoff.', '意向父母：确认诊所与胚胎计划。'),
    ],
  },
  {
    id: 4,
    title: tt('Embryo Transfer & Confirmation of Pregnancy', '胚胎移植与妊娠确认'),
    duration: tt('Month 3–5', '第 3–5 个月'),
    description: tt(
      'Doctors schedule the lining check and the transfer day. Nurses keep meds simple. The lab prepares embryos. The physician completes surrogate IVF with a calm, focused routine.',
      '医生安排内膜检查与移植日，护士简化用药流程，实验室准备胚胎，医生完成 IVF 移植。',
    ),
    activities: [
      tt('Coordinate lining reviews, embryo prep, and transfer details.', '协调内膜评估、胚胎准备与移植细节。'),
      tt('Guide medication adherence and post-transfer recovery.', '指导用药依从与移植后恢复。'),
      tt('Document beta-hCG results and first scan updates for both tracks.', '记录血检结果与首次超声更新。'),
    ],
    details: tt('Uterine lining prep, transfer, and pregnancy test.', '内膜准备、移植与妊娠检测。'),
    sections: [
      {
        heading: tt('Uterine lining prep, transfer, and pregnancy test', '内膜准备、移植与妊娠检测'),
        items: [
          tt('Lining review, embryo thaw or selection, and transfer.', '内膜评估、胚胎解冻/选择与移植。'),
          tt('Beta-hCG confirms the result 9–12 days later.', '9–12 天后通过 β-hCG 确认结果。'),
          tt('This is how a surrogate mother gets pregnant in modern care—through embryo transfer, not intercourse.', '现代代孕通过胚胎移植怀孕，而非自然受孕。'),
          tt('Clinics teach what does a surrogate do to get pregnant: follow meds, rest, and scan on time.', '诊所会指导代孕妈妈按时用药、休息与检查。'),
        ],
      },
      {
        heading: tt('Ongoing medical communication between clinic and agency', '诊所与机构的持续沟通'),
        items: [
          tt('The case manager sends weekly notes after the first scan.', '首次超声后，项目经理每周更新。'),
          tt('Everyone sees the same dates and the same surrogacy steps.', '各方共享同一时间表与流程节点。'),
          tt('The ivf surrogacy process stays calm and organized.', 'IVF 代孕流程有序且稳定。'),
        ],
      },
    ],
    softCtas: [
      tt('Surrogates: Save your scan schedule and wellness tips.', '代孕妈妈：保存检查日程与健康提示。'),
      tt('Parents: Prepare a hospital pre-registration and a birth-day plan.', '意向父母：准备医院预登记与分娩计划。'),
    ],
  },
  {
    id: 5,
    title: tt('Pregnancy Monitoring & Emotional Support', '孕期监测与情感支持'),
    duration: tt('Month 5–14', '第 5–14 个月'),
    description: tt(
      'Prenatal care follows standard OB rules. Ultrasounds mark growth and health. A counselor supports boundaries, family talk, and stress control. The surrogate pregnancy process stays caring and steady.',
      '产检遵循标准产科流程，超声记录生长与健康。咨询师支持边界、家庭沟通与压力管理，孕期流程稳定且温和。',
    ),
    activities: [
      tt('Track OB appointments, ultrasound milestones, and lab requirements.', '跟踪产检、超声里程碑与化验要求。'),
      tt('Offer emotional health check-ins and support resources.', '提供情绪关怀与支持资源。'),
      tt('Coordinate insurance claims and intended parent updates.', '协调保险理赔与意向父母更新。'),
    ],
    details: tt('Regular medical checkups, ultrasound schedule.', '定期产检与超声安排。'),
    sections: [
      {
        heading: tt('Regular medical checkups, ultrasound schedule', '常规产检与超声安排'),
        items: [
          tt('Heartbeat scan, NT scan, anatomy scan, growth scans as needed.', '心跳、NT、结构超声与生长监测。'),
          tt('Clear reminders for glucose tests, vaccines, and travel windows.', '提醒糖筛、疫苗与出行窗口期。'),
          tt('A calm gestational carrier pregnancy helps everyone.', '平稳的妊娠代孕对大家都有益。'),
        ],
      },
      {
        heading: tt('Surrogate wellness support and insurance coverage', '代孕妈妈健康支持与保险覆盖'),
        items: [
          tt('Mental health check-ins and lactation support if desired.', '心理关怀与泌乳支持（如需）。'),
          tt('Advisors manage claims under surrogate mother health insurance.', '顾问协助保险理赔。'),
          tt('Parents plan first-hours bonding for babies born through surrogacy.', '意向父母规划宝宝出生后初期陪伴。'),
        ],
      },
    ],
    softCtas: [
      tt('Surrogates: Join the wellness chat and keep your sleep and nutrition strong.', '代孕妈妈：加入健康群，保持睡眠与营养。'),
      tt('Parents: Book the hospital tour and set a newborn plan.', '意向父母：预约医院参观并制定新生儿计划。'),
    ],
  },
  {
    id: 6,
    title: tt('Delivery & Post-Birth Legal Steps', '分娩与产后法律步骤'),
    duration: tt('Birth + 2–6 Weeks', '分娩 + 2–6 周'),
    description: tt(
      'The team finalizes the birth plan early. The hospital knows the legal names and the parentage path. Attorneys finish filings and guide the birth certificate request. This closes the gestational surrogacy process with clarity.',
      '团队提前完成分娩计划，医院明确法定姓名与亲权路径。律师完成文件并指导出生证明申请，流程清晰收尾。',
    ),
    activities: [
      tt('Coordinate hospital logistics, travel, and bonding preferences.', '协调医院流程、出行与陪伴偏好。'),
      tt('Ensure legal parentage documents and filings are completed.', '确立法律亲权文件并完成申请。'),
      tt('Offer gentle close-out support for surrogate mother and intended parents.', '为代孕妈妈与意向父母提供温和收尾支持。'),
    ],
    details: tt('Hospital coordination & intended parents’ presence.', '医院协调与意向父母在场安排。'),
    sections: [
      {
        heading: tt('Hospital coordination & intended parents’ presence', '医院协调与意向父母在场'),
        items: [
          tt('Packing lists, room plans, and bonding steps.', '行李清单、病房安排与亲密互动流程。'),
          tt('Nurses support skin-to-skin time and photos.', '护士协助肌肤接触与拍照。'),
          tt('The surrogacy steps cover privacy and respectful good-byes.', '流程涵盖隐私与尊重的告别。'),
        ],
      },
      {
        heading: tt('Legal parentage establishment and return home', '亲权确立与回家'),
        items: [
          tt('Attorneys complete orders and vital records.', '律师完成裁定与关键文件。'),
          tt('Counselors offer a gentle close for the surrogate mother.', '咨询师为代孕妈妈提供情感收尾。'),
          tt('Parents travel home as a family. Lawyers answer common questions, like in surrogacy who is the biological father (the genetic father on record).', '家庭顺利回家，律师解答常见问题，如代孕中的生物学父亲（记录中的遗传父亲）。'),
        ],
      },
    ],
    softCtas: [
      tt('Surrogates: Share feedback to improve the surrogate program for the next journey.', '代孕妈妈：反馈建议，优化未来流程。'),
      tt('Parents: Store all legal papers and pediatric notes in one folder for travel.', '意向父母：整理法律与儿科文件，便于出行。'),
    ],
  },
])

const activeStep = ref(1)

function setActiveStep(stepId: number) {
  activeStep.value = stepId
}
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)]">
    <AppHeader />
    <BreadcrumbNav
      :items="[
        { to: '/surrogates', label: locale === 'zh' ? '代孕妈妈' : 'For Surrogates' },
        { to: '/surrogates', label: locale === 'zh' ? '代孕妈妈补充指南' : 'Detailed Surrogate Guides' },
        { label: locale === 'zh' ? '移植与法律步骤' : 'Transfer & Legal Steps' },
      ]"
    />

    <!-- Hero / Overview -->
    <section class="relative overflow-hidden bg-white py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p class="mb-3 inline-flex items-center rounded-full bg-[var(--yunda-petal)] px-4 py-1 text-sm text-[var(--primary-brown)] tracking-wide uppercase">
              {{ tt('Surrogacy process guide', '代孕流程指南') }}
            </p>
            <h1 class="mb-8 text-4xl text-[var(--yunda-bark)] font-bold md:text-6xl" >
              {{ tt('Surrogacy Process: Step-by-Step Guide for Parents and Surrogates', '代孕流程：意向父母与代孕妈妈的分步指南') }}
            </h1>
            <div class="text-lg text-[var(--primary-brown)] leading-relaxed space-y-5 md:text-xl">
              <p>
                {{ tt('In a typical gestational surrogacy process, you move through six stages: screening, matching, legal contracts, IVF and embryo transfer, pregnancy and delivery, then post-birth legal steps. This guide walks through each step in plain language so intended parents and surrogate mothers know what to expect at every stage.', '典型的妊娠代孕流程包括六个阶段：筛查、匹配、法律合同、IVF 与胚胎移植、妊娠与分娩，以及产后法律步骤。本指南用清晰语言逐步说明，让意向父母与代孕妈妈清楚每一步的预期。') }}
              </p>
            </div>
          </div>
          <div class="relative">
            <div class="overflow-hidden rounded-3xl bg-[var(--yunda-petal)] p-3 shadow-2xl">
              <img
                src="/images/pages/surrogate-process/hero.jpg"
                :alt="tt('Surrogacy journey in California', '加州代孕旅程')"
                class="h-full w-full rounded-2xl object-cover"
              >
            </div>
            <div class="absolute hidden w-[240px] border border-white/70 rounded-2xl bg-white/90 p-6 text-sm text-[var(--primary-brown)] leading-relaxed shadow-lg backdrop-blur -bottom-8 -right-6 md:block">
              {{ tt('A shared plan reduces stress. A shared plan builds trust.', '共享计划减轻压力，建立信任。') }}
            </div>
          </div>
        </div>
      </div>
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-40 from-[var(--yunda-petal)] to-transparent bg-gradient-to-t" />
    </section>

    <!-- Readiness Pillars -->
    <section class="bg-[var(--yunda-petal)] py-24">
      <div class="container mx-auto max-w-6xl px-4">
        <div class="mx-auto mb-14 max-w-3xl text-center">
          <h2 class="text-4xl text-[var(--yunda-bark)] font-bold md:text-5xl" >
            {{ tt('Legal, Medical & Emotional Readiness', '法律、医疗与情感准备') }}
          </h2>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          <div
            v-for="pillar in readinessPillars"
            :key="pillar.title"
            class="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-shadow hover:shadow-2xl"
          >
            <div class="absolute inset-y-0 left-0 w-1 rounded-full bg-[var(--yunda-bark)] opacity-60" />
            <h3 class="mb-4 text-2xl text-[var(--yunda-bark)] font-semibold" >
              {{ pillar.title }}
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              {{ pillar.body }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Soft CTA Section -->
    <section class="bg-white py-20">
      <div class="container mx-auto max-w-6xl px-4">
        <div class="mx-auto mb-12 max-w-3xl text-center">
          <h2 class="text-4xl text-[var(--yunda-bark)] font-bold md:text-5xl" >
            {{ tt('Choose Your Surrogacy Track', '选择你的代孕路径') }}
          </h2>
          <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
            {{ tt('The surrogacy process looks slightly different depending on whether you’re an intended parent or a prospective surrogate mother. Choose the path that fits you:', '代孕流程会因你的身份（意向父母或代孕妈妈）略有不同。请选择适合你的路径：') }}
          </p>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          <NuxtLink
            v-for="cta in softCtas"
            :key="cta.label"
            :to="cta.link"
            class="group relative overflow-hidden border border-[var(--yunda-bark)] rounded-3xl bg-[var(--yunda-petal)] p-8 shadow-lg transition-all hover:shadow-2xl hover:-translate-y-1"
          >
            <div class="absolute inset-0 from-white/0 via-white/30 to-white/60 bg-gradient-to-br opacity-0 transition-opacity group-hover:opacity-100" />
            <span class="mb-3 inline-block text-sm text-[var(--yunda-bark)] tracking-wide uppercase">
              {{ cta.label }}
            </span>
            <p class="text-xl text-[var(--yunda-bark)] font-semibold" >
              {{ cta.description }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Step-by-Step Section -->
    <section class="bg-white py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-12 text-center">
          <h2 class="mb-6 text-4xl text-[var(--yunda-bark)] font-bold md:text-5xl" >
            {{ tt('Step-by-Step Breakdown of the Surrogacy process', '代孕流程分步详解') }}
          </h2>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            {{ tt('The surrogacy process works best with simple, clear surrogacy steps. This map shows how does surrogacy work for intended parents and for a surrogate mother in California and across the United States.', '清晰的步骤让代孕流程更顺畅。本图展示在加州及全美，代孕如何在意向父母与代孕妈妈之间运作。') }}
          </p>
        </div>
        <SurrogateStepsComponent
          :steps="surrogacySteps"
          :active-step="activeStep"
          @step-change="setActiveStep"
        />
      </div>
    </section>

    <!-- Flowchart & Checklist Section -->
    <section class="bg-[var(--yunda-petal)] py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 class="mb-6 text-4xl text-[var(--yunda-bark)] font-bold md:text-5xl" >
              {{ tt('Surrogacy process Flowchart & Checklist', '代孕流程图与清单') }}
            </h2>
            <p class="mb-8 text-lg text-[var(--primary-brown)] leading-relaxed">
              {{ tt('A simple map keeps the surrogacy process calm. It shows each handoff. It shows who owns each task. It answers how does surrogacy work and how does the surrogate mother process work without noise.', '一张简洁的地图让代孕流程更稳定，显示每次交接和责任归属。它能清楚回答代孕如何运作，无需杂讯。') }}
            </p>
            <div class="space-y-6">
              <div
                v-for="stage in flowchartStages"
                :key="stage.id"
                class="rounded-3xl bg-white p-8 shadow-lg"
              >
                <div class="mb-4 flex items-center justify-between">
                  <h3 class="text-2xl text-[var(--yunda-bark)] font-semibold" >
                    {{ stage.id }}. {{ stage.title }}
                  </h3>
                  <span class="h-10 w-10 flex items-center justify-center rounded-full bg-[var(--yunda-bark)] text-white font-semibold">
                    {{ stage.id }}
                  </span>
                </div>
                <div class="text-lg text-[var(--primary-brown)] leading-relaxed space-y-2">
                  <p><strong class="text-[var(--yunda-bark)]">{{ tt('Parents:', '意向父母：') }}</strong> {{ stage.parents }}</p>
                  <p><strong class="text-[var(--yunda-bark)]">{{ tt('Surrogates:', '代孕妈妈：') }}</strong> {{ stage.surrogates }}</p>
                  <p>{{ stage.summary }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="space-y-8">
            <div class="rounded-3xl bg-white p-8 shadow-lg">
              <h3 class="mb-4 text-2xl text-[var(--yunda-bark)] font-semibold" >
                {{ tt('Dual-Track Flowchart (Parents & Surrogates)', '双路径流程（意向父母 & 代孕妈妈）') }}
              </h3>
              <ol class="text-lg text-[var(--primary-brown)] leading-relaxed space-y-4">
                <li>{{ tt('1. Inquiry → Pre-screen', '1. 咨询 → 预筛') }}</li>
                <li>{{ tt('2. Screening → Matching', '2. 筛查 → 匹配') }}</li>
                <li>{{ tt('3. Legal → Escrow', '3. 法律 → 托管') }}</li>
                <li>{{ tt('4. IVF build → Transfer', '4. IVF 方案 → 移植') }}</li>
                <li>{{ tt('5. Pregnancy care → Updates', '5. 孕期照护 → 更新') }}</li>
                <li>{{ tt('6. Delivery → Parentage → Home', '6. 分娩 → 亲权 → 回家') }}</li>
              </ol>
            </div>
            <div class="rounded-3xl bg-white p-8 shadow-lg">
              <h3 class="mb-4 text-2xl text-[var(--yunda-bark)] font-semibold" >
                {{ tt('Printable Checklist (Highlights)', '可打印清单（重点）') }}
              </h3>
              <ul class="text-lg text-[var(--primary-brown)] leading-relaxed space-y-3">
                <li
                  v-for="item in checklistItems"
                  :key="item"
                >
                  □ {{ item }}
                </li>
              </ul>
            </div>
            <div class="rounded-3xl bg-white p-8 shadow-lg">
              <h3 class="mb-4 text-2xl text-[var(--yunda-bark)] font-semibold" >
                {{ tt('Recruit + Process Balance Note', '招募与流程平衡说明') }}
              </h3>
              <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
                {{ tt('Here we keep a balance between explaining how surrogacy is performed and inviting qualified women to a respectful surrogate program. Intended parents get a clear, guided plan instead of a sales pitch.', '这里我们在解释代孕如何执行与邀请合格女性加入项目之间保持平衡。意向父母得到清晰的引导计划，而不是营销话术。') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="bg-white py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mx-auto mb-12 max-w-3xl text-center">
          <h2 class="mb-6 text-4xl text-[var(--yunda-bark)] font-bold md:text-5xl" >
            {{ tt('FAQ About the Surrogacy process', '代孕流程常见问题') }}
          </h2>
          <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
            {{ tt('how does surrogacy work · how is surrogacy performed · what is the process for surrogacy', '代孕如何进行 · 代孕如何执行 · 代孕流程是什么') }}
          </p>
        </div>
        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqItems"
            :key="faq.question"
            class="border border-[var(--yunda-petal)] rounded-3xl bg-[var(--yunda-petal)] px-6 py-5 shadow-sm transition-colors hover:border-[var(--yunda-bark)]"
          >
            <button
              class="w-full flex items-center justify-between text-left"
              @click="toggleFaq(index)"
            >
              <h3 class="text-xl text-[var(--yunda-bark)] font-semibold" >
                {{ faq.question }}
              </h3>
              <span class="ml-4 text-2xl text-[var(--yunda-bark)]">
                {{ expandedFaq === index ? '−' : '+' }}
              </span>
            </button>
            <transition name="fade">
              <p
                v-if="expandedFaq === index"
                class="mt-4 text-lg text-[var(--primary-brown)] leading-relaxed"
              >
                {{ faq.answer }}
              </p>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Resources Section -->
    <section class="bg-[var(--yunda-petal)] py-24">
      <div class="container mx-auto max-w-6xl px-4">
        <div class="mb-12 text-center">
          <h2 class="text-4xl text-[var(--yunda-bark)] font-bold md:text-5xl" >
            {{ tt('Resources & Educational Materials', '资源与学习材料') }}
          </h2>
          <p class="mt-4 text-lg text-[var(--primary-brown)] leading-relaxed">
            {{ tt('what is the process of surrogacy · gestational carrier process', '代孕流程是什么 · 妊娠代孕流程') }}
          </p>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          <div
            v-for="resource in resourceCategories"
            :key="resource.title"
            class="rounded-3xl bg-white p-8 shadow-lg"
          >
            <h3 class="mb-4 text-2xl text-[var(--yunda-bark)] font-semibold" >
              {{ resource.title }}
            </h3>
            <ul class="text-lg text-[var(--primary-brown)] leading-relaxed space-y-3">
              <li
                v-for="item in resource.items"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Yunda -->
    <section class="bg-white py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mx-auto mb-12 max-w-4xl text-center space-y-4">
          <h2 class="text-4xl text-[var(--yunda-bark)] font-bold md:text-5xl" >
            {{ tt('Why Choose Yunda Surrogacy Agency 🩵', '为什么选择 Yunda 代孕机构 🩵') }}
          </h2>
          <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
            {{ tt('A Trusted U.S. Surrogacy Partner Based in California', '扎根加州的可信赖美国代孕伙伴') }}
          </p>
        </div>
        <div class="grid gap-8 md:grid-cols-2">
          <div
            v-for="highlight in yundaHighlights"
            :key="highlight.title"
            class="rounded-3xl bg-[var(--yunda-petal)] p-8 shadow-lg"
          >
            <h3 class="mb-3 text-2xl text-[var(--yunda-bark)] font-semibold" >
              {{ highlight.title }}
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              {{ highlight.body }}
            </p>
          </div>
        </div>
        <div class="mt-12 rounded-3xl bg-[var(--yunda-bark)] px-8 py-10 text-white shadow-xl">
          <h3 class="mb-4 text-2xl font-semibold" >
            {{ tt('Start Your Journey with Yunda', '与 Yunda 开启旅程') }}
          </h3>
          <ul class="text-lg leading-relaxed space-y-3">
            <li
              v-for="invite in journeyInvites"
              :key="invite"
            >
              - {{ invite }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="bg-[var(--yunda-petal)] py-20">
      <div class="container mx-auto max-w-6xl px-4 text-center">
        <div class="rounded-3xl bg-[var(--yunda-bark)] px-8 py-12 shadow-xl sm:px-16">
          <h3 class="mb-4 text-3xl text-white font-bold md:text-4xl" >
            {{ tt('Start Your Journey with Yunda', '与 Yunda 开启旅程') }}
          </h3>
          <p class="mx-auto mb-8 max-w-3xl text-lg text-white leading-relaxed">
            {{ tt('We know the courts and clinics. We guide families and surrogate mothers through the surrogacy steps with calm, clear updates.', '我们熟悉法院与诊所，以稳定、清晰的更新引导家庭与代孕妈妈完成每一步。') }}
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <NuxtLink
              to="/be-parents"
              class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base text-[var(--yunda-bark)] font-semibold shadow-lg transition-opacity hover:opacity-90"
            >
              {{ tt('Book a Consult', '预约咨询') }}
            </NuxtLink>
            <NuxtLink
              to="/be-surrogate"
              class="inline-flex items-center justify-center border border-white rounded-xl px-8 py-4 text-base text-white font-semibold transition-colors hover:bg-white hover:text-[var(--yunda-bark)]"
            >
              {{ tt('Check Eligibility', '查看资格') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

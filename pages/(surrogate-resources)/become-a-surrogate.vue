<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { buildCoreServicePageSchemas, buildFAQPageSchema, buildItemListSchema } from '~/utils/schema'

useScrollAnimation()

// 定义 block 接口
interface ParagraphBlock {
  type: 'paragraph'
  text: string
}

interface ListBlock {
  type: 'list'
  icon: string
  items: string[]
  label?: string
}

type Block = ParagraphBlock | ListBlock

// 类型守卫函数
function isListBlock(block: Block): block is ListBlock {
  return block.type === 'list'
}
const { locale } = useI18n()
const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en: string, zh: string) => (isZh.value ? zh : en)

const pageTitle = computed(() =>
  tt(
    'Become a Surrogate in Southern California | Process, Requirements & Pay',
    '南加州代孕妈妈：流程、要求与补偿 | Yunda',
  ),
)
const pageDescription = computed(() =>
  tt(
    'Become a surrogate in Southern California with Yunda. Learn the process, requirements and pay, with IVF clinic support in Los Angeles and San Diego.',
    '了解南加州代孕妈妈流程、基本要求与补偿，Yunda 提供洛杉矶与圣地亚哥 IVF 诊所协作支持。',
  ),
)

useHead(() => ({
  title: pageTitle.value,
  meta: [
    {
      name: 'description',
      content: pageDescription.value,
    },
  ],
}))
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const surrogacyTabs = computed(() => [
  {
    id: 'meaning',
    heading: tt('Surrogacy Meaning', '代孕的意义'),
    title: tt('Surrogacy Meaning: A Clear Way to Help a Family', '代孕的意义：让一个家庭圆梦'),
    content: [
      tt(
        'You want your pregnancy experience to matter. Surrogacy meaning comes down to one idea: you carry so another family can hold their child.',
        '你希望怀孕这段经历有意义。代孕的意义很简单：你孕育，帮助另一个家庭迎接孩子。',
      ),
      tt(
        'You ask, what does surrogate mean in real life? It means you choose to help, and you keep your voice at every step.',
        '你会问：现实中“代孕”到底意味着什么？意味着你选择帮助他人，同时在每一步都拥有话语权。',
      ),
    ],
  },
  {
    id: 'gestational',
    heading: tt('Gestational Surrogacy', '妊娠代孕'),
    title: tt('What Is Gestational Surrogacy?', '什么是妊娠代孕？'),
    content: [
      tt(
        'You may also ask what is gestational surrogacy. In this path, doctors create an embryo from the intended parents or donors, then place it with a gestational carrier. You do not share genetics with the baby.',
        '妊娠代孕中，胚胎由意向父母或供卵/供精者形成，再移植至代孕妈妈体内，你与宝宝没有遗传关系。',
      ),
      tt(
        'People sometimes mention traditional surrogacy, which uses the carrier\'s egg. That is rare and not the standard in modern programs.',
        '传统代孕使用代孕妈妈的卵子，但如今非常少见，也不是主流。',
      ),
      tt(
        'Most agencies and clinics focus on clear, ethical care and a simple, science-first approach.',
        '大多数机构和诊所都坚持透明、合规、以科学为先的流程。',
      ),
    ],
  },
  {
    id: 'motivation',
    heading: tt('Why Women Step Forward', '为什么女性选择代孕'),
    title: tt('Why Women Step Forward', '为什么女性选择代孕'),
    content: [
      tt(
        'You want to change a life. You also want structure and respect. Women choose this path because the journey offers purpose, teamwork, and steady guidance.',
        '你想改变一个家庭的命运，也希望得到尊重与秩序。代孕之所以被选择，是因为它提供了意义、团队支持与清晰指引。',
      ),
      tt(
        'You meet a family. You set boundaries. You get support through each phase. Many candidates also ask about surrogate compensation.',
        '你会见到一个家庭，设定边界，并在每个阶段获得支持。许多候选人也会关心代孕补偿。',
      ),
      tt(
        'Programs outline compensation in a contract and tie payments to real milestones. The goal is simple: match your effort with reliable support while you focus on your health.',
        '补偿会写入合同，并与真实里程碑挂钩。目标很简单：在你关注健康的同时，获得可靠支持与回报。',
      ),
    ],
  },
  {
    id: 'voice',
    heading: tt('Your Voice, Your Choice', '你的选择，你的声音'),
    title: tt('Your Voice, Your Choice', '你的选择，你的声音'),
    content: [
      tt(
        'You choose who you match with. You review the plan with your own advisor. You ask questions until everything feels right.',
        '你可以选择匹配对象，与自己的顾问一起审核计划，直到一切安心。',
      ),
      tt(
        'You can say yes when the fit feels good, and you can step back when it does not. You bring kindness, strength, and real experience to the table.',
        '合适就答应，不合适也可拒绝。你的善意、坚韧和真实经验，是这段旅程的核心。',
      ),
      tt(
        'Families feel that. This is why so many women with healthy pregnancies choose to carry again for someone who needs them.',
        '家庭能感受到这一切，因此很多有健康孕产史的女性会再次选择代孕。',
      ),
    ],
  },
])

const activeTabId = ref(surrogacyTabs.value[0].id)
const activeTab = computed(() => surrogacyTabs.value.find(tab => tab.id === activeTabId.value) ?? surrogacyTabs.value[0])

const compensationTabs = computed(() => [
  { id: 'coverage', title: tt('Coverage', '覆盖范围') },
  { id: 'payments', title: tt('Payments', '支付方式') },
  { id: 'benefits', title: tt('Benefits', '福利') },
  { id: 'protection', title: tt('Protection', '保障') },
])

const activeCompensationTab = ref(compensationTabs.value[0].id)

const quickFitChecks = computed(() => [
  tt('You fall within the program\'s surrogate age limit (most clinics look for early 20s to late 30s).', '符合代孕妈妈年龄范围（多数诊所为 20 岁出头至 30 多岁）。'),
  tt('You keep a healthy BMI within clinic guidelines.', 'BMI 在诊所要求的健康范围内。'),
  tt('You don\'t smoke, vape, or use drugs.', '不吸烟、不电子烟、不使用毒品。'),
  tt('You don\'t misuse alcohol.', '无滥用酒精习惯。'),
  tt('You manage stress well and have steady sleep and nutrition.', '压力管理良好，作息与营养稳定。'),
  tt('You feel ready for screenings and a planned pregnancy.', '愿意配合筛查并进行计划性妊娠。'),
])

const clinicChecks = computed(() => [
  tt('Prior full-term birth with good recovery.', '有足月分娩且恢复良好。'),
  tt('No more than the program\'s limit on prior C-sections.', '既往剖宫产次数不超过项目上限。'),
  tt('Up-to-date Pap and OB visits.', '宫颈筛查及产科就诊记录更新。'),
  tt('Vaccines per clinic policy.', '疫苗接种符合诊所要求。'),
  tt('Support system at home for appointments and travel.', '家中有支持系统可协助就诊与出行。'),
])

const whatThisMeans = computed(() => [
  tt('You choose your match; you can say no.', '你可以选择匹配对象，也可以说不。'),
  tt('You get independent legal counsel.', '你会有独立律师提供建议。'),
  tt('You receive clear payment schedules and escrow details.', '你会拿到清晰的付款计划和托管细节。'),
  tt('You keep a coordinator who answers texts and calls.', '有专属协调人随时回应电话和消息。'),
  tt('You stay close to home for OB care when possible; you travel only for key clinic visits.', '尽量就近产检，只在关键诊所就诊时出行。'),
])

interface RequirementDropdown {
  id: string
  title: string
  blocks: Block[]
}

const requirementDropdowns = computed<RequirementDropdown[]>(() => [
  {
    id: 'who',
    title: tt('Who Can Be a surrogate?', '谁可以成为代孕妈妈？'),
    blocks: [
      {
        type: 'paragraph',
        text: tt(
          'We welcome surrogates from across Southern California, including Los Angeles, Orange County, San Diego and the Inland Empire, as long as you meet the basic surrogate requirements below.You ask, who can be a surrogate. You qualify when you meet clear surrogacy requirements and surrogacy qualifications set by clinics and your legal team. You\'ve had at least one full-term birth. You feel healthy. You want to help a family. You understand gestational surrogacy and the role of a gestational surrogate.',
          '我们欢迎来自南加州各地的代孕妈妈，包括洛杉矶、橙县、圣地亚哥和内陆帝国地区，只要符合以下基本要求。你会问“谁可以成为代孕妈妈？”当你满足诊所与法律团队设定的清晰要求时，你就具备资格：至少有一次足月分娩，身体健康，愿意帮助家庭，并理解妊娠代孕的角色。',
        ),
      },
      { type: 'paragraph', text: tt('Quick fit check:', '快速匹配检查：') },
      {
        type: 'list',
        icon: 'radix-icons:check-circled',
        items: quickFitChecks.value,
      },
    ],
  },
  {
    id: 'health',
    title: tt('Health and Lifestyle Checklist', '健康与生活方式清单'),
    blocks: [
      {
        type: 'paragraph',
        text: tt(
          'We look at your real life, not just forms. You share your OB records and your delivery history. We review any C-sections and note how you healed. We confirm no major complications like severe preeclampsia or uncontrolled diabetes. You complete a mental-health eval. You finish labs and a background check. You meet a coordinator who explains each step in plain English.',
          '我们关注真实情况，而不仅是表格。你会提交产科记录与分娩史，我们审核剖宫产记录及恢复情况，确认无严重并发症（如重度子痫前期或糖尿病失控）。你会完成心理评估、化验和背景审核，并由协调员以清晰语言说明每一步。',
        ),
      },
      { type: 'paragraph', text: tt('Clinic-driven checks:', '诊所重点检查：') },
      {
        type: 'list',
        icon: 'radix-icons:check-circled',
        items: clinicChecks.value,
      },
      {
        type: 'paragraph',
        text: tt(
          'Mental-health evaluations, lab work, and background checks ensure everyone starts with aligned expectations.',
          '心理评估、化验与背景审核确保各方在同一预期下开始旅程。',
        ),
      },
    ],
  },
  {
    id: 'legal',
    title: tt('Location, Legal, and Support', '地理、法律与支持'),
    blocks: [
      {
        type: 'paragraph',
        text: tt(
          'Because our program is based in Southern California, most surrogates live within driving distance of Los Angeles or San Diego, which keeps clinic visits and support simple.Where you live matters. Many programs match within surrogate friendly states so lawyers can secure parentage on time. You work with your own attorney. You review your contract line by line. You approve every clause before you move forward.',
          '我们的项目位于南加州，多数代孕妈妈居住在洛杉矶或圣地亚哥附近，便于就诊与支持。居住地很重要，很多项目会在代孕友好州内匹配，以便律师及时确立亲权。你会有自己的律师，逐条审阅合同并在确认后推进。',
        ),
      },
      { type: 'paragraph', text: tt('What this means for you:', '对你意味着：') },
      {
        type: 'list',
        icon: 'radix-icons:dot-filled',
        items: whatThisMeans.value,
      },
    ],
  },
  {
    id: 'beyond',
    title: tt('What We Look For Beyond the Basics', '基本要求之外我们看重什么'),
    blocks: [
      {
        type: 'paragraph',
        text: tt(
          'You bring heart and follow-through. You show up for monitoring. You ask questions when something feels off. You protect your time and your body. You carry with purpose. That mindset sets a great surrogate mom apart.',
          '我们看重责任心与执行力：按时监测、及时提问、保护自己的时间与身体、带着使命感完成旅程。这样的心态成就优秀的代孕妈妈。',
        ),
      },
    ],
  },
])

const expandedRequirements = ref<Record<string, boolean>>({})

function toggleRequirement(id: string) {
  expandedRequirements.value = {
    ...expandedRequirements.value,
    [id]: !expandedRequirements.value[id],
  }
}

function isRequirementExpanded(id: string) {
  return expandedRequirements.value[id] === true
}

const journeyIntro = computed(() =>
  tt(
    'surrogates often ask what the surrogate process looks like in Southern California. Here is a clear map of the steps, from application and screening to legal, IVF and delivery.surrogate often asks what is the process to become a surrogate. Here\'s a clear map of the surrogacy steps. You move through seven stages with a steady team, simple checklists, and honest timelines. These surrogate steps keep the process calm and predictable.',
    '许多代孕妈妈会问：南加州的代孕流程是什么样？以下是从申请与筛查到法律、IVF 与分娩的清晰地图。你将经历七个阶段，团队稳定、清单清晰、时间线坦诚，让过程更可控、更安心。',
  ),
)

const journeySteps = computed(() => [
  {
    title: tt('Step 1: Apply & Pre-Qualify', '步骤 1：申请与预评估'),
    details: [
      tt('surrogate completes a short form and shares birth history.', '填写简短申请并分享分娩史。'),
      tt('A coordinator calls to learn goals and answer basics.', '协调员来电了解目标并回答基础问题。'),
      tt('You get a clean overview of the surrogacy timeline and what happens next.', '获得清晰的时间线与下一步说明。'),
      tt('If the fit looks right, we open your file and schedule records review.', '匹配合适后，我们建立档案并安排病历审核。'),
    ],
  },
  {
    title: tt('Step 2: Records & Screening', '步骤 2：病历与筛查'),
    details: [
      tt('surrogate sends OB records and prior delivery notes.', '提交产科记录与分娩情况。'),
      tt('You finish labs, a mental-health evaluation, and a background check.', '完成化验、心理评估和背景审核。'),
      tt('The clinic confirms readiness for a planned pregnancy.', '诊所确认你适合计划性妊娠。'),
      tt('You get plain-English guidance on travel, scheduling, and insurance.', '获得关于出行、排期与保险的清晰指导。'),
    ],
  },
  {
    title: tt('Step 3: Matching & Social Fit', '步骤 3：匹配与契合'),
    details: [
      tt('We introduce intended parents who match your values.', '介绍与你价值观匹配的意向父母。'),
      tt('You meet on a guided video call. You ask every question.', '在引导的视频沟通中见面，提出所有问题。'),
      tt('If the match feels right, we move forward.', '匹配合适后即可推进。'),
      tt('We also offer fast-track matching for experienced surrogates when embryos and calendars line up.', '若胚胎与排期匹配，经验型代孕妈妈可快速匹配。'),
    ],
  },
  {
    title: tt('Step 4: Legal & Escrow Setup', '步骤 4：法律与托管'),
    details: [
      tt('You work with your own attorney.', '由你自己的律师提供建议。'),
      tt('You review the contract line by line.', '逐条审阅合同。'),
      tt('Funds move into escrow with trusted partners such as SeedTrust.', '资金进入托管账户（如 SeedTrust）。'),
      tt('We coordinate insurance with sector experts like ART Risk.', '与 ART Risk 等保险专家协作。'),
      tt('You see clear schedules, categories, and milestones before you start medication.', '在用药前看到清晰的时间表、类别与里程碑。'),
    ],
  },
  {
    title: tt('Step 5: IVF Calendar & Embryo Transfer', '步骤 5：IVF 日历与移植'),
    details: [
      tt('The clinic issues your calendar for meds and monitoring.', '诊所发放用药与监测日历。'),
      tt('This is IVF surrogacy, so the embryo comes from the intended parents or donors.', '这是 IVF 代孕，胚胎来自意向父母或供卵/供精者。'),
      tt('The team prepares for embryo transfer surrogacy with a simple, step-by-step plan.', '团队以清晰步骤准备胚胎移植。'),
      tt('Many people call this embryo transfer to surrogate; your nurse walks you through each visit.', '护士会逐次指导每次就诊与移植流程。'),
      tt('We track your surrogate embryo transfer date and confirm next appointments.', '我们跟踪移植日期并确认后续预约。'),
      tt('Clinics discuss surrogacy embryo transfer success rate in detail; numbers vary by embryo quality and medical history.', '诊所会说明成功率，具体数值因胚胎质量与病史而异。'),
    ],
  },
  {
    title: tt('Step 6: Pregnancy Care & Check-Ins', '步骤 6：孕期照护与沟通'),
    details: [
      tt('You see a local OB for routine care.', '本地产检为主。'),
      tt('We keep a tight update rhythm with you and the family.', '与您和家庭保持稳定更新节奏。'),
      tt('We handle travel for special visits.', '特殊就诊安排交通。'),
      tt('We answer texts and calls quickly.', '及时响应消息与电话。'),
      tt('We solve logistics so you can focus on a healthy pregnancy.', '我们处理后勤，你专注健康妊娠。'),
    ],
  },
  {
    title: tt('Step 7: Birth & Postpartum Support', '步骤 7：分娩与产后支持'),
    details: [
      tt('We finalize the birth plan early.', '提前确定分娩计划。'),
      tt('Legal steps and hospital notes sit in your file before due date.', '在预产期前完成法律与医院文件。'),
      tt('We stay on call through delivery.', '分娩全程待命。'),
      tt('After birth, we help with forms, reimbursements, and any agreed support such as pumping supplies or short-term childcare.', '产后协助表单、报销及泵奶/短期看护等约定支持。'),
    ],
  },
])

const timelineParagraphs = computed(() => [
  tt('Most journeys run about 16–18 months from application to postpartum check-ins. Matching speed, clinic calendars, and embryo readiness can shift timing.', '从申请到产后回访通常约 16–18 个月。匹配速度、诊所排期与胚胎准备度都会影响时间。'),
  tt('We share dates in writing and adjust with you. If you like tools, try a surrogacy due date calculator once the clinic confirms your transfer date. This keeps the process of surrogacy pregnancy simple and easy to follow.', '我们会书面确认时间并与你协同调整。若你喜欢工具，可在确认移植日期后使用预产期计算器，流程更清晰。'),
])

const communicationParagraph = computed(() =>
  tt(
    'We keep updates weekly during screening and matching, then follow your clinic cadence in pregnancy. Coordinators stay reachable by phone, text, and email. We provide bilingual support when needed. The goal stays the same: a smooth path, steady care, and a clear surrogacy timeline you can trust.',
    '在筛查与匹配阶段我们每周更新，孕期按诊所节奏沟通。协调员可通过电话、短信和邮件联系，必要时提供双语支持。目标始终是：流程顺畅、照护稳定、时间线清晰可信。',
  ),
)

const compensationCoverParagraphs = computed(() => [
  tt('surrogate gives time, health, and heart. Surrogate compensation reflects that work.', '代孕妈妈付出时间、健康与心力，补偿体现这份投入。'),
  tt('The package includes base surrogate pay, monthly living stipends, and event-based amounts. It also includes travel, meals, and lodging for clinic visits.', '补偿包含基础报酬、月度津贴与事件性费用，也包含诊所就诊的差旅、餐食与住宿。'),
  tt('Programs add childcare and wage-loss support when a doctor orders bedrest. This is paid surrogacy with clear categories, not guesswork.', '若医生建议卧床，会增加托育与收入补偿支持。所有类别清晰，不是模糊估算。'),
])

const typicalInclusions = computed(() => [
  tt('Base surrogate income with milestone timing', '基础补偿按里程碑发放'),
  tt('Monthly stipend for everyday costs', '日常费用月度津贴'),
  tt('Maternity clothing allowance', '孕期服装补贴'),
  tt('Travel and childcare reimbursement for required appointments', '就诊所需差旅与托育报销'),
  tt('Bedrest support when medically necessary', '必要时卧床支持'),
  tt('Pumping/breast-milk stipend if surrogate chooses to pump', '若选择泵奶，提供相应补贴'),
  tt('Separate amounts for procedures like C-section', '剖宫产等特殊程序单独补偿'),
])

const paymentsParagraphs = computed(() => [
  tt('We keep money predictable. Intended parents place funds in escrow with partners such as SeedTrust.', '费用可预测，意向父母将资金存入如 SeedTrust 的托管账户。'),
  tt('We align each payment to a real step on the calendar. Contracts define start points and dates.', '每笔付款对应真实里程碑，合同明确起点与日期。'),
  tt('Many journeys trigger monthly payments after heartbeat confirmation. We publish the schedule, and we follow it.', '多数项目在心跳确认后启动月度支付，时间表公开并严格执行。'),
  tt('Do surrogates get paid? Yes—by contract, by milestone, and through secure escrow for surrogacy payments.', '代孕妈妈会按合同、按里程碑、通过安全托管得到支付。'),
  tt('Client framework: first-time packages commonly range $61,000–$70,000+. Final numbers vary by state, clinic, insurance, and medical history. The contract sets the amount for each surrogate.', '参考范围：首次代孕常见 $61,000–$70,000+。最终金额因州别、诊所、保险与病史而异，合同会明确每位代孕妈妈的金额。'),
])

const benefitsIntroParagraphs = computed(() => [
  tt('surrogate deserves support beyond a single number. We coordinate real-life help so the journey stays calm.', '代孕妈妈需要的不只是一个数字，我们会协调实际支持，让旅程更安心。'),
])

const supportExamples = computed(() => [
  tt('Case manager on call for fast answers', '专属个案经理随时响应'),
  tt('Door-to-door travel for transfer and key scans', '移植及关键检查提供门到门出行'),
  tt('Meal, hotel, and mileage coverage per policy', '按政策报销餐食、住宿与里程'),
  tt('Partner wage-loss support when the clinic requires a companion', '诊所要求陪同时提供伴侣误工支持'),
  tt('Local OB care whenever possible, with clinic check-ins by plan', '尽量本地产检，按计划安排诊所复查'),
])

const benefitsClosingParagraph = computed(() =>
  tt('These bedrest support benefits and travel perks free up time and energy. surrogate can focus on health and daily life.', '卧床支持与出行补贴可释放精力，让代孕妈妈专注健康与生活。'),
)

const milestonesList = computed(() => [
  tt('Legal clearance signed', '法律放行签署'),
  tt('Start of medications', '开始用药'),
  tt('Embryo transfer to surrogate completed', '完成胚胎移植'),
  tt('Surrogate embryo transfer follow-up', '移植后随访'),
  tt('Heartbeat confirmation and monthly cadence', '心跳确认及月度节奏'),
  tt('Trimester checkpoints', '孕期阶段性检查'),
  tt('Delivery and postpartum items', '分娩与产后事项'),
])

const experiencedCarrierParagraph = computed(() =>
  tt(
    'Experienced carriers often qualify for higher packages. If you carried before, ask about fast-track matching for experienced surrogates and enhanced levels. This path can increase surrogate compensation when the profile and clinic approve.',
    '有经验的代孕妈妈通常可获得更高补偿。如果你曾代孕，可咨询快速匹配和升级补偿方案，需诊所审核通过。',
  ),
)

const legalProtectionParagraph = computed(() =>
  tt(
    'surrogate meets with an independent attorney. You read every clause. You approve before anything starts. Insurance partners like ART Risk help structure coverage for pregnancy care. We coordinate claims so bills route to the right plan. We document every reimbursement. We keep records clean and easy to audit.',
    '代孕妈妈会与独立律师沟通，逐条审阅并在开始前确认。ART Risk 等保险伙伴协助设计孕期保障，我们协调理赔并记录每一笔报销，账目清晰可追溯。',
  ),
)

const clarityParagraphs = computed(() => [
  tt('We do not inflate numbers. We do not hide fees. We publish categories, schedules, and examples in writing. We align with clinic policy and state law. If a detail changes, we update the contract and the calendar.', '我们不虚高数字、不隐藏费用，所有类别、时间表与示例均书面呈现，并与诊所和州法律对齐。若细节变化，将同步更新合同与日历。'),
  tt('If surrogate wants to get paid to be a surrogate with confidence, this structure makes it real and reliable—without surprises.', '如果你希望安心获得代孕补偿，这套结构真实、可靠且无意外。'),
])

const yundaPillars = computed(() => [
  {
    title: tt('Trusted Partners, Transparent Escrow', '可信伙伴，透明托管'),
    body: tt(
      'surrogate wants clear money flow. We work with sector leaders like ART Risk and SeedTrust so funds, insurance, and risk plans stay organized and trackable. Intended parents fund a dedicated trust account. The account covers surrogate compensation, insurance, legal, and reimbursable items. We align disbursements to milestones and keep the ledger tidy.',
      '代孕妈妈需要清晰的资金流。我们与 ART Risk、SeedTrust 等伙伴合作，让资金、保险与风险计划清晰可追踪。意向父母存入专用信托账户，用于补偿、保险、法律与报销，并按里程碑发放。',
    ),
  },
  {
    title: tt('Top Fertility Clinics in Southern California', '南加州顶尖生殖诊所'),
    body: tt(
      'We coordinate with proven IVF centers in Los Angeles and San Diego. California Fertility Partners (CFP) brings decades of third-party reproduction experience and advanced lab outcomes. Gen 5 Fertility Center in San Diego focuses on complex cases and embryo science, led by internationally recognized physicians. surrogate benefits from strong clinical teams and clear calendars.',
      '我们与洛杉矶和圣地亚哥的 IVF 中心协作。CFP 拥有多年第三方生殖经验与先进实验室；圣地亚哥的 Gen 5 擅长复杂病例与胚胎科学。代孕妈妈可获得强大的医疗团队与清晰排期。',
    ),
  },
  {
    title: tt('Clear Legal Path in California', '加州清晰的法律路径'),
    body: tt(
      'California offers a stable framework for gestational surrogacy. Your legal team drafts and reviews the agreement, then secures a pre-birth order when appropriate. This protects parentage before delivery and keeps hospital planning smooth.',
      '加州为妊娠代孕提供稳定法律框架。法律团队起草并审阅协议，必要时办理预产前裁定，确保亲权在分娩前确立，医院流程更顺畅。',
    ),
  },
  {
    title: tt('Local Surrogacy Agencies vs. Big Networks', '本地机构 vs. 大型网络'),
    body: tt(
      'Many candidates compare local surrogacy agencies with national networks and even browse best paying surrogacy agencies. We keep it simple: publish the categories, tie payments to milestones, and route funds through escrow so surrogate can focus on health. If you want to become a surrogate in Southern California, this structure keeps the process steady and the support close to home.',
      '很多候选人会对比本地机构与全国网络。我们的方式很简单：公开类别、按里程碑支付、通过托管发放，让代孕妈妈专注健康。如果你在南加州代孕，这样的结构更稳定、支持更贴近。',
    ),
  },
])

function blockToText(block: Block) {
  if (isListBlock(block))
    return `${block.label ? `${block.label} ` : ''}${block.items.join(' ')}`
  return block.text
}

const journeySchemaSteps = computed(() => journeySteps.value.map((step, index) => ({
  position: index + 1,
  name: step.title,
  description: step.details.join(' '),
  url: '/become-a-surrogate',
})))

const requirementFaqs = computed(() => requirementDropdowns.value.map(section => ({
  question: section.title,
  answer: section.blocks.map(block => blockToText(block)).join(' '),
})))

const journeyItemListSchema = computed(() => buildItemListSchema({
  name: pageTitle.value,
  description: journeyIntro.value,
  items: journeySchemaSteps.value,
  baseUrl: siteUrl.value || undefined,
  locale: locale.value,
}))

const faqSchema = computed(() => buildFAQPageSchema({
  name: tt('Southern California Surrogate Requirements FAQ', '南加州代孕要求常见问答'),
  description: tt(
    'Answers about who can become a surrogate, clinic expectations, and legal protections in Southern California.',
    '关于谁可以成为代孕妈妈、诊所要求与南加州法律保护的解答。',
  ),
  faqs: requirementFaqs.value,
  baseUrl: siteUrl.value || undefined,
  url: '/become-a-surrogate',
  locale: locale.value,
}))

const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: '/become-a-surrogate',
  name: pageTitle.value,
  description: pageDescription.value,
  about: tt('Southern California surrogate requirements, process, and pay', '南加州代孕妈妈要求、流程与补偿'),
  audience: [
    tt('Surrogate candidates in Southern California', '南加州代孕妈妈候选人'),
    tt('Women considering becoming a surrogate', '正在考虑成为代孕妈妈的女性'),
  ],
  service: {
    name: tt('Southern California Surrogate Program', '南加州代孕妈妈项目'),
    description: tt(
      'Yunda explains surrogate requirements, process steps, compensation, clinic expectations, legal protection, and support for women considering surrogacy in Southern California.',
      '孕达为正在考虑南加州代孕的女性说明代孕要求、流程步骤、补偿、诊所要求、法律保护和支持。',
    ),
    serviceType: tt('Surrogate education and application support', '代孕妈妈教育与申请支持'),
    areaServed: ['Southern California', 'Los Angeles', 'San Diego', 'California'],
  },
  breadcrumbs: [
    { name: tt('Home', '首页'), url: '/' },
    { name: tt('For Surrogates', '代孕妈妈指南'), url: '/surrogates' },
    { name: tt('Detailed Surrogate Guides', '代孕妈妈补充指南'), url: '/surrogates' },
    { name: tt('Before You Apply', '申请前准备'), url: '/become-a-surrogate' },
  ],
  locale: locale.value,
}))

useHead(() => {
  const scripts = []
  coreServicePageSchemas.value.forEach((schema, index) => {
    scripts.push({
      key: `schema-become-surrogate-core-${index}`,
      type: 'application/ld+json',
      children: JSON.stringify(schema),
    })
  })
  if (journeyItemListSchema.value) {
    scripts.push({
      key: 'schema-become-surrogate-journey-item-list',
      type: 'application/ld+json',
      children: JSON.stringify(journeyItemListSchema.value),
    })
  }
  if (faqSchema.value) {
    scripts.push({
      key: 'schema-become-surrogate-faq',
      type: 'application/ld+json',
      children: JSON.stringify(faqSchema.value),
    })
  }
  return scripts.length ? { script: scripts } : {}
})
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />
    <BreadcrumbNav
      :items="[
        { to: '/surrogates', label: locale === 'zh' ? '代孕妈妈' : 'For Surrogates' },
        { to: '/surrogates', label: locale === 'zh' ? '代孕妈妈补充指南' : 'Detailed Surrogate Guides' },
        { label: locale === 'zh' ? '申请前准备' : 'Before You Apply' },
      ]"
    />

    <!-- Hero -->
    <section class="relative overflow-hidden from-[var(--hero-center)]/80 via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b py-18 lg:py-24">
      <div class="pointer-events-none absolute inset-0 opacity-40">
        <div class="absolute left-10 top-10 h-40 w-40 animate-pulse rounded-full bg-[var(--olive-green)] blur-[120px]" />
        <div class="absolute bottom-10 right-10 h-60 w-60 animate-pulse rounded-full bg-[var(--primary-brown)]/70 blur-[160px]" style="animation-delay: 1s;" />
      </div>
      <div class="relative mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div class="animate-fade-in-up text-center space-y-6 lg:text-left">
            <h1 class="text-8 font-semibold leading-tight transition-all duration-700 hover:scale-105 lg:text-12" >
              {{ tt('Become a Surrogate in Southern California: A Supported, Transparent Path with Yunda', '成为南加州代孕妈妈：Yunda 提供清晰、透明的支持路径') }}
            </h1>
            <p class="mx-auto max-w-160 text-4.5 leading-relaxed lg:mx-0">
              {{ tt('Thinking about becoming a surrogate in Southern California? This page walks through the surrogate process, basic requirements and what surrogate pay typically looks like, with support from top IVF clinics in Los Angeles and San Diego.', '想在南加州成为代孕妈妈？这里介绍代孕流程、基本要求与补偿概况，并由洛杉矶和圣地亚哥顶级 IVF 诊所支持。') }}
            </p>
            <div class="flex flex-wrap justify-center gap-4 lg:justify-start">
              <NuxtLink
                to="/be-surrogate"
                class="rounded-full bg-[var(--primary-brown)] px-6 py-3 text-3.5 text-white font-semibold uppercase transition-all duration-300 hover:scale-105 hover:bg-[var(--yunda-bark)] hover:shadow-lg"
              >
                {{ tt('Start Application', '开始申请') }}
              </NuxtLink>
              <NuxtLink
                to="/referral"
                class="border border-[var(--primary-brown)] rounded-full px-6 py-3 text-3.5 font-semibold uppercase transition-all duration-300 hover:scale-105 hover:bg-white hover:shadow-lg"
              >
                {{ tt('Talk to a Coordinator', '与顾问沟通') }}
              </NuxtLink>
            </div>
          </div>
          <div class="flex animate-fade-in-right justify-center">
            <div class="image-placeholder max-w-500 w-full transition-all duration-500 hover:scale-105">
              <img src="/images/landing-page1/become-a-surrogate-mother.jpg" :alt="tt('Become a surrogate', '成为代孕妈妈')">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Women Choose Surrogacy -->
    <section id="why" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div class="animate-fade-in-left lg:w-1/3">
            <h2 class="text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
              {{ tt('Why Women Choose Surrogacy', '为什么女性选择代孕') }}
            </h2>
            <p class="mt-4 text-4.5 leading-relaxed">
              {{ tt('Explore what surrogacy means today, why women step forward, and how you stay in control at every stage.', '了解代孕的意义、女性选择代孕的原因，以及你如何在每个阶段保持掌控。') }}
            </p>
            <div class="mt-10 flex flex-col gap-4">
              <button
                v-for="(tab, index) in surrogacyTabs"
                :key="tab.id"
                type="button"
                class="transform border rounded-4 px-4 py-3 text-left transition-all duration-300 hover:scale-105 hover:shadow-lg"
                :class="tab.id === activeTabId ? 'border-[var(--primary-brown)] bg-[var(--yunda-petal)] shadow-lg shadow-black/10 scale-105' : 'border-[var(--olive-green)]/40 bg-white hover:border-[var(--primary-brown)]/60 hover:bg-[var(--yunda-petal)]/50'"
                :style="{ animationDelay: `${index * 100}ms` }"
                @click="activeTabId = tab.id"
              >
                <span class="text-3 tracking-widest uppercase">{{ tab.heading }}</span>
                <span class="mt-1 block text-4.5 font-medium">{{ tab.title }}</span>
              </button>
            </div>
          </div>
          <div class="flex flex-col animate-fade-in-right items-center gap-8 text-center lg:w-2/3">
            <div class="max-w-150 w-full border border-[var(--primary-brown)]/50 rounded-5 border-dashed bg-white/60 p-6 text-3.5 text-[var(--primary-brown)] tracking-wide uppercase transition-all duration-500 hover:scale-105 hover:shadow-lg">
              <div class="image-placeholder">
                <img src="/images/landing-page1/Women-Choose-Surrogacy.jpg" :alt="tt('Women choose surrogacy', '女性选择代孕')">
              </div>
            </div>
            <div class="max-w-150 w-full border border-[var(--olive-green)]/40 rounded-5 bg-white/90 p-8 shadow-black/10 shadow-lg transition-all duration-500 hover:shadow-xl">
              <h3 class="text-6 font-semibold uppercase transition-all duration-300" >
                {{ activeTab.title }}
              </h3>
              <div class="mt-6 text-4.25 leading-relaxed transition-all duration-500 space-y-4">
                <p
                  v-for="(paragraph, index) in activeTab.content" :key="paragraph"
                  class="transition-all duration-300"
                  :style="{ animationDelay: `${index * 200}ms` }"
                >
                  {{ paragraph }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Requirements -->
    <section id="requirements" class="bg-[var(--yunda-petal)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <h2 class="animate-fade-in-up text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
          {{ tt('Surrogacy Requirements & Qualifications', '代孕要求与资格') }}
        </h2>
        <div class="mt-8 space-y-6">
          <article
            v-for="(dropdown, index) in requirementDropdowns"
            :key="dropdown.id"
            class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-5 bg-white/95 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl"
            :style="{ animationDelay: `${index * 150}ms` }"
          >
            <button
              type="button"
              class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-all duration-300 hover:bg-[var(--yunda-petal)]/30"
              @click="toggleRequirement(dropdown.id)"
            >
              <h3 class="text-5 font-semibold uppercase transition-all duration-300" >
                {{ dropdown.title }}
              </h3>
              <Icon
                :name="isRequirementExpanded(dropdown.id) ? 'radix-icons:chevron-up' : 'radix-icons:chevron-down'"
                class="h-6 w-6 transform text-[var(--primary-brown)] transition-all duration-300"
                :class="isRequirementExpanded(dropdown.id) ? 'rotate-180' : 'rotate-0'"
              />
            </button>
            <Transition
              enter-active-class="transition-all duration-500 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-[2000px]"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="opacity-100 max-h-[2000px]"
              leave-to-class="opacity-0 max-h-0"
            >
              <div
                v-if="isRequirementExpanded(dropdown.id)"
                class="overflow-hidden border-t border-[var(--olive-green)]/30 px-6 py-5 text-4.25 leading-relaxed space-y-4"
              >
                <template v-for="(block, blockIndex) in dropdown.blocks" :key="`${dropdown.id}-${blockIndex}`">
                  <p v-if="block.type === 'paragraph'" class="animate-fade-in-up transition-all duration-300" :style="{ animationDelay: `${blockIndex * 100}ms` }">
                    {{ block.text }}
                  </p>
                  <div v-else-if="isListBlock(block)" class="animate-fade-in-up transition-all duration-300 space-y-3" :style="{ animationDelay: `${blockIndex * 100}ms` }">
                    <p v-if="block.label" class="text-3.5 text-[var(--primary-brown)] font-semibold tracking-wide uppercase">
                      {{ block.label }}
                    </p>
                    <ul class="space-y-3">
                      <li v-for="(item, itemIndex) in block.items" :key="item" class="flex animate-fade-in-left items-start gap-3 transition-all duration-300" :style="{ animationDelay: `${(blockIndex * 100) + (itemIndex * 50)}ms` }">
                        <Icon :name="block.icon" class="mt-0.5 h-4 w-4 text-[var(--primary-brown)] transition-all duration-300 hover:scale-125" />
                        <span>{{ item }}</span>
                      </li>
                    </ul>
                  </div>
                </template>
              </div>
            </Transition>
          </article>
        </div>
      </div>
    </section>

    <!-- Journey -->
    <section id="journey" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <h2 class="animate-fade-in-up text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
          {{ tt('Your Surrogacy Journey: Steps & Timeline', '代孕旅程：步骤与时间线') }}
        </h2>
        <p class="mt-4 animate-fade-in-up text-4.5 leading-relaxed" style="animation-delay: 200ms;">
          {{ journeyIntro }}
        </p>

        <!-- Progress Timeline -->
        <div class="relative mt-12">
          <div class="absolute bottom-0 left-8 top-0 w-0.5 from-[var(--primary-brown)] via-[var(--olive-green)] to-[var(--primary-brown)] bg-gradient-to-b opacity-30" />
          <div class="grid gap-8">
            <div
              v-for="(step, index) in journeySteps"
              :key="step.title"
              class="relative flex animate-fade-in-up items-start gap-6"
              :style="{ animationDelay: `${index * 200}ms` }"
            >
              <!-- Step Number Circle -->
              <div class="relative z-10 flex-shrink-0">
                <div class="h-16 w-16 flex items-center justify-center border-4 border-[var(--primary-brown)] rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                  <span class="text-2xl text-[var(--primary-brown)] font-bold">{{ index + 1 }}</span>
                </div>
              </div>

              <!-- Step Content -->
              <div class="flex-1 border border-[var(--olive-green)]/40 rounded-5 bg-white/95 p-6 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl">
                <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
                  {{ step.title }}
                </h3>
                <div class="mt-4 text-4.25 leading-relaxed space-y-3">
                  <p
                    v-for="(detail, detailIndex) in step.details" :key="detail"
                    class="animate-fade-in-left transition-all duration-300"
                    :style="{ animationDelay: `${(index * 200) + (detailIndex * 100)}ms` }"
                  >
                    {{ detail }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-10 animate-fade-in-up text-4.5 leading-relaxed space-y-6" style="animation-delay: 1400ms;">
          <p
            v-for="(paragraph, index) in timelineParagraphs" :key="paragraph"
            class="transition-all duration-300"
            :style="{ animationDelay: `${1400 + (index * 200)}ms` }"
          >
            {{ paragraph }}
          </p>
          <p class="transition-all duration-300" style="animation-delay: 1800ms;">
            {{ communicationParagraph }}
          </p>
        </div>
      </div>
    </section>

    <!-- Compensation -->
    <section id="compensation" class="bg-[var(--yunda-petal)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <h2 class="animate-fade-in-up text-center text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
          {{ tt('Compensation & Benefits', '补偿与福利') }}
        </h2>
        <p class="mt-6 animate-fade-in-up text-4.25 leading-relaxed" style="animation-delay: 400ms;">
          {{ tt('Most first-time surrogates in Southern California receive total compensation in the mid–five figures, plus structured benefits. This section explains how surrogate pay works, what is covered and how your payments are protected.', '南加州首次代孕的总补偿通常为五位数中段并附带结构化福利。本节说明补偿如何支付、涵盖哪些内容以及如何保障款项。') }}
        </p>

        <!-- Compensation Overview Cards -->
        <div class="grid mt-12 gap-8 lg:grid-cols-3">
          <!-- Base Compensation Card -->
          <div class="hover:shadow-3xl animate-fade-in-up rounded-8 from-[var(--primary-brown)] to-[var(--yunda-bark)] bg-gradient-to-br p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105" style="animation-delay: 300ms;">
            <div class="mx-auto mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-white/20">
              <Icon name="radix-icons:star-filled" class="h-8 w-8 text-white" />
            </div>

            <h3 class="mb-4 text-center text-5 font-bold uppercase" >
              {{ tt('Base Compensation', '基础补偿') }}
            </h3>
            <div class="mb-4 text-center">
              <span class="text-6 font-bold">$61,000 - $70,000+</span>
              <p class="mt-2 text-3.5 opacity-90">
                {{ tt('First-time packages', '首次代孕常见区间') }}
              </p>
            </div>
            <p class="text-center text-4 leading-relaxed opacity-90">
              {{ tt('Our Southern California surrogate compensation packages are milestone-based, funded through secure escrow and clearly mapped out before you begin.', '南加州代孕补偿以里程碑发放，通过安全托管支付，开始前即可清晰了解。') }}
            </p>
          </div>

          <!-- Monthly Support Card -->
          <div class="hover:shadow-3xl animate-fade-in-up rounded-8 from-[var(--olive-green)] to-[var(--primary-brown)] bg-gradient-to-br p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105" style="animation-delay: 500ms;">
            <div class="mx-auto mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-white/20">
              <Icon name="radix-icons:calendar" class="h-8 w-8 text-white" />
            </div>
            <h3 class="mb-4 text-center text-5 font-bold uppercase" >
              {{ tt('Monthly Support', '月度支持') }}
            </h3>
            <div class="mb-4 text-center">
              <span class="text-6 font-bold">{{ tt('Ongoing', '持续') }}</span>
              <p class="mt-2 text-3.5 opacity-90">
                {{ tt('Living stipends', '生活津贴') }}
              </p>
            </div>
            <p class="text-center text-4 leading-relaxed opacity-90">
              {{ tt('Monthly stipends for everyday costs, plus maternity clothing and travel allowances.', '每月生活津贴，含孕期服装与出行补贴。') }}
            </p>
          </div>

          <!-- Additional Benefits Card -->
          <div class="hover:shadow-3xl animate-fade-in-up rounded-8 from-[var(--yunda-bark)] to-[var(--olive-green)] bg-gradient-to-br p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105" style="animation-delay: 700ms;">
            <div class="mx-auto mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-white/20">
              <Icon name="radix-icons:heart" class="h-8 w-8 text-white" />
            </div>
            <h3 class="mb-4 text-center text-5 font-bold uppercase" >
              {{ tt('Additional Benefits', '额外福利') }}
            </h3>
            <div class="mb-4 text-center">
              <span class="text-6 font-bold">{{ tt('Comprehensive', '全面') }}</span>
              <p class="mt-2 text-3.5 opacity-90">
                {{ tt('Full support', '完整支持') }}
              </p>
            </div>
            <p class="text-center text-4 leading-relaxed opacity-90">
              {{ tt('Travel, childcare, bedrest support, and pumping supplies when needed.', '包含出行、托育、卧床支持及泵奶用品等。') }}
            </p>
          </div>
        </div>

        <!-- Detailed Information Tabs -->
        <div class="mt-16">
          <div class="mb-8 flex flex-wrap animate-fade-in-up justify-center gap-4" style="animation-delay: 900ms;">
            <button
              v-for="(tab, index) in compensationTabs"
              :key="tab.id"
              type="button"
              class="border-2 rounded-full px-6 py-3 text-3.5 font-semibold uppercase transition-all duration-300"
              :class="activeCompensationTab === tab.id
                ? 'border-[var(--primary-brown)] bg-[var(--primary-brown)] text-white shadow-lg'
                : 'border-[var(--olive-green)] bg-white text-[var(--yunda-bark)] hover:border-[var(--primary-brown)] hover:bg-[var(--yunda-petal)]'"
              :style="{ animationDelay: `${1000 + (index * 100)}ms` }"
              @click="activeCompensationTab = tab.id"
            >
              {{ tab.title }}
            </button>
          </div>

          <!-- Tab Content -->
          <div class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-8 shadow-xl" style="animation-delay: 1200ms;">
            <div v-if="activeCompensationTab === 'coverage'" class="space-y-6">
              <h3 class="mb-6 text-5 text-[var(--primary-brown)] font-semibold uppercase" >
                {{ tt('What Surrogate Compensation Covers', '补偿覆盖范围') }}
              </h3>
              <div class="grid gap-6 lg:grid-cols-2">
                <div class="space-y-4">
                  <p
                    v-for="(paragraph, index) in compensationCoverParagraphs" :key="paragraph"
                    class="animate-fade-in-left text-4.25 leading-relaxed transition-all duration-300"
                    :style="{ animationDelay: `${1300 + (index * 100)}ms` }"
                  >
                    {{ paragraph }}
                  </p>
                </div>
                <div class="rounded-6 bg-[var(--yunda-petal)]/50 p-6">
                  <h4 class="mb-4 text-4 text-[var(--primary-brown)] font-semibold uppercase">
                    {{ tt('Typical Inclusions', '常见包含项') }}
                  </h4>
                  <ul class="space-y-3">
                    <li
                      v-for="(item, index) in typicalInclusions" :key="item"
                      class="flex animate-fade-in-left items-start gap-3 rounded p-2 text-4 leading-relaxed transition-all duration-300 hover:bg-white/50"
                      :style="{ animationDelay: `${1400 + (index * 50)}ms` }"
                    >
                      <Icon name="radix-icons:check-circled" class="mt-0.5 h-4 w-4 text-[var(--primary-brown)] transition-all duration-300 hover:scale-125" />
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-if="activeCompensationTab === 'payments'" class="space-y-6">
              <h3 class="mb-6 text-5 text-[var(--primary-brown)] font-semibold uppercase" >
                {{ tt('How Payments Work', '支付方式') }}
              </h3>
              <div class="grid gap-8 lg:grid-cols-2">
                <div class="space-y-4">
                  <p
                    v-for="(paragraph, index) in paymentsParagraphs" :key="paragraph"
                    class="animate-fade-in-left text-4.25 leading-relaxed transition-all duration-300"
                    :style="{ animationDelay: `${1300 + (index * 100)}ms` }"
                  >
                    {{ paragraph }}
                  </p>
                </div>
                <div class="border border-[var(--olive-green)]/30 rounded-6 from-[var(--yunda-petal)] to-white bg-gradient-to-br p-6">
                  <h4 class="mb-4 text-4 text-[var(--primary-brown)] font-semibold uppercase">
                    {{ tt('Payment Timeline', '付款时间线') }}
                  </h4>
                  <div class="space-y-3">
                    <div
                      v-for="(milestone, index) in milestonesList" :key="milestone"
                      class="flex animate-fade-in-left items-center gap-3 rounded bg-white/70 p-3 transition-all duration-300 hover:bg-white hover:shadow-md"
                      :style="{ animationDelay: `${1400 + (index * 100)}ms` }"
                    >
                      <div class="h-8 w-8 flex items-center justify-center rounded-full bg-[var(--primary-brown)] text-3 text-white font-bold">
                        {{ index + 1 }}
                      </div>
                      <span class="text-4">{{ milestone }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeCompensationTab === 'benefits'" class="space-y-6">
              <h3 class="mb-6 text-5 text-[var(--primary-brown)] font-semibold uppercase" >
                {{ tt('Benefits That Make Life Easier', '让生活更轻松的福利') }}
              </h3>
              <div class="grid gap-8 lg:grid-cols-2">
                <div class="space-y-4">
                  <p
                    v-for="(paragraph, index) in benefitsIntroParagraphs" :key="paragraph"
                    class="animate-fade-in-left text-4.25 leading-relaxed transition-all duration-300"
                    :style="{ animationDelay: `${1300 + (index * 100)}ms` }"
                  >
                    {{ paragraph }}
                  </p>
                  <p class="animate-fade-in-left text-4.25 leading-relaxed transition-all duration-300" style="animation-delay: 1400ms;">
                    {{ benefitsClosingParagraph }}
                  </p>
                </div>
                <div class="rounded-6 bg-[var(--yunda-petal)]/50 p-6">
                  <h4 class="mb-4 text-4 text-[var(--primary-brown)] font-semibold uppercase">
                    {{ tt('Support Examples', '支持示例') }}
                  </h4>
                  <ul class="space-y-3">
                    <li
                      v-for="(item, index) in supportExamples" :key="item"
                      class="flex animate-fade-in-left items-start gap-3 rounded p-2 text-4 leading-relaxed transition-all duration-300 hover:bg-white/50"
                      :style="{ animationDelay: `${1500 + (index * 50)}ms` }"
                    >
                      <Icon name="radix-icons:dot-filled" class="mt-1 h-3 w-3 text-[var(--primary-brown)] transition-all duration-300 hover:scale-125" />
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-if="activeCompensationTab === 'protection'" class="space-y-6">
              <h3 class="mb-6 text-5 text-[var(--primary-brown)] font-semibold uppercase" >
                {{ tt('Legal, Insurance, and Protection', '法律、保险与保障') }}
              </h3>
              <div class="grid gap-8 lg:grid-cols-2">
                <div class="space-y-4">
                  <p class="animate-fade-in-left text-4.25 leading-relaxed transition-all duration-300" style="animation-delay: 1300ms;">
                    {{ legalProtectionParagraph }}
                  </p>
                  <p class="animate-fade-in-left text-4.25 leading-relaxed transition-all duration-300" style="animation-delay: 1400ms;">
                    {{ experiencedCarrierParagraph }}
                  </p>
                </div>
                <div class="border border-[var(--olive-green)]/30 rounded-6 from-[var(--yunda-petal)] to-white bg-gradient-to-br p-6">
                  <h4 class="mb-4 text-4 text-[var(--primary-brown)] font-semibold uppercase">
                    {{ tt('Our Promise', '我们的承诺') }}
                  </h4>
                  <div class="space-y-4">
                    <p
                      v-for="(paragraph, index) in clarityParagraphs" :key="paragraph"
                      class="animate-fade-in-left text-4 leading-relaxed transition-all duration-300"
                      :style="{ animationDelay: `${1500 + (index * 100)}ms` }"
                    >
                      {{ paragraph }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Yunda -->
    <section id="why-yunda" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <h2 class="animate-fade-in-up text-8 font-semibold tracking-wide uppercase transition-all duration-700 hover:scale-105 lg:text-10" >
          {{ tt('Why Yunda', '为什么选择 Yunda') }}
        </h2>
        <p class="mt-4 animate-fade-in-up text-4.5 leading-relaxed transition-all duration-500" style="animation-delay: 200ms;">
          {{ tt('Yunda is a focused Southern California surrogacy program rather than a nationwide call center. You work with a small, local team that knows the clinics, hospitals and legal framework in this region.', 'Yunda 是扎根南加州的代孕项目，而不是全国呼叫中心。你将与熟悉本地区诊所、医院和法律体系的小型本地团队合作。') }}
        </p>
        <div class="mt-8 flex animate-fade-in-up justify-center" style="animation-delay: 200ms;">
          <div class="image-placeholder max-w-160 w-full transition-all duration-500 hover:scale-105 hover:shadow-xl">
            <picture class="block h-full w-full">
              <source srcset="/images/landing-page1/Yunda-Local-Care.webp" type="image/webp">
              <img src="/images/landing-page1/Yunda-Local-Care.jpg" :alt="tt('Why Yunda', '为什么选择 Yunda')">
            </picture>
          </div>
        </div>
        <div class="grid mt-10 gap-8 lg:grid-cols-2">
          <div
            v-for="(pillar, index) in yundaPillars"
            :key="pillar.title"
            class="animate-fade-in-up border border-[var(--primary-brown)]/30 rounded-5 bg-white/90 p-6 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:bg-[var(--yunda-petal)]/60 hover:shadow-xl hover:-translate-y-2"
            :style="{ animationDelay: `${400 + (index * 200)}ms` }"
          >
            <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
              {{ pillar.title }}
            </h3>
            <p class="mt-3 text-4.25 leading-relaxed transition-all duration-300">
              {{ pillar.body }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative overflow-hidden bg-[var(--yunda-bark)] py-18 text-white">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/4 top-0 h-60 w-60 animate-pulse rounded-full bg-[var(--primary-brown)]/40 blur-[160px]" />
        <div class="absolute bottom-0 right-1/5 h-48 w-48 animate-pulse rounded-full bg-[var(--olive-green)]/50 blur-[140px]" style="animation-delay: 1s;" />
      </div>
      <div class="relative mx-auto max-w-260 px-5 text-center">
        <h2 class="animate-fade-in-up text-8 font-semibold tracking-wide uppercase transition-all duration-700 hover:scale-105 lg:text-10" >
          {{ tt('Ready to Carry with Confidence?', '准备好自信开启代孕之旅？') }}
        </h2>
        <p class="mt-4 animate-fade-in-up text-4.5 leading-relaxed transition-all duration-500" style="animation-delay: 200ms;">
          {{ tt('Start with a plan that centers your voice, honors your experience, and delivers for the family you choose to help.', '从一个以你为中心、尊重你的经验、并帮助你所选择家庭的计划开始。') }}
        </p>
        <div class="mt-8 flex flex-wrap animate-fade-in-up justify-center gap-4" style="animation-delay: 400ms;">
          <NuxtLink
            to="/be-surrogate"
            class="rounded-full bg-white px-6 py-3 text-3.5 text-[var(--yunda-bark)] font-semibold uppercase transition-all duration-300 hover:scale-110 hover:bg-[var(--yunda-petal)] hover:shadow-xl"
          >
            {{ tt('Start Application', '开始申请') }}
          </NuxtLink>
          <NuxtLink
            to="/journey"
            class="border border-white rounded-full px-6 py-3 text-3.5 text-white font-semibold uppercase transition-all duration-300 hover:scale-110 hover:bg-white/10 hover:shadow-xl"
          >
            {{ tt('Explore the Journey', '了解流程') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<style scoped>
.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  border: 2px dashed rgba(169, 108, 66, 0.5);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  letter-spacing: 0.2em;
}

/* Custom Animation Classes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out forwards;
  opacity: 0;
}

/* Smooth scrolling for better UX */
html {
  scroll-behavior: smooth;
}

/* Enhanced hover effects */
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Improved focus states for accessibility */
button:focus,
a:focus {
  outline: 2px solid var(--primary-brown);
  outline-offset: 2px;
}

/* Better mobile responsiveness */
@media (max-width: 768px) {
  .animate-fade-in-up,
  .animate-fade-in-left,
  .animate-fade-in-right {
    animation-duration: 0.6s;
  }
}
</style>

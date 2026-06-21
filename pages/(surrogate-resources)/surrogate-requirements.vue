<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
// Vue composables are auto-imported in Nuxt 3
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { buildCoreServicePageSchemas } from '~/utils/schema'

useScrollAnimation()

const { locale } = useI18n()
const localePath = useLocalePath()
const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en: string, zh: string) => (isZh.value ? zh : en)

const pageTitle = computed(() =>
  tt(
    'Surrogate Requirements & Surrogacy Qualifications: Become a Surrogate',
    '代孕要求与资格：成为代孕妈妈',
  ),
)
const pageDescription = computed(() =>
  tt(
    'Learn surrogacy requirements and surrogate qualifications in the U.S.—medical and lifestyle criteria, IVF surrogacy process.',
    '了解美国代孕要求与资格——医疗与生活方式标准、IVF 代孕流程。',
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

const sections = computed(() => [
  { id: 'intro', label: tt('Overview', '概览') },
  { id: 'quick-eligibility', label: tt('Quick Eligibility', '快速资格') },
  { id: 'medical-lifestyle', label: tt('Medical & Lifestyle', '医疗与生活方式') },
  { id: 'disqualify', label: tt('Disqualifications', '不符合情况') },
  { id: 'process', label: tt('Screening Steps', '筛查步骤') },
  { id: 'compensation', label: tt('Compensation & Support', '补偿与支持') },
  { id: 'faq', label: tt('FAQ', '常见问题') },
])

const activeSection = ref(sections.value[0].id)

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleScroll() {
  const offsets = sections.value.map((section) => {
    const element = document.getElementById(section.id)
    if (!element)
      return { id: section.id, distance: Number.POSITIVE_INFINITY }
    const rect = element.getBoundingClientRect()
    return { id: section.id, distance: Math.abs(rect.top - 160) }
  })
  activeSection.value = offsets.reduce((prev, current) => (current.distance < prev.distance ? current : prev)).id
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const quickEligibilityCards = computed(() => [
  {
    title: tt('Core Surrogacy Requirements', '核心代孕要求'),
    items: [
      tt('Age 21–39 (clinic-guided surrogate age limit).', '年龄 21–39 岁（诊所要求范围）。'),
      tt('At least one full-term birth with healthy records.', '至少一次健康足月分娩记录。'),
      tt('BMI within clinic range.', 'BMI 在诊所要求范围内。'),
      tt('No smoking, vaping, or drug use.', '不吸烟、不电子烟、不使用毒品。'),
      tt('Reliable transportation and a stable schedule.', '交通便利且日程稳定。'),
      tt('These are the baseline surrogate requirements and surrogate qualifications for gestational surrogacy.', '以上为妊娠代孕的基础要求与资格。'),
    ],
  },
  {
    title: tt('Citizenship & Where You Live', '国籍与居住地'),
    items: [
      tt('U.S. citizens only.', '仅限美国公民。'),
      tt('You live in a state that works with our clinics and attorneys.', '居住在我们诊所与律师可合作的州。'),
      tt('You can travel for screening and embryo transfer when needed.', '可在需要时出行完成筛查与移植。'),
      tt('Meet these points and you can confidently become a surrogate.', '满足这些条件即可安心成为代孕妈妈。'),
    ],
  },
  {
    title: tt('Health & Lifestyle Fit', '健康与生活方式匹配'),
    items: [
      tt('You manage health conditions under a doctor’s care.', '如有健康状况需在医生管理下稳定。'),
      tt('You wait until you finish breastfeeding before meds and transfer.', '停止哺乳后再开始用药与移植。'),
      tt('You keep a healthy routine: sleep, nutrition, and movement.', '保持健康作息：睡眠、营养与运动。'),
      tt('This profile supports safe gestational surrogacy and strong surrogate qualifications.', '该标准有助于安全妊娠代孕与良好资格。'),
    ],
  },
  {
    title: tt('Support & Readiness', '支持与准备度'),
    items: [
      tt('Your home offers steady support. Partner or family can help with rides and childcare.', '家庭支持稳定，伴侣或家人可协助出行与托育。'),
      tt('You feel ready for appointments, communication, and matching with intended parents.', '准备好就诊、沟通与匹配流程。'),
      tt('You understand the commitment and want to be a surrogate for the right reasons.', '理解承诺并以正确动机成为代孕妈妈。'),
      tt('With this foundation, a surrogate mother can move through screening and matching smoothly.', '有了这些基础，筛查与匹配会更顺利。'),
    ],
  },
])

const medicalLifestyleSections = computed(() => [
  {
    heading: tt('Reproductive History & Overall Health', '生育史与整体健康'),
    body: [
      tt('You meet the surrogacy requirements best when you have at least one full-term birth and stable prenatal records. Clinics review C-section history, cycle regularity, and current health to confirm surrogate qualifications for gestational surrogacy.', '至少一次足月分娩与稳定产检记录最符合代孕要求。诊所会评估剖宫产史、月经规律与健康状况，以确认妊娠代孕资格。'),
      tt('Keep a healthy routine—sleep, nutrition, and movement—and follow your doctor’s advice on BMI and medications. This helps you become a surrogate with confidence.', '保持健康作息、营养与运动，并遵循医生关于 BMI 与用药建议，这会让你更有信心成为代孕妈妈。'),
    ],
  },
  {
    heading: tt('Medical Screening (Clinic-Guided)', '医学筛查（诊所主导）'),
    body: [
      tt('Your screening follows a clear medical process. The clinic reviews OB records first. Then the hospital arranges full medical exams for you (and your partner if applicable) to confirm you meet transfer criteria and to issue medical clearance.', '筛查遵循清晰的医疗流程：诊所先审核产科记录，然后安排全面体检（必要时含伴侣），确认移植资格并出具医疗清关。'),
    ],
  },
  {
    heading: tt('Mental Health & Support', '心理健康与支持'),
    body: [
      tt('Your profile includes health history and psychological screening details. Our team shares this with intended parents during matching to ensure fit and safety. Strong home support makes the journey smoother and aligns with core surrogate requirements.', '档案包含健康史与心理评估细节。匹配时我们会与意向父母分享以确保安全契合。良好的家庭支持能让旅程更顺利，并符合核心要求。'),
    ],
  },
  {
    heading: tt('IVF Readiness & Embryo Transfer', 'IVF 准备与胚胎移植'),
    body: [
      tt('When the clinic clears you, the doctor starts the pre-transfer regimen. You follow meds and injections for about 4–6 weeks, then complete the embryo transfer and begin pregnancy monitoring.', '诊所清关后，医生启动移植前方案，约 4–6 周用药与注射，随后完成胚胎移植并进入妊娠监测。'),
    ],
  },
  {
    heading: tt('Care Standards & Partner Clinics', '护理标准与合作诊所'),
    body: [
      tt('You receive care through partner programs with advanced labs and strict quality controls. Partner centers maintain CLIA/CAP-standard embryology labs and use leading culture, testing, and cryo methods to support safe IVF surrogacy care.', '你将通过先进实验室与严格质量控制的合作项目接受照护。合作中心维持 CLIA/CAP 标准胚胎实验室，并采用先进培养、检测与冷冻方法，支持安全的 IVF 代孕。'),
      tt('Examples include California Fertility Partners and Gen 5 Fertility Center, along with Harvest and Incinta for comprehensive IVF and PGT support.', '合作示例包括 California Fertility Partners、Gen 5 Fertility Center，以及 Harvest、Incinta 等提供 IVF 与 PGT 支持的机构。'),
    ],
  },
  {
    heading: tt('Coordination & Follow-Up', '协调与跟进'),
    body: [
      tt('You won’t navigate this alone. A dedicated project manager coordinates appointments and key milestones and provides bilingual updates, including weekly and monthly reports, so you always know what comes next in the surrogacy requirements process.', '你不会独自面对流程。专属项目经理协调就诊与关键里程碑，并提供双语更新（含周报与月报），让你随时清楚下一步。'),
    ],
  },
])

const disqualifySections = computed(() => [
  {
    title: tt('Medical Factors', '医疗因素'),
    paragraphs: [
      tt('Clinics check your health against clear surrogacy requirements. Uncontrolled diabetes or hypertension can stop approval. Severe past OB issues may also block gestational surrogacy. Final eligibility depends on your physician’s review and formal medical clearance from the clinic.', '诊所会根据明确的代孕要求评估健康状况。未控制的糖尿病或高血压可能导致无法通过审核。严重的产科问题也可能阻止妊娠代孕。最终资格取决于医生评估与诊所正式清关。'),
    ],
  },
  {
    title: tt('Obstetric & Reproductive History', '产科与生育史'),
    paragraphs: [
      tt('Doctors look closely at delivery records and uterine health. Certain C-section histories or complications can lead to a “not cleared” result. If the clinic decides you don’t meet transfer criteria, you cannot become a surrogate for that cycle.', '医生会重点查看分娩记录与子宫健康。某些剖宫产史或并发症可能导致“不通过”。若诊所判定未达移植标准，则该周期无法成为代孕妈妈。'),
    ],
  },
  {
    title: tt('Lifestyle & Safety Considerations', '生活方式与安全因素'),
    paragraphs: [
      tt('Current nicotine use, substance use, or heavy alcohol use can fail screening. Lack of reliable transportation or an unsafe home setting can also pause the process. These issues conflict with core surrogate requirements and clinic guidance during screening.', '当前使用尼古丁、药物或大量饮酒可能无法通过筛查。交通不便或不安全的居住环境也会导致流程暂停。这些情况与核心要求及诊所筛查标准冲突。'),
    ],
  },
  {
    title: tt('Legal & Logistics Constraints', '法律与执行限制'),
    paragraphs: [
      tt('You need legal clearance after medical clearance. If attorneys cannot finalize the contract or state guidance conflicts with your case, the cycle cannot move forward. You also need flexibility for travel and scheduled embryo transfer.', '医疗清关后还需法律清关。若律师无法完成合同或州法律与个案冲突，则流程无法继续。你还需具备出行与移植排期的灵活性。'),
    ],
  },
  {
    title: tt('Temporary Deferrals (Not Permanent “No”)', '临时延后（非永久拒绝）'),
    paragraphs: [
      tt('Breastfeeding, very recent tattoos/piercings, recent childbirth, or out-of-range BMI may require a short wait. The clinic sets timing, then starts meds and transfer when you are ready. Typical pre-transfer prep lasts about 4–6 weeks before IVF embryo transfer.', '哺乳期、近期纹身/穿孔、刚分娩或 BMI 超范围可能需要短暂等待。诊所会安排时间，准备就绪后再开始用药与移植。移植前准备通常为 4–6 周。'),
    ],
  },
])

const processSteps = computed(() => [
  {
    title: tt('Step 1 — Records Review & Medical Screening', '步骤 1 — 病历审核与医学筛查'),
    text: tt('We start with your OB records. The clinic checks your history and current health to confirm surrogate qualifications. The hospital then books full medical exams for you）. Doctors decide if you meet transfer criteria and issue medical clearance. These are essential surrogacy steps before matching.', '从产科记录开始，诊所评估病史与当前健康，确认代孕资格。随后安排全面体检，医生判断是否符合移植标准并出具清关。这是匹配前的关键步骤。'),
  },
  {
    title: tt('Step 2 — Psychological Evaluation', '步骤 2 — 心理评估'),
    text: tt('You meet with a licensed therapist. We review support, expectations, and stress management. Your profile includes key health  so matching stays safe and transparent. This keeps gestational surrogacy grounded in real readiness.', '与持证心理咨询师会面，评估支持系统、期望与压力管理。档案包含关键健康信息以确保匹配安全透明，使妊娠代孕建立在真实准备之上。'),
  },
  {
    title: tt('Step 3 — Legal Clearance', '步骤 3 — 法律清关'),
    text: tt('After medical clearance, attorneys draft and review your contract and insurance documents. Both sides sign the agreement. Courts later rely on this contract for the pre-birth order. Legal clearance protects you and the intended parents.', '医疗清关后，律师起草并审核合同与保险文件，双方签署。法院将依据合同办理产前裁定。法律清关保护代孕妈妈与意向父母。'),
  },
  {
    title: tt('Step 4 — Cycle Prep & Embryo Transfer', '步骤 4 — 周期准备与胚胎移植'),
    text: tt('Your doctor starts pre-transfer meds and injections. This phase usually runs about 4–6 weeks. Then you complete the embryo transfer and begin pregnancy monitoring. These surrogate steps follow standard IVF surrogacy process protocols.', '医生启动移植前用药与注射，通常持续 4–6 周。随后完成胚胎移植并进入孕期监测，流程符合标准 IVF 代孕方案。'),
  },
  {
    title: tt('Step 5 — Pregnancy Monitoring & Checkpoints', '步骤 5 — 妊娠监测与检查节点'),
    text: tt('You take an HCG test about 10–14 days after transfer and confirm fetal heartbeat at ~4–5 weeks. From 11 weeks, an OB manages routine care. Our project managers check in multiple times each week and provide a weekly report, so you always know the plan. These checkpoints keep the surrogacy requirements clear from transfer to delivery.', '移植后约 10–14 天做 HCG 检测，4–5 周确认心跳。11 周起由产科医生负责常规孕检。项目经理每周多次跟进并提供周报，确保从移植到分娩计划清晰。'),
  },
  {
    title: tt('Step 6 — Ongoing Coordination & Updates', '步骤 6 — 持续协调与更新'),
    text: tt('A dedicated  handles schedules, milestone reminders, and coordination. You receive weekly and monthly cycle reports and 24/7 bilingual support. This structure keeps every step organized and builds trust throughout gestational surrogacy.', '专属团队负责排期、里程碑提醒与协调。你将获得周报、月报与 24/7 双语支持，使流程有序并建立信任。'),
  },
])

const compensationHighlights = computed(() => [
  {
    title: tt('How Payments Work (Milestones + Escrow)', '付款方式（里程碑 + 托管）'),
    paragraphs: [
      tt('We use an independent trust account for surrogate compensation and reimbursements. The escrow pays items by milestones and contract terms. After the clinic confirms key checkpoints (like HCG and fetal heartbeat), the program triggers the next surrogacy payment and keeps the escrow at the required minimum per policy.', '我们使用独立托管账户发放补偿与报销。托管按里程碑与合同条款支付。诊所确认关键节点（如 HCG 与心跳）后，触发下一笔补偿，并按要求保持最低余额。'),
      tt('The trust account covers approved items only. You see clear statements and a clean paper trail.', '托管仅支付获批项目，账单清晰、记录完整。'),
    ],
  },
  {
    title: tt('What the Escrow May Cover', '托管可覆盖的项目'),
    paragraphs: [
      tt('The trust pays contract items: your surrogate pay installments, insurance costs, attorney fees, and other approved, itemized expenses. We manage these through the third-party escrow to keep funds compliant and on time.', '托管支付合同项目：补偿分期、保险费用、律师费及其他获批的明细支出。通过第三方托管管理，确保合规与准时。'),
    ],
  },
  {
    title: tt('Legal Protection & Insurance', '法律保障与保险'),
    paragraphs: [
      tt('You work with your own attorney. We coordinate contract drafting and review after medical clearance. The legal team prepares documents that support the pre-birth order process in your state.', '你将与自己的律师合作。医疗清关后我们协调合同起草与审核，法律团队准备支持本州产前裁定的文件。'),
      tt('For insurance planning, we partner with industry leaders. ART Risk focuses on surrogacy insurance, trust oversight support, and contract review across the U.S. SeedTrust provides specialized reproductive escrow services with strong compliance and a modern online platform.', '保险规划方面，我们与行业领先机构合作。ART Risk 专注代孕保险、托管监督与合同审查；SeedTrust 提供合规的生殖托管服务与现代化平台。'),
    ],
  },
  {
    title: tt('Dedicated Team & 24/7 Support', '专属团队与 24/7 支持'),
    paragraphs: [
      tt('You don’t navigate this alone. A project manager handles schedules, milestone reminders, and day-to-day coordination. We send weekly and monthly cycle reports and offer 24/7 bilingual support, so you always know what comes next.', '你不会独自面对流程。项目经理负责排期、里程碑提醒与日常协调，并提供周报、月报与 24/7 双语支持，让你清楚下一步。'),
      tt('During pregnancy, our team checks in several times each week and helps arrange key appointments. The weekly report system keeps everyone aligned.', '孕期我们每周多次跟进并协助安排关键就诊，周报系统让各方保持一致。'),
    ],
  },
])

const faqItems = computed(() => [
  {
    question: tt('Do surrogates get paid? How does the surrogate payment schedule work?', '代孕妈妈会获得补偿吗？付款时间表如何运作？'),
    answer: tt('Yes. Qualified surrogates are paid through a compensation package that may include base compensation, allowances, and approved reimbursements. Payments are usually tied to milestones and handled through escrow or a trust account, so compensation and reimbursements are documented clearly.', '会的。符合条件的代孕妈妈通常通过补偿方案获得支付，可能包括基础补偿、津贴和获批报销。付款通常与里程碑相关，并通过托管或信托账户处理，让补偿和报销记录更清晰。'),
  },
  {
    question: tt('How much do surrogates make in the U.S.?', '美国代孕妈妈一般能获得多少补偿？'),
    answer: tt('Surrogate compensation in the U.S. varies by agency, state, experience, agreement terms, medical events, and approved reimbursements. Yunda currently explains a $61,000+ total compensation package for qualified surrogate candidates, with exact amounts confirmed only after eligibility and agreement review.', '美国代孕妈妈补偿会因机构、州、经验、协议条款、医疗事件和获批报销而变化。孕达目前为符合条件的候选人说明 $61,000+ 总补偿方案，具体金额需在资格和协议审核后确认。'),
  },
  {
    question: tt('What counts as surrogate compensation vs. reimbursable surrogacy expenses?', '代孕补偿与可报销费用有什么区别？'),
    answer: tt('Surrogate compensation is payment for the surrogate’s time, commitment, and pregnancy journey. Reimbursable expenses cover approved out-of-pocket costs such as travel, childcare, maternity clothing, medical co-pays, or lost wages when allowed by the agreement. Both should be defined clearly before moving forward.', '代孕补偿是对代孕妈妈时间、投入和孕程的支付。可报销费用用于覆盖协议允许的实际支出，例如出行、托育、孕期服装、医疗自付或误工。两者都应在推进前清楚定义。'),
  },
  {
    question: tt('What affects surrogate pay—experience, location, or medical factors?', '哪些因素会影响代孕补偿？'),
    answer: tt('Surrogate pay can be affected by prior surrogacy experience, state of residence, insurance, agreement terms, and pregnancy-related events such as twins, C-section, bed rest, or approved travel. Final compensation should always be confirmed in the written agreement and escrow schedule.', '代孕补偿可能受既往代孕经验、居住州、保险、协议条款，以及双胎、剖宫产、卧床或获批出行等孕期事件影响。最终补偿应以书面协议和托管付款时间表为准。'),
  },
])

const surrogateRequirementItemNames = [
  'Records Review & Medical Screening',
  'Psychological Evaluation',
  'Legal Clearance',
  'Cycle Prep & Embryo Transfer',
  'Pregnancy Monitoring & Checkpoints',
  'Ongoing Coordination & Updates',
]

const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: '/surrogate-requirements',
  name: 'Surrogate Requirements & Surrogacy Qualifications: Become a Surrogate',
  description: pageDescription.value,
  about: 'Gestational carrier requirements and surrogate qualifications',
  audience: 'Potential gestational carriers / surrogate applicants',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  service: {
    name: 'Gestational Carrier Requirements and Qualification Review',
    serviceType: 'Gestational carrier eligibility and qualification guidance',
    areaServed: ['California', 'United States'],
    audience: 'Potential gestational carriers / surrogate applicants',
    description: 'Guidance for potential gestational carriers on surrogate requirements, qualifications, medical and lifestyle criteria, disqualifying factors, medical clearance, psychological evaluation, legal clearance, cycle preparation, embryo transfer, pregnancy monitoring, and ongoing coordination.',
  },
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'For Surrogates', url: '/surrogates' },
    { name: 'Surrogate Requirements', url: '/surrogate-requirements' },
  ],
  faqs: faqItems.value,
  itemList: {
    name: 'Screening & Clearance Steps: IVF Surrogacy Process',
    items: [
      ...surrogateRequirementItemNames.map((name, index) => ({
        position: index + 1,
        name,
        description: processSteps.value[index]?.text,
        url: '/surrogate-requirements',
      })),
      ...((quickEligibilityCards.value[0]?.items || []).slice(0, 5).map((name, index) => ({
        position: surrogateRequirementItemNames.length + index + 1,
        name: name.replace(/\.$/, ''),
        url: '/surrogate-requirements',
      }))),
    ],
  },
}))

useHead(() => ({
  script: coreServicePageSchemas.value.map((schema, index) => ({
    key: `schema-surrogate-requirements-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))

const expandedFaq = ref<Record<string, boolean>>({})

function toggleFaq(question: string) {
  expandedFaq.value = {
    ...expandedFaq.value,
    [question]: !expandedFaq.value[question],
  }
}

const requirementTabs = computed(() => [
  { id: 'core', label: tt('Core Requirements', '核心要求') },
  { id: 'citizenship', label: tt('Citizenship & Location', '国籍与居住地') },
  { id: 'health', label: tt('Health & Lifestyle', '健康与生活方式') },
  { id: 'support', label: tt('Support & Readiness', '支持与准备度') },
])

const activeRequirementTab = ref(requirementTabs.value[0].id)

const tabContent = computed(() => {
  switch (activeRequirementTab.value) {
    case 'core':
      return quickEligibilityCards.value[0]
    case 'citizenship':
      return quickEligibilityCards.value[1]
    case 'health':
      return quickEligibilityCards.value[2]
    default:
      return quickEligibilityCards.value[3]
  }
})

const requirementIcons = [
  'lucide:check-circle-2',
  'lucide:map-pin',
  'lucide:heart-pulse',
  'lucide:users',
]

const processIcons = [
  'lucide:folder-clock',
  'lucide:user-check',
  'lucide:scale',
  'lucide:beaker',
  'lucide:activity',
  'lucide:headset',
]
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />

    <section class="relative overflow-hidden from-[var(--hero-center)]/80 via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b py-18 lg:py-24">
      <div class="pointer-events-none absolute inset-0 opacity-40">
        <div class="absolute left-12 top-12 h-44 w-44 rounded-full bg-[var(--olive-green)] blur-[140px]" />
        <div class="absolute bottom-14 right-16 h-60 w-60 rounded-full bg-[var(--primary-brown)]/70 blur-[180px]" />
      </div>
      <div class="relative mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div class="text-center space-y-6 lg:text-left">
            <h1 class="text-8 font-semibold leading-tight lg:text-12" >
              {{ tt('Surrogate Requirements & Surrogacy Qualifications: Become a Surrogate', '代孕要求与资格：成为代孕妈妈') }}
            </h1>
            <p class="text-4.5 leading-relaxed">
              {{ tt('Thinking about gestational surrogacy and ready to become a surrogate? This page explains the core surrogacy requirements in plain language. You’ll see the surrogate qualifications doctors and coordinators check, plus the steps to apply as a surrogate mother. If you meet these surrogate requirements, you can be a surrogate with confidence and start your journey today.', '想了解妊娠代孕并准备成为代孕妈妈？本页用清晰语言解释核心要求。你将看到医生与协调员审核的资格，以及申请成为代孕妈妈的步骤。若满足条件，就能自信开启旅程。') }}
            </p>
            <div class="flex flex-wrap justify-center gap-4 lg:justify-start">
              <NuxtLink
                to="/be-surrogate"
                class="rounded-full bg-[var(--primary-brown)] px-6 py-3 text-3.5 text-white font-semibold uppercase transition hover:bg-[var(--yunda-bark)]"
              >
                {{ tt('Check Your Eligibility', '查看资格') }}
              </NuxtLink>
              <a
                href="#quick-eligibility"
                class="border border-[var(--primary-brown)] rounded-full px-6 py-3 text-3.5 font-semibold uppercase transition hover:bg-white"
                @click.prevent="scrollToSection('quick-eligibility')"
              >
                {{ tt('View Requirements', '查看要求') }}
              </a>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="image-placeholder max-w-300 w-full transition-all duration-500 hover:scale-105">
              <img src="/images/landingpage3/Surrogate-Requirements.jpg" :alt="tt('Surrogate Requirements', '代孕要求')">
            </div>
          </div>
        </div>
      </div>
      <nav class="sticky left-0 top-24 z-40 mt-12">
        <div class="mx-auto max-w-280 px-5 lg:px-10">
          <div class="overflow-x-auto">
            <ul class="flex gap-4 border border-[var(--primary-brown)]/30 rounded-full bg-white/85 px-5 py-3 shadow-black/10 shadow-lg backdrop-blur">
              <li
                v-for="section in sections"
                :key="section.id"
              >
                <button
                  type="button"
                  class="rounded-full px-4 py-2 text-3 font-medium uppercase transition"
                  :class="activeSection === section.id ? 'bg-[var(--primary-brown)] text-white' : 'text-[var(--primary-brown)] hover:bg-[var(--yunda-petal)]'"
                  @click="scrollToSection(section.id)"
                >
                  {{ section.label }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>

    <SeoTrustNote
      :updated="tt('Last updated: June 18, 2026', '最后更新：2026年6月18日')"
      :reviewed-by="tt('Reviewed by Yunda Surrogacy team', '孕达代孕团队审阅')"
      :note="tt('This page explains common surrogate eligibility factors in plain language. Final approval depends on OB records, clinic medical clearance, psychological screening, legal review, and program requirements.', '本页用清晰语言说明常见代孕妈妈资格因素。最终批准取决于产科病历、诊所医学清关、心理筛查、法律审核与项目要求。')"
      :sources="[
        { label: tt('Apply to be a surrogate', '申请成为代孕妈妈'), href: localePath('/be-surrogate') },
        { label: tt('Surrogate compensation', '代孕补偿'), href: localePath('/surrogate-compensation') },
        { label: tt('Screening and eligibility', '筛查与资格'), href: localePath('/screening') },
      ]"
    />

    <section id="intro" class="py-18 lg:py-24">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="border border-[var(--olive-green)]/40 rounded-6 bg-white/95 p-10 shadow-black/10 shadow-lg">
          <p class="text-5 leading-relaxed">
            {{ tt('Thinking about gestational surrogacy and ready to become a surrogate? This page explains the core surrogacy requirements in plain language. You’ll see the surrogate qualifications doctors and coordinators check, plus the steps to apply as a surrogate mother. If you meet these surrogate requirements, you can be a surrogate with confidence and start your journey today.', '想了解妊娠代孕并准备成为代孕妈妈？本页用清晰语言解释核心要求。你将看到医生与协调员审核的资格，以及申请成为代孕妈妈的步骤。若满足条件，就能自信开启旅程。') }}
          </p>
        </div>
      </div>
    </section>

    <section id="quick-eligibility" class="bg-[var(--yunda-petal)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <h2 class="mb-4 animate-fade-in-up text-center text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
          {{ tt('Who We\'re Looking For: Surrogacy Requirements (Quick Eligibility)', '我们寻找的代孕妈妈：快速资格要求') }}
        </h2>
        <p class="mx-auto mb-12 max-w-220 animate-fade-in-up text-center text-4.5 leading-relaxed" style="animation-delay: 150ms;">
          {{ tt('Surrogate requirements usually start with age, pregnancy history, BMI, citizenship, lifestyle, and appointment readiness. These basics help identify whether a candidate may move forward to records review, screening, legal clearance, and matching.', '代孕妈妈资格通常从年龄、生育史、BMI、国籍、生活方式和就诊配合度开始。这些基础条件帮助判断候选人是否可能进入病历审核、筛查、法律清关与匹配。') }}
        </p>

        <div class="grid gap-12 lg:grid-cols-[0.6fr,0.4fr] lg:items-start">
          <!-- Left Content -->
          <div class="space-y-8">
            <p class="animate-fade-in-up text-center text-4.5 leading-relaxed lg:text-left" style="animation-delay: 200ms;">
              {{ tt('Tap through each category to confirm you meet the baseline surrogate qualifications. These panels summarize what clinics and coordinators review before you become a surrogate.', '点击各类别确认你符合基础资格。这些面板总结了诊所与协调员在你成为代孕妈妈前会审核的内容。') }}
            </p>

            <!-- Tab Navigation -->
            <div class="flex flex-wrap animate-fade-in-up justify-center gap-3 lg:justify-start" style="animation-delay: 400ms;">
              <button
                v-for="(tab, index) in requirementTabs"
                :key="tab.id"
                type="button"
                class="transform border-2 rounded-full px-6 py-3 text-3.5 font-semibold uppercase transition-all duration-300 hover:scale-105"
                :class="activeRequirementTab === tab.id
                  ? 'border-[var(--primary-brown)] bg-[var(--primary-brown)] text-white shadow-lg'
                  : 'border-[var(--olive-green)] bg-white text-[var(--yunda-bark)] hover:border-[var(--primary-brown)] hover:bg-[var(--yunda-petal)]'"
                :style="{ animationDelay: `${500 + (index * 100)}ms` }"
                @click="activeRequirementTab = tab.id"
              >
                {{ tab.label }}
              </button>
            </div>

            <!-- Tab Content -->
            <div class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-8 shadow-xl" style="animation-delay: 600ms;">
              <div class="mb-6 flex items-center gap-4">
                <div class="h-16 w-16 flex items-center justify-center rounded-full from-[var(--primary-brown)] to-[var(--yunda-bark)] bg-gradient-to-br text-white shadow-lg transition-all duration-300 hover:scale-110">
                  <Icon :name="requirementIcons[requirementTabs.findIndex((tab: any) => tab.id === activeRequirementTab)]" class="h-8 w-8" />
                </div>
                <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
                  {{ tabContent.title }}
                </h3>
              </div>
              <ul class="text-4.25 leading-relaxed space-y-4">
                <li
                  v-for="(item, index) in tabContent.items"
                  :key="item"
                  class="flex animate-fade-in-left items-start gap-3 rounded p-3 transition-all duration-300 hover:bg-[var(--yunda-petal)]/30"
                  :style="{ animationDelay: `${700 + (index * 100)}ms` }"
                >
                  <Icon name="radix-icons:check-circled" class="mt-0.5 h-4 w-4 text-[var(--primary-brown)] transition-all duration-300 hover:scale-125" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Right Image -->
          <div class="flex animate-fade-in-right justify-center lg:justify-end" style="animation-delay: 300ms;">
            <div class="relative max-w-400 w-full">
              <div class="absolute inset-0 rounded-8 from-[var(--primary-brown)]/20 to-[var(--olive-green)]/20 bg-gradient-to-br blur-xl" />
              <div class="hover:shadow-3xl relative overflow-hidden rounded-8 shadow-2xl transition-all duration-500 hover:scale-105">
                <img
                  src="/images/landingpage3/Surrogacy-Requirements.jpg"
                  :alt="tt('Surrogacy Requirements', '代孕要求')"
                  class="h-auto w-full object-cover"
                >
                <div class="absolute inset-0 from-black/20 to-transparent bg-gradient-to-t" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="medical-lifestyle" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 space-y-12 lg:px-10">
        <div class="text-center">
          <h2 class="animate-fade-in-up text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
            {{ tt('Medical & Lifestyle Requirements for Gestational Surrogacy', '妊娠代孕的医疗与生活方式要求') }}
          </h2>
          <p class="mx-auto mt-4 max-w-220 animate-fade-in-up text-4.5 leading-relaxed" style="animation-delay: 150ms;">
            {{ tt('Medical and lifestyle review helps clinics decide whether gestational surrogacy is safe to consider. Records, pregnancy history, medication needs, nicotine or drug use, mental health readiness, and home support all matter before clearance.', '医疗与生活方式审核帮助诊所判断是否适合考虑妊娠代孕。病历、孕产史、用药需求、尼古丁或药物使用、心理准备和家庭支持都会影响清关。') }}
          </p>
          <div class="mx-auto mt-4 h-1 w-32 animate-fade-in-up rounded-full bg-[var(--primary-brown)]" style="animation-delay: 200ms;" />
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <article
            v-for="(section, index) in medicalLifestyleSections"
            :key="section.heading"
            class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-8 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl"
            :style="{ animationDelay: `${300 + (index * 150)}ms` }"
          >
            <div class="mb-6 flex items-center gap-4">
              <div class="h-12 w-12 flex items-center justify-center rounded-full from-[var(--olive-green)] to-[var(--primary-brown)] bg-gradient-to-br text-white shadow-lg">
                <Icon name="radix-icons:heart-filled" class="h-6 w-6" />
              </div>
              <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
                {{ section.heading }}
              </h3>
            </div>
            <p
              v-for="(paragraph, pIndex) in section.body"
              :key="paragraph"
              class="mt-3 animate-fade-in-left text-4.25 leading-relaxed transition-all duration-300"
              :style="{ animationDelay: `${400 + (index * 150) + (pIndex * 100)}ms` }"
            >
              {{ paragraph }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section id="disqualify" class="relative overflow-hidden py-18 lg:py-24">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img
          src="/images/landingpage3/IVF-Surrogacy-Process.jpg"
          :alt="tt('IVF Surrogacy Process', 'IVF 代孕流程')"
          class="h-full w-full object-cover"
        >
        <div class="absolute inset-0 bg-[var(--yunda-bark)]/80" />
        <div class="absolute inset-0 from-transparent via-[var(--yunda-bark)]/60 to-[var(--yunda-bark)]/90 bg-gradient-to-b" />
      </div>

      <div class="relative z-10 mx-auto max-w-280 px-5 space-y-12 lg:px-10">
        <!-- Title with Background -->
        <div class="text-center">
          <h2 class="animate-fade-in-up text-7 text-white font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
            {{ tt('What Can Disqualify You From Becoming a Surrogate', '哪些情况会导致无法成为代孕妈妈') }}
          </h2>
          <p class="mx-auto mt-4 max-w-220 animate-fade-in-up text-4.5 text-white/86 leading-relaxed" style="animation-delay: 150ms;">
            {{ tt('Some factors permanently stop approval, while others simply delay the process. Medical clearance, legal clearance, insurance review, and clinic rules determine whether a candidate can safely move forward.', '有些因素会导致无法批准，有些只是暂时延后流程。医学清关、法律清关、保险审查和诊所规则会共同决定候选人是否能安全推进。') }}
          </p>
          <div class="mx-auto mt-4 h-1 w-24 animate-fade-in-up rounded-full bg-[var(--primary-brown)]" style="animation-delay: 200ms;" />
        </div>

        <!-- Content Cards -->
        <div class="grid gap-8 lg:grid-cols-2">
          <article
            v-for="(section, index) in disqualifySections"
            :key="section.title"
            class="hover:shadow-3xl animate-fade-in-up border border-white/20 rounded-8 bg-white/95 p-8 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)]"
            :style="{ animationDelay: `${300 + (index * 150)}ms` }"
          >
            <div class="mb-6 flex items-center gap-4">
              <div class="h-12 w-12 flex items-center justify-center rounded-full from-[var(--primary-brown)] to-[var(--yunda-bark)] bg-gradient-to-br text-white shadow-lg">
                <Icon name="radix-icons:exclamation-triangle" class="h-6 w-6" />
              </div>
              <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
                {{ section.title }}
              </h3>
            </div>
            <p
              v-for="(paragraph, pIndex) in section.paragraphs"
              :key="paragraph"
              class="mt-3 animate-fade-in-left text-4.25 leading-relaxed transition-all duration-300"
              :style="{ animationDelay: `${400 + (index * 150) + (pIndex * 100)}ms` }"
            >
              {{ paragraph }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section id="process" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 space-y-12 lg:px-10">
        <div class="text-center">
          <h2 class="animate-fade-in-up text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
            {{ tt('Screening & Clearance Steps: IVF Surrogacy Process', '筛查与清关步骤：IVF 代孕流程') }}
          </h2>
          <p class="mx-auto mt-4 max-w-220 animate-fade-in-up text-4.5 leading-relaxed" style="animation-delay: 150ms;">
            {{ tt('The IVF surrogacy process moves through records review, medical screening, psychological evaluation, legal clearance, medication preparation, embryo transfer, and pregnancy monitoring. Each step protects the surrogate, intended parents, and baby.', 'IVF 代孕流程包括病历审核、医学筛查、心理评估、法律清关、用药准备、胚胎移植和孕期监测。每一步都用于保护代孕妈妈、准父母和宝宝。') }}
          </p>
          <div class="mx-auto mt-4 h-1 w-32 animate-fade-in-up rounded-full bg-[var(--primary-brown)]" style="animation-delay: 200ms;" />
        </div>

        <!-- Process Timeline -->
        <div class="relative">
          <div class="absolute bottom-0 left-8 top-0 hidden w-0.5 from-[var(--primary-brown)] via-[var(--olive-green)] to-[var(--primary-brown)] bg-gradient-to-b opacity-30 lg:block" />
          <div class="grid gap-8 lg:grid-cols-3">
            <article
              v-for="(step, index) in processSteps"
              :key="step.title"
              class="relative flex animate-fade-in-up items-start gap-6"
              :style="{ animationDelay: `${300 + (index * 200)}ms` }"
            >
              <!-- Step Number Circle -->
              <div class="relative z-10 flex-shrink-0">
                <div class="h-16 w-16 flex items-center justify-center border-4 border-[var(--primary-brown)] rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                  <span class="text-2xl text-[var(--primary-brown)] font-bold">{{ index + 1 }}</span>
                </div>
              </div>

              <!-- Step Content -->
              <div class="flex-1 border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-6 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl">
                <div class="mb-4 flex items-center gap-4">
                  <div class="h-12 w-12 flex items-center justify-center rounded-full from-[var(--olive-green)] to-[var(--primary-brown)] bg-gradient-to-br text-white shadow-lg">
                    <Icon :name="processIcons[index]" class="h-6 w-6" />
                  </div>
                  <h3 class="text-4 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
                    {{ step.title }}
                  </h3>
                </div>
                <p class="text-4.25 leading-relaxed transition-all duration-300">
                  {{ step.text }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="compensation" class="bg-[var(--yunda-petal)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-12 lg:grid-cols-[0.6fr,0.4fr] lg:items-center">
          <!-- Left Content -->
          <div class="space-y-8">
            <h2 class="animate-fade-in-left text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
              {{ tt('Compensation & Support: Surrogate Pay, Escrow, and Benefits', '补偿与支持：代孕补偿、托管与福利') }}
            </h2>
            <p class="animate-fade-in-left text-4.5 leading-relaxed" style="animation-delay: 200ms;">
              {{ tt('Surrogate pay should be clear before a candidate commits. Compensation, approved reimbursements, escrow timing, legal coordination, insurance review, and support benefits should be explained in writing before the journey moves forward.', '代孕补偿应在候选人承诺前讲清楚。补偿、获批报销、托管时间、法律协调、保险审查和支持福利都应在推进前以书面方式说明。') }}
            </p>

            <!-- Compensation Cards -->
            <div class="grid gap-6 lg:grid-cols-2">
              <article
                v-for="(card, index) in compensationHighlights"
                :key="card.title"
                class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-6 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl"
                :style="{ animationDelay: `${300 + (index * 150)}ms` }"
              >
                <div class="mb-4 flex items-center gap-3">
                  <div class="h-10 w-10 flex items-center justify-center rounded-full from-[var(--primary-brown)] to-[var(--yunda-bark)] bg-gradient-to-br text-white shadow-lg">
                    <Icon name="radix-icons:star-filled" class="h-5 w-5" />
                  </div>
                  <h3 class="text-4 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
                    {{ card.title }}
                  </h3>
                </div>
                <p
                  v-for="(paragraph, pIndex) in card.paragraphs"
                  :key="paragraph"
                  class="mt-3 animate-fade-in-left text-4 leading-relaxed transition-all duration-300"
                  :style="{ animationDelay: `${400 + (index * 150) + (pIndex * 100)}ms` }"
                >
                  {{ paragraph }}
                </p>
              </article>
            </div>
          </div>

          <!-- Right Image -->
          <div class="flex animate-fade-in-right justify-center lg:justify-end" style="animation-delay: 200ms;">
            <div class="relative max-w-400 w-full">
              <div class="absolute inset-0 rounded-8 from-[var(--primary-brown)]/20 to-[var(--olive-green)]/20 bg-gradient-to-br blur-xl" />
              <div class="hover:shadow-3xl relative overflow-hidden rounded-8 shadow-2xl transition-all duration-500 hover:scale-105">
                <img
                  src="/images/landingpage3/Compensation-Support.jpg"
                  :alt="tt('Compensation & Support', '补偿与支持')"
                  class="h-auto w-full object-cover"
                >
                <div class="absolute inset-0 from-black/20 to-transparent bg-gradient-to-t" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="mb-12 text-center">
          <h2 class="animate-fade-in-up text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
            {{ tt('Frequently Asked Questions', '常见问题') }}
          </h2>
          <p class="mx-auto mt-4 max-w-220 animate-fade-in-up text-4.5 leading-relaxed" style="animation-delay: 150ms;">
            {{ tt('These answers summarize the most common questions about surrogate requirements, compensation, reimbursable expenses, and payment timing. Final eligibility and payment terms still depend on screening, agreement review, and program requirements.', '以下回答总结代孕妈妈资格、补偿、可报销费用和付款时间的常见问题。最终资格和付款条款仍取决于筛查、协议审核和项目要求。') }}
          </p>
          <div class="mx-auto mt-4 h-1 w-24 animate-fade-in-up rounded-full bg-[var(--primary-brown)]" style="animation-delay: 200ms;" />
        </div>
        <div class="space-y-6">
          <article
            v-for="(item, index) in faqItems"
            :key="item.question"
            class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-8 bg-white/95 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:border-[var(--primary-brown)] hover:shadow-xl"
            :style="{ animationDelay: `${300 + (index * 150)}ms` }"
          >
            <button
              type="button"
              class="w-full flex items-center justify-between gap-4 px-8 py-6 text-left transition-all duration-300 hover:bg-[var(--yunda-petal)]/30"
              @click="toggleFaq(item.question)"
            >
              <span class="text-4.5 font-semibold transition-all duration-300 hover:text-[var(--primary-brown)]">
                {{ item.question }}
              </span>
              <Icon
                :name="expandedFaq[item.question] ? 'radix-icons:chevron-up' : 'radix-icons:chevron-down'"
                class="h-6 w-6 transform text-[var(--primary-brown)] transition-all duration-300"
                :class="expandedFaq[item.question] ? 'rotate-180' : 'rotate-0'"
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
                v-if="expandedFaq[item.question]"
                class="overflow-hidden border-t border-[var(--olive-green)]/30 px-8 py-6 text-4.25 leading-relaxed"
              >
                <p class="animate-fade-in-up transition-all duration-300">
                  {{ item.answer }}
                </p>
              </div>
            </Transition>
          </article>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-[var(--yunda-bark)] py-18 text-white">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/4 top-0 h-60 w-60 rounded-full bg-[var(--primary-brown)]/40 blur-[160px]" />
        <div class="absolute bottom-0 right-1/5 h-48 w-48 rounded-full bg-[var(--olive-green)]/50 blur-[140px]" />
      </div>
      <div class="relative mx-auto max-w-240 px-5 text-center">
        <h2 class="text-8 font-semibold tracking-wide uppercase lg:text-10" >
          {{ tt('Ready to Become a Surrogate?', '准备成为代孕妈妈了吗？') }}
        </h2>
        <p class="mt-4 text-4.5 leading-relaxed">
          {{ tt('With clear requirements, steady support, and milestone-based planning, you can take the next step with confidence. Let’s confirm your eligibility and design your journey together.', '有了清晰要求、稳定支持与里程碑规划，你可以自信迈出下一步。让我们一起确认资格并设计你的旅程。') }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <NuxtLink
            to="/be-surrogate"
            class="rounded-full bg-white px-6 py-3 text-3.5 text-[var(--yunda-bark)] font-semibold uppercase transition hover:bg-[var(--yunda-petal)]"
          >
            {{ tt('Start Application', '开始申请') }}
          </NuxtLink>
          <NuxtLink
            to="/journey"
            class="border border-white rounded-full px-6 py-3 text-3.5 text-white font-semibold uppercase transition hover:bg-white/10"
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
  min-height: 220px;
  border: 2px dashed rgba(169, 108, 66, 0.5);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
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

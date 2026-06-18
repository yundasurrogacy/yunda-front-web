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
    'Surrogate Compensation in the U.S. | How Much Do Surrogates Get Paid?',
    '美国代孕补偿 | 代孕妈妈能获得多少补偿？',
  ),
)
const pageDescription = computed(() =>
  tt(
    'Learn how much surrogates get paid in the U.S., what benefits are included, and how the surrogate payment schedule works, plus key surrogacy costs for families.',
    '了解美国代孕妈妈的补偿金额、包含的福利，以及代孕付款时间表的运作方式，同时说明家庭的主要代孕成本。',
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
  { id: 'overview', label: tt('Overview', '概览') },
  { id: 'surrogate-pay', label: tt('Surrogate Pay', '代孕补偿') },
  { id: 'compensation-factors', label: tt('Pay Factors', '影响因素') },
  { id: 'payment-schedule', label: tt('Payment Schedule', '付款时间表') },
  { id: 'cost-fees', label: tt('Cost & Fees', '费用与开支') },
  { id: 'protections', label: tt('Insurance & Legal', '保险与法律') },
  { id: 'timeline', label: tt('Process Timeline', '流程时间线') },
  { id: 'faq', label: tt('FAQs', '常见问题') },
])

const activeSection = ref(sections.value[0].id)

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element)
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleScroll() {
  const offsets = sections.value.map((section) => {
    const el = document.getElementById(section.id)
    if (!el)
      return { id: section.id, top: Number.POSITIVE_INFINITY }
    const rect = el.getBoundingClientRect()
    return { id: section.id, top: Math.abs(rect.top - 140) }
  })
  const closest = offsets.reduce((prev, current) => (current.top < prev.top ? current : prev))
  activeSection.value = closest.id
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const payAccordions = computed(() => [
  {
    id: 'bonuses',
    title: tt('Bonuses and medical add-ons', '奖金与医疗附加项'),
    paragraphs: [
      tt(
        'Your plan may include add-ons based on medical needs. If a doctor confirms multiples, I add a $15,000 multiples bonus. If you need a C-section, I add $5,000. Bed rest, household help, and childcare follow doctor notes and receipts. If you choose to pump milk, the stipend is $250/week. We also consider wage loss and, in very rare cases, organ-loss amounts ($2,500 partial, $5,000 total) after medical confirmation. These items keep paid surrogacy fair and safe.',
        '补偿方案可能包含医疗需求相关的附加项。若医生确认多胎，可增加 $15,000 多胎奖金；如需剖宫产，可增加 $5,000。卧床、家务协助与托育依据医生证明和票据报销。若选择泵奶，津贴为 $250/周。我们也考虑误工补偿，极少数情况下按医疗确认设置器官损失补偿（部分 $2,500，全额 $5,000）。这些条目让代孕补偿更公平、更安全。',
      ),
    ],
  },
  {
    id: 'payments',
    title: tt('How and when you receive payment', '如何与何时收到补偿'),
    paragraphs: [
      tt(
        'I use a clear surrogate payment schedule with independent escrow. Intended parents fund a trust in three steps: $56,850 at signing, $83,500 after medical clearance, and $17,500 after heartbeat, while keeping $10,000 in the account. This structure supports on-time releases during pregnancy and at delivery. Unused funds settle after final accounting.',
        '我们采用清晰的代孕付款时间表与独立托管。意向父母分三步入账：签约时 $56,850，医疗清关后 $83,500，心跳确认后 $17,500，同时账户保留 $10,000。该结构支持孕期与分娩的准时发放，未使用资金在最终结算后处理。',
      ),
      tt(
        'For trust administration, I work with established third-party providers (e.g., SeedTrust) so your surrogacy payment stays timely and compliant.',
        '托管由专业第三方机构（如 SeedTrust）管理，确保补偿发放及时且合规。',
      ),
    ],
  },
])

const expandedPay = ref<Record<string, boolean>>({
  [payAccordions.value[0].id]: true,
})

function togglePay(id: string) {
  expandedPay.value = {
    ...expandedPay.value,
    [id]: !expandedPay.value[id],
  }
}

const compensationCards = computed(() => [
  { label: tt('Clothing Allowance', '服装补贴'), value: '$1,000', icon: 'lucide:shirt' },
  { label: tt('Monthly Allowance', '月度津贴'), value: tt('$300 (Total $5,500)', '$300（合计 $5,500）'), icon: 'radix-icons:calendar' },
  { label: tt('Childcare Support', '托育支持'), value: tt('$250 / month (Total $4,500)', '$250/月（合计 $4,500）'), icon: 'radix-icons:heart-filled' },
  { label: tt('Early Pregnancy / Transfer Bundle', '早期妊娠/移植补贴'), value: '$2,500', icon: 'radix-icons:star-filled' },
])

const compensationFactors = computed(() => [
  {
    number: '1',
    title: tt('First-Time vs Repeat Surrogate Compensation', '首次与重复代孕补偿'),
    content: [
      tt(
        'Repeat journeys often raise surrogate mother pay. A smooth prior pregnancy and a successful journey signal reliability.Agencies factor in medical history, delivery type, and communication style. Strong references and complete records help you get paid to be a surrogate at a higher level. This is how many “best paying surrogacy agencies” evaluate surrogate income in a fair, transparent way.',
        '重复代孕通常带来更高补偿。顺利的既往妊娠与成功旅程代表可靠性。机构会参考病史、分娩方式与沟通表现。良好推荐与完整记录有助于提升补偿水平。这也是高口碑机构公平、透明评估补偿的方式。',
      ),
    ],
  },
  {
    number: '2',
    title: tt('Location, insurance, and legal setup', '地区、保险与法律配置'),
    content: [
      tt(
        'State rules and local clinic access matter. Surrogate-friendly states streamline approvals and reduce friction. A surrogate-friendly insurance plan lowers risk and protects the package. Counsel on both sides adds clarity. These factors influence surrogacy cost for the family and shape your final surrogate compensation without cutting corners. Solid coverage and clean contracts keep surrogate fees and reimbursements simple to manage.',
        '州法律与诊所资源会影响流程。代孕友好州可简化审批、减少阻力。合适的保险方案可降低风险并保护补偿方案。双方律师能提升透明度。这些因素影响家庭的代孕成本，也决定你的最终补偿。完善的保险与合同让费用和报销更易管理。',
      ),
    ],
  },
  {
    number: '3',
    title: tt('Pregnancy details and medical factors', '妊娠细节与医疗因素'),
    content: [
      tt(
        'Singleton or twins makes a difference. Doctors may order extra monitoring, procedures, or a surgical delivery. Bed rest can change work plans and home care. Approved travel, childcare, and lactation choices also play a role. These items sit inside the package as line items, not surprises. Clear guidelines let you plan surrogate expenses and protect your surrogate income from start to finish.',
        '单胎或多胎会影响补偿。医生可能安排额外监测、手术或剖宫产。卧床可能改变工作与家庭安排。批准的出行、托育与泌乳选择也会影响补偿。所有条目会明确列出而非临时增加，清晰的规则让你从开始到结束都能规划支出与收入。',
      ),
    ],
  },
  {
    number: '4',
    title: tt('Agency support vs. going independent', '机构支持 vs 独立进行'),
    content: [
      tt(
        'Agencies coordinate the match, the calendar, and the money flow. An independent trust account releases installments on time and documents every reimbursement. Families fund milestones; you receive the installments per the surrogate payment schedule. Searchers often ask for the “highest paying surrogacy agency,” but the real win comes from a complete package: fair surrogate pay, strong benefits, and consistent support.',
        '机构负责匹配、时间线与资金流程。独立托管账户按时发放分期，并记录每笔报销。家庭按里程碑入账，你按时间表收款。很多人寻找“最高补偿机构”，但真正重要的是完整方案：公平补偿、完善福利与持续支持。',
      ),
    ],
  },
])

const scheduleHighlights = computed(() => [
  {
    title: tt('How agencies manage surrogate payment schedules', '机构如何管理代孕付款时间表'),
    body: tt(
      'Agencies manage surrogate payment schedules through a funded third-party trust. The trust tracks each milestone, releases surrogate compensation on time, and records reimbursements, so surrogacy payments and reimbursements stay organized and easy to audit.',
      '机构通过第三方托管账户管理付款时间表。托管记录每个里程碑、按时发放补偿并记录报销，使支付清晰、便于核对。',
    ),
    icon: 'lucide:calendar-check',
  },
  {
    title: tt('Funding milestones', '入账里程碑'),
    body: tt(
      'Families fund the trust in stages. They deposit after contract signing, again after medical clearance, and again after heartbeat confirmation. The account keeps a minimum balance for upcoming milestones. This schedule supports timely installments and avoids delays.',
      '家庭分阶段向托管账户入账：签约后、医疗清关后、心跳确认后。账户保留最低余额用于后续里程碑，确保分期及时发放。',
    ),
    icon: 'lucide:coins',
  },
  {
    title: tt('Installments during pregnancy', '孕期分期发放'),
    body: tt(
      'The trust releases installments as you progress through the journey. Doctors confirm key points like transfer, pregnancy labs, and heartbeat. The trust pays each milestone according to the agreed plan, so you don’t chase payments or worry about timing.',
      '随着流程推进，托管按里程碑发放补偿。医生确认移植、血检、心跳等关键节点后，托管按计划支付，无需追款。',
    ),
    icon: 'lucide:receipt',
  },
  {
    title: tt('Reimbursements and everyday expenses', '报销与日常费用'),
    body: tt(
      'Approved surrogacy expenses—like childcare during required visits, doctor-ordered bed rest support, or travel tied to monitoring—go through the trust with receipts. Clear rules, simple documentation, and tracked disbursements keep reimbursements smooth.',
      '获批的代孕费用（如就诊托育、医生要求的卧床支持、监测出行）通过托管报销并附票据。规则清晰、材料简单、发放可追踪。',
    ),
    icon: 'lucide:shield-check',
  },
  {
    title: tt('Independent escrow partners', '独立托管合作方'),
    body: tt(
      'Specialized partners manage the trust and insurance coordination. SeedTrust provides escrow and online tracking; ART Risk supports insurance and risk design. This team keeps money movement compliant and transparent at every step.',
      '专业伙伴管理托管与保险协调。SeedTrust 提供托管和在线追踪；ART Risk 支持保险与风险设计，确保资金流动合规透明。',
    ),
    icon: 'lucide:clipboard-list',
  },
  {
    title: tt('Final accounting', '最终结算'),
    body: tt(
      'After delivery, the team closes the books. The trust reconciles all installments and reimbursements. Any unused funds return to the family per the agreement, and your file shows a full payment history.',
      '分娩后完成结算，托管核对所有分期与报销。未使用资金按协议返还家庭，你的档案记录完整支付历史。',
    ),
    icon: 'lucide:file-check-2',
  },
])

const packageCoverage = computed(() => [
  tt(
    'Your plan includes agency coordination (surrogacy agency fees), surrogate compensation, trust administration, legal counsel for both sides, surrogate medical insurance, and life insurance. We also list everyday surrogacy expenses like allowances, childcare during required visits, and an early transfer/pregnancy bundle. You see each part before you fund the account, so the surrogacy price stays predictable.',
    '方案包含机构协调（机构费用）、代孕补偿、托管管理、双方律师、代孕医疗保险与人身保险。同时列出日常费用，如津贴、就诊托育与早期移植/妊娠补贴。资金入账前即可看到全部项目，价格可预期。',
  ),
])

const packageExclusions = computed(() => [
  tt(
    'Your package does not include IVF clinic fees or newborn hospital charges. These items sit outside the agency package and depend on clinic and hospital billing. We call this out in writing to keep the cost of using a surrogate transparent.',
    '方案不包含 IVF 诊所费用与新生儿医院费用，这些由诊所与医院另行计费。我们会书面说明，确保费用透明。',
  ),
])

const insurancePoints = computed(() => [
  tt(
    'We screen for surrogate-friendly insurance during Open Enrollment and present options that fit your needs and budget. If no suitable policy exists, we coordinate cash-pay with the local OB/hospital and align receipts in the trust. Employer plans often need a secondary policy, and no plan covers 100% of medical bills, so the family remains responsible for deductibles and coinsurance. This is how we keep the surrogacy cost plan realistic—and avoid surprises.',
    '我们在开放投保期筛选代孕友好保险并提供选项。如无合适保单，将协调本地产科/医院的现金支付方案并在托管中对账。雇主计划通常需要第二保单，且没有任何计划覆盖 100% 医疗费用，家庭仍需承担自付额与共保。这可让成本规划更现实、避免意外。',
  ),
  tt(
    'Families fund a third-party trust (escrow). Families deposit in milestones—at contract, after medical clearance, and after heartbeat—then maintain a small balance for upcoming items. The trust releases installments and approved reimbursements on schedule, which keeps surrogacy payment timing clean and protects your surrogate cost plan end-to-end.',
    '家庭向第三方托管账户分阶段入账：签约、医疗清关、心跳确认后，并保留小额余额用于后续项目。托管按计划发放分期与报销，保证支付时间清晰，保护整体费用规划。',
  ),
  tt(
    'An experienced escrow partner manages the trust with online tracking, and specialized counsel supports contracts and parentage. Our team runs weekly reports, bilingual support, and transparent accounting, so the surrogacy price and disbursements stay visible from day one. If you need staged funding, we can map surrogacy financing options to each milestone.',
    '经验丰富的托管方提供在线追踪，专业律师支持合同与亲权。团队每周报表、双语支持与透明对账，让费用与发放从第一天起清晰可见。如需分期融资，可按里程碑制定方案。',
  ),
])

const protectionSections = computed(() => [
  {
    title: tt('Insurance: design it to fit gestational surrogacy', '保险：为妊娠代孕量身设计'),
    content: [
      tt(
        'We screen for surrogate-friendly plans during Open Enrollment. If a plan works, we recommend options and the family chooses based on needs and budget. If a plan does not fit, we coordinate with the local OB and hospital and set a clear cash-pay path. Employer plans often need a secondary policy. No policy covers 100%, so families remain responsible for deductibles and coinsurance. This keeps surrogacy cost realistic and avoids surprises.',
        '我们在开放投保期筛选代孕友好保单，推荐可选方案供家庭根据需求与预算选择。如无合适保单，将协调本地产科/医院现金支付路径。雇主计划常需第二保单，且无保单能覆盖 100%。家庭需承担自付额与共保，从而保持成本现实并避免意外。',
      ),
    ],
  },
  {
    title: tt('Escrow: fund once, pay on schedule', '托管：一次入账，按时发放'),
    content: [
      tt(
        'Families fund a third-party trust at key milestones like contract signing, medical clearance, and heartbeat confirmation. The trust then releases installments and approved reimbursements on time. Independent escrow (e.g., SeedTrust) gives online tracking, tight controls, and low delays, so surrogacy payment stays clean and documented.',
        '家庭在签约、医疗清关与心跳确认等关键节点向第三方托管入账，托管按时发放分期与报销。独立托管（如 SeedTrust）提供在线追踪与严格控制，确保支付清晰可追溯。',
      ),
    ],
  },
  {
    title: tt('Legal: independent counsel and parentage orders', '法律：独立律师与亲权裁定'),
    content: [
      tt(
        'Both sides use dedicated counsel. Lawyers draft and review the surrogacy agreement, insurance terms, and risk language. Before birth, counsel completes the pre-birth parentage process, so the hospital lists the intended parents on the birth certificate. Clear contracts protect surrogate pay, define surrogacy expenses, and support compliant compensated surrogacy.',
        '双方均有专属律师，负责合同、保险条款与风险条款的起草与审核。产前完成亲权裁定，使医院可在出生证明上列示意向父母。清晰合同保护补偿、明确费用并确保合规。',
      ),
    ],
  },
  {
    title: tt('Reimbursements and documentation', '报销与文件管理'),
    content: [
      tt(
        'The trust pays approved items tied to medical need and the agreement. Bed rest, childcare, and household help require physician notes and receipts. The team records every disbursement, which keeps surrogacy payment transparent and ties each item back to the contract.',
        '托管支付与医疗需求及合同相关的获批项目。卧床、托育与家务协助需医生证明与票据。团队记录每笔发放，保证支付透明并与合同对应。',
      ),
    ],
  },
  {
    title: tt('Why this structure builds trust', '为什么这种结构能建立信任'),
    content: [
      tt(
        'A specialist escrow partner manages funds for the whole journey, and an insurance expert helps design coverage for gestational surrogacy. The service framework combines medical, legal, and trust management to protect each step. This reduces risk, supports on-time surrogate compensation, and keeps the total cost of surrogacy under control.',
        '专业托管伙伴管理全程资金，保险专家设计妊娠代孕覆盖。该服务框架整合医疗、法律与托管管理，减少风险、确保补偿准时并控制总体成本。',
      ),
    ],
  },
])

const processSteps = computed(() => [
  {
    title: tt('Step 1 — Consultation & Early Planning', '步骤 1 — 咨询与前期规划'),
    description: tt(
      'Start with a brief consultation and a matching form. Set goals, clinics, and timing. We map the calendar and answer surrogacy process cost questions up front.',
      '从简短咨询和匹配表开始，确定目标、诊所与时间线。我们绘制日程并提前回答费用问题。',
    ),
  },
  {
    title: tt('Step 2 — Matching & Trust Setup', '步骤 2 — 匹配与托管设置'),
    description: tt(
      'We present qualified profiles and arrange a meet call. After you confirm the match, the family opens a third-party trust and funds the first milestone. This trust later pays the surrogate payment schedule and approved surrogacy expenses.',
      '我们提供合格资料并安排沟通。确认匹配后，家庭开设第三方托管并入账首个里程碑，后续用于分期补偿与报销。',
    ),
  },
  {
    title: tt('Step 3 — Legal & Contracts', '步骤 3 — 法律与合同'),
    description: tt(
      'Independent lawyers draft and review the agreement. Counsel also plans the pre-birth parentage (PBO) so the hospital lists the intended parents at delivery. Clear contracts protect surrogate compensation and keep paid surrogacy compliant.',
      '独立律师起草并审核合同，同时规划产前亲权裁定，确保医院在分娩时列示意向父母。清晰合同保护补偿并确保合规。',
    ),
  },
  {
    title: tt('Step 4 — Medical Prep & Transfer', '步骤 4 — 医疗准备与移植'),
    description: tt(
      'The clinic clears medicals and starts the pre-transfer protocol. You complete monitoring, then proceed to embryo transfer and enter pregnancy. We coordinate schedules with the clinic and keep the plan simple.',
      '诊所完成医疗清关并启动移植前流程，你完成监测后进行胚胎移植进入妊娠。我们与诊所协调排期，流程简洁。',
    ),
  },
  {
    title: tt('Step 5 — Pregnancy Milestones & Installments', '步骤 5 — 孕期里程碑与分期发放'),
    description: tt(
      'The clinic confirms pregnancy with labs and a heartbeat scan. Each milestone triggers the next installment from escrow per the surrogate payment schedule. Our team checks in weekly, helps with appointments, and documents reimbursements.',
      '诊所通过化验与心跳确认妊娠，每个里程碑触发托管发放下一笔。团队每周跟进，协助就诊并记录报销。',
    ),
  },
  {
    title: tt('Step 6 — Birth, Parentage, and Postpartum Support', '步骤 6 — 分娩、亲权与产后支持'),
    description: tt(
      'Legal finishes parentage steps before birth. The birth certificate lists the intended parents at the hospital. We help with discharge, newborn paperwork, and final accounting. This closes the flow of surrogate pay and keeps the surrogacy cost record clear.',
      '法律在分娩前完成亲权步骤，出生证明列示意向父母。我们协助出院、新生儿文件与最终对账，完成补偿闭环并保持费用记录清晰。',
    ),
  },
])

const faqQuestions = computed(() => [
  {
    question: tt('How do agencies manage the surrogate payment schedule?', '机构如何管理代孕付款时间表？'),
    answer: tt(
      'Agencies usually manage surrogate payment schedules through a funded escrow or trust account. The agreement defines payment milestones, approved reimbursements, and timing. Escrow then releases funds according to the schedule, helping both the surrogate and intended parents track payments clearly.',
      '机构通常通过已注资的托管或信托账户管理代孕付款时间表。协议会定义付款里程碑、获批报销和时间节点。托管账户再按时间表发放资金，帮助代孕妈妈和意向父母清楚追踪付款。',
    ),
  },
  {
    question: tt('How much do surrogates get paid in the U.S.?', '美国代孕妈妈一般能获得多少补偿？'),
    answer: tt(
      'Surrogate pay in the U.S. varies by agency, state, experience, insurance, agreement terms, and pregnancy-related events. Yunda explains a $61,000+ total compensation package for qualified surrogate candidates, but final compensation depends on eligibility, agreement review, and approved items.',
      '美国代孕补偿会因机构、州、经验、保险、协议条款和孕期事件而变化。孕达为符合条件的代孕妈妈候选人说明 $61,000+ 总补偿方案，但最终金额取决于资格、协议审核和获批项目。',
    ),
  },
  {
    question: tt('what counts as surrogate compensation vs reimbursable expenses?', '代孕补偿与可报销费用的区别是什么？'),
    answer: tt(
      'Surrogate compensation is payment for the surrogate’s role, time, and pregnancy journey. Reimbursable expenses are approved costs connected to the journey, such as travel, childcare, maternity clothing, medical co-pays, or lost wages. The agreement should define both categories before transfer.',
      '代孕补偿是对代孕妈妈角色、时间和孕程的支付。可报销费用是与流程相关的获批支出，例如出行、托育、孕期服装、医疗自付或误工。两类项目都应在移植前由协议明确。',
    ),
  },
  {
    question: tt('What affects surrogate pay—experience, location, or medical factors?', '哪些因素会影响代孕补偿？'),
    answer: tt(
      'Surrogate pay can be affected by prior surrogacy experience, location, insurance, agreement terms, and medical events such as twins, C-section, bed rest, procedures, or approved travel. These items should be documented in the compensation package and escrow payment schedule.',
      '代孕补偿可能受既往代孕经验、所在地、保险、协议条款，以及双胎、剖宫产、卧床、医疗操作或获批出行等因素影响。这些项目应写入补偿方案和托管付款时间表。',
    ),
  },
  {
    question: tt('What is the total surrogacy cost for intended parents, including agency fees?', '意向父母的总代孕成本是多少（含机构费）？'),
    answer: tt(
      'Total surrogacy cost for intended parents depends on agency services, surrogate compensation, IVF clinic fees, legal work, insurance, escrow, and case-specific medical or pregnancy items. Intended parents should compare estimates by scope, because IVF and newborn medical care may be separate.',
      '意向父母的总代孕成本取决于机构服务、代孕补偿、IVF 诊所费用、法律、保险、托管以及个案医疗或孕期项目。准父母应按服务范围比较报价，因为 IVF 和新生儿医疗费用可能单独计算。',
    ),
  },
])

const expandedFaq = ref<Record<string, boolean>>({})

function toggleFaq(question: string) {
  expandedFaq.value = {
    ...expandedFaq.value,
    [question]: !expandedFaq.value[question],
  }
}

const surrogateCompensationItemNames = [
  'Consultation & Early Planning',
  'Matching & Trust Setup',
  'Legal & Contracts',
  'Medical Prep & Transfer',
  'Pregnancy Milestones & Installments',
  'Birth, Parentage, and Postpartum Support',
]

const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: '/surrogate-compensation',
  name: 'Surrogate Compensation in the U.S. | Pay, Benefits & FAQs',
  description: pageDescription.value,
  about: 'Gestational carrier compensation, benefits, escrow, and payment schedule',
  audience: 'Potential gestational carriers and intended parents',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  service: {
    name: 'Gestational Carrier Compensation Guidance',
    serviceType: 'Gestational carrier compensation and escrow guidance',
    areaServed: ['California', 'United States'],
    audience: 'Potential gestational carriers and intended parents',
    description: 'Guidance on gestational carrier compensation, surrogate pay, benefits, payment schedule, escrow protection, reimbursements, insurance planning, legal coordination, agency fees, and pregnancy milestone payments.',
  },
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Surrogate Resources' },
    { name: 'Surrogate Compensation', url: '/surrogate-compensation' },
  ],
  faqs: faqQuestions.value,
  itemList: {
    name: 'Surrogacy Process Timeline: Steps, Milestones & Payments',
    items: surrogateCompensationItemNames.map((name, index) => ({
      position: index + 1,
      name,
      description: processSteps.value[index]?.description,
      url: '/surrogate-compensation',
    })),
  },
}))

useHead(() => ({
  script: coreServicePageSchemas.value.map((schema, index) => ({
    key: `schema-surrogate-compensation-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />

    <section class="relative overflow-hidden from-[var(--hero-center)]/80 via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b py-18 lg:py-24">
      <div class="pointer-events-none absolute inset-0 opacity-40">
        <div class="absolute left-16 top-10 h-40 w-40 rounded-full bg-[var(--olive-green)] blur-[120px]" />
        <div class="absolute bottom-12 right-16 h-60 w-60 rounded-full bg-[var(--primary-brown)]/70 blur-[160px]" />
      </div>
      <div class="relative mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div class="text-center space-y-6 lg:text-left">
            <h1 class="text-8 font-semibold leading-tight lg:text-12" >
              {{ tt('Surrogate Compensation in the U.S. | Pay, Benefits & FAQs', '美国代孕补偿｜补偿、福利与常见问题') }}
            </h1>
            <p class="text-4.5 leading-relaxed">
              {{ tt('Surrogate compensation should feel clear and fair. On this page, we answer how much surrogates get paid in the U.S., what benefits are included, and how a simple surrogate payment schedule works. We also outline surrogacy cost for families, including agency fees and common surrogacy expenses.', '代孕补偿应当清晰、公平。本页解答美国代孕补偿金额、包含的福利，以及简明的付款时间表，并说明家庭的代孕成本（含机构费用与常见支出）。') }}
            </p>
            <div class="flex flex-wrap justify-center gap-4 lg:justify-start">
              <NuxtLink
                to="/be-surrogate"
                class="rounded-full bg-[var(--primary-brown)] px-6 py-3 text-3.5 text-white font-semibold uppercase transition hover:bg-[var(--yunda-bark)]"
              >
                {{ tt('Start Application', '开始申请') }}
              </NuxtLink>
              <a
                href="#overview"
                class="border border-[var(--primary-brown)] rounded-full px-6 py-3 text-3.5 font-semibold uppercase transition hover:bg-white"
                @click.prevent="scrollToSection('overview')"
              >
                {{ tt('Explore Page', '浏览页面') }}
              </a>
            </div>
          </div>
          <div class="rounded-6 bg-white/70 p-8 text-center shadow-black/10 shadow-xl backdrop-blur">
            <div class="image-placeholder max-w-300 w-full transition-all duration-500 hover:scale-105">
              <img src="/images/landingpage2/Surrogate-Compensation.jpg" :alt="tt('Surrogate Compensation', '代孕补偿')">
            </div>
          </div>
        </div>
      </div>
      <nav class="sticky left-0 top-24 z-40 mt-12">
        <div class="mx-auto max-w-280 px-5 lg:px-10">
          <div class="overflow-x-auto">
            <ul class="flex gap-4 border border-[var(--primary-brown)]/30 rounded-full bg-white/80 px-5 py-3 shadow-black/10 shadow-lg backdrop-blur">
              <li
                v-for="section in sections"
                :key="section.id"
              >
                <button
                  type="button"
                  class="rounded-full px-4 py-2 text-3.25 font-medium uppercase transition"
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
      :note="tt('This page explains surrogate compensation, benefits, payment timing, and escrow coordination. Actual compensation depends on eligibility, agreement terms, medical events, approved reimbursements, and program requirements.', '本页说明代孕补偿、福利、付款时间与托管协调。实际补偿取决于资格、协议条款、医疗事件、获批报销与项目要求。')"
      :sources="[
        { label: tt('Apply to be a surrogate', '申请成为代孕妈妈'), href: localePath('/be-surrogate') },
        { label: tt('Surrogate requirements', '代孕妈妈资格'), href: localePath('/surrogate-requirements') },
        { label: tt('California protection guide', '加州代孕保护指南'), href: localePath('/surrogacy-protection-california') },
      ]"
    />

    <section id="overview" class="py-18 lg:py-24">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="border border-[var(--olive-green)]/40 rounded-6 bg-white/90 p-10 shadow-black/10 shadow-lg">
          <p class="text-5 leading-relaxed">
            {{ tt('Surrogate compensation should feel clear and fair. On this page, we explain surrogate pay, your benefits, and a simple surrogate payment schedule. We also outline surrogacy cost for families, including agency fees and common surrogacy expenses. You see how funds move, who pays what, and when you receive each installment.', '代孕补偿应当清晰、公平。本页说明代孕补偿、福利与付款时间表，并说明家庭的代孕成本（含机构费用与常见支出）。你可以了解资金如何流转、谁支付什么、以及每次发放的时间。') }}
          </p>
        </div>
      </div>
    </section>

    <section id="surrogate-pay" class="bg-[var(--yunda-petal)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-12 lg:grid-cols-[0.6fr,0.4fr] lg:items-center">
          <!-- Left Content -->
          <div class="space-y-8">
            <h2 class="animate-fade-in-left text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
              {{ tt('How Much Do Surrogates Make? Surrogate Pay & Compensation', '代孕妈妈能获得多少补偿？') }}
            </h2>
            <p class="animate-fade-in-left text-4.5 leading-relaxed" style="animation-delay: 200ms;">
              {{ tt('Surrogate compensation includes more than one number. A complete pay package can include base compensation, allowances, approved reimbursements, medical event payments, and escrow-managed milestones.', '代孕补偿不只是一个数字。完整补偿方案可能包括基础补偿、津贴、获批报销、医疗事件补偿，以及由托管管理的付款里程碑。') }}
            </p>
            <p class="animate-fade-in-left text-4.5 leading-relaxed" style="animation-delay: 300ms;">
              {{ tt('When people ask how much surrogates make, the best answer is total compensation plus conditions. Final surrogate income depends on eligibility, agreement terms, insurance, match details, medical events, and approved expenses.', '当人们询问代孕妈妈能获得多少补偿时，最准确的答案是总补偿加条件说明。最终收入取决于资格、协议条款、保险、匹配情况、医疗事件和获批费用。') }}
            </p>
            <!-- Compensation Cards -->
            <div class="grid animate-fade-in-left gap-6 lg:grid-cols-2" style="animation-delay: 400ms;">
              <div
                v-for="(card, index) in compensationCards"
                :key="card.label"
                class="border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-6 text-center shadow-black/10 shadow-lg transition-all duration-300 hover:scale-105 hover:border-[var(--primary-brown)] hover:shadow-xl"
                :style="{ animationDelay: `${500 + (index * 100)}ms` }"
              >
                <div class="mb-4 flex justify-center">
                  <div class="h-12 w-12 flex items-center justify-center rounded-full from-[var(--primary-brown)] to-[var(--yunda-bark)] bg-gradient-to-br text-white shadow-lg">
                    <Icon :name="card.icon" class="h-6 w-6" />
                  </div>
                </div>
                <p class="text-3 text-[var(--primary-brown)] font-semibold tracking-wide uppercase">
                  {{ card.label }}
                </p>
                <p class="mt-2 text-5 font-bold" >
                  {{ card.value }}
                </p>
              </div>
            </div>

            <!-- Accordion Details -->
            <div class="animate-fade-in-left space-y-4" style="animation-delay: 600ms;">
              <article
                v-for="(accordion, index) in payAccordions"
                :key="accordion.id"
                class="border border-[var(--olive-green)]/30 rounded-8 bg-white/95 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:border-[var(--primary-brown)] hover:shadow-xl"
                :style="{ animationDelay: `${700 + (index * 150)}ms` }"
              >
                <button
                  type="button"
                  class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-all duration-300 hover:bg-[var(--yunda-petal)]/30"
                  @click="togglePay(accordion.id)"
                >
                  <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
                    {{ accordion.title }}
                  </h3>
                  <Icon
                    :name="expandedPay[accordion.id] ? 'radix-icons:chevron-up' : 'radix-icons:chevron-down'"
                    class="h-6 w-6 transform text-[var(--primary-brown)] transition-all duration-300"
                    :class="expandedPay[accordion.id] ? 'rotate-180' : 'rotate-0'"
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
                    v-if="expandedPay[accordion.id]"
                    class="overflow-hidden border-t border-[var(--olive-green)]/30 px-6 py-5 text-4.25 leading-relaxed space-y-4"
                  >
                    <p
                      v-for="(paragraph, pIndex) in accordion.paragraphs" :key="paragraph"
                      class="animate-fade-in-up transition-all duration-300"
                      :style="{ animationDelay: `${pIndex * 100}ms` }"
                    >
                      {{ paragraph }}
                    </p>
                  </div>
                </Transition>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="compensation-factors" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-12 lg:grid-cols-[0.4fr,0.6fr] lg:items-center">
          <!-- Left Image -->
          <div class="flex animate-fade-in-left justify-center lg:justify-start" style="animation-delay: 200ms;">
            <div class="relative max-h-200 max-w-400 w-full">
              <div class="absolute inset-0 rounded-8 from-[var(--primary-brown)]/20 to-[var(--olive-green)]/20 bg-gradient-to-br blur-xl" />
              <div class="hover:shadow-3xl relative overflow-hidden rounded-8 shadow-2xl transition-all duration-500 hover:scale-105">
                <img
                  src="/images/landingpage2/Surrogate-Compensation-Factors.jpg"
                  :alt="tt('Surrogate Compensation Factors', '代孕补偿因素')"
                  class="h-auto w-full object-cover"
                >
                <div class="absolute inset-0 from-black/20 to-transparent bg-gradient-to-t" />
              </div>
            </div>
          </div>

          <!-- Right Content -->
          <div class="space-y-8">
            <h2 class="animate-fade-in-right text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
              {{ tt('What Affects Your Surrogate Pay? Surrogate Compensation Factors', '哪些因素影响补偿？代孕补偿因素') }}
            </h2>
            <p class="animate-fade-in-right text-4.5 leading-relaxed" style="animation-delay: 200ms;">
              {{ tt('Surrogate pay changes by case. Your total surrogate compensation reflects experience, location, and medical needs. The full package also includes support for approved surrogacy expenses and a clear surrogate payment schedule. In short, paid surrogacy rewards time, health, and responsibility—not just miles traveled.', '补偿会因个案而变。总代孕补偿反映经验、地区与医疗需求。完整方案还包含获批费用支持与清晰付款时间表。简而言之，补偿奖励的是时间、健康与责任。') }}
            </p>

            <!-- Factors Grid -->
            <div class="grid gap-6 lg:grid-cols-2">
              <article
                v-for="(factor, index) in compensationFactors"
                :key="factor.number"
                class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-6 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl"
                :style="{ animationDelay: `${300 + (index * 150)}ms` }"
              >
                <div class="mb-4 flex items-start gap-4">
                  <div class="h-12 w-12 flex items-center justify-center rounded-full from-[var(--primary-brown)] to-[var(--yunda-bark)] bg-gradient-to-br text-white shadow-lg">
                    <span class="text-4 font-bold">{{ factor.number }}</span>
                  </div>
                  <h3 class="text-4 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
                    {{ factor.title }}
                  </h3>
                </div>
                <div class="text-4 leading-relaxed space-y-3">
                  <p
                    v-for="(paragraph, pIndex) in factor.content" :key="paragraph"
                    class="animate-fade-in-left transition-all duration-300"
                    :style="{ animationDelay: `${400 + (index * 150) + (pIndex * 100)}ms` }"
                  >
                    {{ paragraph }}
                  </p>
                </div>
              </article>
            </div>

            <!-- Bottom Line -->
            <div class="animate-fade-in-up border border-[var(--primary-brown)]/40 rounded-8 bg-white/95 p-8 text-4.5 leading-relaxed shadow-black/10 shadow-lg" style="animation-delay: 800ms;">
              <p class="transition-all duration-300">
                {{ tt('Bottom line: Your surrogate compensation grows from proven experience, a supportive state and insurance setup, and clear medical planning. The right team turns complex surrogacy expenses into a straightforward plan—so you can focus on a healthy journey.', '结论：补偿取决于经验、州政策与保险配置、以及清晰的医疗规划。专业团队能将复杂费用变成清晰方案，让你专注健康旅程。') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="payment-schedule" class="bg-[var(--yunda-petal)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="mb-12 text-center">
          <h2 class="animate-fade-in-up text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
            {{ tt('Surrogate Payment Schedule: When Are Funds Available?', '代孕付款时间表：资金何时到位？') }}
          </h2>
          <div class="mx-auto mt-4 h-1 w-32 animate-fade-in-up rounded-full bg-[var(--primary-brown)]" style="animation-delay: 200ms;" />
          <p class="mx-auto mt-6 max-w-200 animate-fade-in-up text-4.5 leading-relaxed" style="animation-delay: 300ms;">
            {{ tt('Paid surrogacy follows a clear surrogate payment schedule. Intended parents fund a third-party trust. The trust then handles surrogacy payment installments and approved reimbursements on time. This structure protects surrogate pay and keeps every surrogate compensation step transparent.', '有偿代孕遵循清晰的付款时间表。意向父母向第三方托管入账，由托管按时发放补偿与报销。该结构保护补偿并保持每一步透明。') }}
          </p>
        </div>

        <div class="grid gap-8 lg:grid-cols-3">
          <article
            v-for="(highlight, index) in scheduleHighlights"
            :key="highlight.title"
            class="animate-fade-in-up rounded-8 bg-white p-8 text-center shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:-translate-y-2"
            :style="{ animationDelay: `${400 + (index * 150)}ms` }"
          >
            <div class="mx-auto h-16 w-16 flex items-center justify-center rounded-full from-[var(--yunda-petal)] to-[var(--primary-brown)] bg-gradient-to-br text-white shadow-lg transition-all duration-300 hover:scale-110">
              <Icon
                :name="highlight.icon"
                class="h-7 w-7"
              />
            </div>
            <h3 class="mt-6 text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
              {{ highlight.title }}
            </h3>
            <p class="mt-3 text-4.25 leading-relaxed transition-all duration-300">
              {{ highlight.body }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section id="cost-fees" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-12 lg:grid-cols-[0.6fr,0.4fr] lg:items-center">
          <!-- Left Content -->
          <div class="space-y-8">
            <h2 class="animate-fade-in-left text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
              {{ tt('Surrogacy Cost & Agency Fees for Intended Parents', '意向父母的代孕成本与机构费用') }}
            </h2>
            <p class="animate-fade-in-left text-4.5 leading-relaxed" style="animation-delay: 200ms;">
              {{ tt('Families ask about surrogacy cost first. We answer with a clear package, an independent trust account, and full line items. We publish a service price list and show how the total cost of surrogacy forms across legal, insurance, and care.', '家庭最关心代孕成本。我们以清晰方案、独立托管账户与完整条目作答，并公开服务价格，说明法律、保险与医疗如何构成总成本。') }}
            </p>

            <!-- Package Coverage Cards -->
            <div class="grid gap-6 lg:grid-cols-2">
              <article class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-6 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl" style="animation-delay: 300ms;">
                <div class="mb-4 flex items-center gap-3">
                  <div class="h-10 w-10 flex items-center justify-center rounded-full from-[var(--olive-green)] to-[var(--primary-brown)] bg-gradient-to-br text-white shadow-lg">
                    <Icon name="radix-icons:check-circled" class="h-5 w-5" />
                  </div>
                  <h3 class="text-4 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
                    {{ tt('What the package covers', '方案包含内容') }}
                  </h3>
                </div>
                <div class="text-4 leading-relaxed space-y-3">
                  <p
                    v-for="(paragraph, index) in packageCoverage" :key="paragraph"
                    class="animate-fade-in-left transition-all duration-300"
                    :style="{ animationDelay: `${400 + (index * 100)}ms` }"
                  >
                    {{ paragraph }}
                  </p>
                </div>
              </article>
              <article class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-6 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl" style="animation-delay: 400ms;">
                <div class="mb-4 flex items-center gap-3">
                  <div class="h-10 w-10 flex items-center justify-center rounded-full from-[var(--primary-brown)] to-[var(--yunda-bark)] bg-gradient-to-br text-white shadow-lg">
                    <Icon name="radix-icons:cross-circled" class="h-5 w-5" />
                  </div>
                  <h3 class="text-4 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
                    {{ tt('What the package does not cover', '方案不包含内容') }}
                  </h3>
                </div>
                <div class="text-4 leading-relaxed space-y-3">
                  <p
                    v-for="(paragraph, index) in packageExclusions" :key="paragraph"
                    class="animate-fade-in-left transition-all duration-300"
                    :style="{ animationDelay: `${500 + (index * 100)}ms` }"
                  >
                    {{ paragraph }}
                  </p>
                </div>
              </article>
            </div>

            <!-- Additional Information Cards -->
            <div class="space-y-6">
              <div class="animate-fade-in-up border border-[var(--olive-green)]/40 rounded-8 bg-white/95 p-6 shadow-black/10 shadow-lg" style="animation-delay: 600ms;">
                <div class="mb-4 flex items-center gap-3">
                  <div class="h-10 w-10 flex items-center justify-center rounded-full from-[var(--primary-brown)] to-[var(--olive-green)] bg-gradient-to-br text-white shadow-lg">
                    <Icon name="radix-icons:clock" class="h-5 w-5" />
                  </div>
                  <h3 class="text-4 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
                    {{ tt('How funding and payments work', '资金入账与支付方式') }}
                  </h3>
                </div>
                <p class="animate-fade-in-left text-4 leading-relaxed transition-all duration-300" style="animation-delay: 700ms;">
                  {{ tt('You fund a third-party trust (escrow). Families deposit in milestones—at contract, after medical clearance, and after heartbeat—then maintain a small balance for upcoming items. The trust releases installments and approved reimbursements on schedule, which keeps surrogacy payment timing clean and protects your surrogate cost plan end-to-end.', '家庭向第三方托管入账，按签约、医疗清关与心跳确认等里程碑存入，并保留小额余额用于后续项目。托管按计划发放分期与报销，确保付款时间清晰，费用规划完整。') }}
                </p>
              </div>

              <div class="animate-fade-in-up border border-[var(--primary-brown)]/40 rounded-8 bg-white/95 p-6 shadow-black/10 shadow-lg" style="animation-delay: 800ms;">
                <div class="mb-4 flex items-center gap-3">
                  <div class="h-10 w-10 flex items-center justify-center rounded-full from-[var(--yunda-bark)] to-[var(--primary-brown)] bg-gradient-to-br text-white shadow-lg">
                    <Icon name="lucide:shield-check" class="h-5 w-5" />
                  </div>
                  <h3 class="text-4 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
                    {{ tt('Why this structure builds trust', '为什么这种结构能建立信任') }}
                  </h3>
                </div>
                <div class="text-4 leading-relaxed space-y-3">
                  <p
                    v-for="(paragraph, index) in insurancePoints" :key="paragraph"
                    class="animate-fade-in-left transition-all duration-300"
                    :style="{ animationDelay: `${900 + (index * 100)}ms` }"
                  >
                    {{ paragraph }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex animate-fade-in-left justify-center lg:justify-start" style="animation-delay: 200ms;">
            <div class="relative max-h-200 max-w-400 w-full">
              <div class="absolute inset-0 rounded-8 from-[var(--primary-brown)]/20 to-[var(--olive-green)]/20 bg-gradient-to-br blur-xl" />
              <div class="hover:shadow-3xl relative overflow-hidden rounded-8 shadow-2xl transition-all duration-500 hover:scale-105">
                <img
                  src="/images/landingpage2/Surrogacy-Requirements.jpg"
                  :alt="tt('Surrogate Surrogacy Requirements', '代孕要求')"
                  class="h-auto w-full object-cover"
                >
                <div class="absolute inset-0 from-black/20 to-transparent bg-gradient-to-t" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="protections" class="bg-[var(--yunda-petal)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="mb-12 text-center">
          <h2 class="animate-fade-in-up text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
            {{ tt('Insurance, Escrow & Legal: Protecting Your Surrogate Pay', '保险、托管与法律：保护你的补偿') }}
          </h2>
          <p class="mx-auto mt-4 max-w-220 animate-fade-in-up text-4.5 leading-relaxed" style="animation-delay: 150ms;">
            {{ tt('Surrogate compensation is strongest when the protection system is clear. Insurance review, legal coordination, escrow funding, and written reimbursement rules help protect payment timing and reduce confusion during the journey.', '当保障体系清晰时，代孕补偿才更可靠。保险审查、法律协调、托管入账和书面报销规则有助于保护付款时间，并减少旅程中的不确定。') }}
          </p>
          <div class="mx-auto mt-4 h-1 w-32 animate-fade-in-up rounded-full bg-[var(--primary-brown)]" style="animation-delay: 200ms;" />
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <article
            v-for="(section, index) in protectionSections"
            :key="section.title"
            class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-8 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl"
            :style="{ animationDelay: `${300 + (index * 150)}ms` }"
          >
            <div class="mb-6 flex items-center gap-4">
              <div class="h-12 w-12 flex items-center justify-center rounded-full from-[var(--primary-brown)] to-[var(--yunda-bark)] bg-gradient-to-br text-white shadow-lg">
                <Icon name="lucide:shield-check" class="h-6 w-6" />
              </div>
              <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
                {{ section.title }}
              </h3>
            </div>
            <div class="text-4.25 leading-relaxed space-y-4">
              <p
                v-for="(paragraph, pIndex) in section.content" :key="paragraph"
                class="animate-fade-in-left transition-all duration-300"
                :style="{ animationDelay: `${400 + (index * 150) + (pIndex * 100)}ms` }"
              >
                {{ paragraph }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="timeline" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="mb-12 text-center">
          <h2 class="animate-fade-in-up text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
            {{ tt('Surrogacy Process Timeline: Steps, Milestones & Payments', '代孕流程时间线：步骤、里程碑与付款') }}
          </h2>
          <div class="mx-auto mt-4 h-1 w-32 animate-fade-in-up rounded-full bg-[var(--primary-brown)]" style="animation-delay: 200ms;" />
          <p class="mt-6 animate-fade-in-up text-4.5 leading-relaxed" style="animation-delay: 300ms;">
            {{ tt('A full gestational surrogacy journey usually takes about 12–16 months. The exact pace depends on embryo readiness, matching, and pregnancy progress. We keep you updated with weekly check-ins.', '完整的妊娠代孕旅程通常需要约 12–16 个月，具体节奏取决于胚胎准备、匹配进度与妊娠情况。我们每周更新进展。') }}
          </p>
        </div>

        <!-- Timeline with connecting line -->
        <div class="relative">
          <div class="absolute bottom-0 left-8 top-0 hidden w-0.5 from-[var(--primary-brown)] via-[var(--olive-green)] to-[var(--primary-brown)] bg-gradient-to-b opacity-30 lg:block" />
          <div class="space-y-8">
            <article
              v-for="(step, index) in processSteps"
              :key="step.title"
              class="relative flex animate-fade-in-up items-start gap-6"
              :style="{ animationDelay: `${400 + (index * 200)}ms` }"
            >
              <!-- Step Number Circle -->

              <!-- Step Content -->
              <div class="flex-1 border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-6 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl">
                <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" >
                  {{ step.title }}
                </h3>
                <p class="mt-3 text-4.25 leading-relaxed transition-all duration-300">
                  {{ step.description }}
                </p>
              </div>
            </article>
          </div>
        </div>

        <div class="mt-12 animate-fade-in-up border border-[var(--primary-brown)]/40 rounded-8 bg-white/95 p-8 text-4.5 leading-relaxed shadow-black/10 shadow-lg" style="animation-delay: 1000ms;">
          <p class="transition-all duration-300">
            {{ tt('What to expect: steady communication, milestone-based funding, and a transparent plan from match to newborn handoff. This structure protects your time, your health, and your surrogate compensation.', '你可以期待：稳定沟通、里程碑入账，以及从匹配到交接的新生儿的透明计划。该结构保护你的时间、健康与补偿。') }}
          </p>
        </div>
      </div>
    </section>

    <section id="faq" class="bg-[var(--yunda-petal)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="mb-12 text-center">
          <h2 class="animate-fade-in-up text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" >
            {{ tt('Frequently Asked Questions', '常见问题') }}
          </h2>
          <p class="mx-auto mt-4 max-w-220 animate-fade-in-up text-4.5 leading-relaxed" style="animation-delay: 150ms;">
            {{ tt('These answers explain surrogate pay, escrow payment schedules, reimbursable expenses, and what can change compensation. Exact payment terms should always be confirmed through eligibility review and the written agreement.', '以下回答说明代孕补偿、托管付款时间表、可报销费用，以及可能影响补偿的因素。具体付款条款应通过资格评估和书面协议确认。') }}
          </p>
          <div class="mx-auto mt-4 h-1 w-24 animate-fade-in-up rounded-full bg-[var(--primary-brown)]" style="animation-delay: 200ms;" />
        </div>
        <div class="space-y-6">
          <article
            v-for="(item, index) in faqQuestions"
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
          {{ tt('Ready to Plan Your Surrogacy Journey?', '准备好规划你的代孕旅程了吗？') }}
        </h2>
        <p class="mt-4 text-4.5 leading-relaxed">
          {{ tt('Surrogacy compensation works best with a transparent plan, a supportive team, and weekly communication. Let’s review your goals, your pay, and every milestone together.', '代孕补偿在透明计划、支持团队与每周沟通下效果最佳。让我们一起梳理目标、补偿与每个里程碑。') }}
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <NuxtLink
            to="/be-surrogate"
            class="rounded-full bg-white px-6 py-3 text-3.5 text-[var(--yunda-bark)] font-semibold uppercase transition hover:bg-[var(--yunda-petal)]"
          >
            {{ tt('Start Application', '开始申请') }}
          </NuxtLink>
          <NuxtLink
            to="/referral"
            class="border border-white rounded-full px-6 py-3 text-3.5 text-white font-semibold uppercase transition hover:bg-white/10"
          >
            {{ tt('Talk to a Coordinator', '联系协调员') }}
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

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'

const { locale } = useI18n()
const localePath = useLocalePath()

const translations = {
  en: {
    seoTitle: 'Surrogate Compensation: Pay, Benefits & Support | Yunda Surrogacy',
    seoDescription: 'Understand surrogate compensation in California and the U.S., including base pay, milestones, and support. Get a clear, private pay overview.',
    heroTitle: 'Surrogate Pay and Compensation, Clearly Explained',
    heroConclusion1:
      'Surrogacy pay is not a traditional salary. It is a clear compensation package with base pay, monthly support, and milestone-based payments, typically managed through escrow.',
    heroConclusion2:
      'Total pay can vary by state, insurance fit, and medical factors, so we outline the timeline and common questions (including miscarriage and eligibility) upfront. If you are ready, apply to get a realistic pay estimate based on your profile.',
    heroSubtitle: 'Understand how surrogate compensation works, including base pay, milestone payments, and ongoing support, with a clear overview you can use for real planning.',
    primaryCta: 'View Compensation Details',
    secondaryCta: 'Surrogate Application',
    heroImageAlt: 'Surrogate compensation consultation in the United States',
    features: [
      'Clear guidance on pay structure, timing, and milestones',
      'Thoughtful coordination around compensation, support, and benefits',
      'Private, respectful conversations so you can plan with confidence',
    ],
    onPageTitle: 'On this page, you’ll learn:',
    onPageItems: [
      'how surrogate compensation is typically structured',
      'when payments often begin and how milestones work',
      'what support and common benefits may include',
      'what factors can affect total compensation',
    ],
    overviewTitle: 'Surrogate Pay Overview: Average Surrogate Pay, Surrogate Mother Pay Rate & What Affects It',
    overviewIntro:
      'A practical way to read surrogate compensation is to split base pay from the full package, then map which factors move your final number.',
    avgCardLabel: 'Average surrogate pay',
    avgH3: 'Average surrogate pay: what "average" really means',
    avgBody1:
      'When people ask about average surrogate pay (or surrogate average pay), it helps to separate base pay from the total package.',
    avgBaseLabel: 'Personalized Base Compensation',
    avgBaseValue: '$61,000+',
    avgBaseNote: 'Paid monthly starting after a confirmed heartbeat.',
    avgTotalLabel: 'Total average pay for surrogate mothers',
    avgTotalNote: 'Can include monthly allowance, IVF-related stipends, and pregnancy/recovery benefits.',
    avgLinkPrefix: 'For a line-item view, see',
    avgLink1: 'surrogate compensation details',
    avgLinkMiddle: 'and compare broader',
    avgLink2: 'surrogacy cost structure',
    avgLinkSuffix: 'for context.',
    rateCardLabel: 'Surrogate mother pay rate',
    rateH3: 'Surrogate mother pay rate: what affects it most',
    rateBody1:
      'Your surrogate mother\'s pay rate is shaped by your experience level, where you live, and whether you have eligible health insurance.',
    rateFactors: [
      'Experience level: first-time vs. repeat surrogate',
      'State differences and local market conditions',
      'Eligible insurance fit for surrogacy care',
      'Medical details: multiples, procedures, and delivery factors',
    ],
    rateLinkPrefix: 'We set compensation clearly and support payouts through',
    rateLink1: 'escrow payment management',
    rateLinkMiddle: 'plus',
    rateLink2: 'medical screening and eligibility review',
    rateLinkSuffix: 'so payments stay safe and on time.',
    compVsSalaryTitle: 'Surrogate Compensation: How Surrogate Payment Works',
    salaryH3: 'First-time surrogate compensation: total package at a glance',
    salaryBody1:
      'Yunda lists Personalized Base Compensation: $61,000+ for first-time surrogates. This base is typically paid monthly starting after a confirmed heartbeat.',
    salaryBody2:
      'Your total first-time surrogate compensation can be higher when you include the monthly allowance and common benefits tied to the IVF process and pregnancy support.',
    salaryLinkPrefix: 'If you want a full package breakdown, review',
    salaryLink1: 'surrogate compensation details',
    salaryLinkMiddle: 'and our',
    salaryLink2: 'screening process',
    salaryLinkSuffix: 'for eligibility context.',
    structureH3: 'How surrogate payment is typically structured',
    structureBody1: 'Most surrogate payment plans have two core parts:',
    structureItems: [
      'Base compensation (the main portion of surrogate mother compensation), paid in scheduled installments during the journey.',
      'Reimbursements and allowances for real expenses and extra time tied to the process (appointments, approved travel, and other agreed items).',
    ],
    structureBody2:
      'Payments are usually handled through escrow to keep everything orderly and on time.',
    structureBody3:
      'You will know what triggers each payment, what is reimbursable, and what needs documentation, so you can move forward with confidence in a way that feels respectful and steady.',
    structureLinkPrefix: 'Next, you can',
    structureLink1: 'apply to become a surrogate',
    structureLinkMiddle: 'or compare',
    structureLink2: 'surrogacy cost structure',
    structureLinkSuffix: 'to see how funding is organized across the journey.',
    packageTitle: 'Surrogate Compensation Package: Base Pay, Monthly Allowance & Common Benefits',
    packageCardTitle: 'Surrogate Compensation Package: $61,000-$70,000+',
    packageH3Core: 'Base pay + monthly allowance (your core surrogate mother pay)',
    packageCoreBody1:
      'Your surrogate compensation starts with a clear base, then steady support month to month. For first-time surrogates, Yunda lists Personalized Base Compensation: $61,000 to $70,000+, paid monthly starting from a confirmed heartbeat.',
    packageCoreBody2:
      'On top of that, there is a monthly allowance to help cover everyday needs during the journey, including transportation, meals, childcare, and miscellaneous expenses. This keeps your surrogate payment practical, not just on paper.',
    packageCoreBullets: [
      'Personalized Base Pay: $61,000-$70,000+ per journey',
      'Monthly Non-Reimbursable Allowance: $300+ per month',
    ],
    packageH3Benefits: 'Common benefits that build the full compensation package',
    packageBenefitsIntro1:
      'Beyond base pay, the benefits package includes set stipends tied to real milestones.',
    packageBenefitsIntro2:
      'Estimated benefits total: $11,000 (actual amounts vary by personal situation and medical needs).',
    packageBenefitsItems: [
      {
        title: 'Embryo Transfer Stipend',
        amount: '$2,000 (per transfer)',
        timing: 'Paid within 10 business days after embryo transfer',
      },
      {
        title: 'Signing Bonus',
        amount: '$1,000',
        timing: 'Paid after the legal contract is notarized',
      },
      {
        title: 'Injection Medication Stipend',
        amount: '$1,200 (per cycle)',
        timing: 'Paid within 10 days after starting medication, by transfer cycle',
      },
      {
        title: 'Monthly Non-Reimbursable Allowance',
        amount: '$300/month (estimated $3,600 for 12 months)',
        timing: 'Paid on the 1st of each month after contract signing',
      },
      {
        title: 'Maternity Clothing Stipend',
        amount: '$1,000',
        timing: 'One-time at 15 weeks (+$200 for multiples)',
      },
      {
        title: 'Surrogate Health Support',
        amount: '$1,000',
        timing: 'Paid after heartbeat confirmation (non-refundable)',
      },
      {
        title: 'Housekeeping/Cleaning Stipend',
        amount: '$1,200',
        timing: 'Reimbursed starting from week 28',
      },
    ],
    packageAmountRows: [
      { label: 'Personalized Base Compensation', amount: '$61,000-$70,000+' },
      { label: 'Monthly Non-Reimbursable Allowance', amount: '$300+/month' },
      { label: 'Estimated Benefits Total', amount: '$11,000' },
    ],
    timelineTitle: 'Payment Timeline: Do Surrogates Get Paid Monthly and When Does Pay Start?',
    timelineFlowLabel: 'Meds -> Transfer -> Heartbeat -> Pregnancy -> Delivery',
    timelineH3Start: 'Do surrogates get paid monthly-and when does surrogate payment start?',
    timelineStartBody1:
      'With Yunda, surrogate payment follows clear milestones. Some support starts after the legal agreement, but the monthly pay most surrogates mean usually begins after a confirmed heartbeat, when base compensation starts paying out in scheduled monthly installments.',
    timelineH3Flow: 'Payment timeline (meds -> transfer -> heartbeat -> pregnancy -> delivery)',
    timelineFlowImgAlt: 'Surrogate payment timeline flow: meds, transfer, heartbeat, pregnancy, delivery',
    timelineItems: [
      {
        stage: 'Legal contract signed + notarized',
        payment: 'Signing bonus: $1,000; Monthly allowance: $300/month',
        note: 'Starts after legal completion and supports early-stage journey costs.',
      },
      {
        stage: 'Medication start',
        payment: 'Injection medication stipend: $1,200',
        note: 'Paid by transfer cycle after medication begins.',
      },
      {
        stage: 'Embryo transfer',
        payment: '$2,000 (per transfer)',
        note: 'Triggered after each embryo transfer event.',
      },
      {
        stage: 'Heartbeat confirmed',
        payment: 'Base compensation: $61,000 begins monthly over 10 months; Health support: $1,000 (one-time)',
        note: 'This is typically the point where core monthly compensation starts.',
      },
      {
        stage: '15 weeks',
        payment: 'Maternity clothing stipend: $1,000 (+$200 for multiples)',
        note: 'One-time support tied to pregnancy progression.',
      },
      {
        stage: '28 weeks',
        payment: 'Housekeeping support: $1,200',
        note: 'Reimbursement support begins at late-pregnancy stage.',
      },
      {
        stage: 'Delivery + postpartum',
        payment: 'Remaining scheduled payments and approved reimbursements are completed through escrow per the agreement.',
        note: 'Final releases and reconciliations follow contract terms.',
      },
    ],
    statePayTitle: 'State-by-State Surrogate Pay (U.S. & California Focus)',
    statePayHeaders: [
      'State / Region',
      'Compensation Level (Relative)',
      'Why It Can Differ',
      'What to Pay Attention To',
    ],
    statePayRows: [
      {
        state: 'U.S. Overall (Average)',
        level: 'Baseline reference',
        why: 'Large variation by state due to living costs, insurance markets, clinic density, and demand.',
        attention: 'Look at the full package: base pay + allowances + benefits + reimbursements.',
      },
      {
        state: 'California (CA)',
        level: 'Often higher',
        why: 'Higher living costs; strong clinic availability; steady demand; insurance and network factors can affect total.',
        attention: 'For average surrogate compensation in California, insurance fit and in-network access often matter most.',
      },
      {
        state: 'Florida (FL)',
        level: 'Wide range',
        why: 'Insurance rules and network access vary; some areas have concentrated clinic options, others require more travel.',
        attention: 'Confirm maternity coverage, deductible/out-of-pocket, and out-of-network exposure.',
      },
      {
        state: 'Washington (WA)',
        level: 'Mid to higher (varies by city)',
        why: 'Higher costs in major metros; strong medical access in certain regions; stable demand.',
        attention: 'Travel time to clinics, monitoring schedule, and support planning.',
      },
      {
        state: 'Texas (TX)',
        level: 'Mid to higher (varies by city)',
        why: 'Big differences between major cities and smaller areas; insurance and clinic access can shift overall planning.',
        attention: 'Location, clinic access, and insurance eligibility are key drivers.',
      },
    ],
    faqTitle: 'Surrogate Pay FAQ: Miscarriage Pay, Eligibility, and Common Questions',
    faqItems: [
      {
        q: 'Do surrogates get paid?',
        a: 'Yes. In most U.S. journeys, surrogates receive structured surrogate compensation and reimbursements. The terms are written into a legal agreement and paid on a set timeline.',
      },
      {
        q: 'Do surrogate mothers get paid, or is it a "salary"?',
        a: 'Surrogates are typically paid as compensation, not a traditional salary. That means payments follow milestones and agreed support items, rather than hourly wages.',
      },
      {
        q: 'Can surrogates get paid monthly?',
        a: 'Often, yes. Many programs use milestone-based payments, and base compensation is commonly paid in monthly installments after key pregnancy confirmation steps.',
      },
      {
        q: 'Do surrogates get paid if they miscarry?',
        a: 'It depends on the stage of pregnancy and what the agreement states. Many arrangements include clear terms for compensation already earned and for what happens if a pregnancy ends early.',
      },
      {
        q: 'How much do surrogate mothers get paid?',
        a: 'It varies by experience, state, and medical factors. The best way to understand compensation is to look at the full package: base pay, allowances, benefits, and reimbursements.',
      },
      {
        q: 'How much do surrogates make a year?',
        a: 'Surrogacy compensation is not guaranteed annual income because the timeline can span many months and varies by matching and clinic schedules. We usually explain expected totals over the journey instead.',
      },
      {
        q: 'How much do surrogates make overall?',
        a: 'If you are asking what surrogates get paid, the total depends on base compensation plus milestone benefits and any situation-based add-ons defined in the agreement.',
      },
      {
        q: 'What does a surrogate make in California compared to other states?',
        a: 'California often trends higher because of cost of living, clinic access, and local demand. Still, the real number depends on insurance, location, and your specific journey plan.',
      },
      {
        q: 'How much can I make as a surrogate?',
        a: 'It depends on whether you are first-time or experienced, your state, and your medical and insurance profile. It also depends on whether you qualify smoothly for screening and matching.',
      },
      {
        q: 'How much can you make as a surrogate if you are eligible and ready?',
        a: 'If you are eligible, the fastest path is getting screened, confirming insurance fit, and moving into matching. From there, compensation is clearer because it is written, scheduled, and tied to specific milestones.',
      },
    ],
  },
  zh: {
    seoTitle: '代孕妈妈补偿：报酬、福利与支持 | Yunda',
    seoDescription: '了解加州和美国的代孕妈妈补偿，包括基础报酬、里程碑付款和支持。获得清晰、私密的报酬概览。',
    heroTitle: '代母补偿与报酬，清晰说明',
    heroConclusion1:
      '代孕补偿不是传统薪资，而是一套清晰的补偿方案：基础补偿、月度支持和里程碑付款，通常通过第三方托管账户（Escrow）管理。',
    heroConclusion2:
      '总代补偿会因所在州、保险适配度和医疗因素而变化，所以我们会提前说明付款时间线与常见问题（包括流产与资格评估）。如果你准备好了，可以提交申请，我们会基于你的个人情况给出更贴近实际的补偿预估。',
    heroSubtitle: '了解代母补偿如何运作，包括基础补偿、里程碑付款与持续支持，帮助你做出可执行的规划。',
    primaryCta: '查看补偿详情',
    secondaryCta: 'Surrogate Application',
    heroImageAlt: '美国代孕补偿咨询场景',
    features: [
      '清晰说明补偿结构、支付节奏与关键节点',
      '围绕补偿、支持与福利进行细致协同',
      '以私密、尊重的沟通帮助你安心规划',
    ],
    onPageTitle: '本页你将了解：',
    onPageItems: [
      '代母补偿通常如何构成',
      '付款通常何时开始、里程碑如何触发',
      '常见支持与福利通常包含哪些内容',
      '哪些因素会影响总补偿',
    ],
    overviewTitle: '代孕补偿总览：平均补偿、代孕妈妈报酬水平，以及影响因素',
    overviewIntro:
      '看代孕补偿最实用的方法，是把基础补偿和整体补偿包分开看，再明确哪些因素会影响你的最终金额。',
    avgCardLabel: '平均代孕补偿',
    avgH3: '平均代孕补偿：为什么“平均值”要分开看',
    avgBody1:
      '当大家问平均代孕补偿（average surrogate pay）时，建议先区分基础补偿（base pay）和整体补偿包（total package）。',
    avgBaseLabel: '个性化基础补偿',
    avgBaseValue: '$61,000+',
    avgBaseNote: '通常在确认胎心后开始按月发放。',
    avgTotalLabel: '总代补偿（不止基础补偿）',
    avgTotalNote: '还可包含月度津贴、IVF 相关补贴以及孕期/恢复支持，覆盖真实生活支出。',
    avgLinkPrefix: '想看明细可查看',
    avgLink1: '代孕补偿详情',
    avgLinkMiddle: '，并结合',
    avgLink2: '代孕费用结构',
    avgLinkSuffix: '一起评估。',
    rateCardLabel: '代孕妈妈报酬水平',
    rateH3: '代孕妈妈报酬水平：最关键的影响因素',
    rateBody1:
      '你的报酬水平主要由几个现实因素决定：经验水平、所在州、以及是否具备可用健康保险。',
    rateFactors: [
      '经验水平：首次代孕或重复代孕',
      '地区差异：居住州与当地补偿环境',
      '保险适配：是否有可用于代孕的保险',
      '医疗细节：多胎、特定医疗操作与分娩情况',
    ],
    rateLinkPrefix: '我们会用清晰的个性化方式设定补偿，并通过',
    rateLink1: '托管支付机制',
    rateLinkMiddle: '与',
    rateLink2: '医学筛查与资格审核',
    rateLinkSuffix: '协同推进，确保发放安全、准时、可追踪。',
    compVsSalaryTitle: '代孕补偿 ：代孕付款机制如何运作',
    salaryH3: '首次代孕补偿：总补偿包一览',
    salaryBody1:
      'Yunda 对首次代孕妈妈给出的个性化基础补偿为 $61,000+，通常在确认胎心后按月发放。',
    salaryBody2:
      '在此基础上，如果叠加月度津贴以及与 IVF 流程和孕期支持相关的常见福利，首次代孕的总补偿通常会更高。',
    salaryLinkPrefix: '如果你想看完整补偿拆解，可以查看',
    salaryLink1: '代孕补偿详情',
    salaryLinkMiddle: '和',
    salaryLink2: '医学筛查流程',
    salaryLinkSuffix: '来理解资格与流程前置条件。',
    structureH3: '代孕付款通常如何构成',
    structureBody1: '大多数代孕付款方案由两部分组成：',
    structureItems: [
      '基础补偿（代孕妈妈补偿的核心部分），在旅程中按既定里程碑分期发放。',
      '报销与津贴，用于覆盖真实支出和额外投入（如就诊、获批出行及合同约定项目）。',
    ],
    structureBody2:
      '付款通常通过第三方托管（escrow）执行，以确保流程有序、发放准时。',
    structureBody3:
      '你会清楚知道每笔款项的触发条件、哪些费用可报销、需要哪些凭证，从而更稳妥、更安心地推进整个旅程。',
    structureLinkPrefix: '下一步你可以',
    structureLink1: '提交代孕申请',
    structureLinkMiddle: '或查看',
    structureLink2: '代孕费用结构',
    structureLinkSuffix: '，了解整个流程的资金安排方式。',
    packageTitle: '代孕补偿方案：基础补偿、月度津贴与常见福利',
    packageCardTitle: '代孕补偿方案：$61,000-$70,000+',
    packageH3Core: '基础补偿 + 月度津贴（你的核心代孕补偿）',
    packageCoreBody1:
      '代孕补偿通常从清晰的基础补偿开始，再叠加每月的稳定支持。针对首次代孕妈妈，Yunda 的个性化基础补偿通常为 $61,000-$70,000+，并在确认胎心后按月发放。',
    packageCoreBody2:
      '在此基础上，还有月度津贴用于覆盖旅程中的日常支出，如交通、餐食、托育和杂项费用，让代孕补偿在现实生活中更可执行，而不只是“纸面数字”。',
    packageCoreBullets: [
      '个性化基础补偿：每段旅程 $61,000-$70,000+',
      '月度非报销津贴：每月 $300+',
    ],
    packageH3Benefits: '构成完整补偿包的常见福利',
    packageBenefitsIntro1:
      '除基础补偿外，福利包还包含与真实里程碑挂钩的固定津贴。',
    packageBenefitsIntro2:
      '福利预计总额约 $11,000（实际金额会因个人情况与医疗需求而变化）。',
    packageBenefitsItems: [
      {
        title: '胚胎移植津贴',
        amount: '$2,000（每次移植）',
        timing: '胚胎移植后 10 个工作日内发放',
      },
      {
        title: '签约奖金',
        amount: '$1,000',
        timing: '法律合同完成公证后发放',
      },
      {
        title: '注射用药津贴',
        amount: '$1,200（每个周期）',
        timing: '每个移植周期开始用药后 10 天内发放',
      },
      {
        title: '月度非报销津贴',
        amount: '$300/月（12 个月预计 $3,600）',
        timing: '合同签署后每月 1 日发放',
      },
      {
        title: '孕期服装津贴',
        amount: '$1,000',
        timing: '孕 15 周一次性发放（多胎额外 +$200）',
      },
      {
        title: '代孕健康支持津贴',
        amount: '$1,000',
        timing: '确认胎心后发放（不退还）',
      },
      {
        title: '家政/清洁津贴',
        amount: '$1,200',
        timing: '从孕 28 周开始按规则报销',
      },
    ],
    packageAmountRows: [
      { label: '个性化基础补偿', amount: '$61,000-$70,000+' },
      { label: '月度非报销津贴', amount: '$300+/月' },
      { label: '福利预计总额', amount: '$11,000' },
    ],
    timelineTitle: '付款时间线：代孕妈妈会按月收款吗？从什么时候开始？',
    timelineFlowLabel: '用药 -> 移植 -> 胎心 -> 孕期 -> 分娩',
    timelineH3Start: '代孕妈妈会按月收款吗？付款从什么时候开始？',
    timelineStartBody1:
      '在 Yunda，代孕付款遵循清晰里程碑。部分支持会在法律协议完成后启动，但大多数人说的“按月收款”，通常从确认胎心后开始，即基础补偿进入按月分期发放。',
    timelineH3Flow: '付款时间线（用药 -> 移植 -> 胎心 -> 孕期 -> 分娩）',
    timelineFlowImgAlt: '代孕付款时间线流程图：用药、移植、胎心、孕期、分娩',
    timelineItems: [
      {
        stage: '法律合同签署并公证',
        payment: '签约奖金：$1,000；月度津贴：$300/月（预计总计 $3,600）',
        note: '法律流程完成后启动，支持早期阶段支出。',
      },
      {
        stage: '开始用药',
        payment: '注射用药津贴：$1,200（每周期）',
        note: '按移植周期，在用药后触发发放。',
      },
      {
        stage: '胚胎移植',
        payment: '$2,000（每次移植）',
        note: '每次移植完成后触发对应津贴。',
      },
      {
        stage: '确认胎心',
        payment: '基础补偿：$61,000 在 10 个月内按月发放；健康支持津贴：$1,000（一次性）',
        note: '这通常是核心“月度补偿”正式开始的节点。',
      },
      {
        stage: '孕 15 周',
        payment: '孕期服装津贴：$1,000（多胎 +$200）',
        note: '与孕周相关的一次性支持。',
      },
      {
        stage: '孕 28 周',
        payment: '家政支持：$1,200（报销）',
        note: '进入孕晚期后按规则开始报销。',
      },
      {
        stage: '分娩 + 产后',
        payment: '剩余计划付款与获批报销将按协议通过托管完成结算。',
        note: '最终发放与核对依据合同条款执行。',
      },
    ],
    statePayTitle: '各州代孕补偿对比（美国整体与加州重点）',
    statePayHeaders: [
      '州 / 地区',
      '补偿水平（相对）',
      '为什么会有差异',
      '重点关注项',
    ],
    statePayRows: [
      {
        state: '美国整体（平均）',
        level: '基准参考',
        why: '各州生活成本、保险市场、诊所密度和供需差异明显，补偿区间波动较大。',
        attention: '要看完整补偿包：基础补偿 + 津贴 + 福利 + 报销。',
      },
      {
        state: '加州（CA）',
        level: '通常更高',
        why: '生活成本高；诊所资源密集；需求稳定；保险和网络内/外就医因素会影响总额。',
        attention: '关注加州平均补偿时，保险适配度和网络内可及性通常最关键。',
      },
      {
        state: '佛罗里达（FL）',
        level: '区间较宽',
        why: '保险规则和网络可及性差异大；部分区域诊所集中，部分区域需要更多跨城出行。',
        attention: '优先确认孕产覆盖、免赔额/自付上限与网络外风险。',
      },
      {
        state: '华盛顿州（WA）',
        level: '中到偏高（城市差异明显）',
        why: '核心城市成本更高；部分地区医疗资源强；整体需求稳定。',
        attention: '重点评估就诊通勤时间、监测频次与支持计划。',
      },
      {
        state: '德州（TX）',
        level: '中到偏高（城市差异明显）',
        why: '大城市与小城市差异显著；保险和诊所可及性会明显影响整体规划。',
        attention: '地理位置、诊所可及性与保险资格是关键驱动。',
      },
    ],
    faqTitle: '代孕补偿 FAQ：流产补偿、资格与常见问题',
    faqItems: [
      {
        q: '代孕妈妈会获得补偿吗？',
        a: '会。在美国大多数代孕项目中，代孕妈妈会获得结构化补偿与报销。条款会写入法律协议，并按明确时间线执行发放。',
      },
      {
        q: '代孕妈妈获得的是“工资”吗？',
        a: '通常不是传统工资，而是补偿方案。也就是说，付款依据里程碑和约定支持项目执行，而不是按小时计薪。',
      },
      {
        q: '代孕补偿可以按月发放吗？',
        a: '多数情况下可以。很多项目采用里程碑付款机制，基础补偿通常在关键妊娠确认后按月分期发放。',
      },
      {
        q: '如果发生流产，代孕妈妈还能拿到补偿吗？',
        a: '取决于妊娠阶段和合同条款。很多协议会明确已产生补偿如何处理，以及妊娠提前结束时的发放规则。',
      },
      {
        q: '代孕妈妈一般能拿多少补偿？',
        a: '金额会因经验、所在州和医疗因素而变化。最可靠的方式是看完整补偿包：基础补偿、津贴、福利和报销。',
      },
      {
        q: '代孕妈妈一年能赚多少？',
        a: '代孕补偿通常不是“固定年收入”，因为时间线会跨越多个月，且受匹配和诊所排期影响。更建议看整段旅程的预计总额。',
      },
      {
        q: '代孕整体能拿到多少？',
        a: '总体金额通常由基础补偿、里程碑福利以及合同约定的情境附加项共同组成。',
      },
      {
        q: '加州与其他州相比，补偿差异大吗？',
        a: '加州通常偏高，常见原因包括生活成本、诊所可及性和本地需求。但具体金额仍取决于保险、所在地和个人旅程方案。',
      },
      {
        q: '我作为代孕妈妈大概能拿多少？',
        a: '取决于你是首次还是有经验代孕、所在州、以及医疗和保险档案情况，也与是否顺利通过筛查和匹配有关。',
      },
      {
        q: '如果我符合资格并准备好了，补偿怎么更快明确？',
        a: '最快路径通常是先完成筛查、确认保险适配并进入匹配。进入匹配后，补偿会通过书面协议与里程碑时间表变得更清晰。',
      },
    ],
  },
}

const c = computed(() => ((locale.value || '').startsWith('zh') ? translations.zh : translations.en))

function splitPaymentLines(payment: string) {
  return payment.split(/[;；]/).map(part => part.trim()).filter(Boolean)
}

function highlightAmounts(line: string) {
  return line.replace(/\$\d[\d,]*(\+)?(\/[a-z\u4E00-\u9FFF]+)?/gi, '<span class="timeline-amount">$&</span>')
}

function hasCurrencyValue(payment: string) {
  return /\$\d/.test(payment)
}

useHead(() => ({
  title: c.value.seoTitle,
  meta: [
    {
      name: 'description',
      content: c.value.seoDescription,
    },
  ],
}))
</script>

<template>
  <div>
    <AppHeader />
    <main>
      <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b pb-10 pt-24 lg:pt-28">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/35 rounded-[24px] bg-[var(--yunda-petal)] shadow-[0_12px_26px_rgba(39,31,24,0.07)]">
            <div class="grid items-center gap-10 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-14">
              <div class="max-w-[760px]">
                <h1 class="font-display text-[38px] text-[var(--yunda-bark)] font-semibold leading-[1.1] lg:text-[50px]">
                  {{ c.heroTitle }}
                </h1>
                <p class="mt-6 text-3.5 text-[var(--yunda-bark)] leading-relaxed opacity-75 lg:text-4.8" style="font-family: var(--font-text)">
                  {{ c.heroSubtitle }}
                </p>
                <div class="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#compensation-details"
                    class="inline-flex w-full border border-transparent sm:w-[360px] min-h-[68px] items-center justify-center rounded-[12px] bg-[var(--yunda-bark)] px-8 py-5 text-4 text-[var(--yunda-petal)] font-extrabold tracking-[0.02em] shadow-[0_6px_14px_rgba(169,108,66,0.2)] transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                 ">
                    {{ c.primaryCta }}
                  </a>
                  <NuxtLink
                    :to="localePath('/be-surrogate')"
                    class="inline-flex w-full border border-[var(--primary-brown)]/45 sm:w-[360px] min-h-[68px] items-center justify-center gap-2 rounded-[12px] bg-white/88 px-8 py-5 text-4 text-[var(--primary-brown)] font-extrabold tracking-[0.02em] shadow-[0_6px_14px_rgba(39,31,24,0.06)] transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                 ">
                    <span>{{ c.secondaryCta }}</span>
                    <Icon name="radix-icons:arrow-right" class="h-4.5 w-4.5" />
                  </NuxtLink>
                </div>
                <div class="mt-6 border border-[var(--primary-brown)]/18 rounded-[16px] bg-white/82 p-4">
                  <p class="font-sans text-lg text-[var(--yunda-bark)] font-bold lg:text-xl" style="font-family: var(--font-text)">
                    {{ c.onPageTitle }}
                  </p>
                  <ul class="mt-2 grid gap-1.5">
                    <li
                      v-for="(item, index) in c.onPageItems"
                      :key="`benefit-onpage-${index}`"
                      class="flex items-start gap-2.5 text-3.4 text-[var(--yunda-bark)]/84 leading-relaxed lg:text-4"
                      style="font-family: var(--font-text)"
                   ">
                      <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary-brown)]/75" />
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="flex items-center justify-center lg:justify-end">
                <div class="max-w-[520px] w-full overflow-hidden border border-white/65 rounded-[20px] bg-white/85 shadow-[0_14px_34px_rgba(64,84,120,0.08)]">
                  <img
                    src="/images/gc/gc-pic/Surrogate-Pay-Overview.png"
                    :alt="c.heroImageAlt"
                    width="520"
                    height="380"
                    class="h-[380px] w-full object-cover"
                    loading="eager"
                    decoding="async"
                 ">
                </div>
              </div>
            </div>
            <div class="border-t border-[var(--primary-brown)] bg-[var(--yunda-petal)] px-6 py-4 lg:px-12">
              <div class="flex flex-wrap items-center justify-start gap-6 text-3 text-[var(--yunda-bark)] opacity-80 md:text-3.5" style="font-family: var(--font-text)">
                <div class="flex items-center gap-2">
                  <Icon name="radix-icons:check-circled" class="h-4 w-4 text-[var(--primary-brown)]" />
                  <span>{{ c.features[0] }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="radix-icons:check-circled" class="h-4 w-4 text-[var(--primary-brown)]" />
                  <span>{{ c.features[1] }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="radix-icons:check-circled" class="h-4 w-4 text-[var(--primary-brown)]" />
                  <span>{{ c.features[2] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full bg-[var(--yunda-petal)] pb-16 lg:pb-20">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/20 rounded-[18px] bg-white/90 px-6 py-8 shadow-[0_16px_34px_rgba(39,31,24,0.06)] lg:px-10 lg:py-10">
            <h2 id="compensation-details" class="scroll-mt-28 font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
              {{ c.overviewTitle }}
            </h2>
            <p class="mt-3 max-w-[1200px] text-3.5 text-[var(--yunda-bark)]/80 leading-relaxed lg:text-4.5" style="font-family: var(--font-text)">
              {{ c.overviewIntro }}
            </p>

            <div class="grid mt-8 gap-6 lg:grid-cols-2">
              <article class="overflow-hidden border border-[#dcc8a4] rounded-[14px] bg-[#f7efe0] shadow-[0_12px_28px_rgba(39,31,24,0.06)]">
                <div class="flex items-center justify-between gap-4 border-b border-[#dfcba9] bg-[#f2e5cd] px-5 py-4">
                  <div>
                    <p class="text-3.5 text-[var(--yunda-bark)]/75 font-semibold tracking-[0.03em] uppercase" style="font-family: var(--font-text)">
                      {{ c.avgCardLabel }}
                    </p>
                    <p class="mt-1 text-9 text-[var(--yunda-maple)] font-semibold leading-none lg:text-10">
                      {{ c.avgBaseValue }}
                    </p>
                  </div>
                  <div class="h-20 w-20 flex shrink-0 items-center justify-center border border-[#d1b382] rounded-full bg-[#f9eecf] text-[#cc9a3a] shadow-[inset_0_0_0_4px_rgba(204,154,58,0.14)]">
                    <Icon name="lucide:badge-dollar-sign" class="h-10 w-10" />
                  </div>
                </div>

                <div class="px-5 py-5">
                  <h3 class="text-4.5 text-[var(--yunda-bark)] font-semibold font-bold leading-tight lg:text-[24px]" style="font-family: var(--font-text)">
                    {{ c.avgH3 }}
                  </h3>
                  <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.25" style="font-family: var(--font-text)">
                    {{ c.avgBody1 }}
                  </p>

                  <div class="mt-4 border border-[#dcc8a4]/80 rounded-[10px] bg-white/72 px-4 py-3">
                    <p class="text-3.5 text-[var(--yunda-bark)]/85 leading-relaxed" style="font-family: var(--font-text)">
                      <span class="text-[var(--yunda-bark)] font-semibold">{{ c.avgBaseLabel }}:</span>
                      <span class="mx-1 text-[var(--yunda-maple)] font-semibold">{{ c.avgBaseValue }}</span>
                      {{ c.avgBaseNote }}
                    </p>
                  </div>

                  <div class="mt-3 border border-[#dcc8a4]/80 rounded-[10px] bg-white/72 px-4 py-3">
                    <p class="text-3.5 text-[var(--yunda-bark)]/85 leading-relaxed" style="font-family: var(--font-text)">
                      <span class="text-[var(--yunda-bark)] font-semibold">{{ c.avgTotalLabel }}:</span>
                      {{ c.avgTotalNote }}
                    </p>
                  </div>

                  <p class="mt-4 text-3.5 text-[var(--yunda-bark)]/78 leading-relaxed" style="font-family: var(--font-text)">
                    {{ c.avgLinkPrefix }}
                    <NuxtLink :to="localePath('/surrogate-compensation')" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                      {{ c.avgLink1 }}
                    </NuxtLink>
                    <span class="mx-1">{{ c.avgLinkMiddle }}</span>
                    <NuxtLink :to="localePath('/surrogacy-cost')" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                      {{ c.avgLink2 }}
                    </NuxtLink>
                    <span>{{ c.avgLinkSuffix }}</span>
                  </p>
                </div>
              </article>

              <article class="overflow-hidden border border-[var(--yunda-bark)]/70 rounded-[14px] bg-[var(--yunda-petal)] shadow-[0_12px_28px_rgba(39,31,24,0.06)]">
                <div class="grid items-center gap-4 border-b border-[var(--yunda-bark)]/75 bg-[var(--faq-bg)]/40 px-5 py-4 sm:grid-cols-[1fr_auto]">
                  <div>
                    <p class="text-3.5 text-[var(--yunda-bark)]/75 font-semibold tracking-[0.03em] uppercase" style="font-family: var(--font-text)">
                      {{ c.rateCardLabel }}
                    </p>
                    <p class="mt-1 text-9 text-[var(--primary-brown)] font-semibold leading-none lg:text-10">
                      {{ c.avgBaseValue }}
                    </p>
                  </div>
                  <div class="h-24 w-30 overflow-hidden border border-[var(--yunda-bark)]/70 rounded-[10px] bg-white/75">
                    <img
                      src="/images/landingpage2/Surrogate-Compensation-Factors.jpg"
                      :alt="c.rateCardLabel"
                      class="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                   ">
                  </div>
                </div>

                <div class="px-5 py-5">
                  <h3 class="text-4.5 text-[var(--yunda-bark)] font-semibold font-bold leading-tight lg:text-[24px]" style="font-family: var(--font-text)">
                    {{ c.rateH3 }}
                  </h3>
                  <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.25" style="font-family: var(--font-text)">
                    {{ c.rateBody1 }}
                  </p>

                  <ul class="grid mt-4 gap-2">
                    <li v-for="(factor, index) in c.rateFactors" :key="`rate-factor-${index}`" class="flex items-start gap-2">
                      <Icon name="radix-icons:check-circled" class="mt-0.5 h-4 w-4 text-[var(--olive-green)]" />
                      <span class="text-3.5 text-[var(--yunda-bark)]/86 leading-relaxed" style="font-family: var(--font-text)">
                        {{ factor }}
                      </span>
                    </li>
                  </ul>

                  <p class="mt-4 border-t border-[var(--yunda-bark)]/70 pt-4 text-3.5 text-[var(--yunda-bark)]/78 leading-relaxed" style="font-family: var(--font-text)">
                    {{ c.rateLinkPrefix }}
                    <NuxtLink :to="localePath('/surrogate-compensation')" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                      {{ c.rateLink1 }}
                    </NuxtLink>
                    <span class="mx-1">{{ c.rateLinkMiddle }}</span>
                    <NuxtLink :to="localePath('/screening')" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                      {{ c.rateLink2 }}
                    </NuxtLink>
                    <span>{{ c.rateLinkSuffix }}</span>
                  </p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full from-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b pb-18 lg:pb-22">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/20 rounded-[18px] bg-white/92 px-6 py-8 shadow-[0_16px_34px_rgba(39,31,24,0.06)] lg:px-10 lg:py-10">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
              {{ c.compVsSalaryTitle }}
            </h2>

            <div class="grid mt-7 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
              <article class="border border-[var(--primary-brown)]/18 rounded-[14px] bg-[var(--yunda-petal)]/75 px-5 py-5 shadow-[0_10px_24px_rgba(39,31,24,0.05)]">
                <h3 class="text-4.8 text-[var(--yunda-bark)] font-semibold font-bold leading-tight lg:text-[24px]" style="font-family: var(--font-text)">
                  {{ c.salaryH3 }}
                </h3>
                <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                  {{ c.salaryBody1 }}
                </p>
                <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                  {{ c.salaryBody2 }}
                </p>
                <p class="mt-4 border-t border-[var(--primary-brown)]/18 pt-4 text-3.5 text-[var(--yunda-bark)]/78 leading-relaxed" style="font-family: var(--font-text)">
                  {{ c.salaryLinkPrefix }}
                  <NuxtLink :to="localePath('/surrogate-compensation')" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                    {{ c.salaryLink1 }}
                  </NuxtLink>
                  <span class="mx-1">{{ c.salaryLinkMiddle }}</span>
                  <NuxtLink :to="localePath('/screening')" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                    {{ c.salaryLink2 }}
                  </NuxtLink>
                  <span>{{ c.salaryLinkSuffix }}</span>
                </p>
              </article>

              <article class="border border-[var(--yunda-bark)]/70 rounded-[14px] bg-[var(--yunda-petal)]/45 px-5 py-5 shadow-[0_10px_24px_rgba(39,31,24,0.05)]">
                <h3 class="text-4.8 text-[var(--yunda-bark)] font-semibold font-bold leading-tight lg:text-[24px]" style="font-family: var(--font-text)">
                  {{ c.structureH3 }}
                </h3>
                <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                  {{ c.structureBody1 }}
                </p>

                <ul class="grid mt-4 gap-3">
                  <li
                    v-for="(item, index) in c.structureItems"
                    :key="`structure-item-${index}`"
                    class="flex items-start gap-3 border border-[var(--yunda-bark)]/45 rounded-[10px] bg-white/82 px-3.5 py-3"
                 ">
                    <span class="mt-0.2 h-6 w-6 inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--yunda-bark)] text-3 text-[var(--yunda-petal)] font-semibold">
                      {{ index + 1 }}
                    </span>
                    <span class="text-3.5 text-[var(--yunda-bark)]/84 leading-relaxed" style="font-family: var(--font-text)">
                      {{ item }}
                    </span>
                  </li>
                </ul>

                <p class="mt-4 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                  {{ c.structureBody2 }}
                </p>
                <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                  {{ c.structureBody3 }}
                </p>
                <p class="mt-4 border-t border-[var(--yunda-bark)]/70 pt-4 text-3.5 text-[var(--yunda-bark)]/78 leading-relaxed" style="font-family: var(--font-text)">
                  {{ c.structureLinkPrefix }}
                  <NuxtLink :to="localePath('/become-a-surrogate')" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                    {{ c.structureLink1 }}
                  </NuxtLink>
                  <span class="mx-1">{{ c.structureLinkMiddle }}</span>
                  <NuxtLink :to="localePath('/surrogacy-cost')" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                    {{ c.structureLink2 }}
                  </NuxtLink>
                  <span>{{ c.structureLinkSuffix }}</span>
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full bg-[var(--yunda-petal)] pb-20 lg:pb-24">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[18px] bg-white/92 px-6 py-8 shadow-[0_16px_34px_rgba(39,31,24,0.06)] lg:px-10 lg:py-10">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
              {{ c.packageTitle }}
            </h2>

            <article class="mt-7 overflow-hidden border border-[var(--yunda-bark)]/75 rounded-[16px] bg-[var(--yunda-petal)] shadow-[0_14px_28px_rgba(39,31,24,0.06)]">
              <div class="grid lg:grid-cols-[1.22fr_0.78fr]">
                <div>
                  <div class="border-b border-[var(--yunda-bark)]/70 bg-[var(--yunda-petal)] px-5 py-4 lg:px-6">
                    <h3 class="text-5 text-[var(--yunda-bark)] font-semibold leading-tight lg:text-6">
                      {{ c.packageCardTitle }}
                    </h3>
                    <div class="mt-3 h-3.5 w-56 rounded-full bg-[var(--primary-brown)]/88" />
                  </div>

                  <div class="px-5 py-5 lg:px-6 lg:py-6">
                    <h3 class="text-4.8 text-[var(--yunda-bark)] font-semibold font-bold leading-tight lg:text-[24px]" style="font-family: var(--font-text)">
                      {{ c.packageH3Core }}
                    </h3>
                    <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                      {{ c.packageCoreBody1 }}
                    </p>
                    <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                      {{ c.packageCoreBody2 }}
                    </p>

                    <ul class="grid mt-4 gap-2">
                      <li
                        v-for="(item, index) in c.packageCoreBullets"
                        :key="`package-core-${index}`"
                        class="flex items-start gap-2 border border-[var(--yunda-bark)]/45 rounded-[10px] bg-white/80 px-3.5 py-2.5"
                     ">
                        <Icon name="radix-icons:check-circled" class="mt-0.5 h-4 w-4 text-[var(--olive-green)]" />
                        <span class="text-3.5 text-[var(--yunda-bark)]/86 leading-relaxed" style="font-family: var(--font-text)">
                          {{ item }}
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="border-t border-[var(--yunda-bark)]/55 bg-[var(--yunda-petal)]/85 p-4 lg:border-l lg:border-t-0 lg:p-5">
                  <img
                    src="/images/gc/gc-pic/Surrogate-Compensation.png"
                    :alt="c.packageTitle"
                    class="h-full max-h-[310px] w-full object-contain"
                    loading="lazy"
                    decoding="async"
                 ">
                </div>
              </div>
            </article>

            <div class="grid mt-4 gap-3 lg:grid-cols-3">
              <article
                v-for="(item, index) in c.packageAmountRows"
                :key="`package-amount-${index}`"
                class="border border-[var(--primary-brown)]/20 rounded-[12px] bg-[var(--yunda-petal)]/78 px-4 py-3"
             ">
                <p class="text-3 text-[var(--yunda-bark)]/75 font-medium" style="font-family: var(--font-text)">
                  {{ item.label }}
                </p>
                <p class="mt-1 text-5 text-[var(--primary-brown)] font-semibold leading-none lg:text-6">
                  {{ item.amount }}
                </p>
              </article>
            </div>

            <article class="mt-8 border border-[var(--primary-brown)]/16 rounded-[16px] bg-white/86 p-5 shadow-[0_10px_24px_rgba(39,31,24,0.05)] lg:p-6">
              <h3 class="text-4.8 text-[var(--yunda-bark)] font-semibold font-bold leading-tight lg:text-[24px]" style="font-family: var(--font-text)">
                {{ c.packageH3Benefits }}
              </h3>
              <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                {{ c.packageBenefitsIntro1 }}
              </p>
              <p class="mt-2 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                {{ c.packageBenefitsIntro2 }}
              </p>

              <div class="grid mt-5 gap-3 lg:grid-cols-2">
                <article
                  v-for="(item, index) in c.packageBenefitsItems"
                  :key="`benefit-item-${index}`"
                  class="border border-[var(--yunda-bark)]/45 rounded-[12px] bg-[var(--yunda-petal)]/75 px-4 py-4"
               ">
                  <div class="grid items-center gap-3 sm:grid-cols-[1fr_auto]">
                    <div>
                      <h4 class="text-4 text-[var(--yunda-bark)] font-semibold font-bold leading-snug lg:text-[20px]" style="font-family: var(--font-text)">
                        {{ item.title }}
                      </h4>
                      <p class="mt-2 text-3.25 text-[var(--yunda-bark)]/78 leading-relaxed" style="font-family: var(--font-text)">
                        {{ item.timing }}
                      </p>
                    </div>
                    <div class="justify-self-start sm:justify-self-end">
                      <span class="inline-flex items-center justify-center rounded-full bg-[var(--primary-brown)] px-5 py-2 text-3 text-[var(--yunda-petal)] font-semibold leading-none lg:min-w-[180px]" style="font-family: var(--font-text)">
                        {{ item.amount }}
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b pb-22 lg:pb-26">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[18px] bg-white/92 px-6 py-8 shadow-[0_16px_34px_rgba(39,31,24,0.06)] lg:px-10 lg:py-10">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
              {{ c.timelineTitle }}
            </h2>

            <div class="grid mt-6 gap-5 lg:grid-cols-[1.05fr_0.95fr]">
              <article class="border border-[var(--primary-brown)]/18 rounded-[14px] bg-[var(--yunda-petal)]/78 px-5 py-5">
                <h3 class="text-4.8 text-[var(--yunda-bark)] font-semibold font-bold leading-tight lg:text-[24px]" style="font-family: var(--font-text)">
                  {{ c.timelineH3Start }}
                </h3>
                <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                  {{ c.timelineStartBody1 }}
                </p>
                <div class="mt-4 inline-flex items-center rounded-full bg-[var(--primary-brown)]/12 px-3.5 py-1.5 text-3 text-[var(--primary-brown)] font-semibold" style="font-family: var(--font-text)">
                  {{ c.timelineFlowLabel }}
                </div>
              </article>

              <article class="border border-[var(--yunda-bark)]/70 rounded-[14px] bg-[var(--yunda-petal)]/48 px-5 py-5">
                <div class="h-full w-full flex items-center justify-center">
                  <img
                    src="/images/gc/gc-pic/payment-timeline-flow.svg"
                    :alt="c.timelineFlowImgAlt"
                    class="max-h-[260px] w-full object-contain"
                    loading="lazy"
                    decoding="async"
                 ">
                </div>
              </article>
            </div>

            <div class="grid mt-7 gap-3">
              <article
                v-for="(item, index) in c.timelineItems"
                :key="`timeline-item-${index}`"
                class="border border-[var(--yunda-bark)]/45 rounded-[12px] bg-[var(--yunda-petal)]/78 px-4 py-4 shadow-[0_8px_18px_rgba(39,31,24,0.04)]"
             ">
                <div class="grid items-start gap-3 lg:grid-cols-[auto_1fr]">
                  <div class="h-8 w-8 inline-flex items-center justify-center rounded-full bg-[var(--yunda-bark)] text-3 text-[var(--yunda-petal)] font-semibold">
                    {{ index + 1 }}
                  </div>
                  <div>
                    <div class="grid gap-3 lg:grid-cols-[minmax(260px,0.42fr)_1fr] lg:items-center">
                      <div>
                        <h4 class="text-4 text-[var(--yunda-bark)] font-semibold font-bold leading-snug lg:text-[20px]" style="font-family: var(--font-text)">
                          {{ item.stage }}
                        </h4>
                        <p class="mt-2 text-3.2 text-[var(--yunda-bark)]/76 leading-relaxed lg:text-3.5" style="font-family: var(--font-text)">
                          {{ item.note }}
                        </p>
                      </div>
                      <div
                        class="grid justify-items-center gap-1 border border-[var(--yunda-bark)]/35 rounded-[10px] bg-white/70 px-4 py-3 text-center"
                        :class="hasCurrencyValue(item.payment) ? 'min-h-[96px] lg:min-h-[108px]' : 'min-h-[108px] lg:min-h-[120px]'"
                     ">
                        <p
                          v-for="(line, lineIndex) in splitPaymentLines(item.payment)"
                          :key="`timeline-payment-${index}-${lineIndex}`"
                          class="w-full text-[var(--primary-brown)] font-semibold leading-snug"
                          :class="hasCurrencyValue(item.payment) ? 'text-4.2 lg:text-5.2' : 'text-3.8 lg:text-4.6'"
                          
                          v-html="highlightAmounts(line)"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full bg-[var(--yunda-petal)] pb-24 lg:pb-28">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[18px] bg-white/94 px-4 py-6 shadow-[0_16px_34px_rgba(39,31,24,0.06)] lg:px-8 lg:py-8 sm:px-6">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
              {{ c.statePayTitle }}
            </h2>

            <div class="mt-6 overflow-x-auto border border-[var(--yunda-bark)]/55 rounded-[12px]">
              <table class="min-w-[980px] w-full border-collapse bg-[var(--yunda-petal)]/72">
                <thead>
                  <tr class="bg-[var(--yunda-petal)]/55">
                    <th class="border border-[var(--yunda-bark)]/45 px-3 py-3 text-left text-4.2 text-[var(--yunda-bark)] font-semibold lg:text-5">
                      {{ c.statePayHeaders[0] }}
                    </th>
                    <th class="border border-[var(--yunda-bark)]/45 px-3 py-3 text-left text-4.2 text-[var(--yunda-bark)] font-semibold lg:text-5">
                      {{ c.statePayHeaders[1] }}
                    </th>
                    <th class="border border-[var(--yunda-bark)]/45 px-3 py-3 text-left text-4.2 text-[var(--yunda-bark)] font-semibold lg:text-5">
                      {{ c.statePayHeaders[2] }}
                    </th>
                    <th class="border border-[var(--yunda-bark)]/45 px-3 py-3 text-left text-4.2 text-[var(--yunda-bark)] font-semibold lg:text-5">
                      {{ c.statePayHeaders[3] }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, index) in c.statePayRows"
                    :key="`state-pay-row-${index}`"
                    class="align-top"
                 ">
                    <td class="border border-[var(--yunda-bark)]/45 px-3 py-3 text-4.2 text-[var(--yunda-bark)] font-semibold leading-relaxed lg:text-4.8">
                      {{ row.state }}
                    </td>
                    <td class="border border-[var(--yunda-bark)]/45 px-3 py-3 text-3.8 text-[var(--yunda-bark)]/88 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                      {{ row.level }}
                    </td>
                    <td class="border border-[var(--yunda-bark)]/45 px-3 py-3 text-3.8 text-[var(--yunda-bark)]/86 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                      {{ row.why }}
                    </td>
                    <td class="border border-[var(--yunda-bark)]/45 px-3 py-3 text-3.8 text-[var(--yunda-bark)]/90 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                      {{ row.attention }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b pb-24 lg:pb-30">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[18px] bg-white/94 px-6 py-8 shadow-[0_16px_34px_rgba(39,31,24,0.06)] lg:px-10 lg:py-10">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
              {{ c.faqTitle }}
            </h2>

            <div class="grid mt-6 gap-3 lg:grid-cols-2">
              <article
                v-for="(item, index) in c.faqItems"
                :key="`faq-item-${index}`"
                class="border border-[var(--yunda-bark)]/45 rounded-[12px] bg-[var(--yunda-petal)]/78 px-4 py-4 shadow-[0_8px_18px_rgba(39,31,24,0.04)]"
             ">
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 h-7 w-7 inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--yunda-bark)] text-3 text-[var(--yunda-petal)] font-semibold">
                    {{ index + 1 }}
                  </span>
                  <div>
                    <h3 class="text-4 text-[var(--yunda-bark)] font-semibold font-bold leading-snug lg:text-[20px]" style="font-family: var(--font-text)">
                      {{ item.q }}
                    </h3>
                    <p class="mt-2 text-3.3 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-3.8" style="font-family: var(--font-text)">
                      {{ item.a }}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.timeline-amount {
  color: var(--yunda-bark);
  font-weight: 700;
  font-size: 1.08em;
}
</style>

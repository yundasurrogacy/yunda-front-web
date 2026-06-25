<script setup lang="ts">
import { useHead } from '#imports'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import RelatedGuides from '@/components/base/RelatedGuides.vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { buildCoreServicePageSchemas } from '~/utils/schema'

/**
 * 改版说明：`修改/2026-06-18-2/cost页面改版/cost 页面改版.docx`
 * 静态素材：`public/images/ip/cost/redesign/`
 */
const PAGE_ASSETS = {
  hero: '/images/ip/cost/redesign/hero.jpg',
  drivers: [
    '/images/ip/cost/redesign/driver-01.png',
    '/images/ip/cost/redesign/driver-02.png',
    '/images/ip/cost/redesign/driver-03.png',
    '/images/ip/cost/redesign/driver-04.png',
  ],
  breakdown: [
    '/images/ip/cost/redesign/breakdown-01.png',
    '/images/ip/cost/redesign/breakdown-02.png',
    '/images/ip/cost/redesign/breakdown-03.png',
    '/images/ip/cost/redesign/breakdown-04.png',
    '/images/ip/cost/redesign/breakdown-05.png',
  ],
  trustShield: '/images/ip/cost/redesign/trust-shield.png',
  trustCheck: '/images/ip/cost/redesign/trust-check.png',
  notIncluded: [
    '/images/ip/cost/redesign/not-included-01.png',
    '/images/ip/cost/redesign/not-included-02.png',
    '/images/ip/cost/redesign/not-included-03.png',
    '/images/ip/cost/redesign/not-included-04.png',
  ],
} as const

interface FixedCost {
  title: string
  amount: string
  description: string
  subItems?: string[]
}

interface VariableCost {
  id: string
  title: string
  amount: string
  description: string
  bullets?: string[]
  note?: string
  caseDependent?: boolean
}

interface PaymentLineItem {
  text: string
  subItems?: string[]
}

interface PaymentStep {
  id: string
  label: string
  title: string
  amount: string
  items: PaymentLineItem[]
  note?: string
}

useScrollAnimation()

const { locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const translations = {
  en: {
    metaTitle: 'Surrogacy Cost in California & the U.S. | Yunda',
    metaDesc:
      'Surrogacy costs can vary widely, especially in California, depending on insurance, legal steps, medical factors, and surrogate compensation.',
    breadcrumb: ['For Intended Parents', 'Surrogacy Cost'],
    hero: {
      title: 'Surrogacy Cost in California: How Much Does Surrogacy Cost in the U.S.?',
      lead:
        'Transparent, all-in surrogacy pricing in California and across the U.S. so you can plan with confidence and clarity.',
      primary: 'Get a Personalized Cost Estimate',
      secondary: 'Become a Parent',
      totalLabel: 'Estimated Program Total',
      totalAmount: '$142,750',
      disclaimer: 'IVF clinic fees and newborn medical care are typically separate.',
    },
    anchors: [
      { id: 'top', label: 'Cost Overview' },
      { id: 'ca-vs-us', label: 'What Changes the Cost' },
      { id: 'cost-breakdown', label: 'Cost Breakdown' },
      { id: 'payments', label: 'Payment Timeline' },
      { id: 'whats-not-included', label: 'What\'s Not Included' },
      { id: 'faq', label: 'FAQ' },
    ],
    ca: {
      title: 'Surrogacy Cost in California vs. the U.S.: What Changes the Cost?',
      drivers: [
        {
          id: 'legal',
          title: 'Legal & Court Process',
          content:
            'California is generally a well-established state for surrogacy, and the legal path is often straightforward—but your surrogacy cost in California can still shift depending on your specific situation. That’s why when we explain surrogacy fees, we separate legal work from court parentage steps.',
        },
        {
          id: 'compensation',
          title: 'Surrogate Compensation',
          content:
            'A big part of surrogacy cost breakdown is surrogate compensation. In California (and some nearby markets), compensation expectations and cost-of-living can be higher than many other states—so the total cost of surrogacy may trend higher there.',
        },
        {
          id: 'insurance',
          title: 'Insurance',
          content:
            'When intended parents ask me how much does surrogacy costs in the U.S., insurance is usually the biggest wildcard. Even in California, coverage can vary a lot depending on the surrogate’s plan, exclusions, deductibles, and out-of-pocket maximums.',
        },
        {
          id: 'medical',
          title: 'Medical Variables',
          content:
            'No matter where you’re doing surrogacy, certain medical outcomes can change the cost. Twins, a C-section, or special medical needs can add to surrogacy expenses.',
        },
      ],
    },
    breakdown: {
      title: 'Surrogacy Cost Breakdown: Surrogacy Fees Explained (California & U.S.)',
      totalLabel: 'Estimated Program Total',
      totalAmount: '$142,750',
      cards: [
        {
          title: 'Agency Service Fee',
          amount: '$50,000',
          description:
            'Covers recruitment, screening, matching, case management, coordination, communication, and support throughout the surrogacy journey.',
        },
        {
          title: 'Trust Account Management',
          amount: '$2,000',
          description:
            'Covers the administration and tracking of trust funds, helping payments and reimbursements stay organized and transparent.',
        },
        {
          title: 'Insurance Review & Coverage Setup',
          amount: '$12,600',
          description:
            'Includes insurance review, coverage planning, life insurance allocation, and estimated health insurance premium support.',
        },
        {
          title: 'Legal Fees',
          amount: '$10,750',
          description:
            'Covers legal agreement drafting and review, attorney support, and parentage-related legal steps such as California PBO planning.',
        },
        {
          title: 'Surrogate Compensation',
          amount: '$61,000+',
          description:
            'Covers base surrogate compensation and related support. Final compensation may vary depending on match details and case circumstances.',
        },
      ],
      fixedTitle: 'Fixed Costs',
      fixedIntro: 'These are the main costs included in the estimated program total:',
      fixedList: [
        'Agency service fee',
        'Trust account management',
        'Insurance review and coverage setup',
        'Legal fees',
        'Surrogate compensation',
      ],
      variableTitle: 'Case-Dependent Costs',
      variableIntro: 'These costs vary depending on your unique journey and are usually paid as incurred:',
      variableList: [
        'Medical screening travel',
        'Embryo transfer travel',
        'Surrogate life insurance',
        'Surrogate medical insurance premiums',
        'Twins or multiples',
        'C-section compensation',
        'Mock cycle or cycle cancellation',
        'Breast milk support',
        'Miscarriage-related compensation',
      ],
      donutTitle: 'Where Costs Usually Go',
      donutLegend: [
        'Agency service fee: 39%',
        'Surrogate compensation: 47%',
        'Legal fees: 8%',
        'Administrative support: 4%',
        'Trust management: 2%',
      ],
      fixed: [
        {
          title: '1) Surrogacy Agency Service fee',
          amount: '$50,000',
          description:
            'This is the core surrogacy agency fee for recruitment, screening, matching, and full journey coordination/case management.',
          subItems: [
            'Within this program structure, required screening line-items are listed separately: psychological evaluation $2,500 and surrogate background investigation $900.',
          ],
        },
        {
          title: '2) Trust Account Management',
          amount: '$2,000',
          description:
            'This is the trust/escrow account management fee (how funds are administered and tracked).',
          subItems: [
            'Separate from this, the plan also notes a trust “reserve deposit” used for certain reimbursable costs; see the “Included vs. Not Included” section below.',
          ],
        },
        {
          title: '3) Insurance Review & Coverage Setup',
          amount: '$12,600',
          description: 'To keep insurance-related costs clear and easy to track, I break them into three lines:',
          subItems: [
            'Health insurance professional review & management: $2,000',
            'Surrogate life insurance (reimbursable): $600',
            'Surrogate health insurance premium (reimbursable): $10,000',
          ],
        },
        {
          title: '4) Legal Fees (Surrogacy Agreement)',
          amount: '$10,750',
          description: 'To make legal costs easy to compare, I break them into two counsel lines:',
          subItems: [
            'Escrow (Trust) Account Management: $2,000',
            'Surrogacy Agreement Drafting & Review: $3,750',
            'Surrogate’s Attorney Contract Review: $1,500',
            'California Parentage / PBO: $3,500',
          ],
        },
        {
          title: '5) Surrogate Compensation',
          amount: '$61,000+',
          description:
            'This is one of the biggest drivers of surrogacy costs in California and across the U.S., and it can vary by match and circumstances.',
        },
      ],
      variable: [
        {
          id: 'screening-travel',
          title: '6) Necessary Travel Expenses During the Medical Screening Stage',
          amount: '',
          description:
            'This is reimbursable, pay-as-incurred. Only required travel is covered, paid from trust with valid receipts.',
          caseDependent: true,
        },
        {
          id: 'transfer-travel',
          title: '7) Necessary Travel Expenses Related to the Embryo Transfer Cycle',
          amount: '',
          description:
            'This is reimbursable, pay-as-incurred. Only necessary transfer-cycle travel is covered, reimbursed with documentation.',
          caseDependent: true,
        },
        {
          id: 'life-insurance',
          title: '8) Surrogate Life Insurance',
          amount: '',
          description:
            'This is reimbursable, pay-as-incurred. Premiums are paid from trust based on actual invoices; $0 if not incurred.',
          caseDependent: true,
        },
        {
          id: 'medical-premiums',
          title: '9) Surrogate Medical Insurance Premiums',
          amount: '',
          description:
            'This is reimbursable, pay-as-incurred. Premiums only (not medical bills), paid from trust per billing; reconciled to actuals.',
          caseDependent: true,
        },
      ],
      additional: [
        'Multiples (twins): $10,000',
        'C-section compensation: $5,000',
        'Mock cycle: $500; Cycle cancellation: $500',
        'Breast milk: $300/week',
        'Miscarriage: before 12 weeks $1,000 (or $2,000 with D&C); after 12 weeks / stillbirth $2,000',
      ],
      included: [
        'This is an estimate—you are responsible for actual costs incurred during the journey.',
        'Any unused funds are reconciled and returned after final accounting.',
      ],
      notIncluded: [
        'IVF clinic fees are not included.',
        'Newborn medical care after birth is not included.',
      ],
    },
    payments: {
      title: 'Surrogacy Payments Timeline: When You Pay Each Cost (California & U.S.)',
      intro:
        'If you are asking how much do you pay for surrogacy, the timing matters just as much as the total. Here’s the clear timeline.',
      trustButton: 'How the trust account works',
      trustTitle: 'How Trust Payments Protect You',
      trustPoints: [
        {
          title: 'Funds Stay in a Trust Account',
          text: 'Funds are held securely and released according to the approved surrogacy plan.',
        },
        {
          title: 'Reimbursable Items Are Paid as Incurred',
          text: 'Case-dependent expenses are documented and reimbursed according to program guidelines.',
        },
        {
          title: 'Unused Funds Are Reconciled and Returned',
          text: 'After final accounting, any remaining unused funds are reconciled and returned to you.',
        },
      ],
      labels: {
        milestone: 'Milestone',
        deposit: 'Deposit amount',
        covers: 'What it covers',
        notes: 'Notes',
      },
      steps: [
        {
          id: 'payment-1',
          label: 'Payment #1',
          title: 'Payment #1 — $42,400 (After Medical Records Pre-Review Approval)',
          amount: '$42,400',
          items: [
            { text: 'Project management & service support (Part 1 of 2)' },
            { text: 'Psychological evaluation' },
            { text: 'Surrogate background investigation' },
            { text: 'Trust account management service' },
            { text: 'Medical insurance professional review & management' },
          ],
          note: 'This is the “foundation” payment that gets the case moving in an organized way.',
        },
        {
          id: 'payment-2',
          label: 'Payment #2',
          title: 'Payment #2 — $66,850 (After Legal Documents Are Effective / Surrogacy Agreement Notarized)',
          amount: '$66,850',
          items: [
            { text: 'Project management & service support (Part 2 of 2)' },
            {
              text: 'Legal fees (surrogacy agreement)',
              subItems: ['Intended Parents’ attorney', 'Surrogate’s attorney'],
            },
            { text: 'Base surrogate compensation (deposit, Part 1 of 2)' },
            { text: 'Surrogate benefits/support plan (estimated)' },
            { text: 'Surrogate life insurance premium (pay-as-incurred)' },
            { text: 'Surrogate medical insurance premium allocation (pay-as-incurred)' },
          ],
          note:
            'This stage typically makes the budget feel more “real” because the legal and compensation structure is fully in place.',
        },
        {
          id: 'payment-3',
          label: 'Payment #3',
          title: 'Payment #3 — $33,500 (After Heartbeat Confirmation)',
          amount: '$33,500',
          items: [
            { text: 'Pregnancy-stage cycle management (coordination)' },
            { text: 'California parentage / PBO' },
            { text: 'Base surrogate compensation (deposit, Part 2 of 2)' },
            { text: 'Surrogate medical insurance premium allocation (pay-as-incurred)' },
          ],
          note:
            'Base compensation is often paid out in equal monthly installments per the legal agreement (commonly across 10 months).',
        },
      ],
    },
    whatsNotIncluded: {
      title: 'Important Notes — What’s Not Included',
      intro:
        'Some costs are separate from the surrogacy program estimate. Understanding these items upfront helps you compare quotes more accurately and plan your full budget with confidence.',
      items: [
        {
          title: 'IVF Clinic Fees',
          text: 'IVF clinic fees are not included. This may include IVF procedures, embryo creation, medications, monitoring, transfer-related clinic services, and other fertility clinic charges.',
        },
        {
          title: 'Newborn Medical Care',
          text: 'Newborn medical care is not included. Delivery hospital fees, pediatric care, NICU care, vaccinations, and newborn-related medical costs are typically separate.',
        },
        {
          title: 'Insurance Timing',
          text: 'Insurance availability, premium costs, and coverage details may change during the journey. Timing and plan availability can affect the final budget.',
        },
        {
          title: 'Reserve Deposit',
          text: 'Some cases may require an additional reserve deposit for reimbursable or unpredictable expenses. Any unused funds are reconciled after final accounting.',
        },
      ],
    },
    why: {
      title: 'Why Is Surrogacy Expensive?',
      intro:
        'If you’ve found yourself asking “why is surrogacy expensive?”, you’re not being picky—you’re being responsible. Surrogacy is a coordinated medical-legal journey with real protections, real risks, and real human effort involved. Here’s the simplest, most honest explanation.',
      reasons: [
        {
          id: 'reason-1',
          title: 'You’re paying for a full, managed journey—not one transaction',
          description:
            'A big part of surrogacy costs is the work required to coordinate screening, timelines, communication, and problem-solving across multiple parties—so the process stays clear and controlled.',
          bullets: [
            'Program management & service support: $50,000 (often structured as $35,000 + $15,000)',
            'Pregnancy-stage coordination: $5,000',
          ],
        },
        {
          id: 'reason-2',
          title: 'Surrogate compensation reflects the reality of pregnancy',
          description:
            'Compensation is usually one of the biggest components because it reflects the surrogate’s time, commitment, and the physical demands of pregnancy.',
          bullets: [
            'Base surrogate compensation: $50,000 (commonly deposited as $30,000 + $20,000)',
            'Benefits/support plan (estimated total): $11,000 (e.g., signing bonus, monthly allowance, maternity clothing, health support, housekeeping support, and certain transfer-cycle stipends)',
          ],
        },
        {
          id: 'reason-3',
          title: 'Legal protection isn’t optional—especially for parentage',
          description:
            'Legal steps protect everyone involved and help secure parentage correctly, including California’s parentage process.',
          bullets: ['Legal agreement: $5,250 (IP attorney $3,750 + surrogate attorney $1,500)', 'Court parentage / PBO: $3,500'],
        },
        {
          id: 'reason-4',
          title: 'Insurance and risk planning are major cost drivers',
          description:
            'Insurance is often a key variable because timing and plan availability differ, and some items are paid as incurred—so escrow budgeting helps keep it predictable.',
          bullets: [
            'Medical insurance premium budgeting: $10,000 (often split $5,000 + $5,000)',
            'Life insurance premium budgeting: $600',
            'Insurance review & management: $2,000',
          ],
        },
        {
          id: 'reason-5',
          title: 'Real-life outcomes can add cost (and they shouldn’t be hidden)',
          description:
            'Some journeys include medical outcomes that change costs. Listing these up front keeps your cost breakdown honest.',
          bullets: [
            'Twins: $10,000',
            'C-section: $5,000',
            'Medically-required support may include documented lost-wage reimbursement, childcare (e.g., $100/child/day), and approved spouse/companion support (e.g., $500/week).',
          ],
        },
      ],
    },
    faq: {
      title: 'Surrogacy Cost FAQ (California, U.S., Insurance, IVF, Payments)',
      intro: 'Use the search to find the exact question you are looking for, then expand any answer for the full explanation.',
      placeholder: 'Search FAQs (California, insurance, IVF, payments)',
      matchWord: 'matches',
    },
    footer: {
      title: 'Ready to estimate your California surrogacy cost?',
      body: 'Start with a clear breakdown, then get a personalized estimate based on your goals and timeline.',
      primary: 'Get a Personalized Surrogacy Cost Estimate',
      secondary: 'Become a Parent',
    },
  },
  zh: {
    metaTitle: '加州代孕费用：美国代孕要花多少钱？',
    metaDesc: '代孕费用会因保险、法律流程、医疗因素和代孕者补偿而变化，尤其在加州。',
    breadcrumb: ['准父母指南', '代孕费用'],
    hero: {
      title: '加州代孕费用：美国代孕要花多少钱？',
      lead: '透明、全面的加州及全美代孕定价，让你更有信心、更清晰地规划预算。',
      primary: '获取个性化费用估算',
      secondary: '成为父母',
      totalLabel: '项目预估总额',
      totalAmount: '$142,750',
      disclaimer: 'IVF 诊所费用和新生儿医疗通常单独计算。',
    },
    anchors: [
      { id: 'top', label: '费用总览' },
      { id: 'ca-vs-us', label: '费用影响因素' },
      { id: 'cost-breakdown', label: '费用拆分' },
      { id: 'payments', label: '付款时间线' },
      { id: 'whats-not-included', label: '不包含项目' },
      { id: 'faq', label: '常见问题' },
    ],
    ca: {
      title: '加州 vs 美国：哪些因素影响代孕费用？',
      drivers: [
        {
          id: 'legal',
          title: '法律与法院流程',
          content:
            '加州代孕法律路径成熟，但费用仍会因你的具体情况而变化。因此我们拆分法律工作与法院亲子关系步骤，让费用构成更清晰。',
        },
        {
          id: 'compensation',
          title: '代孕补偿',
          content:
            '补偿是费用大头。加州及周边的补偿期望与生活成本更高，总成本可能高于其他州。',
        },
        {
          id: 'insurance',
          title: '保险',
          content:
            '保险通常是最大不确定性。即使在加州，覆盖范围、排除条款、免赔额和自付上限也会因代孕者计划而异。',
        },
        {
          id: 'medical',
          title: '医疗变量',
          content:
            '无论在何处进行代孕，双胎、剖宫产或特殊医疗需求都可能增加费用。',
        },
      ],
    },
    breakdown: {
      title: '代孕费用拆分：费用说明（加州 & 美国）',
      totalLabel: '项目预估总额',
      totalAmount: '$142,750',
      cards: [
        {
          title: '机构服务费',
          amount: '$50,000',
          description: '涵盖招募、筛选、匹配、个案管理、协调、沟通及全程支持。',
        },
        {
          title: '信托账户管理',
          amount: '$2,000',
          description: '涵盖信托资金的管理与追踪，让付款与报销更有序、更透明。',
        },
        {
          title: '保险审查与保障设置',
          amount: '$12,600',
          description: '包含保险审查、保障规划、人寿保险配置及健康保险保费预估支持。',
        },
        {
          title: '法律费用',
          amount: '$10,750',
          description: '涵盖法律协议起草与审核、律师支持及加州亲子关系等法律步骤。',
        },
        {
          title: '代孕补偿',
          amount: '$61,000+',
          description: '涵盖基础代孕补偿及相关支持，最终金额因匹配与个案情况而异。',
        },
      ],
      fixedTitle: '固定费用',
      fixedIntro: '以下为项目预估总额中的主要费用：',
      fixedList: [
        '机构服务费',
        '信托账户管理',
        '保险审查与保障设置',
        '法律费用',
        '代孕补偿',
      ],
      variableTitle: '案例依赖费用',
      variableIntro: '以下费用因旅程不同而变化，通常按实际发生支付：',
      variableList: [
        '医疗筛查差旅',
        '胚胎移植差旅',
        '代孕人寿保险',
        '代孕医疗保险保费',
        '双胎或多胎',
        '剖宫产补偿',
        '模拟周期或周期取消',
        '母乳支持',
        '流产相关补偿',
      ],
      donutTitle: '费用通常的分布',
      donutLegend: ['机构服务费：39%', '代孕补偿：47%', '法律费用：8%', '行政支持：4%', '信托管理：2%'],
      fixed: [
        {
          title: '1）代孕机构服务费',
          amount: '$50,000',
          description: '招募、筛选、匹配、全程协调管理。',
          subItems: [
            '在该项目结构中，必要的筛查项单独列示：心理评估 $2,500；代孕者背景调查 $900。',
          ],
        },
        {
          title: '2）信托账户管理',
          amount: '$2,000',
          description: '信托/托管账户管理费（资金如何管理与追踪）。',
          subItems: [
            '另有“信托预留存款”用于部分可报销费用，详见下方“包含/不包含”。',
          ],
        },
        {
          title: '3）保险审查与保险范围设置',
          amount: '$12,600美元',
          description: '为了让保险相关成本清晰且易于追踪，我将其分为三项：',
          subItems: [
            '健康保险专业审核与管理：2000美元',
            '替代人寿保险（可报销）：600美元0',
            '替代健康保险费（可报销）：10,000美元',
          ],
        },
        {
          title: '4）法律费用（代孕协议）',
          amount: '$10,750',
          description: '为便于比较，拆分如下：',
          subItems: [
            '托管（信托）账户管理：2000美元',
            '代孕协议起草与审核：3750美元',
            '代孕律师合同审查：1500美元',
            '加利福尼亚亲子关系/亲子关系令：3500美元',
          ],
        },
        {
          title: '5）代孕补偿',
          amount: '$61,000+',
          description: '代孕费用的重要驱动之一，会随匹配情况而变化。',
        },
      ],
      variable: [
        {
          id: 'screening-travel',
          title: '6）医疗筛查阶段必要差旅费用',
          amount: '',
          description: '可报销，按发生支付。仅覆盖必要差旅，凭有效票据由信托支付。',
          caseDependent: true,
        },
        {
          id: 'transfer-travel',
          title: '7）胚胎移植周期相关必要差旅费用',
          amount: '',
          description: '可报销，按发生支付。仅覆盖必要差旅，凭文件报销。',
          caseDependent: true,
        },
        {
          id: 'life-insurance',
          title: '8）代孕人寿保险',
          amount: '',
          description: '可报销，按发生支付。保费按实际账单由信托支付；未发生则为 $0。',
          caseDependent: true,
        },
        {
          id: 'medical-premiums',
          title: '9）代孕医疗保险保费',
          amount: '',
          description: '可报销，按发生支付。仅保费（非医疗账单），按账单支付并与实际结算。',
          caseDependent: true,
        },
      ],
      additional: [
        '多胎（双胎）：$10,000',
        '剖宫产补偿：$5,000',
        '模拟周期：$500；周期取消：$500',
        '母乳：$300/周',
        '流产：12 周前 $1,000（含 D&C 则 $2,000）；12 周后/死胎 $2,000',
      ],
      included: [
        '这是估算，实际费用按发生承担。',
        '未使用资金在最终结算后退回。',
      ],
      notIncluded: [
        '不含 IVF 诊所费用。',
        '不含新生儿出生后的医疗费用。',
      ],
    },
    payments: {
      title: '代孕付款时间线：每笔费用何时支付（加州 & 美国）',
      intro: '时间与总额同样重要：何时付、付多少、包含什么。',
      trustButton: '信托如何运作',
      trustTitle: '信托付款如何保护你',
      trustPoints: [
        {
          title: '资金存放在信托账户',
          text: '资金安全托管，并按获批的代孕计划释放。',
        },
        {
          title: '可报销项目按发生支付',
          text: '案例依赖费用凭文件报销，并遵循项目指引。',
        },
        {
          title: '未用资金结算后退回',
          text: '最终结算后，剩余未用资金将核对并退回给你。',
        },
      ],
      labels: {
        milestone: '里程碑',
        deposit: '存款金额',
        covers: '包含内容',
        notes: '备注',
      },
      steps: [
        {
          id: 'payment-1',
          label: '付款 #1',
          title: '付款 #1 — $42,400（医疗记录预审通过后）',
          amount: '$42,400',
          items: [
            { text: '项目管理与服务支持（第 1/2 阶段）' },
            { text: '心理评估' },
            { text: '代孕者背景调查' },
            { text: '信托账户管理服务' },
            { text: '医疗保险专业审核与管理' },
          ],
          note: '这是“基础款”，让项目以有序方式启动并推进。',
        },
        {
          id: 'payment-2',
          label: '付款 #2',
          title: '付款 #2 — $66,850（法律文件生效/代孕协议公证后）',
          amount: '$66,850',
          items: [
            { text: '项目管理与服务支持（第 2/2 阶段）' },
            {
              text: '法律费用（代孕协议）',
              subItems: ['准父母律师', '代孕者律师'],
            },
            { text: '基础代孕补偿（存款，第 1/2 部分）' },
            { text: '代孕福利/支持计划（估算）' },
            { text: '代孕人寿保险保费（按发生支付）' },
            { text: '代孕医疗保险保费预留（按发生支付）' },
          ],
          note: '此阶段通常让预算更“真实”，因为法律与补偿结构已完整建立。',
        },
        {
          id: 'payment-3',
          label: '付款 #3',
          title: '付款 #3 — $33,500（心跳确认后）',
          amount: '$33,500',
          items: [
            { text: '孕期阶段周期管理（协调）' },
            { text: '加州亲子关系 / PBO' },
            { text: '基础代孕补偿（存款，第 2/2 部分）' },
            { text: '代孕医疗保险保费预留（按发生支付）' },
          ],
          note: '基础补偿通常按协议等额月付（常见为 10 个月）。',
        },
      ],
    },
    whatsNotIncluded: {
      title: '重要说明 — 不包含项目',
      intro:
        '部分费用不在代孕项目估算范围内。提前了解这些项目，有助于更准确比较报价并规划完整预算。',
      items: [
        {
          title: 'IVF 诊所费用',
          text: '不含 IVF 诊所费用，可能包括取卵、胚胎创建、用药、监测、移植相关诊所服务及其他生育诊所收费。',
        },
        {
          title: '新生儿医疗',
          text: '不含新生儿医疗费用。分娩医院费、儿科护理、NICU、疫苗及新生儿相关医疗通常单独计算。',
        },
        {
          title: '保险生效时间',
          text: '保险可购性、保费与保障细节可能在旅程中变化，生效时间与计划可用性会影响最终预算。',
        },
        {
          title: '预留存款',
          text: '部分案例可能需要额外预留存款用于可报销或不可预测费用，未用资金在最终结算后退回。',
        },
      ],
    },
    why: {
      title: '为什么代孕费用高？',
      intro:
        '如果你也在问“为什么代孕这么贵？”，这不是挑剔，而是负责任。代孕是一个医疗与法律协同的完整旅程，涉及真实保障、真实风险和大量真实的人力投入。下面是最直接、最诚实的解释。',
      reasons: [
        {
          id: 'reason-1',
          title: '你支付的是完整的全程管理，而不是一次性交易',
          description: '代孕费用的一大部分来自多方协同管理：筛查、时间线、沟通与问题处理，确保流程清晰、可控。',
          bullets: ['项目管理与服务支持：$50,000（常见结构为 $35,000 + $15,000）', '孕期阶段协调：$5,000'],
        },
        {
          id: 'reason-2',
          title: '代孕补偿反映怀孕的真实付出',
          description: '补偿通常是总费用中的最大组成之一，因为它对应代孕者的时间投入、承诺和身体负担。',
          bullets: [
            '基础代孕补偿：$50,000（常见分两笔存入：$30,000 + $20,000）',
            '福利/支持计划（预估总额）：$11,000（如签约奖励、月度津贴、孕装、健康支持、家务支持及部分移植周期补贴）',
          ],
        },
        {
          id: 'reason-3',
          title: '法律保护并非可选，尤其是亲子关系确立',
          description: '法律流程用于保护各方权益，并确保亲子关系依法成立（包括加州亲子关系流程）。',
          bullets: ['法律协议：$5,250（准父母律师 $3,750 + 代孕者律师 $1,500）', '法院亲子关系 / PBO：$3,500'],
        },
        {
          id: 'reason-4',
          title: '保险与风险规划是重要成本驱动',
          description: '保险通常是关键变量，因为生效时间和可用计划不同，且许多项目按实际发生支付；托管预算可提升可预期性。',
          bullets: ['医疗保险保费预算：$10,000（常见为 $5,000 + $5,000）', '人寿保险保费预算：$600', '保险审核与管理：$2,000'],
        },
        {
          id: 'reason-5',
          title: '真实医疗结果会带来额外费用（且不应被隐藏）',
          description: '有些旅程会出现会改变费用的医疗结果。提前列明这些项目，才能让费用拆分真正透明。',
          bullets: ['双胎：$10,000', '剖宫产：$5,000', '医学必要支持可能包括有凭证的误工补偿、儿童照护（如 $100/child/day）以及经批准的配偶/陪护支持（如 $500/week）'],
        },
      ],
    },
    faq: {
      title: '代孕费用常见问题（加州、美国、保险、IVF、付款）',
      intro: '用搜索快速定位，然后展开查看答案。',
      placeholder: '搜索 FAQ（加州/保险/IVF/付款）',
      matchWord: '条结果',
    },
    footer: {
      title: '准备好估算你的加州代孕费用了吗？',
      body: '先看清晰拆分，再获取个性化估算。',
      primary: '获取个性化代孕费用估算',
      secondary: '成为父母',
    },
  },
}

const t = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)

useHead(() => ({
  title: t.value.metaTitle,
  meta: [{ name: 'description', content: t.value.metaDesc }],
}))

const anchors = computed(() => t.value.anchors)
const activeAnchor = ref(anchors.value[0]?.id || 'top')

const driverCards = computed(() => t.value.ca.drivers)

const breakdownCards = computed(() => t.value.breakdown.cards)

const fixedCosts = computed<FixedCost[]>(() => t.value.breakdown.fixed)

const variableCosts = computed<VariableCost[]>(() => t.value.breakdown.variable)

const additionalCosts = computed(() => t.value.breakdown.additional)

const paymentSteps = computed<PaymentStep[]>(() => t.value.payments.steps)
const trustPoints = computed(() => t.value.payments.trustPoints)
const notIncludedItems = computed(() => t.value.whatsNotIncluded.items)
const reasons = computed(() => t.value.why.reasons)

const faqItems = computed(() =>
  locale.value === 'zh'
    ? [
        {
          question: '加州代孕要花多少钱？',
          answer:
            '加州代孕费用通常由机构协调、代孕补偿、法律、保险、托管、IVF 诊所和个案医疗因素共同决定。正确比较费用时，应先看每个报价包含哪些范围，再根据保险、胚胎状态、诊所路径和孕期情况调整预算。',
        },
        {
          question: '美国代孕要花多少钱？',
          answer:
            '美国代孕费用通常包含机构服务、代孕补偿、法律协调、保险规划、托管管理、津贴和个案相关项目。不同州的主要差异在法律流程、保险可用性、当地补偿预期、法院时间和诊所安排，因此不能只看一个总价。',
        },
        {
          question: '代孕费用包含什么？',
          answer:
            '代孕费用通常包含机构协调、代母招募与匹配、筛查支持、代孕补偿预算、津贴、法律协议协调、亲子关系步骤、保险审查和托管管理。具体是否包含 IVF、新生儿医疗或额外保险，必须看项目范围。',
        },
        {
          question: '代孕费用不包含什么？',
          answer:
            '很多代孕项目不包含 IVF 诊所费用和新生儿出生后的医疗费用。IVF 可能包括取卵、供卵、胚胎创建、PGT、冷冻、储存和移植；新生儿医疗可能包括 NICU、儿科护理和保险生效前后的账单。',
        },
        {
          question: '为什么代孕费用高？',
          answer:
            '代孕费用高，是因为它同时涉及医疗协调、代母补偿、法律保护、保险规划、托管管理和真实风险准备。双胎、剖宫产、卧床、保险排除或额外移植都可能影响总预算，因此透明范围比低价更重要。',
        },
        {
          question: '能用通俗的话解释代孕费用吗？',
          answer:
            '可以：机构费用于协调和管理，补偿支持代孕者孕程，法律费用保障各方并确立亲子关系，保险预算帮助避免意外自付。这就是最简单的费用说明。',
        },
        {
          question: '代孕付款怎么进行？什么时候付？',
          answer:
            '代孕付款通常按里程碑分阶段进入托管或信托账户，再根据协议支付给相关方。分期节点可能包括协议阶段、医学清关、法律文件生效、移植、验孕和心跳确认，具体金额以协议和个案预算为准。',
        },
        {
          question: 'IVF 是否包含？IVF + 代孕一共要多少钱？',
          answer:
            'IVF 诊所费用通常与代孕项目费用分开。更准确的预算方式是拆成两层：代孕项目费用加 IVF 诊所方案费用，包括胚胎创建、用药、PGT、储存、移植次数和可能的供卵路径。',
        },
        {
          question: '含 IVF 的代孕费用要多少？',
          answer:
            '主要取决于诊所路径（移植次数、用药方案、是否使用捐卵）。因此建议将代孕费用拆分与诊所账单分开比较，确保对齐范围。',
        },
        {
          question: '有保险的代孕费用是多少？',
          answer:
            '有保险并不代表没有代孕相关医疗费用。费用会因保险资格、排除条款、免赔额、自付上限、等待期和是否需要额外保单而变化。保险审查越早完成，越容易避免后期预算意外。',
        },
      ]
    : [
        {
          question: 'How much does surrogacy cost in California?',
          answer:
            'Surrogacy cost in California depends on agency coordination, surrogate compensation, legal work, insurance review, escrow, IVF clinic fees, and case-specific medical factors. Intended parents should compare estimates by scope first, then adjust for insurance, embryo status, clinic pathway, and pregnancy scenarios.',
        },
        {
          question: 'How much does surrogacy cost in the U.S.?',
          answer:
            'Surrogacy cost in the U.S. usually includes agency services, surrogate compensation, legal coordination, insurance planning, escrow administration, allowances, and case-dependent items. State-by-state differences often come from legal process, insurance availability, local compensation expectations, court timing, and clinic logistics.',
        },
        {
          question: 'What is included in surrogacy cost?',
          answer:
            'Surrogacy cost may include agency coordination, surrogate recruitment and matching, screening support, surrogate compensation budgeting, allowances, legal agreement coordination, parentage steps, insurance review, and escrow administration. Whether IVF, newborn care, or extra insurance is included depends on the written scope.',
        },
        {
          question: 'What is not included in surrogacy cost?',
          answer:
            'Many surrogacy programs do not include IVF clinic fees or newborn medical care after birth. IVF costs can include retrieval, donor eggs, embryo creation, PGT, freezing, storage, and transfer; newborn care may include NICU, pediatric care, and insurance-related billing.',
        },
        {
          question: 'Why is surrogacy expensive?',
          answer:
            'Surrogacy is expensive because it combines medical coordination, surrogate compensation, legal protection, insurance planning, escrow administration, and risk planning. Twins, C-section, bed rest, insurance exclusions, or extra transfers can change the budget, so clarity matters more than the lowest headline number.',
        },
        {
          question: 'Can you explain surrogacy fees in plain English?',
          answer:
            'Yes: agency fees fund coordination and case management, compensation supports the surrogate’s pregnancy journey, legal fees protect everyone and secure parentage, and insurance budgeting helps avoid surprise out-of-pocket expenses. That’s the simplest surrogacy fees explained framework.',
        },
        {
          question: 'How do surrogacy payments work? When do I pay?',
          answer:
            'Surrogacy payments are usually made in stages tied to milestones and held through a trust or escrow account. Deposits may be tied to agreement signing, medical clearance, legal clearance, transfer, pregnancy confirmation, and heartbeat confirmation, with exact amounts defined by the agreement.',
        },
        {
          question: 'Is IVF included? How much does IVF and surrogacy cost together?',
          answer:
            'IVF clinic fees are typically separate from surrogacy program costs. To estimate IVF and surrogacy together, build a two-layer budget: surrogacy program costs plus clinic costs such as embryo creation, medications, PGT, storage, transfer attempts, and donor egg needs if applicable.',
        },
        {
          question: 'How much is surrogacy with IVF?',
          answer:
            'It depends mostly on your clinic pathway (number of transfers, medication protocol, and whether donor eggs are involved). That’s why we recommend separating surrogacy cost breakdown from clinic billing—so you can compare apples-to-apples.',
        },
        {
          question: 'How much is surrogacy cost with insurance?',
          answer:
            'Surrogacy cost with insurance varies because insurance plans differ in eligibility, exclusions, deductibles, waiting periods, and out-of-pocket maximums. Having insurance does not remove all costs; early review helps determine whether extra coverage or budget reserves may be needed.',
        },
      ],
)
const relatedPerformanceLinks = computed(() => [
  {
    to: '/blog/Average-Compensation-Surrogacy-Cost-in-California',
    title: locale.value === 'zh' ? '加州平均补偿与代孕费用' : 'Average Compensation & Surrogacy Cost in California',
    description: locale.value === 'zh'
      ? 'GSC 高曝光博客，适合继续了解加州代孕预算、代母补偿和费用变量。'
      : 'A high-impression GSC blog for California surrogacy budget, compensation, and cost variables.',
    image: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/1761716620530-82fdj9.webp',
    date: locale.value === 'zh' ? '2025年10月29日' : 'October 29, 2025',
  },
  {
    to: '/blog/How-Much-Is-Surrogacy-Understanding-the-Real-Cost-of-Building-a-Family',
    title: locale.value === 'zh' ? '美国代孕真实费用' : 'How Much Is Surrogacy?',
    description: locale.value === 'zh'
      ? '围绕真实代孕成本、费用范围和家庭预算问题的高曝光内容。'
      : 'High-impression content on real surrogacy costs, ranges, and family budget planning.',
    image: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/1761881438525-s95lbq.webp',
    date: locale.value === 'zh' ? '2025年10月31日' : 'October 31, 2025',
  },
  {
    to: '/blog/How-Much-Does-Surrogacy-Cost-And-Pricing',
    title: locale.value === 'zh' ? '代孕费用与定价说明' : 'Surrogacy Cost and Pricing',
    description: locale.value === 'zh'
      ? '补充说明代孕费用拆分、定价逻辑和常见预算问题。'
      : 'A supporting guide for cost breakdowns, pricing logic, and common budget questions.',
    image: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/1761892319234-7s7v5q.png',
    date: locale.value === 'zh' ? '2025年10月31日' : 'October 31, 2025',
  },
])
const pagePath = '/surrogacy-cost'
const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: t.value.hero.title,
  description: t.value.metaDesc,
  about: 'Gestational surrogacy cost planning and cost breakdown',
  audience: 'Intended parents',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  service: {
    name: 'Gestational Surrogacy Cost Planning Support',
    serviceType: 'Gestational surrogacy cost planning',
    audience: 'Intended parents',
    description: 'Gestational surrogacy cost planning support for intended parents, including agency fees, gestational carrier compensation, legal coordination, insurance guidance, escrow planning, payment timeline, and estimated budget breakdown.',
  },
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'For Intended Parents', url: '/intended-parents' },
    { name: 'Surrogacy Cost', url: pagePath },
  ],
  faqs: faqItems.value,
}))

useHead(() => ({
  script: coreServicePageSchemas.value.map((schema, index) => ({
    key: `schema-surrogacy-cost-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))

const activeReason = ref(reasons.value[0].id)
const showCaseOnly = ref(false)
const highlightedPayment = ref<string | null>(null)
const selectedPaymentId = ref(paymentSteps.value[0]?.id || 'payment-1')
const showTrustDrawer = ref(false)
const faqQuery = ref('')
const faqOpen = ref<Record<string, boolean>>({})
const stickyVisible = ref(false)
const stickyClosed = ref(false)

const filteredFaqs = computed(() => {
  const query = faqQuery.value.trim().toLowerCase()
  if (!query)
    return faqItems.value
  return faqItems.value.filter(item =>
    item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query),
  )
})

function scrollToSection(id: string) {
  if (id === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    history.replaceState(null, '', '#top')
    return
  }
  const target = document.getElementById(id)
  if (!target)
    return
  const offset = 120
  const top = target.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
  history.replaceState(null, '', `#${id}`)
}

function updateActiveAnchor() {
  const offset = 120
  const positions = anchors.value.map((anchor) => {
    const element = document.getElementById(anchor.id)
    if (!element)
      return { id: anchor.id, distance: Number.POSITIVE_INFINITY }
    const rect = element.getBoundingClientRect()
    return { id: anchor.id, distance: Math.abs(rect.top - offset) }
  })
  activeAnchor.value = positions.reduce((prev, current) => (current.distance < prev.distance ? current : prev)).id
}

function updateStickyVisibility() {
  if (stickyClosed.value) {
    stickyVisible.value = false
    return
  }
  stickyVisible.value = window.scrollY > window.innerHeight * 0.7
}

function handleScroll() {
  updateActiveAnchor()
  updateStickyVisibility()
}

function highlightPayment(id: string) {
  highlightedPayment.value = id
  setTimeout(() => {
    if (highlightedPayment.value === id)
      highlightedPayment.value = null
  }, 2000)
}

function selectPayment(id: string) {
  selectedPaymentId.value = id
  const target = document.getElementById(id)
  if (!target)
    return
  target.scrollIntoView({ behavior: 'smooth', block: 'center' })
  highlightPayment(id)
}

function slugify(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

function toggleFaq(id: string) {
  faqOpen.value = {
    ...faqOpen.value,
    [id]: !faqOpen.value[id],
  }
  if (faqOpen.value[id]) {
    history.replaceState(null, '', `#faq-${id}`)
  }
  else if (window.location.hash === `#faq-${id}`) {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`)
  }
}

function openAllFaqs() {
  const nextState: Record<string, boolean> = {}
  filteredFaqs.value.forEach((item) => {
    nextState[slugify(item.question)] = true
  })
  faqOpen.value = nextState
}

function collapseAllFaqs() {
  faqOpen.value = {}
}

function restoreStickyState() {
  stickyClosed.value = sessionStorage.getItem('surrogacy-cost-sticky-cta') === '1'
}

onMounted(async () => {
  restoreStickyState()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleScroll, { passive: true })
  await nextTick()
  handleScroll()

  const hash = window.location.hash
  if (hash.startsWith('#faq-')) {
    const id = hash.replace('#faq-', '')
    faqOpen.value = { ...faqOpen.value, [id]: true }
    const target = document.getElementById(`faq-${id}`)
    if (target) {
      const offset = 120
      const top = target.getBoundingClientRect().top + window.scrollY - offset
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }
  else if (hash) {
    const id = hash.replace('#', '')
    const anchorIds = anchors.value.map(anchor => anchor.id)
    if (id === 'top' || id === 'estimate' || anchorIds.includes(id)) {
      const target = document.getElementById(id)
      if (target) {
        const offset = 120
        const top = target.getBoundingClientRect().top + window.scrollY - offset
        window.scrollTo({ top, behavior: 'smooth' })
      }
    }
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleScroll)
})
</script>

<template>
  <div class="bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />
    <BreadcrumbNav
      :items="[
        { to: '/intended-parents', label: locale === 'zh' ? '准父母' : 'For Intended Parents' },
        { label: locale === 'zh' ? '费用指南' : 'Cost Guide' },
      ]"
    />

    <main>
      <section id="top" class="hero-section">
        <div class="content-container">
          <div class="hero-grid">
            <div class="hero-left scroll-animate">
              <div class="space-y-4">
                <h1 class="h1-text">
                  {{ t.hero.title }}
                </h1>
                <p class="body-text max-w-xl">
                  {{ t.hero.lead }}
                </p>
              </div>

              <div class="cta-group">
                <NuxtLink
                  :to="localePath('/be-parents')"
                  class="btn-primary"
                >
                  {{ t.hero.primary }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/be-parents')"
                  class="btn-secondary"
                >
                  {{ t.hero.secondary }}
                </NuxtLink>
              </div>
            </div>

            <div class="hero-right scroll-animate">
              <aside class="cost-hero-total-card" aria-label="Estimated program total">
                <p class="cost-hero-total-label">
                  {{ t.hero.totalLabel }}
                </p>
                <p class="cost-hero-total-amount">
                  {{ t.hero.totalAmount }}
                </p>
                <div class="cost-hero-disclaimer">
                  <span class="cost-hero-disclaimer-icon" aria-hidden="true">!</span>
                  <p>{{ t.hero.disclaimer }}</p>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <div class="cost-anchor-nav-wrapper">
          <div class="content-container">
            <nav class="cost-anchor-nav" aria-label="On-page navigation">
              <button
                v-for="anchor in anchors"
                :key="anchor.id"
                type="button"
                class="cost-anchor-pill"
                :class="activeAnchor === anchor.id ? 'cost-anchor-pill-active' : ''"
                :aria-current="activeAnchor === anchor.id ? 'page' : undefined"
                @click="scrollToSection(anchor.id)"
              >
                {{ anchor.label }}
              </button>
            </nav>
          </div>
        </div>
      </section>

      <div class="cost-seo-note-wrap">
        <SeoTrustNote
          :updated="locale === 'zh' ? '最后更新：2026年6月22日' : 'Last updated: June 22, 2026'"
          :reviewed-by="locale === 'zh' ? '孕达代孕团队审阅' : 'Reviewed by Yunda Surrogacy team'"
          :note="locale === 'zh' ? '本页用于解释代孕费用类别、估算范围和付款规划。实际费用会因 IVF 诊所、保险、法律、医疗情况和个案安排而变化，最终预算应结合专业审查确认。' : 'This page explains surrogacy cost categories, estimate ranges, and payment planning. Actual costs vary by IVF clinic, insurance, legal, medical, and case-specific factors, and final budgets should be confirmed through professional review.'"
          :sources="[
            { label: locale === 'zh' ? '代孕流程' : 'Surrogacy process', href: localePath('/surrogacy-process') },
            { label: locale === 'zh' ? '加州代孕保护' : 'California protection', href: localePath('/surrogacy-protection-california') },
            { label: locale === 'zh' ? '代孕补偿' : 'Surrogate compensation', href: localePath('/surrogate-compensation') },
          ]"
        />
      </div>

      <section class="mx-auto max-w-280 px-5 pt-10 lg:px-10 lg:pt-12">
        <div class="rounded-6 border border-[var(--olive-green)]/35 bg-white/95 p-6 shadow-lg shadow-black/10 lg:p-8">
          <div class="grid gap-6 lg:grid-cols-3">
            <div>
              <p class="small-text font-semibold uppercase tracking-wide text-[var(--yunda-maple)]">
                {{ locale === 'zh' ? '权威结论' : 'Authority Summary' }}
              </p>
              <h2 class="mt-2 h3-text">
                {{ locale === 'zh' ? '代孕费用先看范围，再看总价。' : 'Start with scope, then compare total cost.' }}
              </h2>
            </div>
            <p class="body-text">
              {{ locale === 'zh' ? '加州代孕费用通常由机构协调、代孕妈妈补偿、法律、保险、托管、IVF 诊所与孕期变量共同决定。比较报价时，先看每个报价包含什么，再看总价。' : 'Surrogacy cost is usually driven by agency coordination, surrogate compensation, legal work, insurance, escrow, IVF clinic fees, and pregnancy-specific variables. When comparing quotes, start with what each quote includes, then look at the total.' }}
            </p>
            <p class="body-text">
              {{ locale === 'zh' ? 'IVF 诊所费用和新生儿医疗通常不包含在机构费用内；保险排除、自付额、胚胎状态和多胎/剖宫产等情况都会让总预算变化。' : 'IVF clinic fees and newborn medical care are usually separate from the agency package; insurance exclusions, deductibles, embryo status, and twins or C-section scenarios can all change the final budget.' }}
            </p>
          </div>
        </div>
      </section>

      <section id="ca-vs-us" class="section-pad cost-section-after-seo">
        <div class="content-container section-stack">
          <h2 class="h2-text cost-section-title-center scroll-animate">
            {{ t.ca.title }}
          </h2>

          <div class="cost-driver-grid scroll-animate">
            <article
              v-for="(card, index) in driverCards"
              :key="card.id"
              class="cost-driver-card"
            >
              <div class="cost-driver-icon-wrap" aria-hidden="true">
                <img
                  :src="PAGE_ASSETS.drivers[index]"
                  alt=""
                  class="cost-driver-icon"
                  loading="lazy"
                >
              </div>
              <div class="cost-driver-body">
                <h3 class="h3-text font-semibold">
                  {{ card.title }}
                </h3>
                <p class="body-text mt-3 text-[var(--yunda-bark)]/86">
                  {{ card.content }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="cost-breakdown" class="section-pad cost-breakdown-section bg-[var(--yunda-petal)]">
        <div class="content-container section-stack">
          <h2 class="h2-text cost-section-title-center scroll-animate">
            {{ t.breakdown.title }}
          </h2>

          <div class="cost-breakdown-cards scroll-animate">
            <article class="cost-breakdown-total-card">
              <p class="cost-breakdown-total-label">
                {{ t.breakdown.totalLabel }}
              </p>
              <p class="cost-breakdown-total-amount">
                {{ t.breakdown.totalAmount }}
              </p>
            </article>

            <article
              v-for="(card, index) in breakdownCards"
              :key="card.title"
              class="cost-breakdown-item-card"
            >
              <div class="cost-breakdown-item-icon-wrap" aria-hidden="true">
                <img
                  :src="PAGE_ASSETS.breakdown[index]"
                  alt=""
                  class="cost-breakdown-item-icon"
                  loading="lazy"
                >
              </div>
              <h3 class="cost-breakdown-item-title">
                {{ card.title }}
              </h3>
              <p class="cost-breakdown-item-desc">
                {{ card.description }}
              </p>
              <p class="cost-breakdown-item-amount">
                {{ card.amount }}
              </p>
            </article>
          </div>

          <div class="cost-breakdown-summary scroll-animate">
            <div class="cost-breakdown-summary-col">
              <h3 class="h3-text font-semibold">
                {{ t.breakdown.fixedTitle }}
              </h3>
              <p class="body-text mt-2 text-[var(--yunda-bark)]/82">
                {{ t.breakdown.fixedIntro }}
              </p>
              <ul class="cost-breakdown-list body-text mt-4">
                <li v-for="item in t.breakdown.fixedList" :key="item">
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="cost-breakdown-summary-col">
              <h3 class="h3-text font-semibold">
                {{ t.breakdown.variableTitle }}
              </h3>
              <p class="body-text mt-2 text-[var(--yunda-bark)]/82">
                {{ t.breakdown.variableIntro }}
              </p>
              <ul class="cost-breakdown-list body-text mt-4">
                <li v-for="item in t.breakdown.variableList" :key="item">
                  {{ item }}
                </li>
              </ul>
            </div>

            <div class="cost-breakdown-summary-col cost-breakdown-donut-col">
              <h3 class="h3-text font-semibold">
                {{ t.breakdown.donutTitle }}
              </h3>
              <div class="cost-breakdown-donut-wrap">
                <div
                  class="chart-slot cost-donut"
                  role="img"
                  :aria-label="t.breakdown.donutTitle"
                  style="--p1:39; --p2:47; --p3:8; --p4:4; --p5:2;"
                />
                <ul class="donut-legend">
                  <li v-for="(item, idx) in t.breakdown.donutLegend" :key="item">
                    <span class="dot" :class="[idx === 0 ? 'dot-fixed' : idx === 1 ? 'dot-comp' : idx === 2 ? 'dot-ins' : idx === 3 ? 'dot-allow' : 'dot-embryo']" />
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="payments" class="section-pad cost-payments-section">
        <div class="content-container section-stack">
          <div class="scroll-animate cost-payments-intro">
            <h2 class="h2-text cost-section-title-center">
              {{ t.payments.title }}
            </h2>
            <p class="body-text mx-auto mt-4 max-w-3xl text-center text-[var(--yunda-bark)]/84">
              {{ t.payments.intro }}
            </p>
          </div>

          <div class="scroll-animate">
            <div class="cost-payments-timeline" role="tablist" aria-label="Payment timeline">
              <button
                v-for="(step, index) in paymentSteps"
                :key="step.id"
                type="button"
                role="tab"
                class="timeline-step"
                :class="selectedPaymentId === step.id ? 'timeline-step-active' : ''"
                :aria-selected="selectedPaymentId === step.id"
                @click="selectPayment(step.id)"
              >
                <span class="timeline-step-index">{{ index + 1 }}</span>
                <span class="timeline-step-label">{{ step.label }}</span>
              </button>
            </div>
          </div>

          <div class="payment-blocks scroll-animate">
            <article
              v-for="(payment, index) in paymentSteps"
              v-show="selectedPaymentId === payment.id"
              :id="payment.id"
              :key="payment.id"
              class="cost-payment-card"
              role="tabpanel"
            >
              <div class="payment-block-header">
                <span class="payment-index">{{ index + 1 }}</span>
                <div class="payment-header-text">
                  <p class="cost-payment-card-title">
                    {{ payment.title }}
                  </p>
                  <p class="cost-payment-card-subtitle">
                    {{ payment.label }}
                  </p>
                </div>
              </div>
              <div class="payment-grid">
                <div class="payment-cell">
                  <p class="cell-title">
                    {{ t.payments.labels?.milestone || 'Milestone' }}
                  </p>
                  <p class="cell-body font-semibold">
                    {{ payment.title }}
                  </p>
                </div>
                <div class="payment-cell amount-cell">
                  <p class="cell-title">
                    {{ t.payments.labels?.deposit || 'Deposit amount' }}
                  </p>
                  <p class="cell-amount">
                    {{ payment.amount }}
                  </p>
                </div>
                <div class="payment-cell">
                  <p class="cell-title">
                    {{ t.payments.labels?.covers || 'What it covers' }}
                  </p>
                  <ul class="cell-list">
                    <li v-for="item in payment.items" :key="item.text">
                      - {{ item.text }}
                      <ul v-if="item.subItems" class="cell-sub">
                        <li v-for="sub in item.subItems" :key="sub">
                          · {{ sub }}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
                <div class="payment-cell">
                  <p class="cell-title">
                    {{ t.payments.labels?.notes || 'Notes' }}
                  </p>
                  <p class="cell-body text-[var(--yunda-bark)]/80">
                    {{ payment.note }}
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="whats-not-included" class="section-pad cost-whats-not-section">
        <div class="content-container section-stack">
          <div class="cost-trust-panel scroll-animate">
            <div class="cost-trust-shield" aria-hidden="true">
              <img :src="PAGE_ASSETS.trustShield" alt="" class="h-full w-full object-contain" loading="lazy">
            </div>
            <div class="cost-trust-content">
              <div class="cost-trust-header">
                <h2 class="h2-text">
                  {{ t.payments.trustTitle }}
                </h2>
                <button
                  type="button"
                  class="btn-tertiary hidden sm:inline-flex"
                  @click="showTrustDrawer = true"
                >
                  {{ t.payments.trustButton }}
                </button>
              </div>
              <div class="cost-trust-grid">
                <article
                  v-for="point in trustPoints"
                  :key="point.title"
                  class="cost-trust-point"
                >
                  <div class="cost-trust-point-icon" aria-hidden="true">
                    <img :src="PAGE_ASSETS.trustCheck" alt="" class="h-full w-full object-contain" loading="lazy">
                  </div>
                  <h3 class="cost-trust-point-title">
                    {{ point.title }}
                  </h3>
                  <p class="body-text mt-2 text-[var(--yunda-bark)]/84">
                    {{ point.text }}
                  </p>
                </article>
              </div>
            </div>
          </div>

          <div class="scroll-animate text-center">
            <h2 class="h2-text">
              {{ t.whatsNotIncluded.title }}
            </h2>
            <p class="body-text mx-auto mt-4 max-w-3xl text-[var(--yunda-bark)]/84">
              {{ t.whatsNotIncluded.intro }}
            </p>
          </div>

          <div class="cost-not-included-grid scroll-animate">
            <article
              v-for="(item, index) in notIncludedItems"
              :key="item.title"
              class="cost-not-included-card"
            >
              <div class="cost-not-included-icon-wrap" aria-hidden="true">
                <img
                  :src="PAGE_ASSETS.notIncluded[index]"
                  alt=""
                  class="cost-not-included-icon"
                  loading="lazy"
                >
              </div>
              <h3 class="h3-text font-semibold">
                {{ item.title }}
              </h3>
              <p class="body-text mt-3 text-[var(--yunda-bark)]/84">
                {{ item.text }}
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="why-expensive" class="section-pad cost-why-section bg-[var(--yunda-petal)]">
        <div class="content-container section-stack">
          <div class="scroll-animate space-y-4">
            <h2 class="h2-text">
              {{ t.why.title }}
            </h2>
            <p class="body-text">
              {{ t.why.intro }}
            </p>
          </div>

          <div class="why-grid">
            <div class="why-list">
              <article
                v-for="(reason, index) in reasons"
                :key="reason.id"
                class="why-item"
                :class="activeReason === reason.id ? 'why-item-active' : ''"
                @click="activeReason = reason.id"
              >
                <div class="why-item-head">
                  <span class="why-badge">{{ index + 1 }}</span>
                  <p class="why-title">
                    {{ reason.title }}
                  </p>
                  <span class="why-chevron">›</span>
                </div>
                <div v-if="activeReason === reason.id" class="why-body">
                  <p class="body-text">
                    {{ reason.description }}
                  </p>
                  <ul class="body-text space-y-1">
                    <li v-for="bullet in reason.bullets" :key="bullet">
                      - {{ bullet }}
                    </li>
                  </ul>
                </div>
              </article>
            </div>

            <div class="why-cta-hero scroll-animate">
              <div class="why-cta-overlay">
                <p class="h3-text font-semibold">
                  {{ t.why.title }}
                </p>
                <p class="body-text mt-2">
                  {{ t.hero.lead }}
                </p>
                <div class="cta-group">
                  <NuxtLink :to="localePath('/be-parents')" class="btn-primary">
                    {{ t.hero.primary }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" class="section-pad cost-section-last">
        <div class="content-container section-stack">
          <div class="scroll-animate space-y-4">
            <h2 class="h2-text">
              {{ t.faq.title }}
            </h2>
            <p class="body-text">
              {{ t.faq.intro }}
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-between gap-4">
            <div class="flex flex-wrap items-center gap-3">
              <input
                v-model="faqQuery"
                type="search"
                :placeholder="t.faq.placeholder"
                aria-label="Search FAQs"
                class="faq-search"
              >
              <span class="small-text text-[var(--yunda-bark)]/70">
                {{ filteredFaqs.length }} {{ t.faq.matchWord }}
              </span>
            </div>
            <div class="hidden gap-3 md:flex">
              <button type="button" class="btn-tertiary" @click="openAllFaqs">
                Open all
              </button>
              <button type="button" class="btn-tertiary" @click="collapseAllFaqs">
                Collapse all
              </button>
            </div>
          </div>

          <div class="faq-grid">
            <article
              v-for="item in filteredFaqs"
              :id="`faq-${slugify(item.question)}`"
              :key="item.question"
              class="card outline-card"
            >
              <button
                type="button"
                class="w-full flex items-center justify-between gap-3 text-left"
                :aria-expanded="!!faqOpen[slugify(item.question)]"
                :aria-controls="`faq-panel-${slugify(item.question)}`"
                @click="toggleFaq(slugify(item.question))"
              >
                <h3 class="h3-text font-semibold">
                  {{ item.question }}
                </h3>
                <span class="accordion-icon" :class="faqOpen[slugify(item.question)] ? 'accordion-open' : ''">
                  v
                </span>
              </button>
              <Transition
                enter-active-class="transition-all duration-300 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-200"
                leave-active-class="transition-all duration-200 ease-in"
                leave-from-class="opacity-100 max-h-200"
                leave-to-class="opacity-0 max-h-0"
              >
                <p
                  v-show="faqOpen[slugify(item.question)]"
                  :id="`faq-panel-${slugify(item.question)}`"
                  class="body-text mt-3"
                  :aria-hidden="!faqOpen[slugify(item.question)]"
                >
                  {{ item.answer }}
                </p>
              </Transition>
            </article>
          </div>

          <div id="estimate" class="card subtle-card footer-cta">
            <div class="footer-cta-content">
              <div>
                <p class="h3-text font-semibold">
                  {{ t.footer.title }}
                </p>
                <p class="body-text mt-2">
                  {{ t.footer.body }}
                </p>
              </div>
              <div class="cta-group">
                <NuxtLink :to="localePath('/be-parents')" class="btn-primary">
                  {{ t.footer.primary }}
                </NuxtLink>
                <NuxtLink :to="localePath('/be-parents')" class="btn-secondary">
                  {{ t.footer.secondary }}
                </NuxtLink>
              </div>
            </div>
            <div
              class="footer-cta-image"
              role="img"
              aria-label="Family photo placeholder"
            />
          </div>
        </div>
      </section>
      <RelatedGuides
        :title="locale === 'zh' ? '继续了解代孕费用与预算' : 'Continue With Surrogacy Cost Planning'"
        :intro="locale === 'zh' ? '如果你正在比较代孕费用，下面的内容可以帮助你进一步理解总预算、补偿项目和加州相关费用差异。' : 'If you are comparing surrogacy costs, these reads help clarify total budget, compensation items, and California cost differences.'"
        :links="relatedPerformanceLinks"
      />
    </main>

    <AppFooter />

    <Transition name="slide-up">
      <div
        v-if="stickyVisible"
        class="sticky-cta hidden md:flex"
      />
    </Transition>

    <Transition name="slide-up">
      <div v-if="stickyVisible" class="sticky-cta-mobile md:hidden">
        <NuxtLink :to="localePath('/be-parents')" class="btn-primary flex-1 text-center">
          Estimate
        </NuxtLink>
        <NuxtLink :to="localePath('/be-parents')" class="btn-secondary flex-1 text-center">
          Apply
        </NuxtLink>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="showTrustDrawer" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4" @click.self="showTrustDrawer = false">
        <div class="max-w-xl w-full rounded-4 bg-white p-6 shadow-xl">
          <div class="flex items-start justify-between gap-4">
            <h3 class="text-5 font-semibold">
              How the trust account works
            </h3>
            <button type="button" aria-label="Close trust drawer" class="text-4 text-[var(--yunda-bark)]/60 hover:text-[var(--yunda-bark)]" @click="showTrustDrawer = false">
              x
            </button>
          </div>
          <ol class="mt-4 text-4.25 leading-relaxed space-y-3">
            <li>1. Deposit: families fund the trust at each milestone.</li>
            <li>2. Pay-as-incurred: the trust pays approved expenses and releases installments on schedule.</li>
            <li>3. Reconcile and return: unused funds are reconciled and returned after final accounting.</li>
          </ol>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.content-container {
  width: 100%;
  max-width: 1900px;
  margin: 0 auto;
  padding-left: clamp(12px, 3vw, 64px);
  padding-right: clamp(12px, 3vw, 64px);
}

.section-pad {
  --cost-section-pad-y: 1.75rem;
  padding-top: var(--cost-section-pad-y);
  padding-bottom: var(--cost-section-pad-y);
}

@media (min-width: 768px) {
  .section-pad {
    --cost-section-pad-y: 2rem;
  }
}

@media (min-width: 1200px) {
  .section-pad {
    --cost-section-pad-y: 2.25rem;
  }
}

.cost-section-after-seo {
  padding-top: 2rem;
  padding-bottom: var(--cost-section-pad-y);
}

@media (min-width: 768px) {
  .cost-section-after-seo {
    padding-top: 2.25rem;
  }
}

@media (min-width: 1200px) {
  .cost-section-after-seo {
    padding-top: 2.5rem;
  }
}

.cost-section-last {
  padding-bottom: calc(var(--cost-section-pad-y) + 0.5rem);
}

.cost-seo-note-wrap :deep(> section) {
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
}

.section-stack {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

@media (min-width: 1200px) {
  .section-stack {
    gap: 28px;
  }
}

.hero-section {
  position: relative;
  padding: 64px 0 0;
  background-color: #fff;
  overflow: hidden;
}

.hero-section::after {
  content: '';
  position: absolute;
  inset: 0 0 auto 42%;
  height: 100%;
  background:
    linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0.92) 18%, rgba(255, 255, 255, 0.35) 52%, rgba(255, 255, 255, 0) 78%),
    url('/images/ip/cost/redesign/hero.jpg') center right / cover no-repeat;
  pointer-events: none;
  z-index: 0;
}

@media (max-width: 1023px) {
  .hero-section {
    padding-top: 1.5rem;
    background-color: #fff;
  }

  .hero-section::after {
    display: none;
  }

  .hero-grid {
    gap: 1.5rem;
  }

  .hero-left {
    position: relative;
    z-index: 1;
  }

  .hero-right {
    position: relative;
    z-index: 1;
  }

  .cost-hero-total-card {
    width: 100%;
    max-width: none;
  }

  .cost-anchor-nav-wrapper {
    position: relative;
    z-index: 1;
    margin-top: 1.25rem;
  }
}

@media (min-width: 768px) {
  .hero-section {
    padding: 72px 0 0;
  }
}

@media (min-width: 1200px) {
  .hero-section {
    padding: 80px 0 0;
  }
}

.hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 32px;
  align-items: center;
}

@media (min-width: 1024px) {
  .hero-grid {
    grid-template-columns: minmax(0, 1fr) minmax(280px, 360px);
    gap: 40px;
    align-items: center;
  }
}

.hero-left {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

@media (min-width: 1024px) {
  .hero-left {
    max-width: 620px;
  }
}

.hero-right {
  display: flex;
  justify-content: center;
}

@media (min-width: 1024px) {
  .hero-right {
    justify-content: flex-end;
  }
}

.cost-hero-total-card {
  width: min(100%, 320px);
  border-radius: 20px;
  background: #d4ddd6;
  padding: 1.75rem 1.5rem 1.25rem;
  box-shadow: 0 16px 36px rgba(39, 31, 24, 0.12);
}

.cost-hero-total-label {
  font-size: 0.95rem;
  line-height: 1.35;
  color: rgba(39, 31, 24, 0.82);
}

.cost-hero-total-amount {
  margin-top: 0.35rem;
  font-family: var(--font-display, Georgia, serif);
  font-size: clamp(2.5rem, 4vw, 3.25rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--yunda-bark);
}

.cost-hero-disclaimer {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  margin-top: 1.25rem;
  border-radius: 14px;
  background: #faf4ea;
  padding: 0.85rem 0.9rem;
}

.cost-hero-disclaimer-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  border-radius: 999px;
  background: rgba(169, 108, 66, 0.18);
  color: var(--yunda-maple);
  font-size: 0.75rem;
  font-weight: 700;
}

.cost-hero-disclaimer p {
  font-size: 0.82rem;
  line-height: 1.45;
  color: rgba(39, 31, 24, 0.82);
}

.cost-anchor-nav-wrapper {
  position: relative;
  z-index: 1;
  margin-top: 1.5rem;
  background: #c5c0a0;
}

.cost-anchor-nav {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.85rem 0;
  scrollbar-width: none;
}

.cost-anchor-nav::-webkit-scrollbar {
  display: none;
}

.cost-anchor-pill {
  flex: 0 0 auto;
  border: 0;
  border-radius: 999px;
  background: transparent;
  padding: 0.55rem 1rem;
  font-size: 0.9rem;
  line-height: 1.2;
  color: rgba(39, 31, 24, 0.88);
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.cost-anchor-pill:hover {
  background: rgba(255, 255, 255, 0.28);
}

.cost-anchor-pill-active {
  background: #faf4ea;
  color: var(--yunda-bark);
  font-weight: 600;
}

.cost-section-title-center {
  text-align: center;
  margin-inline: auto;
  max-width: 52rem;
}

.cost-driver-grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 768px) {
  .cost-driver-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.25rem;
  }
}

.cost-driver-card {
  display: flex;
  gap: 1.15rem;
  align-items: flex-start;
  border: 1px solid rgba(169, 108, 66, 0.22);
  border-radius: 18px;
  background: #faf4ea;
  padding: 1.35rem 1.2rem;
}

.cost-driver-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.25rem;
  height: 5.25rem;
  flex-shrink: 0;
  overflow: hidden;
}

@media (min-width: 768px) {
  .cost-driver-icon-wrap {
    width: 5.75rem;
    height: 5.75rem;
  }
}

.cost-driver-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.cost-breakdown-cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

@media (min-width: 1024px) {
  .cost-breakdown-cards {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.1rem;
  }
}

.cost-breakdown-total-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 100%;
  border-radius: 18px;
  background: #d4ddd6;
  padding: 1.5rem 1.25rem;
  text-align: center;
}

.cost-breakdown-total-label {
  font-size: 0.95rem;
  line-height: 1.35;
  color: rgba(39, 31, 24, 0.82);
}

.cost-breakdown-total-amount {
  margin-top: 0.35rem;
  font-family: var(--font-display, Georgia, serif);
  font-size: clamp(2rem, 3vw, 2.75rem);
  font-weight: 700;
  line-height: 1.05;
  color: var(--yunda-bark);
}

.cost-breakdown-item-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  border: 1px solid rgba(169, 108, 66, 0.18);
  border-radius: 18px;
  background: #faf4ea;
  padding: 1.5rem 1rem 1.15rem;
  min-height: 100%;
}

.cost-breakdown-item-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.5rem;
  height: 5.5rem;
  flex-shrink: 0;
  overflow: hidden;
}

@media (min-width: 768px) {
  .cost-breakdown-item-icon-wrap {
    width: 6rem;
    height: 6rem;
  }
}

.cost-breakdown-item-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
  transform: scale(1.42);
}

.cost-breakdown-item-title {
  margin-top: 0.65rem;
  font-family: var(--font-display, Georgia, serif);
  font-size: 1.05rem;
  font-weight: 700;
  line-height: 1.3;
  color: var(--yunda-bark);
}

.cost-breakdown-item-desc {
  margin-top: 0.55rem;
  font-size: 0.84rem;
  line-height: 1.5;
  color: rgba(39, 31, 24, 0.78);
  flex: 1;
}

.cost-breakdown-item-amount {
  margin-top: 0.85rem;
  font-family: var(--font-display, Georgia, serif);
  font-size: 1.35rem;
  font-weight: 700;
  color: var(--yunda-maple);
}

.cost-breakdown-summary {
  display: grid;
  gap: 1rem;
  border: 1px solid rgba(169, 108, 66, 0.18);
  border-radius: 20px;
  background: #faf4ea;
  padding: 1.25rem;
}

@media (min-width: 1024px) {
  .cost-breakdown-summary {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
    padding: 1.5rem;
    align-items: stretch;
  }

  .cost-breakdown-donut-col {
    display: flex;
    flex-direction: column;
  }

  .cost-breakdown-donut-col .cost-breakdown-donut-wrap {
    flex: 1;
    align-items: center;
  }
}

.cost-breakdown-list {
  list-style: disc;
  padding-left: 1.1rem;
}

.cost-breakdown-list li + li {
  margin-top: 0.35rem;
}

.cost-breakdown-donut-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
}

.cost-breakdown-donut-col .cost-breakdown-donut-wrap {
  margin-top: 0.85rem;
}

@media (min-width: 1024px) {
  .cost-breakdown-donut-col .cost-breakdown-donut-wrap {
    margin-top: 0.75rem;
  }
}

.cost-breakdown-donut-wrap .chart-slot {
  min-height: unset;
  margin-top: 0;
}

.cost-breakdown-donut-wrap .cost-donut {
  width: 10.5rem;
  min-width: 10.5rem;
  max-width: 10.5rem;
  flex-shrink: 0;
}

.cost-breakdown-donut-wrap .donut-legend {
  flex: 1;
  min-width: 0;
  font-size: 0.875rem;
  line-height: 1.45;
  gap: 0.45rem;
}

@media (min-width: 1024px) {
  .cost-breakdown-donut-col .cost-breakdown-donut-wrap {
    gap: 1.15rem;
  }

  .cost-breakdown-donut-wrap .cost-donut {
    width: 12.5rem;
    min-width: 12.5rem;
    max-width: 12.5rem;
  }

  .cost-breakdown-donut-wrap .donut-legend {
    font-size: 0.92rem;
  }
}

.cost-trust-panel {
  display: grid;
  gap: 1.25rem;
  align-items: start;
  border-radius: 22px;
  background: #e8e6d8;
  padding: 1.5rem 1.25rem;
}

@media (min-width: 900px) {
  .cost-trust-panel {
    grid-template-columns: auto minmax(0, 1fr);
    gap: 1.5rem;
    padding: 1.75rem 1.5rem;
  }
}

.cost-trust-shield {
  width: 6rem;
  height: 6rem;
}

@media (min-width: 900px) {
  .cost-trust-shield {
    width: 7rem;
    height: 7rem;
  }
}

.cost-trust-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.cost-trust-grid {
  display: grid;
  gap: 1rem;
  margin-top: 1.25rem;
}

@media (min-width: 900px) {
  .cost-trust-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.25rem;
  }
}

.cost-trust-point-icon {
  width: 2.35rem;
  height: 2.35rem;
}

.cost-trust-point-title {
  margin-top: 0.65rem;
  font-family: var(--font-display, Georgia, serif);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.35;
  color: var(--yunda-bark);
}

.cost-not-included-grid {
  display: grid;
  gap: 1rem;
}

@media (min-width: 768px) {
  .cost-not-included-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1200px) {
  .cost-not-included-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}

.cost-not-included-card {
  border: 1px solid rgba(169, 108, 66, 0.18);
  border-radius: 18px;
  background: #faf4ea;
  padding: 1.35rem 1rem 1.25rem;
  text-align: center;
  min-height: 100%;
}

.cost-not-included-icon-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.75rem;
  height: 4.75rem;
  margin-inline: auto;
  overflow: hidden;
}

.cost-not-included-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.cost-whats-not-section {
  background: #fff;
  --cost-section-pad-y: 2rem;
  padding-top: var(--cost-section-pad-y);
  padding-bottom: var(--cost-section-pad-y);
}

@media (min-width: 768px) {
  .cost-whats-not-section {
    --cost-section-pad-y: 2.25rem;
  }
}

@media (min-width: 1200px) {
  .cost-whats-not-section {
    --cost-section-pad-y: 2.5rem;
  }
}

.cost-whats-not-section .section-stack {
  gap: 24px;
}

@media (min-width: 1200px) {
  .cost-whats-not-section .section-stack {
    gap: 28px;
  }
}

.cost-payments-section {
  background: #faf4ea;
}

.cost-why-section {
  --cost-section-pad-y: 2rem;
  padding-top: var(--cost-section-pad-y);
  padding-bottom: var(--cost-section-pad-y);
}

@media (min-width: 768px) {
  .cost-why-section {
    --cost-section-pad-y: 2.25rem;
  }
}

@media (min-width: 1200px) {
  .cost-why-section {
    --cost-section-pad-y: 2.5rem;
  }
}

.cost-payments-intro {
  text-align: center;
}

.cost-payments-timeline {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.35rem 0.5rem;
}

.timeline-step {
  border: none;
  border-radius: 999px;
  padding: 0.35rem 0.5rem;
  text-align: left;
  background: transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  position: relative;
  z-index: 1;
}

.timeline-step::after {
  content: '';
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 0.35rem;
  border-top: 7px solid transparent;
  border-bottom: 7px solid transparent;
  border-left: 10px solid rgba(169, 108, 66, 0.42);
}

.timeline-step:last-child::after {
  display: none;
}

.timeline-step:hover {
  transform: translateY(-1px);
}

.timeline-step:focus-visible {
  outline: 2px solid rgba(169, 108, 66, 0.3);
  outline-offset: 2px;
}

.timeline-step-active .timeline-step-index {
  background: var(--yunda-maple);
  border-color: var(--yunda-maple);
  box-shadow: 0 8px 18px rgba(169, 108, 66, 0.2);
}

.timeline-step:not(.timeline-step-active) .timeline-step-index {
  background: rgba(169, 108, 66, 0.38);
  border-color: transparent;
  box-shadow: none;
}

.timeline-step:not(.timeline-step-active) .timeline-step-label {
  color: rgba(39, 31, 24, 0.62);
  font-weight: 600;
}

.timeline-step-index {
  height: 2.75rem;
  width: 2.75rem;
  border-radius: 999px;
  background: var(--yunda-maple);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  border: 2px solid rgba(169, 108, 66, 0.35);
  box-shadow: 0 8px 18px rgba(169, 108, 66, 0.18);
  flex-shrink: 0;
}

.timeline-step-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.timeline-step-label {
  font-size: 1rem;
  color: var(--yunda-bark);
  font-weight: 700;
  white-space: nowrap;
}

.timeline-step-amount {
  display: none;
}

.payment-blocks {
  display: grid;
  gap: 20px;
}

.cost-payment-card {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  border-radius: 20px;
  background: #fff;
  padding: 1.35rem 1.15rem;
  box-shadow: 0 14px 34px rgba(39, 31, 24, 0.1);
}

@media (min-width: 768px) {
  .cost-payment-card {
    padding: 1.6rem 1.5rem;
  }
}

.cost-payment-card-title {
  font-family: var(--font-display, Georgia, serif);
  font-size: 1.15rem;
  font-weight: 700;
  line-height: 1.35;
  color: var(--yunda-bark);
}

@media (min-width: 768px) {
  .cost-payment-card-title {
    font-size: 1.25rem;
  }
}

.cost-payment-card-subtitle {
  font-size: 0.875rem;
  line-height: 1.35;
  color: rgba(39, 31, 24, 0.62);
}

.payment-block {
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 12px 28px rgba(39, 31, 24, 0.12);
}

.payment-block-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.payment-index {
  height: 2.75rem;
  width: 2.75rem;
  border-radius: 12px;
  background: var(--yunda-maple);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.05rem;
  box-shadow: 0 8px 18px rgba(169, 108, 66, 0.18);
  flex-shrink: 0;
}

.breadcrumb-nav {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgba(39, 31, 24, 0.6);
}

.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-list li::after {
  content: '/';
  margin-left: 6px;
  color: rgba(39, 31, 24, 0.4);
}

.breadcrumb-list li:last-child::after {
  content: '';
}

.breadcrumb-list li:last-child {
  color: rgba(39, 31, 24, 0.75);
}

.breadcrumb-text {
  font-size: 0.875rem;
  line-height: 1.25rem;
  color: rgba(39, 31, 24, 0.6);
}

.hero-trust-card {
  max-width: 400px;
  min-height: 340px;
  margin-left: auto;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 18px 36px rgba(39, 31, 24, 0.18);
}

@media (max-width: 1023px) {
  .hero-trust-card {
    max-width: 100%;
  }
}

.trust-item {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.trust-check {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  margin-top: 2px;
  border-radius: 999px;
  background: rgba(169, 108, 66, 0.15);
  color: var(--yunda-maple);
  font-size: 0.75rem;
  font-weight: 700;
}

.intro-grid {
  display: grid;
  gap: 24px;
}

.intro-grid > div:first-child {
  max-width: 760px;
}

.driver-grid {
  display: grid;
  gap: 20px;
}

@media (min-width: 768px) {
  .driver-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }
}

@media (min-width: 1200px) {
  .driver-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 24px;
  }
}

.driver-card {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  min-height: 340px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 28px rgba(39, 31, 24, 0.12);
  display: flex;
  align-items: stretch;
}

.driver-blur-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  background-color: var(--yunda-maple);
  background-blend-mode: multiply;
  filter: blur(2px);
  transform: scale(1);
  opacity: 0.8;
}

.driver-blur-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(169, 108, 66, 0.16), rgba(79, 68, 51, 0.45));
}

.driver-content {
  position: relative;
  z-index: 1;
  padding: 20px;
  color: #f8f7f4;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.driver-content h3 {
  font-weight: 1000;
  font-size: 1.8rem;
}

.driver-content .body-text {
  color: #f0ede6;
  font-size: 1.1rem;
  line-height: 1.8rem;
}

.chart-slot {
  width: 100%;
  min-height: 180px;
  border-radius: 16px;
  background: linear-gradient(120deg, rgba(191, 201, 191, 0.3), rgba(251, 240, 218, 0.6));
  border: 1px dashed rgba(39, 31, 24, 0.15);
  background-size: cover;
  background-position: center;
}

.cost-table {
  padding: 0;
  overflow: hidden;
  display: grid;
  box-shadow: 0 16px 32px rgba(39, 31, 24, 0.12);
}

@media (min-width: 1024px) {
  .cost-table {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.cost-table-column {
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(39, 31, 24, 0.08);
  background: rgba(255, 255, 255, 0.92);
}

@media (min-width: 1024px) {
  .cost-table-column {
    border-bottom: none;
  }

  .cost-table-column + .cost-table-column {
    border-left: 1px solid rgba(39, 31, 24, 0.08);
  }
}

.cost-table-header {
  padding: 16px;
  background: var(--olive-green);
  color: var(--white);
  border-bottom: 1px solid rgba(39, 31, 24, 0.08);
}

.cost-table-column:first-child .cost-table-header {
  background: var(--olive-green);
}

.cost-table-column:last-child .cost-table-header {
  background: var(--yunda-maple);
}

.cost-table-body {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
}

.cost-table-expand {
  padding: 16px;
  border-top: 1px solid rgba(39, 31, 24, 0.08);
  background: rgba(250, 247, 242, 0.9);
}

.cost-breakdown-split {
  display: grid;
  gap: 24px;
}

.cost-breakdown-section .h3-text,
.cost-breakdown-section .row-title,
.cost-breakdown-section .row-desc,
.cost-breakdown-section .row-sub,
.cost-breakdown-section .cost-table-expand summary {
  color: var(--yunda-bark);
}

.cost-breakdown-section .amount-badge,
.cost-breakdown-section .donut-legend,
.cost-breakdown-section .segmented-button {
  color: var(--olive-green);
}

.cost-breakdown-section .segmented-active {
  background: var(--olive-green);
  border-color: var(--olive-green);
  color: #fff;
}

.cost-breakdown-section .subtle-card .small-text {
  color: var(--olive-green);
}

.cost-breakdown-section .amount-badge {
  background: color-mix(in srgb, var(--olive-green) 18%, transparent);
}

@media (min-width: 1200px) {
  .cost-breakdown-split {
    grid-template-columns: 5fr 1fr;
    align-items: start;
  }
}

.viz-card .chart-slot {
  min-height: 320px;
  margin-top: 16px;
}

.viz-body {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

@media (min-width: 1024px) {
  .viz-body {
    grid-template-columns: 1fr;
  }
}

.cost-donut {
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  background: conic-gradient(
    var(--olive-green) 0deg calc(var(--p1) * 1deg * 3.6),
    var(--yunda-maple) calc(var(--p1) * 1deg * 3.6) calc((var(--p1) + var(--p2)) * 1deg * 3.6),
    rgba(169, 108, 66, 0.65) calc((var(--p1) + var(--p2)) * 1deg * 3.6)
      calc((var(--p1) + var(--p2) + var(--p3)) * 1deg * 3.6),
    rgba(169, 108, 66, 0.35) calc((var(--p1) + var(--p2) + var(--p3)) * 1deg * 3.6)
      calc((var(--p1) + var(--p2) + var(--p3) + var(--p4)) * 1deg * 3.6),
    rgba(117, 123, 88, 0.35) calc((var(--p1) + var(--p2) + var(--p3) + var(--p4)) * 1deg * 3.6) 360deg
  );
  mask: radial-gradient(circle at center, transparent 48%, black 49%);
  box-shadow: inset 0 0 0 1px rgba(39, 31, 24, 0.08);
}

.donut-legend {
  display: grid;
  gap: 6px;
  padding: 0;
  margin: 0;
  list-style: none;
  font-size: 0.95rem;
  color: rgba(39, 31, 24, 0.85);
}

.donut-legend li {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  display: inline-block;
}

.dot-fixed {
  background: var(--olive-green);
}
.dot-comp {
  background: var(--yunda-maple);
}
.dot-ins {
  background: rgba(169, 108, 66, 0.65);
}
.dot-allow {
  background: rgba(169, 108, 66, 0.35);
}
.dot-embryo {
  background: rgba(117, 123, 88, 0.35);
}
.cost-line-compact {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(39, 31, 24, 0.06);
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 12px;
}

.cost-line-compact:last-child {
  border-bottom: none;
}

.cost-line-left {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
}

.cost-dot {
  width: 20px;
  height: 24px;
  margin-top: 0;
  border-radius: 10px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(220, 230, 240, 0.9));
  border: 1px solid rgba(26, 76, 143, 0.45);
  position: relative;
  box-shadow: 0 4px 10px rgba(26, 76, 143, 0.18);
}

.cost-dot-variable {
  border-color: rgba(179, 130, 91, 0.45);
  box-shadow: 0 2px 6px rgba(179, 130, 91, 0.2);
}

.cost-dot::after {
  content: '';
  position: absolute;
  left: 4px;
  top: 5px;
  width: 6px;
  height: 10px;
  border: solid rgba(26, 76, 143, 0.9);
  border-width: 0 2px 2px 0;
  transform: rotate(35deg);
}

.cost-dot-variable::after {
  border-color: rgba(179, 130, 91, 0.9);
}

.row-title {
  font-weight: 700;
  color: var(--yunda-bark);
}

.row-desc {
  font-size: 0.95rem;
  color: rgba(39, 31, 24, 0.8);
}

.row-sub {
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
  color: rgba(39, 31, 24, 0.78);
}

.row-sub li {
  font-size: 0.92rem;
}

.amount-fixed,
.amount-variable {
  font-weight: 700;
  min-width: 28%;
  font-size: 1.1rem;
  font-weight: 800;
  text-align: right;
  align-self: center;
  flex-shrink: 0;
}

.amount-fixed {
  background: rgba(26, 76, 143, 0.1);
  color: #1a4c8f;
  border: 1px solid rgba(26, 76, 143, 0.25);
}

.amount-variable {
  background: rgba(179, 130, 91, 0.12);
  color: #8d5f3d;
  border: 1px solid rgba(179, 130, 91, 0.2);
}

.download-icon {
  height: 48px;
  width: 48px;
  border-radius: 12px;
  background: rgba(169, 108, 66, 0.12);
  border: 1px solid rgba(169, 108, 66, 0.3);
}

.footer-cta {
  display: grid;
  gap: 24px;
}

@media (min-width: 1024px) {
  .footer-cta {
    grid-template-columns: 2fr 1fr;
    align-items: center;
  }
}

.footer-cta-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.footer-cta-image {
  border-radius: 16px;
  min-height: 200px;
  background: image-set(
    url('/images/ip/How-Surrogacy-Agreements.webp') type('image/webp'),
    url('/images/ip/How-Surrogacy-Agreements.jpg') type('image/jpeg')
  ) center/cover no-repeat;
  border: 1px solid rgba(39, 31, 24, 0.1);
  background-size: cover;
  background-position: center;
}

.why-cta {
  display: grid;
  gap: 16px;
}

@media (min-width: 1024px) {
  .why-cta {
    grid-template-columns: 1fr;
  }
}

.why-cta-content {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.why-cta-image {
  border-radius: 16px;
  min-height: 220px;
  background: linear-gradient(135deg, rgba(169, 108, 66, 0.2), rgba(251, 240, 218, 0.7));
  border: 1px solid rgba(39, 31, 24, 0.1);
  background-size: cover;
  background-position: center;
}

@media (max-width: 767px) {
  .why-cta-image {
    min-height: 180px;
  }
}

.why-viz {
  border-radius: 16px;
  min-height: 320px;
  background: linear-gradient(135deg, rgba(169, 108, 66, 0.1), rgba(251, 240, 218, 0.6));
  border: 1px dashed rgba(39, 31, 24, 0.15);
  background-size: cover;
  background-position: center;
}

@media (max-width: 767px) {
  .why-viz {
    min-height: 220px;
  }
}

.faq-banner {
  border-radius: 16px;
  min-height: 220px;
  background: linear-gradient(135deg, rgba(191, 201, 191, 0.3), rgba(251, 240, 218, 0.6));
  border: 1px dashed rgba(39, 31, 24, 0.15);
  background-size: cover;
  background-position: center;
}

@media (max-width: 767px) {
  .faq-banner {
    min-height: 160px;
  }
}

.download-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.faq-search {
  width: min(100%, 520px);
  min-width: 240px;
  border-radius: 12px;
  border: 1px solid rgba(39, 31, 24, 0.2);
  padding: 0.6rem 0.8rem;
  background: rgba(255, 255, 255, 0.95);
  font-size: 0.95rem;
}

.faq-search:focus-visible {
  outline: 2px solid rgba(169, 108, 66, 0.3);
  outline-offset: 2px;
}

.faq-grid {
  display: grid;
  gap: 16px;
}

@media (min-width: 768px) {
  .faq-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: repeat(5, auto);
    grid-auto-flow: column;
    gap: 24px;
  }
}

.cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 767px) {
  .cta-group {
    flex-direction: column;
    align-items: stretch;
  }
}

.gradient-strip {
  height: 160px;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  background: linear-gradient(180deg, rgba(251, 240, 218, 0.2), rgba(191, 201, 191, 0.5), rgba(251, 240, 218, 0.2));
}

.card {
  border-radius: 16px;
  padding: 24px;
  border: 1px solid rgba(169, 166, 125, 0.3);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 12px 28px rgba(39, 31, 24, 0.08);
}

.card.cost-table {
  padding: 0;
}

@media (max-width: 767px) {
  .card {
    padding: 20px;
  }
}

.outline-card {
  background: rgba(255, 255, 255, 0.92);
}

.subtle-card {
  background: rgba(250, 247, 242, 0.85);
}

.trust-card {
  transition:
    box-shadow 0.2s ease,
    border-color 0.2s ease;
}

.trust-card:hover {
  border-color: rgba(169, 108, 66, 0.5);
  box-shadow: 0 16px 32px rgba(39, 31, 24, 0.12);
}

.h1-text {
  font-family: var(--font-display);
  font-size: 2.375rem;
  line-height: 1.1;
  font-weight: 600;
  color: var(--yunda-bark);
}

@media (min-width: 1024px) {
  .h1-text {
    font-size: 3.125rem;
  }
}

.h2-text {
  font-family: var(--font-display);
  font-size: 1.875rem;
  line-height: 1.15;
  font-weight: 500;
  color: var(--yunda-bark);
}

@media (min-width: 1024px) {
  .h2-text {
    font-size: 2.25rem;
  }
}

.h3-text {
  font-family: var(--font-text);
  font-size: 1.25rem;
  line-height: 1.25;
  font-weight: 700;
  color: var(--yunda-bark);
}

@media (min-width: 1024px) {
  .h3-text {
    font-size: 1.5rem;
  }
}

.body-text {
  font-family: var(--font-text);
  font-size: 1rem;
  line-height: 1.75;
  color: var(--yunda-bark);
}

@media (min-width: 1024px) {
  .body-text {
    font-size: 1.0625rem;
  }
}

.small-text {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.micro-text {
  font-size: 0.75rem;
  line-height: 1rem;
}

.cta-strip {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
}

@media (min-width: 1024px) {
  .cta-strip {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.cta-strip-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.anchor-nav-wrapper {
  position: sticky;
  top: 5rem;
  z-index: 40;
  margin-top: 32px;
  border-color: rgba(255, 255, 255, 0.18);
  background: var(--yunda-bark);
}

@media (min-width: 768px) {
  .anchor-nav-wrapper {
    top: 6.25rem;
    margin-top: 40px;
  }
}

.anchor-nav {
  display: flex;
  gap: 12px;
  overflow-x: auto;
  padding: 16px 0;
  font-family: var(--font-text);
}

@media (min-width: 768px) {
  .anchor-nav {
    justify-content: space-between;
  }
}

.anchor-pill {
  border: none;
  border-radius: 0;
  padding: 0.65rem 0.95rem;
  font-size: 1rem;
  font-family: var(--font-text);
  white-space: nowrap;
  transition: all 0.2s ease;
  color: var(--yunda-petal);
  background: transparent;
  cursor: pointer;
  font-weight: 600;
}

.anchor-pill-active {
  color: var(--yunda-petal);
  text-decoration: underline;
  text-underline-offset: 6px;
}

.anchor-pill:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.4);
  outline-offset: 2px;
}

.btn-primary {
  font-family: var(--font-text);
  background: var(--yunda-bark);
  color: var(--yunda-petal);
  border-radius: 12px;
  padding: 0.75rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 24px rgba(39, 31, 24, 0.2);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 6px 14px rgba(39, 31, 24, 0.18);
}

.btn-primary.is-disabled,
.btn-primary[aria-disabled='true'],
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.btn-primary:focus-visible {
  outline: 2px solid rgba(169, 108, 66, 0.35);
  outline-offset: 2px;
}

.btn-secondary {
  font-family: var(--font-text);
  border: 2px solid var(--yunda-bark);
  color: var(--yunda-bark);
  background: rgba(255, 255, 255, 0.92);
  border-radius: 12px;
  padding: 0.75rem 1.25rem;
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
}

.btn-secondary:hover {
  transform: translateY(-1px);
  border-color: var(--yunda-maple);
  color: var(--yunda-bark);
  background: color-mix(in srgb, var(--yunda-maple) 14%, var(--yunda-petal) 86%);
}

.btn-secondary:active {
  transform: translateY(0);
  box-shadow: 0 6px 14px rgba(39, 31, 24, 0.12);
}

.btn-secondary.is-disabled,
.btn-secondary[aria-disabled='true'],
.btn-secondary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
  transform: none;
}

.btn-secondary:focus-visible {
  outline: 2px solid rgba(169, 108, 66, 0.3);
  outline-offset: 2px;
}

.btn-tertiary {
  border: 1px solid rgba(39, 31, 24, 0.2);
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  background: transparent;
  cursor: pointer;
}

.btn-tertiary:hover {
  background: rgba(169, 108, 66, 0.1);
}

.segmented-button {
  border: 1px solid rgba(39, 31, 24, 0.2);
  border-radius: 999px;
  padding: 0.4rem 1rem;
  font-size: 0.85rem;
  transition: all 0.2s ease;
  background: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

.segmented-active {
  background: var(--light-cream);
  border-color: rgba(169, 108, 66, 0.5);
  box-shadow: 0 6px 16px rgba(39, 31, 24, 0.12);
}

.cost-line {
  transition:
    background 0.2s ease,
    box-shadow 0.2s ease;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(39, 31, 24, 0.08);
  background: rgba(255, 255, 255, 0.8);
}

.cost-line:hover {
  background: rgba(251, 240, 218, 0.4);
  box-shadow: 0 10px 20px rgba(39, 31, 24, 0.1);
}

.amount-badge {
  border-radius: 999px;
  padding: 0.3rem 0.9rem;
  font-size: 1.5rem;
  font-weight: 1000;
  background: rgba(169, 108, 66, 0.1);
  color: var(--yunda-maple);
  white-space: nowrap;
}

.info-dot {
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 999px;
  border: 1px solid rgba(39, 31, 24, 0.2);
  font-size: 0.75rem;
  line-height: 1.25rem;
  text-align: center;
  color: var(--yunda-maple);
  background: white;
}

.tooltip-bubble {
  position: absolute;
  left: 0;
  top: 1.5rem;
  z-index: 10;
  width: 220px;
  padding: 0.6rem 0.8rem;
  background: white;
  border: 1px solid rgba(39, 31, 24, 0.2);
  border-radius: 0.75rem;
  box-shadow: 0 8px 20px rgba(39, 31, 24, 0.15);
  font-size: 0.85rem;
}

.why-grid {
  display: grid;
  gap: 20px;
}

@media (min-width: 1024px) {
  .why-grid {
    grid-template-columns: 3fr 2fr;
    align-items: stretch;
  }
}

.why-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.why-item {
  border: 1px solid rgba(39, 31, 24, 0.1);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 8px 20px rgba(39, 31, 24, 0.08);
  padding: 12px 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.why-item:hover {
  box-shadow: 0 10px 24px rgba(39, 31, 24, 0.12);
  transform: translateY(-1px);
}

.why-item-active {
  border-color: rgba(169, 108, 66, 0.5);
  box-shadow: 0 12px 26px rgba(169, 108, 66, 0.16);
}

.why-item-head {
  display: flex;
  align-items: center;
  gap: 12px;
}

.why-badge {
  height: 32px;
  min-width: 32px;
  padding: 0 10px;
  border-radius: 10px;
  background: var(--yunda-maple);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  box-shadow: 0 6px 14px rgba(169, 108, 66, 0.18);
}

.why-title {
  font-weight: 700;
  color: var(--yunda-bark);
  flex: 1;
}

.why-chevron {
  color: rgba(39, 31, 24, 0.4);
  font-size: 1.4rem;
}

.why-body {
  margin-top: 10px;
  padding-left: 44px;
}

.why-cta-hero {
  position: relative;
  min-height: 280px;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  background-image:
    linear-gradient(180deg, rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.35)),
    image-set(
      url('/images/ip/surrogacy-expensive.webp') type('image/webp'),
      url('/images/ip/surrogacy-expensive.jpeg') type('image/jpeg')
    );
  background-size: cover;
  background-position: center;
  box-shadow: 0 12px 28px rgba(39, 31, 24, 0.12);
}

.why-cta-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    120deg,
    rgba(255, 255, 255, 0.8),
    rgba(255, 255, 255, 0.6) 55%,
    rgba(255, 255, 255, 0) 85%
  );
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: center;
}

.payment-header-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.payment-grid {
  display: grid;
  gap: 12px;
}

@media (min-width: 1024px) {
  .payment-grid {
    grid-template-columns: 1.2fr 0.6fr 1.6fr 1fr;
    align-items: start;
  }
}

.payment-cell {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cell-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(39, 31, 24, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.cell-body {
  font-size: 1rem;
  color: var(--yunda-bark);
  line-height: 1.5rem;
}

.cell-amount {
  font-family: var(--font-display, Georgia, serif);
  font-size: clamp(1.75rem, 3vw, 2.35rem);
  font-weight: 700;
  line-height: 1.1;
  color: var(--yunda-maple);
}

.cell-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 4px;
  color: var(--yunda-bark);
}

.cell-sub {
  margin: 4px 0 0 1rem;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 2px;
  font-size: 0.9rem;
  color: rgba(39, 31, 24, 0.7);
}

.reason-number {
  height: 2.5rem;
  width: 2.5rem;
  border-radius: 999px;
  background: rgba(169, 108, 66, 0.15);
  color: var(--yunda-maple);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.accordion-icon {
  font-size: 0.85rem;
  transition: transform 0.2s ease;
  color: var(--yunda-maple);
}

.accordion-open {
  transform: rotate(180deg);
}

details > summary {
  list-style: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

details > summary::-webkit-details-marker {
  display: none;
}

details > summary::after {
  content: '+';
  font-size: 1.25rem;
  color: var(--yunda-maple);
}

details[open] > summary::after {
  content: '-';
}

.sticky-cta {
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 50;
}

.sticky-cta-mobile {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  gap: 0.5rem;
  padding: 0.75rem 0.75rem calc(0.75rem + env(safe-area-inset-bottom));
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 -8px 20px rgba(39, 31, 24, 0.12);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(16px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-fast-enter-active,
.fade-fast-leave-active {
  transition: opacity 0.18s ease-out;
}

.fade-fast-enter-from,
.fade-fast-leave-to {
  opacity: 0;
}

.scroll-animate-init {
  opacity: 0;
  transform: translateY(12px);
  transition:
    opacity 250ms ease-out,
    transform 250ms ease-out;
}

.scroll-animate.animate-in {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .scroll-animate-init,
  .scroll-animate.animate-in,
  .slide-up-enter-active,
  .slide-up-leave-active,
  .fade-enter-active,
  .fade-leave-active,
  .fade-fast-enter-active,
  .fade-fast-leave-active,
  .btn-primary,
  .btn-secondary,
  .btn-tertiary,
  .segmented-button,
  .cost-line,
  .timeline-step,
  .accordion-icon,
  .hero-banner {
    transition: none !important;
  }

  .scroll-animate-init,
  .scroll-animate.animate-in {
    opacity: 1 !important;
    transform: none !important;
  }

  .btn-primary:hover,
  .btn-secondary:hover,
  .timeline-step:hover,
  .hero-banner:hover {
    transform: none !important;
  }

  .slide-up-enter-from,
  .slide-up-leave-to {
    transform: none;
  }
}
</style>

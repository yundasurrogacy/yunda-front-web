<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { buildCoreServicePageSchemas } from '~/utils/schema'

useScrollAnimation()

const { locale } = useI18n()
const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en: string, zh: string) => (isZh.value ? zh : en)
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const pageTitle = computed(() => tt(
  'California Surrogacy Consultation | Yunda Surrogacy USA | Transparent Pricing',
  '加州代孕咨询｜Yunda Surrogacy 美国代孕机构｜费用明细透明',
))

const pageDescription = computed(() => tt(
  'California surrogacy consultation for Chinese families: surrogate matching, transparent fees, and timeline planning, with PBO parentage support. Submit the form to receive a pricing checklist.',
  '面向华人家庭的加州代孕咨询：代母筛选匹配、费用明细与时间线透明；协同律师办理PBO亲权。提交表单获取报价清单。',
))

useHead(() => ({
  title: pageTitle.value,
  meta: [
    {
      name: 'description',
      content: pageDescription.value,
    },
  ],
}))

const localePath = useLocalePath()
const qualificationUrl = computed(() => localePath('/be-surrogate'))

const heroPoints = computed(() => [
  tt('Transparent costs: clear cost structure and budgeting, managed by milestones via escrow.', '费用透明：提供清晰的费用构成与预算规划，按里程碑节点管理资金（Escrow）。'),
  tt('California resources coordinated: IVF clinics, counseling, and insurance partners reduce information gaps.', '加州资源协同：对接生殖诊所、心理支持与保险等第三方团队，减少信息差。'),
  tt('Chinese support: Mandarin communication and translation support (including with the surrogate).', '中文沟通更省心：支持普通话沟通与翻译协助（含与代母沟通）。'),
])

const _painPoints = computed(() => [
  tt('How much does surrogacy cost? What’s included and excluded?', '代孕多少钱？代孕费用包含哪些/不包含哪些？'),
  tt('Is surrogacy legal in the U.S.? Is California law stable? Which states are legal?', '美国代孕合法吗？加州代孕法律是否稳定？合法的州怎么选？'),
  tt('How are surrogates screened? What if matching fails?', '代母/代孕妈妈怎么筛选？匹配失败怎么办？'),
  tt('How long does the process take? What happens at each step and what documents are needed?', '代孕流程要多久？每个节点要做什么、需要准备什么材料？'),
])

const offering = computed(() => [
  tt('Surrogate screening & matching management: background, health screening, communication style, and match pace.', '代母筛选与匹配管理：围绕背景、健康筛查、沟通风格与匹配节奏做项目管理。'),
  tt('Cost breakdown & budget control: split total cost into clear modules and manage by milestones.', '费用明细与预算控制：把总费用拆成可理解的模块，并用里程碑节点推进与提醒。'),
  tt('Process timeline planning: from evaluation to matching, medical milestones to post-birth documents.', '代孕流程时间线规划：从评估到匹配、医疗节点到分娩后文件处理，给到清晰路径。'),
  tt('Legal coordination (PBO/parentage): move legal steps and documents with attorney guidance.', '合作律师协同（PBO/亲权）：在律师专业指导下，推进亲权相关法律步骤与文件准备。'),
  tt('Cross-language support: Chinese advisor/translation to reduce communication costs with surrogates and clinics.', '跨语言沟通支持：中文顾问/翻译协助，减少与代母、诊所沟通成本。'),
  tt('Third-party coordination: clinics, counseling, insurance partners to reduce last-minute risks.', '第三方资源对接：诊所、心理支持与保险等协同，降低“临时找人”的风险。'),
])

const processSteps = computed(() => [
  tt('Submit a consultation form: embryos ready? timing? budget focus.', '提交咨询表单：说明是否已有胚胎/预计时间/预算关注点'),
  tt('Initial assessment & plan: confirm state choice, key steps, and cost structure.', '初步评估与方案建议：确认州选择、流程节点与大致费用结构'),
  tt('Surrogate screening & matching: align standards, timing, and risks.', '代母筛选与匹配：沟通匹配标准、时间预期与风险点'),
  tt('Sign legal documents: complete agreement and parentage steps with counsel. (Surrogate Steps® |)', '签署法律文件：在各自律师代表下完成协议与亲权相关步骤 (Surrogate Steps® |)'),
  tt('Medical stage: follow clinic schedule for transfer and pregnancy coordination.', '医疗阶段推进：按诊所安排进入移植与孕期管理协同'),
  tt('Birth & post-birth documents: prepare paperwork and discharge plan.', '分娩与后续文件：按流程准备相关文件与出院后安排'),
])

const installmentSteps = computed(() => [
  {
    title: tt('Installment 1: After medical records pre-review is approved → $42,400 into escrow', '第一期：医疗记录预审核通过后 → $42,400 存入 Escrow'),
    items: [
      tt('Project Management & Service Support (Part 1): $35,000', '项目管理与服务支持（第一部分）：$35,000'),
      tt('Surrogate recruitment, screening, matching, and early-stage project coordination', '代孕母招募、筛选、匹配与前期项目协调'),
      tt('Psychological Evaluation: $2,500', '心理评估：$2,500'),
      tt('Surrogate Background Check: $900', '代孕母背景调查：$900'),
      tt('Escrow (Trust Account) Management Service: $2,000', '信托账户管理服务：$2,000'),
      tt('Insurance Review & Administration (professional review/management): $2,000', '医疗保险专业审核与管理：$2,000'),
      tt('Required travel expenses during medical screening stage: actual cost (escrow deposit; over/under adjusted)', '医疗筛查阶段产生的必要差旅费用：实报实销（存入预存金，多退少补）'),
    ],
  },
  {
    title: tt('Installment 2: After legal documents take effect (surrogacy agreement notarized) → $66,850 into escrow', '第二期：法律文件正式生效（代孕协议公证完成）后 → $66,850 存入 Escrow'),
    items: [
      tt('Project Management & Service Support (Part 2): $15,000', '项目管理与服务支持（第二部分）：$15,000'),
      tt('Surrogacy Agreement Drafting & Review: $3,750', '代孕协议起草与审核：$3,750'),
      tt('Surrogate Attorney Contract Review: $1,500', '代孕母律师合同审核：$1,500'),
      tt('Base Surrogate Compensation (Part 1): $30,000', '基础补偿金（第一部分）：$30,000'),
      tt('Surrogate Benefits Support Plan: $11,000', '代孕母福利支持方案：$11,000'),
      tt('Surrogate Life Insurance: $600 (reimbursed / actual cost)', '代孕母人寿保险：$600（实报实销）'),
      tt('Surrogate Medical Insurance Premium (Part 1): $5,000 (reimbursed / actual cost)', '代孕母医疗保险保费（第一部分）：$5,000（实报实销）'),
      tt('Required travel expenses related to the embryo transfer cycle: actual cost (escrow deposit; over/under adjusted)', '胚胎移植周期相关的必要差旅费用：实报实销（存入预存金，多退少补）'),
    ],
  },
  {
    title: tt('Installment 3: After pregnancy confirmation (heartbeat confirmed) → $33,500 into escrow', '第三期：妊娠确认（心跳确认）后 → $33,500 存入 Escrow'),
    items: [
      tt('Pregnancy Cycle Management Fee: $5,000', '孕期内周期管理费：$5,000'),
      tt('Pre-birth Parentage Legal Service: $3,500', '出生前亲权法律服务：$3,500'),
      tt('Base Surrogate Compensation (remaining): $20,000', '基础补偿金（剩余部分）：$20,000'),
      tt('Surrogate Medical Insurance Premium (remaining): $5,000 (reimbursed / actual cost)', '代孕母医疗保险保费（剩余部分）：$5,000（实报实销）'),
    ],
  },
])

const extraCosts = computed(() => [
  tt('Multiples compensation (paid only for multiples)', '多胎补偿（仅多胎时支付）'),
  tt('C-section compensation', '剖腹产补偿'),
  tt('Bed rest/childcare/home help (requires doctor note and receipts)', '卧床休息/托儿/家政补偿（需产科医生书面确认，且通常支付给第三方并提供单据）'),
  tt('Lost wages (based on pay stubs)', '工资损失（按代母工资条核算）'),
  tt('Breast milk stipend', '母乳补费'),
  tt('Other special cases (case-dependent)', '以及其他特殊情况（以实际个案为准）'),
])

const insurancePoints = computed(() => [
  tt('Insurance is purchased based on the surrogate’s location; if the best window is missed, we coordinate cash-pay (e.g., OB ~$5,000, delivery stay ~$8,000).', '代母保险会根据所在地情况购买；若错过合适购买时机，会协调自费方案（示例：产科医生约$5,000、分娩住院约$8,000的现金支付预估）'),
  tt('Even with primary/secondary insurance, out-of-pocket costs (deductibles, co-pays) may apply, so plan ahead.', '即使有主险/补充险，也可能存在自付部分（如免赔额、共付等），需提前预留预算'),
])

const whyYunda = computed(() => [
  {
    title: tt('Stricter surrogate screening (fewer surprises)', '代母筛选标准更严（更少踩雷）'),
    detail: tt('Materials show acceptance rate < 1%, with background, health, and psychological screening.', '材料显示：代母录取通过率低于 1%，筛查包含背景、健康与心理评估等'),
  },
  {
    title: tt('Dedicated project manager (ideal for cross-border families)', '全流程项目经理跟进（更适合跨境家庭）'),
    detail: tt('Each client gets a PM, key milestone reminders, cycle updates, and bilingual support.', '每位客户配备项目经理、关键节点提醒、周期汇报，并提供中英文支持'),
  },
  {
    title: tt('Transparent costs + escrow management (budget control)', '费用透明 + 信托账户管理（更符合“预算可控”诉求）'),
    detail: tt('Costs are clearly listed and managed with professional escrow partners.', '材料明确：费用清晰公示，并与专业信托账户协作管理资金'),
  },
  {
    title: tt('Coordinated network (smooth California / SoCal alignment)', '合作网络与资源协同（加州/南加州对接更顺）'),
    detail: tt('Team coordinates clinics, legal, insurance/escrow across key milestones.', '团队与诊所、法律、保险/信托等多方协作，覆盖周期关键节点'),
  },
])

const timelineSteps = computed(() => [
  tt('Initial consultation & needs assessment (align budget, state choice, timing)', '初步咨询 & 需求评估（留资后中文顾问对齐预算、州选择、时间预期）'),
  tt('Pre-checks & preparation (support screening in US/Asia)', '前期体检/材料准备（可协助你在美国/亚洲做前期筛查与调理衔接）'),
  tt('Cycle entry & clinic coordination (video consults, scheduling)', '进入周期 & 诊所协同（视频会诊、排期确认等）'),
  tt('Surrogate screening & matching (background, health, psych)', '代母筛选与匹配（按标准筛查背景、健康与心理评估）'),
  tt('Legal & escrow start (contracts + escrow funding by milestones)', '法律与资金托管启动（合同与信托账户托管，按节点付款更可控）'),
  tt('Frozen transfer & pregnancy confirmation (per clinic schedule)', '冻胚移植/验孕确认（按诊所安排推进）'),
  tt('Pregnancy management & updates (weekly/monthly reports, coordination)', '孕期管理 & 周期汇报（项目经理周报/月报、关键节点提醒、代母沟通协调）'),
  tt('Delivery & newborn handoff (incl. birth certificate support)', '分娩 & 新生儿交接（含出生证明协助等行政支持）'),
])

const faqItems = computed(() => [
  {
    q: tt('Is surrogacy legal in the U.S.? Why choose California?', '美国代孕合法吗？加州为什么被很多家庭选择？'),
    a: tt('U.S. rules vary by state. We have a network across 45 legal ART states and recommend the best fit for your case.', '美国各州规则不同。我们在美国45个辅助生殖合法州建立合作与招募网络，可根据你的家庭情况建议更合适的州与路径。'),
  },
  {
    q: tt('Where is your team based? Do you support Los Angeles locally?', '你们是哪里团队？是否有洛杉矶本地支持？'),
    a: tt('Yunda started in Los Angeles and is rooted in Southern California, serving global families with a one-stop ART platform.', '孕达发源于美国洛杉矶、扎根南加州，面向全球客户提供一站式辅助生殖服务平台。'),
  },
  {
    q: tt('How do you screen surrogates? How reliable is the process?', '代母/代孕妈妈怎么筛选？靠谱不靠谱怎么判断？'),
    a: tt('We follow strict screening; acceptance rate is below 1%, including background, health, and psychological assessments.', '我们对代母执行严格筛查，资料中明确：代母录取通过率低于1%，筛查包含背景、健康与心理评估等。'),
  },
  {
    q: tt('How much does California surrogacy cost? What’s included?', '加州代孕多少钱？费用一般怎么构成？'),
    a: tt('Families care most about transparency. Sample total cost is $15000+ (as listed), broken down by service, escrow, legal, insurance, and stipends.', '你们最关心的通常是代孕费用透明度。套餐示例总费用为 $15000+，并在费用表中拆分到服务费、信托管理费、法律费、保险与津贴等条目。'),
  },
  {
    q: tt('How do payments work? Why use escrow?', '费用怎么支付？为什么要用信托账户（Escrow）？'),
    a: tt('Payments are split into three escrow deposits: $56,850 after signing, $83,500 after medical clearance, $17,500 after heartbeat (maintain ≥ $10,000). This keeps funding controlled by milestones.', '费用按节点分三笔汇入信托账户：协议签署后$56,850、医学清关后$83,500、胎心确认后$17,500（并要求余额≥$10,000）。这样能把资金流向按节点管理，更可控。'),
  },
  {
    q: tt('What’s not included? (Avoid misunderstanding)', '哪些费用不包含？（避免后期误解）'),
    a: tt('Not included: IVF clinic fees and newborn hospital medical charges.', '费用表里明确提示：不包括试管婴儿诊所费用，也不包括宝宝出生后在医院产生的医疗费用。'),
  },
  {
    q: tt('Why can total cost vary? Common extra expenses?', '为什么总费用会浮动？常见“潜在额外费用”有哪些？'),
    a: tt('Quoted costs are estimates; unused amounts are reconciled and returned. Extra costs include multiples, C-section, bed rest/childcare/home help, lost wages, breast milk, etc.', '费用表说明这是预估报价，未发生费用会在周期结束核对后退还；同时列出多胎、剖腹产、卧床/托儿/家政、工资损失、母乳等“特殊情况费用”。'),
  },
  {
    q: tt('How is surrogate insurance planned? What if you miss enrollment?', '代母保险怎么规划？如果错过购买窗口怎么办？'),
    a: tt('If a plan can be purchased during open enrollment, we screen options; if missed, we coordinate cash-pay (e.g., OB ~$5,000, delivery stay ~$8,000). Co-pays/deductibles may still apply.', '资料说明：若在开放注册期能购买符合要求的保险，会筛选方案供选择；若错过时机，会协助沟通自费支付方案，并给出常见自费预估（如产科医生约$5,000、分娩住院约$8,000）。同时也提示主险/补充险不可能100%覆盖，仍可能产生共付额、免赔额等自付部分。'),
  },
  {
    q: tt('How do you keep us updated if we’re abroad?', '你们怎么跟进？我人在国内也能随时掌握进度吗？'),
    a: tt('Each client gets a PM for scheduling, milestones, surrogate coordination, and weekly/monthly updates plus 24/7 bilingual support.', '每位客户配备项目经理，负责行程安排、关键节点提醒、代母沟通协调；并提供每周/每月周期汇报与7×24小时中英文双语在线服务。'),
  },
  {
    q: tt('If the surrogate fails medical screening, do we rematch?', '如果代母医学筛查不合格，是否需要重新匹配？'),
    a: tt('Pricing includes rematch support if medical screening fails.', '服务价格目录中明确包含：如因医学筛查不合格导致代母需要重配，也在服务支持范围内。'),
  },
  {
    q: tt('How do parentage/legal steps work? Any fees?', '亲权/法律部分怎么做？是否有对应费用？'),
    a: tt('Fees include parentage order ($6,500) plus intended parents and surrogate attorney fees. Legal path depends on state and counsel.', '费用拆分中包含亲权相关费用条目（亲子权利判决费$6,500），并同时列出准父母律师费与代母律师费。具体法律路径以合作律师建议与州规则为准。'),
  },
  {
    q: tt('What support is provided after birth?', '宝宝出生后有哪些支持？（证件/行政协助）'),
    a: tt('Admin fee includes birth certificate assistance, translation, and administrative support to organize key documents.', '行政服务费条目包含“新生儿出生证明协助、文件翻译与行政支持”等，帮助你把出生后的关键材料整理到位。'),
  },
])

const expandedFaq = reactive<Record<string, boolean>>({})
const expandedCosts = ref(false)
const expandedInsurance = ref(false)

function toggleFaq(q: string) {
  expandedFaq[q] = !expandedFaq[q]
}
function goToQualification() {
  navigateTo(qualificationUrl.value)
}

const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: '/california-surrogacy-consultation',
  name: pageTitle.value,
  description: pageDescription.value,
  about: tt(
    'California surrogacy consultation for Chinese-speaking and international intended parents',
    '面向中文与国际准父母的加州代孕咨询',
  ),
  audience: [
    tt('Chinese-speaking intended parents', '中文准父母'),
    tt('International intended parents', '国际准父母'),
    tt('Families comparing California surrogacy costs', '正在比较加州代孕费用的家庭'),
  ],
  service: {
    name: tt('California Surrogacy Consultation', '加州代孕咨询'),
    description: tt(
      'Yunda provides consultation for surrogate screening and matching, transparent cost planning, process timeline guidance, legal coordination, escrow planning, insurance questions, and bilingual support.',
      '孕达提供代母筛选与匹配、透明费用规划、流程时间线指导、法律协调、托管规划、保险问题和双语支持相关咨询。',
    ),
    serviceType: tt('California surrogacy consultation services', '加州代孕咨询服务'),
    areaServed: ['California', 'United States', 'International intended parents'],
  },
  breadcrumbs: [
    { name: tt('Home', '首页'), url: '/' },
    { name: tt('Surrogate Resources', '代孕资源'), url: '/surrogate-requirements' },
    { name: tt('California Surrogacy Consultation', '加州代孕咨询'), url: '/california-surrogacy-consultation' },
  ],
  faqs: faqItems.value.map(item => ({
    question: item.q,
    answer: item.a,
  })),
  itemList: {
    name: tt('California surrogacy consultation process', '加州代孕咨询流程'),
    items: processSteps.value.map((step, index) => ({
      position: index + 1,
      name: step,
      url: '/california-surrogacy-consultation',
    })),
  },
  locale: locale.value,
}))

useHead(() => ({
  script: coreServicePageSchemas.value.map((schema, index) => ({
    key: `schema-california-surrogacy-consultation-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />

    <!-- Hero -->
    <section class="relative overflow-hidden from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b pb-16 pt-20">
      <div class="pointer-events-none absolute inset-0 opacity-40">
        <div class="absolute left-20 top-10 h-40 w-40 rounded-full bg-[var(--olive-green)] blur-[140px]" />
        <div class="absolute bottom-10 right-16 h-52 w-52 rounded-full bg-[var(--primary-brown)]/70 blur-[180px]" />
      </div>
      <div class="relative mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div class="space-y-6">
            <div class="inline-flex items-center gap-2 rounded-full bg-[var(--primary-brown)]/10 px-3 py-1 text-3 text-[var(--primary-brown)] font-semibold">
              {{ tt('California Surrogacy Consultation | U.S. Agency (Chinese Support)', '加州代孕咨询｜美国代孕机构（中文顾问）') }}
            </div>
            <h1 class="text-8 font-semibold leading-tight lg:text-11" >
              {{ tt('California Surrogacy Consultation | U.S. Agency (Chinese Support)', '加州代孕咨询｜美国代孕机构（中文顾问）') }}
            </h1>
            <p class="text-4.5 leading-relaxed">
              {{ tt('Surrogacy consultation for Chinese families: surrogate screening & matching, cost breakdown, and process timeline, with California PBO parentage steps guided by partner attorneys—clear and controllable at every stage.', '面向华人家庭的美国代孕咨询服务：围绕代母筛选与匹配、代孕费用明细、代孕流程时间线，并在合作律师指导下推进加州 PBO 亲权流程，让每一步更清晰、更可控。') }}
            </p>
            <div class="grid gap-3 sm:grid-cols-3">
              <div
                v-for="point in heroPoints"
                :key="point"
                class="flex items-start gap-3 rounded-5 bg-white/80 p-4 shadow-sm"
              >
                <div class="h-8 w-8 flex items-center justify-center rounded-full bg-[var(--primary-brown)]/10 text-[var(--primary-brown)] font-semibold">
                  ✓
                </div>
                <p class="text-3.75 leading-relaxed">
                  {{ point }}
                </p>
              </div>
            </div>
            <div class="flex flex-wrap gap-4">
              <button
                class="border border-[var(--primary-brown)] rounded-full px-6 py-3 text-3.5 font-semibold uppercase transition hover:bg-white"
                @click="goToQualification"
              >
                {{ tt('Share your needs to receive the process & document checklist', '留下需求，发送流程节点与材料清单') }}
              </button>
            </div>
            <p class="text-3.5 text-[var(--primary-brown)]/80">
              {{ tt('After you submit, we send: process milestone checklist + document list (ideal for first-time U.S. surrogacy families).', '留下信息后，我们会发送： 流程节点清单 + 需要准备的材料清单（适合首次了解美国代孕的家庭）。') }}
            </p>
          </div>
          <div class="rounded-6 bg-white/90 p-6 shadow-xl backdrop-blur">
            <div class="aspect-video w-full overflow-hidden rounded-4 bg-[var(--yunda-petal)]">
              <img src="/images/landingpage3/surrogacy-consultation.jpg" :alt="tt('California Surrogacy Consultation', '加州代孕咨询')" class="h-full w-full object-cover">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 我们能提供什么 -->
    <section class="py-16 lg:py-20">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="text-center">
          <h2 class="text-7 font-semibold lg:text-8" >
            {{ tt('Yunda turns complex California surrogacy into a controllable, manageable plan', 'Yunda 在加州代孕咨询中，重点帮你把“复杂”变成“可控”') }}
          </h2>
        </div>
        <div class="grid mt-10 gap-6 md:grid-cols-2">
          <div
            v-for="item in offering"
            :key="item"
            class="flex items-start gap-3 border border-[var(--olive-green)]/40 rounded-6 bg-white/90 p-5 shadow-sm"
          >
            <div class="mt-1 h-8 w-8 flex items-center justify-center rounded-full bg-[var(--primary-brown)]/10 text-[var(--primary-brown)] font-semibold">
              ✓
            </div>
            <p class="text-4 leading-relaxed">
              {{ item }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 流程概览 -->
    <section class="bg-[var(--yunda-petal)] py-16 lg:py-20">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-7 font-semibold lg:text-8" >
            {{ tt('U.S. Surrogacy Process', '美国代孕流程') }}
          </h2>
        </div>
        <div class="grid mt-8 gap-6 md:grid-cols-2">
          <div
            v-for="(step, idx) in processSteps"
            :key="step"
            class="flex items-start gap-4 rounded-6 bg-white p-5 shadow"
          >
            <div class="h-10 w-10 flex items-center justify-center rounded-full bg-[var(--primary-brown)] text-white font-bold">
              {{ idx + 1 }}
            </div>
            <p class="text-4 leading-relaxed">
              {{ step }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 费用透明 -->
    <section class="py-16 lg:py-20">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-7 font-semibold lg:text-8" >
            {{ tt('How much does California surrogacy cost? How to break down and pay with confidence', '加州代孕多少钱？费用怎么拆、怎么付更安心') }}
          </h2>
        </div>
        <p class="mt-4 text-4 leading-relaxed">
          {{ tt('We break U.S. surrogacy costs into a clear, controllable structure and manage funds in stages via escrow to avoid information gaps and budget surprises.', '我们把美国代孕费用拆成“可读、可控”的结构，并通过信托账户（Escrow）分阶段管理资金，避免信息差与预算失控。') }}
        </p>
        <div class="mt-6 border border-[var(--olive-green)]/40 rounded-6 bg-white p-6 shadow-lg">
          <p class="mt-3 text-3.5 text-[var(--primary-brown)]/80">
            {{ tt('Costs may vary by surrogate match and case specifics; final billing applies.', '不同代母匹配与个案情况会导致费用浮动，具体以实际账单为准。') }}
          </p>
          <div class="mt-6 space-y-4">
            <h3 class="text-5 font-semibold" >
              {{ tt('Three installment rhythm (budget by milestones)', '三笔打款节奏（让预算“按节点走”）') }}
            </h3>
            <div
              v-for="section in installmentSteps"
              :key="section.title"
              class="border border-[var(--olive-green)]/40 rounded-5 bg-[var(--yunda-petal)] p-5"
            >
              <p class="text-4.5 text-[var(--primary-brown)] font-semibold">
                {{ section.title }}
              </p>
              <ul class="mt-3 text-4 leading-relaxed space-y-2">
                <li
                  v-for="item in section.items"
                  :key="item"
                  class="flex items-start gap-2"
                >
                  <span class="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--primary-brown)]" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="mt-5 rounded-5 bg-[var(--yunda-petal)]/80 p-4 text-4 leading-relaxed">
            <p class="text-[var(--primary-brown)] font-semibold">
              {{ tt('What’s not included?', '哪些费用不包含？') }}
            </p>
            <p class="mt-2">
              {{ tt('IVF clinic fees and newborn hospital charges are not included.', '不包含试管婴儿诊所费用；不包含宝宝出生后在医院产生的医疗费用。') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 额外费用与保险 -->
    <section class="bg-[var(--yunda-petal)] py-16 lg:py-20">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="grid gap-8 lg:grid-cols-2">
          <div class="rounded-6 bg-white p-6 shadow-lg">
            <div class="flex items-center justify-between">
              <h2 class="text-6 font-semibold" >
                {{ tt('What situations increase costs?', '哪些情况会增加费用？') }}
              </h2>
              <button class="text-3.5 text-[var(--primary-brown)] underline" @click="expandedCosts = !expandedCosts">
                {{ expandedCosts ? tt('Collapse', '收起') : tt('Expand', '展开') }}
              </button>
            </div>
            <p class="mt-2 text-4 leading-relaxed">
              {{ tt('Different surrogates and cases may trigger extra costs. Common examples:', '不同代母与个案会触发额外费用，常见包括（示例清单）：') }}
            </p>
            <Transition name="fade">
              <ul v-if="expandedCosts" class="mt-4 text-4 leading-relaxed space-y-2">
                <li v-for="item in extraCosts" :key="item" class="flex items-start gap-2">
                  <span class="mt-1 h-2 w-2 rounded-full bg-[var(--primary-brown)]" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </Transition>
          </div>
          <div class="rounded-6 bg-white p-6 shadow-lg">
            <div class="flex items-center justify-between">
              <h2 class="text-6 font-semibold" >
                {{ tt('How is surrogate insurance handled?', '代母保险怎么处理？') }}
              </h2>
              <button class="text-3.5 text-[var(--primary-brown)] underline" @click="expandedInsurance = !expandedInsurance">
                {{ expandedInsurance ? tt('Collapse', '收起') : tt('Expand', '展开') }}
              </button>
            </div>
            <Transition name="fade">
              <ul v-if="expandedInsurance" class="mt-4 text-4 leading-relaxed space-y-2">
                <li v-for="item in insurancePoints" :key="item" class="flex items-start gap-2">
                  <span class="mt-1 h-2 w-2 rounded-full bg-[var(--primary-brown)]" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </Transition>
            <p class="mt-4 rounded-5 bg-[var(--yunda-petal)]/70 p-3 text-3.75 text-[var(--primary-brown)]">
              {{ tt('Mini CTA: leave your budget/state/embryo status in the form to get a custom cost range and risk checklist.', '小 CTA：表单留言“预算/州/是否已有胚胎”，获取你的专属费用区间与风险点清单') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 为什么选择 Yunda -->
    <section class="py-16 lg:py-20">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-7 font-semibold lg:text-8" >
            {{ tt('Founded in Los Angeles, we manage every step like a deliverable project', '作为洛杉矶起家的美国代孕机构，我们把每一步做成可交付的“项目管理”') }}
          </h2>
        </div>
        <p class="mt-2 text-4 leading-relaxed">
          {{ tt('You’re not buying a “promise”—you’re buying process management, compliant coordination, and transparent delivery.', '你不是在买一个“承诺”，而是在买一套流程管理 + 合规协同 + 透明交付的能力。') }}
        </p>
        <div class="grid mt-8 gap-6 md:grid-cols-2">
          <div
            v-for="item in whyYunda"
            :key="item.title"
            class="border border-[var(--olive-green)]/40 rounded-6 bg-white/95 p-6 shadow"
          >
            <h3 class="text-5 text-[var(--primary-brown)] font-semibold" >
              {{ item.title }}
            </h3>
            <p class="mt-2 text-4 leading-relaxed">
              {{ item.detail }}
            </p>
          </div>
        </div>
        <div class="mt-8 flex flex-wrap gap-3">
          <button
            class="border border-[var(--primary-brown)] rounded-full px-6 py-3 text-3.5 text-[var(--primary-brown)] font-semibold uppercase transition hover:bg-white"
            @click="goToQualification"
          >
            {{ tt('Free Consultation (English/Chinese)', '免费中文咨询') }}
          </button>
        </div>
      </div>
    </section>

    <!-- 时间线 -->
    <section class="bg-[var(--yunda-petal)] py-16 lg:py-20">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-7 font-semibold lg:text-8" >
            {{ tt('California surrogacy timeline: key milestones at a glance', '加州代孕流程怎么走？关键节点一览') }}
          </h2>
        </div>
        <p class="mt-3 text-4 leading-relaxed">
          {{ tt('Many Chinese families want clarity on the process and accountability at each step. We break the journey into actionable milestones and provide weekly/monthly updates to reduce cross-border communication costs.', '很多华人家庭咨询加州代孕时，最想确认两件事：代孕流程是否清晰、每一步是否有人负责推进。我们把旅程拆成可执行的节点，并由项目经理按周/月更新进度，减少跨境沟通成本。') }}
        </p>
        <div class="grid mt-8 gap-4 md:grid-cols-2">
          <div
            v-for="(item, idx) in timelineSteps"
            :key="item"
            class="flex items-start gap-3 rounded-5 bg-white p-4 shadow-sm"
          >
            <div class="h-10 w-10 flex items-center justify-center rounded-full bg-[var(--primary-brown)] text-white font-bold">
              {{ idx + 1 }}
            </div>
            <p class="text-4 leading-relaxed">
              {{ item }}
            </p>
          </div>
        </div>
        <p class="mt-4 text-3.5 text-[var(--primary-brown)]/80">
          {{ tt('Actual timing depends on matching speed, clinic scheduling, and transfer attempts. After consultation, we provide a realistic milestone plan.', '实际时间线会受代母匹配速度、诊所排期、移植次数等影响。我们会在咨询后给你“可落地的节点计划”。') }}
        </p>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 lg:py-20">
      <div class="mx-auto max-w-240 px-5 lg:px-10">
        <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-7 font-semibold lg:text-8" >
            {{ tt('U.S. Surrogacy (California) FAQs', '美国代孕（加州）常见问题') }}
          </h2>
          <button
            class="rounded-full bg-[var(--primary-brown)] px-5 py-2.5 text-3.5 text-white font-semibold transition hover:bg-[var(--yunda-bark)]"
            @click="goToQualification"
          >
            {{ tt('Submit the form to receive details (advisor contact)', '提交表单领取（中文顾问对接）') }}
          </button>
        </div>
        <div class="space-y-3">
          <article
            v-for="item in faqItems"
            :key="item.q"
            class="border border-[var(--olive-green)]/40 rounded-6 bg-white/95 shadow-sm"
          >
            <button
              type="button"
              class="w-full flex items-center justify-between px-5 py-4 text-left"
              @click="toggleFaq(item.q)"
            >
              <span class="text-4.5 text-[var(--primary-brown)] font-semibold">{{ item.q }}</span>
              <span class="text-5 text-[var(--primary-brown)]">{{ expandedFaq[item.q] ? '−' : '+' }}</span>
            </button>
            <Transition name="fade">
              <div v-if="expandedFaq[item.q]" class="border-t border-[var(--olive-green)]/30 px-5 py-4 text-4 leading-relaxed">
                {{ item.a }}
              </div>
            </Transition>
          </article>
        </div>
        <div class="mt-8 flex flex-wrap gap-3">
          <button
            class="border border-[var(--primary-brown)] rounded-full px-6 py-3 text-3.5 text-[var(--primary-brown)] font-semibold uppercase transition hover:bg-[var(--yunda-petal)]"
            @click="goToQualification"
          >
            {{ tt('Submit the form to receive details (advisor contact)', '提交表单领取（中文顾问对接）') }}
          </button>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>

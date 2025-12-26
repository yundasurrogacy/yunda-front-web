<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

useHead({
  title: '加州/洛杉矶代孕咨询｜Yunda Surrogacy 美国代孕机构｜费用明细透明',
  meta: [
    {
      name: 'description',
      content: '面向华人家庭的加州/洛杉矶代孕咨询：代母筛选匹配、费用明细与时间线透明；协同律师办理PBO亲权。提交表单获取报价清单。',
    },
  ],
})

const heroPoints = [
  '费用透明：提供清晰的费用构成与预算规划，按里程碑节点管理资金（Escrow）。',
  '加州/洛杉矶资源协同：对接生殖诊所、心理支持与保险等第三方团队，减少信息差。',
  '中文沟通更省心：支持普通话沟通与翻译协助（含与代母沟通）。',
]

const painPoints = [
  '代孕多少钱？代孕费用包含哪些/不包含哪些？',
  '美国代孕合法吗？加州代孕法律是否稳定？合法的州怎么选？',
  '代母/代孕妈妈怎么筛选？匹配失败怎么办？',
  '代孕流程要多久？每个节点要做什么、需要准备什么材料？',
]

const offering = [
  '代母筛选与匹配管理：围绕背景、健康筛查、沟通风格与匹配节奏做项目管理。',
  '费用明细与预算控制：把总费用拆成可理解的模块，并用里程碑节点推进与提醒。',
  '代孕流程时间线规划：从评估到匹配、医疗节点到分娩后文件处理，给到清晰路径。',
  '合作律师协同（PBO/亲权）：在律师专业指导下，推进亲权相关法律步骤与文件准备。',
  '跨语言沟通支持：中文顾问/翻译协助，减少与代母、诊所沟通成本。',
  '第三方资源对接：诊所、心理支持与保险等协同，降低“临时找人”的风险。',
]

const processSteps = [
  '提交咨询表单：说明是否已有胚胎/预计时间/预算关注点',
  '初步评估与方案建议：确认州选择、流程节点与大致费用结构',
  '代母筛选与匹配：沟通匹配标准、时间预期与风险点',
  '签署法律文件：在各自律师代表下完成协议与亲权相关步骤 (Surrogate Steps® |)',
  '医疗阶段推进：按诊所安排进入移植与孕期管理协同',
  '分娩与后续文件：按流程准备相关文件与出院后安排',
]

const costOverview = {
  total: '$157,850',
  note: '分阶段打款 + 账单核对后多退少补（未发生的费用在周期结束核对后退回）',
}

const installmentSteps = [
  {
    title: '第一笔：签署协议后 → 汇入 $56,850 到信托账户',
    items: [
      '中介服务费（含国际协调）：$50,000',
      '代母招募、筛选、匹配与全程管理',
      '专案客户经理、行程安排与流程协调',
      '心理支持协调；如因医学筛查不合格导致代母重配等',
      '信托账户管理费：$1,850',
      '行政服务费：$5,000（含医疗前期筛查协调、记录整理与“清关”、翻译支持、新生儿出生证明协助等）',
    ],
  },
  {
    title: '第二笔：代母医学清关通过后 → 汇入 $83,500 到信托账户',
    items: [
      '代母补偿金：$50,000（以实际匹配代母为准）',
      '法律费用：准父母律师 $3,500；代母律师 $1,500',
      '代母医疗保险：$25,000（实报实销）+ 代母人寿保险 $1,000',
      '胚胎移植及孕早期奖励预估：$2,500（含移植前后检查与初期产检等）',
    ],
  },
  {
    title: '第三笔：胎心确认后 → 汇入 $17,500 且账户余额保持 ≥ $10,000',
    items: [
      '服装津贴 $1,000',
      '每月生活津贴（$300/月）$5,500',
      '儿童照护补助（$250/月）$4,500',
      '亲子权利判决费 $6,500',
    ],
  },
]

const extraCosts = [
  '多胎补偿（仅多胎时支付）',
  '剖腹产补偿',
  '卧床休息/托儿/家政补偿（需产科医生书面确认，且通常支付给第三方并提供单据）',
  '工资损失（按代母工资条核算）',
  '母乳补费',
  '以及其他特殊情况（以实际个案为准）',
]

const insurancePoints = [
  '代母保险会根据所在地情况购买；若错过合适购买时机，会协调自费方案（示例：产科医生约$5,000、分娩住院约$8,000的现金支付预估）',
  '即使有主险/补充险，也可能存在自付部分（如免赔额、共付等），需提前预留预算',
]

const whyYunda = [
  {
    title: '代母筛选标准更严（更少踩雷）',
    detail: '材料显示：代母录取通过率低于 1%，筛查包含背景、健康与心理评估等',
  },
  {
    title: '全流程项目经理跟进（更适合跨境家庭）',
    detail: '每位客户配备项目经理、关键节点提醒、周期汇报，并提供中英文支持',
  },
  {
    title: '费用透明 + 信托账户管理（更符合“预算可控”诉求）',
    detail: '材料明确：费用清晰公示，并与专业信托账户协作管理资金',
  },
  {
    title: '合作网络与资源协同（加州/南加州对接更顺）',
    detail: '团队与诊所、法律、保险/信托等多方协作，覆盖周期关键节点',
  },
]

const timelineSteps = [
  '初步咨询 & 需求评估（留资后中文顾问对齐预算、州选择、时间预期）',
  '前期体检/材料准备（可协助你在美国/亚洲做前期筛查与调理衔接）',
  '进入周期 & 诊所协同（视频会诊、排期确认等）',
  '代母筛选与匹配（按标准筛查背景、健康与心理评估）',
  '法律与资金托管启动（合同与信托账户托管，按节点付款更可控）',
  '冻胚移植/验孕确认（按诊所安排推进）',
  '孕期管理 & 周期汇报（项目经理周报/月报、关键节点提醒、代母沟通协调）',
  '分娩 & 新生儿交接（含出生证明协助等行政支持）',
]

const faqItems = [
  {
    q: '美国代孕合法吗？加州/洛杉矶为什么被很多家庭选择？',
    a: '美国各州规则不同。我们在美国45个辅助生殖合法州建立合作与招募网络，可根据你的家庭情况建议更合适的州与路径。',
  },
  {
    q: '你们是哪里团队？是否有洛杉矶本地支持？',
    a: '孕达发源于美国洛杉矶、扎根南加州，面向全球客户提供一站式辅助生殖服务平台。',
  },
  {
    q: '代母/代孕妈妈怎么筛选？靠谱不靠谱怎么判断？',
    a: '我们对代母执行严格筛查，资料中明确：代母录取通过率低于1%，筛查包含背景、健康与心理评估等。',
  },
  {
    q: '加州/洛杉矶代孕多少钱？费用一般怎么构成？',
    a: '你们最关心的通常是代孕费用透明度。套餐示例总费用为 $157,850，并在费用表中拆分到服务费、信托管理费、法律费、保险与津贴等条目。',
  },
  {
    q: '费用怎么支付？为什么要用信托账户（Escrow）？',
    a: '费用按节点分三笔汇入信托账户：协议签署后$56,850、医学清关后$83,500、胎心确认后$17,500（并要求余额≥$10,000）。这样能把资金流向按节点管理，更可控。',
  },
  {
    q: '哪些费用不包含？（避免后期误解）',
    a: '费用表里明确提示：不包括试管婴儿诊所费用，也不包括宝宝出生后在医院产生的医疗费用。',
  },
  {
    q: '为什么总费用会浮动？常见“潜在额外费用”有哪些？',
    a: '费用表说明这是预估报价，未发生费用会在周期结束核对后退还；同时列出多胎、剖腹产、卧床/托儿/家政、工资损失、母乳等“特殊情况费用”。',
  },
  {
    q: '代母保险怎么规划？如果错过购买窗口怎么办？',
    a: '资料说明：若在开放注册期能购买符合要求的保险，会筛选方案供选择；若错过时机，会协助沟通自费支付方案，并给出常见自费预估（如产科医生约$5,000、分娩住院约$8,000）。同时也提示主险/补充险不可能100%覆盖，仍可能产生共付额、免赔额等自付部分。',
  },
  {
    q: '你们怎么跟进？我人在国内也能随时掌握进度吗？',
    a: '每位客户配备项目经理，负责行程安排、关键节点提醒、代母沟通协调；并提供每周/每月周期汇报与7×24小时中英文双语在线服务。',
  },
  {
    q: '如果代母医学筛查不合格，是否需要重新匹配？',
    a: '服务价格目录中明确包含：如因医学筛查不合格导致代母需要重配，也在服务支持范围内。',
  },
  {
    q: '亲权/法律部分怎么做？是否有对应费用？',
    a: '费用拆分中包含亲权相关费用条目（亲子权利判决费$6,500），并同时列出准父母律师费与代母律师费。具体法律路径以合作律师建议与州规则为准。',
  },
  {
    q: '宝宝出生后有哪些支持？（证件/行政协助）',
    a: '行政服务费条目包含“新生儿出生证明协助、文件翻译与行政支持”等，帮助你把出生后的关键材料整理到位。',
  },
]

const expandedFaq = reactive<Record<string, boolean>>({})
const expandedCosts = ref(false)
const expandedInsurance = ref(false)

function toggleFaq(q: string) {
  expandedFaq[q] = !expandedFaq[q]
}

const formState = reactive({
  name: '',
  email: '',
  phone: '',
  wechat: '',
  message: '',
  submitted: false,
})

const formErrors = reactive<Record<string, string>>({})

function scrollToForm() {
  const el = document.getElementById('lead-form')
  if (el)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function validateForm() {
  formErrors.name = formState.name.trim() ? '' : '请填写姓名'
  formErrors.phone = formState.phone.trim() ? '' : '请填写手机号'
  formErrors.message = formState.message.trim() ? '' : '请简单描述您的需求'
  return !formErrors.name && !formErrors.phone && !formErrors.message
}

function submitForm() {
  if (!validateForm())
    return
  formState.submitted = true
}

const ctaLabel = '免费获取：加州/洛杉矶代孕报价清单 + 流程时间线'
const ctaButton = '提交表单领取（中文顾问对接）'
</script>

<template>
  <div class="min-h-screen bg-[var(--head-bg)] text-[var(--dark-brown)]">
    <AppHeader />

    <!-- Hero -->
    <section class="relative overflow-hidden from-[var(--light-cream)] via-[var(--head-bg)] to-[var(--foot-bg)] bg-gradient-to-b pb-16 pt-20">
      <div class="pointer-events-none absolute inset-0 opacity-40">
        <div class="absolute left-20 top-10 h-40 w-40 rounded-full bg-[var(--olive-green)] blur-[140px]" />
        <div class="absolute bottom-10 right-16 h-52 w-52 rounded-full bg-[var(--primary-brown)]/70 blur-[180px]" />
      </div>
      <div class="relative mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-12 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div class="space-y-6">
            <div class="inline-flex items-center gap-2 rounded-full bg-[var(--primary-brown)]/10 px-3 py-1 text-3 text-[var(--primary-brown)] font-semibold">
              加州/洛杉矶代孕咨询｜美国代孕机构（中文顾问）
            </div>
            <h1 class="text-8 font-semibold leading-tight lg:text-11" style="font-family: var(--font-primary)">
              加州/洛杉矶代孕咨询｜美国代孕机构（中文顾问）
            </h1>
            <p class="text-4.5 leading-relaxed">
              面向华人家庭的美国代孕咨询服务：围绕代母筛选与匹配、代孕费用明细、代孕流程时间线，并在合作律师指导下推进加州 PBO 亲权流程，让每一步更清晰、更可控。
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
                class="rounded-full bg-[var(--primary-brown)] px-6 py-3 text-3.5 text-white font-semibold uppercase transition hover:bg-[var(--dark-brown)]"
                @click="scrollToForm"
              >
                免费获取：加州/洛杉矶代孕报价清单 + 流程时间线
              </button>
              <button
                class="border border-[var(--primary-brown)] rounded-full px-6 py-3 text-3.5 font-semibold uppercase transition hover:bg-white"
                @click="scrollToForm"
              >
                留下需求，发送流程节点与材料清单
              </button>
            </div>
            <p class="text-3.5 text-[var(--primary-brown)]/80">
              留下信息后，我们会发送： 流程节点清单 + 需要准备的材料清单（适合首次了解美国代孕的家庭）。
            </p>
          </div>
          <div class="rounded-6 bg-white/90 p-6 shadow-xl backdrop-blur">
            <div class="aspect-video w-full overflow-hidden rounded-4 bg-[var(--light-cream)]">
              <img src="/images/landingpage3/Surrogacy-Requirements.jpg" alt="加州/洛杉矶代孕咨询" class="h-full w-full object-cover">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Form -->
    <section id="lead-form" class="relative -mt-14 pb-6">
      <div class="mx-auto max-w-220 px-5 lg:px-10">
        <div class="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
          <div class="rounded-6 border border-[var(--olive-green)]/40 bg-white/95 p-8 shadow-lg">
            <h2 class="text-6 font-semibold" style="font-family: var(--font-primary)">
              免费获取：加州/洛杉矶代孕报价清单 + 流程时间线 + 材料清单
            </h2>
            <p class="mt-2 text-4 leading-relaxed text-[var(--dark-brown)]/90">
              把问题写在表单里，我们会按你的情况给出加州/洛杉矶代孕的预算范围 + 时间线建议。
            </p>
            <form class="mt-6 grid gap-4" @submit.prevent="submitForm">
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="block text-3.5 font-semibold text-[var(--primary-brown)]">姓名 *</label>
                  <input v-model="formState.name" type="text" class="mt-2 w-full rounded-4 border border-[var(--primary-brown)]/30 bg-[var(--head-bg)] px-4 py-3 focus:border-[var(--primary-brown)] focus:outline-none">
                  <p v-if="formErrors.name" class="mt-1 text-3 text-red-500">
                    {{ formErrors.name }}
                  </p>
                </div>
                <div>
                  <label class="block text-3.5 font-semibold text-[var(--primary-brown)]">手机号 *</label>
                  <input v-model="formState.phone" type="text" class="mt-2 w-full rounded-4 border border-[var(--primary-brown)]/30 bg-[var(--head-bg)] px-4 py-3 focus:border-[var(--primary-brown)] focus:outline-none">
                  <p v-if="formErrors.phone" class="mt-1 text-3 text-red-500">
                    {{ formErrors.phone }}
                  </p>
                </div>
              </div>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="block text-3.5 font-semibold text-[var(--primary-brown)]">邮箱</label>
                  <input v-model="formState.email" type="email" class="mt-2 w-full rounded-4 border border-[var(--primary-brown)]/30 bg-[var(--head-bg)] px-4 py-3 focus:border-[var(--primary-brown)] focus:outline-none">
                </div>
                <div>
                  <label class="block text-3.5 font-semibold text-[var(--primary-brown)]">微信</label>
                  <input v-model="formState.wechat" type="text" class="mt-2 w-full rounded-4 border border-[var(--primary-brown)]/30 bg-[var(--head-bg)] px-4 py-3 focus:border-[var(--primary-brown)] focus:outline-none">
                </div>
              </div>
              <div>
                <label class="block text-3.5 font-semibold text-[var(--primary-brown)]">问题/预算/时间计划 *</label>
                <textarea v-model="formState.message" rows="4" class="mt-2 w-full rounded-4 border border-[var(--primary-brown)]/30 bg-[var(--head-bg)] px-4 py-3 focus:border-[var(--primary-brown)] focus:outline-none" placeholder="写下你的问题：费用、流程、匹配、法律等"></textarea>
                <p v-if="formErrors.message" class="mt-1 text-3 text-red-500">
                  {{ formErrors.message }}
                </p>
              </div>
              <div class="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  class="rounded-full bg-[var(--primary-brown)] px-6 py-3 text-3.5 text-white font-semibold uppercase transition hover:bg-[var(--dark-brown)]"
                >
                  提交表单领取（中文顾问对接）
                </button>
                <p class="text-3.5 text-[var(--primary-brown)]/80">
                  留下信息后，我们会发送： 流程节点清单 + 需要准备的材料清单（适合首次了解美国代孕的家庭）。
                </p>
              </div>
              <div
                v-if="formState.submitted"
                class="rounded-4 border border-[var(--olive-green)]/40 bg-[var(--light-cream)]/60 px-4 py-3 text-3.75 text-[var(--primary-brown)]"
              >
                已收到提交，我们会尽快与您联系，并发送加州/洛杉矶代孕报价清单与时间线 PDF。
              </div>
            </form>
          </div>
          <div class="rounded-6 bg-[var(--foot-bg)]/80 p-6 shadow-inner">
            <h3 class="text-5 font-semibold" style="font-family: var(--font-primary)">
              你最关心的，通常是这些：
            </h3>
            <ul class="mt-4 space-y-3 text-4 leading-relaxed">
              <li v-for="p in painPoints" :key="p" class="flex items-start gap-2">
                <span class="mt-1 inline-block h-2.5 w-2.5 rounded-full bg-[var(--primary-brown)]" />
                <span>{{ p }}</span>
              </li>
            </ul>
            <p class="mt-4 rounded-4 bg-white/80 p-4 text-3.75 leading-relaxed text-[var(--primary-brown)]">
              把问题写在表单里，我们会按你的情况给出加州/洛杉矶代孕的预算范围 + 时间线建议。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 我们能提供什么 -->
    <section class="py-16 lg:py-20">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="text-center">
          <h2 class="text-7 font-semibold lg:text-8" style="font-family: var(--font-primary)">
            Yunda 在加州/洛杉矶代孕咨询中，重点帮你把“复杂”变成“可控”
          </h2>
        </div>
        <div class="mt-10 grid gap-6 md:grid-cols-2">
          <div
            v-for="item in offering"
            :key="item"
            class="flex items-start gap-3 rounded-6 border border-[var(--olive-green)]/40 bg-white/90 p-5 shadow-sm"
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
    <section class="bg-[var(--foot-bg)] py-16 lg:py-20">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-7 font-semibold lg:text-8" style="font-family: var(--font-primary)">
            美国代孕流程
          </h2>
          <button
            class="rounded-full border border-[var(--primary-brown)] px-5 py-2.5 text-3.5 font-semibold text-[var(--primary-brown)] transition hover:bg-white"
            @click="scrollToForm"
          >
            获取“加州/洛杉矶代孕流程时间线PDF”
          </button>
        </div>
        <div class="mt-8 grid gap-6 md:grid-cols-2">
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
          <h2 class="text-7 font-semibold lg:text-8" style="font-family: var(--font-primary)">
            加州/洛杉矶代孕多少钱？费用怎么拆、怎么付更安心
          </h2>
          <button
            class="rounded-full bg-[var(--primary-brown)] px-5 py-2.5 text-3.5 text-white font-semibold transition hover:bg-[var(--dark-brown)]"
            @click="scrollToForm"
          >
            提交表单领取《加州/洛杉矶代孕费用明细PDF + 付款节奏表》
          </button>
        </div>
        <p class="mt-4 text-4 leading-relaxed">
          我们把美国代孕费用拆成“可读、可控”的结构，并通过信托账户（Escrow）分阶段管理资金，避免信息差与预算失控。
        </p>
        <div class="mt-6 rounded-6 border border-[var(--olive-green)]/40 bg-white p-6 shadow-lg">
          <div class="flex flex-wrap items-center gap-6">
            <div>
              <p class="text-4.5 font-semibold text-[var(--primary-brown)]">预估总费用</p>
              <p class="text-7 font-bold" style="font-family: var(--font-primary)">
                {{ costOverview.total }}
              </p>
            </div>
            <div class="flex-1 rounded-5 bg-[var(--light-cream)]/70 p-4 text-4 leading-relaxed text-[var(--primary-brown)]">
              费用特点：{{ costOverview.note }}
            </div>
          </div>
          <p class="mt-3 text-3.5 text-[var(--primary-brown)]/80">
            不同代母匹配与个案情况会导致费用浮动，具体以实际账单为准。
          </p>
          <div class="mt-6 space-y-4">
            <h3 class="text-5 font-semibold" style="font-family: var(--font-primary)">
              三笔打款节奏（让预算“按节点走”）
            </h3>
            <div
              v-for="section in installmentSteps"
              :key="section.title"
              class="rounded-5 border border-[var(--olive-green)]/40 bg-[var(--head-bg)] p-5"
            >
              <p class="text-4.5 font-semibold text-[var(--primary-brown)]">
                {{ section.title }}
              </p>
              <ul class="mt-3 space-y-2 text-4 leading-relaxed">
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
          <div class="mt-5 rounded-5 bg-[var(--foot-bg)]/80 p-4 text-4 leading-relaxed">
            <p class="font-semibold text-[var(--primary-brown)]">哪些费用不包含？</p>
            <p class="mt-2">
              不包含试管婴儿诊所费用；不包含宝宝出生后在医院产生的医疗费用。
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 额外费用与保险 -->
    <section class="bg-[var(--foot-bg)] py-16 lg:py-20">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="grid gap-8 lg:grid-cols-2">
          <div class="rounded-6 bg-white p-6 shadow-lg">
            <div class="flex items-center justify-between">
              <h2 class="text-6 font-semibold" style="font-family: var(--font-primary)">
                哪些情况会增加费用？
              </h2>
              <button class="text-3.5 text-[var(--primary-brown)] underline" @click="expandedCosts = !expandedCosts">
                {{ expandedCosts ? '收起' : '展开' }}
              </button>
            </div>
            <p class="mt-2 text-4 leading-relaxed">
              不同代母与个案会触发额外费用，常见包括（示例清单）：
            </p>
            <Transition name="fade">
              <ul v-if="expandedCosts" class="mt-4 space-y-2 text-4 leading-relaxed">
                <li v-for="item in extraCosts" :key="item" class="flex items-start gap-2">
                  <span class="mt-1 h-2 w-2 rounded-full bg-[var(--primary-brown)]" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </Transition>
          </div>
          <div class="rounded-6 bg-white p-6 shadow-lg">
            <div class="flex items-center justify-between">
              <h2 class="text-6 font-semibold" style="font-family: var(--font-primary)">
                代母保险怎么处理？
              </h2>
              <button class="text-3.5 text-[var(--primary-brown)] underline" @click="expandedInsurance = !expandedInsurance">
                {{ expandedInsurance ? '收起' : '展开' }}
              </button>
            </div>
            <Transition name="fade">
              <ul v-if="expandedInsurance" class="mt-4 space-y-2 text-4 leading-relaxed">
                <li v-for="item in insurancePoints" :key="item" class="flex items-start gap-2">
                  <span class="mt-1 h-2 w-2 rounded-full bg-[var(--primary-brown)]" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </Transition>
            <p class="mt-4 rounded-5 bg-[var(--light-cream)]/70 p-3 text-3.75 text-[var(--primary-brown)]">
              小 CTA：表单留言“预算/州/是否已有胚胎”，获取你的专属费用区间与风险点清单
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- 为什么选择 Yunda -->
    <section class="py-16 lg:py-20">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-7 font-semibold lg:text-8" style="font-family: var(--font-primary)">
            作为洛杉矶起家的美国代孕机构，我们把每一步做成可交付的“项目管理”
          </h2>
          <button
            class="rounded-full border border-[var(--primary-brown)] px-5 py-2.5 text-3.5 font-semibold text-[var(--primary-brown)] transition hover:bg-[var(--light-cream)]"
            @click="scrollToForm"
          >
            免费中文咨询
          </button>
        </div>
        <p class="mt-2 text-4 leading-relaxed">
          你不是在买一个“承诺”，而是在买一套流程管理 + 合规协同 + 透明交付的能力。
        </p>
        <div class="mt-8 grid gap-6 md:grid-cols-2">
          <div
            v-for="item in whyYunda"
            :key="item.title"
            class="rounded-6 border border-[var(--olive-green)]/40 bg-white/95 p-6 shadow"
          >
            <h3 class="text-5 font-semibold text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
              {{ item.title }}
            </h3>
            <p class="mt-2 text-4 leading-relaxed">
              {{ item.detail }}
            </p>
          </div>
        </div>
        <div class="mt-8 flex flex-wrap gap-3">
          <button
            class="rounded-full bg-[var(--primary-brown)] px-6 py-3 text-3.5 text-white font-semibold uppercase transition hover:bg-[var(--dark-brown)]"
            @click="scrollToForm"
          >
            获取：加州/洛杉矶代孕费用明细 + 流程时间线 + 材料清单
          </button>
          <button
            class="rounded-full border border-[var(--primary-brown)] px-6 py-3 text-3.5 font-semibold text-[var(--primary-brown)] uppercase transition hover:bg-white"
            @click="scrollToForm"
          >
            免费中文咨询
          </button>
        </div>
      </div>
    </section>

    <!-- 时间线 -->
    <section class="bg-[var(--foot-bg)] py-16 lg:py-20">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-7 font-semibold lg:text-8" style="font-family: var(--font-primary)">
            加州/洛杉矶代孕流程怎么走？关键节点一览（可领取时间线清单）
          </h2>
          <button
            class="rounded-full bg-[var(--primary-brown)] px-5 py-2.5 text-3.5 text-white font-semibold transition hover:bg-[var(--dark-brown)]"
            @click="scrollToForm"
          >
            获取《加州/洛杉矶代孕流程时间线PDF + 材料清单》
          </button>
        </div>
        <p class="mt-3 text-4 leading-relaxed">
          很多华人家庭咨询洛杉矶代孕/加州代孕时，最想确认两件事：代孕流程是否清晰、每一步是否有人负责推进。我们把旅程拆成可执行的节点，并由项目经理按周/月更新进度，减少跨境沟通成本。
        </p>
        <div class="mt-8 grid gap-4 md:grid-cols-2">
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
          实际时间线会受代母匹配速度、诊所排期、移植次数等影响。我们会在咨询后给你“可落地的节点计划”。
        </p>
      </div>
    </section>

    <!-- FAQ -->
    <section class="py-16 lg:py-20">
      <div class="mx-auto max-w-240 px-5 lg:px-10">
        <div class="mb-8 flex flex-wrap items-center justify-between gap-4">
          <h2 class="text-7 font-semibold lg:text-8" style="font-family: var(--font-primary)">
            美国代孕（加州/洛杉矶）常见问题
          </h2>
          <button
            class="rounded-full bg-[var(--primary-brown)] px-5 py-2.5 text-3.5 text-white font-semibold transition hover:bg-[var(--dark-brown)]"
            @click="scrollToForm"
          >
            提交表单领取（中文顾问对接）
          </button>
        </div>
        <div class="space-y-3">
          <article
            v-for="item in faqItems"
            :key="item.q"
            class="rounded-6 border border-[var(--olive-green)]/40 bg-white/95 shadow-sm"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between px-5 py-4 text-left"
              @click="toggleFaq(item.q)"
            >
              <span class="text-4.5 font-semibold text-[var(--primary-brown)]">{{ item.q }}</span>
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
            class="rounded-full bg-[var(--primary-brown)] px-6 py-3 text-3.5 text-white font-semibold uppercase transition hover:bg-[var(--dark-brown)]"
            @click="scrollToForm"
          >
            免费获取：加州/洛杉矶代孕报价清单 + 流程时间线 + 材料准备清单
          </button>
          <button
            class="rounded-full border border-[var(--primary-brown)] px-6 py-3 text-3.5 font-semibold text-[var(--primary-brown)] uppercase transition hover:bg-[var(--light-cream)]"
            @click="scrollToForm"
          >
            提交表单领取（中文顾问对接）
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

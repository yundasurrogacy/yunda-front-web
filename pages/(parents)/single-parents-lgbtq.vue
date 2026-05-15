<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { buildCoreServicePageSchemas } from '~/utils/schema'

const localePath = useLocalePath()
const { locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en: string, zh: string) => (isZh.value ? zh : en)

const heroTitle = computed(() =>
  tt(
    'Gay & Lesbian Surrogacy in California: LGBTQ-Friendly Surrogacy Agency for Intended Parents',
    '加州同志友好的代孕机构：为男同性恋与女同性恋准父母提供代孕服务',
  ),
)
const heroDescription = computed(() =>
  tt(
    'A California-based surrogacy team that supports gay and lesbian intended parents with inclusive matching, legal guidance, and clinic coordination—keeping every step transparent and welcoming.',
    '来自加州的代孕团队，面向男同志与女同志准父母，提供包容的匹配、法律指导和诊所协调，让每一步都透明且安心。',
  ),
)
const seoTitle = computed(() =>
  tt('IVF, Insurance & Legal for Surrogacy in California -Yunda Surrogacy', '加州代孕：试管婴儿、保险与法律指南 -孕达代孕'),
)
const seoDescription = computed(() =>
  tt(
    'Learn about IVF and insurance coverage support for surrogacy in California with Yunda Surrogacy. Trusted guidance for intended parents at every step.',
    '了解云达代孕在加州提供的 IVF、保险覆盖及支持，为意向父母的每一步提供可信赖的指导。',
  ),
)

const heroHighlights = computed(() => [
  tt('Inclusive matching with surrogates who welcome LGBTQ+ parents', '匹配欢迎 LGBTQ+ 家庭的代孕妈妈'),
  tt('California parentage milestones and legal steps handled with care', '细致处理加州亲权确立的关键法律步骤'),
  tt('Clinic, insurance, and donor coordination with bilingual support', '诊所、保险与捐赠者协调，提供双语支持'),
])

const stepStrip = computed(() => [
  {
    label: tt('Initial Consult', '初步咨询'),
    sub: tt('Quiet first conversation', '安静私密地沟通需求'),
    gradient: 'linear-gradient(135deg, #a96c42, #c58355)',
  },
  {
    label: tt('IVF & Egg Donation', 'IVF 与供卵'),
    sub: tt('Create embryos', '创建胚胎'),
    gradient: 'linear-gradient(135deg, #c58355, #d3936a)',
  },
  {
    label: tt('Match & Screening', '匹配与筛查'),
    sub: tt('Qualified surrogate', '合格的代孕妈妈'),
    gradient: 'linear-gradient(135deg, #d3936a, #dfb07f)',
  },
  {
    label: tt('Legal & Safeguards', '法律与保障'),
    sub: tt('Contracts & insurance', '合同与保险'),
    gradient: 'linear-gradient(135deg, #dfb07f, #e8c59d)',
  },
  {
    label: tt('Transfer & Support', '移植与支持'),
    sub: tt('Embryo transfer', '胚胎移植'),
    gradient: 'linear-gradient(135deg, #e8c59d, #f0d7b8)',
  },
  {
    label: tt('Birth & Parentage', '出生与亲权'),
    sub: tt('Bringing baby home', '迎接宝宝回家'),
    gradient: 'linear-gradient(135deg, #f0d7b8, #fbf0da)',
  },
])
const lgbtqFaqItems = computed(() => [
  {
    question: tt('1) How to start gay surrogacy in California?', '1）如何在加州开始同志代孕？'),
    answer: tt('Start with a consult. We confirm what you already have (embryos or not) and map the next steps—clinic, donor, matching, legal, and timing.', '从咨询开始。我们确认你已有的准备（是否有胚胎），并规划下一步——诊所、供卵/供精、匹配、法律与时间表。'),
  },
  {
    question: tt('2) How does gay surrogacy work, step by step?', '2）同志代孕的流程是怎样的？'),
    answer: tt('Plan → create/review embryos → match and screening → legal/insurance/escrow → transfer → pregnancy support → birth + parentage paperwork.', '规划 → 创建/审核胚胎 → 匹配与筛查 → 法律/保险/资金托管 → 移植 → 孕期支持 → 分娩与亲权文件。'),
  },
  {
    question: tt('3) Is gay surrogacy legal in the U.S. and in California?', '3）同志代孕在美国、加州合法吗？'),
    answer: tt('It depends on the state. California is widely chosen for supportive same-sex surrogacy laws and clearer parentage pathways.', '因州而异。加州因对同性代孕友好、亲权路径清晰而被广泛选择。'),
  },
  {
    question: tt('4) What is a PBO (pre-birth order) for gay parents?', '4）什么是同性父母的 PBO（预出生令）？'),
    answer: tt('A pre-birth order helps confirm parentage before delivery. It often makes the hospital process and paperwork smoother.', '预出生令在分娩前确认亲权，通常能让医院流程与文件处理更顺畅。'),
  },
  {
    question: tt('5) Can both dads be on the birth certificate in California?', '5）在加州，两位爸爸都能上出生证吗？'),
    answer: tt('Often yes, with the right legal plan and documentation. We coordinate with California counsel to keep the process clear.', '通常可以，只要法律方案与文件齐备。我们会与加州律师合作，确保流程清晰。'),
  },
  {
    question: tt('6) Can both moms be on the birth certificate for lesbian surrogacy?', '6）女同志代孕，两位妈妈都能上出生证吗？'),
    answer: tt('Often yes. California parentage steps (commonly including a pre-birth order) help recognize both moms.', '通常可以。加州的亲权流程（常含预出生令）可帮助同时确认两位妈妈。'),
  },
  {
    question: tt('7) How much does surrogacy for gay couples cost?', '7）同志家庭代孕要花多少钱？'),
    answer: tt('It varies by medical pathway. Biggest drivers: IVF/donor needs, surrogate support, legal fees, insurance review, escrow, and agency coordination.', '取决于医疗路径。主要驱动包括 IVF/供卵需求、代孕支持、法律费用、保险审核、资金托管及机构协调。'),
  },
  {
    question: tt('8) What are the main cost components in gay surrogacy?', '8）同志代孕的主要费用构成是什么？'),
    answer: tt('Medical (IVF/testing/transfer), surrogate-related costs, legal + parentage, insurance/escrow, and agency support.', '医疗（IVF/检测/移植）、代孕相关费用、法律与亲权、保险/托管，以及机构支持。'),
  },
  {
    question: tt('9) How do gay couples choose an egg donor, and where does IVF fit?', '9）同志伴侣如何选择供卵者？IVF 在哪里介入？'),
    answer: tt('Many gay men surrogacy journeys use an egg donor and IVF to create embryos, then move to matching and transfer.', '许多同志家庭会用供卵和 IVF 创建胚胎，然后进入匹配与移植阶段。'),
  },
  {
    question: tt('10) International parents: how do we bring a baby home after surrogacy?', '10）国际家庭：代孕后如何把宝宝带回国？'),
    answer: tt('Plan early for documents and travel timing after birth. Requirements vary by country, so timelines should be prepared in advance.', '请提前准备出生后的文件与行程，各国要求不同，时间线需预先规划。'),
  },
])
const pagePath = '/single-parents-lgbtq'
const schemaStepItems = computed(() =>
  stepStrip.value.map((step, index) => ({
    position: index + 1,
    name: step.label,
    description: step.sub,
    url: pagePath,
  })),
)
const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: heroTitle.value,
  description: seoDescription.value,
  about: 'LGBTQ-friendly gestational surrogacy agency support in California',
  audience: ['LGBTQ intended parents', 'gay couples', 'lesbian couples', 'single parents'],
  service: {
    name: 'LGBTQ Gestational Surrogacy Support in California',
    serviceType: 'LGBTQ-friendly gestational surrogacy agency services',
    audience: ['LGBTQ intended parents', 'gay couples', 'lesbian couples', 'single parents'],
    description: 'Inclusive gestational surrogacy coordination for gay and lesbian intended parents, including first consultation, IVF and egg donation planning, gestational carrier matching, medical screening, legal and parentage coordination, insurance and escrow planning, embryo transfer, pregnancy support, and birth planning.',
  },
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Intended Parents', url: '/be-parents' },
    { name: 'Single Parents & LGBTQ+', url: pagePath },
  ],
  faqs: lgbtqFaqItems.value,
  itemList: {
    name: '6-step LGBTQ surrogacy process',
    description: heroDescription.value,
    items: schemaStepItems.value,
  },
}))

const visibleSteps = ref(1)

function showNextStep() {
  if (visibleSteps.value < stepStrip.value.length)
    visibleSteps.value += 1
}

useHead({
  title: seoTitle,
  meta: [
    {
      name: 'description',
      content: seoDescription,
    },
  ],
})

useHead(() => ({
  script: coreServicePageSchemas.value.map((schema, index) => ({
    key: `schema-single-parents-lgbtq-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />

    <main>
      <section class="relative w-full overflow-hidden from-[var(--yunda-petal)] via-white to-[var(--yunda-petal)] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-18%] top-[-18%] h-[360px] w-[360px] rounded-full bg-white/55 blur-3xl" />
          <div class="absolute right-[-16%] top-[-12%] h-[500px] w-[500px] rounded-full bg-[var(--yunda-petal)]/65 blur-3xl" />
          <div class="absolute bottom-[-26%] left-[-20%] h-[420px] w-[520px] rounded-[58%] bg-white/60 blur-3xl" />
          <div class="absolute bottom-[-24%] right-[-18%] h-[440px] w-[520px] rounded-[60%] bg-[var(--yunda-petal)]/60 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-full w-[1960px] pb-18 pt-28 lg:pb-24 lg:pt-32">
          <div class="w-full flex flex-col gap-6 lg:gap-8">
            <div class="w-fit inline-flex items-center border border-[var(--yunda-maple)]/30 rounded-full bg-[var(--yunda-petal)] px-4 py-2 text-sm text-[var(--yunda-maple)] font-semibold" style="font-family: var(--font-text)">
              {{ tt('LGBTQ+ intended parents · California surrogacy', 'LGBTQ+ 准父母 · 加州代孕') }}
            </div>

            <h1 class="font-display text-[38px] font-semibold leading-[1.1] sm:text-[42px] lg:text-[50px]">
              {{ heroTitle }}
            </h1>

            <div class="grid gap-4 lg:grid-cols-2">
              <div class="relative overflow-hidden border border-white/70 rounded-[28px] bg-white/80 shadow-[0_22px_60px_rgba(64,84,120,0.10)]">
                <picture>
                  <source srcset="/images/ip/Gay-Lesbia-Surrogacy.png" type="image/jpeg">
                  <img
                    src="/images/ip/Gay-Lesbia-Surrogacy.png"
                    alt="LGBTQ intended parents celebrating together"
                    class="h-[320px] w-full object-cover lg:h-[420px]"
                    loading="lazy"
                    decoding="async"
                  >
                </picture>
              </div>

              <div class="relative overflow-hidden border border-white/70 rounded-[28px] bg-white/80 shadow-[0_22px_60px_rgba(64,84,120,0.10)]">
                <picture>
                  <source srcset="/images/ip/Gay-Surrogacy.png" type="image/jpeg">
                  <img
                    src="/images/ip/Gay-Surrogacy.png"
                    alt="LGBTQ intended parents celebrating together"
                    class="h-[320px] w-full object-cover lg:h-[420px]"
                    loading="lazy"
                    decoding="async"
                  >
                </picture>
              </div>
            </div>

            <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
              {{ heroDescription }}
            </p>

            <div class="grid gap-3 text-base text-[var(--yunda-bark)] lg:grid-cols-3 lg:gap-4" style="font-family: var(--font-text)">
              <div
                v-for="highlight in heroHighlights"
                :key="highlight"
                class="flex items-start gap-3 border border-[var(--yunda-maple)]/25 rounded-[16px] bg-[var(--yunda-petal)]/80 px-4 py-3 shadow-[0_12px_30px_rgba(64,84,120,0.08)]"
              >
                <span class="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--yunda-maple)]" />
                <span class="leading-[1.75]">{{ highlight }}</span>
              </div>
            </div>

            <div class="flex flex-wrap gap-4">
              <NuxtLink
                :to="localePath('/be-parents')"
                class="inline-flex items-center justify-center rounded-[12px] bg-[var(--yunda-bark)] px-6 py-3 text-sm text-[var(--yunda-petal)] font-semibold shadow-[0_18px_32px_rgba(169,108,66,0.30)] transition-transform duration-200 hover:-translate-y-0.5"
                style="font-family: var(--font-text)"
              >
                {{ tt('Talk to a coordinator', '与顾问沟通') }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/surrogacy-cost')"
                class="inline-flex items-center justify-center border border-[var(--yunda-maple)]/30 rounded-[12px] bg-white/80 px-6 py-3 text-sm text-[var(--yunda-bark)] font-semibold shadow-[0_14px_26px_rgba(39,31,24,0.08)] transition-transform duration-200 hover:-translate-y-0.5"
                style="font-family: var(--font-text)"
              >
                {{ tt('See California costs', '查看加州费用') }}
              </NuxtLink>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full bg-[var(--yunda-petal)] py-16 lg:py-24">
        <div class="mx-auto max-w-full w-[1960px] space-y-10">
          <div class="space-y-4">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
              {{ tt('LGBTQ Surrogacy: Who We Help (Gay Couples & Lesbian Couples)', 'LGBTQ 代孕：我们支持的家庭（男同/女同）') }}
            </h2>
          </div>

          <div class="grid gap-8 lg:grid-cols-2">
            <article class="relative min-h-[420px] overflow-hidden border border-white/70 rounded-[32px] shadow-[0_24px_60px_rgba(64,84,120,0.10)]">
              <picture>
                <source srcset="/images/ip/Gay-Surrogacy.png" type="image/png">
                <img
                  src="/images/ip/Gay-Surrogacy.png"
                  alt="Gay couple walking together during their surrogacy journey"
                  class="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                >
              </picture>
              <div class="absolute inset-0 from-white/82 via-white/76 to-white/62 bg-gradient-to-r" />
              <div class="relative max-w-3xl p-8 space-y-4 lg:p-10">
                <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                  {{ tt('Surrogacy for Gay Couples — A Clear Path to Fatherhood', '男同志代孕：清晰而安心的成家路径') }}
                </h3>
                <p class="text-base text-[var(--yunda-bark)]/90 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ tt('If you’re considering ', '如果你们作为两位爸爸正在考虑') }}
                  <NuxtLink :to="localePath('/surrogacy-process')" class="text-[var(--yunda-maple)] underline underline-offset-4">
                    {{ tt('lgbt surrogacy', 'LGBTQ 代孕') }}
                  </NuxtLink>
                  {{ tt(' as two dads, you deserve a plan that feels steady and protected. Many intended parents come to us for ', '，你们值得拥有稳妥且被保护的方案。许多准父母来找我们做') }}
                  <NuxtLink :to="localePath('/be-parents')" class="text-[var(--yunda-maple)] underline underline-offset-4">
                    {{ tt('surrogacy for gay couples', '男同志代孕') }}
                  </NuxtLink>
                  {{ tt(' because they want guidance without pressure.', '，因为他们希望获得不带压力的专业指引。') }}
                </p>
              </div>
            </article>

            <article class="relative min-h-[420px] overflow-hidden border border-white/70 rounded-[32px] shadow-[0_24px_60px_rgba(64,84,120,0.10)]">
              <picture>
                <source srcset="public/images/ip/LGBTQ-Surrogacy.png" type="image/jpeg">
                <img
                  src="public/images/ip/LGBTQ-Surrogacy.png"
                  alt="Lesbian couple smiling together during surrogacy planning"
                  class="absolute inset-0 h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                >
              </picture>
              <div class="absolute inset-0 from-white/82 via-white/76 to-white/62 bg-gradient-to-r" />
              <div class="relative max-w-3xl p-8 space-y-4 lg:p-10">
                <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                  {{ tt('Lesbian Surrogacy—Support for Two Moms, From Planning to Parenthood', '女同志代孕：陪伴两位妈妈，从规划到为人父母') }}
                </h3>
                <p class="text-base text-[var(--yunda-bark)]/90 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ tt('Lesbian surrogacy can look different for every couple. Some families use one partner’s eggs. Some explore ', '女同志代孕在不同家庭会有不同组合：有的使用一方卵子，有的考虑') }}
                  <NuxtLink :to="localePath('/partner-ivf-clinics')" class="text-[var(--yunda-maple)] underline underline-offset-4">
                    {{ tt('reciprocal IVF', '互惠 IVF') }}
                  </NuxtLink>
                  {{ tt('. Others choose ', '，也有家庭选择') }}
                  <NuxtLink :to="localePath('/egg-donation')" class="text-[var(--yunda-maple)] underline underline-offset-4">
                    {{ tt('donor eggs', '供卵') }}
                  </NuxtLink>
                  {{ tt('. We guide you through options with care, so the choice feels right for your family.', '。我们会细致讲解每个方案，帮助你们找到最合适的道路。') }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="w-full bg-[var(--yunda-petal)] py-16 lg:py-24">
        <div class="mx-auto max-w-full w-[1960px] space-y-10">
          <div class="space-y-3">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
              {{ tt('How Does Gay Surrogacy Work? (Step-by-Step Process)', '男同志代孕怎么进行？（分步骤讲解）') }}
            </h2>
            <p class="text-base text-[var(--yunda-bark)]/80 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
              {{ tt('A calm, step-by-step path for lgbt surrogacy in California—covering surrogacy for gay couples from first consult to bringing baby home.', '在加州，按部就班、平稳推进的男同志代孕路线——从首次咨询到把宝宝接回家的每一步。') }}
            </p>
          </div>

          <div class="overflow-hidden border border-white/70 rounded-[28px] shadow-[0_24px_60px_rgba(64,84,120,0.10)]">
            <div class="grid grid-cols-2 w-full text-white lg:grid-cols-6 md:grid-cols-3">
              <div
                v-for="(step, index) in stepStrip"
                :key="step.label"
                class="relative h-full min-h-[120px] flex flex-col justify-center gap-2 p-5"
                :style="{ background: step.gradient }"
              >
                <span class="text-base text-white/95 font-semibold tracking-wide uppercase" >{{ index + 1 }}.</span>
                <span class="text-[22px] font-semibold leading-snug" >{{ step.label }}</span>
                <span class="text-base text-white/95 leading-snug" style="font-family: var(--font-text)">{{ step.sub }}</span>
              </div>
            </div>
          </div>

          <div class="grid gap-10 lg:grid-cols-2">
            <div class="space-y-6">
              <div v-if="visibleSteps >= 1" class="space-y-3">
                <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                  {{ tt('Step 1 — How to Start Gay Surrogacy (Your First Conversation)', '步骤 1 — 如何开始男同志代孕（第一次沟通）') }}
                </h3>
                <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ tt('If you’re wondering how does gay surrogacy work, start with a quiet consult. We learn what you have—embryos, an IVF clinic, or neither—and what you still need. Like many Native teachings, we don’t rush big choices. We listen first, then build a clear plan for ', '如果你想弄清男同志代孕如何展开，可以先进行一次私密的咨询。我们会了解你们现有的条件——有无胚胎、是否已有 IVF 诊所——以及缺少什么。像许多文化的教导一样，大事不急于一时。我们先倾听，再为') }}
                  <NuxtLink :to="localePath('/surrogacy-process')" class="text-[var(--yunda-maple)] underline underline-offset-4">
                    {{ tt('surrogacy for gay couples', '男同志代孕') }}
                  </NuxtLink>
                  {{ tt(' in California.', '在加州制定清晰的计划。') }}
                </p>
              </div>

              <div v-if="visibleSteps >= 2" class="space-y-3">
                <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                  {{ tt('Step 2 — Create Embryos With IVF (Often With an Egg Donor)', '步骤 2 — IVF 创建胚胎（常伴随供卵）') }}
                </h3>
                <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ tt('For many families, gay men surrogacy includes IVF and an egg donor. If you already have embryos, we plan the next steps. If not, we guide donor selection and clinic coordination for IVF and surrogacy for gay couples—see our ', '许多同志家庭会在代孕中使用 IVF 与供卵；已有胚胎则直接规划下一步；若没有，我们协助选卵与诊所协调——可查看我们的') }}
                  <NuxtLink :to="localePath('/partner-ivf-clinics')" class="text-[var(--yunda-maple)] underline underline-offset-4">
                    {{ tt('partner IVF clinics', '合作 IVF 诊所') }}
                  </NuxtLink>
                  {{ tt(' and ', ' 以及 ') }}
                  <NuxtLink :to="localePath('/egg-donation')" class="text-[var(--yunda-maple)] underline underline-offset-4">
                    {{ tt('egg donation', '供卵') }}
                  </NuxtLink>
                  {{ tt(' resources.', ' 资源。') }}
                </p>
              </div>

              <div v-if="visibleSteps >= 3" class="space-y-3">
                <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                  {{ tt('Step 3 — Match With a Surrogate and Complete Screening', '步骤 3 — 匹配代孕妈妈并完成筛查') }}
                </h3>
                <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ tt('Matching is about trust, not speed. We help you meet a surrogate who is medically qualified and emotionally ready. Screening usually includes medical review, clinic clearance, and psychological evaluation. These steps to gay surrogacy protect everyone—and prevent delays later.', '匹配重在信任而非速度。我们协助找到医学合格、心理准备好的代孕妈妈。筛查通常包括病历审核、诊所放行、心理评估，这些环节保护所有人并减少后期延误。') }}
                </p>
              </div>
            </div>

            <div class="space-y-6">
              <div v-if="visibleSteps >= 4" class="space-y-3">
                <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                  {{ tt('Step 4 — Legal, Insurance, and Financial Safeguards (Before Transfer)', '步骤 4 — 法律、保险与资金保障（移植前）') }}
                </h3>
                <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ tt('Before transfer, the foundation must be solid: contracts, insurance review, and a secure financial setup (often escrow). California is chosen for strong protections, including options like a', '移植前要先筑牢地基：合同、保险审核与安全资金托管。加州因强力保护被广泛选择，例如可办理') }}
                  <NuxtLink :to="localePath('/surrogacy-cost')" class="text-[var(--yunda-maple)] underline underline-offset-4">
                    {{ tt('pre birth order for gay parents', '同性父母的预出生令') }}
                  </NuxtLink>
                  {{ tt('. This step brings clarity and peace of mind.', '，让流程更清晰安心。') }}
                </p>
              </div>

              <div v-if="visibleSteps >= 5" class="space-y-3">
                <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                  {{ tt('Step 5 — Embryo Transfer, Pregnancy, and Ongoing Support', '步骤 5 — 胚胎移植、孕期与持续支持') }}
                </h3>
                <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ tt('After legal and medical clearance, the surrogate begins her cycle and the embryo transfer is scheduled. Pregnancy is confirmed by blood test soon after (your clinic sets exact timing). We support steady communication and a realistic gay surrogacy timeline, so the journey feels calm and respectful.', '完成法律与医学放行后，代孕妈妈开始用药并安排移植，随后通过验血确认怀孕（时间由诊所制定）。我们保持沟通与真实可行的时间表，让旅程平稳、互相尊重。') }}
                </p>
              </div>

              <div v-if="visibleSteps >= 6" class="space-y-3">
                <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                  {{ tt('Step 6 — Birth, Parentage, and Bringing Baby Home', '步骤 6 — 分娩、亲权与接宝宝回家') }}
                </h3>
                <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ tt('As birth nears, we confirm the hospital plan and parentage paperwork. Many ask, “can both dads be on the birth certificate?” With the right documents, that’s the goal we work toward. For international parents, we plan travel paperwork early—so bringing your baby home is smoother.', '接近分娩时，我们确认医院计划与亲权文件。许多家庭关心“能否把两位爸爸都写在出生证上？”只要文件齐备，我们就以此为目标。国际家庭则提前规划旅行与文件，让回家更顺畅。') }}
                </p>
              </div>
            </div>
          </div>

          <div v-if="visibleSteps < stepStrip.length" class="flex justify-start">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-[12px] bg-[var(--yunda-bark)] px-5 py-3 text-sm text-[var(--yunda-petal)] font-semibold shadow-[0_14px_28px_rgba(169,108,66,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
              style="font-family: var(--font-text)"
              @click="showNextStep"
            >
              {{ tt('Show next step', '展开下一步') }}
            </button>
          </div>
        </div>
      </section>

      <section class="w-full bg-[var(--yunda-petal)] py-16 lg:py-24">
        <div class="rainbow-bar mb-6" aria-hidden="true" />
        <div class="mx-auto max-w-full w-[1960px] space-y-8">
          <div class="space-y-3">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
              {{ tt('LGBTQ-Friendly Matching: How We Support You and Your Surrogate', '同志友好的匹配：如何支持您与代孕妈妈') }}
            </h2>
            <p class="text-base text-[var(--yunda-bark)]/80 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
              {{ tt('Matching for lgbtq surrogacy should feel respectful and calm—from your first conversation to birth planning in California.', 'LGBTQ 代孕匹配应当尊重且平和——从首次沟通到加州的分娩规划。') }}
            </p>
          </div>

          <div class="relative h-[600px] overflow-hidden border border-white/70 rounded-[26px] bg-white/95 shadow-[0_24px_60px_rgba(64,84,120,0.12)]">
            <div class="absolute inset-x-0 top-0 h-3 from-[#e8612f] via-[#3c7bbf] via-[#5bb260] via-[#7849af] via-[#f6b52e] to-[#e8612f] bg-gradient-to-r" />
            <div class="grid h-full items-stretch gap-6 p-6 lg:grid-cols-[1.05fr_1fr] lg:p-10">
              <div class="relative h-full overflow-hidden rounded-[20px]">
                <picture>
                  <source srcset="public/images/ip/LGBTQ-Friendly.webp" type="image/jpeg">
                  <img
                    src="public/images/ip/LGBTQ-Friendly.webp"
                    alt="LGBTQ intended parents sharing a moment"
                    class="h-full w-full rounded-[20px] object-cover"
                    loading="lazy"
                    decoding="async"
                  >
                </picture>
                <div class="pointer-events-none absolute inset-0 rounded-[20px] from-white/18 via-white/8 to-white/4 bg-gradient-to-r" />
              </div>

              <div class="grid gap-4 md:grid-cols-1">
                <div class="flex items-start gap-4 border border-[var(--yunda-maple)]/25 rounded-[18px] bg-[var(--yunda-petal)]/90 p-4 shadow-[0_12px_28px_rgba(64,84,120,0.10)]">
                  <div
                    class="h-14 w-14 flex shrink-0 items-center justify-center rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
                    style="background: radial-gradient(circle at 35% 30%, #ffffff 0%, #e8eeea 55%, #d2d8ce 100%);"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-7 w-7" fill="none" stroke="var(--yunda-bark)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M4 12.5 8.5 8l3.5 3.5L15.5 8 20 12.5" />
                      <path d="M4 16.5 7 13.5" />
                      <path d="M9.5 16.5 12 14" />
                      <path d="M14.5 16.5 17 14" />
                    </svg>
                  </div>
                  <div class="space-y-2">
                    <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                      {{ tt('Matching That Honors Your Story (LGBTQ-Friendly From Day One)', '匹配尊重你的故事（从第一天起就友好）') }}
                    </h3>
                    <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                      {{ tt('In', '在') }}
                      <NuxtLink :to="localePath('/surrogacy-process')" class="text-[var(--yunda-maple)] underline underline-offset-4">
                        {{ tt('lgbtq surrogacy', 'LGBTQ 代孕') }}
                      </NuxtLink>
                      {{ tt(', matching should feel steady and respectful. We learn what matters to you—privacy, communication style, and the relationship you want with your surrogate.', '中，匹配应当稳妥、尊重。我们会了解你重视的隐私、沟通方式，以及你希望与代孕妈妈的关系。') }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4 border border-[var(--yunda-maple)]/25 rounded-[18px] bg-[var(--yunda-petal)]/90 p-4 shadow-[0_12px_28px_rgba(64,84,120,0.10)]">
                  <div
                    class="h-14 w-14 flex shrink-0 items-center justify-center rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
                    style="background: radial-gradient(circle at 35% 30%, #ffffff 0%, #e8eeea 55%, #d2d8ce 100%);"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-7 w-7" fill="none" stroke="var(--yunda-bark)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="5" y="3" width="14" height="14" rx="2" />
                      <path d="M9 7h6" />
                      <path d="M9 10h3" />
                      <path d="M9 14h6" />
                      <path d="M8 21h8" />
                    </svg>
                  </div>
                  <div class="space-y-2">
                    <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                      {{ tt('Screening and Support That Protects You and Your Surrogate', '筛查与支持，守护你和代孕妈妈') }}
                    </h3>
                    <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                      {{ tt('A strong match includes medical and emotional readiness. We coordinate record review, clinic requirements, and psychological screening, so the journey stays healthy for everyone. This support matters in the gay surrogacy process—fewer surprises, more stability—plus ongoing check-ins and guidance for your surrogate.', '好的匹配需要医学与情感上的准备。我们协调病历审核、诊所要求和心理筛查，让旅程对所有人都健康可控。这些支持让同志代孕更少意外、更稳妥，并为代孕妈妈提供持续关怀与指导。') }}
                    </p>
                  </div>
                </div>

                <div class="flex items-start gap-4 border border-[var(--yunda-maple)]/25 rounded-[18px] bg-[var(--yunda-petal)]/90 p-4 shadow-[0_12px_28px_rgba(64,84,120,0.10)]">
                  <div
                    class="h-14 w-14 flex shrink-0 items-center justify-center rounded-full shadow-[0_6px_16px_rgba(0,0,0,0.12)]"
                    style="background: radial-gradient(circle at 35% 30%, #ffffff 0%, #e8eeea 55%, #d2d8ce 100%);"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-7 w-7" fill="none" stroke="var(--yunda-bark)" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M6 4h9l3 3v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
                      <path d="M14 4v3h4" />
                      <path d="M8 12h8" />
                      <path d="M8 16h5" />
                    </svg>
                  </div>
                  <div class="space-y-2">
                    <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                      {{ tt('Clear Communication, Boundaries, and a Calm Birth Plan', '清晰沟通、健康边界与安心的分娩计划') }}
                    </h3>
                    <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                      {{ tt('We set communication rhythms—updates, milestones, decision-making—that feel natural. Healthy boundaries keep the relationship respectful. As birth nears, we coordinate with your care team and legal team; many families prepare a', '我们设定自然的沟通节奏——更新、里程碑与决策方式。健康的边界让关系更尊重。临近分娩时，我们会与医疗与法律团队协作；许多家庭会提前准备') }}
                      <NuxtLink :to="localePath('/surrogacy-cost')" class="text-[var(--yunda-maple)] underline underline-offset-4">
                        {{ tt('pre birth order for same sex couples', '同性家庭的预出生令') }}
                      </NuxtLink>
                      {{ tt('so the hospital experience is smoother.', '，让住院体验更顺畅。') }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full bg-[var(--yunda-petal)] py-16 lg:py-24">
        <div class="mx-auto max-w-full w-[1960px] space-y-10">
          <div class="space-y-3">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
              {{ tt('Gay Surrogacy Costs: What Impacts the Cost for Gay Couples?', '同志代孕费用：哪些因素影响预算？') }}
            </h2>
            <p class="text-base text-[var(--yunda-bark)]/80 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
              {{ tt('A quick view of the main drivers of gay surrogacy cost California families ask about—and where a typical budget goes.', '快速了解加州同志家庭最关心的代孕费用驱动因素，以及预算通常花在哪些部分。') }}
            </p>
          </div>

          <div class="grid items-stretch gap-6 lg:grid-cols-[1.1fr_1.1fr_0.8fr]">
            <div class="relative h-full border border-white/70 rounded-[18px] bg-white/92 shadow-[0_16px_40px_rgba(64,84,120,0.12)]">
              <div class="absolute inset-x-0 top-0 h-[10px] rounded-t-[18px] from-[#7366b9] via-[#8c7dd6] to-[#a99aeb] bg-gradient-to-r" />
              <div
                class="relative mt-[10px] h-full rounded-b-[18px] from-[#7366b9] via-[#8c7dd6] to-[#a99aeb] bg-gradient-to-r p-[1px]"
              >
                <div class="h-full rounded-[14px] bg-white p-5">
                  <div class="flex items-center gap-3">
                    <div class="h-12 w-12 flex shrink-0 items-center justify-center rounded-full bg-white shadow-[0_8px_18px_rgba(115,102,185,0.25)]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="#6b5aa8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M8 2v4" />
                        <path d="M16 2v4" />
                        <rect x="4" y="4" width="16" height="16" rx="2" />
                        <path d="M4 10h16" />
                        <path d="M10 14h4" />
                      </svg>
                    </div>
                    <h3 class="font-sans text-[18px] text-[var(--yunda-bark)] font-bold leading-snug lg:text-[20px]" style="font-family: var(--font-text)">
                      {{ tt('Medical & IVF Choices', '医疗与 IVF 选择') }}
                    </h3>
                  </div>
                  <ul class="mt-4 text-base text-[var(--yunda-bark)]/85 leading-[1.75] space-y-2 lg:text-lg" style="font-family: var(--font-text)">
                    <li class="flex items-start gap-2">
                      <span class="text-[#6b5aa8]">✓</span>
                      <span>{{ tt('If you already have embryos, costs are often lower than starting from zero.', '若已有胚胎，费用通常低于从零开始。') }}</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-[#6b5aa8]">✓</span>
                      <span>{{ tt('Needing an egg donor or extra IVF cycles can raise the', '需要供卵或额外 IVF 周期会提高') }}
                        <NuxtLink :to="localePath('/surrogacy-cost')" class="text-[var(--yunda-maple)] underline underline-offset-4">
                          {{ tt('gay surrogacy cost', '同志代孕成本') }}
                        </NuxtLink>
                        {{ tt('range.', '区间。') }}</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-[#6b5aa8]">✓</span>
                      <span>{{ tt('Medications, testing, and clinic timelines also shape the budget.', '用药、检查与诊所排期也会影响预算。') }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="relative h-full border border-white/70 rounded-[18px] bg-white/92 shadow-[0_16px_40px_rgba(64,84,120,0.12)]">
              <div class="absolute inset-x-0 top-0 h-[10px] rounded-t-[18px] from-[#c77836] via-[#d89050] to-[#ebb16f] bg-gradient-to-r" />
              <div
                class="relative mt-[10px] h-full rounded-b-[18px] from-[#c77836] via-[#d89050] to-[#ebb16f] bg-gradient-to-r p-[1px]"
              >
                <div class="h-full rounded-[14px] bg-white p-5">
                  <div class="flex items-center gap-3">
                    <div class="h-12 w-12 flex shrink-0 items-center justify-center rounded-full bg-white shadow-[0_8px_18px_rgba(199,120,54,0.25)]">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="#c77836" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M8 13h4" />
                        <path d="M8 9h8" />
                        <path d="M8 17h6" />
                      </svg>
                    </div>
                    <h3 class="font-sans text-[18px] text-[var(--yunda-bark)] font-bold leading-snug lg:text-[20px]" style="font-family: var(--font-text)">
                      {{ tt('Risk + Timeline Variables', '风险与时间线变量') }}
                    </h3>
                  </div>
                  <ul class="mt-4 text-base text-[var(--yunda-bark)]/85 leading-[1.75] space-y-2 lg:text-lg" style="font-family: var(--font-text)">
                    <li class="flex items-start gap-2">
                      <span class="text-[#c77836]">•</span>
                      <span>{{ tt('Insurance coverage, surrogate eligibility, and how quickly you match can shift the budget.', '保险覆盖、代孕妈妈资格，以及匹配速度都会改变预算。') }}</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-[#c77836]">•</span>
                      <span>{{ tt('A longer timeline may increase coordination and support costs.', '时间线越长，协调与支持成本可能上升。') }}</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <span class="text-[#c77836]">•</span>
                      <span>{{ tt('We plan for these variables early so you don’t get surprised.', '我们提前规划这些变量，减少意外。') }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="relative h-full overflow-hidden border border-[var(--yunda-maple)]/18 rounded-[18px] bg-white shadow-[0_18px_44px_rgba(64,84,120,0.16)]">
              <div class="absolute inset-x-0 top-0 h-10 bg-[var(--yunda-petal)]">
                <div class="absolute left-4 top-1/2 h-3 w-14 rounded-full bg-[var(--yunda-petal)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)] -translate-y-1/2" />
                <div class="absolute right-4 top-1/2 h-3 w-14 rounded-full bg-[var(--yunda-petal)] shadow-[inset_0_1px_2px_rgba(0,0,0,0.12)] -translate-y-1/2" />
              </div>
              <div class="relative mt-10 h-full bg-[radial-gradient(circle_at_20%_15%,#faf7f2_0%,#ffffff_45%,#f7f1e6_100%)]">
                <div class="absolute inset-x-0 top-0 h-[6px] bg-[length:24px_12px] bg-[radial-gradient(circle_at_0_0,#e8eeea_6px,transparent_6px),radial-gradient(circle_at_100%_0,#e8eeea_6px,transparent_6px)] bg-repeat-x" />
                <div class="pointer-events-none absolute inset-x-4 top-0 h-full border-l border-[var(--yunda-maple)]/20 border-dashed" />
                <div class="relative h-full px-5 pb-6 pt-4">
                  <div class="mb-4 flex items-center justify-between">
                    <div class="flex items-center gap-3">
                      <span class="h-10 w-10 inline-flex items-center justify-center rounded-full bg-[var(--yunda-petal)] text-[var(--yunda-bark)] font-semibold shadow-[0_6px_14px_rgba(0,0,0,0.12)]" >Bill</span>
                      <h3 class="font-sans text-[18px] text-[var(--yunda-bark)] font-bold leading-snug lg:text-[20px]" style="font-family: var(--font-text)">
                        {{ tt('Cost Breakdown Overview', '费用构成总览') }}
                      </h3>
                    </div>
                  </div>
                  <div class="text-base text-[var(--yunda-bark)]/90 leading-[1.75] space-y-2 lg:text-lg" style="font-family: var(--font-text)">
                    <div class="flex items-start gap-2">
                      <span class="text-[var(--yunda-maple)]">✓</span>
                      <span>{{ tt('Medical: IVF/clinic fees, testing, medications, embryo transfer', '医疗：IVF/诊所费用、检测、用药、胚胎移植') }}
                        (<NuxtLink :to="localePath('/partner-ivf-clinics')" class="text-[var(--yunda-maple)] underline underline-offset-4">
                          {{ tt('partner IVF clinics', '合作 IVF 诊所') }}
                        </NuxtLink>)</span>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="text-[var(--yunda-maple)]">✓</span>
                      <span>{{ tt('Surrogate: compensation, reimbursements, maternity support', '代孕：补偿、报销、孕期支持') }}</span>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="text-[var(--yunda-maple)]">✓</span>
                      <span>{{ tt('Legal & parentage: contracts and protections for both dads', '法律与亲权：合同及保护双亲的步骤') }}</span>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="text-[var(--yunda-maple)]">✓</span>
                      <span>{{ tt('Insurance & escrow: policy review and secure fund management', '保险与托管：保单审核与资金安全管理') }}</span>
                    </div>
                    <div class="flex items-start gap-2">
                      <span class="text-[var(--yunda-maple)]">✓</span>
                      <span>{{ tt('Agency coordination: matching, case management, ongoing support', '机构协调：匹配、案管与持续支持') }}</span>
                    </div>
                  </div>
                  <p class="mt-4 text-sm text-[var(--yunda-bark)]/70">
                    {{ tt('This is a high-level view of surrogacy costs for same sex couples—your exact plan may vary.', '以上为同性家庭代孕费用的概览，具体方案以实际为准。') }}
                  </p>
                </div>
                <div class="absolute inset-x-0 bottom-0 h-4 from-[var(--yunda-petal)] via-white to-[var(--yunda-petal)] bg-gradient-to-r" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full bg-[var(--yunda-petal)] py-16 lg:py-24">
        <div class="mx-auto max-w-full w-[1960px] space-y-8">
          <div class="space-y-2">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
              {{ tt('Gay & Lesbian Surrogacy FAQ', '同志代孕常见问题') }}
            </h2>
            <p class="text-base text-[var(--yunda-bark)]/80 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
              {{ tt('Process, legal, costs, and international parent FAQs.', '流程、法律、费用与国际家庭的常见问题。') }}
            </p>
          </div>

          <div class="relative overflow-hidden border border-white/70 rounded-[16px] bg-white/92 p-4 shadow-[0_14px_34px_rgba(64,84,120,0.12)]">
            <div class="absolute inset-x-0 top-0 h-2 from-[#e8612f] via-[#3c7bbf] via-[#5bb260] via-[#7849af] via-[#f6b52e] to-[#e8612f] bg-gradient-to-r" />
            <div class="grid gap-4 pt-2">
              <details class="group border border-[var(--yunda-maple)]/15 rounded-[12px] bg-[var(--yunda-petal)]/70 px-4 py-3 transition-colors hover:border-[var(--yunda-maple)]/30">
                <summary class="flex cursor-pointer list-none items-start justify-between gap-3 text-left">
                  <span class="text-lg text-[var(--yunda-bark)] font-semibold" >{{ tt('1) How to start gay surrogacy in California?', '1）如何在加州开始同志代孕？') }}</span>
                  <span class="text-[var(--yunda-maple)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p class="mt-2 text-base text-[var(--yunda-bark)]/85 leading-[1.75]" style="font-family: var(--font-text)">
                  {{ tt('Start with a consult. We confirm what you already have (embryos or not) and map the next steps—clinic, donor, matching, legal, and timing.', '从咨询开始。我们确认你已有的准备（是否有胚胎），并规划下一步——诊所、供卵/供精、匹配、法律与时间表。') }}
                </p>
              </details>

              <details class="group border border-[var(--yunda-maple)]/15 rounded-[12px] bg-[var(--yunda-petal)]/70 px-4 py-3 transition-colors hover:border-[var(--yunda-maple)]/30">
                <summary class="flex cursor-pointer list-none items-start justify-between gap-3 text-left">
                  <span class="text-lg text-[var(--yunda-bark)] font-semibold" >{{ tt('2) How does gay surrogacy work, step by step?', '2）同志代孕的流程是怎样的？') }}</span>
                  <span class="text-[var(--yunda-maple)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p class="mt-2 text-base text-[var(--yunda-bark)]/85 leading-[1.75]" style="font-family: var(--font-text)">
                  {{ tt('Plan → create/review embryos → match and screening → legal/insurance/escrow → transfer → pregnancy support → birth + parentage paperwork.', '规划 → 创建/审核胚胎 → 匹配与筛查 → 法律/保险/资金托管 → 移植 → 孕期支持 → 分娩与亲权文件。') }}
                </p>
              </details>

              <details class="group border border-[var(--yunda-maple)]/15 rounded-[12px] bg-[var(--yunda-petal)]/70 px-4 py-3 transition-colors hover:border-[var(--yunda-maple)]/30">
                <summary class="flex cursor-pointer list-none items-start justify-between gap-3 text-left">
                  <span class="text-lg text-[var(--yunda-bark)] font-semibold" >{{ tt('3) Is gay surrogacy legal in the U.S. and in California?', '3）同志代孕在美国、加州合法吗？') }}</span>
                  <span class="text-[var(--yunda-maple)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p class="mt-2 text-base text-[var(--yunda-bark)]/85 leading-[1.75]" style="font-family: var(--font-text)">
                  {{ tt('It depends on the state. California is widely chosen for supportive same-sex surrogacy laws and clearer parentage pathways.', '因州而异。加州因对同性代孕友好、亲权路径清晰而被广泛选择。') }}
                </p>
              </details>

              <details class="group border border-[var(--yunda-maple)]/15 rounded-[12px] bg-[var(--yunda-petal)]/70 px-4 py-3 transition-colors hover:border-[var(--yunda-maple)]/30">
                <summary class="flex cursor-pointer list-none items-start justify-between gap-3 text-left">
                  <span class="text-lg text-[var(--yunda-bark)] font-semibold" >{{ tt('4) What is a PBO (pre-birth order) for gay parents?', '4）什么是同性父母的 PBO（预出生令）？') }}</span>
                  <span class="text-[var(--yunda-maple)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p class="mt-2 text-base text-[var(--yunda-bark)]/85 leading-[1.75]" style="font-family: var(--font-text)">
                  {{ tt('A pre-birth order helps confirm parentage before delivery. It often makes the hospital process and paperwork smoother.', '预出生令在分娩前确认亲权，通常能让医院流程与文件处理更顺畅。') }}
                </p>
              </details>

              <details class="group border border-[var(--yunda-maple)]/15 rounded-[12px] bg-[var(--yunda-petal)]/70 px-4 py-3 transition-colors hover:border-[var(--yunda-maple)]/30">
                <summary class="flex cursor-pointer list-none items-start justify-between gap-3 text-left">
                  <span class="text-lg text-[var(--yunda-bark)] font-semibold" >{{ tt('5) Can both dads be on the birth certificate in California?', '5）在加州，两位爸爸都能上出生证吗？') }}</span>
                  <span class="text-[var(--yunda-maple)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p class="mt-2 text-base text-[var(--yunda-bark)]/85 leading-[1.75]" style="font-family: var(--font-text)">
                  {{ tt('Often yes, with the right legal plan and documentation. We coordinate with California counsel to keep the process clear.', '通常可以，只要法律方案与文件齐备。我们会与加州律师合作，确保流程清晰。') }}
                </p>
              </details>

              <details class="group border border-[var(--yunda-maple)]/15 rounded-[12px] bg-[var(--yunda-petal)]/70 px-4 py-3 transition-colors hover:border-[var(--yunda-maple)]/30">
                <summary class="flex cursor-pointer list-none items-start justify-between gap-3 text-left">
                  <span class="text-lg text-[var(--yunda-bark)] font-semibold" >{{ tt('6) Can both moms be on the birth certificate for lesbian surrogacy?', '6）女同志代孕，两位妈妈都能上出生证吗？') }}</span>
                  <span class="text-[var(--yunda-maple)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p class="mt-2 text-base text-[var(--yunda-bark)]/85 leading-[1.75]" style="font-family: var(--font-text)">
                  {{ tt('Often yes. California parentage steps (commonly including a pre-birth order) help recognize both moms.', '通常可以。加州的亲权流程（常含预出生令）可帮助同时确认两位妈妈。') }}
                </p>
              </details>

              <details class="group border border-[var(--yunda-maple)]/15 rounded-[12px] bg-[var(--yunda-petal)]/70 px-4 py-3 transition-colors hover:border-[var(--yunda-maple)]/30">
                <summary class="flex cursor-pointer list-none items-start justify-between gap-3 text-left">
                  <span class="text-lg text-[var(--yunda-bark)] font-semibold" >{{ tt('7) How much does surrogacy for gay couples cost?', '7）同志家庭代孕要花多少钱？') }}</span>
                  <span class="text-[var(--yunda-maple)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p class="mt-2 text-base text-[var(--yunda-bark)]/85 leading-[1.75]" style="font-family: var(--font-text)">
                  {{ tt('It varies by medical pathway. Biggest drivers: IVF/donor needs, surrogate support, legal fees, insurance review, escrow, and agency coordination.', '取决于医疗路径。主要驱动包括 IVF/供卵需求、代孕支持、法律费用、保险审核、资金托管及机构协调。') }}
                </p>
              </details>

              <details class="group border border-[var(--yunda-maple)]/15 rounded-[12px] bg-[var(--yunda-petal)]/70 px-4 py-3 transition-colors hover-border-[var(--yunda-maple)]/30">
                <summary class="flex cursor-pointer list-none items-start justify-between gap-3 text-left">
                  <span class="text-lg text-[var(--yunda-bark)] font-semibold" >{{ tt('8) What are the main cost components in gay surrogacy?', '8）同志代孕的主要费用构成是什么？') }}</span>
                  <span class="text-[var(--yunda-maple)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p class="mt-2 text-base text-[var(--yunda-bark)]/85 leading-[1.75]" style="font-family: var(--font-text)">
                  {{ tt('Medical (IVF/testing/transfer), surrogate-related costs, legal + parentage, insurance/escrow, and agency support.', '医疗（IVF/检测/移植）、代孕相关费用、法律与亲权、保险/托管，以及机构支持。') }}
                </p>
              </details>

              <details class="group border border-[var(--yunda-maple)]/15 rounded-[12px] bg-[var(--yunda-petal)]/70 px-4 py-3 transition-colors hover:border-[var(--yunda-maple)]/30">
                <summary class="flex cursor-pointer list-none items-start justify-between gap-3 text-left">
                  <span class="text-lg text-[var(--yunda-bark)] font-semibold" >{{ tt('9) How do gay couples choose an egg donor, and where does IVF fit?', '9）同志伴侣如何选择供卵者？IVF 在哪里介入？') }}</span>
                  <span class="text-[var(--yunda-maple)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p class="mt-2 text-base text-[var(--yunda-bark)]/85 leading-[1.75]" style="font-family: var(--font-text)">
                  {{ tt('Many gay men surrogacy journeys use an egg donor and IVF to create embryos, then move to matching and transfer.', '许多同志家庭会用供卵和 IVF 创建胚胎，然后进入匹配与移植阶段。') }}
                </p>
              </details>

              <details class="group border border-[var(--yunda-maple)]/15 rounded-[12px] bg-[var(--yunda-petal)]/70 px-4 py-3 transition-colors hover:border-[var(--yunda-maple)]/30">
                <summary class="flex cursor-pointer list-none items-start justify-between gap-3 text-left">
                  <span class="text-lg text-[var(--yunda-bark)] font-semibold" >{{ tt('10) International parents: how do we bring a baby home after surrogacy?', '10）国际家庭：代孕后如何把宝宝带回国？') }}</span>
                  <span class="text-[var(--yunda-maple)] transition-transform group-open:rotate-45">+</span>
                </summary>
                <p class="mt-2 text-base text-[var(--yunda-bark)]/85 leading-[1.75]" style="font-family: var(--font-text)">
                  {{ tt('Plan early for documents and travel timing after birth. Requirements vary by country, so timelines should be prepared in advance.', '请提前准备出生后的文件与行程，各国要求不同，时间线需预先规划。') }}
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

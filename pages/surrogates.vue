<script setup lang="ts">
import { computed } from 'vue'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import RelatedGuides from '@/components/base/RelatedGuides.vue'
import SeoTrustNote from '@/components/base/SeoTrustNote.vue'
import { buildBreadcrumbListSchema, buildItemListSchema, buildWebPageSchema } from '~/utils/schema'

const { locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en: string, zh: string) => (isZh.value ? zh : en)

const pageTitle = computed(() => tt(
  'For Surrogates | Yunda Surrogacy Guide',
  '代孕妈妈指南 | Yunda Surrogacy',
))

const pageDescription = computed(() => tt(
  'Explore Yunda Surrogacy resources for surrogates, including requirements, compensation, screening, journey steps, protection, and application guidance.',
  '了解 Yunda Surrogacy 为代孕妈妈准备的资格、补偿、筛查、流程、保障与申请指南。',
))

const dateModified = '2026-06-30'
const reviewerId = computed(() => `${siteUrl.value || 'https://www.yundasurrogacy.com'}/about#kayla-luo`)

const directAnswer = computed(() => tt(
  'Yunda\'s surrogate hub helps women decide whether to explore gestational surrogacy by organizing the questions that matter most before applying: basic eligibility, pay and benefits, screening, legal protection, insurance review, escrow payment timing, matching, embryo transfer, pregnancy support, and referral options. The hub is educational and does not replace medical, legal, psychological, or insurance review. A candidate can use it to understand what Yunda reviews first, what licensed professionals confirm later, and which guide to read before submitting an application or referring someone they care about.',
  '孕达代孕妈妈 Hub 帮助女性在申请前判断是否适合继续了解妊娠代孕，集中整理最重要的问题：基础资格、补偿与福利、筛查、法律保护、保险审核、托管付款时间、匹配、胚胎移植、孕期支持和推荐方式。本 Hub 属于教育内容，不替代医疗、法律、心理或保险审核。候选人可以用它了解孕达先看哪些条件、后续由哪些持证专业人士确认，以及在提交申请或推荐朋友前应该先阅读哪篇指南。',
))

const decisionSteps = computed(() => [
  {
    title: tt('1. Check fit before forms', '1. 填表前先判断适配度'),
    body: tt('Start with age, pregnancy history, health background, lifestyle, appointment availability, transportation, and support at home.', '先看年龄、孕产史、健康背景、生活方式、就诊配合度、交通和家庭支持。'),
  },
  {
    title: tt('2. Review pay with protections', '2. 把补偿和保障一起看'),
    body: tt('Compensation matters, but candidates should also review escrow timing, insurance review, legal counsel, reimbursements, and what happens at each milestone.', '补偿很重要，但也要同时了解托管付款时间、保险审核、法律顾问、报销项目和每个节点会发生什么。'),
  },
  {
    title: tt('3. Understand who confirms what', '3. 分清谁来确认什么'),
    body: tt('Yunda can coordinate and explain the journey; clinics, psychologists, attorneys, and insurance professionals confirm approval, documents, and safeguards.', '孕达负责协调和说明流程；诊所、心理专家、律师和保险专业人士负责确认批准、文件和保障。'),
  },
])

const trustPoints = computed(() => [
  tt('Clear candidate-first language that avoids treating surrogates as a transaction.', '使用尊重候选人的语言，避免把代孕妈妈交易化。'),
  tt('Visible links to eligibility, screening, compensation, journey, and legal/transfer details.', '清晰链接到资格、筛查、补偿、旅程以及法律/移植细节。'),
  tt('Trust note clarifies that final approval depends on professional review, not website copy.', '信任说明明确最终批准取决于专业审核，而不是网页文案。'),
])

const guideLinks = computed(() => [
  {
    title: tt('Start Your Application', '开始代孕申请'),
    description: tt('Begin the application path and learn what the first step looks like.', '了解申请入口和第一步需要准备什么。'),
    to: '/be-surrogate',
    tag: tt('Apply', '申请'),
  },
  {
    title: tt('Check If You Qualify', '确认是否符合资格'),
    description: tt('Review age, health, pregnancy history, lifestyle, and screening requirements.', '查看年龄、健康、孕产史、生活方式和筛查要求。'),
    to: '/surrogate-requirements',
    tag: tt('Eligibility', '资格'),
  },
  {
    title: tt('See Pay & Benefits', '查看补偿与福利'),
    description: tt('Understand base pay, benefits, reimbursements, escrow timing, and protections.', '了解基础补偿、福利、报销、托管付款时间和保障。'),
    to: '/benefit',
    tag: tt('Key Guide', '重点'),
  },
  {
    title: tt('Understand the Journey', '了解代孕旅程'),
    description: tt('Get a practical overview of what the surrogate journey feels like day to day.', '了解代孕旅程中每个阶段的实际体验。'),
    to: '/journey',
    tag: tt('Journey', '旅程'),
  },
  {
    title: tt('Prepare for Screening', '准备筛查流程'),
    description: tt('Learn how medical, psychological, background, and records review fit together.', '了解医疗、心理、背景和病历审核如何衔接。'),
    to: '/screening',
    tag: tt('Screening', '筛查'),
  },
  {
    title: tt('Review Payment & Escrow Details', '查看付款与托管说明'),
    description: tt('Review payment schedules, escrow handling, reimbursements, and compensation details.', '查看付款时间、托管安排、报销项目和补偿细节。'),
    to: '/surrogate-compensation',
    tag: tt('Details', '细节'),
  },
  {
    title: tt('Review Transfer & Legal Steps', '查看移植与法律步骤'),
    description: tt('Review the detailed IVF transfer, legal agreement, and milestone coordination steps.', '查看 IVF 移植、法律协议和关键节点协调的详细说明。'),
    to: '/surrogate-process',
    tag: tt('Specialized', '专题'),
  },
  {
    title: tt('Refer a Candidate', '推荐候选人'),
    description: tt('Learn how referrals work and how rewards are structured for qualified candidates.', '了解推荐流程以及合格候选人的奖励安排。'),
    to: '/referral',
    tag: tt('Referral', '推荐'),
  },
  {
    title: tt('Prepare Before You Apply', '申请前准备'),
    description: tt('Read a broader guide for women considering becoming a surrogate.', '阅读适合正在考虑成为代孕妈妈的完整指南。'),
    to: '/become-a-surrogate',
    tag: tt('Guide', '指南'),
  },
  {
    title: tt('Review California Requirements', '查看加州代孕妈妈要求'),
    description: tt('Understand California-specific surrogate expectations, process, and support.', '了解加州代孕妈妈相关的要求、流程与支持。'),
    to: '/become-surrogate-california',
    tag: tt('California', '加州'),
  },
])

const schemaItems = computed(() => guideLinks.value.map((item, index) => ({
  name: item.title,
  description: item.description,
  url: item.to,
  position: index + 1,
})))

const relatedPerformanceLinks = computed(() => [
  {
    to: '/benefit',
    title: tt('Surrogate Pay & Benefits', '代孕补偿与福利'),
    description: tt('The primary compensation and benefits guide for women comparing whether surrogacy fits their family.', '适合正在判断代孕是否适合家庭安排的女性重点阅读。'),
    image: '/images/pages/benefit/hero.jpg',
  },
  {
    to: '/blog/Surrogate-Salary-Benefits-2025-Key-Facts-Every-Surrogate-Should-Know',
    title: tt('Surrogate Salary & Benefits Key Facts', '代孕妈妈薪酬与福利重点'),
    description: tt('A high-performing article that answers common pay, benefit, and expectation questions.', '表现较好的文章，集中回答薪酬、福利和预期问题。'),
    image: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/1761318068774-uvro4j.jpg',
    date: tt('October 24, 2025', '2025年10月24日'),
  },
  {
    to: '/blog/How-to-Become-a-Surrogate-Step-by-Step-Guide',
    title: tt('How to Become a Surrogate Step by Step', '如何成为代孕妈妈'),
    description: tt('Helps candidates understand application, screening, matching, and journey stages before applying.', '帮助候选人了解申请、筛查、匹配和旅程阶段。'),
    image: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/1761892210348-xt9x4m.JPEG',
    date: tt('October 31, 2025', '2025年10月31日'),
  },
])

const pageSchema = computed(() => buildWebPageSchema({
  baseUrl: siteUrl.value || undefined,
  url: '/surrogates',
  name: pageTitle.value,
  description: pageDescription.value,
  about: directAnswer.value,
  audience: tt('Surrogates', '代孕妈妈'),
  dateModified,
  reviewedBy: { '@id': reviewerId.value },
  locale: locale.value,
}))

const breadcrumbSchema = computed(() => buildBreadcrumbListSchema({
  baseUrl: siteUrl.value || undefined,
  locale: locale.value,
  items: [
    { name: tt('Home', '首页'), url: '/' },
    { name: tt('For Surrogates', '代孕妈妈指南'), url: '/surrogates' },
  ],
}))

const itemListSchema = computed(() => buildItemListSchema({
  baseUrl: siteUrl.value || undefined,
  locale: locale.value,
  name: tt('For Surrogates guide links', '代孕妈妈指南链接'),
  description: pageDescription.value,
  items: schemaItems.value,
}))

useHead(() => ({
  title: pageTitle.value,
  meta: [
    { name: 'description', content: pageDescription.value },
  ],
  script: [
    { key: 'schema-surrogates-page', type: 'application/ld+json', children: JSON.stringify(pageSchema.value) },
    { key: 'schema-surrogates-breadcrumb', type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema.value) },
    { key: 'schema-surrogates-item-list', type: 'application/ld+json', children: JSON.stringify(itemListSchema.value) },
  ],
}))
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />
    <main class="hub-page">
      <section class="hub-hero">
        <div class="hub-shell">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <NuxtLink :to="localePath('/')">
              {{ tt('Home', '首页') }}
            </NuxtLink>
            <span aria-hidden="true">/</span>
            <span>{{ tt('For Surrogates', '代孕妈妈指南') }}</span>
          </nav>

          <div class="hero-grid">
            <div>
              <p class="eyebrow">
                {{ tt('Surrogate Hub', '代孕妈妈 Hub') }}
              </p>
              <h1>{{ tt('For Surrogates', '代孕妈妈指南') }}</h1>
              <p class="hero-copy">
                {{ tt('Use this hub to understand eligibility, compensation, screening, the full journey, and the support system before you apply.', '通过这个 Hub 了解资格、补偿、筛查、完整流程与支持体系，再决定是否开始申请。') }}
              </p>
              <div class="hero-actions">
                <NuxtLink :to="localePath('/be-surrogate')" class="primary-action">
                  {{ tt('Start Application', '开始申请') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/benefit')" class="secondary-action">
                  {{ tt('View Pay & Benefits', '查看补偿与福利') }}
                </NuxtLink>
              </div>
            </div>

          </div>
        </div>
      </section>

      <SeoTrustNote
        :updated="tt('Last updated: June 30, 2026', '最后更新：2026年6月30日')"
        :reviewed-by="tt('Reviewed by Kayla Luo, Vice President, North America', 'Kayla Luo（北美区副总裁）审阅')"
        :note="tt('This hub explains surrogate eligibility, pay, screening, and support in plain language. Final approval depends on OB records, clinic medical clearance, psychological screening, legal review, insurance review, and program requirements.', '本 Hub 用清晰语言说明代孕妈妈资格、补偿、筛查和支持。最终批准取决于产科病历、诊所医学清关、心理筛查、法律审核、保险审核和项目要求。')"
        :sources="[
          { label: tt('Requirements', '资格要求'), href: localePath('/surrogate-requirements') },
          { label: tt('Pay and benefits', '补偿与福利'), href: localePath('/benefit') },
          { label: tt('Screening guide', '筛查指南'), href: localePath('/screening') },
          { label: tt('ASRM carrier guidance', 'ASRM 妊娠载体指南'), href: 'https://www.asrm.org/practice-guidance/practice-committee-documents/recommendations-for-practices-using-gestational-carriers-a-committee-opinion-2022/' },
        ]"
      />

      <section class="hub-shell answer-section">
        <div class="answer-card">
          <p class="eyebrow">
            {{ tt('Direct answer', '直接答案') }}
          </p>
          <h2>{{ tt('How should surrogate candidates use this hub?', '代孕候选人应该如何使用这个 Hub？') }}</h2>
          <p>{{ directAnswer }}</p>
        </div>
      </section>

      <section class="hub-shell hub-section">
        <div class="section-heading">
          <p class="eyebrow">
            {{ tt('Current URLs stay unchanged', '现有 URL 不变') }}
          </p>
          <h2>{{ tt('Explore surrogate resources', '浏览代孕妈妈相关页面') }}</h2>
        </div>

        <div class="card-grid">
          <NuxtLink
            v-for="item in guideLinks"
            :key="item.to"
            :to="localePath(item.to)"
            class="guide-card"
          >
            <span>{{ item.tag }}</span>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </NuxtLink>
        </div>
      </section>

      <section class="hub-shell decision-section">
        <div class="section-heading">
          <p class="eyebrow">
            {{ tt('Decision path', '决策路径') }}
          </p>
          <h2>{{ tt('Use the hub to lower uncertainty before applying', '申请前先用这个 Hub 降低不确定性') }}</h2>
        </div>
        <div class="decision-grid">
          <article v-for="item in decisionSteps" :key="item.title" class="decision-card">
            <h3>{{ item.title }}</h3>
            <p>{{ item.body }}</p>
          </article>
        </div>
        <div class="trust-strip" aria-label="Trust signals">
          <p v-for="point in trustPoints" :key="point">
            {{ point }}
          </p>
        </div>
      </section>

      <RelatedGuides
        :title="tt('Next: Pay, Eligibility, and Application Prep', '下一步：补偿、资格与申请准备')"
        :intro="tt('If you are considering becoming a surrogate, start with pay and benefits, then review eligibility and the application path before submitting your information.', '如果你正在考虑成为代孕妈妈，建议先了解补偿与福利，再确认资格要求和申请流程。')"
        :links="relatedPerformanceLinks"
      />
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.hub-page {
  font-family: var(--font-text);
}

.hub-shell {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
}

.hub-hero {
  position: relative;
  overflow: hidden;
  padding: 96px 0 72px;
  background:
    radial-gradient(circle at 12% 10%, rgba(169, 108, 66, 0.22), transparent 34%),
    radial-gradient(circle at 88% 18%, rgba(191, 201, 191, 0.42), transparent 32%),
    linear-gradient(135deg, rgba(251, 240, 218, 0.96), rgba(255, 255, 255, 0.72));
}

.breadcrumb {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 36px;
  font-size: 0.9rem;
  color: rgba(39, 31, 24, 0.72);
}

.breadcrumb a {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.hero-grid {
  max-width: 820px;
}

.eyebrow {
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.16em;
  font-size: 0.78rem;
  font-weight: 800;
  color: var(--yunda-maple);
}

h1,
h2,
h3 {
  font-family: var(--font-display);
}

h1 {
  max-width: 760px;
  margin: 0;
  font-size: clamp(2.6rem, 7vw, 5.6rem);
  line-height: 0.96;
  font-weight: 600;
}

.hero-copy {
  max-width: 680px;
  margin-top: 24px;
  font-size: 1.12rem;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 32px;
}

.primary-action,
.secondary-action {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  border-radius: 999px;
  padding: 0 22px;
  font-weight: 800;
}

.primary-action {
  background: var(--yunda-bark);
  color: var(--yunda-petal);
}

.secondary-action {
  border: 1px solid rgba(39, 31, 24, 0.28);
  background: rgba(255, 255, 255, 0.62);
}

.hub-section {
  padding: 56px 0 72px;
}

.answer-section {
  padding: 48px 0 12px;
}

.answer-card,
.decision-card,
.trust-strip {
  border: 1px solid rgba(39, 31, 24, 0.1);
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.78);
  box-shadow: 0 12px 30px rgba(39, 31, 24, 0.06);
}

.answer-card {
  padding: 28px;
}

.answer-card h2 {
  margin: 0;
  font-size: clamp(1.8rem, 3vw, 2.6rem);
}

.answer-card p:last-child {
  max-width: 880px;
  margin: 16px 0 0;
  font-size: 1.04rem;
  line-height: 1.75;
  color: rgba(39, 31, 24, 0.82);
}

.section-heading {
  max-width: 720px;
  margin-bottom: 28px;
}

.section-heading h2 {
  margin: 0;
  font-size: clamp(2rem, 4vw, 3.4rem);
}

.card-grid {
  display: grid;
  gap: 16px;
}

.guide-card {
  display: block;
  border: 1px solid rgba(39, 31, 24, 0.1);
  border-radius: 22px;
  padding: 22px;
  background: rgba(255, 255, 255, 0.78);
  transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
}

.guide-card:hover {
  transform: translateY(-3px);
  border-color: rgba(169, 108, 66, 0.38);
  box-shadow: 0 18px 36px rgba(39, 31, 24, 0.09);
}

.guide-card span {
  display: inline-flex;
  margin-bottom: 18px;
  border-radius: 999px;
  padding: 5px 10px;
  background: rgba(169, 108, 66, 0.12);
  color: var(--yunda-maple);
  font-size: 0.76rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.guide-card h3 {
  margin: 0;
  font-size: 1.35rem;
}

.guide-card p {
  margin: 10px 0 0;
  line-height: 1.65;
  color: rgba(39, 31, 24, 0.78);
}

.decision-section {
  padding: 0 0 72px;
}

.decision-grid {
  display: grid;
  gap: 16px;
}

.decision-card {
  padding: 22px;
}

.decision-card h3 {
  margin: 0;
  font-size: 1.28rem;
}

.decision-card p {
  margin: 10px 0 0;
  line-height: 1.7;
  color: rgba(39, 31, 24, 0.78);
}

.trust-strip {
  display: grid;
  gap: 12px;
  margin-top: 18px;
  padding: 18px;
}

.trust-strip p {
  margin: 0;
  font-weight: 700;
  line-height: 1.55;
}

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .decision-grid,
  .trust-strip {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .card-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>

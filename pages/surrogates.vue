<script setup lang="ts">
import { computed } from 'vue'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
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

const guideLinks = computed(() => [
  {
    title: tt('Start as a Surrogate', '开始申请成为代孕妈妈'),
    description: tt('Begin the application path and learn what the first step looks like.', '了解申请入口和第一步需要准备什么。'),
    to: '/be-surrogate',
    tag: tt('Apply', '申请'),
  },
  {
    title: tt('Surrogate Requirements', '代孕妈妈资格要求'),
    description: tt('Review age, health, pregnancy history, lifestyle, and screening requirements.', '查看年龄、健康、孕产史、生活方式和筛查要求。'),
    to: '/surrogate-requirements',
    tag: tt('Eligibility', '资格'),
  },
  {
    title: tt('Surrogate Compensation', '代孕补偿'),
    description: tt('Understand base pay, benefits, reimbursements, escrow timing, and protections.', '了解基础补偿、福利、报销、托管付款时间和保障。'),
    to: '/surrogate-compensation',
    tag: tt('Pay', '补偿'),
  },
  {
    title: tt('Surrogate Process', '代孕流程'),
    description: tt('See the step-by-step journey from application and matching to pregnancy support.', '查看从申请、匹配到孕期支持的完整步骤。'),
    to: '/surrogate-process',
    tag: tt('Process', '流程'),
  },
  {
    title: tt('Journey Overview', '旅程概览'),
    description: tt('Get a practical overview of what the surrogate journey feels like day to day.', '了解代孕旅程中每个阶段的实际体验。'),
    to: '/journey',
    tag: tt('Journey', '旅程'),
  },
  {
    title: tt('Screening Process', '筛查流程'),
    description: tt('Learn how medical, psychological, background, and records review fit together.', '了解医疗、心理、背景和病历审核如何衔接。'),
    to: '/screening',
    tag: tt('Screening', '筛查'),
  },
  {
    title: tt('Benefits and Support', '福利与支持'),
    description: tt('See the support system around benefits, insurance, coordination, and care.', '查看福利、保险、协调和关怀支持体系。'),
    to: '/benefit',
    tag: tt('Support', '支持'),
  },
  {
    title: tt('Referral Program', '推荐计划'),
    description: tt('Learn how referrals work and how rewards are structured for qualified candidates.', '了解推荐流程以及合格候选人的奖励安排。'),
    to: '/referral',
    tag: tt('Referral', '推荐'),
  },
  {
    title: tt('Become a Surrogate Guide', '成为代孕妈妈指南'),
    description: tt('Read a broader guide for women considering becoming a surrogate.', '阅读适合正在考虑成为代孕妈妈的完整指南。'),
    to: '/become-a-surrogate',
    tag: tt('Guide', '指南'),
  },
  {
    title: tt('California Surrogate Guide', '加州代孕妈妈指南'),
    description: tt('Understand California-specific surrogate expectations, process, and support.', '了解加州代孕妈妈相关的要求、流程与支持。'),
    to: '/become-surrogate-california',
    tag: tt('California', '加州'),
  },
  {
    title: tt('California Consultation', '加州代孕咨询'),
    description: tt('Explore consultation guidance for surrogates considering a California journey.', '查看面向加州代孕旅程的咨询说明。'),
    to: '/california-surrogacy-consultation',
    tag: tt('Consultation', '咨询'),
  },
])

const schemaItems = computed(() => guideLinks.value.map((item, index) => ({
  name: item.title,
  description: item.description,
  url: item.to,
  position: index + 1,
})))

const pageSchema = computed(() => buildWebPageSchema({
  baseUrl: siteUrl.value || undefined,
  url: '/surrogates',
  name: pageTitle.value,
  description: pageDescription.value,
  about: tt('Surrogate education hub and internal guide for Yunda Surrogacy.', 'Yunda Surrogacy 代孕妈妈教育中心与内部指南入口。'),
  audience: tt('Surrogates', '代孕妈妈'),
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
                <NuxtLink :to="localePath('/surrogate-compensation')" class="secondary-action">
                  {{ tt('View Compensation', '查看补偿') }}
                </NuxtLink>
              </div>
            </div>

          </div>
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
  padding: 72px 0 88px;
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

@media (min-width: 768px) {
  .card-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 1100px) {
  .card-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}
</style>

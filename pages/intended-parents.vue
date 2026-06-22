<script setup lang="ts">
import { computed } from 'vue'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import RelatedGuides from '@/components/base/RelatedGuides.vue'
import { buildBreadcrumbListSchema, buildItemListSchema, buildWebPageSchema } from '~/utils/schema'

const { locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en: string, zh: string) => (isZh.value ? zh : en)

const pageTitle = computed(() => tt(
  'For Intended Parents | Yunda Surrogacy Guide',
  '准父母指南 | Yunda Surrogacy',
))

const pageDescription = computed(() => tt(
  'Explore Yunda Surrogacy resources for intended parents, including process, costs, IVF coordination, egg donation, inclusive family-building, and legal protection.',
  '了解 Yunda Surrogacy 为准父母准备的流程、费用、IVF 协调、捐卵、包容性家庭建立与法律保障资源。',
))

const guideLinks = computed(() => [
  {
    title: tt('Start a Private Consultation', '开始私密咨询'),
    description: tt('Begin the parent intake path and share your family-building goals.', '进入准父母咨询入口，说明你的家庭建立目标。'),
    to: '/be-parents',
    tag: tt('Apply', '咨询'),
  },
  {
    title: tt('Understand the Full Process', '了解完整流程'),
    description: tt('Understand the journey from consultation and IVF coordination to matching, legal clearance, pregnancy, and birth.', '了解从咨询、IVF 协调、匹配、法律清关到孕期和出生的完整流程。'),
    to: '/surrogacy-process',
    tag: tt('Process', '流程'),
  },
  {
    title: tt('Plan Your Surrogacy Budget', '规划代孕预算'),
    description: tt('Review agency fees, compensation, escrow, insurance, legal fees, and case-dependent costs.', '查看机构费、补偿、托管、保险、法律费用和个案浮动成本。'),
    to: '/surrogacy-cost',
    tag: tt('Cost', '费用'),
  },
  {
    title: tt('Explore Egg Donation Options', '了解捐卵方案'),
    description: tt('Learn how egg donation can fit into an IVF and gestational surrogacy plan.', '了解捐卵如何衔接 IVF 与妊娠代孕计划。'),
    to: '/egg-donation',
    tag: tt('IVF', 'IVF'),
  },
  {
    title: tt('Coordinate With IVF Clinics', '协调 IVF 诊所'),
    description: tt('Explore how clinic coordination, insurance planning, and timeline management work together.', '了解诊所协调、保险规划和时间线管理如何配合。'),
    to: '/partner-ivf-clinics',
    tag: tt('Clinics', '诊所'),
  },
  {
    title: tt('Find Inclusive Family-Building Support', '获得包容性家庭建立支持'),
    description: tt('Review inclusive surrogacy support for single parents and LGBTQ+ intended parents.', '查看面向单身和 LGBTQ+ 准父母的包容性代孕支持。'),
    to: '/single-parents-lgbtq',
    tag: tt('Inclusive', '包容'),
  },
  {
    title: tt('Understand Legal, Insurance & Escrow Protection', '了解法律、保险与托管保障'),
    description: tt('Understand contracts, escrow, insurance, parentage, and coordinated protection in California.', '了解加州合同、托管、保险、亲权确认与协调保障。'),
    to: '/surrogacy-protection-california',
    tag: tt('Legal', '法律'),
  },
  {
    title: tt('Get California Consultation Guidance', '获取加州咨询指导'),
    description: tt('A consultation guide for Chinese-speaking intended parents planning a California surrogacy journey.', '面向计划加州代孕旅程的华人准父母咨询说明。'),
    to: '/california-surrogacy-consultation',
    tag: tt('California', '加州'),
  },
])

const supportingLinks = computed(() => [
  { title: tt('Resources & Media', '资源与媒体'), to: '/resources' },
  { title: tt('Blog', '博客'), to: '/blog' },
])

const relatedPerformanceLinks = computed(() => [
  {
    to: '/blog/How-Much-Is-Surrogacy-Understanding-the-Real-Cost-of-Building-a-Family',
    title: tt('How Much Is Surrogacy?', '美国代孕真实费用'),
    description: tt('A high-intent cost guide for families comparing surrogacy budgets and next steps.', '适合正在比较代孕预算和下一步安排的准父母继续阅读。'),
    image: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/1761881438525-s95lbq.webp',
    date: tt('October 31, 2025', '2025年10月31日'),
  },
  {
    to: '/blog/How-Long-Does-the-Surrogacy-Process-Take-From-Start-to-Finish',
    title: tt('Surrogacy Timeline From Start to Finish', '代孕完整时间线'),
    description: tt('Explains the main timeline stages from consultation through delivery planning.', '说明从咨询到分娩计划的主要时间线阶段。'),
    image: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/1770103968025-plr4cr.png',
    date: tt('February 3, 2026', '2026年2月3日'),
  },
  {
    to: '/surrogacy-protection-california',
    title: tt('Legal, Insurance & Escrow Protection', '法律、保险与托管保障'),
    description: tt('A core service guide for intended parents who want clearer protection before moving forward.', '适合希望先了解保障机制再推进的准父母。'),
    image: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/static/surrogacy-protection-california/cover-1.png',
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
  url: '/intended-parents',
  name: pageTitle.value,
  description: pageDescription.value,
  about: tt('Intended parent education hub and internal guide for Yunda Surrogacy.', 'Yunda Surrogacy 准父母教育中心与内部指南入口。'),
  audience: tt('Intended parents', '准父母'),
  locale: locale.value,
}))

const breadcrumbSchema = computed(() => buildBreadcrumbListSchema({
  baseUrl: siteUrl.value || undefined,
  locale: locale.value,
  items: [
    { name: tt('Home', '首页'), url: '/' },
    { name: tt('For Intended Parents', '准父母指南'), url: '/intended-parents' },
  ],
}))

const itemListSchema = computed(() => buildItemListSchema({
  baseUrl: siteUrl.value || undefined,
  locale: locale.value,
  name: tt('For Intended Parents guide links', '准父母指南链接'),
  description: pageDescription.value,
  items: schemaItems.value,
}))

useHead(() => ({
  title: pageTitle.value,
  meta: [
    { name: 'description', content: pageDescription.value },
  ],
  script: [
    { key: 'schema-intended-parents-page', type: 'application/ld+json', children: JSON.stringify(pageSchema.value) },
    { key: 'schema-intended-parents-breadcrumb', type: 'application/ld+json', children: JSON.stringify(breadcrumbSchema.value) },
    { key: 'schema-intended-parents-item-list', type: 'application/ld+json', children: JSON.stringify(itemListSchema.value) },
  ],
}))
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />
    <main class="hub-page">
      <section class="hub-hero parents-hero">
        <div class="hub-shell">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <NuxtLink :to="localePath('/')">
              {{ tt('Home', '首页') }}
            </NuxtLink>
            <span aria-hidden="true">/</span>
            <span>{{ tt('For Intended Parents', '准父母指南') }}</span>
          </nav>

          <div class="hero-grid">
            <div>
              <p class="eyebrow">
                {{ tt('Intended Parent Hub', '准父母 Hub') }}
              </p>
              <h1>{{ tt('For Intended Parents', '准父母指南') }}</h1>
              <p class="hero-copy">
                {{ tt('Use this hub to understand cost, timeline, clinic coordination, legal protection, and inclusive paths before you start a surrogacy journey.', '通过这个 Hub 了解费用、时间线、诊所协调、法律保障与包容性路径，再开始代孕旅程。') }}
              </p>
              <div class="hero-actions">
                <NuxtLink :to="localePath('/be-parents')" class="primary-action">
                  {{ tt('Start Consultation', '开始咨询') }}
                </NuxtLink>
                <NuxtLink :to="localePath('/surrogacy-cost')" class="secondary-action">
                  {{ tt('View Cost Guide', '查看费用指南') }}
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
          <h2>{{ tt('Explore intended parent resources', '浏览准父母相关页面') }}</h2>
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

        <div class="supporting-links">
          <span>{{ tt('Supporting resources', '辅助资源') }}</span>
          <NuxtLink
            v-for="item in supportingLinks"
            :key="item.to"
            :to="localePath(item.to)"
          >
            {{ item.title }}
          </NuxtLink>
        </div>
      </section>

      <RelatedGuides
        :title="tt('Next: Cost, Timeline, and Protection Planning', '下一步：费用、时间线与保障规划')"
        :intro="tt('For intended parents, the next decision usually depends on budget, timeline, legal protection, insurance, and clinic readiness. These guides help you compare those essentials before consultation.', '准父母的下一步通常取决于预算、时间线、法律保障、保险和诊所准备情况。以下内容可以帮助你在咨询前先做判断。')"
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
    radial-gradient(circle at 8% 18%, rgba(191, 201, 191, 0.5), transparent 34%),
    radial-gradient(circle at 88% 12%, rgba(169, 108, 66, 0.2), transparent 30%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.76), rgba(251, 240, 218, 0.96));
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
  max-width: 840px;
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
  max-width: 800px;
  margin: 0;
  font-size: clamp(2.6rem, 7vw, 5.6rem);
  line-height: 0.96;
  font-weight: 600;
}

.hero-copy {
  max-width: 700px;
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

.supporting-links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  margin-top: 28px;
  border-top: 1px solid rgba(39, 31, 24, 0.12);
  padding-top: 24px;
}

.supporting-links span {
  font-weight: 800;
}

.supporting-links a {
  border-radius: 999px;
  padding: 8px 13px;
  background: rgba(255, 255, 255, 0.68);
  text-decoration: underline;
  text-underline-offset: 4px;
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

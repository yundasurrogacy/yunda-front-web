<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import RelatedGuides from '@/components/base/RelatedGuides.vue'
import VideoPlayer from '@/components/base/VideoPlayer.vue'
import VideoPlayerWithCover from '@/components/base/VideoPlayerWithCover.vue'
import { buildCoreServicePageSchemas, buildVideoObjectSchema } from '~/utils/schema'

const { locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

// 视频和封面图资源
const videoResources = {
  video1: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/static/surrogacy-protection-california/1.mp4',
  video2: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/static/surrogacy-protection-california/2.mp4',
  video3: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/static/surrogacy-protection-california/3.mp4',
  video4: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/static/surrogacy-protection-california/4.mp4',
  cover1: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/static/surrogacy-protection-california/cover-1.png',
  cover2: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/static/surrogacy-protection-california/cover-2.png',
  cover3: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/static/surrogacy-protection-california/cover-3.png',
  cover4: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/static/surrogacy-protection-california/cover-4.png',
}

// 本地翻译内容
const translations = {
  zh: {
    meta: {
      title: '加州代孕保护指南 | 法律、托管和保险 | 孕达代孕',
      description: '观看4个视频，了解代孕法律步骤、托管付款和ART保险——专注于加州的指导。',
    },
    hero: {
      title: '代孕保护详解',
      subtitle: '法律、托管和保险 — 聚焦加州',
      description: '为加州准父母和代孕者提供的专业指导。',
      cta: '预约免费咨询',
      downloadChecklist: '下载清单',
    },
    module1: {
      title: '法律问题 — 各州代孕流程有何不同？',
      content: '人们经常问："代孕在加州合法吗？" "各州的代孕流程有何不同？" 实际上，时间线和法律步骤可能因州法律、法院实践和诊所工作流程而有所不同。对于计划在加州进行代孕的准父母——特别是洛杉矶、橙县和圣地亚哥——清晰的法律路线图有助于防止在亲子关系确认、产前命令（PBO）和合同里程碑方面出现延误。本视频解释了各州之间通常的变化、保持不变的内容，以及需要提前确认的事项，以确保您的旅程可预测且受保护。',
    },
    module2: {
      title: '法律问题 — 标准代孕协议的关键组成部分',
      content: '一份强有力的合同明确了医疗决策、补偿和报销、保密性，以及在意外情况下的处理方式——这在加州代孕中尤其重要，因为法律里程碑通常与托管时间表和诊所时间安排一致。本视频分解了标准协议的关键组成部分，以及在签署前应向您的加州代孕律师提出的最重要问题。',
    },
    module3: {
      title: '托管问题 — 代孕付款流程',
      content: '第三方托管账户通过安全持有资金并根据明确定义的里程碑释放付款来保护准父母和代孕者——而不是非正式转账。在加州（洛杉矶、橙县、圣地亚哥），协调合同条款、诊所步骤和托管释放时间对于避免付款争议和旅程中的压力至关重要。本视频解释了代孕补偿通常如何通过托管管理，以及在开始前需要确认的事项。',
    },
    module4: {
      title: '保险问题 — ART保险保护代孕旅程',
      content: '代孕保险规划可能涉及代孕者产假保险、排除条款、等待期、医院账单和新生儿保险时间安排。对于在加州——洛杉矶、橙县、圣地亚哥和湾区——的旅程，与ART相关的保险指导可以帮助减少意外成本并防止最后一刻的意外。本视频解释了ART保险如何保护代孕旅程，以及准父母在匹配前应该提出的关键问题。',
    },
    cities: {
      losAngeles: '洛杉矶',
      orangeCounty: '橙县',
      sanDiego: '圣地亚哥',
      bayArea: '湾区',
    },
    cta: {
      title: '获取加州法律路线图',
      subtitle: '更愿意电话沟通？致电我们：+1 (626) 563-8656',
      button: '预约免费咨询',
    },
    faq: {
      title: '常见问题',
      items: [
        {
          question: '代孕在加州合法吗？',
          answer: '是的，妊娠代孕在加州通常被认为是法律环境较成熟的路径。加州代孕通常需要独立法律顾问、移植前协议和亲权相关步骤。具体法律决定应由加州代孕律师根据个案确认。',
        },
        {
          question: '什么是产前命令（PBO）？',
          answer: '产前命令（PBO）是亲权规划中的法院步骤，帮助在孩子出生前或出生时确认准父母的法律父母身份。具体流程、时间和文件要求会因法院、个案和律师安排而变化。',
        },
        {
          question: '托管如何保护代孕付款？',
          answer: '托管账户由中立第三方持有资金，并按照协议中定义的里程碑释放付款。它可以帮助记录代孕补偿、报销、保险费和其他获批支出，减少非正式转账带来的争议。',
        },
        {
          question: '什么是ART保险？',
          answer: 'ART 保险规划通常围绕辅助生殖和代孕相关风险展开，包括孕产覆盖、排除条款、医院账单、新生儿保障时间和补充保单需求。具体覆盖范围必须以保单和专业保险审查为准。',
        },
      ],
    },
  },
  en: {
    meta: {
      title: 'Surrogacy Protection in California | Legal, Escrow & Insurance | Yunda',
      description: 'Watch 4 videos on surrogacy legal steps, escrow payments, and ART insurance—California-focused guidance.',
    },
    hero: {
      title: 'Surrogacy Protection Explained',
      subtitle: 'Legal, Escrow & Insurance — California Focus',
      description: 'California-focused guidance for intended parents and surrogates.',
      cta: 'Book a Free Consultation',
      downloadChecklist: 'Download Checklist',
    },
    module1: {
      title: 'Legal Issue — How is the surrogacy process different between states?',
      content: 'People often ask: "Is surrogacy legal in California?" "How does the surrogacy process differ by state?" The reality is that timelines and legal steps can change based on state law, court practices, and clinic workflows. For intended parents planning surrogacy in California—a clear legal roadmap helps prevent delays in parentage, pre-birth orders (PBO), and contract milestones. This video explains what usually changes between states, what stays consistent, and what to confirm early so your journey stays predictable and protected.',
    },
    module2: {
      title: 'Legal Issue — The key components to a standard surrogacy agreement',
      content: 'A strong contract clarifies medical decision-making, compensation and reimbursements, confidentiality, and what happens in unexpected situations—which is especially important in California surrogacy where legal milestones often align with escrow schedules and clinic timing. This video breaks down the key components of a standard agreement and the most important questions to ask your California surrogacy attorney before signing.',
    },
    module3: {
      title: 'Escrow Issue — Surrogate Payment process',
      content: 'A third-party escrow account protects both intended parents and surrogates by holding funds securely and releasing payments based on clearly defined milestones—rather than informal transfers. In California , aligning contract terms + clinic steps + escrow release timing is key to avoiding payment disputes and stress during the journey. This video explains how surrogate compensation is typically managed through escrow and what to confirm before you start.',
    },
    module4: {
      title: 'Insurance Issue — ART insurance protects surrogate journeys',
      content: 'Surrogacy insurance planning can involve surrogate maternity coverage, exclusions, waiting periods, hospital billing, and newborn coverage timing. For journeys in California, and the Bay Area—ART-related insurance guidance can help reduce unexpected costs and prevent last-minute surprises. This video explains how ART insurance can protect surrogate journeys and the key questions intended parents should ask before matching.',
    },
    cities: {
      losAngeles: 'Los Angeles',
      orangeCounty: 'Orange County',
      sanDiego: 'San Diego',
      bayArea: 'Bay Area',
    },
    cta: {
      title: 'Get a California Legal Roadmap',
      subtitle: 'Prefer to talk? Call us: +1 (626) 563-8656',
      button: 'Book a Free Consultation',
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          question: 'Is surrogacy legal in California?',
          answer: 'Yes. Gestational surrogacy is generally considered well established in California. A California journey usually involves independent legal counsel, a pre-transfer agreement, and parentage steps. Specific legal decisions should be confirmed by a qualified California surrogacy attorney.',
        },
        {
          question: 'What is a pre-birth order (PBO)?',
          answer: 'A pre-birth order, or PBO, is a parentage step that helps establish the intended parents as the legal parents before or around birth. Timing, documents, and court requirements can vary by case, so attorneys should guide the process.',
        },
        {
          question: 'How does escrow protect surrogacy payments?',
          answer: 'Escrow protects surrogacy payments by placing funds with a neutral third party and releasing approved payments according to agreement milestones. This creates clearer records for surrogate compensation, reimbursements, insurance premiums, and other approved expenses.',
        },
        {
          question: 'What is ART insurance?',
          answer: 'ART insurance planning reviews assisted reproduction and surrogacy-related risks, including maternity coverage, exclusions, hospital billing, newborn coverage timing, and supplemental policy needs. Actual coverage depends on the policy and professional insurance review.',
        },
      ],
    },
  },
}

// 根据当前语言获取翻译
const t = computed(() => {
  const lang = locale.value === 'zh' ? 'zh' : 'en'
  return translations[lang]
})

const protectionTopics = computed(() => [
  {
    name: 'Legal Issue — How is the surrogacy process different between states?',
    description: t.value.module1.content,
  },
  {
    name: 'Legal Issue — The key components to a standard surrogacy agreement',
    description: t.value.module2.content,
  },
  {
    name: 'Escrow Issue — Surrogate Payment Process',
    description: t.value.module3.content,
  },
  {
    name: 'Insurance Issue — ART Insurance Protects Surrogate Journeys',
    description: t.value.module4.content,
  },
])

const protectionVideos = computed(() => [
  {
    name: t.value.module1.title,
    description: t.value.module1.content,
    contentUrl: videoResources.video1,
    thumbnailUrl: videoResources.cover1,
  },
  {
    name: t.value.module2.title,
    description: t.value.module2.content,
    contentUrl: videoResources.video2,
    thumbnailUrl: videoResources.cover2,
  },
  {
    name: t.value.module3.title,
    description: t.value.module3.content,
    contentUrl: videoResources.video3,
    thumbnailUrl: videoResources.cover3,
  },
  {
    name: t.value.module4.title,
    description: t.value.module4.content,
    contentUrl: videoResources.video4,
    thumbnailUrl: videoResources.cover4,
  },
])
const relatedPerformanceLinks = computed(() => [
  {
    to: '/blog/Best-Surrogacy-Agencies-in-California-2026',
    title: locale.value === 'zh' ? '2026 加州最佳代孕机构对比' : 'Best Surrogacy Agencies in California (2026)',
    description: locale.value === 'zh'
      ? 'GSC 高曝光内容，适合继续比较加州机构、费用、匹配和信任因素。'
      : 'High-impression GSC content for comparing California agencies, cost, matching, and trust factors.',
    image: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/1767943885302-ntsmc8.png',
    date: locale.value === 'zh' ? '2025年12月25日' : 'December 25, 2025',
  },
  {
    to: '/blog/2026-Surrogacy-Law-Map-States-That-Protect-Intended-Parents',
    title: locale.value === 'zh' ? '保护准父母的美国代孕法律地图' : '2026 Surrogacy Law Map',
    description: locale.value === 'zh'
      ? '补充了解不同州亲权、法律保护和流程差异。'
      : 'A supporting guide to state-by-state parentage, legal protection, and process differences.',
    image: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/1779093074410-vy6xe3.jpeg',
    date: locale.value === 'zh' ? '2026年5月18日' : 'May 18, 2026',
  },
  {
    to: '/blog/California-IVF-Coverage-2026-SB-729-and-Surrogacy-Explained',
    title: locale.value === 'zh' ? '加州 IVF 覆盖与代孕说明' : 'California IVF Coverage and Surrogacy',
    description: locale.value === 'zh'
      ? '补充理解加州 IVF、保险覆盖和代孕预算之间的关系。'
      : 'A related read on California IVF coverage, insurance, and surrogacy budget planning.',
    image: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/1776044455487-9nsaw5.jpeg',
    date: locale.value === 'zh' ? '2026年4月13日' : 'April 13, 2026',
  },
])

const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: '/surrogacy-protection-california',
  name: 'Surrogacy Protection Explained',
  description: t.value.meta.description,
  about: 'California gestational surrogacy protection, escrow, legal process, and insurance guidance',
  audience: 'Intended parents and gestational carriers',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  dateModified: '2026-06-29',
  reviewedBy: { '@id': `${siteUrl.value || 'https://www.yundasurrogacy.com'}/about#kayla-luo` },
  service: {
    name: 'California Gestational Surrogacy Protection Guidance',
    serviceType: 'Gestational surrogacy legal, escrow, and insurance coordination guidance',
    areaServed: ['California', 'United States'],
    audience: 'Intended parents and gestational carriers',
    description: 'California-focused guidance for gestational surrogacy protection, including state legal differences, standard surrogacy agreement components, escrow payment process, ART insurance planning, pre-birth order guidance, and payment protection.',
  },
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'For Intended Parents', url: '/intended-parents' },
    { name: 'Surrogacy Protection California', url: '/surrogacy-protection-california' },
  ],
  faqs: t.value.faq.items,
  itemList: {
    name: 'California Surrogacy Protection Guide Topics',
    items: protectionTopics.value.map((topic, index) => ({
      position: index + 1,
      name: topic.name,
      description: topic.description,
      url: '/surrogacy-protection-california',
    })),
  },
}))

const videoObjectSchemas = computed(() => protectionVideos.value.map(video => buildVideoObjectSchema({
  ...video,
  uploadDate: '2026-06-29',
  url: '/surrogacy-protection-california',
  baseUrl: siteUrl.value || undefined,
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
})))

useHead({
  title: t.value.meta.title,
  meta: [
    {
      name: 'description',
      content: t.value.meta.description,
    },
  ],
})

useHead(() => ({
  script: [
    ...coreServicePageSchemas.value.map((schema, index) => ({
      key: `schema-surrogacy-protection-california-${index}`,
      type: 'application/ld+json',
      children: JSON.stringify(schema),
    })),
    ...videoObjectSchemas.value.map((schema, index) => ({
      key: `schema-surrogacy-protection-video-${index}`,
      type: 'application/ld+json',
      children: JSON.stringify(schema),
    })),
  ],
}))
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)]">
    <AppHeader />
    <BreadcrumbNav
      :items="[
        { to: '/intended-parents', label: locale === 'zh' ? '准父母' : 'For Intended Parents' },
        { label: locale === 'zh' ? '法律、保险与托管' : 'Legal, Insurance & Escrow' },
      ]"
    />

    <!-- Hero Section -->
    <section class="relative bg-[var(--yunda-bark)] py-16 lg:py-24">
      <div class="mx-auto max-w-1200px px-4 lg:px-6">
        <div class="text-center">
          <h1 class="mb-4 text-6 font-semibold italic lg:text-10" >
            {{ t.hero.title }}
          </h1>
          <h2 class="mb-6 text-4 font-semibold lg:text-6" >
            {{ t.hero.subtitle }}
          </h2>
          <p class="mx-auto mb-8 max-w-966px text-base text-[var(--yunda-bark)] leading-relaxed lg:text-lg" style="font-family: var(--font-text)">
            {{ t.hero.description }}
          </p>
          <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <NuxtLink
              :to="localePath('/be-parents')"
              class="rounded-2.5 bg-[var(--primary-brown)] px-8 py-4 text-lg text-[var(--yunda-petal)] font-semibold shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.3)] backdrop-blur-5 transition-opacity hover:opacity-90"
              style="font-family: var(--font-text)"
            >
              {{ t.hero.cta }}
            </NuxtLink>
            <button class="shadow-inner-white-soft rounded-[10px] bg-[var(--yunda-petal)] px-8 py-4 text-lg text-[var(--yunda-bark)] font-semibold uppercase transition-all duration-300 ease-in-out active:translate-y-0 hover:bg-[var(--yunda-petal)] hover:underline hover:-translate-y-0.5" style="font-family: var(--font-text)">
              {{ t.hero.downloadChecklist }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <SeoTrustNote
      :updated="locale === 'zh' ? '最后更新：2026年6月29日' : 'Last updated: June 29, 2026'"
      :reviewed-by="locale === 'zh' ? 'Kayla Luo（北美区副总裁）审阅' : 'Reviewed by Kayla Luo, Vice President, North America'"
      :note="locale === 'zh' ? '本页提供加州代孕法律、托管和保险协调的教育说明。孕达不是律师事务所、保险公司或医疗机构，具体法律、保险和医疗决定应由相应专业人士确认。' : 'This page provides educational guidance on California surrogacy legal, escrow, and insurance coordination. Yunda is not a law firm, insurance company, or medical provider; specific legal, insurance, and medical decisions should be confirmed by the relevant professionals.'"
      :sources="[
        { label: locale === 'zh' ? '代孕流程' : 'Surrogacy process', href: localePath('/surrogacy-process') },
        { label: locale === 'zh' ? '代孕费用' : 'Surrogacy cost', href: localePath('/surrogacy-cost') },
        { label: locale === 'zh' ? '加州家庭法' : 'California Family Code', href: 'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=FAM&division=12.&title=&part=7.&chapter=&article=' },
        { label: locale === 'zh' ? '免责声明' : 'Disclaimer', href: localePath('/disclaimer') },
      ]"
    />

    <!-- Promotional Video Section -->
    <section class="bg-[var(--yunda-petal)] py-16 lg:py-24">
      <div class="mx-auto max-w-1200px px-4 lg:px-6">
        <div class="overflow-hidden rounded-2xl shadow-xl">
          <VideoPlayer
            video-src="https://qiniu-resources.weweknow.com/yundasurrogacy-1/static/Yunda-Feature12_8adjustments.mp4"
            :autoplay="false"
            :loop="false"
            :muted="false"
            :controls="true"
            poster="/videos/video-default-poster.webp"
            video-type="video/mp4"
            background-color="transparent"
          />
        </div>
      </div>
    </section>

    <!-- Video Modules -->
    <section class="py-12 lg:py-16">
      <div class="mx-auto max-w-1200px px-4 lg:px-6">
        <!-- Module 1: Left Text, Right Video -->
        <div class="grid grid-cols-1 mb-16 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <h2 class="mb-4 text-4 text-[var(--yunda-bark)] font-semibold lg:text-5" >
              {{ t.module1.title }}
            </h2>
            <p class="text-[var(--yunda-bark)] leading-relaxed" style="font-family: var(--font-text)">
              {{ t.module1.content }}
            </p>
            <div class="mt-6 flex flex-wrap gap-2 text-sm text-[var(--yunda-bark)]" style="font-family: var(--font-text)">
              <span>California</span>
              <span>·</span>
              <a href="#" class="text-[var(--yunda-bark)] transition-opacity hover:underline hover:opacity-75">{{ t.cities.losAngeles }}</a>
              <span>·</span>
              <a href="#" class="text-[var(--yunda-bark)] transition-opacity hover:underline hover:opacity-75">{{ t.cities.orangeCounty }}</a>
              <span>·</span>
              <a href="#" class="text-[var(--yunda-bark)] transition-opacity hover:underline hover:opacity-75">{{ t.cities.sanDiego }}</a>
            </div>
          </div>
          <div>
            <VideoPlayerWithCover
              :video-src="videoResources.video1"
              :cover-src="videoResources.cover1"
            />
          </div>
        </div>

        <!-- Module 2: Right Text, Left Video -->
        <div class="grid grid-cols-1 mb-16 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div class="order-2 lg:order-1">
            <VideoPlayerWithCover
              :video-src="videoResources.video2"
              :cover-src="videoResources.cover2"
            />
          </div>
          <div class="order-1 lg:order-2">
            <h2 class="mb-4 text-4 text-[var(--yunda-bark)] font-semibold lg:text-5" >
              {{ t.module2.title }}
            </h2>
            <p class="text-[var(--yunda-bark)] leading-relaxed" style="font-family: var(--font-text)">
              {{ t.module2.content }}
            </p>
            <div class="mt-6 flex flex-wrap gap-2 text-sm text-[var(--yunda-bark)]" style="font-family: var(--font-text)">
              <span>California</span>
              <span>·</span>
              <a href="#" class="text-[var(--yunda-bark)] transition-opacity hover:underline hover:opacity-75">{{ t.cities.losAngeles }}</a>
              <span>·</span>
              <a href="#" class="text-[var(--yunda-bark)] transition-opacity hover:underline hover:opacity-75">{{ t.cities.orangeCounty }}</a>
              <span>·</span>
              <a href="#" class="text-[var(--yunda-bark)] transition-opacity hover:underline hover:opacity-75">{{ t.cities.sanDiego }}</a>
              <span>·</span>
              <a href="#" class="text-[var(--yunda-bark)] transition-opacity hover:underline hover:opacity-75">{{ t.cities.bayArea }}</a>
            </div>
          </div>
        </div>

        <!-- Module 3: Left Text, Right Video -->
        <div class="grid grid-cols-1 mb-16 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div>
            <h2 class="mb-4 text-4 text-[var(--yunda-bark)] font-semibold lg:text-5" >
              {{ t.module3.title }}
            </h2>
            <p class="text-[var(--yunda-bark)] leading-relaxed" style="font-family: var(--font-text)">
              {{ t.module3.content }}
            </p>
            <div class="mt-6 flex flex-wrap gap-2 text-sm text-[var(--yunda-bark)]" style="font-family: var(--font-text)">
              <span>California</span>
              <span>·</span>
              <a href="#" class="text-[var(--yunda-bark)] transition-opacity hover:underline hover:opacity-75">{{ t.cities.losAngeles }}</a>
              <span>·</span>
              <a href="#" class="text-[var(--yunda-bark)] transition-opacity hover:underline hover:opacity-75">{{ t.cities.orangeCounty }}</a>
              <span>·</span>
              <a href="#" class="text-[var(--yunda-bark)] transition-opacity hover:underline hover:opacity-75">{{ t.cities.sanDiego }}</a>
            </div>
          </div>
          <div>
            <VideoPlayerWithCover
              :video-src="videoResources.video3"
              :cover-src="videoResources.cover3"
            />
          </div>
        </div>

        <!-- Module 4: Right Text, Left Video -->
        <div class="grid grid-cols-1 mb-16 gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div class="order-2 lg:order-1">
            <VideoPlayerWithCover
              :video-src="videoResources.video4"
              :cover-src="videoResources.cover4"
            />
          </div>
          <div class="order-1 lg:order-2">
            <h2 class="mb-4 text-4 text-[var(--yunda-bark)] font-semibold lg:text-5" >
              {{ t.module4.title }}
            </h2>
            <p class="text-[var(--yunda-bark)] leading-relaxed" style="font-family: var(--font-text)">
              {{ t.module4.content }}
            </p>
            <div class="mt-6 flex flex-wrap gap-2 text-sm text-[var(--yunda-bark)]" style="font-family: var(--font-text)">
              <span>California</span>
              <span>·</span>
              <a href="#" class="text-[var(--yunda-bark)] transition-opacity hover:underline hover:opacity-75">{{ t.cities.losAngeles }}</a>
              <span>·</span>
              <a href="#" class="text-[var(--yunda-bark)] transition-opacity hover:underline hover:opacity-75">{{ t.cities.orangeCounty }}</a>
              <span>·</span>
              <a href="#" class="text-[var(--yunda-bark)] transition-opacity hover:underline hover:opacity-75">{{ t.cities.sanDiego }}</a>
              <span>·</span>
              <a href="#" class="text-[var(--yunda-bark)] transition-opacity hover:underline hover:opacity-75">{{ t.cities.bayArea }}</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="bg-[var(--yunda-petal)] py-12 lg:py-16">
      <div class="mx-auto max-w-1200px px-4 lg:px-6">
        <h2 class="mb-4 text-center text-5 text-[var(--yunda-bark)] font-semibold lg:text-6" >
          {{ t.faq.title }}
        </h2>
        <p class="mx-auto mb-8 max-w-3xl text-center text-base text-[var(--yunda-bark)]/80 leading-relaxed" style="font-family: var(--font-text)">
          {{ locale === 'zh' ? '以下回答概括加州代孕中常见的法律、亲权、托管和 ART 保险问题。具体法律、保险和医疗决定应由相应专业人士确认。' : 'These answers summarize common legal, parentage, escrow, and ART insurance questions in California surrogacy. Specific legal, insurance, and medical decisions should be confirmed by the relevant professionals.' }}
        </p>
        <div class="mx-auto max-w-800px space-y-6">
          <div
            v-for="(item, index) in t.faq.items"
            :key="index"
            class="rounded-lg bg-white p-6 shadow-sm"
          >
            <h3 class="mb-3 text-xl text-[var(--yunda-bark)] font-semibold" >
              {{ item.question }}
            </h3>
            <p class="text-[var(--yunda-bark)] leading-relaxed" style="font-family: var(--font-text)">
              {{ item.answer }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-[var(--yunda-bark)] py-12 lg:py-16">
      <div class="mx-auto max-w-1200px px-4 text-center lg:px-6">
        <h2 class="mb-4 text-5 text-white font-semibold lg:text-6" >
          {{ t.cta.title }}
        </h2>
        <p class="mb-8 text-lg text-white/90" style="font-family: var(--font-text)">
          {{ t.cta.subtitle }}
        </p>
        <NuxtLink
          :to="localePath('/be-parents')"
          class="inline-block rounded-2.5 bg-[var(--primary-brown)] px-8 py-4 text-lg text-[var(--yunda-petal)] font-semibold shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.3)] backdrop-blur-5 transition-opacity hover:opacity-90"
          style="font-family: var(--font-text)"
        >
          {{ t.cta.button }}
        </NuxtLink>
        <div class="mt-6 flex flex-wrap justify-center gap-2 text-sm text-white/90" style="font-family: var(--font-text)">
          <span>California</span>
          <span>·</span>
          <a href="#" class="text-white transition-opacity hover:underline hover:opacity-75">{{ t.cities.losAngeles }}</a>
          <span>·</span>
          <a href="#" class="text-white transition-opacity hover:underline hover:opacity-75">{{ t.cities.orangeCounty }}</a>
          <span>·</span>
          <a href="#" class="text-white transition-opacity hover:underline hover:opacity-75">{{ t.cities.sanDiego }}</a>
          <span>·</span>
          <a href="#" class="text-white transition-opacity hover:underline hover:opacity-75">{{ t.cities.bayArea }}</a>
        </div>
      </div>
    </section>

    <RelatedGuides
      :title="locale === 'zh' ? '继续了解加州法律、保险与诊所安排' : 'Continue With California Legal, Insurance, and Clinic Planning'"
      :intro="locale === 'zh' ? '加州代孕保障通常会同时涉及法律文件、亲权安排、保险审查、托管账户和 IVF 诊所协调。以下内容适合继续深入。' : 'California surrogacy protection often involves contracts, parentage, insurance review, escrow, and IVF clinic coordination. These reads continue that planning path.'"
      :links="relatedPerformanceLinks"
    />

    <AppFooter />
  </div>
</template>

<style scoped>
.shadow-inner-white-soft {
  box-shadow: -2px -2px 1px rgba(255, 255, 255, 0.5) inset;
}
</style>

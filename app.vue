<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import zhMissingBlogs from '~/data/zh-missing-blogs.json'
import { buildOrganizationSchema, buildWebsiteSchema } from '~/utils/schema'

const { locale } = useI18n()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

/**
 * /zh/blog/* routes whose Chinese body content is empty. Generated at build time
 * by scripts/generate-xml-sitemaps.cjs. Used to suppress the zh-CN hreflang so
 * page markup agrees with sitemap-zh.xml and the Vercel 302 redirects.
 */
const zhMissingBlogRoutes = new Set<string>(
  (zhMissingBlogs as { signalReliable?: boolean, routes?: string[] }).signalReliable === false
    ? []
    : ((zhMissingBlogs as { routes?: string[] }).routes ?? []),
)

interface SocialMeta {
  title: {
    en: string
    zh: string
  }
  description: {
    en: string
    zh: string
  }
  image: string
}

const socialMetaByPath: Record<string, SocialMeta> = {
  '/': {
    title: {
      en: 'Yunda Surrogacy | California Surrogacy Agency',
      zh: '孕达代孕｜加州代孕机构',
    },
    description: {
      en: 'Yunda supports intended parents and surrogates with matching, IVF coordination, legal steps, insurance review, escrow planning, and bilingual care.',
      zh: '孕达为准父母和代孕妈妈提供匹配、IVF 协调、法律步骤、保险审核、托管规划和双语支持。',
    },
    image: '/images/pages/home/hero.webp',
  },
  '/intended-parents': {
    title: {
      en: 'For Intended Parents | Surrogacy Guides from Yunda',
      zh: '准父母代孕指南｜孕达代孕',
    },
    description: {
      en: 'Explore Yunda guides for intended parents, including consultation, cost, process, legal protection, egg donation, IVF coordination, and LGBTQ support.',
      zh: '查看孕达准父母指南，了解咨询、费用、流程、法律保障、捐卵、IVF 协调和 LGBTQ 支持。',
    },
    image: '/images/pages/home/hero.webp',
  },
  '/be-parents': {
    title: {
      en: 'Surrogacy for Intended Parents | Private Guidance from Yunda',
      zh: '准父母代孕咨询｜孕达私密指导',
    },
    description: {
      en: 'Start with private surrogacy guidance for matching, IVF clinic coordination, legal steps, insurance, escrow, and bilingual support.',
      zh: '通过私密代孕咨询了解匹配、IVF 诊所协调、法律步骤、保险、托管和双语支持。',
    },
    image: '/images/pages/be-parents/hero.jpg',
  },
  '/surrogacy-cost': {
    title: {
      en: 'Surrogacy Cost in California & the U.S. | Yunda',
      zh: '美国与加州代孕费用｜孕达代孕',
    },
    description: {
      en: 'Understand surrogacy cost categories, including surrogate compensation, agency coordination, IVF clinic fees, legal work, insurance, and escrow.',
      zh: '了解代孕费用组成，包括代孕补偿、机构协调、IVF 诊所费用、法律、保险和托管。',
    },
    image: '/images/pages/surrogacy-cost/summary-card.png',
  },
  '/surrogacy-process': {
    title: {
      en: 'Surrogacy Process & Timeline for Parents | Yunda',
      zh: '准父母代孕流程与时间线｜孕达代孕',
    },
    description: {
      en: 'See how the intended parent surrogacy process works, from consultation and IVF planning to matching, legal clearance, transfer, pregnancy, and birth.',
      zh: '了解准父母代孕流程：从咨询、IVF 规划到匹配、法律清关、移植、孕期和出生。',
    },
    image: '/images/pages/surrogacy-process/hero.png',
  },
  '/surrogacy-protection-california': {
    title: {
      en: 'California Surrogacy Protection | Legal, Escrow & Insurance',
      zh: '加州代孕保障｜法律、托管与保险',
    },
    description: {
      en: 'Review California-focused surrogacy protection, including legal coordination, escrow payment timing, insurance planning, and parentage milestones.',
      zh: '了解加州代孕保障，包括法律协调、托管付款节点、保险规划和亲权流程。',
    },
    image: '/images/pages/surrogate-process/hero.jpg',
  },
  '/egg-donation': {
    title: {
      en: 'Egg Donor Surrogacy Guide for Intended Parents | Yunda',
      zh: '捐卵代孕指南：准父母的供卵与 IVF 规划｜孕达',
    },
    description: {
      en: 'Understand egg donor surrogacy, screening, fresh vs. frozen eggs, IVF coordination, costs, timelines, and next steps for intended parents across the U.S.',
      zh: '了解捐卵代孕、供体筛查、新鲜与冷冻卵子、IVF 协调、费用、时间线及美国准父母的下一步规划。',
    },
    image: '/images/pages/egg-donation/og.jpg',
  },
  '/partner-ivf-clinics': {
    title: {
      en: 'IVF Clinic Coordination for Surrogacy | Yunda',
      zh: '代孕 IVF 诊所协调与合作诊所｜孕达代孕',
    },
    description: {
      en: 'Already have an IVF clinic—or need help evaluating one? See how Yunda coordinates clinic records, surrogate screening, legal clearance, and transfer timing.',
      zh: '已有 IVF 诊所，或仍在选择诊所？了解孕达如何衔接诊所资料、代孕妈妈筛查、法律放行与移植排期。',
    },
    image: '/images/pages/partner-ivf-clinics/hero.jpg',
  },
  '/single-parents-lgbtq': {
    title: {
      en: 'LGBTQ+ and Single Parent Surrogacy | Yunda',
      zh: 'LGBTQ+ 与单身父母代孕｜孕达',
    },
    description: {
      en: 'Explore inclusive surrogacy guidance for LGBTQ+ couples and single intended parents, including donor planning, legal coordination, and matching.',
      zh: '了解面向 LGBTQ+ 伴侣和单身准父母的包容性代孕支持，包括捐赠规划、法律协调和匹配。',
    },
    image: '/images/pages/single-parents-lgbtq/hero.jpg',
  },
  '/surrogates': {
    title: {
      en: 'For Surrogates | Pay, Requirements & Journey | Yunda',
      zh: '代孕妈妈指南｜补偿、要求与旅程｜孕达',
    },
    description: {
      en: 'Explore Yunda surrogate guides for application, requirements, journey, compensation, screening, referral, transfer steps, and California eligibility.',
      zh: '查看孕达代孕妈妈指南，了解申请、要求、旅程、补偿、筛查、推荐、移植步骤和加州资格。',
    },
    image: '/images/pages/benefit/hero.jpg',
  },
  '/be-surrogate': {
    title: {
      en: 'Apply to Be a Surrogate | Pay, Protection & Support',
      zh: '申请成为代孕妈妈｜补偿、保障与支持',
    },
    description: {
      en: 'Apply to become a surrogate with clear compensation, screening guidance, legal protection, insurance review, matching support, and dedicated care.',
      zh: '申请成为代孕妈妈，了解清晰补偿、筛查指导、法律保障、保险审核、匹配支持和专属关怀。',
    },
    image: '/images/pages/be-surrogate/hero.jpg',
  },
  '/surrogate-requirements': {
    title: {
      en: 'Surrogate Requirements & Qualifications | Yunda',
      zh: '代孕妈妈要求与资格｜孕达',
    },
    description: {
      en: 'Review surrogate requirements, including age, pregnancy history, health, lifestyle, support system, screening, legal clearance, and next steps.',
      zh: '查看代孕妈妈要求，包括年龄、孕产史、健康、生活方式、支持系统、筛查、法律清关和下一步。',
    },
    image: '/images/pages/surrogate-requirements/requirements-overview.jpg',
  },
  '/journey': {
    title: {
      en: 'Surrogate Journey: Application to Birth | Yunda',
      zh: '代孕妈妈旅程：从申请到分娩｜孕达',
    },
    description: {
      en: 'Follow the surrogate journey from application and screening to matching, legal clearance, embryo transfer, pregnancy monitoring, birth, and postpartum support.',
      zh: '了解代孕妈妈旅程：从申请、筛查到匹配、法律清关、胚胎移植、孕期监测、分娩和产后支持。',
    },
    image: '/images/pages/journey/hero.jpg',
  },
  '/benefit': {
    title: {
      en: 'Surrogate Pay, Benefits & Support | Yunda',
      zh: '代孕妈妈补偿、福利与支持｜孕达',
    },
    description: {
      en: 'Understand surrogate pay, benefits, allowances, reimbursements, escrow protection, insurance planning, and support throughout the journey.',
      zh: '了解代孕妈妈补偿、福利、津贴、报销、托管保障、保险规划和全程支持。',
    },
    image: '/images/pages/benefit/hero.jpg',
  },
  '/screening': {
    title: {
      en: 'Surrogate Screening Process After You Apply | Yunda',
      zh: '代孕妈妈申请后的筛查流程｜孕达',
    },
    description: {
      en: 'Learn what happens after you apply to be a surrogate, including medical records review, psychological screening, insurance checks, and clearance steps.',
      zh: '了解申请成为代孕妈妈后的流程，包括病历审核、心理筛查、保险检查和清关步骤。',
    },
    image: '/images/pages/screening/hero.jpg',
  },
  '/referral': {
    title: {
      en: 'Surrogate Referral Program | Bonuses & Eligibility | Yunda',
      zh: '代孕妈妈推荐计划｜奖金与资格｜孕达',
    },
    description: {
      en: 'Refer a potential surrogate to Yunda and learn about referral eligibility, review steps, bonus milestones, timing, and support from the team.',
      zh: '向孕达推荐潜在代孕妈妈，了解推荐资格、审核步骤、奖金节点、时间安排和团队支持。',
    },
    image: '/images/pages/benefit/hero.jpg',
  },
  '/resources': {
    title: {
      en: 'Resources & Media Center | Yunda Surrogacy',
      zh: '资源与媒体中心｜孕达代孕',
    },
    description: {
      en: 'Browse Yunda resources, blog guides, media updates, social stories, and contact paths for intended parents, surrogates, and egg donation planning.',
      zh: '浏览孕达资源、博客指南、媒体更新、社交动态，以及准父母、代孕妈妈和捐卵规划的联系入口。',
    },
    image: '/images/pages/resources/hero.webp',
  },
  '/about': {
    title: {
      en: 'About Yunda Surrogacy | California Agency Team',
      zh: '关于孕达代孕｜加州代孕团队',
    },
    description: {
      en: 'Meet Yunda Surrogacy, a California agency team supporting intended parents and surrogates with coordinated care, bilingual communication, and trusted partnerships.',
      zh: '了解孕达代孕加州团队，如何通过协调服务、双语沟通和可信合作伙伴支持准父母与代孕妈妈。',
    },
    image: '/images/pages/about/kayla-luo.webp',
  },
  '/blog': {
    title: {
      en: 'Surrogacy Blog | Yunda Surrogacy Knowledge Center',
      zh: '代孕博客｜孕达代孕知识中心',
    },
    description: {
      en: 'Read Yunda guides on surrogacy cost, process, requirements, compensation, legal basics, IVF coordination, and family-building stories.',
      zh: '阅读孕达关于代孕费用、流程、要求、补偿、法律基础、IVF 协调和家庭建立故事的指南。',
    },
    image: '/images/pages/home/hero.webp',
  },
}

const baseUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const canonicalUrl = computed(() => {
  const path = route.path || '/'
  if (!baseUrl.value)
    return path

  if (path === '/')
    return `${baseUrl.value}/`

  return `${baseUrl.value}${path.replace(/\/$/, '')}`
})
const defaultOgTitle = computed(() =>
  locale.value === 'zh'
    ? '云达代孕｜加州准父母代孕机构'
    : 'Yunda Surrogacy ｜California Surrogacy Agency for Intended Parents',
)
const defaultOgDescription = computed(() =>
  locale.value === 'zh'
    ? 'Yunda Surrogacy 为准父母和代孕妈妈提供美国代孕、IVF、法律与保险协调服务。'
    : 'Yunda Surrogacy is a California surrogacy agency supporting intended parents and surrogates with IVF, legal, and insurance coordination.',
)
const defaultOgImage = computed(() =>
  baseUrl.value
    ? `${baseUrl.value}/images/pages/home/hero.webp`
    : '/images/pages/home/hero.webp',
)
const socialPath = computed(() => {
  const path = (route.path || '/').replace(/^\/zh(?=\/|$)/, '') || '/'
  return path.replace(/\/$/, '') || '/'
})
const routeSocialMeta = computed(() => socialMetaByPath[socialPath.value])
const socialTitle = computed(() => {
  const meta = routeSocialMeta.value
  if (!meta)
    return defaultOgTitle.value

  return locale.value === 'zh' ? meta.title.zh : meta.title.en
})
const socialDescription = computed(() => {
  const meta = routeSocialMeta.value
  if (!meta)
    return defaultOgDescription.value

  return locale.value === 'zh' ? meta.description.zh : meta.description.en
})
const socialImage = computed(() => {
  const image = routeSocialMeta.value?.image || '/images/pages/home/hero.webp'
  if (!baseUrl.value)
    return image

  return `${baseUrl.value}${image}`
})

// 生成 hreflang 标签，用于多语言 SEO
const hreflangLinks = computed(() => {
  if (!baseUrl.value)
    return []

  const path = route.path || '/'
  // 仅移除严格的 /zh 语言前缀，避免误匹配 /zhejiang 等路径
  const basePath = path.replace(/^\/zh(?=\/|$)/, '') || '/'

  // 生成英文和中文版本的 URL
  const enUrl = `${baseUrl.value}${basePath}`
  const zhPath = basePath === '/' ? '/zh' : `/zh${basePath}`
  const zhUrl = `${baseUrl.value}${zhPath}`

  // 中文正文缺失的博客：其 /zh/ URL 已被 302 跳英文并从 sitemap-zh 剔除，
  // 此时再声明 zh-CN alternate 会与那些信号矛盾。hreflang 只能指向可索引的
  // 规范 URL，所以这里一并省略。补完中文后 manifest 自动更新，声明自动恢复。
  const includeZh = !zhMissingBlogRoutes.has(zhPath.replace(/\/+$/, '') || zhPath)

  return [
    { rel: 'alternate', hreflang: 'en-US', href: enUrl },
    ...(includeZh ? [{ rel: 'alternate', hreflang: 'zh-CN', href: zhUrl }] : []),
    { rel: 'alternate', hreflang: 'x-default', href: enUrl }, // 默认语言（英文）
  ]
})

// 使用具体 locale 便于浏览器日期等控件显示对应格式（en-US / zh-CN）
const htmlLang = computed(() => (locale.value === 'zh' ? 'zh-CN' : 'en-US'))
const htmlClass = computed(() => `lang-${locale.value}`)
const resolvedSiteUrl = computed(() => baseUrl.value || 'https://www.yundasurrogacy.com')

const organizationSchema = computed(() =>
  buildOrganizationSchema({
    url: resolvedSiteUrl.value,
  }),
)

const websiteSchema = computed(() =>
  buildWebsiteSchema({
    url: resolvedSiteUrl.value,
    locale: locale.value,
    searchPath: '/blog?keyword={search_term_string}',
  }),
)

useHead(() => ({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { property: 'og:title', content: socialTitle.value },
    { property: 'og:description', content: socialDescription.value },
    { property: 'og:url', content: canonicalUrl.value },
    { property: 'og:image', content: socialImage.value || defaultOgImage.value },
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: 'Yunda Surrogacy' },
    { property: 'og:locale', content: locale.value === 'zh' ? 'zh_CN' : 'en_US' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: socialTitle.value },
    { name: 'twitter:description', content: socialDescription.value },
    { name: 'twitter:image', content: socialImage.value || defaultOgImage.value },
  ],
  link: [
    { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/favicon-48x48.png' },
    { rel: 'shortcut icon', href: '/favicon.ico' },
    { rel: 'apple-touch-icon', href: '/images/shared/brand/logo.png' },
    { rel: 'canonical', href: canonicalUrl.value },
    ...hreflangLinks.value,
  ],
  htmlAttrs: {
    lang: htmlLang.value,
    class: htmlClass.value,
  },
  script: [
    {
      key: 'schema-org-website',
      type: 'application/ld+json',
      children: JSON.stringify(websiteSchema.value),
    },
    {
      key: 'schema-org-organization',
      type: 'application/ld+json',
      children: JSON.stringify(organizationSchema.value),
    },
  ],
}))
</script>

<template>
  <div class="site-content-theme font-sans text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[17px]" style="font-family: var(--font-text)">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

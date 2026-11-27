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
      description: '了解加州代孕中的法律协调、ART/IVF、保险审查与托管付款。内容基于 2026 费用规划口径，实际承保和费用以保单、协议、账单及专业审核为准。',
    },
    hero: {
      title: '代孕保护详解',
      subtitle: '法律、托管和保险 — 聚焦加州',
      description: '面向准父母和代孕者的加州代孕法律、ART、保险与托管协调教育说明。',
      cta: '预约免费咨询',
      downloadChecklist: '下载清单',
    },
    reviewGuide: {
      title: '四项核对清单：范围、确认对象、文件与时间',
      intro: '以下内容用于准备与律师、保险专业人士、诊所和托管服务方的沟通，不代表任何承保、赔付、亲权或付款结果。最终安排以具体保单、书面协议、诊所文件、账单和专业审核为准。',
      items: [
        {
          title: '保障范围',
          body: '区分代孕者孕产医疗、ART/IVF 相关服务、住院和新生儿保障、补充保险、预授权、免赔额、共同保险和自付上限。仅凭计划名称不能判断代孕或 ART 是否承保。',
        },
        {
          title: '向谁确认',
          body: '保险范围和保单解释向保险专业人士或承保方确认，医疗与 ART 项目向 IVF 诊所和医疗团队确认，合同、亲权和 PBO 向各方独立律师确认，付款和释放规则向托管服务方及书面协议确认。Yunda Surrogacy负责协调和资料整理。',
        },
        {
          title: '查看什么',
          body: '查看完整保单或保障摘要、代孕和 ART 除外条款、网络、理赔流程、托管说明、释放条件、收据要求、协议中的报销范围，以及费用页列出的 2026 规划项目。',
        },
        {
          title: '何时确认',
          body: '在匹配、签约、胚胎移植、重要医疗步骤、住院和新生儿投保前分别确认。保险计划、诊所、州、账单或个案事实发生变化时，应重新核对。',
        },
      ],
    },
    module1: {
      title: '法律协调 — 不同州的流程如何变化？',
      content: '代孕流程会受到州法律、法院实践、诊所安排和个案事实影响。加州旅程通常需要独立法律顾问协助合同、亲子关系和产前命令（PBO）等步骤。Yunda Surrogacy负责信息整理与多方协调，具体法律结论、文件和时间由相应律师确认。本视频帮助准父母和代孕者确定应在开始前向谁确认，以及哪些节点需要重新核对。',
    },
    module2: {
      title: '法律协调 — 代孕协议应查看什么？',
      content: '书面代孕协议通常需要明确医疗决策、补偿和报销、保险费用、保密、风险处理、托管付款和亲子关系安排。签署前，应让各方分别咨询独立律师，并把协议、诊所流程、保险文件和托管说明放在同一时间线中核对。Yunda Surrogacy可以协助沟通与资料整理，但不替代法律意见。',
    },
    module3: {
      title: '托管协调 — 付款和费用如何核对？',
      content: '托管或信托账户通常按照书面协议和获批里程碑记录、管理并支付代孕补偿、报销、保险保费及其他获批支出。2026 年费用页列出 $142,750 的项目预估总额，其中包含 $12,600 的保险审核与保费预算，并将机构服务、信托账户管理、保险审查与设置、法律费用列为主要规划项目；部分保险保费和必要差旅按个案实际发生支付。IVF 诊所费用和新生儿医疗通常单独计算，最终金额以协议、账单、收据和实际结算为准。',
    },
    module4: {
      title: '保险问题 — ART 与代孕保障如何审查？',
      content: 'ART 保险审查要区分 IVF/辅助生殖服务、代孕者孕产医疗、住院账单、新生儿投保时间、补充保单和不承保项目。DMHC 2026 年修订的 APL 25-021 对符合条件的全服务商业计划涉及代孕者医学筛查和部分生育服务；胚胎移植后的代孕者孕产医疗仍需根据代孕者自己的健康计划条款确认。2026 费用页将保险审查与保险范围设置列为 $12,600 的规划类别，并列出健康保险专业审核与管理 $2,000、代孕人寿保险 $600、代孕医疗保险保费 $10,000。这些是费用估算中的预算线，不代表承保或固定账单。实际保障范围取决于具体保单、适用计划、除外条款、免赔额、自付上限、网络和专业保险审核。',
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
          question: '加州代孕需要确认哪些法律事项？',
          answer: '加州妊娠代孕的法律路径和文件要求应结合个案确认。准父母和代孕者通常需要独立律师审阅协议、亲权安排及 PBO 时间线。Yunda Surrogacy提供协调和教育信息，不替代律师的法律意见。',
        },
        {
          question: '什么是产前命令（PBO）？',
          answer: '产前命令（PBO）是亲权规划中的法院步骤，用于处理准父母法律父母身份的确认。是否需要、何时提交以及文件要求，会因法院、个案和律师安排而变化，应由相应律师确认。',
        },
        {
          question: '托管如何管理代孕付款？',
          answer: '托管通常由第三方根据书面协议、批准条件和付款里程碑管理资金，并记录代孕补偿、报销、保险保费及其他获批支出。具体释放条件、收据要求和结算方式，应向托管服务方和协议中的相关方确认。',
        },
        {
          question: '什么是 ART 保险，如何确认承保？',
          answer: 'ART 保险规划会审查辅助生殖和代孕相关项目，包括 IVF 服务、代孕者孕产医疗、排除条款、医院账单、新生儿投保时间和补充保单需求。实际承保取决于具体保单、承保方解释和专业保险审核，不能仅凭计划名称判断。',
        },
      ],
    },
  },
  en: {
    meta: {
      title: 'Surrogacy Protection in California | Legal, Escrow & Insurance | Yunda Surrogacy',
      description: 'Learn how California surrogacy planning coordinates legal steps, ART/IVF, insurance review, and escrow. The 2026 cost framework is for planning, while actual coverage and costs depend on the policy, agreement, bills, and professional review.',
    },
    hero: {
      title: 'Surrogacy Protection Explained',
      subtitle: 'Legal, Escrow & Insurance — California Focus',
      description: 'California-focused educational guidance for intended parents and gestational carriers on legal, ART, insurance, and escrow coordination.',
      cta: 'Book a Free Consultation',
      downloadChecklist: 'Download Checklist',
    },
    reviewGuide: {
      title: 'Four Checks to Make: Coverage, Confirm With, Review, and Timing',
      intro: 'Use this guide to prepare questions for attorneys, insurance professionals, clinics, and escrow providers. It does not establish coverage, reimbursement, parentage, or payment outcomes. Final arrangements depend on the specific policy, written agreement, clinic documents, bills, and professional review.',
      items: [
        {
          title: 'Coverage',
          body: 'Separate surrogate maternity care, ART/IVF-related services, hospital and newborn care, supplemental coverage, preauthorization, deductibles, coinsurance, and out-of-pocket maximums. A plan name alone does not establish coverage for surrogacy or ART.',
        },
        {
          title: 'Confirm With',
          body: 'Confirm policy terms with an insurance professional or carrier, medical and ART services with the IVF clinic and medical team, contracts and parentage or PBO steps with each party’s independent attorney, and payment or release rules with the escrow provider and written agreement. Yunda Surrogacy coordinates communication and information.',
        },
        {
          title: 'Review',
          body: 'Review the full policy or Summary of Benefits and Coverage, surrogacy and ART exclusions, network rules, claims process, escrow instructions, release conditions, receipt requirements, agreement reimbursements, and the 2026 planning items shown on the cost page.',
        },
        {
          title: 'Timing',
          body: 'Confirm before matching, signing, embryo transfer, major medical steps, hospital admission, and newborn enrollment. Recheck when the plan, clinic, state, billing details, or case facts change.',
        },
      ],
    },
    module1: {
      title: 'Legal Coordination — How Do Requirements Change by State?',
      content: 'Surrogacy timelines and documents can be affected by state law, court practice, clinic workflow, and case facts. A California journey commonly involves independent legal counsel for the agreement, parentage planning, and pre-birth order (PBO) steps. Yunda Surrogacy helps organize information and communication, while the relevant attorneys confirm legal conclusions, documents, and timing. This video highlights what to confirm before the process starts and when facts change.',
    },
    module2: {
      title: 'Legal Coordination — What Should a Surrogacy Agreement Cover?',
      content: 'A written surrogacy agreement commonly addresses medical decision-making, compensation and reimbursements, insurance costs, confidentiality, unexpected events, escrow payments, and parentage arrangements. Before signing, each party should use independent counsel and compare the agreement with clinic steps, insurance documents, and escrow instructions on one timeline. Yunda Surrogacy can coordinate communication and document collection, but does not replace legal advice.',
    },
    module3: {
      title: 'Escrow Coordination — How Should Payments and Costs Be Reviewed?',
      content: 'An escrow or trust account generally records, administers, and pays surrogate compensation, reimbursements, insurance premiums, and other approved expenses according to the written agreement and approved milestones. The 2026 cost page lists an estimated program total of $142,750, including a $12,600 insurance review and premium budget. It separates agency services, trust account management, insurance review and coverage setup, and legal fees as planning categories, while some insurance premiums and necessary travel are case-dependent and paid as incurred. IVF clinic fees and newborn medical care are typically separate, and final amounts depend on the agreement, bills, receipts, and final accounting.',
    },
    module4: {
      title: 'Insurance Review — How Should ART and Surrogacy Coverage Be Checked?',
      content: 'ART insurance review should separate IVF and assisted reproduction services, surrogate maternity care, hospital billing, newborn enrollment timing, supplemental policies, and excluded items. DMHC’s revised 2026 APL 25-021 addresses surrogate medical screening and certain fertility services for eligible full-service commercial plans. After embryo transfer, surrogate maternity care still depends on the surrogate’s own health plan contract. The 2026 cost page lists insurance review and coverage setup as a $12,600 planning category, with $2,000 for professional health insurance review and management, $600 for surrogate life insurance, and $10,000 for surrogate medical insurance premiums. These are budget lines in an estimate, not proof of coverage or a fixed bill. Actual coverage depends on the policy, applicable plan, exclusions, deductibles, out-of-pocket maximums, network rules, timing, and professional insurance review.',
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
          question: 'What legal points should be confirmed for California surrogacy?',
          answer: 'The legal path and document requirements for gestational surrogacy in California should be confirmed for each case. Intended parents and gestational carriers commonly use independent attorneys to review the agreement, parentage plan, and PBO timeline. Yunda Surrogacy provides coordination and educational information, not legal advice.',
        },
        {
          question: 'What is a pre-birth order (PBO)?',
          answer: 'A pre-birth order, or PBO, is a court-related parentage step concerning the intended parents’ legal parent status before or around birth. Whether it applies, when it is filed, and which documents are required can vary by case, court, and attorney instructions.',
        },
        {
          question: 'How are surrogacy payments managed through escrow?',
          answer: 'Escrow generally places funds with a third party and administers approved payments according to the written agreement and its milestones. It can create records for surrogate compensation, reimbursements, insurance premiums, and other approved expenses. Confirm release conditions, documentation, and final accounting with the escrow provider and the relevant agreement.',
        },
        {
          question: 'What is ART insurance, and how is coverage confirmed?',
          answer: 'ART insurance planning reviews assisted reproduction and surrogacy-related services, including IVF, surrogate maternity care, exclusions, hospital billing, newborn enrollment timing, and supplemental policy needs. Actual coverage depends on the specific policy, carrier interpretation, and professional insurance review, so the plan name alone is not enough.',
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
    name: t.value.module1.title,
    description: t.value.module1.content,
  },
  {
    name: t.value.module2.title,
    description: t.value.module2.content,
  },
  {
    name: t.value.module3.title,
    description: t.value.module3.content,
  },
  {
    name: t.value.module4.title,
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

const coreServicePageSchemas = computed(() => {
  const isZh = locale.value === 'zh'
  return buildCoreServicePageSchemas({
    baseUrl: siteUrl.value || undefined,
    path: '/surrogacy-protection-california',
    name: isZh ? '加州代孕法律、保险与托管保护指南' : 'Surrogacy Protection Explained',
    description: t.value.meta.description,
    about: isZh ? '加州妊娠代孕法律、托管、流程与保险说明' : 'California gestational surrogacy protection, escrow, legal process, and insurance guidance',
    audience: isZh ? '准父母和代孕妈妈' : 'Intended parents and gestational carriers',
    inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
    dateModified: '2026-11-27',
    reviewedBy: { '@id': `${siteUrl.value || 'https://www.yundasurrogacy.com'}/about#kayla-luo` },
    service: {
      name: isZh ? '加州妊娠代孕保护说明' : 'California Gestational Surrogacy Protection Guidance',
      serviceType: isZh ? '妊娠代孕法律、托管和保险协调教育' : 'Gestational surrogacy legal, escrow, and insurance coordination education',
      areaServed: ['California', 'United States'],
      audience: isZh ? '准父母和代孕妈妈' : 'Intended parents and gestational carriers',
      description: isZh ? '面向加州的妊娠代孕法律协调、协议审核、托管付款管理、ART 保险规划、产前命令问题和付款文件教育说明。具体法律、医疗、保险和付款安排取决于相应专业人士、保单、协议和个案事实。' : 'California-focused educational guidance for gestational surrogacy legal coordination, standard agreement review, escrow payment administration, ART insurance planning, pre-birth order questions, and payment documentation. Actual legal, medical, insurance, and payment arrangements depend on the relevant professionals, policies, agreements, and case facts.',
    },
    breadcrumbs: [
      { name: isZh ? '首页' : 'Home', url: '/' },
      { name: isZh ? '准父母' : 'For Intended Parents', url: '/intended-parents' },
      { name: isZh ? '加州代孕法律、保险与托管保护' : 'Surrogacy Protection California', url: '/surrogacy-protection-california' },
    ],
    faqs: t.value.faq.items,
    itemList: {
      name: isZh ? '加州代孕保护指南主题' : 'California Surrogacy Protection Guide Topics',
      items: protectionTopics.value.map((topic, index) => ({
        position: index + 1,
        name: topic.name,
        description: topic.description,
        url: '/surrogacy-protection-california',
      })),
    },
  })
})

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
    <section class="relative bg-[var(--yunda-bark)] py-16 text-[var(--yunda-petal)] lg:py-24">
      <div class="mx-auto max-w-1200px px-4 lg:px-6">
        <div class="text-center">
          <h1 class="mb-4 text-6 font-semibold italic lg:text-10" >
            {{ t.hero.title }}
          </h1>
          <h2 class="mb-6 text-4 font-semibold lg:text-6" >
            {{ t.hero.subtitle }}
          </h2>
          <p class="mx-auto mb-8 max-w-966px text-base text-[var(--yunda-petal)] leading-relaxed lg:text-lg" style="font-family: var(--font-text)">
            {{ t.hero.description }}
          </p>
        </div>
      </div>
    </section>

    <SeoTrustNote
      :updated="locale === 'zh' ? '最后更新：2026年11月27日' : 'Last updated: November 27, 2026'"
      :reviewed-by="locale === 'zh' ? 'Kayla Luo（北美区副总裁）审阅' : 'Reviewed by Kayla Luo, Vice President, North America'"
      :note="locale === 'zh' ? '本页由 Yunda Surrogacy（孕达代孕）提供加州代孕法律、ART、托管和保险协调的教育说明。Yunda Surrogacy 不是律师事务所、保险公司、医疗机构、IVF 诊所或托管公司，具体法律、医疗、保险和付款安排应由相应专业人士依据个案确认。' : 'This page provides Yunda Surrogacy educational guidance on California surrogacy legal, ART, escrow, and insurance coordination. Yunda Surrogacy is not a law firm, insurance company, medical provider, IVF clinic, or escrow company. Specific legal, medical, insurance, and payment arrangements should be confirmed by the relevant professionals for each case.'"
      :sources="[
        { label: locale === 'zh' ? '代孕流程' : 'Surrogacy process', href: localePath('/surrogacy-process') },
        { label: locale === 'zh' ? '代孕费用' : 'Surrogacy cost', href: localePath('/surrogacy-cost') },
        { label: locale === 'zh' ? '加州家庭法' : 'California Family Code', href: 'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?lawCode=FAM&division=12.&title=&part=7.&chapter=&article=' },
        { label: locale === 'zh' ? '免责声明' : 'Disclaimer', href: localePath('/disclaimer') },
      ]"
    />

    <!-- Scannable planning guide -->
    <section class="bg-[var(--yunda-petal)] pb-12 lg:pb-16">
      <div class="mx-auto max-w-1200px px-4 lg:px-6">
        <div class="mx-auto max-w-966px text-center">
          <h2 class="mb-4 text-5 text-[var(--yunda-bark)] font-semibold lg:text-6">
            {{ t.reviewGuide.title }}
          </h2>
          <p class="text-base text-[var(--yunda-bark)]/80 leading-relaxed" style="font-family: var(--font-text)">
            {{ t.reviewGuide.intro }}
          </p>
        </div>
        <div class="grid grid-cols-1 mt-8 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="item in t.reviewGuide.items"
            :key="item.title"
            class="rounded-lg bg-white p-6 shadow-sm"
          >
            <h3 class="mb-3 text-xl text-[var(--yunda-bark)] font-semibold">
              {{ item.title }}
            </h3>
            <p class="text-[var(--yunda-bark)] leading-relaxed" style="font-family: var(--font-text)">
              {{ item.body }}
            </p>
          </article>
        </div>
      </div>
    </section>

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
              <span class="text-[var(--yunda-bark)]">{{ t.cities.losAngeles }}</span>
              <span>·</span>
              <span class="text-[var(--yunda-bark)]">{{ t.cities.orangeCounty }}</span>
              <span>·</span>
              <span class="text-[var(--yunda-bark)]">{{ t.cities.sanDiego }}</span>
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
              <span class="text-[var(--yunda-bark)]">{{ t.cities.losAngeles }}</span>
              <span>·</span>
              <span class="text-[var(--yunda-bark)]">{{ t.cities.orangeCounty }}</span>
              <span>·</span>
              <span class="text-[var(--yunda-bark)]">{{ t.cities.sanDiego }}</span>
              <span>·</span>
              <span class="text-[var(--yunda-bark)]">{{ t.cities.bayArea }}</span>
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
              <span class="text-[var(--yunda-bark)]">{{ t.cities.losAngeles }}</span>
              <span>·</span>
              <span class="text-[var(--yunda-bark)]">{{ t.cities.orangeCounty }}</span>
              <span>·</span>
              <span class="text-[var(--yunda-bark)]">{{ t.cities.sanDiego }}</span>
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
              <span class="text-[var(--yunda-bark)]">{{ t.cities.losAngeles }}</span>
              <span>·</span>
              <span class="text-[var(--yunda-bark)]">{{ t.cities.orangeCounty }}</span>
              <span>·</span>
              <span class="text-[var(--yunda-bark)]">{{ t.cities.sanDiego }}</span>
              <span>·</span>
              <span class="text-[var(--yunda-bark)]">{{ t.cities.bayArea }}</span>
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
          <span class="text-white">{{ t.cities.losAngeles }}</span>
          <span>·</span>
          <span class="text-white">{{ t.cities.orangeCounty }}</span>
          <span>·</span>
          <span class="text-white">{{ t.cities.sanDiego }}</span>
          <span>·</span>
          <span class="text-white">{{ t.cities.bayArea }}</span>
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

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import OptimizedPicture from '@/components/base/OptimizedPicture.vue'
import { buildCoreServicePageSchemas } from '~/utils/schema'

/**
 * 改版说明与素材：`修改/2026-07-27/:single-parents-lgbtq 页面修改/`
 * 静态文件统一放在 `public/images/ip/redesign/`。
 */
const PAGE_ASSETS = {
  hero: '/images/ip/redesign/hero.png',
  heroBullets: [
    '/images/ip/redesign/s1-1.png',
    '/images/ip/redesign/s1-2.png',
    '/images/ip/redesign/s1-3.png',
    '/images/ip/redesign/s1-4.png',
  ],
  trust: [
    '/images/ip/redesign/s2-1.png',
    '/images/ip/redesign/s2-2.png',
    '/images/ip/redesign/s2-3.png',
  ],
  audience: [
    '/images/ip/redesign/s3-1.png',
    '/images/ip/redesign/s3-2.png',
    '/images/ip/redesign/s3-3.png',
    '/images/ip/redesign/s3-4.png',
  ],
  serviceArea: '/images/ip/redesign/s5-1.png',
  serviceMap: '/images/ip/redesign/s5-map.png',
  matching: [
    '/images/ip/redesign/s7-1.png',
    '/images/ip/redesign/s7-2.png',
    '/images/ip/redesign/s7-3.png',
  ],
}

const localePath = useLocalePath()
const { locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const pagePath = '/single-parents-lgbtq'

const translations = {
  en: {
    seoTitle: 'California LGBTQ+ & Gay Surrogacy Agency | Yunda',
    seoDescription:
      'LGBTQ-friendly California surrogacy agency support for gay couples, same-sex parents, lesbian couples, and single intended parents, including donor planning, surrogate matching, insurance review, and parentage coordination.',
    heroEyebrow: 'California LGBTQ+ surrogacy agency · Gay, same-sex and single parent support',
    heroTitle: 'California LGBTQ+, Gay & Same-Sex Surrogacy Support',
    heroBody:
      'Yunda supports gay couples, lesbian couples, same-sex parents, LGBTQ+ intended parents, and single intended parents with inclusive surrogate matching, donor egg or donor sperm planning, IVF clinic coordination, parentage planning, insurance review, escrow planning, and bilingual case management. If you are comparing California gay surrogacy, a LGBTQ+ surrogacy agency in Los Angeles, or single parent surrogacy in the U.S., this page explains what changes for your path and what to plan before matching begins.',
    heroBullets: [
      'LGBTQ-friendly surrogate matching for gay, lesbian, same-sex and single intended parents',
      'Donor egg, donor sperm, embryo and IVF clinic coordination',
      'California parentage planning coordinated with qualified legal professionals',
      'Insurance review, escrow planning and bilingual case management',
    ],
    heroPrimary: 'Plan My Private Consultation',
    heroSecondary: 'Review Parentage Planning',
    heroAlt: 'Pride flag with wooden parent figures and a model of pregnancy, representing LGBTQ+ family building through surrogacy',
    navAria: 'On-page sections',
    navItems: [
      { id: 'overview', label: 'Overview' },
      { id: 'who-this-is-for', label: 'Who This Is For' },
      { id: 'what-changes', label: 'What Changes' },
      { id: 'service-area', label: 'Service Area' },
      { id: 'planning-path', label: 'Planning Path' },
      { id: 'matching', label: 'Matching' },
      { id: 'cost-insurance', label: 'Cost & Insurance' },
      { id: 'guides', label: 'Guides' },
      { id: 'faq', label: 'FAQ' },
    ],
    trustCards: [
      {
        title: 'Reviewed by',
        body: 'Kayla Luo, Vice President, North America',
      },
      {
        title: "Yunda's role",
        body: 'Yunda provides education, coordination, bilingual communication and case-management support for intended parents. Legal, medical, insurance, escrow and IVF treatment decisions should be confirmed with the relevant qualified professionals.',
      },
      {
        title: 'Best for',
        body: 'Gay couples, lesbian couples, same-sex parents, LGBTQ+ intended parents, single fathers, single mothers and international intended parents comparing U.S. surrogacy options.',
      },
    ],
    audienceTitle: 'Who This LGBTQ+ and Single Parent Surrogacy Page Is For',
    audienceIntro:
      'This page is a family-structure guide, not a duplicate of the full surrogacy process. Use it to understand the planning decisions that are more common for gay surrogacy, same-sex surrogacy, lesbian surrogacy and single parent surrogacy in California.',
    audienceCards: [
      {
        title: 'Gay Dads and Male Couples',
        body: 'For gay surrogacy in California, many families need donor egg planning, embryo creation, surrogate matching, legal parentage coordination, insurance review and a birth plan that supports both dads from the start. Yunda helps organize these moving parts so your first steps feel clear rather than scattered.',
      },
      {
        title: 'Lesbian Couples and Two-Mom Families',
        body: "Lesbian surrogacy can involve reciprocal IVF, one partner's eggs, donor sperm, donor eggs, existing embryos or a gestational surrogate. We help you compare what belongs with the IVF clinic, what belongs with donor planning, and what should be clarified before matching.",
      },
      {
        title: 'Single Fathers',
        body: 'Single father surrogacy often includes donor egg selection, IVF clinic planning, parentage coordination, insurance review and travel or document planning if you live outside the United States. The goal is to understand the path before you commit to a clinic, donor or surrogate match.',
      },
      {
        title: 'Single Mothers and Solo Intended Parents',
        body: 'Single parent surrogacy may include embryo review, donor sperm planning, medical coordination, insurance review and a clear support plan for pregnancy updates and birth. Yunda helps single intended parents understand what to prepare and which professionals should be involved.',
      },
    ],
    changesTitle: 'What Changes When Your Path Is LGBTQ+ or Single Parent Surrogacy?',
    changesIntro:
      'The medical, legal and emotional questions are often more specific: donor genetics, who is listed as a parent, how matching conversations should happen, what insurance review is needed, and what documents must be ready before birth. Yunda keeps these decisions organized while your legal, medical, insurance and escrow professionals handle the decisions within their fields.',
    changesSections: [
      {
        title: 'Donor and Embryo Planning Comes Earlier',
        body: "Gay couples, single fathers and some same-sex parents often need donor egg planning before matching can move forward. Lesbian couples may compare reciprocal IVF, donor sperm, one partner's eggs, donor eggs or existing embryos. Yunda helps coordinate the conversation between intended parents, donor resources and IVF clinics so the medical plan and matching plan stay aligned.",
        links: [
          { label: 'donor egg planning', to: '/egg-donation' },
          { label: 'IVF clinic coordination', to: '/partner-ivf-clinics' },
        ],
      },
      {
        title: 'Parentage Planning Is Not an Afterthought',
        body: 'Questions like "Can both dads be on the birth certificate in California?", "Can both moms be recognized?", or "Can a single intended parent establish parentage?" should be discussed early with qualified legal professionals. Yunda coordinates timing, documents, insurance review and escrow planning around that legal work so parentage planning is not left until the end.',
        links: [
          { label: 'parentage and protection planning', to: '/surrogacy-protection-california' },
        ],
      },
      {
        title: 'Matching Needs Shared Values and Clear Boundaries',
        body: 'Same-sex surrogacy and single parent surrogacy require matching conversations that feel respectful from the beginning. Before a match moves forward, it helps to discuss communication style, privacy, milestone updates, hospital expectations, relationship boundaries and the kind of support the surrogate will receive during pregnancy.',
        links: [
          { label: 'surrogate matching process', to: '/surrogacy-process' },
        ],
      },
    ],
    serviceTitle: 'California LGBTQ+ Surrogacy Support Across Los Angeles, the Bay Area and Beyond',
    serviceBody:
      'Yunda works with intended parents comparing LGBTQ+ surrogacy agency options in California, including families searching for gay surrogacy in Los Angeles, same-sex surrogacy agency support in Los Angeles, Bay Area gay surrogacy, San Francisco gay surrogacy, San Jose gay surrogacy and Southern California surrogacy for gay parents. The specific clinic, legal and insurance pathway depends on your embryos, donor needs, surrogate match, residence, and where the professional teams are located.',
    serviceNote:
      'This page is not a separate city page for Los Angeles, San Francisco or San Jose. It is a California-focused LGBTQ+ and single parent surrogacy guide.',
    serviceMapAlt: 'California map highlighting San Francisco, San Jose, Los Angeles and San Diego',
    pathTitle: 'A Practical Planning Path Before Matching Begins',
    pathIntroBefore: "For the full step-by-step surrogacy process, use Yunda's ",
    pathIntroLink: 'process guide',
    pathIntroAfter:
      '. Here, the focus is the LGBTQ+ and single parent planning path that helps your team prepare before contracts, embryo transfer and birth.',
    pathSteps: [
      {
        label: 'Step 1',
        title: 'Private Consultation',
        body: 'We start by understanding your family structure, where you live, whether you already have embryos, whether donor eggs or donor sperm may be needed, and what questions feel most urgent.',
      },
      {
        label: 'Step 2',
        title: 'Donor, IVF and Embryo Review',
        body: 'If your plan includes donor eggs, donor sperm, reciprocal IVF or existing embryos, we help coordinate next questions with donor resources and IVF clinics before matching begins.',
      },
      {
        label: 'Step 3',
        title: 'Inclusive Surrogate Matching',
        body: 'We discuss values, communication preferences, privacy, medical screening, psychological screening and the relationship you hope to have with your surrogate.',
      },
      {
        label: 'Step 4',
        title: 'Legal, Insurance and Escrow Coordination',
        body: 'Before transfer, your team should understand contracts, parentage planning, insurance review, escrow timing and the professional steps that reduce avoidable risk.',
      },
      {
        label: 'Step 5',
        title: 'Pregnancy, Birth and Travel Planning',
        body: 'As the journey moves forward, we help organize pregnancy communication, hospital preferences, birth paperwork and travel or cross-border documents when needed.',
      },
    ],
    matchingTitle: 'LGBTQ-Friendly Matching Should Feel Respectful From Day One',
    matchingBody:
      'A strong match is not only about availability. It is about medical qualification, emotional readiness, shared expectations and a surrogate who understands and welcomes your family structure. For gay couples, same-sex parents and single intended parents, matching should create confidence rather than pressure.',
    matchingPoints: [
      {
        title: 'Communication and Privacy Are Planned Early',
        body: 'We discuss update frequency, decision-making moments, privacy preferences, relationship boundaries and what kind of birth experience would feel calm for everyone involved.',
      },
      {
        title: 'Screening Protects Both Intended Parents and Surrogate',
        body: 'Medical review, clinic clearance, psychological screening, insurance review and legal coordination reduce surprises before transfer and help the relationship stay clear.',
      },
      {
        title: 'Support Continues After the Match',
        body: 'A match is not the end of coordination. Yunda helps organize pregnancy updates, milestone communication, birth planning and respectful support for both intended parents and the surrogate.',
      },
    ],
    costTitle: 'Cost and Insurance Variables for LGBTQ+ and Gay Surrogacy',
    costBody:
      'This section does not replace the full cost guide. It explains why the budget for gay surrogacy, lesbian surrogacy, same-sex surrogacy or single parent surrogacy may shift based on donor, IVF, legal, insurance, escrow and travel needs. For searches like affordable gay surrogacy or low cost gay surrogacy, the safer question is not "What is the lowest price?" but "Which costs are predictable, which are variable, and which professional reviews are needed before money is committed?"',
    costVariablesTitle: 'Cost Variables',
    costVariables: [
      'Whether you already have embryos or need IVF first',
      'Whether donor eggs, donor sperm or reciprocal IVF are part of the plan',
      'Surrogate compensation, reimbursements, insurance review and maternity support',
      'Legal parentage work, contracts, escrow setup and birth documentation',
      'International travel, translation and document timing when applicable',
    ],
    costNoteTitle: 'Insurance Note',
    costInsuranceNote:
      'Gay surrogate insurance questions should be reviewed early. Insurance review may affect budget planning, surrogate match readiness and pre-transfer timing. Yunda coordinates insurance review context, while coverage decisions should be confirmed with qualified insurance professionals.',
    costCta: 'See Full Cost Breakdown',
    guidesTitle: 'Use the Right Yunda Guide for the Next Question',
    guidesIntro:
      'To keep this page focused, detailed process, cost, legal, IVF and donor questions live on their own source-of-truth pages.',
    guides: [
      {
        to: '/surrogacy-cost',
        title: 'Surrogacy Cost Guide',
        description:
          'Use this for full cost ranges, agency coordination fees, surrogate-related costs, legal fees, insurance, escrow and third-party expenses.',
      },
      {
        to: '/surrogacy-protection-california',
        title: 'California Protection Guide',
        description:
          'Use this for legal coordination, insurance review, escrow planning, contracts, parentage concepts and risk-reduction context.',
      },
      {
        to: '/surrogacy-process',
        title: 'Full Surrogacy Process',
        description:
          'Use this for the complete intended parent journey from consultation through birth planning.',
      },
    ],
    faqTitle: 'LGBTQ+ and Single Parent Surrogacy FAQ',
    faqIntro:
      'Short answers for intended parents comparing California gay surrogacy, LGBTQ+ surrogacy agencies, same-sex surrogacy in Los Angeles, parentage planning, insurance review, cost and international next steps.',
    faqs: [
      {
        q: 'Can LGBTQ+ couples pursue surrogacy in California?',
        a: 'Yes. California is widely chosen by LGBTQ+ intended parents because it has supportive parentage pathways and experienced professionals in third-party reproduction. The exact legal steps depend on your family structure, embryos, residence and timing, so Yunda coordinates with qualified legal professionals rather than treating website content as legal advice.',
      },
      {
        q: 'Can a single parent pursue surrogacy?',
        a: 'Yes. Many single intended parents explore gestational surrogacy. The plan may include donor eggs or donor sperm, IVF clinic coordination, parentage planning, insurance review and a clear support plan for pregnancy and birth.',
      },
      {
        q: 'How does gay surrogacy work for two dads?',
        a: 'Gay surrogacy for two dads often includes donor egg planning, IVF to create embryos, surrogate matching, medical and psychological screening, legal and insurance coordination, embryo transfer, pregnancy support and parentage paperwork.',
      },
      {
        q: 'Do lesbian couples need a surrogate or reciprocal IVF?',
        a: "It depends on medical goals, embryo plans, who will provide eggs, who can or wants to carry, and clinic guidance. Some couples use reciprocal IVF; others use a gestational surrogate with one partner's eggs, donor eggs or existing embryos.",
      },
      {
        q: 'Can both dads or both moms be on the birth certificate in California?',
        a: 'In many California surrogacy arrangements, parentage planning can support both intended parents being recognized. The exact path depends on documents, timing and legal review, so this should be planned early with counsel.',
      },
      {
        q: 'What is a pre-birth order for LGBTQ+ or single intended parents?',
        a: 'A pre-birth order is a legal process used in some surrogacy cases to help confirm intended parentage before delivery. It can make hospital paperwork and birth documentation smoother when handled by qualified legal professionals.',
      },
      {
        q: 'How much does LGBTQ+ or gay surrogacy cost in California?',
        a: "Costs vary by IVF needs, donor eggs or donor sperm, surrogate-related costs, legal work, insurance review, escrow, travel and agency coordination. Yunda's cost guide should be used for the detailed budget breakdown.",
      },
      {
        q: 'What should I know about gay surrogate insurance?',
        a: 'Insurance review should happen before transfer planning is finalized. Coverage questions may affect the budget, surrogate match readiness and timing. Yunda can coordinate insurance review context, while coverage decisions should be confirmed with qualified insurance professionals.',
      },
      {
        q: 'Do international LGBTQ+ or single intended parents need extra planning?',
        a: 'Often yes. International families should plan early for travel timing, translation, birth documents, passport or citizenship questions and communication across time zones. Requirements vary by country.',
      },
      {
        q: 'Does Yunda support same-sex surrogacy in Los Angeles, the Bay Area and San Francisco?',
        a: 'Yunda supports intended parents comparing California LGBTQ+ and same-sex surrogacy options, including families researching Los Angeles, the Bay Area, San Francisco, San Jose and Southern California. Your exact path depends on your clinic, legal team, insurance review, surrogate match and personal timeline.',
      },
    ],
    finalTitle: 'Ready to Understand Your Family-Building Path?',
    finalBody:
      'Tell us whether you are a gay couple, lesbian couple, same-sex parent, single intended parent or international family. Yunda will help you map the right next questions before you commit to a clinic, donor, surrogate match or legal timeline.',
    finalCta: 'Schedule a Private Consultation',
  },
  zh: {
    seoTitle: '加州 LGBTQ+ 与同性伴侣代孕机构｜孕达',
    seoDescription:
      '面向男同志、女同志、同性伴侣、LGBTQ+ 与单身准父母的加州代孕机构支持，涵盖供卵/供精规划、代孕妈妈匹配、保险审核、亲权协调和私密咨询。',
    heroEyebrow: '加州 LGBTQ+ 代孕机构 · 男同志、同性伴侣与单身父母支持',
    heroTitle: '加州 LGBTQ+、男同志与同性伴侣代孕支持',
    heroBody:
      '孕达为男同志伴侣、女同志伴侣、同性伴侣、LGBTQ+ 准父母和单身准父母提供包容的代孕妈妈匹配、供卵或供精规划、IVF 诊所协调、亲权规划、保险审核、资金托管规划和双语个案管理。如果你正在比较加州男同志代孕、洛杉矶 LGBTQ+ 代孕机构，或美国单身父母代孕路径，本页会说明你的成家路径有哪些不同，以及匹配开始前需要提前准备什么。',
    heroBullets: [
      '面向男同志、女同志、同性伴侣、LGBTQ+ 与单身准父母的包容性代孕妈妈匹配',
      '供卵、供精、胚胎与 IVF 诊所协调',
      '与合格法律专业人士协作的加州亲权规划',
      '保险审核、资金托管规划与双语个案管理',
    ],
    heroPrimary: '预约私密路径咨询',
    heroSecondary: '查看亲权规划',
    heroAlt: '彩虹旗上的准父母木制人偶与妊娠模型，象征 LGBTQ+ 家庭通过代孕成家',
    navAria: '本页章节导航',
    navItems: [
      { id: 'overview', label: '概览' },
      { id: 'who-this-is-for', label: '适合谁' },
      { id: 'what-changes', label: '路径差异' },
      { id: 'service-area', label: '服务地区' },
      { id: 'planning-path', label: '规划路径' },
      { id: 'matching', label: '匹配' },
      { id: 'cost-insurance', label: '费用与保险' },
      { id: 'guides', label: '指南' },
      { id: 'faq', label: '常见问题' },
    ],
    trustCards: [
      {
        title: '审核人',
        body: 'Kayla Luo，北美副总裁',
      },
      {
        title: '孕达的角色',
        body: '孕达为准父母提供教育、协调、双语沟通与个案管理支持。法律、医疗、保险、托管和 IVF 治疗相关决定，应由对应合格专业人士确认。',
      },
      {
        title: '适合人群',
        body: '正在比较美国代孕方案的男同志伴侣、女同志伴侣、同性伴侣、LGBTQ+ 准父母、单身爸爸、单身妈妈和国际准父母。',
      },
    ],
    audienceTitle: '这个 LGBTQ+ 与单身父母代孕页面适合谁',
    audienceIntro:
      '本页是按家庭结构整理的路径指南，不重复完整代孕流程。你可以用它了解加州男同志代孕、同性伴侣代孕、女同志代孕和单身父母代孕中更常见的规划决策。',
    audienceCards: [
      {
        title: '男同志伴侣与两位爸爸',
        body: '加州男同志代孕通常涉及供卵规划、胚胎创建、代孕妈妈匹配、亲权协调、保险审核，以及从一开始就支持两位爸爸的分娩计划。孕达帮助你梳理这些环节，让第一步更清楚，而不是被零散信息淹没。',
      },
      {
        title: '女同志伴侣与两位妈妈',
        body: '女同志代孕可能涉及互惠 IVF、一方卵子、供精、供卵、已有胚胎或妊娠代孕妈妈。我们会帮助你们比较哪些问题应由 IVF 诊所处理，哪些属于捐赠者规划，以及匹配开始前应先确认什么。',
      },
      {
        title: '单身爸爸',
        body: '单身爸爸代孕通常包括供卵选择、IVF 诊所规划、亲权协调、保险审核；若居住在美国以外，还可能涉及旅行和文件规划。重点是在正式确定诊所、捐赠者或代孕妈妈匹配前，先理解整体路径。',
      },
      {
        title: '单身妈妈与单身准父母',
        body: '单身父母代孕可能包括胚胎审核、供精规划、医疗协调、保险审核，以及孕期沟通和分娩阶段的支持计划。孕达帮助单身准父母理解需要准备什么，以及哪些专业人士应参与其中。',
      },
    ],
    changesTitle: 'LGBTQ+ 或单身父母代孕路径有什么不同？',
    changesIntro:
      '这类路径中的医疗、法律和情绪问题往往更具体：捐赠者遗传关系、谁被确认为父母、匹配沟通如何进行、需要怎样的保险审核，以及分娩前哪些文件必须准备好。孕达帮助你把这些决策有序推进，同时由法律、医疗、保险和托管专业人士处理各自领域内的决定。',
    changesSections: [
      {
        title: '供卵、供精与胚胎规划更早介入',
        body: '男同志伴侣、单身爸爸和部分同性伴侣通常需要在匹配前先处理供卵规划。女同志伴侣可能需要比较互惠 IVF、供精、一方卵子、供卵或已有胚胎。孕达帮助准父母、捐赠者资源和 IVF 诊所之间保持沟通，让医疗方案和匹配方案保持一致。',
        links: [
          { label: '供卵规划', to: '/egg-donation' },
          { label: 'IVF 诊所协调', to: '/partner-ivf-clinics' },
        ],
      },
      {
        title: '亲权规划不能等到最后',
        body: '“在加州，两位爸爸能否都写入出生证？”“两位妈妈能否同时获得确认？”“单身准父母能否确立亲权？”这类问题应尽早与合格法律专业人士讨论。孕达围绕法律工作协调时间、文件、保险审核和资金托管规划，避免亲权问题被留到最后。',
        links: [
          { label: '亲权与保障规划', to: '/surrogacy-protection-california' },
        ],
      },
      {
        title: '匹配需要价值观一致与清晰边界',
        body: '同性伴侣代孕和单身父母代孕都需要从一开始就保持尊重的匹配沟通。在匹配推进前，建议先讨论沟通方式、隐私、关键节点更新、医院期待、关系边界，以及代孕妈妈在孕期会获得怎样的支持。',
        links: [
          { label: '代孕妈妈匹配流程', to: '/surrogacy-process' },
        ],
      },
    ],
    serviceTitle: '覆盖洛杉矶、湾区及更多地区的加州 LGBTQ+ 代孕支持',
    serviceBody:
      '孕达支持正在比较加州 LGBTQ+ 代孕机构的准父母，包括搜索洛杉矶男同志代孕、洛杉矶同性伴侣代孕机构、湾区男同志代孕、旧金山男同志代孕、圣何塞男同志代孕，以及南加州男同志准父母代孕支持的家庭。具体诊所、法律和保险路径，会根据你的胚胎情况、捐赠者需求、代孕妈妈匹配、居住地和专业团队所在地而不同。',
    serviceNote:
      '本页不是洛杉矶、旧金山或圣何塞的独立城市页，而是聚焦加州 LGBTQ+ 与单身父母代孕路径的指南页。',
    serviceMapAlt: '加州地图，标出旧金山、圣何塞、洛杉矶与圣迭戈',
    pathTitle: '匹配开始前的实际规划路径',
    pathIntroBefore: '完整的代孕流程请查看孕达',
    pathIntroLink: '流程指南',
    pathIntroAfter:
      '。本页重点是 LGBTQ+ 与单身准父母在合同、胚胎移植和分娩前需要完成的路径规划。',
    pathSteps: [
      {
        label: '步骤 1',
        title: '私密咨询',
        body: '我们会先了解你的家庭结构、所在地区、是否已有胚胎、是否可能需要供卵或供精，以及你当前最急需弄清的问题。',
      },
      {
        label: '步骤 2',
        title: '捐赠者、IVF 与胚胎审核',
        body: '如果方案涉及供卵、供精、互惠 IVF 或已有胚胎，我们会在匹配开始前协助你与捐赠者资源和 IVF 诊所梳理下一步问题。',
      },
      {
        label: '步骤 3',
        title: '包容性代孕妈妈匹配',
        body: '我们会讨论价值观、沟通偏好、隐私、医学筛查、心理筛查，以及你希望与代孕妈妈建立怎样的关系。',
      },
      {
        label: '步骤 4',
        title: '法律、保险与托管协调',
        body: '移植前，团队应清楚合同、亲权规划、保险审核、托管时间，以及有助于降低可避免风险的专业步骤。',
      },
      {
        label: '步骤 5',
        title: '孕期、分娩与旅行规划',
        body: '旅程推进后，我们会协助组织孕期沟通、医院偏好、出生文件，以及需要时的旅行或跨境文件。',
      },
    ],
    matchingTitle: 'LGBTQ 友好的匹配应从第一天起保持尊重',
    matchingBody:
      '好的匹配不只是“有人选”。它还关乎医学资格、心理准备、共同期待，以及一位理解并欢迎你家庭结构的代孕妈妈。对男同志伴侣、同性准父母和单身准父母来说，匹配应带来确定感，而不是压力。',
    matchingPoints: [
      {
        title: '尽早规划沟通与隐私',
        body: '我们会讨论更新频率、决策节点、隐私偏好、关系边界，以及怎样的分娩体验能让所有参与者都更安心。',
      },
      {
        title: '筛查同时保护准父母与代孕妈妈',
        body: '医学审核、诊所放行、心理筛查、保险审核和法律协调能减少移植前的意外，也让双方关系保持清晰。',
      },
      {
        title: '匹配后支持仍会继续',
        body: '匹配并不是协调工作的终点。孕达会协助组织孕期更新、关键节点沟通、分娩规划，并为准父母和代孕妈妈提供互相尊重的支持。',
      },
    ],
    costTitle: 'LGBTQ+ 与男同志代孕的费用和保险变量',
    costBody:
      '本区块不替代完整费用指南，而是说明为什么男同志代孕、女同志代孕、同性伴侣代孕或单身父母代孕的预算会因捐赠者、IVF、法律、保险、托管和旅行需求而变化。对于 “affordable gay surrogacy” 或 “low cost gay surrogacy” 这类搜索，更稳妥的问题不是“最低价是多少”，而是“哪些费用可预估，哪些费用会变化，在付款前需要完成哪些专业审核”。',
    costVariablesTitle: '费用变量',
    costVariables: [
      '是否已有胚胎，还是需要先进行 IVF',
      '方案是否涉及供卵、供精或互惠 IVF',
      '代孕妈妈补偿、报销、保险审核与孕期支持',
      '亲权法律工作、合同、托管账户与出生文件',
      '适用时的国际旅行、翻译和文件时间安排',
    ],
    costNoteTitle: '保险提示',
    costInsuranceNote:
      '男同志代孕相关保险问题应尽早审核。保险审核可能影响预算规划、代孕妈妈匹配准备和移植前时间线。孕达协调保险审核相关信息，具体覆盖范围应由合格保险专业人士确认。',
    costCta: '查看完整费用拆解',
    guidesTitle: '根据下一个问题选择正确的孕达指南',
    guidesIntro:
      '为了让本页保持聚焦，详细流程、费用、法律、IVF 和供卵问题分别由对应主页面承接。',
    guides: [
      {
        to: '/surrogacy-cost',
        title: '代孕费用指南',
        description: '查看完整费用区间、机构协调费、代孕妈妈相关费用、法律费用、保险、托管和第三方费用。',
      },
      {
        to: '/surrogacy-protection-california',
        title: '加州保障指南',
        description: '了解法律协调、保险审核、资金托管、合同、亲权概念和风险控制背景。',
      },
      {
        to: '/surrogacy-process',
        title: '完整代孕流程',
        description: '用于了解从咨询到分娩规划的完整准父母代孕旅程。',
      },
    ],
    faqTitle: 'LGBTQ+ 与单身父母代孕常见问题',
    faqIntro:
      '为正在比较加州男同志代孕、LGBTQ+ 代孕机构、洛杉矶同性伴侣代孕、亲权规划、保险审核、费用和国际家庭下一步的准父母提供简明回答。',
    faqs: [
      {
        q: 'LGBTQ+ 伴侣可以在加州通过代孕成为父母吗？',
        a: '可以。加州因亲权路径相对友好、第三方辅助生殖专业资源成熟，而常被 LGBTQ+ 准父母选择。具体法律步骤取决于家庭结构、胚胎、居住地和时间线，因此孕达会协调合格法律专业人士，网站内容不作为法律建议。',
      },
      {
        q: '单身准父母可以通过代孕成为父母吗？',
        a: '可以。许多单身准父母会选择妊娠代孕。方案可能包括供卵或供精、IVF 诊所协调、亲权规划、保险审核，以及孕期和分娩阶段的支持计划。',
      },
      {
        q: '两位爸爸的男同志代孕通常怎么进行？',
        a: '两位爸爸的男同志代孕通常包括供卵规划、通过 IVF 创建胚胎、代孕妈妈匹配、医学与心理筛查、法律和保险协调、胚胎移植、孕期支持及亲权文件。',
      },
      {
        q: '女同志伴侣需要代孕还是互惠 IVF？',
        a: '这取决于医疗目标、胚胎方案、谁提供卵子、谁能或愿意怀孕，以及诊所建议。有些伴侣选择互惠 IVF，也有家庭使用一方卵子、供卵或已有胚胎，并通过妊娠代孕完成。',
      },
      {
        q: '在加州，两位爸爸或两位妈妈都能写入出生证吗？',
        a: '在许多加州代孕安排中，亲权规划可支持两位准父母同时获得确认。具体路径取决于文件、时间和法律审核，因此应尽早与律师规划。',
      },
      {
        q: 'LGBTQ+ 或单身准父母的预出生令是什么？',
        a: '预出生令是在部分代孕个案中用于分娩前确认准父母亲权的法律程序。由合格法律专业人士处理时，它可帮助医院文件和出生文件更顺畅。',
      },
      {
        q: '加州 LGBTQ+ 或男同志代孕费用是多少？',
        a: '费用会因 IVF 需求、供卵或供精、代孕妈妈相关费用、法律工作、保险审核、托管、旅行和机构协调而不同。详细预算请查看孕达费用指南。',
      },
      {
        q: '男同志代孕保险需要注意什么？',
        a: '保险审核应在移植规划最终确定前完成。保险覆盖问题可能影响预算、代孕妈妈匹配准备和时间线。孕达可协调保险审核相关信息，具体覆盖范围应由合格保险专业人士确认。',
      },
      {
        q: '国际 LGBTQ+ 或单身准父母需要额外规划吗？',
        a: '通常需要。国际家庭应提前规划旅行时间、翻译、出生文件、护照或国籍问题，以及跨时区沟通。不同国家要求不同。',
      },
      {
        q: '孕达是否支持洛杉矶、湾区和旧金山的同性伴侣代孕？',
        a: '孕达支持正在比较加州 LGBTQ+ 与同性伴侣代孕方案的准父母，包括研究洛杉矶、湾区、旧金山、圣何塞和南加州相关路径的家庭。你的具体路径取决于诊所、法律团队、保险审核、代孕妈妈匹配和个人时间线。',
      },
    ],
    finalTitle: '准备好了解你的成家路径了吗？',
    finalBody:
      '告诉我们你是男同志伴侣、女同志伴侣、同性准父母、单身准父母还是国际家庭。孕达会在你正式确定诊所、捐赠者、代孕妈妈匹配或法律时间线前，帮助你梳理下一步该问的问题。',
    finalCta: '预约私密咨询',
  },
}

const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)

const relatedGuides = computed(() => c.value.guides)
const trustCards = computed(() => c.value.trustCards)
const sectionNav = computed(() => c.value.navItems)
const activeSection = ref(sectionNav.value[0]?.id || 'overview')

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleSectionScroll() {
  const offset = window.matchMedia('(min-width: 768px)').matches ? 170 : 150
  const positions = sectionNav.value.map((item) => {
    const element = document.getElementById(item.id)
    if (!element)
      return { id: item.id, distance: Number.POSITIVE_INFINITY }
    return { id: item.id, distance: Math.abs(element.getBoundingClientRect().top - offset) }
  })
  activeSection.value = positions.reduce((prev, current) =>
    current.distance < prev.distance ? current : prev,
  ).id
}

onMounted(() => {
  window.addEventListener('scroll', handleSectionScroll, { passive: true })
  handleSectionScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleSectionScroll)
})

const faqItems = computed(() =>
  c.value.faqs.map(item => ({
    question: item.q,
    answer: item.a,
  })),
)

const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: c.value.heroTitle,
  description: c.value.seoDescription,
  dateModified: '2026-07-27',
  reviewedBy: { '@id': `${siteUrl.value || 'https://www.yundasurrogacy.com'}/about#kayla-luo` },
  about: 'LGBTQ-friendly and single parent gestational surrogacy support in California',
  audience: [
    'LGBTQ intended parents',
    'gay couples',
    'lesbian couples',
    'same-sex parents',
    'single parents',
  ],
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  service: {
    name: locale.value === 'zh'
      ? '加州 LGBTQ+ 与单身父母妊娠代孕协调'
      : 'California LGBTQ+ and Single Parent Gestational Surrogacy Coordination',
    serviceType: locale.value === 'zh'
      ? 'LGBTQ+ 与单身父母友好的妊娠代孕机构服务'
      : 'LGBTQ-friendly gestational surrogacy agency services',
    audience: [
      'LGBTQ intended parents',
      'gay couples',
      'lesbian couples',
      'same-sex parents',
      'single parents',
    ],
    description: c.value.heroBody,
  },
  breadcrumbs: [
    { name: locale.value === 'zh' ? '首页' : 'Home', url: '/' },
    { name: locale.value === 'zh' ? '为准父母' : 'For Intended Parents', url: '/intended-parents' },
    { name: locale.value === 'zh' ? 'LGBTQ+ 与单身父母' : 'LGBTQ+ & Single Parents', url: pagePath },
  ],
  faqs: faqItems.value,
  itemList: {
    name: c.value.pathTitle,
    description: `${c.value.pathIntroBefore}${c.value.pathIntroLink}${c.value.pathIntroAfter}`,
    items: c.value.pathSteps.map((step, index) => ({
      position: index + 1,
      name: step.title,
      description: step.body,
      url: pagePath,
    })),
  },
}))

useHead(() => ({
  title: c.value.seoTitle,
  meta: [
    { name: 'description', content: c.value.seoDescription },
    { property: 'og:title', content: c.value.seoTitle },
    { property: 'og:description', content: c.value.seoDescription },
    { property: 'og:image', content: `${siteUrl.value}${PAGE_ASSETS.hero}` },
    { name: 'twitter:title', content: c.value.seoTitle },
    { name: 'twitter:description', content: c.value.seoDescription },
    { name: 'twitter:image', content: `${siteUrl.value}${PAGE_ASSETS.hero}` },
  ],
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
      <!-- Section 1: Hero — 全幅背景 + 文案整体水平居中（对齐改版稿第一屏） -->
      <section class="relative isolate flex w-full min-h-[min(88vh,820px)] items-center overflow-hidden bg-[var(--yunda-petal)] py-12 lg:py-14">
        <div aria-hidden="true" class="pointer-events-none absolute inset-0">
          <OptimizedPicture
            :src="PAGE_ASSETS.hero"
            :alt="c.heroAlt"
            width="1768"
            height="890"
            picture-class="contents"
            img-class="absolute inset-0 h-full w-full scale-[1.02] object-cover object-center"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          <!-- 轻遮罩：保留彩虹旗层次，同时保证居中深色文字可读 -->
          <div
            class="absolute inset-0"
            style="background: linear-gradient(180deg, rgba(251,240,218,0.72) 0%, rgba(251,240,218,0.52) 45%, rgba(251,240,218,0.58) 100%)"
          />
        </div>

        <div class="relative z-10 mx-auto flex w-full max-w-[880px] flex-col items-center px-6 text-center lg:px-8">
          <h1 class="max-w-[820px] font-display text-[30px] text-[var(--yunda-bark)] font-semibold leading-[1.12] sm:text-[38px] lg:text-[46px]">
            {{ c.heroTitle }}
          </h1>
          <p class="mt-4 max-w-[720px] text-[14px] text-[var(--yunda-bark)]/88 leading-[1.7] sm:text-[15px] lg:text-[16px]">
            {{ c.heroBody }}
          </p>

          <!-- 列表块整体居中；白线黑底图标已裁切放大，直接展示 -->
          <ul class="mt-6 w-fit max-w-[640px] space-y-3 text-left">
            <li
              v-for="(bullet, index) in c.heroBullets"
              :key="bullet"
              class="flex items-start gap-3"
            >
              <img
                :src="`${PAGE_ASSETS.heroBullets[index]}?v=22`"
                alt=""
                width="40"
                height="40"
                class="mt-0.5 h-10 w-10 shrink-0 rounded-[9px] object-contain shadow-[0_6px_16px_rgba(61,42,31,0.18)]"
                loading="eager"
                decoding="async"
              >
              <span class="pt-1.5 text-[14px] text-[var(--yunda-bark)]/90 leading-[1.55] lg:text-[15px]">{{ bullet }}</span>
            </li>
          </ul>

          <div class="mt-7 flex flex-wrap items-center justify-center gap-3">
            <NuxtLink
              :to="localePath('/be-parents')"
              class="inline-flex items-center justify-center rounded-full bg-[var(--yunda-bark)] px-7 py-3.5 text-sm text-white font-bold shadow-[0_16px_34px_rgba(61,42,31,0.2)] transition hover:-translate-y-0.5"
            >
              {{ c.heroPrimary }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/surrogacy-protection-california')"
              class="inline-flex items-center justify-center border border-[var(--yunda-maple)]/45 rounded-full bg-white/75 px-7 py-3.5 text-sm text-[var(--yunda-maple)] font-bold backdrop-blur-[2px] transition hover:border-[var(--yunda-maple)] hover:-translate-y-0.5"
            >
              {{ c.heroSecondary }}
            </NuxtLink>
          </div>
        </div>
      </section>

      <!-- Section 2: Trust strip — 文档样式为整块圆角 + 三列竖分割 -->
      <section id="overview" class="scroll-mt-40 bg-[color-mix(in_srgb,var(--yunda-sky)_12%,var(--yunda-petal)_88%)] px-6 py-10 lg:px-10 lg:py-12">
        <div class="mx-auto max-w-320 border border-[var(--yunda-maple)]/28 rounded-[22px] bg-[color-mix(in_srgb,var(--yunda-petal)_90%,white_10%)] shadow-[0_10px_28px_rgba(61,42,31,0.07)]">
          <div class="grid divide-y divide-[var(--yunda-maple)]/24 md:grid-cols-3 md:divide-y-0">
            <article
              v-for="(item, index) in trustCards"
              :key="item.title"
              class="relative flex gap-4 px-6 py-6 lg:px-7"
            >
              <span
                v-if="index < trustCards.length - 1"
                aria-hidden="true"
                class="absolute right-0 top-6 hidden h-[calc(100%-3rem)] w-px bg-[var(--yunda-maple)]/24 md:block"
              />
              <img
                :src="`${PAGE_ASSETS.trust[index]}?v=4`"
                alt=""
                width="50"
                height="50"
                class="mt-0.5 h-12.5 w-12.5 shrink-0 object-contain"
                loading="lazy"
                decoding="async"
              >
              <div>
                <h3 class="text-sm text-[var(--yunda-bark)] font-display font-semibold leading-tight lg:text-base">
                  {{ item.title }}
                </h3>
                <p class="mt-2 text-sm text-[var(--yunda-bark)]/82 leading-[1.72]">
                  {{ item.body }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <!-- 目录条起止包住第3–10屏：离开 FAQ 后不再吸顶遮挡 Final CTA -->
      <div class="relative">
        <nav
          class="sticky top-20 z-40 border-b border-[var(--yunda-bark)]/10 bg-[#c5c0a0] md:top-25"
          :aria-label="c.navAria"
        >
          <div class="mx-auto max-w-320 overflow-x-auto px-4 lg:px-10">
            <div class="flex min-w-max gap-2 py-3">
              <button
                v-for="item in sectionNav"
                :key="item.id"
                type="button"
                class="shrink-0 rounded-full px-4 py-2 text-sm whitespace-nowrap transition"
                :class="activeSection === item.id
                  ? 'bg-[var(--yunda-petal)] text-[var(--yunda-bark)] font-semibold shadow-[0_6px_16px_rgba(61,42,31,0.1)]'
                  : 'bg-[color-mix(in_srgb,#b5af8c_70%,white_30%)] text-[var(--yunda-bark)]/88 hover:bg-[var(--yunda-petal)]/70'"
                :aria-current="activeSection === item.id ? 'true' : undefined"
                @click="scrollToSection(item.id)"
              >
                {{ item.label }}
              </button>
            </div>
          </div>
        </nav>

        <!-- Section 3: Audience — 文档样式：米色卡片 + 金色细边框 + 左图标右文案 -->
        <section id="who-this-is-for" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <div class="mx-auto max-w-4xl text-center">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-semibold leading-tight lg:text-[38px]">
                {{ c.audienceTitle }}
              </h2>
              <p class="mt-4 text-base text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-lg">
                {{ c.audienceIntro }}
              </p>
            </div>
            <div class="mt-10 grid gap-5 md:grid-cols-2 lg:gap-6">
              <article
                v-for="(card, index) in c.audienceCards"
                :key="card.title"
                class="flex items-center gap-5 border border-[var(--yunda-maple)]/35 rounded-[14px] bg-[color-mix(in_srgb,var(--yunda-petal)_82%,#f6ddba_18%)] px-5 py-6 lg:gap-6 lg:px-7"
              >
                <img
                  :src="`${PAGE_ASSETS.audience[index]}?v=4`"
                  alt=""
                  width="64"
                  height="64"
                  class="h-16 w-16 shrink-0 object-contain"
                  loading="lazy"
                  decoding="async"
                >
                <div>
                  <h3 class="text-xl text-[var(--yunda-bark)] font-bold leading-snug">
                    {{ card.title }}
                  </h3>
                  <p class="mt-2 text-[15px] text-[var(--yunda-bark)]/78 leading-[1.7] lg:text-base">
                    {{ card.body }}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <!-- Section 4: What Changes — 文档样式：左标题+简介，右灰绿手风琴面板 -->
        <section id="what-changes" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
              <div>
                <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-semibold leading-tight lg:text-[38px]">
                  {{ c.changesTitle }}
                </h2>
                <p class="mt-4 text-[15px] text-[var(--yunda-bark)]/78 leading-[1.85] lg:text-base">
                  {{ c.changesIntro }}
                </p>
              </div>
              <div class="rounded-[6px] bg-[#c3cdc5] px-6 py-8 lg:px-8 lg:py-10">
                <details
                  v-for="(section, index) in c.changesSections"
                  :key="section.title"
                  class="group border-b border-[var(--yunda-bark)]/45"
                  :class="index === 0 ? 'border-t' : ''"
                >
                  <summary class="flex cursor-pointer list-none items-center justify-between gap-4 py-3.5">
                    <h3 class="font-display text-[17px] text-[var(--yunda-bark)] font-bold leading-snug lg:text-lg">
                      {{ section.title }}
                    </h3>
                    <span class="shrink-0 text-xl text-[var(--yunda-bark)] leading-none">
                      <span class="group-open:hidden">+</span>
                      <span class="hidden group-open:inline">−</span>
                    </span>
                  </summary>
                  <div class="pb-4">
                    <p class="text-[13.5px] text-[var(--yunda-bark)]/85 leading-[1.8] lg:text-sm">
                      {{ section.body }}
                    </p>
                    <div class="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                      <NuxtLink
                        v-for="link in section.links"
                        :key="link.to"
                        :to="localePath(link.to)"
                        class="text-[13px] text-[var(--yunda-bark)] font-semibold underline underline-offset-4"
                      >
                        {{ link.label }}
                      </NuxtLink>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 5: Service Area — 左文案 + 右加州地图（对齐改版稿） -->
        <section id="service-area" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <div class="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
              <div>
                <h2 class="font-display text-[28px] text-[var(--yunda-bark)] font-semibold leading-tight lg:text-[36px]">
                  {{ c.serviceTitle }}
                </h2>
                <p class="mt-4 text-base text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-lg">
                  {{ c.serviceBody }}
                </p>
                <!-- Note：文档为灰绿底提示条 + 橙色定位图标，图标与文字垂直居中 -->
                <div class="mt-6 flex items-center gap-4 rounded-[12px] bg-[#c3cdc5] px-5 py-4">
                  <img
                    :src="`${PAGE_ASSETS.serviceArea}?v=4`"
                    alt=""
                    width="36"
                    height="36"
                    class="h-9 w-9 shrink-0 object-contain"
                    loading="lazy"
                    decoding="async"
                  >
                  <p class="text-sm text-[var(--yunda-bark)]/90 font-semibold leading-[1.7] lg:text-[15px]">
                    {{ c.serviceNote }}
                  </p>
                </div>
              </div>

              <div class="ml-auto w-full max-w-[500px] lg:pl-4">
                <img
                  :src="`${PAGE_ASSETS.serviceMap}?v=1`"
                  :alt="c.serviceMapAlt"
                  width="430"
                  height="454"
                  class="h-auto w-full object-contain"
                  loading="lazy"
                  decoding="async"
                >
              </div>
            </div>
          </div>
        </section>

        <!-- Section 6: Planning Path — H2 + Intro + Step 1–5 -->
        <section id="planning-path" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <div class="mx-auto max-w-3xl text-center">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-semibold leading-tight lg:text-[38px]">
                {{ c.pathTitle }}
              </h2>
              <p class="mt-4 text-base text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-lg">
                {{ c.pathIntroBefore }}<NuxtLink
                  :to="localePath('/surrogacy-process')"
                  class="text-[var(--yunda-maple)] font-semibold underline underline-offset-4"
                >{{ c.pathIntroLink }}</NuxtLink>{{ c.pathIntroAfter }}
              </p>
            </div>
            <!-- 文档样式：数字圆徽章与标题同排，米色卡片 + 金色细边框 -->
            <ol class="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-5 lg:gap-5">
              <li
                v-for="(step, index) in c.pathSteps"
                :key="step.title"
                class="border border-[var(--yunda-maple)]/35 rounded-[16px] bg-[color-mix(in_srgb,var(--yunda-petal)_82%,#f6ddba_18%)] p-5"
              >
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#5c5a3f] text-sm text-[var(--yunda-petal)] font-bold">
                    {{ index + 1 }}
                  </span>
                  <h3 class="text-[15px] text-[var(--yunda-bark)] font-bold leading-snug lg:text-base">
                    {{ step.title }}
                  </h3>
                </div>
                <p class="mt-3 text-sm text-[var(--yunda-bark)]/80 leading-[1.7]">
                  {{ step.body }}
                </p>
              </li>
            </ol>
          </div>
        </section>

        <!-- Section 7: Matching — 文档样式：三张横向通栏灰绿卡片纵向堆叠 -->
        <section id="matching" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <div class="mx-auto max-w-4xl text-center">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-semibold leading-tight lg:text-[38px]">
                {{ c.matchingTitle }}
              </h2>
              <p class="mt-4 text-[15px] text-[var(--yunda-bark)]/78 leading-[1.85] lg:text-base">
                {{ c.matchingBody }}
              </p>
            </div>
            <div class="mt-10 space-y-5">
              <article
                v-for="(point, index) in c.matchingPoints"
                :key="point.title"
                class="rounded-[14px] bg-[#c3cdc5] px-6 py-6 lg:px-8"
              >
                <img
                  :src="`${PAGE_ASSETS.matching[index]}?v=4`"
                  alt=""
                  width="40"
                  height="40"
                  class="h-10 w-10 object-contain"
                  loading="lazy"
                  decoding="async"
                >
                <h3 class="mt-3 text-base text-[var(--yunda-bark)] font-bold leading-snug lg:text-[17px]">
                  {{ point.title }}
                </h3>
                <p class="mt-2 text-sm text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[15px]">
                  {{ point.body }}
                </p>
              </article>
            </div>
          </div>
        </section>

        <!-- Section 8: Cost — Left title/body/CTA + Cost Variables card + Insurance Note card -->
        <section id="cost-insurance" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <div class="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-10">
              <div>
                <h2 class="font-display text-[28px] text-[var(--yunda-bark)] font-semibold leading-[1.25] lg:text-[34px]">
                  {{ c.costTitle }}
                </h2>
                <p class="mt-5 text-[15px] text-[var(--yunda-bark)]/85 font-semibold leading-[1.85] lg:text-base">
                  {{ c.costBody }}
                </p>
                <NuxtLink
                  :to="localePath('/surrogacy-cost')"
                  class="mt-8 inline-flex items-center justify-center rounded-[10px] bg-[var(--yunda-maple)] px-6 py-3 text-sm text-white font-bold shadow-[0_12px_26px_rgba(200,110,45,0.24)] transition hover:-translate-y-0.5"
                >
                  {{ c.costCta }}
                </NuxtLink>
              </div>
              <div class="border border-[var(--yunda-maple)]/35 rounded-[14px] bg-[color-mix(in_srgb,var(--yunda-petal)_82%,#f6ddba_18%)] p-6 lg:p-7">
                <h3 class="font-display text-lg text-[var(--yunda-bark)] font-semibold">
                  {{ c.costVariablesTitle }}
                </h3>
                <ul class="mt-4 space-y-3">
                  <li
                    v-for="item in c.costVariables"
                    :key="item"
                    class="flex items-start gap-2.5 text-[14px] text-[var(--yunda-bark)]/88 font-semibold leading-[1.6]"
                  >
                    <svg class="mt-0.75 h-3.5 w-3.5 shrink-0 text-[var(--yunda-maple)]" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                      <path d="M2.5 8.5l3.5 3.5 7.5-8" />
                    </svg>
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
              <div class="border border-[var(--yunda-maple)]/35 rounded-[14px] bg-[color-mix(in_srgb,var(--yunda-petal)_82%,#f6ddba_18%)] p-6 lg:p-7">
                <div class="flex items-center gap-2.5">
                  <svg class="h-6 w-6 shrink-0 text-[var(--yunda-maple)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <rect x="4" y="3" width="16" height="18" rx="2.5" />
                    <path d="M8 8h8M8 12h4" />
                    <path d="M12.5 17l2 2 3.5-3.5" />
                  </svg>
                  <h3 class="font-display text-lg text-[var(--yunda-bark)] font-semibold">
                    {{ c.costNoteTitle }}
                  </h3>
                </div>
                <p class="mt-4 text-[14px] text-[var(--yunda-bark)]/88 font-semibold leading-[1.85]">
                  {{ c.costInsuranceNote }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 9: Related Guides — H2 + Intro + 3 guide cards -->
        <section id="guides" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <div class="mx-auto max-w-4xl text-center">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-semibold leading-tight lg:text-[38px]">
                {{ c.guidesTitle }}
              </h2>
              <p class="mt-4 text-[15px] text-[var(--yunda-bark)]/85 font-semibold leading-[1.8] lg:text-base">
                {{ c.guidesIntro }}
              </p>
            </div>
            <div class="mt-10 grid gap-6 md:grid-cols-3">
              <NuxtLink
                v-for="guide in relatedGuides"
                :key="guide.to"
                :to="localePath(guide.to)"
                class="block border border-[var(--yunda-maple)]/35 rounded-[14px] bg-[color-mix(in_srgb,var(--yunda-petal)_82%,#f6ddba_18%)] p-6 text-left transition hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(61,42,31,0.12)] lg:p-7"
              >
                <h3 class="font-display text-lg text-[var(--yunda-bark)] font-semibold">
                  {{ guide.title }}
                </h3>
                <p class="mt-3 text-[14px] text-[var(--yunda-bark)]/88 font-semibold leading-[1.8]">
                  {{ guide.description }}
                </p>
              </NuxtLink>
            </div>
          </div>
        </section>

        <!-- Section 10: FAQ -->
        <section id="faq" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <h2 class="font-display text-[28px] text-[var(--yunda-bark)] font-semibold leading-tight lg:text-[34px]">
              {{ c.faqTitle }}
            </h2>
            <p class="mt-4 max-w-4xl text-[15px] text-[var(--yunda-bark)]/85 font-semibold leading-[1.8] lg:text-base">
              {{ c.faqIntro }}
            </p>
            <div class="mt-8 space-y-3.5">
              <details
                v-for="item in c.faqs"
                :key="item.q"
                class="group"
              >
                <summary class="flex cursor-pointer items-center justify-between gap-4 list-none rounded-[10px] bg-[#c3cdc5] px-5 py-4 lg:px-6">
                  <span class="text-[15px] text-[var(--yunda-bark)] font-bold leading-snug lg:text-base">{{ item.q }}</span>
                  <svg class="h-4 w-4 shrink-0 text-[var(--yunda-bark)] transition-transform group-open:rotate-180" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <path d="M3 6l5 5 5-5" />
                  </svg>
                </summary>
                <p class="mt-2.5 rounded-[10px] bg-[color-mix(in_srgb,var(--yunda-petal)_82%,#f6ddba_18%)] px-5 py-4 text-[14px] text-[var(--yunda-bark)]/88 font-semibold leading-[1.85] lg:px-6 lg:text-[15px]">
                  {{ item.a }}
                </p>
              </details>
            </div>
          </div>
        </section>
      </div>

      <!-- Section 11: Final CTA -->
      <section class="w-full bg-white px-6 py-14 lg:px-10 lg:py-16">
        <div class="mx-auto max-w-320 bg-[#3a2318] px-6 py-12 text-center lg:px-12 lg:py-14">
          <h2 class="font-display text-[26px] text-white font-semibold leading-tight lg:text-[32px]">
            {{ c.finalTitle }}
          </h2>
          <p class="mx-auto mt-5 max-w-3xl text-[14px] text-white/90 font-semibold leading-[1.9] lg:text-[15px]">
            {{ c.finalBody }}
          </p>
          <NuxtLink
            :to="localePath('/be-parents')"
            class="mt-8 inline-flex items-center justify-center rounded-[8px] bg-[var(--yunda-maple)] px-6 py-3 text-sm text-white font-bold transition hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(0,0,0,0.3)]"
          >
            {{ c.finalCta }}
          </NuxtLink>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

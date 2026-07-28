<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
// Vue composables are auto-imported in Nuxt 3
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'
import { buildCoreServicePageSchemas } from '~/utils/schema'

useScrollAnimation()

const { locale } = useI18n()
const localePath = useLocalePath()
const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en: string, zh: string) => (isZh.value ? zh : en)

const ASSET = '/images/surrogate-requirements/redesign'

const pageTitle = computed(() =>
  tt(
    'Surrogate Requirements & Qualifications Before You Apply | Yunda',
    '代孕妈妈要求与资格：申请前先看 | Yunda',
  ),
)
const pageDescription = computed(() =>
  tt(
    'Review surrogate requirements, surrogate qualifications, and surrogate mother requirements before you apply: age, BMI, birth history, health, screening, and support.',
    '申请前先了解代孕妈妈要求与资格：年龄、BMI、分娩史、健康、筛查与支持。',
  ),
)

useHead(() => ({
  title: pageTitle.value,
  meta: [
    {
      name: 'description',
      content: pageDescription.value,
    },
    {
      property: 'og:title',
      content: pageTitle.value,
    },
    {
      property: 'og:description',
      content: pageDescription.value,
    },
    {
      name: 'twitter:title',
      content: pageTitle.value,
    },
    {
      name: 'twitter:description',
      content: pageDescription.value,
    },
  ],
}))
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const sections = computed(() => [
  { id: 'intro', label: tt('Overview', '概览') },
  { id: 'quick-eligibility', label: tt('Quick Eligibility', '快速资格') },
  { id: 'medical-lifestyle', label: tt('Medical & Lifestyle', '医疗与生活方式') },
  { id: 'disqualify', label: tt('Disqualification Section', '不符合情况') },
  { id: 'process', label: tt('Screening Steps', '筛查步骤') },
  { id: 'before-apply', label: tt('Before You Apply', '申请之前') },
  { id: 'compensation', label: tt('Compensation & Support', '补偿与支持') },
  { id: 'faq', label: tt('FAQ', '常见问题') },
])

const activeSection = ref(sections.value[0].id)

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleScroll() {
  const offsets = sections.value.map((section) => {
    const element = document.getElementById(section.id)
    if (!element)
      return { id: section.id, distance: Number.POSITIVE_INFINITY }
    const rect = element.getBoundingClientRect()
    return { id: section.id, distance: Math.abs(rect.top - 160) }
  })
  activeSection.value = offsets.reduce((prev, current) => (current.distance < prev.distance ? current : prev)).id
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const heroBadges = computed(() => [
  { icon: `${ASSET}/s1-3.png`, label: tt('Age', '年龄') },
  { icon: `${ASSET}/s1-4.png`, label: tt('Health', '健康') },
  { icon: `${ASSET}/s1-5.png`, label: tt('Support', '支持') },
  { icon: `${ASSET}/s1-6.png`, label: tt('Screening readiness', '筛查准备') },
])

const quickEligibilityCards = computed(() => [
  {
    icon: `${ASSET}/s3-1.png`,
    title: tt('Core Surrogacy Requirements', '核心代孕要求'),
    items: [
      tt('Age 21–39 for most Yunda surrogate candidates, subject to clinic review.', '年龄 21–39 岁（多数孕达候选人范围，以诊所审核为准）。'),
      tt('At least one prior full-term birth with healthy OB records.', '至少一次健康足月分娩及产科记录。'),
      tt('BMI within the clinic range for gestational surrogacy screening.', 'BMI 在诊所妊娠代孕筛查范围内。'),
      tt('No smoking, vaping, or drug use.', '不吸烟、不电子烟、不使用毒品。'),
      tt('Reliable transportation and a stable schedule.', '交通可靠且日程稳定。'),
      tt('These are baseline surrogate requirements and surrogate mother qualifications, not a final approval decision.', '以上是基础代孕要求与资格，不代表最终批准。'),
    ],
  },
  {
    icon: `${ASSET}/s3-2.png`,
    title: tt('Citizenship & Location', '国籍与居住地'),
    items: [
      tt('U.S. citizens or U.S. Residents accepted by the program may be reviewed.', '美国公民或项目接受的美国居民可进入审核。'),
      tt('You live in a state where clinics and attorneys can support the process.', '居住在诊所与律师可支持流程的州。'),
      tt('You can travel for screening and embryo transfer when needed.', '可在需要时出行完成筛查与胚胎移植。'),
      tt('State rules and logistics are part of the requirements for surrogate candidates.', '州法规与执行条件也是候选人要求的一部分。'),
    ],
  },
  {
    icon: `${ASSET}/s3-3.png`,
    title: tt('Health & Lifestyle Fit', '健康与生活方式匹配'),
    items: [
      tt('You manage health conditions under a doctor’s care.', '如有健康状况，需在医生管理下稳定。'),
      tt('You wait until breastfeeding has ended before medications and embryo transfer.', '哺乳结束后再开始用药与胚胎移植。'),
      tt('You keep a healthy routine around sleep, nutrition, and movement.', '保持健康作息：睡眠、营养与运动。'),
      tt('This profile supports safer gestational surrogacy and stronger surrogate qualifications.', '这样的状态支持更安全的妊娠代孕和更好的资格。'),
    ],
  },
  {
    icon: `${ASSET}/s3-4.png`,
    title: tt('Support & Readiness', '支持与准备度'),
    items: [
      tt('Your home offers steady support.', '家庭支持稳定。'),
      tt('A partner, family member, or trusted support person can help with rides and childcare.', '伴侣、家人或可信赖的支持者能协助接送与托育。'),
      tt('You feel ready for appointments, communication, and matching with intended parents.', '准备好就诊、沟通并与准父母匹配。'),
      tt('You understand the commitment before you apply to become a surrogate.', '在申请成为代孕妈妈前理解这份承诺。'),
    ],
  },
])

const medicalLifestyleCards = computed(() => [
  {
    icon: `${ASSET}/s4-1.png`,
    title: tt('Reproductive History & Overall Health', '生育史与整体健康'),
    body: tt('You meet the surrogacy requirements best when you have at least one full-term birth and stable prenatal records. Clinics review C-section history, pregnancy complications, cycle regularity, and current health to confirm surrogate qualifications for gestational surrogacy.', '至少一次足月分娩并有稳定产检记录，最符合代孕要求。诊所会审核剖宫产史、妊娠并发症、月经规律与当前健康，以确认妊娠代孕资格。'),
    cardBg: '#d7dfd9',
    barBg: '#b9c8bf',
  },
  {
    icon: `${ASSET}/s4-2.png`,
    title: tt('Medical Screening', '医学筛查'),
    body: tt('Your screening starts with OB records. The clinic reviews your pregnancy history and current health, then schedules medical exams for you and, when needed, your partner. Doctors decide whether you meet transfer criteria and issue medical clearance before matching.', '筛查从产科病历开始。诊所审核孕产史与当前健康，随后为你（必要时含伴侣）安排体检。医生判断是否符合移植标准，并在匹配前出具医疗清关。'),
    cardBg: '#ecb48b',
    barBg: '#cf8352',
  },
  {
    icon: `${ASSET}/s4-3.png`,
    title: tt('Mental Health & Support', '心理健康与支持'),
    body: tt('You meet with a licensed therapist to review support, expectations, motivation, and stress management. This helps confirm that becoming a surrogate is emotionally and practically appropriate before the journey moves forward.', '你将与持证心理咨询师面谈，评估支持系统、期望、动机与压力管理，确认成为代孕妈妈在情感和实际层面都合适后再推进。'),
    cardBg: '#cbcaa2',
    barBg: '#a9a87d',
  },
])

const disqualifyCards = computed(() => [
  {
    icon: `${ASSET}/s5-1.png`,
    title: tt('Possible Disqualifying Factors', '可能导致不通过的因素'),
    body: tt('Possible disqualifying factors may include uncontrolled medical conditions, severe pregnancy complications, current nicotine or drug use, unsafe logistics, legal constraints, or clinic concerns after records review.', '可能包括未控制的疾病、严重妊娠并发症、当前使用尼古丁或药物、执行条件不安全、法律限制，或病历审核后诊所提出的顾虑。'),
  },
  {
    icon: `${ASSET}/s5-2.png`,
    title: tt('Temporary Delays', '临时延后'),
    body: tt('Temporary delays may include breastfeeding, recent childbirth, recent tattoos or piercings, pending records, or BMI outside the clinic range.', '可能包括哺乳期、刚分娩、近期纹身或穿孔、病历待补，或 BMI 超出诊所范围。'),
  },
])

const processSteps = computed(() => [
  {
    icon: `${ASSET}/s6-1.png`,
    title: tt('Records Review & Medical Screening', '病历审核与医学筛查'),
    text: tt('Yunda starts with your OB records. The clinic checks your pregnancy history and current health to confirm surrogate qualifications.', '孕达从产科病历开始，诊所核查孕产史与当前健康以确认资格。'),
  },
  {
    icon: `${ASSET}/s6-2.png`,
    title: tt('Psychological Evaluation', '心理评估'),
    text: tt('You meet with a licensed therapist to review expectations, support, motivation, and readiness.', '与持证心理咨询师面谈，评估期望、支持、动机与准备度。'),
  },
  {
    icon: `${ASSET}/s6-3.png`,
    title: tt('Legal Clearance', '法律清关'),
    text: tt('After medical clearance, attorneys draft and review your contract and insurance documents.', '医疗清关后，律师起草并审核合同与保险文件。'),
  },
  {
    icon: `${ASSET}/s6-4.png`,
    title: tt('Cycle Prep & Embryo Transfer', '周期准备与胚胎移植'),
    text: tt('Your doctor starts pre-transfer medications and monitoring before embryo transfer.', '医生在胚胎移植前启动移植前用药与监测。'),
  },
  {
    icon: `${ASSET}/s6-5.png`,
    title: tt('Pregnancy Monitoring', '妊娠监测'),
    text: tt('After transfer, you complete HCG testing, heartbeat confirmation, and ongoing OB care.', '移植后完成 HCG 检测、心跳确认与持续产检。'),
  },
  {
    icon: `${ASSET}/s6-6.png`,
    title: tt('Ongoing Coordination', '持续协调'),
    text: tt('A dedicated project manager helps with schedules, milestone reminders, updates, and support.', '专属项目经理协助排期、里程碑提醒、进度更新与支持。'),
  },
])

const beforeApplyItems = computed(() => [
  {
    title: tt('Application Is Not a Commitment', '申请不代表承诺'),
    body: tt('Starting the application simply opens a private eligibility review. You can ask questions and decide whether to continue before any agreement is signed.', '开始申请只是开启一次私密资格审核。在签署任何协议前，你都可以提问并决定是否继续。'),
  },
  {
    title: tt('Expect a Detailed Application', '申请表比较详细'),
    body: tt('The surrogate application asks about contact details, pregnancy history, health, lifestyle, preferences, legal/admin items, photos, and consent. Your draft is saved as you move through the form.', '申请会询问联系方式、孕产史、健康、生活方式、偏好、法律/行政事项、照片和同意条款。填写过程中草稿会自动保存。'),
  },
  {
    title: tt('Your Information Is Reviewed Privately', '你的信息将被私密审核'),
    body: tt('Yunda reviews your information for eligibility and next-step coordination. If you may qualify, a coordinator explains records review, screening, legal, insurance, escrow, and matching.', '孕达审核你的信息以评估资格并协调下一步。若可能符合条件，协调员会为你说明病历审核、筛查、法律、保险、托管与匹配。'),
  },
])

const faqItems = computed(() => [
  {
    question: tt('What are the basic requirements to be a surrogate?', '成为代孕妈妈的基本要求是什么？'),
    answer: tt('Basic surrogate requirements usually include age, prior pregnancy history, BMI, health background, lifestyle, state or residency factors, reliable transportation, home support, and readiness for medical, psychological, legal, and insurance screening.', '基本要求通常包括年龄、既往孕产史、BMI、健康背景、生活方式、所在州或居住身份、可靠交通、家庭支持，以及为医学、心理、法律和保险筛查做好准备。'),
  },
  {
    question: tt('What are the surrogate qualifications for age, BMI, and birth history?', '年龄、BMI 和分娩史的资格标准是什么？'),
    answer: tt('Yunda generally reviews candidates ages 21–39, at least one prior full-term birth, and BMI within the clinic range. OB records, current health, medications, prior complications, and clinic guidance also matter.', '孕达一般审核 21–39 岁、至少一次足月分娩、BMI 在诊所范围内的候选人。产科病历、当前健康、用药、既往并发症和诊所意见也很重要。'),
  },
  {
    question: tt('What can disqualify someone from becoming a surrogate mother?', '哪些情况会导致无法成为代孕妈妈？'),
    answer: tt('Possible disqualifying factors include uncontrolled medical conditions, severe pregnancy complications, current nicotine or drug use, unsafe logistics, legal constraints, or clinic concerns after records review.', '可能包括未控制的疾病、严重妊娠并发症、当前使用尼古丁或药物、执行条件不安全、法律限制，或病历审核后诊所提出的顾虑。'),
  },
  {
    question: tt('Can I apply if I am breastfeeding or recently gave birth?', '哺乳期或刚生完孩子可以申请吗？'),
    answer: tt('You may be able to start a conversation, but clinics usually wait until breastfeeding has ended and your body has had enough recovery time before medications and embryo transfer.', '可以先开始沟通，但诊所通常会等哺乳结束、身体充分恢复后，再开始用药与胚胎移植。'),
  },
  {
    question: tt('Do I have to be a U.S. citizen to meet surrogate mother requirements?', '必须是美国公民才符合代孕妈妈要求吗？'),
    answer: tt('Yunda reviews U.S. citizens and U.S. residents accepted by the program. Your state, travel ability, identity or residency status, and legal logistics all affect whether you can move forward.', '孕达审核美国公民及项目接受的美国居民。所在州、出行能力、身份或居住状态及法律执行条件都会影响能否推进。'),
  },
  {
    question: tt('What happens after I start the surrogate application?', '开始申请后会发生什么？'),
    answer: tt('Yunda privately reviews your information. If you may qualify, a coordinator follows up to explain OB records review, medical screening, psychological evaluation, legal coordination, insurance review, escrow payment protection, and matching.', '孕达会私密审核你的信息。若可能符合条件，协调员会跟进说明产科病历审核、医学筛查、心理评估、法律协调、保险审查、托管付款保障与匹配。'),
  },
])

const surrogateRequirementItemNames = [
  'Records Review & Medical Screening',
  'Psychological Evaluation',
  'Legal Clearance',
  'Cycle Prep & Embryo Transfer',
  'Pregnancy Monitoring',
  'Ongoing Coordination',
]

const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: '/surrogate-requirements',
  name: 'Surrogate Requirements & Qualifications: See If You May Qualify Before You Apply',
  description: pageDescription.value,
  dateModified: '2026-07-28',
  reviewedBy: { '@id': `${siteUrl.value || 'https://www.yundasurrogacy.com'}/about#kayla-luo` },
  about: 'Gestational carrier requirements and surrogate qualifications',
  audience: 'Potential gestational carriers / surrogate applicants',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  service: {
    name: 'Gestational Carrier Requirements and Qualification Review',
    serviceType: 'Gestational carrier eligibility and qualification guidance',
    areaServed: ['California', 'United States'],
    audience: 'Potential gestational carriers / surrogate applicants',
    description: 'Guidance for potential gestational carriers on surrogate requirements, qualifications, medical and lifestyle criteria, disqualifying factors, medical clearance, psychological evaluation, legal clearance, cycle preparation, embryo transfer, pregnancy monitoring, and ongoing coordination.',
  },
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'For Surrogates', url: '/surrogates' },
    { name: 'Surrogate Requirements', url: '/surrogate-requirements' },
  ],
  faqs: faqItems.value,
  itemList: {
    name: 'Screening & Clearance Steps: IVF Surrogacy Process',
    items: [
      ...surrogateRequirementItemNames.map((name, index) => ({
        position: index + 1,
        name,
        description: processSteps.value[index]?.text,
        url: '/surrogate-requirements',
      })),
      ...((quickEligibilityCards.value[0]?.items || []).slice(0, 5).map((name, index) => ({
        position: surrogateRequirementItemNames.length + index + 1,
        name: name.replace(/\.$/, ''),
        url: '/surrogate-requirements',
      }))),
    ],
  },
}))

useHead(() => ({
  script: coreServicePageSchemas.value.map((schema, index) => ({
    key: `schema-surrogate-requirements-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div class="min-h-screen bg-white text-[var(--yunda-bark)]">
    <AppHeader />

    <main>
      <!-- Screen 1: Hero -->
      <section class="w-full bg-white pb-14 pt-10 lg:pb-18 lg:pt-14">
        <div class="mx-auto max-w-320 px-6 lg:px-10">
          <div class="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div>
              <h1 class="font-display text-[32px] text-[var(--yunda-bark)] font-semibold leading-[1.25] lg:text-[44px]">
                {{ tt('Surrogate Requirements & Qualifications: See If You May Qualify Before You Apply', '代孕妈妈要求与资格：申请前先看你是否符合条件') }}
              </h1>
              <p class="mt-6 text-[15px] text-[var(--yunda-bark)]/85 font-semibold leading-[1.85] lg:text-base">
                {{ tt('Wondering whether you meet the surrogate requirements? Start here. This guide explains the surrogate qualifications and surrogate mother requirements Yunda reviews first, including age, prior birth history, BMI, health, lifestyle, U.S. status, screening readiness, and home support.', '想知道自己是否符合代孕妈妈要求？从这里开始。本指南解释孕达优先审核的代孕资格与要求，包括年龄、既往分娩史、BMI、健康、生活方式、美国身份、筛查准备度和家庭支持。') }}
              </p>
              <p class="mt-3 text-[15px] text-[var(--yunda-maple)] font-semibold leading-[1.7]">
                {{ tt('Applying is private and not a commitment.', '申请是私密的，也不代表承诺。') }}
              </p>
              <div class="mt-8 flex items-stretch gap-4">
                <NuxtLink
                  :to="localePath('/be-surrogate')"
                  class="inline-flex items-center justify-center rounded-[8px] bg-[var(--yunda-maple)] px-6 py-3.5 text-center text-sm text-white font-bold shadow-[0_12px_26px_rgba(193,124,69,0.24)] transition hover:-translate-y-0.5"
                >
                  {{ tt('Start My Private Eligibility Review', '开始我的私密资格审核') }}
                </NuxtLink>
                <a
                  href="#quick-eligibility"
                  class="inline-flex max-w-[220px] items-center justify-center border border-[var(--yunda-maple)] rounded-[8px] px-5 py-2 text-center text-sm text-[var(--yunda-maple)] font-bold leading-snug transition hover:bg-[var(--yunda-petal)]"
                  @click.prevent="scrollToSection('quick-eligibility')"
                >
                  {{ tt('Take the 60-Second Qualification Check', '60 秒快速资格自测') }}
                </a>
              </div>
            </div>
            <div class="relative">
              <img
                :src="`${ASSET}/hero.png`"
                :alt="tt('A surrogate candidate talking with a Yunda coordinator', '代孕候选人与孕达协调员交流')"
                width="579"
                height="679"
                class="h-[380px] w-full object-cover lg:h-[460px]"
              >
              <div
                class="pointer-events-none absolute inset-0"
                aria-hidden="true"
                style="background: linear-gradient(to right, #ffffff 0%, rgba(255,255,255,0) 32%);"
              />
            </div>
          </div>

          <!-- Hero support strip -->
          <div class="mt-10 rounded-[18px] bg-[var(--yunda-petal)] px-6 py-7 lg:px-10">
            <div class="grid items-center gap-8 lg:grid-cols-2">
              <div class="flex items-center gap-6 lg:border-r lg:border-[var(--yunda-bark)]/15 lg:pr-8">
                <img :src="`${ASSET}/s1-1.png`" alt="" width="72" height="72" class="h-16 w-16 shrink-0 object-contain" aria-hidden="true">
                <p class="text-[13.5px] text-[var(--yunda-bark)]/85 font-semibold leading-[1.8]">
                  {{ tt('Submitting an application does not mean you are committing to a surrogacy journey. It simply helps Yunda review whether you may be a fit before records review, screening, legal coordination, insurance review, or matching begins.', '提交申请并不意味着你承诺开始代孕旅程，只是帮助孕达在病历审核、筛查、法律协调、保险审查或匹配开始前，先评估你是否合适。') }}
                </p>
              </div>
              <div class="flex items-center gap-6">
                <img :src="`${ASSET}/s1-2.png`" alt="" width="64" height="64" class="h-14 w-14 shrink-0 object-contain" aria-hidden="true">
                <div>
                  <p class="font-display text-lg text-[var(--yunda-bark)] font-semibold">
                    {{ tt('Private eligibility review', '私密资格审核') }}
                  </p>
                  <div class="mt-4 flex flex-wrap items-start gap-x-5 gap-y-3">
                    <template v-for="(badge, index) in heroBadges" :key="badge.label">
                      <div class="flex flex-col items-center gap-2 text-center">
                        <img :src="badge.icon" alt="" width="44" height="44" class="h-11 w-11 object-contain" aria-hidden="true">
                        <span class="max-w-[92px] text-[13px] text-[var(--yunda-bark)] font-bold leading-tight">{{ badge.label }}</span>
                      </div>
                      <span v-if="index < heroBadges.length - 1" class="mt-5 hidden h-1 w-1 rounded-full bg-[var(--yunda-bark)]/40 sm:block" />
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Screen 2: Intro / Overview -->
      <section id="intro" class="scroll-mt-40 w-full bg-[var(--yunda-petal)] py-12 lg:py-14">
        <div class="mx-auto max-w-320 flex items-center gap-8 px-6 lg:px-10">
          <svg class="hidden h-28 w-20 shrink-0 text-[var(--olive-green)]/60 lg:block" viewBox="0 0 80 112" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
            <path d="M40 108C36 84 30 52 44 12" />
            <path d="M42 30c-10-4-18-12-20-22 10 0 18 8 20 22Z" />
            <path d="M43 52c-12-2-22-9-26-20 12-1 22 7 26 20Z" />
            <path d="M41 34c8-6 12-14 12-24 8 6 8 18-2 26" />
            <path d="M40 58c10-4 16-12 17-22 9 8 5 20-7 26" />
          </svg>
          <div>
            <p class="text-[15px] text-[var(--yunda-bark)] font-bold leading-[1.85] lg:text-base">
              {{ tt('Most surrogate requirements begin with one practical question: is it safe and realistic for you to move into a full review?', '大多数代孕妈妈要求都始于一个实际问题：进入全面审核对你来说是否安全、可行？') }}
            </p>
            <p class="mt-4 text-[15px] text-[var(--yunda-bark)]/85 font-semibold leading-[1.85] lg:text-base">
              {{ tt('Yunda reviews surrogate qualifications in stages. The first step looks at age, pregnancy history, BMI, current health, lifestyle, state logistics, transportation, home support, and appointment readiness. If the basics fit, the next step is a private application and OB records review before any commitment is made.', '孕达分阶段审核代孕资格。第一步查看年龄、孕产史、BMI、当前健康、生活方式、所在州执行条件、交通、家庭支持和就诊配合度。如果基础条件合适，下一步是私密申请与产科病历审核，之后才谈任何承诺。') }}
            </p>
          </div>
        </div>
      </section>

      <!-- Sticky section nav wraps screens 3-9 so it stops before the final CTA -->
      <div class="relative">
        <nav
          class="sticky top-20 z-40 border-b border-[var(--yunda-bark)]/10 bg-[#efe7d2] md:top-25"
          :aria-label="tt('Page sections', '页面目录')"
        >
          <div class="mx-auto max-w-320 overflow-x-auto px-4 lg:px-10">
            <div class="flex min-w-max gap-2 py-3">
              <button
                v-for="item in sections"
                :key="item.id"
                type="button"
                class="shrink-0 rounded-full px-4 py-2 text-sm whitespace-nowrap transition"
                :class="activeSection === item.id
                  ? 'bg-[var(--yunda-bark)] text-white font-semibold shadow-[0_6px_16px_rgba(61,42,31,0.18)]'
                  : 'bg-[#c6c2a0] text-[var(--yunda-bark)] font-semibold hover:bg-[#b5b28c]'"
                :aria-current="activeSection === item.id ? 'true' : undefined"
                @click="scrollToSection(item.id)"
              >
                {{ item.label }}
              </button>
            </div>
          </div>
        </nav>

        <!-- Screen 3: Quick Eligibility -->
        <section id="quick-eligibility" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <div class="mx-auto max-w-4xl text-center">
              <h2 class="font-display text-[28px] text-[var(--yunda-bark)] font-semibold leading-tight lg:text-[34px]">
                {{ tt('Surrogacy Requirements and Surrogate Mother Qualifications', '代孕要求与代孕妈妈资格') }}
              </h2>
              <p class="mt-4 text-[15px] text-[var(--yunda-bark)]/85 font-semibold leading-[1.8] lg:text-base">
                {{ tt('Use this quick check to compare your situation with the surrogate requirements that usually receive the first review.', '用这份快速清单，对照通常最先审核的代孕妈妈要求，看看你的情况是否匹配。') }}
              </p>
            </div>
            <div class="mt-10 grid gap-6 md:grid-cols-2">
              <article
                v-for="card in quickEligibilityCards"
                :key="card.title"
                class="rounded-[16px] bg-[#e8ece9] p-7 lg:p-8"
              >
                <div class="flex items-center gap-4">
                  <img :src="card.icon" :alt="card.title" width="52" height="52" class="h-13 w-13 shrink-0 object-contain">
                  <h3 class="font-display text-xl text-[var(--yunda-bark)] font-semibold">
                    {{ card.title }}
                  </h3>
                </div>
                <ul class="mt-5 space-y-2.5">
                  <li
                    v-for="item in card.items"
                    :key="item"
                    class="flex items-start gap-2.5 text-[14px] text-[var(--yunda-bark)]/88 font-semibold leading-[1.65]"
                  >
                    <span class="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-[var(--yunda-bark)]/70" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </article>
            </div>
          </div>
        </section>

        <!-- Screen 4: Medical & Lifestyle -->
        <section id="medical-lifestyle" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <div class="mx-auto max-w-4xl text-center">
              <h2 class="font-display text-[28px] text-[var(--yunda-bark)] font-semibold leading-tight lg:text-[34px]">
                {{ tt('Medical and Lifestyle Requirements for Gestational Surrogacy', '妊娠代孕的医疗与生活方式要求') }}
              </h2>
              <p class="mt-4 text-[15px] text-[var(--yunda-bark)]/85 font-semibold leading-[1.8] lg:text-base">
                {{ tt('Medical and lifestyle review helps clinics decide whether gestational surrogacy is safe to consider. Records, pregnancy history, BMI, medication needs, nicotine or drug use, mental health readiness, and home support all matter before clearance.', '医疗与生活方式审核帮助诊所判断是否适合考虑妊娠代孕。病历、孕产史、BMI、用药需求、尼古丁或药物使用、心理准备和家庭支持都会影响清关。') }}
              </p>
            </div>
            <div class="mt-10 grid gap-6 md:grid-cols-3">
              <article
                v-for="card in medicalLifestyleCards"
                :key="card.title"
                class="overflow-hidden rounded-[8px]"
                :style="{ backgroundColor: card.cardBg }"
              >
                <div class="h-2 w-full" :style="{ backgroundColor: card.barBg }" />
                <div class="p-7 lg:p-8">
                  <img :src="card.icon" :alt="card.title" width="56" height="56" class="mx-auto h-14 w-14 object-contain">
                  <h3 class="mt-4 text-center font-display text-xl text-[var(--yunda-bark)] font-semibold leading-snug">
                    {{ card.title }}
                  </h3>
                  <p class="mt-4 text-[14.5px] text-[var(--yunda-bark)]/90 font-semibold leading-[1.85]">
                    {{ card.body }}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <!-- Screen 5: Disqualification -->
        <section id="disqualify" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <div class="mx-auto max-w-4xl text-center">
              <h2 class="font-display text-[28px] text-[var(--yunda-bark)] font-semibold leading-tight lg:text-[34px]">
                {{ tt('What Can Disqualify You From Becoming a Surrogate Mother', '哪些情况会导致无法成为代孕妈妈') }}
              </h2>
              <p class="mt-4 text-[15px] text-[var(--yunda-bark)]/85 font-semibold leading-[1.8] lg:text-base">
                {{ tt('Some factors can prevent approval, while others only delay the process. Final eligibility depends on OB records, clinic medical clearance, psychological screening, legal review, insurance review, and program requirements.', '有些因素会阻止批准，有些只是延后流程。最终资格取决于产科病历、诊所医疗清关、心理筛查、法律审核、保险审查和项目要求。') }}
              </p>
            </div>
            <div class="mt-10 grid gap-6 md:grid-cols-2">
              <article
                v-for="card in disqualifyCards"
                :key="card.title"
                class="flex items-start gap-5 border border-[#e2d3ab] rounded-[12px] bg-[#fbf5e4] p-6 lg:p-7"
              >
                <img :src="card.icon" :alt="card.title" width="52" height="52" class="h-13 w-13 shrink-0 object-contain">
                <div>
                  <h3 class="font-display text-lg text-[var(--yunda-bark)] font-semibold">
                    {{ card.title }}
                  </h3>
                  <p class="mt-2.5 text-[14px] text-[var(--yunda-bark)]/88 font-semibold leading-[1.8]">
                    {{ card.body }}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <!-- Screen 6: Screening Steps -->
        <section id="process" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <h2 class="text-center font-display text-[28px] text-[var(--yunda-bark)] font-semibold leading-tight lg:text-[34px]">
              {{ tt('What Happens After You Meet the Basic Surrogate Requirements', '满足基础代孕要求之后会发生什么') }}
            </h2>
            <div class="mt-10 grid gap-6 md:grid-cols-3 md:gap-x-8">
              <article
                v-for="(step, index) in processSteps"
                :key="step.title"
                class="relative flex items-start gap-5 border border-[#ede2ca] rounded-[14px] bg-[#fdf8ec] p-6"
              >
                <span
                  v-if="index % 3 !== 2"
                  class="absolute top-1/2 hidden w-8 border-t-2 border-[#cfc4a3] border-dashed md:block -right-8"
                  aria-hidden="true"
                />
                <div class="flex shrink-0 flex-col items-center gap-4">
                  <span class="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#b5b28a] text-[15px] text-[var(--yunda-bark)] font-bold">
                    {{ index + 1 }}
                  </span>
                  <img :src="step.icon" :alt="step.title" width="44" height="44" class="h-11 w-11 object-contain">
                </div>
                <div>
                  <h3 class="font-display text-[17px] text-[var(--yunda-bark)] font-semibold leading-snug">
                    {{ step.title }}
                  </h3>
                  <p class="mt-2.5 text-[13.5px] text-[var(--yunda-bark)]/88 font-semibold leading-[1.75]">
                    {{ step.text }}
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <!-- Screen 7: Before You Apply -->
        <section id="before-apply" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <div class="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h2 class="font-display text-[26px] text-[var(--yunda-maple)] font-semibold leading-tight lg:text-[30px]">
                  {{ tt('Before You Apply to Be a Surrogate', '申请成为代孕妈妈之前') }}
                </h2>
                <p class="mt-4 text-[15px] text-[var(--yunda-bark)]/88 font-semibold leading-[1.85]">
                  {{ tt('If the surrogate requirements look like a fit, the next step is a private application. It helps Yunda understand your surrogate qualifications before records review, screening, legal coordination, insurance review, escrow planning, or matching begins.', '如果这些代孕要求与你的情况匹配，下一步就是私密申请。它帮助孕达在病历审核、筛查、法律协调、保险审查、托管规划或匹配开始前了解你的资格。') }}
                </p>
                <div class="mt-6 border-t border-[var(--yunda-bark)]/60">
                  <details
                    v-for="item in beforeApplyItems"
                    :key="item.title"
                    class="group border-b border-[var(--yunda-bark)]/60"
                  >
                    <summary class="flex cursor-pointer items-center justify-between gap-4 list-none py-3.5">
                      <span class="text-[15px] text-[var(--yunda-bark)] font-bold">{{ item.title }}</span>
                      <span class="shrink-0 text-lg text-[var(--yunda-bark)] leading-none" aria-hidden="true">
                        <span class="group-open:hidden">+</span>
                        <span class="hidden group-open:inline">−</span>
                      </span>
                    </summary>
                    <p class="pb-4 text-[14px] text-[var(--yunda-bark)]/85 font-semibold leading-[1.8]">
                      {{ item.body }}
                    </p>
                  </details>
                </div>
                <div class="mt-8 flex flex-wrap gap-4">
                  <NuxtLink
                    :to="localePath('/be-surrogate')"
                    class="inline-flex items-center justify-center rounded-[8px] bg-[var(--yunda-maple)] px-6 py-3 text-sm text-white font-bold shadow-[0_12px_26px_rgba(193,124,69,0.24)] transition hover:-translate-y-0.5"
                  >
                    {{ tt('Start My Private Application', '开始我的私密申请') }}
                  </NuxtLink>
                  <a
                    href="#quick-eligibility"
                    class="inline-flex items-center justify-center rounded-[8px] bg-[var(--yunda-maple)]/90 px-6 py-3 text-sm text-white font-bold transition hover:-translate-y-0.5 hover:bg-[var(--yunda-maple)]"
                    @click.prevent="scrollToSection('quick-eligibility')"
                  >
                    {{ tt('Check Basic Qualifications First', '先自测基础资格') }}
                  </a>
                </div>
              </div>
              <div class="flex justify-center lg:justify-end">
                <div class="relative h-[340px] w-[340px] lg:h-[400px] lg:w-[400px]">
                  <div class="absolute inset-0 rounded-full from-[#eec49c] to-[var(--yunda-maple)] bg-gradient-to-br" />
                  <img
                    :src="`${ASSET}/before-apply.png`"
                    :alt="tt('A surrogate receiving flowers', '代孕妈妈收到鲜花')"
                    width="977"
                    height="1024"
                    class="absolute inset-3 h-[calc(100%-24px)] w-[calc(100%-24px)] rounded-full object-cover"
                  >
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Screen 8: Compensation -->
        <section id="compensation" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <div class="grid items-center gap-10 lg:grid-cols-[0.38fr_1fr] lg:gap-14">
              <div class="mx-auto max-w-[300px] w-full">
                <div class="border-2 border-[var(--yunda-maple)] rounded-[50%] bg-[#fdf3e3] px-8 py-12 text-center">
                  <p class="font-display text-[34px] text-[var(--yunda-bark)] font-semibold leading-none lg:text-[38px]">
                    $61,000+
                  </p>
                  <p class="mt-3 text-[13px] text-[var(--yunda-bark)] font-bold leading-snug tracking-wide uppercase">
                    {{ tt('Total Compensation Package', '总补偿方案') }}
                  </p>
                </div>
              </div>
              <div class="relative">
                <img
                  :src="`${ASSET}/s8-1.png`"
                  alt=""
                  width="52"
                  height="52"
                  class="absolute h-13 w-13 object-contain -right-1 -top-2 lg:-top-4"
                  aria-hidden="true"
                >
                <h2 class="pr-16 font-display text-[26px] text-[var(--yunda-bark)] font-semibold leading-tight lg:text-[30px]">
                  {{ tt('Compensation, Protection, and Support', '补偿、保障与支持') }}
                </h2>
                <p class="mt-5 text-[15px] text-[var(--yunda-bark)]/88 font-semibold leading-[1.85]">
                  {{ tt('Qualified surrogate candidates may receive a $61,000+ total compensation package through Yunda. Exact amounts depend on eligibility, agreement terms, medical events, approved reimbursements, state logistics, and program requirements.', '符合条件的候选人可通过孕达获得 $61,000+ 总补偿方案。具体金额取决于资格、协议条款、医疗事件、获批报销、州执行条件和项目要求。') }}
                </p>
                <p class="mt-4 text-[15px] text-[var(--yunda-bark)]/88 font-semibold leading-[1.85]">
                  {{ tt('Compensation and reimbursements are handled through clear agreement terms and escrow or trust account coordination. Legal protection, insurance review, and dedicated support are explained before the journey moves forward.', '补偿与报销通过清晰的协议条款和托管/信托账户协调处理。法律保障、保险审查与专属支持会在旅程推进前讲清楚。') }}
                </p>
              </div>
            </div>
          </div>
        </section>

        <!-- Screen 9: FAQ -->
        <section id="faq" class="scroll-mt-40 w-full bg-white py-16 lg:py-22">
          <div class="mx-auto max-w-320 px-6 lg:px-10">
            <h2 class="text-center font-display text-[28px] text-[var(--yunda-bark)] font-semibold leading-tight lg:text-[34px]">
              {{ tt('Surrogate Requirements FAQ', '代孕妈妈要求常见问题') }}
            </h2>
            <div class="mt-10 grid items-start gap-x-6 gap-y-4 md:grid-cols-2">
              <details
                v-for="(item, index) in faqItems"
                :key="item.question"
                class="group"
              >
                <summary class="flex cursor-pointer items-center justify-between gap-4 list-none border border-[#ddceab] rounded-[8px] bg-[#fbf3e0] px-5 py-3.5">
                  <span class="text-[14px] text-[var(--yunda-bark)] font-bold leading-snug">{{ index + 1 }}.{{ item.question }}</span>
                  <span class="shrink-0 text-lg text-[var(--yunda-bark)] leading-none" aria-hidden="true">
                    <span class="group-open:hidden">+</span>
                    <span class="hidden group-open:inline">−</span>
                  </span>
                </summary>
                <p class="mt-1.5 border border-[#ece0c4] rounded-[8px] bg-[#fdf9ee] px-5 py-4 text-[13.5px] text-[var(--yunda-bark)]/88 font-semibold leading-[1.8]">
                  {{ item.answer }}
                </p>
              </details>
            </div>
          </div>
        </section>
      </div>

      <!-- Screen 10: Final CTA -->
      <section class="w-full bg-[#3a2a20] px-6 py-16 text-center lg:py-20">
        <div class="mx-auto max-w-4xl">
          <h2 class="font-display text-[28px] text-white font-semibold leading-tight lg:text-[34px]">
            {{ tt('Ready to Review Your Surrogate Qualifications?', '准备好审核你的代孕资格了吗？') }}
          </h2>
          <p class="mx-auto mt-5 max-w-3xl text-[14px] text-white/90 font-semibold leading-[1.9] lg:text-[15px]">
            {{ tt('If these surrogate requirements match your situation, start a private application. We will review your information, explain next steps, and help you decide whether becoming a surrogate is the right path for you.', '如果这些代孕要求与你的情况匹配，就开始一次私密申请。我们会审核你的信息、说明后续步骤，并帮助你判断成为代孕妈妈是否适合你。') }}
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <NuxtLink
              :to="localePath('/be-surrogate')"
              class="inline-flex items-center justify-center rounded-[8px] bg-[var(--yunda-maple)] px-6 py-3 text-sm text-white font-bold transition hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(0,0,0,0.3)]"
            >
              {{ tt('Start My Private Application', '开始我的私密申请') }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/journey')"
              class="inline-flex items-center justify-center border border-white/70 rounded-[8px] px-6 py-3 text-sm text-white font-bold transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              {{ tt('Explore the Surrogate Journey', '了解代孕妈妈旅程') }}
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

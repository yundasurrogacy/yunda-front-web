<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import MessageModal from '@/components/base/MessageModal.vue'
import FormCheckbox from '@/components/form/FormCheckbox.vue'
import FormDatePicker from '@/components/form/FormDatePicker.vue'
import FormInput from '@/components/form/FormInput.vue'
import FormPhoneInput from '@/components/form/FormPhoneInput.vue'
import FormRadio from '@/components/form/FormRadio.vue'
import FormSelect from '@/components/form/FormSelect.vue'
import { useApi } from '~/composables/useApi'
import { getAllCountries, getPhoneCodeByCountry, getStatesByCountry } from '~/data/countries-states'
import { buildCoreServicePageSchemas, buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

const form = reactive({
  // 基本信息 - 保留用于fullLegalName合并
  lastName: '',
  firstName: '',

  // API字段
  accountId: 0,
  dateOfBirth: '',
  email: '',
  phoneNumber: '',
  countryCode: '+1',
  city: '',
  country: 'US',
  stateProvince: '',

  // 身份信息
  genderIdentity: '',
  genderSelfDescribe: '',
  pronouns: '',
  pronounsSelfDescribe: '',
  sexualOrientation: '',
  sexualOrientationSelfDescribe: '',

  // 种族 - 保留对象形式，提交时转换
  ethnicity: {
    asian: false,
    white: false,
    black: false,
    hispanic: false,
    middleEastern: false,
    nativeAmerican: false,
    pacificIslander: false,
    mixedRace: false,
    preferNotToSay: false,
    other: false,
    otherText: '',
  },
  ethnicitySelfDescribe: '', // 添加用于其他种族描述

  // 语言 - 保留对象形式，提交时转换
  languages: {
    english: false,
    mandarin: false,
    cantonese: false,
    spanish: false,
    french: false,
    korean: false,
    japanese: false,
    hindi: false,
    vietnamese: false,
    russian: false,
    arabic: false,
    portuguese: false,
    tagalog: false,
    german: false,
    italian: false,
    other: false,
    otherText: '',
  },
  otherLanguage: '', // 添加用于其他语言描述

  // 项目意向
  desiredChildrenCount: '',
  journeyStartTiming: '',
  programInterests: '',
  initialQuestions: '',

  // 胚胎与医疗情况
  hasEmbryos: '',
  embryoClinicName: '',
  embryoCount: '',
  pgtStatus: '',
  hasFertilityClinic: '',
  fertilityClinicName: '',

  // 联系来源
  referralSource: '',

  // 联系偏好
  preferredContactMethod: [] as string[], // Phone, Email, Others

  // 关系状态
  relationshipStatus: '',

  // 同意条款
  consentAgreement: false,
  consentTermsAndPrivacy: false, // 新增：同意 Terms of Service 和 Privacy Policy
  consentSMS: false,
})

const countries = computed(() => getAllCountries())

const states = computed(() => {
  return getStatesByCountry(form.country)
})

watch(() => form.country, (newCountry) => {
  form.stateProvince = ''

  const phoneCode = getPhoneCodeByCountry(newCountry)
  if (phoneCode) {
    form.countryCode = phoneCode
  }
})

const { submitParentApplication } = useApi()
const { t, locale } = useI18n()
const { $fbPixel } = useNuxtApp()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const router = useRouter()
const localePath = useLocalePath()

function tt(en: string, zh: string) {
  return locale.value === 'zh' ? zh : en
}

const heroProofPoints = computed(() => [
  tt('California-centered U.S. surrogacy agency', '以加州为核心的美国代孕机构'),
  tt('English / Mandarin bilingual support', '英文 / 中文双语支持'),
  tt('Legal, insurance, escrow, and IVF coordination', '法律、保险、托管与 IVF 协调'),
  tt('Support for international, LGBTQ+, and single intended parents', '支持国际、LGBTQ+ 与单身意向父母'),
])

const trustLogos = [
  { name: 'ASRM', logo: '/images/asrm-logo.svg' },
  { name: 'ART Risk', logo: '/images/ART-Risk-LOGO-NEW.webp' },
  { name: 'SeedTrust', logo: '/images/SeedTrust-Logo-Stacked.webp', class: 'scale-115' },
  { name: 'MHB', logo: '/images/mhb-logo-transparent.webp' },
  { name: 'RESOLVE', logo: '/images/resolve-logo.webp', class: 'scale-110' },
]

const intendedParentAudiences = computed(() => [
  {
    icon: 'lucide:flask-conical',
    title: tt('You already have embryos', '你已经有胚胎'),
    copy: tt(
      'We help coordinate surrogate matching, screening, legal steps, escrow setup, transfer planning, and pregnancy support with your IVF clinic.',
      '我们可协助与 IVF 诊所衔接代母匹配、筛查、法律步骤、托管账户、移植计划与孕期支持。',
    ),
  },
  {
    icon: 'lucide:building-2',
    title: tt('You are still choosing an IVF clinic', '你仍在选择 IVF 诊所'),
    copy: tt(
      'We can help you understand clinic coordination, donor egg options, embryo creation timelines, and what to prepare before matching.',
      '我们可以帮助你了解诊所协调、供卵选择、胚胎创建时间线，以及匹配前需要准备的事项。',
    ),
  },
  {
    icon: 'lucide:languages',
    title: tt('You are international or Chinese-speaking', '你是国际或中文家庭'),
    copy: tt(
      'Our bilingual team supports English and Mandarin communication and helps international intended parents understand the U.S. surrogacy process.',
      '我们的双语团队支持英文与中文沟通，帮助国际意向父母理解美国代孕流程。',
    ),
  },
  {
    icon: 'lucide:heart-handshake',
    title: tt('You are LGBTQ+ or a single intended parent', '你是 LGBTQ+ 或单身意向父母'),
    copy: tt(
      'We support inclusive family-building paths and help you understand donor coordination, parentage planning, and agency support.',
      '我们支持多元家庭路径，帮助你了解捐赠者协调、亲权规划与机构支持。',
    ),
  },
  {
    icon: 'lucide:search-check',
    title: tt('You are comparing surrogacy agencies', '你正在比较代孕机构'),
    copy: tt(
      'We help you compare timeline, cost, protection, communication, and what is included before you choose an agency.',
      '我们帮助你在选择机构前比较时间线、费用、保障、沟通方式与服务包含内容。',
    ),
  },
])

const afterApplySteps = computed(() => [
  {
    title: tt('Tell us where you are now', '告诉我们你目前在哪一步'),
    copy: tt(
      'Share your goals, timeline, family profile, embryo or clinic status, and early questions.',
      '分享你的目标、时间线、家庭情况、胚胎或诊所状态，以及早期问题。',
    ),
  },
  {
    title: tt('Receive a private team review', '获得团队私密评估'),
    copy: tt(
      'Our team reviews your information and identifies the most relevant next steps for your surrogacy journey.',
      '我们的团队会审阅你的信息，并梳理与你的代孕旅程最相关的下一步。',
    ),
  },
  {
    title: tt('Get personalized guidance', '获得个性化指导'),
    copy: tt(
      'We follow up with a personalized information package and, if helpful, a private consultation. No pressure and no commitment.',
      '我们会发送个性化资料包；如适合，也可安排私密咨询。无压力，无承诺。',
    ),
  },
])

const protectionPillars = computed(() => [
  {
    icon: 'lucide:users',
    title: tt('Surrogate matching', '代母匹配'),
    copy: tt(
      'We help align preferences, expectations, readiness, and communication style so the match starts with clarity.',
      '我们帮助协调偏好、期待、准备度与沟通方式，让匹配从清晰开始。',
    ),
  },
  {
    icon: 'lucide:receipt-text',
    title: tt('Cost planning', '费用规划'),
    copy: tt(
      'We explain agency services, surrogate compensation, IVF clinic costs, legal fees, insurance needs, escrow, and case-dependent expenses.',
      '我们说明机构服务、代母补偿、IVF 诊所费用、法律费用、保险需求、托管与个案相关费用。',
    ),
  },
  {
    icon: 'lucide:scale',
    title: tt('Legal coordination', '法律协调'),
    copy: tt(
      'We coordinate with qualified legal professionals around contracts, parentage planning, and key timing milestones.',
      '我们与合格法律专业人士协调合同、亲权规划与关键时间节点。',
    ),
  },
  {
    icon: 'lucide:shield-check',
    title: tt('Insurance review', '保险审查'),
    copy: tt(
      'We help review pregnancy coverage, newborn insurance planning, and the insurance questions that can affect total cost.',
      '我们协助审查孕期保险、新生儿保险规划，以及可能影响总费用的保险问题。',
    ),
  },
  {
    icon: 'lucide:landmark',
    title: tt('Escrow and trust account support', '托管与信托账户支持'),
    copy: tt(
      'Milestone-based fund management helps keep payments organized, documented, and easier to understand.',
      '基于里程碑的资金管理让付款更有序、更可记录，也更易理解。',
    ),
  },
  {
    icon: 'lucide:clipboard-check',
    title: tt('IVF clinic coordination', 'IVF 诊所协调'),
    copy: tt(
      'We support communication around embryo status, donor egg needs, transfer timing, clinic requirements, and pregnancy updates.',
      '我们支持围绕胚胎状态、供卵需求、移植时间、诊所要求与孕期更新的沟通。',
    ),
  },
])

const parentTestimonials = computed(() => [
  {
    quote: tt(
      'We felt genuinely supported at every step. The team was transparent, kind, and professional.',
      '从每一步中，我们都感受到真诚支持。团队透明、温暖且专业。',
    ),
    author: tt('Intended Parent', '意向父母'),
  },
  {
    quote: tt(
      'Clear communication, strong coordination with clinic and legal partners, and true care for both surrogates and parents.',
      '清晰沟通、与诊所及法律伙伴的强协调，以及对代母和父母双方真正的关怀。',
    ),
    author: tt('Growing Family', '成长中的家庭'),
  },
])

const landingFaqItems = computed(() => [
  {
    question: tt('Do I need embryos before applying?', '申请前必须已经有胚胎吗？'),
    answer: tt(
      'No. Intended parents can contact Yunda before or after embryos are created. Some families already have embryos, while others are still choosing an IVF clinic, considering donor eggs, or comparing timelines. The application helps us understand your current stage and recommend the next practical step.',
      '不必须。准父母可以在已有胚胎前或已有胚胎后联系孕达。有些家庭已经有胚胎，有些仍在选择 IVF 诊所、考虑供卵或比较时间线。申请表帮助我们了解你当前阶段，并建议下一步。',
    ),
  },
  {
    question: tt('Can I apply if I am still choosing an IVF clinic?', '如果我还在选择 IVF 诊所，可以申请吗？'),
    answer: tt(
      'Yes. You can apply while you are still choosing an IVF clinic. Yunda can help you understand how clinic selection, embryo creation, donor egg options, transfer planning, legal timing, and surrogate matching fit together before you commit to a full journey.',
      '可以。即使你仍在选择 IVF 诊所，也可以先提交申请。孕达可以帮助你理解诊所选择、胚胎创建、供卵选择、移植计划、法律时间节点和代母匹配如何衔接。',
    ),
  },
  {
    question: tt('How much does surrogacy usually cost?', '代孕通常需要多少钱？'),
    answer: tt(
      'Surrogacy cost depends on IVF clinic fees, embryo status, surrogate compensation, legal work, insurance review, escrow, and pregnancy-related expenses. Yunda helps intended parents compare cost categories and scope clearly, because a low headline number may not include the same services.',
      '代孕费用取决于 IVF 诊所费用、胚胎状态、代母补偿、法律工作、保险审查、托管和孕期相关费用。孕达帮助准父母清晰比较费用类别和服务范围，因为较低的总价不一定包含同样内容。',
    ),
  },
  {
    question: tt('What happens after I submit the application?', '提交申请后会发生什么？'),
    answer: tt(
      'After you submit the application, Yunda reviews your information privately, identifies your current stage, and follows up with relevant guidance. If your situation is a fit for a consultation, the team may share a personalized information package and invite you to discuss next steps.',
      '提交申请后，孕达会私密审阅你的信息，判断你当前所处阶段，并提供相关指导。如果适合进一步咨询，团队可能会发送个性化资料包，并邀请你沟通下一步。',
    ),
  },
  {
    question: tt('Will I be pressured to sign with Yunda?', '提交后会被催促签约吗？'),
    answer: tt(
      'No. Submitting the intended parent application is not a contract and does not create an obligation. It starts a private review so you can understand your options, questions, likely timeline, and cost planning before making any commitment.',
      '不会。提交准父母申请不是合同，也不会形成义务。它只是开启私密评估，帮助你在承诺前了解选择、问题、可能时间线和费用规划。',
    ),
  },
  {
    question: tt('Do you support international or Chinese-speaking intended parents?', '你们支持国际或中文意向父母吗？'),
    answer: tt(
      'Yes. Yunda supports international and Chinese-speaking intended parents with English and Mandarin communication, U.S. clinic coordination, timeline planning, travel-related context, and help understanding legal, insurance, escrow, and newborn-document steps.',
      '支持。孕达为国际和中文准父母提供英文与中文沟通、美国诊所协调、时间线规划、旅行相关说明，并帮助理解法律、保险、托管和新生儿文件步骤。',
    ),
  },
  {
    question: tt('Do you support LGBTQ+ couples and single parents?', '你们支持 LGBTQ+ 伴侣和单身父母吗？'),
    answer: tt(
      'Yes. Yunda supports LGBTQ+ couples, single intended parents, and families with different paths to parenthood. Depending on your situation, coordination may include donor egg or donor sperm planning, IVF clinic communication, surrogate matching, and parentage planning with legal professionals.',
      '支持。孕达支持 LGBTQ+ 伴侣、单身准父母以及不同家庭路径。根据你的情况，协调内容可能包括供卵或供精规划、IVF 诊所沟通、代母匹配，以及由法律专业人士参与的亲权规划。',
    ),
  },
  {
    question: tt('How are legal, insurance, and escrow steps handled?', '法律、保险和托管步骤如何处理？'),
    answer: tt(
      'Yunda coordinates around legal, insurance, escrow, and fertility steps so intended parents understand timing and responsibilities. Licensed professionals handle legal, medical, insurance, and escrow decisions; Yunda helps keep communication, documents, and milestones organized.',
      '孕达围绕法律、保险、托管和生育环节进行协调，帮助准父母理解时间节点与责任。法律、医疗、保险和托管决定由相应持证专业人士处理；孕达帮助沟通、文件和里程碑保持有序。',
    ),
  },
])

const parentHowToSteps = computed(() => [
  {
    title: t('parent.application.sections.basicInfo'),
    text: t('parent.application.welcome.message1'),
  },
  {
    title: t('parent.application.sections.familyProfile'),
    text: t('parent.application.welcome.message2'),
  },
  {
    title: t('parent.application.sections.programInterests'),
    text: t('parent.application.welcome.scrollPrompt'),
  },
  {
    title: t('parent.application.sections.consent'),
    text: t('parent.application.form.consentAgreement.label'),
  },
])

const parentFaqItems = computed(() => [
  ...landingFaqItems.value,
])

const parentHowToSchema = computed(() => buildHowToSchema({
  name: t('parent.application.pageTitle'),
  description: t('parent.application.welcome.message1'),
  steps: parentHowToSteps.value,
  baseUrl: siteUrl.value || undefined,
  url: '/be-parents',
  locale: locale.value,
}))

const parentFaqSchema = computed(() => buildFAQPageSchema({
  name: `${t('parent.application.pageTitle')} FAQ`,
  description: t('parent.application.welcome.message2'),
  faqs: parentFaqItems.value,
  baseUrl: siteUrl.value || undefined,
  url: '/be-parents',
  locale: locale.value,
}))

const parentCoreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: '/be-parents',
  name: tt('Surrogacy for Intended Parents', '准父母代孕服务'),
  description: tt(
    'Private surrogacy guidance for intended parents, including matching, IVF clinic coordination, legal steps, insurance review, escrow, and bilingual care.',
    '为准父母提供私密代孕指导，包括匹配、IVF 诊所协调、法律步骤、保险审查、托管和双语支持。',
  ),
  about: tt('Intended parent surrogacy application and private consultation pathway', '准父母代孕申请与私密咨询路径'),
  audience: [
    tt('Intended parents', '准父母'),
    tt('International intended parents', '国际准父母'),
    tt('LGBTQ+ intended parents', 'LGBTQ+ 准父母'),
    tt('Single intended parents', '单身准父母'),
  ],
  service: {
    name: tt('Intended Parent Surrogacy Program', '准父母代孕项目'),
    description: tt(
      'Yunda supports intended parents with surrogate matching, IVF clinic coordination, cost planning, legal coordination, insurance review, escrow support, and case management.',
      '孕达为准父母提供代母匹配、IVF 诊所协调、费用规划、法律协调、保险审查、托管支持和个案管理。',
    ),
    serviceType: tt('Intended parent surrogacy services', '准父母代孕服务'),
    areaServed: ['California', 'United States', 'International intended parents'],
  },
  breadcrumbs: [
    { name: tt('Home', '首页'), url: '/' },
    { name: tt('For Intended Parents', '准父母指南'), url: '/intended-parents' },
    { name: tt('Become a Parent', '成为父母'), url: '/be-parents' },
  ],
  locale: locale.value,
}))

useHead(() => {
  const scripts = []
  parentCoreServicePageSchemas.value.forEach((schema, index) => {
    scripts.push({
      key: `schema-parent-core-${index}`,
      type: 'application/ld+json',
      children: JSON.stringify(schema),
    })
  })
  if (parentHowToSchema.value) {
    scripts.push({
      key: 'schema-parent-howto',
      type: 'application/ld+json',
      children: JSON.stringify(parentHowToSchema.value),
    })
  }
  if (parentFaqSchema.value) {
    scripts.push({
      key: 'schema-parent-faq',
      type: 'application/ld+json',
      children: JSON.stringify(parentFaqSchema.value),
    })
  }
  return {
    title: tt(
      'Surrogacy for Intended Parents | Private Guidance from Yunda',
      '准父母代孕申请 | 孕达代孕',
    ),
    meta: [
      {
        name: 'description',
        content: tt(
          'Start your surrogacy journey with private guidance from Yunda: matching, IVF clinic coordination, legal steps, insurance, escrow, and bilingual care.',
          '通过孕达代孕开启你的代孕旅程。我们为准父母提供匹配、IVF 诊所协调、法律步骤、保险审查、托管和双语支持。',
        ),
      },
    ],
    ...(scripts.length ? { script: scripts } : {}),
  }
})

// Modal state
const showModal = ref(false)
const modalConfig = reactive({
  type: 'success' as 'success' | 'error',
  title: '',
  message: '' as string | string[],
  buttonText: t('parent.application.form.submitButton'),
})
const isSubmitting = ref(false)
const hasTriedSubmit = ref(false)
const pendingSuccessRedirect = ref<null | { path: string, query: Record<string, string> }>(null)

function hasValue(value: string) {
  return value.trim().length > 0
}

function isValidEmail(value: string) {
  const email = value.trim()
  if (!email || email.includes(' ')) {
    return false
  }

  const parts = email.split('@')
  if (parts.length !== 2) {
    return false
  }

  const [local, domain] = parts
  if (!local || !domain || domain.startsWith('.') || domain.endsWith('.')) {
    return false
  }

  return domain.includes('.')
}

const hasSelectedLanguage = computed(() =>
  Object.entries(form.languages).some(([key, value]) => key !== 'otherText' && value === true),
)

const requiredFieldErrors = computed(() => {
  const isStateRequired = states.value.length > 0
  const errors: string[] = []

  if (!hasValue(form.firstName))
    errors.push(t('parent.application.form.firstName'))
  if (!hasValue(form.lastName))
    errors.push(t('parent.application.form.lastName'))
  if (!hasValue(form.dateOfBirth))
    errors.push(t('parent.application.form.dateOfBirth'))
  if (!hasValue(form.phoneNumber))
    errors.push(t('parent.application.form.cellPhone'))
  if (!hasValue(form.email))
    errors.push(t('parent.application.form.email'))
  else if (!isValidEmail(form.email.trim()))
    errors.push(locale.value === 'zh' ? '邮箱格式不正确' : 'Email format is invalid')
  if (!hasValue(form.genderIdentity))
    errors.push(t('parent.application.form.genderIdentity.label'))
  if (!hasSelectedLanguage.value)
    errors.push(t('parent.application.form.languages.label'))
  if (!hasValue(form.sexualOrientation))
    errors.push(t('parent.application.form.sexualOrientation.label'))
  if (!hasValue(form.city))
    errors.push(t('parent.application.form.city'))
  if (!hasValue(form.country))
    errors.push(t('parent.application.form.country'))
  if (isStateRequired && !hasValue(form.stateProvince))
    errors.push(t('parent.application.form.stateProvince'))
  if (!hasValue(form.programInterests))
    errors.push(t('parent.application.form.services.question'))
  if (!hasValue(form.journeyStartTiming))
    errors.push(t('parent.application.form.timing.question'))
  if (!hasValue(form.desiredChildrenCount))
    errors.push(t('parent.application.form.childrenCount.question'))
  if (!form.consentTermsAndPrivacy)
    errors.push(t('parent.application.form.consentTermsAndPrivacy.label'))
  if (!form.consentAgreement)
    errors.push(t('parent.application.form.consentAgreement.label'))

  return errors
})

const isFormReadyToSubmit = computed(() => requiredFieldErrors.value.length === 0)

function openSuccessModal(queryParams: Record<string, string>) {
  modalConfig.type = 'success'
  modalConfig.title = t('modal.success.parent.title')
  modalConfig.message = t('modal.success.parent.message')
  modalConfig.buttonText = 'Finish'
  pendingSuccessRedirect.value = {
    path: localePath('/be-parents/thanks'),
    query: queryParams,
  }
  showModal.value = true
}

async function handleModalClose() {
  if (modalConfig.type !== 'success' || !pendingSuccessRedirect.value) {
    return
  }

  const next = pendingSuccessRedirect.value
  pendingSuccessRedirect.value = null
  await router.push(next)
}

async function handleSubmit() {
  if (isSubmitting.value)
    return
  hasTriedSubmit.value = true
  if (!isFormReadyToSubmit.value) {
    modalConfig.type = 'error'
    modalConfig.title = t('modal.error.title')
    modalConfig.message = requiredFieldErrors.value.length > 0
      ? requiredFieldErrors.value
      : (locale.value === 'zh' ? '请先填写所有带 * 的必填项后再提交。' : 'Please complete all required fields (*) before submitting.')
    modalConfig.buttonText = t('modal.error.ok')
    showModal.value = true
    return
  }
  isSubmitting.value = true
  try {
  // Validate consent agreements
    if (!form.consentAgreement) {
      modalConfig.type = 'error'
      modalConfig.title = t('modal.error.consentRequired.title')
      modalConfig.message = t('modal.error.consentRequired.message')
      modalConfig.buttonText = t('modal.error.ok')
      showModal.value = true
      return
    }

    if (!form.consentTermsAndPrivacy) {
      modalConfig.type = 'error'
      modalConfig.title = t('modal.error.consentRequired.title')
      modalConfig.message = t('modal.error.termsAndPrivacyRequired.message')
      modalConfig.buttonText = t('modal.error.ok')
      showModal.value = true
      return
    }

    // 转换种族数据
    const ethnicities: string[] = []
    const ethnicityMap: Record<string, string> = {
      asian: 'ASIAN',
      white: 'WHITE',
      black: 'BLACK',
      hispanic: 'HISPANIC',
      middleEastern: 'MIDDLE_EASTERN',
      nativeAmerican: 'NATIVE_AMERICAN',
      pacificIslander: 'PACIFIC_ISLANDER',
      mixedRace: 'MIXED_RACE',
      preferNotToSay: 'PREFER_NOT_TO_SAY',
      other: 'OTHER',
    }

    Object.entries(form.ethnicity).forEach(([key, value]) => {
      if (value && key !== 'otherText' && ethnicityMap[key]) {
        ethnicities.push(ethnicityMap[key])
      }
    })

    // 转换语言数据
    const languages: string[] = []
    const languageMap: Record<string, string> = {
      english: 'ENGLISH',
      mandarin: 'MANDARIN',
      cantonese: 'CANTONESE',
      spanish: 'SPANISH',
      french: 'FRENCH',
      korean: 'KOREAN',
      japanese: 'JAPANESE',
      hindi: 'HINDI',
      vietnamese: 'VIETNAMESE',
      russian: 'RUSSIAN',
      arabic: 'ARABIC',
      portuguese: 'PORTUGUESE',
      tagalog: 'TAGALOG',
      german: 'GERMAN',
      italian: 'ITALIAN',
      other: 'OTHER',
    }

    Object.entries(form.languages).forEach(([key, value]) => {
      if (value && key !== 'otherText' && languageMap[key]) {
        languages.push(languageMap[key])
      }
    })

    // 构建最新 GraphQL 类型结构的 API 请求数据
    // 枚举类型转换
    const { Pronouns, GenderIdentity, Ethnicity, PrimaryLanguage, SexualOrientation, ProgramInterest, JourneyStartTiming, DesiredChildrenCount } = await import('~/types/api')

    const applicationData = {
      basic_information: {
        firstName: form.firstName,
        lastName: form.lastName,
        pronouns: form.pronouns,
        pronouns_selected_key: Pronouns[form.pronouns as keyof typeof Pronouns],
        gender_identity: form.genderIdentity,
        gender_identity_selected_key: GenderIdentity[form.genderIdentity as keyof typeof GenderIdentity],
        date_of_birth: form.dateOfBirth,
        ethnicity: ethnicities.join(','),
        ethnicity_selected_key: Ethnicity[ethnicities[0] as keyof typeof Ethnicity] || Ethnicity.OTHER,
      },
      contact_information: {
        cell_phone_country_code: form.countryCode,
        cell_phone: form.phoneNumber,
        is_agree_cell_phone_receive_messages: form.consentSMS,
        email_address: form.email,
        primary_languages: languages,
        primary_languages_selected_keys: languages.map(l => PrimaryLanguage[l as keyof typeof PrimaryLanguage]),
        preferred_contact_method: form.preferredContactMethod.join(','),
      },
      family_profile: {
        sexual_orientation: form.sexualOrientation,
        sexual_orientation_selected_key: SexualOrientation[form.sexualOrientation as keyof typeof SexualOrientation],
        relationship_status: form.relationshipStatus,
        city: form.city,
        country: form.country,
        country_selected_key: form.country,
        state_or_province: form.stateProvince,
        state_or_province_selected_key: form.stateProvince,
      },
      program_interests: {
        interested_services: form.programInterests,
        interested_services_selected_keys: ProgramInterest[form.programInterests as keyof typeof ProgramInterest],
        journey_start_timing: form.journeyStartTiming,
        journey_start_timing_selected_key: JourneyStartTiming[form.journeyStartTiming as keyof typeof JourneyStartTiming],
        desired_children_count: form.desiredChildrenCount,
        desired_children_count_selected_key: DesiredChildrenCount[form.desiredChildrenCount as keyof typeof DesiredChildrenCount],
      },
      embryo_medical_status: {
        has_embryos: form.hasEmbryos,
        embryo_clinic_name: form.embryoClinicName,
        embryo_count: form.embryoCount,
        pgt_status: form.pgtStatus,
        has_fertility_clinic: form.hasFertilityClinic,
        fertility_clinic_name: form.fertilityClinicName,
      },
      referral: {
        referral_source: form.referralSource,
        initial_questions: form.initialQuestions,
      },
    }

    const response = await submitParentApplication({
      application_type: 'intended_parent',
      application_data: applicationData,
    })

    // 只有在 API 真正成功时才追踪 Facebook Pixel CompleteRegistration 事件
    // 使用独立的 try-catch 确保追踪失败不影响主流程
    if (response && response.data?.id) {
      if ($fbPixel?.trackSubmitApplication) {
        try {
          await $fbPixel.trackSubmitApplication({
            content_name: 'Intended Parent Application',
            content_category: 'Application Form',
            content_ids: [String(response.data.id)],
            value: 0,
            currency: 'USD',
            status: true,
            // 自定义数据
            applicationId: String(response.data.id),
            applicationType: 'intended_parent',
          })
        }
        catch (trackingError) {
          // 静默处理追踪错误，不影响用户体验
          console.warn('Facebook Pixel tracking failed:', trackingError)
        }
      }
    }

    // 跳转到 Thank-you 页面，传递用户信息用于预填预约表单
    const fullName = `${form.firstName} ${form.lastName}`.trim()
    const queryParams: Record<string, string> = {}
    if (fullName) {
      queryParams.name = fullName
    }
    if (form.email) {
      queryParams.email = form.email
    }

    openSuccessModal(queryParams)
  }
  catch (error: any) {
    console.error('Submission error:', error)

    // Handle error response
    modalConfig.type = 'error'
    modalConfig.title = t('modal.error.title')

    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
      // Handle validation errors
      const errorMessages = error.response.data.errors.map((err: any) =>
        err.field ? `${err.field}: ${err.message}` : err.message,
      )
      modalConfig.message = errorMessages
    }
    else if (error.response?.data?.message) {
      // Handle general error message
      modalConfig.message = error.response.data.message
    }
    else if (error.message) {
      // Handle network or other errors
      modalConfig.message = error.message
    }
    else {
      // Fallback error message
      modalConfig.message = t('modal.error.unexpectedError')
    }

    modalConfig.buttonText = t('modal.error.tryAgain')
    showModal.value = true
  }
  finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-[var(--yunda-petal)]">
    <AppHeader />

    <!-- Hero -->
    <section class="relative w-full max-w-full overflow-hidden bg-[var(--yunda-bark)]">
      <div class="absolute inset-0 opacity-24" aria-hidden="true">
        <img
          src="/images/ip/gynecologist-offering-couple.jpg"
          :alt="tt('Private surrogacy guidance for intended parents', '为准父母提供私密代孕指导')"
          class="h-full w-full object-cover object-center"
          width="1600"
          height="1067"
          fetchpriority="high"
        >
      </div>
      <div class="absolute inset-0 bg-[linear-gradient(90deg,rgba(61,42,31,0.95),rgba(61,42,31,0.82),rgba(61,42,31,0.54))]" aria-hidden="true" />

      <div class="relative mx-auto grid min-h-[calc(100svh-72px)] w-full max-w-320 min-w-0 place-items-center gap-10 overflow-hidden px-6 py-12 md:px-10 lg:min-h-[620px] lg:grid-cols-[1.08fr_0.92fr] lg:px-12 lg:py-24">
        <div class="parent-hero-copy mx-auto w-full max-w-[34rem] min-w-0 overflow-hidden text-center lg:mx-0 lg:max-w-full lg:text-left">
          <h1 class="w-full font-display text-[36px] text-[var(--yunda-petal)] font-semibold leading-[1.08] sm:max-w-4xl sm:text-[42px] md:text-[60px] lg:text-[72px]">
            {{ tt('Start Your Surrogacy Journey With Clear, Private Guidance', '用清晰、私密的指导开启你的代孕旅程') }}
          </h1>
          <p class="mt-6 w-full max-w-full break-words text-[18px] text-[var(--yunda-petal)]/92 leading-[1.75] lg:max-w-3xl md:text-[20px]">
            {{ tt('Yunda Surrogacy helps intended parents plan a gestational surrogacy journey with coordinated support for matching, IVF clinics, legal steps, insurance review, escrow, and ongoing case management.', '孕达代孕帮助准父母规划妊娠代孕旅程，协调匹配、IVF 诊所、法律步骤、保险审查、托管账户和全程个案管理。') }}
          </p>
          <p class="mt-4 w-full max-w-full break-words text-base text-[var(--yunda-petal)]/82 leading-[1.7] lg:max-w-3xl md:text-[17px]">
            {{ tt('Whether you are in the U.S. or abroad, already have embryos, are still choosing a clinic, or need egg donor guidance, our team helps you understand the next step before you commit.', '无论你在美国或海外、已经有胚胎、仍在选择诊所，或需要供卵路径指导，我们都会帮助你在承诺前先理解下一步。') }}
          </p>

          <div class="mt-8 flex w-full max-w-full min-w-0 flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a href="#application-form" class="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-2.5 bg-[var(--yunda-petal)] px-5 py-4 text-center text-[var(--yunda-bark)] font-bold shadow-[0_14px_34px_rgba(0,0,0,0.22)] transition-opacity sm:w-auto sm:px-6 hover:opacity-90">
              <span class="min-w-0 break-words">{{ tt('Get My Personalized Surrogacy Plan', '获取我的个性化代孕方案') }}</span>
              <Icon name="lucide:arrow-right" class="h-5 w-5" />
            </a>
            <NuxtLink :to="localePath('/surrogacy-cost')" class="inline-flex w-full min-w-0 items-center justify-center gap-2 rounded-2.5 border border-[var(--yunda-petal)]/55 px-5 py-4 text-center text-[var(--yunda-petal)] font-bold transition-colors sm:w-auto sm:px-6 hover:bg-[var(--yunda-petal)]/10">
              <span class="min-w-0 break-words">{{ tt('Review Surrogacy Costs', '先了解代孕费用') }}</span>
              <Icon name="lucide:receipt-text" class="h-5 w-5" />
            </NuxtLink>
          </div>
          <p class="mt-5 text-sm text-[var(--yunda-petal)]/78">
            {{ tt('Private review within 24-48 hours. No pressure. No commitment.', '24-48 小时内私密评估。无压力，无承诺。') }}
          </p>
        </div>

        <aside class="parent-hero-card w-[calc(100vw-96px)] max-w-[calc(100vw-96px)] min-w-0 rounded-3 border border-[var(--yunda-bark)]/10 bg-[rgba(255,248,235,0.92)] p-5 text-[var(--yunda-bark)] shadow-[0_20px_50px_rgba(0,0,0,0.18)] backdrop-blur-md sm:w-full sm:max-w-full md:p-7">
          <p class="mb-5 text-sm text-[var(--yunda-bark)]/68 font-semibold uppercase">
            {{ tt('What Yunda helps coordinate', '孕达协助协调') }}
          </p>
          <ul class="space-y-4">
            <li v-for="point in heroProofPoints" :key="point" class="flex min-w-0 items-start gap-3 break-words text-[var(--yunda-bark)] leading-[1.55]">
              <Icon name="lucide:check-circle-2" class="mt-0.5 h-5 w-5 shrink-0 text-[var(--yunda-maple)]" />
              <span class="min-w-0">{{ point }}</span>
            </li>
          </ul>
        </aside>
      </div>
    </section>

    <SeoTrustNote
      :updated="tt('Last updated: June 22, 2026', '最后更新：2026年6月22日')"
      :reviewed-by="tt('Reviewed by Yunda Surrogacy team', '孕达代孕团队审阅')"
      :note="tt('This page explains Yunda coordination services for intended parents. Medical, legal, insurance, and escrow decisions should be reviewed with the relevant licensed professionals before commitment.', '本页说明孕达为准父母提供的协调服务。医疗、法律、保险与托管决定应在承诺前由相应持证专业人士审阅。')"
      :sources="[
        { label: tt('Surrogacy cost guide', '代孕费用指南'), href: localePath('/surrogacy-cost') },
        { label: tt('Surrogacy process', '代孕流程'), href: localePath('/surrogacy-process') },
        { label: tt('California protection guide', '加州代孕保护指南'), href: localePath('/surrogacy-protection-california') },
      ]"
    />

    <!-- Trust Bar -->
    <section class="bg-[color-mix(in_srgb,var(--yunda-sky)_26%,var(--yunda-petal))] px-5 py-10">
      <div class="mx-auto max-w-320">
        <p class="mx-auto max-w-4xl break-words text-center text-sm text-[var(--yunda-bark)]/72 font-semibold uppercase tracking-[0.08em]">
          {{ tt('Trusted coordination across fertility, legal, insurance, and escrow partners', '在生殖、法律、保险与托管环节提供可信协调') }}
        </p>
        <div class="mt-7 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          <div v-for="partner in trustLogos" :key="partner.name" class="h-14 flex items-center justify-center md:h-18">
            <img :src="partner.logo" :alt="partner.name" class="max-h-full w-auto object-contain" :class="partner.class" loading="lazy">
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content -->
    <div class="relative mx-auto max-w-320 px-4 lg:px-8">
      <!-- Problem -->
      <section class="grid gap-10 py-16 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:py-22">
        <div>
          <p class="mb-4 text-sm text-[var(--yunda-maple)] font-bold uppercase tracking-[0.08em]">
            {{ tt('Private intended parent guidance', '准父母私密指导') }}
          </p>
          <h2 class="font-display text-[34px] text-[var(--yunda-bark)] font-medium leading-[1.12] md:text-[48px]">
            {{ tt('Surrogacy Should Not Feel Like a Maze', '代孕不应该像一座迷宫') }}
          </h2>
          <p class="mt-5 text-[17px] text-[var(--yunda-bark)] leading-[1.75]">
            {{ tt('A clear intended parent journey should explain matching, IVF coordination, legal timing, insurance review, escrow, cost planning, and case management before you commit.', '清晰的准父母代孕旅程应在承诺前说明匹配、IVF 协调、法律时间、保险审查、托管、费用规划和个案管理。') }}
          </p>
        </div>
        <div class="space-y-5 text-[17px] text-[var(--yunda-bark)] leading-[1.8]">
          <p>
            {{ tt('For intended parents, surrogacy can feel overwhelming before it even begins. You may be comparing agencies, reviewing IVF options, trying to understand legal parentage, estimating costs, or wondering how surrogate matching works.', '对准父母来说，代孕在真正开始前就可能令人不知所措。你可能正在比较机构、评估 IVF 选择、理解法律亲权、估算费用，或想知道代母匹配如何进行。') }}
          </p>
          <p>
            {{ tt('You should not have to coordinate every clinic, legal, insurance, escrow, and timeline detail alone. Yunda helps bring those moving parts into one clear path, so you can make decisions with more confidence and fewer surprises.', '你不应该独自协调诊所、法律、保险、托管和时间线的每个细节。孕达帮助把这些复杂环节纳入清晰路径，让你更有信心地做决定，并减少意外。') }}
          </p>
        </div>
      </section>

      <!-- Audience Fit -->
      <section class="py-6 lg:py-10">
        <div class="mb-9 max-w-3xl">
          <h2 class="font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:text-[44px]">
            {{ tt('Wherever You Are in the Journey, We Can Help You Understand the Next Step', '无论你处在哪个阶段，我们都能帮你看清下一步') }}
          </h2>
          <p class="mt-5 text-[17px] text-[var(--yunda-bark)] leading-[1.75]">
            {{ tt('You do not need to have every answer before reaching out. The application helps us understand where you are now, what matters most, and what kind of support would be useful.', '联系前你不需要已经有所有答案。申请表会帮助我们了解你目前的阶段、最在意的问题，以及你需要什么支持。') }}
          </p>
        </div>
        <div class="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          <article v-for="item in intendedParentAudiences" :key="item.title" class="rounded-2 border border-[var(--yunda-bark)]/10 bg-white/68 p-5 shadow-[0_10px_26px_rgba(60,36,21,0.07)]">
            <Icon :name="item.icon" class="mb-4 h-7 w-7 text-[var(--yunda-maple)]" />
            <h3 class="text-[18px] text-[var(--yunda-bark)] font-bold leading-[1.25]">
              {{ item.title }}
            </h3>
            <p class="mt-3 text-sm text-[var(--yunda-bark)]/78 leading-[1.65]">
              {{ item.copy }}
            </p>
          </article>
        </div>
      </section>

      <!-- After Apply -->
      <section class="py-16 lg:py-20">
        <div class="rounded-3 bg-[var(--yunda-bark)] px-5 py-10 md:px-8 lg:px-12">
          <div class="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p class="mb-4 text-sm text-[var(--yunda-gold)] font-bold uppercase tracking-[0.08em]">
                {{ tt('No pressure next step', '无压力的下一步') }}
              </p>
              <h2 class="font-display text-[32px] text-[var(--yunda-petal)] font-medium leading-[1.15] md:text-[44px]">
                {{ tt('What Happens After You Submit the Application', '提交申请后会发生什么') }}
              </h2>
              <p class="mt-5 text-[var(--yunda-petal)]/82 leading-[1.75]">
                {{ tt('This application is not a contract. It gives our team enough context to guide you responsibly and prepare information that fits your situation.', '这份申请不是合同。它只是让我们的团队有足够背景，以负责任的方式为你准备适合你情况的信息。') }}
              </p>
            </div>
            <div class="grid gap-4">
              <article v-for="(step, index) in afterApplySteps" :key="step.title" class="flex gap-4 rounded-2 bg-[rgba(255,248,235,0.94)] p-5 text-[var(--yunda-bark)] shadow-[0_12px_28px_rgba(0,0,0,0.12)] ring-1 ring-[var(--yunda-petal)]/35">
                <span class="h-9 w-9 shrink-0 flex items-center justify-center rounded-full bg-[var(--yunda-bark)] text-[var(--yunda-petal)] font-bold">{{ index + 1 }}</span>
                <div>
                  <h3 class="text-[var(--yunda-bark)] font-bold">
                    {{ step.title }}
                  </h3>
                  <p class="mt-2 text-sm text-[var(--yunda-bark)]/78 leading-[1.65]">
                    {{ step.copy }}
                  </p>
                </div>
              </article>
            </div>
          </div>
          <div class="mt-8">
            <a href="#application-form" class="inline-flex items-center justify-center gap-2 rounded-2.5 bg-[var(--yunda-petal)] px-6 py-4 text-[var(--yunda-bark)] font-bold transition-opacity hover:opacity-90">
              {{ tt('Get My Personalized Surrogacy Plan', '获取我的个性化代孕方案') }}
              <Icon name="lucide:arrow-right" class="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      <!-- Protection -->
      <section class="py-8 lg:py-14">
        <div class="mx-auto max-w-4xl text-center">
          <h2 class="font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:text-[44px]">
            {{ tt('A Surrogacy Journey Needs More Than Matching', '代孕旅程需要的不只是匹配') }}
          </h2>
          <p class="mt-5 text-[17px] text-[var(--yunda-bark)] leading-[1.75]">
            {{ tt('Yunda supports intended parents across the practical, financial, legal, medical, and emotional details that shape a safer journey.', '孕达在实际操作、费用、法律、医疗和情绪支持等关键细节中陪伴准父母，让旅程更清晰、更有保护。') }}
          </p>
        </div>
        <div class="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <article v-for="pillar in protectionPillars" :key="pillar.title" class="rounded-2 border border-[var(--yunda-bark)]/10 bg-[color-mix(in_srgb,var(--yunda-gold)_11%,white)] p-6">
            <Icon :name="pillar.icon" class="mb-4 h-7 w-7 text-[var(--yunda-maple)]" />
            <h3 class="text-[19px] text-[var(--yunda-bark)] font-bold">
              {{ pillar.title }}
            </h3>
            <p class="mt-3 text-sm text-[var(--yunda-bark)]/78 leading-[1.65]">
              {{ pillar.copy }}
            </p>
          </article>
        </div>
      </section>

      <!-- Cost and Timeline -->
      <section class="grid gap-6 py-14 lg:grid-cols-2 lg:py-20">
        <article class="rounded-3 bg-[color-mix(in_srgb,var(--yunda-sky)_34%,white)] p-6 md:p-8">
          <Icon name="lucide:receipt-text" class="mb-5 h-8 w-8 text-[var(--yunda-maple)]" />
          <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:text-[38px]">
            {{ tt('Understand the Cost Before You Commit', '承诺前，先理解费用') }}
          </h2>
          <p class="mt-5 text-[var(--yunda-bark)] leading-[1.75]">
            {{ tt('Surrogacy cost depends on your embryo status, IVF clinic, surrogate match, legal path, insurance needs, escrow, and pregnancy-related expenses. Yunda helps you separate fixed costs from case-dependent costs and ask better questions before you move forward.', '代孕费用取决于胚胎状态、IVF 诊所、代母匹配、法律路径、保险需求、托管与孕期相关费用。孕达帮助你区分固定费用和个案相关费用，并在推进前提出更清晰的问题。') }}
          </p>
          <NuxtLink :to="localePath('/surrogacy-cost')" class="mt-6 inline-flex items-center gap-2 text-[var(--yunda-bark)] font-bold underline-offset-4 hover:underline">
            {{ tt('Review Surrogacy Cost Breakdown', '查看代孕费用拆解') }}
            <Icon name="lucide:arrow-right" class="h-5 w-5" />
          </NuxtLink>
        </article>

        <article class="rounded-3 bg-[color-mix(in_srgb,var(--yunda-maple)_10%,white)] p-6 md:p-8">
          <Icon name="lucide:calendar-clock" class="mb-5 h-8 w-8 text-[var(--yunda-maple)]" />
          <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:text-[38px]">
            {{ tt('Move Forward With a Clearer Timeline', '用更清晰的时间线推进') }}
          </h2>
          <p class="mt-5 text-[var(--yunda-bark)] leading-[1.75]">
            {{ tt('Yunda emphasizes no-waitlist matching and personalized coordination. Your exact timeline depends on medical readiness, clinic schedule, legal path, insurance needs, and the type of match that feels right for your family.', '孕达强调无等待名单匹配与个性化协调。你的实际时间线取决于医疗准备、诊所安排、法律路径、保险需求，以及适合你家庭的匹配类型。') }}
          </p>
          <NuxtLink :to="localePath('/surrogacy-process')" class="mt-6 inline-flex items-center gap-2 text-[var(--yunda-bark)] font-bold underline-offset-4 hover:underline">
            {{ tt('See the Surrogacy Process', '查看代孕流程') }}
            <Icon name="lucide:arrow-right" class="h-5 w-5" />
          </NuxtLink>
        </article>
      </section>

      <!-- Specialized Support -->
      <section class="grid gap-6 py-8 lg:grid-cols-2 lg:py-14">
        <article class="overflow-hidden rounded-3 bg-white shadow-[0_16px_40px_rgba(60,36,21,0.08)]">
          <img src="/images/ip/driverCards-3.jpeg" :alt="tt('International intended parent support', '国际准父母支持')" class="h-56 w-full object-cover" loading="lazy">
          <div class="p-6 md:p-8">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15]">
              {{ tt('Support for International and Chinese-Speaking Intended Parents', '支持国际与中文准父母') }}
            </h2>
            <p class="mt-4 text-[var(--yunda-bark)] leading-[1.75]">
              {{ tt('Cross-border surrogacy can bring extra questions: language, time zones, travel planning, U.S. clinic coordination, legal timing, insurance, escrow, and newborn paperwork. Yunda helps make the process easier to understand with bilingual English and Mandarin support.', '跨境代孕会带来额外问题：语言、时差、旅行规划、美国诊所协调、法律时间节点、保险、托管与新生儿文件。孕达以英文和中文双语支持，让流程更容易理解。') }}
            </p>
            <a href="#application-form" class="mt-6 inline-flex items-center gap-2 text-[var(--yunda-bark)] font-bold underline-offset-4 hover:underline">
              {{ tt('Talk to a Bilingual Coordinator', '与双语顾问沟通') }}
              <Icon name="lucide:arrow-right" class="h-5 w-5" />
            </a>
          </div>
        </article>

        <article class="overflow-hidden rounded-3 bg-white shadow-[0_16px_40px_rgba(60,36,21,0.08)]">
          <img src="/images/ip/LGBTQ-Friendly.webp" :alt="tt('Inclusive surrogacy support', '包容性代孕支持')" class="h-56 w-full object-cover" loading="lazy">
          <div class="p-6 md:p-8">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15]">
              {{ tt('Inclusive Surrogacy Support for LGBTQ+ and Single Intended Parents', '支持 LGBTQ+ 与单身准父母') }}
            </h2>
            <p class="mt-4 text-[var(--yunda-bark)] leading-[1.75]">
              {{ tt('Yunda supports intended parents from many family structures, including LGBTQ+ couples and single parents. We help you understand the surrogacy process, donor egg or donor sperm coordination if needed, and parentage planning with appropriate legal professionals.', '孕达支持多种家庭结构的准父母，包括 LGBTQ+ 伴侣和单身父母。我们帮助你理解代孕流程、必要时的供卵或供精协调，以及由合适法律专业人士参与的亲权规划。') }}
            </p>
            <NuxtLink :to="localePath('/single-parents-lgbtq')" class="mt-6 inline-flex items-center gap-2 text-[var(--yunda-bark)] font-bold underline-offset-4 hover:underline">
              {{ tt('Explore LGBTQ+ and Single Parent Surrogacy', '了解 LGBTQ+ 与单身父母代孕') }}
              <Icon name="lucide:arrow-right" class="h-5 w-5" />
            </NuxtLink>
          </div>
        </article>
      </section>

      <!-- Testimonials and Founder -->
      <section class="grid gap-6 py-14 lg:grid-cols-[1.08fr_0.92fr] lg:py-20">
        <div>
          <h2 class="font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:text-[44px]">
            {{ tt('Clear Communication Matters When the Stakes Are This High', '在如此重要的决定中，清晰沟通很关键') }}
          </h2>
          <p class="mt-5 text-[17px] text-[var(--yunda-bark)] leading-[1.75]">
            {{ tt('Intended parents need timely answers, transparent next steps, and coordinated communication between the agency, clinic, legal, insurance, and escrow teams. This reduces uncertainty during a high-stakes family-building process.', '准父母需要及时回答、透明下一步，以及机构、诊所、法律、保险和托管团队之间的协调沟通。这能减少高风险家庭建设过程中的不确定。') }}
          </p>
          <div class="mt-8 grid gap-4">
            <blockquote v-for="item in parentTestimonials" :key="item.quote" class="rounded-2 border border-[var(--yunda-bark)]/10 bg-white/78 p-6">
              <p class="text-[var(--yunda-bark)] leading-[1.75]">
                “{{ item.quote }}”
              </p>
              <footer class="mt-4 text-sm text-[var(--yunda-maple)] font-bold">
                {{ item.author }}
              </footer>
            </blockquote>
          </div>
        </div>
        <article class="rounded-3 bg-[var(--yunda-bark)] p-6 text-[var(--yunda-petal)] md:p-8">
          <img src="/images/base/kayla-luo.webp" :alt="tt('Kayla Luo, Yunda Surrogacy', 'Kayla Luo，孕达代孕')" class="mb-6 h-28 w-28 rounded-full object-cover ring-4 ring-[var(--yunda-petal)]/18" loading="lazy">
          <h2 class="font-display text-[30px] font-medium leading-[1.15]">
            {{ tt('Guidance From a Team That Understands the Journey', '来自真正理解这段旅程的团队') }}
          </h2>
          <p class="mt-5 text-[var(--yunda-petal)]/82 leading-[1.75]">
            {{ tt('Yunda’s North America leadership brings assisted reproduction experience, bilingual cross-border support, and personal understanding of the surrogacy journey. That perspective shapes clear communication, ethical coordination, careful planning, and respectful support.', '孕达北美团队拥有辅助生殖经验、双语跨境支持，以及对代孕旅程的切身理解。这种视角塑造了清晰沟通、伦理协调、谨慎规划和尊重式支持。') }}
          </p>
          <NuxtLink :to="localePath('/about')" class="mt-6 inline-flex items-center gap-2 font-bold underline-offset-4 hover:underline">
            {{ tt('Meet the Yunda Team', '了解孕达团队') }}
            <Icon name="lucide:arrow-right" class="h-5 w-5" />
          </NuxtLink>
        </article>
      </section>

      <!-- Application Intro -->
      <section id="application-form" class="scroll-mt-24 py-10 text-center">
        <p class="mb-4 text-sm text-[var(--yunda-maple)] font-bold uppercase tracking-[0.08em]">
          {{ tt('Private intended parent application', '准父母私密申请') }}
        </p>
        <h2 class="font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:text-[44px]">
          {{ tt('Start With a Private Intended Parent Application', '从一份私密准父母申请开始') }}
        </h2>
        <p class="mx-auto mt-5 max-w-3xl text-[17px] text-[var(--yunda-bark)] leading-[1.75]">
          {{ tt('Complete this private intake so our team can understand your goals, timeline, embryo or clinic status, and the kind of guidance you need. After submission, we will review your information and follow up with a personalized information package.', '完成这份私密信息表，让我们的团队了解你的目标、时间线、胚胎或诊所状态，以及你需要的指导。提交后，我们会审阅你的信息并发送个性化资料包。') }}
        </p>
        <div class="mx-auto mt-6 flex max-w-4xl flex-wrap items-center justify-center gap-3">
          <span class="inline-flex items-center gap-2 rounded-full bg-white/72 px-4 py-2 text-sm text-[var(--yunda-bark)] ring-1 ring-[var(--yunda-bark)]/10">
            <Icon name="lucide:lock-keyhole" class="h-4 w-4" />
            {{ tt('Private review by the Yunda team', '孕达团队私密审阅') }}
          </span>
          <span class="inline-flex items-center gap-2 rounded-full bg-white/72 px-4 py-2 text-sm text-[var(--yunda-bark)] ring-1 ring-[var(--yunda-bark)]/10">
            <Icon name="lucide:hand-heart" class="h-4 w-4" />
            {{ tt('No pressure and no commitment', '无压力，无承诺') }}
          </span>
          <span class="inline-flex items-center gap-2 rounded-full bg-white/72 px-4 py-2 text-sm text-[var(--yunda-bark)] ring-1 ring-[var(--yunda-bark)]/10">
            <Icon name="lucide:languages" class="h-4 w-4" />
            {{ tt('Bilingual support available', '可提供双语支持') }}
          </span>
        </div>
      </section>

      <!-- Form Container -->
      <div class="mb-20 rounded-5 from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b p-8 p-8 shadow-black/20 shadow-xl lg:p-12">
        <form data-allow-automatic-events="false" @submit.prevent="handleSubmit">
          <!-- Basic Information Section -->
          <h3 class="mb-8 font-sans text-[20px] text-[var(--yunda-bark)] font-bold lg:text-[24px]" style="font-family: var(--font-text)">
            {{ $t('parent.application.sections.basicInfo') }}
          </h3>

          <div class="mb-16 space-y-12">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
              <FormInput v-model="form.firstName" :label="$t('parent.application.form.firstName')" required />
              <FormInput v-model="form.lastName" :label="$t('parent.application.form.lastName')" required />
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
              <div>
                <p class="mb-4">
                  {{ $t('parent.application.form.pronouns.label') }}
                </p>
                <div class="space-y-2">
                  <FormRadio v-model="form.pronouns" name="pronouns" value="SHE_HER" :label="$t('parent.application.form.pronouns.options.sheHer')" />
                  <FormRadio v-model="form.pronouns" name="pronouns" value="HE_HIM" :label="$t('parent.application.form.pronouns.options.heHim')" />
                  <FormRadio v-model="form.pronouns" name="pronouns" value="THEY_THEM" :label="$t('parent.application.form.pronouns.options.theyThem')" />
                  <div class="flex items-center">
                    <FormRadio v-model="form.pronouns" name="pronouns" value="OTHER" :label="$t('parent.application.form.pronouns.options.other')" />
                    <input
                      v-if="form.pronouns === 'OTHER'"
                      v-model="form.pronounsSelfDescribe"
                      type="text"
                      placeholder=""
                      class="placeholder: ml-2 h-10 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 text-[var(--yunda-bark)] font-sans bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--yunda-bark)]"
                    >
                  </div>
                </div>
              </div>
              <div>
                <p class="mb-4">
                  {{ $t('parent.application.form.genderIdentity.label') }} <span class="text-red-500">*</span>
                </p>
                <div class="space-y-2">
                  <FormRadio v-model="form.genderIdentity" name="genderIdentity" value="MALE" :label="$t('parent.application.form.genderIdentity.options.male')" />
                  <FormRadio v-model="form.genderIdentity" name="genderIdentity" value="FEMALE" :label="$t('parent.application.form.genderIdentity.options.female')" />
                  <FormRadio v-model="form.genderIdentity" name="genderIdentity" value="TRANSGENDER_MALE" :label="$t('parent.application.form.genderIdentity.options.transMale')" />
                  <FormRadio v-model="form.genderIdentity" name="genderIdentity" value="TRANSGENDER_FEMALE" :label="$t('parent.application.form.genderIdentity.options.transFemale')" />
                  <FormRadio v-model="form.genderIdentity" name="genderIdentity" value="NON_BINARY" :label="$t('parent.application.form.genderIdentity.options.nonBinary')" />
                  <div class="flex items-center gap-2">
                    <FormRadio v-model="form.genderIdentity" name="genderIdentity" value="OTHER" :label="$t('parent.application.form.genderIdentity.options.preferSelfDescribe')" />
                    <input
                      v-if="form.genderIdentity === 'OTHER'"
                      v-model="form.genderSelfDescribe"
                      type="text"
                      placeholder=""
                      class="placeholder: h-10 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 text-[var(--yunda-bark)] font-sans bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--yunda-bark)]"
                    >
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
              <FormDatePicker v-model="form.dateOfBirth" :label="$t('parent.application.form.dateOfBirth')" required />
              <div>
                <p class="mb-4 font-medium">
                  {{ $t('parent.application.form.ethnicity.label') }} <span class="font-normal italic">{{ $t('parent.application.form.ethnicity.selectAll') }}</span>
                </p>
                <div class="space-y-2">
                  <FormCheckbox v-model="form.ethnicity.asian" :label="$t('parent.application.form.ethnicity.options.asian')" />
                  <FormCheckbox v-model="form.ethnicity.white" :label="$t('parent.application.form.ethnicity.options.white')" />
                  <FormCheckbox v-model="form.ethnicity.black" :label="$t('parent.application.form.ethnicity.options.black')" />
                  <FormCheckbox v-model="form.ethnicity.hispanic" :label="$t('parent.application.form.ethnicity.options.hispanic')" />
                  <FormCheckbox v-model="form.ethnicity.middleEastern" :label="$t('parent.application.form.ethnicity.options.middleEastern')" />
                  <FormCheckbox v-model="form.ethnicity.nativeAmerican" :label="$t('parent.application.form.ethnicity.options.nativeAmerican')" />
                  <FormCheckbox v-model="form.ethnicity.pacificIslander" :label="$t('parent.application.form.ethnicity.options.pacificIslander')" />
                  <FormCheckbox v-model="form.ethnicity.mixedRace" :label="$t('parent.application.form.ethnicity.options.mixedRace')" />
                  <FormCheckbox v-model="form.ethnicity.preferNotToSay" :label="$t('parent.application.form.ethnicity.options.preferNotToSay')" />
                  <div class="col-span-2 flex items-center gap-2">
                    <FormCheckbox v-model="form.ethnicity.other" :label="$t('parent.application.form.ethnicity.options.other')" />
                    <input
                      v-if="form.ethnicity.other"
                      v-model="form.ethnicitySelfDescribe"
                      type="text"
                      placeholder=""
                      class="placeholder: h-10 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 text-[var(--yunda-bark)] font-sans bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--yunda-bark)]"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Information Section -->
          <h3 class="mb-8 font-sans text-[20px] text-[var(--yunda-bark)] font-bold lg:text-[24px]" style="font-family: var(--font-text)">
            {{ $t('parent.application.sections.contactInfo') }}
          </h3>

          <div class="mb-16 space-y-6">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
              <FormPhoneInput
                v-model="form.phoneNumber"
                v-model:country-code="form.countryCode"
                :label="$t('parent.application.form.cellPhone')"
                required
                :default-country="form.country || 'US'"
              />
              <FormInput v-model="form.email" :label="$t('parent.application.form.email')" type="email" required />
            </div>

            <div>
              <FormCheckbox v-model="form.consentSMS" :label="$t('parent.application.form.smsConsent.label')" />
              <p class="ml-6 mt-2 text-13px">
                {{ $t('parent.application.form.smsConsent.disclaimer') }}
              </p>
            </div>

            <div>
              <p class="mb-4">
                {{ $t('parent.application.form.contactPreference.label') }}
              </p>
              <p class="mb-4 text-20px">
                {{ $t('parent.application.form.contactPreference.preferredContactMethod') }}
              </p>
              <div class="space-y-2">
                <FormCheckbox
                  :label="$t('parent.application.form.contactPreference.options.phone')"
                  :model-value="form.preferredContactMethod.includes('Phone')"
                  @update:model-value="(val) => {
                    if (val) {
                      if (!form.preferredContactMethod.includes('Phone')) {
                        form.preferredContactMethod.push('Phone')
                      }
                    }
                    else {
                      form.preferredContactMethod = form.preferredContactMethod.filter((m: string) => m !== 'Phone')
                    }
                  }"
                />
                <FormCheckbox
                  :label="$t('parent.application.form.contactPreference.options.email')"
                  :model-value="form.preferredContactMethod.includes('Email')"
                  @update:model-value="(val) => {
                    if (val) {
                      if (!form.preferredContactMethod.includes('Email')) {
                        form.preferredContactMethod.push('Email')
                      }
                    }
                    else {
                      form.preferredContactMethod = form.preferredContactMethod.filter((m: string) => m !== 'Email')
                    }
                  }"
                />
                <FormCheckbox
                  :label="$t('parent.application.form.contactPreference.options.others')"
                  :model-value="form.preferredContactMethod.includes('Others')"
                  @update:model-value="(val) => {
                    if (val) {
                      if (!form.preferredContactMethod.includes('Others')) {
                        form.preferredContactMethod.push('Others')
                      }
                    }
                    else {
                      form.preferredContactMethod = form.preferredContactMethod.filter((m: string) => m !== 'Others')
                    }
                  }"
                />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
              <div>
                <p class="mb-4 text-20px">
                  {{ $t('parent.application.form.languages.label') }} <span class="text-red-500">*</span>
                </p>
                <FormCheckbox v-model="form.languages.english" :label="$t('parent.application.form.languages.options.english')" />
                <FormCheckbox v-model="form.languages.mandarin" :label="$t('parent.application.form.languages.options.mandarin')" />
                <FormCheckbox v-model="form.languages.cantonese" :label="$t('parent.application.form.languages.options.cantonese')" />
                <FormCheckbox v-model="form.languages.spanish" :label="$t('parent.application.form.languages.options.spanish')" />
                <FormCheckbox v-model="form.languages.french" :label="$t('parent.application.form.languages.options.french')" />
                <FormCheckbox v-model="form.languages.korean" :label="$t('parent.application.form.languages.options.korean')" />
                <FormCheckbox v-model="form.languages.japanese" :label="$t('parent.application.form.languages.options.japanese')" />
                <FormCheckbox v-model="form.languages.hindi" :label="$t('parent.application.form.languages.options.hindi')" />
                <FormCheckbox v-model="form.languages.vietnamese" :label="$t('parent.application.form.languages.options.vietnamese')" />
                <FormCheckbox v-model="form.languages.russian" :label="$t('parent.application.form.languages.options.russian')" />
                <FormCheckbox v-model="form.languages.arabic" :label="$t('parent.application.form.languages.options.arabic')" />
                <FormCheckbox v-model="form.languages.portuguese" :label="$t('parent.application.form.languages.options.portuguese')" />
                <FormCheckbox v-model="form.languages.tagalog" :label="$t('parent.application.form.languages.options.tagalog')" />
                <FormCheckbox v-model="form.languages.german" :label="$t('parent.application.form.languages.options.german')" />
                <FormCheckbox v-model="form.languages.italian" :label="$t('parent.application.form.languages.options.italian')" />
                <div class="col-span-2 flex items-center gap-2">
                  <FormCheckbox v-model="form.languages.other" :label="$t('parent.application.form.languages.options.other')" />
                </div>
                <input
                  v-if="form.languages.other"
                  v-model="form.otherLanguage"
                  type="text"
                  placeholder=""
                  class="placeholder: h-10 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 text-[var(--yunda-bark)] font-sans bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--yunda-bark)]"
                >
              </div>
            </div>

            <p class="text-13px text-[var(--yunda-bark)] font-sans">
              {{ $t('parent.application.form.languages.note') }}
            </p>
          </div>

          <!-- Family Profile Section -->
          <h3 class="mb-8 font-sans text-[20px] text-[var(--yunda-bark)] font-bold lg:text-[24px]" style="font-family: var(--font-text)">
            {{ $t('parent.application.sections.familyProfile') }}
          </h3>

          <div class="mb-16 space-y-6">
            <div>
              <p class="mb-4">
                {{ $t('parent.application.form.sexualOrientation.label') }} <span class="text-red-500">*</span>
              </p>
              <div class="space-y-2">
                <FormRadio v-model="form.sexualOrientation" name="sexualOrientation" value="HETEROSEXUAL" :label="$t('parent.application.form.sexualOrientation.options.heterosexual')" />
                <FormRadio v-model="form.sexualOrientation" name="sexualOrientation" value="LGBTQIA" :label="$t('parent.application.form.sexualOrientation.options.lgbtqia')" />
                <div class="flex items-center gap-2">
                  <FormRadio v-model="form.sexualOrientation" name="sexualOrientation" value="OTHER" :label="$t('parent.application.form.sexualOrientation.options.preferSelfDescribe')" />
                  <input
                    v-if="form.sexualOrientation === 'OTHER'"
                    v-model="form.sexualOrientationSelfDescribe"
                    type="text"
                    placeholder=""
                    class="placeholder: h-10 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 text-[var(--yunda-bark)] font-sans bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--yunda-bark)]"
                  >
                </div>
              </div>
            </div>

            <div>
              <p class="mb-4">
                {{ $t('parent.application.form.relationshipStatus.label') }}
              </p>
              <div class="space-y-2">
                <FormRadio v-model="form.relationshipStatus" name="relationshipStatus" value="Married" :label="$t('parent.application.form.relationshipStatus.options.married')" />
                <FormRadio v-model="form.relationshipStatus" name="relationshipStatus" value="Single" :label="$t('parent.application.form.relationshipStatus.options.single')" />
                <FormRadio v-model="form.relationshipStatus" name="relationshipStatus" value="Partnered" :label="$t('parent.application.form.relationshipStatus.options.partnered')" />
              </div>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
              <FormInput v-model="form.city" :label="$t('parent.application.form.city')" required />
              <FormSelect
                v-model="form.country"
                :label="$t('parent.application.form.country')"
                :options="countries"
                required
              />
              <FormSelect
                v-model="form.stateProvince"
                :label="$t('parent.application.form.stateProvince')"
                :options="states"
                :disabled="!form.country || states.length === 0"
                :placeholder="states.length === 0 ? $t('parent.application.form.noStatesAvailable') : $t('parent.application.form.selectStateProvince')"
                required
              />
            </div>
          </div>

          <!-- Program Interests Section -->
          <h3 class="mb-8 font-sans text-[20px] text-[var(--yunda-bark)] font-bold lg:text-[24px]" style="font-family: var(--font-text)">
            {{ $t('parent.application.sections.programInterests') }}
          </h3>

          <div class="mb-16 space-y-6">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
              <div>
                <p class="mb-4">
                  {{ $t('parent.application.form.services.question') }} <span class="text-red-500">*</span>
                </p>
                <div class="space-y-2">
                  <FormRadio v-model="form.programInterests" name="programInterests" value="SURROGACY_EGG_DONOR" :label="$t('parent.application.form.services.options.surrogacyEggDonor')" />
                  <FormRadio v-model="form.programInterests" name="programInterests" value="SURROGACY_ONLY" :label="$t('parent.application.form.services.options.surrogacyOnly')" />
                  <FormRadio v-model="form.programInterests" name="programInterests" value="EGG_DONOR_ONLY" :label="$t('parent.application.form.services.options.eggDonorOnly')" />
                  <FormRadio v-model="form.programInterests" name="programInterests" value="THIRD_PARTY_SURROGATE" :label="$t('parent.application.form.services.options.thirdPartySurrogate')" />
                  <FormRadio v-model="form.programInterests" name="programInterests" value="BRING_YOUR_OWN_SURROGATE" :label="$t('parent.application.form.services.options.bringYourOwnSurrogate')" />
                  <FormRadio v-model="form.programInterests" name="programInterests" value="BRING_YOUR_OWN_SURROGATE_EGG" :label="$t('parent.application.form.services.options.bringYourOwnSurrogateEgg')" />
                  <FormRadio v-model="form.programInterests" name="programInterests" value="NOT_SURE" :label="$t('parent.application.form.services.options.notSure')" />
                </div>
              </div>
              <div>
                <p class="mb-4">
                  {{ $t('parent.application.form.timing.question') }} <span class="text-red-500">*</span>
                </p>
                <div class="space-y-2">
                  <FormRadio v-model="form.journeyStartTiming" name="journeyStartTiming" value="ASAP" :label="$t('parent.application.form.timing.options.asap')" />
                  <FormRadio v-model="form.journeyStartTiming" name="journeyStartTiming" value="NEXT_6_MONTHS" :label="$t('parent.application.form.timing.options.next6Months')" />
                  <FormRadio v-model="form.journeyStartTiming" name="journeyStartTiming" value="NEXT_YEAR" :label="$t('parent.application.form.timing.options.nextYear')" />
                  <FormRadio v-model="form.journeyStartTiming" name="journeyStartTiming" value="NOT_SURE" :label="$t('parent.application.form.timing.options.notSure')" />
                </div>
              </div>
            </div>

            <div>
              <p class="mb-4">
                {{ $t('parent.application.form.childrenCount.question') }} <span class="text-red-500">*</span>
              </p>
              <div class="space-y-2">
                <FormRadio v-model="form.desiredChildrenCount" name="desiredChildrenCount" value="ONE_CHILD" :label="$t('parent.application.form.childrenCount.options.oneChild')" />
                <FormRadio v-model="form.desiredChildrenCount" name="desiredChildrenCount" value="TWINS" :label="$t('parent.application.form.childrenCount.options.twins')" />
                <FormRadio v-model="form.desiredChildrenCount" name="desiredChildrenCount" value="MORE_THAN_TWO" :label="$t('parent.application.form.childrenCount.options.moreThanTwo')" />
                <FormRadio v-model="form.desiredChildrenCount" name="desiredChildrenCount" value="NOT_SURE" :label="$t('parent.application.form.childrenCount.options.notSure')" />
              </div>
            </div>
          </div>

          <!-- Embryo & Medical Status Section -->
          <h3 class="mb-8 font-sans text-[20px] text-[var(--yunda-bark)] font-bold lg:text-[24px]" style="font-family: var(--font-text)">
            {{ $t('parent.application.sections.embryoMedicalStatus') }}
          </h3>

          <div class="mb-16 space-y-6">
            <div>
              <p class="mb-4">
                {{ $t('parent.application.form.embryoMedicalStatus.hasEmbryos.question') }}
              </p>
              <div class="space-y-2">
                <FormRadio v-model="form.hasEmbryos" name="hasEmbryos" value="Yes" :label="$t('parent.application.form.embryoMedicalStatus.hasEmbryos.yes')" />
                <FormRadio v-model="form.hasEmbryos" name="hasEmbryos" value="No" :label="$t('parent.application.form.embryoMedicalStatus.hasEmbryos.no')" />
              </div>
            </div>

            <div v-if="form.hasEmbryos === 'Yes'" class="space-y-6">
              <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
                <FormInput v-model="form.embryoClinicName" :label="$t('parent.application.form.embryoMedicalStatus.embryoClinicName')" />
                <FormInput v-model="form.embryoCount" :label="$t('parent.application.form.embryoMedicalStatus.embryoCount')" type="number" />
              </div>

              <div>
                <p class="mb-4">
                  {{ $t('parent.application.form.embryoMedicalStatus.pgtStatus.label') }}
                </p>
                <div class="space-y-2">
                  <FormRadio v-model="form.pgtStatus" name="pgtStatus" value="Yes" :label="$t('parent.application.form.embryoMedicalStatus.pgtStatus.yes')" />
                  <FormRadio v-model="form.pgtStatus" name="pgtStatus" value="No" :label="$t('parent.application.form.embryoMedicalStatus.pgtStatus.no')" />
                </div>
              </div>
            </div>

            <div>
              <p class="mb-4">
                {{ $t('parent.application.form.embryoMedicalStatus.hasFertilityClinic.question') }}
              </p>
              <div class="space-y-2">
                <div class="flex items-center gap-2">
                  <FormRadio v-model="form.hasFertilityClinic" name="hasFertilityClinic" value="Yes" :label="$t('parent.application.form.embryoMedicalStatus.hasFertilityClinic.yes')" />
                  <input
                    v-if="form.hasFertilityClinic === 'Yes'"
                    v-model="form.fertilityClinicName"
                    type="text"
                    :placeholder="$t('parent.application.form.embryoMedicalStatus.hasFertilityClinic.clinicName')"
                    class="placeholder: h-10 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 text-[var(--yunda-bark)] font-sans bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--yunda-bark)]"
                  >
                </div>
                <FormRadio v-model="form.hasFertilityClinic" name="hasFertilityClinic" value="No" :label="$t('parent.application.form.embryoMedicalStatus.hasFertilityClinic.no')" />
              </div>
            </div>
          </div>

          <!-- Referral Section -->
          <h3 class="mb-8 font-sans text-[20px] text-[var(--yunda-bark)] font-bold lg:text-[24px]" style="font-family: var(--font-text)">
            {{ $t('parent.application.sections.referral') }}
          </h3>

          <div class="grid grid-cols-1 mb-16 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <FormInput v-model="form.referralSource" :label="$t('parent.application.form.referralSource')" />
            <FormInput v-model="form.initialQuestions" :label="$t('parent.application.form.initialQuestions')" />
          </div>

          <!-- Consent Section -->
          <div class="mb-12">
            <h4 class="mb-4 text-5">
              {{ $t('parent.application.sections.consent') }}
            </h4>

            <!-- Terms of Service and Privacy Policy Consent (Required) -->
            <div class="mb-6">
              <FormCheckbox
                v-model="form.consentTermsAndPrivacy"
                :label="$t('parent.application.form.consentTermsAndPrivacy.label')"
                required
              />
              <p class="ml-6 mt-2 text-13px text-gray-600">
                <NuxtLink :to="localePath('/terms-of-service')" class="text-blue-600 hover:underline" target="_blank">
                  {{ $t('parent.application.form.consentTermsAndPrivacy.termsLink') }}
                </NuxtLink>
                {{ $t('parent.application.form.consentTermsAndPrivacy.and') }}
                <NuxtLink :to="localePath('/privacy-policy')" class="text-blue-600 hover:underline" target="_blank">
                  {{ $t('parent.application.form.consentTermsAndPrivacy.privacyLink') }}
                </NuxtLink>
                {{ $t('parent.application.form.consentTermsAndPrivacy.suffix') }}
              </p>
            </div>

            <!-- Privacy Policy Consent -->
            <FormCheckbox
              v-model="form.consentAgreement"
              :label="$t('parent.application.form.consentAgreement.label')"
              required
            />
            <p class="mt-4 text-13px italic">
              {{ $t('parent.application.form.consentAgreement.disclaimer') }}
            </p>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-center">
            <button
              type="submit"
              :disabled="isSubmitting"
              class="yunda-type-button rounded-2.5 bg-[var(--yunda-bark)] px-12 py-4 text-lg text-[var(--yunda-petal)] tracking-[0.02em] shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] backdrop-blur-5 transition-opacity"
              :class="isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 cursor-pointer'"
            >
              {{ isSubmitting ? $t('parent.application.form.submittingButton') : $t('parent.application.form.submitButton') }}
            </button>
          </div>
          <p class="mx-auto mt-4 max-w-3xl text-center text-13px text-[var(--yunda-bark)]/72 leading-[1.65]">
            {{ tt('By submitting, you are requesting private guidance from Yunda Surrogacy. This does not create a contract or obligation to begin a surrogacy program. Medical and legal decisions should be made with qualified professionals.', '提交后，你是在向孕达代孕请求私密指导。这不会形成合同，也不代表你必须开始代孕项目。医疗和法律决定应与合格专业人士共同做出。') }}
          </p>
          <div
            v-if="hasTriedSubmit && requiredFieldErrors.length > 0 && !isSubmitting"
            class="mx-auto mt-4 max-w-2xl border border-red-200 rounded-2.5 bg-red-50 p-4 text-red-700"
          >
            <p class="text-13px font-semibold">
              {{ locale === 'zh' ? '请完善以下字段后再提交：' : 'Please fix the following fields before submitting:' }}
            </p>
            <ul class="mt-2 text-13px space-y-1">
              <li v-for="field in requiredFieldErrors" :key="field" class="flex items-start">
                <span class="mr-2">•</span>
                <span>{{ field }}</span>
              </li>
            </ul>
          </div>
        </form>
      </div>

      <!-- FAQ -->
      <section class="py-10 lg:py-16">
        <div class="mx-auto max-w-4xl">
          <h2 class="text-center font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:text-[44px]">
            {{ tt('Questions Intended Parents Often Ask Before Applying', '准父母申请前常见问题') }}
          </h2>
          <p class="mx-auto mt-5 max-w-3xl text-center text-[17px] text-[var(--yunda-bark)] leading-[1.75]">
            {{ tt('These answers summarize common intended parent questions about embryos, IVF clinics, cost, legal coordination, bilingual support, LGBTQ+ and single-parent paths, and what happens after applying.', '以下回答总结准父母常见问题，包括胚胎、IVF 诊所、费用、法律协调、双语支持、LGBTQ+ 与单身父母路径，以及提交申请后的流程。') }}
          </p>
          <div class="mt-8 divide-y divide-[var(--yunda-bark)]/12 rounded-3 border border-[var(--yunda-bark)]/12 bg-white/78">
            <details v-for="item in landingFaqItems" :key="item.question" class="group p-5 md:p-6">
              <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] text-[var(--yunda-bark)] font-bold">
                {{ item.question }}
                <Icon name="lucide:chevron-down" class="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p class="mt-4 text-[var(--yunda-bark)]/78 leading-[1.75]">
                {{ item.answer }}
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
    <AppFooter />

    <!-- Response Modal -->
    <MessageModal
      v-model="showModal"
      :type="modalConfig.type"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :button-text="modalConfig.buttonText"
      @close="handleModalClose"
    />
  </div>
</template>

<style scoped>
@media (max-width: 640px) {
  .parent-hero-card :deep(li),
  .parent-hero-card :deep(p) {
    max-width: calc(100vw - 40px);
    overflow-wrap: anywhere;
  }
}
</style>

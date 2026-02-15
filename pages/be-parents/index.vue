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
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

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
  {
    question: `${t('parent.application.welcome.title')}?`,
    answer: `${t('parent.application.welcome.message1')} ${t('parent.application.welcome.message2')}`,
  },
  {
    question: `${t('parent.application.sections.programInterests')}?`,
    answer: t('parent.application.welcome.message3'),
  },
  {
    question: `${t('parent.application.sections.consent')}?`,
    answer: t('parent.application.form.consentAgreement.disclaimer'),
  },
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

useHead(() => {
  const scripts = []
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
  return scripts.length ? { script: scripts } : {}
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
const pendingSuccessRedirect = ref<null | { path: string, query: Record<string, string> }>(null)

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
  <div class="min-h-screen overflow-hidden bg-[var(--head-bg)]">
    <AppHeader />

    <!-- Header -->
    <div class="relative h-30 w-full flex items-center justify-center bg-[#BFC9BF] lg:h-80">
      <h1 class="text-center text-8 font-semibold italic lg:text-16" style="font-family: var(--font-primary)">
        {{ $t('parent.application.pageTitle') }}
      </h1>
    </div>

    <!-- Main Content -->
    <div class="relative mx-auto mt-10 max-w-300 px-4 lg:px-0">
      <!-- Introduction -->
      <div class="mb-16 text-center lg:text-5">
        <h2 class="mb-8 text-8 font-semibold" style="font-family: var(--font-primary)">
          {{ $t('parent.application.welcome.title') }}
        </h2>
        <p class="mx-auto mb-4 max-w-966px leading-relaxed">
          {{ $t('parent.application.welcome.message1') }}
        </p>
        <p class="mx-auto mb-20 max-w-954px">
          <span v-html="$t('parent.application.welcome.message2')" />
        </p>

        <p class="mx-auto mb-8 max-w-954px text-8 font-semibold" style="font-family: var(--font-primary)">
          {{ $t('parent.application.welcome.message3') }}
        </p>
        <p class="mb-12">
          {{ $t('parent.application.welcome.scrollPrompt') }}
        </p>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" class="mx-auto animate-bounce">
          <path d="M10 20L24 34L38 20" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>

      <!-- Form Container -->
      <div class="mb-20 rounded-5 from-[var(--foot-bg)] via-[var(--light-cream)] to-[var(--foot-bg)] bg-gradient-to-b p-8 p-8 shadow-black/20 shadow-xl lg:p-12">
        <form data-allow-automatic-events="false" @submit.prevent="handleSubmit">
          <!-- Basic Information Section -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">
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
                      class="placeholder: ml-2 h-10 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 text-black font-serif bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]"
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
                      class="placeholder: h-10 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 text-black font-serif bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]"
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
                      class="placeholder: h-10 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 text-black font-serif bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]"
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Information Section -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">
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
                  {{ $t('parent.application.form.languages.label') }} *
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
                  class="placeholder: h-10 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 text-black font-serif bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]"
                >
              </div>
            </div>

            <p class="text-13px text-black font-serif">
              {{ $t('parent.application.form.languages.note') }}
            </p>
          </div>

          <!-- Family Profile Section -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('parent.application.sections.familyProfile') }}
          </h3>

          <div class="mb-16 space-y-6">
            <div>
              <p class="mb-4">
                {{ $t('parent.application.form.sexualOrientation.label') }} *
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
                    class="placeholder: h-10 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 text-black font-serif bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]"
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
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('parent.application.sections.programInterests') }}
          </h3>

          <div class="mb-16 space-y-6">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
              <div>
                <p class="mb-4">
                  {{ $t('parent.application.form.services.question') }} *
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
                  {{ $t('parent.application.form.timing.question') }} *
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
                {{ $t('parent.application.form.childrenCount.question') }} *
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
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">
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
                    class="placeholder: h-10 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 text-black font-serif bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]"
                  >
                </div>
                <FormRadio v-model="form.hasFertilityClinic" name="hasFertilityClinic" value="No" :label="$t('parent.application.form.embryoMedicalStatus.hasFertilityClinic.no')" />
              </div>
            </div>
          </div>

          <!-- Referral Section -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">
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
            />
            <p class="mt-4 text-13px italic">
              {{ $t('parent.application.form.consentAgreement.disclaimer') }}
            </p>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-center">
            <button
              type="submit"
              :disabled="!form.consentAgreement || !form.consentTermsAndPrivacy || isSubmitting"
              class="rounded-2.5 bg-[var(--grayish-green)] px-12 py-4 text-20px text-[#FFFCF6] font-semibold shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] backdrop-blur-5 transition-opacity"
              :class="form.consentAgreement && form.consentTermsAndPrivacy && !isSubmitting ? 'hover:opacity-90 cursor-pointer' : 'opacity-50 cursor-not-allowed'"
            >
              {{ isSubmitting ? $t('parent.application.form.submittingButton') : $t('parent.application.form.submitButton') }}
            </button>
          </div>
        </form>
      </div>
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

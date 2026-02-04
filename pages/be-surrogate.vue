<script setup lang="ts">
import type { SurrogateMotherApplicationData } from '~/types/api'
import { computed, nextTick, reactive, ref, watch } from 'vue'
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
import { getStatesByCountry } from '~/data/countries-states'
import { uploadFilesToQiniu } from '~/utils/qiniuDirectUpload'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

const emptyDelivery = () => ({ delivery_date: '', gender: '', birth_weight: '', delivery_type: '', hospital: '' })

const form = reactive({
  general_info: {
    full_name: '',
    email: '',
    phone: '',
    country_code: '+1',
    dob: '',
    state_of_residence: '',
    place_of_birth: '',
    home_address: '',
    height_feet: '',
    height_inches: '',
    weight: '',
    occupation_type: '' as '' | 'employed' | 'stay_at_home' | 'unemployed',
    occupation_specify: '',
    marital_status: '' as '' | 'married' | 'single' | 'cohabitating' | 'divorced',
    single_partner_info: '',
    us_citizen_or_resident: '' as '' | 'yes' | 'no',
  },
  pregnancy_birth_history: {
    total_children: '' as number | '',
    total_vaginal: '' as number | '',
    total_c_sections: '' as number | '',
    miscarriages: '' as '' | 'yes' | 'no',
    miscarriages_detail: '',
    abortions: '' as '' | 'yes' | 'no',
    abortions_detail: '',
  },
  delivery_history: [] as Array<{ delivery_date: string, gender: string, birth_weight: string, delivery_type: string, hospital: string }>,
  pregnancy_medical: {
    anemia: '' as '' | 'yes' | 'no',
    severe_vomiting_3mo: '' as '' | 'yes' | 'no',
    bp_during_pregnancy: '',
    preeclampsia: '' as '' | 'yes' | 'no',
    gestational_diabetes: '' as '' | 'yes' | 'no',
    hypertension_pregnancy: '' as '' | 'yes' | 'no',
    blood_transfusion: '' as '' | 'yes' | 'no',
    seizures: '' as '' | 'yes' | 'no',
  },
  medical_health: {
    regular_menstrual_cycles: '' as '' | 'yes' | 'no',
    birth_control: '' as '' | 'yes' | 'no',
    birth_control_type: '',
    taking_medications: '' as '' | 'yes' | 'no',
    medications_list: '',
    last_pap_smear: '',
    covid_vaccinated: '' as '' | 'yes' | 'no',
    hep_b_vaccinated: '' as '' | 'yes' | 'no',
    varicella_vaccinated: '' as '' | 'yes' | 'no',
    ongoing_medical_treatment: '' as '' | 'yes' | 'no',
    surgeries_past_2y: '' as '' | 'yes' | 'no',
    surgeries_specify: '',
  },
  mental_health: {
    anxiety_depression: '' as '' | 'yes' | 'no',
    bipolar_schizo_personality: '' as '' | 'yes' | 'no',
    adhd: '' as '' | 'yes' | 'no',
    meds_anxiety_depression: '' as '' | 'yes' | 'no',
    meds_specify: '',
  },
  substance_use: {
    drug_use_pregnancy: '' as '' | 'yes' | 'no',
    drug_marijuana: false,
    drug_fentanyl: false,
    drug_methamphetamine: false,
    drug_mdma: false,
    drug_other: '',
    marijuana_current: '' as '' | 'yes' | 'no',
    marijuana_last_use: '',
    smoked_vaped_pregnancy: '' as '' | 'yes' | 'no',
    alcohol: '' as '' | 'yes' | 'no',
    alcohol_frequency: '',
  },
  infectious_disease: {
    syphilis: '' as '' | 'yes' | 'no',
    hepatitis_b_c: '' as '' | 'yes' | 'no',
    genital_herpes: '' as '' | 'yes' | 'no',
    hiv: '' as '' | 'yes' | 'no',
  },
  other_medical: {
    asthma: '' as '' | 'yes' | 'no',
    asthma_inhaler_per_week: '',
    heart_conditions: '' as '' | 'yes' | 'no',
    cancer_history: '' as '' | 'yes' | 'no',
    scoliosis: '' as '' | 'yes' | 'no',
    endometrial_ablation: '' as '' | 'yes' | 'no',
  },
  preferences: {
    availability: '',
    health_insurance: '',
    open_twins: '' as '' | 'yes' | 'no',
    open_fetal_reduction: '' as '' | 'yes' | 'no',
    open_termination: '' as '' | 'yes' | 'no',
    open_amniocentesis_cvs: '' as '' | 'yes' | 'no',
    open_same_sex_single_ip: '' as '' | 'yes' | 'no',
    willing_pump_breast_milk: '' as '' | 'yes' | 'no',
    open_ip_hiv: '' as '' | 'yes' | 'no',
    open_ip_hepatitis_b: '' as '' | 'yes' | 'no',
  },
  legal_admin: {
    pending_legal: '' as '' | 'yes' | 'no',
    criminal_record: '' as '' | 'yes' | 'no',
    emergency_contact: '',
    government_assistance: '' as '' | 'yes' | 'no',
  },
  notes: {
    referred_by: '',
    medical_records_source: '' as '' | 'patient_portal' | 'clinic' | 'other' | '',
  },
  uploadPhotos: [] as string[],
  finalConsent: false,
})

const deliveryCollapse = ref<boolean[]>([])
watch(() => form.delivery_history.length, (len) => {
  deliveryCollapse.value = Array.from({ length: len }, () => true)
})

function addDelivery() {
  form.delivery_history.push(emptyDelivery())
  deliveryCollapse.value.push(true)
}

function removeDelivery(idx: number) {
  form.delivery_history.splice(idx, 1)
  deliveryCollapse.value.splice(idx, 1)
}

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const surrogateHowToSteps = computed(() => [
  { title: t('surrogate.application.gcIntake.sections.generalInfo'), text: t('surrogate.application.congratulations.message1') },
  { title: t('surrogate.application.gcIntake.sections.pregnancyBirthHistory'), text: t('surrogate.application.congratulations.message2') },
  { title: t('surrogate.application.gcIntake.sections.preferences'), text: t('surrogate.application.congratulations.thanks') },
  { title: t('surrogate.application.sections.consent'), text: t('surrogate.application.form.finalConsent.text') },
])

const surrogateFaqItems = computed(() => [
  { question: `${t('surrogate.application.congratulations.title')}?`, answer: `${t('surrogate.application.congratulations.message1')} ${t('surrogate.application.congratulations.message2')}` },
  { question: `${t('surrogate.application.gcIntake.sections.preferences')}?`, answer: t('surrogate.application.congratulations.message2') },
  { question: `${t('surrogate.application.sections.consent')}?`, answer: t('surrogate.application.form.finalConsent.disclaimer') },
])

const surrogateHowToSchema = computed(() => buildHowToSchema({
  name: t('surrogate.application.pageTitle'),
  description: t('surrogate.application.congratulations.message1'),
  steps: surrogateHowToSteps.value,
  baseUrl: siteUrl.value || undefined,
  url: '/be-surrogate',
  locale: locale.value,
}))

const surrogateFaqSchema = computed(() => buildFAQPageSchema({
  name: `${t('surrogate.application.pageTitle')} FAQ`,
  description: t('surrogate.application.congratulations.message2'),
  faqs: surrogateFaqItems.value,
  baseUrl: siteUrl.value || undefined,
  url: '/be-surrogate',
  locale: locale.value,
}))

useHead(() => {
  const scripts = []
  if (surrogateHowToSchema.value) {
    scripts.push({
      key: 'schema-surrogate-howto',
      type: 'application/ld+json',
      children: JSON.stringify(surrogateHowToSchema.value),
    })
  }
  if (surrogateFaqSchema.value) {
    scripts.push({
      key: 'schema-surrogate-faq',
      type: 'application/ld+json',
      children: JSON.stringify(surrogateFaqSchema.value),
    })
  }
  return scripts.length ? { script: scripts } : {}
})

const calculatedBMI = computed(() => {
  const feet = Number.parseFloat(form.general_info.height_feet) || 0
  const inches = Number.parseFloat(form.general_info.height_inches) || 0
  const weight = Number.parseFloat(form.general_info.weight) || 0
  if (feet === 0 || weight === 0)
    return 0
  const totalInches = feet * 12 + inches
  return Math.round((weight / (totalInches * totalInches)) * 703 * 10) / 10
})

const states = computed(() => getStatesByCountry('US'))

const fileInputRef = ref<HTMLInputElement | null>(null)
const uploadingPhotos = ref(false)

const { submitSurrogateApplication } = useApi()
const { $fbPixel } = useNuxtApp()

// Form submission state
const isSubmitting = ref(false)

// Modal state
const showModal = ref(false)
const modalConfig = reactive({
  type: 'success' as 'success' | 'error',
  titleKey: '',
  messageKey: '',
  buttonText: t('surrogate.application.form.submitButton'),
  message: '' as string | string[], // 兼容后端返回
  fieldLabel: '', // 用于 required 校验字段名参数
})

// 新图片上传逻辑：使用七牛云直传，异步上传图片，获取 URL
async function uploadImages(files: File[]): Promise<string[]> {
  try {
    const results = await uploadFilesToQiniu(files)
    return results.map(result => result.url).filter(Boolean)
  }
  catch (err: any) {
    throw new Error(err.message || '图片上传失败')
  }
}

async function onPhotoChange(e: Event) {
  const files = (e.target as HTMLInputElement)?.files
  if (!files || files.length === 0)
    return
  uploadingPhotos.value = true
  try {
    const urls = await uploadImages(Array.from(files))
    form.uploadPhotos.push(...urls)
  }
  catch (err: any) {
    modalConfig.type = 'error'
    modalConfig.titleKey = ''
    modalConfig.message = err.message || '图片上传失败'
    modalConfig.buttonText = '确定'
    showModal.value = true
  }
  finally {
    uploadingPhotos.value = false
    nextTick(() => {
      if (fileInputRef.value)
        fileInputRef.value.value = ''
    })
  }
}

async function handleDrop(e: DragEvent) {
  const files = e.dataTransfer?.files
  if (!files || files.length === 0)
    return
  const imageFiles = Array.from(files).filter(file => file.type.startsWith('image/'))
  if (imageFiles.length === 0)
    return
  uploadingPhotos.value = true
  try {
    const urls = await uploadImages(imageFiles)
    form.uploadPhotos.push(...urls)
  }
  catch (err: any) {
    modalConfig.type = 'error'
    modalConfig.titleKey = ''
    modalConfig.message = err.message || '图片上传失败'
    modalConfig.buttonText = '确定'
    showModal.value = true
  }
  finally {
    uploadingPhotos.value = false
  }
}

function removePhoto(idx: number) {
  form.uploadPhotos.splice(idx, 1)
}
function yn(v: '' | 'yes' | 'no') { return v === 'yes' }

async function handleSubmit() {
  if (isSubmitting.value)
    return
  if (!form.uploadPhotos?.length || form.uploadPhotos.length < 2) {
    modalConfig.type = 'error'
    modalConfig.titleKey = 'modal.error.uploadPhotosMin.title'
    modalConfig.messageKey = 'modal.error.uploadPhotosMin.message'
    modalConfig.buttonText = t('modal.error.ok')
    showModal.value = true
    return
  }
  if (uploadingPhotos.value) {
    modalConfig.type = 'error'
    modalConfig.titleKey = 'modal.error.uploadPhotosUploading.title'
    modalConfig.messageKey = 'modal.error.uploadPhotosUploading.message'
    modalConfig.buttonText = t('modal.error.ok')
    showModal.value = true
    return
  }
  const g = form.general_info
  const required: { value: string | number | undefined, label: string }[] = [
    { value: g.full_name?.trim(), label: 'surrogate.application.gcIntake.fullName' },
    { value: g.email?.trim(), label: 'surrogate.application.gcIntake.email' },
    { value: g.phone?.trim(), label: 'surrogate.application.gcIntake.phone' },
    { value: g.dob, label: 'surrogate.application.gcIntake.dob' },
    { value: g.state_of_residence, label: 'surrogate.application.gcIntake.stateOfResidence' },
    { value: g.marital_status, label: 'surrogate.application.gcIntake.maritalStatus' },
    { value: g.us_citizen_or_resident, label: 'surrogate.application.gcIntake.usCitizenOrResident' },
    { value: g.occupation_type, label: 'surrogate.application.gcIntake.occupationSource' },
    { value: g.height_feet || g.height_inches || g.weight, label: 'surrogate.application.gcIntake.heightWeight' },
  ]
  for (const r of required) {
    if (r.value === undefined || r.value === '') {
      modalConfig.type = 'error'
      modalConfig.titleKey = 'modal.error.required.title'
      modalConfig.messageKey = 'modal.error.required.message'
      modalConfig.buttonText = t('modal.error.ok')
      modalConfig.fieldLabel = r.label
      showModal.value = true
      return
    }
  }
  if (g.occupation_type === 'employed' || g.occupation_type === 'unemployed') {
    if (!form.general_info.occupation_specify?.trim()) {
      modalConfig.type = 'error'
      modalConfig.titleKey = 'modal.error.required.title'
      modalConfig.messageKey = 'modal.error.required.message'
      modalConfig.buttonText = t('modal.error.ok')
      modalConfig.fieldLabel = 'surrogate.application.gcIntake.occupationSource'
      showModal.value = true
      return
    }
  }
  if (!form.finalConsent) {
    modalConfig.type = 'error'
    modalConfig.titleKey = 'modal.error.consentRequired.title'
    modalConfig.messageKey = 'modal.error.consentRequired.message'
    modalConfig.buttonText = t('modal.error.ok')
    showModal.value = true
    return
  }

  isSubmitting.value = true
  try {
    const requestData: SurrogateMotherApplicationData = {
      gc_intake: {
        general_info: {
          full_name: g.full_name?.trim(),
          email: g.email?.trim(),
          phone: g.phone?.trim(),
          country_code: g.country_code,
          dob: g.dob,
          age: g.dob ? (new Date().getFullYear() - new Date(g.dob).getFullYear()) : undefined,
          state_of_residence: g.state_of_residence,
          place_of_birth: g.place_of_birth?.trim() || undefined,
          home_address: g.home_address?.trim() || undefined,
          height_feet: g.height_feet,
          height_inches: g.height_inches,
          weight: g.weight,
          bmi: String(calculatedBMI.value),
          occupation_type: g.occupation_type || undefined,
          occupation_specify: g.occupation_specify?.trim() || undefined,
          marital_status: g.marital_status || undefined,
          single_partner_info: g.single_partner_info?.trim() || undefined,
          us_citizen_or_resident: g.us_citizen_or_resident === 'yes',
        },
        pregnancy_birth_history: {
          total_children: typeof form.pregnancy_birth_history.total_children === 'number' ? form.pregnancy_birth_history.total_children : (Number(form.pregnancy_birth_history.total_children) || undefined),
          total_vaginal: typeof form.pregnancy_birth_history.total_vaginal === 'number' ? form.pregnancy_birth_history.total_vaginal : (Number(form.pregnancy_birth_history.total_vaginal) || undefined),
          total_c_sections: typeof form.pregnancy_birth_history.total_c_sections === 'number' ? form.pregnancy_birth_history.total_c_sections : (Number(form.pregnancy_birth_history.total_c_sections) || undefined),
          miscarriages: form.pregnancy_birth_history.miscarriages === 'yes',
          miscarriages_detail: form.pregnancy_birth_history.miscarriages_detail?.trim() || undefined,
          abortions: form.pregnancy_birth_history.abortions === 'yes',
          abortions_detail: form.pregnancy_birth_history.abortions_detail?.trim() || undefined,
        },
        delivery_history: form.delivery_history.map(d => ({
          delivery_date: d.delivery_date,
          gender: d.gender,
          birth_weight: d.birth_weight,
          delivery_type: d.delivery_type,
          hospital: d.hospital,
        })),
        pregnancy_medical: {
          anemia: yn(form.pregnancy_medical.anemia),
          severe_vomiting_3mo: yn(form.pregnancy_medical.severe_vomiting_3mo),
          bp_during_pregnancy: form.pregnancy_medical.bp_during_pregnancy?.trim() || undefined,
          preeclampsia: yn(form.pregnancy_medical.preeclampsia),
          gestational_diabetes: yn(form.pregnancy_medical.gestational_diabetes),
          hypertension_pregnancy: yn(form.pregnancy_medical.hypertension_pregnancy),
          blood_transfusion: yn(form.pregnancy_medical.blood_transfusion),
          seizures: yn(form.pregnancy_medical.seizures),
        },
        medical_health: {
          regular_menstrual_cycles: yn(form.medical_health.regular_menstrual_cycles),
          birth_control: yn(form.medical_health.birth_control),
          birth_control_type: form.medical_health.birth_control_type?.trim() || undefined,
          taking_medications: yn(form.medical_health.taking_medications),
          medications_list: form.medical_health.medications_list?.trim() || undefined,
          last_pap_smear: form.medical_health.last_pap_smear?.trim() || undefined,
          covid_vaccinated: yn(form.medical_health.covid_vaccinated),
          hep_b_vaccinated: yn(form.medical_health.hep_b_vaccinated),
          varicella_vaccinated: yn(form.medical_health.varicella_vaccinated),
          ongoing_medical_treatment: yn(form.medical_health.ongoing_medical_treatment),
          surgeries_past_2y: yn(form.medical_health.surgeries_past_2y),
          surgeries_specify: form.medical_health.surgeries_specify?.trim() || undefined,
        },
        mental_health: {
          anxiety_depression: yn(form.mental_health.anxiety_depression),
          bipolar_schizo_personality: yn(form.mental_health.bipolar_schizo_personality),
          adhd: yn(form.mental_health.adhd),
          meds_anxiety_depression: yn(form.mental_health.meds_anxiety_depression),
          meds_specify: form.mental_health.meds_specify?.trim() || undefined,
        },
        substance_use: {
          drug_use_pregnancy: yn(form.substance_use.drug_use_pregnancy),
          drug_marijuana: form.substance_use.drug_marijuana,
          drug_fentanyl: form.substance_use.drug_fentanyl,
          drug_methamphetamine: form.substance_use.drug_methamphetamine,
          drug_mdma: form.substance_use.drug_mdma,
          drug_other: form.substance_use.drug_other?.trim() || undefined,
          marijuana_current: yn(form.substance_use.marijuana_current),
          marijuana_last_use: form.substance_use.marijuana_last_use?.trim() || undefined,
          smoked_vaped_pregnancy: yn(form.substance_use.smoked_vaped_pregnancy),
          alcohol: yn(form.substance_use.alcohol),
          alcohol_frequency: form.substance_use.alcohol_frequency?.trim() || undefined,
        },
        infectious_disease: {
          syphilis: yn(form.infectious_disease.syphilis),
          hepatitis_b_c: yn(form.infectious_disease.hepatitis_b_c),
          genital_herpes: yn(form.infectious_disease.genital_herpes),
          hiv: yn(form.infectious_disease.hiv),
        },
        other_medical: {
          asthma: yn(form.other_medical.asthma),
          asthma_inhaler_per_week: form.other_medical.asthma_inhaler_per_week?.trim() || undefined,
          heart_conditions: yn(form.other_medical.heart_conditions),
          cancer_history: yn(form.other_medical.cancer_history),
          scoliosis: yn(form.other_medical.scoliosis),
          endometrial_ablation: yn(form.other_medical.endometrial_ablation),
        },
        preferences: {
          availability: form.preferences.availability?.trim() || undefined,
          health_insurance: form.preferences.health_insurance?.trim() || undefined,
          open_twins: yn(form.preferences.open_twins),
          open_fetal_reduction: yn(form.preferences.open_fetal_reduction),
          open_termination: yn(form.preferences.open_termination),
          open_amniocentesis_cvs: yn(form.preferences.open_amniocentesis_cvs),
          open_same_sex_single_ip: yn(form.preferences.open_same_sex_single_ip),
          willing_pump_breast_milk: yn(form.preferences.willing_pump_breast_milk),
          open_ip_hiv: yn(form.preferences.open_ip_hiv),
          open_ip_hepatitis_b: yn(form.preferences.open_ip_hepatitis_b),
        },
        legal_admin: {
          pending_legal: yn(form.legal_admin.pending_legal),
          criminal_record: yn(form.legal_admin.criminal_record),
          emergency_contact: form.legal_admin.emergency_contact?.trim() || undefined,
          government_assistance: yn(form.legal_admin.government_assistance),
        },
        notes: {
          referred_by: form.notes.referred_by?.trim() || undefined,
          medical_records_source: form.notes.medical_records_source || undefined,
        },
      },
      upload_photos: form.uploadPhotos.map(url => ({ name: '', url })),
    }
    const payload = { application_type: 'surrogate_mother', application_data: requestData }
    const response = await submitSurrogateApplication(payload)

    if (response?.data?.id && $fbPixel?.trackSubmitApplication) {
      try {
        await $fbPixel.trackSubmitApplication({
          content_name: 'Surrogate Mother Application',
          content_category: 'Application Form',
          content_ids: [String(response.data.id)],
          value: 0,
          currency: 'USD',
          status: true,
          applicationId: String(response.data.id),
          applicationType: 'surrogate_mother',
        })
      }
      catch (e) { console.warn('Facebook Pixel tracking failed:', e) }
    }

    modalConfig.type = 'success'
    modalConfig.titleKey = 'modal.success.surrogate.title'
    modalConfig.messageKey = 'modal.success.surrogate.message'
    modalConfig.buttonText = 'Finish'
    showModal.value = true
    setTimeout(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, 500)
    isSubmitting.value = false
  }
  catch (error: any) {
    console.error('Submission error:', error)
    modalConfig.type = 'error'
    modalConfig.titleKey = 'modal.error.title'
    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
      modalConfig.message = error.response.data.errors.map((err: any) =>
        err.field ? `${err.field}: ${err.message}` : err.message)
      modalConfig.messageKey = ''
    }
    else if (error.response?.data?.message) {
      modalConfig.message = error.response.data.message
      modalConfig.messageKey = ''
    }
    else if (error.message) {
      modalConfig.message = error.message
      modalConfig.messageKey = ''
    }
    else {
      modalConfig.messageKey = 'modal.error.unexpectedError'
      modalConfig.message = ''
    }
    modalConfig.buttonText = t('modal.error.tryAgain')
    showModal.value = true
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
        {{ $t('surrogate.application.pageTitle') }}
      </h1>
    </div>

    <!-- Main Content -->
    <div class="relative mx-auto mt-10 max-w-300 px-4 lg:px-0">
      <!-- Success Message -->
      <div class="mb-16 text-center lg:text-5">
        <h2 class="mb-8 text-8 font-semibold" style="font-family: var(--font-primary)">
          {{ $t('surrogate.application.congratulations.title') }}
        </h2>
        <p class="mx-auto mb-4 max-w-966px leading-relaxed">
          {{ $t('surrogate.application.congratulations.message1') }}
        </p>
        <p class="mx-auto mb-12 max-w-954px">
          {{ $t('surrogate.application.congratulations.message2') }}
        </p>
        <p class="mx-auto max-w-954px text-8 font-semibold" style="font-family: var(--font-primary)">
          {{ $t('surrogate.application.congratulations.thanks') }}
        </p>
      </div>

      <!-- Form Container -->
      <div class="mb-20 rounded-5 from-[var(--foot-bg)] via-[var(--light-cream)] to-[var(--foot-bg)] bg-gradient-to-b p-8 p-8 shadow-black/20 shadow-xl lg:p-12">
        <form data-allow-automatic-events="false" @submit.prevent="handleSubmit">
          <!-- I. General Information -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.generalInfo') }}
          </h3>
          <div class="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <FormInput v-model="form.general_info.full_name" :label="$t('surrogate.application.gcIntake.fullName')" required />
            <FormInput v-model="form.general_info.email" :label="$t('surrogate.application.gcIntake.email')" type="email" required />
            <FormPhoneInput
              v-model="form.general_info.phone"
              v-model:country-code="form.general_info.country_code"
              :label="$t('surrogate.application.gcIntake.phone')"
              required
              default-country="US"
            />
            <FormDatePicker v-model="form.general_info.dob" :label="$t('surrogate.application.gcIntake.dob')" required />
            <FormSelect
              v-model="form.general_info.state_of_residence"
              :label="$t('surrogate.application.gcIntake.stateOfResidence')"
              :options="states"
              :placeholder="states.length ? $t('surrogate.application.form.selectStateProvince') : $t('surrogate.application.form.noStatesAvailable')"
              required
            />
            <FormInput v-model="form.general_info.place_of_birth" :label="$t('surrogate.application.gcIntake.placeOfBirth')" />
            <FormInput v-model="form.general_info.home_address" :label="$t('surrogate.application.gcIntake.homeAddress')" class="lg:col-span-2" />
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
              <div>
                <label class="mb-4 block leading-6">{{ $t('surrogate.application.gcIntake.heightWeight') }} <span class="text-red-500">*</span></label>
                <div class="flex gap-2">
                  <input v-model="form.general_info.height_feet" type="number" min="4" max="7" placeholder="5" class="h-15 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]" />
                  <span class="flex items-center text-gray-600">{{ $t('surrogate.application.form.units.feet') }}</span>
                  <input v-model="form.general_info.height_inches" type="number" min="0" max="11" placeholder="6" class="h-15 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]" />
                  <span class="flex items-center text-gray-600">{{ $t('surrogate.application.form.units.inches') }}</span>
                </div>
              </div>
              <div>
                <label class="mb-4 block leading-6">{{ $t('surrogate.application.form.weight') }} <span class="text-red-500">*</span></label>
                <div class="flex gap-2">
                  <input v-model="form.general_info.weight" type="number" min="80" max="300" placeholder="140" class="h-15 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]" />
                  <span class="flex items-center text-gray-600">{{ $t('surrogate.application.form.units.pounds') }}</span>
                </div>
              </div>
            </div>
            <div>
              <label class="mb-4 block leading-6">{{ $t('surrogate.application.gcIntake.bmi') }}</label>
              <div class="flex gap-2">
                <input :value="calculatedBMI" type="text" readonly class="h-15 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.15)] px-3 bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5" />
              </div>
              <p class="mt-2 text-xs text-gray-500">{{ $t('surrogate.application.form.bmiAutoCalculated') }}</p>
            </div>
            <div>
              <p class="mb-4">{{ $t('surrogate.application.gcIntake.occupationSource') }} <span class="text-red-500">*</span></p>
              <div class="space-y-2">
                <FormRadio v-model="form.general_info.occupation_type" name="occupation_type" value="employed" :label="$t('surrogate.application.gcIntake.occupationEmployed')" />
                <FormRadio v-model="form.general_info.occupation_type" name="occupation_type" value="stay_at_home" :label="$t('surrogate.application.gcIntake.occupationStayAtHome')" />
                <FormRadio v-model="form.general_info.occupation_type" name="occupation_type" value="unemployed" :label="$t('surrogate.application.gcIntake.occupationUnemployed')" />
              </div>
              <FormInput v-if="form.general_info.occupation_type === 'employed' || form.general_info.occupation_type === 'unemployed'" v-model="form.general_info.occupation_specify" class="mt-4" />
            </div>
            <div>
              <p class="mb-4">{{ $t('surrogate.application.gcIntake.maritalStatus') }} <span class="text-red-500">*</span></p>
              <div class="flex flex-wrap gap-4">
                <FormRadio v-model="form.general_info.marital_status" name="marital_status" value="married" :label="$t('surrogate.application.gcIntake.maritalMarried')" />
                <FormRadio v-model="form.general_info.marital_status" name="marital_status" value="single" :label="$t('surrogate.application.gcIntake.maritalSingle')" />
                <FormRadio v-model="form.general_info.marital_status" name="marital_status" value="cohabitating" :label="$t('surrogate.application.gcIntake.maritalCohabitating')" />
                <FormRadio v-model="form.general_info.marital_status" name="marital_status" value="divorced" :label="$t('surrogate.application.gcIntake.maritalDivorced')" />
              </div>
              <FormInput v-if="form.general_info.marital_status === 'single'" v-model="form.general_info.single_partner_info" :label="$t('surrogate.application.gcIntake.singlePartnerInfo')" class="mt-4" />
            </div>
            <div>
              <p class="mb-4">{{ $t('surrogate.application.gcIntake.usCitizenOrResident') }} <span class="text-red-500">*</span></p>
              <div class="flex gap-8">
                <FormRadio v-model="form.general_info.us_citizen_or_resident" name="us_citizen" value="yes" :label="$t('surrogate.application.form.yes')" />
                <FormRadio v-model="form.general_info.us_citizen_or_resident" name="us_citizen" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
          </div>

          <!-- II. Pregnancy & Birth History -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.pregnancyBirthHistory') }}
          </h3>
          <div class="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <FormInput v-model="form.pregnancy_birth_history.total_children" :label="$t('surrogate.application.gcIntake.totalChildren')" type="number" />
            <FormInput v-model="form.pregnancy_birth_history.total_vaginal" :label="$t('surrogate.application.gcIntake.totalVaginal')" type="number" />
            <FormInput v-model="form.pregnancy_birth_history.total_c_sections" :label="$t('surrogate.application.gcIntake.totalCSections')" type="number" />
            <div>
              <p class="mb-4">{{ $t('surrogate.application.gcIntake.miscarriages') }}</p>
              <div class="flex gap-8">
                <FormRadio v-model="form.pregnancy_birth_history.miscarriages" name="miscarriages" value="no" :label="$t('surrogate.application.form.no')" />
                <FormRadio v-model="form.pregnancy_birth_history.miscarriages" name="miscarriages" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
              <FormInput v-if="form.pregnancy_birth_history.miscarriages === 'yes'" v-model="form.pregnancy_birth_history.miscarriages_detail" :label="$t('surrogate.application.gcIntake.miscarriagesDetail')" class="mt-4" />
            </div>
            <div>
              <p class="mb-4">{{ $t('surrogate.application.gcIntake.abortions') }}</p>
              <div class="flex gap-8">
                <FormRadio v-model="form.pregnancy_birth_history.abortions" name="abortions" value="no" :label="$t('surrogate.application.form.no')" />
                <FormRadio v-model="form.pregnancy_birth_history.abortions" name="abortions" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
              <FormInput v-if="form.pregnancy_birth_history.abortions === 'yes'" v-model="form.pregnancy_birth_history.abortions_detail" :label="$t('surrogate.application.gcIntake.abortionsDetail')" class="mt-4" />
            </div>
          </div>

          <!-- III. Delivery History -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.deliveryHistory') }}
          </h3>
          <div class="mb-16 space-y-6">
            <div v-for="(d, idx) in form.delivery_history" :key="idx" class="rounded-3 bg-[rgba(234,232,208,0.15)] p-6 shadow">
              <div class="mb-4 flex items-center justify-between">
                <h4 class="text-5 font-semibold">{{ $t('surrogate.application.gcIntake.babyNum', { n: idx + 1 }) }}</h4>
                <button type="button" class="rounded-2 bg-[var(--grayish-green)] px-4 py-2 text-white text-4 transition hover:opacity-90" @click="removeDelivery(idx)">
                  {{ $t('surrogate.application.gcIntake.removeDelivery') }}
                </button>
              </div>
              <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
                <FormDatePicker v-model="d.delivery_date" :label="$t('surrogate.application.gcIntake.deliveryDate')" />
                <FormInput v-model="d.gender" :label="$t('surrogate.application.gcIntake.gender')" />
                <FormInput v-model="d.birth_weight" :label="$t('surrogate.application.gcIntake.birthWeight')" />
                <FormInput v-model="d.delivery_type" :label="$t('surrogate.application.gcIntake.deliveryType')" />
                <FormInput v-model="d.hospital" :label="$t('surrogate.application.gcIntake.deliveryHospital')" class="lg:col-span-2" />
              </div>
            </div>
            <button type="button" class="rounded-2 bg-[var(--grayish-green)] px-8 py-3 text-white font-bold shadow transition hover:opacity-90" @click="addDelivery">
              <svg width="18" height="18" fill="none" viewBox="0 0 18 18" class="mr-2 inline align-middle"><path d="M9 2v14M2 9h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
              {{ $t('surrogate.application.gcIntake.addDelivery') }}
            </button>
          </div>

          <!-- IV. Pregnancy-Related Medical History -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.pregnancyMedical') }}
          </h3>
          <p class="mb-4 text-sage-700">{{ $t('surrogate.application.gcIntake.pregMedicalIntro') }}</p>
          <div class="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.anemia') }}</p><div class="flex gap-8"><FormRadio v-model="form.pregnancy_medical.anemia" name="anemia" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.pregnancy_medical.anemia" name="anemia" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.severeVomiting3mo') }}</p><div class="flex gap-8"><FormRadio v-model="form.pregnancy_medical.severe_vomiting_3mo" name="severeVomiting" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.pregnancy_medical.severe_vomiting_3mo" name="severeVomiting" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <FormInput v-model="form.pregnancy_medical.bp_during_pregnancy" :label="$t('surrogate.application.gcIntake.bpDuringPregnancy')" />
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.preeclampsia') }} <span class="text-xs text-gray-500">{{ $t('surrogate.application.gcIntake.preeclampsiaNote') }}</span></p><div class="flex gap-8"><FormRadio v-model="form.pregnancy_medical.preeclampsia" name="preeclampsia" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.pregnancy_medical.preeclampsia" name="preeclampsia" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.gestationalDiabetes') }}</p><div class="flex gap-8"><FormRadio v-model="form.pregnancy_medical.gestational_diabetes" name="gestDiabetes" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.pregnancy_medical.gestational_diabetes" name="gestDiabetes" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.hypertensionPregnancy') }}</p><div class="flex gap-8"><FormRadio v-model="form.pregnancy_medical.hypertension_pregnancy" name="hypPreg" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.pregnancy_medical.hypertension_pregnancy" name="hypPreg" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.bloodTransfusion') }}</p><div class="flex gap-8"><FormRadio v-model="form.pregnancy_medical.blood_transfusion" name="bloodTrans" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.pregnancy_medical.blood_transfusion" name="bloodTrans" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.seizures') }}</p><div class="flex gap-8"><FormRadio v-model="form.pregnancy_medical.seizures" name="seizures" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.pregnancy_medical.seizures" name="seizures" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
          </div>

          <!-- V. Medical & Health -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">{{ $t('surrogate.application.gcIntake.sections.medicalHealth') }}</h3>
          <div class="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.regularMenstrualCycles') }}</p><div class="flex gap-8"><FormRadio v-model="form.medical_health.regular_menstrual_cycles" name="regularCycles" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.medical_health.regular_menstrual_cycles" name="regularCycles" value="no" :label="$t('surrogate.application.form.no')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.birthControl') }}</p><div class="flex gap-8"><FormRadio v-model="form.medical_health.birth_control" name="birthControl" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.medical_health.birth_control" name="birthControl" value="yes" :label="$t('surrogate.application.form.yes')" /></div><FormInput v-if="form.medical_health.birth_control === 'yes'" v-model="form.medical_health.birth_control_type" :label="$t('surrogate.application.gcIntake.birthControlType')" class="mt-4" /></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.takingMedications') }}</p><div class="flex gap-8"><FormRadio v-model="form.medical_health.taking_medications" name="takingMeds" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.medical_health.taking_medications" name="takingMeds" value="yes" :label="$t('surrogate.application.form.yes')" /></div><FormInput v-if="form.medical_health.taking_medications === 'yes'" v-model="form.medical_health.medications_list" :label="$t('surrogate.application.gcIntake.medicationsList')" class="mt-4" /></div>
            <FormInput v-model="form.medical_health.last_pap_smear" :label="$t('surrogate.application.gcIntake.lastPapSmear')" />
            <p class="text-xs text-gray-500 lg:col-span-2">{{ $t('surrogate.application.gcIntake.papSmearNote') }}</p>
            <p class="text-sm text-sage-700 lg:col-span-2">{{ $t('surrogate.application.gcIntake.vaccinationIntro') }}</p>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.covidVaccinated') }}</p><div class="flex gap-8"><FormRadio v-model="form.medical_health.covid_vaccinated" name="covid" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.medical_health.covid_vaccinated" name="covid" value="no" :label="$t('surrogate.application.form.no')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.hepBVaccinated') }}</p><div class="flex gap-8"><FormRadio v-model="form.medical_health.hep_b_vaccinated" name="hepb" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.medical_health.hep_b_vaccinated" name="hepb" value="no" :label="$t('surrogate.application.form.no')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.varicellaVaccinated') }}</p><div class="flex gap-8"><FormRadio v-model="form.medical_health.varicella_vaccinated" name="varicella" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.medical_health.varicella_vaccinated" name="varicella" value="no" :label="$t('surrogate.application.form.no')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.ongoingMedicalTreatment') }}</p><div class="flex gap-8"><FormRadio v-model="form.medical_health.ongoing_medical_treatment" name="ongoingTx" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.medical_health.ongoing_medical_treatment" name="ongoingTx" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.surgeriesPast2y') }}</p><div class="flex gap-8"><FormRadio v-model="form.medical_health.surgeries_past_2y" name="surgeries2y" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.medical_health.surgeries_past_2y" name="surgeries2y" value="yes" :label="$t('surrogate.application.form.yes')" /></div><FormInput v-if="form.medical_health.surgeries_past_2y === 'yes'" v-model="form.medical_health.surgeries_specify" :label="$t('surrogate.application.gcIntake.surgeriesSpecify')" class="mt-4" /></div>
          </div>

          <!-- VI. Mental Health -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">{{ $t('surrogate.application.gcIntake.sections.mentalHealth') }}</h3>
          <p class="mb-4 text-sage-700">{{ $t('surrogate.application.gcIntake.mentalHealthIntro') }}</p>
          <div class="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.anxietyDepression') }}</p><div class="flex gap-8"><FormRadio v-model="form.mental_health.anxiety_depression" name="anxDep" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.mental_health.anxiety_depression" name="anxDep" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.bipolarSchizoPersonality') }}</p><div class="flex gap-8"><FormRadio v-model="form.mental_health.bipolar_schizo_personality" name="bipolar" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.mental_health.bipolar_schizo_personality" name="bipolar" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.adhd') }}</p><div class="flex gap-8"><FormRadio v-model="form.mental_health.adhd" name="adhd" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.mental_health.adhd" name="adhd" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.medsAnxietyDepression') }}</p><div class="flex gap-8"><FormRadio v-model="form.mental_health.meds_anxiety_depression" name="medsAnx" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.mental_health.meds_anxiety_depression" name="medsAnx" value="yes" :label="$t('surrogate.application.form.yes')" /></div><FormInput v-if="form.mental_health.meds_anxiety_depression === 'yes'" v-model="form.mental_health.meds_specify" :label="$t('surrogate.application.gcIntake.medsSpecify')" class="mt-4" /></div>
          </div>

          <!-- VII. Substance Use -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">{{ $t('surrogate.application.gcIntake.sections.substanceUse') }}</h3>
          <div class="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.drugUsePregnancy') }}</p><div class="flex gap-8"><FormRadio v-model="form.substance_use.drug_use_pregnancy" name="drugPreg" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.substance_use.drug_use_pregnancy" name="drugPreg" value="yes" :label="$t('surrogate.application.form.yes')" /></div><div v-if="form.substance_use.drug_use_pregnancy === 'yes'" class="mt-4 space-y-2"><p class="text-sm text-sage-700">{{ $t('surrogate.application.gcIntake.drugTypes') }}</p><div class="flex flex-wrap gap-4"><FormCheckbox v-model="form.substance_use.drug_marijuana" :label="$t('surrogate.application.gcIntake.drugMarijuana')" /><FormCheckbox v-model="form.substance_use.drug_fentanyl" :label="$t('surrogate.application.gcIntake.drugFentanyl')" /><FormCheckbox v-model="form.substance_use.drug_methamphetamine" :label="$t('surrogate.application.gcIntake.drugMethamphetamine')" /><FormCheckbox v-model="form.substance_use.drug_mdma" :label="$t('surrogate.application.gcIntake.drugMDMA')" /><FormInput v-model="form.substance_use.drug_other" :label="$t('surrogate.application.gcIntake.drugOther')" /></div></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.marijuanaCurrent') }}</p><div class="flex gap-8"><FormRadio v-model="form.substance_use.marijuana_current" name="marijuanaNow" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.substance_use.marijuana_current" name="marijuanaNow" value="yes" :label="$t('surrogate.application.form.yes')" /></div><FormInput v-if="form.substance_use.marijuana_current === 'yes'" v-model="form.substance_use.marijuana_last_use" :label="$t('surrogate.application.gcIntake.marijuanaLastUse')" class="mt-4" /></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.smokedVapedPregnancy') }}</p><div class="flex gap-8"><FormRadio v-model="form.substance_use.smoked_vaped_pregnancy" name="smokedPreg" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.substance_use.smoked_vaped_pregnancy" name="smokedPreg" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.alcohol') }}</p><div class="flex gap-8"><FormRadio v-model="form.substance_use.alcohol" name="alcohol" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.substance_use.alcohol" name="alcohol" value="yes" :label="$t('surrogate.application.form.yes')" /></div><FormInput v-if="form.substance_use.alcohol === 'yes'" v-model="form.substance_use.alcohol_frequency" :label="$t('surrogate.application.gcIntake.alcoholFrequency')" class="mt-4" /></div>
          </div>

          <!-- VIII. Infectious Disease -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">{{ $t('surrogate.application.gcIntake.sections.infectiousDisease') }}</h3>
          <p class="mb-4 text-sage-700">{{ $t('surrogate.application.gcIntake.infectiousIntro') }}</p>
          <div class="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.syphilis') }}</p><div class="flex gap-8"><FormRadio v-model="form.infectious_disease.syphilis" name="syphilis" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.infectious_disease.syphilis" name="syphilis" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.hepatitisBC') }}</p><div class="flex gap-8"><FormRadio v-model="form.infectious_disease.hepatitis_b_c" name="hepbac" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.infectious_disease.hepatitis_b_c" name="hepbac" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.genitalHerpes') }}</p><div class="flex gap-8"><FormRadio v-model="form.infectious_disease.genital_herpes" name="herpes" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.infectious_disease.genital_herpes" name="herpes" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.hiv') }}</p><div class="flex gap-8"><FormRadio v-model="form.infectious_disease.hiv" name="hiv" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.infectious_disease.hiv" name="hiv" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
          </div>

          <!-- IX. Other Medical -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">{{ $t('surrogate.application.gcIntake.sections.otherMedical') }}</h3>
          <div class="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.asthma') }}</p><div class="flex gap-8"><FormRadio v-model="form.other_medical.asthma" name="asthma" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.other_medical.asthma" name="asthma" value="yes" :label="$t('surrogate.application.form.yes')" /></div><FormInput v-if="form.other_medical.asthma === 'yes'" v-model="form.other_medical.asthma_inhaler_per_week" :label="$t('surrogate.application.gcIntake.asthmaInhaler')" class="mt-4" /></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.heartConditions') }}</p><div class="flex gap-8"><FormRadio v-model="form.other_medical.heart_conditions" name="heart" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.other_medical.heart_conditions" name="heart" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.cancerHistory') }}</p><div class="flex gap-8"><FormRadio v-model="form.other_medical.cancer_history" name="cancer" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.other_medical.cancer_history" name="cancer" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.scoliosis') }}</p><div class="flex gap-8"><FormRadio v-model="form.other_medical.scoliosis" name="scoliosis" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.other_medical.scoliosis" name="scoliosis" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.endometrialAblation') }}</p><div class="flex gap-8"><FormRadio v-model="form.other_medical.endometrial_ablation" name="endoAbl" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.other_medical.endometrial_ablation" name="endoAbl" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
          </div>

          <!-- X. Preferences -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">{{ $t('surrogate.application.gcIntake.sections.preferences') }}</h3>
          <div class="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <FormInput v-model="form.preferences.availability" :label="$t('surrogate.application.gcIntake.availability')" />
            <FormInput v-model="form.preferences.health_insurance" :label="$t('surrogate.application.gcIntake.healthInsurance')" />
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.openTwins') }}</p><div class="flex gap-8"><FormRadio v-model="form.preferences.open_twins" name="openTwins" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.open_twins" name="openTwins" value="no" :label="$t('surrogate.application.form.no')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.openFetalReduction') }}</p><div class="flex gap-8"><FormRadio v-model="form.preferences.open_fetal_reduction" name="openRed" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.open_fetal_reduction" name="openRed" value="no" :label="$t('surrogate.application.form.no')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.openTermination') }}</p><div class="flex gap-8"><FormRadio v-model="form.preferences.open_termination" name="openTerm" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.open_termination" name="openTerm" value="no" :label="$t('surrogate.application.form.no')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.openAmniocentesisCVS') }}</p><div class="flex gap-8"><FormRadio v-model="form.preferences.open_amniocentesis_cvs" name="openCVS" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.open_amniocentesis_cvs" name="openCVS" value="no" :label="$t('surrogate.application.form.no')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.openSameSexSingleIP') }}</p><div class="flex gap-8"><FormRadio v-model="form.preferences.open_same_sex_single_ip" name="openSS" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.open_same_sex_single_ip" name="openSS" value="no" :label="$t('surrogate.application.form.no')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.willingPumpBreastMilk') }}</p><div class="flex gap-8"><FormRadio v-model="form.preferences.willing_pump_breast_milk" name="pump" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.willing_pump_breast_milk" name="pump" value="no" :label="$t('surrogate.application.form.no')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.openIPHIV') }}</p><div class="flex gap-8"><FormRadio v-model="form.preferences.open_ip_hiv" name="ipHiv" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.open_ip_hiv" name="ipHiv" value="no" :label="$t('surrogate.application.form.no')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.openIPHepatitisB') }}</p><div class="flex gap-8"><FormRadio v-model="form.preferences.open_ip_hepatitis_b" name="ipHep" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.open_ip_hepatitis_b" name="ipHep" value="no" :label="$t('surrogate.application.form.no')" /></div></div>
          </div>

          <!-- XI. Legal & Administrative -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">{{ $t('surrogate.application.gcIntake.sections.legalAdmin') }}</h3>
          <div class="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.pendingLegal') }}</p><div class="flex gap-8"><FormRadio v-model="form.legal_admin.pending_legal" name="pendingLegal" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.legal_admin.pending_legal" name="pendingLegal" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.criminalRecord') }}</p><div class="flex gap-8"><FormRadio v-model="form.legal_admin.criminal_record" name="criminalRec" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.legal_admin.criminal_record" name="criminalRec" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
            <FormInput v-model="form.legal_admin.emergency_contact" :label="$t('surrogate.application.gcIntake.emergencyContact')" class="lg:col-span-2" />
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.governmentAssistance') }}</p><div class="flex gap-8"><FormRadio v-model="form.legal_admin.government_assistance" name="govAssist" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.legal_admin.government_assistance" name="govAssist" value="yes" :label="$t('surrogate.application.form.yes')" /></div></div>
          </div>

          <!-- XII. Notes -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">{{ $t('surrogate.application.gcIntake.sections.notes') }}</h3>
          <div class="mb-16 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <FormInput v-model="form.notes.referred_by" :label="$t('surrogate.application.gcIntake.referredBy')" />
            <div><p class="mb-4">{{ $t('surrogate.application.gcIntake.medicalRecordsSource') }}</p><div class="flex flex-wrap gap-4"><FormRadio v-model="form.notes.medical_records_source" name="medRecSrc" value="patient_portal" :label="$t('surrogate.application.gcIntake.medicalRecordsPatientPortal')" /><FormRadio v-model="form.notes.medical_records_source" name="medRecSrc" value="clinic" :label="$t('surrogate.application.gcIntake.medicalRecordsClinic')" /><FormRadio v-model="form.notes.medical_records_source" name="medRecSrc" value="other" :label="$t('surrogate.application.gcIntake.medicalRecordsOther')" /></div></div>
          </div>

          <!-- 上传照片 Upload Photos (minimum 2) -->
          <h3 class="mb-8 text-6 font-semibold">
            {{ $t('surrogate.application.sections.uploadPhotos') }} <span class="text-red-500">*</span>
          </h3>
          <div class="mb-16 space-y-6">
            <!-- 预览区在上传区上方 -->
            <div v-if="form.uploadPhotos && form.uploadPhotos.length">
              <div class="mb-6 flex flex-wrap gap-6">
                <div v-for="(photo, idx) in form.uploadPhotos" :key="idx" class="group relative">
                  <img :src="photo" class="h-32 w-32 border border-gray-200 rounded-3 object-cover shadow-md transition-transform duration-200 group-hover:scale-105">
                  <button type="button" class="absolute right-2 top-2 h-7 w-7 flex items-center justify-center rounded-full bg-black/60 text-white transition hover:bg-red-500" title="删除" style="box-shadow: 0 2px 8px rgba(0,0,0,0.12);" @click.stop="removePhoto(idx)">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
                  </button>
                </div>
              </div>
              <p v-if="form.uploadPhotos.length < 2" class="mb-2 text-red-500">
                {{ $t('surrogate.application.form.uploadPhotosMinTip') }}
              </p>
            </div>
            <!-- 上传区域 -->
            <div
              class="group relative flex flex-col cursor-pointer items-center justify-center border-2 border-[var(--grayish-green)] rounded-4 border-dashed py-12 shadow-sm transition hover:border-[var(--grayish-green)] hover:bg-[rgba(234,232,208,0.25)]"
              @dragover.prevent
              @drop.prevent="handleDrop"
              @click="fileInputRef?.click()"
            >
              <span class="mb-4 block text-8 text-[var(--grayish-green)] opacity-60">+</span>
              <span class="text-5 text-gray-600 transition group-hover:text-[var(--grayish-green)]">{{ $t('surrogate.application.form.uploadPhotosTip') }}</span>
              <input ref="fileInputRef" type="file" multiple accept="image/*" class="hidden" @change="onPhotoChange">
            </div>
          </div>
          <!-- Final Consent Section -->
          <div class="mb-12">
            <h4 class="mb-4 font-normal">
              {{ $t('surrogate.application.sections.consent') }}
            </h4>
            <FormCheckbox
              v-model="form.finalConsent"
              :label="$t('surrogate.application.form.finalConsent.text')"
            />
            <p class="mt-4 text-13px italic">
              {{ $t('surrogate.application.form.finalConsent.disclaimer') }}
            </p>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-center">
            <button
              type="submit"
              :disabled="!form.finalConsent || isSubmitting"
              class="rounded-2.5 bg-[var(--grayish-green)] px-12 py-4 text-20px text-[#FFFCF6] font-semibold shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] backdrop-blur-5 transition-opacity"
              :class="form.finalConsent && !isSubmitting ? 'hover:opacity-90 cursor-pointer' : 'opacity-50 cursor-not-allowed'"
            >
              {{ isSubmitting ? $t('parent.application.form.submittingButton') : $t('surrogate.application.form.submitButton') }}
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
      :title="modalConfig.titleKey ? $t(modalConfig.titleKey) : ''"
      :message="modalConfig.messageKey ? $t(modalConfig.messageKey, modalConfig.fieldLabel ? { field: modalConfig.fieldLabel ? $t(modalConfig.fieldLabel) : '' } : {}) : (modalConfig.message || '')"
      :button-text="modalConfig.buttonText"
    />
  </div>
</template>

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
import { Ethnicity } from '~/types/api'
import { uploadFilesToQiniu } from '~/utils/qiniuDirectUpload'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

const emptyDelivery = () => ({ delivery_date: '', gender: '', birth_weight: '', number_of_weeks: '', delivery_type: '', hospital: '' })

type EthnicityOptionKey
  = | 'asian'
    | 'white'
    | 'black'
    | 'hispanic'
    | 'middleEastern'
    | 'nativeAmerican'
    | 'pacificIslander'
    | 'mixedRace'
    | 'preferNotToSay'
    | 'other'

type EthnicitySelections = {
  [K in EthnicityOptionKey]: boolean
} & { otherText: string }

const emptyEthnicitySelections: EthnicitySelections = {
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
}

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
    ethnicity: { ...emptyEthnicitySelections },
  },
  pregnancy_birth_history: {
    total_children: '' as number | '',
    total_vaginal: '' as number | '',
    total_c_sections: '' as number | '',
    miscarriages: '' as '' | 'yes' | 'no',
    miscarriages_detail: '',
    abortions: '' as '' | 'yes' | 'no',
    abortions_detail: '',
    been_surrogate_before: '' as '' | 'yes' | 'no',
    been_surrogate_when: '',
  },
  delivery_history: [] as Array<{ delivery_date: string, gender: string, birth_weight: string, number_of_weeks: string, delivery_type: string, hospital: string }>,
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

const MAX_DELIVERY_HISTORY = 10
function addDelivery() {
  if (form.delivery_history.length >= MAX_DELIVERY_HISTORY)
    return
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

const ethnicityValueMap: Record<EthnicityOptionKey, { label: string, key: Ethnicity }> = {
  asian: { label: 'Asian', key: Ethnicity.ASIAN },
  white: { label: 'White / Caucasian', key: Ethnicity.WHITE },
  black: { label: 'Black / African American', key: Ethnicity.BLACK },
  hispanic: { label: 'Hispanic / Latino / Latina / Latinx', key: Ethnicity.HISPANIC },
  middleEastern: { label: 'Middle Eastern', key: Ethnicity.MIDDLE_EASTERN },
  nativeAmerican: { label: 'Native American / Alaska Native', key: Ethnicity.NATIVE_AMERICAN },
  pacificIslander: { label: 'Pacific Islander', key: Ethnicity.PACIFIC_ISLANDER },
  mixedRace: { label: 'Mixed Race', key: Ethnicity.MIXED_RACE },
  preferNotToSay: { label: 'Prefer not to say', key: Ethnicity.PREFER_NOT_TO_SAY },
  other: { label: 'Other', key: Ethnicity.OTHER },
}

function buildEthnicityPayload() {
  const selections = form.general_info.ethnicity as EthnicitySelections
  const labels: string[] = []
  const keys: Ethnicity[] = []

  for (const key of Object.keys(ethnicityValueMap) as EthnicityOptionKey[]) {
    if (!selections[key])
      continue

    if (key === 'other') {
      labels.push(selections.otherText?.trim() || ethnicityValueMap[key].label)
    }
    else {
      labels.push(ethnicityValueMap[key].label)
    }
    keys.push(ethnicityValueMap[key].key)
  }

  return { labels, keys }
}

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

interface RequiredField {
  value: unknown
  label: string
  validator?: (value: unknown) => boolean
}

function isEmptyValue(value: unknown) {
  if (value === null || value === undefined)
    return true
  if (typeof value === 'string')
    return value.trim() === ''
  if (Array.isArray(value))
    return value.length === 0
  return false
}

// 校验失败时跳转到的板块 ID 映射（labelKey -> section id）
const SECTION_IDS_BY_LABEL: Record<string, string> = {
  'surrogate.application.gcIntake.fullName': 'section-general',
  'surrogate.application.gcIntake.email': 'section-general',
  'surrogate.application.gcIntake.phone': 'section-general',
  'surrogate.application.gcIntake.dob': 'section-general',
  'surrogate.application.gcIntake.stateOfResidence': 'section-general',
  'surrogate.application.gcIntake.maritalStatus': 'section-general',
  'surrogate.application.gcIntake.usCitizenOrResident': 'section-general',
  'surrogate.application.gcIntake.occupationSource': 'section-general',
  'surrogate.application.gcIntake.singlePartnerInfo': 'section-general',
  'surrogate.application.gcIntake.heightWeight': 'section-general',
  'surrogate.application.gcIntake.ethnicity.label': 'section-general',
  'surrogate.application.gcIntake.ethnicity.options.other': 'section-general',
  'surrogate.application.gcIntake.totalChildren': 'section-pregnancy-birth',
  'surrogate.application.gcIntake.totalVaginal': 'section-pregnancy-birth',
  'surrogate.application.gcIntake.totalCSections': 'section-pregnancy-birth',
  'surrogate.application.gcIntake.miscarriages': 'section-pregnancy-birth',
  'surrogate.application.gcIntake.miscarriagesDetail': 'section-pregnancy-birth',
  'surrogate.application.gcIntake.abortions': 'section-pregnancy-birth',
  'surrogate.application.gcIntake.abortionsDetail': 'section-pregnancy-birth',
  'surrogate.application.gcIntake.beenSurrogateBefore': 'section-delivery',
  'surrogate.application.gcIntake.beenSurrogateWhen': 'section-delivery',
  'surrogate.application.gcIntake.deliveryTable': 'section-delivery',
  'surrogate.application.gcIntake.deliveryDate': 'section-delivery',
  'surrogate.application.gcIntake.gender': 'section-delivery',
  'surrogate.application.gcIntake.birthWeight': 'section-delivery',
  'surrogate.application.gcIntake.numberOfWeeks': 'section-delivery',
  'surrogate.application.gcIntake.deliveryType': 'section-delivery',
  'surrogate.application.gcIntake.deliveryHospital': 'section-delivery',
  'surrogate.application.gcIntake.anemia': 'section-pregnancy-medical',
  'surrogate.application.gcIntake.severeVomiting3mo': 'section-pregnancy-medical',
  'surrogate.application.gcIntake.bpDuringPregnancy': 'section-pregnancy-medical',
  'surrogate.application.gcIntake.preeclampsia': 'section-pregnancy-medical',
  'surrogate.application.gcIntake.gestationalDiabetes': 'section-pregnancy-medical',
  'surrogate.application.gcIntake.hypertensionPregnancy': 'section-pregnancy-medical',
  'surrogate.application.gcIntake.bloodTransfusion': 'section-pregnancy-medical',
  'surrogate.application.gcIntake.seizures': 'section-pregnancy-medical',
  'surrogate.application.gcIntake.regularMenstrualCycles': 'section-medical-health',
  'surrogate.application.gcIntake.birthControl': 'section-medical-health',
  'surrogate.application.gcIntake.takingMedications': 'section-medical-health',
  'surrogate.application.gcIntake.lastPapSmear': 'section-medical-health',
  'surrogate.application.gcIntake.covidVaccinated': 'section-medical-health',
  'surrogate.application.gcIntake.hepBVaccinated': 'section-medical-health',
  'surrogate.application.gcIntake.varicellaVaccinated': 'section-medical-health',
  'surrogate.application.gcIntake.ongoingMedicalTreatment': 'section-medical-health',
  'surrogate.application.gcIntake.surgeriesPast2y': 'section-medical-health',
  'surrogate.application.gcIntake.birthControlType': 'section-medical-health',
  'surrogate.application.gcIntake.medicationsList': 'section-medical-health',
  'surrogate.application.gcIntake.surgeriesSpecify': 'section-medical-health',
  'surrogate.application.gcIntake.anxietyDepression': 'section-mental-health',
  'surrogate.application.gcIntake.bipolarSchizoPersonality': 'section-mental-health',
  'surrogate.application.gcIntake.adhd': 'section-mental-health',
  'surrogate.application.gcIntake.medsAnxietyDepression': 'section-mental-health',
  'surrogate.application.gcIntake.medsSpecify': 'section-mental-health',
  'surrogate.application.gcIntake.drugUsePregnancy': 'section-substance-use',
  'surrogate.application.gcIntake.drugTypes': 'section-substance-use',
  'surrogate.application.gcIntake.marijuanaCurrent': 'section-substance-use',
  'surrogate.application.gcIntake.marijuanaLastUse': 'section-substance-use',
  'surrogate.application.gcIntake.smokedVapedPregnancy': 'section-substance-use',
  'surrogate.application.gcIntake.alcohol': 'section-substance-use',
  'surrogate.application.gcIntake.alcoholFrequency': 'section-substance-use',
  'surrogate.application.gcIntake.syphilis': 'section-infectious',
  'surrogate.application.gcIntake.hepatitisBC': 'section-infectious',
  'surrogate.application.gcIntake.genitalHerpes': 'section-infectious',
  'surrogate.application.gcIntake.hiv': 'section-infectious',
  'surrogate.application.gcIntake.asthma': 'section-other-medical',
  'surrogate.application.gcIntake.asthmaInhaler': 'section-other-medical',
  'surrogate.application.gcIntake.heartConditions': 'section-other-medical',
  'surrogate.application.gcIntake.cancerHistory': 'section-other-medical',
  'surrogate.application.gcIntake.scoliosis': 'section-other-medical',
  'surrogate.application.gcIntake.endometrialAblation': 'section-other-medical',
  'surrogate.application.gcIntake.availability': 'section-preferences',
  'surrogate.application.gcIntake.healthInsurance': 'section-preferences',
  'surrogate.application.gcIntake.openTwins': 'section-preferences',
  'surrogate.application.gcIntake.openFetalReduction': 'section-preferences',
  'surrogate.application.gcIntake.openTermination': 'section-preferences',
  'surrogate.application.gcIntake.openAmniocentesisCVS': 'section-preferences',
  'surrogate.application.gcIntake.openSameSexSingleIP': 'section-preferences',
  'surrogate.application.gcIntake.willingPumpBreastMilk': 'section-preferences',
  'surrogate.application.gcIntake.openIPHIV': 'section-preferences',
  'surrogate.application.gcIntake.openIPHepatitisB': 'section-preferences',
  'surrogate.application.gcIntake.pendingLegal': 'section-legal',
  'surrogate.application.gcIntake.criminalRecord': 'section-legal',
  'surrogate.application.gcIntake.emergencyContact': 'section-legal',
  'surrogate.application.gcIntake.governmentAssistance': 'section-legal',
  'surrogate.application.gcIntake.referredBy': 'section-notes',
  'surrogate.application.gcIntake.medicalRecordsSource': 'section-notes',
}

function showMissingFieldError(labelKey: string) {
  modalConfig.type = 'error'
  modalConfig.titleKey = 'modal.error.required.title'
  modalConfig.messageKey = 'modal.error.required.message'
  modalConfig.buttonText = t('modal.error.ok')
  modalConfig.fieldLabel = labelKey
  showModal.value = true
  const sectionId = SECTION_IDS_BY_LABEL[labelKey]
  if (sectionId) {
    nextTick(() => {
      const el = document.getElementById(sectionId)
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }
}

function validateRequiredFields(fields: RequiredField[]) {
  for (const field of fields) {
    const isValid = field.validator ? field.validator(field.value) : !isEmptyValue(field.value)
    if (!isValid) {
      showMissingFieldError(field.label)
      return false
    }
  }
  return true
}

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

const MAX_UPLOAD_PHOTOS = 10
async function onPhotoChange(e: Event) {
  const files = (e.target as HTMLInputElement)?.files
  if (!files || files.length === 0)
    return
  if (form.uploadPhotos.length >= MAX_UPLOAD_PHOTOS) {
    modalConfig.type = 'error'
    modalConfig.titleKey = ''
    modalConfig.messageKey = 'surrogate.application.form.uploadPhotosMaxTip'
    modalConfig.message = ''
    modalConfig.buttonText = t('modal.error.ok')
    showModal.value = true
    return
  }
  uploadingPhotos.value = true
  try {
    const urls = await uploadImages(Array.from(files))
    const remain = MAX_UPLOAD_PHOTOS - form.uploadPhotos.length
    form.uploadPhotos.push(...urls.slice(0, remain))
    if (urls.length > remain) {
      modalConfig.type = 'error'
      modalConfig.titleKey = ''
      modalConfig.messageKey = 'surrogate.application.form.uploadPhotosMaxTip'
      modalConfig.message = ''
      modalConfig.buttonText = t('modal.error.ok')
      showModal.value = true
    }
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
  if (form.uploadPhotos.length >= MAX_UPLOAD_PHOTOS)
    return
  uploadingPhotos.value = true
  try {
    const urls = await uploadImages(imageFiles)
    const remain = MAX_UPLOAD_PHOTOS - form.uploadPhotos.length
    form.uploadPhotos.push(...urls.slice(0, remain))
    if (urls.length > remain) {
      modalConfig.type = 'error'
      modalConfig.titleKey = ''
      modalConfig.messageKey = 'surrogate.application.form.uploadPhotosMaxTip'
      modalConfig.message = ''
      modalConfig.buttonText = t('modal.error.ok')
      showModal.value = true
    }
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
  isSubmitting.value = true
  try {
    if (!form.uploadPhotos?.length || form.uploadPhotos.length < 2) {
      modalConfig.type = 'error'
      modalConfig.titleKey = 'modal.error.uploadPhotosMin.title'
      modalConfig.messageKey = 'modal.error.uploadPhotosMin.message'
      modalConfig.buttonText = t('modal.error.ok')
      showModal.value = true
      return
    }
    if (form.uploadPhotos.length > MAX_UPLOAD_PHOTOS) {
      modalConfig.type = 'error'
      modalConfig.titleKey = ''
      modalConfig.messageKey = 'surrogate.application.form.uploadPhotosMaxTip'
      modalConfig.message = ''
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
    const generalRequired: RequiredField[] = [
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
    if (!validateRequiredFields(generalRequired))
      return

    if (g.occupation_type === 'employed' || g.occupation_type === 'unemployed') {
      if (!validateRequiredFields([{ value: g.occupation_specify?.trim(), label: 'surrogate.application.gcIntake.occupationSource' }]))
        return
    }

    if (g.marital_status === 'single') {
      if (!validateRequiredFields([{ value: g.single_partner_info?.trim(), label: 'surrogate.application.gcIntake.singlePartnerInfo' }]))
        return
    }

    if (g.ethnicity.other && !validateRequiredFields([{ value: g.ethnicity.otherText?.trim(), label: 'surrogate.application.gcIntake.ethnicity.options.other' }]))
      return

    const ethnicityPayload = buildEthnicityPayload()
    if (!ethnicityPayload.labels.length) {
      showMissingFieldError('surrogate.application.gcIntake.ethnicity.label')
      return
    }

    const pb = form.pregnancy_birth_history
    const pregnancyRequired: RequiredField[] = [
      { value: pb.total_children, label: 'surrogate.application.gcIntake.totalChildren' },
      { value: pb.total_vaginal, label: 'surrogate.application.gcIntake.totalVaginal' },
      { value: pb.total_c_sections, label: 'surrogate.application.gcIntake.totalCSections' },
      { value: pb.miscarriages, label: 'surrogate.application.gcIntake.miscarriages' },
      { value: pb.abortions, label: 'surrogate.application.gcIntake.abortions' },
    ]
    if (pb.miscarriages === 'yes')
      pregnancyRequired.push({ value: pb.miscarriages_detail?.trim(), label: 'surrogate.application.gcIntake.miscarriagesDetail' })
    if (pb.abortions === 'yes')
      pregnancyRequired.push({ value: pb.abortions_detail?.trim(), label: 'surrogate.application.gcIntake.abortionsDetail' })
    pregnancyRequired.push({ value: pb.been_surrogate_before, label: 'surrogate.application.gcIntake.beenSurrogateBefore' })
    if (pb.been_surrogate_before === 'yes')
      pregnancyRequired.push({ value: pb.been_surrogate_when?.trim(), label: 'surrogate.application.gcIntake.beenSurrogateWhen' })
    if (!validateRequiredFields(pregnancyRequired))
      return

    // 仅当有子女（total_children > 0）时才要求至少一条分娩记录；没选做过代孕/无子女时可不填
    const hasChildren = Number(form.pregnancy_birth_history.total_children) > 0
    if (hasChildren && !form.delivery_history.length) {
      showMissingFieldError('surrogate.application.gcIntake.deliveryTable')
      return
    }
    const deliveryRequired: RequiredField[] = []
    form.delivery_history.forEach((d) => {
      deliveryRequired.push(
        { value: d.delivery_date, label: 'surrogate.application.gcIntake.deliveryDate' },
        { value: d.gender, label: 'surrogate.application.gcIntake.gender' },
        { value: d.birth_weight, label: 'surrogate.application.gcIntake.birthWeight' },
        { value: d.number_of_weeks, label: 'surrogate.application.gcIntake.numberOfWeeks' },
        { value: d.delivery_type, label: 'surrogate.application.gcIntake.deliveryType' },
        { value: d.hospital, label: 'surrogate.application.gcIntake.deliveryHospital' },
      )
    })
    if (!validateRequiredFields(deliveryRequired))
      return

    const pregnancyMedicalRequired: RequiredField[] = [
      { value: form.pregnancy_medical.anemia, label: 'surrogate.application.gcIntake.anemia' },
      { value: form.pregnancy_medical.severe_vomiting_3mo, label: 'surrogate.application.gcIntake.severeVomiting3mo' },
      { value: form.pregnancy_medical.bp_during_pregnancy?.trim(), label: 'surrogate.application.gcIntake.bpDuringPregnancy' },
      { value: form.pregnancy_medical.preeclampsia, label: 'surrogate.application.gcIntake.preeclampsia' },
      { value: form.pregnancy_medical.gestational_diabetes, label: 'surrogate.application.gcIntake.gestationalDiabetes' },
      { value: form.pregnancy_medical.hypertension_pregnancy, label: 'surrogate.application.gcIntake.hypertensionPregnancy' },
      { value: form.pregnancy_medical.blood_transfusion, label: 'surrogate.application.gcIntake.bloodTransfusion' },
      { value: form.pregnancy_medical.seizures, label: 'surrogate.application.gcIntake.seizures' },
    ]
    if (!validateRequiredFields(pregnancyMedicalRequired))
      return

    const medicalHealthRequired: RequiredField[] = [
      { value: form.medical_health.regular_menstrual_cycles, label: 'surrogate.application.gcIntake.regularMenstrualCycles' },
      { value: form.medical_health.birth_control, label: 'surrogate.application.gcIntake.birthControl' },
      { value: form.medical_health.taking_medications, label: 'surrogate.application.gcIntake.takingMedications' },
      { value: form.medical_health.last_pap_smear?.trim(), label: 'surrogate.application.gcIntake.lastPapSmear' },
      { value: form.medical_health.covid_vaccinated, label: 'surrogate.application.gcIntake.covidVaccinated' },
      { value: form.medical_health.hep_b_vaccinated, label: 'surrogate.application.gcIntake.hepBVaccinated' },
      { value: form.medical_health.varicella_vaccinated, label: 'surrogate.application.gcIntake.varicellaVaccinated' },
      { value: form.medical_health.ongoing_medical_treatment, label: 'surrogate.application.gcIntake.ongoingMedicalTreatment' },
      { value: form.medical_health.surgeries_past_2y, label: 'surrogate.application.gcIntake.surgeriesPast2y' },
    ]
    if (form.medical_health.birth_control === 'yes')
      medicalHealthRequired.push({ value: form.medical_health.birth_control_type?.trim(), label: 'surrogate.application.gcIntake.birthControlType' })
    if (form.medical_health.taking_medications === 'yes')
      medicalHealthRequired.push({ value: form.medical_health.medications_list?.trim(), label: 'surrogate.application.gcIntake.medicationsList' })
    if (form.medical_health.surgeries_past_2y === 'yes')
      medicalHealthRequired.push({ value: form.medical_health.surgeries_specify?.trim(), label: 'surrogate.application.gcIntake.surgeriesSpecify' })
    if (!validateRequiredFields(medicalHealthRequired))
      return

    const mentalHealthRequired: RequiredField[] = [
      { value: form.mental_health.anxiety_depression, label: 'surrogate.application.gcIntake.anxietyDepression' },
      { value: form.mental_health.bipolar_schizo_personality, label: 'surrogate.application.gcIntake.bipolarSchizoPersonality' },
      { value: form.mental_health.adhd, label: 'surrogate.application.gcIntake.adhd' },
      { value: form.mental_health.meds_anxiety_depression, label: 'surrogate.application.gcIntake.medsAnxietyDepression' },
    ]
    if (form.mental_health.meds_anxiety_depression === 'yes')
      mentalHealthRequired.push({ value: form.mental_health.meds_specify?.trim(), label: 'surrogate.application.gcIntake.medsSpecify' })
    if (!validateRequiredFields(mentalHealthRequired))
      return

    const substanceUseRequired: RequiredField[] = [
      { value: form.substance_use.drug_use_pregnancy, label: 'surrogate.application.gcIntake.drugUsePregnancy' },
      { value: form.substance_use.marijuana_current, label: 'surrogate.application.gcIntake.marijuanaCurrent' },
      { value: form.substance_use.smoked_vaped_pregnancy, label: 'surrogate.application.gcIntake.smokedVapedPregnancy' },
      { value: form.substance_use.alcohol, label: 'surrogate.application.gcIntake.alcohol' },
    ]
    if (form.substance_use.marijuana_current === 'yes')
      substanceUseRequired.push({ value: form.substance_use.marijuana_last_use?.trim(), label: 'surrogate.application.gcIntake.marijuanaLastUse' })
    if (form.substance_use.alcohol === 'yes')
      substanceUseRequired.push({ value: form.substance_use.alcohol_frequency?.trim(), label: 'surrogate.application.gcIntake.alcoholFrequency' })
    if (!validateRequiredFields(substanceUseRequired))
      return

    if (form.substance_use.drug_use_pregnancy === 'yes') {
      const hasDrugSelection = form.substance_use.drug_marijuana
        || form.substance_use.drug_fentanyl
        || form.substance_use.drug_methamphetamine
        || form.substance_use.drug_mdma
        || !!form.substance_use.drug_other?.trim()
      if (!hasDrugSelection) {
        showMissingFieldError('surrogate.application.gcIntake.drugTypes')
        return
      }
    }

    const infectiousRequired: RequiredField[] = [
      { value: form.infectious_disease.syphilis, label: 'surrogate.application.gcIntake.syphilis' },
      { value: form.infectious_disease.hepatitis_b_c, label: 'surrogate.application.gcIntake.hepatitisBC' },
      { value: form.infectious_disease.genital_herpes, label: 'surrogate.application.gcIntake.genitalHerpes' },
      { value: form.infectious_disease.hiv, label: 'surrogate.application.gcIntake.hiv' },
    ]
    if (!validateRequiredFields(infectiousRequired))
      return

    const otherMedicalRequired: RequiredField[] = [
      { value: form.other_medical.asthma, label: 'surrogate.application.gcIntake.asthma' },
      { value: form.other_medical.heart_conditions, label: 'surrogate.application.gcIntake.heartConditions' },
      { value: form.other_medical.cancer_history, label: 'surrogate.application.gcIntake.cancerHistory' },
      { value: form.other_medical.scoliosis, label: 'surrogate.application.gcIntake.scoliosis' },
      { value: form.other_medical.endometrial_ablation, label: 'surrogate.application.gcIntake.endometrialAblation' },
    ]
    if (form.other_medical.asthma === 'yes')
      otherMedicalRequired.push({ value: form.other_medical.asthma_inhaler_per_week?.trim(), label: 'surrogate.application.gcIntake.asthmaInhaler' })
    if (!validateRequiredFields(otherMedicalRequired))
      return

    const preferencesRequired: RequiredField[] = [
      { value: form.preferences.availability?.trim(), label: 'surrogate.application.gcIntake.availability' },
      { value: form.preferences.health_insurance?.trim(), label: 'surrogate.application.gcIntake.healthInsurance' },
      { value: form.preferences.open_twins, label: 'surrogate.application.gcIntake.openTwins' },
      { value: form.preferences.open_fetal_reduction, label: 'surrogate.application.gcIntake.openFetalReduction' },
      { value: form.preferences.open_termination, label: 'surrogate.application.gcIntake.openTermination' },
      { value: form.preferences.open_amniocentesis_cvs, label: 'surrogate.application.gcIntake.openAmniocentesisCVS' },
      { value: form.preferences.open_same_sex_single_ip, label: 'surrogate.application.gcIntake.openSameSexSingleIP' },
      { value: form.preferences.willing_pump_breast_milk, label: 'surrogate.application.gcIntake.willingPumpBreastMilk' },
      { value: form.preferences.open_ip_hiv, label: 'surrogate.application.gcIntake.openIPHIV' },
      { value: form.preferences.open_ip_hepatitis_b, label: 'surrogate.application.gcIntake.openIPHepatitisB' },
    ]
    if (!validateRequiredFields(preferencesRequired))
      return

    const legalRequired: RequiredField[] = [
      { value: form.legal_admin.pending_legal, label: 'surrogate.application.gcIntake.pendingLegal' },
      { value: form.legal_admin.criminal_record, label: 'surrogate.application.gcIntake.criminalRecord' },
      { value: form.legal_admin.emergency_contact?.trim(), label: 'surrogate.application.gcIntake.emergencyContact' },
      { value: form.legal_admin.government_assistance, label: 'surrogate.application.gcIntake.governmentAssistance' },
    ]
    if (!validateRequiredFields(legalRequired))
      return

    const notesRequired: RequiredField[] = [
      { value: form.notes.referred_by?.trim(), label: 'surrogate.application.gcIntake.referredBy' },
      { value: form.notes.medical_records_source, label: 'surrogate.application.gcIntake.medicalRecordsSource' },
    ]
    if (!validateRequiredFields(notesRequired))
      return
    if (!form.finalConsent) {
      modalConfig.type = 'error'
      modalConfig.titleKey = 'modal.error.consentRequired.title'
      modalConfig.messageKey = 'modal.error.consentRequired.message'
      modalConfig.buttonText = t('modal.error.ok')
      showModal.value = true
      return
    }

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
          ethnicity: ethnicityPayload.labels.length ? ethnicityPayload.labels.join(', ') : undefined,
          ethnicity_selected_keys: ethnicityPayload.keys.length ? ethnicityPayload.keys : undefined,
        },
        pregnancy_birth_history: {
          total_children: typeof form.pregnancy_birth_history.total_children === 'number' ? form.pregnancy_birth_history.total_children : (Number(form.pregnancy_birth_history.total_children) || undefined),
          total_vaginal: typeof form.pregnancy_birth_history.total_vaginal === 'number' ? form.pregnancy_birth_history.total_vaginal : (Number(form.pregnancy_birth_history.total_vaginal) || undefined),
          total_c_sections: typeof form.pregnancy_birth_history.total_c_sections === 'number' ? form.pregnancy_birth_history.total_c_sections : (Number(form.pregnancy_birth_history.total_c_sections) || undefined),
          miscarriages: form.pregnancy_birth_history.miscarriages === 'yes',
          miscarriages_detail: form.pregnancy_birth_history.miscarriages_detail?.trim() || undefined,
          abortions: form.pregnancy_birth_history.abortions === 'yes',
          abortions_detail: form.pregnancy_birth_history.abortions_detail?.trim() || undefined,
          been_surrogate_before: form.pregnancy_birth_history.been_surrogate_before === 'yes',
          been_surrogate_when: form.pregnancy_birth_history.been_surrogate_when?.trim() || undefined,
        },
        delivery_history: form.delivery_history.map(d => ({
          delivery_date: d.delivery_date,
          gender: d.gender,
          birth_weight: d.birth_weight,
          number_of_weeks: d.number_of_weeks,
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
          <h3 id="section-general" class="mb-8 scroll-mt-24 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.generalInfo') }}
          </h3>
          <div class="grid grid-cols-1 mb-16 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <FormInput v-model="form.general_info.full_name" :label="$t('surrogate.application.gcIntake.fullName')" required />
            <FormInput v-model="form.general_info.email" :label="$t('surrogate.application.gcIntake.email')" type="email" required />
            <FormPhoneInput
              v-model="form.general_info.phone"
              v-model:country-code="form.general_info.country_code"
              :label="$t('surrogate.application.gcIntake.phone')"
              required
              default-country="US"
            />
            <FormDatePicker v-model="form.general_info.dob" :label="$t('surrogate.application.gcIntake.dob')" :placeholder="locale === 'zh' ? '年/月/日' : 'MM/DD/YYYY'" :locale="locale" required />
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
                  <input v-model="form.general_info.height_feet" type="number" min="4" max="7" placeholder="5" class="h-15 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]">
                  <span class="flex items-center text-gray-600">{{ $t('surrogate.application.form.units.feet') }}</span>
                  <input v-model="form.general_info.height_inches" type="number" min="0" max="11" placeholder="6" class="h-15 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]">
                  <span class="flex items-center text-gray-600">{{ $t('surrogate.application.form.units.inches') }}</span>
                </div>
              </div>
              <div>
                <label class="mb-4 block leading-6">{{ $t('surrogate.application.form.weight') }} <span class="text-red-500">*</span></label>
                <div class="flex gap-2">
                  <input v-model="form.general_info.weight" type="number" min="80" max="300" placeholder="140" class="h-15 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]">
                  <span class="flex items-center text-gray-600">{{ $t('surrogate.application.form.units.pounds') }}</span>
                </div>
              </div>
            </div>
            <div>
              <label class="mb-4 block leading-6">{{ $t('surrogate.application.gcIntake.bmi') }}</label>
              <div class="flex gap-2">
                <input :value="calculatedBMI" type="text" readonly class="h-15 flex-1 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.15)] px-3 bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5">
              </div>
              <p class="mt-2 text-xs text-gray-500">
                {{ $t('surrogate.application.form.bmiAutoCalculated') }}
              </p>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.occupationSource') }} <span class="text-red-500">*</span>
              </p>
              <div class="space-y-2">
                <FormRadio v-model="form.general_info.occupation_type" name="occupation_type" value="employed" :label="$t('surrogate.application.gcIntake.occupationEmployed')" />
                <FormRadio v-model="form.general_info.occupation_type" name="occupation_type" value="stay_at_home" :label="$t('surrogate.application.gcIntake.occupationStayAtHome')" />
                <FormRadio v-model="form.general_info.occupation_type" name="occupation_type" value="unemployed" :label="$t('surrogate.application.gcIntake.occupationUnemployed')" />
              </div>
              <FormInput v-if="form.general_info.occupation_type === 'employed' || form.general_info.occupation_type === 'unemployed'" v-model="form.general_info.occupation_specify" class="mt-4" required />
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.maritalStatus') }} <span class="text-red-500">*</span>
              </p>
              <div class="flex flex-wrap gap-4">
                <FormRadio v-model="form.general_info.marital_status" name="marital_status" value="married" :label="$t('surrogate.application.gcIntake.maritalMarried')" />
                <FormRadio v-model="form.general_info.marital_status" name="marital_status" value="single" :label="$t('surrogate.application.gcIntake.maritalSingle')" />
                <FormRadio v-model="form.general_info.marital_status" name="marital_status" value="cohabitating" :label="$t('surrogate.application.gcIntake.maritalCohabitating')" />
                <FormRadio v-model="form.general_info.marital_status" name="marital_status" value="divorced" :label="$t('surrogate.application.gcIntake.maritalDivorced')" />
              </div>
              <FormInput v-if="form.general_info.marital_status === 'single'" v-model="form.general_info.single_partner_info" :label="$t('surrogate.application.gcIntake.singlePartnerInfo')" class="mt-4" />
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.usCitizenOrResident') }} <span class="text-red-500">*</span>
              </p>
              <div class="flex gap-8">
                <FormRadio v-model="form.general_info.us_citizen_or_resident" name="us_citizen" value="yes" :label="$t('surrogate.application.form.yes')" />
                <FormRadio v-model="form.general_info.us_citizen_or_resident" name="us_citizen" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
            <div class="lg:col-span-2">
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.ethnicity.label') }}
                <template v-if="locale !== 'zh'">
                  <span class="font-normal italic">{{ $t('surrogate.application.gcIntake.ethnicity.selectAll') }}</span>
                </template>
                <span class="text-red-500">*</span>
              </p>
              <div class="flex flex-wrap gap-4">
                <FormCheckbox v-model="form.general_info.ethnicity.asian" :label="$t('surrogate.application.gcIntake.ethnicity.options.asian')" />
                <FormCheckbox v-model="form.general_info.ethnicity.white" :label="$t('surrogate.application.gcIntake.ethnicity.options.white')" />
                <FormCheckbox v-model="form.general_info.ethnicity.black" :label="$t('surrogate.application.gcIntake.ethnicity.options.black')" />
                <FormCheckbox v-model="form.general_info.ethnicity.hispanic" :label="$t('surrogate.application.gcIntake.ethnicity.options.hispanic')" />
                <FormCheckbox v-model="form.general_info.ethnicity.middleEastern" :label="$t('surrogate.application.gcIntake.ethnicity.options.middleEastern')" />
                <FormCheckbox v-model="form.general_info.ethnicity.nativeAmerican" :label="$t('surrogate.application.gcIntake.ethnicity.options.nativeAmerican')" />
                <FormCheckbox v-model="form.general_info.ethnicity.pacificIslander" :label="$t('surrogate.application.gcIntake.ethnicity.options.pacificIslander')" />
                <FormCheckbox v-model="form.general_info.ethnicity.mixedRace" :label="$t('surrogate.application.gcIntake.ethnicity.options.mixedRace')" />
                <FormCheckbox v-model="form.general_info.ethnicity.preferNotToSay" :label="$t('surrogate.application.gcIntake.ethnicity.options.preferNotToSay')" />
                <FormCheckbox v-model="form.general_info.ethnicity.other" :label="$t('surrogate.application.gcIntake.ethnicity.options.other')" />
              </div>
              <FormInput
                v-if="form.general_info.ethnicity.other"
                v-model="form.general_info.ethnicity.otherText"
                class="mt-4"
                :label="$t('surrogate.application.gcIntake.ethnicitySelfDescribe')"
                required
              />
            </div>
          </div>

          <!-- II. Pregnancy & Birth History -->
          <h3 id="section-pregnancy-birth" class="mb-8 scroll-mt-24 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.pregnancyBirthHistory') }}
          </h3>
          <div class="grid grid-cols-1 mb-16 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <FormInput v-model="form.pregnancy_birth_history.total_children" :label="$t('surrogate.application.gcIntake.totalChildren')" type="number" required />
            <FormInput v-model="form.pregnancy_birth_history.total_vaginal" :label="$t('surrogate.application.gcIntake.totalVaginal')" type="number" required />
            <FormInput v-model="form.pregnancy_birth_history.total_c_sections" :label="$t('surrogate.application.gcIntake.totalCSections')" type="number" required />
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.miscarriages') }} <span class="text-red-500">*</span>
              </p>
              <div class="flex gap-8">
                <FormRadio v-model="form.pregnancy_birth_history.miscarriages" name="miscarriages" value="no" :label="$t('surrogate.application.form.no')" />
                <FormRadio v-model="form.pregnancy_birth_history.miscarriages" name="miscarriages" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
              <FormInput v-if="form.pregnancy_birth_history.miscarriages === 'yes'" v-model="form.pregnancy_birth_history.miscarriages_detail" :label="$t('surrogate.application.gcIntake.miscarriagesDetail')" class="mt-4" required />
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.abortions') }} <span class="text-red-500">*</span>
              </p>
              <div class="flex gap-8">
                <FormRadio v-model="form.pregnancy_birth_history.abortions" name="abortions" value="no" :label="$t('surrogate.application.form.no')" />
                <FormRadio v-model="form.pregnancy_birth_history.abortions" name="abortions" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
              <FormInput v-if="form.pregnancy_birth_history.abortions === 'yes'" v-model="form.pregnancy_birth_history.abortions_detail" :label="$t('surrogate.application.gcIntake.abortionsDetail')" class="mt-4" required />
            </div>
          </div>

          <!-- III. Delivery History -->
          <h3 id="section-delivery" class="mb-8 scroll-mt-24 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.deliveryHistory') }}
          </h3>
          <div class="mb-16 space-y-6">
            <div class="rounded-3 bg-[rgba(234,232,208,0.15)] p-6 shadow">
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.beenSurrogateBefore') }} <span class="text-red-500">*</span>
              </p>
              <div class="flex gap-8">
                <FormRadio v-model="form.pregnancy_birth_history.been_surrogate_before" name="beenSurrogate" value="no" :label="$t('surrogate.application.form.no')" />
                <FormRadio v-model="form.pregnancy_birth_history.been_surrogate_before" name="beenSurrogate" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
              <FormInput v-if="form.pregnancy_birth_history.been_surrogate_before === 'yes'" v-model="form.pregnancy_birth_history.been_surrogate_when" :label="$t('surrogate.application.gcIntake.beenSurrogateWhen')" class="mt-4" required />
            </div>
            <div v-for="(d, idx) in form.delivery_history" :key="idx" class="rounded-3 bg-[rgba(234,232,208,0.15)] p-6 shadow">
              <div class="mb-4 flex items-center justify-between">
                <h4 class="text-5 font-semibold">
                  {{ $t('surrogate.application.gcIntake.babyNum', { n: idx + 1 }) }}
                </h4>
                <button type="button" class="rounded-2 bg-[var(--grayish-green)] px-4 py-2 text-4 text-white transition hover:opacity-90" @click="removeDelivery(idx)">
                  {{ $t('surrogate.application.gcIntake.removeDelivery') }}
                </button>
              </div>
              <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
                <FormDatePicker v-model="d.delivery_date" :label="$t('surrogate.application.gcIntake.deliveryDate')" :placeholder="locale === 'zh' ? '年/月/日' : 'MM/DD/YYYY'" :locale="locale" required />
                <FormInput v-model="d.gender" :label="$t('surrogate.application.gcIntake.gender')" required />
                <FormInput v-model="d.birth_weight" :label="$t('surrogate.application.gcIntake.birthWeight')" required />
                <FormInput v-model="d.number_of_weeks" :label="$t('surrogate.application.gcIntake.numberOfWeeks')" required />
                <FormInput v-model="d.delivery_type" :label="$t('surrogate.application.gcIntake.deliveryType')" required />
                <FormInput v-model="d.hospital" :label="$t('surrogate.application.gcIntake.deliveryHospital')" class="lg:col-span-2" required />
              </div>
            </div>
            <button type="button" class="rounded-2 bg-[var(--grayish-green)] px-8 py-3 text-white font-bold shadow transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed" :disabled="form.delivery_history.length >= MAX_DELIVERY_HISTORY" @click="addDelivery">
              <svg width="18" height="18" fill="none" viewBox="0 0 18 18" class="mr-2 inline align-middle"><path d="M9 2v14M2 9h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
              {{ $t('surrogate.application.gcIntake.addDelivery') }}
            </button>
            <p v-if="form.delivery_history.length >= MAX_DELIVERY_HISTORY" class="mt-2 text-4 text-gray-500">
              {{ $t('surrogate.application.form.deliveryHistoryMaxTip') }}
            </p>
          </div>

          <!-- IV. Pregnancy-Related Medical History -->
          <h3 id="section-pregnancy-medical" class="mb-8 scroll-mt-24 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.pregnancyMedical') }}
          </h3>
          <p class="text-sage-700 mb-4">
            {{ $t('surrogate.application.gcIntake.pregMedicalIntro') }}
          </p>
          <div class="grid grid-cols-1 mb-16 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.anemia') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.pregnancy_medical.anemia" name="anemia" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.pregnancy_medical.anemia" name="anemia" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.severeVomiting3mo') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.pregnancy_medical.severe_vomiting_3mo" name="severeVomiting" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.pregnancy_medical.severe_vomiting_3mo" name="severeVomiting" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <FormInput v-model="form.pregnancy_medical.bp_during_pregnancy" :label="$t('surrogate.application.gcIntake.bpDuringPregnancy')" required />
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.preeclampsia') }} <span class="text-red-500">*</span> <span class="text-xs text-gray-500">{{ $t('surrogate.application.gcIntake.preeclampsiaNote') }}</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.pregnancy_medical.preeclampsia" name="preeclampsia" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.pregnancy_medical.preeclampsia" name="preeclampsia" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.gestationalDiabetes') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.pregnancy_medical.gestational_diabetes" name="gestDiabetes" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.pregnancy_medical.gestational_diabetes" name="gestDiabetes" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.hypertensionPregnancy') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.pregnancy_medical.hypertension_pregnancy" name="hypPreg" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.pregnancy_medical.hypertension_pregnancy" name="hypPreg" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.bloodTransfusion') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.pregnancy_medical.blood_transfusion" name="bloodTrans" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.pregnancy_medical.blood_transfusion" name="bloodTrans" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.seizures') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.pregnancy_medical.seizures" name="seizures" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.pregnancy_medical.seizures" name="seizures" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
          </div>

          <!-- V. Medical & Health -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.medicalHealth') }}
          </h3>
          <div class="grid grid-cols-1 mb-16 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.regularMenstrualCycles') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.medical_health.regular_menstrual_cycles" name="regularCycles" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.medical_health.regular_menstrual_cycles" name="regularCycles" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.birthControl') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.medical_health.birth_control" name="birthControl" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.medical_health.birth_control" name="birthControl" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div><FormInput v-if="form.medical_health.birth_control === 'yes'" v-model="form.medical_health.birth_control_type" :label="$t('surrogate.application.gcIntake.birthControlType')" class="mt-4" required />
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.takingMedications') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.medical_health.taking_medications" name="takingMeds" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.medical_health.taking_medications" name="takingMeds" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div><FormInput v-if="form.medical_health.taking_medications === 'yes'" v-model="form.medical_health.medications_list" :label="$t('surrogate.application.gcIntake.medicationsList')" class="mt-4" required />
            </div>
            <FormInput v-model="form.medical_health.last_pap_smear" :label="$t('surrogate.application.gcIntake.lastPapSmear')" required />
            <p class="text-xs text-gray-500 lg:col-span-2">
              {{ $t('surrogate.application.gcIntake.papSmearNote') }}
            </p>
            <p class="text-sage-700 text-sm lg:col-span-2">
              {{ $t('surrogate.application.gcIntake.vaccinationIntro') }}
            </p>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.covidVaccinated') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.medical_health.covid_vaccinated" name="covid" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.medical_health.covid_vaccinated" name="covid" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.hepBVaccinated') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.medical_health.hep_b_vaccinated" name="hepb" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.medical_health.hep_b_vaccinated" name="hepb" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.varicellaVaccinated') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.medical_health.varicella_vaccinated" name="varicella" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.medical_health.varicella_vaccinated" name="varicella" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.ongoingMedicalTreatment') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.medical_health.ongoing_medical_treatment" name="ongoingTx" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.medical_health.ongoing_medical_treatment" name="ongoingTx" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.surgeriesPast2y') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.medical_health.surgeries_past_2y" name="surgeries2y" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.medical_health.surgeries_past_2y" name="surgeries2y" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div><FormInput v-if="form.medical_health.surgeries_past_2y === 'yes'" v-model="form.medical_health.surgeries_specify" :label="$t('surrogate.application.gcIntake.surgeriesSpecify')" class="mt-4" required />
            </div>
          </div>

          <!-- VI. Mental Health -->
          <h3 id="section-mental-health" class="mb-8 scroll-mt-24 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.mentalHealth') }}
          </h3>
          <p class="text-sage-700 mb-4">
            {{ $t('surrogate.application.gcIntake.mentalHealthIntro') }}
          </p>
          <div class="grid grid-cols-1 mb-16 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.anxietyDepression') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.mental_health.anxiety_depression" name="anxDep" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.mental_health.anxiety_depression" name="anxDep" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.bipolarSchizoPersonality') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.mental_health.bipolar_schizo_personality" name="bipolar" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.mental_health.bipolar_schizo_personality" name="bipolar" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.adhd') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.mental_health.adhd" name="adhd" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.mental_health.adhd" name="adhd" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.medsAnxietyDepression') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.mental_health.meds_anxiety_depression" name="medsAnx" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.mental_health.meds_anxiety_depression" name="medsAnx" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div><FormInput v-if="form.mental_health.meds_anxiety_depression === 'yes'" v-model="form.mental_health.meds_specify" :label="$t('surrogate.application.gcIntake.medsSpecify')" class="mt-4" required />
            </div>
          </div>

          <!-- VII. Substance Use -->
          <h3 id="section-substance-use" class="mb-8 scroll-mt-24 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.substanceUse') }}
          </h3>
          <div class="grid grid-cols-1 mb-16 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.drugUsePregnancy') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.substance_use.drug_use_pregnancy" name="drugPreg" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.substance_use.drug_use_pregnancy" name="drugPreg" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div><div v-if="form.substance_use.drug_use_pregnancy === 'yes'" class="mt-4 space-y-2">
                <p class="text-sage-700 text-sm">
                  {{ $t('surrogate.application.gcIntake.drugTypes') }}
                </p><div class="flex flex-wrap gap-4">
                  <FormCheckbox v-model="form.substance_use.drug_marijuana" :label="$t('surrogate.application.gcIntake.drugMarijuana')" /><FormCheckbox v-model="form.substance_use.drug_fentanyl" :label="$t('surrogate.application.gcIntake.drugFentanyl')" /><FormCheckbox v-model="form.substance_use.drug_methamphetamine" :label="$t('surrogate.application.gcIntake.drugMethamphetamine')" /><FormCheckbox v-model="form.substance_use.drug_mdma" :label="$t('surrogate.application.gcIntake.drugMDMA')" /><FormInput v-model="form.substance_use.drug_other" :label="$t('surrogate.application.gcIntake.drugOther')" />
                </div>
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.marijuanaCurrent') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.substance_use.marijuana_current" name="marijuanaNow" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.substance_use.marijuana_current" name="marijuanaNow" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div><FormInput v-if="form.substance_use.marijuana_current === 'yes'" v-model="form.substance_use.marijuana_last_use" :label="$t('surrogate.application.gcIntake.marijuanaLastUse')" class="mt-4" required />
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.smokedVapedPregnancy') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.substance_use.smoked_vaped_pregnancy" name="smokedPreg" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.substance_use.smoked_vaped_pregnancy" name="smokedPreg" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.alcohol') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.substance_use.alcohol" name="alcohol" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.substance_use.alcohol" name="alcohol" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div><FormInput v-if="form.substance_use.alcohol === 'yes'" v-model="form.substance_use.alcohol_frequency" :label="$t('surrogate.application.gcIntake.alcoholFrequency')" class="mt-4" required />
            </div>
          </div>

          <!-- VIII. Infectious Disease -->
          <h3 class="mb-8 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.infectiousDisease') }}
          </h3>
          <p class="text-sage-700 mb-4">
            {{ $t('surrogate.application.gcIntake.infectiousIntro') }}
          </p>
          <div class="grid grid-cols-1 mb-16 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.syphilis') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.infectious_disease.syphilis" name="syphilis" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.infectious_disease.syphilis" name="syphilis" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.hepatitisBC') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.infectious_disease.hepatitis_b_c" name="hepbac" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.infectious_disease.hepatitis_b_c" name="hepbac" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.genitalHerpes') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.infectious_disease.genital_herpes" name="herpes" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.infectious_disease.genital_herpes" name="herpes" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.hiv') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.infectious_disease.hiv" name="hiv" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.infectious_disease.hiv" name="hiv" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
          </div>

          <!-- IX. Other Medical -->
          <h3 id="section-other-medical" class="mb-8 scroll-mt-24 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.otherMedical') }}
          </h3>
          <div class="grid grid-cols-1 mb-16 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.asthma') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.other_medical.asthma" name="asthma" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.other_medical.asthma" name="asthma" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div><FormInput v-if="form.other_medical.asthma === 'yes'" v-model="form.other_medical.asthma_inhaler_per_week" :label="$t('surrogate.application.gcIntake.asthmaInhaler')" class="mt-4" required />
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.heartConditions') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.other_medical.heart_conditions" name="heart" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.other_medical.heart_conditions" name="heart" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.cancerHistory') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.other_medical.cancer_history" name="cancer" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.other_medical.cancer_history" name="cancer" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.scoliosis') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.other_medical.scoliosis" name="scoliosis" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.other_medical.scoliosis" name="scoliosis" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.endometrialAblation') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.other_medical.endometrial_ablation" name="endoAbl" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.other_medical.endometrial_ablation" name="endoAbl" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
          </div>

          <!-- X. Preferences -->
          <h3 id="section-preferences" class="mb-8 scroll-mt-24 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.preferences') }}
          </h3>
          <div class="grid grid-cols-1 mb-16 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <FormInput v-model="form.preferences.availability" :label="$t('surrogate.application.gcIntake.availability')" required />
            <FormInput v-model="form.preferences.health_insurance" :label="$t('surrogate.application.gcIntake.healthInsurance')" required />
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.openTwins') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.preferences.open_twins" name="openTwins" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.open_twins" name="openTwins" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.openFetalReduction') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.preferences.open_fetal_reduction" name="openRed" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.open_fetal_reduction" name="openRed" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.openTermination') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.preferences.open_termination" name="openTerm" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.open_termination" name="openTerm" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.openAmniocentesisCVS') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.preferences.open_amniocentesis_cvs" name="openCVS" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.open_amniocentesis_cvs" name="openCVS" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.openSameSexSingleIP') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.preferences.open_same_sex_single_ip" name="openSS" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.open_same_sex_single_ip" name="openSS" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.willingPumpBreastMilk') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.preferences.willing_pump_breast_milk" name="pump" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.willing_pump_breast_milk" name="pump" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.openIPHIV') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.preferences.open_ip_hiv" name="ipHiv" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.open_ip_hiv" name="ipHiv" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.openIPHepatitisB') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.preferences.open_ip_hepatitis_b" name="ipHep" value="yes" :label="$t('surrogate.application.form.yes')" /><FormRadio v-model="form.preferences.open_ip_hepatitis_b" name="ipHep" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
          </div>

          <!-- XI. Legal & Administrative -->
          <h3 id="section-legal" class="mb-8 scroll-mt-24 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.legalAdmin') }}
          </h3>
          <div class="grid grid-cols-1 mb-16 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.pendingLegal') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.legal_admin.pending_legal" name="pendingLegal" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.legal_admin.pending_legal" name="pendingLegal" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.criminalRecord') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.legal_admin.criminal_record" name="criminalRec" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.legal_admin.criminal_record" name="criminalRec" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
            <FormInput v-model="form.legal_admin.emergency_contact" :label="$t('surrogate.application.gcIntake.emergencyContact')" class="lg:col-span-2" required />
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.governmentAssistance') }} <span class="text-red-500">*</span>
              </p><div class="flex gap-8">
                <FormRadio v-model="form.legal_admin.government_assistance" name="govAssist" value="no" :label="$t('surrogate.application.form.no')" /><FormRadio v-model="form.legal_admin.government_assistance" name="govAssist" value="yes" :label="$t('surrogate.application.form.yes')" />
              </div>
            </div>
          </div>

          <!-- XII. Notes -->
          <h3 id="section-notes" class="mb-8 scroll-mt-24 text-6 font-semibold" style="font-family: var(--font-primary)">
            {{ $t('surrogate.application.gcIntake.sections.notes') }}
          </h3>
          <div class="grid grid-cols-1 mb-16 gap-6 lg:grid-cols-2 lg:gap-x-28">
            <FormInput v-model="form.notes.referred_by" :label="$t('surrogate.application.gcIntake.referredBy')" required />
            <div>
              <p class="mb-4">
                {{ $t('surrogate.application.gcIntake.medicalRecordsSource') }} <span class="text-red-500">*</span>
              </p><div class="flex flex-wrap gap-4">
                <FormRadio v-model="form.notes.medical_records_source" name="medRecSrc" value="patient_portal" :label="$t('surrogate.application.gcIntake.medicalRecordsPatientPortal')" /><FormRadio v-model="form.notes.medical_records_source" name="medRecSrc" value="clinic" :label="$t('surrogate.application.gcIntake.medicalRecordsClinic')" /><FormRadio v-model="form.notes.medical_records_source" name="medRecSrc" value="other" :label="$t('surrogate.application.gcIntake.medicalRecordsOther')" />
              </div>
            </div>
          </div>

          <!-- 上传照片 Upload Photos (minimum 2) -->
          <h3 id="section-upload-photos" class="mb-8 scroll-mt-24 text-6 font-semibold">
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
            <!-- 上传区域：最多 10 张，达上限后不再可点击 -->
            <div
              class="group relative flex flex-col items-center justify-center border-2 border-dashed rounded-4 py-12 shadow-sm transition"
              :class="form.uploadPhotos.length >= MAX_UPLOAD_PHOTOS ? 'border-gray-300 cursor-not-allowed bg-gray-50' : 'cursor-pointer border-[var(--grayish-green)] hover:border-[var(--grayish-green)] hover:bg-[rgba(234,232,208,0.25)]'"
              @dragover.prevent
              @drop.prevent="handleDrop"
              @click="form.uploadPhotos.length < MAX_UPLOAD_PHOTOS && fileInputRef?.click()"
            >
              <span v-if="form.uploadPhotos.length >= MAX_UPLOAD_PHOTOS" class="text-5 text-gray-500">{{ $t('surrogate.application.form.uploadPhotosMaxTip') }}</span>
              <template v-else>
                <span class="mb-4 block text-8 text-[var(--grayish-green)] opacity-60">+</span>
                <span class="text-5 text-gray-600 transition group-hover:text-[var(--grayish-green)]">{{ $t('surrogate.application.form.uploadPhotosTip') }}</span>
              </template>
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

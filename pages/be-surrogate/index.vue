<script setup lang="ts">
import type { BeSurrogateForm } from '~/composables/useBeSurrogateForm'
import type { SurrogateMotherApplicationData } from '~/types/api'
import { computed, nextTick, onMounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import FormCheckbox from '@/components/form/FormCheckbox.vue'
import FormDatePicker from '@/components/form/FormDatePicker.vue'
import FormInput from '@/components/form/FormInput.vue'
import FormPhoneInput from '@/components/form/FormPhoneInput.vue'
import FormRadio from '@/components/form/FormRadio.vue'
import FormSelect from '@/components/form/FormSelect.vue'
import AssociationSection from '@/components/home/AssociationSection.vue'
import SurrogateGallerySection from '@/components/home/SurrogateGallerySection.vue'
import { useApi } from '~/composables/useApi'
import {
  applyFormFromStorage,

  buildEthnicityPayload,
  buildFullPayload,
  calculatedBMI,
  createEmptyForm,
  emptyDelivery,
  fillFormFromDraft,
} from '~/composables/useBeSurrogateForm'
import { getStatesByCountry } from '~/data/countries-states'
import { uploadFilesToQiniu } from '~/utils/qiniuDirectUpload'
import { translations } from './_/translation'
import { useBeSurrogateV2Storage } from './_/useBeSurrogateV2Storage'

const { locale } = useI18n()
const localePath = useLocalePath()

// 页面内联多语言（与 privacy-policy 相同方式，无需插件，SSR 友好）
const t = computed(() => translations[locale.value === 'zh' ? 'zh' : 'en'])
const route = useRoute()
const router = useRouter()
const states = computed(() => getStatesByCountry('US'))

const form = reactive(createEmptyForm()) as BeSurrogateForm
const { save: saveToStorage, load: loadFromStorage, clear: clearStorage } = useBeSurrogateV2Storage()

const TOTAL_STEPS = 13
const currentStep = ref(1)
const applicationId = ref<number | null>(null)
const isSubmitting = ref(false)
const uploadingPhotos = ref(false)
const validationError = ref('')
const MAX_UPLOAD_PHOTOS = 10
const fileInputRef = ref<HTMLInputElement | null>(null)

const step1Ref = ref<Element | null>(null)
const step2Ref = ref<Element | null>(null)
const step3Ref = ref<Element | null>(null)
const step4Ref = ref<Element | null>(null)
const step5Ref = ref<Element | null>(null)
const step6Ref = ref<Element | null>(null)
const step7Ref = ref<Element | null>(null)
const step8Ref = ref<Element | null>(null)
const step9Ref = ref<Element | null>(null)
const step10Ref = ref<Element | null>(null)
const step11Ref = ref<Element | null>(null)
const step12Ref = ref<Element | null>(null)
const step13Ref = ref<Element | null>(null)
const stepRefs = [step1Ref, step2Ref, step3Ref, step4Ref, step5Ref, step6Ref, step7Ref, step8Ref, step9Ref, step10Ref, step11Ref, step12Ref, step13Ref]

const { submitSurrogateApplication, getApplicationById, updateApplicationById } = useApi()

const computedBMI = computed(() => calculatedBMI(form))

/** GC 申请页图集：素材包 10 张（含新增 2 张） */
const beSurrogateGallerySlides = [
  { src: '/images/be-surrogate/gallery-1.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-2.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-3.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-4.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-5.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-6.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-7.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-8.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-9.jpg', alt: 'Yunda surrogate' },
  { src: '/images/be-surrogate/gallery-10.jpg', alt: 'Yunda surrogate' },
]

/** 防抖保存到 localStorage，表单或步骤变化时自动保存 */
let saveTimeout: ReturnType<typeof setTimeout> | null = null
watch(
  [() => form, currentStep, applicationId],
  () => {
    if (saveTimeout)
      clearTimeout(saveTimeout)
    saveTimeout = setTimeout(() => {
      saveToStorage(form, applicationId.value, currentStep.value)
      saveTimeout = null
    }, 500)
  },
  { deep: true },
)

function syncUrlId(id: number | null) {
  const q = { ...route.query }
  if (id != null)
    q.id = String(id)
  else
    delete q.id
  router.replace({ path: route.path, query: q })
}

function syncUrlStep(step: number) {
  const q = { ...route.query }
  q.step = String(step)
  router.replace({ path: route.path, query: q })
}

function scrollToStepAndFocus(stepEl: Element | null, dataField?: string) {
  if (!stepEl)
    return
  nextTick(() => {
    let target: HTMLElement | null = null
    if (dataField) {
      const wrapper = stepEl.querySelector(`[data-field="${dataField}"]`)
      if (wrapper)
        target = wrapper.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), select, textarea') ?? wrapper as HTMLElement
    }
    if (!target)
      target = stepEl.querySelector<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>('input:not([type="hidden"]):not([type="submit"]):not([type="button"]), select, textarea')
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' })
      target.focus()
    }
    else {
      stepEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  })
}

function addDelivery() {
  if (form.delivery_history.length < 10)
    form.delivery_history.push(emptyDelivery())
}

function removeDelivery(idx: number) {
  form.delivery_history.splice(idx, 1)
}

async function uploadImages(files: File[]): Promise<string[]> {
  const results = await uploadFilesToQiniu(files)
  return results.map(r => r.url).filter(Boolean)
}

async function onPhotoChange(e: Event) {
  const files = (e.target as HTMLInputElement)?.files
  if (!files || files.length === 0)
    return
  if (form.uploadPhotos.length >= MAX_UPLOAD_PHOTOS)
    return
  uploadingPhotos.value = true
  try {
    const urls = await uploadImages(Array.from(files))
    const remain = MAX_UPLOAD_PHOTOS - form.uploadPhotos.length
    form.uploadPhotos.push(...urls.slice(0, remain))
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
  const imageFiles = Array.from(files).filter(f => f.type.startsWith('image/'))
  if (imageFiles.length === 0 || form.uploadPhotos.length >= MAX_UPLOAD_PHOTOS)
    return
  uploadingPhotos.value = true
  try {
    const urls = await uploadImages(imageFiles)
    const remain = MAX_UPLOAD_PHOTOS - form.uploadPhotos.length
    form.uploadPhotos.push(...urls.slice(0, remain))
  }
  finally {
    uploadingPhotos.value = false
  }
}

function removePhoto(idx: number) {
  form.uploadPhotos.splice(idx, 1)
}

function validateStep1(): true | string {
  const g = form.general_info
  const fields: Array<{ v: unknown, key: string }> = [
    { v: g.full_name?.trim(), key: 'full_name' },
    { v: g.email?.trim(), key: 'email' },
    { v: g.phone?.trim(), key: 'phone' },
    { v: g.dob, key: 'dob' },
    { v: g.state_of_residence, key: 'state_of_residence' },
    { v: g.marital_status, key: 'marital_status' },
    { v: g.us_citizen_or_resident, key: 'us_citizen_or_resident' },
    { v: g.occupation_type, key: 'occupation_type' },
    { v: g.height_feet || g.height_inches || g.weight, key: 'height_weight' },
  ]
  const first = fields.find(f => f.v === undefined || f.v === null || String(f.v).trim() === '')
  if (first) {
    scrollToStepAndFocus(stepRefs[0].value as Element | null, first.key)
    return first.key
  }
  if ((g.occupation_type === 'employed' || g.occupation_type === 'unemployed') && !g.occupation_specify?.trim()) {
    scrollToStepAndFocus(stepRefs[0].value as Element | null, 'occupation_specify')
    return 'occupation_specify'
  }
  if (g.marital_status === 'single' && !g.single_partner_info?.trim()) {
    scrollToStepAndFocus(stepRefs[0].value as Element | null, 'single_partner_info')
    return 'single_partner_info'
  }
  const ep = buildEthnicityPayload(form)
  if (!ep.labels.length) {
    scrollToStepAndFocus(stepRefs[0].value as Element | null, 'ethnicity')
    return 'ethnicity'
  }
  if (form.general_info.ethnicity.other && !form.general_info.ethnicity.otherText?.trim()) {
    scrollToStepAndFocus(stepRefs[0].value as Element | null, 'ethnicity_other')
    return 'ethnicity_other'
  }
  return true
}

function validateStep2(): true | string {
  const pbh = form.pregnancy_birth_history
  if (pbh.total_children === '' || pbh.total_children === undefined) {
    scrollToStepAndFocus(stepRefs[1].value as Element | null, 'total_children')
    return 'total_children'
  }
  if (pbh.miscarriages === '') {
    scrollToStepAndFocus(stepRefs[1].value as Element | null, 'miscarriages')
    return 'miscarriages'
  }
  if (pbh.abortions === '') {
    scrollToStepAndFocus(stepRefs[1].value as Element | null, 'abortions')
    return 'abortions'
  }
  return true
}

function validateStep3(): true | string {
  const pbh = form.pregnancy_birth_history
  if (pbh.been_surrogate_before === '') {
    scrollToStepAndFocus(stepRefs[2].value as Element | null, 'been_surrogate_before')
    return 'been_surrogate_before'
  }
  const hasChildren = Number(pbh.total_children) > 0
  if (hasChildren && form.delivery_history.length === 0) {
    scrollToStepAndFocus(stepRefs[2].value as Element | null, 'delivery_history')
    return 'delivery_history'
  }
  for (let i = 0; i < form.delivery_history.length; i++) {
    const d = form.delivery_history[i]
    if (!d.delivery_date || !d.gender?.trim() || !d.birth_weight?.trim() || !d.number_of_weeks?.trim() || !d.delivery_type?.trim() || !d.hospital?.trim()) {
      scrollToStepAndFocus(stepRefs[2].value as Element | null, `delivery_${i}`)
      return 'delivery_record'
    }
  }
  return true
}

function validateStep4(): true | string {
  const pm = form.pregnancy_medical
  const fields: Array<{ v: unknown, key: string }> = [
    { v: pm.anemia, key: 'anemia' },
    { v: pm.severe_vomiting_3mo, key: 'severe_vomiting_3mo' },
    { v: pm.bp_during_pregnancy?.trim(), key: 'bp_during_pregnancy' },
    { v: pm.preeclampsia, key: 'preeclampsia' },
    { v: pm.gestational_diabetes, key: 'gestational_diabetes' },
    { v: pm.hypertension_pregnancy, key: 'hypertension_pregnancy' },
    { v: pm.blood_transfusion, key: 'blood_transfusion' },
    { v: pm.seizures, key: 'seizures' },
  ]
  const first = fields.find(f => f.v === undefined || f.v === null || f.v === '')
  if (first) {
    scrollToStepAndFocus(stepRefs[3].value as Element | null, first.key)
    return first.key
  }
  return true
}

function validateStep5(): true | string {
  const mh = form.medical_health
  const fields: Array<{ v: unknown, key: string }> = [
    { v: mh.regular_menstrual_cycles, key: 'regular_menstrual_cycles' },
    { v: mh.birth_control, key: 'birth_control' },
    { v: mh.taking_medications, key: 'taking_medications' },
    { v: mh.last_pap_smear?.trim(), key: 'last_pap_smear' },
    { v: mh.covid_vaccinated, key: 'covid_vaccinated' },
    { v: mh.hep_b_vaccinated, key: 'hep_b_vaccinated' },
    { v: mh.varicella_vaccinated, key: 'varicella_vaccinated' },
    { v: mh.ongoing_medical_treatment, key: 'ongoing_medical_treatment' },
    { v: mh.surgeries_past_2y, key: 'surgeries_past_2y' },
  ]
  const first = fields.find(f => f.v === undefined || f.v === null || f.v === '')
  if (first) {
    scrollToStepAndFocus(stepRefs[4].value as Element | null, first.key)
    return first.key
  }
  if (mh.birth_control === 'yes' && !mh.birth_control_type?.trim()) {
    scrollToStepAndFocus(stepRefs[4].value as Element | null, 'birth_control_type')
    return 'birth_control_type'
  }
  if (mh.taking_medications === 'yes' && !mh.medications_list?.trim()) {
    scrollToStepAndFocus(stepRefs[4].value as Element | null, 'medications_list')
    return 'medications_list'
  }
  if (mh.surgeries_past_2y === 'yes' && !mh.surgeries_specify?.trim()) {
    scrollToStepAndFocus(stepRefs[4].value as Element | null, 'surgeries_specify')
    return 'surgeries_specify'
  }
  return true
}

function validateStep6(): true | string {
  const ment = form.mental_health
  const fields: Array<{ v: unknown, key: string }> = [
    { v: ment.anxiety_depression, key: 'anxiety_depression' },
    { v: ment.bipolar_schizo_personality, key: 'bipolar_schizo_personality' },
    { v: ment.adhd, key: 'adhd' },
    { v: ment.meds_anxiety_depression, key: 'meds_anxiety_depression' },
  ]
  const first = fields.find(f => f.v === undefined || f.v === null || f.v === '')
  if (first) {
    scrollToStepAndFocus(stepRefs[5].value as Element | null, first.key)
    return first.key
  }
  if (ment.meds_anxiety_depression === 'yes' && !ment.meds_specify?.trim()) {
    scrollToStepAndFocus(stepRefs[5].value as Element | null, 'meds_specify')
    return 'meds_specify'
  }
  return true
}

function validateStep7(): true | string {
  const su = form.substance_use
  const fields: Array<{ v: unknown, key: string }> = [
    { v: su.drug_use_pregnancy, key: 'drug_use_pregnancy' },
    { v: su.marijuana_current, key: 'marijuana_current' },
    { v: su.smoked_vaped_pregnancy, key: 'smoked_vaped_pregnancy' },
    { v: su.alcohol, key: 'alcohol' },
  ]
  const first = fields.find(f => f.v === undefined || f.v === null || f.v === '')
  if (first) {
    scrollToStepAndFocus(stepRefs[6].value as Element | null, first.key)
    return first.key
  }
  if (su.marijuana_current === 'yes' && !su.marijuana_last_use?.trim()) {
    scrollToStepAndFocus(stepRefs[6].value as Element | null, 'marijuana_last_use')
    return 'marijuana_last_use'
  }
  if (su.alcohol === 'yes' && !su.alcohol_frequency?.trim()) {
    scrollToStepAndFocus(stepRefs[6].value as Element | null, 'alcohol_frequency')
    return 'alcohol_frequency'
  }
  if (su.drug_use_pregnancy === 'yes') {
    const has = su.drug_marijuana || su.drug_fentanyl || su.drug_methamphetamine || su.drug_mdma || !!su.drug_other?.trim()
    if (!has) {
      scrollToStepAndFocus(stepRefs[6].value as Element | null, 'drug_types')
      return 'drug_types'
    }
  }
  return true
}

function validateStep8(): true | string {
  const inf = form.infectious_disease
  const fields: Array<{ v: unknown, key: string }> = [
    { v: inf.syphilis, key: 'syphilis' },
    { v: inf.hepatitis_b_c, key: 'hepatitis_b_c' },
    { v: inf.genital_herpes, key: 'genital_herpes' },
    { v: inf.hiv, key: 'hiv' },
  ]
  const first = fields.find(f => f.v === undefined || f.v === null || f.v === '')
  if (first) {
    scrollToStepAndFocus(stepRefs[7].value as Element | null, first.key)
    return first.key
  }
  return true
}

function validateStep9(): true | string {
  const om = form.other_medical
  const fields: Array<{ v: unknown, key: string }> = [
    { v: om.asthma, key: 'asthma' },
    { v: om.heart_conditions, key: 'heart_conditions' },
    { v: om.cancer_history, key: 'cancer_history' },
    { v: om.scoliosis, key: 'scoliosis' },
    { v: om.endometrial_ablation, key: 'endometrial_ablation' },
  ]
  const first = fields.find(f => f.v === undefined || f.v === null || f.v === '')
  if (first) {
    scrollToStepAndFocus(stepRefs[8].value as Element | null, first.key)
    return first.key
  }
  if (om.asthma === 'yes' && !om.asthma_inhaler_per_week?.trim()) {
    scrollToStepAndFocus(stepRefs[8].value as Element | null, 'asthma_inhaler_per_week')
    return 'asthma_inhaler_per_week'
  }
  return true
}

function validateStep10(): true | string {
  const prefs = form.preferences
  const fields: Array<{ v: unknown, key: string }> = [
    { v: prefs.availability?.trim(), key: 'availability' },
    { v: prefs.health_insurance?.trim(), key: 'health_insurance' },
    { v: prefs.open_twins, key: 'open_twins' },
    { v: prefs.open_fetal_reduction, key: 'open_fetal_reduction' },
    { v: prefs.open_termination, key: 'open_termination' },
    { v: prefs.open_amniocentesis_cvs, key: 'open_amniocentesis_cvs' },
    { v: prefs.open_same_sex_single_ip, key: 'open_same_sex_single_ip' },
    { v: prefs.willing_pump_breast_milk, key: 'willing_pump_breast_milk' },
    { v: prefs.open_ip_hiv, key: 'open_ip_hiv' },
    { v: prefs.open_ip_hepatitis_b, key: 'open_ip_hepatitis_b' },
  ]
  const first = fields.find(f => f.v === undefined || f.v === null || f.v === '')
  if (first) {
    scrollToStepAndFocus(stepRefs[9].value as Element | null, first.key)
    return first.key
  }
  return true
}

function validateStep11(): true | string {
  const legal = form.legal_admin
  const fields: Array<{ v: unknown, key: string }> = [
    { v: legal.pending_legal, key: 'pending_legal' },
    { v: legal.criminal_record, key: 'criminal_record' },
    { v: legal.emergency_contact?.trim(), key: 'emergency_contact' },
    { v: legal.government_assistance, key: 'government_assistance' },
  ]
  const first = fields.find(f => f.v === undefined || f.v === null || f.v === '')
  if (first) {
    scrollToStepAndFocus(stepRefs[10].value as Element | null, first.key)
    return first.key
  }
  return true
}

function validateStep12(): true | string {
  const notes = form.notes
  const fields: Array<{ v: unknown, key: string }> = [
    { v: notes.referred_by?.trim(), key: 'referred_by' },
    { v: notes.medical_records_source, key: 'medical_records_source' },
  ]
  const first = fields.find(f => f.v === undefined || f.v === null || f.v === '')
  if (first) {
    scrollToStepAndFocus(stepRefs[11].value as Element | null, first.key)
    return first.key
  }
  return true
}

function validateStep13(): true | string {
  if (!form.finalConsent) {
    scrollToStepAndFocus(stepRefs[12].value as Element | null, 'finalConsent')
    return 'finalConsent'
  }
  return true
}

// 最后一步：仅当同意勾选时 Submit 才可点击
const isStep13Valid = computed(() => form.finalConsent)

onMounted(async () => {
  const stored = loadFromStorage()
  if (stored?.form) {
    applyFormFromStorage(form, stored.form as Record<string, unknown>)
    if (stored.currentStep >= 1 && stored.currentStep <= TOTAL_STEPS)
      currentStep.value = stored.currentStep
    if (stored.applicationId != null)
      applicationId.value = stored.applicationId
  }

  const idParam = route.query.id
  const stepParam = route.query.step
  if (idParam) {
    const id = Number(idParam)
    if (!Number.isNaN(id) && id >= 1) {
      try {
        const res = await getApplicationById(id)
        const data = (res as { data?: { application_data?: SurrogateMotherApplicationData } })?.data
        if (data?.application_data) {
          fillFormFromDraft(form, data.application_data)
          applicationId.value = id
          if (stepParam) {
            const s = Number(stepParam)
            if (!Number.isNaN(s) && s >= 1 && s <= TOTAL_STEPS)
              currentStep.value = s
          }
          syncUrlId(id)
          syncUrlStep(currentStep.value)
        }
      }
      catch {
        // loadDraftFailed
      }
    }
  }
  else if (stored?.applicationId != null) {
    syncUrlId(stored.applicationId)
  }
  syncUrlStep(currentStep.value)

  if (form.delivery_history.length === 0)
    form.delivery_history.push(emptyDelivery())
})

function goPrev() {
  if (currentStep.value <= 1)
    return
  currentStep.value--
  syncUrlStep(currentStep.value)
}

const validators = [validateStep1, validateStep2, validateStep3, validateStep4, validateStep5, validateStep6, validateStep7, validateStep8, validateStep9, validateStep10, validateStep11, validateStep12]

function getFieldLabel(key: string): string {
  const labels = t.value.fieldLabels as Record<string, string>
  return labels[key] ?? key
}

async function goNext() {
  validationError.value = ''
  const step = currentStep.value
  if (step >= 1 && step <= 12) {
    const result = validators[step - 1]()
    if (result !== true) {
      validationError.value = t.value.validationRequiredWithField(getFieldLabel(result))
      return
    }
  }

  isSubmitting.value = true
  try {
    const payload = buildFullPayload(form)
    if (applicationId.value == null) {
      const res = await submitSurrogateApplication({
        application_type: 'surrogate_mother',
        application_data: payload,
        status: 'draft',
      })
      const data = (res as { data?: { id?: number } })?.data ?? (res as { success?: boolean, data?: { id?: number } })?.data
      const id = data?.id
      if (id != null) {
        applicationId.value = id
        syncUrlId(id)
      }
    }
    else {
      await updateApplicationById(applicationId.value, { application_data: payload })
    }
    currentStep.value = step + 1
    syncUrlStep(currentStep.value)
  }
  finally {
    isSubmitting.value = false
  }
}

async function submitFinal() {
  validationError.value = ''
  const result = validateStep13()
  if (result !== true) {
    validationError.value = t.value.validationRequiredWithField(getFieldLabel(result))
    return
  }
  if (applicationId.value == null)
    return
  if (uploadingPhotos.value)
    return

  isSubmitting.value = true
  try {
    const payload = buildFullPayload(form)
    await updateApplicationById(applicationId.value, {
      application_data: payload,
      status: 'pending',
    })
    clearStorage()
    await router.push(localePath('/be-surrogate/success'))
  }
  finally {
    isSubmitting.value = false
  }
}

function scrollToPageTop() {
  if (typeof window === 'undefined')
    return
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
  <div class="min-h-screen bg-[var(--head-bg)]">
    <AppHeader />
    <!-- 首屏：用 min-height + 背景图 object-cover 加高可视区域（换竖图/更高素材时仍适配）；叠层铺满该区域，便于表单整块落在首屏内。 -->
    <section class="w-full overflow-x-hidden">
      <div class="relative min-h-[min(82svh,780px)] w-full lg:min-h-[min(94svh,1080px)]">
        <img
          class="pointer-events-none absolute inset-0 block h-full max-w-none w-full object-cover object-center"
          src="/images/be-surrogate/hero.jpg"
          alt=""
          width="1920"
          height="1080"
          decoding="async"
          fetchpriority="high"
        >
        <div
          class="absolute inset-0 min-h-0 min-w-0 w-full flex flex-col from-black/50 via-black/45 to-black/55 bg-gradient-to-b"
        >
          <div
            class="mx-auto max-w-[min(100%,1600px)] min-h-0 w-full flex flex-1 flex-col gap-6 px-4 pb-4 pt-22 max-lg:flex-none lg:flex-row lg:items-start lg:justify-between lg:gap-0 lg:px-10 md:px-6 xl:px-14 lg:pb-6 lg:pt-18 md:pt-26 xl:pt-20"
          >
            <div
              class="order-1 max-w-xl w-full flex flex-col items-center self-center justify-center text-center 2xl:max-w-[30rem] lg:max-w-[min(100%,26rem)] lg:w-auto xl:max-w-[28rem] lg:flex-none space-y-4 lg:space-y-3"
              style="text-shadow: 0 2px 14px rgba(0, 0, 0, 0.45)"
            >
              <h1
                id="be-surrogate-hero"
                class="text-8 text-white font-semibold italic lg:text-12 sm:text-10 xl:text-[3.2rem] xl:leading-tight"
                style="font-family: var(--font-primary)"
              >
                {{ t.landing.heroTitle }}
              </h1>
              <p
                class="text-4 text-white/95 leading-snug lg:text-[1.05rem] sm:text-4.5 lg:leading-relaxed"
                style="font-family: var(--font-secondary)"
              >
                {{ t.landing.heroSubtitle }}
              </p>
              <p
                class="max-w-full w-fit inline-flex self-center rounded-md bg-[#c17c45] px-4 py-2.5 text-center text-4.5 text-white font-bold leading-snug lg:text-5.5 sm:text-5"
                style="font-family: var(--font-secondary)"
              >
                {{ t.landing.heroCompensation }}
              </p>
            </div>

            <div
              id="gc-application"
              class="order-2 mb-2 min-h-0 scroll-mt-28 border border-white/30 rounded-5 bg-[rgba(253,251,245,0.96)] shadow-[0_28px_64px_rgba(0,0,0,0.22)] backdrop-blur-md lg:mb-0 sm:mb-4 lg:max-h-full lg:max-w-[min(100%,42rem)] lg:min-h-0 lg:w-auto max-lg:w-full xl:max-w-[46rem] lg:flex-none lg:self-start max-lg:self-center lg:overflow-y-auto lg:overscroll-y-contain"
              :class="currentStep === 1 ? 'p-4 sm:p-5 md:p-5 lg:p-4 xl:p-5' : 'p-6 sm:p-8 lg:p-10'"
            >
              <div
                class="flex items-center justify-between gap-4"
                :class="currentStep === 1 ? 'mb-2 lg:mb-2' : 'mb-6'"
              >
                <span class="text-sage-700 text-5 font-medium">
                  {{ t.stepIndicator(currentStep, TOTAL_STEPS) }}
                </span>
                <div class="max-w-80 flex flex-1 gap-2">
                  <span
                    v-for="s in TOTAL_STEPS"
                    :key="s"
                    class="h-2 flex-1 rounded-full"
                    :class="currentStep >= s ? 'bg-[var(--grayish-green)]' : 'bg-gray-200'"
                  />
                </div>
              </div>

              <!-- Step 1: 一、基本信息（首屏紧凑排版，便于落在背景图区域内） -->
              <div v-show="currentStep === 1" ref="step1Ref" class="scroll-mt-10 space-y-2 lg:space-y-2 sm:space-y-2">
                <h2 class="text-sage-700 text-5 font-semibold lg:text-[1.35rem] sm:text-6 lg:leading-snug" style="font-family: var(--font-primary)">
                  {{ t.step1Title }}
                </h2>
                <div class="grid grid-cols-1 gap-2 lg:grid-cols-2 sm:gap-2 lg:gap-x-10 lg:gap-y-2">
                  <div data-field="full_name">
                    <FormInput v-model="form.general_info.full_name" compact :label="t.gcIntake.fullName" required />
                  </div>
                  <div data-field="email">
                    <FormInput v-model="form.general_info.email" compact :label="t.gcIntake.email" type="email" required />
                  </div>
                  <div data-field="phone">
                    <FormPhoneInput
                      v-model="form.general_info.phone"
                      v-model:country-code="form.general_info.country_code"
                      :label="t.gcIntake.phone"
                      required
                      default-country="US"
                    />
                  </div>
                  <div data-field="dob">
                    <FormDatePicker v-model="form.general_info.dob" :label="t.gcIntake.dob" :placeholder="t.datePlaceholder" :locale="locale" :show-format-hint="false" required />
                  </div>
                  <div data-field="state_of_residence">
                    <FormSelect
                      v-model="form.general_info.state_of_residence"
                      :label="t.gcIntake.stateOfResidence"
                      :options="states"
                      :placeholder="states.length ? t.form.selectStateProvince : t.form.noStatesAvailable"
                      required
                    />
                  </div>
                  <div data-field="place_of_birth">
                    <FormInput v-model="form.general_info.place_of_birth" compact :label="t.gcIntake.placeOfBirth" />
                  </div>
                  <div data-field="home_address" class="lg:col-span-2">
                    <FormInput v-model="form.general_info.home_address" compact :label="t.gcIntake.homeAddress" />
                  </div>
                  <div data-field="height_weight" class="lg:col-span-2">
                    <label class="text-sage-700 mb-2 block text-3.5 leading-5 sm:mb-3 sm:text-4 sm:leading-6">{{ t.gcIntake.heightWeight }} <span class="text-red-500">*</span></label>
                    <div class="flex flex-wrap gap-4">
                      <div class="flex items-center gap-2">
                        <input v-model="form.general_info.height_feet" type="number" min="4" max="7" placeholder="5" class="h-15 w-20 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]">
                        <span class="text-gray-600">{{ t.form.units.feet }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <input v-model="form.general_info.height_inches" type="number" min="0" max="11" placeholder="6" class="h-15 w-20 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]">
                        <span class="text-gray-600">{{ t.form.units.inches }}</span>
                      </div>
                      <div class="flex items-center gap-2">
                        <input v-model="form.general_info.weight" type="number" min="80" max="300" placeholder="140" class="h-15 w-24 rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-3 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]">
                        <span class="text-gray-600">{{ t.form.units.pounds }}</span>
                      </div>
                    </div>
                    <p class="mt-1 text-xs text-gray-500 lg:mt-0.5">
                      {{ t.form.bmiAutoCalculated }}: {{ computedBMI }}
                    </p>
                  </div>
                  <div data-field="occupation_type">
                    <p class="mb-1.5 lg:mb-1.5 sm:mb-2">
                      {{ t.gcIntake.occupationSource }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex flex-wrap gap-3 lg:gap-2">
                      <FormRadio v-model="form.general_info.occupation_type" name="occ_v2" value="employed" :label="t.gcIntake.occupationEmployed" />
                      <FormRadio v-model="form.general_info.occupation_type" name="occ_v2" value="stay_at_home" :label="t.gcIntake.occupationStayAtHome" />
                      <FormRadio v-model="form.general_info.occupation_type" name="occ_v2" value="unemployed" :label="t.gcIntake.occupationUnemployed" />
                    </div>
                    <FormInput v-if="form.general_info.occupation_type === 'employed' || form.general_info.occupation_type === 'unemployed'" v-model="form.general_info.occupation_specify" compact class="mt-2" required />
                  </div>
                  <div data-field="marital_status">
                    <p class="mb-1.5 lg:mb-1.5 sm:mb-2">
                      {{ t.gcIntake.maritalStatus }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex flex-wrap gap-3 lg:gap-2">
                      <FormRadio v-model="form.general_info.marital_status" name="mar_v2" value="married" :label="t.gcIntake.maritalMarried" />
                      <FormRadio v-model="form.general_info.marital_status" name="mar_v2" value="single" :label="t.gcIntake.maritalSingle" />
                      <FormRadio v-model="form.general_info.marital_status" name="mar_v2" value="cohabitating" :label="t.gcIntake.maritalCohabitating" />
                      <FormRadio v-model="form.general_info.marital_status" name="mar_v2" value="divorced" :label="t.gcIntake.maritalDivorced" />
                    </div>
                    <FormInput v-if="form.general_info.marital_status === 'single'" v-model="form.general_info.single_partner_info" compact :label="t.gcIntake.singlePartnerInfo" class="mt-2" data-field="single_partner_info" />
                  </div>
                  <div data-field="us_citizen_or_resident">
                    <p class="mb-2 lg:mb-1.5">
                      {{ t.gcIntake.usCitizenOrResident }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-6 lg:gap-8">
                      <FormRadio v-model="form.general_info.us_citizen_or_resident" name="us_v2" value="yes" :label="t.form.yes" />
                      <FormRadio v-model="form.general_info.us_citizen_or_resident" name="us_v2" value="no" :label="t.form.no" />
                    </div>
                  </div>
                  <div data-field="ethnicity" class="lg:col-span-2">
                    <p class="mb-1.5 lg:mb-1 sm:mb-2">
                      {{ t.gcIntake.ethnicity.label }} <span class="text-red-500">*</span>
                    </p>
                    <div class="grid grid-cols-1 gap-2 gap-x-4 lg:grid-cols-3 sm:grid-cols-2">
                      <FormCheckbox v-model="form.general_info.ethnicity.asian" :label="t.gcIntake.ethnicity.options.asian" />
                      <FormCheckbox v-model="form.general_info.ethnicity.white" :label="t.gcIntake.ethnicity.options.white" />
                      <FormCheckbox v-model="form.general_info.ethnicity.black" :label="t.gcIntake.ethnicity.options.black" />
                      <FormCheckbox v-model="form.general_info.ethnicity.hispanic" :label="t.gcIntake.ethnicity.options.hispanic" />
                      <FormCheckbox v-model="form.general_info.ethnicity.middleEastern" :label="t.gcIntake.ethnicity.options.middleEastern" />
                      <FormCheckbox v-model="form.general_info.ethnicity.nativeAmerican" :label="t.gcIntake.ethnicity.options.nativeAmerican" />
                      <FormCheckbox v-model="form.general_info.ethnicity.pacificIslander" :label="t.gcIntake.ethnicity.options.pacificIslander" />
                      <FormCheckbox v-model="form.general_info.ethnicity.mixedRace" :label="t.gcIntake.ethnicity.options.mixedRace" />
                      <FormCheckbox v-model="form.general_info.ethnicity.preferNotToSay" :label="t.gcIntake.ethnicity.options.preferNotToSay" />
                      <FormCheckbox v-model="form.general_info.ethnicity.other" :label="t.gcIntake.ethnicity.options.other" />
                    </div>
                    <FormInput v-if="form.general_info.ethnicity.other" v-model="form.general_info.ethnicity.otherText" compact :label="t.gcIntake.ethnicitySelfDescribe" class="mt-2" data-field="ethnicity_other" />
                  </div>
                </div>
              </div>

              <!-- Step 2: 二、怀孕与分娩史 -->
              <div v-show="currentStep === 2" ref="step2Ref" class="scroll-mt-24 space-y-6">
                <h2 class="text-sage-700 text-6 font-semibold" style="font-family: var(--font-primary)">
                  {{ t.step2Title }}
                </h2>
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
                  <FormInput v-model="form.pregnancy_birth_history.total_children" :label="t.gcIntake.totalChildren" type="number" data-field="total_children" required />
                  <FormInput v-model="form.pregnancy_birth_history.total_vaginal" :label="t.gcIntake.totalVaginal" type="number" />
                  <FormInput v-model="form.pregnancy_birth_history.total_c_sections" :label="t.gcIntake.totalCSections" type="number" />
                  <div data-field="miscarriages">
                    <p class="mb-4">
                      {{ t.gcIntake.miscarriages }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.pregnancy_birth_history.miscarriages" name="misc_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.pregnancy_birth_history.miscarriages" name="misc_v2" value="yes" :label="t.form.yes" />
                    </div>
                    <FormInput v-if="form.pregnancy_birth_history.miscarriages === 'yes'" v-model="form.pregnancy_birth_history.miscarriages_detail" :label="t.gcIntake.miscarriagesDetail" class="mt-4" />
                  </div>
                  <div data-field="abortions">
                    <p class="mb-4">
                      {{ t.gcIntake.abortions }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.pregnancy_birth_history.abortions" name="abor_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.pregnancy_birth_history.abortions" name="abor_v2" value="yes" :label="t.form.yes" />
                    </div>
                    <FormInput v-if="form.pregnancy_birth_history.abortions === 'yes'" v-model="form.pregnancy_birth_history.abortions_detail" :label="t.gcIntake.abortionsDetail" class="mt-4" />
                  </div>
                </div>
              </div>

              <!-- Step 3: 三、分娩记录 -->
              <div v-show="currentStep === 3" ref="step3Ref" class="scroll-mt-24 space-y-6">
                <h2 class="text-sage-700 text-6 font-semibold" style="font-family: var(--font-primary)">
                  {{ t.step3Title }}
                </h2>
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
                  <div data-field="been_surrogate_before">
                    <p class="mb-4">
                      {{ t.gcIntake.beenSurrogateBefore }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.pregnancy_birth_history.been_surrogate_before" name="been_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.pregnancy_birth_history.been_surrogate_before" name="been_v2" value="yes" :label="t.form.yes" />
                    </div>
                    <FormInput v-if="form.pregnancy_birth_history.been_surrogate_before === 'yes'" v-model="form.pregnancy_birth_history.been_surrogate_when" :label="t.gcIntake.beenSurrogateWhen" class="mt-4" />
                  </div>
                </div>
                <div class="mt-8 space-y-4" data-field="delivery_history">
                  <div v-for="(d, idx) in form.delivery_history" :key="idx" :data-field="`delivery_${idx}`" class="rounded-3 bg-[rgba(234,232,208,0.15)] p-6">
                    <div class="mb-4 flex justify-between">
                      <span class="font-semibold">{{ t.gcIntake.babyNum(idx + 1) }}</span>
                      <button type="button" class="text-4 text-[var(--grayish-green)] hover:underline" @click="removeDelivery(idx)">
                        {{ t.gcIntake.removeDelivery }}
                      </button>
                    </div>
                    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
                      <FormDatePicker v-model="d.delivery_date" :label="t.gcIntake.deliveryDate" :placeholder="t.datePlaceholder" :locale="locale" />
                      <FormInput v-model="d.gender" :label="t.gcIntake.gender" />
                      <FormInput v-model="d.birth_weight" :label="t.gcIntake.birthWeight" />
                      <FormInput v-model="d.number_of_weeks" :label="t.gcIntake.numberOfWeeks" />
                      <FormInput v-model="d.delivery_type" :label="t.gcIntake.deliveryType" />
                      <FormInput v-model="d.hospital" :label="t.gcIntake.deliveryHospital" />
                    </div>
                  </div>
                  <button type="button" class="rounded-2 bg-[var(--grayish-green)] px-8 py-3 text-white font-bold shadow transition disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-90" :disabled="form.delivery_history.length >= 10" @click="addDelivery">
                    {{ t.gcIntake.addDelivery }}
                  </button>
                </div>
              </div>

              <!-- Step 4: 四、孕期相关病史 -->
              <div v-show="currentStep === 4" ref="step4Ref" class="scroll-mt-24 space-y-6">
                <h2 class="text-sage-700 text-6 font-semibold" style="font-family: var(--font-primary)">
                  {{ t.step4Title }}
                </h2>
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
                  <div data-field="anemia">
                    <p class="mb-2">
                      {{ t.gcIntake.anemia }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.pregnancy_medical.anemia" name="anemia_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.pregnancy_medical.anemia" name="anemia_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="severe_vomiting_3mo">
                    <p class="mb-2">
                      {{ t.gcIntake.severeVomiting3mo }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.pregnancy_medical.severe_vomiting_3mo" name="sev_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.pregnancy_medical.severe_vomiting_3mo" name="sev_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <FormInput v-model="form.pregnancy_medical.bp_during_pregnancy" :label="t.gcIntake.bpDuringPregnancy" data-field="bp_during_pregnancy" required />
                  <div data-field="preeclampsia">
                    <p class="mb-2">
                      {{ t.gcIntake.preeclampsia }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.pregnancy_medical.preeclampsia" name="pre_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.pregnancy_medical.preeclampsia" name="pre_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="gestational_diabetes">
                    <p class="mb-2">
                      {{ t.gcIntake.gestationalDiabetes }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.pregnancy_medical.gestational_diabetes" name="gd_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.pregnancy_medical.gestational_diabetes" name="gd_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="hypertension_pregnancy">
                    <p class="mb-2">
                      {{ t.gcIntake.hypertensionPregnancy }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.pregnancy_medical.hypertension_pregnancy" name="hyp_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.pregnancy_medical.hypertension_pregnancy" name="hyp_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="blood_transfusion">
                    <p class="mb-2">
                      {{ t.gcIntake.bloodTransfusion }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.pregnancy_medical.blood_transfusion" name="bt_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.pregnancy_medical.blood_transfusion" name="bt_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="seizures">
                    <p class="mb-2">
                      {{ t.gcIntake.seizures }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.pregnancy_medical.seizures" name="seiz_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.pregnancy_medical.seizures" name="seiz_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 5: 五、医疗与健康史 -->
              <div v-show="currentStep === 5" ref="step5Ref" class="scroll-mt-24 space-y-6">
                <h2 class="text-sage-700 text-6 font-semibold" style="font-family: var(--font-primary)">
                  {{ t.step5Title }}
                </h2>
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
                  <div data-field="regular_menstrual_cycles">
                    <p class="mb-2">
                      {{ t.gcIntake.regularMenstrualCycles }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.medical_health.regular_menstrual_cycles" name="men_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.medical_health.regular_menstrual_cycles" name="men_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="birth_control">
                    <p class="mb-2">
                      {{ t.gcIntake.birthControl }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.medical_health.birth_control" name="bc_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.medical_health.birth_control" name="bc_v2" value="yes" :label="t.form.yes" />
                    </div>
                    <FormInput v-if="form.medical_health.birth_control === 'yes'" v-model="form.medical_health.birth_control_type" :label="t.gcIntake.birthControlType" class="mt-4" data-field="birth_control_type" />
                  </div>
                  <div data-field="taking_medications">
                    <p class="mb-2">
                      {{ t.gcIntake.takingMedications }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.medical_health.taking_medications" name="tm_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.medical_health.taking_medications" name="tm_v2" value="yes" :label="t.form.yes" />
                    </div>
                    <FormInput v-if="form.medical_health.taking_medications === 'yes'" v-model="form.medical_health.medications_list" :label="t.gcIntake.medicationsList" class="mt-4" data-field="medications_list" />
                  </div>
                  <FormInput v-model="form.medical_health.last_pap_smear" :label="t.gcIntake.lastPapSmear" data-field="last_pap_smear" required />
                  <div data-field="covid_vaccinated">
                    <p class="mb-2">
                      {{ t.gcIntake.covidVaccinated }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.medical_health.covid_vaccinated" name="cov_v2" value="yes" :label="t.form.yes" />
                      <FormRadio v-model="form.medical_health.covid_vaccinated" name="cov_v2" value="no" :label="t.form.no" />
                    </div>
                  </div>
                  <div data-field="hep_b_vaccinated">
                    <p class="mb-2">
                      {{ t.gcIntake.hepBVaccinated }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.medical_health.hep_b_vaccinated" name="hep_v2" value="yes" :label="t.form.yes" />
                      <FormRadio v-model="form.medical_health.hep_b_vaccinated" name="hep_v2" value="no" :label="t.form.no" />
                    </div>
                  </div>
                  <div data-field="varicella_vaccinated">
                    <p class="mb-2">
                      {{ t.gcIntake.varicellaVaccinated }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.medical_health.varicella_vaccinated" name="var_v2" value="yes" :label="t.form.yes" />
                      <FormRadio v-model="form.medical_health.varicella_vaccinated" name="var_v2" value="no" :label="t.form.no" />
                    </div>
                  </div>
                  <div data-field="ongoing_medical_treatment">
                    <p class="mb-2">
                      {{ t.gcIntake.ongoingMedicalTreatment }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.medical_health.ongoing_medical_treatment" name="omt_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.medical_health.ongoing_medical_treatment" name="omt_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="surgeries_past_2y">
                    <p class="mb-2">
                      {{ t.gcIntake.surgeriesPast2y }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.medical_health.surgeries_past_2y" name="sur_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.medical_health.surgeries_past_2y" name="sur_v2" value="yes" :label="t.form.yes" />
                    </div>
                    <FormInput v-if="form.medical_health.surgeries_past_2y === 'yes'" v-model="form.medical_health.surgeries_specify" :label="t.gcIntake.surgeriesSpecify" class="mt-4" data-field="surgeries_specify" />
                  </div>
                </div>
              </div>

              <!-- Step 6: 六、心理健康史 -->
              <div v-show="currentStep === 6" ref="step6Ref" class="scroll-mt-24 space-y-6">
                <h2 class="text-sage-700 text-6 font-semibold" style="font-family: var(--font-primary)">
                  {{ t.step6Title }}
                </h2>
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
                  <div data-field="anxiety_depression">
                    <p class="mb-2">
                      {{ t.gcIntake.anxietyDepression }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.mental_health.anxiety_depression" name="anx_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.mental_health.anxiety_depression" name="anx_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="bipolar_schizo_personality">
                    <p class="mb-2">
                      {{ t.gcIntake.bipolarSchizoPersonality }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.mental_health.bipolar_schizo_personality" name="bip_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.mental_health.bipolar_schizo_personality" name="bip_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="adhd">
                    <p class="mb-2">
                      {{ t.gcIntake.adhd }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.mental_health.adhd" name="adhd_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.mental_health.adhd" name="adhd_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="meds_anxiety_depression">
                    <p class="mb-2">
                      {{ t.gcIntake.medsAnxietyDepression }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.mental_health.meds_anxiety_depression" name="meds_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.mental_health.meds_anxiety_depression" name="meds_v2" value="yes" :label="t.form.yes" />
                    </div>
                    <FormInput v-if="form.mental_health.meds_anxiety_depression === 'yes'" v-model="form.mental_health.meds_specify" :label="t.gcIntake.medsSpecify" class="mt-4" data-field="meds_specify" />
                  </div>
                </div>
              </div>

              <!-- Step 7: 七、药物使用史 -->
              <div v-show="currentStep === 7" ref="step7Ref" class="scroll-mt-24 space-y-6">
                <h2 class="text-sage-700 text-6 font-semibold" style="font-family: var(--font-primary)">
                  {{ t.step7Title }}
                </h2>
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
                  <div data-field="drug_use_pregnancy">
                    <p class="mb-2">
                      {{ t.gcIntake.drugUsePregnancy }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.substance_use.drug_use_pregnancy" name="drug_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.substance_use.drug_use_pregnancy" name="drug_v2" value="yes" :label="t.form.yes" />
                    </div>
                    <div v-if="form.substance_use.drug_use_pregnancy === 'yes'" class="mt-4 flex flex-wrap gap-4">
                      <FormCheckbox v-model="form.substance_use.drug_marijuana" :label="t.gcIntake.drugMarijuana" />
                      <FormCheckbox v-model="form.substance_use.drug_fentanyl" :label="t.gcIntake.drugFentanyl" />
                      <FormCheckbox v-model="form.substance_use.drug_methamphetamine" :label="t.gcIntake.drugMethamphetamine" />
                      <FormCheckbox v-model="form.substance_use.drug_mdma" :label="t.gcIntake.drugMDMA" />
                      <FormInput v-model="form.substance_use.drug_other" :label="t.gcIntake.drugOther" />
                    </div>
                  </div>
                  <div data-field="marijuana_current">
                    <p class="mb-2">
                      {{ t.gcIntake.marijuanaCurrent }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.substance_use.marijuana_current" name="marj_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.substance_use.marijuana_current" name="marj_v2" value="yes" :label="t.form.yes" />
                    </div>
                    <FormInput v-if="form.substance_use.marijuana_current === 'yes'" v-model="form.substance_use.marijuana_last_use" :label="t.gcIntake.marijuanaLastUse" class="mt-4" data-field="marijuana_last_use" />
                  </div>
                  <div data-field="smoked_vaped_pregnancy">
                    <p class="mb-2">
                      {{ t.gcIntake.smokedVapedPregnancy }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.substance_use.smoked_vaped_pregnancy" name="smoke_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.substance_use.smoked_vaped_pregnancy" name="smoke_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="alcohol">
                    <p class="mb-2">
                      {{ t.gcIntake.alcohol }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.substance_use.alcohol" name="alc_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.substance_use.alcohol" name="alc_v2" value="yes" :label="t.form.yes" />
                    </div>
                    <FormInput v-if="form.substance_use.alcohol === 'yes'" v-model="form.substance_use.alcohol_frequency" :label="t.gcIntake.alcoholFrequency" class="mt-4" data-field="alcohol_frequency" />
                  </div>
                </div>
              </div>

              <!-- Step 8: 八、传染病史 -->
              <div v-show="currentStep === 8" ref="step8Ref" class="scroll-mt-24 space-y-6">
                <h2 class="text-sage-700 text-6 font-semibold" style="font-family: var(--font-primary)">
                  {{ t.step8Title }}
                </h2>
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
                  <div data-field="syphilis">
                    <p class="mb-2">
                      {{ t.gcIntake.syphilis }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.infectious_disease.syphilis" name="syp_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.infectious_disease.syphilis" name="syp_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="hepatitis_b_c">
                    <p class="mb-2">
                      {{ t.gcIntake.hepatitisBC }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.infectious_disease.hepatitis_b_c" name="hepbc_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.infectious_disease.hepatitis_b_c" name="hepbc_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="genital_herpes">
                    <p class="mb-2">
                      {{ t.gcIntake.genitalHerpes }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.infectious_disease.genital_herpes" name="herp_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.infectious_disease.genital_herpes" name="herp_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="hiv">
                    <p class="mb-2">
                      {{ t.gcIntake.hiv }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.infectious_disease.hiv" name="hiv_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.infectious_disease.hiv" name="hiv_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 9: 九、其他医疗状况 -->
              <div v-show="currentStep === 9" ref="step9Ref" class="scroll-mt-24 space-y-6">
                <h2 class="text-sage-700 text-6 font-semibold" style="font-family: var(--font-primary)">
                  {{ t.step9Title }}
                </h2>
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
                  <div data-field="asthma">
                    <p class="mb-2">
                      {{ t.gcIntake.asthma }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.other_medical.asthma" name="ast_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.other_medical.asthma" name="ast_v2" value="yes" :label="t.form.yes" />
                    </div>
                    <FormInput v-if="form.other_medical.asthma === 'yes'" v-model="form.other_medical.asthma_inhaler_per_week" :label="t.gcIntake.asthmaInhaler" class="mt-4" data-field="asthma_inhaler_per_week" />
                  </div>
                  <div data-field="heart_conditions">
                    <p class="mb-2">
                      {{ t.gcIntake.heartConditions }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.other_medical.heart_conditions" name="heart_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.other_medical.heart_conditions" name="heart_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="cancer_history">
                    <p class="mb-2">
                      {{ t.gcIntake.cancerHistory }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.other_medical.cancer_history" name="can_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.other_medical.cancer_history" name="can_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="scoliosis">
                    <p class="mb-2">
                      {{ t.gcIntake.scoliosis }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.other_medical.scoliosis" name="sco_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.other_medical.scoliosis" name="sco_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="endometrial_ablation">
                    <p class="mb-2">
                      {{ t.gcIntake.endometrialAblation }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.other_medical.endometrial_ablation" name="endo_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.other_medical.endometrial_ablation" name="endo_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 10: 十、偏好与匹配考量 -->
              <div v-show="currentStep === 10" ref="step10Ref" class="scroll-mt-24 space-y-6">
                <h2 class="text-sage-700 text-6 font-semibold" style="font-family: var(--font-primary)">
                  {{ t.step10Title }}
                </h2>
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
                  <FormInput v-model="form.preferences.availability" :label="t.gcIntake.availability" data-field="availability" required />
                  <FormInput v-model="form.preferences.health_insurance" :label="t.gcIntake.healthInsurance" data-field="health_insurance" required />
                  <div data-field="open_twins">
                    <p class="mb-2">
                      {{ t.gcIntake.openTwins }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.preferences.open_twins" name="twins_v2" value="yes" :label="t.form.yes" />
                      <FormRadio v-model="form.preferences.open_twins" name="twins_v2" value="no" :label="t.form.no" />
                    </div>
                  </div>
                  <div data-field="open_fetal_reduction">
                    <p class="mb-2">
                      {{ t.gcIntake.openFetalReduction }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.preferences.open_fetal_reduction" name="red_v2" value="yes" :label="t.form.yes" />
                      <FormRadio v-model="form.preferences.open_fetal_reduction" name="red_v2" value="no" :label="t.form.no" />
                    </div>
                  </div>
                  <div data-field="open_termination">
                    <p class="mb-2">
                      {{ t.gcIntake.openTermination }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.preferences.open_termination" name="term_v2" value="yes" :label="t.form.yes" />
                      <FormRadio v-model="form.preferences.open_termination" name="term_v2" value="no" :label="t.form.no" />
                    </div>
                  </div>
                  <div data-field="open_amniocentesis_cvs">
                    <p class="mb-2">
                      {{ t.gcIntake.openAmniocentesisCVS }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.preferences.open_amniocentesis_cvs" name="cvs_v2" value="yes" :label="t.form.yes" />
                      <FormRadio v-model="form.preferences.open_amniocentesis_cvs" name="cvs_v2" value="no" :label="t.form.no" />
                    </div>
                  </div>
                  <div data-field="open_same_sex_single_ip">
                    <p class="mb-2">
                      {{ t.gcIntake.openSameSexSingleIP }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.preferences.open_same_sex_single_ip" name="ss_v2" value="yes" :label="t.form.yes" />
                      <FormRadio v-model="form.preferences.open_same_sex_single_ip" name="ss_v2" value="no" :label="t.form.no" />
                    </div>
                  </div>
                  <div data-field="willing_pump_breast_milk">
                    <p class="mb-2">
                      {{ t.gcIntake.willingPumpBreastMilk }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.preferences.willing_pump_breast_milk" name="pump_v2" value="yes" :label="t.form.yes" />
                      <FormRadio v-model="form.preferences.willing_pump_breast_milk" name="pump_v2" value="no" :label="t.form.no" />
                    </div>
                  </div>
                  <div data-field="open_ip_hiv">
                    <p class="mb-2">
                      {{ t.gcIntake.openIPHIV }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.preferences.open_ip_hiv" name="iphiv_v2" value="yes" :label="t.form.yes" />
                      <FormRadio v-model="form.preferences.open_ip_hiv" name="iphiv_v2" value="no" :label="t.form.no" />
                    </div>
                  </div>
                  <div data-field="open_ip_hepatitis_b">
                    <p class="mb-2">
                      {{ t.gcIntake.openIPHepatitisB }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.preferences.open_ip_hepatitis_b" name="iphep_v2" value="yes" :label="t.form.yes" />
                      <FormRadio v-model="form.preferences.open_ip_hepatitis_b" name="iphep_v2" value="no" :label="t.form.no" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 11: 十一、法律与行政 -->
              <div v-show="currentStep === 11" ref="step11Ref" class="scroll-mt-24 space-y-6">
                <h2 class="text-sage-700 text-6 font-semibold" style="font-family: var(--font-primary)">
                  {{ t.step11Title }}
                </h2>
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
                  <div data-field="pending_legal">
                    <p class="mb-2">
                      {{ t.gcIntake.pendingLegal }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.legal_admin.pending_legal" name="legal_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.legal_admin.pending_legal" name="legal_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="criminal_record">
                    <p class="mb-2">
                      {{ t.gcIntake.criminalRecord }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.legal_admin.criminal_record" name="crim_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.legal_admin.criminal_record" name="crim_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <div data-field="government_assistance">
                    <p class="mb-2">
                      {{ t.gcIntake.governmentAssistance }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex gap-8">
                      <FormRadio v-model="form.legal_admin.government_assistance" name="gov_v2" value="no" :label="t.form.no" />
                      <FormRadio v-model="form.legal_admin.government_assistance" name="gov_v2" value="yes" :label="t.form.yes" />
                    </div>
                  </div>
                  <FormInput v-model="form.legal_admin.emergency_contact" :label="t.gcIntake.emergencyContact" class="lg:col-span-2" data-field="emergency_contact" required />
                </div>
              </div>

              <!-- Step 12: 十二、备注 -->
              <div v-show="currentStep === 12" ref="step12Ref" class="scroll-mt-24 space-y-6">
                <h2 class="text-sage-700 text-6 font-semibold" style="font-family: var(--font-primary)">
                  {{ t.step12Title }}
                </h2>
                <div class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-x-28">
                  <FormInput v-model="form.notes.referred_by" :label="t.gcIntake.referredBy" data-field="referred_by" required />
                  <div data-field="medical_records_source">
                    <p class="mb-2">
                      {{ t.gcIntake.medicalRecordsSource }} <span class="text-red-500">*</span>
                    </p>
                    <div class="flex flex-wrap gap-4">
                      <FormRadio v-model="form.notes.medical_records_source" name="mrs_v2" value="patient_portal" :label="t.gcIntake.medicalRecordsPatientPortal" />
                      <FormRadio v-model="form.notes.medical_records_source" name="mrs_v2" value="clinic" :label="t.gcIntake.medicalRecordsClinic" />
                      <FormRadio v-model="form.notes.medical_records_source" name="mrs_v2" value="other" :label="t.gcIntake.medicalRecordsOther" />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 13: 上传照片与同意 -->
              <div v-show="currentStep === 13" ref="step13Ref" class="scroll-mt-24 space-y-6">
                <h2 class="text-sage-700 text-6 font-semibold" style="font-family: var(--font-primary)">
                  {{ t.step13Title }}
                </h2>
                <div data-field="uploadPhotos" class="space-y-4">
                  <p class="font-medium">
                    {{ t.form.uploadPhotos }} <span class="text-red-500">*</span> ({{ t.form.uploadPhotosMinTip }})
                  </p>
                  <div v-if="form.uploadPhotos.length" class="flex flex-wrap gap-4">
                    <div v-for="(photo, idx) in form.uploadPhotos" :key="idx" class="group relative">
                      <img :src="photo" class="h-24 w-24 border rounded-2 object-cover">
                      <button type="button" class="absolute right-1 top-1 h-6 w-6 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-red-500" @click.stop="removePhoto(idx)">
                        <svg width="12" height="12" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
                      </button>
                    </div>
                  </div>
                  <div
                    class="flex flex-col cursor-pointer items-center justify-center border-2 rounded-4 border-dashed py-10 transition"
                    :class="form.uploadPhotos.length >= MAX_UPLOAD_PHOTOS ? 'border-gray-300 cursor-not-allowed bg-gray-50' : 'border-[var(--grayish-green)] hover:bg-[rgba(234,232,208,0.25)]'"
                    @dragover.prevent
                    @drop.prevent="handleDrop"
                    @click="form.uploadPhotos.length < MAX_UPLOAD_PHOTOS && fileInputRef?.click()"
                  >
                    <span v-if="form.uploadPhotos.length >= MAX_UPLOAD_PHOTOS" class="text-gray-500">{{ t.form.uploadPhotosMaxTip }}</span>
                    <template v-else>
                      <span class="mb-2 block text-6 text-[var(--grayish-green)]">+</span>
                      <span class="text-5 text-gray-600">{{ t.form.uploadPhotosTip }}</span>
                    </template>
                    <input ref="fileInputRef" type="file" multiple accept="image/*" class="hidden" @change="onPhotoChange">
                  </div>
                </div>
                <div data-field="finalConsent" class="rounded-3 bg-[rgba(234,232,208,0.2)] p-6">
                  <FormCheckbox
                    v-model="form.finalConsent"
                    :label="t.form.finalConsent.text"
                  />
                  <p class="mt-2 text-13px italic">
                    {{ t.form.finalConsent.disclaimer }}
                  </p>
                </div>
              </div>

              <div v-if="validationError" class="mt-4 rounded-3 bg-red-50 px-4 py-3 text-sm text-red-600 sm:mt-6 sm:text-base">
                {{ validationError }}
              </div>

              <div class="flex flex-wrap gap-3 sm:gap-4" :class="currentStep === 1 ? 'mt-4 sm:mt-5 lg:mt-4' : 'mt-10 sm:mt-12'">
                <button
                  v-if="currentStep > 1"
                  type="button"
                  class="rounded-2 bg-[var(--grayish-green)] px-8 py-3 text-white transition hover:opacity-90"
                  @click="goPrev"
                >
                  {{ t.btnPrev }}
                </button>
                <template v-if="currentStep < TOTAL_STEPS">
                  <button
                    type="button"
                    class="rounded-2 bg-[var(--grayish-green)] px-8 py-3 text-white font-semibold transition disabled:opacity-50 hover:opacity-90"
                    :disabled="isSubmitting"
                    @click="goNext"
                  >
                    {{ t.btnNext }}
                  </button>
                </template>
                <template v-else>
                  <button
                    type="button"
                    class="rounded-2 bg-[var(--grayish-green)] px-8 py-3 text-white font-semibold transition disabled:opacity-50 hover:opacity-90"
                    :disabled="!isStep13Valid || isSubmitting || uploadingPhotos"
                    :class="{ 'opacity-50 cursor-not-allowed': !isStep13Valid }"
                    @click="submitFinal"
                  >
                    {{ t.btnSubmit }}
                  </button>
                </template>
              </div>
            </div>
          </div>

          <p
            class="shrink-0 px-4 pb-5 pt-1 text-center text-3.5 text-white font-medium leading-snug tracking-wide sm:pb-6 md:text-4.5 sm:text-4"
            style="font-family: var(--font-secondary); text-shadow: 0 1px 12px rgba(0, 0, 0, 0.55)"
          >
            {{ t.landing.heroPillars }}
          </p>
        </div>
      </div>
    </section>

    <AssociationSection variant="plain" class="!pb-0" />

    <section class="bg-[var(--head-bg)] px-4 pb-12 pt-0 md:px-16 md:pb-16 md:pt-0">
      <div class="mx-auto max-w-220 text-center">
        <p
          class="text-4.5 text-[var(--dark-brown)] leading-relaxed md:text-5"
          style="font-family: var(--font-secondary)"
        >
          {{ t.landing.trustBlurb }}
        </p>
        <button
          type="button"
          class="shadow-inner-white-soft mt-10 inline-flex items-center justify-center rounded-3 bg-[var(--grayish-green)] px-8 py-3.5 text-4 text-white font-semibold tracking-wide uppercase transition hover:opacity-90"
          @click="scrollToPageTop"
        >
          {{ t.landing.ctaBecomeSurrogate }}
        </button>
      </div>
    </section>

    <section class="bg-[var(--head-bg)] px-4 py-12 md:px-16 md:py-16">
      <div class="mx-auto max-w-320">
        <h2 class="text-center text-7 font-semibold md:text-9" style="font-family: var(--font-primary)">
          {{ t.landing.shortsTitle }}
        </h2>
        <p
          class="mx-auto mt-5 max-w-200 text-center text-4.5 text-[var(--dark-brown)] leading-relaxed md:text-5"
          style="font-family: var(--font-secondary)"
        >
          {{ t.landing.shortsIntro }}
        </p>
        <div class="grid grid-cols-1 mt-12 gap-12 md:grid-cols-3 md:gap-8">
          <div class="flex flex-col items-center md:px-4">
            <p class="mb-4 text-5 text-black font-semibold">
              {{ t.landing.shortInsurance }}
            </p>
            <div class="aspect-[9/16] max-w-68 w-full overflow-hidden rounded-4 bg-black shadow-lg">
              <iframe
                class="h-full w-full"
                src="https://www.youtube.com/embed/mOwFngnTZvo"
                title="Yunda Surrogacy — Insurance"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              />
            </div>
          </div>
          <div class="flex flex-col items-center md:px-4">
            <p class="mb-4 text-5 text-black font-semibold">
              {{ t.landing.shortLegal }}
            </p>
            <div class="aspect-[9/16] max-w-68 w-full overflow-hidden rounded-4 bg-black shadow-lg">
              <iframe
                class="h-full w-full"
                src="https://www.youtube.com/embed/TN4rMZfbhGg"
                title="Yunda Surrogacy — Legal"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              />
            </div>
          </div>
          <div class="flex flex-col items-center md:px-4">
            <p class="mb-4 text-5 text-black font-semibold">
              {{ t.landing.shortEscrow }}
            </p>
            <div class="aspect-[9/16] max-w-68 w-full overflow-hidden rounded-4 bg-black shadow-lg">
              <iframe
                class="h-full w-full"
                src="https://www.youtube.com/embed/1oBL9IwOONg"
                title="Yunda Surrogacy — Escrow"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[var(--head-bg)] px-4 py-12 md:px-16 md:py-16">
      <div class="mx-auto max-w-280 lg:max-w-320">
        <h2
          class="mx-auto mb-12 max-w-260 text-center text-6 font-semibold md:mb-14 md:max-w-2xl lg:text-9 md:text-8"
          style="font-family: var(--font-primary)"
        >
          {{ t.landing.eligibilitySectionTitle }}
        </h2>
        <div class="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          <div class="w-full md:max-w-lg md:justify-self-end">
            <h3 class="text-6 font-semibold md:text-7" style="font-family: var(--font-primary)">
              {{ t.landing.ifYouAreHeading }}
            </h3>
            <ul
              class="mt-5 list-disc pl-6 text-4.5 text-[var(--dark-brown)] space-y-3 md:text-5"
              style="font-family: var(--font-secondary)"
            >
              <li v-for="(item, i) in t.landing.ifYouAreItems" :key="`if-${i}`">
                {{ item }}
              </li>
            </ul>
            <NuxtLink
              :to="localePath('/eligibility')"
              class="mt-6 inline-flex rounded-2 bg-[var(--grayish-green)] px-6 py-2.5 text-4 text-white font-semibold transition hover:opacity-90"
            >
              {{ t.landing.learnMore }}
            </NuxtLink>
          </div>
          <div class="w-full md:max-w-lg md:justify-self-start">
            <h3 class="text-6 font-semibold md:text-7" style="font-family: var(--font-primary)">
              {{ t.landing.youWillReceiveHeading }}
            </h3>
            <ul
              class="mt-5 list-disc pl-6 text-4.5 text-[var(--dark-brown)] space-y-3 md:text-5"
              style="font-family: var(--font-secondary)"
            >
              <li v-for="(item, i) in t.landing.youWillReceiveItems" :key="`recv-${i}`">
                {{ item }}
              </li>
            </ul>
            <NuxtLink
              :to="localePath('/benefit')"
              class="mt-6 inline-flex rounded-2 bg-[var(--grayish-green)] px-6 py-2.5 text-4 text-white font-semibold transition hover:opacity-90"
            >
              {{ t.landing.learnMore }}
            </NuxtLink>
          </div>
        </div>

        <h3 class="mt-16 text-center text-6 font-semibold md:mt-20 md:text-7" style="font-family: var(--font-primary)">
          {{ t.landing.processTitle }}
        </h3>
        <div class="mt-8 flex justify-center">
          <img
            src="/images/be-surrogate/surrogacy-process-flowchart.jpg"
            :alt="t.landing.processFlowchartAlt"
            class="max-w-260 w-full object-contain lg:max-w-300 md:max-w-280"
            width="1200"
            height="700"
            loading="lazy"
            decoding="async"
          >
        </div>
        <ol class="sr-only" :aria-label="t.landing.processTitle">
          <li v-for="(line, i) in t.landing.processSteps" :key="i">
            {{ line }}
          </li>
        </ol>
        <div class="mt-10 flex justify-center">
          <button
            type="button"
            class="shadow-inner-white-soft inline-flex items-center justify-center rounded-3 bg-[var(--grayish-green)] px-8 py-3.5 text-4 text-white font-semibold tracking-wide uppercase transition hover:opacity-90"
            @click="scrollToPageTop"
          >
            {{ t.landing.processCta }}
          </button>
        </div>
      </div>
    </section>

    <SurrogateGallerySection
      variant="plain"
      :slides="beSurrogateGallerySlides"
      :title="t.landing.galleryTitle"
      :subtitle="t.landing.gallerySubtitle"
    />

    <AppFooter />
  </div>
</template>

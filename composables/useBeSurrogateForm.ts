/**
 * 代孕母申请表完整表单结构（与 be-surrogate 完全一致）
 * 供 be-surrogate 和 be-surrogate-v2 共用
 */
import type { SurrogateMotherApplicationData } from '~/types/api'
import { Ethnicity } from '~/types/api'

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

export const ethnicityValueMap: Record<EthnicityOptionKey, { label: string, key: Ethnicity }> = {
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

export type EthnicitySelections = {
  [K in EthnicityOptionKey]: boolean
} & { otherText: string }

export const emptyEthnicitySelections: EthnicitySelections = {
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

export function emptyDelivery() {
  return {
    delivery_date: '',
    gender: '',
    birth_weight: '',
    number_of_weeks: '',
    delivery_type: '',
    hospital: '',
  }
}

export function createEmptyForm() {
  return {
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
    delivery_history: [] as Array<ReturnType<typeof emptyDelivery>>,
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
  }
}

export type BeSurrogateForm = ReturnType<typeof createEmptyForm>

/** 从草稿数据填充表单 */
export function fillFormFromDraft(
  form: BeSurrogateForm,
  data: SurrogateMotherApplicationData,
) {
  const gi = data.gc_intake?.general_info
  if (gi) {
    form.general_info.full_name = gi.full_name ?? ''
    // 从 ethnicity_selected_keys 恢复 ethnicity 勾选
    const ethnicityKeys = gi.ethnicity_selected_keys
    if (ethnicityKeys && Array.isArray(ethnicityKeys)) {
      const reverseMap: Record<string, EthnicityOptionKey> = {}
      for (const [k, v] of Object.entries(ethnicityValueMap))
        reverseMap[v.key] = k as EthnicityOptionKey
      for (const key of Object.keys(form.general_info.ethnicity) as EthnicityOptionKey[])
        form.general_info.ethnicity[key] = false
      for (const ek of ethnicityKeys) {
        const formKey = reverseMap[ek as string]
        if (formKey)
          form.general_info.ethnicity[formKey] = true
      }
    }
    form.general_info.email = gi.email ?? ''
    form.general_info.phone = gi.phone ?? ''
    form.general_info.country_code = gi.country_code ?? '+1'
    form.general_info.dob = gi.dob ?? ''
    form.general_info.state_of_residence = gi.state_of_residence ?? ''
    form.general_info.place_of_birth = gi.place_of_birth ?? ''
    form.general_info.home_address = gi.home_address ?? ''
    form.general_info.height_feet = gi.height_feet ?? ''
    form.general_info.height_inches = gi.height_inches ?? ''
    form.general_info.weight = gi.weight ?? ''
    form.general_info.occupation_type = (gi.occupation_type as typeof form.general_info.occupation_type) ?? ''
    form.general_info.occupation_specify = gi.occupation_specify ?? ''
    form.general_info.marital_status = (gi.marital_status as typeof form.general_info.marital_status) ?? ''
    form.general_info.single_partner_info = gi.single_partner_info ?? ''
    form.general_info.us_citizen_or_resident = gi.us_citizen_or_resident === true ? 'yes' : (gi.us_citizen_or_resident === false ? 'no' : '')
  }
  const pbh = data.gc_intake?.pregnancy_birth_history
  if (pbh) {
    form.pregnancy_birth_history.total_children = (pbh.total_children as number | '') ?? ''
    form.pregnancy_birth_history.total_vaginal = (pbh.total_vaginal as number | '') ?? ''
    form.pregnancy_birth_history.total_c_sections = (pbh.total_c_sections as number | '') ?? ''
    form.pregnancy_birth_history.miscarriages = pbh.miscarriages === true ? 'yes' : (pbh.miscarriages === false ? 'no' : '')
    form.pregnancy_birth_history.miscarriages_detail = pbh.miscarriages_detail ?? ''
    form.pregnancy_birth_history.abortions = pbh.abortions === true ? 'yes' : (pbh.abortions === false ? 'no' : '')
    form.pregnancy_birth_history.abortions_detail = pbh.abortions_detail ?? ''
    form.pregnancy_birth_history.been_surrogate_before = pbh.been_surrogate_before === true ? 'yes' : (pbh.been_surrogate_before === false ? 'no' : '')
    form.pregnancy_birth_history.been_surrogate_when = pbh.been_surrogate_when ?? ''
  }
  const dh = data.gc_intake?.delivery_history
  if (dh && Array.isArray(dh) && dh.length > 0) {
    form.delivery_history = dh.map(d => ({
      delivery_date: d.delivery_date ?? '',
      gender: d.gender ?? '',
      birth_weight: d.birth_weight ?? '',
      number_of_weeks: d.number_of_weeks ?? '',
      delivery_type: d.delivery_type ?? '',
      hospital: d.hospital ?? '',
    }))
  }
  const pm = data.gc_intake?.pregnancy_medical
  if (pm) {
    form.pregnancy_medical.anemia = pm.anemia === true ? 'yes' : (pm.anemia === false ? 'no' : '')
    form.pregnancy_medical.severe_vomiting_3mo = pm.severe_vomiting_3mo === true ? 'yes' : (pm.severe_vomiting_3mo === false ? 'no' : '')
    form.pregnancy_medical.bp_during_pregnancy = pm.bp_during_pregnancy ?? ''
    form.pregnancy_medical.preeclampsia = pm.preeclampsia === true ? 'yes' : (pm.preeclampsia === false ? 'no' : '')
    form.pregnancy_medical.gestational_diabetes = pm.gestational_diabetes === true ? 'yes' : (pm.gestational_diabetes === false ? 'no' : '')
    form.pregnancy_medical.hypertension_pregnancy = pm.hypertension_pregnancy === true ? 'yes' : (pm.hypertension_pregnancy === false ? 'no' : '')
    form.pregnancy_medical.blood_transfusion = pm.blood_transfusion === true ? 'yes' : (pm.blood_transfusion === false ? 'no' : '')
    form.pregnancy_medical.seizures = pm.seizures === true ? 'yes' : (pm.seizures === false ? 'no' : '')
  }
  const mh = data.gc_intake?.medical_health
  if (mh) {
    form.medical_health.regular_menstrual_cycles = mh.regular_menstrual_cycles === true ? 'yes' : (mh.regular_menstrual_cycles === false ? 'no' : '')
    form.medical_health.birth_control = mh.birth_control === true ? 'yes' : (mh.birth_control === false ? 'no' : '')
    form.medical_health.birth_control_type = mh.birth_control_type ?? ''
    form.medical_health.taking_medications = mh.taking_medications === true ? 'yes' : (mh.taking_medications === false ? 'no' : '')
    form.medical_health.medications_list = mh.medications_list ?? ''
    form.medical_health.last_pap_smear = mh.last_pap_smear ?? ''
    form.medical_health.covid_vaccinated = mh.covid_vaccinated === true ? 'yes' : (mh.covid_vaccinated === false ? 'no' : '')
    form.medical_health.hep_b_vaccinated = mh.hep_b_vaccinated === true ? 'yes' : (mh.hep_b_vaccinated === false ? 'no' : '')
    form.medical_health.varicella_vaccinated = mh.varicella_vaccinated === true ? 'yes' : (mh.varicella_vaccinated === false ? 'no' : '')
    form.medical_health.ongoing_medical_treatment = mh.ongoing_medical_treatment === true ? 'yes' : (mh.ongoing_medical_treatment === false ? 'no' : '')
    form.medical_health.surgeries_past_2y = mh.surgeries_past_2y === true ? 'yes' : (mh.surgeries_past_2y === false ? 'no' : '')
    form.medical_health.surgeries_specify = mh.surgeries_specify ?? ''
  }
  const ment = data.gc_intake?.mental_health
  if (ment) {
    form.mental_health.anxiety_depression = ment.anxiety_depression === true ? 'yes' : (ment.anxiety_depression === false ? 'no' : '')
    form.mental_health.bipolar_schizo_personality = ment.bipolar_schizo_personality === true ? 'yes' : (ment.bipolar_schizo_personality === false ? 'no' : '')
    form.mental_health.adhd = ment.adhd === true ? 'yes' : (ment.adhd === false ? 'no' : '')
    form.mental_health.meds_anxiety_depression = ment.meds_anxiety_depression === true ? 'yes' : (ment.meds_anxiety_depression === false ? 'no' : '')
    form.mental_health.meds_specify = ment.meds_specify ?? ''
  }
  const su = data.gc_intake?.substance_use
  if (su) {
    form.substance_use.drug_use_pregnancy = su.drug_use_pregnancy === true ? 'yes' : (su.drug_use_pregnancy === false ? 'no' : '')
    form.substance_use.drug_marijuana = su.drug_marijuana ?? false
    form.substance_use.drug_fentanyl = su.drug_fentanyl ?? false
    form.substance_use.drug_methamphetamine = su.drug_methamphetamine ?? false
    form.substance_use.drug_mdma = su.drug_mdma ?? false
    form.substance_use.drug_other = su.drug_other ?? ''
    form.substance_use.marijuana_current = su.marijuana_current === true ? 'yes' : (su.marijuana_current === false ? 'no' : '')
    form.substance_use.marijuana_last_use = su.marijuana_last_use ?? ''
    form.substance_use.smoked_vaped_pregnancy = su.smoked_vaped_pregnancy === true ? 'yes' : (su.smoked_vaped_pregnancy === false ? 'no' : '')
    form.substance_use.alcohol = su.alcohol === true ? 'yes' : (su.alcohol === false ? 'no' : '')
    form.substance_use.alcohol_frequency = su.alcohol_frequency ?? ''
  }
  const inf = data.gc_intake?.infectious_disease
  if (inf) {
    form.infectious_disease.syphilis = inf.syphilis === true ? 'yes' : (inf.syphilis === false ? 'no' : '')
    form.infectious_disease.hepatitis_b_c = inf.hepatitis_b_c === true ? 'yes' : (inf.hepatitis_b_c === false ? 'no' : '')
    form.infectious_disease.genital_herpes = inf.genital_herpes === true ? 'yes' : (inf.genital_herpes === false ? 'no' : '')
    form.infectious_disease.hiv = inf.hiv === true ? 'yes' : (inf.hiv === false ? 'no' : '')
  }
  const om = data.gc_intake?.other_medical
  if (om) {
    form.other_medical.asthma = om.asthma === true ? 'yes' : (om.asthma === false ? 'no' : '')
    form.other_medical.asthma_inhaler_per_week = om.asthma_inhaler_per_week ?? ''
    form.other_medical.heart_conditions = om.heart_conditions === true ? 'yes' : (om.heart_conditions === false ? 'no' : '')
    form.other_medical.cancer_history = om.cancer_history === true ? 'yes' : (om.cancer_history === false ? 'no' : '')
    form.other_medical.scoliosis = om.scoliosis === true ? 'yes' : (om.scoliosis === false ? 'no' : '')
    form.other_medical.endometrial_ablation = om.endometrial_ablation === true ? 'yes' : (om.endometrial_ablation === false ? 'no' : '')
  }
  const prefs = data.gc_intake?.preferences
  if (prefs) {
    form.preferences.availability = prefs.availability ?? ''
    form.preferences.health_insurance = prefs.health_insurance ?? ''
    form.preferences.open_twins = prefs.open_twins === true ? 'yes' : (prefs.open_twins === false ? 'no' : '')
    form.preferences.open_fetal_reduction = prefs.open_fetal_reduction === true ? 'yes' : (prefs.open_fetal_reduction === false ? 'no' : '')
    form.preferences.open_termination = prefs.open_termination === true ? 'yes' : (prefs.open_termination === false ? 'no' : '')
    form.preferences.open_amniocentesis_cvs = prefs.open_amniocentesis_cvs === true ? 'yes' : (prefs.open_amniocentesis_cvs === false ? 'no' : '')
    form.preferences.open_same_sex_single_ip = prefs.open_same_sex_single_ip === true ? 'yes' : (prefs.open_same_sex_single_ip === false ? 'no' : '')
    form.preferences.willing_pump_breast_milk = prefs.willing_pump_breast_milk === true ? 'yes' : (prefs.willing_pump_breast_milk === false ? 'no' : '')
    form.preferences.open_ip_hiv = prefs.open_ip_hiv === true ? 'yes' : (prefs.open_ip_hiv === false ? 'no' : '')
    form.preferences.open_ip_hepatitis_b = prefs.open_ip_hepatitis_b === true ? 'yes' : (prefs.open_ip_hepatitis_b === false ? 'no' : '')
  }
  const legal = data.gc_intake?.legal_admin
  if (legal) {
    form.legal_admin.pending_legal = legal.pending_legal === true ? 'yes' : (legal.pending_legal === false ? 'no' : '')
    form.legal_admin.criminal_record = legal.criminal_record === true ? 'yes' : (legal.criminal_record === false ? 'no' : '')
    form.legal_admin.emergency_contact = legal.emergency_contact ?? ''
    form.legal_admin.government_assistance = legal.government_assistance === true ? 'yes' : (legal.government_assistance === false ? 'no' : '')
  }
  const notes = data.gc_intake?.notes
  if (notes) {
    form.notes.referred_by = notes.referred_by ?? ''
    form.notes.medical_records_source = notes.medical_records_source ?? ''
  }
  const photos = data.upload_photos
  if (photos && Array.isArray(photos)) {
    form.uploadPhotos = photos.map(p => (typeof p === 'object' && p?.url ? p.url : String(p))).filter(Boolean)
  }
}

function yn(v: string): boolean | undefined {
  if (v === 'yes')
    return true
  if (v === 'no')
    return false
  return undefined
}

/** 从表单构建 ethnicity payload */
export function buildEthnicityPayload(form: BeSurrogateForm) {
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

/** 计算 BMI */
export function calculatedBMI(form: BeSurrogateForm): number {
  const feet = Number.parseFloat(form.general_info.height_feet) || 0
  const inches = Number.parseFloat(form.general_info.height_inches) || 0
  const weight = Number.parseFloat(form.general_info.weight) || 0
  if (feet === 0 || weight === 0)
    return 0
  const totalInches = feet * 12 + inches
  return Math.round((weight / (totalInches * totalInches)) * 703 * 10) / 10
}

/** 从表单构建完整提交 payload（与 be-surrogate handleSubmit 一致） */
export function buildFullPayload(form: BeSurrogateForm): SurrogateMotherApplicationData {
  const g = form.general_info
  const ethnicityPayload = buildEthnicityPayload(form)
  const bmi = calculatedBMI(form)

  return {
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
        bmi: String(bmi),
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
}

/** 从 localStorage 的 JSON 恢复表单（深拷贝到 reactive 对象） */
export function applyFormFromStorage(form: BeSurrogateForm, data: Record<string, unknown>) {
  if (!data || typeof data !== 'object')
    return

  function deepAssign(target: Record<string, any>, source: Record<string, any>) {
    for (const k of Object.keys(source)) {
      const v = source[k]
      if (v && typeof v === 'object' && !Array.isArray(v) && typeof target[k] === 'object' && target[k] !== null) {
        deepAssign(target[k], v)
      }
      else if (v !== undefined) {
        target[k] = v
      }
    }
  }

  deepAssign(form as Record<string, any>, data as Record<string, any>)
}

// 申请表相关类型定义
// 基于 GraphQL schema 中的 applications 表结构

// ========== 枚举定义 ==========

export enum Pronouns {
  SHE_HER = 'SHE_HER',
  HE_HIM = 'HE_HIM',
  THEY_THEM = 'THEY_THEM',
  OTHER = 'OTHER',
}

export enum GenderIdentity {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  TRANSGENDER_MALE = 'TRANSGENDER_MALE',
  TRANSGENDER_FEMALE = 'TRANSGENDER_FEMALE',
  NON_BINARY = 'NON_BINARY',
  OTHER = 'OTHER',
}

export enum Ethnicity {
  ASIAN = 'ASIAN',
  WHITE = 'WHITE',
  BLACK = 'BLACK',
  HISPANIC = 'HISPANIC',
  MIDDLE_EASTERN = 'MIDDLE_EASTERN',
  NATIVE_AMERICAN = 'NATIVE_AMERICAN',
  PACIFIC_ISLANDER = 'PACIFIC_ISLANDER',
  MIXED_RACE = 'MIXED_RACE',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
  OTHER = 'OTHER',
}

export enum PrimaryLanguage {
  ENGLISH = 'ENGLISH',
  MANDARIN = 'MANDARIN',
  CANTONESE = 'CANTONESE',
  SPANISH = 'SPANISH',
  FRENCH = 'FRENCH',
  KOREAN = 'KOREAN',
  JAPANESE = 'JAPANESE',
  HINDI = 'HINDI',
  VIETNAMESE = 'VIETNAMESE',
  RUSSIAN = 'RUSSIAN',
  ARABIC = 'ARABIC',
  PORTUGUESE = 'PORTUGUESE',
  TAGALOG = 'TAGALOG',
  GERMAN = 'GERMAN',
  ITALIAN = 'ITALIAN',
  OTHER = 'OTHER',
}

export enum SexualOrientation {
  HETEROSEXUAL = 'HETEROSEXUAL',
  LGBTQIA = 'LGBTQIA',
  OTHER = 'OTHER',
}

export enum ProgramInterest {
  SURROGACY_EGG_DONOR = 'SURROGACY_EGG_DONOR',
  SURROGACY_ONLY = 'SURROGACY_ONLY',
  EGG_DONOR_ONLY = 'EGG_DONOR_ONLY',
  THIRD_PARTY_SURROGATE = 'THIRD_PARTY_SURROGATE',
  BRING_YOUR_OWN_SURROGATE = 'BRING_YOUR_OWN_SURROGATE',
  BRING_YOUR_OWN_SURROGATE_EGG = 'BRING_YOUR_OWN_SURROGATE_EGG',
  NOT_SURE = 'NOT_SURE',
}

export enum JourneyStartTiming {
  ASAP = 'ASAP',
  NEXT_6_MONTHS = 'NEXT_6_MONTHS',
  NEXT_YEAR = 'NEXT_YEAR',
  NOT_SURE = 'NOT_SURE',
}

export enum DesiredChildrenCount {
  ONE_CHILD = 'ONE_CHILD',
  TWINS = 'TWINS',
  MORE_THAN_TWO = 'MORE_THAN_TWO',
  NOT_SURE = 'NOT_SURE',
}

// 基本信息
export interface BasicInformation {
  firstName: string
  lastName: string
  pronouns: string
  pronouns_selected_key: Pronouns
  gender_identity: string
  gender_identity_selected_key: GenderIdentity
  date_of_birth: string
  ethnicity: string
  ethnicity_selected_key: Ethnicity
}

// 联系信息组合
export interface ContactInformation {
  cell_phone_country_code: string
  cell_phone: string
  is_agree_cell_phone_receive_messages: boolean
  email_address: string
  primary_languages: string[]
  primary_languages_selected_keys: PrimaryLanguage[]
  preferred_contact_method?: string // Phone, Email, Others
}

// 家庭资料组合
export interface FamilyProfile {
  sexual_orientation: string
  sexual_orientation_selected_key: SexualOrientation
  relationship_status?: string // Married, Single, Partnered
  city: string
  country: string
  country_selected_key: string
  state_or_province: string
  state_or_province_selected_key: string
}

// 项目意向组合
export interface ProgramInterests {
  interested_services: string
  interested_services_selected_keys: ProgramInterest
  journey_start_timing: string
  journey_start_timing_selected_key: JourneyStartTiming
  desired_children_count: string
  desired_children_count_selected_key: DesiredChildrenCount
}

// 渠道及初步沟通组合
export interface Referral {
  referral_source: string
  initial_questions: string
}

// 胚胎与医疗情况组合
export interface EmbryoMedicalStatus {
  has_embryos?: string // Yes, No
  embryo_clinic_name?: string
  embryo_count?: string
  pgt_status?: string // Yes, No
  has_fertility_clinic?: string // Yes, No
  fertility_clinic_name?: string
}

// ========== 申请表 application_data 类型 ==========

export interface IntendedParentApplicationData {
  basic_information?: BasicInformation
  contact_information?: ContactInformation
  family_profile?: FamilyProfile
  program_interests?: ProgramInterests
  embryo_medical_status?: EmbryoMedicalStatus
  referral?: Referral
}

// ========== 完整表结构类型 ==========

export interface IntendedParent {
  id: number
  created_at: string
  updated_at: string
  basic_information?: BasicInformation
  contact_information?: ContactInformation
  family_profile?: FamilyProfile
  program_interests?: ProgramInterests
  embryo_medical_status?: EmbryoMedicalStatus
  referral?: Referral
}
// SurrogateMotherApplicationData 类型请补充在本文件下方
// 代孕母相关类型定义

// ========== 枚举定义 ==========

export enum EducationLevel {
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  SOME_COLLEGE = 'SOME_COLLEGE',
  ASSOCIATE_DEGREE = 'ASSOCIATE_DEGREE',
  BACHELOR_DEGREE = 'BACHELOR_DEGREE',
  MASTER_DEGREE = 'MASTER_DEGREE',
  DOCTORATE = 'DOCTORATE',
  OTHER = 'OTHER',
}

export enum USCitizenOrVisaStatus {
  US_CITIZEN = 'US_CITIZEN',
  PERMANENT_RESIDENT = 'PERMANENT_RESIDENT',
  WORK_VISA = 'WORK_VISA',
  STUDENT_VISA = 'STUDENT_VISA',
  TOURIST_VISA = 'TOURIST_VISA',
  OTHER_VISA = 'OTHER_VISA',
  NO_STATUS = 'NO_STATUS',
}

export enum BackgroundCheckStatus {
  APPROVED = 'APPROVED',
  NOT_APPROVED = 'NOT_APPROVED',
  PENDING = 'PENDING',
  NOT_REQUIRED = 'NOT_REQUIRED',
}

export enum ContactSource {
  WEBSITE = 'WEBSITE',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  REFERRAL = 'REFERRAL',
  ADVERTISEMENT = 'ADVERTISEMENT',
  OTHER = 'OTHER',
}

export enum MaritalStatus {
  MARRIED = 'MARRIED',
  ENGAGED = 'ENGAGED',
  COHABITATING = 'COHABITATING',
  LIVING_SEPARATELY = 'LIVING_SEPARATELY',
  SINGLE = 'SINGLE',
  DIVORCED_FINALIZED = 'DIVORCED_FINALIZED',
  DIVORCED_IN_PROCESS = 'DIVORCED_IN_PROCESS',
  LEGALLY_SEPARATED = 'LEGALLY_SEPARATED',
  SEPARATED_INFORMALLY = 'SEPARATED_INFORMALLY',
}

export enum PartnerSupport {
  YES = 'YES',
  NO = 'NO',
  NOT_APPLICABLE = 'NOT_APPLICABLE',
}

export enum HouseholdIncome {
  UNDER_30K = 'UNDER_30K',
  BETWEEN_30K_50K = 'BETWEEN_30K_50K',
  BETWEEN_50K_75K = 'BETWEEN_50K_75K',
  BETWEEN_75K_100K = 'BETWEEN_75K_100K',
  OVER_100K = 'OVER_100K',
  PREFER_NOT_TO_SAY = 'PREFER_NOT_TO_SAY',
}

export enum MedicalCondition {
  DIABETES = 'DIABETES',
  HYPERTENSION = 'HYPERTENSION',
  BIPOLAR_DISORDER = 'BIPOLAR_DISORDER',
  MULTIPLE_MISCARRIAGES = 'MULTIPLE_MISCARRIAGES',
  SEIZURE_DISORDER = 'SEIZURE_DISORDER',
  NONE = 'NONE',
}

// ========== 基本信息组合 ==========

export interface SurrogateContactInformation {
  first_name: string
  last_name: string
  date_of_birth: string
  cell_phone_country_code: string
  cell_phone: string
  is_agree_cell_phone_receive_messages: boolean
  email_address: string
  city: string
  country: string
  country_selected_key: string
  state_or_province: string
  state_or_province_selected_key: string
  zip_code: string
  height: string
  weight: string
  bmi: number
  ethnicity: string
  ethnicity_selected_key: Ethnicity
  surrogacy_experience_count: number
  us_citizen_or_visa_status: string
  us_citizen_or_visa_status_selected_key: USCitizenOrVisaStatus
}

export interface AboutYou {
  contact_source: string
  contact_source_selected_key: ContactSource
  occupation: string
  education_level: string
  education_level_selected_key: EducationLevel
  is_former_surrogate: boolean
  surrogate_experience: string
  marital_status: string
  marital_status_selected_key: MaritalStatus
  partner_support: string
  partner_support_selected_key: PartnerSupport
  has_high_school_diploma: boolean
  household_income: string
  household_income_selected_key: HouseholdIncome
}

export interface PregnancyHistory {
  delivery_date: string
  birth_weight: string
  gestational_weeks: string
  number_of_babies: string
  delivery_method: string
}

export interface PregnancyAndHealth {
  has_given_birth: boolean
  birth_details: string
  is_currently_pregnant: boolean
  is_breastfeeding: boolean
  has_stillbirth: boolean
  medical_conditions: string[]
  medical_conditions_selected_keys: MedicalCondition[]
  is_taking_medications: boolean
  medications_list: string
  domestic_violence: boolean
  substance_abuse: boolean
  felony_charges: boolean
  outstanding_warrant: boolean
  formal_probation: boolean
  arrests: boolean
  child_abuse_neglect: boolean
  child_protection_investigation: boolean
  background_check_status: string
  background_check_status_selected_key: BackgroundCheckStatus
  pregnancy_histories: PregnancyHistory[]
  serious_pregnancy_complications: boolean
  current_birth_control: string
  closest_hospital: string
  closest_nicu_iii: string
}

export interface GestationalSurrogacyInterview {
  emotional_support: string
  languages_spoken: string
  motivation: string
  self_introduction: string
  contact_preference: string
  hipaa_release_willing: boolean
  twins_feeling: string
  multiple_reduction_willing: boolean
  termination_willing: boolean
}

export interface UploadPhoto {
  name: string
  url: string
}

// ========== GC Intake (Gestational Carrier Intake Screening Form) ==========

export interface GCIntakeGeneralInfo {
  full_name?: string
  email?: string
  phone?: string
  country_code?: string
  dob?: string
  age?: number
  state_of_residence?: string
  place_of_birth?: string
  home_address?: string
  height_feet?: string
  height_inches?: string
  weight?: string
  bmi?: string
  occupation_type?: 'employed' | 'stay_at_home' | 'unemployed'
  occupation_specify?: string
  marital_status?: 'married' | 'single' | 'cohabitating' | 'divorced'
  single_partner_info?: string
  us_citizen_or_resident?: boolean
  ethnicity?: string
  ethnicity_selected_keys?: Ethnicity[]
}

export interface GCIntakePregnancyBirthHistory {
  total_children?: number
  total_vaginal?: number
  total_c_sections?: number
  miscarriages?: boolean
  miscarriages_detail?: string
  abortions?: boolean
  abortions_detail?: string
  been_surrogate_before?: boolean
  been_surrogate_when?: string
}

export interface GCIntakeDeliveryEntry {
  delivery_date?: string
  gender?: string
  birth_weight?: string
  number_of_weeks?: string
  delivery_type?: string
  hospital?: string
}

export interface GCIntakePregnancyMedical {
  anemia?: boolean
  severe_vomiting_3mo?: boolean
  bp_during_pregnancy?: string
  preeclampsia?: boolean
  gestational_diabetes?: boolean
  hypertension_pregnancy?: boolean
  blood_transfusion?: boolean
  seizures?: boolean
}

export interface GCIntakeMedicalHealth {
  regular_menstrual_cycles?: boolean
  birth_control?: boolean
  birth_control_type?: string
  taking_medications?: boolean
  medications_list?: string
  last_pap_smear?: string
  covid_vaccinated?: boolean
  hep_b_vaccinated?: boolean
  varicella_vaccinated?: boolean
  ongoing_medical_treatment?: boolean
  surgeries_past_2y?: boolean
  surgeries_specify?: string
}

export interface GCIntakeMentalHealth {
  anxiety_depression?: boolean
  bipolar_schizo_personality?: boolean
  adhd?: boolean
  meds_anxiety_depression?: boolean
  meds_specify?: string
}

export interface GCIntakeSubstanceUse {
  drug_use_pregnancy?: boolean
  drug_marijuana?: boolean
  drug_fentanyl?: boolean
  drug_methamphetamine?: boolean
  drug_mdma?: boolean
  drug_other?: string
  marijuana_current?: boolean
  marijuana_last_use?: string
  smoked_vaped_pregnancy?: boolean
  alcohol?: boolean
  alcohol_frequency?: string
}

export interface GCIntakeInfectiousDisease {
  syphilis?: boolean
  hepatitis_b_c?: boolean
  genital_herpes?: boolean
  hiv?: boolean
}

export interface GCIntakeOtherMedical {
  asthma?: boolean
  asthma_inhaler_per_week?: string
  heart_conditions?: boolean
  cancer_history?: boolean
  scoliosis?: boolean
  endometrial_ablation?: boolean
}

export interface GCIntakePreferences {
  availability?: string
  health_insurance?: string
  open_twins?: boolean
  open_fetal_reduction?: boolean
  open_termination?: boolean
  open_amniocentesis_cvs?: boolean
  open_same_sex_single_ip?: boolean
  willing_pump_breast_milk?: boolean
  open_ip_hiv?: boolean
  open_ip_hepatitis_b?: boolean
}

export interface GCIntakeLegalAdmin {
  pending_legal?: boolean
  criminal_record?: boolean
  emergency_contact?: string
  government_assistance?: boolean
}

export interface GCIntakeNotes {
  referred_by?: string
  medical_records_source?: 'patient_portal' | 'clinic' | 'other'
}

export interface GCIntake {
  general_info?: GCIntakeGeneralInfo
  pregnancy_birth_history?: GCIntakePregnancyBirthHistory
  delivery_history?: GCIntakeDeliveryEntry[]
  pregnancy_medical?: GCIntakePregnancyMedical
  medical_health?: GCIntakeMedicalHealth
  mental_health?: GCIntakeMentalHealth
  substance_use?: GCIntakeSubstanceUse
  infectious_disease?: GCIntakeInfectiousDisease
  other_medical?: GCIntakeOtherMedical
  preferences?: GCIntakePreferences
  legal_admin?: GCIntakeLegalAdmin
  notes?: GCIntakeNotes
}

// ========== 申请表 application_data 类型 ==========

export interface SurrogateMotherApplicationData {
  contact_information?: SurrogateContactInformation
  about_you?: AboutYou
  pregnancy_and_health?: PregnancyAndHealth
  gestational_surrogacy_interview?: GestationalSurrogacyInterview
  /** New form: Gestational Carrier Intake Screening. When present, admin renders GC Intake layout. */
  gc_intake?: GCIntake
  upload_photos?: UploadPhoto[]
}

// ========== 完整表结构类型 ==========

export interface SurrogateMother {
  id: number
  created_at: string
  updated_at: string
  contact_information?: SurrogateContactInformation
  about_you?: AboutYou
  pregnancy_and_health?: PregnancyAndHealth
  gestational_surrogacy_interview?: GestationalSurrogacyInterview
  upload_photos?: UploadPhoto[]
}

// 申请表完整记录（对应 applications 表）
export interface Application {
  id: number
  created_at: string
  updated_at: string
  application_type: ApplicationType
  status: ApplicationStatus
  application_data: ApplicationData
}

// 申请类型枚举
export type ApplicationType = 'intended_parent' | 'surrogate_mother'

// 申请状态枚举
export type ApplicationStatus = 'pending' | 'approved' | 'rejected'

// 申请数据联合类型
export type ApplicationData = IntendedParentApplicationData | SurrogateMotherApplicationData

// 申请表创建输入
export interface CreateApplicationInput {
  application_type: ApplicationType
  application_data: ApplicationData
  status?: ApplicationStatus
}

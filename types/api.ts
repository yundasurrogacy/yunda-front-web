// API 请求和响应类型定义

// ========== 代孕母申请相关类型 ==========

export interface SurrogateRequest {
  // 基本信息
  birthDate: string                    // 出生日期 (YYYY-MM-DD)
  citizenshipStatus: string            // 公民身份状态 (国家代码)
  contactSource: string                // 联系来源
  contactSourceOther: string           // 其他联系来源说明
  email: string                        // 邮箱地址
  firstName: string                    // 名
  lastName: string                     // 姓
  mobileWithCountryCode: string        // 带国家代码的手机号
  occupation: string                   // 职业
  state: string                        // 州/省
  zipCode: string                      // 邮编

  // 教育背景
  hasHighSchoolDiploma: boolean        // 是否有高中文凭

  // 婚姻状况
  maritalStatus: string                // 婚姻状态
  partnerSupport: string               // 伴侣支持状态

  // 代孕经验
  isFormerSurrogate: boolean           // 是否曾经是代孕母
  surrogateExperience: string          // 代孕经验描述

  // 财务和法律信息
  householdIncome: string              // 家庭收入范围
  financialLegal: {
    criminalDescription: string        // 犯罪记录描述
    governmentAssistance: string[]     // 政府援助类型
    hasCPSHistory: boolean            // 是否有儿童保护服务历史
    hasCriminalRecord: boolean        // 是否有犯罪记录
    hasLegalProceedings: boolean      // 是否有法律诉讼
    otherAssistanceDetail: string     // 其他援助详情
    proceedingDetails: string         // 诉讼详情
  }

  // 健康历史
  healthHistory: {
    isTakingMeds: boolean              // 是否正在服药
    medicalConditions: string[]        // 医疗状况
    medicationsList: string            // 药物清单
  }

  // 怀孕历史
  pregnancyHistory: {
    birthDetails: string               // 分娩详情
    hasGivenBirth: boolean            // 是否曾经分娩
    hasStillbirth: boolean            // 是否有死胎经历
    height: number                     // 身高 (英寸)
    isBreastfeeding: boolean          // 是否正在哺乳
    isPregnant: boolean               // 是否怀孕
    weightPounds: number              // 体重 (磅)
  }

  // 同意条款
  smsConsent: boolean                  // 是否同意接收短信
}

// ========== 准父母申请相关类型 ==========

export interface ParentRequest {
  // 基本信息
  accountId: number                     // 账户ID (通常为0)
  city: string                          // 城市
  country: string                       // 国家
  countryCode: string                   // 国家代码
  dateOfBirth: string                   // 出生日期 (YYYY-MM-DD)
  email: string                         // 邮箱地址
  fullLegalName: string                 // 完整法定姓名
  phoneNumber: string                   // 电话号码
  stateProvince: string                 // 州/省

  // 身份信息
  genderIdentity: string                // 性别认同
  genderSelfDescribe: string            // 性别自我描述
  pronouns: string                      // 代词
  pronounsSelfDescribe: string          // 代词自我描述
  sexualOrientation: string             // 性取向
  sexualOrientationSelfDescribe: string // 性取向自我描述

  // 种族和语言
  ethnicities: string[]                 // 种族
  ethnicitySelfDescribe: string         // 种族自我描述
  languages: string[]                   // 语言
  otherLanguage: string                 // 其他语言

  // 项目意向
  desiredChildrenCount: string          // 期望孩子数量
  journeyStartTiming: string            // 旅程开始时间
  programInterests: string[]            // 项目兴趣
  initialQuestions: string              // 初步问题

  // 联系来源
  referralSource: string                // 推荐来源

  // 同意条款
  consentAgreement: boolean             // 同意协议
  consentSMS: boolean                   // 同意短信
}

// ========== 响应类型 ==========

export interface ApiSuccessResponse<T = any> {
  code: number
  message: string
  data: T
}

export interface ApiErrorResponse {
  code: number
  message: string
  errors?: Array<{
    field: string
    message: string
  }>
}

// ========== 枚举值定义 ==========

// 联系来源
export enum ContactMethod {
  FRIEND_REFERRAL = 'FRIEND_REFERRAL',
  SOCIAL_MEDIA = 'SOCIAL_MEDIA',
  GOOGLE_SEARCH = 'GOOGLE_SEARCH',
  OTHER = 'OTHER'
}

// 婚姻状态
export enum MaritalStatus {
  MARRIED = 'MARRIED',
  ENGAGED = 'ENGAGED',
  CO_HABITATING = 'CO_HABITATING',
  LIVING_SEPARATELY = 'LIVING_SEPARATELY',
  SINGLE = 'SINGLE',
  DIVORCED_FINALIZED = 'DIVORCED_FINALIZED',
  DIVORCED_IN_PROGRESS = 'DIVORCED_IN_PROGRESS',
  LEGALLY_SEPARATED = 'LEGALLY_SEPARATED',
  SEPARATED_INFORMALLY = 'SEPARATED_INFORMALLY'
}

// 伴侣支持状态
export enum PartnerSupportStatus {
  YES = 'YES',
  NO = 'NO',
  NOT_APPLICABLE = 'NOT_APPLICABLE'
}

// 收入范围
export enum IncomeRange {
  UNDER_30K = 'UNDER_30K',
  BETWEEN_30K_50K = 'BETWEEN_30K_50K',
  BETWEEN_50K_75K = 'BETWEEN_50K_75K',
  BETWEEN_75K_100K = 'BETWEEN_75K_100K',
  OVER_100K = 'OVER_100K',
  DECLINE_TO_STATE = 'DECLINE_TO_STATE'
}

// 政府援助类型
export enum GovernmentAssistance {
  FOOD_STAMPS = 'FOOD_STAMPS',
  MEDICAID = 'MEDICAID',
  CASH_ASSISTANCE = 'CASH_ASSISTANCE',
  FINANCIAL_AID = 'FINANCIAL_AID',
  WIC = 'WIC',
  SSI = 'SSI',
  PUBLIC_HOUSING = 'PUBLIC_HOUSING',
  SUBSIDIZED_CHILDCARE = 'SUBSIDIZED_CHILDCARE',
  STUDENT_LOANS = 'STUDENT_LOANS',
  OTHER_ASSISTANCE = 'OTHER_ASSISTANCE'
}

// 医疗状况
export enum MedicalCondition {
  DIABETES = 'DIABETES',
  HYPERTENSION = 'HYPERTENSION',
  BIPOLAR_DISORDER = 'BIPOLAR_DISORDER',
  MULTIPLE_MISCARRIAGES = 'MULTIPLE_MISCARRIAGES',
  SEIZURE_DISORDER = 'SEIZURE_DISORDER',
  NONE = 'NONE'
}

// 期望孩子数量
export enum ChildPlanEnum {
  ONE_CHILD = 'ONE_CHILD',
  TWINS = 'TWINS',
  MORE_THAN_TWO = 'MORE_THAN_TWO',
  NOT_SURE = 'NOT_SURE'
}

// 旅程开始时间
export enum JourneyStartTimingEnum {
  ASAP = 'ASAP',
  NEXT_6_MONTHS = 'NEXT_6_MONTHS',
  NEXT_YEAR = 'NEXT_YEAR',
  NOT_SURE = 'NOT_SURE'
}

// 性别认同
export enum GenderIdentity {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  TRANSGENDER_MALE = 'TRANSGENDER_MALE',
  TRANSGENDER_FEMALE = 'TRANSGENDER_FEMALE',
  NON_BINARY = 'NON_BINARY',
  OTHER = 'OTHER'
}

// 代词
export enum Pronouns {
  SHE_HER = 'SHE_HER',
  HE_HIM = 'HE_HIM',
  THEY_THEM = 'THEY_THEM',
  OTHER = 'OTHER'
}

// 性取向
export enum SexualOrientation {
  HETEROSEXUAL = 'HETEROSEXUAL',
  LGBTQIA = 'LGBTQIA',
  OTHER = 'OTHER'
}

// 种族
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
  OTHER = 'OTHER'
}

// 主要语言
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
  OTHER = 'OTHER'
}

// 项目兴趣
export enum ProgramInterest {
  SURROGACY_EGG_DONOR = 'SURROGACY_EGG_DONOR',
  SURROGACY_ONLY = 'SURROGACY_ONLY',
  EGG_DONOR_ONLY = 'EGG_DONOR_ONLY',
  THIRD_PARTY_SURROGATE = 'THIRD_PARTY_SURROGATE',
  BRING_YOUR_OWN_SURROGATE = 'BRING_YOUR_OWN_SURROGATE',
  BRING_YOUR_OWN_SURROGATE_EGG = 'BRING_YOUR_OWN_SURROGATE_EGG',
  NOT_SURE = 'NOT_SURE'
}
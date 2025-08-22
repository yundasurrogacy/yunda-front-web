<template>
  <div class="min-h-screen bg-[var(--head-bg)] overflow-hidden">
    <AppHeader/>

    <!-- Header -->
    <div class="relative w-full h-30 lg:h-80 bg-[#BFC9BF] flex items-center justify-center">
      <h1 class="text-center text-8 lg:text-16 font-semibold italic" style="font-family: var(--font-primary)">
        {{ $t('parent.application.pageTitle') }}
      </h1>
    </div>

    <!-- Main Content -->
    <div class="relative max-w-300 mx-auto mt-10 px-4 lg:px-0">
      <!-- Introduction -->
      <div class="text-center mb-16  lg:text-5">
        <h2 class="text-8 font-semibold mb-8" style="font-family: var(--font-primary)">
          {{ $t('parent.application.welcome.title') }}
        </h2>
        <p class="max-w-966px mx-auto mb-4 leading-relaxed">
          {{ $t('parent.application.welcome.message1') }}
        </p>
        <p class="max-w-954px mx-auto mb-20">
          <span v-html="$t('parent.application.welcome.message2')"></span>
        </p>

        <p class="max-w-954px mx-auto text-8 font-semibold mb-8" style="font-family: var(--font-primary)">
          {{ $t('parent.application.welcome.message3') }}
        </p>
        <p class="mb-12">
          {{ $t('parent.application.welcome.scrollPrompt') }}
        </p>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" class="mx-auto animate-bounce">
          <path d="M10 20L24 34L38 20" stroke="#1E1E1E" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </div>

      <!-- Form Container -->
      <div class="bg-gradient-to-b from-[var(--foot-bg)] via-[var(--light-cream)] to-[var(--foot-bg)] shadow-xl shadow-black/20 p-8 rounded-5 p-8 lg:p-12 mb-20">
        <form @submit.prevent="handleSubmit">
          <!-- Basic Information Section -->
          <h3 class="text-6 font-semibold mb-8" style="font-family: var(--font-primary)">{{ $t('parent.application.sections.basicInfo') }}</h3>
          
          <div class="space-y-12 mb-16">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <FormInput v-model="form.firstName" :label="$t('parent.application.form.firstName')" required />
              <FormInput v-model="form.lastName" :label="$t('parent.application.form.lastName')" required />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <div>
                <p class="mb-4">{{ $t('parent.application.form.pronouns.label') }}</p>
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
                      class="ml-2 h-10 px-3  text-black font-serif bg-[rgba(234.35,232.57,208.37,0.20)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] bg-blend-overlay rounded-2.5 backdrop-blur-5 border-none outline-none focus:ring-2 focus:ring-[var(--grayish-green)] transition-all placeholder:text-black/60 placeholder: flex-1"
                    />
                  </div>
                </div>
              </div>
              <div>
                <p class="mb-4">{{ $t('parent.application.form.genderIdentity.label') }} <span class="text-red-500">*</span></p>
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
                      class="h-10 px-3  text-black font-serif bg-[rgba(234.35,232.57,208.37,0.20)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] bg-blend-overlay rounded-2.5 backdrop-blur-5 border-none outline-none focus:ring-2 focus:ring-[var(--grayish-green)] transition-all placeholder:text-black/60 placeholder: flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <FormDatePicker v-model="form.dateOfBirth" :label="$t('parent.application.form.dateOfBirth')" required />
              <div>
                <p class="font-medium mb-4">{{ $t('parent.application.form.ethnicity.label') }} <span class="italic font-normal">{{ $t('parent.application.form.ethnicity.selectAll') }}</span></p>
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
                  <div class="flex items-center gap-2 col-span-2">
                    <FormCheckbox v-model="form.ethnicity.other" :label="$t('parent.application.form.ethnicity.options.other')" />
                    <input 
                      v-if="form.ethnicity.other" 
                      v-model="form.ethnicitySelfDescribe" 
                      type="text"
                      placeholder=""
                      class="h-10 px-3  text-black font-serif bg-[rgba(234.35,232.57,208.37,0.20)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] bg-blend-overlay rounded-2.5 backdrop-blur-5 border-none outline-none focus:ring-2 focus:ring-[var(--grayish-green)] transition-all placeholder:text-black/60 placeholder: flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Information Section -->
          <h3 class="text-6 font-semibold mb-8" style="font-family: var(--font-primary)">{{ $t('parent.application.sections.contactInfo') }}</h3>

          <div class="space-y-6 mb-16">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <FormPhoneInput 
                v-model="form.phoneNumber" 
                v-model:countryCode="form.countryCode"
                :label="$t('parent.application.form.cellPhone')" 
                required
                :default-country="form.country || 'US'"
              />
              <FormInput v-model="form.email" :label="$t('parent.application.form.email')" type="email" required />
            </div>
            
            <div>
              <FormCheckbox v-model="form.consentSMS" :label="$t('parent.application.form.smsConsent.label')" />
              <p class="text-13px mt-2 ml-6">
                {{ $t('parent.application.form.smsConsent.disclaimer') }}
              </p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              
              <div>
                <p class="text-20px mb-4">{{ $t('parent.application.form.languages.label') }} *</p>
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
                    <div class="flex items-center gap-2 col-span-2">
                    <FormCheckbox v-model="form.languages.other" :label="$t('parent.application.form.languages.options.other')" /></div>
                    <input 
                        v-if="form.languages.other" 
                        v-model="form.otherLanguage" 
                        type="text"
                        placeholder=""
                        class="h-10 px-3  text-black font-serif bg-[rgba(234.35,232.57,208.37,0.20)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] bg-blend-overlay rounded-2.5 backdrop-blur-5 border-none outline-none focus:ring-2 focus:ring-[var(--grayish-green)] transition-all placeholder:text-black/60 placeholder: flex-1"
                      />
              </div>
            </div>

            <p class="text-13px text-black font-serif">
              {{ $t('parent.application.form.languages.note') }}
            </p>
          </div>

          <!-- Family Profile Section -->
          <h3 class="text-6 font-semibold mb-8" style="font-family: var(--font-primary)">{{ $t('parent.application.sections.familyProfile') }}</h3>

          <div class="space-y-6 mb-16">
            <div>
              <p class="mb-4">{{ $t('parent.application.form.sexualOrientation.label') }} *</p>
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
                    class="h-10 px-3  text-black font-serif bg-[rgba(234.35,232.57,208.37,0.20)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] bg-blend-overlay rounded-2.5 backdrop-blur-5 border-none outline-none focus:ring-2 focus:ring-[var(--grayish-green)] transition-all placeholder:text-black/60 placeholder: flex-1"
                  />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
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
          <h3 class="text-6 font-semibold mb-8" style="font-family: var(--font-primary)">{{ $t('parent.application.sections.programInterests') }}</h3>

          <div class="space-y-6 mb-16">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <div>
                <p class="mb-4">{{ $t('parent.application.form.services.question') }} *</p>
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
                <p class=" mb-4">{{ $t('parent.application.form.timing.question') }} *</p>
                <div class="space-y-2">
                  <FormRadio v-model="form.journeyStartTiming" name="journeyStartTiming" value="ASAP" :label="$t('parent.application.form.timing.options.asap')" />
                  <FormRadio v-model="form.journeyStartTiming" name="journeyStartTiming" value="NEXT_6_MONTHS" :label="$t('parent.application.form.timing.options.next6Months')" />
                  <FormRadio v-model="form.journeyStartTiming" name="journeyStartTiming" value="NEXT_YEAR" :label="$t('parent.application.form.timing.options.nextYear')" />
                  <FormRadio v-model="form.journeyStartTiming" name="journeyStartTiming" value="NOT_SURE" :label="$t('parent.application.form.timing.options.notSure')" />
                </div>
              </div>
            </div>

            <div>
              <p class=" mb-4">{{ $t('parent.application.form.childrenCount.question') }} *</p>
              <div class="space-y-2">
                <FormRadio v-model="form.desiredChildrenCount" name="desiredChildrenCount" value="ONE_CHILD" :label="$t('parent.application.form.childrenCount.options.oneChild')" />
                <FormRadio v-model="form.desiredChildrenCount" name="desiredChildrenCount" value="TWINS" :label="$t('parent.application.form.childrenCount.options.twins')" />
                <FormRadio v-model="form.desiredChildrenCount" name="desiredChildrenCount" value="MORE_THAN_TWO" :label="$t('parent.application.form.childrenCount.options.moreThanTwo')" />
                <FormRadio v-model="form.desiredChildrenCount" name="desiredChildrenCount" value="NOT_SURE" :label="$t('parent.application.form.childrenCount.options.notSure')" />
              </div>
            </div>
          </div>

          <!-- Referral Section -->
          <h3 class="text-6 font-semibold mb-8" style="font-family: var(--font-primary)">{{ $t('parent.application.sections.referral') }}</h3>

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28 mb-16">
            <FormInput v-model="form.referralSource" :label="$t('parent.application.form.referralSource')" />
            <FormInput v-model="form.initialQuestions" :label="$t('parent.application.form.initialQuestions')" />
          </div>

          <!-- Consent Section -->
          <div class="mb-12">
            <h4 class="text-5 mb-4">{{ $t('parent.application.sections.consent') }}</h4>
            <FormCheckbox 
              v-model="form.consentAgreement" 
              :label="$t('parent.application.form.consentAgreement.label')"
            />
            <p class="text-13px italic mt-4">
              {{ $t('parent.application.form.consentAgreement.disclaimer') }}
            </p>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-center">
            <button 
              type="submit"
              :disabled="!form.consentAgreement"
              class="px-12 py-4 bg-[var(--grayish-green)] text-[#FFFCF6] text-20px font-semibold  rounded-2.5 shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] backdrop-blur-5 transition-opacity"
              :class="form.consentAgreement ? 'hover:opacity-90 cursor-pointer' : 'opacity-50 cursor-not-allowed'"
            >
              {{ $t('parent.application.form.submitButton') }}
            </button>
          </div>
        </form>
      </div>
    </div>
    <AppFooter/>
    
    <!-- Response Modal -->
    <MessageModal
      v-model="showModal"
      :type="modalConfig.type"
      :title="modalConfig.title"
      :message="modalConfig.message"
      :button-text="modalConfig.buttonText"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { getAllCountries, getStatesByCountry, getPhoneCodeByCountry } from '~/data/countries-states'
import { useApi } from '~/composables/useApi'
import type { ParentRequest, Ethnicity, PrimaryLanguage, ProgramInterest } from '~/types/api'
import AppHeader from '@/components/base/AppHeader.vue';
import AppFooter from '@/components/base/AppFooter.vue';
import FormPhoneInput from '@/components/form/FormPhoneInput.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormCheckbox from '@/components/form/FormCheckbox.vue';
import FormRadio from '@/components/form/FormRadio.vue';
import FormDatePicker from '@/components/form/FormDatePicker.vue';
import MessageModal from '@/components/base/MessageModal.vue';

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
    otherText: ''
  },
  ethnicitySelfDescribe: '',  // 添加用于其他种族描述
  
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
    otherText: ''
  },
  otherLanguage: '',  // 添加用于其他语言描述
  
  // 项目意向
  desiredChildrenCount: '',
  journeyStartTiming: '',
  programInterests: '',
  initialQuestions: '',
  
  // 联系来源
  referralSource: '',
  
  // 同意条款
  consentAgreement: false,
  consentSMS: false
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
const { t } = useI18n()

// Modal state
const showModal = ref(false)
const modalConfig = reactive({
  type: 'success' as 'success' | 'error',
  title: '',
  message: '' as string | string[],
  buttonText: 'OK'
})

const handleSubmit = async () => {
  // Validate consent agreement
  if (!form.consentAgreement) {
    modalConfig.type = 'error'
    modalConfig.title = t('modal.error.consentRequired.title')
    modalConfig.message = t('modal.error.consentRequired.message')
    modalConfig.buttonText = t('modal.error.ok')
    showModal.value = true
    return
  }
  
  try {
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
      other: 'OTHER'
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
      other: 'OTHER'
    }
    
    Object.entries(form.languages).forEach(([key, value]) => {
      if (value && key !== 'otherText' && languageMap[key]) {
        languages.push(languageMap[key])
      }
    })
    
    // 构建API请求数据
    const requestData: ParentRequest = {
      accountId: form.accountId,
      city: form.city,
      country: form.country,
      countryCode: form.countryCode,
      dateOfBirth: form.dateOfBirth,
      email: form.email,
      fullLegalName: `${form.firstName} ${form.lastName}`.trim(),
      phoneNumber: form.phoneNumber,
      stateProvince: form.stateProvince,
      genderIdentity: form.genderIdentity,
      genderSelfDescribe: form.genderSelfDescribe || '',
      pronouns: form.pronouns,
      pronounsSelfDescribe: form.pronounsSelfDescribe || '',
      sexualOrientation: form.sexualOrientation,
      sexualOrientationSelfDescribe: form.sexualOrientationSelfDescribe || '',
      ethnicities,
      ethnicitySelfDescribe: form.ethnicitySelfDescribe || '',
      languages,
      otherLanguage: form.otherLanguage || '',
      desiredChildrenCount: form.desiredChildrenCount,
      journeyStartTiming: form.journeyStartTiming,
      programInterests: [form.programInterests], // API期望数组，但表单只选一个
      initialQuestions: form.initialQuestions || '',
      referralSource: form.referralSource || '',
      consentAgreement: form.consentAgreement,
      consentSMS: form.consentSMS
    }
    
    console.log('Submitting data:', requestData)
    
    const response = await submitParentApplication(requestData)
    console.log('Application submitted successfully:', response)
    
    // Show success modal
    modalConfig.type = 'success'
    modalConfig.title = t('modal.success.parent.title')
    modalConfig.message = t('modal.success.parent.message')
    modalConfig.buttonText = t('modal.error.ok')
    showModal.value = true
    
    // Reset form after successful submission
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 500)
    
  } catch (error: any) {
    console.error('Submission error:', error)
    
    // Handle error response
    modalConfig.type = 'error'
    modalConfig.title = t('modal.error.title')
    
    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
      // Handle validation errors
      const errorMessages = error.response.data.errors.map((err: any) => 
        err.field ? `${err.field}: ${err.message}` : err.message
      )
      modalConfig.message = errorMessages
    } else if (error.response?.data?.message) {
      // Handle general error message
      modalConfig.message = error.response.data.message
    } else if (error.message) {
      // Handle network or other errors
      modalConfig.message = error.message
    } else {
      // Fallback error message
      modalConfig.message = t('modal.error.unexpectedError')
    }
    
    modalConfig.buttonText = t('modal.error.tryAgain')
    showModal.value = true
  }
}
</script>
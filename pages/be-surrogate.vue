<template>
  <div class="min-h-screen bg-[var(--head-bg)] overflow-hidden">
    <AppHeader/>
    <!-- Header -->
    <div class="relative w-full h-30 lg:h-80 bg-[#BFC9BF] flex items-center justify-center">
      <h1 class="text-center text-8 lg:text-16 font-semibold italic" style="font-family: var(--font-primary)">
        {{ $t('surrogate.application.pageTitle') }}
      </h1>
    </div>

    <!-- Main Content -->
    <div class="relative max-w-300 mx-auto mt-10 px-4 lg:px-0">
      <!-- Success Message -->
      <div class="text-center mb-16  lg:text-5">
        <h2 class="text-8 font-semibold mb-8" style="font-family: var(--font-primary)">
          {{ $t('surrogate.application.congratulations.title') }}
        </h2>
        <p class="max-w-966px mx-auto mb-4 leading-relaxed">
          {{ $t('surrogate.application.congratulations.message1') }}
        </p>
        <p class="max-w-954px mx-auto mb-12">
          {{ $t('surrogate.application.congratulations.message2') }}
        </p>
        <p class="max-w-954px mx-auto text-8 font-semibold" style="font-family: var(--font-primary)">
          {{ $t('surrogate.application.congratulations.thanks') }}
        </p>
      </div>

      <!-- Form Container -->
      <div class="bg-gradient-to-b from-[var(--foot-bg)] via-[var(--light-cream)] to-[var(--foot-bg)] shadow-xl shadow-black/20 p-8 rounded-5 p-8 lg:p-12 mb-20">
        <form @submit.prevent="handleSubmit">
          <!-- Contact Information Section -->
          <h3 class="text-6 font-semibold mb-8" style="font-family: var(--font-primary)">{{ $t('surrogate.application.sections.contactInfo') }}</h3>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28 mb-16">
            <FormInput v-model="form.lastName" :label="$t('surrogate.application.form.lastName')" required />
            <FormInput v-model="form.firstName" :label="$t('surrogate.application.form.firstName')" required />
            <FormDatePicker v-model="form.birthDate" :label="$t('surrogate.application.form.dateOfBirth')" required />
            <FormInput v-model="form.email" :label="$t('surrogate.application.form.email')" type="email" required />
            <FormPhoneInput 
              v-model="form.mobilePhone" 
              v-model:countryCode="form.countryCode"
              :label="$t('surrogate.application.form.cellPhone')" 
              required
              :default-country="form.country || 'US'"
            />
            <div class="lg:mt-10">
              <FormCheckbox v-model="form.smsConsent" :label="$t('surrogate.application.form.smsConsent')" />
            </div>
            <FormInput v-model="form.city" :label="$t('surrogate.application.form.city')" required />
            <FormSelect 
              v-model="form.country" 
              :label="$t('surrogate.application.form.country')" 
              :options="countries" 
              required 
            />
            <FormSelect 
              v-model="form.state" 
              :label="$t('surrogate.application.form.stateProvince')" 
              :options="states" 
              :disabled="!form.country || states.length === 0"
              :placeholder="states.length === 0 ? $t('surrogate.application.form.noStatesAvailable') : $t('surrogate.application.form.selectStateProvince')"
              required 
            />
            <FormInput v-model="form.zipCode" :label="$t('surrogate.application.form.zipCode')" required />
            <FormSelect 
              v-model="form.citizenshipStatus" 
              :label="$t('surrogate.application.form.citizenship')" 
              :options="citizenshipStatus" 
              required 
            />
          </div>

          <!-- About You Section -->
          <h3 class="text-6 font-semibold mb-8" style="font-family: var(--font-primary)">{{ $t('surrogate.application.sections.aboutYou') }}</h3>

          <div class="space-y-6 mb-16">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.howDidYouHear') }}</p>
                <div class="space-y-2">
                  <FormRadio v-model="form.contactSource" name="contactSource" value="FRIEND_REFERRAL" :label="$t('surrogate.application.form.friendReferral')" />
                  <FormRadio v-model="form.contactSource" name="contactSource" value="SOCIAL_MEDIA" :label="$t('surrogate.application.form.socialMedia')" />
                  <FormRadio v-model="form.contactSource" name="contactSource" value="GOOGLE_SEARCH" :label="$t('surrogate.application.form.googleSearch')" />
                  <div class="flex items-center gap-2">
                    <FormRadio v-model="form.contactSource" name="contactSource" value="OTHER" :label="$t('surrogate.application.form.other')" />
                  </div>
                    <input 
                      v-if="form.contactSource === 'OTHER'" 
                      v-model="form.contactSourceOther" 
                      type="text"
                      placeholder=""
                      class="ml-2 h-15 px-3 bg-[rgba(234.35,232.57,208.37,0.20)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] bg-blend-overlay rounded-2.5 backdrop-blur-5 border-none outline-none focus:ring-2 focus:ring-[var(--grayish-green)] transition-all placeholder:text-black/60 placeholder: flex-1"
                    />
                </div>
              </div>
              <FormInput v-model="form.occupation" :label="$t('surrogate.application.form.occupation')" required />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.previousSurrogate.question') }} <span class="text-red-500">*</span></p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.isFormerSurrogate" name="isFormerSurrogate" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.isFormerSurrogate" name="isFormerSurrogate" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
              <div v-if="form.isFormerSurrogate === 'yes'">
                <p class="mb-4">{{ $t('surrogate.application.form.previousSurrogate.description') }}</p>
                <FormInput v-model="form.surrogateExperience" />
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.maritalStatus.question') }}</p>
                <div class="space-y-2">
                  <FormRadio v-model="form.maritalStatus" name="maritalStatus" value="MARRIED" :label="$t('surrogate.application.form.maritalStatus.options.married')" />
                  <FormRadio v-model="form.maritalStatus" name="maritalStatus" value="ENGAGED" :label="$t('surrogate.application.form.maritalStatus.options.engaged')" />
                  <FormRadio v-model="form.maritalStatus" name="maritalStatus" value="CO_HABITATING" :label="$t('surrogate.application.form.maritalStatus.options.cohabitating')" />
                  <FormRadio v-model="form.maritalStatus" name="maritalStatus" value="LIVING_SEPARATELY" :label="$t('surrogate.application.form.maritalStatus.options.livingSeparately')" />
                  <FormRadio v-model="form.maritalStatus" name="maritalStatus" value="SINGLE" :label="$t('surrogate.application.form.maritalStatus.options.single')" />
                  <FormRadio v-model="form.maritalStatus" name="maritalStatus" value="DIVORCED_FINALIZED" :label="$t('surrogate.application.form.maritalStatus.options.divorcedFinalized')" />
                  <FormRadio v-model="form.maritalStatus" name="maritalStatus" value="DIVORCED_IN_PROGRESS" :label="$t('surrogate.application.form.maritalStatus.options.divorcedInProcess')" />
                  <FormRadio v-model="form.maritalStatus" name="maritalStatus" value="LEGALLY_SEPARATED" :label="$t('surrogate.application.form.maritalStatus.options.legallySeparated')" />
                  <FormRadio v-model="form.maritalStatus" name="maritalStatus" value="SEPARATED_INFORMALLY" :label="$t('surrogate.application.form.maritalStatus.options.separatedInformally')" />
                </div>
              </div>

              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.partnerSupport.question') }}</p>
                <div class="space-y-2">
                  <FormRadio v-model="form.partnerSupport" name="partnerSupport" value="YES" :label="$t('surrogate.application.form.partnerSupport.options.yes')" />
                  <FormRadio v-model="form.partnerSupport" name="partnerSupport" value="NO" :label="$t('surrogate.application.form.partnerSupport.options.no')" />
                  <FormRadio v-model="form.partnerSupport" name="partnerSupport" value="NOT_APPLICABLE" :label="$t('surrogate.application.form.partnerSupport.options.notApplicable')" />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.education.highSchool') }}</p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.hasHighSchoolDiploma" name="hasHighSchoolDiploma" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.hasHighSchoolDiploma" name="hasHighSchoolDiploma" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.income.question') }}</p>
                <div class="space-y-2">
                  <FormRadio v-model="form.householdIncome" name="householdIncome" value="UNDER_30K" :label="$t('surrogate.application.form.income.options.under30k')" />
                  <FormRadio v-model="form.householdIncome" name="householdIncome" value="BETWEEN_30K_50K" :label="$t('surrogate.application.form.income.options.between30k50k')" />
                  <FormRadio v-model="form.householdIncome" name="householdIncome" value="BETWEEN_50K_75K" :label="$t('surrogate.application.form.income.options.between50k75k')" />
                  <FormRadio v-model="form.householdIncome" name="householdIncome" value="BETWEEN_75K_100K" :label="$t('surrogate.application.form.income.options.between75k100k')" />
                  <FormRadio v-model="form.householdIncome" name="householdIncome" value="OVER_100K" :label="$t('surrogate.application.form.income.options.over100k')" />
                  <FormRadio v-model="form.householdIncome" name="householdIncome" value="DECLINE_TO_STATE" :label="$t('surrogate.application.form.income.options.preferNotToSay')" />
                </div>
              </div>
            </div>
          </div>

          <!-- Pregnancy & Health History Section -->
          <h3 class="text-6 font-semibold mb-8" style="font-family: var(--font-primary)">{{ $t('surrogate.application.sections.pregnancyHealth') }}</h3>

          <div class="space-y-6 mb-16">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.pregnancy.givenBirth.question') }}</p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.pregnancyHistory.hasGivenBirth" name="hasGivenBirth" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.pregnancyHistory.hasGivenBirth" name="hasGivenBirth" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
              <div v-if="form.pregnancyHistory.hasGivenBirth === 'yes'">
                <p class="mb-4">{{ $t('surrogate.application.form.pregnancy.givenBirth.description') }}</p>
                <FormInput v-model="form.pregnancyHistory.birthDetails" />
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.pregnancy.currentlyPregnant') }}</p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.pregnancyHistory.isPregnant" name="isPregnant" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.pregnancyHistory.isPregnant" name="isPregnant" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.pregnancy.breastfeeding') }}</p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.pregnancyHistory.isBreastfeeding" name="isBreastfeeding" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.pregnancyHistory.isBreastfeeding" name="isBreastfeeding" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
            </div>

            <div>
              <p class="mb-4">{{ $t('surrogate.application.form.pregnancy.stillbirth') }}</p>
              <div class="flex gap-8">
                <FormRadio v-model="form.pregnancyHistory.hasStillbirth" name="hasStillbirth" value="yes" :label="$t('surrogate.application.form.yes')" />
                <FormRadio v-model="form.pregnancyHistory.hasStillbirth" name="hasStillbirth" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <FormInput v-model="form.pregnancyHistory.height" :label="$t('surrogate.application.form.pregnancy.height')" type="number" required />
              <FormInput v-model="form.pregnancyHistory.weightPounds" :label="$t('surrogate.application.form.pregnancy.weight')" type="number" required />
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.health.medicalHistory.question') }}</p>
                <div class="space-y-2">
                  <FormCheckbox v-model="form.healthHistory.medicalConditions.diabetes" :label="$t('surrogate.application.form.health.medicalHistory.conditions.diabetes')" />
                  <FormCheckbox v-model="form.healthHistory.medicalConditions.hypertension" :label="$t('surrogate.application.form.health.medicalHistory.conditions.hypertension')" />
                  <FormCheckbox v-model="form.healthHistory.medicalConditions.bipolarDisorder" :label="$t('surrogate.application.form.health.medicalHistory.conditions.bipolarDisorder')" />
                  <FormCheckbox v-model="form.healthHistory.medicalConditions.multipleMiscarriages" :label="$t('surrogate.application.form.health.medicalHistory.conditions.multipleMiscarriages')" />
                  <FormCheckbox v-model="form.healthHistory.medicalConditions.seizureDisorder" :label="$t('surrogate.application.form.health.medicalHistory.conditions.seizureDisorder')" />
                  <FormCheckbox v-model="form.healthHistory.medicalConditions.none" :label="$t('surrogate.application.form.health.medicalHistory.conditions.none')" />
                </div>
              </div>
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.health.medications.question') }}</p>
                <div class="flex gap-8 mb-4">
                  <FormRadio v-model="form.healthHistory.isTakingMeds" name="isTakingMeds" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.healthHistory.isTakingMeds" name="isTakingMeds" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
                <FormInput v-if="form.healthHistory.isTakingMeds === 'yes'" v-model="form.healthHistory.medicationsList" placeholder="" />
              </div>
            </div>
          </div>

          <!-- Financial & Legal Background Section -->
          <h3 class="text-6 font-semibold mb-8" style="font-family: var(--font-primary)">{{ $t('surrogate.application.sections.financialLegal') }}</h3>

          <div class="space-y-6 mb-16">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.assistance.question') }}</p>
                <div class="grid grid-cols-1 gap-2">
                  <FormCheckbox v-model="form.governmentAssistance.foodStamps" :label="$t('surrogate.application.form.assistance.programs.foodStamps')" />
                  <FormCheckbox v-model="form.governmentAssistance.medicaid" :label="$t('surrogate.application.form.assistance.programs.medicaid')" />
                  <FormCheckbox v-model="form.governmentAssistance.cashAssistance" :label="$t('surrogate.application.form.assistance.programs.cashAssistance')" />
                  <FormCheckbox v-model="form.governmentAssistance.financialAid" :label="$t('surrogate.application.form.assistance.programs.financialAid')" />
                  <FormCheckbox v-model="form.governmentAssistance.wic" :label="$t('surrogate.application.form.assistance.programs.wic')" />
                  <FormCheckbox v-model="form.governmentAssistance.ssi" :label="$t('surrogate.application.form.assistance.programs.ssi')" />
                  <FormCheckbox v-model="form.governmentAssistance.publicHousing" :label="$t('surrogate.application.form.assistance.programs.publicHousing')" />
                  <FormCheckbox v-model="form.governmentAssistance.childcare" :label="$t('surrogate.application.form.assistance.programs.childcare')" />
                  <FormCheckbox v-model="form.governmentAssistance.studentLoans" :label="$t('surrogate.application.form.assistance.programs.studentLoans')" />
                  <div class="flex items-center gap-2">
                    <FormCheckbox v-model="form.governmentAssistance.other" :label="$t('surrogate.application.form.assistance.programs.other')" /></div>
                    <input 
                      v-if="form.governmentAssistance.other" 
                      v-model="form.financialLegal.otherAssistanceDetail" 
                      type="text"
                      placeholder=""
                      class="ml-2 h-10 px-3 bg-[rgba(234.35,232.57,208.37,0.20)] shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] bg-blend-overlay rounded-2.5 backdrop-blur-5 border-none outline-none focus:ring-2 focus:ring-[var(--grayish-green)] transition-all placeholder:text-black/60 placeholder: flex-1"
                    />
                  <FormCheckbox v-model="form.governmentAssistance.none" :label="$t('surrogate.application.form.assistance.programs.none')" />
                </div>
              </div>

              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.legal.criminalRecord.question') }}</p>
                <div class="flex gap-8 mb-4">
                  <FormRadio v-model="form.financialLegal.hasCriminalRecord" name="hasCriminalRecord" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.financialLegal.hasCriminalRecord" name="hasCriminalRecord" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
                <FormInput v-if="form.financialLegal.hasCriminalRecord === 'yes'" v-model="form.financialLegal.criminalDescription" :placeholder="$t('surrogate.application.form.legal.criminalRecord.explain')" />
              </div>
            </div>
            <div>
              <p class="mb-4">{{ $t('surrogate.application.form.legal.legalMatters.question') }}</p>
              <div class="flex gap-8 mb-4">
                <FormRadio v-model="form.financialLegal.hasLegalProceedings" name="hasLegalProceedings" value="yes" :label="$t('surrogate.application.form.yes')" />
                <FormRadio v-model="form.financialLegal.hasLegalProceedings" name="hasLegalProceedings" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
              <FormInput v-if="form.financialLegal.hasLegalProceedings === 'yes'" v-model="form.financialLegal.proceedingDetails" :placeholder="$t('surrogate.application.form.legal.legalMatters.explain')" />
            </div>

            <div>
              <p class="mb-4">{{ $t('surrogate.application.form.legal.cpsHistory') }}</p>
              <div class="flex gap-8">
                <FormRadio v-model="form.financialLegal.hasCPSHistory" name="hasCPSHistory" value="yes" :label="$t('surrogate.application.form.yes')" />
                <FormRadio v-model="form.financialLegal.hasCPSHistory" name="hasCPSHistory" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>
          </div>

          <!-- Final Consent Section -->
          <div class="mb-12">
            <h4 class="font-normal mb-4">{{ $t('surrogate.application.sections.consent') }}</h4>
            <FormCheckbox 
              v-model="form.finalConsent" 
              :label="$t('surrogate.application.form.finalConsent.text')"
            />
            <p class="text-13px italic mt-4">
              {{ $t('surrogate.application.form.finalConsent.disclaimer') }}
            </p>
          </div>

          <!-- Submit Button -->
          <div class="flex justify-center">
            <button 
              type="submit"
              :disabled="!form.finalConsent"
              class="px-12 py-4 bg-[var(--grayish-green)] text-[#FFFCF6] text-20px font-semibold rounded-2.5 shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] backdrop-blur-5 transition-opacity"
              :class="form.finalConsent ? 'hover:opacity-90 cursor-pointer' : 'opacity-50 cursor-not-allowed'"
            >
              {{ $t('surrogate.application.form.submitButton') }}
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
import { citizenshipStatus } from '~/data/us-states'
import { useApi } from '~/composables/useApi'
import type { SurrogateRequest } from '~/types/api'
import AppHeader from '@/components/base/AppHeader.vue';
import AppFooter from '@/components/base/AppFooter.vue';
import FormPhoneInput from '@/components/form/FormPhoneInput.vue';
import FormInput from '@/components/form/FormInput.vue';
import FormSelect from '@/components/form/FormSelect.vue';
import FormCheckbox from '@/components/form/FormCheckbox.vue';
import FormRadio from '@/components/form/FormRadio.vue';
import FormDatePicker from '@/components/form/FormDatePicker.vue';
import MessageModal from '@/components/base/MessageModal.vue';

const { t } = useI18n()

const form = reactive({
  // 基本信息
  birthDate: '',
  citizenshipStatus: '',
  contactSource: '',
  contactSourceOther: '',
  email: '',
  firstName: '',
  lastName: '',
  mobilePhone: '',
  countryCode: '+1',
  occupation: '',
  state: '',
  zipCode: '',
  city: '',
  country: 'US',
  
  // 教育背景
  hasHighSchoolDiploma: '',
  
  // 婚姻状况
  maritalStatus: '',
  partnerSupport: '',
  
  // 代孕经验
  isFormerSurrogate: '',
  surrogateExperience: '',
  
  // 财务和法律信息
  householdIncome: '',
  financialLegal: {
    criminalDescription: '',
    governmentAssistance: [],
    hasCPSHistory: '',
    hasCriminalRecord: '',
    hasLegalProceedings: '',
    otherAssistanceDetail: '',
    proceedingDetails: ''
  },
  
  // 健康历史
  healthHistory: {
    isTakingMeds: '',
    medicalConditions: {
      diabetes: false,
      hypertension: false,
      bipolarDisorder: false,
      multipleMiscarriages: false,
      seizureDisorder: false,
      none: false
    },
    medicationsList: ''
  },
  
  // 怀孕历史
  pregnancyHistory: {
    birthDetails: '',
    hasGivenBirth: '',
    hasStillbirth: '',
    height: '',
    isBreastfeeding: '',
    isPregnant: '',
    weightPounds: ''
  },
  
  // 同意条款
  smsConsent: false,
  finalConsent: false,
  
  // 政府援助 - 保留以便转换
  governmentAssistance: {
    foodStamps: false,
    medicaid: false,
    cashAssistance: false,
    financialAid: false,
    wic: false,
    ssi: false,
    publicHousing: false,
    childcare: false,
    studentLoans: false,
    other: false,
    otherText: '',
    none: false
  }
})

const countries = computed(() => getAllCountries())

const states = computed(() => {
  return getStatesByCountry(form.country)
})

watch(() => form.country, (newCountry) => {
  form.state = ''
  
  const phoneCode = getPhoneCodeByCountry(newCountry)
  if (phoneCode) {
    form.countryCode = phoneCode
  }
})

const { submitSurrogateApplication } = useApi()

// Modal state
const showModal = ref(false)
const modalConfig = reactive({
  type: 'success' as 'success' | 'error',
  title: '',
  message: '' as string | string[],
  buttonText: 'OK'
})

const handleSubmit = async () => {
  // Validate final consent
  if (!form.finalConsent) {
    modalConfig.type = 'error'
    modalConfig.title = t('modal.error.consentRequired.title')
    modalConfig.message = t('modal.error.consentRequired.message')
    modalConfig.buttonText = t('modal.error.ok')
    showModal.value = true
    return
  }
  
  try {
    // 转换布尔值
    const booleanFields = {
      isFormerSurrogate: form.isFormerSurrogate === 'yes',
      hasHighSchoolDiploma: form.hasHighSchoolDiploma === 'yes',
      'pregnancyHistory.hasGivenBirth': form.pregnancyHistory.hasGivenBirth === 'yes',
      'pregnancyHistory.hasStillbirth': form.pregnancyHistory.hasStillbirth === 'yes',
      'pregnancyHistory.isBreastfeeding': form.pregnancyHistory.isBreastfeeding === 'yes',
      'pregnancyHistory.isPregnant': form.pregnancyHistory.isPregnant === 'yes',
      'healthHistory.isTakingMeds': form.healthHistory.isTakingMeds === 'yes',
      'financialLegal.hasCPSHistory': form.financialLegal.hasCPSHistory === 'yes',
      'financialLegal.hasCriminalRecord': form.financialLegal.hasCriminalRecord === 'yes',
      'financialLegal.hasLegalProceedings': form.financialLegal.hasLegalProceedings === 'yes'
    }
    
    // 转换政府援助数据
    const governmentAssistance: string[] = []
    const assistanceMap: Record<string, string> = {
      foodStamps: 'FOOD_STAMPS',
      medicaid: 'MEDICAID',
      cashAssistance: 'CASH_ASSISTANCE',
      financialAid: 'FINANCIAL_AID',
      wic: 'WIC',
      ssi: 'SSI',
      publicHousing: 'PUBLIC_HOUSING',
      childcare: 'SUBSIDIZED_CHILDCARE',
      studentLoans: 'STUDENT_LOANS',
      other: 'OTHER_ASSISTANCE'
    }
    
    Object.entries(form.governmentAssistance).forEach(([key, value]) => {
      if (value && key !== 'otherText' && key !== 'none' && assistanceMap[key]) {
        governmentAssistance.push(assistanceMap[key])
      }
    })
    
    // 转换医疗状况数据
    const medicalConditions: string[] = []
    const conditionsMap: Record<string, string> = {
      diabetes: 'DIABETES',
      hypertension: 'HYPERTENSION',
      bipolarDisorder: 'BIPOLAR_DISORDER',
      multipleMiscarriages: 'MULTIPLE_MISCARRIAGES',
      seizureDisorder: 'SEIZURE_DISORDER'
    }
    
    Object.entries(form.healthHistory.medicalConditions).forEach(([key, value]) => {
      if (value && key !== 'none' && conditionsMap[key]) {
        medicalConditions.push(conditionsMap[key])
      }
    })
    
    // 构建API请求数据
    const requestData: SurrogateRequest = {
      birthDate: form.birthDate,
      citizenshipStatus: form.citizenshipStatus,
      contactSource: form.contactSource,
      contactSourceOther: form.contactSourceOther || '',
      email: form.email,
      firstName: form.firstName,
      lastName: form.lastName,
      mobileWithCountryCode: form.countryCode + form.mobilePhone,
      occupation: form.occupation,
      state: form.state,
      zipCode: form.zipCode,
      hasHighSchoolDiploma: booleanFields.hasHighSchoolDiploma,
      maritalStatus: form.maritalStatus,
      partnerSupport: form.partnerSupport || '',
      isFormerSurrogate: booleanFields.isFormerSurrogate,
      surrogateExperience: form.surrogateExperience || '',
      householdIncome: form.householdIncome,
      financialLegal: {
        criminalDescription: form.financialLegal.criminalDescription || '',
        governmentAssistance,
        hasCPSHistory: booleanFields['financialLegal.hasCPSHistory'],
        hasCriminalRecord: booleanFields['financialLegal.hasCriminalRecord'],
        hasLegalProceedings: booleanFields['financialLegal.hasLegalProceedings'],
        otherAssistanceDetail: form.governmentAssistance.otherText || '',
        proceedingDetails: form.financialLegal.proceedingDetails || ''
      },
      healthHistory: {
        isTakingMeds: booleanFields['healthHistory.isTakingMeds'],
        medicalConditions,
        medicationsList: form.healthHistory.medicationsList || ''
      },
      pregnancyHistory: {
        birthDetails: form.pregnancyHistory.birthDetails || '',
        hasGivenBirth: booleanFields['pregnancyHistory.hasGivenBirth'],
        hasStillbirth: booleanFields['pregnancyHistory.hasStillbirth'],
        height: parseInt(form.pregnancyHistory.height) || 0,
        isBreastfeeding: booleanFields['pregnancyHistory.isBreastfeeding'],
        isPregnant: booleanFields['pregnancyHistory.isPregnant'],
        weightPounds: parseInt(form.pregnancyHistory.weightPounds) || 0
      },
      smsConsent: form.smsConsent
    }
    
    console.log('Submitting data:', requestData)
    
    const response = await submitSurrogateApplication(requestData)
    console.log('Application submitted successfully:', response)
    console.log('Application submitted successfully:', response.code)
    // Show success modal
    modalConfig.type = 'success'
    modalConfig.title = t('modal.success.surrogate.title')
    modalConfig.message = t('modal.success.surrogate.message')
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
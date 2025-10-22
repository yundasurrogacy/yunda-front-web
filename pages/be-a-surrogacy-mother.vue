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
            <FormCheckbox v-model="form.smsConsent" :label="$t('surrogate.application.form.smsConsent')" required :true-value="true" :false-value="false" />
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
            <FormInput v-model="form.height" :label="$t('surrogate.application.form.height')" type="number" required />
            <FormInput v-model="form.weight" :label="$t('surrogate.application.form.weight')" type="number" required />
            <FormInput v-model="form.bmi" :label="$t('surrogate.application.form.bmi')" type="number" required />
            <FormInput v-model="form.ethnicity" :label="$t('surrogate.application.form.ethnicity')" required />
            <FormInput v-model="form.surrogacyExperienceCount" :label="$t('surrogate.application.form.surrogacyExperienceCount')" type="number" required />
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
              <div class="grid grid-cols-1">
                <p class="mb-4">{{ $t('surrogate.application.form.howDidYouHear') }} <span class="text-red-500">*</span></p>
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
              <div class="flex flex-col gap-6 h-full justify-between">
                <FormInput v-model="form.occupation" :label="$t('surrogate.application.form.occupation')" required />
                <FormInput v-model="form.educationLevel" :label="$t('surrogate.application.form.educationLevel')" required />
              </div>
            </div>

            <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
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
            </div> -->

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.maritalStatus.question') }} <span class="text-red-500">*</span></p>
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
                <p class="mb-4">{{ $t('surrogate.application.form.partnerSupport.question') }} <span class="text-red-500">*</span></p>
                <div class="space-y-2">
                  <FormRadio v-model="form.partnerSupport" name="partnerSupport" value="YES" :label="$t('surrogate.application.form.partnerSupport.options.yes')" />
                  <FormRadio v-model="form.partnerSupport" name="partnerSupport" value="NO" :label="$t('surrogate.application.form.partnerSupport.options.no')" />
                  <FormRadio v-model="form.partnerSupport" name="partnerSupport" value="NOT_APPLICABLE" :label="$t('surrogate.application.form.partnerSupport.options.notApplicable')" />
                </div>
              </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.education.highSchool') }} <span class="text-red-500">*</span></p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.hasHighSchoolDiploma" name="hasHighSchoolDiploma" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.hasHighSchoolDiploma" name="hasHighSchoolDiploma" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.income.question') }} <span class="text-red-500">*</span></p>
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
                <p class="mb-4">{{ $t('surrogate.application.form.pregnancy.givenBirth.question') }} <span class="text-red-500">*</span></p>
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
                <p class="mb-4">{{ $t('surrogate.application.form.pregnancy.currentlyPregnant') }} <span class="text-red-500">*</span></p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.pregnancyHistory.isPregnant" name="isPregnant" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.pregnancyHistory.isPregnant" name="isPregnant" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.pregnancy.breastfeeding') }} <span class="text-red-500">*</span></p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.pregnancyHistory.isBreastfeeding" name="isBreastfeeding" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.pregnancyHistory.isBreastfeeding" name="isBreastfeeding" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
            </div>

            <div>
              <p class="mb-4">{{ $t('surrogate.application.form.pregnancy.stillbirth') }} <span class="text-red-500">*</span></p>
              <div class="flex gap-8">
                <FormRadio v-model="form.pregnancyHistory.hasStillbirth" name="hasStillbirth" value="yes" :label="$t('surrogate.application.form.yes')" />
                <FormRadio v-model="form.pregnancyHistory.hasStillbirth" name="hasStillbirth" value="no" :label="$t('surrogate.application.form.no')" />
              </div>
            </div>

            <!-- <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <FormInput v-model="form.pregnancyHistory.height" :label="$t('surrogate.application.form.pregnancy.height')" type="number" required />
              <FormInput v-model="form.pregnancyHistory.weightPounds" :label="$t('surrogate.application.form.pregnancy.weight')" type="number" required />
            </div> -->

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.health.medicalHistory.question') }} <span class="text-red-500">*</span></p>
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
                <p class="mb-4">{{ $t('surrogate.application.form.health.medications.question') }} <span class="text-red-500">*</span></p>
                <div class="flex gap-8 mb-4">
                  <FormRadio v-model="form.healthHistory.isTakingMeds" name="isTakingMeds" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.healthHistory.isTakingMeds" name="isTakingMeds" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
                <FormInput v-if="form.healthHistory.isTakingMeds === 'yes'" v-model="form.healthHistory.medicationsList" placeholder="" />
              </div>
            </div>
          </div>

          <!-- Financial & Legal Background Section -->
          <!-- <h3 class="text-6 font-semibold mb-8" style="font-family: var(--font-primary)">{{ $t('surrogate.application.sections.financialLegal') }}</h3>

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
          </div> -->

          <!-- <h3 class="text-6 font-semibold mb-8">{{ $t('surrogate.application.sections.legalHealthQuestions') }}</h3> -->
          <div class="space-y-6 mb-16">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.legalHealthQuestions.domesticViolence') }} <span class="text-red-500">*</span></p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.legalHealthQuestions.domesticViolence" name="domesticViolence" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.legalHealthQuestions.domesticViolence" name="domesticViolence" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.legalHealthQuestions.substanceAbuse') }} <span class="text-red-500">*</span></p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.legalHealthQuestions.substanceAbuse" name="substanceAbuse" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.legalHealthQuestions.substanceAbuse" name="substanceAbuse" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.legalHealthQuestions.felonyCharges') }} <span class="text-red-500">*</span></p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.legalHealthQuestions.felonyCharges" name="felonyCharges" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.legalHealthQuestions.felonyCharges" name="felonyCharges" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.legalHealthQuestions.outstandingWarrant') }} <span class="text-red-500">*</span></p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.legalHealthQuestions.outstandingWarrant" name="outstandingWarrant" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.legalHealthQuestions.outstandingWarrant" name="outstandingWarrant" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.legalHealthQuestions.formalProbation') }} <span class="text-red-500">*</span></p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.legalHealthQuestions.formalProbation" name="formalProbation" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.legalHealthQuestions.formalProbation" name="formalProbation" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.legalHealthQuestions.arrests') }} <span class="text-red-500">*</span></p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.legalHealthQuestions.arrests" name="arrests" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.legalHealthQuestions.arrests" name="arrests" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28">
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.legalHealthQuestions.childAbuseNeglect') }} <span class="text-red-500">*</span></p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.legalHealthQuestions.childAbuseNeglect" name="childAbuseNeglect" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.legalHealthQuestions.childAbuseNeglect" name="childAbuseNeglect" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
              <div>
                <p class="mb-4">{{ $t('surrogate.application.form.legalHealthQuestions.childProtectionInvestigation') }} <span class="text-red-500">*</span></p>
                <div class="flex gap-8">
                  <FormRadio v-model="form.legalHealthQuestions.childProtectionInvestigation" name="childProtectionInvestigation" value="yes" :label="$t('surrogate.application.form.yes')" />
                  <FormRadio v-model="form.legalHealthQuestions.childProtectionInvestigation" name="childProtectionInvestigation" value="no" :label="$t('surrogate.application.form.no')" />
                </div>
              </div>
            </div>
            <div>
              <div>
              <p class="mb-4">{{ $t('surrogate.application.form.legalHealthQuestions.backgroundCheckStatus') }} <span class="text-red-500">*</span></p>
              <div class="flex gap-8">
                <FormRadio
                  v-model="form.legalHealthQuestions.backgroundCheckStatus"
                  name="backgroundCheckStatus"
                  value="APPROVED"
                    :label="$t('surrogate.application.form.legalHealthQuestions.approved')"
                />
                <FormRadio
                  v-model="form.legalHealthQuestions.backgroundCheckStatus"
                  name="backgroundCheckStatus"
                  value="NOT_APPROVED"
                    :label="$t('surrogate.application.form.legalHealthQuestions.notApproved')"
                />
              </div>
            </div>
            </div>
          </div>

          <!-- 怀孕历史 Pregnancy History（可动态添加） -->
          <div class="mb-16 bg-[rgba(234,232,208,0.15)] px-8 py-10">
            <div class="flex items-center mb-8">
              <!-- <svg width="32" height="32" fill="none" viewBox="0 0 32 32" class="mr-4 text-[var(--grayish-green)]"><circle cx="16" cy="16" r="15" stroke="currentColor" stroke-width="2"/><path d="M10 18c0-3 2-6 6-6s6 3 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> -->
              <h3 class="text-8 font-extrabold tracking-wide" style="font-family: var(--font-primary)">{{ $t('surrogate.application.sections.pregnancyHistory') }}</h3>
            </div>
            <div class="space-y-6">
              <div v-if="form.pregnancyHistoryList.length > 0">
                <div v-for="(preg, idx) in form.pregnancyHistoryList" :key="idx" class="mb-8 rounded-3 shadow-lg bg-[rgba(234,232,208,0.15)]">
                  <div class="rounded-3 shadow-lg mb-2 bg-[rgba(234,232,208,0.15)]">
                    <div class="flex items-center justify-between cursor-pointer select-none px-6 py-4 border-b border-gray-200" @click="pregnancyHistoryCollapse[idx] = !pregnancyHistoryCollapse[idx]">
                      <div class="flex items-center gap-2">
                        <!-- <svg width="24" height="24" fill="none" viewBox="0 0 24 24" class="text-[var(--grayish-green)]"><circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/><path d="M8 14c0-2 1.5-4 4-4s4 2 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg> -->
                        <h4 class="font-extrabold text-6 text-black tracking-wide" style="font-family: var(--font-primary)">
                          {{ $t('surrogate.application.form.pregnancyHistory.pregnancy') }} {{ idx + 1 }}
                        </h4>
                      </div>
                      <span class="flex items-center gap-2 ml-2">
                        <span class="text-4 text-gray-500">
                          <svg v-if="pregnancyHistoryCollapse[idx]" width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M5 8l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                          <svg v-else width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M5 12l5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
                        </span>
                        <button type="button" class="px-6 py-2 bg-[var(--grayish-green)] text-gray-100 rounded-3 text-center hover:bg-[var(--grayish-green)] hover:opacity-90 transition mr-2 flex items-center text-base" style="font-weight:normal;min-width:unset;box-shadow:none;" @click.stop.prevent="removePregnancy(idx)">
                          <span class="text-base">{{ $t('surrogate.application.form.pregnancyHistory.remove') }}</span>
                        </button>
                      </span>
                    </div>
                    <div v-show="pregnancyHistoryCollapse[idx]" class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28 px-6 py-4">
                      <FormDatePicker v-model="preg.date" :label="$t('surrogate.application.form.pregnancyHistory.date')" required />
                      <FormInput v-model="preg.weight" :label="$t('surrogate.application.form.pregnancyHistory.weight')" type="number" required />
                      <FormInput v-model="preg.weeks" :label="$t('surrogate.application.form.pregnancyHistory.weeks')" type="number" required />
                      <FormInput v-model="preg.babies" :label="$t('surrogate.application.form.pregnancyHistory.babies')" type="number" required />
                      <FormInput v-model="preg.delivery" :label="$t('surrogate.application.form.pregnancyHistory.delivery')" required />

                    </div>
                  </div>
                </div>
              </div>
              <button type="button" class="px-8 py-3 bg-[var(--grayish-green)] text-white rounded-2 font-bold shadow hover:opacity-90 transition" @click="addPregnancy">
                <svg width="18" height="18" fill="none" viewBox="0 0 18 18" class="inline mr-2 align-middle"><path d="M9 2v14M2 9h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                <span class="text-base font-bold">{{ $t('surrogate.application.form.pregnancyHistory.add') }}</span>
              </button>
                <!-- 移除按钮已移至标题区，内容区不再显示 -->

              <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-x-28 mt-8">
                <div>
                  <p class="mb-4">{{ $t('surrogate.application.form.pregnancyHistory.seriousComplications') }} <span class="text-red-500">*</span></p>
                  <div class="flex gap-8">
                    <FormRadio v-model="form.pregnancyHistory.seriousComplications" name="seriousComplications" value="yes" :label="$t('surrogate.application.form.yes')" />
                    <FormRadio v-model="form.pregnancyHistory.seriousComplications" name="seriousComplications" value="no" :label="$t('surrogate.application.form.no')" />
                  </div>
                </div>
                <div>
                  <FormInput v-model="form.pregnancyHistory.birthControl" :label="$t('surrogate.application.form.pregnancyHistory.birthControl')" required />
                </div>
                <div>
                  <FormInput v-model="form.pregnancyHistory.closestHospital" :label="$t('surrogate.application.form.pregnancyHistory.closestHospital')" required />
                </div>
                <div>
                  <FormInput v-model="form.pregnancyHistory.closestNICU" :label="$t('surrogate.application.form.pregnancyHistory.closestNICU')" required/>
                </div>
              </div>
            </div>
          </div>

          <!-- 妊娠代孕访谈 Gestational Surrogacy Interview（填空） -->
          <h3 class="text-6 font-semibold mb-8">{{ $t('surrogate.application.sections.gestationalInterview') }}</h3>
          <div class="space-y-6 mb-16">
            <FormInput v-model="form.gestationalInterview.supportPerson" :label="$t('surrogate.application.form.gestationalInterview.supportPerson')" required />
            <FormInput v-model="form.gestationalInterview.languages" :label="$t('surrogate.application.form.gestationalInterview.languages')" required />
            <FormInput v-model="form.gestationalInterview.motivation" :label="$t('surrogate.application.form.gestationalInterview.motivation')" required />
            <FormInput v-model="form.gestationalInterview.aboutYou" :label="$t('surrogate.application.form.gestationalInterview.aboutYou')" required />
            <FormInput v-model="form.gestationalInterview.contactPreference" :label="$t('surrogate.application.form.gestationalInterview.contactPreference')" required />
            <FormInput v-model="form.gestationalInterview.hipaaConsent" :label="$t('surrogate.application.form.gestationalInterview.hipaaConsent')" required />
            <FormInput v-model="form.gestationalInterview.twinsAttitude" :label="$t('surrogate.application.form.gestationalInterview.twinsAttitude')" required />
            <FormInput v-model="form.gestationalInterview.tripletsReduction" :label="$t('surrogate.application.form.gestationalInterview.tripletsReduction')" required />
            <FormInput v-model="form.gestationalInterview.terminationConsent" :label="$t('surrogate.application.form.gestationalInterview.terminationConsent')" required />
          </div>

          <!-- 上传照片 Upload Photos (minimum 2) -->
          <h3 class="text-6 font-semibold mb-8">{{ $t('surrogate.application.sections.uploadPhotos') }} <span class="text-red-500">*</span></h3>
          <div class="space-y-6 mb-16">
            <!-- 预览区在上传区上方 -->
            <div v-if="form.uploadPhotos && form.uploadPhotos.length">
              <div class="flex flex-wrap gap-6 mb-6">
                <div v-for="(photo, idx) in form.uploadPhotos" :key="idx" class="relative group">
                  <img :src="photo" class="w-32 h-32 object-cover rounded-3 shadow-md transition-transform duration-200 group-hover:scale-105 border border-gray-200" />
                  <button type="button" @click.stop="removePhoto(idx)" class="absolute top-2 right-2 bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-500 transition" title="删除" style="box-shadow: 0 2px 8px rgba(0,0,0,0.12);">
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none"><path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
                  </button>
                </div>
              </div>
              <p v-if="form.uploadPhotos.length < 2" class="text-red-500 mb-2">{{ $t('surrogate.application.form.uploadPhotosMinTip') }}</p>
            </div>
            <!-- 上传区域 -->
            <div 
              class="relative border-2 border-dashed border-[var(--grayish-green)] rounded-4 shadow-sm flex flex-col items-center justify-center py-12 cursor-pointer hover:border-[var(--grayish-green)] hover:bg-[rgba(234,232,208,0.25)] transition group"
              @dragover.prevent
              @drop.prevent="handleDrop"
              @click="fileInputRef?.click()"
            >
              <span class="block text-[var(--grayish-green)] text-8 mb-4 opacity-60">+</span>
              <span class="text-5 text-gray-600 group-hover:text-[var(--grayish-green)] transition">{{ $t('surrogate.application.form.uploadPhotosTip') }}</span>
              <input ref="fileInputRef" type="file" multiple accept="image/*" class="hidden" @change="onPhotoChange" />
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
    :title="modalConfig.titleKey ? $t(modalConfig.titleKey) : ''"
    :message="modalConfig.messageKey ? $t(modalConfig.messageKey, modalConfig.fieldLabel ? { field: modalConfig.fieldLabel ? $t(modalConfig.fieldLabel) : '' } : {}) : (modalConfig.message || '')"
    :button-text="modalConfig.buttonText"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, computed, watch, ref, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { getAllCountries, getStatesByCountry, getPhoneCodeByCountry } from '~/data/countries-states'
import { citizenshipStatus } from '~/data/us-states'
import { useApi } from '~/composables/useApi'
import type { SurrogateMotherApplicationData } from '~/types/api'
import AppHeader from '@/components/base/AppHeader.vue'
import AppFooter from '@/components/base/AppFooter.vue'
import MessageModal from '@/components/base/MessageModal.vue'
import FormCheckbox from '@/components/form/FormCheckbox.vue'
import FormDatePicker from '@/components/form/FormDatePicker.vue'
import FormInput from '@/components/form/FormInput.vue'
import FormPhoneInput from '@/components/form/FormPhoneInput.vue'

// 先声明 form
const form = reactive({
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
  height: '',
  weight: '',
  city: '',
  country: 'US',
  hasHighSchoolDiploma: '',
  maritalStatus: '',
  partnerSupport: '',
  householdIncome: '',
  smsConsent: false,
  finalConsent: false,
  uploadPhotos: [] as string[],
  bmi: '',
  ethnicity: '',
  surrogacyExperienceCount: '',
  educationLevel: '',
  legalHealthQuestions: {
    domesticViolence: '',
    substanceAbuse: '',
    felonyCharges: '',
    outstandingWarrant: '',
    formalProbation: '',
    arrests: '',
    childAbuseNeglect: '',
    childProtectionInvestigation: '',
    backgroundCheckStatus: ''
  },
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
  pregnancyHistory: {
    birthDetails: '',
    hasGivenBirth: '',
    hasStillbirth: '',
    isBreastfeeding: '',
    isPregnant: '',
    seriousComplications: '',
    birthControl: '',
    closestHospital: '',
    closestNICU: ''
  },
  gestationalInterview: {
    supportPerson: '',
    languages: '',
    motivation: '',
    aboutYou: '',
    contactPreference: '',
    hipaaConsent: '',
    twinsAttitude: '',
    tripletsReduction: '',
    terminationConsent: ''
  },
  pregnancyHistoryList: [] as Array<{ date: string; weight: string; weeks: string; babies: string; delivery: string }>
})

// 控制每个怀孕历史项的折叠状态，默认全部展开
const pregnancyHistoryCollapse = ref<boolean[]>([])

// 初始化折叠状态（与列表长度同步）
watch(() => form.pregnancyHistoryList.length, (len) => {
  pregnancyHistoryCollapse.value = Array(len).fill(true)
})

// 添加怀孕历史项时，折叠状态同步新增
const addPregnancy = () => {
  form.pregnancyHistoryList.push({ date: '', weight: '', weeks: '', babies: '', delivery: '' })
  pregnancyHistoryCollapse.value.push(true)
}

// 移除怀孕历史项时，折叠状态同步移除
const removePregnancy = (idx: number) => {
  form.pregnancyHistoryList.splice(idx, 1)
  pregnancyHistoryCollapse.value.splice(idx, 1)
}
import FormRadio from '@/components/form/FormRadio.vue'
import FormSelect from '@/components/form/FormSelect.vue'

const { t } = useI18n()

const fileInputRef = ref<HTMLInputElement | null>(null)
const uploadingPhotos = ref(false)

// const form = reactive({
//   // 基本信息
//   birthDate: '',
//   citizenshipStatus: '',
//   contactSource: '',
//   contactSourceOther: '',
//   email: '',
//   firstName: '',
//   lastName: '',
//   mobilePhone: '',
//   countryCode: '+1',
//   occupation: '',
//   state: '',
//   zipCode: '',
//   height: '',
//   weight: '',
//   city: '',
//   country: 'US',
//   hasHighSchoolDiploma: '',
//   maritalStatus: '',
//   partnerSupport: '',
//   // isFormerSurrogate: '',
//   // surrogateExperience: '',
//   householdIncome: '',
//   smsConsent: false,
//   finalConsent: false,
//   uploadPhotos: [] as string[],

//   bmi: '',
//   ethnicity: '',
//   surrogacyExperienceCount: '',
//   educationLevel: '',
//   // 财务和法律信息
//   // financialLegal: {
//   //   criminalDescription: '',
//   //   hasCPSHistory: '',
//   //   hasCriminalRecord: '',
//   //   hasLegalProceedings: '',
//   //   proceedingDetails: ''
//   // },
//   // governmentAssistance: {
//   //   foodStamps: false,
//   //   medicaid: false,
//   //   cashAssistance: false,
//   //   financialAid: false,
//   //   wic: false,
//   //   ssi: false,
//   //   publicHousing: false,
//   //   childcare: false,
//   //   studentLoans: false,
//   //   other: false,
//   //   otherText: '',
//   //   none: false
//   // },
//   legalHealthQuestions: {
//     domesticViolence: '',
//     substanceAbuse: '',
//     felonyCharges: '',
//     outstandingWarrant: '',
//     formalProbation: '',
//     arrests: '',
//     childAbuseNeglect: '',
//     childProtectionInvestigation: '',
//     backgroundCheckStatus: ''
//   },
//   healthHistory: {
//     isTakingMeds: '',
//     medicalConditions: {
//       diabetes: false,
//       hypertension: false,
//       bipolarDisorder: false,
//       multipleMiscarriages: false,
//       seizureDisorder: false,
//       none: false
//     },
//     medicationsList: ''
//   },
//   pregnancyHistory: {
//     birthDetails: '',
//     hasGivenBirth: '',
//     hasStillbirth: '',
//     // height: '',
//     isBreastfeeding: '',
//     isPregnant: '',
//     // weightPounds: '',
//     seriousComplications: '',
//     birthControl: '',
//     closestHospital: '',
//     closestNICU: ''
//   },
// gestationalInterview: {
//   supportPerson: '',
//   languages: '',
//   motivation: '',
//   aboutYou: '',
//   contactPreference: '',
//   hipaaConsent: '',
//   twinsAttitude: '',
//   tripletsReduction: '',
//   terminationConsent: ''
// },
//   // pregnancyHistoryList: [
//   //   { date: '', weight: '', weeks: '', babies: '', delivery: '' }
//   // ]
//   // pregnancyHistoryList: []
//   pregnancyHistoryList: [] as Array<{ date: string; weight: string; weeks: string; babies: string; delivery: string }>
// })

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
  titleKey: '',
  messageKey: '',
  buttonText: 'OK',
  message: '' as string | string[], // 兼容后端返回
  fieldLabel: '', // 用于 required 校验字段名参数
})

// 新图片上传逻辑：异步上传图片，获取 URL
async function uploadImages(files: File[]): Promise<string[]> {
  const formData = new FormData()
  files.forEach((file) => {
    formData.append('file', file)
  })
  try {
    const res = await fetch('https://yunda-admin-system.yundasurrogacy.com/api/upload/form', {
      method: 'POST',
      body: formData,
    })
    const result = await res.json()
    // 支持单文件和多文件返回
    if (result.success && result.data) {
      if (Array.isArray(result.data)) {
        // 多文件
        return result.data.map((item: any) => item.url).filter(Boolean)
      }
      else if (result.data.url) {
        // 单文件
        return [result.data.url]
      }
    }
    throw new Error(result.message || '图片上传失败')
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
async function handleSubmit() {
  // 校验上传照片数量（必须是 URL）
  if (!form.uploadPhotos || form.uploadPhotos.length < 2) {
    modalConfig.type = 'error'
    modalConfig.titleKey = 'modal.error.uploadPhotosMin.title'
    modalConfig.messageKey = 'modal.error.uploadPhotosMin.message'
    modalConfig.buttonText = t('modal.error.ok')
    showModal.value = true
    return
  }
  // 校验是否有未完成的图片上传
  if (uploadingPhotos.value) {
    modalConfig.type = 'error'
    modalConfig.titleKey = 'modal.error.uploadPhotosUploading.title'
    modalConfig.messageKey = 'modal.error.uploadPhotosUploading.message'
    modalConfig.buttonText = t('modal.error.ok')
    showModal.value = true
    return
  }
  // “如何得知”选择其它时，必须填写其它内容
  if (form.contactSource === 'OTHER' && !form.contactSourceOther?.trim()) {
    modalConfig.type = 'error'
    modalConfig.titleKey = 'modal.error.contactSourceOther.title'
    modalConfig.messageKey = 'modal.error.contactSourceOther.message'
    modalConfig.buttonText = t('modal.error.ok')
    showModal.value = true
    return
  }
  // 所有选择题必选校验（国际化）
  const requiredChoices = [
    { value: form.contactSource, label: 'surrogate.application.form.howDidYouHear' },
    { value: form.maritalStatus, label: 'surrogate.application.form.maritalStatus.question' },
    { value: form.partnerSupport, label: 'surrogate.application.form.partnerSupport.question' },
    { value: form.hasHighSchoolDiploma, label: 'surrogate.application.form.education.highSchool' },
    { value: form.householdIncome, label: 'surrogate.application.form.income.question' },
    { value: form.pregnancyHistory.hasGivenBirth, label: 'surrogate.application.form.pregnancy.givenBirth.question' },
    { value: form.pregnancyHistory.isPregnant, label: 'surrogate.application.form.pregnancy.currentlyPregnant' },
    { value: form.pregnancyHistory.isBreastfeeding, label: 'surrogate.application.form.pregnancy.breastfeeding' },
    { value: form.pregnancyHistory.hasStillbirth, label: 'surrogate.application.form.pregnancy.stillbirth' },
    { value: form.healthHistory.isTakingMeds, label: 'surrogate.application.form.health.medications.question' },
    { value: form.pregnancyHistory.seriousComplications, label: 'surrogate.application.form.pregnancyHistory.seriousComplications' },
    { value: form.legalHealthQuestions.domesticViolence, label: 'surrogate.application.form.legalHealthQuestions.domesticViolence' },
    { value: form.legalHealthQuestions.substanceAbuse, label: 'surrogate.application.form.legalHealthQuestions.substanceAbuse' },
    { value: form.legalHealthQuestions.felonyCharges, label: 'surrogate.application.form.legalHealthQuestions.felonyCharges' },
    { value: form.legalHealthQuestions.outstandingWarrant, label: 'surrogate.application.form.legalHealthQuestions.outstandingWarrant' },
    { value: form.legalHealthQuestions.formalProbation, label: 'surrogate.application.form.legalHealthQuestions.formalProbation' },
    { value: form.legalHealthQuestions.arrests, label: 'surrogate.application.form.legalHealthQuestions.arrests' },
    { value: form.legalHealthQuestions.childAbuseNeglect, label: 'surrogate.application.form.legalHealthQuestions.childAbuseNeglect' },
    { value: form.legalHealthQuestions.childProtectionInvestigation, label: 'surrogate.application.form.legalHealthQuestions.childProtectionInvestigation' },
    { value: form.legalHealthQuestions.backgroundCheckStatus, label: 'surrogate.application.form.legalHealthQuestions.backgroundCheckStatus' },
  ]
  for (const item of requiredChoices) {
    if (!item.value) {
      modalConfig.type = 'error'
      modalConfig.titleKey = 'modal.error.required.title'
      modalConfig.messageKey = 'modal.error.required.message'
      modalConfig.buttonText = t('modal.error.ok')
      modalConfig.fieldLabel = item.label // 传递字段名用于 $t 参数
      showModal.value = true
      return
    }
  }
  // 校验短信同意
  if (!form.smsConsent) {
    modalConfig.type = 'error'
    modalConfig.titleKey = 'modal.error.smsConsent.title'
    modalConfig.messageKey = 'modal.error.smsConsent.message'
    modalConfig.buttonText = t('modal.error.ok')
    showModal.value = true
    return
  }
  // 校验最终同意
  if (!form.finalConsent) {
    modalConfig.type = 'error'
    modalConfig.titleKey = 'modal.error.consentRequired.title'
    modalConfig.messageKey = 'modal.error.consentRequired.message'
    modalConfig.buttonText = t('modal.error.ok')
    showModal.value = true
    return
  }

  try {
    // 转换布尔值
    const booleanFields = {
      'hasHighSchoolDiploma': form.hasHighSchoolDiploma === 'yes',
      'pregnancyHistory.hasGivenBirth': form.pregnancyHistory.hasGivenBirth === 'yes',
      'pregnancyHistory.hasStillbirth': form.pregnancyHistory.hasStillbirth === 'yes',
      'pregnancyHistory.isBreastfeeding': form.pregnancyHistory.isBreastfeeding === 'yes',
      'pregnancyHistory.isPregnant': form.pregnancyHistory.isPregnant === 'yes',
      'healthHistory.isTakingMeds': form.healthHistory.isTakingMeds === 'yes',
    }

    // 转换医疗状况数据
    const medicalConditions: string[] = []
    const conditionsMap: Record<string, string> = {
      diabetes: 'DIABETES',
      hypertension: 'HYPERTENSION',
      bipolarDisorder: 'BIPOLAR_DISORDER',
      multipleMiscarriages: 'MULTIPLE_MISCARRIAGES',
      seizureDisorder: 'SEIZURE_DISORDER',
    }

    Object.entries(form.healthHistory.medicalConditions).forEach(([key, value]) => {
      if (value && key !== 'none' && conditionsMap[key]) {
        medicalConditions.push(conditionsMap[key])
      }
    })

    // 构建API请求数据（修正为 SurrogateMotherApplicationData 类型）
    const requestData: SurrogateMotherApplicationData = {
      contact_information: {
        first_name: form.firstName,
        last_name: form.lastName,
        date_of_birth: form.birthDate,
        cell_phone_country_code: form.countryCode,
        cell_phone: form.mobilePhone,
        is_agree_cell_phone_receive_messages: form.smsConsent,
        email_address: form.email,
        city: form.city,
        country: form.country,
        country_selected_key: form.country, // 如有多语言映射请替换
        state_or_province: form.state,
        state_or_province_selected_key: form.state, // 如有多语言映射请替换
        zip_code: form.zipCode,
        height: form.height,
        weight: form.weight,
        bmi: Number.parseFloat(form.bmi) || 0,
        ethnicity: form.ethnicity,
        ethnicity_selected_key: form.ethnicity as any, // 如有枚举请替换
        surrogacy_experience_count: Number.parseInt(form.surrogacyExperienceCount) || 0,
        us_citizen_or_visa_status: form.citizenshipStatus,
        us_citizen_or_visa_status_selected_key: form.citizenshipStatus as any, // 如有枚举请替换
      },
      about_you: {
        contact_source: form.contactSource,
        contact_source_selected_key: form.contactSource as any,
        occupation: form.occupation,
        education_level: form.educationLevel,
        education_level_selected_key: form.educationLevel as any,
        is_former_surrogate: false, // 如有字段请补充
        surrogate_experience: '', // 如有字段请补充
        marital_status: form.maritalStatus,
        marital_status_selected_key: form.maritalStatus as any,
        partner_support: form.partnerSupport,
        partner_support_selected_key: form.partnerSupport as any,
        has_high_school_diploma: booleanFields.hasHighSchoolDiploma,
        household_income: form.householdIncome,
        household_income_selected_key: form.householdIncome as any,
      },
      pregnancy_and_health: {
        has_given_birth: booleanFields['pregnancyHistory.hasGivenBirth'],
        birth_details: form.pregnancyHistory.birthDetails || '',
        is_currently_pregnant: booleanFields['pregnancyHistory.isPregnant'],
        is_breastfeeding: booleanFields['pregnancyHistory.isBreastfeeding'],
        has_stillbirth: booleanFields['pregnancyHistory.hasStillbirth'],
        medical_conditions: medicalConditions,
        medical_conditions_selected_keys: medicalConditions as any,
        is_taking_medications: booleanFields['healthHistory.isTakingMeds'],
        medications_list: form.healthHistory.medicationsList || '',
        domestic_violence: form.legalHealthQuestions.domesticViolence === 'yes',
        substance_abuse: form.legalHealthQuestions.substanceAbuse === 'yes',
        felony_charges: form.legalHealthQuestions.felonyCharges === 'yes',
        outstanding_warrant: form.legalHealthQuestions.outstandingWarrant === 'yes',
        formal_probation: form.legalHealthQuestions.formalProbation === 'yes',
        arrests: form.legalHealthQuestions.arrests === 'yes',
        child_abuse_neglect: form.legalHealthQuestions.childAbuseNeglect === 'yes',
        child_protection_investigation: form.legalHealthQuestions.childProtectionInvestigation === 'yes',
        background_check_status: form.legalHealthQuestions.backgroundCheckStatus,
        background_check_status_selected_key: form.legalHealthQuestions.backgroundCheckStatus as any,
        pregnancy_histories: form.pregnancyHistoryList.map((preg: any) => ({
          delivery_date: preg.date,
          birth_weight: preg.weight,
          gestational_weeks: preg.weeks,
          number_of_babies: preg.babies,
          delivery_method: preg.delivery,
        })),
        serious_pregnancy_complications: form.pregnancyHistory.seriousComplications === 'yes',
        current_birth_control: form.pregnancyHistory.birthControl,
        closest_hospital: form.pregnancyHistory.closestHospital,
        closest_nicu_iii: form.pregnancyHistory.closestNICU,
      },
      gestational_surrogacy_interview: {
        emotional_support: form.gestationalInterview.supportPerson,
        languages_spoken: form.gestationalInterview.languages,
        motivation: form.gestationalInterview.motivation,
        self_introduction: form.gestationalInterview.aboutYou,
        contact_preference: form.gestationalInterview.contactPreference,
        hipaa_release_willing: form.gestationalInterview.hipaaConsent === 'yes',
        twins_feeling: form.gestationalInterview.twinsAttitude,
        multiple_reduction_willing: form.gestationalInterview.tripletsReduction === 'yes',
        termination_willing: form.gestationalInterview.terminationConsent === 'yes',
      },
      upload_photos: form.uploadPhotos.map(url => ({ name: '', url })),
    }

    // 按后端要求封装请求体
    const payload = {
      application_type: 'surrogate_mother',
      application_data: requestData,
    }
    console.log('Submitting data:', payload)
    const response = await submitSurrogateApplication(payload)
    console.log('Application submitted successfully:', response)
    console.log('Application submitted successfully:', response.code)
    // Show success modal
    modalConfig.type = 'success'
    modalConfig.titleKey = 'modal.success.surrogate.title'
    modalConfig.messageKey = 'modal.success.surrogate.message'
    modalConfig.buttonText = t('modal.error.ok')
    showModal.value = true

    // Reset form after successful submission
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 500)
  }
  catch (error: any) {
    console.error('Submission error:', error)

    // Handle error response
    modalConfig.type = 'error'
    modalConfig.titleKey = 'modal.error.title'
    // 错误信息如果是数组或字符串，仍然直接赋值 message（兼容后端返回）
    if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
      const errorMessages = error.response.data.errors.map((err: any) =>
        err.field ? `${err.field}: ${err.message}` : err.message,
      )
      modalConfig.message = errorMessages
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
}
</script>

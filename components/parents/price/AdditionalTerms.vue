<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b px-4 py-16">
    <div class="mx-4 max-w-300 text-3.5 md:mx-auto lg:text-5">
      <!-- Title -->
      <h2 class="scroll-animate mb-8 text-center text-7.5 font-semibold lg:text-10" >
        {{ $t('parentsPrice.additionalTerms.title') }}
      </h2>

      <!-- Description -->
      <div class="scroll-animate scroll-animate-delay-100 mb-12 text-left leading-relaxed">
        {{ $t('parentsPrice.additionalTerms.description') }}
      </div>

      <!-- Surrogate Benefits Section -->
      <div class="scroll-animate scroll-animate-delay-200 mb-12">
        <h3 class="border-b-2 pb-4 text-left lg:text-6">
          {{ $t('parentsPrice.additionalTerms.surrogateBenefits.title') }}
        </h3>

        <div class="space-y-1">
          <div class="flex items-start justify-between border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.bedrest') }}</span>
          </div>

          <div class="flex items-start justify-between border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.twinPregnancy') }}</span>
            <span class="ml-4 text-right">$15,000</span>
          </div>

          <div class="flex items-start justify-between border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.csection') }}</span>
            <span class="ml-4 text-right">$5,000</span>
          </div>

          <div class="flex items-start justify-between border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.communicableDisease') }}</span>
            <span class="ml-4 text-right">$10,000</span>
          </div>

          <div class="flex items-start justify-between border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.childcare') }}</span>
            <span class="ml-4 text-right">$75</span>
          </div>

          <div class="flex items-start justify-between border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.housekeeping') }}</span>
            <span class="ml-4 text-right">$250</span>
          </div>

          <div class="flex items-start justify-between border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.lostWages') }}</span>
          </div>

          <div class="flex items-start justify-between border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.breastMilk') }}</span>
            <span class="ml-4 text-right">$250</span>
          </div>

          <div class="flex items-start justify-between border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.uterineLoss') }}</span>
            <span class="ml-4 text-right">$2,500/$5,000</span>
          </div>
        </div>
      </div>

      <!-- Not Included Section -->
      <div class="scroll-animate scroll-animate-delay-200 mb-12 mt-16">
        <h3 class="border-b-2 pb-4 text-left lg:text-6">
          {{ $t('parentsPrice.additionalTerms.notIncluded.title') }}
        </h3>

        <div class="space-y-2">
          <p class="border-b-2 py-2 text-left">
            {{ $t('parentsPrice.additionalTerms.notIncluded.ivfCosts') }}
          </p>
          <p class="border-b-2 py-2 text-left">
            {{ $t('parentsPrice.additionalTerms.notIncluded.newbornExpenses') }}
          </p>
          <p class="border-b-2 py-2 text-left">
            {{ $t('parentsPrice.additionalTerms.notIncluded.clientTravel') }}
          </p>
        </div>
      </div>

      <!-- Insurance Notes Section -->
      <div class="scroll-animate scroll-animate-delay-300">
        <h3 class="border-b-2 pb-4 text-left lg:text-6">
          {{ $t('parentsPrice.additionalTerms.insuranceNotes.title') }}
        </h3>

        <div class="ml-2 py-4 text-left lg:ml-4 space-y-2 lg:text-5">
          <li>{{ $t('parentsPrice.additionalTerms.insuranceNotes.description1') }}</li>
          <li>{{ $t('parentsPrice.additionalTerms.insuranceNotes.description2') }}</li>
          <li>{{ $t('parentsPrice.additionalTerms.insuranceNotes.description3') }}</li>
          <li>{{ $t('parentsPrice.additionalTerms.insuranceNotes.description4') }}</li>
        </div>
      </div>
    </div>
  </section>
</template>

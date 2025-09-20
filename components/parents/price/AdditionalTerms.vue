<template>
  <section class="w-full bg-gradient-to-b from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] py-16 px-4">
    <div class="max-w-300 mx-4 md:mx-auto text-3.5 lg:text-5">
      <!-- Title -->
      <h2 class="text-7.5 lg:text-10 font-semibold mb-8 text-center  scroll-animate" style="font-family: var(--font-primary)">
        {{ $t('parentsPrice.additionalTerms.title') }}
      </h2>

      <!-- Description -->
      <div class="mb-12 leading-relaxed text-left scroll-animate scroll-animate-delay-100">
        {{ $t('parentsPrice.additionalTerms.description') }}
      </div>

      <!-- Surrogate Benefits Section -->
      <div class="mb-12 scroll-animate scroll-animate-delay-200">
        <h3 class="border-b-2 pb-4 text-left lg:text-6">
          {{ $t('parentsPrice.additionalTerms.surrogateBenefits.title') }}
        </h3>
        
        <div class="space-y-1">
          <div class="flex justify-between items-start border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.bedrest') }}</span>
          </div>
          
          <div class="flex justify-between items-start border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.twinPregnancy') }}</span>
            <span class="text-right ml-4">$15,000</span>
          </div>
          
          <div class="flex justify-between items-start border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.csection') }}</span>
            <span class="text-right ml-4">$5,000</span>
          </div>
          
          <div class="flex justify-between items-start border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.communicableDisease') }}</span>
            <span class="text-right ml-4">$10,000</span>
          </div>
          
          <div class="flex justify-between items-start border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.childcare') }}</span>
            <span class="text-right ml-4">$75</span>
          </div>
          
          <div class="flex justify-between items-start border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.housekeeping') }}</span>
            <span class="text-right ml-4">$250</span>
          </div>
          
          <div class="flex justify-between items-start border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.lostWages') }}</span>
          </div>
          
          <div class="flex justify-between items-start border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.breastMilk') }}</span>
            <span class="text-right ml-4">$250</span>
          </div>
          
          <div class="flex justify-between items-start border-b-2 py-2">
            <span>{{ $t('parentsPrice.additionalTerms.surrogateBenefits.uterineLoss') }}</span>
            <span class="text-right ml-4">$2,500/$5,000</span>
          </div>
        </div>
      </div>

      <!-- Not Included Section -->
      <div class="mb-12 mt-16 scroll-animate scroll-animate-delay-200">
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
        <h3 class="border-b-2 pb-4 lg:text-6 text-left">
          {{ $t('parentsPrice.additionalTerms.insuranceNotes.title') }}
        </h3>
        
        <div class="space-y-2 text-left lg:text-5 ml-2 lg:ml-4 py-4">
          <li>{{ $t('parentsPrice.additionalTerms.insuranceNotes.description1') }}</li>
          <li>{{ $t('parentsPrice.additionalTerms.insuranceNotes.description2') }}</li>
          <li>{{ $t('parentsPrice.additionalTerms.insuranceNotes.description3') }}</li>
          <li>{{ $t('parentsPrice.additionalTerms.insuranceNotes.description4') }}</li>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
</script>


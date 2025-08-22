<template>
  <section class="w-full bg-gradient-to-b from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] py-8 lg:py-12 px-4 lg:px-20">
    <div class="max-w-300 mx-auto scroll-animate">
      <h2 class="text-7.5 lg:text-10 font-semibold mb-6 lg:mb-8 text-center lg:text-left" style="font-family: var(--font-primary)">
        {{ $t('surrogacyReferral.earningsSection.title') }}
      </h2>
      
      <!-- Desktop Table -->
      <div class="hidden md:block">
        <div class="grid grid-cols-2 text-4.5">
          <div class="border-b-2 py-4 ">{{ $t('surrogacyReferral.earningsSection.tableHeaders.milestone') }}</div>
          <div class="border-b-2 py-4 ">{{ $t('surrogacyReferral.earningsSection.tableHeaders.bonus') }}</div>
          
          <div class="border-b-2 py-4 ">{{ $t('surrogacyReferral.earningsSection.milestones.accepted') }}</div>
          <div class="border-b-2 py-4 ">{{ $t('surrogacyReferral.earningsSection.bonuses.accepted') }}</div>
          
          <div class="border-b-2 py-4 ">{{ $t('surrogacyReferral.earningsSection.milestones.screening') }}</div>
          <div class="border-b-2 py-4 ">{{ $t('surrogacyReferral.earningsSection.bonuses.screening') }}</div>
          
          <div class="border-b-2 py-4 ">{{ $t('surrogacyReferral.earningsSection.milestones.matching') }}</div>
          <div class="border-b-2 py-4 ">{{ $t('surrogacyReferral.earningsSection.bonuses.matching') }}</div>
          
          <div class="border-b-2 py-4 ">{{ $t('surrogacyReferral.earningsSection.milestones.transfer') }}</div>
          <div class="border-b-2 py-4 ">{{ $t('surrogacyReferral.earningsSection.bonuses.transfer') }}</div>
          
          <div class="border-b-2 py-4">{{ $t('surrogacyReferral.earningsSection.milestones.pregnancy') }}</div>
          <div class="border-b-2 py-4">{{ $t('surrogacyReferral.earningsSection.bonuses.pregnancy') }}</div>
        </div>
      </div>
      
      <!-- Mobile Table -->
      <div class="block md:hidden">
        <div class="text-center text-4 border-b-2 py-2">
          {{ $t('surrogacyReferral.earningsSection.tableHeaders.milestone') }} / {{ $t('surrogacyReferral.earningsSection.tableHeaders.bonus') }}
        </div>
        
        <div class="space-y-2 text-3.5">
          <div class="text-center border-b-2 py-2">
            <p class="py-2">{{ $t('surrogacyReferral.earningsSection.milestones.accepted') }}</p>
            <p >{{ $t('surrogacyReferral.earningsSection.bonuses.accepted') }}</p>
          </div>
          
          <div class="text-center border-b-2 py-2">
            <p class="">{{ $t('surrogacyReferral.earningsSection.milestones.screening') }}</p>
            <p >{{ $t('surrogacyReferral.earningsSection.bonuses.screening') }}</p>
          </div>
          
          <div class="text-center border-b-2 py-2">
            <p class="py-2">{{ $t('surrogacyReferral.earningsSection.milestones.matching') }}</p>
            <p >{{ $t('surrogacyReferral.earningsSection.bonuses.matching') }}</p>
          </div>
          
          <div class="text-center border-b-2 py-2">
            <p class="py-2">{{ $t('surrogacyReferral.earningsSection.milestones.transfer') }}</p>
            <p >{{ $t('surrogacyReferral.earningsSection.bonuses.transfer') }}</p>
          </div>
          
          <div class="text-center border-b-2 py-2">
            <p class="py-2">{{ $t('surrogacyReferral.earningsSection.milestones.pregnancy') }}</p>
            <p >{{ $t('surrogacyReferral.earningsSection.bonuses.pregnancy') }}</p>
          </div>
        </div>
      </div>
      
      <!-- Total Reward Section -->
      <div class="mt-16 lg:mt-20">
        <h3 class="text-7.5 lg:text-10 font-semibold mb-6 lg:mb-8 text-center lg:text-left" style="font-family: var(--font-primary)">
          {{ $t('surrogacyReferral.earningsSection.totalTitle') }}
        </h3>
        <div class="ml-6">
          <li>{{ $t('surrogacyReferral.earningsSection.terms1') }}</li>
          <li>{{ $t('surrogacyReferral.earningsSection.terms2') }}</li>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
</script>

<style scoped>
</style>
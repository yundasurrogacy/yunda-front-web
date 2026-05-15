<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b px-4 py-8 lg:px-20 lg:py-12">
    <div class="scroll-animate mx-auto max-w-300">
      <h2 class="mb-6 text-center font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:mb-8 lg:text-left lg:text-[36px]">
        {{ $t('surrogacyReferral.earningsSection.title') }}
      </h2>

      <!-- Desktop Table -->
      <div class="hidden md:block">
        <div class="grid grid-cols-2 text-4.5">
          <div class="border-b-2 py-4">
            {{ $t('surrogacyReferral.earningsSection.tableHeaders.milestone') }}
          </div>
          <div class="border-b-2 py-4">
            {{ $t('surrogacyReferral.earningsSection.tableHeaders.bonus') }}
          </div>

          <div class="border-b-2 py-4">
            {{ $t('surrogacyReferral.earningsSection.milestones.accepted') }}
          </div>
          <div class="border-b-2 py-4">
            {{ $t('surrogacyReferral.earningsSection.bonuses.accepted') }}
          </div>

          <div class="border-b-2 py-4">
            {{ $t('surrogacyReferral.earningsSection.milestones.screening') }}
          </div>
          <div class="border-b-2 py-4">
            {{ $t('surrogacyReferral.earningsSection.bonuses.screening') }}
          </div>

          <div class="border-b-2 py-4">
            {{ $t('surrogacyReferral.earningsSection.milestones.matching') }}
          </div>
          <div class="border-b-2 py-4">
            {{ $t('surrogacyReferral.earningsSection.bonuses.matching') }}
          </div>

          <div class="border-b-2 py-4">
            {{ $t('surrogacyReferral.earningsSection.milestones.transfer') }}
          </div>
          <div class="border-b-2 py-4">
            {{ $t('surrogacyReferral.earningsSection.bonuses.transfer') }}
          </div>

          <div class="border-b-2 py-4">
            {{ $t('surrogacyReferral.earningsSection.milestones.pregnancy') }}
          </div>
          <div class="border-b-2 py-4">
            {{ $t('surrogacyReferral.earningsSection.bonuses.pregnancy') }}
          </div>
        </div>
      </div>

      <!-- Mobile Table -->
      <div class="block md:hidden">
        <div class="border-b-2 py-2 text-center text-4">
          {{ $t('surrogacyReferral.earningsSection.tableHeaders.milestone') }} / {{ $t('surrogacyReferral.earningsSection.tableHeaders.bonus') }}
        </div>

        <div class="text-3.5 space-y-2">
          <div class="border-b-2 py-2 text-center">
            <p class="py-2">
              {{ $t('surrogacyReferral.earningsSection.milestones.accepted') }}
            </p>
            <p>{{ $t('surrogacyReferral.earningsSection.bonuses.accepted') }}</p>
          </div>

          <div class="border-b-2 py-2 text-center">
            <p class="">
              {{ $t('surrogacyReferral.earningsSection.milestones.screening') }}
            </p>
            <p>{{ $t('surrogacyReferral.earningsSection.bonuses.screening') }}</p>
          </div>

          <div class="border-b-2 py-2 text-center">
            <p class="py-2">
              {{ $t('surrogacyReferral.earningsSection.milestones.matching') }}
            </p>
            <p>{{ $t('surrogacyReferral.earningsSection.bonuses.matching') }}</p>
          </div>

          <div class="border-b-2 py-2 text-center">
            <p class="py-2">
              {{ $t('surrogacyReferral.earningsSection.milestones.transfer') }}
            </p>
            <p>{{ $t('surrogacyReferral.earningsSection.bonuses.transfer') }}</p>
          </div>

          <div class="border-b-2 py-2 text-center">
            <p class="py-2">
              {{ $t('surrogacyReferral.earningsSection.milestones.pregnancy') }}
            </p>
            <p>{{ $t('surrogacyReferral.earningsSection.bonuses.pregnancy') }}</p>
          </div>
        </div>
      </div>

      <!-- Total Reward Section -->
      <div class="mt-16 lg:mt-20">
        <h3 class="mb-6 text-center font-sans text-[20px] text-[var(--yunda-bark)] font-bold lg:mb-8 lg:text-left lg:text-[24px]" style="font-family: var(--font-text)">
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

<style scoped>
</style>

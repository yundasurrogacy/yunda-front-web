<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

const includesItems = [
  'application',
  'consultation',
  'psychological',
  'background',
  'medical',
  'clinic',
  'partner',
  'insurance',
]

const candidateItems = [
  'age',
  'bmi',
  'smoking',
  'drugFree',
  'pregnancy',
  'medical',
  'lifestyle',
  'support',
  'criminal',
  'financial',
]
</script>

<template>
  <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-harvest)]/20 to-[var(--yunda-petal)] bg-gradient-to-b px-4 py-16 lg:px-20 lg:py-20">
    <div class="mx-auto max-w-1280px">
      <!-- Screening Includes Section -->
      <div class="scroll-animate mb-12 lg:mb-16">
        <h2 class="mb-6 text-7.5 font-semibold lg:mb-8 lg:text-10" >
          {{ $t('surrogacyScreening.processSection.includesTitle') }}
        </h2>
        <div class="mb-8 space-y-2">
          <li v-for="(item, index) in includesItems" :key="index" class="ml-8">
            {{ $t(`surrogacyScreening.processSection.includesList.item${index + 1}`) }}
          </li>
        </div>
        <p>
          {{ $t('surrogacyScreening.processSection.includesNote') }}
        </p>
      </div>

      <!-- What Makes a Strong Candidate Section -->
      <div class="scroll-animate scroll-animate-delay-200">
        <h2 class="mb-6 text-7.5 font-semibold lg:mb-8 lg:text-10" >
          {{ $t('surrogacyScreening.processSection.candidateTitle') }}
        </h2>
        <p class="mb-6">
          {{ $t('surrogacyScreening.processSection.candidateIntro') }}
        </p>
        <div class="space-y-2">
          <li v-for="(item, index) in candidateItems" :key="index" class="ml-8">
            {{ $t(`surrogacyScreening.processSection.candidateList.item${index + 1}`) }}
          </li>
        </div>
      </div>
    </div>
  </section>
</template>

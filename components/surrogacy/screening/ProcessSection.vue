<template>
  <section class="w-full py-16 lg:py-20 px-4 lg:px-20 bg-gradient-to-b from-[#FAF7F2] via-[#FBF0DA] to-[#FAF7F2]">
    <div class="max-w-1280px mx-auto">
      <!-- Screening Includes Section -->
      <div class="mb-12 lg:mb-16 scroll-animate">
        <h2 class="text-7.5 lg:text-10 font-semibold mb-6 lg:mb-8" style="font-family: var(--font-primary)">
          {{ $t('surrogacyScreening.processSection.includesTitle') }}
        </h2>
        <div class="space-y-2 mb-8">
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
        <h2 class="text-7.5 lg:text-10 font-semibold mb-6 lg:mb-8" style="font-family: var(--font-primary)">
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

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();

const includesItems = [
  'application',
  'consultation',
  'psychological',
  'background',
  'medical',
  'clinic',
  'partner',
  'insurance'
];

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
  'financial'
];
</script>
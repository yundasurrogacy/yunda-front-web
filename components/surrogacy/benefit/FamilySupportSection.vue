<template>
  <section class="w-full py-16 lg:py-20 px-4 lg:px-20 bg-gradient-to-b from-[#FAF7F2] via-[#FBF0DA] to-[#FAF7F2]">
    <div class="max-w-300 mx-auto scroll-animate">
      <!-- Title -->
      <h2 class="text-7.5 lg:text-10 font-semibold mb-6 lg:mb-8" style="font-family: var(--font-primary)">
        {{ $t('surrogacyBenefit.familySupportSection.title') }}
      </h2>

      <!-- Introduction -->
      <p class="mb-8 lg:mb-12">
        {{ $t('surrogacyBenefit.familySupportSection.description') }}
      </p>

      <!-- Support Items -->
      <div class="space-y-2">
        <li v-for="(item, index) in supportItems" :key="index" class="ml-8">
          {{ $t(`surrogacyBenefit.familySupportSection.items.item${index + 1}`) }}
        </li>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
const supportItems = [
  'housekeeping',
  'partnerWage',
  'breastMilk',
  'coordinator'
];
</script>
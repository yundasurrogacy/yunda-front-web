<template>
  <section class="w-full py-16 lg:py-20 px-4 lg:px-20 bg-gradient-to-b from-[#FAF7F2] via-[#FBF0DA] to-[#FAF7F2]">
    <div class="max-w-300 mx-auto scroll-animate">
      <!-- Title -->
      <h2 class="text-7.5 lg:text-10 font-semibold mb-8 lg:mb-12" style="font-family: var(--font-primary)">
        {{ $t('surrogacyBenefit.protectionSection.title') }}
      </h2>

      <!-- Protection Items -->
      <div class="space-y-2">
        <li v-for="(item, index) in protectionItems" :key="index" class="ml-8">
          {{ $t(`surrogacyBenefit.protectionSection.items.item${index + 1}`) }}
        </li>
      </div>

      <!-- Conclusion Text -->
      <p class="mt-12 lg:mt-16">
        {{ $t('surrogacyBenefit.conclusionText') }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
const protectionItems = [
  'insuranceReview',
  'lifeInsurance',
  'legalRepresentation'
];
</script>
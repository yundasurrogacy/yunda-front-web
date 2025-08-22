<template>
  <section class="w-full py-16 lg:py-20 px-4 lg:px-20 bg-[#FAF7F2]">
    <div class="max-w-300 mx-auto scroll-animate">
      <!-- Title -->
      <h2 class="text-7.5 lg:text-10 font-semibold mb-8 lg:mb-12" style="font-family: var(--font-primary)">
        {{ $t('surrogacyBenefit.paymentScheduleSection.title') }}
      </h2>

      <!-- Schedule Items -->
      <div class="space-y-2">
        <li v-for="(item, index) in scheduleItems" :key="index" class="ml-8">
          {{ $t(`surrogacyBenefit.paymentScheduleSection.items.item${index + 1}`) }}
        </li>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
const scheduleItems = [
  'ivfStipends',
  'baseCompensation',
  'finalBalance',
  'otherBenefits'
];
</script>
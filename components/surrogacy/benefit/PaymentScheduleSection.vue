<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
const scheduleItems = [
  'ivfStipends',
  'baseCompensation',
  'finalBalance',
  'otherBenefits',
]
</script>

<template>
  <section class="w-full bg-[var(--yunda-petal)] px-4 py-16 lg:px-20 lg:py-20">
    <div class="scroll-animate mx-auto max-w-300">
      <!-- Title -->
      <h2 class="mb-8 text-7.5 font-medium leading-[1.15] lg:mb-12 lg:text-[36px]">
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

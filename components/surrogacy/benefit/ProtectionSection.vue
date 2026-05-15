<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
const protectionItems = [
  'insuranceReview',
  'lifeInsurance',
  'legalRepresentation',
]
</script>

<template>
  <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-harvest)]/20 to-[var(--yunda-petal)] bg-gradient-to-b px-4 py-16 lg:px-20 lg:py-20">
    <div class="scroll-animate mx-auto max-w-300">
      <!-- Title -->
      <h2 class="mb-8 text-7.5 font-medium leading-[1.15] lg:mb-12 lg:text-[36px]">
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

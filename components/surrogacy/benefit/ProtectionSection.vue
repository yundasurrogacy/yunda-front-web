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
  <section class="w-full from-[#FAF7F2] via-[#FBF0DA] to-[#FAF7F2] bg-gradient-to-b px-4 py-16 lg:px-20 lg:py-20">
    <div class="scroll-animate mx-auto max-w-300">
      <!-- Title -->
      <h2 class="mb-8 text-7.5 font-semibold lg:mb-12 lg:text-10" style="font-family: var(--font-primary)">
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

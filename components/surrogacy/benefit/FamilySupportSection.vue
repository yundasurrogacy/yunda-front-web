<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
const supportItems = [
  'housekeeping',
  'partnerWage',
  'breastMilk',
  'coordinator',
]
</script>

<template>
  <section class="w-full from-[#FAF7F2] via-[#FBF0DA] to-[#FAF7F2] bg-gradient-to-b px-4 py-16 lg:px-20 lg:py-20">
    <div class="scroll-animate mx-auto max-w-300">
      <!-- Title -->
      <h2 class="mb-6 text-7.5 font-semibold lg:mb-8 lg:text-10" style="font-family: var(--font-primary)">
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

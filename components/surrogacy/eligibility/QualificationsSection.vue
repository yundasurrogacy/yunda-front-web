<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

const qualificationItems = [
  'age',
  'birth',
  'home',
  'citizenship',
  'lifestyle',
  'background',
]

const disqualifyingItems = [
  'neverBirth',
  'complications',
  'bmi',
  'mentalHealth',
  'financial',
  'restrictedState',
]
</script>

<template>
  <section class="w-full from-[#FAF7F2] via-[#FBF0DA] to-[#FAF7F2] bg-gradient-to-b px-8 py-20 lg:px-40 lg:py-40">
    <div class="mx-auto max-w-300">
      <!-- Basic Qualifications Section -->
      <div class="scroll-animate scroll-animate-delay-100 mb-12 lg:mb-16">
        <h2 class="mb-6 text-7.5 font-semibold lg:mb-8 lg:text-10" style="font-family: var(--font-primary)">
          {{ $t('surrogacyEligibility.qualificationsSection.title') }}
        </h2>
        <p class="mb-6">
          {{ $t('surrogacyEligibility.qualificationsSection.introduction') }}
        </p>
        <div class="mb-8 space-y-2">
          <li
            v-for="(item, index) in qualificationItems" :key="index"
            class="ml-8"
          >
            {{ $t(`surrogacyEligibility.qualificationsSection.items.item${index + 1}`) }}
          </li>
        </div>
        <p>
          {{ $t('surrogacyEligibility.qualificationsSection.additionalNote') }}
        </p>
      </div>

      <!-- Common Disqualifying Factors Section -->
      <div class="scroll-animate scroll-animate-delay-200 mb-12 lg:mb-16">
        <h2 class="mb-6 text-7.5 font-semibold lg:mb-8 lg:text-10" style="font-family: var(--font-primary)">
          {{ $t('surrogacyEligibility.disqualifyingFactors.title') }}
        </h2>
        <p class="mb-6">
          {{ $t('surrogacyEligibility.disqualifyingFactors.introduction') }}
        </p>
        <div class="space-y-2">
          <li
            v-for="(item, index) in disqualifyingItems" :key="index"
            class="ml-8"
          >
            {{ $t(`surrogacyEligibility.disqualifyingFactors.items.item${index + 1}`) }}
          </li>
        </div>
      </div>

      <!-- A Gentle Note Section -->
      <div class="scroll-animate scroll-animate-delay-300">
        <h2 class="mb-6 text-7.5 font-semibold lg:mb-8 lg:text-10" style="font-family: var(--font-primary)">
          {{ $t('surrogacyEligibility.gentleNote.title') }}
        </h2>
        <p>
          {{ $t('surrogacyEligibility.gentleNote.description') }}
        </p>
      </div>
    </div>
  </section>
</template>

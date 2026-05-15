<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
const compensationItems = 13 // Number of compensation items
</script>

<template>
  <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-harvest)]/20 to-[var(--yunda-petal)] bg-gradient-to-b px-4 py-16 text-[var(--yunda-bark)] lg:px-20 lg:py-20">
    <div class="scroll-animate mx-auto max-w-300 text-base leading-[1.75] lg:text-[17px]" style="font-family: var(--font-text)">
      <h2 class="mb-8 font-display text-[30px] font-medium leading-[1.15] lg:mb-12 lg:text-[36px]">
        {{ $t('surrogacyBenefit.compensationSection.title') }}
      </h2>
      <ul class="space-y-2">
        <li v-for="(item, index) in compensationItems" :key="index" class="ml-8">
          {{ $t(`surrogacyBenefit.compensationSection.items.item${index + 1}`) }}
        </li>
      </ul>
    </div>
  </section>
</template>

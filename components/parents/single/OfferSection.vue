<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

const offerItems = [
  { id: 'inclusive' },
  { id: 'matching' },
  { id: 'legal' },
  { id: 'global' },
  { id: 'multilingual' },
  { id: 'personalized' },
]
</script>

<template>
  <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b px-4 py-16 lg:px-20 lg:py-20">
    <div class="scroll-animate mx-auto max-w-300">
      <!-- Title -->
      <h2 class="mb-12 text-center text-7.5 font-semibold lg:mb-16 lg:text-left lg:text-10" >
        {{ $t('parentsSingle.offerSection.title') }}
      </h2>

      <!-- Offer Items -->
      <div class="w-full space-y-2 lg:space-y-4">
        <div v-for="item in offerItems" :key="item.id" class="flex flex-col border-t-2 pt-4 lg:flex-row lg:items-start">
          <!-- Title -->
          <h3 class="text-center lg:min-w-90 lg:text-left">
            {{ $t(`parentsSingle.offerSection.items.${item.id}.title`) }}
          </h3>
          <!-- Description -->
          <div class="text-center lg:text-left">
            {{ $t(`parentsSingle.offerSection.items.${item.id}.description`) }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

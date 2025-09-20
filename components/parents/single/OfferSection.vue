<template>
  <section class="w-full py-16 lg:py-20 px-4 lg:px-20 bg-gradient-to-b from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)]">
    <div class="max-w-300 mx-auto scroll-animate">
      <!-- Title -->
      <h2 class="text-7.5 lg:text-10 font-semibold mb-12 lg:mb-16 text-center lg:text-left" style="font-family: var(--font-primary)">
        {{ $t('parentsSingle.offerSection.title') }}
      </h2>

      <!-- Offer Items -->
      <div class="w-full space-y-2 lg:space-y-4">
        <div v-for="item in offerItems" :key="item.id" class="flex flex-col lg:flex-row lg:items-start border-t-2 pt-4">
          <!-- Title -->
          <h3 class=" text-center lg:text-left lg:min-w-90">
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

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();

const offerItems = [
  { id: 'inclusive' },
  { id: 'matching' },
  { id: 'legal' },
  { id: 'global' },
  { id: 'multilingual' },
  { id: 'personalized' }
];
</script>
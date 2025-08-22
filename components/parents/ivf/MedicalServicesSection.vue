<template>
  <section class="w-full py-16 lg:py-20 px-4 lg:px-20 bg-gradient-to-b from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)]">
    <div class="max-w-300 mx-auto">
      <!-- Title -->
      <h2 class="text-7.5 lg:text-10 font-semibold mb-12 lg:mb-16 text-center lg:text-left" style="font-family: var(--font-primary)">
        {{ $t('parentsIvf.medicalServices.title') }}
      </h2>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-x-14 lg:gap-y-10">
        <div v-for="(service, index) in medicalServices" :key="service.id"
             :class="[
               index % 2 === 0 ? 'slide-left' : 'slide-right',
               `slide-delay-${Math.floor(index / 2) * 200}`
             ]">
          <!-- Service Title -->
          <h3 class="text-6 lg:text-8 font-medium border-t-2 pt-2 lg:pt-4 text-center lg:text-left" style="font-family: var(--font-primary)">
            {{ $t(`parentsIvf.medicalServices.items.${service.id}.title`) }}
          </h3>
          <!-- Service Description -->
          <p class="text-3.5 lg:text-5 ml-2 lg:ml-4 text-center lg:text-left">
            • {{ $t(`parentsIvf.medicalServices.items.${service.id}.description`) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useScrollAnimation } from '@/composables/useScrollAnimation';

const { initScrollAnimation } = useScrollAnimation();

onMounted(() => {
  initScrollAnimation();
});

const medicalServices = [
  { id: 'eggDonation' },
  { id: 'embryoCreation' },
  { id: 'embryoShipping' },
  { id: 'embryoTransfer' },
  { id: 'geneticTesting' },
  { id: 'embryoThawing' }
];
</script>
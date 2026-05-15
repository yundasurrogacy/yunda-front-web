<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { initScrollAnimation } = useScrollAnimation()

onMounted(() => {
  initScrollAnimation()
})

const medicalServices = [
  { id: 'eggDonation' },
  { id: 'embryoCreation' },
  { id: 'embryoShipping' },
  { id: 'embryoTransfer' },
  { id: 'geneticTesting' },
  { id: 'embryoThawing' },
]
</script>

<template>
  <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b px-4 py-16 lg:px-20 lg:py-20">
    <div class="mx-auto max-w-300">
      <!-- Title -->
      <h2 class="mb-12 text-center text-7.5 font-semibold lg:mb-16 lg:text-left lg:text-10" >
        {{ $t('parentsIvf.medicalServices.title') }}
      </h2>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-10">
        <div
          v-for="(service, index) in medicalServices" :key="service.id"
          :class="[
            index % 2 === 0 ? 'slide-left' : 'slide-right',
            `slide-delay-${Math.floor(index / 2) * 200}`,
          ]"
        >
          <!-- Service Title -->
          <h3 class="border-t-2 pt-2 text-center text-6 font-medium lg:pt-4 lg:text-left lg:text-8" >
            {{ $t(`parentsIvf.medicalServices.items.${service.id}.title`) }}
          </h3>
          <!-- Service Description -->
          <p class="ml-2 text-center text-3.5 lg:ml-4 lg:text-left lg:text-5">
            • {{ $t(`parentsIvf.medicalServices.items.${service.id}.description`) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

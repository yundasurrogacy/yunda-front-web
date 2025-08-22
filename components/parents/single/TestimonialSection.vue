<template>
  <section class="w-full py-16 lg:py-24 px-8 lg:px-0 bg-[var(--head-bg)]">
    <div class="md:flex md:items-center h-auto lg:h-112">
      <!-- Image Section -->
      <div class="mb-8 md:mb-0 md:w-1/2 slide-left">
        <img src="~/public/images/process/i-7.png" 
             alt="Happy two-dad family" 
             class="w-full object-cover" />
      </div>

      <!-- Content Section -->
      <div class="flex flex-col md:w-1/2 md:px-10 justify-between text-3.5 lg:text-5 slide-right">
        <!-- Title -->
        <h2 class="text-6 lg:text-8 mb-6 md:mb-18 text-center md:text-left font-semibold" style="font-family: var(--font-primary)">
          {{ $t('parentsSingle.testimonialSection.title') }}
        </h2>

        <!-- Testimonial Text -->
        <p class="leading-relaxed text-center md:text-left whitespace-pre-line">
          {{ $t('parentsSingle.testimonialSection.quote') }}
        </p>
        <p class="mt-6 text-center md:text-left">
          {{ $t('parentsSingle.testimonialSection.quote2') }}
        </p>
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
</script>
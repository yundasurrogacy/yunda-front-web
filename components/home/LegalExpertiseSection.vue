<template>
  <section class="py-20 md:py-25 px-4 md:px-20 bg-[var(--head-bg)]">
    <div class="max-w-300  mx-auto">
      <div class="flex flex-col lg:flex-row lg:items-center lg:space-x-25 items-center space-y-8 lg:space-y-0">
        <!-- Text Content -->
        <div class="lg:flex-1 text-center lg:text-left">
          <h2 class="text-7.5 md:text-10 font-semibold mb-6 md:mb-8 scroll-animate" style="font-family: var(--font-primary)">
            {{ $t('home.legalExpertiseSection.title') }}
          </h2>
          <p class="leading-relaxed mb-8 md:mb-12 scroll-animate scroll-animate-delay-100">
            {{ $t('home.legalExpertiseSection.description1') }}
          </p>
        </div>

        <!-- Image and Advisor -->
        <div class="flex-shrink-0 flex flex-col items-center scroll-animate scroll-animate-delay-200">
          <div class="w-75 h-75 rounded-lg overflow-hidden">
            <img src="~/public/images/home/p-1.png" alt="Legal Expert" class="w-full h-full object-cover">
          </div>
          <p class="text-[var(--dark-brown)] text-4 md:text-4.5 font-normal mt-4 text-center">
            {{ $t('home.legalExpertiseSection.advisor') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
</script>

<style scoped>
</style>
<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <section class="bg-[var(--head-bg)] px-4 py-20 md:px-20 md:py-25">
    <div class="mx-auto max-w-300">
      <div class="flex flex-col items-center lg:flex-row lg:items-center space-y-8 lg:space-x-25 lg:space-y-0">
        <!-- Text Content -->
        <div class="text-center lg:flex-1 lg:text-left">
          <h2 class="scroll-animate mb-6 text-7.5 font-semibold md:mb-8 md:text-10" style="font-family: var(--font-primary)">
            {{ $t('home.legalExpertiseSection.title') }}
          </h2>
          <p class="scroll-animate scroll-animate-delay-100 mb-8 leading-relaxed md:mb-12">
            {{ $t('home.legalExpertiseSection.description1') }}
          </p>
        </div>

        <!-- Image and Advisor -->
        <div class="scroll-animate scroll-animate-delay-200 flex flex-shrink-0 flex-col items-center">
          <div class="h-75 w-75 overflow-hidden rounded-lg">
            <img src="~/public/images/home/p-1.png" alt="Legal Expert" class="h-full w-full object-cover">
          </div>
          <p class="mt-4 text-center text-4 text-[var(--dark-brown)] font-normal md:text-4.5">
            {{ $t('home.legalExpertiseSection.advisor') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>

<template>
  <section class="py-20 md:py-25 px-4 md:px-20 bg-[#f9f6f1]">
    <div class="max-w-320 mx-auto">
      <!-- Section Header -->
      <div class="text-center mb-16 md:mb-20">
        <h2 class="text-7.5 md:text-10 font-semibold mb-4 scroll-animate" style="font-family: var(--font-primary)">
          {{ $t('home.journeySection.title1') }}
        </h2>
        <p class="text-6 md:text-8 mb-6 scroll-animate scroll-animate-delay-100" style="font-family: var(--font-primary)">
          {{ $t('home.journeySection.title2') }}
        </p>
        <p class="text-3.5 md:text-4.5 font-normal max-w-235 md:max-w-235 mx-auto scroll-animate scroll-animate-delay-200">
          {{ $t('home.journeySection.description') }}
        </p>
      </div>

      <!-- Steps -->
      <div class="space-y-16 md:space-y-20">
        <!-- Step 1 -->
        <div class="flex flex-col items-center lg:flex-row lg:items-center lg:space-x-12 scroll-animate">
          <!-- Container for Badge and Content -->
          <div class="flex flex-col items-center lg:flex-row lg:items-start lg:flex-1 lg:space-x-8">
            <!-- Number Badge -->
            <div class="flex items-center justify-center mb-8 lg:mb-0 lg:flex-shrink-0">
              <div class="w-20 h-20 bg-[var(--primary-brown)] rounded-full flex items-center justify-center">
                <span class="text-[var(--white)] text-16 font-['Cormorant'] italic font-semibold -mt-5">1</span>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 text-center lg:text-left">
              <h3 class="text-7.5 md:text-10 font-semibold mb-4" style="font-family: var(--font-primary)">
                {{ $t('home.journeySection.step1.title') }}
              </h3>
              <p class="mb-8 lg:mb-12 max-w-158 lg:max-w-158">
                {{ $t('home.journeySection.step1.description') }}
              </p>
            </div>
          </div>

          <!-- Image -->
          <div class="lg:flex-shrink-0">
            <img src="~/public/images/home/p-5.png" alt="Consultation" class="w-full lg:w-129.75 h-auto rounded-lg">
          </div>
        </div>

        <!-- Step 2 -->
        <div class="flex flex-col items-center lg:flex-row-reverse lg:items-center lg:space-x-reverse lg:space-x-12 scroll-animate">
          <!-- Container for Badge and Content -->
          <div class="flex flex-col items-center lg:flex-row lg:items-start lg:flex-1 lg:space-x-8">
            <!-- Number Badge -->
            <div class="flex items-center justify-center mb-8 lg:mb-0 lg:flex-shrink-0">
              <div class="w-20 h-20 bg-[var(--primary-brown)] rounded-full flex items-center justify-center">
                <span class="text-[var(--white)] text-16 font-['Cormorant'] italic font-semibold -mt-5">2</span>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 text-center lg:text-left" >
              <h3 class="text-7.5 md:text-10 font-semibold mb-4" style="font-family: var(--font-primary)">
                {{ $t('home.journeySection.step2.title') }}
              </h3>
              <p class="mb-8 lg:mb-12 max-w-158 lg:max-w-158">
                {{ $t('home.journeySection.step2.description') }}
              </p>
            </div>
          </div>

          <!-- Image -->
          <div class="md:flex-shrink-0">
            <img src="~/public/images/home/p-6.png" alt="Matching" class="w-full lg:w-129.75 h-auto rounded-lg">
          </div>
        </div>

        <!-- Step 3 -->
        <div class="flex flex-col items-center lg:flex-row lg:items-center lg:space-x-12 scroll-animate">
          <!-- Container for Badge and Content -->
          <div class="flex flex-col items-center lg:flex-row lg:items-start lg:flex-1 lg:space-x-8">
            <!-- Number Badge -->
            <div class="flex items-center justify-center mb-8 lg:mb-0 lg:flex-shrink-0">
              <div class="w-20 h-20 bg-[var(--primary-brown)] rounded-full flex items-center justify-center">
                <span class="text-[var(--white)] text-16 font-['Cormorant'] italic font-semibold -mt-5">3</span>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 text-center lg:text-left">
              <h3 class="text-7.5 md:text-10 font-semibold mb-4" style="font-family: var(--font-primary)">
                {{ $t('home.journeySection.step3.title') }}
              </h3>
              <p class="mb-8 lg:mb-12 max-w-158 lg:max-w-158">
                {{ $t('home.journeySection.step3.description') }}
              </p>
            </div>
          </div>

          <!-- Image -->
          <div class="md:flex-shrink-0">
            <img src="~/public/images/home/p-7.png" alt="Legal Process" class="w-full lg:w-129.75 h-auto rounded-lg">
          </div>
        </div>

        <!-- Step 4 -->
        <div class="flex flex-col items-center lg:flex-row-reverse lg:items-center lg:space-x-reverse lg:space-x-12 scroll-animate">
          <!-- Container for Badge and Content -->
          <div class="flex flex-col items-center lg:flex-row lg:items-start lg:flex-1 lg:space-x-8">
            <!-- Number Badge -->
            <div class="flex items-center justify-center mb-8 lg:mb-0 lg:flex-shrink-0">
              <div class="w-20 h-20 bg-[var(--primary-brown)] rounded-full flex items-center justify-center">
                <span class="text-[var(--white)] text-16 font-['Cormorant'] italic font-semibold -mt-5">4</span>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 text-center lg:text-left">
              <h3 class="text-7.5 md:text-10 font-semibold mb-4" style="font-family: var(--font-primary)">
                {{ $t('home.journeySection.step4.title') }}
              </h3>
              <p class="mb-8 lg:mb-12 max-w-158 lg:max-w-158">
                {{ $t('home.journeySection.step4.description') }}
              </p>
            </div>
          </div>

          <!-- Image -->
          <div class="md:flex-shrink-0">
            <img src="~/public/images/home/p-8.png" alt="Baby Arrival" class="w-full lg:w-129.75 h-auto rounded-lg">
          </div>
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
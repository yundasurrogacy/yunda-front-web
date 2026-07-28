<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <section class="bg-[#f9f6f1] px-4 py-20 md:px-20 md:py-25">
    <div class="mx-auto max-w-320">
      <!-- Section Header -->
      <div class="mb-16 text-center md:mb-20">
        <h2 class="scroll-animate mb-4 text-7.5 font-semibold md:text-10" >
          {{ $t('home.journeySection.title1') }}
        </h2>
        <p class="scroll-animate scroll-animate-delay-100 mb-6 text-6 md:text-8" >
          {{ $t('home.journeySection.title2') }}
        </p>
        <p class="scroll-animate scroll-animate-delay-200 mx-auto max-w-235 text-3.5 font-normal md:max-w-235 md:text-4.5">
          {{ $t('home.journeySection.description') }}
        </p>
      </div>

      <!-- Steps -->
      <div class="space-y-16 md:space-y-20">
        <!-- Step 1 -->
        <div class="scroll-animate flex flex-col items-center lg:flex-row lg:items-center lg:space-x-12">
          <!-- Container for Badge and Content -->
          <div class="flex flex-col items-center lg:flex-1 lg:flex-row lg:items-start lg:space-x-8">
            <!-- Number Badge -->
            <div class="mb-8 flex items-center justify-center lg:mb-0 lg:flex-shrink-0">
              <div class="h-20 w-20 flex items-center justify-center rounded-full bg-[var(--primary-brown)]">
                <span class="text-16 text-[var(--white)] font-semibold font-display italic -mt-5">1</span>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 text-center lg:text-left">
              <h3 class="mb-4 text-7.5 font-semibold md:text-10" >
                {{ $t('home.journeySection.step1.title') }}
              </h3>
              <p class="mb-8 max-w-158 lg:mb-12 lg:max-w-158">
                {{ $t('home.journeySection.step1.description') }}
              </p>
            </div>
          </div>

          <!-- Image -->
          <div class="lg:flex-shrink-0">
            <picture class="block h-auto w-full overflow-hidden rounded-lg lg:w-129.75">
              <source srcset="/images/pages/home/journey-consultation.webp" type="image/webp">
              <img src="/images/pages/home/journey-consultation.png" alt="Consultation" class="h-full w-full object-cover">
            </picture>
          </div>
        </div>

        <!-- Step 2 -->
        <div class="scroll-animate flex flex-col items-center lg:flex-row-reverse lg:items-center lg:space-x-12 lg:space-x-reverse">
          <!-- Container for Badge and Content -->
          <div class="flex flex-col items-center lg:flex-1 lg:flex-row lg:items-start lg:space-x-8">
            <!-- Number Badge -->
            <div class="mb-8 flex items-center justify-center lg:mb-0 lg:flex-shrink-0">
              <div class="h-20 w-20 flex items-center justify-center rounded-full bg-[var(--primary-brown)]">
                <span class="text-16 text-[var(--white)] font-semibold font-display italic -mt-5">2</span>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 text-center lg:text-left">
              <h3 class="mb-4 text-7.5 font-semibold md:text-10" >
                {{ $t('home.journeySection.step2.title') }}
              </h3>
              <p class="mb-8 max-w-158 lg:mb-12 lg:max-w-158">
                {{ $t('home.journeySection.step2.description') }}
              </p>
            </div>
          </div>

          <!-- Image -->
          <div class="md:flex-shrink-0">
            <picture class="block h-auto w-full overflow-hidden rounded-lg lg:w-129.75">
              <source srcset="/images/pages/home/journey-matching.webp" type="image/webp">
              <img src="/images/pages/home/journey-matching.png" alt="Matching" class="h-full w-full object-cover">
            </picture>
          </div>
        </div>

        <!-- Step 3 -->
        <div class="scroll-animate flex flex-col items-center lg:flex-row lg:items-center lg:space-x-12">
          <!-- Container for Badge and Content -->
          <div class="flex flex-col items-center lg:flex-1 lg:flex-row lg:items-start lg:space-x-8">
            <!-- Number Badge -->
            <div class="mb-8 flex items-center justify-center lg:mb-0 lg:flex-shrink-0">
              <div class="h-20 w-20 flex items-center justify-center rounded-full bg-[var(--primary-brown)]">
                <span class="text-16 text-[var(--white)] font-semibold font-display italic -mt-5">3</span>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 text-center lg:text-left">
              <h3 class="mb-4 text-7.5 font-semibold md:text-10" >
                {{ $t('home.journeySection.step3.title') }}
              </h3>
              <p class="mb-8 max-w-158 lg:mb-12 lg:max-w-158">
                {{ $t('home.journeySection.step3.description') }}
              </p>
            </div>
          </div>

          <!-- Image -->
          <div class="md:flex-shrink-0">
            <picture class="block h-auto w-full overflow-hidden rounded-lg lg:w-129.75">
              <source srcset="/images/pages/home/journey-legal-process.webp" type="image/webp">
              <img src="/images/pages/home/journey-legal-process.png" alt="Legal Process" class="h-full w-full object-cover">
            </picture>
          </div>
        </div>

        <!-- Step 4 -->
        <div class="scroll-animate flex flex-col items-center lg:flex-row-reverse lg:items-center lg:space-x-12 lg:space-x-reverse">
          <!-- Container for Badge and Content -->
          <div class="flex flex-col items-center lg:flex-1 lg:flex-row lg:items-start lg:space-x-8">
            <!-- Number Badge -->
            <div class="mb-8 flex items-center justify-center lg:mb-0 lg:flex-shrink-0">
              <div class="h-20 w-20 flex items-center justify-center rounded-full bg-[var(--primary-brown)]">
                <span class="text-16 text-[var(--white)] font-semibold font-display italic -mt-5">4</span>
              </div>
            </div>

            <!-- Content -->
            <div class="flex-1 text-center lg:text-left">
              <h3 class="mb-4 text-7.5 font-semibold md:text-10" >
                {{ $t('home.journeySection.step4.title') }}
              </h3>
              <p class="mb-8 max-w-158 lg:mb-12 lg:max-w-158">
                {{ $t('home.journeySection.step4.description') }}
              </p>
            </div>
          </div>

          <!-- Image -->
          <div class="md:flex-shrink-0">
            <picture class="block h-auto w-full overflow-hidden rounded-lg lg:w-129.75">
              <source srcset="/images/pages/home/journey-baby-arrival.webp" type="image/webp">
              <img src="/images/pages/home/journey-baby-arrival.png" alt="Baby Arrival" class="h-full w-full object-cover">
            </picture>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>

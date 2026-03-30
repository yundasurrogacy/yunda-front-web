<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <section class="bg-[var(--head-bg)] px-4 py-16 md:px-20 md:py-24">
    <div class="mx-auto max-w-320">
      <div class="scroll-animate mb-12 text-center md:mb-16">
        <h2 class="text-7.5 font-semibold md:text-10" style="font-family: var(--font-primary)">
          {{ $t('home.ourServicesSection.title') }}
        </h2>
        <p
          class="mx-auto mt-6 max-w-240 text-4.5 leading-relaxed text-[var(--dark-brown)] md:text-5"
          style="font-family: var(--font-secondary)"
        >
          {{ $t('home.ourServicesSection.description') }}
        </p>
      </div>
      <div class="scroll-animate scroll-animate-delay-100 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
        <div class="overflow-hidden rounded-5 shadow-[0_16px_40px_rgba(39,31,24,0.1)]">
          <img
            src="/images/home/home-redesign/our-services-1.jpg"
            alt=""
            class="h-full w-full object-cover"
            loading="lazy"
          >
        </div>
        <div class="overflow-hidden rounded-5 shadow-[0_16px_40px_rgba(39,31,24,0.1)]">
          <img
            src="/images/home/home-redesign/our-services-2.jpeg"
            alt=""
            class="h-full w-full object-cover"
            loading="lazy"
          >
        </div>
      </div>
    </div>
  </section>
</template>

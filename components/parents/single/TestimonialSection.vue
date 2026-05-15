<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { initScrollAnimation } = useScrollAnimation()

onMounted(() => {
  initScrollAnimation()
})
</script>

<template>
  <section class="w-full bg-[var(--yunda-petal)] px-8 py-16 lg:px-0 lg:py-24">
    <div class="h-auto lg:h-112 md:flex md:items-center">
      <!-- Image Section -->
      <div class="slide-left mb-8 md:mb-0 md:w-1/2">
        <picture class="block w-full overflow-hidden">
          <source srcset="/images/process/i-7.webp" type="image/webp">
          <img
            src="/images/process/i-7.png"
            alt="Happy two-dad family"
            class="w-full object-cover"
            loading="lazy"
            decoding="async"
          >
        </picture>
      </div>

      <!-- Content Section -->
      <div class="slide-right flex flex-col justify-between text-3.5 md:w-1/2 md:px-10 lg:text-5">
        <!-- Title -->
        <h2 class="mb-6 text-center text-6 font-semibold md:mb-18 md:text-left lg:text-8" >
          {{ $t('parentsSingle.testimonialSection.title') }}
        </h2>

        <!-- Testimonial Text -->
        <p class="whitespace-pre-line text-center leading-relaxed md:text-left">
          {{ $t('parentsSingle.testimonialSection.quote') }}
        </p>
        <p class="mt-6 text-center md:text-left">
          {{ $t('parentsSingle.testimonialSection.quote2') }}
        </p>
      </div>
    </div>
  </section>
</template>

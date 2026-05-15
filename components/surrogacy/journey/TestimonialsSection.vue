<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { initScrollAnimation } = useScrollAnimation()

onMounted(() => {
  initScrollAnimation()
})
</script>

<template>
  <section
    class="testimonials-section from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b py-16 lg:py-24"
  >
    <div class="container mx-auto max-w-300 px-4 lg:px-20">
      <!-- Title -->
      <h2
        class="mb-12 text-center text-7.5 font-semibold lg:mb-16 lg:text-10" 
      >
        {{ $t('surrogacyJourney.testimonials.title') }}
      </h2>

      <!-- Testimonials Grid -->
      <div class="mx-auto max-w-1440px space-y-8 lg:space-y-12">
        <!-- Testimonial 1 -->
        <div class="testimonial-item flex flex-col lg:flex-row lg:gap-8">
          <div class="slide-left lg:w-1/2">
            <img
              class="mb-6 h-auto w-full object-cover lg:mb-0" src="/images/surrogacy/i-s-1.png"
              :alt="$t('surrogacyJourney.testimonials.testimonial1.name')"
            >
          </div>
          <div class="slide-right lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:pl-8">
            <h3 class="mb-4 text-6 font-semibold lg:text-8" >
              {{ $t('surrogacyJourney.testimonials.testimonial1.name') }}
            </h3>
            <p class="mb-4 text-4 leading-relaxed lg:mb-6 lg:text-5">
              "{{ $t('surrogacyJourney.testimonials.testimonial1.quote') }}"
            </p>
            <p class="text-4 italic lg:text-5">
              | {{ $t('surrogacyJourney.testimonials.testimonial1.role') }}
            </p>
          </div>
        </div>

        <!-- Testimonial 2 -->
        <div class="testimonial-item flex flex-col lg:flex-row lg:gap-8">
          <div class="slide-left slide-delay-200 lg:w-1/2">
            <img
              class="mb-6 h-auto w-full object-cover lg:mb-0" src="/images/surrogacy/i-s-2.png"
              :alt="$t('surrogacyJourney.testimonials.testimonial2.name')"
            >
          </div>
          <div class="slide-right slide-delay-200 lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:pl-8">
            <h3 class="mb-4 text-6 font-semibold lg:text-8" >
              {{ $t('surrogacyJourney.testimonials.testimonial2.name') }}
            </h3>
            <p class="mb-4 text-4 leading-relaxed lg:mb-6 lg:text-5">
              "{{ $t('surrogacyJourney.testimonials.testimonial2.quote') }}"
            </p>
            <p class="text-4 italic lg:text-5">
              | {{ $t('surrogacyJourney.testimonials.testimonial2.role') }}
            </p>
          </div>
        </div>

        <!-- Testimonial 3 -->
        <div class="testimonial-item flex flex-col lg:flex-row lg:gap-8">
          <div class="slide-left slide-delay-400 lg:w-1/2">
            <img
              class="mb-6 h-auto w-full object-cover lg:mb-0" src="/images/surrogacy/i-s-3.png"
              :alt="$t('surrogacyJourney.testimonials.testimonial3.name')"
            >
          </div>
          <div class="slide-right slide-delay-400 lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:pl-8">
            <h3 class="mb-4 text-6 font-semibold lg:text-8" >
              {{ $t('surrogacyJourney.testimonials.testimonial3.name') }}
            </h3>
            <p class="mb-4 text-4 leading-relaxed lg:mb-6 lg:text-5">
              "{{ $t('surrogacyJourney.testimonials.testimonial3.quote') }}"
            </p>
            <p class="text-4 italic lg:text-5">
              | {{ $t('surrogacyJourney.testimonials.testimonial3.role') }}
            </p>
          </div>
        </div>

        <!-- Testimonial 4 -->
        <div class="testimonial-item flex flex-col lg:flex-row lg:gap-8">
          <div class="slide-left slide-delay-500 lg:w-1/2">
            <img
              class="mb-6 h-auto w-full object-cover lg:mb-0" src="/images/surrogacy/i-s-4.png"
              :alt="$t('surrogacyJourney.testimonials.testimonial4.name')"
            >
          </div>
          <div class="slide-right slide-delay-500 lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:pl-8">
            <h3 class="mb-4 text-6 font-semibold lg:text-8" >
              {{ $t('surrogacyJourney.testimonials.testimonial4.name') }}
            </h3>
            <p class="mb-4 text-4 leading-relaxed lg:mb-6 lg:text-5">
              "{{ $t('surrogacyJourney.testimonials.testimonial4.quote') }}"
            </p>
            <p class="text-4 italic lg:text-5">
              | {{ $t('surrogacyJourney.testimonials.testimonial4.role') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
@media (min-width: 1024px) {
  .testimonials-section .container {
    max-width: 1440px;
  }
}
</style>

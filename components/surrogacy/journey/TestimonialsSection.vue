<template>
  <section
    class="testimonials-section bg-gradient-to-b from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] py-16 lg:py-24">
    <div class="container max-w-300 mx-auto px-4 lg:px-20">
      <!-- Title -->
      <h2
        class="text-7.5 lg:text-10 font-semibold text-center mb-12 lg:mb-16" style="font-family: var(--font-primary)">
        {{ $t('surrogacyJourney.testimonials.title') }}
      </h2>

      <!-- Testimonials Grid -->
      <div class="space-y-8 lg:space-y-12 max-w-1440px mx-auto">
        <!-- Testimonial 1 -->
        <div class="testimonial-item flex flex-col lg:flex-row lg:gap-8">
          <div class="lg:w-1/2 slide-left">
            <img class="w-full h-auto object-cover mb-6 lg:mb-0" src="~/public/images/surrogacy/i-s-1.png"
              :alt="$t('surrogacyJourney.testimonials.testimonial1.name')" />
          </div>
          <div class="lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:pl-8 slide-right">
            <h3 class="text-6 lg:text-8 font-semibold mb-4" style="font-family: var(--font-primary)">
              {{ $t('surrogacyJourney.testimonials.testimonial1.name') }}
            </h3>
            <p class="text-4 lg:text-5 leading-relaxed mb-4 lg:mb-6">
              "{{ $t('surrogacyJourney.testimonials.testimonial1.quote') }}"
            </p>
            <p class="text-4 lg:text-5 italic">
              | {{ $t('surrogacyJourney.testimonials.testimonial1.role') }}
            </p>
          </div>
        </div>

        <!-- Testimonial 2 -->
        <div class="testimonial-item flex flex-col lg:flex-row lg:gap-8">
          <div class="lg:w-1/2 slide-left slide-delay-200">
            <img class="w-full h-auto object-cover mb-6 lg:mb-0" src="~/public/images/surrogacy/i-s-2.png"
              :alt="$t('surrogacyJourney.testimonials.testimonial2.name')" />
          </div>
          <div class="lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:pl-8 slide-right slide-delay-200">
            <h3 class="text-6 lg:text-8 font-semibold mb-4" style="font-family: var(--font-primary)">
              {{ $t('surrogacyJourney.testimonials.testimonial2.name') }}
            </h3>
            <p class="text-4 lg:text-5 leading-relaxed mb-4 lg:mb-6">
              "{{ $t('surrogacyJourney.testimonials.testimonial2.quote') }}"
            </p>
            <p class="text-4 lg:text-5 italic">
              | {{ $t('surrogacyJourney.testimonials.testimonial2.role') }}
            </p>
          </div>
        </div>

        <!-- Testimonial 3 -->
        <div class="testimonial-item flex flex-col lg:flex-row lg:gap-8">
          <div class="lg:w-1/2 slide-left slide-delay-400">
            <img class="w-full h-auto object-cover mb-6 lg:mb-0" src="~/public/images/surrogacy/i-s-3.png"
              :alt="$t('surrogacyJourney.testimonials.testimonial3.name')" />
          </div>
          <div class="lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:pl-8 slide-right slide-delay-400">
            <h3 class="text-6 lg:text-8 font-semibold mb-4" style="font-family: var(--font-primary)">
              {{ $t('surrogacyJourney.testimonials.testimonial3.name') }}
            </h3>
            <p class="text-4 lg:text-5 leading-relaxed mb-4 lg:mb-6">
              "{{ $t('surrogacyJourney.testimonials.testimonial3.quote') }}"
            </p>
            <p class="text-4 lg:text-5 italic">
              | {{ $t('surrogacyJourney.testimonials.testimonial3.role') }}
            </p>
          </div>
        </div>

        <!-- Testimonial 4 -->
        <div class="testimonial-item flex flex-col lg:flex-row lg:gap-8">
          <div class="lg:w-1/2 slide-left slide-delay-500">
            <img class="w-full h-auto object-cover mb-6 lg:mb-0" src="~/public/images/surrogacy/i-s-4.png"
              :alt="$t('surrogacyJourney.testimonials.testimonial4.name')" />
          </div>
          <div class="lg:w-1/2 lg:flex lg:flex-col lg:justify-center lg:pl-8 slide-right slide-delay-500">
            <h3 class="text-6 lg:text-8 font-semibold mb-4" style="font-family: var(--font-primary)">
              {{ $t('surrogacyJourney.testimonials.testimonial4.name') }}
            </h3>
            <p class="text-4 lg:text-5 leading-relaxed mb-4 lg:mb-6">
              "{{ $t('surrogacyJourney.testimonials.testimonial4.quote') }}"
            </p>
            <p class="text-4 lg:text-5 italic">
              | {{ $t('surrogacyJourney.testimonials.testimonial4.role') }}
            </p>
          </div>
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
</script>

<style scoped>
@media (min-width: 1024px) {
  .testimonials-section .container {
    max-width: 1440px;
  }
}
</style>
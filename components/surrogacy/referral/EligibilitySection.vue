<template>
  <section class="w-full bg-gradient-to-b from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] py-8 lg:py-12 px-4 lg:px-20">
    <div class="max-w-300 mx-auto scroll-animate">
      <h2 class="text-7.5 lg:text-10 font-semibold mb-6 lg:mb-8 text-center lg:text-left"style="font-family: var(--font-primary)">
        {{ $t('surrogacyReferral.eligibilitySection.title') }}
      </h2>
      
      <div>
        <p class="mb-4 text-center lg:text-left">{{ $t('surrogacyReferral.eligibilitySection.intro') }}</p>
        <div class="space-y-2 text-left ml-6">
          <li>{{ $t('surrogacyReferral.eligibilitySection.requirements.age') }}</li>
          <li>{{ $t('surrogacyReferral.eligibilitySection.requirements.residence') }}</li>
          <li>{{ $t('surrogacyReferral.eligibilitySection.requirements.pregnancy') }}</li>
          <li>{{ $t('surrogacyReferral.eligibilitySection.requirements.bmi') }}</li>
          <li>{{ $t('surrogacyReferral.eligibilitySection.requirements.lifestyle') }}</li>
          <li>{{ $t('surrogacyReferral.eligibilitySection.requirements.support') }}</li>
          <li>{{ $t('surrogacyReferral.eligibilitySection.requirements.health') }}</li>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
</script>

<style scoped>
</style>
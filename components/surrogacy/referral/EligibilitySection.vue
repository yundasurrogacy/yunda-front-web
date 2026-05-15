<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b px-4 py-8 lg:px-20 lg:py-12">
    <div class="scroll-animate mx-auto max-w-300">
      <h2 class="mb-6 text-center font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:mb-8 lg:text-left lg:text-[36px]">
        {{ $t('surrogacyReferral.eligibilitySection.title') }}
      </h2>

      <div>
        <p class="mb-4 text-center lg:text-left">
          {{ $t('surrogacyReferral.eligibilitySection.intro') }}
        </p>
        <div class="ml-6 text-left space-y-2">
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

<style scoped>
</style>

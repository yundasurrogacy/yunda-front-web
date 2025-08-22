<template>
  <section class="w-full bg-gradient-to-b from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] py-8 lg:py-20 px-4 lg:px-20">
    <div class="max-w-300 mx-auto mb-10 scroll-animate">
      <h2 class="text-7.5 lg:text-10 font-semibold mb-6 lg:mb-8 text-center lg:text-left" style="font-family: var(--font-primary)">
        {{ $t('surrogacyReferral.compensationSection.title') }}
      </h2>
      
      <div>
        <div class="space-y-2 text-left ml-6">
          <li>{{ $t('surrogacyReferral.compensationSection.benefits.base') }}</li>
          <li>{{ $t('surrogacyReferral.compensationSection.benefits.allowances') }}</li>
          <li>{{ $t('surrogacyReferral.compensationSection.benefits.medication') }}</li>
          <li>{{ $t('surrogacyReferral.compensationSection.benefits.surgery') }}</li>
          <li>{{ $t('surrogacyReferral.compensationSection.benefits.breastmilk') }}</li>
          <li>{{ $t('surrogacyReferral.compensationSection.benefits.bedrest') }}</li>
          <li>{{ $t('surrogacyReferral.compensationSection.benefits.insurance') }}</li>
          <li>{{ $t('surrogacyReferral.compensationSection.benefits.lifeInsurance') }}</li>
          <li>{{ $t('surrogacyReferral.compensationSection.benefits.support') }}</li>
          <li>{{ $t('surrogacyReferral.compensationSection.benefits.processing') }}</li>
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
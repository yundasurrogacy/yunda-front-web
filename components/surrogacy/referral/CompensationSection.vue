<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b px-4 py-8 lg:px-20 lg:py-20">
    <div class="scroll-animate mx-auto mb-10 max-w-300">
      <h2 class="mb-6 text-center font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:mb-8 lg:text-left lg:text-[36px]">
        {{ $t('surrogacyReferral.compensationSection.title') }}
      </h2>

      <div>
        <div class="ml-6 text-left space-y-2">
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

<style scoped>
</style>

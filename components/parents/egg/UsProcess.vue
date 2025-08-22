<template>
  <div class="bg-gradient-to-b from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] py-16 px-4">
    <div class="max-w-320 mx-auto scroll-animate">
      <h2 class="text-7.5 lg:text-10 font-semibold text-center lg:text-left mb-8" style="font-family: var(--font-primary)">
        {{ $t('eggDonation.usProcessSection.title') }}
      </h2>
      <div class="ml-4">
        <li>{{ $t('eggDonation.usProcessSection.usingDonor') }}: {{ $t('eggDonation.usProcessSection.usingDonorDesc') }}</li>
        <li>{{ $t('eggDonation.usProcessSection.providingSperm') }}: {{ $t('eggDonation.usProcessSection.providingSpermDesc') }}</li>
        <li>{{ $t('eggDonation.usProcessSection.providingEggs') }}: {{ $t('eggDonation.usProcessSection.providingEggsDesc') }}</li>
      </div>
      <p class=" text-left mt-6">
        {{ $t('eggDonation.usProcessSection.conclusion') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
</script>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <div class="from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] bg-gradient-to-b px-4 py-16">
    <div class="scroll-animate mx-auto max-w-320">
      <h2 class="mb-8 text-center text-7.5 font-semibold lg:text-left lg:text-10" style="font-family: var(--font-primary)">
        {{ $t('eggDonation.usProcessSection.title') }}
      </h2>
      <div class="ml-4">
        <li>{{ $t('eggDonation.usProcessSection.usingDonor') }}: {{ $t('eggDonation.usProcessSection.usingDonorDesc') }}</li>
        <li>{{ $t('eggDonation.usProcessSection.providingSperm') }}: {{ $t('eggDonation.usProcessSection.providingSpermDesc') }}</li>
        <li>{{ $t('eggDonation.usProcessSection.providingEggs') }}: {{ $t('eggDonation.usProcessSection.providingEggsDesc') }}</li>
      </div>
      <p class="mt-6 text-left">
        {{ $t('eggDonation.usProcessSection.conclusion') }}
      </p>
    </div>
  </div>
</template>

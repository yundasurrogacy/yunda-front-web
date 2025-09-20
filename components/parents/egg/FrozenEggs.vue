<template>
  <div class="bg-gradient-to-b from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] py-16 px-4">
    <div class="max-w-320 mx-auto scroll-animate">
      <h2 class="text-7.5 lg:text-10 font-semibold text-center lg:text-left mb-8" style="font-family: var(--font-primary)">
        {{ $t('eggDonation.frozenEggsSection.title') }}
      </h2>
      <p class="text-center lg:text-left mb-8">
        {{ $t('eggDonation.frozenEggsSection.description') }}
      </p>
      <!-- 响应式比较布局 -->
      <div class="flex flex-col md:flex-row">
        <!-- Category 列 - 在移动端隐藏，md以上占10% -->
        <div class="hidden md:flex flex-col md:w-[20%]">
          <h3 class="font-source-serif-4 text-xl font-semibold  md:mt-6 md:mb-2 text-left">{{ $t('eggDonation.frozenEggsSection.category') }}</h3>
          <div class="md:py-2 border-b-2 border-[#271F18]"></div>
          <div class="md:space-y-4 flex-1">
            <div class="py-4 border-b-2 border-[#271F18]">
              <p >{{ $t('eggDonation.frozenEggsSection.timeline') }}</p>
            </div>
            <div class="py-4 border-b-2 border-[#271F18]">
              <p >{{ $t('eggDonation.frozenEggsSection.successRate') }}</p>
            </div>
            <div class="py-4 border-b-2 border-[#271F18]">
              <p >{{ $t('eggDonation.frozenEggsSection.embryoYield') }}</p>
            </div>
            <div class="py-4 border-b-2 border-[#271F18]">
              <p >{{ $t('eggDonation.frozenEggsSection.cost') }}</p>
            </div>
            <div class="py-4 border-b-2 border-[#271F18]">
              <p >{{ $t('eggDonation.frozenEggsSection.donorAccess') }}</p>
            </div>
          </div>
        </div>

        <!-- Fresh Eggs 列 - md以上占45% -->
        <div class="flex flex-col flex-1 md:w-[40%] rounded-lg">
          <h3 class="font-source-serif-4 text-lg lg:text-xl font-semibold  mt-6 md:mb-2 text-center md:text-left">{{ $t('eggDonation.frozenEggsSection.freshEggs') }}</h3>
          <div class="md:py-2 border-b-2 border-[#271F18]"></div>
          <div class="space-y-3 md:space-y-4 flex-1 text-center md:text-left">
            <div class="py-2 md:py-4 border-b-2 border-[#271F18]">
              <p class="font-medium md:hidden">{{ $t('eggDonation.frozenEggsSection.timeline') }}</p>
              <p class="">{{ $t('eggDonation.frozenEggsSection.freshEggsDetails.timeline') }}</p>
            </div>
            <div class="py-2 md:py-4 border-b-2 border-[#271F18]">
              <p class="font-medium md:hidden">{{ $t('eggDonation.frozenEggsSection.successRate') }}</p>
              <p class="">{{ $t('eggDonation.frozenEggsSection.freshEggsDetails.successRate') }}
              </p>
            </div>
            <div class="py-2 md:py-4 border-b-2 border-[#271F18]">
              <p class="font-medium md:hidden">{{ $t('eggDonation.frozenEggsSection.embryoYield') }}</p>
              <p class="">{{ $t('eggDonation.frozenEggsSection.freshEggsDetails.embryoYield') }}</p>
            </div>
            <div class="py-2 md:py-4 border-b-2 border-[#271F18]">
              <p class="font-medium md:hidden">{{ $t('eggDonation.frozenEggsSection.cost') }}</p>
              <p class="">{{ $t('eggDonation.frozenEggsSection.freshEggsDetails.cost') }}</p>
            </div>
            <div class="py-2 md:py-4 border-b-2 border-[#271F18]">
              <p class="font-medium md:hidden">{{ $t('eggDonation.frozenEggsSection.donorAccess') }}</p>
              <p class="">{{ $t('eggDonation.frozenEggsSection.freshEggsDetails.donorAccess') }}</p>
            </div>
          </div>
        </div>

        <!-- Frozen Eggs 列 - md以上占45% -->
        <div class="flex flex-col flex-1 md:w-[40%]">
          <h3 class="font-source-serif-4 text-lg md:text-xl font-semibold  mt-6 md:mb-2 text-center md:text-left">{{ $t('eggDonation.frozenEggsSection.frozenEggs') }}</h3>
          <div class="md:py-2 border-b-2 border-[#271F18]"></div>
          <div class="space-y-3 md:space-y-4 flex-1 text-center md:text-left">
            <div class="py-2 md:py-4 border-b-2 border-[#271F18]">
              <p class="font-medium md:hidden">{{ $t('eggDonation.frozenEggsSection.timeline') }}</p>
              <p class="">{{ $t('eggDonation.frozenEggsSection.frozenEggsDetails.timeline') }}</p>
            </div>
            <div class="py-2 md:py-4 border-b-2 border-[#271F18]">
              <p class="font-medium md:hidden">{{ $t('eggDonation.frozenEggsSection.successRate') }}</p>
              <p class="">{{ $t('eggDonation.frozenEggsSection.frozenEggsDetails.successRate') }}</p>
            </div>
            <div class="py-2 md:py-4 border-b-2 border-[#271F18]">
              <p class="font-medium md:hidden">{{ $t('eggDonation.frozenEggsSection.embryoYield') }}</p>
              <p class="">{{ $t('eggDonation.frozenEggsSection.frozenEggsDetails.embryoYield') }}</p>
            </div>
            <div class="py-2 md:py-4 border-b-2 border-[#271F18]">
              <p class="font-medium md:hidden">{{ $t('eggDonation.frozenEggsSection.cost') }}</p>
              <p class="">{{ $t('eggDonation.frozenEggsSection.frozenEggsDetails.cost') }}</p>
            </div>
            <div class="py-2 md:py-4 border-b-2 border-[#271F18]">
              <p class="font-medium md:hidden">{{ $t('eggDonation.frozenEggsSection.donorAccess') }}</p>
              <p class="">{{ $t('eggDonation.frozenEggsSection.frozenEggsDetails.donorAccess') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
</script>
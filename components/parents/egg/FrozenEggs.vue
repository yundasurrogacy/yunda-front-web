<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <div class="from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] bg-gradient-to-b px-4 py-16">
    <div class="scroll-animate mx-auto max-w-320">
      <h2 class="mb-8 text-center text-7.5 font-semibold lg:text-left lg:text-10" style="font-family: var(--font-primary)">
        {{ $t('eggDonation.frozenEggsSection.title') }}
      </h2>
      <p class="mb-8 text-center lg:text-left">
        {{ $t('eggDonation.frozenEggsSection.description') }}
      </p>
      <!-- 响应式比较布局 -->
      <div class="flex flex-col md:flex-row">
        <!-- Category 列 - 在移动端隐藏，md以上占10% -->
        <div class="hidden flex-col md:w-[20%] md:flex">
          <h3 class="font-source-serif-4 text-left text-xl font-semibold md:mb-2 md:mt-6">
            {{ $t('eggDonation.frozenEggsSection.category') }}
          </h3>
          <div class="border-b-2 border-[#271F18] md:py-2" />
          <div class="flex-1 md:space-y-4">
            <div class="border-b-2 border-[#271F18] py-4">
              <p>{{ $t('eggDonation.frozenEggsSection.timeline') }}</p>
            </div>
            <div class="border-b-2 border-[#271F18] py-4">
              <p>{{ $t('eggDonation.frozenEggsSection.successRate') }}</p>
            </div>
            <div class="border-b-2 border-[#271F18] py-4">
              <p>{{ $t('eggDonation.frozenEggsSection.embryoYield') }}</p>
            </div>
            <div class="border-b-2 border-[#271F18] py-4">
              <p>{{ $t('eggDonation.frozenEggsSection.cost') }}</p>
            </div>
            <div class="border-b-2 border-[#271F18] py-4">
              <p>{{ $t('eggDonation.frozenEggsSection.donorAccess') }}</p>
            </div>
          </div>
        </div>

        <!-- Fresh Eggs 列 - md以上占45% -->
        <div class="flex flex-1 flex-col rounded-lg md:w-[40%]">
          <h3 class="font-source-serif-4 mt-6 text-center text-lg font-semibold md:mb-2 md:text-left lg:text-xl">
            {{ $t('eggDonation.frozenEggsSection.freshEggs') }}
          </h3>
          <div class="border-b-2 border-[#271F18] md:py-2" />
          <div class="flex-1 text-center space-y-3 md:text-left md:space-y-4">
            <div class="border-b-2 border-[#271F18] py-2 md:py-4">
              <p class="font-medium md:hidden">
                {{ $t('eggDonation.frozenEggsSection.timeline') }}
              </p>
              <p class="">
                {{ $t('eggDonation.frozenEggsSection.freshEggsDetails.timeline') }}
              </p>
            </div>
            <div class="border-b-2 border-[#271F18] py-2 md:py-4">
              <p class="font-medium md:hidden">
                {{ $t('eggDonation.frozenEggsSection.successRate') }}
              </p>
              <p class="">
                {{ $t('eggDonation.frozenEggsSection.freshEggsDetails.successRate') }}
              </p>
            </div>
            <div class="border-b-2 border-[#271F18] py-2 md:py-4">
              <p class="font-medium md:hidden">
                {{ $t('eggDonation.frozenEggsSection.embryoYield') }}
              </p>
              <p class="">
                {{ $t('eggDonation.frozenEggsSection.freshEggsDetails.embryoYield') }}
              </p>
            </div>
            <div class="border-b-2 border-[#271F18] py-2 md:py-4">
              <p class="font-medium md:hidden">
                {{ $t('eggDonation.frozenEggsSection.cost') }}
              </p>
              <p class="">
                {{ $t('eggDonation.frozenEggsSection.freshEggsDetails.cost') }}
              </p>
            </div>
            <div class="border-b-2 border-[#271F18] py-2 md:py-4">
              <p class="font-medium md:hidden">
                {{ $t('eggDonation.frozenEggsSection.donorAccess') }}
              </p>
              <p class="">
                {{ $t('eggDonation.frozenEggsSection.freshEggsDetails.donorAccess') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Frozen Eggs 列 - md以上占45% -->
        <div class="flex flex-1 flex-col md:w-[40%]">
          <h3 class="font-source-serif-4 mt-6 text-center text-lg font-semibold md:mb-2 md:text-left md:text-xl">
            {{ $t('eggDonation.frozenEggsSection.frozenEggs') }}
          </h3>
          <div class="border-b-2 border-[#271F18] md:py-2" />
          <div class="flex-1 text-center space-y-3 md:text-left md:space-y-4">
            <div class="border-b-2 border-[#271F18] py-2 md:py-4">
              <p class="font-medium md:hidden">
                {{ $t('eggDonation.frozenEggsSection.timeline') }}
              </p>
              <p class="">
                {{ $t('eggDonation.frozenEggsSection.frozenEggsDetails.timeline') }}
              </p>
            </div>
            <div class="border-b-2 border-[#271F18] py-2 md:py-4">
              <p class="font-medium md:hidden">
                {{ $t('eggDonation.frozenEggsSection.successRate') }}
              </p>
              <p class="">
                {{ $t('eggDonation.frozenEggsSection.frozenEggsDetails.successRate') }}
              </p>
            </div>
            <div class="border-b-2 border-[#271F18] py-2 md:py-4">
              <p class="font-medium md:hidden">
                {{ $t('eggDonation.frozenEggsSection.embryoYield') }}
              </p>
              <p class="">
                {{ $t('eggDonation.frozenEggsSection.frozenEggsDetails.embryoYield') }}
              </p>
            </div>
            <div class="border-b-2 border-[#271F18] py-2 md:py-4">
              <p class="font-medium md:hidden">
                {{ $t('eggDonation.frozenEggsSection.cost') }}
              </p>
              <p class="">
                {{ $t('eggDonation.frozenEggsSection.frozenEggsDetails.cost') }}
              </p>
            </div>
            <div class="border-b-2 border-[#271F18] py-2 md:py-4">
              <p class="font-medium md:hidden">
                {{ $t('eggDonation.frozenEggsSection.donorAccess') }}
              </p>
              <p class="">
                {{ $t('eggDonation.frozenEggsSection.frozenEggsDetails.donorAccess') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

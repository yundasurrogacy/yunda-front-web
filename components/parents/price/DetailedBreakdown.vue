<template>
  <section class="w-full bg-gradient-to-b from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] py-16 px-4">
    <div class="max-w-300 mx-4 md:mx-auto text-3.5 lg:text-5">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
        <!-- Surrogacy Agency Fees -->
        <div class="relative lg:mb-8 slide-left">
          <div class="border-b-2 border-[var(--dark-brown)] mb-4"></div>
          <div class="flex justify-between items-start text-2xl lg:text-3xl mb-4 font-semibold" style="font-family: var(--font-primary)">
            <h3>{{ $t('parentsPrice.detailedBreakdown.agencyFees.title') }}</h3>
            <div>{{ $t('parentsPrice.detailedBreakdown.agencyFees.amount') }}</div>
          </div>
          <div class="space-y-1 leading-relaxed">
            <li> {{ $t('parentsPrice.detailedBreakdown.agencyFees.description1') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.agencyFees.description2') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.agencyFees.description3') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.agencyFees.description4') }}</li>
          </div>
        </div>

        <!-- Screening & Admin -->
        <div class="relative lg:mb-8 slide-right">
          <div class="border-b-2 border-[var(--dark-brown)] mb-4"></div>
          <div class="flex justify-between items-start text-2xl lg:text-3xl mb-4 font-semibold" style="font-family: var(--font-primary)">
            <h3>{{ $t('parentsPrice.detailedBreakdown.screeningAdmin.title') }}</h3>
            <div>{{ $t('parentsPrice.detailedBreakdown.screeningAdmin.amount') }}</div>
          </div>
          <div class="space-y-1 leading-relaxed">
            <li> {{ $t('parentsPrice.detailedBreakdown.screeningAdmin.description1') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.screeningAdmin.description2') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.screeningAdmin.description3') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.screeningAdmin.description4') }}</li>
          </div>
        </div>

        <!-- Surrogate Compensation -->
        <div class="relative lg:mb-8 slide-left slide-delay-200">
          <div class="border-b-2 border-[var(--dark-brown)] mb-4"></div>
          <div class="flex justify-between items-start text-2xl lg:text-3xl mb-4 font-semibold" style="font-family: var(--font-primary)">
            <h3>{{ $t('parentsPrice.detailedBreakdown.surrogateCompensation.title') }}</h3>
            <div>{{ $t('parentsPrice.detailedBreakdown.surrogateCompensation.amount') }}</div>
          </div>
          <div class="space-y-1 leading-relaxed">
            <li> {{ $t('parentsPrice.detailedBreakdown.surrogateCompensation.description1') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.surrogateCompensation.description2') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.surrogateCompensation.description3') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.surrogateCompensation.description4') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.surrogateCompensation.description5') }}</li>
          </div>
        </div>

        <!-- Legal Fees -->
        <div class="relative lg:mb-8 slide-right slide-delay-200">
          <div class="border-b-2 border-[var(--dark-brown)] mb-4"></div>
          <div class="flex justify-between items-start text-2xl lg:text-3xl mb-4 font-semibold" style="font-family: var(--font-primary)">
            <h3 >{{ $t('parentsPrice.detailedBreakdown.legalFees.title') }}</h3>
            <div >{{ $t('parentsPrice.detailedBreakdown.legalFees.amount') }}</div>
          </div>
          <div class="space-y-1 leading-relaxed">
            <li> {{ $t('parentsPrice.detailedBreakdown.legalFees.description1') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.legalFees.description2') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.legalFees.description3') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.legalFees.description4') }}</li>
          </div>
        </div>

        <!-- Insurance Support -->
        <div class="relative lg:mb-8 slide-left slide-delay-400">
          <div class="border-b-2 border-[var(--dark-brown)] mb-4"></div>
          <div class="flex justify-between items-start text-2xl lg:text-3xl mb-4 font-semibold" style="font-family: var(--font-primary)">
            <h3 >{{ $t('parentsPrice.detailedBreakdown.insuranceSupport.title') }}</h3>
            <div >{{ $t('parentsPrice.detailedBreakdown.insuranceSupport.amount') }}</div>
          </div>
          <div class="space-y-1 leading-relaxed">
            <li> {{ $t('parentsPrice.detailedBreakdown.insuranceSupport.description1') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.insuranceSupport.description2') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.insuranceSupport.description3') }}</li>
          </div>
        </div>

        <!-- Additional Costs -->
        <div class="relative lg:mb-8 slide-right slide-delay-400">
          <div class="border-b-2 border-[var(--dark-brown)] mb-4"></div>
          <div class="flex justify-between items-start text-2xl lg:text-3xl mb-4 font-semibold" style="font-family: var(--font-primary)">
            <h3 >{{ $t('parentsPrice.detailedBreakdown.additionalCosts.title') }}</h3>
            <div >{{ $t('parentsPrice.detailedBreakdown.additionalCosts.amount') }}</div>
          </div>
          <div class="space-y-1 leading-relaxed">
            <li> {{ $t('parentsPrice.detailedBreakdown.additionalCosts.description1') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.additionalCosts.description2') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.additionalCosts.description3') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.additionalCosts.description4') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.additionalCosts.description5') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.additionalCosts.description6') }}</li>
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


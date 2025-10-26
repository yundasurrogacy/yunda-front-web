<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const { initScrollAnimation } = useScrollAnimation()

onMounted(() => {
  initScrollAnimation()
})
</script>

<template>
  <section class="w-full from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] bg-gradient-to-b px-4 py-16">
    <div class="mx-4 max-w-300 text-3.5 md:mx-auto lg:text-5">
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
        <!-- Surrogacy Agency Fees -->
        <div class="slide-left relative lg:mb-8">
          <div class="mb-4 border-b-2 border-[var(--dark-brown)]" />
          <div class="mb-4 flex items-start justify-between text-2xl font-semibold lg:text-3xl" style="font-family: var(--font-primary)">
            <h3>{{ $t('parentsPrice.detailedBreakdown.agencyFees.title') }}</h3>
            <div>{{ $t('parentsPrice.detailedBreakdown.agencyFees.amount') }}</div>
          </div>
          <div class="leading-relaxed space-y-1">
            <li> {{ $t('parentsPrice.detailedBreakdown.agencyFees.description1') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.agencyFees.description2') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.agencyFees.description3') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.agencyFees.description4') }}</li>
          </div>
        </div>

        <!-- Screening & Admin -->
        <div class="slide-right relative lg:mb-8">
          <div class="mb-4 border-b-2 border-[var(--dark-brown)]" />
          <div class="mb-4 flex items-start justify-between text-2xl font-semibold lg:text-3xl" style="font-family: var(--font-primary)">
            <h3>{{ $t('parentsPrice.detailedBreakdown.screeningAdmin.title') }}</h3>
            <div>{{ $t('parentsPrice.detailedBreakdown.screeningAdmin.amount') }}</div>
          </div>
          <div class="leading-relaxed space-y-1">
            <li> {{ $t('parentsPrice.detailedBreakdown.screeningAdmin.description1') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.screeningAdmin.description2') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.screeningAdmin.description3') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.screeningAdmin.description4') }}</li>
          </div>
        </div>

        <!-- Surrogate Compensation -->
        <div class="slide-left slide-delay-200 relative lg:mb-8">
          <div class="mb-4 border-b-2 border-[var(--dark-brown)]" />
          <div class="mb-4 flex items-start justify-between text-2xl font-semibold lg:text-3xl" style="font-family: var(--font-primary)">
            <h3>{{ $t('parentsPrice.detailedBreakdown.surrogateCompensation.title') }}</h3>
            <div>{{ $t('parentsPrice.detailedBreakdown.surrogateCompensation.amount') }}</div>
          </div>
          <div class="leading-relaxed space-y-1">
            <li> {{ $t('parentsPrice.detailedBreakdown.surrogateCompensation.description1') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.surrogateCompensation.description2') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.surrogateCompensation.description3') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.surrogateCompensation.description4') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.surrogateCompensation.description5') }}</li>
          </div>
        </div>

        <!-- Legal Fees -->
        <div class="slide-right slide-delay-200 relative lg:mb-8">
          <div class="mb-4 border-b-2 border-[var(--dark-brown)]" />
          <div class="mb-4 flex items-start justify-between text-2xl font-semibold lg:text-3xl" style="font-family: var(--font-primary)">
            <h3>{{ $t('parentsPrice.detailedBreakdown.legalFees.title') }}</h3>
            <div>{{ $t('parentsPrice.detailedBreakdown.legalFees.amount') }}</div>
          </div>
          <div class="leading-relaxed space-y-1">
            <li> {{ $t('parentsPrice.detailedBreakdown.legalFees.description1') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.legalFees.description2') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.legalFees.description3') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.legalFees.description4') }}</li>
          </div>
        </div>

        <!-- Insurance Support -->
        <div class="slide-left slide-delay-400 relative lg:mb-8">
          <div class="mb-4 border-b-2 border-[var(--dark-brown)]" />
          <div class="mb-4 flex items-start justify-between text-2xl font-semibold lg:text-3xl" style="font-family: var(--font-primary)">
            <h3>{{ $t('parentsPrice.detailedBreakdown.insuranceSupport.title') }}</h3>
            <div>{{ $t('parentsPrice.detailedBreakdown.insuranceSupport.amount') }}</div>
          </div>
          <div class="leading-relaxed space-y-1">
            <li> {{ $t('parentsPrice.detailedBreakdown.insuranceSupport.description1') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.insuranceSupport.description2') }}</li>
            <li> {{ $t('parentsPrice.detailedBreakdown.insuranceSupport.description3') }}</li>
          </div>
        </div>

        <!-- Additional Costs -->
        <div class="slide-right slide-delay-400 relative lg:mb-8">
          <div class="mb-4 border-b-2 border-[var(--dark-brown)]" />
          <div class="mb-4 flex items-start justify-between text-2xl font-semibold lg:text-3xl" style="font-family: var(--font-primary)">
            <h3>{{ $t('parentsPrice.detailedBreakdown.additionalCosts.title') }}</h3>
            <div>{{ $t('parentsPrice.detailedBreakdown.additionalCosts.amount') }}</div>
          </div>
          <div class="leading-relaxed space-y-1">
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

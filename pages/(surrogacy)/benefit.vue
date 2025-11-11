<script setup lang="ts">
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ConfidenceSection from '@/components/base/SUConfidenceSection.vue'
import HeroSection from '@/components/base/SUHeroSection.vue'
import BenefitCompensationSection from '@/components/surrogacy/benefit/CompensationSection.vue'
import BenefitFamilySupportSection from '@/components/surrogacy/benefit/FamilySupportSection.vue'
import BenefitPaymentScheduleSection from '@/components/surrogacy/benefit/PaymentScheduleSection.vue'
import BenefitProtectionSection from '@/components/surrogacy/benefit/ProtectionSection.vue'
import IntroVideoSection from '@/components/surrogacy/IntroVideoSection.vue'
</script>

<template>
  <div>
    <AppHeader />
    <HeroSection
      :title="$t('surrogacyBenefit.heroSection.title')"
      :description="$t('surrogacyBenefit.heroSection.description')"
      :button-text="$t('surrogacyBenefit.heroSection.button')"
    />
    <IntroVideoSection />
    <BenefitFamilySupportSection />
    <BenefitCompensationSection />
    <BenefitPaymentScheduleSection />
    <BenefitProtectionSection />
    <ConfidenceSection
      :title="$t('surrogacyBenefit.confidenceSection.title')"
      :description="$t('surrogacyBenefit.confidenceSection.description')"
      :button-text="$t('surrogacyBenefit.confidenceSection.button')"
    />
    <AppFooter />
  </div>
</template>

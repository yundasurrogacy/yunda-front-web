<template>
  <div>
    <AppHeader/>
    <HeroSection 
      :title="$t('surrogacyBenefit.heroSection.title')"
      :description="$t('surrogacyBenefit.heroSection.description')"
      :button-text="$t('surrogacyBenefit.heroSection.button')"
    />
    <BenefitFamilySupportSection />
    <BenefitCompensationSection />
    <BenefitPaymentScheduleSection />
    <BenefitProtectionSection />
    <ConfidenceSection 
      :title="$t('surrogacyBenefit.confidenceSection.title')"
      :description="$t('surrogacyBenefit.confidenceSection.description')"
      :button-text="$t('surrogacyBenefit.confidenceSection.button')"
    />
    <AppFooter/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/base/AppHeader.vue';
import AppFooter from '@/components/base/AppFooter.vue';
import HeroSection from '@/components/base/SUHeroSection.vue';
import BenefitFamilySupportSection from '@/components/surrogacy/benefit/FamilySupportSection.vue';
import BenefitCompensationSection from '@/components/surrogacy/benefit/CompensationSection.vue';
import BenefitPaymentScheduleSection from '@/components/surrogacy/benefit/PaymentScheduleSection.vue';
import BenefitProtectionSection from '@/components/surrogacy/benefit/ProtectionSection.vue';
import ConfidenceSection from '@/components/base/SUConfidenceSection.vue';
</script>
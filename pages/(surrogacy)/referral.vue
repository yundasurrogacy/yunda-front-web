<template>
  <div>
    <AppHeader/>
    <HeroSection 
      :title="$t('surrogacyReferral.heroSection.title')"
      :description="$t('surrogacyReferral.heroSection.description')"
      :button-text="$t('surrogacyReferral.heroSection.button')"
    />
    <ReferralWhyMattersSection />
    <ReferralEarningsSection />
    <ReferralEligibilitySection />
    <ReferralCompensationSection />
    <ConfidenceSection 
      :title="$t('surrogacyReferral.confidenceSection.title')"
      :description="$t('surrogacyReferral.confidenceSection.description')"
      :button-text="$t('surrogacyReferral.confidenceSection.button')"
    />
    <AppFooter/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/base/AppHeader.vue';
import AppFooter from '@/components/base/AppFooter.vue';
import HeroSection from '~/components/base/MailHeroSection.vue';
import ReferralWhyMattersSection from '@/components/surrogacy/referral/WhyMattersSection.vue';
import ReferralEarningsSection from '@/components/surrogacy/referral/EarningsSection.vue';
import ReferralEligibilitySection from '@/components/surrogacy/referral/EligibilitySection.vue';
import ReferralCompensationSection from '@/components/surrogacy/referral/CompensationSection.vue';
import ConfidenceSection from '@/components/base/USConfidenceSection.vue';
</script>
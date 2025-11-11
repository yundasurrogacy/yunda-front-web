<script setup lang="ts">
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ConfidenceSection from '@/components/base/USConfidenceSection.vue'
import ReferralCompensationSection from '@/components/surrogacy/referral/CompensationSection.vue'
import ReferralEarningsSection from '@/components/surrogacy/referral/EarningsSection.vue'
import ReferralEligibilitySection from '@/components/surrogacy/referral/EligibilitySection.vue'
import ReferralWhyMattersSection from '@/components/surrogacy/referral/WhyMattersSection.vue'
import IntroVideoSection from '@/components/surrogacy/IntroVideoSection.vue'
import HeroSection from '~/components/base/MailHeroSection.vue'
</script>

<template>
  <div>
    <AppHeader />
    <HeroSection
      :title="$t('surrogacyReferral.heroSection.title')"
      :description="$t('surrogacyReferral.heroSection.description')"
      :button-text="$t('surrogacyReferral.heroSection.button')"
    />
    <IntroVideoSection />
    <ReferralWhyMattersSection />
    <ReferralEarningsSection />
    <ReferralEligibilitySection />
    <ReferralCompensationSection />
    <ConfidenceSection
      :title="$t('surrogacyReferral.confidenceSection.title')"
      :description="$t('surrogacyReferral.confidenceSection.description')"
      :button-text="$t('surrogacyReferral.confidenceSection.button')"
    />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ConfidenceSection from '@/components/base/SUConfidenceSection.vue'
import HeroSection from '@/components/base/SUHeroSection.vue'
import EligibilityQualificationsSection from '@/components/surrogacy/eligibility/QualificationsSection.vue'
import IntroVideoSection from '@/components/surrogacy/IntroVideoSection.vue'
</script>

<template>
  <div>
    <AppHeader />
    <HeroSection
      :title="$t('surrogacyEligibility.heroSection.title')"
      :description="$t('surrogacyEligibility.heroSection.description')"
      :button-text="$t('surrogacyEligibility.heroSection.button')"
    />
    <IntroVideoSection />
    <EligibilityQualificationsSection />
    <ConfidenceSection
      :title="$t('surrogacyEligibility.confidenceSection.title')"
      :description="$t('surrogacyEligibility.confidenceSection.description')"
      :button-text="$t('surrogacyEligibility.confidenceSection.button')"
    />
    <AppFooter />
  </div>
</template>

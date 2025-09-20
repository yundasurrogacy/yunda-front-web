<template>
  <div>
    <AppHeader/>
    <HeroSection 
      :title="$t('surrogacyScreening.heroSection.title')"
      :description="$t('surrogacyScreening.heroSection.description')"
      :button-text="$t('surrogacyScreening.heroSection.button')"
    />
    <ScreeningProcessSection />
    <ConfidenceSection 
      :title="$t('surrogacyScreening.confidenceSection.title')"
      :description="$t('surrogacyScreening.confidenceSection.description')"
      :button-text="$t('surrogacyScreening.confidenceSection.button')"
    />
    <AppFooter/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/base/AppHeader.vue';
import AppFooter from '@/components/base/AppFooter.vue';
import HeroSection from '@/components/base/SUHeroSection.vue';
import ScreeningProcessSection from '@/components/surrogacy/screening/ProcessSection.vue';
import ConfidenceSection from '@/components/base/SUConfidenceSection.vue';
</script>
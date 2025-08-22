<template>
  <div>
    <AppHeader />
    <HeroSection 
      :title="$t('eggDonation.heroSection.title')" 
      :description="`${$t('eggDonation.heroSection.description1')} ${$t('eggDonation.heroSection.description2')}`"
      :button-text="$t('eggDonation.heroSection.button')" />
    <StepsTimeline />
    <UsProcess />
    <FrozenEggs />
    <ConfidenceSection
      :title="$t('eggDonation.confidenceSection.title')"
      :description="$t('eggDonation.confidenceSection.description')"
      :button-text="$t('eggDonation.confidenceSection.button')" />
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/base/AppHeader.vue';
import AppFooter from '@/components/base/AppFooter.vue';
import HeroSection from '@/components/base/HeroSection.vue';
import ConfidenceSection from '@/components/base/ConfidenceSection.vue';
import StepsTimeline from '@/components/parents/egg/StepsTimeline.vue';
import UsProcess from '@/components/parents/egg/UsProcess.vue';
import FrozenEggs from '@/components/parents/egg/FrozenEggs.vue';
</script>

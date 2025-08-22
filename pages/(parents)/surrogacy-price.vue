<template>
  <div>
    <AppHeader/>
    <HeroSection 
      :title="$t('parentsPrice.heroSection.title')"
      :description="$t('parentsPrice.heroSection.description')"
      :button-text="$t('menu.becomeAParent')"
    />
    <PriceCostOverview />
    <PriceDetailedBreakdown />
    <PriceAdditionalTerms />
    <ConfidenceSection 
      :title="$t('parentsPrice.confidenceSection.title')"
      :description="$t('parentsPrice.confidenceSection.description')"
      :button-text="$t('menu.becomeAParent')"
    />
    <AppFooter/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/base/AppHeader.vue';
import AppFooter from '@/components/base/AppFooter.vue';
import HeroSection from '@/components/base/HeroSection.vue';
import PriceCostOverview from '@/components/parents/price/CostOverview.vue';
import PriceDetailedBreakdown from '@/components/parents/price/DetailedBreakdown.vue';
import PriceAdditionalTerms from '@/components/parents/price/AdditionalTerms.vue';
import ConfidenceSection from '@/components/base/ConfidenceSection.vue';
</script>
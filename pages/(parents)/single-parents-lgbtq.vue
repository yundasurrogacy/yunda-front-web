<template>
  <div>
    <AppHeader/>
    <HeroSection 
      :title="$t('parentsSingle.heroSection.title')"
      :description="$t('parentsSingle.heroSection.description')"
      :button-text="$t('parentsSingle.heroSection.button')"
    />
    <SingleTestimonialSection />
    <SingleOfferSection />
    <SingleFAQSection />
    <ConfidenceSection 
      :title="$t('parentsSingle.confidenceSection.title')"
      :description="$t('parentsSingle.confidenceSection.description')"
      :button-text="$t('parentsSingle.confidenceSection.button')"
    />
    <AppFooter/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/base/AppHeader.vue';
import AppFooter from '@/components/base/AppFooter.vue';
import HeroSection from '@/components/base/HeroSection.vue';
import SingleTestimonialSection from '@/components/parents/single/TestimonialSection.vue';
import SingleOfferSection from '@/components/parents/single/OfferSection.vue';
import SingleFAQSection from '@/components/parents/single/FAQSection.vue';
import ConfidenceSection from '@/components/base/ConfidenceSection.vue';
</script>
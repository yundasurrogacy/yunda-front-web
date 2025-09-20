<template>
  <div>
    <AppHeader/>
    <HeroSection 
      :title="$t('parentsIvf.heroSection.title')"
      :description="$t('parentsIvf.heroSection.description')"
      :button-text="$t('parentsIvf.heroSection.button')"
    />
    <IvfSupportSection />
    <IvfMedicalServicesSection />
    <IvfClinicsSection />
    <IvfFAQSection />
    <ConfidenceSection 
      :title="$t('parentsIvf.confidenceSection.title')"
      :description="$t('parentsIvf.confidenceSection.description')"
      :button-text="$t('parentsIvf.confidenceSection.button')"
    />
    <AppFooter/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/base/AppHeader.vue';
import AppFooter from '@/components/base/AppFooter.vue';
import HeroSection from '~/components/base/HeroSection.vue';
import IvfSupportSection from '@/components/parents/ivf/SupportSection.vue';
import IvfMedicalServicesSection from '@/components/parents/ivf/MedicalServicesSection.vue';
import IvfClinicsSection from '@/components/parents/ivf/ClinicsSection.vue';
import IvfFAQSection from '@/components/parents/ivf/FAQSection.vue';
import ConfidenceSection from '@/components/base/ConfidenceSection.vue';
</script>
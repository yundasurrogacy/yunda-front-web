<script setup lang="ts">
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ConfidenceSection from '@/components/base/ConfidenceSection.vue'
import HeroSection from '@/components/base/HeroSection.vue'
import ProcessStepDetail from '@/components/parents/process/StepDetail.vue'
import ProcessStepsTimeline from '@/components/parents/process/StepsTimeline.vue'
</script>

<template>
  <div>
    <AppHeader />
    <HeroSection
      :title="$t('parentsProcess.processHeroSection.title')"
      :description="$t('parentsProcess.processHeroSection.description')"
      :button-text="$t('parentsProcess.processHeroSection.button')"
    />
    <ProcessStepsTimeline />
    <div class="from-[#FAF7F2] via-[#FBF0DA] to-[#FAF7F2] bg-gradient-to-b">
      <ProcessStepDetail
        v-for="stepNumber in 6"
        :key="stepNumber"
        :step-number="stepNumber"
      />
    </div>
    <ConfidenceSection
      :title="$t('parentsProcess.confidenceSection.title')"
      :description="`${$t('parentsProcess.confidenceSection.description1')} ${$t('parentsProcess.confidenceSection.description2')}`"
      :button-text="$t('parentsProcess.processHeroSection.button')"
    />
    <AppFooter />
  </div>
</template>

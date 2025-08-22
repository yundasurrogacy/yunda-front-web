<template>
  <div>
    <AppHeader/>
    <HeroSection 
      :title="$t('surrogacyJourney.heroSection.title')"
      :description="$t('surrogacyJourney.heroSection.description')"
      :button-text="$t('surrogacyJourney.heroSection.button')"
    />
    <!-- <VideoPlayer
      :video-src="'/videos/video1.mp4'"
      :background-color="'#FAF7F2'"
      :controls="true"
      :autoplay="false"
     /> -->
    <JourneyStepsTimeline />
    <JourneyTestimonialsSection />
    <ConfidenceSection 
      :title="$t('surrogacyJourney.confidenceSection.title')"
      :description="$t('surrogacyJourney.confidenceSection.description')"
      :button-text="$t('surrogacyJourney.confidenceSection.button')"
    />
    <AppFooter/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/base/AppHeader.vue';
import AppFooter from '@/components/base/AppFooter.vue';
import HeroSection from '@/components/base/SUHeroSection.vue';
import JourneyStepsTimeline from '@/components/surrogacy/journey/StepsTimeline.vue';
import JourneyTestimonialsSection from '@/components/surrogacy/journey/TestimonialsSection.vue';
import ConfidenceSection from '@/components/base/SUConfidenceSection.vue';
import VideoPlayer from '~/components/base/VideoPlayer.vue';
</script>
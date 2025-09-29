<template>
  <div>
    <AppHeader />
      <h1 class="text-center text-3xl font-bold mt-6 mb-2">
        {{$t('home.siteTitle')}}
      </h1>
    <HeroSection />
    <StatsSection />
    <GlobalSupportSection />
    <LegalExpertiseSection />
    <SurrogateCareSection />
    <CommitmentSection />
    <!-- <VideoPlayer
      :video-src="'/videos/video1.mp4'"
      :background-color="'#A9A67D'"
      :controls="true"
      :autoplay="false"
     /> -->
    <JourneySection />
    <CostSection />
    <AppFooter />
  </div>
</template>

<script setup>
import AppHeader from '../components/base/AppHeader.vue';
import AppFooter from '../components/base/AppFooter.vue';
import HeroSection from '../components/home/HeroSection.vue';
import StatsSection from '../components/home/StatsSection.vue';
import GlobalSupportSection from '../components/home/GlobalSupportSection.vue';
import LegalExpertiseSection from '../components/home/LegalExpertiseSection.vue';
import SurrogateCareSection from '../components/home/SurrogateCareSection.vue';
import CommitmentSection from '../components/home/CommitmentSection.vue';
import JourneySection from '../components/home/JourneySection.vue';
import CostSection from '../components/home/CostSection.vue';
import VideoPlayer from '~/components/base/VideoPlayer.vue';
</script>

<style scoped>
</style>
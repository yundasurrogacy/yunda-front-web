<template>
  <div>
    <AppHeader />
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
import AppFooter from '../components/base/AppFooter.vue'
import AppHeader from '../components/base/AppHeader.vue'
import CommitmentSection from '../components/home/CommitmentSection.vue'
import CostSection from '../components/home/CostSection.vue'
import GlobalSupportSection from '../components/home/GlobalSupportSection.vue'
import HeroSection from '../components/home/HeroSection.vue'
import JourneySection from '../components/home/JourneySection.vue'
import LegalExpertiseSection from '../components/home/LegalExpertiseSection.vue'
import StatsSection from '../components/home/StatsSection.vue'
import SurrogateCareSection from '../components/home/SurrogateCareSection.vue'

const { t } = useI18n()

// SEO 配置
useHead({
  title: t('home.meta.title'),
  meta: [
    {
      name: 'description',
      content: t('home.meta.description'),
    },
    {
      property: 'og:title',
      content: t('home.meta.title'),
    },
    {
      property: 'og:description',
      content: t('home.meta.description'),
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'keywords',
      content: t('home.meta.keywords'),
    },
  ],
})
</script>

<style scoped>
</style>
<script setup>
import AboutCareerSection from '../components/about/CareerSection.vue'
import AboutHeroSection from '../components/about/HeroSection.vue'
import PhotoGallerySection from '../components/about/PhotoGallerySection.vue'
import AboutTeamSection from '../components/about/TeamSection.vue'
import AppFooter from '../components/base/AppFooter.vue'
import AppHeader from '../components/base/AppHeader.vue'

const { t } = useI18n()

useHead({
  title: t('about.meta.title'),
  meta: [
    {
      name: 'description',
      content: t('about.meta.description'),
    },
  ],
})
</script>

<template>
  <div>
    <AppHeader />
    <AboutHeroSection />
    <AboutTeamSection />
    <PhotoGallerySection />
    <AboutCareerSection />
    <AppFooter />
  </div>
</template>

<style scoped></style>

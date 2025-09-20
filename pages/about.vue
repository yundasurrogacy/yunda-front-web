<template>
    <div>
        <AppHeader />
        <AboutHeroSection />
        <AboutTeamSection />
        <AboutCareerSection />
        <AppFooter />
    </div>
</template>

<script setup>
import AppHeader from '../components/base/AppHeader.vue';
import AppFooter from '../components/base/AppFooter.vue';
import AboutHeroSection from '../components/about/HeroSection.vue';
import AboutTeamSection from '../components/about/TeamSection.vue';
import AboutCareerSection from '../components/about/CareerSection.vue';

const { t } = useI18n()

useHead({
    title: t('about.meta.title'),
    meta: [
        {
            name: 'description',
            content: t('about.meta.description')
        }
    ]
})
</script>

<style scoped></style>
<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ConfidenceSection from '@/components/base/ConfidenceSection.vue'
import HeroSection from '@/components/base/HeroSection.vue'
import ProcessStepDetail from '@/components/parents/process/StepDetail.vue'
import ProcessStepsTimeline from '@/components/parents/process/StepsTimeline.vue'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const stepKeys = ['step1', 'step2', 'step3', 'step4', 'step5', 'step6'] as const

const parentProcessSteps = computed(() => stepKeys.map(key => ({
  title: `${t(`parentsProcess.surrogacyProcess.${key}.title`)} (${t(`parentsProcess.surrogacyProcess.${key}.duration`)})`,
  text: t(`parentsProcess.surrogacyProcess.${key}.description`),
})))

const parentProcessFaqs = computed(() => stepKeys.map(key => ({
  question: t(`parentsProcess.surrogacyProcess.${key}.title`),
  answer: t(`parentsProcess.surrogacyProcess.${key}.description`),
})))

const parentHowToSchema = computed(() => buildHowToSchema({
  name: t('parentsProcess.processHeroSection.title'),
  description: t('parentsProcess.processHeroSection.description'),
  steps: parentProcessSteps.value,
  baseUrl: siteUrl.value || undefined,
  url: '/surrogacy-process',
  locale: locale.value,
}))

const parentFaqSchema = computed(() => buildFAQPageSchema({
  name: `${t('parentsProcess.stepsTimeline.title')} FAQ`,
  description: t('parentsProcess.confidenceSection.description1'),
  faqs: parentProcessFaqs.value,
  baseUrl: siteUrl.value || undefined,
  url: '/surrogacy-process',
  locale: locale.value,
}))

useHead(() => {
  const scripts = []
  if (parentHowToSchema.value) {
    scripts.push({
      key: 'schema-surrogacy-process-howto',
      type: 'application/ld+json',
      children: JSON.stringify(parentHowToSchema.value),
    })
  }
  if (parentFaqSchema.value) {
    scripts.push({
      key: 'schema-surrogacy-process-faq',
      type: 'application/ld+json',
      children: JSON.stringify(parentFaqSchema.value),
    })
  }
  return scripts.length ? { script: scripts } : {}
})
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

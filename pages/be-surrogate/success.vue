<script setup lang="ts">
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('surrogate.application.successPage.title'),
  description: () => t('surrogate.application.successPage.description'),
  robots: 'noindex,follow',
})
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-[var(--yunda-petal)]">
    <AppHeader />
    <div class="relative mx-auto mt-20 max-w-300 px-4 py-16 text-center lg:px-0">
      <div class="mb-12 rounded-5 bg-[var(--yunda-petal)] p-12 shadow-lg">
        <h1 class="mb-6 font-display text-[32px] text-[var(--yunda-bark)] font-semibold leading-[1.1] lg:text-[50px]">
          {{ $t('surrogate.application.successPage.title') }}
        </h1>
        <p class="mx-auto mb-8 max-w-2xl font-sans text-base leading-[1.75] text-[var(--yunda-bark)] lg:text-[17px]" style="font-family: var(--font-text)">
          {{ $t('surrogate.application.successPage.message') }}
        </p>
        <NuxtLink
          :to="localePath('/')"
          class="yunda-type-button inline-flex rounded-2.5 bg-[var(--yunda-bark)] px-8 py-3 text-base text-[var(--yunda-petal)] tracking-[0.02em] transition-opacity hover:opacity-90"
        >
          {{ $t('surrogate.application.successPage.backHome') }}
        </NuxtLink>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

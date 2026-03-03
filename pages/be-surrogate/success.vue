<script setup lang="ts">
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'

const { t } = useI18n()
const localePath = useLocalePath()

useSeoMeta({
  title: () => t('surrogate.application.successPage.title'),
  description: () => t('surrogate.application.successPage.description'),
})
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-[var(--head-bg)]">
    <AppHeader />
    <div class="relative mx-auto mt-20 max-w-300 px-4 py-16 text-center lg:px-0">
      <div class="mb-12 rounded-5 bg-[var(--foot-bg)] p-12 shadow-lg">
        <h1 class="mb-6 text-8 font-semibold" style="font-family: var(--font-primary)">
          {{ $t('surrogate.application.successPage.title') }}
        </h1>
        <p class="mx-auto mb-8 max-w-2xl text-5 leading-relaxed text-[var(--dark-brown)]">
          {{ $t('surrogate.application.successPage.message') }}
        </p>
        <NuxtLink
          :to="localePath('/')"
          class="inline-flex rounded-2.5 bg-[var(--grayish-green)] px-8 py-3 text-5 font-semibold text-[#FFFCF6] transition-opacity hover:opacity-90"
        >
          {{ $t('surrogate.application.successPage.backHome') }}
        </NuxtLink>
      </div>
    </div>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

// 合作伙伴/协会 logo 数据
const partners = [
  { name: 'ASRM', logo: '/images/asrm-logo.svg', url: null },
  { name: 'ATR', logo: '/images/ART-Risk-LOGO-NEW.png', url: null },
  { name: 'SEEDSTrust', logo: '/images/SeedTrust-Logo-Stacked.png', url: null },
  { name: 'MHB', logo: '/images/mhb-logo.png', url: null },
]
</script>

<template>
  <section class="border-b border-t border-[var(--primary-brown)]/20 from-[var(--head-bg)] via-[var(--head-bg)] to-white bg-gradient-to-b px-4 py-16 md:px-20 md:py-24">
    <div class="mx-auto max-w-320">
      <h2 class="scroll-animate mb-12 text-center text-7.5 font-semibold md:text-10" style="font-family: var(--font-primary)">
        {{ $t('home.associationSection.title') }}
      </h2>
      <div class="scroll-animate scroll-animate-delay-100 flex flex-wrap items-center justify-center gap-8 lg:gap-16 md:gap-12">
        <template v-for="(partner, index) in partners" :key="index">
          <a
            v-if="partner.url"
            :href="partner.url"
            target="_blank"
            rel="noopener noreferrer"
            class="h-16 flex items-center justify-center transition-opacity lg:h-24 md:h-20 hover:opacity-80"
          >
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="h-full w-auto object-contain"
              loading="lazy"
            >
          </a>
          <div
            v-else
            class="h-16 flex items-center justify-center lg:h-24 md:h-20"
          >
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="h-full w-auto object-contain"
              loading="lazy"
            >
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>

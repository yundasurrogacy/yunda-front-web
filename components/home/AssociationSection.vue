<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const props = withDefaults(
  defineProps<{ variant?: 'default' | 'plain' }>(),
  { variant: 'default' },
)

useScrollAnimation()

// 合作伙伴/协会 logo 数据
const partners = [
  { name: 'ASRM', logo: '/images/asrm-logo.svg', url: null },
  { name: 'ATR', logo: '/images/ART-Risk-LOGO-NEW.png', url: null },
  { name: 'SEEDSTrust', logo: '/images/SeedTrust-Logo-Stacked.png', url: null, logoClass: 'scale-120' },
  { name: 'MHB', logo: '/images/mhb-logo-transparent.png', url: null },
  { name: 'RESOLVE', logo: '/images/resolve-logo.png', url: null, logoClass: 'scale-110' },
]
</script>

<template>
  <section
    class="px-4 py-12 md:px-20 md:py-16"
    :class="
      props.variant === 'plain'
        ? 'bg-[var(--yunda-petal)]'
        : 'bg-[var(--yunda-petal)]'
    "
  >
    <div class="mx-auto max-w-320">
      <h2 class="scroll-animate mb-12 text-center text-7.5 font-semibold md:text-10" >
        {{ $t('home.associationSection.title') }}
      </h2>
      <div class="scroll-animate scroll-animate-delay-100 flex flex-nowrap items-center justify-center gap-5 md:gap-8 lg:gap-10">
        <template v-for="(partner, index) in partners" :key="index">
          <a
            v-if="partner.url"
            :href="partner.url"
            target="_blank"
            rel="noopener noreferrer"
            class="h-16 min-w-0 flex items-center justify-center transition-opacity lg:h-24 md:h-20 hover:opacity-80"
          >
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="h-full w-auto object-contain"
              :class="partner.logoClass"
              loading="lazy"
            >
          </a>
          <div
            v-else
            class="h-16 min-w-0 flex items-center justify-center lg:h-24 md:h-20"
          >
            <img
              :src="partner.logo"
              :alt="partner.name"
              class="h-full w-auto object-contain"
              :class="partner.logoClass"
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

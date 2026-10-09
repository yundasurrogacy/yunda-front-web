<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const props = withDefaults(
  defineProps<{ variant?: 'default' | 'plain' }>(),
  { variant: 'default' },
)

useScrollAnimation()

// 合作伙伴/协会 logo 数据
const partners = [
  { name: 'ASRM', logo: '/images/shared/associations/asrm.svg', url: 'https://www.asrm.org/', width: 300, height: 120 },
  { name: 'MHB', logo: '/images/shared/associations/men-having-babies.webp', url: 'https://surrogacyadvisor.menhavingbabies.org/providers/583?back=public.directory_agency', width: 230, height: 113 },
  { name: 'RESOLVE', logo: '/images/shared/associations/resolve.webp', url: 'https://resolve.org/about-us/team/corporate-council/', width: 600, height: 600, logoClass: 'scale-110' },
  { name: 'ART', logo: '/images/shared/associations/art-risk.webp', url: 'https://artrisksolutions.com/', width: 694, height: 206 },
  { name: 'SeedTrust', logo: '/images/shared/associations/seedtrust.webp', url: 'https://seedtrustescrow.com/', width: 2000, height: 1139, logoClass: 'scale-120' },
  { name: 'ClarityTrust', logo: '/images/shared/associations/claritytrust.svg', url: 'https://www.claritytrustservices.com/', width: 142, height: 48 },
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
      <div class="scroll-animate scroll-animate-delay-100 grid grid-cols-3 items-center justify-items-center gap-x-5 gap-y-8 md:flex md:flex-nowrap md:justify-center md:gap-8 lg:gap-10">
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
              :width="partner.width"
              :height="partner.height"
              loading="lazy"
              decoding="async"
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
              :width="partner.width"
              :height="partner.height"
              loading="lazy"
              decoding="async"
            >
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>

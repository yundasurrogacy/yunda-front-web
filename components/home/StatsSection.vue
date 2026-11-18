<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

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
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <picture class="block h-full w-full">
        <source srcset="/images/pages/home/stats-background.webp" type="image/webp">
        <img
          class="h-full w-full object-cover object-center"
          src="/images/pages/home/stats-background.webp"
          :alt="$t('home.statsSection.chooseUsTitle')"
          width="1920"
          height="1080"
          loading="lazy"
          decoding="async"
        >
      </picture>
      <div class="absolute inset-0 bg-[rgba(255,252,248,0.78)] backdrop-blur-[2px]" />
    </div>

    <div class="relative z-[1] mx-auto max-w-320 px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-16">
      <div class="stats-columns">
        <div class="stats-column scroll-animate lg:pr-12 xl:pr-16">
          <h2
            class="font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:text-[42px]"
          >
            {{ $t('home.statsSection.chooseUsTitle') }}
          </h2>
          <div class="stats-copy space-y-4 md:space-y-5">
            <p>
              {{ $t('home.statsSection.chooseUsParagraph1') }}
            </p>
            <p>
              {{ $t('home.statsSection.chooseUsParagraph2') }}
            </p>
          </div>
        </div>

        <div class="stats-column scroll-animate scroll-animate-delay-100 lg:border-l lg:border-[var(--yunda-bark)]/20 lg:pl-12 xl:pl-16">
          <h3
            class="font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:text-[42px]"
          >
            {{ $t('home.statsSection.advantagesTitle') }}
          </h3>
          <ul
            class="stats-copy space-y-4 md:space-y-5"
          >
            <li class="pl-[1.4em] -indent-[1.4em]">
              {{ $t('home.statsSection.advantage1a') }}<strong>{{ $t('home.statsSection.advantage1b') }}</strong>
            </li>
            <li class="pl-[1.4em] -indent-[1.4em]">
              {{ $t('home.statsSection.advantage2a') }}<strong>{{ $t('home.statsSection.advantage2b') }}</strong>
            </li>
            <li class="pl-[1.4em] -indent-[1.4em]">
              {{ $t('home.statsSection.advantage3a') }}<strong>{{ $t('home.statsSection.advantage3b') }}</strong>{{ $t('home.statsSection.advantage3c') }}
            </li>
            <li class="pl-[1.4em] -indent-[1.4em]">
              {{ $t('home.statsSection.advantage4a') }}<strong>{{ $t('home.statsSection.advantage4b') }}</strong>{{ $t('home.statsSection.advantage4c') }}
            </li>
          </ul>
        </div>
      </div>

      <div class="pb-6 pt-12 lg:pb-10 lg:pt-16 md:pb-8 md:pt-14">
        <h2
          class="scroll-animate scroll-animate-delay-200 mb-8 text-center font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:mb-10 md:text-[42px]"
        >
          {{ $t('home.associationSection.title') }}
        </h2>
        <div class="scroll-animate scroll-animate-delay-300 grid grid-cols-3 items-center justify-items-center gap-x-5 gap-y-8 md:flex md:flex-nowrap md:justify-center md:gap-8 lg:gap-10">
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
    </div>
  </section>
</template>

<style scoped>
.stats-columns {
  display: grid;
  gap: 2.5rem;
}

.stats-column {
  display: grid;
  align-content: start;
  gap: 1.5rem;
}

.stats-column h2,
.stats-column h3 {
  margin: 0;
  text-transform: capitalize;
}

.stats-copy {
  margin: 0;
  font-family: var(--font-text);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.75;
  color: var(--yunda-bark);
}

@media (min-width: 768px) {
  .stats-copy {
    font-size: 17px;
  }
}

@media (min-width: 1024px) {
  .stats-columns {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 0;
    row-gap: 2rem;
  }

  .stats-column {
    grid-row: span 2;
    grid-template-rows: subgrid;
  }
}
</style>

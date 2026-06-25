<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

const partners = [
  { name: 'ASRM', logo: '/images/asrm-logo.svg', url: null },
  { name: 'ATR', logo: '/images/ART-Risk-LOGO-NEW.png', url: null },
  { name: 'SEEDSTrust', logo: '/images/SeedTrust-Logo-Stacked.png', url: null, logoClass: 'scale-120' },
  { name: 'MHB', logo: '/images/mhb-logo-transparent.png', url: null },
  { name: 'RESOLVE', logo: '/images/resolve-logo.png', url: null, logoClass: 'scale-110' },
]
</script>

<template>
  <section class="relative overflow-hidden">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <picture class="block h-full w-full">
        <source srcset="/images/home/home-redesign/why-choose-advantages-bg.webp" type="image/webp">
        <img
          class="h-full w-full object-cover object-center"
          src="/images/home/home-redesign/why-choose-advantages-bg.png"
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
      <div class="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-0">
        <div class="scroll-animate flex-1 lg:pr-12 xl:pr-16">
          <h2
            class="font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:text-[42px]"
          >
            {{ $t('home.statsSection.chooseUsTitle') }}
          </h2>
          <div class="lg:mt-8 lg:flex lg:flex-1 lg:flex-col lg:justify-center">
            <p
              class="mt-6 font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:text-[17px] lg:mt-0"
            >
              {{ $t('home.statsSection.chooseUsParagraph1') }}
            </p>
            <p
              class="mt-4 font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:mt-5 md:text-[17px]"
            >
              {{ $t('home.statsSection.chooseUsParagraph2') }}
            </p>
          </div>
        </div>

        <div
          class="hidden w-px shrink-0 self-stretch bg-[var(--yunda-bark)]/20 lg:block"
          aria-hidden="true"
        />

        <div class="scroll-animate scroll-animate-delay-100 flex-1 lg:pl-12 xl:pl-16">
          <h3
            class="font-sans text-[24px] text-[var(--yunda-bark)] font-bold leading-[1.25] md:text-[30px]"
            style="font-family: var(--font-text)"
          >
            {{ $t('home.statsSection.advantagesTitle') }}
          </h3>
          <ul
            class="mt-6 font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:mt-7 md:space-y-5 md:text-[17px] space-y-4"
            style="font-family: var(--font-text)"
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
        <div class="scroll-animate scroll-animate-delay-300 flex flex-nowrap items-center justify-center gap-5 md:gap-8 lg:gap-10">
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
    </div>
  </section>
</template>

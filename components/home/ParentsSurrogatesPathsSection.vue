<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const localePath = useLocalePath()
useScrollAnimation()
</script>

<template>
  <section class="bg-[#FAF1E0] px-4 py-16 md:px-20 md:py-24">
    <div class="mx-auto grid max-w-320 grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-16 lg:gap-x-20">
      <!-- Intended parents: costs -->
      <div class="scroll-animate space-y-6">
        <div style="font-family: var(--font-primary)">
          <h2 class="text-7.5 font-semibold md:text-10">
            {{ $t('home.costSection.title1') }}
          </h2>
          <p class="mt-2 text-6 md:text-8">
            {{ $t('home.costSection.title2') }}
          </p>
        </div>
        <p
          class="text-4.5 leading-relaxed text-[var(--dark-brown)]"
          style="font-family: var(--font-secondary)"
        >
          {{ $t('home.costSection.description1') }}
        </p>
        <p class="text-4.5 font-medium uppercase tracking-wide text-[var(--dark-brown)] md:text-5">
          {{ $t('home.costSection.description2') }}
        </p>
        <ul class="space-y-4 pl-1" style="font-family: var(--font-secondary)">
          <li class="flex items-start gap-3">
            <span class="mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary-brown)]" />
            <span>{{ $t('home.costSection.item1') }}</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary-brown)]" />
            <span>{{ $t('home.costSection.item2') }}</span>
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary-brown)]" />
            <span>{{ $t('home.costSection.item3') }}</span>
          </li>
        </ul>
        <p
          class="text-4.5 leading-relaxed text-[var(--dark-brown)]"
          style="font-family: var(--font-secondary)"
        >
          {{ $t('home.costSection.description4') }}
        </p>
        <NuxtLink
          :to="localePath('/surrogacy-process')"
          class="inline-flex rounded-2.5 bg-[var(--grayish-green)] px-6 py-3 text-4 font-semibold text-white uppercase tracking-wide transition hover:opacity-90"
        >
          {{ $t('home.parentsSurrogatesSection.parentsCta') }}
        </NuxtLink>
      </div>

      <!-- Surrogates -->
      <div class="scroll-animate scroll-animate-delay-100 space-y-6">
        <div style="font-family: var(--font-primary)">
          <h2 class="text-7.5 font-semibold md:text-10">
            {{ $t('home.parentsSurrogatesSection.surrogateTitle') }}
          </h2>
          <p class="mt-2 text-6 md:text-8">
            {{ $t('home.parentsSurrogatesSection.surrogateSubtitle') }}
          </p>
        </div>
        <p
          class="text-4.5 leading-relaxed text-[var(--dark-brown)]"
          style="font-family: var(--font-secondary)"
        >
          {{ $t('home.parentsSurrogatesSection.surrogateIntro') }}
        </p>
        <ul class="list-disc space-y-3 pl-6 text-4.5 text-[var(--dark-brown)] md:text-5" style="font-family: var(--font-secondary)">
          <li>{{ $t('home.parentsSurrogatesSection.surrogateBullet1') }}</li>
          <li>{{ $t('home.parentsSurrogatesSection.surrogateBullet2') }}</li>
          <li>{{ $t('home.parentsSurrogatesSection.surrogateBullet3') }}</li>
        </ul>
        <p
          class="text-4.5 leading-relaxed text-[var(--dark-brown)]"
          style="font-family: var(--font-secondary)"
        >
          {{ $t('home.parentsSurrogatesSection.surrogateOutro') }}
        </p>
        <NuxtLink
          :to="localePath('/journey')"
          class="inline-flex rounded-2.5 border-2 border-[var(--grayish-green)] bg-transparent px-6 py-3 text-4 font-semibold text-[var(--grayish-green)] uppercase tracking-wide transition hover:bg-[var(--grayish-green)] hover:text-white"
        >
          {{ $t('home.parentsSurrogatesSection.surrogateCta') }}
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

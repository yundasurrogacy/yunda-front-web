<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const localePath = useLocalePath()
const { t } = useI18n()
useScrollAnimation()
</script>

<template>
  <section class="bg-[var(--head-bg)] px-4 pb-12 pt-0 md:px-12 md:pb-16 md:pt-0 lg:px-20 lg:pt-0">
    <div class="mx-auto max-w-320">
      <div class="flex flex-col gap-16 lg:gap-22 xl:gap-28">
        <!-- 准父母：大屏左文右图；小屏上文下图 -->
        <div class="scroll-animate scroll-animate-delay-100 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div class="order-2 space-y-6 lg:order-1">
            <div style="font-family: var(--font-primary)">
              <h2 class="text-[30px] font-semibold">
                {{ $t('home.costSection.title2') }}
              </h2>
            </div>
            <p
              class="text-4.5 text-[var(--dark-brown)] leading-relaxed"
              style="font-family: var(--font-secondary)"
            >
              {{ $t('home.costSection.description1') }}
            </p>
            <p class="text-4.5 text-[var(--dark-brown)] font-medium md:text-5" style="font-family: var(--font-secondary)">
              {{ $t('home.costSection.description2') }}
            </p>
            <ul class="pl-1 space-y-4" style="font-family: var(--font-secondary)">
              <li class="flex items-start gap-3">
                <span class="mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary-brown)]" />
                <span class="text-4.5 text-[var(--dark-brown)] leading-relaxed md:text-5">{{ $t('home.costSection.item1') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary-brown)]" />
                <span class="text-4.5 text-[var(--dark-brown)] leading-relaxed md:text-5">{{ $t('home.costSection.item2') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--primary-brown)]" />
                <span class="text-4.5 text-[var(--dark-brown)] leading-relaxed md:text-5">{{ $t('home.costSection.item3') }}</span>
              </li>
            </ul>
            <p
              class="text-4.5 text-[var(--dark-brown)] leading-relaxed"
              style="font-family: var(--font-secondary)"
            >
              {{ $t('home.costSection.description4') }}
            </p>
            <NuxtLink
              :to="localePath('/surrogacy-process')"
              class="inline-flex rounded-2.5 bg-[var(--grayish-green)] px-6 py-3 text-4 text-white font-semibold tracking-wide uppercase transition hover:opacity-90"
            >
              {{ $t('home.parentsSurrogatesSection.parentsCta') }}
            </NuxtLink>
          </div>
          <div class="order-1 mx-auto aspect-[3/4] max-w-[420px] w-full overflow-hidden rounded-5 bg-[#f6f2ea] shadow-[0_16px_40px_rgba(39,31,24,0.1)] lg:order-2">
            <img
              src="/images/home/surrogacy-costs-for-intended-parents.jpg"
              :alt="t('home.costSection.title2')"
              class="h-full w-full object-contain"
              loading="lazy"
            >
          </div>
        </div>

        <!-- 代孕母：大屏左图右文；小屏上图下文 -->
        <div class="scroll-animate scroll-animate-delay-200 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div class="mx-auto aspect-[3/4] max-w-[420px] w-full overflow-hidden rounded-5 bg-[#f6f2ea] shadow-[0_16px_40px_rgba(39,31,24,0.1)]">
            <img
              src="/images/home/surrogacy-process-for-surrogates.jpg"
              :alt="t('home.parentsSurrogatesSection.surrogateSubtitle')"
              class="h-full w-full object-contain"
              loading="lazy"
            >
          </div>
          <div class="space-y-6">
            <div style="font-family: var(--font-primary)">
              <h2 class="text-[30px] font-semibold">
                {{ $t('home.parentsSurrogatesSection.surrogateSubtitle') }}
              </h2>
            </div>
            <p
              class="text-4.5 text-[var(--dark-brown)] leading-relaxed"
              style="font-family: var(--font-secondary)"
            >
              {{ $t('home.parentsSurrogatesSection.surrogateIntro') }}
            </p>
            <ul class="list-disc pl-6 text-4.5 text-[var(--dark-brown)] space-y-3 md:text-5" style="font-family: var(--font-secondary)">
              <li>{{ $t('home.parentsSurrogatesSection.surrogateBullet1') }}</li>
              <li>{{ $t('home.parentsSurrogatesSection.surrogateBullet2') }}</li>
              <li>{{ $t('home.parentsSurrogatesSection.surrogateBullet3') }}</li>
            </ul>
            <p
              class="text-4.5 text-[var(--dark-brown)] leading-relaxed"
              style="font-family: var(--font-secondary)"
            >
              {{ $t('home.parentsSurrogatesSection.surrogateOutro') }}
            </p>
            <NuxtLink
              :to="localePath('/journey')"
              class="inline-flex rounded-2.5 bg-[var(--grayish-green)] px-6 py-3 text-4 text-white font-semibold tracking-wide uppercase transition hover:opacity-90"
            >
              {{ $t('home.parentsSurrogatesSection.surrogateCta') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

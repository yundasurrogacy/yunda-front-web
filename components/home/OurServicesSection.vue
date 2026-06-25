<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const localePath = useLocalePath()
const { t } = useI18n()
useScrollAnimation()
</script>

<template>
  <section class="bg-[var(--yunda-petal)] px-4 pb-12 pt-0 md:px-12 md:pb-16 md:pt-0 lg:px-20 lg:pt-0">
    <div class="mx-auto max-w-320">
      <div class="flex flex-col gap-16 lg:gap-22 xl:gap-28">
        <!-- 准父母：大屏左文右图；小屏上文下图 -->
        <div class="scroll-animate scroll-animate-delay-100 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div class="order-2 space-y-6 lg:order-1">
            <div>
              <h2 class="font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[42px]">
                {{ $t('home.costSection.title2') }}
              </h2>
            </div>
            <p
              class="font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:text-[17px]"
              style="font-family: var(--font-text)"
            >
              {{ $t('home.costSection.description1') }}
            </p>
            <p class="font-sans text-base text-[var(--yunda-bark)] font-medium leading-[1.75] md:text-[17px]" style="font-family: var(--font-text)">
              {{ $t('home.costSection.description2') }}
            </p>
            <ul class="space-y-4 pl-1" style="font-family: var(--font-text)">
              <li class="flex items-start gap-3">
                <span class="mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--yunda-maple)]" />
                <span class="font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:text-[17px]">{{ $t('home.costSection.item1') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--yunda-maple)]" />
                <span class="font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:text-[17px]">{{ $t('home.costSection.item2') }}</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="mt-2.5 inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--yunda-maple)]" />
                <span class="font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:text-[17px]">{{ $t('home.costSection.item3') }}</span>
              </li>
            </ul>
            <p
              class="font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:text-[17px]"
              style="font-family: var(--font-text)"
            >
              {{ $t('home.costSection.description4') }}
            </p>
            <NuxtLink
              :to="localePath('/surrogacy-process')"
              class="yunda-type-button inline-flex rounded-2.5 bg-[var(--yunda-bark)] px-6 py-3 text-[var(--yunda-petal)] tracking-[0.02em] transition-opacity hover:opacity-95"
              style="font-family: var(--font-text)"
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
            <picture class="block h-full w-full">
              <source srcset="/images/home/surrogacy-process-for-surrogates-840.webp" type="image/webp">
              <img
                src="/images/home/surrogacy-process-for-surrogates.jpg"
                :alt="t('home.parentsSurrogatesSection.surrogateSubtitle')"
                class="h-full w-full object-contain"
                loading="lazy"
              >
            </picture>
          </div>
          <div class="space-y-6">
            <div>
              <h2 class="font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[42px]">
                {{ $t('home.parentsSurrogatesSection.surrogateSubtitle') }}
              </h2>
            </div>
            <p
              class="font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:text-[17px]"
              style="font-family: var(--font-text)"
            >
              {{ $t('home.parentsSurrogatesSection.surrogateIntro') }}
            </p>
            <ul class="list-disc space-y-3 pl-6 font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:text-[17px]" style="font-family: var(--font-text)">
              <li>{{ $t('home.parentsSurrogatesSection.surrogateBullet1') }}</li>
              <li>{{ $t('home.parentsSurrogatesSection.surrogateBullet2') }}</li>
              <li>{{ $t('home.parentsSurrogatesSection.surrogateBullet3') }}</li>
            </ul>
            <p
              class="font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:text-[17px]"
              style="font-family: var(--font-text)"
            >
              {{ $t('home.parentsSurrogatesSection.surrogateOutro') }}
            </p>
            <NuxtLink
              :to="localePath('/journey')"
              class="yunda-type-button inline-flex rounded-2.5 bg-[var(--yunda-bark)] px-6 py-3 text-[var(--yunda-petal)] tracking-[0.02em] transition-opacity hover:opacity-95"
              style="font-family: var(--font-text)"
            >
              {{ $t('home.parentsSurrogatesSection.surrogateCta') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

const localePath = useLocalePath()
useScrollAnimation()
</script>

<template>
  <section class="bg-[var(--head-bg)] px-4 py-16 lg:px-20 lg:py-28 md:px-12 md:py-22">
    <div class="mx-auto max-w-320">
      <div class="scroll-animate mx-auto mb-14 max-w-260 text-center md:mb-18 lg:max-w-280">
        <h2 class="text-7.5 font-semibold md:text-10" style="font-family: var(--font-primary)">
          {{ $t('home.ourServicesSection.title') }}
        </h2>
        <p
          class="mt-6 text-4.5 text-[var(--dark-brown)] leading-relaxed md:mt-7 md:text-5"
          style="font-family: var(--font-secondary)"
        >
          {{ $t('home.ourServicesSection.description') }}
        </p>
      </div>

      <div class="flex flex-col gap-16 lg:gap-22 xl:gap-28">
        <!-- 准父母：大屏左文右图；小屏上文下图 -->
        <div class="scroll-animate scroll-animate-delay-100 grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div class="space-y-6">
            <div style="font-family: var(--font-primary)">
              <h3 class="text-7.5 font-semibold md:text-10">
                {{ $t('home.costSection.title1') }}
              </h3>
              <p class="mt-2 text-6 md:text-8">
                {{ $t('home.costSection.title2') }}
              </p>
            </div>
            <p
              class="text-4.5 text-[var(--dark-brown)] leading-relaxed"
              style="font-family: var(--font-secondary)"
            >
              {{ $t('home.costSection.description1') }}
            </p>
            <p class="text-4.5 text-[var(--dark-brown)] font-medium tracking-wide uppercase md:text-5" style="font-family: var(--font-secondary)">
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
          <div class="aspect-[4/3] w-full overflow-hidden rounded-5 shadow-[0_16px_40px_rgba(39,31,24,0.1)] lg:aspect-[5/4]">
            <img
              src="/images/home/home-redesign/our-services-1.jpg"
              alt=""
              class="h-full w-full object-cover"
              loading="lazy"
            >
          </div>
        </div>

        <!-- 代孕母：大屏左图右文；小屏上图下文 -->
        <div class="scroll-animate scroll-animate-delay-200 grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">
          <div class="aspect-[4/3] w-full overflow-hidden rounded-5 shadow-[0_16px_40px_rgba(39,31,24,0.1)] lg:aspect-[5/4]">
            <img
              src="/images/home/home-redesign/our-services-2.jpeg"
              alt=""
              class="h-full w-full object-cover"
              loading="lazy"
            >
          </div>
          <div class="space-y-6">
            <div style="font-family: var(--font-primary)">
              <h3 class="text-7.5 font-semibold md:text-10">
                {{ $t('home.parentsSurrogatesSection.surrogateTitle') }}
              </h3>
              <p class="mt-2 text-6 md:text-8">
                {{ $t('home.parentsSurrogatesSection.surrogateSubtitle') }}
              </p>
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
              class="inline-flex border-2 border-[var(--grayish-green)] rounded-2.5 bg-transparent px-6 py-3 text-4 text-[var(--grayish-green)] font-semibold tracking-wide uppercase transition hover:bg-[var(--grayish-green)] hover:text-white"
            >
              {{ $t('home.parentsSurrogatesSection.surrogateCta') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

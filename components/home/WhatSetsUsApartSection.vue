<script setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
const { t } = useI18n()

const openFeatureIndex = ref(-1)

const featureItems = computed(() => [
  {
    title: t('home.whatSetsUsApartSection.item1.title'),
    description: t('home.whatSetsUsApartSection.item1.description'),
  },
  {
    title: t('home.whatSetsUsApartSection.item2.title'),
    descriptionPrefix: t('home.whatSetsUsApartSection.item2.descriptionPrefix'),
    descriptionLinkText: t('home.whatSetsUsApartSection.item2.descriptionLinkText'),
    descriptionSuffix: t('home.whatSetsUsApartSection.item2.descriptionSuffix'),
    link: '/surrogacy-cost',
  },
  {
    title: t('home.whatSetsUsApartSection.item3.title'),
    description: t('home.whatSetsUsApartSection.item3.description'),
  },
  {
    title: t('home.whatSetsUsApartSection.item4.title'),
    description: t('home.whatSetsUsApartSection.item4.description'),
  },
])

function toggleFeature(index) {
  openFeatureIndex.value = openFeatureIndex.value === index ? -1 : index
}
</script>

<template>
  <section class="bg-[var(--yunda-petal)] px-4 py-[60px] md:px-20">
    <div class="mx-auto max-w-[1400px]">
      <div class="scroll-animate rounded-bl-[28px] rounded-br-[28px] rounded-tl-[120px] rounded-tr-[28px] px-5 py-8 ring-1 ring-[color-mix(in_srgb,var(--yunda-bark)_10%,transparent)] md:min-h-[680px] md:px-8 md:py-10 lg:px-10 lg:py-12">
        <div class="md:flex md:items-start md:gap-14">
          <div class="md:w-[420px] md:shrink-0 lg:w-[480px] xl:w-[520px]">
            <div class="aspect-square w-full overflow-hidden rounded-[28px]">
              <picture class="block h-full w-full">
                <source
                  srcset="/images/pages/home/what-sets-us-apart-480.avif 480w, /images/pages/home/what-sets-us-apart-768.avif 768w, /images/pages/home/what-sets-us-apart-1200.avif 1200w"
                  sizes="(min-width: 1280px) 520px, (min-width: 1024px) 480px, (min-width: 768px) 420px, calc(100vw - 40px)"
                  type="image/avif"
                >
                <img
                  src="/images/pages/home/what-sets-us-apart.jpeg"
                  srcset="/images/pages/home/what-sets-us-apart-480.jpg 480w, /images/pages/home/what-sets-us-apart-768.jpg 768w, /images/pages/home/what-sets-us-apart.jpeg 1200w"
                  sizes="(min-width: 1280px) 520px, (min-width: 1024px) 480px, (min-width: 768px) 420px, calc(100vw - 40px)"
                  :alt="$t('home.whatSetsUsApartSection.imageAlt')"
                  class="h-full w-full object-cover"
                  width="1200"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                >
              </picture>
            </div>
          </div>

          <div class="min-h-0 flex flex-1 flex-col pt-2 md:min-h-[420px] md:pt-0 lg:min-h-[480px] xl:min-h-[520px]">
            <h2 class="mb-3 text-left font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:mb-4 md:mt-0 md:text-[42px]">
              {{ $t('home.whatSetsUsApartSection.title') }}
            </h2>
            <div class="min-h-0 flex flex-1 flex-col">
              <div
                v-for="(item, index) in featureItems"
                :key="item.title"
                class="flex min-h-0 flex-col border-b border-[var(--yunda-bark)] py-5 md:flex-1 md:py-4"
              >
                <h3 class="m-0">
                  <button
                    type="button"
                    class="w-full flex items-center justify-between gap-4 text-left text-[20px] text-[var(--yunda-bark)] leading-tight font-bold md:text-2xl"
                    style="font-family: var(--font-text)"
                    @click="toggleFeature(index)"
                  >
                    <span>
                      {{ item.title }}
                    </span>
                    <span class="relative -top-1.5 text-9 leading-none md:-top-2">{{ openFeatureIndex === index ? '−' : '+' }}</span>
                  </button>
                </h3>

                <div
                  v-if="openFeatureIndex === index"
                  class="pr-2 pt-3 font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:text-[17px]"
                  style="font-family: var(--font-text)"
                >
                  <template v-if="item.link">
                    {{ item.descriptionPrefix }}                    <NuxtLink
                      :to="item.link"
                      class="underline underline-offset-4 transition-colors hover:text-[var(--yunda-maple)]"
                    >
                      {{ item.descriptionLinkText }}
                    </NuxtLink>{{ item.descriptionSuffix }}
                  </template>
                  <template v-else>
                    {{ item.description }}
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

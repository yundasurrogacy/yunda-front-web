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
  <section class="bg-[var(--head-bg)] px-4 py-[60px] md:px-20">
    <div class="mx-auto max-w-[1400px]">
      <div class="scroll-animate rounded-bl-[28px] rounded-br-[28px] rounded-tl-[120px] rounded-tr-[28px] px-5 py-8 md:min-h-[680px] md:px-8 md:py-10 lg:px-10 lg:py-12">
        <div class="md:flex md:items-start md:gap-14">
          <div class="md:w-[420px] md:shrink-0 lg:w-[480px] xl:w-[520px]">
            <div class="aspect-square w-full overflow-hidden rounded-[28px]">
              <img
                src="/images/home/yunda-what-sets-us.jpeg"
                :alt="$t('home.whatSetsUsApartSection.imageAlt')"
                class="h-full w-full object-cover"
                loading="lazy"
              >
            </div>
          </div>

          <div class="min-h-0 flex flex-1 flex-col pt-2 md:min-h-[420px] md:pt-0 lg:min-h-[480px] xl:min-h-[520px]">
            <h2 class="mb-3 text-left text-[36px] text-[var(--dark-brown)] font-bold md:mb-4 md:mt-0 md:text-[36px]" style="font-family: var(--font-primary)">
              {{ $t('home.whatSetsUsApartSection.title') }}
            </h2>
            <div class="min-h-0 flex flex-1 flex-col">
              <div
                v-for="(item, index) in featureItems"
                :key="item.title"
                class="flex min-h-0 flex-col border-b border-[#3c2415] py-5 md:flex-1 md:py-4"
              >
                <h3 class="m-0">
                  <button
                    type="button"
                    class="w-full flex items-center justify-between gap-4 text-left text-[26px] text-[var(--dark-brown)] leading-tight md:text-[30px]"
                    @click="toggleFeature(index)"
                  >
                    <span class="font-medium" style="font-family: var(--font-primary)">
                      {{ item.title }}
                    </span>
                    <span class="relative -top-1.5 text-9 leading-none md:-top-2">{{ openFeatureIndex === index ? '−' : '+' }}</span>
                  </button>
                </h3>

                <div
                  v-if="openFeatureIndex === index"
                  class="pr-2 pt-3 text-4.5 text-[var(--dark-brown)] leading-relaxed md:text-5"
                  style="font-family: var(--font-secondary)"
                >
                  <template v-if="item.link">
                    {{ item.descriptionPrefix }}<NuxtLink
                      :to="item.link"
                      class="underline underline-offset-4 hover:opacity-80"
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

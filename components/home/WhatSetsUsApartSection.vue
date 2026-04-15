<script setup>
import { ref } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

const openFeatureIndex = ref(-1)

const featureItems = [
  {
    title: 'Speed',
    description: 'There is no waitlist. Yunda’s technology helps us screen candidates faster and match more efficiently, with most matches completed within 1–3 weeks and some as quickly as 1 week. Throughout the process, you’ll receive high-touch support from a dedicated case manager every step of the way.',
  },
  {
    title: 'Transparency',
    descriptionPrefix: 'We give all parties total visibility into how we work and ',
    descriptionLinkText: 'what our services cost',
    descriptionSuffix: '. There are no hidden fees and there’s no confusion.',
    link: '/surrogacy-cost',
  },
  {
    title: 'Personalization',
    description: 'Every fertility journey is different. We create personalized treatment plans based on your health profile, family situation, and reproductive goals, with a focus on both medical science and success.',
  },
  {
    title: 'Comprehensive Protection',
    description: 'We combine top-tier fertility care, professional legal guidance, and secure fund trust management to safeguard every step of the process. Every cycle is designed to be compliant, secure, and fully supported.',
  },
]

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
                alt="Yunda team at ASRM"
                class="h-full w-full object-cover"
                loading="lazy"
              >
            </div>
          </div>

          <div class="min-h-0 flex flex-1 flex-col pt-2 md:min-h-[420px] md:pt-0 lg:min-h-[480px] xl:min-h-[520px]">
            <h2 class="mb-3 text-left text-[36px] text-[var(--dark-brown)] font-bold md:mb-4 md:mt-0 md:text-[36px]" style="font-family: var(--font-primary)">
              What Sets Us Apart
            </h2>
            <div class="min-h-0 flex flex-1 flex-col">
              <div
                v-for="(item, index) in featureItems"
                :key="item.title"
                class="flex min-h-0 flex-col border-b border-[#3c2415] py-5 md:flex-1 md:py-4"
              >
                <button
                  type="button"
                  class="w-full flex items-center justify-between gap-4 text-left text-[30px] text-[var(--dark-brown)] leading-tight"
                  @click="toggleFeature(index)"
                >
                  <span class="font-medium" style="font-family: var(--font-primary)">
                    {{ item.title }}
                  </span>
                  <span class="relative -top-1.5 text-9 leading-none md:-top-2">{{ openFeatureIndex === index ? '−' : '+' }}</span>
                </button>

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

<script setup lang="ts">
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

// 合作伙伴/协会 logo 数据 - 使用真实图片链接，后续会替换为正式链接
const partners = [
  { name: 'Yunda Surrogacy', logo: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/about-us/logo.webp', url: '#' },
  // TODO: 添加其他合作伙伴 logo
  // { name: 'Resolve', logo: '...', url: '#' },
  // { name: 'ASRM', logo: '...', url: '#' },
  // { name: 'SEEDS', logo: '...', url: '#' },
  // { name: 'Family Equality', logo: '...', url: '#' },
]
</script>

<template>
  <section class="bg-[#FAF1E0] px-4 py-16 md:px-20 md:py-24">
    <div class="mx-auto max-w-320">
      <h2 class="scroll-animate mb-12 text-center text-7.5 font-semibold md:text-10" style="font-family: var(--font-primary)">
        {{ $t('home.associationSection.title') }}
      </h2>
      <div class="scroll-animate scroll-animate-delay-100 flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
        <a
          v-for="(partner, index) in partners"
          :key="index"
          :href="partner.url"
          target="_blank"
          rel="noopener noreferrer"
          class="flex h-16 items-center justify-center transition-opacity hover:opacity-80 md:h-20 lg:h-24"
        >
          <img
            :src="partner.logo"
            :alt="partner.name"
            class="h-full w-auto object-contain"
            loading="lazy"
          >
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>

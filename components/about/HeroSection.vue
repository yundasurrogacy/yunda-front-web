<template>
  <div class="relative w-full min-h-50 lg:min-h-100 py-12 lg:py-20 px-8 lg:px-12 bg-gradient-to-b from-[var(--head-bg)] to-[var(--hero-center)]">
    <!-- Hero Background with Gradient -->
      <div class="lg:max-w-320 mx-auto text-center text-3 lg:text-5 ">
        <!-- Title -->
        <h1 class="text-7.5 lg:text-10 font-semibold mb-6 lg:mb-8 leading-tight" style="font-family: var(--font-primary)">
          {{ $t('about.hero.title') }}
        </h1>
        <div class="text-base lg:text-xl max-w-5xl mx-auto leading-relaxed">
          <p class="mb-4 whitespace-pre-line">
            {{ $t('about.hero.paragraph1') }}
          </p>
          <p class="mb-4 whitespace-pre-line">
            {{ $t('about.hero.paragraph2') }}
          </p>
          <p class="mb-4 whitespace-pre-line">
            {{ $t('about.hero.paragraph3') }}
            <span class="font-semibold"> {{ $t('about.hero.highlight') }}</span>
          </p>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.hero-gradient {
  height: 667px;
  top: 91px;
}
</style>
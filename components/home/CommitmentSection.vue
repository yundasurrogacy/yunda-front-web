<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <section class="bg-[var(--yunda-bark)] px-4 py-12 md:px-20 md:py-16">
    <div class="mx-auto max-w-320 text-center md:max-w-full">
      <p class="scroll-animate font-display text-[32px] text-[var(--yunda-petal)] font-medium leading-[1.15] md:text-[42px]">
        {{ $t('home.commitmentSection.title') }}<br>
        {{ $t('home.commitmentSection.description') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
</style>

<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
</script>

<template>
  <section class="bg-[var(--primary-brown)] px-4 py-12 md:px-20 md:py-16">
    <div class="mx-auto max-w-320 text-center md:max-w-full">
      <h2 class="scroll-animate text-6 text-[var(--light-cream)] md:text-8" style="font-family: var(--font-primary)">
        {{ $t('home.commitmentSection.title') }}<br>
        {{ $t('home.commitmentSection.description') }}
      </h2>
    </div>
  </section>
</template>

<style scoped>
</style>

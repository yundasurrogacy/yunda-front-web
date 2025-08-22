<template>
  <section class="py-20 md:py-25 px-4 md:px-20 bg-[var(--primary-brown)]">
    <div class="max-w-320 md:max-w-full mx-auto text-center">
      <h2 class="text-[var(--light-cream)] text-6 md:text-8 scroll-animate" style="font-family: var(--font-primary)">
        {{ $t('home.commitmentSection.title') }}<br>
        {{ $t('home.commitmentSection.description') }}
      </h2>
    </div>
  </section>
</template>

<script setup>
import { useScrollAnimation } from '~/composables/useScrollAnimation';

useScrollAnimation();
</script>

<style scoped>
</style>
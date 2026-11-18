<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps<{ title: string, description: string }>()

const { locale } = useI18n()
const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en: string, zh: string) => (isZh.value ? zh : en)
</script>

<template>
  <section class="about-hero-section" aria-labelledby="about-heading">
    <img
      class="hero-background"
      src="/images/pages/about/proposal-20261117/about-hero.webp"
      alt=""
      aria-hidden="true"
      width="1920"
      height="1020"
      fetchpriority="high"
      decoding="async"
    >
    <div class="hero-wash" aria-hidden="true" />
    <div class="hero-copy">
      <p class="hero-eyebrow">
        {{ tt('About Yunda Surrogacy', '关于 Yunda Surrogacy（孕达代孕）') }}
      </p>
      <h1 id="about-heading">
        {{ title }}
      </h1>
      <p class="hero-description">
        {{ description }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.about-hero-section {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: grid;
  place-items: center;
  min-height: 28rem;
  padding: clamp(4rem, 7vw, 7rem) 1.5rem;
  background: var(--yunda-petal);
  color: var(--yunda-bark);
}

.hero-background,
.hero-wash {
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
}

.hero-background {
  object-fit: cover;
  object-position: center 48%;
  opacity: 0.35;
}

.hero-wash {
  background: color-mix(in srgb, var(--yunda-petal) 62%, transparent);
}

.hero-copy {
  width: min(100%, 66rem);
  text-align: center;
}

.hero-eyebrow {
  margin-bottom: 1.5rem;
  font-family: var(--font-text);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.hero-copy h1 {
  font-family: var(--font-display);
  font-size: clamp(2.35rem, 4.3vw, 4.25rem);
  font-weight: 500;
  line-height: 1.12;
  letter-spacing: -0.025em;
  text-wrap: balance;
}

.hero-description {
  max-width: 47rem;
  margin: 1.75rem auto 0;
  font-family: var(--font-text);
  font-size: clamp(1.05rem, 1.4vw, 1.2rem);
  line-height: 1.8;
  text-wrap: pretty;
}

@media (max-width: 479px) {
  .about-hero-section {
    min-height: 26rem;
  }
}
</style>

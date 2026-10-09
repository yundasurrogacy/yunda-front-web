<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import ReferralCompensationSection from '@/components/surrogacy/referral/CompensationSection.vue'
import ReferralEarningsSection from '@/components/surrogacy/referral/EarningsSection.vue'
import ReferralEligibilitySection from '@/components/surrogacy/referral/EligibilitySection.vue'
import { buildCoreServicePageSchemas } from '~/utils/schema'

const { t, locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const pagePath = '/referral'
const dateModified = '2026-10-09'
const localePath = useLocalePath()
const steps = computed(() => Array.from({ length: 4 }, (_, index) => ({
  title: t(`surrogacyReferral.processSection.steps.${index}.title`),
  description: t(`surrogacyReferral.processSection.steps.${index}.description`),
})))
const faqs = computed(() => Array.from({ length: 4 }, (_, index) => ({
  question: t(`surrogacyReferral.faqSection.items.${index}.question`),
  answer: t(`surrogacyReferral.faqSection.items.${index}.answer`),
})))
const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: t('surrogacyReferral.heroSection.eyebrow'),
  description: t('surrogacyReferral.meta.description'),
  about: 'Gestational carrier referral program',
  audience: 'Friends or family of potential gestational carriers',
  inLanguage: locale.value.startsWith('zh') ? 'zh-CN' : 'en-US',
  dateModified,
  breadcrumbs: [
    { name: locale.value.startsWith('zh') ? '首页' : 'Home', url: '/' },
    { name: locale.value.startsWith('zh') ? '代孕妈妈' : 'For Surrogates', url: '/surrogates' },
    { name: t('surrogacyReferral.heroSection.eyebrow'), url: pagePath },
  ],
  faqs: faqs.value,
}))
useHead(() => ({
  title: t('surrogacyReferral.meta.title'),
  meta: [{ name: 'description', content: t('surrogacyReferral.meta.description') }],
  script: coreServicePageSchemas.value.map((schema, index) => ({
    key: `schema-referral-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div>
    <AppHeader />
    <main class="referral-page">
      <section class="referral-hero" aria-labelledby="referral-title">
        <div class="referral-hero-copy">
          <p class="referral-eyebrow">
            {{ $t('surrogacyReferral.heroSection.eyebrow') }}
          </p>
          <h1 id="referral-title">
            {{ $t('surrogacyReferral.heroSection.title') }}
          </h1>
          <p class="referral-hero-description">
            {{ $t('surrogacyReferral.heroSection.description') }}
          </p>
          <NuxtLink class="referral-button" :to="localePath('/be-surrogate')">
            {{ $t('surrogacyReferral.heroSection.button') }} <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
        <div class="referral-hero-photo">
          <img src="/images/pages/referral/friends-hero-2026.webp" :alt="$t('surrogacyReferral.heroSection.imageAlt')" width="1536" height="1024" fetchpriority="high" decoding="async">
        </div>
      </section>
      <ReferralEarningsSection />
      <section class="referral-section" aria-labelledby="referral-process-title">
        <div class="referral-container">
          <h2 id="referral-process-title">
            {{ $t('surrogacyReferral.processSection.title') }}
          </h2>
          <ol class="referral-steps">
            <li v-for="(step, index) in steps" :key="index">
              <span class="referral-step-number" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.description }}</p>
            </li>
          </ol>
        </div>
      </section>
      <ReferralEligibilitySection />
      <ReferralCompensationSection />
      <section class="referral-section referral-faq" aria-labelledby="referral-faq-title">
        <div class="referral-container">
          <h2 id="referral-faq-title">
            {{ $t('surrogacyReferral.faqSection.title') }}
          </h2>
          <div class="referral-faq-list">
            <details v-for="faq in faqs" :key="faq.question">
              <summary>{{ faq.question }} <span class="referral-faq-toggle" aria-hidden="true">+</span></summary>
              <p>{{ faq.answer }}</p>
            </details>
          </div>
        </div>
      </section>
      <section class="referral-closing" aria-labelledby="referral-closing-title">
        <div class="referral-container">
          <h2 id="referral-closing-title">
            {{ $t('surrogacyReferral.confidenceSection.title') }}
          </h2>
          <p>{{ $t('surrogacyReferral.confidenceSection.description') }}</p>
          <NuxtLink class="referral-button referral-button-light" :to="localePath('/be-surrogate')">
            {{ $t('surrogacyReferral.confidenceSection.button') }} <span aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </section>
      <p class="referral-updated">
        {{ $t('surrogacyReferral.updated') }}
      </p>
    </main>
    <AppFooter />
  </div>
</template>

<style>
.referral-page {
  --referral-cream: #faf7f2;
  --referral-petal: #f6eadf;
  --referral-ink: #432a1d;
  --referral-accent: #ac795b;
  --referral-rule: #432a1d26;
  color: var(--referral-ink);
  background: var(--referral-cream);
  font-family: var(--font-text);
}
.referral-page *,
.referral-page *::before,
.referral-page *::after {
  box-sizing: border-box;
}
.referral-page h1,
.referral-page h2,
.referral-page h3,
.referral-amount,
.referral-step-number {
  font-family: var(--font-display);
  font-weight: 500;
  text-wrap: balance;
}
.referral-page h1 {
  font-size: clamp(42px, 4.7vw, 74px);
  line-height: 1.06;
  letter-spacing: -0.035em;
  white-space: pre-line;
  margin: 0;
}
.referral-page h2 {
  font-size: clamp(30px, 3.3vw, 49px);
  line-height: 1.12;
  letter-spacing: -0.025em;
  margin: 0;
}
.referral-page h3 {
  font-size: 27px;
  line-height: 1.15;
  margin: 0 0 16px;
}
.referral-page p {
  line-height: 1.65;
  text-wrap: pretty;
}
.referral-container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 48px;
}
.referral-section {
  padding: 64px 0;
}
.referral-eyebrow {
  display: flex;
  align-items: center;
  gap: 20px;
  color: var(--referral-accent);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  margin: 0 0 24px;
}
.referral-eyebrow::after {
  content: '';
  height: 1px;
  background: var(--referral-accent);
  opacity: 0.5;
  width: 90px;
}
.referral-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  max-width: 1600px;
  margin: 0 auto;
}
.referral-hero-copy {
  padding: 70px clamp(24px, 4vw, 72px) 78px;
  align-self: center;
}
.referral-hero-description {
  max-width: 520px;
  font-size: 19px;
  margin: 28px 0 30px;
}
.referral-hero-photo {
  min-height: 520px;
  position: relative;
}
.referral-hero-photo img {
  width: 100%;
  height: 100%;
  position: absolute;
  object-fit: cover;
  object-position: center;
}
.referral-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 28px;
  padding: 15px 28px;
  min-height: 50px;
  border: 1px solid var(--referral-ink);
  border-radius: 4px;
  background: var(--referral-ink);
  color: #fff9f0;
  text-decoration: none;
  font-size: 16px;
  transition: background 0.2s;
}
.referral-button:hover {
  background: #63412d;
}
.referral-page a:focus-visible,
.referral-page summary:focus-visible {
  outline: 3px solid var(--referral-accent);
  outline-offset: 5px;
}
.referral-reward {
  padding: 44px 0;
  background: var(--referral-petal);
}
.referral-reward-grid {
  display: grid;
  grid-template-columns: 0.85fr 1.3fr;
  gap: 48px;
  align-items: center;
}
.referral-reward-amount {
  text-align: center;
  border-right: 1px solid var(--referral-rule);
  padding-right: 36px;
}
.referral-page .referral-amount {
  font-size: clamp(70px, 8vw, 112px);
  letter-spacing: -0.045em;
  line-height: 1;
  margin: 0 0 8px;
  font-variant-numeric: lining-nums tabular-nums;
}
.referral-reward-label {
  font-size: 20px;
  margin: 0;
}
.referral-reward h2 {
  font-size: clamp(28px, 2.6vw, 38px);
}
.referral-condition {
  font-size: 18px;
  margin: 18px 0 16px;
  max-width: 650px;
}
.referral-fine-print {
  font-size: 14px;
  margin: 0;
  color: #715b4d;
}
.referral-steps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  list-style: none;
  padding: 0;
  margin: 34px 0 0;
}
.referral-steps li {
  padding: 0 28px;
  border-left: 1px solid var(--referral-rule);
}
.referral-steps li:first-child {
  padding-left: 0;
  border: 0;
}
.referral-steps li:last-child {
  padding-right: 0;
}
.referral-step-number {
  display: block;
  font-size: 42px;
  line-height: 1;
  margin-bottom: 22px;
}
.referral-steps p {
  font-size: 16px;
  margin: 0;
}
.referral-eligibility-grid {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 56px;
  align-items: start;
}
.referral-intro {
  font-size: 18px;
  margin: 24px 0 28px;
  max-width: 540px;
}
.referral-text-link {
  display: inline-flex;
  align-items: center;
  gap: 16px;
  color: var(--referral-ink);
  text-decoration: none;
  border-bottom: 1px solid var(--referral-accent);
  padding-bottom: 6px;
  font-size: 16px;
  line-height: 1.5;
}
.referral-text-link:hover {
  color: var(--referral-accent);
}
.referral-requirements {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
}
.referral-requirements li {
  display: flex;
  align-items: start;
  gap: 18px;
  padding: 24px 20px;
  background: #ffffff57;
  border: 1px solid var(--referral-rule);
  border-left: 3px solid #c7a081;
  border-radius: 5px;
  font-size: 16px;
  line-height: 1.55;
}
.referral-dot {
  width: 7px;
  height: 7px;
  margin-top: 8px;
  background: #bc906f;
  border-radius: 50%;
  flex-shrink: 0;
}
.referral-benefits {
  background: #fffaf5;
}
.referral-benefits-base {
  font-family: var(--font-display);
  font-size: clamp(24px, 2.5vw, 36px);
  margin: 22px 0 32px;
}
.referral-benefit-columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 54px;
}
.referral-benefit-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.referral-benefit-list li {
  display: flex;
  align-items: start;
  gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid var(--referral-rule);
  font-size: 17px;
  line-height: 1.6;
}
.referral-check {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: var(--referral-petal);
}
.referral-processing {
  margin: 25px 0 20px;
}
.referral-faq-list {
  margin-top: 30px;
  border-top: 1px solid var(--referral-rule);
}
.referral-faq details {
  border-bottom: 1px solid var(--referral-rule);
}
.referral-faq summary {
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  padding: 21px 0;
  list-style: none;
  font-size: 19px;
}
.referral-faq summary::-webkit-details-marker {
  display: none;
}
.referral-faq-toggle {
  font-size: 27px;
  line-height: 1;
  color: var(--referral-accent);
  transition: transform 0.2s;
}
.referral-faq details[open] .referral-faq-toggle {
  transform: rotate(45deg);
}
.referral-faq details p {
  margin: 0 0 24px;
  max-width: 800px;
  font-size: 17px;
}
.referral-closing {
  padding: 54px 0 60px;
  background: var(--referral-ink);
  color: #fff9f0;
  text-align: center;
}
.referral-closing h2 {
  white-space: pre-line;
}
.referral-closing p {
  max-width: 660px;
  margin: 24px auto 28px;
  font-size: 18px;
  color: #f5e5d6;
}
.referral-button-light {
  background: var(--referral-cream);
  color: var(--referral-ink);
  border-color: var(--referral-cream);
}
.referral-button-light:hover {
  background: #ead7c5;
}
.referral-updated {
  font-size: 12px;
  text-align: center;
  padding: 14px;
  margin: 0;
  color: #715b4d;
}
@media (min-width: 1600px) {
  .referral-hero {
    max-width: 1440px;
  }
}
@media (max-width: 900px) {
  .referral-container {
    padding: 0 28px;
  }
  .referral-hero-copy {
    padding: 44px 28px;
  }
  .referral-hero-photo {
    min-height: 440px;
  }
  .referral-steps {
    grid-template-columns: 1fr 1fr;
    gap: 32px;
  }
  .referral-steps li {
    padding: 0;
    border: 0;
  }
  .referral-eligibility-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }
  .referral-benefit-columns {
    gap: 30px;
  }
}
@media (max-width: 600px) {
  .referral-container {
    padding: 0 22px;
  }
  .referral-section {
    padding: 42px 0;
  }
  .referral-hero {
    grid-template-columns: 1fr;
  }
  .referral-hero-copy {
    padding: 42px 22px;
  }
  .referral-hero-description {
    font-size: 17px;
  }
  .referral-hero-photo {
    min-height: 0;
    aspect-ratio: 3 / 2;
  }
  .referral-reward {
    padding: 32px 0;
  }
  .referral-reward-grid {
    grid-template-columns: 1fr;
    gap: 26px;
  }
  .referral-reward-amount {
    border-right: 0;
    border-bottom: 1px solid var(--referral-rule);
    padding: 0 0 24px;
    text-align: left;
  }
  .referral-reward-label {
    font-size: 18px;
  }
  .referral-steps {
    gap: 30px 22px;
  }
  .referral-page h3 {
    font-size: 24px;
  }
  .referral-step-number {
    font-size: 36px;
    margin-bottom: 16px;
  }
  .referral-requirements {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  .referral-requirements li {
    padding: 19px;
  }
  .referral-benefit-columns {
    grid-template-columns: 1fr;
    gap: 0;
  }
  .referral-benefits-base {
    line-height: 1.4;
  }
  .referral-faq summary {
    font-size: 17px;
  }
  .referral-closing {
    padding: 42px 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .referral-page *,
  .referral-page *::before,
  .referral-page *::after {
    transition: none !important;
  }
}
</style>

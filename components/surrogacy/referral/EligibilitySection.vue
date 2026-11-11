<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const localePath = useLocalePath()
const requirements = computed(() => Array.from({ length: 6 }, (_, index) => t(`surrogacyReferral.eligibilitySection.requirements.${index}`)))
</script>

<template>
  <section class="referral-section" aria-labelledby="referral-eligibility-title">
    <div class="referral-container referral-eligibility-grid">
      <div>
        <p class="referral-eyebrow">
          {{ $t('surrogacyReferral.eligibilitySection.eyebrow') }}
        </p>
        <h2 id="referral-eligibility-title">
          {{ $t('surrogacyReferral.eligibilitySection.title') }}
        </h2>
        <p class="referral-intro">
          {{ $t('surrogacyReferral.eligibilitySection.intro') }}
        </p>
        <NuxtLink class="referral-text-link" :to="localePath('/surrogate-requirements')">
          {{ $t('surrogacyReferral.eligibilitySection.link') }} <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
      <ul class="referral-requirements">
        <li v-for="requirement in requirements" :key="requirement">
          <span class="referral-dot" aria-hidden="true" />
          <span>{{ requirement }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const localePath = useLocalePath()
const benefitColumns = computed(() => [0, 4].map(start => Array.from({ length: 4 }, (_, index) => t(`surrogacyReferral.compensationSection.benefits.${start + index}`))))
</script>

<template>
  <section class="referral-section referral-benefits" aria-labelledby="referral-benefits-title">
    <div class="referral-container">
      <h2 id="referral-benefits-title">
        {{ $t('surrogacyReferral.compensationSection.title') }}
      </h2>
      <p class="referral-benefits-base">
        {{ $t('surrogacyReferral.compensationSection.base') }}
      </p>
      <div class="referral-benefit-columns">
        <ul v-for="(column, index) in benefitColumns" :key="index" class="referral-benefit-list">
          <li v-for="benefit in column" :key="benefit">
            <span class="referral-check" aria-hidden="true">✓</span>
            <span>{{ benefit }}</span>
          </li>
        </ul>
      </div>
      <p class="referral-fine-print referral-processing">
        {{ $t('surrogacyReferral.compensationSection.processing') }}
      </p>
      <NuxtLink class="referral-text-link" :to="localePath('/benefit')">
        {{ $t('surrogacyReferral.compensationSection.link') }} <span aria-hidden="true">→</span>
      </NuxtLink>
    </div>
  </section>
</template>

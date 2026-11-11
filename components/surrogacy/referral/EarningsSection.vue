<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const rewards = computed(() => Array.from({ length: 2 }, (_, index) => ({
  amount: t(`surrogacyReferral.earningsSection.rewards.${index}.amount`),
  label: t(`surrogacyReferral.earningsSection.rewards.${index}.label`),
})))
</script>

<template>
  <section class="referral-reward" aria-labelledby="referral-reward-title">
    <div class="referral-container referral-reward-grid">
      <div class="referral-reward-amount">
        <div v-for="reward in rewards" :key="reward.amount" class="referral-reward-tier">
          <p class="referral-amount">
            {{ reward.amount }}
          </p>
          <p class="referral-reward-label">
            {{ reward.label }}
          </p>
        </div>
      </div>
      <div>
        <h2 id="referral-reward-title">
          {{ $t('surrogacyReferral.earningsSection.title') }}
        </h2>
        <p class="referral-condition">
          {{ $t('surrogacyReferral.earningsSection.condition') }}
        </p>
        <p class="referral-fine-print">
          {{ $t('surrogacyReferral.earningsSection.terms') }}
        </p>
      </div>
    </div>
  </section>
</template>

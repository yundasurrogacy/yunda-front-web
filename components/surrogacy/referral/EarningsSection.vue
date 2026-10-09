<template>
  <section class="referral-reward" aria-labelledby="referral-reward-title">
    <div class="referral-container referral-reward-grid">
      <div class="referral-reward-amount">
        <p class="referral-amount">
          {{ $t('surrogacyReferral.earningsSection.amount') }}
        </p>
        <p class="referral-reward-label">
          {{ $t('surrogacyReferral.earningsSection.label') }}
        </p>
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

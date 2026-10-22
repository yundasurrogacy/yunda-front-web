<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const copied = ref(false)
const copyTimer = ref<ReturnType<typeof setTimeout> | null>(null)

const applicationLink = computed(() => {
  const siteUrl = String(runtimeConfig.public.siteUrl || '').replace(/\/$/, '')
  return `${siteUrl}${localePath('/be-surrogate')}`
})

const emailLink = computed(() => {
  const subject = encodeURIComponent(t('surrogacyReferral.shareSection.emailSubject'))
  const body = encodeURIComponent(`${t('surrogacyReferral.shareSection.emailBody')}\n\n${applicationLink.value}`)
  return `mailto:?subject=${subject}&body=${body}`
})

async function copyApplicationLink() {
  if (!import.meta.client)
    return

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(applicationLink.value)
    }
    else {
      const fallbackInput = document.createElement('textarea')
      fallbackInput.value = applicationLink.value
      fallbackInput.setAttribute('readonly', '')
      fallbackInput.style.position = 'fixed'
      fallbackInput.style.opacity = '0'
      document.body.appendChild(fallbackInput)
      fallbackInput.select()
      document.execCommand('copy')
      fallbackInput.remove()
    }
  }
  catch {
    const fallbackInput = document.createElement('textarea')
    fallbackInput.value = applicationLink.value
    fallbackInput.setAttribute('readonly', '')
    fallbackInput.style.position = 'fixed'
    fallbackInput.style.opacity = '0'
    document.body.appendChild(fallbackInput)
    fallbackInput.select()
    document.execCommand('copy')
    fallbackInput.remove()
  }

  copied.value = true

  if (copyTimer.value)
    clearTimeout(copyTimer.value)
  copyTimer.value = setTimeout(() => {
    copied.value = false
  }, 2400)
}
</script>

<template>
  <section class="referral-share" aria-labelledby="referral-share-title">
    <div class="referral-container referral-share-card">
      <p class="referral-eyebrow">
        {{ $t('surrogacyReferral.shareSection.eyebrow') }}
      </p>
      <h2 id="referral-share-title">
        {{ $t('surrogacyReferral.shareSection.title') }}
      </h2>
      <p class="referral-share-description">
        {{ $t('surrogacyReferral.shareSection.description') }}
      </p>
      <div class="referral-share-link-label">
        {{ $t('surrogacyReferral.shareSection.linkLabel') }}
      </div>
      <div class="referral-share-link-row">
        <output class="referral-share-link" :aria-label="$t('surrogacyReferral.shareSection.linkLabel')">
          {{ applicationLink }}
        </output>
        <button class="referral-share-copy" type="button" @click="copyApplicationLink">
          {{ copied ? $t('surrogacyReferral.shareSection.copied') : $t('surrogacyReferral.shareSection.copyButton') }}
        </button>
      </div>
      <p v-if="copied" class="referral-share-status" role="status">
        {{ $t('surrogacyReferral.shareSection.copied') }}
      </p>
      <div class="referral-share-actions">
        <button class="referral-button referral-share-primary" type="button" @click="copyApplicationLink">
          {{ $t('surrogacyReferral.shareSection.copyButton') }}
        </button>
        <a class="referral-share-secondary" :href="emailLink">
          {{ $t('surrogacyReferral.shareSection.emailButton') }}
        </a>
        <NuxtLink class="referral-share-secondary" :to="localePath('/surrogate-requirements')">
          {{ $t('surrogacyReferral.shareSection.requirementsButton') }}
        </NuxtLink>
      </div>
      <div class="referral-share-notice">
        <p v-for="paragraph in $t('surrogacyReferral.shareSection.notice').split('\n\n')" :key="paragraph">
          {{ paragraph }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import MobileApplyCta from './MobileApplyCta.vue'

const { locale, t } = useI18n()
const localePath = useLocalePath()

function titleCaseLabel(label) {
  if (!locale.value.startsWith('en'))
    return label

  return label.replace(/[a-z]+(?:['’][a-z]+)*/gi, (word) => {
    if (['IVF', 'LGBTQ', 'LGBTQIA'].includes(word.toUpperCase()))
      return word.toUpperCase()

    const rest = word === word.toUpperCase() ? word.slice(1).toLowerCase() : word.slice(1)
    return word.charAt(0).toUpperCase() + rest
  })
}

const footerGroups = computed(() => [
  {
    title: t('footer.sections.intendedParentsGuide'),
    links: [
      { to: '/intended-parents', label: t('footer.sections.overview') },
      { to: '/be-parents', label: t('footer.sections.startConsultation') },
      { to: '/surrogacy-cost', label: t('footer.sections.costGuide') },
      { to: '/surrogacy-process', label: t('footer.sections.processGuide') },
      { to: '/surrogacy-protection-california', label: t('footer.sections.legalInsuranceEscrow') },
      { to: '/california-surrogacy-consultation', label: t('footer.sections.californiaConsultation') },
      { to: '/egg-donation', label: t('footer.sections.eggDonationGuide') },
      { to: '/partner-ivf-clinics', label: t('footer.sections.partnerClinics') },
      { to: '/single-parents-lgbtq', label: t('footer.sections.singleParentsLgbtq') },
    ],
  },
  {
    title: t('footer.sections.surrogatePath'),
    links: [
      { to: '/surrogates', label: t('footer.sections.overview') },
      { to: '/be-surrogate', label: t('footer.sections.applyAsSurrogate') },
      { to: '/surrogate-requirements', label: t('footer.sections.requirements') },
      { to: '/journey', label: t('footer.sections.journeyGuide') },
      { to: '/benefit', label: t('footer.sections.compensationBenefits') },
      { to: '/screening', label: t('footer.sections.screeningGuide') },
      { to: '/referral', label: t('footer.sections.referralProgram') },
    ],
  },
  {
    title: t('footer.sections.surrogateSupportingGuides'),
    links: [
      { to: '/surrogate-process', label: t('footer.sections.surrogateProcess') },
      { to: '/surrogate-compensation', label: t('footer.sections.surrogateCompensation') },
      { to: '/become-a-surrogate', label: t('footer.sections.surrogateMother') },
      { to: '/become-surrogate-california', label: t('footer.sections.surrogateCalifornia') },
      { to: '/eligibility', label: t('footer.sections.eligibilityOverview') },
    ],
  },
])
</script>

<template>
  <footer class="site-chrome-theme app-footer">
    <div class="footer-container">
      <div class="footer-layout">
        <!-- Brand, direct contact and QR codes share one column. -->
        <div class="footer-brand">
          <picture class="footer-logo">
            <source srcset="/images/shared/brand/logo.webp" type="image/webp">
            <img src="/images/shared/brand/logo.png" alt="Yunda Surrogacy" width="112" loading="lazy" decoding="async">
          </picture>
          <div class="footer-social">
            <a
              href="https://www.instagram.com/yunda_surrogacy_/"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="$t('footer.socialLinks.instagram')"
              class="footer-social-link"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M7.5 0h9C20.64 0 24 3.36 24 7.5v9c0 4.14-3.36 7.5-7.5 7.5h-9C3.36 24 0 20.64 0 16.5v-9C0 3.36 3.36 0 7.5 0Zm0 2A5.5 5.5 0 0 0 2 7.5v9A5.5 5.5 0 0 0 7.5 22h9a5.5 5.5 0 0 0 5.5-5.5v-9A5.5 5.5 0 0 0 16.5 2h-9Zm10.5 3a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 6a6 6 0 1 1 0 12 6 6 0 0 1 0-12Zm0 2a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
              </svg>
              <span class="sr-only">{{ $t('footer.socialLinks.instagram') }}</span>
            </a>
            <a
              href="https://www.facebook.com/people/Yunda-Surrogacy/61577914871802/"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="$t('footer.socialLinks.facebook')"
              class="footer-social-link"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M13.5 24v-10h3.4l.5-4h-3.9V7.45c0-1.16.32-1.95 2-1.95h2.14V1.92A28.6 28.6 0 0 0 14.52 1C11.3 1 9.1 2.97 9.1 6.6V10H5.5v4h3.6v10h4.4Z" />
              </svg>
              <span class="sr-only">{{ $t('footer.socialLinks.facebook') }}</span>
            </a>
            <a
              href="https://www.youtube.com/@YundaSurrogacy"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="$t('footer.socialLinks.youtube')"
              class="footer-social-link"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.55 3.6 12 3.6 12 3.6s-7.55 0-9.4.5A3 3 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.85.5 9.4.5 9.4.5s7.55 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.8V8.2l6.3 3.8-6.3 3.8Z" />
              </svg>
              <span class="sr-only">{{ $t('footer.socialLinks.youtube') }}</span>
            </a>
            <a
              href="https://www.linkedin.com/company/yunda-surrogacy"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="$t('footer.socialLinks.linkedin')"
              class="footer-social-link"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M5.5 2a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.5 9h4v13h-4V9Zm7 0h3.8v1.8h.1A4.4 4.4 0 0 1 18.2 8.7c4.1 0 4.8 2.7 4.8 6.2V22h-4v-6.3c0-1.5 0-3.4-2.1-3.4s-2.4 1.6-2.4 3.3V22h-4V9Z" />
              </svg>
              <span class="sr-only">{{ $t('footer.socialLinks.linkedin') }}</span>
            </a>
            <a
              href="https://www.tiktok.com/@yunda.surrogacy"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              class="footer-social-link"
            >
              <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
                <path d="M15.45 2h3.06c.25 1.93 1.3 3.48 3.49 4.33v3.13a9.2 9.2 0 0 1-3.46-1.08v6.9A5.72 5.72 0 1 1 13.6 9.6v3.24a2.55 2.55 0 1 0 1.85 2.44V2Z" />
              </svg>
              <span class="sr-only">TikTok</span>
            </a>
          </div>

          <div class="footer-direct-contact">
            <div>
              <p class="footer-contact-label">
                {{ $t('menu.phone') }}
              </p>
              <a :href="`tel:${$t('footer.phoneNumber').replace(/[^0-9+]/g, '')}`">
                {{ $t('footer.phoneNumber') }}
              </a>
            </div>
            <div>
              <p class="footer-contact-label">
                {{ $t('menu.email') }}
              </p>
              <a href="mailto:kaylal@yundasurrogacy.com">kaylal@yundasurrogacy.com</a>
            </div>
          </div>

          <div class="footer-messaging">
            <div v-if="locale === 'en'" class="footer-contact-block">
              <p class="footer-contact-label">
                {{ $t('menu.whatsapp') }}
              </p>
              <a
                :href="`https://wa.me/${$t('footer.whatsappNumber').replace(/[^0-9+]/g, '')}`"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ $t('footer.whatsappNumber') }}
              </a>
              <picture>
                <source srcset="/images/shared/contact/whatsapp.webp" type="image/webp">
                <img src="/images/shared/contact/whatsapp.png" :alt="$t('menu.whatsapp')" width="112" height="112" loading="lazy" decoding="async">
              </picture>
            </div>
            <div class="footer-contact-block">
              <p class="footer-contact-label">
                {{ $t('menu.wechat') }}
              </p>
              <p class="footer-messaging-id">
                {{ $t('footer.wechatId') }}
              </p>
              <img
                src="/images/shared/contact/wechat-yundaus1.jpg"
                :alt="`${$t('menu.wechat')} ${$t('footer.wechatId')} QR code`"
                width="112"
                height="112"
                loading="lazy"
                decoding="async"
              >
            </div>
          </div>
        </div>

        <nav
          v-for="(group, groupIndex) in footerGroups"
          :key="group.title"
          :aria-labelledby="`footer-guide-${groupIndex}`"
          class="footer-nav"
        >
          <h3 :id="`footer-guide-${groupIndex}`" class="footer-heading">
            {{ titleCaseLabel(group.title) }}
          </h3>
          <ul class="footer-link-list">
            <li v-for="(link, index) in group.links" :key="link.to">
              <NuxtLink :to="localePath(link.to)" :class="{ 'footer-overview': index === 0 }">
                {{ titleCaseLabel(link.label) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <nav class="footer-nav footer-company-nav" aria-labelledby="footer-about-heading">
          <h3 id="footer-about-heading" class="footer-heading">
            <NuxtLink :to="localePath('/about')">
              {{ titleCaseLabel($t('menu.aboutUs')) }}
            </NuxtLink>
          </h3>
          <ul class="footer-link-list">
            <li>
              <a href="https://www.indeed.com/cmp/Yunda-Surrogacy" target="_blank" rel="noopener noreferrer">{{ titleCaseLabel($t('menu.careers')) }}</a>
            </li>
            <li>
              <NuxtLink :to="localePath('/resources')" prefetch>
                {{ titleCaseLabel($t('menu.resources')) }}
              </NuxtLink>
            </li>
            <li>
              <NuxtLink :to="localePath('/blog')" prefetch>
                {{ titleCaseLabel($t('menu.blog')) }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="footer-legal">
        <div class="footer-policies">
          <NuxtLink :to="localePath('/privacy-policy')">
            {{ titleCaseLabel($t('footer.policyLinks.privacyPolicy')) }}
          </NuxtLink>
          <NuxtLink :to="localePath('/terms-of-service')">
            {{ titleCaseLabel($t('footer.policyLinks.termsOfService')) }}
          </NuxtLink>
          <NuxtLink :to="localePath('/disclaimer')">
            {{ titleCaseLabel($t('footer.policyLinks.disclaimer')) }}
          </NuxtLink>
          <NuxtLink :to="localePath('/sitemap')">
            {{ titleCaseLabel($t('footer.policyLinks.sitemap')) }}
          </NuxtLink>
        </div>
        <p class="footer-company-info">
          {{ $t('footer.companyInfo') }}
        </p>
      </div>
    </div>
  </footer>
  <MobileApplyCta />
</template>

<style scoped>
.app-footer {
  padding: 2.5rem 1.25rem 2rem;
  background: var(--yunda-petal);
  color: var(--yunda-bark);
  font-family: var(--font-text);
  font-size: 1rem;
  line-height: 1.7;
}

.footer-container {
  max-width: 90rem;
  margin-inline: auto;
}

.footer-layout {
  display: grid;
  gap: 2rem;
  align-items: start;
}

.footer-layout > * {
  min-width: 0;
}

.app-footer a {
  color: inherit;
  text-decoration: none;
  overflow-wrap: anywhere;
  transition: color 160ms ease;
}

.app-footer a:hover {
  color: var(--yunda-maple);
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.app-footer a:focus-visible {
  outline: 2px solid var(--yunda-bark);
  outline-offset: 3px;
  border-radius: 2px;
  text-decoration: underline;
  text-underline-offset: 0.2em;
}

.footer-brand {
  display: grid;
  gap: 1.25rem;
}

.footer-logo,
.footer-logo img {
  display: block;
  width: 7rem;
  height: auto;
}

.footer-social {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  margin-left: -0.5rem;
}

.footer-social-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  flex-shrink: 0;
}

.footer-social svg {
  width: 1.25rem;
  height: 1.25rem;
  fill: currentColor;
  flex-shrink: 0;
}

.footer-direct-contact {
  display: grid;
  gap: 0.75rem;
}

.footer-contact-label {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}

.footer-direct-contact a {
  display: flex;
  align-items: center;
  min-height: 2.75rem;
}

.footer-messaging {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
  max-width: 17rem;
}

.footer-contact-block {
  min-width: 0;
  font-size: 0.875rem;
}

.footer-contact-block > a,
.footer-messaging-id {
  display: flex;
  align-items: center;
  min-height: 2.75rem;
  margin: 0 0 0.5rem;
  line-height: 1.4;
}

.footer-contact-block picture {
  display: block;
}

.footer-contact-block img {
  display: block;
  width: 7rem;
  max-width: 100%;
  height: auto;
  aspect-ratio: 1;
  object-fit: contain;
  border: 1px solid var(--yunda-harvest);
  border-radius: 0.25rem;
}

.footer-heading {
  margin: 0 0 0.75rem;
  font-family: var(--font-text);
  font-size: 1.125rem;
  font-weight: 600;
  line-height: 1.4;
  overflow-wrap: anywhere;
  text-wrap: balance;
  text-transform: capitalize;
}

.footer-heading a {
  display: flex;
  align-items: flex-start;
  min-height: 2.75rem;
}

.footer-link-list {
  display: grid;
  gap: 0.4rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer-link-list a {
  display: flex;
  align-items: center;
  min-height: 2.75rem;
  padding-block: 0.375rem;
  font-size: 1rem;
  line-height: 1.65;
  text-transform: capitalize;
}

.footer-overview {
  font-weight: 600;
}

.footer-legal {
  display: grid;
  row-gap: 0.25rem;
  margin-top: 2rem;
  padding-top: 1.25rem;
  border-top: 1px solid var(--yunda-harvest);
  font-size: 0.875rem;
}

.footer-policies {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 0.5rem 1.5rem;
}

.footer-policies a {
  display: inline-flex;
  align-items: center;
  min-height: 2.75rem;
  text-transform: capitalize;
}

.footer-company-info {
  max-width: 65rem;
  margin: 0 auto;
  line-height: 1.65;
  text-align: center;
  white-space: pre-line;
  overflow-wrap: anywhere;
}

@media (min-width: 360px) and (max-width: 599px) {
  .footer-link-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 1.25rem;
  }
}

@media (min-width: 600px) and (max-width: 1023px) {
  .footer-layout {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .footer-brand {
    grid-column: 1 / -1;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 2rem;
  }

  .footer-logo,
  .footer-social,
  .footer-direct-contact {
    grid-column: 1;
  }

  .footer-messaging {
    grid-column: 2;
    grid-row: 1 / span 3;
    align-self: start;
  }
}

@media (min-width: 1024px) {
  .app-footer {
    padding: 3rem 2rem 2rem;
  }

  .footer-layout {
    grid-template-columns: minmax(14rem, 1.25fr) repeat(3, minmax(0, 1fr)) minmax(0, 0.7fr);
    column-gap: 1.5rem;
    row-gap: 0.75rem;
  }

  .footer-brand {
    gap: 1rem;
  }

  .footer-nav {
    display: grid;
    grid-template-rows: minmax(3.5rem, max-content) auto;
    gap: 0.75rem;
    align-self: start;
    align-items: start;
  }

  .footer-heading {
    margin: 0;
  }

  .footer-heading a {
    min-height: 0;
  }

  .footer-link-list a {
    min-height: 2.25rem;
    font-size: 0.9375rem;
  }

  .footer-contact-block img {
    width: 6rem;
  }

  .footer-legal {
    margin-top: 2.5rem;
  }
}

@media (min-width: 1280px) {
  .app-footer {
    padding-inline: 3rem;
  }

  .footer-layout {
    column-gap: 2rem;
  }

  .footer-heading {
    font-size: 1.25rem;
  }

  .footer-link-list a {
    font-size: 1rem;
  }
}
</style>

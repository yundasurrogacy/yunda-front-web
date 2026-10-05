<script setup>
import MobileApplyCta from './MobileApplyCta.vue'

const { locale, t } = useI18n()
const localePath = useLocalePath()

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
  <footer class="site-chrome-theme bg-[var(--yunda-petal)] px-4 py-10 font-sans md:px-10 md:py-12 xl:px-24" style="font-family: var(--font-text)">
    <div class="mx-auto max-w-300 xl:max-w-full">
      <!-- Footer Content. 笔记本宽度保持单列，避免三栏把联系方式挤断；宽屏再并排。 -->
      <div class="grid gap-x-8 gap-y-12 2xl:grid-cols-[max-content_max-content_minmax(0,1fr)] 2xl:items-start">
        <!-- Services Section -->
        <div class="order-1 mt-2 min-w-0 2xl:col-start-3 2xl:row-start-1 2xl:mt-0 2xl:pl-10 2xl:pt-16">
          <div class="footer-links">
            <div
              v-for="group in footerGroups"
              :key="group.title"
              class="min-w-0 text-left space-y-2"
            >
              <h3 class="mb-6 text-3.5 text-[var(--yunda-bark)] font-semibold uppercase lg:text-4.5">
                {{ group.title }}
              </h3>
              <div class="space-y-1">
                <hr class="my-2 border-[var(--yunda-bark)]">
                <NuxtLink
                  v-for="(link, index) in group.links"
                  :key="link.to"
                  :to="localePath(link.to)"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                  :class="index === 0 ? 'font-semibold' : ''"
                >
                  {{ link.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Company Info (Mobile: Bottom, md: Left side) -->
        <div class="order-2 mt-12 2xl:col-start-1 2xl:row-start-1 2xl:mt-0 2xl:max-w-[32rem]">
          <div>
            <div class="min-w-0">
              <div class="flex justify-start">
                <picture>
                  <source srcset="/images/shared/brand/logo.webp" type="image/webp">
                  <img src="/images/shared/brand/logo.png" alt="Yunda Logo" class="w-24 lg:w-28" loading="lazy" decoding="async">
                </picture>
              </div>

              <!-- About Us Section -->
              <div class="footer-company-nav mt-10 text-left text-3.5 md:text-4.5">
                <div class="space-y-1">
                  <hr class="my-2 border-[var(--yunda-bark)]">
                  <NuxtLink
                    :to="localePath('/about')"
                    class="block text-[var(--yunda-bark)] font-normal uppercase transition-colors hover:text-[var(--yunda-maple)]"
                  >
                    {{ $t('menu.aboutUs') }}
                  </NuxtLink>
                  <hr class="my-2 border-[var(--yunda-bark)]">
                  <a href="https://www.indeed.com/cmp/Yunda-Surrogacy" target="_blank" rel="noopener noreferrer" class="block text-[var(--yunda-bark)] font-normal uppercase transition-colors hover:text-[var(--yunda-maple)]">{{ $t('menu.careers') }}</a>
                  <hr class="my-2 border-[var(--yunda-bark)]">
                  <NuxtLink
                    :to="localePath('/resources')"
                    prefetch
                    class="block text-[var(--yunda-bark)] font-normal uppercase transition-colors hover:text-[var(--yunda-maple)]"
                  >
                    {{ $t('menu.resources') }}
                  </NuxtLink>
                  <hr class="my-2 border-[var(--yunda-bark)]">
                  <NuxtLink
                    :to="localePath('/blog')"
                    prefetch
                    class="block text-[var(--yunda-bark)] font-normal uppercase transition-colors hover:text-[var(--yunda-maple)]"
                  >
                    {{ $t('menu.blog') }}
                  </NuxtLink>
                  <hr class="my-2 border-[var(--yunda-bark)]">
                </div>
              </div>

              <!-- Social Links -->
              <div class="mt-7 flex items-center gap-3 text-[var(--yunda-bark)]">
                <a
                  href="https://www.instagram.com/yunda_surrogacy_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="$t('footer.socialLinks.instagram')"
                  class="h-7 w-7 inline-flex items-center justify-center transition-colors hover:text-[var(--yunda-maple)]"
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
                  class="h-7 w-7 inline-flex items-center justify-center transition-colors hover:text-[var(--yunda-maple)]"
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
                  class="h-7 w-7 inline-flex items-center justify-center transition-colors hover:text-[var(--yunda-maple)]"
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
                  class="h-7 w-7 inline-flex items-center justify-center transition-colors hover:text-[var(--yunda-maple)]"
                >
                  <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M4.98 3.5A2.5 2.5 0 1 1 5 8.5a2.5 2.5 0 0 1-.02-5ZM2.5 10h5v11.5h-5V10Zm8 0h4.8v1.57h.07c.67-1.2 2.3-2.47 4.73-2.47 5.06 0 5.9 3.33 5.9 7.67v4.73h-5v-4.2c0-1.01-.02-2.3-1.4-2.3-1.4 0-1.62 1.1-1.62 2.23v4.27h-5V10Z" />
                  </svg>
                  <span class="sr-only">{{ $t('footer.socialLinks.linkedin') }}</span>
                </a>
                <a
                  href="https://www.tiktok.com/@yunda.surrogacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  class="h-7 w-7 inline-flex items-center justify-center transition-colors hover:text-[var(--yunda-maple)]"
                >
                  <svg viewBox="0 0 24 24" class="h-5 w-5 fill-current" aria-hidden="true">
                    <path d="M15.45 2h3.06c.25 1.93 1.3 3.48 3.49 4.33v3.13a9.2 9.2 0 0 1-3.46-1.08v6.9A5.72 5.72 0 1 1 13.6 9.6v3.24a2.55 2.55 0 1 0 1.85 2.44V2Z" />
                  </svg>
                  <span class="sr-only">TikTok</span>
                </a>
              </div>
            </div>

            <!-- Phone and Email below Blog -->
            <div class="mt-8 max-w-full text-left text-3.5 space-y-4 md:text-4.5">
              <p class="flex flex-wrap items-baseline gap-x-2 text-[var(--yunda-bark)] font-normal uppercase md:flex-nowrap md:whitespace-nowrap">
                <span>{{ $t('menu.phone') }}</span>
                <a
                  :href="`tel:${$t('footer.phoneNumber').replace(/[^0-9+]/g, '')}`"
                  class="whitespace-nowrap normal-case transition-colors hover:text-[var(--yunda-maple)] hover:underline"
                >
                  {{ $t('footer.phoneNumber') }}
                </a>
              </p>
              <p class="flex flex-wrap items-baseline gap-x-2 text-[var(--yunda-bark)] font-normal uppercase md:flex-nowrap md:whitespace-nowrap">
                <span>{{ $t('menu.email') }}</span>
                <a
                  href="mailto:kaylal@yundasurrogacy.com"
                  class="whitespace-nowrap normal-case transition-colors hover:text-[var(--yunda-maple)] hover:underline"
                >
                  kaylal@yundasurrogacy.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <!-- Messaging Contacts -->
        <div class="order-3 min-w-0 2xl:col-start-2 2xl:row-start-1 2xl:pt-24">
          <div class="grid w-max max-w-full grid-cols-1 items-start gap-x-10 gap-y-8 text-left text-3.5 sm:grid-cols-[max-content_max-content] md:text-4">
            <!-- WhatsApp -->
            <div v-if="locale === 'en'">
              <p class="text-[var(--yunda-bark)] font-normal uppercase">
                {{ $t('menu.whatsapp') }}
              </p>
              <a
                :href="`https://wa.me/${$t('footer.whatsappNumber').replace(/[^0-9+]/g, '')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="mt-1 block whitespace-nowrap normal-case transition-colors hover:text-[var(--yunda-maple)] hover:underline"
              >
                {{ $t('footer.whatsappNumber') }}
              </a>
              <picture class="mt-3 block w-fit">
                <source srcset="/images/shared/contact/whatsapp.webp" type="image/webp">
                <img src="/images/shared/contact/whatsapp.png" :alt="$t('menu.whatsapp')" class="h-28 w-28 border border-[var(--yunda-bark)]/15 rounded shadow" loading="lazy" decoding="async">
              </picture>
            </div>

            <!-- WeChat -->
            <div>
              <p class="text-[var(--yunda-bark)] font-normal uppercase">
                {{ $t('menu.wechat') }}
              </p>
              <p class="mt-1 whitespace-nowrap text-[var(--yunda-bark)] font-normal">
                {{ $t('footer.wechatId') }}
              </p>
              <img
                src="/images/shared/contact/wechat-yundaus1.jpg"
                :alt="`${$t('menu.wechat')} ${$t('footer.wechatId')} QR code`"
                class="mt-3 h-28 w-28 border border-[var(--yunda-bark)]/15 rounded object-contain shadow"
                loading="lazy"
                decoding="async"
              >
            </div>
          </div>
        </div>
      </div>

      <!-- Policy Links -->
      <div class="mt-4 border-t border-[var(--yunda-bark)]/20 pt-4 lg:mt-6">
        <div class="flex flex-col items-center justify-center gap-2 md:flex-row md:gap-4">
          <NuxtLink
            :to="localePath('/privacy-policy')"
            class="text-2.5 text-[var(--yunda-bark)] font-normal transition-colors lg:text-2.75 hover:text-[var(--yunda-maple)]"
          >
            {{ $t('footer.policyLinks.privacyPolicy') }}
          </NuxtLink>
          <span class="hidden text-[var(--yunda-bark)] md:inline">|</span>
          <NuxtLink
            :to="localePath('/terms-of-service')"
            class="text-2.5 text-[var(--yunda-bark)] font-normal transition-colors lg:text-2.75 hover:text-[var(--yunda-maple)]"
          >
            {{ $t('footer.policyLinks.termsOfService') }}
          </NuxtLink>
          <span class="hidden text-[var(--yunda-bark)] md:inline">|</span>
          <NuxtLink
            :to="localePath('/disclaimer')"
            class="text-2.5 text-[var(--yunda-bark)] font-normal transition-colors lg:text-2.75 hover:text-[var(--yunda-maple)]"
          >
            {{ $t('footer.policyLinks.disclaimer') }}
          </NuxtLink>
          <span class="hidden text-[var(--yunda-bark)] md:inline">|</span>
          <NuxtLink
            :to="localePath('/sitemap')"
            class="text-2.5 text-[var(--yunda-bark)] font-normal transition-colors lg:text-2.75 hover:text-[var(--yunda-maple)]"
          >
            {{ $t('footer.policyLinks.sitemap') }}
          </NuxtLink>
        </div>
      </div>

      <!-- Legal Disclaimer / Company Info -->
      <div class="mt-4 border-t border-[var(--yunda-bark)]/20 pt-4 lg:mt-6">
        <p class="whitespace-pre-line text-center text-2.5 text-[var(--yunda-bark)] font-normal lg:w-full lg:text-center lg:text-2.75">
          {{ $t('footer.companyInfo') }}
        </p>
      </div>
    </div>
  </footer>
  <MobileApplyCta />
</template>

<style scoped>
.footer-company-nav {
  width: max-content;
  max-width: 100%;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 2rem;
}

@media (min-width: 768px) {
  .footer-links {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 3rem;
    row-gap: 2.5rem;
  }
}

@media (min-width: 1024px) {
  .footer-links {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    column-gap: 2rem;
  }
}

@media (min-width: 1280px) {
  .footer-links {
    column-gap: 2rem;
  }
}
</style>

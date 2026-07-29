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
  <footer class="bg-[var(--yunda-petal)] px-4 py-10 font-sans md:px-20 md:py-12 xl:px-60" style="font-family: var(--font-text)">
    <div class="mx-auto max-w-300 md:max-w-full">
      <!-- Footer Content -->
      <div class="flex flex-col md:flex-row md:items-start md:justify-between">
        <!-- Services Section (Mobile: Top, LG: Right side) -->
        <div class="order-1 mt-2 md:order-2 md:ml-auto md:mt-0 md:pl-12">
          <div class="footer-links">
            <div
              v-for="group in footerGroups"
              :key="group.title"
              class="min-w-[220px] text-left space-y-2"
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
        <div class="order-2 mt-12 md:order-1 md:mt-0 md:max-w-80 md:flex-shrink-0">
          <div class="mb-6 flex justify-start">
            <picture>
              <source srcset="/images/shared/brand/logo.webp" type="image/webp">
              <img src="/images/shared/brand/logo.png" alt="Yunda Logo" class="w-80px lg:h-[3.15rem] lg:object-contain lg:object-left" loading="lazy" decoding="async">
            </picture>
          </div>

          <!-- About Us Section -->
          <div class="mb-8 text-left text-3.5 md:text-4.5">
            <div class="mt-2 space-y-1">
              <hr class="my-2 border-[var(--yunda-bark)]">
              <NuxtLink
                :to="localePath('/about')"
                class="block text-[var(--yunda-bark)] font-normal uppercase transition-colors hover:text-[var(--yunda-maple)]"
              >
                {{ $t('menu.aboutUs') }}
              </NuxtLink>
              <hr class="my-2 border-[var(--yunda-bark)]">
              <!-- <a href="#" class="block text-[var(--yunda-bark)] font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('menu.logIn') }}</a>
              <hr class="border-[var(--yunda-bark)] my-2"> -->
              <a href="https://www.indeed.com/cmp/Yunda-Surrogacy" class="block text-[var(--yunda-bark)] font-normal uppercase transition-colors hover:text-[var(--yunda-maple)]">{{ $t('menu.careers') }}</a>
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

          <!-- Contact Info -->
          <div class="mb-8 text-left text-3.5 space-y-4 md:text-4.5">
            <div>
              <p class="text-[var(--yunda-bark)] font-normal uppercase">
                {{ $t('menu.phone') }}
              </p>
              <a
                :href="`tel:${$t('footer.phoneNumber').replace(/[^0-9+]/g, '')}`"
                class="text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)] hover:underline"
              >
                {{ $t('footer.phoneNumber') }}
              </a>
            </div>

            <div>
              <p class="text-[var(--yunda-bark)] font-normal uppercase">
                {{ $t('menu.email') }}
              </p>
              <a
                href="mailto:kaylal@yundasurrogacy.com"
                class="text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)] hover:underline"
              >
                kaylal@yundasurrogacy.com
              </a>
            </div>

            <!-- 英文显示 WhatsApp，中文显示微信 -->
            <div v-if="locale === 'en'">
              <p class="text-[var(--yunda-bark)] font-normal uppercase">
                {{ $t('menu.whatsapp') }}
              </p>
              <a
                :href="`https://wa.me/${$t('footer.whatsappNumber').replace(/[^0-9+]/g, '')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)] hover:underline"
              >
                {{ $t('footer.whatsappNumber') }}
              </a>
              <div class="mt-2 flex items-center">
                <picture>
                  <source srcset="/images/shared/contact/whatsapp.webp" type="image/webp">
                  <img src="/images/shared/contact/whatsapp.png" :alt="$t('menu.whatsapp')" class="h-28 w-28 border border-[var(--yunda-bark)]/15 rounded shadow">
                </picture>
              </div>
            </div>
            <div v-else>
              <p class="text-[var(--yunda-bark)] font-normal uppercase">
                {{ $t('menu.wechat') }}
              </p>
              <p class="text-[var(--yunda-bark)] font-normal">
                {{ $t('footer.wechatId') }}
              </p>
              <div class="mt-2 flex items-center">
                <picture>
                  <source srcset="/images/shared/contact/wechat.webp" type="image/webp">
                  <img src="/images/shared/contact/wechat.png" alt="微信二维码" class="h-28 w-28 border border-[var(--yunda-bark)]/15 rounded shadow">
                </picture>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="text-left text-3.5 space-y-1 lg:text-4">
            <a href="https://www.instagram.com/yunda_surrogacy_/" target="_blank" rel="noopener noreferrer" class="block text-[var(--yunda-bark)] font-normal uppercase transition-colors hover:text-[var(--yunda-maple)]">{{ $t('footer.socialLinks.instagram') }}</a>
            <a href="https://www.facebook.com/people/Yunda-Surrogacy/61577914871802/" target="_blank" rel="noopener noreferrer" class="block text-[var(--yunda-bark)] font-normal uppercase transition-colors hover:text-[var(--yunda-maple)]">{{ $t('footer.socialLinks.facebook') }}</a>
            <a href="https://www.youtube.com/@YundaSurrogacy" target="_blank" rel="noopener noreferrer" class="block text-[var(--yunda-bark)] font-normal uppercase transition-colors hover:text-[var(--yunda-maple)]">{{ $t('footer.socialLinks.youtube') }}</a>
            <a href="https://www.linkedin.com/company/yunda-surrogacy" target="_blank" rel="noopener noreferrer" class="block text-[var(--yunda-bark)] font-normal uppercase transition-colors hover:text-[var(--yunda-maple)]">{{ $t('footer.socialLinks.linkedin') }}</a>
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
    column-gap: 4rem;
  }
}

@media (min-width: 1280px) {
  .footer-links {
    column-gap: 5rem;
  }
}
</style>

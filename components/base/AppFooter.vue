<script setup>
import MobileApplyCta from './MobileApplyCta.vue'

const { locale } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <footer class="bg-[var(--yunda-petal)] px-4 py-10 font-sans md:px-20 md:py-12 xl:px-60" style="font-family: var(--font-text)">
    <div class="mx-auto max-w-300 md:max-w-full">
      <!-- Logo -->
      <div class="flex justify-start">
        <picture>
          <source srcset="/images/base/logo.webp" type="image/webp">
          <img src="/images/base/logo.png" alt="Yunda Logo" class="w-80px" loading="lazy" decoding="async">
        </picture>
      </div>

      <!-- Footer Content -->
      <div class="flex flex-col md:flex-row md:items-start md:justify-between">
        <!-- Services Section (Mobile: Top, LG: Right side) -->
        <div class="order-1 mt-2 md:order-2 md:ml-auto md:mt-0 md:pl-12">
          <div class="footer-links">
            <!-- Become a Parent -->
            <div class="min-w-[220px] text-left space-y-2">
              <h3 class="mb-6 text-3.5 text-[var(--yunda-bark)] font-semibold uppercase lg:text-4.5">
                {{ $t('footer.sections.becomeAParent') }}
              </h3>
              <div class="space-y-1">
                <h4 class="text-3.5 text-[var(--yunda-bark)] font-semibold uppercase lg:text-4">
                  {{ $t('footer.sections.intendedParent') }}
                </h4>
                <hr class="my-2 border-[var(--yunda-bark)]">
                <NuxtLink
                  :to="localePath('/intended-parents')"
                  class="block text-3 text-[var(--yunda-bark)] font-semibold uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.intendedParent') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/surrogacy-process')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.process') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/surrogacy-cost')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.surrogacyCost') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/egg-donation')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.eggDonors') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/single-parents-lgbtq')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.singleParentsLgbtq') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/partner-ivf-clinics')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.partnerClinics') }}
                </NuxtLink>
              </div>
            </div>

            <!-- Become a Surrogate -->
            <div class="min-w-[220px] text-left space-y-2">
              <h3 class="mb-6 text-3.5 text-[var(--yunda-bark)] font-semibold uppercase lg:text-4.5">
                {{ $t('footer.sections.becomeASurrogate') }}
              </h3>
              <div class="space-y-1">
                <h4 class="text-3.5 text-[var(--yunda-bark)] font-semibold uppercase lg:text-4">
                  {{ $t('footer.sections.surrogates') }}
                </h4>
                <hr class="my-2 border-[var(--yunda-bark)]">
                <NuxtLink
                  :to="localePath('/surrogates')"
                  class="block text-3 text-[var(--yunda-bark)] font-semibold uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.surrogates') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/journey')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.surrogacyJourney') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/eligibility')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.eligibility') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/screening')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.screening') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/benefit')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.benefits') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/referral')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.surrogateReferral') }}
                </NuxtLink>
              </div>
            </div>

            <!-- Surrogate Guide -->
            <div class="min-w-[220px] text-left space-y-2">
              <h3 class="mb-6 text-3.5 text-[var(--yunda-bark)] font-semibold uppercase lg:text-4.5">
                {{ $t('footer.sections.surrogateResources') }}
              </h3>
              <div class="space-y-1">
                <hr class="my-2 border-[var(--yunda-bark)]">
                <NuxtLink
                  :to="localePath('/california-surrogacy-consultation')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.surrogateConsultation') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/become-a-surrogate')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.surrogateMother') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/become-surrogate-california')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.surrogateCalifornia') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/surrogate-process')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.surrogateProcess') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/surrogate-compensation')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.surrogateCompensation') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/surrogate-requirements')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.surrogateRequirements') }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/surrogacy-protection-california')"
                  class="block text-3 text-[var(--yunda-bark)] font-normal uppercase transition-colors lg:text-3.5 hover:text-[var(--yunda-maple)]"
                >
                  {{ $t('footer.sections.surrogateProtection') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <!-- Company Info (Mobile: Bottom, md: Left side) -->
        <div class="order-2 mt-12 md:order-1 md:mt-0 md:max-w-80 md:flex-shrink-0">
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
                  <source srcset="/images/home/whatsapp.webp" type="image/webp">
                  <img src="/images/home/whatsapp.png" :alt="$t('menu.whatsapp')" class="h-28 w-28 border border-[var(--yunda-bark)]/15 rounded shadow">
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
                  <source srcset="/images/home/wx.webp" type="image/webp">
                  <img src="/images/home/wx.png" alt="微信二维码" class="h-28 w-28 border border-[var(--yunda-bark)]/15 rounded shadow">
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

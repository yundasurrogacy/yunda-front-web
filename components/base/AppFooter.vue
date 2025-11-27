<script setup>
const { locale } = useI18n()
</script>

<template>
  <footer class="bg-[var(--foot-bg)] px-4 py-10 md:px-20 md:py-12 xl:px-60">
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
              <h3 class="mb-6 text-3.5 text-[var(--dark-brown)] font-normal uppercase lg:text-4.5">
                {{ $t('footer.sections.becomeAParent') }}
              </h3>
              <div class="space-y-1">
                <h4 class="text-3.5 text-[var(--dark-brown)] font-normal uppercase lg:text-4">
                  {{ $t('footer.sections.intendedParent') }}
                </h4>
                <hr class="my-2 border-[var(--dark-brown)]">
                <NuxtLink
                  to="/surrogacy-process"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.process') }}
                </NuxtLink>
                <NuxtLink
                  to="/surrogacy-price"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.surrogacyCost') }}
                </NuxtLink>
                <NuxtLink
                  to="/egg-donation"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.eggDonors') }}
                </NuxtLink>
                <NuxtLink
                  to="/single-parents-lgbtq"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.singleParentsLgbtq') }}
                </NuxtLink>
                <NuxtLink
                  to="/partner-ivf-clinics"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.partnerClinics') }}
                </NuxtLink>
              </div>
            </div>

            <!-- Become a Surrogate -->
            <div class="min-w-[220px] text-left space-y-2">
              <h3 class="mb-6 text-3.5 text-[var(--dark-brown)] font-normal uppercase lg:text-4.5">
                {{ $t('footer.sections.becomeASurrogate') }}
              </h3>
              <div class="space-y-1">
                <h4 class="text-3.5 text-[var(--dark-brown)] font-normal uppercase lg:text-4">
                  {{ $t('footer.sections.surrogates') }}
                </h4>
                <hr class="my-2 border-[var(--dark-brown)]">
                <NuxtLink
                  to="/journey"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.surrogacyJourney') }}
                </NuxtLink>
                <NuxtLink
                  to="/eligibility"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.eligibility') }}
                </NuxtLink>
                <NuxtLink
                  to="/screening"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.screening') }}
                </NuxtLink>
                <NuxtLink
                  to="/benefit"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.benefits') }}
                </NuxtLink>
                <NuxtLink
                  to="/referral"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.surrogateReferral') }}
                </NuxtLink>
              </div>
            </div>

            <!-- Surrogate Resources -->
            <div class="min-w-[220px] text-left space-y-2">
              <h3 class="mb-6 text-3.5 text-[var(--dark-brown)] font-normal uppercase lg:text-4.5">
                {{ $t('footer.sections.surrogateResources') }}
              </h3>
              <div class="space-y-1">
                <hr class="my-2 border-[var(--dark-brown)]">
                <NuxtLink
                  to="/become-surrogate-california"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.surrogateCalifornia') }}
                </NuxtLink>
                <NuxtLink
                  to="/become-a-surrogate"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.surrogateMother') }}
                </NuxtLink>
                <NuxtLink
                  to="/surrogate-process"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.surrogateProcess') }}
                </NuxtLink>
                <NuxtLink
                  to="/surrogate-compensation"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.surrogateCompensation') }}
                </NuxtLink>
                <NuxtLink
                  to="/surrogate-requirements"
                  class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75"
                >
                  {{ $t('footer.sections.surrogateRequirements') }}
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
              <hr class="my-2 border-[var(--dark-brown)]">
              <NuxtLink
                to="/about"
                class="block text-[var(--dark-brown)] font-normal uppercase transition-opacity hover:opacity-75"
              >
                {{ $t('menu.aboutUs') }}
              </NuxtLink>
              <hr class="my-2 border-[var(--dark-brown)]">
              <!-- <a href="#" class="block text-[var(--dark-brown)] font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('menu.logIn') }}</a>
              <hr class="border-[var(--dark-brown)] my-2"> -->
              <a href="https://www.indeed.com/cmp/Yunda-Surrogacy" class="block text-[var(--dark-brown)] font-normal uppercase transition-opacity hover:opacity-75">{{ $t('menu.careers') }}</a>
              <hr class="my-2 border-[var(--dark-brown)]">
              <NuxtLink
                to="/blog"
                prefetch
                class="block text-[var(--dark-brown)] font-normal uppercase transition-opacity hover:opacity-75"
              >
                {{ $t('menu.blog') }}
              </NuxtLink>
              <hr class="my-2 border-[var(--dark-brown)]">
            </div>
          </div>

          <!-- Contact Info -->
          <div class="mb-8 text-left text-3.5 space-y-4 md:text-4.5">
            <div>
              <p class="text-[var(--dark-brown)] font-normal uppercase">
                {{ $t('menu.phone') }}
              </p>
              <a
                :href="`tel:${$t('footer.phoneNumber').replace(/[^0-9+]/g, '')}`"
                class="text-[var(--dark-brown)] font-normal hover:underline"
              >
                {{ $t('footer.phoneNumber') }}
              </a>
            </div>

            <div>
              <p class="text-[var(--dark-brown)] font-normal uppercase">
                {{ $t('menu.email') }}
              </p>
              <a
                href="mailto:kaylal@yundasurrogacy.com"
                class="text-[var(--dark-brown)] font-normal hover:underline"
              >
                kaylal@yundasurrogacy.com
              </a>
            </div>

            <!-- 英文显示 WhatsApp，中文显示微信 -->
            <div v-if="locale === 'en'">
              <p class="text-[var(--dark-brown)] font-normal uppercase">
                {{ $t('menu.whatsapp') }}
              </p>
              <a
                :href="`https://wa.me/${$t('footer.whatsappNumber').replace(/[^0-9+]/g, '')}`"
                target="_blank"
                rel="noopener noreferrer"
                class="text-[var(--dark-brown)] font-normal hover:underline"
              >
                {{ $t('footer.whatsappNumber') }}
              </a>
              <div class="mt-2 flex items-center">
                <picture>
                  <source srcset="/images/home/whatsapp.webp" type="image/webp">
                  <img src="/images/home/whatsapp.png" :alt="$t('menu.whatsapp')" class="h-28 w-28 border border-gray-300 rounded shadow">
                </picture>
              </div>
            </div>
            <div v-else>
              <p class="text-[var(--dark-brown)] font-normal uppercase">
                {{ $t('menu.wechat') }}
              </p>
              <p class="text-[var(--dark-brown)] font-normal">
                {{ $t('footer.wechatId') }}
              </p>
              <div class="mt-2 flex items-center">
                <picture>
                  <source srcset="/images/home/wx.webp" type="image/webp">
                  <img src="/images/home/wx.png" alt="微信二维码" class="h-28 w-28 border border-gray-300 rounded shadow">
                </picture>
              </div>
            </div>
          </div>

          <!-- Social Links -->
          <div class="text-left text-3.5 space-y-1 lg:text-4">
            <a href="https://www.instagram.com/yunda_surrogacy_/" target="_blank" rel="noopener noreferrer" class="block text-[var(--dark-brown)] font-normal uppercase transition-opacity hover:opacity-75">{{ $t('footer.socialLinks.instagram') }}</a>
            <a href="https://www.facebook.com/people/Yunda-Surrogacy/61577914871802/" target="_blank" rel="noopener noreferrer" class="block text-[var(--dark-brown)] font-normal uppercase transition-opacity hover:opacity-75">{{ $t('footer.socialLinks.facebook') }}</a>
            <a href="https://www.youtube.com/@YundaSurrogacy" target="_blank" rel="noopener noreferrer" class="block text-[var(--dark-brown)] font-normal uppercase transition-opacity hover:opacity-75">{{ $t('footer.socialLinks.youtube') }}</a>
            <a href="https://www.linkedin.com/company/yunda-surrogacy" target="_blank" rel="noopener noreferrer" class="block text-[var(--dark-brown)] font-normal uppercase transition-opacity hover:opacity-75">{{ $t('footer.socialLinks.linkedin') }}</a>
          </div>
        </div>
      </div>

      <!-- Legal Disclaimer -->
      <div class="mt-4 border-t border-[var(--dark-brown)]/20 pt-4 lg:mt-6">
        <p class="text-center text-2.5 text-[var(--dark-brown)] font-normal lg:w-full lg:text-center lg:text-2.75">
          {{ $t('footer.legalDisclaimer') }}
        </p>
      </div>
    </div>
  </footer>
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

<script setup>
import HiddenSeoLinks from '@/components/base/HiddenSeoLinks.vue'
</script>

<template>
  <footer class="bg-[var(--foot-bg)] px-4 py-10 md:px-20 md:py-12 xl:px-60">
    <HiddenSeoLinks />
    <div class="mx-auto max-w-300 md:max-w-full">
      <!-- Logo -->
      <div class="flex justify-start">
        <img src="~/public/images/base/logo.png" alt="Yunda Logo" class="w-80px">
      </div>

      <!-- Footer Content -->
      <div class="flex flex-col md:flex-row md:items-start md:justify-between">
        <!-- Services Section (Mobile: Top, LG: Right side) -->
        <div class="order-1 mt-2 md:order-2 md:ml-auto md:mt-0">
          <div class="flex flex-row justify-between gap-4 md:gap-6 xl:gap-30">
            <!-- Become a Parent -->
            <div class="md:w-max-60 w-60 text-left">
              <h3 class="mb-6 text-3.5 text-[var(--dark-brown)] font-normal uppercase lg:text-4.5">
                {{ $t('footer.sections.becomeAParent') }}
              </h3>
              <div class="space-y-1">
                <h4 class="text-3.5 text-[var(--dark-brown)] font-normal uppercase lg:text-4">
                  {{ $t('footer.sections.intendedParent') }}
                </h4>
                <hr class="my-2 border-[var(--dark-brown)]">
                <a href="/surrogacy-process" class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75">{{ $t('footer.sections.process') }}</a>
                <a href="/surrogacy-price" class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75">{{ $t('footer.sections.surrogacyCost') }}</a>
                <a href="/egg-donation" class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75">{{ $t('footer.sections.eggDonors') }}</a>
                <a href="/single-parents-lgbtq" class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75">{{ $t('footer.sections.singleParentsLgbtq') }}</a>
                <a href="/partner-ivf-clinics" class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75">{{ $t('footer.sections.partnerClinics') }}</a>
              </div>
            </div>

            <!-- Become a Surrogate -->
            <div class="md:w-max-60 w-60 text-left">
              <h3 class="mb-6 text-3.5 text-[var(--dark-brown)] font-normal uppercase lg:text-4.5">
                {{ $t('footer.sections.becomeASurrogate') }}
              </h3>
              <div class="space-y-1">
                <h4 class="text-3.5 text-[var(--dark-brown)] font-normal uppercase lg:text-4">
                  {{ $t('footer.sections.surrogates') }}
                </h4>
                <hr class="my-2 border-[var(--dark-brown)]">
                <a href="/journey" class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75">{{ $t('footer.sections.surrogacyJourney') }}</a>
                <a href="/eligibility" class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75">{{ $t('footer.sections.eligibility') }}</a>
                <a href="/screening" class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75">{{ $t('footer.sections.screening') }}</a>
                <a href="/benefit" class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75">{{ $t('footer.sections.benefits') }}</a>
                <a href="/referral" class="block text-3 text-[var(--dark-brown)] font-normal uppercase transition-opacity lg:text-3.5 hover:opacity-75">{{ $t('footer.sections.surrogateReferral') }}</a>
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
              <a href="/about" class="block text-[var(--dark-brown)] font-normal uppercase transition-opacity hover:opacity-75">{{ $t('menu.aboutUs') }}</a>
              <hr class="my-2 border-[var(--dark-brown)]">
              <!-- <a href="#" class="block text-[var(--dark-brown)] font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('menu.logIn') }}</a>
              <hr class="border-[var(--dark-brown)] my-2"> -->
              <a href="https://www.indeed.com/cmp/Yunda-Surrogacy" class="block text-[var(--dark-brown)] font-normal uppercase transition-opacity hover:opacity-75">{{ $t('menu.careers') }}</a>
              <hr class="my-2 border-[var(--dark-brown)]">
              <a href="/blog" class="block text-[var(--dark-brown)] font-normal uppercase transition-opacity hover:opacity-75">
                {{ $t('menu.blog') }}
              </a>
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
                :href="`tel:${$t('footer.phoneNumber')}`"
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

            <div>
              <p class="text-[var(--dark-brown)] font-normal uppercase">
                {{ $t('menu.wechat') }}
              </p>
              <p class="text-[var(--dark-brown)] font-normal">
                {{ $t('footer.wechatId') }}
              </p>
              <div class="mt-2 flex items-center">
                <img src="~/public/images/home/wx.jpg" alt="微信二维码" class="h-28 w-28 border border-gray-300 rounded shadow">
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

<style scoped></style>

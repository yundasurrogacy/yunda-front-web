<template>
  <footer class="py-10 md:py-12 px-4 md:px-20 xl:px-60 bg-[var(--foot-bg)]">
    <div class="max-w-300 md:max-w-full mx-auto">
      <!-- Logo -->
      <div class="flex justify-start">
        <img src="~/public/images/base/logo.png" alt="Yunda Logo" class="w-80px">
      </div>

      <!-- Footer Content -->
      <div class="flex flex-col md:flex-row md:justify-between md:items-start">
        <!-- Services Section (Mobile: Top, LG: Right side) -->
        <div class="order-1 md:order-2 md:ml-auto mt-2 md:mt-0">
          <div class="flex flex-row gap-4 md:gap-6 xl:gap-30 justify-between">
            <!-- Become a Parent -->
            <div class="w-60 md:w-max-60 text-left">
              <h3 class="text-[var(--dark-brown)] text-3.5 lg:text-4.5 font-normal mb-6 uppercase">{{ $t('footer.sections.becomeAParent') }}</h3>
              <div class="space-y-1">
                <h4 class="text-[var(--dark-brown)] text-3.5 lg:text-4 font-normal uppercase">{{ $t('footer.sections.intendedParent') }}</h4>
                <hr class="border-[var(--dark-brown)] my-2">
                <a href="/surrogacy-process" class="block text-[var(--dark-brown)] text-3 lg:text-3.5 font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('footer.sections.process') }}</a>
                <a href="/surrogacy-price" class="block text-[var(--dark-brown)] text-3 lg:text-3.5 font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('footer.sections.surrogacyCost') }}</a>
                <a href="/egg-donation" class="block text-[var(--dark-brown)] text-3 lg:text-3.5 font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('footer.sections.eggDonors') }}</a>
                <a href="/single-parents-lgbtq" class="block text-[var(--dark-brown)] text-3 lg:text-3.5 font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('footer.sections.singleParentsLgbtq') }}</a>
                <a href="/partner-ivf-clinics" class="block text-[var(--dark-brown)] text-3 lg:text-3.5 font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('footer.sections.partnerClinics') }}</a>
              </div>
            </div>

            <!-- Become a Surrogate -->
            <div class="w-60 md:w-max-60 text-left">
              <h3 class="text-[var(--dark-brown)] text-3.5 lg:text-4.5 font-normal mb-6 uppercase">{{ $t('footer.sections.becomeASurrogate') }}</h3>
              <div class="space-y-1">
                <h4 class="text-[var(--dark-brown)] text-3.5 lg:text-4 font-normal uppercase">{{ $t('footer.sections.surrogates') }}</h4>
                <hr class="border-[var(--dark-brown)] my-2">
                <a href="/journey" class="block text-[var(--dark-brown)] text-3 lg:text-3.5 font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('footer.sections.surrogacyJourney') }}</a>
                <a href="/eligibility" class="block text-[var(--dark-brown)] text-3 lg:text-3.5 font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('footer.sections.eligibility') }}</a>
                <a href="/screening" class="block text-[var(--dark-brown)] text-3 lg:text-3.5 font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('footer.sections.screening') }}</a>
                <a href="/benefit" class="block text-[var(--dark-brown)] text-3 lg:text-3.5 font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('footer.sections.benefits') }}</a>
                <a href="/referral" class="block text-[var(--dark-brown)] text-3 lg:text-3.5 font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('footer.sections.surrogateReferral') }}</a>
              </div>
            </div>
          </div>
        </div>

        <!-- Company Info (Mobile: Bottom, md: Left side) -->
        <div class="order-2 md:order-1 md:flex-shrink-0 md:max-w-80 mt-12 md:mt-0">
          <!-- About Us Section -->
          <div class="mb-8 text-3.5 md:text-4.5 text-left">
            <div class="space-y-1 mt-2">
              <hr class="border-[var(--dark-brown)] my-2">
              <a href="/about" class="block text-[var(--dark-brown)] font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('menu.aboutUs') }}</a>
              <hr class="border-[var(--dark-brown)] my-2">
              <!-- <a href="#" class="block text-[var(--dark-brown)] font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('menu.logIn') }}</a>
              <hr class="border-[var(--dark-brown)] my-2"> -->
              <a href="https://www.indeed.com/cmp/Yunda-Surrogacy" class="block text-[var(--dark-brown)] font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('menu.careers') }}</a>
              <hr class="border-[var(--dark-brown)] my-2">
            </div>
          </div>

          <!-- Contact Info -->
          <div class="space-y-4 text-3.5 md:text-4.5 text-left mb-8">
            <div>
              <p class="text-[var(--dark-brown)]  font-normal uppercase">{{ $t('menu.phone') }}</p>
              <p class="text-[var(--dark-brown)]  font-normal">{{ $t('footer.phoneNumber') }}</p>
            </div>

            <div>
              <p class="text-[var(--dark-brown)] font-normal uppercase">{{ $t('menu.email') }}</p>
              <p class="text-[var(--dark-brown)] font-normal">kaylal@yundasurrogacy.com</p>
            </div>

            <div>
              <p class="text-[var(--dark-brown)] font-normal uppercase">{{ $t('menu.wechat') }}</p>
              <p class="text-[var(--dark-brown)] font-normal">{{ $t('footer.wechatId') }}</p>
            </div>
          </div>

          <!-- Social Links -->
          <div class="space-y-1 text-3.5 lg:text-4 text-left">
            <a href="https://www.instagram.com/yunda_surrogacy_/" target="_blank" rel="noopener noreferrer" class="block text-[var(--dark-brown)] font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('footer.socialLinks.instagram') }}</a>
            <a href="https://www.facebook.com/people/Yunda-Surrogacy/61577914871802/" target="_blank" rel="noopener noreferrer" class="block text-[var(--dark-brown)] font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('footer.socialLinks.facebook') }}</a>
            <a href="https://www.youtube.com/@YundaSurrogacy" target="_blank" rel="noopener noreferrer" class="block text-[var(--dark-brown)] font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('footer.socialLinks.youtube') }}</a>
            <a href="https://www.linkedin.com/company/yunda-surrogacy" target="_blank" rel="noopener noreferrer" class="block text-[var(--dark-brown)] font-normal uppercase hover:opacity-75 transition-opacity">{{ $t('footer.socialLinks.linkedin') }}</a>
          </div>
        </div>
      </div>

      <!-- Legal Disclaimer -->
      <div class="mt-4 lg:mt-6 pt-4 border-t border-[var(--dark-brown)]/20">
        <p class="text-[var(--dark-brown)] text-2.5 lg:text-2.75 font-normal text-center lg:text-center lg:w-full">
          {{ $t('footer.legalDisclaimer') }}
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped></style>
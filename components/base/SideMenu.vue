<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['update:isOpen'])

const { locale } = useI18n()
const localePath = useLocalePath()

const internalIsOpen = computed({
  get: () => props.isOpen,
  set: value => emit('update:isOpen', value),
})

const surrogateResourceLinks = [
  { to: '/california-surrogacy-consultation', label: 'menu.resourceConsultation' },
  { to: '/become-a-surrogate', label: 'menu.resourceBecomeMother' },
  { to: '/become-surrogate-california', label: 'menu.resourceCalifornia' },
  { to: '/surrogate-process', label: 'menu.resourceJourney' },
  { to: '/surrogate-compensation', label: 'menu.resourceCompensation' },
  { to: '/surrogate-requirements', label: 'menu.resourceRequirements' },
  { to: '/surrogacy-protection-california', label: 'menu.resourceProtection' },
]

// 切换菜单显示状态
function toggleMenu() {
  internalIsOpen.value = !internalIsOpen.value
}
</script>

<template>
  <div class="relative">
    <!-- 遮罩层和菜单内容 -->
    <Transition name="menu-overlay">
      <div v-if="internalIsOpen" class="fixed inset-0 z-50">
        <!-- 背景遮罩 -->
        <div
          class="absolute inset-0 bg-black/10 transition-opacity duration-300"
          @click="toggleMenu"
        />

        <!-- 菜单内容 -->
        <Transition name="menu-slide">
          <div
            v-if="internalIsOpen"
            class="side-menu-panel fixed inset-y-0 left-0 w-full overflow-y-auto bg-[color-mix(in_srgb,var(--yunda-petal)_92%,var(--yunda-sky)_8%)] pb-[calc(8rem+env(safe-area-inset-bottom))] backdrop-blur-md lg:max-w-4xl md:max-w-2xl sm:max-w-2xl"
          >
            <!-- 关闭按钮 -->
            <button class="absolute left-6 top-6 z-10 p-0" @click="toggleMenu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="h-9 w-9 text-[var(--yunda-bark)]"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6L18 18" />
              </svg>
            </button>

            <!-- 小屏幕单列布局 -->
            <div class="px-7 py-6 pt-16 md:hidden">
              <!-- FOR INTENDED PARENTS 分组 -->
              <div class="mb-8">
                <h3
                  class="mb-3 border-b border-[var(--yunda-bark)] pb-2 text-base text-[var(--yunda-bark)] font-normal"
                >
                  {{ $t("menu.forIntendedParents") }}
                </h3>
                <div class="space-y-3">
                  <NuxtLink
                    :to="localePath('/surrogacy-process')"
                    class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                    @click="toggleMenu"
                  >
                    {{ $t("menu.surrogacyProcess") }}
                  </NuxtLink>
                  <NuxtLink
                    :to="localePath('/surrogacy-cost')"
                    class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                    @click="toggleMenu"
                  >
                    {{ $t("menu.surrogacyCosts") }}
                  </NuxtLink>
                  <NuxtLink
                    :to="localePath('/egg-donation')"
                    class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                    @click="toggleMenu"
                  >
                    {{ $t("menu.findYourEggDonor") }}
                  </NuxtLink>
                  <NuxtLink
                    :to="localePath('/single-parents-lgbtq')"
                    class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                    @click="toggleMenu"
                  >
                    {{ $t("menu.lgbtqSingleParents") }}
                  </NuxtLink>
                  <NuxtLink
                    :to="localePath('/partner-ivf-clinics')"
                    class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                    @click="toggleMenu"
                  >
                    {{ $t("menu.partnerIvfClinics") }}
                  </NuxtLink>
                </div>
                <NuxtLink
                  :to="localePath('/be-parents')"
                  class="mt-4 block text-sm text-[var(--yunda-bark)] font-normal underline transition-colors hover:text-[var(--yunda-maple)]"
                  @click="toggleMenu"
                >
                  {{ $t("menu.becomeAParent") }}
                </NuxtLink>
              </div>

              <!-- FOR SURROGATES 分组 -->
              <div class="mb-8">
                <h3
                  class="mb-3 border-b border-[var(--yunda-bark)] pb-2 text-base text-[var(--yunda-bark)] font-normal"
                >
                  {{ $t("menu.forSurrogates") }}
                </h3>
                <div class="space-y-3">
                  <NuxtLink
                    :to="localePath('/journey')"
                    class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                    @click="toggleMenu"
                  >
                    {{ $t("menu.surrogacyJourneyOverview") }}
                  </NuxtLink>
                  <NuxtLink
                    :to="localePath('/eligibility')"
                    class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                    @click="toggleMenu"
                  >
                    {{ $t("menu.eligibilityToBecomeASurrogate") }}
                  </NuxtLink>
                  <NuxtLink
                    :to="localePath('/screening')"
                    class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                    @click="toggleMenu"
                  >
                    {{ $t("menu.ourScreeningProcess") }}
                  </NuxtLink>
                  <NuxtLink
                    :to="localePath('/benefit')"
                    class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                    @click="toggleMenu"
                  >
                    {{ $t("menu.compensationBenefits") }}
                  </NuxtLink>
                  <NuxtLink
                    :to="localePath('/referral')"
                    class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                    @click="toggleMenu"
                  >
                    {{ $t("menu.surrogateReferralProgram") }}
                  </NuxtLink>
                </div>
                <NuxtLink
                  :to="localePath('/be-surrogate')"
                  class="mt-4 block text-sm text-[var(--yunda-bark)] font-normal underline transition-colors hover:text-[var(--yunda-maple)]"
                  @click="toggleMenu"
                >
                  {{ $t("menu.becomeASurrogates") }}
                </NuxtLink>
              </div>

              <!-- 其他菜单项 -->
              <div
                class="mb-8 border-b border-t border-[var(--yunda-bark)] pb-2 pt-2 space-y-3"
              >
                <!-- <a href="#" class="block text-[var(--yunda-bark)] text-sm font-normal hover:opacity-75 transition-opacity">
                {{ $t('menu.logIn') }}
              </a> -->
                <div>
                  <h3
                    class="mb-3 border-b border-[var(--yunda-bark)] pb-2 text-base text-[var(--yunda-bark)] font-normal"
                  >
                    {{ $t("menu.surrogateResources") }}
                  </h3>
                  <div class="space-y-3">
                    <NuxtLink
                      v-for="link in surrogateResourceLinks"
                      :key="link.to"
                      :to="localePath(link.to)"
                      class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                      @click="toggleMenu"
                    >
                      {{ $t(link.label) }}
                    </NuxtLink>
                  </div>
                </div>
                <NuxtLink
                  :to="localePath('/about')"
                  class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                  @click="toggleMenu"
                >
                  {{ $t("menu.aboutUs") }}
                </NuxtLink>
                <a
                  href="mailto:kayla@yundasurrogacy.com"
                  class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                >
                  {{ $t("menu.contactUs") }}
                </a>
                <a
                  href="https://www.indeed.com/cmp/Yunda-Surrogacy"
                  class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                >
                  {{ $t("menu.careers") }}
                </a>
                <NuxtLink
                  :to="localePath('/resources')"
                  prefetch
                  class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                  @click="toggleMenu"
                >
                  {{ $t("menu.resources") }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/blog')"
                  prefetch
                  class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                  @click="toggleMenu"
                >
                  {{ $t("menu.blog") }}
                </NuxtLink>
              </div>

              <!-- 联系信息 -->
              <div class="text-sm text-[var(--yunda-bark)] font-normal space-y-2">
                <div>
                  <span class="font-semibold">{{ $t("menu.phone") }}</span>
                  <a :href="`tel:${$t('footer.phoneNumber').replace(/[^0-9+]/g, '')}`" class="text-[var(--yunda-bark)] underline hover:text-[var(--yunda-maple)]">{{ $t('footer.phoneNumber') }}</a>
                </div>
                <div>
                  <span class="font-semibold">{{ $t("menu.email") }}</span>
                  <a href="mailto:kaylal@yundasurrogacy.com" class="text-[var(--yunda-bark)] underline hover:text-[var(--yunda-maple)]">kaylal@yundasurrogacy.com</a>
                </div>
                <!-- 英文显示 WhatsApp，中文显示微信 -->
                <div v-if="locale === 'en'">
                  <span class="font-semibold">{{ $t("menu.whatsapp") }}</span>
                  <a :href="`https://wa.me/${$t('footer.whatsappNumber').replace(/[^0-9+]/g, '')}`" target="_blank" rel="noopener noreferrer" class="text-[var(--yunda-bark)] underline hover:text-[var(--yunda-maple)]">{{ $t('footer.whatsappNumber') }}</a>
                </div>
                <div v-else>
                  <span class="font-semibold">{{ $t("menu.wechat") }}</span>
                  {{ $t('footer.wechatId') }}
                </div>
                <div class="mt-2 flex items-center">
                  <picture v-if="locale === 'en'" class="h-28 w-28 overflow-hidden border border-[var(--yunda-bark)]/15 rounded shadow">
                    <source srcset="/images/home/whatsapp.webp" type="image/webp">
                    <img src="/images/home/whatsapp.png" :alt="$t('menu.whatsapp')" class="h-full w-full object-cover" loading="lazy" decoding="async">
                  </picture>
                  <picture v-else class="h-28 w-28 overflow-hidden border border-[var(--yunda-bark)]/15 rounded shadow">
                    <source srcset="/images/home/wx.webp" type="image/webp">
                    <img src="/images/home/wx.png" alt="微信二维码" class="h-full w-full object-cover" loading="lazy" decoding="async">
                  </picture>
                </div>
              </div>
            </div>

            <!-- 中屏幕和大屏幕双列布局 -->
            <div class="hidden px-8 py-6 pt-16 md:block">
              <!-- FOR INTENDED PARENTS 分组 - 双列布局 -->
              <div class="mb-8">
                <div class="mb-4 border-t border-[var(--yunda-bark)] pt-4">
                  <div class="grid grid-cols-2 gap-8">
                    <!-- 左列：分组标题 -->
                    <div>
                      <h3 class="text-sm text-[var(--yunda-bark)] font-normal">
                        {{ $t("menu.forIntendedParents") }}
                      </h3>
                    </div>
                    <!-- 右列：菜单项 -->
                    <div class="space-y-2">
                      <NuxtLink
                        :to="localePath('/surrogacy-process')"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t("menu.surrogacyProcess") }}
                      </NuxtLink>
                      <NuxtLink
                        :to="localePath('/surrogacy-cost')"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t("menu.surrogacyCosts") }}
                      </NuxtLink>
                      <NuxtLink
                        :to="localePath('/egg-donation')"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t("menu.findYourEggDonor") }}
                      </NuxtLink>
                      <NuxtLink
                        :to="localePath('/single-parents-lgbtq')"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t("menu.lgbtqSingleParents") }}
                      </NuxtLink>
                      <NuxtLink
                        :to="localePath('/partner-ivf-clinics')"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t("menu.partnerIvfClinics") }}
                      </NuxtLink>
                      <NuxtLink
                        :to="localePath('/be-parents')"
                        class="mt-3 block text-sm text-[var(--yunda-bark)] font-normal underline transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t("menu.becomeAParent") }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>

              <!-- FOR SURROGATES 分组 - 双列布局 -->
              <div class="mb-8">
                <div class="mb-4 border-t border-[var(--yunda-bark)] pt-4">
                  <div class="grid grid-cols-2 gap-8">
                    <!-- 左列：分组标题 -->
                    <div>
                      <h3 class="text-sm text-[var(--yunda-bark)] font-normal">
                        {{ $t("menu.forSurrogates") }}
                      </h3>
                    </div>
                    <!-- 右列：菜单项 -->
                    <div class="space-y-2">
                      <NuxtLink
                        :to="localePath('/journey')"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t("menu.surrogacyJourneyOverview") }}
                      </NuxtLink>
                      <NuxtLink
                        :to="localePath('/eligibility')"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t("menu.eligibilityToBecomeASurrogate") }}
                      </NuxtLink>
                      <NuxtLink
                        :to="localePath('/screening')"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t("menu.ourScreeningProcess") }}
                      </NuxtLink>
                      <NuxtLink
                        :to="localePath('/benefit')"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t("menu.compensationBenefits") }}
                      </NuxtLink>
                      <NuxtLink
                        :to="localePath('/referral')"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t("menu.surrogateReferralProgram") }}
                      </NuxtLink>
                      <NuxtLink
                        :to="localePath('/be-surrogate')"
                        class="mt-3 block text-sm text-[var(--yunda-bark)] font-normal underline transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t("menu.becomeASurrogates") }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Surrogate Resources -->
              <div class="mb-8">
                <div class="mb-4 border-t border-[var(--yunda-bark)] pt-4">
                  <div class="grid grid-cols-2 gap-8">
                    <div>
                      <h3 class="text-sm text-[var(--yunda-bark)] font-normal">
                        {{ $t("menu.surrogateResources") }}
                      </h3>
                    </div>
                    <div class="space-y-2">
                      <NuxtLink
                        v-for="link in surrogateResourceLinks"
                        :key="link.to"
                        :to="localePath(link.to)"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t(link.label) }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 其他菜单项 - 单列布局 -->
              <div
                class="mb-8 border-b border-t border-[var(--yunda-bark)] pb-4 pt-4 space-y-3"
              >
                <!-- <a href="#" class="block text-[var(--yunda-bark)] text-sm font-normal hover:opacity-75 transition-opacity">
                  {{ $t('menu.logIn') }}
                </a> -->
                <NuxtLink
                  :to="localePath('/about')"
                  class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                  @click="toggleMenu"
                >
                  {{ $t("menu.aboutUs") }}
                </NuxtLink>
                <a
                  href="mailto:kayla@yundasurrogacy.com"
                  class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                >
                  {{ $t("menu.contactUs") }}
                </a>
                <a
                  href="https://www.indeed.com/cmp/Yunda-Surrogacy"
                  class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                >
                  {{ $t("menu.careers") }}
                </a>
                <NuxtLink
                  :to="localePath('/resources')"
                  prefetch
                  class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                  @click="toggleMenu"
                >
                  {{ $t("menu.resources") }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/blog')"
                  prefetch
                  class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                  @click="toggleMenu"
                >
                  {{ $t("menu.blog") }}
                </NuxtLink>
              </div>

              <!-- 联系信息 -->
              <div class="text-sm text-[var(--yunda-bark)] font-normal space-y-1">
                <div>
                  <span class="font-semibold">{{ $t("menu.phone") }}</span>
                  <a :href="`tel:${$t('footer.phoneNumber').replace(/[^0-9+]/g, '')}`" class="text-[var(--yunda-bark)] underline hover:text-[var(--yunda-maple)]">{{ $t('footer.phoneNumber') }}</a>
                </div>
                <div>
                  <span class="font-semibold">{{ $t("menu.email") }}</span> kaylal@yundasurrogacy.com
                </div>
                <!-- 英文显示 WhatsApp，中文显示微信 -->
                <div v-if="locale === 'en'">
                  <span class="font-semibold">{{ $t("menu.whatsapp") }}</span>
                  <a :href="`https://wa.me/${$t('footer.whatsappNumber').replace(/[^0-9+]/g, '')}`" target="_blank" rel="noopener noreferrer" class="text-[var(--yunda-bark)] underline hover:text-[var(--yunda-maple)]">{{ $t('footer.whatsappNumber') }}</a>
                  <div class="mt-2 flex items-center">
                    <picture class="h-28 w-28 overflow-hidden border border-[var(--yunda-bark)]/15 rounded shadow">
                      <source srcset="/images/home/whatsapp.webp" type="image/webp">
                      <img src="/images/home/whatsapp.png" :alt="$t('menu.whatsapp')" class="h-full w-full object-cover" loading="lazy" decoding="async">
                    </picture>
                  </div>
                </div>
                <div v-else>
                  <span class="font-semibold">{{ $t("menu.wechat") }}</span> {{ $t('footer.wechatId') }}
                  <div class="mt-2 flex items-center">
                    <picture class="h-28 w-28 overflow-hidden border border-[var(--yunda-bark)]/15 rounded shadow">
                      <source srcset="/images/home/wx.webp" type="image/webp">
                      <img src="/images/home/wx.png" alt="微信二维码" class="h-full w-full object-cover" loading="lazy" decoding="async">
                    </picture>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.side-menu-panel {
  font-family: var(--font-text);
  color: var(--yunda-bark);
}

.side-menu-panel h3 {
  font-weight: 600;
}

/* 遮罩层淡入淡出动画 */
.menu-overlay-enter-active,
.menu-overlay-leave-active {
  transition: opacity 0.3s ease;
}

.menu-overlay-enter-from,
.menu-overlay-leave-to {
  opacity: 0;
}

/* 菜单滑动动画 */
.menu-slide-enter-active,
.menu-slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.menu-slide-enter-from {
  transform: translateX(-100%);
}

.menu-slide-leave-to {
  transform: translateX(-100%);
}

.menu-slide-enter-to,
.menu-slide-leave-from {
  transform: translateX(0);
}
</style>

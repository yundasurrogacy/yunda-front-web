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

const intendedParentLinks = [
  { to: '/be-parents', label: 'menu.becomeAParent', emphasized: true },
  { to: '/surrogacy-process', label: 'menu.surrogacyProcess' },
  { to: '/surrogacy-cost', label: 'menu.surrogacyCosts' },
  { to: '/egg-donation', label: 'menu.findYourEggDonor' },
  { to: '/partner-ivf-clinics', label: 'menu.partnerIvfClinics' },
  { to: '/single-parents-lgbtq', label: 'menu.lgbtqSingleParents' },
  { to: '/surrogacy-protection-california', label: 'menu.resourceProtection' },
]

const surrogateLinks = [
  { to: '/be-surrogate', label: 'menu.becomeASurrogates', emphasized: true },
  { to: '/surrogate-requirements', label: 'menu.resourceRequirements' },
  { to: '/surrogate-compensation', label: 'menu.resourceCompensation' },
  { to: '/surrogate-process', label: 'menu.resourceJourney' },
  { to: '/journey', label: 'menu.surrogacyJourneyOverview' },
  { to: '/screening', label: 'menu.ourScreeningProcess' },
  { to: '/benefit', label: 'menu.compensationBenefits' },
  { to: '/referral', label: 'menu.surrogateReferralProgram' },
  { to: '/california-surrogacy-consultation', label: 'menu.resourceConsultation' },
  { to: '/become-a-surrogate', label: 'menu.resourceBecomeMother' },
  { to: '/become-surrogate-california', label: 'menu.resourceCalifornia' },
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
                <NuxtLink
                  :to="localePath('/intended-parents')"
                  class="mb-3 block border-b border-[var(--yunda-bark)] pb-2 text-base text-[var(--yunda-bark)] font-normal"
                  @click="toggleMenu"
                >
                  {{ $t("menu.forIntendedParents") }}
                </NuxtLink>
                <div class="space-y-3">
                  <NuxtLink
                    v-for="link in intendedParentLinks"
                    :key="link.to"
                    :to="localePath(link.to)"
                    class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                    :class="link.emphasized ? 'underline' : ''"
                    @click="toggleMenu"
                  >
                    {{ $t(link.label) }}
                  </NuxtLink>
                </div>
              </div>

              <!-- FOR SURROGATES 分组 -->
              <div class="mb-8">
                <NuxtLink
                  :to="localePath('/surrogates')"
                  class="mb-3 block border-b border-[var(--yunda-bark)] pb-2 text-base text-[var(--yunda-bark)] font-normal"
                  @click="toggleMenu"
                >
                  {{ $t("menu.forSurrogates") }}
                </NuxtLink>
                <div class="space-y-3">
                  <NuxtLink
                    v-for="link in surrogateLinks"
                    :key="link.to"
                    :to="localePath(link.to)"
                    class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                    :class="link.emphasized ? 'underline' : ''"
                    @click="toggleMenu"
                  >
                    {{ $t(link.label) }}
                  </NuxtLink>
                </div>
              </div>

              <!-- 其他菜单项 -->
              <div
                class="mb-8 border-b border-t border-[var(--yunda-bark)] pb-2 pt-2 space-y-3"
              >
                <!-- <a href="#" class="block text-[var(--yunda-bark)] text-sm font-normal hover:opacity-75 transition-opacity">
                {{ $t('menu.logIn') }}
              </a> -->
                <NuxtLink
                  :to="localePath('/resources')"
                  prefetch
                  class="mb-3 block border-b border-[var(--yunda-bark)] pb-2 text-base text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                  @click="toggleMenu"
                >
                  {{ $t("menu.resources") }}
                </NuxtLink>
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
                      <NuxtLink
                        :to="localePath('/intended-parents')"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t("menu.forIntendedParents") }}
                      </NuxtLink>
                    </div>
                    <!-- 右列：菜单项 -->
                    <div class="space-y-2">
                      <NuxtLink
                        v-for="link in intendedParentLinks"
                        :key="link.to"
                        :to="localePath(link.to)"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        :class="link.emphasized ? 'underline' : ''"
                        @click="toggleMenu"
                      >
                        {{ $t(link.label) }}
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
                      <NuxtLink
                        :to="localePath('/surrogates')"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        @click="toggleMenu"
                      >
                        {{ $t("menu.forSurrogates") }}
                      </NuxtLink>
                    </div>
                    <!-- 右列：菜单项 -->
                    <div class="space-y-2">
                      <NuxtLink
                        v-for="link in surrogateLinks"
                        :key="link.to"
                        :to="localePath(link.to)"
                        class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                        :class="link.emphasized ? 'underline' : ''"
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
                  :to="localePath('/resources')"
                  prefetch
                  class="block text-sm text-[var(--yunda-bark)] font-normal transition-colors hover:text-[var(--yunda-maple)]"
                  @click="toggleMenu"
                >
                  {{ $t("menu.resources") }}
                </NuxtLink>
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

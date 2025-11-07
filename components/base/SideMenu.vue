<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['update:isOpen'])

const internalIsOpen = computed({
  get: () => props.isOpen,
  set: value => emit('update:isOpen', value),
})

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
        <div class="absolute inset-0 bg-black/10 transition-opacity duration-300" @click="toggleMenu" />

        <!-- 菜单内容 -->
        <Transition name="menu-slide">
          <div
            v-if="internalIsOpen"
            class="fixed inset-y-0 left-0 w-full overflow-y-auto bg-[rgba(191,201,191,0.7)] backdrop-blur-md lg:max-w-4xl md:max-w-2xl sm:max-w-2xl"
          >
            <!-- 关闭按钮 -->
            <button class="absolute left-6 top-6 z-10 p-0" @click="toggleMenu">
              <svg
                xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="h-9 w-9 text-[#271F18]"
              >
                <path d="M18 6L6 18" />
                <path d="M6 6L18 18" />
              </svg>
            </button>

            <!-- 小屏幕单列布局 -->
            <div class="px-7 py-6 pt-16 md:hidden">
              <!-- FOR INTENDED PARENTS 分组 -->
              <div class="mb-8">
                <h3 class="mb-3 border-b border-[var(--dark-brown)] pb-2 text-base text-[#271F18] font-normal">
                  {{ $t('menu.forIntendedParents') }}
                </h3>
                <div class="space-y-3">
                  <NuxtLink
                    to="/surrogacy-process"
                    class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                    @click="toggleMenu"
                  >
                    {{ $t('menu.surrogacyProcess') }}
                  </NuxtLink>
                  <NuxtLink
                    to="/surrogacy-price"
                    class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                    @click="toggleMenu"
                  >
                    {{ $t('menu.surrogacyCosts') }}
                  </NuxtLink>
                  <NuxtLink
                    to="/egg-donation"
                    class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                    @click="toggleMenu"
                  >
                    {{ $t('menu.findYourEggDonor') }}
                  </NuxtLink>
                  <NuxtLink
                    to="/single-parents-lgbtq"
                    class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                    @click="toggleMenu"
                  >
                    {{ $t('menu.lgbtqSingleParents') }}
                  </NuxtLink>
                  <NuxtLink
                    to="/partner-ivf-clinics"
                    class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                    @click="toggleMenu"
                  >
                    {{ $t('menu.partnerIvfClinics') }}
                  </NuxtLink>
                </div>
                <NuxtLink
                  to="/be-parents"
                  class="mt-4 block text-sm text-[#271F18] font-normal underline transition-opacity hover:opacity-75"
                  @click="toggleMenu"
                >
                  {{ $t('menu.becomeAParent') }}
                </NuxtLink>
              </div>

              <!-- FOR SURROGATES 分组 -->
              <div class="mb-8">
                <h3 class="mb-3 border-b border-[var(--dark-brown)] pb-2 text-base text-[#271F18] font-normal">
                  {{ $t('menu.forSurrogates') }}
                </h3>
                <div class="space-y-3">
                  <NuxtLink
                    to="/journey"
                    class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                    @click="toggleMenu"
                  >
                    {{ $t('menu.surrogacyJourneyOverview') }}
                  </NuxtLink>
                  <NuxtLink
                    to="/eligibility"
                    class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                    @click="toggleMenu"
                  >
                    {{ $t('menu.eligibilityToBecomeASurrogate') }}
                  </NuxtLink>
                  <NuxtLink
                    to="/screening"
                    class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                    @click="toggleMenu"
                  >
                    {{ $t('menu.ourScreeningProcess') }}
                  </NuxtLink>
                  <NuxtLink
                    to="/benefit"
                    class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                    @click="toggleMenu"
                  >
                    {{ $t('menu.compensationBenefits') }}
                  </NuxtLink>
                  <NuxtLink
                    to="/referral"
                    class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                    @click="toggleMenu"
                  >
                    {{ $t('menu.surrogateReferralProgram') }}
                  </NuxtLink>
                </div>
                <NuxtLink
                  to="/surrogate-qualification"
                  class="mt-4 block text-sm text-[#271F18] font-normal underline transition-opacity hover:opacity-75"
                  @click="toggleMenu"
                >
                  {{ $t('menu.becomeASurrogates') }}
                </NuxtLink>
              </div>

              <!-- 其他菜单项 -->
              <div class="mb-8 border-b border-t border-[var(--dark-brown)] pb-2 pt-2 space-y-3">
                <!-- <a href="#" class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                  {{ $t('menu.logIn') }}
                </a> -->
                <NuxtLink to="/about" class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75" @click="toggleMenu">
                  {{ $t('menu.aboutUs') }}
                </NuxtLink>
                <a href="mailto:kayla@yundasurrogacy.com" class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75">
                  {{ $t('menu.contactUs') }}
                </a>
                <a href="https://www.indeed.com/cmp/Yunda-Surrogacy" class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75">
                  {{ $t('menu.careers') }}
                </a>
                <NuxtLink to="/blog" class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75" @click="toggleMenu">
                  {{ $t('menu.blog') }}
                </NuxtLink>
              </div>

              <!-- 联系信息 -->
              <div class="text-sm text-[#271F18] font-normal space-y-2">
                <div>
                  <span class="font-semibold">{{ $t('menu.phone') }}</span> <a href="tel:6265638656" class="text-[#271F18] underline hover:text-blue-600">626-563-8656</a>
                </div>
                <div>
                  <span class="font-semibold">{{ $t('menu.email') }}</span> <a href="mailto:kaylal@yundasurrogacy.com" class="text-[#271F18] underline hover:text-blue-600">kaylal@yundasurrogacy.com</a>
                </div>
                <div>
                  <span class="font-semibold">{{ $t('menu.wechat') }}</span> YundaUS1
                </div>
                <div class="mt-2 flex items-center">
                  <img src="~/public/images/home/wx.jpg" alt="微信二维码" class="h-28 w-28 border border-gray-300 rounded shadow">
                </div>
              </div>
            </div>

            <!-- 中屏幕和大屏幕双列布局 -->
            <div class="hidden px-8 py-6 pt-16 md:block">
              <!-- FOR INTENDED PARENTS 分组 - 双列布局 -->
              <div class="mb-8">
                <div class="mb-4 border-t border-[var(--dark-brown)] pt-4">
                  <div class="grid grid-cols-2 gap-8">
                    <!-- 左列：分组标题 -->
                    <div>
                      <h3 class="text-sm text-[#271F18] font-normal">
                        {{ $t('menu.forIntendedParents') }}
                      </h3>
                    </div>
                    <!-- 右列：菜单项 -->
                    <div class="space-y-2">
                      <NuxtLink
                        to="/surrogacy-process"
                        class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                        @click="toggleMenu"
                      >
                        {{ $t('menu.surrogacyProcess') }}
                      </NuxtLink>
                      <NuxtLink
                        to="/surrogacy-price"
                        class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                        @click="toggleMenu"
                      >
                        {{ $t('menu.surrogacyCosts') }}
                      </NuxtLink>
                      <NuxtLink
                        to="/egg-donation"
                        class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                        @click="toggleMenu"
                      >
                        {{ $t('menu.findYourEggDonor') }}
                      </NuxtLink>
                      <NuxtLink
                        to="/single-parents-lgbtq"
                        class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                        @click="toggleMenu"
                      >
                        {{ $t('menu.lgbtqSingleParents') }}
                      </NuxtLink>
                      <NuxtLink
                        to="/partner-ivf-clinics"
                        class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                        @click="toggleMenu"
                      >
                        {{ $t('menu.partnerIvfClinics') }}
                      </NuxtLink>
                      <NuxtLink
                        to="/be-parents"
                        class="mt-3 block text-sm text-[#271F18] font-normal underline transition-opacity hover:opacity-75"
                        @click="toggleMenu"
                      >
                        {{ $t('menu.becomeAParent') }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>

              <!-- FOR SURROGATES 分组 - 双列布局 -->
              <div class="mb-8">
                <div class="mb-4 border-t border-[var(--dark-brown)] pt-4">
                  <div class="grid grid-cols-2 gap-8">
                    <!-- 左列：分组标题 -->
                    <div>
                      <h3 class="text-sm text-[#271F18] font-normal">
                        {{ $t('menu.forSurrogates') }}
                      </h3>
                    </div>
                    <!-- 右列：菜单项 -->
                    <div class="space-y-2">
                      <NuxtLink
                        to="/journey"
                        class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                        @click="toggleMenu"
                      >
                        {{ $t('menu.surrogacyJourneyOverview') }}
                      </NuxtLink>
                      <NuxtLink
                        to="/eligibility"
                        class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                        @click="toggleMenu"
                      >
                        {{ $t('menu.eligibilityToBecomeASurrogate') }}
                      </NuxtLink>
                      <NuxtLink
                        to="/screening"
                        class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                        @click="toggleMenu"
                      >
                        {{ $t('menu.ourScreeningProcess') }}
                      </NuxtLink>
                      <NuxtLink
                        to="/benefit"
                        class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                        @click="toggleMenu"
                      >
                        {{ $t('menu.compensationBenefits') }}
                      </NuxtLink>
                      <NuxtLink
                        to="/referral"
                        class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75"
                        @click="toggleMenu"
                      >
                        {{ $t('menu.surrogateReferralProgram') }}
                      </NuxtLink>
                      <NuxtLink
                        to="/surrogate-qualification"
                        class="mt-3 block text-sm text-[#271F18] font-normal underline transition-opacity hover:opacity-75"
                        @click="toggleMenu"
                      >
                        {{ $t('menu.becomeASurrogates') }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 其他菜单项 - 单列布局 -->
              <div class="mb-8 border-b border-t border-[var(--dark-brown)] pb-4 pt-4 space-y-3">
                <!-- <a href="#" class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                  {{ $t('menu.logIn') }}
                </a> -->
                <NuxtLink to="/about" class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75" @click="toggleMenu">
                  {{ $t('menu.aboutUs') }}
                </NuxtLink>
                <a href="mailto:kayla@yundasurrogacy.com" class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75">
                  {{ $t('menu.contactUs') }}
                </a>
                <a href="https://www.indeed.com/cmp/Yunda-Surrogacy" class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75">
                  {{ $t('menu.careers') }}
                </a>
                <NuxtLink to="/blog" class="block text-sm text-[#271F18] font-normal transition-opacity hover:opacity-75" @click="toggleMenu">
                  {{ $t('menu.blog') }}
                </NuxtLink>
              </div>

              <!-- 联系信息 -->
              <div class="text-sm text-[#271F18] font-normal space-y-1">
                <div>
                  <span class="font-semibold">{{ $t('menu.phone') }}</span> 626-563-8656
                </div>
                <div>
                  <span class="font-semibold">{{ $t('menu.email') }}</span> kaylal@yundasurrogacy.com
                </div>
                <div>
                  <span class="font-semibold">{{ $t('menu.wechat') }}</span> YundaUS1
                  <div class="mt-2 flex items-center">
                    <img src="~/public/images/home/wx.jpg" alt="微信二维码" class="h-28 w-28 border border-gray-300 rounded shadow">
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

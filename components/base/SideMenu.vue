<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['update:isOpen']);

const internalIsOpen = computed({
  get: () => props.isOpen,
  set: (value) => emit('update:isOpen', value),
});

// 切换菜单显示状态
const toggleMenu = () => {
  internalIsOpen.value = !internalIsOpen.value;
};
</script>

<template>
  <div class="relative">
    <!-- 遮罩层和菜单内容 -->
    <Transition name="menu-overlay">
      <div v-if="internalIsOpen" class="fixed inset-0 z-50">
        <!-- 背景遮罩 -->
        <div class="absolute inset-0 bg-black/10 transition-opacity duration-300" @click="toggleMenu">
        </div>

        <!-- 菜单内容 -->
        <Transition name="menu-slide">
          <div class="fixed inset-y-0 left-0 bg-[rgba(191,201,191,0.7)] backdrop-blur-md overflow-y-auto
                   w-full sm:max-w-2xl md:max-w-2xl lg:max-w-4xl">

            <!-- 关闭按钮 -->
            <button @click="toggleMenu" class="absolute top-6 left-6 p-0 z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="h-9 w-9 text-[#271F18]">
                <path d="M18 6L6 18"></path>
                <path d="M6 6L18 18"></path>
              </svg>
            </button>

            <!-- 小屏幕单列布局 -->
            <div class="md:hidden px-7 py-6 pt-16">
              <!-- FOR INTENDED PARENTS 分组 -->
              <div class="mb-8">
                <h3 class="text-[#271F18] text-base font-normal mb-3 border-b border-[var(--dark-brown)] pb-2">
                  {{ $t('menu.forIntendedParents') }}
                </h3>
                <div class="space-y-3">
                  <a href="/surrogacy-process"
                    class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                    {{ $t('menu.surrogacyProcess') }}
                  </a>
                  <a href="/surrogacy-price"
                    class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                    {{ $t('menu.surrogacyCosts') }}
                  </a>
                  <a href="/egg-donation"
                    class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                    {{ $t('menu.findYourEggDonor') }}
                  </a>
                  <a href="/single-parents-lgbtq"
                    class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                    {{ $t('menu.lgbtqSingleParents') }}
                  </a>
                  <a href="/partner-ivf-clinics"
                    class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                    {{ $t('menu.partnerIvfClinics') }}
                  </a>
                </div>
                <a href="/be-parents"
                  class="block text-[#271F18] text-sm font-normal underline mt-4 hover:opacity-75 transition-opacity">
                  {{ $t('menu.becomeAParent') }}
                </a>
              </div>

              <!-- FOR SURROGATES 分组 -->
              <div class="mb-8">
                <h3 class="text-[#271F18] text-base font-normal mb-3 border-b border-[var(--dark-brown)] pb-2">
                  {{ $t('menu.forSurrogates') }}
                </h3>
                <div class="space-y-3">
                  <a href="/journey"
                    class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                    {{ $t('menu.surrogacyJourneyOverview') }}
                  </a>
                  <a href="/eligibility"
                    class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                    {{ $t('menu.eligibilityToBecomeASurrogate') }}
                  </a>
                  <a href="/screening"
                    class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                    {{ $t('menu.ourScreeningProcess') }}
                  </a>
                  <a href="/benefit"
                    class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                    {{ $t('menu.compensationBenefits') }}
                  </a>
                  <a href="/referral"
                    class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                    {{ $t('menu.surrogateReferralProgram') }}
                  </a>
                </div>
                <a href="/surrogate-qualification"
                  class="block text-[#271F18] text-sm font-normal underline mt-4 hover:opacity-75 transition-opacity">
                  {{ $t('menu.becomeASurrogates') }}
                </a>
              </div>

              <!-- 其他菜单项 -->
              <div class="space-y-3 mb-8 border-b border-t border-[var(--dark-brown)] pt-2 pb-2">
                <!-- <a href="#" class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                  {{ $t('menu.logIn') }}
                </a> -->
                <a href="/about" class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                  {{ $t('menu.aboutUs') }}
                </a>
                <a :href="'mailto:kayla@yundasurrogacy.com'" class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                  {{ $t('menu.contactUs') }}
                </a>
                <a href="https://www.indeed.com/cmp/Yunda-Surrogacy" class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                  {{ $t('menu.careers') }}
                </a>
              </div>

              <!-- 联系信息 -->
              <div class="space-y-2 text-[#271F18] text-sm font-normal">
                <div>
                  <span class="font-semibold">{{ $t('menu.phone') }}</span> 626-563-8656
                </div>
                <div>
                  <span class="font-semibold">{{ $t('menu.email') }}</span> kaylal@yundasurrogacy.com
                </div>
                <div>
                  <span class="font-semibold">{{ $t('menu.wechat') }}</span> YundaUS1
                </div>
              </div>
            </div>

            <!-- 中屏幕和大屏幕双列布局 -->
            <div class="hidden md:block px-8 py-6 pt-16">
              <!-- FOR INTENDED PARENTS 分组 - 双列布局 -->
              <div class="mb-8">
                <div class="border-t border-[var(--dark-brown)] pt-4 mb-4">
                  <div class="grid grid-cols-2 gap-8">
                    <!-- 左列：分组标题 -->
                    <div>
                      <h3 class="text-[#271F18] text-sm font-normal">
                        {{ $t('menu.forIntendedParents') }}
                      </h3>
                    </div>
                    <!-- 右列：菜单项 -->
                    <div class="space-y-2">
                      <a href="/surrogacy-process"
                        class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                        {{ $t('menu.surrogacyProcess') }}
                      </a>
                      <a href="/surrogacy-price"
                        class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                        {{ $t('menu.surrogacyCosts') }}
                      </a>
                      <a href="/egg-donation"
                        class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                        {{ $t('menu.findYourEggDonor') }}
                      </a>
                      <a href="/single-parents-lgbtq"
                        class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                        {{ $t('menu.lgbtqSingleParents') }}
                      </a>
                      <a href="/partner-ivf-clinics"
                        class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                        {{ $t('menu.partnerIvfClinics') }}
                      </a>
                      <a href="/be-parents"
                        class="block text-[#271F18] text-sm font-normal underline mt-3 hover:opacity-75 transition-opacity">
                        {{ $t('menu.becomeAParent') }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- FOR SURROGATES 分组 - 双列布局 -->
              <div class="mb-8">
                <div class="border-t border-[var(--dark-brown)] pt-4 mb-4">
                  <div class="grid grid-cols-2 gap-8">
                    <!-- 左列：分组标题 -->
                    <div>
                      <h3 class="text-[#271F18] text-sm font-normal">
                        {{ $t('menu.forSurrogates') }}
                      </h3>
                    </div>
                    <!-- 右列：菜单项 -->
                    <div class="space-y-2">
                      <a href="/journey"
                        class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                        {{ $t('menu.surrogacyJourneyOverview') }}
                      </a>
                      <a href="/eligibility"
                        class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                        {{ $t('menu.eligibilityToBecomeASurrogate') }}
                      </a>
                      <a href="/screening"
                        class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                        {{ $t('menu.ourScreeningProcess') }}
                      </a>
                      <a href="/benefit"
                        class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                        {{ $t('menu.compensationBenefits') }}
                      </a>
                      <a href="/referral"
                        class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                        {{ $t('menu.surrogateReferralProgram') }}
                      </a>
                      <a href="/surrogate-qualification"
                        class="block text-[#271F18] text-sm font-normal underline mt-3 hover:opacity-75 transition-opacity">
                        {{ $t('menu.becomeASurrogates') }}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 其他菜单项 - 单列布局 -->
              <div class="space-y-3 mb-8 border-t border-b border-[var(--dark-brown)] pt-4 pb-4">
                <!-- <a href="#" class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                  {{ $t('menu.logIn') }}
                </a> -->
                <a href="/about" class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                  {{ $t('menu.aboutUs') }}
                </a>
                <a :href="'mailto:kayla@yundasurrogacy.com'" class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                  {{ $t('menu.contactUs') }}
                </a>
                <a href="https://www.indeed.com/cmp/Yunda-Surrogacy" class="block text-[#271F18] text-sm font-normal hover:opacity-75 transition-opacity">
                  {{ $t('menu.careers') }}
                </a>
              </div>

              <!-- 联系信息 -->
              <div class="space-y-1 text-[#271F18] text-sm font-normal">
                <div>
                  <span class="font-semibold">{{ $t('menu.phone') }}</span> 626-563-8656
                </div>
                <div>
                  <span class="font-semibold">{{ $t('menu.email') }}</span> kaylal@yundasurrogacy.com
                </div>
                <div>
                  <span class="font-semibold">{{ $t('menu.wechat') }}</span> YundaUS1
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
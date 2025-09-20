<script setup lang="ts">
import { computed } from 'vue';
import LanguageSwitcher from './LanguageSwitcher.vue';

const props = defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits(['update:isOpen']);

const internalIsOpen = computed({
  get: () => props.isOpen,
  set: (value) => emit('update:isOpen', value),
});

const toggleMenu = () => {
  internalIsOpen.value = !internalIsOpen.value;
};
</script>

<template>
  <div class="relative">
    <Transition name="menu-overlay">
      <div v-if="internalIsOpen" class="fixed inset-0 z-50">
        <!-- 背景遮罩 -->
        <div class="absolute inset-0 bg-black/45 backdrop-blur-sm transition-opacity duration-300" @click="toggleMenu"></div>

        <!-- 菜单内容 -->
        <Transition name="menu-slide-right">
          <div class="fixed right-0 bg-[#BFC9BF] overflow-y-auto
                   w-full"
            v-if="internalIsOpen">
            <div class="px-7 py-6 pt-8 flex items-center justify-center">
              <LanguageSwitcher />
            </div>
            
            <!-- 关闭按钮 -->
            <button @click="toggleMenu" class="absolute top-6 right-6 p-0 z-10">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                class="h-9 w-9 text-[#271F18]">
                <path d="M18 6L6 18"></path>
                <path d="M6 6L18 18"></path>
              </svg>
            </button>


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

/* 菜单滑动动画 (从右向左) */
.menu-slide-right-enter-active,
.menu-slide-right-leave-active {
  transition: transform 0.3s ease-in-out;
}

.menu-slide-right-enter-from {
  transform: translateX(100%);
}

.menu-slide-right-leave-to {
  transform: translateX(100%);
}

.menu-slide-right-enter-to,
.menu-slide-right-leave-from {
  transform: translateX(0);
}
</style>

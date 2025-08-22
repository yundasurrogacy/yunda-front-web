<template>
  <Transition name="modal">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/30" @click="$emit('update:modelValue', false)"></div>
      
      <!-- Modal Container -->
      <div class="relative max-w-320 lg:max-w-356 w-full animate-modal-in">
        <!-- Background blur effect -->
        <div class="absolute -inset-20 lg:-inset-50 bg-[#BFC9BF] rounded-full blur-[153.55px] opacity-80"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-gradient-to-b from-[rgba(251,240,218,0.20)] to-[rgba(251,240,218,0.20)] bg-[#BFC9BF] bg-blend-overlay shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] rounded-5 backdrop-blur-5 overflow-hidden">
          <!-- Header -->
          <div class="w-full h-20 lg:h-24 bg-[#BFC9BF] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] blur-[2px] mb-8"></div>
          <div class="px-8 lg:px-12 pb-8 lg:pb-12">
          <h2 class="text-center text-[var(--dark-brown)] text-10 lg:text-16 font-['Cormorant'] font-semibold italic mb-8 lg:mb-12">
            {{ $t('surrogacy.application.title') }}
          </h2>
          
          <!-- Message -->
          <p class="text-center text-[var(--dark-brown)] text-8 lg:text-10 font-['Cormorant'] font-medium mb-8 lg:mb-10">
            {{ message }}
          </p>
          
          <!-- Close Button -->
          <div class="flex justify-center">
            <button
              @click="$emit('update:modelValue', false); $emit('close')"
              class="px-12 py-2.5 bg-gradient-to-b from-[#B2BBB2] to-[#B2BBB2] bg-[#F6ECD8] bg-blend-overlay rounded-full text-[#FFFCF6] text-6 font-['SourceSerif4'] font-medium hover:opacity-90 transition-opacity"
            >
              {{ buttonText || $t('common.ok') }}
            </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  message: {
    type: String,
    required: true
  },
  buttonText: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue', 'close'])
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.animate-modal-in {
  animation: modalIn 0.3s ease-out;
}

@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
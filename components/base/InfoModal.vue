<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  message: {
    type: String,
    required: true,
  },
  buttonText: {
    type: String,
    default: '',
  },
})

defineEmits(['update:modelValue', 'close'])
</script>

<template>
  <Transition name="modal">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div class="absolute inset-0 bg-black/30" @click="$emit('update:modelValue', false)" />

      <!-- Modal Container -->
      <div class="animate-modal-in relative max-w-320 w-full lg:max-w-356">
        <!-- Background blur effect -->
        <div class="absolute rounded-full bg-[#BFC9BF] opacity-80 blur-[153.55px] -inset-20 lg:-inset-50" />

        <!-- Modal Content -->
        <div class="relative overflow-hidden rounded-5 bg-[#BFC9BF] from-[rgba(251,240,218,0.20)] to-[rgba(251,240,218,0.20)] bg-gradient-to-b bg-blend-overlay shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] backdrop-blur-5">
          <!-- Header -->
          <div class="mb-8 h-20 w-full bg-[#BFC9BF] shadow-[4px_4px_4px_rgba(0,0,0,0.25)] blur-[2px] lg:h-24" />
          <div class="px-8 pb-8 lg:px-12 lg:pb-12">
            <h2 class="mb-8 text-center text-10 text-[var(--yunda-bark)] font-semibold font-display italic lg:mb-12 lg:text-16">
              {{ $t('surrogacy.application.title') }}
            </h2>

            <!-- Message -->
            <p class="mb-8 text-center text-8 text-[var(--yunda-bark)] font-medium font-display lg:mb-10 lg:text-10">
              {{ message }}
            </p>

            <!-- Close Button -->
            <div class="flex justify-center">
              <button
                class="rounded-full bg-[#F6ECD8] from-[#B2BBB2] to-[#B2BBB2] bg-gradient-to-b px-12 py-2.5 text-6 text-[var(--yunda-petal)] font-medium font-['SourceSerif4'] bg-blend-overlay transition-opacity hover:opacity-90"
                @click="$emit('update:modelValue', false); $emit('close')"
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

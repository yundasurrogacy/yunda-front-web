<script setup>
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  question: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue', 'answer'])

const selectedAnswer = ref(null)

function handleAnswer(answer) {
  selectedAnswer.value = answer
}
</script>

<template>
  <Transition name="modal">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Modal Container -->
      <div class="animate-modal-in relative max-w-300 w-full lg:max-w-356">
        <!-- Background blur effect -->

        <!-- Modal Content -->
        <div class="relative rounded-5 bg-[var(--light-cream)] shadow-black/20 shadow-xl">
          <div class="px-8 py-8 lg:px-12 lg:py-12">
            <!-- Question -->
            <p class="mb-8 text-center text-8 text-[var(--dark-brown)] font-medium font-['Cormorant'] lg:mb-10 lg:text-10">
              {{ question }}
            </p>

            <!-- Buttons -->
            <div class="flex flex-col items-center space-y-4">
              <button
                class="h-15 w-120 rounded-2.5 bg-[rgba(246.29,236.19,216,0.50)] from-[rgba(234.35,232.57,208.37,0.75)] to-[rgba(234.35,232.57,208.37,0.75)] bg-gradient-to-b text-6 text-[var(--dark-brown)] font-medium font-['Cormorant'] bg-blend-overlay shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] backdrop-blur-5 transition-all hover:border-2 hover:border-[#B2BBB2] lg:text-8"
                :class="{ 'border-2 border-[#B2BBB2]': selectedAnswer === true }"
                @click="handleAnswer(true)"
              >
                {{ $t('common.yes') }}
              </button>

              <button
                class="h-15 w-120 rounded-2.5 bg-[rgba(246.29,236.19,216,0.50)] from-[rgba(234.35,232.57,208.37,0.75)] to-[rgba(234.35,232.57,208.37,0.75)] bg-gradient-to-b text-6 text-[var(--dark-brown)] font-medium font-['Cormorant'] bg-blend-overlay shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] backdrop-blur-5 transition-all hover:border-2 hover:border-[#B2BBB2] lg:text-8"
                :class="{ 'border-2 border-[#B2BBB2]': selectedAnswer === false }"
                @click="handleAnswer(false)"
              >
                {{ $t('common.no') }}
              </button>
            </div>

            <!-- Continue Button (only show after selection) -->
            <div v-if="selectedAnswer !== null" class="mt-8 flex justify-center">
              <button
                class="rounded-full bg-[#F6ECD8] from-[#B2BBB2] to-[#B2BBB2] bg-gradient-to-b px-12 py-2.5 text-6 text-[#FFFCF6] font-medium font-['SourceSerif4'] bg-blend-overlay transition-opacity hover:opacity-90"
                @click="$emit('answer', selectedAnswer)"
              >
                {{ $t('common.continue') }}
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

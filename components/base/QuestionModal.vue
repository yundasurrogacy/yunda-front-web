<template>
  <Transition name="modal">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      
      <!-- Modal Container -->
      <div class="relative max-w-300 lg:max-w-356 w-full animate-modal-in">
        <!-- Background blur effect -->
        
        <!-- Modal Content -->
        <div class="relative bg-[var(--light-cream)] shadow-xl shadow-black/20 rounded-5">
          <div class="px-8 lg:px-12 py-8 lg:py-12">

          <!-- Question -->
            <p class="text-center text-[var(--dark-brown)] text-8 lg:text-10 font-['Cormorant'] font-medium mb-8 lg:mb-10">
              {{ question }}
            </p>
          
          <!-- Buttons -->
            <div class="space-y-4 flex flex-col items-center">
              <button
                @click="handleAnswer(true)"
                class="w-120 h-15 bg-gradient-to-b from-[rgba(234.35,232.57,208.37,0.75)] to-[rgba(234.35,232.57,208.37,0.75)] bg-[rgba(246.29,236.19,216,0.50)] bg-blend-overlay shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] rounded-2.5 backdrop-blur-5 text-[var(--dark-brown)] text-6 lg:text-8 font-['Cormorant'] font-medium hover:border-2 hover:border-[#B2BBB2] transition-all"
                :class="{ 'border-2 border-[#B2BBB2]': selectedAnswer === true }"
              >
                {{ $t('common.yes') }}
              </button>
              
              <button
                @click="handleAnswer(false)"
                class="w-120 h-15 bg-gradient-to-b from-[rgba(234.35,232.57,208.37,0.75)] to-[rgba(234.35,232.57,208.37,0.75)] bg-[rgba(246.29,236.19,216,0.50)] bg-blend-overlay shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] rounded-2.5 backdrop-blur-5 text-[var(--dark-brown)] text-6 lg:text-8 font-['Cormorant'] font-medium hover:border-2 hover:border-[#B2BBB2] transition-all"
                :class="{ 'border-2 border-[#B2BBB2]': selectedAnswer === false }"
              >
                {{ $t('common.no') }}
              </button>
            </div>
          
          <!-- Continue Button (only show after selection) -->
            <div v-if="selectedAnswer !== null" class="mt-8 flex justify-center">
              <button
                @click="$emit('answer', selectedAnswer)"
                class="px-12 py-2.5 bg-gradient-to-b from-[#B2BBB2] to-[#B2BBB2] bg-[#F6ECD8] bg-blend-overlay rounded-full text-[#FFFCF6] text-6 font-['SourceSerif4'] font-medium hover:opacity-90 transition-opacity"
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

<script setup>
import { ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  question: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue', 'answer'])

const selectedAnswer = ref(null)

const handleAnswer = (answer) => {
  selectedAnswer.value = answer
}
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
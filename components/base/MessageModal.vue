<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50" @click="close"></div>
        
        <!-- Modal -->
        <div class="relative bg-[var(--light-cream)] rounded-3 shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto">
          <!-- Icon -->
          <div class="flex justify-center mb-6">
            <div :class="[
              'w-16 h-16 rounded-full flex items-center justify-center',
              type === 'success' ? 'bg-green-100' : 'bg-red-100'
            ]">
              <!-- Success Icon -->
              <svg v-if="type === 'success'" class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <!-- Error Icon -->
              <svg v-else class="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          
          <!-- Title -->
          <h3 class="text-6 font-['Cormorant'] font-semibold text-center mb-4">
            {{ title }}
          </h3>
          
          <!-- Message -->
          <div class="text-4 text-[var(--dark-brown)] font-serif mb-6">
            <!-- Single message -->
            <p v-if="typeof message === 'string'" class="text-center">{{ message }}</p>
            
            <!-- Multiple messages/errors -->
            <ul v-else-if="Array.isArray(message)" class="space-y-2">
              <li v-for="(item, index) in message" :key="index" class="flex items-start">
                <span class="text-red-500 mr-2">•</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
          
          <!-- Actions -->
          <div class="flex justify-center">
            <button
              @click="close"
              class="px-8 py-3 bg-[var(--grayish-green)] text-[#FFFCF6] text-4 font-semibold rounded-2.5 shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] backdrop-blur-5 hover:opacity-90 transition-opacity"
            >
              {{ buttonText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  type?: 'success' | 'error'
  title?: string
  message?: string | string[]
  buttonText?: string
  modelValue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success',
  title: 'Success',
  message: '',
  buttonText: 'OK',
  modelValue: false
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const isVisible = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  isVisible.value = newVal
})

const close = () => {
  isVisible.value = false
  emit('update:modelValue', false)
  emit('close')
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

.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.3s ease;
}

.modal-enter-from .relative {
  transform: scale(0.9);
}

.modal-leave-to .relative {
  transform: scale(0.9);
}
</style>
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
  modelValue: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
  'close': []
}>()

const isVisible = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  isVisible.value = newVal
})

function close() {
  isVisible.value = false
  emit('update:modelValue', false)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isVisible" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/50" @click="close" />

        <!-- Modal -->
        <div class="relative max-h-[90vh] max-w-md w-full overflow-y-auto rounded-3 bg-[var(--yunda-petal)] p-8 shadow-2xl">
          <!-- Icon -->
          <div class="mb-6 flex justify-center">
            <div
              class="h-16 w-16 flex items-center justify-center rounded-full" :class="[
                type === 'success' ? 'bg-green-100' : 'bg-red-100',
              ]"
            >
              <!-- Success Icon -->
              <svg v-if="type === 'success'" class="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
              <!-- Error Icon -->
              <svg v-else class="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>

          <!-- Title -->
          <h3 class="mb-4 text-center text-6 font-semibold font-display">
            {{ title }}
          </h3>

          <!-- Message -->
          <div class="mb-6 text-4 text-[var(--yunda-bark)] font-serif">
            <!-- Single message -->
            <p v-if="typeof message === 'string'" class="text-center">
              {{ message }}
            </p>

            <!-- Multiple messages/errors -->
            <ul v-else-if="Array.isArray(message)" class="space-y-2">
              <li v-for="(item, index) in message" :key="index" class="flex items-start">
                <span class="mr-2 text-red-500">•</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <!-- Actions -->
          <div class="flex justify-center">
            <button
              class="rounded-2.5 bg-[var(--yunda-bark)] px-8 py-3 text-4 text-[var(--yunda-petal)] font-semibold shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] backdrop-blur-5 transition-opacity hover:opacity-90"
              @click="close"
            >
              {{ buttonText }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
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

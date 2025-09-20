<template>
  <label class="flex items-center gap-2.5 cursor-pointer">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="sr-only"
    />
    <div 
      class="w-4 h-4 rounded-0.75 border border-[#271F18] flex-shrink-0 flex items-center justify-center transition-colors"
      :class="modelValue ? 'bg-[var(--grayish-green)]' : 'bg-transparent'"
    >
      <svg v-if="modelValue" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6L5 9L10 3" stroke="#271F18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
    <span class="text-3.5 lg:text-4 leading-6">{{ label }}</span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>
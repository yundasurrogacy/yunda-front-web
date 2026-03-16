<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: true,
  },
  required: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="flex cursor-pointer items-center gap-2.5">
    <input
      type="checkbox"
      :checked="modelValue"
      class="sr-only"
      @change="$emit('update:modelValue', $event.target.checked)"
    >
    <div
      class="h-4 w-4 flex flex-shrink-0 items-center justify-center border border-[#271F18] rounded-0.75 transition-colors"
      :class="modelValue ? 'bg-[var(--grayish-green)]' : 'bg-transparent'"
    >
      <svg v-if="modelValue" width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6L5 9L10 3" stroke="#271F18" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
    <span class="text-3.5 leading-6 lg:text-4">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </span>
  </label>
</template>

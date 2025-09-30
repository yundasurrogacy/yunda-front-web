<script setup>
defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: '',
  },
  value: {
    type: [String, Number, Boolean],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="flex cursor-pointer items-center gap-2.5">
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      class="sr-only"
      @change="$emit('update:modelValue', value)"
    >
    <div
      class="h-4 w-4 flex flex-shrink-0 items-center justify-center border border-[#271F18] rounded-0.75 transition-colors"
      :class="modelValue === value ? 'bg-[var(--grayish-green)]' : 'bg-transparent'"
    >
      <div v-if="modelValue === value" class="h-2 w-2 rounded-full bg-[#271F18]" />
    </div>
    <span class="text-3.5 leading-6 lg:text-4">{{ label }}</span>
  </label>
</template>

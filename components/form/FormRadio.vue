<template>
  <label class="flex items-center gap-2.5 cursor-pointer">
    <input
      type="radio"
      :name="name"
      :value="value"
      :checked="modelValue === value"
      @change="$emit('update:modelValue', value)"
      class="sr-only"
    />
    <div 
      class="w-4 h-4 rounded-0.75 border border-[#271F18] flex-shrink-0 flex items-center justify-center transition-colors"
      :class="modelValue === value ? 'bg-[var(--grayish-green)]' : 'bg-transparent'"
    >
      <div v-if="modelValue === value" class="w-2 h-2 rounded-full bg-[#271F18]"></div>
    </div>
    <span class="text-3.5 lg:text-4 leading-6">{{ label }}</span>
  </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number, Boolean],
    default: ''
  },
  value: {
    type: [String, Number, Boolean],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

defineEmits(['update:modelValue'])
</script>
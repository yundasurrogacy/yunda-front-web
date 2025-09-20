<template>
  <div class="w-full">
    <label v-if="label" class="block mb-2.5">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <input
        type="date"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :required="required"
        :disabled="disabled"
        :placeholder="placeholder"
        class="w-full h-15 px-4 pr-12 text-4 bg-[rgba(234.35,232.57,208.37,0.20)] bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] rounded-2.5 backdrop-blur-5 border-none outline-none focus:ring-2 focus:ring-[var(--grayish-green)] transition-all"
      />
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'mm / dd / yyyy'
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>
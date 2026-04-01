<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: 'text',
  },
  placeholder: {
    type: String,
    default: '',
  },
  required: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  /** 更紧凑的 label 间距（如 GC 首屏 Step 1） */
  compact: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="w-full flex flex-col justify-between">
    <div class="flex items-start">
      <label v-if="label" class="block leading-6" :class="compact ? 'mb-2' : 'mb-4'">
        {{ label }}
        <span v-if="required" class="text-red-500">*</span>
      </label>
    </div>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      class="h-15 w-full rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-4 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all placeholder:text-4 placeholder:text-black/60 focus:ring-2 focus:ring-[var(--grayish-green)]"
      @input="$emit('update:modelValue', $event.target.value)"
    >
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: 'mm / dd / yyyy',
  },
  /** 'en' | 'zh'：设 en 时设置 lang 并显示格式提示，日期选择器仍为原生可点选 */
  locale: {
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
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="w-full" :lang="locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-US' : undefined">
    <label v-if="label" class="mb-2.5 block">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <div class="relative">
      <input
        type="date"
        :value="modelValue"
        :required="required"
        :disabled="disabled"
        :placeholder="placeholder"
        :lang="locale === 'zh' ? 'zh-CN' : locale === 'en' ? 'en-US' : undefined"
        class="h-15 w-full rounded-2.5 border-none bg-[rgba(234.35,232.57,208.37,0.20)] px-4 pr-12 text-4 bg-blend-overlay shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.6)] outline-none backdrop-blur-5 transition-all focus:ring-2 focus:ring-[var(--grayish-green)]"
        @input="$emit('update:modelValue', $event.target.value)"
      >
    </div>
    <!-- 英文站：提示按 MM/DD/YYYY 填写（中文系统下占位可能是年/月/日，但点日历选择器即可） -->
    <p v-if="locale === 'en'" class="mt-1.5 text-3.5 text-sage-500">
      Format: MM/DD/YYYY
    </p>
  </div>
</template>

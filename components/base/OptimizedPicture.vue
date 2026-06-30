<script setup lang="ts">
withDefaults(defineProps<{
  src: string
  avifSrc?: string
  alt?: string
  width?: number | string
  height?: number | string
  loading?: 'eager' | 'lazy'
  decoding?: 'async' | 'sync' | 'auto'
  fetchpriority?: 'high' | 'low' | 'auto'
  sizes?: string
  imgClass?: string
  pictureClass?: string
}>(), {
  alt: '',
  decoding: 'async',
})
</script>

<template>
  <picture :class="pictureClass">
    <source v-if="avifSrc" :srcset="avifSrc" type="image/avif">
    <img
      :src="src"
      :alt="alt"
      :width="width"
      :height="height"
      :loading="loading"
      :decoding="decoding"
      :fetchpriority="fetchpriority"
      :sizes="sizes"
      :class="imgClass"
    >
  </picture>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import VideoPlayer from '../base/VideoPlayer.vue'

const { locale } = useI18n()

const videoSource = computed(() => {
  return locale.value === 'zh'
    ? 'https://cdn-qiniu-resources.weweknow.com/yundasurrogacy-1/static/yunda_introduce_zh.mp4'
    : 'https://cdn-qiniu-resources.weweknow.com/yundasurrogacy-1/static/yunda_introduce_en.mp4'
})
</script>

<template>
  <section class="bg-[#FAF1E0] px-4 py-16 md:px-20 md:py-24">
    <div class="mx-auto max-w-300">
      <component
        :is="VideoPlayer"
        :key="videoSource"
        :video-src="videoSource"
        :autoplay="false"
        :loop="false"
        :muted="false"
        :controls="true"
        poster="/videos/video-default-poster.webp"
        video-type="video/mp4"
        background-color="transparent"
      />
    </div>
  </section>
</template>

<style scoped></style>

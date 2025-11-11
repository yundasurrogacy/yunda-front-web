<script setup lang="ts">
import VideoPlayer from '@/components/base/VideoPlayer.vue'

const VIDEO_SRC = 'https://cdn-qiniu-resources.weweknow.com/yundasurrogacy-1/static/surrogate_introduce_en.mp4'
</script>

<template>
  <section class="bg-[#F2ECDD] px-4 py-16 md:px-20 md:py-24">
    <div class="mx-auto max-w-360">
      <component
        :is="VideoPlayer"
        :video-src="VIDEO_SRC"
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

<style scoped>
</style>

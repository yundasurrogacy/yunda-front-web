<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  videoSrc?: string
  backgroundColor?: string
  controls?: boolean
  autoplay?: boolean
  loop?: boolean
  muted?: boolean
  poster?: string
  videoType?: string
}

const props = withDefaults(defineProps<Props>(), {
  backgroundColor: 'transparent',
  controls: true,
  autoplay: false,
  loop: true,
  muted: false,
  videoType: 'video/mp4',
})

const videoError = ref(false)
const errorMessage = ref('')

function onVideoLoaded(_event: Event) {
  videoError.value = false
}

function onCanPlay(_event: Event) {
}

function onVideoError(event: Event) {
  const video = event.target as HTMLVideoElement
  videoError.value = true

  let message = '未知错误'
  if (video.error) {
    switch (video.error.code) {
      case 1:
        message = '视频加载被中止'
        break
      case 2:
        message = '网络错误'
        break
      case 3:
        message = '视频解码失败'
        break
      case 4:
        message = '不支持的视频格式或路径错误'
        break
    }
  }

  errorMessage.value = message
  console.error('Video loading error:', {
    src: props.videoSrc,
    type: props.videoType,
    error: video.error,
    message,
  })
}
</script>

<template>
  <section
    class="w-full py-8 lg:py-12"
    :style="{ backgroundColor }"
  >
    <div class="px-6 lg:px-20">
      <div class="relative mx-auto max-w-full">
        <div class="relative h-0 overflow-hidden rounded-lg pb-[56.25%]">
          <video
            v-if="videoSrc && !videoError"
            :controls="controls"
            :autoplay="autoplay"
            :loop="loop"
            :muted="muted"
            :poster="poster"
            class="absolute left-0 top-0 h-full w-full object-contain"
            @loadedmetadata="onVideoLoaded"
            @error="onVideoError"
            @canplay="onCanPlay"
          >
            <source :src="videoSrc" :type="videoType">
            Your browser does not support the video tag.
          </video>
          <div
            v-else-if="videoError"
            class="absolute left-0 top-0 h-full w-full flex flex-col items-center justify-center bg-gray-100"
          >
            <Icon name="mdi:video-off" class="mb-2 text-4xl text-gray-400" />
            <span class="text-gray-600 font-medium">视频加载失败</span>
            <span class="mt-1 text-sm text-gray-500">{{ errorMessage }}</span>
          </div>
          <div
            v-else
            class="absolute left-0 top-0 h-full w-full flex items-center justify-center bg-gray-200"
          >
            <span class="text-gray-500">未提供视频源</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
</style>

<template>
  <section 
    class="w-full py-8 lg:py-12"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div class="px-6 lg:px-20">
      <div class="relative mx-auto max-w-full">
        <div class="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
          <video
            v-if="videoSrc && !videoError"
            :controls="controls"
            :autoplay="autoplay"
            :loop="loop"
            :muted="muted"
            :poster="poster"
            class="absolute top-0 left-0 w-full h-full object-contain"
            @loadedmetadata="onVideoLoaded"
            @error="onVideoError"
            @canplay="onCanPlay"
          >
            <source :src="videoSrc" :type="videoType">
            Your browser does not support the video tag.
          </video>
          <div 
            v-else-if="videoError"
            class="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-gray-100"
          >
            <Icon name="mdi:video-off" class="text-4xl text-gray-400 mb-2" />
            <span class="text-gray-600 font-medium">视频加载失败</span>
            <span class="text-gray-500 text-sm mt-1">{{ errorMessage }}</span>
          </div>
          <div 
            v-else 
            class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-200"
          >
            <span class="text-gray-500">未提供视频源</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

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
  videoType: 'video/mp4'
})

const videoError = ref(false)
const errorMessage = ref('')

const onVideoLoaded = (event: Event) => {
  console.log('Video metadata loaded', props.videoSrc)
  videoError.value = false
}

const onCanPlay = (event: Event) => {
  console.log('Video can play', props.videoSrc)
}

const onVideoError = (event: Event) => {
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
    message: message
  })
}
</script>

<style scoped>
</style>
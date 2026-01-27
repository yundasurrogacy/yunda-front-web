<script setup lang="ts">
import { nextTick, ref } from 'vue'

interface Props {
  videoSrc: string
  coverSrc: string
  lazy?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  lazy: true,
})

const isPlaying = ref(false)
const videoRef = ref<HTMLVideoElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)

async function playVideo() {
  // 先设置 isPlaying 为 true，让视频元素渲染
  isPlaying.value = true

  // 等待 DOM 更新后，再调用 play()
  await nextTick()

  if (videoRef.value) {
    videoRef.value.play().catch((error) => {
      console.error('Video play error:', error)
      // 如果播放失败，恢复封面显示
      isPlaying.value = false
    })
  }
}

function pauseVideo() {
  if (videoRef.value) {
    videoRef.value.pause()
    isPlaying.value = false
  }
}

function handleVideoClick() {
  if (isPlaying.value) {
    pauseVideo()
  }
  else {
    playVideo()
  }
}
</script>

<template>
  <div ref="containerRef" class="relative w-full overflow-hidden rounded-lg" style="aspect-ratio: 16/9;">
    <!-- 封面图 -->
    <div
      v-if="!isPlaying"
      class="absolute inset-0 cursor-pointer"
      @click="playVideo"
    >
      <img
        :src="coverSrc"
        :loading="lazy ? 'lazy' : 'eager'"
        alt="Video cover"
        class="h-full w-full object-cover"
      >
      <!-- 播放按钮 -->
      <div class="absolute inset-0 flex items-center justify-center bg-black/20 transition-opacity hover:bg-black/30">
        <div class="h-20 w-20 flex items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110">
          <svg
            class="ml-1 h-8 w-8 text-[var(--dark-brown)]"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- 视频 -->
    <video
      v-if="isPlaying"
      ref="videoRef"
      :src="videoSrc"
      class="h-full w-full object-cover"
      controls
      @click="handleVideoClick"
      @ended="isPlaying = false"
    >
      <source :src="videoSrc" type="video/mp4">
      Your browser does not support the video tag.
    </video>
  </div>
</template>

<style scoped>
</style>

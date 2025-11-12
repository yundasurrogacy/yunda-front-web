<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const introVideo = ref<HTMLVideoElement | null>(null)
const isMuted = ref(true)
const isMobile = ref(false)
const videoReady = ref(false)

const DESKTOP_VIDEO_SRC = 'https://cdn-qiniu-resources.weweknow.com/yundasurrogacy-1/static/yunda_opening_pc.mp4'
const MOBILE_VIDEO_SRC = 'https://cdn-qiniu-resources.weweknow.com/yundasurrogacy-1/static/yunda_opening_mobile.mp4'

const videoSource = computed(() => {
  if (!videoReady.value) {
    return ''
  }
  return isMobile.value ? MOBILE_VIDEO_SRC : DESKTOP_VIDEO_SRC
})

function updateDeviceState() {
  if (typeof window === 'undefined') {
    return
  }
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  updateDeviceState()
  videoReady.value = true
  window.addEventListener('resize', updateDeviceState)

  if (introVideo.value) {
    introVideo.value.muted = isMuted.value
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', updateDeviceState)
})

watch(isMuted, (value) => {
  if (!introVideo.value || !videoReady.value) {
    return
  }
  introVideo.value.muted = value
  if (!value) {
    introVideo.value.play().catch(() => {
      isMuted.value = true
    })
  }
})

function toggleMute() {
  isMuted.value = !isMuted.value
}
</script>

<template>
  <section class="hero-section">
    <div class="video-wrapper">
      <div v-if="!videoReady" class="poster-fallback">
        <img src="/videos/video-default-poster.webp" alt="Hero Poster">
      </div>
      <video
        v-else
        :key="videoSource"
        ref="introVideo"
        class="video-element"
        autoplay
        :muted="isMuted"
        loop
        playsinline
        preload="metadata"
        poster="/videos/video-default-poster.webp"
      >
        <source :src="videoSource" type="video/mp4">
      </video>
      <button
        type="button"
        class="mute-toggle"
        :aria-label="isMuted ? '开启声音' : '关闭声音'"
        @click="toggleMute"
      >
        <svg
          v-if="isMuted"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mute-icon"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="mute-icon"
        >
          <path d="M11 5L6 9H2v6h4l5 4V5z" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      </button>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  overflow: hidden;
  background-color: #000;
}

.video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
}

@media (max-width: 767px) {
  .video-wrapper {
    padding-bottom: 177.78%;
  }
}

.poster-fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #000;
}

.poster-fallback img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.video-element {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mute-toggle {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  background-color: rgba(169, 166, 125, 0.85);
  backdrop-filter: blur(8px);
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.mute-toggle:hover {
  background-color: rgba(169, 166, 125, 0.95);
  border-color: rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transform: scale(1.05);
}

.mute-toggle:active {
  transform: scale(0.95);
}

.mute-icon {
  width: 20px;
  height: 20px;
  stroke: #fff;
}
</style>

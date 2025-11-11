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
        <span v-if="isMuted">🔇</span>
        <span v-else>🔊</span>
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
  width: 3rem;
  height: 3rem;
  border-radius: 999px;
  border: none;
  background-color: rgba(0, 0, 0, 0.45);
  color: #fff;
  font-size: 1.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.mute-toggle:hover {
  background-color: rgba(0, 0, 0, 0.6);
}
</style>

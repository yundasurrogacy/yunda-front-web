<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'

// Video feature toggle - set to true when official video is ready
const videoEnabled = ref(true)

const showVideo = ref(videoEnabled.value)
const shouldRenderVideo = ref(false)
const videoFadeClass = ref('video-fade-in')
const contentFadeClass = ref(videoEnabled.value ? 'content-fade-in' : 'content-visible')
const introVideo = ref(null)
const heroSectionEl = ref(null)
const isMuted = ref(true)

// Responsive video source
const isMobile = ref(false)
const videoSource = computed(() => {
  return isMobile.value ? '/videos/small.mp4' : '/videos/YundaOpening.mp4'
})

// Responsive video aspect ratio
const videoPaddingBottom = computed(() => {
  // 9:16 aspect ratio (177.78%) for mobile vertical video
  // 16:9 aspect ratio (56.25%) for desktop horizontal video
  return isMobile.value ? '177.78%' : '56.25%'
})

function checkScreenSize() {
  isMobile.value = window.innerWidth < 768
}

let intersectionObserver = null

onMounted(() => {
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)

  function activateVideo() {
    if (shouldRenderVideo.value || !videoEnabled.value) {
      return
    }
    shouldRenderVideo.value = true
    requestAnimationFrame(() => {
      videoFadeClass.value = 'video-visible'
    })
  }

  if (!videoEnabled.value) {
    contentFadeClass.value = 'content-visible'
    return
  }

  if (!('IntersectionObserver' in window)) {
    activateVideo()
    return
  }

  intersectionObserver = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry && entry.isIntersecting) {
      activateVideo()
      if (intersectionObserver) {
        intersectionObserver.disconnect()
      }
    }
  }, {
    root: null,
    rootMargin: '200px 0px',
    threshold: 0.01,
  })

  if (heroSectionEl.value) {
    intersectionObserver.observe(heroSectionEl.value)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize)
  if (intersectionObserver) {
    intersectionObserver.disconnect()
    intersectionObserver = null
  }
})

watch(shouldRenderVideo, async (active) => {
  if (!active) {
    return
  }
  await nextTick()
  if (introVideo.value) {
    introVideo.value.muted = isMuted.value
  }
})

watch(isMuted, (value) => {
  if (introVideo.value) {
    introVideo.value.muted = value
    if (!value) {
      introVideo.value.play().catch(() => {
        isMuted.value = true
      })
    }
  }
})

function toggleMute() {
  isMuted.value = !isMuted.value
}

// No longer needed since video loops
// const handleVideoEnd = () => {
//   // Start fade-out animation
//   videoFadeClass.value = 'video-fade-out'
//   
//   // Remove video after fade-out completes
//   setTimeout(() => {
//     showVideo.value = false
//     // Start content fade-in animation
//     setTimeout(() => {
//       contentFadeClass.value = 'content-visible'
//     }, 100)
//   }, 500)
// }
</script>

<template>
  <section ref="heroSectionEl" class="relative w-full overflow-hidden" :class="showVideo ? '' : 'h-200 md:h-200'">
    <!-- Video Intro -->
    <div
      v-if="showVideo"
      class="relative w-full bg-black"
      :class="videoFadeClass"
    >
      <div class="relative w-full" :style="{ paddingBottom: videoPaddingBottom }">
        <div v-if="!shouldRenderVideo" class="absolute inset-0">
          <picture>
            <source srcset="/images/home/index-bg.webp" type="image/webp">
            <img src="/images/home/index-bg.png" alt="Hero Placeholder" class="h-full w-full object-cover">
          </picture>
        </div>
        <video
          v-else
          ref="introVideo"
          class="absolute inset-0 h-full w-full object-cover"
          autoplay
          :muted="isMuted"
          loop
          playsinline
          preload="metadata"
          poster="/images/home/index-bg.webp"
        >
          <source :src="videoSource" type="video/mp4">
        </video>
        <button
          v-if="shouldRenderVideo"
          type="button"
          class="mute-toggle"
          :aria-label="isMuted ? 'Enable sound' : 'Mute sound'"
          @click="toggleMute"
        >
          <span v-if="isMuted">🔇</span>
          <span v-else>🔊</span>
        </button>
      </div>
    </div>

    <!-- Main Content (shown immediately when video disabled, or after video when enabled) -->
    <div v-if="!showVideo" class="absolute inset-0" :class="contentFadeClass">
      <!-- Background Images -->
      <div class="absolute inset-0">
        <picture>
          <source srcset="/images/home/index-bg.webp" type="image/webp">
          <img src="/images/home/index-bg.png" alt="Hero Background" class="h-full w-full object-cover">
        </picture>
      </div>

      <!-- Overlay Content -->
      <div class="absolute inset-0 flex items-center justify-center px-4">
        <div class="mx-auto max-w-320 text-center md:max-w-full">
          <h1 class="mb-4 text-7.5 text-[var(--light-cream)] font-semibold md:mb-5 md:text-10.5" style="font-family: var(--font-primary)">
            {{ $t('home.heroSection.title') }}
          </h1>
          <p class="text-4 text-[var(--light-cream)] font-normal md:text-5.5">
            {{ $t('home.heroSection.description') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.video-fade-in {
  opacity: 0;
  transition: opacity 0.5s ease-in;
}

.video-visible {
  opacity: 1;
  transition: opacity 0.5s ease-in;
}

.video-fade-out {
  opacity: 0;
  transition: opacity 0.5s ease-out;
}

.content-fade-in {
  opacity: 0;
  transition: opacity 0.8s ease-in;
}

.content-visible {
  opacity: 1;
  transition: opacity 0.8s ease-in;
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

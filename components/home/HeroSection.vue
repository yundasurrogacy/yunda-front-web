<template>
  <section class="relative w-full overflow-hidden" :class="showVideo ? '' : 'h-200 md:h-200'">
    <!-- Video Intro -->
    <div 
      v-if="showVideo" 
      class="relative w-full bg-black"
      :class="videoFadeClass"
    >
      <div class="relative w-full" :style="{ paddingBottom: videoPaddingBottom }">
        <video
          ref="introVideo"
          class="absolute inset-0 w-full h-full object-cover"
          autoplay
          muted
          loop
          playsinline
        >
          <source :src="videoSource" type="video/mp4">
        </video>
      </div>
    </div>

    <!-- Main Content (shown immediately when video disabled, or after video when enabled) -->
    <div v-if="!showVideo" class="absolute inset-0" :class="contentFadeClass">
      <!-- Background Images -->
      <div class="absolute inset-0">
        <img src="~/public/images/home/index-bg.png" alt="Hero Background" class="w-full h-full object-cover">
      </div>

      <!-- Overlay Content -->
      <div class="absolute inset-0 flex items-center justify-center px-4">
        <div class="text-center max-w-320 md:max-w-full mx-auto">
          <h1 class="text-[var(--light-cream)] text-7.5 md:text-10.5 font-semibold mb-4 md:mb-5" style="font-family: var(--font-primary)">
            {{ $t('home.heroSection.title') }}
          </h1>
          <p class="text-[var(--light-cream)] text-4 md:text-5.5 font-normal">
            {{ $t('home.heroSection.description') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// Video feature toggle - set to true when official video is ready
const videoEnabled = ref(true)

const showVideo = ref(videoEnabled.value)
const videoFadeClass = ref('video-fade-in')
const contentFadeClass = ref(videoEnabled.value ? 'content-fade-in' : 'content-visible')
const introVideo = ref(null)

// Responsive video source
const isMobile = ref(false)
const videoSource = computed(() => {
  return isMobile.value ? '/videos/small.m4v' : '/videos/YundaOpeneing.m4v'
})

// Responsive video aspect ratio
const videoPaddingBottom = computed(() => {
  // 9:16 aspect ratio (177.78%) for mobile vertical video
  // 16:9 aspect ratio (56.25%) for desktop horizontal video
  return isMobile.value ? '177.78%' : '56.25%'
})


onMounted(() => {
  // Check screen size
  const checkScreenSize = () => {
    isMobile.value = window.innerWidth < 768
  }
  
  checkScreenSize()
  window.addEventListener('resize', checkScreenSize)
  
  if (videoEnabled.value) {
    // Start fade-in animation for video
    setTimeout(() => {
      videoFadeClass.value = 'video-visible'
    }, 100)
  }
  
  // Cleanup
  return () => {
    window.removeEventListener('resize', checkScreenSize)
  }
})

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

</style>
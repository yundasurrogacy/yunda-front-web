<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const route = useRoute()
const localePath = useLocalePath()
const { locale } = useI18n()

const parentsPath = computed(() => localePath('/be-parents'))
const surrogatePath = computed(() => localePath('/be-surrogate'))
const parentsLabel = computed(() => (locale.value.startsWith('zh') ? '成为准父母' : 'Become an Intended Parent'))
const surrogateLabel = computed(() => (locale.value.startsWith('zh') ? '成为代孕妈妈' : 'Become a Surrogate'))
const passedFirstScreen = ref(false)

function updatePassedFirstScreen() {
  if (typeof window === 'undefined')
    return

  const firstScreenHeight = window.innerHeight || 0
  passedFirstScreen.value = window.scrollY > firstScreenHeight
}

function normalizePath(path: string) {
  return (path || '/').replace(/\/+$/, '') || '/'
}

function isPathMatch(currentPath: string, targetPath: string) {
  if (targetPath === '/')
    return currentPath === '/'

  return currentPath === targetPath || currentPath.startsWith(`${targetPath}/`)
}

const shouldShow = computed(() => {
  const currentPath = normalizePath(route.path || '/')
  const hiddenPaths = [
    localePath('/be-surrogate'),
    localePath('/be-surrogate/success'),
    localePath('/be-surrogate-v2'),
    localePath('/surrogacy-cost'),
  ].map(normalizePath)

  return !hiddenPaths.some(path => isPathMatch(currentPath, path)) && passedFirstScreen.value
})

onMounted(() => {
  updatePassedFirstScreen()
  window.addEventListener('scroll', updatePassedFirstScreen, { passive: true })
  window.addEventListener('resize', updatePassedFirstScreen, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updatePassedFirstScreen)
  window.removeEventListener('resize', updatePassedFirstScreen)
})

watch(() => route.fullPath, () => {
  updatePassedFirstScreen()
})
</script>

<template>
  <div v-if="shouldShow" class="mobile-apply-spacer md:hidden" aria-hidden="true" />

  <div v-if="shouldShow" class="mobile-apply-cta md:hidden">
    <NuxtLink
      :to="parentsPath"
      class="mobile-apply-cta-button parents"
      aria-label="Become an intended parent"
    >
      <span class="mobile-apply-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3h1V3a1 1 0 0 1 1-1Zm13 8H4v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9Zm-7 2a1 1 0 0 1 1 1v4a1 1 0 1 1-2 0v-4a1 1 0 0 1 1-1Z" />
        </svg>
      </span>
      {{ parentsLabel }}
    </NuxtLink>
    <NuxtLink
      :to="surrogatePath"
      class="mobile-apply-cta-button surrogate"
      aria-label="Become a surrogate"
    >
      <span class="mobile-apply-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 21c-.3 0-.6-.1-.8-.3C7 17 4 14.4 4 10.8A4.8 4.8 0 0 1 8.8 6c1.3 0 2.5.5 3.4 1.4L12 7.6l-.2-.2A4.8 4.8 0 0 1 15.2 6 4.8 4.8 0 0 1 20 10.8c0 3.6-3 6.2-7.2 9.9-.2.2-.5.3-.8.3Z" />
        </svg>
      </span>
      {{ surrogateLabel }}
    </NuxtLink>
  </div>
</template>

<style scoped>
.mobile-apply-spacer {
  height: calc(5rem + env(safe-area-inset-bottom));
}

.mobile-apply-cta {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 60;
  box-shadow: 0 -8px 22px rgba(39, 31, 24, 0.14);
}

.mobile-apply-cta-button {
  display: flex;
  min-height: 4.25rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.45rem 0.4rem calc(0.45rem + env(safe-area-inset-bottom));
  color: var(--dark-brown);
  font-size: clamp(0.79rem, 3.1vw, 0.92rem);
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
}

.mobile-apply-cta-button.parents {
  background: color-mix(in srgb, var(--primary-brown) 55%, white);
  border-top-left-radius: 0.95rem;
}

.mobile-apply-cta-button.surrogate {
  background: color-mix(in srgb, var(--olive-green) 70%, white);
  border-top-right-radius: 0.95rem;
}

.mobile-apply-cta-button:active {
  opacity: 0.92;
}

.mobile-apply-icon {
  width: 1.35rem;
  height: 1.35rem;
  color: var(--dark-brown);
}

.mobile-apply-icon svg {
  width: 100%;
  height: 100%;
}

@media (max-width: 767px) {
  .mobile-apply-cta {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (min-width: 768px) {
  .mobile-apply-spacer,
  .mobile-apply-cta {
    display: none !important;
  }
}
</style>

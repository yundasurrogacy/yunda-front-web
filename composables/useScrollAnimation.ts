export const useScrollAnimation = () => {
  const observerRef = ref<IntersectionObserver | null>(null)
  const animatedElements = ref<Set<Element>>(new Set())

  const initScrollAnimation = () => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.15
    }

    observerRef.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animatedElements.value.has(entry.target)) {
          entry.target.classList.add('animate-in')
          animatedElements.value.add(entry.target)
          observerRef.value?.unobserve(entry.target)
        }
      })
    }, options)

    // Handle vertical scroll animations
    const scrollElements = document.querySelectorAll('.scroll-animate')
    scrollElements.forEach((element) => {
      if (!element.classList.contains('scroll-animate-init')) {
        element.classList.add('scroll-animate-init')
        observerRef.value?.observe(element)
      }
    })

    // Handle horizontal slide-left animations
    const slideLeftElements = document.querySelectorAll('.slide-left')
    slideLeftElements.forEach((element) => {
      if (!element.classList.contains('slide-left-init')) {
        element.classList.add('slide-left-init')
        observerRef.value?.observe(element)
      }
    })

    // Handle horizontal slide-right animations
    const slideRightElements = document.querySelectorAll('.slide-right')
    slideRightElements.forEach((element) => {
      if (!element.classList.contains('slide-right-init')) {
        element.classList.add('slide-right-init')
        observerRef.value?.observe(element)
      }
    })
  }

  onMounted(() => {
    setTimeout(() => {
      initScrollAnimation()
    }, 100)
  })

  onUnmounted(() => {
    if (observerRef.value) {
      observerRef.value.disconnect()
      observerRef.value = null
    }
  })

  return {
    initScrollAnimation
  }
}
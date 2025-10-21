<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'

interface SurrogacyStep {
  id: number
  title: string
  duration: string
  description: string
  activities: string[]
  details: string
}

interface Props {
  steps: SurrogacyStep[]
  activeStep: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  stepChange: [stepId: number]
}>()

const stepsContainer = ref<HTMLElement>()
const detailsContainer = ref<HTMLElement>()
const isScrolling = ref(false)

// 設置活動步驟
const setActiveStep = (stepId: number) => {
  if (isScrolling.value) return
  emit('stepChange', stepId)
}

// 滾動到對應步驟詳情
const scrollToStepDetails = (stepId: number) => {
  const targetElement = document.getElementById(`step-details-${stepId}`)
  if (targetElement) {
    isScrolling.value = true
    targetElement.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    })
    
    // 重置滾動標記
    setTimeout(() => {
      isScrolling.value = false
    }, 1000)
  }
}

// 監聽滾動事件來更新活動步驟
const handleScroll = () => {
  if (isScrolling.value) return
  
  const detailsElements = document.querySelectorAll('[id^="step-details-"]')
  const scrollTop = detailsContainer.value?.scrollTop || 0
  
  let currentStep = 1
  
  detailsElements.forEach((element, index) => {
    const rect = element.getBoundingClientRect()
    const containerRect = detailsContainer.value?.getBoundingClientRect()
    
    if (containerRect && rect.top <= containerRect.top + 100) {
      currentStep = index + 1
    }
  })
  
  if (currentStep !== props.activeStep) {
    emit('stepChange', currentStep)
  }
}

// 組件掛載時添加滾動監聽
onMounted(() => {
  if (detailsContainer.value) {
    detailsContainer.value.addEventListener('scroll', handleScroll)
  }
})

// 組件卸載時移除滾動監聽
onUnmounted(() => {
  if (detailsContainer.value) {
    detailsContainer.value.removeEventListener('scroll', handleScroll)
  }
})

// 當活動步驟改變時，滾動到對應詳情
const scrollToActiveStep = () => {
  scrollToStepDetails(props.activeStep)
}

// 監聽活動步驟變化
watch(() => props.activeStep, () => {
  if (!isScrolling.value) {
    scrollToActiveStep()
  }
})
</script>

<template>
  <div class="max-w-7xl mx-auto">
    <!-- 桌面版佈局 -->
    <div class="hidden lg:flex gap-8 h-[800px]">
      <!-- 左側步驟列表 -->
      <div class="w-1/3 bg-white rounded-xl shadow-lg p-8 overflow-y-auto">
        <div class="sticky top-0 bg-white pb-4 mb-6 border-b border-gray-200">
          <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-4" style="font-family: var(--font-primary)">
            7 Steps in the Surrogate Process
          </h3>
          <p class="text-sm text-[var(--primary-brown)] leading-relaxed">
            The surrogacy process can feel overwhelming. Understanding the journey through seven clear steps helps you know what to expect, what's required of you as a surrogate, and the general timeline. Each surrogacy journey is unique, and timing may not be exact.
          </p>
        </div>
        
        <div class="space-y-2">
          <div
            v-for="step in steps"
            :key="step.id"
            :class="[
              'p-4 rounded-lg cursor-pointer transition-all duration-300 border-l-4',
              activeStep === step.id 
                ? 'bg-[var(--grayish-green)] bg-opacity-20 border-[var(--grayish-green)] shadow-md' 
                : 'bg-gray-50 border-transparent hover:bg-gray-100'
            ]"
            @click="setActiveStep(step.id)"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div 
                  :class="[
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-3',
                    activeStep === step.id 
                      ? 'bg-[var(--grayish-green)] text-white' 
                      : 'bg-gray-300 text-gray-600'
                  ]"
                >
                  {{ step.id }}
                </div>
                <div>
                  <h4 
                    :class="[
                      'font-semibold text-sm',
                      activeStep === step.id ? 'text-[var(--dark-brown)]' : 'text-gray-700'
                    ]"
                  >
                    {{ step.title }}
                  </h4>
                  <p class="text-xs text-gray-500">{{ step.duration }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右側步驟詳情 -->
      <div 
        ref="detailsContainer"
        class="w-2/3 bg-white rounded-xl shadow-lg overflow-y-auto"
      >
        <div 
          v-for="step in steps"
          :key="`details-${step.id}`"
          :id="`step-details-${step.id}`"
          class="p-8 min-h-[800px]"
        >
          <!-- 步驟指示器 -->
          <div class="flex items-center mb-6">
            <div class="w-16 h-16 bg-[var(--grayish-green)] rounded-full flex items-center justify-center mr-4">
              <span class="text-2xl font-bold text-white">{{ step.id }}</span>
            </div>
            <div>
              <h2 class="text-3xl font-bold text-[var(--dark-brown)]" style="font-family: var(--font-primary)">
                {{ step.title }}
              </h2>
              <p class="text-lg text-gray-600">{{ step.duration }}</p>
            </div>
          </div>

          <!-- 關鍵活動 -->
          <div class="mb-8">
            <h3 class="text-xl font-semibold text-[var(--dark-brown)] mb-4">Key Activities:</h3>
            <ul class="space-y-3">
              <li 
                v-for="activity in step.activities"
                :key="activity"
                class="flex items-start"
              >
                <span class="text-[var(--grayish-green)] mr-3 mt-1">•</span>
                <span class="text-[var(--primary-brown)] font-medium">{{ activity }}</span>
              </li>
            </ul>
          </div>

          <!-- 詳細描述 -->
          <div class="mb-8">
            <h3 class="text-xl font-semibold text-[var(--dark-brown)] mb-4">Process Details:</h3>
            <p class="text-[var(--primary-brown)] leading-relaxed text-lg">
              {{ step.description }}
            </p>
          </div>

          <!-- 額外信息 -->
          <div class="bg-[var(--light-cream)] p-6 rounded-lg">
            <h4 class="text-lg font-semibold text-[var(--dark-brown)] mb-3">Additional Information:</h4>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              {{ step.details }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- 移動版佈局 -->
    <div class="lg:hidden">
      <!-- 步驟選擇器 -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h3 class="text-xl font-bold text-[var(--dark-brown)] mb-4" style="font-family: var(--font-primary)">
          7 Steps in the Surrogate Process
        </h3>
        <p class="text-sm text-[var(--primary-brown)] mb-6 leading-relaxed">
          The surrogacy process can feel overwhelming. Understanding the journey through seven clear steps helps you know what to expect.
        </p>
        
        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="step in steps"
            :key="step.id"
            :class="[
              'p-3 rounded-lg text-left transition-all duration-300 border-2',
              activeStep === step.id 
                ? 'bg-[var(--grayish-green)] bg-opacity-20 border-[var(--grayish-green)]' 
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
            ]"
            @click="setActiveStep(step.id)"
          >
            <div class="flex items-center mb-2">
              <div 
                :class="[
                  'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mr-2',
                  activeStep === step.id 
                    ? 'bg-[var(--grayish-green)] text-white' 
                    : 'bg-gray-300 text-gray-600'
                ]"
              >
                {{ step.id }}
              </div>
              <span class="text-xs text-gray-500">{{ step.duration }}</span>
            </div>
            <h4 
              :class="[
                'font-semibold text-sm',
                activeStep === step.id ? 'text-[var(--dark-brown)]' : 'text-gray-700'
              ]"
            >
              {{ step.title }}
            </h4>
          </button>
        </div>
      </div>

      <!-- 當前步驟詳情 -->
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="flex items-center mb-6">
          <div class="w-12 h-12 bg-[var(--grayish-green)] rounded-full flex items-center justify-center mr-4">
            <span class="text-xl font-bold text-white">{{ activeStep }}</span>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-[var(--dark-brown)]" style="font-family: var(--font-primary)">
              {{ steps[activeStep - 1]?.title }}
            </h2>
            <p class="text-gray-600">{{ steps[activeStep - 1]?.duration }}</p>
          </div>
        </div>

        <!-- 關鍵活動 -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-[var(--dark-brown)] mb-3">Key Activities:</h3>
          <ul class="space-y-2">
            <li 
              v-for="activity in steps[activeStep - 1]?.activities"
              :key="activity"
              class="flex items-start"
            >
              <span class="text-[var(--grayish-green)] mr-2 mt-1">•</span>
              <span class="text-[var(--primary-brown)] text-sm">{{ activity }}</span>
            </li>
          </ul>
        </div>

        <!-- 詳細描述 -->
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-[var(--dark-brown)] mb-3">Process Details:</h3>
          <p class="text-[var(--primary-brown)] leading-relaxed">
            {{ steps[activeStep - 1]?.description }}
          </p>
        </div>

        <!-- 額外信息 -->
        <div class="bg-[var(--light-cream)] p-4 rounded-lg">
          <h4 class="font-semibold text-[var(--dark-brown)] mb-2">Additional Information:</h4>
          <p class="text-[var(--primary-brown)] text-sm leading-relaxed">
            {{ steps[activeStep - 1]?.details }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 自定義滾動條 */
.overflow-y-auto::-webkit-scrollbar {
  width: 6px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: var(--light-cream);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: var(--grayish-green);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: var(--primary-brown);
}

/* 平滑過渡效果 */
.transition-all {
  transition: all 0.3s ease;
}

/* 懸停效果 */
.hover\:bg-gray-100:hover {
  background-color: rgb(243 244 246);
}

.hover\:bg-gray-100:hover {
  background-color: rgb(243 244 246);
}
</style>

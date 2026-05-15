<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'

interface StepSection {
  heading: string
  items: string[]
}

interface SurrogacyStep {
  id: number
  title: string
  duration: string
  description: string
  activities: string[]
  details: string
  sections?: StepSection[]
  softCtas?: string[]
}

interface Props {
  steps: SurrogacyStep[]
  activeStep: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  stepChange: [stepId: number]
}>()

const detailsContainer = ref<HTMLElement>()
const isScrolling = ref(false)

// 設置活動步驟
function setActiveStep(stepId: number) {
  if (isScrolling.value)
    return
  emit('stepChange', stepId)
}

// 滾動到對應步驟詳情
function scrollToStepDetails(stepId: number) {
  const targetElement = document.getElementById(`step-details-${stepId}`)
  if (targetElement) {
    isScrolling.value = true
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })

    // 重置滾動標記
    setTimeout(() => {
      isScrolling.value = false
    }, 1000)
  }
}

// 監聽滾動事件來更新活動步驟
function handleScroll() {
  if (isScrolling.value)
    return

  const detailsElements = document.querySelectorAll('[id^="step-details-"]')
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
function scrollToActiveStep() {
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
  <div class="mx-auto max-w-7xl">
    <!-- 桌面版佈局 -->
    <div class="hidden h-[800px] gap-8 lg:flex">
      <!-- 左側步驟列表 -->
      <div class="w-1/3 overflow-y-auto rounded-xl bg-white p-8 shadow-lg">
        <div class="sticky top-0 mb-6 border-b border-gray-200 bg-white pb-4">
          <h3 class="mb-4 text-2xl text-[var(--yunda-bark)] font-bold" >
            6 Steps in the Surrogate Process
          </h3>
        </div>

        <div class="space-y-2">
          <div
            v-for="step in steps"
            :key="step.id"
            class="cursor-pointer border-l-4 rounded-lg p-4 transition-all duration-300" :class="[
              activeStep === step.id
                ? 'bg-[var(--yunda-bark)] bg-opacity-20 border-[var(--yunda-bark)] shadow-md'
                : 'bg-gray-50 border-transparent hover:bg-gray-100',
            ]"
            @click="setActiveStep(step.id)"
          >
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <div
                  class="mr-3 h-8 w-8 flex items-center justify-center rounded-full text-sm font-bold" :class="[
                    activeStep === step.id
                      ? 'bg-[var(--yunda-bark)] text-white'
                      : 'bg-gray-300 text-gray-600',
                  ]"
                >
                  {{ step.id }}
                </div>
                <div>
                  <h4
                    class="text-sm font-semibold" :class="[
                      activeStep === step.id ? 'text-[var(--yunda-bark)]' : 'text-gray-700',
                    ]"
                  >
                    {{ step.title }}
                  </h4>
                  <p v-if="step.duration" class="text-xs text-gray-500">
                    {{ step.duration }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右側步驟詳情 -->
      <div
        ref="detailsContainer"
        class="w-2/3 overflow-y-auto rounded-xl bg-white shadow-lg"
      >
        <div
          v-for="step in steps"
          :id="`step-details-${step.id}`"
          :key="`details-${step.id}`"
          class="min-h-[800px] p-8"
        >
          <!-- 步驟指示器 -->
          <div class="mb-6 flex items-center">
            <div class="mr-4 h-16 w-16 flex items-center justify-center rounded-full bg-[var(--yunda-bark)]">
              <span class="text-2xl text-white font-bold">{{ step.id }}</span>
            </div>
            <div>
              <h2 class="text-3xl text-[var(--yunda-bark)] font-bold" >
                {{ step.title }}
              </h2>
              <p v-if="step.duration" class="text-lg text-gray-600">
                {{ step.duration }}
              </p>
            </div>
          </div>

          <!-- 關鍵活動 -->
          <div class="mb-8">
            <h3 class="mb-4 text-xl text-[var(--yunda-bark)] font-semibold">
              Key Activities:
            </h3>
            <ul class="space-y-3">
              <li
                v-for="activity in step.activities"
                :key="activity"
                class="flex items-start"
              >
                <span class="mr-3 mt-1 text-[var(--yunda-bark)]">•</span>
                <span class="text-[var(--primary-brown)] font-medium">{{ activity }}</span>
              </li>
            </ul>
          </div>

          <!-- 詳細描述 -->
          <div class="mb-8">
            <h3 class="mb-4 text-xl text-[var(--yunda-bark)] font-semibold">
              Process Details:
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              {{ step.description }}
            </p>
          </div>

          <!-- 額外信息 -->
          <div class="space-y-6">
            <div class="rounded-lg bg-[var(--yunda-petal)] p-6">
              <h4 class="mb-3 text-lg text-[var(--yunda-bark)] font-semibold">
                Additional Information:
              </h4>
              <p class="text-[var(--primary-brown)] leading-relaxed">
                {{ step.details }}
              </p>
            </div>

            <div
              v-for="section in step.sections || []"
              :key="section.heading"
              class="border border-[var(--yunda-petal)] rounded-lg bg-white p-6"
            >
              <h4 class="mb-3 text-lg text-[var(--yunda-bark)] font-semibold">
                {{ section.heading }}
              </h4>
              <ul class="text-[var(--primary-brown)] leading-relaxed space-y-2">
                <li
                  v-for="item in section.items"
                  :key="item"
                  class="flex items-start"
                >
                  <span class="mr-2 mt-1 text-[var(--yunda-bark)]">•</span>
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <div
              v-if="step.softCtas?.length"
              class="border border-[var(--yunda-bark)] rounded-lg bg-white p-6"
            >
              <h4 class="mb-3 text-lg text-[var(--yunda-bark)] font-semibold">
                Soft CTAs
              </h4>
              <ul class="text-[var(--primary-brown)] leading-relaxed space-y-2">
                <li
                  v-for="cta in step.softCtas"
                  :key="cta"
                  class="flex items-start"
                >
                  <span class="mr-2 mt-1 text-[var(--yunda-bark)]">–</span>
                  <span>{{ cta }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 移動版佈局 -->
    <div class="lg:hidden">
      <!-- 步驟選擇器 -->
      <div class="mb-6 rounded-xl bg-white p-6 shadow-lg">
        <h3 class="mb-4 text-xl text-[var(--yunda-bark)] font-bold" >
          6 Steps in the Surrogate Process
        </h3>
        <p class="mb-6 text-sm text-[var(--primary-brown)] leading-relaxed">
          The surrogacy process works best with simple, clear surrogacy steps. Tap a step to see the focus for parents and surrogate mothers.
        </p>

        <div class="grid grid-cols-2 gap-3">
          <button
            v-for="step in steps"
            :key="step.id"
            class="border-2 rounded-lg p-3 text-left transition-all duration-300" :class="[
              activeStep === step.id
                ? 'bg-[var(--yunda-bark)] bg-opacity-20 border-[var(--yunda-bark)]'
                : 'bg-gray-50 border-gray-200 hover:bg-gray-100',
            ]"
            @click="setActiveStep(step.id)"
          >
            <div class="mb-2 flex items-center">
              <div
                class="mr-2 h-6 w-6 flex items-center justify-center rounded-full text-xs font-bold" :class="[
                  activeStep === step.id
                    ? 'bg-[var(--yunda-bark)] text-white'
                    : 'bg-gray-300 text-gray-600',
                ]"
              >
                {{ step.id }}
              </div>
              <span class="text-xs text-gray-500">{{ step.duration }}</span>
            </div>
            <h4
              class="text-sm font-semibold" :class="[
                activeStep === step.id ? 'text-[var(--yunda-bark)]' : 'text-gray-700',
              ]"
            >
              {{ step.title }}
            </h4>
          </button>
        </div>
      </div>

      <!-- 當前步驟詳情 -->
      <div class="rounded-xl bg-white p-6 shadow-lg">
        <div class="mb-6 flex items-center">
          <div class="mr-4 h-12 w-12 flex items-center justify-center rounded-full bg-[var(--yunda-bark)]">
            <span class="text-xl text-white font-bold">{{ activeStep }}</span>
          </div>
          <div>
            <h2 class="text-2xl text-[var(--yunda-bark)] font-bold" >
              {{ steps[activeStep - 1]?.title }}
            </h2>
            <p class="text-gray-600">
              {{ steps[activeStep - 1]?.duration }}
            </p>
          </div>
        </div>

        <!-- 關鍵活動 -->
        <div class="mb-6">
          <h3 class="mb-3 text-lg text-[var(--yunda-bark)] font-semibold">
            Key Activities:
          </h3>
          <ul class="space-y-2">
            <li
              v-for="activity in steps[activeStep - 1]?.activities"
              :key="activity"
              class="flex items-start"
            >
              <span class="mr-2 mt-1 text-[var(--yunda-bark)]">•</span>
              <span class="text-sm text-[var(--primary-brown)]">{{ activity }}</span>
            </li>
          </ul>
        </div>

        <!-- 詳細描述 -->
        <div class="mb-6">
          <h3 class="mb-3 text-lg text-[var(--yunda-bark)] font-semibold">
            Process Details:
          </h3>
          <p class="text-[var(--primary-brown)] leading-relaxed">
            {{ steps[activeStep - 1]?.description }}
          </p>
        </div>

        <!-- 額外信息 -->
        <div class="space-y-4">
          <div class="rounded-lg bg-[var(--yunda-petal)] p-4">
            <h4 class="mb-2 text-[var(--yunda-bark)] font-semibold">
              Additional Information:
            </h4>
            <p class="text-sm text-[var(--primary-brown)] leading-relaxed">
              {{ steps[activeStep - 1]?.details }}
            </p>
          </div>

          <div
            v-for="section in steps[activeStep - 1]?.sections || []"
            :key="section.heading"
            class="border border-[var(--yunda-petal)] rounded-lg bg-white p-4"
          >
            <h4 class="mb-2 text-[var(--yunda-bark)] font-semibold">
              {{ section.heading }}
            </h4>
            <ul class="text-sm text-[var(--primary-brown)] leading-relaxed space-y-1">
              <li
                v-for="item in section.items"
                :key="item"
                class="flex items-start"
              >
                <span class="mr-2 mt-1 text-[var(--yunda-bark)]">•</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div
            v-if="steps[activeStep - 1]?.softCtas?.length"
            class="border border-[var(--yunda-bark)] rounded-lg bg-white p-4"
          >
            <h4 class="mb-2 text-[var(--yunda-bark)] font-semibold">
              Soft CTAs
            </h4>
            <ul class="text-sm text-[var(--primary-brown)] leading-relaxed space-y-1">
              <li
                v-for="cta in steps[activeStep - 1]?.softCtas"
                :key="cta"
                class="flex items-start"
              >
                <span class="mr-2 mt-1 text-[var(--yunda-bark)]">–</span>
                <span>{{ cta }}</span>
              </li>
            </ul>
          </div>
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
  background: var(--yunda-petal);
  border-radius: 3px;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: var(--yunda-bark);
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

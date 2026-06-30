<script setup>
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { buildItemListSchema } from '~/utils/schema'

const { t, locale } = useI18n()
const router = useRouter()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

// State management
const showQuestion = ref(true)
const showInfo = ref(false)
const currentQuestionIndex = ref(0)
const infoMessage = ref('')
const selectedAnswer = ref(null)
const answers = ref([]) // 记录所有答案

// 计算是否合格
const isQualified = computed(() => {
  return !answers.value.includes(false)
})

// 按钮文本：合格时显示 "Next: Application"，否则显示 "OK"
const buttonText = computed(() => {
  if (showInfo.value && isQualified.value) {
    return t('surrogacy.application.messages.nextApplication')
  }
  return t('common.ok')
})

// Questions array
const questions = [
  'surrogacy.application.qualificationQuestions.age',
  'surrogacy.application.qualificationQuestions.pregnancy',
  'surrogacy.application.qualificationQuestions.childcare',
  'surrogacy.application.qualificationQuestions.citizenship',
  'surrogacy.application.qualificationQuestions.education',
]

const qualificationItemListSchema = computed(() => buildItemListSchema({
  name: t('surrogacy.application.title'),
  description: t('surrogacy.application.welcomeMessage') || 'Quick surrogate qualification checklist',
  items: questions.map((key, index) => ({
    position: index + 1,
    name: `${t(key)}?`,
    description: index === 4
      ? 'Complete education requirement check and move to the next step'
      : 'Answer Yes/No to confirm eligibility and continue to the next question',
    url: '/surrogate-qualification',
  })),
  baseUrl: siteUrl.value || undefined,
  locale: locale.value,
}))

useHead(() => ({
  script: [
    {
      key: 'schema-surrogate-qualification-item-list',
      type: 'application/ld+json',
      children: JSON.stringify(qualificationItemListSchema.value),
    },
  ],
}))

// Handle answer selection
function handleAnswer(answer) {
  selectedAnswer.value = answer
  // 记录答案
  answers.value.push(answer)

  // 直接处理下一步
  processAnswer()
}

// Process the answer
function processAnswer() {
  currentQuestionIndex.value++
  selectedAnswer.value = null // Reset selection
  if (currentQuestionIndex.value >= questions.length) {
    // 所有问题回答完毕，检查是否有任何 'No' 的答案
    const hasNoAnswer = answers.value.includes(false)
    if (hasNoAnswer) {
      // 有 'No' 的答案 - 显示不符合资格的消息
      infoMessage.value = 'surrogacy.application.messages.notQualified'
    }
    else {
      // 全部都是 'Yes' - 显示符合资格的消息
      infoMessage.value = 'surrogacy.application.messages.qualified'
    }
    showQuestion.value = false
    showInfo.value = true
  }
}

// Handle info close
function handleInfoClose() {
  // 检查是否有任何 'No' 的答案
  const hasNoAnswer = answers.value.includes(false)

  if (!hasNoAnswer) {
    // 全部都是 'Yes' - 跳转到申请表单
    router.push(localePath('/be-surrogate'))
  }
  else {
    // 有 'No' 的答案 - 跳转到首页
    router.push(localePath('/'))
  }
}

// Initialize on mount
onMounted(() => {
  // 无需初始化 currentQuestion
})
</script>

<template>
  <div class="min-h-screen overflow-hidden bg-[var(--yunda-petal)]">
    <AppHeader />

    <!-- Header -->
    <div class="relative h-30 w-full flex items-center justify-center bg-[#d8d9ca] lg:h-80">
      <h1 class="text-center text-8 font-semibold italic lg:text-16" >
        {{ $t('surrogacy.application.title') }}
      </h1>
    </div>

    <!-- Content area -->
    <div class="relative min-h-[60vh] flex items-center justify-center px-4 lg:px-8 lg:py-40">
      <div class="relative w-80vw lg:w-40vw">
        <!-- Question Content -->
        <div v-if="showQuestion" class="relative rounded-5 bg-[#f1f2ea] shadow-[0_0_30px_4px_rgba(0,0,0,0.1)] shadow-black/20">
          <div class="px-8 py-10 lg:px-16 lg:py-20">
            <!-- Question -->
            <p class="mx-auto mb-8 w-full text-center text-4.5 lg:mb-10 lg:text-6" >
              {{ $t(questions[currentQuestionIndex]) }}
            </p>

            <!-- Buttons -->
            <div class="flex flex-col items-center space-y-4">
              <button
                class="h-10 min-w-60 rounded-2.5 bg-[rgba(246.29,236.19,216,0.50)] from-[rgba(234.35,232.57,208.37,0.75)] to-[rgba(234.35,232.57,208.37,0.75)] bg-gradient-to-b text-5 bg-blend-overlay shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] backdrop-blur-5 transition-all lg:h-15 lg:w-120 hover:border-2 hover:border-[#B2BBB2] lg:text-6"
                :class="{ 'border-2 border-[#B2BBB2]': selectedAnswer === true }"
                 @click="handleAnswer(true)"
              >
                {{ $t('common.yes') }}
              </button>

              <button
                class="h-10 min-w-60 rounded-2.5 bg-[rgba(246.29,236.19,216,0.50)] from-[rgba(234.35,232.57,208.37,0.75)] to-[rgba(234.35,232.57,208.37,0.75)] bg-gradient-to-b text-5 bg-blend-overlay shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] backdrop-blur-5 transition-all lg:h-15 lg:w-120 hover:border-2 hover:border-[#B2BBB2] lg:text-6"
                :class="{ 'border-2 border-[#B2BBB2]': selectedAnswer === false }"
                 @click="handleAnswer(false)"
              >
                {{ $t('common.no') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Info Content -->
        <div v-if="showInfo" class="relative rounded-5 bg-[#f1f2ea] shadow-[0_0_30px_4px_rgba(0,0,0,0.1)] shadow-black/20">
          <div class="px-8 py-10 lg:px-20 lg:py-20">
            <!-- Message -->
            <p class="mb-8 text-center text-5 lg:mb-10 lg:text-8" >
              {{ $t(infoMessage) }}
            </p>

            <!-- Button -->
            <div class="flex justify-center">
              <button
                class="rounded-full bg-[var(--yunda-bark)] px-8 py-2 text-5 text-[var(--yunda-petal)] transition-opacity lg:px-12 lg:py-2.5 lg:text-6 hover:opacity-90"
                @click="handleInfoClose"
              >
                {{ buttonText }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter />
  </div>
</template>

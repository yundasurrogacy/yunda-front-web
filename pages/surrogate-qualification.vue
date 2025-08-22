<template>
  <div class="min-h-screen bg-[var(--foot-bg)] overflow-hidden">
    <AppHeader/>
    
    <!-- Header -->
    <div class="relative w-full h-30 lg:h-80 bg-[#d8d9ca] flex items-center justify-center">
      <h1 class="text-center text-8 lg:text-16 font-semibold italic" style="font-family: var(--font-primary)">
        {{ $t('surrogacy.application.title') }}
      </h1>
    </div>

    <!-- Content area -->
    <div class="relative min-h-[60vh] flex items-center justify-center px-4 lg:px-8 lg:py-40">
      <div class="relative w-80vw lg:w-40vw">
        <!-- Question Content -->
        <div v-if="showQuestion" class="relative bg-[#f1f2ea] shadow-[0_0_30px_4px_rgba(0,0,0,0.1)] shadow-black/20 rounded-5">
          <div class="px-8 lg:px-16 py-10 lg:py-20">
            <!-- Question -->
            <p class="w-full mx-auto text-center text-4.5 lg:text-6 mb-8 lg:mb-10" style="font-family: var(--font-primary)">
              {{ currentQuestion }}
            </p>
            
            <!-- Buttons -->
            <div class="space-y-4 flex flex-col items-center">
              <button
                @click="handleAnswer(true)"
                class="min-w-60 lg:w-120 h-10 lg:h-15 bg-gradient-to-b from-[rgba(234.35,232.57,208.37,0.75)] to-[rgba(234.35,232.57,208.37,0.75)] bg-[rgba(246.29,236.19,216,0.50)] bg-blend-overlay shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] rounded-2.5 backdrop-blur-5 text-5 lg:text-6 hover:border-2 hover:border-[#B2BBB2] transition-all"
                :class="{ 'border-2 border-[#B2BBB2]': selectedAnswer === true }" style="font-family: var(--font-primary)"
              >
                {{ $t('common.yes') }}
              </button>
              
              <button
                @click="handleAnswer(false)"
                class="min-w-60 lg:w-120 h-10 lg:h-15 bg-gradient-to-b from-[rgba(234.35,232.57,208.37,0.75)] to-[rgba(234.35,232.57,208.37,0.75)] bg-[rgba(246.29,236.19,216,0.50)] bg-blend-overlay shadow-[inset_-2px_-2px_1px_rgba(255,255,255,0.5)] rounded-2.5 backdrop-blur-5 text-5 lg:text-6 hover:border-2 hover:border-[#B2BBB2] transition-all"
                :class="{ 'border-2 border-[#B2BBB2]': selectedAnswer === false }" style="font-family: var(--font-primary)"
              >
                {{ $t('common.no') }}
              </button>
            </div>
          </div>
        </div>

        <!-- Info Content -->
        <div v-if="showInfo" class="relative bg-[#f1f2ea] shadow-[0_0_30px_4px_rgba(0,0,0,0.1)] shadow-black/20 rounded-5">
          <div class="px-8 lg:px-20 py-10 lg:py-20">
            <!-- Message -->
            <p class="text-center text-5 lg:text-8 mb-8 lg:mb-10" style="font-family: var(--font-primary)">
              {{ infoMessage }}
            </p>
            
            <!-- Button -->
            <div class="flex justify-center">
              <button
                @click="handleInfoClose"
                class="px-8 lg:px-12 py-2 lg:py-2.5 bg-[var(--grayish-green)] text-[#FFFCF6] rounded-full text-5 lg:text-6 hover:opacity-90 transition-opacity"
              >
                {{ $t('common.ok') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <AppFooter/>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/base/AppHeader.vue'
import AppFooter from '@/components/base/AppFooter.vue'

const { t } = useI18n()
const router = useRouter()

// State management
const showQuestion = ref(true)
const showInfo = ref(false)
const currentQuestionIndex = ref(0)
const currentQuestion = ref('')
const infoMessage = ref('')
const selectedAnswer = ref(null)
const answers = ref([]) // 记录所有答案

// Questions array
const questions = [
  'surrogacy.application.qualificationQuestions.age',
  'surrogacy.application.qualificationQuestions.pregnancy',
  'surrogacy.application.qualificationQuestions.childcare',
  'surrogacy.application.qualificationQuestions.citizenship',
  'surrogacy.application.qualificationQuestions.education'
]

// Handle answer selection
const handleAnswer = (answer) => {
  selectedAnswer.value = answer
  // 记录答案
  answers.value.push(answer)
  
  // 直接处理下一步
  processAnswer()
}

// Process the answer
const processAnswer = () => {
  currentQuestionIndex.value++
  
  if (currentQuestionIndex.value < questions.length) {
    // Show next question
    currentQuestion.value = t(questions[currentQuestionIndex.value])
    selectedAnswer.value = null // Reset selection
  } else {
    // 所有问题回答完毕，检查是否有任何 'No' 的答案
    const hasNoAnswer = answers.value.includes(false)
    
    if (hasNoAnswer) {
      // 有 'No' 的答案 - 显示不符合资格的消息
      infoMessage.value = t('surrogacy.application.messages.notQualified')
    } else {
      // 全部都是 'Yes' - 显示符合资格的消息
      infoMessage.value = t('surrogacy.application.messages.qualified')
    }
    
    showQuestion.value = false
    showInfo.value = true
  }
}

// Handle info close
const handleInfoClose = () => {
  // 检查是否有任何 'No' 的答案
  const hasNoAnswer = answers.value.includes(false)
  
  if (!hasNoAnswer) {
    // 全部都是 'Yes' - 跳转到申请表单
    router.push('/be-surrogate')
  } else {
    // 有 'No' 的答案 - 跳转到首页
    router.push('/')
  }
}

// Initialize on mount
onMounted(() => {
  currentQuestion.value = t(questions[0])
})
</script>
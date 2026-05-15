<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

const { locale } = useI18n()

interface Testimonial {
  type: 'SURROGATE' | 'PARENT'
  content: string
  author: string
  location: string
}

// 中文评价数据
const testimonialsZh: Testimonial[] = [
  {
    type: 'SURROGATE',
    content: '作为一名代孕妈妈，我最大的担心是没有人能真正理解我在这个过程中的感受。但在孕达，从第一天起我就感受到了被看见和被尊重。Kayla不仅专业，还耐心地解释每一个步骤，让我感到平静和安全。整个团队给予了我如此稳定的支持，这段旅程成为了我人生中最温暖的经历之一。',
    author: 'Emily',
    location: '美国',
  },
  {
    type: 'PARENT',
    content: '我们选择孕达是因为我们想要一个透明、道德、真正关注LGBTQ+家庭的机构。我们没想到的是，团队——尤其是Kayla——会在情感上给予如此多的支持。她以同理心、诚实和专业指导着我们。今天，我们抱着我们的宝贝儿子，如果没有孕达出色的工作，这是不可能的。',
    author: 'Michael L.',
    location: '美国',
  },
  {
    type: 'SURROGATE',
    content: '我从未想过一个代孕机构会像家人一样，但孕达却做到了。沟通顺畅，团队关怀备至，我总是感到被重视。他们不仅关注我的医疗需求，同样关注我的情感健康，这对我来说意义重大。我绝对会向任何考虑成为代孕妈妈的女性推荐孕达。',
    author: 'Anna',
    location: '美国',
  },
  {
    type: 'PARENT',
    content: '与孕达代孕合作是我们做过的最令人安心的决定之一。从首次咨询到将宝宝带回家的最后一步，整个过程都井然有序、透明且真正得到支持。\n\n我们特别感谢孕达与SeedTrust Escrow在财务安全方面的合作，以及ART Risk提供的全面保险保障。这些值得信赖的合作伙伴让我们安心——每一笔付款都受到保护，每一个风险都得到清晰解释，每一步都专业管理。\n\n最重要的是，孕达团队从未把我们仅仅当作"客户"。他们的温暖、清晰和真诚的关怀陪伴我们度过了这段旅程的情感起伏。对于任何探索代孕并希望获得安全与同理心的人，孕达代孕是一个您可以毫不犹豫信任的团队。',
    author: 'Daniel',
    location: '澳大利亚',
  },
  {
    type: 'SURROGATE',
    content: '在整个怀孕过程中，团队从未消失——他们在每一个里程碑都在场，在每一次担忧时都给予支持，庆祝每一个欢乐的时刻。',
    author: 'Jessica R.',
    location: '美国',
  },
]

// 英文评价数据
const testimonialsEn: Testimonial[] = [
  {
    type: 'SURROGATE',
    content: 'As a surrogate, my biggest fear was that no one would truly understand how I felt during the journey. But with Yunda, I felt seen and respected from day one. Kayla is not only professional, she also patiently explains every step, which makes me feel calm and secure. The entire team has given me such steady support that this journey has become one of the warmest experiences of my life.',
    author: 'Emily',
    location: 'USA',
  },
  {
    type: 'PARENT',
    content: 'We chose Yunda because we wanted an agency that was transparent, ethical, and truly invested in LGBTQ+ families. What we didn\'t expect was how emotionally supportive the team—especially Kayla—would be. She guided us with empathy, honesty, and expertise. Today, we\'re holding our baby boy, and that would not have been possible without Yunda\'s incredible work.',
    author: 'Michael L.',
    location: 'USA',
  },
  {
    type: 'SURROGATE',
    content: 'I never expected a surrogacy agency to feel like a family, but Yunda somehow made that happen. The communication was smooth, the team was caring, and I always felt appreciated. They checked on my emotional well-being as much as my medical needs, which meant a lot. I would absolutely recommend Yunda to any woman considering becoming a surrogate.',
    author: 'Anna',
    location: 'USA',
  },
  {
    type: 'PARENT',
    content: 'Working with Yunda Surrogacy has been one of the most reassuring decisions we\'ve ever made. From the first consultation to the final steps of bringing our baby home, the entire process felt organized, transparent, and truly supported.\n\nWe especially appreciated Yunda\'s collaboration with SeedTrust Escrow for financial security and ART Risk for comprehensive insurance coverage. These trusted partners gave us peace of mind — every payment was protected, every risk was clearly explained, and every step felt professionally managed.\n\nMost importantly, the Yunda team never treated us like just "clients." Their warmth, clarity, and genuine care carried us through the emotional highs and lows of this journey. For anyone exploring surrogacy and wanting both safety and compassion, Yunda Surrogacy is a team you can trust without hesitation.',
    author: 'Daniel',
    location: 'Australia',
  },
  {
    type: 'SURROGATE',
    content: 'Throughout the pregnancy, the team never disappeared — they were present at every milestone, supportive during every worry, and celebrated every joyful moment.',
    author: 'Jessica R.',
    location: 'USA',
  },
]

// 根据当前语言选择评价数据
const testimonials = computed<Testimonial[]>(() => {
  return locale.value === 'zh' ? testimonialsZh : testimonialsEn
})

const currentIndex = ref(0)
const expandedStates = ref<Record<number, boolean>>({})
const isTransitioning = ref(false)

// 计算显示的三个评价索引（包括当前和相邻的）
const visibleIndices = computed(() => {
  const items = testimonials.value
  if (!items || items.length === 0) {
    return []
  }

  const total = items.length

  // 前一个
  const prevIndex = (currentIndex.value - 1 + total) % total
  // 当前
  const current = currentIndex.value
  // 后一个
  const nextIndex = (currentIndex.value + 1) % total

  return [prevIndex, current, nextIndex]
})

// 获取标签文本
function getTagText(type: 'SURROGATE' | 'PARENT') {
  if (type === 'SURROGATE') {
    return locale.value === 'zh' ? '代孕妈妈' : 'SURROGATE'
  }
  return locale.value === 'zh' ? '准父母' : 'PARENT'
}

// 切换展开/收起（带平滑动画）
function toggleExpand(index: number) {
  expandedStates.value[index] = !expandedStates.value[index]
  // 如果展开的是当前卡片，重置展开状态以确保动画正常
  if (index === currentIndex.value) {
    // 触发 Vue 的响应式更新
    nextTick(() => {
      // 确保内容区域有足够时间完成动画
    })
  }
}

// 检查是否展开
function isExpanded(index: number) {
  return expandedStates.value[index] || false
}

// 导航函数（带过渡动画）
function goToPrev() {
  if (isTransitioning.value) {
    return
  }
  isTransitioning.value = true
  currentIndex.value = (currentIndex.value - 1 + testimonials.value.length) % testimonials.value.length
  // 重置展开状态以保持一致性
  expandedStates.value = {}
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

function goToNext() {
  if (isTransitioning.value) {
    return
  }
  isTransitioning.value = true
  currentIndex.value = (currentIndex.value + 1) % testimonials.value.length
  // 重置展开状态以保持一致性
  expandedStates.value = {}
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

// 直接跳转到指定索引
function goToIndex(index: number) {
  if (isTransitioning.value || index === currentIndex.value) {
    return
  }
  isTransitioning.value = true
  currentIndex.value = index
  expandedStates.value = {}
  setTimeout(() => {
    isTransitioning.value = false
  }, 500)
}

// 获取标签样式
function getTagClass(type: 'SURROGATE' | 'PARENT') {
  if (type === 'SURROGATE') {
    return 'bg-[var(--primary-brown)] text-white'
  }
  // PARENT 标签使用灰绿色，更接近 brand book
  return 'bg-[var(--yunda-bark)] text-[var(--yunda-bark)]'
}

// 判断内容是否需要展开/收起功能（内容超过一定长度）
// 中文和英文使用不同的阈值，因为中文字符通常占用更多视觉空间
function needsExpand(content: string | undefined) {
  if (!content) {
    return false
  }
  // 对于中文内容，降低阈值以更好适应中文字符
  // 300字符对中文来说可能太长，改为200字符
  return content.length > 200
}

// 获取截断的内容
function getTruncatedContent(content: string | undefined, maxLength = 200) {
  if (!content || typeof content !== 'string') {
    return ''
  }
  if (content.length <= maxLength) {
    return content
  }
  return `${content.substring(0, maxLength)}...`
}

// 格式化内容（处理换行）
function formatContent(content: string | undefined) {
  if (!content || typeof content !== 'string') {
    return []
  }
  return content.split('\n').filter(line => line.trim())
}
</script>

<template>
  <section class="border-b border-t border-[var(--primary-brown)]/18 from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b px-4 py-20 md:px-20 md:py-25">
    <div class="mx-auto max-w-[1400px]">
      <!-- 标题 -->
      <h2 class="scroll-animate mb-16 text-center text-7.5 font-semibold uppercase md:mb-20 md:text-10" >
        {{ locale === 'zh' ? '客户评价' : 'TESTIMONIALS' }}
      </h2>

      <!-- 轮播容器 -->
      <div v-if="testimonials && testimonials.length > 0" class="scroll-animate scroll-animate-delay-100 relative">
        <!-- 左侧导航按钮 -->
        <button
          class="group absolute left-4 top-1/2 z-20 rounded-full bg-white/90 p-3 shadow-lg transition-all duration-300 md:left-8 -translate-y-1/2 active:scale-95 hover:scale-110 hover:bg-white md:p-4 hover:shadow-xl"
          :disabled="isTransitioning"
          @click="goToPrev"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path d="M15 18L9 12L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>

        <!-- 轮播内容 - Desktop -->
        <div class="relative mx-auto hidden items-center justify-center gap-4 overflow-hidden px-20 md:flex">
          <template v-for="(displayIndex, position) in visibleIndices" :key="`${displayIndex}-${currentIndex}`">
            <div
              class="testimonial-card flex-shrink-0 transition-all duration-500 ease-out"
              :class="{
                'w-[320px] opacity-70 scale-95': position === 0 || position === 2,
                'w-[450px] opacity-100 scale-100 z-10': position === 1,
              }"
            >
              <div
                class="card-inner w-full border-2 rounded-2xl bg-[#FAF8F3] transition-all duration-300"
                :class="{
                  'border-[var(--primary-brown)] p-7 md:p-9 shadow-lg hover:shadow-2xl hover:border-[var(--primary-brown)] hover:bg-[#F9F6EF]': position === 1,
                  'border-gray-300/60 p-5 md:p-6 shadow-md hover:shadow-lg hover:border-gray-400/80 hover:bg-[#F9F6EF]': position === 0 || position === 2,
                }"
              >
                <!-- 标签 -->
                <div v-if="testimonials[displayIndex]" class="mb-4 flex items-center">
                  <span
                    class="rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase md:px-5 md:py-2 md:text-sm"
                    :class="getTagClass(testimonials[displayIndex]?.type || 'SURROGATE')"
                  >
                    {{ getTagText(testimonials[displayIndex]?.type || 'SURROGATE') }}
                  </span>
                </div>

                <!-- 评价内容 -->
                <div v-if="testimonials[displayIndex]" class="mb-6 overflow-hidden text-[var(--yunda-bark)]" style="font-family: var(--font-text)">
                  <div
                    class="content-wrapper transition-all duration-500 ease-in-out"
                    :class="{
                      'max-h-[200px]': needsExpand(testimonials[displayIndex]?.content) && !isExpanded(displayIndex),
                      'max-h-[2000px]': !needsExpand(testimonials[displayIndex]?.content) || isExpanded(displayIndex),
                    }"
                  >
                    <template v-if="needsExpand(testimonials[displayIndex]?.content) && !isExpanded(displayIndex)">
                      <p class="leading-relaxed">
                        {{ getTruncatedContent(testimonials[displayIndex]?.content || '') }}
                      </p>
                    </template>
                    <template v-else>
                      <div class="leading-relaxed space-y-3">
                        <p
                          v-for="(paragraph, idx) in formatContent(testimonials[displayIndex]?.content || '')"
                          :key="idx"
                          class="fade-in"
                        >
                          {{ paragraph }}
                        </p>
                      </div>
                    </template>
                  </div>

                  <!-- Expand/Minimize 按钮 - 放在评论内容后面 -->
                  <div
                    v-if="testimonials[displayIndex] && needsExpand(testimonials[displayIndex]?.content)"
                    class="expand-button group mt-3 inline-flex cursor-pointer items-center gap-2 text-sm text-[var(--primary-brown)] transition-all duration-300 hover:gap-3"
                    style="font-family: var(--font-text)"
                    @click="toggleExpand(displayIndex)"
                  >
                    <span class="font-medium transition-all duration-300 group-hover:font-semibold">
                      {{ isExpanded(displayIndex) ? (locale === 'zh' ? '收起' : 'Minimize') : (locale === 'zh' ? '展开' : 'Expand') }}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      :class="{ 'rotate-180': isExpanded(displayIndex) }"
                      class="transition-transform duration-500 ease-in-out group-hover:scale-110"
                    >
                      <path
                        d="M4 6L8 10L12 6"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>

                <!-- 作者信息 -->
                <div v-if="testimonials[displayIndex]" class="mb-0 text-sm text-[var(--yunda-bark)] font-semibold md:text-base" style="font-family: var(--font-text)">
                  {{ testimonials[displayIndex]?.author }} / {{ testimonials[displayIndex]?.location }}
                </div>
              </div>
            </div>
          </template>
        </div>

        <!-- 轮播内容 - Mobile -->
        <div v-if="testimonials && testimonials.length > 0" class="relative mx-auto max-w-md px-4 md:hidden">
          <div class="w-full border-2 border-[var(--primary-brown)] rounded-2xl bg-[#FAF8F3] p-6 shadow-md">
            <!-- 标签 -->
            <div v-if="testimonials[currentIndex]" class="mb-4 flex items-center">
              <span
                class="rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide uppercase"
                :class="getTagClass(testimonials[currentIndex]?.type || 'SURROGATE')"
              >
                {{ getTagText(testimonials[currentIndex]?.type || 'SURROGATE') }}
              </span>
            </div>

            <!-- 评价内容 -->
            <div v-if="testimonials[currentIndex]" class="mb-6 overflow-hidden text-[var(--yunda-bark)]" style="font-family: var(--font-text)">
              <div
                class="content-wrapper transition-all duration-500 ease-in-out"
                :class="{
                  'max-h-[200px]': needsExpand(testimonials[currentIndex]?.content) && !isExpanded(currentIndex),
                  'max-h-[2000px]': !needsExpand(testimonials[currentIndex]?.content) || isExpanded(currentIndex),
                }"
              >
                <template v-if="needsExpand(testimonials[currentIndex]?.content) && !isExpanded(currentIndex)">
                  <p class="leading-relaxed">
                    {{ getTruncatedContent(testimonials[currentIndex]?.content || '') }}
                  </p>
                </template>
                <template v-else>
                  <div class="leading-relaxed space-y-3">
                    <p
                      v-for="(paragraph, idx) in formatContent(testimonials[currentIndex]?.content || '')"
                      :key="idx"
                      class="fade-in"
                    >
                      {{ paragraph }}
                    </p>
                  </div>
                </template>
              </div>

              <!-- Expand/Minimize 按钮 - 放在评论内容后面 -->
              <div
                v-if="testimonials[currentIndex] && needsExpand(testimonials[currentIndex]?.content)"
                class="expand-button group mt-3 inline-flex cursor-pointer items-center gap-2 text-sm text-[var(--primary-brown)] transition-all duration-300 hover:gap-3"
                style="font-family: var(--font-text)"
                @click="toggleExpand(currentIndex)"
              >
                <span class="font-medium transition-all duration-300 group-hover:font-semibold">
                  {{ isExpanded(currentIndex) ? (locale === 'zh' ? '收起' : 'Minimize') : (locale === 'zh' ? '展开' : 'Expand') }}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  :class="{ 'rotate-180': isExpanded(currentIndex) }"
                  class="transition-transform duration-500 ease-in-out group-hover:scale-110"
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
            </div>

            <!-- 作者信息 -->
            <div v-if="testimonials[currentIndex]" class="mb-0 text-sm text-[var(--yunda-bark)] font-semibold" style="font-family: var(--font-text)">
              {{ testimonials[currentIndex]?.author }} / {{ testimonials[currentIndex]?.location }}
            </div>
          </div>
        </div>

        <!-- 右侧导航按钮 -->
        <button
          class="group absolute right-4 top-1/2 z-20 rounded-full bg-white/90 p-3 shadow-lg transition-all duration-300 md:right-8 -translate-y-1/2 active:scale-95 hover:scale-110 hover:bg-white md:p-4 hover:shadow-xl"
          :disabled="isTransitioning"
          @click="goToNext"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>

      <!-- 指示器 -->
      <div v-if="testimonials && testimonials.length > 0" class="scroll-animate scroll-animate-delay-200 mt-12 flex justify-center gap-2 md:mt-16">
        <button
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="indicator-button h-2 rounded-full transition-all duration-300 md:h-2.5"
          :class="index === currentIndex ? 'w-8 bg-[var(--primary-brown)] shadow-md md:w-10' : 'w-2 bg-gray-300 hover:bg-gray-400 md:w-2.5'"
          :disabled="isTransitioning"
          @click="goToIndex(index)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
/* 轮播卡片过渡动画 */
.testimonial-card {
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform, opacity, scale;
}

/* 卡片内部边框和阴影过渡 */
.card-inner {
  transition:
    box-shadow 0.3s ease,
    border-color 0.3s ease,
    background-color 0.3s ease;
}

/* 内容展开/收起动画 */
.content-wrapper {
  transition: max-height 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
}

/* 文字淡入动画 */
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Expand按钮hover效果 */
.expand-button:hover {
  transform: translateX(2px);
}

/* 指示器hover效果 */
.indicator-button {
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.indicator-button:hover:not(:disabled) {
  transform: scale(1.2);
}

.indicator-button:disabled {
  cursor: not-allowed;
  opacity: 0.6;
}

/* 导航按钮禁用状态 */
button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

button:disabled:hover {
  transform: none;
  scale: 1;
}
</style>

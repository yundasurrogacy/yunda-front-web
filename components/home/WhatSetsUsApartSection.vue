<script setup>
import { computed, ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()
const { locale } = useI18n()
const localePath = useLocalePath()
const sectionId = useId()
const featureList = ref(null)

const openFeatureIndex = ref(0)
const tt = computed(() => locale.value.startsWith('zh')
  ? {
      title: '我们的与众不同',
      introduction: '从了解流程到安排下一步，Yunda Surrogacy（孕达代孕）为准父母与代母提供沟通、协调和个案管理支持。',
      imageAlt: 'Yunda Surrogacy 团队参加 ASRM 会议',
      items: [
        { title: '清晰的流程协调', description: '我们协助整理资料、沟通匹配偏好并跟进下一步安排。实际进度取决于各方意愿、筛选结果及独立专业机构的安排。' },
        { title: '费用与职责说明', descriptionPrefix: '了解各阶段安排、服务范围与', descriptionLinkText: '代孕费用构成', descriptionSuffix: '。具体费用、第三方收费与付款条件以相应协议及专业机构说明为准。', link: '/surrogacy-cost' },
        { title: '贴合个人情况的支持', description: '我们了解您的家庭情况、沟通偏好与旅程目标，协调适合的下一步。医学评估与治疗方案由独立诊所和医疗专业人士负责。' },
        { title: '独立专业服务的衔接', description: '我们协助衔接诊所、独立律师、保险及托管服务方，并跟进沟通与文件安排。相关专业判断及服务由各自机构负责。' },
      ],
    }
  : {
      title: 'What Sets Us Apart',
      introduction: 'From understanding the process to planning the next step, Yunda Surrogacy supports intended parents and surrogates with communication, coordination, and case management.',
      imageAlt: 'Yunda Surrogacy team at ASRM',
      items: [
        { title: 'Clear process coordination', description: 'We help organize information, discuss matching preferences, and follow up on next steps. Timing depends on mutual preferences, screening results, and the schedules of independent professionals.' },
        { title: 'Cost and role transparency', descriptionPrefix: 'Understand the stages, scope of support, and ', descriptionLinkText: 'surrogacy cost breakdown', descriptionSuffix: '. Specific fees, third-party charges, and payment terms are set out in the relevant agreements and provider information.', link: '/surrogacy-cost' },
        { title: 'Support shaped around you', description: 'We listen to your family circumstances, communication preferences, and journey goals to coordinate next steps. Independent clinics and medical professionals handle medical assessments and treatment plans.' },
        { title: 'Coordination with professionals', description: 'We help connect you with clinics, independent attorneys, insurance professionals, and escrow providers, and follow up on communication and documents. Each provider is responsible for its own professional advice and services.' },
      ],
    })

const iconPaths = [
  'M8 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-3M8 3v4h8V3H8m1 11 2 2 8-8',
  'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6v6h6M8 13h8m-8 4h5',
  'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z',
  'M8 12h8m-3-3 3 3-3 3M9 5H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4m6-14h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4',
]
const featureItems = computed(() => tt.value.items)

function toggleFeature(index) {
  openFeatureIndex.value = openFeatureIndex.value === index ? -1 : index
}

function focusFeature(index) {
  const buttons = featureList.value?.querySelectorAll('.feature-toggle')
  if (buttons?.length)
    buttons[(index + buttons.length) % buttons.length].focus()
}
</script>

<template>
  <section :aria-labelledby="`${sectionId}-heading`" class="bg-[var(--yunda-petal)] px-4 py-[60px] md:px-20">
    <div class="mx-auto max-w-[1400px]">
      <div class="scroll-animate rounded-bl-[28px] rounded-br-[28px] rounded-tl-[120px] rounded-tr-[28px] px-5 py-8 ring-1 ring-[color-mix(in_srgb,var(--yunda-bark)_10%,transparent)] md:min-h-[680px] lg:px-10 lg:py-12 md:px-8 md:py-10">
        <div class="grid items-start gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12">
          <div class="min-w-0">
            <div class="aspect-square w-full overflow-hidden rounded-[28px]">
              <picture class="block h-full w-full">
                <source
                  srcset="/images/pages/home/what-sets-us-apart-480.avif 480w, /images/pages/home/what-sets-us-apart-768.avif 768w, /images/pages/home/what-sets-us-apart-1200.avif 1200w"
                  sizes="(max-width: 767px) calc(100vw - 72px), (max-width: 1023px) calc(100vw - 224px), 520px"
                  type="image/avif"
                >
                <img
                  src="/images/pages/home/what-sets-us-apart-1200.avif"
                  :alt="tt.imageAlt"
                  class="h-full w-full object-cover"
                  width="1200"
                  height="1200"
                  loading="lazy"
                  decoding="async"
                >
              </picture>
            </div>
          </div>

          <div class="min-w-0">
            <h2 :id="`${sectionId}-heading`" class="mb-3 text-left text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] font-display md:mb-4 md:mt-0 md:text-[42px]">
              {{ tt.title }}
            </h2>
            <p class="mb-6 text-base text-[var(--yunda-bark)] leading-[1.75] font-sans">
              {{ tt.introduction }}
            </p>
            <div ref="featureList" class="flex flex-col gap-3">
              <div
                v-for="(item, index) in featureItems"
                :key="index"
                class="feature-item overflow-hidden rounded-2xl"
              >
                <h3 class="m-0">
                  <button
                    :id="`${sectionId}-toggle-${index}`"
                    type="button"
                    :aria-expanded="openFeatureIndex === index"
                    :aria-controls="`${sectionId}-panel-${index}`"
                    class="feature-toggle w-full flex items-center gap-3 p-4 text-left text-lg text-[var(--yunda-bark)] font-semibold leading-snug transition-colors hover:bg-[var(--yunda-petal)] md:p-5 md:text-xl"
                    style="font-family: var(--font-text)"
                    @click="toggleFeature(index)"
                    @keydown.down.prevent="focusFeature(index + 1)"
                    @keydown.up.prevent="focusFeature(index - 1)"
                    @keydown.home.prevent="focusFeature(0)"
                    @keydown.end.prevent="focusFeature(featureItems.length - 1)"
                  >
                    <span class="h-10 w-10 flex shrink-0 items-center justify-center rounded-full bg-[var(--yunda-petal)] text-[var(--yunda-maple)]" aria-hidden="true">
                      <svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round">
                        <path :d="iconPaths[index]" />
                      </svg>
                    </span>
                    <span>
                      {{ item.title }}
                    </span>
                    <span class="ml-auto h-7 w-7 flex shrink-0 items-center justify-center border border-current rounded-full text-2xl text-[var(--yunda-maple)] leading-none" aria-hidden="true">{{ openFeatureIndex === index ? '−' : '+' }}</span>
                  </button>
                </h3>

                <div
                  v-show="openFeatureIndex === index"
                  :id="`${sectionId}-panel-${index}`"
                  role="region"
                  :aria-labelledby="`${sectionId}-toggle-${index}`"
                  class="px-4 pb-5 text-base text-[var(--yunda-bark)] leading-[1.75] font-sans md:pl-[72px] md:pr-5"
                  style="font-family: var(--font-text)"
                >
                  <template v-if="item.link">
                    {{ item.descriptionPrefix }}<NuxtLink
                      :to="localePath(item.link)"
                      class="feature-link underline underline-offset-4 transition-colors hover:text-[var(--yunda-maple)]"
                    >
                      {{ item.descriptionLinkText }}
                    </NuxtLink>{{ item.descriptionSuffix }}
                  </template>
                  <template v-else>
                    {{ item.description }}
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-item {
  border: 1px solid color-mix(in srgb, var(--yunda-bark) 18%, transparent);
  background: color-mix(in srgb, white 70%, var(--yunda-petal));
}

.feature-toggle:focus-visible {
  outline: 2px solid var(--yunda-maple);
  outline-offset: -4px;
}

.feature-link:focus-visible {
  outline: 2px solid var(--yunda-maple);
  outline-offset: 3px;
}
</style>

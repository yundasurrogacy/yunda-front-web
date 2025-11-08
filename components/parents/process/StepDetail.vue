<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

const props = defineProps({
  stepNumber: {
    type: Number,
    required: true,
  },
})
const { t } = useI18n()
const { initScrollAnimation } = useScrollAnimation()

const isEven = computed(() => props.stepNumber % 2 === 0)

onMounted(() => {
  initScrollAnimation()
})

const stepData = computed(() => {
  return {
    title: t(`parentsProcess.surrogacyProcess.step${props.stepNumber}.title`),
    duration: t(`parentsProcess.surrogacyProcess.step${props.stepNumber}.duration`),
    tasks: [
      t(`parentsProcess.surrogacyProcess.step${props.stepNumber}.tasks.task1`),
      t(`parentsProcess.surrogacyProcess.step${props.stepNumber}.tasks.task2`),
      t(`parentsProcess.surrogacyProcess.step${props.stepNumber}.tasks.task3`),
      ...(props.stepNumber >= 3
        ? [t(`parentsProcess.surrogacyProcess.step${props.stepNumber}.tasks.task4`)]
        : []),
      ...(props.stepNumber >= 4
        ? [t(`parentsProcess.surrogacyProcess.step${props.stepNumber}.tasks.task5`)]
        : []),
    ],
    description: t(`parentsProcess.surrogacyProcess.step${props.stepNumber}.description`),
    imageWebp: `/images/process/i-${props.stepNumber}.webp`,
    imagePng: `/images/process/i-${props.stepNumber}.png`,
  }
})
</script>

<template>
  <div class="step-detail w-full flex justify-center from-[#FAF7F2] via-[#FBF0DA] to-[#FAF7F2] bg-gradient-to-b px-4 py-6">
    <div class="container mx-auto max-w-300">
      <div class="flex flex-col items-center gap-8 lg:flex-row" :class="{ 'lg:flex-row-reverse': isEven }">
        <div class="lg:w-1/2" :class="isEven ? 'slide-right' : 'slide-left'">
          <picture class="block h-auto w-full overflow-hidden rounded-lg">
            <source :srcset="stepData.imageWebp" type="image/webp">
            <img :src="stepData.imagePng" :alt="stepData.title" class="h-full w-full object-cover" loading="lazy" decoding="async">
          </picture>
        </div>
        <div class="lg:w-1/2" :class="isEven ? 'slide-left' : 'slide-right'">
          <h3 class="text-3xl font-semibold" style="font-family: var(--font-primary)">
            {{ $t('parentsProcess.stepDetail.stepPrefix') }} {{ stepNumber }} : {{ stepData.title }}
          </h3>
          <p class="my-2 border-b border-[var(--dark-brown)] pb-2">
            {{ stepData.duration }}
          </p>
          <ul class="mb-2 list-disc list-inside">
            <li v-for="(task, index) in stepData.tasks" :key="index">
              {{ task }}
            </li>
          </ul>
          <p>{{ stepData.description }}</p>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="lg: border-1 lg:mt-6 lg:h-20 lg:border-l lg:border-[#271F18]" />
      </div>
    </div>
  </div>
</template>

<template>
  <div class="step-detail py-6 px-4 bg-gradient-to-b from-[#FAF7F2] via-[#FBF0DA] to-[#FAF7F2] flex justify-center w-full">
    <div class="container mx-auto max-w-300">
      <div class="flex flex-col lg:flex-row items-center gap-8" :class="{ 'lg:flex-row-reverse': isEven }">
        <div class="lg:w-1/2" :class="isEven ? 'slide-right' : 'slide-left'">
          <img :src="stepData.image" :alt="stepData.title" class="w-full h-auto object-cover rounded-lg">
        </div>
        <div class="lg:w-1/2" :class="isEven ? 'slide-left' : 'slide-right'">
          <h3 class="text-3xl font-semibold" style="font-family: var(--font-primary)">{{ $t('parentsProcess.stepDetail.stepPrefix') }} {{ stepNumber }} : {{ stepData.title }}</h3>
          <p class="my-2 border-b pb-2 border-[var(--dark-brown)]">{{ stepData.duration }}</p>
          <ul class="list-disc list-inside mb-2">
            <li v-for="(task, index) in stepData.tasks" :key="index">{{ task }}</li>
          </ul>
          <p>{{ stepData.description }}</p>
        </div>
      </div>
      <div class="flex justify-center"><div class="lg:mt-6 lg:h-20 lg:border-l lg: border-1 lg:border-[#271F18]"></div></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useScrollAnimation } from '@/composables/useScrollAnimation';

const { t } = useI18n();
const { initScrollAnimation } = useScrollAnimation();

const props = defineProps({
  stepNumber: {
    type: Number,
    required: true
  }
});

const isEven = computed(() => props.stepNumber % 2 === 0);

onMounted(() => {
  initScrollAnimation();
});

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
        : [])
    ],
    description: t(`parentsProcess.surrogacyProcess.step${props.stepNumber}.description`),
    image: `/images/process/i-${props.stepNumber}.png`
  };
});
</script>

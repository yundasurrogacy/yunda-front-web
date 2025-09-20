<template>
  <section class="w-full py-16 lg:py-20 px-4 lg:px-20 bg-gradient-to-b from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)]">
    <div class="max-w-300 mx-auto">
      <!-- Title -->
      <h2 class="text-7.5 lg:text-10 font-semibold mb-8 lg:mb-12" style="font-family: var(--font-primary)">
        {{ $t('parentsSingle.faqSection.title') }}
      </h2>

      <!-- FAQ Items -->
      <div class="space-y-4 lg:space-y-6 text-3 lg:text-5">
        <div v-for="(faq, index) in faqs" :key="index" class="space-y-0">
          <!-- Question -->
          <div @click="toggleFaq(index)" 
               class="w-full p-3 bg-[var(--faq-bg)] rounded-2 flex justify-between items-center cursor-pointer">
            <h3 class="pr-4">
              {{ $t(`parentsSingle.faqSection.items.${faq.id}.question`) }}
            </h3>
            <img 
              src="/images/base/arrow.svg" 
              alt="Toggle FAQ"
              class="w-4 lg:w-5 h-4 lg:h-5 flex-shrink-0 transform transition-transform duration-300"
              :class="expandedFaq === index ? 'rotate-90' : 'rotate-0'"
            />
          </div>
          
          <!-- Answer -->
          <div v-show="expandedFaq === index" 
               class="p-2 lg:p-4">
            {{ $t(`parentsSingle.faqSection.items.${faq.id}.answer`) }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const expandedFaq = ref<number | null>(null);

const faqs = [
  { id: 'sameSexLegal' },
  { id: 'singleParent' },
  { id: 'coupleInChina' },
  { id: 'bringBabyBack' },
  { id: 'bothNames' }
];

const toggleFaq = (index: number) => {
  expandedFaq.value = expandedFaq.value === index ? null : index;
};
</script>
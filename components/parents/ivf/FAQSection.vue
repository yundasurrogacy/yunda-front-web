<script setup lang="ts">
import { ref } from 'vue'

const expandedFaq = ref<number | null>(null)

const faqs = [
  { id: 'chooseClinic' },
  { id: 'embryoShipping' },
  { id: 'frozenEmbryos' },
  { id: 'eggDonationCreation' },
  { id: 'medicalCosts' },
]

function toggleFaq(index: number) {
  expandedFaq.value = expandedFaq.value === index ? null : index
}
</script>

<template>
  <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b px-4 py-16 lg:px-20 lg:py-20">
    <div class="mx-auto max-w-300">
      <!-- Title -->
      <h2 class="mb-8 text-7.5 font-semibold lg:mb-12 lg:text-10" >
        {{ $t('parentsIvf.faqSection.title') }}
      </h2>

      <!-- FAQ Items -->
      <div class="text-3 space-y-4 lg:text-5 lg:space-y-6">
        <div v-for="(faq, index) in faqs" :key="index" class="space-y-0">
          <!-- Question -->
          <div
            class="w-full flex cursor-pointer items-center justify-between rounded-2 bg-[var(--faq-bg)] p-3"
            @click="toggleFaq(index)"
          >
            <h3 class="pr-4">
              {{ $t(`parentsIvf.faqSection.items.${faq.id}.question`) }}
            </h3>
            <img
              src="/images/base/arrow.svg" alt="Toggle FAQ"
              class="h-4 w-4 flex-shrink-0 transform transition-transform duration-300 lg:h-5 lg:w-5"
              :class="expandedFaq === index ? 'rotate-90' : 'rotate-0'"
            >
          </div>

          <!-- Answer -->
          <div
            v-show="expandedFaq === index"
            class="p-2 lg:p-4"
          >
            {{ $t(`parentsIvf.faqSection.items.${faq.id}.answer`) }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

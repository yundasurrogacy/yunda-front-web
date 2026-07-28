<script setup lang="ts">
const clinics = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
]

const clinicNames = [
  { name: 'EFC', font: 'cormorant' },
  { name: 'SCRC', font: 'cormorant' },
  { name: 'Pinnacle', font: 'cormorant' },
  { name: 'Harvest', font: 'cormorant' },
  { name: '香港宝德', font: 'songti' },
  { name: 'Gen5', font: 'cormorant' },
  { name: 'Incinta', font: 'cormorant' },
]
</script>

<template>
  <section
    class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b px-4 py-16 lg:px-20 lg:py-20"
  >
    <div class="mx-auto max-w-300">
      <!-- Title -->
      <h2 class="mb-12 text-center text-7.5 font-semibold lg:mb-16 lg:text-left lg:text-10" >
        {{ $t('parentsIvf.clinicsSection.title') }}
      </h2>
      <!-- Clinic Names -->
      <div class="mb-8 text-5 font-semibold font-display lg:text-10">
        <!-- 第一行：3个诊所名称，占2、4、6列 -->
        <div class="grid grid-cols-7 mb-4">
          <div /> <!-- 空列1 -->
          <div class="text-center">
            {{ clinicNames[0].name }}
          </div> <!-- 列2: EFC -->
          <div /> <!-- 空列3 -->
          <div class="text-center">
            {{ clinicNames[1].name }}
          </div> <!-- 列4: Harvest -->
          <div /> <!-- 空列5 -->
          <div class="text-center">
            {{ clinicNames[2].name }}
          </div> <!-- 列6: Pinnacle -->
          <div /> <!-- 空列7 -->
        </div>

        <!-- 第二行：4个诊所名称，占1、3、5、7列 -->
        <div class="grid grid-cols-7 gap-1">
          <div class="text-center">
            {{ clinicNames[3].name }}
          </div> <!-- 列1: 香港宝德 -->
          <div /> <!-- 空列2 -->
          <div class="text-center text-3.5 font-['SourceHanSerifCN'] lg:text-8">
            {{ clinicNames[4].name }}
          </div> <!-- 列3: SCRC -->
          <div /> <!-- 空列4 -->
          <div class="text-center">
            {{ clinicNames[5].name }}
          </div> <!-- 列5: Gen5 -->
          <div /> <!-- 空列6 -->
          <div class="text-center">
            {{ clinicNames[6].name }}
          </div> <!-- 列7: Incinta -->
        </div>
      </div>

      <!-- Clinics Grid -->
      <div class="mx-6 mb-8 flex flex-col gap-8 md:flex-row md:gap-0">
        <div v-for="clinic in clinics" :key="clinic.id" class="flex-1 text-center">
          <!-- Clinic Image -->
          <picture class="block aspect-[4/5] w-full overflow-hidden">
            <source :srcset="`/images/pages/intended-parents/steps/step-${clinic.id + 7}.webp`" type="image/webp">
            <img
              :src="`/images/pages/intended-parents/steps/step-${clinic.id + 7}.png`" :alt="`Clinic ${clinic.id}`"
              class="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            >
          </picture>
        </div>
      </div>
    </div>
  </section>
</template>

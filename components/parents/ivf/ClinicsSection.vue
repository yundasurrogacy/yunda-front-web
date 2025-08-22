<template>
  <section
    class="w-full py-16 lg:py-20 px-4 lg:px-20 bg-gradient-to-b from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)]">
    <div class="max-w-300 mx-auto">
      <!-- Title -->
      <h2 class="text-7.5 lg:text-10 font-semibold mb-12 lg:mb-16 text-center lg:text-left" style="font-family: var(--font-primary)">
        {{ $t('parentsIvf.clinicsSection.title') }}
      </h2>
      <!-- Clinic Names -->
      <div class="mb-8 text-5 lg:text-10 font-semibold font-['Cormorant']" >
        <!-- 第一行：3个诊所名称，占2、4、6列 -->
        <div class="grid grid-cols-7 mb-4">
          <div></div> <!-- 空列1 -->
          <div class="text-center">
            {{ clinicNames[0].name }}
          </div> <!-- 列2: EFC -->
          <div></div> <!-- 空列3 -->
          <div class="text-center">
            {{ clinicNames[1].name }}
          </div> <!-- 列4: Harvest -->
          <div></div> <!-- 空列5 -->
          <div class="text-center">
            {{ clinicNames[2].name }}
          </div> <!-- 列6: Pinnacle -->
          <div></div> <!-- 空列7 -->
        </div>

        <!-- 第二行：4个诊所名称，占1、3、5、7列 -->
        <div class="grid grid-cols-7 gap-1">
          <div class="text-center">
            {{ clinicNames[3].name }}
          </div> <!-- 列1: 香港宝德 -->
          <div></div> <!-- 空列2 -->
          <div class="text-center text-3.5 lg:text-8 font-['SourceHanSerifCN']">
            {{ clinicNames[4].name }}
          </div> <!-- 列3: SCRC -->
          <div></div> <!-- 空列4 -->
          <div class="text-center">
            {{ clinicNames[5].name }}
          </div> <!-- 列5: Gen5 -->
          <div></div> <!-- 空列6 -->
          <div class="text-center">
            {{ clinicNames[6].name }}
          </div> <!-- 列7: Incinta -->
        </div>
      </div>

      <!-- Clinics Grid -->
      <div class="flex flex-col md:flex-row gap-8 md:gap-0 mb-8 mx-6">
        <div v-for="clinic in clinics" :key="clinic.id" class="flex-1 text-center">
          <!-- Clinic Image -->
          <img :src="`/images/process/i-${clinic.id + 7}.png`" :alt="`Clinic ${clinic.id}`"
            class="w-full aspect-[4/5] object-cover" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const clinics = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 }
];

const clinicNames = [
  { name: 'EFC', font: 'cormorant' },
  { name: 'SCRC', font: 'cormorant' },
  { name: 'Pinnacle', font: 'cormorant' },
  { name: 'Harvest', font: 'cormorant' },
  { name: '香港宝德', font: 'songti' },
  { name: 'Gen5', font: 'cormorant' },
  { name: 'Incinta', font: 'cormorant' }
];
</script>
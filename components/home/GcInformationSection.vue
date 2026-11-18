<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { gcProfiles } from '~/data/gc-profiles'

const { locale } = useI18n()
const isZh = computed(() => locale.value.startsWith('zh'))
const tt = (en: string, zh: string) => isZh.value ? zh : en

const sectionTitle = computed(() => tt('Meet Our Surrogates', '了解我们的代孕妈妈'))
const sectionSubtitle = computed(() =>
  tt(
    'Dedicated women making dreams of parenthood come true.',
    '一群充满奉献精神的女性，正在帮助家庭实现成为父母的梦想。',
  ),
)

function statusText(status: string) {
  if (!isZh.value)
    return status

  return {
    'Complete embryo transfer': '完成胚胎移植',
    'Finish the journey': '完成代孕旅程',
    'Confirmed pregnancy': '已确认怀孕',
  }[status] ?? status
}
</script>

<template>
  <section class="bg-[var(--yunda-petal)] px-4 py-12 md:px-16 md:py-16">
    <div class="mx-auto max-w-320">
      <div class="text-center">
        <h2 class="font-display text-[32px] text-[var(--yunda-bark)] font-medium leading-[1.15] md:text-[42px]">
          {{ sectionTitle }}
        </h2>
        <p class="mt-4 font-sans text-base text-[var(--yunda-bark)] leading-[1.75] md:text-[17px]" style="font-family: var(--font-text)">
          {{ sectionSubtitle }}
        </p>
      </div>

      <div class="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <article
          v-for="(profile, index) in gcProfiles"
          :key="profile.image"
          class="overflow-hidden rounded-[24px] bg-white shadow-[0_12px_30px_rgba(60,36,21,0.09)]"
        >
          <img
            :src="profile.image"
            :alt="tt(`Yunda Surrogacy surrogate profile ${index + 1}`, `Yunda Surrogacy 代孕妈妈资料图 ${index + 1}`)"
            class="aspect-square w-full object-cover"
            width="1080"
            height="1080"
            loading="lazy"
            decoding="async"
          >

          <div class="surrogate-card-content px-6 pb-8 pt-5">
            <div class="flex items-center gap-2 text-xs text-[#a66c3d] font-bold tracking-[0.08em] uppercase">
              <svg viewBox="0 0 24 24" class="h-4 w-4" fill="currentColor" aria-hidden="true">
                <path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Zm0-9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
              </svg>
              <span>{{ profile.state }}</span>
            </div>

            <dl class="surrogate-card-details mt-5 text-[15px] text-[var(--yunda-bark)] leading-[1.7]">
              <div class="flex items-baseline justify-between gap-4">
                <dt class="font-medium">{{ tt('Age', '年龄') }}</dt>
                <dd>{{ profile.age }}</dd>
              </div>
              <div class="flex items-baseline justify-between gap-4">
                <dt class="font-medium">{{ tt('Previous Births', '既往分娩') }}</dt>
                <dd>{{ profile.previousBirths }}</dd>
              </div>
              <div class="flex items-baseline justify-between gap-4">
                <dt class="font-medium">{{ tt('Partnered', '合作年份') }}</dt>
                <dd>{{ profile.partnered }}</dd>
              </div>
              <div class="surrogate-card-status mt-4 border-t border-[var(--yunda-bark)]/15 pt-3.5">
                <dt class="font-medium">{{ tt('Current Status', '当前状态') }}</dt>
                <dd class="mt-2 text-[#a66c3d] font-semibold leading-[1.6]">
                  {{ statusText(profile.status) }}
                </dd>
              </div>
            </dl>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.surrogate-card-content {
  min-height: 18rem;
}

.surrogate-card-details > div:not(.surrogate-card-status) + div:not(.surrogate-card-status) {
  margin-top: 0.75rem;
}

.surrogate-card-status {
  min-height: 6.5rem;
}

@media (min-width: 1280px) {
  .surrogate-card-content {
    min-height: 18.5rem;
  }
}
</style>

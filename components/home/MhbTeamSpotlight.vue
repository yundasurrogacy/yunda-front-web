<script setup lang="ts">
import { computed } from 'vue'
import OptimizedPicture from '@/components/base/OptimizedPicture.vue'

const props = withDefaults(defineProps<{
  variant?: 'feature' | 'compact'
}>(), {
  variant: 'feature',
})

const OFFICIAL_EVENT_URL = 'https://menhavingbabies.org/surrogacy-seminars/ny/'

const { locale } = useI18n()
const localePath = useLocalePath()
const isZh = computed(() => locale.value === 'zh')
const isCompact = computed(() => props.variant === 'compact')
const eventPath = computed(() => localePath('/resources/mhb-new-york-2026'))

const copy = computed(() => isZh.value
  ? {
      eyebrow: 'MHB NEW YORK 2026 · 2026 年 9 月 25-27 日',
      title: '与孕达相约 MHB New York 2026',
      body: '孕达将以 Silver Sponsor 身份参与 Men Having Babies 纽约大会。会前先查看已核实的活动事实、准备问题与咨询路径。',
      dateLabel: '日期',
      dateValue: '2026 年 9 月 25-27 日',
      cityLabel: '城市',
      cityValue: '美国纽约',
      roleLabel: '孕达身份',
      roleValue: 'Silver Sponsor',
      guideCta: '查看活动指南',
      officialCta: '官方活动信息',
      imageAlt: '孕达参与过往 Men Having Babies 活动的照片',
      note: '展位号、到场团队和活动专属咨询安排仅在确认可公开后更新。',
    }
  : {
      eyebrow: 'MHB NEW YORK 2026 · SEPTEMBER 25-27',
      title: 'Join Yunda at MHB New York 2026',
      body: 'Yunda is participating as a Silver Sponsor at the Men Having Babies New York conference. Review verified event facts, planning questions, and consultation paths before you go.',
      dateLabel: 'Dates',
      dateValue: 'September 25-27, 2026',
      cityLabel: 'City',
      cityValue: 'New York, United States',
      roleLabel: 'Yunda role',
      roleValue: 'Silver Sponsor',
      guideCta: 'Explore the event guide',
      officialCta: 'Official event details',
      imageAlt: 'Yunda at a previous Men Having Babies event',
      note: 'Booth number, attending team members, and event consultation details will be updated only after confirmation for public use.',
    })
</script>

<template>
  <section
    id="mhb-event"
    class="scroll-mt-28"
    :class="isCompact
      ? 'bg-[color-mix(in_srgb,var(--yunda-sky)_32%,var(--yunda-petal)_68%)] py-10 lg:py-12'
      : 'bg-[var(--yunda-petal)] py-10 lg:py-12'"
  >
    <div class="mx-auto max-w-[1180px] px-6 md:px-10">
      <div class="grid overflow-hidden rounded-[10px] border border-[var(--yunda-bark)]/10 bg-white shadow-[0_10px_28px_rgba(60,36,21,0.08)] md:grid-cols-[0.72fr_1.28fr]">
        <OptimizedPicture
          src="/images/pages/about/mhb/mhb-1.jpg"
          :alt="copy.imageAlt"
          width="1200"
          height="1200"
          loading="lazy"
          picture-class="block h-full min-h-[220px]"
          img-class="h-full w-full object-cover"
        />

        <div
          class="bg-white p-6 sm:p-8 lg:p-10"
        >
          <p
            class="text-[10px] text-[var(--yunda-maple)] font-extrabold uppercase tracking-[0.14em]"
          >
            {{ copy.eyebrow }}
          </p>
          <h2 class="mt-3 font-display text-[28px] font-semibold leading-[1.06] sm:text-[30px] lg:text-[42px]">
            <template v-if="isZh">{{ copy.title }}</template>
            <template v-else>
              Join Yunda at <span class="whitespace-nowrap">MHB New York 2026</span>
            </template>
          </h2>
          <p
            class="mt-4 max-w-[62ch] text-sm text-[var(--yunda-bark)]/76 leading-[1.7]"
          >
            {{ copy.body }}
          </p>

          <dl class="mt-6 grid gap-3 sm:grid-cols-3">
            <div
              class="border border-[var(--yunda-bark)]/12 rounded-[6px] p-4"
            >
              <dt
                class="text-[10px] text-[var(--yunda-maple)] font-extrabold uppercase tracking-[0.12em]"
              >
                {{ copy.dateLabel }}
              </dt>
              <dd class="mt-2 text-sm font-bold leading-snug">{{ copy.dateValue }}</dd>
            </div>
            <div
              class="border border-[var(--yunda-bark)]/12 rounded-[6px] p-4"
            >
              <dt
                class="text-[10px] text-[var(--yunda-maple)] font-extrabold uppercase tracking-[0.12em]"
              >
                {{ copy.cityLabel }}
              </dt>
              <dd class="mt-2 text-sm font-bold leading-snug">{{ copy.cityValue }}</dd>
            </div>
            <div
              class="border border-[var(--yunda-bark)]/12 rounded-[6px] p-4"
            >
              <dt
                class="text-[10px] text-[var(--yunda-maple)] font-extrabold uppercase tracking-[0.12em]"
              >
                {{ copy.roleLabel }}
              </dt>
              <dd class="mt-2 text-sm font-bold leading-snug">{{ copy.roleValue }}</dd>
            </div>
          </dl>

          <div class="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <NuxtLink
              :to="eventPath"
              class="inline-flex min-h-11 items-center justify-center rounded-[8px] bg-[var(--yunda-maple)] px-5 py-3 text-sm text-white font-bold transition-transform hover:-translate-y-0.5 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--yunda-bark)]"
            >
              {{ copy.guideCta }}
            </NuxtLink>
            <a
              :href="OFFICIAL_EVENT_URL"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex min-h-11 items-center justify-center border-2 border-[var(--yunda-bark)] rounded-[8px] px-5 py-3 text-sm text-[var(--yunda-bark)] font-bold transition-colors hover:border-[var(--yunda-maple)] hover:text-[var(--yunda-maple)] focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-[var(--yunda-maple)]"
            >
              {{ copy.officialCta }}
            </a>
          </div>

          <p
            v-if="isCompact"
            class="mt-4 text-[11px] text-[var(--yunda-bark)]/55 leading-[1.55]"
          >
            {{ copy.note }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

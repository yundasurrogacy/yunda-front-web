<script setup lang="ts">
import OptimizedPicture from './OptimizedPicture.vue'

interface RelatedGuideLink {
  to: string
  title: string
  description: string
  image?: string
  category?: string
  date?: string
}

defineProps<{
  title: string
  intro?: string
  links: RelatedGuideLink[]
}>()

const { locale } = useI18n()
const localePath = useLocalePath()
const avifImageByPath: Record<string, string> = {
  '/images/benefit/redesign/hero.jpg': '/images/benefit/redesign/hero.avif',
  '/images/california-surrogacy-process.jpg': '/images/california-surrogacy-process.avif',
  '/images/landingpage3/Surrogate-Requirements.jpg': '/images/landingpage3/Surrogate-Requirements.avif',
}

function isBlogLink(link: RelatedGuideLink) {
  return link.to.startsWith('/blog/')
}

function getCtaText(link: RelatedGuideLink) {
  if (locale.value === 'zh')
    return isBlogLink(link) ? '阅读文章' : '查看指南'
  return isBlogLink(link) ? 'Read Article' : 'View Guide'
}

function getCategory(link: RelatedGuideLink) {
  if (link.category)
    return link.category

  const path = link.to.toLowerCase()
  if (path.includes('cost') || path.includes('compensation') || path.includes('pay') || path.includes('benefit'))
    return locale.value === 'zh' ? '费用与补偿' : 'Cost & Pay'
  if (path.includes('law') || path.includes('legal') || path.includes('protection') || path.includes('insurance') || path.includes('coverage'))
    return locale.value === 'zh' ? '法律与保障' : 'Legal & Protection'
  if (path.includes('process') || path.includes('journey') || path.includes('step') || path.includes('timeline'))
    return locale.value === 'zh' ? '流程指南' : 'Process Guide'
  if (path.includes('requirement') || path.includes('eligibility') || path.includes('screening') || path.includes('qualify'))
    return locale.value === 'zh' ? '资格与筛查' : 'Eligibility'
  if (path.includes('california'))
    return locale.value === 'zh' ? '加州指南' : 'California Guide'
  return locale.value === 'zh' ? '推荐阅读' : 'Recommended'
}

function getImage(link: RelatedGuideLink) {
  if (link.image)
    return link.image
  return '/images/blog-hero.jpg'
}

function getAvifImage(link: RelatedGuideLink) {
  return avifImageByPath[getImage(link)]
}

function getDate(link: RelatedGuideLink) {
  if (link.date)
    return link.date
  return ''
}
</script>

<template>
  <section class="bg-[var(--yunda-petal)] py-14 lg:py-18">
    <div class="mx-auto max-w-[1180px] px-6 lg:px-10">
      <div class="mx-auto max-w-3xl text-center">
        <h2 class="font-display text-[30px] font-semibold leading-tight text-[var(--yunda-bark)] lg:text-[38px]">
          {{ title }}
        </h2>
        <p v-if="intro" class="mt-3 text-[15px] text-[var(--yunda-bark)]/78 leading-7 lg:text-[17px]">
          {{ intro }}
        </p>
      </div>

      <div class="mt-9 grid gap-6 md:grid-cols-3">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="localePath(link.to)"
          class="group flex h-full overflow-hidden rounded-[30px] bg-white text-left shadow-[0_18px_42px_rgba(60,36,21,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(60,36,21,0.16)]"
        >
          <article class="flex h-full w-full flex-col">
            <div class="h-[220px] overflow-hidden bg-[var(--yunda-petal)] md:h-[190px] lg:h-[220px]">
              <OptimizedPicture
                :src="getImage(link)"
                :avif-src="getAvifImage(link)"
                :alt="link.title"
                :width="1200"
                :height="800"
                picture-class="contents"
                img-class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div class="flex flex-1 flex-col px-6 py-6 lg:px-7 lg:py-7">
              <div class="mb-4 flex flex-wrap items-center gap-3">
                <span class="rounded-full bg-[var(--yunda-petal)] px-4 py-2 text-[13px] font-semibold text-[var(--yunda-maple)]">
                  {{ getCategory(link) }}
                </span>
                <span v-if="getDate(link)" class="text-[14px] text-[var(--yunda-bark)]/72">
                  {{ getDate(link) }}
                </span>
              </div>

              <h3 class="line-clamp-2 font-display text-[25px] font-semibold leading-[1.16] text-[var(--yunda-bark)] lg:text-[30px]">
                {{ link.title }}
              </h3>
              <p class="line-clamp-3 mt-4 text-[16px] leading-[1.75] text-[var(--yunda-bark)]/82 lg:text-[17px]">
                {{ link.description }}
              </p>
              <span class="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--yunda-bark)] transition group-hover:text-[var(--yunda-maple)]">
                {{ getCtaText(link) }}
                <span class="text-[20px] leading-none transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            </div>
          </article>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

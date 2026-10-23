<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import OptimizedPicture from '@/components/base/OptimizedPicture.vue'
import { buildBreadcrumbListSchema, buildEventSchema, buildFAQPageSchema, buildWebPageSchema } from '~/utils/schema'

const PAGE_PATH = '/resources/asrm-2026'
const OFFICIAL_URL = 'https://asrmcongress.org/'
const ARCHIVE = Array.from({ length: 13 }, (_, index) => `/images/events/asrm-2026/asrm-${index + 1}.jpg`)
const { locale } = useI18n()
const localePath = useLocalePath()

const translations = {
  en: {
    title: 'Yunda Surrogacy at ASRM 2026 | Baltimore Conference Guide',
    description: 'Yunda Surrogacy is attending ASRM 2026 in Baltimore. Explore the official event details, conference themes, archive photos, and intended-parent resources.',
    eyebrow: 'OCT 24–28, 2026 · BALTIMORE',
    hero: 'Yunda Surrogacy at ASRM 2026',
    heroBody: 'Attending the conversation shaping reproductive medicine.',
    official: 'Official event details',
    consult: 'Plan a consultation',
    glance: 'Event at a glance',
    eventDescription: 'A professional meeting for clinical, research, and industry leaders in reproductive medicine.',
    facts: [
      ['Dates', 'October 24–28, 2026'],
      ['Location', 'Baltimore Convention Center'],
      ['Theme', 'Discovery · Innovation · Advancement'],
      ['Our role', 'Attending as an industry participant'],
    ],
    listening: 'What we are listening for',
    listeningLead: 'A closer look at the conversations behind care.',
    topics: [
      ['IVF and embryo planning', 'How families, IVF teams, and coordinators align decisions, timelines, and expectations.'],
      ['Surrogacy journey coordination', 'How each stage of the surrogacy process connects from planning through delivery.'],
      ['Clinic coordination', 'How information and responsibilities move between intended parents, clinics, and care teams.'],
      ['Legal, insurance, and professional handoffs', 'How families navigate the points where legal, insurance, medical, and coordination teams meet.'],
      ['Communication with international intended parents', 'How teams make complex planning clearer across languages, time zones, and different family-building contexts.'],
    ],
    whyTitle: 'Why Yunda Surrogacy is attending',
    whyBody: 'We are attending to understand where reproductive medicine is moving, take part in professional conversations, and bring back clearer answers to the questions intended parents ask most often.',
    questionsTitle: 'Questions intended parents can bring',
    questionsBody: 'ASRM 2026 is a chance to have meaningful conversations with fertility clinics, legal experts, and surrogacy professionals. These questions can help intended parents make the most of each conversation and move forward with confidence.',
    questions: [
      ['IVF and embryo planning', 'What protocols do you recommend, and how do you assess embryo quality for a surrogacy journey?'],
      ['Clinic coordination', 'How do you coordinate care with the surrogacy team and keep each party informed?'],
      ['Legal and insurance handoffs', 'Which legal steps, insurance questions, and professional handoffs should we prepare for?'],
      ['Communication', 'Who will be our main point of contact, and how often can we expect updates?'],
      ['Timing', 'What is a realistic timeline from consultation to embryo transfer, and what factors could affect it?'],
      ['First consultation', 'What should we prepare or bring to our first meeting to make it as productive as possible?'],
    ],
    archive: 'From the ASRM archive',
    archiveIntro: 'A look back at conversations, learning, and community from 2025.',
    archiveNote: 'Photos will be updated after ASRM 2026.',
    after: 'After ASRM 2026',
    afterLead: 'Returning with notes, questions, and new connections.',
    afterBody: 'This section will be updated with 2026 photos and reflections after the Congress.',
    faqTitle: 'Questions to carry forward',
    faqLead: 'Find quick answers about ASRM 2026 and how to stay informed on this page.',
    archiveLink: 'View all archive photos',
    faqs: [
      ['What is ASRM 2026?', 'ASRM 2026 Scientific Congress & Expo is a reproductive medicine congress held October 24–28, 2026, at the Baltimore Convention Center.'],
      ['Is Yunda Surrogacy exhibiting?', 'Yunda Surrogacy is attending as an industry participant. This page does not represent a booth, sponsorship, presentation, or exhibitor listing.'],
      ['Where can I find official event details?', 'Use the official ASRM Congress website for registration, program, venue, and meeting updates.'],
      ['What will Yunda Surrogacy share after ASRM 2026?', 'After the Congress, Yunda Surrogacy will share verified event photos, key discussion themes, and practical questions that may help intended parents prepare for conversations with medical, legal, insurance, and coordination professionals.'],
    ],
    faqLink: 'Browse intended-parent guides',
    cta: 'Turn conference questions into a clear next step',
    ctaBody: 'Bring your family structure, timing, and highest-priority questions to a private planning conversation.',
    ctaButton: 'Plan a private consultation',
    back: 'Return to resources',
    trust: 'Yunda Surrogacy provides education, coordination, and case-management support.',
    archiveLabel: 'ASRM 2025 ARCHIVE',
    breadcrumbs: ['Home', 'Resources', 'ASRM 2026'],
  },
  zh: {
    title: 'Yunda Surrogacy 参加 ASRM 2026｜巴尔的摩会议指南',
    description: 'Yunda Surrogacy 将参加 2026 年 ASRM 大会。本页整理官方活动信息、会议主题、往届照片与准父母资源。',
    eyebrow: '2026 年 10 月 24–28 日 · 巴尔的摩',
    hero: 'Yunda Surrogacy 参加 ASRM 2026',
    heroBody: '关注生殖医学领域的行业交流，以及清晰协调和知情家庭规划所需要的问题。',
    official: '查看官方活动信息',
    consult: '预约咨询',
    glance: '活动信息',
    eventDescription: 'ASRM 是面向生殖医学临床、研究和行业专业人士的专业会议。',
    facts: [['日期', '2026 年 10 月 24–28 日'], ['地点', 'Baltimore Convention Center'], ['主题', '发现 · 创新 · 进步'], ['参会身份', '行业参与者'],
    ],
    listening: '我们关注的交流议题',
    listeningLead: '从专业交流中继续理解照护背后的问题。',
    topics: [['IVF 与胚胎规划', '家庭、IVF 团队和协调人员如何衔接决策、时间线和预期。'], ['代孕流程衔接', '从前期规划到生产，代孕流程的每个阶段如何连接。'], ['诊所协调', '准父母、诊所和照护团队之间如何传递信息并明确职责。'], ['法律、保险与专业衔接', '法律、保险、医疗和协调团队在关键节点如何配合。'], ['国际准父母沟通', '如何跨越语言、时区和不同家庭建立背景，让复杂规划更清晰。']],
    whyTitle: 'Yunda Surrogacy 为什么参会',
    whyBody: '通过了解行业发展、参与专业交流，并整理准父母最关心的问题，把会议中的信息带回到更清晰的家庭规划沟通中。',
    questionsTitle: '准父母可以带去咨询的问题',
    questionsBody: 'ASRM 2026 是了解生殖医学和代孕专业交流的机会。下面的问题可以帮助准父母更充分地准备沟通，并更清晰地推进家庭规划。',
    questions: [['IVF 与胚胎规划', '建议采用哪些方案？怎样评估适合代孕流程的胚胎情况？'], ['诊所协调', '诊所如何与代孕协调团队配合，并让各方及时了解进展？'], ['法律与保险衔接', '需要提前准备哪些法律步骤、保险问题和专业团队衔接？'], ['沟通安排', '谁会是我们的主要联系人？整个流程中多久可以获得一次更新？'], ['时间安排', '从咨询到胚胎移植通常需要怎样的时间安排？哪些因素可能影响进度？'], ['第一次咨询', '第一次沟通前应该准备什么，才能让会议更有帮助？']],
    archive: 'ASRM 往届素材',
    archiveIntro: '回顾 2025 年的交流、学习与现场氛围。',
    archiveNote: '2026 年大会结束后更新现场照片。',
    after: 'ASRM 2026 会后更新',
    afterLead: '带着笔记、问题和新的交流回到工作中。',
    afterBody: '大会结束后，这里会补充经过核实的 2026 现场照片与参会记录。',
    faqTitle: '会后继续梳理的问题',
    faqLead: '快速了解 ASRM 2026，并继续获取页面后续更新。',
    archiveLink: '查看全部往届照片',
    faqs: [['ASRM 2026 是什么？', 'ASRM 2026 Scientific Congress & Expo 是面向生殖医学临床、研究和行业专业人士的会议，将于 2026 年 10 月 24–28 日举行。'], ['Yunda Surrogacy 会设展位吗？', 'Yunda Surrogacy 以行业参与者身份参会。本页不代表展位、赞助、演讲或展商登记。'], ['哪里可以查看官方信息？', '报名、议程、场地和会议更新请以 ASRM Congress 官方网站为准。'], ['ASRM 2026 结束后，Yunda Surrogacy 会分享什么？', '大会结束后，我们会分享经过核实的现场照片、重点交流议题，以及帮助准父母准备医疗、法律、保险和协调沟通的问题。']],
    faqLink: '浏览准父母指南',
    cta: '把会议问题整理成清晰的下一步',
    ctaBody: '带上家庭结构、时间安排和最优先的问题，开始一次私密规划沟通。',
    ctaButton: '预约私密咨询',
    back: '返回资源中心',
    trust: 'Yunda Surrogacy 提供教育、协调和个案管理支持。',
    archiveLabel: 'ASRM 2025 往届素材',
    breadcrumbs: ['首页', '资源中心', 'ASRM 2026'],
  },
}
const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)
const inLanguage = computed(() => locale.value === 'zh' ? 'zh-CN' : 'en-US')
const siteUrl = 'https://www.yundasurrogacy.com'
const pageSchema = computed(() => buildWebPageSchema({ baseUrl: siteUrl, url: PAGE_PATH, name: c.value.title, description: c.value.description, inLanguage: inLanguage.value, dateModified: '2026-10-21' }))
const breadcrumbSchema = computed(() => buildBreadcrumbListSchema({ baseUrl: siteUrl, inLanguage: inLanguage.value, items: [{ name: c.value.breadcrumbs[0], url: '/' }, { name: c.value.breadcrumbs[1], url: '/resources' }, { name: c.value.breadcrumbs[2], url: PAGE_PATH }] }))
const eventSchema = computed(() => buildEventSchema({ baseUrl: siteUrl, pageUrl: PAGE_PATH, name: 'ASRM 2026 Scientific Congress & Expo', description: 'ASRM 2026 Scientific Congress & Expo in Baltimore, Maryland.', startDate: '2026-10-24', endDate: '2026-10-28', eventStatus: 'scheduled', eventAttendanceMode: 'offline', officialUrl: OFFICIAL_URL, organizer: { name: 'American Society for Reproductive Medicine', url: 'https://www.asrm.org/' }, attendeeOrganization: { name: 'Yunda Surrogacy', id: `${siteUrl}/#organization`, url: siteUrl }, location: { name: 'Baltimore Convention Center', address: { streetAddress: '1 West Pratt St.', addressLocality: 'Baltimore', addressRegion: 'MD', postalCode: '21201', addressCountry: 'US' } }, image: ARCHIVE, inLanguage: inLanguage.value }))
const faqSchema = computed(() => buildFAQPageSchema({ baseUrl: siteUrl, url: PAGE_PATH, name: `${c.value.title} FAQ`, description: c.value.description, faqs: c.value.faqs.map(([question, answer]) => ({ question, answer })), inLanguage: inLanguage.value }))
useHead(() => ({ title: c.value.title, meta: [{ name: 'description', content: c.value.description }, { property: 'og:title', content: c.value.title }, { property: 'og:description', content: c.value.description }, { property: 'og:image', content: ARCHIVE[0] }], script: [pageSchema.value, eventSchema.value, breadcrumbSchema.value, faqSchema.value].map((schema, index) => ({ key: `schema-asrm-2026-${index}`, type: 'application/ld+json', children: JSON.stringify(schema) })) }))
</script>

<template>
  <div class="asrm-page min-h-screen overflow-x-clip bg-[#f5f0e8] text-[#351c12]">
    <AppHeader />
    <main>
      <section class="relative overflow-hidden px-6 py-12 lg:min-h-[clamp(700px,44vw,860px)] lg:px-10 lg:py-10 xl:px-12">
        <div class="mx-auto grid max-w-[1650px] items-center gap-8 lg:grid-cols-[1.1fr_.9fr] lg:gap-12">
          <div class="relative order-2 grid gap-4 lg:order-1 lg:grid-cols-[1.62fr_.76fr] lg:items-start lg:gap-0">
            <figure class="relative z-1 mt-10 w-[94%] rotate-[-2deg] lg:mt-16 lg:w-full">
              <OptimizedPicture :src="ARCHIVE[0]" :alt="`${c.archiveLabel}: ASRM 2025 photo`" width="1200" height="1200" loading="eager" fetchpriority="high" picture-class="block border-[12px] border-white shadow-xl" img-class="aspect-square w-full object-cover" />
              <figcaption class="mt-3 text-xs tracking-[.2em]">
                {{ c.archiveLabel }}
              </figcaption>
            </figure>
            <figure class="relative z-0 -ml-10 w-[92%] rotate-[3deg] lg:-ml-16 lg:mt-2 lg:w-[104%]">
              <OptimizedPicture :src="ARCHIVE[1]" :alt="`${c.archiveLabel}: Yunda Surrogacy archive photo`" width="1200" height="1200" loading="lazy" picture-class="block border-[10px] border-white shadow-lg" img-class="aspect-square w-full object-cover" />
              <figcaption class="mt-3 hidden text-xs tracking-[.2em]">
                {{ c.archiveLabel }}
              </figcaption>
            </figure>
          </div>
          <div class="relative z-1 order-1 pb-6 lg:order-2 lg:pl-2 lg:pr-24">
            <NuxtLink :to="localePath('/resources')" class="text-sm underline underline-offset-4">
              ← {{ c.back }}
            </NuxtLink>
            <p class="mt-10 text-xs text-[#1958ae] font-bold tracking-[.28em]">
              {{ c.eyebrow }}
            </p>
            <h1 class="asrm-hero-title mt-5 max-w-[820px] text-[46px] font-semibold leading-[.94] tracking-[-.04em] sm:text-[56px] lg:text-[68px] xl:text-[82px]">
              <span class="block">Yunda Surrogacy at</span>
              <span class="block text-[#bf5b35]">ASRM 2026</span>
            </h1>
            <p class="mt-7 max-w-[560px] text-base text-[#351c12]/75 leading-7 lg:text-lg">
              {{ c.heroBody }}
            </p>
            <div class="mt-8 flex flex-wrap gap-3 lg:mt-10">
              <a :href="OFFICIAL_URL" target="_blank" rel="noopener noreferrer" class="bg-[#bf5b35] px-6 py-4 text-sm text-white font-bold lg:px-7 lg:py-4">{{ c.official }} →</a>
              <NuxtLink :to="localePath('/be-parents')" class="border border-[#351c12] px-6 py-4 text-sm font-bold lg:px-7 lg:py-4">
                {{ c.consult }} →
              </NuxtLink>
            </div>
          </div>
        </div>
        <div class="pointer-events-none absolute right-7 top-1/2 hidden -translate-y-1/2 border-l border-[#351c12]/35 pl-7 text-center lg:block">
          <span class="block text-xs tracking-[.35em]">OCT</span>
          <span class="mt-5 block text-5xl font-display">24</span>
          <span class="my-4 block text-3xl text-[#bf5b35]">—</span>
          <span class="block text-5xl font-display">28</span>
          <span class="mt-6 block text-xs tracking-[.32em] [writing-mode:vertical-rl]">BALTIMORE</span>
        </div>
      </section>

      <section class="relative overflow-hidden bg-[#f5f0e8] px-6 py-16 lg:px-12 lg:py-24">
        <div class="relative mx-auto max-w-[1500px]">
          <div class="grid gap-10 xl:grid-cols-[.52fr_1fr_.6fr] xl:items-start xl:gap-12">
            <div class="pointer-events-none relative hidden min-h-[630px] select-none overflow-visible xl:block" aria-hidden="true">
              <div class="absolute left-[-8px] top-8 flex flex-col text-[175px] text-[#1958ae] font-display font-semibold leading-[.86]">
                <span>A</span>
                <span>S</span>
                <span>R</span>
                <span>M</span>
              </div>
            </div>
            <div class="relative z-1">
              <div>
                <div class="flex items-center gap-8">
                  <p class="text-xs text-[#bf5b35] font-bold tracking-[.3em]">
                    {{ c.glance }}
                  </p>
                  <span class="h-px flex-1 bg-[#351c12]/35" />
                </div>
                <h2 class="mt-8 text-[34px] font-semibold leading-[1.12] font-display sm:text-[38px] xl:text-[46px]">
                  ASRM 2026
                  <span class="mt-3 block text-[26px] sm:text-[30px] xl:text-[44px] xl:whitespace-nowrap">Scientific Congress &amp; Expo</span>
                </h2>
                <p class="mt-6 max-w-[760px] text-[17px] text-[#351c12]/70 leading-[1.9]">{{ c.eventDescription }}</p>
                <div class="mt-12 border-y border-[#351c12]/20 divide-y divide-[#351c12]/20">
                  <div v-for="(fact, index) in c.facts" :key="fact[0]" class="grid grid-cols-[72px_1fr] items-center gap-5 py-6">
                    <span class="grid h-14 w-14 place-items-center rounded-full bg-[#eadfd5] text-[#bf5b35]">
                      <Icon :name="['lucide:calendar-days', 'lucide:map-pin', 'lucide:book-open', 'lucide:users-round'][index]" class="h-7 w-7" aria-hidden="true" />
                    </span>
                    <div>
                      <span class="text-xs text-[#351c12] font-bold tracking-[.25em] uppercase">{{ fact[0] }}</span>
                      <span class="mt-2 block text-lg font-bold leading-snug">{{ fact[1] }}</span>
                    </div>
                  </div>
                </div>
                <a :href="OFFICIAL_URL" target="_blank" rel="noopener noreferrer" class="mt-10 inline-flex border border-[#bf5b35] px-8 py-4 text-xs text-[#bf5b35] font-bold tracking-[.22em] uppercase">{{ c.official }} →</a>
              </div>
            </div>
            <figure class="relative mt-2 border border-[#bf5b35] bg-[#bf5b35] xl:mt-14">
              <OptimizedPicture :src="ARCHIVE[7]" :alt="`${c.archiveLabel}: ASRM 2025 scientific session`" width="1200" height="1200" loading="lazy" img-class="aspect-[.82/1] w-full object-cover" />
              <figcaption class="flex items-center gap-5 px-5 py-3 text-sm text-white tracking-[.18em]">
                {{ c.archiveLabel }}
                <span class="h-px w-16 bg-white/75" />
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section class="bg-[#f5f0e8] px-6 py-20 lg:px-12 lg:py-28">
        <div class="mx-auto max-w-[1500px]">
          <div class="flex items-start justify-between gap-10">
            <div>
              <span class="block h-1 w-24 bg-[#1958ae]" />
              <h2 class="mt-8 text-[34px] font-semibold leading-tight font-display lg:text-[44px]">{{ c.archive }}</h2>
              <p class="mt-5 max-w-[980px] text-[17px] leading-[1.9] text-[#351c12]/85 lg:text-lg">{{ c.archiveIntro }}</p>
            </div>
            <p class="hidden max-w-[220px] border-l-2 border-[#1958ae] pl-6 pt-2 text-lg leading-snug lg:block">{{ c.archiveNote }}</p>
          </div>
          <p class="mt-6 border-l-2 border-[#1958ae] pl-4 text-base leading-snug lg:hidden">{{ c.archiveNote }}</p>
          <div class="mt-10 grid gap-4 lg:grid-cols-[1.58fr_1fr]">
            <figure class="border border-[#bf5b35] bg-[#bf5b35]">
              <OptimizedPicture :src="ARCHIVE[2]" :alt="`${c.archiveLabel}: ASRM 2025 exhibit floor`" width="1200" height="1200" loading="lazy" img-class="aspect-[1.32/1] w-full object-cover" />
              <figcaption class="flex items-center gap-7 px-5 py-3 text-sm text-white tracking-[.18em]">{{ c.archiveLabel }}<span class="h-px w-20 bg-white/75" /></figcaption>
            </figure>
            <div class="grid gap-4">
              <figure class="border border-[#bf5b35] bg-[#bf5b35]">
                <OptimizedPicture :src="ARCHIVE[5]" :alt="`${c.archiveLabel}: Yunda Surrogacy team`" width="1200" height="1200" loading="lazy" img-class="aspect-[1.72/1] w-full object-cover" />
                <figcaption class="flex items-center gap-7 px-5 py-3 text-sm text-white tracking-[.18em]">{{ c.archiveLabel }}<span class="h-px w-20 bg-white/75" /></figcaption>
              </figure>
              <figure class="border border-[#bf5b35] bg-[#bf5b35]">
                <OptimizedPicture :src="ARCHIVE[10]" :alt="`${c.archiveLabel}: Yunda Surrogacy materials`" width="1200" height="1200" loading="lazy" img-class="aspect-[1.72/1] w-full object-cover" />
                <figcaption class="flex items-center gap-7 px-5 py-3 text-sm text-white tracking-[.18em]">{{ c.archiveLabel }}<span class="h-px w-20 bg-white/75" /></figcaption>
              </figure>
            </div>
          </div>
          <div class="mt-8 flex flex-wrap items-center justify-between gap-6 text-[#1958ae]">
            <div class="flex flex-1 items-center justify-center gap-4">
              <span class="grid h-14 w-14 place-items-center rounded-full border border-[#bf5b35] text-3xl">‹</span>
              <span class="h-3 w-3 rounded-full bg-[#1958ae]" /><span class="h-3 w-3 rounded-full bg-[#bf5b35]/25" /><span class="h-3 w-3 rounded-full bg-[#bf5b35]/25" /><span class="h-3 w-3 rounded-full bg-[#bf5b35]/25" />
              <span class="grid h-14 w-14 place-items-center rounded-full border border-[#bf5b35] text-3xl">›</span>
            </div>
            <NuxtLink :to="localePath('/resources')" class="text-xl underline decoration-[#1958ae] underline-offset-8">{{ c.archiveLink }} →</NuxtLink>
          </div>
        </div>
      </section>

      <section class="relative overflow-hidden bg-[#351c12] px-6 py-20 text-[#f5f0e8] lg:px-12 lg:py-28">
        <div class="pointer-events-none absolute -left-28 bottom-[-18rem] h-[34rem] w-[34rem] rounded-full bg-[#bf5b35]/15" aria-hidden="true" />
        <div class="relative mx-auto grid max-w-[1500px] gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div>
            <div class="flex items-center gap-7 text-sm text-[#d97850] font-bold tracking-[.28em] uppercase"><span class="h-px w-20 bg-[#d97850]" />{{ c.listening }}</div>
            <h2 class="mt-10 max-w-[760px] text-[34px] font-semibold leading-tight font-display lg:text-[44px]">{{ c.listeningLead }}</h2>
            <div class="mt-8 max-w-[680px] border-l-2 border-[#d97850] pl-6">
              <h3 class="text-[24px] font-semibold leading-snug font-display">{{ c.whyTitle }}</h3>
              <p class="mt-3 text-[15px] text-white/75 leading-[1.75]">{{ c.whyBody }}</p>
            </div>
            <figure class="mt-10 max-w-[620px] border border-[#d97850] bg-[#d97850]">
              <OptimizedPicture :src="ARCHIVE[9]" :alt="`${c.archiveLabel}: ASRM 2025 session`" width="1200" height="1200" loading="lazy" img-class="aspect-[1.55/1] w-full object-cover" />
              <figcaption class="flex items-center gap-7 px-5 py-3 text-sm text-[#351c12] tracking-[.22em]">{{ c.archiveLabel }}<span class="h-px w-20 bg-[#351c12]/60" /></figcaption>
            </figure>
          </div>
          <div class="relative border-l-2 border-[#1958ae] pl-14 lg:pt-2">
            <div v-for="(topic, index) in c.topics" :key="topic[0]" class="relative pb-14 last:pb-0">
              <span class="absolute -left-[4.4rem] top-0 grid h-16 w-16 place-items-center rounded-full bg-[#bf5b35] text-lg font-display">0{{ index + 1 }}</span>
              <div class="flex items-start gap-6">
                <Icon :name="['lucide:flask-conical', 'lucide:route', 'lucide:building-2', 'lucide:scale', 'lucide:languages'][index]" class="mt-1 h-12 w-12 shrink-0 text-[#d97850]" aria-hidden="true" />
                <div>
                  <h3 class="text-[24px] font-semibold leading-snug font-display lg:text-[30px]">{{ topic[0] }}</h3>
                  <span class="mt-5 block h-px w-16 bg-[#d97850]" />
                  <p class="mt-5 text-[15px] text-white/75 leading-[1.75]">{{ topic[1] }}</p>
                </div>
              </div>
            </div>
            <NuxtLink :to="localePath('/intended-parents')" class="mt-10 inline-flex text-xl underline decoration-[#d97850] underline-offset-8">Explore intended-parent resources →</NuxtLink>
          </div>
        </div>
      </section>

      <section class="bg-[#f5f0e8] px-6 py-16 lg:px-12 lg:py-24">
        <div class="mx-auto grid max-w-[1500px] gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <span class="block h-1 w-24 bg-[#1958ae]" />
            <h2 class="mt-8 text-[34px] font-semibold leading-tight font-display lg:text-[44px]">{{ c.questionsTitle }}</h2>
            <p class="mt-7 max-w-[520px] text-lg text-[#351c12]/70 leading-8">{{ c.questionsBody }}</p>
          </div>
          <div class="border-y border-[#1958ae] divide-y divide-[#1958ae]">
            <div v-for="(question, index) in c.questions" :key="question[0]" class="grid gap-4 px-1 py-6 sm:grid-cols-[76px_1fr] sm:gap-7 lg:py-7">
              <span class="border-r border-[#1958ae] pr-6 text-4xl text-[#bf5b35] leading-none font-display">0{{ index + 1 }}</span>
              <div>
                <h3 class="text-xl text-[#1958ae] font-semibold leading-tight font-display lg:text-2xl">{{ question[0] }}</h3>
                <p class="mt-2 max-w-[760px] text-base text-[#1958ae]/80 leading-7 lg:text-lg">{{ question[1] }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative overflow-hidden bg-[#1958ae] px-6 py-16 lg:px-12 lg:py-24">
        <div class="relative mx-auto max-w-[1500px] rounded-[28px] bg-[#f5f0e8] px-7 py-10 lg:px-20 lg:py-14">
          <div class="grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
            <div>
              <div class="flex items-center gap-7 text-xs text-[#bf5b35] font-bold tracking-[.28em] uppercase">
                <span class="h-px w-20 bg-[#bf5b35]" />
                {{ c.after }}
              </div>
              <h2 class="mt-10 max-w-[700px] text-[34px] font-semibold leading-tight font-display lg:text-[46px]">{{ c.afterLead }}</h2>
              <p class="mt-8 max-w-[600px] text-base text-[#351c12]/70 leading-relaxed lg:text-lg">{{ c.afterBody }}</p>
              <a :href="OFFICIAL_URL" target="_blank" rel="noopener noreferrer" class="mt-10 inline-flex text-xl underline decoration-[#bf5b35] underline-offset-8">Read the post-event recap →</a>
            </div>
            <div class="border-l border-[#bf5b35] pl-8 lg:pl-12">
              <div class="border border-[#bf5b35] p-2">
                <div class="grid aspect-[1.8/1] place-items-center bg-[#e9e3da] text-sm text-[#351c12]/40">2026 FIELD NOTES / UPDATE AFTER OCT 28</div>
              </div>
              <div class="mt-8 divide-y divide-[#351c12]/20">
                <div v-for="label in ['SESSIONS ATTENDED', 'CONVERSATIONS', 'RESOURCES TO SHARE']" :key="label" class="flex items-center justify-between py-5 text-sm font-bold tracking-[.22em]">
                  <span>{{ label }}</span><span class="h-px w-12 bg-[#351c12]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-[#f5f0e8] px-6 py-16 lg:px-12 lg:py-24">
        <div class="mx-auto max-w-[1500px]">
          <div class="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:gap-20">
            <div>
              <p class="text-xs text-[#bf5b35] font-bold tracking-[.3em]">YUNDA SURROGACY</p>
              <h2 class="mt-8 text-[34px] font-semibold leading-tight font-display lg:text-[44px]">
                {{ c.faqTitle }}
              </h2>
              <p class="mt-8 max-w-[420px] text-lg leading-8 text-[#351c12]/70">{{ c.faqLead }}</p>
              <NuxtLink :to="localePath('/intended-parents')" class="mt-8 inline-flex border border-[#1958ae] px-5 py-4 text-xs text-[#1958ae] font-bold tracking-[.15em] uppercase">
                {{ c.faqLink }} →
              </NuxtLink>
            </div>
            <div class="border-y border-[#1958ae] divide-y divide-[#1958ae]">
              <details v-for="item in c.faqs" :key="item[0]" class="group py-5">
                <summary class="flex cursor-pointer list-none justify-between gap-5 text-base font-bold leading-snug lg:text-lg">
                  {{ item[0] }}
                  <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 border-[#1958ae] text-2xl text-[#1958ae]">+</span>
                </summary>
                <p class="pt-4 text-sm text-[#351c12]/70 leading-7">
                  {{ item[1] }}
                </p>
              </details>
            </div>
          </div>
          <div class="mt-14 border-t border-[#1958ae] pt-5">
            <div class="flex items-center gap-5 text-xs text-[#1958ae] font-bold tracking-[.3em]">{{ c.archiveLabel }}<span class="h-px flex-1 bg-[#1958ae]" /></div>
            <div class="mt-5 grid gap-5 md:grid-cols-3">
              <OptimizedPicture v-for="image in [ARCHIVE[7], ARCHIVE[12], ARCHIVE[9]]" :key="image" :src="image" :alt="`${c.archiveLabel}: ASRM 2025 archive`" width="1200" height="1200" loading="lazy" img-class="aspect-[4/3] w-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section class="bg-[#351c12] px-6 py-20 text-[#f5f0e8] lg:px-12 lg:py-28">
        <div class="mx-auto grid max-w-[1500px] items-center gap-14 lg:grid-cols-[1fr_.9fr]">
          <div>
            <h2 class="max-w-[820px] text-[42px] font-semibold leading-[1.02] tracking-[-.035em] font-display lg:text-[46px]">
              {{ c.cta }}
            </h2>
            <span class="mt-10 block h-1 w-36 bg-[#1958ae]" />
            <p class="mt-7 max-w-[650px] text-base text-white/80 leading-relaxed lg:text-lg">
              {{ c.ctaBody }}
            </p>
            <NuxtLink :to="localePath('/be-parents')" class="mt-8 inline-flex rounded-[10px] bg-[#d95e35] px-7 py-3 text-sm text-white font-bold">
              {{ c.ctaButton }} →
            </NuxtLink>
            <p class="mt-8 text-sm text-white/70 leading-6">
              {{ c.trust }}
            </p>
          </div>
          <div class="relative min-h-[420px]">
            <figure class="absolute right-0 top-0 w-[68%] rotate-[4deg] border-[10px] border-white bg-white p-1 shadow-2xl">
              <OptimizedPicture :src="ARCHIVE[1]" :alt="`${c.archiveLabel}: Yunda Surrogacy archive photo`" width="1200" height="1200" loading="lazy" img-class="aspect-square w-full object-cover" />
            </figure>
            <figure class="absolute bottom-0 left-4 z-1 w-[52%] -rotate-[5deg] border-[10px] border-white bg-white p-1 shadow-2xl">
              <OptimizedPicture :src="ARCHIVE[5]" :alt="`${c.archiveLabel}: Yunda Surrogacy archive photo`" width="1200" height="1200" loading="lazy" img-class="aspect-square w-full object-cover" />
              <figcaption class="px-3 py-2 text-xs text-[#351c12] tracking-[.22em]">{{ c.archiveLabel }}</figcaption>
            </figure>
          </div>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.asrm-hero-title {
  font-family: 'Cormorant', serif;
  font-weight: 600;
  font-variant-ligatures: common-ligatures;
}
</style>

<script setup lang="ts">
/**
 * 改版说明：`修改/2026-06-05/Resources & Media Center 页面/Resources & Media Center 页面排版.docx`
 * 独立页面 `/resources`；`/blog` 保持原博客列表不变。
 */
import type { ResourcesInstagramResponse } from '~/server/utils/resources-instagram-types'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import BlogNewsSection from '@/components/home/BlogNewsSection.vue'
import { RESOURCES_INSTAGRAM_POSTS } from '~/utils/resources-instagram-posts'
import { getSubstackFallbackImage, normalizeSubstackPostUrl } from '~/utils/resources-substack-posts'

definePageMeta({ ssr: false })

const PAGE_ASSETS = {
  hero: '/images/resources-media/hero.webp',
} as const

const SUBSTACK_HOME = 'https://yundasurrogacy.substack.com/'
const INSTAGRAM_HOME = 'https://www.instagram.com/yunda_surrogacy_/'

interface SubstackPostConfig {
  title: string
  excerpt: string
  url: string
  kind: 'article' | 'channel'
}

interface SubstackCard {
  title: string
  excerpt: string
  url: string
  image: string
}

interface IgPostCard {
  id: string
  url: string
  alt: string
  image: string
  likes: number | null
  comments: number | null
}

interface LocaleBlock {
  metaTitle: string
  metaDescription: string
  heroTitle: string
  heroAlt: string
  surrogacyBlogTitle: string
  substackTitle: string
  substackIntro: string
  substackCta: string
  substackPosts: SubstackPostConfig[]
  substackReadOn: string
  updatesTitle: string
  updatesIntro: string
  eventsTitle: string
  eventsIntro: string
  followSocial: string
  igViewPost: string
  ctaTitle: string
  ctaBody: string
  ctaParents: string
  ctaSurrogate: string
  ctaEgg: string
}

const translations: Record<'en' | 'zh', LocaleBlock> = {
  en: {
    metaTitle: 'Resources & Media Center | Yunda Surrogacy',
    metaDescription:
      'Explore Yunda Surrogacy resources: surrogacy blog articles, Surrogate 101 on Substack, surrogate journey updates, events, and ways to connect with our team.',
    heroTitle: 'Resources & Media Center',
    heroAlt: 'Yunda Surrogacy resources and media',
    surrogacyBlogTitle: 'Surrogacy Blog',
    substackTitle: 'Surrogate 101 Substack',
    substackIntro:
      'We’ll continue sharing honest answers, behind-the-scenes insights, and guidance for women exploring the surrogacy journey.',
    substackCta: 'Visit Substack',
    substackReadOn: 'Read on Substack',
    substackPosts: [
      {
        kind: 'article',
        title: 'Yunda Surrogate 101: Common Questions, Fears, and Misunderstandings About Surrogacy',
        excerpt: 'Why we ask so many intake questions—and how gestational surrogacy, legal protections, and matching preferences really work.',
        url: 'https://yundasurrogacy.substack.com/p/yunda-surrogate-101-common-questions',
      },
      {
        kind: 'article',
        title: 'Yunda Surrogate 101: What Does It Really Mean to “Qualify” as a Surrogate?',
        excerpt: 'A plain-language look at medical, legal, and lifestyle factors that shape surrogate eligibility.',
        url: 'https://yundasurrogacy.substack.com/p/yunda-surrogate-101-what-does-it',
      },
      {
        kind: 'channel',
        title: 'More stories & support on Substack',
        excerpt: 'Read the latest updates from our team and subscribe for new posts.',
        url: SUBSTACK_HOME,
      },
    ],
    updatesTitle: 'Surrogates Updates',
    updatesIntro:
      'Follow our surrogates through checkups, appointments, and special milestones as each journey moves forward.',
    eventsTitle: 'Events',
    eventsIntro:
      'Explore Yunda’s latest events, conferences, webinars, and community moments in the surrogacy field.',
    followSocial: 'Follow us on Instagram',
    igViewPost: 'View on Instagram',
    ctaTitle: 'Start Your Surrogacy Journey with Care, Clarity, and Support',
    ctaBody:
      'At Yunda Surrogacy, we listen first, understand your needs, and guide you through each step with professionalism, transparency, and compassion. Our team is here to help you move forward with confidence.',
    ctaParents: 'Start as Intended Parents',
    ctaSurrogate: 'Apply to Be a Surrogate',
    ctaEgg: 'Explore Egg Donation',
  },
  zh: {
    metaTitle: '资源与媒体中心 | Yunda 代孕',
    metaDescription:
      '浏览 Yunda 代孕资源：代孕博客、Substack 代孕 101、代孕妈妈动态、活动资讯，以及联系我们的方式。',
    heroTitle: '资源与媒体中心',
    heroAlt: 'Yunda 代孕资源与媒体',
    surrogacyBlogTitle: '代孕博客',
    substackTitle: 'Surrogate 101 Substack',
    substackIntro:
      '我们将持续分享真实解答、幕后见闻，以及为正在了解代孕的女性提供的指引。',
    substackCta: '前往 Substack',
    substackReadOn: '在 Substack 阅读',
    substackPosts: [
      {
        kind: 'article',
        title: 'Yunda 代孕 101：关于代孕的常见问题、顾虑与误解',
        excerpt: '为什么我们问这么多初筛问题——以及妊娠代孕、法律保障与匹配偏好如何运作。',
        url: 'https://yundasurrogacy.substack.com/p/yunda-surrogate-101-common-questions',
      },
      {
        kind: 'article',
        title: 'Yunda 代孕 101：“符合代孕资格”究竟意味着什么？',
        excerpt: '用通俗语言说明影响代孕资格的医疗、法律与生活方式因素。',
        url: 'https://yundasurrogacy.substack.com/p/yunda-surrogate-101-what-does-it',
      },
      {
        kind: 'channel',
        title: '在 Substack 阅读更多',
        excerpt: '查看团队最新文章并订阅更新。',
        url: SUBSTACK_HOME,
      },
    ],
    updatesTitle: '代孕妈妈动态',
    updatesIntro: '跟随代孕妈妈的产检、预约与重要里程碑，了解每一段旅程的进展。',
    eventsTitle: '活动',
    eventsIntro: '了解 Yunda 在代孕领域的最新活动、会议、线上分享与社区瞬间。',
    followSocial: '关注我们的 Instagram',
    igViewPost: '在 Instagram 查看',
    ctaTitle: '以关怀、清晰与支持，开启你的代孕之旅',
    ctaBody:
      '在 Yunda，我们先倾听、理解你的需求，再以专业、透明与温暖陪伴你走过每一步。我们的团队助你自信前行。',
    ctaParents: '成为准父母',
    ctaSurrogate: '申请成为代孕妈妈',
    ctaEgg: '了解捐卵',
  },
}

const IG_ALTS: Record<string, string> = {
  u1: 'Surrogate update 1',
  u2: 'Surrogate update 2',
  u3: 'Surrogate update 3',
  u4: 'Surrogate update 4',
  e1: 'Yunda event 1',
  e2: 'Yunda event 2',
  e3: 'Yunda event 3',
  e4: 'Yunda event 4',
}

function buildInstagramCards(section: 'updates' | 'events'): IgPostCard[] {
  return RESOURCES_INSTAGRAM_POSTS
    .filter(post => post.section === section)
    .map(post => ({
      id: post.id,
      url: post.url,
      image: post.fallbackImage,
      alt: IG_ALTS[post.id] || post.id,
      likes: post.fallbackLikes,
      comments: post.fallbackComments,
    }))
}

const SURROGATE_UPDATES_BASE = buildInstagramCards('updates')
const EVENT_POSTS_BASE = buildInstagramCards('events')

const { data: igFeed } = useFetch<ResourcesInstagramResponse>('/api/resources/instagram', {
  lazy: true,
})

function mergeInstagramCards(baseCards: IgPostCard[]): IgPostCard[] {
  const livePosts = [...(igFeed.value?.updates ?? []), ...(igFeed.value?.events ?? [])]

  return baseCards.map((card) => {
    const live = livePosts.find(item => item.id === card.id)
    if (!live)
      return card

    return {
      ...card,
      url: live.url,
      likes: live.likes ?? card.likes,
      comments: live.comments ?? card.comments,
    }
  })
}

const { locale } = useI18n()

const surrogateUpdateCards = computed(() => mergeInstagramCards(SURROGATE_UPDATES_BASE))
const eventPostCards = computed(() => mergeInstagramCards(EVENT_POSTS_BASE))

function formatIgCount(value: number | null) {
  if (value == null)
    return '—'

  return value.toLocaleString(locale.value === 'zh' ? 'zh-CN' : 'en-US')
}
const localePath = useLocalePath()

const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)

const substackCards = computed<SubstackCard[]>(() =>
  c.value.substackPosts.map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    url: post.url,
    image: getSubstackFallbackImage(post.url),
  })),
)

/** 第一屏分区导航（对照 docx 稿四色 Tab） */
const sectionNav = computed(() => [
  {
    id: 'surrogacy-blog',
    label: c.value.surrogacyBlogTitle,
    className: 'bg-[color-mix(in_srgb,var(--yunda-harvest)_55%,var(--yunda-petal)_45%)] text-[var(--yunda-bark)]',
  },
  {
    id: 'substack',
    label: c.value.substackTitle,
    className: 'bg-[var(--yunda-maple)] text-[var(--yunda-petal)]',
  },
  {
    id: 'surrogates-updates',
    label: c.value.updatesTitle,
    className: 'bg-[var(--yunda-sky)] text-[var(--yunda-bark)]',
  },
  {
    id: 'events',
    label: c.value.eventsTitle,
    className: 'bg-[var(--yunda-bark)] text-[var(--yunda-petal)]',
  },
])

useHead(() => ({
  title: c.value.metaTitle,
  meta: [{ name: 'description', content: c.value.metaDescription }],
  link: [{ rel: 'preload', as: 'image', href: PAGE_ASSETS.hero, fetchpriority: 'high' }],
}))
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />

    <main>
      <!-- 第一屏：左 Sage 底 + 标题；右侧宝宝图渐变融入（非左右对半分栏） -->
      <section class="w-full bg-white">
        <div class="resources-hero relative isolate min-h-[min(52vw,320px)] w-full overflow-hidden bg-[var(--yunda-sky)] sm:min-h-[300px] lg:min-h-[360px] xl:min-h-[400px]">
          <img
            :src="PAGE_ASSETS.hero"
            alt=""
            aria-hidden="true"
            class="resources-hero-photo pointer-events-none absolute inset-0 h-full w-full object-cover object-[72%_42%] sm:object-[78%_40%] lg:object-[right_center]"
            loading="eager"
            fetchpriority="high"
          >
          <div
            aria-hidden="true"
            class="resources-hero-fade pointer-events-none absolute inset-0"
          />
          <div class="relative z-10 mx-auto flex h-full min-h-[inherit] max-w-[1920px] items-center px-6 py-12 sm:px-10 lg:px-14 lg:py-14 xl:px-20">
            <h1 class="max-w-[min(100%,640px)] text-left font-display text-[34px] font-semibold leading-[1.08] sm:text-[40px] lg:text-[48px] xl:text-[52px]">
              <span class="sr-only">{{ c.heroAlt }} — </span>
              {{ c.heroTitle }}
            </h1>
          </div>
        </div>

        <nav
          class="grid w-full grid-cols-2 lg:grid-cols-4"
          aria-label="Resources sections"
        >
          <a
            v-for="item in sectionNav"
            :key="item.id"
            :href="`#${item.id}`"
            class="flex min-h-[52px] items-center justify-center px-3 py-3.5 text-center font-display text-[13px] font-semibold leading-snug transition-opacity hover:opacity-90 sm:min-h-[56px] sm:text-[15px] lg:text-[17px]"
            :class="item.className"
          >
            {{ item.label }}
          </a>
        </nav>
      </section>

      <!-- Surrogacy Blog：与首页 BlogNewsSection 一致（含分类筛选） -->
      <div id="surrogacy-blog" class="scroll-mt-28">
        <BlogNewsSection />
      </div>

      <section id="substack" class="scroll-mt-28 w-full bg-white py-14 lg:py-20">
        <div class="mx-auto max-w-[1320px] px-6 lg:px-10">
          <h2 class="font-display text-[30px] font-semibold leading-[1.12] lg:text-[36px]">
            {{ c.substackTitle }}
          </h2>
          <p class="mt-5 max-w-3xl text-base text-[var(--yunda-bark)]/88 leading-[1.8] lg:text-[17px]" style="font-family: var(--font-text)">
            {{ c.substackIntro }}
          </p>
          <div class="mt-10 grid gap-6 lg:grid-cols-3">
            <a
              v-for="post in substackCards"
              :key="`substack-${normalizeSubstackPostUrl(post.url)}`"
              :href="post.url"
              target="_blank"
              rel="noopener noreferrer"
              class="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#ebe4d8] bg-[#faf8f5] shadow-[0_6px_24px_rgba(55,40,25,0.05)] transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_12px_36px_rgba(55,40,25,0.1)]"
            >
              <div class="relative aspect-[16/10] overflow-hidden bg-[var(--yunda-petal)]">
                <img
                  :src="post.image"
                  :alt="post.title"
                  class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                  decoding="async"
                >
                <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/18 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div class="flex flex-1 flex-col p-5">
                <h3 class="font-sans text-[18px] font-bold leading-snug transition-colors group-hover:text-[var(--yunda-maple)] lg:text-[20px]" style="font-family: var(--font-text)">
                  {{ post.title }}
                </h3>
                <p class="mt-3 flex-1 text-sm text-[var(--yunda-bark)]/85 leading-[1.75]" style="font-family: var(--font-text)">
                  {{ post.excerpt }}
                </p>
                <p class="mt-4 inline-flex items-center gap-1.5 text-sm text-[var(--yunda-maple)] font-semibold" style="font-family: var(--font-text)">
                  {{ c.substackReadOn }}
                  <span aria-hidden="true" class="transition-transform duration-200 group-hover:translate-x-0.5">→</span>
                </p>
              </div>
            </a>
          </div>
          <a
            :href="SUBSTACK_HOME"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-8 inline-flex items-center justify-center rounded-[6px] border-2 border-[var(--yunda-bark)] bg-white px-6 py-3 text-sm text-[var(--yunda-bark)] font-semibold tracking-[0.02em] transition-colors hover:border-[var(--yunda-maple)]"
            style="font-family: var(--font-text)"
          >
            {{ c.substackCta }}
          </a>
        </div>
      </section>

      <section class="w-full bg-[color-mix(in_srgb,var(--yunda-petal)_90%,var(--yunda-sky)_10%)] py-14 lg:py-20">
        <div class="mx-auto max-w-[1320px] space-y-14 px-6 lg:px-10">
          <div id="surrogates-updates" class="scroll-mt-28">
            <h2 class="font-display text-[30px] font-semibold leading-[1.12] lg:text-[36px]">
              {{ c.updatesTitle }}
            </h2>
            <p class="mt-4 max-w-3xl text-base text-[var(--yunda-bark)]/88 leading-[1.8] lg:text-[17px]" style="font-family: var(--font-text)">
              {{ c.updatesIntro }}
            </p>
            <div class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
              <a
                v-for="post in surrogateUpdateCards"
                :key="post.id"
                :href="post.url"
                target="_blank"
                rel="noopener noreferrer"
                class="resources-ig-card group relative block overflow-hidden rounded-2xl bg-[var(--yunda-petal)] shadow-[0_6px_22px_rgba(55,40,25,0.06)] ring-1 ring-[#ebe4d8]/80 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(55,40,25,0.12)]"
                :aria-label="`${c.igViewPost}: ${post.alt}`"
              >
                <img
                  :src="post.image"
                  :alt="post.alt"
                  class="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                >
                <div
                  class="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/78 via-black/45 to-transparent px-3 pt-10 pb-3 text-xs text-white sm:text-sm"
                  style="font-family: var(--font-text)"
                >
                  <div class="flex items-center gap-3 font-semibold">
                    <span class="inline-flex items-center gap-1.5">
                      <Icon name="radix-icons:heart-filled" class="h-3.5 w-3.5 shrink-0" />
                      {{ formatIgCount(post.likes) }}
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                      <Icon name="radix-icons:chat-bubble" class="h-3.5 w-3.5 shrink-0" />
                      {{ formatIgCount(post.comments) }}
                    </span>
                  </div>
                  <span class="font-semibold opacity-90">{{ c.igViewPost }}</span>
                </div>
              </a>
            </div>
          </div>

          <div id="events" class="scroll-mt-28">
            <h2 class="font-display text-[30px] font-semibold leading-[1.12] lg:text-[36px]">
              {{ c.eventsTitle }}
            </h2>
            <p class="mt-4 max-w-3xl text-base text-[var(--yunda-bark)]/88 leading-[1.8] lg:text-[17px]" style="font-family: var(--font-text)">
              {{ c.eventsIntro }}
            </p>
            <div class="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
              <a
                v-for="post in eventPostCards"
                :key="post.id"
                :href="post.url"
                target="_blank"
                rel="noopener noreferrer"
                class="resources-ig-card group relative block overflow-hidden rounded-2xl bg-[var(--yunda-petal)] shadow-[0_6px_22px_rgba(55,40,25,0.06)] ring-1 ring-[#ebe4d8]/80 transition-[box-shadow,transform] hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(55,40,25,0.12)]"
                :aria-label="`${c.igViewPost}: ${post.alt}`"
              >
                <img
                  :src="post.image"
                  :alt="post.alt"
                  class="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]"
                  loading="lazy"
                  decoding="async"
                >
                <div
                  class="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/78 via-black/45 to-transparent px-3 pt-10 pb-3 text-xs text-white sm:text-sm"
                  style="font-family: var(--font-text)"
                >
                  <div class="flex items-center gap-3 font-semibold">
                    <span class="inline-flex items-center gap-1.5">
                      <Icon name="radix-icons:heart-filled" class="h-3.5 w-3.5 shrink-0" />
                      {{ formatIgCount(post.likes) }}
                    </span>
                    <span class="inline-flex items-center gap-1.5">
                      <Icon name="radix-icons:chat-bubble" class="h-3.5 w-3.5 shrink-0" />
                      {{ formatIgCount(post.comments) }}
                    </span>
                  </div>
                  <span class="font-semibold opacity-90">{{ c.igViewPost }}</span>
                </div>
              </a>
            </div>
          </div>

          <a
            :href="INSTAGRAM_HOME"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 text-base text-[var(--yunda-maple)] font-semibold underline underline-offset-4 transition-colors hover:text-[var(--yunda-bark)]"
            style="font-family: var(--font-text)"
          >
            {{ c.followSocial }}
          </a>
        </div>
      </section>

      <section class="w-full bg-white py-14 lg:py-20">
        <div class="mx-auto max-w-[960px] px-6 text-center lg:px-10">
          <h2 class="font-display text-[30px] font-semibold leading-[1.15] lg:text-[36px]">
            {{ c.ctaTitle }}
          </h2>
          <p class="mx-auto mt-5 max-w-3xl text-base text-[var(--yunda-bark)]/88 leading-[1.8] lg:text-[17px]" style="font-family: var(--font-text)">
            {{ c.ctaBody }}
          </p>
          <p class="mx-auto mt-4 max-w-3xl text-base text-[var(--yunda-bark)]/88 leading-[1.8] lg:text-[17px]" style="font-family: var(--font-text)">
            <template v-if="locale === 'zh'">
              欢迎致电
              <a href="https://wa.me/+16265638656" class="text-[var(--yunda-maple)] underline underline-offset-2 hover:text-[var(--yunda-bark)]">+1 (626) 563-8656</a>
              或发送邮件至
              <a href="mailto:kaylal@yundasurrogacy.com" class="text-[var(--yunda-maple)] underline underline-offset-2 hover:text-[var(--yunda-bark)]">kaylal@yundasurrogacy.com</a>
              与团队沟通，我们期待支持你。
            </template>
            <template v-else>
              To speak with our team, please call us at
              <a href="https://wa.me/+16265638656" class="text-[var(--yunda-maple)] underline underline-offset-2 hover:text-[var(--yunda-bark)]">+1 (626) 563-8656</a>
              or email
              <a href="mailto:kaylal@yundasurrogacy.com" class="text-[var(--yunda-maple)] underline underline-offset-2 hover:text-[var(--yunda-bark)]">kaylal@yundasurrogacy.com</a>.
              We look forward to supporting your journey.
            </template>
          </p>
          <div class="mt-8 flex flex-wrap justify-center gap-4">
            <NuxtLink
              :to="localePath('/be-parents')"
              class="yunda-type-button inline-flex items-center justify-center rounded-[6px] bg-[var(--yunda-bark)] px-6 py-3 text-base text-[var(--yunda-petal)] tracking-[0.02em] shadow-sm transition-opacity hover:opacity-95"
              style="font-family: var(--font-text)"
            >
              {{ c.ctaParents }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/be-surrogate')"
              class="yunda-type-button inline-flex items-center justify-center rounded-[6px] bg-[var(--yunda-bark)] px-6 py-3 text-base text-[var(--yunda-petal)] tracking-[0.02em] shadow-sm transition-opacity hover:opacity-95"
              style="font-family: var(--font-text)"
            >
              {{ c.ctaSurrogate }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/egg-donation')"
              class="yunda-type-button inline-flex items-center justify-center border-2 border-[var(--yunda-bark)] rounded-[6px] bg-white px-6 py-3 text-base text-[var(--yunda-bark)] tracking-[0.02em] transition-colors hover:border-[var(--yunda-maple)]"
              style="font-family: var(--font-text)"
            >
              {{ c.ctaEgg }}
            </NuxtLink>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<style scoped>
/* 左侧 Sage 渐隐 → 右侧实景（对齐 docx 第一屏） */
.resources-hero-fade {
  background: linear-gradient(
    to right,
    var(--yunda-sky) 0%,
    var(--yunda-sky) 38%,
    color-mix(in srgb, var(--yunda-sky) 92%, transparent) 48%,
    color-mix(in srgb, var(--yunda-sky) 55%, transparent) 58%,
    color-mix(in srgb, var(--yunda-sky) 18%, transparent) 72%,
    transparent 88%
  );
}

@media (min-width: 1024px) {
  .resources-hero-photo {
    object-position: 88% center;
  }

  .resources-hero-fade {
    background: linear-gradient(
      to right,
      var(--yunda-sky) 0%,
      var(--yunda-sky) 42%,
      color-mix(in srgb, var(--yunda-sky) 88%, transparent) 52%,
      color-mix(in srgb, var(--yunda-sky) 45%, transparent) 62%,
      transparent 78%
    );
  }
}
</style>

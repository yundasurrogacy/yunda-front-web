<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

const { locale } = useI18n()
const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en: string, zh: string) => (isZh.value ? zh : en)

// SEO 配置
const pageTitle = computed(() =>
  tt(
    'Become a Surrogate in California | Requirements & Surrogate Pay',
    '在加州成为代孕妈妈 | 要求与补偿',
  ),
)
const pageDescription = computed(() =>
  tt(
    'Become a surrogate mother in California with Yunda Surrogacy. Enjoy safe, legal, and rewarding gestational surrogacy, full support.',
    '在 Yunda 成为加州代孕妈妈，享受安全、合法、值得信赖的妊娠代孕与全程支持。',
  ),
)

useHead(() => ({
  title: pageTitle.value,
  meta: [
    {
      name: 'description',
      content: pageDescription.value,
    },
    {
      property: 'og:title',
      content: pageDescription.value,
    },
    {
      property: 'og:description',
      content: tt(
        'Learn California surrogate mother requirements, surrogate pay ranges and application steps. Yunda Surrogacy supports Southern California surrogates with full legal and medical guidance..',
        '了解加州代孕妈妈要求、补偿区间与申请步骤。Yunda 为南加州代孕妈妈提供完整的法律与医疗支持。',
      ),
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'keywords',
      content: tt(
        'surrogate mother California, gestational surrogacy California, surrogacy agency California, surrogate compensation California',
        '加州代孕妈妈, 妊娠代孕 加州, 加州代孕机构, 加州代孕补偿',
      ),
    },
  ],
}))
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

// FAQ 數據
const faqs = computed(() => [
  {
    question: tt('What does "surrogate" mean?', '“代孕”是什么意思？'),
    answer: tt(
      'A surrogate is a woman who carries a baby for someone who cannot do it on their own. She helps the intended parents bring a child into the world by carrying the pregnancy and giving birth on their behalf. In gestational surrogacy, the surrogate is not genetically related to the baby — she simply provides a safe and caring environment for the baby to grow.',
      '代孕妈妈是为无法自行怀孕的家庭承担妊娠与分娩的女性。在妊娠代孕中，代孕妈妈与婴儿没有遗传关系，她提供一个安全、温暖的孕育环境来帮助宝宝成长。',
    ),
  },
  {
    question: tt('Is surrogacy legal in California?', '在加州代孕合法吗？'),
    answer: tt(
      'Yes, surrogacy in California is completely legal and highly protected by state law. California is known as one of the most surrogate-friendly states in the U.S. Both gestational surrogacy and compensated surrogacy are recognized and supported here. The law ensures that every surrogate mother\'s rights are clear and respected, and that intended parents become the baby\'s legal parents through a court order before birth. This legal foundation makes California one of the safest places in the world to become a surrogate.',
      '是的，加州代孕完全合法，并且受到州法律强有力的保护。加州被认为是美国最友好的代孕州之一，妊娠代孕与有偿代孕均被认可并受到支持。法律确保代孕妈妈的权利清晰、受尊重，并通过产前法院裁定确认意向父母的法定亲权，使加州成为全球最安全的代孕地区之一。',
    ),
  },
  {
    question: tt('How much do surrogates get paid in California?', '加州代孕妈妈能获得多少补偿？'),
    answer: tt(
      'Compensation for surrogate mothers in California depends on experience, location, and personal circumstances. Most surrogates receive total compensation in the range of $60,000 to $80,000, with additional allowances for maternity needs, travel, and childcare. Yunda Surrogacy ensures that every surrogate\'s pay is transparent, fair, and protected by legal contracts and secure trust accounts. The financial side is handled carefully, so you can focus on your health and the joy of the journey.',
      '补偿金额取决于经验、地区和个人情况。大多数代孕妈妈的总补偿在 $60,000–$80,000 区间，并另有孕期需求、出行与托育补贴。Yunda 确保每位代孕妈妈的补偿透明、公平，并由法律合同与托管账户保障，让你可以专注健康和旅程中的喜悦。',
    ),
  },
  {
    question: tt('How do I apply to be a surrogate in California?', '如何在加州申请成为代孕妈妈？'),
    answer: tt(
      'To apply to become a surrogate in California with Yunda Surrogacy, start by filling out our online application form. After submitting your application, our team will review it and reach out to schedule an initial phone consultation. If you meet the basic requirements, we will guide you through the next steps, including medical and psychological screenings, legal consultations, and matching with intended parents. Throughout the process, we provide full support and clear communication to ensure you feel confident and cared for every step of the way.',
      '在 Yunda 申请成为加州代孕妈妈，从线上申请表开始。提交后，我们会审核并安排电话初访。如果符合基本条件，将进入后续流程，包括医疗与心理筛查、法律咨询及匹配意向父母。全程提供清晰沟通与支持，让你每一步都安心、有保障。',
    ),
  },
])

// FAQ 展開狀態
const expandedFaqs = ref<number[]>([])

// 切換 FAQ 展開狀態
function toggleFaq(index: number) {
  const expandedIndex = expandedFaqs.value.indexOf(index)
  if (expandedIndex > -1) {
    expandedFaqs.value.splice(expandedIndex, 1)
  }
  else {
    expandedFaqs.value.push(index)
  }
}

// 滾動到指定區域
function scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const targetNumbers = {
  compensation: 70000,
  years: 15,
  families: 1000,
}

type AnimatedKey = keyof typeof targetNumbers

// 數字計數器動畫
const animatedNumbers = ref<Record<AnimatedKey, number>>({
  compensation: 0,
  years: 0,
  families: 0,
})
const applicationSteps = computed(() => [
  {
    title: tt('Complete a short surrogate application', '完成简短申请'),
    description: tt(
      'Fill out our secure online surrogate application with basic health and pregnancy history. It takes just a few minutes.',
      '填写安全的线上申请表，包含基本健康与妊娠史，仅需几分钟。',
    ),
  },
  {
    title: tt('Quick eligibility review', '快速资格审核'),
    description: tt(
      'Our team reviews your answers against California surrogate mother requirements and schedules a short call if you qualify.',
      '团队会对照加州代孕妈妈要求审核资料，符合条件会安排简短电话沟通。',
    ),
  },
  {
    title: tt('Medical and psychological screening', '医疗与心理筛查'),
    description: tt(
      'We coordinate OB/GYN records, fertility tests and a counseling session to make sure you feel ready and supported.',
      '我们协调产科记录、相关检查与咨询，确保你准备充分且被支持。',
    ),
  },
  {
    title: tt('Match with intended parents and sign your contract', '匹配意向父母并签署合同'),
    description: tt(
      'You’ll meet a family who fits your preferences and work with your own lawyer to review and sign the surrogacy agreement.',
      '你将与符合偏好的家庭见面，并在独立律师协助下审核并签署代孕协议。',
    ),
  },
  {
    title: tt('Begin your IVF cycle and pregnancy', '开始 IVF 周期与妊娠'),
    description: tt(
      'Once everything is approved, you start medications, embryo transfer and prenatal care with full support from the Yunda team.',
      '一切批准后，你将开始用药、胚胎移植及孕期照护，Yunda 全程支持。',
    ),
  },
])

interface CoverageCity {
  id: string
  name: string
  area: string
  cx: number
  cy: number
}

const coverageCities = computed<CoverageCity[]>(() => [
  { id: 'la', name: tt('Los Angeles', '洛杉矶'), area: tt('Southern California — Los Angeles County', '南加州 — 洛杉矶县'), cx: 85, cy: 145 },
  { id: 'oc', name: tt('Orange County', '橙县'), area: tt('Southern California — Beach Cities & OC', '南加州 — 海滨城市与橙县'), cx: 100, cy: 150 },
  { id: 'ie', name: tt('Inland Empire', '内陆帝国'), area: tt('Southern California — Riverside & San Bernardino', '南加州 — 河滨与圣贝纳迪诺'), cx: 115, cy: 130 },
  { id: 'sd', name: tt('San Diego', '圣迭戈'), area: tt('Southern California — Coastal & North County', '南加州 — 海岸与北县'), cx: 105, cy: 180 },
  { id: 'sac', name: tt('Sacramento', '萨克拉门托'), area: tt('Northern California — Capital Region', '北加州 — 首府区域'), cx: 85, cy: 80 },
  { id: 'sj', name: tt('San Jose & Bay Area', '圣何塞与湾区'), area: tt('Northern California — Silicon Valley & Bay Area', '北加州 — 硅谷与湾区'), cx: 65, cy: 95 },
])

const activeCityId = ref(coverageCities.value[0].id)
const activeCity = computed(
  () => coverageCities.value.find(city => city.id === activeCityId.value) ?? coverageCities.value[0],
)

function setActiveCity(city: CoverageCity) {
  activeCityId.value = city.id
}
// 滾動動畫觀察器
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px',
}

function animateNumbers() {
  const duration = 2000 // 2 seconds
  const steps = 60
  const stepDuration = duration / steps

  const keys = Object.keys(targetNumbers) as AnimatedKey[]

  keys.forEach((key) => {
    const target = targetNumbers[key]
    const increment = target / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        animatedNumbers.value[key] = target
        clearInterval(timer)
      }
      else {
        animatedNumbers.value[key] = Math.floor(current)
      }
    }, stepDuration)
  })
}

// 滾動觀察器
let observer: IntersectionObserver | null = null

// 滾動進度條
const scrollProgress = ref(0)

// 更新滾動進度
function updateScrollProgress() {
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  scrollProgress.value = Math.min(scrollPercent, 100)
}

const howToSteps = computed(() => applicationSteps.value.map((step, index) => ({
  title: tt(
    `Step ${index + 1}: ${step.title}`,
    `步骤 ${index + 1}：${step.title}`,
  ),
  text: step.description,
})))

const faqSchemaItems = computed(() => faqs.value.map(faq => ({
  question: faq.question,
  answer: faq.answer,
})))

const howToSchema = computed(() => buildHowToSchema({
  name: pageTitle.value,
  description: pageDescription.value,
  steps: howToSteps.value,
  baseUrl: siteUrl.value || undefined,
  url: '/become-surrogate-california',
  locale: locale.value,
}))

const faqSchema = computed(() => buildFAQPageSchema({
  name: tt('California Surrogacy FAQ', '加州代孕常见问题'),
  description: tt('Answers to common questions about becoming a surrogate in California.', '关于在加州成为代孕妈妈的常见问题解答。'),
  faqs: faqSchemaItems.value,
  baseUrl: siteUrl.value || undefined,
  url: '/become-surrogate-california',
  locale: locale.value,
}))

useHead(() => {
  const scripts = []
  if (howToSchema.value) {
    scripts.push({
      key: 'schema-surrogate-california-howto',
      type: 'application/ld+json',
      children: JSON.stringify(howToSchema.value),
    })
  }
  if (faqSchema.value) {
    scripts.push({
      key: 'schema-surrogate-california-faq',
      type: 'application/ld+json',
      children: JSON.stringify(faqSchema.value),
    })
  }
  return scripts.length ? { script: scripts } : {}
})

onMounted(() => {
  // 創建滾動觀察器
  observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.id === 'stats-section') {
          animateNumbers()
        }
      }
    })
  }, observerOptions)

  // 觀察統計區域
  const statsSection = document.getElementById('stats-section')
  if (statsSection) {
    observer.observe(statsSection)
  }

  // 添加滾動監聽器
  window.addEventListener('scroll', updateScrollProgress)
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
  window.removeEventListener('scroll', updateScrollProgress)
})
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)]">
    <!-- 滾動進度條 -->
    <div class="fixed left-0 top-0 z-50 h-1 w-full bg-gray-200">
      <div
        class="h-full bg-[var(--yunda-bark)] transition-all duration-300 ease-out"
        :style="{ width: `${scrollProgress}%` }"
      />
    </div>

    <AppHeader />

    <!-- Hero Section -->
    <section class="relative overflow-hidden from-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b py-20">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute left-10 top-20 h-32 w-32 rounded-full bg-[var(--yunda-bark)]" />
        <div class="absolute right-20 top-40 h-24 w-24 rounded-full bg-[var(--primary-brown)]" />
        <div class="absolute bottom-20 left-1/4 h-20 w-20 rounded-full bg-[var(--olive-green)]" />
      </div>

      <div class="container relative z-10 mx-auto max-w-7xl px-4">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div class="text-center lg:text-left">
            <h1 class="mb-6 text-5xl text-[var(--yunda-bark)] font-bold leading-tight md:text-7xl" >
              {{ tt('Become a Surrogate in California: Requirements, Pay and Support', '在加州成为代孕妈妈：要求、补偿与支持') }}
            </h1>
            <p class="mb-8 text-xl text-[var(--primary-brown)] leading-relaxed md:text-2xl">
              {{ tt('Becoming a surrogate in California is more than a journey — it\'s a gift of love and compassion. Many women choose this path because they want to help others build families while reaching new goals for themselves.', '在加州成为代孕妈妈不仅是一段旅程，更是一份爱与善意的礼物。许多女性选择这条路，是为了帮助他人建立家庭，也为自己实现新的目标。') }}
            </p>
            <p class="mb-8 text-lg text-[var(--primary-brown)] leading-relaxed md:text-xl">
              {{ tt('Most surrogates are women 21–39 who have had at least one healthy full-term birth and live a stable, healthy lifestyle. In California, total surrogate pay is typically in the mid–five figures with additional benefits for maternity needs, travel and childcare. With Yunda, you get clear requirements, transparent compensation and full legal and medical support from day one.', '大多数代孕妈妈为 21–39 岁，至少有一次健康足月分娩经历，并保持稳定、健康的生活方式。在加州，总补偿通常为五位数中段，并额外覆盖孕期需求、出行与托育补贴。选择 Yunda，从第一天起即可获得清晰要求、透明补偿与完整的法律医疗支持。') }}
            </p>
            <div class="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <NuxtLink
                to="/be-surrogate"
                class="transform rounded-lg bg-[var(--yunda-bark)] px-8 py-4 text-lg text-white font-semibold shadow-lg transition-opacity transition-transform hover:scale-105 hover:opacity-90"
              >
                {{ tt('Apply to Become a Surrogate', '申请成为代孕妈妈') }}
              </NuxtLink>
              <button
                class="border-2 border-[var(--yunda-bark)] rounded-lg px-8 py-4 text-lg text-[var(--yunda-bark)] font-semibold transition-colors hover:bg-[var(--yunda-bark)] hover:text-white"
                @click="scrollToSection('requirements')"
              >
                {{ tt('Check Requirements', '查看要求') }}
              </button>
            </div>
          </div>

          <!-- Hero Image Placeholder -->
          <div class="relative">
            <div class="rounded-2xl from-[var(--yunda-petal)] to-[var(--yunda-bark)] bg-gradient-to-br p-8 shadow-2xl">
              <div class="aspect-square flex items-center justify-center border-2 border-[var(--yunda-bark)] rounded-xl border-dashed bg-white">
                <div class="text-center">
                  <img src="/images/california-surrogate-mother.jpg" :alt="tt('California Surrogate Mother', '加州代孕妈妈')">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Introduction Section -->
    <section class="bg-white py-20">
      <div class="container mx-auto max-w-6xl px-4">
        <div class="max-w-none text-center prose prose-lg">
          <p class="mb-8 text-xl text-[var(--primary-brown)] leading-relaxed">
            {{ tt('As a surrogate mother, you open the door to someone\'s dream of parenthood. You bring hope, joy, and life into a story that might not exist without you.', '作为代孕妈妈，你为他人打开成为父母的梦想之门。你带来希望、喜悦与生命，让原本可能不存在的故事得以发生。') }}
          </p>
          <p class="mb-8 text-lg text-[var(--primary-brown)] leading-relaxed">
            {{ tt('At Yunda Surrogacy, we make sure every surrogate feels respected, supported, and protected. California is one of the most surrogate-friendly states in the U.S., offering strong legal protection and excellent medical care. Here, you can safely begin your surrogacy journey with confidence.', '在 Yunda，我们确保每位代孕妈妈都被尊重、支持与保护。加州是美国最友好的代孕州之一，拥有强大的法律保障与优质医疗。你可以在这里安心开启代孕旅程。') }}
          </p>
          <p class="mb-8 text-lg text-[var(--primary-brown)] leading-relaxed">
            {{ tt('Our team walks beside every woman who decides to become a surrogate in California. From the first call to the moment a baby arrives, we make sure you feel valued and cared for. Many surrogates say the experience changes their lives — not only because of the financial rewards but also because of the deep emotional fulfillment that comes from helping another family grow.', '我们陪伴每一位选择在加州成为代孕妈妈的女性。从第一通电话到宝宝出生，我们确保你被珍视与关怀。许多代孕妈妈表示，这段经历改变了她们的人生——不仅因为经济回报，更因为帮助他人家庭成长带来的深层情感满足。') }}
          </p>
          <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
            {{ tt('If you\'ve ever felt called to do something meaningful, this may be the moment. Becoming a surrogate mother lets you share your strength, kindness, and heart in a way few others can.', '如果你一直渴望做一件有意义的事，也许现在就是契机。成为代孕妈妈，让你以独特的方式分享力量、善意与真心。') }}
          </p>
        </div>
      </div>
    </section>

    <!-- What Is Surrogacy Section -->
    <section class="bg-[var(--yunda-petal)] py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-6 text-4xl text-[var(--yunda-bark)] font-bold md:text-5xl" >
            {{ tt('What Is Surrogacy and Who Can Become a Surrogate Mother?', '什么是代孕？谁可以成为代孕妈妈？') }}
          </h2>
        </div>

        <div class="grid mb-16 gap-12 lg:grid-cols-2">
          <!-- Understanding Gestational Surrogacy -->
          <div class="rounded-xl bg-white p-8 shadow-lg">
            <h3 class="mb-6 text-2xl text-[var(--yunda-bark)] font-bold" >
              {{ tt('Understanding Gestational Surrogacy in California', '了解加州妊娠代孕') }}
            </h3>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Surrogacy means carrying a baby for someone who cannot do it on their own. In gestational surrogacy, which is the model used in California, the surrogate carries a baby created from the intended parents’ or donors’ embryos and is not genetically related to the child.', '代孕是为无法自行怀孕的人承担孕育与分娩的过程。在加州采用的是妊娠代孕模式，代孕妈妈怀孕的胚胎来自意向父母或捐赠者，与孩子没有遗传关系。') }}
            </p>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('California is known for leading the way in gestational surrogacy. The process is well-supported by experienced fertility specialists, legal experts, and caring surrogacy agencies. This makes the entire journey smoother and safer for every surrogate mother.', '加州在妊娠代孕领域处于领先地位，流程由经验丰富的生育专家、法律顾问和专业机构共同支持，让每位代孕妈妈的旅程更顺畅、更安全。') }}
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              {{ tt('When you become a surrogate in California, you can expect clear communication, medical guidance, and emotional support every step of the way. Many surrogates describe this as one of the most meaningful experiences of their lives — a chance to help another family while doing something they genuinely love.', '在加州成为代孕妈妈，你会获得清晰沟通、医疗指导与情感支持。许多代孕妈妈形容这是一生中最有意义的经历之一——既帮助他人，也做自己真正愿意做的事。') }}
            </p>
          </div>

          <!-- Why California Is the Best State -->
          <div class="rounded-xl bg-white p-8 shadow-lg">
            <h3 class="mb-6 text-2xl text-[var(--yunda-bark)] font-bold" >
              {{ tt('Why California Is the Best State for Surrogacy', '为什么加州是代孕首选州') }}
            </h3>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Surrogacy in California is fully legal and highly protected by state law, which is why many women choose to become surrogates here. There\'s a reason California is often called the heart of surrogacy in the United States. The state offers some of the most surrogate-friendly laws in the world, ensuring that both surrogates and intended parents are fully protected. Legal agreements are clear, compensation is transparent, and every surrogate\'s rights are respected.', '加州代孕完全合法，并受州法律高度保护，这也是许多女性选择在此成为代孕妈妈的原因。加州常被称为美国代孕的核心州，拥有全球最友好的代孕法律之一，确保代孕妈妈与意向父母都获得充分保护。法律协议清晰、补偿透明、代孕妈妈权利受到尊重。') }}
            </p>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Beyond the laws, California also provides outstanding fertility care. With advanced medical centers, supportive surrogacy professionals, and a diverse community of experienced surrogates, the environment here is ideal for this life-changing journey.', '除了法律保障，加州还拥有卓越的生殖医疗体系。先进的医疗中心、专业的代孕团队与经验丰富的代孕社区，共同营造出最适合这段人生旅程的环境。') }}
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              {{ tt('For many women, becoming a surrogate mother in California means joining a warm, supportive network — one that values compassion, respect, and trust. You\'re not just helping others have a child; you\'re becoming part of a community that celebrates the beauty of giving life.', '对许多女性来说，在加州成为代孕妈妈意味着加入一个温暖、互相支持的群体——这里重视善意、尊重与信任。你不仅是在帮助他人拥有孩子，更是在加入一个珍视生命与奉献的社区。') }}
            </p>
          </div>
        </div>

        <!-- Image Placeholder -->
        <div class="rounded-2xl from-[var(--yunda-petal)] to-[var(--yunda-bark)] bg-gradient-to-r p-8 shadow-lg">
          <div class="aspect-video flex items-center justify-center border-2 border-[var(--yunda-bark)] rounded-xl border-dashed bg-white">
            <div class="text-center">
              <img src="/images/california-surrogacy-process.jpg" :alt="tt('California Surrogacy Mother', '加州代孕妈妈')">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Yunda Section -->
    <section class="bg-white py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-6 text-4xl text-[var(--yunda-bark)] font-bold md:text-5xl" >
            {{ tt('Why Become a Surrogate Mother with Yunda Surrogacy', '为什么选择 Yunda 成为代孕妈妈') }}
          </h2>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            {{ tt('Choosing to become a surrogate in California is a big decision — one that deserves care, trust, and the right support system. At Yunda Surrogacy, we believe every surrogate mother should feel respected, valued, and empowered throughout her journey.', '在加州成为代孕妈妈是一项重要决定，值得被认真对待、被信任并获得合适的支持体系。Yunda 相信每位代孕妈妈在旅程中都应被尊重、被认可并充满力量。') }}
          </p>
        </div>

        <div class="grid mb-16 gap-8 lg:grid-cols-3">
          <!-- Emotional and Financial Rewards -->
          <div class="group cursor-pointer rounded-xl bg-[var(--yunda-petal)] p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-[var(--yunda-bark)] transition-colors duration-300 group-hover:bg-[var(--primary-brown)]">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 class="mb-4 text-xl text-[var(--yunda-bark)] font-bold transition-colors duration-300 group-hover:text-[var(--primary-brown)]" >
              {{ tt('Emotional Rewards and Fair Surrogate Pay', '情感回报与公平补偿') }}
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Alongside emotional fulfillment, surrogate pay in California reflects the time, risk and commitment you invest. Surrogacy changes lives — not just for the families you help but also for you as a surrogate mother. Many women say it\'s one of the most fulfilling things they\'ve ever done.', '除了情感满足，加州代孕补偿也体现了你投入的时间、风险与承诺。代孕会改变人生——不仅是你帮助的家庭，也包括你自己。许多女性说，这是她们做过最有意义的事情之一。') }}
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Alongside emotional fulfillment, surrogacy offers strong financial benefits. In California, surrogate mothers receive compensation that reflects their commitment, time, and dedication.', '在情感满足之外，代孕也提供稳健的经济回报。在加州，代孕妈妈的补偿与她们的投入、时间和付出相匹配。') }}
            </p>
          </div>

          <!-- Supportive Agency -->
          <div class="group cursor-pointer rounded-xl bg-[var(--yunda-petal)] p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-[var(--yunda-bark)] transition-colors duration-300 group-hover:bg-[var(--primary-brown)]">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="mb-4 text-xl text-[var(--yunda-bark)] font-bold transition-colors duration-300 group-hover:text-[var(--primary-brown)]" >
              {{ tt('A Supportive and Ethical Agency', '值得信赖且合规的机构') }}
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Not every agency treats surrogate mothers the same way. At Yunda Surrogacy, our focus is always on your well-being. We follow strict ethical standards to ensure fairness, safety, and open communication.', '并非所有机构都以同样方式对待代孕妈妈。Yunda 始终把你的福祉放在首位，并遵循严格的伦理标准，确保公平、安全与坦诚沟通。') }}
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              {{ tt('You\'ll never feel like "just a number." You\'ll have a dedicated coordinator who knows your name, understands your needs, and keeps in touch with you every week.', '你不会被当成“编号”。你将拥有专属协调员，了解你的需求，并每周保持联系。') }}
            </p>
          </div>

          <!-- Meaningful Journey -->
          <div class="group cursor-pointer rounded-xl bg-[var(--yunda-petal)] p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-[var(--yunda-bark)] transition-colors duration-300 group-hover:bg-[var(--primary-brown)]">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="mb-4 text-xl text-[var(--yunda-bark)] font-bold transition-colors duration-300 group-hover:text-[var(--primary-brown)]" >
              {{ tt('A Journey Filled with Meaning', '一段充满意义的旅程') }}
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Being a surrogate mother is about more than carrying a child — it\'s about carrying hope, love, and courage. Every pregnancy is a promise fulfilled for someone who has been waiting for years.', '成为代孕妈妈不仅是孕育生命，更是传递希望、爱与勇气。每一次妊娠，都是为等待多年的家庭实现承诺。') }}
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Our team takes care of every detail so you can focus on what you do best — creating life. From your first call to the moment of delivery, we guide you with compassion, honesty, and expertise.', '我们处理所有细节，让你专注于最重要的事情——孕育生命。从第一通电话到分娩那一刻，我们以关怀、真诚与专业陪伴你。') }}
            </p>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="rounded-xl bg-[var(--yunda-bark)] p-12 text-center">
          <h3 class="mb-6 text-3xl text-white font-bold" >
            {{ tt('Ready to do something extraordinary?', '准备好做一件非凡的事吗？') }}
          </h3>
          <p class="mb-8 text-lg text-white">
            {{ tt('Join Yunda Surrogacy and become a surrogate mother in California — where your kindness changes lives, and your courage inspires new beginnings.', '加入 Yunda，在加州成为代孕妈妈——你的善意改变生命，你的勇气开启新篇章。') }}
          </p>
          <NuxtLink
            to="/be-surrogate"
            class="rounded-lg bg-white px-12 py-4 text-xl text-[var(--yunda-bark)] font-semibold shadow-lg transition-opacity hover:opacity-90"
          >
            {{ tt('Start Your Journey', '开启旅程') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section id="stats-section" class="bg-[var(--yunda-bark)] py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-6 text-4xl text-white font-bold md:text-5xl" >
            {{ tt('Why California Surrogates Choose Yunda', '为什么加州代孕妈妈选择 Yunda') }}
          </h2>
          <p class="mx-auto max-w-4xl text-xl text-white leading-relaxed opacity-90">
            {{ tt('Join thousands of women who have found fulfillment and financial security through our California surrogacy program', '加入成千上万位通过加州代孕项目获得成就感与经济保障的女性行列。') }}
          </p>
        </div>

        <div class="grid gap-8 md:grid-cols-3">
          <!-- Average Compensation -->
          <div class="rounded-xl bg-white bg-opacity-20 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30">
            <div class="mx-auto mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-white bg-opacity-20">
              <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <div class="mb-2 text-5xl text-white font-bold" >
              ${{ animatedNumbers.compensation.toLocaleString() }}+
            </div>
            <h3 class="mb-2 text-xl text-white font-semibold">
              {{ tt('Average Compensation', '平均补偿') }}
            </h3>
            <p class="text-white opacity-90">
              {{ tt('Total compensation package including base pay and allowances', '总补偿包含基础补偿与各类补贴') }}
            </p>
          </div>

          <!-- Years of Experience -->
          <div class="rounded-xl bg-white bg-opacity-20 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30">
            <div class="mx-auto mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-white bg-opacity-20">
              <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="mb-2 text-5xl text-white font-bold" >
              {{ animatedNumbers.years }}+
            </div>
            <h3 class="mb-2 text-xl text-white font-semibold">
              {{ tt('Years of Experience', '多年经验') }}
            </h3>
            <p class="text-white opacity-90">
              {{ tt('Helping families achieve their dreams through surrogacy', '帮助家庭实现生育梦想') }}
            </p>
          </div>

          <!-- Families Helped -->
          <div class="rounded-xl bg-white bg-opacity-20 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30">
            <div class="mx-auto mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-white bg-opacity-20">
              <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div class="mb-2 text-5xl text-white font-bold" >
              {{ animatedNumbers.families.toLocaleString() }}+
            </div>
            <h3 class="mb-2 text-xl text-white font-semibold">
              {{ tt('Families Helped', '帮助的家庭') }}
            </h3>
            <p class="text-white opacity-90">
              {{ tt('Successful surrogacy journeys completed', '顺利完成的代孕旅程') }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Compensation Section -->
    <section class="bg-[var(--yunda-petal)] py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-6 text-4xl text-[var(--yunda-bark)] font-bold md:text-5xl" >
            {{ tt('Surrogate Compensation and Benefits in California', '加州代孕补偿与福利') }}
          </h2>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            {{ tt('California has long been the gold standard for surrogate compensation. Clear surrogacy laws and secured trust accounts mean your surrogate pay is guaranteed, paid on time and fully outlined in your contract from the start.', '加州长期以来是代孕补偿的黄金标准。清晰的代孕法律与安全的托管账户确保补偿有保障、按时支付，并在合同中明确列出。') }}
            <br>
            {{ tt('At Yunda Surrogacy, we make sure every woman understands what her dedication and care are truly worth. California’s legal and medical environment allows us to offer compensation packages that recognize your time, effort, and heart. You can feel confident knowing your work is honored with fairness and respect from the very start.', '在 Yunda，我们确保每位女性都清楚自己的付出与关怀真正价值。加州完善的法律与医疗环境让我们能够提供认可你时间、努力与爱心的补偿方案，让你从一开始就感到公平与尊重。') }}
          </p>
        </div>

        <div class="grid mb-16 gap-12 lg:grid-cols-2">
          <!-- How Compensation Works -->
          <div class="rounded-xl bg-white p-8 shadow-lg">
            <h3 class="mb-6 text-2xl text-[var(--yunda-bark)] font-bold" >
              {{ tt('How Surrogate Compensation and Pay Work in California', '加州代孕补偿如何发放') }}
            </h3>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('In California, surrogate compensation is designed to reflect both your commitment and your comfort. Every surrogate receives a base pay plus additional allowances for health care, maternity needs, travel, and more.', '在加州，代孕补偿旨在体现你的投入并保障你的舒适度。每位代孕妈妈都有基础补偿，并包含医疗、孕期需求、出行等额外补贴。') }}
            </p>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('While each journey is unique, most surrogates earn a range that reflects California\'s leadership in fair and ethical compensation. The total value typically falls within the high five figures, depending on experience, location, and personal circumstances.', '虽然每段旅程都不同，大多数代孕妈妈的补偿区间体现了加州在公平合规方面的领先地位。总补偿通常为五位数高段，取决于经验、地区和个人情况。') }}
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Unlike many other states, California ensures that surrogates are paid through secured trust accounts, managed by licensed professionals. This means your compensation is guaranteed and handled with complete transparency.', '不同于许多州，加州确保代孕补偿通过受监管的托管账户发放，由专业机构管理。这意味着你的补偿有保障且过程透明。') }}
            </p>
          </div>

          <!-- Benefits Beyond Financial -->
          <div class="rounded-xl bg-white p-8 shadow-lg">
            <h3 class="mb-6 text-2xl text-[var(--yunda-bark)] font-bold" >
              {{ tt('Benefits Beyond Surrogate Pay', '超越补偿的福利') }}
            </h3>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Being a surrogate mother in California comes with much more than just pay. You gain access to top-tier medical care from some of the country\'s most experienced fertility specialists.', '在加州成为代孕妈妈，收获远不止补偿。你将获得顶尖生殖专家提供的高水平医疗照护。') }}
            </p>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('At Yunda Surrogacy, every surrogate also enjoys personalized care — regular wellness check-ins, flexible scheduling, and 24/7 communication with your coordinator.', '在 Yunda，每位代孕妈妈都能享受个性化关怀——定期健康关怀、灵活排期与 24/7 协调员沟通。') }}
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              {{ tt('You\'ll also join a network of strong women across California who share the same purpose: helping families grow. Many of them stay connected long after their surrogacy experience.', '你还将加入遍布加州的代孕妈妈支持网络，大家共同的目标是帮助家庭成长。许多人在旅程结束后仍保持联系。') }}
            </p>
          </div>
        </div>

        <!-- Why California Offers Best Conditions -->
        <div class="mb-16 rounded-xl bg-white p-8 shadow-lg">
          <h3 class="mb-6 text-2xl text-[var(--yunda-bark)] font-bold" >
            {{ tt('Why California Offers the Best Conditions for Surrogates', '为什么加州拥有最佳代孕环境') }}
          </h3>
          <div class="grid gap-8 md:grid-cols-2">
            <div>
              <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
                {{ tt('California leads the nation in surrogacy for good reason. The state\'s family laws fully recognize gestational surrogacy, making the process legal, protected, and emotionally safe for all parties.', '加州在代孕领域领先全国并非偶然。州家庭法充分认可妊娠代孕，让流程合法、受保护且更安心。') }}
              </p>
              <p class="text-[var(--primary-brown)] leading-relaxed">
                {{ tt('Courts issue pre-birth parentage orders, which means everyone\'s rights — including yours — are clearly defined before delivery.', '法院会在分娩前签发亲权裁定，确保包括你在内的各方权利提前明确。') }}
              </p>
            </div>
            <div>
              <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
                {{ tt('The culture in California is also uniquely supportive. People here understand and respect surrogates, seeing them as heroes who help bring love into the world.', '加州文化对代孕也格外友好。这里的人理解并尊重代孕妈妈，视其为将爱带入世界的英雄。') }}
              </p>
              <p class="text-[var(--primary-brown)] leading-relaxed">
                {{ tt('With open-minded communities, professional medical infrastructure, and world-class mental health resources, California truly stands apart as the safest and most rewarding place to be a surrogate.', '开明的社区氛围、专业的医疗体系和一流的心理健康资源，让加州成为最安全、最有回报的代孕目的地。') }}
              </p>
            </div>
          </div>
        </div>

        <!-- Compensation Image Placeholder -->
        <div class="rounded-2xl from-[var(--yunda-petal)] to-[var(--yunda-bark)] bg-gradient-to-r p-8 shadow-lg">
          <div class="aspect-video flex items-center justify-center border-2 border-[var(--yunda-bark)] rounded-xl border-dashed bg-white">
            <div class="text-center">
              <img src="/images/Compensation-Benefits.jpg" :alt="tt('California Surrogacy Compensation & Benefits', '加州代孕补偿与福利')">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Requirements Section -->
    <section id="requirements" class="bg-white py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-6 text-4xl text-[var(--yunda-bark)] font-bold md:text-5xl" >
            {{ tt('Surrogate Requirements: Who Qualifies to Become a Surrogate in California', '代孕要求：谁符合在加州成为代孕妈妈的条件') }}
          </h2>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            {{ tt('Becoming a surrogate mother in California is a special calling — one that takes love, strength, and a deep sense of purpose. California welcomes women who want to help others grow their families while building something meaningful for themselves.', '在加州成为代孕妈妈是一种特别的召唤，需要爱、力量与明确的目标感。加州欢迎那些希望帮助他人家庭成长、同时为自己创造意义的女性。') }}
          </p>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            {{ tt('We welcome surrogates from across Southern California and Northern California, including Los Angeles, Orange County, surrounding areas. If you’re unsure whether your city is covered, our team can confirm it in a short call.', '我们欢迎来自南加州与北加州的代孕妈妈，包括洛杉矶、橙县及周边地区。如不确定所在城市是否覆盖，我们可在简短电话中确认。') }}
          </p>
        </div>

        <div class="grid mb-16 gap-8 lg:grid-cols-3">
          <!-- Basic Qualifications -->
          <div class="rounded-xl bg-[var(--yunda-petal)] p-8 shadow-lg">
            <h3 class="mb-6 text-xl text-[var(--yunda-bark)] font-bold" >
              {{ tt('Basic Qualifications for Surrogates in California', '加州代孕妈妈基础条件') }}
            </h3>
            <ul class="text-[var(--primary-brown)] space-y-4">
              <li class="flex items-start">
                <span class="mr-3 mt-1 text-[var(--yunda-bark)]">✓</span>
                <span>{{ tt('Between 21 and 39 years old', '年龄在 21–39 岁之间') }}</span>
              </li>
              <li class="flex items-start">
                <span class="mr-3 mt-1 text-[var(--yunda-bark)]">✓</span>
                <span>{{ tt('U.S. citizens or permanent residents', '美国公民或永久居民') }}</span>
              </li>
              <li class="flex items-start">
                <span class="mr-3 mt-1 text-[var(--yunda-bark)]">✓</span>
                <span>{{ tt('Have given birth to at least one healthy, full-term baby', '至少有一次健康足月分娩经历') }}</span>
              </li>
              <li class="flex items-start">
                <span class="mr-3 mt-1 text-[var(--yunda-bark)]">✓</span>
                <span>{{ tt('Living a healthy lifestyle — no smoking, no drug use', '健康生活方式——不吸烟、不使用毒品') }}</span>
              </li>
              <li class="flex items-start">
                <span class="mr-3 mt-1 text-[var(--yunda-bark)]">✓</span>
                <span>{{ tt('Free from major medical or psychological conditions', '无重大身心健康问题') }}</span>
              </li>
              <li class="flex items-start">
                <span class="mr-3 mt-1 text-[var(--yunda-bark)]">✓</span>
                <span>{{ tt('Supported by family or a stable home environment', '家庭支持或稳定的居住环境') }}</span>
              </li>
            </ul>
          </div>

          <!-- Health and Emotional Screening -->
          <div class="rounded-xl bg-[var(--yunda-petal)] p-8 shadow-lg">
            <h3 class="mb-6 text-xl text-[var(--yunda-bark)] font-bold" >
              {{ tt('Health and Emotional Screening', '健康与心理筛查') }}
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Every surrogate mother deserves full support — medically and emotionally. California requires thorough health evaluations before the surrogacy journey begins. This includes physical exams, OB/GYN records review, and sometimes additional fertility tests.', '每位代孕妈妈都应得到医疗与情感的完整支持。加州在代孕开始前要求全面健康评估，包括体检、产科记录审核，以及必要时的生育检查。') }}
            </p>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Equally important is emotional readiness. We work with licensed counselors who talk with you about your motivation, expectations, and support network. This isn’t a test — it’s a conversation to make sure you feel confident and supported from the very first step.', '同样重要的是心理准备。我们与持证咨询师合作，与你沟通动机、期望与支持系统。这不是考试，而是一场帮助你从第一步就感到安心与被支持的交流。') }}
            </p>
          </div>

          <!-- Legal and Financial Security -->
          <div class="rounded-xl bg-[var(--yunda-petal)] p-8 shadow-lg">
            <h3 class="mb-6 text-xl text-[var(--yunda-bark)] font-bold" >
              {{ tt('Legal and Financial Security for California Surrogates', '加州代孕妈妈的法律与财务保障') }}
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('One of the reasons so many women choose surrogacy in California is because the state protects surrogates better than anywhere else. From clear legal contracts to guaranteed compensation, every part of the process is designed with your safety in mind.', '许多女性选择在加州代孕，是因为这里对代孕妈妈的保护最为充分。从清晰的法律合同到补偿保障，流程的每一步都以你的安全为核心。') }}
            </p>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Before you start your journey, you\'ll meet with an independent attorney who represents you — at no cost. Your lawyer will review your agreement, explain your rights, and make sure every payment and condition is fair and transparent.', '在旅程开始前，你将与独立律师会面，费用由对方承担。律师会审阅协议、解释你的权利，并确保每一项付款与条款公平透明。') }}
            </p>
          </div>
        </div>

        <!-- Why California Surrogates Stand Out -->
        <div class="border-2 border-[var(--yunda-bark)] rounded-xl bg-white p-8 shadow-lg">
          <h3 class="mb-6 text-2xl text-[var(--yunda-bark)] font-bold" >
            {{ tt('Why California Surrogates Stand Out', '加州代孕妈妈为何与众不同') }}
          </h3>
          <div class="grid gap-8 md:grid-cols-2">
            <div>
              <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
                {{ tt('California surrogates are known for their compassion, strength, and professionalism. Many women here have been through the process more than once — not for money, but because they loved helping others so much the first time.', '加州代孕妈妈以善良、坚韧与专业著称。许多女性会多次参与，不是为了金钱，而是因为第一次帮助他人的体验太美好。') }}
              </p>
            </div>
            <div>
              <p class="text-[var(--primary-brown)] leading-relaxed">
                {{ tt('The state\'s surrogacy community is also incredibly connected. You\'ll find online and local support groups where women share experiences, celebrate milestones, and help new surrogates feel welcome.', '加州的代孕社区联系紧密。你会找到线上与线下的支持小组，大家分享经验、庆祝里程碑，并帮助新代孕妈妈融入。') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Support System Section -->
    <section class="bg-[var(--yunda-petal)] py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-6 text-4xl text-[var(--yunda-bark)] font-bold md:text-5xl" >
            {{ tt('Your Support System: Legal, Medical, and Emotional Care', '你的支持系统：法律、医疗与情感关怀') }}
          </h2>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            {{ tt('When you become a surrogate in California, you deserve to feel safe, supported, and valued at every step. Yunda Surrogacy was built around one simple promise — to take care of our surrogate mothers like family.', '在加州成为代孕妈妈，你理应在每一步都感到安全、被支持、被珍视。Yunda 的核心承诺很简单——像家人一样照顾每位代孕妈妈。') }}
          </p>
        </div>

        <div class="grid mb-16 gap-8 lg:grid-cols-3">
          <!-- Legal Protection -->
          <div class="rounded-xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
            <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-[var(--yunda-bark)]">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="mb-4 text-xl text-[var(--yunda-bark)] font-bold" >
              {{ tt('Legal Protection You Can Count On in California', '加州可靠的法律保障') }}
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('California is the most surrogate-friendly state in the U.S., and its laws are clear and protective. From the start, every surrogate mother works with her own independent attorney, paid for by the intended parents.', '加州是美国最友好的代孕州，法律清晰且保护充分。从一开始，每位代孕妈妈都有独立律师代表，费用由意向父母承担。') }}
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              {{ tt('California\'s surrogacy laws allow for pre-birth orders, meaning legal parentage is established before the baby is born. This gives both you and the intended parents full clarity and protection.', '加州允许产前亲权裁定，这意味着宝宝出生前法律亲权已确定，让你和意向父母都清晰安心。') }}
            </p>
          </div>

          <!-- Medical Care -->
          <div class="rounded-xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
            <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-[var(--yunda-bark)]">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="mb-4 text-xl text-[var(--yunda-bark)] font-bold" >
              {{ tt('Medical Care from California\'s Best Specialists', '来自加州顶级专家的医疗照护') }}
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('California has some of the world\'s most advanced fertility and maternity care. As a gestational surrogate, you\'ll receive personalized medical attention from top fertility doctors and OB/GYNs.', '加州拥有全球领先的生殖与产科医疗资源。作为妊娠代孕妈妈，你将获得顶级生殖医生与产科医生的个性化照护。') }}
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Every medical appointment, procedure, and test is carefully coordinated by your case manager, so you never have to navigate it alone.', '每一次就诊、检查与流程都会由专属协调员精心安排，你无需独自应对。') }}
            </p>
          </div>

          <!-- Emotional Care -->
          <div class="rounded-xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
            <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-[var(--yunda-bark)]">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="mb-4 text-xl text-[var(--yunda-bark)] font-bold" >
              {{ tt('Emotional Care and Community Connection', '情感关怀与社群连接') }}
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              {{ tt('The surrogacy journey is emotional — filled with joy, hope, and sometimes a few nerves. That\'s why emotional support is just as important as medical care.', '代孕旅程充满情感——有喜悦、有希望，也难免紧张。这就是为什么情感支持与医疗照护同样重要。') }}
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              {{ tt('At Yunda Surrogacy, every surrogate mother in California has access to licensed counselors and peer mentors throughout the process.', '在 Yunda，每位加州代孕妈妈都可在全程获得持证咨询师与同伴导师的支持。') }}
            </p>
          </div>
        </div>

        <!-- The Yunda Difference -->
        <div class="mb-16 border-2 border-[var(--yunda-bark)] rounded-xl bg-white p-8 shadow-lg">
          <h3 class="mb-6 text-2xl text-[var(--yunda-bark)] font-bold" >
            {{ tt('The Yunda Difference', 'Yunda 的不同之处') }}
          </h3>
          <div class="grid gap-8 md:grid-cols-2">
            <div>
              <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
                {{ tt('At Yunda Surrogacy, we combine California\'s strong legal foundation with our own personal approach. We listen. We care. We stay by your side from the first call to the last hug. Our mission is to make sure every surrogate mother feels protected, appreciated, and proud of her journey.', '在 Yunda，我们将加州坚实的法律基础与贴心服务结合。我们倾听、关心，并从第一通电话到最后的拥抱全程陪伴。我们的使命是让每位代孕妈妈都感到被保护、被肯定并为旅程自豪。') }}
              </p>
              <p class="text-[var(--primary-brown)] leading-relaxed">
                {{ tt('Surrogacy in California works so well because it\'s built on trust — between the surrogate, the agency, the medical team, and the intended parents. Yunda Surrogacy keeps that trust strong by offering clear communication, transparent compensation, and heartfelt gratitude for everything you do.', '加州代孕之所以顺利，是因为建立在代孕妈妈、机构、医疗团队与意向父母之间的信任之上。Yunda 通过清晰沟通、透明补偿以及真诚感谢来维系这份信任。') }}
              </p>
            </div>
            <div>
              <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
                {{ tt('Becoming a surrogate mother in California isn\'t just about helping others — it\'s about being part of something bigger, something beautiful. With Yunda Surrogacy, you\'ll always have a strong support system, every step of the way.', '在加州成为代孕妈妈不仅是帮助他人，更是参与一件更伟大、更美好的事情。有 Yunda 陪伴，你在每一步都拥有强大的支持系统。') }}
              </p>
              <div class="rounded-lg bg-[var(--yunda-petal)] p-6">
                <h4 class="mb-3 text-lg text-[var(--yunda-bark)] font-semibold">
                  {{ tt('Our Promise to You:', '我们的承诺：') }}
                </h4>
                <ul class="text-[var(--primary-brown)] space-y-2">
                  <li class="flex items-center">
                    <span class="mr-2 text-[var(--yunda-bark)]">✓</span>
                    <span>{{ tt('Personalized care and attention', '个性化关怀与关注') }}</span>
                  </li>
                  <li class="flex items-center">
                    <span class="mr-2 text-[var(--yunda-bark)]">✓</span>
                    <span>{{ tt('24/7 support and communication', '全天候支持与沟通') }}</span>
                  </li>
                  <li class="flex items-center">
                    <span class="mr-2 text-[var(--yunda-bark)]">✓</span>
                    <span>{{ tt('Transparent and fair compensation', '透明且公平的补偿') }}</span>
                  </li>
                  <li class="flex items-center">
                    <span class="mr-2 text-[var(--yunda-bark)]">✓</span>
                    <span>{{ tt('Complete legal protection', '完整的法律保障') }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Support System Image Placeholder -->
        <div class="rounded-2xl from-[var(--yunda-petal)] to-[var(--yunda-bark)] bg-gradient-to-r p-8 shadow-lg">
          <div class="aspect-video flex items-center justify-center border-2 border-[var(--yunda-bark)] rounded-xl border-dashed bg-white">
            <div class="text-center">
              <img src="/images/Legal-Medical-Emotional-Care.jpg" :alt="tt('California Surrogacy Legal, Medical & Emotional Care', '加州代孕法律、医疗与情感支持')" class="h-full w-full object-cover">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Coverage Section -->
    <section class="bg-white py-20">
      <div class="container mx-auto max-w-6xl px-4">
        <div class="mb-10 text-center">
          <p class="coverage-badge">
            {{ tt('California coverage', '加州覆盖范围') }}
          </p>
          <h2 class="text-4xl text-[var(--yunda-bark)] font-bold md:text-5xl" >
            {{ tt('Where in California You Can Be a Surrogate', '在加州哪些地区可以成为代孕妈妈') }}
          </h2>
        </div>
        <div class="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div class="rounded-3xl bg-[var(--yunda-petal)] p-10 shadow-lg">
            <p class="mb-6 text-lg text-[var(--primary-brown)] leading-relaxed">
              {{ tt('Yunda works with surrogates across Southern California and Northern California. Many of our surrogates live in Los Angeles, Orange County, Inland Empire, San Diego, Sacramento, San Jose and nearby cities.', 'Yunda 在南加州和北加州均招募代孕妈妈。我们的代孕妈妈分布在洛杉矶、橙县、内陆帝国、圣迭戈、萨克拉门托、圣何塞及周边城市。') }}
            </p>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              {{ tt('You don’t need to live next to a fertility clinic. As long as you live in California and can travel for key appointments, our team will coordinate local monitoring, travel arrangements and reimbursements.', '你无需居住在生殖诊所附近。只要在加州并可配合关键就诊出行，我们会协调本地监测、出行安排与费用报销。') }}
            </p>
          </div>
          <div class="coverage-card">
            <div class="coverage-header">
              <span class="coverage-header__icon">
                CA
              </span>
              <span class="text-lg tracking-wide uppercase">{{ tt('Interactive coverage map', '互动覆盖地图') }}</span>
            </div>
            <div class="mb-6 flex flex-wrap gap-3">
              <button
                v-for="city in coverageCities"
                :key="city.id"
                type="button"
                class="coverage-chip"
                :class="{ 'coverage-chip--active': activeCity?.id === city.id }"
                @mouseenter="setActiveCity(city)"
                @focus="setActiveCity(city)"
              >
                {{ city.name }}
              </button>
            </div>
            <div class="relative overflow-hidden rounded-2xl bg-[var(--yunda-petal)] p-8">
              <svg
                class="h-56 w-full text-[var(--yunda-bark)] opacity-70"
                viewBox="0 0 200 220"
                fill="none"
                stroke="currentColor"
              >
                <path d="M50 25l90 20-10 35 20 80-40 30-30-10-25 15-30-40 10-60-20-40z" stroke-width="3" />
                <g v-for="city in coverageCities" :key="`dot-${city.id}`">
                  <circle
                    :cx="city.cx"
                    :cy="city.cy"
                    r="6"
                    class="map-dot"
                    :class="{ 'map-dot--active': activeCity?.id === city.id }"
                    tabindex="0"
                    @mouseenter="setActiveCity(city)"
                    @focus="setActiveCity(city)"
                  />
                </g>
              </svg>
              <div class="map-tooltip">
                <p class="map-tooltip__label">
                  {{ tt('Now highlighting', '当前显示') }}
                </p>
                <p class="text-2xl text-[var(--yunda-bark)] font-semibold" >
                  {{ activeCity?.name }}
                </p>
                <p class="text-sm text-[var(--primary-brown)]">
                  {{ activeCity?.area }}
                </p>
              </div>
            </div>
            <p class="coverage-note">
              {{ tt('Hover or tap on a city to see coverage details', '悬停或点击城市查看覆盖详情') }}
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- FAQ Section -->
    <section class="bg-white py-20">
      <div class="container mx-auto max-w-6xl px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-6 text-4xl text-[var(--yunda-bark)] font-bold md:text-5xl" >
            {{ tt('Surrogacy FAQs (Frequently Asked Questions)', '代孕常见问题（FAQ）') }}
          </h2>
        </div>

        <div class="space-y-6">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="overflow-hidden rounded-xl bg-[var(--yunda-petal)] shadow-lg"
          >
            <button
              class="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-[var(--yunda-bark)] hover:bg-opacity-20"
              @click="toggleFaq(index)"
            >
              <h3 class="pr-4 text-xl text-[var(--yunda-bark)] font-semibold">
                {{ faq.question }}
              </h3>
              <div class="flex-shrink-0">
                <svg
                  class="h-6 w-6 text-[var(--yunda-bark)] transition-transform duration-300" :class="[
                    expandedFaqs.includes(index) ? 'rotate-180' : '',
                  ]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </button>
            <div
              class="overflow-hidden transition-all duration-300" :class="[
                expandedFaqs.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0',
              ]"
            >
              <div class="px-6 pb-6">
                <p class="text-[var(--primary-brown)] leading-relaxed">
                  {{ faq.answer }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Final CTA Section -->
    <section class="bg-[var(--yunda-petal)] py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-10 text-center">
          <h2 class="text-3xl text-[var(--yunda-bark)] font-bold md:text-4xl" >
            {{ tt('How to Apply to Become a Surrogate in California', '如何在加州申请成为代孕妈妈') }}
          </h2>
          <p class="mt-4 text-lg text-[var(--primary-brown)] leading-relaxed">
            {{ tt('Follow these five simple steps to move from application to embryo transfer with confidence and full support.', '按照以下五个简单步骤，从申请到胚胎移植，信心十足且全程支持。') }}
          </p>
        </div>

        <div class="grid mb-16 gap-8 md:grid-cols-2">
          <div
            v-for="(step, index) in applicationSteps"
            :key="`${index}-${step.title}`"
            class="steps-card"
          >
            <div class="steps-card__indicator" />
            <div class="steps-card__meta">
              <span class="steps-card__badge">
                {{ tt('Step', '步骤') }} {{ index + 1 }}
              </span>
            </div>
            <h3 class="mb-3 text-2xl text-[var(--yunda-bark)] font-semibold" >
              {{ step.title }}
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        </div>

        <!-- Final Message -->
        <div class="rounded-xl bg-[var(--yunda-bark)] p-12 text-center">
          <h3 class="mb-6 text-3xl text-white font-bold" >
            {{ tt('Join the Most Trusted Surrogacy Program in California', '加入加州最值得信赖的代孕项目') }}
          </h3>
          <p class="mb-8 text-lg text-white leading-relaxed">
            {{ tt('Every life-changing story begins with one decision — to act with courage and compassion. By choosing to become a surrogate in California, you open the door to hope for another family while creating a new chapter for yourself.', '每个改变人生的故事都源于一个决定——以勇气与善意行动。选择在加州成为代孕妈妈，你为另一个家庭打开希望之门，也为自己开启新的篇章。') }}
          </p>
          <p class="mb-8 text-lg text-white leading-relaxed">
            {{ tt('At Yunda Surrogacy, we combine California\'s strong legal protection, excellent medical care, and heartfelt emotional support into one safe and rewarding experience. Our surrogates are heroes — ordinary women doing something extraordinary.', '在 Yunda，我们将加州强大的法律保护、优质的医疗照护与真诚的情感支持融合为一个安全且值得的体验。我们的代孕妈妈是英雄——平凡的女性做着非凡的事。') }}
          </p>
          <p class="mb-8 text-lg text-white leading-relaxed">
            {{ tt('If your heart tells you this is your time, don\'t wait. 💬 Apply today, and let\'s start this journey together. Because every miracle starts with one brave woman — and that woman could be you.', '如果你的内心告诉你现在就是时候，就别再等待。💬 现在申请，让我们一起开始这段旅程。每一个奇迹都始于一位勇敢的女性——而那个人可能就是你。') }}
          </p>
          <NuxtLink
            to="/be-surrogate"
            class="rounded-lg bg-white px-12 py-4 text-xl text-[var(--yunda-bark)] font-semibold shadow-lg transition-opacity hover:opacity-90"
          >
            {{ tt('Apply Today', '立即申请') }}
          </NuxtLink>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<style scoped>
/* 平滑滾動效果 */
html {
  scroll-behavior: smooth;
}

/* 自定義滾動條 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--yunda-petal);
}

::-webkit-scrollbar-thumb {
  background: var(--yunda-bark);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--primary-brown);
}

/* 懸停效果 */
.hover\:shadow-xl:hover {
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* 過渡動畫 */
.transition-shadow {
  transition: box-shadow 0.3s ease;
}

.transition-transform {
  transition: transform 0.3s ease;
}

.transition-colors {
  transition:
    color 0.3s ease,
    background-color 0.3s ease;
}

/* FAQ 動畫 */
.transition-all {
  transition: all 0.3s ease;
}

.coverage-chip {
  border: 1px solid rgba(169, 166, 125, 0.4);
  color: var(--primary-brown);
  border-radius: 9999px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.2s ease;
}

.coverage-chip--active {
  background: var(--yunda-bark);
  color: #fff;
  border-color: transparent;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.map-dot {
  fill: rgba(169, 166, 125, 0.4);
  transition:
    transform 0.2s ease,
    fill 0.2s ease;
}

.map-dot--active {
  fill: var(--yunda-bark);
  transform: scale(1.2);
}

.map-tooltip {
  position: absolute;
  left: 50%;
  bottom: 1.5rem;
  transform: translateX(-50%);
  background: white;
  border-radius: 1rem;
  padding: 0.75rem 1.5rem;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  text-align: center;
}

.coverage-badge {
  display: inline-flex;
  align-items: center;
  margin: 0 auto 0.75rem;
  padding: 0.25rem 1rem;
  border-radius: 9999px;
  background-color: var(--yunda-petal);
  color: var(--yunda-bark);
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.coverage-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  color: var(--yunda-bark);
}

.coverage-header__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--yunda-bark);
  border-radius: 9999px;
  font-weight: 600;
}

.map-tooltip__label {
  color: var(--yunda-bark);
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.coverage-note {
  color: var(--primary-brown);
  text-align: center;
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.coverage-card {
  border: 1px solid var(--yunda-petal);
  background: #fff;
  padding: 2.5rem;
  border-radius: 1.5rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

.steps-card {
  position: relative;
  overflow: hidden;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  box-shadow:
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -4px rgba(0, 0, 0, 0.1);
}

.steps-card__indicator {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 0.375rem;
  background: var(--yunda-bark);
}

.steps-card__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: var(--yunda-bark);
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.steps-card__badge {
  border: 1px solid var(--yunda-bark);
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-weight: 600;
}

/* 背景圖案動畫 */
@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.absolute.top-20.left-10 {
  animation: float 6s ease-in-out infinite;
}

.absolute.top-40.right-20 {
  animation: float 8s ease-in-out infinite;
}

.absolute.bottom-20.left-1\/4 {
  animation: float 7s ease-in-out infinite;
}
</style>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { buildFAQPageSchema, buildHowToSchema } from '~/utils/schema'

// SEO 配置
const pageTitle = 'Become a Surrogate in California | Requirements & Surrogate Pay'
const pageDescription = 'Become a surrogate mother in California with Yunda Surrogacy. Enjoy safe, legal, and rewarding gestational surrogacy, full support.'

useHead({
  title: pageTitle,
  meta: [
    {
      name: 'description',
      content: pageDescription,
    },
    {
      property: 'og:title',
      content: pageDescription,
    },
    {
      property: 'og:description',
      content: 'Learn California surrogate mother requirements, surrogate pay ranges and application steps. Yunda Surrogacy supports Southern California surrogates with full legal and medical guidance..',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'keywords',
      content: 'surrogate mother California, gestational surrogacy California, surrogacy agency California, surrogate compensation California',
    },
  ],
})

const { locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

// FAQ 數據
const faqs = reactive([
  {
    question: 'What does "surrogate" mean?',
    answer: 'A surrogate is a woman who carries a baby for someone who cannot do it on their own. She helps the intended parents bring a child into the world by carrying the pregnancy and giving birth on their behalf. In gestational surrogacy, the surrogate is not genetically related to the baby — she simply provides a safe and caring environment for the baby to grow.',
  },
  {
    question: 'Is surrogacy legal in California?',
    answer: 'Yes, surrogacy in California is completely legal and highly protected by state law. California is known as one of the most surrogate-friendly states in the U.S. Both gestational surrogacy and compensated surrogacy are recognized and supported here. The law ensures that every surrogate mother\'s rights are clear and respected, and that intended parents become the baby\'s legal parents through a court order before birth. This legal foundation makes California one of the safest places in the world to become a surrogate.',
  },
  {
    question: 'How much do surrogates get paid in California?',
    answer: 'Compensation for surrogate mothers in California depends on experience, location, and personal circumstances. Most surrogates receive total compensation in the range of $60,000 to $80,000, with additional allowances for maternity needs, travel, and childcare. Yunda Surrogacy ensures that every surrogate\'s pay is transparent, fair, and protected by legal contracts and secure trust accounts. The financial side is handled carefully, so you can focus on your health and the joy of the journey.',
  },
  {
    question: 'How do I apply to be a surrogate in California?',
    answer: 'To apply to become a surrogate in California with Yunda Surrogacy, start by filling out our online application form. After submitting your application, our team will review it and reach out to schedule an initial phone consultation. If you meet the basic requirements, we will guide you through the next steps, including medical and psychological screenings, legal consultations, and matching with intended parents. Throughout the process, we provide full support and clear communication to ensure you feel confident and cared for every step of the way.',
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
const applicationSteps = [
  {
    title: 'Complete a short surrogate application',
    description: 'Fill out our secure online surrogate application with basic health and pregnancy history. It takes just a few minutes.',
  },
  {
    title: 'Quick eligibility review',
    description: 'Our team reviews your answers against California surrogate mother requirements and schedules a short call if you qualify.',
  },
  {
    title: 'Medical and psychological screening',
    description: 'We coordinate OB/GYN records, fertility tests and a counseling session to make sure you feel ready and supported.',
  },
  {
    title: 'Match with intended parents and sign your contract',
    description: 'You’ll meet a family who fits your preferences and work with your own lawyer to review and sign the surrogacy agreement.',
  },
  {
    title: 'Begin your IVF cycle and pregnancy',
    description: 'Once everything is approved, you start medications, embryo transfer and prenatal care with full support from the Yunda team.',
  },
]

const coverageCities = [
  { name: 'Los Angeles', area: 'Southern California — Los Angeles County', cx: 85, cy: 145 },
  { name: 'Orange County', area: 'Southern California — Beach Cities & OC', cx: 100, cy: 150 },
  { name: 'Inland Empire', area: 'Southern California — Riverside & San Bernardino', cx: 115, cy: 130 },
  { name: 'San Diego', area: 'Southern California — Coastal & North County', cx: 105, cy: 180 },
  { name: 'Sacramento', area: 'Northern California — Capital Region', cx: 85, cy: 80 },
  { name: 'San Jose & Bay Area', area: 'Northern California — Silicon Valley & Bay Area', cx: 65, cy: 95 },
]

const activeCity = ref(coverageCities[0])

function setActiveCity(city: typeof coverageCities[number]) {
  activeCity.value = city
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

const howToSteps = computed(() => applicationSteps.map((step, index) => ({
  title: `Step ${index + 1}: ${step.title}`,
  text: step.description,
})))

const faqSchemaItems = computed(() => faqs.map(faq => ({
  question: faq.question,
  answer: faq.answer,
})))

const howToSchema = computed(() => buildHowToSchema({
  name: pageTitle,
  description: pageDescription,
  steps: howToSteps.value,
  baseUrl: siteUrl.value || undefined,
  url: '/become-surrogate-california',
  locale: locale.value,
}))

const faqSchema = computed(() => buildFAQPageSchema({
  name: 'California Surrogacy FAQ',
  description: 'Answers to common questions about becoming a surrogate in California.',
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
  <div class="min-h-screen bg-[var(--head-bg)]">
    <!-- 滾動進度條 -->
    <div class="fixed left-0 top-0 z-50 h-1 w-full bg-gray-200">
      <div
        class="h-full bg-[var(--grayish-green)] transition-all duration-300 ease-out"
        :style="{ width: `${scrollProgress}%` }"
      />
    </div>

    <AppHeader />

    <!-- Hero Section -->
    <section class="relative overflow-hidden from-[var(--light-cream)] to-[var(--head-bg)] bg-gradient-to-b py-20">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute left-10 top-20 h-32 w-32 rounded-full bg-[var(--grayish-green)]" />
        <div class="absolute right-20 top-40 h-24 w-24 rounded-full bg-[var(--primary-brown)]" />
        <div class="absolute bottom-20 left-1/4 h-20 w-20 rounded-full bg-[var(--olive-green)]" />
      </div>

      <div class="container relative z-10 mx-auto max-w-7xl px-4">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div class="text-center lg:text-left">
            <h1 class="mb-6 text-5xl text-[var(--dark-brown)] font-bold leading-tight md:text-7xl" style="font-family: var(--font-primary)">
              Become a Surrogate in California: Requirements, Pay and Support
            </h1>
            <p class="mb-8 text-xl text-[var(--primary-brown)] leading-relaxed md:text-2xl">
              Becoming a surrogate in California is more than a journey — it's a gift of love and compassion. Many women choose this path because they want to help others build families while reaching new goals for themselves.
            </p>
            <p class="mb-8 text-lg text-[var(--primary-brown)] leading-relaxed md:text-xl">
              Most surrogates are women 21–39 who have had at least one healthy full-term birth and live a stable, healthy lifestyle. In California, total surrogate pay is typically in the mid–five figures with additional benefits for maternity needs, travel and childcare. With Yunda, you get clear requirements, transparent compensation and full legal and medical support from day one.
            </p>
            <div class="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <NuxtLink
                to="/be-surrogate"
                class="transform rounded-lg bg-[var(--grayish-green)] px-8 py-4 text-lg text-white font-semibold shadow-lg transition-opacity transition-transform hover:scale-105 hover:opacity-90"
              >
                Apply to Become a Surrogate
              </NuxtLink>
              <button
                class="border-2 border-[var(--grayish-green)] rounded-lg px-8 py-4 text-lg text-[var(--grayish-green)] font-semibold transition-colors hover:bg-[var(--grayish-green)] hover:text-white"
                @click="scrollToSection('requirements')"
              >
                Check Requirements
              </button>
            </div>
          </div>

          <!-- Hero Image Placeholder -->
          <div class="relative">
            <div class="rounded-2xl from-[var(--light-cream)] to-[var(--grayish-green)] bg-gradient-to-br p-8 shadow-2xl">
              <div class="aspect-square flex items-center justify-center border-2 border-[var(--grayish-green)] rounded-xl border-dashed bg-white">
                <div class="text-center">
                  <img src="/images/california-surrogate-mother.jpg" alt="California Surrogate Mother">
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
        <div class="prose-lg max-w-none text-center prose">
          <p class="mb-8 text-xl text-[var(--primary-brown)] leading-relaxed">
            As a surrogate mother, you open the door to someone's dream of parenthood. You bring hope, joy, and life into a story that might not exist without you.
          </p>
          <p class="mb-8 text-lg text-[var(--primary-brown)] leading-relaxed">
            At Yunda Surrogacy, we make sure every surrogate feels respected, supported, and protected. California is one of the most surrogate-friendly states in the U.S., offering strong legal protection and excellent medical care. Here, you can safely begin your surrogacy journey with confidence.
          </p>
          <p class="mb-8 text-lg text-[var(--primary-brown)] leading-relaxed">
            Our team walks beside every woman who decides to become a surrogate in California. From the first call to the moment a baby arrives, we make sure you feel valued and cared for. Many surrogates say the experience changes their lives — not only because of the financial rewards but also because of the deep emotional fulfillment that comes from helping another family grow.
          </p>
          <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
            If you've ever felt called to do something meaningful, this may be the moment. Becoming a surrogate mother lets you share your strength, kindness, and heart in a way few others can.
          </p>
        </div>
      </div>
    </section>

    <!-- What Is Surrogacy Section -->
    <section class="bg-[var(--head-bg)] py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-6 text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            What Is Surrogacy and Who Can Become a Surrogate Mother?
          </h2>
        </div>

        <div class="grid mb-16 gap-12 lg:grid-cols-2">
          <!-- Understanding Gestational Surrogacy -->
          <div class="rounded-xl bg-white p-8 shadow-lg">
            <h3 class="mb-6 text-2xl text-[var(--dark-brown)] font-bold" style="font-family: var(--font-primary)">
              Understanding Gestational Surrogacy in California
            </h3>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              Surrogacy means carrying a baby for someone who cannot do it on their own. In gestational surrogacy, which is the model used in California, the surrogate carries a baby created from the intended parents’ or donors’ embryos and is not genetically related to the child.
            </p>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              California is known for leading the way in gestational surrogacy. The process is well-supported by experienced fertility specialists, legal experts, and caring surrogacy agencies. This makes the entire journey smoother and safer for every surrogate mother.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              When you become a surrogate in California, you can expect clear communication, medical guidance, and emotional support every step of the way. Many surrogates describe this as one of the most meaningful experiences of their lives — a chance to help another family while doing something they genuinely love.
            </p>
          </div>

          <!-- Why California Is the Best State -->
          <div class="rounded-xl bg-white p-8 shadow-lg">
            <h3 class="mb-6 text-2xl text-[var(--dark-brown)] font-bold" style="font-family: var(--font-primary)">
              Why California Is the Best State for Surrogacy
            </h3>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              Surrogacy in California is fully legal and highly protected by state law, which is why many women choose to become surrogates here.There's a reason California is often called the heart of surrogacy in the United States. The state offers some of the most surrogate-friendly laws in the world, ensuring that both surrogates and intended parents are fully protected. Legal agreements are clear, compensation is transparent, and every surrogate's rights are respected.
            </p>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              Beyond the laws, California also provides outstanding fertility care. With advanced medical centers, supportive surrogacy professionals, and a diverse community of experienced surrogates, the environment here is ideal for this life-changing journey.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              For many women, becoming a surrogate mother in California means joining a warm, supportive network — one that values compassion, respect, and trust. You're not just helping others have a child; you're becoming part of a community that celebrates the beauty of giving life.
            </p>
          </div>
        </div>

        <!-- Image Placeholder -->
        <div class="rounded-2xl from-[var(--light-cream)] to-[var(--grayish-green)] bg-gradient-to-r p-8 shadow-lg">
          <div class="aspect-video flex items-center justify-center border-2 border-[var(--grayish-green)] rounded-xl border-dashed bg-white">
            <div class="text-center">
              <img src="/images/california-surrogacy-process.jpg" alt="California Surrogacy Mother">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Yunda Section -->
    <section class="bg-white py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-6 text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Why Become a Surrogate Mother with Yunda Surrogacy
          </h2>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            Choosing to become a surrogate in California is a big decision — one that deserves care, trust, and the right support system. At Yunda Surrogacy, we believe every surrogate mother should feel respected, valued, and empowered throughout her journey.
          </p>
        </div>

        <div class="grid mb-16 gap-8 lg:grid-cols-3">
          <!-- Emotional and Financial Rewards -->
          <div class="group cursor-pointer rounded-xl bg-[var(--light-cream)] p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-[var(--grayish-green)] transition-colors duration-300 group-hover:bg-[var(--primary-brown)]">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h3 class="mb-4 text-xl text-[var(--dark-brown)] font-bold transition-colors duration-300 group-hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
              Emotional Rewards and Fair Surrogate Pay
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              Alongside emotional fulfillment, surrogate pay in California reflects the time, risk and commitment you invest.Surrogacy changes lives — not just for the families you help but also for you as a surrogate mother. Many women say it's one of the most fulfilling things they've ever done.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              Alongside emotional fulfillment, surrogacy offers strong financial benefits. In California, surrogate mothers receive compensation that reflects their commitment, time, and dedication.
            </p>
          </div>

          <!-- Supportive Agency -->
          <div class="group cursor-pointer rounded-xl bg-[var(--light-cream)] p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-[var(--grayish-green)] transition-colors duration-300 group-hover:bg-[var(--primary-brown)]">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="mb-4 text-xl text-[var(--dark-brown)] font-bold transition-colors duration-300 group-hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
              A Supportive and Ethical Agency
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              Not every agency treats surrogate mothers the same way. At Yunda Surrogacy, our focus is always on your well-being. We follow strict ethical standards to ensure fairness, safety, and open communication.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              You'll never feel like "just a number." You'll have a dedicated coordinator who knows your name, understands your needs, and keeps in touch with you every week.
            </p>
          </div>

          <!-- Meaningful Journey -->
          <div class="group cursor-pointer rounded-xl bg-[var(--light-cream)] p-8 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-[var(--grayish-green)] transition-colors duration-300 group-hover:bg-[var(--primary-brown)]">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="mb-4 text-xl text-[var(--dark-brown)] font-bold transition-colors duration-300 group-hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
              A Journey Filled with Meaning
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              Being a surrogate mother is about more than carrying a child — it's about carrying hope, love, and courage. Every pregnancy is a promise fulfilled for someone who has been waiting for years.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              Our team takes care of every detail so you can focus on what you do best — creating life. From your first call to the moment of delivery, we guide you with compassion, honesty, and expertise.
            </p>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="rounded-xl bg-[var(--grayish-green)] p-12 text-center">
          <h3 class="mb-6 text-3xl text-white font-bold" style="font-family: var(--font-primary)">
            Ready to do something extraordinary?
          </h3>
          <p class="mb-8 text-lg text-white">
            Join Yunda Surrogacy and become a surrogate mother in California — where your kindness changes lives, and your courage inspires new beginnings.
          </p>
          <NuxtLink
            to="/be-surrogate"
            class="rounded-lg bg-white px-12 py-4 text-xl text-[var(--grayish-green)] font-semibold shadow-lg transition-opacity hover:opacity-90"
          >
            Start Your Journey
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section id="stats-section" class="bg-[var(--grayish-green)] py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-6 text-4xl text-white font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Why California Surrogates Choose Yunda
          </h2>
          <p class="mx-auto max-w-4xl text-xl text-white leading-relaxed opacity-90">
            Join thousands of women who have found fulfillment and financial security through our California surrogacy program
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
            <div class="mb-2 text-5xl text-white font-bold" style="font-family: var(--font-primary)">
              ${{ animatedNumbers.compensation.toLocaleString() }}+
            </div>
            <h3 class="mb-2 text-xl text-white font-semibold">
              Average Compensation
            </h3>
            <p class="text-white opacity-90">
              Total compensation package including base pay and allowances
            </p>
          </div>

          <!-- Years of Experience -->
          <div class="rounded-xl bg-white bg-opacity-20 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30">
            <div class="mx-auto mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-white bg-opacity-20">
              <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="mb-2 text-5xl text-white font-bold" style="font-family: var(--font-primary)">
              {{ animatedNumbers.years }}+
            </div>
            <h3 class="mb-2 text-xl text-white font-semibold">
              Years of Experience
            </h3>
            <p class="text-white opacity-90">
              Helping families achieve their dreams through surrogacy
            </p>
          </div>

          <!-- Families Helped -->
          <div class="rounded-xl bg-white bg-opacity-20 p-8 text-center backdrop-blur-sm transition-all duration-300 hover:bg-opacity-30">
            <div class="mx-auto mb-6 h-20 w-20 flex items-center justify-center rounded-full bg-white bg-opacity-20">
              <svg class="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div class="mb-2 text-5xl text-white font-bold" style="font-family: var(--font-primary)">
              {{ animatedNumbers.families.toLocaleString() }}+
            </div>
            <h3 class="mb-2 text-xl text-white font-semibold">
              Families Helped
            </h3>
            <p class="text-white opacity-90">
              Successful surrogacy journeys completed
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Compensation Section -->
    <section class="bg-[var(--head-bg)] py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-6 text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Surrogate Compensation and Benefits in California
          </h2>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            California has long been the gold standard for surrogate compensation. Clear surrogacy laws and secured trust accounts mean your surrogate pay is guaranteed, paid on time and fully outlined in your contract from the start.
            <br>At Yunda Surrogacy, we make sure every woman understands what her dedication and care are truly worth. California’s legal and medical environment allows us to offer compensation packages that recognize your time, effort, and heart. You can feel confident knowing your work is honored with fairness and respect from the very start.
          </p>
        </div>

        <div class="grid mb-16 gap-12 lg:grid-cols-2">
          <!-- How Compensation Works -->
          <div class="rounded-xl bg-white p-8 shadow-lg">
            <h3 class="mb-6 text-2xl text-[var(--dark-brown)] font-bold" style="font-family: var(--font-primary)">
              How Surrogate Compensation and Pay Work in California
            </h3>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              In California, surrogate compensation is designed to reflect both your commitment and your comfort. Every surrogate receives a base pay plus additional allowances for health care, maternity needs, travel, and more.
            </p>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              While each journey is unique, most surrogates earn a range that reflects California's leadership in fair and ethical compensation. The total value typically falls within the high five figures, depending on experience, location, and personal circumstances.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              Unlike many other states, California ensures that surrogates are paid through secured trust accounts, managed by licensed professionals. This means your compensation is guaranteed and handled with complete transparency.
            </p>
          </div>

          <!-- Benefits Beyond Financial -->
          <div class="rounded-xl bg-white p-8 shadow-lg">
            <h3 class="mb-6 text-2xl text-[var(--dark-brown)] font-bold" style="font-family: var(--font-primary)">
              Benefits Beyond Surrogate Pay
            </h3>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              Being a surrogate mother in California comes with much more than just pay. You gain access to top-tier medical care from some of the country's most experienced fertility specialists.
            </p>
            <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
              At Yunda Surrogacy, every surrogate also enjoys personalized care — regular wellness check-ins, flexible scheduling, and 24/7 communication with your coordinator.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              You'll also join a network of strong women across California who share the same purpose: helping families grow. Many of them stay connected long after their surrogacy experience.
            </p>
          </div>
        </div>

        <!-- Why California Offers Best Conditions -->
        <div class="mb-16 rounded-xl bg-white p-8 shadow-lg">
          <h3 class="mb-6 text-2xl text-[var(--dark-brown)] font-bold" style="font-family: var(--font-primary)">
            Why California Offers the Best Conditions for Surrogates
          </h3>
          <div class="grid gap-8 md:grid-cols-2">
            <div>
              <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
                California leads the nation in surrogacy for good reason. The state's family laws fully recognize gestational surrogacy, making the process legal, protected, and emotionally safe for all parties.
              </p>
              <p class="text-[var(--primary-brown)] leading-relaxed">
                Courts issue pre-birth parentage orders, which means everyone's rights — including yours — are clearly defined before delivery.
              </p>
            </div>
            <div>
              <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
                The culture in California is also uniquely supportive. People here understand and respect surrogates, seeing them as heroes who help bring love into the world.
              </p>
              <p class="text-[var(--primary-brown)] leading-relaxed">
                With open-minded communities, professional medical infrastructure, and world-class mental health resources, California truly stands apart as the safest and most rewarding place to be a surrogate.
              </p>
            </div>
          </div>
        </div>

        <!-- Compensation Image Placeholder -->
        <div class="rounded-2xl from-[var(--light-cream)] to-[var(--grayish-green)] bg-gradient-to-r p-8 shadow-lg">
          <div class="aspect-video flex items-center justify-center border-2 border-[var(--grayish-green)] rounded-xl border-dashed bg-white">
            <div class="text-center">
              <img src="/images/Compensation-Benefits.jpg" alt="California Surrogacy Compensation & Benefits">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Requirements Section -->
    <section id="requirements" class="bg-white py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-6 text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Surrogate Requirements: Who Qualifies to Become a Surrogate in California
          </h2>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            Becoming a surrogate mother in California is a special calling — one that takes love, strength, and a deep sense of purpose. California welcomes women who want to help others grow their families while building something meaningful for themselves.
          </p>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            We welcome surrogates from across Southern California and Northern California, including Los Angeles, Orange County, surrounding areas. If you’re unsure whether your city is covered, our team can confirm it in a short call.
          </p>
        </div>

        <div class="grid mb-16 gap-8 lg:grid-cols-3">
          <!-- Basic Qualifications -->
          <div class="rounded-xl bg-[var(--light-cream)] p-8 shadow-lg">
            <h3 class="mb-6 text-xl text-[var(--dark-brown)] font-bold" style="font-family: var(--font-primary)">
              Basic Qualifications for Surrogates in California
            </h3>
            <ul class="text-[var(--primary-brown)] space-y-4">
              <li class="flex items-start">
                <span class="mr-3 mt-1 text-[var(--grayish-green)]">✓</span>
                <span>Between 21 and 39 years old</span>
              </li>
              <li class="flex items-start">
                <span class="mr-3 mt-1 text-[var(--grayish-green)]">✓</span>
                <span>U.S. citizens or permanent residents</span>
              </li>
              <li class="flex items-start">
                <span class="mr-3 mt-1 text-[var(--grayish-green)]">✓</span>
                <span>Have given birth to at least one healthy, full-term baby</span>
              </li>
              <li class="flex items-start">
                <span class="mr-3 mt-1 text-[var(--grayish-green)]">✓</span>
                <span>Living a healthy lifestyle — no smoking, no drug use</span>
              </li>
              <li class="flex items-start">
                <span class="mr-3 mt-1 text-[var(--grayish-green)]">✓</span>
                <span>Free from major medical or psychological conditions</span>
              </li>
              <li class="flex items-start">
                <span class="mr-3 mt-1 text-[var(--grayish-green)]">✓</span>
                <span>Supported by family or a stable home environment</span>
              </li>
            </ul>
          </div>

          <!-- Health and Emotional Screening -->
          <div class="rounded-xl bg-[var(--light-cream)] p-8 shadow-lg">
            <h3 class="mb-6 text-xl text-[var(--dark-brown)] font-bold" style="font-family: var(--font-primary)">
              Health and Emotional Screening
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              Every surrogate mother deserves full support — medically and emotionally. California requires thorough health evaluations before the surrogacy journey begins. This includes physical exams, OB/GYN records review, and sometimes additional fertility tests.
            </p>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              Equally important is emotional readiness. We work with licensed counselors who talk with you about your motivation, expectations, and support network. This isn’t a test — it’s a conversation to make sure you feel confident and supported from the very first step.
            </p>
          </div>

          <!-- Legal and Financial Security -->
          <div class="rounded-xl bg-[var(--light-cream)] p-8 shadow-lg">
            <h3 class="mb-6 text-xl text-[var(--dark-brown)] font-bold" style="font-family: var(--font-primary)">
              Legal and Financial Security for California Surrogates
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              One of the reasons so many women choose surrogacy in California is because the state protects surrogates better than anywhere else. From clear legal contracts to guaranteed compensation, every part of the process is designed with your safety in mind.
            </p>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              Before you start your journey, you'll meet with an independent attorney who represents you — at no cost. Your lawyer will review your agreement, explain your rights, and make sure every payment and condition is fair and transparent.
            </p>
          </div>
        </div>

        <!-- Why California Surrogates Stand Out -->
        <div class="border-2 border-[var(--grayish-green)] rounded-xl bg-white p-8 shadow-lg">
          <h3 class="mb-6 text-2xl text-[var(--dark-brown)] font-bold" style="font-family: var(--font-primary)">
            Why California Surrogates Stand Out
          </h3>
          <div class="grid gap-8 md:grid-cols-2">
            <div>
              <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
                California surrogates are known for their compassion, strength, and professionalism. Many women here have been through the process more than once — not for money, but because they loved helping others so much the first time.
              </p>
            </div>
            <div>
              <p class="text-[var(--primary-brown)] leading-relaxed">
                The state's surrogacy community is also incredibly connected. You'll find online and local support groups where women share experiences, celebrate milestones, and help new surrogates feel welcome.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Support System Section -->
    <section class="bg-[var(--head-bg)] py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-6 text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Your Support System: Legal, Medical, and Emotional Care
          </h2>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            When you become a surrogate in California, you deserve to feel safe, supported, and valued at every step. Yunda Surrogacy was built around one simple promise — to take care of our surrogate mothers like family.
          </p>
        </div>

        <div class="grid mb-16 gap-8 lg:grid-cols-3">
          <!-- Legal Protection -->
          <div class="rounded-xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
            <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-[var(--grayish-green)]">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="mb-4 text-xl text-[var(--dark-brown)] font-bold" style="font-family: var(--font-primary)">
              Legal Protection You Can Count On in California
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              California is the most surrogate-friendly state in the U.S., and its laws are clear and protective. From the start, every surrogate mother works with her own independent attorney, paid for by the intended parents.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              California's surrogacy laws allow for pre-birth orders, meaning legal parentage is established before the baby is born. This gives both you and the intended parents full clarity and protection.
            </p>
          </div>

          <!-- Medical Care -->
          <div class="rounded-xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
            <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-[var(--grayish-green)]">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="mb-4 text-xl text-[var(--dark-brown)] font-bold" style="font-family: var(--font-primary)">
              Medical Care from California's Best Specialists
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              California has some of the world's most advanced fertility and maternity care. As a gestational surrogate, you'll receive personalized medical attention from top fertility doctors and OB/GYNs.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              Every medical appointment, procedure, and test is carefully coordinated by your case manager, so you never have to navigate it alone.
            </p>
          </div>

          <!-- Emotional Care -->
          <div class="rounded-xl bg-white p-8 shadow-lg transition-shadow hover:shadow-xl">
            <div class="mb-6 h-16 w-16 flex items-center justify-center rounded-full bg-[var(--grayish-green)]">
              <svg class="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 class="mb-4 text-xl text-[var(--dark-brown)] font-bold" style="font-family: var(--font-primary)">
              Emotional Care and Community Connection
            </h3>
            <p class="mb-4 text-[var(--primary-brown)] leading-relaxed">
              The surrogacy journey is emotional — filled with joy, hope, and sometimes a few nerves. That's why emotional support is just as important as medical care.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              At Yunda Surrogacy, every surrogate mother in California has access to licensed counselors and peer mentors throughout the process.
            </p>
          </div>
        </div>

        <!-- The Yunda Difference -->
        <div class="mb-16 border-2 border-[var(--grayish-green)] rounded-xl bg-white p-8 shadow-lg">
          <h3 class="mb-6 text-2xl text-[var(--dark-brown)] font-bold" style="font-family: var(--font-primary)">
            The Yunda Difference
          </h3>
          <div class="grid gap-8 md:grid-cols-2">
            <div>
              <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
                At Yunda Surrogacy, we combine California's strong legal foundation with our own personal approach. We listen. We care. We stay by your side from the first call to the last hug. Our mission is to make sure every surrogate mother feels protected, appreciated, and proud of her journey.
              </p>
              <p class="text-[var(--primary-brown)] leading-relaxed">
                Surrogacy in California works so well because it's built on trust — between the surrogate, the agency, the medical team, and the intended parents. Yunda Surrogacy keeps that trust strong by offering clear communication, transparent compensation, and heartfelt gratitude for everything you do.
              </p>
            </div>
            <div>
              <p class="mb-6 text-[var(--primary-brown)] leading-relaxed">
                Becoming a surrogate mother in California isn't just about helping others — it's about being part of something bigger, something beautiful. With Yunda Surrogacy, you'll always have a strong support system, every step of the way.
              </p>
              <div class="rounded-lg bg-[var(--light-cream)] p-6">
                <h4 class="mb-3 text-lg text-[var(--dark-brown)] font-semibold">
                  Our Promise to You:
                </h4>
                <ul class="text-[var(--primary-brown)] space-y-2">
                  <li class="flex items-center">
                    <span class="mr-2 text-[var(--grayish-green)]">✓</span>
                    <span>Personalized care and attention</span>
                  </li>
                  <li class="flex items-center">
                    <span class="mr-2 text-[var(--grayish-green)]">✓</span>
                    <span>24/7 support and communication</span>
                  </li>
                  <li class="flex items-center">
                    <span class="mr-2 text-[var(--grayish-green)]">✓</span>
                    <span>Transparent and fair compensation</span>
                  </li>
                  <li class="flex items-center">
                    <span class="mr-2 text-[var(--grayish-green)]">✓</span>
                    <span>Complete legal protection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Support System Image Placeholder -->
        <div class="rounded-2xl from-[var(--light-cream)] to-[var(--grayish-green)] bg-gradient-to-r p-8 shadow-lg">
          <div class="aspect-video flex items-center justify-center border-2 border-[var(--grayish-green)] rounded-xl border-dashed bg-white">
            <div class="text-center">
              <img src="/images/Legal-Medical-Emotional-Care.jpg" alt="California Surrogacy Legal, Medical & Emotional Care" class="h-full w-full object-cover">
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
            California coverage
          </p>
          <h2 class="text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Where in California You Can Be a Surrogate
          </h2>
        </div>
        <div class="grid gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div class="rounded-3xl bg-[var(--head-bg)] p-10 shadow-lg">
            <p class="mb-6 text-lg text-[var(--primary-brown)] leading-relaxed">
              Yunda works with surrogates across Southern California and Northern California. Many of our surrogates live in Los Angeles, Orange County, Inland Empire, San Diego, Sacramento, San Jose and nearby cities.
            </p>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              You don’t need to live next to a fertility clinic. As long as you live in California and can travel for key appointments, our team will coordinate local monitoring, travel arrangements and reimbursements.
            </p>
          </div>
          <div class="coverage-card">
            <div class="coverage-header">
              <span class="coverage-header__icon">
                CA
              </span>
              <span class="text-lg tracking-wide uppercase">Interactive coverage map</span>
            </div>
            <div class="mb-6 flex flex-wrap gap-3">
              <button
                v-for="city in coverageCities"
                :key="city.name"
                type="button"
                class="coverage-chip"
                :class="{ 'coverage-chip--active': activeCity?.name === city.name }"
                @mouseenter="setActiveCity(city)"
                @focus="setActiveCity(city)"
              >
                {{ city.name }}
              </button>
            </div>
            <div class="relative overflow-hidden rounded-2xl bg-[var(--head-bg)] p-8">
              <svg
                class="h-56 w-full text-[var(--grayish-green)] opacity-70"
                viewBox="0 0 200 220"
                fill="none"
                stroke="currentColor"
              >
                <path d="M50 25l90 20-10 35 20 80-40 30-30-10-25 15-30-40 10-60-20-40z" stroke-width="3" />
                <g v-for="city in coverageCities" :key="`dot-${city.name}`">
                  <circle
                    :cx="city.cx"
                    :cy="city.cy"
                    r="6"
                    class="map-dot"
                    :class="{ 'map-dot--active': activeCity?.name === city.name }"
                    tabindex="0"
                    @mouseenter="setActiveCity(city)"
                    @focus="setActiveCity(city)"
                  />
                </g>
              </svg>
              <div class="map-tooltip">
                <p class="map-tooltip__label">
                  Now highlighting
                </p>
                <p class="text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
                  {{ activeCity?.name }}
                </p>
                <p class="text-sm text-[var(--primary-brown)]">
                  {{ activeCity?.area }}
                </p>
              </div>
            </div>
            <p class="coverage-note">
              Hover or tap on a city to see coverage details
            </p>
          </div>
        </div>
      </div>
    </section>
    <!-- FAQ Section -->
    <section class="bg-white py-20">
      <div class="container mx-auto max-w-6xl px-4">
        <div class="mb-16 text-center">
          <h2 class="mb-6 text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Surrogacy FAQs (Frequently Asked Questions)
          </h2>
        </div>

        <div class="space-y-6">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="overflow-hidden rounded-xl bg-[var(--light-cream)] shadow-lg"
          >
            <button
              class="w-full flex items-center justify-between p-6 text-left transition-colors hover:bg-[var(--grayish-green)] hover:bg-opacity-20"
              @click="toggleFaq(index)"
            >
              <h3 class="pr-4 text-xl text-[var(--dark-brown)] font-semibold">
                {{ faq.question }}
              </h3>
              <div class="flex-shrink-0">
                <svg
                  class="h-6 w-6 text-[var(--grayish-green)] transition-transform duration-300" :class="[
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
    <section class="bg-[var(--head-bg)] py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-10 text-center">
          <h2 class="text-3xl text-[var(--dark-brown)] font-bold md:text-4xl" style="font-family: var(--font-primary)">
            How to Apply to Become a Surrogate in California
          </h2>
          <p class="mt-4 text-lg text-[var(--primary-brown)] leading-relaxed">
            Follow these five simple steps to move from application to embryo transfer with confidence and full support.
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
                Step {{ index + 1 }}
              </span>
            </div>
            <h3 class="mb-3 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              {{ step.title }}
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              {{ step.description }}
            </p>
          </div>
        </div>

        <!-- Final Message -->
        <div class="rounded-xl bg-[var(--grayish-green)] p-12 text-center">
          <h3 class="mb-6 text-3xl text-white font-bold" style="font-family: var(--font-primary)">
            Join the Most Trusted Surrogacy Program in California
          </h3>
          <p class="mb-8 text-lg text-white leading-relaxed">
            Every life-changing story begins with one decision — to act with courage and compassion. By choosing to become a surrogate in California, you open the door to hope for another family while creating a new chapter for yourself.
          </p>
          <p class="mb-8 text-lg text-white leading-relaxed">
            At Yunda Surrogacy, we combine California's strong legal protection, excellent medical care, and heartfelt emotional support into one safe and rewarding experience. Our surrogates are heroes — ordinary women doing something extraordinary.
          </p>
          <p class="mb-8 text-lg text-white leading-relaxed">
            If your heart tells you this is your time, don't wait. 💬 Apply today, and let's start this journey together. Because every miracle starts with one brave woman — and that woman could be you.
          </p>
          <NuxtLink
            to="/be-surrogate"
            class="rounded-lg bg-white px-12 py-4 text-xl text-[var(--grayish-green)] font-semibold shadow-lg transition-opacity hover:opacity-90"
          >
            Apply Today
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
  background: var(--light-cream);
}

::-webkit-scrollbar-thumb {
  background: var(--grayish-green);
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
  background: var(--grayish-green);
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
  fill: var(--grayish-green);
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
  background-color: var(--light-cream);
  color: var(--grayish-green);
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.coverage-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
  color: var(--grayish-green);
}

.coverage-header__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1px solid var(--grayish-green);
  border-radius: 9999px;
  font-weight: 600;
}

.map-tooltip__label {
  color: var(--grayish-green);
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
  border: 1px solid var(--light-cream);
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
  background: var(--grayish-green);
}

.steps-card__meta {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
  color: var(--grayish-green);
  font-size: 0.875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.steps-card__badge {
  border: 1px solid var(--grayish-green);
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

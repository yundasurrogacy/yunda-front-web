<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/base/AppHeader.vue'
import AppFooter from '@/components/base/AppFooter.vue'

const { t } = useI18n()

// SEO 配置
useHead({
  title: 'Become a Surrogate in California | Safe, Legal & Rewarding Surrogacy with Yunda',
  meta: [
    {
      name: 'description',
      content: 'Become a surrogate mother in California with Yunda Surrogacy. Enjoy safe, legal, and rewarding gestational surrogacy, full support, and transparent compensation.',
    },
    {
      property: 'og:title',
      content: 'Become a Surrogate in California | Safe, Legal & Rewarding Surrogacy with Yunda',
    },
    {
      property: 'og:description',
      content: 'Become a surrogate mother in California with Yunda Surrogacy. Enjoy safe, legal, and rewarding gestational surrogacy, full support, and transparent compensation.',
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

// FAQ 數據
const faqs = reactive([
  {
    question: 'What does "surrogate" mean?',
    answer: 'A surrogate is a woman who carries a baby for someone who cannot do it on their own. She helps the intended parents bring a child into the world by carrying the pregnancy and giving birth on their behalf. In gestational surrogacy, the surrogate is not genetically related to the baby — she simply provides a safe and caring environment for the baby to grow.'
  },
  {
    question: 'Is surrogacy legal in California?',
    answer: 'Yes, surrogacy in California is completely legal and highly protected by state law. California is known as one of the most surrogate-friendly states in the U.S. Both gestational surrogacy and compensated surrogacy are recognized and supported here. The law ensures that every surrogate mother\'s rights are clear and respected, and that intended parents become the baby\'s legal parents through a court order before birth. This legal foundation makes California one of the safest places in the world to become a surrogate.'
  },
  {
    question: 'How much do surrogates get paid in California?',
    answer: 'Compensation for surrogate mothers in California depends on experience, location, and personal circumstances. Most surrogates receive total compensation in the range of $60,000 to $80,000, with additional allowances for maternity needs, travel, and childcare. Yunda Surrogacy ensures that every surrogate\'s pay is transparent, fair, and protected by legal contracts and secure trust accounts. The financial side is handled carefully, so you can focus on your health and the joy of the journey.'
  }
])

// FAQ 展開狀態
const expandedFaqs = ref<number[]>([])

// 切換 FAQ 展開狀態
const toggleFaq = (index: number) => {
  const expandedIndex = expandedFaqs.value.indexOf(index)
  if (expandedIndex > -1) {
    expandedFaqs.value.splice(expandedIndex, 1)
  } else {
    expandedFaqs.value.push(index)
  }
}

// 滾動到指定區域
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

// 數字計數器動畫
const animatedNumbers = ref({
  compensation: 0,
  years: 0,
  families: 0
})

const targetNumbers = {
  compensation: 70000,
  years: 15,
  families: 1000
}

// 滾動動畫觀察器
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px 0px -100px 0px'
}

const animateNumbers = () => {
  const duration = 2000 // 2 seconds
  const steps = 60
  const stepDuration = duration / steps
  
  Object.keys(targetNumbers).forEach(key => {
    const target = targetNumbers[key as keyof typeof targetNumbers]
    const increment = target / steps
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        animatedNumbers.value[key as keyof typeof animatedNumbers] = target
        clearInterval(timer)
      } else {
        animatedNumbers.value[key as keyof typeof animatedNumbers] = Math.floor(current)
      }
    }, stepDuration)
  })
}

// 滾動觀察器
let observer: IntersectionObserver | null = null

// 滾動進度條
const scrollProgress = ref(0)

// 更新滾動進度
const updateScrollProgress = () => {
  const scrollTop = window.pageYOffset
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  const scrollPercent = (scrollTop / docHeight) * 100
  scrollProgress.value = Math.min(scrollPercent, 100)
}

onMounted(() => {
  // 創建滾動觀察器
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
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
    <div class="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
      <div 
        class="h-full bg-[var(--grayish-green)] transition-all duration-300 ease-out"
        :style="{ width: `${scrollProgress}%` }"
      ></div>
    </div>
    
    <AppHeader />
    
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-b from-[var(--light-cream)] to-[var(--head-bg)] py-20 overflow-hidden">
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-5">
        <div class="absolute top-20 left-10 w-32 h-32 bg-[var(--grayish-green)] rounded-full"></div>
        <div class="absolute top-40 right-20 w-24 h-24 bg-[var(--primary-brown)] rounded-full"></div>
        <div class="absolute bottom-20 left-1/4 w-20 h-20 bg-[var(--olive-green)] rounded-full"></div>
      </div>
      
      <div class="container mx-auto px-4 max-w-7xl relative z-10">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="text-center lg:text-left">
            <h1 class="text-5xl md:text-7xl font-bold text-[var(--dark-brown)] mb-6 leading-tight" style="font-family: var(--font-primary)">
              Become a Surrogate in California: Safe, Rewarding, and Life-Changing
            </h1>
            <p class="text-xl md:text-2xl text-[var(--primary-brown)] mb-8 leading-relaxed">
              Becoming a surrogate in California is more than a journey — it's a gift of love and compassion. Many women choose this path because they want to help others build families while reaching new goals for themselves.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <NuxtLink 
                to="/be-surrogate" 
                class="bg-[var(--grayish-green)] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg transform hover:scale-105 transition-transform"
              >
                Apply to Become a Surrogate
              </NuxtLink>
              <button 
                @click="scrollToSection('requirements')"
                class="border-2 border-[var(--grayish-green)] text-[var(--grayish-green)] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[var(--grayish-green)] hover:text-white transition-colors"
              >
                Check Requirements
              </button>
            </div>
          </div>
          
          <!-- Hero Image Placeholder -->
          <div class="relative">
            <div class="bg-gradient-to-br from-[var(--light-cream)] to-[var(--grayish-green)] rounded-2xl p-8 shadow-2xl">
              <div class="aspect-square bg-white rounded-xl flex items-center justify-center border-2 border-dashed border-[var(--grayish-green)]">
                <div class="text-center">
                    <img src="/images/california surrogate mother.jpg" alt="California Surrogate Mother">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Introduction Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="prose prose-lg max-w-none text-center">
          <p class="text-xl text-[var(--primary-brown)] leading-relaxed mb-8">
            As a surrogate mother, you open the door to someone's dream of parenthood. You bring hope, joy, and life into a story that might not exist without you.
          </p>
          <p class="text-lg text-[var(--primary-brown)] leading-relaxed mb-8">
            At Yunda Surrogacy, we make sure every surrogate feels respected, supported, and protected. California is one of the most surrogate-friendly states in the U.S., offering strong legal protection and excellent medical care. Here, you can safely begin your surrogacy journey with confidence.
          </p>
          <p class="text-lg text-[var(--primary-brown)] leading-relaxed mb-8">
            Our team walks beside every woman who decides to become a surrogate in California. From the first call to the moment a baby arrives, we make sure you feel valued and cared for. Many surrogates say the experience changes their lives — not only because of the financial rewards but also because of the deep emotional fulfillment that comes from helping another family grow.
          </p>
          <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
            If you've ever felt called to do something meaningful, this may be the moment. Becoming a surrogate mother lets you share your strength, kindness, and heart in a way few others can.
          </p>
        </div>
      </div>
    </section>

    <!-- What Is Surrogacy Section -->
    <section class="py-20 bg-[var(--head-bg)]">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            What Is Surrogacy and Who Can Become a Surrogate Mother?
          </h2>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 mb-16">
          <!-- Understanding Gestational Surrogacy -->
          <div class="bg-white p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
              Understanding Gestational Surrogacy in California
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
              Surrogacy means carrying a baby for someone who cannot do it on their own. In gestational surrogacy, the surrogate mother carries a baby created from the intended parents' or donors' embryo. She is not genetically related to the baby — her role is to nurture life and make parenthood possible.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
              California is known for leading the way in gestational surrogacy. The process is well-supported by experienced fertility specialists, legal experts, and caring surrogacy agencies. This makes the entire journey smoother and safer for every surrogate mother.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              When you become a surrogate in California, you can expect clear communication, medical guidance, and emotional support every step of the way. Many surrogates describe this as one of the most meaningful experiences of their lives — a chance to help another family while doing something they genuinely love.
            </p>
          </div>

          <!-- Why California Is the Best State -->
          <div class="bg-white p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
              Why California Is the Best State for Surrogacy
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
              There's a reason California is often called the heart of surrogacy in the United States. The state offers some of the most surrogate-friendly laws in the world, ensuring that both surrogates and intended parents are fully protected. Legal agreements are clear, compensation is transparent, and every surrogate's rights are respected.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
              Beyond the laws, California also provides outstanding fertility care. With advanced medical centers, supportive surrogacy professionals, and a diverse community of experienced surrogates, the environment here is ideal for this life-changing journey.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              For many women, becoming a surrogate mother in California means joining a warm, supportive network — one that values compassion, respect, and trust. You're not just helping others have a child; you're becoming part of a community that celebrates the beauty of giving life.
            </p>
          </div>
        </div>

        <!-- Image Placeholder -->
        <div class="bg-gradient-to-r from-[var(--light-cream)] to-[var(--grayish-green)] rounded-2xl p-8 shadow-lg">
          <div class="aspect-video bg-white rounded-xl flex items-center justify-center border-2 border-dashed border-[var(--grayish-green)]">
            <div class="text-center">
                <img src="/images/california surrogacy process.jpg" alt="California Surrogacy Mother">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Yunda Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Why Become a Surrogate Mother with Yunda Surrogacy
          </h2>
          <p class="text-lg text-[var(--primary-brown)] max-w-4xl mx-auto leading-relaxed">
            Choosing to become a surrogate in California is a big decision — one that deserves care, trust, and the right support system. At Yunda Surrogacy, we believe every surrogate mother should feel respected, valued, and empowered throughout her journey.
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8 mb-16">
          <!-- Emotional and Financial Rewards -->
          <div class="bg-[var(--light-cream)] p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div class="w-16 h-16 bg-[var(--grayish-green)] rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--primary-brown)] transition-colors duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-[var(--dark-brown)] mb-4 group-hover:text-[var(--primary-brown)] transition-colors duration-300" style="font-family: var(--font-primary)">
              Emotional and Financial Rewards
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-4">
              Surrogacy changes lives — not just for the families you help but also for you as a surrogate mother. Many women say it's one of the most fulfilling things they've ever done.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              Alongside emotional fulfillment, surrogacy offers strong financial benefits. In California, surrogate mothers receive compensation that reflects their commitment, time, and dedication.
            </p>
          </div>

          <!-- Supportive Agency -->
          <div class="bg-[var(--light-cream)] p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div class="w-16 h-16 bg-[var(--grayish-green)] rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--primary-brown)] transition-colors duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-[var(--dark-brown)] mb-4 group-hover:text-[var(--primary-brown)] transition-colors duration-300" style="font-family: var(--font-primary)">
              A Supportive and Ethical Agency
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-4">
              Not every agency treats surrogate mothers the same way. At Yunda Surrogacy, our focus is always on your well-being. We follow strict ethical standards to ensure fairness, safety, and open communication.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              You'll never feel like "just a number." You'll have a dedicated coordinator who knows your name, understands your needs, and keeps in touch with you every week.
            </p>
          </div>

          <!-- Meaningful Journey -->
          <div class="bg-[var(--light-cream)] p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
            <div class="w-16 h-16 bg-[var(--grayish-green)] rounded-full flex items-center justify-center mb-6 group-hover:bg-[var(--primary-brown)] transition-colors duration-300">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-[var(--dark-brown)] mb-4 group-hover:text-[var(--primary-brown)] transition-colors duration-300" style="font-family: var(--font-primary)">
              A Journey Filled with Meaning
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-4">
              Being a surrogate mother is about more than carrying a child — it's about carrying hope, love, and courage. Every pregnancy is a promise fulfilled for someone who has been waiting for years.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              Our team takes care of every detail so you can focus on what you do best — creating life. From your first call to the moment of delivery, we guide you with compassion, honesty, and expertise.
            </p>
          </div>
        </div>

        <!-- Call to Action -->
        <div class="text-center bg-[var(--grayish-green)] p-12 rounded-xl">
          <h3 class="text-3xl font-bold text-white mb-6" style="font-family: var(--font-primary)">
            Ready to do something extraordinary?
          </h3>
          <p class="text-white mb-8 text-lg">
            Join Yunda Surrogacy and become a surrogate mother in California — where your kindness changes lives, and your courage inspires new beginnings.
          </p>
          <NuxtLink 
            to="/be-surrogate" 
            class="bg-white text-[var(--grayish-green)] px-12 py-4 rounded-lg text-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
          >
            Start Your Journey
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Statistics Section -->
    <section id="stats-section" class="py-20 bg-[var(--grayish-green)]">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-white mb-6" style="font-family: var(--font-primary)">
            Why California Surrogates Choose Yunda
          </h2>
          <p class="text-xl text-white opacity-90 max-w-4xl mx-auto leading-relaxed">
            Join thousands of women who have found fulfillment and financial security through our California surrogacy program
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Average Compensation -->
          <div class="bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-xl text-center hover:bg-opacity-30 transition-all duration-300">
            <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
              </svg>
            </div>
            <div class="text-5xl font-bold text-white mb-2" style="font-family: var(--font-primary)">
              ${{ animatedNumbers.compensation.toLocaleString() }}+
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Average Compensation</h3>
            <p class="text-white opacity-90">Total compensation package including base pay and allowances</p>
          </div>

          <!-- Years of Experience -->
          <div class="bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-xl text-center hover:bg-opacity-30 transition-all duration-300">
            <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <div class="text-5xl font-bold text-white mb-2" style="font-family: var(--font-primary)">
              {{ animatedNumbers.years }}+
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Years of Experience</h3>
            <p class="text-white opacity-90">Helping families achieve their dreams through surrogacy</p>
          </div>

          <!-- Families Helped -->
          <div class="bg-white bg-opacity-20 backdrop-blur-sm p-8 rounded-xl text-center hover:bg-opacity-30 transition-all duration-300">
            <div class="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <div class="text-5xl font-bold text-white mb-2" style="font-family: var(--font-primary)">
              {{ animatedNumbers.families.toLocaleString() }}+
            </div>
            <h3 class="text-xl font-semibold text-white mb-2">Families Helped</h3>
            <p class="text-white opacity-90">Successful surrogacy journeys completed</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Compensation Section -->
    <section class="py-20 bg-[var(--head-bg)]">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Surrogate Compensation and Benefits in California
          </h2>
          <p class="text-lg text-[var(--primary-brown)] max-w-4xl mx-auto leading-relaxed">
            Choosing to become a surrogate in California means stepping into one of the most supportive and respected surrogacy systems in the world. California has long been known as the gold standard for surrogacy — not only for its clear laws but also for the way it values and protects every surrogate mother.
            <br>At Yunda Surrogacy, we make sure every woman understands what her dedication and care are truly worth. California’s legal and medical environment allows us to offer compensation packages that recognize your time, effort, and heart. You can feel confident knowing your work is honored with fairness and respect from the very start.          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 mb-16">
          <!-- How Compensation Works -->
          <div class="bg-white p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
              How Surrogate Compensation Works in California
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
              In California, surrogate compensation is designed to reflect both your commitment and your comfort. Every surrogate receives a base pay plus additional allowances for health care, maternity needs, travel, and more.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
              While each journey is unique, most surrogates earn a range that reflects California's leadership in fair and ethical compensation. The total value typically falls within the high five figures, depending on experience, location, and personal circumstances.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              Unlike many other states, California ensures that surrogates are paid through secured trust accounts, managed by licensed professionals. This means your compensation is guaranteed and handled with complete transparency.
            </p>
          </div>

          <!-- Benefits Beyond Financial -->
          <div class="bg-white p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
              Benefits Beyond Financial Rewards
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
              Being a surrogate mother in California comes with much more than just pay. You gain access to top-tier medical care from some of the country's most experienced fertility specialists.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
              At Yunda Surrogacy, every surrogate also enjoys personalized care — regular wellness check-ins, flexible scheduling, and 24/7 communication with your coordinator.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              You'll also join a network of strong women across California who share the same purpose: helping families grow. Many of them stay connected long after their surrogacy experience.
            </p>
          </div>
        </div>

        <!-- Why California Offers Best Conditions -->
        <div class="bg-white p-8 rounded-xl shadow-lg mb-16">
          <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Why California Offers the Best Conditions for Surrogates
          </h3>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
                California leads the nation in surrogacy for good reason. The state's family laws fully recognize gestational surrogacy, making the process legal, protected, and emotionally safe for all parties.
              </p>
              <p class="text-[var(--primary-brown)] leading-relaxed">
                Courts issue pre-birth parentage orders, which means everyone's rights — including yours — are clearly defined before delivery.
              </p>
            </div>
            <div>
              <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
                The culture in California is also uniquely supportive. People here understand and respect surrogates, seeing them as heroes who help bring love into the world.
              </p>
              <p class="text-[var(--primary-brown)] leading-relaxed">
                With open-minded communities, professional medical infrastructure, and world-class mental health resources, California truly stands apart as the safest and most rewarding place to be a surrogate.
              </p>
              </div>
          </div>
        </div>

        <!-- Compensation Image Placeholder -->
        <div class="bg-gradient-to-r from-[var(--light-cream)] to-[var(--grayish-green)] rounded-2xl p-8 shadow-lg">
          <div class="aspect-video bg-white rounded-xl flex items-center justify-center border-2 border-dashed border-[var(--grayish-green)]">
            <div class="text-center">
              <img src="/images/Compensation & Benefits.jpg" alt="California Surrogacy Compensation & Benefits">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Requirements Section -->
    <section id="requirements" class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Surrogate Requirements: Who Qualifies to Become a Surrogate in California
          </h2>
          <p class="text-lg text-[var(--primary-brown)] max-w-4xl mx-auto leading-relaxed">
            Becoming a surrogate mother in California is a special calling — one that takes love, strength, and a deep sense of purpose. California welcomes women who want to help others grow their families while building something meaningful for themselves.
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8 mb-16">
          <!-- Basic Qualifications -->
          <div class="bg-[var(--light-cream)] p-8 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
                Basic Qualifications for Surrogates in California
            </h3>
            <ul class="space-y-4 text-[var(--primary-brown)]">
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Between 21 and 39 years old</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>U.S. citizens or permanent residents</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Have given birth to at least one healthy, full-term baby</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Living a healthy lifestyle — no smoking, no drug use</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Free from major medical or psychological conditions</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Supported by family or a stable home environment</span>
              </li>
            </ul>
          </div>

          <!-- Health and Emotional Screening -->
          <div class="bg-[var(--light-cream)] p-8 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
              Health and Emotional Screening
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-4">
                Every surrogate mother deserves full support — medically and emotionally. California requires thorough health evaluations before the surrogacy journey begins. This includes physical exams, OB/GYN records review, and sometimes additional fertility tests.            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-4">
                Equally important is emotional readiness. We work with licensed counselors who talk with you about your motivation, expectations, and support network. This isn’t a test — it’s a conversation to make sure you feel confident and supported from the very first step.            </p>
            </div>

          <!-- Legal and Financial Security -->
          <div class="bg-[var(--light-cream)] p-8 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
                Legal and Financial Security for California Surrogates            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-4">
                One of the reasons so many women choose surrogacy in California is because the state protects surrogates better than anywhere else. From clear legal contracts to guaranteed compensation, every part of the process is designed with your safety in mind.            </p>
              <p class="text-[var(--primary-brown)] leading-relaxed mb-4">
                Before you start your journey, you'll meet with an independent attorney who represents you — at no cost. Your lawyer will review your agreement, explain your rights, and make sure every payment and condition is fair and transparent.
              </p>
            </div>
        </div>

        <!-- Why California Surrogates Stand Out -->
        <div class="bg-white p-8 rounded-xl shadow-lg border-2 border-[var(--grayish-green)]">
          <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Why California Surrogates Stand Out
          </h3>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
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
    <section class="py-20 bg-[var(--head-bg)]">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Your Support System: Legal, Medical, and Emotional Care
          </h2>
          <p class="text-lg text-[var(--primary-brown)] max-w-4xl mx-auto leading-relaxed">
            When you become a surrogate in California, you deserve to feel safe, supported, and valued at every step. Yunda Surrogacy was built around one simple promise — to take care of our surrogate mothers like family.
          </p>
        </div>

        <div class="grid lg:grid-cols-3 gap-8 mb-16">
          <!-- Legal Protection -->
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-[var(--grayish-green)] rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-[var(--dark-brown)] mb-4" style="font-family: var(--font-primary)">
              Legal Protection You Can Count On in California
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-4">
              California is the most surrogate-friendly state in the U.S., and its laws are clear and protective. From the start, every surrogate mother works with her own independent attorney, paid for by the intended parents.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              California's surrogacy laws allow for pre-birth orders, meaning legal parentage is established before the baby is born. This gives both you and the intended parents full clarity and protection.
            </p>
          </div>

          <!-- Medical Care -->
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-[var(--grayish-green)] rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-[var(--dark-brown)] mb-4" style="font-family: var(--font-primary)">
              Medical Care from California's Best Specialists
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-4">
              California has some of the world's most advanced fertility and maternity care. As a gestational surrogate, you'll receive personalized medical attention from top fertility doctors and OB/GYNs.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              Every medical appointment, procedure, and test is carefully coordinated by your case manager, so you never have to navigate it alone.
            </p>
          </div>

          <!-- Emotional Care -->
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-[var(--grayish-green)] rounded-full flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-bold text-[var(--dark-brown)] mb-4" style="font-family: var(--font-primary)">
              Emotional Care and Community Connection
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-4">
              The surrogacy journey is emotional — filled with joy, hope, and sometimes a few nerves. That's why emotional support is just as important as medical care.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed">
              At Yunda Surrogacy, every surrogate mother in California has access to licensed counselors and peer mentors throughout the process.
            </p>
          </div>
        </div>

        <!-- The Yunda Difference -->
        <div class="bg-white p-8 rounded-xl shadow-lg mb-16 border-2 border-[var(--grayish-green)]">
          <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            The Yunda Difference
          </h3>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
                At Yunda Surrogacy, we combine California's strong legal foundation with our own personal approach. We listen. We care. We stay by your side from the first call to the last hug. Our mission is to make sure every surrogate mother feels protected, appreciated, and proud of her journey.
              </p>
              <p class="text-[var(--primary-brown)] leading-relaxed">
                Surrogacy in California works so well because it's built on trust — between the surrogate, the agency, the medical team, and the intended parents. Yunda Surrogacy keeps that trust strong by offering clear communication, transparent compensation, and heartfelt gratitude for everything you do.
              </p>
            </div>
            <div>
              <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
                Becoming a surrogate mother in California isn't just about helping others — it's about being part of something bigger, something beautiful. With Yunda Surrogacy, you'll always have a strong support system, every step of the way.
              </p>
              <div class="bg-[var(--light-cream)] p-6 rounded-lg">
                <h4 class="text-lg font-semibold text-[var(--dark-brown)] mb-3">Our Promise to You:</h4>
                <ul class="space-y-2 text-[var(--primary-brown)]">
                  <li class="flex items-center">
                    <span class="text-[var(--grayish-green)] mr-2">✓</span>
                    <span>Personalized care and attention</span>
                  </li>
                  <li class="flex items-center">
                    <span class="text-[var(--grayish-green)] mr-2">✓</span>
                    <span>24/7 support and communication</span>
                  </li>
                  <li class="flex items-center">
                    <span class="text-[var(--grayish-green)] mr-2">✓</span>
                    <span>Transparent and fair compensation</span>
                  </li>
                  <li class="flex items-center">
                    <span class="text-[var(--grayish-green)] mr-2">✓</span>
                    <span>Complete legal protection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Support System Image Placeholder -->
        <div class="bg-gradient-to-r from-[var(--light-cream)] to-[var(--grayish-green)] rounded-2xl p-8 shadow-lg">
          <div class="aspect-video bg-white rounded-xl flex items-center justify-center border-2 border-dashed border-[var(--grayish-green)]">
            <div class="text-center">
                <img src="/images/Legal, Medical & Emotional Care.jpg" alt="California Surrogacy Legal, Medical & Emotional Care" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Surrogacy FAQs (Frequently Asked Questions)
          </h2>
        </div>

        <div class="space-y-6">
          <div 
            v-for="(faq, index) in faqs"
            :key="index"
            class="bg-[var(--light-cream)] rounded-xl shadow-lg overflow-hidden"
          >
            <button
              @click="toggleFaq(index)"
              class="w-full p-6 text-left flex items-center justify-between hover:bg-[var(--grayish-green)] hover:bg-opacity-20 transition-colors"
            >
              <h3 class="text-xl font-semibold text-[var(--dark-brown)] pr-4">
                {{ faq.question }}
              </h3>
              <div class="flex-shrink-0">
                <svg 
                  :class="[
                    'w-6 h-6 text-[var(--grayish-green)] transition-transform duration-300',
                    expandedFaqs.includes(index) ? 'rotate-180' : ''
                  ]"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </button>
            <div 
              :class="[
                'overflow-hidden transition-all duration-300',
                expandedFaqs.includes(index) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
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
    <section class="py-20 bg-[var(--head-bg)]">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Ready to Start Your Surrogacy Journey? Apply Today
          </h2>
          <p class="text-lg text-[var(--primary-brown)] max-w-4xl mx-auto leading-relaxed">
            Every amazing journey starts with one brave step. If you've been thinking about becoming a surrogate in California, now is the perfect time to explore this beautiful opportunity.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 mb-16">
          <!-- Check Eligibility -->
          <div class="bg-white p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
              Check Your Eligibility Instantly
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
              Not sure if you qualify? You can start by answering a few simple questions in our surrogacy application form. It only takes a few minutes and helps us learn whether you meet the basic surrogate requirements in California.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
              💡 You don't need to be perfect — you just need to be caring, healthy, and ready to help a family grow.
            </p>
            <button 
              @click="scrollToSection('requirements')"
              class="bg-[var(--grayish-green)] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Check Requirements
            </button>
          </div>

          <!-- Apply Now -->
          <div class="bg-white p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
              Apply to Become a Surrogate in California
            </h3>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
              Becoming a surrogate mother in California is both a meaningful and practical decision. You'll be supported every step of the way — legally, medically, and emotionally.
            </p>
            <p class="text-[var(--primary-brown)] leading-relaxed mb-6">
              👉 Start your surrogacy journey today. Fill out our short application, and a Yunda Surrogacy coordinator will reach out soon.
            </p>
            <NuxtLink 
              to="/be-surrogate" 
              class="bg-[var(--grayish-green)] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Start Application
            </NuxtLink>
          </div>
        </div>

        <!-- Final Message -->
        <div class="text-center bg-[var(--grayish-green)] p-12 rounded-xl">
          <h3 class="text-3xl font-bold text-white mb-6" style="font-family: var(--font-primary)">
            Join the Most Trusted Surrogacy Program in California
          </h3>
          <p class="text-white mb-8 text-lg leading-relaxed">
            Every life-changing story begins with one decision — to act with courage and compassion. By choosing to become a surrogate in California, you open the door to hope for another family while creating a new chapter for yourself.
          </p>
          <p class="text-white mb-8 text-lg leading-relaxed">
            At Yunda Surrogacy, we combine California's strong legal protection, excellent medical care, and heartfelt emotional support into one safe and rewarding experience. Our surrogates are heroes — ordinary women doing something extraordinary.
          </p>
          <p class="text-white mb-8 text-lg leading-relaxed">
            If your heart tells you this is your time, don't wait. 💬 Apply today, and let's start this journey together. Because every miracle starts with one brave woman — and that woman could be you.
          </p>
          <NuxtLink 
            to="/be-surrogate" 
            class="bg-white text-[var(--grayish-green)] px-12 py-4 rounded-lg text-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
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
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* 過渡動畫 */
.transition-shadow {
  transition: box-shadow 0.3s ease;
}

.transition-transform {
  transition: transform 0.3s ease;
}

.transition-colors {
  transition: color 0.3s ease, background-color 0.3s ease;
}

/* FAQ 動畫 */
.transition-all {
  transition: all 0.3s ease;
}

/* 背景圖案動畫 */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
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

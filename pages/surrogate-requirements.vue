<script setup lang="ts">
// Vue composables are auto-imported in Nuxt 3
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

useHead({
  title: 'Surrogate Requirements & Surrogacy Qualifications: Become a Surrogate',
  meta: [
    {
      name: 'description',
      content: 'Learn surrogacy requirements and surrogate qualifications in the U.S.—medical and lifestyle criteria, IVF surrogacy process, embryo transfer, support, and how to become a surrogate.',
    },
  ],
})

const sections = [
  { id: 'intro', label: 'Overview' },
  { id: 'quick-eligibility', label: 'Quick Eligibility' },
  { id: 'medical-lifestyle', label: 'Medical & Lifestyle' },
  { id: 'disqualify', label: 'Disqualifications' },
  { id: 'process', label: 'Screening Steps' },
  { id: 'compensation', label: 'Compensation & Support' },
  { id: 'faq', label: 'FAQ' },
]

const activeSection = ref(sections[0].id)

function scrollToSection(id: string) {
  const el = document.getElementById(id)
  if (el)
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleScroll() {
  const offsets = sections.map((section) => {
    const element = document.getElementById(section.id)
    if (!element)
      return { id: section.id, distance: Number.POSITIVE_INFINITY }
    const rect = element.getBoundingClientRect()
    return { id: section.id, distance: Math.abs(rect.top - 160) }
  })
  activeSection.value = offsets.reduce((prev, current) => (current.distance < prev.distance ? current : prev)).id
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const quickEligibilityCards = [
  {
    title: 'Core Surrogacy Requirements',
    items: [
      'Age 21–39 (clinic-guided surrogate age limit).',
      'At least one full-term birth with healthy records.',
      'BMI within clinic range.',
      'No smoking, vaping, or drug use.',
      'Reliable transportation and a stable schedule.',
      'These are the baseline surrogate requirements and surrogate qualifications for gestational surrogacy.',
    ],
  },
  {
    title: 'Citizenship & Where You Live',
    items: [
      'U.S. citizens only.',
      'You live in a state that works with our clinics and attorneys.',
      'You can travel for screening and embryo transfer when needed.',
      'Meet these points and you can confidently become a surrogate.',
    ],
  },
  {
    title: 'Health & Lifestyle Fit',
    items: [
      'You manage health conditions under a doctor’s care.',
      'You wait until you finish breastfeeding before meds and transfer.',
      'You keep a healthy routine: sleep, nutrition, and movement.',
      'This profile supports safe gestational surrogacy and strong surrogate qualifications.',
    ],
  },
  {
    title: 'Support & Readiness',
    items: [
      'Your home offers steady support. Partner or family can help with rides and childcare.',
      'You feel ready for appointments, communication, and matching with intended parents.',
      'You understand the commitment and want to be a surrogate for the right reasons.',
      'With this foundation, a surrogate mother can move through screening and matching smoothly.',
    ],
  },
]

const medicalLifestyleSections = [
  {
    heading: 'Reproductive History & Overall Health',
    body: [
      'You meet the surrogacy requirements best when you have at least one full-term birth and stable prenatal records. Clinics review C-section history, cycle regularity, and current health to confirm surrogate qualifications for gestational surrogacy.',
      'Keep a healthy routine—sleep, nutrition, and movement—and follow your doctor’s advice on BMI and medications. This helps you become a surrogate with confidence.',
    ],
  },
  {
    heading: 'Medical Screening (Clinic-Guided)',
    body: [
      'Your screening follows a clear medical process. The clinic reviews OB records first. Then the hospital arranges full medical exams for you (and your partner if applicable) to confirm you meet transfer criteria and to issue medical clearance.',
    ],
  },
  {
    heading: 'Mental Health & Support',
    body: [
      'Your profile includes health history and psychological screening details. Our team shares this with intended parents during matching to ensure fit and safety. Strong home support makes the journey smoother and aligns with core surrogate requirements.',
    ],
  },
  {
    heading: 'IVF Readiness & Embryo Transfer',
    body: [
      'When the clinic clears you, the doctor starts the pre-transfer regimen. You follow meds and injections for about 4–6 weeks, then complete the embryo transfer and begin pregnancy monitoring.',
    ],
  },
  {
    heading: 'Care Standards & Partner Clinics',
    body: [
      'You receive care through partner programs with advanced labs and strict quality controls. Partner centers maintain CLIA/CAP-standard embryology labs and use leading culture, testing, and cryo methods to support safe IVF surrogacy care.',
      'Examples include California Fertility Partners and Gen 5 Fertility Center, along with Harvest and Incinta for comprehensive IVF and PGT support.',
    ],
  },
  {
    heading: 'Coordination & Follow-Up',
    body: [
      'You won’t navigate this alone. A dedicated project manager coordinates appointments and key milestones and provides bilingual updates, including weekly and monthly reports, so you always know what comes next in the surrogacy requirements process.',
    ],
  },
]

const disqualifySections = [
  {
    title: 'Medical Factors',
    paragraphs: [
      'Clinics check your health against clear surrogacy requirements. Uncontrolled diabetes or hypertension can stop approval. Severe past OB issues may also block gestational surrogacy. Final eligibility depends on your physician’s review and formal medical clearance from the clinic.',
    ],
  },
  {
    title: 'Obstetric & Reproductive History',
    paragraphs: [
      'Doctors look closely at delivery records and uterine health. Certain C-section histories or complications can lead to a “not cleared” result. If the clinic decides you don’t meet transfer criteria, you cannot become a surrogate for that cycle.',
    ],
  },
  {
    title: 'Lifestyle & Safety Considerations',
    paragraphs: [
      'Current nicotine use, substance use, or heavy alcohol use can fail screening. Lack of reliable transportation or an unsafe home setting can also pause the process. These issues conflict with core surrogate requirements and clinic guidance during screening.',
    ],
  },
  {
    title: 'Legal & Logistics Constraints',
    paragraphs: [
      'You need legal clearance after medical clearance. If attorneys cannot finalize the contract or state guidance conflicts with your case, the cycle cannot move forward. You also need flexibility for travel and scheduled embryo transfer.',
    ],
  },
  {
    title: 'Temporary Deferrals (Not Permanent “No”)',
    paragraphs: [
      'Breastfeeding, very recent tattoos/piercings, recent childbirth, or out-of-range BMI may require a short wait. The clinic sets timing, then starts meds and transfer when you are ready. Typical pre-transfer prep lasts about 4–6 weeks before IVF embryo transfer.',
    ],
  },
]

const processSteps = [
  {
    title: 'Step 1 — Records Review & Medical Screening',
    text: 'We start with your OB records. The clinic checks your history and current health to confirm surrogate qualifications. The hospital then books full medical exams for you）. Doctors decide if you meet transfer criteria and issue medical clearance. These are essential surrogacy steps before matching.',
  },
  {
    title: 'Step 2 — Psychological Evaluation',
    text: 'You meet with a licensed therapist. We review support, expectations, and stress management. Your profile includes key health  so matching stays safe and transparent. This keeps gestational surrogacy grounded in real readiness.',
  },
  {
    title: 'Step 3 — Legal Clearance',
    text: 'After medical clearance, attorneys draft and review your contract and insurance documents. Both sides sign the agreement. Courts later rely on this contract for the pre-birth order. Legal clearance protects you and the intended parents.',
  },
  {
    title: 'Step 4 — Cycle Prep & Embryo Transfer',
    text: 'Your doctor starts pre-transfer meds and injections. This phase usually runs about 4–6 weeks. Then you complete the embryo transfer and begin pregnancy monitoring. These surrogate steps follow standard IVF surrogacy process protocols.',
  },
  {
    title: 'Step 5 — Pregnancy Monitoring & Checkpoints',
    text: 'You take an HCG test about 10–14 days after transfer and confirm fetal heartbeat at ~4–5 weeks. From 11 weeks, an OB manages routine care. Our project managers check in multiple times each week and provide a weekly report, so you always know the plan. These checkpoints keep the surrogacy requirements clear from transfer to delivery.',
  },
  {
    title: 'Step 6 — Ongoing Coordination & Updates',
    text: 'A dedicated  handles schedules, milestone reminders, and coordination. You receive weekly and monthly cycle reports and 24/7 bilingual support. This structure keeps every step organized and builds trust throughout gestational surrogacy.',
  },
]

const compensationHighlights = [
  {
    title: 'How Payments Work (Milestones + Escrow)',
    paragraphs: [
      'We use an independent trust account for surrogate compensation and reimbursements. The escrow pays items by milestones and contract terms. After the clinic confirms key checkpoints (like HCG and fetal heartbeat), the program triggers the next surrogacy payment and keeps the escrow at the required minimum per policy.',
      'The trust account covers approved items only. You see clear statements and a clean paper trail.',
    ],
  },
  {
    title: 'What the Escrow May Cover',
    paragraphs: [
      'The trust pays contract items: your surrogate pay installments, insurance costs, attorney fees, and other approved, itemized expenses. We manage these through the third-party escrow to keep funds compliant and on time.',
    ],
  },
  {
    title: 'Legal Protection & Insurance',
    paragraphs: [
      'You work with your own attorney. We coordinate contract drafting and review after medical clearance. The legal team prepares documents that support the pre-birth order process in your state.',
      'For insurance planning, we partner with industry leaders. ART Risk focuses on surrogacy insurance, trust oversight support, and contract review across the U.S. SeedTrust provides specialized reproductive escrow services with strong compliance and a modern online platform.',
    ],
  },
  {
    title: 'Dedicated Team & 24/7 Support',
    paragraphs: [
      'You don’t navigate this alone. A project manager handles schedules, milestone reminders, and day-to-day coordination. We send weekly and monthly cycle reports and offer 24/7 bilingual support, so you always know what comes next.',
      'During pregnancy, our team checks in several times each week and helps arrange key appointments. The weekly report system keeps everyone aligned.',
    ],
  },
]

const faqItems = [
  {
    question: 'Do surrogates get paid? How does the surrogate payment schedule work?',
    answer: 'Yes, surrogates are paid, typically through a compensation package that includes a base pay plus various supplemental payments and reimbursements for expenses. The payment schedule usually begins after a positive pregnancy test and continues in monthly installments for the duration of the pregnancy, with additional payments made for specific events or needs like a C-section, bed rest, or carrying multiples. Payments are often managed through a third-party escrow service to ensure transparency and timely distribution.'
  },
  {
    question: 'How much do surrogates make in the U.S.?',
    answer: 'On average, nationwide, base pay for first-time surrogates is between $45,000 and $55,000, with fees rising to between $60,000 to $70,000 for second-time surrogates, according to Gramann. The cost to those families using a surrogate is even greater, typically around $150,000, when additional expenses are factored in.'
  },
  {
    question: 'What counts as surrogate compensation vs. reimbursable surrogacy expenses?',
    answer: 'Surrogate compensation is the base payment for the time and commitment of the surrogate, while reimbursable expenses are payments to cover specific out-of-pocket costs incurred during the process, ensuring the surrogate is not financially burdened. Compensation is a form of payment for their role, and it is typically broken down into monthly installments after the pregnancy is confirmed. Reimbursable expenses, on the other hand, are for things like lost wages, medical co-pays, travel, maternity clothing, and childcare, which are paid back as they occur.'
  },
  {
    question: 'What affects surrogate pay—experience, location, or medical factors?',
    answer: 'Surrogate pay is affected by experience, location, and medical factors, with each playing a significant role in the final compensation package. Prior experience and the complexity of the pregnancy, such as carrying multiples, are major factors, while a surrogate\'s state of residence can influence pay due to local cost of living and demand. Medical circumstances, both foreseen and unforeseen, such as invasive procedures, bed rest, or complications, can lead to additional payments.'
  }
]

const expandedFaq = ref<Record<string, boolean>>({})

function toggleFaq(question: string) {
  expandedFaq.value = {
    ...expandedFaq.value,
    [question]: !expandedFaq.value[question],
  }
}

const requirementTabs = [
  { id: 'core', label: 'Core Requirements' },
  { id: 'citizenship', label: 'Citizenship & Location' },
  { id: 'health', label: 'Health & Lifestyle' },
  { id: 'support', label: 'Support & Readiness' },
]

const activeRequirementTab = ref(requirementTabs[0].id)

const tabContent = computed(() => {
  switch (activeRequirementTab.value) {
    case 'core':
      return quickEligibilityCards[0]
    case 'citizenship':
      return quickEligibilityCards[1]
    case 'health':
      return quickEligibilityCards[2]
    default:
      return quickEligibilityCards[3]
  }
})

const requirementIcons = [
  'lucide:check-circle-2',
  'lucide:map-pin',
  'lucide:heart-pulse',
  'lucide:users',
]

const processIcons = [
  'lucide:folder-clock',
  'lucide:user-check',
  'lucide:scale',
  'lucide:beaker',
  'lucide:activity',
  'lucide:headset',
]
</script>

<template>
  <div class="min-h-screen bg-[var(--head-bg)] text-[var(--dark-brown)]">
    <AppHeader />

    <section class="relative overflow-hidden bg-gradient-to-b from-[var(--hero-center)]/80 via-[var(--light-cream)] to-[var(--foot-bg)] py-18 lg:py-24">
      <div class="pointer-events-none absolute inset-0 opacity-40">
        <div class="absolute left-12 top-12 h-44 w-44 rounded-full bg-[var(--olive-green)] blur-[140px]" />
        <div class="absolute right-16 bottom-14 h-60 w-60 rounded-full bg-[var(--primary-brown)]/70 blur-[180px]" />
      </div>
      <div class="relative mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div class="space-y-6 text-center lg:text-left">
            <h1 class="text-8 font-semibold leading-tight lg:text-12" style="font-family: var(--font-primary)">
              Surrogate Requirements & Surrogacy Qualifications: Become a Surrogate
            </h1>
            <p class="text-4.5 leading-relaxed">
              Thinking about gestational surrogacy and ready to become a surrogate? This page explains the core surrogacy requirements in plain language. You’ll see the surrogate qualifications doctors and coordinators check, plus the steps to apply as a surrogate mother. If you meet these surrogate requirements, you can be a surrogate with confidence and start your journey today.
            </p>
            <div class="flex flex-wrap justify-center gap-4 lg:justify-start">
              <NuxtLink
                to="/be-surrogate"
                class="rounded-full bg-[var(--primary-brown)] px-6 py-3 text-3.5 font-semibold uppercase text-white transition hover:bg-[var(--dark-brown)]"
              >
                Check Your Eligibility
              </NuxtLink>
              <a
                href="#quick-eligibility"
                class="rounded-full border border-[var(--primary-brown)] px-6 py-3 text-3.5 font-semibold uppercase transition hover:bg-white"
                @click.prevent="scrollToSection('quick-eligibility')"
              >
                View Requirements
              </a>
            </div>
          </div>
          <div class="flex justify-center">
            <div class="image-placeholder max-w-300 w-full transition-all duration-500 hover:scale-105">
              <img src="/images/landingpage3/Surrogate-Requirements.jpg" alt="Surrogate Requirements">
            </div>
          </div>
        </div>
      </div>
      <nav class="sticky left-0 top-24 z-40 mt-12">
        <div class="mx-auto max-w-280 px-5 lg:px-10">
          <div class="overflow-x-auto">
            <ul class="flex gap-4 rounded-full border border-[var(--primary-brown)]/30 bg-white/85 px-5 py-3 shadow-lg shadow-black/10 backdrop-blur">
              <li
                v-for="section in sections"
                :key="section.id"
              >
                <button
                  type="button"
                  class="rounded-full px-4 py-2 text-3 font-medium uppercase transition"
                  :class="activeSection === section.id ? 'bg-[var(--primary-brown)] text-white' : 'text-[var(--primary-brown)] hover:bg-[var(--light-cream)]'"
                  @click="scrollToSection(section.id)"
                >
                  {{ section.label }}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>

    <section id="intro" class="py-18 lg:py-24">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="rounded-6 border border-[var(--olive-green)]/40 bg-white/95 p-10 shadow-lg shadow-black/10">
          <p class="text-5 leading-relaxed">
            Thinking about gestational surrogacy and ready to become a surrogate? This page explains the core surrogacy requirements in plain language. You’ll see the surrogate qualifications doctors and coordinators check, plus the steps to apply as a surrogate mother. If you meet these surrogate requirements, you can be a surrogate with confidence and start your journey today.
          </p>
        </div>
      </div>
    </section>

    <section id="quick-eligibility" class="bg-[var(--foot-bg)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <h2 class="text-7 font-semibold uppercase lg:text-8 transition-all duration-500 hover:scale-105 animate-fade-in-up text-center mb-12" style="font-family: var(--font-primary)">
          Who We're Looking For: Surrogacy Requirements (Quick Eligibility)
        </h2>
        
        <div class="grid gap-12 lg:grid-cols-[0.6fr,0.4fr] lg:items-start">
          <!-- Left Content -->
          <div class="space-y-8">
            <p class="text-4.5 leading-relaxed text-center lg:text-left animate-fade-in-up" style="animation-delay: 200ms;">
              Tap through each category to confirm you meet the baseline surrogate qualifications. These panels summarize what clinics and coordinators review before you become a surrogate.
            </p>
            
            <!-- Tab Navigation -->
            <div class="flex flex-wrap justify-center gap-3 lg:justify-start animate-fade-in-up" style="animation-delay: 400ms;">
              <button
                v-for="(tab, index) in requirementTabs"
                :key="tab.id"
                type="button"
                class="px-6 py-3 rounded-full border-2 transition-all duration-300 font-semibold uppercase text-3.5 transform hover:scale-105"
                :class="activeRequirementTab === tab.id 
                  ? 'border-[var(--primary-brown)] bg-[var(--primary-brown)] text-white shadow-lg' 
                  : 'border-[var(--olive-green)] bg-white text-[var(--dark-brown)] hover:border-[var(--primary-brown)] hover:bg-[var(--light-cream)]'"
                :style="{ animationDelay: `${500 + (index * 100)}ms` }"
                @click="activeRequirementTab = tab.id"
              >
                {{ tab.label }}
              </button>
            </div>

            <!-- Tab Content -->
            <div class="bg-white/95 rounded-8 p-8 shadow-xl border border-[var(--olive-green)]/30 animate-fade-in-up" style="animation-delay: 600ms;">
              <div class="flex items-center gap-4 mb-6">
                <div class="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary-brown)] to-[var(--dark-brown)] text-white shadow-lg transition-all duration-300 hover:scale-110">
                  <Icon :name="requirementIcons[requirementTabs.findIndex((tab: any) => tab.id === activeRequirementTab)]" class="h-8 w-8" />
                </div>
                <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
                  {{ tabContent.title }}
                </h3>
              </div>
              <ul class="space-y-4 text-4.25 leading-relaxed">
                <li
                  v-for="(item, index) in tabContent.items"
                  :key="item"
                  class="flex items-start gap-3 transition-all duration-300 animate-fade-in-left hover:bg-[var(--light-cream)]/30 p-3 rounded"
                  :style="{ animationDelay: `${700 + (index * 100)}ms` }"
                >
                  <Icon name="radix-icons:check-circled" class="mt-0.5 h-4 w-4 text-[var(--primary-brown)] transition-all duration-300 hover:scale-125" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>
          </div>

          <!-- Right Image -->
          <div class="flex justify-center lg:justify-end animate-fade-in-right" style="animation-delay: 300ms;">
            <div class="relative max-w-400 w-full">
              <div class="absolute inset-0 bg-gradient-to-br from-[var(--primary-brown)]/20 to-[var(--olive-green)]/20 rounded-8 blur-xl"></div>
              <div class="relative rounded-8 overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                <img 
                  src="/images/landingpage3/Surrogacy-Requirements.jpg" 
                  alt="Surrogacy Requirements" 
                  class="w-full h-auto object-cover"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="medical-lifestyle" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10 space-y-12">
        <div class="text-center">
          <h2 class="text-7 font-semibold uppercase lg:text-8 transition-all duration-500 hover:scale-105 animate-fade-in-up" style="font-family: var(--font-primary)">
            Medical & Lifestyle Requirements for Gestational Surrogacy
          </h2>
          <div class="mt-4 w-32 h-1 bg-[var(--primary-brown)] mx-auto rounded-full animate-fade-in-up" style="animation-delay: 200ms;"></div>
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <article
            v-for="(section, index) in medicalLifestyleSections"
            :key="section.heading"
            class="rounded-8 border border-[var(--olive-green)]/30 bg-white/95 p-8 shadow-lg shadow-black/10 transition-all duration-300 hover:border-[var(--primary-brown)] hover:shadow-xl hover:scale-[1.02] animate-fade-in-up"
            :style="{ animationDelay: `${300 + (index * 150)}ms` }"
          >
            <div class="flex items-center gap-4 mb-6">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--olive-green)] to-[var(--primary-brown)] text-white shadow-lg">
                <Icon name="radix-icons:heart-filled" class="h-6 w-6" />
              </div>
              <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
                {{ section.heading }}
              </h3>
            </div>
            <p
              v-for="(paragraph, pIndex) in section.body"
              :key="paragraph"
              class="mt-3 text-4.25 leading-relaxed transition-all duration-300 animate-fade-in-left"
              :style="{ animationDelay: `${400 + (index * 150) + (pIndex * 100)}ms` }"
            >
              {{ paragraph }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section id="disqualify" class="relative py-18 lg:py-24 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0 z-0">
        <img 
          src="/images/landingpage3/IVF-Surrogacy-Process.jpg" 
          alt="IVF Surrogacy Process" 
          class="w-full h-full object-cover"
        >
        <div class="absolute inset-0 bg-[var(--dark-brown)]/80"></div>
        <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--dark-brown)]/60 to-[var(--dark-brown)]/90"></div>
      </div>
      
      <div class="relative z-10 mx-auto max-w-280 px-5 lg:px-10 space-y-12">
        <!-- Title with Background -->
        <div class="text-center">
          <h2 class="text-7 font-semibold uppercase lg:text-8 text-white transition-all duration-500 hover:scale-105 animate-fade-in-up" style="font-family: var(--font-primary)">
            What Can Disqualify You From Becoming a Surrogate
          </h2>
          <div class="mt-4 w-24 h-1 bg-[var(--primary-brown)] mx-auto rounded-full animate-fade-in-up" style="animation-delay: 200ms;"></div>
        </div>
        
        <!-- Content Cards -->
        <div class="grid gap-8 lg:grid-cols-2">
          <article
            v-for="(section, index) in disqualifySections"
            :key="section.title"
            class="rounded-8 border border-white/20 bg-white/95 backdrop-blur-sm p-8 shadow-2xl transition-all duration-300 hover:border-[var(--primary-brown)] hover:shadow-3xl hover:scale-[1.02] animate-fade-in-up"
            :style="{ animationDelay: `${300 + (index * 150)}ms` }"
          >
            <div class="flex items-center gap-4 mb-6">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary-brown)] to-[var(--dark-brown)] text-white shadow-lg">
                <Icon name="radix-icons:exclamation-triangle" class="h-6 w-6" />
              </div>
              <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
                {{ section.title }}
              </h3>
            </div>
            <p
              v-for="(paragraph, pIndex) in section.paragraphs"
              :key="paragraph"
              class="mt-3 text-4.25 leading-relaxed transition-all duration-300 animate-fade-in-left"
              :style="{ animationDelay: `${400 + (index * 150) + (pIndex * 100)}ms` }"
            >
              {{ paragraph }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section id="process" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10 space-y-12">
        <div class="text-center">
          <h2 class="text-7 font-semibold uppercase lg:text-8 transition-all duration-500 hover:scale-105 animate-fade-in-up" style="font-family: var(--font-primary)">
            Screening & Clearance Steps: IVF Surrogacy Process
          </h2>
          <div class="mt-4 w-32 h-1 bg-[var(--primary-brown)] mx-auto rounded-full animate-fade-in-up" style="animation-delay: 200ms;"></div>
        </div>
        
        <!-- Process Timeline -->
        <div class="relative">
          <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--primary-brown)] via-[var(--olive-green)] to-[var(--primary-brown)] opacity-30 hidden lg:block"></div>
          <div class="grid gap-8 lg:grid-cols-3">
            <article
              v-for="(step, index) in processSteps"
              :key="step.title"
              class="relative flex items-start gap-6 animate-fade-in-up"
              :style="{ animationDelay: `${300 + (index * 200)}ms` }"
            >
              <!-- Step Number Circle -->
              <div class="relative z-10 flex-shrink-0">
                <div class="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[var(--primary-brown)] bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                  <span class="text-2xl font-bold text-[var(--primary-brown)]">{{ index + 1 }}</span>
                </div>
              </div>
              
              <!-- Step Content -->
              <div class="flex-1 rounded-8 border border-[var(--olive-green)]/30 bg-white/95 p-6 shadow-lg shadow-black/10 transition-all duration-300 hover:border-[var(--primary-brown)] hover:shadow-xl hover:scale-[1.02]">
                <div class="flex items-center gap-4 mb-4">
                  <div class="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[var(--olive-green)] to-[var(--primary-brown)] text-white shadow-lg">
                    <Icon :name="processIcons[index]" class="h-6 w-6" />
                  </div>
                  <h3 class="text-4 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
                    {{ step.title }}
                  </h3>
                </div>
                <p class="text-4.25 leading-relaxed transition-all duration-300">
                  {{ step.text }}
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section id="compensation" class="bg-[var(--foot-bg)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-12 lg:grid-cols-[0.6fr,0.4fr] lg:items-center">
          <!-- Left Content -->
          <div class="space-y-8">
            <h2 class="text-7 font-semibold uppercase lg:text-8 transition-all duration-500 hover:scale-105 animate-fade-in-left" style="font-family: var(--font-primary)">
              Compensation & Support: Surrogate Pay, Escrow, and Benefits
            </h2>
            <p class="text-4.5 leading-relaxed animate-fade-in-left" style="animation-delay: 200ms;">
              We ensure your journey is supported with clear compensation, secure escrow, and comprehensive benefits throughout the entire process.
            </p>
            
            <!-- Compensation Cards -->
            <div class="grid gap-6 lg:grid-cols-2">
              <article
                v-for="(card, index) in compensationHighlights"
                :key="card.title"
                class="rounded-8 border border-[var(--olive-green)]/30 bg-white/95 p-6 shadow-lg shadow-black/10 transition-all duration-300 hover:border-[var(--primary-brown)] hover:shadow-xl hover:scale-[1.02] animate-fade-in-up"
                :style="{ animationDelay: `${300 + (index * 150)}ms` }"
              >
                <div class="flex items-center gap-3 mb-4">
                  <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--primary-brown)] to-[var(--dark-brown)] text-white shadow-lg">
                    <Icon name="radix-icons:star-filled" class="h-5 w-5" />
                  </div>
                  <h3 class="text-4 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
                    {{ card.title }}
                  </h3>
                </div>
                <p
                  v-for="(paragraph, pIndex) in card.paragraphs"
                  :key="paragraph"
                  class="mt-3 text-4 leading-relaxed transition-all duration-300 animate-fade-in-left"
                  :style="{ animationDelay: `${400 + (index * 150) + (pIndex * 100)}ms` }"
                >
                  {{ paragraph }}
                </p>
              </article>
            </div>
          </div>

          <!-- Right Image -->
          <div class="flex justify-center lg:justify-end animate-fade-in-right" style="animation-delay: 200ms;">
            <div class="relative max-w-400 w-full">
              <div class="absolute inset-0 bg-gradient-to-br from-[var(--primary-brown)]/20 to-[var(--olive-green)]/20 rounded-8 blur-xl"></div>
              <div class="relative rounded-8 overflow-hidden shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl">
                <img 
                  src="/images/landingpage3/Compensation-Support.jpg" 
                  alt="Compensation & Support" 
                  class="w-full h-auto object-cover"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="faq" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="text-center mb-12">
          <h2 class="text-7 font-semibold uppercase lg:text-8 transition-all duration-500 hover:scale-105 animate-fade-in-up" style="font-family: var(--font-primary)">
            Frequently Asked Questions
          </h2>
          <div class="mt-4 w-24 h-1 bg-[var(--primary-brown)] mx-auto rounded-full animate-fade-in-up" style="animation-delay: 200ms;"></div>
        </div>
        <div class="space-y-6">
          <article
            v-for="(item, index) in faqItems"
            :key="item.question"
            class="rounded-8 border border-[var(--olive-green)]/30 bg-white/95 shadow-lg shadow-black/10 transition-all duration-300 hover:border-[var(--primary-brown)] hover:shadow-xl hover:scale-[1.01] animate-fade-in-up"
            :style="{ animationDelay: `${300 + (index * 150)}ms` }"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between gap-4 px-8 py-6 text-left transition-all duration-300 hover:bg-[var(--light-cream)]/30"
              @click="toggleFaq(item.question)"
            >
              <span class="text-4.5 font-semibold transition-all duration-300 hover:text-[var(--primary-brown)]">
                {{ item.question }}
              </span>
              <Icon
                :name="expandedFaq[item.question] ? 'radix-icons:chevron-up' : 'radix-icons:chevron-down'"
                class="h-6 w-6 text-[var(--primary-brown)] transition-all duration-300 transform"
                :class="expandedFaq[item.question] ? 'rotate-180' : 'rotate-0'"
              />
            </button>
            <Transition
              enter-active-class="transition-all duration-500 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-[2000px]"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="opacity-100 max-h-[2000px]"
              leave-to-class="opacity-0 max-h-0"
            >
              <div
                v-if="expandedFaq[item.question]"
                class="border-t border-[var(--olive-green)]/30 px-8 py-6 text-4.25 leading-relaxed overflow-hidden"
              >
                <p class="transition-all duration-300 animate-fade-in-up">
                  {{ item.answer }}
                </p>
              </div>
            </Transition>
          </article>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-[var(--dark-brown)] py-18 text-white">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/4 top-0 h-60 w-60 rounded-full bg-[var(--primary-brown)]/40 blur-[160px]" />
        <div class="absolute right-1/5 bottom-0 h-48 w-48 rounded-full bg-[var(--olive-green)]/50 blur-[140px]" />
      </div>
      <div class="relative mx-auto max-w-240 px-5 text-center">
        <h2 class="text-8 font-semibold uppercase tracking-wide lg:text-10" style="font-family: var(--font-primary)">
          Ready to Become a Surrogate?
        </h2>
        <p class="mt-4 text-4.5 leading-relaxed">
          With clear requirements, steady support, and milestone-based planning, you can take the next step with confidence. Let’s confirm your eligibility and design your journey together.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <NuxtLink
            to="/be-surrogate"
            class="rounded-full bg-white px-6 py-3 text-3.5 font-semibold uppercase text-[var(--dark-brown)] transition hover:bg-[var(--light-cream)]"
          >
            Start Application
          </NuxtLink>
          <NuxtLink
            to="/journey"
            class="rounded-full border border-white px-6 py-3 text-3.5 font-semibold uppercase text-white transition hover:bg-white/10"
          >
            Explore the Journey
          </NuxtLink>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<style scoped>
.image-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 220px;
  border: 2px dashed rgba(169, 108, 66, 0.5);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

/* Custom Animation Classes */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-left {
  animation: fadeInLeft 0.8s ease-out forwards;
  opacity: 0;
}

.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out forwards;
  opacity: 0;
}

/* Smooth scrolling for better UX */
html {
  scroll-behavior: smooth;
}

/* Enhanced hover effects */
.hover-lift {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Improved focus states for accessibility */
button:focus,
a:focus {
  outline: 2px solid var(--primary-brown);
  outline-offset: 2px;
}

/* Better mobile responsiveness */
@media (max-width: 768px) {
  .animate-fade-in-up,
  .animate-fade-in-left,
  .animate-fade-in-right {
    animation-duration: 0.6s;
  }
}
</style>

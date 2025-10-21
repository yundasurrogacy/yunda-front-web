<script setup lang="ts">
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

const surrogacyTabs = [
  {
    id: 'meaning',
    heading: 'Surrogacy Meaning',
    title: 'Surrogacy Meaning: A Clear Way to Help a Family',
    content: [
      'You want your pregnancy experience to matter. Surrogacy meaning comes down to one idea: you carry so another family can hold their child.',
      'You ask, what does surrogate mean in real life? It means you choose to help, and you keep your voice at every step.'    ],
  },
  {
    id: 'gestational',
    heading: 'Gestational Surrogacy',
    title: 'What Is Gestational Surrogacy?',
    content: [
      'You may also ask what is gestational surrogacy. In this path, doctors create an embryo from the intended parents or donors, then place it with a gestational carrier. You do not share genetics with the baby.',
      'People sometimes mention traditional surrogacy, which uses the carrier\'s egg. That is rare and not the standard in modern programs.',
      'Most agencies and clinics focus on clear, ethical care and a simple, science-first approach.',
    ],
  },
  {
    id: 'motivation',
    heading: 'Why Women Step Forward',
    title: 'Why Women Step Forward',
    content: [
      'You want to change a life. You also want structure and respect. Women choose this path because the journey offers purpose, teamwork, and steady guidance.',
      'You meet a family. You set boundaries. You get support through each phase. Many candidates also ask about surrogate compensation.',
      'Programs outline compensation in a contract and tie payments to real milestones. The goal is simple: match your effort with reliable support while you focus on your health.',
    ],
  },
  {
    id: 'voice',
    heading: 'Your Voice, Your Choice',
    title: 'Your Voice, Your Choice',
    content: [
      'You choose who you match with. You review the plan with your own advisor. You ask questions until everything feels right.',
      'You can say yes when the fit feels good, and you can step back when it does not. You bring kindness, strength, and real experience to the table.',
      'Families feel that. This is why so many women with healthy pregnancies choose to carry again for someone who needs them.',
    ],
  },
]

const activeTabId = ref(surrogacyTabs[0].id)
const activeTab = computed(() => surrogacyTabs.find(tab => tab.id === activeTabId.value) ?? surrogacyTabs[0])

const compensationTabs = [
  { id: 'coverage', title: 'Coverage' },
  { id: 'payments', title: 'Payments' },
  { id: 'benefits', title: 'Benefits' },
  { id: 'protection', title: 'Protection' },
]

const activeCompensationTab = ref(compensationTabs[0].id)

const quickFitChecks = [
  'You fall within the program\'s surrogate age limit (most clinics look for early 20s to late 30s).',
  'You keep a healthy BMI within clinic guidelines.',
  'You don\'t smoke, vape, or use drugs.',
  'You don\'t misuse alcohol.',
  'You manage stress well and have steady sleep and nutrition.',
  'You feel ready for screenings and a planned pregnancy.',
]

const clinicChecks = [
  'Prior full-term birth with good recovery.',
  'No more than the program\'s limit on prior C-sections.',
  'Up-to-date Pap and OB visits.',
  'Vaccines per clinic policy.',
  'Support system at home for appointments and travel.',
]

const whatThisMeans = [
  'You choose your match; you can say no.',
  'You get independent legal counsel.',
  'You receive clear payment schedules and escrow details.',
  'You keep a coordinator who answers texts and calls.',
  'You stay close to home for OB care when possible; you travel only for key clinic visits.',
]

const requirementDropdowns = [
  {
    id: 'who',
    title: 'Who Can Be a Surrogate Mother?',
    blocks: [
      {
        type: 'paragraph',
        text: 'You ask, who can be a surrogate mother. You qualify when you meet clear surrogacy requirements and surrogacy qualifications set by clinics and your legal team. You\'ve had at least one full-term birth. You feel healthy. You want to help a family. You understand gestational surrogacy and the role of a gestational surrogate mother.',
      },
      {
        type: 'paragraph',
        text: 'Quick fit check:',
      },
      {
        type: 'list',
        icon: 'radix-icons:check-circled',
        items: quickFitChecks,
      },
    ],
  },
  {
    id: 'health',
    title: 'Health and Lifestyle Checklist',
    blocks: [
      {
        type: 'paragraph',
        text: 'We look at your real life, not just forms. You share your OB records and your delivery history. We review any C-sections and note how you healed. We confirm no major complications like severe preeclampsia or uncontrolled diabetes. You complete a mental-health eval. You finish labs and a background check. You meet a coordinator who explains each step in plain English.',
      },
      {
        type: 'paragraph',
        text: 'Clinic-driven checks:',
      },
      {
        type: 'list',
        icon: 'radix-icons:check-circled',
        items: clinicChecks,
      },
      {
        type: 'paragraph',
        text: 'Mental-health evaluations, lab work, and background checks ensure everyone starts with aligned expectations.',
      },
    ],
  },
  {
    id: 'legal',
    title: 'Location, Legal, and Support',
    blocks: [
      {
        type: 'paragraph',
        text: 'Where you live matters. Many programs match within surrogate friendly states so lawyers can secure parentage on time. You work with your own attorney. You review your contract line by line. You approve every clause before you move forward.',
      },
      {
        type: 'paragraph',
        text: 'What this means for you:',
      },
      {
        type: 'list',
        icon: 'radix-icons:dot-filled',
        items: whatThisMeans,
      },
    ],
  },
  {
    id: 'beyond',
    title: 'What We Look For Beyond the Basics',
    blocks: [
      {
        type: 'paragraph',
        text: 'You bring heart and follow-through. You show up for monitoring. You ask questions when something feels off. You protect your time and your body. You carry with purpose. That mindset sets a great surrogate mom apart.',
      },
    ],
  },
]

const expandedRequirements = ref<Record<string, boolean>>({})

function toggleRequirement(id: string) {
  expandedRequirements.value = {
    ...expandedRequirements.value,
    [id]: !expandedRequirements.value[id],
  }
}

function isRequirementExpanded(id: string) {
  return expandedRequirements.value[id] === true
}

const journeyIntro = 'Surrogate mother often asks what is the process to become a surrogate. Here\'s a clear map of the surrogacy steps. You move through seven stages with a steady team, simple checklists, and honest timelines. These surrogate steps keep the process calm and predictable.'

const journeySteps = [
  {
    title: 'Step 1: Apply & Pre-Qualify',
    details: [
      'Surrogate mother completes a short form and shares birth history.',
      'A coordinator calls to learn goals and answer basics.',
      'You get a clean overview of the surrogacy timeline and what happens next.',
      'If the fit looks right, we open your file and schedule records review.',
    ],
  },
  {
    title: 'Step 2: Records & Screening',
    details: [
      'Surrogate mother sends OB records and prior delivery notes.',
      'You finish labs, a mental-health evaluation, and a background check.',
      'The clinic confirms readiness for a planned pregnancy.',
      'You get plain-English guidance on travel, scheduling, and insurance.',
    ],
  },
  {
    title: 'Step 3: Matching & Social Fit',
    details: [
      'We introduce intended parents who match your values.',
      'You meet on a guided video call. You ask every question.',
      'If the match feels right, we move forward.',
      'We also offer fast-track matching for experienced surrogates when embryos and calendars line up.',
    ],
  },
  {
    title: 'Step 4: Legal & Escrow Setup',
    details: [
      'You work with your own attorney.',
      'You review the contract line by line.',
      'Funds move into escrow with trusted partners such as SeedTrust.',
      'We coordinate insurance with sector experts like ART Risk.',
      'You see clear schedules, categories, and milestones before you start medication.',
    ],
  },
  {
    title: 'Step 5: IVF Calendar & Embryo Transfer',
    details: [
      'The clinic issues your calendar for meds and monitoring.',
      'This is IVF surrogacy, so the embryo comes from the intended parents or donors.',
      'The team prepares for embryo transfer surrogacy with a simple, step-by-step plan.',
      'Many people call this embryo transfer to surrogate mother; your nurse walks you through each visit.',
      'We track your surrogate embryo transfer date and confirm next appointments.',
      'Clinics discuss surrogacy embryo transfer success rate in detail; numbers vary by embryo quality and medical history.',
    ],
  },
  {
    title: 'Step 6: Pregnancy Care & Check-Ins',
    details: [
      'You see a local OB for routine care.',
      'We keep a tight update rhythm with you and the family.',
      'We handle travel for special visits.',
      'We answer texts and calls quickly.',
      'We solve logistics so you can focus on a healthy pregnancy.',
    ],
  },
  {
    title: 'Step 7: Birth & Postpartum Support',
    details: [
      'We finalize the birth plan early.',
      'Legal steps and hospital notes sit in your file before due date.',
      'We stay on call through delivery.',
      'After birth, we help with forms, reimbursements, and any agreed support such as pumping supplies or short-term childcare.',
    ],
  },
]

const timelineParagraphs = [
  'Most journeys run about 16–18 months from application to postpartum check-ins. Matching speed, clinic calendars, and embryo readiness can shift timing.',
  'We share dates in writing and adjust with you. If you like tools, try a surrogacy due date calculator once the clinic confirms your transfer date. This keeps the process of surrogacy pregnancy simple and easy to follow.',
]

const communicationParagraph = 'We keep updates weekly during screening and matching, then follow your clinic cadence in pregnancy. Coordinators stay reachable by phone, text, and email. We provide bilingual support when needed. The goal stays the same: a smooth path, steady care, and a clear surrogacy timeline you can trust.'

const compensationCoverParagraphs = [
  'Surrogate mother gives time, health, and heart. Surrogate compensation reflects that work.',
  'The package includes base surrogate pay, monthly living stipends, and event-based amounts. It also includes travel, meals, and lodging for clinic visits.',
  'Programs add childcare and wage-loss support when a doctor orders bedrest. This is paid surrogacy with clear categories, not guesswork.',
]

const typicalInclusions = [
  'Base surrogate income with milestone timing',
  'Monthly stipend for everyday costs',
  'Maternity clothing allowance',
  'Travel and childcare reimbursement for required appointments',
  'Bedrest support when medically necessary',
  'Pumping/breast-milk stipend if Surrogate mother chooses to pump',
  'Separate amounts for procedures like C-section',
]

const paymentsParagraphs = [
  'We keep money predictable. Intended parents place funds in escrow with partners such as SeedTrust.',
  'We align each payment to a real step on the calendar. Contracts define start points and dates.',
  'Many journeys trigger monthly payments after heartbeat confirmation. We publish the schedule, and we follow it.',
  'Do surrogates get paid? Yes—by contract, by milestone, and through secure escrow for surrogacy payments.',
  'Client framework: first-time packages commonly range $50,000–$70,000+. Final numbers vary by state, clinic, insurance, and medical history. The contract sets the amount for each Surrogate mother.',
]

const benefitsIntroParagraphs = [
  'Surrogate mother deserves support beyond a single number. We coordinate real-life help so the journey stays calm.',
]

const supportExamples = [
  'Case manager on call for fast answers',
  'Door-to-door travel for transfer and key scans',
  'Meal, hotel, and mileage coverage per policy',
  'Partner wage-loss support when the clinic requires a companion',
  'Local OB care whenever possible, with clinic check-ins by plan',
]

const benefitsClosingParagraph = 'These bedrest support benefits and travel perks free up time and energy. Surrogate mother can focus on health and daily life.'

const milestonesListIntro = 'Milestones keep payments fair and simple. We tie each amount to a clear update.'

const milestonesList = [
  'Legal clearance signed',
  'Start of medications',
  'Embryo transfer to surrogate mother completed',
  'Surrogate embryo transfer follow-up',
  'Heartbeat confirmation and monthly cadence',
  'Trimester checkpoints',
  'Delivery and postpartum items',
]

const experiencedCarrierParagraph = 'Experienced carriers often qualify for higher packages. If you carried before, ask about fast-track matching for experienced surrogates and enhanced levels. This path can increase surrogate compensation when the profile and clinic approve.'

const legalProtectionParagraph = 'Surrogate mother meets with an independent attorney. You read every clause. You approve before anything starts. Insurance partners like ART Risk help structure coverage for pregnancy care. We coordinate claims so bills route to the right plan. We document every reimbursement. We keep records clean and easy to audit.'

const clarityParagraphs = [
  'We do not inflate numbers. We do not hide fees. We publish categories, schedules, and examples in writing. We align with clinic policy and state law. If a detail changes, we update the contract and the calendar.',
  'If Surrogate mother wants to get paid to be a surrogate with confidence, this structure makes it real and reliable—without surprises.',
]

const yundaPillars = [
  {
    title: 'Trusted Partners, Transparent Escrow',
    body: 'Surrogate mother wants clear money flow. We work with sector leaders like ART Risk and SeedTrust so funds, insurance, and risk plans stay organized and trackable. Intended parents fund a dedicated trust account. The account covers surrogate compensation, insurance, legal, and reimbursable items. We align disbursements to milestones and keep the ledger tidy.',
  },
  {
    title: 'Top Fertility Clinics in Southern California',
    body: 'We coordinate with proven IVF centers in Los Angeles and San Diego. California Fertility Partners (CFP) brings decades of third-party reproduction experience and advanced lab outcomes. Gen 5 Fertility Center in San Diego focuses on complex cases and embryo science, led by internationally recognized physicians. Surrogate mother benefits from strong clinical teams and clear calendars.',
  },
  {
    title: 'Clear Legal Path in California',
    body: 'California offers a stable framework for gestational surrogacy. Your legal team drafts and reviews the agreement, then secures a pre-birth order when appropriate. This protects parentage before delivery and keeps hospital planning smooth.',
  },
  {
    title: 'Local Surrogacy Agencies vs. Big Networks',
    body: 'Many candidates compare local surrogacy agencies with national networks and even browse best paying surrogacy agencies. We keep it simple: publish the categories, tie payments to milestones, and route funds through escrow so Surrogate mother can focus on health. If you want to become a surrogate in Southern California, this structure keeps the process steady and the support close to home.',
  },
]
</script>

<template>
  <div class="min-h-screen bg-[var(--head-bg)] text-[var(--dark-brown)]">
    <AppHeader />

    <!-- Hero -->
    <section class="relative overflow-hidden from-[var(--hero-center)]/80 via-[var(--light-cream)] to-[var(--foot-bg)] bg-gradient-to-b py-18 lg:py-24">
      <div class="pointer-events-none absolute inset-0 opacity-40">
        <div class="absolute left-10 top-10 h-40 w-40 rounded-full bg-[var(--olive-green)] blur-[120px] animate-pulse" />
        <div class="absolute bottom-10 right-10 h-60 w-60 rounded-full bg-[var(--primary-brown)]/70 blur-[160px] animate-pulse" style="animation-delay: 1s;" />
      </div>
      <div class="relative mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div class="text-center space-y-6 lg:text-left animate-fade-in-up">
            <h1 class="text-8 font-semibold leading-tight lg:text-12 transition-all duration-700 hover:scale-105" style="font-family: var(--font-primary)">
              Become a Surrogate: A Supported, Transparent Path with Yunda
            </h1>
            <div class="flex flex-wrap justify-center gap-4 lg:justify-start">
              <NuxtLink
                to="/be-surrogate"
                class="rounded-full bg-[var(--primary-brown)] px-6 py-3 text-3.5 text-white font-semibold uppercase transition-all duration-300 hover:bg-[var(--dark-brown)] hover:scale-105 hover:shadow-lg"
              >
                Start Application
              </NuxtLink>
              <NuxtLink
                to="/contact"
                class="border border-[var(--primary-brown)] rounded-full px-6 py-3 text-3.5 font-semibold uppercase transition-all duration-300 hover:bg-white hover:scale-105 hover:shadow-lg"
              >
                Talk to a Coordinator
              </NuxtLink>
            </div>
          </div>
          <div class="flex justify-center animate-fade-in-right">
            <div class="image-placeholder max-w-500  w-full transition-all duration-500 hover:scale-105">
              <img src="/images/landing page1/become a surrogate mother.jpg" alt="Become a Surrogate mother">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Women Choose Surrogacy -->
    <section id="why" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="flex flex-col gap-10 lg:flex-row lg:items-start">
          <div class="lg:w-1/3 animate-fade-in-left">
            <h2 class="text-7 font-semibold uppercase lg:text-8 transition-all duration-500 hover:scale-105" style="font-family: var(--font-primary)">
              Why Women Choose Surrogacy
            </h2>
            <p class="mt-4 text-4.5 leading-relaxed">
              Explore what surrogacy means today, why women step forward, and how you stay in control at every stage.
            </p>
            <div class="mt-10 flex flex-col gap-4">
              <button
                v-for="(tab, index) in surrogacyTabs"
                :key="tab.id"
                type="button"
                class="border rounded-4 px-4 py-3 text-left transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                :class="tab.id === activeTabId ? 'border-[var(--primary-brown)] bg-[var(--light-cream)] shadow-lg shadow-black/10 scale-105' : 'border-[var(--olive-green)]/40 bg-white hover:border-[var(--primary-brown)]/60 hover:bg-[var(--light-cream)]/50'"
                :style="{ animationDelay: `${index * 100}ms` }"
                @click="activeTabId = tab.id"
              >
                <span class="text-3 tracking-widest uppercase">{{ tab.heading }}</span>
                <span class="mt-1 block text-4.5 font-medium">{{ tab.title }}</span>
              </button>
            </div>
          </div>
          <div class="flex flex-col items-center gap-8 text-center lg:w-2/3 animate-fade-in-right">
            <div class="max-w-150 w-full border border-[var(--primary-brown)]/50 rounded-5 border-dashed bg-white/60 p-6 text-3.5 text-[var(--primary-brown)] tracking-wide uppercase transition-all duration-500 hover:scale-105 hover:shadow-lg">
              <div class="image-placeholder">
                <img src="/images/landing page1/women choose surrogacy.jpg" alt="Women choose surrogacy">
              </div>
            </div>
            <div class="max-w-150 w-full border border-[var(--olive-green)]/40 rounded-5 bg-white/90 p-8 shadow-black/10 shadow-lg transition-all duration-500 hover:shadow-xl">
              <h3 class="text-6 font-semibold uppercase transition-all duration-300" style="font-family: var(--font-primary)">
                {{ activeTab.title }}
              </h3>
              <div class="mt-6 text-4.25 leading-relaxed space-y-4 transition-all duration-500">
                <p v-for="(paragraph, index) in activeTab.content" :key="paragraph" 
                   class="transition-all duration-300"
                   :style="{ animationDelay: `${index * 200}ms` }">
                  {{ paragraph }}
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </section>

    <!-- Requirements -->
    <section id="requirements" class="bg-[var(--foot-bg)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <h2 class="text-7 font-semibold uppercase lg:text-8 transition-all duration-500 hover:scale-105 animate-fade-in-up" style="font-family: var(--font-primary)">
          Surrogacy Requirements & Qualifications
        </h2>
        <div class="mt-8 space-y-6">
          <article
            v-for="(dropdown, index) in requirementDropdowns"
            :key="dropdown.id"
            class="rounded-5 border border-[var(--olive-green)]/30 bg-white/95 shadow-lg shadow-black/10 transition-all duration-300 hover:border-[var(--primary-brown)] hover:shadow-xl hover:scale-[1.02] animate-fade-in-up"
            :style="{ animationDelay: `${index * 150}ms` }"
          >
            <button
              type="button"
              class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-all duration-300 hover:bg-[var(--light-cream)]/30"
              @click="toggleRequirement(dropdown.id)"
            >
              <h3 class="text-5 font-semibold uppercase transition-all duration-300" style="font-family: var(--font-primary)">
                {{ dropdown.title }}
              </h3>
              <Icon
                :name="isRequirementExpanded(dropdown.id) ? 'radix-icons:chevron-up' : 'radix-icons:chevron-down'"
                class="h-6 w-6 text-[var(--primary-brown)] transition-all duration-300 transform"
                :class="isRequirementExpanded(dropdown.id) ? 'rotate-180' : 'rotate-0'"
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
                v-if="isRequirementExpanded(dropdown.id)"
                class="border-t border-[var(--olive-green)]/30 px-6 py-5 text-4.25 leading-relaxed space-y-4 overflow-hidden"
              >
                <template v-for="(block, blockIndex) in dropdown.blocks" :key="`${dropdown.id}-${blockIndex}`">
                  <p v-if="block.type === 'paragraph'" class="transition-all duration-300 animate-fade-in-up" :style="{ animationDelay: `${blockIndex * 100}ms` }">
                    {{ block.text }}
                  </p>
                  <div v-else-if="block.type === 'list'" class="space-y-3 transition-all duration-300 animate-fade-in-up" :style="{ animationDelay: `${blockIndex * 100}ms` }">
                    <p v-if="block.label" class="text-3.5 font-semibold uppercase tracking-wide text-[var(--primary-brown)]">
                      {{ block.label }}
                    </p>
                    <ul class="space-y-3">
                      <li v-for="(item, itemIndex) in block.items" :key="item" class="flex items-start gap-3 transition-all duration-300 animate-fade-in-left" :style="{ animationDelay: `${(blockIndex * 100) + (itemIndex * 50)}ms` }">
                        <Icon :name="block.icon" class="mt-0.5 h-4 w-4 text-[var(--primary-brown)] transition-all duration-300 hover:scale-125" />
                        <span>{{ item }}</span>
                      </li>
                    </ul>
                  </div>
                </template>
              </div>
            </Transition>
          </article>
        </div>
      </div>
    </section>

    <!-- Journey -->
    <section id="journey" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <h2 class="text-7 font-semibold uppercase lg:text-8 transition-all duration-500 hover:scale-105 animate-fade-in-up" style="font-family: var(--font-primary)">
          Your Surrogacy Journey: Steps & Timeline
        </h2>
        <p class="mt-4 text-4.5 leading-relaxed animate-fade-in-up" style="animation-delay: 200ms;">
          {{ journeyIntro }}
        </p>
        
        <!-- Progress Timeline -->
        <div class="mt-12 relative">
          <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[var(--primary-brown)] via-[var(--olive-green)] to-[var(--primary-brown)] opacity-30"></div>
          <div class="grid gap-8">
            <div
              v-for="(step, index) in journeySteps"
              :key="step.title"
              class="relative flex items-start gap-6 animate-fade-in-up"
              :style="{ animationDelay: `${index * 200}ms` }"
            >
              <!-- Step Number Circle -->
              <div class="relative z-10 flex-shrink-0">
                <div class="flex h-16 w-16 items-center justify-center rounded-full border-4 border-[var(--primary-brown)] bg-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
                  <span class="text-2xl font-bold text-[var(--primary-brown)]">{{ index + 1 }}</span>
                </div>
              </div>
              
              <!-- Step Content -->
              <div class="flex-1 border border-[var(--olive-green)]/40 rounded-5 bg-white/95 p-6 shadow-black/10 shadow-lg transition-all duration-300 hover:border-[var(--primary-brown)] hover:shadow-xl hover:scale-[1.02]">
                <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
                  {{ step.title }}
                </h3>
                <div class="mt-4 text-4.25 leading-relaxed space-y-3">
                  <p v-for="(detail, detailIndex) in step.details" :key="detail" 
                     class="transition-all duration-300 animate-fade-in-left"
                     :style="{ animationDelay: `${(index * 200) + (detailIndex * 100)}ms` }">
                    {{ detail }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-10 text-4.5 leading-relaxed space-y-6 animate-fade-in-up" style="animation-delay: 1400ms;">
          <p v-for="(paragraph, index) in timelineParagraphs" :key="paragraph" 
             class="transition-all duration-300"
             :style="{ animationDelay: `${1400 + (index * 200)}ms` }">
            {{ paragraph }}
          </p>
          <p class="transition-all duration-300" style="animation-delay: 1800ms;">
            {{ communicationParagraph }}
          </p>
        </div>
      </div>
    </section>

    <!-- Compensation -->
    <section id="compensation" class="bg-[var(--foot-bg)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <h2 class="text-7 font-semibold uppercase lg:text-8 transition-all duration-500 hover:scale-105 animate-fade-in-up text-center" style="font-family: var(--font-primary)">
          Compensation & Benefits
        </h2>
        <p class="text-center text-4.5 leading-relaxed mt-4 animate-fade-in-up" style="animation-delay: 200ms;">
          How We Support You Every Step of the Way
        </p>

        <!-- Compensation Overview Cards -->
        <div class="grid mt-12 gap-8 lg:grid-cols-3">
          <!-- Base Compensation Card -->
          <div class="bg-gradient-to-br from-[var(--primary-brown)] to-[var(--dark-brown)] rounded-8 p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl animate-fade-in-up" style="animation-delay: 300ms;">
            <div class="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
              <Icon name="radix-icons:star-filled" class="w-8 h-8 text-white" />

            </div>
            
            <h3 class="text-5 font-bold uppercase text-center mb-4" style="font-family: var(--font-primary)">
              Base Compensation
            </h3>
            <div class="text-center mb-4">
              <span class="text-6 font-bold">$50,000 - $70,000+</span>
              <p class="text-3.5 opacity-90 mt-2">First-time packages</p>
            </div>
            <p class="text-4 leading-relaxed text-center opacity-90">
              Milestone-based payments through secure escrow with clear schedules and categories.
            </p>
          </div>

          <!-- Monthly Support Card -->
          <div class="bg-gradient-to-br from-[var(--olive-green)] to-[var(--primary-brown)] rounded-8 p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl animate-fade-in-up" style="animation-delay: 500ms;">
            <div class="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
              <Icon name="radix-icons:calendar" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-5 font-bold uppercase text-center mb-4" style="font-family: var(--font-primary)">
              Monthly Support
            </h3>
            <div class="text-center mb-4">
              <span class="text-6 font-bold">Ongoing</span>
              <p class="text-3.5 opacity-90 mt-2">Living stipends</p>
            </div>
            <p class="text-4 leading-relaxed text-center opacity-90">
              Monthly stipends for everyday costs, plus maternity clothing and travel allowances.
            </p>
          </div>

          <!-- Additional Benefits Card -->
          <div class="bg-gradient-to-br from-[var(--dark-brown)] to-[var(--olive-green)] rounded-8 p-8 text-white shadow-2xl transition-all duration-500 hover:scale-105 hover:shadow-3xl animate-fade-in-up" style="animation-delay: 700ms;">
            <div class="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
              <Icon name="radix-icons:heart" class="w-8 h-8 text-white" />
            </div>
            <h3 class="text-5 font-bold uppercase text-center mb-4" style="font-family: var(--font-primary)">
              Additional Benefits
            </h3>
            <div class="text-center mb-4">
              <span class="text-6 font-bold">Comprehensive</span>
              <p class="text-3.5 opacity-90 mt-2">Full support</p>
            </div>
            <p class="text-4 leading-relaxed text-center opacity-90">
              Travel, childcare, bedrest support, and pumping supplies when needed.
            </p>
          </div>
        </div>

        <!-- Detailed Information Tabs -->
        <div class="mt-16">
          <div class="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up" style="animation-delay: 900ms;">
            <button
              v-for="(tab, index) in compensationTabs"
              :key="tab.id"
              type="button"
              class="px-6 py-3 rounded-full border-2 transition-all duration-300 font-semibold uppercase text-3.5"
              :class="activeCompensationTab === tab.id 
                ? 'border-[var(--primary-brown)] bg-[var(--primary-brown)] text-white shadow-lg' 
                : 'border-[var(--olive-green)] bg-white text-[var(--dark-brown)] hover:border-[var(--primary-brown)] hover:bg-[var(--light-cream)]'"
              :style="{ animationDelay: `${1000 + (index * 100)}ms` }"
              @click="activeCompensationTab = tab.id"
            >
              {{ tab.title }}
            </button>
          </div>

          <!-- Tab Content -->
          <div class="bg-white/95 rounded-8 p-8 shadow-xl border border-[var(--olive-green)]/30 animate-fade-in-up" style="animation-delay: 1200ms;">
            <div v-if="activeCompensationTab === 'coverage'" class="space-y-6">
              <h3 class="text-5 font-semibold uppercase text-[var(--primary-brown)] mb-6" style="font-family: var(--font-primary)">
                What Surrogate Compensation Covers
              </h3>
              <div class="grid gap-6 lg:grid-cols-2">
                <div class="space-y-4">
                  <p v-for="(paragraph, index) in compensationCoverParagraphs" :key="paragraph" 
                     class="text-4.25 leading-relaxed transition-all duration-300 animate-fade-in-left"
                     :style="{ animationDelay: `${1300 + (index * 100)}ms` }">
                    {{ paragraph }}
                  </p>
                </div>
                <div class="bg-[var(--light-cream)]/50 rounded-6 p-6">
                  <h4 class="text-4 font-semibold uppercase text-[var(--primary-brown)] mb-4">Typical Inclusions</h4>
                  <ul class="space-y-3">
                    <li v-for="(item, index) in typicalInclusions" :key="item" 
                        class="flex items-start gap-3 text-4 leading-relaxed transition-all duration-300 animate-fade-in-left hover:bg-white/50 p-2 rounded"
                        :style="{ animationDelay: `${1400 + (index * 50)}ms` }">
                      <Icon name="radix-icons:check-circled" class="mt-0.5 h-4 w-4 text-[var(--primary-brown)] transition-all duration-300 hover:scale-125" />
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-if="activeCompensationTab === 'payments'" class="space-y-6">
              <h3 class="text-5 font-semibold uppercase text-[var(--primary-brown)] mb-6" style="font-family: var(--font-primary)">
                How Payments Work
              </h3>
              <div class="grid gap-8 lg:grid-cols-2">
                <div class="space-y-4">
                  <p v-for="(paragraph, index) in paymentsParagraphs" :key="paragraph" 
                     class="text-4.25 leading-relaxed transition-all duration-300 animate-fade-in-left"
                     :style="{ animationDelay: `${1300 + (index * 100)}ms` }">
                    {{ paragraph }}
                  </p>
                </div>
                <div class="bg-gradient-to-br from-[var(--light-cream)] to-white rounded-6 p-6 border border-[var(--olive-green)]/30">
                  <h4 class="text-4 font-semibold uppercase text-[var(--primary-brown)] mb-4">Payment Timeline</h4>
                  <div class="space-y-3">
                    <div v-for="(milestone, index) in milestonesList" :key="milestone" 
                         class="flex items-center gap-3 p-3 bg-white/70 rounded transition-all duration-300 hover:bg-white hover:shadow-md animate-fade-in-left"
                         :style="{ animationDelay: `${1400 + (index * 100)}ms` }">
                      <div class="w-8 h-8 bg-[var(--primary-brown)] rounded-full flex items-center justify-center text-white text-3 font-bold">
                        {{ index + 1 }}
                      </div>
                      <span class="text-4">{{ milestone }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="activeCompensationTab === 'benefits'" class="space-y-6">
              <h3 class="text-5 font-semibold uppercase text-[var(--primary-brown)] mb-6" style="font-family: var(--font-primary)">
                Benefits That Make Life Easier
              </h3>
              <div class="grid gap-8 lg:grid-cols-2">
                <div class="space-y-4">
                  <p v-for="(paragraph, index) in benefitsIntroParagraphs" :key="paragraph" 
                     class="text-4.25 leading-relaxed transition-all duration-300 animate-fade-in-left"
                     :style="{ animationDelay: `${1300 + (index * 100)}ms` }">
                    {{ paragraph }}
                  </p>
                  <p class="text-4.25 leading-relaxed transition-all duration-300 animate-fade-in-left" style="animation-delay: 1400ms;">
                    {{ benefitsClosingParagraph }}
                  </p>
                </div>
                <div class="bg-[var(--light-cream)]/50 rounded-6 p-6">
                  <h4 class="text-4 font-semibold uppercase text-[var(--primary-brown)] mb-4">Support Examples</h4>
                  <ul class="space-y-3">
                    <li v-for="(item, index) in supportExamples" :key="item" 
                        class="flex items-start gap-3 text-4 leading-relaxed transition-all duration-300 animate-fade-in-left hover:bg-white/50 p-2 rounded"
                        :style="{ animationDelay: `${1500 + (index * 50)}ms` }">
                      <Icon name="radix-icons:dot-filled" class="mt-1 h-3 w-3 text-[var(--primary-brown)] transition-all duration-300 hover:scale-125" />
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-if="activeCompensationTab === 'protection'" class="space-y-6">
              <h3 class="text-5 font-semibold uppercase text-[var(--primary-brown)] mb-6" style="font-family: var(--font-primary)">
                Legal, Insurance, and Protection
              </h3>
              <div class="grid gap-8 lg:grid-cols-2">
                <div class="space-y-4">
                  <p class="text-4.25 leading-relaxed transition-all duration-300 animate-fade-in-left" style="animation-delay: 1300ms;">
                    {{ legalProtectionParagraph }}
                  </p>
                  <p class="text-4.25 leading-relaxed transition-all duration-300 animate-fade-in-left" style="animation-delay: 1400ms;">
                    {{ experiencedCarrierParagraph }}
                  </p>
                </div>
                <div class="bg-gradient-to-br from-[var(--light-cream)] to-white rounded-6 p-6 border border-[var(--olive-green)]/30">
                  <h4 class="text-4 font-semibold uppercase text-[var(--primary-brown)] mb-4">Our Promise</h4>
                  <div class="space-y-4">
                    <p v-for="(paragraph, index) in clarityParagraphs" :key="paragraph" 
                       class="text-4 leading-relaxed transition-all duration-300 animate-fade-in-left"
                       :style="{ animationDelay: `${1500 + (index * 100)}ms` }">
                      {{ paragraph }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Yunda -->
    <section id="why-yunda" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <h2 class="text-7 font-semibold uppercase lg:text-8 transition-all duration-500 hover:scale-105 animate-fade-in-up" style="font-family: var(--font-primary)">
          Why Yunda
        </h2>
        <div class="mt-8 flex justify-center animate-fade-in-up" style="animation-delay: 200ms;">
          <div class="image-placeholder max-w-160 w-full transition-all duration-500 hover:scale-105 hover:shadow-xl">
            <img src="/images/landing page1/Yunda (Local Care, National Standards).jpg" alt="Why Yunda">
          </div>
        </div>
        <div class="grid mt-10 gap-8 lg:grid-cols-2">
          <div
            v-for="(pillar, index) in yundaPillars"
            :key="pillar.title"
            class="border border-[var(--primary-brown)]/30 rounded-5 bg-white/90 p-6 shadow-black/10 shadow-lg transition-all duration-300 hover:bg-[var(--light-cream)]/60 hover:-translate-y-2 hover:shadow-xl hover:scale-[1.02] animate-fade-in-up"
            :style="{ animationDelay: `${400 + (index * 200)}ms` }"
          >
            <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
              {{ pillar.title }}
            </h3>
            <p class="mt-3 text-4.25 leading-relaxed transition-all duration-300">
              {{ pillar.body }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="relative overflow-hidden bg-[var(--dark-brown)] py-18 text-white">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute left-1/4 top-0 h-60 w-60 rounded-full bg-[var(--primary-brown)]/40 blur-[160px] animate-pulse" />
        <div class="absolute bottom-0 right-1/5 h-48 w-48 rounded-full bg-[var(--olive-green)]/50 blur-[140px] animate-pulse" style="animation-delay: 1s;" />
      </div>
      <div class="relative mx-auto max-w-260 px-5 text-center">
        <h2 class="text-8 font-semibold tracking-wide uppercase lg:text-10 transition-all duration-700 hover:scale-105 animate-fade-in-up" style="font-family: var(--font-primary)">
          Ready to Carry with Confidence?
        </h2>
        <p class="mt-4 text-4.5 leading-relaxed transition-all duration-500 animate-fade-in-up" style="animation-delay: 200ms;">
          Start with a plan that centers your voice, honors your experience, and delivers for the family you choose to help.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4 animate-fade-in-up" style="animation-delay: 400ms;">
          <NuxtLink
            to="/be-surrogate"
            class="rounded-full bg-white px-6 py-3 text-3.5 text-[var(--dark-brown)] font-semibold uppercase transition-all duration-300 hover:bg-[var(--light-cream)] hover:scale-110 hover:shadow-xl"
          >
            Start Application
          </NuxtLink>
          <NuxtLink
            to="/journey"
            class="border border-white rounded-full px-6 py-3 text-3.5 text-white font-semibold uppercase transition-all duration-300 hover:bg-white/10 hover:scale-110 hover:shadow-xl"
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
  min-height: 200px;
  border: 2px dashed rgba(169, 108, 66, 0.5);
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
  letter-spacing: 0.2em;
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

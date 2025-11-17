<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import SurrogateStepsComponent from '@/components/surrogacy/process/SurrogateStepsComponent.vue'

useHead({
  title: 'Surrogacy Process Step by Step | IVF, Legal & Timeline Guide',
  meta: [
    {
      name: 'description',
      content:'Learn the surrogacy process step by step—from screening and legal contracts to IVF, pregnancy and birth. This guide explains how surrogacy works for intended parents and surrogate mothers in California and across the United States.'
    },
    {
      property: 'og:title',
      content: 'Surrogacy Process Step by Step | IVF, Legal & Timeline Guide',
    },
    {
      property: 'og:description',
      content:'Learn the surrogacy process step by step—from screening and legal contracts to IVF, pregnancy and birth. This guide explains how surrogacy works for intended parents and surrogate mothers in California and across the United States.'
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'keywords',
      content: 'surrogate mother, gestational surrogacy, Surrogate process, IVF, embryo transfer, surrogacy requirements, become a surrogate',
    },
  ],
})

const readinessPillars = reactive([
  {
    title: 'Legal clarity & consent',
    body: 'Law comes first. Independent attorneys explain consent, risks, privacy, and parentage. California courts support gestational surrogacy well. Many families choose a pre-birth order. That choice keeps delivery clean. This answers what is the surrogacy process on the legal side.',
  },
  {
    title: 'Financial transparency & safety',
    body: 'Money and safety matter too. SeedTrust runs escrow. The team releases funds by milestones. ART Risk guides insurance. That keeps the surrogacy steps transparent and fair.',
  },
  {
    title: 'Medical & lab planning',
    body: 'Now the clinic plan. Doctors and nurses show how is surrogacy performed in modern care. They design meds and timing. Labs build embryos. The ivf surrogacy process covers stimulation (if needed), retrieval, fertilization, and culture. The ivf surrogacy procedure sets transfer day. That is how does a surrogate mother get pregnant in a clinical sense—through embryo transfer, not intercourse.',
  },
  {
    title: 'Emotional readiness & support',
    body: 'Emotions shape the journey. A counselor teaches tools for boundaries, stress, and family talk. A case manager sends weekly updates. Everyone knows the next surrogacy step and the owner. That’s how surrogacy works in real life: clear roles, short checklists and kind support',
  },
])

const softCtas = reactive([
  {
    label: 'See the surrogacy process for intended parents',
    description: 'Book a consult and map the surrogacy process step by step for your timeline.',
    link: '/be-parents',
  },
  {
    label: 'See the surrogacy process from the surrogate’s side (U.S. citizens, California preferred)',
    description: 'Check eligibility and see what is the process for surrogacy from your side.',
    link: '/be-surrogate',
  },
])

const timelinePhases = reactive([
  {
    id: 1,
    label: 'Week 1–3',
    title: 'Intro & Pre-Screen',
    summary: 'Share goals, OB records, and clinic options. Pick a path for the surrogacy process for intended parents.',
  },
  {
    id: 2,
    label: 'Month 1–3',
    title: 'Full Screening & Matching',
    summary: 'Labs, ultrasound, and psych consult for the surrogate mother. Values and birth plan align.',
  },
  {
    id: 3,
    label: 'Month 2–4',
    title: 'Legal & Escrow',
    summary: 'Independent counsel drafts and signs. SeedTrust funds the account. Attorneys prep parentage orders.',
  },
  {
    id: 4,
    label: 'Month 3–5',
    title: 'IVF Build & Transfer',
    summary: 'The lab runs the ivf Surrogate process. Doctors schedule lining checks and the ivf surrogacy procedure for transfer.',
  },
  {
    id: 5,
    label: 'Month 5–14',
    title: 'Pregnancy Care',
    summary: 'OB visits and ultrasound milestones. Case manager sends weekly notes. Insurance team supports claims.',
  },
  {
    id: 6,
    label: 'Birth + 2–6 Weeks',
    title: 'Post-Birth Legal',
    summary: 'Hospital follows the plan. Lawyers complete orders and the birth certificate. Family travels home.',
  },
])

const activeTimelinePhase = ref(timelinePhases[0].id)
const currentTimelinePhase = computed(() => timelinePhases.find(phase => phase.id === activeTimelinePhase.value))

function selectTimelinePhase(id: number) {
  activeTimelinePhase.value = id
}

const flowchartStages = reactive([
  {
    id: 1,
    title: 'Inquiry → Pre-screen',
    parents: 'Parents share goals and clinic choices.',
    surrogates: 'The surrogate mother shares OB records and lifestyle notes.',
    summary: 'Team sets the surrogacy steps and timing.',
  },
  {
    id: 2,
    title: 'Screening → Matching',
    parents: 'Labs, ultrasound, and psych consults.',
    surrogates: 'Values and birth plan align.',
    summary: 'Gestational carrier process.',
  },
  {
    id: 3,
    title: 'Legal → Escrow',
    parents: 'Independent attorneys draft and sign.',
    surrogates: 'SeedTrust opens escrow with milestone releases.',
    summary: 'Surrogacy legal process in place.',
  },
  {
    id: 4,
    title: 'IVF build → Transfer',
    parents: 'The lab runs surrogacy in vitro fertilization.',
    surrogates: 'Doctors schedule the ivf surrogacy procedure.',
    summary: 'This is how surrogacy is performed in real clinics.',
  },
  {
    id: 5,
    title: 'Pregnancy care → Updates',
    parents: 'OB visits and ultrasound milestones.',
    surrogates: 'Case manager sends weekly notes.',
    summary: 'Steady surrogate pregnancy process, steady smiles.',
  },
  {
    id: 6,
    title: 'Delivery → Parentage → Home',
    parents: 'Hospital follows the plan.',
    surrogates: 'Attorneys finish orders and the birth certificate.',
    summary: 'Family goes home. The surrogate mother rests with support.',
  },
])

const checklistItems = reactive([
  'Send records; confirm clinic; map the surrogacy process step by step',
  'Complete labs, ultrasound, psych consult',
  'Match meeting; confirm values and birth plan',
  'Sign contracts; fund escrow; file parentage plan',
  'Meds delivered; monitoring set for surrogate IVF',
  'Transfer day; beta test; first heartbeat scan',
  'OB calendar saved; insurance claims ready',
  'Hospital tour; delivery preferences on file',
  'Birth; order complete; documents stored',
])

const faqItems = reactive([
  {
    question: 'How does surrogacy work ?',
    answer: 'In surrogacy, intended parents work with a fertility clinic and a surrogate mother. The surrogacy process includes screening, matching, legal contracts, IVF, pregnancy and birth. Everyone has clear roles and protections at each step.', 
  },
  {
    question: 'What is the surrogacy process, step by step?',
    answer: 'The surrogacy process step by step is simple to follow. First comes screening and matching. Then you sign contracts, complete IVF surrogacy treatment, go through pregnancy and delivery, and finish parentage paperwork.',
  },
  {
    question: 'What does a surrogate mother do?',
    answer: 'A surrogate mother carries a baby for intended parents who cannot carry a pregnancy. She follows medical advice, takes medications for IVF and surrogacy, and attends all key appointments. She does not use her own eggs in a gestational surrogacy program.'
  },    
  {
    question: 'How does a surrogate mother get pregnant?',
    answer:'In modern care, a surrogate mother gets pregnant through embryo transfer, not intercourse. Doctors place an embryo created in the lab into the surrogate’s uterus during the IVF surrogate process. Hormone medications help prepare her body for pregnancy.',
  },
  {
    question: 'How much does a gestational carrier cost?',
    answer:'The cost of a gestational carrier and surrogate mother cost in USA varies by state, clinic, agency and insurance. Total costs include base compensation, medical fees, legal work and program support. We walk through typical ranges and budget tips in our separate surrogacy cost guide.',
  },
  
])

const expandedFaq = ref<number | null>(0)

function toggleFaq(index: number) {
  expandedFaq.value = expandedFaq.value === index ? null : index
}

const resourceCategories = reactive([
  {
    title: 'Medical & Legal Guides',
    items: [
      'Medical guidance on IVF and pregnancy care.',
      'Legal primers on parentage orders and documents.',
      'Plain-language answers to what is the process of surrogacy and the gestational carrier process.',
    ],
  },
  {
    title: 'Language & Access',
    items: [
      'Download short guides: how is surrogacy performed, the  surrogacy process step by step, and the surrogacy legal process. See who does what at each step.',
      'Quick definitions for what is gestational carrier, whose eggs are used in surrogacy, and in surrogacy who is the biological father. Each term links to the right step.',
    ],
  },
])

const yundaHighlights = reactive([
  {
    title: 'A Trusted U.S. Surrogacy Partner Based in California',
    body: 'We know the courts and clinics. We guide families and surrogate mothers through the surrogacy steps with calm, clear updates.',
  },
  {
    title: 'Medical & Legal Excellence Under One Roof',
    body: 'We work with respected fertility centers and seasoned attorneys. We stand beside you during screening, the ivf surrogacy process, and delivery. We show how is surrogacy performed in real life, not just on paper.',
  },
  {
    title: 'Transparent Process & Escrow Security',
    body: 'SeedTrust manages escrow. ART Risk supports insurance. Milestones stay on time. Payments stay clear. The surrogacy process stays fair.',
  },
  {
    title: 'Dedicated Project Managers & Weekly Updates',
    body: 'One case manager owns your file. We send weekly notes. We keep the surrogacy process step by step on track for intended parents and for the surrogate mother.',
  },
])

const journeyInvites = reactive([
  'Intended Parents: Get your plan for the surrogacy process for intended parents.',
  'Surrogates (U.S. citizens, California preferred): Join a respectful surrogate program. Learn what does a surrogate do to get pregnant in IVF. See real support, not hype.',
])

const surrogacySteps = reactive([
  {
    id: 1,
    title: 'Initial Consultation & Eligibility Review',
    duration: 'Week 1–3',
    description: 'A coordinator opens the file and sets goals. The team listens first. We review timelines, clinics, and legal paths in the surrogacy in the United States context. For the surrogate mother, we outline the process to become a surrogate mother in plain steps. We welcome U.S. citizens and prefer California residents for fast access to care.',
    activities: [
      'Align goals and timelines for parents and surrogate mother.',
      'Outline clinics, legal paths, and program expectations in calm language.',
      'Review pre-screen records and ensure both tracks feel supported.',
    ],
    details: 'Focus of this step: align values, set expectations, and answer what is the process for surrogacy without stress.',
    sections: [
      {
        heading: 'Surrogate eligibility (US citizens, California preferred)',
        items: [
          'Prior healthy birth, steady home, and supportive partner or family.',
          'Clean medical history and healthy BMI.',
          'Clear consent to the surrogate program terms and calendar.',
        ],
      },
      {
        heading: 'Intended parent profile & expectations',
        items: [
          'Fertility history, embryo status, donor needs, and clinic choice.',
          'Budget windows and escrow plan.',
          'Early view of the surrogacy process for intended parents.',
        ],
      },
    ],
    softCtas: [
      'Surrogates: Start the surrogate mother program pre-screen.',
      'Parents: Book a consult to see the surrogacy process step by step.',
    ],
  },
  {
    id: 2,
    title: 'Legal Consultation & Contract Formation',
    duration: 'Month 2–4',
    description: 'Independent attorneys guide every talk. They protect privacy, consent, and hospital plans. They also map parentage for California and other states. Clear contracts keep the surrogacy steps safe and fair.',
    activities: [
      'Host legal briefings with independent counsel for all parties.',
      'Document consent, hospital plans, and confidentiality expectations.',
      'Launch parentage strategy tailored to state requirements.',
    ],
    details: 'Legal agreements outline rights, confidentiality, and obligations.',
    sections: [
      {
        heading: 'Legal agreements outline rights, confidentiality, and obligations',
        items: [
          'Decision authority for pregnancy care and delivery.',
          'Travel, bed rest, multiples, and C-section plans.',
          'Clear support for wellness and time off.',
        ],
      },
      {
        heading: 'Parentage order preparation (U.S. state-specific overview)',
        items: [
          'Attorneys draft filings early.',
          'Many California cases use a pre-birth order.',
          'Orders help families becoming a parent through surrogacy without delays.',
        ],
      },
    ],
    softCtas: [
      'Surrogates: Meet an attorney for a friendly walk-through of the surrogacy legal process.',
      'Parents: Ask about surrogacy laws United States that fit your case.',
    ],
  },
  {
    id: 3,
    title: 'Medical Screening & IVF Preparation',
    duration: 'Month 1–3',
    description: 'Clinics run full screening before any cycle. Doctors check labs and uterine health. A psychologist meets the surrogate mother to confirm readiness and support. Counselors explain what does a surrogate mother do in day-to-day life during treatment.',
    activities: [
      'Complete health, lab, and psychological evaluations for the surrogate mother.',
      'Coordinate insurance review for surrogate mother health insurance options.',
      'Finalize IVF medication calendar and embryo creation plan.',
    ],
    details: 'Health, lab, and psychological evaluations.',
    sections: [
      {
        heading: 'Health, lab, and psychological evaluations',
        items: [
          'OB records review, infectious-disease panel, ultrasound.',
          'Mental health consult and lifestyle check.',
          'Insurance advisors review surrogate mother health insurance options.',
        ],
      },
      {
        heading: 'IVF and embryo creation (donor egg/sperm if needed)',
        items: [
          'Teams plan the ivf and surrogacy calendar with clear meds and monitoring.',
          'The lab builds embryos: parental gametes first; surrogacy with donor egg when needed.',
          'Doctors answer whose eggs are used in surrogacy, then align on consent and next steps.',
          'This forms the core gestational surrogacy procedure and surrogacy in vitro fertilization plan.',
        ],
      },
    ],
    softCtas: [
      'Surrogates: Confirm coverage and travel timing with a coordinator.',
      'Parents: Lock your clinic and embryo plan for a clean handoff.',
    ],
  },
  {
    id: 4,
    title: 'Embryo Transfer & Confirmation of Pregnancy',
    duration: 'Month 3–5',
    description: 'Doctors schedule the lining check and the transfer day. Nurses keep meds simple. The lab prepares embryos. The physician completes surrogate IVF with a calm, focused routine.',
    activities: [
      'Coordinate lining reviews, embryo prep, and transfer details.',
      'Guide medication adherence and post-transfer recovery.',
      'Document beta-hCG results and first scan updates for both tracks.',
    ],
    details: 'Uterine lining prep, transfer, and pregnancy test.',
    sections: [
      {
        heading: 'Uterine lining prep, transfer, and pregnancy test',
        items: [
          'Lining review, embryo thaw or selection, and transfer.',
          'Beta-hCG confirms the result 9–12 days later.',
          'This is how a surrogate mother gets pregnant in modern care—through embryo transfer, not intercourse.',
          'Clinics teach what does a surrogate do to get pregnant: follow meds, rest, and scan on time.',
        ],
      },
      {
        heading: 'Ongoing medical communication between clinic and agency',
        items: [
          'The case manager sends weekly notes after the first scan.',
          'Everyone sees the same dates and the same surrogacy steps.',
          'The ivf surrogacy process stays calm and organized.',
        ],
      },
    ],
    softCtas: [
      'Surrogates: Save your scan schedule and wellness tips.',
      'Parents: Prepare a hospital pre-registration and a birth-day plan.',
    ],
  },
  {
    id: 5,
    title: 'Pregnancy Monitoring & Emotional Support',
    duration: 'Month 5–14',
    description: 'Prenatal care follows standard OB rules. Ultrasounds mark growth and health. A counselor supports boundaries, family talk, and stress control. The surrogate pregnancy process stays caring and steady.',
    activities: [
      'Track OB appointments, ultrasound milestones, and lab requirements.',
      'Offer emotional health check-ins and support resources.',
      'Coordinate insurance claims and intended parent updates.',
    ],
    details: 'Regular medical checkups, ultrasound schedule.',
    sections: [
      {
        heading: 'Regular medical checkups, ultrasound schedule',
        items: [
          'Heartbeat scan, NT scan, anatomy scan, growth scans as needed.',
          'Clear reminders for glucose tests, vaccines, and travel windows.',
          'A calm gestational carrier pregnancy helps everyone.',
        ],
      },
      {
        heading: 'Surrogate wellness support and insurance coverage',
        items: [
          'Mental health check-ins and lactation support if desired.',
          'Advisors manage claims under surrogate mother health insurance.',
          'Parents plan first-hours bonding for babies born through surrogacy.',
        ],
      },
    ],
    softCtas: [
      'Surrogates: Join the wellness chat and keep your sleep and nutrition strong.',
      'Parents: Book the hospital tour and set a newborn plan.',
    ],
  },
  {
    id: 6,
    title: 'Delivery & Post-Birth Legal Steps',
    duration: 'Birth + 2–6 Weeks',
    description: 'The team finalizes the birth plan early. The hospital knows the legal names and the parentage path. Attorneys finish filings and guide the birth certificate request. This closes the gestational surrogacy process with clarity.',
    activities: [
      'Coordinate hospital logistics, travel, and bonding preferences.',
      'Ensure legal parentage documents and filings are completed.',
      'Offer gentle close-out support for surrogate mother and intended parents.',
    ],
    details: 'Hospital coordination & intended parents’ presence.',
    sections: [
      {
        heading: 'Hospital coordination & intended parents’ presence',
        items: [
          'Packing lists, room plans, and bonding steps.',
          'Nurses support skin-to-skin time and photos.',
          'The surrogacy steps cover privacy and respectful good-byes.',
        ],
      },
      {
        heading: 'Legal parentage establishment and return home',
        items: [
          'Attorneys complete orders and vital records.',
          'Counselors offer a gentle close for the surrogate mother.',
          'Parents travel home as a family. Lawyers answer common questions, like in surrogacy who is the biological father (the genetic father on record).',
        ],
      },
    ],
    softCtas: [
      'Surrogates: Share feedback to improve the surrogate program for the next journey.',
      'Parents: Store all legal papers and pediatric notes in one folder for travel.',
    ],
  },
])

const activeStep = ref(1)

function setActiveStep(stepId: number) {
  activeStep.value = stepId
}
</script>

<template>
  <div class="min-h-screen bg-[var(--head-bg)]">
    <AppHeader />

    <!-- Hero / Overview -->
    <section class="relative overflow-hidden bg-white py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <p class="mb-3 inline-flex items-center rounded-full bg-[var(--light-cream)] px-4 py-1 text-sm text-[var(--primary-brown)] uppercase tracking-wide">
              Surrogacy process guide
            </p>
            <h1 class="mb-8 text-4xl text-[var(--dark-brown)] font-bold md:text-6xl" style="font-family: var(--font-primary)">
              Surrogacy Process: Step-by-Step Guide for Parents and Surrogates
            </h1>
            <div class="space-y-5 text-lg text-[var(--primary-brown)] leading-relaxed md:text-xl">
              <p>
                In a typical gestational surrogacy process, you move through six stages: screening, matching, legal contracts, IVF and embryo transfer, pregnancy and delivery, then post-birth legal steps. This guide walks through each step in plain language so intended parents and surrogate mothers know what to expect at every stage.
              </p>
            </div>
          </div>
          <div class="relative">
            <div class="overflow-hidden rounded-3xl bg-[var(--head-bg)] p-3 shadow-2xl">
              <img
                src="/images/california-surrogacy-process.jpg"
                alt="Surrogacy journey in California"
                class="h-full w-full rounded-2xl object-cover"
              >
            </div>
            <div class="absolute -bottom-8 -right-6 hidden w-[240px] rounded-2xl border border-white/70 bg-white/90 p-6 text-sm text-[var(--primary-brown)] leading-relaxed shadow-lg backdrop-blur md:block">
              A shared plan reduces stress. A shared plan builds trust.
            </div>
          </div>
        </div>
      </div>
      <div class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--head-bg)] to-transparent" />
    </section>

    <!-- Readiness Pillars -->
    <section class="bg-[var(--head-bg)] py-24">
      <div class="container mx-auto max-w-6xl px-4">
        <div class="mx-auto mb-14 max-w-3xl text-center">
          <h2 class="text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Legal, Medical &amp; Emotional Readiness
          </h2>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          <div
            v-for="pillar in readinessPillars"
            :key="pillar.title"
            class="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-lg transition-shadow hover:shadow-2xl"
          >
            <div class="absolute inset-y-0 left-0 w-1 rounded-full bg-[var(--grayish-green)] opacity-60" />
            <h3 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              {{ pillar.title }}
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              {{ pillar.body }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Soft CTA Section -->
    <section class="bg-white py-20">
      <div class="container mx-auto max-w-6xl px-4">
        <div class="mx-auto mb-12 max-w-3xl text-center">
          <h2 class="text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Choose Your Surrogacy Track
          </h2>
          <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
            The surrogacy process looks slightly different depending on whether you’re an intended parent or a prospective surrogate mother. Choose the path that fits you:          </p>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          <NuxtLink
            v-for="cta in softCtas"
            :key="cta.label"
            :to="cta.link"
            class="group relative overflow-hidden rounded-3xl border border-[var(--grayish-green)] bg-[var(--head-bg)] p-8 shadow-lg transition-all hover:-translate-y-1 hover:shadow-2xl"
          >
            <div class="absolute inset-0 bg-gradient-to-br from-white/0 via-white/30 to-white/60 opacity-0 transition-opacity group-hover:opacity-100" />
            <span class="mb-3 inline-block text-sm text-[var(--grayish-green)] uppercase tracking-wide">
              {{ cta.label }}
            </span>
            <p class="text-xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              {{ cta.description }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </section>


    <!-- Step-by-Step Section -->
    <section class="bg-white py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-12 text-center">
          <h2 class="mb-6 text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Step-by-Step Breakdown of the Surrogacy process
          </h2>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            The surrogacy process works best with simple, clear surrogacy steps. This map shows how does surrogacy work for intended parents and for a surrogate mother in California and across the United States.
          </p>
        </div>
        <SurrogateStepsComponent
          :steps="surrogacySteps"
          :active-step="activeStep"
          @step-change="setActiveStep"
        />
      </div>
    </section>

    <!-- Flowchart & Checklist Section -->
    <section class="bg-[var(--head-bg)] py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h2 class="mb-6 text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
              Surrogacy process Flowchart &amp; Checklist
            </h2>
            <p class="mb-8 text-lg text-[var(--primary-brown)] leading-relaxed">
              A simple map keeps the surrogacy process calm. It shows each handoff. It shows who owns each task. It answers how does surrogacy work and how does the surrogate mother process work without noise.
            </p>
            <div class="space-y-6">
              <div
                v-for="stage in flowchartStages"
                :key="stage.id"
                class="rounded-3xl bg-white p-8 shadow-lg"
              >
                <div class="mb-4 flex items-center justify-between">
                  <h3 class="text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
                    {{ stage.id }}. {{ stage.title }}
                  </h3>
                  <span class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--grayish-green)] text-white font-semibold">
                    {{ stage.id }}
                  </span>
                </div>
                <div class="space-y-2 text-lg text-[var(--primary-brown)] leading-relaxed">
                  <p><strong class="text-[var(--dark-brown)]">Parents:</strong> {{ stage.parents }}</p>
                  <p><strong class="text-[var(--dark-brown)]">Surrogates:</strong> {{ stage.surrogates }}</p>
                  <p>{{ stage.summary }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="space-y-8">
            <div class="rounded-3xl bg-white p-8 shadow-lg">
              <h3 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
                Dual-Track Flowchart (Parents &amp; Surrogates)
              </h3>
              <ol class="space-y-4 text-lg text-[var(--primary-brown)] leading-relaxed">
                <li>1. Inquiry → Pre-screen</li>
                <li>2. Screening → Matching</li>
                <li>3. Legal → Escrow</li>
                <li>4. IVF build → Transfer</li>
                <li>5. Pregnancy care → Updates</li>
                <li>6. Delivery → Parentage → Home</li>
              </ol>
            </div>
            <div class="rounded-3xl bg-white p-8 shadow-lg">
              <h3 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
                Printable Checklist (Highlights)
              </h3>
              <ul class="space-y-3 text-lg text-[var(--primary-brown)] leading-relaxed">
                <li
                  v-for="item in checklistItems"
                  :key="item"
                >
                  □ {{ item }}
                </li>
              </ul>
            </div>
            <div class="rounded-3xl bg-white p-8 shadow-lg">
              <h3 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
                Recruit + Process Balance Note
              </h3>
              <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              Here we keep a balance between explaining how surrogacy is performed and inviting qualified women to a respectful surrogate program. Intended parents get a clear, guided plan instead of a sales pitch.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="bg-white py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mx-auto mb-12 max-w-3xl text-center">
          <h2 class="mb-6 text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            FAQ About the Surrogacy process
          </h2>
          <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
            how does surrogacy work · how is surrogacy performed · what is the process for surrogacy
          </p>
        </div>
        <div class="space-y-4">
          <div
            v-for="(faq, index) in faqItems"
            :key="faq.question"
            class="rounded-3xl border border-[var(--light-cream)] bg-[var(--head-bg)] px-6 py-5 shadow-sm transition-colors hover:border-[var(--grayish-green)]"
          >
            <button
              class="flex w-full items-center justify-between text-left"
              @click="toggleFaq(index)"
            >
              <h3 class="text-xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
                {{ faq.question }}
              </h3>
              <span class="ml-4 text-2xl text-[var(--grayish-green)]">
                {{ expandedFaq === index ? '−' : '+' }}
              </span>
            </button>
            <transition name="fade">
              <p
                v-if="expandedFaq === index"
                class="mt-4 text-lg text-[var(--primary-brown)] leading-relaxed"
              >
                {{ faq.answer }}
              </p>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Resources Section -->
    <section class="bg-[var(--head-bg)] py-24">
      <div class="container mx-auto max-w-6xl px-4">
        <div class="mb-12 text-center">
          <h2 class="text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Resources &amp; Educational Materials
          </h2>
          <p class="mt-4 text-lg text-[var(--primary-brown)] leading-relaxed">
            what is the process of surrogacy · gestational carrier process
          </p>
        </div>
        <div class="grid gap-6 md:grid-cols-2">
          <div
            v-for="resource in resourceCategories"
            :key="resource.title"
            class="rounded-3xl bg-white p-8 shadow-lg"
          >
            <h3 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              {{ resource.title }}
            </h3>
            <ul class="space-y-3 text-lg text-[var(--primary-brown)] leading-relaxed">
              <li
                v-for="item in resource.items"
                :key="item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Yunda -->
    <section class="bg-white py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mx-auto mb-12 max-w-4xl text-center space-y-4">
          <h2 class="text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Why Choose Yunda Surrogacy Agency 🩵
          </h2>
          <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
            A Trusted U.S. Surrogacy Partner Based in California
          </p>
        </div>
        <div class="grid gap-8 md:grid-cols-2">
          <div
            v-for="highlight in yundaHighlights"
            :key="highlight.title"
            class="rounded-3xl bg-[var(--head-bg)] p-8 shadow-lg"
          >
            <h3 class="mb-3 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              {{ highlight.title }}
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              {{ highlight.body }}
            </p>
          </div>
        </div>
        <div class="mt-12 rounded-3xl bg-[var(--grayish-green)] px-8 py-10 text-white shadow-xl">
          <h3 class="mb-4 text-2xl font-semibold" style="font-family: var(--font-primary)">
            Start Your Journey with Yunda
          </h3>
          <ul class="space-y-3 text-lg leading-relaxed">
            <li
              v-for="invite in journeyInvites"
              :key="invite"
            >
              - {{ invite }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="bg-[var(--head-bg)] py-20">
      <div class="container mx-auto max-w-6xl px-4 text-center">
        <div class="rounded-3xl bg-[var(--grayish-green)] px-8 py-12 shadow-xl sm:px-16">
          <h3 class="mb-4 text-3xl text-white font-bold md:text-4xl" style="font-family: var(--font-primary)">
            Start Your Journey with Yunda
          </h3>
          <p class="mx-auto mb-8 max-w-3xl text-lg text-white leading-relaxed">
            We know the courts and clinics. We guide families and surrogate mothers through the surrogacy steps with calm, clear updates.
          </p>
          <div class="flex flex-wrap justify-center gap-4">
            <NuxtLink
              to="/be-parents"
              class="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base text-[var(--grayish-green)] font-semibold shadow-lg transition-opacity hover:opacity-90"
            >
              Book a Consult
            </NuxtLink>
            <NuxtLink
              to="/be-surrogate"
              class="inline-flex items-center justify-center rounded-xl border border-white px-8 py-4 text-base text-white font-semibold transition-colors hover:bg-white hover:text-[var(--grayish-green)]"
            >
              Check Eligibility
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <AppFooter />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

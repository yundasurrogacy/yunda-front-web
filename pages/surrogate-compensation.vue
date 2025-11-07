<script setup lang="ts">
// Vue composables are auto-imported in Nuxt 3
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { useScrollAnimation } from '~/composables/useScrollAnimation'

useScrollAnimation()

useHead({
  title: 'Surrogate Compensation in the U.S. | Pay, Benefits & FAQs',
  meta: [
    {
      name: 'description',
      content: 'Explore surrogate pay and benefits with a clear payment schedule. We outline surrogacy cost, agency fees, and expenses in the U.S., with real support.',
    },
  ],
})

const sections = [
  { id: 'overview', label: 'Overview' },
  { id: 'surrogate-pay', label: 'Surrogate Pay' },
  { id: 'compensation-factors', label: 'Pay Factors' },
  { id: 'payment-schedule', label: 'Payment Schedule' },
  { id: 'cost-fees', label: 'Cost & Fees' },
  { id: 'protections', label: 'Insurance & Legal' },
  { id: 'timeline', label: 'Process Timeline' },
  { id: 'faq', label: 'FAQs' },
]

const activeSection = ref(sections[0].id)

function scrollToSection(id: string) {
  const element = document.getElementById(id)
  if (element)
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function handleScroll() {
  const offsets = sections.map((section) => {
    const el = document.getElementById(section.id)
    if (!el)
      return { id: section.id, top: Number.POSITIVE_INFINITY }
    const rect = el.getBoundingClientRect()
    return { id: section.id, top: Math.abs(rect.top - 140) }
  })
  const closest = offsets.reduce((prev, current) => (current.top < prev.top ? current : prev))
  activeSection.value = closest.id
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

const payAccordions = [
  {
    id: 'bonuses',
    title: 'Bonuses and medical add-ons',
    paragraphs: [
      'Your plan may include add-ons based on medical needs. If a doctor confirms multiples, I add a $15,000 multiples bonus. If you need a C-section, I add $5,000. Bed rest, household help, and childcare follow doctor notes and receipts. If you choose to pump milk, the stipend is $250/week. We also consider wage loss and, in very rare cases, organ-loss amounts ($2,500 partial, $5,000 total) after medical confirmation. These items keep paid surrogacy fair and safe.',
    ],
  },
  {
    id: 'payments',
    title: 'How and when you receive payment',
    paragraphs: [
      'I use a clear surrogate payment schedule with independent escrow. Intended parents fund a trust in three steps: $56,850 at signing, $83,500 after medical clearance, and $17,500 after heartbeat, while keeping $10,000 in the account. This structure supports on-time releases during pregnancy and at delivery. Unused funds settle after final accounting.',
      'For trust administration, I work with established third-party providers (e.g., SeedTrust) so your surrogacy payment stays timely and compliant.',
    ],
  },
]

const expandedPay = ref<Record<string, boolean>>({
  [payAccordions[0].id]: true,
})

function togglePay(id: string) {
  expandedPay.value = {
    ...expandedPay.value,
    [id]: !expandedPay.value[id],
  }
}

const compensationFactors = [
  {
    number: '1',
    title: 'Experience and track record',
    content: [
      'Repeat journeys often raise surrogate mother pay. A smooth prior pregnancy and a successful journey signal reliability. Agencies factor in medical history, delivery type, and communication style. Strong references and complete records help you get paid to be a surrogate at a higher level. This is how many “best paying surrogacy agencies” evaluate surrogate income in a fair, transparent way.',
    ],
  },
  {
    number: '2',
    title: 'Location, insurance, and legal setup',
    content: [
      'State rules and local clinic access matter. Surrogate-friendly states streamline approvals and reduce friction. A surrogate-friendly insurance plan lowers risk and protects the package. Counsel on both sides adds clarity. These factors influence surrogacy cost for the family and shape your final surrogate compensation without cutting corners. Solid coverage and clean contracts keep surrogate fees and reimbursements simple to manage.',
    ],
  },
  {
    number: '3',
    title: 'Pregnancy details and medical factors',
    content: [
      'Singleton or twins makes a difference. Doctors may order extra monitoring, procedures, or a surgical delivery. Bed rest can change work plans and home care. Approved travel, childcare, and lactation choices also play a role. These items sit inside the package as line items, not surprises. Clear guidelines let you plan surrogate expenses and protect your surrogate income from start to finish.',
    ],
  },
  {
    number: '4',
    title: 'Agency support vs. going independent',
    content: [
      'Agencies coordinate the match, the calendar, and the money flow. An independent trust account releases installments on time and documents every reimbursement. Families fund milestones; you receive the installments per the surrogate payment schedule. Searchers often ask for the “highest paying surrogacy agency,” but the real win comes from a complete package: fair surrogate pay, strong benefits, and consistent support.',
    ],
  },
]

const scheduleHighlights = [
  {
    title: 'Funding milestones',
    body: 'Families fund the trust in stages. They deposit after contract signing, again after medical clearance, and again after heartbeat confirmation. The account keeps a minimum balance for upcoming milestones. This schedule supports timely installments and avoids delays.',
  },
  {
    title: 'Installments during pregnancy',
    body: 'The trust releases installments as you progress through the journey. Doctors confirm key points like transfer, pregnancy labs, and heartbeat. The trust pays each milestone according to the agreed plan, so you don’t chase payments or worry about timing.',
  },
  {
    title: 'Reimbursements and everyday expenses',
    body: 'Approved surrogacy expenses—like childcare during required visits, doctor-ordered bed rest support, or travel tied to monitoring—go through the trust with receipts. Clear rules, simple documentation, and tracked disbursements keep reimbursements smooth.',
  },
  {
    title: 'Independent escrow partners',
    body: 'Specialized partners manage the trust and insurance coordination. SeedTrust provides escrow and online tracking; ART Risk supports insurance and risk design. This team keeps money movement compliant and transparent at every step.',
  },
  {
    title: 'Final accounting',
    body: 'After delivery, the team closes the books. The trust reconciles all installments and reimbursements. Any unused funds return to the family per the agreement, and your file shows a full payment history.',
  },
]

const scheduleIcons = [
  'lucide:calendar-check',
  'lucide:coins',
  'lucide:receipt',
  'lucide:shield-check',
  'lucide:clipboard-list',
]

const packageCoverage = [
  'Your plan includes agency coordination (surrogacy agency fees), surrogate compensation, trust administration, legal counsel for both sides, surrogate medical insurance, and life insurance. We also list everyday surrogacy expenses like allowances, childcare during required visits, and an early transfer/pregnancy bundle. You see each part before you fund the account, so the surrogacy price stays predictable.',
]

const packageExclusions = [
  'Your package does not include IVF clinic fees or newborn hospital charges. These items sit outside the agency package and depend on clinic and hospital billing. We call this out in writing to keep the cost of using a surrogate transparent.',
]

const insurancePoints = [
  'We screen for surrogate-friendly insurance during Open Enrollment and present options that fit your needs and budget. If no suitable policy exists, we coordinate cash-pay with the local OB/hospital and align receipts in the trust. Employer plans often need a secondary policy, and no plan covers 100% of medical bills, so the family remains responsible for deductibles and coinsurance. This is how we keep the surrogacy cost plan realistic—and avoid surprises.',
  'Families fund a third-party trust (escrow). Families deposit in milestones—at contract, after medical clearance, and after heartbeat—then maintain a small balance for upcoming items. The trust releases installments and approved reimbursements on schedule, which keeps surrogacy payment timing clean and protects your surrogate cost plan end-to-end.',
  'An experienced escrow partner manages the trust with online tracking, and specialized counsel supports contracts and parentage. Our team runs weekly reports, bilingual support, and transparent accounting, so the surrogacy price and disbursements stay visible from day one. If you need staged funding, we can map surrogacy financing options to each milestone.',
]

const protectionSections = [
  {
    title: 'Insurance: design it to fit gestational surrogacy',
    content: [
      'We screen for surrogate-friendly plans during Open Enrollment. If a plan works, we recommend options and the family chooses based on needs and budget. If a plan does not fit, we coordinate with the local OB and hospital and set a clear cash-pay path. Employer plans often need a secondary policy. No policy covers 100%, so families remain responsible for deductibles and coinsurance. This keeps surrogacy cost realistic and avoids surprises.',
    ],
  },
  {
    title: 'Escrow: fund once, pay on schedule',
    content: [
      'Families fund a third-party trust at key milestones like contract signing, medical clearance, and heartbeat confirmation. The trust then releases installments and approved reimbursements on time. Independent escrow (e.g., SeedTrust) gives online tracking, tight controls, and low delays, so surrogacy payment stays clean and documented.',
    ],
  },
  {
    title: 'Legal: independent counsel and parentage orders',
    content: [
      'Both sides use dedicated counsel. Lawyers draft and review the surrogacy agreement, insurance terms, and risk language. Before birth, counsel completes the pre-birth parentage process, so the hospital lists the intended parents on the birth certificate. Clear contracts protect surrogate pay, define surrogacy expenses, and support compliant compensated surrogacy.',
    ],
  },
  {
    title: 'Reimbursements and documentation',
    content: [
      'The trust pays approved items tied to medical need and the agreement. Bed rest, childcare, and household help require physician notes and receipts. The team records every disbursement, which keeps surrogacy payment transparent and ties each item back to the contract.',
    ],
  },
  {
    title: 'Why this structure builds trust',
    content: [
      'A specialist escrow partner manages funds for the whole journey, and an insurance expert helps design coverage for gestational surrogacy. The service framework combines medical, legal, and trust management to protect each step. This reduces risk, supports on-time surrogate compensation, and keeps the total cost of surrogacy under control.',
    ],
  },
]

const processSteps = [
  {
    title: 'Step 1 — Consultation & Early Planning',
    description: 'Start with a brief consultation and a matching form. Set goals, clinics, and timing. We map the calendar and answer surrogacy process cost questions up front.',
  },
  {
    title: 'Step 2 — Matching & Trust Setup',
    description: 'We present qualified profiles and arrange a meet call. After you confirm the match, the family opens a third-party trust and funds the first milestone. This trust later pays the surrogate payment schedule and approved surrogacy expenses.',
  },
  {
    title: 'Step 3 — Legal & Contracts',
    description: 'Independent lawyers draft and review the agreement. Counsel also plans the pre-birth parentage (PBO) so the hospital lists the intended parents at delivery. Clear contracts protect surrogate compensation and keep paid surrogacy compliant.',
  },
  {
    title: 'Step 4 — Medical Prep & Transfer',
    description: 'The clinic clears medicals and starts the pre-transfer protocol. You complete monitoring, then proceed to embryo transfer and enter pregnancy. We coordinate schedules with the clinic and keep the plan simple.',
  },
  {
    title: 'Step 5 — Pregnancy Milestones & Installments',
    description: 'The clinic confirms pregnancy with labs and a heartbeat scan. Each milestone triggers the next installment from escrow per the surrogate payment schedule. Our team checks in weekly, helps with appointments, and documents reimbursements.',
  },
  {
    title: 'Step 6 — Birth, Parentage, and Postpartum Support',
    description: 'Legal finishes parentage steps before birth. The birth certificate lists the intended parents at the hospital. We help with discharge, newborn paperwork, and final accounting. This closes the flow of surrogate pay and keeps the surrogacy cost record clear.',
  },
]

const faqQuestions = [
  {
    question: 'Do surrogates get paid? How does the surrogate payment schedule work?',
    answer: 'Yes, surrogates are paid, typically through a compensation package that includes a base pay plus various supplemental payments and reimbursements for expenses. The payment schedule usually begins after a positive pregnancy test and continues in monthly installments for the duration of the pregnancy, with additional payments made for specific events or needs like a C-section, bed rest, or carrying multiples. Payments are often managed through a third-party escrow service to ensure transparency and timely distribution.',
  },
  {
    question: 'How much do surrogates make in the U.S.?',
    answer: 'On average, nationwide, base pay for first-time surrogates is between $45,000 and $55,000, with fees rising to between $60,000 to $70,000 for second-time surrogates, according to Gramann. The cost to those families using a surrogate is even greater, typically around $150,000, when additional expenses are factored in.',
  },
  {
    question: 'What counts as surrogate compensation vs. reimbursable surrogacy expenses?',
    answer: 'Surrogate compensation is the base payment for the time and commitment of the surrogate, while reimbursable expenses are payments to cover specific out-of-pocket costs incurred during the process, ensuring the surrogate is not financially burdened. Compensation is a form of payment for their role, and it is typically broken down into monthly installments after the pregnancy is confirmed. Reimbursable expenses, on the other hand, are for things like lost wages, medical co-pays, travel, maternity clothing, and childcare, which are paid back as they occur.',
  },
  {
    question: 'What affects surrogate pay—experience, location, or medical factors?',
    answer: 'Surrogate pay is affected by experience, location, and medical factors, with each playing a significant role in the final compensation package. Prior experience and the complexity of the pregnancy, such as carrying multiples, are major factors, while a surrogate\'s state of residence can influence pay due to local cost of living and demand. Medical circumstances, both foreseen and unforeseen, such as invasive procedures, bed rest, or complications, can lead to additional payments.',
  },
  {
    question: 'What is the total surrogacy cost for intended parents, including agency fees?',
    answer: 'The total surrogacy cost for intended parents typically ranges from $110,000 to $170,000 in the United States, but can be higher depending on factors like location and individual circumstances. This comprehensive cost includes agency fees, surrogate compensation and expenses, legal fees, and all medical costs related to fertility treatments and pregnancy.',
  },
]

const expandedFaq = ref<Record<string, boolean>>({})

function toggleFaq(question: string) {
  expandedFaq.value = {
    ...expandedFaq.value,
    [question]: !expandedFaq.value[question],
  }
}
</script>

<template>
  <div class="min-h-screen bg-[var(--head-bg)] text-[var(--dark-brown)]">
    <AppHeader />

    <section class="relative overflow-hidden from-[var(--hero-center)]/80 via-[var(--light-cream)] to-[var(--foot-bg)] bg-gradient-to-b py-18 lg:py-24">
      <div class="pointer-events-none absolute inset-0 opacity-40">
        <div class="absolute left-16 top-10 h-40 w-40 rounded-full bg-[var(--olive-green)] blur-[120px]" />
        <div class="absolute bottom-12 right-16 h-60 w-60 rounded-full bg-[var(--primary-brown)]/70 blur-[160px]" />
      </div>
      <div class="relative mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
          <div class="text-center space-y-6 lg:text-left">
            <h1 class="text-8 font-semibold leading-tight lg:text-12" style="font-family: var(--font-primary)">
              Surrogate Compensation in the U.S. | Pay, Benefits & FAQs
            </h1>
            <p class="text-4.5 leading-relaxed">
              Surrogate compensation should feel clear and fair. On this page, we explain surrogate pay, your benefits, and a simple surrogate payment schedule. We also outline surrogacy cost for families, including agency fees and common surrogacy expenses. You see how funds move, who pays what, and when you receive each installment.
            </p>
            <div class="flex flex-wrap justify-center gap-4 lg:justify-start">
              <NuxtLink
                to="/be-surrogate"
                class="rounded-full bg-[var(--primary-brown)] px-6 py-3 text-3.5 text-white font-semibold uppercase transition hover:bg-[var(--dark-brown)]"
              >
                Start Application
              </NuxtLink>
              <a
                href="#overview"
                class="border border-[var(--primary-brown)] rounded-full px-6 py-3 text-3.5 font-semibold uppercase transition hover:bg-white"
                @click.prevent="scrollToSection('overview')"
              >
                Explore Page
              </a>
            </div>
          </div>
          <div class="rounded-6 bg-white/70 p-8 text-center shadow-black/10 shadow-xl backdrop-blur">
            <div class="image-placeholder max-w-300 w-full transition-all duration-500 hover:scale-105">
              <img src="/images/landingpage2/Surrogate-Compensation.jpg" alt="Surrogate Compensation">
            </div>
          </div>
        </div>
      </div>
      <nav class="sticky left-0 top-24 z-40 mt-12">
        <div class="mx-auto max-w-280 px-5 lg:px-10">
          <div class="overflow-x-auto">
            <ul class="flex gap-4 border border-[var(--primary-brown)]/30 rounded-full bg-white/80 px-5 py-3 shadow-black/10 shadow-lg backdrop-blur">
              <li
                v-for="section in sections"
                :key="section.id"
              >
                <button
                  type="button"
                  class="rounded-full px-4 py-2 text-3.25 font-medium uppercase transition"
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

    <section id="overview" class="py-18 lg:py-24">
      <div class="mx-auto max-w-260 px-5 lg:px-10">
        <div class="border border-[var(--olive-green)]/40 rounded-6 bg-white/90 p-10 shadow-black/10 shadow-lg">
          <p class="text-5 leading-relaxed">
            Surrogate compensation should feel clear and fair. On this page, we explain surrogate pay, your benefits, and a simple surrogate payment schedule. We also outline surrogacy cost for families, including agency fees and common surrogacy expenses. You see how funds move, who pays what, and when you receive each installment.
          </p>
        </div>
      </div>
    </section>

    <section id="surrogate-pay" class="bg-[var(--foot-bg)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-12 lg:grid-cols-[0.6fr,0.4fr] lg:items-center">
          <!-- Left Content -->
          <div class="space-y-8">
            <h2 class="animate-fade-in-left text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" style="font-family: var(--font-primary)">
              How Much Do Surrogates Make? Surrogate Pay & Compensation
            </h2>
            <p class="animate-fade-in-left text-4.5 leading-relaxed" style="animation-delay: 200ms;">
              Our surrogate pay and benefits are flexible and customized to you, as each woman is different and compensated according to her own needs and experiences.
            </p>
            <p class="animate-fade-in-left text-4.5 leading-relaxed" style="animation-delay: 300ms;">
              When people ask how much do surrogates make, I look at total surrogate compensation: base surrogate pay + allowances + any medical bonuses. Your final surrogate income depends on your match and medical details.
            </p>

            <!-- Compensation Cards -->
            <div class="grid animate-fade-in-left gap-6 lg:grid-cols-2" style="animation-delay: 400ms;">
              <div
                v-for="(card, index) in [
                  { label: 'Clothing Allowance', value: '$1,000', icon: 'lucide:shirt' },
                  { label: 'Monthly Allowance', value: '$300 (Total $5,500)', icon: 'radix-icons:calendar' },
                  { label: 'Childcare Support', value: '$250 / month (Total $4,500)', icon: 'radix-icons:heart-filled' },
                  { label: 'Early Pregnancy / Transfer Bundle', value: '$2,500', icon: 'radix-icons:star-filled' },
                ]"
                :key="card.label"
                class="border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-6 text-center shadow-black/10 shadow-lg transition-all duration-300 hover:scale-105 hover:border-[var(--primary-brown)] hover:shadow-xl"
                :style="{ animationDelay: `${500 + (index * 100)}ms` }"
              >
                <div class="mb-4 flex justify-center">
                  <div class="h-12 w-12 flex items-center justify-center rounded-full from-[var(--primary-brown)] to-[var(--dark-brown)] bg-gradient-to-br text-white shadow-lg">
                    <Icon :name="card.icon" class="h-6 w-6" />
                  </div>
                </div>
                <p class="text-3 text-[var(--primary-brown)] font-semibold tracking-wide uppercase">
                  {{ card.label }}
                </p>
                <p class="mt-2 text-5 font-bold" style="font-family: var(--font-primary)">
                  {{ card.value }}
                </p>
              </div>
            </div>

            <!-- Accordion Details -->
            <div class="animate-fade-in-left space-y-4" style="animation-delay: 600ms;">
              <article
                v-for="(accordion, index) in payAccordions"
                :key="accordion.id"
                class="border border-[var(--olive-green)]/30 rounded-8 bg-white/95 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:border-[var(--primary-brown)] hover:shadow-xl"
                :style="{ animationDelay: `${700 + (index * 150)}ms` }"
              >
                <button
                  type="button"
                  class="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-all duration-300 hover:bg-[var(--light-cream)]/30"
                  @click="togglePay(accordion.id)"
                >
                  <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
                    {{ accordion.title }}
                  </h3>
                  <Icon
                    :name="expandedPay[accordion.id] ? 'radix-icons:chevron-up' : 'radix-icons:chevron-down'"
                    class="h-6 w-6 transform text-[var(--primary-brown)] transition-all duration-300"
                    :class="expandedPay[accordion.id] ? 'rotate-180' : 'rotate-0'"
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
                    v-if="expandedPay[accordion.id]"
                    class="overflow-hidden border-t border-[var(--olive-green)]/30 px-6 py-5 text-4.25 leading-relaxed space-y-4"
                  >
                    <p
                      v-for="(paragraph, pIndex) in accordion.paragraphs" :key="paragraph"
                      class="animate-fade-in-up transition-all duration-300"
                      :style="{ animationDelay: `${pIndex * 100}ms` }"
                    >
                      {{ paragraph }}
                    </p>
                  </div>
                </Transition>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="compensation-factors" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-12 lg:grid-cols-[0.4fr,0.6fr] lg:items-center">
          <!-- Left Image -->
          <div class="flex animate-fade-in-left justify-center lg:justify-start" style="animation-delay: 200ms;">
            <div class="relative max-h-200 max-w-400 w-full">
              <div class="absolute inset-0 rounded-8 from-[var(--primary-brown)]/20 to-[var(--olive-green)]/20 bg-gradient-to-br blur-xl" />
              <div class="hover:shadow-3xl relative overflow-hidden rounded-8 shadow-2xl transition-all duration-500 hover:scale-105">
                <img
                  src="/images/landingpage2/Surrogate-Compensation-Factors.jpg"
                  alt="Surrogate Compensation Factors"
                  class="h-auto w-full object-cover"
                >
                <div class="absolute inset-0 from-black/20 to-transparent bg-gradient-to-t" />
              </div>
            </div>
          </div>

          <!-- Right Content -->
          <div class="space-y-8">
            <h2 class="animate-fade-in-right text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" style="font-family: var(--font-primary)">
              What Affects Your Surrogate Pay? Surrogate Compensation Factors
            </h2>
            <p class="animate-fade-in-right text-4.5 leading-relaxed" style="animation-delay: 200ms;">
              Surrogate pay changes by case. Your total surrogate compensation reflects experience, location, and medical needs. The full package also includes support for approved surrogacy expenses and a clear surrogate payment schedule. In short, paid surrogacy rewards time, health, and responsibility—not just miles traveled.
            </p>

            <!-- Factors Grid -->
            <div class="grid gap-6 lg:grid-cols-2">
              <article
                v-for="(factor, index) in compensationFactors"
                :key="factor.number"
                class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-6 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl"
                :style="{ animationDelay: `${300 + (index * 150)}ms` }"
              >
                <div class="mb-4 flex items-start gap-4">
                  <div class="h-12 w-12 flex items-center justify-center rounded-full from-[var(--primary-brown)] to-[var(--dark-brown)] bg-gradient-to-br text-white shadow-lg">
                    <span class="text-4 font-bold">{{ factor.number }}</span>
                  </div>
                  <h3 class="text-4 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
                    {{ factor.title }}
                  </h3>
                </div>
                <div class="text-4 leading-relaxed space-y-3">
                  <p
                    v-for="(paragraph, pIndex) in factor.content" :key="paragraph"
                    class="animate-fade-in-left transition-all duration-300"
                    :style="{ animationDelay: `${400 + (index * 150) + (pIndex * 100)}ms` }"
                  >
                    {{ paragraph }}
                  </p>
                </div>
              </article>
            </div>

            <!-- Bottom Line -->
            <div class="animate-fade-in-up border border-[var(--primary-brown)]/40 rounded-8 bg-white/95 p-8 text-4.5 leading-relaxed shadow-black/10 shadow-lg" style="animation-delay: 800ms;">
              <p class="transition-all duration-300">
                Bottom line: Your surrogate compensation grows from proven experience, a supportive state and insurance setup, and clear medical planning. The right team turns complex surrogacy expenses into a straightforward plan—so you can focus on a healthy journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="payment-schedule" class="bg-[var(--foot-bg)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="mb-12 text-center">
          <h2 class="animate-fade-in-up text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" style="font-family: var(--font-primary)">
            Surrogate Payment Schedule: When Are Funds Available?
          </h2>
          <div class="mx-auto mt-4 h-1 w-32 animate-fade-in-up rounded-full bg-[var(--primary-brown)]" style="animation-delay: 200ms;" />
          <p class="mx-auto mt-6 max-w-200 animate-fade-in-up text-4.5 leading-relaxed" style="animation-delay: 300ms;">
            Paid surrogacy follows a clear surrogate payment schedule. Intended parents fund a third-party trust. The trust then handles surrogacy payment installments and approved reimbursements on time. This structure protects surrogate pay and keeps every surrogate compensation step transparent.
          </p>
        </div>

        <div class="grid gap-8 lg:grid-cols-3">
          <article
            v-for="(highlight, index) in scheduleHighlights"
            :key="highlight.title"
            class="animate-fade-in-up rounded-8 bg-white p-8 text-center shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:-translate-y-2"
            :style="{ animationDelay: `${400 + (index * 150)}ms` }"
          >
            <div class="mx-auto h-16 w-16 flex items-center justify-center rounded-full from-[var(--light-cream)] to-[var(--primary-brown)] bg-gradient-to-br text-white shadow-lg transition-all duration-300 hover:scale-110">
              <Icon
                :name="scheduleIcons[index]"
                class="h-7 w-7"
              />
            </div>
            <h3 class="mt-6 text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
              {{ highlight.title }}
            </h3>
            <p class="mt-3 text-4.25 leading-relaxed transition-all duration-300">
              {{ highlight.body }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <section id="cost-fees" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="grid gap-12 lg:grid-cols-[0.6fr,0.4fr] lg:items-center">
          <!-- Left Content -->
          <div class="space-y-8">
            <h2 class="animate-fade-in-left text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" style="font-family: var(--font-primary)">
              Surrogacy Cost & Agency Fees for Intended Parents
            </h2>
            <p class="animate-fade-in-left text-4.5 leading-relaxed" style="animation-delay: 200ms;">
              Families ask about surrogacy cost first. We answer with a clear package, an independent trust account, and full line items. We publish a service price list and show how the total cost of surrogacy forms across legal, insurance, and care.
            </p>

            <!-- Package Coverage Cards -->
            <div class="grid gap-6 lg:grid-cols-2">
              <article class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-6 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl" style="animation-delay: 300ms;">
                <div class="mb-4 flex items-center gap-3">
                  <div class="h-10 w-10 flex items-center justify-center rounded-full from-[var(--olive-green)] to-[var(--primary-brown)] bg-gradient-to-br text-white shadow-lg">
                    <Icon name="radix-icons:check-circled" class="h-5 w-5" />
                  </div>
                  <h3 class="text-4 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
                    What the package covers
                  </h3>
                </div>
                <div class="text-4 leading-relaxed space-y-3">
                  <p
                    v-for="(paragraph, index) in packageCoverage" :key="paragraph"
                    class="animate-fade-in-left transition-all duration-300"
                    :style="{ animationDelay: `${400 + (index * 100)}ms` }"
                  >
                    {{ paragraph }}
                  </p>
                </div>
              </article>
              <article class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-6 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl" style="animation-delay: 400ms;">
                <div class="mb-4 flex items-center gap-3">
                  <div class="h-10 w-10 flex items-center justify-center rounded-full from-[var(--primary-brown)] to-[var(--dark-brown)] bg-gradient-to-br text-white shadow-lg">
                    <Icon name="radix-icons:cross-circled" class="h-5 w-5" />
                  </div>
                  <h3 class="text-4 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
                    What the package does not cover
                  </h3>
                </div>
                <div class="text-4 leading-relaxed space-y-3">
                  <p
                    v-for="(paragraph, index) in packageExclusions" :key="paragraph"
                    class="animate-fade-in-left transition-all duration-300"
                    :style="{ animationDelay: `${500 + (index * 100)}ms` }"
                  >
                    {{ paragraph }}
                  </p>
                </div>
              </article>
            </div>

            <!-- Additional Information Cards -->
            <div class="space-y-6">
              <div class="animate-fade-in-up border border-[var(--olive-green)]/40 rounded-8 bg-white/95 p-6 shadow-black/10 shadow-lg" style="animation-delay: 600ms;">
                <div class="mb-4 flex items-center gap-3">
                  <div class="h-10 w-10 flex items-center justify-center rounded-full from-[var(--primary-brown)] to-[var(--olive-green)] bg-gradient-to-br text-white shadow-lg">
                    <Icon name="radix-icons:clock" class="h-5 w-5" />
                  </div>
                  <h3 class="text-4 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
                    How funding and payments work
                  </h3>
                </div>
                <p class="animate-fade-in-left text-4 leading-relaxed transition-all duration-300" style="animation-delay: 700ms;">
                  You fund a third-party trust (escrow). Families deposit in milestones—at contract, after medical clearance, and after heartbeat—then maintain a small balance for upcoming items. The trust releases installments and approved reimbursements on schedule, which keeps surrogacy payment timing clean and protects your surrogate cost plan end-to-end.
                </p>
              </div>

              <div class="animate-fade-in-up border border-[var(--primary-brown)]/40 rounded-8 bg-white/95 p-6 shadow-black/10 shadow-lg" style="animation-delay: 800ms;">
                <div class="mb-4 flex items-center gap-3">
                  <div class="h-10 w-10 flex items-center justify-center rounded-full from-[var(--dark-brown)] to-[var(--primary-brown)] bg-gradient-to-br text-white shadow-lg">
                    <Icon name="lucide:shield-check" class="h-5 w-5" />
                  </div>
                  <h3 class="text-4 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
                    Why this structure builds trust
                  </h3>
                </div>
                <div class="text-4 leading-relaxed space-y-3">
                  <p
                    v-for="(paragraph, index) in insurancePoints" :key="paragraph"
                    class="animate-fade-in-left transition-all duration-300"
                    :style="{ animationDelay: `${900 + (index * 100)}ms` }"
                  >
                    {{ paragraph }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="flex animate-fade-in-left justify-center lg:justify-start" style="animation-delay: 200ms;">
            <div class="relative max-h-200 max-w-400 w-full">
              <div class="absolute inset-0 rounded-8 from-[var(--primary-brown)]/20 to-[var(--olive-green)]/20 bg-gradient-to-br blur-xl" />
              <div class="hover:shadow-3xl relative overflow-hidden rounded-8 shadow-2xl transition-all duration-500 hover:scale-105">
                <img
                  src="/images/landingpage2/Surrogacy-Requirements.jpg"
                  alt="Surrogate Surrogacy Requirements"
                  class="h-auto w-full object-cover"
                >
                <div class="absolute inset-0 from-black/20 to-transparent bg-gradient-to-t" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="protections" class="bg-[var(--foot-bg)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="mb-12 text-center">
          <h2 class="animate-fade-in-up text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" style="font-family: var(--font-primary)">
            Insurance, Escrow & Legal: Protecting Your Surrogate Pay
          </h2>
          <div class="mx-auto mt-4 h-1 w-32 animate-fade-in-up rounded-full bg-[var(--primary-brown)]" style="animation-delay: 200ms;" />
        </div>
        <div class="grid gap-8 lg:grid-cols-2">
          <article
            v-for="(section, index) in protectionSections"
            :key="section.title"
            class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-8 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl"
            :style="{ animationDelay: `${300 + (index * 150)}ms` }"
          >
            <div class="mb-6 flex items-center gap-4">
              <div class="h-12 w-12 flex items-center justify-center rounded-full from-[var(--primary-brown)] to-[var(--dark-brown)] bg-gradient-to-br text-white shadow-lg">
                <Icon name="lucide:shield-check" class="h-6 w-6" />
              </div>
              <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
                {{ section.title }}
              </h3>
            </div>
            <div class="text-4.25 leading-relaxed space-y-4">
              <p
                v-for="(paragraph, pIndex) in section.content" :key="paragraph"
                class="animate-fade-in-left transition-all duration-300"
                :style="{ animationDelay: `${400 + (index * 150) + (pIndex * 100)}ms` }"
              >
                {{ paragraph }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="timeline" class="py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="mb-12 text-center">
          <h2 class="animate-fade-in-up text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" style="font-family: var(--font-primary)">
            Surrogacy Process Timeline: Steps, Milestones & Payments
          </h2>
          <div class="mx-auto mt-4 h-1 w-32 animate-fade-in-up rounded-full bg-[var(--primary-brown)]" style="animation-delay: 200ms;" />
          <p class="mt-6 animate-fade-in-up text-4.5 leading-relaxed" style="animation-delay: 300ms;">
            A full gestational surrogacy journey usually takes about 12–16 months. The exact pace depends on embryo readiness, matching, and pregnancy progress. We keep you updated with weekly check-ins.
          </p>
        </div>

        <!-- Timeline with connecting line -->
        <div class="relative">
          <div class="absolute bottom-0 left-8 top-0 hidden w-0.5 from-[var(--primary-brown)] via-[var(--olive-green)] to-[var(--primary-brown)] bg-gradient-to-b opacity-30 lg:block" />
          <div class="space-y-8">
            <article
              v-for="(step, index) in processSteps"
              :key="step.title"
              class="relative flex animate-fade-in-up items-start gap-6"
              :style="{ animationDelay: `${400 + (index * 200)}ms` }"
            >
              <!-- Step Number Circle -->

              <!-- Step Content -->
              <div class="flex-1 border border-[var(--olive-green)]/30 rounded-8 bg-white/95 p-6 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-[var(--primary-brown)] hover:shadow-xl">
                <h3 class="text-5 font-semibold uppercase transition-all duration-300 hover:text-[var(--primary-brown)]" style="font-family: var(--font-primary)">
                  {{ step.title }}
                </h3>
                <p class="mt-3 text-4.25 leading-relaxed transition-all duration-300">
                  {{ step.description }}
                </p>
              </div>
            </article>
          </div>
        </div>

        <div class="mt-12 animate-fade-in-up border border-[var(--primary-brown)]/40 rounded-8 bg-white/95 p-8 text-4.5 leading-relaxed shadow-black/10 shadow-lg" style="animation-delay: 1000ms;">
          <p class="transition-all duration-300">
            What to expect: steady communication, milestone-based funding, and a transparent plan from match to newborn handoff. This structure protects your time, your health, and your surrogate compensation.
          </p>
        </div>
      </div>
    </section>

    <section id="faq" class="bg-[var(--foot-bg)] py-18 lg:py-24">
      <div class="mx-auto max-w-280 px-5 lg:px-10">
        <div class="mb-12 text-center">
          <h2 class="animate-fade-in-up text-7 font-semibold uppercase transition-all duration-500 hover:scale-105 lg:text-8" style="font-family: var(--font-primary)">
            Frequently Asked Questions
          </h2>
          <div class="mx-auto mt-4 h-1 w-24 animate-fade-in-up rounded-full bg-[var(--primary-brown)]" style="animation-delay: 200ms;" />
        </div>
        <div class="space-y-6">
          <article
            v-for="(item, index) in faqQuestions"
            :key="item.question"
            class="animate-fade-in-up border border-[var(--olive-green)]/30 rounded-8 bg-white/95 shadow-black/10 shadow-lg transition-all duration-300 hover:scale-[1.01] hover:border-[var(--primary-brown)] hover:shadow-xl"
            :style="{ animationDelay: `${300 + (index * 150)}ms` }"
          >
            <button
              type="button"
              class="w-full flex items-center justify-between gap-4 px-8 py-6 text-left transition-all duration-300 hover:bg-[var(--light-cream)]/30"
              @click="toggleFaq(item.question)"
            >
              <span class="text-4.5 font-semibold transition-all duration-300 hover:text-[var(--primary-brown)]">
                {{ item.question }}
              </span>
              <Icon
                :name="expandedFaq[item.question] ? 'radix-icons:chevron-up' : 'radix-icons:chevron-down'"
                class="h-6 w-6 transform text-[var(--primary-brown)] transition-all duration-300"
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
                class="overflow-hidden border-t border-[var(--olive-green)]/30 px-8 py-6 text-4.25 leading-relaxed"
              >
                <p class="animate-fade-in-up transition-all duration-300">
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
        <div class="absolute bottom-0 right-1/5 h-48 w-48 rounded-full bg-[var(--olive-green)]/50 blur-[140px]" />
      </div>
      <div class="relative mx-auto max-w-240 px-5 text-center">
        <h2 class="text-8 font-semibold tracking-wide uppercase lg:text-10" style="font-family: var(--font-primary)">
          Ready to Plan Your Surrogacy Journey?
        </h2>
        <p class="mt-4 text-4.5 leading-relaxed">
          Surrogacy compensation works best with a transparent plan, a supportive team, and weekly communication. Let’s review your goals, your pay, and every milestone together.
        </p>
        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <NuxtLink
            to="/be-surrogate"
            class="rounded-full bg-white px-6 py-3 text-3.5 text-[var(--dark-brown)] font-semibold uppercase transition hover:bg-[var(--light-cream)]"
          >
            Start Application
          </NuxtLink>
          <NuxtLink
            to="/referral"
            class="border border-white rounded-full px-6 py-3 text-3.5 text-white font-semibold uppercase transition hover:bg-white/10"
          >
            Talk to a Coordinator
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
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
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

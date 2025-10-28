<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import SurrogateStepsComponent from '@/components/surrogacy/process/SurrogateStepsComponent.vue'

const { t } = useI18n()

// SEO 配置
useHead({
  title: 'Become a Surrogate | Gestational Surrogacy Process Guide',
  meta: [
    {
      name: 'description',
      content: 'Learn the surrogacy process step by step—quick eligibility, surrogacy requirements, IVF and embryo transfer timeline, and full support.',
    },
    {
      property: 'og:title',
      content: 'Become a Surrogate | Gestational Surrogacy Process Guide',
    },
    {
      property: 'og:description',
      content: 'Learn the surrogacy process step by step—quick eligibility, surrogacy requirements, IVF and embryo transfer timeline, and full support.',
    },
    {
      property: 'og:type',
      content: 'website',
    },
    {
      name: 'keywords',
      content: 'surrogate mother, gestational surrogacy, surrogacy process, IVF, embryo transfer, surrogacy requirements, become a surrogate',
    },
  ],
})

// 代孕步驟數據
const surrogacySteps = reactive([
  {
    id: 1,
    title: 'Apply & Talk With Us',
    duration: '1-2 weeks',
    description: 'Tell us your goals and timeline to become a surrogate. Share basic health history and delivery records. We confirm the fit with our surrogacy requirements.',
    activities: [
      'Complete initial application',
      'Schedule consultation call',
      'Share health history',
      'Review surrogacy requirements',
    ],
    details: 'The first step in becoming a gestational carrier is completing our comprehensive application. This helps us understand your motivations, timeline, and ensure you meet our basic requirements. We\'ll schedule a consultation to discuss your goals and answer any questions you may have about the surrogacy process.',
  },
  {
    id: 2,
    title: 'Pre-Screen & Records Review',
    duration: '1-2 weeks',
    description: 'Complete a short pre-screen and a background check. Do a quick mental-health consult. We set expectations for travel, appointments, and support.',
    activities: [
      'Background check completion',
      'Mental health consultation',
      'Medical records review',
      'Support system evaluation',
    ],
    details: 'During this phase, we conduct thorough background checks and psychological evaluations to ensure you\'re ready for the surrogacy journey. Our mental health professionals will assess your emotional readiness and support system. We\'ll also review your medical records to ensure you meet all health requirements.',
  },
  {
    id: 3,
    title: 'Match With Intended Parents',
    duration: '2-4 weeks',
    description: 'Review family profiles that align with your preferences. Meet the intended parents on a friendly video call. Confirm the match when everyone feels good about it.',
    activities: [
      'Review family profiles',
      'Video call with intended parents',
      'Discuss expectations',
      'Confirm mutual match',
    ],
    details: 'This is one of the most important steps - finding the right match with intended parents. We\'ll share profiles of families looking for a surrogate, and you can review their stories, preferences, and expectations. Once you\'re interested, we\'ll arrange a video call so everyone can get to know each other and ensure it\'s a good fit.',
  },
  {
    id: 4,
    title: 'Medical Screening & Clearance',
    duration: '2-3 weeks',
    description: 'Visit the IVF clinic for labs, ultrasound, and a full exam. The doctor confirms you can move forward as a surrogate mother (gestational carrier). You get a clear plan for meds and monitoring.',
    activities: [
      'Comprehensive medical exam',
      'Lab work and testing',
      'Ultrasound examination',
      'Medication protocol review',
    ],
    details: 'You\'ll visit the IVF clinic for a complete medical evaluation including blood work, ultrasounds, and a thorough physical exam. The reproductive endocrinologist will review your medical history and current health status to ensure you\'re medically cleared for surrogacy. You\'ll receive detailed information about the medication protocol and monitoring schedule.',
  },
  {
    id: 5,
    title: 'Legal Contracts & Insurance Setup',
    duration: '3-4 weeks',
    description: 'Independent attorneys review the agreement with you. You confirm terms, boundaries, and benefits in plain language. We coordinate insurance and logistics for appointments.',
    activities: [
      'Legal contract review',
      'Independent legal counsel',
      'Insurance coordination',
      'Terms finalization',
    ],
    details: 'You\'ll work with independent legal counsel to review and negotiate the surrogacy agreement. This covers compensation, medical expenses, insurance, and all legal protections. The contract is written in clear language so you understand all terms and conditions. We also coordinate insurance coverage and logistics for all medical appointments.',
  },
  {
    id: 6,
    title: 'Cycle Prep for Embryo Transfer',
    duration: '4-6 weeks',
    description: 'Start the IVF and surrogacy medication plan. Attend monitoring visits to check lining and hormones. Your nurse explains the surrogacy implantation process step by step.',
    activities: [
      'Begin medication protocol',
      'Regular monitoring visits',
      'Hormone level checks',
      'Uterine lining preparation',
    ],
    details: 'You\'ll begin the medication protocol to prepare your body for embryo transfer. This includes daily medications and regular monitoring visits to check your hormone levels and uterine lining. Your nurse coordinator will guide you through each step and explain what to expect during the implantation process.',
  },
  {
    id: 7,
    title: 'Embryo Transfer Day',
    duration: '1 day',
    description: 'Arrive for the embryo transfer at the clinic. Rest per clinic advice after the embryo transfer to the surrogate mother. You return for bloodwork to confirm pregnancy.',
    activities: [
      'Embryo transfer procedure',
      'Post-transfer rest period',
      'Initial pregnancy testing',
      'Follow-up appointments',
    ],
    details: 'The embryo transfer is a simple, outpatient procedure that takes about 30 minutes. You\'ll rest for a short period after the transfer, then return home. About 10-14 days later, you\'ll return for blood work to confirm if the pregnancy was successful. This is an exciting milestone in your surrogacy journey!',
  },
  {
    id: 8,
    title: 'Pregnancy Care & Support',
    duration: '9 months',
    description: 'Celebrate the first positive test, then confirm heartbeat. Follow your OB schedule and the clinic\'s plan. Our team checks in, coordinates travel, and keeps everyone aligned.',
    activities: [
      'Regular OB appointments',
      'Pregnancy monitoring',
      'Support team check-ins',
      'Intended parents updates',
    ],
    details: 'Once pregnancy is confirmed, you\'ll transition to regular obstetric care while maintaining contact with our support team. We coordinate all appointments, provide ongoing support, and keep the intended parents updated on your progress. Our team is available 24/7 for any questions or concerns.',
  },
  {
    id: 9,
    title: 'Delivery & Baby Handover',
    duration: '1-3 days',
    description: 'Deliver at your chosen hospital with your care team. The baby goes to the intended parents right away. You focus on recovery and family time.',
    activities: [
      'Hospital delivery',
      'Baby handover to parents',
      'Recovery period',
      'Post-delivery support',
    ],
    details: 'You\'ll deliver at your chosen hospital with your medical team and our support staff present. The baby will go to the intended parents immediately after delivery, and you\'ll focus on your recovery. Our team ensures everything goes smoothly and provides support during this emotional and physical transition.',
  },
  {
    id: 10,
    title: 'Postpartum & Next Steps',
    duration: '2-4 weeks',
    description: 'Attend a follow-up visit and complete simple paperwork. We help with reimbursements and final wrap-up. Try our surrogacy due date calculator earlier in the journey to map your timeline.',
    activities: [
      'Postpartum follow-up',
      'Final paperwork',
      'Reimbursement processing',
      'Journey completion',
    ],
    details: 'After delivery, you\'ll attend follow-up appointments to ensure you\'re recovering well. We\'ll help process any remaining reimbursements and complete final paperwork. Our team remains available for any questions as you transition back to your normal routine, forever changed by this incredible journey.',
  },
])

// 當前選中的步驟
const activeStep = ref(1)

// 設置活動步驟
function setActiveStep(stepId: number) {
  activeStep.value = stepId
}
</script>

<template>
  <div class="min-h-screen bg-[var(--head-bg)]">
    <AppHeader />

    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-white py-20">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="grid gap-16 items-center lg:grid-cols-[1.2fr_1fr]">
          <div>
            <h1 class="mb-8 text-4xl text-[var(--dark-brown)] font-bold md:text-6xl" style="font-family: var(--font-primary)">
              The Surrogacy Process &amp; Surrogacy Steps
            </h1>
            <div class="space-y-5 text-lg text-[var(--primary-brown)] leading-relaxed md:text-xl">
              <p>
                The surrogacy process is a beautiful journey built on trust, compassion, and teamwork. It connects intended parents who dream of having a baby with caring surrogate mothers who want to help create life. Understanding each step of the journey makes the experience smoother and more meaningful for everyone involved.
              </p>
              <p>
                Every surrogacy step has its own purpose. From medical screening and legal contracts to embryo transfer and delivery, each part follows a clear path designed to protect both the intended parents and the surrogate. When everyone understands the process, communication feels easier, expectations stay realistic, and emotions remain balanced.
              </p>
              <p>
                In the United States, especially in states like California, the surrogacy process follows strict medical and legal guidelines. These rules make sure the surrogate mother’s health, the baby’s safety, and the parents’ legal rights are all protected from the very beginning.
              </p>
              <p>
                At its heart, surrogacy is more than a medical journey — it’s a partnership built on trust and shared hope. Every stage brings the dream of parenthood one step closer to reality.
              </p>
            </div>
            <div class="mt-10 flex flex-wrap gap-4">
              <NuxtLink
                to="/be-surrogate"
                class="rounded-xl bg-[var(--grayish-green)] px-8 py-4 text-base text-white font-semibold shadow-lg transition-opacity hover:opacity-90"
              >
                Start Your Surrogacy Conversation
              </NuxtLink>
              <NuxtLink
                to="/journey"
                class="rounded-xl border-2 border-[var(--grayish-green)] px-8 py-4 text-base text-[var(--grayish-green)] font-semibold transition-colors hover:bg-[var(--grayish-green)] hover:text-white"
              >
                Explore Our Programs
              </NuxtLink>
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
            <div class="absolute -bottom-8 -right-6 hidden w-[220px] rounded-2xl border border-white/70 bg-white/90 p-6 backdrop-blur md:block">
              <p class="text-sm text-[var(--primary-brown)] leading-relaxed">
                Compassion, planning, and shared hope guide every milestone—from the first call to the baby’s arrival.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[var(--head-bg)] to-transparent pointer-events-none" />
    </section>

    <!-- Gestational Surrogacy Section -->
    <section class="bg-[var(--head-bg)] py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-12 text-center">
          <h2 class="mb-6 text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            What Is Gestational Surrogacy?
          </h2>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            Gestational surrogacy offers a loving, structured path for families and the surrogate mother alike. Here’s how it differs from traditional surrogacy and the people who make each journey possible.
          </p>
        </div>

        <div class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div class="space-y-6 rounded-3xl bg-white p-10 shadow-lg">
            <h3 class="text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              Gestational vs. Traditional Surrogacy
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              In a gestational surrogacy process, the surrogate mother carries a baby who is not genetically related to her. The embryo is created through IVF using the intended parents’ or donors’ eggs and sperm. The surrogate helps nurture the pregnancy and deliver the baby, but she has no biological connection to the child.
            </p>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              Traditional surrogacy is different. In that case, the surrogate’s own egg is used, making her the biological mother. Today, almost all surrogacy programs in the United States follow the gestational surrogacy steps, because this method is legally clearer and emotionally safer for everyone.
            </p>
          </div>

          <div class="space-y-8">
            <div class="rounded-3xl bg-white p-10 shadow-lg">
              <h3 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
                Key Participants: Intended Parents, Surrogate Mothers, and Donors
              </h3>
              <p class="mb-4 text-lg text-[var(--primary-brown)] leading-relaxed">
                The surrogacy process always involves several key people.
              </p>
              <ul class="text-lg text-[var(--primary-brown)] leading-relaxed space-y-3">
                <li>- Intended parents are those who wish to have a baby through surrogacy.</li>
                <li>- Surrogate mothers carry the baby with care, following medical and legal steps to ensure safety and success.</li>
                <li>- Donors (if needed) provide eggs or sperm when medical reasons require it.</li>
              </ul>
              <p class="mt-4 text-lg text-[var(--primary-brown)] leading-relaxed">
                A professional agency coordinates communication between all parties, ensuring that every surrogacy step—from screening to delivery—runs smoothly. Experienced doctors, lawyers, and counselors guide the process with compassion and precision.
              </p>
            </div>
            <div class="rounded-3xl bg-white p-10 shadow-lg">
              <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
                Gestational surrogacy allows love, science, and trust to work together. It gives hope to families who need medical help and gives the surrogate mother a chance to make a lasting difference in someone’s life.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Step-by-Step Section -->
    <section id="surrogacy-steps" class="bg-white py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mx-auto mb-12 max-w-5xl text-center">
          <h2 class="mb-6 text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Step-by-Step Breakdown of the Surrogacy Process
          </h2>
        </div>
        <div class="mx-auto mb-16 max-w-5xl space-y-4 rounded-3xl bg-[var(--head-bg)] p-10 text-lg text-[var(--primary-brown)] leading-relaxed shadow-lg md:text-xl">
          <p>
            The surrogacy process follows clear, humane surrogacy steps. Each step protects the surrogate mother, the baby, and the intended parents. The flow below reflects common practice in California and across the United States.
          </p>
        </div>
        <SurrogateStepsComponent
          :steps="surrogacySteps"
          :active-step="activeStep"
          @step-change="setActiveStep"
        />
      </div>
    </section>

    <!-- Surrogacy Process Flowchart Section -->
    <section class="bg-[var(--head-bg)] py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-12 text-center">
          <h2 class="mb-6 text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Surrogacy Process Flowchart &amp; Checklist
          </h2>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            A simple map makes the surrogacy process clear. The flowchart shows each action, owner, and handoff. It keeps the surrogacy steps calm and predictable for the surrogate mother and the intended parents.
          </p>
        </div>
        <div class="grid gap-10 lg:grid-cols-[1fr_0.9fr]">
          <div class="rounded-3xl bg-white p-10 shadow-lg">
            <h3 class="mb-6 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              Flowchart: From First Call to Post-Birth
            </h3>
            <ol class="space-y-6 text-lg text-[var(--primary-brown)] leading-relaxed">
              <li>
                <span class="block text-[var(--dark-brown)] font-semibold">1. Initial consult → Pre-screen</span>
                <span>Coordinator opens a file and sets goals.</span>
              </li>
              <li>
                <span class="block text-[var(--dark-brown)] font-semibold">2. Full screening → Match</span>
                <span>Clinic runs labs and imaging. Psychologist meets the surrogate mother. Team confirms the match.</span>
              </li>
              <li>
                <span class="block text-[var(--dark-brown)] font-semibold">3. Legal consult → Contract → Escrow</span>
                <span>Independent counsel explains terms. Everyone signs. SeedTrust sets the milestone schedule.</span>
              </li>
              <li>
                <span class="block text-[var(--dark-brown)] font-semibold">4. IVF prep → Embryo creation → Transfer</span>
                <span>Clinic plans meds and monitoring. Lab creates embryos. Doctor completes the transfer.</span>
              </li>
              <li>
                <span class="block text-[var(--dark-brown)] font-semibold">5. Pregnancy monitoring → Case updates</span>
                <span>OB visits follow a set calendar. Case manager sends weekly updates. ART Risk supports insurance questions.</span>
              </li>
              <li>
                <span class="block text-[var(--dark-brown)] font-semibold">6. Delivery plan → Birth → Parentage order</span>
                <span>Hospital plan is ready. Baby arrives. Attorneys complete the parentage steps.</span>
              </li>
              <li>
                <span class="block text-[var(--dark-brown)] font-semibold">7. Discharge → Documents → Home</span>
                <span>Birth certificate and travel papers follow. Family goes home with peace of mind.</span>
              </li>
            </ol>
          </div>
          <div class="space-y-8">
            <div class="rounded-3xl bg-white p-10 shadow-lg">
              <h3 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
                Milestones &amp; Owners
              </h3>
              <ul class="text-lg text-[var(--primary-brown)] leading-relaxed space-y-3">
                <li>Medical: clinic, OB, and lab manage testing, meds, transfer, and prenatal care.</li>
                <li>Legal: attorneys guide contracts and parentage orders, state by state.</li>
                <li>Financial: SeedTrust holds funds and releases payments by milestone.</li>
                <li>Insurance: advisors design coverage; ART Risk supports claims.</li>
                <li>Coordination: a case manager tracks every surrogacy step and keeps everyone aligned.</li>
              </ul>
            </div>
            <div class="rounded-3xl bg-white p-10 shadow-lg">
              <h3 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
                Printable Checklist (Highlights)
              </h3>
              <p class="mb-4 text-lg text-[var(--primary-brown)] leading-relaxed">
                Use this list to track the surrogacy process with ease. Mark each surrogacy step as you go.
              </p>
              <ul class="text-lg text-[var(--primary-brown)] leading-relaxed space-y-2">
                <li>□ Health history sent; OB records complete</li>
                <li>□ Lab panel, ultrasound, and psych eval complete</li>
                <li>□ Match meeting done; values and birth plan aligned</li>
                <li>□ Legal consult booked; contract terms clear</li>
                <li>□ Escrow funded; payment calendar confirmed</li>
                <li>□ IVF meds delivered; monitoring calendar set</li>
                <li>□ Transfer day confirmed; travel and support arranged</li>
                <li>□ Positive beta; prenatal care schedule active</li>
                <li>□ Hospital tour; delivery preferences on file</li>
                <li>□ Parentage order filed; birth certificate request ready</li>
                <li>□ Newborn documents prepared; travel plan confirmed</li>
              </ul>
            </div>
            <div class="rounded-3xl bg-white p-10 shadow-lg">
              <h3 class="mb-4 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
                California Notes
              </h3>
              <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
                California law supports gestational surrogacy with clear parentage paths. Many programs center care around Los Angeles and San Diego clinics such as California Fertility Partners, Gen 5 Fertility, and Incinta. This network keeps the surrogacy steps tight and predictable for the surrogate mother and the intended parents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="bg-white py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-12 text-center">
          <h2 class="mb-6 text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Frequently Asked Questions About the Surrogacy Process
          </h2>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            The surrogacy process raises real questions. Clear answers keep the surrogacy steps simple and calm.
          </p>
        </div>
        <div class="grid gap-8 md:grid-cols-2">
          <div class="rounded-3xl bg-[var(--head-bg)] p-8 shadow-lg">
            <h3 class="mb-3 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              How long does the surrogacy process take?
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              Most families follow a 12–18 month path. Screening and matching take 1–3 months. Legal review takes 3–6 weeks. IVF prep and transfer take 4–8 weeks. Pregnancy and birth add about 9 months. A second transfer or donor timing can extend the surrogacy process.
            </p>
          </div>
          <div class="rounded-3xl bg-[var(--head-bg)] p-8 shadow-lg">
            <h3 class="mb-3 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              Whose eggs and sperm does gestational surrogacy use?
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              Doctors use the intended mother’s eggs when possible. Some families use donor eggs. Doctors use the intended father’s sperm or donor sperm. The surrogate mother carries the pregnancy. She holds no genetic link to the baby. These surrogacy steps keep roles clear.
            </p>
          </div>
          <div class="rounded-3xl bg-[var(--head-bg)] p-8 shadow-lg">
            <h3 class="mb-3 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              What medical tests does a surrogate mother complete?
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              Clinics run labs, ultrasound, and infectious-disease panels. A psychologist checks readiness and support. OB history matters a lot. Doctors then design meds and a safe plan for the embryo transfer. These surrogacy steps protect the surrogate mother and the baby.
            </p>
          </div>
          <div class="rounded-3xl bg-[var(--head-bg)] p-8 shadow-lg">
            <h3 class="mb-3 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              How do attorneys protect everyone?
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              Each party hires independent counsel. Attorneys set clear rights and duties in the contract. They plan parentage orders by state. In many California cases, lawyers secure a pre-birth order. That keeps the surrogacy process clean at delivery.
            </p>
          </div>
          <div class="md:col-span-2 rounded-3xl bg-[var(--head-bg)] p-8 shadow-lg">
            <h3 class="mb-3 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              How does embryo transfer work in the surrogacy process?
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              The clinic monitors lining and hormones. The lab creates embryos with parental or donor gametes. Doctors schedule transfer day and guide recovery. A beta-hCG test confirms next surrogacy steps. Nurses and a case manager share updates often.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Choose Yunda Section -->
    <section class="bg-[var(--head-bg)] py-24">
      <div class="container mx-auto max-w-7xl px-4">
        <div class="mb-12 text-center space-y-4">
          <h2 class="text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
            Why Choose Yunda Surrogacy Agency 🩵
          </h2>
          <p class="mx-auto max-w-4xl text-lg text-[var(--primary-brown)] leading-relaxed">
            Education sits first here. A warm, reliable team makes the surrogacy process easier. Yunda supports every surrogacy step with steady care and clear updates.
          </p>
        </div>
        <div class="grid gap-8 md:grid-cols-2">
          <div class="rounded-3xl bg-white p-8 shadow-lg">
            <h3 class="mb-3 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              A U.S. Partner With a California Focus
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              Yunda works across the United States with a strong focus on California programs. Many surrogate mothers hold U.S. citizenship and live in California. Clinics and courts in these regions support a clear, family-centered surrogacy process.
            </p>
          </div>
          <div class="rounded-3xl bg-white p-8 shadow-lg">
            <h3 class="mb-3 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              Medical &amp; Legal Excellence Under One Roof
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              Yunda partners with respected fertility centers such as California Fertility Partners, Gen 5 Fertility, and Incinta. Experienced attorneys active in ASRM/AAAA guide legal steps and parentage orders. This network keeps the surrogacy steps precise and safe.
            </p>
          </div>
          <div class="rounded-3xl bg-white p-8 shadow-lg">
            <h3 class="mb-3 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              Transparent Escrow and Insurance Support
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              SeedTrust manages escrow and releases funds by milestone. ART Risk supports insurance design and claims. This structure protects the surrogate mother and the intended parents through the full surrogacy process.
            </p>
          </div>
          <div class="rounded-3xl bg-white p-8 shadow-lg">
            <h3 class="mb-3 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
              Dedicated Case Managers &amp; Weekly Updates
            </h3>
            <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
              A case manager follows each file from day one. The team sends weekly updates and sets clear next actions. Everyone sees the same timeline and the same goals. Small details stay on track. Big moments feel calm.
            </p>
          </div>
        </div>
        <div class="mt-8 rounded-3xl bg-white p-8 shadow-lg">
          <h3 class="mb-3 text-2xl text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
            Start Your Plan With Confidence
          </h3>
          <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
            Yunda listens first. The team maps a clean surrogacy process for each family. The plan covers screening, matching, legal review, IVF, pregnancy, and birth. The tone stays respectful and kind from start to finish.
          </p>
        </div>
      </div>
    </section>

    <!-- Summary Section -->
    <section class="bg-white py-24">
      <div class="container mx-auto max-w-5xl px-4 text-center space-y-6">
        <h2 class="text-4xl text-[var(--dark-brown)] font-bold md:text-5xl" style="font-family: var(--font-primary)">
          Summary: A Clear Path Through the Surrogacy Steps
        </h2>
        <p class="text-lg text-[var(--primary-brown)] leading-relaxed">
          A kind plan and clear surrogacy steps change everything. The surrogate mother receives steady medical and emotional support. The intended parents move through each milestone with trust. Clinics, attorneys, and advisors work in sync. A simple, human surrogacy process helps love, science, and law work together—one careful step at a time.
        </p>
      </div>
    </section>

    <!-- Final CTA -->
    <section class="bg-[var(--head-bg)] py-20">
      <div class="container mx-auto max-w-6xl px-4 text-center">
        <div class="rounded-3xl bg-[var(--grayish-green)] px-8 py-12 shadow-xl sm:px-16">
          <h3 class="mb-4 text-3xl text-white font-bold md:text-4xl" style="font-family: var(--font-primary)">
            Ready to walk the surrogacy steps together?
          </h3>
          <p class="mx-auto mb-8 max-w-3xl text-lg text-white leading-relaxed">
            Connect with the Yunda team to map your journey from first consult through delivery. We’ll listen first, then guide every milestone with clarity and care.
          </p>
          <NuxtLink
            to="/be-surrogate"
            class="inline-flex items-center justify-center rounded-xl bg-white px-10 py-4 text-lg text-[var(--grayish-green)] font-semibold shadow-lg transition-opacity hover:opacity-90"
          >
            Begin Your Application
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
</style>

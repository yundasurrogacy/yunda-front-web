<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import AppHeader from '@/components/base/AppHeader.vue'
import AppFooter from '@/components/base/AppFooter.vue'
import SurrogateStepsComponent from '@/components/surrogacy/process/SurrogateStepsComponent.vue'

const { t } = useI18n()

// SEO 配置
useHead({
  title: 'Become a Surrogate | Gestational Surrogacy Process Guide',
  meta: [
    {
      name: 'description',
      content: 'Learn the surrogacy process step by step—quick eligibility, surrogacy requirements, IVF and embryo transfer timeline, and full support. Apply to become a surrogate.',
    },
    {
      property: 'og:title',
      content: 'Become a Surrogate | Gestational Surrogacy Process Guide',
    },
    {
      property: 'og:description',
      content: 'Learn the surrogacy process step by step—quick eligibility, surrogacy requirements, IVF and embryo transfer timeline, and full support. Apply to become a surrogate.',
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
      'Review surrogacy requirements'
    ],
    details: 'The first step in becoming a gestational carrier is completing our comprehensive application. This helps us understand your motivations, timeline, and ensure you meet our basic requirements. We\'ll schedule a consultation to discuss your goals and answer any questions you may have about the surrogacy process.'
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
      'Support system evaluation'
    ],
    details: 'During this phase, we conduct thorough background checks and psychological evaluations to ensure you\'re ready for the surrogacy journey. Our mental health professionals will assess your emotional readiness and support system. We\'ll also review your medical records to ensure you meet all health requirements.'
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
      'Confirm mutual match'
    ],
    details: 'This is one of the most important steps - finding the right match with intended parents. We\'ll share profiles of families looking for a surrogate, and you can review their stories, preferences, and expectations. Once you\'re interested, we\'ll arrange a video call so everyone can get to know each other and ensure it\'s a good fit.'
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
      'Medication protocol review'
    ],
    details: 'You\'ll visit the IVF clinic for a complete medical evaluation including blood work, ultrasounds, and a thorough physical exam. The reproductive endocrinologist will review your medical history and current health status to ensure you\'re medically cleared for surrogacy. You\'ll receive detailed information about the medication protocol and monitoring schedule.'
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
      'Terms finalization'
    ],
    details: 'You\'ll work with independent legal counsel to review and negotiate the surrogacy agreement. This covers compensation, medical expenses, insurance, and all legal protections. The contract is written in clear language so you understand all terms and conditions. We also coordinate insurance coverage and logistics for all medical appointments.'
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
      'Uterine lining preparation'
    ],
    details: 'You\'ll begin the medication protocol to prepare your body for embryo transfer. This includes daily medications and regular monitoring visits to check your hormone levels and uterine lining. Your nurse coordinator will guide you through each step and explain what to expect during the implantation process.'
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
      'Follow-up appointments'
    ],
    details: 'The embryo transfer is a simple, outpatient procedure that takes about 30 minutes. You\'ll rest for a short period after the transfer, then return home. About 10-14 days later, you\'ll return for blood work to confirm if the pregnancy was successful. This is an exciting milestone in your surrogacy journey!'
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
      'Intended parents updates'
    ],
    details: 'Once pregnancy is confirmed, you\'ll transition to regular obstetric care while maintaining contact with our support team. We coordinate all appointments, provide ongoing support, and keep the intended parents updated on your progress. Our team is available 24/7 for any questions or concerns.'
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
      'Post-delivery support'
    ],
    details: 'You\'ll deliver at your chosen hospital with your medical team and our support staff present. The baby will go to the intended parents immediately after delivery, and you\'ll focus on your recovery. Our team ensures everything goes smoothly and provides support during this emotional and physical transition.'
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
      'Journey completion'
    ],
    details: 'After delivery, you\'ll attend follow-up appointments to ensure you\'re recovering well. We\'ll help process any remaining reimbursements and complete final paperwork. Our team remains available for any questions as you transition back to your normal routine, forever changed by this incredible journey.'
  }
])

// 當前選中的步驟
const activeStep = ref(1)

// 設置活動步驟
const setActiveStep = (stepId: number) => {
  activeStep.value = stepId
}
</script>

<template>
  <div class="min-h-screen bg-[var(--head-bg)]">
    <AppHeader />
    
    <!-- Hero Section -->
    <section class="relative bg-gradient-to-b from-[var(--light-cream)] to-[var(--head-bg)] py-20">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
          <h1 class="text-5xl md:text-7xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Become a Surrogate
          </h1>
          <p class="text-xl md:text-2xl text-[var(--primary-brown)] mb-8 max-w-4xl mx-auto leading-relaxed">
            Learn the surrogacy process step by step—quick eligibility, surrogacy requirements, IVF and embryo transfer timeline, and full support.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              to="/be-surrogate" 
              class="bg-[var(--grayish-green)] text-white px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              Apply to Become a Surrogate
            </NuxtLink>
            <button 
              @click="document.getElementById('eligibility').scrollIntoView({ behavior: 'smooth' })"
              class="border-2 border-[var(--grayish-green)] text-[var(--grayish-green)] px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[var(--grayish-green)] hover:text-white transition-colors"
            >
              Check Eligibility
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Quick Eligibility Section -->
    <section id="eligibility" class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Quick Eligibility: Surrogacy Requirements for U.S. Citizens
          </h2>
          <p class="text-lg text-[var(--primary-brown)] max-w-4xl mx-auto leading-relaxed">
            Thinking about becoming a surrogate? Start with this fast screen. It covers the core surrogacy requirements for gestational surrogacy (the surrogate mother—also called a gestational carrier—has no genetic link to the baby).
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <!-- Who We're Looking For -->
          <div class="bg-[var(--light-cream)] p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
              Who We're Looking For
            </h3>
            <ul class="space-y-4 text-[var(--primary-brown)]">
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>U.S. citizen, living in the U.S.</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Age 18–39 (your IVF clinic sets the final surrogate age limit)</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Have given birth to at least one child with no major complications</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Healthy lifestyle: no smoking, vaping, or substance use</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>BMI within clinic guidelines</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Stable home and support system; reliable transportation for appointments</span>
              </li>
            </ul>
          </div>

          <!-- Health & Lifestyle Basics -->
          <div class="bg-[var(--light-cream)] p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
              Health & Lifestyle Basics
            </h3>
            <ul class="space-y-4 text-[var(--primary-brown)]">
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>No history of severe pregnancy complications</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>No current untreated medical conditions that affect pregnancy</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Up-to-date OB care (Pap, labs) and willing to follow medication protocols</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Comfortable with routine bloodwork, ultrasounds, and the IVF medication schedule</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Open, clear communication with your case manager and the intended parents</span>
              </li>
            </ul>
          </div>

          <!-- Legal & Practical Readiness -->
          <div class="bg-[var(--light-cream)] p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
              Legal & Practical Readiness
            </h3>
            <ul class="space-y-4 text-[var(--primary-brown)]">
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Ready to complete a background check and a psychological evaluation</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Live in a surrogacy-friendly state and can travel for screening and embryo transfer</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Partner (if applicable) understands the process and signs required consents</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Willing to follow the legal contract and match-specific preferences</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- What Might Delay Approval -->
        <div class="bg-red-50 border border-red-200 p-8 rounded-xl mb-12">
          <h3 class="text-2xl font-bold text-red-800 mb-6" style="font-family: var(--font-primary)">
            What Might Delay Approval
          </h3>
          <div class="grid md:grid-cols-2 gap-6">
            <ul class="space-y-3 text-red-700">
              <li class="flex items-start">
                <span class="text-red-500 mr-3 mt-1">⚠</span>
                <span>Too soon since your last delivery (clinic will advise on timing)</span>
              </li>
              <li class="flex items-start">
                <span class="text-red-500 mr-3 mt-1">⚠</span>
                <span>More prior C-sections than the clinic allows</span>
              </li>
            </ul>
            <ul class="space-y-3 text-red-700">
              <li class="flex items-start">
                <span class="text-red-500 mr-3 mt-1">⚠</span>
                <span>Smoking, vaping, or recent substance use</span>
              </li>
              <li class="flex items-start">
                <span class="text-red-500 mr-3 mt-1">⚠</span>
                <span>Uncontrolled medical or mental-health conditions</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Ready to Start -->
        <div class="text-center bg-[var(--grayish-green)] p-8 rounded-xl">
          <h3 class="text-2xl font-bold text-white mb-4" style="font-family: var(--font-primary)">
            Ready to Start?
          </h3>
          <p class="text-white mb-6">
            Take the 1-minute pre-screen to see if you qualify to be a surrogate. If you meet these surrogacy requirements, apply now to become a gestational surrogate and start your journey.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <NuxtLink 
              to="/be-surrogate" 
              class="bg-white text-[var(--grayish-green)] px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-opacity"
            >
              Start Application
            </NuxtLink>
            <button 
              @click="document.getElementById('surrogacy-steps').scrollIntoView({ behavior: 'smooth' })"
              class="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-[var(--grayish-green)] transition-colors"
            >
              Learn the Process
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- The Surrogacy Steps Section -->
    <section id="surrogacy-steps" class="py-20 bg-[var(--head-bg)]">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            The Surrogacy Steps: How to Become a Gestational Carrier
          </h2>
          <p class="text-lg text-[var(--primary-brown)] max-w-4xl mx-auto leading-relaxed">
            Here's the big picture of the surrogacy process. These are the core surrogacy steps for gestational surrogacy. You serve as a gestational carrier and you hold no genetic link to the baby.
          </p>
        </div>

        <!-- Interactive Steps Component -->
        <SurrogateStepsComponent 
          :steps="surrogacySteps" 
          :active-step="activeStep"
          @step-change="setActiveStep"
        />
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Timeline in Gestational Surrogacy
          </h2>
          <p class="text-lg text-[var(--primary-brown)] max-w-4xl mx-auto leading-relaxed">
            Real numbers help you plan the surrogacy process. Here's what most gestational surrogacy timelines look like.
          </p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- How Long the Journey Takes -->
          <div class="bg-[var(--light-cream)] p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-[var(--dark-brown)] mb-4" style="font-family: var(--font-primary)">
              How Long the Journey Takes
            </h3>
            <p class="text-[var(--primary-brown)] mb-4">
              A full cycle usually runs about <strong>12–16 months</strong> from onboarding to post-birth wrap-up. Exact timing depends on matching, embryo readiness, and pregnancy progress.
            </p>
          </div>

          <!-- IVF Prep & Embryo Transfer -->
          <div class="bg-[var(--light-cream)] p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-[var(--dark-brown)] mb-4" style="font-family: var(--font-primary)">
              IVF Prep & Embryo Transfer
            </h3>
            <p class="text-[var(--primary-brown)] mb-4">
              Cycle prep (meds + monitoring) takes about <strong>4–6 weeks</strong> before the embryo transfer. After transfer, clinics check HCG in 10–14 days. Heartbeat ultrasound follows about 4–5 weeks later.
            </p>
          </div>

          <!-- Legal Window & Documents -->
          <div class="bg-[var(--light-cream)] p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-[var(--dark-brown)] mb-4" style="font-family: var(--font-primary)">
              Legal Window & Documents
            </h3>
            <p class="text-[var(--primary-brown)] mb-4">
              Legal contracts typically finish in about <strong>1–1.5 months</strong>. Your attorney finalizes terms and lays the path for the pre-birth order that protects parentage at delivery.
            </p>
          </div>

          <!-- Pregnancy Care Cadence -->
          <div class="bg-[var(--light-cream)] p-6 rounded-xl shadow-lg">
            <h3 class="text-xl font-bold text-[var(--dark-brown)] mb-4" style="font-family: var(--font-primary)">
              Pregnancy Care Cadence
            </h3>
            <p class="text-[var(--primary-brown)] mb-4">
              From 11 weeks, you switch to routine OB care. Your coordinator checks in several times a week and issues a weekly report so everyone stays aligned on appointments and daily life needs.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Compensation & Support Section -->
    <section class="py-20 bg-[var(--head-bg)]">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Compensation & Support for Surrogate Mothers
          </h2>
          <p class="text-lg text-[var(--primary-brown)] max-w-4xl mx-auto leading-relaxed">
            You give so much as a surrogate mother. We protect you with clear money flow, strong insurance, and a hands-on support system—so you can focus on a healthy gestational surrogacy journey.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12 mb-16">
          <!-- How We Protect Your Pay -->
          <div class="bg-white p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
              How We Protect Your Pay
            </h3>
            <p class="text-[var(--primary-brown)] mb-6">
              All disbursements flow through a third-party trust account for transparency and on-time payment. Partners like SeedTrust support thousands of cases across surrogacy-legal states with an audited, online platform and strict compliance.
            </p>
            <p class="text-[var(--primary-brown)]">
              We also work with ART Risk for professional insurance planning and risk management across the U.S. surrogacy ecosystem.
            </p>
          </div>

          <!-- When Funds Are Ready -->
          <div class="bg-white p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
              When Funds Are Ready (Milestones You Can See)
            </h3>
            <ul class="space-y-4 text-[var(--primary-brown)]">
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">•</span>
                <span>After the embryo transfer, clinics check HCG in 10–14 days, then confirm heartbeat by ultrasound at ~4–5 weeks</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">•</span>
                <span>Once heartbeat is confirmed, the parents top up the trust to maintain a minimum balance (≥ $10,000)</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">•</span>
                <span>From 11 weeks, you move to routine OB care; your coordinator keeps everyone aligned with check-ins and documentation</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- What's Covered -->
        <div class="bg-[var(--light-cream)] p-8 rounded-xl mb-12">
          <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            What's Covered (Examples)
          </h3>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <p class="text-[var(--primary-brown)] mb-4">
                Your compensation per contract, plus allowable reimbursements (e.g., travel for appointments), clinic-direct medical costs, insurance premiums, and attorney fees—all paid from the dedicated trust.
              </p>
            </div>
            <div>
              <p class="text-[var(--primary-brown)]">
                We keep the money trail clear and auditable with professional trust administration and legal oversight.
              </p>
            </div>
          </div>
        </div>

        <!-- Your Support Team -->
        <div class="bg-white p-8 rounded-xl shadow-lg">
          <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Your Support Team (Real Touchpoints)
          </h3>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <p class="text-[var(--primary-brown)] mb-4">
                A dedicated project manager plans timelines, flags key dates, and coordinates with the clinic and attorneys. We issue weekly written reports and provide 7×24 bilingual support for anything urgent.
              </p>
            </div>
            <div>
              <p class="text-[var(--primary-brown)]">
                During pregnancy, our team speaks with you multiple times per week to update labs, visits, and daily needs, then compiles a Weekly Report so the intended parents stay fully informed.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why Yunda Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4 max-w-7xl">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Why Yunda for Surrogates: Trust Account, Insurance & Legal Team
          </h2>
          <p class="text-lg text-[var(--primary-brown)] max-w-4xl mx-auto leading-relaxed">
            You deserve a team that has your back. If you want to become a surrogate in a safe, organized way, Yunda makes gestational surrogacy clear, supported, and respectful.
          </p>
        </div>

        <div class="grid lg:grid-cols-2 gap-12">
          <!-- Real Safeguards -->
          <div class="bg-[var(--light-cream)] p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
              Real Safeguards: Trust + Insurance
            </h3>
            <ul class="space-y-4 text-[var(--primary-brown)]">
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Your funds run through SeedTrust—a specialist that serves surrogacy-legal states and supports thousands of cases with a compliant, online platform</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Your risk planning stands on ART Risk—an industry leader with 15+ years in assisted reproduction insurance solutions</span>
              </li>
            </ul>
          </div>

          <!-- Hands-On Support -->
          <div class="bg-[var(--light-cream)] p-8 rounded-xl shadow-lg">
            <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
              Hands-On Support, Every Week
            </h3>
            <ul class="space-y-4 text-[var(--primary-brown)]">
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>You get a dedicated project manager. We plan timelines, flag key dates, and coordinate the whole surrogacy process</span>
              </li>
              <li class="flex items-start">
                <span class="text-[var(--grayish-green)] mr-3 mt-1">✓</span>
                <span>Need help at odd hours? We provide 7×24 bilingual support so you never wait for answers</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Strong Legal Network -->
        <div class="bg-white p-8 rounded-xl shadow-lg mt-12">
          <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Strong Legal Network
          </h3>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <p class="text-[var(--primary-brown)] mb-4">
                Our legal partners stay active at the highest levels of the field. For example, counsel who serves as ASRM 辅助生殖法律组副主席 brings deep, current expertise to protect your journey.
              </p>
            </div>
            <div>
              <p class="text-[var(--primary-brown)]">
                This advocacy connects to real policy work (e.g., IVF rights efforts), which helps keep the path clear for surrogate mother protections.
              </p>
            </div>
          </div>
        </div>

        <!-- Clear Steps, Predictable Timeline -->
        <div class="bg-[var(--light-cream)] p-8 rounded-xl shadow-lg mt-12">
          <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Clear Steps, Predictable Timeline
          </h3>
          <div class="grid md:grid-cols-3 gap-8">
            <div>
              <p class="text-[var(--primary-brown)]">
                Most journeys take <strong>12–16 months</strong> from onboarding to wrap-up, depending on matching and embryo readiness.
              </p>
            </div>
            <div>
              <p class="text-[var(--primary-brown)]">
                Milestones stay transparent: HCG at 10–14 days post-transfer, heartbeat at ~4–5 weeks, then routine OB care and steady check-ins.
              </p>
            </div>
            <div>
              <p class="text-[var(--primary-brown)]">
                Legal flows from signed contracts through to pre-birth order, so the baby goes to the intended parents at delivery.
              </p>
            </div>
          </div>
        </div>

        <!-- Top-Tier Coordination -->
        <div class="bg-white p-8 rounded-xl shadow-lg mt-12">
          <h3 class="text-2xl font-bold text-[var(--dark-brown)] mb-6" style="font-family: var(--font-primary)">
            Top-Tier Coordination
          </h3>
          <div class="grid md:grid-cols-2 gap-8">
            <div>
              <p class="text-[var(--primary-brown)] mb-4">
                We work smoothly with leading IVF specialists and keep every handoff tight—from screening to embryo transfer to birth.
              </p>
            </div>
            <div>
              <p class="text-[var(--primary-brown)]">
                You focus on a healthy pregnancy. We handle the calls, the paperwork, and the schedule.
              </p>
            </div>
          </div>
        </div>

        <!-- Final CTA -->
        <div class="text-center mt-16">
          <div class="bg-[var(--grayish-green)] p-12 rounded-xl">
            <h3 class="text-3xl font-bold text-white mb-6" style="font-family: var(--font-primary)">
              Ready to take the first step to be a surrogate?
            </h3>
            <p class="text-white mb-8 text-lg">
              Start your application and see if gestational surrogacy fits your life.
            </p>
            <NuxtLink 
              to="/be-surrogate" 
              class="bg-white text-[var(--grayish-green)] px-12 py-4 rounded-lg text-xl font-semibold hover:opacity-90 transition-opacity shadow-lg"
            >
              Start Your Application
            </NuxtLink>
          </div>
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

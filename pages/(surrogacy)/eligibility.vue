<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { buildCoreServicePageSchemas } from '~/utils/schema'

const { locale } = useI18n()
const localePath = useLocalePath()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const translations = {
  en: {
    seoTitle: 'Surrogate Requirements: Do You Qualify? | Yunda Surrogacy',
    seoDescription:
      'See if you qualify to become a surrogate in California. Review key requirements, disqualifiers, and next steps with clear, private guidance.',
    heroTitle: 'Surrogate Requirements: Do You Qualify?',
    heroSubtitle:
      'Review the basic requirements to become a surrogate, including age, health, pregnancy history, and lifestyle factors, with guidance that is clear and respectful.',
    primaryCta: 'View Requirements',
    secondaryCta: 'Surrogate Application',
    heroImageAlt: 'Surrogate eligibility and application overview',
    features: [
      'A straightforward explanation of qualifications and disqualifiers',
      'Careful review of health, support system, and pregnancy history',
      'Compassionate guidance, whether you qualify now or are still exploring',
    ],
    onPageTitle: 'On this page, you’ll learn:',
    onPageItems: [
      'the core requirements to become a surrogate',
      'common reasons applicants may not qualify right now',
      'how age and pregnancy history are usually reviewed',
      'when it makes sense to take the next step',
    ],
    conclusionLabel: 'Conclusion',
    conclusionBody1:
      'If you’re thinking, “I want to be a surrogate,” you deserve a clear, respectful path forward. The process starts with a simple surrogate application, followed by pre-qualification, consultation, and screening—so your health, insurance, and support system are protected before you’re matched.',
    conclusionBody2:
      'Along the way, we explain the requirements to be a surrogate, common disqualifying factors, and practical questions like age limits and how many times you can be a surrogate. If you’re ready, the next step is simple: apply to be a surrogate and let our team guide you through the process with steady support.',
    h21Title: 'I Want to Be a Surrogate-How Do I Become a Surrogate Mother?',
    h21Lead:
      'If you’re thinking, “I want to be a surrogate,” you’re not alone. The good news is the path is clear.',
    h21Body:
      'First, you apply to be a surrogate by completing a surrogate application with your basic health and pregnancy history. Next is a quick pre-qualification to confirm you meet the main requirements to be a surrogate. Then you’ll have a short consult to talk through your questions, schedule, and support system. After that, you move into screening-medical, insurance, and emotional readiness-so you’re protected before anything begins. Once you’re cleared, we match you with intended parents based on comfort and expectations, then you enter the clinic and legal process.',
    h21LinksPrefix: 'You can review',
    h21LinksMiddle1: ',',
    h21LinksMiddle2: ',',
    h21LinksMiddle3: ', and',
    h21LinksSuffix: 'to prepare each step in advance.',
    h21LinkApply: 'apply to be a surrogate',
    h21LinkRequirements: 'requirements to be a surrogate',
    h21LinkScreening: 'screening',
    h21LinkJourney: 'clinic and legal process',
    h21FlowCaption: 'Process at a glance',
    h21FlowSteps: ['Apply', 'Pre-Qualify', 'Consult', 'Screening', 'Match', 'Start the Journey'],
    h22Title: 'Surrogate Application: How to Apply to Be a Surrogate Mother (Step-by-Step)',
    h22Steps: [
      {
        title: 'Step 1 — Initial surrogate application (about 10 minutes)',
        body: 'To apply to be a surrogate mother, start with the surrogate application. This first step is quick and focused-basic contact info, where you live, your pregnancy history, and a few health and lifestyle questions. It’s the fastest way to see if you may be a fit before you spend extra time.',
      },
      {
        title: 'Step 2 — Secure follow-up and portal tasks',
        body: 'After your surrogate mother application, we’ll send secure next steps. This may include uploading records, confirming medications, and answering a few follow-up questions. These portal tasks help us review eligibility and guide you through the process to become a surrogate mother with fewer delays.',
      },
      {
        title: 'Step 3 — Consultation (your questions + your timeline)',
        body: 'Next, you’ll have a consultation to talk through the journey, your support system, and what you can expect. We’ll review your goals, explain screening and matching, and make sure you feel comfortable before moving forward. This step keeps the process clear, respectful, and steady.',
      },
    ],
    h22LinksPrefix: 'Related pages:',
    h22LinkApply: 'Apply now',
    h22LinksMiddle1: ',',
    h22LinkScreening: 'Screening guide',
    h22LinksMiddle2: ', and',
    h22LinkJourney: 'surrogacy process overview',
    h22LinksSuffix: '.',
    h23Title: 'Surrogate Requirements & Qualifications: What Are the Requirements to Be a Surrogate?',
    h23ReqTitle: 'Surrogate requirements',
    h23ReqLead:
      'To support a healthy and secure journey, our surrogate requirements start with a few minimum standards. If you’re asking what are the requirements to be a surrogate mother, here are the basics:',
    h23ReqItems: [
      'Be 21 to 40 years old',
      'Have had at least one full-term, uncomplicated vaginal birth',
      'Live in a stable home with reliable support',
      'Be a U.S. citizen or permanent resident (Green Card holder)',
      'Live a healthy lifestyle, including being a non-smoker',
      'Have no criminal background or child abuse history',
    ],
    h23ReqOutro:
      'These requirements to be a surrogate help protect you, the baby, and the intended parents from the very beginning.',
    h23ImageAlt1: 'Surrogate candidate requirements review',
    h23ImageAlt2: 'Positive pregnancy test results during a surrogate journey',
    h24Title: 'What Disqualifies You From Being a Surrogate?',
    h24CommonTitle: 'Common disqualifying factors',
    h24CommonLead:
      'If you’re asking what disqualifies you from being a surrogate, these are some common reasons someone may not qualify right now:',
    h24CommonItems: [
      'Have never given birth',
      'Had serious complications in previous pregnancies',
      'Have a BMI above the acceptable limit (usually 33)',
      'Are currently on antidepressants or have ongoing mental health issues',
      'Do not have financial stability or family support',
      'Reside in a state that restricts surrogacy (our team can help verify)',
    ],
    h24ImageAlt1: 'Hatching embryo viewed under a fertility laboratory microscope',
    h24ImageAlt2: 'Ultrasound imaging during a surrogate journey',
    h25Title: 'Surrogate Age & Eligibility FAQ',
    h25FaqItems: [
      {
        q: '1) What is the surrogate age limit?',
        a: 'Most programs use a set age range because pregnancy risk changes over time. Your clinic will confirm eligibility based on age, health, and prior pregnancy history.',
      },
      {
        q: '2) How old do you have to be a surrogate?',
        a: 'Many programs require you to be at least in your early 20s and within a healthy childbearing range. At Yunda, the basic guideline is 21 to 40.',
      },
      {
        q: '3) Is 40 a hard age limit to be a surrogate?',
        a: 'Not always. Some cases may be considered, but it depends on medical history, recent pregnancy outcomes, and clinic clearance. The clinic makes the final decision.',
      },
      {
        q: '4) Can I apply if I’m under 21?',
        a: 'Usually no. Age minimums exist to protect your health and support safer pregnancy outcomes.',
      },
      {
        q: '5) How many times can you be a surrogate?',
        a: 'There’s no single universal number. It depends on your overall pregnancy history, recovery, and the clinic’s medical assessment for another journey.',
      },
      {
        q: '6) If I’ve had a C-section, can I still be a surrogate?',
        a: 'Sometimes yes. Clinics look at how many C-sections you’ve had, how you healed, and whether your prior pregnancies were otherwise uncomplicated.',
      },
      {
        q: '7) What if I had complications in a past pregnancy?',
        a: 'Serious prior complications can affect eligibility, because safety comes first. A records review helps the clinic decide what’s medically reasonable.',
      },
      {
        q: '8) Does BMI affect eligibility?',
        a: 'Yes. Many programs have a BMI cutoff because it can increase pregnancy risk. If you’re close to the limit, a consult can clarify what’s possible.',
      },
      {
        q: '9) How long should it be since my last pregnancy?',
        a: 'Clinics usually want enough recovery time before starting a new journey. The exact timing depends on your delivery and postpartum health.',
      },
      {
        q: '10) What if I live in a state that restricts surrogacy?',
        a: 'Some states have legal or practical barriers. Our team can help verify your state and explain your options before you apply.',
      },
    ],
  },
  zh: {
    seoTitle: '代孕妈妈资格要求：你符合条件吗？ | Yunda',
    seoDescription:
      '看看你是否符合在加州成为代孕妈妈的资格。查看关键要求、不符合因素和下一步，获得清晰、私密的指导。',
    heroTitle: '代母资格要求：你符合条件吗？',
    heroSubtitle:
      '查看成为代母的基础要求，包括年龄、健康、孕产史与生活方式因素，并获得清晰且尊重的指引。',
    primaryCta: '查看资格要求',
    secondaryCta: 'Surrogate Application',
    heroImageAlt: '代母资格与申请流程概览',
    features: [
      '清晰解释符合与暂不符合的常见条件',
      '细致评估健康状况、支持系统与孕产史',
      '无论是否当前符合，都提供有温度的建议',
    ],
    onPageTitle: '本页你将了解：',
    onPageItems: [
      '成为代母的核心要求',
      '常见暂不符合原因',
      '年龄与孕产史通常如何评估',
      '何时适合进入下一步',
    ],
    conclusionBody1:
      '如果你正在想：“我想成为代母”，你值得拥有一条清晰、被尊重的前进路径。流程从一份简洁的代母申请开始，随后是预评估、咨询与筛查——在匹配之前先把你的健康、保险与支持系统保护好。',
    conclusionBody2:
      '在过程中，我们会解释成为代母的资格要求、常见暂不符合因素，以及年龄限制、最多可以做几次代母等实际问题。如果你已经准备好，下一步很简单：提交申请，让我们的团队以稳定、周到的支持带你一步步完成流程。',
    h21Title: '我想成为代母-我该如何成为代孕妈妈？',
    h21Lead:
      '如果你正在想“我想成为代母”，你并不孤单。好消息是，这条路径非常清晰。',
    h21Body:
      '第一步是提交代母申请，填写基础健康与既往妊娠信息。接着会进行快速预评估，确认你是否符合主要资格要求。然后安排简短咨询，沟通你的问题、时间安排和支持系统。之后进入筛查阶段，包括医学、保险与心理准备评估，确保在任何流程开始前你已被充分保护。通过后，我们会基于双方舒适度与预期进行匹配，再进入诊所和法律流程。',
    h21LinksPrefix: '你也可以先查看',
    h21LinksMiddle1: '、',
    h21LinksMiddle2: '、',
    h21LinksMiddle3: '以及',
    h21LinksSuffix: '，提前了解每一步。',
    h21LinkApply: '申请成为代母',
    h21LinkRequirements: '代母资格要求',
    h21LinkScreening: '筛查',
    h21LinkJourney: '诊所和法律流程',
    h21FlowCaption: '流程一览',
    h21FlowSteps: ['申请', '预评估', '咨询', '筛查', '匹配', '开启旅程'],
    h22Title: '代母申请：如何分步骤申请成为代孕妈妈',
    h22Steps: [
      {
        title: 'Step 1 — 初始申请（约 10 分钟）',
        body: '想申请成为代孕妈妈，先从代母申请开始。第一步很快、重点清晰：基础联系方式、居住地、既往妊娠经历，以及少量健康与生活方式问题。这是你在投入更多时间前，最快判断是否匹配的方式。',
      },
      {
        title: 'Step 2 — 安全补充与门户任务',
        body: '提交申请后，我们会发送后续的安全步骤。通常包括上传记录、确认用药信息，以及补充少量问题。这些门户任务有助于我们更高效地审核资格，并减少你在成为代母流程中的等待时间。',
      },
      {
        title: 'Step 3 — 咨询沟通（你的问题 + 你的时间线）',
        body: '接下来会安排咨询，沟通旅程节奏、你的支持系统，以及你将会经历什么。我们会一起确认你的目标，说明筛查与匹配逻辑，并在你进入下一步前确保你感到舒适和安心。这一步让流程保持清晰、尊重且稳定。',
      },
    ],
    h22LinksPrefix: '相关页面：',
    h22LinkApply: '立即申请',
    h22LinksMiddle1: '、',
    h22LinkScreening: '筛查指南',
    h22LinksMiddle2: '以及',
    h22LinkJourney: '代孕流程总览',
    h22LinksSuffix: '。',
    h23Title: '代母要求与资格：成为代母需要满足什么条件？',
    h23ReqTitle: '代母基础要求',
    h23ReqLead:
      '为保障旅程健康且安全，我们会先看几项最低标准。如果你在问“成为代母需要什么条件”，这里是核心基础：',
    h23ReqItems: [
      '年龄在 21-40 岁',
      '至少有一次足月且无重大并发症的阴道分娩经历',
      '拥有稳定家庭环境与可靠支持系统',
      '为美国公民或永久居民（绿卡持有者）',
      '生活方式健康，包括不吸烟',
      '无犯罪记录或儿童虐待相关历史',
    ],
    h23ReqOutro:
      '这些代母要求从一开始就用于保护你、宝宝以及意向父母。',
    h23ImageAlt1: '代母申请条件评估',
    h23ImageAlt2: '代孕旅程中确认妊娠的验孕结果',
    h24Title: '什么情况会让你暂时不符合代母资格？',
    h24CommonTitle: '常见暂不符合因素',
    h24CommonLead:
      '如果你在问“哪些情况会影响成为代母”，以下是目前较常见的暂不符合原因：',
    h24CommonItems: [
      '从未有过分娩经历',
      '既往妊娠中出现过严重并发症',
      'BMI 超过可接受范围（通常为 33）',
      '当前正在使用抗抑郁药物或存在持续心理健康问题',
      '缺乏基本经济稳定性或家庭支持',
      '居住在限制代孕的州（我们的团队可协助核实）',
    ],
    h24ImageAlt1: '生殖实验室显微镜下正在孵化的胚胎',
    h24ImageAlt2: '代孕旅程中的超声检查影像',
    h25Title: '代母年龄与资格常见问题',
    h25FaqItems: [
      {
        q: '1）代母年龄限制是多少？',
        a: '多数项目会设置年龄范围，因为妊娠风险会随时间变化。最终是否符合资格，仍由诊所结合年龄、健康状况与既往妊娠史确认。',
      },
      {
        q: '2）要到多少岁才能做代母？',
        a: '很多项目要求申请者至少在 20 岁出头，并处于相对健康的生育年龄范围。在 Yunda，基础参考是 21-40 岁。',
      },
      {
        q: '3）40 岁是绝对上限吗？',
        a: '不一定。部分个案可能会被评估，但取决于病史、近期妊娠结局以及诊所是否清关。最终决定由诊所作出。',
      },
      {
        q: '4）未满 21 岁可以申请吗？',
        a: '通常不可以。最低年龄门槛是为了更好保护你的健康，并支持更安全的妊娠结局。',
      },
      {
        q: '5）一个人最多可以做几次代母？',
        a: '没有统一的固定次数。需要根据你的整体妊娠史、恢复情况以及诊所对再次旅程的医学评估来判断。',
      },
      {
        q: '6）如果我有剖宫产经历，还能做代母吗？',
        a: '有些情况下可以。诊所会重点评估剖宫产次数、恢复情况，以及既往妊娠是否总体平稳。',
      },
      {
        q: '7）如果过去妊娠有并发症怎么办？',
        a: '严重既往并发症可能影响资格，因为安全始终是第一位。通过病历审核，诊所会判断医学上是否适合继续。',
      },
      {
        q: '8）BMI 会影响资格吗？',
        a: '会。很多项目有 BMI 上限，因为偏高可能增加妊娠风险。如果你接近上限，建议先咨询以明确可行性。',
      },
      {
        q: '9）距离上次妊娠多久更合适？',
        a: '诊所通常希望有足够恢复时间后再开始新旅程。具体间隔需要结合你的分娩方式与产后恢复状况。',
      },
      {
        q: '10）如果我住在限制代孕的州怎么办？',
        a: '部分州在法律或实操上存在限制。我们的团队可以先帮你核实所在州，并在申请前说明可行选项。',
      },
    ],
  },
}

const c = computed(() => ((locale.value || '').startsWith('zh') ? translations.zh : translations.en))
const pagePath = '/eligibility'
const stripStepPrefix = (value: string) => value.replace(/^Step\s+\d+\s*[-–—]\s*/i, '').trim()
const schemaEligibilityItems = computed(() => [
  ...c.value.h22Steps.map((step, index) => ({
    position: index + 1,
    name: stripStepPrefix(step.title),
    description: step.body,
    url: pagePath,
  })),
  ...c.value.h23ReqItems.map((item, index) => ({
    position: c.value.h22Steps.length + index + 1,
    name: item,
    url: pagePath,
  })),
])
const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: c.value.heroTitle,
  description: c.value.seoDescription,
  about: 'Gestational carrier eligibility and surrogate requirements',
  audience: 'Potential gestational carriers / surrogate applicants',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  service: {
    name: 'Gestational Carrier Eligibility Review',
    serviceType: 'Gestational carrier eligibility review and application guidance',
    areaServed: ['California', 'United States'],
    audience: 'Potential gestational carriers / surrogate applicants',
    description: 'Eligibility guidance for potential gestational carriers, including age, health, pregnancy history, lifestyle factors, support system, residency status, and common disqualifying factors.',
  },
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'For Surrogates', url: '/surrogates' },
    { name: 'Detailed Surrogate Guides', url: '/surrogates' },
    { name: 'Quick Eligibility Check', url: pagePath },
  ],
  faqs: c.value.h25FaqItems.map(item => ({
    question: item.q,
    answer: item.a,
  })),
  itemList: {
    name: 'Surrogate Application Steps and Eligibility Checklist',
    description: c.value.h22Title,
    items: schemaEligibilityItems.value,
  },
}))

useHead(() => ({
  title: c.value.seoTitle,
  meta: [
    {
      name: 'description',
      content: c.value.seoDescription,
    },
  ],
}))

useHead(() => ({
  script: coreServicePageSchemas.value.map((schema, index) => ({
    key: `schema-eligibility-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div>
    <AppHeader />
    <BreadcrumbNav
      :items="[
        { to: '/surrogates', label: locale === 'zh' ? '代孕妈妈' : 'For Surrogates' },
        { to: '/surrogates', label: locale === 'zh' ? '代孕妈妈补充指南' : 'Detailed Surrogate Guides' },
        { label: locale === 'zh' ? '快速资格自查' : 'Quick Eligibility Check' },
      ]"
    />
    <main>
      <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b pb-10 pt-24 lg:pt-28">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/35 rounded-[24px] bg-[var(--yunda-petal)] shadow-[0_12px_26px_rgba(39,31,24,0.07)]">
            <div class="grid items-center gap-10 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-14">
              <div class="max-w-[780px]">
                <h1 class="font-display text-[38px] text-[var(--yunda-bark)] font-semibold leading-[1.1] lg:text-[50px]">
                  {{ c.heroTitle }}
                </h1>
                <p class="mt-6 font-sans text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ c.heroSubtitle }}
                </p>
                <div class="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#surrogate-requirements"
                    class="inline-flex w-full border border-transparent sm:w-[360px] min-h-[68px] items-center justify-center rounded-[12px] bg-[var(--yunda-bark)] px-8 py-5 text-4 text-[var(--yunda-petal)] font-extrabold tracking-[0.02em] shadow-[0_6px_14px_rgba(169,108,66,0.2)] transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                 >
                    {{ c.primaryCta }}
                  </a>
                  <NuxtLink
                    :to="localePath('/be-surrogate')"
                    class="inline-flex w-full border border-[var(--primary-brown)]/45 sm:w-[360px] min-h-[68px] items-center justify-center gap-2 rounded-[12px] bg-white/88 px-8 py-5 text-4 text-[var(--primary-brown)] font-extrabold tracking-[0.02em] shadow-[0_6px_14px_rgba(39,31,24,0.06)] transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                 >
                    <span>{{ c.secondaryCta }}</span>
                    <Icon name="radix-icons:arrow-right" class="h-4.5 w-4.5" />
                  </NuxtLink>
                </div>
                <div class="mt-6 border border-[var(--primary-brown)]/18 rounded-[16px] bg-white/82 p-4">
                  <p class="font-sans text-lg text-[var(--yunda-bark)] font-bold lg:text-xl" style="font-family: var(--font-text)">
                    {{ c.onPageTitle }}
                  </p>
                  <ul class="mt-2 grid gap-1.5">
                    <li
                      v-for="(item, index) in c.onPageItems"
                      :key="`eligibility-onpage-${index}`"
                      class="flex items-start gap-2.5 text-3.4 text-[var(--yunda-bark)]/84 leading-relaxed lg:text-4"
                      style="font-family: var(--font-text)"
                   >
                      <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary-brown)]/75" />
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div class="flex items-center justify-center lg:justify-end">
                <div class="max-w-[520px] w-full overflow-hidden border border-white/65 rounded-[20px] bg-white/85 shadow-[0_14px_34px_rgba(64,84,120,0.08)] lg:max-w-[640px]">
                  <img
                    src="/images/pages/eligibility/hero.png"
                    :alt="c.heroImageAlt"
                    width="640"
                    height="420"
                    class="h-[380px] w-full object-cover lg:h-[420px]"
                    loading="eager"
                    decoding="async"
                 >
                </div>
              </div>
            </div>

            <div class="border-t border-[var(--primary-brown)] bg-[var(--yunda-petal)] px-6 py-4 lg:px-12">
              <div class="flex flex-wrap items-center justify-start gap-6 text-3 text-[var(--yunda-bark)] opacity-80 md:text-3.5" style="font-family: var(--font-text)">
                <div class="flex items-center gap-2">
                  <Icon name="radix-icons:check-circled" class="h-4 w-4 text-[var(--primary-brown)]" />
                  <span>{{ c.features[0] }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="radix-icons:check-circled" class="h-4 w-4 text-[var(--primary-brown)]" />
                  <span>{{ c.features[1] }}</span>
                </div>
                <div class="flex items-center gap-2">
                  <Icon name="radix-icons:check-circled" class="h-4 w-4 text-[var(--primary-brown)]" />
                  <span>{{ c.features[2] }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full bg-[var(--yunda-petal)] pb-18 lg:pb-22">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/20 rounded-[18px] bg-white/92 px-6 py-8 shadow-[0_16px_34px_rgba(39,31,24,0.06)] lg:px-10 lg:py-10">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
              {{ c.h21Title }}
            </h2>
            <p class="mt-4 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.5" style="font-family: var(--font-text)">
              {{ c.h21Lead }}
            </p>
            <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.5" style="font-family: var(--font-text)">
              {{ c.h21Body }}
            </p>
            <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/78 leading-relaxed lg:text-4.3" style="font-family: var(--font-text)">
              {{ c.h21LinksPrefix }}
              <NuxtLink :to="localePath('/become-a-surrogate')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                {{ c.h21LinkApply }}
              </NuxtLink>
              <span class="mx-1">{{ c.h21LinksMiddle1 }}</span>
              <NuxtLink :to="localePath('/eligibility')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                {{ c.h21LinkRequirements }}
              </NuxtLink>
              <span class="mx-1">{{ c.h21LinksMiddle2 }}</span>
              <NuxtLink :to="localePath('/screening')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                {{ c.h21LinkScreening }}
              </NuxtLink>
              <span class="mx-1">{{ c.h21LinksMiddle3 }}</span>
              <NuxtLink :to="localePath('/surrogacy-process')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                {{ c.h21LinkJourney }}
              </NuxtLink>
              <span>{{ c.h21LinksSuffix }}</span>
            </p>

            <div class="mt-7 border border-[var(--primary-brown)]/20 rounded-[14px] from-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-r p-4 lg:p-5">
              <p class="text-3.2 text-[var(--yunda-bark)]/78 font-semibold tracking-[0.02em] uppercase lg:text-3.5" style="font-family: var(--font-text)">
                {{ c.h21FlowCaption }}
              </p>
              <div class="mt-3 overflow-x-auto pb-1">
                <div class="min-w-max inline-flex items-center">
                  <template v-for="(step, index) in c.h21FlowSteps" :key="`h21-flow-step-${index}`">
                    <span class="inline-flex items-center border border-[var(--primary-brown)]/24 rounded-full bg-white/90 px-4 py-1.8 text-3.2 text-[var(--yunda-bark)] font-semibold leading-none lg:px-5 lg:py-2 lg:text-3.7" style="font-family: var(--font-text)">
                      {{ step }}
                    </span>
                    <Icon
                      v-if="index < c.h21FlowSteps.length - 1"
                      name="radix-icons:arrow-right"
                      class="mx-2 h-4 w-4 shrink-0 text-[var(--primary-brown)]/85"
                    />
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b pb-20 lg:pb-24">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[18px] bg-white/94 px-6 py-8 shadow-[0_16px_34px_rgba(39,31,24,0.06)] lg:px-10 lg:py-10">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
              {{ c.h22Title }}
            </h2>

            <div class="grid mt-6 gap-4 lg:grid-cols-3">
              <article
                v-for="(step, index) in c.h22Steps"
                :key="`h22-step-${index}`"
                class="border border-[var(--primary-brown)]/20 rounded-[14px] bg-[var(--yunda-petal)]/80 px-4 py-4 shadow-[0_8px_18px_rgba(39,31,24,0.04)] lg:px-5 lg:py-5"
             >
                <div class="flex items-start gap-3">
                  <span class="mt-0.2 h-7 w-7 inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--yunda-bark)] text-3 text-[var(--yunda-petal)] font-semibold">
                    {{ index + 1 }}
                  </span>
                  <div>
                    <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug lg:text-[24px]" style="font-family: var(--font-text)">
                      {{ step.title }}
                    </h3>
                    <p class="mt-2 text-3.3 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-3.9" style="font-family: var(--font-text)">
                      {{ step.body }}
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <p class="mt-5 text-3.5 text-[var(--yunda-bark)]/78 leading-relaxed lg:text-4.3" style="font-family: var(--font-text)">
              {{ c.h22LinksPrefix }}
              <NuxtLink :to="localePath('/become-a-surrogate')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                {{ c.h22LinkApply }}
              </NuxtLink>
              <span class="mx-1">{{ c.h22LinksMiddle1 }}</span>
              <NuxtLink :to="localePath('/screening')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                {{ c.h22LinkScreening }}
              </NuxtLink>
              <span class="mx-1">{{ c.h22LinksMiddle2 }}</span>
              <NuxtLink :to="localePath('/surrogacy-process')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                {{ c.h22LinkJourney }}
              </NuxtLink>
              <span>{{ c.h22LinksSuffix }}</span>
            </p>
          </div>
        </div>
      </section>

      <section class="w-full bg-[var(--yunda-petal)] pb-18 lg:pb-22">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[18px] bg-white/94 px-6 py-8 shadow-[0_16px_34px_rgba(39,31,24,0.06)] lg:px-10 lg:py-10">
            <h2 id="surrogate-requirements" class="scroll-mt-28 font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
              {{ c.h23Title }}
            </h2>

            <div class="grid mt-6 gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <div class="grid gap-4">
                <article class="border border-[var(--primary-brown)]/20 rounded-[14px] bg-[var(--yunda-petal)]/78 px-5 py-5">
                  <h3 class="text-4.8 text-[var(--yunda-bark)] font-semibold font-bold leading-tight lg:text-[24px]" style="font-family: var(--font-text)">
                    {{ c.h23ReqTitle }}
                  </h3>
                  <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                    {{ c.h23ReqLead }}
                  </p>
                  <ul class="grid mt-4 gap-2.5">
                    <li
                      v-for="(item, index) in c.h23ReqItems"
                      :key="`h23-req-item-${index}`"
                      class="flex items-start gap-2.5 border border-[var(--primary-brown)]/16 rounded-[10px] bg-white/86 px-3.5 py-2.5"
                   >
                      <Icon name="radix-icons:check-circled" class="mt-0.3 h-4 w-4 shrink-0 text-[var(--primary-brown)]" />
                      <span class="text-3.4 text-[var(--yunda-bark)]/84 leading-relaxed lg:text-3.8" style="font-family: var(--font-text)">
                        {{ item }}
                      </span>
                    </li>
                  </ul>
                  <p class="mt-4 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.3" style="font-family: var(--font-text)">
                    {{ c.h23ReqOutro }}
                  </p>
                </article>
              </div>

              <div class="grid content-start gap-4 lg:pl-2">
                <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[14px] bg-white/90 p-3 shadow-[0_10px_22px_rgba(39,31,24,0.05)]">
                  <img
                    src="/images/pages/eligibility/qualification-01.png"
                    :alt="c.h23ImageAlt1"
                    class="h-[240px] w-full rounded-[10px] object-cover lg:h-[260px]"
                    loading="lazy"
                    decoding="async"
                 >
                </div>
                <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[14px] bg-white/90 p-3 shadow-[0_10px_22px_rgba(39,31,24,0.05)]">
                  <img
                    src="/images/pages/eligibility/pregnancy-test.jpg"
                    :alt="c.h23ImageAlt2"
                    class="h-[240px] w-full rounded-[10px] object-cover lg:h-[260px]"
                    loading="lazy"
                    decoding="async"
                 >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b pb-24 lg:pb-28">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[18px] bg-white/94 px-6 py-8 shadow-[0_16px_34px_rgba(39,31,24,0.06)] lg:px-10 lg:py-10">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
              {{ c.h24Title }}
            </h2>

            <div class="grid mt-6 gap-6 lg:grid-cols-[1.08fr_0.92fr]">
              <article class="border border-[var(--primary-brown)]/20 rounded-[14px] bg-[var(--yunda-petal)]/78 px-5 py-5">
                <h3 class="text-4.8 text-[var(--yunda-bark)] font-semibold font-bold leading-tight lg:text-[24px]" style="font-family: var(--font-text)">
                  {{ c.h24CommonTitle }}
                </h3>
                <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                  {{ c.h24CommonLead }}
                </p>
                <ul class="grid mt-4 gap-2.5">
                  <li
                    v-for="(item, index) in c.h24CommonItems"
                    :key="`h24-common-item-${index}`"
                    class="flex items-start gap-2.5 border border-[var(--primary-brown)]/16 rounded-[10px] bg-white/86 px-3.5 py-2.5"
                 >
                    <Icon name="radix-icons:cross-circled" class="mt-0.3 h-4 w-4 shrink-0 text-[var(--primary-brown)]" />
                    <span class="text-3.4 text-[var(--yunda-bark)]/84 leading-relaxed lg:text-3.8" style="font-family: var(--font-text)">
                      {{ item }}
                    </span>
                  </li>
                </ul>
              </article>

              <div class="grid content-start gap-4 lg:pl-2">
                <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[14px] bg-white/90 p-3 shadow-[0_10px_22px_rgba(39,31,24,0.05)]">
                  <picture>
                    <source srcset="/images/pages/eligibility/hatching-embryo.avif" type="image/avif">
                    <img
                      src="/images/pages/eligibility/hatching-embryo.jpg"
                      :alt="c.h24ImageAlt1"
                      width="1280"
                      height="917"
                      class="h-[240px] w-full rounded-[10px] object-cover lg:h-[260px]"
                      loading="lazy"
                      decoding="async"
                    >
                  </picture>
                </div>
                <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[14px] bg-white/90 p-3 shadow-[0_10px_22px_rgba(39,31,24,0.05)]">
                  <img
                    src="/images/pages/eligibility/ultrasound.jpg"
                    :alt="c.h24ImageAlt2"
                    class="h-[240px] w-full rounded-[10px] object-cover lg:h-[260px]"
                    loading="lazy"
                    decoding="async"
                 >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full bg-[var(--yunda-petal)] pb-24 lg:pb-30">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[18px] bg-white/94 px-6 py-8 shadow-[0_16px_34px_rgba(39,31,24,0.06)] lg:px-10 lg:py-10">
            <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
              {{ c.h25Title }}
            </h2>

            <div class="grid mt-6 gap-3 lg:grid-cols-2">
              <article
                v-for="(item, index) in c.h25FaqItems"
                :key="`h25-faq-item-${index}`"
                class="border border-[var(--yunda-bark)]/45 rounded-[12px] bg-[var(--yunda-petal)]/78 px-4 py-4 shadow-[0_8px_18px_rgba(39,31,24,0.04)]"
             >
                <div class="flex items-start gap-3">
                  <span class="mt-0.5 h-7 w-7 inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--yunda-bark)] text-3 text-[var(--yunda-petal)] font-semibold">
                    {{ index + 1 }}
                  </span>
                  <div>
                    <h3 class="text-4 text-[var(--yunda-bark)] font-semibold font-bold leading-snug lg:text-[20px]" style="font-family: var(--font-text)">
                      {{ item.q }}
                    </h3>
                    <p class="mt-2 text-3.3 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-3.8" style="font-family: var(--font-text)">
                      {{ item.a }}
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

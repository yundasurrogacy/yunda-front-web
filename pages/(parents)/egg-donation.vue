<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import { buildCoreServicePageSchemas } from '~/utils/schema'

const localePath = useLocalePath()
const { locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))

const translations = {
  en: {
    seoTitle: 'Egg Donor Surrogacy: Find Your Egg Donor for Surrogacy With Donor Eggs | Yunda',
    seoDescription:
      'Egg donor surrogacy in the U.S.: donor screening, IVF embryo creation, PGT-A options, timeline, international logistics, and cost overview.',
    heroTitle: 'Egg Donor Surrogacy: Find Your Egg Donor for Surrogacy With Donor Eggs',
    heroLead:
      'Choosing egg donor surrogacy is a meaningful decision. It’s also a practical one: you want clear answers, steady timing, and a plan you can trust.',
    heroBody:
      'We support surrogacy with egg donation from donor screening and selection through IVF and embryo creation. If you’re considering PGT-A, weighing fresh vs frozen donor eggs, or planning as an international intended parent, we help you understand the options without pressure. We also provide a simple cost overview and guide you to a deeper cost page when you’re ready.',
    ctaPrimary: 'Learn More',
    ctaSecondary: 'Talk to a coordinator',
    heroImgAlt: 'Intended parents exploring egg donor surrogacy options together',
    s2Title: 'Surrogacy With Donor Eggs: When Do You Need an Egg Donor?',
    s2Body1:
      'You may need surrogacy with donor egg when using your own eggs isn’t possible, or doesn’t feel like the best path. This can be due to age-related fertility changes, low ovarian reserve, poor egg quality, repeated IVF failure, or certain genetic concerns. Some intended parents also choose donor eggs to reduce medical uncertainty and keep the timeline steadier.',
    s2Body2:
      'If you’re unsure, we look at your history, your clinic’s advice, and your goals. Then we help you decide whether donor eggs are needed now, or if another option makes more sense.',
    s2Checklist: [
      'Clinic-led guidance on donor vs own eggs',
      'Steadier timelines and clear next steps',
      'Support for genetics, PGT-A, and travel',
    ],
    s2CardTitle: 'Egg Donation Surrogacy 101',
    s2CardSub: 'Quick readiness checklist',
    s3Title: 'Our Streamlined Egg Donor + IVF Process (From Donor Match to Embryo Creation)',
    s3Steps: [
      {
        title: 'Step 1 — Donor Match + Screening ',
        body1:
          'Our egg donor and surrogacy solutions start with a clear donor match. We learn what matters to you—health history, traits, timeline, and how open you want the donor relationship to be. Then we coordinate screening and clinic requirements, so the plan is aligned before you spend time and money.',
        body2:
          'This step keeps the journey steady. You’re not guessing what comes next. You’re choosing with care, and building a foundation that supports embryo creation.',
        img: '/images/ip/egg/Egg-Donor.png',
        imgAlt: 'Egg donor match and screening conversation',
      },
      {
        title: 'Step 2 — IVF With Donor Eggs ',
        body1:
          'With the donor approved, we move into IVF with donor eggs and surrogacy. The donor completes stimulation and retrieval. Eggs are fertilized, embryos develop in the lab, and your clinic reviews quality and next steps.',
        body2:
          'If you choose embryo testing, options like PGT-A can be discussed with your doctor. After that, embryos are frozen and ready for the next stage with a gestational carrier. We keep milestones clear and communication calm, so the process feels organized and respectful.',
        img: '/images/ip/egg/IVF-With-Donor-Eggs.png',
        imgAlt: 'IVF lab team preparing donor egg embryos',
      },
    ],
    s4Title: 'How to Choose an Egg Donor for Surrogacy (Screening & Selection Criteria)',
    s4Blocks: [
      {
        title: 'Choosing an Egg Donor for Surrogacy—What to Look For',
        body1:
          'When choosing an egg donor for surrogacy, start with the basics that protect your future child: health history, clear medical records, and clinic requirements. Many families also consider genetic screening and any known inherited risks.',
        body2:
          'Then think about the relationship style. Some prefer anonymous donation. Others want open contact or ID-release later. There isn’t one “best” choice—only what feels steady for your family.',
        bullets: [
          'Health history + clinic requirements first',
          'Genetic screening and inherited risk review',
          'Choose anonymous, open, or ID-release later',
        ],
        tag: 'Start with safety, then fit',
        img: '/images/ip/egg/Egg-Donor-for-Surrogacy-1.png',
        imgAlt: 'Intended parent considering egg donor profiles',
      },
      {
        title: 'Egg Donor Screening Process—How We Help You Decide',
        body1:
          'A careful egg donor screening process often includes medical history review, infectious disease testing, genetic screening, and a psychological evaluation. Your IVF clinic may add extra steps based on your situation.',
        body2:
          'We help you read results, compare donors, and stay aligned with your clinic—so decisions feel clear, not rushed.',
        bullets: [
          'Medical + infectious disease screening',
          'Genetic screening where appropriate',
          'Psychological evaluation and clinic alignment',
        ],
        tag: 'Clear review, calm decisions',
        img: '/images/ip/egg/Egg-Donor-for-Surrogacy-2.png',
        imgAlt: 'Team reviewing egg donor screening checklist',
      },
    ],
    s5Title: 'Fresh vs. Frozen Donor Eggs: Which Option Is Right for Your Surrogacy Journey?',
    s5Cards: [
      {
        title: 'Fresh Donor Eggs—A Planned Cycle With More Custom Control',
        body1:
          'With surrogacy with donor eggs, fresh donor eggs usually mean syncing a donor’s cycle with your IVF clinic’s schedule. This can feel more “made-to-measure,” especially if your doctor wants a specific approach.',
        body2:
          'The tradeoff is timing. A fresh cycle often takes more coordination, and changes can happen if schedules shift. If you value a tailored plan and don’t mind a longer runway, fresh may fit your journey.',
        bullets: ['Clinic-synced cycle for tailored plans', 'More coordination and schedule sensitivity', 'Good when doctor prefers a custom protocol'],
        img: '/images/home/p-3.webp',
        imgAlt: 'Intended parents discussing fresh egg plan',
      },
      {
        title: 'Frozen Donor Eggs—Faster Start, Clearer Timing, Less Coordination',
        body1:
          'For many families doing surrogacy with donor eggs, frozen eggs offer a simpler start. Eggs are already retrieved and stored, so you can move toward fertilization and embryo creation sooner.',
        body2:
          'When comparing fresh vs frozen donor eggs, frozen often brings more predictability in timing and less coordination across calendars. The best choice depends on your clinic’s guidance, your timeline, and what feels most steady for your family.',
        bullets: ['No need to sync cycles; faster start', 'Predictable timing and fewer moving parts', 'Helpful for tighter timelines or travel'],
        img: '/images/ip/Gay-Surrogacy.jpg',
        imgAlt: 'Embryology team preparing frozen donor eggs',
      },
    ],
    s5Gallery: [
      { src: '/images/ip/egg/Surrogacy-Journey-1.jpg', alt: 'Family consultation about egg donation' },
      { src: '/images/ip/egg/Surrogacy-Journey-2.jpg', alt: 'Clinic team reviewing embryos' },
      { src: '/images/ip/egg/Surrogacy-Journey-3.png', alt: 'Intended parents planning timeline' },
      { src: '/images/ip/egg/Surrogacy-Journey-4.png', alt: 'Embryology lab equipment' },
    ],
    s7Title: 'Egg Donor Surrogacy FAQ (Embryos, PGT-A, Timeline, Costs, Logistics)',
    s7Faqs: [
      {
        q: 'Whose eggs are used in egg donation surrogacy?',
        a: 'In egg donation surrogacy, eggs come from an intended parent or an egg donor. The surrogate carries the pregnancy but isn’t the egg source.',
      },
      {
        q: 'Is the surrogate the biological mother in egg donor surrogacy?',
        a: 'No. In egg donor surrogacy, the surrogate is a gestational carrier. The embryo is created via IVF using donor eggs (or intended parent eggs).',
      },
      {
        q: 'When do you need surrogacy with donor eggs?',
        a: 'You may choose surrogacy with donor eggs if using your own eggs isn’t possible or preferred—medical history, age, or IVF setbacks are common reasons.',
      },
      {
        q: 'How many embryos can you get from donor eggs?',
        a: 'It varies by donor, lab, and fertilization outcomes. Your clinic can estimate a realistic range based on egg number and lab results.',
      },
      {
        q: 'What is PGT-A and should we test donor-egg embryos?',
        a: 'PGT-A checks embryo chromosome patterns. Some families use it to support selection and planning. Your doctor can advise if it fits your goals.',
      },
      {
        q: 'What is the donor egg surrogacy timeline?',
        a: 'Often: donor match → screening → IVF/embryo creation → legal/insurance → transfer cycle. Timing depends most on matching and clinic schedules.',
      },
      {
        q: 'Fresh vs frozen donor eggs for surrogacy with egg donation—what’s the difference?',
        a: 'Fresh can be more customized but needs more coordination. Frozen often starts faster and feels more predictable. Clinic guidance matters.',
      },
      {
        q: 'What impacts the cost of surrogacy on donor egg?',
        a: 'Key drivers: donor route (fresh/frozen), IVF/meds, testing, surrogate support, legal, insurance review, escrow, and agency coordination.',
      },
      {
        q: 'Do international parents need to be in the U.S for surrogacy with egg donation?',
        a: 'Not always. Many steps can be remote. Travel may only be needed for a few key moments, depending on clinic and legal plan.',
      },
      {
        q: 'How does embryo logistics work if embryos are created abroad?',
        a: 'It depends on where transfer happens. Secure, compliant transport can be arranged through qualified partners, with proper timing and paperwork.',
      },
    ],
  },
  zh: {
    seoTitle: '卵子捐赠代孕：寻找卵子捐赠者，实现捐赠卵子代孕 | 孕达代孕',
    seoDescription: '美国捐卵代孕：供体筛查、IVF 胚胎培育、PGT-A 选项、时间线、国际物流与费用概览。',
    heroTitle: '卵子捐赠代孕：寻找卵子捐赠者，实现捐赠卵子代孕',
    heroLead: '选择捐卵代孕既有意义也务实：你希望答案清晰、节奏稳定、方案可信。',
    heroBody:
      '我们支持捐卵代孕，从供体筛查和选择到体外与胚胎培育。如果你考虑 PGT-A、权衡新鲜与冷冻供卵，或作为国际意向父母进行规划，我们帮你无压力地看懂选项；同时提供简明的费用概览，并在你准备好时引导至更详细的费用页面。',
    ctaPrimary: '了解更多',
    ctaSecondary: '与顾问沟通',
    heroImgAlt: '准父母了解捐卵代孕方案的画面',
    s2Title: '捐卵代孕：什么时候需要卵子捐赠者？',
    s2Body1:
      '当自有卵子不可行，或不再是最佳路径时，可能需要捐卵代孕。常见原因包括：年龄相关的生育力变化、卵巢储备低、卵子质量欠佳、反复 IVF 失败，或特定遗传风险。有些家庭也会选择供卵以降低医学不确定性、让时间线更可控。',
    s2Body2:
      '如果仍在犹豫，我们会结合你的既往经历、诊所建议与目标，帮助判断此刻是否需要供卵，或是否有更合适的方案。',
    s2Checklist: ['诊所视角下的自卵 vs 供卵评估', '更稳的时间线与下一步计划', '遗传、PGT-A 与跨境就医支持'],
    s2CardTitle: '捐卵代孕 101',
    s2CardSub: '快速自检清单',
    s3Title: '捐卵 + IVF 精简流程（从匹配到胚胎建立）',
    s3Steps: [
      {
        title: '步骤 1 — 捐卵人匹配与筛查（先把地基打牢）',
        body1:
          '我们的捐卵与代孕服务先从清晰的供卵人匹配开始。我们了解你看重的健康史、特质、时间线以及对捐卵关系开放度的偏好，然后协调筛查与诊所要求，让计划在投入时间与费用前就先对齐。',
        body2: '这一环节让旅程更稳，不用猜下一步。你在有序地选择，也在为胚胎建立打下扎实基础。',
        img: '/images/ip/egg/Egg-Donor.png',
        imgAlt: '捐卵匹配与筛查沟通',
      },
      {
        title: '步骤 2 — 供卵 IVF（从取卵到胚胎培养）',
        body1:
          '供卵人获批后，进入供卵 IVF + 代孕阶段。供卵人完成促排与取卵，卵子受精，胚胎在实验室发育，诊所评估质量并给出下一步。',
        body2:
          '若选择胚胎检测，可与医生讨论如 PGT-A 等方案。之后胚胎冷冻，为后续代孕妈妈移植做好准备。我们保持里程碑清晰、沟通平稳，让流程有序且尊重每位参与者。',
        img: '/images/ip/egg/IVF-With-Donor-Eggs.png',
        imgAlt: '实验室准备捐卵胚胎',
      },
    ],
    s4Title: '如何为代孕选择卵子捐赠者（筛查与甄选要点）',
    s4Blocks: [
      {
        title: '选择捐卵人需要关注什么',
        body1:
          '挑选代孕的捐卵人，先看能保护未来宝宝的基础：健康史、完整的医疗记录，以及诊所要求。很多家庭也会考虑遗传筛查和已知的家族风险。',
        body2:
          '接着考虑关系形式：有的希望匿名捐卵，有的倾向开放或日后可联系。不存在唯一的“最佳”模式，稳定、适合你的家庭才是关键。',
        bullets: ['先确保健康史与诊所要求', '关注遗传筛查与家族风险', '匿名、开放或日后可联系，由你选择'],
        tag: '先安全，再匹配合适度',
        img: '/images/ip/egg/Egg-Donor-for-Surrogacy-1.png',
        imgAlt: '准父母查看捐卵资料',
      },
      {
        title: '捐卵筛查流程：我们如何帮你决策',
        body1:
          '严谨的捐卵筛查通常包括病史审核、传染病检测、遗传筛查以及心理评估。你的 IVF 诊所可能会根据具体情况增加项目。',
        body2: '我们帮助你读懂结果、对比捐卵人，并与诊所保持一致，让决策清晰且不被催促。',
        bullets: ['病史 + 传染病检测', '必要的遗传筛查', '心理评估并与诊所流程对齐'],
        tag: '清晰解读，沉稳决策',
        img: '/images/ip/egg/Egg-Donor-for-Surrogacy-2.png',
        imgAlt: '团队核对捐卵筛查清单',
      },
    ],
    s5Title: '新鲜 vs 冷冻捐卵：哪种更适合你的代孕旅程？',
    s5Cards: [
      {
        title: '新鲜捐卵：同步排期，更可定制',
        body1:
          '在捐卵代孕中，新鲜供卵通常需要将捐卵人的周期与 IVF 诊所排期同步，更像“量身定制”，尤其在医生有特定方案时。',
        body2:
          '代价是时间与协调：排期更长、变动更多。如果你看重定制方案且接受更长准备期，新鲜供卵可能更适合。',
        bullets: ['与诊所同步周期，方案可定制', '协调与排期更敏感', '适合医生建议定制方案的情况'],
        img: '/images/home/p-3.webp',
        imgAlt: '准父母商讨新鲜捐卵计划',
      },
      {
        title: '冷冻捐卵：更快启动，时间更可控',
        body1:
          '对很多家庭而言，冷冻捐卵让启动更简单：卵子已取出并存储，可更快进入受精与胚胎培养。',
        body2:
          '比较新鲜与冷冻捐卵时，冷冻通常带来更可预测的时间和更少的跨日程协调。最终选择取决于诊所建议、你的时间线，以及让你最安心的节奏。',
        bullets: ['无需同步周期，启动更快', '时间可预测、协调更少', '适合时间紧或需跨境行程的家庭'],
        img: '/images/ip/Gay-Surrogacy.jpg',
        imgAlt: '实验室团队准备冷冻供卵胚胎',
      },
    ],
    s5Gallery: [
      { src: '/images/ip/egg/Surrogacy-Journey-1.jpg', alt: '家庭咨询捐卵方案' },
      { src: '/images/ip/egg/Surrogacy-Journey-2.jpg', alt: '诊所团队查看胚胎' },
      { src: '/images/ip/egg/Surrogacy-Journey-3.png', alt: '准父母规划时间线' },
      { src: '/images/ip/egg/Surrogacy-Journey-4.png', alt: '胚胎实验室设备' },
    ],
    s7Title: '捐卵代孕常见问答（胚胎、PGT-A、时间线、费用、物流）',
    s7Faqs: [
      {
        q: '捐卵代孕使用谁的卵子？',
        a: '可使用意向父母的卵子或捐卵人的卵子。代孕妈妈只负责妊娠，不提供卵子。',
      },
      {
        q: '捐卵代孕中，代孕妈妈是生物学母亲吗？',
        a: '不是。代孕妈妈是妊娠代孕者，胚胎来自捐卵人或意向母亲，经 IVF 形成。',
      },
      {
        q: '什么时候需要捐卵代孕？',
        a: '当自卵不可行或不优先时可能选择捐卵代孕，常见原因有病史、年龄、IVF 受挫等。',
      },
      {
        q: '捐卵一般能得到多少胚胎？',
        a: '取决于捐卵人、实验室及受精结果。诊所可根据卵子数量与培养结果给出合理预估。',
      },
      {
        q: '什么是 PGT-A？捐卵胚胎需要做吗？',
        a: 'PGT-A 检测胚胎染色体。部分家庭用它来辅助选择与计划，是否适合请听取医生建议。',
      },
      {
        q: '捐卵代孕的时间线如何？',
        a: '通常：匹配捐卵人 → 筛查 → IVF/胚胎建立 → 法律/保险 → 移植周期。时间主要看匹配与诊所排期。',
      },
      {
        q: '捐卵代孕中，新鲜与冷冻供卵有何区别？',
        a: '新鲜更可定制但需更多协调；冷冻启动更快、节奏更可预期。听从诊所建议最重要。',
      },
      {
        q: '影响捐卵代孕费用的因素有哪些？',
        a: '关键驱动：新鲜/冷冻路线、IVF/用药、检测、代孕支持、法律、保险审核、托管、机构协调等。',
      },
      {
        q: '国际家庭需要到美国完成捐卵代孕吗？',
        a: '不一定，很多步骤可远程。是否需出行取决于诊所与法律方案，通常只在少数关键节点需要到场。',
      },
      {
        q: '如果胚胎在海外建立，如何安排运输？',
        a: '取决于移植地点，可由合规合作方安排安全运输，确保时效和文书符合要求。',
      },
    ],
  },
}

const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)
const pagePath = '/egg-donation'
const schemaProcessItems = computed(() => [
  {
    position: 1,
    name: 'Donor Match + Screening',
    description: c.value.s3Steps[0]?.body1,
    url: pagePath,
  },
  {
    position: 2,
    name: 'IVF With Donor Eggs',
    description: c.value.s3Steps[1]?.body1,
    url: pagePath,
  },
  {
    position: 3,
    name: 'Choosing an Egg Donor for Surrogacy',
    description: c.value.s4Blocks[0]?.body1,
    url: pagePath,
  },
  {
    position: 4,
    name: 'Egg Donor Screening Process',
    description: c.value.s4Blocks[1]?.body1,
    url: pagePath,
  },
  {
    position: 5,
    name: 'Fresh vs. Frozen Donor Eggs Planning',
    description: c.value.s5Title,
    url: pagePath,
  },
])
const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: c.value.heroTitle,
  description: c.value.seoDescription,
  about: 'Egg donor gestational surrogacy and donor egg surrogacy process',
  audience: 'Intended parents',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  service: {
    name: 'Egg Donor Gestational Surrogacy Coordination',
    serviceType: 'Egg donor gestational surrogacy support',
    audience: ['Intended parents', 'LGBTQ intended parents', 'single parents'],
    description: 'Coordination support for intended parents using donor eggs in a gestational surrogacy journey, including egg donor selection, donor screening, IVF clinic coordination, embryo creation, PGT-A discussion, fresh or frozen donor egg planning, and gestational carrier matching support.',
  },
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Intended Parents', url: '/be-parents' },
    { name: 'Egg Donor Surrogacy', url: pagePath },
  ],
  faqs: c.value.s7Faqs.map(item => ({
    question: item.q,
    answer: item.a,
  })),
  itemList: {
    name: 'Egg Donor and IVF Process',
    description: c.value.s3Title,
    items: schemaProcessItems.value,
  },
}))

useHead(() => ({
  title: c.value.seoTitle,
  meta: [
    {
      name: 'description',
      content: c.value.seoDescription,
    },
    {
      property: 'og:title',
      content: c.value.seoTitle,
    },
    {
      property: 'og:description',
      content: c.value.seoDescription,
    },
  ],
}))

useHead(() => ({
  script: coreServicePageSchemas.value.map((schema, index) => ({
    key: `schema-egg-donation-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />

    <main>
      <section class="relative w-full overflow-hidden from-[var(--yunda-petal)] via-[#fff3e5] to-[var(--yunda-petal)] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-18%] top-[-18%] h-[340px] w-[360px] rounded-full bg-white/60 blur-3xl" />
          <div class="absolute right-[-16%] top-[-14%] h-[380px] w-[420px] rounded-full bg-[var(--yunda-petal)]/70 blur-3xl" />
          <div class="absolute bottom-[-22%] left-[-20%] h-[420px] w-[520px] rounded-[58%] bg-white/55 blur-3xl" />
          <div class="absolute bottom-[-24%] right-[-18%] h-[420px] w-[520px] rounded-[60%] bg-[var(--yunda-petal)]/60 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-[1760px] w-full px-6 py-14 lg:px-14 lg:py-20">
          <div class="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
            <div class="space-y-6">
              <h1 class="font-display text-[38px] font-semibold leading-[1.1] sm:text-[42px] lg:text-[50px]">
                {{ c.heroTitle }}
              </h1>

              <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                {{ c.heroLead }}
              </p>
              <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                {{ c.heroBody }}
              </p>

              <div class="flex flex-wrap gap-4">
                <NuxtLink
                  :to="localePath('/be-parents')"
                  class="inline-flex items-center justify-center rounded-[12px] bg-[var(--yunda-bark)] px-6 py-3 text-sm text-[var(--yunda-petal)] font-semibold shadow-[0_16px_30px_rgba(169,108,66,0.26)] transition-transform duration-200 hover:-translate-y-0.5"
                  style="font-family: var(--font-text)"
                >
                  {{ c.ctaPrimary }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/surrogacy-cost')"
                  class="inline-flex items-center justify-center border border-[var(--yunda-maple)]/30 rounded-[12px] bg-white/85 px-6 py-3 text-sm text-[var(--yunda-bark)] font-semibold shadow-[0_14px_26px_rgba(39,31,24,0.08)] transition-transform duration-200 hover:-translate-y-0.5"
                  style="font-family: var(--font-text)"
                >
                  {{ c.ctaSecondary }}
                </NuxtLink>
              </div>
            </div>

            <div class="relative">
              <div class="relative isolate overflow-hidden border border-[var(--yunda-maple)]/35 rounded-[32px] shadow-[0_26px_70px_rgba(169,108,66,0.20)]">
                <div class="absolute inset-0 from-[#f9d9b7] via-[#eab07d] to-[#d88556] bg-gradient-to-r" />
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.36),transparent_42%),radial-gradient(circle_at_80%_24%,rgba(255,255,255,0.26),transparent_38%)]" />

                <div class="relative aspect-[1002/600] w-full">
                  <div class="group absolute inset-0 flex items-stretch gap-4 px-6 py-6 lg:px-8">
                    <div class="flex-1 overflow-hidden border border-white/55 rounded-[24px] bg-white/45 shadow-[0_18px_40px_rgba(39,31,24,0.18)] backdrop-blur-md transition-transform duration-300 ease-out will-change-transform group-hover:shadow-[0_24px_52px_rgba(39,31,24,0.20)] group-hover:-translate-y-1">
                      <picture>
                        <source srcset="/images/ip/egg/egg-donation.jpg" type="image/jpeg">
                        <img
                          src="/images/ip/egg/egg-donation.jpg"
                          :alt="c.heroImgAlt"
                          class="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        >
                      </picture>
                    </div>
                    <div class="flex-1 overflow-hidden border border-white/55 rounded-[24px] bg-white/45 shadow-[0_18px_40px_rgba(39,31,24,0.18)] backdrop-blur-md transition-transform duration-300 ease-out will-change-transform group-hover:shadow-[0_24px_52px_rgba(39,31,24,0.20)] group-hover:-translate-y-1">
                      <picture>
                        <source srcset="/images/ip/egg/Egg-Donor-Surrogacy-2.jpg" type="image/jpeg">
                        <img
                          src="/images/ip/egg/Egg-Donor-Surrogacy-2.jpg"
                          :alt="c.heroImgAlt"
                          class="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        >
                      </picture>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative w-full overflow-hidden bg-[var(--yunda-petal)]">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-18%] top-[-20%] h-[320px] w-[360px] rounded-full bg-white/55 blur-3xl" />
          <div class="absolute right-[-16%] top-[-18%] h-[360px] w-[400px] rounded-full bg-[var(--yunda-petal)]/65 blur-3xl" />
          <div class="absolute bottom-[-18%] left-[-16%] h-[420px] w-[480px] rounded-[55%] bg-white/50 blur-3xl" />
          <div class="absolute bottom-[-20%] right-[-16%] h-[420px] w-[500px] rounded-[58%] bg-[var(--yunda-petal)]/55 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-[1960px] w-full px-6 py-16 lg:px-14 lg:py-24">
          <div class="grid mx-auto max-w-[1480px] gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
            <div class="space-y-5">
              <h2 class="font-display text-[30px] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
                {{ c.s2Title }}
              </h2>
              <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                {{ c.s2Body1 }}
              </p>
              <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                {{ c.s2Body2 }}
              </p>
            </div>

            <div class="relative flex justify-center">
              <div class="relative aspect-square max-w-[420px] w-full overflow-hidden border border-[var(--yunda-maple)]/25 rounded-[28px] bg-white/85 p-7 shadow-[0_24px_60px_rgba(169,108,66,0.18)] backdrop-blur-md">
                <div class="absolute inset-0 from-[#ffe6c9] via-[#f9d3a8] to-[#e9a36d] bg-gradient-to-br opacity-70" />
                <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.7),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.45),transparent_40%)]" />
                <div class="relative h-full flex flex-col justify-between rounded-[18px] bg-white/78 p-6 shadow-[0_12px_28px_rgba(39,31,24,0.10)]">
                  <div class="space-y-3">
                    <div class="inline-flex items-center gap-2 rounded-full bg-[var(--yunda-maple)]/10 px-4 py-1.5 text-base text-[var(--yunda-maple)] font-semibold" style="font-family: var(--font-text)">
                      <span class="h-7 w-7 inline-flex items-center justify-center rounded-full bg-[var(--yunda-maple)] text-lg text-white">✶</span>
                      <span>{{ c.s2CardTitle }}</span>
                    </div>
                    <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                      {{ c.s2CardSub }}
                    </h3>
                  </div>

                  <ul class="text-base text-[var(--yunda-bark)]/90 leading-relaxed space-y-2 lg:text-lg" style="font-family: var(--font-text)">
                    <li class="flex gap-2">
                      <span class="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--yunda-maple)]" />
                      <span>{{ c.s2Checklist[0] }}</span>
                    </li>
                    <li class="flex gap-2">
                      <span class="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--yunda-maple)]" />
                      <span>{{ c.s2Checklist[1] }}</span>
                    </li>
                    <li class="flex gap-2">
                      <span class="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--yunda-maple)]" />
                      <span>{{ c.s2Checklist[2] }}</span>
                    </li>
                  </ul>

                  <div class="mt-2 inline-flex items-center gap-2 text-base text-[var(--yunda-maple)] font-semibold" style="font-family: var(--font-text)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative w-full overflow-hidden from-[var(--yunda-petal)] via-white to-[var(--yunda-petal)] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-18%] top-[-22%] h-[320px] w-[360px] rounded-full bg-white/55 blur-3xl" />
          <div class="absolute right-[-16%] top-[-18%] h-[360px] w-[420px] rounded-full bg-[var(--yunda-petal)]/65 blur-3xl" />
          <div class="absolute bottom-[-20%] left-[-16%] h-[420px] w-[500px] rounded-[58%] bg-white/55 blur-3xl" />
          <div class="absolute bottom-[-22%] right-[-18%] h-[440px] w-[520px] rounded-[60%] bg-[var(--yunda-petal)]/55 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-[1960px] w-full px-6 py-16 lg:px-14 lg:py-24">
          <div class="mx-auto max-w-[1480px] space-y-12">
            <div class="text-center space-y-3">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
                {{ c.s3Title }}
              </h2>
            </div>

            <div class="space-y-12">
              <div
                v-for="(step, idx) in c.s3Steps"
                :key="step.title"
                class="grid gap-8 lg:grid-cols-2 lg:items-center"
                :class="idx % 2 === 1 ? 'lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1' : ''"
              >
                <div class="space-y-4">
                  <div class="inline-flex items-center gap-2 rounded-full bg-[var(--yunda-maple)]/10 px-3 py-1 text-xs text-[var(--yunda-maple)] font-semibold" style="font-family: var(--font-text)">
                    <span class="h-2 w-2 rounded-full bg-[var(--yunda-maple)]" />
                    <span>{{ step.title }}</span>
                  </div>
                  <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                    {{ step.title }}
                  </h3>
                  <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                    {{ step.body1 }}
                  </p>
                  <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                    {{ step.body2 }}
                  </p>
                </div>

                <div class="relative overflow-hidden border border-[var(--yunda-maple)]/25 rounded-[26px] bg-white/80 shadow-[0_20px_52px_rgba(64,84,120,0.12)]">
                  <img
                    :src="step.img"
                    :alt="step.imgAlt"
                    class="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative w-full overflow-hidden bg-[var(--yunda-petal)]">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-18%] top-[-18%] h-[320px] w-[360px] rounded-full bg-white/55 blur-3xl" />
          <div class="absolute right-[-16%] top-[-16%] h-[360px] w-[420px] rounded-full bg-[var(--yunda-petal)]/65 blur-3xl" />
          <div class="absolute bottom-[-18%] left-[-16%] h-[420px] w-[500px] rounded-[58%] bg-white/50 blur-3xl" />
          <div class="absolute bottom-[-20%] right-[-18%] h-[440px] w-[520px] rounded-[60%] bg-[var(--yunda-petal)]/55 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-[1960px] w-full px-6 py-16 lg:px-14 lg:py-24">
          <div class="mx-auto max-w-[1480px] space-y-10">
            <div class="text-center space-y-3">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
                {{ c.s4Title }}
              </h2>
            </div>

            <div class="grid gap-6 lg:grid-cols-2">
              <div
                v-for="(card, idx) in c.s4Blocks"
                :key="card.title"
                class="relative overflow-hidden border border-[var(--yunda-maple)]/28 rounded-[22px] bg-white/88 p-6 shadow-[0_18px_50px_rgba(64,84,120,0.12)] backdrop-blur-md"
                :class="idx === 0 ? 'from-[#fff7ee] via-white to-[#fdf0df] bg-gradient-to-br' : 'from-[#fff4e6] via-white to-[#faead8] bg-gradient-to-br'"
              >
                <div class="flex items-start gap-3">
                  <div class="mt-1 h-8 w-8 flex shrink-0 items-center justify-center rounded-full bg-[var(--yunda-maple)]/10 text-lg text-[var(--yunda-maple)] shadow-[0_10px_24px_rgba(169,108,66,0.20)]" style="font-family: var(--font-text)">
                    {{ idx + 1 }}
                  </div>
                  <div class="space-y-2">
                    <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                      {{ card.title }}
                    </h3>
                    <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                      {{ card.body1 }}
                    </p>
                    <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                      {{ card.body2 }}
                    </p>
                  </div>
                </div>

                <div class="grid mt-4 gap-3 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:gap-4">
                  <ul class="text-base text-[var(--yunda-bark)]/90 leading-relaxed space-y-2" style="font-family: var(--font-text)">
                    <li
                      v-for="b in card.bullets"
                      :key="b"
                      class="flex gap-2"
                    >
                      <span class="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--yunda-maple)]" />
                      <span>{{ b }}</span>
                    </li>
                  </ul>

                  <div class="relative overflow-hidden border border-[var(--yunda-maple)]/24 rounded-[18px] bg-white/90 shadow-[0_16px_44px_rgba(169,108,66,0.16)] lg:place-self-center">
                    <img
                      :src="card.img"
                      :alt="card.imgAlt"
                      class="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    >
                    <div class="absolute inset-0 from-black/8 via-transparent to-transparent bg-gradient-to-t" />
                  </div>
                </div>

                <div class="mt-4 inline-flex items-center gap-2 rounded-full bg-[var(--yunda-maple)]/10 px-3 py-1 text-xs text-[var(--yunda-maple)] font-semibold" style="font-family: var(--font-text)">
                  <span class="h-2 w-2 rounded-full bg-[var(--yunda-maple)]" />
                  <span>{{ card.tag }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative w-full overflow-hidden from-[var(--yunda-petal)] via-white to-[var(--yunda-petal)] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-18%] top-[-20%] h-[320px] w-[360px] rounded-full bg-white/55 blur-3xl" />
          <div class="absolute right-[-16%] top-[-18%] h-[360px] w-[420px] rounded-full bg-[var(--yunda-petal)]/65 blur-3xl" />
          <div class="absolute bottom-[-18%] left-[-16%] h-[420px] w-[500px] rounded-[58%] bg-white/50 blur-3xl" />
          <div class="absolute bottom-[-20%] right-[-18%] h-[440px] w-[520px] rounded-[60%] bg-[var(--yunda-petal)]/55 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-[1960px] w-full px-6 py-16 lg:px-14 lg:py-24">
          <div class="mx-auto max-w-[1480px] space-y-12">
            <div class="text-center space-y-3">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
                {{ c.s5Title }}
              </h2>
            </div>

            <div class="grid gap-6 lg:grid-cols-2 lg:items-stretch">
              <div
                v-for="(card, idx) in c.s5Cards"
                :key="card.title"
                class="relative flex flex-col gap-4 overflow-hidden border border-[var(--yunda-maple)]/28 rounded-[22px] bg-white/90 p-6 shadow-[0_18px_50px_rgba(64,84,120,0.12)] backdrop-blur-md transition-transform duration-300 ease-out hover:shadow-[0_24px_54px_rgba(39,31,24,0.16)] hover:-translate-y-1"
                :class="idx === 0 ? 'from-[#fff7ee] via-white to-[#fdf0df] bg-gradient-to-br' : 'from-[#fff4e6] via-white to-[#faead8] bg-gradient-to-br'"
              >
                <div class="flex items-start gap-3">
                  <div class="mt-1 h-8 w-8 flex shrink-0 items-center justify-center rounded-full bg-[var(--yunda-maple)]/10 text-lg text-[var(--yunda-maple)] shadow-[0_10px_24px_rgba(169,108,66,0.20)]" style="font-family: var(--font-text)">
                    {{ idx + 1 }}
                  </div>
                  <div class="space-y-2">
                    <h3 class="font-sans text-[20px] text-[var(--yunda-bark)] font-bold leading-snug sm:text-[22px] lg:text-[24px]" style="font-family: var(--font-text)">
                      {{ card.title }}
                    </h3>
                    <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                      {{ card.body1 }}
                    </p>
                    <p class="text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                      {{ card.body2 }}
                    </p>
                  </div>
                </div>

                <div class="grid gap-3 lg:grid-cols-1 lg:items-center lg:gap-4">
                  <ul class="text-base text-[var(--yunda-bark)]/90 leading-relaxed space-y-2" style="font-family: var(--font-text)">
                    <li
                      v-for="b in card.bullets"
                      :key="b"
                      class="flex gap-2"
                    >
                      <span class="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--yunda-maple)]" />
                      <span>{{ b }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="grid gap-4 lg:grid-cols-4 md:grid-cols-2">
              <div
                v-for="photo in c.s5Gallery"
                :key="photo.src"
                class="relative overflow-hidden border border-[var(--yunda-maple)]/20 rounded-[18px] bg-white/90 shadow-[0_14px_40px_rgba(64,84,120,0.12)] transition-transform duration-300 ease-out hover:shadow-[0_20px_48px_rgba(39,31,24,0.14)] hover:-translate-y-1"
              >
                <img
                  :src="photo.src"
                  :alt="photo.alt"
                  class="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                >
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative w-full overflow-hidden bg-[var(--yunda-petal)]">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-18%] top-[-18%] h-[320px] w-[360px] rounded-full bg-white/55 blur-3xl" />
          <div class="absolute right-[-16%] top-[-16%] h-[360px] w-[420px] rounded-full bg-[var(--yunda-petal)]/65 blur-3xl" />
          <div class="absolute bottom-[-18%] left-[-16%] h-[420px] w-[500px] rounded-[58%] bg-white/50 blur-3xl" />
          <div class="absolute bottom-[-20%] right-[-18%] h-[440px] w-[520px] rounded-[60%] bg-[var(--yunda-petal)]/55 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-[1960px] w-full px-6 py-16 lg:px-14 lg:py-24">
          <div class="mx-auto max-w-[1480px] space-y-8">
            <div class="text-center space-y-3">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
                {{ c.s7Title }}
              </h2>
            </div>

            <div class="grid gap-4 lg:grid-cols-2">
              <details
                v-for="faq in c.s7Faqs"
                :key="faq.q"
                class="group border border-[var(--yunda-maple)]/22 rounded-[16px] bg-white/88 px-4 py-3 shadow-[0_12px_32px_rgba(64,84,120,0.10)] transition-all hover:border-[var(--yunda-maple)]/35 hover:shadow-[0_16px_38px_rgba(64,84,120,0.12)] hover:-translate-y-0.5"
              >
                <summary class="flex cursor-pointer list-none items-start gap-2 text-left">
                  <span class="mt-1 inline-block h-2 w-2 rounded-full bg-[var(--yunda-maple)]" />
                  <span class="text-lg text-[var(--yunda-bark)] font-semibold transition-colors duration-200 lg:text-xl group-open:text-[var(--yunda-maple)]" >
                    {{ faq.q }}
                  </span>
                </summary>
                <p class="mt-2 pl-6 text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ faq.a }}
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'

const localePath = useLocalePath()
const { locale } = useI18n()

const asrmPhotos = [
  'https://qiniu-resources.weweknow.com/yundasurrogacy-1/about-us/asrm-1.jpg',
  'https://qiniu-resources.weweknow.com/yundasurrogacy-1/about-us/asrm-2.jpg',
  'https://qiniu-resources.weweknow.com/yundasurrogacy-1/about-us/asrm-3.jpg',
  'https://qiniu-resources.weweknow.com/yundasurrogacy-1/about-us/asrm-4.jpg',
]

const translations = {
  en: {
    seoTitle: 'IVF & Insurance for Surrogacy in California - Yunda Surrogacy',
    seoDescription: 'Learn about IVF, insurance coverage, support for surrogacy in California with Yunda Surrogacy. Trusted guidance for intended parents at every step.',
    heroTitle: 'IVF & Insurance for Surrogacy in California: How IVF Surrogacy Works in the U.S.',
    heroDescription:
      'In vitro fertilization (IVF) is inherently part of the surrogacy process. In some cases, an intended parent will utilize IVF to retrieve her eggs to create embryos. In other cases, an egg donor is required to donate her eggs to create embryos. Both cases require IVF professionals (your IVF clinic), medications and financials.',
    ctaPrimary: 'Get a Free Estimate',
    ctaSecondary: 'Book a Call',
    heroImgAlt: 'IVF, insurance and legal coordination visual',
    s1Title: 'IVF Surrogacy: How Does Surrogacy Work With IVF?',
    s1Intro:
      'When surrogacy uses IVF, IVF is the medical “engine” that makes embryo transfer possible. In a California surrogacy journey, IVF typically sits between matching and pregnancy, and it anchors the major milestones your clinic tracks.',
    path1Tag: 'Path 1: You already have embryos.',
    path1List: [
      'Clinic reviews embryo records (age at retrieval, grading, any PGT results) and coordinates with surrogate screening.',
      'After legal clearance and the clinic’s medical green light, the surrogate starts a medication cycle and the transfer is scheduled.',
      'A blood test confirms pregnancy about 9–12 days later.',
    ],
    path2Tag: 'Path 2: You need to create embryos.',
    path2List: [
      'Complete IVF first—egg retrieval (or donor eggs), fertilization, and embryo development.',
      'Many intended parents add PGT for informed selection; embryos are then frozen.',
      'Once embryos are ready, follow the same transfer timeline as Path 1.',
    ],
    s1Closing:
      'In both paths, IVF is the bridge from planning to pregnancy—and the point where timing can shift based on clinic calendars and medical readiness.',
    s2Title: 'Who Pays for What? IVF Clinic Fees vs. Surrogacy Agency Costs',
    s2Intro:
      'In a surrogacy journey, medical care is paid directly to the IVF clinic, non-medical coordination is covered by the surrogacy agency, and legal and escrow services ensure contracts, parentage, and payments are handled securely and transparently.',
    chipCost: 'Surrogacy costs breakdown',
    chipProcess: 'Surrogacy steps & timeline',
    clinicTag: 'IVF clinic fees',
    clinicIntro: 'IVF clinic fees are paid to the fertility clinic because they cover healthcare services.',
    clinicList: [
      'Consults, testing, and monitoring visits',
      'IVF or embryo creation (if needed), lab work, medications',
      'Embryo transfer cycle; the clinic sets prices and bills directly',
    ],
    agencyTag: 'Surrogacy agency costs',
    agencyIntro: 'Surrogacy agency costs cover non-medical support from start to birth.',
    agencyList: [
      'Matching, case management, scheduling, and ongoing guidance',
      'Coordination with clinics, attorneys, insurance, and escrow teams',
      'Transparent payment tracking to keep the journey on-plan',
    ],
    s3Title: 'Partner IVF Clinics: How We Help You Choose the Right Clinic',
    s3Intro:
      'We compare labs, services, and timelines to match you with the right partner IVF clinic. Need the full clinic list? Visit our partner IVF clinics overview.',
    linkPartner: 'our partner IVF clinics overview',
    chipProcess2: 'See the process',
    chipCost2: 'View costs & insurance',
    labTag: 'Lab and success standards',
    labBody:
      'Start with the lab and success standards that matter for embryo creation and transfer. Then look at whether the clinic offers the services you may need in-house, such as donor eggs, embryo freezing, and PGT-A coordination. If you’re an international intended parent, we also review the clinic’s international patient support.',
    scheduleTag: 'Scheduling capacity',
    scheduleBody:
      'Next, we check scheduling capacity—how soon you can get started, typical cycle timelines, and how the clinic aligns with surrogate screening and transfer windows. Finally, we confirm fee transparency.',
    illustrationAlt: 'Choosing the right IVF clinic illustration',
    s4Title: 'Does Insurance Cover Surrogacy? What Surrogacy Insurance Typically Covers',
    s4Intro:
      'Learn how insurance fits into U.S. and international surrogacy journeys. Compare what’s covered, what needs escrow, and how to plan newborn coverage.',
    linkCost: 'surrogacy costs',
    linkProcess3: 'the process timeline',
    usTag: 'U.S. Intended Parents: What “Surrogacy Cost With Insurance” Usually Means',
    usIntro:
      'Does insurance cover surrogacy? In most cases, insurance can help with medical pregnancy care—but it usually does not cover agency fees, legal work, or the full program. Use this checklist to understand what surrogacy cost with insurance may include:',
    usList: [
      'Maternity coverage: prenatal care, labs, ultrasounds, delivery, postpartum visits.',
      'Complications coverage: ER visits, hospitalization, surgery, extended care when medically necessary.',
      'Denial defense: eligibility verification, documentation, and claim appeal support if coverage is challenged.',
      'Life insurance: an added policy for the surrogate as a risk-management layer.',
      'Newborn insurance: clear plan to add baby to the intended parents’ policy after birth.',
    ],
    usClosing:
      'If you’re comparing cost of surrogacy for couples with insurance, focus on what medical items are truly covered versus what still needs escrow funding.',
    intlTag: 'International Intended Parents: Newborn Coverage + Coordination',
    intlIntro: 'For international IPs, the biggest variables are newborn coverage and logistics. Prioritize:',
    intlList: [
      'Surrogate maternity insurance requirements: confirm the plan is surrogacy-friendly and active through delivery.',
      'Complications protection: ensure high-cost scenarios are included (hospital stays, emergency care).',
      'Denial defense: billing coordination across providers to reduce surprise bills.',
      'Life insurance: commonly included as a standard protection layer.',
      'Newborn insurance: define the enrollment path early (temporary coverage options + documentation).',
    ],
    s5Title: 'ASRM Surrogacy Guidelines: What They Recommend for Screening & Best Practices',
    s5Intro:
      'Guided by ASRM surrogacy guidelines on screening, consent, and best practices. For legal specifics, see California surrogacy protections and our step-by-step process.',
    linkProtect: 'California surrogacy protections',
    linkProcess4: 'step-by-step process',
    s5PhotoAlt: 'ASRM photo',
    medicalTag: 'Medical screening checklist (before you start)',
    medicalBody:
      'The ASRM gestational carrier guidelines emphasize a full medical review: history + physical exam, pregnancy history, and uterine evaluation as needed.',
    bestTag: 'Best-practice guardrails',
    bestBody:
      'ASRM-style best practices usually include independent legal counsel for each party, contracts completed before medical treatment, and respecting the carrier’s autonomy—supported by coordinated communication among the clinic, OB team, and case manager.',
    psyTag: 'Psychological screening + informed consent',
    psyBody:
      'Under ASRM surrogacy guidelines, psychological evaluation and counseling help confirm readiness, clarify expectations, and reduce conflict.',
    learnTag: 'Learn more about screening standards',
    learnBodyPrefix: 'See how we align clinic screening with ASRM guidance and our agency process in the ',
    learnBodyMid: 'full surrogacy process',
    learnBodySuffix: ' and how costs map to these steps in ',
    learnBodyCost: 'surrogacy pricing',
    s6Title: 'FAQ',
    s6Intro: 'Quick answers on IVF surrogacy, insurance, costs, escrow, and California legal steps.',
    faqs: [
      { q: 'What is IVF surrogacy?', a: 'IVF surrogacy (gestational surrogacy) means an embryo is created via IVF and transferred to a surrogate who is not genetically related to the baby.' },
      { q: 'How does IVF work with surrogacy?', a: 'IVF creates or uses an embryo, then the surrogate completes a transfer cycle. Key milestones: screening → legal clearance → transfer → pregnancy test.' },
      { q: 'Do intended parents need IVF for surrogacy?', a: 'For gestational surrogacy, yes—an embryo is needed for transfer. You can use your own embryos or create embryos with IVF (with or without donor eggs).' },
      { q: 'How do you choose an IVF clinic for surrogacy?', a: 'Compare: lab quality, donor-egg options, PGT-A availability, international support, scheduling speed, and fee transparency.' },
      { q: 'Who pays for what: IVF clinic vs agency vs legal/escrow?', a: 'The IVF clinic bills medical care. Agency fees cover coordination and support. Legal + escrow handle contracts, parentage filings, and organized payments.' },
      { q: 'How much does IVF and surrogacy cost?', a: 'Costs vary, but estimate by buckets: IVF clinic fees + surrogacy program fees + legal/escrow + insurance-related items.' },
      { q: 'Does insurance cover surrogacy?', a: 'Usually, insurance may cover parts of pregnancy-related medical care, but it rarely covers agency fees or legal work. Coverage depends on the plan.' },
      {
        q: 'What does surrogacy insurance typically cover—and how much is surrogacy insurance?',
        a: 'Typical coverage focuses on maternity care, complications, denial/claims support, life insurance, and newborn coverage planning. Cost depends on the surrogate’s existing plan and whether extra policies are needed.',
      },
      { q: 'What is escrow in surrogacy?', a: 'Escrow is a neutral account used to pay approved items on schedule (compensation, reimbursements, insurance premiums), with clear records.' },
      { q: 'What legal steps are required under California surrogacy laws?', a: 'Most cases follow: contract signed before transfer, then parentage steps (often via a pre-birth process) to establish legal parents at delivery.' },
    ],
  },
  zh: {
    seoTitle: '加州代孕的 IVF 与保险｜Yunda Surrogacy',
    seoDescription: '了解代孕所需的 IVF、保险覆盖及支持。Yunda 为意向父母提供加州及美国代孕全程指引。',
    heroTitle: '加州代孕的 IVF 与保险：IVF 代孕在美国如何运作',
    heroDescription:
      '体外受精（IVF）是代孕流程的核心环节。有的意向母亲通过 IVF 取卵建库；有的需要供卵建库。两种情况都需要 IVF 诊所、用药和相应费用。',
    ctaPrimary: '获取费用估算',
    ctaSecondary: '预约咨询',
    heroImgAlt: 'IVF、保险与法律协同示意图',
    s1Title: 'IVF 代孕：代孕如何与 IVF 配合？',
    s1Intro:
      '在代孕中，IVF 是实现胚胎移植的“发动机”。在加州代孕旅程中，IVF 通常位于匹配与妊娠之间，并决定诊所追踪的关键里程碑。',
    path1Tag: '路径 1：你已拥有胚胎',
    path1List: [
      '诊所审核胚胎记录（取卵时间、评级、PGT 结果等），并与代孕妈妈筛查同步。',
      '法律放行且诊所给出医学绿灯后，代孕妈妈开始用药周期并安排移植。',
      '移植约 9–12 天后通过血检确认妊娠。',
    ],
    path2Tag: '路径 2：你需要先建库',
    path2List: [
      '先完成 IVF：取卵（或供卵）、受精、胚胎培养。',
      '很多家庭会加做 PGT，胚胎冷冻保存。',
      '胚胎就绪后，移植时间线与路径 1 相同。',
    ],
    s1Closing:
      '无论哪条路径，IVF 都是从计划到妊娠的桥梁；时间可能因诊所排期和医学准备度而变化。',
    s2Title: '谁付哪些费用？IVF 诊所费用 vs. 代孕机构费用',
    s2Intro:
      '代孕过程中，医疗费用直接支付给 IVF 诊所；非医疗协调由代孕机构承担；法律与托管确保合同、亲子关系与付款安全透明。',
    chipCost: '代孕费用拆解',
    chipProcess: '代孕步骤与时间线',
    clinicTag: 'IVF 诊所费用',
    clinicIntro: 'IVF 诊所费用支付给生殖诊所，因为它们提供医疗服务。',
    clinicList: ['咨询、检测、监测门诊', 'IVF/建库（如需）、实验室与用药', '移植周期；诊所定价并直接收费'],
    agencyTag: '代孕机构费用',
    agencyIntro: '代孕机构费用覆盖从启动到分娩的非医疗支持。',
    agencyList: ['匹配、个案管理、排期与持续指导', '协调诊所、律师、保险与托管团队', '透明的付款跟踪，保持流程按计划进行'],
    s3Title: '合作 IVF 诊所：我们如何帮你选对诊所',
    s3Intro: '我们对比实验室、服务与时间线，匹配合适的合作 IVF 诊所。需要完整名单？请查看合作诊所总览。',
    linkPartner: '合作 IVF 诊所总览',
    chipProcess2: '查看流程',
    chipCost2: '查看费用与保险',
    labTag: '实验室与成功率标准',
    labBody:
      '先看影响建库与移植的实验室与成功率标准，再看诊所是否提供供卵、冷冻、PGT-A 等院内服务。若你是国际家庭，我们也会考察其国际支持。',
    scheduleTag: '排期能力',
    scheduleBody:
      '再评估排期能力——多久可开始、常见周期节奏，以及与代孕筛查/移植窗口的配合度，并确认费用透明度。',
    illustrationAlt: '选择合适 IVF 诊所的插画',
    s4Title: '保险会覆盖代孕吗？代孕保险通常覆盖什么',
    s4Intro:
      '了解保险在美国与国际代孕中的作用，对比哪些可由保险支付、哪些需托管，以及新生儿保险的规划方式。',
    linkCost: '代孕费用',
    linkProcess3: '流程时间线',
    usTag: '美国家庭：含保险的代孕成本通常意味着什么',
    usIntro:
      '保险多能覆盖孕期医疗，但通常不覆盖机构费、法律费或全部项目。用这份清单判断保险能覆盖哪些代孕费用：',
    usList: [
      '孕产覆盖：产检、化验、超声、分娩、产后随访。',
      '并发症覆盖：急诊、住院、手术、必要的延长护理。',
      '拒赔应对：资格核验、材料提交与申诉支持。',
      '人寿保险：为代孕妈妈增加的风险保障层。',
      '新生儿保险：出生后将宝宝加入父母保单的清晰方案。',
    ],
    usClosing: '比较“含保险的代孕成本”时，聚焦真正由保险覆盖的医疗项，其他部分需由托管支付。',
    intlTag: '国际家庭：新生儿保险与协同',
    intlIntro: '对国际家庭，最大变量是新生儿保险与跨机构协同，优先做好：',
    intlList: [
      '代孕妈妈孕产保险：确认保单支持代孕并覆盖至分娩。',
      '并发症保障：确保高费用场景（住院、急救）被涵盖。',
      '拒赔应对：多方账单协调，减少意外账单。',
      '人寿保险：常见的标准保护层。',
      '新生儿保险：及早明确参保路径（临时方案+所需文件）。',
    ],
    s5Title: 'ASRM 代孕指南：关于筛查与最佳实践的建议',
    s5Intro: '遵循 ASRM 在筛查、知情同意与最佳实践方面的建议。法律细节可参考加州代孕保护及我们的流程介绍。',
    linkProtect: '加州代孕保护',
    linkProcess4: '分步流程',
    s5PhotoAlt: 'ASRM 活动照片',
    medicalTag: '医学筛查清单（启动前）',
    medicalBody: 'ASRM 妊娠代孕指南强调完整的医学评估：病史与体检、孕产史、必要时的子宫评估。',
    bestTag: '最佳实践护栏',
    bestBody: '常见最佳实践包括：双方独立法律顾问、医疗前完成合同、尊重代孕妈妈的自主权，并由诊所、产科与个案经理协同沟通。',
    psyTag: '心理筛查与知情同意',
    psyBody: '心理评估与咨询有助于确认准备度、厘清预期、降低冲突。',
    learnTag: '了解更多筛查标准',
    learnBodyPrefix: '查看我们如何将诊所筛查与 ASRM 指南及机构流程对齐：',
    learnBodyMid: '完整代孕流程',
    learnBodySuffix: '；并了解费用如何对应这些步骤：',
    learnBodyCost: '代孕定价',
    s6Title: '常见问答',
    s6Intro: '关于 IVF 代孕、保险、费用、托管与加州法律的快速解答。',
    faqs: [
      { q: '什么是 IVF 代孕？', a: 'IVF 代孕（妊娠代孕）是通过 IVF 形成胚胎并移植给与宝宝无血缘关系的代孕妈妈。' },
      { q: 'IVF 在代孕中如何运作？', a: 'IVF 生成或使用胚胎，代孕妈妈完成移植周期。关键节点：体检 → 法律放行 → 移植 → 验孕。' },
      { q: '做代孕一定要 IVF 吗？', a: '妊娠代孕需要胚胎才能移植。可用自有胚胎，或通过 IVF（可含供卵）建库。' },
      { q: '怎么选择代孕用的 IVF 诊所？', a: '对比：实验室质量、供卵选项、PGT-A、国际支持、排期速度、费用透明度。' },
      { q: 'IVF 诊所、机构、法律/托管谁付什么？', a: 'IVF 诊所收医疗费；机构费覆盖协调与支持；法律+托管负责合同、亲子关系与按计划付款。' },
      { q: 'IVF 与代孕要花多少钱？', a: '按模块估算：IVF 诊所费 + 代孕项目费 + 法律/托管 + 保险相关费用。' },
      { q: '保险会覆盖代孕吗？', a: '通常可覆盖部分孕产医疗，但很少覆盖机构或法律费用，视保单而定。' },
      { q: '代孕保险一般覆盖什么？费用多少？', a: '典型覆盖孕产护理、并发症、拒赔/理赔支持、人寿保险、新生儿保障。费用取决于代孕妈妈现有保单及是否需额外保单。' },
      { q: '代孕中的托管（escrow）是什么？', a: '托管是中立账户，按计划支付补偿、报销、保险费并留存记录。' },
      { q: '加州代孕法律需要哪些步骤？', a: '通常：移植前签合同，之后办理亲子关系（常见预产前裁定），在分娩时确立法定父母。' },
    ],
  },
}

const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)

useHead(() => ({
  title: c.value.seoTitle,
  meta: [
    {
      name: 'description',
      content: c.value.seoDescription,
    },
  ],
}))
</script>

<template>
  <div class="min-h-screen bg-[var(--yunda-petal)] text-[var(--yunda-bark)]">
    <AppHeader />

    <main>
      <section class="relative w-full overflow-hidden from-[var(--yunda-petal)] via-white to-[var(--yunda-petal)] bg-gradient-to-br">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-12%] top-[-20%] h-72 w-72 rounded-full bg-white/70 blur-3xl" />
          <div class="absolute right-[-10%] top-[-18%] h-80 w-80 rounded-full bg-[var(--yunda-petal)]/60 blur-3xl" />
          <div class="absolute bottom-[-28%] left-[-18%] h-96 w-[520px] rounded-[55%] bg-white/65 blur-3xl" />
          <div class="absolute bottom-[-30%] right-[-18%] h-96 w-[520px] rounded-[60%] bg-[var(--yunda-petal)]/55 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-[1960px] w-full px-6 py-16 lg:px-16 lg:py-24">
          <div class="mx-auto max-w-[1400px] border border-white/70 rounded-[32px] bg-white/80 p-8 shadow-[0_28px_70px_rgba(64,84,120,0.08)] backdrop-blur-xl lg:p-12">
            <div class="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center">
              <div>
                <h1 class="font-display text-[38px] font-semibold leading-[1.1] sm:text-[42px] lg:text-[50px]">
                  {{ c.heroTitle }}
                </h1>

                <p class="mt-4 text-base text-[var(--yunda-bark)]/80 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ c.heroDescription }}
                </p>

                <div class="mt-8 flex flex-wrap gap-4">
                  <NuxtLink
                    :to="localePath('/be-parents')"
                    class="inline-flex items-center justify-center rounded-[12px] bg-[var(--yunda-bark)] px-6 py-3 text-sm text-[var(--yunda-petal)] font-semibold shadow-[0_16px_30px_rgba(169,108,66,0.28)] transition-transform duration-200 hover:-translate-y-0.5"
                    style="font-family: var(--font-text)"
                  >
                    {{ c.ctaPrimary }}
                  </NuxtLink>
                  <button
                    type="button"
                    class="inline-flex items-center justify-center border border-[var(--yunda-maple)]/30 rounded-[12px] bg-white/80 px-6 py-3 text-sm text-[var(--yunda-bark)] font-semibold shadow-[0_14px_26px_rgba(39,31,24,0.08)] transition-transform duration-200 hover:-translate-y-0.5"
                    style="font-family: var(--font-text)"
                  >
                    {{ c.ctaSecondary }}
                  </button>
                </div>
              </div>

              <div class="flex items-center justify-center">
                <div class="max-w-[520px] w-full overflow-hidden border border-white/70 rounded-[28px] bg-white/85 shadow-[0_24px_60px_rgba(64,84,120,0.10)]">
                  <picture>
                    <source srcset="/images/ip/Legal-for-Surrogacy.png" type="image/png">
                    <img
                      src="/images/ip/Legal-for-Surrogacy.png"
                      :alt="c.heroImgAlt"
                      class="h-[320px] w-full object-cover lg:h-[380px]"
                      loading="lazy"
                      decoding="async"
                    >
                  </picture>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative w-full overflow-hidden from-[var(--yunda-petal)] via-[#fbf4e6] to-[var(--yunda-petal)] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-20%] top-[-18%] h-[420px] w-[420px] rounded-full bg-white/55 blur-3xl" />
          <div class="absolute right-[-22%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[var(--yunda-petal)]/70 blur-3xl" />
          <div class="absolute bottom-[-18%] right-[-14%] h-[340px] w-[420px] rounded-full bg-white/65 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-[1960px] w-full px-6 py-16 lg:px-16 lg:py-24">
          <div class="mx-auto max-w-[1480px] border border-[var(--yunda-maple)]/18 rounded-[28px] bg-white/90 p-8 shadow-[0_20px_60px_rgba(64,84,120,0.08)] backdrop-blur-xl lg:p-12">
            <div class="mb-8">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
                {{ c.s1Title }}
              </h2>
              <p class="mt-4 text-base text-[var(--yunda-bark)]/80 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                {{ c.s1Intro }}
              </p>
            </div>

            <div class="grid gap-6 lg:grid-cols-2">
              <div class="border border-[var(--yunda-maple)]/40 rounded-[26px] bg-[var(--yunda-petal)] p-6 shadow-[0_18px_38px_rgba(64,84,120,0.10)]">
                <div class="mb-4 inline-flex items-center rounded-full bg-[var(--yunda-maple)]/60 px-6 py-2 text-sm text-[var(--yunda-petal)] font-semibold" style="font-family: var(--font-text)">
                  {{ c.path1Tag }}
                </div>
                <ul class="text-base text-[var(--yunda-bark)] leading-[1.75] space-y-4 lg:text-lg" style="font-family: var(--font-text)">
                  <li v-for="item in c.path1List" :key="item">
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="border border-[var(--yunda-maple)]/40 rounded-[26px] bg-[var(--yunda-petal)] p-6 shadow-[0_18px_38px_rgba(64,84,120,0.10)]">
                <div class="mb-4 inline-flex items-center rounded-full bg-[var(--olive-green)] px-6 py-2 text-sm text-[var(--yunda-petal)] font-semibold" style="font-family: var(--font-text)">
                  {{ c.path2Tag }}
                </div>
                <ul class="text-base text-[var(--yunda-bark)] leading-[1.75] space-y-4 lg:text-lg" style="font-family: var(--font-text)">
                  <li v-for="item in c.path2List" :key="item">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>

            <p class="mt-10 text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
              {{ c.s1Closing }}
            </p>
          </div>
        </div>
      </section>

      <section class="relative w-full overflow-hidden from-[var(--yunda-petal)] via-white to-[var(--yunda-petal)] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-18%] top-[-16%] h-[360px] w-[360px] rounded-full bg-white/55 blur-3xl" />
          <div class="absolute right-[-20%] top-[-8%] h-[480px] w-[480px] rounded-full bg-[var(--yunda-petal)]/65 blur-3xl" />
          <div class="absolute bottom-[-22%] left-[-12%] h-[380px] w-[460px] rounded-[55%] bg-white/60 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-[1960px] w-full px-6 py-16 lg:px-16 lg:py-24">
          <div class="mx-auto max-w-[1480px] border border-[var(--yunda-maple)]/18 rounded-[28px] bg-white/92 p-8 shadow-[0_20px_60px_rgba(64,84,120,0.08)] backdrop-blur-xl lg:p-12">
            <div class="mb-10 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div class="max-w-4xl">
                <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
                  {{ c.s2Title }}
                </h2>
                <p class="mt-4 text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ c.s2Intro }}
                </p>
              </div>
              <div class="flex flex-wrap gap-3 text-sm font-semibold" style="font-family: var(--font-text)">
                <NuxtLink
                  :to="localePath('/surrogacy-cost')"
                  class="inline-flex items-center border border-[var(--yunda-maple)]/30 rounded-full bg-[var(--yunda-petal)] px-4 py-2 text-[var(--yunda-maple)] hover:border-[var(--yunda-maple)]/50"
                >
                  {{ c.chipCost }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/surrogacy-process')"
                  class="inline-flex items-center border border-[var(--olive-green)]/30 rounded-full bg-[var(--yunda-petal)] px-4 py-2 text-[var(--olive-green)] hover:border-[var(--olive-green)]/50"
                >
                  {{ c.chipProcess }}
                </NuxtLink>
              </div>
            </div>

            <div class="grid gap-6 lg:grid-cols-2">
              <div class="border border-[var(--yunda-maple)]/40 rounded-[26px] bg-[var(--yunda-petal)] p-6 shadow-[0_18px_38px_rgba(64,84,120,0.10)]">
                <div class="mb-4 inline-flex items-center rounded-full bg-[var(--yunda-maple)] px-6 py-2 text-sm text-[var(--yunda-petal)] font-semibold" style="font-family: var(--font-text)">
                  {{ c.clinicTag }}
                </div>
                <p class="mb-4 text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ c.clinicIntro }}
                </p>
                <ul class="text-base text-[var(--yunda-bark)] leading-[1.75] space-y-3 lg:text-lg" style="font-family: var(--font-text)">
                  <li v-for="item in c.clinicList" :key="item">
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="border border-[var(--yunda-maple)]/40 rounded-[26px] bg-[var(--yunda-petal)] p-6 shadow-[0_18px_38px_rgba(64,84,120,0.10)]">
                <div class="mb-4 inline-flex items-center rounded-full bg-[var(--olive-green)] px-6 py-2 text-sm text-[var(--yunda-petal)] font-semibold" style="font-family: var(--font-text)">
                  {{ c.agencyTag }}
                </div>
                <p class="mb-4 text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ c.agencyIntro }}
                </p>
                <ul class="text-base text-[var(--yunda-bark)] leading-[1.75] space-y-3 lg:text-lg" style="font-family: var(--font-text)">
                  <li v-for="item in c.agencyList" :key="item">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative w-full overflow-hidden from-[var(--yunda-petal)] via-[#fbf4e6] to-[var(--yunda-petal)] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-18%] top-[-10%] h-[340px] w-[420px] rounded-full bg-white/55 blur-3xl" />
          <div class="absolute right-[-24%] top-[-12%] h-[520px] w-[520px] rounded-full bg-[var(--yunda-petal)]/65 blur-3xl" />
          <div class="absolute bottom-[-18%] right-[-10%] h-[360px] w-[460px] rounded-[60%] bg-white/60 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-[1960px] w-full px-6 py-16 lg:px-16 lg:py-24">
          <div class="mx-auto max-w-[1480px] border border-[var(--yunda-maple)]/18 rounded-[28px] bg-white/92 p-8 shadow-[0_22px_64px_rgba(64,84,120,0.10)] backdrop-blur-xl lg:p-12">
            <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div class="max-w-4xl">
                <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
                  {{ c.s3Title }}
                </h2>
                <p class="mt-4 text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ c.s3Intro }}
                  <NuxtLink :to="localePath('/partner-ivf-clinics')" class="text-[var(--yunda-maple)] underline underline-offset-4 hover:text-[var(--yunda-bark)]">
                    {{ c.linkPartner }}
                  </NuxtLink>.
                </p>
              </div>
              <div class="flex flex-wrap gap-3 text-sm font-semibold" style="font-family: var(--font-text)">
                <NuxtLink
                  :to="localePath('/surrogacy-process')"
                  class="inline-flex items-center border border-[var(--yunda-maple)]/30 rounded-full bg-[var(--yunda-petal)] px-4 py-2 text-[var(--yunda-maple)] hover:border-[var(--yunda-maple)]/50"
                >
                  {{ c.chipProcess2 }}
                </NuxtLink>
                <NuxtLink
                  :to="localePath('/surrogacy-cost')"
                  class="inline-flex items-center border border-[var(--olive-green)]/30 rounded-full bg-[var(--yunda-petal)] px-4 py-2 text-[var(--olive-green)] hover:border-[var(--olive-green)]/50"
                >
                  {{ c.chipCost2 }}
                </NuxtLink>
              </div>
            </div>

            <div class="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div class="space-y-6">
                <div class="border border-[var(--yunda-maple)]/30 rounded-[24px] bg-[var(--yunda-petal)] p-6 shadow-[0_16px_40px_rgba(64,84,120,0.10)]">
                  <div class="mb-3 inline-flex items-center rounded-full bg-[var(--yunda-maple)]/60 px-5 py-2 text-sm text-[var(--yunda-petal)] font-semibold" style="font-family: var(--font-text)">
                    {{ c.labTag }}
                  </div>
                  <p class="text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                    {{ c.labBody }}
                  </p>
                </div>

                <div class="border border-[var(--yunda-maple)]/30 rounded-[24px] bg-white p-6 shadow-[0_16px_40px_rgba(64,84,120,0.10)]">
                  <div class="mb-3 inline-flex items-center rounded-full bg-[var(--olive-green)] px-5 py-2 text-sm text-[var(--yunda-petal)] font-semibold" style="font-family: var(--font-text)">
                    {{ c.scheduleTag }}
                  </div>
                  <p class="text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                    {{ c.scheduleBody }}
                  </p>
                </div>
              </div>

              <div class="flex items-start justify-center">
                <div class="max-w-[520px] w-full overflow-hidden border border-[var(--yunda-maple)]/20 rounded-[28px] bg-[var(--yunda-petal)] shadow-[0_22px_52px_rgba(64,84,120,0.12)]">
                  <picture>
                    <source srcset="/images/ip/surrogacy-insurance.png" type="image/png">
                    <img
                      src="/images/ip/surrogacy-insurance.png"
                      :alt="c.illustrationAlt"
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
      </section>

      <section class="relative w-full overflow-hidden from-[var(--yunda-petal)] via-white to-[var(--yunda-petal)] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-18%] top-[-12%] h-[380px] w-[420px] rounded-full bg-white/55 blur-3xl" />
          <div class="absolute right-[-22%] top-[-14%] h-[540px] w-[540px] rounded-full bg-[var(--yunda-petal)]/65 blur-3xl" />
          <div class="absolute bottom-[-20%] right-[-12%] h-[360px] w-[460px] rounded-[60%] bg-white/60 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-[1960px] w-full px-6 py-16 lg:px-16 lg:py-24">
          <div class="mx-auto max-w-[1480px] border border-[var(--yunda-maple)]/18 rounded-[28px] bg-white/92 p-8 shadow-[0_22px_64px_rgba(64,84,120,0.10)] backdrop-blur-xl lg:p-12">
            <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div class="flex items-start gap-4">
                <picture class="hidden h-16 w-16 overflow-hidden border border-[var(--yunda-maple)]/25 rounded-full bg-[var(--yunda-petal)] shadow-[0_10px_28px_rgba(64,84,120,0.12)] lg:block">
                  <source srcset="/images/surrogacy/i-s-3.png" type="image/png">
                  <img src="/images/surrogacy/i-s-3.png" alt="Insurance coverage illustration" class="h-full w-full object-cover">
                </picture>
                <div>
                  <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
                    {{ c.s4Title }}
                  </h2>
                  <p class="mt-4 text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                    {{ c.s4Intro }}
                    <NuxtLink :to="localePath('/surrogacy-cost')" class="text-[var(--yunda-maple)] underline underline-offset-4 hover:text-[var(--yunda-bark)]">
                      {{ c.linkCost }}
                    </NuxtLink>
                    <span class="mx-1">·</span>
                    <NuxtLink :to="localePath('/surrogacy-process')" class="text-[var(--yunda-maple)] underline underline-offset-4 hover:text-[var(--yunda-bark)]">
                      {{ c.linkProcess3 }}
                    </NuxtLink>.
                  </p>
                </div>
              </div>
            </div>

            <div class="grid gap-6 lg:grid-cols-2">
              <div class="border border-[var(--yunda-maple)]/35 rounded-[26px] bg-[var(--yunda-petal)] p-6 shadow-[0_18px_40px_rgba(64,84,120,0.10)]">
                <div class="mb-4 inline-flex items-center rounded-full bg-[var(--yunda-maple)]/60 px-6 py-2 text-sm text-[var(--yunda-petal)] font-semibold" style="font-family: var(--font-text)">
                  {{ c.usTag }}
                </div>
                <p class="mb-4 text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ c.usIntro }}
                </p>
                <ul class="text-base text-[var(--yunda-bark)] leading-[1.75] space-y-3 lg:text-lg" style="font-family: var(--font-text)">
                  <li v-for="item in c.usList" :key="item">
                    {{ item }}
                  </li>
                </ul>
                <p class="mt-4 text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ c.usClosing }}
                </p>
              </div>

              <div class="border border-[var(--yunda-maple)]/35 rounded-[26px] bg-[var(--yunda-petal)] p-6 shadow-[0_18px_40px_rgba(64,84,120,0.10)]">
                <div class="mb-4 inline-flex items-center rounded-full bg-[var(--olive-green)] px-6 py-2 text-sm text-[var(--yunda-petal)] font-semibold" style="font-family: var(--font-text)">
                  {{ c.intlTag }}
                </div>
                <p class="mb-4 text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ c.intlIntro }}
                </p>
                <ul class="text-base text-[var(--yunda-bark)] leading-[1.75] space-y-3 lg:text-lg" style="font-family: var(--font-text)">
                  <li v-for="item in c.intlList" :key="item">
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative w-full overflow-hidden from-[var(--yunda-petal)] via-white to-[var(--yunda-petal)] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-18%] top-[-10%] h-[340px] w-[420px] rounded-full bg-white/55 blur-3xl" />
          <div class="absolute right-[-24%] top-[-12%] h-[520px] w-[520px] rounded-full bg-[var(--yunda-petal)]/65 blur-3xl" />
          <div class="absolute bottom-[-18%] right-[-10%] h-[360px] w-[460px] rounded-[60%] bg-white/60 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-[1960px] w-full px-6 py-16 lg:px-16 lg:py-24">
          <div class="mx-auto max-w-[1480px] border border-[var(--yunda-maple)]/18 rounded-[28px] bg-white/92 p-8 shadow-[0_22px_64px_rgba(64,84,120,0.10)] backdrop-blur-xl lg:p-12">
            <div class="mb-10">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
                {{ c.s5Title }}
              </h2>
              <p class="mt-4 text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                {{ c.s5Intro }}
                <NuxtLink :to="localePath('/surrogacy-protection-california')" class="text-[var(--yunda-maple)] underline underline-offset-4 hover:text-[var(--yunda-bark)]">
                  {{ c.linkProtect }}
                </NuxtLink>
                <span />
                <NuxtLink :to="localePath('/surrogacy-process')" class="text-[var(--yunda-maple)] underline underline-offset-4 hover:text-[var(--yunda-bark)]">
                  {{ c.linkProcess4 }}
                </NuxtLink>.
              </p>
            </div>

            <div class="mb-10 border border-[var(--yunda-maple)]/25 rounded-[26px] bg-[var(--yunda-petal)]/80 p-4 shadow-[0_18px_48px_rgba(64,84,120,0.12)]">
              <div class="grid gap-3 lg:grid-cols-4 sm:grid-cols-2">
                <div
                  v-for="(photo, idx) in asrmPhotos"
                  :key="photo"
                  class="overflow-hidden rounded-[20px] bg-white shadow-[0_12px_26px_rgba(64,84,120,0.10)]"
                >
                  <img :src="photo" :alt="`${c.s5PhotoAlt} ${idx + 1}`" class="h-full w-full object-cover" loading="lazy" decoding="async">
                </div>
              </div>
            </div>

            <div class="grid gap-6 lg:grid-cols-2">
              <div class="h-full border border-[var(--yunda-maple)]/30 rounded-[22px] bg-[var(--yunda-petal)]/80 p-5 shadow-[0_16px_40px_rgba(64,84,120,0.10)]">
                <div class="mb-3 inline-flex items-center rounded-full bg-[var(--yunda-maple)] px-5 py-2 text-sm text-[var(--yunda-petal)] font-semibold" style="font-family: var(--font-text)">
                  {{ c.medicalTag }}
                </div>
                <p class="text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ c.medicalBody }}
                </p>
              </div>

              <div class="h-full border border-[var(--yunda-maple)]/30 rounded-[22px] bg-white p-5 shadow-[0_16px_40px_rgba(64,84,120,0.10)]">
                <div class="mb-3 inline-flex items-center rounded-full bg-[var(--yunda-maple)]/70 px-5 py-2 text-sm text-[var(--yunda-petal)] font-semibold" style="font-family: var(--font-text)">
                  {{ c.bestTag }}
                </div>
                <p class="text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ c.bestBody }}
                </p>
              </div>

              <div class="h-full border border-[var(--yunda-maple)]/30 rounded-[22px] bg-[var(--yunda-petal)] p-5 shadow-[0_16px_40px_rgba(64,84,120,0.10)]">
                <div class="mb-3 inline-flex items-center rounded-full bg-[var(--olive-green)] px-5 py-2 text-sm text-[var(--yunda-petal)] font-semibold" style="font-family: var(--font-text)">
                  {{ c.psyTag }}
                </div>
                <p class="text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ c.psyBody }}
                </p>
              </div>

              <div class="h-full border border-[var(--yunda-maple)]/30 rounded-[22px] bg-[var(--yunda-petal)]/80 p-5 shadow-[0_16px_40px_rgba(64,84,120,0.10)]">
                <div class="mb-3 inline-flex items-center rounded-full bg-[var(--olive-green)] px-5 py-2 text-sm text-[var(--yunda-petal)] font-semibold" style="font-family: var(--font-text)">
                  {{ c.learnTag }}
                </div>
                <p class="text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                  {{ c.learnBodyPrefix }}
                  <NuxtLink :to="localePath('/surrogacy-process')" class="text-[var(--yunda-maple)] underline underline-offset-4 hover:text-[var(--yunda-bark)]">
                    {{ c.learnBodyMid }}
                  </NuxtLink>
                  {{ c.learnBodySuffix }}
                  <NuxtLink :to="localePath('/surrogacy-cost')" class="text-[var(--yunda-maple)] underline underline-offset-4 hover:text-[var(--yunda-bark)]">
                    {{ c.learnBodyCost }}
                  </NuxtLink>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="relative w-full overflow-hidden from-[var(--yunda-petal)] via-white to-[var(--yunda-petal)] bg-gradient-to-b">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-16%] top-[-12%] h-[340px] w-[420px] rounded-full bg-white/55 blur-3xl" />
          <div class="absolute right-[-20%] top-[-10%] h-[520px] w-[520px] rounded-full bg-[var(--yunda-petal)]/65 blur-3xl" />
          <div class="absolute bottom-[-16%] right-[-10%] h-[360px] w-[440px] rounded-[60%] bg-white/60 blur-3xl" />
        </div>

        <div class="relative mx-auto max-w-[1960px] w-full px-6 py-16 lg:px-16 lg:py-24">
          <div class="mx-auto max-w-[1480px] border border-[var(--yunda-maple)]/18 rounded-[28px] bg-white/92 p-8 shadow-[0_22px_64px_rgba(64,84,120,0.10)] backdrop-blur-xl lg:p-12">
            <div class="mb-8">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] sm:text-[32px] lg:text-[36px]">
                {{ c.s6Title }}
              </h2>
              <p class="mt-3 text-base text-[var(--yunda-bark)]/85 leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
                {{ c.s6Intro }}
              </p>
            </div>

            <div class="space-y-4">
              <details
                v-for="(faq, idx) in c.faqs"
                :key="faq.q"
                class="group border border-[var(--yunda-maple)]/25 rounded-[18px] p-4 shadow-[0_14px_32px_rgba(64,84,120,0.10)]" :class="[
                  idx % 2 === 0 ? 'bg-[var(--yunda-petal)]' : 'bg-white',
                ]"
              >
                <summary class="flex cursor-pointer items-center justify-between gap-4 text-base text-[var(--yunda-bark)] font-semibold" style="font-family: var(--font-text)">
                  {{ idx + 1 }}) {{ faq.q }}
                  <span class="text-[var(--yunda-maple)] transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <p class="mt-3 text-base text-[var(--yunda-bark)] leading-[1.75] lg:text-[18px]" style="font-family: var(--font-text)">
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

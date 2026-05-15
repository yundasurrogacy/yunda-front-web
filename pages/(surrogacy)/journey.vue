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
    seoTitle: 'Surrogacy Process: How It Works Step by Step | Yunda Surrogacy',
    seoDescription:
      'Learn how the surrogacy process works step by step, from screening and matching to IVF, legal planning, birth, and postpartum support.',
    heroTitle: 'The Surrogate Process, Step by Step',
    conclusionLabel: 'Conclusion',
    heroConclusion:
      'The surrogate process is a guided journey from application and screening to matching, embryo transfer, pregnancy, delivery, and postpartum support.',
    heroSubtitle:
      'See how the surrogate journey works-from application and screening to matching, embryo transfer, pregnancy, delivery, and postpartum support.',
    primaryCta: 'View Process Steps',
    secondaryCta: 'Surrogate Application',
    heroImageAlt: 'Step-by-step surrogate process journey overview',
    features: [
      'A clear step-by-step process from start to postpartum',
      'Coordinated support for medical, legal, and practical milestones',
      'Respectful guidance so you feel informed, prepared, and supported',
    ],
    onPageTitle: 'On this page, you’ll learn:',
    onPageItems: [
      'how the journey begins and what happens first',
      'what to expect during screening and matching',
      'how transfer, pregnancy, and delivery are supported',
      'what postpartum care and follow-up can look like',
    ],
    processTitle: 'What Is the Surrogate Mother Process?',
    processBody1:
      'The surrogate mother process is a guided pregnancy journey with clear steps and support from start to finish. If you are asking what is surrogate mother process, it begins with your application and an initial review of your health and pregnancy history.',
    processBody2:
      'Next comes screening (medical, psychological, and insurance checks) so everyone moves forward safely. After approval, you enter matching, where we pair you with intended parents based on comfort, communication style, and practical needs.',
    processBody3:
      'Then the clinic prepares you for embryo transfer through monitoring and medications. Once transfer happens, you are supported through pregnancy milestones, routine care, and planning for delivery.',
    processLinksPrefix: 'You can also review',
    processLinkApplication: 'application requirements',
    processLinksMiddle1: ',',
    processLinkScreening: 'the screening guide',
    processLinksMiddle2: ', and',
    processLinkProcess: 'the full surrogacy process overview',
    processLinksSuffix: 'to prepare each step in advance.',
    processPathTitle: 'Step-by-Step Path (Plain Terms)',
    processPathIntro: 'So what is the process of surrogate mother in plain terms?',
    processSteps: [
      'Apply',
      'Get screened',
      'Get matched',
      'Complete medical clearance',
      'Embryo transfer',
      'Pregnancy support',
      'Birth',
      'Postpartum care and wrap-up',
    ],
    howWorksTitle: 'How Does the Surrogate Process Work? (Surrogate Steps at a Glance)',
    howWorksTocLabel: '7 Steps Directory',
    howWorksTocHint: 'Jump to each step:',
    howWorksSteps: [
      {
        title: 'Step 1 - Apply & Pre-Qualify',
        body: 'To begin, you submit an application and basic health history. We review pregnancy history, overall wellness, and lifestyle factors. This step helps confirm you are a good fit before you invest time in deeper screening.',
      },
      {
        title: 'Step 2 - Medical, Insurance & Psychological Screening',
        body: 'This is where how does the surrogate process work becomes real and structured. Clinics review records, labs, and a physical evaluation. Insurance is checked for maternity coverage, and psychological screening helps ensure you feel supported and ready.',
      },
      {
        title: 'Step 3 - Matching With Intended Parents',
        body: 'Matching is not rushed. We look at comfort level, communication style, and practical expectations. These surrogate steps are meant to create a respectful relationship, so the journey feels steady for everyone.',
      },
      {
        title: 'Step 4 - Legal Contract + Escrow Setup',
        body: 'Both sides review and sign a surrogacy agreement. This protects you, clarifies responsibilities, and defines reimbursements and support. Escrow is typically set up so payments and expenses are handled in a safe, organized way.',
      },
      {
        title: 'Step 5 - Clinic Cycle Prep & Embryo Transfer',
        body: 'The clinic prepares your body for transfer with monitoring and medications. Then the embryo transfer is scheduled. This is often what people mean when they ask "surrogate how does it work" in terms of getting pregnant: surrogates get pregnant through embryo transfer, not natural conception.',
      },
      {
        title: 'Step 6 - Pregnancy Care & Ongoing Support',
        body: 'After pregnancy is confirmed, you continue prenatal care and routine checkups. We support communication, scheduling, and practical needs, so you do not feel alone managing appointments and milestones.',
      },
      {
        title: 'Step 7 - Delivery, Parentage Steps & Postpartum Wrap-Up',
        body: 'As birth approaches, we confirm the hospital plan and coordination steps. After delivery, intended parents complete parentage paperwork, and you receive postpartum support and follow-up. The goal is a safe birth and a respectful finish to the journey.',
      },
    ],
    howWorksImageTitle: 'Journey Highlights',
    howWorksImages: [
      {
        src: '/images/gc/gc-pic/Surrogate-Process-Work-1.png',
        alt: 'Surrogate journey application and screening stage',
      },
      {
        src: '/images/gc/gc-pic/Surrogate-Process-Work-2.png',
        alt: 'Surrogate matching and legal coordination stage',
      },
      {
        src: '/images/gc/gc-pic/Surrogate-Process-Work-3.png',
        alt: 'Embryo transfer to pregnancy and delivery stage',
      },
    ],
    compareTitle: 'Surrogate vs. Gestational Carrier: What is the Difference?',
    compareIntent:
      'Intent: clarify definitions and differences in one place, so traditional surrogacy and gestational surrogacy are not mixed up.',
    compareGestationalTitle: 'What is a gestational surrogate?',
    compareGestationalBody1:
      'A gestational surrogate (also called a gestational carrier) is a woman who carries a pregnancy created through IVF and embryo transfer. If you are searching what is a gestational surrogate or what is a gestational surrogate mother, the key point is simple: she carries the baby, but the embryo is created using an egg and sperm from the intended parents or donors.',
    compareGestationalBody2:
      'This is the most common model in the U.S., and it is what many people mean when they talk about modern surrogacy.',
    compareDiffTitle: 'Surrogate vs gestational carrier: what is the difference?',
    compareDiffBody1:
      'When people search surrogate vs gestational carrier (or gestational carrier vs surrogate), they are often trying to avoid confusion with traditional surrogacy.',
    compareDiffLabel: 'The difference between surrogate and gestational carrier is genetic connection:',
    compareDiffItems: [
      {
        title: 'Gestational carrier',
        body: 'No genetic link to the baby.',
      },
      {
        title: 'Traditional surrogate',
        body: 'Uses her own egg, so she is genetically related.',
      },
    ],
    compareDiffBody2:
      'Most agencies and clinics today focus on gestational surrogacy because it supports clearer medical planning and parentage protection.',
    compareLinksPrefix: 'For context, you can also review',
    compareLink1: 'the step-by-step surrogate process',
    compareLinksMiddle: 'and',
    compareLink2: 'medical screening requirements',
    compareLinksSuffix: '.',
    dnaTitle: 'Does a Surrogate Share DNA (or Blood) With the Baby?',
    dnaBody1:
      'In most modern surrogacy, the surrogate is a gestational carrier and does not provide the egg. So does a surrogate share DNA with the baby or does a surrogate mother share dna with the baby? Usually, no. The baby DNA comes from the egg and sperm used to create the embryo.',
    dnaBody2:
      'People also ask does a surrogate mother share blood with the baby. The surrogate and baby are connected through the placenta, but they do not mix blood in the way many people assume. The baby has its own blood supply.',
    dnaFaqs: [
      {
        q: 'Does a surrogate share DNA with the baby?',
        a: 'Usually no in gestational surrogacy, because the surrogate does not provide the egg.',
      },
      {
        q: 'Does a surrogate mother share blood with the baby?',
        a: 'They are connected through the placenta, but they do not share one mixed blood supply.',
      },
    ],
    dnaTakeawayTitle: 'Key Takeaway',
    dnaTakeawayBody:
      'Most modern journeys are gestational surrogacy: no genetic link from surrogate to baby, and no direct blood mixing.',
    dnaLinksPrefix: 'If needed, compare',
    dnaLink1: 'gestational carrier vs traditional surrogate',
    dnaLinksMiddle: 'in this section and revisit',
    dnaLink2: 'the full process timeline',
    dnaLinksSuffix: 'for step-by-step context.',
    pregSupportTitle: 'Pregnancy Support (Surrogate Pregnancy Process From Trimester to Delivery)',
    pregSupportSections: [
      {
        title: 'Surrogate pregnancy process (trimester to delivery)',
        body: 'The surrogate pregnancy process is steady and routine: prenatal visits, ultrasounds, and trimester check-ins with your OB. If you are asking how does surrogate pregnancy work, it starts with early confirmation and monitoring, then shifts into regular prenatal care and delivery planning.',
        image: '/images/gc/gc-pic/Pregnancy-Support-1.png',
        imageAlt: 'Prenatal care and trimester support in surrogacy',
      },
      {
        title: 'Communication, support, and coordination',
        body: 'We help set a comfortable update rhythm with intended parents and keep expectations clear. We also support scheduling, travel needs (if any), and hospital planning so you are not managing everything alone.',
        image: '/images/gc/gc-pic/Pregnancy-Support-2.png',
        imageAlt: 'Surrogacy communication and coordination support',
      },
      {
        title: 'Reimbursements and allowances during pregnancy',
        body: 'Pregnancy has real costs: transportation, meals, childcare, and time. Your agreement outlines what is reimbursable and how payments are handled.',
        image: '/images/gc/gc-pic/Pregnancy-Support-3.png',
        imageAlt: 'Pregnancy reimbursements and allowances overview',
      },
      {
        title: 'The "fourth trimester" is part of the surrogate mother process',
        body: 'Delivery is not the finish line. The surrogate mother process includes postpartum recovery: physical rest, follow-up appointments, and time to heal. We encourage a calm pace and practical support, especially in the first weeks.',
        image: '/images/gc/gc-pic/Pregnancy-Support-4.png',
        imageAlt: 'Postpartum recovery support after surrogate delivery',
      },
    ],
    faqTitle: 'Surrogate Process FAQ: How Does Being a Surrogate Mother Work?',
    faqItems: [
      {
        q: '1) How does being a surrogate mother work?',
        a: 'It is a step-by-step journey: apply, complete screening, get matched, sign legal agreements, prepare for embryo transfer, go through pregnancy care, then delivery and postpartum support.',
      },
      {
        q: '2) How does a surrogate work?',
        a: 'A surrogate carries a pregnancy for intended parents. In most U.S. cases, pregnancy happens through IVF embryo transfer, and the surrogate does not use her own egg.',
      },
      {
        q: '3) How does surrogate work (from start to finish)?',
        a: 'You apply, your health and insurance are reviewed, you match with intended parents, then the clinic prepares you for transfer. After pregnancy is confirmed, you follow routine prenatal care until birth.',
      },
      {
        q: '4) How do surrogates work with intended parents?',
        a: 'Most relationships are built on clear expectations: how often you share updates, how appointments are handled, and what boundaries feel comfortable. We help keep communication respectful.',
      },
      {
        q: '5) How does surrogate work if I already had my tubes tied?',
        a: 'In gestational surrogacy, pregnancy comes from embryo transfer, not natural conception. Tubes tied often does not block eligibility, but the clinic still reviews your medical history.',
      },
      {
        q: '6) What does a surrogate mother do during the pregnancy?',
        a: 'You attend prenatal visits, follow medical guidance, and share agreed updates. You are supported with scheduling help, practical planning, and reimbursement rules defined in advance.',
      },
      {
        q: '7) How does a surrogate get pregnant?',
        a: 'Through embryo transfer at a fertility clinic. The clinic prepares the uterus, transfers an embryo, then confirms pregnancy with bloodwork and early monitoring.',
      },
      {
        q: '8) Does a surrogate share DNA with the baby?',
        a: 'Usually no. In gestational surrogacy, the surrogate does not provide the egg, so the baby DNA comes from the egg and sperm used to create the embryo.',
      },
      {
        q: '9) How long does the surrogate process take?',
        a: 'Timelines vary, but the biggest factors are screening speed, matching pace, and clinic scheduling. Many journeys take months from application to transfer, then pregnancy follows.',
      },
      {
        q: '10) What happens after birth in the surrogate process?',
        a: 'Postpartum recovery and follow-up care come first. Then remaining reimbursements and payments are closed out through escrow, and future contact boundaries are respected.',
      },
    ],
  },
  zh: {
    seoTitle: '代孕流程：一步一步了解如何运作 | Yunda',
    seoDescription:
      '了解代孕流程如何一步一步运作，从筛查和匹配到 IVF、法律规划、分娩和产后支持。',
    heroTitle: '代孕流程：代孕妈妈是如何进行的（分步妊娠旅程）',
    conclusionLabel: '结论',
    heroConclusion:
      '代孕流程是一条有指引、分步骤推进的妊娠旅程：从申请与筛查开始，经过匹配、胚胎移植、孕期管理、分娩，再到产后支持。现代代孕大多采用妊娠代母模式，因此代母通常不与宝宝共享 DNA。我们的工作是让每一步都清晰可预期，协助沟通与流程衔接，让你在整个旅程中都被尊重、被支持。',
    heroSubtitle:
      '我们将按步骤说明代孕流程：筛查、匹配、胚胎移植、孕期支持、分娩和产后支持，并解答妊娠代母与 DNA 的常见疑问。',
    primaryCta: '开始申请',
    secondaryCta: 'Surrogate Application',
    heroImageAlt: '代孕流程分步妊娠旅程示意图',
    features: [
      '从申请到产后支持的完整路径',
      '妊娠代母与 DNA 关系清晰说明',
      '医疗与沟通协同支持',
    ],
    onPageTitle: '本页你将了解：',
    onPageItems: [
      '旅程如何开始，以及第一步是什么',
      '筛查与匹配阶段通常会经历什么',
      '移植、孕期与分娩如何被支持',
      '产后支持与随访通常如何安排',
    ],
    processTitle: '什么是代孕妈妈流程？',
    processBody1:
      '代孕妈妈流程是一条有明确步骤、全程有人支持的妊娠旅程。如果你在问“代孕妈妈流程是什么”，它通常从提交申请开始，并进行你健康情况与既往妊娠史的初步评估。',
    processBody2:
      '接下来是筛查阶段，包括医学、心理和保险核查，确保各方在安全前提下推进。审核通过后进入匹配，我们会根据沟通风格、舒适度与实际需求为你匹配意向父母。',
    processBody3:
      '之后诊所会通过监测与用药帮助你准备胚胎移植。移植完成后，你将持续获得孕期里程碑管理、常规产检支持和分娩规划支持。',
    processLinksPrefix: '你也可以先查看',
    processLinkApplication: '申请要求',
    processLinksMiddle1: '、',
    processLinkScreening: '筛查指南',
    processLinksMiddle2: '以及',
    processLinkProcess: '完整代孕流程',
    processLinksSuffix: '，提前了解每个阶段。',
    processPathTitle: '用一句话理解分步路径',
    processPathIntro: '“代孕妈妈流程”用最直白的话就是：',
    processSteps: [
      '提交申请',
      '完成筛查',
      '进入匹配',
      '通过医疗清关',
      '胚胎移植',
      '孕期支持',
      '分娩',
      '产后照护与结案',
    ],
    howWorksTitle: '代孕流程如何运作？（7步总览）',
    howWorksTocLabel: '7步目录导航',
    howWorksTocHint: '点击可跳转到对应步骤：',
    howWorksSteps: [
      {
        title: 'Step 1 - 提交申请与预评估',
        body: '流程起点是提交申请和基础健康信息。我们会先看你的妊娠史、整体健康状态和生活方式因素，帮助你在进入深度筛查前先确认是否匹配。',
      },
      {
        title: 'Step 2 - 医疗、保险与心理筛查',
        body: '这是“代孕流程如何运作”真正变得清晰且结构化的阶段。诊所会审核病历、化验结果并进行体检；同时核查生育相关保险保障；心理评估则帮助确认你在情绪和支持层面都准备充分。',
      },
      {
        title: 'Step 3 - 与意向父母匹配',
        body: '匹配不会被仓促推进。我们会综合沟通风格、舒适度和实际期待来判断是否合适。这些步骤的目标是建立彼此尊重的关系，让后续旅程更稳定。',
      },
      {
        title: 'Step 4 - 法律合同与监管账户（Escrow）',
        body: '双方会审核并签署代孕协议，明确责任、费用报销和支持条款，保障你的权益。通常也会同步设立 Escrow 账户，让补偿与费用支付更安全、有序。',
      },
      {
        title: 'Step 5 - 周期准备与胚胎移植',
        body: '诊所会通过监测和用药为移植做准备，随后安排胚胎移植。很多人问“代孕是怎么怀孕的”，核心就在这一步：代母是通过胚胎移植妊娠，而非自然受孕。',
      },
      {
        title: 'Step 6 - 孕期照护与持续支持',
        body: '确认妊娠后，你会继续进行产检和常规随访。我们持续协助沟通、排期和实际事务支持，让你在每个里程碑阶段都不需要独自应对。',
      },
      {
        title: 'Step 7 - 分娩、亲权流程与产后收尾',
        body: '临近分娩时会确认医院计划和协同安排。分娩后，意向父母完成亲权相关手续，你也会得到产后跟进支持。目标是安全分娩，并以尊重、清晰的方式完成整个旅程。',
      },
    ],
    howWorksImageTitle: '流程场景图',
    howWorksImages: [
      {
        src: '/images/process/surrogacy-process-1.png',
        alt: '代孕申请与筛查阶段',
      },
      {
        src: '/images/process/surrogacy-process-2.png',
        alt: '代孕匹配与法律阶段',
      },
      {
        src: '/images/process/surrogacy-process-3.png',
        alt: '胚胎移植到孕期分娩阶段',
      },
    ],
    compareTitle: '代母（Surrogate）与妊娠代母（Gestational Carrier）有什么区别？',
    compareIntent:
      '意图：一次讲清定义与差异，避免把传统代孕与妊娠代孕混淆。',
    compareGestationalTitle: '什么是妊娠代母（gestational surrogate）？',
    compareGestationalBody1:
      '妊娠代母（也常称 gestational carrier）是指通过 IVF 与胚胎移植来承载妊娠的女性。如果你在搜索“what is a gestational surrogate / what is a gestational surrogate mother”，核心点很简单：她负责怀孕，但胚胎来自意向父母或捐赠方的卵子与精子组合。',
    compareGestationalBody2:
      '这是当前美国最常见的模式，也是多数人提到“现代代孕”时所指的类型。',
    compareDiffTitle: 'Surrogate vs gestational carrier：差异到底是什么？',
    compareDiffBody1:
      '当用户搜索 surrogate vs gestational carrier（或 gestational carrier vs surrogate）时，通常是在避免与传统代孕的概念混淆。',
    compareDiffLabel: '两者最关键的区别在于是否与宝宝存在遗传关联：',
    compareDiffItems: [
      {
        title: '妊娠代母（Gestational carrier）',
        body: '与宝宝没有遗传关系。',
      },
      {
        title: '传统代母（Traditional surrogate）',
        body: '使用自己的卵子，因此与宝宝存在遗传关系。',
      },
    ],
    compareDiffBody2:
      '目前大多数机构和诊所聚焦妊娠代孕，因为它在医疗路径与亲权保护上更清晰。',
    compareLinksPrefix: '你也可以结合',
    compareLink1: '代孕分步流程',
    compareLinksMiddle: '与',
    compareLink2: '医学筛查要求',
    compareLinksSuffix: '一起理解。',
    dnaTitle: '代母会与宝宝共享 DNA（或血液）吗？',
    dnaBody1:
      '在现代代孕中，代母通常是妊娠代母，不提供卵子。所以“代母会和宝宝共享 DNA 吗（does a surrogate share DNA）？”大多数情况下答案是否定的。宝宝 DNA 来源于形成胚胎时使用的卵子和精子。',
    dnaBody2:
      '很多人也会问“代母会和宝宝共用血液吗（does a surrogate mother share blood）？”。代母与宝宝通过胎盘进行物质交换，但并不是很多人理解的“血液混在一起”；宝宝有自己的独立血液循环。',
    dnaFaqs: [
      {
        q: '代母会和宝宝共享 DNA 吗？',
        a: '在妊娠代孕里通常不会，因为代母不提供卵子。',
      },
      {
        q: '代母会和宝宝共用血液吗？',
        a: '通过胎盘连接，但不是同一套混合血液循环。',
      },
    ],
    dnaTakeawayTitle: '核心结论',
    dnaTakeawayBody:
      '现代代孕大多是妊娠代孕：代母与宝宝通常无遗传关联，也不存在直接“混血”关系。',
    dnaLinksPrefix: '如需进一步区分，可回看本节的',
    dnaLink1: '妊娠代母 vs 传统代母',
    dnaLinksMiddle: '并结合',
    dnaLink2: '完整流程时间线',
    dnaLinksSuffix: '理解全局。',
    pregSupportTitle: '孕期支持（从孕期各阶段到分娩的代孕妊娠流程）',
    pregSupportSections: [
      {
        title: '代孕妊娠流程（从孕期阶段到分娩）',
        body: '代孕妊娠流程通常是稳定、规律推进的：产检、超声检查，以及按孕期阶段进行的 OB 随访。如果你在问“代孕妊娠是怎么运作的”，它会从早期确认与监测开始，随后进入常规产检与分娩规划。',
        image: '/images/process/i-s-1.png',
        imageAlt: '代孕孕期产检与阶段支持',
      },
      {
        title: '沟通、支持与协同安排',
        body: '我们会帮助你和意向父母建立舒适的沟通频率，并提前明确预期。同时协助你处理排期、必要出行与医院计划，避免你独自承担所有协调工作。',
        image: '/images/process/i-s-2.png',
        imageAlt: '代孕沟通与流程协同支持',
      },
      {
        title: '孕期报销与补贴安排',
        body: '孕期会产生真实成本，例如交通、餐食、育儿照看与时间投入。你的协议会明确哪些费用可报销，以及款项如何执行与结算。',
        image: '/images/process/i-s-3.png',
        imageAlt: '孕期费用报销与补贴说明',
      },
      {
        title: '“第四孕期”也是代母流程的一部分',
        body: '分娩并不是终点。代母流程也包含产后恢复：身体休养、复诊随访与恢复时间。尤其在产后最初几周，我们鼓励以平稳节奏推进并提供务实支持。',
        image: '/images/process/i-s-4.png',
        imageAlt: '分娩后恢复与产后支持',
      },
    ],
    faqTitle: '代孕流程 FAQ：代孕妈妈是如何运作的？',
    faqItems: [
      {
        q: '1）代孕妈妈是如何运作的？',
        a: '整体是分步骤推进的旅程：申请、完成筛查、进入匹配、签署法律协议、准备胚胎移植、进入孕期照护，最后分娩与产后支持。',
      },
      {
        q: '2）代母的流程是怎样工作的？',
        a: '代母为意向父母承载妊娠。多数美国案例通过 IVF 胚胎移植实现妊娠，代母通常不使用自己的卵子。',
      },
      {
        q: '3）从头到尾代孕流程是怎样的？',
        a: '先申请，再进行健康与保险审核，随后与意向父母匹配，诊所进行移植前准备。确认妊娠后，按常规产检节奏推进直到分娩。',
      },
      {
        q: '4）代母如何与意向父母协作？',
        a: '多数关系建立在清晰预期上：更新频率、就诊安排、边界与沟通方式。我们会协助保持尊重、稳定的沟通。',
      },
      {
        q: '5）如果我已经结扎，还能做代母吗？',
        a: '妊娠代孕通过胚胎移植而不是自然受孕，所以结扎通常不直接阻断资格，但诊所仍会完整评估你的医疗史。',
      },
      {
        q: '6）代母在孕期具体做什么？',
        a: '按时产检、遵循医疗建议，并按约定进行进度更新。同时你会获得排期协助、实际支持和明确的报销规则。',
      },
      {
        q: '7）代母是如何怀孕的？',
        a: '通过生殖诊所进行胚胎移植。诊所先准备子宫环境，再移植胚胎，并通过抽血和早期监测确认妊娠。',
      },
      {
        q: '8）代母会和宝宝共享 DNA 吗？',
        a: '通常不会。妊娠代孕中代母不提供卵子，宝宝 DNA 来自形成胚胎时使用的卵子和精子。',
      },
      {
        q: '9）整个代孕流程大概需要多久？',
        a: '时间因人而异，主要受筛查速度、匹配节奏和诊所排期影响。很多旅程从申请到移植需要数月，之后进入孕期阶段。',
      },
      {
        q: '10）代孕流程里分娩后会发生什么？',
        a: '优先是产后恢复和复诊跟进。之后根据协议与 Escrow 流程完成剩余报销和款项结算，并尊重后续联系边界。',
      },
    ],
  },
}

const c = computed(() => ((locale.value || '').startsWith('zh') ? translations.zh : translations.en))
const pagePath = '/journey'
const stripStepPrefix = (value: string) => value.replace(/^Step\s+\d+\s*[-–—]\s*/i, '').trim()
const schemaJourneySteps = computed(() =>
  c.value.howWorksSteps.map((step, index) => ({
    position: index + 1,
    name: stripStepPrefix(step.title),
    description: step.body,
    url: `${pagePath}#journey-step-${index + 1}`,
  })),
)
const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: c.value.heroTitle,
  description: c.value.seoDescription,
  about: 'Gestational carrier journey and surrogate process',
  audience: 'Gestational carriers / surrogates',
  service: {
    name: 'Gestational Carrier Journey Support',
    serviceType: 'Gestational carrier process coordination',
    areaServed: ['California', 'United States'],
    audience: 'Gestational carriers / surrogates',
    description: 'Support for gestational carriers through application, screening, matching, legal contract review, embryo transfer, pregnancy care, delivery coordination, and postpartum follow-up.',
  },
  breadcrumbs: [
    { name: 'Home', url: '/' },
    { name: 'Surrogates', url: '/be-surrogate' },
    { name: 'Surrogate Journey', url: pagePath },
  ],
  faqs: c.value.faqItems.map(item => ({
    question: item.q,
    answer: item.a,
  })),
  itemList: {
    name: '7 Steps Directory',
    description: c.value.heroSubtitle,
    items: schemaJourneySteps.value,
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
    key: `schema-journey-${index}`,
    type: 'application/ld+json',
    children: JSON.stringify(schema),
  })),
}))
</script>

<template>
  <div>
    <AppHeader />
    <main>
      <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b pb-14 pt-24 lg:pt-28">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/35 rounded-[24px] bg-[var(--yunda-petal)] shadow-[0_12px_26px_rgba(39,31,24,0.07)]">
            <div class="grid items-center gap-10 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-14">
              <div class="max-w-[780px]">
                <h1 class="font-display text-[38px] text-[var(--yunda-bark)] font-semibold leading-[1.1] lg:text-[50px]">
                  {{ c.heroTitle }}
                </h1>
                <p class="mt-3 text-3.5 text-[var(--yunda-bark)] leading-relaxed opacity-85 lg:text-5" style="font-family: var(--font-text)">
                  {{ c.heroSubtitle }}
                </p>
                <div class="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href="#journey-step-1"
                    class="inline-flex w-full border border-transparent sm:w-[360px] min-h-[68px] items-center justify-center rounded-[12px] bg-[var(--yunda-bark)] px-8 py-5 text-4 text-[var(--yunda-petal)] font-extrabold tracking-[0.02em] shadow-[0_6px_14px_rgba(169,108,66,0.2)] transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                 ">
                    {{ c.primaryCta }}
                  </a>
                  <NuxtLink
                    :to="localePath('/be-surrogate')"
                    class="inline-flex w-full border border-[var(--primary-brown)]/45 sm:w-[360px] min-h-[68px] items-center justify-center gap-2 rounded-[12px] bg-white/88 px-8 py-5 text-4 text-[var(--primary-brown)] font-extrabold tracking-[0.02em] shadow-[0_6px_14px_rgba(39,31,24,0.06)] transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                 ">
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
                      :key="`journey-onpage-${index}`"
                      class="flex items-start gap-2.5 text-3.4 text-[var(--yunda-bark)]/84 leading-relaxed lg:text-4"
                      style="font-family: var(--font-text)"
                   ">
                      <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary-brown)]/75" />
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="flex items-center justify-center lg:justify-end">
                <div class="max-w-[520px] w-full overflow-hidden border border-white/65 rounded-[20px] bg-white/85 shadow-[0_14px_34px_rgba(64,84,120,0.08)]">
                  <img
                    src="/images/gc/gc-pic/Surrogate-Mother-Process.png"
                    :alt="c.heroImageAlt"
                    width="520"
                    height="380"
                    class="h-[380px] w-full object-cover"
                    loading="eager"
                    decoding="async"
                 ">
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
          <div class="overflow-hidden border border-[var(--primary-brown)]/20 rounded-[18px] bg-white/92 shadow-[0_16px_34px_rgba(39,31,24,0.06)]">
            <div class="grid gap-8 px-6 py-8 lg:grid-cols-[1.08fr_0.92fr] lg:px-10 lg:py-10">
              <div>
                <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
                  {{ c.processTitle }}
                </h2>
                <p class="mt-4 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.5" style="font-family: var(--font-text)">
                  {{ c.processBody1 }}
                </p>
                <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.5" style="font-family: var(--font-text)">
                  {{ c.processBody2 }}
                </p>
                <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.5" style="font-family: var(--font-text)">
                  {{ c.processBody3 }}
                </p>
                <p class="mt-5 text-3.5 text-[var(--yunda-bark)]/76 leading-relaxed" style="font-family: var(--font-text)">
                  {{ c.processLinksPrefix }}
                  <NuxtLink :to="localePath('/become-a-surrogate')" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                    {{ c.processLinkApplication }}
                  </NuxtLink>
                  <span class="mx-1">{{ c.processLinksMiddle1 }}</span>
                  <NuxtLink :to="localePath('/screening')" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                    {{ c.processLinkScreening }}
                  </NuxtLink>
                  <span class="mx-1">{{ c.processLinksMiddle2 }}</span>
                  <NuxtLink :to="localePath('/surrogacy-process')" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                    {{ c.processLinkProcess }}
                  </NuxtLink>
                  <span>{{ c.processLinksSuffix }}</span>
                </p>
              </div>

              <aside class="border border-[var(--primary-brown)]/20 rounded-[14px] from-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b p-5 lg:p-6">
                <h3 class="text-4.8 text-[var(--yunda-bark)] font-semibold font-bold leading-tight lg:text-[24px]" style="font-family: var(--font-text)">
                  {{ c.processPathTitle }}
                </h3>
                <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/80 leading-relaxed lg:text-4.3" style="font-family: var(--font-text)">
                  {{ c.processPathIntro }}
                </p>
                <ol class="grid mt-5 gap-2.5">
                  <li
                    v-for="(step, index) in c.processSteps"
                    :key="`process-step-${index}`"
                    class="flex items-start gap-3 border border-[var(--primary-brown)]/20 rounded-[10px] bg-white/88 px-3.5 py-2.5"
                 ">
                    <span class="mt-0.4 h-6 w-6 inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--yunda-bark)] text-3 text-[var(--yunda-petal)] font-semibold">
                      {{ index + 1 }}
                    </span>
                    <span class="text-3.5 text-[var(--yunda-bark)]/84 leading-relaxed" style="font-family: var(--font-text)">
                      {{ step }}
                    </span>
                  </li>
                </ol>
              </aside>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b pb-22 lg:pb-26">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[18px] bg-white/92 shadow-[0_16px_34px_rgba(39,31,24,0.06)]">
            <div class="px-6 py-8 lg:px-10 lg:py-10">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
                {{ c.howWorksTitle }}
              </h2>

              <div class="mt-6 border border-[var(--primary-brown)]/20 rounded-[14px] bg-[var(--yunda-petal)]/80 p-4 lg:p-5">
                <div class="flex flex-wrap items-center gap-2 text-3.3 lg:text-3.7">
                  <span class="inline-flex items-center rounded-full bg-[var(--primary-brown)]/12 px-3 py-1 text-[var(--primary-brown)] font-semibold">
                    {{ c.howWorksTocLabel }}
                  </span>
                  <span class="text-[var(--yunda-bark)]/78" style="font-family: var(--font-text)">
                    {{ c.howWorksTocHint }}
                  </span>
                </div>
                <div class="mt-3 flex flex-wrap gap-2.5">
                  <a
                    v-for="(step, index) in c.howWorksSteps"
                    :key="`toc-step-${index}`"
                    :href="`#journey-step-${index + 1}`"
                    class="inline-flex items-center gap-2 border border-[var(--primary-brown)]/28 rounded-full bg-white/92 px-3.5 py-1.5 text-3.2 text-[var(--yunda-bark)]/86 leading-none transition-all duration-200 hover:border-[var(--primary-brown)]/45 hover:bg-[var(--yunda-petal)]"
                    style="font-family: var(--font-text)"
                 ">
                    <span class="h-5 w-5 inline-flex items-center justify-center rounded-full bg-[var(--primary-brown)] text-2.7 text-[var(--yunda-petal)] font-semibold">
                      {{ index + 1 }}
                    </span>
                    <span>{{ step.title }}</span>
                  </a>
                </div>
              </div>

              <div class="grid mt-6 gap-4">
                <article
                  v-for="(step, index) in c.howWorksSteps"
                  :id="`journey-step-${index + 1}`"
                  :key="`journey-step-card-${index}`"
                  class="scroll-mt-28 border border-[var(--primary-brown)]/20 rounded-[14px] bg-white/95 px-5 py-5 shadow-[0_10px_24px_rgba(39,31,24,0.05)] lg:px-6 lg:py-5"
               ">
                  <div class="flex items-start gap-3">
                    <span class="mt-0.2 h-7 w-7 inline-flex shrink-0 items-center justify-center rounded-full bg-[var(--yunda-bark)] text-3 text-[var(--yunda-petal)] font-semibold">
                      {{ index + 1 }}
                    </span>
                    <div>
                      <h3 class="text-4.4 text-[var(--yunda-bark)] font-semibold leading-tight lg:text-5.4">
                        {{ step.title }}
                      </h3>
                      <p class="mt-2 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                        {{ step.body }}
                      </p>
                    </div>
                  </div>
                </article>
              </div>

              <div class="mt-8 border-t border-[var(--primary-brown)]/16 pt-6">
                <h3 class="text-4.8 text-[var(--yunda-bark)] font-semibold font-bold leading-tight lg:text-[24px]" style="font-family: var(--font-text)">
                  {{ c.howWorksImageTitle }}
                </h3>
                <div class="grid mt-4 gap-4 lg:grid-cols-3 sm:grid-cols-2">
                  <div
                    v-for="(image, index) in c.howWorksImages"
                    :key="`how-works-image-${index}`"
                    class="overflow-hidden border border-[var(--primary-brown)]/22 rounded-[12px] bg-[var(--yunda-petal)]/82 shadow-[0_10px_24px_rgba(39,31,24,0.05)]"
                 ">
                    <img
                      :src="image.src"
                      :alt="image.alt"
                      width="520"
                      height="320"
                      class="h-[500px] w-full object-cover"
                      loading="lazy"
                      decoding="async"
                   ">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full bg-[var(--yunda-petal)] pb-18 lg:pb-22">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[18px] bg-white/94 shadow-[0_16px_34px_rgba(39,31,24,0.06)]">
            <div class="px-6 py-8 lg:px-10 lg:py-10">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
                {{ c.compareTitle }}
              </h2>
              <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/76 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                {{ c.compareIntent }}
              </p>

              <div class="grid mt-6 gap-5 lg:grid-cols-2">
                <article class="border border-[var(--primary-brown)]/20 rounded-[14px] bg-[var(--yunda-petal)]/78 px-5 py-5">
                  <h3 class="text-4.8 text-[var(--yunda-bark)] font-semibold font-bold leading-tight lg:text-[24px]" style="font-family: var(--font-text)">
                    {{ c.compareGestationalTitle }}
                  </h3>
                  <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/83 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                    {{ c.compareGestationalBody1 }}
                  </p>
                  <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/83 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                    {{ c.compareGestationalBody2 }}
                  </p>
                </article>

                <article class="border border-[var(--yunda-bark)]/60 rounded-[14px] bg-[var(--yunda-petal)]/48 px-5 py-5">
                  <h3 class="text-4.8 text-[var(--yunda-bark)] font-semibold font-bold leading-tight lg:text-[24px]" style="font-family: var(--font-text)">
                    {{ c.compareDiffTitle }}
                  </h3>
                  <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/83 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                    {{ c.compareDiffBody1 }}
                  </p>
                  <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/86 font-semibold leading-relaxed lg:text-4.2" style="font-family: var(--font-text)">
                    {{ c.compareDiffLabel }}
                  </p>
                  <ul class="grid mt-3 gap-2.5">
                    <li
                      v-for="(item, index) in c.compareDiffItems"
                      :key="`compare-diff-${index}`"
                      class="flex items-start gap-2.5 border border-[var(--yunda-bark)]/45 rounded-[10px] bg-white/84 px-3.5 py-3"
                   ">
                      <Icon name="radix-icons:check-circled" class="mt-0.4 h-4 w-4 shrink-0 text-[var(--primary-brown)]" />
                      <p class="text-3.4 text-[var(--yunda-bark)]/84 leading-relaxed" style="font-family: var(--font-text)">
                        <span class="font-semibold">{{ item.title }}:</span>
                        <span class="ml-1">{{ item.body }}</span>
                      </p>
                    </li>
                  </ul>
                  <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/83 leading-relaxed lg:text-4.4" style="font-family: var(--font-text)">
                    {{ c.compareDiffBody2 }}
                  </p>
                </article>
              </div>

              <p class="mt-5 text-3.5 text-[var(--yunda-bark)]/76 leading-relaxed" style="font-family: var(--font-text)">
                {{ c.compareLinksPrefix }}
                <NuxtLink :to="localePath('/surrogacy-process')" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                  {{ c.compareLink1 }}
                </NuxtLink>
                <span class="mx-1">{{ c.compareLinksMiddle }}</span>
                <NuxtLink :to="localePath('/screening')" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                  {{ c.compareLink2 }}
                </NuxtLink>
                <span>{{ c.compareLinksSuffix }}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b pb-24 lg:pb-28">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[18px] bg-white/94 shadow-[0_16px_34px_rgba(39,31,24,0.06)]">
            <div class="px-6 py-8 lg:px-10 lg:py-10">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
                {{ c.dnaTitle }}
              </h2>

              <div class="grid mt-6 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <div>
                  <p class="text-3.5 text-[var(--yunda-bark)]/83 leading-relaxed lg:text-4.5" style="font-family: var(--font-text)">
                    {{ c.dnaBody1 }}
                  </p>
                  <p class="mt-3 text-3.5 text-[var(--yunda-bark)]/83 leading-relaxed lg:text-4.5" style="font-family: var(--font-text)">
                    {{ c.dnaBody2 }}
                  </p>

                  <div class="mt-5 border border-[var(--primary-brown)]/24 rounded-[12px] bg-[var(--yunda-petal)]/82 px-4 py-4">
                    <h3 class="text-4.4 text-[var(--yunda-bark)] font-semibold leading-tight lg:text-5.2">
                      {{ c.dnaTakeawayTitle }}
                    </h3>
                    <p class="mt-2 text-3.5 text-[var(--yunda-bark)]/84 leading-relaxed lg:text-4.3" style="font-family: var(--font-text)">
                      {{ c.dnaTakeawayBody }}
                    </p>
                  </div>
                </div>

                <aside class="grid content-start gap-3">
                  <article
                    v-for="(item, index) in c.dnaFaqs"
                    :key="`dna-faq-${index}`"
                    class="border border-[var(--yunda-bark)]/55 rounded-[12px] bg-white/92 px-4 py-4"
                 ">
                    <h3 class="text-4 text-[var(--yunda-bark)] font-semibold leading-tight lg:text-4.8">
                      {{ item.q }}
                    </h3>
                    <p class="mt-2 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.3" style="font-family: var(--font-text)">
                      {{ item.a }}
                    </p>
                  </article>
                </aside>
              </div>

              <p class="mt-5 text-3.5 text-[var(--yunda-bark)]/76 leading-relaxed" style="font-family: var(--font-text)">
                {{ c.dnaLinksPrefix }}
                <a href="#journey-step-5" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                  {{ c.dnaLink1 }}
                </a>
                <span class="mx-1">{{ c.dnaLinksMiddle }}</span>
                <NuxtLink :to="localePath('/surrogacy-process')" class="mx-1 text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/45 underline-offset-4 hover:opacity-80">
                  {{ c.dnaLink2 }}
                </NuxtLink>
                <span>{{ c.dnaLinksSuffix }}</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full bg-[var(--yunda-petal)] pb-24 lg:pb-30">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[18px] bg-white/94 shadow-[0_16px_34px_rgba(39,31,24,0.06)]">
            <div class="px-6 py-8 lg:px-10 lg:py-10">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
                {{ c.pregSupportTitle }}
              </h2>

              <div class="grid mt-6 gap-5">
                <article
                  v-for="(item, index) in c.pregSupportSections"
                  :key="`preg-support-${index}`"
                  class="grid items-center gap-4 border border-[var(--primary-brown)]/18 rounded-[14px] bg-[var(--yunda-petal)]/76 p-4 lg:grid-cols-[1.04fr_0.96fr] lg:gap-6 lg:p-5"
               ">
                  <div>
                    <h3 class="text-4.3 text-[var(--yunda-bark)] font-semibold leading-tight lg:text-5.1">
                      {{ item.title }}
                    </h3>
                    <p class="mt-2 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.3" style="font-family: var(--font-text)">
                      {{ item.body }}
                    </p>
                  </div>
                  <div class="mx-auto aspect-square max-w-[360px] w-full overflow-hidden border border-[var(--primary-brown)]/20 rounded-[12px] bg-white/92 shadow-[0_10px_24px_rgba(39,31,24,0.05)] lg:mx-0 lg:max-w-[440px] lg:justify-self-end">
                    <img
                      :src="item.image"
                      :alt="item.imageAlt"
                      width="520"
                      height="520"
                      class="h-full w-full object-cover"
                      loading="lazy"
                      decoding="async"
                   ">
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="w-full from-[var(--yunda-petal)] via-[var(--yunda-petal)] to-[var(--yunda-petal)] bg-gradient-to-b pb-26 lg:pb-32">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[18px] bg-white/94 shadow-[0_16px_34px_rgba(39,31,24,0.06)]">
            <div class="px-6 py-8 lg:px-10 lg:py-10">
              <h2 class="font-display text-[30px] text-[var(--yunda-bark)] font-medium leading-[1.15] lg:text-[36px]">
                {{ c.faqTitle }}
              </h2>

              <div class="grid mt-6 gap-3.5 lg:grid-cols-2">
                <article
                  v-for="(item, index) in c.faqItems"
                  :key="`journey-faq-${index}`"
                  class="border border-[var(--primary-brown)]/18 rounded-[12px] bg-[var(--yunda-petal)]/78 px-4 py-4 shadow-[0_8px_20px_rgba(39,31,24,0.04)]"
               ">
                  <h3 class="text-4.2 text-[var(--yunda-bark)] font-semibold leading-tight lg:text-4.8">
                    {{ item.q }}
                  </h3>
                  <p class="mt-2 text-3.5 text-[var(--yunda-bark)]/82 leading-relaxed lg:text-4.2" style="font-family: var(--font-text)">
                    {{ item.a }}
                  </p>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'

const { locale } = useI18n()
const localePath = useLocalePath()

const translations = {
  en: {
    seoTitle: 'Surrogate Screening: Medical, Insurance & Eligibility | Yunda',
    seoDescription: 'Understand surrogate screening, including medical, insurance, and eligibility checks. Get clear, respectful guidance before you move forward.',
    heroTitle: 'Surrogate Medical Screening Process: What to Expect From Medical, Insurance & Eligibility Checks',
    conclusionBody1:
      'A safe surrogacy journey starts with clarity. The surrogate medical screening process is how we protect the surrogate, the baby, and the intended parents—before anyone invests time, emotion, or money. From clinic exams and record review to insurance checks and eligibility guidance, each step is meant to prevent avoidable surprises and support a steady timeline.',
    heroSubtitle: 'Understand the full surrogate medical screening process, including medical tests, insurance review, and eligibility checks.',
    primaryCta: 'Get Started',
    secondaryCta: 'See Step-by-Step Process',
    features: ['Clinic-Led Screening', 'Insurance Review Support', 'Clear Eligibility Checklist'],
    takeawaysTitle: 'Key Takeaways',
    takeawaysItems: [
      'Clinic checks for surrogate screening',
      'Insurance steps before matching',
      'Post-clearance next steps',
    ],
    candidateTitle: 'What Makes a Strong and Healthy Surrogate Candidate?',
    candidateIntroPrefix:
      'To protect both surrogates and intended parents, and to ensure a healthy, successful journey, all candidates must meet the following medical, lifestyle, and legal requirements. These standards are based on guidelines from top IVF clinics and the American Society for Reproductive Medicine (ASRM).',
    candidateLink1: 'See the screening process',
    candidateMiddle: 'and review the',
    candidateLink2: 'eligibility requirements',
    candidateSuffix: 'before you apply.',
    candidateList: [
      'Age Requirement: 21–40 Years',
      'BMI Requirement: Under 32',
      'Non-Smoking for at Least 12 Months',
      'Drug-Free Lifestyle',
      'At Least One Prior Healthy Pregnancy',
      'No Major Obstetric or Chronic Medical History',
      'Healthy and Stable Lifestyle',
      'Strong Support System',
      'No Criminal or Abuse History',
      'Financial Stability',
    ],
    processTitle: 'Surrogate Medical Screening Process (Step-by-Step): From Application to Medical Clearance',
    processIntroPrefix:
      'This step-by-step path shows how clinical screening moves from application to medical clearance. For context, review',
    processLink1: 'our screening overview',
    processIntroMiddle: 'and the broader',
    processLink2: 'surrogacy process timeline',
    processIntroSuffix: 'to plan legal, insurance, and transfer milestones together.',
    processVisualTitle: 'Surrogate Screening Process',
    processVisualSteps: [
      'Application Review',
      'Baseline Health Checks',
      'Clinic Medical Exam',
      'Cycle Planning',
      'Medical Clearance',
    ],
    processSteps: [
      {
        title: 'Step 1 — Application Review and Record Collection',
        body: 'The surrogate medical screening process begins with a full application and medical history review. We collect key records: pregnancy history, delivery notes, and recent health information, so the clinic can see the full picture early.',
      },
      {
        title: 'Step 2 — Initial Eligibility and Baseline Health Checks',
        body: 'Next, we confirm basic eligibility and order baseline checks. This may include routine lab work, infectious disease screening, and a general health assessment. The goal is to identify risks early, before time and costs add up.',
      },
      {
        title: 'Step 3 — Fertility Clinic Medical Screening and Uterine Evaluation',
        body: 'Your IVF clinic then completes formal surrogate medical screening process steps. This often includes a physical exam, ultrasound, and uterine evaluation to confirm the uterus is ready for a safe transfer and pregnancy.',
      },
      {
        title: 'Step 4 — Medication Readiness and Cycle Planning',
        body: 'Once medical results are cleared, the clinic confirms medication readiness and plans the transfer cycle. This includes timing, monitoring, and what happens if a cycle needs to pause or adjust.',
      },
      {
        title: 'Step 5 — Medical Clearance and Next-Step Confirmation',
        body: 'The final step is medical clearance from the clinic. At this point, you have a clear "yes" to proceed, plus a practical timeline for legal, insurance, and embryo transfer planning.',
      },
    ],
    examTitle: 'What Happens in the Clinic Medical Exam (Tests, Records & Common Outcomes)',
    examIntroPrefix:
      'This section explains what happens during the in-person fertility clinic review. To prepare well, also see',
    examLink1: 'surrogate eligibility standards',
    examIntroMiddle: 'and compare clinic coordination options in',
    examLink2: 'our partner IVF clinics guide',
    examIntroSuffix: '.',
    examVisualTitle: 'Clinic Medical Exam Review',
    examCards: [
      { title: 'Records Review', subtitle: 'Pregnancy and delivery records first', image: '/images/surrogacy/i-s-1.png' },
      { title: 'In-Clinic Testing', subtitle: 'Typical exam and core lab categories', image: '/images/surrogacy/i-s-2.png' },
      { title: 'Obstetric History', subtitle: 'Prior pregnancy details and risk context', image: '/images/surrogacy/i-s-3.png' },
      { title: 'Common Outcomes', subtitle: 'Cleared, follow-up, or not cleared', image: '/images/surrogacy/i-s-4.png' },
    ],
    examSections: [
      {
        title: 'Medical Records Review',
        body: 'In surrogate medical screening, the clinic reviews pregnancy and delivery records first. This often includes prenatal notes, delivery reports, and postpartum history. They also review general health history, surgeries, and medications. The goal is safety and clarity, not judgment.',
      },
      {
        title: 'In-Clinic Testing',
        body: 'The in-person visit usually includes a physical assessment and lab work. Common categories include infectious disease screening and routine blood tests, based on clinic protocol. Many clinics also do an ultrasound and uterine evaluation to confirm readiness for transfer.',
      },
      {
        title: 'Obstetric History Review',
        body: 'Clinics look closely at prior pregnancies, including complications, C-sections, and recovery. This part of surrogate medical screening helps predict pregnancy risk. If something is missing, the clinic may request additional OB records.',
      },
      {
        title: 'Common Outcomes',
        body: 'Most results fall into: cleared, cleared with follow-up, or not cleared. "Follow-up" may mean repeating a lab, updating records, or getting a specialist note. This is common and meant to reduce avoidable risk.',
      },
      {
        title: 'When Extra Testing Is Requested',
        body: 'If a result is borderline or history is complex, clinics may ask for more imaging, a deeper uterine review, or a short specialist consult. These steps help confirm it is safe to move into a transfer cycle.',
      },
    ],
    insuranceBasicsTitle: 'Surrogate Insurance Basics: What Coverage Is Needed Before You\'re Matched',
    insuranceBasicsBody:
      'Coverage checks often include: maternity benefits, coverage for complications, deductible and out-of-pocket limits, and whether the clinic/hospital is in-network or out-of-network. We also look for exclusions that could affect health insurance for surrogate mothers, especially around surrogacy-related pregnancy care.',
    insuranceBasicsChecks: [
      'Maternity benefits and exclusions',
      'Complication coverage limits',
      'Deductible and out-of-pocket maximums',
      'In-network vs out-of-network access',
    ],
    insuranceBasicsLinkPrefix: 'For planning context, compare',
    insuranceBasicsLink1: 'surrogacy cost structure',
    insuranceBasicsLinkMiddle: 'with',
    insuranceBasicsLink2: 'partner IVF clinic coordination',
    insuranceBasicsLinkSuffix: '.',
    maternityOptionsTitle: 'Surrogate Maternity Insurance: Options When You Don\'t Have the Right Plan',
    maternityOptionsIntro:
      'When the current plan is not aligned, families usually evaluate practical paths first, then choose based on timing, eligibility, and local compliance requirements.',
    maternityOptionsLinkPrefix: 'You can also review',
    maternityOptionsLink1: 'screening requirements',
    maternityOptionsLinkMiddle: 'before finalizing',
    maternityOptionsLink2: 'insurance and legal planning',
    maternityOptionsLinkSuffix: '.',
    maternitySections: [
      {
        title: 'Common Paths to Surrogate Maternity Insurance',
        body: 'If the current plan is not a fit, surrogate maternity insurance planning often starts with the surrogate\'s existing employer coverage. Sometimes it can work once maternity benefits, exclusions, and network rules are confirmed. If gaps remain, families may explore an individual plan, or add a supplemental approach to strengthen pregnancy-related coverage. The right path depends on timing, eligibility, and local rules.',
      },
      {
        title: 'How We Help Review Coverage With Compliance and Case-by-Case Care',
        body: 'Surrogate mother insurance decisions should be made carefully. Benefits and exclusions can vary by state, carrier, and personal history, so there is no one-size answer. We help gather policy documents, coordinate an insurance review with experienced partners, and flag risks early, so health insurance for surrogate mothers supports prenatal care, delivery, and potential complications with fewer surprises.',
      },
    ],
    nextStepsTitle: 'What Happens After You\'re Cleared: Matching Timeline and Next Steps',
    nextStepsIntro:
      'After medical clearance, momentum matters. This stage is about converting eligibility into a predictable matching and transfer plan.',
    nextStepsLinkPrefix: 'If needed, revisit the',
    nextStepsLink1: 'medical screening process',
    nextStepsLinkMiddle: 'and the full',
    nextStepsLink2: 'surrogacy process timeline',
    nextStepsLinkSuffix: 'to align milestones.',
    nextStepsSections: [
      {
        title: 'What "Cleared" Means and What You Receive',
        body: 'After you pass the surrogate medical screening process, you receive clear confirmation that the clinic is comfortable moving forward. This usually includes a summary of medical clearance, any notes for follow-up, and guidance on timing for the next phase. You will also know what is ready now: records, labs, and eligibility, so you are not repeating steps later. It is a clean green light that helps the journey stay steady.',
      },
      {
        title: 'Matching Timeline, Then Legal and Cycle Planning',
        body: 'Once cleared, most candidates can move into matching soon, depending on current intended parent needs and profile fit. After you are matched, the next steps typically include legal agreement, insurance review confirmation, and clinic cycle planning for transfer. We stay close through each handoff. If you are ready, reach out and we will walk you through your next milestone calmly, clearly, and step by step.',
      },
    ],
    nextStepsTimeline: [
      'Medical clearance summary delivered',
      'Matching opens based on profile fit',
      'Legal + insurance confirmation',
      'Transfer cycle planning with clinic',
    ],
    nextStepsTimelineTitle: 'Next-Step Timeline',
    nextStepsCta: 'Talk With a Coordinator',
    faqTitle: 'FAQs We Hear Most: HPV, HSV/Herpes, PCOS, Tubes Tied & Menopause',
    faqIntroPrefix:
      'These questions are reviewed case by case through clinic screening. You can also check',
    faqIntroLink1: 'eligibility standards',
    faqIntroMiddle: 'and the',
    faqIntroLink2: 'step-by-step screening process',
    faqIntroSuffix: 'to prepare records in advance.',
    faqItems: [
      {
        q: '1) Can you be a surrogate with HPV?',
        a: 'Sometimes, yes. It depends on your current HPV status, recent test results, and your clinic\'s requirements. The safest answer comes from the clinic\'s medical review during surrogate medical screening.',
      },
      {
        q: '2) Can you be a surrogate with HSV?',
        a: 'In many cases, yes. If you are asking can you be a surrogate with HSV, clinics usually look at outbreak history, current management, and pregnancy safety planning before making a decision.',
      },
      {
        q: '3) Can you be a surrogate with herpes?',
        a: 'Often, it can be considered, but it is case by case. For can you be a surrogate with herpes, clinics focus on stability, treatment plan, and how risks are managed during pregnancy and delivery.',
      },
      {
        q: '4) Can you be a surrogate mother with herpes?',
        a: 'Sometimes, yes. If you are asking can you be a surrogate mother with herpes, your clinic will review medical history and may require a clear management plan to reduce risk near delivery.',
      },
      {
        q: '5) Can you be a surrogate with PCOS?',
        a: 'Possibly. For can you be a surrogate with PCOS, clinics look at overall health, pregnancy history, weight or BMI, blood sugar risk, and how well symptoms are controlled.',
      },
      {
        q: '6) Can you be a surrogate if your tubes are tied?',
        a: 'Often, yes. If you are asking can you be a surrogate if your tubes are tied, it usually does not prevent gestational surrogacy because pregnancy comes from embryo transfer, not natural conception.',
      },
      {
        q: '7) Can you be a surrogate after menopause?',
        a: 'Usually not. Most programs require a surrogate to be in typical reproductive age with a recent healthy pregnancy history.',
      },
      {
        q: '8) Will HPV, HSV, or PCOS automatically disqualify me?',
        a: 'Not always. Many factors can be reviewed: test results, symptom control, and pregnancy history. The clinic\'s screening process is what determines eligibility.',
      },
      {
        q: '9) What documents or tests will the clinic ask for in these cases?',
        a: 'Clinics may request recent OB or GYN records, lab results, pap or HPV reports, and notes on treatment or outbreaks. Sometimes they ask for follow-up labs or a short specialist clearance.',
      },
      {
        q: '10) How do you decide eligibility fairly and safely?',
        a: 'We do not guess and we do not rush. We help collect records, coordinate clinic review, and explain what the medical team needs, so the decision is safe for you and the baby.',
      },
    ],
  },
  zh: {
    seoTitle: 'Surrogate Medical Screening Process',
    seoDescription: '了解完整代母医学筛查流程，包括医疗检查、保险审核与资格清单。',
    heroTitle: '代母医学筛查流程：医疗、保险与资格审查需要了解什么',
    conclusionBody1:
      '安全的代孕旅程始于清晰的信息。代母医学筛查流程在任何人投入时间、情感或资金之前，就用来保护代母、宝宝与意向父母。从诊所检查与病历审核，到保险核查与资格指引，每一步都旨在减少可避免的意外，确保时间线稳定推进。',
    heroSubtitle: '了解完整代母医学筛查流程，包括医疗检查、保险审核与资格清单。',
    primaryCta: '开始咨询',
    secondaryCta: '查看分步流程',
    features: ['诊所主导筛查', '保险审核支持', '清晰资格清单'],
    takeawaysTitle: '要点速览',
    takeawaysItems: [
      '诊所主导的代母筛查与核查',
      '匹配前的保险步骤',
      '清关后的下一步安排',
    ],
    candidateTitle: '什么样的代母更健康、更可靠？',
    candidateIntroPrefix:
      '为了保护代母与意向父母，并确保旅程健康顺利，所有申请者需满足以下医学、生活方式与法律要求。这些标准参考顶级 IVF 诊所及美国生殖医学学会（ASRM）的指导建议。',
    candidateLink1: '查看筛查流程',
    candidateMiddle: '并了解',
    candidateLink2: '资格要求',
    candidateSuffix: '再进行申请。',
    candidateList: [
      '年龄要求：21–40 岁',
      'BMI 要求：低于 32',
      '过去至少 12 个月无吸烟',
      '无毒品使用史',
      '至少一次健康妊娠与分娩经历',
      '无重大产科或慢性疾病史',
      '生活方式健康稳定',
      '具备良好支持系统',
      '无犯罪或虐待记录',
      '具备基本经济稳定性',
    ],
    processTitle: '代母医学筛查流程（分步说明）：从申请到医疗清关',
    processIntroPrefix:
      '以下分步流程展示了代母医学筛查如何从申请推进到医疗清关。你也可以先查看',
    processLink1: '筛查总览',
    processIntroMiddle: '以及完整的',
    processLink2: '代孕流程时间线',
    processIntroSuffix: '，更好地联动法律、保险与移植安排。',
    processVisualTitle: '代母筛查流程',
    processVisualSteps: [
      '申请审核',
      '基础健康检查',
      '诊所体检',
      '周期规划',
      '医疗清关',
    ],
    processSteps: [
      {
        title: '步骤 1 — 申请审核与病历收集',
        body: '代母医学筛查从完整申请与病史审查开始。我们会收集关键记录，包括妊娠史、分娩记录和近期健康信息，帮助诊所尽早形成完整判断。',
      },
      {
        title: '步骤 2 — 初步资格确认与基础健康检查',
        body: '接下来会确认基础资格并安排初筛检查，可能包括常规化验、传染病筛查与一般健康评估。目标是在投入更多时间和费用前尽早识别风险。',
      },
      {
        title: '步骤 3 — 生殖诊所医学筛查与子宫评估',
        body: '随后由 IVF 诊所完成正式医学筛查，通常包含体格检查、超声和子宫评估，以确认子宫是否适合安全移植与妊娠。',
      },
      {
        title: '步骤 4 — 用药准备与周期规划',
        body: '当检查结果通过后，诊所会确认用药准备并制定移植周期计划，包括时间节点、监测安排，以及若需暂停或调整时的处理方式。',
      },
      {
        title: '步骤 5 — 医疗清关与下一步确认',
        body: '最后一步是获得诊所医疗清关。此时你会得到明确可推进信号，并拿到法律、保险与胚胎移植计划的可执行时间线。',
      },
    ],
    examTitle: '诊所医学体检会发生什么（检查、病历与常见结果）',
    examIntroPrefix:
      '本模块细化线下生殖诊所体检环节。建议你同时查看',
    examLink1: '代母资格标准',
    examIntroMiddle: '并参考',
    examLink2: '合作 IVF 诊所指南',
    examIntroSuffix: '以便提前规划。',
    examVisualTitle: '诊所体检审阅',
    examCards: [
      { title: '病历审阅', subtitle: '先看妊娠与分娩记录', image: '/images/surrogacy/i-s-1.png' },
      { title: '诊所体检', subtitle: '常见体检与实验室检查', image: '/images/surrogacy/i-s-2.png' },
      { title: '产科病史', subtitle: '过往妊娠细节与风险判断', image: '/images/surrogacy/i-s-3.png' },
      { title: '常见结论', subtitle: '通过、补充后通过或不通过', image: '/images/surrogacy/i-s-4.png' },
    ],
    examSections: [
      {
        title: '病历审阅',
        body: '在代母医学筛查中，诊所会先审阅妊娠和分娩相关病历，通常包括产检记录、分娩报告和产后情况。同时也会看一般健康史、手术史和用药情况。目标是确保安全和信息清晰，而不是评判。',
      },
      {
        title: '诊所检查',
        body: '线下面诊通常包含基础体格评估和实验室检查。按诊所 protocol，常见包括传染病筛查与常规血检。很多诊所还会安排超声和子宫评估，确认是否具备移植条件。',
      },
      {
        title: '产科病史审阅',
        body: '诊所会重点看既往妊娠情况，如并发症、剖宫产史和恢复过程。这一部分有助于评估妊娠风险。若资料不完整，诊所可能要求补充 OB 病历。',
      },
      {
        title: '常见结果',
        body: '结果通常分为：通过、补充后通过、暂不通过。所谓“补充”，可能是复检某项化验、更新病历或补交专科说明。这很常见，目的就是减少可避免风险。',
      },
      {
        title: '何时会要求额外检查',
        body: '若某项结果临界或病史较复杂，诊所可能要求进一步影像检查、更深入的子宫评估，或简短专科会诊。这些步骤用于确认进入移植周期的安全性。',
      },
    ],
    insuranceBasicsTitle: '代母保险基础：匹配前需要确认哪些保障',
    insuranceBasicsBody:
      '保障核查通常包括：孕产福利、并发症覆盖、免赔额与自付上限，以及诊所/医院是网络内还是网络外。我们也会重点检查可能影响代母妊娠医疗保障的除外条款，尤其是与代孕相关的孕产护理部分。',
    insuranceBasicsChecks: [
      '孕产福利与除外条款',
      '并发症覆盖范围与上限',
      '免赔额与年度自付上限',
      '网络内与网络外就诊规则',
    ],
    insuranceBasicsLinkPrefix: '可先结合',
    insuranceBasicsLink1: '代孕费用结构',
    insuranceBasicsLinkMiddle: '与',
    insuranceBasicsLink2: '合作 IVF 诊所协同',
    insuranceBasicsLinkSuffix: '一起评估。',
    maternityOptionsTitle: '代母孕产保险：当现有方案不匹配时有哪些路径',
    maternityOptionsIntro:
      '当现有保单不匹配时，通常先评估可执行路径，再根据时间窗口、资格条件和当地合规要求做个案决策。',
    maternityOptionsLinkPrefix: '也建议先查看',
    maternityOptionsLink1: '筛查要求',
    maternityOptionsLinkMiddle: '再敲定',
    maternityOptionsLink2: '保险与法律推进计划',
    maternityOptionsLinkSuffix: '。',
    maternitySections: [
      {
        title: '代母孕产保险的常见路径',
        body: '如果当前保单不适配，代母孕产保险规划通常先从代母现有雇主保险开始。确认孕产福利、除外条款和网络规则后，部分情况可以继续使用。若仍有缺口，家庭可评估个人保单，或加入补充方案以增强孕期相关保障。最终路径取决于时间、资格与当地规则。',
      },
      {
        title: '我们如何做合规审阅与个案支持',
        body: '代母保险决策需要谨慎。不同州、不同保险公司及个人健康史都会影响福利与除外条款，没有统一答案。我们会协助整理保单文件，与有经验的合作方进行保险审阅，并尽早标注风险，让代母健康保险更好支持产检、分娩与潜在并发症，减少后续意外。',
      },
    ],
    nextStepsTitle: '通过筛查后会发生什么：匹配时间线与下一步',
    nextStepsIntro:
      '医学清关后，关键是把“可推进”转成明确节奏，让匹配、法律和移植准备持续向前。',
    nextStepsLinkPrefix: '如需回看，可查看',
    nextStepsLink1: '医学筛查流程',
    nextStepsLinkMiddle: '以及完整的',
    nextStepsLink2: '代孕流程时间线',
    nextStepsLinkSuffix: '来对齐节点。',
    nextStepsSections: [
      {
        title: '“通过清关”意味着什么，你会拿到什么',
        body: '当你通过代母医学筛查流程后，你会收到诊所明确可推进的确认。通常包括医疗清关摘要、必要补充说明，以及下一阶段时间建议。你也会清楚目前已就绪的内容，如病历、化验与资格状态，避免后续重复流程。这是让旅程稳定推进的清晰绿灯。',
      },
      {
        title: '进入匹配，然后推进法律与周期规划',
        body: '清关后，大多数候选人会根据当前意向父母需求与档案匹配度较快进入匹配。匹配完成后，通常依次推进：法律协议、保险复核确认、以及诊所移植周期规划。我们会在每个交接点持续跟进。若你准备好了，我们会清晰、稳妥地带你走完下一里程碑。',
      },
    ],
    nextStepsTimeline: [
      '收到医疗清关与摘要',
      '按档案匹配度启动匹配',
      '法律协议与保险确认',
      '与诊所完成移植周期规划',
    ],
    nextStepsTimelineTitle: '下一步时间线',
    nextStepsCta: '联系协调员',
    faqTitle: '高频问题 FAQ：HPV、HSV/疱疹、PCOS、输卵管结扎与更年期',
    faqIntroPrefix:
      '以下问题都需要通过诊所筛查做个案判断。建议先查看',
    faqIntroLink1: '资格标准',
    faqIntroMiddle: '以及',
    faqIntroLink2: '分步筛查流程',
    faqIntroSuffix: '，提前准备资料。',
    faqItems: [
      {
        q: '1）有 HPV 可以做代母吗？',
        a: '有时可以。要看你当前 HPV 状态、近期检测结果以及诊所要求。最可靠答案来自代母医学筛查中的诊所评估。',
      },
      {
        q: '2）有 HSV 可以做代母吗？',
        a: '很多情况可以。如果你关心这个问题，诊所通常会看发作史、当前控制情况和妊娠安全管理计划后再决定。',
      },
      {
        q: '3）有疱疹可以做代母吗？',
        a: '通常可评估，但需个案判断。诊所会重点看病情稳定性、治疗方案，以及孕期和分娩期的风险管理。',
      },
      {
        q: '4）有疱疹还能做代母吗？',
        a: '有时可以。诊所会审阅病史，必要时要求明确管理方案，以降低临近分娩的风险。',
      },
      {
        q: '5）有 PCOS 可以做代母吗？',
        a: '有可能。诊所会评估整体健康、既往妊娠史、体重或 BMI、血糖风险，以及症状控制情况。',
      },
      {
        q: '6）输卵管结扎后还能做代母吗？',
        a: '多数情况下可以。妊娠代孕依赖胚胎移植，而不是自然受孕，因此通常不构成直接障碍。',
      },
      {
        q: '7）更年期后还能做代母吗？',
        a: '通常不可以。大多数项目要求代母处于常规生育年龄范围，并有近期健康妊娠史。',
      },
      {
        q: '8）HPV、HSV 或 PCOS 会自动淘汰吗？',
        a: '不一定。检测结果、症状控制和妊娠史都可综合评估。最终资格以诊所筛查结论为准。',
      },
      {
        q: '9）这类情况诊所会要哪些资料或检查？',
        a: '诊所可能要求近期妇产科病历、化验结果、宫颈或 HPV 报告，以及治疗或发作记录。必要时会补做化验或要求简短专科评估。',
      },
      {
        q: '10）你们如何做到公平且安全地判断资格？',
        a: '我们不会猜测，也不会仓促结论。我们协助收集病历、对接诊所评估，并说明医疗团队需要什么信息，让决定对你和宝宝都更安全。',
      },
    ],
  },
}

const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)
const activeProcessStep = ref(0)
const activeFaqIndex = ref(0)
function selectProcessStep(index: number) {
  activeProcessStep.value = index
}

function selectFaq(index: number) {
  activeFaqIndex.value = index
}

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
  <div>
    <AppHeader />
    <main>
      <section class="w-full from-[var(--head-bg)] via-[var(--light-cream)] to-[var(--head-bg)] bg-gradient-to-b pb-10 pt-24 lg:pt-28">
        <div class="mx-auto max-w-[1760px] w-full px-6 lg:px-16">
          <div class="overflow-hidden border border-[var(--primary-brown)] rounded-[18px] bg-[var(--head-bg)] shadow-[0_18px_36px_rgba(39,31,24,0.08)]">
            <div class="grid items-center gap-10 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-14">
              <div class="max-w-[720px]">
                <h1 class="text-7.5 text-[var(--dark-brown)] font-semibold leading-tight lg:text-10" style="font-family: var(--font-primary)">
                  {{ c.heroTitle }}
                </h1>
                <div class="mt-6">
                  <p class="mt-3 text-3.5 text-[var(--dark-brown)] leading-relaxed opacity-80 lg:text-5" style="font-family: var(--font-secondary)">
                    {{ c.conclusionBody1 }}
                  </p>
                </div>
                <p class="mt-6 text-3.5 text-[var(--dark-brown)] leading-relaxed opacity-75 lg:text-5" style="font-family: var(--font-secondary)">
                  {{ c.heroSubtitle }}
                </p>
                <div class="mt-8 flex flex-wrap items-center gap-3">
                  <NuxtLink
                    :to="localePath('/be-surrogate')"
                    class="inline-flex items-center justify-center rounded-[10px] bg-[var(--primary-brown)] px-6 py-3 text-3.5 text-[#FFFCF6] font-semibold tracking-[0.02em] shadow-[0_10px_18px_rgba(169,108,66,0.28)] transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                  >
                    {{ c.primaryCta }}
                  </NuxtLink>
                  <NuxtLink
                    :to="localePath('/surrogacy-process')"
                    class="inline-flex items-center justify-center border border-[var(--primary-brown)] rounded-[10px] bg-[var(--light-cream)] px-6 py-3 text-3.5 text-[var(--primary-brown)] font-semibold tracking-[0.02em] transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                  >
                    {{ c.secondaryCta }}
                  </NuxtLink>
                </div>
              </div>
              <div class="flex items-center justify-center lg:justify-end">
                <div class="max-w-[520px] w-full overflow-hidden border border-white/70 rounded-[28px] bg-white/85 shadow-[0_24px_60px_rgba(64,84,120,0.10)]">
                  <img
                    src="/images/gc/screening/screening-banner.png"
                    :alt="c.heroTitle"
                    width="520"
                    height="380"
                    class="h-[380px] w-full object-cover"
                    loading="eager"
                    decoding="async"
                  >
                </div>
              </div>
            </div>
            <div class="border-t border-[var(--primary-brown)] bg-[var(--light-cream)] px-6 py-4 lg:px-12">
              <div class="flex flex-wrap items-center justify-start gap-6 text-3 text-[var(--dark-brown)] opacity-80 md:text-3.5" style="font-family: var(--font-secondary)">
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

      <section class="w-full bg-[var(--head-bg)] pb-16 pt-6">
        <div class="mx-auto max-w-[1960px] w-full px-6 lg:px-16">
          <div class="mx-auto max-w-[1400px]">
            <div class="border border-[var(--primary-brown)]/25 rounded-[12px] bg-[#fbf7ef] px-6 py-4 shadow-[0_10px_24px_rgba(39,31,24,0.06)]">
              <div class="flex items-center gap-3 text-3.5 text-[var(--dark-brown)] font-semibold" style="font-family: var(--font-primary)">
                <span class="h-6 w-6 inline-flex items-center justify-center border border-[var(--primary-brown)]/40 rounded-full bg-white/80 text-[var(--primary-brown)]">✓</span>
                <span>{{ c.takeawaysTitle }}</span>
              </div>
              <ul class="grid mt-3 gap-2 text-3.5 text-[var(--dark-brown)]/80 lg:grid-cols-3" style="font-family: var(--font-secondary)">
                <li class="flex items-center gap-2">
                  <span class="h-1.5 w-1.5 rounded-full bg-[var(--primary-brown)]/60" />
                  <span>{{ c.takeawaysItems[0] }}</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="h-1.5 w-1.5 rounded-full bg-[var(--primary-brown)]/60" />
                  <span>{{ c.takeawaysItems[1] }}</span>
                </li>
                <li class="flex items-center gap-2">
                  <span class="h-1.5 w-1.5 rounded-full bg-[var(--primary-brown)]/60" />
                  <span>{{ c.takeawaysItems[2] }}</span>
                </li>
              </ul>
            </div>

            <div class="mt-8 overflow-hidden border border-[var(--primary-brown)]/20 rounded-[18px] bg-white/90 shadow-[0_22px_48px_rgba(39,31,24,0.08)]">
              <div class="grid gap-8 px-6 py-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-10">
                <div>
                  <h2 class="text-6 text-[var(--dark-brown)] font-semibold lg:text-8" style="font-family: var(--font-primary)">
                    {{ c.candidateTitle }}
                  </h2>
                  <p class="mt-4 text-3.5 text-[var(--dark-brown)]/80 leading-relaxed lg:text-5" style="font-family: var(--font-secondary)">
                    {{ c.candidateIntroPrefix }}
                    <NuxtLink :to="localePath('/screening')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/40 underline-offset-4 hover:opacity-80">
                      {{ c.candidateLink1 }}
                    </NuxtLink>
                    <span class="mx-1">{{ c.candidateMiddle }}</span>
                    <NuxtLink :to="localePath('/eligibility')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/40 underline-offset-4 hover:opacity-80">
                      {{ c.candidateLink2 }}
                    </NuxtLink>
                    <span class="ml-1">{{ c.candidateSuffix }}</span>
                  </p>
                  <ul class="grid mt-6 gap-2 text-3.5 text-[var(--dark-brown)]/80 lg:grid-cols-2" style="font-family: var(--font-secondary)">
                    <li v-for="(item, index) in c.candidateList" :key="index" class="flex items-start gap-2">
                      <Icon name="radix-icons:check-circled" class="mt-0.5 h-4 w-4 text-[var(--primary-brown)]" />
                      <span>{{ item }}</span>
                    </li>
                  </ul>
                </div>
                <div class="flex items-end justify-center lg:justify-end">
                  <div class="max-w-[520px] w-full border border-[var(--primary-brown)]/15 rounded-[20px] bg-[#f6f8fb] p-4">
                    <img
                      src="/images/gc/gc-pic/surrogate-medical-screening.png"
                      alt="Candidate eligibility checklist illustration"
                      class="h-[220px] w-full object-contain lg:h-[260px]"
                      loading="lazy"
                      decoding="async"
                    >
                  </div>
                </div>
              </div>
              <div class="h-1 w-full from-[var(--light-cream)] via-[#f0e3cd] to-[var(--light-cream)] bg-gradient-to-r" />
            </div>

            <div class="mt-10 overflow-hidden border border-[var(--primary-brown)]/20 rounded-[18px] bg-white/92 shadow-[0_20px_46px_rgba(39,31,24,0.08)]">
              <div class="px-6 pb-8 pt-8 lg:px-12 lg:pt-10">
                <h2 class="text-6 text-[var(--dark-brown)] font-semibold leading-tight lg:text-8" style="font-family: var(--font-primary)">
                  {{ c.processTitle }}
                </h2>
                <p class="mt-4 text-3.5 text-[var(--dark-brown)]/80 leading-relaxed lg:text-5" style="font-family: var(--font-secondary)">
                  {{ c.processIntroPrefix }}
                  <NuxtLink :to="localePath('/screening')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/40 underline-offset-4 hover:opacity-80">
                    {{ c.processLink1 }}
                  </NuxtLink>
                  <span class="mx-1">{{ c.processIntroMiddle }}</span>
                  <NuxtLink :to="localePath('/surrogacy-process')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/40 underline-offset-4 hover:opacity-80">
                    {{ c.processLink2 }}
                  </NuxtLink>
                  <span class="ml-1">{{ c.processIntroSuffix }}</span>
                </p>

                <div class="mt-8 overflow-hidden border border-[var(--primary-brown)]/25 rounded-[12px] bg-[var(--light-cream)]/45">
                  <div class="border-b border-[var(--primary-brown)]/20 bg-white/70 px-4 py-3 lg:px-6">
                    <h3 class="text-4 text-[var(--dark-brown)] font-semibold lg:text-5" style="font-family: var(--font-primary)">
                      {{ c.processVisualTitle }}
                    </h3>
                  </div>

                  <div class="p-4">
                    <div class="grid gap-2 lg:grid-cols-5">
                      <button
                        v-for="(label, index) in c.processVisualSteps"
                        :key="`process-tab-${index}`"
                        type="button"
                        class="flex items-center gap-2 border rounded-[10px] px-3 py-2.5 text-left transition-all duration-200"
                        :class="activeProcessStep === index ? 'border-[var(--primary-brown)] bg-[var(--light-cream)] shadow-[0_8px_20px_rgba(39,31,24,0.08)]' : 'border-[var(--primary-brown)]/20 bg-white/85 hover:border-[var(--primary-brown)]/40'"
                        @click="selectProcessStep(index)"
                      >
                        <span
                          class="h-6 w-6 inline-flex items-center justify-center border rounded-full text-3 font-semibold"
                          :class="activeProcessStep === index ? 'border-[var(--primary-brown)] bg-[var(--primary-brown)] text-[#FFFCF6]' : 'border-[var(--primary-brown)]/35 bg-white text-[var(--primary-brown)]'"
                          style="font-family: var(--font-primary)"
                        >
                          {{ index + 1 }}
                        </span>
                        <span
                          class="text-2.8 leading-tight lg:text-3"
                          :class="activeProcessStep === index ? 'text-[var(--dark-brown)] font-semibold' : 'text-[var(--dark-brown)]/75 font-medium'"
                          style="font-family: var(--font-secondary)"
                        >
                          {{ label }}
                        </span>
                      </button>
                    </div>

                    <div class="mt-4">
                      <article
                        v-for="(step, index) in c.processSteps"
                        v-show="activeProcessStep === index"
                        :key="`process-content-${index}`"
                        class="border border-[var(--primary-brown)]/25 rounded-[12px] bg-white/90 px-4 py-4 shadow-[0_12px_28px_rgba(39,31,24,0.06)] lg:px-5 lg:py-5"
                      >
                        <h3 class="text-4.5 text-[var(--dark-brown)] font-semibold leading-tight lg:text-6" style="font-family: var(--font-primary)">
                          {{ step.title }}
                        </h3>
                        <p class="mt-2 text-3.5 text-[var(--dark-brown)]/80 leading-relaxed lg:text-4.5" style="font-family: var(--font-secondary)">
                          {{ step.body }}
                        </p>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="mt-10 overflow-hidden border border-[var(--primary-brown)]/20 rounded-[18px] bg-white/92 shadow-[0_20px_46px_rgba(39,31,24,0.08)]">
              <div class="px-6 pb-8 pt-8 lg:px-12 lg:pt-10">
                <h2 class="text-6 text-[var(--dark-brown)] font-semibold leading-tight lg:text-8" style="font-family: var(--font-primary)">
                  {{ c.examTitle }}
                </h2>
                <p class="mt-4 text-3.5 text-[var(--dark-brown)]/80 leading-relaxed lg:text-5" style="font-family: var(--font-secondary)">
                  {{ c.examIntroPrefix }}
                  <NuxtLink :to="localePath('/eligibility')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/40 underline-offset-4 hover:opacity-80">
                    {{ c.examLink1 }}
                  </NuxtLink>
                  <span class="mx-1">{{ c.examIntroMiddle }}</span>
                  <NuxtLink :to="localePath('/partner-ivf-clinics')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/40 underline-offset-4 hover:opacity-80">
                    {{ c.examLink2 }}
                  </NuxtLink>
                  <span class="ml-1">{{ c.examIntroSuffix }}</span>
                </p>

                <div class="mt-8 overflow-hidden border border-[var(--primary-brown)]/20 rounded-[12px] bg-[var(--head-bg)]/80 p-3 lg:p-4">
                  <h3 class="px-2 text-5 text-[var(--dark-brown)] font-semibold lg:text-6" style="font-family: var(--font-primary)">
                    {{ c.examVisualTitle }}
                  </h3>

                  <div class="grid mt-3 gap-3 lg:grid-cols-4">
                    <article
                      v-for="(card, index) in c.examCards"
                      :key="`exam-card-${index}`"
                      class="overflow-hidden border border-[var(--primary-brown)]/18 rounded-[10px] bg-white/90 shadow-[0_10px_24px_rgba(39,31,24,0.06)]"
                    >
                      <div class="h-[110px] border-b border-[var(--primary-brown)]/10 bg-[var(--head-bg)]">
                        <img
                          :src="card.image"
                          :alt="card.title"
                          class="h-full w-full object-cover"
                          loading="lazy"
                          decoding="async"
                        >
                      </div>
                      <div class="px-3 py-3">
                        <h4 class="text-4 text-[var(--dark-brown)] font-semibold leading-tight" style="font-family: var(--font-primary)">
                          {{ card.title }}
                        </h4>
                        <p class="mt-1 text-3 text-[var(--dark-brown)]/70 leading-tight" style="font-family: var(--font-secondary)">
                          {{ card.subtitle }}
                        </p>
                      </div>
                    </article>
                  </div>

                  <div class="mt-4 h-px w-full bg-[var(--primary-brown)]/20" />

                  <div
                    class="mt-3 w-full flex items-center gap-3 border border-[var(--primary-brown)]/30 rounded-[10px] bg-white/90 px-4 py-2.5 text-left"
                  >
                    <span class="h-5 w-5 inline-flex items-center justify-center rounded-full bg-[var(--primary-brown)]/12 text-[var(--primary-brown)]">
                      <Icon name="radix-icons:info-circled" class="h-4 w-4" />
                    </span>
                    <span class="text-4 text-[var(--dark-brown)] font-semibold leading-tight lg:text-4.5" style="font-family: var(--font-primary)">
                      {{ c.examSections[4].title }}
                    </span>
                  </div>
                </div>

                <div class="grid mt-8 gap-4 lg:grid-cols-2">
                  <article
                    v-for="(block, index) in c.examSections.slice(0, 4)"
                    :key="`exam-section-${index}`"
                    class="border border-[var(--primary-brown)]/15 rounded-[12px] bg-white/92 px-4 py-4 shadow-[0_10px_24px_rgba(39,31,24,0.04)]"
                  >
                    <h3 class="text-4 text-[var(--dark-brown)] font-semibold leading-tight lg:text-5" style="font-family: var(--font-primary)">
                      {{ block.title }}
                    </h3>
                    <p class="mt-2 text-3.5 text-[var(--dark-brown)]/80 leading-relaxed lg:text-4.5" style="font-family: var(--font-secondary)">
                      {{ block.body }}
                    </p>
                  </article>
                </div>

                <article class="mt-4 border border-[var(--primary-brown)]/25 rounded-[12px] bg-[var(--light-cream)]/55 px-4 py-4">
                  <h3 class="text-4.5 text-[var(--dark-brown)] font-semibold leading-tight lg:text-5.5" style="font-family: var(--font-primary)">
                    {{ c.examSections[4].title }}
                  </h3>
                  <p class="mt-2 text-3.5 text-[var(--dark-brown)]/80 leading-relaxed lg:text-4.5" style="font-family: var(--font-secondary)">
                    {{ c.examSections[4].body }}
                  </p>
                </article>
              </div>
            </div>

            <div class="mt-10 overflow-hidden border border-[var(--primary-brown)]/20 rounded-[18px] bg-white/95 shadow-[0_20px_46px_rgba(39,31,24,0.08)]">
              <div class="px-6 pb-8 pt-8 lg:px-12 lg:pt-10">
                <h2 class="text-6 text-[var(--dark-brown)] font-semibold leading-tight lg:text-8" style="font-family: var(--font-primary)">
                  {{ c.insuranceBasicsTitle }}
                </h2>
                <p class="mt-4 text-3.5 text-[var(--dark-brown)]/80 leading-relaxed lg:text-5" style="font-family: var(--font-secondary)">
                  {{ c.insuranceBasicsBody }}
                </p>
                <p class="mt-3 text-3.5 text-[var(--dark-brown)]/75 leading-relaxed lg:text-4.5" style="font-family: var(--font-secondary)">
                  {{ c.insuranceBasicsLinkPrefix }}
                  <NuxtLink :to="localePath('/surrogacy-cost')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/40 underline-offset-4 hover:opacity-80">
                    {{ c.insuranceBasicsLink1 }}
                  </NuxtLink>
                  <span class="mx-1">{{ c.insuranceBasicsLinkMiddle }}</span>
                  <NuxtLink :to="localePath('/partner-ivf-clinics')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/40 underline-offset-4 hover:opacity-80">
                    {{ c.insuranceBasicsLink2 }}
                  </NuxtLink>
                  <span class="ml-1">{{ c.insuranceBasicsLinkSuffix }}</span>
                </p>

                <div class="grid mt-6 gap-3 lg:grid-cols-4">
                  <article
                    v-for="(item, index) in c.insuranceBasicsChecks"
                    :key="`insurance-check-${index}`"
                    class="border border-[var(--primary-brown)]/16 rounded-[12px] bg-[var(--head-bg)]/85 px-4 py-4"
                  >
                    <div class="h-6 w-6 inline-flex items-center justify-center rounded-full bg-[var(--primary-brown)] text-3 text-[#FFFCF6] font-semibold" style="font-family: var(--font-primary)">
                      {{ index + 1 }}
                    </div>
                    <p class="mt-2 text-3.5 text-[var(--dark-brown)]/85 leading-snug" style="font-family: var(--font-secondary)">
                      {{ item }}
                    </p>
                  </article>
                </div>
              </div>

              <div class="h-px w-full bg-[var(--primary-brown)]/15" />

              <div class="px-6 pb-8 pt-8 lg:px-12">
                <h2 class="text-6 text-[var(--dark-brown)] font-semibold leading-tight lg:text-8" style="font-family: var(--font-primary)">
                  {{ c.maternityOptionsTitle }}
                </h2>
                <p class="mt-4 text-3.5 text-[var(--dark-brown)]/80 leading-relaxed lg:text-5" style="font-family: var(--font-secondary)">
                  {{ c.maternityOptionsIntro }}
                </p>
                <p class="mt-3 text-3.5 text-[var(--dark-brown)]/75 leading-relaxed lg:text-4.5" style="font-family: var(--font-secondary)">
                  {{ c.maternityOptionsLinkPrefix }}
                  <NuxtLink :to="localePath('/screening')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/40 underline-offset-4 hover:opacity-80">
                    {{ c.maternityOptionsLink1 }}
                  </NuxtLink>
                  <span class="mx-1">{{ c.maternityOptionsLinkMiddle }}</span>
                  <NuxtLink :to="localePath('/surrogacy-process')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/40 underline-offset-4 hover:opacity-80">
                    {{ c.maternityOptionsLink2 }}
                  </NuxtLink>
                  <span class="ml-1">{{ c.maternityOptionsLinkSuffix }}</span>
                </p>

                <div class="grid mt-6 gap-4 lg:grid-cols-2">
                  <article
                    v-for="(item, index) in c.maternitySections"
                    :key="`maternity-section-${index}`"
                    class="border border-[var(--primary-brown)]/18 rounded-[14px] bg-white/92 px-5 py-5 shadow-[0_10px_22px_rgba(39,31,24,0.05)]"
                  >
                    <h3 class="text-4.5 text-[var(--dark-brown)] font-semibold leading-tight lg:text-5.5" style="font-family: var(--font-primary)">
                      {{ item.title }}
                    </h3>
                    <p class="mt-3 text-3.5 text-[var(--dark-brown)]/80 leading-relaxed lg:text-4.5" style="font-family: var(--font-secondary)">
                      {{ item.body }}
                    </p>
                  </article>
                </div>
              </div>

              <div class="h-px w-full bg-[var(--primary-brown)]/15" />

              <div class="px-6 pb-10 pt-8 lg:px-12">
                <h2 class="text-6 text-[var(--dark-brown)] font-semibold leading-tight lg:text-8" style="font-family: var(--font-primary)">
                  {{ c.nextStepsTitle }}
                </h2>
                <p class="mt-4 text-3.5 text-[var(--dark-brown)]/80 leading-relaxed lg:text-5" style="font-family: var(--font-secondary)">
                  {{ c.nextStepsIntro }}
                </p>
                <p class="mt-3 text-3.5 text-[var(--dark-brown)]/75 leading-relaxed lg:text-4.5" style="font-family: var(--font-secondary)">
                  {{ c.nextStepsLinkPrefix }}
                  <NuxtLink :to="localePath('/screening')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/40 underline-offset-4 hover:opacity-80">
                    {{ c.nextStepsLink1 }}
                  </NuxtLink>
                  <span class="mx-1">{{ c.nextStepsLinkMiddle }}</span>
                  <NuxtLink :to="localePath('/surrogacy-process')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/40 underline-offset-4 hover:opacity-80">
                    {{ c.nextStepsLink2 }}
                  </NuxtLink>
                  <span class="ml-1">{{ c.nextStepsLinkSuffix }}</span>
                </p>

                <div class="grid mt-6 gap-5 lg:grid-cols-[1.15fr_0.85fr]">
                  <div class="grid gap-4">
                    <article
                      v-for="(item, index) in c.nextStepsSections"
                      :key="`next-steps-${index}`"
                      class="border border-[var(--primary-brown)]/18 rounded-[14px] bg-white/92 px-5 py-5 shadow-[0_10px_22px_rgba(39,31,24,0.05)]"
                    >
                      <h3 class="text-4.5 text-[var(--dark-brown)] font-semibold leading-tight lg:text-5.5" style="font-family: var(--font-primary)">
                        {{ item.title }}
                      </h3>
                      <p class="mt-3 text-3.5 text-[var(--dark-brown)]/80 leading-relaxed lg:text-4.5" style="font-family: var(--font-secondary)">
                        {{ item.body }}
                      </p>
                    </article>
                  </div>

                  <aside class="border border-[var(--primary-brown)]/25 rounded-[14px] from-[var(--light-cream)] to-[var(--head-bg)] bg-gradient-to-b p-5">
                    <h3 class="text-4.5 text-[var(--dark-brown)] font-semibold lg:text-5.5" style="font-family: var(--font-primary)">
                      {{ c.nextStepsTimelineTitle }}
                    </h3>
                    <ol class="grid mt-4 gap-3">
                      <li
                        v-for="(item, index) in c.nextStepsTimeline"
                        :key="`next-timeline-${index}`"
                        class="flex items-start gap-3"
                      >
                        <span class="mt-0.5 h-6 w-6 inline-flex items-center justify-center rounded-full bg-[var(--primary-brown)] text-3 text-[#FFFCF6] font-semibold" style="font-family: var(--font-primary)">
                          {{ index + 1 }}
                        </span>
                        <span class="text-3.5 text-[var(--dark-brown)]/85 leading-relaxed" style="font-family: var(--font-secondary)">
                          {{ item }}
                        </span>
                      </li>
                    </ol>
                    <NuxtLink
                      :to="localePath('/be-surrogate')"
                      class="mt-6 inline-flex items-center justify-center rounded-[10px] bg-[var(--primary-brown)] px-5 py-2.5 text-3.5 text-[#FFFCF6] font-semibold shadow-[0_10px_18px_rgba(169,108,66,0.28)] transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                    >
                      {{ c.nextStepsCta }}
                    </NuxtLink>
                  </aside>
                </div>
              </div>
            </div>

            <div class="mt-10 overflow-hidden border border-[var(--primary-brown)]/20 rounded-[18px] bg-white/95 shadow-[0_20px_46px_rgba(39,31,24,0.08)]">
              <div class="px-6 pb-8 pt-8 lg:px-12 lg:pt-10">
                <h2 class="text-6 text-[var(--dark-brown)] font-semibold leading-tight lg:text-8" style="font-family: var(--font-primary)">
                  {{ c.faqTitle }}
                </h2>
                <p class="mt-4 text-3.5 text-[var(--dark-brown)]/80 leading-relaxed lg:text-5" style="font-family: var(--font-secondary)">
                  {{ c.faqIntroPrefix }}
                  <NuxtLink :to="localePath('/eligibility')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/40 underline-offset-4 hover:opacity-80">
                    {{ c.faqIntroLink1 }}
                  </NuxtLink>
                  <span class="mx-1">{{ c.faqIntroMiddle }}</span>
                  <NuxtLink :to="localePath('/screening')" class="mx-1 inline-flex items-center text-[var(--primary-brown)] underline decoration-[var(--primary-brown)]/40 underline-offset-4 hover:opacity-80">
                    {{ c.faqIntroLink2 }}
                  </NuxtLink>
                  <span class="ml-1">{{ c.faqIntroSuffix }}</span>
                </p>

                <div class="grid mt-6 gap-4 lg:grid-cols-[0.95fr_1.05fr]">
                  <div class="grid gap-2">
                    <h3
                      v-for="(item, index) in c.faqItems"
                      :key="`faq-q-${index}`"
                    >
                      <button
                        type="button"
                        class="w-full flex items-center justify-between gap-3 border rounded-[10px] px-3.5 py-3 text-left transition-all duration-200"
                        :class="activeFaqIndex === index ? 'border-[var(--primary-brown)] bg-[var(--light-cream)] shadow-[0_8px_20px_rgba(39,31,24,0.08)]' : 'border-[var(--primary-brown)]/20 bg-white hover:border-[var(--primary-brown)]/40'"
                        @click="selectFaq(index)"
                      >
                        <span class="text-3.5 leading-snug" :class="activeFaqIndex === index ? 'text-[var(--dark-brown)] font-semibold' : 'text-[var(--dark-brown)]/82 font-medium'" style="font-family: var(--font-secondary)">
                          {{ item.q }}
                        </span>
                        <span
                          class="h-6 w-6 inline-flex items-center justify-center border rounded-full text-3 transition-transform duration-200"
                          :class="activeFaqIndex === index ? 'border-[var(--primary-brown)] bg-[var(--primary-brown)] rotate-45 text-[#FFFCF6]' : 'border-[var(--primary-brown)]/30 bg-white text-[var(--primary-brown)]'"
                          aria-hidden="true"
                        >
                          +
                        </span>
                      </button>
                    </h3>
                  </div>

                  <article class="border border-[var(--primary-brown)]/25 rounded-[12px] bg-[var(--head-bg)]/85 p-5 shadow-[0_10px_22px_rgba(39,31,24,0.05)] lg:min-h-[420px]">
                    <h3 class="text-4.5 text-[var(--dark-brown)] font-semibold leading-tight lg:text-5.5" style="font-family: var(--font-primary)">
                      {{ c.faqItems[activeFaqIndex].q }}
                    </h3>
                    <p class="mt-4 text-3.5 text-[var(--dark-brown)]/82 leading-relaxed lg:text-4.5" style="font-family: var(--font-secondary)">
                      {{ c.faqItems[activeFaqIndex].a }}
                    </p>
                    <div class="mt-6 h-px w-full bg-[var(--primary-brown)]/16" />
                    <NuxtLink
                      :to="localePath('/be-surrogate')"
                      class="mt-5 inline-flex items-center justify-center rounded-[10px] bg-[var(--primary-brown)] px-5 py-2.5 text-3.5 text-[#FFFCF6] font-semibold shadow-[0_10px_18px_rgba(169,108,66,0.28)] transition-all duration-300 hover:opacity-90 hover:-translate-y-0.5"
                    >
                      {{ c.nextStepsCta }}
                    </NuxtLink>
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <AppFooter />
  </div>
</template>

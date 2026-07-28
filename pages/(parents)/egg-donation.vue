<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import BreadcrumbNav from '@/components/base/BreadcrumbNav.vue'
import OptimizedPicture from '@/components/base/OptimizedPicture.vue'
import SeoTrustNote from '@/components/base/SeoTrustNote.vue'
import { buildCoreServicePageSchemas } from '~/utils/schema'

const localePath = useLocalePath()
const { locale } = useI18n()
const runtimeConfig = useRuntimeConfig()
const siteUrl = computed(() => (runtimeConfig.public.siteUrl || '').replace(/\/$/, ''))
const pagePath = '/egg-donation'

const translations = {
  en: {
    seoTitle: 'Egg Donor Surrogacy Guide for Intended Parents | Yunda',
    seoDescription:
      'Understand egg donor surrogacy, screening, fresh vs. frozen eggs, IVF coordination, costs, timelines, and next steps for intended parents across the U.S.',
    breadcrumbParent: 'For Intended Parents',
    breadcrumbCurrent: 'Egg Donor Surrogacy',
    heroEyebrow: 'Donor egg planning + gestational surrogacy',
    heroTitle: 'Egg Donor Surrogacy: A Guide for Intended Parents',
    heroLead:
      'Egg donor surrogacy combines two separate parts of family building: donor eggs are used to create embryos through IVF, and a gestational surrogate carries the pregnancy. The egg donor and surrogate are different people.',
    heroBody:
      'Yunda helps intended parents organize the handoffs between donor resources, IVF clinics, embryo planning, surrogate matching, legal coordination, insurance review, and cross-border logistics. Medical decisions and donor eligibility determinations stay with the responsible clinics and qualified professionals.',
    heroPrimary: 'Discuss Your Donor Egg Plan',
    heroSecondary: 'See IVF Clinic Coordination',
    heroAlt: 'Illustration of an egg during fertilization',
    roleTitle: 'When Donor Eggs May Be Part of Your Surrogacy Plan',
    roleBody1:
      'An IVF physician may discuss donor eggs when using an intended parent’s eggs is not possible, is not preferred, or is unlikely to fit the medical plan. Donor eggs may also be part of the path for single fathers, two-dad families, and other intended parents who need an egg source to create embryos.',
    roleBody2:
      'The decision is personal and medical. Your physician evaluates the clinical factors. Yunda helps you prepare questions, understand which provider owns each decision, and coordinate the plan after your clinic gives guidance.',
    roleCardTitle: 'Who owns each decision?',
    roles: [
      {
        title: 'IVF clinic',
        body: 'Evaluates the medical plan, explains clinic acceptance requirements, creates embryos, and advises on embryo testing and transfer.',
      },
      {
        title: 'Donor program or egg bank',
        body: 'Provides donor information and manages its donor process, records, and availability.',
      },
      {
        title: 'Genetic counselor and attorney',
        body: 'Explain genetic findings, identity and contact expectations, consent, and legal implications when needed.',
      },
      {
        title: 'Yunda',
        body: 'Coordinates communication, timing, documents, surrogate matching, and the broader surrogacy journey.',
      },
    ],
    processTitle: 'How Donor Egg Surrogacy Moves From Planning to Transfer',
    processIntro:
      'The exact order depends on your clinic, embryo status, donor path, and legal plan. These four stages show the handoffs most intended parents need to coordinate.',
    processLink: 'See the full surrogacy process',
    processSteps: [
      {
        label: 'Step 1',
        title: 'Define the family-building plan',
        body: 'Start with your family goals, existing embryos or records, preferred clinic, donor needs, timeline, location, and questions about future family size. This gives the clinic and coordination team the same starting point.',
        img: '/images/pages/egg-donation/egg-donor.png',
        avif: '/images/pages/egg-donation/egg-donor.avif',
        alt: 'Embryologist reviewing an embryo image in a fertility laboratory',
        width: 1864,
        height: 1208,
      },
      {
        label: 'Step 2',
        title: 'Choose a donor path and complete screening',
        body: 'Compare a known donor, fresh donor cycle, or frozen donor eggs with your clinic. The clinic and donor program confirm required medical records, infectious-disease testing, genetic review, counseling, and other case-specific steps.',
      },
      {
        label: 'Step 3',
        title: 'Create and review embryos with your IVF clinic',
        body: 'The IVF clinic manages fertilization, embryo culture, freezing, and any discussion of PGT-A or other testing. Outcomes vary by donor, sperm source, laboratory, and treatment plan, so the clinic—not an agency—should explain expected ranges and next decisions.',
        img: '/images/pages/egg-donation/ivf-with-donor-eggs.png',
        avif: '/images/pages/egg-donation/ivf-with-donor-eggs.avif',
        alt: 'Laboratory staff reviewing embryo-monitoring equipment',
        width: 1616,
        height: 1056,
      },
      {
        label: 'Step 4',
        title: 'Align embryos, surrogate matching, and transfer readiness',
        body: 'Once the clinic confirms the embryo plan, Yunda coordinates the handoff to gestational-carrier matching and the wider process. Medical clearance, legal agreements, insurance review, escrow planning, and transfer scheduling must be completed in the order required for your case.',
      },
    ],
    selectionTitle: 'How Intended Parents Can Compare Egg Donor Options',
    selectionIntro:
      'A donor profile is only one part of the decision. Medical records, professional review, identity expectations, clinic fit, timing, and legal documents all matter.',
    selectionCards: [
      {
        title: 'Start with medical and genetic review',
        body: 'Look beyond a profile photo or a short biography. Ask the clinic and donor program which health records, family history, infectious-disease testing, and genetic screening are available and who will interpret them. If a finding needs explanation, request a qualified genetic counselor or physician.',
        bullets: [
          'Clinic eligibility and required records',
          'Personal and family medical history',
          'Infectious-disease screening and testing',
          'Genetic screening and counseling needs',
        ],
        img: '/images/pages/egg-donation/donor-screening.png',
        avif: '/images/pages/egg-donation/donor-screening.avif',
        alt: 'Laboratory technician processing a blood sample',
        width: 2178,
        height: 1188,
      },
      {
        title: 'Clarify identity, contact, and practical fit',
        body: 'Discuss whether the program describes the arrangement as known, identity-release, or another contact model. Policies and laws can change what information is available later, so review expectations with the donor program and attorney. Then compare availability, location, scheduling, travel, and whether the plan fits your clinic.',
        bullets: [
          'Future identity and contact expectations',
          'Donor location and clinic compatibility',
          'Fresh-cycle timing or frozen-egg availability',
          'Legal documents, consent, and record access',
        ],
        img: '/images/pages/egg-donation/donor-matching.png',
        avif: '/images/pages/egg-donation/donor-matching.avif',
        alt: 'Cryogenic storage equipment in a fertility laboratory',
        width: 2746,
        height: 1256,
      },
    ],
    comparisonTitle: 'Fresh vs. Frozen Donor Eggs for Surrogacy',
    comparisonIntro:
      'Neither option is automatically right for every family. Your clinic’s experience, donor availability, desired family size, sperm plan, budget, and timing all matter. Use this table to prepare for a physician conversation—not to choose treatment on your own.',
    comparisonFactor: 'Factor',
    comparisonFresh: 'Fresh donor cycle',
    comparisonFrozen: 'Frozen donor eggs',
    comparisonRows: [
      {
        factor: 'Availability',
        fresh: 'Depends on matching, screening, and scheduling a donor.',
        frozen: 'A cohort may already be stored and available through an egg bank.',
      },
      {
        factor: 'Coordination',
        fresh: 'Requires stimulation, monitoring, retrieval, and clinic scheduling.',
        frozen: 'Avoids coordinating a new retrieval cycle, but shipping and thaw planning may apply.',
      },
      {
        factor: 'Number of eggs',
        fresh: 'Retrieval yield is not known in advance and varies by cycle.',
        frozen: 'The purchased or allocated cohort size is usually known before use.',
      },
      {
        factor: 'Family-building plan',
        fresh: 'May provide more eggs from one retrieval, but no embryo outcome is guaranteed.',
        frozen: 'Cohort size may be smaller; ask how this fits one-child or sibling goals.',
      },
      {
        factor: 'Cost variables',
        fresh: 'Donor compensation, travel, medication, monitoring, retrieval, program, lab, and legal costs may apply.',
        frozen: 'Cohort, egg-bank, shipping, storage, thaw, fertilization, lab, and legal costs may apply.',
      },
      {
        factor: 'Questions for the clinic',
        fresh: 'Ask about expected retrieval range, cancellation policy, coordination, and total cycle costs.',
        frozen: 'Ask about thaw experience, cohort terms, shipping, fertilization method, and clinic-specific outcomes.',
      },
    ],
    clinicLink: 'Review IVF clinic coordination',
    costLink: 'See the surrogacy cost guide',
    planningTitle: 'What Can Change the Timeline and Budget',
    planningBody:
      'There is no single donor egg surrogacy timeline or fixed total price. The plan changes with donor availability, screening, clinic schedules, embryo creation, legal work, insurance review, escrow funding, surrogate matching, transfer readiness, travel, and whether another cycle is needed.',
    planningCards: [
      {
        title: 'Embryo status',
        body: 'Existing embryos create a different starting point from a family that still needs a donor and IVF clinic.',
      },
      {
        title: 'Donor path',
        body: 'A known donor, fresh cycle, or frozen cohort has different screening, scheduling, document, and cost dependencies.',
      },
      {
        title: 'Clinic and surrogate timing',
        body: 'Embryo readiness and gestational-carrier matching can overlap in some cases, but the clinic, agency, and attorneys should approve the sequence.',
      },
      {
        title: 'International logistics',
        body: 'Travel, document review, embryo shipping, local law, and clinic requirements may add lead time. Use qualified shipping, clinic, and legal professionals.',
      },
    ],
    inclusiveLink: 'Explore LGBTQ+ and single-parent family-building paths',
    checklistTitle: 'What to Prepare Before Your First Conversation',
    checklistIntro:
      'You do not need a finished plan. Bring what you know so the next questions can be organized around your clinic, donor path, embryos, location, and budget.',
    checklistItems: [
      'Your current clinic, physician, and embryo status, if any',
      'Whether you are considering a known donor, fresh donor, or frozen eggs',
      'Relevant records your clinic has asked you to collect',
      'Your family-size goals and any sibling planning questions',
      'Preferred timing, donor location, and travel constraints',
      'Questions about identity release, future contact, and record access',
      'A working budget for donor, IVF, legal, insurance, escrow, travel, and surrogacy costs',
      'The countries or states involved in embryo creation, transfer, pregnancy, and birth',
    ],
    checklistCta:
      'We can help you organize the next questions and connect the donor-egg plan to the broader surrogacy journey.',
    trustUpdated: 'Last updated: July 23, 2026',
    trustReviewed: 'Reviewed by Kayla Luo, Vice President, North America',
    trustNote:
      'Reviewed for Yunda’s coordination scope. Yunda provides education and coordination; it does not provide IVF treatment, donor medical approval, genetic counseling, legal advice, insurance advice, or escrow services.',
    sourceFdaOverview: 'U.S. FDA: Reproductive tissue donation',
    sourceFdaTesting: 'U.S. FDA: Donor testing requirements',
    sourceSart: 'SART: Fresh or frozen donor eggs',
    faqTitle: 'Egg Donor Surrogacy FAQ',
    faqs: [
      {
        q: 'What is egg donor surrogacy?',
        a: 'Egg donor surrogacy uses an egg donor’s eggs to create embryos through IVF. A separate gestational surrogate carries the pregnancy and does not provide the egg.',
      },
      {
        q: 'Who decides whether donor eggs are medically appropriate?',
        a: 'A reproductive endocrinologist or IVF physician should evaluate the medical plan. Yunda can help intended parents prepare questions and coordinate next steps after the clinic provides guidance.',
      },
      {
        q: 'Who screens an egg donor?',
        a: 'The responsible clinic, donor program, egg bank, laboratory, and other qualified professionals handle the screening and donor-eligibility steps required for the case. FDA rules cover communicable-disease screening and testing for donated reproductive tissue, while clinics may require additional medical, genetic, and psychosocial evaluation.',
      },
      {
        q: 'Is a fresh donor cycle better than frozen donor eggs?',
        a: 'Not for every family. Fresh and frozen paths differ in availability, coordination, cohort size, cost structure, and clinic procedures. Ask your clinic to compare the options using its laboratory experience and your family-building goals.',
      },
      {
        q: 'How many embryos will donor eggs create?',
        a: 'No agency can promise an embryo number. Results vary with the eggs, sperm source, laboratory, fertilization, embryo development, and any testing. Your IVF clinic should explain a case-specific expected range and the limits of that estimate.',
      },
      {
        q: 'How much does donor egg surrogacy cost?',
        a: 'The total may include donor-program or egg-bank fees, donor compensation where applicable, medication, monitoring, retrieval, laboratory work, shipping or storage, legal work, IVF treatment, surrogate-related costs, insurance review, escrow, travel, and agency coordination. Request an itemized plan that separates donor and IVF costs from the broader surrogacy budget.',
      },
      {
        q: 'Can international intended parents complete parts of the process remotely?',
        a: 'Many planning and coordination steps may be handled remotely, but travel, clinic, shipping, legal, and document requirements depend on the countries, states, providers, and treatment plan involved. Confirm the route with the clinic, attorney, and qualified transport professionals before moving reproductive tissue.',
      },
      {
        q: 'Should we choose a donor before matching with a surrogate?',
        a: 'Many families create embryos before final surrogate matching, while some coordination steps can overlap. The right order depends on clinic requirements, embryo status, agency process, legal preparation, and timing. Yunda can help align those handoffs without replacing professional approval.',
      },
    ],
    finalTitle: 'Connect Your Donor Egg Plan to the Full Surrogacy Journey',
    finalBody:
      'Tell us where you are now—choosing a clinic, comparing donor paths, creating embryos, or preparing for surrogate matching. We will help you organize the right next questions.',
    finalCta: 'Discuss Your Donor Egg Plan',
  },
  zh: {
    seoTitle: '捐卵代孕指南：准父母的供卵与 IVF 规划｜孕达',
    seoDescription: '了解捐卵代孕、供体筛查、新鲜与冷冻卵子、IVF 协调、费用、时间线及美国准父母的下一步规划。',
    breadcrumbParent: '准父母',
    breadcrumbCurrent: '捐卵代孕',
    heroEyebrow: '供卵规划 + 妊娠代孕',
    heroTitle: '捐卵代孕：准父母完整规划指南',
    heroLead:
      '捐卵代孕包含两个彼此独立的环节：通过 IVF 使用捐赠卵子建立胚胎，再由妊娠代孕妈妈怀孕。卵子捐赠者和代孕妈妈不是同一个人。',
    heroBody:
      '孕达帮助准父母衔接供卵资源、IVF 诊所、胚胎规划、代孕妈妈匹配、法律协调、保险审查和跨境安排。医疗决策与供体资格认定由负责的诊所和合格专业人士完成。',
    heroPrimary: '沟通你的供卵计划',
    heroSecondary: '查看 IVF 诊所协调',
    heroAlt: '卵子受精过程示意图',
    roleTitle: '供卵何时可能成为代孕计划的一部分',
    roleBody1:
      '当使用准父母自身卵子不可行、不符合个人选择或可能不适合医疗方案时，IVF 医生可能会与家庭讨论供卵。单身父亲、男同性伴侣及其他需要卵子来源建立胚胎的准父母，也可能把供卵纳入路径。',
    roleBody2:
      '这是个人与医疗层面的决定。医生负责评估临床因素；孕达帮助你整理问题、明确各专业方的职责，并在诊所给出意见后协调后续计划。',
    roleCardTitle: '每项决定由谁负责？',
    roles: [
      { title: 'IVF 诊所', body: '评估医疗方案、说明诊所接收要求、建立胚胎，并就胚胎检测和移植提供医疗意见。' },
      { title: '供卵项目或卵子库', body: '提供供体信息，并管理自身的供体流程、记录和可用情况。' },
      { title: '遗传咨询师与律师', body: '在需要时解释遗传发现、身份与联系预期、知情同意及法律影响。' },
      { title: '孕达', body: '协调沟通、时间、文件、代孕妈妈匹配及更完整的代孕旅程。' },
    ],
    processTitle: '捐卵代孕如何从规划走到移植',
    processIntro: '具体顺序取决于诊所、胚胎状态、供卵路径与法律方案。以下四个阶段展示准父母通常需要协调的交接点。',
    processLink: '查看完整代孕流程',
    processSteps: [
      {
        label: '步骤 1',
        title: '明确家庭建立方案',
        body: '先梳理家庭目标、现有胚胎或记录、首选诊所、供卵需求、时间、所在地和未来子女数量规划，让诊所与协调团队从同一信息起点开始。',
        img: '/images/pages/egg-donation/egg-donor.png',
        avif: '/images/pages/egg-donation/egg-donor.avif',
        alt: '胚胎实验室人员查看胚胎影像',
        width: 1864,
        height: 1208,
      },
      {
        label: '步骤 2',
        title: '选择供卵路径并完成筛查',
        body: '与诊所比较已知供体、新鲜供卵周期或冷冻卵子。诊所与供卵项目确认所需病历、传染病检测、遗传审核、咨询及其他个案步骤。',
      },
      {
        label: '步骤 3',
        title: '由 IVF 诊所建立并评估胚胎',
        body: 'IVF 诊所负责受精、胚胎培养、冷冻，以及 PGT-A 或其他检测的讨论。结果会受到供体、精子来源、实验室和治疗方案影响，应由诊所而非机构说明预期范围和下一步。',
        img: '/images/pages/egg-donation/ivf-with-donor-eggs.png',
        avif: '/images/pages/egg-donation/ivf-with-donor-eggs.avif',
        alt: '实验室人员查看胚胎监测设备',
        width: 1616,
        height: 1056,
      },
      {
        label: '步骤 4',
        title: '衔接胚胎、匹配与移植准备',
        body: '诊所确认胚胎方案后，孕达协调进入妊娠代孕妈妈匹配和后续流程。医疗清关、法律协议、保险审查、托管规划与移植排期须按个案要求完成。',
      },
    ],
    selectionTitle: '准父母如何比较卵子捐赠方案',
    selectionIntro: '供体资料只是决定的一部分。医疗记录、专业审核、身份预期、诊所适配、时间和法律文件都需要一起考虑。',
    selectionCards: [
      {
        title: '先看医疗与遗传审核',
        body: '不要只看照片或简短介绍。向诊所和供卵项目确认可获得哪些健康记录、家族史、传染病检测和遗传筛查，以及由谁解读。若发现需要说明，应请合格遗传咨询师或医生参与。',
        bullets: ['诊所接收要求与所需记录', '个人与家族病史', '传染病筛查和检测', '遗传筛查与咨询需求'],
        img: '/images/pages/egg-donation/donor-screening.png',
        avif: '/images/pages/egg-donation/donor-screening.avif',
        alt: '实验室技术人员处理血液样本',
        width: 2178,
        height: 1188,
      },
      {
        title: '明确身份、联系与实际适配',
        body: '确认项目如何描述已知、可披露身份或其他联系模式。政策和法律可能影响未来可获得的信息，因此应与供卵项目及律师确认预期，再比较可用情况、所在地、排期、旅行及诊所适配。',
        bullets: ['未来身份与联系预期', '供体所在地与诊所适配', '新鲜周期排期或冷冻卵子可用性', '法律文件、同意与记录获取'],
        img: '/images/pages/egg-donation/donor-matching.png',
        avif: '/images/pages/egg-donation/donor-matching.avif',
        alt: '生殖实验室中的低温储存设备',
        width: 2746,
        height: 1256,
      },
    ],
    comparisonTitle: '捐卵代孕中的新鲜卵子与冷冻卵子',
    comparisonIntro:
      '没有一种方案对所有家庭都更好。诊所经验、供体可用性、家庭规模目标、精子方案、预算与时间都会影响选择。请把本表用于准备医生沟通，而不是自行决定治疗。',
    comparisonFactor: '比较因素',
    comparisonFresh: '新鲜供卵周期',
    comparisonFrozen: '冷冻捐赠卵子',
    comparisonRows: [
      { factor: '可用性', fresh: '取决于供体匹配、筛查和排期。', frozen: '卵子库可能已有储存并可用的卵子批次。' },
      { factor: '协调', fresh: '需要促排、监测、取卵及诊所排期。', frozen: '无需安排新的取卵周期，但可能涉及运输与解冻计划。' },
      { factor: '卵子数量', fresh: '取卵数量无法提前确定，并会因周期而异。', frozen: '购买或分配的批次大小通常在使用前已知。' },
      { factor: '家庭规模规划', fresh: '一次取卵可能获得更多卵子，但不保证胚胎结果。', frozen: '批次数量可能较少，应询问是否符合单胎或同胞规划。' },
      { factor: '费用变量', fresh: '可能涉及供体补偿、旅行、药物、监测、取卵、项目、实验室和法律费用。', frozen: '可能涉及批次、卵子库、运输、储存、解冻、受精、实验室和法律费用。' },
      { factor: '向诊所提问', fresh: '询问预计取卵范围、取消政策、协调方式和周期总费用。', frozen: '询问解冻经验、批次条款、运输、受精方式和诊所个案结果。' },
    ],
    clinicLink: '查看 IVF 诊所协调',
    costLink: '查看代孕费用指南',
    planningTitle: '哪些因素会改变时间线与预算',
    planningBody:
      '捐卵代孕没有统一时间线或固定总价。供体可用性、筛查、诊所排期、胚胎建立、法律工作、保险审查、托管入金、代孕妈妈匹配、移植准备、旅行以及是否需要额外周期都会影响计划。',
    planningCards: [
      { title: '胚胎状态', body: '已有胚胎的起点，与仍需寻找供体和 IVF 诊所的家庭不同。' },
      { title: '供卵路径', body: '已知供体、新鲜周期或冷冻批次各有不同的筛查、排期、文件和费用依赖。' },
      { title: '诊所与匹配时间', body: '胚胎准备与代孕妈妈匹配有时可以重叠，但顺序应由诊所、机构与律师共同确认。' },
      { title: '跨境安排', body: '旅行、文件审核、胚胎运输、当地法律与诊所要求可能增加时间，应使用合格运输、诊所与法律专业方。' },
    ],
    inclusiveLink: '查看 LGBTQ+ 与单身准父母路径',
    checklistTitle: '首次沟通前可以准备什么',
    checklistIntro: '你不需要先拥有完整方案。带上已知信息，我们可以围绕诊所、供卵路径、胚胎、地区和预算整理下一步问题。',
    checklistItems: [
      '现有诊所、医生与胚胎状态（如有）',
      '是否考虑已知供体、新鲜供卵或冷冻卵子',
      '诊所要求收集的相关记录',
      '家庭规模目标和同胞规划问题',
      '期望时间、供体地区和旅行限制',
      '关于身份披露、未来联系和记录获取的问题',
      '供卵、IVF、法律、保险、托管、旅行和代孕的初步预算',
      '胚胎建立、移植、孕期和出生涉及的国家或州',
    ],
    checklistCta: '我们可以帮你整理下一步问题，并把供卵计划接入更完整的代孕旅程。',
    trustUpdated: '最后更新：2026年7月23日',
    trustReviewed: 'Kayla Luo（北美区副总裁）审阅',
    trustNote:
      '本页按孕达协调服务范围审阅。孕达提供教育与协调，不提供 IVF 治疗、供体医疗批准、遗传咨询、法律建议、保险建议或托管服务。',
    sourceFdaOverview: '美国 FDA：生殖组织捐赠',
    sourceFdaTesting: '美国 FDA：供体检测要求',
    sourceSart: 'SART：新鲜或冷冻捐赠卵子',
    faqTitle: '捐卵代孕常见问题',
    faqs: [
      { q: '什么是捐卵代孕？', a: '捐卵代孕使用卵子捐赠者的卵子，通过 IVF 建立胚胎，再由独立的妊娠代孕妈妈怀孕；代孕妈妈不提供卵子。' },
      { q: '谁来判断供卵是否适合医疗方案？', a: '应由生殖内分泌医生或 IVF 医生评估医疗方案。诊所给出意见后，孕达可以帮助准父母整理问题并协调下一步。' },
      { q: '谁负责筛查卵子捐赠者？', a: '负责的诊所、供卵项目、卵子库、实验室及其他合格专业人士完成个案所需的筛查与供体资格步骤。FDA 规则涵盖捐赠生殖组织的传染病筛查与检测，诊所还可能要求额外医疗、遗传及心理社会评估。' },
      { q: '新鲜供卵一定比冷冻卵子好吗？', a: '并非对所有家庭如此。两种路径在可用性、协调、批次数量、费用结构和诊所流程上不同，应让诊所结合其实验室经验和你的家庭目标进行比较。' },
      { q: '捐赠卵子能建立多少胚胎？', a: '任何机构都不能保证胚胎数量。结果会受卵子、精子来源、实验室、受精、胚胎发育和检测影响。IVF 诊所应说明个案预期范围及其局限。' },
      { q: '捐卵代孕需要多少费用？', a: '总费用可能包括供卵项目或卵子库、适用的供体补偿、药物、监测、取卵、实验室、运输或储存、法律、IVF、代孕相关费用、保险审查、托管、旅行和机构协调。建议把供卵/IVF 与更完整代孕预算分开列项。' },
      { q: '国际准父母可以远程完成部分流程吗？', a: '很多规划和协调可以远程进行，但旅行、诊所、运输、法律和文件要求取决于涉及的国家、州、专业方与治疗方案。移动生殖组织前应由诊所、律师和合格运输专业方确认路线。' },
      { q: '应该先选供体还是先匹配代孕妈妈？', a: '很多家庭会在最终匹配前建立胚胎，部分协调也可能重叠。正确顺序取决于诊所要求、胚胎状态、机构流程、法律准备和时间。孕达可帮助衔接，但不能替代专业批准。' },
    ],
    finalTitle: '把供卵计划接入完整代孕旅程',
    finalBody: '告诉我们你目前在哪一步——选择诊所、比较供卵路径、建立胚胎或准备匹配。我们会帮助你整理正确的下一步问题。',
    finalCta: '沟通你的供卵计划',
  },
}

const c = computed(() => translations[locale.value as 'en' | 'zh'] || translations.en)

const breadcrumbItems = computed(() => [
  { label: c.value.breadcrumbParent, to: '/intended-parents' },
  { label: c.value.breadcrumbCurrent },
])

const coreServicePageSchemas = computed(() => buildCoreServicePageSchemas({
  baseUrl: siteUrl.value || undefined,
  path: pagePath,
  name: c.value.heroTitle,
  description: c.value.seoDescription,
  about: 'Egg donor gestational surrogacy and donor egg planning for intended parents',
  audience: 'Intended parents',
  inLanguage: locale.value === 'zh' ? 'zh-CN' : 'en-US',
  service: {
    name: locale.value === 'zh' ? '供卵妊娠代孕协调' : 'Egg Donor Gestational Surrogacy Coordination',
    serviceType: locale.value === 'zh' ? '供卵代孕协调支持' : 'Egg donor gestational surrogacy coordination',
    audience: ['Intended parents', 'LGBTQ intended parents', 'single parents'],
    description: c.value.heroBody,
  },
  breadcrumbs: [
    { name: locale.value === 'zh' ? '首页' : 'Home', url: '/' },
    { name: c.value.breadcrumbParent, url: '/intended-parents' },
    { name: c.value.breadcrumbCurrent, url: pagePath },
  ],
  itemList: {
    name: c.value.processTitle,
    description: c.value.processIntro,
    items: c.value.processSteps.map((step, index) => ({
      position: index + 1,
      name: step.title,
      description: step.body,
      url: pagePath,
    })),
  },
}))

useHead(() => ({
  title: c.value.seoTitle,
  meta: [
    { name: 'description', content: c.value.seoDescription },
    { property: 'og:title', content: c.value.seoTitle },
    { property: 'og:description', content: c.value.seoDescription },
    { property: 'og:image', content: `${siteUrl.value}/images/pages/egg-donation/og.jpg` },
    { name: 'twitter:title', content: c.value.seoTitle },
    { name: 'twitter:description', content: c.value.seoDescription },
    { name: 'twitter:image', content: `${siteUrl.value}/images/pages/egg-donation/og.jpg` },
  ],
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
    <BreadcrumbNav :items="breadcrumbItems" />

    <main>
      <section class="relative overflow-hidden from-[var(--yunda-petal)] via-[#fff7ef] to-white bg-gradient-to-br">
        <div class="pointer-events-none absolute inset-0">
          <div class="absolute left-[-12%] top-[-25%] h-100 w-100 rounded-full bg-white/75 blur-3xl" />
          <div class="absolute right-[-12%] top-[-10%] h-120 w-120 rounded-full bg-[var(--yunda-sky)]/18 blur-3xl" />
        </div>
        <div class="relative grid mx-auto max-w-320 gap-10 px-6 py-14 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:px-10 lg:py-20">
          <div>
            <p class="text-xs text-[var(--yunda-maple)] font-extrabold tracking-[0.18em] uppercase">
              {{ c.heroEyebrow }}
            </p>
            <h1 class="mt-4 text-10.5 text-[var(--yunda-bark)] font-semibold leading-[1.08] font-display lg:text-14">
              {{ c.heroTitle }}
            </h1>
            <p class="mt-6 text-lg text-[var(--yunda-bark)]/88 font-medium leading-[1.75]">
              {{ c.heroLead }}
            </p>
            <p class="mt-4 text-base text-[var(--yunda-bark)]/76 leading-[1.8] lg:text-lg">
              {{ c.heroBody }}
            </p>
            <div class="mt-8 flex flex-wrap gap-3">
              <NuxtLink
                :to="localePath('/be-parents')"
                class="inline-flex items-center justify-center rounded-3 bg-[var(--yunda-bark)] px-6 py-3.5 text-sm text-white font-bold shadow-[0_16px_34px_rgba(61,42,31,0.2)] transition hover:-translate-y-0.5"
              >
                {{ c.heroPrimary }}
              </NuxtLink>
              <NuxtLink
                :to="localePath('/partner-ivf-clinics')"
                class="inline-flex items-center justify-center border border-[var(--yunda-maple)]/35 rounded-3 bg-white/80 px-6 py-3.5 text-sm text-[var(--yunda-bark)] font-bold transition hover:border-[var(--yunda-maple)] hover:-translate-y-0.5"
              >
                {{ c.heroSecondary }}
              </NuxtLink>
            </div>
          </div>

          <div class="relative overflow-hidden border border-[var(--yunda-maple)]/20 rounded-7 bg-white shadow-[0_28px_70px_rgba(61,42,31,0.16)]">
            <OptimizedPicture
              src="/images/pages/egg-donation/hero.jpg"
              avif-src="/images/pages/egg-donation/hero-800.avif 800w, /images/pages/egg-donation/hero-1600.avif 1600w"
              :alt="c.heroAlt"
              width="1600"
              height="1142"
              sizes="(max-width: 1024px) 100vw, 48vw"
              loading="eager"
              decoding="async"
              fetchpriority="high"
              picture-class="contents"
              img-class="aspect-[1600/1142] h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section class="px-6 py-16 lg:px-10 lg:py-22">
        <div class="grid mx-auto max-w-320 gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
          <div>
            <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">
              {{ c.roleTitle }}
            </h2>
            <p class="mt-5 text-base text-[var(--yunda-bark)]/80 leading-[1.85] lg:text-lg">
              {{ c.roleBody1 }}
            </p>
            <p class="mt-4 text-base text-[var(--yunda-bark)]/80 leading-[1.85] lg:text-lg">
              {{ c.roleBody2 }}
            </p>
          </div>
          <div class="border border-[var(--yunda-maple)]/20 rounded-6 bg-white/88 p-6 shadow-[0_18px_50px_rgba(61,42,31,0.08)] lg:p-8">
            <h3 class="text-xl font-bold">
              {{ c.roleCardTitle }}
            </h3>
            <dl class="mt-5 divide-y divide-[var(--yunda-bark)]/10">
              <div v-for="role in c.roles" :key="role.title" class="grid gap-1 py-4 sm:grid-cols-[10rem_1fr] sm:gap-4">
                <dt class="text-[var(--yunda-maple)] font-bold">
                  {{ role.title }}
                </dt>
                <dd class="text-sm text-[var(--yunda-bark)]/76 leading-7">
                  {{ role.body }}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section class="bg-white/70 px-6 py-16 lg:px-10 lg:py-22">
        <div class="mx-auto max-w-320">
          <div class="max-w-4xl">
            <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">
              {{ c.processTitle }}
            </h2>
            <p class="mt-5 text-base text-[var(--yunda-bark)]/76 leading-[1.8] lg:text-lg">
              {{ c.processIntro }}
            </p>
          </div>
          <div class="grid mt-10 gap-5 lg:grid-cols-2">
            <article
              v-for="step in c.processSteps"
              :key="step.title"
              class="overflow-hidden border border-[var(--yunda-bark)]/10 rounded-6 bg-white shadow-[0_14px_40px_rgba(61,42,31,0.06)]"
            >
              <OptimizedPicture
                v-if="step.img"
                :src="step.img"
                :avif-src="step.avif"
                :alt="step.alt"
                :width="step.width"
                :height="step.height"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                decoding="async"
                picture-class="contents"
                img-class="aspect-[16/9] w-full object-cover"
              />
              <div class="p-6 lg:p-7">
                <p class="text-xs text-[var(--yunda-maple)] font-extrabold tracking-[0.16em] uppercase">
                  {{ step.label }}
                </p>
                <h3 class="mt-2 text-xl font-bold leading-snug lg:text-2xl">
                  {{ step.title }}
                </h3>
                <p class="mt-3 text-base text-[var(--yunda-bark)]/76 leading-[1.75]">
                  {{ step.body }}
                </p>
              </div>
            </article>
          </div>
          <NuxtLink
            :to="localePath('/surrogacy-process')"
            class="mt-7 inline-flex text-sm text-[var(--yunda-maple)] font-bold underline underline-offset-4"
          >
            {{ c.processLink }} →
          </NuxtLink>
        </div>
      </section>

      <section class="px-6 py-16 lg:px-10 lg:py-22">
        <div class="mx-auto max-w-320">
          <div class="max-w-4xl">
            <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">
              {{ c.selectionTitle }}
            </h2>
            <p class="mt-5 text-base text-[var(--yunda-bark)]/76 leading-[1.8] lg:text-lg">
              {{ c.selectionIntro }}
            </p>
          </div>
          <div class="grid mt-10 gap-6 lg:grid-cols-2">
            <article
              v-for="card in c.selectionCards"
              :key="card.title"
              class="overflow-hidden border border-[var(--yunda-maple)]/18 rounded-6 bg-white shadow-[0_18px_50px_rgba(61,42,31,0.07)]"
            >
              <OptimizedPicture
                :src="card.img"
                :avif-src="card.avif"
                :alt="card.alt"
                :width="card.width"
                :height="card.height"
                sizes="(max-width: 1024px) 100vw, 50vw"
                loading="lazy"
                decoding="async"
                picture-class="contents"
                img-class="aspect-[16/9] w-full object-cover"
              />
              <div class="p-6 lg:p-8">
                <h3 class="text-xl font-bold leading-snug lg:text-2xl">
                  {{ card.title }}
                </h3>
                <p class="mt-4 text-base text-[var(--yunda-bark)]/76 leading-[1.75]">
                  {{ card.body }}
                </p>
                <ul class="grid mt-5 gap-3">
                  <li v-for="item in card.bullets" :key="item" class="flex gap-3 text-sm text-[var(--yunda-bark)]/82 leading-6">
                    <span class="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--yunda-maple)]" aria-hidden="true" />
                    <span>{{ item }}</span>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section class="bg-[var(--yunda-bark)] px-6 py-16 text-white lg:px-10 lg:py-22">
        <div class="mx-auto max-w-320">
          <div class="max-w-4xl">
            <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">
              {{ c.comparisonTitle }}
            </h2>
            <p class="mt-5 text-base text-white/74 leading-[1.8] lg:text-lg">
              {{ c.comparisonIntro }}
            </p>
          </div>
          <div class="mt-10 overflow-x-auto rounded-5 bg-white text-[var(--yunda-bark)] shadow-[0_22px_60px_rgba(0,0,0,0.22)]">
            <table class="min-w-205 w-full border-collapse text-left">
              <thead class="bg-[var(--yunda-petal)]">
                <tr>
                  <th scope="col" class="w-1/5 px-5 py-4 text-sm font-extrabold">
                    {{ c.comparisonFactor }}
                  </th>
                  <th scope="col" class="w-2/5 px-5 py-4 text-sm font-extrabold">
                    {{ c.comparisonFresh }}
                  </th>
                  <th scope="col" class="w-2/5 px-5 py-4 text-sm font-extrabold">
                    {{ c.comparisonFrozen }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="row in c.comparisonRows" :key="row.factor" class="border-t border-[var(--yunda-bark)]/10 align-top">
                  <th scope="row" class="px-5 py-4 text-sm text-[var(--yunda-maple)] font-bold">
                    {{ row.factor }}
                  </th>
                  <td class="px-5 py-4 text-sm text-[var(--yunda-bark)]/76 leading-6">
                    {{ row.fresh }}
                  </td>
                  <td class="px-5 py-4 text-sm text-[var(--yunda-bark)]/76 leading-6">
                    {{ row.frozen }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            <NuxtLink :to="localePath('/partner-ivf-clinics')" class="text-sm text-white font-bold underline underline-offset-4">
              {{ c.clinicLink }} →
            </NuxtLink>
            <NuxtLink :to="localePath('/surrogacy-cost')" class="text-sm text-white font-bold underline underline-offset-4">
              {{ c.costLink }} →
            </NuxtLink>
          </div>
        </div>
      </section>

      <section class="px-6 py-16 lg:px-10 lg:py-22">
        <div class="mx-auto max-w-320">
          <div class="max-w-4xl">
            <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">
              {{ c.planningTitle }}
            </h2>
            <p class="mt-5 text-base text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-lg">
              {{ c.planningBody }}
            </p>
          </div>
          <div class="grid mt-9 gap-4 md:grid-cols-2">
            <article
              v-for="card in c.planningCards"
              :key="card.title"
              class="border border-[var(--yunda-bark)]/10 rounded-5 bg-white/78 p-6"
            >
              <h3 class="text-lg font-bold">
                {{ card.title }}
              </h3>
              <p class="mt-2 text-sm text-[var(--yunda-bark)]/74 leading-7">
                {{ card.body }}
              </p>
            </article>
          </div>
          <NuxtLink
            :to="localePath('/single-parents-lgbtq')"
            class="mt-6 inline-flex text-sm text-[var(--yunda-maple)] font-bold underline underline-offset-4"
          >
            {{ c.inclusiveLink }} →
          </NuxtLink>
        </div>
      </section>

      <section class="bg-white/70 px-6 py-16 lg:px-10 lg:py-22">
        <div class="grid mx-auto max-w-320 gap-8 lg:grid-cols-[1fr_0.82fr]">
          <div>
            <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">
              {{ c.checklistTitle }}
            </h2>
            <p class="mt-5 text-base text-[var(--yunda-bark)]/76 leading-[1.8] lg:text-lg">
              {{ c.checklistIntro }}
            </p>
            <ul class="grid mt-7 gap-3 sm:grid-cols-2">
              <li v-for="item in c.checklistItems" :key="item" class="flex gap-3 rounded-4 bg-[var(--yunda-petal)]/75 p-4 text-sm leading-6">
                <span class="mt-0.5 text-[var(--yunda-maple)] font-black" aria-hidden="true">✓</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
          <aside class="self-start border border-[var(--yunda-maple)]/20 rounded-6 bg-[var(--yunda-petal)] p-7 shadow-[0_18px_50px_rgba(61,42,31,0.08)] lg:sticky lg:top-24">
            <p class="text-lg font-bold leading-relaxed">
              {{ c.checklistCta }}
            </p>
            <NuxtLink
              :to="localePath('/be-parents')"
              class="mt-6 w-full inline-flex items-center justify-center rounded-3 bg-[var(--yunda-bark)] px-6 py-3.5 text-sm text-white font-bold"
            >
              {{ c.heroPrimary }}
            </NuxtLink>
          </aside>
        </div>
      </section>

      <SeoTrustNote
        :updated="c.trustUpdated"
        :reviewed-by="c.trustReviewed"
        :note="c.trustNote"
        :sources="[
          {
            label: c.sourceFdaOverview,
            href: 'https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/what-you-should-know-reproductive-tissue-donation',
          },
          {
            label: c.sourceFdaTesting,
            href: 'https://www.fda.gov/vaccines-blood-biologics/safety-availability-biologics/testing-donors-human-cells-tissues-and-cellular-and-tissue-based-products-hctp-specific-requirements',
          },
          {
            label: c.sourceSart,
            href: 'https://www.sart.org/patients/fyi-videos/donor-eggs-fresh-or-frozen/',
          },
        ]"
      />

      <section class="px-6 py-16 lg:px-10 lg:py-22">
        <div class="mx-auto max-w-320">
          <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">
            {{ c.faqTitle }}
          </h2>
          <div class="grid mt-9 gap-4 lg:grid-cols-2">
            <details
              v-for="faq in c.faqs"
              :key="faq.q"
              class="group border border-[var(--yunda-bark)]/10 rounded-4 bg-white px-5 py-4 shadow-[0_10px_30px_rgba(61,42,31,0.05)]"
            >
              <summary class="cursor-pointer list-none text-base font-bold leading-7">
                <span class="flex items-start justify-between gap-4">
                  <span>{{ faq.q }}</span>
                  <span class="text-[var(--yunda-maple)] transition group-open:rotate-45" aria-hidden="true">+</span>
                </span>
              </summary>
              <p class="mt-3 text-sm text-[var(--yunda-bark)]/74 leading-7">
                {{ faq.a }}
              </p>
            </details>
          </div>
        </div>
      </section>

      <section class="from-[#f6d7b8] via-[var(--yunda-petal)] to-[#dce9ef] bg-gradient-to-r px-6 py-16 lg:px-10 lg:py-20">
        <div class="mx-auto max-w-4xl text-center">
          <h2 class="text-8 font-semibold leading-tight font-display lg:text-11">
            {{ c.finalTitle }}
          </h2>
          <p class="mx-auto mt-5 max-w-3xl text-base text-[var(--yunda-bark)]/78 leading-[1.8] lg:text-lg">
            {{ c.finalBody }}
          </p>
          <NuxtLink
            :to="localePath('/be-parents')"
            class="mt-8 inline-flex items-center justify-center rounded-3 bg-[var(--yunda-bark)] px-7 py-4 text-sm text-white font-bold shadow-[0_16px_34px_rgba(61,42,31,0.2)]"
          >
            {{ c.finalCta }}
          </NuxtLink>
        </div>
      </section>
    </main>

    <AppFooter />
  </div>
</template>

#!/usr/bin/env node
const fs = require('node:fs')
const path = require('node:path')

const ROOT = process.cwd()
const REVIEW_DATE = '2026年7月31日'
const PREPARED_AT = '2026-07-31'

const S = {
  acogLoss: 'https://www.acog.org/womens-health/faqs/early-pregnancy-loss',
  acogLossBulletin: 'https://www.acog.org/clinical/clinical-guidance/practice-bulletin/articles/2018/11/early-pregnancy-loss',
  acogEctopic: 'https://www.acog.org/womens-health/faqs/ectopic-pregnancy',
  acogHysterectomy: 'https://www.acog.org/womens-health/faqs/hysterectomy',
  asrmPgta: 'https://www.asrm.org/practice-guidance/practice-committee-documents/the-use-of-preimplantation-genetic-testing-for-aneuploidy-a-committee-opinion-2024/',
  asrmPgtp: 'https://www.asrm.org/news-and-events/asrm-news/press-releasesbulletins/asrm-ethics-and-practice-committees-release-new-report-concluding-polygenic-embryo-screening-is-not-ready-for-clinical-use/',
  asrmGc: 'https://www.asrm.org/practice-guidance/practice-committee-documents/recommendations-for-practices-using-gestational-carriers-a-committee-opinion-2022/',
  asrmGcEthics: 'https://www.asrm.org/practice-guidance/ethics-opinions/consideration-of-the-gestational-carrier-an-ethics-committee-opinion-2023/',
  asrmDonation: 'https://www.asrm.org/practice-guidance/practice-committee-documents/guidance-regarding-gamete-and-embryo-donation/',
  asrmGlossary: 'https://www.asrm.org/practice-guidance/practice-committee-documents/the-international-glossary-on-infertility-and-fertility-care-2025/',
  asrmPreservation: 'https://www.asrm.org/practice-guidance/practice-committee-documents/fertility-preservation-in-patients-with-medical-indications-a-committee-opinion-2026/',
  asrmDisclosure: 'https://www.asrm.org/practice-guidance/ethics-opinions/informing-offspring-of-their-conception-by-gamete-or-embryo-donation-an-ethics-committee-opinion-2018/',
  asrmPolicy: 'https://www.asrm.org/advocacy-and-policy/fact-sheets-and-one-pagers/gestational-carrier-policy-in-the-united-states/',
  cdcSuccess: 'https://www.cdc.gov/art/success-rates/interpret.html',
  sb729: 'https://www.leginfo.legislature.ca.gov/faces/billCompareClient.xhtml?bill_id=202320240SB729&showamends=false',
  dmhc: 'https://www.dmhc.ca.gov/Portals/0/Docs/OPL/APL25-021-ImplementationofSenateBill729%282024%29-REVISED%282_23_2026%29.pdf',
  healthcareSbc: 'https://www.healthcare.gov/health-care-law-protections/summary-of-benefits-and-coverage/',
  healthcarePregnancy: 'https://www.healthcare.gov/what-if-im-pregnant-or-plan-to-get-pregnant/',
  dolErisa: 'https://webapps.dol.gov/elaws/elg/erisa.htm',
  cfpbFees: 'https://www.consumerfinance.gov/ask-cfpb/do-personal-installment-loans-have-fees-en-2120/',
  cfpbApr: 'https://www.consumerfinance.gov/ask-cfpb/what-is-the-difference-between-a-loan-interest-rate-and-the-apr-en-733/',
  cfpbHome: 'https://www.consumerfinance.gov/ask-cfpb/what-is-a-home-equity-loan-en-106/',
  ftcCrowdfunding: 'https://consumer.ftc.gov/articles/donating-through-crowdfunding-and-fundraising-platforms',
  ca7962: 'https://leginfo.legislature.ca.gov/faces/codes_displaySection.xhtml?lawCode=FAM&sectionNum=7962.',
  nv126: 'https://www.leg.state.nv.us/nrs/nrs-126.html',
  il47: 'https://www.ilga.gov/Legislation/ILCS/Articles?ActID=2613&ChapterID=59',
  ny581: 'https://www.nysenate.gov/legislation/laws/FCT/581-403',
  ne2521200: 'https://www.nebraskalegislature.gov/laws/statutes.php?statute=25-21%2C200',
  la2720: 'https://legis.la.gov/legis/LawPrint.aspx?d=1015743',
  la2718: 'https://legis.la.gov/Legis/Law.aspx?d=1015740',
  nvBar: 'https://nvbar.org/for-the-public/attorney-discipline/',
  growing: 'https://www.growinggenerations.com/intended-parents/lgbtqia-parents',
  conceive: 'https://www.conceiveabilities.com/parents/',
  conceiveLgbtq: 'https://www.conceiveabilities.com/parents/same-sex/',
  roots: 'https://www.rootssurrogacy.com/',
  global: 'https://globalsurrogacyservices.com/intended-parents/who-we-help/',
  circle: 'https://www.circlesurrogacy.com/',
  circleLgbtq: 'https://www.circlesurrogacy.com/intended-parents/who-we-help/lgbtq-parents',
  hatch: 'https://www.hatch.us/intended-parents',
  familyEquality: 'https://familyequality.org/providers-database/',
}

const internalLabels = {
  '/zh/surrogacy-process': '美国代孕流程',
  '/zh/partner-ivf-clinics': 'IVF诊所协调',
  '/zh/egg-donation': '捐卵与第三方生殖',
  '/zh/surrogate-requirements': '代孕妈妈资格',
  '/zh/surrogacy-protection-california': '法律、保险与托管保护',
  '/zh/surrogacy-cost': '代孕预算构成',
  '/zh/single-parents-lgbtq': 'LGBTQ+与单身家庭支持',
  '/zh/be-surrogate': '成为代孕妈妈',
  '/zh/be-parents': '准父母咨询入口',
}

const sourceLabels = new Map([
  [S.acogLoss, 'ACOG：早期妊娠丢失患者指南'],
  [S.acogLossBulletin, 'ACOG：早期妊娠丢失临床实践公告'],
  [S.acogEctopic, 'ACOG：异位妊娠患者指南'],
  [S.acogHysterectomy, 'ACOG：子宫切除术患者指南'],
  [S.asrmPgta, 'ASRM：PGT-A委员会意见（2024）'],
  [S.asrmPgtp, 'ASRM：PGT-P尚不适合临床使用'],
  [S.asrmGc, 'ASRM：妊娠载体实践建议（2022）'],
  [S.asrmGcEthics, 'ASRM：妊娠载体伦理意见（2023）'],
  [S.asrmDonation, 'ASRM：配子与胚胎捐赠指南（2024）'],
  [S.asrmGlossary, 'ASRM：2025不孕与生育照护术语表'],
  [S.asrmPreservation, 'ASRM：医学适应证生育力保存意见（2026）'],
  [S.asrmDisclosure, 'ASRM：向捐赠受孕子女披露来源的伦理意见'],
  [S.asrmPolicy, 'ASRM：美国妊娠载体政策概览'],
  [S.cdcSuccess, 'CDC：如何解读辅助生殖成功率'],
  [S.sb729, 'California Legislative Information：SB 729法案文本'],
  [S.dmhc, 'California DMHC：APL 25-021修订指引'],
  [S.healthcareSbc, 'HealthCare.gov：保障与福利摘要（SBC）'],
  [S.healthcarePregnancy, 'HealthCare.gov：孕产与新生儿保障'],
  [S.dolErisa, '美国劳工部：ERISA与雇主福利计划'],
  [S.cfpbFees, 'CFPB：个人分期贷款费用'],
  [S.cfpbApr, 'CFPB：利率与APR的区别'],
  [S.cfpbHome, 'CFPB：房屋净值贷款风险'],
  [S.ftcCrowdfunding, 'FTC：众筹与筹款平台注意事项'],
  [S.ca7962, 'California Family Code §7962'],
  [S.nv126, 'Nevada Revised Statutes Chapter 126'],
  [S.il47, 'Illinois Gestational Surrogacy Act'],
  [S.ny581, 'New York Family Court Act §581-403'],
  [S.ne2521200, 'Nebraska Revised Statute §25-21,200'],
  [S.la2720, 'Louisiana Revised Statutes §9:2720'],
  [S.la2718, 'Louisiana Revised Statutes §9:2718.1'],
  [S.nvBar, 'State Bar of Nevada：律师纪律记录查询'],
  [S.growing, 'Growing Generations：LGBTQIA+准父母服务'],
  [S.conceive, 'ConceiveAbilities：准父母服务'],
  [S.conceiveLgbtq, 'ConceiveAbilities：同性家庭服务'],
  [S.roots, 'Roots Surrogacy：准父母FAQ'],
  [S.global, 'Global Surrogacy Services：服务对象'],
  [S.circle, 'Circle Surrogacy：服务范围'],
  [S.circleLgbtq, 'Circle Surrogacy：LGBTQIA+准父母服务'],
  [S.hatch, 'Hatch：准父母服务'],
  [S.familyEquality, 'Family Equality：LGBTQ+服务机构目录'],
])

const common = {
  medical: '本文用于帮助读者整理就诊问题，不用于诊断、决定用药或替代医生意见。辅助生殖结果会受到年龄、病史、胚胎情况、实验室方法和个体治疗方案影响；任何检查或治疗选择都应由掌握完整病历的医疗团队讨论。孕达提供教育、协调和个案管理支持，不是医疗机构或IVF诊所。',
  insurance: '保险能否支付某项服务取决于具体计划文件、适用州法、网络、医疗必要性、先授权、药品目录和除外条款。电话口头答复不能替代书面保障确认。孕达可协助整理问题和协调第三方，但不是保险公司、保险经纪或理赔决定方。',
  legal: '美国没有统一的代孕法，合同地、代孕者居住地、医疗程序地、分娩地和准父母居住地都可能影响分析。本文只提供教育信息，不是法律意见；每一方都应由适用司法辖区内、彼此独立的生殖法律师代理。孕达不是律师事务所，也不保证法院命令或亲权结果。',
  agency: '机构官网可以说明其自述服务，但不能单独证明服务质量、结果或适合每个家庭。比较时应核对书面服务范围、费用、退款与重配规则、独立法律和保险安排、投诉处理及实际团队。孕达是本文所讨论的服务提供方之一，因此存在直接商业利益，读者应独立比较。',
  relationship: '代孕关系涉及独立成年人、医疗自主、隐私、合同义务和未来家庭叙事。没有一种联系强度适合所有人，任何示例都不代表必然结果。孕达提供教育、协调和个案管理支持，不替代医疗、法律或心理专业意见。',
}

function p(slug, intent, summary, risk, sections, sources, internalLinks, batch, reviewStatus, publishEligible) {
  return { slug, intent, summary, risk, sections, sources, internalLinks, batch, reviewStatus, publishEligible }
}

const pages = [
  p('Nonviable-Pregnancy-Explained-Causes-Signs-and-Next', '非存活妊娠的含义、诊断路径、急症红旗与下一步', '“非存活妊娠”表示妊娠不能继续发展，但阴道出血、腹痛或一次超声结果本身通常不能让读者自行确诊。早孕期需要结合孕周、症状、超声位置与表现、hCG变化和必要复查；突然剧痛、肩痛、明显虚弱、头晕或晕厥可能提示异位妊娠破裂，应立即急诊就医。', 'medical', [
    ['先区分三个问题', '早期妊娠丢失是妊娠在早期停止发展；异位妊娠是受精卵在子宫腔外着床，可能造成危及生命的内出血；葡萄胎等情况又有不同评估路径。把这些情况统称为“胎停”会掩盖紧急程度和处理差异。医生首先需要确认妊娠位置，再判断是否达到可靠的非存活诊断标准。'],
    ['哪些症状需要马上处理', '少量出血在早孕并不少见，也不必然代表流产，但大量出血、持续或加重疼痛、发热、恶臭分泌物需要尽快联系医疗人员。突然单侧或剧烈腹盆腔痛、肩痛、虚弱、头晕或晕厥属于异位妊娠警讯，应直接前往急诊。不要因为家用孕检仍呈阳性而排除异常妊娠。'],
    ['为什么可能需要复查', 'ACOG指出，超声和血清β-hCG可以帮助提高诊断把握，但过早治疗可能中断仍在正常发展的妊娠。若孕周或既往日期不确定、宫内妊娠尚未明确，医生可能安排连续hCG和间隔超声。单独的“未见胎心”必须放在孕周、胚胎测量和设备条件中解释。'],
    ['确诊后的选择', '早期妊娠丢失的处理可能包括等待自然排出、药物或手术，选择取决于出血、感染、贫血、病史和个人偏好。异位妊娠的治疗路径不同，可能需要药物或手术并持续复查。治疗完成后，身体恢复、再次尝试的时间和情绪支持也应纳入随访。'],
    ['代孕项目中的沟通', '若妊娠发生在代孕项目中，医疗决定仍由接受治疗和怀孕的人与其医生作出。准父母、代孕者、诊所和个案团队应使用既定授权渠道沟通，避免在结果未确认时传播推测。合同和支持计划可以约定信息共享与费用责任，但不能替代患者的医疗同意。'],
  ], [S.acogLoss, S.acogLossBulletin, S.acogEctopic], ['/zh/partner-ivf-clinics', '/zh/surrogacy-process', '/zh/surrogacy-protection-california'], 2, 'pending-ob-gyn-review', false),

  p('Do-You-Need-PGT-A-Before-Surrogacy-2026-ASRM-Insights', 'PGT-A是否为代孕前必需检查以及决策限制', 'PGT-A不是开始代孕或每个IVF周期都必须完成的检查，ASRM 2024委员会意见也没有支持把它作为所有IVF患者的常规筛查。它是在胚胎移植前对染色体非整倍体风险进行筛查，不是诊断；是否使用应结合卵子来源年龄、胚胎数量、既往治疗史、实验室方案、费用和个人价值观讨论。', 'medical', [
    ['先纠正“2026指南”的说法', '页面所依据的核心ASRM文件是2024年委员会意见，不应改写为“2026强制指南”。该文件评估不同患者群体的证据，并指出PGT-A的价值不能概括为对所有人都提高累计活产率。网站可以解释证据和问题清单，但不应替诊所选择检测策略。'],
    ['PGT-A能回答什么', '活检样本用于估计胚胎染色体数目是否异常，以帮助实验室和患者讨论移植顺序。结果可能报告整倍体、非整倍体、嵌合或无结果；样本来自滋养外胚层，并不等于对未来孩子每个细胞的诊断。检测也不能排除所有单基因病、结构异常、出生缺陷或妊娠并发症。'],
    ['为什么不是所有人都获益', '卵子来源年龄、可用囊胚数量和患者目标会改变潜在收益与代价。胚胎很少时，活检、冷冻和结果不确定可能带来额外时间、费用和选择压力；部分人更看重减少某类移植失败，另一些人更关注累计活产机会或避免丢弃可能具有发育潜力的胚胎。'],
    ['检测前应问的六件事', '向诊所确认实验室采用的平台、活检与冷冻流程、无结果和嵌合结果如何处理、是否建议遗传咨询、报告能否二次解释，以及不检测时的移植方案。还应分别询问“每次移植成功率”“每次取卵累计活产率”和“获得一个可移植胚胎的机会”，不要把不同分母混为一个成功率。'],
    ['与代孕安排的关系', '使用妊娠载体并不会自动形成PGT-A医学适应证。胚胎检测决定由胚胎相关患者与生殖医生讨论，妊娠载体则应获得与移植和产前筛查相关的充分信息。合同可以记录各方对检测结果、产前诊断和信息共享的讨论，但不能承诺医学结果。'],
  ], [S.asrmPgta, S.asrmGc, S.cdcSuccess], ['/zh/partner-ivf-clinics', '/zh/surrogacy-process', '/zh/egg-donation'], 2, 'pending-reproductive-endocrinologist-or-genetic-counselor-review', false),

  p('Donor-Egg-vs-Own-Eggs-for-Surrogacy-2026-Data-Insights', '代孕中使用自体卵与捐赠卵的决策与数据口径', '代孕中选择自体卵还是捐赠卵，没有仅凭“38岁”或单一成功率就能决定的规则。自体卵路径更受取卵者年龄、卵巢储备和既往周期影响；捐赠卵还涉及捐赠者筛查、遗传与感染风险沟通、法律文件、未来披露和额外费用。两类CDC成功率使用的分母不同，不能直接横向排名。', 'medical', [
    ['先比较目标而不是标签', '自体卵可保留与卵子提供者的遗传联系，但可能需要多次促排或取卵；捐赠卵可以在医学上绕开部分与卵子年龄或遗传风险相关的问题，却不会消除胚胎、移植、妊娠或新生儿风险。选择应从“现有胚胎和病史是什么”“家庭最在意什么”开始。'],
    ['成功率为什么不能直接比较', 'CDC把自体卵数据按计划取卵、实际取卵、移植和一年内累计结果展示；捐赠卵或捐赠胚胎数据常按当年移植、非累计方式展示。若一栏按取卵计算、另一栏按移植计算，即使百分比看起来更高，也不代表两条路径对同一个人的真实机会。'],
    ['医学评估要看哪些因素', '医生会结合年龄、AMH和窦卵泡等卵巢储备指标、既往促排反应、精子因素、遗传史、子宫或载体情况及现有胚胎。卵巢储备可以帮助估计取卵反应，却不能单独保证卵子质量或活产。个体预测应来自诊所，而非机构网页的年龄分界。'],
    ['捐赠卵特有的尽调', 'ASRM建议围绕捐赠者的医学与家族史、感染病检测、遗传筛查、心理教育和知情同意建立流程。定向捐赠还需讨论各方关系、未来联系和独立法律咨询。直接面向消费者的DNA检测也使“永远匿名”的承诺越来越不现实。'],
    ['家庭与孩子的长期问题', '准父母还应讨论是否、何时以及如何向孩子解释捐赠受孕事实，怎样保存可共享的非识别医学信息，以及未来若出现重要遗传信息由谁联系。ASRM鼓励就披露开展咨询；这不是一次付款选择，而是长期家庭信息管理。'],
  ], [S.cdcSuccess, S.asrmDonation, S.asrmDisclosure], ['/zh/egg-donation', '/zh/partner-ivf-clinics', '/zh/surrogacy-process'], 2, 'pending-reproductive-endocrinologist-or-genetic-counselor-review', false),

  p('Polygenic-Embryo-Screening-in-2026-Why-ASRM-Urges-Caution', 'PGT-P多基因胚胎筛查的临床限制与伦理问题', 'ASRM在2025年12月发布、对应2026伦理意见的结论是：多基因胚胎筛查（PGT-P）目前缺乏已证明的临床效用，不应作为常规生殖服务提供。它与PGT-A或针对特定单基因病的PGT-M不同；多基因风险分数是概率估计，会受数据族群、基因与环境互动、可选胚胎数量和模型变化影响。', 'medical', [
    ['PGT-P在估计什么', 'PGT-P试图把许多常见遗传变异汇总成多基因风险分数，用于估计某些复杂疾病的相对风险。高血压、糖尿病或心脏病等疾病并非由单个变异决定，环境、生活方式和未测因素也会影响结果，因此分数不是“会得病或不会得病”的诊断。'],
    ['为什么可迁移性重要', '风险模型通常来自特定祖源和样本，换到代表性不足的族群时预测表现可能下降。即使模型在群体层面有统计关联，也不等于能在同一家庭少量胚胎之间产生具有临床意义的差异。页面不能把实验室排序写成健康保证。'],
    ['与PGT-A和PGT-M的区别', 'PGT-A关注染色体数目异常的筛查；PGT-M针对已知单基因疾病家族风险设计；PGT-P则估计多因素疾病的概率。三者的证据、检测目的和结果解释不同。把它们都称作“胚胎基因筛查”会让读者误以为准确度和临床用途相同。'],
    ['知情同意要覆盖什么', '咨询应说明模型版本、适用族群、绝对风险与相对风险、可能的误解、未检测选项、剩余胚胎处置和数据隐私。还要讨论是否会不成比例地影响残障群体、加剧资源不平等，或把复杂健康结果简化成消费者排名。'],
    ['当前可执行的下一步', '若收到PGT-P商业提案，先请生殖医生和遗传咨询师说明是否属于研究、有哪些同行评审证据、结果是否会改变治疗，以及退出检测会怎样。代孕机构不应代替临床团队推介或解释此类检测，更不能用“更健康宝宝”作营销承诺。'],
  ], [S.asrmPgtp, S.asrmPgta, S.asrmGlossary], ['/zh/partner-ivf-clinics', '/zh/surrogacy-process', '/zh/egg-donation'], 2, 'pending-reproductive-endocrinologist-or-genetic-counselor-review', false),

  p('Surrogacy-After-Hysterectomy-Is-It-Still-Possible', '子宫切除后通过代孕生育的医学评估路径', '子宫切除后本人不能再在子宫内怀孕，但仍可能通过已有胚胎、已保存卵子、保留且可取卵的卵巢，或捐赠卵与妊娠载体建立家庭。能否取卵不能只看“卵巢是否还在”，还取决于卵巢功能、手术方式、基础疾病、既往放化疗、盆腔解剖和取卵安全性。', 'medical', [
    ['先确认做了哪种手术', '全子宫切除通常移除子宫和宫颈；次全切除保留宫颈；根治性手术还可能移除周围组织。输卵管和卵巢是否同时切除是另一件事。ACOG明确区分子宫切除、输卵管切除和卵巢切除，读者应先取得手术记录和病理报告。'],
    ['保留卵巢不等于一定能取卵', '卵巢可能保留激素和卵泡功能，但盆腔粘连、血供变化、卵巢位置、年龄或原发疾病会影响促排和取卵。生殖医生通常会结合病史、超声和实验室指标评估；网页不能据“有卵巢”直接判断安全、可行或成功率。'],
    ['若卵巢也被切除或受损', '双侧卵巢切除后不能再从本人取得卵子，但已冷冻卵子或胚胎仍可能使用；否则可讨论捐赠卵或捐赠胚胎。若手术与癌症、放疗或化疗有关，还需由肿瘤和生殖团队评估复发风险、遗传信息和治疗后的时间安排。'],
    ['妊娠载体流程中的评估', 'ASRM把获得性无子宫列为可以考虑妊娠载体的医学情形之一。后续仍需要胚胎方案、准父母医学评估、载体筛查、心理教育、独立法律代理、保险与预算审核。使用载体并不会消除胚胎移植失败或妊娠并发症。'],
    ['就诊前准备清单', '整理手术名称和日期、是否保留卵巢、病理结果、肿瘤治疗史、既往生育力保存记录及当前用药。向诊所分别询问卵巢功能、取卵通路、麻醉和手术风险、是否需要其他专科许可，以及使用已有胚胎或捐赠卵的备选路径。'],
  ], [S.acogHysterectomy, S.asrmPreservation, S.asrmGc], ['/zh/partner-ivf-clinics', '/zh/egg-donation', '/zh/surrogacy-process'], 2, 'pending-reproductive-endocrinologist-review', false),

  p('Can-You-Become-a-Surrogate-in-California-Key-Requirements-Explained', '加州代孕申请的机构初筛、医学批准和法律审查', '在加州能否成为妊娠载体，不由一个年龄、BMI、输卵管结扎或单项病史独立决定。实际流程至少包括机构初筛、IVF诊所医学评估与心理评估，以及独立法律咨询；ASRM给出的是专业建议，诊所和项目还可能采用更严格的标准。', 'medical', [
    ['三层决定不能混为一层', '机构会先核对基本孕史、生活稳定性、支持系统和项目政策；诊所负责评估妊娠与药物风险并决定医学许可；律师则解释合同、补偿、医疗自主和亲权程序。机构“预符合”不等于诊所已经批准，也不等于最终法律文件已经完成。'],
    ['ASRM建议如何理解', 'ASRM建议妊娠载体达到法定年龄，通常优先考虑21至45岁、有至少一次足月且无并发症妊娠、家庭环境稳定并拥有支持系统。既往分娩和剖宫产次数也是风险讨论因素。这些建议不是孕达自行创造的统一法律门槛。'],
    ['具体病史需要个案判断', 'HSV、输卵管结扎、甲状腺问题、既往妊娠糖尿病或高血压、抑郁焦虑史、用药和剖宫产都可能需要更多资料，但不能在网页上直接判定合格或不合格。诊所可能要求产科记录、专科意见、停药或稳定期，最终依据完整病历。'],
    ['医疗自主与知情同意', '妊娠载体从用药、移植到产检、分娩和产后照护都是自身医疗决定的唯一同意人。匹配前应讨论胚胎数量、产前检查、减胎或终止妊娠观点、分娩偏好和信息共享，合同不能替代其医疗自主。'],
    ['申请前可以准备什么', '准备既往产科记录、分娩和剖宫产记录、当前药物、疫苗和家庭支持情况；如实披露比追求“通过答案”更重要。读者可以先查看资格信息并提交初步咨询，再由诊所和独立专业人员完成后续判断。'],
  ], [S.asrmGc, S.asrmGcEthics, S.ca7962], ['/zh/surrogate-requirements', '/zh/be-surrogate', '/zh/surrogacy-protection-california'], 2, 'pending-medical-review', false),

  p('Surrogate-Mother-Requirements-2025-Qualifications-Key-Criteria', '代孕妈妈资格、补偿构成与合同边界', '代孕妈妈资格通常同时考察既往健康孕史、当前身体与心理状况、生活稳定性、支持系统、背景资料和独立知情同意；机构初筛不能替代IVF诊所的医学批准。补偿也不是统一工资，而是按地区、经验、项目和合同拆分为基础补偿、津贴、报销及特定事件费用。', 'medical', [
    ['资格由谁决定', '机构可以说明申请范围并收集记录，IVF诊所负责医学和生殖风险判断，心理专业人员评估压力、支持与沟通准备，律师解释合同和权利。只有这些步骤按项目完成后，才适合谈具体匹配与移植时间。'],
    ['常见而非绝对的医学因素', 'ASRM通常建议成年、曾有至少一次足月无并发症妊娠，并拥有稳定家庭环境和支持。年龄、既往分娩及剖宫产次数、BMI、慢性疾病、用药、吸烟或物质使用都会进入评估，但单一数字不应包装成适用于所有诊所的法律标准。'],
    ['补偿应怎样阅读', '基础补偿是合同约定的一部分，另可能有月度津贴、服装、交通、误工、托育和特定医疗事件费用。网页金额只能作为特定日期和项目的说明，不能保证每位申请人获得相同金额，也不能把医疗风险“定价”为自动付款。'],
    ['付款节点取决于合同', '托管注资时间、补偿开始条件、未成功移植、流产、住院、剖宫产、多胎或项目终止后的费用责任，应由双方独立律师在合同中明确。机构不能以“全部承担”替代书面条款，代孕者也应能独立查看付款记录和争议流程。'],
    ['先问安全与权利', '申请人应先确认谁支付医学筛查、独立律师、保险评估和必要差旅，谁可接触医疗资料，如何处理工作和家庭安排，以及出现并发症时有哪些支持。高补偿不应掩盖医疗自主、长期健康和退出匹配前的选择权。'],
  ], [S.asrmGc, S.asrmGcEthics, S.ca7962], ['/zh/surrogate-requirements', '/zh/be-surrogate', '/zh/surrogacy-protection-california', '/zh/surrogacy-cost'], 2, 'pending-medical-and-policy-review', false),

  p('Surrogacy-and-Insurance-2025-Essential-Coverage-for-Surrogate-Mothers', '代孕妈妈孕产保险的核验流程与常见除外', '代孕妈妈已有健康保险不等于保单一定支付代孕相关孕产照护，也不能据计划名称判断“所有费用都受保”。核验应查看完整计划文件和SBC，确认代孕除外、网络、孕产服务、自付额与上限、先授权、理赔追偿、并发症、产后期限和备用方案，并取得书面说明。', 'insurance', [
    ['先区分三类费用', '载体本人的孕产医疗、准父母的IVF与胚胎服务、新生儿出生后的医疗保障通常由不同主体和保单处理。把三者写成一个“代孕保险包”容易误导。每一项都需要确认被保险人、服务日期、网络、账单提交方式和责任方。'],
    ['从哪些文件开始', 'SBC便于比较免赔额、共保、自付上限和示例，但通常不足以识别全部代孕条款。还应取得Evidence of Coverage、福利手册、排除条款、药品目录和先授权规则；若是雇主计划，先确认是全保险还是雇主自筹资计划。'],
    ['必须书面询问的问题', '询问妊娠载体安排是否被排除、常规产检和分娩如何支付、网络外急诊如何处理、并发症和产后照护期限、保险方是否主张第三方责任或追偿，以及计划续保或雇佣变化后会发生什么。记录日期、代表姓名和工单号。'],
    ['备用保单不是自动答案', '若现有保单不适用，可能需要在合格投保窗口评估其他方案，但新保单也有网络、费用和生效时间。不要在没有持牌人员书面分析时宣称某个商业方案“无自付”或适合所有人；合作关系和佣金也应披露。'],
    ['新生儿需要单独安排', 'HealthCare.gov说明出生可触发特别投保期，但准父母仍需事先确认如何将孩子加入自己的计划、需要哪些出生文件和时限。新生儿费用不应默认由载体保单承担，国际家庭还需提前协调美国和居住国的保障及付款。'],
  ], [S.healthcareSbc, S.healthcarePregnancy, S.dolErisa], ['/zh/surrogacy-protection-california', '/zh/surrogacy-cost', '/zh/surrogacy-process'], 3, 'pending-licensed-insurance-review', false),

  p('How-to-Afford-Surrogacy-Smart-Financing-Options-Revealed', '代孕融资的预算步骤、信贷成本与风险比较', '负担代孕费用的第一步不是立即申请贷款，而是建立分阶段、可解释的预算：区分机构协调、代孕者补偿与报销、IVF、法律、保险、托管、差旅和应急费用，再比较储蓄、雇主福利、补助、众筹、个人贷款或房屋净值融资。所有借款都应按APR、费用、期限、月供、抵押风险和退款条件比较。', 'insurance', [
    ['先做三种预算情景', '基础情景列出已知合同和报价，中等情景加入额外移植、保险变化或差旅，高压力情景加入较长匹配、医疗并发症或新生儿费用。每个数字应标明来源、日期、是否含税费及谁收款，避免用一个“全美平均价”覆盖所有家庭。'],
    ['比较贷款要看总成本', 'CFPB提示个人分期贷款可能包含发起、文件、可选保险和逾期费用。APR把利率与部分费用合并为年度成本指标，比只看月供更有比较价值；同时还要看固定或浮动利率、提前还款、共同借款人责任和实际到账金额。'],
    ['房屋净值融资的特殊风险', '房屋净值贷款以住房权益作抵押，无法还款可能导致止赎，且有前期费用。家庭建立并非可保证回报的投资，因此不能用“最终一定成功”合理化以住房承担的风险。决定前可咨询独立的持牌财务顾问或非营利信用咨询机构。'],
    ['福利、补助和众筹', '雇主生育福利应核对资格、可报销项目、税务处理和离职影响；补助应查看申请费、竞争条件和付款对象。FTC提醒个人众筹的捐款通常不能抵税，平台规则、费用、资金控制和隐私也各不相同。'],
    ['把付款时间写进现金流', '把费用按咨询、胚胎准备、匹配、合同、移植、孕期和出生阶段排列，并确认哪些款可退、哪些不可退、托管何时注资。预留金不应套用无来源的10%或20%规则，而应由合同风险和家庭承受能力决定。'],
  ], [S.cfpbFees, S.cfpbApr, S.cfpbHome, S.ftcCrowdfunding], ['/zh/surrogacy-cost', '/zh/surrogacy-process', '/zh/surrogacy-protection-california'], 3, 'pending-financial-compliance-review', false),

  p('2026-Surrogate-Mother-Cost-Shock-What-Agencies-Don-t-Tell-You', '美国代孕总预算的包含项、发生时间与核验方法', '美国代孕总费用没有适用于所有家庭的固定数字，主要差异来自胚胎准备、机构服务、代孕者补偿与报销、法律、保险、托管、差旅及意外医疗情形。判断报价是否透明，应比较“包含什么、何时发生、谁收款、什么情况下追加或退款”，而不是用“机构都在隐瞒”作未经证实的结论。', 'insurance', [
    ['删除点击诱导式前提', '费用差异可能来自服务范围、地区、保险和个案复杂度，不能据价格高低推断机构动机。页面应把重点放在可验证文件：服务协议、第三方估价、补偿表、保险分析、法律报价和托管计划。对无法确认的数字明确标注“需询价”。'],
    ['预算至少分成七栏', '建议分别列机构协调、载体筛查与匹配、基础补偿和报销、IVF及药物、双方律师与亲权程序、孕产和新生儿保险、托管与差旅。每栏记录估值日期、是否含税或管理费、付款对象和触发节点。'],
    ['低高情景怎样建立', '低情景只能基于已有胚胎、预期匹配与现有保险等明确假设；高情景可加入额外移植、重配、保单变更、住院或差旅。情景不是报价或保证，真正预算必须由当前诊所、律师、保险和机构书面材料组合。'],
    ['托管与退款要单独看', '确认资金由谁持有、何时注资、谁能批准支付、对账频率、争议流程和未使用余额如何退回。孕达不是托管机构，任何托管描述都应以独立托管协议为准，不能把机构费用和第三方受托资金混成一个余额。'],
    ['签约前的对比问题', '询问机构费包含的里程碑、重配或失败移植如何收费、哪些服务由外部专业人员提供、保险分析是否另收费、报价有效期及终止后的责任。将不同机构的相同项目对齐后再比较总额，避免把范围较窄的报价误认为更便宜。'],
  ], [S.circle, S.cfpbApr, S.asrmGc], ['/zh/surrogacy-cost', '/zh/surrogacy-protection-california', '/zh/surrogacy-process'], 3, 'pending-business-and-financial-review', false),

  p('Does-Insurance-Cover-IVF-or-Surrogacy-in-2026-Full-Guide', 'IVF与代孕保险的总览核验矩阵', '保险可能支付部分IVF、药物或孕产医疗，但“IVF保障”“代孕保障”和“新生儿保障”是不同问题。是否适用取决于计划类型、州法、雇主设计、医疗必要性、先授权、第三方生殖条款和服务对象；任何家庭都应以自己的书面计划文件和持牌专业分析为准。', 'insurance', [
    ['先按服务与付款方拆开', '卵巢评估、促排药物、取卵、实验室、胚胎检测、冷冻和移植可能各有不同规则；载体孕产医疗通常看载体保单；孩子出生后的医疗通常要进入准父母安排的新生儿保障。一个环节获赔不代表整条路径获赔。'],
    ['计划类型决定州法影响', '州级保险要求通常直接影响受州监管的全保险计划；许多私人雇主自筹资计划受ERISA框架管理，州级福利要求未必同样适用。先向雇主福利部门或计划管理员书面确认计划资金类型，再解读“本州强制保障”列表。'],
    ['核验材料清单', '收集SBC、完整福利手册、排除条款、药品目录、网络名单、先授权和申诉规则。向保险方提供准确的服务代码、诊断、实施机构和接受服务的人，分别询问福利、限制、预计自付与书面预授权。'],
    ['常见不能保证的事项', '计划可能涵盖诊断却不涵盖IVF，涵盖取卵却限制药品，或支付载体一般孕产护理但对第三方责任另有处理。即使法条禁止基于第三方生殖身份作某些排除，也不等于代孕机构费、补偿、法律或托管费用成为医疗保险福利。'],
    ['建立复核时间点', '在选择诊所前、用药前、匹配后、保单续保时和预产期前分别复核。雇佣变化、年度计划更新、网络变化或出生地改变都可能影响安排。保存书面答复和申诉时限，不依赖一次客服电话。'],
  ], [S.healthcareSbc, S.dolErisa, S.sb729], ['/zh/surrogacy-protection-california', '/zh/partner-ivf-clinics', '/zh/surrogacy-cost'], 3, 'pending-licensed-insurance-review', false),

  p('Is-IVF-Covered-by-Insurance-What-Intended-Parents-Should-Know', '准父母核验IVF保险的操作清单', 'IVF是否受保不能只查“所在州是否强制”，还要确认计划是全保险还是自筹资、法规何时适用、谁是被保险人、哪些诊断和服务符合条件，以及取卵、药物、实验室、冷冻、移植和遗传检测是否分别需要先授权。最可靠的结果是逐项书面确认，而不是州名单或客服电话的一句“有生育福利”。', 'insurance', [
    ['第一问：我的计划是什么类型', '从SBC、计划文件或雇主福利部门确认个人、州市场、小型团体、大型团体、政府或自筹资雇主计划。ERISA可能影响州法对私人自筹资计划的适用，计划管理员和承保保险公司也可能不是同一主体。'],
    ['第二问：哪些服务被分别列出', '把诊断检查、促排药物、监测、取卵、麻醉、受精、培养、ICSI、冷冻、储存、胚胎活检、PGT和移植分别询问。确认周期或取卵次数限制、年龄或医疗必要性标准、网络实验室及药品专科渠道。'],
    ['第三问：第三方生殖怎样处理', '若胚胎将用于妊娠载体，询问这是否改变准父母本人取卵或胚胎服务的福利；不要把载体孕产保险与准父母IVF福利混在一起。加州SB 729对受其约束计划的第三方生殖排除有限制，但具体计划、生效与例外仍需核对。'],
    ['第四问：如何取得书面决定', '索取福利确认、先授权决定和适用条款页码，保存代表姓名、日期和工单号。若被拒，要求书面拒付理由、使用的医疗必要性标准和内部/外部申诉步骤；诊所财务团队可提供代码，但不能代保险方保证付款。'],
    ['没有保障时怎样规划', '向诊所索取按步骤的自费估价和退款规则，比较药房、实验室与储存费用，并把多周期可能性纳入预算。任何贷款或雇主报销也应确认税务、资格、离职影响和实际报销时间。'],
  ], [S.healthcareSbc, S.dolErisa, S.dmhc], ['/zh/partner-ivf-clinics', '/zh/surrogacy-protection-california', '/zh/surrogacy-cost'], 3, 'pending-licensed-insurance-review', false),

  p('California-IVF-Coverage-2026-SB-729-and-Surrogacy-Explained', 'California SB 729的适用计划、生效规则与第三方生殖边界', 'California SB 729并不是“所有加州居民从2026年起免费做IVF”。法案要求受约束的大型团体计划在签发、修订或续保时提供不孕诊断和治疗保障，并要求小型团体计划提供可选保障；DMHC 2026修订指引进一步解释适用服务和实施。计划类型、生效/续保日、医疗必要性、网络、费用分担和法定例外仍需逐项确认。', 'insurance', [
    ['大型与小型团体的区别', '法案文本规定，受约束的大型团体计划应提供包括IVF在内的生育服务保障，并列出最多三次完成取卵和符合要求的胚胎移植框架；小型团体计划是必须“提供购买选项”，不是每份小型团体合同自动包含。'],
    ['生效取决于合同节点', '条文以计划在规定日期后签发、修订或续保为触发点，因此不是所有人同一天切换福利。CalPERS、Medi-Cal管理式计划、宗教雇主及其他法定类别还有特定例外或延后时间。应核对自己的续保日和监管机构。'],
    ['第三方生殖条款意味着什么', 'SB 729限制受约束计划仅因参与卵子、精子或胚胎捐赠、妊娠载体等第三方生殖而排除相关生育服务。但它没有把机构费、载体补偿、独立律师、托管或所有孕产费用都转化成保险福利。'],
    ['法律没有保证什么', '法案不保证每家诊所都在网络内，也不取消符合一般规则的先授权、医疗必要性审查或标准费用分担。小型团体雇主可能不购买所提供的选项，自筹资雇主计划也需单独分析。不要仅凭公司规模或加州地址下结论。'],
    ['核验步骤', '先从保险卡和SBC确认监管主体与计划类型，再查看2026福利手册、续保日期和DMHC指引。把取卵、药物、实验室、储存、移植和第三方生殖逐项书面询问；若答复冲突，要求引用具体条款并咨询持牌人员。'],
  ], [S.sb729, S.dmhc, S.dolErisa], ['/zh/surrogacy-protection-california', '/zh/partner-ivf-clinics', '/zh/single-parents-lgbtq'], 3, 'pending-california-insurance-and-legal-review', false),

  p('New-Fertility-Coverage-Rules-for-LGBTQ-Single-Parents-in-2026', 'LGBTQ+与单身家庭的生育保障法规和保单核验', '2026年并不存在一条让全美LGBTQ+或单身准父母自动获得IVF与代孕全额保障的统一新规。变化来自具体州法、监管指引和雇主计划；例如California SB 729扩大部分受约束团体计划的生育服务规则，并禁止基于婚姻状况、性别身份或性取向等进行差别保障，但计划类型和例外仍然重要。', 'insurance', [
    ['非歧视不等于所有服务都获赔', '计划不能因受保护身份实行违法差别待遇，并不意味着每一种生育服务、第三方费用或境外安排都属于福利。读者仍需确认医疗必要性定义、网络、先授权、取卵次数、药品、捐赠配子和妊娠载体条款。'],
    ['California实例怎样正确引用', 'SB 729把“个人或与伴侣无法在没有医疗干预下生育”等情形纳入不孕定义，并要求保障不得基于婚姻状况、性别表达、性别身份或性取向等歧视。大型和小型团体计划承担的义务不同，生效也与续保相关。'],
    ['先确认家庭建立路径', '男同性伴侣通常需要卵子来源、胚胎创建和妊娠载体；女同性伴侣可能考虑IUI、IVF、互惠IVF或载体；单身家庭所需配子和载体因个体不同。先列出实际服务，才能逐项查福利，而不是只问“是否支持LGBTQ+”。'],
    ['跨性别与生育力保存', '激素、手术和既往保存的配子会影响选择，但不能从身份推断器官、治疗或生育目标。应使用包容但精确的医学提问，由生殖医疗团队评估生育力保存、取卵、精子保存或妊娠选择。'],
    ['书面核验路径', '确认计划资金类型、监管机构和续保日；索取SBC与完整条款；分别询问本人治疗、捐赠配子、载体和新生儿保障；记录书面决定和申诉方式。Family Equality等目录可帮助寻找包容服务者，但目录收录不等于保险或法律保证。'],
  ], [S.sb729, S.dmhc, S.familyEquality], ['/zh/single-parents-lgbtq', '/zh/surrogacy-protection-california', '/zh/partner-ivf-clinics'], 3, 'pending-insurance-and-legal-review', false),

  p('2026-Surrogacy-Law-Map-States-That-Protect-Intended-Parents', '美国州级代孕法比较入口与风险筛查', '美国没有统一的联邦代孕法，也不存在可以永久贴在州名上的“友好州”标签。州法可能分别规定合同效力、补偿、资格、独立律师、签约时点、医疗自主和亲权程序；同一项目还可能同时关联合同地、代孕者居住地、诊所地、分娩地和准父母所在地。', 'legal', [
    ['地图应比较哪些字段', '每州至少应记录妊娠代孕合同是否有成文法、补偿如何处理、双方资格与独立律师要求、是否必须在用药或移植前签署、亲权确认路径、家庭结构限制、官方来源和复核日期。简单的绿色或红色地图无法表达这些差异。'],
    ['成文框架的不同例子', 'California Family Code §7962要求双方由独立律师代理并在相关医疗程序前完成公证协议；Nevada NRS 126.710至126.810设有妊娠协议与亲权框架；New York Family Court Act Article 5-C还规定载体权利、保险披露和协议内容。'],
    ['“允许”也不等于结果保证', 'Illinois、New York、California和Nevada都提供法定路径，但只有满足具体资格、文件、签署和程序要求时，合同与亲权处理才更可预测。法院实践、事实差异和跨州冲突仍可能改变步骤，不能保证出生前命令或固定办理时间。'],
    ['受限州应写清限制类型', 'Nebraska法条使其定义范围内的有偿代孕合同无效且不可执行；Louisiana仅在非常具体条件下承认妊娠载体合同，并限制补偿和家庭/遗传条件。它们说明“受限”可能针对补偿、合同执行或资格，而不是一个笼统的刑事禁令。'],
    ['使用地图的正确方式', '先把地图当作筛查入口，再让相关州律师根据项目事实确认。每次匹配、诊所或分娩地点变化时重新分析；页面注明“截至2026年7月31日”，且州别结论在相应专业复核完成前不得视为个案意见。'],
  ], [S.ca7962, S.nv126, S.ny581, S.ne2521200, S.la2720], ['/zh/surrogacy-protection-california', '/zh/surrogacy-process', '/zh/be-parents'], 4, 'pending-multi-jurisdiction-reproductive-law-review', false),

  p('Nevada-Surrogacy-Laws-Explained--What-You-Need-to-Know', '内华达妊娠代孕协议与亲权程序要点', '内华达州NRS 126.710至126.810为妊娠代孕协议和亲权确认提供法定框架，但“法律允许”不代表每个项目都会自动取得出生前命令，也不能保证固定时间。协议资格、书面内容、独立法律意见、医疗程序时点、法院管辖和项目跨州事实都需由内华达州生殖律师核对。', 'legal', [
    ['先确认适用的是妊娠代孕', '内华达法定框架围绕gestational agreement，即载体与胚胎没有预定的遗传关系。传统代孕涉及不同亲权与合同问题，不能把本页流程直接套用。页面应始终区分胚胎来源、载体身份和准父母身份。'],
    ['协议不能等到移植后再补', '法条对协议当事人、签署和内容有具体要求，项目团队通常需要在相关辅助生殖程序前取得法律许可。协议应处理亲权意图、费用、医疗相关责任、记录和争议等，但任何条款都不能替代载体对自身医疗的知情同意。'],
    ['独立律师为什么必要', '准父母与载体的利益并不完全相同，ASRM也强调各方应有适用州执照的独立律师。机构可以协调资料和时间，却不应同时代表双方解释权利，更不能把模板合同当作个案法律意见。'],
    ['亲权程序需要个案确认', 'NRS提供确认准父母身份的裁判路径，但提交法院、证据、时点、分娩医院和跨州文件会随事实变化。页面不能宣称所有家庭都能取得出生前命令，也不能用15至24个月的项目周期代替法院处理时间。'],
    ['开始前的律师清单', '提供载体居住地、诊所地、预期分娩地、准父母居住地、婚姻和遗传关系、胚胎来源及既往协议。请律师书面确认适用法、合同截止时间、亲权文件、出生证安排和国际家庭可能需要的后续文件。'],
  ], [S.nv126, S.asrmGc, S.nvBar], ['/zh/surrogacy-protection-california', '/zh/surrogacy-process', '/zh/be-parents'], 4, 'pending-nevada-reproductive-law-review', false),

  p('How-to-Choose-a-Surrogacy-Lawyer-in-2026-What-Parents-Should-Ask', '如何核验代孕律师执照、经验、独立性与服务边界', '选择代孕律师时，先确认其在实际适用州执业且具有辅助生殖法律经验，再询问由谁代表谁、合同与亲权服务范围、跨州冲突、收费和紧急安排。律师能降低可预见风险并解释选择，但不能“确保成功”、保证法院命令或代替另一方的独立律师。', 'legal', [
    ['先核验执照和纪律记录', '在相应州律师协会查询当前执业状态、公开纪律记录和联系资料，注意同名人员。州律师推荐服务可以帮助找到执业者，但被推荐不等于该律师已被认证为代孕专家；仍需询问实际办理过的项目类型和司法辖区。'],
    ['确认利益冲突与代表关系', '准父母和载体应分别拥有只对自己负有职责的律师。询问机构、诊所、托管方或保险方是否与律师存在业务关系，谁支付费用，付款是否影响律师独立性，以及律师是否会在出现争议时继续代理。'],
    ['把服务范围写清楚', '确认报价是否包含合同起草或审阅、谈判轮次、法律许可函、亲权申请、出生证协调、听证、国际文件及产后补充工作。若只包含合同，不要假设亲权程序也已包含；固定费与小时费的追加条件应写入委托协议。'],
    ['用事实测试跨州经验', '向律师提供载体居住、诊所、签约和分娩地点，以及准父母居住地和家庭结构，请其解释哪一州法律可能适用、哪些步骤需当地律师协作、地点变化时是否要重新分析。能清楚说明不确定性比给出“全美都可办”的答案更可信。'],
    ['签约前十问', '询问最近处理同类项目的时间、独立代理安排、合同截止节点、医疗自主条款、保险与费用责任、托管、亲权路径、应急联系人、文件保存和退出项目后的责任。要求对无法保证的结果作明确说明。'],
  ], [S.asrmGc, S.nvBar, S.ca7962], ['/zh/surrogacy-protection-california', '/zh/surrogacy-process', '/zh/be-parents'], 4, 'pending-reproductive-law-review', false),

  p('Is-Surrogacy-Legal-in-All-50-States-in-2026-What-Families-Often-Get-Wrong', '美国50州代孕法律是否统一及常见误区', '代孕并非在美国50州以同一种方式“合法”。截至2026年7月31日，各州可能有完整妊娠代孕法、部分规则、依赖判例，或使某类合同无效并限制补偿。真正需要回答的不是一个是/否，而是具体安排能否执行、谁符合资格、如何确认亲权以及哪些州与项目有关。', 'legal', [
    ['误区一：没有禁令就等于安全', '州法没有明确禁止，不代表合同条款、补偿和亲权程序已经确定。缺少成文法的州可能依赖法院和县级实践，结果更需要当地律师分析。不要把“未见禁止”写成“完全合法”。'],
    ['误区二：只看准父母居住州', '载体居住地、诊所和移植地、协议签署地、分娩地以及胚胎来源都可能带来法律联系。准父母选择一个被称为友好的州，并不能自动排除其他州的规则。'],
    ['误区三：所有代孕类型相同', '妊娠代孕中载体不提供卵子；传统代孕中载体与孩子有遗传联系。某州可能承认前者的协议，却对传统代孕、补偿或同意撤回采用不同规则。页面和合同必须用准确类型。'],
    ['误区四：亲权命令自动产生', 'California、Nevada、New York和Illinois等提供法定路径，但仍要求满足文件、签署、律师、资格或法院程序。具体家庭结构、遗传关系和地点会影响提交材料；法定路径不是结果保证。'],
    ['误区五：一张名单长期有效', '近年来多个州更新了亲权和妊娠载体立法，旧文章很快失效。本页只解释误区，不复制完整州地图；州别详情应进入带法条与复核日期的法律地图，并在匹配后由适用州律师重新确认。'],
  ], [S.asrmPolicy, S.ca7962, S.nv126, S.ne2521200], ['/zh/surrogacy-protection-california', '/zh/surrogacy-process', '/zh/be-parents'], 4, 'pending-multi-jurisdiction-reproductive-law-review', false),

  p('What-States-Is-Surrogacy-Illegal-A-Clear-Guide-to-US-Surrogacy-Laws', '哪些州对代孕合同、补偿或家庭资格有限制', '“哪些州代孕非法”没有一张稳定的二元名单，因为有的州限制有偿合同，有的使特定合同不可执行，有的只承认满足严格资格的妊娠代孕，还有的对传统代孕采用不同规则。更安全的筛查方式是按合同执行、补偿、代孕类型、家庭资格和亲权程序分类。', 'legal', [
    ['合同无效不等于同一法律后果', 'Nebraska §25-21,200规定其定义范围内的有偿代孕合同无效且不可执行。这样的规则主要说明合同不能按预期执行，不应被简化为对所有参与者、所有安排都构成同一种刑事犯罪。'],
    ['严格限制州的例子', 'Louisiana只在法定条件下承认妊娠载体合同，要求法院在移植前批准，并限制补偿；法定“准父母”定义和胚胎遗传来源也非常具体。传统或遗传代孕合同另有无效规定。'],
    ['有框架州也有条件', 'California要求独立律师和医疗程序前签约；New York规定载体权利、保险披露和协议必备条款；Illinois与Nevada也设有资格或合同程序。把这些州只标为“合法”会遗漏不合规导致的风险。'],
    ['用四步做项目筛查', '先确认妊娠或传统代孕；再列出载体、诊所、签约和分娩地点；然后核对补偿、家庭结构和遗传来源；最后让各相关州律师确认合同与亲权步骤。任何地点或家庭事实改变后都要复核。'],
    ['本页不代替实时州表', '本页承担“风险筛查”意图，只列限制类型和官方示例，不声称穷尽50州。完整州表应有逐州法条、版本日期和专业复核；在这些门禁完成前，不应发布“非法州最终名单”。'],
  ], [S.ne2521200, S.la2720, S.la2718, S.ca7962], ['/zh/surrogacy-protection-california', '/zh/surrogacy-process', '/zh/be-parents'], 4, 'pending-multi-jurisdiction-reproductive-law-review', false),

  p('Is-Surrogacy-Legal-in-the-US-2026-Guide-for-Intended-Parents', '国际与首次准父母理解美国代孕法律的入口', '在美国，代孕法律主要由州决定，而不是一套全国许可。对国际或首次准父母而言，关键是同时规划合同、代孕者所在地、诊所和分娩地、亲权确认、出生证以及回居住国所需的国籍或旅行文件；“在美国做项目”本身不能保证所有环节都被承认。', 'legal', [
    ['联邦与州分别影响什么', '州法主要决定合同、亲权和出生记录路径；联邦或领事规则可能影响护照、国籍、移民和跨境文件。机构不能把州内亲权命令描述成自动解决所有国际法律问题，准父母可能需要美国和居住国律师协作。'],
    ['五个地点必须同时列出', '记录准父母居住地、代孕者居住地、协议签署地、IVF诊所和胚胎移植地、预期分娩地。律师会据此判断管辖、合同截止时间、是否需外州协作及亲权申请地点。'],
    ['遗传与家庭结构会改变文件', '单身、同性伴侣、婚姻状态、卵子或精子捐赠、捐赠胚胎和传统代孕可能影响所需证据。不要把“必须有遗传联系”或“完全不需要遗传联系”写成全美规则；应由具体州和回国要求共同确定。'],
    ['法律流程应在医疗前启动', 'ASRM建议各方在治疗开始前拥有适用州独立律师并完成协议与法律许可。出生前或出生后命令、医院文件和出生证安排的时间随州和法院而变，无法保证统一结果。'],
    ['首次咨询应准备什么', '准备护照与居住身份、婚姻文件、胚胎和捐赠来源、拟用诊所、载体州及回国计划。让律师书面列出合同、亲权、出生文件和国际步骤，并指出哪些结论需要另一司法辖区确认。'],
  ], [S.asrmPolicy, S.asrmGc, S.ca7962, S.nv126], ['/zh/surrogacy-protection-california', '/zh/surrogacy-process', '/zh/be-parents'], 4, 'pending-cross-border-and-reproductive-law-review', false),

  p('What-Are-the-Top-Surrogacy-Agencies-in-the-United-States', '美国代孕机构的透明比较框架', '不存在由美国政府或行业统一发布的“顶尖代孕机构”排名。本页采用截至2026年7月31日的公开资料，把机构当作比较案例，核对服务对象、匹配与筛查、法律和保险协调、费用披露、国际及LGBTQ+支持和持续服务；官网未披露的字段标为“需直接确认”，不据营销数字宣布最佳。', 'agency', [
    ['本页的方法与利益披露', '样本用于展示不同服务模式，不代表覆盖全美机构。资料优先采用机构官网和Family Equality等公开目录，记录复核日期；不采用匿名评论作事实。孕达是文中服务提供方之一，对比较结果有直接商业利益，因此读者应取得多家书面方案并独立核验。'],
    ['比较案例：大型全服务团队', 'Circle、Growing Generations和ConceiveAbilities在官网介绍了准父母、代孕者、捐赠配子或跨部门协调服务。它们的规模、内部团队和项目名称不同，官网自述的出生数、成功率或筛选比例必须核对分母、时间范围和审计方式，不能直接横向排名。'],
    ['比较案例：区域或精品服务', 'Roots、Hatch及其他机构可能强调更小团队、特定地区、捐赠配子或个性化协调。精品并不自动优于大型机构，大型也不自动更安全；关键是实际负责人的工作量、响应机制、候选人来源和外部专业人员如何衔接。'],
    ['必须取得的六份书面材料', '要求服务范围与不包含项、费用和退款/重配条款、候选人筛查流程、独立律师安排、保险分析与新生儿计划、投诉及紧急升级机制。若机构声称固定费用或结果保护，还要查看资格、上限、排除和退款条件。'],
    ['面谈时如何验证适配', '让机构用你的家庭结构、胚胎状态、预算、居住国和目标州解释实际路径；询问最近类似项目由谁负责、预计等待如何计算、信息多久更新一次。可信回答应能说明限制和外部依赖，而不是只给最快时间或成功承诺。'],
  ], [S.circle, S.growing, S.conceive, S.roots, S.hatch], ['/zh/be-parents', '/zh/surrogacy-process', '/zh/surrogacy-cost', '/zh/surrogacy-protection-california'], 5, 'editorial-source-verified', true),

  p('5-Best-Gay-Surrogacy-Agencies-in-2026-A-Shortlist-for-Two-Dads', '同性男性准父母比较代孕机构的五个公开案例', '“最佳同性家庭代孕机构”没有统一排名。本页把Growing Generations、ConceiveAbilities、Roots、Circle和Global Surrogacy Services作为五个公开案例，比较官网是否说明LGBTQ+服务、捐卵与胚胎协调、州别法律支持、费用材料和国际家庭能力；这不是背书，所有信息都需在签约前书面复核。', 'agency', [
    ['为什么选择这五个案例', '五家机构均有面向准父母的公开服务资料，其中多家单列LGBTQ+或同性家庭路径。入选只代表资料可用于比较，不代表质量排序、监管认证或适合每个家庭。Family Equality目录可作为包容性培训线索，但目录收录也不是结果保证。'],
    ['Growing Generations与Circle', '两家官网都明确介绍长期服务LGBTQIA+家庭，并说明捐赠配子、匹配和项目协调。读者应进一步询问官网所列经验或成功数字的分母、统计周期、是否经独立审计，以及固定费用或保护计划的资格和排除。'],
    ['ConceiveAbilities与Roots', 'ConceiveAbilities公开介绍同性家庭、捐卵和代孕服务；Roots说明其妊娠代孕范围和准父母流程。比较时确认实际服务州、是否拥有候选人库存、外部律师和保险团队、捐赠者项目与代孕项目是否为同一合同。'],
    ['Global Surrogacy Services', '其官网面向LGBTQ+、单身和国际准父母说明协调范围。跨境家庭应额外核对公司实体、合同适用法、美国现场负责人、付款接收方、回国文件和出现争议时的管辖，不以多语言营销等同于跨境法律能力。'],
    ['同性男性家庭的专属问题', '通常需要同时规划卵子来源、胚胎创建、谁提供精子、未来向孩子解释遗传与捐赠来源、两位父亲的亲权文件和国际承认。要求机构分别说明哪些环节由其完成、哪些由诊所或律师完成，并提供真实费用边界。'],
  ], [S.growing, S.conceiveLgbtq, S.roots, S.circleLgbtq, S.global, S.familyEquality], ['/zh/single-parents-lgbtq', '/zh/egg-donation', '/zh/surrogacy-protection-california', '/zh/be-parents'], 5, 'editorial-source-verified', true),

  p('How-to-Become-a-Surrogate-Mother-for-Celebrities-Requirements-Compensation', '高隐私代孕项目的资格、边界和安全问题', '不存在独立的“名人代孕妈妈资格”或统一更高补偿标准。高知名度准父母项目仍应使用普通妊娠载体的医学与心理筛查、独立律师、保险和知情同意流程；不同之处可能是更严格的保密、媒体安全和沟通安排，但NDA不能限制载体寻求医疗、法律或心理支持。', 'agency', [
    ['资格标准不因名人身份改变', 'ASRM建议的健康孕史、成年、支持系统、医学和心理评估同样适用。机构不应以“VIP项目”绕过筛查、催促签约或要求隐瞒病史。载体有权知道与自身治疗、合同和风险相关的实质信息。'],
    ['补偿不能凭身份推定', '项目可能因差旅、安保、沟通或隐私要求产生额外安排，但基础补偿和报销仍取决于地区、经验和合同。不能宣称名人项目必然给更高报酬、优先录取或由一方承担所有费用；所有支付条件应进入独立审阅的合同。'],
    ['NDA的合理边界', '保密条款可以保护身份、住址、医疗信息和未公开行程，但应明确允许载体与医生、自己的律师、心理专业人员、税务顾问和必要支持者沟通。不得利用NDA阻止报告安全问题、违法行为或获得紧急帮助。'],
    ['媒体与社交安全计划', '匹配前讨论社交媒体、照片、公开活动、医院访客、记者接触、数据存储和泄露后的响应。安全措施应同时保护载体及其家庭，不应把全部风险和限制单方面转嫁给载体。'],
    ['如何识别不当招募', '警惕要求先交费用、承诺与某位名人匹配、拒绝透露机构实体、不给独立律师时间或以高额补偿换取医疗决定控制的招募。真实项目也不应在完成匹配同意前泄露准父母身份。'],
  ], [S.asrmGc, S.asrmGcEthics, S.ca7962], ['/zh/surrogate-requirements', '/zh/be-surrogate', '/zh/surrogacy-protection-california'], 5, 'editorial-source-verified', true),

  p('Intended-Parents-and-Surrogates-Finding-the-Right-Surrogate-Relationship', '准父母与代孕者如何匹配沟通和长期边界', '合适的代孕关系不是“越亲密越好”，而是双方在沟通频率、就诊参与、隐私、医疗自主、分娩、困难决定和产后联系上有可持续的共同预期。匹配阶段应允许双方独立表达和拒绝，不把礼貌回答当成真正一致，也不把单一成功案例当作所有关系模板。', 'relationship', [
    ['先谈日常沟通', '确认偏好的消息工具、回复时间、视频或电话频率、谁参加预约、医疗更新由谁发送，以及时差和语言支持。还要约定一方需要休息、工作繁忙或出现坏消息时的沟通方式，避免把即时回复当成信任证明。'],
    ['医疗自主与共同准备并存', '代孕者是自身医疗决定的同意人，准父母可以表达价值观并参与事先讨论，但不能接管医疗决定。匹配前应诚实讨论胚胎数量、产前筛查、减胎或终止妊娠、分娩方式和紧急情况；重大分歧不应靠“以后再说”掩盖。'],
    ['隐私和社交媒体', '讨论是否分享姓名、照片、孕期消息和孩子出生信息，谁可以告知亲友，社交平台能否标记位置或医疗机构。边界既保护准父母，也保护代孕者及其孩子和伴侣；任何公开授权都应具体、可理解并能在发布前再次确认。'],
    ['产后联系没有标准答案', '有人希望持续成为家庭朋友，有人偏好节日更新，也有人需要逐渐减少联系。把预期写清并允许随生活变化重新商量，比承诺“永远像家人”更真实。若使用捐赠配子，还要另外规划孩子未来获得来源信息的方式。'],
    ['案例与授权要求', '网站只能使用取得明确授权、充分匿名化且不会泄露医疗或家庭身份的真实案例，并说明它是一段个体经历。未经记录授权，不应把客户对话包装成“真实故事”，也不应据个案推断普遍心理结果。'],
  ], [S.asrmGcEthics, S.asrmGc, S.asrmDisclosure], ['/zh/surrogacy-process', '/zh/surrogacy-protection-california', '/zh/be-parents'], 6, 'editorial-source-verified', true),

  p('Surrogate-Baby-Meaning-How-Surrogacy-Creates-Families', '通过代孕出生的孩子、遗传关系和法律亲子关系术语', '“通过代孕出生的孩子”比“代孕婴儿”更尊重，也更准确：代孕描述的是家庭建立和妊娠安排，不是孩子的身份。妊娠代孕中，妊娠载体通常不提供卵子；传统代孕中，怀孕者提供卵子。遗传关系、怀孕与分娩、以及法律亲子关系是三个不同概念。', 'relationship', [
    ['妊娠代孕怎样定义', '国际生育照护术语把妊娠代孕描述为将由准父母和/或第三方配子形成的胚胎转移给另一位女性，由其怀孕并按协议由准父母承担父母角色。妊娠载体与胚胎没有通过自身卵子形成的遗传关系。'],
    ['传统代孕为什么不同', '传统或遗传代孕中，怀孕者使用自己的卵子，因此同时具有妊娠和遗传联系。它在现代美国项目中涉及不同医学和法律问题，不能用妊娠代孕的合同或亲权说明直接替代。'],
    ['孩子不是被“交付的产品”', '避免“孩子归准父母所有”“购买孩子”或把补偿称为婴儿价格。补偿与报销针对时间、妊娠负担和约定费用；孩子拥有独立人格和权益。更合适的表达是准父母依法建立或确认亲子关系并承担照护责任。'],
    ['法律身份因州和程序而异', '不能笼统写“代孕者从来不是法律母亲”或“孩子出生自动属于准父母”。州法、协议是否合规、家庭结构、遗传来源和法院程序都会影响文件。具体项目应由适用州独立律师说明。'],
    ['如何向孩子解释', '家庭可以从小使用年龄适合、真实且尊重的语言说明，有准父母、提供配子的人和帮助怀孕的人共同参与。若涉及捐赠配子，ASRM鼓励就披露和信息保存进行咨询；开放不等于公开所有人的私人资料。'],
  ], [S.asrmGlossary, S.asrmGcEthics, S.asrmDisclosure], ['/zh/surrogacy-process', '/zh/surrogacy-protection-california', '/zh/egg-donation'], 6, 'editorial-source-verified', true),

  p('What-Is-a-Surrogacy-Father--Understanding-the-Role-and-Meaning', '准父亲、遗传父亲和法律父亲的区别', '“代孕父亲”不是稳定的医学或法律术语，更清楚的说法是“准父亲”或“意向父亲”。一个人可能是提供精子的遗传父亲、计划并承担养育责任的准父亲、经州法或法院确认的法律父亲，或同时具有这些角色；它们不应在网页中被自动画上等号。', 'relationship', [
    ['准父亲指什么', 'ASRM术语中的intended parent是通过医学辅助生殖表达成为父母意图的个人或伴侣。准父亲可以是单身男性、同性伴侣中的一位或异性伴侣中的一位，是否提供精子取决于家庭的胚胎与捐赠方案。'],
    ['遗传父亲指什么', '遗传关系通常来自精子贡献，但提供精子并不在所有州、所有辅助生殖情形下自动决定法律父亲身份。捐赠者、准父亲和配偶的法律角色可能不同，必须结合知情同意文件和适用州法。'],
    ['法律父亲怎样确认', '州法可能通过合规的妊娠代孕协议、亲权命令、出生后程序或其他亲子关系规则确认。不能概括为“一定需要基因”或“一定不需要基因”。家庭结构、婚姻、胚胎来源和项目地点都会改变文件。'],
    ['单身与同性父亲的实例', '单身准父亲通常需要卵子来源和妊娠载体，并规划自己的亲权与孩子文件；两位男性准父母还要说明谁提供精子、两人的亲权步骤和未来向孩子解释遗传来源的方式。两位父亲的养育角色不由遗传贡献高低决定。'],
    ['角色从匹配前就开始', '准父亲应参与预算、胚胎和捐赠咨询、匹配价值观、独立法律文件、孕期沟通、出生与产后照护准备。尊重载体医疗自主、保存孩子来源信息并准备长期诚实沟通，比使用模糊称谓更重要。'],
  ], [S.asrmGlossary, S.asrmGc, S.asrmDisclosure], ['/zh/single-parents-lgbtq', '/zh/egg-donation', '/zh/surrogacy-protection-california'], 6, 'editorial-source-verified', true),
]

const kaylaReviewer = {
  name: 'Kayla Luo',
  title: '北美区副总裁',
  profileUrl: '/zh/about#kayla-luo',
  scope: '辅助生殖行业流程与编辑审阅',
}

for (const page of pages) {
  if (![2, 3, 4].includes(page.batch))
    continue

  page.reviewStatus = 'reviewed-by-kayla-luo-industry-editorial'
  page.publishEligible = true
  page.reviewer = kaylaReviewer
}

if (pages.length !== 26)
  throw new Error(`Expected 26 pages, found ${pages.length}`)

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

function render(page) {
  const sections = page.sections.map(([heading, body]) => `<h2>${escapeHtml(heading)}</h2>\n<p>${escapeHtml(body)}</p>`).join('\n')
  const links = page.internalLinks.map(href => `<li><a href="${href}">${internalLabels[href]}</a>：继续查看孕达站内的相关教育内容。</li>`).join('\n')
  const sources = page.sources.map((href) => `<li><a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(sourceLabels.get(href) || new URL(href).hostname)}</a></li>`).join('\n')
  const reviewCopy = page.reviewer
    ? `本页由 ${page.reviewer.name}（${page.reviewer.title}）完成${page.reviewer.scope}；医疗、法律、保险或财务结论仍以具名来源以及处理个案的持牌专业人士意见为准。`
    : page.publishEligible
      ? '本页已完成公开来源与品牌边界编辑核验；页面不代表第三方背书，服务信息仍应在签约前重新确认。'
    : `本页当前状态为“${page.reviewStatus}”，在相应真实专业人员完成复核前，不应标示专业审阅完成或视为个案意见。`
  return `<p data-content-summary="true">${escapeHtml(page.summary)}</p>
<p><strong>适用范围：</strong>${escapeHtml(common[page.risk])}</p>
${sections}
<h2>下一步与站内资源</h2>
<p>把本文当作问题清单，而不是结果承诺。进入咨询、匹配、医疗、投保或签约前，请把个人事实和最新书面文件交给相应专业人员核对。</p>
<ul>
${links}
</ul>
<h2>资料来源</h2>
<p>以下资料用于核对本文的定义、规则和风险边界；外部页面可能更新，实施时应查看最新版本。</p>
<ul>
${sources}
</ul>
<p data-content-review-date="true">资料核查日期：${REVIEW_DATE}。${escapeHtml(reviewCopy)} <span data-content-marker="true">YUNDA-ZH-B${page.batch}-${escapeHtml(page.slug)}</span></p>`
}

const batches = new Map()
for (const page of pages) {
  if (!batches.has(page.batch))
    batches.set(page.batch, [])
  batches.get(page.batch).push(page)
}

for (const [batch, batchPages] of batches) {
  const draftDir = path.join(ROOT, 'seo-project', '05-content', 'drafts', 'zh-blog-content', `${PREPARED_AT}-batch-${batch}`)
  fs.mkdirSync(draftDir, { recursive: true })
  const updates = []
  for (const page of batchPages) {
    const draftFile = path.join(draftDir, `${page.slug}.html`)
    fs.writeFileSync(draftFile, `${render(page)}\n`, 'utf8')
    updates.push({
      route_id: page.slug,
      intent: page.intent,
      draftFile: path.relative(ROOT, draftFile),
      marker: `YUNDA-ZH-B${batch}-${page.slug}`,
      sources: page.sources,
      internalLinks: page.internalLinks,
      reviewStatus: page.reviewStatus,
      publishEligible: page.publishEligible,
      ...(page.reviewer ? { reviewer: page.reviewer } : {}),
    })
  }
  const config = {
    batch,
    preparedAt: PREPARED_AT,
    reviewDate: REVIEW_DATE,
    expectedCount: batchPages.length,
    updates,
  }
  fs.writeFileSync(path.join(ROOT, 'data', `zh-blog-content-batch-${batch}.json`), `${JSON.stringify(config, null, 2)}\n`, 'utf8')
}

const ledger = [
  '# 中文博客正文优化 Batches 2–6：来源与专业审阅台账',
  '',
  `- 准备日期：${PREPARED_AT}`,
  '- SOP 阶段：阶段 9（内容生产与页面优化）',
  '- 范围：正文优化矩阵剩余 26 页',
  '- 事实边界：只使用具名官方、监管、专业组织或机构官网资料；不把官网自述当成独立认证',
  '- 审阅边界：Batch 2–4 由 Kayla Luo（北美区副总裁）完成辅助生殖行业流程与编辑审阅；未附加医生、律师、保险或财务执业资质',
  '- 专业边界：医学、法律、保险和财务个案仍由处理个案的持牌专业人士确认；正文不得替代个案意见',
  '',
]
for (const [batch, batchPages] of batches) {
  ledger.push(`## Batch ${batch}`, '')
  for (const page of batchPages) {
    ledger.push(`### ${page.slug}`, '', `- 意图：${page.intent}`, `- 审阅状态：${page.reviewStatus}`, `- 可写入 CMS：${page.publishEligible ? '是' : '否'}`)
    if (page.reviewer)
      ledger.push(`- 审阅人：${page.reviewer.name}（${page.reviewer.title}）`, `- 审阅范围：${page.reviewer.scope}`)
    ledger.push('- 来源：')
    for (const href of page.sources)
      ledger.push(`  - ${sourceLabels.get(href) || href}: <${href}>`)
    ledger.push('')
  }
}
const ledgerPath = path.join(ROOT, 'seo-project', '05-content', 'briefs', `${PREPARED_AT}-zh-blog-body-batches-2-6-source-ledger.md`)
fs.writeFileSync(ledgerPath, `${ledger.join('\n')}\n`, 'utf8')

console.log(`Prepared ${pages.length} drafts across ${batches.size} batches.`)

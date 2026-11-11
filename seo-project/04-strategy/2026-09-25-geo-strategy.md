# Yunda GEO 内容资产战略（2026-09-25）

## 文档状态

- SOP：阶段 7 + 阶段 10
- 目的：规划未来 90 天可被搜索引擎和 AI 搜索引用的内容资产
- 范围：权威指南、FAQ、专家问答、MHB 活动/会议素材、视频字幕、第三方实体证据
- 本次执行：已获“开始优化”，仅产出策略与路线图；未写入 CMS、生产页面或外部平台
- 证据快照：2026-09-15
- 执行前恢复目录：`/tmp/yunda-geo-prechange-20260925T211450+0800`

## 1. 业务目标与搜索目标

Yunda 面向美国及国际准父母、LGBTQ+ 与单身准父母、中文家庭和代孕妈妈候选人，核心业务转化是准父母私密咨询与代孕妈妈申请。内容优先级按“高风险决策 + 商业意图 + 可验证的一手证据 + 可归因 CTA”排序。

未来 90 天的 GEO 目标：

1. 让 AI 能准确归属 Yunda 的品牌、服务边界和 MHB 参展实体关系。
2. 将现有高引用内容转为首段答案、FAQ、专家证据、字幕和机器可读摘要。
3. 用既有主页面承接流程、费用、保险、供卵和 LGBTQ+ 意图，减少新增博客互食。
4. 建立活动素材、专家授权、第三方提及和 CRM 归因的可复核链路。

## 2. 当前基线

### 第一方数据（2026-09-15）

| 指标 | 当前值 | 使用边界 |
|---|---:|---|
| GSC 生成式 AI 展现 | 4,818 | 13 天等长窗口；不等于访问或引用 |
| GA4 AI Assistant 会话 | 3 | Gemini 2、ChatGPT 1 |
| AI Assistant 关键事件 | 0 | CRM 有效询盘尚未核验 |
| GSC 自然搜索点击 | 135 | 13 天等长窗口 |
| GA4 自然搜索会话 | 176 | 13 天窗口 |

### 第三方估计（Semrush，2026-09-14/15）

| 指标 | 当前值 | 使用边界 |
|---|---:|---|
| AI Visibility | 14/100 | Worldwide、all AI platforms、六个月图表 |
| 品牌提及 | 1 | 当前唯一提及来自 Google AI Overview |
| AI 引用 | 206 | 第三方估计 |
| 被引用页面 | 74 | 第三方估计 |
| Connecticut 主题 | 可见度 8、提及 1 | 主题级信号，不代表全站趋势 |

### 内容库存

- 2026-07-29 库存：80 篇 CMS 博客，51 篇完成商业主题映射，29 篇不强制加入商业内链。
- 2026-09-04 发布记录：CMS 约 85 篇，42 篇仍没有中文正文。
- 活动中心页和两篇 MHB 相关博客已返回 HTTP 200，但 2026-09-15 URL Inspection 仍分别显示“Discovered - currently not indexed”和“URL is unknown to Google”。
- `llms.txt`、活动摘要 Markdown 和服务摘要 Markdown 已存在，需在发布后按同一事实源更新。

## 3. 内容资产地图

| 资产 | 用户问题 | 主页面 | 格式 | 证据要求 | CTA | 语言 | Owner |
|---|---|---|---|---|---|---|---|
| 美国代孕权威指南 | 美国代孕如何开始？ | `/surrogacy-process` | 答案段、步骤表、FAQ | ASRM、CDC、Yunda 流程事实 | `/be-parents` | EN/ZH | 内容 + 医疗审核 |
| 费用与付款指南 | 费用包含什么，哪些费用另计？ | `/surrogacy-cost` | 费用分类表、变量说明、付款路径 | Yunda 费用页、第三方费用和托管说明 | 预算咨询 | EN/ZH | 内容 + 运营 |
| 保险与 IVF 指南 | IVF、代孕和新生儿保险如何核验？ | `/surrogacy-protection-california` | 核验清单、专家问答 | DMHC、ASRM、真实保单字段 | `/be-parents` | EN/ZH | 内容 + 持牌保险审核 |
| Two Dads FAQ | 两位爸爸如何连接捐卵、IVF、代母和亲权？ | `/single-parents-lgbtq` | FAQ、流程分支、决策表 | ASRM、加州法律、现有服务事实 | `/be-parents` | EN/ZH | 内容 + IVF/法律审核 |
| 机构比较框架 | 如何比较代孕机构？ | 现有比较文章 + `/be-parents` | 方法说明、比较字段、利益披露 | 机构官网、Family Equality、目录资料 | 咨询前问题清单 | EN/ZH | 内容 + 法律审核 |
| MHB 活动实体页 | MHB New York 2026 是什么？ | `/resources/mhb-new-york-2026` | Event 页、FAQ、会前准备 | MHB 官方页、Eventbrite、授权登记 | 官方活动页 + 咨询 | EN/ZH | 活动负责人 |
| MHB 会后回顾 | 参会者最常问什么？ | 同一活动 URL | Recap、问题清单、来源日期 | 现场问题、照片、录音和授权 | `/be-parents` | EN/ZH | 活动负责人 + 内容 |
| 专家问答 | 2026 年开始代孕前最重要的问题是什么？ | 对应服务页模块 | 专家短访谈、摘要、引用块 | 姓名、机构、资质、日期、授权 | 专业咨询转接 | EN/ZH | 内容 + 专家本人 |
| 视频与字幕 | 如何快速理解流程或费用？ | 对应服务页 + YouTube | 15 秒短视频、完整字幕、网页摘要 | 原始视频、字幕、个人授权 | UTM/QR 咨询 | EN/ZH | 视频负责人 |
| 第三方实体证据 | 哪些外部页面证明 Yunda 的身份与服务？ | `llms.txt`、活动页、About | MHB 目录、专家页、合作方页、YouTube/LinkedIn | 主办方、合作方和专家公开资料 | 规范化实体链接 | EN/ZH | 权威建设负责人 |

## 4. 用户问题池

### 准父母

- How does surrogacy work for two dads?
- How much does surrogacy cost, and what is usually separate?
- What should I ask a surrogacy agency before matching?
- How do egg donation, embryo creation and IVF clinic coordination connect?
- How are legal, insurance, escrow and parentage decisions handled?
- Can an international or Chinese-speaking family receive bilingual coordination?

### 代孕妈妈

- What are the common eligibility and clinic-screening steps?
- How are compensation, reimbursements and escrow handled?
- Which decisions require an OB, clinic, lawyer or insurance professional?

### 活动与实体

- What is MHB New York 2026?
- Which organization runs the event?
- What is Yunda’s role at the event?
- What questions should gay intended parents ask providers at the event?

## 5. 证据层级与事实边界

1. 法律、医疗、保险：优先使用 ASRM、CDC、ACOG、California Family Code、DMHC 和具名持牌专家。
2. 活动事实：优先使用 MHB 官方页面、官方票务页和实体授权登记。
3. Yunda 服务事实：使用产品营销上下文、正式服务页、`llms.txt` 和机器可读摘要。
4. 访问、索引、转化：以 GSC、GA4 和 CRM 为准；CRM 当前仍需补齐。
5. Semrush：仅作补充趋势输入，不替代第一方数据或人工事实审核。

MHB 的 Surrogacy Advisor 目录当前列出 Yunda Surrogacy、Temple City, CA，并标注为 Full Service Agency；该目录可作为第三方实体证据，但费用、评价、服务范围和参会权益仍需逐项复核。[Surrogacy Advisor 机构目录](https://surrogacyadvisor.menhavingbabies.org/surrogacy-directory/agencies)

## 6. 风险边界

- Yunda 保持教育、协调和案例管理定位，不承接律师、医疗、保险、IVF 或托管机构的专业结论。
- 不发布成功率、固定周期、固定费用、法律结果或匹配结果保证。
- Silver Sponsor、Organizer、Partner、Recommended Provider 分开使用。
- 专家姓名、肖像、声音、引语和客户故事须有个人授权。
- 不新增与现有费用、流程、机构比较和 Two Dads 内容重复的博客 URL。
- 活动照片需标注真实活动背景；过往 MHB 照片不当作 2026 纽约现场。

## 7. 90 天 KPI（候选执行目标）

沿用 2026-08-05 季度报告的目标作为执行候选值，正式写入前仍需确认口径：AI Visibility ≥22、品牌提及 ≥10、引用 ≥195、被引用页面 ≥75、有品牌提及主题 ≥12/53、至少两个非 Google 平台各出现一次、AI 来源用户 ≥10、参与会话 ≥10、可信非自有来源域 ≥3、活动内容单元 ≥15、15 秒视频 ≥10、专家采访 ≥3，并保持 0 个新增 Critical/High 回归。

这些是计划目标，不代表已实现或结果保证。

## 8. Gate 判断

- Gate 1：业务上下文和市场目标已确认；CRM 有效询盘基线、独立内容库存快照和完整负责人表仍需补齐。
- Gate 2：关键词、意图和活动架构已完成；活动页和 MHB 博客索引证据、命名专家审核人仍缺。
- Gate 3：暂缓规模化生产，首批页面尚未完成索引与转化验证。
- Gate 4：MHB 目录实体已出现，但标准 Provider URL、第三方链接结果、外部发送授权和商业页转化归因仍未闭环。

## 9. 下一步

1. 确认 Owner、专家审核人、CRM 负责人和活动负责人。
2. 补齐现场团队、展位、咨询安排、素材授权和第三方档案字段。
3. 建立写入前 CMS、页面、摘要、Schema、Sitemap、GSC、GA4 和 CRM 快照。
4. 先整理现场证据，再产出 FAQ、回顾、专家问答和字幕。
5. 复用现有主页面，完成发布前事实、索引、结构化数据和转化检查。
6. 单独取得外部发送批准后，再开展第三方实体链接建设。
7. 用 GSC、GA4、CRM 和固定提示词完成 90 天复测。

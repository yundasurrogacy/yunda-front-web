# GEO 01｜MHB New York 2026 活动工作区

- 活动：MHB 2026 New York Surrogacy Conference & Expo
- 活动日期：2026-09-25 至 2026-09-27
- 组织方：Men Having Babies（MHB）
- Yunda Surrogacy 身份：Silver Sponsor
- 工作区建立日期：2026-08-12（Asia/Shanghai）
- 管理原则：GEO 02–19 是同一个活动中的连续协作任务，不是彼此独立的活动

## 活动目标

以一个可验证的 MHB 事件实体为中心，把身份与授权、活动中心页、第三方 Provider 档案、内容生产、现场素材和效果测量连接成连续资产链。所有任务复用同一份事实与授权基线，后续任务不得各自维护互相冲突的活动信息。

## 工作区结构

| 任务 | 目录 | 职责 | 当前状态 |
|---|---|---|---|
| GEO 02 | [`geo-02-identity/`](geo-02-identity/) | 活动身份、赞助关系、Logo/采访授权和待确认字段 | 已完成；开放字段持续更新 |
| GEO 03 | [`geo-03-activity-hub/`](geo-03-activity-hub/) | 活动中心页 URL、意图、内链、Schema 和生命周期规划 | 阶段 6 已完成；阶段 9 待单独准备与批准 |
| GEO 04 | [`geo-04-provider-profile/`](geo-04-provider-profile/) | MHB Provider 资格、档案状态、字段核验和修正请求 | 准备完成；核验交付待执行 |
| GEO 05 | [`tasks/geo-05-content-mapping/`](tasks/geo-05-content-mapping/) | LGBTQ+、机构比较与流程内容去重映射 | 定时任务待执行 |
| GEO 06 | [`tasks/geo-06-gay-men-pre-event/`](tasks/geo-06-gay-men-pre-event/) | Gay Men 活动前入口内容 | 定时任务待执行 |
| GEO 07 | [`tasks/geo-07-two-dads-pre-event/`](tasks/geo-07-two-dads-pre-event/) | Two Dads 活动前流程内容 | 定时任务待执行 |
| GEO 08 | [`tasks/geo-08-announcement-team/`](tasks/geo-08-announcement-team/) | MHB 官宣与团队实体内容 | 定时任务待执行 |
| GEO 09 | [`tasks/geo-09-education-warmup/`](tasks/geo-09-education-warmup/) | 用户教育与会前预热 | 定时任务待执行 |
| GEO 10 | [`tasks/geo-10-countdown-questions/`](tasks/geo-10-countdown-questions/) | 倒计时、问题收集与采访脚本 | 定时任务待执行 |
| GEO 11 | [`tasks/geo-11-live-capture/`](tasks/geo-11-live-capture/) | 现场照片、视频、采访和授权记录 | 定时任务待执行 |
| GEO 12 | [`tasks/geo-12-asset-library/`](tasks/geo-12-asset-library/) | 转录、授权核对与素材库 | 定时任务待执行 |
| GEO 13 | [`tasks/geo-13-recap/`](tasks/geo-13-recap/) | 活动总结与真实问题内容 | 定时任务待执行 |
| GEO 14 | [`tasks/geo-14-expert-conversion/`](tasks/geo-14-expert-conversion/) | 专业内容、咨询路径和转化检查 | 定时任务待执行 |
| GEO 15 | [`tasks/geo-15-expert-interviews/`](tasks/geo-15-expert-interviews/) | 三位专家采访沉淀 | 定时任务待执行 |
| GEO 16 | [`tasks/geo-16-core-page-updates/`](tasks/geo-16-core-page-updates/) | 核心页面活动证据更新 | 定时任务待执行 |
| GEO 17 | [`tasks/geo-17-entity-links/`](tasks/geo-17-entity-links/) | 第三方实体与真实链接建设 | 定时任务待执行 |
| GEO 18 | [`tasks/geo-18-citation-routing/`](tasks/geo-18-citation-routing/) | 活动后的机器可读摘要与引用路由 | 定时任务待执行 |
| GEO 19 | [`tasks/geo-19-quarterly-retest/`](tasks/geo-19-quarterly-retest/) | 季度同口径复测与下一季度建议 | 定时任务待执行 |

统一协作关系、输入输出和验收条件见 [`TASK-MAP.md`](TASK-MAP.md)。
完整的 Codex 定时任务 ID、触发日期和输出目录见 [`AUTOMATION-REGISTER.md`](AUTOMATION-REGISTER.md)。

## 单一事实来源

下列信息以 GEO 02 的实体与授权登记表为准：

- 活动标准名称、日期、场馆和地址；
- Yunda Surrogacy 与 MHB 的赞助关系；
- 可公开的品牌、联系和服务字段；
- Logo、照片、视频、采访及个人授权边界；
- 展位、参会团队、预约、品牌包、Provider URL 等开放字段。

GEO 03–19 如发现新证据，应先更新或明确取代 GEO 02 对应字段，再用于页面、Schema、内容、素材、第三方提交、外联或效果报告。

## 保留原位的共享证据

这些材料支持本活动，但并非只属于 MHB，因此不迁入活动目录：

- [GEO 01 技术与数据复核](../../08-reporting/weekly/2026-08-11-geo-01-technical-data-review.md)
- [8–10 月 GEO 季度服务报告与 MHB 排期](../../08-reporting/quarterly/2026-08-10/2026-08-05-geo-quarterly-service-report-aug-oct-mhb.md)
- `seo-project/02-baseline/source-data/2026-08-04-geo/`
- `seo-project/02-baseline/source-data/2026-08-05-geo-markitdown/`

## 自动化任务

提醒配置仍保留在 Codex 的运行目录中，避免破坏调度：

- `/Users/qianwenyi/.codex/automations/geo-02-mhb/`
- `/Users/qianwenyi/.codex/automations/geo-03-mhb/`
- `/Users/qianwenyi/.codex/automations/geo-04-mhb/`
- `/Users/qianwenyi/.codex/automations/geo-05-lgbtq/` 至 `/Users/qianwenyi/.codex/automations/geo-19/` 中登记于 `TASK-MAP.md` 的 MHB 活动任务

自动化执行产生的耐久活动交付物统一写入本工作区，不再分散到 `04-strategy/`、`07-authority/` 等目录。

## 变更与恢复

本次重组没有修改生产代码、页面、内容、Schema、元数据、Sitemap、分析配置或外部系统。重组前文件副本位于：

`.seo-cache/backups/2026-08-12/geo-01-mhb-consolidation-2026-08-12T102107+0800/`

GEO 05–19 自动化归并前的配置和活动索引快照位于：

`.seo-cache/backups/2026-08-12/geo-01-mhb-automations-2026-08-12T103303+0800/`

恢复时按备份中的原文件名分别放回 `seo-project/07-authority/entities/`、`seo-project/04-strategy/`，并恢复备份中的 `seo-project-README.md`。该备份不进入 Git，也不应在活动验收前删除。

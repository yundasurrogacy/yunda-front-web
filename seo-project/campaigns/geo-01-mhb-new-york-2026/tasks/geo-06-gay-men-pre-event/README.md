# GEO 06｜MHB 活动前内容：Gay Men 入门

- 任务周期：2026-08-24 至 2026-08-30
- 活动归属：GEO 01｜MHB New York 2026
- 状态：CMS 英文内容已优化并通过本地预览；待 develop 推送，生产 URL 当前仍为 404

## 目标

准备 Surrogacy for Gay Men: Where Do You Start? 活动前入口内容。

## 交付

内容 Brief、可靠来源、差异化证据、CTA、内链、Schema 与发布检查单。

## 依赖

GEO 02、03、05。

## 验收

形成 gay men surrogacy 入口并满足索引前置条件。

当前验收结论：准备交付通过；线上入口与索引前置条件尚未执行，因此整体任务仍为部分完成。

## 2026-08-30 交付

- `2026-08-30-content-brief.md`：页面任务、搜索意图、Direct Answer、结构、CTA、内链、Schema 与差异化规则。
- `evidence/2026-08-30-source-ledger.md`：项目证据、可靠外部来源、SERP/VOC 输入和证据缺口。
- `2026-08-30-publishing-and-acceptance.md`：Gate 2、专家审核、本地预览、发布、索引与验收清单。

本次未修改生产代码、页面、内容、Schema、元数据、链接、分析配置或外部系统，也未提交或推送 Git。

## 2026-08-31 执行

- `2026-08-31-optimized-en-content.html`：已写入 CMS 并回读验证的英文正文。
- `apply-geo06-cms-update.cjs`：带前置一致性检查、dry run、apply、read-back 与 rollback 的任务脚本。
- `2026-08-31-execution-and-validation.md`：备份、构建、本地桌面/移动预览、Schema 与生产状态记录。
- `GEO-ANALYSIS.md`：GEO 可引用性、AI crawler、llms.txt、SSR 和剩余风险分析。

CMS 更新后，清缓存的 Nuxt 构建与本地响应式预览通过。当前生产部署早于该博客，目标 URL 仍返回 404；本任务只允许推送 `develop`，不推送或合并 `main`。

## 执行规则

运行前读取活动总入口、TASK-MAP.md、GEO 02 实体与授权登记表及本文件。任务进入对应 SOP 阶段时，先完成准备摘要并等待该阶段的“开始优化”。耐久交付写入本目录；原始外部数据快照按项目标准路由保存并从这里引用。

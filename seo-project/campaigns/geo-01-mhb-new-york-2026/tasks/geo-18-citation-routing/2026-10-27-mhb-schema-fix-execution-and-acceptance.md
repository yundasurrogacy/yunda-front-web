# GEO 18｜MHB Schema 修复执行与验收

- 执行日期：2026-10-27（Asia/Singapore）
- 用户批准：本会话第二次输入“开始优化”
- 范围：MHB New York 2026 英中活动页的 Event JSON-LD、WebPage `dateModified` 和共享 Event Schema helper 参数
- 状态：本地代码修复完成；未部署生产环境

## 变更前保护

- 备份位置：`.seo-cache/backups/2026-10-27/mhb-schema-fix-20261027T193036+0800/`
- 备份文件：`mhb-new-york-2026.vue`、`schema.ts`
- 恢复方式：按文件从上述备份目录恢复；恢复前保留并审阅之后的用户修改，不使用通配符覆盖。
- 备份保留：是，未删除，未提交。

## 已实施修复

### `pages/resources/mhb-new-york-2026.vue`

- 将活动页 WebPage `dateModified` 从 `2026-10-09` 更新为已批准内容版本 `2026-10-12`。
- 将 MHB Event 状态输出为受支持的 `EventScheduled`，并保留注释说明活动已按计划完成；不再从 MHB 页面输出 `EventCompleted`。
- 将 Event `url` 明确指向当前语言 Yunda 活动页。
- 将 MHB 官方活动 URL 输出为 Event `sameAs`。
- 将 Event 地点补齐为 The Westin New York at Times Square、270 West 43rd Street、New York、NY 10036、US。
- 移除已结束活动的历史报名 `offers`，并清理仅用于该 Offer 的未使用字段。
- 保留 Men Having Babies 为 `organizer`、Yunda Surrogacy 为 `attendee`，未改变活动关系边界。

### `utils/schema.ts`

- 为 `EventSchemaOptions` 增加 `eventUrl` 与 `sameAs`。
- Event `url` 在显式传入 `eventUrl` 时使用当前页面 URL。
- `sameAs` 支持单个或多个绝对/相对 URL，并统一解析为绝对 URL。
- 保留 `completed` 作为旧快照兼容别名，但将其安全映射到 `EventScheduled`，避免任何调用继续输出 `EventCompleted`。
- 未改变 ASRM 当前调用的现有字段行为；当前生产调用仍可编译。

## 验收结果

| 检查项 | 结果 | 说明 |
|---|---|---|
| MHB Schema 静态断言 | 通过 | 状态、页面 URL、`sameAs`、Westin 地址、日期和 Offer 移除均已断言 |
| 受影响文件 ESLint | 通过 | 0 errors；保留 1 个既有 UnoCSS 排序 warning |
| `git diff --check` | 通过 | 无空白错误 |
| TypeScript 类型检查 | 部分通过 | 本次 helper 类型错误已消失；剩余 4 个错误来自 `work/backups/surrogate-wording-20261008-120612/nuxt.config.ts` 的既有缺失 JSON 文件和隐式 any |
| Nuxt 构建 | 被既有配置阻塞 | 加载 `nuxt.config.ts` 时发现 `Blog manifest/API count mismatch: manifest=86, API=87`；未进入页面编译。未刷新 Sitemap 或生成文件绕过该阻塞 |
| 线上 JSON-LD 回读 | 待发布后验证 | 本次未部署，线上仍是发布前版本 |
| Rich Results Test / URL Inspection | 待发布后验证 | 未连接外部验证写入或提交系统 |

## 未修改范围

未修改 CMS、生产部署、Sitemap、robots、canonical、hreflang、分析配置、外部 MHB 页面或外部系统。工作区原有未提交修改均保留。

## 后续发布前动作

1. 解决或单独记录 `manifest=86/API=87` 的项目配置阻塞。
2. 在测试或构建环境重新生成英中页面，检查 Event `url`、`sameAs`、状态、地点、WebPage `dateModified` 和 FAQPage。
3. 发布后重新抓取英中活动页，检查 200、canonical、hreflang、JSON-LD 和 robots。
4. 用 Rich Results Test、Schema.org Validator 和 GSC URL Inspection 复核实际解析结果。
5. 保留本次备份，直到发布后验证完成且没有 Schema 或索引回归。

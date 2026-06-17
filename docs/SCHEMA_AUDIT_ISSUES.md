# Yunda Surrogacy Schema 问题清单

更新时间：2026-06-17

## 说明

本文件汇总最近几轮 schema 审查中确认的问题，包括：

- 已处理的问题
- 当前仍存在的问题
- 建议的后续处理顺序

范围基于当前 Nuxt/Vue 代码库中的 JSON-LD、页面结构、全局实体、服务页、资源页与博客架构。

## 已处理

### P1 已处理

1. 中文页面 Schema URL 与页面实际 URL 可能不一致
   已处理方式：
   在 [utils/schema.ts](/Users/qianwenyi/Documents/yunda-front-web-1/utils/schema.ts:76) 增加统一的本地化 URL 逻辑。`locale: 'zh'` 或 `inLanguage: 'zh-CN'` 的相对路径现在会自动输出为 `/zh/...`。

2. 核心转化页缺少完整页面级 Schema
   已补齐页面：
   - [be-parents/index.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/be-parents/index.vue:384)
   - [be-surrogate/index.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/be-surrogate/index.vue:174)
   - [become-a-surrogate.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/(surrogate-resources)/become-a-surrogate.vue:496)
   - [partner-ivf-clinics.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/(parents)/partner-ivf-clinics.vue:252)

   已补类型：
   - `WebPage`
   - `Service`
   - `BreadcrumbList`
   - 部分页面的 `FAQPage`
   - 部分页面的 `ItemList`

3. `/california-surrogacy-consultation` 缺少 Schema
   已处理页面：
   [california-surrogacy-consultation.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/(surrogate-resources)/california-surrogacy-consultation.vue:210)

   已补类型：
   - `WebPage`
   - `Service`
   - `BreadcrumbList`
   - `FAQPage`
   - `ItemList`

4. `/about` 页面使用不准确的 FAQ / HowTo
   已处理页面：
   [about.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/about.vue:53)

   调整结果：
   - 移除不合适的 `FAQPage`
   - 移除不合适的 `HowTo`
   - 改为更准确的 `WebPage`
   - 增加 `BreadcrumbList`
   - 增加 founder `Person` schema

### P2 已处理

1. `/be-surrogate-v2` 旧页面仍残留
   已处理方式：
   删除页面文件 [pages/be-surrogate-v2/index.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/be-surrogate-v2/index.vue)

   当前状态：
   - 页面产物来源已删除
   - `nuxt.config.ts` / `vercel.json` 中旧路径 301 仍保留，用于继续跳转到 `/be-surrogate`

2. 全局 `Organization` 实体信号不足
   已处理文件：
   [utils/schema.ts](/Users/qianwenyi/Documents/yunda-front-web-1/utils/schema.ts:24)

   已增强字段：
   - `alternateName`
   - `availableLanguage`
   - `knowsAbout`
   - `founder`
   - `foundingLocation`

3. `/resources` 页面缺少集合型 Schema
   已处理页面：
   [resources/index.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/resources/index.vue:263)

   已补类型：
   - `WebPage`
   - `BreadcrumbList`
   - `ItemList`

## 当前仍存在的问题

### P2：低优先级覆盖型问题

1. Legal 页面还没有基础页级 Schema
   当前缺失页面：
   - [privacy-policy.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/privacy-policy.vue:1)
   - [terms-of-service.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/terms-of-service.vue:1)
   - [disclaimer.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/disclaimer.vue:1)

   建议补充：
   - `WebPage`
   - `BreadcrumbList`

   说明：
   这些页面商业价值低，但从 schema 覆盖完整性看仍有缺口。

2. `/sitemap` 页面没有基础 Schema
   页面：
   [sitemap.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/sitemap.vue:1)

   建议补充：
   - `WebPage`
   - `BreadcrumbList`

### P2：质量优化型问题

3. 部分 `HowTo` 使用语义偏宽
   涉及页面：
   - [index.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/index.vue:66)
   - [be-parents/index.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/be-parents/index.vue:366)
   - [surrogate-qualification.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/surrogate-qualification.vue:45)
   - [become-a-surrogate.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/(surrogate-resources)/become-a-surrogate.vue:475)

   风险：
   这些页面并不一定都符合 Google 对教程型 `HowTo` 的富结果预期。语法上没有错，但语义上可能过宽。

   建议：
   - 保留真正逐步教程型页面的 `HowTo`
   - 将纯服务说明页中的 `HowTo` 改为 `WebPage` / `ItemList` / `FAQPage` 组合

### 后续单独处理

4. 博客文章 Schema 质量仍需专项处理
   页面：
   [blog/[id].vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/blog/[id].vue:554)

   当前问题方向：
   - `BlogPosting` 字段质量依赖后台内容
   - FAQ 从 HTML 自动抽取，可能误判普通标题
   - 作者与审校实体不够强
   - 图片、日期、作者一致性需要专项校验

   说明：
   这部分已明确延期，后续单独做博客 schema 审查更合适。

## 不建议继续补的页面

1. [be-surrogate/success.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/be-surrogate/success.vue:1)
2. [be-parents/thanks.vue](/Users/qianwenyi/Documents/yunda-front-web-1/pages/be-parents/thanks.vue:1)

原因：
   这两个页面已经 `noindex`，属于提交后页面，不需要再增加结构化数据。

## 建议处理顺序

1. 给 legal 页和 `/sitemap` 页补基础 `WebPage + BreadcrumbList`
2. 逐页复核 `HowTo`，收紧到真正教程型页面
3. 单独处理博客文章 schema 质量问题

## 本轮验证情况

已完成的 schema 修改验证如下：

- `npm run typecheck` 通过
- 针对本轮改动文件运行 `eslint` 无 error
- 剩余为页面原有 UnoCSS / 模板格式 warning，不属于 schema 逻辑错误

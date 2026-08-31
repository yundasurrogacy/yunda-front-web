# GEO 05｜执行、GEO/SEO 校验与发布前验收

- 执行时间：2026-08-31（Asia/Shanghai）
- 结果：本地内容、映射、CMS payload 与活动中心去重实现完成；未提交 Git、未写入外部 CMS、未部署。
- 唯一 checklist URL：`/blog/mhb-new-york-2026-guide-gay-intended-parents`
- 唯一 Event URL：`/resources/mhb-new-york-2026`

## Delivered

1. 阶段 6/7/9 准备摘要、Gate、备份与恢复记录。
2. 最终 URL—意图映射，撤销未发布的候选 duplicate slug。
3. 冻结后的 Content Brief。
4. 经过边界修订的英文 CMS HTML 与等义中文 CMS HTML。
5. `prepare-geo05-cms-payload.cjs`：只生成本地预览，不含远端写入逻辑。
6. 双语 payload 预览，保留既有 category、cover、tags、author 和 created_at 等未授权字段。
7. 活动中心本地代码去重：缩短活动直答与 FAQ，移除未经证实的活动咨询承诺，新增 checklist 上下文入链。
8. 来源/事实索引和本验收记录。

## Intent and cannibalization validation

| Intent | Owner after change | Validation |
|---|---|---|
| MHB event facts, organizer, dates, Yunda participation | `/resources/mhb-new-york-2026` | Event hub keeps Event schema and one canonical |
| Questions to ask/compare providers before MHB | `/blog/mhb-new-york-2026-guide-gay-intended-parents` | Hub now links to checklist and no longer carries the deep checklist answer |
| Complete gay/LGBTQ+ pathway | `/single-parents-lgbtq` | Blog lead reframed to pre-comparison mapping and links to the pillar |
| Full process, cost, donor, clinic and California protection topics | Existing pillar pages | Blog gives question dimensions only and uses descriptive links |
| Rejected candidate slug | No page | Absent from build, sitemaps, redirect ledger and internal links |

`node scripts/verify-commercial-cannibalization.cjs` passed for all 13 mapped commercial blogs. This verifier does not cover every editorial overlap, so the page-level mapping above remains the governing decision.

## CMS payload validation

| Check | English | Chinese |
|---|---:|---:|
| CMS-body H1 | 0 | 0 |
| H2 | 12 | 12 |
| Visible FAQ H3 | 5 | 5 |
| Planned internal links | 8/8 | 8/8 localized under `/zh/` |
| Primary external sources | 5 unique | 5 unique |
| Organizer/Sponsor boundary | Pass | Pass |
| Yunda service boundary | Pass | Pass |
| Rejected slug linked | No | No |

The English direct answer is 139 words and owns the pre-conference comparison task. The Chinese answer uses the same decision and responsibility boundaries. The worksheets now use an evidence-recording model rather than an unsupported numerical score.

## GEO review

- Direct answer appears immediately after the first H2 and remains extractable without event-page duplication.
- Stable entities are named: Men Having Babies, MHB New York 2026 and Yunda Surrogacy.
- Role relationships are explicit: MHB organizer; Yunda one of the Silver Sponsors and not organizer/co-organizer.
- Tables, question headings, short paragraphs and visible FAQs support passage extraction.
- Material medical/legal statements point to CDC, ASRM and California Courts sources and preserve scope limitations.
- Existing BlogPosting/Breadcrumb/visible FAQ machinery remains the correct Schema path; no Event schema is added to the blog.
- No claim of AI citation, ranking, traffic or conversion improvement is made.

## SEO and factual review

- English title 56 characters; SEO title 60; meta description 148.
- Title/H1/query task agree on “questions to ask a surrogacy agency at MHB New York 2026.”
- No `best/top agency` ranking, price range, success rate, case, testimonial, booth, attendee or appointment claim was introduced.
- Internal links use the eight approved destination owners; Chinese draft uses the corresponding localized routes.
- The event hub no longer promises a private conversation in New York or says an event appointment can be scheduled.
- Event facts and sponsor placement still require a final live recheck immediately before any CMS apply.

## Local build and release checks

Commands run after the final code changes:

- `node .../prepare-geo05-cms-payload.cjs` — pass.
- `npx eslint pages/resources/mhb-new-york-2026.vue` — 0 errors; 91 pre-existing style/order warnings in the file.
- `npm run typecheck` — pass after Nuxt generated its type files.
- `npx nuxt build` — pass; existing warnings for `components/ui/.gitkeep/index` and stale Browserslist data remain.
- `node scripts/cleanup-200.cjs` — removed generated SPA fallback and added `noindex` to generated 404.
- `node scripts/verify-p0-build.cjs` — pass.
- `node scripts/verify-commercial-cannibalization.cjs` — pass.
- `node scripts/verify-sitemap-quality.cjs` — pass.
- `node scripts/verify-blog-pagination.cjs` — pass.
- `node scripts/verify-priority-images.cjs` — pass.

Rendered event hub checks in both locales:

- one H1;
- self-referencing canonical;
- no `noindex`;
- checklist internal link present;
- organizer/co-organizer boundary present;
- removed unsupported event appointment language absent.

The existing English CMS route also prerendered successfully with one H1, a self-referencing canonical, BlogPosting, BreadcrumbList and visible FAQ schema. Because this run did not write the new payload to the CMS, that rendered route reflects the current remote CMS record, while the revised bilingual bodies are validated as local payload inputs.

## Chinese routing decision

The Chinese body is ready as a local CMS input but has not been written to the CMS. Therefore the current missing-Chinese manifest, temporary Chinese-to-English redirect, lack of `zh-CN` hreflang for this article and exclusion from the Chinese sitemap are correct and intentionally unchanged.

Only after an approved CMS write and read-back proves non-empty Chinese content should a release regenerate the manifest/redirects/sitemaps, prerender `/zh/blog/mhb-new-york-2026-guide-gay-intended-parents`, and verify its canonical, hreflang, robots and schema. The local package must not be described as bilingual-published or bilingual-indexable yet.

## Review resolution

An independent read-only review found seven issues. Resolved locally:

- removed unsupported event consultation claims;
- narrowed event-hub provider-question content and added checklist link;
- reframed the blog lead away from the full LGBTQ+ pathway;
- aligned English and Chinese worksheet method;
- added the final live MHB fact/sponsor recheck blocker;
- unified GEO 05 provenance while recording GEO 06 draft reuse.

The Chinese redirect finding remains an intentional release blocker until the CMS write is approved and completed.

## Backups and recovery

- Task/memory backup: `.seo-cache/backups/2026-08-31/geo-05-content-mapping-pre-stage9-20260831-153500/`
- Event hub backup: `.seo-cache/backups/2026-08-31/geo-05-event-hub-dedup-20260831-160500/production/mhb-new-york-2026.vue`
- Existing CMS baseline: `.seo-cache/backups/2026-08-31/geo06-blog-before-20260831-0820/before.json`
- Recovery: restore the event page from its exact backup and remove the GEO 05 files listed above only after rollback is separately approved. No remote rollback is needed because this run performed no external write.

Backups must remain until expert review, CMS publication approval, deployment and post-release validation pass.

## Remaining release blockers

1. Named fertility/IVF reviewer approval.
2. Named reproductive-law reviewer approval.
3. Insurance and escrow wording review.
4. Bilingual editorial-equivalence approval.
5. Same-day live recheck of MHB event facts and Yunda Silver Sponsor placement.
6. Explicit authorization for CMS write and deployment.
7. CMS read-back, Chinese redirect/hreflang/sitemap regeneration, preview rendering and post-release live/index/analytics validation.

All currently approved local optimization is complete. No automatic continuation is required.

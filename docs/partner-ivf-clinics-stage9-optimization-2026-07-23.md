# Partner IVF Clinics — SOP Stage 9 Optimization

Date: 2026-07-23
Target URL: `https://www.yundasurrogacy.com/partner-ivf-clinics`
Local implementation: `pages/(parents)/partner-ivf-clinics.vue`
SOP stage: Stage 9 — content production and page optimization
Implementation DRI: Codex for this repository task
Business/medical-adjacent review: Kayla Luo, Vice President, North America, following the existing project review pattern
Release status: Local implementation only; not deployed or submitted for reindexing

## 1. Gate and evidence summary

Gate 2 is usable with documented limitations:

- Product, audience, positioning, page role, and site architecture are documented in `.agents/`.
- Critical indexability is not blocking this URL.
- Google URL Inspection reports `Submitted and indexed`, successful fetch, mobile crawl, and matching Google/user canonical.
- The page is assigned to intended-parent IVF clinic coordination in the current architecture.
- Missing approvals: current contractual status and preferred display order of clinic relationships; named owner for final business approval; production release authorization.

Evidence collection dates:

- Live page, headers, HTML, images, and SERPs: 2026-07-23.
- GSC Search Analytics: 2026-04-21 through 2026-07-20.
- GSC URL Inspection last crawl: 2026-07-14 21:06:32 UTC.

## 2. Baseline

### Google evidence

| Period | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| 2026-04-21 to 2026-07-20 | 0 | 429 | 0% | 29.1 |
| 2026-06-23 to 2026-07-20 | 0 | 198 | 0% | 25.9 |

The URL is indexed correctly. The disclosed query set is fragmented across IVF insurance, regional surrogacy, screening, billing, generic IVF-surrogacy, and clinic terms.

### Page and SXO scores

| Measure | Baseline |
|---|---:|
| Single-page SEO | 63/100 |
| SXO alignment | 56/100 |
| Content quality | 52/100 |
| E-E-A-T | 41/100 |
| AI citation readiness | 38/100 |

### Primary problem

The URL and navigation promise partner IVF clinic coordination, but the title, H1, and most body copy focus on IVF basics, insurance, legal steps, escrow, and screening. The page also promises a full clinic overview through a self-link while displaying no clinic roster.

## 3. Content Brief

### Page task

Help intended parents understand how Yunda coordinates with an IVF clinic during a gestational-surrogacy journey, whether they already have embryos and a clinic or still need to evaluate a clinic.

### Audience

- U.S. intended parents who already have embryos or an IVF clinic.
- Intended parents who need to evaluate a fertility clinic for gestational-carrier work.
- International intended parents who need bilingual, cross-provider coordination.
- Families who may also need donor-egg planning.

### Primary action

Start an intended-parent consultation at `/be-parents`.

### Secondary actions

- Review the clinic coordination steps on the page.
- Visit `/egg-donation`, `/surrogacy-process`, `/surrogacy-protection-california`, or `/surrogacy-cost` for adjacent tasks.
- Use CDC and SART resources to review reported ART information.

### Keyword and intent map

| Role | Query cluster | Intent |
|---|---|---|
| Primary | `IVF clinic coordination for surrogacy` | Commercial investigation / service |
| Secondary | `IVF clinic for surrogacy` | Evaluation |
| Secondary | `surrogacy IVF clinics` | Evaluation |
| Secondary | `partner IVF clinics` | Brand/service investigation |
| Secondary | `fertility clinic for gestational carrier` | Evaluation |

No search-volume claim is made because this task did not use a paid keyword-volume source.

### Required user questions

1. Can I keep my current IVF clinic?
2. What if I have embryos but no surrogate?
3. What if I still need to create embryos or use donor eggs?
4. What does the IVF clinic decide and what does Yunda coordinate?
5. What should I ask when comparing clinics?
6. How should I interpret clinic success-rate data?
7. How do clinic requirements, surrogate screening, legal clearance, and transfer timing connect?
8. What changes for international intended parents?

### Differentiating evidence

- Bilingual English/Chinese service.
- A documented Yunda clinic-reference roster: EFC, SCRC, Pinnacle, Harvest, 香港宝德, Gen5, and Incinta.
- Yunda's first-party coordination process and role boundaries.
- Direct links to ASRM, CDC, and SART primary sources.

The clinic roster may not be used to claim rankings, outcomes, success rates, pricing, guaranteed acceptance, or medical recommendations.

### Internal links

| Anchor intent | Target |
|---|---|
| Start an intended-parent consultation | `/be-parents` |
| Donor egg and embryo planning | `/egg-donation` |
| Full surrogacy process | `/surrogacy-process` |
| Legal, insurance, and escrow coordination | `/surrogacy-protection-california` |
| Surrogacy cost categories | `/surrogacy-cost` |
| Intended-parent hub | `/intended-parents` |

### External sources

- ASRM, Recommendations for practices using gestational carriers:
  `https://www.asrm.org/practice-guidance/practice-committee-documents/recommendations-for-practices-using-gestational-carriers-a-committee-opinion-2022/`
- CDC ART Success Rates:
  `https://www.cdc.gov/art/success-rates/index.html`
- CDC, How to Interpret ART Success Rates:
  `https://www.cdc.gov/art/success-rates/interpret.html`
- SART Success Rates:
  `https://www.sart.org/patients/a-patients-guide-to-assisted-reproductive-technology/general-information/success-rates/`

### Schema

- Keep `WebPage`, `Service`, and `BreadcrumbList`.
- Use `ItemList` only if it mirrors the visible clinic-reference roster.
- Do not rely on FAQ rich results. Visible FAQs may remain for users, but `FAQPage` should be removed from this non-government, non-health-provider service page.

### Compliance boundaries

Yunda provides education, coordination, and case-management support. Yunda is not an IVF clinic, medical provider, law firm, insurance company, or escrow company. Clinics and licensed professionals make their own medical, legal, insurance, and financial determinations.

## 4. Copywriting Draft

### Recommended metadata

English title: `IVF Clinic Coordination for Surrogacy | Yunda`
English description: `Already have an IVF clinic—or need help evaluating one? See how Yunda coordinates clinic records, surrogate screening, legal clearance, and transfer timing.`

Chinese title: `代孕 IVF 诊所协调与合作诊所｜孕达代孕`
Chinese description: `已有 IVF 诊所，或仍在选择诊所？了解孕达如何衔接诊所资料、代孕妈妈筛查、法律放行与移植排期。`

### Headline alternatives

1. **Selected:** `IVF Clinic Coordination for Your Surrogacy Journey`
   Clear service category and intended-parent outcome.
2. `Already Have an IVF Clinic? We Help Connect the Next Steps`
   Strong for the existing-clinic segment but too narrow for users who still need a clinic.
3. `Choose and Coordinate an IVF Clinic for Surrogacy`
   Strong search match but can overstate Yunda's medical recommendation role.

Chinese selected headline: `为你的代孕旅程协调 IVF 诊所`

### Hero

English:

> Already have embryos or an IVF team? Yunda coordinates the handoffs between clinic requirements, surrogate screening, legal clearance, and the transfer plan. Still choosing a clinic? We help you prepare the right questions and compare operational fit—while your licensed fertility specialists make all medical decisions.

Primary CTA: `Plan My Clinic Coordination` → `/be-parents`
Secondary CTA: `See the Coordination Steps` → `#coordination-steps`

Chinese:

> 已有胚胎或 IVF 团队？孕达会协助衔接诊所要求、代孕妈妈筛查、法律放行与移植计划。仍在选择诊所？我们帮助你整理关键问题并比较流程适配度；所有医疗决定仍由持牌生殖专家作出。

Primary CTA: `规划我的诊所协调` → `/be-parents`
Secondary CTA: `查看协调步骤` → `#coordination-steps`

### Two starting paths

English heading: `Start From Where You Are`

**I already have a clinic or embryos**

- Share your clinic contact, embryo status, and available records.
- Confirm the clinic's gestational-carrier criteria and screening workflow.
- Align surrogate matching, medical review, legal clearance, and transfer scheduling.

**I still need a clinic or embryos**

- Clarify whether you need embryo creation, donor eggs, or a transfer-only clinic.
- Compare third-party reproduction experience, location, timing, services, and communication.
- Ask each clinic to confirm availability, fees, medical requirements, and next steps directly.

Chinese heading: `从你现在的阶段开始`

**我已有诊所或胚胎**

- 提供诊所联系人、胚胎状态和现有资料。
- 确认诊所对妊娠代孕妈妈的标准和筛查流程。
- 衔接代孕妈妈匹配、医学审核、法律放行和移植排期。

**我仍需选择诊所或创建胚胎**

- 明确是否需要建胚、供卵，或只需完成移植。
- 比较第三方生殖经验、地点、排期、服务与沟通方式。
- 由各诊所直接确认接收情况、费用、医学要求和下一步。

### Clinic references

English heading: `IVF Clinic References in Yunda's Coordination Work`

> Yunda materials currently reference EFC, SCRC, Pinnacle, Harvest, Hong Kong Baode, Gen5, and Incinta. The appropriate clinic depends on your location, embryo and donor plan, medical needs, timing, and each clinic's current acceptance criteria. Inclusion here is not a ranking, medical recommendation, outcome claim, or guarantee of availability.

Chinese heading: `孕达协调工作中的 IVF 诊所参考`

> 孕达现有资料中展示 EFC、SCRC、Pinnacle、Harvest、香港宝德、Gen5 和 Incinta。适合的诊所取决于地点、胚胎与供体方案、医学需求、时间安排以及诊所当时的接收标准。列于本页不代表排名、医疗建议、结果承诺或保证接收。

### Responsibility matrix

English heading: `Who Decides What?`

| IVF clinic | Yunda Surrogacy | Independent professionals |
|---|---|---|
| Medical eligibility, testing, treatment protocol, medication, transfer, and clinical advice | Records and appointment coordination, communication, case milestones, travel/logistics support, and alignment across teams | Attorneys confirm legal advice and clearance; insurance and escrow professionals confirm their own reviews, coverage, and payment processes |

Chinese heading: `谁负责哪些决定？`

| IVF 诊所 | 孕达代孕 | 独立专业方 |
|---|---|---|
| 医学资格、检查、治疗方案、用药、移植与临床建议 | 资料与预约协调、沟通、个案节点、出行支持及多方衔接 | 律师确认法律意见与放行；保险和托管专业方确认各自审核、保障与付款流程 |

### Coordination workflow

English heading: `How IVF Clinic Coordination Works`

1. **Clarify your starting point.** We document your clinic, embryo, donor, location, and timing status.
2. **Confirm clinic requirements.** The clinic identifies its records, screening, medical, and scheduling requirements.
3. **Align matching and clearance.** Yunda coordinates records and milestones across surrogate matching, clinic review, independent legal work, and related case planning.
4. **Prepare the transfer handoff.** We help keep appointments, documents, travel, and communication organized while the clinic directs medical care.

Chinese heading: `IVF 诊所协调如何进行`

1. **确认起点。** 梳理诊所、胚胎、供体、地点和时间状态。
2. **确认诊所要求。** 由诊所说明资料、筛查、医学与排期要求。
3. **衔接匹配与放行。** 孕达围绕代孕妈妈匹配、诊所审核、独立法律工作和相关个案规划协调资料与节点。
4. **准备移植交接。** 我们协助管理预约、文件、出行和沟通；医疗照护由诊所负责。

### Clinic evaluation checklist

English heading: `Questions to Ask an IVF Clinic About Surrogacy`

- How often does the clinic work with gestational carriers and third-party reproduction?
- What records and screening does the clinic require before it will review a carrier?
- Does the clinic provide the services you need, such as embryo creation, donor-egg coordination, genetic testing coordination, cryostorage, or transfer-only care?
- Can monitoring happen near the surrogate, and how are records shared?
- What are the current scheduling windows, fees, medication processes, and cancellation policies?
- Who is the day-to-day contact for intended parents, the surrogate, and the agency?
- How does the clinic report ART outcomes, and which patient group or treatment definition applies to the number you are reviewing?

Source note:

> CDC publishes clinic-specific and national ART data, and SART provides patient-facing success-rate tools. These figures should be interpreted with the clinic because patient populations, treatment methods, and reporting definitions differ.

Chinese heading: `向 IVF 诊所询问的代孕问题`

- 诊所处理妊娠代孕和第三方生殖个案的频率如何？
- 审核代孕妈妈前需要哪些资料和筛查？
- 是否提供你需要的建胚、供卵协调、遗传检测协调、冷冻保存或单纯移植服务？
- 代孕妈妈能否在当地监测？资料如何传递？
- 当前排期、费用、用药流程和取消政策是什么？
- 谁负责与准父母、代孕妈妈和机构进行日常沟通？
- 诊所如何报告 ART 结果？你看到的数据对应哪类患者或治疗口径？

Source note:

> CDC 提供美国诊所级与全国 ART 数据，SART 提供面向患者的成功率工具。由于患者构成、治疗方法和统计口径不同，相关数字应与诊所一起解读。

### International and donor-assisted planning

English heading: `International or Donor-Assisted Journey?`

> Ask early about time-zone communication, translated records, embryo or reproductive-tissue transport, local monitoring, travel, and who can receive clinical instructions. If you still need donor eggs or embryo creation, review Yunda's donor egg and IVF planning guide before the clinic handoff.

Chinese heading: `国际家庭或需要供卵？`

> 尽早确认跨时区沟通、翻译资料、胚胎或生殖组织运输、当地监测、出行安排，以及谁可以接收临床指示。若仍需供卵或建胚，请在诊所交接前查看孕达的供卵与 IVF 规划指南。

### Focused FAQ

1. **Can I keep my current IVF clinic for surrogacy?**
   Often, yes, if the clinic currently accepts gestational-carrier cases and its requirements can be met. The clinic must confirm medical eligibility, records, screening, services, and timing.
2. **What if I have embryos but no surrogate?**
   Yunda can begin intended-parent intake and surrogate matching while coordinating with your clinic on its carrier criteria and record requirements.
3. **What if I do not have embryos yet?**
   Start by confirming whether you will use your own eggs, donor eggs, or existing embryos. A licensed fertility clinic will advise on treatment; Yunda can coordinate the surrounding surrogacy plan.
4. **Does Yunda choose my medical treatment or guarantee a clinic result?**
   No. Clinics and licensed physicians make medical decisions. Yunda coordinates communication and case milestones and does not guarantee acceptance, timing, pregnancy, or outcomes.
5. **How should I compare clinic success rates?**
   Review CDC or SART data, then ask the clinic which patient population, egg or embryo source, cycle type, and reporting definition apply. Published rates do not predict one person's outcome.
6. **When should the IVF clinic and surrogacy agency start coordinating?**
   As early as possible—especially before surrogate medical screening—so records, clinic criteria, legal timing, travel, and transfer planning can be aligned.

Chinese FAQs follow the same meaning and professional boundaries.

### Final CTA

English heading: `Bring Your Clinic Plan Into One Coordinated Journey`
Body: `Tell us whether you already have a clinic and embryos, still need to create embryos, or need help organizing the next handoffs.`
CTA: `Plan My Next Steps`

Chinese heading: `把诊所计划衔接成一条清晰的代孕旅程`
Body: `告诉我们你是否已有诊所和胚胎、仍需建胚，或需要协助安排下一步交接。`
CTA: `规划我的下一步`

## 5. Copywriting annotations

- The page leads with the user's starting state, not Yunda's company description.
- “Coordination” is repeated because it is the service Yunda can substantiate without implying medical practice.
- The clinic roster is visible but conservatively framed.
- The role matrix gives AI systems and users an extractable boundary statement.
- Adjacent insurance, legal, cost, donor, and process intents are routed to their canonical pages.
- CTAs describe the value received and point to a functioning route or on-page anchor.

## 6. Copy-editing record

Seven-sweep changes applied:

1. **Clarity:** Replaced `compare operational fit` with `understand how each clinic works with gestational carriers`; shortened sentences and limited each section to one user task.
2. **Voice and tone:** Kept the professional, calm, protective Yunda voice in both languages; removed promotional superlatives and generic “trusted guidance” phrasing.
3. **So what:** Connected records, scheduling, and role ownership to fewer missed handoffs and clearer next steps.
4. **Prove it:** Added the existing clinic-reference roster and direct ASRM, CDC, and SART sources; softened every claim that lacked case-specific evidence.
5. **Specificity:** Replaced broad IVF/insurance language with concrete records, screening, legal-clearance, travel, appointment, and transfer handoffs.
6. **Emotion:** Used the reader's real starting states—already having embryos, already having a clinic, or still needing both—without using fear or urgency.
7. **Zero risk:** Repaired the secondary CTA, described what happens after consultation, and placed professional boundaries near clinic references, data, and the final CTA.

Expert panel after editing:

| Reviewer lens | Score | Result |
|---|---:|---|
| Conversion copywriter | 8.5/10 | Clear value and CTA hierarchy without overclaiming |
| UX writer | 8/10 | Scannable paths, matrix, steps, checklist, and FAQ |
| Intended-parent persona | 8/10 | Starting-state language and clinic questions reduce ambiguity |
| Brand/compliance strategist | 9/10 | Coordination positioning and professional boundaries are consistent |
| SEO specialist | 8.5/10 | Primary intent is present in metadata, H1, first paragraph, headings, and internal links |

Average: **8.4/10**. All panel scores passed the skill's 7+ and average 8+ quality gate.

Implementation decisions after editing:

- Removed the no-action `Book a Call` button.
- Removed the self-link that promised a missing clinic overview.
- Removed detailed insurance, escrow, California law, and generic IVF sections.
- Removed remote ASRM event-photo presentation and its implied endorsement risk.
- Removed `FAQPage` and generic topic `ItemList` markup; retained visible FAQs for users.
- Added `dateModified` and `reviewedBy` to the page schema.
- Updated the English and Chinese machine-readable summaries to match the visible page.

## 7. Image optimization record

The `seo-images` pass replaced the unrelated legal-surrogacy hero with a clinic-consultation image already licensed for this repository. The page now serves:

- responsive 640 px and 1280 px AVIF and WebP sources;
- a 1280×853 JPEG fallback with explicit dimensions;
- bilingual, visually accurate alt text;
- eager loading, asynchronous decoding, and high fetch priority for the LCP candidate;
- a dedicated 1200×630, 69 KB Open Graph image.

The four remote ASRM event photographs were removed. This reduces third-party requests, avoids using event photography as implied partnership evidence, and keeps the visual narrative focused on clinic coordination. Field LCP impact remains a post-release measurement item.

## 8. Post-change `seo-page` review

The production-equivalent static build (`NUXT_PUBLIC_HIDE_LANGUAGE_SWITCHER=false`) rendered complete English and Chinese pages. The pre-release heuristic score improved from **63/100 to 92/100**; this score excludes field CWV and post-release search or conversion outcomes.

| Check | English | Chinese |
|---|---|---|
| Canonical | `/partner-ivf-clinics` | `/zh/partner-ivf-clinics` |
| Reciprocal hreflang | Pass | Pass |
| H1 | 1 | 1 |
| H2 | 9 | 9 |
| Rendered page copy | ~1,022 space-delimited words | Complete Chinese rendering |
| Page schema | WebPage, Service, BreadcrumbList | WebPage, Service, BreadcrumbList |
| FAQPage markup | Removed | Removed |
| Hero image | Alt, 1280×853 dimensions, two responsive sources, eager/high priority | Same technical delivery with Chinese alt |

Validation completed:

- ESLint: 0 errors; 31 pre-existing-style UnoCSS ordering warnings.
- TypeScript: passed.
- Default static generation: passed.
- Production-equivalent bilingual generation: passed; 424 routes generated.
- Primary and final CTAs render as links to the localized intended-parent consultation route.

The local default language flag intentionally redirects `/zh` routes when the switcher is hidden. Production currently serves a complete Chinese page, so bilingual validation used the documented production-equivalent flag rather than treating the local redirect as a page defect.

## 9. `seo-google` and `analytics` validation

### Search Console baseline

| Window | Clicks | Impressions | CTR | Average position |
|---|---:|---:|---:|---:|
| 2026-04-21–2026-07-20 | 0 | 429 | 0% | 29.1 |
| 2026-06-23–2026-07-20 | 0 | 198 | 0% | 25.9 |

The English and Chinese production URLs are currently submitted and indexed, allow crawling, fetch successfully as mobile pages, and have matching Google/user canonicals. Their most recent inspected crawls were 2026-07-14 and 2026-07-19 respectively. These inspections still describe the old live page because this change has not been deployed.

### GA4 baseline

GA4 property `505632329` shows the following organic landing-page baseline:

| Window | URL | Sessions | Users | Pageviews | Engagement rate |
|---|---|---:|---:|---:|---:|
| 2026-04-23–2026-07-22 | English | 4 | 3 | 4 | 50% |
| 2026-04-23–2026-07-22 | Chinese | 6 | 4 | 8 | 33.3% |
| 2026-06-25–2026-07-22 | English | 3 | 2 | 3 | 33.3% |
| 2026-06-25–2026-07-22 | Chinese | 2 | 2 | 3 | 50% |

Across all channels in the 91-day event query, GA4 recorded 63 English and 30 Chinese page views, but **zero key events** on the target or intended-parent thank-you rows. Seven thank-you-page views exist, but that is not a reliable conversion definition or proof that this landing page assisted those submissions.

### Tracking change and remaining analytics gate

The target page now pushes a PII-free `cta_clicked` event for the hero primary CTA, hero section-link CTA, and final CTA. Parameters are `button_text`, `cta_location`, `page`, and `content_group`.

The repository cannot confirm the external GTM container mapping. Before release sign-off:

1. Verify the event in GTM Preview and GA4 DebugView and confirm one event per click.
2. Configure or confirm the GTM GA4 event tag for `cta_clicked`.
3. Add a successful intended-parent submission event and mark that event—not a raw page view—as the GA4 key event.
4. Remove or redact the name and email currently passed in the thank-you URL before using `page_location` for conversion reporting.

Traffic is too small to claim a conversion-rate outcome. Post-release evaluation must use fixed windows, record the release date, and separate page effects from campaigns, seasonality, and other site changes.

## 10. Stage 9 implementation ticket and release gate

- **Problem:** `/partner-ivf-clinics` was indexed but did not satisfy its clinic-coordination task, generated 429 impressions and no clicks in the 91-day GSC baseline, mixed several adjacent intents, and had a broken primary control.
- **Affected URLs:** English and Chinese versions of `/partner-ivf-clinics`; the localized `/be-parents` route is the conversion destination.
- **Reproduction and evidence:** Compare the dated live-page baseline, GSC/GA4 snapshots, and post-change static output in `.seo-cache/pages/partner-ivf-clinics/`.
- **Impact:** High—core intended-parent intent, trust, qualified inquiry path, and internal topic ownership.
- **Priority:** High.
- **Implementation:** Retain the URL; recenter metadata and copy on clinic coordination; add starting paths, clinic references, responsibility boundaries, workflow, checklist, sources, localized internal links, focused FAQs, responsive images, and CTA events.
- **Dependencies:** Business approval of the clinic-reference roster; reviewer approval; production language flag; GTM mapping; deployment permission.
- **Owner:** Must be assigned across SEO/content, frontend, and analytics before release.
- **Due date:** Before the next production release; no calendar date was invented.
- **Acceptance test:** Build/typecheck/lint pass; both language URLs render the approved content with correct canonical/hreflang; schema mirrors visible content; CTA links and `cta_clicked` fire once; no PII enters analytics; post-release crawl and form conversion test pass.
- **Rollback:** Revert the target page, its `app.vue` metadata entry, public AI summaries, and the new image assets as one release unit. Re-run static generation and recrawl both localized URLs to confirm the prior state.

### Pre-release status

- Robots/indexability risk: pass in current production and rendered source.
- Canonical/hreflang: pass in production-equivalent output.
- Status/redirects: URL retained; no redirect required.
- Schema: pass in rendered output.
- Mobile/image/CLS risk: code-level pass; field CWV pending.
- Analytics: source event added; GTM/GA4 external verification and successful-form key event remain open.
- Business/reviewer approval: pending.
- Deployment: not performed.

### Post-release checks

1. Recrawl English and Chinese URLs and compare old versus new title, H1, word task, schema, internal links, and image delivery.
2. Inspect both URLs in Search Console and request recrawl after confirming the production response.
3. Test the complete intended-parent submission flow on desktop and mobile without sending personal data to analytics.
4. Annotate the release date; review impressions, clicks, CTR, query mix, average position, CTA clicks, successful submissions, qualified inquiries, and organic conversion rate after sufficient data accumulates.
5. Preserve all dated snapshots and do not overwrite this baseline.

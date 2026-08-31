# GEO 07 Editorial, Link and Acceptance Record

## Current decision

**Content implementation: COMPLETE LOCALLY. Editorial/expert approval: PENDING. Production deployment and index acceptance: PENDING.**

The existing bilingual canonical page now contains a self-contained Two Dads answer, five decision branches, visible medical/legal sources, a private-consultation CTA and an MHB event-hub CTA. No new URL was created.

## Gate 2 and scope checks

| Check | Status | Evidence/action |
|---|---|---|
| Critical crawl/index issues have a documented resolution | Pass with release recheck | Existing project audit/technical work; repeat against preview and live URL |
| Keyword and intent mapping complete | Pass | GEO 05 maps full gay-surrogacy path to `/single-parents-lgbtq` |
| Architecture approved | Pass | GEO 03 event hub and LGBTQ+ guide boundary |
| Content approval process defined | Partial | Checklist defined; named medical and legal approvals remain |
| Target URL and canonical ownership | Pass | Existing `/single-parents-lgbtq`; no new conflicting slug |

## Delivered content checks

- [x] English and Chinese direct answers explain donor egg, IVF, embryos, carrier, legal and insurance branches.
- [x] The carrier is distinguished from the egg donor.
- [x] Carrier medical autonomy is stated.
- [x] Medical, legal, insurance and escrow responsibilities are attributed to qualified professionals.
- [x] Yunda's role is limited to education, coordination and case management.
- [x] No guarantee, success rate, price, timeline, booth, attendee, case or testimonial was added.
- [x] Existing FAQ answer now matches the long answer.
- [x] `dateModified` is `2026-08-31`.
- [x] Visible sources link to ASRM and California law.

## CTA and internal-link plan

| Source | Destination | Anchor/CTA | Status |
|---|---|---|---|
| Two Dads answer | `/be-parents` | Plan My Private Consultation / 预约私密路径咨询 | Implemented locally |
| Two Dads answer | `/resources/mhb-new-york-2026` | View the event guide / 查看活动指南 | Implemented locally |
| Donor/IVF branch | `/egg-donation` | Review donor-egg planning | Implemented locally |
| Genetic branch | `/partner-ivf-clinics` | Prepare clinic questions | Implemented locally |
| Carrier branch | `/surrogacy-process` | See the full process | Implemented locally |
| Legal branch | `/surrogacy-protection-california` | Review protection topics | Implemented locally |
| Insurance/financial branch | `/surrogacy-cost` | Map cost categories | Implemented locally |
| Event hub | `/single-parents-lgbtq` | Existing Gay and LGBTQ+ surrogacy card | Already implemented locally |

## Editorial review checklist

- [ ] Named fertility/IVF reviewer approves donor, genetic-contribution, embryo and transfer language.
- [ ] Named reproductive-law reviewer approves contract, parentage and jurisdiction language.
- [ ] Insurance reviewer confirms that wording does not imply coverage.
- [ ] Real reviewer names, qualifications and review date are displayed only after approval.
- [ ] Event facts and Silver Sponsor placement are rechecked on release day.
- [ ] English and Chinese versions are reviewed for factual equivalence, not only translation fluency.
- [ ] Content owner and release date are recorded.

## Preview and release checks

- [x] Build/type/lint checks pass. `npm run typecheck` and `npx nuxt build` passed; page ESLint returned no errors and 55 non-blocking existing-style warnings.
- [x] Both locale pages return `200` in local static preview after the site's expected trailing-slash redirect.
- [x] The new H2, direct answer, five branches and sources are present in server-rendered HTML.
- [x] Desktop and calibrated 390 × 844 CSS-pixel EN/ZH views have no document-level horizontal overflow or clipped controls; branch and source links were raised to approximately 44px touch height.
- [x] All seven internal destinations resolve to `200` after the site's expected trailing-slash redirect; localized links resolve under `/zh/`.
- [x] External source links use `target="_blank"` and `rel="noopener noreferrer"`.
- [x] One self-referencing canonical remains on each locale page.
- [x] `en-US`, `zh-CN` and `x-default` hreflang remain aligned; trailing-slash normalization prevents duplicate hydrated alternates.
- [x] FAQ JSON-LD contains the revised Two Dads answer and matches the visible content source.
- [x] No new Article or Event entity is added to the service page.
- [ ] Analytics configuration is unchanged; existing conversion events require a browser/runtime re-test before release.
- [ ] After deployment, recrawl the live URL and record status, canonical, robots, schema and index evidence.

Initial static validation completed at `2026-08-31 08:26` Asia/Shanghai. Browser visual and hydration validation completed later in the same run against desktop and calibrated 390 × 844 CSS-pixel viewports; the detailed evidence is in `VISUAL-AUDIT-REPORT.md` and `SUMMARY.json`.

## Backup and recovery

- Backup: `.seo-cache/backups/2026-08-31/geo-07-two-dads-pre-execution-20260831-083500/`
- Scope: original task README, production page, automation configuration and automation memory. Additional pre-fix snapshots preserve the page/acceptance record and global `app.vue` before touch-target and hreflang normalization changes.
- Additional backups: `.seo-cache/backups/2026-08-31/geo-07-two-dads-visual-fix-20260831-084800/` and `.seo-cache/backups/2026-08-31/geo-07-hreflang-normalization-20260831-085200/`.
- Restore production page from `production/single-parents-lgbtq.vue` and task state from `task/` if rollback is separately approved.
- Keep the backup until expert review, release checks and post-release verification pass.

## Acceptance summary

| Requirement | Result |
|---|---|
| Content brief | Pass |
| Complete bilingual copy | Pass, implemented locally |
| Draft/editorial review checklist | Pass; expert approvals pending |
| Sources and evidence index | Pass |
| CTA plan | Pass and implemented locally |
| Activity-hub mutual linking | Pass in local repository |
| Distribution readiness | Partial; editorial approval and deployment pending |
| Index readiness | Partial; local build and static HTML checks pass, while live verification remains pending |

The task may be marked content-complete after local validation, but it must not be described as published or indexed until post-release evidence exists.

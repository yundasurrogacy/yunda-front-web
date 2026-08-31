# GEO 06 Publishing Checklist and Acceptance Record

## Current decision

**Brief preparation: PASS. GEO 05 mapping dependency: PASS. Publication readiness: BLOCKED. Live-entry acceptance: NOT YET TESTABLE.**

The task now has a reviewable brief, attributable sources, differentiation boundaries, CTA, internal links, Schema recommendation, and release checks. No production implementation was performed.

## Gate 2 checks

| Check | Status | Evidence/action required |
|---|---|---|
| Critical crawl/index issues have a documented resolution | Pass with release recheck | Campaign technical review records closure; repeat on preview |
| Keyword and intent mapping complete | Pass | GEO 05 maps the unique checklist intent to a candidate pre-event blog |
| Architecture approved | Pass | GEO 03 freezes the event-hub/LGBTQ-page boundary |
| Content approval/publishing process defined | Partial | Checklist exists; named medical/legal reviewers still required |
| Target URL approved | Partial | GEO 05 candidate: `/blog/questions-to-ask-surrogacy-agency-at-mhb-new-york-2026`; CMS/index/canonical checks remain |

## Editorial and factual review

- [x] Confirm target page type and query ownership in GEO 05.
- [ ] Validate the candidate slug against CMS rules, existing index, and canonical ownership.
- [ ] Assign a real content owner and approval date.
- [ ] Obtain medical/fertility review for ART, donor, screening, IVF, embryo, and pregnancy language.
- [ ] Obtain jurisdiction-specific legal review for agreement, parentage, insurance, escrow, and cross-border language.
- [ ] Display real reviewer names, relevant qualifications, and `Last reviewed` date only after approval.
- [ ] Verify all source links and event facts on the publication date.
- [ ] Keep Yunda's role limited to education, coordination, and case management.
- [ ] Keep Men Having Babies as organizer and Yunda as a Silver Sponsor only.
- [ ] Exclude unverified costs, timelines, success rates, cases, testimonials, booth details, and staff attendance.
- [ ] Confirm any real photos have consent, accurate captions, and correct event context.

## Preview-first release checks

Per the user's release instruction, run these checks on a local preview before any push:

- [ ] Render the intended page locally and inspect desktop and mobile layouts.
- [ ] Confirm the new module stays in the approved page position and existing sections are not removed or reordered unintentionally.
- [ ] Confirm the direct answer and FAQ are present in server-rendered/static HTML.
- [ ] Confirm primary CTA `/be-parents` and all contextual internal links resolve without redirect chains.
- [ ] Confirm the page returns `200`, is not blocked by `robots.txt`, and has no `noindex`.
- [ ] Confirm one self-referencing canonical uses the approved production URL.
- [ ] Confirm EN/ZH `hreflang` pairs and `x-default`, if the paired page exists and is approved.
- [ ] Confirm page title/H1 ownership does not conflict with the MHB event hub.
- [ ] Validate JSON-LD against visible content; no duplicate/conflicting entities.
- [ ] Confirm no `Event` entity is added to the pre-event blog.
- [ ] Confirm the approved URL is included in XML/HTML sitemaps only after publication approval.
- [ ] Confirm existing analytics events still fire; do not create or change analytics configuration in this task.
- [ ] Run build, lint/type checks where available, and compare the page with its pre-change local baseline.

## GEO/citability checks

- [ ] The opening answer is self-contained and directly answers “where do you start?”
- [ ] Each factual medical/legal passage is attributable to a reliable source.
- [ ] Facts, Yunda claims, and recommendations are distinguishable.
- [ ] Headings and lists preserve meaning when extracted as passages.
- [ ] Terminology is consistent: intended parent, egg donor, gestational carrier, IVF clinic.
- [ ] No guaranteed or absolute outcome wording appears.
- [ ] The page identifies who provides each type of professional advice.

## Acceptance against GEO 06 criteria

| Required result | Status | Notes |
|---|---|---|
| Content brief | Pass | `2026-08-30-content-brief.md` |
| Reliable sources | Pass for drafting | Requires final-date recheck and expert review |
| Differentiating evidence/rules | Pass | Decision-map approach and role boundaries documented |
| CTA | Pass | Primary and secondary CTA defined |
| Internal links | Pass as plan | No links were changed in production |
| Schema | Pass as recommendation | No Schema was changed in production |
| Publishing checklist | Pass | This document |
| Live gay-men-surrogacy entry | Pending | Implementation not in approved scope |
| Index prerequisites | Defined, not executed | Must be tested on local preview and release candidate |

## Backup and rollback

- Pre-execution backup: `.seo-cache/backups/2026-08-30/geo-06-gay-men-pre-execution-20260830-224835/`
- Restore the backed-up README and remove only the three new GEO 06 artifacts if an approved rollback is needed.
- Keep the backup while publication is blocked or acceptance is incomplete.
- No production rollback exists because no production files or external systems were changed.

## Next eligible action

Validate the GEO 05 candidate slug and assign named expert reviewers. Then prepare the separate writing/implementation/publication stage, show its exact files and validation plan, and wait for a new `开始优化` approval before drafting production copy, editing code/CMS content, or publishing the page.

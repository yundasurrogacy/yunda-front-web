# Agent Handoff Notes

Last updated: 2026-06-20

## Project Context

This repository is the Nuxt frontend for Yunda Surrogacy, a California-centered surrogacy agency website serving two primary conversion audiences:

- Intended parents who need U.S. surrogacy planning, cost education, matching coordination, IVF clinic coordination, legal/insurance/escrow coordination context, and bilingual support.
- Surrogate candidates who need eligibility guidance, compensation education, screening coordination, legal/insurance/escrow context, and an application path.

The site is bilingual. English is the default URL language, while Chinese uses the `/zh` prefix. The project includes static marketing pages, blog routes, machine-readable `.md` summaries, XML sitemaps, `llms.txt`, and internal planning documents.

## Recent Work Summary

### Marketing Skills Installed

The `coreyhaines31/marketingskills` package was installed locally into `C:\Users\admin\.codex\skills`.

Installed skills include marketing planning, SEO, CRO, product marketing, site architecture, directory submissions, AI SEO, schema, content strategy, ads, social, email, pricing, referrals, onboarding, and related go-to-market workflows.

Important installed skills used in recent analysis:

- `product-marketing`
- `site-architecture`
- `directory-submissions`
- `ai-seo`
- `seo-audit`
- `schema`

Restart Codex after installing skills so newly installed skills are available in future sessions.

### Product Marketing Context

The product marketing context document exists at:

- `.agents/product-marketing.md`

Notes:

- The file captures Yunda's business model, audiences, personas, differentiation, objections, proof points, and conversion goals.
- Some Chinese text displays as mojibake in the terminal, likely from encoding handling, but the business intent is still recoverable.
- The core context is that Yunda is a high-trust, high-ticket, bilingual surrogacy coordination agency with dual-sided acquisition: intended parents and surrogate candidates.

### Directory Submission Plan

A directory and backlink plan exists at:

- `docs/DIRECTORY_SUBMISSION_PLAN.md`
- `docs/directory-submission-tracker.csv`

Main recommendation:

- Do not submit Yunda as a generic SaaS, AI tool, MCP agent, or no-code product.
- Prioritize fertility, surrogacy, LGBTQ+ family-building, intended-parent provider directories, local business profiles, high-authority profile platforms, and editorial outreach.
- Skip AI tool directories unless Yunda launches a real public AI tool, calculator, chatbot, or intake assistant.

Recommended destination URLs for submissions:

- General brand/local profile: `/`
- Intended parents: `/be-parents`
- Surrogate candidates: `/be-surrogate`
- Cost education: `/surrogacy-cost`
- Surrogate compensation: `/surrogate-compensation`
- Requirements: `/surrogate-requirements`
- Legal/insurance/escrow education: `/surrogacy-protection-california`
- IVF clinic coordination: `/partner-ivf-clinics`
- LGBTQ+/single parents: `/single-parents-lgbtq`

### Machine-Readable AI/SEO Updates

Recent updates added or expanded machine-readable content and AI citation routing.

Files involved:

- `public/llms.txt`
- `public/surrogate-requirements.md`
- `public/surrogacy-protection-california.md`
- `public/zh/surrogacy-cost.md`
- `public/zh/surrogate-compensation.md`
- `scripts/generate-xml-sitemaps.cjs`
- `public/sitemap.xml`
- `public/sitemap-en.xml`
- `public/sitemap-zh.xml`

Key changes:

- `llms.txt` now points AI systems to topic-specific machine-readable summaries for surrogate requirements and California legal/insurance/escrow protection.
- Cost questions should prefer `/surrogacy-cost` and `/surrogacy-cost.md` over homepage, referral pages, or blog posts.
- Compensation questions should prefer `/surrogate-compensation` and `/surrogate-compensation.md` over homepage, referral pages, or application pages.
- Legal, insurance, escrow, and California protection questions should cite `/surrogacy-protection-california` and `/surrogacy-protection-california.md`.
- `generate-xml-sitemaps.cjs` now includes additional English machine-readable files:
  - `/surrogate-requirements.md`
  - `/surrogacy-protection-california.md`

Important compliance language:

- Yunda provides education, coordination, and case-management support.
- Yunda is not a law firm, medical provider, IVF clinic, insurance company, or escrow company.
- Do not guarantee legal outcomes, insurance coverage, payment timing, candidate qualification, or medical outcomes.

### Page Content Updates

Two user-facing pages received "Authority Summary" sections.

Files:

- `pages/(parents)/surrogacy-cost.vue`
- `pages/(surrogate-resources)/surrogate-compensation.vue`

`/surrogacy-cost` update:

- Adds a bilingual "Authority Summary" section after the hero/content intro.
- Message: compare surrogacy cost by scope first, then total cost.
- Mentions agency coordination, surrogate compensation, legal, insurance, escrow, IVF clinic fees, newborn medical care, embryo status, insurance exclusions, twins, and C-section variables.

`/surrogate-compensation` update:

- Adds a bilingual "Authority Summary" section.
- Message: surrogate compensation is a package, not one number.
- Mentions base compensation, allowances, reimbursements, medical-event add-ons, escrow timing, eligibility, agreement terms, insurance review, and escrow coordination.

## Site Architecture Analysis

The current site has a structural conflict around "Resources."

Observed current structure:

- `/resources` is a standalone Resources & Media Center page. It includes blog links, Substack/Surrogate 101 content, Instagram surrogate updates, events, and media-style content.
- Navigation and sitemap also contain a "Surrogate Resources" group for surrogate candidate SEO pages.
- Nuxt route groups such as `pages/(surrogacy)` and `pages/(surrogate-resources)` are organizational only and do not appear in the public URL.
- As a result, many strategically different pages are currently flattened at root-level URLs.

Current examples:

- `/resources`
- `/blog`
- `/be-surrogate`
- `/surrogate-requirements`
- `/surrogate-process`
- `/surrogate-compensation`
- `/become-a-surrogate`
- `/become-surrogate-california`
- `/california-surrogacy-consultation`
- `/benefit`
- `/eligibility`
- `/screening`
- `/journey`
- `/referral`
- `/surrogacy-cost`
- `/surrogacy-process`
- `/egg-donation`

Core issue:

- `/resources` means general media/content resources.
- "Surrogate Resources" means surrogate candidate acquisition and SEO pages.
- Users and search engines may struggle to distinguish a media center from the surrogate candidate content hub.

## Recommended Information Architecture

The site should be reorganized conceptually into three major centers:

```text
Homepage (/)
├── Intended Parents (/intended-parents)
│   ├── Become a Parent (/be-parents)
│   ├── Surrogacy Process (/intended-parents/surrogacy-process)
│   ├── Surrogacy Cost (/intended-parents/surrogacy-cost)
│   ├── Egg Donation (/intended-parents/egg-donation)
│   ├── Partner IVF Clinics (/intended-parents/partner-ivf-clinics)
│   ├── LGBTQ & Single Parents (/intended-parents/single-parents-lgbtq)
│   └── California Surrogacy Protection (/intended-parents/california-surrogacy-protection)
├── Surrogates (/surrogates)
│   ├── Apply to Be a Surrogate (/be-surrogate)
│   ├── Requirements (/surrogates/requirements)
│   ├── Process (/surrogates/process)
│   ├── Compensation (/surrogates/compensation)
│   ├── Benefits (/surrogates/benefits)
│   ├── Screening (/surrogates/screening)
│   ├── Journey (/surrogates/journey)
│   ├── California Surrogates (/surrogates/california)
│   └── Referral Program (/surrogates/referral)
├── Resources & Media (/resources)
│   ├── Blog (/blog)
│   ├── Surrogacy 101 / Substack section
│   ├── Surrogate Updates
│   └── Events & Media
├── About (/about)
└── Legal
```

Recommended nav labels:

- Use `For Intended Parents` for intended-parent pages.
- Use `For Surrogates`, `Surrogate Guide`, or `Become a Surrogate` for surrogate candidate pages.
- Keep `/resources` as `Resources & Media`, not as the parent of surrogate candidate SEO pages.

Suggested header/side navigation:

```text
For Intended Parents
For Surrogates
Resources & Media
About
Contact / Apply
```

Suggested footer groups:

```text
Intended Parents
- Become a Parent
- Process
- Cost
- Egg Donation
- IVF Clinics
- LGBTQ & Single Parents
- California Legal Protection

Surrogates
- Apply to Be a Surrogate
- Requirements
- Process
- Compensation
- Benefits
- Screening
- Journey
- Referral Program

Resources & Media
- Resources & Media Center
- Blog
- Surrogate 101
- Events
- Social Updates

Company
- About
- Careers
- Contact

Legal
- Privacy Policy
- Terms
- Disclaimer
- Sitemap
```

## URL Migration Recommendation

Do not remove old URLs abruptly. Many current URLs are already in `data/seo-routes.json` with high priority and may have search value.

Recommended phased approach:

1. Rename navigation labels first.
2. Update breadcrumbs and internal links to reflect the intended hierarchy.
3. Add new cleaner URL routes where needed.
4. Add 301 redirects from old root-level URLs to new hierarchy URLs.
5. Update `data/seo-routes.json`, `data/sitemap-data.json`, XML sitemap generation, and `llms.txt`.
6. Monitor Search Console for coverage, redirects, and ranking impact.

Potential mapping:

| Current URL | Recommended URL | Notes |
| --- | --- | --- |
| `/surrogate-requirements` | `/surrogates/requirements` | Main surrogate qualification page. |
| `/surrogate-process` | `/surrogates/process` | Main surrogate process page. |
| `/surrogate-compensation` | `/surrogates/compensation` | Main compensation page. |
| `/benefit` | `/surrogates/benefits` | Benefits/support page. |
| `/eligibility` | `/surrogates/requirements` or `/surrogates/eligibility` | Avoid duplicate with requirements. |
| `/screening` | `/surrogates/screening` | Screening detail page. |
| `/journey` | `/surrogates/journey` | Journey/experience page. |
| `/referral` | `/surrogates/referral` | Referral program. |
| `/become-a-surrogate` | `/surrogates/become-a-surrogate` or redirect to `/be-surrogate` | Decide whether this is SEO content or application. |
| `/become-surrogate-california` | `/surrogates/california` | California surrogate landing page. |
| `/california-surrogacy-consultation` | Audience-dependent | If surrogate-facing, move under `/surrogates`; if parent-facing, move under `/intended-parents`. |
| `/surrogacy-process` | `/intended-parents/surrogacy-process` | Intended parent process. |
| `/surrogacy-cost` | `/intended-parents/surrogacy-cost` | Keep old URL redirected if migrated. |
| `/egg-donation` | `/intended-parents/egg-donation` | Parent-facing. |
| `/partner-ivf-clinics` | `/intended-parents/partner-ivf-clinics` | Parent-facing. |
| `/single-parents-lgbtq` | `/intended-parents/single-parents-lgbtq` | Parent-facing. |

## Internal Linking Strategy

Surrogate candidate SEO pages should form one funnel:

```text
/surrogates/requirements
/surrogates/process
/surrogates/compensation
/surrogates/benefits
/surrogates/screening
/surrogates/journey
        ↓
/be-surrogate
```

Intended parent SEO pages should form a separate funnel:

```text
/intended-parents/surrogacy-cost
/intended-parents/surrogacy-process
/intended-parents/egg-donation
/intended-parents/single-parents-lgbtq
        ↓
/be-parents
```

`/resources` should not become the parent for surrogate candidate pages. It should act as a media/content distribution hub that links out to business pages where relevant.

## Current Git Working Tree Snapshot

As of the latest check, modified files included:

- `pages/(parents)/surrogacy-cost.vue`
- `pages/(surrogate-resources)/surrogate-compensation.vue`
- `public/llms.txt`
- `public/sitemap-en.xml`
- `public/sitemap-zh.xml`
- `public/sitemap.xml`
- `public/zh/surrogacy-cost.md`
- `public/zh/surrogate-compensation.md`
- `scripts/generate-xml-sitemaps.cjs`

Untracked or newly added paths included:

- `.agents/`
- `components/ui/`
- `docs/DIRECTORY_SUBMISSION_PLAN.md`
- `docs/directory-submission-tracker.csv`
- `public/surrogacy-protection-california.md`
- `public/surrogate-requirements.md`

Before committing, review `components/ui/` because it appeared as untracked but was not analyzed in this handoff.

## Next Recommended Tasks

1. Decide whether to implement the URL migration now or first only rename navigation labels.
2. Rename visible `Surrogate Resources` navigation to `For Surrogates` or `Surrogate Guide`.
3. Keep `/resources` labeled as `Resources & Media Center`.
4. Update breadcrumbs on surrogate-facing pages so they point to a surrogate hub instead of generic resources.
5. Add or formalize a `/surrogates` hub page if the site keeps the new hierarchy.
6. Add redirect rules in `nuxt.config.ts` or deployment config before changing public URLs.
7. Regenerate and verify XML sitemaps after route changes.
8. Check `llms.txt` and machine-readable `.md` summaries after any canonical URL changes.
9. Validate `hreflang`, canonical URLs, and JSON-LD language using `docs/MULTILINGUAL_SEO_VERIFICATION.md`.


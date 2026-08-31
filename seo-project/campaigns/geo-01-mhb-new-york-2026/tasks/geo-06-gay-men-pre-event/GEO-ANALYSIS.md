# GEO 06 AI Search Readiness Analysis

Analyzed: 2026-08-31 (Asia/Shanghai)
Target: `https://www.yundasurrogacy.com/blog/mhb-new-york-2026-guide-gay-intended-parents`

## Readiness score

- **Validated develop/local candidate: 88/100**
- **Current production discoverability: blocked by HTTP 404**

The score reflects the optimized CMS record rendered through a clean local Nuxt build. The production URL returned HTTP 404 on 2026-08-31 because the current production deployment predates the CMS article. No claim of live indexability is made until a later production release returns 200.

| Area | Score | Evidence |
|---|---:|---|
| Passage citability | 24/25 | 157-word self-contained answer, direct first sentence, explicit role boundaries |
| Structural readability | 19/20 | One template H1, 19 rendered H2, 15 rendered H3 including page-generated modules, lists and two tables |
| Multi-modal content | 11/15 | Relevant gay-fathers hero image; no unsupported client/event claim |
| Authority and brand signals | 17/20 | Visible sources, author/update data, Yunda scope statement, organizer/sponsor boundary |
| Technical accessibility | 17/20 | SSR HTML, canonical, BlogPosting/FAQPage/Breadcrumb schema, AI crawlers allowed, llms.txt entry; production 404 remains |

## Platform outlook

| Platform | Candidate readiness | Current production limitation |
|---|---|---|
| Google AI Overviews | Strong passage and traditional SEO structure | URL cannot rank or be cited while it returns 404 |
| ChatGPT Search | Clear entity roles, first-party event link, CDC/ASRM/Courts citations | Production URL unavailable; deployment required |
| Perplexity | Extractable tables, FAQs, and attributable sources | Production URL unavailable; no live citation check yet |
| Bing Copilot | Canonical SSR article and crawlable internal links | Production URL unavailable; no IndexNow submission in this scope |

## AI crawler access

`public/robots.txt` explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, and PerplexityBot. The general rule also allows crawling. No GEO 06-specific crawler block was found.

## llms.txt status

`public/llms.txt` already described the campaign event hub and Yunda's service boundaries. GEO 06 adds the exact pre-event provider-question article and corrects the relationship wording to Men Having Babies as organizer and Yunda as Silver Sponsor, not organizer/co-organizer.

## Passage-level citability

The opening section, `Surrogacy for Gay Men: Where Do You Start?`, is 157 words and can stand alone when extracted. It identifies the likely participants and decision sequence, qualifies jurisdictional variation, and separates Yunda coordination from independent medical and legal advice.

Supporting sections improve citation usefulness by:

- assigning decisions to agencies, clinics, attorneys, insurance specialists, and escrow providers;
- using like-for-like comparison tables instead of provider rankings;
- citing Men Having Babies, CDC, ASRM, and California Courts;
- keeping event facts on the event hub and full LGBTQ+ pathway content on `/single-parents-lgbtq`.

## Structured data and SSR

The clean local build produced:

- one visible H1 from the blog template;
- self-referencing canonical to the approved slug;
- no `noindex` on the English page;
- `BlogPosting`, `WebPage`, `BreadcrumbList`, and visible-content `FAQPage` nodes;
- the optimized body in prerendered HTML rather than client-only content.

## Highest-impact changes completed

1. Replaced duplicated and fragmented opening copy with a 157-word direct answer.
2. Removed multiple CMS-body H1 elements and established H2/H3 hierarchy.
3. Reframed the article around a repeatable provider-question checklist and comparison worksheet.
4. Added reliable source attribution and explicit medical/legal/insurance/escrow role boundaries.
5. Added contextual internal links, a consultation CTA, and llms.txt discovery guidance.

## Remaining risks

1. Production URL returns 404 until a production release includes the CMS slug; this run intentionally does not push or merge `main`.
2. `Reviewed by Kayla Luo` is emitted by the existing shared blog template. Its qualification/approval source should remain governed by the site's existing author-review controls.
3. The article has no Chinese body. Existing site logic keeps missing Chinese blog routes out of the Chinese index and redirects them; do not add a Chinese alternate until a real translation exists.
4. No live AI-platform citation test or ranking claim was made.

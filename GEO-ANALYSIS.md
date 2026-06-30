# Yunda Surrogacy GEO Analysis

Analyzed: 2026-06-30  
Domain: https://www.yundasurrogacy.com/  
Scope: source-level GEO readiness audit for Google AI Overviews, ChatGPT Search, Perplexity, Bing Copilot, and AI crawler accessibility.  
Verification note: this run used local source/cache inspection because network access is restricted; deploy and live HTTP verification are still required.

## 1. GEO Readiness Score: 84/100

Yunda now has a strong GEO foundation for AI retrieval: explicit AI crawler rules, a richer `llms.txt`, AI-focused sitemaps, machine-readable markdown summaries, SSR/static rendering, broad schema coverage, named-reviewer support, and several answer-first blocks on priority pages.

The biggest remaining opportunity is no longer crawler access. It is citation competitiveness: strengthen third-party entity corroboration, tune more passages into compact quote-ready blocks, and keep medical/legal/insurance claims close to authoritative sources.

| Area | Score | Status |
|---|---:|---|
| AI crawler access | 19/20 | Explicitly allows major AI search crawlers in source |
| Machine-readable guidance | 18/20 | `llms.txt`, markdown summaries, and AI sitemap are strong |
| Passage-level citability | 20/25 | Improved with answer blocks; several blocks are still slightly short |
| E-E-A-T and source support | 16/20 | Named reviewer pattern improved; some pages still use team review |
| Entity corroboration | 11/15 | Owned entity signals are good; third-party validation remains thin |

## 2. What Improved

1. `public/robots.txt` now explicitly allows GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, and PerplexityBot.
2. `public/llms.txt` now includes `sitemap-ai.xml`, preferred citation facts, external reference sources, and a named reviewer.
3. Priority markdown files now include answer-first citation blocks for AI retrieval.
4. Key page templates now support stronger `dateModified` and `reviewedBy` schema.
5. Several high-intent pages now use visible named reviewer language instead of generic team review.
6. Medical/legal claims are better grounded with ASRM and official/legal context where appropriate.

Important correction: `pages/(surrogate-resources)/surrogate-requirements.vue` was first restored to the repository baseline, then re-optimized with a narrower GEO change set: a 136-word answer block, named reviewer, source link, and matching schema metadata.

## 3. Platform Readiness

| Platform | Score | Current Read |
|---|---:|---|
| Google AI Overviews | 86/100 | Strongest fit. SSR, schema, FAQs, topical pages, and authoritative caveats give Google enough structure to extract answers. |
| ChatGPT Search | 82/100 | Improved by explicit crawler access, `llms.txt`, preferred facts, and cleaner answer blocks. Needs more third-party corroboration. |
| Perplexity | 77/100 | Better than before because source pages are easier to cite. Still limited by independent mentions and community/professional validation. |
| Bing Copilot | 83/100 | Good technical fit through static rendering, sitemaps, IndexNow-oriented setup, and structured page data. |

## 4. AI Crawler Strategy

Current source policy is clear and AI-search friendly:

```txt
User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /
```

Recommended policy stance:

- Keep search and answer crawlers explicitly allowed: GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot.
- Decide separately on training-oriented crawlers such as CCBot, Bytespider, anthropic-ai, and cohere-ai.
- After deploy, verify production `robots.txt` returns HTTP 200 and contains the explicit AI crawler blocks.
- Keep `sitemap.xml` and `sitemap-ai.xml` discoverable from both `robots.txt` and `llms.txt`.

## 5. AI-Citable Answer Blocks

Current status: materially improved.

| File/Page | Status | Note |
|---|---|---|
| `public/surrogacy-cost.md` | Strong | One detected answer block is 135 words, inside the preferred 134-167 word range. |
| `public/surrogacy-process.md` | Near-optimal | Main block is about 132 words; add 2-5 words if strict passage-length tuning is desired. |
| `public/surrogate-requirements.md` | Near-optimal | Main block is about 131 words; keep because page `.vue` was reverted by request. |
| `public/services.md` | Near-optimal | Main block is about 131 words; can be lightly expanded. |
| Chinese markdown summaries | Improved | Good answer-first structure; CJK word counts are not directly comparable to English token guidance. |
| Priority Vue pages | Improved | Answer blocks exist on cost/process/parent/surrogate intent pages; `surrogate-requirements.vue` now has a 136-word visible answer block after rollback and re-optimization. |

Recommended pattern for future pages:

```md
## Direct answer

[134-167 words that answer the query in one self-contained passage. Include who it is for, what happens, what Yunda coordinates, and what must be confirmed by licensed medical/legal/insurance professionals.]
```

## 6. E-E-A-T Status

Strong points:

- About/team content provides real people who can support visible review signals.
- `utils/schema.ts` now supports `dateModified` and `reviewedBy` on page/service schema.
- Several pages now move from generic "team reviewed" language toward named review by Kayla Luo.
- YMYL caveats are clearer: Yunda is not a law firm, medical provider, insurance company, escrow company, or IVF clinic.

Remaining gaps:

- Do not add `reviewedBy` schema unless the same named reviewer is visible on the page.
- Add a stable author/reviewer block pattern across high-risk pages.
- Add reviewer bio anchors on About and connect them consistently from page trust notes.
- Where legal/medical claims appear, keep source links near the claim rather than only in global footer or `llms.txt`.

## 7. Claim Source Support

Improved source types:

- ASRM guidance for gestational carrier and screening-related claims.
- California/legal context for surrogacy and parentage coordination where relevant.
- Internal source-of-truth pages for compensation, process, protection, professionals, and requirements.

Next source improvements:

1. Add a compact "Sources reviewed" line to each YMYL-adjacent page.
2. Prefer primary or professional sources over general articles.
3. Separate Yunda service claims from medical/legal claims.
4. Use cautious wording: "typically", "may", "should be confirmed", "licensed professionals".

## 8. Entity and Brand Signals

Owned entity signals are solid: site schema, YouTube, LinkedIn, Instagram, Facebook, bilingual content, and machine-readable summaries.

The weaker area is independent corroboration. ChatGPT Search and Perplexity often favor brands that are mentioned by other trusted sources, not just brands that describe themselves well.

Priority actions:

1. Strengthen LinkedIn and YouTube topical authority around California surrogacy, cost, process, requirements, and bilingual support.
2. Earn partner/professional mentions from IVF clinics, attorneys, escrow/insurance professionals, and fertility directories.
3. Pursue interviews, podcasts, association pages, and educational collaborations.
4. Avoid forced Wikipedia/Wikidata unless independent notability is defensible.
5. Encourage authentic reviews and third-party discussion without manufactured community activity.

## 9. Highest-Impact Next Steps

1. Deploy the changes and live-verify `robots.txt`, `llms.txt`, `sitemap.xml`, `sitemap-ai.xml`, and representative priority pages.
2. Lightly expand the English answer blocks in `surrogacy-process.md`, `surrogate-requirements.md`, and `services.md` into the 134-167 word target range.
3. Standardize named reviewer display across high-intent pages, using visible About-page people only.
4. Add concise source lines near high-stakes claims on cost, process, requirements, compensation, and legal/protection pages.
5. Build third-party entity corroboration through professional partners, directories, YouTube, LinkedIn, interviews, and earned mentions.

## 10. Audit Limitations

- No live production crawl was run in this pass.
- No Google Search Console, GA4, Bing Webmaster, or DataForSEO data was queried.
- Brand mention analysis is based on local/cache context, not a fresh web-wide search.
- Scores reflect current source readiness, not confirmed production visibility.

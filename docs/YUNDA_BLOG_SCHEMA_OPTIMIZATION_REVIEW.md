# Yunda Blog Detail Schema Optimization Review

Date: 2026-07-05

## Scope

This review covers the Yunda blog detail page after the layout and conversion-focused redesign.

Primary file:

- `pages/blog/[id].vue`

Shared schema helpers:

- `utils/schema.ts`

Reference standards checked:

- Google Search Central Article structured data
- Google Search Central FAQ rich result update
- Schema.org BlogPosting

## Current Schema Structure

The blog detail page now outputs one JSON-LD `@graph` for the article page:

1. `WebPage`
2. `BlogPosting`
3. `BreadcrumbList`
4. `FAQPage`, when visible extracted FAQ items exist

This is a good structure for a blog detail template because it separates page identity, article content, breadcrumb navigation, and visible Q&A content while keeping them connected through stable `@id` values.

## Implemented Adjustments

### 1. Added FAQPage For Visible Q&A Content

The redesigned page includes a visible module named "Questions this guide helps answer".

Because those questions and answers are visible to users, they can be represented with `FAQPage` schema. The page now adds a `FAQPage` node only when extracted FAQ items exist.

Important note:

Google has deprecated broad FAQ rich result visibility. This is still useful as semantic structured data, but it should not be treated as a guaranteed FAQ rich result opportunity.

### 2. Connected WebPage To BlogPosting

`WebPage` now includes:

```json
"mainEntity": {
  "@id": "PAGE_URL#article"
}
```

This makes the relationship clearer: the page's main entity is the blog article.

### 3. Added Stable FAQPage ID Support

`buildFAQPageSchema()` now supports `faqPageId`.

The blog detail page uses:

```text
PAGE_URL#faq
```

This keeps the graph more explicit and easier for validators/search engines to connect.

### 4. Added WebPage mainEntity Support In Shared Helper

`buildWebPageSchema()` now supports a `mainEntity` option so other page templates can reuse this pattern.

### 5. Fixed Chinese Schema/SEO Text Issues

Several schema-adjacent Chinese strings had encoding corruption and were corrected where they affected actual output:

- Chinese fallback blog title suffix
- Chinese fallback image alt text
- Chinese breadcrumb names
- Chinese FAQ heading exclusion filter
- Organization alternate Chinese names

## Validation Result

Local page checked:

```text
http://localhost:3003/blog/surrogate-mother-health-insurance-questions-2026
```

Rendered JSON-LD contains:

- `WebPage`
- `BlogPosting`
- `BreadcrumbList`
- `FAQPage`

For the tested article, `FAQPage` contains 4 visible Q&A items.

TypeScript validation:

```text
npm run typecheck
```

Result: passed.

## Remaining Recommendations

### Author Schema

Google recommends author disambiguation through `author.url` or `sameAs` when available.

Current article schema uses author names from CMS data, with publisher pointing to Yunda. This is acceptable, but better future data would be:

- If author is a real person: add profile URL.
- If author is Yunda Team: reference the organization `@id`.

### Image Metadata

Current image schema includes `ImageObject.url`. In the future, if the CMS stores image dimensions, add:

- `width`
- `height`

This is not required, but improves image clarity for parsers.

### FAQ Source Control

FAQ schema is generated from extracted article FAQ content. This works, but the best long-term CMS model would store:

- `faq_question`
- `faq_answer`
- display order

That would reduce parsing dependency and give editors more control.

### Validate Before Production

Before deploying major blog template changes, test representative URLs in:

- Google Rich Results Test
- Schema.org Validator
- Google Search Console URL Inspection


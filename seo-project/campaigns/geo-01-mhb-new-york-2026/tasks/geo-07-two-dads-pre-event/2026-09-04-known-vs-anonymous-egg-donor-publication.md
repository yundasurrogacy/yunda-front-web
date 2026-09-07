# Publication and Validation Record

- Executed: 2026-09-04 (Asia/Shanghai)
- CMS ID: 180
- Route: `/blog/known-vs-anonymous-egg-donor-gay-men`
- Branch target: `develop` only
- Body SHA-256: `80fee592b1490fc9a5602bfafdf3dc202975dc4123c386dc962faf0db7fb0f8d`

## Delivered

- 1,436-word English decision guide with an answer-first opening.
- Comparison table, five visible FAQs, source list, explicit Yunda role boundaries, and intended-parent CTA.
- Five contextual internal links to the egg-donation, IVF-clinic, surrogacy-process, LGBTQ+ family-building, and inquiry pages.
- Generated 1536×1024 editorial hero; optimized local JPEG retained at 264 KB.
- Cover uploaded to the project media host and verified with HTTP 200 / `image/jpeg`.
- CMS record created through `POST /api/blog`, then read back and verified by exact slug, metadata, cover URL, and body hash.
- English sitemap entry added; the missing-Chinese manifest and temporary `/zh/blog/*` redirect were synchronized.

## Local release validation

- `npm run sitemap:xml`: passed; 85 CMS blogs discovered, 42 without Chinese bodies.
- `npx nuxt build`: passed; 406 static routes prerendered, including the target route.
- One page-template H1; CMS body contains no H1.
- Canonical: `https://www.yundasurrogacy.com/blog/known-vs-anonymous-egg-donor-gay-men`.
- English route has no `noindex`.
- `BlogPosting` and `FAQPage` JSON-LD present.
- FAQ headings, comparison table, CTA, sources, cover image, and all five approved internal links render locally.
- Desktop local preview visually passed: hero crop, breadcrumb, title, and responsive content frame are intact.

## Known non-blocking warnings

- Nuxt reports an existing `components/ui/.gitkeep/index` `ENOTDIR` module warning.
- Browserslist reports an existing stale `caniuse-lite` dataset warning.
- Neither warning failed the build or target-route prerender.

## Backup and rollback

- CMS pre-change slug inventory: `.seo-cache/backups/2026-09-04/geo-new-blog-before-1755/`.
- Sitemap/redirect pre-change files: `.seo-cache/backups/2026-09-04/geo-new-blog-sitemap-before-2110/`.
- CMS rollback verifies the exact created record before deletion: `node seo-project/campaigns/geo-01-mhb-new-york-2026/tasks/geo-07-two-dads-pre-event/scripts/publish-known-vs-anonymous-donor-blog.cjs --rollback`.
- Backups are retained; deletion is outside the approved scope.

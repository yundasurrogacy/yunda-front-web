# GEO 06 Execution and Validation Record

## Outcome

The published CMS article was identified as:

- Route ID: `mhb-new-york-2026-guide-gay-intended-parents`
- Intended URL: `https://www.yundasurrogacy.com/blog/mhb-new-york-2026-guide-gay-intended-parents`
- CMS record ID: `179`

The English title, SEO title, SEO description, and English body were updated and read back successfully from the CMS API. `public/llms.txt` was updated to surface the exact article and preserve the organizer/Silver Sponsor boundary.

## Backup and rollback

- CMS snapshot: `.seo-cache/backups/2026-08-31/geo06-blog-before-20260831-0820/before.json`
- CMS snapshot SHA-256: `53739da724166a3f788da123eaf016b05031aa0c969dcc8723eb8f43716c98e8`
- llms.txt snapshot: `.seo-cache/backups/2026-08-31/geo06-blog-before-20260831-0820/llms.txt.before`
- llms.txt snapshot SHA-256: `edc23c30ab45f39157e8681250ef333eac467b1307324d70d87580639f58cfef`
- CMS rollback: run `node seo-project/campaigns/geo-01-mhb-new-york-2026/tasks/geo-06-gay-men-pre-event/apply-geo06-cms-update.cjs --rollback` from the repository root.
- Git rollback: revert only the GEO 06 commit after it exists; do not reset the dirty worktree.

Backups must be retained because production acceptance is incomplete.

## Content validation

| Check | Result |
|---|---|
| CMS-body H1 | 0; the page template supplies the single visible H1 |
| CMS-body H2/H3 | 12 H2 and 5 FAQ H3 before template enhancement |
| Direct answer | 157 words |
| Body length | 1,479 words |
| Planned internal links | 8/8 present |
| Organizer wording | Men Having Babies organizes the event |
| Yunda relationship | One of the Silver Sponsors; not organizer/co-organizer |
| Medical/legal boundary | Present |
| CMS read-back | Passed |

## Build and local preview

- `npx nuxi cleanup && npx nuxt build`: passed.
- Existing non-blocking warnings: `components/ui/.gitkeep/index` ENOTDIR and outdated Browserslist data.
- Generated target route: present in `.output/public/blog/mhb-new-york-2026-guide-gay-intended-parents/index.html`.
- Rendered HTML: one H1, canonical present, no `noindex`, optimized body visible, CTA present.
- Schema: `BlogPosting` and visible-content `FAQPage` present in the JSON-LD graph.
- Desktop local preview: 1440px test, no horizontal overflow, title and organizer/sponsor copy visible.
- Mobile local preview: mobile breakpoint test, no horizontal overflow, two tables and intended-parent CTA visible.

## Production check

On 2026-08-31, the production URL returned HTTP 404 from the existing Vercel deployment. Response headers showed the deployed artifact predates the CMS article. The CMS publication alone therefore did not create a production frontend route.

This run must push only `develop`. It must not merge/push `main` or trigger production deployment. Production indexability remains pending a separately approved production release.

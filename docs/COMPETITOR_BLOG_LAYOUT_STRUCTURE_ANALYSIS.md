# Competitor Blog Layout Structure Analysis

Date: 2026-07-05

Scope: only page layout, module order, sidebar/footer structure, and reusable blog-page patterns. This document intentionally does not evaluate article copy or topic depth.

Competitor pages reviewed:

- Physician's Surrogacy: https://physicianssurrogacy.com/blog/how-physician-surrogacy-matches-in-one-week/
- Surrogacy4All: https://www.surrogacy4all.com/pre-match-medical-screening-protects-intended-parents/

Local screenshots captured for layout reference:

- `docs/competitor-layout-shots/physicians-top.png`
- `docs/competitor-layout-shots/surrogacy4all-top.png`

## TL;DR

Physician's Surrogacy uses a cleaner sales-enabled blog layout: large article image first, metadata/title, then a two-column reading area with article content on the left and a right rail containing a table of contents plus consultation form. It is built to convert readers while they are reading.

Surrogacy4All uses a more traditional WordPress SEO blog layout: top utility/header/navigation, page title band, breadcrumb, then a main article column plus a 350px sidebar containing search, recent posts, categories, tags, and tools. It has more SEO/internal-linking modules, but the page feels more cluttered.

For Yunda, the best direction is to combine them: use Physician's Surrogacy's clean right-side TOC/CTA pattern, borrow Surrogacy4All's summary/table/author/sidebar ideas selectively, and avoid a noisy WordPress-style sidebar.

## Physician's Surrogacy Layout

URL: https://physicianssurrogacy.com/blog/how-physician-surrogacy-matches-in-one-week/

### Page Skeleton

1. Fixed top header
   - Logo on left.
   - Simple primary navigation on right.
   - Navigation is restrained and does not dominate the article.

2. Reading progress bar
   - DOM includes a fixed `#reading-progress` and `#reading-bar`.
   - This creates a long-form article feel and encourages completion.

3. Breadcrumb
   - Present in DOM before the article.
   - Visually very subtle/mostly hidden in the captured layout.

4. Featured image
   - Large, full-width image inside the article container.
   - Rounded top corners.
   - Image appears before metadata/title, so the visual topic arrives first.

5. Metadata chips
   - Date chip.
   - Category/tag chip.
   - Placed directly under the image and before the H1.

6. H1 title
   - Large article title.
   - Left aligned.
   - Sits above the article intro.

7. Two-column article body
   - Left column: main article content.
   - Right column: conversion/sidebar rail.
   - Underlying grid resembles `col-md-8` + `col-md-4`.

8. Left main content modules
   - Intro paragraphs.
   - Key Takeaways box near the top.
   - H2-based sections.
   - Supporting H3 blocks inside sections.
   - Timeline/process section.
   - FAQ section.
   - Final CTA area before related posts.

9. Right rail modules
   - Table of Contents card.
   - Consultation form card.
   - The right rail appears designed for long-form reading and lead capture.

10. Post-article modules
   - Related Posts section.
   - Footer and extra lead capture/popup modules exist lower in the page.

### Layout Characteristics

- Strong first visual: hero image takes the first meaningful content slot.
- The page is sales-enabled without looking like a landing page.
- TOC is placed in the right rail, not inline at the top.
- Key Takeaways appears early in the content column, helping scanners quickly understand the article.
- Right rail CTA/form is more aggressive than a simple blog sidebar, but because it is visually separated, the article remains readable.
- Decorative background shapes exist behind the content, but the main structure stays clear.

### Strengths To Borrow

- Right-side Table of Contents for long blog pages.
- Sticky/near-sticky consultation form in the right rail.
- Key Takeaways card after the intro.
- Related Posts after the article, not inside the reading flow.
- Reading progress bar for long educational articles.
- Clean header that does not fight the article.

### Weaknesses To Avoid

- The right-side form is long; if copied directly, it can feel heavy.
- Some decorative backgrounds may distract if overused.
- Breadcrumb is present but not very useful visually.
- On content pages, too many popups/newsletter modules can dilute trust.

## Surrogacy4All Layout

URL: https://www.surrogacy4all.com/pre-match-medical-screening-protects-intended-parents/

### Page Skeleton

1. Utility top bar
   - Free consultation text.
   - Phone number.
   - Search.
   - Login/register links.
   - This creates a service/business portal feel before the article begins.

2. Main header/navigation
   - Logo on left.
   - Large multi-level navigation.
   - The navigation is deep and visually heavy.
   - In the captured desktop screenshot, a large dropdown menu appeared open; this should be treated as a navigation behavior artifact, not part of the normal article body.

3. Page title band
   - Teal horizontal title area.
   - H1 appears in this page-header band.
   - Unlike Physician's Surrogacy, the title arrives before the featured image.

4. Breadcrumb
   - Visible breadcrumb under the title band.
   - Repeats the site path: Home > Blog > article title.

5. Two-column blog container
   - Main content column.
   - Right sidebar column.
   - CSS indicates the sidebar is fixed at 350px:
     - `.post-secondary-blog { flex: 0 0 350px; max-width: 350px; }`
     - `.post-primary-blog { flex: 0 0 calc(100% - 350px); max-width: calc(100% - 350px); }`
   - Mobile collapses both columns to 100% width.

6. Main article column
   - Metadata: posted date and author.
   - Featured image.
   - AI Smart Summary block.
   - Key Takeaways block.
   - H2 sections.
   - Comparison table inside the body.
   - CTA section inside/near the end of the article.
   - Author profile box.
   - Related posts tab/list attached to author module.
   - Tags area.

7. Right sidebar modules
   - Search widget.
   - Recent Posts.
   - Categories.
   - Tags/tag cloud.
   - BMI calculator/tool module.
   - Additional widgets may appear lower depending on scroll.

8. Footer modules
   - Large CTA band: begin your journey.
   - Multi-column footer with sections such as Important Info, Services, Get In Touch.
   - Newsletter/eBook subscription module.

### Layout Characteristics

- This is a classic SEO blog layout with many internal-linking widgets.
- The article is not as visually polished, but it is dense with navigation paths.
- Sidebar is more editorial/SEO-oriented than conversion-oriented.
- The page uses multiple trust/authority modules: author, related posts, categories, tags, tools.
- The H1/title band and breadcrumb make the page feel more like a CMS template than a custom article experience.

### Strengths To Borrow

- Visible breadcrumb for orientation.
- AI/quick summary block near the top, if styled professionally.
- Key Takeaways early in the article.
- Tables in the article body for comparison-style explanations.
- Author profile after the article for trust.
- Recent/related posts for internal linking.
- Calculator/tool widgets can be powerful when directly relevant.

### Weaknesses To Avoid

- Header/navigation is too heavy for a focused blog reading experience.
- Sidebar has too many generic WordPress widgets.
- Tag cloud can feel dated and noisy.
- Search/recent/categories/tags stacked together compete with the article.
- Footer and post-article modules are dense; users may feel the page is assembled from plugins.

## Side-By-Side Structural Comparison

| Area | Physician's Surrogacy | Surrogacy4All | Better Direction For Yunda |
|---|---|---|---|
| Header | Simple fixed header | Heavy utility bar + deep nav | Keep Yunda header light on blog pages |
| First visual | Featured image first | Title band first, image later | Use strong article image near top |
| Title placement | Under image/meta | In page-header band | Prefer image/meta/title if article needs emotional trust |
| Breadcrumb | Present but subtle | Visible | Use visible but quiet breadcrumb |
| Article layout | Main content + right TOC/form | Main content + 350px widget sidebar | Main content + useful right rail |
| Right rail | TOC + consultation form | Search/recent/categories/tags/tools | TOC + CTA + related posts, avoid generic clutter |
| Summary module | Key Takeaways | AI Smart Summary + Key Takeaways | Use one clean Quick Summary + Key Takeaways pattern |
| Tables | Used where needed | Comparison table prominent | Support tables in rich text and style them well |
| Author/trust | Author appears lower/sidebar | Author profile box after article | Add compact reviewed/author block |
| Internal linking | Related Posts after article | Sidebar + related posts + categories/tags | Add related posts, skip tag cloud |
| Conversion | Strong form in right rail | CTA near article/footer | Use softer right rail CTA plus final CTA |
| Footer | Standard/footer CTA modules | Large multi-section footer | Keep existing footer, add article-specific CTA before footer |

## Recommended Yunda Blog Layout

### Desktop Structure

1. Header
   - Keep existing site header.
   - Avoid large dropdowns or extra utility bars on article pages.

2. Breadcrumb row
   - Home > Blog > Current article.
   - Small, quiet, but visible.

3. Article top
   - Featured image.
   - Date/category/reading-time chips.
   - H1 article title.
   - Short excerpt or intro.

4. Main article grid
   - Left: article body, approximately 680-760px reading width.
   - Right: 280-340px rail.

5. Right rail
   - Table of Contents.
   - Primary CTA: Free consultation / speak with coordinator.
   - Optional related article list.
   - Optional trust mini-card: experience, location, multilingual support.

6. Article body modules
   - Quick Answer or AI-style Summary.
   - Key Takeaways.
   - H2/H3 sections.
   - Comparison table support.
   - Checklist/process/timeline blocks when useful.
   - FAQ.
   - Final CTA block.

7. Post-article
   - Author/reviewer card.
   - Related posts.
   - Footer.

### Mobile Structure

1. Header.
2. Breadcrumb.
3. Featured image.
4. Metadata + title.
5. Quick Summary / Key Takeaways.
6. Collapsible Table of Contents.
7. Article body.
8. Inline CTA after the first third of content.
9. FAQ.
10. Final CTA.
11. Author/reviewer.
12. Related posts.

Do not place a long form before the user has read meaningful content on mobile.

## Practical Implementation Notes For Yunda

1. Rich text editor
   - Keep support for tables, lists, blockquotes, images, and pasted rich text.
   - Tables matter because both competitors use comparison/table-style layouts for SEO education.

2. Blog renderer
   - Add first-class styling for:
     - `table`, `thead`, `tbody`, `th`, `td`
     - `blockquote`
     - `figure`, `figcaption`
     - `ul`, `ol`, `li`
     - `h2`, `h3`, `h4`
   - Avoid excessive paragraph spacing from pasted content.

3. Blog page template
   - Add a right rail for desktop.
   - Generate Table of Contents from H2/H3 headings if possible.
   - Keep right rail sticky only after enough top offset so it does not collide with the header.

4. Conversion modules
   - Use a compact CTA card rather than a full long form in the right rail.
   - Put full lead form on a dedicated contact/consultation page or in a modal if needed.

5. SEO/trust modules
   - Add author/reviewer card below article.
   - Add related posts below article.
   - Add FAQ support and FAQ schema later if the content includes FAQs.

## Proposed Yunda Article Template

```text
Header
Breadcrumb
Featured Image
Date / Category / Reading Time
H1
Intro

Main Grid
  Left Column
    Quick Summary
    Key Takeaways
    Body H2/H3 sections
    Tables / checklists / timelines as needed
    FAQ
    Final CTA
    Author or Reviewed By
    Related Posts

  Right Rail
    Table of Contents
    Consultation CTA
    Related Guides
    Trust Mini Card

Footer
```

## Priority Recommendation

For the next Yunda blog-page iteration, prioritize these structural changes:

1. Add desktop right rail with generated Table of Contents.
2. Add compact consultation CTA in that rail.
3. Add standardized Quick Summary and Key Takeaways styling.
4. Add post-article Author/Reviewed By and Related Posts.
5. Keep sidebar clean; do not copy Surrogacy4All's full search/categories/tag-cloud stack.


# Yunda SEO Development Instructions

## Authoritative SEO workflow

For all SEO-related research, planning, content, design, implementation, release,
and reporting work in this repository, use the following document as the
authoritative workflow:

- `/Users/qianwenyi/Desktop/SEO-Workflow-SOP.md`

Last synchronized source:

- SOP source modified: `2026-07-15 10:20:51` (Asia/Shanghai project context)
- SOP SHA-256:
  `6d966d5781657919c3f8f1d12da777490c40c7f457c2378fce57babf89f43ba7`
- Agent synchronization date: `2026-07-23`

Read the relevant stage and its acceptance criteria before starting material
SEO work. If these instructions conflict with an ad hoc implementation choice,
follow the SOP unless the user explicitly overrides it.

## Core operating principles

- Understand the business before researching search demand.
- Record a measurable baseline before optimization.
- Fix crawlability, indexability, and other critical technical issues before
  scaling content production.
- Support conclusions with data, URLs, SERP evidence, or attributable sources.
- Optimize for qualified inquiries, opportunities, and revenue rather than
  traffic alone.
- Keep facts and analytical inferences clearly separated.
- Record collection dates for crawls, APIs, SERPs, rankings, backlinks, and
  other external data; preserve old snapshots.
- Do not promise fixed rankings or guaranteed SEO outcomes.

## Brand naming standard

- The canonical public brand name is `Yunda Surrogacy`.
- For all future keyword research, page copy, metadata, Schema text, machine-readable website documents, GEO assets, and campaign deliverables, write the full brand name `Yunda Surrogacy` instead of using `Yunda` as a standalone brand shorthand.
- Keep `Yunda` alone only when it is part of a verified third-party proper name, an existing URL/path, a code identifier, a file name, a customer quote, or a historical evidence snapshot that must remain verbatim. Do not introduce new standalone `Yunda` brand wording.
- In Chinese copy, use `Yunda Surrogacy（孕达代孕）` when an English brand anchor is useful; keep the English brand name in machine-readable and entity-facing fields.

## Required stage order

Use this sequence unless the user narrows the task to a specific stage:

1. Project kickoff, scope, permissions, and KPIs.
2. Product, customer, market, positioning, and proof research.
3. Direct, indirect, search, and content competitor research.
4. Analytics, search, conversion, CRM, CWV, backlink, and brand baseline.
5. Full-site technical, on-page, content, schema, performance, visual, and GEO
   audit.
6. Keyword, live SERP, search-intent, clustering, and commercial-priority
   research.
7. Site architecture, URL map, keyword-to-page map, internal links, schema, and
   sitemap planning.
8. SEO strategy, 90-day roadmap, ownership, dependencies, and content calendar.
9. Technical remediation, pre-release validation, post-release recrawl, and SEO
   drift baseline.
10. Content briefs, expert review, SEO review, conversion review, publishing,
    indexing, monitoring, and updates.
11. Authority, backlinks, brand/entity consistency, GEO, reporting, and ongoing
    iteration.

## Codex run protocol

For every SEO-related request:

1. Classify the request into the applicable SOP stage or stages.
2. Read the relevant SOP section, acceptance criteria, recommended skills, and
   existing project context before making material changes.
3. Check the applicable gate and list any missing input, permission, baseline,
   evidence, dependency, or approval.
4. If the task is safely scoped and the missing information does not change the
   intended outcome, proceed with explicit assumptions and document the
   limitation. Do not invent customer facts, analytics, rankings, backlinks,
   testimonials, credentials, approvals, or measurement results.
5. Use the smallest relevant set of project skills. For work that depends on
   current SERPs, laws, platform behavior, competitor pages, prices, rankings,
   backlinks, or other changing external facts, collect current evidence and
   record its date.
6. Produce or update the stage deliverable, not only an informal explanation.
   Preserve raw evidence and prior snapshots.
7. Validate the deliverable against the SOP acceptance criteria and applicable
   release checks.
8. Hand off the result with changed files, evidence, validation performed,
   unresolved risks, blockers, and the next eligible SOP stage.

A narrowly scoped user request does not require rerunning the entire lifecycle.
Apply the relevant stage and gate while recording unavailable upstream context.
Do not silently expand a diagnostic or reporting request into deployment,
publishing, outreach, link acquisition, or changes to external systems.

## Mandatory stage-start approval

Before executing any SOP stage, enter a preparation-only state first. In this
state, Codex must:

1. Identify the current SOP stage and applicable gate.
2. Inventory and organize the existing documents, evidence, prior deliverables,
   and relevant project context.
3. List missing information, permissions, dependencies, risks, and assumptions.
4. Define the intended stage deliverables, acceptance criteria, validation
   method, and files likely to be affected.
5. Present the ordered next actions for the stage.

Preparation does not authorize optimization. During this state, Codex may
perform read-only inspection and may organize or update planning/status
documentation, but must not begin the stage's optimization work. In particular,
do not change production code, page copy, metadata, schema, URLs, internal
links, tracking configuration, content, design, sitemaps, robots directives, or
external systems.

After presenting the preparation summary and next actions, stop and wait for
the user to explicitly enter:

`开始优化`

Only that approval starts execution of the prepared SOP stage. Approval applies
only to the currently prepared stage and its stated scope. Before moving to a
new SOP stage, repeat the preparation process and wait for a new `开始优化`
approval. If the scope, affected files, or intended outcome changes materially
during execution, pause, update the preparation summary, and request
`开始优化` again.

## Stage gates

Do not bypass these gates for speed:

### Gate 1 — strategy planning

Proceed only after product context, target market, business goals, core
competitors, and the data baseline or its documented limitations are clear.

### Gate 2 — page and content development

Proceed only after critical crawl/index issues have a resolution, keyword and
intent mapping is complete, site architecture is approved, and the content
approval/publishing process is defined.

### Gate 3 — scaled production

Proceed only after the first pages index correctly, templates and conversion
tracking pass validation, severe cannibalization is absent, and the team can
review and maintain the output.

### Gate 4 — increased link-building or budget

Proceed only after core commercial pages meet quality standards, target topic
clusters exist, destination URLs are stable, and brand/traffic/conversion impact
can be measured.

## Development ticket requirements

Every material SEO implementation ticket should identify:

- the problem and affected URLs or templates;
- reproduction steps and evidence;
- SEO and business impact;
- priority: Critical, High, Medium, or Low;
- recommended implementation;
- dependencies, owner, and due date when applicable;
- acceptance test and rollback approach.

Critical issues block crawling/indexing or cause major errors and should be
handled immediately. High issues materially affect ranking or core conversion
and should normally be addressed within one to two weeks.

## Release requirements

Before release, validate the change in a test environment where available and
check robots directives, `noindex`, canonicals, status codes, redirects, schema,
mobile behavior, CWV risk, analytics events, and new-versus-old crawl
differences.

After release, recrawl affected pages, inspect indexability and logs where
available, update and submit sitemaps when necessary, re-test conversions, and
record evidence of the before/after state. A fix is not complete if it creates a
new crawl, indexation, rendering, schema, performance, or conversion problem.

## Page and content requirements

Each important page must have a defined URL, page type, primary and secondary
query cluster, search intent, audience, CTA, contextual internal links, schema
type, owner, and status.

Do not create one page per keyword variation. Use live SERP overlap to decide
clusters and assign one primary page per intent. Programmatic or location pages
must provide meaningful unique value. Important pages must not be orphaned or
unnecessarily deep.

Every content brief must define the page task, audience, intent, outline,
questions, differentiating evidence, product/case inputs, internal links,
visuals or tools, schema, CTA, and sources. Published content must be accurate,
expert-reviewed when appropriate, useful beyond word count, mobile-safe,
internally linked, indexable, and monitored.

## Trust, compliance, links, and GEO

- Use real authors, reviewers, experience, sources, qualifications, cases, and
  update dates; never fabricate proof.
- Preserve Yunda Surrogacy's existing compliance positioning: it provides education,
  coordination, and case-management support and is not a law firm, medical
  provider, IVF clinic, insurance company, or escrow company.
- Do not guarantee legal, medical, insurance, payment, qualification, matching,
  pregnancy, or ranking outcomes.
- Do not buy bulk low-quality links or use irrelevant directories/link networks.
- Treat `llms.txt` as one GEO aid, not a complete GEO strategy.
- Prefer clear, attributable, evidence-rich passages that are useful to people
  and can be cited accurately by search and AI systems.

## Measurement and reporting

Prioritize business KPIs first: qualified SEO inquiries, MQLs, SQLs, pipeline or
revenue, cost per qualified lead, and organic conversion rate. Then evaluate
non-brand clicks, commercial-page performance, target-topic ranking coverage,
CTR, indexation, CWV, qualified referring domains, brand mentions, and AI search
visibility.

Report causes, actions, uncertainties, and next steps—not charts alone. Separate
seasonality, campaigns, algorithm changes, and implementation effects. Monitor
critical/indexing/drift issues weekly, review performance monthly, and reassess
competitors, cannibalization, decay, architecture, internal links, priorities,
and budget quarterly.

## SEO artifact routing

When the repository contains or adopts a dedicated `seo-project/` workspace,
route durable deliverables according to the SOP:

- `00-brief/`: project brief and product-marketing context.
- `01-research/`: customer, competitor, keyword, SERP, and market research.
- `02-baseline/`: SEO baseline, tracking plan, attribution definitions, and
  dated source snapshots.
- `03-audit/`: full audit, evidence, health score, and issue register.
- `04-strategy/`: strategy, site structure, keyword-to-page map, content
  calendar, and implementation roadmap.
- `05-content/`: briefs, drafts, publication records, inventories, and update
  dates.
- `06-technical/`: implementation tickets and pre/post-release checks.
- `07-authority/`: backlink, brand mention, partner, and digital PR records.
- `08-reporting/`: weekly, monthly, and quarterly reports.

Do not overwrite raw crawl or external API snapshots. Include a collection date
in the file name or metadata. Each task has one directly responsible owner,
although it may have multiple collaborators.

## Existing project context

Also consult the repository's `seo-project/` workspace when relevant,
especially:

- `seo-project/README.md`
- `seo-project/00-brief/PROJECT-BRIEF.md`
- `seo-project/00-brief/product-marketing.md`
- `seo-project/04-strategy/SITE-STRUCTURE.md`
- `seo-project/03-audit/reports/2026-06-18-ai-seo-current-state-and-fixes.md`
- `seo-project/03-audit/issues/2026-06-17-schema-audit-issues.md`

Preserve user changes and reconcile new work with these documents rather than
silently replacing their conclusions.

## Report commit policy

- Do not stage or commit generated research, audit, analysis, validation,
  optimization, or reporting documents.
- GEO-specific content and GEO deliverables are the only exception and may be
  committed when they are part of the requested scope.
- Keep all non-GEO reports local unless the user explicitly overrides this
  policy for a specific file.

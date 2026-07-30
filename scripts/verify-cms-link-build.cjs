#!/usr/bin/env node
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const ROOT = process.cwd()
const OUTPUT = path.join(ROOT, '.output', 'public')
const PLAN_PATH = path.join(ROOT, 'seo-project', '06-technical', 'release-checks', '2026-07-29-cms-link-cleanup-plan.json')
const EVIDENCE_PATH = path.join(ROOT, 'seo-project', '06-technical', 'release-checks', '2026-07-29-cms-link-build-verification.json')
const ZH_SITEMAP_PATH = path.join(OUTPUT, 'sitemap-zh.xml')
const SITE_ORIGIN = 'https://www.yundasurrogacy.com'

function normalizePathname(value) {
  if (!value)
    return '/'
  const withLeadingSlash = value.startsWith('/') ? value : `/${value}`
  return withLeadingSlash.length > 1 ? withLeadingSlash.replace(/\/+$/, '') : withLeadingSlash
}

function decodeHref(value) {
  return String(value).replace(/&amp;/gi, '&')
}

function extractHrefs(html) {
  return [...String(html).matchAll(/<a\b[^>]*\shref\s*=\s*(["'])(.*?)\1/gi)]
    .map(match => decodeHref(match[2]).trim())
}

function htmlPath(route) {
  const clean = normalizePathname(route)
  return clean === '/'
    ? path.join(OUTPUT, 'index.html')
    : path.join(OUTPUT, clean.replace(/^\/+/, ''), 'index.html')
}

function blogPagePath(routeId, field) {
  const prefix = field === 'content' ? '/zh/blog' : '/blog'
  return htmlPath(`${prefix}/${routeId}`)
}

function hasNoindex(html) {
  return /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)
}

function canonicalFromHtml(html) {
  return html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)/i)?.[1] || ''
}

function parseJsonLd(html, source, failures) {
  const blocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  for (let index = 0; index < blocks.length; index++) {
    try {
      JSON.parse(blocks[index][1])
    }
    catch (error) {
      failures.push(`${source}: JSON-LD block ${index + 1} failed to parse: ${error.message}`)
    }
  }
  return blocks.length
}

function main() {
  const plan = JSON.parse(fs.readFileSync(PLAN_PATH, 'utf8'))
  const zhXml = fs.readFileSync(ZH_SITEMAP_PATH, 'utf8')
  const zhIndexablePaths = new Set(
    [...zhXml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map(match => normalizePathname(new URL(match[1]).pathname)),
  )
  const failures = []
  let verifiedHrefChanges = 0
  let missingPlannedHrefs = 0
  let jsonLdBlocks = 0
  const checkedFiles = new Set()

  for (const record of plan.changes) {
    for (const [field, change] of Object.entries(record.fields)) {
      const file = blogPagePath(record.route_id, field)
      if (!fs.existsSync(file)) {
        failures.push(`${record.route_id}/${field}: generated HTML missing`)
        continue
      }
      const html = fs.readFileSync(file, 'utf8')
      const hrefs = extractHrefs(html)
      for (const link of change.link_changes) {
        const expected = decodeHref(link.to)
        if (!hrefs.includes(expected))
          missingPlannedHrefs++
        if (!hrefs.includes(expected))
          failures.push(`${record.route_id}/${field}: generated HTML missing expected href ${expected}`)
        else
          verifiedHrefChanges++
      }
      checkedFiles.add(file)
    }
  }

  const zhBlogUrls = [...zhIndexablePaths].filter(route => route.startsWith('/zh/blog/'))
  for (const route of zhBlogUrls) {
    const file = htmlPath(route)
    if (!fs.existsSync(file)) {
      failures.push(`${route}: generated HTML missing`)
      continue
    }
    const html = fs.readFileSync(file, 'utf8')
    const expectedCanonical = `${SITE_ORIGIN}${route}`
    if (canonicalFromHtml(html) !== expectedCanonical)
      failures.push(`${route}: canonical mismatch`)
    if (hasNoindex(html))
      failures.push(`${route}: unexpectedly noindexed`)
  }

  const allBlogHtml = [
    ...fs.readdirSync(path.join(OUTPUT, 'blog'), { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => path.join(OUTPUT, 'blog', entry.name, 'index.html')),
    ...zhBlogUrls.map(htmlPath),
  ].filter(file => fs.existsSync(file))
  for (const file of allBlogHtml)
    jsonLdBlocks += parseJsonLd(fs.readFileSync(file, 'utf8'), path.relative(OUTPUT, file), failures)

  const legacyPaths = [
    '/become-a-surrogate-mother',
    '/surrogate-journey',
    '/surrogacy-price',
    '/become-a-surrogay-mother',
    '/surrogate-qualification',
    '/about）',
  ]
  let legacyHrefResidue = 0
  for (const file of allBlogHtml) {
    for (const href of extractHrefs(fs.readFileSync(file, 'utf8'))) {
      let parsed
      try {
        parsed = new URL(href, SITE_ORIGIN)
      }
      catch {
        continue
      }
      if (!['www.yundasurrogacy.com', 'yundasurrogacy.com'].includes(parsed.hostname))
        continue
      const pathname = normalizePathname(decodeURIComponent(parsed.pathname))
      if (legacyPaths.includes(pathname))
        legacyHrefResidue++
    }
  }
  if (legacyHrefResidue)
    failures.push(`${legacyHrefResidue} rendered legacy href(s) remain`)

  const changedTargets = new Set()
  for (const record of plan.changes) {
    for (const field of Object.values(record.fields)) {
      for (const link of field.link_changes) {
        const parsed = new URL(decodeHref(link.to), SITE_ORIGIN)
        changedTargets.add(normalizePathname(parsed.pathname))
      }
    }
  }
  const missingTargets = [...changedTargets].filter(route => !fs.existsSync(htmlPath(route)))
  if (missingTargets.length)
    failures.push(`Generated targets missing: ${missingTargets.join(', ')}`)

  const evidence = {
    verification_type: 'cms-internal-link-static-build',
    verified_at: new Date().toISOString(),
    plan_sha256: plan.plan_sha256,
    generated_blog_pages_checked: allBlogHtml.length,
    changed_source_files_checked: checkedFiles.size,
    planned_href_changes: plan.changed_links,
    verified_href_changes: verifiedHrefChanges,
    missing_planned_hrefs: missingPlannedHrefs,
    indexable_zh_blog_pages: zhBlogUrls.length,
    json_ld_blocks_parsed: jsonLdBlocks,
    legacy_href_residue: legacyHrefResidue,
    changed_targets_checked: changedTargets.size,
    missing_changed_targets: missingTargets,
    failures,
  }
  fs.writeFileSync(EVIDENCE_PATH, `${JSON.stringify(evidence, null, 2)}\n`, 'utf8')
  if (failures.length) {
    console.error(failures.join('\n'))
    process.exit(1)
  }
  console.log(`Static build verification passed: ${allBlogHtml.length} blog pages, ${verifiedHrefChanges}/${plan.changed_links} planned hrefs rendered.`)
  console.log(`JSON-LD parsed: ${jsonLdBlocks} blocks; legacy href residue: 0.`)
}

main()

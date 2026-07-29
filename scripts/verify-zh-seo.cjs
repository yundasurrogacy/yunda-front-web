#!/usr/bin/env node
/**
 * verify-zh-seo.cjs
 *
 * Post-deploy verification for the A1 (soft 404) and A2 (Chinese blog
 * localization) fixes. Run against a Vercel preview URL before promoting to
 * production, then again against production after release.
 *
 * Usage:
 *   node scripts/verify-zh-seo.cjs
 *   node scripts/verify-zh-seo.cjs --base https://my-preview.vercel.app
 *   node scripts/verify-zh-seo.cjs --sample 10   # limit per-group sampling
 *
 * Exits non-zero if any check fails, so it can gate a deploy pipeline.
 *
 * Checks:
 *   1. Non-existent paths return HTTP 404 (not 200 + SPA shell).
 *   2. Real pages still return HTTP 200 (regression guard for check 1).
 *   3. Blog posts with no Chinese body 302-redirect /zh/blog/x -> /blog/x.
 *   4. Blog posts WITH Chinese content are neither redirected nor noindexed.
 *      This is the most important regression guard: over-applying the fix
 *      would suppress 42 pages that are currently healthy.
 *   5. sitemap-zh.xml excludes the Chinese-missing URLs.
 *   6. sitemap-en.xml omits the zh-CN hreflang for Chinese-missing posts.
 */
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const args = process.argv.slice(2)
function argValue(flag, fallback) {
  const i = args.indexOf(flag)
  return i !== -1 && args[i + 1] ? args[i + 1] : fallback
}

const BASE = argValue('--base', process.env.VERIFY_BASE_URL || 'https://www.yundasurrogacy.com')
  .replace(/\/+$/, '')
const sampleArg = Number.parseInt(argValue('--sample', '0'), 10)
const SAMPLE = Number.isInteger(sampleArg) && sampleArg > 0 ? sampleArg : Number.POSITIVE_INFINITY
const CONCURRENCY = 6
const TIMEOUT_MS = 30000

const ZH_MISSING_PATH = path.join(process.cwd(), 'data', 'zh-missing-blogs.json')

const results = []
function record(group, ok, detail) {
  results.push({ group, ok, detail })
  if (!ok)
    console.error(`  FAIL  ${detail}`)
}

async function fetchOnce(url, { redirect = 'manual' } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  try {
    const res = await fetch(url, {
      redirect,
      signal: controller.signal,
      headers: { 'User-Agent': 'YundaSeoVerifier/1.0' },
    })
    const body = res.status === 200 || redirect === 'follow' ? await res.text() : ''
    return { status: res.status, location: res.headers.get('location'), body }
  }
  finally {
    clearTimeout(timer)
  }
}

async function mapLimit(items, limit, fn) {
  const out = []
  let cursor = 0
  const workers = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++
      out[index] = await fn(items[index], index)
    }
  })
  await Promise.all(workers)
  return out
}

function hasNoindex(html) {
  return /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)
}

async function checkSoft404() {
  console.log('\n[1] Non-existent paths must return 404')
  const paths = [
    '/this-page-does-not-exist-verify123',
    '/blog/nonexistent-slug-verify123',
    '/zh/fake-page-verify123',
    '/zh/blog/nonexistent-slug-verify123',
  ]
  await mapLimit(paths, CONCURRENCY, async (p) => {
    const { status } = await fetchOnce(BASE + p)
    record('soft404', status === 404, `${p} returned ${status}, expected 404`)
    if (status === 404)
      console.log(`  ok    ${p} -> 404`)
  })
}

async function checkRealPages() {
  console.log('\n[2] Real pages must still return 200')
  const paths = ['/', '/zh', '/about', '/surrogacy-cost', '/zh/surrogacy-cost', '/blog', '/zh/blog', '/sitemap']
  await mapLimit(paths, CONCURRENCY, async (p) => {
    const { status } = await fetchOnce(BASE + p, { redirect: 'follow' })
    record('realPages', status === 200, `${p} returned ${status}, expected 200`)
    if (status === 200)
      console.log(`  ok    ${p} -> 200`)
  })
}

async function checkZhMissingRedirect(missingRoutes) {
  console.log(`\n[3] Chinese-missing posts must temporarily redirect to English (checking ${Math.min(SAMPLE, missingRoutes.length)} of ${missingRoutes.length})`)
  const sample = missingRoutes.slice(0, SAMPLE)
  await mapLimit(sample, CONCURRENCY, async (route) => {
    const { status, location } = await fetchOnce(BASE + route)
    const expected = route.replace(/^\/zh/, '')
    const redirectOk = (status === 302 || status === 307) && (location || '').replace(BASE, '') === expected
    record('zhRedirect', redirectOk, `${route} -> ${status} ${location || '(no location)'}, expected temporary redirect -> ${expected}`)
    if (redirectOk)
      console.log(`  ok    ${route} -> ${status} -> ${expected}`)
  })
}

/**
 * Vercel redirect sources are written without a trailing slash. Vercel normally
 * normalises the incoming path, but that is not something to assume: if the
 * slashed form slips past the redirect it would serve the prerendered
 * placeholder page instead. It still carries noindex, so this is a hygiene
 * check rather than an indexing risk — reported as a warning, not a failure.
 */
async function checkTrailingSlash(missingRoutes) {
  const sample = missingRoutes.slice(0, Math.min(4, missingRoutes.length))
  if (!sample.length)
    return
  console.log(`\n[3b] Trailing-slash form should behave the same (sampling ${sample.length})`)
  await mapLimit(sample, CONCURRENCY, async (route) => {
    const { status, location } = await fetchOnce(`${BASE}${route}/`)
    const redirected = status === 301 || status === 302 || status === 307 || status === 308
    if (redirected) {
      console.log(`  ok    ${route}/ -> ${status} -> ${(location || '').replace(BASE, '')}`)
      return
    }
    // Not a failure: the prerendered page still carries noindex.
    console.warn(`  warn  ${route}/ -> ${status} (redirect did not match the slashed form; page-level noindex still applies)`)
  })
}

async function checkZhPresentUntouched(presentRoutes) {
  console.log(`\n[4] Posts WITH Chinese content must be indexable (sampling ${Math.min(SAMPLE, presentRoutes.length)} of ${presentRoutes.length})`)
  const sample = presentRoutes.slice(0, SAMPLE)
  await mapLimit(sample, CONCURRENCY, async (route) => {
    const { status, location } = await fetchOnce(BASE + route)
    if (status !== 200) {
      record('zhPresent', false, `${route} returned ${status} ${location || ''}, expected 200 (must NOT be redirected)`)
      return
    }
    const { body } = await fetchOnce(BASE + route, { redirect: 'follow' })
    if (hasNoindex(body)) {
      record('zhPresent', false, `${route} carries noindex but has Chinese content`)
      return
    }
    record('zhPresent', true, '')
    console.log(`  ok    ${route} -> 200, indexable`)
  })
}

async function checkSitemaps(missingRoutes) {
  console.log('\n[5] sitemap-zh.xml must exclude Chinese-missing URLs')
  const { body: zhXml } = await fetchOnce(`${BASE}/sitemap-zh.xml`, { redirect: 'follow' })
  const leaked = missingRoutes.filter(r => zhXml.includes(`<loc>${BASE}${r}</loc>`))
  record('sitemapZh', leaked.length === 0, `sitemap-zh.xml still lists ${leaked.length} Chinese-missing URL(s), e.g. ${leaked[0] || ''}`)
  if (leaked.length === 0)
    console.log(`  ok    none of ${missingRoutes.length} Chinese-missing URLs present`)

  console.log('\n[6] sitemap-en.xml must omit zh-CN hreflang for those posts')
  const { body: enXml } = await fetchOnce(`${BASE}/sitemap-en.xml`, { redirect: 'follow' })
  const blocks = enXml.split('<url>').slice(1)
  let conflicts = 0
  for (const route of missingRoutes) {
    const enLoc = `${BASE}${route.replace(/^\/zh/, '')}`
    const block = blocks.find(b => b.includes(`<loc>${enLoc}</loc>`))
    if (block && block.includes('hreflang="zh-CN"'))
      conflicts++
  }
  record('hreflang', conflicts === 0, `${conflicts} English entr(ies) still declare a zh-CN alternate pointing at a redirected URL`)
  if (conflicts === 0)
    console.log(`  ok    no zh-CN alternate declared for Chinese-missing posts`)
}

/**
 * The hand-written 301s: three previously-indexed soft-404 URLs, and the two
 * legacy colon slugs that were renamed in the CMS. Each must land on a real
 * page, not another redirect and not the 404 shell.
 */
async function checkHandWritten301s() {
  console.log('\n[7] Hand-written 301s must resolve to a real page')
  const cases = [
    ['/surrogacy-process-1', '/surrogacy-process'],
    ['/compensation-benefits-for-surrogates', '/surrogate-compensation'],
    ['/zh/be-surrogate-v2/_/useBeSurrogateV2Storage', '/zh/be-surrogate'],
    ['/services', '/intended-parents'],
    ['/zh/services', '/zh/intended-parents'],
    ['/blog/Gestational-Surrogacy-Process-2025:-Step-by-Step-Guide-with-Yunda', '/blog/Gestational-Surrogacy-Process-2025-Step-by-Step-Guide-with-Yunda'],
    ['/blog/Surrogacy-cost-in-Los-Angeles:-full-cost-breakdown-of-Agency-Fees', '/blog/Surrogacy-cost-in-Los-Angeles-full-cost-breakdown-of-Agency-Fees'],
  ]
  await mapLimit(cases, CONCURRENCY, async ([from, expected]) => {
    const { status, location } = await fetchOnce(BASE + from)
    if (status !== 301) {
      record('handWritten301', false, `${from} returned ${status}, expected 301`)
      return
    }
    // Vercel may append an unused named capture as a query param; ignore it.
    const landed = (location || '').replace(BASE, '').split('?')[0]
    if (landed !== expected) {
      record('handWritten301', false, `${from} -> ${landed}, expected ${expected}`)
      return
    }
    // Confirm the destination is a real page, not the SPA 404 shell.
    const final = await fetchOnce(BASE + expected, { redirect: 'follow' })
    const isShell = final.body.length < 12000
    record('handWritten301', !isShell, `${from} lands on ${expected} but it looks like the 404 shell (${final.body.length} bytes)`)
    if (!isShell)
      console.log(`  ok    ${from.slice(0, 52)} -> 301 -> ${expected.slice(0, 46)}`)
  })
}

async function main() {
  console.log(`Verifying ${BASE}`)

  if (!fs.existsSync(ZH_MISSING_PATH)) {
    console.error(`\nMissing ${ZH_MISSING_PATH}. Run "npm run sitemap:xml" first.`)
    process.exit(1)
  }
  const manifest = JSON.parse(fs.readFileSync(ZH_MISSING_PATH, 'utf8'))
  const missingRoutes = manifest.routes || []
  if (manifest.signalReliable === false) {
    console.error('\nManifest reports signalReliable: false (blog API failed during generation). Aborting.')
    process.exit(1)
  }

  // Derive the "has Chinese content" set from the zh sitemap itself.
  const { body: zhXml } = await fetchOnce(`${BASE}/sitemap-zh.xml`, { redirect: 'follow' })
  const presentRoutes = [...zhXml.matchAll(/<loc>[^<]*?(\/zh\/blog\/[^<]+)<\/loc>/g)].map(m => m[1])

  await checkSoft404()
  await checkRealPages()
  if (missingRoutes.length) {
    await checkZhMissingRedirect(missingRoutes)
    await checkTrailingSlash(missingRoutes)
  }
  if (presentRoutes.length)
    await checkZhPresentUntouched(presentRoutes)
  await checkSitemaps(missingRoutes)
  await checkHandWritten301s()

  const failures = results.filter(r => !r.ok)
  const byGroup = {}
  for (const r of results) {
    byGroup[r.group] = byGroup[r.group] || { pass: 0, fail: 0 }
    byGroup[r.group][r.ok ? 'pass' : 'fail']++
  }
  console.log('\n--- Summary ---')
  for (const [group, counts] of Object.entries(byGroup))
    console.log(`  ${group}: ${counts.pass} passed, ${counts.fail} failed`)

  if (failures.length) {
    console.error(`\n${failures.length} check(s) FAILED. Do not promote this deploy.`)
    process.exit(1)
  }
  console.log('\nAll checks passed.')
}

main().catch((error) => {
  console.error('Verifier crashed:', error)
  process.exit(1)
})

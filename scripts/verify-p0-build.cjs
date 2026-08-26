#!/usr/bin/env node
/**
 * Verify the generated static artifacts for the two P0 SEO fixes.
 *
 * This runs after cleanup-200.cjs and blocks a build when:
 * - the SPA 200 fallback remains or 404.html is missing/noindex-free;
 * - Chinese-missing routes disagree across the manifest, redirects, sitemaps,
 *   hreflang, or prerendered output;
 * - a valid Chinese blog route is accidentally suppressed.
 */
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const ROOT = process.cwd()
const OUTPUT_DIR = path.join(ROOT, '.output', 'public')
const MANIFEST_PATH = path.join(ROOT, 'data', 'zh-missing-blogs.json')
const LEDGER_PATH = path.join(ROOT, 'data', 'vercel-managed-zh-redirects.json')
const VERCEL_PATH = path.join(ROOT, 'vercel.json')
const isNoindexPreview = process.env.VERCEL_ENV === 'preview'
  || process.env.NUXT_PREVIEW_NOINDEX === '1'

let failures = 0

function pass(message) {
  console.warn(`[verify-p0] ok: ${message}`)
}

function fail(message) {
  failures++
  console.error(`[verify-p0] FAIL: ${message}`)
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, 'utf8'))
}

function routeHtmlPath(route) {
  return path.join(OUTPUT_DIR, route.replace(/^\/+/, ''), 'index.html')
}

function hasNoindex(html) {
  return /<meta[^>]+name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html)
}

function locsFromXml(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match =>
    match[1]
      .replace(/&amp;/g, '&')
      .replace(/&apos;/g, '\'')
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>'),
  )
}

for (const file of [MANIFEST_PATH, LEDGER_PATH, VERCEL_PATH]) {
  if (!fs.existsSync(file))
    fail(`required file missing: ${path.relative(ROOT, file)}`)
}

if (failures) {
  process.exitCode = 1
}
else {
  const manifest = readJson(MANIFEST_PATH)
  const ledger = readJson(LEDGER_PATH)
  const vercel = readJson(VERCEL_PATH)
  const missingRoutes = manifest.routes || []
  const missingSet = new Set(missingRoutes)

  if (manifest.signalReliable !== true)
    fail('Chinese-content manifest is not authoritative')
  else
    pass(`authoritative Chinese-content signal: ${manifest.signal}`)

  if (!manifest.totalBlogPosts || manifest.totalBlogPosts < missingRoutes.length)
    fail(`invalid manifest counts: total=${manifest.totalBlogPosts}, missing=${missingRoutes.length}`)
  else
    pass(`manifest counts: ${manifest.totalBlogPosts} total, ${missingRoutes.length} missing Chinese content`)

  if (missingSet.size !== missingRoutes.length)
    fail('Chinese-missing manifest contains duplicate routes')

  const unsafeRoutes = missingRoutes.filter(route => /[:*?+(){}[\]\\]/.test(route))
  if (unsafeRoutes.length)
    fail(`unsafe Chinese-missing routes: ${unsafeRoutes.join(', ')}`)

  const managedSources = ledger.sources || []
  if (ledger.count !== missingRoutes.length || managedSources.length !== missingRoutes.length)
    fail(`redirect ledger count mismatch: manifest=${missingRoutes.length}, ledger=${ledger.count}`)

  const managedSet = new Set(managedSources)
  const ledgerDiff = [
    ...missingRoutes.filter(route => !managedSet.has(route)),
    ...managedSources.filter(route => !missingSet.has(route)),
  ]
  if (ledgerDiff.length)
    fail(`redirect ledger routes differ from manifest: ${ledgerDiff.slice(0, 4).join(', ')}`)
  else
    pass('redirect ledger exactly matches Chinese-missing manifest')

  const redirectBySource = new Map((vercel.redirects || []).map(redirect => [redirect.source, redirect]))
  for (const route of missingRoutes) {
    const redirect = redirectBySource.get(route)
    const expectedDestination = route.replace(/^\/zh/, '')
    if (!redirect || redirect.permanent !== false || redirect.destination !== expectedDestination)
      fail(`temporary redirect missing or incorrect: ${route} -> ${expectedDestination}`)
  }
  if (!missingRoutes.some(route => !redirectBySource.has(route)))
    pass(`all ${missingRoutes.length} Chinese-missing routes have temporary redirects`)

  const fallback200 = path.join(OUTPUT_DIR, '200.html')
  const fallback404 = path.join(OUTPUT_DIR, '404.html')
  if (fs.existsSync(fallback200))
    fail('static SPA fallback 200.html still exists')
  else
    pass('static SPA fallback 200.html is absent')

  if (!fs.existsSync(fallback404)) {
    fail('404.html is missing')
  }
  else {
    const errorHtml = fs.readFileSync(fallback404, 'utf8')
    if (!hasNoindex(errorHtml))
      fail('404.html does not contain a robots noindex directive')
    else
      pass('404.html exists and contains noindex')
  }

  const zhSitemapPath = path.join(OUTPUT_DIR, 'sitemap-zh.xml')
  const enSitemapPath = path.join(OUTPUT_DIR, 'sitemap-en.xml')
  if (!fs.existsSync(zhSitemapPath) || !fs.existsSync(enSitemapPath)) {
    fail('generated XML sitemaps are missing from static output')
  }
  else {
    const zhXml = fs.readFileSync(zhSitemapPath, 'utf8')
    const enXml = fs.readFileSync(enSitemapPath, 'utf8')
    const zhLocs = locsFromXml(zhXml).filter(loc => loc.includes('/zh/blog/'))
    const enLocs = locsFromXml(enXml).filter(loc => loc.includes('/blog/') && !loc.includes('/zh/blog/'))
    const expectedZhCount = manifest.totalBlogPosts - missingRoutes.length

    const leaked = missingRoutes.filter(route => zhXml.includes(`<loc>https://www.yundasurrogacy.com${route}</loc>`))
    if (leaked.length)
      fail(`sitemap-zh.xml contains ${leaked.length} Chinese-missing routes`)
    else
      pass('sitemap-zh.xml excludes all Chinese-missing routes')

    let hreflangConflicts = 0
    for (const route of missingRoutes) {
      const enUrl = `https://www.yundasurrogacy.com${route.replace(/^\/zh/, '')}`
      const block = enXml.split('<url>').find(chunk => chunk.includes(`<loc>${enUrl}</loc>`))
      if (block && block.includes('hreflang="zh-CN"'))
        hreflangConflicts++
    }
    if (hreflangConflicts)
      fail(`${hreflangConflicts} English sitemap entries point hreflang at missing Chinese pages`)
    else
      pass('English sitemap omits zh-CN hreflang for Chinese-missing routes')

    if (zhLocs.length !== expectedZhCount)
      fail(`Chinese sitemap blog count=${zhLocs.length}, expected=${expectedZhCount}`)
    else
      pass(`Chinese sitemap contains ${zhLocs.length} indexable blog routes`)

    if (enLocs.length !== manifest.totalBlogPosts)
      fail(`English sitemap blog count=${enLocs.length}, expected=${manifest.totalBlogPosts}`)
    else
      pass(`English sitemap contains all ${enLocs.length} blog routes`)

    for (const route of missingRoutes) {
      if (fs.existsSync(routeHtmlPath(route)))
        fail(`Chinese-missing route was prerendered: ${route}`)
    }
    if (!missingRoutes.some(route => fs.existsSync(routeHtmlPath(route))))
      pass('Chinese-missing routes were not prerendered')

    for (const absoluteUrl of zhLocs) {
      const route = new URL(absoluteUrl).pathname
      const htmlPath = routeHtmlPath(route)
      if (!fs.existsSync(htmlPath)) {
        fail(`indexable Chinese route was not prerendered: ${route}`)
        continue
      }
      const html = fs.readFileSync(htmlPath, 'utf8')
      if (!isNoindexPreview && hasNoindex(html))
        fail(`indexable Chinese route was accidentally noindexed: ${route}`)
    }
    if (isNoindexPreview) {
      pass('preview build intentionally noindexes all prerendered routes')
    }
    else if (!zhLocs.some((absoluteUrl) => {
      const route = new URL(absoluteUrl).pathname
      const htmlPath = routeHtmlPath(route)
      return !fs.existsSync(htmlPath) || hasNoindex(fs.readFileSync(htmlPath, 'utf8'))
    })) {
      pass('all indexable Chinese blog routes are prerendered without noindex')
    }
  }

  if (failures) {
    console.error(`[verify-p0] ${failures} failure(s); build must not be deployed.`)
    process.exitCode = 1
  }
  else {
    console.warn('[verify-p0] All P0 static-build checks passed.')
  }
}

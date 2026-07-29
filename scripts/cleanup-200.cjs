/**
 * cleanup-200.cjs
 * Remove .output/public/200.html after nuxt generate.
 *
 * Nuxt static preset always emits 200.html as an SPA client-side fallback.
 * On Vercel that file is served with HTTP 200 for every unmatched path,
 * which turns missing URLs into soft 404s that are indexable by Google.
 * Deleting it forces Vercel to fall back to 404.html (HTTP 404) instead.
 *
 * Also removes the dist/200.html symlink if present. This is a release gate:
 * failure to remove the fallback, or failure to generate 404.html, exits
 * non-zero so a deployment cannot silently preserve the soft-404 behavior.
 */
const { existsSync, readFileSync, rmSync, writeFileSync } = require('node:fs')
const { join } = require('node:path')
const process = require('node:process')

const targets = [
  join(process.cwd(), '.output', 'public', '200.html'),
  join(process.cwd(), 'dist', '200.html'),
]
const fallback404 = join(process.cwd(), '.output', 'public', '404.html')

let removed = 0
let failed = 0
for (const file of targets) {
  if (!existsSync(file))
    continue

  try {
    rmSync(file, { force: true })
    console.warn(`[cleanup-200] Removed: ${file}`)
    removed++
  }
  catch (error) {
    failed++
    console.error(`[cleanup-200] ERROR: could not remove ${file}: ${error.message}`)
  }
}

const remaining = targets.filter(existsSync)
if (remaining.length) {
  failed += remaining.length
  for (const file of remaining)
    console.error(`[cleanup-200] ERROR: soft-404 fallback still exists: ${file}`)
}

if (!existsSync(fallback404)) {
  failed++
  console.error(`[cleanup-200] ERROR: required 404 artifact is missing: ${fallback404}`)
}
else {
  const robotsNoindexPattern =
    /<meta\b(?=[^>]*\bname=["']robots["'])(?=[^>]*\bcontent=["'][^"']*\bnoindex\b[^"']*["'])[^>]*>/i
  let fallback404Html = readFileSync(fallback404, 'utf8')

  if (!robotsNoindexPattern.test(fallback404Html)) {
    if (!fallback404Html.includes('<head>')) {
      failed++
      console.error(
        `[cleanup-200] ERROR: could not inject robots noindex because <head> is missing: ${fallback404}`,
      )
    }
    else {
      fallback404Html = fallback404Html.replace(
        '<head>',
        '<head><meta name="robots" content="noindex,follow">',
      )
      writeFileSync(fallback404, fallback404Html, 'utf8')
      console.warn(`[cleanup-200] Added robots noindex: ${fallback404}`)
    }
  }

  if (!robotsNoindexPattern.test(readFileSync(fallback404, 'utf8'))) {
    failed++
    console.error(`[cleanup-200] ERROR: static 404 lacks robots noindex: ${fallback404}`)
  }
}

if (failed > 0) {
  console.error('[cleanup-200] Build blocked: unmatched URLs could still return the wrong response.')
  process.exitCode = 1
}
else if (removed === 0) {
  console.warn('[cleanup-200] 200.html not found, nothing to remove.')
}
else {
  console.warn('[cleanup-200] Done. Unmatched paths will now return HTTP 404 on Vercel.')
}

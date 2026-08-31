const fs = require('node:fs')
const path = require('node:path')

const root = process.cwd()
const slug = 'mhb-new-york-2026-guide-gay-intended-parents'
const apiBase = (process.env.BLOG_API_BASE || 'https://yunda-admin-system.yundasurrogacy.com').replace(/\/$/, '')
const taskDir = path.join(root, 'seo-project/campaigns/geo-01-mhb-new-york-2026/tasks/geo-06-gay-men-pre-event')
const backupPath = path.join(root, '.seo-cache/backups/2026-08-31/geo06-blog-before-20260831-0820/before.json')
const contentPath = path.join(taskDir, '2026-08-31-optimized-en-content.html')
const previewPath = path.join(root, '.seo-cache/previews/2026-08-31-geo06-cms-update.json')
const afterPath = path.join(root, '.seo-cache/snapshots/2026-08-31-geo06-blog-after.json')
const mode = process.argv.includes('--apply') ? 'apply' : process.argv.includes('--rollback') ? 'rollback' : 'dry-run'

const update = {
  en_title: 'Questions to Ask a Surrogacy Agency at MHB New York 2026',
  en_seo_title: 'MHB New York 2026: Questions Gay Intended Parents Should Ask',
  en_seo_description: 'Prepare for MHB New York 2026 with questions about agency scope, matching, egg donation, IVF, costs, legal planning, insurance, escrow, and support.',
}

function textFromHtml(html) {
  return String(html)
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim()
}

function words(value) {
  return String(value).replace(/[—–]/g, ' ').trim().split(/\s+/).filter(Boolean)
}

function validateContent(html) {
  const errors = []
  const h1Count = (html.match(/<h1\b/gi) || []).length
  const h2Count = (html.match(/<h2\b/gi) || []).length
  const h3Count = (html.match(/<h3\b/gi) || []).length
  const directAnswer = html.match(/<p\b[^>]*data-geo-direct-answer=["']true["'][^>]*>([\s\S]*?)<\/p>/i)
  const directAnswerWords = directAnswer ? words(textFromHtml(directAnswer[1])).length : 0
  const requiredLinks = [
    '/resources/mhb-new-york-2026',
    '/single-parents-lgbtq',
    '/surrogacy-process',
    '/egg-donation',
    '/partner-ivf-clinics',
    '/surrogacy-cost',
    '/surrogacy-protection-california',
    '/be-parents',
  ]

  if (h1Count !== 0) errors.push(`CMS body must contain no h1; found ${h1Count}`)
  if (h2Count < 10) errors.push(`Expected at least 10 h2 headings; found ${h2Count}`)
  if (h3Count < 5) errors.push(`Expected at least 5 FAQ h3 headings; found ${h3Count}`)
  if (directAnswerWords < 134 || directAnswerWords > 167) errors.push(`Direct answer must be 134-167 words; found ${directAnswerWords}`)
  if (!html.includes('Men Having Babies</a> organizes')) errors.push('Organizer attribution is missing')
  if (!html.includes('one of the Silver Sponsors')) errors.push('Silver Sponsor relationship is missing')
  if (!html.includes('Yunda is not the organizer or co-organizer')) errors.push('Organizer boundary is missing')
  if (/<a\b[^>]*href=["']https:\/\/www\.yundasurrogacy\.com\//i.test(html)) errors.push('Internal links must be relative')
  for (const href of requiredLinks) {
    if (!html.includes(`href="${href}"`)) errors.push(`Missing internal link ${href}`)
  }
  if (update.en_seo_title.length > 60) errors.push(`SEO title is ${update.en_seo_title.length} characters`)
  if (update.en_seo_description.length < 120 || update.en_seo_description.length > 160) errors.push(`SEO description is ${update.en_seo_description.length} characters`)
  if (errors.length) throw new Error(errors.join('\n'))

  return {
    h1Count,
    h2Count,
    h3Count,
    directAnswerWords,
    bodyWords: words(textFromHtml(html)).length,
    internalLinks: requiredLinks,
  }
}

async function fetchBlog() {
  const response = await fetch(`${apiBase}/api/blog?route_id=${encodeURIComponent(slug)}&cache_bust=${Date.now()}`, {
    headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' },
  })
  if (!response.ok) throw new Error(`GET blog failed: ${response.status}`)
  return response.json()
}

async function putBlog(payload) {
  const response = await fetch(`${apiBase}/api/blog`, {
    method: 'PUT',
    headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const result = await response.json()
  if (!response.ok || result?.id !== payload.id) throw new Error(`PUT blog failed: ${response.status} ${JSON.stringify(result)}`)
  return result
}

function sameFields(left, right, fields) {
  for (const field of fields) {
    if ((left[field] ?? null) !== (right[field] ?? null)) throw new Error(`Record mismatch for ${field}`)
  }
}

async function main() {
  if (!apiBase.startsWith('https://')) throw new Error('BLOG_API_BASE must use HTTPS')
  if (!fs.existsSync(backupPath)) throw new Error(`Missing backup: ${backupPath}`)
  const before = JSON.parse(fs.readFileSync(backupPath, 'utf8'))
  const optimizedContent = fs.readFileSync(contentPath, 'utf8').trim()
  const validation = validateContent(optimizedContent)
  const payload = mode === 'rollback'
    ? {
        id: before.id,
        route_id: before.route_id,
        en_title: before.en_title,
        en_seo_title: before.en_seo_title,
        en_seo_description: before.en_seo_description,
        en_content: before.en_content,
      }
    : {
        id: before.id,
        route_id: before.route_id,
        ...update,
        en_content: optimizedContent,
      }

  const preview = {
    mode,
    generatedAt: new Date().toISOString(),
    source: `${apiBase}/api/blog`,
    routeId: slug,
    url: `https://www.yundasurrogacy.com/blog/${slug}`,
    backupPath: path.relative(root, backupPath),
    update: { ...update, en_content: `[${optimizedContent.length} characters]` },
    validation,
  }
  fs.mkdirSync(path.dirname(previewPath), { recursive: true })
  fs.writeFileSync(previewPath, `${JSON.stringify(preview, null, 2)}\n`)
  console.log(`Preview validated: ${previewPath}`)
  console.log(JSON.stringify(validation, null, 2))
  if (mode === 'dry-run') return

  const current = await fetchBlog()
  const preflightFields = ['id', 'route_id', 'en_title', 'en_seo_title', 'en_seo_description', 'en_content']
  if (mode === 'apply') sameFields(current, before, preflightFields)
  const result = await putBlog(payload)
  sameFields(result, payload, ['id', 'route_id', 'en_title', 'en_seo_title', 'en_seo_description', 'en_content'])
  const verified = await fetchBlog()
  sameFields(verified, payload, ['id', 'route_id', 'en_title', 'en_seo_title', 'en_seo_description', 'en_content'])
  fs.mkdirSync(path.dirname(afterPath), { recursive: true })
  fs.writeFileSync(afterPath, `${JSON.stringify({ collectedAt: new Date().toISOString(), mode, blog: verified }, null, 2)}\n`)
  console.log(`${mode} completed and read-back verified: ${afterPath}`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

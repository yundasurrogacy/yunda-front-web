const fs = require('node:fs')
const path = require('node:path')

const root = process.cwd()
const taskDir = path.join(root, 'seo-project/campaigns/geo-01-mhb-new-york-2026/tasks/geo-05-content-mapping')
const enPath = path.join(taskDir, '2026-08-31-optimized-en-content.html')
const zhPath = path.join(taskDir, '2026-08-31-optimized-zh-content.html')
const outputPath = path.join(taskDir, '2026-08-31-cms-payload-preview.json')
const routeId = 'mhb-new-york-2026-guide-gay-intended-parents'

const fields = {
  id: 179,
  route_id: routeId,
  en_title: 'Questions to Ask a Surrogacy Agency at MHB New York 2026',
  en_seo_title: 'MHB New York 2026: Questions Gay Intended Parents Should Ask',
  en_seo_description: 'Prepare for MHB New York 2026 with questions about agency scope, matching, egg donation, IVF, costs, legal planning, insurance, escrow, and support.',
  en_excerpt: 'A practical checklist for gay intended parents comparing agency scope, screening, matching, donor and IVF coordination, costs, legal planning, insurance, escrow, and support before MHB New York 2026.',
  title: '参加 MHB New York 2026 前：同志准父母应向代孕机构提出的问题',
  seo_title: 'MHB New York 2026 代孕机构提问清单｜同志准父母指南',
  seo_description: '参加 MHB New York 2026 前，用这份清单比较代孕机构的职责、匹配、供卵、IVF、费用、法律、保险、托管与沟通支持。',
  excerpt: '供同志准父母在 MHB New York 2026 前使用的机构比较清单，涵盖职责、筛查、匹配、供卵与 IVF 协调、费用、法律、保险、托管和沟通支持。',
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

function count(html, expression) {
  return (html.match(expression) || []).length
}

function validateLanguage(html, language) {
  const errors = []
  const h1Count = count(html, /<h1\b/gi)
  const h2Count = count(html, /<h2\b/gi)
  const h3Count = count(html, /<h3\b/gi)
  const links = [...html.matchAll(/<a\b[^>]*href=["']([^"']+)["']/gi)].map(match => match[1])
  const requiredPaths = [
    '/resources/mhb-new-york-2026',
    '/single-parents-lgbtq',
    '/surrogacy-process',
    '/egg-donation',
    '/partner-ivf-clinics',
    '/surrogacy-cost',
    '/surrogacy-protection-california',
    '/be-parents',
  ]
  const expectedPaths = language === 'zh'
    ? requiredPaths.map(value => `/zh${value}`)
    : requiredPaths

  if (h1Count !== 0) errors.push(`${language}: CMS body must not contain h1; found ${h1Count}`)
  if (h2Count < 10) errors.push(`${language}: expected at least 10 h2 headings; found ${h2Count}`)
  if (h3Count !== 5) errors.push(`${language}: expected 5 visible FAQ h3 headings; found ${h3Count}`)
  if (!html.includes('data-geo-direct-answer="true"')) errors.push(`${language}: direct answer marker missing`)
  if (!html.includes('data-geo-task="geo-05')) errors.push(`${language}: GEO 05 provenance marker missing`)
  if (!html.includes('Men Having Babies</a>')) errors.push(`${language}: organizer entity link missing`)
  if (!html.includes('Silver Sponsor')) errors.push(`${language}: Silver Sponsor wording missing`)
  if (language === 'en' && !html.includes('Yunda is not the organizer or co-organizer')) errors.push('en: organizer boundary missing')
  if (language === 'zh' && !html.includes('不是活动组织方或共同组织方')) errors.push('zh: organizer boundary missing')
  if (language === 'en' && !html.includes('Yunda is not a law firm, medical provider, IVF clinic, insurance company, or escrow company')) errors.push('en: role boundary missing')
  if (language === 'zh' && !html.includes('孕达不是律师事务所、医疗机构、IVF 诊所、保险公司或托管公司')) errors.push('zh: role boundary missing')
  for (const requiredPath of expectedPaths) {
    if (!links.includes(requiredPath)) errors.push(`${language}: missing internal link ${requiredPath}`)
  }
  if (links.some(link => link.includes('/blog/questions-to-ask-surrogacy-agency-at-mhb-new-york-2026'))) errors.push(`${language}: rejected duplicate slug is linked`)
  if (/[—]/.test(html)) errors.push(`${language}: em dash is not allowed by blog style rules`)
  if (errors.length) throw new Error(errors.join('\n'))

  return {
    h1Count,
    h2Count,
    h3Count,
    bodyCharacters: textFromHtml(html).length,
    internalLinks: links.filter(link => link.startsWith('/')),
    externalSources: links.filter(link => /^https:\/\//.test(link)),
  }
}

function main() {
  const enContent = fs.readFileSync(enPath, 'utf8').trim()
  const zhContent = fs.readFileSync(zhPath, 'utf8').trim()
  const validation = {
    en: validateLanguage(enContent, 'en'),
    zh: validateLanguage(zhContent, 'zh'),
  }

  if (fields.en_seo_title.length > 70) throw new Error(`English SEO title too long: ${fields.en_seo_title.length}`)
  if (fields.en_seo_description.length < 120 || fields.en_seo_description.length > 170) throw new Error(`English SEO description length: ${fields.en_seo_description.length}`)
  if (!fields.title.includes('MHB New York 2026')) throw new Error('Chinese title must preserve the event entity name')

  const output = {
    schema_version: '1.0',
    generated_at: new Date().toISOString(),
    mode: 'local-preview-only',
    external_write_performed: false,
    canonical_url: `https://www.yundasurrogacy.com/blog/${routeId}`,
    rejected_duplicate_url: 'https://www.yundasurrogacy.com/blog/questions-to-ask-surrogacy-agency-at-mhb-new-york-2026',
    preserve_existing_fields: ['category', 'cover_img_url', 'tags', 'reference_author', 'created_at'],
    payload: {
      ...fields,
      en_content: enContent,
      content: zhContent,
    },
    validation,
    publication_blockers: [
      'Named fertility or IVF reviewer approval',
      'Named reproductive-law reviewer approval',
      'Insurance and escrow wording review',
      'Bilingual editorial equivalence review',
      'Final live recheck of MHB event facts and Silver Sponsor placement immediately before CMS apply',
      'Explicit CMS write and deployment approval',
    ],
  }

  fs.writeFileSync(outputPath, `${JSON.stringify(output, null, 2)}\n`)
  console.log(`Validated local CMS payload: ${path.relative(root, outputPath)}`)
  console.log(JSON.stringify(validation, null, 2))
}

main()

const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')

const API_BASE = 'https://yunda-admin-system.yundasurrogacy.com'
const SLUG = 'known-vs-anonymous-egg-donor-gay-men'
const taskDir = path.resolve(__dirname, '..')
const draftPath = path.join(taskDir, 'drafts', `${SLUG}.html`)
const recordPath = path.join(taskDir, 'evidence', '2026-09-04-cms-publication-record.json')
const body = fs.readFileSync(draftPath, 'utf8').trim()
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex')

const payload = {
  route_id: SLUG,
  title: '',
  content: '',
  en_title: 'Known Egg Donor vs Anonymous Egg Donor for Gay Men',
  en_content: body,
  seo_title: '',
  seo_description: '',
  en_seo_title: 'Known vs Anonymous Egg Donor for Gay Men',
  en_seo_description: 'Compare known and anonymous egg donation for gay men, including screening, genetics, legal planning, privacy, IVF coordination, and future contact.',
  category: '准父母相关',
  cover_img_url: 'https://qiniu-resources.weweknow.com/yundasurrogacy-1/known-vs-anonymous-egg-donor-gay-men-hero-20260904.jpg',
  tags: 'gay men,egg donor,known donor,anonymous donor,IVF,LGBTQ family building',
  reference_author: 'yunda',
}

async function request(url, options) {
  const response = await fetch(url, options)
  const text = await response.text()
  let data
  try { data = JSON.parse(text) } catch { data = text }
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}: ${text}`)
  return data
}

async function readCurrent() {
  return request(`${API_BASE}/api/blog?route_id=${encodeURIComponent(SLUG)}&lang=en&cache_bust=${Date.now()}`)
}

function validateDraft() {
  const failures = []
  if (/<h1\b/i.test(body)) failures.push('CMS body contains h1')
  if (!body.startsWith('<p><strong>Short answer:</strong>')) failures.push('answer-first opening missing')
  for (const href of ['/egg-donation', '/partner-ivf-clinics', '/surrogacy-process', '/single-parents-lgbtq', '/be-parents']) {
    if (!body.includes(`href="${href}"`)) failures.push(`missing internal link ${href}`)
  }
  if ((body.match(/<h3>/g) || []).length < 5) failures.push('FAQ count below five')
  if (failures.length) throw new Error(failures.join('; '))
}

function validateCurrent(current) {
  const failures = []
  if (!current || current.route_id !== SLUG) failures.push('route mismatch')
  if (current?.en_title !== payload.en_title) failures.push('title mismatch')
  if (current?.en_seo_title !== payload.en_seo_title) failures.push('SEO title mismatch')
  if (current?.en_seo_description !== payload.en_seo_description) failures.push('SEO description mismatch')
  if (current?.cover_img_url !== payload.cover_img_url) failures.push('cover image mismatch')
  if (sha256(String(current?.en_content || '')) !== sha256(body)) failures.push('body hash mismatch')
  if (failures.length) throw new Error(failures.join('; '))
}

async function main() {
  validateDraft()
  const command = process.argv[2] || '--verify'
  const current = await readCurrent()

  if (command === '--apply') {
    if (current) throw new Error(`Slug ${SLUG} already exists; refusing duplicate creation`)
    const created = await request(`${API_BASE}/api/blog`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const readBack = await readCurrent()
    validateCurrent(readBack)
    const record = {
      action: 'created',
      applied_at: new Date().toISOString(),
      api: `${API_BASE}/api/blog`,
      id: created.id,
      route_id: SLUG,
      body_sha256: sha256(body),
      cover_img_url: payload.cover_img_url,
      rollback: `node ${path.relative(process.cwd(), __filename)} --rollback`,
    }
    fs.writeFileSync(recordPath, `${JSON.stringify(record, null, 2)}\n`)
    console.log(JSON.stringify(record, null, 2))
    return
  }

  if (command === '--rollback') {
    if (!current) return console.log('Already absent')
    validateCurrent(current)
    await request(`${API_BASE}/api/blog`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: current.id }),
    })
    if (await readCurrent()) throw new Error('Rollback verification failed')
    console.log(`Deleted ${SLUG} (${current.id})`)
    return
  }

  if (!current) throw new Error(`${SLUG} is absent`)
  validateCurrent(current)
  console.log(JSON.stringify({ verified: true, id: current.id, route_id: SLUG, body_sha256: sha256(body) }, null, 2))
}

main().catch(error => {
  console.error(error.message)
  process.exitCode = 1
})

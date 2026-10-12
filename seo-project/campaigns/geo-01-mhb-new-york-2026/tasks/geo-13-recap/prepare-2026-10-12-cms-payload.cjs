const fs = require('node:fs')
const path = require('node:path')

const root = process.cwd()
const backupPath = path.join(root, '.seo-cache/backups/2026-10-12/geo-13-publish/cms-before.json')
const outputPath = path.join(root, 'seo-project/campaigns/geo-01-mhb-new-york-2026/tasks/geo-13-recap/2026-10-12-cms-payload.json')
const before = JSON.parse(fs.readFileSync(backupPath, 'utf8'))

const recapSection = `<section data-geo-task="geo-13-recap" data-updated="2026-10-12">
<h2>Five Questions Gay Intended Parents Brought to MHB New York 2026</h2>
<p><strong>Direct answer:</strong> Gay intended parents preparing for or following MHB New York 2026 commonly need a clear way to compare provider responsibilities, screening and matching, egg donation and IVF coordination, costs and third-party services, and legal and parentage handoffs. Use the same five questions with each provider: What does the agency handle directly? How are screening and rematching explained? Who owns donor, embryo, and clinic decisions? Which costs are included or paid to independent providers? How are legal, insurance, escrow, communication, pregnancy, and post-birth responsibilities coordinated? Yunda provides education, coordination, bilingual communication, and case-management support; medical, legal, insurance, IVF, and escrow decisions belong to the relevant qualified professionals.</p>
<h3>1. What does the agency handle directly?</h3>
<p>Ask the provider to separate agency coordination from clinic, legal, insurance, escrow, and other independent professional work. Record the named case owner, handoff points, communication frequency, and what happens when the plan changes.</p>
<h3>2. How are screening, matching, and rematching explained?</h3>
<p>Ask which information is collected before a match, which reviews belong to medical or mental-health professionals, how both sides discuss expectations, and how a rematch decision and related costs are handled. Screening and matching do not guarantee a match, pregnancy, or birth outcome.</p>
<h3>3. Who owns donor, embryo, and IVF decisions?</h3>
<p>Ask who explains donor options, screening records, embryo creation, clinic timing, laboratory coordination, transport, and medical recommendations. Keep clinic decisions with qualified fertility professionals and document how the agency communicates across the team.</p>
<h3>4. Which costs are included, variable, or paid to third parties?</h3>
<p>Request a written, like-for-like comparison covering agency services, donor and medical costs, legal work, insurance, escrow, travel, contingencies, refunds, and rematching. Do not compare headline totals that use different assumptions.</p>
<h3>5. How do legal, parentage, insurance, escrow, and support handoffs work?</h3>
<p>Ask when each party should retain independent counsel, who reviews insurance, who administers escrow, how parentage documents are coordinated, and how communication continues through pregnancy, delivery, and post-birth support.</p>
<p>For the event recap and verified event facts, see <a href="https://www.yundasurrogacy.com/resources/mhb-new-york-2026">Yunda at MHB New York 2026</a>. When you are ready to discuss your starting point, <a href="https://www.yundasurrogacy.com/be-parents">plan a private intended-parent consultation</a>.</p>
<p><strong>Sources:</strong> <a href="https://menhavingbabies.org/surrogacy-seminars/ny/" target="_blank" rel="noopener noreferrer">Men Having Babies official event page</a>; <a href="https://www.cdc.gov/art/glossary/index.html" target="_blank" rel="noopener noreferrer">CDC ART Glossary</a>; <a href="https://www.asrm.org/practice-guidance/ethics-opinions/consideration-of-the-gestational-carrier-an-ethics-committee-opinion-2023/" target="_blank" rel="noopener noreferrer">ASRM gestational-carrier guidance</a>; <a href="https://selfhelp.courts.ca.gov/parentage/surrogacy" target="_blank" rel="noopener noreferrer">California Courts parentage overview</a>.</p>
</section>`

const current = String(before.en_content || '')
const withoutOld = current.replace(/<section\b[^>]*data-geo-task=["']geo-13-recap["'][\s\S]*?<\/section>/gi, '')
const firstParagraph = withoutOld.search(/<\/p>/i)
const insertAt = firstParagraph >= 0 ? firstParagraph + withoutOld.slice(firstParagraph).match(/<\/p>/i)[0].length : 0
const enContent = insertAt ? `${withoutOld.slice(0, insertAt)}${recapSection}${withoutOld.slice(insertAt)}` : `${recapSection}${withoutOld}`

const payload = {
  id: before.id,
  route_id: before.route_id,
  en_title: 'Five Questions Gay Intended Parents Brought to MHB New York 2026',
  en_seo_title: '5 Questions Gay Intended Parents Asked at MHB New York 2026',
  en_seo_description: 'Review five provider questions gay intended parents brought to MHB New York 2026, covering scope, matching, IVF, costs, legal handoffs, and support.',
  en_content: enContent,
}

if (payload.en_seo_title.length > 60)
  throw new Error(`SEO title too long: ${payload.en_seo_title.length}`)
if (payload.en_seo_description.length < 120 || payload.en_seo_description.length > 160)
  throw new Error(`SEO description length outside range: ${payload.en_seo_description.length}`)
if (!payload.en_content.includes('data-geo-task="geo-13-recap"') || !payload.en_content.includes('/resources/mhb-new-york-2026'))
  throw new Error('Recap section or event link missing')

fs.writeFileSync(outputPath, `${JSON.stringify(payload, null, 2)}\n`, 'utf8')
console.log(JSON.stringify({ outputPath, id: payload.id, route_id: payload.route_id, enContentLength: payload.en_content.length, seoTitleLength: payload.en_seo_title.length, seoDescriptionLength: payload.en_seo_description.length }, null, 2))

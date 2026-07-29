const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const DEFAULT_INPUT = path.join(
  process.cwd(),
  'seo-project/02-baseline/source-data/2026-07-27-google/gsc-web-query-page-2026-06-27_to_2026-07-24.json',
)

const outputFlagIndex = process.argv.indexOf('--output')
const outputPath = outputFlagIndex >= 0 && process.argv[outputFlagIndex + 1]
  ? path.resolve(process.argv[outputFlagIndex + 1])
  : ''
const inputArgument = process.argv
  .slice(2)
  .find((argument, index, argumentsList) =>
    !argument.startsWith('--')
    && argumentsList[index - 1] !== '--output',
  )
const inputPath = path.resolve(inputArgument || DEFAULT_INPUT)

const MIN_QUERY_IMPRESSIONS = 50
const MIN_PAGE_IMPRESSIONS = 10
const MIN_PAGE_SHARE = 0.05

function normalizePage(rawUrl) {
  try {
    const url = new URL(rawUrl)
    const pathname = decodeURIComponent(url.pathname)
      .replace(/^\/zh(?=\/|$)/, '')
      .replace(/\/+$/, '')
    return pathname || '/'
  }
  catch {
    return rawUrl
  }
}

function classifyQuery(query) {
  const normalized = query.toLowerCase().replace(/\s+/g, ' ').trim()
  const hasSurrogacyTerm = /\b(?:surrogacy|surrogate|gestational carrier)\b/.test(normalized)
  if (!hasSurrogacyTerm)
    return ''

  if (/\b(?:pay|paid|compensation|salary|benefits?|make|earn|income)\b/.test(normalized))
    return 'surrogate-compensation'

  if (/\b(?:cost|costs|price|pricing|fee|fees|afford|budget|expense|expenses)\b/.test(normalized))
    return 'intended-parent-total-cost'

  return ''
}

const payload = JSON.parse(fs.readFileSync(inputPath, 'utf8'))
const rows = Array.isArray(payload) ? payload : payload.rows
if (!Array.isArray(rows))
  throw new TypeError(`Expected a rows array in ${inputPath}`)

const queryMap = new Map()
for (const row of rows) {
  const query = String(row.keys?.[0] || '').toLowerCase().replace(/\s+/g, ' ').trim()
  const page = normalizePage(String(row.keys?.[1] || ''))
  const cluster = classifyQuery(query)
  if (!query || !page || !cluster)
    continue

  if (!queryMap.has(query))
    queryMap.set(query, { query, cluster, pages: new Map() })

  const entry = queryMap.get(query)
  const current = entry.pages.get(page) || { page, clicks: 0, impressions: 0, weightedPosition: 0 }
  const impressions = Number(row.impressions || 0)
  current.clicks += Number(row.clicks || 0)
  current.impressions += impressions
  current.weightedPosition += Number(row.position || 0) * impressions
  entry.pages.set(page, current)
}

const competingQueries = []
for (const entry of queryMap.values()) {
  const pages = [...entry.pages.values()]
    .map(page => ({
      page: page.page,
      clicks: page.clicks,
      impressions: page.impressions,
      position: page.impressions ? page.weightedPosition / page.impressions : 0,
    }))
    .sort((a, b) => b.impressions - a.impressions)
  const totalImpressions = pages.reduce((sum, page) => sum + page.impressions, 0)
  if (totalImpressions < MIN_QUERY_IMPRESSIONS)
    continue

  const materialPages = pages.filter(page =>
    page.impressions >= MIN_PAGE_IMPRESSIONS
    && page.impressions / totalImpressions >= MIN_PAGE_SHARE,
  )
  if (materialPages.length < 2)
    continue

  competingQueries.push({
    query: entry.query,
    cluster: entry.cluster,
    totalImpressions,
    materialPageCount: materialPages.length,
    materialPages: materialPages.map(page => ({
      ...page,
      share: page.impressions / totalImpressions,
    })),
  })
}

competingQueries.sort((a, b) => b.totalImpressions - a.totalImpressions)

const clusters = Object.fromEntries(
  ['intended-parent-total-cost', 'surrogate-compensation'].map(cluster => {
    const queries = competingQueries.filter(query => query.cluster === cluster)
    return [cluster, {
      competingQueryCount: queries.length,
      disclosedImpressions: queries.reduce((sum, query) => sum + query.totalImpressions, 0),
      queries,
    }]
  }),
)

const result = {
  cache_type: 'commercial-cannibalization',
  analyzed_at: new Date().toISOString(),
  source: {
    input: path.relative(process.cwd(), inputPath),
    collected_at: payload.collected_at || null,
    date_range: payload.date_range || null,
    row_count: rows.length,
  },
  methodology: {
    urlNormalization: 'Origin, query string, fragment, trailing slash, and /zh prefix removed before query-page aggregation.',
    queryMinimumImpressions: MIN_QUERY_IMPRESSIONS,
    materialPageMinimumImpressions: MIN_PAGE_IMPRESSIONS,
    materialPageMinimumShare: MIN_PAGE_SHARE,
    competitionRule: 'At least two normalized pages must meet both material-page thresholds.',
  },
  summary: {
    competingQueryCount: competingQueries.length,
    disclosedImpressions: competingQueries.reduce((sum, query) => sum + query.totalImpressions, 0),
  },
  clusters,
}

const json = `${JSON.stringify(result, null, 2)}\n`
if (outputPath) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, json)
  console.log(`Wrote ${outputPath}`)
}
else {
  process.stdout.write(json)
}

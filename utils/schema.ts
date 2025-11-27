const DEFAULT_SITE_NAME = 'Yunda Surrogacy'
const DEFAULT_BASE_URL = 'https://www.yundasurrogacy.com'

const DEFAULT_SOCIAL_LINKS = [
  'https://www.instagram.com/yunda_surrogacy_/',
  'https://www.facebook.com/people/Yunda-Surrogacy/61577914871802/',
  'https://www.youtube.com/@YundaSurrogacy',
  'https://www.linkedin.com/company/yunda-surrogacy',
]

const DEFAULT_CONTACT_POINT = {
  '@type': 'ContactPoint',
  'telephone': '+1 (626) 563-8656',
  'contactType': 'customer service',
  'areaServed': ['US', 'CN'],
  'availableLanguage': ['English', 'Chinese'],
  'email': 'kaylal@yundasurrogacy.com',
}

type SchemaRecord = Record<string, any>

function cleanSchema<T extends SchemaRecord>(schema: T): T {
  const cleanedEntries = Object.entries(schema)
    .filter(([, value]) => value !== undefined && value !== null && value !== '')
    .map(([key, value]) => {
      if (Array.isArray(value)) {
        const cleanedArray = value
          .filter(item => item !== undefined && item !== null && item !== '')
          .map((item) => {
            if (typeof item === 'object' && item !== null)
              return cleanSchema(item as SchemaRecord)
            return item
          })
        return [key, cleanedArray]
      }

      if (typeof value === 'object' && value !== null)
        return [key, cleanSchema(value as SchemaRecord)]

      return [key, value]
    })

  return Object.fromEntries(cleanedEntries) as T
}

function resolveUrl(baseUrl: string, target?: string) {
  if (!target)
    return baseUrl
  if (target.startsWith('http'))
    return target
  if (!target.startsWith('/'))
    return `${baseUrl}/${target}`
  return `${baseUrl}${target}`
}

export interface OrganizationSchemaOptions {
  name?: string
  url?: string
  logo?: string
  socialLinks?: string[]
  contactPoints?: SchemaRecord[]
  address?: SchemaRecord
  areaServed?: string | string[]
}

export function buildOrganizationSchema(options: OrganizationSchemaOptions = {}) {
  const baseUrl = options.url || DEFAULT_BASE_URL

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': options.name || DEFAULT_SITE_NAME,
    'url': baseUrl,
    'logo': options.logo || `${baseUrl}/images/base/logo.webp`,
    'sameAs': options.socialLinks || DEFAULT_SOCIAL_LINKS,
    'contactPoint': options.contactPoints || [DEFAULT_CONTACT_POINT],
    'address': options.address,
    'areaServed': options.areaServed || ['United States', 'China'],
  }

  return cleanSchema(schema)
}

export interface WebsiteSchemaOptions {
  name?: string
  url?: string
  locale?: string
  searchPath?: string
  includeSearchAction?: boolean
}

export function buildWebsiteSchema(options: WebsiteSchemaOptions = {}) {
  const baseUrl = options.url || DEFAULT_BASE_URL
  const includeSearchAction = options.includeSearchAction !== false
  const searchTarget = resolveUrl(baseUrl, options.searchPath || '/blog?keyword={search_term_string}')

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': options.name || DEFAULT_SITE_NAME,
    'url': baseUrl,
    'inLanguage': options.locale === 'zh' ? 'zh-CN' : 'en-US',
    'potentialAction': includeSearchAction
      ? {
          '@type': 'SearchAction',
          'target': searchTarget,
          'query-input': 'required name=search_term_string',
        }
      : undefined,
  }

  return cleanSchema(schema)
}

export const schemaDefaults = {
  siteName: DEFAULT_SITE_NAME,
  baseUrl: DEFAULT_BASE_URL,
  socialLinks: DEFAULT_SOCIAL_LINKS,
  contactPoint: DEFAULT_CONTACT_POINT,
}

export interface ItemListElement {
  name: string
  url: string
  position: number
  image?: string
  description?: string
  datePublished?: string
}

export interface ItemListSchemaOptions {
  name?: string
  description?: string
  baseUrl?: string
  locale?: string
  items: ItemListElement[]
  itemListOrder?: 'https://schema.org/ItemListOrderAscending' | 'https://schema.org/ItemListOrderDescending' | 'https://schema.org/ItemListOrderUnordered'
  includeContext?: boolean
}

export function buildItemListSchema(options: ItemListSchemaOptions) {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL
  const schema: SchemaRecord = {
    '@type': 'ItemList',
    'name': options.name,
    'description': options.description,
    'itemListOrder': options.itemListOrder || 'https://schema.org/ItemListOrderAscending',
    'inLanguage': options.locale === 'zh' ? 'zh-CN' : 'en-US',
    'itemListElement': options.items.map(item => cleanSchema({
      '@type': 'ListItem',
      'position': item.position,
      'name': item.name,
      'description': item.description,
      'image': item.image,
      'url': resolveUrl(baseUrl, item.url),
      'datePublished': item.datePublished,
    })),
  }

  if (options.includeContext !== false)
    schema['@context'] = 'https://schema.org'

  return cleanSchema(schema)
}

export interface BlogListSchemaOptions {
  name?: string
  description?: string
  baseUrl?: string
  locale?: string
  path?: string
  items: ItemListElement[]
}

export function buildBlogListSchema(options: BlogListSchemaOptions) {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL

  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': ['CollectionPage', 'Blog'],
    'name': options.name || `${DEFAULT_SITE_NAME} Blog`,
    'description': options.description,
    'url': resolveUrl(baseUrl, options.path || '/blog'),
    'inLanguage': options.locale === 'zh' ? 'zh-CN' : 'en-US',
    'mainEntity': buildItemListSchema({
      ...options,
      baseUrl,
      includeContext: false,
    }),
  })
}

export interface BlogPostingSchemaOptions {
  title: string
  description?: string
  articleBody?: string
  image?: string
  url?: string
  baseUrl?: string
  locale?: string
  author?: string
  datePublished?: string
  dateModified?: string
  keywords?: string[]
  category?: string
}

export function buildBlogPostingSchema(options: BlogPostingSchemaOptions) {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL

  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    'headline': options.title,
    'description': options.description,
    'articleBody': options.articleBody,
    'image': options.image,
    'url': resolveUrl(baseUrl, options.url || ''),
    'mainEntityOfPage': resolveUrl(baseUrl, options.url || ''),
    'author': options.author
      ? {
          '@type': 'Person',
          'name': options.author,
        }
      : undefined,
    'publisher': cleanSchema({
      '@type': 'Organization',
      'name': DEFAULT_SITE_NAME,
      'logo': `${baseUrl}/images/base/logo.webp`,
    }),
    'datePublished': options.datePublished,
    'dateModified': options.dateModified || options.datePublished,
    'keywords': options.keywords,
    'articleSection': options.category,
    'inLanguage': options.locale === 'zh' ? 'zh-CN' : 'en-US',
  })
}

export interface ServiceOffer {
  name: string
  description?: string
  url?: string
}

export interface ServiceSchemaOptions {
  name: string
  description?: string
  serviceType?: string
  providerName?: string
  providerType?: 'Organization' | 'MedicalOrganization'
  areaServed?: string | string[]
  audience?: string | string[]
  baseUrl?: string
  url?: string
  offers?: ServiceOffer[]
  locale?: string
}

export function buildServiceSchema(options: ServiceSchemaOptions) {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL

  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': options.name,
    'description': options.description,
    'serviceType': options.serviceType,
    'areaServed': options.areaServed,
    'audience': options.audience,
    'provider': cleanSchema({
      '@type': options.providerType || 'Organization',
      'name': options.providerName || DEFAULT_SITE_NAME,
      'url': resolveUrl(baseUrl, options.url || '/'),
    }),
    'hasOfferCatalog': options.offers?.length
      ? {
          '@type': 'OfferCatalog',
          'name': options.name,
          'itemListElement': options.offers.map((offer, index) => cleanSchema({
            '@type': 'Offer',
            'position': index + 1,
            'name': offer.name,
            'description': offer.description,
            'url': offer.url ? resolveUrl(baseUrl, offer.url) : undefined,
          })),
        }
      : undefined,
    'inLanguage': options.locale === 'zh' ? 'zh-CN' : 'en-US',
  })
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQPageSchemaOptions {
  name: string
  description?: string
  faqs: FAQItem[]
  baseUrl?: string
  url?: string
  locale?: string
}

export function buildFAQPageSchema(options: FAQPageSchemaOptions) {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL

  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'name': options.name,
    'description': options.description,
    'mainEntity': options.faqs.map(item => cleanSchema({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
    'inLanguage': options.locale === 'zh' ? 'zh-CN' : 'en-US',
    'url': resolveUrl(baseUrl, options.url || '/'),
  })
}

export interface HowToStep {
  title: string
  text?: string
  url?: string
}

export interface HowToSchemaOptions {
  name: string
  description?: string
  steps: HowToStep[]
  totalTime?: string
  locale?: string
  baseUrl?: string
  url?: string
}

export function buildHowToSchema(options: HowToSchemaOptions) {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL

  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': options.name,
    'description': options.description,
    'totalTime': options.totalTime,
    'inLanguage': options.locale === 'zh' ? 'zh-CN' : 'en-US',
    'url': options.url ? resolveUrl(baseUrl, options.url) : undefined,
    'step': options.steps.map((step, index) => cleanSchema({
      '@type': 'HowToStep',
      'position': index + 1,
      'name': step.title,
      'text': step.text,
      'url': step.url ? resolveUrl(baseUrl, step.url) : undefined,
    })),
  })
}

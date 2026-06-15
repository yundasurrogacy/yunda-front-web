const DEFAULT_SITE_NAME = 'Yunda Surrogacy'
const DEFAULT_BASE_URL = 'https://www.yundasurrogacy.com'
const DEFAULT_BRAND_DESCRIPTION = 'Yunda Surrogacy is a professional surrogacy agency supporting intended parents and surrogates through personalized matching, coordinated care, and trusted fertility, legal, and insurance partnerships.'
const DEFAULT_PHONE = '+1-626-563-8656'
const DEFAULT_EMAIL = 'kaylal@yundasurrogacy.com'
const DEFAULT_LOGO_PATH = '/images/base/logo.png'
const DEFAULT_SERVICE_TYPE = 'Surrogacy agency services'

const DEFAULT_SOCIAL_LINKS = [
  'https://www.instagram.com/yunda_surrogacy_/',
  'https://www.facebook.com/people/Yunda-Surrogacy/61577914871802/',
  'https://www.youtube.com/@YundaSurrogacy',
  'https://www.linkedin.com/company/yunda-surrogacy',
]

const DEFAULT_ADDRESS = {
  '@type': 'PostalAddress',
  'addressLocality': 'Los Angeles Metropolitan Area',
  'addressRegion': 'CA',
  'addressCountry': 'US',
}

const DEFAULT_AUDIENCE = [
  'Intended parents',
  'Surrogates',
  'International intended parents',
  'LGBTQ intended parents',
  'Single parents',
]

const DEFAULT_CONTACT_POINT = {
  '@type': 'ContactPoint',
  'telephone': DEFAULT_PHONE,
  'contactType': ['customer service', 'consultation'],
  'areaServed': ['US', 'International'],
  'availableLanguage': ['English', 'Chinese'],
  'email': DEFAULT_EMAIL,
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
  description?: string
  telephone?: string
  email?: string
  socialLinks?: string[]
  contactPoints?: SchemaRecord[]
  address?: SchemaRecord
  areaServed?: string | string[]
  audience?: string | string[]
}

export function buildOrganizationSchema(options: OrganizationSchemaOptions = {}) {
  const baseUrl = options.url || DEFAULT_BASE_URL

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    'name': options.name || DEFAULT_SITE_NAME,
    'url': baseUrl,
    'description': options.description || DEFAULT_BRAND_DESCRIPTION,
    'logo': options.logo || `${baseUrl}${DEFAULT_LOGO_PATH}`,
    'telephone': options.telephone || DEFAULT_PHONE,
    'email': options.email || DEFAULT_EMAIL,
    'sameAs': options.socialLinks || DEFAULT_SOCIAL_LINKS,
    'contactPoint': options.contactPoints || [DEFAULT_CONTACT_POINT],
    'address': options.address || DEFAULT_ADDRESS,
    'areaServed': options.areaServed || ['California', 'United States', 'International intended parents'],
    'audience': options.audience || DEFAULT_AUDIENCE,
  }

  return cleanSchema(schema)
}

export interface WebsiteSchemaOptions {
  name?: string
  url?: string
  description?: string
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
    '@id': `${baseUrl}/#website`,
    'name': options.name || DEFAULT_SITE_NAME,
    'url': baseUrl,
    'description': options.description || 'Professional surrogacy agency website for intended parents and surrogates.',
    'inLanguage': options.locale === 'zh' ? 'zh-CN' : 'en-US',
    'publisher': {
      '@id': `${baseUrl}/#organization`,
    },
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
  brandDescription: DEFAULT_BRAND_DESCRIPTION,
  phone: DEFAULT_PHONE,
  email: DEFAULT_EMAIL,
  address: DEFAULT_ADDRESS,
  audience: DEFAULT_AUDIENCE,
  serviceType: DEFAULT_SERVICE_TYPE,
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
  providerId?: string
  providerType?: 'Organization' | 'MedicalOrganization'
  areaServed?: string | string[]
  audience?: string | string[]
  baseUrl?: string
  url?: string
  serviceId?: string
  websiteId?: string
  publisherId?: string
  offers?: ServiceOffer[]
  locale?: string
  inLanguage?: string
}

export function buildServiceSchema(options: ServiceSchemaOptions) {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL
  const providerId = options.providerId || `${baseUrl}/#organization`
  const websiteId = options.websiteId || `${baseUrl}/#website`

  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': options.serviceId,
    'name': options.name,
    'url': options.url ? resolveUrl(baseUrl, options.url) : undefined,
    'description': options.description,
    'serviceType': options.serviceType,
    'areaServed': options.areaServed,
    'audience': options.audience,
    'provider': options.providerId
      ? { '@id': providerId }
      : cleanSchema({
          '@type': options.providerType || 'Organization',
          'name': options.providerName || DEFAULT_SITE_NAME,
          'url': resolveUrl(baseUrl, options.url || '/'),
        }),
    'publisher': {
      '@id': options.publisherId || providerId,
    },
    'isPartOf': {
      '@id': websiteId,
    },
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
    'inLanguage': options.inLanguage || (options.locale === 'zh' ? 'zh-CN' : 'en-US'),
  })
}

export interface ProfessionalServiceSchemaOptions {
  name?: string
  description?: string
  serviceType?: string
  baseUrl?: string
  url?: string
  logo?: string
  telephone?: string
  email?: string
  address?: SchemaRecord
  areaServed?: string | string[]
  audience?: string | string[]
  socialLinks?: string[]
  contactPoints?: SchemaRecord[]
  offers?: ServiceOffer[]
  locale?: string
}

export function buildProfessionalServiceSchema(options: ProfessionalServiceSchemaOptions = {}) {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL
  const url = resolveUrl(baseUrl, options.url || '/')

  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${baseUrl}/#professional-service`,
    'name': options.name || DEFAULT_SITE_NAME,
    'url': url,
    'description': options.description || DEFAULT_BRAND_DESCRIPTION,
    'logo': options.logo || `${baseUrl}${DEFAULT_LOGO_PATH}`,
    'image': options.logo || `${baseUrl}${DEFAULT_LOGO_PATH}`,
    'telephone': options.telephone || DEFAULT_PHONE,
    'email': options.email || DEFAULT_EMAIL,
    'serviceType': options.serviceType || DEFAULT_SERVICE_TYPE,
    'areaServed': options.areaServed || ['California', 'United States', 'International intended parents'],
    'audience': options.audience || DEFAULT_AUDIENCE,
    'availableLanguage': ['English', 'Chinese'],
    'address': options.address || DEFAULT_ADDRESS,
    'sameAs': options.socialLinks || DEFAULT_SOCIAL_LINKS,
    'contactPoint': options.contactPoints || [DEFAULT_CONTACT_POINT],
    'parentOrganization': {
      '@id': `${baseUrl}/#organization`,
    },
    'makesOffer': options.offers?.length
      ? options.offers.map((offer, index) => cleanSchema({
          '@type': 'Offer',
          'position': index + 1,
          'itemOffered': {
            '@type': 'Service',
            'name': offer.name,
            'description': offer.description,
            'serviceType': options.serviceType || DEFAULT_SERVICE_TYPE,
            'url': offer.url ? resolveUrl(baseUrl, offer.url) : undefined,
          },
        }))
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
  inLanguage?: string
}

export function buildFAQPageSchema(options: FAQPageSchemaOptions) {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL
  const faqs = normalizeFAQItems(options.faqs)

  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'name': options.name,
    'description': options.description,
    'mainEntity': faqs.map(item => cleanSchema({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer,
      },
    })),
    'inLanguage': options.inLanguage || (options.locale === 'zh' ? 'zh-CN' : 'en-US'),
    'url': resolveUrl(baseUrl, options.url || '/'),
  })
}

export interface BreadcrumbItem {
  name: string
  url?: string
}

export interface BreadcrumbListSchemaOptions {
  baseUrl?: string
  items: BreadcrumbItem[]
  includeContext?: boolean
}

export function buildBreadcrumbListSchema(options: BreadcrumbListSchemaOptions) {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL
  const schema: SchemaRecord = {
    '@type': 'BreadcrumbList',
    'itemListElement': options.items
      .filter(item => item.name)
      .map((item, index) => cleanSchema({
        '@type': 'ListItem',
        'position': index + 1,
        'name': item.name,
        'item': item.url ? resolveUrl(baseUrl, item.url) : undefined,
      })),
  }

  if (options.includeContext !== false)
    schema['@context'] = 'https://schema.org'

  return cleanSchema(schema)
}

export interface WebPageSchemaOptions {
  name: string
  description?: string
  url: string
  about?: string
  audience?: string | string[]
  baseUrl?: string
  pageId?: string
  organizationId?: string
  websiteId?: string
  inLanguage?: string
  locale?: string
}

export function buildWebPageSchema(options: WebPageSchemaOptions) {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL
  const pageUrl = resolveUrl(baseUrl, options.url)
  const organizationId = options.organizationId || `${baseUrl}/#organization`
  const websiteId = options.websiteId || `${baseUrl}/#website`

  return cleanSchema({
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': options.pageId || `${pageUrl}#webpage`,
    'name': options.name,
    'url': pageUrl,
    'description': options.description,
    'about': options.about,
    'audience': options.audience,
    'publisher': {
      '@id': organizationId,
    },
    'isPartOf': {
      '@id': websiteId,
    },
    'inLanguage': options.inLanguage || (options.locale === 'zh' ? 'zh-CN' : 'en-US'),
  })
}

export function normalizeFAQItems(faqs: FAQItem[] = []) {
  const seen = new Set<string>()

  return faqs
    .map(item => ({
      question: item.question?.trim(),
      answer: item.answer?.replace(/\s+/g, ' ').trim(),
    }))
    .filter((item): item is FAQItem => {
      if (!item.question || !item.answer)
        return false

      const key = item.question.toLowerCase()
      if (seen.has(key))
        return false

      seen.add(key)
      return true
    })
}

export interface CoreServicePageSchemaOptions {
  baseUrl?: string
  path: string
  name: string
  description?: string
  about: string
  audience: string | string[]
  service?: {
    name: string
    description: string
    serviceType: string
    areaServed?: string | string[]
    audience?: string | string[]
  }
  breadcrumbs: BreadcrumbItem[]
  faqs?: FAQItem[]
  itemList?: {
    name: string
    description?: string
    items: ItemListElement[]
  }
  locale?: string
  inLanguage?: string
}

export function buildCoreServicePageSchemas(options: CoreServicePageSchemaOptions) {
  const baseUrl = options.baseUrl || DEFAULT_BASE_URL
  const pageUrl = resolveUrl(baseUrl, options.path)
  const organizationId = `${baseUrl}/#organization`
  const websiteId = `${baseUrl}/#website`
  const inLanguage = options.inLanguage || (options.locale === 'zh' ? 'zh-CN' : 'en-US')
  const schemas: SchemaRecord[] = [
    buildWebPageSchema({
      baseUrl,
      url: options.path,
      name: options.name,
      description: options.description,
      about: options.about,
      audience: options.audience,
      organizationId,
      websiteId,
      inLanguage,
    }),
  ]

  if (options.service) {
    schemas.push(buildServiceSchema({
      baseUrl,
      url: options.path,
      serviceId: `${pageUrl}#service`,
      providerId: organizationId,
      publisherId: organizationId,
      websiteId,
      name: options.service.name,
      description: options.service.description,
      serviceType: options.service.serviceType,
      areaServed: options.service.areaServed || ['California', 'United States', 'International intended parents'],
      audience: options.service.audience || options.audience,
      inLanguage,
    }))
  }

  schemas.push(buildBreadcrumbListSchema({
    baseUrl,
    items: options.breadcrumbs,
  }))

  const faqs = normalizeFAQItems(options.faqs)
  if (faqs.length) {
    schemas.push(buildFAQPageSchema({
      baseUrl,
      url: options.path,
      name: `${options.name} FAQ`,
      description: options.description,
      faqs,
      inLanguage,
    }))
  }

  if (options.itemList?.items.length) {
    schemas.push(buildItemListSchema({
      baseUrl,
      name: options.itemList.name,
      description: options.itemList.description,
      items: options.itemList.items,
      includeContext: true,
      locale: inLanguage === 'zh-CN' ? 'zh' : 'en',
    }))
  }

  return schemas
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

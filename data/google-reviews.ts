interface GoogleReviewExcerpt {
  author: string
  href: string
  en: string
  zh: string
}

// Selected public Google review excerpts, checked on 2026-11-17.
// Preserve quoted brand shorthand verbatim; Chinese text translates each excerpt.
// This is a curated snapshot, not a live feed or an aggregate rating.
export const googleReviewExcerpts: GoogleReviewExcerpt[] = [
  {
    author: 'Destiny Shick',
    href: 'https://maps.app.goo.gl/x89iyQd5kXPqX61R7',
    en: 'Everyone has been so nice to me. My agent has been by my side through the whole process!!',
    zh: '每个人都对我非常友善。我的顾问在整个过程中一直陪伴着我！！',
  },
  {
    author: 'Viviana Gomez',
    href: 'https://maps.app.goo.gl/k6etpvxH3nTwtD99A',
    en: 'I feel truly supported, respected, and cared for by Yunda. The team is compassionate, attentive, and always available to help.',
    zh: '我真切感受到孕达给予我的支持、尊重和关怀。团队富有同理心、细致周到，总是愿意提供帮助。',
  },
  {
    author: 'KAI M',
    href: 'https://maps.app.goo.gl/UUzr5ohpkzXMDNDZ6',
    en: 'Every step was explained clearly, and we always knew what to expect. That peace of mind made a huge difference for our family.',
    zh: '每一个步骤都解释得很清楚，我们始终知道接下来会发生什么。这份安心对我们一家人意义重大。',
  },
  {
    author: 'Stephen',
    href: 'https://maps.app.goo.gl/boLbmqr1qaFA4aBB6',
    en: 'Becoming parents through surrogacy can feel overwhelming, but Yunda made us feel supported from day one.',
    zh: '通过代孕成为父母可能会让人感到不知所措，但从第一天起，孕达就让我们感受到了支持。',
  },
]

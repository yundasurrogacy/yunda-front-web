const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')

const ROOT = process.cwd()
const checks = [
  {
    source: 'components/home/WhatSetsUsApartSection.vue',
    markers: ['480w', '768w', '1200w', 'sizes=', 'width="1200"', 'height="1200"'],
    assets: [
      'public/images/pages/home/what-sets-us-apart-480.avif',
      'public/images/pages/home/what-sets-us-apart-768.avif',
      'public/images/pages/home/what-sets-us-apart-1200.avif',
      'public/images/pages/home/what-sets-us-apart-480.jpg',
      'public/images/pages/home/what-sets-us-apart-768.jpg',
    ],
  },
  {
    source: 'pages/(surrogate-resources)/surrogate-compensation.vue',
    markers: ['480w', '768w', '1280w', 'fetchpriority="high"', 'width="1280"', 'height="708"'],
    assets: [
      'public/images/pages/surrogate-compensation/hero-480.avif',
      'public/images/pages/surrogate-compensation/hero-768.avif',
      'public/images/pages/surrogate-compensation/hero-1280.avif',
      'public/images/pages/surrogate-compensation/hero-480.jpg',
      'public/images/pages/surrogate-compensation/hero-768.jpg',
    ],
  },
  {
    source: 'pages/(parents)/surrogacy-process.vue',
    markers: ['hero-480.jpg 480w', 'hero-768.jpg 768w', 'hero-1024.jpg 1024w', 'avif-srcset=', 'sizes="100vw"'],
    assets: [
      'public/images/pages/surrogacy-process/hero-480.avif',
      'public/images/pages/surrogacy-process/hero-768.avif',
      'public/images/pages/surrogacy-process/hero-480.jpg',
      'public/images/pages/surrogacy-process/hero-768.jpg',
      'public/images/pages/surrogacy-process/hero-1024.jpg',
    ],
  },
  {
    source: 'pages/blog/[id].vue',
    markers: ['fallback-hero-640.avif 640w', 'fallback-hero-960.avif 960w', 'fallback-hero-1600.avif 1600w', 'fallbackBlogJpegSrcset'],
    assets: [
      'public/images/pages/blog/fallback-hero-640.avif',
      'public/images/pages/blog/fallback-hero-960.avif',
      'public/images/pages/blog/fallback-hero-1600.avif',
      'public/images/pages/blog/fallback-hero-640.jpg',
      'public/images/pages/blog/fallback-hero-960.jpg',
    ],
  },
]

for (const check of checks) {
  const sourcePath = path.join(ROOT, check.source)
  const source = fs.readFileSync(sourcePath, 'utf8')
  for (const marker of check.markers) {
    if (!source.includes(marker))
      throw new Error(`${check.source} is missing responsive image marker: ${marker}`)
  }

  for (const relativeAssetPath of check.assets) {
    const assetPath = path.join(ROOT, relativeAssetPath)
    if (!fs.existsSync(assetPath) || fs.statSync(assetPath).size < 1024)
      throw new Error(`Missing or empty responsive image asset: ${relativeAssetPath}`)
  }
}

console.warn('Priority image verification passed: homepage, commercial, process, and blog fallback variants are wired.')

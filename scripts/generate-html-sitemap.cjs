const fs = require('fs');
const https = require('https');
const path = require('path');

const BLOG_API_URL = process.env.BLOG_API_URL || 'https://yunda-admin-system.yundasurrogacy.com/api/blog';
const BLOG_API_LIMIT = Number.parseInt(process.env.BLOG_API_LIMIT || '100', 10);
const OUTPUT_PATH = path.join(process.cwd(), 'public', 'sitemap.html');

const STATIC_SECTIONS_EN = [
  {
    title: 'General',
    links: [
      { href: '/', label: 'Home' },
      { href: '/about', label: 'About' },
      { href: '/surrogacy-cost', label: 'Surrogacy Cost' },
      { href: '/surrogacy-protection-california', label: 'Surrogacy Protection California' },
    ],
  },
  {
    title: 'Intended Parents',
    links: [
      { href: '/be-parents', label: 'Become a Parent' },
      { href: '/single-parents-lgbtq', label: 'Single Parents LGBTQ' },
      { href: '/surrogacy-price', label: 'Surrogacy Price' },
      { href: '/partner-ivf-clinics', label: 'Partner IVF Clinics' },
      { href: '/surrogacy-process', label: 'Surrogacy Process' },
      { href: '/egg-donation', label: 'Egg Donation' },
    ],
  },
  {
    title: 'Surrogacy Program',
    links: [
      { href: '/be-surrogate', label: 'Be a Surrogate' },
      { href: '/surrogate-qualification', label: 'Surrogate Qualification' },
      { href: '/benefit', label: 'Benefit' },
      { href: '/screening', label: 'Screening' },
      { href: '/eligibility', label: 'Eligibility' },
      { href: '/referral', label: 'Referral' },
      { href: '/journey', label: 'Journey' },
    ],
  },
  {
    title: 'Surrogate Resources',
    links: [
      { href: '/surrogate-requirements', label: 'Surrogate Requirements' },
      { href: '/surrogate-process', label: 'Surrogate Process' },
      { href: '/become-a-surrogate', label: 'Become a Surrogate' },
      { href: '/surrogate-compensation', label: 'Surrogate Compensation' },
      { href: '/become-surrogate-california', label: 'Become Surrogate California' },
      { href: '/california-surrogacy-consultation', label: 'California Surrogacy Consultation' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/privacy-policy', label: 'Privacy Policy' },
      { href: '/terms-of-service', label: 'Terms of Service' },
      { href: '/disclaimer', label: 'Disclaimer' },
    ],
  },
  {
    title: 'Utility',
    links: [
      { href: '/be-parents/thanks', label: 'Thank You' },
    ],
  },
];

const STATIC_SECTIONS_ZH = [
  {
    title: '常规',
    links: [
      { href: '/', label: '首页' },
      { href: '/about', label: '关于我们' },
      { href: '/surrogacy-cost', label: '代孕费用' },
      { href: '/surrogacy-protection-california', label: '加州代孕保障' },
    ],
  },
  {
    title: '准父母',
    links: [
      { href: '/be-parents', label: '成为父母' },
      { href: '/single-parents-lgbtq', label: '单亲与 LGBTQ 准父母' },
      { href: '/surrogacy-price', label: '代孕价格' },
      { href: '/partner-ivf-clinics', label: '合作 IVF 诊所' },
      { href: '/surrogacy-process', label: '代孕流程' },
      { href: '/egg-donation', label: '捐卵' },
    ],
  },
  {
    title: '代孕项目',
    links: [
      { href: '/be-surrogate', label: '成为代孕妈妈' },
      { href: '/surrogate-qualification', label: '代孕妈妈资格' },
      { href: '/benefit', label: '福利' },
      { href: '/screening', label: '筛选' },
      { href: '/eligibility', label: '资格条件' },
      { href: '/referral', label: '推荐计划' },
      { href: '/journey', label: '代孕旅程' },
    ],
  },
  {
    title: '代孕资源',
    links: [
      { href: '/surrogate-requirements', label: '代孕要求' },
      { href: '/surrogate-process', label: '代孕流程（妈妈端）' },
      { href: '/become-a-surrogate', label: '成为代孕妈妈' },
      { href: '/surrogate-compensation', label: '代孕补偿' },
      { href: '/become-surrogate-california', label: '加州成为代孕妈妈' },
      { href: '/california-surrogacy-consultation', label: '加州代孕咨询' },
    ],
  },
  {
    title: '法律',
    links: [
      { href: '/privacy-policy', label: '隐私政策' },
      { href: '/terms-of-service', label: '服务条款' },
      { href: '/disclaimer', label: '免责声明' },
    ],
  },
  {
    title: '工具',
    links: [
      { href: '/be-parents/thanks', label: '感谢页' },
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 400) {
            reject(new Error(`Request failed: ${res.statusCode} ${res.statusMessage || ''}`.trim()));
            return;
          }
          try {
            resolve(JSON.parse(data));
          }
          catch (error) {
            reject(error);
          }
        });
      })
      .on('error', reject);
  });
}

async function fetchAllBlogs() {
  const allBlogs = [];
  let page = 1;
  let totalPages = 1;

  do {
    const url = `${BLOG_API_URL}?page=${page}&limit=${BLOG_API_LIMIT}`;
    const response = await fetchJson(url);
    const blogs = Array.isArray(response?.blogs) ? response.blogs : [];
    allBlogs.push(...blogs);

    const pagination = response?.pagination || {};
    totalPages = Number.parseInt(pagination.totalPages || totalPages, 10);

    if (pagination.hasNextPage === false) {
      break;
    }

    page += 1;
  } while (page <= totalPages);

  return allBlogs;
}

function renderSection(section) {
  const items = section.links
    .map((link) => `            <li><a href="${escapeHtml(link.href)}">${escapeHtml(link.label)}</a></li>`)
    .join('\n');

  const note = section.note
    ? `          <p class="note">${escapeHtml(section.note)}</p>`
    : '';
  const className = section.className ? ` class="${escapeHtml(section.className)}"` : '';

  return [
    `        <section${className}>`,
    `          <h2>${escapeHtml(section.title)}</h2>`,
    '          <ul>',
    items,
    '          </ul>',
    note,
    '        </section>',
  ].filter(Boolean).join('\n');
}

function renderLanguageBlock(language) {
  const sectionsHtml = language.sections.map(renderSection).join('\n');
  return [
    '      <div class="language-block">',
    `        <h2 class="language-title">${escapeHtml(language.title)}</h2>`,
    `        <p class="language-subtitle">${escapeHtml(language.subtitle)}</p>`,
    '        <div class="grid">',
    sectionsHtml,
    '        </div>',
    '      </div>',
  ].join('\n');
}

function buildHtml(languageBlocks) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>HTML站点地图 | HTML Sitemap</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f7f5f0;
        --card: #ffffff;
        --text: #222222;
        --muted: #666666;
        --accent: #0f5a45;
        --border: #e2ddd4;
      }
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        font-family: "Source Serif 4", Georgia, "Times New Roman", serif;
        color: var(--text);
        background: radial-gradient(circle at top left, #ffffff, var(--bg));
      }
      header {
        padding: 32px 20px 12px;
        text-align: center;
      }
      h1 {
        margin: 0 0 6px;
        font-size: 28px;
        letter-spacing: 0.5px;
      }
      header p {
        margin: 0;
        color: var(--muted);
        font-size: 14px;
      }
      main {
        max-width: 1960px;
        margin: 0 auto;
        padding: 16px 20px 40px;
      }
      .language-block + .language-block {
        margin-top: 28px;
      }
      .language-title {
        margin: 0;
        font-size: 22px;
        color: var(--accent);
      }
      .language-subtitle {
        margin: 6px 0 16px;
        color: var(--muted);
        font-size: 13px;
      }
      .grid {
        display: block;
      }
      @media (max-width: 900px) {
        section ul {
          columns: 1;
        }
      }
      section {
        margin-bottom: 28px;
        padding: 0;
        background: transparent;
        border: 0;
        box-shadow: none;
      }
      section:last-child {
        margin-bottom: 0;
      }
      h2 {
        margin: 0 0 10px;
        font-size: 20px;
        color: var(--accent);
      }
      ul {
        margin: 0;
        padding: 0;
        list-style: none;
        columns: 2;
        column-gap: 120px;
      }
      li + li {
        margin-top: 12px;
      }
      li {
        break-inside: avoid;
        padding-right: 12px;
        font-size: 18px;
        line-height: 1.6;
      }
      a {
        color: var(--text);
        text-decoration: none;
      }
      a:hover {
        color: var(--accent);
        text-decoration: underline;
      }
      .note {
        margin-top: 18px;
        color: var(--muted);
        font-size: 13px;
      }
      footer {
        text-align: center;
        color: var(--muted);
        font-size: 12px;
        padding: 12px 0 32px;
      }
    </style>
  </head>
  <body>
    <!-- Generated by scripts/generate-html-sitemap.cjs -->
    <header>
      <h1>HTML站点地图</h1>
      <p>HTML Sitemap (English + 中文) | Organized by page type / 按页面类型分类</p>
    </header>
    <main>
${languageBlocks.join('\n')}
    </main>
    <footer>Yunda Surrogacy HTML sitemap</footer>
  </body>
</html>
`;
}

async function run() {
  const blogs = await fetchAllBlogs();
  const blogLinksEn = blogs.map((blog) => {
    const slugValue = blog.route_id || blog.id;
    const slug = String(slugValue).trim();
    const label = String(blog.en_title || blog.title || `Blog ${slug}`).trim();
    return { href: `/blog/${slug}`, label };
  });
  const blogLinksZh = blogs.map((blog) => {
    const slugValue = blog.route_id || blog.id;
    const slug = String(slugValue).trim();
    const label = String(blog.title || blog.en_title || `博客 ${slug}`).trim();
    return { href: `/blog/${slug}`, label };
  });

  const blogSectionEn = {
    title: 'Blog',
    links: [{ href: '/blog', label: 'Blog Index' }, ...blogLinksEn],
    note: `Posts fetched from API: ${blogLinksEn.length} items.`,
    className: 'section-blog',
  };
  const blogSectionZh = {
    title: '博客',
    links: [{ href: '/blog', label: '博客列表' }, ...blogLinksZh],
    note: `从接口获取文章：${blogLinksZh.length}篇。`,
    className: 'section-blog',
  };

  const sectionsEn = [
    STATIC_SECTIONS_EN[0],
    STATIC_SECTIONS_EN[1],
    STATIC_SECTIONS_EN[2],
    STATIC_SECTIONS_EN[3],
    blogSectionEn,
    STATIC_SECTIONS_EN[4],
    STATIC_SECTIONS_EN[5],
  ];
  const sectionsZh = [
    STATIC_SECTIONS_ZH[0],
    STATIC_SECTIONS_ZH[1],
    STATIC_SECTIONS_ZH[2],
    STATIC_SECTIONS_ZH[3],
    blogSectionZh,
    STATIC_SECTIONS_ZH[4],
    STATIC_SECTIONS_ZH[5],
  ];

  const languageBlocks = [
    renderLanguageBlock({
      title: 'English',
      subtitle: 'Organized by page type',
      sections: sectionsEn,
    }),
    renderLanguageBlock({
      title: '中文',
      subtitle: '按页面类型分类',
      sections: sectionsZh,
    }),
  ];

  const html = buildHtml(languageBlocks);
  fs.writeFileSync(OUTPUT_PATH, html, 'utf8');
  console.log(`HTML sitemap updated: ${OUTPUT_PATH}`);
}

run().catch((error) => {
  console.error('Failed to generate HTML sitemap:', error);
  process.exit(1);
});

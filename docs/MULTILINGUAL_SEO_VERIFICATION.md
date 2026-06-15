# 多语言 SEO 验证指南

本项目使用 Nuxt i18n 的 `prefix_except_default` 策略：

- 英文默认语言：无 URL 前缀，例如 `https://www.yundasurrogacy.com/about`
- 中文语言：`/zh` 前缀，例如 `https://www.yundasurrogacy.com/zh/about`
- XML sitemap index：`https://www.yundasurrogacy.com/sitemap.xml`
- 英文 sitemap：`https://www.yundasurrogacy.com/sitemap-en.xml`
- 中文 sitemap：`https://www.yundasurrogacy.com/sitemap-zh.xml`

## 1. HTML Head 验证

### 1.1 hreflang

英文页面应包含：

```html
<link rel="alternate" hreflang="en-US" href="https://www.yundasurrogacy.com/about">
<link rel="alternate" hreflang="zh-CN" href="https://www.yundasurrogacy.com/zh/about">
<link rel="alternate" hreflang="x-default" href="https://www.yundasurrogacy.com/about">
```

中文页面应包含同一组互相指向的 alternate URL。

### 1.2 HTML lang

- 英文页面：`<html lang="en-US">`
- 中文页面：`<html lang="zh-CN">`

### 1.3 Canonical

- 英文页面：`<link rel="canonical" href="https://www.yundasurrogacy.com/about">`
- 中文页面：`<link rel="canonical" href="https://www.yundasurrogacy.com/zh/about">`

每个语言版本必须自引用 canonical，不能把中文 canonical 到英文。

## 2. XML Sitemap 验证

### 2.1 Sitemap Index

访问：

```text
https://www.yundasurrogacy.com/sitemap.xml
```

应包含：

```xml
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://www.yundasurrogacy.com/sitemap-en.xml</loc>
  </sitemap>
  <sitemap>
    <loc>https://www.yundasurrogacy.com/sitemap-zh.xml</loc>
  </sitemap>
</sitemapindex>
```

### 2.2 语言 Sitemap

访问：

```text
https://www.yundasurrogacy.com/sitemap-en.xml
https://www.yundasurrogacy.com/sitemap-zh.xml
```

每个 `<urlset>` 应包含 `xmlns:xhtml="http://www.w3.org/1999/xhtml"`。

每个 URL 应包含完整 hreflang alternate，例如：

```xml
<url>
  <loc>https://www.yundasurrogacy.com/about</loc>
  <xhtml:link rel="alternate" hreflang="en-US" href="https://www.yundasurrogacy.com/about" />
  <xhtml:link rel="alternate" hreflang="zh-CN" href="https://www.yundasurrogacy.com/zh/about" />
  <xhtml:link rel="alternate" hreflang="x-default" href="https://www.yundasurrogacy.com/about" />
</url>
```

## 3. 结构化数据语言验证

中文页面 JSON-LD 不应混入 `"inLanguage":"en-US"`。

重点检查：

- `/zh/surrogacy-cost`
- `/zh/surrogacy-process`
- `/zh/surrogate-requirements`
- `/zh/benefit`
- `/zh/journey`
- `/zh/screening`

## 4. 命令行验证

```bash
# HTML hreflang
curl -s https://www.yundasurrogacy.com/about | grep -i "hreflang"
curl -s https://www.yundasurrogacy.com/zh/about | grep -i "hreflang"

# Canonical
curl -s https://www.yundasurrogacy.com/about | grep -i "canonical"
curl -s https://www.yundasurrogacy.com/zh/about | grep -i "canonical"

# Sitemap index
curl -s https://www.yundasurrogacy.com/sitemap.xml | grep -i "sitemap-"

# Sitemap hreflang
curl -s https://www.yundasurrogacy.com/sitemap-en.xml | grep -i "xhtml:link" | head
curl -s https://www.yundasurrogacy.com/sitemap-zh.xml | grep -i "xhtml:link" | head

# JSON-LD language smoke check
curl -s https://www.yundasurrogacy.com/zh/surrogacy-cost | grep -o '"inLanguage":"[^"]*"' | sort | uniq -c
```

## 5. Search Console 提交

提交 sitemap index：

```text
https://www.yundasurrogacy.com/sitemap.xml
```

不需要单独提交旧路径 `/sitemap_index.xml` 或 `/__sitemap__/...`，这些不是当前项目生成的 sitemap URL。

## 6. 验证清单

- [ ] 每个页面都有正确的 `html lang`
- [ ] 每个 indexable 页面有且仅有一个 canonical
- [ ] 英文页面 canonical 到英文 URL
- [ ] 中文页面 canonical 到 `/zh` URL
- [ ] HTML head 包含 `en-US`、`zh-CN`、`x-default`
- [ ] sitemap index 可访问
- [ ] `sitemap-en.xml` 和 `sitemap-zh.xml` 可访问
- [ ] sitemap URL 节点包含 `xhtml:link`
- [ ] 中文页面 JSON-LD 使用 `zh-CN`
- [ ] noindex 页面不进入 XML sitemap

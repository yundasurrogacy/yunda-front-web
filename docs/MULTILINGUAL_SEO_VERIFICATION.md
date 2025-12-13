# 多语言 SEO 验证指南

## 1. 检查 HTML Head 标签

### 1.1 验证 hreflang 标签

访问页面后，查看页面源代码（右键 -> 查看源代码），检查 `<head>` 部分应该包含：

```html
<link rel="alternate" hreflang="en-US" href="https://www.yundasurrogacy.com/about" />
<link rel="alternate" hreflang="zh-CN" href="https://www.yundasurrogacy.com/zh/about" />
<link rel="alternate" hreflang="x-default" href="https://www.yundasurrogacy.com/about" />
```

**验证步骤：**

1. 访问英文页面：`https://www.yundasurrogacy.com/about`
   - 应包含指向英文和中文版本的 hreflang 标签
   - x-default 应指向英文版本

2. 访问中文页面：`https://www.yundasurrogacy.com/zh/about`
   - 应包含指向英文和中文版本的 hreflang 标签
   - x-default 应指向英文版本

### 1.2 验证 HTML lang 属性

检查 `<html>` 标签的 `lang` 属性：

- 英文页面：`<html lang="en">`
- 中文页面：`<html lang="zh">`

### 1.3 验证 Canonical URL

检查 `<link rel="canonical">` 标签：

- 英文页面：`<link rel="canonical" href="https://www.yundasurrogacy.com/about" />`
- 中文页面：`<link rel="canonical" href="https://www.yundasurrogacy.com/zh/about" />`

## 2. 验证 Sitemap

### 2.1 检查 Sitemap Index

访问：`https://www.yundasurrogacy.com/sitemap_index.xml`

应该看到：

```xml
<sitemapindex>
    <sitemap>
        <loc>https://www.yundasurrogacy.com/__sitemap__/zh-CN.xml</loc>
    </sitemap>
    <sitemap>
        <loc>https://www.yundasurrogacy.com/__sitemap__/en-US.xml</loc>
    </sitemap>
</sitemapindex>
```

### 2.2 检查语言特定的 Sitemap

- 英文 Sitemap：`https://www.yundasurrogacy.com/__sitemap__/en-US.xml`
- 中文 Sitemap：`https://www.yundasurrogacy.com/__sitemap__/zh-CN.xml`

每个 sitemap 应该包含相应语言的所有页面。

### 2.3 检查 hreflang 在 Sitemap 中

每个 URL 应该包含 `xhtml:link` 标签指向其他语言版本。

## 3. 验证 URL 结构

### 3.1 英文页面（默认语言，无前缀）

- ✅ `https://www.yundasurrogacy.com/`
- ✅ `https://www.yundasurrogacy.com/about`
- ✅ `https://www.yundasurrogacy.com/become-a-surrogate`

### 3.2 中文页面（带 /zh 前缀）

- ✅ `https://www.yundasurrogacy.com/zh`
- ✅ `https://www.yundasurrogacy.com/zh/about`
- ✅ `https://www.yundasurrogacy.com/zh/become-a-surrogate`

## 4. 使用在线工具验证

### 4.1 Google Search Console

1. 登录 Google Search Console
2. 提交 sitemap：`https://www.yundasurrogacy.com/sitemap_index.xml`
3. 检查"索引覆盖率"报告
4. 使用"URL 检查"工具验证单个页面

### 4.2 在线 hreflang 检查工具

- **hreflang Tags Testing Tool**: https://technicalseo.com/tools/hreflang/
- **Merkle Hreflang Tool**: https://technicalseo.com/tools/hreflang/
- **XML Sitemap Validator**: https://www.xml-sitemaps.com/validate-xml-sitemap.html

### 4.3 浏览器扩展工具

- **SEO META in 1 CLICK** (Chrome 扩展)
- **hreflang Tags Viewer** (Chrome 扩展)

## 5. 命令行验证

### 5.1 检查 hreflang 标签

```bash
# 检查英文页面
curl -s https://www.yundasurrogacy.com/about | grep -i "hreflang"

# 检查中文页面
curl -s https://www.yundasurrogacy.com/zh/about | grep -i "hreflang"
```

### 5.2 检查 HTML lang 属性

```bash
curl -s https://www.yundasurrogacy.com/about | grep -i "html lang"
curl -s https://www.yundasurrogacy.com/zh/about | grep -i "html lang"
```

### 5.3 检查 Canonical URL

```bash
curl -s https://www.yundasurrogacy.com/about | grep -i "canonical"
curl -s https://www.yundasurrogacy.com/zh/about | grep -i "canonical"
```

## 6. 验证清单

### ✅ 必须检查的项目

- [ ] 每个页面都有正确的 `html lang` 属性
- [ ] 每个页面都有 `canonical` 标签
- [ ] 每个页面都有 `hreflang` 标签指向所有语言版本
- [ ] `x-default` 指向默认语言（英文）
- [ ] Sitemap 包含所有语言版本的页面
- [ ] 每个语言的 sitemap 都是可访问的
- [ ] URL 结构正确（英文无前缀，中文有 `/zh` 前缀）
- [ ] 语言切换链接工作正常
- [ ] 内部链接使用 `localePath` 保留语言前缀

### ✅ Google Search Console 验证

- [ ] 提交了 `sitemap_index.xml`
- [ ] Sitemap 被成功读取
- [ ] 没有 hreflang 错误
- [ ] 所有语言版本都被索引

## 7. 常见问题排查

### 问题 1: hreflang 标签缺失

**解决**: 检查 `app.vue` 中的 `hreflangLinks` computed 是否正确生成

### 问题 2: 错误的 URL 路径

**解决**: 检查 `basePath` 计算逻辑，确保正确处理 `/zh` 前缀

### 问题 3: Sitemap 不包含所有页面

**解决**: 检查 `nuxt.config.ts` 中的 `staticPages` 和 `urls` 配置

### 问题 4: Canonical URL 错误

**解决**: 检查 `canonicalUrl` computed 是否正确生成完整 URL

## 8. 自动化验证脚本

创建一个简单的验证脚本来自动检查这些项目。

<script setup lang="ts">
import AppFooter from '@/components/base/AppFooter.vue'
import AppHeader from '@/components/base/AppHeader.vue'
import sitemapData from '@/data/sitemap-data.json'

const { locale } = useI18n()
const sections = computed(() => {
  const data = sitemapData?.sections || { en: [], zh: [] }
  return locale.value === 'zh' ? data.zh : data.en
})

const pageTitle = computed(() => (locale.value === 'zh' ? '网站地图' : 'Sitemap'))
const pageSubtitle = computed(() =>
  locale.value === 'zh' ? '网站地图 | 按页面类型分类' : 'Sitemap | Organized by page type',
)

useHead(() => ({
  title: `${pageTitle.value} | Sitemap`,
}))
</script>

<template>
  <div class="sitemap-page">
    <AppHeader />
    <main class="sitemap-main">
      <div class="sitemap-container">
        <header class="sitemap-header">
          <h1>{{ pageTitle }}</h1>
          <p>{{ pageSubtitle }}</p>
        </header>

        <div class="grid">
          <section
            v-for="section in sections"
            :key="section.title"
            :class="section.className"
          >
            <h3>{{ section.title }}</h3>
            <ul>
              <li v-for="link in section.links" :key="link.href">
                <NuxtLink :to="link.href">
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
            <p v-if="section.note" class="note">
              {{ section.note }}
            </p>
          </section>
        </div>
      </div>
    </main>
    <AppFooter />
  </div>
</template>

<style scoped>
.sitemap-page {
  background: var(--yunda-petal);
  color: var(--yunda-bark);
}

.sitemap-main {
  padding: 24px 0 48px;
}

.sitemap-container {
  max-width: 980px;
  margin: 0 auto;
  padding: 0 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', Arial, sans-serif;
}

.sitemap-header {
  padding: 12px 0 16px;
  text-align: center;
}

.sitemap-header h1 {
  margin: 0 0 6px;
  font-size: 30px;
  font-weight: 600;
  letter-spacing: 0.2px;
}

.sitemap-header p {
  margin: 0;
  font-size: 14px;
  color: rgba(39, 31, 24, 0.6);
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  column-gap: 80px;
  row-gap: 24px;
}

@media (max-width: 900px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }
}

section {
  margin: 0;
}

h3 {
  margin: 0 0 10px;
  font-size: 18px;
  font-weight: 600;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

li + li {
  margin-top: 12px;
}

li {
  padding-right: 12px;
  font-size: 18px;
  line-height: 1.7;
}

.section-blog {
  grid-column: 1 / -1;
}

.section-blog ul {
  columns: 2;
  column-gap: 80px;
}

@media (max-width: 600px) {
  .section-blog ul {
    columns: 1;
  }
}

.note {
  margin-top: 18px;
  font-size: 12px;
  color: rgba(39, 31, 24, 0.6);
}

a {
  color: #0066cc;
  text-decoration: underline;
}
</style>

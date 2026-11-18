<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface TeamMember {
  id: string
  title: string
  jobTitle: string
  summary: string
  paragraphs: string[]
  image?: string
  imageAlt?: string
}

const props = defineProps<{ members: TeamMember[] }>()
const { locale } = useI18n()
const isZh = computed(() => (locale.value || '').startsWith('zh'))
const tt = (en: string, zh: string) => (isZh.value ? zh : en)
const founder = computed(() => props.members[0])
const leadership = computed(() => props.members.slice(1))
const expandedMemberIds = ref<Set<string>>(new Set())

function isExpanded(memberId: string) {
  return expandedMemberIds.value.has(memberId)
}

function toggleBio(memberId: string) {
  const nextIds = new Set(expandedMemberIds.value)
  if (nextIds.has(memberId))
    nextIds.delete(memberId)
  else
    nextIds.add(memberId)
  expandedMemberIds.value = nextIds
}
</script>

<template>
  <section class="team-section bg-[var(--yunda-petal)] px-5 py-12 lg:px-20 lg:py-20">
    <div class="mx-auto max-w-300 w-full">
      <h2 class="founder-section-title">
        {{ tt('Founder & CEO', '创始人兼首席执行官') }}
      </h2>

      <article v-if="founder" :id="founder.id" class="founder-card">
        <header class="founder-heading">
          <h3 class="founder-name">
            {{ founder.title }}
          </h3>
          <p class="member-title">
            {{ founder.jobTitle }}
          </p>
        </header>
        <div class="founder-bio member-bio">
          <p class="founder-summary">
            {{ founder.summary }}
          </p>
          <button
            class="bio-toggle"
            type="button"
            :aria-controls="`${founder.id}-bio`"
            :aria-expanded="isExpanded(founder.id)"
            @click="toggleBio(founder.id)"
          >
            {{ isExpanded(founder.id) ? tt('Show less', '收起介绍') : tt('Read full bio', '查看完整介绍') }}
            <span aria-hidden="true">{{ isExpanded(founder.id) ? '−' : '+' }}</span>
          </button>
          <div v-show="isExpanded(founder.id)" :id="`${founder.id}-bio`" class="full-bio">
            <p v-for="(paragraph, index) in founder.paragraphs" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </article>

      <section class="team-group" aria-labelledby="leadership-heading">
        <h2 id="leadership-heading" class="team-group-heading">
          {{ tt('Leadership', '管理团队') }}
        </h2>
        <div class="team-grid">
          <article v-for="member in leadership" :id="member.id" :key="member.id" class="member-card">
            <div v-if="member.image" class="member-portrait">
              <img
                :src="member.image"
                :alt="member.imageAlt"
                width="1080"
                height="1080"
                loading="lazy"
                decoding="async"
              >
            </div>
            <div class="member-copy">
              <header>
                <h3 class="member-name">
                  {{ member.title }}
                </h3>
                <p class="member-title">
                  {{ member.jobTitle }}
                </p>
              </header>
              <p class="member-bio member-summary">
                {{ member.summary }}
              </p>
              <button
                class="bio-toggle"
                type="button"
                :aria-controls="`${member.id}-bio`"
                :aria-expanded="isExpanded(member.id)"
                @click="toggleBio(member.id)"
              >
                {{ isExpanded(member.id) ? tt('Show less', '收起介绍') : tt('Read full bio', '查看完整介绍') }}
                <span aria-hidden="true">{{ isExpanded(member.id) ? '−' : '+' }}</span>
              </button>
            </div>
            <div v-show="isExpanded(member.id)" :id="`${member.id}-bio`" class="member-bio full-bio member-full-bio">
              <p v-for="(paragraph, index) in member.paragraphs" :key="index">
                {{ paragraph }}
              </p>
            </div>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<style scoped>
.founder-card,
.member-card {
  scroll-margin-top: 10rem;
}

.founder-section-title,
.team-group-heading {
  color: var(--yunda-bark);
  font-family: var(--font-display);
  font-size: clamp(2rem, 3vw, 2.8rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.15;
}

.founder-section-title {
  margin-bottom: 1.25rem;
}

.founder-card {
  display: grid;
  gap: 1.75rem;
  border-block: 1px solid color-mix(in srgb, var(--yunda-bark) 16%, transparent);
  padding-block: clamp(2rem, 4vw, 3rem);
}

.founder-name {
  color: var(--yunda-bark);
  font-family: var(--font-display);
  font-size: clamp(2.5rem, 4.2vw, 4rem);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.founder-summary {
  font-size: clamp(1.05rem, 1.45vw, 1.2rem);
}

.team-group-heading {
  padding-block: clamp(2.5rem, 4vw, 3.5rem) 2rem;
}

.team-grid {
  display: grid;
  align-items: start;
  gap: 2rem;
}

.member-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 1.5rem;
  border: 1px solid color-mix(in srgb, var(--yunda-bark) 15%, transparent);
  border-radius: 1.25rem;
  background: color-mix(in srgb, white 60%, var(--yunda-petal));
  padding: clamp(1.25rem, 2vw, 1.75rem);
}

.member-portrait {
  width: 100%;
  max-width: 20rem;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 0.9rem;
}

.member-portrait img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 28%;
}

.member-copy,
.founder-heading,
.founder-bio {
  min-width: 0;
}

.member-name {
  color: var(--yunda-bark);
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 2.4vw, 2.3rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.1;
}

.member-title {
  margin-top: 0.75rem;
  color: var(--yunda-maple);
  font-family: var(--font-text);
  font-size: 0.95rem;
  font-weight: 600;
  line-height: 1.5;
}

.member-bio {
  color: color-mix(in srgb, var(--yunda-bark) 88%, transparent);
  font-family: var(--font-text);
  font-size: 1rem;
  line-height: 1.8;
}

.member-summary {
  margin-top: 1rem;
}

.full-bio {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid color-mix(in srgb, var(--yunda-bark) 12%, transparent);
}

.full-bio p + p {
  margin-top: 1rem;
}

.member-full-bio {
  grid-column: 1 / -1;
  margin-top: 0;
}

.bio-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-height: 2.75rem;
  margin-top: 1rem;
  color: var(--yunda-bark);
  font-family: var(--font-text);
  font-size: 0.95rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 0.28em;
  transition: color 200ms ease;
}

.bio-toggle:hover {
  color: var(--yunda-maple);
}

.bio-toggle:focus-visible {
  border-radius: 0.2rem;
  outline: 2px solid var(--yunda-maple);
  outline-offset: 4px;
}

@media (min-width: 640px) {
  .member-card {
    grid-template-columns: minmax(12rem, 0.85fr) minmax(0, 1fr);
  }
}

@media (min-width: 1024px) {
  .founder-card {
    grid-template-columns: minmax(0, 0.8fr) minmax(0, 1.2fr);
    gap: 3rem;
  }

  .founder-bio {
    border-left: 1px solid color-mix(in srgb, var(--yunda-bark) 16%, transparent);
    padding-left: 3rem;
  }

  .team-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .member-card {
    grid-template-columns: minmax(0, 1fr);
  }

  .member-portrait {
    max-width: none;
    aspect-ratio: 4 / 3;
  }
}

@media (min-width: 1280px) {
  .member-card {
    grid-template-columns: minmax(13rem, 0.85fr) minmax(0, 1fr);
  }

  .member-portrait {
    aspect-ratio: 3 / 4;
  }
}
</style>

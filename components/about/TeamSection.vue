<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

interface TeamMember {
  key: string
  id: string
  paragraphCount: number
  image?: { src: string, width: number, height: number }
}

const teamMembers: TeamMember[] = [
  { key: 'kareZhang', id: 'kare-zhang', paragraphCount: 4 },
  {
    key: 'kaylaLuo',
    id: 'kayla-luo',
    paragraphCount: 4,
    image: { src: '/images/pages/about/kayla-luo-2026.png', width: 1086, height: 1448 },
  },
  {
    key: 'michaelSim',
    id: 'michael-sim',
    paragraphCount: 4,
    image: { src: '/images/pages/about/michael-sim-2026.png', width: 1086, height: 1448 },
  },
  { key: 'claraChen', id: 'clara-chen', paragraphCount: 3 },
  {
    key: 'moonLiang',
    id: 'moon-liang',
    paragraphCount: 3,
    image: { src: '/images/pages/about/moon-liang-2026.png', width: 1086, height: 1448 },
  },
  {
    key: 'celiaChen',
    id: 'celia-chen',
    paragraphCount: 3,
    image: { src: '/images/pages/about/celia-chen-2026.png', width: 1086, height: 1448 },
  },
]

const founder = teamMembers[0]
const leadership = teamMembers.slice(1)
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

const { initScrollAnimation } = useScrollAnimation()

onMounted(() => {
  initScrollAnimation()
})
</script>

<template>
  <section class="team-section bg-[var(--yunda-petal)] px-5 py-10 lg:px-20 lg:py-24">
    <div class="mx-auto w-full max-w-300">
      <article :id="founder.id" class="founder-card">
        <header class="founder-heading slide-left">
          <p class="section-label">
            {{ $t('about.team.founder') }}
          </p>
          <h2 class="founder-name">
            {{ $t(`about.team.${founder.key}.name`) }}
          </h2>
          <p class="member-title">
            {{ $t(`about.team.${founder.key}.title`) }}
          </p>
        </header>

        <div class="founder-bio member-bio slide-right">
          <p
            v-for="paragraphIndex in founder.paragraphCount"
            :key="paragraphIndex"
          >
            {{ $t(`about.team.${founder.key}.bio.paragraph${paragraphIndex}`) }}
          </p>
        </div>
      </article>

      <div class="leadership-heading">
        <p class="section-label">
          {{ $t('about.team.ourTeam') }}
        </p>
        <h2>{{ $t('about.team.leadership') }}</h2>
      </div>

      <div class="leadership-grid">
        <article
          v-for="member in leadership"
          :id="member.id"
          :key="member.id"
          class="member-card"
          :class="{ 'member-card--without-image': !member.image }"
        >
          <div v-if="member.image" class="member-portrait slide-left">
            <img
              :src="member.image.src"
              :alt="$t(`about.team.${member.key}.imageAlt`)"
              :width="member.image.width"
              :height="member.image.height"
              loading="lazy"
              decoding="async"
            >
          </div>

          <div class="member-copy slide-right">
            <header>
              <h3 class="member-name">
                {{ $t(`about.team.${member.key}.name`) }}
              </h3>
              <p class="member-title member-title--badge">
                {{ $t(`about.team.${member.key}.title`) }}
              </p>
            </header>

            <div :id="`${member.id}-bio`" class="member-bio member-card-bio">
              <template v-if="isExpanded(member.id)">
                <p
                  v-for="paragraphIndex in member.paragraphCount"
                  :key="paragraphIndex"
                >
                  {{ $t(`about.team.${member.key}.bio.paragraph${paragraphIndex}`) }}
                </p>
              </template>
              <p v-else class="bio-preview">
                {{ $t(`about.team.${member.key}.bio.paragraph1`) }}
              </p>
            </div>

            <button
              class="bio-toggle"
              type="button"
              :aria-controls="`${member.id}-bio`"
              :aria-expanded="isExpanded(member.id)"
              @click="toggleBio(member.id)"
            >
              {{ isExpanded(member.id) ? $t('about.team.showLess') : $t('about.team.readFullBio') }}
            </button>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.founder-card,
.member-card {
  scroll-margin-top: 7rem;
}

.founder-card {
  display: grid;
  gap: clamp(2rem, 5vw, 5rem);
  border-block: 1px solid color-mix(in srgb, var(--yunda-bark) 14%, transparent);
  padding-block: clamp(3rem, 5vw, 4.75rem);
}

.section-label {
  color: var(--yunda-maple);
  font-family: var(--font-text);
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.founder-name {
  margin-top: 0.85rem;
  color: var(--yunda-bark);
  font-family: var(--font-display);
  font-size: clamp(2.4rem, 4vw, 4rem);
  font-weight: 600;
  letter-spacing: -0.035em;
  line-height: 1;
}

.leadership-heading {
  padding-block: clamp(3.5rem, 6vw, 6rem) clamp(2rem, 3vw, 3rem);
}

.leadership-heading h2 {
  margin-top: 0.65rem;
  color: var(--yunda-bark);
  font-family: var(--font-display);
  font-size: clamp(2.25rem, 4vw, 3.75rem);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.05;
}

.leadership-grid {
  display: grid;
  gap: clamp(2.5rem, 5vw, 5rem) clamp(2rem, 4vw, 4rem);
}

.member-card {
  display: grid;
  grid-template-columns: minmax(7.5rem, 9.5rem) minmax(0, 1fr);
  gap: clamp(1.25rem, 2.5vw, 2.25rem);
  align-items: start;
  border-top: 1px solid color-mix(in srgb, var(--yunda-bark) 13%, transparent);
  padding-top: 2rem;
}

.member-card--without-image {
  grid-template-columns: minmax(0, 1fr);
}

.member-portrait {
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 1.25rem;
  background: white;
  box-shadow: 0 1rem 2.5rem color-mix(in srgb, var(--yunda-bark) 9%, transparent);
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
  font-size: clamp(1.7rem, 2.4vw, 2.3rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.05;
  text-wrap: balance;
}

.member-title {
  margin-top: 0.65rem;
  color: var(--yunda-maple);
  font-family: var(--font-text);
  font-size: clamp(0.88rem, 1.1vw, 1rem);
  font-weight: 700;
  line-height: 1.4;
  text-wrap: pretty;
}

.member-title--badge {
  display: inline-block;
  width: fit-content;
  border-radius: 0.5rem;
  background: color-mix(in srgb, var(--yunda-sage) 42%, white);
  padding: 0.3rem 0.65rem;
  color: var(--yunda-bark);
}

.member-bio {
  color: color-mix(in srgb, var(--yunda-bark) 84%, transparent);
  font-family: var(--font-text);
  font-size: clamp(0.94rem, 1.05vw, 1rem);
  line-height: 1.72;
}

.member-card-bio {
  margin-top: 1.15rem;
}

.member-bio p + p {
  margin-top: 0.9rem;
}

.bio-preview {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
}

.bio-toggle {
  margin-top: 1rem;
  color: var(--yunda-bark);
  font-family: var(--font-text);
  font-size: 0.95rem;
  font-weight: 700;
  text-decoration: underline;
  text-decoration-thickness: 1px;
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

@media (min-width: 1024px) {
  .founder-card {
    grid-template-columns: minmax(15rem, 0.65fr) minmax(0, 1.6fr);
    align-items: start;
  }

  .leadership-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 767px) {
  .member-card {
    grid-template-columns: 7rem minmax(0, 1fr);
  }

  .member-card--without-image {
    grid-template-columns: minmax(0, 1fr);
  }
}

@media (max-width: 479px) {
  .member-card {
    grid-template-columns: 1fr;
  }

  .member-portrait {
    width: min(54vw, 10rem);
  }
}
</style>

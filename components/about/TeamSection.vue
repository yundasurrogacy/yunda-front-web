<script setup lang="ts">
import { onMounted } from 'vue'
import { useScrollAnimation } from '@/composables/useScrollAnimation'

interface TeamMember {
  key: string
  id: string
  paragraphCount: number
  image?: {
    src: string
    width: number
    height: number
    side: 'left' | 'right'
  }
}

const teamMembers: TeamMember[] = [
  { key: 'kareZhang', id: 'kare-zhang', paragraphCount: 4 },
  {
    key: 'kaylaLuo',
    id: 'kayla-luo',
    paragraphCount: 4,
    image: {
      src: '/images/pages/about/kayla-luo-2026.png',
      width: 1086,
      height: 1448,
      side: 'left',
    },
  },
  {
    key: 'michaelSim',
    id: 'michael-sim',
    paragraphCount: 4,
    image: {
      src: '/images/pages/about/michael-sim-2026.png',
      width: 1086,
      height: 1448,
      side: 'right',
    },
  },
  { key: 'claraChen', id: 'clara-chen', paragraphCount: 3 },
  {
    key: 'moonLiang',
    id: 'moon-liang',
    paragraphCount: 3,
    image: {
      src: '/images/pages/about/moon-liang-2026.png',
      width: 1086,
      height: 1448,
      side: 'left',
    },
  },
  {
    key: 'celiaChen',
    id: 'celia-chen',
    paragraphCount: 3,
    image: {
      src: '/images/pages/about/celia-chen-2026.png',
      width: 1086,
      height: 1448,
      side: 'right',
    },
  },
]

const { initScrollAnimation } = useScrollAnimation()

onMounted(() => {
  initScrollAnimation()
})
</script>

<template>
  <section class="team-section bg-[var(--yunda-petal)] px-5 py-10 lg:px-20 lg:py-24">
    <div class="mx-auto w-full max-w-300">
      <article
        v-for="member in teamMembers"
        :id="member.id"
        :key="member.id"
        class="team-member"
        :class="member.image ? 'team-member--portrait' : 'team-member--text'"
        :data-image-side="member.image?.side"
      >
        <div
          v-if="member.image"
          class="member-portrait slide-left"
        >
          <img
            :src="member.image.src"
            :alt="$t(`about.team.${member.key}.imageAlt`)"
            class="h-full w-full object-cover"
            :width="member.image.width"
            :height="member.image.height"
            loading="lazy"
            decoding="async"
          >
        </div>

        <header v-if="!member.image" class="member-heading slide-left">
          <h2 class="member-name">
            {{ $t(`about.team.${member.key}.name`) }}
          </h2>
          <p class="member-title">
            {{ $t(`about.team.${member.key}.title`) }}
          </p>
        </header>

        <div class="member-copy slide-right">
          <header v-if="member.image" class="mb-7">
            <h2 class="member-name">
              {{ $t(`about.team.${member.key}.name`) }}
            </h2>
            <p class="member-title">
              {{ $t(`about.team.${member.key}.title`) }}
            </p>
          </header>

          <div class="member-bio">
            <p
              v-for="paragraphIndex in member.paragraphCount"
              :key="paragraphIndex"
            >
              {{ $t(`about.team.${member.key}.bio.paragraph${paragraphIndex}`) }}
            </p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.team-member {
  scroll-margin-top: 7rem;
  border-top: 1px solid color-mix(in srgb, var(--yunda-bark) 14%, transparent);
  padding-block: clamp(3rem, 6vw, 5.5rem);
}

.team-member:last-child {
  border-bottom: 1px solid color-mix(in srgb, var(--yunda-bark) 14%, transparent);
}

.team-member--portrait,
.team-member--text {
  display: grid;
  gap: clamp(2rem, 5vw, 5.5rem);
}

.member-portrait {
  width: min(100%, 30rem);
  aspect-ratio: 3 / 4;
  justify-self: center;
  overflow: hidden;
  border-radius: 1.75rem 1.75rem 0.75rem 0.75rem;
  background: white;
  box-shadow: 0 1.5rem 4rem color-mix(in srgb, var(--yunda-bark) 12%, transparent);
}

.member-heading,
.member-copy {
  min-width: 0;
}

.member-name {
  max-width: 13ch;
  color: var(--yunda-bark);
  font-family: var(--font-display);
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 600;
  letter-spacing: -0.025em;
  line-height: 1.02;
  text-wrap: balance;
}

.member-title {
  margin-top: 0.85rem;
  color: var(--yunda-maple);
  font-family: var(--font-text);
  font-size: clamp(0.92rem, 1.4vw, 1.08rem);
  font-weight: 700;
  line-height: 1.45;
  text-wrap: pretty;
}

.member-bio {
  max-width: 49rem;
  color: color-mix(in srgb, var(--yunda-bark) 84%, transparent);
  font-family: var(--font-text);
  font-size: clamp(1rem, 1.35vw, 1.08rem);
  line-height: 1.82;
}

.member-bio p + p {
  margin-top: 1.25rem;
}

@media (min-width: 1024px) {
  .team-member--text {
    grid-template-columns: minmax(14rem, 0.72fr) minmax(0, 1.72fr);
    align-items: start;
  }

  .team-member--portrait {
    grid-template-columns: minmax(18rem, 0.82fr) minmax(0, 1.48fr);
    align-items: center;
  }

  .team-member--portrait[data-image-side='right'] {
    grid-template-columns: minmax(0, 1.48fr) minmax(18rem, 0.82fr);
  }

  .team-member--portrait[data-image-side='right'] .member-portrait {
    order: 2;
  }

  .team-member--portrait[data-image-side='right'] .member-copy {
    order: 1;
  }
}

@media (max-width: 1023px) {
  .member-heading {
    margin-bottom: -0.25rem;
  }

  .member-copy,
  .member-heading {
    text-align: left;
  }
}
</style>

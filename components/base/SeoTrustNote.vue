<script setup lang="ts">
interface SourceLink {
  label: string
  href?: string
}

defineProps<{
  updated: string
  reviewedBy: string
  note: string
  sources?: SourceLink[]
}>()
</script>

<template>
  <section class="bg-[color-mix(in_srgb,var(--yunda-sky)_18%,var(--yunda-petal)_82%)] px-5 py-6">
    <div class="mx-auto max-w-320 border border-[var(--yunda-bark)]/10 rounded-2 bg-white/70 px-5 py-4 text-[var(--yunda-bark)] shadow-[0_10px_28px_rgba(61,42,31,0.06)] lg:px-7">
      <div class="grid gap-3 text-sm leading-relaxed md:grid-cols-[0.9fr_1.4fr] md:items-start">
        <div class="font-semibold space-y-1">
          <p>{{ updated }}</p>
          <p>{{ reviewedBy }}</p>
        </div>
        <div class="space-y-3">
          <p class="text-[var(--yunda-bark)]/78">
            {{ note }}
          </p>
          <div v-if="sources?.length" class="flex flex-wrap gap-2">
            <template v-for="source in sources" :key="source.label">
              <NuxtLink
                v-if="source.href?.startsWith('/')"
                :to="source.href"
                class="border border-[var(--yunda-bark)]/15 rounded-full px-3 py-1 text-xs text-[var(--yunda-bark)]/80 font-semibold transition hover:border-[var(--yunda-maple)]/50 hover:text-[var(--yunda-maple)]"
              >
                {{ source.label }}
              </NuxtLink>
              <a
                v-else-if="source.href"
                :href="source.href"
                target="_blank"
                rel="noopener noreferrer"
                class="border border-[var(--yunda-bark)]/15 rounded-full px-3 py-1 text-xs text-[var(--yunda-bark)]/80 font-semibold transition hover:border-[var(--yunda-maple)]/50 hover:text-[var(--yunda-maple)]"
              >
                {{ source.label }}
              </a>
              <span
                v-else
                class="border border-[var(--yunda-bark)]/10 rounded-full px-3 py-1 text-xs text-[var(--yunda-bark)]/65 font-semibold"
              >
                {{ source.label }}
              </span>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

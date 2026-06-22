<script setup lang="ts">
interface BreadcrumbNavItem {
  label: string
  to?: string
}

const props = defineProps<{
  items: BreadcrumbNavItem[]
}>()

const { locale } = useI18n()
const localePath = useLocalePath()

const allItems = computed(() => [
  {
    label: locale.value === 'zh' ? '首页' : 'Home',
    to: '/',
  },
  ...props.items,
])
</script>

<template>
  <nav class="bg-[var(--yunda-petal)] border-b border-[var(--yunda-bark)]/10" aria-label="Breadcrumb">
    <ol class="mx-auto flex max-w-[1180px] items-center gap-2 overflow-x-auto whitespace-nowrap px-6 py-3 text-[13px] text-[var(--yunda-bark)]/72 lg:px-10">
      <li
        v-for="(item, index) in allItems"
        :key="`${item.label}-${index}`"
        class="flex items-center gap-2"
      >
        <NuxtLink
          v-if="item.to && index < allItems.length - 1"
          :to="localePath(item.to)"
          class="transition-colors hover:text-[var(--yunda-maple)] hover:underline"
        >
          {{ item.label }}
        </NuxtLink>
        <span v-else class="font-medium text-[var(--yunda-bark)]">
          {{ item.label }}
        </span>
        <span v-if="index < allItems.length - 1" class="text-[var(--yunda-bark)]/35" aria-hidden="true">/</span>
      </li>
    </ol>
  </nav>
</template>

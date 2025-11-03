<script setup>
const links = [
  { to: '/become-a-surrogate-mother', label: 'Become a Surrogate Mother' },
  { to: '/surrogate-compensation', label: 'Surrogate Compensation Overview' },
  { to: '/surrogate-requirements', label: 'Surrogate Requirements Checklist' },
  { to: '/surrogate-journey', label: 'Surrogate Journey Program' },
  { to: '/become-surrogate-california', label: 'Become a Surrogate in California' },
]
</script>

<template>
  <nav class="hidden-seo-links">
    <NuxtLink
      v-for="item in links"
      :key="item.to"
      :to="item.to"
      class="hidden-seo-link"
    >
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<style scoped>
.hidden-seo-links {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.hidden-seo-link {
  display: inline-block;
  color: inherit;
  text-decoration: none;
}
</style>

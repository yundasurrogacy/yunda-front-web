<script setup lang="ts">
const localePath = useLocalePath()

await navigateTo(localePath('/egg-donors'), {
  redirectCode: 301,
})
</script>

<template>
  <div />
</template>

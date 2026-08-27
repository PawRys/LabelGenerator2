<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number | string
    color?: string
    strokeWidth?: number
  }>(),
  {
    size: 24,
    color: 'currentColor',
    strokeWidth: 1.8,
  },
)
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    :style="{ color }"
    aria-hidden="true"
  >
    <!-- wyczyszczenie -->
    <path d="M7 7L17 17" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" />

    <path d="M17 7L7 17" stroke="currentColor" :stroke-width="strokeWidth" stroke-linecap="round" />
  </svg>
</template>

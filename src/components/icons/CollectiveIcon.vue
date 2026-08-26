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
    <!-- duży kwadrat -->
    <rect
      x="3"
      y="3"
      width="18"
      height="18"
      rx="1"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linejoin="round"
    />

    <!-- elementy -->
    <rect x="6.5" y="6.5" width="4" height="4" rx="0.5" :stroke="color" :stroke-width="strokeWidth" />

    <rect x="13.5" y="6.5" width="4" height="4" rx="0.5" :stroke="color" :stroke-width="strokeWidth" />

    <rect x="6.5" y="13.5" width="4" height="4" rx="0.5" :stroke="color" :stroke-width="strokeWidth" />

    <rect x="13.5" y="13.5" width="4" height="4" rx="0.5" :stroke="color" :stroke-width="strokeWidth" />
  </svg>
</template>

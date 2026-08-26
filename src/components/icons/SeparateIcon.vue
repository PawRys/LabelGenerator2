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
    <rect
      x="4"
      y="4"
      width="6"
      height="6"
      rx="0.8"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linejoin="round"
    />

    <rect
      x="14"
      y="4"
      width="6"
      height="6"
      rx="0.8"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linejoin="round"
    />

    <rect
      x="4"
      y="14"
      width="6"
      height="6"
      rx="0.8"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linejoin="round"
    />

    <rect
      x="14"
      y="14"
      width="6"
      height="6"
      rx="0.8"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linejoin="round"
    />
  </svg>
</template>

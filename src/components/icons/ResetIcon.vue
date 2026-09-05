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
    <!-- okrężna strzałka resetu -->
    <path
      d="M5 9C6.1 5.8 8.9 4 12 4C16.4 4 20 7.6 20 12C20 16.4 16.4 20 12 20C8.8 20 6 18.1 5 15"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />

    <!-- grot -->
    <path d="M5 4.5V9H9.5" :stroke="color" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>

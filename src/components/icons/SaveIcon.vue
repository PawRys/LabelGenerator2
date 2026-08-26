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
  >
    <path d="M5 3H17L21 7V21H5V3Z" :stroke="color" :stroke-width="strokeWidth" stroke-linejoin="round" />
    <path d="M8 3V9H16V3" :stroke="color" :stroke-width="strokeWidth" stroke-linejoin="round" />
    <path d="M8 21V14H18V21" :stroke="color" :stroke-width="strokeWidth" stroke-linejoin="round" />
  </svg>
</template>

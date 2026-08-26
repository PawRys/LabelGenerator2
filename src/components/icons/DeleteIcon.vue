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
    <!-- Pokrywka -->
    <path d="M4 7H20" :stroke="color" :stroke-width="strokeWidth" stroke-linecap="round" />

    <!-- Rączka -->
    <path d="M9 7V4H15V7" :stroke="color" :stroke-width="strokeWidth" stroke-linejoin="round" />

    <!-- Korpus -->
    <path d="M6 7L7 20H17L18 7" :stroke="color" :stroke-width="strokeWidth" stroke-linejoin="round" />

    <!-- Linie wewnątrz -->
    <path d="M10 11V17M14 11V17" :stroke="color" :stroke-width="strokeWidth" stroke-linecap="round" />
  </svg>
</template>

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
    <!-- papier -->
    <path
      d="M7 7V3.5C7 3.22 7.22 3 7.5 3H16.5C16.78 3 17 3.22 17 3.5V7"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linecap="round"
    />

    <!-- drukarka -->
    <path
      d="M6 7.5H18C19.66 7.5 21 8.84 21 10.5V16C21 16.55 20.55 17 20 17H17V14H7V17H4C3.45 17 3 16.55 3 16V10.5C3 8.84 4.34 7.5 6 7.5Z"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linejoin="round"
    />

    <!-- kartka -->
    <path
      d="M7 13.5H17V20.5C17 20.78 16.78 21 16.5 21H7.5C7.22 21 7 20.78 7 20.5V13.5Z"
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linejoin="round"
    />

    <!-- dioda -->
    <circle cx="18" cy="11" r="0.8" :fill="color" />
  </svg>
</template>

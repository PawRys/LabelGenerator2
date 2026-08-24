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
    <path
      transform="translate(-1.52 0)"
      d="
    M19.43 12.98
    C19.47 12.66 19.5 12.34 19.5 12
    C19.5 11.66 19.47 11.34 19.43 11.02
    L21.1 9.72
    L19.28 6.57
    L17.31 7.38
    C16.8 6.99 16.24 6.67 15.64 6.44
    L15.34 4.25
    H11.7
    L11.4 6.44
    C10.8 6.67 10.24 6.99 9.73 7.38
    L7.76 6.57
    L5.94 9.72
    L7.61 11.02
    C7.57 11.34 7.54 11.66 7.54 12
    C7.54 12.34 7.57 12.66 7.61 12.98
    L5.94 14.28
    L7.76 17.43
    L9.73 16.62
    C10.24 17.01 10.8 17.33 11.4 17.56
    L11.7 19.75
    H15.34
    L15.64 17.56
    C16.24 17.33 16.8 17.01 17.31 16.62
    L19.28 17.43
    L21.1 14.28
    L19.43 12.98Z
  "
      :stroke="color"
      :stroke-width="strokeWidth"
      stroke-linejoin="round"
    />

    <circle cx="12" cy="12" r="2.5" :stroke="color" :stroke-width="strokeWidth" />
  </svg>
</template>

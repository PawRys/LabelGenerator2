<script setup lang="ts">
import PrinterIcon from '@/components/icons/PrinterIcon.vue'

import { nextTick } from 'vue'
import { useProductStore } from '@/stores/products_store'
import { useSettingsStore } from '@/stores/settings_store'

async function printMe() {
  const style = document.createElement('style')

  style.innerHTML += `@page {size: A4 landscape; margin: 5mm;}`
  useProductStore().sortOrder = useSettingsStore().sortOrderOfPrintSingle

  document.head.appendChild(style)
  useProductStore().printMode = 'single'

  await nextTick()
  window.print()

  document.head.removeChild(style)
  useProductStore().sortOrder = useSettingsStore().sortOrderOfScreen
}
</script>

<template>
  <button @click="printMe()"><PrinterIcon /> <slot>Jedna duża</slot></button>
</template>

<style scoped></style>

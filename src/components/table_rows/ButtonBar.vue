<script setup lang="ts">
import type { SortFunction } from '@/types/shared_types'

import PrinterIcon from '@/components/icons/PrinterIcon.vue'
import SettingsIcon from '@/components/icons/SettingIcon.vue'
import Button_SortSettings from '@/components/buttons/SortSettings.vue'

import { nextTick } from 'vue'
import { useProductStore } from '@/stores/products_store'
import { useSettingsStore } from '@/stores/settings_store'

const settingsStore = useSettingsStore()
const productStore = useProductStore()

function pageCounter() {
  return productStore.filteredProducts.reduce((acc, item) => acc + item.packsCount, 0)
}

function removeSelectedItems() {
  productStore.removeSelected(productStore.filteredProducts)
  productStore.searchQuery = ''
}

async function printMe(mode: 'single' | 'double' | 'checklist') {
  const style = document.createElement('style')
  settingsStore.previusPrintMode = productStore.sortFunction
  style.innerHTML = `
    @media screen {#printme {display: none;}}
    @media print {
      .noprint, body > :not(#app) {display: none !important;}
      body {max-width: 100%; padding: 0; margin: 0;}
    }`

  if (mode === 'single') {
    style.innerHTML += `@page {size: A4 landscape;}`
    productStore.sortFunction = settingsStore.printSingleSortOrder as SortFunction
  }

  if (mode === 'double') {
    style.innerHTML += `@page {size: A4 portrait;}`
    productStore.sortFunction = settingsStore.printDoubleSortOrder as SortFunction
  }

  if (mode === 'checklist') {
    style.innerHTML += `@page {size: A4 portrait;}`
    productStore.sortFunction = settingsStore.printChecklistSortOrder as SortFunction
  }

  document.head.appendChild(style)
  productStore.printMode = mode

  await nextTick()

  window.print()
  document.head.removeChild(style)
  productStore.sortFunction = settingsStore.previusPrintMode as SortFunction
}
</script>

<template>
  <li v-if="pageCounter() > 0" class="print-buttons">
    <button class="print-btn" @click="printMe('single')"><PrinterIcon /> Jedna duża</button>
    <button class="print-btn" @click="printMe('double')"><PrinterIcon /> Dwie małe</button>
    <button class="print-btn" @click="printMe('checklist')"><PrinterIcon /> Lista kontrolna</button>
    <Button_SortSettings class="btn"><SettingsIcon /></Button_SortSettings>
    <button class="btn" id="btn-removeall" @click="removeSelectedItems()">
      {{ `Usuń ${productStore.searchQuery || 'wszystkie'}` }}
    </button>
  </li>
</template>

<style scoped>
.print-buttons {
  display: flex;
  gap: 1ex;

  margin-bottom: 3ex;
}

.print-btn {
  font-family: 'Roboto Flex';
}

#btn-removeall {
  margin-left: auto;
  white-space: pre-line;
}
</style>

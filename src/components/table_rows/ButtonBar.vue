<script setup lang="ts">
import PrinterIcon from '@/components/icons/PrinterIcon.vue'
import SettingsIcon from '@/components/icons/SettingIcon.vue'
import Btn_SortSettings from '@/components/buttons/Btn_SortSettings.vue'

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
  style.innerHTML = `
    @media screen {#printme {display: none;}}
    @media print {
      .noprint, body > :not(#app) {display: none !important;}
      body {max-width: 100%; padding: 0; margin: 0;}
    }`

  if (mode === 'single') {
    style.innerHTML += `@page {size: A4 landscape;}`
    productStore.sortOrder = settingsStore.sortOrderOfPrintSingle
  }

  if (mode === 'double') {
    style.innerHTML += `@page {size: A4 portrait;}`
    productStore.sortOrder = settingsStore.sortOrderOfPrintDouble
  }

  if (mode === 'checklist') {
    style.innerHTML += `@page {size: A4 portrait;}`
    productStore.sortOrder = settingsStore.sortOrderOfPrintChecklist
  }

  document.head.appendChild(style)
  productStore.printMode = mode

  await nextTick()
  window.print()

  document.head.removeChild(style)
  productStore.sortOrder = settingsStore.sortOrderOfScreen
}
</script>

<template>
  <li v-if="pageCounter() > 0" class="print-buttons">
    <button class="print-btn" @click="printMe('single')"><PrinterIcon /> Jedna duża</button>
    <button class="print-btn" @click="printMe('double')"><PrinterIcon /> Dwie małe</button>
    <button class="print-btn" @click="printMe('checklist')"><PrinterIcon /> Lista kontrolna</button>
    <Btn_SortSettings id="btn-settings" class="btn"><SettingsIcon /></Btn_SortSettings>
    <button class="btn" id="btn-removeall" @click="removeSelectedItems()">
      {{ `Usuń ${productStore.searchQuery || 'wszystkie'}` }}
    </button>
  </li>
</template>

<style scoped>
.print-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 1ex;

  margin-bottom: 3ex;
}

.print-btn {
  font-family: 'Roboto Flex', serif;
  font-weight: 300;
  font-optical-sizing: auto;
  font-style: normal;
  white-space: nowrap;

  flex-grow: 1;
  flex-basis: 20%;
}

#btn-removeall {
  margin-left: auto;
  white-space: pre-line;
}
</style>

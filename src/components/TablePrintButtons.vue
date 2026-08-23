<script setup lang="ts">
import type { SortFunction } from '@/types/shared_types'

import { nextTick } from 'vue'
import { useProductStore } from '@/stores/products_store'
import { useSettingsStore } from '@/stores/settings_store'
const settingsStore = useSettingsStore()

const productStore = useProductStore()
const pageCounter = () => productStore.filteredProducts.reduce((acc, item) => acc + item.packsCount, 0)

async function printMe(mode: 'single' | 'double' | 'checklist') {
  const style = document.createElement('style')
  settingsStore.previusPrintMode = productStore.sortFunction

  if (mode === 'single') {
    style.innerHTML = `@page {size: A4 landscape; margin: 0mm;}`
    productStore.sortFunction = settingsStore.printSingleSortOrder as SortFunction
  }

  if (mode === 'double') {
    style.innerHTML = `@page {size: A4 portrait; margin: 0mm;}`
    productStore.sortFunction = settingsStore.printDoubleSortOrder as SortFunction
  }

  if (mode === 'checklist') {
    style.innerHTML = `@page {size: A4 portrait; margin: 10mm;}`
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
  <section>
    <button v-if="pageCounter() > 0" @click="printMe('single')">Drukuj pojedynczy</button>
    <button v-if="pageCounter() > 0" @click="printMe('double')">Drukuj podwójny</button>
    <button v-if="pageCounter() > 0" @click="printMe('checklist')">Drukuj listę kontrolną</button>
    <div id="sorting-buttons">
      <button @click="productStore.sortFunction = 'default'">kolejność dodania</button>
      <!-- <button @click="productStore.sortFunction = 'default'">kolejność z faktury</button> -->
      <button @click="productStore.sortFunction = 'bysize'">kolejność po grubości</button>
      <button @click="productStore.sortFunction = 'byformat'">kolejność po formacie</button>
    </div>
  </section>
</template>

<style scoped>
section {
  display: grid;
  gap: 1rem;
}

h3 {
  margin-bottom: 1rem;
}
</style>

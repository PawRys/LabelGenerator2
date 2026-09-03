<script setup lang="ts">
import SaveIcon from '@/components/icons/SaveIcon.vue'
import ResetIcon from '@/components/icons/ResetIkon.vue'
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import PrinterIcon from '@/components/icons/PrinterIcon.vue'
import SettingsIcon from '@/components/icons/SettingIcon.vue'
import Btn_SortSettings from '@/components/buttons/Btn_SortSettings.vue'
import Btn_Save from '@/components/buttons/Btn_Save.vue'

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

  if (mode === 'single') {
    style.innerHTML += `@page {size: A4 landscape; margin: 5mm;}`
    productStore.sortOrder = settingsStore.sortOrderOfPrintSingle
  }

  if (mode === 'double') {
    style.innerHTML += `@page {size: A4 portrait; margin: 5mm;}`
    productStore.sortOrder = settingsStore.sortOrderOfPrintDouble
  }

  if (mode === 'checklist') {
    style.innerHTML += `@page {size: A4 portrait; margin: 15mm;}`
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
  <li v-if="pageCounter() > 0" class="buttons">
    <div class="button-bar button-bar-one">
      <button class="print-btn" @click="printMe('single')"><PrinterIcon /> Jedna duża</button>
      <button class="print-btn" @click="printMe('double')"><PrinterIcon /> Dwie małe</button>
      <button class="print-btn" @click="printMe('checklist')"><PrinterIcon /> Lista kontrolna</button>
    </div>

    <div class="button-bar button-bar-two">
      <Btn_SortSettings class="other-btn" id="btn-settings"><SettingsIcon />Ustawienia</Btn_SortSettings>

      <Btn_Save class="other-btn" id="btn-save">
        <SaveIcon />
        {{ productStore.searchQuery ? `Zapisz: ${productStore.searchQuery}` : `Zapisz wszystkie` }}
      </Btn_Save>

      <button class="other-btn" id="btn-removeall" @click="removeSelectedItems()">
        <DeleteIcon />
        {{ productStore.searchQuery ? `Usuń: ${productStore.searchQuery}` : `Usuń wszystkie` }}
      </button>

      <button
        v-if="productStore.searchQuery"
        class="other-btn clear-search-query"
        @click="productStore.searchQuery = ''"
      >
        <ResetIcon />
      </button>
    </div>
  </li>
</template>

<style scoped>
.buttons {
  display: flex;
  flex-direction: column;
}

.button-bar {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5em;
}

.print-btn {
  font-family: 'Roboto Flex', serif;
  font-weight: 300;
  font-optical-sizing: auto;
  font-style: normal;
  white-space: nowrap;

  padding-block: 1em;

  /* flex-grow: 1; */
  flex-basis: 25%;
}

:deep(.other-btn) {
  padding-block: 0.5em;
  /* flex-grow: 1; */
  flex: 0 0 25%;
}

.clear-search-query {
  flex: 0 0 auto;
}

#btn-removeall {
  white-space: pre-line;
}
</style>

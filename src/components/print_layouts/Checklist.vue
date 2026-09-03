<script setup lang="ts">
import type { Product } from '@/types/shared_types'

import { useProductStore } from '@/stores/products_store'
import { useSettingsStore } from '@/stores/settings_store'
const productStore = useProductStore()
const settingsStore = useSettingsStore()

function showTruckHeader(item: Product, index: number): boolean {
  if (!['default', 'bytruckandsize', 'bytruckandformat'].includes(settingsStore.sortOrderOfPrintChecklist)) {
    return false
  }

  return index === 0 || (item.truckNum || '') !== (productStore.filteredProducts[index - 1]?.truckNum || '')
}

function resetIndex(item: Product, index: number): number {
  if (!['default', 'bytruckandsize', 'bytruckandformat'].includes(settingsStore.sortOrderOfPrintChecklist)) {
    return 0
  }

  const storedItems = productStore.filteredProducts

  for (let i = index; i >= 0; i--) {
    if ((storedItems[i]?.truckNum || '') !== (item.truckNum || '')) {
      return i + 1
    }
  }

  return 0
}

function countPacks(item: Product): number {
  if (!['default', 'bytruckandsize', 'bytruckandformat'].includes(settingsStore.sortOrderOfPrintChecklist)) {
    return 0
  }

  const storedItems = productStore.filteredProducts

  return storedItems.reduce((acc, storedItem) => {
    if (storedItem.truckNum !== item.truckNum) return acc
    return acc + storedItem.packsCount
  }, 0)
}
</script>

<template>
  <table class="checklist">
    <tbody>
      <template v-for="(item, index) in productStore.filteredProducts" :key="`checklist-${index}`">
        <tr v-if="showTruckHeader(item, index)">
          <th class="page-break" colspan="4">
            <h4 class="truck-number">{{ `${item.truckNum} (ilość paczek: ${countPacks(item)})` }}</h4>
          </th>
          <th class="margin-top"><div>suma:</div></th>
          <th class="margin-top"><i class="sum-field"></i></th>
        </tr>
        <tr>
          <td>{{ `${index + 1 - resetIndex(item, index)}.` }}</td>
          <td>{{ `${item.glue}` }}</td>
          <td class="item-size">{{ item.title }}</td>
          <td>{{ `${item.desc}` }}</td>
          <td>{{ `${item.packsCount}x${item.piecesCount}` }}</td>
          <td class="item-check">
            <div class="grid"><i v-for="x in item.packsCount" :key="`checklist-${index}-${x}`" class="square"></i></div>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: fit-content;
  font-family: 'Roboto Flex', serif;
  font-size: 12pt;
}

th {
  text-align: left;
  vertical-align: middle;
}

td {
  border-top: solid 1px silver;
  padding: 1ch 0.5ch;
  line-height: 1;
}

.item-size {
  font-weight: 600;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, auto);
  justify-content: start;
  gap: 1ch;
}

.square {
  display: inline-block;
  height: 1.1em;
  aspect-ratio: 1;
  border: solid 1px black;
  border-radius: 0.2ch;
}

.sum-field {
  display: inline-block;
  height: 2em;
  aspect-ratio: 2 / 1;
  border: solid 1px black;
  border-radius: 0.2ch;
}

@media print {
  table.checklist {
    width: 100%;
    height: auto;
  }

  table.checklist tr {
    break-inside: avoid;
    page-break-inside: avoid;
  }
}
</style>

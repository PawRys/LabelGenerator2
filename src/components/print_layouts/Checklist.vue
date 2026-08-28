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
    <template v-for="(item, index) in productStore.filteredProducts" :key="`checklist-${index}`">
      <tr v-if="showTruckHeader(item, index)">
        <th class="margin-top" colspan="4">
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
  </table>
</template>

<style scoped>
.page {
  box-sizing: border-box;
  width: 100%;
  height: 100svh;
  margin: 0;
  padding: 0;
  /* break-before: page; */
}

table {
  border-collapse: collapse;
  margin-inline: 15mm;
  width: fit-content;
  font-family: 'Roboto Flex', serif;
  font-size: 12pt;
}

th {
  text-align: left;
  vertical-align: middle;
  height: 100%;
}

.margin-top > * {
  margin-top: 1em;
}

.truck-number {
  text-align: left;
  margin-bottom: 0.2em;
  break-before: page;
}

td {
  border-top: solid 1px silver;
  height: 100%;
  padding: 1ch 0.5ch;
  line-height: 1;
}

.item-size {
  /* border-left: solid 1px silver; */
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
</style>

<script setup lang="ts">
import type { Product } from '@/types/shared_types'

import { useProductStore } from '@/stores/products_store'
import { useSettingsStore } from '@/stores/settings_store'

const productStore = useProductStore()
const settingsStore = useSettingsStore()

function showTruckHeader(item: Product, index: number): boolean {
  if (!['default', 'bytruckandsize', 'bytruckandformat'].includes(settingsStore.sortOrderOfScreen)) {
    return false
  }

  return index === 0 || (item.truckNum || '') !== (productStore.filteredProducts[index - 1]?.truckNum || '')
}

function countPacks(item: Product): number {
  if (!['default', 'bytruckandsize', 'bytruckandformat'].includes(settingsStore.sortOrderOfScreen)) {
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
  <template v-for="(product, index) in productStore.filteredProducts" :key="product.id">
    <li v-if="showTruckHeader(product, index)" class="full-width">
      <h4 class="truck-number">{{ `${product.truckNum} (ilość paczek: ${countPacks(product)})` }}</h4>
    </li>

    <li :id="product.id">
      <input class="edit-title grid-title" v-model="product.title" autocomplete="on" />
      <textarea class="edit-desc grid-desc" v-model="product.desc" autocomplete="on"></textarea>
      <input class="edit-note grid-note" v-model="product.note" autocomplete="on" />
      <input class="edit-glue grid-glue" v-model="product.glue" autocomplete="on" />
      <span class="grid-pack">
        <input class="edit-packs" type="number" v-model="product.packsCount" min="1" />
        <span> x </span>
        <input class="edit-pieces" type="number" v-model="product.piecesCount" />
        <!-- <span>szt.</span> -->
      </span>
      <button class="grid-btn" @click="productStore.removeProduct(product.id)">Usuń</button>
    </li>
  </template>
</template>

<style scoped>
/** Style in App.vue */
</style>

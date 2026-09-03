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

function countWeight(item: Product): number {
  if (!['default', 'bytruckandsize', 'bytruckandformat'].includes(settingsStore.sortOrderOfScreen)) {
    return 0
  }

  const storedItems = productStore.filteredProducts

  return storedItems.reduce((acc, storedItem) => {
    if (storedItem.truckNum !== item.truckNum) return acc
    return acc + storedItem.weight * storedItem.packsCount
  }, 0)
}
</script>

<template>
  <ul>
    <template v-for="(product, index) in productStore.filteredProducts" :key="product.id">
      <li v-if="showTruckHeader(product, index)" class="full-width">
        <h4 class="truck-number">
          {{ `${product.truckNum}, ${countPacks(product)} paczek, ${countWeight(product).toFixed(0)} kg` }}
        </h4>
      </li>
      <li class="show-product" :id="product.id">
        <input style="grid-area: inpt-1" v-model="product.title" autocomplete="on" />
        <textarea style="grid-area: inpt-2" class="wide-input" v-model="product.desc" autocomplete="on" />
        <input style="grid-area: inpt-3" v-model="product.note" autocomplete="on" />
        <input style="grid-area: inpt-4" class="short-input" v-model="product.glue" autocomplete="on" />
        <span style="grid-area: inpt-5" class="input-group">
          <input class="short-input" type="number" v-model="product.packsCount" min="1" />
          <span> x </span>
          <input class="short-input" type="number" v-model="product.piecesCount" />
          <!-- <span>szt.</span> -->
        </span>
        <button style="grid-area: btn-rmv" class="grid-btn" @click="productStore.removeProduct(product.id)">
          Usuń
        </button>
      </li>
    </template>
  </ul>
</template>

<style scoped>
.show-product {
  margin-block: var(--spacing-medium);

  display: grid;
  align-items: center;
  align-content: center;
  grid-template-columns: 4fr 5fr 4fr auto auto auto;
  grid-template-areas: 'inpt-1 inpt-2 inpt-3 inpt-4 inpt-5 btn-rmv';
  gap: var(--spacing-medium);
}

@media (max-width: 1024px) {
  .show-product {
    place-self: anchor-center;
    width: min(100%, 22em);

    justify-items: center;
    grid-template-columns: 1fr 1fr;
    grid-template-areas:
      'inpt-1 inpt-1'
      'inpt-2 inpt-2'
      'inpt-3 inpt-3'
      'inpt-4 .'
      'inpt-5 btn-rmv';
  }

  button {
    place-self: end;
  }
}

textarea,
input {
  width: clamp(8em, 100%, 21em);
  border-width: 1px;
  border-color: var(--action-color-normal);

  font-family: 'Roboto Flex';
  font-weight: 200;
  text-align: center;
}

.input-group {
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  gap: var(--spacing-small);
}

.short-input {
  width: 5em;
}

.wide-input {
  width: clamp(13em, 100%, 21em);
}
</style>

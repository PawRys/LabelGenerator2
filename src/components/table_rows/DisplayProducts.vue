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
      <li class="list-item" :id="product.id">
        <input v-model="product.title" />
        <textarea v-model="product.desc" class="wide-input" />
        <input v-model="product.note" />
        <input v-model="product.glue" class="glue-input short-input" />
        <span class="quantity-inputs inline-flex">
          <input v-model="product.packsCount" class="short-input" type="number" min="1" />
          <span>x</span>
          <input v-model="product.piecesCount" class="short-input" type="number" />
        </span>
        <button @click="productStore.removeProduct(product.id)" class="remove-btn">Usuń</button>
      </li>
    </template>
  </ul>
</template>

<style scoped>
.list-item {
  justify-self: center;
  margin-block: 2rem;

  display: grid;
  align-items: center;
  grid-template-columns: 4fr 5fr 4fr auto auto auto;
  gap: var(--spacing-medium);
}

@media (max-width: 1024px) {
  .list-item {
    width: min(100%, 30em);
    grid-template-columns: auto auto 1fr;
  }

  .list-item > * {
    grid-column: 1 / -1;
  }

  .remove-btn,
  .glue-input,
  .quantity-inputs {
    grid-column: span 1;
  }

  .remove-btn {
    justify-self: end;
  }
}

textarea,
input {
  width: max(8em, 100%);
  border-width: 1px;

  font-family: 'Roboto Flex';
  font-weight: 200;
  text-align: center;
}

.quantity-inputs {
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  gap: var(--spacing-small);
}

.short-input {
  width: 5em;
}

.wide-input {
  width: max(13em, 100%);
}
</style>

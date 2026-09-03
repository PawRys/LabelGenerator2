<script setup lang="ts">
import { useProductStore } from '@/stores/products_store'

const productStore = useProductStore()
</script>

<template>
  <input
    id="search-query"
    v-model="productStore.searchQuery"
    type="search"
    list="search-options"
    placeholder="Szukaj..."
  />
</template>

<style scoped>
#search-query {
  place-self: center;
  position: sticky;
  z-index: 1;
  top: 1rem;

  padding: 0.5rem;
  width: min(60ch, 100%);
  border: solid 1px var(--border-color-subtle);
  border-radius: var(--spacing-medium);
  box-shadow: 0 0 var(--spacing-large) var(--background-color-interactive);

  text-align: center;
  font-size: 1.2rem;
}
</style>

<script setup lang="ts">
import { useProductStore } from '@/stores/products_store'

const productStore = useProductStore()
</script>

<template>
  <li class="main-element sticky">
    <input
      id="search-query"
      v-model="productStore.searchQuery"
      type="search"
      list="search-options"
      placeholder="Szukaj..."
    />
  </li>
</template>

<style scoped>
.main-element {
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;

  padding-bottom: 1rem;
  pointer-events: none;
}

#search-query,
.clear-search-query {
  pointer-events: all;
}

.sticky {
  position: sticky;
  z-index: 1;
  top: 1rem;
}

#search-query {
  padding: 0.5rem;
  width: min(100%, 60ch);

  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  box-shadow: 0 0em 0em 0.5em var(--bg-color);

  text-align: center;
  font-size: 1.2rem;
}
</style>

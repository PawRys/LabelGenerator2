<script setup lang="ts">
import { useProductStore } from '@/stores/products_store'
import ResetIcon from '@/components/icons/ResetIcon.vue'
</script>

<template>
  <section id="search-input-section" class="inline-flex">
    <input
      id="search-query"
      v-model="useProductStore().searchQuery"
      type="search"
      list="search-options"
      placeholder="Szukaj..."
    />

    <button v-if="useProductStore().searchQuery" @click="useProductStore().searchQuery = ''" class="ghost">
      <ResetIcon />
    </button>
  </section>
</template>

<style scoped>
#search-input-section {
  place-self: center;
  position: sticky;
  z-index: 1;
  top: 1rem;

  width: min(60ch, 100%);
}

#search-query {
  width: 100%;
  padding: 0.5rem;
  border: solid 1px var(--border-color-subtle);
  border-radius: var(--s-3);
  box-shadow: 0 0 var(--s-8) var(--background-color-interactive);

  text-align: center;
  font-size: 1.2rem;
}
</style>

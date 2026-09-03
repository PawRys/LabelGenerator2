<script setup lang="ts">
import DeleteIcon from '@/components/icons/DeleteIcon.vue'
import { useProductStore } from '@/stores/products_store'

function removeSelectedItems() {
  useProductStore().removeSelected(useProductStore().filteredProducts)
  useProductStore().searchQuery = ''
}
</script>

<template>
  <button @click="removeSelectedItems()">
    <DeleteIcon />
    {{ useProductStore().searchQuery ? `Usuń: ${useProductStore().searchQuery}` : `Usuń wszystkie` }}
  </button>
</template>

<style scoped></style>

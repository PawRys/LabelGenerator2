<script setup lang="ts">
import ResetIcon from '@/components/icons/ResetIkon.vue'
import { useProductStore } from '@/stores/products_store'
</script>

<template>
  <button v-if="useProductStore().searchQuery" @click="useProductStore().searchQuery = ''">
    <ResetIcon />
  </button>
</template>

<style scoped>
.clear-search-query {
  flex: 0 0 auto;
}
</style>

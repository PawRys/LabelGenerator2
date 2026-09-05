<script setup lang="ts">
import { useProductStore } from '@/stores/products_store'
import ResetIcon from '@/components/icons/ResetIcon.vue'
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

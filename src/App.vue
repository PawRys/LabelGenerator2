<script setup lang="ts">
import TableDisplay from '@/components/TableDisplay.vue'
import TableSettings from './components/TableSettings.vue'
</script>

<template>
  <header class="noprint">
    <p>
      <a href="https://pawrys.github.io/StockBrowser5/">Stany</a>
      <span> / </span>
      <a href="https://pawrys.github.io/LabelGenerator/">Etykiety</a>
      <span> / </span>
      <a href="https://pawrys.github.io/PurchaseComparator/">Tester</a>
    </p>

    <h1>Etykieter</h1>
  </header>

  <TableSettings />
  <TableDisplay />
</template>

<style scoped></style>

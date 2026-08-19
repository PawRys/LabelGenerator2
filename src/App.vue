<script setup lang="ts">
import PDFUpload from '@/components/PDFUpload.vue'
import ProductList from '@/components/DisplayProducts.vue'
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

  <ProductList />
  <PDFUpload />
</template>

<style scoped></style>

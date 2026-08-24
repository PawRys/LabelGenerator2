<script setup lang="ts">
import ButtonBar from '@/components/table_rows/ButtonBar.vue'
import AddProduct from '@/components/table_rows/AddProduct.vue'
import FilterProducts from '@/components/table_rows/FilterProducts.vue'
import DisplayProducts from '@/components/table_rows/DisplayProducts.vue'
import PrintLayoutSingle from '@/components/print_layouts/Single.vue'
import PrintLayoutDouble from '@/components/print_layouts/Double.vue'
import PrintLayoutChecklist from '@/components/print_layouts/Checklist.vue'

import { computed } from 'vue'
import { useProductStore } from '@/stores/products_store'

const productStore = useProductStore()
const pageCounter = () => productStore.filteredProducts.reduce((acc, item) => acc + item.packsCount, 0)

const printLayout = computed(() => {
  if (productStore.printMode === 'single') return PrintLayoutSingle
  if (productStore.printMode === 'double') return PrintLayoutDouble
  if (productStore.printMode === 'checklist') return PrintLayoutChecklist

  return PrintLayoutChecklist
})
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

  <table class="noprint">
    <thead>
      <FilterProducts v-if="pageCounter() > 0" />
      <AddProduct />

      <tr>
        <td colspan="6">
          <h3 id="page-counter">Ilość stron do wydrukowania: {{ pageCounter() }}</h3>
        </td>
      </tr>

      <ButtonBar />
    </thead>
    <tbody>
      <DisplayProducts />
    </tbody>
  </table>

  <component id="printme" :is="printLayout"></component>

  <footer class="noprint">
    <p>Wszelkie prawa zastrzeżone - Paweł Ryszkowski</p>
    <p>
      Uwagi i pomoc techniczna:
      <a href="mailto:pawrys.kontakt@gmail.com?subject=Pomoc%20Stock%20Browser%205" target="_blank"
        >pawrys.kontakt@gmail.com</a
      >
      <span> - </span>
      <a href="https://github.com/PawRys/">Github/PawRys</a>
    </p>
    <p></p>
  </footer>
</template>

<style>
#app {
  min-height: 100svh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

@media (max-width: 768px) {
  td {
    display: block;
  }
}

@media screen {
  #printme {
    display: none;
  }
}

@media print {
  .noprint,
  body > :not(#app) {
    display: none !important;
  }

  body {
    max-width: 100%;
    padding: 0;
    margin: 0;
  }
}
</style>

<style scoped>
#page-counter {
  margin-top: 3rem;
}
</style>

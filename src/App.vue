<script setup lang="ts">
import TableDisplay from '@/components/TableDisplay.vue'
import TableFilters from './components/TableFilters.vue'
import PrintLayoutSingle from './components/PrintLayoutSingle.vue'
import PrintLayoutDouble from './components/PrintLayoutDouble.vue'
import PrintLayoutChecklist from './components/PrintLayoutChecklist.vue'
import { computed } from 'vue'
import { useProductStore } from '@/stores/products_store'

const productStore = useProductStore()

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

  <TableFilters class="noprint" />
  <TableDisplay class="noprint" />

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
@media screen {
  #printme {
    display: none;
  }
}

@media print {
  body > :not(#app),
  .noprint {
    display: none !important;
  }

  #printme {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
</style>

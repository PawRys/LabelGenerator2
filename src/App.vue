<script setup lang="ts">
import ButtonBar from '@/components/table_rows/ButtonBar.vue'
import AddProduct from '@/components/table_rows/AddProduct.vue'
import FilterProducts from '@/components/table_rows/FilterProducts.vue'
import DisplayProducts from '@/components/table_rows/DisplayProducts.vue'
import PrintLayoutSingle from '@/components/print_layouts/Single.vue'
import PrintLayoutDouble from '@/components/print_layouts/Double.vue'
import PrintLayoutChecklist from '@/components/print_layouts/Checklist.vue'
import MyApps from '@/components/MyApps.vue'

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
    <p><MyApps /></p>
    <h1>Etykieter</h1>
  </header>

  <ul id="products-list" class="noprint">
    <FilterProducts v-if="pageCounter() > 0" />
    <AddProduct />
    <li>
      <h3 id="page-counter">Ilość stron do wydrukowania: {{ pageCounter() }}</h3>
    </li>
    <ButtonBar />
    <DisplayProducts />
  </ul>

  <datalist id="glue-datalist" class="noprint">
    <option value="EXT" />
    <option value="INT" />
    <option value="WD" />
    <option value="MR" />
  </datalist>

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

#products-list {
  padding: 0;
}

:where(#products-list) > li {
  list-style: none;

  margin-block: 1em;

  display: grid;
  align-items: center;
  gap: 0.5em;
  grid-template-columns: 3fr 3fr 2fr max-content max-content max-content;
  grid-template-areas: 'title desc note glue  pack btn';
}

.grid-title {
  grid-area: title;
  width: 100%;
}
.grid-desc {
  grid-area: desc;
  width: 100%;
}
.grid-note {
  grid-area: note;
  width: 100%;
}
.grid-glue {
  grid-area: glue;
}
.grid-pack {
  grid-area: pack;
}
.grid-btn {
  grid-area: btn;
}

.full-width {
  grid-template-columns: 1fr;
}

.add-title {
  font-family: 'Roboto Flex', var(--font-family, sans-serif);
  font-weight: 200;
}

.add-title,
.edit-title {
  text-align: center;
  width: 100%;
}

.add-desc,
.edit-desc {
  text-align: center;
  width: 100%;
}

.add-note,
.edit-note {
  text-align: center;
  width: 100%;
}

.add-glue,
.edit-glue {
  text-align: center;
  width: 5.5ch;
}

.add-glue {
  width: 8ch;
}

.add-packs,
.edit-packs {
  text-align: center;
  width: 5.5ch;
}

.add-pieces,
.edit-pieces {
  grid-area: packs;
  text-align: center;
  width: 5.5ch;
}

@media (max-width: 768px) {
  /* :where(#products-list) > li {
    grid-template-columns: auto auto 1fr;
    grid-template-areas:
      'title title title'
      'desc  desc  desc'
      'note  note  note'
      'glue  pack  pack'
      'btn   btn   btn';
  } */

  :where(#products-list) > li {
    display: flex;
    flex-wrap: wrap;
  }

  :where(#products-list) > li:not(.full-width) {
    padding-bottom: 2em;
  }

  .grid-btn {
    margin-left: auto;
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

<style scoped></style>

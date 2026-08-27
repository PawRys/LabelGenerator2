<script setup lang="ts">
import { useProductStore } from '@/stores/products_store'
import { ref, computed } from 'vue'

const productStore = useProductStore()
const arrivalSelectFocused = ref(false)
const truckSelectFocused = ref(false)
const cmrSelectFocused = ref(false)
const pageCounter = () => productStore.filteredProducts.reduce((acc, item) => acc + item.packsCount, 0)

const arrivalPlaceList = computed(() => {
  const dataSet = arrivalSelectFocused.value ? productStore.products : productStore.filteredProducts
  return [
    ...new Set(
      dataSet.map((product) => product.arrivalPlace).filter((arrival): arrival is string => arrival !== undefined),
    ),
  ].sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    }),
  )
})

const truckNumList = computed(() => {
  const dataSet = truckSelectFocused.value ? productStore.products : productStore.filteredProducts
  return [
    ...new Set(dataSet.map((product) => product.truckNum).filter((truck): truck is string => truck !== undefined)),
  ].sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    }),
  )
})

const cmrNumList = computed(() => {
  const dataSet = cmrSelectFocused.value ? productStore.products : productStore.filteredProducts
  return [...new Set(dataSet.map((product) => product.cmrNum).filter((cmr): cmr is string => cmr !== undefined))].sort(
    (a, b) =>
      a.localeCompare(b, undefined, {
        numeric: true,
        sensitivity: 'base',
      }),
  )
})
</script>

<template>
  <li class="sticky">
    <input
      id="search-query"
      v-model="productStore.searchQuery"
      type="search"
      list="search-options"
      placeholder="Szukaj..."
    />
  </li>

  <li v-if="pageCounter() > 0" class="full-width">
    <h4>Wybór dostawy:</h4>
    <div id="delivery-filters">
      <select
        v-model="productStore.searchQuery"
        @focus="truckSelectFocused = true"
        @blur="truckSelectFocused = false"
        :size="5"
      >
        <option value="">Numer auta</option>
        <option v-for="truck in truckNumList" :key="truck" :value="truck">{{ truck }}</option>
      </select>

      <select
        v-model="productStore.searchQuery"
        @focus="cmrSelectFocused = true"
        @blur="cmrSelectFocused = false"
        :size="5"
      >
        <option value="">Numer CMR</option>
        <option v-for="cmr in cmrNumList" :key="cmr" :value="cmr">{{ cmr }}</option>
      </select>

      <select
        v-model="productStore.searchQuery"
        @focus="arrivalSelectFocused = true"
        @blur="arrivalSelectFocused = false"
        :size="5"
      >
        <option value="">Miejsce dostawy</option>
        <option v-for="arrival in arrivalPlaceList" :key="arrival" :value="arrival">{{ arrival }}</option>
      </select>
    </div>
  </li>
</template>

<style scoped>
.sticky {
  position: sticky;
  z-index: 1;
  top: 1rem;

  display: flex;
  justify-content: center;

  pointer-events: none;
}

h4 {
  flex-basis: 100%;
}

#search-query {
  pointer-events: all;

  margin-bottom: 1rem;
  padding: 0.5rem;
  width: min(100%, 60ch);

  border-style: solid;
  border-width: 1px;
  border-radius: 3px;
  box-shadow: 0 0em 0em 0.5em var(--bg-color);

  text-align: center;
  font-size: 1.2rem;
}

#delivery-filters {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5em;
  margin-bottom: 3rem;
}

#delivery-filters > * {
  flex-grow: 1;
}
</style>

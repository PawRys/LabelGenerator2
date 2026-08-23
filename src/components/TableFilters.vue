<script setup lang="ts">
import { useProductStore } from '@/stores/products_store'
import { ref, computed } from 'vue'

const productStore = useProductStore()
const arrivalSelectFocused = ref(false)
const truckSelectFocused = ref(false)
const cmrSelectFocused = ref(false)
const pageCounter = () => productStore.filteredProducts.reduce((acc, item) => acc + item.packsCount, 0)

function removeSelectedItems() {
  productStore.removeSelected(productStore.filteredProducts)
  productStore.searchQuery = ''
}

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
  <header>
    <input
      id="search-query"
      v-model="productStore.searchQuery"
      type="search"
      list="search-options"
      placeholder="Szukaj..."
    />
    <!-- <datalist id="search-options">
        <option v-for="arrival in arrivalPlaceList" :key="arrival" :value="arrival">{{ arrival }}</option>
        <option v-for="truck in truckNumList" :key="truck" :value="truck">{{ truck }}</option>
        <option v-for="cmr in cmrNumList" :key="cmr" :value="cmr">{{ cmr }}</option>
      </datalist> -->

    <div v-if="pageCounter() > 0">Wybór dostawy:</div>
    <div v-if="pageCounter() > 0" id="delivery-filters">
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

    <button v-if="pageCounter() > 0" @click="removeSelectedItems()">
      Usuń wszystkie {{ productStore.searchQuery }}
    </button>
  </header>
</template>

<style scoped>
header {
  display: grid;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1rem;
}

#search-query {
  max-width: 100%;
  text-align: center;
  font-size: 1.2rem;
  padding: 0.5rem;
}

#delivery-filters {
  display: flex;
  justify-content: center;
  gap: 1rem;
}

#sorting-buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
}
</style>

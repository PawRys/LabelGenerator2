<script setup lang="ts">
import { useProductStore } from '@/stores/products_store'
import { ref, computed } from 'vue'

const productStore = useProductStore()
const arrivalSelectFocused = ref(false)
const truckSelectFocused = ref(false)
const cmrSelectFocused = ref(false)

const arrivalPlaceList = computed(() => {
  const dataSet = arrivalSelectFocused.value ? productStore.products : productStore.filteredProducts
  return [...new Set(dataSet.map((product) => product.arrivalPlace).filter((arrival): arrival is string => arrival !== undefined))].sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    }),
  )
})

const truckNumList = computed(() => {
  const dataSet = truckSelectFocused.value ? productStore.products : productStore.filteredProducts
  return [...new Set(dataSet.map((product) => product.truckNum).filter((truck): truck is string => truck !== undefined))].sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    }),
  )
})

const cmrNumList = computed(() => {
  const dataSet = cmrSelectFocused.value ? productStore.products : productStore.filteredProducts
  return [...new Set(dataSet.map((product) => product.cmrNum).filter((cmr): cmr is string => cmr !== undefined))].sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    }),
  )
})
</script>

<template>
  <header>
    <input id="search-query" v-model="productStore.searchQuery" type="search" list="search-options" placeholder="Szukaj..." />
    <!-- <datalist id="search-options">
        <option v-for="arrival in arrivalPlaceList" :key="arrival" :value="arrival">{{ arrival }}</option>
        <option v-for="truck in truckNumList" :key="truck" :value="truck">{{ truck }}</option>
        <option v-for="cmr in cmrNumList" :key="cmr" :value="cmr">{{ cmr }}</option>
      </datalist> -->

    <div>Wybór dostawy:</div>
    <div id="delivery-filters">
      <select
        v-model="productStore.searchQuery"
        :size="Math.min(truckNumList.length + 1, 5)"
        @focus="truckSelectFocused = true"
        @blur="truckSelectFocused = false"
      >
        <option value="">Numer auta</option>
        <option v-for="truck in truckNumList" :key="truck" :value="truck">{{ truck }}</option>
      </select>

      <select v-model="productStore.searchQuery" :size="Math.min(cmrNumList.length + 1, 5)" @focus="cmrSelectFocused = true" @blur="cmrSelectFocused = false">
        <option value="">Numer CMR</option>
        <option v-for="cmr in cmrNumList" :key="cmr" :value="cmr">{{ cmr }}</option>
      </select>

      <select
        v-model="productStore.searchQuery"
        :size="Math.min(arrivalPlaceList.length + 1, 5)"
        @focus="arrivalSelectFocused = true"
        @blur="arrivalSelectFocused = false"
      >
        <option value="">Miejsce dostawy</option>
        <option v-for="arrival in arrivalPlaceList" :key="arrival" :value="arrival">{{ arrival }}</option>
      </select>
    </div>

    <div id="sorting-buttons">
      <button @click="productStore.sortFunction = 'default'">kolejność dodania</button>
      <!-- <button @click="productStore.sortFunction = 'default'">kolejność z faktury</button> -->
      <button @click="productStore.sortFunction = 'bysize'">kolejność po grubości</button>
      <button @click="productStore.sortFunction = 'byformat'">kolejność po formacie</button>
    </div>
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

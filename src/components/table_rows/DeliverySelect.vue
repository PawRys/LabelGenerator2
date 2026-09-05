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
  <section id="delivery-select" v-if="pageCounter() >= 0" class="full-width">
    <h4>Wybór dostawy:</h4>
    <div class="selector-wrapper">
      <select
        class="selector"
        v-model="productStore.searchQuery"
        @focus="truckSelectFocused = true"
        @blur="truckSelectFocused = false"
        :size="5"
      >
        <option value="">Numer auta</option>
        <option v-for="truck in truckNumList" :key="truck" :value="truck">{{ truck }}</option>
      </select>

      <select
        class="selector"
        v-model="productStore.searchQuery"
        @focus="cmrSelectFocused = true"
        @blur="cmrSelectFocused = false"
        :size="5"
      >
        <option value="">Numer CMR</option>
        <option v-for="cmr in cmrNumList" :key="cmr" :value="cmr">{{ cmr }}</option>
      </select>

      <select
        class="selector"
        v-model="productStore.searchQuery"
        @focus="arrivalSelectFocused = true"
        @blur="arrivalSelectFocused = false"
        :size="5"
      >
        <option value="">Miejsce dostawy</option>
        <option v-for="arrival in arrivalPlaceList" :key="arrival" :value="arrival">{{ arrival }}</option>
      </select>
    </div>
  </section>
</template>

<style scoped>
#delivery-select {
  margin-block: 2rem;
}

.selector-wrapper {
  display: flex;
  gap: var(--s-8);
}

.selector {
  flex: 1 1 50%;
}
</style>

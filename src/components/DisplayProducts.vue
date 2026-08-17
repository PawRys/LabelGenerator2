<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/products_store'
import type { Product } from '@/types/shared_types'

const productStore = useProductStore()
const size = ref('')
const face = ref('')
const glue = ref('')
const packsCount = ref(1)
const piecesCount = ref(0)

let counter = 0

const selectedCarriageBy = ref<string[]>([])

const carriageByList = computed(() => {
  return [...new Set(productStore.products.map((product) => product.carriageBy))]
})

const filteredProducts = computed(() => {
  if (selectedCarriageBy.value.length === 0 || selectedCarriageBy.value.includes('')) {
    return productStore.products
  }

  return productStore.products.filter((product) =>
    selectedCarriageBy.value.includes(product.carriageBy),
  )
})

function addProduct() {
  productStore.addProduct({
    id: `id_${(++counter).toString().padStart(3, '0')}`,
    size: size.value,
    face: face.value,
    glue: glue.value,
    packsCount: packsCount.value,
    piecesCount: piecesCount.value,
  })

  // wyczyszczenie formularza
  size.value = ''
  face.value = ''
  glue.value = ''
  packsCount.value = 1
  piecesCount.value = 0
}
</script>

<template>
  <section>
    <h3>Lista produktów {{ filteredProducts.length }}</h3>

    <select v-model="selectedCarriageBy" multiple>
      <option value="">Wszystkie</option>

      <option v-for="carriageBy in carriageByList" :key="carriageBy" :value="carriageBy">
        {{ carriageBy }}
      </option>
    </select>

    <table>
      <thead>
        <tr>
          <th>Sklejka</th>
          <th>Opis</th>
          <th>Klej/Ilość paczek/Ilość sztuk</th>
          <th>Numer auta</th>
          <th>Numer Invoice</th>
          <th>Numer CMR</th>
          <th><button @click="productStore.removeAll()">Usuń wszystkie</button></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id" :id="product.id">
          <td><input type="text" v-model="product.size" /></td>
          <td><input type="text" v-model="product.face" /></td>
          <td>
            <input style="width: 3rem" type="text" v-model="product.glue" />
            <input style="width: 3rem" type="text" v-model="product.packsCount" />
            <input style="width: 3rem" type="text" v-model="product.piecesCount" />
          </td>
          <td><input type="text" v-model="product.carriageBy" /></td>
          <td><input type="text" v-model="product.invoiceNum" /></td>
          <td><input type="text" v-model="product.transportDoc" /></td>
          <td><button @click="productStore.removeProduct(product.id)">Usuń</button></td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td><input v-model="size" type="text" class="text" /></td>
          <td><input v-model="face" type="text" class="text" /></td>
          <td><input v-model="glue" type="text" class="text" /></td>
          <td><input v-model="packsCount" type="number" min="1" class="text" /></td>
          <td><input v-model="piecesCount" type="number" class="text" /></td>
          <td><button @click="addProduct()">Dodaj</button></td>
        </tr>
      </tfoot>
    </table>
  </section>
</template>

<style scoped></style>

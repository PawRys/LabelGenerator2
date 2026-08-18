<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/products_store'
import type { Product } from '@/types/shared_types'

const productStore = useProductStore()
const size = ref('')
const face = ref('')
const glue = ref('')
const note = ref('')
const packsCount = ref(1)
const piecesCount = ref(0)

let idCounter = 0
const escapeRegex = (value: string) => value.replace(/[*+?^${}()|[\]\\]/g, '\\$&')

const searchTruckNum = ref<string>('')
const searchCmrNum = ref<string>('')
const searchinput = ref<string>('')

const truckNumList = computed(() => {
  return [...new Set(productStore.products.map((product) => product.truckNum))]
})

const cmrNumList = computed(() => {
  return [...new Set(productStore.products.map((product) => product.cmrNum))]
})

const filteredProducts = computed(() => {
  return (
    productStore.products
      // .filter((product) => new RegExp(searchTruckNum.value, 'i').test(product.truckNum ?? ''))
      // .filter((product) => new RegExp(searchCmrNum.value, 'i').test(product.cmrNum ?? ''))
      .filter((product) =>
        [
          product.id,
          product.size,
          product.face,
          product.glue,
          product.invoiceNum,
          product.truckNum,
          product.cmrNum,
        ].some((value) => new RegExp(escapeRegex(searchinput.value), 'i').test(value ?? '')),
      )
  )
})

function addProduct() {
  productStore.addProduct({
    id: `id_${(++idCounter).toString().padStart(3, '0')}`,
    size: size.value,
    face: face.value,
    glue: glue.value,
    invoiceNum: note.value,
    packsCount: packsCount.value,
    piecesCount: piecesCount.value,
    truckNum: 'ręcznie dodany',
  })

  // wyczyszczenie formularza
  size.value = ''
  face.value = ''
  glue.value = ''
  note.value = ''
  packsCount.value = 1
  piecesCount.value = 0
}
</script>

<template>
  <section>
    <h3>Lista produktów {{ filteredProducts.length }}</h3>

    <!-- <select v-model="selectedTruckNum" multiple>
      <option value="">Wszystkie</option>

      <option v-for="truck in truckNumList" :key="truck" :value="truck">
        {{ truck }}
      </option>
    </select> -->

    <div><input v-model="searchinput" type="text" /></div>

    <!-- <div>
      <input v-model="searchTruckNum" list="truck-numbers" placeholder="Numer ciężarówki" />

      <datalist id="truck-numbers">
        <option v-for="truck in truckNumList" :key="truck" :value="truck" />
      </datalist>
    </div>

    <div>
      <input v-model="searchCmrNum" list="cmr-numbers" placeholder="Numer CMRki" />

      <datalist id="cmr-numbers">
        <option v-for="cmr in cmrNumList" :key="cmr" :value="cmr" />
      </datalist>
    </div> -->

    <table>
      <thead>
        <tr>
          <th>Nazwa</th>
          <th>Opis</th>
          <th>Notatka</th>
          <th>Klej/Ilość paczek/Ilość sztuk</th>
          <th>Numer auta</th>
          <th>Numer CMR</th>
          <th><button @click="productStore.removeAll()">Usuń wszystkie</button></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id" :id="product.id">
          <td><input type="text" v-model="product.size" /></td>
          <td><input type="text" v-model="product.face" /></td>
          <td><input type="text" v-model="product.invoiceNum" /></td>
          <td>
            <input style="width: 3rem" type="text" v-model="product.glue" />
            <input style="width: 3rem" type="text" v-model="product.packsCount" />
            <input style="width: 3rem" type="text" v-model="product.piecesCount" />
          </td>
          <td><input type="text" v-model="product.truckNum" /></td>
          <td><input type="text" v-model="product.cmrNum" /></td>
          <td><button @click="productStore.removeProduct(product.id)">Usuń</button></td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td><input v-model="size" type="text" class="text" /></td>
          <td><input v-model="face" type="text" class="text" /></td>
          <td><input v-model="note" type="text" class="text" /></td>
          <td style="display: flex">
            <input style="width: 3rem" v-model="glue" type="text" class="text" />
            <input style="width: 3rem" v-model="packsCount" type="number" min="1" class="text" />
            <input style="width: 3rem" v-model="piecesCount" type="number" class="text" />
          </td>
          <td><button @click="addProduct()">Dodaj</button></td>
        </tr>
      </tfoot>
    </table>
  </section>
</template>

<style scoped></style>

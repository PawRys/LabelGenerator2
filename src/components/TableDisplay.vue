<script setup lang="ts">
import Upload from '@/components/PDFUpload.vue'
import Icon from '@/components/LabelIcon.vue'

import { ref } from 'vue'
import { useProductStore } from '@/stores/products_store'

const productStore = useProductStore()
const size = ref('')
const face = ref('')
const glue = ref('')
const note = ref('')
const packsCount = ref(1)
const piecesCount = ref(0)
const pageCounter = () => productStore.filteredProducts.reduce((acc, item) => acc + item.packsCount, 0)

let idCounter = 0

function addProduct() {
  productStore.addProduct({
    id: `_id_${(999 - idCounter++).toString().padStart(3, '0')}`,
    timestamp: Date.now(),
    size: size.value,
    face: face.value,
    glue: glue.value,
    invoiceNum: note.value,
    packsCount: packsCount.value,
    piecesCount: piecesCount.value,
    arrivalPlace: 'Ręcznie dodany',
    truckNum: 'Ręcznie dodany',
    cmrNum: 'Ręcznie dodany',
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
    <Upload id="upload">Dodaj z faktur PDF</Upload>

    <table>
      <thead>
        <tr class="icons">
          <th><Icon highlight="title" /></th>
          <th><Icon highlight="desc" /></th>
          <th><Icon highlight="note" /></th>
          <th><Icon highlight="glue" /></th>
          <th><Icon highlight="pcs" /></th>
        </tr>

        <tr>
          <td><input class="new_title" placeholder="Tytuł" v-model="size" autocomplete="on" @keypress.enter="addProduct()" /></td>
          <td><textarea class="new_desc" placeholder="Opis" v-model="face" autocomplete="on"></textarea></td>
          <td><input class="new_note" placeholder="Notatka" v-model="note" autocomplete="on" @keypress.enter="addProduct()" /></td>
          <td><input class="new_glue" placeholder="Klej" v-model="glue" autocomplete="on" @keypress.enter="addProduct()" /></td>
          <td>
            <input class="new_packs" placeholder="Paczki" v-model="packsCount" type="number" @keypress.enter="addProduct()" min="1" />
            <span> x </span>
            <input class="new_pieces" placeholder="Szt." v-model="piecesCount" type="number" @keypress.enter="addProduct()" />
            <span>szt.</span>
          </td>
          <td><button class="btn-secondary" @click="addProduct()" @keypress.enter="addProduct()">Dodaj</button></td>
        </tr>

        <tr>
          <td colspan="4">
            <h3>Ilość stron do wydrukowania: {{ pageCounter() }}</h3>
          </td>
          <td colspan="2">
            <button v-if="pageCounter() > 0" @click="productStore.removeSelected(productStore.filteredProducts)">Usuń wszystkie wybrane</button>
          </td>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in productStore.filteredProducts" :key="product.id" :id="product.id">
          <td><input class="edit_title" v-model="product.size" autocomplete="on" /></td>
          <td><textarea class="edit_desc" v-model="product.face" autocomplete="on"></textarea></td>
          <td><input class="edit_note" v-model="product.invoiceNum" autocomplete="on" /></td>
          <td><input class="edit_glue" v-model="product.glue" autocomplete="on" /></td>
          <td>
            <input class="edit_packs" type="number" v-model="product.packsCount" min="1" />
            <span> x </span>
            <input class="edit_pieces" type="number" v-model="product.piecesCount" />
            <span>szt.</span>
          </td>
          <td><button @click="productStore.removeProduct(product.id)">Usuń</button></td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<style scoped>
section {
  display: grid;
  gap: 1rem;
}

#upload {
  place-self: end;
}

h3 {
  margin-bottom: 1rem;
}

.new_title,
.edit_title {
  text-align: center;
  width: 100%;
}

.new_desc,
.edit_desc {
  text-align: center;
  width: 30ch;
}

.new_note,
.edit_note {
  text-align: center;
  width: 100%;
}

.new_glue,
.edit_glue {
  text-align: center;
  width: 5ch;
}

.new_packs,
.edit_packs {
  text-align: right;
  width: 5ch;
}

.new_pieces,
.edit_pieces {
  text-align: right;
  width: 5ch;
}
</style>

<script setup lang="ts">
import BTN_Upload from '@/components/buttons/PDFUpload.vue'
import LabelIcon from '@/components/icons/LabelIcon.vue'

import { ref } from 'vue'
import { useProductStore } from '@/stores/products_store'

const productStore = useProductStore()
const size = ref('')
const face = ref('')
const glue = ref('')
const note = ref('')
const packsCount = ref(1)
const piecesCount = ref(0)

let idCounter = 0

function addProduct() {
  productStore.addProduct({
    id: `_reczny_${(999 - idCounter++).toString().padStart(3, '0')}`,
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
  <tr>
    <th colspan="6"><BTN_Upload id="upload">Dodaj z plików pdf</BTN_Upload></th>
  </tr>

  <tr class="icons">
    <th><LabelIcon highlight="title" /></th>
    <th><LabelIcon highlight="desc" /></th>
    <th><LabelIcon highlight="note" /></th>
    <th><LabelIcon highlight="glue" /></th>
    <th><LabelIcon highlight="pcs" /></th>
  </tr>

  <tr>
    <td>
      <input class="new_title" placeholder="Tytuł" v-model="size" autocomplete="on" @keypress.enter="addProduct()" />
    </td>
    <td><textarea class="new_desc" placeholder="Opis" v-model="face" autocomplete="on"></textarea></td>
    <td>
      <input class="new_note" placeholder="Notatka" v-model="note" autocomplete="on" @keypress.enter="addProduct()" />
    </td>
    <td>
      <input class="new_glue" placeholder="Klej" v-model="glue" autocomplete="on" @keypress.enter="addProduct()" />
    </td>

    <td>
      <input
        class="new_packs"
        placeholder="Paczki"
        v-model="packsCount"
        type="number"
        @keypress.enter="addProduct()"
        min="1"
      />
      <span> x </span>
      <input class="new_pieces" placeholder="Szt." v-model="piecesCount" type="number" @keypress.enter="addProduct()" />
      <span>szt.</span>
    </td>
    <td><button id="btn-add" @click="addProduct()" @keypress.enter="addProduct()">Dodaj</button></td>
  </tr>
</template>

<style scoped>
#upload {
  margin-block: 1rem;
  padding: 1rem;
  width: min(100%, 35ch);
  /* float: right; */
}

#btn-add {
  width: 100%;
  padding-block: 1em;
}

/* Chrome, Safari, Edge */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}

tr {
  margin-bottom: 2rem;
}

.new_title {
  font-family: 'Roboto Flex', var(--font-family, sans-serif);
  font-weight: 200;
}

.new_title,
.edit_title {
  text-align: center;
  width: 100%;
}

.new_desc,
.edit_desc {
  text-align: center;
  width: 26ch;
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
  text-align: center;
  width: 5ch;
}

.new_pieces,
.edit_pieces {
  text-align: center;
  width: 5ch;
}
</style>

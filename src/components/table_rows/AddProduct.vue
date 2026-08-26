<script setup lang="ts">
import BTN_Upload from '@/components/buttons/Btn_PDFUpload.vue'
import LabelIcon from '@/components/icons/LabelIcon.vue'

import { ref } from 'vue'
import { useProductStore } from '@/stores/products_store'
import { weight } from '@/exports/shared_script'

const productStore = useProductStore()
const size = ref('')
const face = ref('')
const glue = ref('')
const note = ref('')
const packsCount = ref(1)
const piecesCount = ref<number | null>(null)
const sizeInput = ref<HTMLInputElement | null>(null)

let idCounter = 0

function addProduct() {
  productStore.addProduct({
    id: `_reczny_${(999 - idCounter++).toString().padStart(3, '0')}`,
    timestamp: Date.now(),
    title: size.value,
    desc: face.value,
    note: note.value,
    glue: glue.value || `${weight(`${size.value} ${face.value}`, piecesCount.value || 0).toFixed(0)} kg`,
    weight: weight(`${size.value} ${face.value}`, piecesCount.value || 0),
    packsCount: packsCount.value,
    piecesCount: piecesCount.value || 0,
    arrivalPlace: 'Ręcznie dodany',
    truckNum: 'Ręcznie dodany',
    cmrNum: 'Ręcznie dodany',
  })

  /** wyczyszczenie formularza */
  // size.value = ''
  // face.value = ''
  // glue.value = ''
  // note.value = ''
  // packsCount.value = 1
  // piecesCount.value = null
  sizeInput.value?.focus()
}
</script>

<template>
  <li>
    <div class="heading-item grid-title">
      <LabelIcon class="title-icon" highlight="title" />
      <input
        class="add-title"
        placeholder="Tytuł"
        v-model="size"
        autocomplete="on"
        @keypress.enter="addProduct()"
        ref="sizeInput"
      />
    </div>

    <div class="heading-item grid-desc">
      <LabelIcon class="desc-icon" highlight="desc" />
      <textarea class="add-desc" placeholder="Opis" v-model="face" autocomplete="on"></textarea>
    </div>

    <div class="heading-item grid-note">
      <LabelIcon class="note-icon" highlight="note" />
      <input class="add-note" placeholder="Notatka" v-model="note" autocomplete="on" @keypress.enter="addProduct()" />
    </div>

    <div class="heading-item grid-glue">
      <LabelIcon class="glue-icon" highlight="glue" />
      <input
        class="add-glue"
        placeholder="Klej"
        v-model="glue"
        autocomplete="on"
        @keypress.enter="addProduct()"
        list="glue-datalist"
      />
    </div>

    <div class="heading-item grid-pack">
      <LabelIcon class="pcs-icon" highlight="pcs" />
      <span>
        <input
          class="add-packs"
          placeholder="Paczki"
          v-model="packsCount"
          type="number"
          @keypress.enter="addProduct()"
          min="1"
        />
        <span> x </span>
        <input
          class="add-pieces"
          placeholder="szt."
          v-model="piecesCount"
          type="number"
          @keypress.enter="addProduct()"
        />
        <!-- <span>szt.</span> -->
      </span>
    </div>

    <div class="heading-item grid-btn">
      <BTN_Upload id="btn-pdf">Dodaj pliki*</BTN_Upload>
      <button id="btn-add" @click="addProduct()" @keypress.enter="addProduct()">Dodaj</button>
    </div>
  </li>
  <li class="appendix">* Dozwolone pliki: LF Invoice.pdf / Stiga Invoice.pdf / Etykiety.json</li>
</template>

<style scoped>
.heading-item {
  height: 100%;
  /* gap: 0.5em; */
  display: grid;
  align-items: center;
  grid-template-rows: 1fr 1fr;
}

.heading-item :where(input, textarea, button):not(#btn-pdf) {
  border-color: orange;
}

.appendix {
  grid-template-columns: 1fr;
  color: grey;
  font-size: 0.8rem;
  text-align: right;
}

@media (max-width: 768px) {
  .heading-item {
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr;
    gap: 0.5em;
  }

  /* .grid-btn :nth-child(1) {
    order: 2;
  } */
}
</style>

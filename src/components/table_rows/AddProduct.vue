<script setup lang="ts">
import BTN_Upload from '@/components/buttons/Btn_PDFUpload.vue'
import LabelIcon from '@/components/icons/LabelIcon.vue'

import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/products_store'
import { calcWeight } from '@/exports/shared_script'

const productStore = useProductStore()

const title_input = ref('')
const desc_input = ref('')
const glue_input = ref('')
const note_input = ref('')
const packsCount = ref(1)
const piecesCount = ref<number | null>(null)
const sizeInput = ref<HTMLInputElement | null>(null)
const weight = computed(() => calcWeight(`${title_input.value} ${desc_input.value}`, piecesCount.value || 0))

let idCounter = 0

function addProduct() {
  productStore.addProduct({
    id: `_reczny_${(9999999999999 - Date.now()).toString().padStart(3, '0')}`,
    timestamp: Date.now(),
    title: title_input.value,
    desc: desc_input.value,
    note: note_input.value,
    glue: glue_input.value || `${weight.value.toFixed(0)} kg`,
    weight: weight.value,
    packsCount: packsCount.value,
    piecesCount: piecesCount.value || 0,
    arrivalPlace: 'Ręcznie dodany',
    truckNum: note_input.value.replace(/\s/g, '_') || 'Ręcznie dodany',
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
        name="title"
        type="text"
        autocomplete="on"
        v-model="title_input"
        @keypress.enter="addProduct()"
        ref="sizeInput"
      />
    </div>

    <div class="heading-item grid-desc">
      <LabelIcon class="desc-icon" highlight="desc" />
      <textarea
        class="add-desc"
        placeholder="Opis"
        name="description"
        v-model="desc_input"
        autocomplete="on"
      ></textarea>
    </div>

    <div class="heading-item grid-note">
      <LabelIcon class="note-icon" highlight="note" />
      <input
        class="add-note"
        placeholder="Notatka"
        name="note"
        v-model="note_input"
        autocomplete="on"
        @keypress.enter="addProduct()"
      />
    </div>

    <div class="heading-item grid-glue">
      <LabelIcon class="glue-icon" highlight="glue" />
      <input
        class="add-glue"
        placeholder="Klej"
        v-model="glue_input"
        name="glue"
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
input,
textarea {
  font-family: 'Roboto Flex';
  font-weight: 200;
}

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

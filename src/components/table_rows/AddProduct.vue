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
    id: `_reczny_${Date.now().toString().padStart(3, '0')}`,
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
  <section id="add-product">
    <LabelIcon style="grid-area: icon-1" class="title-icon" highlight="title" />
    <LabelIcon style="grid-area: icon-2" class="desc-icon" highlight="desc" />
    <LabelIcon style="grid-area: icon-3" class="note-icon" highlight="note" />
    <LabelIcon style="grid-area: icon-4" class="glue-icon" highlight="glue" />
    <LabelIcon style="grid-area: icon-5" class="pcs-icon" highlight="pcs" />

    <BTN_Upload style="grid-area: btn-pdf" id="btn-pdf">Dodaj pliki*</BTN_Upload>
    <button style="grid-area: btn-add" id="btn-add" @click="addProduct()" @keypress.enter="addProduct()">Dodaj</button>

    <input
      style="grid-area: inpt-1"
      class="add-title"
      placeholder="Tytuł"
      type="text"
      autocomplete="on"
      v-model="title_input"
      @keypress.enter="addProduct()"
      ref="sizeInput"
    />

    <textarea
      style="grid-area: inpt-2"
      class="add-desc wide-input"
      placeholder="Opis"
      v-model="desc_input"
      autocomplete="on"
    ></textarea>

    <input
      style="grid-area: inpt-3"
      class="add-note"
      placeholder="Notatka"
      v-model="note_input"
      autocomplete="on"
      @keypress.enter="addProduct()"
    />

    <input
      style="grid-area: inpt-4"
      class="add-glue short-input"
      placeholder="Klej"
      v-model="glue_input"
      autocomplete="on"
      @keypress.enter="addProduct()"
      list="glue-datalist"
    />

    <div style="grid-area: inpt-5" class="input-group">
      <input
        class="add-packs short-input"
        placeholder="Paczki"
        v-model="packsCount"
        type="number"
        @keypress.enter="addProduct()"
        min="1"
      />
      <span> x </span>
      <input
        class="add-pieces short-input"
        placeholder="szt."
        v-model="piecesCount"
        type="number"
        @keypress.enter="addProduct()"
      />
    </div>
  </section>

  <div class="additional-info">
    <p class="appendix appx-one">
      <a href="https://www.compart.com/en/unicode/block/U+2600" target="_blank" data-v-4c92c42b="">dodatkowe znaki</a>
    </p>
    <p class="appendix appx-two">* Dozwolone pliki: LF Invoice.pdf / Stiga Invoice.pdf / Etykiety.json</p>
  </div>
</template>

<style scoped>
#add-product {
  display: grid;
  align-items: center;
  align-content: center;
  grid-template-columns: 4fr 5fr 4fr auto auto auto;
  grid-template-areas:
    'icon-1 icon-2 icon-3 icon-4 icon-5 btn-pdf'
    'inpt-1 inpt-2 inpt-3 inpt-4 inpt-5 btn-add';
  gap: var(--spacing-medium);
}

@media (max-width: 1024px) {
  #add-product {
    place-self: anchor-center;
    width: min(100%, 22em);

    justify-items: center;
    grid-template-columns: auto 1fr 1fr;
    grid-template-areas:
      'icon-1 inpt-1 inpt-1'
      'icon-2 inpt-2 inpt-2'
      'icon-3 inpt-3 inpt-3'
      'icon-4 inpt-4 btn-pdf'
      'icon-5 inpt-5 btn-add';
  }

  button {
    place-self: end;
  }
}

textarea,
input {
  width: clamp(8em, 100%, 21em);
  border-width: 1px;
  border-color: var(--action-color-normal);

  font-family: 'Roboto Flex';
  font-weight: 200;
  text-align: center;
}

.input-group {
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
}

.short-input {
  width: 5em;
}

.wide-input {
  width: clamp(13em, 100%, 21em);
}

/* #btn-pdf {
  grid-row: 1;
  grid-column: 6;
} */

#btn-add {
  /* grid-row: 2;
  grid-column: 6; */
  border-width: 2px;
  border-color: var(--action-color-normal);
}

.additional-info {
  grid-column: 1 / -1;
}

/*
.heading-item {
  height: 100%;
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
}

.appx-one {
  text-align: center;
}

.appx-two {
  text-align: right;
}

@media (max-width: 768px) {
  .heading-item {
    grid-template-rows: 1fr;
    grid-template-columns: auto 1fr;
    gap: 0.5em;
  }

} */
</style>

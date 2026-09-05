<script setup lang="ts">
import BTN_Upload from '@/components/buttons/Btn_PDFUpload.vue'
import LabelIcon from '@/components/icons/LabelIcon.vue'
import ResetIcon from '@/components/icons/ResetIcon.vue'
import ClearIcon from '@/components/icons/ClearIcon.vue'

import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/products_store'
import { calcWeight } from '@/exports/shared_script'

const title_input = ref('')
const desc_input = ref('')
const glue_input = ref('')
const note_input = ref('')
const packs_input = ref(1)
const pieces_input = ref<number | null>(null)
const sizeInput = ref<HTMLInputElement | null>(null)
const weight = computed(() => calcWeight(`${title_input.value} ${desc_input.value}`, pieces_input.value || 0))

let idCounter = 0

function addProduct() {
  useProductStore().addProduct({
    id: `_reczny_${Date.now().toString().padStart(3, '0')}`,
    timestamp: Date.now(),
    title: title_input.value,
    desc: desc_input.value,
    note: note_input.value,
    glue: glue_input.value || `${weight.value.toFixed(0)} kg`,
    weight: weight.value,
    packsCount: packs_input.value,
    piecesCount: pieces_input.value || 0,
    arrivalPlace: 'Ręcznie dodany',
    truckNum: note_input.value.replace(/\s/g, '_') || 'Ręcznie dodany',
    cmrNum: 'Ręcznie dodany',
  })

  sizeInput.value?.focus()
}

function hasValues(): boolean {
  return title_input.value === '' &&
    desc_input.value === '' &&
    glue_input.value === '' &&
    note_input.value === '' &&
    packs_input.value === 1 &&
    pieces_input.value === null
    ? false
    : true
}

function clearForm(): void {
  title_input.value = ''
  desc_input.value = ''
  glue_input.value = ''
  note_input.value = ''
  packs_input.value = 1
  pieces_input.value = null
}
</script>

<template>
  <section id="add-product-section">
    <div class="input-wrapper">
      <LabelIcon class="title-icon" highlight="title" />
      <input
        class="add-title"
        placeholder="Tytuł"
        type="text"
        autocomplete="on"
        v-model="title_input"
        @keypress.enter="addProduct()"
        ref="sizeInput"
      />
    </div>

    <div class="input-wrapper">
      <LabelIcon class="desc-icon" highlight="desc" />
      <textarea class="add-desc wide-input" placeholder="Opis" v-model="desc_input" autocomplete="on" />
    </div>

    <div class="input-wrapper">
      <LabelIcon class="note-icon" highlight="note" />
      <input
        class="add-note"
        placeholder="Notatka"
        v-model="note_input"
        autocomplete="on"
        @keypress.enter="addProduct()"
      />
    </div>

    <div class="input-wrapper glue-wrapper">
      <LabelIcon class="glue-icon" highlight="glue" />
      <input
        class="add-glue short-input"
        placeholder="Klej"
        v-model="glue_input"
        autocomplete="on"
        @keypress.enter="addProduct()"
        list="glue-datalist"
      />
    </div>

    <div class="input-wrapper quantity-wrapper">
      <LabelIcon class="pcs-icon" highlight="pcs" />
      <div class="inline-flex">
        <input
          class="add-packs short-input"
          placeholder="Paczki"
          v-model="packs_input"
          type="number"
          @keypress.enter="addProduct()"
          min="1"
        />
        <span> x </span>
        <input
          class="add-pieces short-input"
          placeholder="szt."
          v-model="pieces_input"
          type="number"
          @keypress.enter="addProduct()"
        />

        <button @click="clearForm()" v-if="hasValues()"><ResetIcon /></button>
      </div>
    </div>

    <div class="input-wrapper button-wrapper inline-flex">
      <BTN_Upload id="btn-pdf">Dodaj pliki*</BTN_Upload>
      <button id="btn-add" @click="addProduct()" @keypress.enter="addProduct()">Dodaj</button>
    </div>

    <div class="appendix-wrapper">
      <div class="appendix appx-one inline-flex">
        <span>☠</span>
        <span>☢</span>
        <span>☣</span>
        <a href="https://www.compart.com/en/unicode/block/U+2600" target="_blank" class="appendix appx-one">
          więcej emotek
        </a>
      </div>
      <div class="appendix appx-two">* Dozwolone pliki: LF Invoice.pdf / Stiga Invoice.pdf / Etykiety.json</div>
    </div>
  </section>
</template>

<style scoped>
#add-product-section {
  margin-block: 2rem;

  display: grid;
  justify-self: center;
  grid-template-columns: 4fr 5fr 4fr auto auto auto;
  gap: var(--spacing-medium);
}

.input-wrapper {
  align-items: center;

  display: grid;
  grid-template-rows: 2fr 3fr;
  gap: var(--spacing-medium);
}

.button-wrapper {
  grid-column: 1 / -1;
  display: flex;
  justify-content: end;
}

.appendix-wrapper {
  grid-column: 1 / -1;
  /* font-size: 0.6rem; */
}

.appendix {
  color: var(--font-color-muted);
  font-size: 0.8rem;
}

.appx-one {
  gap: var(--spacing-large);
}

.appx-two {
  justify-self: end;
}

@media (max-width: 1024px) {
  #add-product-section {
    width: min(100%, 30em);
    grid-template-columns: auto 1fr;
  }

  .input-wrapper {
    align-items: center;
    grid-column: 1 / -1;
    display: flex;
    gap: var(--spacing-medium);
  }

  .glue-wrapper,
  .quantity-wrapper {
    grid-column: span 1;
  }

  .button-wrapper {
    margin-top: var(--spacing-large);
    justify-content: end;
  }
}

textarea,
input {
  width: max(8em, 100%);
  border-width: 1px;
  border-color: var(--action-color-normal);

  font-family: 'Roboto Flex';
  font-weight: 200;
  text-align: center;
}

.short-input {
  width: 5em;
}

.wide-input {
  width: max(13em, 100%);
}

#btn-add {
  border-width: 1px;
  border-color: var(--action-color-normal);
}
</style>

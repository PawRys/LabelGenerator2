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

const isNumberString = computed(() => {
  const value = glue_input.value.trim()

  return value !== '' && Number.isFinite(Number(value))
})

const weight = computed(() => {
  const value = glue_input.value.trim()
  const density = Number(value)

  if (value !== '' && Number.isFinite(density)) {
    return calcWeight(`${title_input.value} ${desc_input.value}`, pieces_input.value || 0, density)
  }

  return 0
})

let idCounter = 0

function addProduct() {
  useProductStore().addProduct({
    id: `_reczny_${Date.now().toString().padStart(3, '0')}`,
    timestamp: Date.now(),
    title: title_input.value,
    desc: desc_input.value,
    note: note_input.value,
    glue: !isNumberString.value ? glue_input.value : `${weight.value.toFixed(0)} kg`,
    weight: weight.value,
    packsCount: packs_input.value,
    piecesCount: pieces_input.value || 0,
    arrivalPlace: 'Ręcznie dodany',
    invoiceNum: 'Ręcznie dodany',
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
  <form id="add-product-section" autocomplete="on" @submit.prevent @keypress.enter.prevent>
    <div class="input-wrapper">
      <LabelIcon class="title-icon" highlight="title" />
      <input
        type="text"
        class="add-title"
        placeholder="Tytuł"
        autocomplete="on"
        name="title_input"
        v-model="title_input"
        @keypress.enter="addProduct()"
        ref="sizeInput"
      />
    </div>

    <div class="input-wrapper">
      <LabelIcon class="desc-icon" highlight="desc" />
      <textarea
        class="add-desc wide-input"
        placeholder="Opis"
        autocomplete="on"
        name="desc_input"
        v-model="desc_input"
      />
    </div>

    <div class="input-wrapper">
      <LabelIcon class="note-icon" highlight="note" />
      <input
        type="text"
        class="add-note"
        placeholder="Notatka"
        autocomplete="on"
        name="note_input"
        v-model="note_input"
        @keypress.enter="addProduct()"
      />
    </div>

    <div class="input-wrapper glue-wrapper">
      <LabelIcon class="glue-icon" highlight="glue" />
      <input
        type="text"
        class="add-glue short-input"
        placeholder="Klej"
        autocomplete="on"
        name="glue_input"
        v-model="glue_input"
        @keypress.enter="addProduct()"
        list="glue-datalist"
      />
    </div>

    <div class="input-wrapper quantity-wrapper">
      <LabelIcon class="pcs-icon" highlight="pcs" />
      <div class="inline-flex">
        <input
          type="number"
          min="1"
          class="add-packs short-input"
          placeholder="Paczki"
          name="packs_input"
          v-model="packs_input"
          @keypress.enter="addProduct()"
        />
        <span>x</span>
        <input
          type="number"
          class="add-pieces short-input"
          placeholder="szt."
          name="pieces_input"
          v-model="pieces_input"
          @keypress.enter="addProduct()"
        />

        <button @click.prevent="clearForm()" v-if="hasValues()" class="ghost"><ResetIcon /></button>
      </div>
    </div>

    <div class="input-wrapper button-wrapper inline-flex">
      <BTN_Upload id="btn-pdf">Dodaj pliki*</BTN_Upload>
      <button id="btn-add" class="action" @click="addProduct()" @keypress.enter="addProduct()" @click.prevent>
        Dodaj
      </button>
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
  </form>
</template>

<style scoped>
#add-product-section {
  margin-block: 2rem;
  width: 100%;

  display: grid;
  justify-self: center;
  grid-template-columns: 4fr 5fr 4fr auto auto auto;
  gap: var(--s-3);
}

.input-wrapper {
  align-items: center;

  display: grid;
  grid-template-rows: 2fr 3fr;
  gap: var(--s-3);
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
  gap: var(--s-8);
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
    gap: var(--s-3);
  }

  .glue-wrapper,
  .quantity-wrapper {
    grid-column: span 1;
  }

  .button-wrapper {
    margin-top: var(--s-8);
    justify-content: end;
  }
}

textarea,
input {
  width: max(8em, 100%);
  border-width: 0.1em;
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
</style>

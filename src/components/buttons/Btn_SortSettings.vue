<script setup lang="ts">
import type { SortFunction } from '@/types/shared_types'

import { ref, watch } from 'vue'
import { useProductStore } from '@/stores/products_store'
import { useSettingsStore } from '@/stores/settings_store'
import { useAttrs } from 'vue'

const attrs = useAttrs()
const settingsStore = useSettingsStore()
const productStore = useProductStore()
const dialog = ref<HTMLDialogElement | null>(null)

const sortOptions: { value: SortFunction; label: string }[] = [
  { value: 'default', label: 'Domyślne' },
  // { value: 'bysize', label: 'W/g rozmiaru' },
  // { value: 'byformat', label: 'W/g grupy formatu' },
  // { value: 'bytime', label: 'W/g czasu' },
  { value: 'bytruckandsize', label: 'W/g rozmiaru' },
  { value: 'bytruckandformat', label: 'W/g formatu' },
]

const sortGroups = [
  {
    title: 'Widok główny',
    key: 'sortOrderOfScreen',
    name: 'sortOrderOfScreen',
  },
  {
    title: 'Jedna duża (druk)',
    key: 'sortOrderOfPrintSingle',
    name: 'sortOrderOfPrintSingle',
  },
  {
    title: 'Dwie małe (druk)',
    key: 'sortOrderOfPrintDouble',
    name: 'sortOrderOfPrintDouble',
  },
  {
    title: 'Lista kontrolna (druk)',
    key: 'sortOrderOfPrintChecklist',
    name: 'sortOrderOfPrintChecklist',
  },
] as const

function openModal() {
  dialog.value?.showModal()
  // dialog.value?.show()
}

function closeModal() {
  dialog.value?.close()
}

function closeOnBackdrop(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    dialog.value?.close()
  }
}

watch([() => settingsStore.sortOrderOfScreen], () => {
  productStore.sortOrder = settingsStore.sortOrderOfScreen
})
</script>

<template>
  <button v-bind="attrs" @click="openModal">
    <slot>Ustawienia sortowania</slot>
  </button>

  <dialog ref="dialog" @click="closeOnBackdrop">
    <h3>Sortowanie dla:</h3>
    <section>
      <div class="group" v-for="group in sortGroups" :key="group.key">
        <h5>{{ group.title }}</h5>

        <label v-for="option in sortOptions" :key="`${group.key}-${option.value}`">
          <input v-model="settingsStore[group.key]" :value="option.value" :name="group.name" type="radio" />
          {{ option.label }}
        </label>
      </div>

      <button @click="closeModal">Zamknij</button>
    </section>
  </dialog>
</template>

<style scoped>
dialog {
  position: fixed;
  inset: 0;
  margin: auto;
  z-index: 111;
}

dialog::backdrop {
  background: rgb(0 0 0 / 50%);
}

section {
  display: grid;
  align-items: center;
  gap: 1rem;
}

.group {
  flex-basis: 50%;
  flex-grow: 1;
}

label {
  display: flex;
}
</style>

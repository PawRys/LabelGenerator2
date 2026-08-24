<script setup lang="ts">
import type { SortFunction } from '@/types/shared_types'

import { ref } from 'vue'
import { useSettingsStore } from '@/stores/settings_store'

const settingsStore = useSettingsStore()
const dialog = ref<HTMLDialogElement | null>(null)

const sortOptions: { value: SortFunction; label: string }[] = [
  { value: 'default', label: 'Domyślne' },
  { value: 'bysize', label: 'W/g rozmiaru' },
  { value: 'byformat', label: 'W/g grupy formatu' },
  // { value: 'bytime', label: 'W/g czasu' },
  { value: 'bytruckandsize', label: 'W/g rejestracji i rozmiaru' },
]

const sortGroups = [
  {
    title: 'Widok główny',
    key: 'screenView',
    name: 'screenView',
  },
  {
    title: 'Jedna duża (druk)',
    key: 'printSingleSortOrder',
    name: 'printSingleSortOrder',
  },
  {
    title: 'Dwie małe (druk)',
    key: 'printDoubleSortOrder',
    name: 'printDoubleSortOrder',
  },
  {
    title: 'Lista kontrolna (druk)',
    key: 'printChecklistSortOrder',
    name: 'printChecklistSortOrder',
  },
] as const

function openModal() {
  dialog.value?.showModal()
}

function closeModal() {
  dialog.value?.close()
}

function closeOnBackdrop(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    dialog.value?.close()
  }
}
</script>

<template>
  <button @click="openModal"><slot>Ustawienia sortowania</slot></button>

  <dialog ref="dialog" @click="closeOnBackdrop">
    <h3>Sortowanie dla:</h3>
    <table>
      <tr>
        <td v-for="group in sortGroups" :key="group.key">
          <h5>{{ group.title }}</h5>

          <label v-for="option in sortOptions" :key="`${group.key}-${option.value}`">
            <input v-model="settingsStore[group.key]" :value="option.value" :name="group.name" type="radio" />
            {{ option.label }}
          </label>
        </td>
      </tr>
    </table>

    <button @click="closeModal">Zamknij</button>
  </dialog>
</template>

<style scoped>
dialog::backdrop {
  background: rgb(0 0 0 / 50%);
}

label {
  display: flex;
}
</style>

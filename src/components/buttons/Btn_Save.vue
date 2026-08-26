<script setup lang="ts">
import type { Product } from '@/types/shared_types'

import { ref, computed, useAttrs } from 'vue'

import { useProductStore } from '@/stores/products_store'

const productStore = useProductStore()
const dialog = ref<HTMLDialogElement | null>(null)
const attrs = useAttrs()
const truckNumbers = computed(() => new Set(productStore.filteredProducts.map((item) => item.truckNum)))
function openModal() {
  console.log(truckNumbers.value.size)

  if (truckNumbers.value.size > 1) {
    dialog.value?.showModal()
  } else {
    saveJsonByTruck(productStore.filteredProducts)
  }
}

function saveSingle() {
  dialog.value?.close()
  saveJson(productStore.filteredProducts)
}

function saveByTruck() {
  dialog.value?.close()
  saveJsonByTruck(productStore.filteredProducts)
}

function closeOnBackdrop(event: MouseEvent) {
  if (event.target === event.currentTarget) {
    dialog.value?.close()
  }
}

const saveJson = (data: Product[]) => {
  const json = JSON.stringify(data, null, 2)

  const blob = new Blob([json], {
    type: 'application/json',
  })

  const url = URL.createObjectURL(blob)

  const a = document.createElement('a')
  a.href = url
  a.download = `Etykiety_${truckNumbers.value.size}_dostaw.json`
  a.click()

  URL.revokeObjectURL(url)
}

const saveJsonByTruck = (products: Product[]) => {
  const groups = new Map<string, Product[]>()

  for (const product of products) {
    const items = groups.get(product.truckNum) ?? []
    items.push(product)
    groups.set(product.truckNum, items)
  }

  for (const [truckNum, items] of groups) {
    const json = JSON.stringify(items, null, 2)

    const blob = new Blob([json], {
      type: 'application/json',
    })

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `${truckNum}.json`
    link.click()

    URL.revokeObjectURL(url)
  }
}
</script>

<template>
  <button v-bind="attrs" @click="openModal">
    <slot>Zapisz</slot>
  </button>

  <dialog ref="dialog" @click="closeOnBackdrop">
    <h3>Zapisz dane</h3>

    <p>Wybierz sposób zapisu ({{ truckNumbers.size }} dostaw):</p>

    <div class="button-bar">
      <button @click="saveSingle">Wszystkie dostawy w jednym pliku</button>

      <button @click="saveByTruck">Osobny plik dla każdej dostawy</button>

      <button @click="dialog?.close()">Anuluj</button>
    </div>
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

.button-bar {
  display: grid;
  align-content: center;
  gap: 0.5em;
}
</style>

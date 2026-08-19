<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/products_store'
import type { Product } from '@/types/shared_types'

const productStore = useProductStore()
const size = ref('')
const face = ref('')
const glue = ref('')
const note = ref('')
const packsCount = ref(1)
const piecesCount = ref(0)

let idCounter = 0
// const searchinput = ref<string>('')
// const selectedTruckNum = ref<string>('')
// const searchCmrNum = ref<string>('')

const truckNumList = computed(() => {
  return [
    ...new Set(
      productStore.products
        .map((product) => product.truckNum)
        .filter((truck): truck is string => truck !== undefined),
    ),
  ].sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    }),
  )
})

const cmrNumList = computed(() => {
  return [
    ...new Set(
      productStore.products
        .map((product) => product.cmrNum)
        .filter((cmr): cmr is string => cmr !== undefined),
    ),
  ].sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    }),
  )
})

const filteredProducts = computed(() => {
  const searchTerms = productStore.searchQuery.toLowerCase().trim().split(/\s+/).filter(Boolean)

  if (searchTerms.length === 0) {
    return productStore.products
  }

  return productStore.products.filter((product) => {
    const searchableText = [
      product.id,
      product.size,
      product.face,
      product.glue,
      product.invoiceNum,
      product.truckNum,
      product.cmrNum,
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return searchTerms.every((term) => searchableText.includes(term))
  })
})

function addProduct() {
  productStore.addProduct({
    id: `id_${(++idCounter).toString().padStart(3, '0')}`,
    size: size.value,
    face: face.value,
    glue: glue.value,
    invoiceNum: note.value,
    packsCount: packsCount.value,
    piecesCount: piecesCount.value,
    truckNum: 'Ręcznie dodany',
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
    <h3>Ilość paczek {{ filteredProducts.reduce((acc, item) => acc + item.packsCount, 0) }}</h3>

    <input v-model="productStore.searchQuery" type="search" name="" id="" />

    <select v-model="productStore.searchQuery">
      <option value="">Numer auta</option>

      <option v-for="truck in truckNumList" :key="truck" :value="truck">
        {{ truck }}
      </option>
    </select>

    <select v-model="productStore.searchQuery">
      <option value="">Numer CMR</option>

      <option v-for="cmr in cmrNumList" :key="cmr" :value="cmr">
        {{ cmr }}
      </option>
    </select>

    <table>
      <thead>
        <tr>
          <th>Tytuł</th>
          <th>Opis</th>
          <th>Notatka</th>
          <th>Klej/Paczki/Sztuki</th>
          <th>Dane dostawy</th>
          <th>
            <button @click="productStore.removeSelected(filteredProducts)">
              Usuń {{ filteredProducts.length }}
            </button>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id" :id="product.id">
          <td><input class="title" type="text" v-model="product.size" /></td>
          <td>
            <textarea class="desc" v-model="product.face" name="" id=""></textarea>
          </td>
          <td><input class="note" type="text" v-model="product.invoiceNum" /></td>
          <td>
            <input class="glue" type="text" v-model="product.glue" />
            <input class="packs" type="number" v-model="product.packsCount" min="1" />
            <input class="pcs" type="number" v-model="product.piecesCount" />
          </td>
          <td>
            {{
              `${product.truckNum || 'Brak danych'} / ${product.id || 'Brak danych'} / ${product.arrivalPlace || 'Brak danych'}`
            }}
          </td>
          <td><button @click="productStore.removeProduct(product.id)">Usuń</button></td>
        </tr>
      </tbody>

      <tfoot>
        <tr>
          <td><input placeholder="Tytuł" v-model="size" type="text" class="title" /></td>
          <textarea class="desc" v-model="face" name="" id=""></textarea>
          <td><input placeholder="Notatka" v-model="note" type="text" class="note" /></td>
          <td style="display: flex">
            <input placeholder="Klej" v-model="glue" type="text" class="glue" />
            <input placeholder="Paczki" v-model="packsCount" type="number" class="packs" min="1" />
            <input placeholder="Szt." v-model="piecesCount" type="number" class="pcs" />
          </td>
          <td><button @click="addProduct()">Dodaj</button></td>
        </tr>
      </tfoot>
    </table>
  </section>
</template>

<style scoped>
textarea {
  font-family: arial, sans-serif;
  text-align: center;
  width: 26ch;
}

.title {
  text-align: center;
  width: 18ch;
}

.desc {
  text-align: center;
  width: 26ch;
}

.note {
  text-align: center;
  width: 18ch;
}

.glue {
  text-align: center;
  width: 5ch;
}

.packs {
  text-align: right;
  width: 5ch;
}

.pcs {
  text-align: right;
  width: 5ch;
}
</style>

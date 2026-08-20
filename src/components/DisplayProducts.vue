<script setup lang="ts">
import { ref, computed } from 'vue'
import { useProductStore } from '@/stores/products_store'

const productStore = useProductStore()
const size = ref('')
const face = ref('')
const glue = ref('')
const note = ref('')
const packsCount = ref(1)
const piecesCount = ref(0)

let idCounter = 0

const arrivalPlaceList = computed(() => {
  return [
    ...new Set(
      productStore.products
        .map((product) => product.arrivalPlace)
        .filter((arrival): arrival is string => arrival !== undefined),
    ),
  ].sort((a, b) =>
    a.localeCompare(b, undefined, {
      numeric: true,
      sensitivity: 'base',
    }),
  )
})

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
    <h3>
      Ilość paczek
      {{ productStore.filteredProducts.reduce((acc, item) => acc + item.packsCount, 0) }}
    </h3>

    <input
      v-model="productStore.searchQuery"
      type="search"
      name=""
      list="search-options"
      placeholder="Szukaj..."
    />

    <datalist id="search-options">
      <option v-for="truck in truckNumList" :key="truck" :value="truck">
        {{ truck }}
      </option>
      <option v-for="cmr in cmrNumList" :key="cmr" :value="cmr">
        {{ cmr }}
      </option>
      <option v-for="arrival in arrivalPlaceList" :key="arrival" :value="arrival">
        {{ arrival }}
      </option>
    </datalist>

    <select v-model="productStore.searchQuery" size="7">
      <option value="">Numer auta</option>

      <option v-for="truck in truckNumList" :key="truck" :value="truck">
        {{ truck }}
      </option>
    </select>

    <select v-model="productStore.searchQuery" size="7">
      <option value="">Numer CMR</option>

      <option v-for="cmr in cmrNumList" :key="cmr" :value="cmr">
        {{ cmr }}
      </option>
    </select>

    <select v-model="productStore.searchQuery" size="7">
      <option value="">Miejsce dostawy</option>

      <option v-for="arrival in arrivalPlaceList" :key="arrival" :value="arrival">
        {{ arrival }}
      </option>
    </select>

    <button @click="productStore.sortFunction = 'default'">kolejność z faktury</button>
    <button @click="productStore.sortFunction = 'bysize'">po grubości</button>
    <button @click="productStore.sortFunction = 'byformat'">po formacie</button>

    <table>
      <thead>
        <tr>
          <th>Tytuł</th>
          <th>Opis</th>
          <th>Notatka</th>
          <th>Klej</th>
          <th>Paczki x Sztuki</th>
          <!-- <th>Dane dostawy</th> -->
          <th>
            <button @click="productStore.removeSelected(productStore.filteredProducts)">
              Usuń {{ productStore.filteredProducts.length }}
            </button>
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="product in productStore.filteredProducts" :key="product.id" :id="product.id">
          <td><input class="title" type="text" v-model="product.size" /></td>
          <td><textarea class="desc" v-model="product.face" name="" id=""></textarea></td>
          <td><input class="note" type="text" v-model="product.invoiceNum" /></td>
          <td><input class="glue" type="text" v-model="product.glue" /></td>
          <td>
            <input class="packs" type="number" v-model="product.packsCount" min="1" />
            <span>x</span>
            <input class="pcs" type="number" v-model="product.piecesCount" />
          </td>
          <!-- <td>
            {{
              `${product.id || 'Brak danych'} / ${product.arrivalPlace || 'Brak danych'} / ${product.truckNum || 'Brak danych'} `
            }}
          </td> -->
          <td><button @click="productStore.removeProduct(product.id)">Usuń</button></td>
        </tr>
      </tbody>

      <tfoot>
        <tr class="icons">
          <th>
            <div class="icon">
              <span class="active"></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </th>
          <th>
            <div class="icon">
              <span></span>
              <span class="active"></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </th>
          <th>
            <div class="icon">
              <span></span>
              <span></span>
              <span></span>
              <span class="active" span></span>
              <span></span>
            </div>
          </th>
          <th>
            <div class="icon">
              <span></span>
              <span></span>
              <span class="active"></span>
              <span></span>
              <span></span>
            </div>
          </th>
          <th>
            <div class="icon">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span class="active"></span>
            </div>
          </th>
        </tr>
        <tr>
          <td><input placeholder="Tytuł" v-model="size" type="text" class="title" /></td>
          <td>
            <textarea placeholder="Opis" v-model="face" class="desc"></textarea>
          </td>
          <td><input placeholder="Notatka" v-model="note" type="text" class="note" /></td>
          <td><input placeholder="Klej" v-model="glue" type="text" class="glue" /></td>
          <td>
            <input placeholder="Paczki" v-model="packsCount" type="number" class="packs" min="1" />
            <span>x</span>
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

.icon {
  display: grid;
  grid-template-columns: 3fr 5fr 3fr;
  grid-template-rows: 3fr 5fr 3fr;
  gap: 1px;
  place-self: center;

  width: 1.8rem;
  aspect-ratio: 1.4;
}

.icon span {
  height: 100%;
  background-color: silver;
}
.icon span.active {
  background-color: orange;
}
.icon span:nth-of-type(1) {
  grid-column: 1/4;
}
.icon span:nth-of-type(2) {
  grid-column: 1/4;
  /* grid-row: 2/4; */
}
.icon span:nth-of-type(3) {
  grid-column: 1/2;
  /* grid-row: 4/5; */
}
.icon span:nth-of-type(4) {
  grid-column: 2/3;
  /* grid-row: 4/5; */
}
.icon span:nth-of-type(5) {
  grid-column: 3/4;
  /* grid-row: 4/5; */
}
</style>

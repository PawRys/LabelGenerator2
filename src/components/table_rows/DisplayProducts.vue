<script setup lang="ts">
import { useProductStore } from '@/stores/products_store'

const productStore = useProductStore()
</script>

<template>
  <tr v-for="product in productStore.filteredProducts" :key="product.id" :id="product.id">
    <td><input class="edit_title" v-model="product.size" autocomplete="on" /></td>
    <td><textarea class="edit_desc" v-model="product.face" autocomplete="on"></textarea></td>
    <td><input class="edit_note" v-model="product.invoiceNum" autocomplete="on" /></td>
    <td>
      <input class="edit_glue" v-model="product.glue" autocomplete="on" />
      <input class="edit_packs" type="number" v-model="product.packsCount" min="1" />
      <span> x </span>
      <input class="edit_pieces" type="number" v-model="product.piecesCount" />
      <span>szt.</span>
      <button @click="productStore.removeProduct(product.id)">Usuń</button>
    </td>
  </tr>
</template>

<style scoped>
h3 {
  margin-block: 1rem;
}

/* Chrome, Safari, Edge */
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}

.new_title {
  font-family: 'Roboto Flex', var(--font-family, sans-serif);
  font-weight: 200;
}

.new_title,
.edit_title {
  text-align: center;
  width: 100%;
}

.new_desc,
.edit_desc {
  text-align: center;
  width: 100%;
}

.new_note,
.edit_note {
  text-align: center;
  width: 100%;
}

.new_glue,
.edit_glue {
  text-align: center;
  width: 5ch;
}

.new_packs,
.edit_packs {
  text-align: center;
  width: 5ch;
}

.new_pieces,
.edit_pieces {
  text-align: center;
  width: 5ch;
}
</style>

<script setup lang="ts">
import type { Product } from '@/types/shared_types'

import { useProductStore } from '@/stores/products_store'
const productStore = useProductStore()

function showTruckHeader(item: Product, index: number): boolean {
  if (!['bytruckandsize', 'default'].includes(productStore.sortFunction)) {
    return false
  }

  return index === 0 || (item.truckNum || '') !== (productStore.filteredProducts[index - 1]?.truckNum || '')
}
</script>

<template>
  <section>
    <!-- <h5>{{ productStore.filteredProducts[0]?.truckNum }}</h5> -->
    <table class="checklist">
      <template v-for="(item, index) in productStore.filteredProducts" :key="`checklist-${index}`">
        <tr v-if="showTruckHeader(item, index)">
          <th colspan="5">
            <h4 class="truck-number">{{ `${item.truckNum} - ${item.invoiceNum}` }}</h4>
          </th>
        </tr>
        <tr>
          <td>{{ `${index + 1}.` }}</td>
          <td class="item-size">{{ item.size }}</td>
          <td>{{ `${item.face} ${item.glue}` }}</td>
          <td>{{ `${item.packsCount}x${item.piecesCount}` }}</td>
          <td class="item-check">
            <div class="grid"><i v-for="x in item.packsCount" :key="`checklist-${index}-${x}`" class="square"></i></div>
          </td>
        </tr>
      </template>
    </table>
  </section>
</template>

<style scoped>
.page {
  box-sizing: border-box;
  width: 100%;
  height: 100svh;
  margin: 0;
  padding: 0;
  break-before: page;
}

table {
  border-collapse: collapse;
  margin-inline: 15mm;

  font-family: 'Roboto Flex', serif;
  font-size: 12pt;
}

.truck-number {
  text-align: left;
  margin-top: 1em;
  margin-bottom: 0.2em;
}

td {
  border-bottom: solid 1px silver;
  height: 100%;
  padding: 1ch 0.5ch;
  line-height: 1;
}

.item-size {
  /* border-left: solid 1px silver; */
  font-weight: 600;
}

.grid {
  display: grid;
  grid-template-columns: repeat(5, auto);
  gap: 1ch;
}

.square {
  display: inline-block;
  width: 1.5ch;
  aspect-ratio: 1;
  border: solid 1px grey;
  border-radius: 0.2ch;
}
</style>

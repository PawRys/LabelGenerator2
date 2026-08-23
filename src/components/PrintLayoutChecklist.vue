<script setup lang="ts">
import { useProductStore } from '@/stores/products_store'
const productStore = useProductStore()
</script>

<template>
  <section>
    <table class="checklist">
      <tr v-for="(item, index) in productStore.filteredProducts" :key="`checklist-${index}`">
        <td>{{ `${index + 1}.` }}</td>
        <td class="item-size">{{ item.size }}</td>
        <td>{{ `${item.face} ${item.glue}` }}</td>
        <td>{{ `${item.packsCount}x${item.piecesCount}` }}</td>
        <td class="item-check">
          <div class="grid"><i v-for="x in item.packsCount" :key="`checklist-${index}-${x}`" class="square"></i></div>
        </td>
      </tr>
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

  font-family: 'Roboto Flex', serif;
  font-size: 12pt;
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

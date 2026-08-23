<script setup lang="ts">
import { useProductStore } from '@/stores/products_store'
const productStore = useProductStore()
</script>

<template>
  <section>
    <template v-for="(item, index) in productStore.filteredProducts" :key="`${index}-${item.id})}`">
      <div class="page" v-for="i in item.packsCount" :key="`page-${index}-${i}`">
        <div class="label">
          <div class="label_title">{{ item.size }}</div>
          <div class="label_desc">{{ item.face }}</div>
          <div class="label_glue">{{ item.glue }}</div>
          <div class="label_note">{{ item.invoiceNum }}</div>
          <div class="label_pieces">{{ item.piecesCount }}</div>
        </div>
      </div>
    </template>
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

.label {
  --size: 297mm;

  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: 1fr auto auto;
  grid-template-areas:
    'titl titl titl'
    'desc desc desc'
    'glue note pcs ';
  align-items: end;
  gap: 0.2em;
  padding: 0.2em;

  font-size: calc(var(--size) / 10);
  font-family: 'Roboto Flex', serif;
  font-optical-sizing: auto;

  width: 100%;
  height: 100%;

  text-align: center;
  line-height: 1.1;
}

.label > div {
  overflow: hidden;
  overflow-wrap: break-word;
}

.label_title {
  grid-area: titl;
  max-height: 3.4em;
  font-weight: 600;
}

.label_desc {
  grid-area: desc;
  max-height: 3.4em;
  font-size: 0.9em;
}

.label_note {
  grid-area: note;
  max-height: 1.1em;
  font-size: 0.7em;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.label_glue {
  grid-area: glue;
  max-height: 1.1em;
}

.label_pieces {
  grid-area: pcs;
  max-height: 1.1em;
}

.label_pieces:after {
  content: 'szt.';
  font-size: 0.5em;
}
</style>

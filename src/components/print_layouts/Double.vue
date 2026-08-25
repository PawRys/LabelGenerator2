<script setup lang="ts">
import { useProductStore } from '@/stores/products_store'
const productStore = useProductStore()
</script>

<template>
  <section>
    <template v-for="(item, index) in productStore.filteredProducts" :key="`${index}-${item.id})}`">
      <div class="page" v-for="i in item.packsCount" :key="`page-${index}-${i}`">
        <div :class="`label first_label`">
          <div class="label_title">{{ item.size }}</div>
          <div class="label_desc">{{ item.face }}</div>
          <div class="label_glue">{{ item.glue }}</div>
          <div class="label_note">{{ item.invoiceNum }}</div>
          <div class="label_pieces">{{ item.piecesCount }}</div>
        </div>

        <div class="label second_label">
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
  --size: 210mm;
  --fs-normal: 2.8cm;
  --fs-small: calc(var(--fs-normal) * 0.75);
  --fs-smaller: calc(var(--fs-normal) * 0.55);
  --fs-smallest: calc(var(--fs-normal) * 0.35);

  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: 1fr auto auto;
  align-items: end;
  grid-template-areas:
    'title title title'
    'desc  desc  desc'
    'glue  note  pcs';

  gap: 0.2em;
  padding: 0.2em;
  width: 100%;
  height: 50%;

  font-family: 'Roboto Flex', serif;
  font-size: var(--fs-normal); /* Master font size for all label childs */
  font-weight: 500;
  text-align: center;
  line-height: 1.1;
}

.second_label {
  border-top: 1px dashed silver;
}

.label > div {
  overflow: hidden;
  overflow-wrap: break-word;
}

.label_title {
  grid-area: title;
  /* max-height: 1.1em; */
  font-size: var(--fs-normal);
  font-weight: 600;
}

.label_desc {
  grid-area: desc;
  min-height: calc(var(--fs-normal) * 1);
  max-height: calc(var(--fs-normal) * 2.3);
  font-size: var(--fs-small);
  white-space: pre-line;
  text-wrap: balance;
}

.label_note {
  grid-area: note;
  max-height: 2.2em;
  font-size: var(--fs-smallest);
  font-weight: 400;
  white-space: pre-line;
  text-wrap: balance;
  /* text-overflow: ellipsis; */
}

.label_glue {
  grid-area: glue;
  max-height: 1.1em;
  font-size: var(--fs-smaller);
}

.label_pieces {
  grid-area: pcs;
  max-height: 1.1em;
  font-size: var(--fs-normal);
  font-weight: 500;
  line-height: 0.8;
}

.label_pieces:after {
  content: 'szt.';
  font-size: var(--fs-smallest);
  font-weight: 400;
}
</style>

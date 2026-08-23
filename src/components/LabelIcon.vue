<script setup lang="ts">
defineProps({
  highlight: String,
})
</script>

<template>
  <div class="icon">
    <span :class="['title', { highlight: highlight === 'title' }]"></span>
    <span :class="['desc', { highlight: highlight === 'desc' }]"></span>
    <span :class="['glue', { highlight: highlight === 'glue' }]"></span>
    <span :class="['note', { highlight: highlight === 'note' }]"></span>
    <span :class="['pcs', { highlight: highlight === 'pcs' }]"></span>
  </div>
</template>

<style scoped>
.icon {
  display: grid;
  grid-template-columns: 3fr 5fr 3fr;
  grid-template-rows: 3fr 5fr 3fr;
  gap: 1px;
  place-self: center;

  width: 2rem;
  aspect-ratio: 1.41421;
}

.icon span {
  height: 100%;
  background-color: silver;
}
.icon span.highlight {
  background-color: orange;
}
.icon .title {
  grid-column: 1/4;
}
.icon .desc {
  grid-column: 1/4;
}
.icon .glue {
  grid-column: 1/2;
}
.icon .note {
  grid-column: 2/3;
}
.icon .pcs {
  grid-column: 3/4;
}
</style>

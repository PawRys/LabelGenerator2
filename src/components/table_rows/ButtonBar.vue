<script setup lang="ts">
import Btn_Save from '@/components/buttons/Btn_SaveProducts.vue'
import Btn_Reset from '@/components/buttons/Btn_ResetFilters.vue'
import Btn_Remove from '@/components/buttons/Btn_RemoveProducts.vue'
import Btn_Settings from '@/components/buttons/Btn_DisplaySettings.vue'
import Btn_PrintSingle from '@/components/buttons/Btn_PrintSingle.vue'
import Btn_PrintDouble from '@/components/buttons/Btn_PrintDouble.vue'
import Btn_PrintChecklist from '@/components/buttons/Btn_PrintChecklist.vue'

import { useProductStore } from '@/stores/products_store'

function pageCounter() {
  return useProductStore().filteredProducts.reduce((acc, item) => acc + item.packsCount, 0)
}
</script>

<template>
  <section v-if="pageCounter() > 0" id="buttons-section">
    <div class="button-bar button-bar-one">
      <Btn_PrintSingle class="print-btn" />
      <Btn_PrintDouble class="print-btn" />
      <Btn_PrintChecklist class="print-btn" />
    </div>

    <div class="button-bar button-bar-two">
      <Btn_Settings class="other-btn" />
      <Btn_Save class="other-btn" />
      <Btn_Remove class="other-btn" />
      <Btn_Reset class="other-btn reset-btn" />
    </div>
  </section>
</template>

<style scoped>
#buttons-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-large);
}

.button-bar {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-medium);
}

.print-btn {
  font-family: 'Roboto Flex', serif;
  font-weight: 300;
  font-optical-sizing: auto;
  font-style: normal;
  white-space: nowrap;

  padding-block: 1em;

  flex: 1 1 25%;
}

.other-btn {
  flex: 0 0 25%;
  padding-block: 0.5em;
}

.reset-btn {
  flex: 0 0 min-content;
}
</style>

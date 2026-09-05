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
      <Btn_PrintSingle class="print-btn large" />
      <Btn_PrintDouble class="print-btn large" />
      <Btn_PrintChecklist class="print-btn large" />
    </div>

    <div class="button-bar button-bar-two">
      <Btn_Settings class="other-btn ghost" />
      <Btn_Save class="other-btn ghost" />
      <Btn_Remove class="other-btn ghost" />
      <Btn_Reset class="other-btn ghost reset-btn" />
    </div>
  </section>
</template>

<style scoped>
#buttons-section {
  display: flex;
  flex-direction: column;
  gap: var(--s-8);
}

.button-bar {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--s-3);
}

.print-btn {
  font-family: 'Roboto Flex', serif;
  font-weight: 300;
  font-optical-sizing: auto;
  font-style: normal;
  white-space: nowrap;

  flex: 1 1 25%;
}

.reset-btn {
  flex: 0 0 min-content;
}
</style>

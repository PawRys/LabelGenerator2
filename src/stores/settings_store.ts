import { defineStore } from 'pinia'
import type { SortFunction } from '@/types/shared_types'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    sortOrderOfScreen: 'default' as SortFunction,
    sortOrderOfPrintSingle: 'bytruckandformat' as SortFunction,
    sortOrderOfPrintDouble: 'bytruckandformat' as SortFunction,
    sortOrderOfPrintChecklist: 'bytruckandsize' as SortFunction,
  }),

  persist: true,
})

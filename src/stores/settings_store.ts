import { defineStore } from 'pinia'
import type { SortFunction } from '@/types/shared_types'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    screenView: 'default',
    printSingleSortOrder: 'byformat',
    printDoubleSortOrder: 'byformat',
    printChecklistSortOrder: 'bytruckandsize',
    previusPrintMode: 'default',
  }),

  persist: true,
})

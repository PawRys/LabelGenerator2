import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    printSingleSortOrder: 'byformat',
    printDoubleSortOrder: 'byformat',
    printChecklistSortOrder: 'bysize',
    previusPrintMode: 'default' as 'default' | 'bytime' | 'bysize' | 'byformat',
  }),

  persist: true,
})

import { defineStore } from 'pinia'
import type { Product } from '@/types/shared_types'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    searchQuery: '',
  }),

  getters: {
    filteredProducts(state) {
      if (!state.searchQuery) return state.products
      return state.products.filter((product) => {
        return (
          product.size.includes(state.searchQuery) ||
          product.face.includes(state.searchQuery) ||
          product.invoiceNum.includes(state.searchQuery) ||
          product.truckNum.includes(state.searchQuery) ||
          product.cmrNum.includes(state.searchQuery)
        )
      })
    },
  },

  actions: {
    addProduct(product: Product) {
      this.products.push(product)
    },

    removeProduct(id: string) {
      this.products = this.products.filter((product) => product.id !== id)
    },

    removeSelected(productsToRemove: Product[]) {
      const ids = new Set(productsToRemove.map((product) => product.id))

      this.products = this.products.filter((product) => !ids.has(product.id))
    },

    removeAll() {
      this.products = []
    },

    updateProduct(id: string, updatedProduct: Partial<Product>) {
      const product = this.products.find((product) => product.id === id)

      if (!product) return

      Object.assign(product, updatedProduct)
    },

    sortItems(n: number) {},
  },
})

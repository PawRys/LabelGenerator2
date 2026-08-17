import { defineStore } from 'pinia'
import type { Product } from '@/types/shared_types'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
  }),

  actions: {
    addProduct(product: Product) {
      this.products.push(product)
    },

    removeProduct(id: string) {
      this.products = this.products.filter((product) => product.id !== id)
    },

    removeAll() {
      this.products = []
    },

    updateProduct(id: string, updatedProduct: Partial<Product>) {
      const product = this.products.find((product) => product.id === id)

      if (!product) return

      Object.assign(product, updatedProduct)
    },
  },
})

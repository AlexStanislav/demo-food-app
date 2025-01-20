import { defineStore } from 'pinia'
import type { FoodItems } from '@/utils/globalTypes'
import data from '../../db.json'
export const useAppStore = defineStore('app', {
  state: () => ({
    items: [] as FoodItems[],
  }),

  actions: {
    async fetchFoodItems() {
      console.log('fetching food items...', data)
      // const response = await fetch('../../db.json')
      // const data = await response.json()
      this.setFoodItems([...data])
    },
    setFoodItems(items: FoodItems[]) {
      this.items = items
    }
  }
})

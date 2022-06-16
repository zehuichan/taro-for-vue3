import { defineStore } from 'pinia'
import { store } from '@/store'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    globalData: new Map()
  }),
  getters: {},
  actions: {
    setData(key, value) {
      this.globalData.set(key, value)
    },
    getData(key) {
      return this.globalData.get(key)
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}

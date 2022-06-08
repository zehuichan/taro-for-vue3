import { defineStore } from 'pinia'
import { store } from '@/store'

export const useAppStore = defineStore({
  id: 'app',
  state: () => ({
    theme: 'light',
    count: 1
  }),
  getters: {},
  actions: {
    setThemeMode(theme) {
      this.theme = theme
    }
  }
})

export function useAppStoreWithOut() {
  return useAppStore(store)
}

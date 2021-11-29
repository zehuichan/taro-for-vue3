import { defineStore } from 'pinia'
import { store } from '../index'

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
  },
})

export function useAppStoreWithInstall() {
  return useAppStore(store)
}
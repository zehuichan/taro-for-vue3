import { defineStore } from 'pinia'
import { store } from '../index'

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    avatar: '',
    cellphone: '',
    username: '',
    github: ''
  }),
  getters: {},
  actions: {}
})

export function useUserStoreWithInstall() {
  return useUserStore(store)
}

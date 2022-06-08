import { defineStore } from 'pinia'
import { store } from '@/store'

// api
import { loginAccount, loginPhone } from '@/api/user'
// utils
import cache, { TOKEN_KEY, USER_INFO_KEY } from '@/utils/cache'
// hooks
import { useNavigator } from '@/hooks'
// js-base64
import { encode } from 'js-base64'

const { navigateTo } = useNavigator()

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    userInfo: cache.getItem(USER_INFO_KEY) || null,
    token: cache.getItem(TOKEN_KEY) || undefined
  }),
  getters: {},
  actions: {
    setToken(token) {
      this.token = token ? token : '' // for null or undefined value
      cache.setItem(TOKEN_KEY, token)
    },
    async loginAccount(data) {
      try {
        const res = await loginAccount({
          account: data.account,
          password: encode(data.password)
        })
        // save token
        this.setToken(res.data.tokenValue)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async loginPhone(data) {
      try {
        const res = await loginPhone({
          phone: data.phone,
          smsCaptchaText: data.smsCaptchaText
        })
        // save token
        this.setToken(res.data.tokenValue)
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async logout(goLogin = false) {
      this.setToken(undefined)
      goLogin && navigateTo('/pages/auth/quick/index')
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}

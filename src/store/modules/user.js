import { defineStore } from 'pinia'
import { store } from '@/store'

// api
import { getInfo, login } from '@/api/user'
// utils
import { Cache } from '@/utils/cache'
import { TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum'
// hooks
import { useRouter } from '@/hooks/core/useRouter'

const [, { navigate }] = useRouter()

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    token: undefined,
    userInfo: null,
    lastUpdateTime: 0
  }),
  getters: {
    getToken() {
      return this.token || Cache.getItem(TOKEN_KEY)
    },
    getUserInfo() {
      return this.userInfo || Cache.getItem(USER_INFO_KEY)
    },
    getLastUpdateTime() {
      return this.lastUpdateTime
    }
  },
  actions: {
    setToken(token) {
      this.token = token ? token : '' // for null or undefined value
      Cache.setItem(TOKEN_KEY, token)
    },
    setUserInfo(info) {
      this.userInfo = info
      this.lastUpdateTime = new Date().getTime()
      Cache.setItem(USER_INFO_KEY, info)
    },
    resetState() {
      this.token = ''
      this.userInfo = null
      this.lastUpdateTime = 0
    },
    async login(data) {
      try {
        const res = await login(data)
        console.log(res)
        // save token
        this.setToken(res.access_token)
        return Promise.resolve()
      } catch (e) {
        return Promise.reject(e)
      }
    },
    async getUserInfoAction() {
      if (!this.getToken) return null

      const res = await getInfo()
      const { data: { user = null } } = res

      this.setUserInfo(user)
      return Promise.resolve(user)
    },
    async logout(goLogin = false) {
      this.setToken(undefined)
      goLogin && navigate('/pages/auth/quick/index')
    }
  }
})

export function useUserStoreWithOut() {
  return useUserStore(store)
}

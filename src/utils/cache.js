import Taro from '@tarojs/taro'

// 默认缓存期限为7天
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7

export class Cache {
  static setItem(key, value, expire = DEFAULT_CACHE_TIME) {
    try {
      const stringData = JSON.stringify({
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null
      })
      Taro.setStorageSync(key, stringData)
    } catch (e) {
      console.log(e)
    }
  }

  static getItem(key, def = null) {
    const item = Taro.getStorageSync(key)
    if (item) {
      try {
        const data = JSON.parse(item)
        const { value, expire } = data
        // 在有效期内直接返回
        if (expire === null || expire >= Date.now()) {
          return value
        }
        this.removeItem(key)
      } catch (e) {
        return def
      }
    }
    return def
  }

  static removeItem(key) {
    try {
      Taro.removeStorageSync(key)
    } catch (e) {
      console.log(e)
    }
  }

  static clear() {
    try {
      Taro.clearStorageSync()
    } catch (e) {
      console.log(e)
    }
  }
}

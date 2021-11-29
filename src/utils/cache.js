import Taro from '@tarojs/taro'

const prefix = import.meta.env.VITE_WECHAT_APPID

class Cache {
  setItem(key, value) {
    try {
      Taro.setStorageSync(prefix + key, JSON.stringify(value))
    } catch (e) {
      console.log(e)
    }
  }

  getItem(key) {
    try {
      return JSON.parse(Taro.getStorageSync(prefix + key))
    } catch (e) {
      return ''
    }
  }

  removeItem(key) {
    return Taro.removeStorageSync(prefix + key)
  }
}


export default new Cache()

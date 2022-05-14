import Taro from '@tarojs/taro'

class Cache {
  setItem(key, value) {
    try {
      Taro.setStorageSync(key, JSON.stringify(value))
    } catch (e) {
      console.log(e)
    }
  }

  getItem(key) {
    try {
      return JSON.parse(Taro.getStorageSync(key))
    } catch (e) {
      return ''
    }
  }

  removeItem(key) {
    try {
      Taro.removeStorageSync(key)
    } catch (e) {
      console.log(e)
    }
  }

  clear() {
    try {
      Taro.clearStorageSync()
    } catch (e) {
      console.log(e)
    }
  }
}

export default new Cache()

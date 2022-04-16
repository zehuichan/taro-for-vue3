import Taro from '@tarojs/taro'
import { ref, watchEffect } from 'vue'

export default function useStorage(key, defaultValue) {
  const state = ref(getState())

  function getState() {
    const raw = Taro.getStorageSync(key)

    if (raw) {
      try {
        return JSON.parse(raw)
      } catch {
      }
    }

    return defaultValue
  }

  function setState() {
    Taro.setStorageSync(key, JSON.stringify(state.value))
  }

  watchEffect(setState)

  return state
}
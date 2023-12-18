import { getEnv } from '@tarojs/taro'
import { ref, unref, watchEffect } from 'vue'

export function useEnv() {
  const env = ref('')

  watchEffect(() => {
    env.value = getEnv()
  })

  return unref(env)
}

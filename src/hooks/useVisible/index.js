import { useDidShow, useDidHide } from '@tarojs/taro'
import { ref } from 'vue'

export default function useVisible() {
  const visible = ref(true)

  useDidShow(() => {
    visible.value = true
  })

  useDidHide(() => {
    visible.value = false
  })

  return visible
}

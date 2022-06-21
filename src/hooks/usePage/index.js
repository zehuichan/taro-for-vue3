import { getCurrentInstance, getCurrentPages } from '@tarojs/taro'
import { ref } from 'vue'

export default function usePage() {
  const pageStack = ref(getCurrentPages())
  const pageInstance = ref(getCurrentInstance())

  function useScope(selector) {
    return selector
      ? pageInstance.value.selectComponent(selector)
      : pageInstance.value.page
  }

  return [
    pageStack.value.length,
    {
      pageInstance: pageInstance.value,
      pageStack: pageStack.value,
      useScope
    }
  ]
}

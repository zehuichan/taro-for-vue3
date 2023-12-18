import { getCurrentInstance, getCurrentPages } from '@tarojs/taro'
import { ref } from 'vue'

export function usePage(scope) {
  const getPageInstance = () => {
    if (scope && typeof scope === 'string') {
      return getCurrentInstance().page?.selectComponent?.(scope)
    }

    return getCurrentInstance()
  }

  const pageStack = ref(getCurrentPages())
  const pageInstance = ref(getPageInstance())

  return [
    pageStack.value.length,
    {
      pageInstance: pageInstance.value,
      pageStack: pageStack.value
    }
  ]
}

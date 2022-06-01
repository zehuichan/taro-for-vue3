import Taro, { eventCenter, getCurrentInstance } from '@tarojs/taro'
import { nextTick, onMounted, ref } from 'vue'

export default function useRect(selector) {
  const height = ref(0)
  const bottom = ref(0)
  const left = ref(0)
  const right = ref(0)
  const top = ref(0)
  const width = ref(0)

  const update = () => {
    Taro.createSelectorQuery()
      .select(selector)
      .boundingClientRect()
      .exec((rects) => {
        const rect = rects[0]
        height.value = rect.height
        bottom.value = rect.bottom
        left.value = rect.left
        right.value = rect.right
        top.value = rect.top
        width.value = rect.width
      })
  }

  onMounted(() => {
    nextTick(update)
    eventCenter.once(getCurrentInstance().router.onReady, update)
  })

  return {
    height,
    bottom,
    left,
    right,
    top,
    width
  }
}

import { reactive } from 'vue'
import { useDictStoreWithOut } from '@/store/modules/dict'

const KEYS = []

export default function useDict() {
  const dictStore = useDictStoreWithOut()
  const res = reactive({})
  KEYS.forEach((d) => {
    res[d] = dictStore.getDictDatas?.[d] ?? []
  })
  return res
}

import { reactive, toRefs } from 'vue'
import { getDict } from '@/api/dict'

export default function useDict(...args) {
  const res = reactive({})
  return (() => {
    args.forEach((d, index) => {
      res[d] = []
      getDict(d).then((resp) => {
        res[d] = resp.data.map((p) => ({ ...p, text: p.name }))
      })
    })
    return toRefs(res)
  })()
}

import { ref, toRefs } from 'vue'
import { getDict } from '@/api/dict'

function init(names) {
  if (names === undefined) {
    throw new Error('need Dict names')
  }

  const ret = ref({})

  names.forEach(async (n) => {
    ret.value[n] = []
    try {
      const res = await getDict(n)
      ret.value[n] = res.data.map((item) => ({ ...item, text: item.name }))
    } catch (e) {
      console.log(e)
      ret.value[n] = []
    }
  })

  return toRefs(ret.value)
}

export function setupDict(app) {
  app.config.globalProperties.$dicts = init
}

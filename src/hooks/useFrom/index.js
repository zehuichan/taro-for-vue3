import { ref, watchEffect } from 'vue'
import { usePage } from '..'

export default function useFrom() {
  const [stackLength, { pageStack }] = usePage()
  const from = ref({})

  watchEffect(() => {
    let route = {}
    if (stackLength > 1) {
      route = pageStack[stackLength - 2]
    }
    from.value = route
  })

  return from
}

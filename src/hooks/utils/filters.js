import { ref } from 'vue'

export const createFilterWrapper = (filter, fn) => {
  function wrapper(...args) {
    const cb = () => fn.apply(this, args)
    const options = {
      fn,
      args,
      thisArg: this
    }
    filter(cb, options)
  }

  return wrapper
}

export const bypassFilter = (invoke) => invoke()

export function pausableFilter(extendFilter = bypassFilter) {
  const isActive = ref(true)

  function pause() {
    isActive.value = false
  }

  function resume() {
    isActive.value = true
  }

  const eventFilter = (...args) => {
    if (isActive.value) extendFilter(...args)
  }

  return { isActive, pause, resume, eventFilter }
}

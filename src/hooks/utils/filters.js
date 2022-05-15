import { ref } from 'vue'

export function createFilterWrapper(filter, fn) {
  function wrapper(...args) {
    filter(() => fn.apply(this, args), { fn, thisArg: this, args })
  }

  return wrapper
}

export const bypassFilter = (invoke) => {
  return invoke()
}

export function pausableFilter(extendFilter) {
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

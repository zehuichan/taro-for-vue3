import { isRef, unref, watch } from 'vue'
import { promiseTimeout } from '../utils'

export default function until(r) {
  let isNot = false

  function toMatch(condition, options = {}) {
    let { timeout, deep = false, flush = 'sync', throwOnTimeout } = options

    let stop = null
    const watcher = new Promise((resolve) => {
      stop = watch(
        r,
        (v) => {
          if (condition(v) === !isNot) {
            stop?.()
            resolve()
          }
        },
        {
          flush,
          deep,
          immediate: true
        }
      )
    })

    const promises = [watcher]
    if (timeout != null) {
      promises.push(
        promiseTimeout(timeout, throwOnTimeout)
          .then(() => unref(r))
          .finally(() => stop?.())
      )
    }

    return Promise.race(promises)
  }

  function toBe(value, options) {
    if (!isRef(value)) return toMatch((v) => v === value, options)

    const {
      flush = 'sync',
      deep = false,
      timeout,
      throwOnTimeout
    } = options ?? {}
    let stop = null
    const watcher = new Promise((resolve) => {
      stop = watch(
        [r, value],
        ([v1, v2]) => {
          if (isNot !== (v1 === v2)) {
            stop?.()
            resolve(v1)
          }
        },
        {
          flush,
          deep,
          immediate: true
        }
      )
    })

    const promises = [watcher]
    if (timeout != null) {
      promises.push(
        promiseTimeout(timeout, throwOnTimeout)
          .then(() => unref(r))
          .finally(() => {
            stop?.()
            return unref(r)
          })
      )
    }

    return Promise.race(promises)
  }

  function toBeTruthy(options) {
    return toMatch((v) => Boolean(v), options)
  }

  function toBeNull(options) {
    return toBe(null, options)
  }

  function toBeUndefined(options) {
    return toBe(undefined, options)
  }

  function toBeNaN(options) {
    return toMatch(Number.isNaN, options)
  }

  function toContains(value, options) {
    return toMatch((v) => {
      const array = Array.from(v)
      return array.includes(value) || array.includes(unref(value))
    }, options)
  }

  function changed(options) {
    return changedTimes(1, options)
  }

  function changedTimes(n = 1, options) {
    let count = -1 // skip the immediate check
    return toMatch(() => {
      count += 1
      return count >= n
    }, options)
  }

  if (Array.isArray(unref(r))) {
    const instance = {
      toMatch,
      toContains,
      changed,
      changedTimes,
      get not() {
        isNot = !isNot
        return this
      }
    }
    return instance
  } else {
    const instance = {
      toMatch,
      toBe,
      toBeTruthy: toBeTruthy,
      toBeNull: toBeNull,
      toBeNaN,
      toBeUndefined: toBeUndefined,
      changed,
      changedTimes,
      get not() {
        isNot = !isNot
        return this
      }
    }

    return instance
  }
}

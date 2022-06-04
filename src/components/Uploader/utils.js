import { toArray, isFunction } from '../utils'

export function isOversize(items, maxSize) {
  return toArray(items).some((item) => {
    if (item) {
      if (isFunction(maxSize)) {
        return maxSize(item.size)
      }
      return item.size > maxSize
    }
    return false
  })
}

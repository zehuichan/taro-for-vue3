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

export function filterFiles(items, maxSize) {
  const valid = []
  const invalid = []

  items.forEach((item) => {
    if (isOversize(item, maxSize)) {
      invalid.push(item)
    } else {
      valid.push(item)
    }
  })

  return { valid, invalid }
}

import { isDef, isNumeric } from './validate'

export function addUnit(value) {
  if (isDef(value)) {
    return isNumeric(value) ? `${value}rpx` : String(value)
  }
  return undefined
}

export function getSizeStyle(originSize) {
  if (isDef(originSize)) {
    if (Array.isArray(originSize)) {
      return {
        width: addUnit(originSize[0]),
        height: addUnit(originSize[1])
      }
    }
    const size = addUnit(originSize)
    return {
      width: size,
      height: size
    }
  }
}

const camelizeRE = /-(\w)/g

export const camelize = (str) =>
  str.replace(camelizeRE, (_, c) => c.toUpperCase())

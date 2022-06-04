export function noop() {}

export const extend = Object.assign

export function get(object, path) {
  const keys = path.split('.')
  let result = object

  keys.forEach((key) => {
    result = result[key] ?? ''
  })

  return result
}

export const toArray = (item) => (Array.isArray(item) ? item : [item])

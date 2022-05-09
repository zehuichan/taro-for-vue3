const opt = Object.prototype.toString

export function isArray(obj) {
  return opt.call(obj) === '[object Array]'
}

export function isNull(obj) {
  return opt.call(obj) === '[object Null]'
}

export function isBoolean(obj) {
  return opt.call(obj) === '[object Boolean]'
}

export function isObject(obj) {
  return opt.call(obj) === '[object Object]'
}

export const isPromise = (obj) => {
  return opt.call(obj) === '[object Promise]'
}

export function isString(obj) {
  return opt.call(obj) === '[object String]'
}

export function isNumber(obj) {
  return opt.call(obj) === '[object Number]' && obj === obj
}

export function isRegExp(obj) {
  return opt.call(obj) === '[object RegExp]'
}

export function isDate(obj) {
  return opt.call(obj) === '[object Date]'
}

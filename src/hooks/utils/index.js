import { stringify } from 'querystring'
import { isObject } from '@/utils/is'

export * from './constant'
export * from './filters'

export function promiseTimeout(ms, throwOnTimeout = false, reason = 'Timeout') {
  return new Promise((resolve, reject) => {
    if (throwOnTimeout) {
      setTimeout(() => reject(reason), ms)
    } else {
      setTimeout(resolve, ms)
    }
  })
}

export function stringfiyUrl(url, options) {
  let stringfiyUrl = url
  if (options && isObject(options)) {
    const hasQuery = stringfiyUrl.includes('?')
    stringfiyUrl += (hasQuery ? '&' : '?') + stringify(options)
  }
  return stringfiyUrl
}

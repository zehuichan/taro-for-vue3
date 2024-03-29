import { watch } from 'vue'
import { bypassFilter, createFilterWrapper } from '../utils'

export default function watchWithFilter(source, cb, options) {
  const { eventFilter = bypassFilter, ...watchOptions } = options
  return watch(source, createFilterWrapper(eventFilter, cb), watchOptions)
}

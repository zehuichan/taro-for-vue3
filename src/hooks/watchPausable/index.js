import { watchWithFilter } from '..'
import { pausableFilter } from '../utils'

export default function watchPausable(source, cb, options = {}) {
  const { eventFilter: filter, ...watchOptions } = options

  const { eventFilter, pause, resume, isActive } = pausableFilter(filter)

  const stop = watchWithFilter(source, cb, {
    ...watchOptions,
    eventFilter
  })

  return { stop, pause, resume, isActive }
}

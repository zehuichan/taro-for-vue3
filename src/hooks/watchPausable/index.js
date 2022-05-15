import { watchWithFilter } from '@/hooks'
import { pausableFilter } from '../utils/filters'

export default function watchPausable(source, cb, options) {
  const { eventFilter: filter, ...watchOptions } = options
  const { eventFilter, pause, resume, isActive } = pausableFilter(filter)
  const stop = watchWithFilter(source, cb, {
    ...watchOptions,
    eventFilter
  })

  return { stop, pause, resume, isActive }
}

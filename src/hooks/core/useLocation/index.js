import {
  openLocation,
  chooseLocation,
  choosePoi,
  startLocationUpdate,
  startLocationUpdateBackground,
  stopLocationUpdate
} from '@tarojs/taro'
import { ref, watchEffect } from 'vue'
import {
  getLocation,
  onLocationChange,
  offLocationChange,
  onLocationChangeError,
  offLocationChangeError
} from './utils'

export function useLocation(options) {
  const location = ref()

  watchEffect(() => {
    get()
  })

  function get(getOption) {
    return getLocation({ ...(options ?? {}), ...(getOption ?? {}) }).then(
      (res) => {
        location.value = res
        return res
      }
    )
  }

  function toggleUpdate(onOff, background) {
    return onOff
      ? background
        ? startLocationUpdateBackground()
        : startLocationUpdate()
      : stopLocationUpdate()
  }

  function on(callback, error) {
    if (error) {
      onLocationChangeError(callback)
    }

    onLocationChange(callback)
  }

  function off(callback, error) {
    if (error) {
      offLocationChangeError(callback)
    }

    offLocationChange(callback)
  }

  return [
    location,
    {
      get,
      choose: chooseLocation,
      choosePOI: choosePoi,
      open: openLocation,
      toggleUpdate,
      on,
      off
    }
  ]
}

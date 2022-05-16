import Taro from '@tarojs/taro'
import { ref, shallowRef, unref, watch } from 'vue'
import { guessSerializerType } from './guess'

export const StorageSerializers = {
  boolean: {
    read: (v) => v === 'true',
    write: (v) => String(v)
  },
  object: {
    read: (v) => JSON.parse(v),
    write: (v) => JSON.stringify(v)
  },
  number: {
    read: (v) => Number.parseFloat(v),
    write: (v) => String(v)
  },
  any: {
    read: (v) => v,
    write: (v) => String(v)
  },
  string: {
    read: (v) => v,
    write: (v) => String(v)
  },
  map: {
    read: (v) => new Map(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v.entries()))
  },
  set: {
    read: (v) => new Set(JSON.parse(v)),
    write: (v) => JSON.stringify(Array.from(v))
  },
  date: {
    read: (v) => new Date(v),
    write: (v) => v.toISOString()
  }
}

export default function useStorage(key, initialValue, options = {}) {
  const { flush = 'pre', deep = true, writeDefaults = true, shallow } = options
  const data = (shallow ? shallowRef : ref)(initialValue)
  const rawInit = unref(initialValue)
  const type = guessSerializerType(rawInit)
  const serializer = StorageSerializers[type]

  watch(data, () => write(data.value), {
    flush,
    deep
  })

  update()

  function write(v) {
    try {
      if (v == null) {
        Taro.removeStorageSync(key)
      } else {
        Taro.setStorageSync(key, serializer.write(v))
      }
    } catch (e) {
      console.error('write', e)
    }
  }

  function read(event) {
    if (event && event.key !== key) return

    try {
      const rawValue = event ? event.newValue : Taro.getStorageSync(key)
      if (rawValue == null) {
        if (writeDefaults && rawInit !== null) {
          Taro.setStorageSync(key, serializer.write(rawInit))
        }
        return rawInit
      } else if (typeof rawValue !== 'string') {
        return rawValue
      } else {
        return serializer.read(rawValue)
      }
    } catch (e) {
      console.error('read', e)
    }
  }

  function update(event) {
    if (event && event.key !== key) {
      return
    }
    data.value = read(event)
  }

  return data
}

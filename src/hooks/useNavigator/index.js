import {
  useRouter,
  switchTab,
  reLaunch,
  redirectTo,
  navigateTo,
  navigateBack,
  navigateToMiniProgram,
  navigateBackMiniProgram
} from '@tarojs/taro'
import { ref, watchEffect } from 'vue'

import { stringify } from 'querystring'
import { useFrom } from '..'
import { isBoolean, isObject, isString } from '../utils'

function stringfiyUrl(url, options) {
  let stringfiyUrl = url
  if (options && isObject(options)) {
    const hasQuery = stringfiyUrl.includes('?')
    stringfiyUrl += (hasQuery ? '&' : '?') + stringify(options)
  }
  return stringfiyUrl
}

export default function useNavigator() {
  const router = ref(useRouter())
  const from = useFrom()

  watchEffect(() => {
    router.value = { ...router.value, ...from.value }
  })

  function switchTabSync(url, options) {
    return new Promise((resolve, reject) => {
      try {
        url = stringfiyUrl(url, options)
        switchTab({ url, success: resolve, fail: reject }).catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  function relaunchSync(url, options) {
    return new Promise((resolve, reject) => {
      try {
        url = stringfiyUrl(url, options)
        reLaunch({ url, success: resolve, fail: reject }).catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  function redirectToSync(url, options) {
    return new Promise((resolve, reject) => {
      try {
        url = stringfiyUrl(url, options)
        redirectTo({ url, success: resolve, fail: reject }).catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  function navigateToSync(urlOrMark, options) {
    return new Promise((resolve, reject) => {
      try {
        const { appId } = options || {}
        // if appid exist, use navigateToMiniprogram
        if (appId && urlOrMark) {
          navigateToMiniProgram({
            ...options,
            appId,
            success: resolve,
            fail: reject
          }).catch(reject)
        } else if (isString(urlOrMark)) {
          urlOrMark = stringfiyUrl(urlOrMark, options)
          navigateTo({
            url: urlOrMark,
            success: resolve,
            fail: reject
          }).catch(reject)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  function navigateBackSync(deltaOrMark, extraData) {
    return new Promise((resolve, reject) => {
      try {
        // if deltaOrMark is boolean, use navigateBackMiniprogram
        if (isBoolean(deltaOrMark) && deltaOrMark) {
          navigateBackMiniProgram({
            ...(extraData ? { extraData } : {}),
            success: resolve,
            fail: reject
          }).catch(reject)
        } else {
          navigateBack({
            ...(deltaOrMark ? { deltaOrMark } : {}),
            success: resolve,
            fail: reject
          }).catch(reject)
        }
      } catch (e) {
        reject(e)
      }
    })
  }

  return [
    router,
    {
      switchTab: switchTabSync,
      relaunch: relaunchSync,
      redirectTo: redirectToSync,
      navigateTo: navigateToSync,
      navigateBack: navigateBackSync
    }
  ]
}

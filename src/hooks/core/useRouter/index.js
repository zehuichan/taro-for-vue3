import {
  useRouter as useTaroRouter,
  switchTab as switchTaroTab,
  reLaunch as relaunchAsync,
  redirectTo as redirectToAsync,
  navigateTo,
  navigateBack as navigateBackAsync,
  navigateToMiniProgram,
  navigateBackMiniProgram,
  openEmbeddedMiniProgram,
  exitMiniProgram
} from '@tarojs/taro'
import { ref } from 'vue'

import { useFrom } from '../useFrom'
import { stringfiyUrl } from '../../utils'

export function useRouter() {
  const router = ref(useTaroRouter())
  const from = useFrom()

  function navigate(url, payload, mini, embedded) {
    if (mini) {
      const { params = {}, ...extendsPayload } = payload
      const navigateURI = stringfiyUrl(url, params)
      const options = { path: navigateURI, ...extendsPayload }
      return embedded
        ? openEmbeddedMiniProgram(options)
        : navigateToMiniProgram(options)
    }
    const navigateURI = stringfiyUrl(url, payload)
    return navigateTo({ url: navigateURI })
  }

  function switchTab(url) {
    return switchTaroTab({ url })
  }

  function relaunch(url, payload) {
    const navigateURI = stringfiyUrl(url, payload)
    return relaunchAsync({ url: navigateURI })
  }

  function redirect(url, payload) {
    const navigateURI = stringfiyUrl(url, payload)
    return redirectToAsync({ url: navigateURI })
  }

  function back(payload, mini) {
    if (!mini) {
      return navigateBackAsync({ delta: payload || 1 })
    }
    return navigateBackMiniProgram({
      extraData: payload || {}
    })
  }

  return [
    { ...router.value, from },
    {
      navigate,
      switchTab,
      relaunch,
      redirect,
      back,
      exit: exitMiniProgram
    }
  ]
}

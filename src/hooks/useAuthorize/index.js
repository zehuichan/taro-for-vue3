import {
  getSetting,
  openSetting,
  authorize,
  authorizeForMiniProgram
} from '@tarojs/taro'
import { ref, watch } from 'vue'
import { useEnv, useVisible } from '..'
import { ENV_TYPE } from '../utils'

// https://github.com/NervJS/taro/issues/11685
export default function useAuthorize(withSubscriptions) {
  const env = useEnv()
  const visible = useVisible()
  const authSetting = ref({ mini: {} })
  const subscriptionsSetting = ref({})

  watch(() => visible.value, () => getSettingAsync(withSubscriptions))

  // todo for WEAPP
  function authorizeAsync(scope, mini) {
    const payload = { scope }
    console.log(payload)
    return mini ? authorizeForMiniProgram(payload) : authorize(payload)
  }

  // todo 鉴于支付宝限制，需要主动触发才能获取授权状态
  async function getSettingAsync(withSubscriptions) {
    return getSetting({ withSubscriptions }).then((res) => {
      const {
        authSetting: totalAuthSetting = {},
        subscriptionsSetting: totalSubscriptionsSetting,
        miniprogramAuthSetting: totalMiniprogramAuthSetting
      } = res
      authSetting.value = { ...totalAuthSetting, mini: totalMiniprogramAuthSetting }
      subscriptionsSetting.value = totalSubscriptionsSetting
      return res
    })
  }

  function openSettingAsync(withSubscriptions) {
    return openSetting({ withSubscriptions }).then((res) => {
      const { authSetting: totalAuthSetting, subscriptionsSetting: totalSubscriptionsSetting } = res
      authSetting.value = { ...totalAuthSetting, mini: authSetting.value.mini }
      subscriptionsSetting.value = totalSubscriptionsSetting
      return res
    })
  }

  return {
    authSetting,
    subscriptionsSetting,
    authorize: authorizeAsync,
    get: getSettingAsync,
    open: openSettingAsync
  }
}

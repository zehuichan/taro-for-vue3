import {
  getSetting,
  openSetting,
  authorize,
  authorizeForMiniProgram
} from '@tarojs/taro'
import { ref, watch } from 'vue'
import { useEnv, useVisible } from '..'
import { ENV_TYPE } from '../utils/constant'

// https://github.com/NervJS/taro/issues/11685
export default function useAuthorize(option) {
  const env = useEnv()
  const visible = useVisible()
  const authSetting = ref({})
  const subscriptionsSetting = ref({})
  const miniprogramAuthSetting = ref({})

  watch(visible, getSettingAsync, { immediate: true })

  // todo 鉴于支付宝限制，需要主动触发才能获取授权状态
  async function getSettingAsync() {
    try {
      const { withSubscriptions = false } = option || {}
      const {
        authSetting: totalAuthSetting = {},
        subscriptionsSetting: totalSubscriptionsSetting,
        miniprogramAuthSetting: totalMiniprogramAuthSetting
      } = await getSetting({ withSubscriptions })
      authSetting.value = totalAuthSetting
      if (withSubscriptions && totalSubscriptionsSetting) {
        subscriptionsSetting.value = totalSubscriptionsSetting
      }
      if (totalMiniprogramAuthSetting) {
        miniprogramAuthSetting.value = totalMiniprogramAuthSetting
      }
    } catch (e) {
      console.log(e)
    }
  }

  async function openSettingAsync(withSubscriptions = false) {
    return new Promise((resolve, reject) => {
      try {
        openSetting({
          withSubscriptions,
          success: (res) => {
            const {
              authSetting: totalAuthSetting,
              subscriptionsSetting: totalSubscriptionsSetting
            } = res
            if (withSubscriptions && totalSubscriptionsSetting) {
              subscriptionsSetting.value = totalSubscriptionsSetting
            }
            authSetting.value = { ...authSetting.value, totalAuthSetting }
            resolve(res)
          },
          fail: reject
        }).catch(reject)
      } catch (e) {
        reject({ errMsg: e })
      }
    })
  }

  // WEAPP
  async function authorizeAsync(scope, miniprogram = false) {
    return new Promise((resolve, reject) => {
      if (!scope && env === ENV_TYPE.WEAPP) {
        try {
          if (miniprogram) {
            authorizeForMiniProgram({
              scope,
              success: resolve,
              fail: reject
            })
          } else {
            authorize({
              scope,
              success: resolve,
              fail: reject
            }).catch(reject)
          }
        } catch (e) {
          console.log(e)
          reject(e)
        }
      } else {
        reject({ errMsg: 'authorize:fail' })
      }
    })
  }

  return [
    { authSetting, subscriptionsSetting, miniprogramAuthSetting },
    {
      getSetting: getSettingAsync,
      openSetting: openSettingAsync,
      authorize: authorizeAsync
    }
  ]
}

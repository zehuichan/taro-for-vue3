import {
  getUserInfo as taroGetUserInfo,
  getUserProfile as taroGetUserProfile
} from '@tarojs/taro'
import { ref } from 'vue'

import { useAuthorize } from '..'

export default function useUserInfo() {
  const userInfo = ref()

  const { get } = useAuthorize()

  function getUserInfo(options) {
    return get().then((res) => {
      if (res.authSetting['scope.userInfo']) {
        return taroGetUserInfo().then((res) => {
          userInfo.value = res
          return res
        })
      }
    })
  }

  function getUserProfile(options) {
    return taroGetUserProfile(options).then((res) => {
      userInfo.value = res
      return res
    })
  }

  return [userInfo, { getUserInfo, getUserProfile }]
}
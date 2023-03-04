import {
  login as taroLogin,
  pluginLogin as taroPluginLogin,
  checkSession
} from '@tarojs/taro'

export default function useLogin() {
  async function login(needCheck, plugin, timeout) {
    let checkResult = !needCheck
    if (!checkResult) {
      try {
        await checkSession()
      } catch (e) {
        checkResult = false
      }
    }
    if (!checkResult) {
      const payload = timeout ? { timeout } : {}
      return (plugin ? await taroPluginLogin(payload) : await taroLogin(payload))
    }
  }

  return { check: checkSession, login }
}
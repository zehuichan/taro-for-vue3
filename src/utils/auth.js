const TokenKey = 'vue_admin_template_token'

export function getToken() {
  try {
    const value = Taro.getStorageSync(TokenKey)
    if (value) {
      return value
    }
  } catch (e) {
    return ''
  }
}

export function setToken(token) {
  try {
    Taro.setStorageSync(TokenKey, token)
  } catch (e) {
  }
}

export function removeToken() {
  try {
    Taro.removeStorageSync(TokenKey)
  } catch (e) {
  }
}

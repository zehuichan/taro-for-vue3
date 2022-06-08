import Taro from '@tarojs/taro'

function switchTab(url) {
  Taro.switchTab({
    url
  })
}

function reLaunch(url) {
  Taro.reLaunch({
    url
  })
}

function redirectTo(url) {
  Taro.redirectTo({
    url
  })
}

function navigateTo(url) {
  Taro.navigateTo({
    url
  })
}

function navigateBack(delta) {
  Taro.navigateBack({
    delta
  })
}

export default function useNavigator() {
  return {
    switchTab,
    reLaunch,
    redirectTo,
    navigateTo,
    navigateBack
  }
}

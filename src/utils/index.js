import Taro from '@tarojs/taro'

/**
 * @description 获取当前页url
 */
export function getCurrentPage() {
  let pages = Taro.getCurrentPages()
  let currentPage = pages[pages.length - 1]
  return currentPage.route
}

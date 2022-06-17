import Taro from '@tarojs/taro'

export default function useMessage() {
  function showToast(title) {
    return new Promise((resolve, reject) => {
      try {
        Taro.showToast({
          title: title,
          icon: 'none',
          success: resolve,
          fail: reject
        }).catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  function hideToast() {
    return new Promise((resolve, reject) => {
      try {
        Taro.hideToast({
          success: resolve,
          fail: reject
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  function showLoading(title) {
    Taro.showLoading({
      title: title
    })
  }

  function hideLoading() {
    Taro.hideLoading()
  }

  function showModal(content, title) {
    return Taro.showModal({
      title: title,
      content: content,
      confirmColor: '#1677FF',
      cancelColor: '#999999'
    })
  }

  return { showToast, hideToast, showLoading, hideLoading, showModal }
}

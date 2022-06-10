import Taro from '@tarojs/taro'

function showToast(title) {
  Taro.showToast({
    title: title,
    icon: 'none'
  })
}

function hideToast() {
  Taro.hideToast()
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

export default function useToast() {
  return { showToast, hideToast, showLoading, hideLoading, showModal }
}

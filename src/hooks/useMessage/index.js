import {
  hideLoading,
  hideToast,
  showLoading,
  showModal,
  showToast
} from '@tarojs/taro'
import { ref, watchEffect } from 'vue'

export default function useMessage(option) {
  const initialOption = ref()

  watchEffect(() => {
    initialOption.value = option
  })

  function showToastAsync(title) {
    return new Promise((resolve, reject) => {
      try {
        const options = Object.assign(
          {},
          initialOption.value || {},
          option || {}
        )
        showToast({
          title: title,
          ...options,
          success: resolve,
          fail: reject
        }).catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  function hideToastAsync() {
    return new Promise((resolve, reject) => {
      try {
        hideToast({
          success: resolve,
          fail: reject
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  function showLoadingAsync(title = '') {
    return new Promise((resolve, reject) => {
      try {
        const options = Object.assign(
          {},
          initialOption.value || {},
          option || {}
        )
        showLoading({
          title: title,
          ...options,
          success: resolve,
          fail: reject
        }).catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  function hideLoadingAsync() {
    return new Promise((resolve, reject) => {
      try {
        hideLoading({
          success: resolve,
          fail: reject
        })
      } catch (e) {
        reject(e)
      }
    })
  }

  function showAlertAsync(content, title = '') {
    return new Promise((resolve, reject) => {
      try {
        showModal({
          title: title,
          content: content,
          confirmColor: '#1677FF',
          showCancel: false,
          success: resolve,
          fail: reject
        }).catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  function showConfirmAsync(content, title = '提示') {
    return new Promise((resolve, reject) => {
      try {
        showModal({
          title: title,
          content: content,
          confirmColor: '#1677FF',
          cancelColor: '#999999',
          success: resolve,
          fail: reject
        }).catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  return {
    showToast: showToastAsync,
    hideToast: hideToastAsync,
    showLoading: showLoadingAsync,
    hideLoading: hideLoadingAsync,
    showAlert: showAlertAsync,
    showConfirm: showConfirmAsync
  }
}

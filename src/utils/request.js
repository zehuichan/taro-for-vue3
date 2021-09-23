import Taro from '@tarojs/taro'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 格式化url，返回形参
const formatUrl = (url = '', json) => {
  return url.replace(/\{(\w+)\}/g, ($0, $1) => json?.[$1])
}

const interceptor = (chain) => {
  const config = chain.requestParams

  // format url
  if (config.data && Object.keys(config.data).length > 0) {
    config.url = formatUrl(config.url, config.data)
  }

  // let each request carry token
  // ['X-Token'] is a custom headers key
  // please modify it according to the actual situation
  if (store.getters.token) {
    config.header = {
      Authorization: getToken()
    }
  }

  return chain.proceed(config)
    .then(res => {
      console.log(`http <-- ${config.url} result:`, res)
      return res
    })
}

Taro.addInterceptor(interceptor)
// log
Taro.addInterceptor(Taro.interceptors.logInterceptor)
// timeout
Taro.addInterceptor(Taro.interceptors.timeoutInterceptor)

const TIMEOUT = 60 * 1000

const http = ({ url, method, header, data, timeout }) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: process.env.BASE_URL + url,
      method,
      header,
      data,
      timeout: timeout || TIMEOUT,
      success: (response) => {
        const res = response.data
        resolve(res)
      },
      fail: (error) => {
        console.log('error', error)
        reject(error)
      }
    })
  })
}

export default http
import Taro from '@tarojs/taro'
// utils
import cache from '@/utils/cache'

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
  const token = cache.getItem('token')

  if (token) {
    config.header = {
      ...config.header,
      Authorization: token
    }
  }

  return chain.proceed(config).then((res) => {
    return res
  })
}

Taro.addInterceptor(interceptor)

const TIMEOUT = 60 * 1000

const http = (options) => {
  return new Promise((resolve, reject) => {
    Taro.request({
      ...(options || {}),
      url: process.env.BASE_URL + options.url,
      timeout: options.timeout || TIMEOUT,
      success(response) {
        const res = response.data
        resolve(res)
      },
      fail(error) {
        console.log('error', error)
        reject(error)
      }
    })
  })
}

export default http

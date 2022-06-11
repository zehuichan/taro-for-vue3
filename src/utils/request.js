import Taro from '@tarojs/taro'
import cache, { TOKEN_KEY } from '@/utils/cache'
import { useMessage } from '@/hooks'
import { useUserStoreWithOut } from '@/store/modules/user'

const { showToast, showModal } = useMessage()

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
  const token = cache.getItem(TOKEN_KEY)

  config.header = {
    ...config.header,
    'app-code': process.env.APPID
  }

  if (token) {
    config.header = {
      ...config.header,
      'app-auth-token': token
    }
  }

  return chain
    .proceed(config)
    .then((response) => {
      console.log(1, response)
      const res = response.data
      if (res.errcode !== 0) {
        showToast(res.errmsg)
      }
      return Promise.resolve(res)
    })
    .catch(async (error) => {
      console.log(2, error)
      let errMessage = ''
      switch (error.status) {
        case 401:
          errMessage = '登录信息过期，请重新登录授权!'
          break
        case 404:
          errMessage = '网络请求错误,未找到该资源!'
          break
        case 405:
          errMessage = '网络请求错误,请求方法未允许!'
          break
        case 408:
          errMessage = '网络请求超时!'
          break
        case 500:
          errMessage = '服务器内部错误!'
          break
        case 501:
          errMessage = '服务未实现!'
          break
        case 502:
          errMessage = '网关错误!'
          break
        case 503:
          errMessage = '服务不可用!'
          break
        case 504:
          errMessage = '网关超时!'
          break
      }
      if (error.status === 401) {
        const cb = await showModal(errMessage)
        if (cb.confirm) {
          useUserStoreWithOut().logout(true)
        }
      } else {
        showToast(errMessage)
      }
      return Promise.reject(error)
    })
}

Taro.addInterceptor(interceptor)
Taro.addInterceptor(Taro.interceptors.logInterceptor)

const TIMEOUT = 60 * 1000

const http = (options) =>
  Taro.request({
    ...(options || {}),
    url: process.env.BASE_URL + options.url,
    timeout: options.timeout || TIMEOUT
  })

export default http

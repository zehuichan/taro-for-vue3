import Taro from '@tarojs/taro'
import { useMessage } from '@/hooks'
const { showModal } = useMessage()

const makePhoneCall = {
  mounted(el, binding) {
    el.addEventListener('tap', async () => {
      const cb = await showModal(`您将拨打电话：${binding.value}`, '联系商家')
      if (cb.confirm) {
        Taro.makePhoneCall({
          phoneNumber: String(binding.value)
        })
      }
    })
  }
}

export function setupMakePhoneCallDirective(app) {
  app.directive('makePhoneCall', makePhoneCall)
}

export default makePhoneCall

import Taro from '@tarojs/taro'

const openLocation = {
  mounted: function (el, binding) {
    console.log(binding)
    el.addEventListener('tap', () => {
      Taro.openLocation({
        latitude: binding.value.latitude,
        longitude: binding.value.longitude,
        name: binding.value.name,
        address: binding.value.address
      })
    })
  }
}

export function setupOpenLocationDirective(app) {
  app.directive('openLocation', openLocation)
}

export default openLocation

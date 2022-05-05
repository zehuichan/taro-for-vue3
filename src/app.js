import Taro from '@tarojs/taro'
import { createApp } from 'vue'

// global css
import './assets/less/index.less'

import { setupNutUI } from './plugins/nutui'
import { setupStore } from './store'

function bootstrap() {
  const app = createApp({
    created() {
      console.log('created')
      this.$instance = Taro.getCurrentInstance()
    },
    mounted() {
      console.log('mounted')
    },
    async onShow(options) {
      console.log('App Show', JSON.stringify(options))
    }
    // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  })

  setupNutUI(app)
  setupStore(app)

  return app
}

console.info('[info] ' + 'BASE_URL', process.env.BASE_URL)
console.info('[info] ' + 'NODE_ENV', process.env.NODE_ENV)
console.info('[info] ' + 'AppInfo', __APP_INFO__)
export default bootstrap()

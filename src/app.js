import { createApp } from 'vue'
import store from './store'

import NutUI from '@nutui/nutui-taro'
import '@nutui/nutui-taro/dist/style.css'
// 全局less
import './assets/less/index.less'

const App = createApp({
  async onShow(options) {
    console.log('App Show', JSON.stringify(options))
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(NutUI)
App.use(store)

export default App

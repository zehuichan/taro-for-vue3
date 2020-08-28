import { createApp } from 'vue'
import store from './store'

/*每个页面公共css */
import './wxcomponents/vant/dist/common/index.wxss';
import './app.less'

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(store)

export default App

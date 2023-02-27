import NutUI from '@nutui/nutui-taro'
import "@nutui/nutui-taro/dist/style.css";
import './nutui.less'

export function setupNutUI(app) {
  app.use(NutUI)
}

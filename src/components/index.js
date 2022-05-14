import Block from '@/components/Block'
import Card from '@/components/Card'
import ToolBar from '@/components/ToolBar'
import VehicleKeyboard from '@/components/VehicleKeyboard'

const components = [Block, Card, ToolBar, VehicleKeyboard]

export function registerComponents(app) {
  components.map((item) => {
    if (item.install) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}

import Card from '@/components/Card'
import Segmented from '@/components/Segmented'
import ToolBar from '@/components/ToolBar'

const components = [Card, Segmented, ToolBar]

export function registerComponents(app) {
  components.map((item) => {
    if (item.install) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}

import Card from '@/components/Card'
import Cell from '@/components/Cell'
import Segmented from '@/components/Segmented'
import Space from '@/components/Space'
import ToolBar from '@/components/ToolBar'
import Uploader from '@/components/Uploader'

const components = [Card, Cell, Segmented, Space, ToolBar, Uploader]

export function registerComponents(app) {
  components.map((item) => {
    if (item.install) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}

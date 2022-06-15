import Card from '@/components/Card'
import Cell from '@/components/Cell'
import Datepicker from '@/components/Datepicker'
import PlateInput from '@/components/PlateInput'
import PlateKeyboard from '@/components/PlateKeyboard'
import Segmented from '@/components/Segmented'
import Space from '@/components/Space'
import ToolBar from '@/components/ToolBar'
import Uploader from '@/components/Uploader'

const components = [
  Card,
  Cell,
  Datepicker,
  PlateInput,
  PlateKeyboard,
  Segmented,
  Space,
  ToolBar,
  Uploader
]

export function registerComponents(app) {
  components.map((item) => {
    if (item.install) {
      app.use(item)
    } else if (item.name) {
      app.component(item.name, item)
    }
  })
}

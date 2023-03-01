import { defineComponent } from 'vue'
import { createNamespace } from '../utils'

const [name] = createNamespace('tool-bar')

import './index.scss'

export default defineComponent({
  name,
  setup(props, { slots }) {
    return () => (
      <view class="v-tool-bar__placeholder">
        <view class="v-tool-bar">{slots.default?.()}</view>
      </view>
    )
  }
})

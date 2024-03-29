import { computed, defineComponent } from 'vue'
import { createNamespace } from '../utils'

const [name] = createNamespace('card')

import './index.scss'

export default defineComponent({
  name,
  props: {
    header: String,
    headerStyle: {
      type: Object,
      default: () => ({})
    },
    bodyStyle: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props, { slots }) {
    const { header, headerStyle, bodyStyle } = props

    const renderHeader = () => {
      if (slots.header || header) {
        return (
          <view class="v-card--header" style={{ ...headerStyle }}>
            {slots.header ? slots.header() : header}
          </view>
        )
      }
    }

    const bStyle = computed(() => ({ ...bodyStyle }))
    const renderBody = () => {
      return (
        <view class="v-card--body" style={bStyle.value}>
          {slots?.default()}
        </view>
      )
    }

    return () => (
      <view class={name}>
        {renderHeader()}
        {renderBody()}
      </view>
    )
  }
})

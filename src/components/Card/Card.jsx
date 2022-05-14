import { computed, defineComponent } from 'vue'
import { createNamespace } from '../utils'

const [name] = createNamespace('card')

import './index.less'

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
    },
    shadow: String
  },
  setup(props, { slots }) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { header, headerStyle, bodyStyle, shadow } = props

    const cn = computed(() => {
      return {
        [name]: true,
        [shadow ? `is-${shadow}-shadow` : 'is-always-shadow']: true
      }
    })

    const renderHeader = () => {
      if (slots.header) {
        return slots.header()
      }
      if (header) {
        return (
          <view class="v-card__header" style={headerStyle}>
            {slots.header()}
          </view>
        )
      }
    }

    return () => (
      <view class={cn.value}>
        {renderHeader()}
        <view class="v-card__body" style={bodyStyle}>
          {slots?.default()}
        </view>
      </view>
    )
  }
})

import { computed, defineComponent } from 'vue'
import { createNamespace, truthProp } from '../utils'

const [name] = createNamespace('cell')

import './index.less'

export default defineComponent({
  name,
  props: {
    title: String,
    value: String,
    center: Boolean,
    border: truthProp
  },
  setup(props, { slots }) {
    const { title, value, center, border } = props

    const cn = computed(() => ({
      [name]: true,
      [`${name}--center`]: center,
      [`${name}--borderless`]: !border
    }))

    const renderTitle = () => {
      if (slots.title || title) {
        return (
          <view class="v-cell__title">
            {slots.title ? slots.title() : title}
          </view>
        )
      }
    }

    const renderValue = () => {
      const slot = slots.value || slots.default
      const hasValue = slot || value

      if (hasValue) {
        const hasTitle = slots.title || title

        return (
          <view
            class={['v-cell__value', { [`v-cell__value--alone`]: !hasTitle }]}
          >
            {slot ? slot() : value}
          </view>
        )
      }
    }

    const renderRightIcon = () => {
      if (slots['right-icon']) {
        return slots['right-icon']()
      }
    }

    return () => (
      <view class={cn.value}>
        {renderTitle()}
        {renderValue()}
        {renderRightIcon()}
      </view>
    )
  }
})

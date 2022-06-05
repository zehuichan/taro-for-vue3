import { computed, defineComponent } from 'vue'
import { createNamespace, isArray, isNumber, makeStringProp } from '../utils'

const [name] = createNamespace('space')

import './index.less'

export default defineComponent({
  name,
  props: {
    align: String,
    direction: makeStringProp('horizontal'),
    size: {
      type: [Number, String, Array],
      default: 'small'
    },
    wrap: Boolean,
    fill: Boolean
  },
  setup(props, { slots }) {
    const mergedAlign = computed(
      () => props.align ?? (props.direction === 'horizontal' ? 'center' : '')
    )

    const cls = computed(() => [
      name,
      {
        [`${name}-${props.direction}`]: props.direction,
        [`${name}-align-${mergedAlign.value}`]: mergedAlign.value,
        [`${name}-wrap`]: props.wrap,
        [`${name}-fill`]: props.fill
      }
    ])

    const getMargin = (size) => {
      if (isNumber(size)) {
        return size
      }
      switch (size) {
        case 'mini':
          return 8
        case 'small':
          return 16
        case 'medium':
          return 32
        case 'large':
          return 48
        default:
          return 16
      }
    }

    const getMarginStyle = (index, isLast) => {
      const style = {}

      const marginRight = `${getMargin(
        isArray(props.size) ? props.size[0] : props.size
      )}rpx`
      const marginBottom = `${getMargin(
        isArray(props.size) ? props.size[1] : props.size
      )}rpx`

      if (isLast) {
        return props.wrap ? { marginBottom } : {}
      }

      if (props.direction === 'horizontal') {
        style.marginRight = marginRight
      }
      if (props.direction === 'vertical' || props.wrap) {
        style.marginBottom = marginBottom
      }

      return style
    }

    return () => {
      const items = slots.default?.() ?? []
      const isLast = items.length === 1

      return (
        <view class={cls.value}>
          {items.map((child, index) => (
            <view
              key={index}
              class={`${name}-item`}
              style={getMarginStyle(index, isLast)}
            >
              {child}
            </view>
          ))}
        </view>
      )
    }
  }
})

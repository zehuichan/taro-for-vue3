import { defineComponent } from 'vue'
import {
  addUnit,
  createNamespace,
  makeNumericProp,
  makeStringProp,
  numericProp
} from '../utils'

const [name] = createNamespace('plate-input')

import './index.less'

export default defineComponent({
  name,
  props: {
    value: makeStringProp(''),
    gutter: numericProp,
    length: makeNumericProp(8),
    focused: Boolean
  },
  emits: ['focus'],
  setup(props, { emit }) {
    const onTouchStart = (event) => {
      event.stopPropagation()
      emit('focus', event)
    }

    const renderPoints = () => {
      const Points = []
      const { value, gutter, length, focused } = props

      for (let i = 0; i < length; i++) {
        const char = value[i]
        const showCursor = focused && i === value.length

        let style
        if (i !== 0 && gutter) {
          style = { marginLeft: addUnit(gutter) }
        }

        Points.push(
          <view class={{ [`${name}__item`]: true }} style={style}>
            {char}
            {showCursor && <view class={{ [`${name}__cursor`]: true }} />}
          </view>
        )
      }

      return Points
    }

    return () => (
      <view class={name}>
        <view
          class={{ [`${name}__security`]: true }}
          onTouchstart={onTouchStart}
        >
          {renderPoints()}
        </view>
      </view>
    )
  }
})

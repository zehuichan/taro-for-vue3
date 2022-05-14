import { computed, defineComponent } from 'vue'
import { createNamespace, isArray, isString } from '../utils'

const [name] = createNamespace('block')

import './index.less'

const sizeMap = {
  large: '56rpx',
  medium: '36rpx',
  small: '24rpx'
}

export default defineComponent({
  name,
  props: {
    thumb: String,
    size: {
      type: [Number, String, Array],
      default: 'medium'
    },
    round: {
      type: Boolean,
      defalut: false
    },
    isLink: {
      type: Boolean,
      defalut: false
    }
  },
  setup(props, { slots }) {
    const cn = computed(() => {
      return {
        [name]: true,
        [`${name}-round`]: props.round
      }
    })

    // eslint-disable-next-line vue/return-in-computed-property
    const gutter = computed(() => {
      if (isString(props.size)) {
        return { padding: sizeMap[props.size] }
      }
      if (isArray(props.size)) {
        return { padding: `${props.size[0]} ${props.size[1]}` }
      }
    })

    const renderThumbImage = () => {
      if (props.thumb) {
        return (
          <view class="v-block__thumb">
            <image src={props.thumb} />
          </view>
        )
      }
    }

    const renderRightIcon = () => {
      if (props.isLink) {
        return (
          <view class="arrow">
            <nut-icon name="right" size="13" />
          </view>
        )
      }
    }

    return () => (
      <view class={cn.value} style={gutter.value}>
        {renderThumbImage()}
        <view class="v-block__content">{slots.default?.()}</view>
        {renderRightIcon()}
      </view>
    )
  }
})

import { defineComponent } from 'vue'
import { createNamespace, numericProp } from '../utils'

const [name] = createNamespace('plate-keyboard-key')

export default defineComponent({
  name,
  props: {
    type: String,
    text: numericProp,
    disabled: Boolean
  },
  emits: ['press'],
  setup(props, { emit }) {
    const onClick = () => {
      if (!props.disabled) {
        emit('press', props.text, props.type)
      }
    }

    return () => (
      <view
        class={{
          [`${name}__wrapper`]: true,
          [`${name}__disabled`]: props.disabled,
          [`${name}__delete`]: props.type === 'delete'
        }}
        onClick={onClick}
      >
        <view class={[name, 'tap-active']}>{props.text}</view>
      </view>
    )
  }
})

import { computed, defineComponent } from 'vue'
import { createNamespace } from '../utils'

const [name] = createNamespace('vehicle-keyboard-cell')

const TypeToStyle = {
  province: 'province-cell',
  character: 'character-cell',
  normal: 'normal-cell'
}

export default defineComponent({
  name,
  props: {
    cell: String,
    disabled: {
      type: Boolean,
      default: false
    },
    type: String
  },
  emits: ['click'],
  setup(props, { emit }) {
    const cn = computed(() => ({
      'keyboard-cell': true,
      [TypeToStyle[props.type]]: true,
      'cell-disabled': props.disabled
    }))
    const handleClick = () => {
      if (!props.disabled) {
        emit('click', props.cell)
      }
    }

    return () => (
      <view class={cn.value} onClick={handleClick}>
        <text class="cell-text">{props.cell}</text>
      </view>
    )
  }
})

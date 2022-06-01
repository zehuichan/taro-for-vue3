import { defineComponent, ref, watch } from 'vue'
import { createNamespace } from '../utils'

const [name] = createNamespace('segmented')

import './index.less'

export default defineComponent({
  name,
  props: {
    modelValue: {
      type: [String, Number],
      default: ''
    },
    columns: {
      type: Array,
      default: () => [],
      required: true
    },
    columnsFieldNames: {
      type: Object,
      default: () => ({ text: 'text', value: 'value' })
    },
    block: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      type: String,
      default: 'middle'
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { slots, emit }) {
    const formattedColumns = ref([])

    const format = () => {
      const { columns, columnsFieldNames } = props
      const { text, value } = columnsFieldNames
      formattedColumns.value = columns.map((item) => {
        return {
          text: item[text],
          value: item[value],
          ...item
        }
      })
    }

    watch(() => props.columns, format, { immediate: true })

    return () => (
      <view
        class={[
          name,
          {
            [`${name}-block`]: props.block,
            [`${name}-sm`]: props.size === 'small',
            [`${name}-lg`]: props.size === 'large'
          }
        ]}
      >
        {formattedColumns.value.map((item, index) => {
          return (
            <view
              class={[
                name + '-item',
                {
                  [name + '-item-selected']: props.modelValue === item.value,
                  [name + '-item-disabled']: props.disabled || item.disabled
                }
              ]}
              onClick={() => {
                if (props.disabled || item.disabled) return
                emit('update:modelValue', item.value)
                emit('change', item.value, index)
              }}
            >
              {
                <view class={{ [name + '-item-label']: true }}>
                  {slots.default
                    ? slots.default({
                        item,
                        index,
                        checked: props.modelValue === item.value
                      })
                    : item.text}
                </view>
              }
            </view>
          )
        })}
      </view>
    )
  }
})

import { computed, defineComponent, ref } from 'vue'
import { createNamespace, makeArrayProp, makeStringProp } from '../utils'

const [name] = createNamespace('picker')

function isEmptyValue(value) {
  if (Array.isArray(value)) {
    return !value.length
  }
  if (value === 0) {
    return false
  }
  return !value
}

export default defineComponent({
  name,
  props: {
    modelValue: makeArrayProp(),
    disabled: Boolean,
    readonly: Boolean,
    title: makeStringProp('请选择'),
    columns: makeArrayProp(),
    separator: makeStringProp('-')
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit }) {
    const show = ref(false)

    const dataType = computed(() => {
      const firstColumn = props.columns[0]

      if (Array.isArray(firstColumn)) {
        return 'multiple'
      }

      return 'text'
    })

    const text = computed(() => {
      if (isEmptyValue(props.modelValue)) {
        return ''
      }

      const ret = []

      if (dataType.value === 'text') {
        const result = props.columns.find(
          (val) => val.value === props.modelValue.join()
        )
        ret.push(result)
      } else {
        for (let [index, item] of props.columns.entries()) {
          const current = props.modelValue[index]
          ret.push(item.find((val) => val.value === current))
        }
      }
      return ret.map((item) => item?.text).join(props.separator)
    })

    const onClick = () => {
      if (props.disabled || props.readonly) {
        return
      }
      show.value = !show.value
    }

    const confirm = ({ selectedValue }) => {
      emit('update:modelValue', selectedValue)
      emit('change', selectedValue)

      show.value = false
    }

    const cancel = () => {
      show.value = false
      emit('canel')
    }

    return () => (
      <>
        <nut-input
          {...attrs}
          readonly
          modelValue={text.value}
          right-icon="arrow-right"
          onClick={onClick}
        />
        <nut-picker
          v-model:visible={show.value}
          columns={props.columns}
          title={props.title}
          onConfirm={confirm}
          onCancel={cancel}
        />
      </>
    )
  }
})

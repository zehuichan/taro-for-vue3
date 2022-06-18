import { computed, defineComponent, ref } from 'vue'
import { createNamespace } from '../utils'
import dayjs from 'dayjs'

const [name] = createNamespace('datepicker')

export default defineComponent({
  name,
  props: {
    modelValue: [Number, String, Date],
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    format: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss'
    },
    valueFormat: String,
    title: {
      type: String,
      default: '日期'
    }
  },
  emits: ['update:modelValue', 'change'],
  setup(props, { attrs, emit }) {
    const show = ref(false)

    const text = computed(() => {
      if (props.modelValue) {
        if (dayjs(props.modelValue).isValid()) {
          return dayjs(props.modelValue).format(props.format)
        }
        return props.modelValue
      }
      return ''
    })

    const date = computed(() => {
      if (props.modelValue) {
        return new Date(props.modelValue)
      }
      return new Date()
    })

    const onClick = () => {
      if (props.disabled || props.readonly) {
        return
      }
      show.value = !show.value
    }

    const confirm = ({ selectedOptions }) => {
      const value = selectedOptions.map((option) => option.text).join('-')
      const d = props.valueFormat
        ? dayjs(value).format(props.valueFormat)
        : new Date(value)
      emit('update:modelValue', d)
      emit('change', d)

      show.value = false
    }

    return () => (
      <>
        <nut-input
          {...attrs}
          readonly
          v-model={text.value}
          right-icon="arrow-right"
          onClick={onClick}
        />
        <nut-datepicker
          v-model={date.value}
          v-model:visible={show.value}
          title={props.title}
          onConfirm={confirm}
        />
      </>
    )
  }
})

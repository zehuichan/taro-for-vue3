import { defineComponent } from 'vue'
import { createNamespace } from '../utils'

const [name] = createNamespace('ocr')

import './index.less'
import Taro from '@tarojs/taro'

import { recognition } from '@/api/ocr'

export default defineComponent({
  name,
  props: {
    modelValue: Object,
    disabled: Boolean,
    readonly: Boolean
  },
  emits: ['update:modelValue', 'delete', 'oversize'],
  setup(props, { slots }) {
    const onChange = async ({ tempFiles }) => {
      const filePath = tempFiles.map((item) => item.path)
      const res = await recognition(filePath[0])
      console.log(res)
    }

    const onClickUpload = () => {
      if (props.disabled) {
        return
      }

      Taro.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: onChange
      })
    }

    const renderUpload = () => {
      if (slots.default) {
        return (
          <view
            class={{ [`${name}__input-wrapper`]: true }}
            onClick={onClickUpload}
          >
            {slots.default()}
          </view>
        )
      }
      return (
        <view
          class={{ [`${name}__upload`]: true, readonly: props.readonly }}
          onClick={onClickUpload}
        >
          <nut-icon
            name="uploader"
            class={{ [`${name}__upload-icon`]: true }}
          />
        </view>
      )
    }

    return () => <view class={name}>{renderUpload()}</view>
  }
})

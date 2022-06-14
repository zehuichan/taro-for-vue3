import Taro from '@tarojs/taro'
import { defineComponent } from 'vue'
import {
  createNamespace,
  makeNumericProp,
  makeStringProp,
  truthProp
} from '../utils'

const [name] = createNamespace('ocr')

import './index.less'

import { uploadFile } from '@/api/oss'
import { recognition } from '@/api/ocr'

export default defineComponent({
  name,
  props: {
    modelValue: Object,
    disabled: Boolean,
    readonly: Boolean,
    deletable: truthProp,
    imageMode: makeStringProp('scaleToFill'),
    maxCount: makeNumericProp(1),
    afterRead: Function,
    showUpload: truthProp,
    previewSize: [Number, String, Array],
    previewImage: truthProp
  },
  emits: ['update:modelValue', 'delete'],
  setup(props, { emit, slots }) {
    const onChange = async ({ tempFiles }) => {
      try {
        const filePath = tempFiles.map((item) => item.path)
        const url = await uploadFile(filePath[0])
        const res = await recognition({ image: url, side: 1, type: 1 })
        console.log(res.data)
        emit('update:modelValue', { ...props.modelValue, ...res.data })
      } catch (e) {
        console.log(e)
        emit('update:modelValue', {})
      }
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
      if (props.modelValue.length >= props.maxCount || !props.showUpload) {
        return
      }

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

    return () => (
      <view class={name}>
        <view
          class={{
            [`${name}__wrapper`]: true,
            [`${name}__wrapper--disabled`]: props.disabled
          }}
        >
          {renderUpload()}
        </view>
      </view>
    )
  }
})

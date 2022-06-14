import Taro from '@tarojs/taro'
import { defineComponent, ref } from 'vue'
import {
  createNamespace,
  getSizeStyle,
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
    showUpload: truthProp,
    previewSize: [Number, String, Array],
    previewImage: truthProp
  },
  emits: ['update:modelValue', 'delete'],
  setup(props, { emit, slots }) {
    const url = ref('')

    const onChange = async ({ tempFiles }) => {
      try {
        const filePath = tempFiles.map((item) => item.path)
        url.value = await uploadFile(filePath[0])
        const res = await recognition({ image: url.value, side: 1, type: 1 })
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

    // todo 前端拼接url地址
    const previewImage = async () => {
      await Taro.previewImage({
        current: process.env.BASE_URL + url.value,
        urls: [process.env.BASE_URL + url.value]
      })
    }

    const deleteFile = () => {
      url.value = ''
      emit('update:modelValue', {})
    }

    const renderPreview = () => {
      if (!url.value) {
        return
      }
      return (
        <view class={{ [`${name}__preview`]: true }}>
          <view
            class={{ [`${name}__preview-image`]: true }}
            style={getSizeStyle(props.previewSize)}
            onClick={previewImage}
          >
            <image v-src={url.value} mode={props.imageMode} />
          </view>
          {props.deletable && (
            <view
              class={{
                [`${name}__preview-delete`]: true,
                [`${name}__preview-delete--shadow`]: true
              }}
              onClick={deleteFile}
            >
              <nut-icon
                name="close"
                class={{ [`${name}__preview-delete-icon`]: true }}
              />
            </view>
          )}
        </view>
      )
    }

    const renderUpload = () => {
      if (url.value || !props.showUpload) {
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
          {renderPreview()}
          {renderUpload()}
        </view>
      </view>
    )
  }
})

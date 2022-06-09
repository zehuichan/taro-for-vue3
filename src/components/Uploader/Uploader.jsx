import Taro from '@tarojs/taro'
import { defineComponent, ref } from 'vue'
import {
  createNamespace,
  getSizeStyle,
  makeArrayProp,
  makeNumericProp,
  makeStringProp,
  truthProp
} from '../utils'

const [name] = createNamespace('uploader')

import './index.less'

import { isOversize } from './utils'

// api
import { uploadFile } from '@/api/oss'

export default defineComponent({
  name,
  props: {
    modelValue: makeArrayProp(),
    disabled: Boolean,
    readonly: Boolean,
    deletable: truthProp,
    imageMode: makeStringProp('scaleToFill'),
    maxCount: makeNumericProp(9),
    showUpload: truthProp,
    previewSize: [Number, String, Array],
    previewImage: truthProp,
    maxSize: {
      type: [Number, String, Function],
      default: Infinity
    }
  },
  emits: ['update:modelValue', 'delete', 'oversize'],
  setup(props, { emit, slots }) {
    const files = ref(props.modelValue.slice(0))

    const previewImage = async (item) => {
      const fileList = props.modelValue.slice(0)
      await Taro.previewImage({
        current: item,
        urls: fileList
      })
    }

    const deleteFile = (item, index) => {
      const fileList = props.modelValue.slice(0)
      fileList.splice(index, 1)

      emit('update:modelValue', fileList)
      emit('delete', item, index)
    }

    const renderPreviewItem = (item, index) => {
      return (
        <view class={{ [`${name}__preview`]: true }} key={index}>
          <view
            class={{ [`${name}__preview-image`]: true }}
            style={getSizeStyle(props.previewSize)}
            onClick={() => previewImage(item)}
          >
            <image v-src={item} mode={props.imageMode} />
          </view>
          {props.deletable && (
            <view
              class={{
                [`${name}__preview-delete`]: true,
                [`${name}__preview-delete--shadow`]: true
              }}
              onClick={() => deleteFile(item, index)}
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

    const renderPreviewList = () => {
      if (props.previewImage) {
        return props.modelValue.map(renderPreviewItem)
      }
    }

    const onClickUpload = async () => {
      try {
        const { tempFiles, tempFilePaths, apFilePaths } =
          await Taro.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera']
          })

        const { maxCount, modelValue, maxSize, disabled } = props

        if (disabled || !tempFiles || !tempFiles.length) {
          return
        }

        const remainCount = +maxCount - modelValue.length

        if (files.value.length > remainCount) {
          files.value = tempFiles.slice(0, remainCount)
        }

        if (isOversize(files.value, maxSize)) {
          emit('oversize', files.value)

          if (!files.value.length) {
            return
          }
        }

        const filePath =
          Taro.getEnv() === 'WEAPP' ? tempFilePaths[0] : apFilePaths[0]
        const res = await uploadFile(filePath)
        emit('update:modelValue', [...props.modelValue, res])
      } catch (e) {
        console.log(e)
      }
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
          style={getSizeStyle(props.previewSize)}
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
          {renderPreviewList()}
          {renderUpload()}
        </view>
      </view>
    )
  }
})

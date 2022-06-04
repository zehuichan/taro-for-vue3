import Taro from '@tarojs/taro'
import { defineComponent, reactive } from 'vue'
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
            <image src={item} mode={props.imageMode} />
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

    const readFile = (files) => {
      const { maxCount, modelValue, maxSize } = props

      const remainCount = +maxCount - modelValue.length

      if (files.length > remainCount) {
        files = files.slice(0, remainCount)
      }

      if (isOversize(files, maxSize)) {
        emit('oversize', files)

        if (!files.length) {
          return
        }
      }
      // todo oss上传
      files = reactive(files.map((item) => item.path))
      emit('update:modelValue', [...props.modelValue, ...files])
    }

    const onClickUpload = async () => {
      try {
        const { tempFiles } = await Taro.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera']
        })

        if (props.disabled || !tempFiles || !tempFiles.length) {
          return
        }
        readFile(tempFiles)
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

import Taro from '@tarojs/taro'
import { defineComponent } from 'vue'
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
    const urls = []

    const onClickUpload = async () => {
      const { maxCount, modelValue, maxSize, disabled } = props

      if (disabled) {
        return
      }

      try {
        let { tempFiles, tempFilePaths } = await Taro.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera']
        })

        const remainCount = +maxCount - modelValue.length

        if (tempFiles > remainCount) {
          tempFiles = tempFiles.slice(0, remainCount)
        }

        if (isOversize(tempFiles, maxSize)) {
          emit('oversize', ...tempFiles)

          if (!tempFiles.length) {
            return
          }
        }

        const filePath = tempFilePaths[0]
        const res = await uploadFile(filePath)
        emit('update:modelValue', [...props.modelValue, res])
      } catch (e) {
        console.log(e)
      }
    }

    // todo 前端拼接url地址
    const previewImage = async (item) => {
      await Taro.previewImage({
        current: process.env.BASE_URL + item,
        urls: urls
      })
    }

    const deleteFile = (item, index) => {
      const fileList = props.modelValue.slice(0)
      fileList.splice(index, 1)

      emit('update:modelValue', fileList)
      emit('delete', item, index)
    }

    const renderPreviewItem = (item, index) => {
      urls.push(process.env.BASE_URL + item)

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

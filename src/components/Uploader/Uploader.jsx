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

import './index.scss'

import { isOversize, filterFiles } from './utils'

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
    afterRead: Function,
    showUpload: truthProp,
    previewSize: [Number, String, Array],
    previewImage: truthProp,
    maxSize: {
      type: [Number, String, Function],
      default: Infinity
    }
  },
  emits: ['update:modelValue', 'delete', 'oversize', 'fail'],
  setup(props, { emit, slots }) {
    const urls = []

    const onAfterRead = (items) => {
      if (isOversize(items, props.maxSize)) {
        const result = filterFiles(items, props.maxSize)
        items = result.valid
        emit('oversize', result.invalid)
        if (!items.length) {
          return
        }
      }
      const filePath = items.map((item) => item.path)
      uploadFile(filePath[0])
        .then((res) => {
          emit('update:modelValue', [...props.modelValue, res])
          if (props.afterRead) {
            props.afterRead([...props.modelValue, res])
          }
        })
        .catch((e) => {
          console.log(e)
          emit('fail', e)
        })
    }

    const onChange = ({ tempFiles }) => {
      const { maxCount, modelValue } = props
      const remainCount = +maxCount - modelValue.length

      if (tempFiles.length > remainCount) {
        tempFiles = tempFiles.slice(0, remainCount)
      }

      onAfterRead(tempFiles)
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
      }).catch((err) => {
        console.log(err)
        console.log({ errcode: -1, errmsg: 'chooseImage:fail' })
      })
    }

    // todo 前端拼接url地址
    const previewImage = (item) => {
      Taro.previewImage({
        current: process.env.BASE_URL + item,
        urls: urls
      }).catch((err) => {
        console.log(err)
        console.log({ errcode: -1, errmsg: 'previewImage:fail' })
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

      const renderPreview = () => {
        return (
          <view
            class={{ [`${name}__preview-image`]: true }}
            style={getSizeStyle(props.previewSize)}
            onClick={() => previewImage(item)}
          >
            <image v-src={item} mode={props.imageMode} />
          </view>
        )
      }

      const renderDeleteIcon = () => {
        if (props.deletable) {
          return (
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
          )
        }
      }

      return (
        <view class={{ [`${name}__preview`]: true }} key={index}>
          {renderPreview()}
          {renderDeleteIcon()}
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

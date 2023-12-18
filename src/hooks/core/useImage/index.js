import {
  chooseImage,
  chooseMessageFile,
  compressImage,
  getImageInfo,
  previewImage,
  saveImageToPhotosAlbum
} from '@tarojs/taro'
import { ref } from 'vue'
import { useEnv } from '../useEnv'
import { ENV_TYPE } from '../../utils'

export default function useImage(options) {
  const env = useEnv()
  const fileInfo = ref({})

  function chooseImageAsync(option) {
    const { count, sizeType, sourceType } = options
    const finalOptions = Object.assign(
      {},
      Object.fromEntries(
        [
          ['count', count],
          ['sizeType', sizeType],
          ['sourceType', sourceType]
        ].filter((v) => v[1]) || []
      ),
      option || {}
    )
    return new Promise((resolve, reject) => {
      try {
        chooseImage({
          ...finalOptions,
          success: (res) => {
            const { ...totalFileInfo } = res
            fileInfo.value = totalFileInfo
            resolve(res)
          }
        }).catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  function previewImageAsync(option) {
    return new Promise((resolve, reject) => {
      try {
        previewImage({
          ...option,
          success: resolve,
          fail: reject
        }).catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  function saveImageToPhotosAlbumAsync(filePath) {
    return new Promise(async (resolve, reject) => {
      if (!filePath) {
        reject('you must provide filePath')
      } else {
        try {
          saveImageToPhotosAlbum({
            filePath,
            success: resolve,
            fail: reject
          }).catch(reject)
        } catch (e) {
          reject(e)
        }
      }
    })
  }

  function getImageInfoAsync(src) {
    return new Promise((resolve, reject) => {
      if (!src) {
        reject('please enter a valid path')
      } else {
        try {
          getImageInfo({
            src,
            success: resolve,
            fail: reject
          }).catch(reject)
        } catch (e) {
          reject(e)
        }
      }
    })
  }

  function chooseMessageFileAsync(count, type, extension) {
    return new Promise((resolve, reject) => {
      if (!count || env !== ENV_TYPE.WEAPP) {
        reject('you must provide count')
      } else {
        try {
          const payload = Object.fromEntries(
            [
              ['type', type],
              ['extension', extension]
            ].filter((v) => v[1]) || []
          )
          chooseMessageFile({
            count,
            ...payload,
            success: resolve,
            fail: reject
          }).catch(reject)
        } catch (e) {
          reject(e)
        }
      }
    })
  }

  function compressImageAsync(src, quality) {
    return new Promise(async (resolve, reject) => {
      if (!src) {
        reject('you must provide src')
      }
      try {
        compressImage({
          src,
          ...(quality ? { quality } : {}),
          success: resolve,
          fail: reject
        }).catch(reject)
      } catch (e) {
        reject(e)
      }
    })
  }

  return [
    fileInfo,
    {
      choose: chooseImageAsync,
      chooseMessageFile: chooseMessageFileAsync,
      preview: previewImageAsync,
      save: saveImageToPhotosAlbumAsync,
      getInfo: getImageInfoAsync,
      compress: compressImageAsync
    }
  ]
}

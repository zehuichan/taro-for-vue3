import Taro from '@tarojs/taro'
import { useMessage } from '@/hooks'

const { showLoading, hideLoading } = useMessage()

const bucketName = '4s-api'
const uploadKey = `${process.env.BASE_URL}/tmao-oss/oss/objects/${bucketName}/upload`
const downloadKey = `/tmao-oss/oss/objects/${bucketName}/download`

export function uploadFile(filePath) {
  showLoading('上传中...')
  return new Promise((resolve, reject) => {
    try {
      Taro.uploadFile({
        url: uploadKey,
        fileType: 'image',
        filePath: filePath,
        name: 'file',
        header: {
          'content-type': 'multipart/form-data',
          'app-code': process.env.APPID
        },
        success: (response) => {
          const res =
            response?.statusCode == 200
              ? JSON.parse(response?.data)
              : { errcode: -1, errmsg: 'uploadFile:fail' }

          if (res.errcode !== 0) {
            return reject(res)
          }
          return resolve(
            `${downloadKey}/${res.data.objectKey}?md5=${res.data.md5}`
          )
        },
        fail: reject,
        complete: hideLoading
      })
    } catch (e) {
      return reject({ errcode: -1, errmsg: 'uploadFile:fail' })
    }
  })
}

import Taro from '@tarojs/taro'

const bucketName = '4s-api'
const uploadKey = `${process.env.BASE_URL}/tmao-oss/oss/objects/${bucketName}/upload`
const downloadKey = `/tmao-oss/oss/objects/${bucketName}/download`

export function uploadFile(filePath) {
  return new Promise((resolve, reject) => {
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
        const res = JSON.parse(response.data)
        resolve(`${downloadKey}/${res.data.objectKey}?md5=${res.data.md5}`)
      },
      fail: reject
    })
  })
}

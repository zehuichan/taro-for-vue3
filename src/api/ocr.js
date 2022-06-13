import Taro from '@tarojs/taro'

export function recognition(filePath) {
  return new Promise((resolve, reject) => {
    Taro.uploadFile({
      url: '/tmao-app-auth/common/ocr/recognition',
      fileType: 'image',
      filePath: filePath,
      name: 'image',
      header: {
        'content-type': 'multipart/form-data',
        'app-code': process.env.APPID
      },
      success: (response) => {
        const res = JSON.parse(response.data)
        console.log(res)
        resolve(res)
      },
      fail: reject
    })
  })
}

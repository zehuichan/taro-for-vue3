import request from '@/utils/request'

export function recognition(data = {}) {
  return request({
    url: '/tmao-app-auth/common/ocr/recognition',
    method: 'POST',
    data: {
      ...data,
      image: `${process.env.BASE_URL}/${data.image}`
    }
  })
}

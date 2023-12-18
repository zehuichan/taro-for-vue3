import request from '@/utils/request'

export function dictData() {
  return request({
    url: '/system/dict/data/select',
    method: 'get'
  })
}
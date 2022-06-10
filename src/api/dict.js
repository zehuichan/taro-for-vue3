import request from '@/utils/request'

// 获取指定字典组下的全部子项
export function getDict(groupCode) {
  return request({
    url: `/tmao-app-auth/common/data_dict/items/${groupCode}`,
    method: 'GET'
  })
}

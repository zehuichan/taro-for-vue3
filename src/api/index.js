import request from '@/utils/request'

export function pageList(data = {}) {
  return request({
    url: '/api/index/info/pageList',
    method: 'GET',
    data
  })
}

// 发货列表-功能（签收、拒收、异常）
export function orderDeliverFuc(data = {}) {
  return request({
    url: '/order/v1/orders/{id}/{fnType}',
    method: 'POST',
    data
  })
}

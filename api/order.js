import request from '@/common/utils/request.js'

export function fetchWxpay(data) {
  return request({
    url: '/payment/wxpay',
    method: 'post',
		data
  })
}

export function fetchAlipay(data) {
  return request({
    url: '/payment/alipay',
    method: 'post',
		data
  })
}

export function fetchTradeOrder() {
	return request({
	  url: '/order',
	  method: 'get',
	}, true)
}

export function cancelTradeOrder(id) {
	return request({
	  url: `/order/cancel/${id}`,
	  method: 'get'
	})
}

export function delTradeOrder(id) {
	return request({
	  url: `/order/delete/${id}`,
	  method: 'delete'
	})
}
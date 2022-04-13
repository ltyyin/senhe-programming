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
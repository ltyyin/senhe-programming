import request from '@/common/utils/request.js'	

export function myOrder(data) {
	return request({
	  url: '/users/order',
	  method: 'get'
	})
}
import request from '@/common/utils/request.js'

export default {
	getCategoryList() {
		return request({
			url: `/categories`,
		})
	}
}
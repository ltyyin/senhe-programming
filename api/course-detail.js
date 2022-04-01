import request from '@/common/utils/request.js'

export default {
	getCourseDetailSummary(id) {
		return request({
			url: `/course-details?id=${id}`
		})
	},
	
	getChapterSection(id) {
		return request({
			url: `/course-details/chapter?id=${id}`
		})
	},
	
	getCourseComment(id) {
		return request({
			url: `/course-details/chapter?id=${id}`
		})
	},
	
	getCourseRecommend(id) {
		return request({
			url: `/course-details/recommend?id=${id}`
		})
	},
	
	getVideoList(id) {
		return request({
			url: `/course-details/videoList?id=${id}`
		})
	}
}
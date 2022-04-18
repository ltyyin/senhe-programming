import request from '@/common/utils/request.js'

export default {
	getCourseDetailSummary(id, isFree) {
		return request({
			url: `/course-details?id=${id}&isFree=${isFree}`
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
	},
	
	commitComment(data) {
		return request({
			url: '',
			method: 'POST',
			data
		})
	}
}
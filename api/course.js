import request from '@/common/utils/request.js'	
	
export default {
	getBannerList(options = { count: 4 }) {
		return request({
			url: `/courses/BannerList?count=${options.count}`,
		})
	},
	
	getNewsList() {
		return request({
			url: `/courses/newsList`,
		})
	},
	
	getNavList(options = { count: 10 }) {
		return request({
			url: `/courses/category?count=${options.count}`,
		})
	},
	
	getRecommendCourse(options = { count: 8 }) {
		return request({
			url: `/courses/recommend?count=${options.count}`,
		})
	},
	
	getNewCourseList(options = { count: 6 }) {
		return request({
			url: `/courses/recommend?count=${options.count}`,
		})
	},
	
	getFreeCourses(options = { count: 6 }) {
		return request({
			url: `/courses/free?count=${options.count}`,
		})
	},
	
	getChoicest(options = { count: 10 }) {
		return request({
			url: `/courses/choicest?count=${options.count}`,
		})
	}	
}
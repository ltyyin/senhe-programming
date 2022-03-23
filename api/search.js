import request from '@/common/utils/request.js'	

export default {
	// 获取热门搜索推荐列表
	getHotSearchList() {
		return request({
			url: '/search/hotList'
		})
	},
	
	getSearchCourseList(params) {
		return request({
			url: `/search/courseList?basisSort=${params.basisSort}&content=${params.content}&count=${params.count}&isFreeSort=${params.isFreeSort}`,
		})
	},
	
	getSearchArticleList(params) {
		return request({
			url: `/search/articleList?basisSort=${params.basisSort}&content=${params.content}&count=${params.count}&timeInterval=${params.timeInterval}`,
		})
	},
	
	getSearchQuestionList(params) {
		return request({
			url: `/search/questionList?basisSort=${params.basisSort}&content=${params.content}&count=${params.count}&timeInterval=${params.timeInterval}`,
		})
	}
}
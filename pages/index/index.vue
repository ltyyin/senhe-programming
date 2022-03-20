<template>
	<view class="home-container">
		<!-- 小程序自定义的搜索栏 -->
		<!-- #ifdef MP -->
		<search-input></search-input>
		<!-- #endif -->
			
		<!-- 自定义的刷新样式 -->
		<mescroll-body-diy ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback" :bottombar="false" :down="downOption" :up="upOption">
			<!-- 轮播图 -->
			<banner-img :banner-list="bannerList"></banner-img>
			
			<!-- 新闻提示 -->
			<news :news-list="newsList"></news>
			
			<!-- 图标导航栏 -->
			<nav-list :nav-list="navList"></nav-list>
			
			<!-- 课程推荐框架 -->
			<course-frame>
				<scroll-course :scroll-x="true" :course-list="recommendCourses.records"></scroll-course>
			</course-frame>
			
			<!-- 课程推荐框架 -->
			<course-frame titleName="新上好课">
				<swiper-course :course-list="newCourseList.records">
					<swiper-cover :cover-img="newCourseList.mainCover"></swiper-cover>
				</swiper-course>
			</course-frame>
			
			<course-frame titleName="免费好课">
				<swiper-course :course-list="freeCourseList.records">
					<swiper-cover :cover-img="freeCourseList.mainCover"></swiper-cover>
				</swiper-course>
			</course-frame>		
			
			
			<!-- scroll滚动栏课程 -->
			<course-frame titleName="课程精选">
				<scroll-course :scroll-y="true" :course-list="choicestCourseList.records"></scroll-course>
			</course-frame>			
		</mescroll-body-diy>	
		
	</view>
</template>

<script>
	import searchInput from '@/components/search-input.vue'
	import bannerImg from '@/components/banner-img.vue'
	import news from './components/news.vue'
	import navList from './components/nav-list.vue'
	import courseFrame from '@/components/course-frame.vue'
	import scrollCourse from '@/components/scroll-view/scroll-course.vue'
	import swiperCourse from '@/components/swiper-view/swiper-course.vue'
	import swiperCover from '@/components/swiper-view/swiper-cover.vue'	
	// 导入请求api
	import apiCourse from '@/api/course.js'
	// 导入信息提示
	import { msg } from '@/common/utils/tip.js'
	// 导入自定义滚动样式插件混合
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollBodyDiy from "@/uni_modules/mescroll-uni/components/mescroll-diy/xinlang/mescroll-body.vue";
	import mixin from '@/common/mixin/mixin.js'
	
	export default {
		// 使用mixin
		mixins: [MescrollMixin, mixin],
		components:{
			searchInput,
			bannerImg,
			news,
			navList,
			courseFrame,
			scrollCourse,
			swiperCourse,
			swiperCover,
			
			// 滚动样式组件
			MescrollBodyDiy
		},
		data(){
			return {
				downOption: {
					beforeEndDelay: 500,
					offset: 60,
					inOffsetRate: 0.2
				},
				upOption: {
					toTop: {
						src: ''
					},
					offset: 50
				},
				
				requestList: [
					// 获取Banner列表
					{
						method: 'getBannerList',
						obj: 'bannerList',
						options: {
							count: 4
						}
					},
					// 获取新闻列表
					{
						method: 'getNewsList',
						obj: 'newsList'
					},
					// 获取nav列表分类
					{
						method: 'getNavList',
						obj: 'navList'
					},
					// 获取推荐课程列表
					{
						method: 'getRecommendCourse',
						obj: 'recommendCourses'
					},
					// 获取新上课课程列表
					{
						method: 'getNewCourseList',
						obj: 'newCourseList'
					},
					// 获取免费课程列表
					{
						method: 'getFreeCourses',
						obj: 'freeCourseList'
					}		
				],
				
				// 初始化的变量
				bannerList: [],
				newsList: [],
				navList: [],
				recommendCourses: { records:[] },
				newCourseList: {mainCover:'', records:[] },
				freeCourseList: {mainCover:'', records:[] },
				choicestCourseList: { records:[] },
				// 获取精选课程的数量，默认是10
				count: 10,
			}
		},
		
		methods:{
			// 请求列表
			async requestListMethod(method, obj, options) {
				let res = await apiCourse[method](options)
				if(res.statusCode ===200){
					this[obj] = res.data
				}else {
					msg({title:'页面加载失败！'})
				}
			},
			
			upCallback(page) {
				if(page.num === 1){
					this.requestList.forEach((req,index) => {
						this.requestListMethod(req.method, req.obj, req.options)
					})
				}
				
				/* 因为本机连接查询比较快，使用延迟定时器来模拟慢速加载 */
				setTimeout(async ()=>{
					// 获取精选课程
					let res = await apiCourse.getChoicest({
						count:this.count
					})
					
					if(res.statusCode ===200){
						if(page.num === 1){
							this.choicestCourseList = res.data
						}else {
							this.choicestCourseList.records.push(...res.data.records)
						}	
						
						/* 判断下次传递的count值 */
						let difference = this.choicestCourseList.total - this.choicestCourseList.records.length						
						this.count = 	difference > 10 ? 10 : difference
						
						this.mescroll.endBySize(res.data.records.length, this.choicestCourseList.total);
					}else {
						msg({title:'页面加载失败！'})
						this.mescroll.endErr();
					}			
				},2000)	
							
			}
		},
		
		// 监听原生搜索框的点击事件，提前是该输入框的disabled:true
		onNavigationBarSearchInputClicked() {
			this.navTo('/pages/search/search')
		}
	}
</script>

<style lang="scss">
	.home-container {
		background-color: #f5f5f5;
	}
</style>

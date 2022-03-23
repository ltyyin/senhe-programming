<template>
	<view class="course-list-container">
		<down-bar :down-bars="downBars" @search="search"></down-bar>		
		<mescroll-uni 
			:ref="'mescrollRef'+i" 
			@init="mescrollInit" 
			:down="downOption" 
			@down="downCallback" 
			:up="upOption" 
			@up="upCallback"
			:bottombar="false"
			:top="top"
			>
			<view class="touch">	
				<template v-for="(item,index) of courseList">
					<scroll-y-item  :key="item.id" :course-info="item"></scroll-y-item>
				</template>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import mescrollUni from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.vue'
	import scrollYItem from '@/components/scroll-view/scroll-y-item.vue'
	
	import downBar from './down-bar.vue'
	import localData from '../localData/downBars.js'
	// 导入请求api
	import apiSearch from '@/api/search.js'
	
	export default {
		mixins: [MescrollMixin,MescrollMoreItemMixin],
		props: {
			content: {
				type: String,
				required: true
			},
			i: Number, // 每个tab页的专属下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
			index: { // 当前tab的下标 (除了支付宝小程序必须在这里定义, 其他平台都可不用写, 因为已在MescrollMoreItemMixin定义)
				type: Number,
				default(){
					return 0
				}
			},
			height: [Number,String] // mescroll的高度
		},
		components: {
			downBar,
			mescrollUni,
			scrollYItem
		},
		data() {
			return {
				// #ifdef MP || APP-PLUS
				top: 80,
				// #endif
				// #ifdef H5
				top: 0,
				// #endif
				downBars: localData.courseDownBars,
				downOption:{
					offset: 50
				},
				upOption:{
					auto: false,
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4,
					toTop: {
						src: ''
					},
					offset: 50
				},				
				courseList: [],
				total: 0,
				queryCondition: { 
					count: 15,
					content: '',
					basisSort: '综合排序',
					isFreeSort: '类别不限'
				}
			}
		},
		watch: {
			content: {
				immediate: true,
				handler(newVal) {
					this.queryCondition.content = newVal
				}
			}
		},
		methods: {
			search(options) {
				if(options){
					for(let [k,v] of Object.entries(options)) {
						this.queryCondition[k] = v
					}					
				}
				this.mescroll.resetUpScroll()
			},
			
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			async	upCallback(page) {					
				// 获取精选课程
				let res = await apiSearch.getSearchCourseList(this.queryCondition)
				if(res.statusCode ===200){
					if(page.num === 1){							
						this.mescroll.scrollTo(0,200)
						this.courseList = res.data.list
						this.total = res.data.total
					}else {
						this.courseList.push(...res.data.list)
					}
				/* 判断下次传递的count值 */
					let difference = this.total - this.courseList.length						
					this.queryCondition.count = 	difference > 10 ? 10 : difference
					this.mescroll.endBySize(res.data.list.length, this.total);
					uni.hideLoading()
				}else {
					msg({title:'页面加载失败！'})
					this.mescroll.endErr();
				}
			}
		}
	}
</script>

<style lang="scss">
	.course-list-container {
		background-color: #F1F1F1;
		
		.touch {
			overflow: hidden;
			/* #ifdef H5 */
			touch-action: pan-x;
			/* #endif */
			background-color: #FFFFFF;
		}
		
	}
</style>

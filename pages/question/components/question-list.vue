<template>
	<view class="question-list-container">
		<mescroll-uni 
			:ref="'mescrollRef'+i" 
			@init="mescrollInit" 
			:down="downOption" 
			@down="downCallback" 
			:up="upOption" 
			@up="upCallback" 
			:bottombar="false"
			:top="top"
			:height="height"
		>
			<view class="question-scroll-wrapper">
				<template v-for="(question,index) of questionList">
					<question-item :key="question.id" :question-info="question" />
				</template>		
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import mescrollUni from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.vue'
	import questionItem from '@/components/question-item.vue'
	// 导入请求api
	import apiSearch from '@/api/search.js'
	
	export default {
		mixins: [MescrollMixin,MescrollMoreItemMixin],
		props: {
			content: {
				type: String,
				required: true
			},
			i: Number, 
			index: {
				type: Number,
				default(){
					return 0
				}
			},
			height: [Number,String] ,// mescroll的高度
		},
		components: {
			mescrollUni,
			questionItem
		},
		data() {
			return {
				init: true,
				// #ifdef MP || APP-PLUS
				top: 0,
				// #endif
				// #ifdef H5
				top: '-44',
				// #endif
				downOption:{
					offset: 60
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
				questionList: [],
				total: 0,
				queryCondition: { 
					count: 15,
					content: '',
					basisSort: '综合排序',
					timeInterval: '时间不限'
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
			
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			
			async	upCallback(page) {
				// 获取精选课程
				let res = await apiSearch.getSearchQuestionList(this.queryCondition)
				if(res.statusCode ===200){
					if(page.num === 1){
						// #ifndef MP
						this.mescroll.scrollTo(0,200)
						// #endif
						this.questionList = res.data.list
						this.total = res.data.total
					}else {
						this.questionList.push(...res.data.list)
					}
				/* 判断下次传递的count值 */
					let difference = this.total - this.questionList.length						
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
</style>

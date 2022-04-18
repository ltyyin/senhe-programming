<template>
	<view class="article-list-container">
		<mescroll-uni 
			:ref="'mescrollRef'+i" 
			@init="mescrollInit" 
			:height="height" 
			:down="downOption" 
			@down="downCallback" 
			:up="upOption" 
			@up="upCallback" 
			:bottombar="false"
			:top="top"
		>
			<view class="article-scroll-wrapper">
				<down-bar :down-bars="downBars" @search="search"></down-bar>
				<template v-for="(article,index) of articleList">
					<article-item :articleInfo="article" :key="article.id"></article-item>
				</template>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-mixins.js";
	import MescrollMoreItemMixin from "@/uni_modules/mescroll-uni/components/mescroll-uni/mixins/mescroll-more-item.js";
	import downBar from './down-bar.vue'
	import mescrollUni from '@/uni_modules/mescroll-uni/components/mescroll-uni/mescroll-uni.vue'
	import articleItem from '@/components/article-item.vue'
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
			downBar,
			mescrollUni,
			articleItem
		},
		data() {
			return {
				init: true,
				// #ifdef MP || APP-PLUS
				top: 0,
				// #endif
				// #ifdef H5
				top: '-44px',
				// #endif
				downBars: localData.articleDownBars,
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
				articleList: [],
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
		mounted() {
			this.$nextTick(()=>{
				this.init = false
			})
		},
		methods: {
			search(options) {
				if(options){
					if(!this.init){
						uni.showLoading({
							title: '加载中...',
							mask: true
						})
					}
					for(let [k,v] of Object.entries(options)) {
						this.queryCondition[k] = v
					}
					this.mescroll.resetUpScroll()
				}
			},
			
			downCallback() {
				if(this.init) return
				this.mescroll.resetUpScroll()
			},
			
			async	upCallback(page) {
				// 获取精选课程
				let res = await apiSearch.getSearchArticleList(this.queryCondition)
				if(res.statusCode ===200){
					if(page.num === 1){							
						this.mescroll.scrollTo(0,200)
						this.articleList = res.data.list
						this.total = res.data.total
					}else {
						this.articleList.push(...res.data.list)
					}
				/* 判断下次传递的count值 */
					let difference = this.total - this.articleList.length						
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
	.article-list-container {
		.article-scroll-wrapper {
		}
	}
</style>

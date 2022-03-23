<template>
	<view class="search-index-container">
		<!-- #ifdef MP -->
		<!-- 替换组件的清除图标 -->
		<uni-search-bar :value='content' :focus="isFocus" placeholder="搜索你想要搜索的内容" @confirm="doSearch" @cancel="navBack()" cancelButton="always"></uni-search-bar>
		<!-- #endif -->	
				
		<template v-if="isShowKeyWords">
			<!-- #ifdef APP-PLUS || H5 -->
			<view class="space-bar" v-if="isShowKeyWords" style="height: 15rpx;background-color: #f5f5f5;"></view>
			<!-- #endif -->
			<!-- 搜索关键词的展示 -->
			<key-words v-if="isShowKeyWords" :history-list="historyList" @doSearch="doSearch" @clearHistoryList="clearHistoryList"></key-words>
		</template>
		
		<template v-if="!isShowKeyWords">
			<me-tabs v-model="tabIndex" :height="70" :tabs="tabs"></me-tabs>
			<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
				<swiper-item>			
					<course-list ref="mescrollItem0" :i="0" :index="tabIndex" :content="content" :height="height"></course-list>
				</swiper-item>
				<swiper-item>
					<article-list ref="mescrollItem1" :i="1" :index="tabIndex" :content="content"></article-list>
				</swiper-item>
				<swiper-item>
					<question-list ref="mescrollItem2" :i="2" :index="tabIndex" :content="content"></question-list>
				</swiper-item>
			</swiper>
		</template>
	</view>
</template>

<script>
	import mixin from '@/common/mixin/mixin.js'
	import keyWords from './components/keywords.vue'
	// import tabBar from '@/components/tab-bar.vue'
	import courseList from './components/course-list.vue'
	import articleList from './components/article-list.vue'
	import questionList from './components/question-list.vue'
	
	let currentWebView = null	
	const key = 'search_history_list'
	export default {
		name: 'searchIndex',
		mixins:[mixin],
		components: {
			keyWords,
			// tabBar,
			courseList,
			articleList,
			questionList
		},
		data() {
			return {
				params: null,
				content: '',
				// #ifdef MP
				isFocus: false,
				// #endif
				isShowKeyWords: true,
				historyList: uni.getStorageSync(key) || [],
				tabBarIndex: 0,
				tabIndex: 0 ,// 当前tab的下标
				tabs: [{name:'课程'}, {name:'文章'}, {name:'问答'}],
				height: 200, // 需要固定swiper的高度
			}
		},
		onLoad(option) {					
			// #ifndef MP
			// 需要固定swiper的高度 (需减去悬浮tabs的高度64rpx)
			this.height = uni.getSystemInfoSync().windowHeight - uni.upx2px(70) + 'px'
			// #endif
			
			// #ifdef MP
			if(!option.params){
				this.$nextTick(()=>{
					this.isFocus = true
				})
			}
			this.height = uni.getSystemInfoSync().windowHeight - 44 - uni.upx2px(70) + 'px'
			// #endif
			
			// #ifdef APP-PLUS
			currentWebView = this.$scope.$getAppWebview()
			// #endif
			
			if(option.params) {
				this.params = JSON.parse(decodeURIComponent(option.params))
				// #ifdef APP-PLUS
				currentWebView.setTitleNViewSearchInputText(this.content)
				// #endif
				this.doSearch({value:this.params.title})
			}else { 
				// #ifdef APP-PLUS
				// 自动获取焦点	
				currentWebView.setTitleNViewSearchInputFocus(true)				
				// #endif
			}
		},
		
		// 页面生命周期钩子，监听搜索按钮的点击
		onNavigationBarButtonTap(taget) {
			this.navBack()
		},
		
		// 监听原生输入框的内容变化
		onNavigationBarSearchInputChanged(e) {
			// console.log(e)
		},
		
		// 监听键盘搜索按钮的点击
		onNavigationBarSearchInputConfirmed(e) {
			// #ifdef APP-PLUS
			// 让输入框失去焦点
			currentWebView.setTitleNViewSearchInputFocus(false)			
			// #endif
			// #ifdef MP
			this.isFocus = false
			// #endif
			if(e.text.trim() === '') return
			this.doSearch({value: e.text.trim()})
		},
		
		
		methods: {
			// 轮播菜单
			swiperChange(e){
				this.tabIndex = e.detail.current
			},
			
			historyStorage(val) {
				const index = this.historyList.indexOf(val)
				// 判断之前的数据中是否存在，存在则删除之前的，重新往前面进行添加
				if(index!==-1) {
					this.historyList.splice(index,1)					
				}
				// 判断如果超过10记录，则删除最后一个
				if(this.historyList.length > 10) {
					this.historyList.splice(10,1)
				}
				this.historyList.unshift(val)
				uni.setStorageSync(key,this.historyList)				
				this.historyList = uni.getStorageSync(key)				
			},
			
			// 清空搜索记录列表（连localStorage中的也清除）
			clearHistoryList() {
				uni.clearStorageSync(key)
				this.historyList = []
			},
			
			doSearch(obj) {
				this.content = obj.value
				this.isShowKeyWords = false
								
				// #ifdef H5
				// 解决H5中的输入框内容切换问题，因为没有相关的api操作原生输入框，所以只能进行DOM的操作
				this.$nextTick(() => {
					const placeHolderEl = document.querySelector('.uni-page-head-search-placeholder')
					placeHolderEl.innerHTML = ''				
					const inputEl = document.querySelector('.uni-input-input[type=search]')
					inputEl.value = this.content
				})
				// #endif
				
				this.historyStorage(obj.value)
				
				this.$nextTick(()=>{
					let name = `mescrollItem${this.tabIndex}`
					this.$refs[name].search()
				})
				
				setTimeout(()=>{
					// uni.showLoading()
				}, 500)
			}			
		}
	}
</script>

<style lang="scss">	
	.search-index-container {
		// background-color: $page-background-color;
		background-color: #FFFFFF;			
		/* #ifdef APP-PLUS || H5 */
		.space-bar {
			height: 1rpx;
			width: 100%;
		}
		/* #endif */
	}
</style>

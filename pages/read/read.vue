<template>
	<view class="read-container">
		<me-tabs key="read-tabs" v-model="tabIndex" :tabWidth="120" :height="90" :tabs="tabs"></me-tabs>
		<swiper :style="{height: height}" :current="tabIndex" @change="swiperChange">
			<swiper-item v-for="(tab, index) of tabs" :key="index">
				<article-list :ref="`articleList${index}`" :i="index" 
					:index="tabIndex" :content="content" :height="height"
				></article-list>
			</swiper-item>
		</swiper>
</view>
</template>

<script>
	import mixin from '@/common/mixin/mixin.js'
	import articleList from './components/article.vue'
	
	let currentWebview = null	
	const key = 'search_history_list'
	export default {
		name: 'searchIndex',
		mixins:[mixin],
		components: {
			articleList,
		},
		data() {
			return {
				params: null,
				content: '',
				tabBarIndex: 0,
				tabIndex: 0 ,// 当前tab的下标
				tabs: [{name:'推荐'}, {name:'安卓'}, {name:'大数据'}, {name:'运维'},
					{name:'Java'},{name:'小程序'}, {name:'算法'}, {name: 'UI设计'}
				],
				height: 200, // 需要固定swiper的高度
			}
		},
		onLoad() {
			const windowHeight = uni.getSystemInfoSync().windowHeight
			// #ifndef MP
			// 需要固定swiper的高度 (需减去悬浮tabs的高度64rpx)
			this.height = windowHeight - uni.upx2px(90) + 'px'
			// #endif
			// #ifdef MP
			this.height = windowHeight - 44 - uni.upx2px(90) + 'px'
			// #endif
		},
		
		// 页面生命周期钩子，监听搜索按钮的点击
		onNavigationBarButtonTap(taget) {
			this.navBack()
		},
		
		// 监听原生搜索框的点击事件，提前是该输入框的disabled:true
		onNavigationBarSearchInputClicked() {
			this.navTo('/pages/search/search')
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
		}
	}
</script>

<style lang="scss">	
	.read-container {
		background-color: #FFFFFF;
	}
</style>

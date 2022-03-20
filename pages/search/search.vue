<template>
	<view class="search-index-container">
		<!-- #ifdef MP-WEIXIN -->
		<!-- 替换组件的清除图标 -->
		<uni-search-bar focus placeholder="搜索你想要搜索的内容" @confirm="doSearch" @cancel="navBack()" cancelButton="always">
			<view slot="clearIcon" style="color: #999999" >X</view>
		</uni-search-bar>
		<!-- #endif -->
	</view>
</template>

<script>
	import mixin from '@/common/mixin/mixin.js'
	
	let currentWebView = null	
	
	export default {
		name: 'searchIndex',
		mixins:[mixin],
		data() {
			return {
				params: null,
				content: ''
			}
		},
		onLoad(option) {
			// #ifdef APP-PLUS
			currentWebView = this.$scope.$getAppWebview()
			// #endif
			
			if(option.params) {
				this.params = JSON.parse(decodeURIComponent(option.params))
				this.content = this.params.title
				// #ifdef APP-PLUS
				currentWebView.setTitleNViewSearchInputText(this.content)
				// #endif
				this.doSearch()
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
			console.log(e)
		},
		
		// 监听键盘搜索按钮的点击
		onNavigationBarSearchInputConfirmed(e) {
			// #ifdef APP-PLUS
			// 让输入框失去焦点
			currentWebView.setTitleNViewSearchInputFocus(false)			
			// #endif
			this.content = e.text
		},
		
		methods: {						
			doSearch(e) {
				console.log(e)
				setTimeout(()=>{
					uni.showLoading()
				}, 500)
			}			
		}
	}
</script>

<style lang="scss">	
	.search-index-container {

	}
</style>
